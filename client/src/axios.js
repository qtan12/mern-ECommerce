import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URI
    
  });
  // Sửa lại dữ liệu trước khi gọi api  
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    //đoạn bên trong sẽ được chạy trước khi api được gửi qua server
    let localStorageData = window.localStorage.getItem('persist:shop/user')
    if (localStorageData && typeof localStorageData === 'string') {
      localStorageData = JSON.parse(localStorageData)
      const acccessToken = JSON.parse(localStorageData?.token)
      console.log(acccessToken)
      config.headers = {authorization: `Bearer ${acccessToken}`}
      return config 
    }else return config;
    
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    //trước khi data trả về client đoạn code bên trong sẽ được chạy để thực thi trước khi trả về client
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.response.data;
  });

  export default instance;