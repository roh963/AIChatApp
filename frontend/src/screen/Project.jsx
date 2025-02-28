// import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { axiosInstance } from '../config/axios';
function Project() {
  const location = useLocation();
  console.log(location.state)
  const [isSidePlaneOpen, setIsSidePlaneOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [project, setProject] = useState(location.state.project);
  const [selectedUser, setSelectedUser] = useState([]);
  const [users, setUsers] = useState([]);

  const handleUserClick = (id) => {
    setSelectedUser(prevSelId => {
      const newSelectUserId = new Set(prevSelId);
      if (newSelectUserId.has(id)) {
        newSelectUserId.delete(id);
        return Array.from(newSelectUserId);
      } else {
        newSelectUserId.add(id);
      }
      return newSelectUserId;
    });
  }
  function addCollaboration() {
    axiosInstance.put("/projects/add-user", {
      projectId: location.state.project._id,
      users: Array.from(selectedUser)
    }).then(res => {
      console.log(res.data);
      setIsModelOpen(false);
    }).catch(err => {
      console.error(err);
    });
  }
  useEffect(() => {
    axiosInstance.get(`/projects/get-project/${location.state.project._id}`).then(res => {
      console.log(res.data.project);
      setProject(res.data.project);
    }).catch(err => {
      console.log(err)
    })
    axiosInstance.get("/users/all").then(res => {
      console.log(res.data.users);
      setUsers(res.data.users);
    }).catch(err => {
      console.log(err)
    })
  },[]);

  return (
    <main className="h-screen w-screen flex bg-gray-900">
      {/* Sidebar / Chat List */}
      <section className="left relative flex flex-col h-full min-w-72 bg-gray-800 shadow-lg">
        <header className="flex justify-between items-center p-3 bg-gray-700 shadow-md">
          <h2 className="text-lg font-semibold text-white">Chats</h2>
          <button className='flex gap-2' onClick={() => setIsModelOpen(true)}>
            <i className="ri-add-fill mr-1 text-slate-200 font-bold"></i>
            <p className="text-slate-200 font-extrabold">Add collaborator</p>
          </button>
          <button onClick={() => setIsSidePlaneOpen(!isSidePlaneOpen)} className="p-2 hover:bg-gray-600 rounded-md transition">
            <i className="ri-group-fill text-xl text-white"></i>
          </button>
        </header>

        {/* Chat List / Conversations */}
        <div className="conversation-area flex-grow flex flex-col p-3 overflow-y-auto">
          {/* Received Message */}
          <div className="message max-w-60 flex flex-col p-3 bg-gray-700 text-white rounded-lg shadow-md animate-fade-in">
            <small className="opacity-75 text-xs">example@gmail.com</small>
            <p className="text-sm">Hello! How are you?</p>
          </div>

          {/* Sent Message */}
          <div className="ml-auto max-w-60 message flex flex-col p-3 bg-blue-600 text-white rounded-lg shadow-md animate-fade-in">
            <small className="opacity-75 text-xs">You</small>
            <p className="text-sm"> I'm good! How about you?</p>
          </div>
        </div>

        {/* Message Input Field */}
        <div className="inputField w-full flex bg-gray-800 p-2 border-t border-gray-700 shadow-inner">
          <input
            className="flex-grow p-3 border-none outline-none bg-gray-700 text-white rounded-l-lg shadow-md placeholder-gray-400"
            type="text"
            placeholder="Type a message..."
          />
          <button className="px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-500 transition-all duration-200">
            <i className="ri-send-plane-fill text-lg"></i>
          </button>
        </div>
        
      </section>
      {isModelOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
          <div className="bg-white p-6 rounded-lg w-96 max-w-full relative shadow-lg transform transition-transform duration-300 scale-95 hover:scale-100">
            <header className='flex justify-between items-center mb-4'>
              <h2 className='text-2xl font-bold text-gray-800'>Select User</h2>
              <button
                onClick={() => setIsModelOpen(false)}
                className='p-2 hover:bg-gray-200 rounded-full transition-colors duration-200'>
                <i className="ri-close-fill"></i>
              </button>
            </header>

            <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-y-auto">
              {users.map(user => (
                <div
                  key={user.id}
                  className={`user cursor-pointer hover:bg-slate-200 transition-colors duration-200 ${selectedUser.indexOf(user._id)!= -1? 'bg-slate-200' : ""} p-2 flex gap-2 items-center rounded-md`}
                  onClick={() => handleUserClick(user._id)}>

                  <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                    <i className="ri-user-fill absolute"></i>
                  </div>
                  <h1 className='font-semibold text-lg'>{user.email}</h1>
                </div>
              ))}
            </div>

            <button className='absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-500 transition-colors duration-200' onClick={addCollaboration} >
              Add Collaborators
            </button>
          </div>
        </div>
      )}
      {/* Side Panel for Additional Options */}
      <div className={`sidePanel w-80 h-full flex flex-col bg-gray-800 text-white absolute transition-all duration-300 ease-in-out 
      ${isSidePlaneOpen ? 'translate-x-0' : '-translate-x-full' } top-0 shadow-lg z-50`}>

        {/* Header with Close Button */}
        <header className="flex justify-between items-center p-3 bg-gray-700 shadow-md">
          <h2 className="text-lg font-semibold">Collabarators</h2>
          <button onClick={() => setIsSidePlaneOpen(!isSidePlaneOpen)} className="p-2 hover:bg-gray-600 rounded-md transition">
            <i className="ri-close-fill text-xl"></i>
          </button>
        </header>

        {/* start */}
        { project.users && project.users.map(user => {
          return(
            // eslint-disable-next-line react/jsx-key
            <div className="user cursor-pointer p-3 flex gap-3 items-center rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-200 shadow-md">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full text-white text-lg shadow-md">
              <i className="ri-user-fill"></i>
            </div>
            {/* Username */}
            <h1 className="font-semibold text-lg">{user.email}</h1>
          </div>
          )
        })
        }
         
        {/* end */}

      </div>
      

      {/* Animations */}
     
      <style>
        {`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}
      </style>
    </main>
  );
}

export default Project
