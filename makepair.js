const { write } = require("fs");


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

 
let message = "all hashes have been generated ";
return message;
}

async function makepair(textout) {
    
    let words=textout.split(" ");
    for(let i=0;i<words.length-1;i++){
        pair.get(mymap.get(words[i])).push(mymap.get(words[i+1]));
    }
    
    let message = "pairs succesfully made";
    return message;

}



async function deleteFile() {
    try {
       fs.unlink('pairing.txt');
       fs.unlink("map.txt");
       fs.unlink("pre.txt");
      console.log('Files deleted successfully!');
    } catch (err) {
      console.error('Error deleting file:', err);
    }
  }
  

  async function saveMapToFile(map, filename) {
    //console.log(map);
    const json = JSON.stringify([...map.entries()], null, 2);
    try {
      await fs.appendFile(filename, json);
      console.log(`Map saved to ${filename}`);
    } catch (err) {
      console.error('Error writing file:', err);
    }
  }

  function writeToMap(){
    try{
             
         saveMapToFile(pair,"pairing.txt");
         saveMapToFile(mymap,"pre.txt");
         saveMapToFile(invpair,"map.txt");

    }
    catch(err){
         console.error(err);
    }
  }
  




async function runall(){

await precompute();

await read()
    .then(text => {
       textout="$ " + text+ "$" ;
      console.log("files have been read");
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
              console.log(message);
        })
        .catch(err => {
           console.log(err);
        })

 await deleteFile();       

writeToMap();



}

runall()