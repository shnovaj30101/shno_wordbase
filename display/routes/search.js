'use strict';
var express = require('express');
var router = express.Router();
const Problem = require('../../mongodb/Problem.js');

router.get('/', (req, res) => {

    res.render('search', {
        
    });
});

router.post('/search', (req, res) => {
    let text_search = req.body.text_search;
    let date_from = req.body.date_from;
    let date_to = req.body.date_to;
    let page_num = req.body.page_num;

    let res_body = {
        'success': false,
        'reason': '',
    }

    let find_condition = {};

    if (text_search.length > 0) {
        find_condition.$text = {
            $search: text_search,
        }
    }

    let date_range = {};

    if (date_from.length !== 0) {
        let date_from_arr = date_from.split('/');
        date_range.$gte = new Date(
            parseInt(date_from_arr[0]),
            parseInt(date_from_arr[1])-1,
            parseInt(date_from_arr[2])
        );
    }

    if (date_to.length !== 0) {
        let date_to_arr = date_to.split('/');
        date_range.$lt = new Date(
            parseInt(date_to_arr[0]),
            parseInt(date_to_arr[1])-1,
            parseInt(date_to_arr[2])
        );
    }

    if (Object.keys(date_range).length > 0) {
        find_condition.modify_date = date_range;
    }

    Problem.paginate(
        find_condition,
        { page: page_num, limit: 20 },
	).then((problem_list) => {
		res_body.success = true;
		res_body.problem_list = problem_list;
		res.json(res_body);

    }).catch((err) => {
        res_body.reason = err.message;
        res.json(res_body)
    })


});

exports.router = router;
