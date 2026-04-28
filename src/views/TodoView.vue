<script setup>
import { ref } from 'vue'

let id = 0

const newTodo = ref('')
const hideCompleted = ref(false)
const todos = ref([
  { id: id++, text: 'Изучить HTML', done: true },
  { id: id++, text: 'Изучить JavaScript', done: true },
  { id: id++, text: 'Изучить Vue', done: false },
])

function addTodo() {
  todos.value.push({ id: id++, text: newTodo.value, done: false })
  newTodo.value = ''
}

function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t !== todo)
}
</script>

<template>
  <div class="list-wrapper">
    <div class="list">
      <form @submit.prevent="addTodo">
        <div class="list-header">
          <input v-model="newTodo" required placeholder="new todo" class="add-input" />
          <button class="add-task-btn">Добавить задачу</button>
        </div>
      </form>
      <ul class="list-content">
        <li v-for="todo in todos" :key="todo.id" class="list-item">
          <div class="list-item-left">
            <input type="checkbox" v-model="todo.done" />
            <span :class="{ done: todo.done }">{{ todo.text }}</span>
          </div>

          <button @click="removeTodo(todo)">X</button>
        </li>
      </ul>
      <button @click="hideCompleted = !hideCompleted" class="task-btn">
        {{ hideCompleted ? 'Показать все' : 'Скрыть выполненные' }}
      </button>
    </div>
  </div>
</template>

<style>
.list-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;

  border-radius: 10px;
  font-size: 18px;
}
.list-header {
  display: flex;
  gap: 10px;
}

.add-input,
.task-btn {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #939593;
  outline: none;
  font-size: 16px;
}

.add-task-btn {
  cursor: pointer;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.list-content {
  padding: 0;
}

.list-item {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;
}

.list-item-left {
  display: flex;
  gap: 20px;
}

.done {
  text-decoration: line-through;
}

@media (min-width: 1024px) {
  .list {
    min-height: 100vh;
    display: flex;
    align-items: center;
    text-transform: uppercase;
  }
}
</style>
