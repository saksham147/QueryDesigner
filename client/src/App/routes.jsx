import UserRoute from "./routes/userRoute.jsx";
import AuthRoute from "./routes/authRoute.jsx";
// import NotFoundRoute from './components/NotFoundRoute.components'

import { Link,  Route } from "react-router-dom";
export default function Routes() {

    const token = localStorage.getItem('token');
    return (
        <>
            {!!token ? <UserRoute /> : <AuthRoute />}
        </>
        
    )
}