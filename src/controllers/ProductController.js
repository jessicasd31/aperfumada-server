const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports = {
    async index(req, res){ 
    	const { page = 1 } = req.query;
        const { category = null } = req.query;
        let { search = null } = req.query;
        let products = null;

        if(search != null){
            products = await Product.paginate({title: {$regex : `.*${search}.*`, $options : 'i'}}, { page , limit: 12 });
        } else {
            if( category == null ){
        	   products = await Product.paginate({}, { page , limit: 12 });
            } else {
               products = await Product.paginate({category}, { page , limit: 12 });
            }
        }

        return res.json(products); 
    },

    async show(req, res){
    	const product = await Product.findById(req.params.id);

    	return res.json(product);
    },

    async store(req, res){
        const product = await Product.create(req.body);

        return res.json(product);
    },

    async update(req, res) {
    	const product = await Product.findByIdAndUpdate(req.params.id, req.body , {new: true}); 
    	
    	return res.json(product);
    },

    async destroy(req, res) { 
		await Product.findByIdAndRemove(req.params.id);		

		return res.send();
    }
}