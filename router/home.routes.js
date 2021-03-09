// import HomeScreen from './screens/HomeScreen';
// import { createStackNavigator } from '@react-navigation/stack';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import logo from './assets/images/instagram-logo.png'
// import {
//     StatusBar,
//     SafeAreaView,
//     Image,
//     View
// } from 'react-native';
// const HomeStack = createStackNavigator();

// const HomeRoutes = () => (
//     <HomeStack.Navigator>
//         <HomeStack.Screen
//             name="Home"
//             component={HomeScreen}
//             options={{
//                 title: 'Instagram',
//                 headerTitleAlign: 'left',
//                 headerRightContainerStyle: {
//                     marginRight: 20,
//                 },
//                 headerRight: () => (
//                     <View style={{ flexDirection: 'row', width: 130, justifyContent: 'space-between', alignItems: 'center' }}>
//                         <Ionicons name='ios-camera-outline' size={26} color={'black'} />
//                         <Ionicons name='heart-outline' size={26} color={'#000'} />
//                         <Ionicons name='chatbubble-ellipses-outline' size={25} color={'#000'} />
//                     </View>
//                 ),
//                 headerTitle: () => (
//                     <Image source={logo} style={{ width: 150, resizeMode: 'contain', marginLeft: 5 }} />
//                 )
//             }}
//         />
//     </HomeStack.Navigator >
// )

// export default HomeRoutes;