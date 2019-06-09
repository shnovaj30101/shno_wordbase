function ensure_text() {
	let input_text = htmlencode($('#input_textarea').val());
    let word_list = input_text.split(/\s+/);
    $("#problem_ul").remove();
    $("#problem-text-div").remove();
	let render_content_arr = [];
	render_content_arr.push('<div class="card-header" id="problem-text-div" data-text="' + input_text.replace('"','\\"') + '">');
    for (let i = 0 ; i < word_list.length ; i++) {
        render_content_arr.push('<span onclick="choose_word(' + i.toString() + ',\'' + word_list[i].replace("'","\\'") + '\')">' + word_list[i] + "</span>");
    }
	render_content_arr.push('</div>');
	render_content_arr.push('<ul class="list-group list-group-flush" id="problem_ul">');
    render_content_arr.push('<li class="list-group-item">');
	render_content_arr.push('<div class="input-group input-group-sm">');
	render_content_arr.push('<div class="input-group-prepend">');
	render_content_arr.push('<span class="input-group-text">URL</span>');
    render_content_arr.push('</div>');
	render_content_arr.push('<input type="text" class="form-control" id="url-input">');
    render_content_arr.push('</div>');
    render_content_arr.push('</li>');
	render_content_arr.push('</ul>');
    $('#problem_card').append(render_content_arr.join('\n'));
}

function choose_word(i, word) {
    let render_content_arr = [];
    render_content_arr.push('<li class="list-group-item chosen-word-list" data-word="' + word.replace('"','\\"') + '" data-wordPos=' + i.toString() + '>');
    render_content_arr.push('<div class="row">');
	render_content_arr.push('<div class="input-group input-group-sm col-sm-4">');
	render_content_arr.push('<div class="input-group-prepend">');
	render_content_arr.push('<span class="input-group-text">' + word + '</span>');
	render_content_arr.push('<span class="input-group-text">中文</span>');
    render_content_arr.push('</div>');
	render_content_arr.push('<input type="text" class="form-control translation-input">');
    render_content_arr.push('</div>');
	render_content_arr.push('<div class="input-group input-group-sm col-sm-4">');
	render_content_arr.push('<div class="input-group-prepend">');
	render_content_arr.push('<span class="input-group-text">' + word + '</span>');
	render_content_arr.push('<span class="input-group-text">索引</span>');
    render_content_arr.push('</div>');
	render_content_arr.push('<input type="text" class="form-control index-input">');
    render_content_arr.push('</div>');
    render_content_arr.push('<button type="button" class="btn btn-outline-danger btn-sm" onclick="cancel_chosen_word(this)">X</button>');
    render_content_arr.push('</div>');
    render_content_arr.push('</li>');
    $('#problem_ul').append(render_content_arr.join('\n'));
}

function cancel_chosen_word(this_elem) {
    $(this_elem.parentNode.parentNode).remove();
}

function construct_problem() {
    if ($("#problem-text-div").attr("data-text") === undefined) {
        alert("No problem text ensure");
        return;
    }
    if ($("li.chosen-word-list").length === 0) {
        alert("No word chosen");
        return;
    }
    let no_translation_word = [];
    for (let word_elem of $("li.chosen-word-list")) {
        if ($(word_elem).find("input.translation-input").val().length === 0) {
            no_translation_word.push($(word_elem).attr('data-word'));
        }
    }

    if (no_translation_word.length > 0) {
        let alert_msg = "Some chosen words have no translation: ";
        alert_msg = alert_msg + no_translation_word.join(", ");
        alert(alert_msg);
        return;
    }

    $("#construct-modal").modal("show");

}

