import {Route , BrowserRouter,Routes} from "react-router-dom"
import Register from '../screen/Register';
import Login from '../screen/Login';
import Home from '../screen/Home';

const AppRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<div><Home /></div>} />
                <Route path="/login" element={<div><Login /></div>} />
                <Route path="/register" element={<div><Register /></div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoute;
