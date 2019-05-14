
function search_result_render(problem_list, page_num) {
    for (let i=0 ; i<problem_list.length ; i++) {
        add_search_result(problem_list[i]);
    }

    for (let i=0 ; i<problem_list.length ; i++) {
        add_delete_modal(problem_list[i]);
    }

    for (let i=0 ; i<problem_list.length ; i++) {
        add_edit_modal(problem_list[i]);
    }

    add_pagination_div(page_num);
}

function add_pagination_div(page_num) {
    let render_content_arr = [];
    render_content_arr.push('<div class="row justify-content-center">');
    if (page_num > 1) {
        render_content_arr.push('<button type="button" id="last_page_btn" onclick="click_last_page(' + page_num.toString() + ')" class="btn btn-info">上一頁</button>');
        }
    render_content_arr.push('<div class="col-2">');
    render_content_arr.push('<div class="input-group">');
    render_content_arr.push('<input type="text" id="page_num_input" class="form-control" value="' + page_num.toString() + '">');
    render_content_arr.push('<button type="button" id="jump_page_btn" onclick="click_jump_page(' + page_num.toString() + ')" class="btn btn-info">手動跳頁</button>');
    render_content_arr.push('</div>');
    render_content_arr.push('</div>');

    render_content_arr.push('<button type="button" id="next_page_btn" onclick="click_next_page(' + page_num.toString() + ')" class="btn btn-info">下一頁</button>');

    render_content_arr.push('</div>');
    $('#search-result-region').append(render_content_arr.join('\n'));
}

function click_last_page(page_num) {
    let now_page_num = now_search_option.page_num-1;
    update_search_page(now_page_num);
}
function click_jump_page(page_num) {
    if (isNaN($('#page_num_input').val())) {
        alert($('#page_num_input').val() + ' is not a valid number');
        return;
    }
    if (now_search_option.page_num.toString() !== $('#page_num_input').val()) {
        let now_page_num = parseInt($('#page_num_input').val());
        update_search_page(now_page_num);
    }
}
function click_next_page(page_num) {
    let now_page_num = now_search_option.page_num+1;
    update_search_page(now_page_num);
}

function add_search_result(problem_doc) {
    let render_content_arr = [];
    render_content_arr.push('<div class="row" id="row-' + problem_doc._id + '">');
    render_content_arr.push('<div class="col">');
    render_content_arr.push('<div class="card" id="problem-' + problem_doc._id + '">');
    render_content_arr.push('<div class="card-body">');
    render_content_arr.push('<h6 class="card-title text-muted">');
    render_content_arr.push('<b>url:</b> ' + problem_doc.url);
    render_content_arr.push('</h6>');
    render_content_arr.push('<h6 class="card-subtitle text-muted">');
    render_content_arr.push('<b>modifiy_time:</b>  ' + date_format(problem_doc.modify_date));
    render_content_arr.push('</h6>');
    render_content_arr.push('<p class="card-text mt-2" style="font-size:12px;">');
    render_content_arr.push(htmlencode(problem_doc.text));
    render_content_arr.push('</p>');
    render_content_arr.push('<button type="button" class="btn btn-outline-success" onclick="edit_problem(\'' + problem_doc._id + '\')">');
    render_content_arr.push("Edit");
    render_content_arr.push('</button>');
    render_content_arr.push('<button type="button" class="btn btn-outline-danger" onclick="delete_problem(\'' + problem_doc._id + '\')">');
    render_content_arr.push("Delete");
    render_content_arr.push('</button>');
    render_content_arr.push('</div>');
    render_content_arr.push('</div>');
    render_content_arr.push('</div>');
    render_content_arr.push('</div>');
    $('#search-result-region').append(render_content_arr.join('\n'));

}

