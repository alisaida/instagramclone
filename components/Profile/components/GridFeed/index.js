import React, { useState, useEffect } from 'react';
import { Image, FlatList, Dimensions, View } from 'react-native';

import Content from './component/Content'

import styles from './styles';

import data from '../../../../data/photos';

const numColumns = 3;
const GridFeed = () => {
    return (
        <View>
            <FlatList
                data={data}
                renderItem={({ item }) => <Content content={'https://drive.google.com/thumbnail?id=13Q1jk2JMAXkEdqbhivEBwCiKfln7neKB'} />}
                numColumns={numColumns}
            />
        </View>
    );
};

export default GridFeed;
