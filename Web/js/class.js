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
	                return new Sequence(e[1]),e[0]
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
    getproject(){return this.CurrentProject}

    loadinput(){
        this.CurrentProject.loadRawinput()
    }

}
