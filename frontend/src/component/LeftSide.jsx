import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const LeftSide = ({ setIsModalOpen, setIsSidePanelOpen, isSidePanelOpen, project, message, messages, user, setMessage, send, WriteAiMessage }) => {
    const messageBoxRef = useRef(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        send();
        setTimeout(scrollToBottom, 100);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <section className="left relative flex flex-col min-w-80 w-1/4 bg-gradient-to-b from-gray-800 to-gray-700 shadow-2xl rounded-r-3xl border-r-4 border-gray-900">
            <header className='flex justify-between items-center p-5 w-full bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg border-b-2 border-gray-800 font-bold text-xl text-white rounded-tr-3xl z-10'>
                <button
                    onClick={() => window.history.back()}
                    className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 border border-gray-500 shadow transition"
                >
                    <i className="ri-arrow-left-line text-xl text-white"></i>
                </button>
                <button
                    className='flex gap-2 items-center px-5 py-2 bg-blue-600 text-white rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50'
                    onClick={() => setIsModalOpen(true)}>
                    <i className="ri-add-fill text-2xl"></i>
                    <p>Add Collaborator</p>
                </button>
                <button
                    onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
                    className='p-3 bg-gray-700 rounded-full shadow hover:bg-gray-600 transition-all border border-gray-500'>
                    <i className="ri-group-fill text-2xl text-white"></i>
                </button>
            </header>

            <div className="conversation-area relative pt-14 pb-10 flex-grow flex flex-col h-screen bg-gradient-to-b from-gray-800 to-gray-700 bg-cover bg-center rounded-br-3xl">
                <div
                    ref={messageBoxRef}
                    className="message-box p-4 pb-24 flex-grow flex flex-col gap-3 overflow-auto max-h-full scrollbar-hide bg-opacity-80 backdrop-blur-md scroll-smooth"
                >
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`${msg.sender._id === 'ai' ? 'max-w-96 bg-blue-100 text-gray-900' : 'ml-auto max-w-64 bg-green-100 text-gray-900'} ${msg.sender._id === user.id.toString() && 'ml-auto'} message flex flex-col p-3 rounded-2xl shadow-md border border-gray-200 transition-transform hover:scale-[1.02]'}`}
                        >
                            <small className='opacity-70 text-xs mb-1'>{msg.sender.email}</small>
                            <div className="text-base">
                                {msg.sender._id === 'ai' ? WriteAiMessage(msg.message) : <p>{msg.message}</p>}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="inputField w-full flex absolute bottom-0 p-4 bg-gradient-to-r from-gray-900 to-gray-700 rounded-t-3xl shadow-2xl z-20">
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className='p-3 flex-grow border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-800 text-white placeholder-gray-400 shadow-inner'
                        type="text"
                        placeholder='Enter message'
                    />
                    <button
                        onClick={handleSend}
                        className='px-6 py-3 ml-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50'>
                        <i className="ri-send-plane-fill text-2xl"></i>
                    </button>
                </div>
            </div>

            <div className={`sidePanel w-full h-full flex flex-col gap-2 bg-gradient-to-b from-gray-900 to-gray-700 absolute transition-all duration-300 ease-in-out shadow-2xl rounded-r-3xl z-30 ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'} top-0`}>
                <div className="relative bg-gradient-to-b from-gray-900 to-gray-700 text-white min-h-screen flex flex-col rounded-r-3xl">
                    <header className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-700 to-blue-400 shadow-lg rounded-b-3xl">
                        <h1 className="font-bold text-2xl tracking-wide text-white">Collaborators</h1>
                        <button
                            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
                            className="p-2 text-white hover:bg-blue-700 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                        >
                            <i className="ri-close-fill text-3xl font-extrabold"></i>
                        </button>
                    </header>
                    <div className="users relative flex flex-col gap-4 p-6">
                        {project.users && project.users.length > 0 ? (
                            project.users.map((user, index) => (
                                <div
                                    key={`${user.email}-${index}`}
                                    className="user cursor-pointer bg-gradient-to-r from-blue-100 to-blue-300 p-4 rounded-2xl flex gap-4 items-center transition hover:shadow-2xl hover:scale-105 duration-300 shadow-md border border-blue-200"
                                >
                                    <div className="aspect-square rounded-full w-14 h-14 flex items-center justify-center text-white bg-blue-700 shadow-lg">
                                        <i className="ri-user-fill text-2xl"></i>
                                    </div>
                                    <h1 className="font-semibold text-lg text-gray-900">{user.email}</h1>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-400 py-4">
                                <i className="ri-user-line text-2xl mb-2"></i>
                                <p>No collaborators yet</p>
                            </div>
                        )}
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
    messages: PropTypes.arrayOf(PropTypes.shape({
        sender: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired
        }).isRequired,
        message: PropTypes.string.isRequired
    })).isRequired,
    user: PropTypes.object.isRequired,
    setMessage: PropTypes.func.isRequired,
    send: PropTypes.func.isRequired,
    WriteAiMessage: PropTypes.func.isRequired,
};

export default LeftSide;