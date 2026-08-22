import mongoose from "mongoose";

const amountSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
        min: 1,
    },
    discount: {
        type: Number,
        default: 0,
    },
    offer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer',
        default: null,
        optional: true,
    },
    finalPrice: {
        type: Number,
        required: true,
    }
});


const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    amount: {
        type: amountSchema,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['upi', 'credit_card', 'debit_card', 'net_banking', 'wallet'],
        required: true,
    },
    status: {
        type: String,
        enum: ["processing", "completed", "failed", "expired", "user_dropped"],
        default: 'processing',
    },

});


const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;