import './App.css'
import {Routes, Route} from 'react-router'
// Components
import Home from './components/home/Home'
import Header from './components/Header/header'
import Catalog from './components/catalog/Catalog'
import Create from './components/create/Create'
import Login from './components/login/Login'
import Register from './components/register/Register'

function App() {
 
  return (
    <>
      <div id="box">
        <Header />

    <main id="main-content">
      <Routes>
        <Route index element={<Home />}/>
        <Route path='/games' element={<Catalog/>}/>
        <Route path='/games/create' element={<Create />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </main>

      </div>
    </>
  )
}

export default App