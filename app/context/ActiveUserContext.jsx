import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ActiveUserContext = createContext();

export function ActiveUserProvider({ children }) {
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    loadActiveUser();
  }, []);

  const loadActiveUser = async () => {
    try {
      const activeUserData = await AsyncStorage.getItem('activeUser');
      if (activeUserData) {
        setActiveUser(JSON.parse(activeUserData));
      }
    } catch (error) {
      console.error('Error loading active user:', error);
    }
  };

  const updateActiveUser = async (user) => {
    try {
      await AsyncStorage.setItem('activeUser', JSON.stringify(user));
      setActiveUser(user);
    } catch (error) {
      console.error('Error updating active user:', error);
    }
  };

  return (
    <ActiveUserContext.Provider value={{ activeUser, updateActiveUser }}>
      {children}
    </ActiveUserContext.Provider>
  );
}

export const useActiveUser = () => useContext(ActiveUserContext);
