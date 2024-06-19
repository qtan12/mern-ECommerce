const User = require('../models/User');
const asyncHandler = require('express-async-handler')
const {generateAccessToken, generateRefreshToken} = require('..//middlewares//jwt')
const jwt = require('jsonwebtoken')
const sendMail = require('../ultils/sendMail')
const crypto = require('crypto')
const makeToken = require('uniqid')
const { users } = require('../ultils/Navigation');
const { constants } = require('buffer');

//-----------Đăng kí người dùng-----------//
const register = asyncHandler(async(req, res) => {
    // form đăng ký
    const { firstname, lastname, mobile, email, password } = req.body
    if( !firstname || !lastname || !mobile || !email || !password )
    return res.status(400).json({
        success: false,
        mes: 'Hãy điền đủ thông tin!'
    })
    // check mail
    const user = await User.findOne({ email})
    if (user)
    return res.status(400).json({
        success: false,
        mes: 'Người dùng đã tồn tại!'
    })
    // pass form đăng ký
    else {
        const token = makeToken() 
        const emailEdited = btoa(email) + '@' + token
        const newUser = await User.create({
            email: emailEdited, password, firstname, lastname, mobile
        })
        if (newUser) {
            const html = `<h2> Mã code Đăng ký:</h2><blockquote>${token}</blockquote>`
            await sendMail({email, html, subject: 'Xác nhận đăng ký'})
        }
        setTimeout(async() => {
            await User.deleteOne({email: emailEdited})
        }, [300000]) //5phut 
        return res.json({
            success: newUser ?  true : false,
            mes: newUser ? 'Hãy kiểm tra email của bạn ' : 'Đã xảy ra lỗi, hãy thử lại.'
        })
    }
   
})
// Sau bước nhập mã code đăng ký
const finalRegister = asyncHandler(async(req, res) => {
    // const cookie = req.cookies
    const { token } = req.params
    const notActivedEmail = await User.findOne({ email: new RegExp(`${token}$`)})
    if(notActivedEmail){ // tìm kiếm có notAcivedEmail
        notActivedEmail.email = atob(notActivedEmail?.email?.split('@')[0]) //giải mã email đã mã hóa trc đó
        notActivedEmail.save() //  Lưu lại thông tin của người dùng đã được cập nhật vào cơ sở dữ liệu.
    }
    return res.json({
        success: notActivedEmail ? true : false,
        mes: notActivedEmail ? 'Đăng ký thành công. Hãy tiếp tục đăng nhập' : 'xảy ra lỗi, hãy thử lại.'
    })
    // console.log(token)
    // console.log(cookie)
    // if (!cookie ||cookie?.dataregister?.token !== token ) {
    //     res.clearCookie('dataregister')
    //     return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`)
    // }
    // const newUser = await User.create({
    //     email: cookie?.dataregister?.email,
    //     password: cookie?.dataregister?.password,
    //     mobile: cookie?.dataregister?.mobile,
    //     firstname: cookie?.dataregister?.firstname,
    //     lastname: cookie?.dataregister?.lastname,
    // })
    // res.clearCookie('dataregister')
    // if (newUser) return res.redirect(`${process.env.CLIENT_URL}/finalregister/success`)
    // else return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`)
})
//-----------Login----------//
// Refresh token => cấp mới access token
// Access token => xác thực người dùng, phân quyền người dùng
const login = asyncHandler(async(req,res) =>{
    const {email, password} = req.body
    if(!email || !password) 
        return res.status(400).json({
            success: false,
            mes:'Bạn cần nhập đủ thông tin.'
        })

    const response = await User.findOne({email: email})
    if (response && await response.isCorrectPassword(password)){
        // tach password va role ra khoi response
        const {password, role, refreshToken, ...userData} = response.toObject()
        // tao acc token 
        const accessToken = generateAccessToken(response._id, role)
        // tao refresh token
        const newrefreshToken = generateRefreshToken(response._id)
        // Luu refresh token vao database
        await User.findByIdAndUpdate(response._id, {refreshToken: newrefreshToken}, {new: true})
        // luu refesh token vao cookie 
        res.cookie('refreshToken', newrefreshToken, {httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000})
        return res.status(200).json({
            success: true,
            accessToken,
            userData
        })
    } else{
        throw new Error('Xác thực không hợp lệ!')
    }
})
// lấy thông tin của 1 user
const getCurrent = asyncHandler(async(req,res) =>{
    const { _id} = req.user                  // select - loại bỏ
    const user = await User.findById(_id).select('-refreshToken -password').populate({
        path: 'cart',
        populate: {
            path: 'product',
            select: 'title thumb quantity price '
        }
    })
    return res.status(200).json({
        success: user ? true : false,
        rs: user ? user: 'User not found'
    })
})

