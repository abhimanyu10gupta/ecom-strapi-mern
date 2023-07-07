const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ItemSchema = new Schema(
    {
        name: {
            type: String,
        },
        shortDescription: {
            type: String,
        },
        longDescription: {
            type: String,
          },
        picturePath: {
            type: String,
        },
        price: {
            type: Number, 
            get: getPrice, 
            set: setPrice 
        },
        category: {
        type: String,
        enum: [
            "newArrivals",
            "bestSellers",
            "topRated"
        ]
        }
    }
)

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

module.exports = mongoose.model('item', ItemSchema);
