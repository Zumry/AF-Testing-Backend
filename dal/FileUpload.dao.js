const aws = require("aws-sdk");
const fs = require("fs");
const dotenv = require('dotenv');
dotenv.config();

/**
 * store file to the amazon aws S3
 */
const saveFile = async ({ fileName, filePath, fileType }) => {
    return new Promise((resolve, reject) => {
        aws.config.update({
            region: "ap-south-1",
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY,
        });

        const s3 = new aws.S3({
            apiVersion: "2006-03-01",
        });

        const stream = fs.createReadStream(filePath);
        stream.on("error", function(err) {
            reject(err);
        });

        s3.upload(
            {
                ACL: "public-read",
                Bucket: "afprouploadfiles",
                Body: stream,
                Key: fileName,
                ContentType: fileType,
            },
            function(err, data) {
                if (err) {
                    reject(err);
                } else if (data) {
                    resolve({ key: data.Key, url: data.Location });
                }
            }
        );
    });
};

module.exports = { saveFile };
