from flask import jsonify, request
from constants import *


# API Endpoints

# Endpoint to fetch all tasks from the database
@app.route('/tasks', methods=['GET'])
def get_tasks():
    # Establish connection and cursor
    cur = mysql.connection.cursor()
    # Execute SQL query to select all tasks
    cur.execute("SELECT * FROM tasks")
    # Fetch all tasks from the database
    tasks = cur.fetchall()
    # Close cursor
    cur.close()
    # Convert tasks to JSON format
    task_list = []
    for task in tasks:
        task_dict = {
            "id": task[0],  
            "title": task[1],  
            "description": task[2],
            "completed": task[3],
            "task_group": task[4]
        }
        task_list.append(task_dict)
    # Return JSON response
    return jsonify(task_list)

# Endpoint to create a new task
@app.route('/tasks', methods=['POST'])
def create_task():
    # Extract data from request JSON
    data = request.json
    title = data['title']
    description = data['description']
    completed = data['completed']
    task_group = data['task_group']
    # If task group is empty, set it to 'other'
    if task_group == '':
        task_group = 'other'
    # Establish connection and cursor
    cur = mysql.connection.cursor()
    # Execute SQL query to insert a new task
    cur.execute("INSERT INTO tasks (title, description, completed, task_group) VALUES (%s, %s, %s, %s)", (title, description, completed, task_group))
    # Commit changes
    mysql.connection.commit()
    # Close cursor
    cur.close()
    # Return success message
    return jsonify({"message": "Task created successfully"})

# Endpoint to update an existing task
@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    # Extract data from request JSON
    data = request.json
    title = data['title']
    description = data['description']
    completed = data['completed']
    task_group = data['task_group']
    # Establish connection and cursor
    cur = mysql.connection.cursor()
    # Execute SQL query to update the task with the given ID
    cur.execute("UPDATE tasks SET title = %s, description = %s, completed = %s, task_group = %s WHERE id = %s", (title, description, completed, task_group, id))
    # Commit changes
    mysql.connection.commit()
    # Close cursor
    cur.close()
    # Return success message
    return jsonify({"message": "Task updated successfully"})

# Endpoint to delete an existing task
@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    # Establish connection and cursor
    cur = mysql.connection.cursor()
    # Execute SQL query to delete the task with the given ID
    cur.execute("DELETE FROM tasks WHERE id = %s", (id,))
    # Commit changes
    mysql.connection.commit()
    # Close cursor
    cur.close()
    # Return success message
    return jsonify({"message": "Task deleted successfully"})

if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True, port=2912)
