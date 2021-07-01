const Router = require('@koa/router');

const {fileUploads} = require('../api/FileUpload.api');

const router = new Router({
    prefix:'/upload'
})

/**
 * Route to file upload to the amazon aws S3
 */
router.post('/', async ctx => {
    let file = ctx.request.files.file;
    let files = {
        fileName: file.name,
        filePath: file.path,
        fileType: file.type
    }
    const {key,url} = await fileUploads(files);
    ctx.response.state = 201;
    ctx.body = {key,url};
})

module.exports = router;