import React from 'react'

const PrimaryBtn = ({onClick, children}) => {
  return (
    <button onClick={onClick} className="bg-[#5B3410] w-full p-3 font-medium rounded-lg text-white">
        {children}
    </button>
    )
}

export default PrimaryBtn