const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')


const ProductSchema = new mongoose.Schema ({
    title:{
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    category: {
       type: mongoose.Schema.Types.String,
       ref: 'Category',
       required: true,
    },
    available: {
        type: Boolean,
        default: true,
    },
    promotion: {
        type: Boolean,
        default: false,
    },
    createAt: {
        type: Date,
        default: Date.now,   
    },
    includedBy: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
    },
});

ProductSchema.plugin(mongoosePaginate);

// Registrando o model
mongoose.model('Product', ProductSchema);