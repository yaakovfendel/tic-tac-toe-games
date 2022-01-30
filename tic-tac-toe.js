let body = document.getElementById("body");
let bord = document.getElementById("bord");
let arryid = [];
let first_player = "o";
let second_player = "x";

let counter_first_player = 0;
let counter_second_player = 0;
let choice = 3; // Number(prompt("enter num")) || 3;
let hi_scores = choice * choice;
let played_moves = 0;
let counter = 0;
let i = 0;
let j = 0;
let y = 0;
let temp = 0;
let count_x_o = 1;
let counter_choice = 0;
//**************************
//LEVEV 01: BORD OF THE GAME
//**************************
let play_a = document.createElement("div");
body.appendChild(play_a);
play_a.innerHTML = "x turn";
while (i < choice) {
  let cell = document.createElement("div");
  cell.addEventListener("click", clic_cell);
  cell.className = `container`;
  cell.id = `row${i}`;
  body.appendChild(cell);
  while (j < choice) {
    let cell_data = document.createElement("div");
    cell_data.id = temp;
    cell_data.className = `container cell_data`;
    cell.appendChild(cell_data);
    cell_data.innerHTML = "";
    arryid.push(cell_data);
    temp++;
    j++;
  }
  j = 0;
  i++;
}
//**********************
//LEVEV 02: MAIN FUNCTION
//**********************
function start(params) {
  arryid.forEach((e) => (e.innerHTML = ""));
  played_moves = 0;
  play_a.innerHTML = "x turn";
  counter = 0;
  count_x_o = 1;
  counter_choice = 0;
  stop_timmer();
}
function clic_cell(e) {
  if (
    arryid[e.target.id].innerHTML != first_player &&
    arryid[e.target.id].innerHTML != second_player
  ) {
    save_move([e.target.id]);
    played_moves % 2 == 0
      ? ((arryid[e.target.id].innerHTML = second_player),
        (play_a.innerHTML = "o turn"))
      : ((arryid[e.target.id].innerHTML = first_player),
        (play_a.innerHTML = "x turn"));
    played_moves++;
    make_arry_of_all_options(arryid);
    if (played_moves == 1) {
      let flag = 0;
      if (flag < 1) {
        flag++;
        time();
      }
    }
    if (played_moves == choice * choice) {
      game_over("no");
    }
  }
}

//**********************
//LEVEV 02: SIDE FUNCTION
//**********************

//***********
// SAVE GAME:
//***********
let arry_save = [];
function save_game(params) {
  arry_save = [];
  arryid.forEach((e) => arry_save.push(e.innerHTML));
  localStorage.save = JSON.stringify(arry_save);
  localStorage.moves = JSON.stringify(played_moves);
  localStorage.choice = JSON.stringify(choice);
  localStorage.count_x_o = JSON.stringify(count_x_o);
  localStorage.counter_choice = JSON.stringify(counter_choice);
  localStorage.save_move = JSON.stringify(save_move_arry);
  localStorage.turn = JSON.stringify(play_a.innerHTML);
}
let save_move_arry = [];
function save_move(p) {
  save_move_arry.push(p);
}
//*****************
// LOAD SAVED GAME:
//*****************
function load_game(params) {
  if (choice == localStorage.choice) {
    if (localStorage.save) {
      let count_x_o_ = localStorage.count_x_o;
      count_x_o = JSON.parse(count_x_o_);
      let counter_choice_ = localStorage.counter_choice;
      counter_choice = JSON.parse(counter_choice_);
      let c = localStorage.save;
      let save_parsed = JSON.parse(c);
      arry_save = save_parsed;
      let m = localStorage.moves;
      played_moves = JSON.parse(m);
      let s = localStorage.save_move;
      save_move_arry = JSON.parse(s);
      let t = localStorage.turn;
      play_a.innerHTML = JSON.parse(t);
      arryid.forEach((e) => (e.innerHTML = arry_save.shift()));
    }
  }
}

