function parser_res(text) {

  let tab = text.split('\n');
  let count = 0;
  let temp = '';
  let query = {};
  let alignements = {};

  let alignement_window = document.getElementById('sequence_window_text'); 

  for (let i = 0; i < tab.length; i++){

    // Query
    if (tab[i].startsWith('Query=') && temp === ''){
      query.title = tab[i].slice(7,30);
    }
    if (tab[i].startsWith('Length=') && temp === ''){
      query.length = tab[i].match(/\d+/)[0];
    }

    // alignments
    if (tab[i].startsWith('>')){
      count ++;
      temp = 'alignement_'+count;
      alignements[temp] ={};
      alignements[temp].title = tab[i].slice(1,24);
      console.log("ULTIMATE TEST :\n",alignements[temp].title)
      alignements[temp].seq = [];
    }
    if (tab[i].startsWith('Length=') && temp !== ''){
      alignements[temp].length = tab[i].match(/\d+/)[0];  //Laisse de cote 
      alignements[temp].score = tab[i+2].match(/\d+/)[0,0];  //Graph 1
      alignements[temp].e_value = tab[i+2].match(/\d+\.\d+/)[0].replace('%','');  //Graph 1
      alignements[temp].identities = tab[i+3].match(/\d+\/\d+/)[0,0];  //Graph 2(dans label)
      alignements[temp].pIdentities = tab[i+3].match(/\d+\%/)[0,0].replace('%',''); //Graph 2
      alignements[temp].gaps = tab[i+3].match(/(?<=Gaps = ).*(?=\s)/)[0];  //Graph 2(dans label)
      alignements[temp].pGaps = tab[i+3].match(/\(([^()]*)\)$/)[0].replace('(','').replace('%)',''); // Graph 2      REVOIR one lign
    }
    if (tab[i].startsWith('Query') && temp !== ''){
        //idee : parcourir la ligne : 
        //if premier '-' => <span id = "gap">-...
        //if dernier '-' => </span>ATGCGT...

        let gap = false;
        let miss_match = false;

        //gestion des gaps et miss match => A VOS RISQUE ET PERILS
        tab_1 = tab[i];
        tab_2 = tab[i+2];
        // for (let car = 0 ; car < tab[i].length ; car++){
        //     let caractere_1 = tab[i][car];
        //     let caractere_2 = tab[i+2][car];
        //     if (caractere_1 != caractere_2 && caractere_1 != '-' && caractere_2 != '-'){
        //         tab_1[car] = "<span id = 'sequence_miss_match'>"+caractere_1+"</span>";
        //         tab_2[car] = "<span id = 'sequence_miss_match'>"+caractere_2+"</span>";
        //     }
        //     if(caractere_1 == '-' || caractere_2 == '-'){
        //         tab_1[car] = "<span id = 'sequence_gap'>"+caractere_1+"</span>";
        //         tab_2[car] = "<span id = 'sequence_gap'>"+caractere_2+"</span>";
        //     }
        // }
        // tab_1 = tab_1.toString();
        // tab_2 = tab_2.toString();


        //nécessaire pour garder le texte aligné dans le html ni vue ni keunu
        let pipe_line = tab[i+1].replaceAll(' ',".");
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

  }
  const resu = new Resu(query, alignements);
  console.log(resu);

  //ajout au html
  alignement_window.innerHTML= resu.align.alignement_2.seq.toString().replaceAll(',','<br>');

  return resu;
}

//parser_res(text);

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