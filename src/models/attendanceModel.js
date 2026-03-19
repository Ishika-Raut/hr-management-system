import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({

    //Attendance 1 --- Emolyee
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    checkInTime: {
        type: Date,
        required: true          
    },
    checkOutTime: {
        type: Date,
        default: null
    },
     workingHours: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["present", "absent", "half-day"],
        default: "absent"
    }
}, {
    timestamps: true
});


const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance

