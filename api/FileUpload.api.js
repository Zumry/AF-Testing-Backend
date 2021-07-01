const { saveFile } = require('../dal/FileUpload.dao');

/**
 *  file upload to the amazon aws S3
 */
const fileUploads = async ({fileName, filePath, fileType}) =>{
    return await saveFile({fileName, filePath, fileType});
}

module.exports = {fileUploads};