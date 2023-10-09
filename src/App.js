import React, { useEffect, useState } from 'react';
import { List } from './components/List';
import axios from "axios"
import { baseURL } from './utils/constant';

const App = () => {

const [input, setInput] = useState("");
const [tasks, setTasks] = useState([]);
const [updateUI, setUpdateUI] = useState(false);
const [updateId, setUpdateId] = useState(null);

useEffect(()=> {
  axios.get(`${baseURL}/get`)
  .then((res)=> {
    console.log(res.data);
    setTasks(res.data);
  })
},[updateUI]);

const addTask = () => {
  axios.post(`${baseURL}/save`,{task:input}).then((res) => {
    console.log(res.data);
    setInput("");
    setUpdateUI((prevState) => !prevState);
  });
}

const updateMode = (id, text) => {
  console.log(text);
  setInput(text);
  setUpdateId(id);
}

const updateTask = () => {
  axios.put(`${baseURL}/update/${updateId}`,{task: input}).then((res)=>{
    console.log(res.data);
    setUpdateUI((prevState)=> !prevState);
    setUpdateId(null);
    setInput("");
  });
};


  return <main>

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <BrowserRouter>
        <Routes>
            <Route path = '/' element={<CompShowBlogs/>}/>
            <Route path = '/create' element={<CompCreateBlog/>}/>
            <Route path = '/edit/:id' element={<CompEditBlog/>}/>
        </Routes>
      </BrowserRouter>

    </div>



    <h1 className="title"> CRUD Mongo + NodeJS + React </h1>    
    <div>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
      />

      <button type='submit' onClick={updateId ? updateTask : addTask}>
        {updateId ? "Actualizar Tarea" : "Agregar Tarea"}
      </button>

      <ul>
        {tasks.map((task) => (
          <List 
            key={task._id} 
            id={task._id} 
            task={task.task}
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}>
          </List>
        ))}
      </ul>
    </div>
  </main>
  };

export default App;