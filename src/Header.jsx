import React from "react";
import { PiHandbag } from "react-icons/pi";
function Header(){
    return(
        <header className="w-full py-8 px-4 md:px-8 text-white noto-sans flex justify-between">    
            <i className="devicon-apple-original text-4xl"></i>
            <div className="flex items-center gap-1 text-lg me-8">
                <PiHandbag/>
                <p className="text-sm">Cart</p>
            </div>
        </header>
    )
}
export default Header;