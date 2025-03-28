import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const PlanCard = ({ title, duration, imageUrl, onPress, isPremium }) => {
  return (
    <TouchableOpacity 
      style={[styles.card, isPremium && styles.premiumCard]} 
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
        {isPremium && (
          <View style={styles.premiumBadge}>
            <FontAwesome5 name="crown" size={14} color="#fff" />
          </View>
        )}
        {isPremium && (
          <View style={styles.premiumOverlay}>
            <FontAwesome5 name="lock" size={20} color="#fff" />
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.duration}>{duration} Days</Text>
          {isPremium && (
            <View style={styles.premiumTag}>
              <Text style={styles.premiumText}>Premium</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  premiumCard: {
    borderColor: '#003087',
    borderWidth: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  premiumBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#003087',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duration: {
    fontSize: 14,
    color: '#666',
  },
  premiumTag: {
    backgroundColor: '#003087',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  premiumText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default PlanCard; 