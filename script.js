let listDiv = document.getElementById('list-here');
let area = document.getElementById("input-box");

let tasksRetrievedStr = localStorage.getItem('tasks');
console.log(tasksRetrievedStr,typeof tasksRetrievedStr);
if(tasksRetrievedStr==null){
    
    // localStorage.setItem('tasks',jsonStr);
}
let taskArr = [];


let Ids=0;

function eraseText() {
    if(area.value == ""){
        alert("Nothing to clear");
    }
    else{
        area.value = "";
    }
}

function addTask(){
    // let area = document.getElementById("input-box");
    // console.log(area.value);
    
    let str = area.value;
    // console.log(str);

    str = str.trim();
    str = removeExcessSpacesAndNewlines(str);
    // console.log(str);


    if (str.length == 0){
        alert("Task can't be empty!")
    }else{
        let tasksRetrievedStr = localStorage.getItem('tasks');
        let tasksRetrievedArr = JSON.parse(tasksRetrievedStr);
        // var tasksRetrievedArr=[];

        let obj ={
            T:str,
            isCheck:0
        }

        tasksRetrievedArr.push(obj);
        // console.log(taskArr);

        let taskArrJSONStr = JSON.stringify(tasksRetrievedArr);
        localStorage.setItem("tasks",taskArrJSONStr);

        var div2 = document.createElement('div');
        div2.className="list-div";
        let listDivIdStr = `list-div${Ids}`;
        div2.id = listDivIdStr;
     
        var pTag = document.createElement("p");
        pTag.className = "tasks";
        let pTagIdStr = `tasks${Ids}`;
        pTag.id = pTagIdStr;
        pTag.innerText = str;
        div2.appendChild(pTag);

        var divBtns = document.createElement('div');
        divBtns.className="div-btns";
        let divBtnsIdStr = `div-btns${Ids}`;
        divBtns.id = divBtnsIdStr;
        div2.appendChild(divBtns);

        var b1 = document.createElement('button');
        b1.className = "editBtn";
        let b1IdStr = `editBtn${Ids}`;
        b1.id = b1IdStr;
        b1.addEventListener('click',function(){
            let editBtnIdStr = this.id;
            let editBtnIdNum = parseInt(editBtnIdStr.replace("editBtn",""));
            editTask(editBtnIdNum);
        });

        var b2 = document.createElement('input');
        b2.setAttribute("type", "checkbox");
        b2.className = "checkBtn";
        let b2IdStr = `checkBtn${Ids}`;
        b2.id = b2IdStr;
        b2.addEventListener('change', function() {
            let checkBtnIdStr = this.id;
            let checkBtnIdNum = parseInt(checkBtnIdStr.replace("checkBtn",""));
            if (this.checked) {
                console.log("Checkbox is checked..");
            //   console.log(typeof checkBtnIdNum, checkBtnIdNum);
                lineThroughTrue(checkBtnIdNum);
                tasksRetrievedArr[i].isCheck = 1;
            } else {
                console.log("Checkbox is not checked..");
                lineThroughFalse(checkBtnIdNum);
            }
        });
    

        var b3 = document.createElement('button');
        b3.className = "deleteBtn";
        let b3IdStr = `deleteBtn${Ids}`;
        b3.id = b3IdStr;
        b3.addEventListener('click',function(){
            let dltBtnIdStr = this.id;
            let dltBtnIdNum = parseInt(dltBtnIdStr.replace("deleteBtn",""));
            deleteTask(dltBtnIdNum);
        });

        b1.innerHTML="&#9998;";
        // b2.innerText="B2";
        b3.innerHTML="&#10008;";

        divBtns.appendChild(b1);
        divBtns.appendChild(b2);
        divBtns.appendChild(b3);        
        listDiv.appendChild(div2);
        Ids++;

        eraseText();
    }
}

// let clearBtn = document.getElementById('clearTA');
// clearBtn.addEventListener('click',eraseText);

// let addTaskBtn = document.getElementById('addTaskId');
// addTaskBtn.addEventListener('click', addTask);

// area.addEventListener('keydown', (event) => {
//     var name = event.key;
//     var code = event.code;
//     // Alert the key name and key code on keydown
//     // alert(`Key pressed ${name} \r\n Key code value: ${code}`);]
//     if(name == 'Enter'){
//         addTask();
//     }
// }, false);

area.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    // Call your function here
    addTask();
  }
});