//***********
// UNDO TURN:
//***********
function undo(p) {
  let last_move = save_move_arry.pop();
  arryid[last_move].innerHTML = "";
  played_moves--;
  played_moves % 2 == 0
    ? (play_a.innerHTML = "x turn")
    : (play_a.innerHTML = "o turn");
}
//***********
// HI-SCORE:
//***********
function hi_score(s) {
  if (hi_scores > s) {
    hi_scores = s;
  }
}
function hi_sco(params) {
  alert(hi_scores);
}

//***********
// GAME-OVER:
//***********
function game_over(winner) {
  stop_timmer();
  console.log(`${winner} winner`);
  hi_score(played_moves);
  setTimeout(() => {
    if (confirm("do you want to start a new game")) {
      start();
    }
  }, 0.001);
}

//********
// TIMMER:
//********
let timmer;
let timer = document.createElement("div");
let minutes = document.createElement("span");
let seconds = document.createElement("span");
body.appendChild(timer);
timer.appendChild(minutes);
timer.appendChild(seconds);
minutes.className = `time`;
minutes.id = `minutes`;
seconds.className = `time`;
seconds.id = `seconds`;
function time(params) {
  let sec = 0;
  function pad(val) {
    return val > 9 ? val : "0" + val;
  }
  timmer = setInterval(function () {
    document.getElementById("seconds").innerHTML = pad(++sec % 60);
    document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10));
  }, 1000);
}

function stop_timmer(params) {
  clearInterval(timmer);
  document.getElementById("seconds").innerHTML = 00;
  document.getElementById("minutes").innerHTML = 00;
}
//**************************
// CHEK IF THIER IS A WINNER
//**************************

function make_arry_of_all_options(temparr) {
  let arr = [];
  let ii = 0;
  let k = 0;
  temparr.forEach((v) => arr.push(v.innerHTML));
  while (k < choice) {
    ii = k;
    k++;
    for (; ii < temparr.length; ii = ii + choice) {
      arr.push(temparr[ii].innerHTML);
    }
  }

  for (ii = 0; ii < temparr.length; ii = ii + choice + 1) {
    arr.push(temparr[ii].innerHTML);
  }
  for (ii = choice - 1; ii < temparr.length - 1; ii = ii + choice - 1) {
    arr.push(temparr[ii].innerHTML);
  }
  chek_win(arr);
}

function chek_win(arry_all) {
  let temp = true;

  for (i of arry_all) {
    counter_choice++;
    if (temp == i) {
      count_x_o++;
      if (count_x_o == choice) {
        temp == first_player
          ? game_over(first_player)
          : game_over(second_player);
      } else if (counter_choice % choice == 0) {
        count_x_o = 1;
      }
    } else if (counter_choice % choice == 0) {
      count_x_o = 1;
      temp = true;
    } else {
      count_x_o = 1;
      i == first_player || i == second_player ? (temp = i) : (temp = true);
    }
  }
}

//***************
// CREAT BUTTONS:
//**************

let start_btn = document.createElement("button");
start_btn.className = `button`;
start_btn.id = `new_game`;
start_btn.innerHTML = "new_game";
bord.appendChild(start_btn);
start_btn.type = "button";
start_btn.onclick = start;
let undo_btn = document.createElement("button");
undo_btn.className = `button`;
undo_btn.id = `undo`;
undo_btn.innerHTML = "undo";
bord.appendChild(undo_btn);
undo_btn.type = "button";
undo_btn.onclick = undo;
let save_game_btn = document.createElement("button");
save_game_btn.className = `button`;
save_game_btn.id = `save_game`;
save_game_btn.innerHTML = "save_game";
bord.appendChild(save_game_btn);
save_game_btn.type = "button";
save_game_btn.onclick = save_game;
let load_game_btn = document.createElement("button");
load_game_btn.className = `button`;
load_game_btn.id = `load-game`;
load_game_btn.innerHTML = "load-game";
bord.appendChild(load_game_btn);
load_game_btn.type = "button";
load_game_btn.onclick = load_game;
let hi_score_btn = document.createElement("button");
hi_score_btn.className = `button`;
hi_score_btn.id = `hi_score`;
hi_score_btn.innerHTML = "hi_score";
bord.appendChild(hi_score_btn);
hi_score_btn.type = "button";
hi_score_btn.onclick = hi_sco;
