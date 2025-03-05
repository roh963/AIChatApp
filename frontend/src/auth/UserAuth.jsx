import  { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../context/user.context";

const UserAuth =({children})=>{
    const {user} = useContext(UserContext);
    const  [loading , setLoading ]= useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
     console.log(user);
     console.log(token);
    useEffect(() => {
        if(user){
           setLoading(false);
        }
        if(!token){
            navigate('/login');
        }
        if(!user){
            navigate('/login');
        }
       
    }, [navigate, token, user]);
    if(loading){
        return <h1>Loading...</h1>
    }
    return (<>{children}</>)

}
UserAuth.propTypes = {
    children: PropTypes.node.isRequired,
};


export default UserAuth;