const db = require("../config/db.config");

class _class {
    getall(){
        const sql = db.format("SELECT * FROM user");
        return db.execute(sql);
    }
    create({ datas }) {
        let sql = db.format("INSERT INTO user SET ?", [datas]);
        return db.query(sql);
    }
    update({ id, datas }) {
        let sql = db.format("UPDATE user SET ? WHERE user_id=?", [datas, id]);
        return db.query(sql);
    }
    delete({ id }) {
        let sql = db.format("DELETE FROM user WHERE user_id=?", [id]);
        return db.execute(sql);
    }


    login({username,password}){
        let sql = db.format("SELECT * FROM user WHERE user_name=? and user_password=?",[username,password]);
        return db.execute(sql);
    }
    userbyusername(username){
        let sql = db.format("SELECT * FROM user WHERE user_name=?",[username]);
        return db.execute(sql);
    }


}

const ClassModel = new _class();
module.exports = ClassModel;