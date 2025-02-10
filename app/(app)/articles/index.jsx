import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import SearchBar from '../../components/shared/SearchBar';
import TabSelector from './components/TabSelector';
import ArticlesList from './components/ArticlesList';
import BottomNav from '../../components/shared/BottomNav';

export default function ArticlesScreen() {
  const [activeTab, setActiveTab] = useState('blogs');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Articles</Text>
      </View>

      <SearchBar 
        placeholder="Search for blogs and tutorials"
      />

      <TabSelector 
        tabs={[
          { id: 'blogs', label: 'Blogs' },
          { id: 'tutorials', label: 'Tutorials' }
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <ArticlesList type={activeTab} />

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight || 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
}); 