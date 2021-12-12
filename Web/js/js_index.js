document.getElementById('menu_input').addEventListener('click',function() {
  document.getElementById("input_window").style.display =  'flex';
  document.getElementById("sequence_window").style.display =  'none';
  document.getElementById("graph_window").style.display =  'none';

  document.getElementById("start_bot").className = "animation start-input";
});


async function fetchsynch(url) {
  const res = await (fetch(url));
  const data = await (res.text());
  return data;
}