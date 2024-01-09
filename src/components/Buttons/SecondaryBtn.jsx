import React from 'react'

const SecondaryBtn = ({onClick, children}) => {
  return (
    <button onClick={onClick} className="border- border-[1px] w-48 p-3 font-medium rounded-full border-[#5B3410] text-[#5B3410]">
        {children}
    </button>
    )
}

export default SecondaryBtn