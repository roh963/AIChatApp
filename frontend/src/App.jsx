import { UserProvider } from "./context/user.context"
import AppRoute from "./routes/AppRoute"
function App() {
  return (
    <> 
      <UserProvider>
      <AppRoute/>
     </UserProvider>
    </>
  )
}

export default App
