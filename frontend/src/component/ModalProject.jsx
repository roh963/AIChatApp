// import React from 'react';
import PropTypes from 'prop-types';
const ModalProject = ({ users, selectedUserId, handleUserClick, setIsModalOpen, addCollaborator }) => {
    return (

        <div className="fixed inset-0 bg-black  bg-opacity-50 flex items-center justify-center">
            <div className="bg-water-flow p-4 rounded-md w-96 max-w-full relative z-10">
                <header className="relative flex items-center justify-center mb-6 p-5 
                   bg-gradient-to-br from-gray-900 via-gray-800 to-black 
                   shadow-lg shadow-indigo-700/50 border border-indigo-500/20 
                   rounded-xl animate-glow">

                    {/* 3D Neon Flickering Text Effect */}
                    <h2 className="text-xl font-extrabold text-center bg-gradient-to-r from-indigo-400 via-blue-500 to-purple-500 
                   text-transparent bg-clip-text drop-shadow-lg 
                   animate-flicker tracking-wide">
                        Select User
                    </h2>

                    {/* Close Button with Neon Hover & Smooth Animation */}
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full 
                   bg-gray-700/50 border border-gray-500/30 
                   shadow-md shadow-purple-700/40 
                   hover:shadow-purple-500/80 
                   hover:bg-gray-600/80 transition-all duration-300 transform 
                   hover:scale-125 active:scale-90 animate-spinSlow">
                        <i className="ri-close-fill text-lg text-white hover:text-red-500 transition-all duration-300"></i>
                    </button>
                </header>



                <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
                    {users.map(user => (
                        <div key={user.id} className={`user cursor-pointer hover:bg-slate-200 ${Array.from(selectedUserId).indexOf(user._id) != -1 ? 'bg-slate-200' : ""} p-2 flex gap-2 items-center`} onClick={() => handleUserClick(user._id)}>
                            <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                <i className="ri-user-fill absolute"></i>
                            </div>
                            <h1 className='font-semibold text-lg'>{user.email}</h1>
                        </div>
                    ))}
                </div>
                <button
                    onClick={addCollaborator}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
               px-6 py-3 bg-gray-900 text-blue-500 font-semibold text-lg 
               rounded-full shadow-lg flex items-center justify-center gap-2 
               transition-transform duration-300 
               hover:scale-105 hover:shadow-xl 
               active:scale-95 active:shadow-none 
               focus:outline-none focus:ring-2 focus:ring-blue-300 
               focus:ring-opacity-50 w-64"
                >
                    <i className="ri-user-add-line text-xl"></i>
                    <span className="text-l font-extrabold text-center bg-gradient-to-r from-indigo-400 via-blue-500 to-purple-500 
                   text-transparent bg-clip-text drop-shadow-lg 
                   animate-flicker tracking-wide">Add Collaborators</span>
                </button>




            </div>
        </div>

    );
};
ModalProject.propTypes = {
    users: PropTypes.array.isRequired,
    setIsModalOpen: PropTypes.func.isRequired,
    handleUserClick: PropTypes.func.isRequired,
    setIsSidePanelOpen: PropTypes.func.isRequired,
    addCollaborator: PropTypes.func.isRequired,
    isSidePanelOpen: PropTypes.bool.isRequired,
    selectedUserId: PropTypes.array.isRequired,
};
export default ModalProject;
