const Users = require('../models/Users');
const nodemailer = require('nodemailer');
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
            return res.json({ 
                status: 200, 
                userData: {
                    _id: user._id,
                    phone: user.phone,
                    email: user.email,
                    name: user.name || 'User'
                }
            });
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
        const { phone, email, password, name } = req.body;
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
        const newUser = new Users({ phone, email, password, name });
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
        }        // Đăng nhập thành công, trả về dữ liệu người dùng
        return res.status(200).json({
            status: 200,
            userData: {
                _id: user._id,
                phone: user.phone,
                email: user.email,
                name: user.name || 'User'
            }
        });
    } catch (error) {
        // Bất kỳ lỗi nào cũng trả về status 400
        // return res.status(400).json({ status: 400 });
        console.error('Error during login:', error);
    }
};

const changePassword = async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;

    try {
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        // Kiểm tra mật khẩu cũ
        if (user.password !== oldPassword) {
            return res.status(400).json({ status: 400, message: 'Incorrect old password' });
        }

        // Cập nhật mật khẩu mới
        user.password = newPassword;
        await user.save();

        return res.status(200).json({ status: 200, message: 'Password changed successfully' });
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Internal server error' });
    }
};

const updateUserProfile = async (req, res) => {
    const { userId, name, email } = req.body;
    console.log(userId, name, email);
    try {
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }
        // Cập nhật thông tin người dùng
        user.name = name;
        user.email = email;
        await user.save();

        return res.status(200).json({ status: 200, message: 'Profile updated successfully' });
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Internal server error' });
    }
};

// Yêu cầu OTP đặt lại mật khẩu (moved to module scope)
const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        if(!email) return res.status(400).json({ status: 400, message: 'Thiếu email' });
        const user = await Users.findOne({ email });
        if(!user) return res.status(200).json({ type: 'warn', message: 'Email không tồn tại' });

        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const expires = new Date(Date.now() + 5 * 60 * 1000);
        user.resetOtp = otp;
        user.resetOtpExpires = expires;
        // Clear previous session token if any
        user.resetSessionToken = null;
        user.resetSessionExpires = null;
        await user.save();

        // Send email via centralized mailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jienrury007@gmail.com',
                pass: 'sgcx wciz qyzd gdua'
            }
        });
        try {
            await transporter.sendMail({
                from: 'jienrury007@gmail.com',
                to: email,
                subject: 'Mã OTP đặt lại mật khẩu',
                text: `Mã OTP của bạn là ${otp}. Hết hạn sau 5 phút.`,
                html: `<p>Mã OTP của bạn là <b style="font-size:20px;">${otp}</b></p><p>OTP hết hạn vào: ${expires.toLocaleString()}</p>`
            });
        } catch(mailErr){
            console.error('Send mail error', mailErr);
            return res.json({ type:'error', message:'Không gửi được email. Liên hệ hỗ trợ.' });
        }

        return res.json({ type: 'success', message: 'Đã gửi OTP (kiểm tra email)', expiresAt: expires });
    } catch (error) {
        console.error('requestPasswordReset error', error);
        return res.status(500).json({ status: 500, message: 'Lỗi máy chủ' });
    }
};

// Xác thực OTP -> cấp phiên reset (không đổi mật khẩu)
const verifyResetOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if(!email || !otp) return res.status(400).json({ status:400, message:'Thiếu dữ liệu'});
        const user = await Users.findOne({ email });
        if(!user || !user.resetOtp || !user.resetOtpExpires){
            return res.json({ type:'warn', message:'Không tìm thấy yêu cầu đặt lại'});
        }
        if(user.resetOtpExpires < new Date()){
            return res.json({ type:'warn', message:'OTP đã hết hạn'});
        }
        if(user.resetOtp !== otp){
            return res.json({ type:'warn', message:'OTP không đúng'});
        }
        // Tạo reset session token (simple random) với cùng thời hạn OTP
        const token = Math.random().toString(36).slice(2, 12);
        user.resetSessionToken = token;
        user.resetSessionExpires = user.resetOtpExpires; // same expiry
        await user.save();
        return res.json({ type:'success', message:'Xác thực OTP thành công', token, expiresAt: user.resetSessionExpires });
    } catch (error) {
        console.error('verifyResetOtp error', error);
        return res.status(500).json({ status:500, message:'Lỗi máy chủ'});
    }
};

// Đặt lại mật khẩu bằng reset session token
const resetPasswordWithToken = async (req, res) => {
    try {
        const { email, token, newPassword } = req.body;
        if(!email || !token || !newPassword){
            return res.status(400).json({ status:400, message:'Thiếu dữ liệu'});
        }
        const user = await Users.findOne({ email });
        if(!user || !user.resetSessionToken || !user.resetSessionExpires){
            return res.json({ type:'warn', message:'Phiên đặt lại không hợp lệ'});
        }
        if(user.resetSessionExpires < new Date()){
            return res.json({ type:'warn', message:'Phiên đặt lại đã hết hạn'});
        }
        if(user.resetSessionToken !== token){
            return res.json({ type:'warn', message:'Token không hợp lệ'});
        }
        user.password = newPassword;
        // Clear all reset fields
        user.resetOtp = null;
        user.resetOtpExpires = null;
        user.resetSessionToken = null;
        user.resetSessionExpires = null;
        await user.save();
        return res.json({ type:'success', message:'Đặt lại mật khẩu thành công' });
    } catch (error) {
        console.error('resetPasswordWithToken error', error);
        return res.status(500).json({ status:500, message:'Lỗi máy chủ'});
    }
};

module.exports = {
    addUser,
    authenticateUser,
    registerUser,
    changePassword,
    updateUserProfile,
    loginUser,
    getAllUsers,
    requestPasswordReset,
    verifyResetOtp,
    resetPasswordWithToken
};