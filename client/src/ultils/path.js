const path = {
    PUBLIC: '/',
    TRANGCHU: '',
    ALL: '*',
    LOGIN: 'login',
    PRODUCTS__CATEGORY: ':category',
    BLOGS: 'blogs',
    FAQ: 'faqs',
    SERVICES: 'dich+vu+khac',
    DETAIL_PRODUCT__CATEGORY__PID__TITLE: ':category/:pid/:title',
    FINAL_REGISTER: 'finalregister/:status',
    RESET_PASSWORD: 'reset-password/:token',
    DETAIL_CART: 'chi+tiet+gio+hang',
    CHECKOUT: 'checkout',
    SANPHAM: 'sanpham',
    
    // Amin
    ADMIN: 'admin',
    CREATE_PRODUCTS: 'them+san+pham',
    DASHBOARD: 'thong+ke',
    MANAGE_ORDER: 'quanly+dat+hang',
    MANAGE_PRODUCTS: 'quan+ly+san+pham',
    MANAGE_USER: 'quan+ly+khach+hang',

    // Nguoi dung
    MEMBER: 'nguoi+dung',
    PERSONAL: 'trang+ca+nhan',
    MY_CART: 'gio+hang+cua+toi',
    WISHLIST: 'danh+sach+yeu+thich',
    HISTORY: 'lich+su+mua+hang'
}

export default path