const ldapModel = require("../model/ldap.model");
const jwtConfig = require("../config/jwt.config");
const jwt = require("jsonwebtoken");


exports.test = (req,res) =>{
	ldapModel.test(req,res)
	.then(
		(result)=>{
			res.status(200).json(result);
		},
		(error)=>{
			console.log(error);
			res.status(400).json({"message":error.message});
		}
	)
	.catch((e)=>{
		res.status(500).send(e);
	});
}

exports.testtoken = (req,res) =>{
	try{
		var token = req.headers['x-access-token'];
		const decode = jwt.verify(token, jwtConfig.secret);
		console.log("token:"+token);
		console.log("decode token:"+JSON.stringify(decode));
		
		ldapModel.testtoken(req,res)
		.then(
			(result)=>{
				res.status(200).json(result);
			},
			(error)=>{
				console.log(error);
				res.status(400).json({"message":error.message});
			}
		)
		.catch((e)=>{
			res.status(500).send(e);
		});	
	}catch(e){
		console.log("try/catch: "+e);
		res.status(400).json({"error":1,"message":e.message});
	}//try/catch
}//testtoken

exports.login = (req,res) =>{
	let username = req.body.username;
	let password = req.body.password;
	if(!username || !password){ res.status(401).json({"message":"Invalid parameter !!"}); }
	ldapModel.login(username,password)
	.then(
		(result)=>{
			if(result.username){
				let token =  jwt.sign({ username: result.username }, jwtConfig.secret, 
				{
					expiresIn: jwtConfig.jwtExpiration,
					issuer:jwtConfig.issuner,
				});
				result.token=token;			
				res.status(200).send(result);
			}else{
				res.status(401).json({"message":"Invalid Username/Password"})
			}
		},
		(error)=>{
			console.log(error);
			res.status(401).json({"message":error});
		}
	)
	.catch((e)=>{ //promise throw err
		res.status(500).send(e);
	});
}

exports.entryInfo = (req,res) =>{
	var username=req.body.username;
	if(!username) res.status(401).json({"message":"invalid parameter"});
	ldapModel
	.entryInfo(username)
	.then(
		([result])=>{ // result is object
			res.status(200).json(result);
		},
		(error)=>{
			console.log(error);
			res.status(400).json({"message":error.message});
		}
	)
	.catch((e)=>{
		res.status(500).send(e);
	});
}