import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "../../../context/ToastContext";

export default function MembersScreen() {
  const router = useRouter();
  const { showToast } = useToast();
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        router.replace("/(auth)");
        return;
      }

      const response = await fetch(
        "https://ecg-wv62.onrender.com/api/adduser/getall-family-members",
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setMembers(data.data || []);
    } catch (error) {
      showToast(error.message || "Failed to fetch members", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditMember = (memberId) => {
    router.push({
      pathname: "/settings/members/editmembers",
      params: { id: memberId },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Family Members</Text>
        <TouchableOpacity
          onPress={() => router.push("/settings/members/addmembers")}
          style={styles.addButton}
        >
          <MaterialIcons name="add" size={24} color="#074799" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {isLoading ? (
          <View style={styles.centerContent}>
            <Text>Loading...</Text>
          </View>
        ) : members.length === 0 ? (
          <View style={styles.centerContent}>
            <Text style={styles.emptyText}>No family members added yet</Text>
          </View>
        ) : (
          members.map((member) => (
            <TouchableOpacity
              key={member._id}
              style={styles.memberCard}
              onPress={() => handleEditMember(member._id)}
            >
              <View>
                <Text style={styles.memberName}>{member.full_name}</Text>
                <Text style={styles.memberDetails}>
                  {member.relation} • {member.age} years • {member.gender}
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f7ff',
  },
  content: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 32,
  },
  centerContent: {
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  memberDetails: {
    fontSize: 14,
    color: '#666',
  },
});
