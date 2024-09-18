import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Modal, ActivityIndicator } from 'react-native';

const OtpScreen = ({ navigation }) => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(120); // Initial timer value in seconds
  const [showModal, setShowModal] = useState(false); // State for showing the modal
  const navigationRef = useRef(navigation); // Create a ref to hold the navigation object

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
        }
        return prevTimer > 0 ? prevTimer - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleVerifyOtp = async() => {
    // Show the modal
    setShowModal(true);
  
    // Hide the modal after 2 seconds
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
    if (!showModal) {
     await navigation.navigate('MainBottomNavigator');
    }
  };

  const handleResendOtp = () => {
    console.log('Resending OTP...');
  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <ImageBackground
      source={{
        uri:
          'https://static.vecteezy.com/system/resources/previews/001/937/590/large_2x/online-education-application-learning-worldwide-on-computer-mobile-website-background-social-distance-concept-the-classroom-training-course-library-illustration-flat-vector.jpg',
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.description}>Please enter OTP sent to your mobile number</Text>
        <Text style={styles.mobileNumber}>+91 123456789</Text>

        <View style={styles.otpContainer}>
          {[1, 2, 3, 4].map((_, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              placeholder="0"
              maxLength={1}
              keyboardType="numeric"
              onChangeText={(value) => {
                if (index === 0) setOtp(value);
              }}
            />
          ))}
        </View>

        <Text style={styles.timer}>{`${minutes < 10 ? `0${minutes}` : minutes}:${
          seconds < 10 ? `0${seconds}` : seconds
        }`}</Text>

        <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resendButton} onPress={handleResendOtp}>
          <Text style={styles.resendButtonText}>Did not receive OTP? Resend</Text>
        </TouchableOpacity>

        {/* Modal for showing loader and verifying text */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ActivityIndicator size="large" color="blue" />
              <Text style={styles.modalText}>Verifying...</Text>
            </View>
          </View>
        </Modal>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 130,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  mobileNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    width: 50,
    height: 50,
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  timer: {
    fontSize: 20,
    marginBottom: 20,
    color: 'white',
    backgroundColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  verifyButton: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendButton: {
    alignSelf: 'center',
  },
  resendButtonText: {
    fontSize: 14,
    color: '#fff',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OtpScreen;
