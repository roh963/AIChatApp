import { mongoose } from 'mongoose';

const Schema = mongoose.Schema;

const projectSchema = new Schema({
 
    name: {
        type: String,
        lowercase:true,
        required: true,
        trim:true,
        unique: [true,'project name should be unique']
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }]
});

 const Project  = mongoose.model("project",projectSchema );
 export default Project;
 