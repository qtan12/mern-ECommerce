import React, {memo, useEffect, useState} from 'react'
import icons from '../../ultils/icons'
import {colors} from '../../ultils/Navigation'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import { apiGetSanpham } from '../../apis'
import useDebounce  from '../../hooks/useDebounce'


const { FaChevronDown } = icons
const SearchItem = ({name, activeClick, changeActiveFilter, type='checkbox'}) => {
  const navigate = useNavigate()
  const {category} = useParams()
  const [selected, setSelected] = useState([])
  const [price, setPrice] = useState({
    from: '',
    to: ''
  })

  const [highestPrice, setHighestPrice] = useState(null)

  const handleSelect = (e) => {
    const alreadySelect = selected.find(el => el === e.target.value)
    if (alreadySelect) setSelected(prev => prev.filter(el => el !== e.target.value))
    else setSelected(prev => [...prev, e.target.value])
    changeActiveFilter(null)
  }
  const fetchHighestPriceProduct = async () => {
    const response = await apiGetSanpham({sort: '-price', limit: 1})
    if (response.success) setHighestPrice(response.products[0]?.price)
  }
  //type 'checkbox'
  useEffect(() => {
    if (selected.length > 0) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({
          color: selected.join(',')
        }).toString()
      })
    } else {
      navigate(`/${category}`)
    }    
  }, [selected])
  // type 'input'
  useEffect(() => {
    if (type === 'input') fetchHighestPriceProduct()
  }, [type])
  // useEffect(() => {
  //   if (price.to < price.from) alert('Không thể nhập giá lớn hơn giá tới')
  // }, [price])

  const debouncePriceFrom = useDebounce(price.from, 2000)
  const debouncePriceTo = useDebounce(price.to, 2000)

  useEffect(() => {
    const data = {}
    if(Number(price.from)>0) data.from = price.from
    if(Number(price.to)>0) data.to = price.to
      navigate({
        pathname: `/${category}`,
        search: createSearchParams(price).toString()
      })
  }, [debouncePriceFrom, debouncePriceTo])
  return (
    <div 
      className='p-4 text-xs text-gray-500 gap-4 relative border border-gray-500 flex justify-between items-center hover:border-emerald-600 hover:text-emerald-700'
      onClick={() => changeActiveFilter(name)}
    >
        <span className='capitalize'>{name}</span>
        <FaChevronDown/>
        {/* selected */}
        {activeClick === name && <div className='absolute top-[calc(100%+1px)] left-0 w-fit p-2 bg-white border min-w-[200px] z-10'>
            {type === 'checkbox' && <div className=''>
              <div className='p-4 items-center flex justify-between border-b '>
                <span className='whitespace-nowrap'>{`${selected.length} Đã chọn`}</span>
                <span onClick={e => {
                  e.stopPropagation()
                  setSelected([])}} 
                  className='underline hover:text-emerald-700 text-[13px]'>Xóa hết</span>
              </div>
              <div onClick={e => e.stopPropagation()} className='flex flex-col gap-4 mt-4'>
                {colors.map((el, index) =>(
                  <div key={index} className='flex items-center gap-6'>
                    <input 
                      type="checkbox" 
                      class="relative h-4 w-4 cursor-pointer border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:bg-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                      value={el}
                      onClick={handleSelect}
                      id={el}
                      checked={selected.some(selectedItem => selectedItem === el  )}
                     />
                    <label className='capitalize text-gray-700 text-[14px]' htmlFor={el}>{el}</label>
                  </div>                  
                ))}
              </div>
            </div>}
            
            {type === 'input' && <div onClick={e => e.stopPropagation()} >
            <div className='p-4 items-center flex justify-between border-b '>
                <span className='whitespace-nowrap'>{`Giá cao nhất ${Number(highestPrice).toLocaleString()} VNĐ `}</span>
                <span onClick={e => {
                  e.stopPropagation()
                  setPrice({from: '', to: ''})
                  changeActiveFilter(null)
                }} 
                  className='underline hover:text-emerald-700 text-[13px]'>Xóa hết</span>
              </div>
              <div className='flex items-center p-2 gap-2'>
                <div className='flex items-center gap-2'>
                  <label htmlFor='from'>VNĐ</label>
                  <input 
                  className='appearance-none block w-[123px] bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-4 mb-3  focus:outline-none focus:bg-white focus:border-gray-500' 
                  type="number" id="from" placeholder="Từ" 
                  value={price.from}
                  onChange={e => setPrice(prev => ({...prev, from: e.target.value}))}

                  />
                </div>
                <div className='flex items-center gap-2'>
                  <label htmlFor='to'>VNĐ</label>
                  <input 
                  className='appearance-none block w-[123px] bg-gray-200 text-gray-700 border border-gray-200 rounded py-4 px-4 mb-3  focus:outline-none focus:bg-white focus:border-gray-500' 
                  type="number" id="to" placeholder="Tới" 
                  value={price.to}
                  onChange={e => setPrice(prev => ({...prev, to: e.target.value}))}

                  />

                </div>
              </div>
            </div>}
        </div>}
    </div>
  )
}

export default memo(SearchItem)