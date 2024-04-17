# Developer Home Assignment

Homework for a programmer position at Tech-19

## **Developer Test: Building a Database, API, and Frontend Application**

> ### Task Overview:

You are tasked with creating a simple web application that allows users to manage a list of tasks. This application should consist of three main components: a database to store task data, an API to interact with the database, and a basic frontend application to provide a user interface.

> ### Requirements:

1. **Database:**
   
- Use any SQL database of your choice (e.g., PostgreSQL, MySQL).
- Create a table named `tasks` the following columns:
  - id (integer, primary key)
  - title (string)
  - description (text)
  - completed (boolean)

2. **API:**
   
- Build a Python-based API using a framework of your choice (e.g., Flask, Django, FastAPI).
- The API should have the following endpoints:
  - GET /tasks: Retrieve a list of all tasks.
  - GET /tasks/{id}: Retrieve details of a specific task by its ID.
  - POST /tasks: Create a new task.
  - PUT /tasks/{id}: Update an existing task by its ID.
  - DELETE /tasks/{id}: Delete a task by its ID.

- Ensure proper error handling and return appropriate status codes.

3. **Frontend:**
   
- Use any frontend framework or library of your choice (e.g., React, Angular, Vue.js).
- Create a user interface that allows users to:
  - View a list of tasks.
  - Add a new task.
  - Edit an existing task (including marking it as completed).
  - Delete a task.
- Make API calls to interact with the backend.

4. **Documentation:**
   
- Provide clear and concise documentation for your code.
- Include instructions on how to set up and run the application locally.
- Describe the database schema and API endpoints.
- Include any additional information that may be useful for someone reviewing or using your code.

5. **Extra Points (Optional):**
   
- Implement user authentication for adding, editing, and deleting tasks.
- Implement sorting or filtering options for the task list.
- Implement the ability to link tasks into groups or categories.

6. **Guidelines:**

- You have the creative freedom to choose the specific technologies and libraries you use for this task.
- You are encouraged to use best practices for code structure, readability, and maintainability.
- If you encounter any challenges or limitations, feel free to document them in your code and suggest possible solutions.

7. **Submission:**

- To submit your work, please follow these steps:

  1. Fork the provided repository.
  2. Create a new branch in your fork for this task. You can name it something descriptive like `task-solution`.
  3. Make your changes on this branch, following the requirements and guidelines provided in the task.
  4. Ensure that your code is well-documented and adheres to best practices.
  5. Test your application locally to verify that it functions as expected.
  6. Commit your changes to the branch with clear and concise commit messages.
  7. Once you are satisfied with your solution, push the branch to your forked repository.
  8. Open a Pull Request (PR) from your `task-solution` branch to the main branch of the original repository.

- In your PR description, please include:

  - A brief summary of the changes you made.
  - Any challenges you encountered and how you overcame them.
  - If applicable, any additional features or improvements you added beyond the basic requirements.

8. **Submission Deadline:**

You have the flexibility to choose your own deadline to submit the assignment. Please ensure that you submit your Pull Request (PR) before your self-selected deadline. Your submission will be evaluated based on code quality, functionality, adherence to requirements, and any extra points implemented.

<hr>

If you have any questions or need further assistance, feel free to reach out. Good luck!
