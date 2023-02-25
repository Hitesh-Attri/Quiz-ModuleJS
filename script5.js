let area = document.getElementById("input-box");
let listDiv = document.getElementById('list-here');

let tasksRetrieved;

if(JSON.parse(localStorage.getItem('tasks'))==null){
    tasksRetrieved = [];
    localStorage.setItem('tasks',JSON.stringify(tasksRetrieved));
}
else{
    tasksRetrieved=JSON.parse(localStorage.getItem('tasks'));
}






area.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      // Call your function here
    
    }
});


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
            let arr = localStorage.getItem('tasks');
            arr = JSON.parse(arr);
            arr[i].id = `tasks${Ids}`;
            arr = JSON.stringify(arr);
            localStorage.setItem('tasks',arr);
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
                    tasksRetrievedArr = localStorage.getItem('tasks');
                    tasksRetrievedArr = JSON.parse(tasksRetrievedArr);
                    tasksRetrievedArr[i].isCheck = 1;
                    console.log("inside b2 if listern",this.checked,tasksRetrievedArr[i].isCheck);
                    let taskArrJSONStr = JSON.stringify(tasksRetrievedArr);
                    localStorage.setItem("tasks",taskArrJSONStr);
                }
                 else {
                    console.log("Checkbox is not checked..");
                    lineThroughFalse(checkBtnIdNum);
                    tasksRetrievedArr = localStorage.getItem('tasks');
                    tasksRetrievedArr = JSON.parse(tasksRetrievedArr);
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

                arrS.splice(findIndex(`tasks${dltBtnIdNum}`,arrS),1);
                console.log(findIndex(pTagOther.innerText,arrS,"< inside onload"));
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

function deleteTask(idNum){
    let taskDivIdStr = `list-div${idNum}`;
    let taskDiv = document.getElementById(taskDivIdStr);
    //console.log("delete alled > id >> ",taskDivIdStr);
    taskDiv.remove();
    loadData();
}



function eraseText() {
    if(area.value == ""){
        alert("Nothing to clear");
    }
    else{
        area.value = "";
    }
}

function removeExcessSpacesAndNewlines(str) {
    return str.replace(/[\s\n]+/g, ' ').trim();
}


loadData();