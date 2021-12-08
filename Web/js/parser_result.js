function alignments_parsing(line,line_1,line_2,line_3,count,alignements,tab_align,query,all_seq){
  if (line.startsWith('>')){
      count ++;
      if(count > 1){
          tab_align.push(alignements.deep_copie());
          alignements = new Alignment();
      }
  
      alignements.sequence_2 = compare_IDs(all_seq,line.slice(1,24));
      alignements.sequence_Q = query;
      alignements.alignment_display = [];
  }
    
  if (line.startsWith('Length=') && alignements.sequence_2){
      alignements.sequence_2.length = line.match(/\d+/)[0];  //Laisse de cote 
      let score = line_2.match(/\d+/)[0,0];  //Graph 1
      let e_value = line_2.match(/\d+\.\d+/)[0].replace('%','');  //Graph 1
      let identities = line_3.match(/\d+\/\d+/)[0,0];  //Graph 2(dans label)
      let pIdentities = line_3.match(/\d+\%/)[0,0].replace('%',''); //Graph 2
      let gaps = line_3.match(/(?<=Gaps = ).*(?=\s)/)[0];  //Graph 2(dans label)
      let pGaps = line_3.match(/\(([^()]*)\)$/)[0].replace('(','').replace('%)',''); // Graph 2      REVOIR one lign
      alignements.creat_stat(score, e_value, identities, pIdentities, gaps, pGaps);
  
  }
    
  if (line.startsWith('Query') && alignements.sequence_2){
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
    alignements.alignment_display.push([lines_formated[0],pipe_line,lines_formated[1]+'<br>']);   
  }
  return [count,alignements];
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

function query_parsing(line,input_seq){
  let query = input_seq;
  if (line.startsWith('Query=')){
    if(!input_seq.ID.includes(line.slice(7,30))){
      query.ID = line.slice(7,30);
    }
  }

  if (line.startsWith('Length=')){
    query.length = line.match(/\d+/)[0];
  }
  return query
}

function compare_IDs(all_seq,seq_1){
  let res;
  if (!all_seq){ 
    return new Sequence('', seq_1);
  }

  for(seq of all_seq){
    res = seq.compare(seq_1);

    if(res){
      return res
    }
  }
  return new Sequence('',seq_1)
}