const refreshAccessToken = asyncHandler(async(req,res) =>{
    //Lấy token từ cookies
    const cookie = req.cookies
    // check xem có token hay khôngkhông
    if (cookie && !cookie.refreshToken) throw new Error('No refresh token in cookies')
    // check token có hợp lệ ko 
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
    const response = await User.findOne({_id: rs._id, refreshToken: cookie.refreshToken})
        return res.status(200).json({
            success: response ? true : false,
            newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Refresh token khong khop'
        })
})
//--------Đăng xuất---------//
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookies')
    // Xóa refresh token ở db
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true })
    // Xóa refresh token ở cookie trình duyệt
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({
        success: true,
        mes: 'Logout is done'
    })
})
//---------OTP password-----------//
// client gửi email
// server check email có hợp lệ hay không => gửi email + kèm theo link ( password thay đổi token)
// client check mail => click link
// client gửi api kèm token
// ckeck token có giống với token mà server gửi mail hay không 
// change password

const forgotPassword  = asyncHandler(async(req, res) => {
    const {email} = req.body
    if (!email)
        return res.status(400).json({
            success: false,
            mes: 'Hãy điền đủ thông tin!'
        }) 
    const user = await User.findOne ({email})
    if (!user)
        return res.status(400).json({
            success: false,
            mes: 'Mail chưa đúng!'
        }) 
    const resetToken = user.createPasswordChangedToken()
    await user.save() // lưu trong db

    //
    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. 
        <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>Click here</a>`
    const data = {
        email,
        html,
        subject: 'quên mật khẩu'
    }
    const rs = await sendMail(data)
    return res.status(200).json({
        success: true,
        rs
        // success: rs.response?.includes('OK') ? true : false,
        // mes: rs.response?.includes('OK') ? 'Hãy check mail của bạn,' : 'Đã có lỗi, hãy thử lại sau.'
    })
})

const resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body
    if (!password || !token) throw new Error('lỗi đầu vào')
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } })
    if (!user)
        return res.status(200).json({
            success: user ? true : false,
            mes: 'Đã quá thời gian hãy quay lại thử lại sau.'
        })
    user.password = password
    user.passwordResetToken = undefined // xóa
    user.passwordChangeAt = Date.now()
    user.passwordResetExpires = undefined // xóa
    await user.save()
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? 'Cập nhật mật khẩu thành công' : 'đã xảy ra lỗi'
    })
})
const getAllusers = asyncHandler(async(req, res) => {
    const queries = { ...req.query };

    // Tách các trường đặc biệt ra khỏi query
    const excludeFields = ['limit', 'sort', 'page', 'fields'];
    excludeFields.forEach((el) => delete queries[el]);
    // Format lại các operators cho đúng cú pháp mongoose
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchedEl) => `$${matchedEl}`);
    const formatedQueries = JSON.parse(queryString)
    // Lọc
    if (queries?.name) formatedQueries.name = { $regex: queries.name, $options: 'i' }; // Tìm theo tên. 'i' không phân biệt chữ hoa chữ thường
    // Tìm kiếm người dùng
     if (req.query.q){
        delete formatedQueries.q
        formatedQueries.$or = [
            {firstname: { $regex: req.query.q, $options: 'i'}},
            {lastname: { $regex: req.query.q, $options: 'i'}},
        ];
     }
    let queryCommand = User.find(formatedQueries);
    // Sắp xếp
    if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    queryCommand = queryCommand.sort(sortBy);
    }
    // Lấy trường chỉ định
    if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    queryCommand = queryCommand.select(fields);
    }
   
    // Phân trang
    const page = +req.query.page || 1; // Số trang
    const limit = +req.query.limit || +process.env.LIMIT_PRODUCT; // Nếu trang 1 limit 3 bài thì trang 2 bỏ 3 bài, trang 3 bỏ 6 bài, trang 4 bỏ 9 bài...
    const skip = (page - 1) * limit;
    try {
        const totalCount = await User.find(formatedQueries).countDocuments(formatedQueries); // Tổng số bản ghi
        const totalPages = Math.ceil(totalCount / limit); // Tổng số trang
        queryCommand = queryCommand.skip(skip).limit(limit);
        const response = await queryCommand.exec();
        return res.status(200).json({
        success: !!response,
        totalCount,
        totalPages,
        currentPage: page,
        users: response || [], //**** */
        });
    } catch (err) {
        throw new Error(err.message);
    }        
})
const deletetUser = asyncHandler(async(req, res) => {
    const { uid} = req.params
    const response = await User.findByIdAndDelete(uid)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? `Đã xóa ${response.email}.` : 'No user delete'
    })
})
const updateUser = asyncHandler(async(req, res) => {
    console.log(req.file)
    const { _id} = req.user
    const {firstname, lastname, email, mobile, address} = req.body
    const data = {firstname, lastname, email, mobile, address}
    if (req.file) data.avatar = req.file.path
    if (!_id || Object.keys(req.body).length === 0) throw new Error('Missing inputs( lỗi truyền vào)')
    const response = await User.findByIdAndUpdate(_id, data, {new: true})
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Cập nhật thành công.' : 'some thing wrong'
    })
})
const updateUserByAdmin = asyncHandler(async(req, res) => {
    const { uid} = req.params
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs( lỗi truyền vào)')
    const response = await User.findByIdAndUpdate(uid, req.body, {new: true})
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Đã cập nhật' : 'xảy ra lỗi'
    })
})
const updateUserAddress = asyncHandler(async(req, res) => {
    const { _id } = req.user
    if (!req.body.address ) throw new Error('Missing input')
    const response = await User.findByIdAndUpdate(_id, {$push: { address: req.body.address }}, {new: true})
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'some thing wrong'
    })
})
const updateCart = asyncHandler(async(req, res) => {
    const { _id } = req.user    
    const {pid, quantity = 1, color, price, thumbnail, title } = req.body
    if (!pid || !color) throw new Error('Missing input')
    const user = await User.findById(_id).select('cart') //Lấy trường cart trong User
    //-- kiểm tra sản phẩm đã có trong giỏ hàng chưa?
    const alreadyProduct = user?.cart?.find(el => el.product.toString() === pid && el.color === color)
    if (alreadyProduct){
        const response = await User.updateOne({cart: {$elemMatch:alreadyProduct }}, { 
            $set: {
                "cart.$.quantity": quantity, 
                "cart.$.price": price, 
                "cart.$.thumbnail": thumbnail,
                "cart.$.title": title,
            }
        }, {new: true})
        return res.status(200).json({
            success: response ? true : false,
            mes: response ? 'Đã thêm vào giỏ hàng': 'Lỗi'
        })
    }else { // nếu chưa có
        const response = await User.findByIdAndUpdate(_id, {$push: {cart: { product: pid, quantity, color, price, thumbnail, title }}}, {new: true})
        return res.status(200).json({
            success: response ? true : false,
            mes: response ? 'Đã cập nhật giỏ hàng' : 'Lỗi'
        })
    }
})

const removeProductInCart = asyncHandler(async(req, res) => {
    const { _id } = req.user    
    const { pid, color } = req.params
    const user = await User.findById(_id).select('cart')
    //-- kiểm tra sản phẩm đã có trong giỏ hàng chưa?
    const alreadyProduct = user?.cart?.find(el => el.product.toString() === pid && el.color === color)
    if (!alreadyProduct) return res.status(200).json({
      success: true,
      mes: 'Đã xóa khỏi giỏ hàng.' 
    })
    const response = await User.findByIdAndUpdate(_id, { $pull: { cart: { product: pid, color }}}, {new: true})
        return res.status(200).json({
            success: response ? true : false,
            mes: response ? 'Đã xóa khỏi giỏ hàng' : 'Lỗi'
        })
})

const createUsers = async(req, res) => {
    const response = await User.create(users)
    return res.status(200).json({
        success: response ? true : false,
        users: response ? response : 'Lỗi'
    })
}

module.exports ={
    register,
    login,
    getCurrent,
    refreshAccessToken, 
    logout,
    forgotPassword,
    resetPassword,
    getAllusers,
    deletetUser,
    updateUser,
    updateUserByAdmin,
    updateUserAddress,
    updateCart,
    finalRegister,
    createUsers,
    removeProductInCart
}