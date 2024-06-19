import React, {memo} from 'react'
import clsx from 'clsx'

const InputForm = ({label, disabled, register, errors, id, validate, type='text', placeholder, fullWidth, defaultValue, style, readOnly}) => {
  return (
    <div className={clsx('flex flex-col h-[50px]', style)}>
      {label && <label htmlFor={id}>{label + ':'}</label>}
      <input 
        type={type} 
        id={id} 
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx('form-input my-auto text-gray-800 block outline-none p-2 border focus:border-blue-600 ', fullWidth && 'w-full')}
        defaultValue={defaultValue}      
        readOnly={readOnly}
      />
      {errors[id] && <small className='text-xs text-red-700' >{errors[id]?.message}</small>}
    </div>
  )
}

export default memo(InputForm)
