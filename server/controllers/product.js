const Product = require('../models/product') //
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const makeSKU = require('uniqid')

const themsanpham = asyncHandler(async (req, res) => {
    const {title, price, description, brand, category, color} = req.body
    const thumb = req?.files?.thumb[0]?.path
    const images = req.files?.images?.map(el => el.path)
    if (!title && !price && !description && !brand && !category && !color) throw new Error ('Lỗi truyền vào')
    //nếu có data
    if (req.body && req.body.title) req.body.slug = slugify ( req.body.title)
    if (thumb) req.body.thumb = thumb
    if (images) req.body.images = images
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? true : false,
        mes: newProduct ? 'Đã tạo sản phẩm.': 'khong the tao san pham moi'
    })
})

const lay1sanpham = asyncHandler(async (req, res) => {
    const { pid} = req.params
    const product = await Product.findById(pid).populate({
        path: 'ratings',
        populate: {
            path: 'postedBy',
            select: 'firstname lastname avatar'
        }
    })
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product: 'khong the lấy sp'
    })
})
const layAllsanpham = asyncHandler(async (req, res) => {
    const queries = { ...req.query };

// Tách các trường đặc biệt ra khỏi query
const excludeFields = ['limit', 'sort', 'page', 'fields'];
excludeFields.forEach((el) => delete queries[el]);

// Format lại các operators cho đúng cú pháp mongoose
let queryString = JSON.stringify(queries);
queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchedEl) => `$${matchedEl}`);
let formatedQueries = JSON.parse(queryString)
let colorQueryObject = {}
// Lọc
if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' }; // Tìm theo tên. 'i' không phân biệt chữ hoa chữ thường
if (queries?.category) formatedQueries.category = { $regex: queries.category, $options: 'i'} 
if (queries?.brand) formatedQueries.brand = { $regex: queries.brand, $options: 'i'} 
if (queries?.color) {
    delete formatedQueries.color
    const colorArr = queries.color?.split(',')
    const colorQuery = colorArr.map(el => ({color: {$regex: el, $options: 'i'} }))
    colorQueryObject = {$or: colorQuery}
}
let queryObject = {}
if (queries?.q){
    delete formatedQueries.q
    colorQueryObject = { $or: [
        { color: {$regex: queries.q, $options: 'i'} },
        { title: {$regex: queries.q, $options: 'i'} },
        { category: {$regex: queries.q, $options: 'i'} },
        { brand: {$regex: queries.q, $options: 'i'} },
        // { description: {$regex: queries.q, $options: 'i'} },
    ]}
}
const qr = { ...colorQueryObject, ...formatedQueries, ...queryObject}
let queryCommand = Product.find(qr);

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
const limit = +req.query.limit
// const limit = +req.query.limit || +process.env.LIMIT_PRODUCT; // Nếu trang 1 limit 3 bài thì trang 2 bỏ 3 bài, trang 3 bỏ 6 bài, trang 4 bỏ 9 bài...
const skip = (page - 1) * limit;

try {
    const totalCount = await Product.find(qr).countDocuments(formatedQueries); // Tổng số bản ghi
    const totalPages = Math.ceil(totalCount / limit); // Tổng số trang
    queryCommand = queryCommand.skip(skip).limit(limit);
    const response = await queryCommand.exec();
    return res.status(200).json({
      success: !!response,
      totalCount,
      totalPages,
      currentPage: page,
      products: response || [], //**** */
    });
  } catch (err) {
    throw new Error(err.message);
  }
})

const suasanpham = asyncHandler(async (req, res) => {
    const { pid} = req.params
    const files = req?.files
    if (files?.thumb) req.body.thumb = files?.thumb[0]?.path
    if (files?.images) req.body.images = ffiles?.images?.map(el => el.path)
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updateProduct = await Product.findByIdAndUpdate(pid,req.body)
    return res.status(200).json({
        success: updateProduct ? true : false,
        mes: updateProduct ? 'Đã cập nhật sản phẩm.': 'khong the update sp'
    })
})
const xoasanpham = asyncHandler(async (req, res) => {
    const { pid} = req.params
    const deleteProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deleteProduct ? true : false,
        mes: deleteProduct ? 'Đã xóa.' : 'No user delete'
    })
})
const ratings = asyncHandler(async (req, res) => {
    const { _id} = req.user
    const {star, comment, pid, updatedAt} = req.body
    if (!star || !pid) throw new Error(' Missing input') // kiểm tra có đánh giá, người đánh chưa
    const ratingProduct = await Product.findById(pid)
    const alreadyRating = ratingProduct?.ratings?.find(el => el.postedBy.toString() === _id)
    if (alreadyRating){ // nếu đã đánh giá, đánh giá lại thì update lại.
        // update star & comment
        await Product.updateOne({
            ratings: { $elemMatch: alreadyRating}
        }, {
            $set: {"ratings.$.star": star, "ratings.$.comment": comment, "ratings.$.updatedAt": updatedAt} // truy vấn vào star, comment
        },{ new: true})
    }else { // lần đầu đánh giá
        // add star & comment
        await Product.findByIdAndUpdate(pid,{
            $push: {ratings: { star, comment, postedBy: _id, updatedAt}}
        }, {new: true}) 
    }
    // điểm trung bình đánh giá 
    const updatedTotalRatings = await Product.findById(pid)
    const ratingCount =updatedTotalRatings.ratings.length
    const sumRatings = updatedTotalRatings.ratings.reduce((sum, el) => sum + +el.star ,0)
    updatedTotalRatings.totalRatings = Math.round(sumRatings * 10 / ratingCount) / 10
    await updatedTotalRatings.save()

    return res.status(200).json({
        success: true,
        updatedTotalRatings
    })
})

const uploadImgProduct = asyncHandler(async(req, res) => {
    const { pid } = req.params
        //req.files: nhiều file
    if (!req.files) throw new Error ('Missing input')     // push các phần tử vào mảng images. $each chỉ mõi phần tử file
    const response = await Product.findByIdAndUpdate(pid, {$push: {images: { $each: req.files.map(el => el.path),}}}, {new: true})
    return res.status(200).json({
        success: response ? true : false,
        rs: response ? response : 'Không thể upload ảnh '
    })
})

const addVarriant = async(req, res) => {
    const { pid } = req.params
    const {title, price, color} = req.body
    const thumb = req?.files?.thumb[0]?.path
    const images = req.files?.images?.map(el => el.path)
    if (!title && !price && !color) throw new Error ('Lỗi truyền vào')
    //nếu có data
    // if (req.body && req.body.title) req.body.slug = slugify ( req.body.title)
    // if (thumb) req.body.thumb = thumb
    // if (images) req.body.images = images
    const response = await Product.findByIdAndUpdate(pid, {
        $push: {
            varriants: { color, price, title, thumb, images, sku: makeSKU().toUpperCase() }
        } 
    }, {new: true})
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Đã thêm biến thể' : 'Thêm biến thể thất bại. '
    })
}
module.exports = {
    themsanpham,
    layAllsanpham,
    lay1sanpham,
    suasanpham,
    xoasanpham,
    ratings,
    uploadImgProduct,
    addVarriant
}