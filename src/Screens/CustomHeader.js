import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const CustomHeader = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://apsadmissionpanel.com/wp-content/uploads/2024/01/Aps-logo-1-e1704202646845.png' }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
     height: 50, // Adjust height as needed
     backgroundColor:'#fff',
     alignItems: 'center',
  },
  image: {
    width: 150, // Adjust width as needed
    height: '80%', // Adjust height as needed
  },
});

export default CustomHeader;
