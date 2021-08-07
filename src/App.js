import React, {useState, useEffect} from "react"; 
import './App.css';

// Importing Components
import Form from "./components/Form"; 
import Todo from "./components/Todo";
import TodoList from "./components/TodoList"; 

function App() {
  // State
  const [ inputText, setInputText ] = useState(""); 
  const [ todos, setTodos ] = useState([]); 
  const [ status, setStatus ] = useState("all"); 
  const [ filteredTodos, setfilteredTodos ] = useState([]);
  
  // Use Effect
  useEffect(() => {
    getLocalTodos(); 
  }, []); 

  useEffect(() => {
    saveLocalTodos(); 
  }, [todos]); 

  useEffect(() => {
    filterHandler(); 
  }, [todos, status]); 


  // Function 
  const filterHandler = () => {
    switch(status) {
      case "completed" : 
        setfilteredTodos(todos.filter(todo => todo.completed === true)); 
        break;  
      case "uncompleted" : 
        setfilteredTodos(todos.filter(todo => todo.completed === false)); 
        break;
      default :
      setfilteredTodos(todos);  
       
    }
  }

  // Save Local
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos)); 
  }

  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([])); 
    }else { 
      let localTodo = JSON.parse(localStorage.getItem("todos"));
      setTodos(localTodo); 
    };
  }
  
  return (
    <div className="App">
      <header>
        <h1>You're Todo List</h1>
      </header>
      <Form todos={todos} setTodos={setTodos} inputText={inputText} setInputText={setInputText} setStatus={setStatus} />
      <TodoList setTodos={setTodos} todos={todos} filteredTodos={filteredTodos}/>
    </div>
  );
}

export default App;
