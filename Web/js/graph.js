/*  
    12/12/2021

    Quentin CAPUZET
    Loïc PERON
    Valentin GONAY
    Gregory BORDIER
    Thomas BAUDEAU
    Elie BORDRON

    JS file for graph computation and display

    version 1.0.0 
    
*/


function createDropdownMenu(alignements){ //A changer : prendre l'object de résultat en argument // Parser avant
  const alignments = main.current_user.current_project.resultat.alignments;
  let div = document.getElementById('bouton_deroulant');
  let gen = document.createElement('a');
  gen.setAttribute('onclick','create_graphgen(main)');
  gen.textContent = 'General';
  div.appendChild(gen);
  for (let i = 0; i < Object.keys(alignments).length; i ++) {//(let alignment of alignments){
    let key = Object.keys(alignments)[i];
    let fct = 'createGraphPage(\'' + key + '\')';
    let button = document.createElement('a');
    button.setAttribute('onclick', fct);
    button.textContent = alignments[key].sequence_Q.ID.substring(1,24) + ' - ' + alignments[key].sequence_2.ID.substring(1,24);
    div = document.getElementById('bouton_deroulant');
    div.appendChild(button);
  }
};


function create_graphgen(main){

  document.getElementById("div_graph").style.display =  'block';
  document.getElementById("graph_length").style.display =  'none';
  document.getElementById("graph_identities").style.display =  'none';
  document.getElementById("graph_gap").style.display =  'none';
  document.getElementById("div_graphInfos").style.display =  'none';
  if (document.getElementById("but_graph_length")) {
    document.getElementById("but_graph_length").style.display =  'none';
    document.getElementById("but_graph_identities").style.display =  'none';
    document.getElementById("but_graph_gap").style.display =  'none';
  }

  create_button("div_graph", "graph", "graph_general.png");
  document.getElementById("graph").remove();
  document.getElementById("div_graph").appendChild(createcanvas('graph'));
  const graph = document.getElementById("graph").getContext("2d");

  let data_graph1 = crea_graph1(main);

  var config_graph1 = {
    type: 'bar',
    data: data_graph1,
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Statistiques générales'
      },
      scales:{
        x:{
          ticks: {
            color:'#FFFFFF',
          },
          grid: {
            color:'#FFFFFF',
          }
        },
        y:{
          ticks: {
            color:'#FFFFFF',
          },
          grid:{
            color:'#FFFFFF',
          }
        },
      },
    }
  };
  
  let graph1 = new Chart(graph,config_graph1);

  document.getElementById("graph").style.display =  'flex';
}

const crea_graph1 = (main) => {
  const alignments = main.current_user.current_project.resultat.alignments;
  let data_graph = {
    labels : [],
    datasets : [
      {
        label : 'SCORE',
        data : [],
        backgroundColor :['#70ADE780'],
      },
      {
        label : 'E-VALUE',
        data : [],
        backgroundColor :['#FF573380'],
      },
      {
        label : '%GAPS',
        data : [],
        backgroundColor :['#61c2cc80'],
      },
      {
        label : '%IDENTITIES',
        data : [],
        backgroundColor :['#b4e98b80'],
      }
    ]
  }

  for (let alignment of alignments){
    data_graph.labels.push(alignment.sequence_2.ID.substring(1,24));
    data_graph.datasets[0].data.push(alignment.stat.score);
    data_graph.datasets[1].data.push(alignment.stat.e_value);
    data_graph.datasets[2].data.push(alignment.stat.pGaps);
    data_graph.datasets[3].data.push(alignment.stat.pIdentities);
  }
  return data_graph;
}

function createGraphPage(num_alignment){

  const align = main.current_user.current_project.resultat.alignments[num_alignment];
  
  clean_child_list("div_graphLength");
  clean_child_list("div_graphIdentities");
  clean_child_list("div_graphGap");
  document.getElementById("div_graphLength").appendChild(createcanvas('graph_length'));
  document.getElementById("div_graphIdentities").appendChild(createcanvas("graph_identities"));
  document.getElementById("div_graphGap").appendChild(createcanvas("graph_gap"));
  const graph_length = document.getElementById("graph_length").getContext("2d");
  const graph_identities = document.getElementById("graph_identities").getContext("2d");
  const graph_gap = document.getElementById("graph_gap").getContext("2d");

  let data_graphs = crea_dataAlign(align);

  var config_graphLength = {
    type: 'bar',
    data: data_graphs[0],
    options : {
      scales:{
        x:{
          ticks: {
            color:'#FFFFFF',
          },
          grid: {
            color:'#FFFFFF',
          }
        },
        y:{
          ticks: {
            color:'#FFFFFF',
          },
          grid:{
            color:'#FFFFFF',
          }
        },
      },
      title: {
        display: true,
        text: 'Bar Chart Sequence Length'
      }
    }
  };

  var config_graphIdent = {
    type: 'pie',
    data: data_graphs[1],
    options : {
      title: {
        display: true,
        text: 'Pie Chart Identities'
      }
    }
  };

  var config_graphGap = {
    type: 'pie',
    data: data_graphs[2],
    options : {
      title: {
        display: true,
        text: 'Pie Chart Gaps'
      }
    }
  };
  
  let graph_L = new Chart(graph_length, config_graphLength);
  let graph_I = new Chart(graph_identities, config_graphIdent);
  let graph_G = new Chart(graph_gap, config_graphGap);

  clean_child_list("div_graphInfos");
  create_card(align);
  
  create_button("div_graphLength", "graph_length", "graph_length.png");
  create_button("div_graphGap", "graph_gap", "graph_gaps.png");
  create_button("div_graphIdentities", "graph_identities", "graph_identities.png");

  document.getElementById("div_graph").style.display =  'none';
  document.getElementById("graph_length").style.display =  'block';
  document.getElementById("graph_identities").style.display =  'block';
  document.getElementById("graph_gap").style.display =  'block';
  document.getElementById("but_graph_length").style.display =  'flex';
  document.getElementById("but_graph_identities").style.display =  'flex';
  document.getElementById("but_graph_gap").style.display =  'flex';
  document.getElementById("div_graphInfos").style.display =  'block';
}

