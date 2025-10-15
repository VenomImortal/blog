const like = document.getElementById("like")
const contador = document.getElementById("contador")
count = 0
let liked = false


function contar(){
   
    if(liked === false){
            count++
            contador.innerText= count
            like.style.backgroundColor=" rgb(255, 166, 0)";
            like.style.filter="invert(1)"
            liked=true
       
    }
    else{
        
        count--
         contador.innerText= count
         like.style.backgroundColor=" rgb(3, 76, 233)";
         like.style.filter="none"
         liked = false
    }
    
    
   
}