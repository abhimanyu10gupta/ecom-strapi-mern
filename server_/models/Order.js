const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        products: {
            type: Object,
        },
        username: {
            type: String,
        },
        stripeSessionId: {
            type: String,
          },
        }
)

module.exports = mongoose.model('order', OrderSchema);
