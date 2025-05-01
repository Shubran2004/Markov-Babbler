

const fs = require("fs").promises;


let textout="";

const hash= 31;
const MOD=1000067;

const mymap= new Map();
const pair = new Map();
const invpair = new Map();

let exptable= new Array();

async function precompute(){
    let i=1;
    for(let j=0;j<=100;j++){
      exptable.push(i);
      i=(i*hash)%MOD;
    }


}



async function read(){
 
    try{
        const data = await fs.readFile("sample.txt","utf-8");
       // console.log(data);
        return data;
    }
    catch(err){
        console.error("error occured",err);
    }
 
}



async function generatehash(textout){
    //console.log(textout,"><");
    const words=textout.split(" ");
     //console.log(words.length);
     //console.log(words,words.length);
     for(let i=0;i<words.length;i++){
        let c=0;
        
        for(let j=0;j<words[i].length;j++){
        c=(c+(words[i].charCodeAt(j))*exptable[j%100])%MOD;
     }
    
     if(!mymap.has(words[i])){
        mymap.set(words[i],c);
        invpair.set(c,words[i]);
        pair.set(c,[]);
     }

     //console.log(c,words[i]);
     
}

 
let message = 0;
console.log(message);
return message;
}

async function makepair(textout) {
    
    let words=textout.split(" ");
    for(let i=0;i<words.length-1;i++){
        pair.get(mymap.get(words[i])).push(mymap.get(words[i+1]));
    }

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


async function babble(x){
      let token ="$";
      let out="";
      let cval=mymap.get(token);
    
      while(x--){

        let l=pair.get(cval).length;
        let j=getRandomInt(0,l-1);
        
        if(l==0){
          cval=36;
          j=0;
        }

        let temp=pair.get(cval)[j];
       // console.log(invpair.get(temp));
       out=out + invpair.get(temp) + " ";
        cval = temp;
      }

      return out;
      
}

async function deleteFile() {
    try {
      await fs.unlink('output.txt');
      console.log('File deleted successfully!');
    } catch (err) {
      console.error('Error deleting file:', err);
    }
  }
  
  

async function appendToFile(out) {
    try {
      await fs.appendFile('output.txt', out);
    } catch (err) {
      console.error('Error appending to file:', err);
    }
  }


async function runall(){

await precompute();

await read()
    .then(text => {
       textout="$ " + text+textout ;
     //  console.log(textout);
    })
    .catch(err => {
        console.error("Failed to read file:", err);
    });

 await generatehash(textout)
        .then( message => {
            console.log(message);
        })
        .catch(err => {
            console.error("error in hashing",err);
        })

await makepair(textout)
        .then(message =>{
              console.log("pairs have been made");
        })
        .catch(err => {
           console.log(err);
        })

await babble(100000)
     .then(message => {
         deleteFile();
        appendToFile(message)
        console.log("text has been generated");
     })
     .catch(err =>{
        console.log(err);
     })



}

runall()