function submit_problem(submit_info) {
    let ajax_url = window.location.protocol + "//" + window.location.host + "/submit_problem";
    let ajax_data = submit_info;
    let now_time = new Date();
    ajax_data.add_date = now_time;
    ajax_data.modify_date = now_time;
    ajax_data.answer_times = [];
    ajax_data.look_times = [];

    for (let i=0 ; i<submit_info.word_pos.length ; i++) {
        ajax_data.answer_times.push(0);
        ajax_data.look_times.push(0);
    }

    $.ajax({
        url: ajax_url,
        type: 'post',
        data: JSON.stringify(ajax_data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function(xhr) {
            console.log(xhr.status);
            console.log(xhr.statusText);
        },
        success: function(response) {
            if (response.success) {
                alert("Submit problem success");
            } else {
                alert("Submit problem fail: "+response.reason);
            }
            $('#submit_prob_btn').off("click","**");
        },
    });
    close_construct_modal();
}

$("#construct-modal").on("show.bs.modal", function (e) {
    let problem_text = $("#problem-text-div").attr("data-text");
    let url = $("#url-input").val();
    let chosen_word_list = [];
    let word_pos_list = [];
    let chinese_trans_list = [];
    let index_word_list = [];

    for (let word_elem of $("li.chosen-word-list")) {
        chosen_word_list.push($(word_elem).attr('data-word'));
        word_pos_list.push($(word_elem).attr('data-wordPos'));
        chinese_trans_list.push($(word_elem).find("input.translation-input").val());
        if ($(word_elem).find("input.index-input").val().length === 0) {
            index_word_list.push($(word_elem).attr('data-word'));
        } else {
            index_word_list.push($(word_elem).find("input.index-input").val());
        }
    }

    let submit_info = {
        text: problem_text,
        url: url,
        word_pos: word_pos_list,
        chinese_trans: chinese_trans_list,
        index_word: index_word_list,
    }

    let render_content_arr = [];
    render_content_arr.push('<form>');
    render_content_arr.push('<div class="form-group row">');
    render_content_arr.push('<label for="staticEmail" class="col-sm-3 col-form-label">URL</label>');
    render_content_arr.push('<div class="col-sm-9">');
    render_content_arr.push('<input type="text" readonly class="form-control-plaintext" id="staticEmail" value="' + url.replace('"','\\"') + '">');
    render_content_arr.push('</div>');
    render_content_arr.push('</div>');

    render_content_arr.push('<div class="form-group row">');
    render_content_arr.push('<label for="staticEmail" class="col-sm-3 col-form-label">Chosen_Word</label>');
    render_content_arr.push('<div class="col-sm-9">');
    render_content_arr.push('<input type="text" readonly class="form-control-plaintext" id="staticEmail" value="' + chosen_word_list.join(";  ") + '">');
    render_content_arr.push('</div>');
    render_content_arr.push('</div>');

    render_content_arr.push('<div class="form-group row">');
    render_content_arr.push('<label for="staticEmail" class="col-sm-3 col-form-label">Word_Pos</label>');
    render_content_arr.push('<div class="col-sm-9">');
    render_content_arr.push('<input type="text" readonly class="form-control-plaintext" id="staticEmail" value="' + word_pos_list.join(";  ") + '">');
    render_content_arr.push('</div>');
    render_content_arr.push('</div>');

    render_content_arr.push('<div class="form-group row">');
    render_content_arr.push('<label for="staticEmail" class="col-sm-3 col-form-label">Translation</label>');
    render_content_arr.push('<div class="col-sm-9">');
    render_content_arr.push('<input type="text" readonly class="form-control-plaintext" id="staticEmail" value="' + chinese_trans_list.join(";  ") + '">');
    render_content_arr.push('</div>');
    render_content_arr.push('</div>');

    render_content_arr.push('<div class="form-group row">');
    render_content_arr.push('<label for="staticEmail" class="col-sm-3 col-form-label">Index</label>');
    render_content_arr.push('<div class="col-sm-9">');
    render_content_arr.push('<input type="text" readonly class="form-control-plaintext" id="staticEmail" value="' + index_word_list.join(";  ") + '">');
    render_content_arr.push('</div>');
    render_content_arr.push('</div>');

    render_content_arr.push('</form>');

    let modal = $(this);
    modal.find(".modal-body").append(render_content_arr.join('\n'));

    modal.find("#submit_prob_btn").on('click',function() {submit_problem(submit_info);});
});

function close_construct_modal() {
    $("#construct-modal").find("#submit_prob_btn").off('click');
    let modal_body_form = $("#construct-modal").find(".modal-body > form");
    modal_body_form.remove();
}

function htmldecode(s){
	var div = document.createElement('div');
	div.innerHTML = s;
	return div.innerText || div.textContent;
}
function htmlencode(s){
	var temp = document.createElement("div");
	(temp.textContent != null) ? (temp.textContent = s) : (temp.innerText = s);
	var output = temp.innerHTML;
	temp = null;
	return output;
}
