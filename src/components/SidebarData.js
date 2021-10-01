import React from 'react'
import * as FaIcons from "react-icons/gi"
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as FiIcons from 'react-icons/fi'
import * as GiIcons from 'react-icons/fa'

export const SideBarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text' 
    },
    
    {
        title: 'Book Ticket',
        path: '/bookTicket',
        icon: <FaIcons.GiTicket />,
        cName: 'nav-text' 
    },
    {
        title: 'Metro Card',
        path: '/metroCard',
        icon: <AiIcons.AiOutlineCreditCard />,
        cName: 'nav-text' 
    },
    {
        title: 'Fair and Schedule',
        path: '/fair',
        icon: <AiIcons.AiOutlineSchedule />,
        cName: 'nav-text' 
    },
    {
        title: 'Complaints',
        path: '/complaints',
        // icon: <FaIcons.FaEnvelopeOpenText />,
        icon: <IoIcons.IoMdHelpCircle />,
        cName: 'nav-text' 
    },
    {
        title: 'History',
        path: '/history',
        icon: <GiIcons.FaHistory />,
        cName: 'nav-text' 
    },
    {
        title: 'Logout',
        path: '/logout',
        icon: <FiIcons.FiLogOut />,
        cName: 'nav-text' 
    }
]