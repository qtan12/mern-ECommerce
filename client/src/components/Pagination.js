import React, {memo} from 'react'
import usePagination  from '../hooks/usePagination'
import { PageItem } from './'

const Pagination = ({totalCount}) => {
    // const pagination = usePagination(66, 2) 
    console.log(usePagination (66,2))

  return (
    <div>
        phan trang asdas
        {/* {pagination?.map(el => (
            <PageItem key={el} >
                {el}
            </PageItem>
        ))} */}
    </div>
  )
}

export default memo(Pagination)