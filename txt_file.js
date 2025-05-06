
const fs=require("fs").promises;

let list=["text.txt","hamlet.txt","cymbeline.txt","coriolanus.txt"];


async function readfile(file){
    
    try{
        const data = await fs.readFile(file,"utf-8");
       // console.log(data);
       const pdata= await correct(data);
        writefile(pdata,file);
        return data;
    }
    catch(err){
        console.error("error occured",err);
    }

}

async function writefile(data,file){
         
    try {
        await fs.writeFile(file, data, 'utf8');
        console.log(`Successfully written to ${file}`);
      } catch (err) {
        console.error('Error writing file:', err);
      }

}


async function  correct(data) {
     let out="";
      for(let i=0;i<data.length;i++){
            if(data[i]=='\r\n'){
                out=out+" ";
            }
            else if(data[i]=='.'){
             out=out+" .";
            }
            else{
                out=out+data[i];
            }
      }
   // console.log(out);
    return out;
}


function runall(){
 
    for(let i=0;i<list.length;i++){
        readfile(list[i]);
    }

}

runall();