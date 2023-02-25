let listDiv = document.getElementById('list-here');
let area = document.getElementById("input-box");
let tasksRetrievedStr;
console.log(tasksRetrievedStr,typeof tasksRetrievedStr);
if(JSON.parse(localStorage.getItem('tasks'))==null){
   
    tasksRetrievedStr=[];
    localStorage.setItem('tasks',JSON.stringify(tasksRetrievedStr));
}
else{
    tasksRetrievedStr=JSON.parse(localStorage.getItem('tasks'));
}
// if(tasksRetrievedStr==null){
    
//     // localStorage.setItem('tasks',jsonStr);
// }
// let taskArr = [];

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
            isCheck:0,
            id:""
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
                
                tasksRetrievedStr = JSON.parse(localStorage.getItem('tasks'));
                console.log(tasksRetrievedStr,checkBtnIdNum,"1");
                tasksRetrievedStr[checkBtnIdNum].isCheck = 1;
                console.log(tasksRetrievedStr,"2");
                console.log("inside add b2 if listern",this.checked,tasksRetrievedStr[checkBtnIdNum].isCheck);
                localStorage.setItem("tasks",JSON.stringify(tasksRetrievedStr));
            } else {
                console.log("Checkbox is not checked..");
                lineThroughFalse(checkBtnIdNum);

                tasksRetrievedStr[checkBtnIdNum].isCheck = 0;
                localStorage.setItem("tasks",JSON.stringify(tasksRetrievedStr));
            }
        });

        var b3 = document.createElement('button');
        b3.className = "deleteBtn";
        let b3IdStr = `deleteBtn${Ids}`;
        b3.id = b3IdStr;

        let newVar = localStorage.getItem('tasks');
        newVar = JSON.parse(newVar);

        b3.addEventListener('click',function(){
            let dltBtnIdStr = this.id;
            let dltBtnIdNum = parseInt(dltBtnIdStr.replace("deleteBtn",""));

            let arrS = localStorage.getItem("tasks");
            arrS = JSON.parse(arrS);

            console.log(arrS, typeof arrS);

            let pTagOther = document.getElementById(`tasks${dltBtnIdNum}`);

            console.log(dltBtnIdNum,typeof arrS, arrS);
            
            arrS.splice(findIndex(pTagOther.innerText,arrS),1);
            arrS = JSON.stringify(arrS);
            localStorage.setItem('tasks',arrS);

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
        let newVar = localStorage.getItem('tasks');
        newVar = JSON.parse(newVar);

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
            if(tasksRetrievedArr[i].isCheck == 1){
                pTag.style.textDecoration ="line-through";
            }
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
            if(tasksRetrievedArr[i].isCheck == 1){
                b2.checked = true;
            }
            b2.addEventListener('change', function() {
                let checkBtnIdStr = this.id;
                let checkBtnIdNum = parseInt(checkBtnIdStr.replace("checkBtn",""));
                console.log(typeof checkBtnIdNum, checkBtnIdNum);
                
            
                if (this.checked) {
                    console.log("Checkbox is checked..");
                    lineThroughTrue(checkBtnIdNum);
                    tasksRetrievedArr[i].isCheck = 1;
                    console.log("inside b2 if listern",this.checked,tasksRetrievedArr[i].isCheck);
                    let taskArrJSONStr = JSON.stringify(tasksRetrievedArr);
                    localStorage.setItem("tasks",taskArrJSONStr);
                }
                 else {
                    console.log("Checkbox is not checked..");
                    lineThroughFalse(checkBtnIdNum);
                    tasksRetrievedArr[i].isCheck = 0;
                    console.log("inside b2 if listern",this.checked,tasksRetrievedArr[i].isCheck);
                    let taskArrJSONStr = JSON.stringify(tasksRetrievedArr);
                    localStorage.setItem("tasks",taskArrJSONStr);
                    // console.log("Checkbox is not checked..");
                    // lineThroughFalse(i);
                    // tasksRetrievedStr[i].isCheck = 0;
                    // localStorage.setItem("tasks",JSON.stringify(tasksRetrievedStr));
                    // console.log("inside b2 else listern",this.checked,tasksRetrievedArr[i].isCheck)
                }
                console.log('i :>> ', i,"checkBtnIdNum > ", checkBtnIdNum);
            });

            console.log(newVar, typeof newVar, "< inside load function"," i>",i);
            
            var b3 = document.createElement('button');
            b3.className = "deleteBtn";
            let b3IdStr = `deleteBtn${Ids}`;
            b3.id = b3IdStr;    
            b3.addEventListener('click',function(){
                let dltBtnIdStr = this.id;
                console.log("on load dlt btn. idstr>" ,dltBtnIdStr);
                let dltBtnIdNum = parseInt(dltBtnIdStr.replace("deleteBtn",""));

                let arrS = localStorage.getItem("tasks");
                arrS = JSON.parse(arrS);

                let pTagOther = document.getElementById(`tasks${dltBtnIdNum}`)
                console.log(pTagOther.innerText);
                // console.log(dltBtnIdNum, typeof arrS, arrS);

                arrS.splice(findIndex(pTagOther.innerText,arrS),1);
                console.log(findIndex(pTagOther.innerText,arrS));
                console.log(pTagOther.innerText, typeof arrS);
                arrS = JSON.stringify(arrS);
                localStorage.setItem('tasks',arrS);

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
    //console.log("delete alled > id >> ",taskDivIdStr);
    taskDiv.remove();
}

function editTask(idNum){
    let pIdStr = `tasks${idNum}`;
    let pTag = document.getElementById(pIdStr);
    // console.log("this text is written in current p-tast... ",pTag.innerText);
    let newTaskStr = prompt("Edit your task > ",pTag.innerText );
    newTaskStr = newTaskStr.trim();
    if (newTaskStr != "") {
        pTag.innerHTML = newTaskStr;
    }else{
        alert("Task empty!");
    }
}

function findIndex(taskStr,newVar){
    for(let i = 0; i <newVar.length;i++){
        if(newVar[i].T == taskStr) return i;
    }
    return -1;
}

// event target