"use strict";

const small = document.querySelector("small");
const add_btn = document.getElementById("add-todo");
const list_box = document.getElementById("todo-list");
let input = document.getElementById("todo-text");

let id = 0;
let todo = [];

input.onfocus = hideError;

add_btn.onclick = addTodo;

if (localStorage.getItem("todo") !== null) {
    todo = JSON.parse(localStorage.getItem("todo"));
    let len = todo.length;
    if (len > 0) {
        id = todo[todo.length - 1];
        displayTodo(todo);
    } else {
        list_box.innerHTML = "<h1>No Todo Added</h1>";
    }
} else {
    list_box.innerHTML = "<h1>No Todo Added</h1>";
}

function addTodo(e) {
    e.preventDefault();

    if (input.value == "") {
        small.style.opacity = 1;
        input.style.borderColor = "#E74C3C";
    } else {
        hideError();

        id++;
        let obj = { text: input.value };
        todo.push(obj);
        localStorage.setItem("todo", JSON.stringify(todo));

        // input.blur();
        input.value = "";

        displayTodo(todo);
    }
}

function displayTodo(todo) {
    list_box.innerHTML = "";
    todo.forEach((obj, id) => {
        let html = `<span id="todo-${id}">
                        <p>${id + 1}. ${obj.text}</p>
                        <img onclick="removeTodo(${id})" src="./delete.png" alt="delete icon" title="Delete" />
                    </span>`;
        list_box.insertAdjacentHTML("beforeend", html);
    });
}

function removeTodo(id) {
    const item = document.getElementById(`todo-${id}`);
    item.remove();
    todo.splice(id, 1);

    localStorage.setItem("todo", JSON.stringify(todo));

    if (todo.length === 0) {
        list_box.innerHTML = "<h1>No Todo Added</h1>";
    } else {
        displayTodo(todo);
    }
}

function removeAll() {
    todo.length = 0;
    localStorage.removeItem("todo");
    list_box.innerHTML = "<h1>No Todo Added</h1>";
}

function hideError() {
    small.style.opacity = 0;
    input.style.borderColor = "#3298db";
}
