import './App.css'
import { Routes, Route } from 'react-router'
import { lazy, Suspense } from 'react'
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
import GuestGuard from './components/guards/guestGuard'



const Admin = lazy(() => import('./components/admin/Admin'))
console.log('App mode is:', import.meta.env.MODE)
console.log(`App server URL is: ${import.meta.env.VITE_APP_SERVER_URL}`)

function App() {

  return (

    <>
      <UserProvider >
        <div id="box">
          <Header />
          <main id="main-content">
            <Routes>
              <Route index element={<Home />} />
              <Route path='/games' element={<Catalog />} />
              <Route path='/games/:gameId' element={<GameDetails />} />
              <Route element={<AuthGuard />}>
                <Route path='/games/create' element={<Create />} />
                <Route path='/games/:gameId/edit' element={<EditGame />} />
                <Route path='/logout' element={<Logout />} />
              </Route>
              <Route element={<GuestGuard />}>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
              </Route>
              <Route path='/admin' element={(
                <Suspense fallback={<p>Loading...</p>}>
                  <Admin />
                </Suspense>
              )}>

              </Route>
            </Routes>
          </main>
        </div>
      </UserProvider>
    </>
  )
}

export default App