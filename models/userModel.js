import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        requied : true,
        maxLength : 50
    },
    lastName : {
        type : String,
        required : true,
        maxLength : 50,
    },
    hashPassword : {
        type: String,
        required : true,
        minLength : 6
    },
    email : {
        type : String ,
        unique : true,
        required : true,
        minLength : 3,
        maxLength : 30
    },
},
{ timestamps : true}
);

const User = mongoose.model("User" , userSchema);

export default User;
