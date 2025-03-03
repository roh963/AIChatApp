import { useLocation } from 'react-router-dom'
import LeftSide from '../component/LeftSide'
import { useEffect, useState } from 'react';
import ModalProject from '../component/ModalProject';
import { axiosInstance } from '../config/axios';

const Project = () => {
  const location = useLocation()
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState([])
  const [project, setProject] = useState(location.state.project)
 const [users,setUsers] = useState([]);
  const handleUserClick = (id) => {
     setSelectedUserId(prevSelectedUserId=>{
       const newSelectedUserId = new Set(prevSelectedUserId);
       if(newSelectedUserId.has(id)){
         newSelectedUserId.delete(id);
       }else{
          newSelectedUserId.add(id);
       }
       return newSelectedUserId;
     })
  }
  
  function addCollaborator(){
      axiosInstance.put("/projects/add-user",{
        projectId: location.state.project._id,
        users: Array.from(selectedUserId)
      }).then(res=>{
        console.log(res.data);
        setIsModalOpen(false);
      }).catch(err=>{
        console.log(err);
      })
  
  }
  
  useEffect(()=>{
    axiosInstance.get(`/projects/get-project/${location.state.project._id}`).then(res=>{
      console.log(res.data);
      setProject(res.data.project);
    }).catch(err=>{
      console.error(err);
    });

    axiosInstance.get('/users/all').then(res=>{
      setUsers(res.data.users);
    }).catch(err=>{
      console.error(err);
    });
  },[]);
   
  

  return (
    <main className="h-screen w-screen flex">
      <LeftSide setIsModalOpen={setIsModalOpen} setIsSidePanelOpen={setIsSidePanelOpen} isSidePanelOpen={isSidePanelOpen}  project={project} />
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
