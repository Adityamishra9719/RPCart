import React, { Fragment ,useState,useEffect} from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import { useSelector,useDispatch} from "react-redux"
import {clearErrors,updatePassword} from "../../actions/userAction"
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/UserConstants";
import MetaData from "../layout/MetaData";

const UpdatePassword = ({history}) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {error, isUpdated, loading }= useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    


    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword",oldPassword);
        myForm.set("newPassword",newPassword);
        myForm.set("confirmPassword",confirmPassword);
        dispatch(updatePassword(myForm));
    };


    useEffect(() => {

        if (error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(isUpdated){
            alert.success("Profile Updated Successfully");

            history.push("/account");

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
    },[dispatch,error,alert,history,isUpdated]);


    return (
        <Fragment>
            {loading ? (
                <Loader/>
            ):(
                <Fragment>
        <MetaData title="Update Password"/>
            <div    className="updatePasswordContainer">
                <div className="updatePasswordBox">
                    <form  className="updatePasswordform"
                    onSubmit={updatePasswordSubmit}>
                        <h2>Update Profile</h2>

                        <div className="input-box loginPassword">
                            <input
                                type="password" 
                                required
                                value={oldPassword} 
                                onChange={(e)=> setOldPassword(e.target.value)}
                            /> 
                            <label >Old Password</label>
                        </div>


                        <div className="input-box loginPassword">
                            <input
                                type="password" 
                                required
                                value={newPassword} 
                                onChange={(e)=> setNewPassword(e.target.value)}
                            /> 
                            <label >New Password</label>
                        </div>

                        <div className="input-box loginPassword">
                            <input
                                type="password" 
                                required
                                value={confirmPassword} 
                                onChange={(e)=> setConfirmPassword(e.target.value)}
                            /> 
                            <label >Confirm Password</label>
                        </div>


                        <input type="submit" value="Change Password" className="updatePasswordBtn" />
                    </form>
                </div>
            </div>
            </Fragment>
            )}
        </Fragment>
    )
}

export default UpdatePassword