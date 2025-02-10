import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function OTPInput({ code, setCode, length = 4 }) {
  const inputRefs = useRef([]);
  const [inputValues, setInputValues] = useState(Array(length).fill(''));

  const handleChange = (text, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputValues(newInputValues);
    setCode(newInputValues.join(''));

    // Move to next input if there's a value
    if (text && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (event, index) => {
    // Move to previous input on backspace
    if (event.nativeEvent.key === 'Backspace' && !inputValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array(length).fill(0).map((_, index) => (
        <TextInput
          key={index}
          ref={ref => inputRefs.current[index] = ref}
          style={styles.input}
          maxLength={1}
          keyboardType="number-pad"
          value={inputValues[index]}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  input: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    color: '#333',
  },
}); 