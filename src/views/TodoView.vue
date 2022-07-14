<template lang="">
  <router-link to="/">Назад</router-link>
  <div v-if="isLoading">Loading...</div>
  <div v-if="error">{{ error }}</div>
  <div v-if="!isLoading && !error && !isEdit">
    <div>id: {{ todo.id }}</div>
    <p>{{ todo.text }}</p>
    <button @click="isEdit = true">Edit</button>
    <button @click="deleteTodo">Delete</button>
  </div>
  <div v-if="isEdit">
    <form @submit.prevent>
      <input placeholder="enter text" v-model="text" />
      <button @click="updateTodo">Update</button>
      <button @click="isEdit = false">Cancel</button>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { useTodoStore } from "@/stores/todo";
import { onMounted, ref, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const isEdit = ref(false);
const text = ref("");

const stateTodo = useTodoStore();
const { todo, isLoading, error } = toRefs(stateTodo);

onMounted(async () => {
  await stateTodo.getTodo(route.params.id as string);
  text.value = todo.value.text;
});

const updateTodo = () => {
  if (!text.value) return alert("Enter text!");
  const newTodo = { id: todo.value.id, text: text.value };
  stateTodo.updateTodo(newTodo);
  isEdit.value = false;
};

const deleteTodo = () => {
  if (confirm("You want delete todo?")) {
    stateTodo.deleteTodo(todo.value.id);
    router.push("/");
  }
};
</script>
<style lang=""></style>
