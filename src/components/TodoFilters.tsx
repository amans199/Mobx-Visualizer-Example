import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/StoreContext';

export const TodoFilters = observer(() => {
  const { todoStore } = useStore();

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-sm space-y-4 sm:space-y-0">
        <div className="flex space-x-4 text-sm text-gray-600">
          <span>{todoStore.remainingTodos} items left</span>
          <span>•</span>
          <span>{todoStore.completedTodos} completed</span>
        </div>
        <div className="flex space-x-2">
          {(['all', 'active', 'completed'] as const).map(filter => (
            <button
              key={filter}
              onClick={() => todoStore.setFilter(filter)}
              className={`px-3 py-1 rounded-md ${
                todoStore.filter === filter
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});