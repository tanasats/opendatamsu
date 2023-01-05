const userModel = require("../model/user.model");
const jwtConfig = require("../config/jwt.config");
const jwt = require("jsonwebtoken");

exports.getall = (req,res) => {
    userModel
    .getall()
    .then(([row]) => {
        res.status(200).json(row);
    })
    .catch((err) =>{
        res.status(400).json(err);
    })
}

exports.create = async (req, res) => {
    console.log(req.body);
    const datas = req.body;
    datas.cdate = new Date();
    datas.mdate = new Date();
    if (req.body.user_name) {
      console.log("data:", datas);
      userModel
      .create({ datas: datas })
        .then(([row]) => {
          console.log("create()->result:", row);
          res.status(200).json(row);
        })
        .catch((error) => {
          console.log(error);
          res.status(400).send(error);
        });
    } else {
      res.status(400).send({ message: "Invalid request parameter" });
    }
  };


  exports.update = async (req, res) => {
    const id = req.params.id;
    const datas = req.body;
    if (Object.keys(datas).length === 0) {
      // empty datas
      return res.status(400).send({ message: "Invalid request parameter" });
    }
    if (req.params.id) {
      if (datas.user_password) {
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        datas.user_password = await bcrypt.hash(datas.user_password, salt);
      }
      delete datas.cdate;
      datas.mdate = new Date();
      userModel
        .update({ id: id, datas: datas })
        .then(([row]) => {
          res.status(200).json(row);
        })
        .catch((error) => {
          console.log(error);
          res.status(400).send(error);
        });
    } else {
      res.status(400).send({ message: "Invalid request parameter" });
    }
  }; 
 
exports.delete = (req, res) => {
    if (req.params.id) {
      userModel
        .delete({ id: req.params.id })
        .then(([row]) => {
          res.status(200).json(row);
        })
        .catch((error) => {
          console.log(error);
          res.status(400).send(error);
        });
    } else {
      res.status(400).send("Invalid request parameter");
    }
  };

  exports.login = (req,res) => {
    let username = req.body.username||null;
    let password = req.body.password||null;
    if(username && password){
      userModel
      .login({username,password})
      .then(([row]) => {
        let result = row[0];
        if(result.user_id){
          let token =  jwt.sign({ username: result.user_name }, jwtConfig.secret, 
          {
            expiresIn: jwtConfig.jwtExpiration,
            issuer:jwtConfig.issuner,
          });
          result.token=token;			
          res.status(200).send(result);
        }else{
          res.status(401).json({"message":"Invalid Username/Password"})
        }
      })
      .catch((err) => {
        res.stats(400).send(err);
      })
    } else {
      res.status(400).send("Invalid request parameter");
    }
  };

  exports.me = (req,res) => {
    var token = req.headers["x-access-token"];
    try {
      const _decode = jwt.verify(token, jwtConfig.secret);
      console.log('access_token_decode:',_decode);
      userModel
        .userbyusername(_decode.username)
        .then(([row]) => {
          if (!row.length){
            return res
              .status(401)
              .json({ message: _decode.username + " not found !!" });
          }
          return res.status(200).send(row);
        })
        .catch((error) => {
          return res.status(401).send(error);
        });
    } catch (err) {
      return res.status(401).send(err);
    }
  };