 import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, useWindowDimensions } from 'react-native';
import axios from 'axios';
import HTML from 'react-native-render-html';

 const UniversityDetails = ({ route }) => {
  const windowWidth = useWindowDimensions().width; 
  const [university, setUniversity] = useState(null); 
  const [loading, setLoading] = useState(true); 

   useEffect(() => {
    fetchUniversityDetails();
  }, []);

   const fetchUniversityDetails = async () => {
    try {
      const { id } = route.params;
       const response = await axios.get(`https://apsadmissionpanel.com/wp-json/wp/v2/university/${id}?_embed&fields=*,acf`);
       console.log('University details response:', response.data);
       setUniversity(response.data);
    } catch (error) {
       console.error('Error fetching university details:', error);
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
         <Text style={styles.subtitle}>{university?.title?.rendered}</Text>
         {university?.university_description && (
          <HTML source={{ html: university.university_description }} contentWidth={windowWidth} />
        )}
         {university?._embedded && university._embedded['wp:featuredmedia'] && (
          <Image
            source={{ uri: university._embedded['wp:featuredmedia'][0].source_url }}
            style={styles.image}
          />
        )}
         {university?.acf?.university_description && (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Summary :</Text>
             <HTML source={{ html: university.acf.university_description}} contentWidth={windowWidth} />
          </View>
        )}
        {university?.acf?.university_about && (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>About University:</Text>
             <HTML source={{ html: university.acf.university_about }} contentWidth={windowWidth} />
          </View>
        )}
        {university?.acf?.year_of_establishment && (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Year of Establishment :</Text>
             <HTML source={{ html: university.acf.year_of_establishment }} contentWidth={windowWidth} />
          </View>
        )}
        {university?.acf?.university_facts && (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Facts:</Text>
             <HTML source={{ html: university.acf.university_facts }} contentWidth={windowWidth} />
          </View>
        )}
        {university?.acf?.facility && (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>facilities:</Text>
             <HTML source={{ html: university.acf.facility }} contentWidth={windowWidth} />
          </View>
        )}
        {university?.acf?.lms && (
          <View style={styles.LmsfieldContainer}>
            <Text style={styles.LmsfieldTitle}>L.M.S:</Text>
             <HTML source={{ html: university.acf.lms }} contentWidth={windowWidth} />
          </View>
        )}
        {university?.acf?.examination && (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Examination Pattern:</Text>
             <HTML source={{ html: university.acf.examination }} contentWidth={windowWidth} />
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
    paddingHorizontal:10
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 28, 
    fontWeight: 'bold',
    marginBottom: 20,
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
    marginBottom: 5,
    color: '#333',
    marginLeft:15
  },
  LmsfieldContainer:{
    marginBottom: 20,
    marginHorizontal:15

  },
  LmsfieldTitle:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
    marginLeft:15

  }
});

 export default UniversityDetails;
