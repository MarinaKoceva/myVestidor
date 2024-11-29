import { Schema, model, Types } from 'mongoose';

const itemSchema = new Schema({
    make: {
        type: String,
        required: [true, 'Make is required!'],
        minLength: [4, 'Make should be at least 4 characters long!']
    },
    model: {
        type: String,
        required: [true, 'Model is required!'],
        minLength: [4, 'Model should be at least 4 characters long!']
    },
    year: {
        type: Number,
        required: [true, 'Year is required!'],
        min: [1950, 'Year cannot be before 1950!'],
        max: [2050, 'Year cannot be after 2050!'],
    },
    description : {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description should be at least 10 characters long!']
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        min: [0, 'Price must be a positive number!']
    },
    img: {
        type: String,
        required: [true, 'Image is required!'],
        validate: [/^https?:\/\//, 'Invalid image url!']
    },
    material: {
        type: String
    },
    _ownerId: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Item = model('Item', itemSchema);

export default Item;