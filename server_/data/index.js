const mongoose = require('mongoose');

const items =[
    {
        __id: new mongoose.Types.ObjectId(),
        name: "White Striped Pants",
        shortDescription: "Wide Legged Pants",
        longDescription: "The pants your ex dreamed you had on and your next would be lucky for you to have them.",
        picturePath: "stripe_pants.jpeg",
        price: "9999",
        category: "newArrivals",
    },
    {
        __id: new mongoose.Types.ObjectId(),
        name: "Fur Jacket",
        shortDescription: "Pink Mink's Skin Jacket",
        longDescription: "Wrap yourself with this furry jacket as if you're wrapping yourself around a man who hasnt heard of a blade before.",
        picturePath: "fluff_jacket.jpeg",
        price: "19999",
        category: "bestSellers",
    },
    {
        __id: new mongoose.Types.ObjectId(),
        name: "Classic Chill Tee",
        shortDescription: "Classic Baller Tee for Women",
        longDescription: "A Tee that shows you can chill harder than James Franco on the fourth of July",
        picturePath: "classic_tee.jpeg",
        price: "4999",
        category: "newArrivals",
    },
    // {
    //     __id: new mongoose.Types.ObjectId(),
    //     name: "",
    //     shortDescription: "",
    //     longDescription: "",
    //     picturePath: "",
    //     price: "",
    //     category: "",
    // },
    // {
    //     __id: new mongoose.Types.ObjectId(),
    //     name: "",
    //     shortDescription: "",
    //     longDescription: "",
    //     picturePath: "",
    //     price: "",
    //     category: "",
    // },
    // {
    //     __id: new mongoose.Types.ObjectId(),
    //     name: "",
    //     shortDescription: "",
    //     longDescription: "",
    //     picturePath: "",
    //     price: "",
    //     category: "",
    // },
]
module.exports = items;