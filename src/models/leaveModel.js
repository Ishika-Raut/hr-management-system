import mongoose from "mongoose";

const leaveSchema = mongoose.Schema({


    //Leave N --- 1 Employee
    employee: {
            type: mongoose.Schema.Types.ObjectId, // Defines the field which will hold an ObjectId
            ref: "Employee",  //Specifies which model (collection) it references
            required:  true,
            unique: true,
        },
    leaveType: { 
        type: String,
        required: [true, "Leave Type is required!"]
    },
    startDate: {
        type: Date,
        required: [true, "Leave start date is required!"]
    },
    endDate: {
        type: Date,
        required: [true, "Leave end date is required!"]
    },
    reason: {
        type: String,
        required: [true, "Reason for leave is required!"]
    },
    leaveStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending" 
    },
}, 
{ timestamps: true });

const Leave =  mongoose.model("Leave", leaveSchema);
export default Leave;