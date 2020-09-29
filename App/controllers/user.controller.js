var Data = require('mongoose').model('tb_alumni');
var multer = require('multer');
var path = require('path');
const fs = require('fs');

exports.list = function(req, res, next) {
    // User.find({}, function(err, users){
    Data.find({
        // age: {$gt: 18, $lt:60},
        // interests: {$in: ['games', 'movies']}
    })
    // .where('age').gt(18).lt(60)
    // .where(interests).in(['games', 'movies'])
    // .skip(10)
    // .limit(10)
    .select('_id firstName lastName Date')
    .exec(function(err, datanames) {
        if (err) {
            return next(err);
        }else{
            res.json(datanames);
        }
    });
}
exports.Check = function(req, res) {
    console.log(req.body.checkId)
    Data.findOne({_id: req.body.checkId}, (err, dataId) => {
        if (err) return console.log(err)
        if (dataId === null) {
            console.log("ไม่มี");
            var checked ={
                checkedState: false
            };
            console.log(checked);
            res.json(checked);
        } else {
            console.log('มีแล้ว');
            var checked ={
                checkedState: true
            };
            console.log(checked);
            res.json(checked);
        }
    })
}

exports.api = function(req, res) {
    console.log(req.params.Id)
    Data.findOne({_id: req.params.Id}, (err, result) => {
        if (err) return console.log(err)
        console.log(result);
        res.contentType('image/jpeg');
        res.send(result.img.image)
    })
}

exports.form = function(req, res) {
    res.render('signup', {title: 'TEST'});
}
exports.formupload = function(req, res, next) {
    var storage = multer.diskStorage({
        // destination: './Public/img/',
        destination: function (req, file, cb) {
            cb(null, './Public/img/')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname))
        }
      })
       
    var upload = multer({ 
        storage: storage,
        // limits: {fileSize:1000000000000000000000000000000},
        fileFilter: function(req, file, cb) {
            checkFileType(file, cb);
        }
    }).single('btnImg')

    // check file type
    function checkFileType(file, cb) {
        //กำหนด ext
        const filetypes= /jpeg|jpg|png|gif/;
        //ทดสอบ ext
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        // check mime
        const mimetype = filetypes.test(file.mimetype);
        
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            console.log('error')
            cb('Error: Images Only');
        }
    }

    upload(req, res, (err) => {
        if(err) {
            console.log(err)
            res.render('signup', {title: err});
        } else {
            var img = fs.readFileSync(req.file.path);
            var encode_image = img.toString('base64');
            // console.log(img)
            // console.log(encode_image)

            var profile = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                img: {
                    contentType: req.file.mimetype,
                    image: Buffer.from(encode_image, 'base64')
                }
            };
            var data = new Data(profile);
            console.log(data);

            data.save((err, result) => {
                console.log(result)
                if (err) return console.log(err)
                console.log('saved to database')
                res.redirect('/')
            })
        }
    })
}

exports.Upload = function(req, res, next) {
    const storage = multer.diskStorage({
        destination: "./Public/upload/",
        filename: function(req, file, cb){
           cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
        }
     });
       
     const upload = multer({
        storage: storage,
        // limits:{fileSize: 1000000},
     }).single("Image");

    upload(req, res, (err) => {
        // console.log("Request body --->", req.body);
        const objData = JSON.parse(JSON.stringify(req.body));
        console.log(objData);
        console.log("Request file --->", req.file);

        if (err) {
            console.log(err)
            res.render('/');
        } else {
            if (req.body) {
                res.redirect('/')
                var img = fs.readFileSync(req.file.path);
                var encode_image = img.toString('base64');
                var profile = {
                    _id: req.body.id,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    startYear: req.body.startYear,
                    email: req.body.email,
                    phone: req.body.phone,
                    address: req.body.address,
                    position: req.body.position,
                    workplace: req.body.workplace,
                    degree1: req.body.degree1,
                    degree2: req.body.degree2,
                    degree3: req.body.degree3,
                    img: {
                        contentType: req.file.mimetype,
                        image: Buffer.from(encode_image, 'base64')
                    }
                };
                var data = new Data(profile);
                data.save((err, result) => {
                    console.log(result)
                    if (err) return console.log(err)
                    console.log('Saved to DB')
                })
            } else {
                
            }
        }
    })
}