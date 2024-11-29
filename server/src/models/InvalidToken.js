import { Schema, model } from "mongoose";

const InvalidTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '2h'

    }
});

const InvaliToken = model('InvaliToken', InvalidTokenSchema);

export default InvaliToken;