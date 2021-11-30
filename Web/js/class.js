// CECI est le fichier de classes

class Sequence{
    constructor(sequence, ID){
        this.Sequence = sequence;
        this.ID = ID;
    }
}

class Project {
    constructor(){
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
			var objct=this;
			let sequences = updateSequences();
			objct.sequences = sequences;
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
        this.Name = 'DefaultUser';
        this.Project=[];
    }
}


class Main{
    constructor(user,project){
        this.user = user;
        this.CurrentProject= project;
    }
    getSeqfrom(){
        let a=this.CurrentProject
        let b=a.getSeq()
        console.log(b)
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

class Resu {
    constructor(alignment,statistics){
        this.alignment = alignment;
        this.statistics = statistics;
    }


    getAlignment(sequence_Q,sequence_2){
        var objct = this;
        let ID_Q = sequence_Q.ID; //pas vraiement besoin de l'id du query pour parse
        let ID_2 = sequence_2.ID;
        fetch('http://localhost:8080/Data/data/resu.txt').then((function(response){
        		response.text().then((function(text){
                    //Split on '>' + suppression des valeurs vides ou undefined
                    let txt = text.split('>').filter(e=>e)
                    txt=txt.map(e=>{
                        let line = txt.split('\n');
                        //
                        (ID_2.include(line[0]))
                    });
            // chercher le ID de resu dans sequence.ID
            }));
        }));
    }
}