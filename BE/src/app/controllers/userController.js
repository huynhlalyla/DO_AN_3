const Users = require('../models/Users');
// Thêm người dùng
const addUser = async (req, res) => {
    try {
        const data = {
            name: 'Ly Ly',
            password: '1191',
            email: 'll@gmail.com',
            phone: '0965356321',
        };
        const user = new Users(data);
        await user.save();
        res.status(200).json({ status: 200 });
    } catch (error) {
        res.status(400).json({ status: 400 });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find({});
        return res.status(200).json({ status: 200, users });
    } catch (error) {
        return res.status(400).json({ status: 400 });
    }
}

// Xác thực người dùng
//POST /users/authenticate
const authenticateUser = async (req, res) => {
    try {
        const data = req.body;
        const user = await Users.findOne({ phone: data.phone });

        if (user && user.password === data.password) {
            return res.json({ status: 200, userData: user });
        } else {
            return res.json({ status: 400 });
        }
    } catch (error) {
        res.status(400).json({ status: 400 });
    }
};

// Đăng ký người dùng
const registerUser = async (req, res) => {
    try {
        const { phone, email, password } = req.body;
        // Kiểm tra nếu người dùng đã tồn tại (theo phone hoặc email)
        const existingUser = await Users.findOne({
            $or: [{ phone }, { email }]
        });
        // Nếu đã tồn tại, trả về status 400
        //kiểm tra cụ thể email hay phone đã tồn tại
        if (existingUser) {
            if (existingUser.phone === phone) {
                return res.json({ type: 'warn', message: 'Số điện thoại đã tồn tại!' });
            } else if (existingUser.email === email) {
                return res.json({ type: 'warn', message: 'Email đã tồn tại' });
            }
        }
        // Nếu chưa tồn tại, tạo người dùng mới
        const newUser = new Users({ phone, email, password });
        await newUser.save();
        return res.json({ type: 'success', message: 'Đăng ký thành công!' });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

// Đăng nhập người dùng
const loginUser = async (req, res) => {
    try {
        const { phone, password } = req.body;
        // Tìm người dùng theo số điện thoại
        const user = await Users.findOne({ phone });
        //nếu không tìm thấy thì báo chưa đăng kí
        if (!user) {
            return res.json({ status: 400, message: 'Số điện thoại chưa đăng ký!' });
        }
        // Nếu không tìm thấy user hoặc mật khẩu không đúng
        if (user.password !== password) {
            return res.json({ status: 400, message: 'Mật khẩu không đúng!' });
        }
        // Đăng nhập thành công, trả về dữ liệu người dùng
        return res.status(200).json({
            status: 200,
            userData: {
                id: user._id,
                phone: user.phone,
                email: user.email
            }
        });
    } catch (error) {
        // Bất kỳ lỗi nào cũng trả về status 400
        // return res.status(400).json({ status: 400 });
        console.error('Error during login:', error);
    }
};


module.exports = {
    addUser,
    authenticateUser, 
    registerUser, 
    loginUser,
    getAllUsers
};