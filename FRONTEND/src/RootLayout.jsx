import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  {HomePage}  from './pages/HomePage'
import  {AuthPage}  from './pages/AuthPage'
import './index.css'
import { Outlet } from '@tanstack/react-router'
import { Navbar } from './components/Navbar'

const RootLayout = () =>{
   <>
   <Navbar />
   <Outlet />
   </>
}
export default RootLayout