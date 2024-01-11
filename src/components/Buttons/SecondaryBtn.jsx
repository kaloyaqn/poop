import React from 'react'

const SecondaryBtn = ({onClick, children}) => {
  return (
    <button onClick={onClick} className="border- border-[1px] w-48 p-2.5 font-medium rounded-full border-[#5B3410] text-[#5B3410] text-sm active:bg-[#5B3410] transition active:text-white">
        {children}
    </button>
    )
}

export default SecondaryBtn