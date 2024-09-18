import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {Text, Searchbar, Card, Icon, IconButton} from 'react-native-paper'; // Import Card component
import Swiper from 'react-native-swiper';
import SkeletonLoadingView from './SkeletonLoadingView';

const SocialMediaIcons = () => (
  <View style={styles.socialMediaIconsContainer}>
    <IconButton
      icon="facebook"
      size={30}
      iconColor="#3b5998"
      onPress={() => console.log('Pressed Facebook icon')}
      style={styles.socialMediaIcon}
    />
    <IconButton
      icon="twitter"
      size={30}
      iconColor="#00acee"
      onPress={() => console.log('Pressed Twitter icon')}
      style={styles.socialMediaIcon}
    />
    <IconButton
      icon="instagram"
      size={30}
      iconColor="#bc2a8d"
      onPress={() => console.log('Pressed Instagram icon')}
      style={styles.socialMediaIcon}
    />
    <IconButton
      icon="linkedin"
      size={30}
      iconColor="#0077b5"
      onPress={() => console.log('Pressed LinkedIn icon')}
      style={styles.socialMediaIcon}
    />
    <IconButton
      icon="youtube"
      size={30}
      iconColor="#ff0000"
      onPress={() => console.log('Pressed YouTube icon')}
      style={styles.socialMediaIcon}
    />
    <IconButton
      icon="pinterest"
      size={30}
      iconColor="#bd081c"
      onPress={() => console.log('Pressed Pinterest icon')}
      style={styles.socialMediaIcon}
    />
  </View>
);
const Banner = () => {
  return (
    <Swiper
      style={styles.wrapper}
      autoplay={true}
      autoplayTimeout={5}
      showsPagination={false}
      height={300}>
      <ImageBackground
        source={{
          uri: 'https://tse3.mm.bing.net/th?id=OIP.bS-VjC96hLH-v_5kXiSGFQFNC7&pid=Api&P=0&h=180',
        }}
        style={styles.slide}
        imageStyle={styles.backgroundImage}>
        <View style={styles.fixedContent}></View>
      </ImageBackground>
      <ImageBackground
        source={{
          uri: 'https://cdn.siasat.com/wp-content/uploads/2020/06/amu.jpg',
        }}
        style={styles.slide}
        imageStyle={styles.backgroundImage}>
        <View style={styles.fixedContent}></View>
      </ImageBackground>
      <ImageBackground
        source={{
          uri: 'https://tse1.mm.bing.net/th?id=OIP.x-1-qjosW8zn13Q_GbPeHQHaE8&pid=Api&P=0&h=180',
        }}
        style={styles.slide}
        imageStyle={styles.backgroundImage}>
        <View style={styles.fixedContent}></View>
      </ImageBackground>
      <ImageBackground
        source={{
          uri: 'https://media.glassdoor.com/l/ba/f5/6e/4e/mmu-campus.jpg',
        }}
        style={styles.slide}
        imageStyle={styles.backgroundImage}>
        <View style={styles.fixedContent}></View>
      </ImageBackground>
      <ImageBackground
        source={{
          uri: 'https://images.static-collegedunia.com/public/college_data/images/campusimage/14728032916.jpg',
        }}
        style={styles.slide}
        imageStyle={styles.backgroundImage}>
        <View style={styles.fixedContent}></View>
      </ImageBackground>
    </Swiper>
  );
};

