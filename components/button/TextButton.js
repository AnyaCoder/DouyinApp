import React from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';

const TextButton = ({ title, onPress, style }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Text style={style}>{title}</Text>
        </TouchableWithoutFeedback>
    );
};

export default TextButton;
