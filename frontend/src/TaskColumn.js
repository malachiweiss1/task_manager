// TaskColumn.js

import React from 'react';
import Task from './Task';

// TaskColumn component takes in props:
// - group: the title of the task group
// - tasks: an array of tasks to display in this column
// - editTask: a function to handle editing a task
// - confirmDeleteTask: a function to handle confirming deletion of a task
// - toggleTaskDetails: a function to handle toggling task details
// - editTaskId: the ID of the task currently being edited (if any)
const TaskColumn = ({ group, tasks, editTask, confirmDeleteTask, toggleTaskDetails, editTaskId }) => {
  return (
    <div style={{ flex: 1, marginRight: '20px' }}>
      {/* Display the group title */}
      <h3>{group}</h3>
      {/* Map through the tasks array and render a Task component for each task */}
      {tasks.map(task => (
        <Task
          key={task.id} // Set a unique key for each Task component
          task={task} // Pass the task object as prop to Task component
          editTask={editTask} // Pass the editTask function as prop
          confirmDeleteTask={confirmDeleteTask} // Pass the confirmDeleteTask function as prop
          toggleTaskDetails={toggleTaskDetails} // Pass the toggleTaskDetails function as prop
          isEditing={editTaskId === task.id} // Check if the current task is being edited and pass it as prop
        />
      ))}
    </div>
  );
};

export default TaskColumn;
