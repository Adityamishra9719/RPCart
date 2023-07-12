import React, { Fragment ,useState,useEffect} from "react";
import "./ForgotPassword.css";
import Loader from "../layout/Loader/Loader";
import { useSelector,useDispatch} from "react-redux"
import {clearErrors,forgotPassword} from "../../actions/userAction"
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {error, message, loading }= useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("email",email);
        dispatch(forgotPassword(myForm));
    };

    useEffect(() => {

        if (error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(message){
            alert.success(message);

        }
    },[dispatch,error,alert,message]);



    return (
        <Fragment>
        {loading ? (
            <Loader/>
        ):(
            <Fragment>
    <MetaData title="Forgot Passord"/>
        <div    className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
                <form  className="forgotPasswordform"
                onSubmit={forgotPasswordSubmit}>
                    <h2>Forgot Passord</h2>

                    <div className="input-box forgotPasswordEmail">
                        <input 
                        type="email" 
                        name="email" 
                        required
                        id="email"
                        value={email}
                        onChange=  {(e) => setEmail(e.target.value)}
                        />
                        <label>Email</label>
                    </div>


                    <input type="submit" value="Update" className="forgotPasswordBtn" />
                </form>
            </div>
        </div>
        </Fragment>
        )}
    </Fragment>
    )
}

export default ForgotPassword