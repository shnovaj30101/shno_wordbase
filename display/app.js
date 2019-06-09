'use strict';
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const Problem = require('../mongodb/Problem.js');
const indexRouter = require('./routes/index');
const problemRouter = require('./routes/problem').router;
const additionRouter = require('./routes/addition').router;
const searchRouter = require('./routes/search').router;
const { config_options } = require('../config.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/problem', problemRouter);
app.use('/addition', additionRouter);
app.use('/search', searchRouter);

app.post('/submit_problem', function (req, res, next) {
    let res_body = {
        success: false,
        reason: '',
    }
    try {
        let problem = new Problem(req.body);
        problem.save((err, problem) => {});
        res_body.success = true;
        res.json(res_body);

    } catch (err) {
        res_body.reason = err.stack;
        res.json(res_body);

    }
});

app.post('/delete_problem', function (req, res, next) {
    let res_body = {
        success: false,
        reason: '',
    }
    try {
        Problem.remove({_id: req.body.id}, function(err) {
            if (err) {
                res_body.reason = err.stack;
                res.json(res_body);
            } else {
                res_body.success = true;
                res.json(res_body);
            }
        });
    } catch (err) {
        res_body.reason = err.stack;
        res.json(res_body);
    }

});

app.post('/submit_answer', function (req, res, next) {
    let res_body = {
        success: false,
        reason: '',
    }
    try {
        Problem.findOne({_id: req.body.id}, function (err, problem) {
            problem.look_times = req.body.look_times;
            problem.answer_times = req.body.answer_times;

            problem.save((err, problem) => {});
            res_body.success = true;
            res.json(res_body);
        });
    } catch (err) {
        res_body.reason = err.stack;
        res.json(res_body);
    }
});

app.post('/update_problem', function (req, res, next) {
    let res_body = {
        success: false,
        reason: '',
    }
    try {
        Problem.findOne({_id: req.body.id}, function (err, problem) {
            problem.modify_date = new Date();
            problem.url = req.body.url;
            let new_look_times = [];
            let new_answer_times = [];
            let ori_word_pos_index_map = Array.from(problem.word_pos.entries()).reduce((obj, index_value) => {
                let [index, value] = index_value;
                obj[value] = index;
				return obj;
            }, {});

            for (let word_pos of req.body.word_pos) {
                if (word_pos in ori_word_pos_index_map) {
                    new_look_times.push(problem.look_times[ori_word_pos_index_map[word_pos]]);
                    new_answer_times.push(problem.answer_times[ori_word_pos_index_map[word_pos]]);
                } else {
                    new_look_times.push(0);
                    new_answer_times.push(0);
                }
            }
            problem.modify_date = new Date();
            problem.look_times = new_look_times;
            problem.answer_times = new_answer_times;
            problem.url = req.body.url;
            problem.word_pos = req.body.word_pos;
            problem.chinese_trans = req.body.chinese_trans;
            problem.index_word = req.body.index_word;

            problem.save((err, problem) => {});
            res_body.success = true;
            res.json(res_body);

        });
    } catch (err) {
        res_body.reason = err.stack;
        res.json(res_body);
    };
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || config_options.port);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
