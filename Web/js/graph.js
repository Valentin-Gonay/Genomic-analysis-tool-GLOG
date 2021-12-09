function create_graphgen(class_resu){
  console.info(class_resu);
  const graph = document.getElementById("graph").getContext("2d");

  let data_graph1 = crea_graph1(class_resu);

  var config_graph1 = {
    type: 'bar',
    data: data_graph1,
    /*options: {
      responsive: true,
        title: {
          display: true,
          text: 'Test'
        }
    }*/
  };
  
  let graph1 = new Chart(graph,config_graph1);

  document.getElementById("graph").style.display =  'flex';
}

const crea_graph1 = (class_resu) => {

  let data_graph = {
    labels : [],
    datasets : [
      {
        label : 'SCORE',
        data : []
      },
      {
        label : 'E-VALUE',
        data : []
      },
      {
        label : '%GAPS',
        data : []
      },
      {
        label : '%IDENTITIES',
        data : []
      }
    ]
  }

  //data_graph.labels.push(class_resu.query.title);       FAIRE AFFICHER QUERY QUELQUE PART !!!
  
  for (let alignement in class_resu.align){

    data_graph.labels.push(class_resu.align[alignement].title);
    
    data_graph.datasets[0].data.push(class_resu.align[alignement].score);
    data_graph.datasets[1].data.push(class_resu.align[alignement].e_value);
    data_graph.datasets[2].data.push(class_resu.align[alignement].pGaps);
    data_graph.datasets[3].data.push(class_resu.align[alignement].pIdentities);
  }

  console.log(data_graph);
  return data_graph;
}

/*var data = {
  labels : ['Data1', 'Data2', 'Data3', 'Data4'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [356, 139, 490, 195],
      //borderColor: Utils.CHART_COLORS.red,
      //backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
    },
    {
      label: 'Dataset 2',
      data: [36, 39, 49, 19],
      //borderColor: Utils.CHART_COLORS.blue,
      //backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
    }
  ]
};*/

async function fetchsynch(url) {
  const res = await(fetch(url));
  const data = await(res.text());
  return data;
}

async function createDropdownMenu(main){ //A changer : prendre l'object de résultat en argument // Parser avant

    const alignments = main.current_user.current_project.resultat.alignments;
    console.log(alignments);
    for (let i = 0; i < alignments.length; i++){
      console.log(1);
      let fct = 'createGraphPage(\'' + alignment[i] + '\')';
      let button = document.createElement('a');
      button.setAttribute('onclick', fct);
      button.textContent = alignment[i].sequence_Q.ID + ' - ' + alignment[i].sequence_2.ID.substring(0,23);
      let div = document.getElementById('bouton_deroulant');
      div.appendChild(button);
    
  }
  

  
};

function createGraphPage(alignement){
    console.info(object.align[alignement]);

    const graph_length = document.getElementById("graph_length").getContext("2d");
    const graph_identities = document.getElementById("graph_identities").getContext("2d");
    const graph_gap = document.getElementById("graph_gap").getContext("2d");

    let data_graphs = crea_dataAlign(object.align[alignement], object);

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
    
    let graph_L = new Chart(graph_length,config_graphLength);
    let graph_I = new Chart(graph_identities,config_graphIdent);
    let graph_G = new Chart(graph_gap,config_graphGap);

    document.getElementById("graph_length").style.display =  'flex';
    document.getElementById("graph_identities").style.display =  'flex';
    document.getElementById("graph_gap").style.display =  'flex';
}

function crea_dataAlign(alignement, object) {
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
  data_graphLength.datasets[0].data.push(object.query.length);
  data_graphLength.datasets[0].data.push(alignement.length);
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
  data_graphIdent.datasets[0].data.push(alignement.pIdentities);
  data_graphIdent.datasets[0].data.push(100 - alignement.pIdentities);
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
  data_graphGap.datasets[0].data.push(alignement.pGaps);
  data_graphGap.datasets[0].data.push(100 - alignement.pGaps);
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