// import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx'

const LeftSide = ({ setIsModalOpen, setIsSidePanelOpen, isSidePanelOpen, project, message, messages, setMessage, send, messageBox }) => {
    console.log(project.users);
    return (

        <section className="left relative flex flex-col h-screen min-w-96 bg-slate-300">
            <header className='flex justify-between items-center p-4 w-full bg-white shadow-md border-b-2 border-gray-300 font-bold text-lg'>
                <button
                    className='flex gap-2 items-center px-4 py-2 bg-slate-600 text-white rounded-lg shadow-md transition-transform transform hover:scale-105'
                    onClick={() => setIsModalOpen(true)}>
                    <i className="ri-add-fill text-xl"></i>
                    <p>Add Collaborator</p>
                </button>
                <button
                    onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
                    className='p-3 bg-gray-200 rounded-full shadow hover:bg-gray-300 transition-all'>
                    <i className="ri-group-fill text-xl"></i>
                </button>
            </header>
            <div className="conversation-area relative pt-14 pb-10 flex-grow flex flex-col h-screen bg-cover bg-center">
                <div ref={messageBox} className="message-box p-3 flex-grow flex flex-col gap-2 overflow-auto max-h-full scrollbar-hide bg-opacity-70 backdrop-blur-md">
                    {
                        messages.map((msg, index) => (
                            <div key={index} className={`${msg.sender._id === 'ai' ? 'max-w-80' : 'ml-auto max-w-54'}  message flex flex-col p-2 bg-slate-50 w-fit rounded-md`}>
                                <small className='opacity-65 text-xs'>{msg.sender.email}</small>
                                <p className="text-sm">
                                    {
                                        msg.sender._id === 'ai' ?
                                            <div className='overflow-auto bg-slate-950 text-white rounded-sm p-2'>
                                                <Markdown>{msg.message}</Markdown>
                                            </div> : msg.message

                                    }
                                </p>
                            </div>
                        ))
                    }
                </div>
                <div className="inputField w-full flex absolute bottom-0 p-3 bg-white rounded-t-lg shadow-xl">
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className='p-3 flex-grow border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all'
                        type="text" placeholder='Enter message' />
                    <button
                        onClick={send}
                        className='px-6 py-3 ml-2 bg-slate-600 text-white rounded-lg shadow-md hover:bg-slate-700 transition-transform transform hover:scale-105'>
                        <i className="ri-send-plane-fill text-xl"></i>
                    </button>
                </div>
            </div>
            <div className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-50 absolute transition-all ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'} top-0`}>
                <div className="relative bg-[#faf7fa] text-[#2C3E50] min-h-screen flex flex-col">
                    {/* Header */}
                    <header className="flex justify-between items-center px-5 py-3 bg-gradient-to-r from-[#475569] to-[#b7bfc4] shadow-lg rounded-b-xl">
                        <h1 className="font-bold text-xl tracking-wide text-white">Collaborators</h1>
                        <button
                            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
                            className="p-2  text-white hover:bg-[#475569] rounded-lg transition duration-300"
                        >
                            <i className="ri-close-fill text-3xl font-extrabold"></i>
                        </button>
                    </header>

                    {/* Background Stars Effect */}

                    {/* User List */}
                    <div className="users relative flex flex-col gap-4 p-6">
                        {project.users &&
                            project.users.map((user) => (
                                <div
                                    key={user.email}
                                    className="user cursor-pointer bg-gradient-to-r from-[#f0f2f3] to-[#475569] p-4 rounded-xl flex gap-4 items-center transition hover:shadow-xl hover:scale-105 duration-300 shadow-md"
                                >
                                    <div className="aspect-square rounded-full w-14 h-14 flex items-center justify-center text-white bg-[#474d52] shadow-lg">
                                        <i className="ri-user-fill text-2xl"></i>
                                    </div>
                                    <h1 className="font-semibold text-lg text-[#2C3E50]">{user.email}</h1>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );

};
LeftSide.propTypes = {
    project: PropTypes.shape({
        users: PropTypes.arrayOf(PropTypes.shape({
            email: PropTypes.string.isRequired
        }))
    }).isRequired,
    setIsModalOpen: PropTypes.func.isRequired,
    setIsSidePanelOpen: PropTypes.func.isRequired,
    isSidePanelOpen: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    messages: PropTypes.string.isRequired,
    messageBox: PropTypes.string.isRequired,
    setMessage: PropTypes.func.isRequired,
    send: PropTypes.func.isRequired,
};



export default LeftSide;
