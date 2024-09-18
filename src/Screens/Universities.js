import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import SkeletonLoadingView from './SkeletonLoadingView'; // Import the SkeletonLoadingView component

const Universities = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetching, setIsFetching] = useState(false); // Add state to track fetching status
  const navigation = useNavigation();

  useEffect(() => {
    fetchUniversities();
  }, [page]);

  const fetchUniversities = async () => {
    try {
      const response = await axios.get(`https://apsadmissionpanel.com/wp-json/wp/v2/university?page=${page}`);
      console.log('Universities response:', response.data);
      const universitiesWithImages = await Promise.all(response.data.map(async (university) => {
        if (university.featured_media) {
          const mediaResponse = await axios.get(`https://apsadmissionpanel.com/wp-json/wp/v2/media/${university.featured_media}`);
          university.featured_media_url = mediaResponse.data.source_url;
        }
        return university;
      }));
      setUniversities([...universities, ...universitiesWithImages]);
      setTotalPages(response.headers['x-wp-totalpages']);
      setLoading(false);
      setIsFetching(false);
    } catch (error) {
      console.error('Error fetching universities:', error);
    }
  };

  const handleUniversityPress = (university) => {
    navigation.navigate('UniversityDetails', { id: university.id });
  };

  const handleLoadMore = () => {
    if (!isFetching && page < totalPages) {
      setPage(page + 1);
      setIsFetching(true);
    }
  };

  const renderGridItem = ({ item }) => (
    <TouchableOpacity style={styles.universityContainer} onPress={() => handleUniversityPress(item)}>
      <Image
        source={{ uri: item.featured_media_url || 'https://tse2.mm.bing.net/th?id=OIP.9Izv-aszItToTtEqRMSE0QHaE6&pid=Api&P=0&h=180' }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.universityTitle}>{item.title.rendered}</Text>
    </TouchableOpacity>
  );

  const renderNoMoreUniversities = () => (
    <View style={styles.noMoreContainer}>
      <Text style={styles.noMoreText}>No more universities available</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? ( // Display SkeletonLoadingView when loading is true
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} // Placeholder data for skeleton loading
          renderItem={() => (
            <SkeletonLoadingView render={1}  width={160} height={180} borderRadius={20} direction="column" />
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false} 
        />
      ) : (
        <FlatList
          data={universities}
          renderItem={renderGridItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={totalPages > 1 ? renderNoMoreUniversities : null}
        />
      )}
      {loading && <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  universityContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  universityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 150,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  noMoreContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  noMoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
});

export default Universities;
