const ErrorHander = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const crypto = require('crypto');
const User =require('../models/userModel');
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail');
const cloudinary = require('cloudinary')


// Register a user 

exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale",
    })
    const { name, email, password } = req.body;

    const user = await User.create({
        name, 
        email,
        password,
        avatar:{
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });

    // const token = user.getJWTToken();
    sendToken(user,201,res);
    // res.status(201).json({
    //     success: true,
    //     token,
    // });
});


//Login user


exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const {email, password} = req.body;

    // checking if user has given password and email both

    if(!email || !password){
        return next(new ErrorHander("Please enter your email and password",400));
    }

    const user = await User.findOne({email }).select("+password");

    if(!user){
        return next(new ErrorHander("Invalid credentials",401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid credentials",401));
    }


    // const token = user.getJWTToken();

    sendToken(user,200,res);
});




// logout user

exports.logout = catchAsyncErrors(async(req, res,next) => {
    res.cookie("token",null,{ 
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success:true,
        message:"Logged out",
    });
});


// Forget password

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email:req.body.email});

    if(!user){
        return next(new ErrorHander("User not Found",404));
    }

    // Get ResetPassword Token
    const resetToken =  user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message =`Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, pls ignore it.`;


    try{

        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Recovery `,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        })
    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHander(error.message,500))
    }

});




//reset password

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    //creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({ 
        resetPasswordToken,
        resetPasswordExpire:{$gt : Date.now()},
    });

    if(!user){
        return next(new ErrorHander("Reset password TOken is Invalid or has been expired",400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHander("Password does not match",400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user,200,res); 
});

//get user details

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        sucess: true,
        user,
    });
});



//Update user password

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHander("Old password not correct",400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHander("password does not match",400));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user,200,res);
});


//Update user profile

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {

    const newUserData ={
        name: req.body.name,
        email: req.body.email,
    };
 
    // We will add cloudinary 

    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
    
        const imageId = user.avatar.public_id;
    
        await cloudinary.v2.uploader.destroy(imageId);
    
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });
    
        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }
    
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    
    res.status(200).json({
        success: true,
    });
});




// Get all Users

exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success:true,
        users,
    })
})


// Get single Users(Admin)

exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHander(`User does not exist with id: ${req.params.id}`));
    }
    res.status(200).json({
        success:true,
        user,
    })
})





//Update user role--- admin

exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {

    const newUserData ={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    };

    // let user = User.findById(req.params.id);

    // if(!user) {
    //     return next(new ErrorHander(`1User does not exit with Id: ${req.params.id}`,400)
    //     );
    // }


    await User.findByIdAndUpdate(req.params.id, newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });


    res.status(200).json({
        success:true,
    });

});



//DELETE user ---admin

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);
    

    if(!user) {
        return next(
            new ErrorHander(`User does not exist with id: ${req.params.id}`,400)
        );
    }

    
    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();

    res.status(200).json({
        success:true,
        message: 'User deleted successfully'
    });

});



