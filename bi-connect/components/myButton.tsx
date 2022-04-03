import React from 'react'

interface MyButtonProps {
    buttonName : string
}

const myButton = (props:MyButtonProps) => {
  return (
    <button style={{backgroundColor:"lightblue"}}>{props.buttonName}</button>
  )
}

export default myButton