import mongoose from "mongoose";
import { MONGO_URL } from "../const.js";

function connect() {
    mongoose.connect(MONGO_URL)
            .then(()=>{
                console.log("Connect to db");
            })
            .catch((err)=>{
                console.error("Error connecting to db",err);
            });
}

export default connect;