function crea_dataAlign(align) {
  let data = [];

  let data_graphLength = {
    labels : ['Query', 'Reference'],
    datasets : [
      {
        label : 'LENGTH',
        data : [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          '#814cfb80',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          '#814cfb',
        ],
        borderWidth: 1
      }
    ]
  }
  data_graphLength.datasets[0].data.push(align.sequence_Q.length);
  data_graphLength.datasets[0].data.push(align.sequence_2.length);
  data.push(data_graphLength);

  let data_graphIdent = {
    labels : ['% Identities','% Difference'],
    datasets : [
      {
        label : '% Identities',
        data : [],
        backgroundColor:['#b4e98b80','#ffffff00'],
      }
    ]
  }
  data_graphIdent.datasets[0].data.push(align.stat.pIdentities);
  data_graphIdent.datasets[0].data.push(100 - Number(align.stat.pIdentities));
  data.push(data_graphIdent);

  let data_graphGap = {
    labels : ['% Gaps',''],
    datasets : [
      {
        label : '% Gap',
        data : [],
        backgroundColor:['#61c2cc80','#ffffff00'],
      }
    ]
  }
  data_graphGap.datasets[0].data.push(align.stat.pGaps);
  data_graphGap.datasets[0].data.push(100 - Number(align.stat.pGaps));
  data.push(data_graphGap);

  return data;
}

function create_card(align) {

  let division = document.getElementById("div_graphInfos");
  let title = document.createElement("h1");
  title.textContent = "  Alignement";
  division.appendChild(title);

  let liste1 = document.createElement('ul');
  let id_ref = document.createElement('li');
  id_ref.textContent = "ID reference : " + align.sequence_2.ID.substring(1,24);
  let id_qur = document.createElement('li');
  id_qur.textContent = "ID query : " + align.sequence_Q.ID.substring(1,24);

  liste1.appendChild(id_ref);
  liste1.appendChild(id_qur);
  division.appendChild(liste1);

  let liste2 = document.createElement('ul');
  let score = document.createElement('li');
  score.textContent = "Score : " + align.stat.score;
  let e_val = document.createElement('li');
  e_val.textContent = "E_value : " + align.stat.e_value;
  let identities = document.createElement('li');
  identities.textContent = "Identities : " + align.stat.identities + ' (' + align.stat.pIdentities + '%)';
  let gaps = document.createElement('li');
  gaps.textContent = "Gaps : " + align.stat.gaps + ' (' + align.stat.pGaps + '%)';
  liste2.appendChild(score);
  liste2.appendChild(e_val);
  liste2.appendChild(identities);
  liste2.appendChild(gaps);
  division.appendChild(liste2);
}

function createcanvas(id){
  var canv = document.createElement("CANVAS")
  canv.setAttribute('id',id)
  canv.setAttribute('style','display: none')
  return canv
}

function download(canvas, filename) {
  var lnk = document.createElement('a'), e;
  let canva = document.getElementById(canvas);
  lnk.download = filename;
  lnk.href = canva.toDataURL("image/png;base64");
  if (document.createEvent) {
    e = document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, true, window,
                     0, 0, 0, 0, 0, false, false, false,
                     false, 0, null);
    lnk.dispatchEvent(e);
  } else if (lnk.fireEvent) {
    lnk.fireEvent("onclick");
  }
}

function create_button(div, canvas, filename){
  canvas = '"' + canvas + '"';
  filename = '"' + filename + '"';
  let division = document.getElementById(div);
  let fct = "download(" + canvas + ',' + filename + ')'
  let but = document.createElement('button');
  but.textContent = 'Download ' + filename;
  but.setAttribute('id','but_' + canvas.substring(1,canvas.length-1))
  but.setAttribute('onclick',fct);
  division.appendChild(but);
}