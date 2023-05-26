import React from 'react';
import type {TouchableOpacityProps} from 'react-native';
import {Text, TouchableOpacity} from 'react-native';

import styles from './styles';

type ButtonProps = {
  onPress: () => void;
  title?: string;
} & TouchableOpacityProps;

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  title,
  ...props
}) => {
  const buildContent = () => {
    if (children) {
      return children;
    }
    return <Text style={[styles.title]}>{title}</Text>;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, props.style, {opacity: props.disabled ? 0.5 : 1}]}
      {...props}>
      {buildContent()}
    </TouchableOpacity>
  );
};

export default Button;
