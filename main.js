//유저가 값을 입력한다.
//+버튼을 클릭하면, 할일이 추가된다
//delete버튼을 누르면 할일이 삭제된다
//check 버튼을 누르면 할일이 끝나면서 밑줄이 간다
//1.체크버튼을 클릭하면 t/f
//2.t면 끝암+밑줄
//3.f면 안끝남 그대로
//진행중 끝남 탭을 누르면, 언더바가 이동한다
//끝남탭은 끝난 아이탬만, 진행중은 진행중인 아이탬만
//전체탭을 두르면 다시 전체아이템으로 돌아옴

//[전역변수]
let taskInput = document.getElementById("task-input")
let addButton = document.getElementById("add-button")
let tabs = document.querySelectorAll(".task-tabs div")
let underline = document.getElementById("under-line")
let taskList = []
let filterList =[]
let taskBoard = document.getElementById("task-board")
let mode = 'all'

addButton.addEventListener("click", addTask)
taskInput.addEventListener("focus", clearInput)
taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask()
})

for(let i=0; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)})
}
function addTask() {
    let task = {
        id:randomIdGenerate(),
        taskContent : taskInput.value,
        isComplete: false
    }
    taskList.push(task)
    taskInput.value = ""
    
    filter()
}

function clearInput(){
    taskInput.value = ""
}

function render(){
    let list =[]
    if(mode === "all"){
        list = taskList
    }
    else if(mode === "ongoing" || mode === "done"){
        list = filterList
    }

    let  resultHTML = ""
    for(let i=0; i < list.length; i++){
        if(list[i].isComplete == true){
             resultHTML += `<div class="task">
                    <div class="task-done">${list[i].taskContent}</div>
                    <div>
                        <span onClick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-right fa-lg" style="color: #6b6b6b;"></i></span>
                        <span onClick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash fa-lg" style="color: #ff0000;"></i></span>
                    </div>
                </div>`
        }
        else{
           resultHTML += `<div class="task">
                    <div>${list[i].taskContent}</div>
                    <div>
                        <span onClick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check fa-lg" style="color: #00942c;"></i></span>
                        <span onClick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash fa-lg" style="color: #ff0000;"></i></span>
                    </div>
                </div>` 
        }
        
    }
    document.getElementById("task-board").innerHTML = resultHTML
}

function toggleComplete(id){
    for(let i=0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete
            break;
        }
    }
    render();
    console.log(taskList)
    
    console.log("id", id)
}



function deleteTask(id){
    for(let i=0; i < taskList.length; i++){
        if(taskList[i].id == id)
            taskList.splice(i,1)
            break;
        }
        filter();
    }

tabs.forEach((menu) =>{
    menu.addEventListener("click", (e) => horizontalIndicator(e))
}) 
function horizontalIndicator(e){
        underline.style.left = e.currentTarget.offsetLeft + "px";
        underline.style.width = e.currentTarget.offsetWidth + "px"
        underline.style.top = 
        e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px"
    }

function filter(event = null){
  
  if (event) {
    mode = event.target.id;
  }

  if (mode === "all") {
    filterList = taskList;
  } else if (mode === "ongoing") {
    filterList = taskList.filter(task => !task.isComplete);
  } else if (mode === "done") {
    filterList = taskList.filter(task => task.isComplete);
  }

  render();
  console.log(mode)
}

function randomIdGenerate(){
    return '_' + Math.random().toString(36).substring(2,9);
} 