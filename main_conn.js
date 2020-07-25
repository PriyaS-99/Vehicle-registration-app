var express = require('express');  
var bodyParser = require('body-parser'); 
var ejs = require('ejs');
var MongoClient = require('mongodb').MongoClient;
var app = express();  
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// Connect to the db

MongoClient.connect("mongodb://127.0.0.1/mynewdb", function(err, db) {
 if(!err) {
    console.log("We are connected");

app.use(express.static('public')); //making public directory as static directory  
app.use(bodyParser.json());
app.get('/welcome.html', function (req, res) {  
   /*console.log("Got a GET request for the welcome page");*/  
    res.sendFile( __dirname + "/" + "welcome.html" );   
})
app.get('/about.html', function (req, res) {  
   /*console.log("Got a GET request for about");*/  
   res.sendFile( __dirname + "/" + "about.html" );
})  
app.get('/contact.html', function (req, res) {  
   /*console.log("Got a GET request for contact");*/  
   res.sendFile( __dirname + "/" + "contact.html" );
}) 
app.get('/details.html', function (req, res) {  
   /*console.log("Got a GET request for details");*/  
   res.sendFile( __dirname + "/" + "details.html" );
}) 
app.get('/termcond.html', function (req, res) {  
   /*console.log("Got a GET request for terms and conditions");*/  
   res.sendFile( __dirname + "/" + "termcond.html" );
}) 
app.get('/rate.html', function (req, res) {  
   /*console.log("Got a GET request for rating");*/  
   res.sendFile( __dirname + "/" + "rate.html" );
}) 
/*JS client side files has to be placed under a folder by name 'public' */

app.get('/index.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "index.html" );    
})  

app.get('/insert.html', function (req, res) {
    res.sendFile( __dirname + "/" + "insert.html" );
})
/* to access the posted data from client using request body (POST) or request params(GET) */
//-----------------------POST METHOD-------------------------------------------------
app.post('/process_post', function (req, res) {
    /* Handling the AngularJS post request*/
    console.log(req.body);
	res.setHeader('Content-Type', 'text/html');
    req.body.serverMessage = "NodeJS replying to angular"
        /*adding a new field to send it to the angular Client */
		console.log("Sent data are (POST): Full Name :"+req.body.fname+" Email :"+req.body.email+" Aadhar number :"+req.body.aadhar+" Address :"+req.body.adr+" Area :"+req.body.are+" City :"+req.body.city+" Pincode :"+req.body.pin+" Contact Number :"+req.body.mobile+" Alternate Number :"+req.body.alt+" Vehicle Type :"+req.body.vtype+" Company Name :"+req.body.cname+" Vehicle name:"+req.body.vname+" Vehicle Registration Number :"+req.body.rgno+" Model Name :"+req.body.mname+" Model Number :"+req.body.mno);
		// Submit to the DB
  	var fname = req.body.fname;
    var email = req.body.email;
	var aadhar = req.body.aadhar;
    var adr = req.body.adr;
	var are = req.body.are;
    var city = req.body.city;
	var pin = req.body.pin;
    var mobile = req.body.mobile;
	var alt = req.body.alt;
    var vtype = req.body.vtype;
	var cname = req.body.cname;
    var vname = req.body.vname;
	var rgno = req.body.rgno;
    var mname = req.body.mname;
	var mno = req.body.mno;
	//To avoid duplicate entries in MongoDB
	db.collection('vehicledet').createIndex({"rgno":1},{unique:true});
	/*response has to be in the form of a JSON*/
	db.collection('vehicledet').insertOne({fname:fname,email:email,aadhar:aadhar,adr:adr,are:are,city:city,pin:pin,mobile:mobile,alt:alt,vtype:vtype,cname:cname,vname:vname,rgno:rgno,mname:mname,mno:mno}, (err, result) => {                       
                    if(err) 
					{ 
						console.log(err.message); 
						res.send("Duplicate Vehicle Registration Number")
					} 
					else
					{
                    console.log('Vehicle Inserted');
					/*Sending the respone back to the angular Client */
					
					res.sendFile( __dirname + "/" + "public/yesregister.html" );
					}
                })      
	
    });
//--------------------------GET METHOD-------------------------------
app.get('/process_get', function (req, res) { 
// Submit to the DB
  var newVehi = req.query;
	var fname = req.query['fname'];
    var email = req.query['email'];
	var aadhar = req.query['aadhar'];
    var adr = req.query['adr'];
	var are = req.query['are'];
    var city = req.query['city'];
	var pin = req.query['pin'];
    var mobile = req.query['mobile'];
	var alt = req.query['alt'];
    var vtype = req.query['vtype'];
	var cname = req.query['cname'];
    var vname = req.query['vname'];
	var rgno = req.query['rgno'];
    var mname = req.query['mname'];
	var mno = req.query['mno'];
	db.collection('vehicledet').createIndex({"rgno":1},{unique:true});
	db.collection('vehicledet').insertOne({fname:fname,email:email,aadhar:aadhar,adr:adr,are:are,city:city,pin:pin,mobile:mobile,alt:alt,vtype:vtype,cname:cname,vname:vname,rgno:rgno,mname:mname,mno:mno}, (err, result) => {                       
                    if(err) 
					{ 
						console.log(err.message); 
						res.send("Duplicate Vehicle Registration Number")
					} 
					else
					{
                    console.log("Sent data are (GET): Full Name :"+req.body.fname+" Email :"+req.body.email+" Aadhar number :"+req.body.aadhar+" Address :"+req.body.adr+" Area :"+req.body.are+" City :"+req.body.city+" Pincode :"+req.body.pin+" Contact Number :"+req.body.mobile+" Alternate Number :"+req.body.alt+" Vehicle Type :"+req.body.vtype+" Company Name :"+req.body.cname+" Vehicle name:"+req.body.vname+" Vehicle Registration Number :"+req.body.rgno+" Model Name :"+req.body.mname+" Model Number :"+req.body.mno);
					/*Sending the respone back to the angular Client */
					res.sendFile( __dirname + "/" + "public/yesregister.html" );
					}
                })      
}) 

//--------------UPDATE------------------------------------------
app.get('/update.html', function (req, res) {
    res.sendFile( __dirname + "/" + "update.html" );
})

app.get("/update", function(req, res) {
	var rgno1=req.query.rgno;
	var fname1=req.query.fname;
	var email1=req.query.email;
	var aadhar1=req.query.aadhar;
	var adr1=req.query.adr;
	var are1=req.query.are;
	var city1=req.query.city;
	var pin1=req.query.pin;
	var mobile1=req.query.mobile;
	var alt1=req.query.alt;
    db.collection('vehicledet', function (err, data) {
        data.update({"rgno":rgno1},{$set:{"fname":fname1,"email":email1,"aadhar":aadhar1,"adr":adr1,"are":are1,"city":city1,"pin":pin1,"mobile":mobile1,"alt":alt1}},{multi:true},
            function(err, obj){
				if (err) {
					console.log("Failed to update data.");
			} else {
				if (obj.result.n==1)
				{
				res.sendFile( __dirname + "/" + "public/yesupdate.html" );
				console.log("Vehicle Updated")
				}
				else
					res.sendFile( __dirname + "/" + "public/noupdate.html" );
			}
        });
    });
})	
//--------------SEARCH------------------------------------------
app.get('/search.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "search.html" );    
})

app.get("/search", function(req, res) {
	//var vehiclenum=parseInt(req.query.vehicleno)  // if empid is an integer
	var rgnum=req.query.rgno;
    db.collection('vehicledet').find({rgno: rgnum}).toArray(function(err,i) {
    if (err) {
      console.log(err.message+ "Failed to get data.");
    } else {
		res.render('searchyes.ejs',{vehicles: i}) 
	  
    }
  });
  });
  // --------------To find "Single Document"-------------------
	/*var vehiclenum=parseInt(req.query.vehicleno)
    db.collection('vehicledet').find({'rgno':rgnum}).nextObject(function(err, doc) {
    if (err) {
      console.log(err.message+ "Failed to get data");
    } else {
      res.status(200).json(doc);
    }
  })
}); */

//--------------DELETE------------------------------------------
app.get('/delete.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "delete.html" );    
})

