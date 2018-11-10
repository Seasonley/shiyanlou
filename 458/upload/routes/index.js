// 导入必备的模块，全局设置一些公共变量
var express = require('express'),
    router = express.Router(),
    formidable = require('formidable'),
    fs = require('fs'),
    TITLE = '文件上传示例',
    AVATAR_UPLOAD_FOLDER = '/avatar/';

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: TITLE });
});

router.post('/', function(req, res) {

    //创建上传表单
    var form = new formidable.IncomingForm();

    //设置编辑
    form.encoding = 'utf-8';

    //设置上传目录
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;

    //保留后缀
    form.keepExtensions = true;

    //文件大小 2M
    form.maxFieldsSize = 2 * 1024 * 1024;

    // 上传文件的入口文件
    form.parse(req, function(err, fields, files) {

        if (err) {
            res.locals.error = err;
            res.render('index', { title: TITLE });
            return;
        }

        var extName = ''; //后缀名
        switch (files.fulAvatar.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }

        if (extName.length == 0) {
            res.locals.error = '只支持png和jpg格式图片';
            res.render('index', { title: TITLE });
            return;
        }

        var avatarName = Math.random() + '.' + extName;
        var newPath = form.uploadDir + avatarName;
        fs.renameSync(files.fulAvatar.path, newPath); //重命名
    });

    res.locals.success = '上传成功';
    res.render('index', { title: TITLE });
});
var IMGS_ARRAY = [];

router.post('/', function(req, res) {
    // here coding ...

    form.parse(req, function(err, fields, files) {
        // here coding ...


        var imgs = AVATAR_UPLOAD_FOLDER + avatarName;
        IMGS_ARRAY.push(imgs);
    })

    // ...
    // 注释掉这行
    // res.render('index', { title: TITLE });
    res.redirect('/details');
})

// 建立 detail 页面的 get 请求
router.get('/details', function(req, res) {
    res.render('details', {
        title: '图片列表',
        imgs: IMGS_ARRAY
    });
});
module.exports = router;