

export function random(len:number){
     const options = "ffnnfdnfdiufdfiugfer1564654641156";
     let size = options.length;
     let ans= "";

     for(let i = 0 ; i<len; i++){
        ans+=options[Math.floor(Math.random()*size)]
     }
    return ans; 
}