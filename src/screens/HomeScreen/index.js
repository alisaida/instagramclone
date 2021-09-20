import React, { useEffect } from 'react';
import { SafeAreaView, Text, Image, View } from 'react-native';

import Feed from '../../components/Feed';

const HomeScreen = ({ navigation }) => {


  // Side-effect cleanup
  useEffect(() => {
    return () => { };
  }, []);

  return (
    <SafeAreaView>
      <Feed navigation={navigation} />
    </SafeAreaView >
  );
}

export default HomeScreen;

