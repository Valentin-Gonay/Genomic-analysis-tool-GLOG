const graph = document.getElementById("graph").getContext("2d");

var data = {
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
};

var config = {
  type: 'bar',
  data: data,
  /*options: {
    responsive: true,
      title: {
        display: true,
        text: 'Test'
      }
  }*/
};

let graph1 = new Chart(graph,config);




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