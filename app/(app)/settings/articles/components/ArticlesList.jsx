import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BlogCard from './BlogCard';
import TutorialCard from './TutorialCard';

const TUTORIALS = [
  {
    id: 1,
    title: 'How to Take an ECG Reading',
    duration: '3:45',
  },
  // ... more tutorials
];

export default function ArticlesList({ type }) {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      if (type !== 'blogs') {
        setContent(TUTORIALS);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await fetch('https://ecg-a7et.onrender.com/api/user/article/getAllArticles', {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }

        const data = await response.json();
        setContent(data.articles || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [type]);

  const Component = type === 'blogs' ? BlogCard : TutorialCard;

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {content.map(item => (
        <Component key={item._id || item.id} {...type === 'blogs' ? { blog: item } : { tutorial: item }} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
}); 