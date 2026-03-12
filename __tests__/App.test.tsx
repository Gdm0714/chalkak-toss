import 'react-native';
import React from 'react';
import {it, expect} from '@jest/globals';
import renderer from 'react-test-renderer';

jest.mock('../src/navigation/AppNavigator', () => {
  const {View, Text} = require('react-native');
  return {
    AppNavigator: () => (
      <View>
        <Text>ChalkakToss</Text>
      </View>
    ),
  };
});

import App from '../App';

it('renders correctly', () => {
  const tree = renderer.create(<App />);
  expect(tree.toJSON()).toBeTruthy();
});
