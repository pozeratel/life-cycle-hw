import { Component } from 'react';
import './TodoList.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inputValue: '',
    };
  }

  componentDidMount() {
    console.log('TodoList componentDidMount: завантаження даних з localStorage');
    try {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        const parsedTodos = JSON.parse(savedTodos);
        this.setState({ todos: parsedTodos });
        console.log('Завдання завантажені:', parsedTodos);
      }
    } catch (error) {
      console.error('Помилка при завантаженні завдань:', error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      console.log('TodoList componentDidUpdate: збереження завдань до localStorage');
      try {
        localStorage.setItem('todos', JSON.stringify(this.state.todos));
        console.log('Завдання збережені:', this.state.todos);
      } catch (error) {
        console.error('Помилка при збереженні завдань:', error);
      }
    }
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleAddTodo = () => {
    const { inputValue, todos } = this.state;
    
    if (inputValue.trim() === '') {
      alert('Будь ласка, введіть завдання');
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: new Date().toLocaleString('uk-UA'),
    };

    this.setState({
      todos: [...todos, newTodo],
      inputValue: '',
    });
  };

  handleDeleteTodo = (id) => {
    const { todos } = this.state;
    const updatedTodos = todos.filter(todo => todo.id !== id);
    this.setState({ todos: updatedTodos });
  };

  handleToggleTodo = (id) => {
    const { todos } = this.state;
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.setState({ todos: updatedTodos });
  };

  handleClearAll = () => {
    if (window.confirm('Ви впевнені, що хочете видалити всі завдання?')) {
      this.setState({ todos: [] });
    }
  };

  handleClearCompleted = () => {
    const { todos } = this.state;
    const updatedTodos = todos.filter(todo => !todo.completed);
    this.setState({ todos: updatedTodos });
  };

  render() {
    const { todos, inputValue } = this.state;
    const completedCount = todos.filter(todo => todo.completed).length;
    const remainingCount = todos.length - completedCount;

    return (
      <div className="todo-list-container">
        <h2>Мої завдання</h2>
        
        <div className="todo-input-section">
          <input
            type="text"
            value={inputValue}
            onChange={this.handleInputChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                this.handleAddTodo();
              }
            }}
            placeholder="Введіть нове завдання..."
            className="todo-input"
          />
          <button onClick={this.handleAddTodo} className="btn-add">
            ➕ Додати
          </button>
        </div>

        <div className="todo-stats">
          <span className="stat-item">
            📝 Усього: <strong>{todos.length}</strong>
          </span>
          <span className="stat-item">
            ✅ Завершено: <strong>{completedCount}</strong>
          </span>
          <span className="stat-item">
            ⏳ Залишилось: <strong>{remainingCount}</strong>
          </span>
        </div>

        <div className="todo-list">
          {todos.length === 0 ? (
            <p className="empty-message">Немає завдань. Додайте своє перше завдання!</p>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <div className="todo-checkbox-section">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => this.handleToggleTodo(todo.id)}
                    className="todo-checkbox"
                  />
                  <span className="todo-text">{todo.text}</span>
                </div>
                <div className="todo-meta">
                  <span className="todo-date">{todo.createdAt}</span>
                  <button
                    onClick={() => this.handleDeleteTodo(todo.id)}
                    className="btn-delete"
                    aria-label="Delete todo"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {todos.length > 0 && (
          <div className="todo-actions">
            {completedCount > 0 && (
              <button onClick={this.handleClearCompleted} className="btn-secondary">
                Видалити завершені
              </button>
            )}
            <button onClick={this.handleClearAll} className="btn-danger">
              Видалити усі
            </button>
          </div>
        )}

        <div className="todo-info">
          <p>
            💾 <strong>Інформація:</strong> Ваші завдання автоматично зберігаються в локальному сховищі браузера.
            Вони залишатимуться тут, навіть якщо ви закриєте браузер.
          </p>
        </div>
      </div>
    );
  }
}

export default TodoList;
