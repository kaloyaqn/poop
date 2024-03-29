import React from 'react'

const PrimaryBtn = ({onClick, children, disabled, className}) => {
  return (
    <button 
    disabled={disabled}
    onClick={onClick} className={"bg-[#5B3410] w-full p-3 font-medium rounded-lg text-white disabled:opacity-75" + className}>
        {children}
    </button>
    )
}

export default PrimaryBtn