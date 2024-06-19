import React, {memo} from 'react'
import clsx from 'clsx'
const InputField = ({value, setValue, nameKey, type, invalidField, setInvalidField, style, fullWidth, placeholder, isHideLabel}) => {

  return (
    <div className={clsx('relative', fullWidth && 'w-full')}>
        {             /* khác rỗng thì hiển thị. Rỗng thì ko hiển thị */ /* nhãn */ }
        {!isHideLabel && value?.trim() !== '' && <label className='animate-slide-top-small text-[11px] absolute top-0 left-[12px] block px-1 ' htmlFor={nameKey}> {nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)}</label>}
        <input
            type={type || 'text'} 
            className={clsx('px-4 py-2 rounded-sm border w-full my-2 placeholder:text-sm placeholder:italic outline-none', style)}
            placeholder={placeholder || nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)}
            value={value}
            onChange={e => setValue(prev => ({...prev, [nameKey]: e.target.value}))}
            // onFocus={() => setInvalidField([])}
        />
        {/* {invalidField?.some(el => el.name === nameKey) && <small className='text-main italic'>{invalidField.find(el => el.name === nameKey)?.mes}</small>} */}
    </div>

  )
}

export default memo(InputField)