import './App.css'
import {Routes, Route} from 'react-router'
// Components
import Home from './components/home/Home'
import Header from './components/header/Header'
import Catalog from './components/catalog/Catalog'
import Create from './components/create/Create'
import Login from './components/login/Login'
import Register from './components/register/Register'
import GameDetails from './components/details/GameDetails'
import EditGame from './components/edit/EditGame'
import Logout from './components/logout/Logout'
import { UserProvider } from './providers/UserProvider'
import AuthGuard from './components/guards/authGuard'

function App() {

  return (
    
    <>
    <UserProvider >
    <div id="box"> 
        <Header />
    <main id="main-content">
      <Routes>
        <Route index element={<Home />}/>
        <Route path='/games' element={<Catalog/>}/>
        <Route path='/games/:gameId' element={<GameDetails/>}/>
        <Route element={<AuthGuard />}>
          <Route path='/games/create' element={<Create />} />
          <Route path='/games/:gameId/edit' element={<EditGame/>}/>
          <Route path='/logout' element={<Logout />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </main> 
      </div>
    </UserProvider>
    </>
  )
}

export default App