const homeRouter = require('./home');
const categoriesRouter = require('./category');
const userRouter = require('./user');
const transactionRouter = require('./transaction');
function Router(app) {
    app.use('/user', userRouter);
    app.use('/', homeRouter);
    app.use('/category', categoriesRouter);
    app.use('/transaction', transactionRouter);
}
module.exports = Router;