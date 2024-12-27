import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import AddNewBlog from './pages/add-blog';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Routes>
        <Route exact path= '/' element = {<Home/>}/>
        <Route exact path= '/add-blog' element = {<AddNewBlog/>}/>
      </Routes>
    </>
  )
}

export default App