const GridCard = ({title, description, imageSource}) => {
  return (
    <Card style={styles.gridCard} elevation={3}>
      <Card.Cover source={{uri: imageSource}} style={styles.cardImage} />
      <Card.Content style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true); // Add loading state to track loading status
  const [page, setPage] = useState(1); // Add page state to track pagination
  const [totalPages, setTotalPages] = useState(1); // Add totalPages state to track total pages
  const navigation = useNavigation();
  const [studentFeedback, setStudentFeedback] = useState([
    {
      id: 1,
      name: 'John Doe',
      comment: 'Great university with excellent facilities.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      comment: 'I had an amazing experience studying here.',
    },
    // Add more dummy data as needed
  ]);
  const getFeaturedMediaUrl = task => {
    const featuredMedia =
      task && task._embedded && task._embedded['wp:featuredmedia'];

    if (
      featuredMedia &&
      Array.isArray(featuredMedia) &&
      featuredMedia.length > 0
    ) {
      const sourceUrl = featuredMedia[0].source_url;

      if (sourceUrl) {
        return sourceUrl;
      }
    }

    // If any of the checks fail, return the default URL
    return 'https://www.hankzarihs.com/wp-content/uploads/2019/07/Edwalton2-03-2024-768x409.jpg';
  };
  useEffect(() => {
    fetchCourses();
  }, [page]); // Fetch courses when page state changes

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `https://apsadmissionpanel.com/wp-json/wp/v2/course`,
      );
      const coursesWithImages = await Promise.all(
        response.data.map(async course => {
          if (course.featured_media) {
            const mediaResponse = await axios.get(
              `https://apsadmissionpanel.com/wp-json/wp/v2/media/${course.featured_media}`,
            );
            course.featured_media_url = mediaResponse.data.source_url;
          }
          return course;
        }),
      );
      setCourses([...courses, ...coursesWithImages]);
      setTotalPages(response.headers['x-wp-totalpages']);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleCoursePress = course => {
    navigation.navigate('CourseDetails', {id: course.id});
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(page + 1); // Increment page to fetch the next page of courses
    }
  };

  const renderGridItem = ({item}) => (
    <TouchableOpacity
      style={styles.courseContainer}
      onPress={() => handleCoursePress(item)}>
      <Image
        source={{
          uri:
            item.featured_media_url ||
            'https://tse2.mm.bing.net/th?id=OIP.9Izv-aszItToTtEqRMSE0QHaE6&pid=Api&P=0&h=180',
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.courseTitle}>{item.title.rendered}</Text>
    </TouchableOpacity>
  );
  useEffect(() => {
    fetchUniversities();
  }, [page]);

  const fetchUniversities = async () => {
    try {
      const response = await axios.get(
        `https://apsadmissionpanel.com/wp-json/wp/v2/university`,
      );
      const universitiesWithImages = await Promise.all(
        response.data.map(async university => {
          if (university.featured_media) {
            const mediaResponse = await axios.get(
              `https://apsadmissionpanel.com/wp-json/wp/v2/media/${university.featured_media}`,
            );
            university.featured_media_url = mediaResponse.data.source_url;
          }
          return university;
        }),
      );
      setUniversities([...universities, ...universitiesWithImages]);
      setTotalPages(response.headers['x-wp-totalpages']);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching universities:', error);
    }
  };

  const handleUniversityPress = university => {
    navigation.navigate('UniversityDetails', {id: university.id});
  };
  const handleBlogPress = item => {
    navigation.navigate('PostDetail', {post: item});
  };

  const renderUniversityGridItem = ({item}) => (
    <TouchableOpacity
      style={styles.universityContainer}
      onPress={() => handleUniversityPress(item)}>
      <Image
        source={{
          uri:
            item.featured_media_url ||
            'https://tse2.mm.bing.net/th?id=OIP.9Izv-aszItToTtEqRMSE0QHaE6&pid=Api&P=0&h=180',
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.universityTitle}>{item.title.rendered}</Text>
    </TouchableOpacity>
  );
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://apsadmissionpanel.com/wp-json/wp/v2/posts?_embed`,
      );
      setTotalPages(response.headers['x-wp-totalpages']);
      setPosts([...posts, ...response.data]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Banner />
        <View style={styles.fixedContentContainer}>
          <Text style={styles.text}>
            Choose the right course with the right university
          </Text>
          <Searchbar
            placeholder="Search for courses, universities, placements"
            style={styles.searchBar}
          />
        </View>
        <View style={styles.gridContainer}>
          <GridCard
            title="Google rating"
            imageSource="https://pngimg.com/uploads/google/google_PNG19640.png"
            description="4"
          />
          <GridCard
            title="Tie up Universities"
            imageSource="https://cdn3.iconfinder.com/data/icons/landmark-8/128/university_campus_college_school-1024.png"
          />
          <GridCard
            title="Total won Awards"
            imageSource="https://www.pngall.com/wp-content/uploads/5/Award-PNG.png"
            description="16"
          />
        </View>
        <View style={styles.trendingCoursesContainer}>
          <View style={styles.horizontalLine} />
          <Text style={styles.trendingCoursesText}>Trending courses</Text>
          <View style={styles.horizontalLine} />
        </View>
        <View style={{borderRadius: 15}}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={styles.featuredContainer}>
            {loading ? (
              <SkeletonLoadingView
                width={200}
                height={225}
                render={5}
                direction={'row'}
              />
            ) : (
              courses.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleCoursePress(item)}>
                  <View key={index} style={styles.featuredItem}>
                    <Image
                      source={{
                        uri:
                          item.featured_media_url ||
                          'https://tse2.mm.bing.net/th?id=OIP.9Izv-aszItToTtEqRMSE0QHaE6&pid=Api&P=0&h=180',
                      }}
                      style={styles.featuredImage}
                    />
                    <View style={styles.cardStyle}>
                      <Text style={styles.cardTitle}>
                        {item.title.rendered ||
                          'Artificial Intelligence Vs Human Intelligence'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>
        <View style={styles.trendingCoursesContainer}>
          <View style={styles.horizontalLine} />
          <Text style={styles.trendingCoursesText}>
            WELCOME TO APS ADMISSION PANEL
          </Text>
          <View style={styles.horizontalLine} />
        </View>
        <View style={{paddingHorizontal: 15, justifyContent: 'center'}}>
          <Text>
            Our goal is to enable aspiring candidates around the world to
            explore study programmers and make an informed choice throughout
            multiple courses offered by various educational institute and
            universities. We get APS admission panel aim to remove all hurdles
            to bring quality education to everyone. We started this group back
            in 2015 when few of our board members struggled to find someone who
            could help them to decide their journey towards a successful career
            and realized their were many others who were facing similar
            challenges.
          </Text>
        </View>
        <View style={styles.trendingCoursesContainer}>
          <View style={styles.horizontalLine} />
          <Text style={styles.trendingCoursesText}>Popular Universities</Text>
          <View style={styles.horizontalLine} />
        </View>
        <View style={{borderRadius: 15}}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={styles.featuredContainer}>
            {universities && universities.length > 0 ? (
              universities.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleUniversityPress(item)}>
                  <View key={index} style={styles.featuredItem}>
                    <Image
                      source={{
                        uri:
                          item.featured_media_url ||
                          'https://tse2.mm.bing.net/th?id=OIP.9Izv-aszItToTtEqRMSE0QHaE6&pid=Api&P=0&h=180',
                      }}
                      style={styles.featuredImage}
                    />
                    <View style={styles.cardStyle}>
                      <Text style={styles.cardTitle}>
                        {item.title.rendered ||
                          'Artificial Intelligence Vs Human Intelligence'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <SkeletonLoadingView
                width={200}
                height={225}
                render={5}
                direction={'row'}
              />
            )}
          </ScrollView>
        </View>
        <View style={styles.trendingCoursesContainer}>
          <View style={styles.horizontalLine} />
          <Text style={styles.trendingCoursesText}>
            what our students says!
          </Text>
          <View style={styles.horizontalLine} />
        </View>
        <View style={{borderRadius: 10}}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={styles.featuredContainer}>
            {studentFeedback.map((item, index) => (
              <TouchableOpacity key={index}>
                <View style={styles.feedbackItem}>
                  <Image
                    source={{
                      uri: 'https://randomuser.me/api/portraits/men/1.jpg',
                    }} // Add a placeholder or provide a real image URL
                    style={styles.avatar}
                  />
                  <View style={styles.feedbackText}>
                    <Text style={styles.studentName}>{item.name}</Text>
                    <Text style={styles.comment}>{item.comment}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.trendingCoursesContainer}>
          <View style={styles.horizontalLine} />
          <Text style={styles.trendingCoursesText}>Blogs</Text>
          <View style={styles.horizontalLine} />
        </View>
       <View style={{borderRadius: 15}}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={styles.featuredContainer}>
            {posts && posts.length > 0 ? (
              posts.map((item, index) => (
                <TouchableOpacity
                  onPress={() => handleBlogPress(item)}
                  key={item.id}>
                  <View style={styles.featuredItem}>
                    {item._embedded &&
                      item._embedded['wp:featuredmedia'] &&
                      item._embedded['wp:featuredmedia'][0].source_url && (
                        <Image
                          source={{
                            uri: item._embedded['wp:featuredmedia'][0]
                              .source_url,
                          }}
                          style={styles.featuredImage}
                        />
                      )}
                    <View style={styles.cardStyle}>
                      <Text style={styles.cardTitle}>
                        {item.title.rendered ||
                          'Artificial Intelligence Vs Human Intelligence'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <SkeletonLoadingView
                width={200}
                height={225}
                render={5}
                direction={'row'}
              />
            )}
          </ScrollView>
        </View>
        <View style={styles.trendingCoursesContainer}>
          <View style={styles.horizontalLine} />
          <Text style={styles.trendingCoursesText}>Talk to our experts</Text>
          <View style={styles.horizontalLine} />
        </View>
        <View style={{paddingHorizontal: 15, justifyContent: 'center'}}>
          <Text style={styles.emptyViewText}>
            Work closely with our counselor to get a realistic picture of your
            learning path and build a great career
          </Text>
          <SocialMediaIcons />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: 15,
  },
  backgroundImage: {
    resizeMode: 'cover',
    opacity: 0.8,
  },
  fixedContentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 50,
    zIndex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
  },
  searchBar: {
    width: '90%',
    backgroundColor: '#FFFFFF',
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 15,
  },
  gridCard: {
    width: '32%',
    height: 110,
    marginBottom: 10,
    borderRadius: 10, // Makes the card squar
    backgroundColor: '#fff',
    marginTop: '-30%',
    borderBottomWidth: 3,
    borderColor: 'blue',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: '50%', // Adjust width to make the image smaller
    height: '30%', // Adjust height to maintain aspect ratio
    resizeMode: 'contain', // Ensure the entire image fits within the specified dimensions
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#ffff',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    marginLeft: 10,
  },
  description: {
    fontSize: 12,
    marginTop: 5,
  },

  courseContainer: {
    width: 180, // Set a fixed width to maintain consistency
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
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
  featuredContainer: {
    marginTop: 5,
  },
  featuredItem: {
    backgroundColor: '#fff',
    width: 200,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
    height: 250, // Set a fixed height for the card
    elevation: 3, // Add elevation for shadow effect
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 10,
    marginTop: 10,
  },
  featuredImage: {
    width: 220,
    height: 180,
    borderRadius: 10,
    position: 'relative',
    resizeMode: 'stretch',
  },
  cardStyle: {
    position: 'absolute',
    bottom: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: '95%',
    flex: 1,
    justifyContent: 'space-around',
    height: 50,
    borderRadius: 10,
    margin: 7,
  },
  cardTitle: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
    paddingStart: 15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  cardFeatured: {
    fontSize: 12,
    color: 'gray',
    paddingStart: 15,
  },
  trendingCoursesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 20, // Adjust paddingHorizontal to reduce the spacing
    marginBottom: 10, // Adjust marginBottom to reduce the spacing
  },

  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    marginHorizontal: 10,
  },

  trendingCoursesText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  feedbackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  feedbackText: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  comment: {
    fontSize: 14,
  },
  socialMediaIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  socialMediaIcon: {
    marginHorizontal: 10,
  },
});

export default Home;
