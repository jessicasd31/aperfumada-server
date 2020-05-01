const mongoose = require('mongoose');

const Course = mongoose.model('Course');

module.exports = {
    async index(req, res){ 
    	const { page = 1 } = req.query;
    	const courses = await Course.paginate({}, { page , limit: 9 });  // {} caso queira passar as condiçoes

        return res.json(courses); 
    },

    async show(req, res){
    	const course = await Course.findById(req.params.id);

    	return res.json(course);
    },

    async store(req, res){
        const course = await Course.create(req.body);

        return res.json(course);
    },

    async update(req, res) {
    	const course = await Course.findByIdAndUpdate(req.params.id, req.body , {new: true}); 
    	
    	return res.json(course);
    },

    async destroy(req, res) { 
		await Course.findByIdAndRemove(req.params.id);		

		return res.send();
    }
}