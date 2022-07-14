<template>
  <router-link :to="todo.id">{{ todo.text }}</router-link>
</template>

<script lang="ts" setup>
import type { ITodo } from "@/models/ITodo";

const { todo } = defineProps<{ todo: ITodo }>();
</script>
<style lang=""></style>
