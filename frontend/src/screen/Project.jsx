import { useLocation } from 'react-router-dom'
import LeftSide from '../component/LeftSide'
import { useEffect, useState, useContext, createRef, useRef } from 'react';
import ModalProject from '../component/ModalProject';
import { axiosInstance } from '../config/axios';
import { initializeSocket, receiveMessage, sendMessage } from '../config/socket';
import { UserContext } from '../context/user.context';
import hljs from 'highlight.js';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import RightSide from '../component/RightSide';
import { getWebContainer } from '../config/webContainer';


function SyntaxHighlightedCode(props) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && props.className?.includes('lang-') && window.hljs) {
      window.hljs.highlightElement(ref.current)
      ref.current.removeAttribute('data-highlighted')
    }
  }, [props.className, props.children])
  return <code {...props} ref={ref} />
}

SyntaxHighlightedCode.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};
const Project = () => {
  const location = useLocation()
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(new Set())
  const [project, setProject] = useState(location.state.project)
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { user } = useContext(UserContext)
  const messageBox = createRef()
  const [fileTree, setFileTree] = useState({})
  const [currentFile, setCurrentFile] = useState(null)
  const [openFiles, setOpenFiles] = useState([])
  const [webContainer, setWebContainer] = useState(null)
  const [iframeUrl, setIframeUrl] = useState(null)
  const [runProcess, setRunProcess] = useState(null)

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
      sender: user
    })
    setMessages(prevMessages => [...prevMessages, { sender: user, message }])
    // appendOutgoingMessage(message)
    setMessage('');
  }



  useEffect(() => {
    initializeSocket(project._id);
    console.log("project ", project._id)
    if (!webContainer) {
      getWebContainer().then((container) => {
        setWebContainer(container);
        console.log("container started")
      });
    }
    const messageHandler = data => {
      console.log(data);
      if (data.sender._id == 'ai') {
        const message = JSON.parse(data.message);
        console.log("Message: ", message);


        // Mount fileTree if webContainer is available
        webContainer?.mount(message.fileTree)

        // Update fileTree state
        if (message.fileTree) {
          setFileTree(message.fileTree);
        }

        // Update messages state
        setMessages(prevMessages => [...prevMessages, data]);
      } else {
        setMessages(prevMessages => [...prevMessages, data])
      }
    };
    receiveMessage('project-message', messageHandler);

    axiosInstance.get(`/projects/get-project/${location.state.project._id}`).then(res => {
      console.log(res.data);
      if (res.data.project) {
        setProject(res.data.project);
        setFileTree(res.data.project.fileTree || {});
      } else {
        console.error("Project data is not defined");
      }
    }).catch(err => {
      console.error(err);
    });

    axiosInstance.get('/users/all').then(res => {
      setUsers(res.data.users);
    }).catch(err => {
      console.error(err);
    });

    return () => {
    };

  }, []);
  function saveFileTree(ft) {
    axiosInstance.put('/projects/update-file-tree', {
      projectId: project._id,
      fileTree: ft
    }).then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  //  function scrollToBottom(){
  //   messageBox.current.scrollTop = messageBox.current.scrollHeight
  // }

  function WriteAiMessage(message) {
    const messageObject = JSON.parse(message);
    return (
      <>
        <div className="overflow-auto bg-slate-950 text-white rounded-sm p-2">
          <Markdown children={messageObject.text}
            options={{
              overrides: {
                code: SyntaxHighlightedCode
              },
            }}
          />
        </div>
      </>
    )

  }
  return (
    <main className="h-screen w-screen flex">
      <LeftSide
        setIsModalOpen={setIsModalOpen}
        setIsSidePanelOpen={setIsSidePanelOpen}
        isSidePanelOpen={isSidePanelOpen}
        project={project}
        message={message}
        messages={messages}
        messageBox={messageBox}
        setMessage={setMessage}
        send={send}
        user={user}
        WriteAiMessage={WriteAiMessage}
      />
      <RightSide
        fileTree={fileTree}
        setFileTree={setFileTree}
        currentFile={currentFile}
        setCurrentFile={setCurrentFile}
        openFiles={openFiles}
        setOpenFiles={setOpenFiles}
        webContainer={webContainer}
        iframeUrl={iframeUrl}
        setIframeUrl={setIframeUrl}
        runProcess={runProcess}
        setRunProcess={setRunProcess}
        saveFileTree={saveFileTree}
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
