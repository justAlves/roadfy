import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({children, className, ...props}: ButtonProps) {
  return (
    <button
      {...props}
      className={`bg-[#f8f8f8] text-[#333] font-bold py-2 px-4 rounded-md border border-[#f8f8f8] hover:bg-[#e8e8e8] hover:border-[#e8e8e8] focus:outline-none focus:ring focus:ring-[#333] focus:ring-opacity-10 ${className}`}
    >
      {children}
    </button>
  )
}
