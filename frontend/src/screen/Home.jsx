import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user.context";
import { axiosInstance } from "../config/axios";
import { useNavigate } from 'react-router-dom';

function Home() {
  const { user, setUser } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [project, setProject] = useState([]);
  const navigate = useNavigate();

  // 🔴 Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  // Debug function to test authentication
 

  function createProject(e) {
    e.preventDefault();
    axiosInstance.post('/projects/create', { name: projectName })
      .then((res) => {
        setIsModalOpen(false);
        setProjectName('');
        // Reload project list
        axiosInstance.get('/projects/all').then((response) => {
          setProject(response.data.projects);
        });
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    axiosInstance.get('/projects/all')
      .then((response) => setProject(response.data.projects))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black p-6 relative text-white">

      {/* 🔝 Top Navbar with Logout */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-white tracking-wide">My Projects</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition text-white font-medium"
          >
            <i className="ri-logout-box-r-line mr-1"></i> Logout
          </button>
        
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-xl shadow-lg text-white font-semibold text-base flex items-center gap-2"
          >
            <i className="ri-add-circle-line text-xl"></i> Create New Project
          </button>
        </div>
      </div>

      {/* Project Cards */}
      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {project.length === 0 ? (
          <div className="text-gray-400 text-center col-span-full">No projects created yet.</div>
        ) : (
          project.map((proj, idx) => (
            <div
              key={proj._id}
              onClick={() => navigate('/project', { state: { project: proj } })}
              className="bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 border border-indigo-500/30 rounded-xl p-5 cursor-pointer transition hover:scale-105 shadow-xl group relative"
            >
              <div className="absolute top-2 right-2 text-indigo-400 text-sm font-mono opacity-70">{idx + 1}</div>
              <h2 className="text-xl font-bold text-indigo-300 mb-2">{proj.name}</h2>
              <div className="flex items-center text-sm text-gray-300 gap-2">
                <i className="ri-user-3-line text-indigo-400"></i>
                {proj.users.length} Collaborator{proj.users.length !== 1 && 's'}
              </div>
            </div>
          ))
        )}
      </section>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-8 rounded-2xl shadow-2xl border border-indigo-500 max-w-md w-full relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
            >
              <i className="ri-close-fill"></i>
            </button>
            <h2 className="text-2xl font-semibold mb-6 text-indigo-400 text-center">Create New Project</h2>
            <form onSubmit={createProject} className="flex flex-col gap-4">
              <input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                type="text"
                placeholder="Enter project name"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
