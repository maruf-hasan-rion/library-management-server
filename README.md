# 📚 Library Management Server

A Library Management System API built with **Express.js, TypeScript, and MongoDB (Mongoose)**.

This API allows you to manage books, borrow books, and retrieve a summary of borrowed books with aggregation.

---

## Features

- Create, update, delete, and retrieve books
- Filter, sort, and limit book results
- Borrow books with quantity validation
- GBorrowed books summary using MongoDB aggregation
- Schema validation with Mongoose
- Business logic enforcement (copies & availability control)
- Global error handling
- Clean and consistent API response structure

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Language:** TypeScript
- **Database:** MongoDB
- **ODM:** Mongoose
- **Environment Config:** dotenv

---

## 📂 Project Structure

```
src/
│
├── config/
├── middlewares/
├── modules/
│   ├── book/
│   └── borrow/
├── routes/
├── app.ts
└── server.ts

```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB URI (local or Atlas)

### ⚙️ Installation & Setup

1. **Clone the repository:**

```bash
git clone https://github.com/maruf-hasan-rion/library-management-server.git
cd library-management-server
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**
   Create a `.env` file in the root directory.
   Use the `.env.example` file as a template.

   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=your_mongodb_connection_string
   ```

4. **Run the project:**
   Development mode:
   ```bash
    npm run dev
   ```
   Production build:
   ```bash
   npm run build
   npm start
   ```

---

## 🌐 Base URL

```bash
http://localhost:5000/api
```

---

## 📌 API Endpoints

### Books

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/api/books`     | Get all books           |
| GET    | `/api/books/:id` | Get a single book by ID |
| POST   | `/api/books`     | Create a new book       |
| PUT    | `/api/books/:id` | Update a book           |
| DELETE | `/api/books/:id` | Delete a book           |

### 🔍 Query Parameters for /api/books

You can use the following query parameters:

| Parameter | Type   | Description                                                    |
| --------- | ------ | -------------------------------------------------------------- |
| `filter`  | string | Filter books by genre or other fields (e.g., `filter=FANTASY`) |
| `sortBy`  | string | Field to sort by (e.g., `sortBy=createdAt`)                    |
| `sort`    | string | Sort direction: `asc` or `desc`                                |
| `limit`   | number | Limit the number of results (e.g., `limit=5`)                  |

```bash

Example:
GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5

```

### Borrow a Book

```
POST /api/borrow

```

**Request:**

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

### Borrow Summary

```
GET /api/borrow

```

**Response:**

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}
```

### Error Handling Format

All errors follow this structure:

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
```

---

## Author

Maruf Hasan Rion

---

## License

This project is created for academic purposes.
