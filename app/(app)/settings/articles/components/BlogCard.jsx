import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const BASE_URL = 'https://ecg-wv62.onrender.com/';

export default function BlogCard({ blog }) {
  // Construct the full image URL
  const imageUrl = blog.photo ? `${BASE_URL}${blog.photo.replace(/\\/g, '/')}` : null;

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.image}
            defaultSource={require('../../../../../assets/images/potassium.png')}
          />
        ) : (
          <Image 
            source={require('../../../../../assets/images/potassium.png')} 
            style={styles.image}
          />
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{blog.blog_title}</Text>
        <Text style={styles.description}>{blog.description}</Text>
        <Text style={styles.readTime}>{blog.read_time}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  imageContainer: {
    marginRight: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
    resizeMode: 'cover',
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  readTime: {
    fontSize: 14,
    color: '#074799',
    fontWeight: '500',
  },
}); 