import { Link, Routes, Route } from "react-router-dom";
import Login from '../components/Auth/login.components'
import Signup from '../components/Auth/signup.components'
export default function AuthRoute() {
    return (
        <div>
            <header>
                <nav className="bg-gray-800 border-gray-200 px-4 lg:px-6 py-2.5">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <Link to="/" className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white">Login</Link> 
                                </li>
                                <li>
                                    <Link to="/signup" className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white">SignIn</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />              
            </Routes>
        </div>
    );
}