function removeExcessSpacesAndNewlines(str) {
    return str.replace(/[\s\n]+/g, ' ').trim();
}

function loadData(){
    let tasksRetrievedStr = localStorage.getItem('tasks');
    // console.log(typeof tasksRetrievedStr, "->", tasksRetrievedStr);

    if(tasksRetrievedStr!=null){
        let tasksRetrievedArr = JSON.parse(tasksRetrievedStr);
        // console.log(typeof tasksRetrievedArr, "->", tasksRetrievedArr);

        for(let i = 0 ; i < tasksRetrievedArr.length;i++){
            var div2 = document.createElement('div');
            div2.className="list-div";
            let listDivIdStr = `list-div${Ids}`;
            div2.id = listDivIdStr;

            var pTag = document.createElement("p");
            pTag.className = "tasks";
            let pTagIdStr = `tasks${Ids}`;
            pTag.id = pTagIdStr;
            pTag.innerText = tasksRetrievedArr[i].T;
            div2.appendChild(pTag);

            var divBtns = document.createElement('div');
            divBtns.className="div-btns";
            let divBtnsIdStr = `div-btns${Ids}`;
            divBtns.id = divBtnsIdStr;
            div2.appendChild(divBtns);

            var b1 = document.createElement('button');
            b1.className = "editBtn";
            let b1IdStr = `editBtn${Ids}`;
            b1.id = b1IdStr;
            b1.addEventListener('click',function(){
                let editBtnIdStr = this.id;
                let editBtnIdNum = parseInt(editBtnIdStr.replace("editBtn",""));
                editTask(editBtnIdNum);
            });

            var b2 = document.createElement('input');
            b2.setAttribute("type", "checkbox");
            b2.className = "checkBtn";
            let b2IdStr = `checkBtn${Ids}`;
            b2.id = b2IdStr;
            b2.addEventListener('change', function() {
                let checkBtnIdStr = this.id;
                let checkBtnIdNum = parseInt(checkBtnIdStr.replace("checkBtn",""));
                console.log(typeof checkBtnIdNum, checkBtnIdNum);
            
                if (this.checked) {
                    console.log("Checkbox is checked..");
                    lineThroughTrue(checkBtnIdNum);
                    tasksRetrievedArr[i].isCheck = 1;
                } else {
                    console.log("Checkbox is not checked..");
                    lineThroughFalse(checkBtnIdNum);
                }
            });
            if(tasksRetrievedArr[i].isCheck == 1){
                let checkBtn = document.getElementById(`checkBtn${i}`);
                checkBtn.checked = true;
                lineThroughTrue(i);
            }

            var b3 = document.createElement('button');
            b3.className = "deleteBtn";
            let b3IdStr = `deleteBtn${Ids}`;
            b3.id = b3IdStr;    
            b3.addEventListener('click',function(){
                let dltBtnIdStr = this.id;
                let dltBtnIdNum = parseInt(dltBtnIdStr.replace("deleteBtn",""));
                deleteTask(dltBtnIdNum);
            });

            b1.innerHTML="&#9998;";
            // b2.innerText="B2";
            b3.innerHTML="&#10008;";

            divBtns.appendChild(b1);
            divBtns.appendChild(b2);
            divBtns.appendChild(b3);        
            listDiv.appendChild(div2);
            Ids++;
        }
    }
}

loadData();

// var chkbtn = document.getElementById('checkBtn');
// chkbtn.addEventListener('',)

function lineThroughTrue(idNum){
    let pIdStr = `tasks${idNum}`;
    let pTag = document.getElementById(pIdStr);
    pTag.style.textDecoration = "line-through";
}

function lineThroughFalse(idNum){
    let pIdStr = `tasks${idNum}`;
    let pTag = document.getElementById(pIdStr);
    pTag.style.textDecoration = "none";
}

function deleteTask(idNum){
    let taskDivIdStr = `list-div${idNum}`;
    let taskDiv = document.getElementById(taskDivIdStr);
    console.log("delete alled > id >> ",taskDivIdStr);
    taskDiv.remove();
}

function editTask(idNum){
    let pIdStr = `tasks${idNum}`;
    let pTag = document.getElementById(pIdStr);
    console.log("this text is written in current p-tast... ",pTag.innerText);
    let newTaskStr = prompt("Edit your task > ",pTag.innerText );
    newTaskStr = newTaskStr.trim();
    if (newTaskStr != "") {
        pTag.innerHTML = newTaskStr;
    }else{
        alert("Task empty!");
    }
}