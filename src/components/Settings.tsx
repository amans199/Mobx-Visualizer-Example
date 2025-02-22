import { observer } from "mobx-react-lite";
import { useStore } from "../stores/StoreContext";

export const Settings = observer(() => {
  const { settingsStore } = useStore();

  return (
    <div>
      <p>Theme: {settingsStore.theme}</p>
      <button
        onClick={() => settingsStore.toggleTheme()}
        className="px-2 py-1 bg-green-500 text-white rounded"
      >
        Toggle Theme
      </button>
    </div>
  );
});
