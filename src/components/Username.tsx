import { observer } from "mobx-react-lite";
import { useStore } from "../stores/StoreContext";

export const Username = observer(() => {
  const { userStore } = useStore();

  return (
    <div>
      <p>User: {userStore.isLoading ? "Loading..." : userStore.username}</p>
      <button
        onClick={() =>
          userStore.updateUsername(`User${Math.floor(Math.random() * 100)}`)
        }
        className="px-2 py-1 bg-blue-500 text-white rounded"
      >
        Change Username
      </button>
    </div>
  );
});
