import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {SearchScreen} from '../screens/SearchScreen';
import {DetailScreen} from '../screens/DetailScreen';
import {COLORS} from '../constants';

export type RootStackParamList = {
  Home: undefined;
  Search: {keyword?: string};
  Detail: {boothId: number};
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: COLORS.text,
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 18,
            letterSpacing: -0.3,
          },
          headerTitleAlign: 'left',
          cardStyle: {backgroundColor: COLORS.background},
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{title: '검색'}}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{title: '사진관 정보'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
