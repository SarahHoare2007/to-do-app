document.addEventListener('DOMContentLoaded', function () {
    console.log("I am here")
    let taskList = [];
    alert("oops")

    const fetchTasks = async () => {
        const response = await fetch("http://todocraft.ddev.site/tasks.json");
        const tasks = await response.json();

        if (tasks?.data) {
            taskList = tasks.data;

            taskList.forEach((task, index) => {
                addTask(task.name);
            })
        }
    }

    fetchTasks();

    document.getElementById('add-task').addEventListener('click', function (event) {
        event.preventDefault();
        console.log(event);
        var taskValue = document.getElementById('new-task').value;
        console.log("TASK VALUE", taskValue);

        if (taskValue) {
            addTask(taskValue);
        }
    });


    var taskNumber = 0;
    function addTask(taskValue) {
        var li = document.createElement('li');
        li.setAttribute("id", `task-${taskNumber}`);

        //span for text value
        var taskSpan = document.createElement('div');
        taskSpan.textContent = taskValue;
        taskSpan.setAttribute("id", `task-label-${taskNumber}`)
        taskSpan.classList.add("task-label");
        li.appendChild(taskSpan);

        console.log(li);

        // Create delete button 
        var actions = document.createElement('div')
        actions.classList.add("task-actions");

        createDeleteButton(li, actions);

        // Create edit button
        createEditButton(li, actions, taskValue);
        li.appendChild(actions);

        //complete task
        li.addEventListener('click', function () {
            completeTask(li);
        });

        // add new task
        document.getElementById('task-list').appendChild(li);

        taskNumber++;
    }

    function completeTask(li) {
        li.classList.toggle('completed');
    }
    //delete button function
    function createDeleteButton(li, actions) {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete"
        deleteButton.type = "button";
        deleteButton.onclick = function (event) {
            li.parentNode.removeChild(li);
            alert("wimp")
        }
        actions.replaceChildren(deleteButton);

    }
    // edit button function
    function createEditButton(li, actions, taskValue) {
        var editButton = document.createElement('button');
        editButton.textContent = "Edit"
        editButton.type = "button";
        editButton.onclick = function (event) {
            editTask(li, taskValue);
            alert("spell it right this time");
        }
        actions.appendChild(editButton);
    }

    function saveTask(li, taskValue) {
        console.log("I am saving");
        var label = li.querySelector('.task-label');

        label.textContent = taskValue;

        var actions = li.querySelector(".task-actions");

        createDeleteButton(li, actions);

        createEditButton(li, actions, taskValue)
    }

    //make cancel button work
    function cancelTask(li, taskValue) {
        var label = li.querySelector(".task-label");

        label.textContent = taskValue;

        var actions = li.querySelector(".task-actions");

        createDeleteButton(li, actions);

        createEditButton(li, actions, taskValue)
    }

    function editTask(li, taskValue) {
        var label = li.querySelector(".task-label");
        var actions = li.querySelector(".task-actions");
        var editInput = document.createElement('input');
        editInput.type = "text";
        editInput.value = taskValue;
        label.replaceChildren(editInput);

        //cancel button
        var cancelButton = document.createElement('button');
        cancelButton.textContent = "cancel"
        cancelButton.type = "button";
        cancelButton.onclick = function (event) {
            cancelTask(li, taskValue);
        }
        actions.replaceChildren(cancelButton);
        // Create save button
        var saveButton = document.createElement('button');
        saveButton.textContent = "save"
        saveButton.type = "button";
        saveButton.onclick = function (event) {
            var newTaskValue = editInput.value;
            saveTask(li, newTaskValue);
        }
        actions.appendChild(saveButton);
    }


});