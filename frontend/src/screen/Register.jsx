import  { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config/axios';
import { UserContext } from '../context/user.context';

  const Register= ()=> {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext)
 function submitHandler(e) {
    e.preventDefault();
    // Add your API call to register user here
    console.log('Registering User: ', { email, password });
    axiosInstance.post('/users/register', { email, password})
               .then(async(res)=>{ 
               await localStorage.setItem('token', res.data.token)
                await setUser(res.data.user)
                 navigate('/login'); // Redirect to login page on successful registration})
               })
               .catch((err)=>{
                 console.log(err.response.data)
                 alert('Registration failed!')});
 }

    return (
      <div className="relative flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[200px] h-[200px] bg-blue-700 opacity-20 rounded-full animate-spin-slow top-10 left-10"></div>
          <div className="absolute w-[250px] h-[250px] bg-purple-700 opacity-25 rounded-full animate-pulse top-40 right-20"></div>
          <div className="absolute w-[300px] h-[300px] bg-cyan-500 opacity-20 rounded-full animate-ping bottom-20 left-40"></div>
        </div>
  
        {/* Register Form */}
        <div className="relative z-10 bg-gradient-to-b from-gray-900 to-gray-800 p-10 rounded-3xl shadow-2xl w-full max-w-md border-4 border-blue-700 text-white flex flex-col items-center">
          <h2 className="text-3xl font-bold text-blue-300 mb-6 text-center">
            Register
          </h2>
          <form className="space-y-6 w-full" onSubmit={submitHandler}>
            <div>
              <label className="block text-blue-200 mb-2">Email</label>
              <input
                onChange={(e)=>setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="w-full px-5 py-3 border-none rounded-xl bg-white/10 backdrop-blur-md shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-white text-lg"
              />
            </div>
            <div>
              <label className="block text-blue-200 mb-2">Password</label>
              <input
                onChange={(e)=>setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="w-full px-5 py-3 border-none rounded-xl bg-white/10 backdrop-blur-md shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-white text-lg"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex text-sm items-center text-blue-200">
                <p>Already have an account?</p>
              </div>
              <div className="text-sm">
                <Link
                  to="/login"
                  className='font-medium text-blue-400 hover:text-blue-300 transition'
                >
                  Login to your account
                </Link>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white py-3 rounded-xl shadow-lg hover:scale-105 hover:bg-blue-800 transition font-bold text-lg border-2 border-blue-400">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }
  

export default Register;

