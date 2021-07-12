const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")

todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("click", filterTodo)

function addTodo(event) {

    //prevent from submitting
    event.preventDefault()

    //create div element called todoDiv with class todo
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")
    
    //create li element called newTodo with class todo-item
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item')
    
    //add newTodo as child of todoDiv
    todoDiv.appendChild(newTodo)

    //create mark button
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton)
    
    //create trash button
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)

    todoList.appendChild(todoDiv)

    todoInput.value = ""
}

function deleteCheck(e) {
    const item = e.target
    console.log(item)

    if(item.classList[0] === "trash-btn") {
        const parent = item.parentElement
        parent.classList.add("fall")
        parent.addEventListener('transitionend', function(){
            parent.remove()
        })
    }

    if(item.classList[0] === "complete-btn") {
        const parent = item.parentElement
        parent.classList.toggle("completed")
        const trashButton = parent.querySelector("trash-btn")
        
    }
    
}

function filterTodo(e) {
    const todos = todoList.childNodes
    console.log(todos);

    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex"
                break
            case "completed":
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break
            case "uncompleted":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break
        }
    })
}