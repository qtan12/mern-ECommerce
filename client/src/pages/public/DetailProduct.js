import React ,{useCallback, useEffect, useRef, useState} from 'react'
import { createSearchParams, useParams } from 'react-router-dom'
import { apiGetProduct, apiGetSanpham, apiUpdateCart } from '../../apis' 
import { Breadcrumb, Button, SelectQuantity, ProductExtraInfoItem, InfomationProduct, CustomSlider} from '../../components'
import Slider from 'react-slick';
import ReactImageMagnify from 'react-image-magnify';
import {formatMoney, renderStar } from '../../ultils/helpers'
import { productExtraInfomation } from '../../ultils/Navigation'
import DOMPurify from 'dompurify';
import { clsx } from 'clsx'
import { useSelector } from 'react-redux';
import { getCurrent } from '../../store/user/asyncActions';
import withBaseComponent from '../../hocs/withBaseComponent';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import path from '../../ultils/path';

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

const DetailProduct = ({isQuickView, data, location, dispatch, navigate }) => {
    const titleRef = useRef()
    const params = useParams()
    const { current } = useSelector(state => state.user)
    const [product, setProduct] = useState(null)
    const [currentImage, setCurrentImage] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [relatedProducts, setRelatedProducts] = useState(null)
    const [update, setUpdate] = useState(false)
    const [varriant, setVarriant] = useState(null)
    const [pid, setPid] = useState(null)
    const [category, setCategory] = useState(null)
    const [currentProduct, setCurrentProduct] = useState({
        title: '',
        price: '',
        color: '',
        thumb: '',
        images: [],
    })
    useEffect(() => {
        if (data) {
            setPid(data.pid) 
            setCategory(data.category)
        } 
        else if (params && params.pid) {
            setPid(params.pid)
            setCategory(params.category)
        }
    }, [data, params])
    const fetchProductData = async () =>{
        const response = await apiGetProduct(pid)
        if (response.success) {
            setProduct(response.productData)
            setCurrentImage(response.productData?.thumb)
        }
    }
    useEffect(() => {
        if (varriant) {
            setCurrentProduct({
                title: product?.varriants?.find(el => el.sku === varriant)?.title,
                color: product?.varriants?.find(el => el.sku === varriant)?.color,
                price: product?.varriants?.find(el => el.sku === varriant)?.price,
                images: product?.varriants?.find(el => el.sku === varriant)?.images,
                thumb: product?.varriants?.find(el => el.sku === varriant)?.thumb,
            })
        } else {
            setCurrentProduct({
                title: product?.title,
                color: product?.color,
                price: product?.price,
                images: product?.images || [],
                thumb: product?.thumb,
            })
        }
    }, [varriant, product])
    const fetchRelatedProducts = async () => {
        const response = await apiGetSanpham({category})
        if (response.success) setRelatedProducts(response.products)
    }
    useEffect(() => {
         if (pid) {
            fetchProductData()
            fetchRelatedProducts()
         }
         window.scrollTo(0, 0)
         titleRef.current?.scrollIntoView({block: 'start'})
    },[pid])

    useEffect(() => {
        if (pid) {
           fetchProductData()
        }
   },[update])
    const rerender = useCallback(() => {
        setUpdate(!update)
    }, [update])
    
    const handleQuantity = useCallback((number) => {        
        if(!Number(number) || Number(number) < 1) {
            return
        }else {
            setQuantity (number)
        }
    },[quantity])
    const handleChangeQuantity = useCallback((flag) => {
        if (flag === 'minus' && quantity === 1) return
        if (flag === 'minus') setQuantity(prev => +prev - 1)
        if (flag === 'plus') setQuantity(prev => +prev + 1)

    }, [quantity])
    const handleAddToCart = async() => {
        if(!current) return Swal.fire({
            title: 'Thông báo',
            text: 'Bạn chưa đăng nhập!',
            icon: 'info',
            cancelButtonText:'Không phải bây giờ',
            showCancelButton: true,
            confirmButtonText: 'Đăng nhập',
          }).then(async(rs) => {
            if (rs.isConfirmed) navigate({
                pathname: `/${path.LOGIN}`,
                search: createSearchParams({redirect: location.pathname}).toString()
            })
          })
          const response = await apiUpdateCart({
            pid, 
            color: currentProduct.color || product?.color, 
            quantity, 
            price: currentProduct.price || product.price,
            thumbnail: currentProduct.thumb || product.thumb,
            title: currentProduct.title || product.title,

          })
          if (response.success) {
            toast.success(response.mes)
            dispatch(getCurrent())
          }
          else toast.error(response.mes)
    }
    const handleCurrentImage = (e, el) => {
        e.stopPropagation()
        setCurrentImage(el)
    }
    return (
        <div ref={titleRef} className={clsx('w-full')}>
            {/* Breadcrumb */}
            {!isQuickView && <div className='h-[81px] flex justify-center items-center bg-gray-100'>
                <div className='w-main'>
                    <h3 className='font-semibold'>{currentProduct.title || product?.title}</h3>   
                    <Breadcrumb title={currentProduct.title || product?.title} category={category}/>  
                </div>
            </div>}
            
            <div onClick={e => e.stopPropagation()} className={clsx('bg-white m-auto mt-4 flex', isQuickView ? 'max-w-[1100px] gap-16 p-8 max-h-[80vh] overflow-y-auto' : 'w-main')}>
                {/* Cột hình ảnh */}
                <div className={clsx('flex flex-col gap-4 w-2/5', isQuickView && 'w-1/2')}>
                    <div className='h-[450px] w-[450px]  border border-emerald-700 overflow-hidden'>
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                src: currentProduct.thumb ||currentImage,
                            },
                            largeImage: {
                                src: currentProduct.thumb || currentImage,
                                width: 500,
                                height: 1500
                            }
                        }} />
                    </div>
                    {/* <img src={product?.images} alt="hinhanh" className='border border-blue-300 h-[458px] w-[458px] object-cover'/> */}
                    <div className='w-[458px]'>
                        <Slider className='image-slider w-full gap-2 flex' {...settings}>
                            {currentProduct.images.length === 0 && product?.images?.map(el => (
                                <div className='flex-1' key={el}>
                                    <img onClick={e => handleCurrentImage(e, el)} src={el } alt="sub-product" className='h-[143px] w-[143px]  border border-emerald-700 object-cover cursor-pointer'/>
                                </div>
                            ))}
                            {currentProduct.images.length > 0 && currentProduct?.images?.map(el => (
                                <div className='flex-1' key={el}>
                                    <img onClick={e => handleCurrentImage(e, el)} src={el } alt="sub-product" className='h-[143px] w-[143px] border border-emerald-700 object-cover cursor-pointer'/>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>

                {/*Description product-single, AddToCart */}
                <div className={clsx('w-2/5 pl-[24px] flex flex-col gap-2', isQuickView && 'w-1/2')}>
                    <span className="text-emerald-700">{`Kho: ${product?.quantity}`}</span>
                    <h2 className='text-[30px] font-semibold'>{`${formatMoney(currentProduct?.price || product?.price)} VNĐ`} </h2>
                    <div className='flex items-center'>
                        {renderStar(product?.totalRatings)?.map((el, index) => (<span key={index}>{el}</span>))}
                        <span className='text-emerald-700 italic'>{`(Đã bán: ${product?.sold} cái)`}</span>
                    </div>
                    <ul className=' text-gray-500 list-square pl-4'>
                        {product?.description?.length > 1 && product?.description?.map(el => (<li className='leading-8' key={el}>{el}</li>)) }
                        {product?.description?.length === 1 && <div className='text-sm' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(product?.description[0]) }}></div>}
                    </ul>
                    <div className='my-4 flex gap-4'>
                        <span className='font-bold'>Color</span>
                        <div className=' flex flex-wrap item-center gap-4 w-full'>
                            <div onClick={() => setVarriant(null)} 
                                className={clsx('flex gap-2 items-center p-2 border cursor-pointer', !varriant && 'border-emerald-700')} 
                            >
                                <img src={product?.thumb} alt="thumb" className='w-8 h-8 object-cover'/>
                                <span className='flex flex-col'>
                                    <span>{product?.color}</span>
                                    <span className='text-sm'>{product?.price}</span>
                                </span>
                            </div>
                            {/* Biến thể */}
                            {product?.varriants?.map(el => (
                                <div key={el.sku} 
                                    onClick={() => setVarriant(el.sku)} 
                                    className={clsx('flex gap-2 items-center p-2 border cursor-pointer', varriant === el.sku && 'border-emerald-700')}
                                >
                                    <img src={el?.thumb} alt="thumb" className='w-8 h-8 object-cover'/>
                                    <span className='flex flex-col'>
                                        <span>{el?.color}</span>
                                        <span className='text-sm'>{el?.price}</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-4'>
                            <span className='font-semibold'>Số lượng</span>
                            <SelectQuantity 
                                quantity={quantity} handleQuantity={handleQuantity}
                                handleChangeQuantity={handleChangeQuantity}
                            />
                        </div>
                        <Button handleOnClick={handleAddToCart} fw>
                            THÊM VÀO GIỎ HÀNG
                        </Button>
                    </div>
                </div>
                {/* Extrainfo product */}
                {!isQuickView && <div className='w-1/5 '>
                    {productExtraInfomation.map( el => (
                        <ProductExtraInfoItem 
                            key={el.id}
                            title={el.title}
                            icon={el.icon}
                            sub={el.sub}
                        />
                    ))}
                </div >}
            </div>
            {!isQuickView && <div className='w-main m-auto mt-8'>
                <InfomationProduct 
                    totalRatings={product?.totalRatings} 
                    ratings={product?.ratings}
                    nameProduct={product?.title}
                    pid={product?._id}
                    rerender={rerender}
                />
            </div>}
            {!isQuickView && <> 
                <div className='w-main m-auto mt-8'>
                    <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-emerald-700' >SẢN PHẨM LIÊN QUAN </h3>
                    <CustomSlider normal={true} product={relatedProducts}/>
                </div>
                <div className='h-[100px] w-full'></div>
            </>}
        </div>
    )
}

export default withBaseComponent(DetailProduct)