import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';

function TaskManager() {
  // State variables to manage tasks and form inputs
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskGroup, setNewTaskGroup] = useState('');
  const [newTaskCompleted, setNewTaskCompleted] = useState(false);
  const [editTaskId, setEditTaskId] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  const [groupByGroup, setGroupByGroup] = useState(false); // State to track grouping by group
  const [taskAction, setTaskAction] = useState('Add task');

  useEffect(() => {
    // Fetch tasks on component mount
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      // Fetch tasks from the server
      const response = await axios.get('http://localhost:2912/tasks');
      // Update tasks state with fetched data
      setTasks(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addAndEditTask = async () => {
    // Function to add or edit a task
    if(newTaskTitle === '') {
      alert("Enter task name, please.");
    } else {
      if (taskAction === "Add task" && window.confirm('Are you sure you want to add this task?')) {
        try {
          // Add task
          const response = await axios.post('http://localhost:2912/tasks', {
            title: newTaskTitle,
            description: newTaskDescription,
            completed: newTaskCompleted,
            task_group: newTaskGroup
          });
          if (response.status === 200) {
            // Clear form inputs and fetch tasks
            setNewTaskTitle('');
            setNewTaskDescription('');
            setNewTaskCompleted(false);
            setNewTaskGroup('');
            fetchTasks();
          } else {
            console.error('Failed to add task. Status:', response.status);
          }
          alert(JSON.stringify(response.data.message));
        } catch (error) {
          console.error('Error adding task:', error);
          alert("Failed to add task, " + error);
        }
      } else if(window.confirm('Are you sure you want to edit this task?')) {
        // Edit task
        try {
          const response = await axios.put(`http://localhost:2912/tasks/${editTaskId}`, {
            title: newTaskTitle,
            description: newTaskDescription,
            completed: newTaskCompleted,
            task_group: newTaskGroup
          });
          if (response.status === 200) {
            // Clear form inputs, reset action, and fetch tasks
            setNewTaskTitle('');
            setNewTaskDescription('');
            setNewTaskCompleted(false);
            setNewTaskGroup('');
            setTaskAction('Add task');
            fetchTasks();
          } else {
            console.error('Failed to update task. Status:', response.status);
          }
          alert(JSON.stringify(response.data.message));
        } catch (error) {
          console.error('Error updating task:', error);
          alert("Failed to update task, " + error);
        }
      }
    }
  };

  const confirmDeleteTask = async (taskId) => {
    // Confirm task deletion
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(taskId);
    }
  };

  const deleteTask = async (taskId) => {
    // Delete task
    try {
      const response = await axios.delete(`http://localhost:2912/tasks/${taskId}`);
      // Fetch tasks after deletion
      fetchTasks();
      alert(JSON.stringify(response.data.message));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert("Failed to delete task." + error);
    }
  };

  const editTask = async (task) => {
    // Set task for editing
    setTaskAction("Save changes");
    setEditTaskId(task.id);
    setNewTaskTitle(task.title);
    setNewTaskDescription(task.description);
    setNewTaskCompleted(task.completed);
    setNewTaskGroup(task.task_group);
  };

  const toggleTaskDetails = (taskId) => {
    // Toggle task details
    if (editTaskId === taskId) {
      setEditTaskId('');
    } else {
      setEditTaskId(taskId);
    }
  };

  const filteredTasks = tasks.filter(task => {
    // Filter tasks based on completion status
    if (filterOption === 'completed') {
      return task.completed;
    } else if (filterOption === 'uncompleted') {
      return !task.completed;
    }
    return true;
  });

  // Group tasks by task group if selected
  const groupedTasks = groupByGroup
    ? filteredTasks.reduce((groups, task) => {
        const group = task.task_group;
        if (!groups[group]) {
          groups[group] = [];
        }
        groups[group].push(task);
        return groups;
      }, {})
    : { '': filteredTasks };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* Filters */}
      <div style={{ textAlign: 'left', width: '20%', marginRight: '10px', marginLeft: '10px' }}>
        <p style={{ fontSize: '24px', color: 'blue', fontWeight: 'bold' }}>Filters :</p>
        <select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed Tasks</option>
          <option value="uncompleted">Uncompleted Tasks</option>
        </select>
        <br />
        <br />
        {/* Checkbox to toggle grouping */}
        <label>
          Group by Group:
          <input
            type="checkbox"
            checked={groupByGroup}
            onChange={(e) => setGroupByGroup(e.target.checked)}
          />
        </label>
      </div>
      {/* Task list */}
      <div style={{ textAlign: 'center', width: '60%' }}>
        <div id="taskList" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '24px', color: 'blue', fontWeight: 'bold' }}>Task List :</p>
          <TaskList
            groupedTasks={groupedTasks}
            editTask={editTask}
            confirmDeleteTask={confirmDeleteTask}
            toggleTaskDetails={toggleTaskDetails}
            editTaskId={editTaskId}
          />
        </div>
      </div>
      {/* Task form */}
      <div style={{ textAlign: 'right', width: '20%', marginLeft: '10px', marginRight: '10px' }}>
        <div id="taskForm" style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '24px', color: 'blue', fontWeight: 'bold' }}>Task Manager:</p>
          <input
            type="text"
            placeholder="Enter task title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Enter task description"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
          />
          <br />
          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative' }}>
              <br />
              <select
                value={newTaskGroup}
                onChange={(e) => setNewTaskGroup(e.target.value)}
                style={{ position: 'absolute', right: '20px' }}
              >
                <option value="" disabled>Select the group</option>
                <option value="sport">Sport</option>
                <option value="learning">Learning</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </select>
            </div>
            <br />
            <br />
            {/* Checkbox for task completion */}
            <label style={{ position: 'relative', marginLeft:'130px' }}>
              Completed:
              <input
                type="checkbox"
                checked={newTaskCompleted}
                onChange={(e) => setNewTaskCompleted(e.target.checked)}
              />
            </label>
          </div>
          <br />
          {/* Button to add or edit task */}
          <button style={{ backgroundColor: 'green', color: 'white', padding: '8px 16px', borderRadius: '4px', marginRight: '40px' }} onClick={addAndEditTask}>{taskAction}</button>
        </div>
      </div>
    </div>
  );
}

export default TaskManager;
