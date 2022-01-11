import React, { useState, useEffect } from 'react'
import { Image, View, ImageBackground } from 'react-native';
import shorthash from 'shorthash';
import * as fs from 'react-native-fs';
import * as Progress from 'react-native-progress';

const index = ({ uri, style, showProgress }) => {

    const [localPath, setLocalPath] = useState('');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        cacheImage();
    }, []);


    const cacheImage = () => {
        if (!uri || uri === '')
            return
        const cacheDir = fs.CachesDirectoryPath;
        const filename = shorthash.unique(uri);
        const path = `${cacheDir}/instagram-clone/${filename}`;
        fs.exists(path).then((exists) => {
            if (exists) {
                // console.log('file already exists');
                setLocalPath(path);
            } else {
                // console.log('caching image');
                fs.downloadFile({
                    fromUrl: uri,
                    toFile: path,
                    progressDivider: 0,
                    begin: (res) => { },
                    progress: (res) => {
                        let percentage = (res.bytesWritten / res.contentLength);
                        setProgress(percentage);
                    }
                }).promise.then((r) => {
                    setLocalPath(path);
                }).catch(err => {
                    console.log(err);
                })
            }
        }).catch(error => {
            console.log('File path not found')
        })
    }

    return (
        localPath === '' && showProgress && progress !== 1 ?
            <ImageBackground source={{ uri: localPath !== "" ? localPath : undefined }} style={style} >
                <View style={{ height: style.height, width: style.width, borderWidth: 0.3, borderColor: 'grey', alignItems: 'center', justifyContent: 'center' }}>
                    <Progress.Circle progress={progress} showsText={true} size={50} />
                </View>
            </ImageBackground > :
            <Image source={{ uri: localPath !== "" ? localPath : undefined }} style={style} />
    )
}

export default index;
