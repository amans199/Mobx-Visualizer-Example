import { makeAutoObservable, runInAction } from "mobx";
import { RootStore } from "./RootStore";

export class SettingsStore {
  theme: "light" | "dark" = "light";
  activityLog: string[] = [];
  isLoading = false;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  toggleTheme() {
    this.theme = this.theme === "light" ? "dark" : "light";
    this.logActivity(`Theme switched to ${this.theme}`);
    // Interact with TodoStore based on theme
    if (this.theme === "dark") {
      this.rootStore.todoStore.addTodo("Test dark mode");
    }
  }

  logActivity(message: string) {
    runInAction(() => {
      this.activityLog.push(`${new Date().toLocaleTimeString()}: ${message}`);
      if (this.activityLog.length > 10) {
        this.activityLog.shift(); // Keep only last 10 entries
      }
    });
  }

  async saveSettings() {
    this.isLoading = true;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
      this.logActivity("Settings saved");
    } catch (error) {
      this.logActivity("Failed to save settings");
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
