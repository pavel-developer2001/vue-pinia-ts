<template>
  <main>
    <CreateTodo />
    <div v-if="!isLoading && !error">
      <div v-for="todo in todos" :key="todo.id">
        <TodoItem :todo="todo" />
      </div>
    </div>
    <div v-if="error">{{ error }}</div>
    <div v-if="isLoading">Loading...</div>
  </main>
</template>
<script setup lang="ts">
import { useTodoStore } from "@/stores/todo";
import { onMounted, toRefs } from "vue";
import TodoItem from "@/components/TodoItem.vue";
import CreateTodo from "../components/CreateTodo.vue";

const state = useTodoStore();
const { todos, error, isLoading } = toRefs(state);

onMounted(() => {
  state.getTodos();
});
</script>
