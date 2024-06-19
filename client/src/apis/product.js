import axios from '../axios';

export const apiGetSanpham = (params) => axios({
    url: '/product/',
    method: 'get',
    params : params,
})
export const apiGetProduct = (pid) => axios({
    url: '/product/' + pid,
    method: 'get',
})
export const apiRatings = (data) => axios({
    url: '/product/ratings',
    method: 'put',
    data
})
export const apiCreateProduct = (data) => axios({
    url: '/product/',
    method: 'post',
    data
})
export const apiUpdateProduct = (data, pid) => axios({
    url: '/product/' + pid,
    method: 'put',
    data
})
export const apiDeleteProduct = ( pid) => axios({
    url: '/product/' + pid,
    method: 'delete',
})
export const apiAddVarriant = (data, pid) => axios({
    url: '/product/varriant/' + pid,
    method: 'put',
    data
})
export const apiCreateOrder = (data) => axios({
    url: '/donhang/',
    method: 'post',
    data
})