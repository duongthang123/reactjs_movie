import PropTypes from "prop-types";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fas);


const Header = ({onSearch}) => {
    const [textSearch, setTextSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div className="relative">
            <div className="p-4 bg-black flex items-center justify-between">
                <h1 className="text-[40px] uppercase font-bold text-red-700">
                    Movie
                </h1>
                {/* desktop nav */}
                <nav className="hidden ml-4 w-full md:flex space-x-4">
                    <a href="" className="text-white">Home</a>
                    <a href="" className="text-white">About</a>
                    <a href="" className="text-white">Contact</a>
                </nav>

                {/* Desktop search */}
                <div className="hidden md:flex items-center space-x-2">    
                    <input 
                        type="text" 
                        placeholder="Search" 
                        className="p-2 outline-0 rounded-sm text-black bg-white"
                        onChange={(e) => setTextSearch(e.target.value)}
                        value={textSearch}
                        onKeyDown={() => onSearch(textSearch)}
                    />
                    <button 
                        className="p-2 text-white bg-red-600 rounded cursor-pointer"
                        onClick={() => onSearch(textSearch)}
                    >
                        Search
                    </button>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden text-white text-2xl"
                    onClick={() => setIsOpen(true)}
                >
                    <FontAwesomeIcon icon={["fas", "bars"]} />
                </button>
            </div>

            {/* mobile */}
                <div className={`fixed top-0 right-0 w-64 h-full bg-gray-900 text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'    
                } transition-transform duration-300 ease-in-out z-999 shadow-lg`}>
                    <div className="flex justify-end p-4">
                        <button 
                            className="text-white text-xl"
                            onClick={() => setIsOpen(false)}
                        >
                            &times;
                        </button>
                    </div>

                    <nav className="flex flex-col px-6 space-y-4">
                        <a href="/" className="hover:text-red-400">Home</a>
                        <a href="#" className="hover:text-red-400">About</a>
                        <a href="#" className="hover:text-red-400">Contact</a>
                    </nav>

                    <div className="mt-6 px-6 flex flex-col space-y-2">
                        <input
                            type="text"
                            placeholder="Search"
                            className="p-2 outline-0 rounded-sm text-black bg-white"
                            onChange={(e) => setTextSearch(e.target.value)}
                            value={textSearch}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    onSearch(textSearch);
                                    setIsOpen(false);
                                }
                            }}
                        />
                        <button
                            className="p-2 text-white bg-red-600 rounded cursor-pointer"
                            onClick={() => {
                                onSearch(textSearch);
                                setIsOpen(false);
                            }}
                        >
                            Search
                        </button>
                    </div>
                </div>
                {isOpen && (
                        <div
                            className="fixed inset-0 bg-black opacity-40 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                    )}
        </div>
        
    )
}

Header.PropTypes = {
    onSearch: PropTypes.func,
}
export default Header;