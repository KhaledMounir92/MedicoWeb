import React from 'react'
import NavBar from '../shared/NavBar'
import Sidebar from '../shared/sidebar/Sidebar'
import Topbar from '../shared/topbar/TopBar'

const Dashboard = (props) => {
    return (
        <>
            <Topbar/>
    <div className='flex'>
    <Sidebar/>
    </div>
        </>
    )
}

export default Dashboard
