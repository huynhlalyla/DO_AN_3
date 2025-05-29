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

// Xác thực người dùng
//POST /users/authenticate
const authenticateUser = async (req, res) => {
    try {
        const data = req.body;
        const user = await Users.findOne({ phone: data.sdt });

        if (user && user.password === data.password) {
            res.status(200).json({ status: 200, userData: user });
        } else {
            res.status(400).json({ status: 400 });
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
        if (existingUser) {
            return res.status(400).json({ status: 400 });
        }
        // Nếu chưa tồn tại, tạo người dùng mới
        const newUser = new Users({ phone, email, password });
        await newUser.save();
        return res.status(200).json({ status: 200 });
    } catch (error) {
        return res.status(400).json({ status: 400 });
    }
};

// Đăng nhập người dùng
const loginUser = async (req, res) => {
    try {
        const { phone, password } = req.body;
        // Tìm người dùng theo số điện thoại
        const user = await Users.findOne({ phone });
        // Nếu không tìm thấy user hoặc mật khẩu không đúng
        if (!user || user.password !== password) {
            return res.status(400).json({ status: 400 });
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
        return res.status(400).json({ status: 400 });
    }
};


module.exports = {
    addUser,
    authenticateUser, 
    registerUser, 
    loginUser,
};