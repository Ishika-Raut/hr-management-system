import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({

    //Employee 1 --- 1 User
    user: {
        type: mongoose.Schema.Types.ObjectId, // Defines the field which will hold an ObjectId
        ref: "User",  //Specifies which model (collection) it references
        required:  true,
        // creates a unique index in MongoDB.
        // It guarantees:
        //  No two Employee documents can have the same user value
        //  Prevents duplicates at the database level
        // It does NOT enforce foreign key constraints like SQL
        // It does NOT ensure the referenced User actually exists
        unique: true,
    },
    department: {
        type: String,
        required: [true, "Department is required!"]
    },
    position: {
        type: String,
        required: [true, "Position is required!"]
    },
    joiningDate: {
        type: Date,
        required: [true, "Joining date is required!"]
    }
}, 
{ timestamps: true });

const Employee =  mongoose.model("Employee", employeeSchema);
export default Employee;