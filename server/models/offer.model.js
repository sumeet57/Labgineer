import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
        index: true,
    },
    discountPercentage: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
    },
    maxDiscountAmount: {
        type: Number,
        required: true,
        min: 1,
        max: 1000,
    },
    available: {
        type: Boolean,
        default: true,
    },
    usageLimit: {
        type: Number,
        default: 1,
    },
    category: {
        type: String,
        enum: ['web','iot','aiml','all','other']
    },
});

const Offer = mongoose.model('Offer', offerSchema);


export default Offer;