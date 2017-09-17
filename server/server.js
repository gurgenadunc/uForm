var express 	= require('express');
var app = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var jwt    = require('jsonwebtoken'); 
var config = require('./config'); 

var user = require('./routes/user.js');

var port = process.env.PORT || config.serverport;

mongoose.connect(config.database,{ useMongoClient: true }, function(err){
	if(err){
		console.log('Error connecting database, please check if MongoDB is running.');
	}else{
		console.log('Connected to database...');
	}
}); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('body-parser').json({ type : '*/*' }));

app.use(morgan('dev'));

// Enable CORS from client-side
app.use(function(req, res, next) {  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});


app.get('/', function(req, res) {
	res.send('Expense Watch API is running at http://localhost:' + port + '/api');
});

app.post('/register', user.signup);

var apiRoutes = express.Router();

app.use('/api', apiRoutes);

apiRoutes.post('/login', user.login);

apiRoutes.use(user.authenticate); // route middleware to authenticate and check token

apiRoutes.get('/', function(req, res) {
	res.status(201).json({ message: 'Welcome to the authenticated routes!' });
});

apiRoutes.get('/user/:id', user.getuserDetails); // API returns user details 

apiRoutes.put('/user/:id', user.updateUser); // API updates user details

apiRoutes.put('/password/:id', user.updatePassword); // API updates user password



app.listen(port);
console.log('app is listening at http://localhost:' + port);