var mongoose = require('mongoose');


var userData = mongoose.Schema({
	
	title: {
		type: String,
		trim: true,
			
	},
	date: {
		type: String,
		trim: true,
		required: true
		
	},
	time: {
		type: String,
		required: true	
	},
	userid: {
		type: String,
		required: true
	}
	});
    var Udata = mongoose.model('Udata', userData);

    module.exports = { Udata };