import { makeAutoObservable, runInAction } from "mobx";
import { RootStore } from "./RootStore";

export class UserStore {
  userId: number | null = null;
  username: string = "Guest";
  isLoading = false;
  error: string | null = null;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.fetchUserProfile();
  }

  async fetchUserProfile() {
    this.isLoading = true;
    this.error = null;

    try {
      // Simulate fetching user data
      await new Promise((resolve) => setTimeout(resolve, 800));
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      if (!response.ok) throw new Error("Failed to fetch user");
      const data = await response.json();

      runInAction(() => {
        this.userId = data.id;
        this.username = data.username;
      });

      // Simulate interaction with TodoStore
      this.rootStore.todoStore.addTodo(`Welcome task for ${this.username}`);
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error ? error.message : "Failed to fetch user";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async updateUsername(newUsername: string) {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${this.userId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ username: newUsername }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );

      if (!response.ok) throw new Error("Failed to update username");

      runInAction(() => {
        this.username = newUsername;
        // Interact with SettingsStore
        this.rootStore.settingsStore.logActivity(
          `Username changed to ${newUsername}`
        );
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error ? error.message : "Failed to update username";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