function add_delete_modal(problem_doc) {
    let render_content_arr = [];
    render_content_arr.push('<div class="modal" id="delete-' + problem_doc._id + '-modal" tabindex="-1" role="dialog">');
    render_content_arr.push('<div class="modal-dialog modal-lg" role="document">');
    render_content_arr.push('<div class="modal-content">');

    render_content_arr.push('<div class="modal-header">');
    render_content_arr.push('<h5 class="modal-title">Ensure to delete problem ' + problem_doc._id + '?</h5>');
    render_content_arr.push('<button type="button" class="close" data-dismiss="modal" aria-label="Close">');
    render_content_arr.push('<span aria-hidden="true">&times;</span>');
    render_content_arr.push('</button>');
    render_content_arr.push('</div>');

    render_content_arr.push('<div class="modal-body">');
    render_content_arr.push('<h6>');
    render_content_arr.push('<b>url:</b> ' + problem_doc.url);
    render_content_arr.push('</h6>');
    render_content_arr.push('<h6>');
    render_content_arr.push('<b>modifiy_time:</b>  ' + date_format(problem_doc.modify_date));
    render_content_arr.push('</h6>');
    render_content_arr.push('<p style="font-size:12px;">');
    render_content_arr.push(htmlencode(problem_doc.text));
    render_content_arr.push('</p>');
    render_content_arr.push('</div>');

    render_content_arr.push('<div class="modal-footer">');
    render_content_arr.push('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>');
    render_content_arr.push('<button type="button" class="btn btn-primary" data-dismiss="modal" onclick="ensure_delete_problem(\'' + problem_doc._id + '\')">Ensure</button>');
    render_content_arr.push('</div>');

    render_content_arr.push('</div>');
    render_content_arr.push('</div>');
    render_content_arr.push('</div>');
    $('#search-result-region').append(render_content_arr.join('\n'));
}

function add_edit_modal(problem_doc) {
    let render_content_arr = [];
    render_content_arr.push('<div class="modal" id="edit-' + problem_doc._id + '-modal" tabindex="-1" role="dialog">');
    render_content_arr.push('<div class="modal-dialog modal-lg" role="document">');
    render_content_arr.push('<div class="modal-content">');

    render_content_arr.push('<div class="modal-header">');
    render_content_arr.push('<h5 class="modal-title">Edit problem ' + problem_doc._id + '</h5>');
    render_content_arr.push('<button type="button" class="close" data-dismiss="modal" aria-label="Close">');
    render_content_arr.push('<span aria-hidden="true">&times;</span>');
    render_content_arr.push('</button>');
    render_content_arr.push('</div>');

    render_content_arr.push('<div class="modal-body">');

    render_content_arr.push('</div>');
    render_content_arr.push('</div>');
    render_content_arr.push('</div>');
    render_content_arr.push('</div>');
    $('#search-result-region').append(render_content_arr.join('\n'));

    add_problem_item(problem_doc._id, 'add_date', problem_doc.add_date, "add_date_input", true);
    add_problem_item(problem_doc._id, 'modify_date', problem_doc.modify_date, "modify_date_input", true);
    add_problem_item(problem_doc._id, 'URL', problem_doc.url, "url_input", false);
    add_problem_text(
        problem_doc
    );
    add_edit_modal_footer(
        problem_doc
    );
}

function add_problem_item(problem_id, key, value, id_name, is_readonly) {
    let render_content_arr = [];
    render_content_arr.push('<div class="input-group input-group-sm mt-1 mb-1">');
    render_content_arr.push('<div class="input-group-prepend">');
    render_content_arr.push('<span class="input-group-text">' + key + '</span>');
    render_content_arr.push('</div>');
    if (is_readonly) {
        render_content_arr.push('<input readonly type="text" class="form-control" id="' + problem_id + '_' + id_name + '" value="' + value + '">');
    } else {
        render_content_arr.push('<input type="text" class="form-control" id="' + problem_id + '_' + id_name + '" value="' + value + '">');
    }
    render_content_arr.push('</div>');
    $('#' + 'edit-' + problem_id + '-modal .modal-body').append(render_content_arr.join('\n'));
}

