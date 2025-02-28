import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/user.context"
import { axiosInstance } from "../config/axios"
import { useNavigate } from 'react-router-dom';
function Home() {
  const { user } = useContext(UserContext)
  console.log(user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState(null);
  const [project, setProject] = useState([]);
  const navigate = useNavigate();
  function createProject(e) {
    e.preventDefault();
    console.log({ projectName })
    axiosInstance.post('/projects/create', { name: projectName })
      .then((res) => {
        console.log(res)
        setIsModalOpen(false)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  useEffect(() => {
    axiosInstance.get('/projects/all').then((response) => {
      console.log(response.data);
      setProject(response.data.projects);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <main
      className="p-4 min-h-screen bg-black relative flex flex-col items-center justify-center"
      style={{ backgroundImage: "url('/real-night-sky.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Stars Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 100 }).map((_, index) => (
          <div
            key={index}
            className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-80 animate-[twinkle_5s_infinite] shadow-lg"
            style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              animationDuration: `${3 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 3}s`,
              transform: `scale(${0.5 + Math.random() * 1.5})`,
            }}
          />
        ))}
      </div>

      {!isModalOpen && (
        <div className="projects flex flex-wrap gap-3 relative z-10">
          <button
            onClick={() => setIsModalOpen(true)}
            className="project p-4 border border-slate-500 text-white bg-gray-900/50 rounded-md shadow-lg hover:bg-gray-700/70 transition-all"
          >
            New Project <i className="ri-link ml-2"></i>
          </button>
        </div>
      )}

      {/* Project List */}
      {!isModalOpen && (
        <div className="relative z-10 flex flex-wrap gap-4 p-4">
          {project.map((project) => (
            <div key={project._id}
              onClick={() => navigate(`/project`, { state: { project } })}
              className="project flex flex-col gap-2 cursor-pointer p-4 border border-slate-600 rounded-md min-w-52 bg-gray-800/50 text-white shadow-lg hover:bg-gray-700/70 transition"
            >
              <h2 className='font-semibold text-blue-300'>{project.name}</h2>
              <div className="flex gap-2 text-sm text-gray-300">
                <p><i className="ri-user-line"></i> Collaborators:</p>
                {project.users.length}
              </div>
            </div>
          ))}
        </div>
      )}



      {/* Modal */}
      {
        isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 overflow-hidden">
            {/* Moving Stars Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <div className="absolute w-full h-full bg-black">
                {/* Multiple animated stars */}
                {Array.from({ length: 50 }).map((_, index) => (
                  <div
                    key={index}
                    className="absolute w-[3px] h-[3px] bg-white rounded-full opacity-80 animate-[twinkle_5s_infinite] shadow-lg"
                    style={{
                      top: `${Math.random() * 100}vh`,
                      left: `${Math.random() * 100}vw`,
                      animationDuration: `${3 + Math.random() * 5}s`,
                      animationDelay: `${Math.random() * 3}s`,
                      transform: `scale(${0.5 + Math.random() * 1.5})`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Modal */}
            <div className="relative z-10 bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-xl w-1/3 border border-gray-300/20 text-white">
              {/* Subtle Glowing Border */}
              <div className="absolute inset-0 rounded-3xl border-[2px] border-transparent bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-lg"></div>

              <h2 className="text-2xl font-bold mb-5 text-center tracking-wide text-blue-300">
                🚀 Create New Project
              </h2>
              <form onSubmit={createProject}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-200">
                    Project Name
                  </label>
                  <input
                    onChange={(e) => setProjectName(e.target.value)}
                    value={projectName}
                    type="text"
                    className="mt-2 block w-full p-3 border-none rounded-lg bg-white/10 backdrop-blur-md shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-white"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="px-5 py-2 bg-gray-400/30 rounded-lg shadow-md backdrop-blur-md hover:bg-gray-500/50 transition transform hover:scale-105"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-110 transition-all duration-200"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>

            {/* Keyframe animation for stars */}
            <style>
              {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.6; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
          }
        `}
            </style>
          </div>
        )
      }

      {/* Keyframe animation for stars */}
      <style>
        {`
      @keyframes twinkle {
        0%, 100% { opacity: 0.6; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.2); }
      }
    `}
      </style>
    </main>




  )
}

export default Home
