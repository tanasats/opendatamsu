const ldap = require("ldapjs");
var adminPWD = "tanasat71521150";
var adminDN = "CN=นายธนศาสตร์ สุดจริง,OU=สำนักคอมพิวเตอร์,OU=1_Staffs,DC=msu,DC=ac,DC=th";
/*var tlsOptions = {
	host: "10.1.99.9",
	port: "389",
};
var client = ldap.createClient({
	url: "ldap://10.1.99.9:389",
	reconnect: true,
	//tlsOptions: tlsOptions,
});
*/

class _ldapClass{	
test=(req,res)=>{
		return new Promise(function (resolve, reject) {
			return resolve({error:0,message:"model function test success"});
			//return reject({message:"error model function reject"});
		});//promise
	}
	
testtoken=(req,res)=>{
		return new Promise(function (resolve, reject) {
			return resolve({error:0,message:"model function testtoken success"});
			//return reject({message:"error model function reject"});
		});//promise
	}
	
login=(username,password)=>{
		return new Promise(function (resolve, reject) {
			try{
				var entries = []; 
				var client = ldap.createClient({
					url: "ldap://10.1.99.9:389",
					reconnect: true,
				}); 
				client.on('error', err => {
					console.log("client on error:"+err.message);
				});
				client.bind(adminDN, adminPWD, (err) => {
				  if (err) { return reject(err);  }
				}); 
								var base = "DC=msu,DC=ac,DC=th";
				var search_options = { 
				  filter: '(&(objectClass=user)(sAMAccountName='+username+'))',
				  scope: 'sub',
				  attributes: ["dn","sAMAccountName"],
				}
				client.search(base, search_options, function (err, res) {
					if (err) {
						console.log("client.search(err):"+err);
						destroy(client);
						return reject(err);
					}
					res.on("searchEntry",(entry)=>{
						//console.log('entry: ' + JSON.stringify(entry.object));
						entries.push(entry.object);
					});
					res.on("searchReference", (referral) => {
						//console.log('referral: ' + referral.uris.join());
					});
					res.on("error",(err)=>{
						//console.log("res.on(error)");
						destroy(client);
						return reject(err);
					});
					res.on("end",(result)=>{
						//console.log('status: ' + JSON.stringify(result));
						if(!entries[0]){
							destroy(client);
							return resolve({"error":1,"message":"invalid username/password"});
						}else{
							let dn = entries[0].dn;
							client.bind(dn, password, (err2) => {
								if(err2){
									destroy(client);
									return reject({"error":1,"message":"invalid username/password"});
								}
								destroy(client);
								return resolve({
									"username":entries[0].sAMAccountName,
								});
							});
						}
					});
				});//client.search()
			} catch (err) {
				//console.log("try/catch:"+err);
				return reject(err);
			} // try/catch			
		});//promise
	}//login
	
entryInfo=(username)=>{
		return new Promise(function(resolve,reject){	
			try{		
				var entries = []; 
				var client = ldap.createClient({
					url: "ldap://10.1.99.9:389",
					reconnect: true,
				}); 
				client.on('error', err => {
					console.log("client on error:"+err.message);
				});
				client.bind(adminDN, adminPWD, (err) => {
				  if (err) { return reject(err);  }
				}); 
				var base = "DC=msu,DC=ac,DC=th";
				var search_options = { 
				  filter: '(&(objectClass=user)(sAMAccountName='+username+'))',
				  scope: 'sub',
				  attributes: ["dn", "sn", "cn", "givenName", "description", "mail","userPrincipalName","uid"],
				}
				client.search(base, search_options, function (err, res) {
					if (err) {
						//console.log("client.search(err):"+err);
						destroy(client);
						return reject(err);
					}
					res.on("searchEntry",(entry)=>{
						//console.log('entry: ' + JSON.stringify(entry.object));
						entries.push(entry.object);
					});
					res.on("searchReference", (referral) => {
						//console.log('referral: ' + referral.uris.join());
					});
					res.on("error",(err)=>{
						//console.log("res.on(error)");
						destroy(client);	
						return reject(err);
					});
					res.on("end",(result)=>{
						//console.log("res.on(end)"+client.connected);
						//delete entries[0].controls;
						destroy(client);
						return resolve(entries);
					});
				});//client.search()
			} catch (err) {
				//console.log("try/catch:"+err);
				return reject(err);
			}
		});//promise
	}//entryFilter
	
	
}//class

function destroy(client){
	if(client.connected){
		client.unbind();
		client.destroy();		
	}
	//console.log("destroy client connected:"+client.connected);
}//destroy()

let  ldapClassModel = new _ldapClass();
module.exports = ldapClassModel;