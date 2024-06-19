import React, {memo} from 'react'
import clsx from 'clsx' 
const Select = ({label, options=[], register, errors, id, validate, style, fullWidth, defaultValue}) => {
  return (
    <div className={clsx('flex flex-col gap-2', style)}>
      {label && <label htmlFor={id}>{label}</label>}
      <select defaultValue={defaultValue} className={clsx('bg-gray-800 max-h-[42px] focus:border-blue-600 block py-2  shadow  focus:outline-none focus:shadow-outline', fullWidth && 'w-full', style)} id={id} {...register(id, validate)}>
        <option value="">--CHỌN--</option>
        {options?.map(el => (
          <option value={el.code}>{el.value}</option>
        ))}
      </select>
      {errors[id] && <small className='text-xs text-emerald-700'>{errors[id]?.message}</small>}
    </div>
  )
}

export default memo(Select)
