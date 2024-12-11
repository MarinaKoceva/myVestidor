import querystring from 'querystring';
import Item from "../models/Item.js";
import { addItem, removeItem } from "./profileService.js";

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

const remove = async (itemId, userId) => {
    await Item.findByIdAndDelete(itemId);
    await removeItem(itemId, userId);
};

const edit = async (itemId, data) => {
    const item = await Item.findById(itemId);
    item.img = data.img;
    item.title = data.title;
    item.description = data.description;
    item.category = data.category;
    item.brand = data.brand;
    item.condition = data.condition;
    item.size = data.size;
    item.price = data.price;

    await item.save();

    return item;

};

export default {
    getAll,
    create,
    getById,
    remove,
    edit
};