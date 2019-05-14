'use strict';
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {

    res.render('problem', {
        
    });
});

exports.router = router;
