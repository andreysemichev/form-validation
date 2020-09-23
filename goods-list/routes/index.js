const router = require('express').Router();
const createError = require('http-errors');
const Goods = require('../classes/Goods');

let errorRes = (res, errorText = 'Ошибка') => {
    res.json({
        ok: false,
        description: errorText
    });
}
 
router.get('/', (req, res, next) => {
    let page = req.query.page || 1;

    Goods.getCountPages().then(result => {
        res.locals.paginationData = {
            pageCount: parseInt(result),
            currentPage: parseInt(page)
        };

        Goods.getPage(page).then(result => {
            res.locals.goods = result;
            res.render('index');
        }, error => {
            next(createError(500));
        });
    });
});

router.post('/', (req, res, next) => {
    const data = {
        title: req.fields.goodsAddName,
        price: req.fields.priceAddPrice
    };
    
    Goods.add(data).then(result => {
        if (result) {
            res.json({ok: true});
            return;
        }

        errorRes(res);
    }, error => {
        errorRes(res);
    });
});

router.put('/', (req, res) => {
    const data = {
        id: req.fields.id,
        title: req.fields.changeName,
        price: req.fields.changePrice,
    };

    Goods.updateById(data).then(result => {
        if (result) {
            res.json({ok: true});
            return;
        }

        errorRes(res);
    }, error => {
        errorRes(res);
    });
});

router.delete('/:id', (req, res) => {
    Goods.deleteById(req.params.id).then(result => {
        if (result) {
            res.json({ok: true});
            return;
        }

        errorRes(res);
    }, error => {
        errorRes(res);
    });
});

module.exports = router;
