import path from "./path"
import icons from "./icons"

export const navigation = [
    {
        id: 1,
        value: 'TRANG CHỦ',
        path: `/${path.TRANGCHU}`
    },
    {
        id: 2,
        value: 'SẢN PHẢM',
        path: `/${path.SANPHAM}` 
    },
    {
        id: 3,
        value: 'BÀI VIẾT',
        path: `/${path.BLOGS}`
    },
    {
        id: 4,
        value: 'CÂU HỎI THƯỜNG GẶP',
        path: `/${path.FAQ}`
    },
    {
        id: 5,
        value: 'DỊCH VỤ',
        path: `/${path.SERVICES}`
    },
    
]
const {FaShieldAlt, FaTruck,FaGift, FaReply, FaTty} = icons
export const productExtraInfomation = [
    {
        id: '1',
        title: 'Bảo đảm',
        sub: 'Đã kiểm tra chất lượng',
        icon: <FaShieldAlt/>
    },
    {
        id: '2',
        title: 'Miễn phí vận chuyển',
        sub: 'Miễn phí vận chuyển tất cả sản phẩm',
        icon: <FaTruck/>
    },
    {
        id: '3',
        title: 'Thẻ quà tặng đặc biệt',
        sub: 'Thẻ quà tặng đặc biệt',
        icon: <FaGift/>
    },
    {
        id: '4',
        title: 'Hoàn trả miễn phí',
        sub: 'Trong vòng 7 ngày',
        icon: <FaReply/>
    },
    {
        id: '5',
        title: 'Tư vấn',
        sub: '24/7',
        icon: <FaTty/>
    },
]

export const productInfoTabs = [
    {
        id: 1,
        name: 'MÔ TẢ',
        content: `Technology: GSM / HSPA / LTE
        Dimensions: 144.6 x 69.2 x 7.3 mm
        Weight: 129 g
        Display: IPS LCD 5.15 inches
        Resolution: 1080 x 1920
        OS: Android OS, v6.0 (Marshmallow)
        Chipset: Snapdragon 820
        CPU: Quad-core
        Internal: 32GB/64GB/128GB
        Camera: 16 MP, f/2.0 - 4 MP, f/2.0
        It's been a while since we met the last of the Mi kind. Even though the Xiaomi Mi 4 went on sale back in the summer of 2014, it succeeded in staying relevant for over 20 months and surpassed the lifespan of many competitors. Xiaomi surely took the time to make the Mi 5 worthy of the flagship series name.
        
        The Mi 5 was the first Xiaomi phone to be unveiled under the massive spotlight of the world's biggest mobile expo - the MWC in Barcelona. And with its stunning looks and capable performance, the Mi 5 deserved nothing less.
        
        The Xiaomi Mi 5 is instantly likeable - the new flagship comes with unbelievably thin bezels, a sharp profile, a curved back and a lightweight body - all adding to one of the most impressive exteriors a modern smartphones can hope for.
        
        Then you learn that inside there is the latest Snapdragon 820 chipset, a new 16MP camera with 4-axis optical stabilization and yet no camera hump, generous storage options, rich connectivity options, and a beefy battery. How about that?`
    },
    {
        id: 2,
        name: 'BẢO HÀNH',
        content: `WARRANTY INFORMATION
        LIMITED WARRANTIES
        Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:
        
        Frames Used In Upholstered and Leather Products
        Limited Lifetime Warranty
        A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.`
    },
    {
        id: 3,
        name: 'VẬN CHUYỂN',
        content: `PURCHASING & DELIVERY
        Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
        Picking up at the store
        Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
        Delivery
        Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
        In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`
    },
    {
        id: 4,
        name: 'THANH TOÁN',
        content: `PURCHASING & DELIVERY
        Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
        Picking up at the store
        Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
        Delivery
        Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
        In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`
    },
   
    
]
export const colors = [
    'đen',
    'nâu',
    'xám',
    'trắng',
    'hồng',
    'vàng',
    'cam',
    'tím',
    'xanh',
    'titan',
]

export const sorts = [
    
    {
        id: 1,
        value: '-sold',
        text: 'Bán chạy nhất'
    },
    {
        id: 2,
        value: 'title',
        text: 'Theo bảng chữ cái, A-Z'
    },
    {
        id: 3,
        value: '-title',
        text: 'theo bảng chữ cái, Z-A'
    },
    {
        id: 4,
        value: 'price',
        text: 'Giá, thấp đến cao'
    },
    {
        id: 5,
        value: '-price',
        text: 'Giá, cao đến thấp'
    },
    {
        id: 6,
        value: '-totalRatings',
        text: 'Nổi bật'
    },
    {
        id: 7,
        value: '-createdAt',
        text: 'Sản phẩm mới nhất'
    },
    
]
export const voteOptions = [
    {
        id: 1,
        text: 'Rất tệ'

    },
    {
        id: 2,
        text: 'Tệ'
        
    },
    {
        id: 3,
        text: 'Bình thường'
        
    },
    {
        id: 4,
        text: 'Tốt'
        
    },
    {
        id: 5,
        text: 'Tuyệt vời'

    },
]

const {IoHomeOutline, FiUsers, MdOutlineShoppingBag, RiBillLine} = icons
export const adminSidebar = [
    {
        id: 1,
        type: 'SINGLE',
        text: 'Bảng thống kê',
        path: `/${path.ADMIN}/${path.DASHBOARD}`,
        icon: <IoHomeOutline size={20}/>
    },
    {
        id: 2,
        type: 'SINGLE',
        text: 'Quản lý khách hàng',
        path: `/${path.ADMIN}/${path.MANAGE_USER}`,
        icon: <FiUsers size={20}/>
    },
    {
        id: 3,
        type: 'PARENT',
        text: 'Quản lý sản phẩm',
        icon: <MdOutlineShoppingBag size={20}/>,
        submenu: [
            {
                text: 'Thêm sản phẩm',
                path: `/${path.ADMIN}/${path.CREATE_PRODUCTS}`
            },
            {
                text: 'Quản lý sản phẩm',
                path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`
            }
        ]
    },
    {
        id: 4,
        type: 'SINGLE',
        text: 'Order',
        path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
        icon: <RiBillLine size={20}/>
    },
]
export const memberSidebar = [
    {
        id: 1,
        type: 'SINGLE',
        text: 'Trang cá nhân',
        path: `/${path.MEMBER}/${path.PERSONAL}`,
        icon: <IoHomeOutline size={20}/>
    },
    {
        id: 2,
        type: 'SINGLE',
        text: 'Giỏ hàng',
        path: `/${path.MEMBER}/${path.MY_CART}`,
        icon: <FiUsers size={20}/>
    },
    {
        id: 3,
        type: 'SINGLE',
        text: 'Sản phẩm yêu thích',
        path: `/${path.MEMBER}/${path.WISHLIST}`,
        icon: <FiUsers size={20}/>
    },
    {
        id: 4,
        type: 'SINGLE',
        text: 'Lịch sử mua hàng',
        path: `/${path.MEMBER}/${path.HISTORY}`,
        icon: <FiUsers size={20}/>
    },
    
]

export const roles = [
    {
        code: 2002,
        value: 'Admin'
    },
    {
        code: 2024,
        value: 'User'
    },
]
export const blockStatus = [
    {
        code: true,
        value: 'Blocked'
    },
    {
        code: false,
        value: 'Active'
    },
]

