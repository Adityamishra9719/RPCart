import React, { Fragment ,useState,useEffect} from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useSelector,useDispatch} from "react-redux"
import {clearErrors,resetPassword} from "../../actions/userAction"
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const ResetPassword = ({history,match}) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const {error,success, loading }= useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    


    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password",password);
        myForm.set("confirmPassword",confirmPassword);
        dispatch(resetPassword(match.params.token ,myForm));
    };


    useEffect(() => {

        if (error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(success){
            alert.success("Password Updated Successfully");

            history.push("/login");

        }
    },[dispatch,error,alert,history,success]);


    return (
        <Fragment>
            {loading ? (
                <Loader/>
            ):(
                <Fragment>
        <MetaData title="Reset Password"/>
            <div    className="resetPasswordContainer">
                <div className="resetPasswordBox">
                    <form  className="resetPasswordform"
                    onSubmit={resetPasswordSubmit}>
                        <h2>Update Profile</h2>


                        <div className="input-box">
                            <input
                                type="password" 
                                required
                                value={password} 
                                onChange={(e)=> setPassword(e.target.value)}
                            /> 
                            <label >New Password</label>
                        </div>

                        <div className="input-box">
                            <input
                                type="password" 
                                required
                                value={confirmPassword} 
                                onChange={(e)=> setConfirmPassword(e.target.value)}
                            /> 
                            <label >Confirm Password</label>
                        </div>


                        <input type="submit" value="Update" className="resetPasswordBtn" />
                    </form>
                </div>
            </div>
            </Fragment>
            )}
        </Fragment>
    )
}

export default ResetPassword