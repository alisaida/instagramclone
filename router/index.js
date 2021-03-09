

// const Router = () => {
//     return (
//         <Tab.Navigator
//             screenOptions={({ route }) => ({
//                 tabBarIcon: ({ focused, color, size }) => {
//                     let iconName;
//                     if (route.name === 'Home') {
//                         iconName = focused
//                             ? 'home'
//                             : 'home-outline';
//                         return <Ionicons name={iconName} size={size} color={color} />;
//                     } else if (route.name === 'Search') {
//                         iconName = focused
//                             ? 'search'
//                             : 'search-outline';
//                         return <Ionicons name={iconName} size={size} color={color} />;
//                     } else if (route.name === 'Profile') {
//                         iconName = focused
//                             ? 'person-circle'
//                             : 'person-circle-outline';
//                         return <Ionicons name={iconName} size={size} color={color} />;
//                     } else if (route.name === 'Post') {
//                         iconName = focused
//                             ? 'plussquare'
//                             : 'plussquareo';
//                         return <AntDesign name={iconName} size={size} color={color} />;
//                     } else if (route.name === 'Shop') {
//                         iconName = focused
//                             ? 'shopping'
//                             : 'shopping-outline';
//                         return <MaterialCI name={iconName} size={size} color={color} />;
//                     }
//                 },
//             })}
//             tabBarOptions={{
//                 activeTintColor: 'black',
//                 inactiveTintColor: 'gray',
//                 showLabel: false,
//             }}
//         >
//             <Tab.Screen name="Home" component={HomeStackScreen} />
//             <Tab.Screen name="Search" component={SearchScreen} />
//             {/* <Tab.Screen name="Post" component={PostScreen} /> */}
//             <Tab.Screen name="Shop" component={ShoppingScreen} />
//             <Tab.Screen name="Profile" component={ProfileScreen} />
//         </Tab.Navigator>
//     )
// }

// export default Router;