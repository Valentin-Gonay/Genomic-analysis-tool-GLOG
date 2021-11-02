const graph = document.getElementById("graph").getContext("2d");
  
let myChart= new Chart(graph, {
  type : 'bar',
  data : {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June', 
    ],
  datasets: [{
        label: 'My First dataset',
        data: [0, 10, 5, 2, 20, 30, 45],
    }]
  }
  }
);
