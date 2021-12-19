import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from "react-native-modal";


const PostMenuItem = () => {

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const hideMenu = () => setModalVisible(false);
    const showMenu = () => setModalVisible(true);

    const openGallery = () => {

        setTimeout(() => {
            ImagePicker.openPicker({
                width: 300,
                height: 300,
                cropping: true,
                compressImageQuality: 0.7,
                forceJpg: true
            }).then(image => {
                // console.log(image);
                // console.log(setImageData(image));
                navigation.push('CreatePost', { image: image });
            }).catch(error => { });
        }, 400)

    };

    const openCamera = () => {
        setTimeout(() => {
            ImagePicker.openCamera({
                compressImageMaxWidth: 300,
                compressImageMaxHeight: 300,
                cropping: true,
                compressImageQuality: 0.7,
                forceJpg: true
            }).then(image => {
                // console.log(image);
                // console.log(setImageData(image));
                navigation.push('CreatePost', { image: image });
            }).catch(error => { });
        }, 400)

    };

    const setImageData = (image) => {
        const data = {
            images: null,
            files: image,
            type: image.mime,
            fileName: image.path.split('/').pop(),
            image: { uri: image.path, width: image.width, height: image.height, mime: image.mime },
        }

        return data;
    }

    return (
        <View>
            <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Menu visible={modalVisible} anchor={<Text onPress={showMenu}>
                    <FontAwesome name='plus-square-o' size={26} color={'black'} /></Text>} onRequestClose={hideMenu}
                >
                    <MenuItem onPress={() => {
                        openCamera();
                        hideMenu();
                    }}><Ionicons name='ios-camera-outline' size={25} color={'black'} /> Camera</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={() => {
                        openGallery();
                        hideMenu();
                    }}><Ionicons name='images-outline' size={24} color={'black'} /> Photos</MenuItem>
                </Menu>
            </View>
        </View>
    )
}

export default PostMenuItem

const styles = StyleSheet.create({})
