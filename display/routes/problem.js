'use strict';
var express = require('express');
var router = express.Router();
const Problem = require('../../mongodb/Problem.js');

router.get('/', (req, res) => {

    Problem.aggregate([{ $sample: {size: 1 } }], function (err, problem_list) {
        if (err) {
            res.render('error', {
                message: err.message,
                error: err
            });
            return;
        }
        //console.log(problem_list)
        res.render('problem', {
            problem: problem_list[0]
        });
    })

});

exports.router = router;
