import icons from "./icons"

const { FaStar, FaRegStar } = icons

export const createSlug = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u3060f]/g,"").split(' ').join('-')
//format số tiền 
export const formatMoney = number => Number(number?.toFixed(1)).toLocaleString()
// hàm làm tròn giá
export const formatPrice = number => (number / 1000) * 1000

export const renderStar = (number, size) =>{
    if (!Number(number)) return
    const stars = []
    number = Math.round(number)
    for (let i=0; i < +number; i++) stars.push(<FaStar color="orange" size={size || 16}/>)
    for (let i=5; i > +number; i--) stars.push(<FaRegStar color="orange" size={size || 16}/>)
    return stars
}

export function secondsToHms(d) {
    d = Number(d) / 1000;
    const h = Math.floor(d/3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);
    return ({ h, m, s })
}


// export const validate = (payload, setInvalidField) => {
//     let invalid = 0
//     const formatPayload = Object.entries(payload)
//     // console.log(formatPayload)
//     for (let arr of formatPayload){
//         if (arr[1].trim() === '') {
//             invalid++
//             setInvalidField(prev => [...prev, {name: arr[0], mes: 'Bắt buộc'}])
//         }
//     }
// }
        
//     }
    // for (let arr of formatPayload){
    //     switch (arr[0]) {
    //         case 'email':
    //             const regex = /^\w+([\.-]?w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    //             if (!arr[1].match(regex)){
    //                 invalid++
    //                 setInvalidField(prev => [...prev, {name: arr[0], mes: 'lỗi email'}])
    //             }
    //             break;
    //         case 'password':
    //             if (arr[1].lenght < 6){
    //                 invalid++
    //                 setInvalidField(prev => [...prev, {name: arr[0], mes: 'mật khẩu tối thiểu 6 ký tự'}])
    //             }
    //             break;
    //         default:
    //             break;
    //     }
    // }
//     return invalid

export const generateRange = (start, end) => {
    const length = end + 1 - start
    return Array.from({ length }, (_, index) => start + index)
}
//
export function getbase64(file) {
    if (!file) return ''
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error)
    })
}