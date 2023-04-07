const loginRoute = require('./acrout.route')
const sanphamRoute = require('./sanpham.route')
const userRoute = require("./user.route")
function routes ( app ) {
    app.use('/',loginRoute);
    app.use('/sanpham',sanphamRoute);
    app.use('/user',userRoute);
    app.use('/home',(req,res) => {
        res.render('home')
    });
}
module.exports = routes;
