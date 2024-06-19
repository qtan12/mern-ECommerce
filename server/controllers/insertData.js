const Product = require('../models/product')
const asyncHandler =  require('express-async-handler')
const data = require('../../data/data2.json')
const slugify = require('slugify')
const danhmucData = require('../../data/danhmuc-nhanhang')
const Danhmuc = require('../models/danhmuc')

const fn = async (product) => {
    await Product.create({
        title: product?.name,
        slug: slugify(product?.name) + Math.round(Math.random () * 1000) + 100 + '',
        description: product?.description,
        brand: product?.brand,
        price: Math.round(Number(product?.price?.match(/\d/g).join(''))/100),
        category: product?.category[1],
        quantity: Math.round(Math.random() * 1000),
        sold: Math.round(Math.random() * 1000),
        images: product?.images,
        color: product?.variants?.find(el => el.label === 'Color')?.variants[0] || 'Đen',
        thumb: product?.thumb,
        totalRatings: 0
    })
}
const chensanpham = asyncHandler(async(req, res) => {
    const promises = []
    for (let sanpham of data) promises.push(fn(sanpham))
    await Promise.all(promises)
    return res.json('đã insert data <3')
})
//---------------------------
const fn2 = async (cate) => {
    await Danhmuc.create({
        title: cate?.cate,
        brand: cate?.brand,
        image: cate?.image
    })
}
const chendanhmuc = asyncHandler(async(req, res) => {
    const promises = []
    for (let danhmuc of danhmucData) promises.push(fn2(danhmuc))
    await Promise.all(promises)
    return res.json('đã insert data <3')
})


module.exports = {
    chensanpham,
    chendanhmuc,
}