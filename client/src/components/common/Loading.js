import React, {memo} from 'react'
import { HashLoader } from 'react-spinners'

const Loading = () => {
  return (
    <HashLoader color='green'/>
  )
}

export default memo(Loading)
