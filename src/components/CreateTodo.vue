<template>
  <form @submit.prevent="addTodo">
    <input placeholder="enter text" v-model="text" />
    <button type="submit">Add</button>
  </form>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { nanoid } from "nanoid";
import { useTodoStore } from "@/stores/todo";

const stateTodo = useTodoStore();

const text = ref("");
const addTodo = () => {
  if (!text.value) return alert("Enter text!");
  const newTodo = { id: nanoid(), text: text.value };
  stateTodo.addTodo(newTodo);
  text.value = "";
};
</script>
<style lang=""></style>
