import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback, // Import TouchableWithoutFeedback
} from 'react-native';
import {
  Avatar,
  Button,
  IconButton,
  Divider,
  Card,
  Title,
  Paragraph,
  Icon,
} from 'react-native-paper';
import Modal from 'react-native-modal';

const Profile = ({ isAuthenticated }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: 'Santosh Kumar Sarivatava',
    email: 'example@example.com',
    phone: '1234567890',
  });

  const handleEditProfile = () => {
    setIsModalVisible(true);
  };

  const handleSaveProfile = () => {
    // Implement logic to save edited profile details
    console.log('Profile details saved:', editedProfile);
    setIsModalVisible(false);
  };

  const renderFollowButton = () => {
    if (isAuthenticated) {
      return (
        <Button
          mode="contained"
          style={styles.followButton}
          onPress={() => console.log('Follow pressed')}>
          Follow
        </Button>
      );
    } else {
      return null;
    }
  };

  const renderMessageButton = () => {
    if (isAuthenticated) {
      return (
        <IconButton
          icon="message"
          color="#fff"
          size={20}
          style={styles.messageButton}
          onPress={() => console.log('Message pressed')}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={handleEditProfile}>
            <Avatar.Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
              size={100}
              style={styles.avatar}
            />
            <View style={styles.editIcon}>
            <Icon source="pencil-outline" size={25} color="black"  />
            </View>
          </TouchableOpacity>
          <Text style={styles.username}>Santosh Kumar Sarivatava</Text>
          <Text style={styles.bio}>
            I'm an avid traveler, passionate photographer, and aspiring chef.
            Exploring new destinations, capturing the beauty of the world
            through my lens, and experimenting with diverse cuisines are my
            greatest passions. With each journey, I seek to broaden my horizons,
            immerse myself in different cultures, and create unforgettable
            memories. Join me on my adventures as I share my experiences and
            insights with you!
          </Text>
          <View style={styles.followContainer}>
            {renderFollowButton()}
            {renderMessageButton()}
          </View>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.statsContainer}>
          <View style={styles.statsItem}>
            <Text style={styles.statsNumber}>300</Text>
            <Text style={styles.statsLabel}>Posts</Text>
          </View>
          <View style={styles.statsItem}>
            <Text style={styles.statsNumber}>10K</Text>
            <Text style={styles.statsLabel}>Followers</Text>
          </View>
          <View style={styles.statsItem}>
            <Text style={styles.statsNumber}>500</Text>
            <Text style={styles.statsLabel}>Following</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Details</Text>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Location:</Text>
            <Text style={styles.detailText}>New York, USA</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Website:</Text>
            <Text style={styles.detailText}>www.johndoe.com</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Social Media:</Text>
            <View style={styles.socialMediaContainer}>
              <IconButton
                icon="facebook"
                iconColor="#3b5998"
                size={20}
                onPress={() => console.log('Facebook pressed')}
              />
              <IconButton
                icon="twitter"
                iconColor="#1da1f2"
                size={20}
                onPress={() => console.log('Twitter pressed')}
              />
              <IconButton
                icon="instagram"
                iconColor="#c13584"
                size={20}
                onPress={() => console.log('Instagram pressed')}
              />
            </View>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Interests:</Text>
            <Text style={styles.detailText}>
              Traveling, Photography, Cooking
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Favorite Books:</Text>
            <Text style={styles.detailText}>
              To Kill a Mockingbird, 1984, The Great Gatsby
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Introduction:</Text>
            <Text style={styles.detailText}>
              Hi, I'm John! I love exploring new places, capturing moments
              through my camera lens, and experimenting with different cuisines
              in the kitchen.
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.postsContainer}>
        <Text style={styles.sectionTitle}>Recent Posts</Text>
        <Card style={{marginBottom: 20, backgroundColor: '#f0f0f0'}}>
          <Card.Content>
            <Title>Post Title</Title>
            <Paragraph>
              This is a recent post content. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
            </Paragraph>
          </Card.Content>
          <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
          <Card.Actions>
            <Button>Read more</Button>
          </Card.Actions>
        </Card>
        <Card style={{marginBottom: 20, backgroundColor: '#f0f0f0'}}>
          <Card.Content>
            <Title>Another Post Title</Title>
            <Paragraph>
              This is another recent post content. Sed ut perspiciatis unde
              omnis iste natus error sit voluptatem accusantium doloremque
              laudantium.
            </Paragraph>
          </Card.Content>
          <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
          <Card.Actions/>
        </Card>
      </View>
      <View style={styles.additionalContent}>
        <Card style={styles.additionalCard}>
          <Card.Content>
            <Title style={styles.additionalTitle}>Recent Articles</Title>
            <TouchableOpacity onPress={() => console.log('Article 1 pressed')}>
              <View style={styles.articleContainer}>
                <Image
                  source={{
                    uri: 'https://tse2.mm.bing.net/th?id=OIP.9Izv-aszItToTtEqRMSE0QHaE6&pid=Api&P=0&h=180',
                  }}
                  style={styles.articleImage}
                />
                <Text style={styles.articleTitle}>
                  Exploring the Wonders of Nature
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Article 2 pressed')}>
              <View style={styles.articleContainer}>
                <Image
                  source={{
                    uri: 'https://tse2.mm.bing.net/th?id=OIP.9Izv-aszItToTtEqRMSE0QHaE6&pid=Api&P=0&h=180',
                  }}
                  style={styles.articleImage}
                />
                <Text style={styles.articleTitle}>
                  10 Must-Visit Destinations Around the World
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Article 3 pressed')}>
              <View style={styles.articleContainer}>
                <Image
                  source={{
                    uri: 'https://tse2.mm.bing.net/th?id=OIP.9Izv-aszItToTtEqRMSE0QHaE6&pid=Api&P=0&h=180',
                  }}
                  style={styles.articleImage}
                />
                <Text style={styles.articleTitle}>
                  The Art of Food Photography: Tips and Tricks
                </Text>
              </View>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      </View>
      <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
        <Modal isVisible={isModalVisible} style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.input}
              value={editedProfile.name}
              onChangeText={(text) => setEditedProfile({ ...editedProfile, name: text })}
              placeholder="Name"
            />
            <TextInput
              style={styles.input}
              value={editedProfile.email}
              onChangeText={(text) => setEditedProfile({ ...editedProfile, email: text })}
              placeholder="Email"
            />
            <TextInput
              style={styles.input}
              value={editedProfile.phone}
              onChangeText={(text) => setEditedProfile({ ...editedProfile, phone: text })}
              placeholder="Phone"
            />
            <TextInput
              style={styles.input}
              value={''}
              onChangeText={(text) => setEditedProfile({ ...editedProfile, phone: text })}
              placeholder="User name"
            />
            <TextInput
              style={styles.input}
              value={''}
              onChangeText={(text) => setEditedProfile({ ...editedProfile, phone: text })}
              placeholder="Alternate Email Address"
            />
            <TextInput
              style={styles.input}
              value={""}
              onChangeText={(text) => setEditedProfile({ ...editedProfile, phone: text })}
              placeholder="Adress"
            />
            <TextInput
              style={styles.input}
              value={""}
              onChangeText={(text) => setEditedProfile({ ...editedProfile, phone: text })}
              placeholder="Alternate Address"
            />
            
            <View style={styles.modalButtons}>
              <Button mode="outlined" onPress={() => setIsModalVisible(false)}>Cancel</Button>
              <Button mode="contained" onPress={handleSaveProfile}>Save</Button>
            </View>
          </View>
        </Modal>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  avatar: {
    marginBottom: 10,
    borderColor: '#fff',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  bio: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#555',
    width:'70%'
  },
  followContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followButton: {
    backgroundColor: '#007bff',
    marginRight: 10,
    borderRadius: 20,
  },
  messageButton: {
    backgroundColor: '#555',
    borderRadius: 20,
  },
  divider: {
    marginVertical: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statsItem: {
    alignItems: 'center',
  },
  statsNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsLabel: {
    color: '#555',
  },
  detailsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  detailText: {
    flex: 1,
  },
  socialMediaContainer: {
    flexDirection: 'row',
  },
  postsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  additionalContent: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  additionalCard: {
    elevation: 3,
    backgroundColor: '#f0f0f0',
  },
  additionalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  articleImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  additionalParagraph: {
    fontSize: 16,
    color: '#555',
  },
  articleTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
     backgroundColor: 'grey',
     borderRadius:10
  },
});

export default Profile;

