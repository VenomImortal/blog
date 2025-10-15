function abrirMenu(){
const menu = document.getElementById("menu")
const btnOpen = document.getElementById("btn-open")
menu.classList.toggle("aberto")

document.addEventListener("click", (e)=>{
    if(!menu.contains(e.target) && !btnOpen.contains(e.target)){
        menu.classList.remove("aberto");
    }
   })
}
function fecharMenu(){
    const menu = document.getElementById("menu")
    menu.classList.remove("aberto")
}