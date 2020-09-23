const connection = require('../connection');
const PAGE_LIMIT = require('dotenv').config().parsed.GOODS_LIST_PAGE_LIMIT || 3;

class Goods {
    constructor() {
        //
    }

    fromForm(data) {
        this.id = parseInt(data.id);
        this.title = data.title;
        this.price = parseFloat(data.price);
    }

    fromDataBase(data) {
        this.id = parseInt(data.id);
        this.title = data.title;
        this.price = (data.price).toFixed(2);
    }

    static getCountPages() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT COUNT(1) FROM goods';
            let params = [];

            connection.execute(sql, params).then(result => {
                if (result) {
                    let pages = result[0][0]['COUNT(1)']
                    
                    resolve(Math.ceil(pages / PAGE_LIMIT));
                    return;
                }
            
                resolve(false);
            }, error => {
                console.log(error)
                reject(false);
            });
        });
    }

    static getPage(page = 1) {
        return new Promise((resolve, reject) => {
            let skip = PAGE_LIMIT * page - PAGE_LIMIT;
            let sql = 'SELECT * FROM goods limit ?, ?';
            let params = [skip, PAGE_LIMIT];

            connection.execute(sql, params).then(result => {
                let items = result[0];

                if (items.length === 0) {
                    resolve(null);
                    return;
                }

                let arrAllGoods = [];
                let obj;

                for (let i = 0; i < items.length; i++) {
                    obj = new this();
                    obj.fromDataBase(items[i]);

                    arrAllGoods.push(obj);
                }

                resolve(arrAllGoods);
            }, error => {
                console.log(error)
                reject(false);
            });
        });
    }

    static add(data) {
        let obj = new this();
        obj.fromForm(data);

        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO goods (title, price) VALUES (?,?)";
            let params = [obj.title, obj.price];

            connection.execute(sql, params).then(result => {
                resolve(result[0].insertId);

            }, error => {
                console.log(error)
                reject(false);
            });
        });
    }

    static updateById(data) {
        let obj = new this();
        obj.fromForm(data);

        return new Promise((resolve, reject) => {
            let sql = 'UPDATE goods SET title = ?, price = ? WHERE id = ?';
            let params = [obj.title, obj.price, obj.id];

            return connection.execute(sql, params).then(result => {
                resolve(true);

            }, error => {
                console.log(error)
                reject(false);
            });
        });
    }

    static deleteById(id) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM goods WHERE id = ?';
            let params = [id];
            return connection.execute(sql, params).then(result => {
                resolve(true);
    
            }, error => {
                console.log(error)
                reject(false);
            });
        });
    }
}

module.exports = Goods;