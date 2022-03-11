import React from "react";
import "../assets/Header.css"
import "../assets/index.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForumIcon from '@mui/icons-material/Forum';
import IconButton from '@mui/material/IconButton';

const Header = () => {
    return (
      <div className="header">
            <IconButton>
            <AccountCircleIcon className="header__icon" fontSize="large"/> 
            </IconButton>
            <IconButton>
            <img class="header__logo" 
                src="https://1000logos.net/wp-content/uploads/2018/07/tinder-emblem.jpg" 
                alt="Tinder logo gris" />
            </IconButton>
            <IconButton>
            <ForumIcon className="header__icon" fontSize="large"/>
            </IconButton>

        </div>
    )
  }
  
  export default Header;