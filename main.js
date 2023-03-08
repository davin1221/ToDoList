let userInput = document.getElementById("user-input") //
let addBtn = document.getElementById("add-button")
let myList = [];
let underLine = document.getElementById("under-line")


addBtn.addEventListener("click", addTask)


function inputEnter() {
    if(window.event.key == "Enter"){
        addTask()    
    }
}

let tabs = document.querySelectorAll(".task-tabs div") 
for(let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function(event){filter(event)})
}

function addTask(){

    let task = {
        id : randomId(), 
        taskContent  : userInput.value, 
        isComplete : false 
    }

    myList.push(task)
    userInput.value = ""; 
    render();
}

function randomId() {
    return Math.random().toString(36).substring(2, 9);
}


let taskBoard = document.getElementById("task-board")

function render(){

    let list = [];
    if(mode == "all") {
        list = myList; 
    } else if(mode == "not-done" || mode == "done"){
        list = filterList 
    }
    

    let resultHTML = ''

    for(let i = 0; i < list.length; i++){

        if(list[i].isComplete == true) {

            resultHTML +=
            `<div class="task" id="${list[i].id}">
                <button onclick="checkButton('${list[i].id}')" class="buttons"><i class="fa-regular fa-square-check"></i> </button>
                <span class="doneStyle">${list[i].taskContent}</span>
                <button onclick="deleteButton('${list[i].id}')" class="buttons")"><i class="fa-regular fa-trash-can"></i></button>
            </div>`
      
        } else {

            resultHTML +=
            `<div class="task" id="${list[i].id}">
                <button onclick="checkButton('${list[i].id}')" class="buttons"><i class="fa-regular fa-square"></i></button>
                <span>${list[i].taskContent}</span>
                <button onclick="deleteButton('${list[i].id}')" class="buttons"><i class="fa-regular fa-trash-can"></i></button>
            </div>`

        }     
    }   
    document.getElementById("task-board").innerHTML = resultHTML
}


function checkButton(id) {
    for(let i = 0; i < myList.length; i++){
        if(myList[i].id == id) {
            myList[i].isComplete = !myList[i].isComplete;
            break;
        }
    }
    console.log(myList)

    filter() //
}

function deleteButton(id) {
    for(let i = 0; i < myList.length; i++){
        if(myList[i].id == id) {
            myList.splice(i,1)
            break;
        }
    }
    filter() 
}


let mode = 'all'; 
let filterList = []; 
function filter(event){

    if(event){ 
        mode = event.target.id 

        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.top =
          event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
    }
    
    filterList = []; 

    if(mode == "all") {
        render()

    } else if(mode == "not-done") {
        for(let i = 0; i < myList.length; i++) {
            if(myList[i].isComplete == false) {
                filterList.push(myList[i])
            }
        }
    } else if(mode == "done") {
        for(let i = 0; i < myList.length; i++) {
            if(myList[i].isComplete == true) {
                filterList.push(myList[i])
            }

        }
    }
    render()
    console.log(filterList)
}

console.log(myList)
