import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({

    //Attendance 1 --- Emolyee
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    checkInTime: {
        type: Date,
        required: true          
    },
    checkOutTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["present", "absent", "late", "half-day", "leave"],
        default: "absent"
    }
}, {
    timestamps: true
});


const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance