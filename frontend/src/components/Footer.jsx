import React from 'react'
import { useRecoilValue } from 'recoil';
import { themeState } from '../recoil/themeAtom';

const Footer = () => {
    const theme = useRecoilValue(themeState); 
  return (
    <div className={`text-gray-500 text-center py-6 ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
            <p>© {new Date().getFullYear()} CodeYatra . All rights reserved.</p>
            <div className="mt-2 space-x-4">
                <a href="https://github.com/rajeevroy21" className="hover:text-white">GitHub</a>
                <a href="/about" className="hover:text-white">About</a>
                <a href="/contact" className="hover:text-white">Contact</a>
            </div>
    </div>
  )
}

export default Footer
