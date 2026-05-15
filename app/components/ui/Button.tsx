import React from 'react'
import Link from 'next/link'

const Button = () => {
  return (
          <div className="text-center">
          <Link 
            href="/bookings"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-12 rounded-xl text-lg transition-all duration-300 "
          >
            Book Any Room
            <span className="text-xl">→</span>
          </Link>
  
        </div>
  )
}

export default Button