function add_problem_text(problem_doc) {
    let render_content_arr = [];
    let problem_id = problem_doc._id;
    let word_list = htmlencode(problem_doc.text).split(/\s+/);
    let word_pos_set = new Set(problem_doc.word_pos);

    render_content_arr.push('<div class="card" id="' + problem_id + '_card' + '" data-text="' + htmlencode(problem_doc.text) + '">');
    render_content_arr.push('<div class="card-header">');

    for (let [index, word] of word_list.entries()) {
        if (word_pos_set.has(index.toString())) {
            render_content_arr.push('<span style="text-decoration:underline;">' + word + '</span>');
        } else {
            render_content_arr.push('<span onclick="add_chosen_word(\'' + problem_id + '\',\'' + htmlencode(word) + '\',\'' + index + '\')">' + word + '</span>');
        }
    }

    render_content_arr.push('</div>');
	render_content_arr.push('<ul class="list-group list-group-flush" id="' + problem_id + '_edit_ul' + '">');

	render_content_arr.push('</ul>');
    render_content_arr.push('</div>');

    $('#' + 'edit-' + problem_doc._id + '-modal .modal-body').append(render_content_arr.join('\n'));

    for (let j=0 ; j < problem_doc.word_pos.length ; j++) {
        add_chosen_word(
            problem_id,
            htmlencode(word_list[problem_doc.word_pos[j]]),
            problem_doc.word_pos[j],
            problem_doc.chinese_trans[j],
            problem_doc.index_word[j],
        )
    }
}

function add_edit_modal_footer(problem_doc) {
    let render_content_arr = [];
    let problem_id = problem_doc._id;
    render_content_arr.push('<div class="modal-footer">');
    render_content_arr.push('<button type="button" id="edit-' + problem_id + '-modal-close-btn" class="btn btn-secondary" data-dismiss="modal">Close</button>');
    render_content_arr.push('<button type="button" id="edit-' + problem_id + '-modal-ensure-btn" class="btn btn-primary" data-dismiss="modal">Ensure</button>');
    render_content_arr.push('</div>');
    $('#' + 'edit-' + problem_doc._id + '-modal .modal-body').append(render_content_arr.join('\n'));
    $('#edit-' + problem_id + '-modal-ensure-btn').click(function() { ensure_edit_problem(problem_doc); });
    $('#edit-' + problem_id + '-modal-close-btn').click(function() { close_edit_problem(problem_doc); });
}


function add_chosen_word(problem_id, chosen_word, word_pos, trans_word, index_word) {
    if (trans_word === undefined) {
        trans_word = "";
    }
    if (index_word === undefined) {
        index_word = "";
    }
    let render_content_arr = [];
    render_content_arr.push('<li class="list-group-item" id="' + problem_id + '_' + word_pos.toString() + "_li" + '">');
    render_content_arr.push('<div class="row">');
    render_content_arr.push('<div class="input-group input-group-sm col-sm-4">');
    render_content_arr.push('<div class="input-group-prepend">');
    render_content_arr.push('<span class="input-group-text">' + chosen_word + '</span>');
    render_content_arr.push('<span class="input-group-text">中文</span>');
    render_content_arr.push('</div>');
    render_content_arr.push('<input type="text" class="form-control" value="' + trans_word + '">');
    render_content_arr.push('</div>');
    render_content_arr.push('<div class="input-group input-group-sm col-sm-4">');
    render_content_arr.push('<div class="input-group-prepend">');
    render_content_arr.push('<span class="input-group-text">' + chosen_word + '</span>');
    render_content_arr.push('<span class="input-group-text">索引</span>');
    render_content_arr.push('</div>');
    render_content_arr.push('<input type="text" class="form-control" value="' + index_word + '">');
    render_content_arr.push('</div>');
    render_content_arr.push('<div class="input-group input-group-sm col-sm-3">');
    render_content_arr.push('<div class="input-group-prepend">');
    render_content_arr.push('<span class="input-group-text">' + chosen_word + '</span>');
    render_content_arr.push('<span class="input-group-text">位置</span>');
    render_content_arr.push('</div>');
    render_content_arr.push('<input readonly type="text" class="form-control" value="' + word_pos.toString() + '">');
    render_content_arr.push('</div>');
    render_content_arr.push('<button type="button" class="btn btn-outline-danger btn-sm" onclick="remove_chosen_word(\'' + problem_id + '_' + word_pos.toString() + "_li" + '\')">X</button>');
    render_content_arr.push('</div>');
    render_content_arr.push('</li>');
    $('#' + problem_id + '_edit_ul').append(render_content_arr.join('\n'));
}

