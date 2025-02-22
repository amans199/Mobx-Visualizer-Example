import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/StoreContext';
import { CheckCircle2, Circle, Trash2, Loader2 } from 'lucide-react';

export const TodoList = observer(() => {
  const { todoStore } = useStore();

  if (todoStore.isLoading && todoStore.todos.length === 0) {
    return (
      <div className="w-full max-w-md flex justify-center p-8">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (todoStore.error) {
    return (
      <div className="w-full max-w-md bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{todoStore.error}</p>
      </div>
    );
  }

  if (todoStore.filteredTodos.length === 0) {
    return (
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm text-center">
        <p className="text-gray-500">No todos found</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="space-y-2">
        {todoStore.filteredTodos.map(todo => (
          <div
            key={todo.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-3 flex-1">
              <button
                onClick={() => todoStore.toggleTodo(todo.id)}
                className="text-blue-500 hover:text-blue-600 flex-shrink-0"
                disabled={todoStore.isLoading}
              >
                {todo.completed ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
              <div className="flex flex-col min-w-0">
                <span className={`truncate ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                  {todo.text}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(todo.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button
              onClick={() => todoStore.removeTodo(todo.id)}
              className="text-red-500 hover:text-red-600 ml-2 flex-shrink-0"
              disabled={todoStore.isLoading}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});