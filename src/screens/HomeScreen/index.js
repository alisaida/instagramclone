import React, { useEffect } from 'react';
import { SafeAreaView, Text, Image, View } from 'react-native';

import Feed from '../../components/Feed';

const HomeScreen = () => {


  // Side-effect cleanup
  useEffect(() => {
    return () => { };
  }, []);

  return (
    <SafeAreaView>
      <Feed />
    </SafeAreaView >
  );
}

export default HomeScreen;

