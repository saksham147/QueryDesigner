import { Link, Routes, Route } from "react-router-dom";

import Dashboard from '../components/Flow/dashboard.components';


const logOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
}

export default function UserRoute() {
    return (
        <>
            <header>
                <nav className="bg-gray-800 border-gray-200 px-4 py-2.5">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <div className="flex items-center lg:order-2">
                            <button className="text-gray-50 hover:bg-gray-50 hover:text-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 " onClick={logOut}>Log Out</button>
                        </div>
                        <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <Link to="/dashboard" className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700">Flow List</Link> 
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <Routes>
                <Route exact path="/dashboard" element={<Dashboard />} />
                

            </Routes>

        </>
    );
}
