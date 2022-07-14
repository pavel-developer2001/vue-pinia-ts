import type { ITodo } from "@/models/ITodo";
import TodoApi from "@/services/todo-api";
import { defineStore } from "pinia";

interface TodoState {
  todos: ITodo[];
  todo: {} | ITodo;
  isLoading: boolean;
  error: string;
}

export const useTodoStore = defineStore({
  id: "todo",
  state: () =>
    ({
      todos: [],
      todo: {},
      isLoading: true,
      error: "",
    } as TodoState),
  actions: {
    async getTodos() {
      try {
        const data = await TodoApi.getTodos();
        this.todos = data.data;
        this.isLoading = false;
      } catch (error) {
        this.error = (error as Error).message;
        this.isLoading = false;
      }
    },
    async getTodo(id: string) {
      try {
        const data = await TodoApi.getTodo(id);
        this.todo = data.data;
        this.isLoading = false;
      } catch (error) {
        this.error = (error as Error).message;
        this.isLoading = false;
      }
    },
    async addTodo(todo: ITodo) {
      try {
        this.isLoading = true;
        const data = await TodoApi.createTodo(todo);
        this.todos.push(data.data);
        this.isLoading = false;
      } catch (error) {
        this.error = (error as Error).message;
        this.isLoading = false;
      }
    },
    async updateTodo(todo: ITodo) {
      try {
        const data = await TodoApi.updateTodo(todo);
        this.todo = data.data;
      } catch (error) {
        this.error = (error as Error).message;
      }
    },
    async deleteTodo(id: string) {
      try {
        await TodoApi.removeTodo(id);
        this.todos = this.todos.filter((item) => item.id !== id);
      } catch (error) {
        this.error = (error as Error).message;
      }
    },
  },
});
