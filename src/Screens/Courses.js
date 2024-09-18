import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import SkeletonLoadingView from './SkeletonLoadingView'; // Import the SkeletonLoadingView component

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCourses();
  }, [page]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`https://apsadmissionpanel.com/wp-json/wp/v2/course?page=${page}`);
      console.log('Courses response:', response.data);
      const coursesWithImages = await Promise.all(response.data.map(async (course) => {
        if (course.featured_media) {
          const mediaResponse = await axios.get(`https://apsadmissionpanel.com/wp-json/wp/v2/media/${course.featured_media}`);
          course.featured_media_url = mediaResponse.data.source_url;
        }
        return course;
      }));
      setCourses([...courses, ...coursesWithImages]);
      setTotalPages(response.headers['x-wp-totalpages']);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleCoursePress = (course) => {
    navigation.navigate('CourseDetails', { id: course.id });
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const renderGridItem = ({ item }) => (
    <TouchableOpacity style={styles.courseContainer} onPress={() => handleCoursePress(item)}>
      <Image
        source={{ uri: item.featured_media_url || 'https://tse2.mm.bing.net/th?id=OIP.9Izv-aszItToTtEqRMSE0QHaE6&pid=Api&P=0&h=180' }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.courseTitle}>{item.title.rendered}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? ( // Display SkeletonLoadingView when loading is true
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} // Placeholder data for skeleton loading
          renderItem={() => (
            <SkeletonLoadingView render={1} width={160} height={180} borderRadius={20} direction="column" />
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false} 
        />
      ) : (
        <FlatList
          data={courses}
          renderItem={renderGridItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
        />
      )}
      {!loading && page < totalPages && (
        <Button title="Load More" onPress={handleLoadMore} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  courseContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 150,
  },
});

export default Courses;
