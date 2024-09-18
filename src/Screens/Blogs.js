import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, useWindowDimensions, Button } from 'react-native';
import axios from 'axios';
import HTML from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [fetchingMore, setFetchingMore] = useState(false);

  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://apsadmissionpanel.com/wp-json/wp/v2/posts?page=${page}&per_page=5&_embed`);
      setTotalPages(response.headers['x-wp-totalpages']);
      setPosts([...posts, ...response.data]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const loadMorePosts = async () => {
    if (page < totalPages) {
      setPage(page + 1);
      setFetchingMore(true);
      await fetchPosts();
      setFetchingMore(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { post: item })} key={item.id}>
      <View style={styles.itemContainer}>
        {item._embedded && item._embedded['wp:featuredmedia'] && item._embedded['wp:featuredmedia'][0].source_url && (
          <Image
            source={{ uri: item._embedded['wp:featuredmedia'][0].source_url }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title.rendered}</Text>
          <Text style={styles.date}>{new Date(item.date).toDateString()}</Text>
          <HTML source={{ html: stripHtmlTags(item.excerpt.rendered) }} contentWidth={width} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const stripHtmlTags = (html) => {
    return html.replace(/<[^>]+>/g, '');
  };

  return (
    <ScrollView style={styles.container}>
      {posts.map((item, index) => (
        <React.Fragment key={index}>
          {renderItem({ item })}
        </React.Fragment>
      ))}
      {totalPages > page && !fetchingMore && posts.length > 0 && (
        <Button title="Load More" onPress={loadMorePosts} />
      )}
      {totalPages <= page && posts.length > 0 && (
        <Text style={styles.noMoreText}>No more blogs available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 120,
    marginBottom: 10,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  noMoreText: {
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Blogs;
