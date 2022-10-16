import React, { useEffect, useState, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, ScrollView, Button, KeyboardAvoidingView, Keyboard, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { autoCompletePlaces } from '../../api/google-maps';
import Entypo from 'react-native-vector-icons/Entypo';

const PlaceSearchScreen = ({ }) => {
    const route = useRoute();
    const navigation = useNavigation();

    const [userInput, setUserInput] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('');
    const searchInput = useRef();
    const [locations, setLocations] = useState([]);
    const [image, setImage] = useState({});
    const [selectedProfiles, setSelectedProfiles] = useState([]);

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    useEffect(() => {
        const image = route.params.image;
        setImage(image);

        const selectedProfiles = route.params.taggedProfiles;
        setSelectedProfiles(selectedProfiles)
    }, []);

    const search = async (value) => {

        try {
            if (value !== '') {
                const response = await autoCompletePlaces(value);

                if (response) {
                    const results = response.predictions.map(location => {
                        return location.description
                    });

                    setLocations(results);
                }
            }
        } catch (error) {
            console.log(`PlaceSearchScreen: Failed to autoCompletePlace for ${value}`, error);
        }

    }

    const onSelectLocation = (place) => {
        navigation.navigate('CreatePost', { taggedProfiles: selectedProfiles, image: image, location: place });
    }

    const renderItems = (item, index) => {
        return (
            <View>
                <TouchableOpacity style={styles.profileContainer} onPress={() => onSelectLocation(item)}>
                    <View style={styles.iconContainer}>
                        <Entypo name='location-pin' size={30} color={'black'} style={{ marginVertical: 10 }} />
                    </View>
                    <View style={styles.profileDetails}>
                        <Text style={styles.locationName}>{item}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }


    const clearSearch = () => {
        searchInput.current.clear();
        setUserInput('');
        Keyboard.dismiss();
        navigation.pop();
    }

    return (
        <SafeAreaView >
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="magnify" size={22} color="#9e9e9e" style={{ marginHorizontal: 5 }} />
                    </View>
                    <TextInput
                        clearButtonMode="always"
                        style={styles.input}
                        placeholder="Search"
                        placeholderTextColor="#9e9e9e"
                        onSubmitEditing={(e) => search(e.nativeEvent.text)}
                        ref={searchInput}
                        backgroundColor={'#efefef'}
                    />
                </View>
                <Button title="Cancel" onPress={() => { clearSearch() }} />
            </View>
            {locations && locations.length !== 0 &&
                <View>
                    <FlatList
                        data={locations}
                        keyExtractor={(item) => item.toString()}
                        renderItem={({ item, index }) => renderItems(item, index)}
                        numColumns={1}
                        contentContainerStyle={{ flexGrow: 1 }}
                    />
                </View>}
        </SafeAreaView >
    );
}

export default PlaceSearchScreen;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginTop: 2
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        // paddingHorizontal: 20,
        height: 35,
        alignItems: 'center',
        backgroundColor: '#efefef',
    },
    input: {
        flex: 1,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        alignItems: 'center',
    },
    profileDetails: {
        marginLeft: 3
    },
    locationName: {
        fontWeight: '500',
        fontSize: 15
    },
})