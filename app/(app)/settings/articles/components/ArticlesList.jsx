import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import BlogCard from './BlogCard';
import TutorialCard from './TutorialCard';

const BLOGS = [
  {
    id: 1,
    title: 'How to Take an ECG',
    description: 'Step-by-step guide to recording your ECG.',
    readTime: '4 min read',
    image: require('../../../../../assets/images/lead2.png'),
  },
  {
    id: 2,
    title: 'Heart Risk Calculator',
    description: 'Step-by-step guide to recording your ECG.',
    readTime: '4 min read',
    image: require('../../../../../assets/images/monitor.png'),
  },
  // ... add more blogs as needed
];

const TUTORIALS = [
  {
    id: 1,
    title: 'How to Take an ECG Reading',
    duration: '3:45',
  },
  // ... more tutorials
];

export default function ArticlesList({ type }) {
  const content = type === 'blogs' ? BLOGS : TUTORIALS;
  const Component = type === 'blogs' ? BlogCard : TutorialCard;

  return (
    <ScrollView style={styles.container}>
      {content.map(item => (
        <Component key={item.id} {...type === 'blogs' ? { blog: item } : { tutorial: item }} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
}); 