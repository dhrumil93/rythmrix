import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://ecg-wv62.onrender.com";

const getAvatarUrl = (username) => {
  const collections = [
    "avataaars",
    "bottts",
    "pixel-art",
    "lorelei",
    "micah",
    "adventurer",
  ];
  const collection = collections[0];
  return `https://api.dicebear.com/7.x/${collection}/png?seed=${username}&backgroundColor=b6e3f4`;
};

export default function UserHeader() {
  const router = useRouter();
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(0))[0];
  
  // Add new states for user data and members
  const [userData, setUserData] = useState(null);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
    fetchFamilyMembers();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) return;

      const response = await fetch(`${BASE_URL}/api/user/getprofile`, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User Profile:", data);
        setUserData(data);
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  const fetchFamilyMembers = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) return;

      const response = await fetch(`${BASE_URL}/api/adduser/getall-family-members`, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Family Members:", data);
        setFamilyMembers(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching family members:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleGuestMode = () => {
    setIsGuestMode(!isGuestMode);
    Animated.spring(slideAnim, {
      toValue: isGuestMode ? 0 : 1,
      useNativeDriver: true,
      speed: 12,
      bounciness: 8,
    }).start();
  };

  const handleAddMember = () => {
    setModalVisible(false);
    router.push("/(app)/settings/members/addmembers");
  };

  const handleEditProfile = () => {
    setModalVisible(false);
    router.push("/(app)/settings/profile");
  };

  return (
    <View style={styles.userSection}>
      <View style={styles.userInfo}>
        <TouchableOpacity onPress={handleEditProfile}>
          <Image
            source={{ uri: getAvatarUrl(userData?.full_name || 'user') }}
            style={styles.avatar}
            defaultSource={require("../../../../assets/images/default-avatar.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="add" size={32} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.guestModeWrapper}>
        <View style={styles.guestModeContainer}>
          <TouchableOpacity
            style={styles.guestModeTab}
            onPress={() => isGuestMode && toggleGuestMode()}
          >
            <Text
              style={[
                styles.guestModeText,
                { color: isGuestMode ? "#074799" : "#FFFFFF" },
              ]}
            >
              OFF
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.guestModeTab}
            onPress={() => !isGuestMode && toggleGuestMode()}
          >
            <Text
              style={[
                styles.guestModeText,
                { color: isGuestMode ? "#FFFFFF" : "#074799" },
              ]}
            >
              GUEST MODE
            </Text>
          </TouchableOpacity>
          <Animated.View
            style={[
              styles.slider,
              {
                transform: [
                  {
                    translateX: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 75],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select a member</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.membersList}>
            {/* Main user profile */}
            {userData && (
              <TouchableOpacity style={styles.memberItem} onPress={handleEditProfile}>
                <View style={styles.memberAvatar}>
                  <Image
                    source={{ uri: getAvatarUrl(userData.full_name) }}
                    style={styles.memberAvatarImage}
                  />
                  <View style={styles.checkIcon}>
                    <MaterialIcons name="check" size={12} color="#fff" />
                  </View>
                </View>
                <Text style={styles.memberName}>{userData.full_name}</Text>
              </TouchableOpacity>
            )}

            {/* Family members */}
            {familyMembers.map((member) => (
              <TouchableOpacity 
                key={member._id} 
                style={styles.memberItem}
                onPress={() => {
                  // Handle member selection
                  setModalVisible(false);
                }}
              >
                <View style={styles.memberAvatar}>
                  <Image
                    source={{ uri: getAvatarUrl(member.full_name) }}
                    style={[styles.memberAvatarImage, { borderColor: '#ccc' }]}
                  />
                </View>
                <Text style={[styles.memberName, { color: '#333' }]}>{member.full_name}</Text>
              </TouchableOpacity>
            ))}

            {/* Add New Member button */}
            <TouchableOpacity style={styles.addNewMember} onPress={handleAddMember}>
              <View style={styles.addIcon}>
                <MaterialIcons name="add" size={24} color="#074799" />
              </View>
              <Text style={styles.addNewText}>Add New</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  userSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  profileButton: {
    marginLeft: 10,
  },
  guestModeWrapper: {
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    padding: 2,
  },
  guestModeContainer: {
    flexDirection: "row",
    position: "relative",
    width: 150,
    height: 26,
  },
  guestModeTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  guestModeText: {
    fontSize: 9,
    fontWeight: "500",
  },
  slider: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "50%",
    height: "100%",
    backgroundColor: "#074799",
    borderRadius: 20,
    zIndex: 0,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 200,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  membersList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  memberItem: {
    alignItems: 'center',
    marginRight: 30,
  },
  memberAvatar: {
    position: 'relative',
    marginBottom: 8,
  },
  memberAvatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#00FF00',
  },
  checkIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#00FF00',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberName: {
    fontSize: 16,
    color: '#FF0000',
  },
  addNewMember: {
    alignItems: 'center',
  },
  addIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  addNewText: {
    fontSize: 16,
    color: '#333',
  },
});
