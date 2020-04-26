//selectors
const clear= document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//classes
const CHECK = "fa-check-circle";
const UNCHECKED = "fa-circle-thin";
const LINETHROUGH = "lineThrough";

//variables

var LIST =[],
    id =0;

// ----------------------------------------------funcs------------------------------------------------------------------


//show date
const option = {weekday : "long", month : "short", day : "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-us", option);

//add to-do to list
function addToDo(toDo, id, done, trash){
    if(trash){return;}
    const DONE = done ? CHECK : UNCHECKED;
    const LINE = done? LINETHROUGH : "";

 const item = ` <li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="${LINE} text">${toDo}</p>
                    <i class="fa fa-trash de" job="delete" id="${id}"></i>
                </li>`;
 const position= "beforeend";
 list.insertAdjacentHTML(position,item);
}
// addToDo("drink coffee");
//add icon
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13)
    {
        const toDo = input.value;
        if(toDo)
        {
            addToDo(toDo);

            LIST.push({
                name : toDo,
                id : id,
                done : true,
                trash : false
            });
            id++;
        }
        input.value="";
    }
});
// addToDo("coffee", 1, false, true);
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECKED);
    element.parentNode.querySelector(".text").classList.toggle(LINETHROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;   
}
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

list.addEventListener("click", function (event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if(elementJob == "complete")
    {
        completeToDo(element);
    }
    else if (elementJob == "delete")
    {
        removeToDo(element);
    }
});