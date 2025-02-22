import { RootStore } from "./stores/RootStore";
import { StoreProvider } from "./stores/StoreContext";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";
import { TodoFilters } from "./components/TodoFilters";
import { CheckSquare } from "lucide-react";
import mobxVisualizer from "mobx-visualizer";
import { Username } from "./components/Username";
import { Settings } from "./components/Settings";

mobxVisualizer({ debug: true });

const rootStore = new RootStore();

function App() {
  return (
    <StoreProvider store={rootStore}>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto py-8 px-4">
          <div className="flex items-center justify-center mb-8">
            <CheckSquare className="w-8 h-8 text-blue-500 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">Todo App</h1>
          </div>

          <div className="max-w-md mx-auto space-y-6">
            <Settings />
            <Username />
            <TodoInput />
            <TodoList />
            <TodoFilters />
          </div>
        </div>
      </div>
    </StoreProvider>
  );
}

export default App;
