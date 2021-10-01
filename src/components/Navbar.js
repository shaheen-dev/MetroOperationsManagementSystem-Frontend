import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from 'react-icons/ai'
import { SideBarData } from './SidebarData'
import '../views/Navbar.css';
import { IconContext } from 'react-icons';

function Navbar() {
    const [sidebar, setSidebar] = useState(true);

    const showSidebar = () => setSidebar(!sidebar)

    return (
        <>
         <IconContext.Provider value={{ color: '#fff' }}>
                <div className= "navbar">
                    <Link to="#" className='menu-bars'>

                        <FaIcons.FaTrain onClick={showSidebar}/>
                    </Link>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items'>
                        <li className='navbar-toggle loginNav'>
                            <Link to="/" className='menu-bars'>
                            <FaIcons.FaTrain />
                            </Link>
                        </li>
                        {SideBarData.map((item,index) => {
                            return(
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                    {item.icon} &nbsp; &nbsp; &nbsp; &nbsp; 
                                    <p> {item.title}</p>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