function remove_chosen_word(id_name) {
    $('#' + id_name).remove();
}

function delete_problem(problem_id) {
    $('#delete-' + problem_id + '-modal').modal('show');
}

function ensure_delete_problem(problem_id) {
    let ajax_url = window.location.protocol + "//" + window.location.host + "/delete_problem";
    let ajax_data = { id: problem_id };
    $.ajax({
        url: ajax_url,
        type: 'post',
        data: JSON.stringify(ajax_data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function(xhr) {
            console.log(xhr.status);
            console.log(xhr.statusText);
            alert("Delete " + problem_id + " problem fail: "+xhr.statusText);
        },
        success: function(response) {
            if (response.success) {
                alert("Delete problem " + problem_id + " success");
                $('#row-'+problem_id).empty();
            } else {
                alert("Delete " + problem_id + " problem fail: "+response.reason);
            }
        },
    });
}

function edit_problem(problem_id) {
    $('#edit-' + problem_id + '-modal').modal('show');
    let scrollHeight = $('#' + problem_id + '-textarea').prop('scrollHeight');
    $('#' + problem_id + '-textarea').css('height', (scrollHeight+10).toString() + 'px');
}

function close_edit_problem(problem_doc) {
    //let problem_doc = JSON.parse(problem_doc_str);
    let word_list = htmlencode(problem_doc.text).split(/\s+/);
    $("#" + problem_doc._id + "_edit_ul").empty();
    for (let j=0 ; j < problem_doc.word_pos.length ; j++) {
        add_chosen_word(
            problem_doc._id,
            htmlencode(word_list[problem_doc.word_pos[j]]),
            problem_doc.word_pos[j],
            problem_doc.chinese_trans[j],
            problem_doc.index_word[j],
        )
    }
}

function ensure_edit_problem(problem_doc) {
    //let problem_doc = JSON.parse(problem_doc_str);
    let problem_id = problem_doc._id;
    let word_list = problem_doc.text.split(/\s+/);
    let modify_date = new Date();
    let url = $('#' + problem_id + '_url_input').val();
    let word_pos_list = [];
    let word_trans_list = [];
    let word_index_list = [];

    let word_pos_set = new Set();
    let submit_success = true;

    let chosen_word_elem_list = $('#' + problem_id + '_edit_ul li').toArray();
    for (let [index, elem] of chosen_word_elem_list.entries()) {

        let input_list = $(elem).find('input').toArray();
        let chosen_word = word_list[parseInt($(input_list[2]).val())];
        if ($(input_list[0]).val().length === 0) {
            alert('"' + chosen_word + '" have no chinese trans');
            submit_success = false;
            break;
        } else {
            word_trans_list.push($(input_list[0]).val());
        }

        if ($(input_list[1]).val().length === 0) {
            word_index_list.push(chosen_word);
        } else {
            word_index_list.push($(input_list[1]).val());
        }

        if (word_pos_set.has($(input_list[2]).val())) {
            alert('"' + chosen_word + '" has been chosen twice');
            submit_success = false;
            break;
        } else {
            word_pos_set.add($(input_list[2]).val());
            word_pos_list.push($(input_list[2]).val());
        }

    }
    if (submit_success) {
        let ajax_url = window.location.protocol + "//" + window.location.host + "/update_problem";
        let ajax_data = {
            id: problem_id,
            url: url,
            word_pos: word_pos_list,
            chinese_trans: word_trans_list,
            index_word: word_index_list,
    };
        $.ajax({
            url: ajax_url,
            type: 'post',
            data: JSON.stringify(ajax_data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            error: function(xhr) {
                console.log(xhr.status);
                console.log(xhr.statusText);
                alert("Edit " + problem_id + " problem fail: "+xhr.statusText);
                close_edit_problem(problem_doc);
            },
            success: function(response) {
                if (response.success) {
                    alert("Edit problem " + problem_id + " success");
                } else {
                    alert("Edit " + problem_id + " problem fail: "+response.reason);
                }
                close_edit_problem(problem_doc);
            },
        });
    } else {
        close_edit_problem(problem_doc);
    }
}

function date_format(date) {
    date = new Date(date);
    return date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}
