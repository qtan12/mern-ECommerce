const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt') // hashpassword
const crypto = require('crypto'); 
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    //trường
    firstname:{
        // định dạng
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true, //ko duoc trungf
    },
    avatar: {
        type:String,
    },
    mobile:{
        type:String,
        // unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{ // phan quyen
        type:String,
        enum: [2002, 2024],
        default: 2024,
    },
    cart:[{
        product: { type: mongoose.Types.ObjectId, ref: 'Product'},
        quantity: Number,
        color: String,
        price: Number,
        thumbnail: String,
        title: String,
    }],
    address: { 
        type: Array,
        default: [] 
    }, 
    wishlist: [{type: mongoose.Types.ObjectId, ref: 'Product'}], //mang id sp nguoi dung yeu thich
    isBlocked: { // khoa tai khoan
        type: Boolean,
        default: false
    },
    refreshToken: { //
        type: String,
    },
    passwordChangeAt: { //quen mat khau
        type: String
    },
    passwordResetToken: { //gui qua mail token cho nguoi dung doi mat khau
        type: String
    },
    registerToken: {
        type: String
    },
    passwordResetExpires: { //thoi gian hieu luc token
        type: String
    },
},{
    timestamps: true
});

userSchema.pre('save', async function(next) { //trc khi luu hash password (ma hoa)
    if (!this.isModified('password')){ //neu ko thay doi password thi ko hash
        next() //nếu ko có thì out khỏi hàm
    } 
    const salt = bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt)
})
//login
// ktra so sanh pass nguoi dung nhap vao login voi hash pass
userSchema.methods = {
    isCorrectPassword: async function (password) {
        return await bcrypt.compare(password, this.password)
    },
    createPasswordChangedToken: function () {
        const resetToken = crypto.randomBytes(32).toString('hex')
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        this.passwordResetExpires = Date.now() + 15 * 60 * 1000
        return resetToken
    }
}

//Export the model
module.exports = mongoose.model('User', userSchema);