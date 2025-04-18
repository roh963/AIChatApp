import {Route , BrowserRouter,Routes} from "react-router-dom"
import Register from '../screen/Register';
import Login from '../screen/Login';
import Home from '../screen/Home';
import Project from "../screen/Project";
import UserAuth from "../auth/UserAuth";

const AppRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<UserAuth> <Home /></UserAuth> } />
                <Route path="/login" element={<div><Login /></div>} />
                <Route path="/register" element={<div><Register /></div>} />
                <Route path="/project" element={<UserAuth> <Project /></UserAuth>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoute;
