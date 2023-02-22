import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    return savedTasks || [];
  });
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [showButton, setShowButton] = useState(false)
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  const [boldButton, setBoldButton] = useState("")

  const onClickButton = (item) => {
    setBoldButton(item)
    if(item === 'completed') {
      setShowButton(true)
    }
    else {
      setShowButton(false)
    }
  }
  
  const handleNewTask = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    if (newTask.trim() !== '') {
      setTasks([...tasks, {id: crypto.randomUUID(), name: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleToggleTaskCompletion = (id) => {
    const newTasks = [...tasks].map(t =>{
      if (t.id === id) {
        return {
          ...t, completed :!t.completed
        }
      }
      else{
        return t
      }
    })
    
    setTasks(newTasks);
  };

  const handleClear = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  let filteredTasks;
  if (filter === 'all') {
    filteredTasks = tasks;
  } else if (filter === 'active') {
    filteredTasks = tasks.filter((task) => !task.completed);
  } else if (filter === 'completed') {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  return (
    <div className='w-[500px] mx-[auto]'>
      <h1 className='text-center text-[50px] mb-[30px]'>TO DO LIST</h1>
      <div className='flex justify-around mb-[20px] border-b  border-gray-500 pb-[10px]'>
        <button className='text-white bg-gray-500 rounded-[5px] w-[100px] '
        style={{backgroundColor: boldButton === "all" ? "black" : ""}} 
        onClick={() => [setFilter('all'), onClickButton('all')]}>
          ALL
        </button>
        <button className='text-white bg-gray-500 rounded-[5px] w-[100px] '
        style={{backgroundColor: boldButton === "active" ? "black" : ""}} 
        onClick={() => [setFilter('active'), onClickButton('active')]}>
          ACTIVE
        </button>
        <button  className='text-white bg-gray-500 rounded-[5px] w-[100px] '
        style={{backgroundColor: boldButton === "completed" ? "black" : ""}} 
        onClick={() => [setFilter('completed'), onClickButton('completed')]}>
          COMPLETED
        </button>
      </div>
      <form onSubmit={handleAddTask} className="flex mb-[20px]">
        <input type="text" value={newTask} onChange={handleNewTask} className="border border-black rounded-[5px] w-full" />
        <button type="submit" className='bg-blue-200 rounded-[5px] ml-[5px] w-[50px] text-white hover:bg-gray-500'>ADD</button>
      </form>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} className="mb-[10px] text-[20px]">
            <input type="checkbox" 
            id={task.id}
            checked={task.completed} 
            onChange={() => handleToggleTaskCompletion(task.id)}
            className="mr-[20px]"/>
            <label htmlFor={task.id}>{task.name}</label>
            
          </li>
        ))}
      </ul>
      {showButton && 
        <button onClick={handleClear}
        className="bg-red-600 hover:bg-gray-500 rounded-[5px] w-[100px] mt-[20px] "> 
          Clear All
        </button>
      }
      
    </div>
  );
}

export default App;