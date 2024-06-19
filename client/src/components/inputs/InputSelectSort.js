import React, {memo} from 'react'

const InputSelectSort = ({value, changeValueSort, options}) => {
  return (            
    <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      value={value}
      onChange={e => changeValueSort(e.target.value)}
    >
      <option value="">--Chọn--</option>
      {options?.map(el => (
        <option key={el.id} value={el.value}>{el.text}</option>
      ))}

    </select>
  )
}

export default memo(InputSelectSort)