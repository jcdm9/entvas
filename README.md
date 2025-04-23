# Entvas Application

A full-stack web application with the following stack:

- **Frontend**: Next.js (React framework)
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Containerized using Docker Compose**

👉 Live Demo: [http://3.13.92.145:3000/](http://3.13.92.145:3000/)

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## 🏗️ Project Structure

```
.
├── docker-compose.yml
├── server/                # Node.js backend
│   └── .env               # Environment variables for the server
├── web/                   # Next.js frontend
│   └── .env               # Environment variables for the frontend
```

---

## 🐳 Running the Project

```bash
docker-compose up --build
```

This command will:

- Start MongoDB container
- Start the backend server (`npm run dev`)
- Start the frontend app (`npm run start`)

---

## 🌐 Services

| Service | URL                   | Description           |
| ------- | --------------------- | --------------------- |
| Web App | http://localhost:3000 | Frontend (Next.js)    |
| API     | http://localhost:3009 | Backend (Express API) |
| MongoDB | localhost:27017       | MongoDB database      |

---

## ⚙️ Environment Configuration

### server/.env

```env
PORT=3009
MONGO_URI=mongodb://mongo:27017/entvas
```

### web/.env

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3009
```

---

## 🔧 Useful Commands

- Rebuild and start containers:

  ```bash
  docker-compose up --build
  ```

- Stop all services:

  ```bash
  docker-compose down
  ```

- View logs:
  ```bash
  docker-compose logs -f
  ```

---

## 🛠️ Troubleshooting

- **MongoDB connection errors**: Ensure the backend is using the Docker service name `mongo` in the URI.
- **CORS issues**: Verify CORS is configured properly in the backend.
- **Build failures**: Make sure your Dockerfiles and `.env` files are correctly set up.
