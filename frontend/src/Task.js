import React from 'react';

// Task component takes in props: task object, editTask function, confirmDeleteTask function,
// toggleTaskDetails function, and isEditing boolean indicating whether task details are being edited
const Task = ({ task, editTask, confirmDeleteTask, toggleTaskDetails, isEditing }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      {/* Display task title with background color based on completion status,
          and toggleTaskDetails function is called onClick */}
      <div style={{ backgroundColor: task.completed ? 'green' : 'purple', padding: '8px', borderRadius: '4px', display: 'inline-block', cursor: 'pointer' }} onClick={() => toggleTaskDetails(task.id)}>{task.title}</div>
      {/* Display task details only if isEditing is true */}
      {isEditing && (
        <div>
          {/* Display task ID */}
          <p>ID: {task.id}</p>
          {/* Display task description */}
          <p>Description: {task.description}</p>
          {/* Display task group */}
          <p>Group: {task.task_group}</p>
          {/* Display task completion status */}
          <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
          {/* Button to trigger editTask function */}
          <button onClick={() => editTask(task)}>Edit</button>
          {/* Button to trigger confirmDeleteTask function */}
          <button onClick={() => confirmDeleteTask(task.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Task;
