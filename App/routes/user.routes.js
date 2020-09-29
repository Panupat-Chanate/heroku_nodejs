module.exports = function(app) {
    var data = require('../controllers/user.controller');
    app.route('/user')
        .get(data.list);

    app.route('/test')
        .get(data.form)
        .post(data.formupload);

    app.route('/user/:Id')
        .get(data.api)

    app.route('/upload')
        .post(data.Upload);

    app.route('/check')
        .post(data.Check)
}