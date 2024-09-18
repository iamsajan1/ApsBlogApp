import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const countryCode = '+91'; // Hardcoded country code for India
  const navigation = useNavigation();
  const handleLogin = () => {
    navigation.navigate('OtpScreen');
    console.log('Phone Number:', countryCode + phoneNumber);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://static.vecteezy.com/system/resources/previews/001/937/590/large_2x/online-education-application-learning-worldwide-on-computer-mobile-website-background-social-distance-concept-the-classroom-training-course-library-illustration-flat-vector.jpg' }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Text style={{ fontSize:14,color:'#fff'}}>  Hello user please login your account</Text>
        <View style={styles.inputContainer}>
          <Image
            source={{ uri: 'https://1.bp.blogspot.com/-2w418XuVFy0/YRFUYFl8VPI/AAAAAAAAIqw/WHu_0oBFNOIerAsgKSB-p9HSye4tzPlPgCLcBGAsYHQ/s1714/india.png' }} // Indian flag image
            style={styles.flagImage}
          />
          <Text style={styles.countryCodeText}>{countryCode}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Phone Number"
            placeholderTextColor="#FFFFFF"
             onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>
        <Text style={{ fontSize:14,color:'#fff', alignSelf:'center', marginBottom:40, fontWeight:'bold'}}>*We will sent otp for verification    </Text>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
   },
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 130
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    fontFamily: 'Roboto',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 30,

  },
  flagImage: {
    width: 40,
    height: 30,
    marginRight: 10,
  },
  countryCodeText: {
    fontSize: 18,
    color: 'white',
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'white',
  },
  loginButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width:200
   },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
});

export default Login;
