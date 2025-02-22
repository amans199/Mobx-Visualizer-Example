import { TodoStore } from "./TodoStore";
import { UserStore } from "./UserStore";
import { SettingsStore } from "./SettingsStore";

export class RootStore {
  todoStore: TodoStore;
  userStore: UserStore;
  settingsStore: SettingsStore;

  constructor() {
    this.todoStore = new TodoStore(this);
    this.userStore = new UserStore(this);
    this.settingsStore = new SettingsStore(this);
  }
}
