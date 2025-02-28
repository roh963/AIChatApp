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
               .then((res)=>{ 
                console.log(res.data)
                localStorage.setItem('token', res.data.token)
                setUser(res.data.user)
                 navigate('/login'); // Redirect to login page on successful registration})
               })
               .catch((err)=>{
                 console.log(err.response.data)
                 alert('Registration failed!')});
 }

    return (
      <div className="relative flex items-center justify-center h-screen bg-gray-900 overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[200px] h-[200px] bg-blue-500 opacity-20 rounded-full animate-spin-slow top-10 left-10"></div>
          <div className="absolute w-[250px] h-[250px] bg-purple-500 opacity-25 rounded-full animate-pulse top-40 right-20"></div>
          <div className="absolute w-[300px] h-[300px] bg-cyan-400 opacity-20 rounded-full animate-ping bottom-20 left-40"></div>
        </div>
  
        {/* Register Form */}
        <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-80">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Register
          </h2>
          <form className="space-y-4" onSubmit={submitHandler}>
            <div>
              <label className="block text-gray-600">Email</label>
              <input
                onChange={(e)=>setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">Password</label>
              <input
                onChange={(e)=>setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
                        <div className="flex  text-sm items-center">
                            <p>already have an account ?</p>
                        </div>
                        <div className="text-sm">
                            <Link
                                to="/login"
                                className='font-medium text-indigo-600 hover:text-indigo-500'
                            >
                                Login to your account
                            </Link>
                        </div>
                    </div>
            <button className="w-full bg-slate-400 text-white py-2 rounded-lg hover:bg-slate-700 transition">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }
  

export default Register;

