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
    links: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        default: true,
    },

}, { timestamps: true });


const Project = mongoose.model('Project', projectSchema);

export default Project;
