import React from 'react'
import { Navbar, Sidebar } from "../components";
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
        <Navbar/>
        <Sidebar>
            <Outlet/>
        </Sidebar>
    </div>
  )
}
