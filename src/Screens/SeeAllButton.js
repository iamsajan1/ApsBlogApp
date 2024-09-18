import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const SeeAllButton = ({ title, onPress }) => {
  const navigation = useNavigation();

  const handleSeeAllPress = () => {
    onPress();
    // Navigate to the corresponding list page based on the title
    if (title === 'Universities') {
      navigation.navigate('UniversityList');
    } else if (title === 'Courses') {
      navigation.navigate('CourseList');
    } else if (title === 'Blogs') {
      navigation.navigate('BlogList');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`See All ${title}`}</Text>
      <TouchableOpacity onPress={handleSeeAllPress}>
        <IconButton icon="arrow-right" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SeeAllButton;
