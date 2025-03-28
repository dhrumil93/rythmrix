import React, { useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const LoadingDots = () => {
  const animations = [
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ];

  useEffect(() => {
    const animate = () => {
      const sequence = animations.map((anim, index) => {
        return Animated.sequence([
          Animated.delay(index * 200),
          Animated.timing(anim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]);
      });

      Animated.loop(
        Animated.parallel(sequence)
      ).start();
    };

    animate();
  }, []);

  return (
    <View style={styles.container}>
      {animations.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            {
              transform: [{
                scale: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.5]
                })
              }],
              opacity: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 1]
              })
            }
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#003087',
    marginHorizontal: 5,
  },
});

export default LoadingDots; 