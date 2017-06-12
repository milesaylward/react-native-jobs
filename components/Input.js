import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor= "rgba(255, 255, 255, .6)"
        autoCorrect={true}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        underlineColorAndroid='rgba(0,0,0,0)'
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#fff',
    backgroundColor: 'rgba(160, 218, 242, .9)',
    paddingRight: 5,
    paddingLeft: 15,
    fontSize: 18,
    lineHeight: 23,
    flex: 1,
    height: 40,
    borderRadius: 10
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export default Input;
