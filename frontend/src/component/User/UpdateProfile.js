import React, { Fragment ,useState,useEffect} from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import { useSelector,useDispatch} from "react-redux"
import {clearErrors,updateProfile,loadUser} from "../../actions/userAction"
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/UserConstants";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";



const UpdateProfile = ({history}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const {user} = useSelector((state) => state.user);
    const {error, isUpdated, loading }= useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png")


    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("avatar",avatar);
        dispatch(updateProfile(myForm));
    };

    const updateProfileDataChange =(e) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {

        if(user){
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        if (error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(isUpdated){
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());

            navigate("/account");

            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    },[dispatch,error,alert,history,user,isUpdated]);



    return (
        <Fragment>
            {loading ? (
                <Loader/>
            ):(
                <Fragment>
        <MetaData title="Update Profile"/>
            <div    className="updateProfileContainer">
                <div className="updateProfileBox">
                    <form  className="updateProfileform"
                    encType="multipart/form-data"
                    onSubmit={updateProfileSubmit}>
                        <h2>Update Profile</h2>

                        <div className="input-box updateProfileName">
                            <input 
                            type="text" 
                            name="name" 
                            required 
                            value={name} 
                            onChange=  {(e) => setName(e.target.value)}
                            />
                            <label >Name</label>
                        </div>

                        <div className="input-box updateProfileEmail">
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

            
                        <div id="updateProfileImage">
                
                            <img src={avatarPreview} alt="Avatar Preview" />
                
                            <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={updateProfileDataChange}
                            />
                        </div>

                        <input type="submit" value="update Profile" className="updateProfileBtn" />
                    </form>
                </div>
            </div>
            </Fragment>
            )}
        </Fragment>
    )
}

export default UpdateProfile