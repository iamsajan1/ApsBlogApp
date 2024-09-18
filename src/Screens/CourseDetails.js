import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, useWindowDimensions } from 'react-native';
import axios from 'axios';
import HTML from 'react-native-render-html';

const CourseDetails = ({ route }) => {
  const windowWidth = useWindowDimensions().width;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const fetchCourseDetails = async () => {
    try {
      const { id } = route.params;
      const response = await axios.get(`https://apsadmissionpanel.com/wp-json/wp/v2/course/${id}?_embed&fields=acf`);
      console.log('Course details response:', response.data);
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.subtitle}>{course?.title?.rendered}</Text>
        {course?.content && (
          <HTML source={{ html: course.content.rendered }} contentWidth={windowWidth} />
        )}
        {course?._embedded && course._embedded['wp:featuredmedia'] && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: course._embedded['wp:featuredmedia'][0].source_url }}
              style={styles.image}
            />
          </View>
        )}
        {course?.acf?.course_description && (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Course Description:</Text>
            <HTML source={{ html: course.acf.course_description }} contentWidth={windowWidth} />
          </View>
        )}
        {course?.acf?.why_choose_us && (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}> Why You Should Choose:</Text>
            <HTML source={{ html: course.acf.why_choose_us }} contentWidth={windowWidth} />
          </View>
        )}
        {course?.acf?.course_specialization && (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Course Specialization:</Text>
            <HTML source={{ html: course.acf.course_specialization }} contentWidth={windowWidth} />
          </View>
        )}
        {course?.acf?.course_featured && (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Advantages:</Text>
            <HTML source={{ html: course.acf.course_featured }} contentWidth={windowWidth} />
          </View>
        )}
        {course?.acf?.eligibility_criteria && (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Eligibility Criteria:</Text>
            <HTML source={{ html: course.acf.eligibility_criteria }} contentWidth={windowWidth} />
          </View>
        )}
        {course?.acf?.course_duration && (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Course Duration:</Text>
            <HTML source={{ html: course.acf.course_duration }} contentWidth={windowWidth} />
          </View>
        )}
        {course?.acf?.syllabus && (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Syllabus:</Text>
            <HTML source={{ html: course.acf.syllabus }} contentWidth={windowWidth} />
          </View>
        )}
       </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',

  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
     backgroundColor: '#fff',
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden', 
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
  },
});

export default CourseDetails;
