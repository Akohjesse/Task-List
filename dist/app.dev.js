"use strict";

var form = document.getElementsByClassName("task")[0];
var taskInput = document.querySelector(".task-input");
var collection = document.querySelector('.task-collection');
var clearTasks = document.getElementById("clearBtn");
var filterInput = document.querySelector('.enter-filter'); //load all event listeners

loadEventListeners();

function loadEventListeners() {
  //DOM load event
  document.addEventListener("DOMContentLoaded", getTasks); //add Task event

  form.addEventListener("submit", addTask); //remove task event

  collection.addEventListener("click", removeTask); //clear tasks

  clearTasks.addEventListener("click", clearAllTask); //filter tasks

  filterInput.addEventListener("keyup", filterTask); //store tasks in local storage
}

function getTasks() {
  var tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(task));
    var deLink = document.createElement('a');
    deLink.innerHTML = "X";
    deLink.id = "delete";
    deLink.classList.add('delete-item');
    li.appendChild(deLink);
    li.className = "task-item";
    collection.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();
  var li = document.createElement('li');
  li.appendChild(document.createTextNode(taskInput.value));
  var deLink = document.createElement('a');
  deLink.innerHTML = "X";
  deLink.id = "delete";
  deLink.classList.add('delete-item');
  li.appendChild(deLink);
  li.className = "task-item";
  collection.appendChild(li);
  storeTasks(taskInput.value);
  form.reset();
}

function storeTasks(task) {
  var tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.classList.contains("delete-item")) {
    if (confirm('are you sure')) {
      e.target.parentElement.remove();
    } else {
      return false;
    } //remove from Local storage


    removeTaskFromLS(e.target.parentElement);
  }
}

function removeTaskFromLS(taskListItem) {
  var tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (item, index) {
    if (taskListItem.textContent === item + "X") {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearAllTask(e) {
  while (collection.firstChild) {
    collection.removeChild(collection.firstChild);
  }

  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTask(e) {
  var text = e.target.value;
  document.querySelectorAll(".task-item").forEach(function (task) {
    var item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text.toLowerCase()) > -1) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}