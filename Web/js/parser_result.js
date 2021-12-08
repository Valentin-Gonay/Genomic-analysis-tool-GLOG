function parser_res(text) {

  let tab = text.split('\n');
  let count = 0;
  let temp = '';
  let alignements = {};
  let query

  let alignement_window = document.getElementById('sequence_window_text'); 

  for (let i = 0; i < tab.length; i++){

    query = query_parsing(tab[i])

    let res = alignments_parsing(tab[i],tab[i+1],tab[i+2],tab[i+3],count,alignements,temp)
    temp = res[0];
    alignements = res[1];
    count = res[2];
  }

  const resu = new Resu(query, alignements);
  console.log(resu);

  //ajout au html
  alignement_window.innerHTML= resu.align.alignement_2.seq.toString().replaceAll(',','<br>');

  return resu;
}

function coloring(query_line,pipe_line,sequence_line){
    var cure = 0;
    var pos = 0;
    while(pipe_line.indexOf('*',cure) != -1){
        let position = pipe_line.indexOf('*',cure);
        if ( cure !=0 ){
            pos = pos + 40
        }
 
        cure = position + 1;
        let ok = pos + position;
        let regex = "(?<=.{"+ ok +"})\.";
        regex = new RegExp(regex,'i');
    
        query_line = query_line.replace(regex,"<span id = 'sequence_miss_match'>"+query_line[position + pos]+"</span>");
    
        sequence_line = sequence_line.replace(regex,"<span id = 'sequence_miss_match'>"+sequence_line[position +pos]+"</span>");
    }
    return [query_line,sequence_line];
}


function query_parsing(line,temp){
  let query = {};
  if (line.startsWith('Query=') && temp === ''){
    query.title = line.slice(7,30);
  }

  if (line.startsWith('Length=') && temp === ''){
    query.length = line.match(/\d+/)[0];
  }
  return query
}

function alignments_parsing(line,line_1,line_2,line_3,count,alignements,temp){
  if (line.startsWith('>')){
    count ++;
    temp = 'alignement_'+count;
    alignements[temp] = {};
    alignements[temp].title = line.slice(1,24);
    alignements[temp].seq = [];
  }

  if (line.startsWith('Length=') && temp !== ''){
    alignements[temp].length = line.match(/\d+/)[0];  //Laisse de cote 
    alignements[temp].score = line_2.match(/\d+/)[0,0];  //Graph 1
    alignements[temp].e_value = line_2.match(/\d+\.\d+/)[0].replace('%','');  //Graph 1
    alignements[temp].identities = line_3.match(/\d+\/\d+/)[0,0];  //Graph 2(dans label)
    alignements[temp].pIdentities = line_3.match(/\d+\%/)[0,0].replace('%',''); //Graph 2
    alignements[temp].gaps = line_3.match(/(?<=Gaps = ).*(?=\s)/)[0];  //Graph 2(dans label)
    alignements[temp].pGaps = line_3.match(/\(([^()]*)\)$/)[0].replace('(','').replace('%)',''); // Graph 2      REVOIR one lign
  }

  if (line.startsWith('Query') && temp !== ''){
    //gestion des gaps et miss match
    tab_1 = line;
    tab_2 = line_2;

    //nécessaire pour garder le texte aligné dans le html ni vue ni keunu
    let pipe_line = line_1.replaceAll(' ',".");
    //pipe_line = pipe_line.replaceAll(/(?<=[.]{15})\.|(?<=[|])\.+/g,"<span id = 'sequence_dot'>*</span>");
    pipe_line = pipe_line.replaceAll(/(?<=[.]{15})\.|(?<=\||\|\.*)\./g,"*");

    //pipe_line = pipe_line.replaceAll('.',"<span id = 'sequence_dot'>.</span>");

    let query_line = tab_1.replaceAll(' ',".");

    let sequence_line = tab_2.replaceAll(' ',".");

    let lines_formated = coloring(query_line,pipe_line,sequence_line);

    lines_formated[0] = lines_formated[0].replaceAll('.',"<span id = 'sequence_dot'>.</span>");
    lines_formated[1] = lines_formated[1].replaceAll('.',"<span id = 'sequence_dot'>.</span>");
    pipe_line = pipe_line.replaceAll('.',"<span id = 'sequence_dot'>.</span>");
    pipe_line = pipe_line.replaceAll('*',"<span id = 'sequence_dot'>*</span>");

    //creation alignment and pushing into alignments
    alignements[temp].seq.push([lines_formated[0],pipe_line,lines_formated[1]+'<br>']);   
  }
  return [temp,alignements,count]
}