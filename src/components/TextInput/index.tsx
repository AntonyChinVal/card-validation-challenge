import React from 'react';
import {Text, TextInputProps as RNTextInputProps, View} from 'react-native';
import {TextInput as RNTextInput} from 'react-native';

import styles from './styles';

type TextInputProps = {
  errorMessage?: string;
} & RNTextInputProps;

const TextInput: React.FC<TextInputProps> = ({errorMessage, ...props}) => (
  <View style={[styles.container]}>
    <RNTextInput
      placeholderTextColor={'gray'}
      {...props}
      style={[styles.textInput, props.style]}
    />
    <Text style={styles.error}>{errorMessage}</Text>
  </View>
);

export default TextInput;
