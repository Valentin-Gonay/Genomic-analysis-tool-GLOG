document.getElementById('menu_input').addEventListener('click',function() {
  document.getElementById("input_window").style.display =  'flex';
  document.getElementById("sequence_window").style.display =  'none';
  document.getElementById("graph_window").style.display =  'none';

  document.getElementById("start_bot").className = "animation start-input";
});

document.getElementById('menu_sequence').addEventListener('click',function() {
  document.getElementById("input_window").style.display =  'none';
  document.getElementById("sequence_window").style.display =  'flex';
  document.getElementById("graph_window").style.display =  'none';

  document.getElementById("start_bot").className = "animation start-sequence";
});

document.getElementById('menu_graph').addEventListener('click',function() {
  createDropdownMenu();

  document.getElementById("input_window").style.display =  'none';
  document.getElementById("sequence_window").style.display =  'none';
  document.getElementById("graph_window").style.display =  'flex';

  document.getElementById("start_bot").className = "animation start-graph";
});

/*document.getElementById('btn_run').addEventListener('click',function() { } )*/