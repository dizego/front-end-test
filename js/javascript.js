"use strict";

var json = new XMLHttpRequest();
var table = {};
var header_names = [];
var row = '';
var x = 1;
var thead = '';
var tbody = '';
function post (search = false) {
	thead = document.getElementById("thead");
	tbody = document.getElementById("tbody");
	json.open( "GET", "https://jsonplaceholder.typicode.com/posts", false );
	json.send( null );
	table = JSON.parse(json.responseText);
	header_names = Object.keys(table[0]);
	header_names.forEach(function (value, index) {
		var th = document.createElement("th");
		var text = document.createTextNode(value.toUpperCase());
		th.appendChild(text);
		thead.appendChild(th);
	});
	x = 1;
	for ( var obj in table ) {
		var ok = (!search)? true : false;
		row = document.createElement("tr");
		for ( var index in table[obj] ) {
			var temp = table[obj][index]+"";
			if ( search && temp.indexOf(search) > -1 && checklist.indexOf(index) > -1) ok = true;
			var td = document.createElement("td");
			var text = document.createTextNode(table[obj][index]);
			td.appendChild(text);
			row.appendChild(td);
		}
		if ( ok || !search ) {
			if ( x % 2 == 0) row.setAttribute("class", "even");
			else row.setAttribute("class", "odd");
			tbody.appendChild(row);
			x++;
		}
	}
	var total = tbody.children.length;
	document.getElementById("total").innerHTML = total;
	if ( total == 0 ) {
		var msg = document.createTextNode("Nenhum registro encontrado!");
		var td = document.createElement("td");
		td.setAttribute("colspan", thead.children.length);
		td.setAttribute("style", "text-align:center");
		td.appendChild(msg);
		tbody.appendChild(td);
	}
}
post();

function search() {
	document.getElementById("thead").innerHTML = '';
	document.getElementById("tbody").innerHTML = '';
	var value = document.getElementById("search").value;
	if ( value.length > 0) post(value);
	else if (value.length == 0 ) post();
}
document.getElementById("search").addEventListener("keydown", function () {
	var x = event.keyCode;
	if ( x == 13 ) search();
});
document.getElementById("search").addEventListener("focus", function () {
	document.getElementById("search_opts").classList.remove("hidden");
	document.getElementById("search_box").classList.add("streched");
	document.getElementById("show_opts").classList.remove("fa-chevron-down");
	document.getElementById("show_opts").classList.add("fa-chevron-up");
});
document.getElementById("show_opts").addEventListener("click", function () {
	var chevron = document.getElementById("show_opts");
	chevron.classList.toggle("fa-chevron-down");
	chevron.classList.toggle("fa-chevron-up");
	var toggle = chevron.classList.contains("fa-chevron-up");
	if(toggle) {
		document.getElementById("search_opts").classList.remove("hidden");
		document.getElementById("search_box").classList.add("streched");
	}
	else {
		document.getElementById("search_opts").classList.add("hidden");
		document.getElementById("search_box").classList.remove("streched");
	}
});
document.getElementById("bt_search").addEventListener("click", function () {
	search();
});

var checklist = [1,'userId','id','title','body'];
	
function check(type) {
	switch ( type ) {
		case 'all':
			if ( document.getElementById("all").checked ) {
				document.getElementById("userId").checked = true;
				document.getElementById("id").checked = true;
				document.getElementById("title").checked = true;
				document.getElementById("body").checked = true;
				checklist = [1,'userId','id','title','body'];
			}
			else {
				document.getElementById("userId").checked = false;
				document.getElementById("id").checked = false;
				document.getElementById("title").checked = false;
				document.getElementById("body").checked = false;
				checklist = [0,0,0,0,0];
			}
			break;
		case 'userId':
			if ( document.getElementById("userId").checked ) checklist[1] = 'userId';
			else checklist[1] = 0;
			break;
		case 'id':
			if ( document.getElementById("id").checked ) checklist[2] = 'id';
			else checklist[2] = 0;
			break;
		case 'title':
			if ( document.getElementById("title").checked ) checklist[3] = 'title';
			else checklist[3] = 0;
			break;
		case 'body':
			if ( document.getElementById("body").checked ) checklist[4] = 'body';
			else checklist[4] = 0;
			break;
	}
	if ( checklist == [0,'userId','id','title','body'] ) {
		document.getElementById("all").checked = true;
		checklist[0] = 1;
	}
	else if ( checklist[0] == 0 ) {
		document.getElementById("all").checked = false;
		checklist[0] = 0;
	}
}
	
document.getElementById("all").addEventListener("change", function () { check('all'); });
document.getElementById("userId").addEventListener("change", function () { check('userId'); });
document.getElementById("id").addEventListener("change", function () { check('id'); });
document.getElementById("title").addEventListener("change", function () { check('title'); });
document.getElementById("body").addEventListener("change", function () { check('body'); });