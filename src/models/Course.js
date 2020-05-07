const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')


const CourseSchema = new mongoose.Schema ({
    title:{
        type: String,
        required: true,
    },
    instructor: {
        type: String,
    },
    instructorProfession: {
        type: String,
    },
    instructorImage: {
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
    beginning: {
        type: Date, 
    },
    conclusion: {
        type: Date, 
    },
    duration: {
        type: Number,
    },
    category: {
       type: mongoose.Schema.Types.String,
       ref: 'Category',
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

CourseSchema.plugin(mongoosePaginate);

// Registrando o model
mongoose.model('Course', CourseSchema);