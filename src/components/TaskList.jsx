import React, { useState, useEffect } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (taskInput === '') {
      alert('Add a task');
      return;
    }else{
    const newTask = { id: new Date().getTime(), task: taskInput };
    setTasks([...tasks, newTask]);
    setTaskInput('');
    }
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="">
            <div className="row">
              <p className="col-5 text-center">Skills</p>
              <form className="col-7" style={{paddingLeft:"0",paddingRight:"0"}}>
                <div className="input-group mt-3">
                  <input 
                    type="text"
                    className="form-control"
                    placeholder="Your skills"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                  />
                  <button onClick={addTask}className="btn btn-primary">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className='row'>
            <div className='col-5'></div>
            <div className="col-7 card shadow mt-3">
              <div className="card-body" style={{padding:"0",paddingTop:"0.7rem"}}>
                <h5 className="card-title">Task List</h5>
                <ul className="list-group">
                  {tasks.map((task) => (
                    <li key={task.id} style={{padding:"0.25rem 0.5rem",marginBottom:"0.25rem"}}className="list-group-item d-flex justify-content-between">
                      {task.task}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeTask(task.id)}
                      >
                        <i >x</i>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              {tasks.length > 0 && (
                <div className="card-footer">
                  <button className="btn btn-secondary btn-sm" onClick={clearTasks}>
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;