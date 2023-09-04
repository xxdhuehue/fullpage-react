import React from 'react'

const Slide = (props: { children: any}) => {
    const { children } = props;
  return (
    <div style={{height: "100%"}}>{children}</div>
  )
}

export default Slide