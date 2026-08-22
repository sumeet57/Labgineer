import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
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
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        required: true,
    },
    status: {
        type: String,
        enum: ["confirmed", "making", "shipped", "delivered", "cancelled"],
        default: "confirmed",
    },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;