import React from 'react'
import playStore from "../../../images/playStore.png"
import "./Footer.css"

const Footer=()=> {
    const year=new Date().getFullYear();
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android</p>
                <img src={playStore} alt="playstore" />
            </div>

            <div className="midFooter">
                <h1>RPCart</h1>
                <p>High Quality is Our First Priority</p>

                <p>Copyright {year} &copy; AdityaMishra</p>
            </div>


            <div className="rightFooter">
                <h4>Follow US</h4>
                <a href="https://www.instagram.com/adityamishra842/">Instagram</a>
                <a href="https://www.linkedin.com/in/aditya-kumar-mishra-6a025b216/">LinkedIn</a>
            </div>
        </footer>
    );
};



export default Footer
