import * as fs from 'react-native-fs';
import AWS from 'aws-sdk';
import { Buffer } from "buffer"

import { ACCESS_KEY_ID, SECRET_ACCESS_KEY, S3_BUCKET_NAME } from '@env';

const s3 = new AWS.S3({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY
});

export const uploadToS3 = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file.path, 'ascii').then(fileContent => {
            const params = {
                Bucket: S3_BUCKET_NAME,
                Key: file.path.split('/').pop(),
                Body: new Buffer(fileContent, 'binary'),
                ContentType: 'image/jpeg',
                ContentEncoding: 'base64',
            };

            const uploadObjectPromise = s3.upload(params).promise();

            uploadObjectPromise.then(uploadObject => {
                if (uploadObject) {
                    return resolve(uploadObject);
                } else {
                    return reject(null);
                }
            })
        });
    });
};
