function create_graphgen(main){
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
    data_graph.labels.push(alignment.sequence_2.ID);
    data_graph.datasets[0].data.push(alignment.stat.score);
    data_graph.datasets[1].data.push(alignment.stat.e_value);
    data_graph.datasets[2].data.push(alignment.stat.pGaps);
    data_graph.datasets[3].data.push(alignment.stat.pIdentities);
  }
  return data_graph;
}

function createDropdownMenu(alignements){ //A changer : prendre l'object de résultat en argument // Parser avant
    console.log(main.current_user.current_project.resultat)
    const alignments = main.current_user.current_project.resultat.alignments;
    console.log(alignments);
    for (let i = 0; i < Object.keys(alignments).length; i ++) {//(let alignment of alignments){
      let key = Object.keys(alignments)[i];
      let fct = 'createGraphPage(\'' + key + '\')';
      let button = document.createElement('a');
      button.setAttribute('onclick', fct);
      button.textContent = alignments[key].sequence_Q.ID + ' - ' + alignments[key].sequence_2.ID.substring(0,23);
      let div = document.getElementById('bouton_deroulant');
      div.appendChild(button);
  }
};

function createGraphPage(num_alignment){

  const align = main.current_user.current_project.resultat.alignments[num_alignment];
  
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

  document.getElementById("graph_length").style.display =  'flex';
  document.getElementById("graph_identities").style.display =  'flex';
  document.getElementById("graph_gap").style.display =  'flex';
}

function crea_dataAlign(align) {
  let data = [];

  let data_graphLength = {
    labels : ['Query', 'Alignement'],
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
  data_graphIdent.datasets[0].data.push(align.sequence_2.pIdentities);
  data_graphIdent.datasets[0].data.push(100 - align.sequence_2.pIdentities);
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
  data_graphGap.datasets[0].data.push(align.sequence_2.pGaps);
  data_graphGap.datasets[0].data.push(100 - align.sequence_2.pGaps);
  data.push(data_graphGap);

  return data;
}

/*const query_length = document.getElementById("query_length").getContext("2d");
const pourcent_identity = document.getElementById("pourcent_identity").getContext("2d");
const query_cover = document.getElementById("query_cover").getContext("2d");
const total_score = document.getElementById("total_score").getContext("2d");
const e_value = document.getElementById("e_value").getContext("2d");



let Chart1= new Chart(query_length, {
  type : 'bar',
  data : {
    labels: [
      'Ref',
      '1',
      '2',
      '3', 
    ],
  datasets: [{
        label: 'Length',
        data: [356, 139189, 4903, 195],
    }]
  }
  }
);

let Chart2= new Chart(query_cover, {
  type : 'bar',
  data : {
    labels: [
      'Ref',
      '1',
      '2',
      '3', 
    ],
  datasets: [{
        label: 'Query-cover',
        data: [356, 139189, 4903, 195],
    }]
  }
  }
);
  
let Chart3= new Chart(total_score, {
  type : 'bar',
  data : {
    labels: [
      'Ref',
      '1',
      '2',
      '3', 
    ],
  datasets: [{
        label: 'Length',
        data: [356, 139189, 4903, 195],
    }]
  }
  }
);

let Chart4= new Chart(e_value, {
  type : 'bar',
  data : {
    labels: [
      'Ref',
      '1',
      '2',
      '3', 
    ],
  datasets: [{
        label: 'Length',
        data: [356, 139189, 4903, 195],
    }]
  }
  }
);
  
let Chart5= new Chart(pourcent_identity, {
  type : 'bar',
  data : {
    labels: [
      'Ref',
      '1',
      '2',
      '3', 
    ],
  datasets: [{
        label: 'Length',
        data: [356, 139189, 4903, 195],
    }]
  }
  }
); */