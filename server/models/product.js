const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true, //bỏ dấu cách hai đầu
    },
    
    slug:{
        type:String,
        required:true,
        // unique:true,
        lowercase:true
    },
    category:{
        type:String,
        required:true,
        // type:mongoose.Types.ObjectId, // ObjectId liên kết đến Id của bảng nào?
        // ref: 'Category' // liên kết đến bảng Category này
    },
    brand:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    color:{
        type:String,
        require: true
    },
    description:{
        type:Array,
        required:true,
    },
    
    thumb: {
        type:String,
        required:true,
    },
    images:{
        type:Array,
    },
    quantity:{
        type:Number,
        default: 0,
    },
    sold:{
        type:Number,
        default: 0,
    },
    ratings:[ // đánh giá,
        {
            //số sao
            star: {type: Number},
            // người đánh giá
            postedBy: {type: mongoose.Types.ObjectId, ref: 'User'},
            comment: {type: String},
            updatedAt: {type: Date}
        }
    ],
    // số điểm đánh giá
    totalRatings: { 
        type: Number,
        default: 0,
    },
    varriants: [
        {
            title: String,
            color: String,
            price: Number,
            thumb: String,
            images: Array,
            sku: String
        }
    ]

}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Product', productSchema);