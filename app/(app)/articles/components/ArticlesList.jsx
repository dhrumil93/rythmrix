import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const DUMMY_ARTICLES = {
  blogs: [
    {
      id: '1',
      title: 'Understanding ECG Basics',
      description: 'Learn the fundamentals of ECG reading and interpretation.',
      image: require('../../../../assets/images/ecg.png'),
      readTime: '5 min read',
    },
    {
      id: '2',
      title: 'Heart Health Tips',
      description: 'Daily habits to maintain a healthy heart.',
      image: require('../../../../assets/images/heart.png'),
      readTime: '3 min read',
    },
  ],
  tutorials: [
    {
      id: '1',
      title: 'How to Take an ECG',
      description: 'Step-by-step guide to recording your ECG.',
      image: require('../../../../assets/images/lead2.png'),
      readTime: '4 min read',
    },
    {
      id: '2',
      title: 'Using the Heart Risk Calculator',
      description: 'Learn how to assess your heart health risk.',
      image: require('../../../../assets/images/monitor.png'),
      readTime: '6 min read',
    },
  ],
};

export default function ArticlesList({ type = 'blogs' }) {
  const renderArticle = ({ item }) => (
    <TouchableOpacity style={styles.articleCard}>
      <Image source={item.image} style={styles.articleImage} />
      <View style={styles.articleContent}>
        <Text style={styles.articleTitle}>{item.title}</Text>
        <Text style={styles.articleDescription}>{item.description}</Text>
        <Text style={styles.readTime}>{item.readTime}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={DUMMY_ARTICLES[type]}
      renderItem={renderArticle}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 60, 
  },
  articleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  articleImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  articleContent: {
    padding: 16,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  articleDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  readTime: {
    fontSize: 12,
    color: '#074799',
    fontWeight: '500',
  },
}); 