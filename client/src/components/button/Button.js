import React, {memo} from 'react'
                 //truyền prop
const Button = ({children, handleOnClick, style, fw, type='button'}) => {
  return (
    <button 
        type={type}
        className={style ? style: `px-4 py-2 rounded-md text-white bg-emerald-700 text-semibold my-2 ${fw ? 'w-full' : 'w-fit' }`}
        onClick={() => {handleOnClick && handleOnClick()}}
    >
        {children}
    </button>
  )
}

export default memo(Button)