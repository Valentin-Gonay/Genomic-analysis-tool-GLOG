// CECI est le fichier de class


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
        var txt=''
    fetch('../Data/data/all_variant.fasta').then((function(response){
        response.text().then((function(text){
            let txt=text
            console.log(txt)
        }))
    }))
    }
}

class User{
    constructor() {
        this.Name = 'DefaultUser';
        this.Project=[];
    }
}