app.get("/delete", function(req, res) {
	//var vehiclenum=parseInt(req.query.vehicleno)  // if vehicleno is an integer
	var rgnum=req.query.rgno;
	db.collection('vehicledet', function (err, data) {
        data.remove({"rgno":rgnum},function(err, obj){
				if (err) {
					console.log("Failed to remove data.");
			} else {
				if (obj.result.n>=1)
				{
				res.sendFile( __dirname + "/" + "public/yesdelete.html" );
				console.log("Vehicle Deleted")
				}
				else
					res.sendFile( __dirname + "/" + "public/nodelete.html" );
			}
        });
    });
    
  });
  

//-------------------DISPLAY-----------------------
app.get('/display', function (req, res) { 
//-----IN JSON FORMAT  -------------------------
/*db.collection('vehicledet').find({}).toArray(function(err, docs) {
    if (err) {
      console.log("Failed to get data.");
    } else 
	{
		res.status(200).json(docs);
    }
  });*/
//------------- USING EMBEDDED JS -----------
 db.collection('vehicledet').find().sort({rgno:1}).toArray(
 		function(err , i){
        if (err) return console.log(err)
        res.render('disp.ejs',{vehicles: i})  
     })
//---------------------// sort({rgno:-1}) for descending order -----------//
}) 

 app.get('/shortdisplay', function (req, res) { 

 db.collection('vehicledet').find().sort({rgno:1}).toArray(
 		function(err , i){
        if (err) return console.log(err)
        res.render('dispshort.ejs',{vehicles: i})  
     })
//---------------------// sort({rgno:-1}) for descending order -----------//
}) 
var server = app.listen(5000, function () {  
var host = server.address().address  
  var port = server.address().port  
console.log("MEAN Stack app listening at http://%s:%s", host, port)  
})  
}
else
{   db.close();  }
  
});
