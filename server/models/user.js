var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
	firstname: {
		type: String,
		trim: true,
		
	},
	lastname: {
		type: String,
		trim: true,
			
	},
	email: {
		type: String,
		trim: true,
		required: true
		
	},
	contactnumber: {
		type: String,
		required: true
		
		
	},
	password: {
		type: String,
		required: true,
	
	},
	token: {
		type:String
	}
	});

UserSchema.pre('save', function(next){
	var usr = this;
	if(usr.isModified('password'))
	{
		bcrypt.genSalt(7, (err, salt) => {
		if (err) { return console.log(err); }
		bcrypt.hash(usr.password, salt, (err, hash) => {
			if (err) { return console.log(err); }
				usr.password = hash;
				next();
			});
		});
	}
	else
	{
		next();
	}
	});

var User = mongoose.model('User', UserSchema);

module.exports = { User };