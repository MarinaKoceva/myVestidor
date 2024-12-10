import querystring from 'querystring';
import Item from "../models/Item.js";
import { addItem } from './profileService.js';


const getAll = (query = {}) => {
    let items = Item.find();
    
    if (query.where) {
        items.find(querystring.parse(query.where.replaceAll('"', '')));
    };

    return items;
};

const create = async (data, userId) => {
    const item = await Item.create({ ...data, _ownerId: userId })
    await addItem(item._id, userId);

    return item;
};

const getById = (itemId) => Item.findById(itemId);

const remove = (itemId) => Item.findByIdAndDelete(itemId);

const edit = (itemId, data) => Item.findByIdAndUpdate(itemId, data, { runValidators: true });

export default {
    getAll,
    create,
    getById,
    remove,
    edit
};