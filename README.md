# Task Management Application

This is a simple task management application built using React, TypeScript, Tailwind CSS, and a Laravel backend API. Users can create, edit, delete, and manage tasks with different statuses. It also allows users to categorize tasks and set due dates.

## Features

- Create, edit, and delete tasks
- Assign tasks to categories
- Set due dates
- Mark tasks as pending, in-progress, or done
- Validation and error handling on form submissions
- Responsive UI with Tailwind CSS

## Technologies Used

- **Frontend:**
  - React
  - TypeScript
  - Tailwind CSS
  - React Router

- **Backend:**
  - Laravel 12 API

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (v14.x or higher)
- npm (v6.x or higher) or yarn
- PHP (v7.4 or higher)
- Composer (v2.x or higher)

### Frontend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/ahmedmo2399/task-manager-frontend.git
    cd task-manager-frontend
    ```

2. Install the frontend dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

The application should be running at [http://localhost:5173](http://localhost:5173).

### Backend Setup

1. Clone the backend repository:

    ```bash
    git clone https://github.com/ahmedmo2399/todo-app.git
    cd todo-app
    ```

2. Install the backend dependencies:

    ```bash
    composer install
    ```

3. Set up your `.env` file:

    ```bash
    cp .env.example .env
    ```

4. Generate the application key:

    ```bash
    php artisan key:generate
    ```

5. Migrate the database:

    ```bash
    php artisan migrate
    ```

6. Start the backend server:

    ```bash
    php artisan serve
    ```

The API should now be running at [http://localhost:8000](http://localhost:8000).

## Usage

Once both the frontend and backend are running, you can access the application through your browser at [http://localhost:5173](http://localhost:5173). The user interface will allow you to:

- Create tasks with titles, descriptions, categories, and due dates
- Edit tasks and update their status
- Delete tasks
- View tasks in a list with filter options

## API Endpoints

The backend API supports the following endpoints:

- `GET /tasks`: Retrieve a list of tasks
- `GET /tasks/{id}`: Retrieve a single task by its ID
- `POST /tasks`: Create a new task
- `PUT /tasks/{id}`: Update a task
- `DELETE /tasks/{id}`: Delete a task
- `GET /categories`: Retrieve a list of task categories

## Contributing

If you'd like to contribute to the project:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- React and React Router for building the frontend
- Laravel for the API backend
- Tailwind CSS for the styling
