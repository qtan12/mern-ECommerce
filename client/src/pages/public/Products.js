import React, {useEffect, useState, useCallback} from 'react'
import { useParams, useSearchParams, useNavigate, createSearchParams } from 'react-router-dom'
import { apiGetSanpham } from '../../apis'
import { Breadcrumb, Product, SearchItem, InputSelectSort, Pagination } from '../../components'
import Masonry from 'react-masonry-css'
import { sorts } from '../../ultils/Navigation'

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

const Products = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState(null)
  const [activeClick, setActiveClick] = useState(null)
  const [params] = useSearchParams()
  const [sort, setSort] = useState('')
  const { category } = useParams()

  const fetchProductsByCategory = async(queries) => {
    if (category && category !== 'sanpham') queries.category =category
    const response = await apiGetSanpham(queries) 
      if (response.success) setProducts(response.products)
  }
  useEffect(() => {
    let param = []
    for (let i of params.entries()) param.push(i)
    const queries = {}
    let priceQuery = {} //lọc giá
    for (let i of params) queries[i[0]] = i[1]
    // lọc giá
    if (queries.to && queries.from) {
      priceQuery = { 
        $and : [
          {price: {gte: queries.from}},
          {price: {lte: queries.to}}
        ]
      }
      delete queries.price
    } 
    if (queries.from) queries.price = {gte: queries.from}
    if (queries.to) queries.price = {lte: queries.to}
    delete queries.to
    delete queries.from
    const q = { ...priceQuery, ...queries}
    fetchProductsByCategory(q)
  }, [params])

  const changeActiveFilter = useCallback((name) => {
    if (activeClick === name) setActiveClick(null)
    else setActiveClick(name)

  }, [activeClick])
  //sort
  const changeValueSort = useCallback((value) => {
    setSort(value)
  },[sort])
  useEffect(() => {
    navigate({
      pathname: `/${category}`,
      search: createSearchParams({sort}).toString()
    })
  }, [sort])
  return (
    <div className='w-full '>
      <div className='h-[81px] flex justify-center items-center bg-gray-100'>
        <div className='w-main'>
          <h3 className='font-semibold uppercase'>{category}</h3>   
          <Breadcrumb category={category}/>  
        </div>
      </div>
      <div className='w-main border p-4 mt-8 flex justify-between m-auto'>
          <div className='w-4/5 flex flex-col gap-3'>
            <span className='font-semibold text-sm text-gray-600'>Lọc theo</span>
            <div className='flex items-center gap-4 cursor-pointer '>
              <SearchItem
                name='giá tiền'
                activeClick={activeClick}
                changeActiveFilter={changeActiveFilter}
                type='input'
              />
              <SearchItem
                name='màu sắc'
                activeClick={activeClick}
                changeActiveFilter={changeActiveFilter}
              />
            </div>
          </div>
          <div className='w-1/5 flex flex-col gap-3'>
            <span className='font-semibold text-sm text-gray-600'>Xếp theo</span>
            <div className='w-full'>
              <InputSelectSort changeValueSort={changeValueSort} value={sort} options={sorts}/>
            </div>
          </div>
      </div>
      <div className='mt-8 w-main m-auto'>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid flex mx-[-10px]"
        columnClassName="my-masonry-grid_column">
        {products?.map(el => (
          <Product
          key={el._id}
          pid={el.id}
          productData={el}
          normal={true}
          />
        ))}
      </Masonry>
      </div>
      <div className='w-main m-auto flex justify-end '>
        <Pagination/>
      </div>
      <div className='w-full h-[300px]'></div>
    </div>
  )
}

export default Products