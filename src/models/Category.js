const mongoose = require('mongoose')


const CategorySchema = new mongoose.Schema ({
    name:{
        type: String,
        required: true,
    },
});


// Registrando o model
mongoose.model('Category', CategorySchema);