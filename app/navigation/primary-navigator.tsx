/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WelcomeScreen, DemoScreen, HomeScreen, PostsScreen, CategoriesScreen } from "../screens"
import { color, spacing } from "../theme"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 * 
 */



export type HomeParamList = {
  home: undefined,
  posts: undefined,
}

export type CategoryParamList = {
  categories: undefined,
  categoryHome: undefined,
  categoryPost:undefined
}

export type TabParamList = {
  homeTab: undefined
  categoriesTab: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const HomeStack = createStackNavigator<HomeParamList>()
const CategoryStack = createStackNavigator<CategoryParamList>()
const Tab = createBottomTabNavigator<TabParamList>();


export function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
      initialRouteName="home"
    >
      {/* <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="demo" component={DemoScreen} /> */}
      <HomeStack.Screen name="home" component={HomeScreen} />
      <HomeStack.Screen name="posts" component={PostsScreen} />      
    </HomeStack.Navigator>
  )
}

export function CategoryStackNavigator() {
  return (
    <CategoryStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
      initialRouteName="categories"
    >
      {/* <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="demo" component={DemoScreen} /> */}
      {/* <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="posts" component={PostsScreen} /> */}
      <CategoryStack.Screen name="categories" component={CategoriesScreen} />
      <CategoryStack.Screen name="categoryHome" component={HomeScreen} />
      <CategoryStack.Screen name="categoryPost" component={PostsScreen} />
    </CategoryStack.Navigator>
  )
}
export default function TabsNavigator() {
  return (
    <Tab.Navigator tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      activeBackgroundColor : color.palette.black,
      inactiveBackgroundColor : color.palette.lighterGrey
    }}>
      <Tab.Screen name="homeTab" component={HomeStackNavigator} />
      <Tab.Screen name="categoriesTab" component={CategoryStackNavigator} />
    </Tab.Navigator>
  );
}


export const PrimaryNavigator = TabsNavigator;
/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome", "home"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
