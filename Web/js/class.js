// CECI est le fichier de classes

class Sequence{
    constructor(sequence, ID){
        this.Sequence = sequence;
        this.ID = ID;
    }
}

class Project {
    constructor(){
        this.name='default'
        this.sequences=[];
        this.resultat=[];
        this.inputsequence='';
    }
    loadsequence(){
        var objct=this;
        fetch('http://localhost:8080/Data/BD/test.fsa').then((function(response){
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
        this.current_user.current_project.loadRawinput()    }
    loadbd(){
        this.current_user.current_project.loadsequence()
    }

}

//sequence_1 et sequence_2 des objets Sequence
//alignment = alignement parse depuis le resu.txt
class Alignment {
    constructor(sequence_Q,sequence_2,alignment_display,stat){
        this.sequence_Q = sequence_Q;
        this.sequence_2 = sequence_2;
        this.alignment_display = alignment_display;
        this.stat = stat;
    }  

}

class Resultat {
    constructor(alignment,statistics){
        this.alignment = alignment;
        this.statistics = statistics;
    }

    parse_resu(){
        fetch('http://localhost:8080/Data/data/resu.txt').then((function(response){
        		response.text().then((function(text){
                    //Split on '>' + suppression des valeurs vides ou undefined
                    parser_res(text)
                }))
            }))
    }

    getAlignment(){
        var objct = this;
        
        fetch('http://localhost:8080/Data/data/resu.txt').then((function(response){
        		response.text().then((function(text){
                    //Split on '>' + suppression des valeurs vides ou undefined
                    let txt = text.split('>').filter(e=>e)
                    txt=txt.map(e=>{
                        let line = txt.split('\n');
                        
                    });
            // chercher le ID de resu dans sequence.ID
            }));
        }));
    }
}

class Resu {
    constructor (query,alignements){
        this.query = query;
        this.align = alignements;
    }

    getAlignements (){return this.align;}

    getQuery (){return this.query;}

}