const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var donhangSchema = new mongoose.Schema({
    
    products:[{
        product: { type: mongoose.Types.ObjectId, ref: 'Product'},
        quantity: Number,
        color: String,
        price: Number,
        thumbnail: String,
        title: String,
    }],
    status:{
        type:String,
        default: 'Bị hủy',
        enum: ['Bị hủy', 'Hoàn tất']
    },
    total: Number,
    // coupon: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'GiamGia'
    // },
    
    orderBy: { // thanh toán bởi ai
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('DonHang', donhangSchema)