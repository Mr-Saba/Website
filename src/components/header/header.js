import React from 'react'
import './header.css'
import {Link} from 'react-router-dom'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { IconButton, Badge} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';


function Header() {
    return (
        <div className="header">
           <nav className="headerNav">
               <ul className="logoUl">
                    <li>
                        <Link to="/">TΛTΛ</Link>
                    </li>
                </ul>
               <ul className="centerUl">
                   <li>
                       <Link to="/">Home</Link>
                   </li>
                   <li>
                       <Link to="/production">Production</Link>
                   </li>
                   <li>
                       <Link to="/aboutUs">About Us</Link>
                   </li>
                </ul>
                <ul className="serach">
                    
                </ul>
                <ul className="rightUl">
                   <li>
                       <Link to="/loved">
                           <FavoriteBorderIcon/>
                       </Link>
                   </li>
                   <li>
                        <IconButton  component={Link} to='/cart' area-label='Show cart items' color='inherit'>
                            <Badge badgeContent="0" color='secondary'>
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                   </li>
                   <li>
                       <Link to="/profile">
                           <PersonOutlineOutlinedIcon/>
                       </Link>
                   </li>
                </ul>
           </nav>
        </div>
    )
}

export default Header