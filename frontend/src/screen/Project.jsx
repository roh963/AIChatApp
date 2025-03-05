import { useLocation } from 'react-router-dom'
import LeftSide from '../component/LeftSide'
import { useEffect, useState, useContext, createRef } from 'react';
import ModalProject from '../component/ModalProject';
import { axiosInstance } from '../config/axios';
import { initializeSocket, receiveMessage, sendMessage } from '../config/socket';
import { UserContext } from '../context/user.context';

const Project = () => {
  const location = useLocation()
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState([])
  const [project, setProject] = useState(location.state.project)
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const { user } = useContext(UserContext)
  const messageBox = createRef()
  const handleUserClick = (id) => {
    setSelectedUserId(prevSelectedUserId => {
      const newSelectedUserId = new Set(prevSelectedUserId);
      if (newSelectedUserId.has(id)) {
        newSelectedUserId.delete(id);
      } else {
        newSelectedUserId.add(id);
      }
      return newSelectedUserId;
    })
  }

  function addCollaborator() {
    axiosInstance.put("/projects/add-user", {
      projectId: location.state.project._id,
      users: Array.from(selectedUserId)
    }).then(res => {
      console.log(res.data);
      setIsModalOpen(false);
    }).catch(err => {
      console.log(err);
    })

  }
  const send = () => {
    console.log(user)
    sendMessage('project-message', {
      message,
      projectId: project._id,
      sender: user
    })
    appendOutgoingMessage(message)
    setMessage('');
  }



  useEffect(() => {
    initializeSocket(project._id);
    receiveMessage('project-message', (data) => {
      console.log(data);
      appendIncomingMessage(data);
    })
    axiosInstance.get(`/projects/get-project/${location.state.project._id}`).then(res => {
      console.log(res.data);
      setProject(res.data.project);
    }).catch(err => {
      console.error(err);
    });

    axiosInstance.get('/users/all').then(res => {
      setUsers(res.data.users);
    }).catch(err => {
      console.error(err);
    });
  }, []);

  function appendIncomingMessage(messageObject) {
    const messageBox = document.querySelector('.message-box');
    const message = document.createElement('div');
    message.classList.add('message', 'max-w-56', 'flex', 'flex-col', 'p-2', 'bg-slate-50', 'w-fit', 'rounded-md');

    message.innerHTML = `
            <small class='opacity-65 text-xs'>${messageObject.sender.email}</small>
            <p class='text-sm'>${messageObject.message}</p>
    `
    messageBox.appendChild(message);
    scrollToBottom()
  }
  function appendOutgoingMessage(message){
    const messageBox = document.querySelector('.message-box');
    const newMessage = document.createElement('div')
    newMessage.classList.add('ml-auto', 'max-w-56', 'message', 'flex', 'flex-col', 'p-2', 'bg-slate-50', 'w-fit', 
    'rounded-md')
    newMessage.innerHTML = `
            <small class='opacity-65 text-xs'>${user.email}</small>
            <p class='text-sm'>${message}</p>
    `
    messageBox.appendChild(newMessage);
    scrollToBottom()
  }
   function scrollToBottom(){
    messageBox.current.scrollTop = messageBox.current.scrollHeight
  }

  return (
    <main className="h-screen w-screen flex">
      <LeftSide
        setIsModalOpen={setIsModalOpen}
        setIsSidePanelOpen={setIsSidePanelOpen}
        isSidePanelOpen={isSidePanelOpen}
        project={project}
        message={message}
        messageBox={messageBox}
        setMessage={setMessage}
        send={send}
      />
      {isModalOpen && (
        <ModalProject
          users={users}
          selectedUserId={selectedUserId}
          addCollaborator={addCollaborator}
          handleUserClick={handleUserClick}
          setIsModalOpen={setIsModalOpen}
        />
      )}

    </main>
  )
}

export default Project
