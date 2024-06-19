import React, { useEffect, useState} from 'react'

const useDebounce = (value, ms) => {
    const [debounceValue, setDebounceValue] = useState('')
    useEffect(() => {
        const setTimeoutId = setTimeout(() => {
                setDebounceValue(value)
        }, ms)
        return () => {
            clearTimeout(setTimeoutId)
        }
    }, [value, ms])
    return debounceValue
}

export default useDebounce

//muốn: khi ma nhập thay đổi giá thì sẽ gọi api
//vấn đề: gọi api liên tục theo mỗi lượt nhập
// giải quyết: chỉ call api khi ma người dùng nhập xong
//dựa vào thời gian (ms) onChange

//tách price thành 2 biến
//1. biến để phục vụ UI, gõ tới đâu thì lưu tới đó => UI render
//2. biến thứ n dùng để quyết định call api bọc nó trong settimeout => biến sẽ được gán sau 1 khoảng thời gian