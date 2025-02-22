import { makeAutoObservable, runInAction } from "mobx";
import { RootStore } from "./RootStore";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export class TodoStore {
  todos: Todo[] = [];
  filter: "all" | "active" | "completed" = "all";
  isLoading = false;
  error: string | null = null;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.fetchTodos();
  }

  async fetchTodos() {
    this.isLoading = true;
    this.error = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=5"
      );
      if (!response.ok) throw new Error("Failed to fetch todos");
      const data = await response.json();

      runInAction(() => {
        this.todos = data.map((todo: any) => ({
          id: todo.id,
          text: todo.title,
          completed: todo.completed,
          createdAt: new Date(),
        }));
        this.rootStore.settingsStore.logActivity("Todos fetched");
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error ? error.message : "An error occurred";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async addTodo(text: string) {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          body: JSON.stringify({
            title: text,
            completed: false,
            userId: this.rootStore.userStore.userId || 1,
          }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );

      if (!response.ok) throw new Error("Failed to add todo");
      const data = await response.json();

      runInAction(() => {
        this.todos.push({
          id: data.id,
          text: text,
          completed: false,
          createdAt: new Date(),
        });
        this.rootStore.settingsStore.logActivity(`Todo added: ${text}`);
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error ? error.message : "Failed to add todo";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
  async toggleTodo(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) return;

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            completed: !todo.completed,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to update todo");

      runInAction(() => {
        todo.completed = !todo.completed;
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error ? error.message : "Failed to update todo";
      });
    }
  }

  async removeTodo(id: number) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete todo");

      runInAction(() => {
        const index = this.todos.findIndex((todo) => todo.id === id);
        if (index !== -1) {
          this.todos.splice(index, 1);
        }
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error ? error.message : "Failed to delete todo";
      });
    }
  }

  setFilter(filter: "all" | "active" | "completed") {
    this.filter = filter;
  }

  get filteredTodos() {
    switch (this.filter) {
      case "active":
        return this.todos.filter((todo) => !todo.completed);
      case "completed":
        return this.todos.filter((todo) => todo.completed);
      default:
        return this.todos;
    }
  }

  get remainingTodos() {
    return this.todos.filter((todo) => !todo.completed).length;
  }

  get completedTodos() {
    return this.todos.filter((todo) => todo.completed).length;
  }
}
