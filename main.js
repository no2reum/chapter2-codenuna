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

let taskInput = document.getElementById("task-input")
let addButton = document.getElementById("add-button")
let taskList = []
let taskBoard = document.getElementById("task-board")

addButton.addEventListener("click", addTask)

function addTask() {
    let task = {
        id:randomIdGenerate(),
        taskContent : taskInput.value,
        isComplete: false
    }
    taskList.push(task)
    console.log(taskList)
    render()
}

function render(){//그려주기 
    let  resultHTML = ""
    for(let i=0; i < taskList.length; i++){
        if(taskList[i].isComplete == true){
             resultHTML += `<div class="task">
                    <div class="task-done">${taskList[i].taskContent}</div>
                    <div>
                        <span onClick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-rotate-right fa-lg" style="color: #6b6b6b;"></i></span>
                        <span onClick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash fa-lg" style="color: #ff0000;"></i></span>
                    </div>
                </div>`
        }
        else{
           resultHTML += `<div class="task">
                    <div>${taskList[i].taskContent}</div>
                    <div>
                        <span onClick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check fa-lg" style="color: #00942c;"></i></span>
                        <span onClick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash fa-lg" style="color: #ff0000;"></i></span>
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
    // console.log("check")
    console.log("id", id)
}

function randomIdGenerate(){
    return '_' + Math.random().toString(36).substring(2,9);
} //렌덤 식별id 

function deleteTask(id){
    for(let i=0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    render()
}