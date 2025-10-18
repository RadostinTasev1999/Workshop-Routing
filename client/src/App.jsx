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
import UserProvider from './providers/UserProvider'
import Logout from './components/logout/Logout'
// import { useContext } from 'react'
import { UserContext } from './contexts/UserContext'

function App() {

  return (
    <>
      <div id="box"> 
    <UserProvider>
      <Header />
    <main id="main-content">
      <Routes>
        <Route index element={<Home />}/>
        <Route path='/games' element={<Catalog/>}/>
        <Route path='/games/:gameId' element={<GameDetails/>}/>
        <Route path='/games/:gameId/edit' element={<EditGame/>}/>
        <Route path='/games/create' element={<Create />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </main>
    </UserProvider>
      </div>
    </>
  )
}

export default App