import "./App.css";
import Modal from "./components/Modal/Modal";
import TodoList from "./components/TodoList/TodoList";
import Timer from "./components/Timer/Timer";

function App() {
  return (
    <>
      <Modal />
      <TodoList />
      <Timer />
    </>
  );
}

export default App;
