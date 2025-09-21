import './App.css'
import Home from './components/home/Home'
import Header from './components/Header/header'
import {Routes, Route} from 'react-router'

function App() {
 
  return (
    <>
      <div id="box">
        <Header />

    <main id="main-content">
      <Routes>
        <Route index element={<Home />}/>
      </Routes>
      <Home />
    </main>

      </div>
    </>
  )
}

export default App