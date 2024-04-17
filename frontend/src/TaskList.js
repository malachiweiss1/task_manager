// TaskList.js

import React from 'react';
import TaskColumn from './TaskColumn';

// Component for rendering a list of task columns
const TaskList = ({ groupedTasks, editTask, confirmDeleteTask, toggleTaskDetails, editTaskId }) => {
  return (
    // Flex container for displaying task columns side by side
    <div style={{ display: 'flex' }}>
      {/* Mapping through grouped tasks to render each task column */}
      {Object.keys(groupedTasks).map(group => (
        <TaskColumn
          key={group} // Unique key for each task column
          group={group} // Group/category of tasks for the column
          tasks={groupedTasks[group]} // Tasks to be displayed in the column
          editTask={editTask} // Function for editing a task
          confirmDeleteTask={confirmDeleteTask} // Function for confirming deletion of a task
          toggleTaskDetails={toggleTaskDetails} // Function for toggling task details
          editTaskId={editTaskId} // ID of the task being edited
        />
      ))}
    </div>
  );
};

export default TaskList; // Exporting the TaskList component
