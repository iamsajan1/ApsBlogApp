import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import HTML from 'react-native-render-html';

const PostDetail = ({ route }) => {
  const { post } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HTML source={{ html: post.content.rendered }} contentWidth={300} tagsStyles={htmlStyles} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
    fontFamily: 'Roboto-Bold', // Example of using a custom font
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 30,
    borderRadius: 10,
  },
});

const htmlStyles = {
  p: {
    marginBottom: 20,
    fontSize: 18,
    color: '#555555',
    lineHeight: 28,
  },
  ul: {
    paddingLeft: 30,
    marginBottom: 20,
  },
  li: {
    fontSize: 18,
    color: '#555555',
    lineHeight: 28,
  },
  h1: { fontSize: 28, fontWeight: 'bold', color: '#333333', marginBottom: 15 },
  h2: { fontSize: 24, fontWeight: 'bold', color: '#333333', marginBottom: 15 },
  h3: { fontSize: 22, fontWeight: 'bold', color: '#333333', marginBottom: 15 },
  h4: { fontSize: 20, fontWeight: 'bold', color: '#333333', marginBottom: 15 },
  h5: { fontSize: 18, fontWeight: 'bold', color: '#333333', marginBottom: 15 },
  h6: { fontSize: 16, fontWeight: 'bold', color: '#333333', marginBottom: 15 },
};

export default PostDetail;
