import { Schema, model, Types } from 'mongoose';

const itemSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Make is required!'],
        minLength: [4, 'Make should be at least 4 characters long!']
    },
    description : {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description should be at least 10 characters long!']
    },
    category: {
        type: String,
        required: [true, 'Category is required!'],
        minLength: [3, 'Category should be at least 3 characters long!']
    },
    brand: {
        type: String,
        required: [true, 'Brand is required!'],
        minLength: [3, 'Brand should be at least 3 characters long!']
    }, 
    condition: {
        type: String,
        required: [true, 'Condition is required!'],
        minLength: [3, 'Condition should be at least 3 characters long!']
    },
    size: {
        type: String,
        required: [true, 'Size is required!'],
        minLength: [1, 'Size should be at least 1 characters long!']
    },
    price: {
        type: String,
        required: [true, 'Price is required!'],
        min: [0, 'Price cannot be Negative number!'],
    },
    /*img: {
        type: String,
        required: [true, 'Image is required!'],
        validate: [/^https?:\/\//, 'Invalid image url!']
    },*/
    _ownerId: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Item = model('Item', itemSchema);

export default Item;