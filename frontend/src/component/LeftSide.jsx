// import React from 'react';
import PropTypes from 'prop-types';

const LeftSide = ({ setIsModalOpen, setIsSidePanelOpen, isSidePanelOpen, project }) => {
    console.log(project.users);
    return (

        <section className="left relative flex flex-col h-full min-w-96 bg-slate-300">
            <header className='flex justify-between items-center p-2 px-4 w-full bg-slate-100'>
                <button className='flex gap-2' onClick={() => setIsModalOpen(true)}>
                    <i className="ri-add-fill mr-1"></i>
                    <p>Add collaborator</p>
                </button>
                <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2'>
                    <i className="ri-group-fill"></i>
                </button>
            </header>
            <div className="conversation-area flex-grow flex flex-col">
                <div className="message-box p-1 flex-grow flex flex-col gap-1">
                    <div className="message max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-md">
                        <small className='opacity-65 text-xs'>example@gmail.com</small>
                        <p className='text-sm'>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>
                    </div>
                    <div className="ml-auto max-w-56 message flex flex-col p-2 bg-slate-50 w-fit rounded-md">
                        <small className='opacity-65 text-xs'>example@gmail.com</small>
                        <p className='text-sm'>Lorem ipsum dolor sit amet.</p>
                    </div>
                </div>
                <div className="inputField w-full flex">
                    <input className='p-2 px-4 border-none outline-none flex-grow' type="text" placeholder='Enter message' />
                    <button className='px-5 bg-slate-950 text-white'><i className="ri-send-plane-fill"></i></button>
                </div>
            </div>
            <div className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-50 absolute transition-all ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'} top-0`}>
                <header className='flex justify-between items-center px-4 p-2 bg-slate-200'>
                    <h1 className='font-semibold text-lg'>Collaborators</h1>
                    <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2'>
                        <i className="ri-close-fill"></i>
                    </button>
                </header>
                <div className="users flex flex-col gap-2">
                    {project.users && project.users.map(user => {
                        return (
                            <>
                            <div  className="user cursor-pointer hover:bg-slate-200 p-2 flex gap-2 items-center">
                            <div className='aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                <i className="ri-user-fill absolute"></i>
                            </div>
                            <h1 className='font-semibold text-lg'>{user.email}</h1>
                        </div>
                       </>
                        )
                    })
                    }
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
};


export default LeftSide;
