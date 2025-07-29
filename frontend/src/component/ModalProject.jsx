// import React from 'react';
import PropTypes from 'prop-types';
const ModalProject = ({ users, selectedUserId, handleUserClick, setIsModalOpen, addCollaborator }) => {
    return (

        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center  justify-center z-50">
            <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-8 rounded-3xl w-1/5 max-w-full relative shadow-2xl border-4 border-blue-700">
                <div className="users-list flex flex-col gap-3 mb-20 max-h-96 overflow-auto">
                    {users.map(user => (
                        <div key={user.id} className={`user cursor-pointer transition-all duration-200 hover:bg-blue-100 ${Array.from(selectedUserId).indexOf(user._id) != -1 ? 'bg-blue-200' : 'bg-gray-900'} p-3 flex gap-3 items-center rounded-2xl shadow-md border border-blue-300`} onClick={() => handleUserClick(user._id)}>
                            <div className='aspect-square relative rounded-full w-10  h-12 flex items-center justify-center text-white bg-blue-700 shadow-lg'>
                                <i className="ri-user-fill text-2xl"></i>
                            </div>
                            <h1 className='font-semibold text-lg text-gray-900 bg-gradient-to-r from-blue-200 to-blue-100 px-2 py-1 rounded'>{user.email}</h1>
                        </div>
                    ))}
                </div>
                <button
                    onClick={addCollaborator}
                    className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-8 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold text-lg rounded-full shadow-xl flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-105 hover:shadow-2xl active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 w-64 border-2 border-blue-300"
                >
                    <i className="ri-user-add-line text-2xl"></i>
                    <span className="text-lg font-extrabold text-center bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 text-transparent bg-clip-text drop-shadow-lg tracking-wide">Add Collaborators</span>
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
