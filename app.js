const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")

todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("click", filterTodo)
document.addEventListener("DOMContentLoaded", getTodos)

function addTodo(event) {

    //prevent from submitting
    event.preventDefault()

    //create div element called todoDiv with class todo
    const todoDiv = document.createElement("div")  //create new element, refer HTML DOM
    todoDiv.classList.add("todo")
    
    //create li element called newTodo with class todo-item
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value  //innerText, innerHTML, and textContent  //todoInput (input element) has value property
    newTodo.classList.add('todo-item')  //returns the class name(s), read-only but can modify using add or remove 
    
    //add newTodo as child of todoDiv
    todoDiv.appendChild(newTodo)  //appends a node as last child node
    
    //Add todo to local storage
    saveLocalTodos(todoInput.value)

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
        removeLocalStorage(parent)
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

function saveLocalTodos(todo) {
    let todos

    if(localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))

}

function getTodos() {
    let todos

    if(localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div")  //create new element, refer HTML DOM
        todoDiv.classList.add("todo")
        
        //create li element called newTodo with class todo-item
        const newTodo = document.createElement('li')
        newTodo.innerText = todo  //innerText, innerHTML, and textContent
        newTodo.classList.add('todo-item')  //returns the class name(s), read-only but can modify using add or remove 
        
        //add newTodo as child of todoDiv
        todoDiv.appendChild(newTodo)  //appends a node as last child node
        
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
    })

}

function removeLocalStorage(todo) {
    let todos

    if(localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    
    const element = todo.children[0].innerText
    todos.splice(todos.indexOf(element), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}
