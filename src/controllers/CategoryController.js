const mongoose = require('mongoose');

const Category = mongoose.model('Category');

module.exports = {
    async index(req, res){ 
    	const categories = await Category.find({});

        return res.json(categories); 
    },

    async store(req, res){
        const category = await Category.create(req.body);

        return res.json(category);
    },

    async update(req, res) {
    	const category = await Category.findByIdAndUpdate(req.params.id, req.body , {new: true}); 
    	
    	return res.json(category);
    },

    async destroy(req, res) { 
		await Category.findByIdAndRemove(req.params.id);		

		return res.send();
    }
}