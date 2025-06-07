const userRouter = require('./user');
const transactionRouter = require('./transaction');
const Users = require('../app/models/Users');
function Router(app) {
    app.use('/user', userRouter);
    app.use('/transaction', transactionRouter);
}
module.exports = Router;