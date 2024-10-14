# Task Management System

This project is a task management system built with React, Firebase, and TypeScript. It allows you to manage employees, projects, and tasks, with the ability to filter tasks based on specific date ranges and status.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/task-management-system.git
   ```
   ```
   cd task-management-system
   ```
2. Install dependencies:
   ```
   npm install
   ```
4. Create a .env file in the root of the project and add your Firebase configuration:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```
6. Start the development server:
   ```
   npm start
   ```
# Usage
* Navigate to the app in your browser at http://localhost:3000.
* Use the navigation to access different sections: Employees, Projects, and Tasks.
* Add new employees, projects, and tasks using the forms.
* Use the date filters to filter tasks based on start date and end date.

#Project Structure
```
src/
|-- components/
|   |-- Employee.jsx
|   |-- Project.jsx
|   |-- Task.jsx
|   |-- Core.jsx
|-- controllers/
|   |-- coreController.ts
|-- models/
|   |-- employees.ts
|   |-- projects.ts
|   |-- tasks.ts
|-- styles/
|   |-- dataTablesStyles.css
|-- utils/
|   |-- firebase.js
|-- App.js
|-- index.js
```
