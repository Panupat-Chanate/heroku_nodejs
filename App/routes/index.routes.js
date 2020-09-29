module.exports = function(app) {
    var index = require('../controllers/index.controller') //สร้างตัวแปร index รับค่าจาก controller 
    app.get('/', index.render) //ถ้ามาที่ route ให้เรียกใช้function index.render (app.get,post,put,delete)
}