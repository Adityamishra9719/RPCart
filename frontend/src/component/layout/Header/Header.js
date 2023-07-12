import React from 'react'
import {ReactNavbar} from "overlay-navbar";
import logo from "../../../images/logo.png"
import {FaUserAlt,FaSearch,FaShoppingCart} from "react-icons/fa"

const Header = () => {
    return <ReactNavbar
        burgerColor="blue"
        burgerColorHover="red"
        logo={logo}
        logoWidth='10vmax'
        navColor1="grey"
        logoHoverSize='10px'
        logoHoverColor="rgb(255, 210, 106"
        link1Text="Home"
        link2Text="Products"
        link3Text="Contact"
        link4Text="About"
        link1Url="/"
        link2Url="/products"
        link3Url="/contact"
        link4Url="/about"
        link1Size="1.3vmax"
        link1Color="rgba(35,35,35,0.8)"
        nav1justifyContent="flex-end"
        nav2justifyContent="flex-end"
        nav3justifyContent="flex-start"
        nav4justifyContent="flex-start"
        link1ColorHover="rgb(255, 210, 106)"
        link1Margin="3vmax"
        link4Margin="3vmax"
        profileIcon={true}
        profileIconUrl="/login"
        ProfileIconElement={FaUserAlt}
        profileIconColor="rgba(35,35,35)"
        searchIcon={true}
        SearchIconElement={FaSearch }  
        searchIconColor="rgba(35,35,35,0.8)"
        cartIcon={true}
        CartIconElement={FaShoppingCart}
        cartIconColor="rgba(35,35,35,0.8)"
        profileIconColorHover="rgb(255, 210, 106)"
        searchIconColorHover="rgb(255, 210, 106)"
        cartIconColorHover="rgb(255, 210, 106)"
        cartIconMargin="2vmax"
    />;
};


export default Header;  