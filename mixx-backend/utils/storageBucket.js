const serviceAccount = require('../firebase-admin-creds');
const admin = require("firebase-admin");
const fs = require('fs');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const bucket = admin.storage().bucket();

const uploadFileToBucket = async (filePath) => {
    return new Promise((resolve, reject) => {
        const fileName = filePath.split('/').pop();

        bucket.upload(filePath, {
            destination: fileName,
            metadata: {
                contentType: 'audio/mpeg',
            },
        }, (err, file) => {
            if (err) {
                reject(err);
            } else {
                resolve(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media`);
            }
        });
    });
}

module.exports = uploadFileToBucket;