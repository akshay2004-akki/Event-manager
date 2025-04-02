import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: { 
        type: String, 
        required: true, 
        maxlength: 2000 
    },

    date: { 
        type: Date, 
        required: true },

    venue: { 
        type: String, 
        required: true 
    },

    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },

    category: { 
        type: String, 
        enum: ['Technical', 'Cultural', 'Sports', 'Workshop', 'Seminar'], 
        required: true 
    },

    attendees: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }
    ],

    maxAttendees: { 
        type: Number, 
        default: 100 
    },
    isPaid: { 
        type: Boolean, 
        default: false 
    },
    ticketPrice: { 
        type: Number, 
        default: 0 
    }, 

    images: [
        { 
            type: String 
        }
    ], 
    status: { 
        type: String, 
        enum: ['Upcoming', 'Ongoing', 'Completed'], 
        default: 'Upcoming' 
    },

}, { timestamps: true });

export const Event = mongoose.model("Event" , eventSchema);
