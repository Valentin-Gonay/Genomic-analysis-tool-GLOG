/*  
    12/12/2021

    Quentin CAPUZET
    Loïc PERON
    Valentin GONAY
    Gregory BORDIER
    Thomas BAUDEAU
    Elie BORDRON

    JS file for all class definition

    version 1.0.0 
    
*/

class Sequence{
    constructor(sequence = '', ID = ''){
        this.Sequence = sequence;
        this.ID = ID;
        this.length = 0;
    }
    compare(sequence_2_ID){
        if(this.ID.includes(sequence_2_ID)){
            return this
        }
        return false
    }
}

class Statistics{
    constructor(score, e_value, identities, pIdentities, gaps, pGaps){
        this.score = score;
        this.e_value = e_value;
        this.identities = identities;
        this.pIdentities = pIdentities;
        this.gaps = gaps;
        this.pGaps = pGaps;
    }   
}

class Project {
    constructor(){
        this.name='default'
        this.sequences=[];
        this.resultat=[];
        this.inputsequence= new Sequence();
    }

    loadsequence(){
        var objct=this;
        fetch('http://localhost:8080/Data/BD/blast_2-9/test.fsa').then((function(response){
        		response.text().then((function(text){
		            let txt=text.split('>').filter(e=>e)
		            txt=txt.map(e=>{
		                e='>'+e;
		                return [e.substring(0, e.indexOf('\n')), e.substring(e.indexOf('\n'),e.length)]
            		})
            		let sequence=txt.map((e)=>{
	                return new Sequence(e[1],e[0])
								})
            		objct.sequences=sequence;
        		}))
    		}))
    }  
    loadRawinput(){
			this.inputsequence = updateSequences();
    }
    getSeq(){
        return this.sequences
    }

    buildResu(){
        //TODO construction de la class resu
    }
}

class User{
    constructor() {
        this.name = 'DefaultUser';
        this.all_project=[];
        this.current_project=new Project()
    }
}


class Main{
    constructor(all_user,current_user){
        this.all_user = all_user;
        this.current_user= current_user;
    }
    getSeqfrom(){
     this.current_user.current_project.getSeq()
    }
    getproject(){return this.current_user.current_project}

    loadinput(){
        this.current_user.current_project.loadRawinput()    
    
    }
    loadbd(){
        this.current_user.current_project.loadsequence()
    }

    creat_resultat(){
        this.current_user.current_project.resultat = new Resultat()
        this.current_user.current_project.resultat.parse_resu(this.current_user.current_project.inputsequence,this.current_user.current_project.sequences)
    }

    add_empty_result(){
        this.current_user.current_project.resultat = new Resultat()
    }

}


class Alignment {
    constructor(sequence_Q,sequence_2,alignment_display,stat){
        this.sequence_Q = sequence_Q;
        this.sequence_2 = sequence_2;
        this.alignment_display = alignment_display;
        this.stat = stat;
    } 

    creat_stat(a,b,c,d,e,f){
       this.stat = new Statistics(a,b,c,d,e,f);
    }

    deep_copie(){
        return JSON.parse(JSON.stringify(this));
    }
}



class Resultat {
    constructor(){
        this.alignments = [];
    }

    async parse_resu(input_seq,all_seq){
        var input_seq = input_seq;
        var all_seq = all_seq;
        const fetch_data = await(fetchsynch('http://localhost:8080/Data/data/resu.txt'));
        this.alignments = this.parser_res(fetch_data,this.alignments,input_seq,all_seq);
        return this.alignments
    }

    parser_res(text,tab_align,input_seq,all_seq) {

        let tab = text.split('\n');
        tab = tab.map(e => e.replaceAll('\r',''));
        let count = 0;
        var alignements = new Alignment();
        let query
      
      
        for (let i = 0; i < tab.length; i++){
      
          query = query_parsing(tab[i],input_seq)
      
          let rep = alignments_parsing(tab[i],tab[i+1],tab[i+2],tab[i+3],count,alignements,tab_align,query,all_seq)
          count = rep[0];
          alignements = rep[1];
        }
        return tab_align
    }

    getAlignements() {
        return this.alignements;
    }
}



  


