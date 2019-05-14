'use strict';
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {

    res.render('addition', {
        
    });
});

exports.router = router;
