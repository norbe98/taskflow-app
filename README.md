# TaskFlow

TaskFlow is a full-stack task management application where users can create projects, organize tasks, update their status, and manage their workflow.

# Live demo



## Features

- User authentication with JWT
- Create and delete projects
- Create and delete tasks
- Update task status
- Responsive UI
- Toast notifications

## Tech Stack

### Frontend

- React
- TypeScript
- React Router
- Tailwind CSS
- Sonner

### Backend

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt

## Project Structure

```
client/
server/
```

## Installation

### Clone the repository

```bash
git clone https://github.com/norbe98/taskflow-app.git
```

### Install dependencies

Frontend

```bash
cd client
npm install
```

Backend

```bash
cd server
npm install
```

## Environment Variables

Create a `.env` file inside the server folder.

```env
Backend
DATABASE_URL=
JWT_SECRET=

Frontend
VITE_API_URL=
```

## Database

Generate Prisma Client

```bash
npx prisma generate
```

Run migrations

```bash
npx prisma migrate dev
```

## Run the project

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

## Future Improvements

- Drag and Drop (dnd-kit)
- Task priority
- Due dates
- Search and filtering
- User profile
- Activity history