import React, { Fragment ,useState,useEffect} from "react";
import "./LoginSignUp.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

import { useSelector,useDispatch} from "react-redux"
import {clearErrors,login,register} from "../../actions/userAction"
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";


const LoginSignUp = ({history,location}) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {error,loading,isAuthenticated} = useSelector((state) => state.user);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png")


    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const {name, email, password} =user;

    const loginSubmit = (e) =>{
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword))
    }
    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("password",password);
        myForm.set("avatar",avatar);
        dispatch(register(myForm));
    };

    const registerDataChange =(e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({
                ...user,
                [e.target.name]:e.target.value,
            });
        }
    };

    const redirect=location.search ? location.search.split("=")[1] : "/account";

    useEffect(() => {
        if (error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(isAuthenticated){
            history.push(redirect)
        }
    },[dispatch,error,alert,history,isAuthenticated,redirect]);

  return (
    <Fragment>
        {loading ? (
            <Loader/>
        ):(
            <Fragment>
      <div className="loginbox">
        <form  className="form" onSubmit={loginSubmit}>
          <img src={logo} alt="RPCart" />
          <h2>Login</h2>
          <div className="input-box loginForm">
            <input 
            type="email"  
            id="loginuser" 
            required
            value={loginEmail}
            onChange={(e)=> setLoginEmail(e.target.value)}
            />
            <label >Email </label>
          </div>
          <div className="input-box loginPassword">
            <input
            type="password" 
            required
            id="loginPassword"
            value={loginPassword} 
            onChange={(e)=> setLoginPassword(e.target.value)}
            /> 
            <label >Password</label>
          </div>
          <input type="submit" value="Login" className="submit-btn" />

          <Link 
          to="/password/forgot" 
          className="forgot-pw">
            Forget Password?
          </Link>
          <br />
          <a href="#create-account" className="create-account">
            Create New Account
          </a>
        </form>
        
        

        <div id="create-account">
          <form  className="form"
          encType="multipart/form-data"
          onSubmit={registerSubmit}>
            <button className="close">
              ×
            </button>
            <h2>Create Account</h2>


            <div className="input-box signUpName">
              <input 
              type="text" 
              name="name" 
              required 
              value={name} 
              onChange={registerDataChange}
              />
              <label >Name</label>
            </div>

            <div className="input-box signUpEmail">
              <input 
              type="email" 
              name="email" 
              required
              id="email"
              value={email}
              onChange={registerDataChange}
              />
              <label>Email</label>
            </div>

            <div className="input-box signUpPassword">
            <input
            type="password" 
            required
            name="password"
            value={password} 
            onChange={registerDataChange}
            /> 
            <label >Password</label>
            </div>
            


            <div id="registerImage">
                
                <div><img src={avatarPreview} alt="Avatar Preview" /></div>
                <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                />
            </div>

            <div className="TCbox">
              <input type="checkbox" name="tc" id="tc" />
              <label htmlFor="tc">
                <p>
                  I have read and agreed to the{" "}
                  <span className="tec">
                    {" "}
                    <a href="https://www.termsandconditionsgenerator.com/live.php?token=7tTdTeKDecqR9i25xh1VUYJpvu4SPK2G">
                      terms and conditions.
                    </a>
                  </span>{" "}
                </p>
              </label>
            </div>
            <input type="submit" value="Register" className="submit-btn" />
          </form>
        </div>
      </div>
    </Fragment>
        )}
    </Fragment>
  );
};

export default LoginSignUp;
