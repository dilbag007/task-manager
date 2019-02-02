var mongoose = require('./db/mongoose');
var bodyParser=require('body-parser');
var bcrypt =require('bcryptjs');
var {User}=require('./models/user');
var {Udata}=require('./models/userData');
var { midauth } = require('./middleware/authantication');
var express = require('express');
var jwt = require('jsonwebtoken');


var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//browser cors policy
app.use((req, res, next) =>
{
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Requested-With, Accept, x-token');
	res.setHeader('Access-Control-Expose-Headers', 'x-token');
	next();
});

//signup api

app.post('/signup', (req, res) => {
    // console.log(req.body);
    
	usr = new User({
		firstname: req.body.FName,
		lastname: req.body.LName,
		email: req.body.Eml,
		contactnumber: req.body.ConNo,
		password: req.body.Pswd
	});
    console.log(usr);
    

	usr.save().then( (result) => {
        console.log(result);
		res.status(200).send(result);
	}).catch( (err) => {
        console.log(err);
		res.status(400).send(err);
	});
});

//user data record
app.post('/event', (req, res) => {
    console.log(req.body);
    
	usr = new Udata({
		title: req.body.title,
		date: req.body.date,
		time: req.body.time,
		userid: req.body.userid,
		
	});
    
    

	usr.save().then( (result) => {
        console.log(result);
		res.status(200).send(result);
	}).catch( (err) => {
        console.log(err);
		res.status(400).send(err);
	});
});

//login api....
app.post('/checkUser', (req, res) => {

	User.findOne({'contactnumber':req.body.ConNo}).then( (result) => {
		if (!result) { return res.status(404).send(); }
		bcrypt.compare(req.body.Pswd, result.password, (er, reslt) => {
			if(reslt)
				{
					var nwToken = jwt.sign( {_id: result._id}, 'meKey' ).toString();

					result.token = nwToken;

					result.save().then(() => {
						res.status(200).header('x-token', nwToken).send(result);
					});					
				}
			else
				{ res.status(400).send(er); }
		});
	}).catch( (err) => {
		res.status(400).send(err);
	});
});

//find all registered user
app.get('/signup', (req,res) => {

	// get all the users
User.find({}, function(err, users) {
	if (err) throw err;
  res.send(users);
	// object of all the users
	console.log(users);
  });
});

//get all user events

app.get('/userEvents', (req,res) => {

	// get all the users
Udata.find({}, function(err, users) {
	if (err) throw err;
  res.send(users);
	// object of all the users
	console.log(users);
  });
});

//user by id
app.get('/userid', (req,res) => {

	// get all the users
Udata.find({'userid':req.body.userid}, function(err, users) {
	if (err) throw err;
  res.send(users);
	// object of all the users
	console.log(users);
  });
});

//logout user
app.post('/logOut', (req, res) => {

	var token = req.body.token;

	dcoded = jwt.verify(token, 'meKey');

	User.findOne({'_id': dcoded._id}).then( () => {
		User.updateOne({'token':token} , {'token':""}, (err, result) => {
			if(err) {return res.status(400).send(err);}
			res.status(200).send();
		});
	}).catch( (err) => {
		res.status(400).send(err);
	});
});
//user with data


//assigning port(3000) number and printing massage...
app.listen(3000,()=>{
    console.log("server is running on port 3000");
});


