import mongoose from "mongoose";


const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    },
    context: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 5000,
    },
    price: {
        type: Number,
        required: true,
        min: 1,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    imageFileId: {
        type: String,
        required: true,
    },
    includes: {
        type: [String],
        required: true,
    },
    link: {
        type: String,
        required: true,
        select: false, // Exclude the link field from query results by default
    },
    available: {
        type: Boolean,
        default: true,
    },

}, { timestamps: true });


const Project = mongoose.model('Project', projectSchema);

export default Project;
