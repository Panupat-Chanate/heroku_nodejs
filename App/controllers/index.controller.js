//ส่งฟังค์ชั่น render ออกไปให้เรียกใช้
//ไปเอาview tp ที่ VIEWS //อะไรก็ที่คำสั่ง render มันจะไปหาที่ VIEWS

exports.render = function(req, res) {
    // res.render('index', {title: 'WEST-COAST', message: 'Welcome to California', LoginSS: false});
    res.send('Nodejs');
}