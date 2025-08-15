# library-management

A minimal REST API for managing books, built with **Node.js**, **Express**, and **TypeScript**.  
Supports filtering, sorting, limiting results, and provides a consistent **generic error response** format.

---

## Features

- Add, retrieve, update, and delete books
- Query filtering, sorting, and limiting
- Consistent API response structure
- Generic error handling with detailed validation messages
- Built with TypeScript for better type safety

---

## Tech Stack

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- dotenv
- nodemon (for development)

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB URI (local or Atlas)

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/maruf-hasan-rion/library-management-server.git

cd library-management-server

# Install dependencies
npm install

# Start development server
npm run dev

# Build and start production server
npm run build


⚙️ Environment Variables

Create a .env file in the project root with the following variables:

PORT=
MONGO_URI=

```

---

# 📌 API Endpoints

## Books

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/api/books`     | Get all books           |
| GET    | `/api/books/:id` | Get a single book by ID |
| POST   | `/api/books`     | Create a new book       |
| PUT    | `/api/books/:id` | Update a book           |
| DELETE | `/api/books/:id` | Delete a book           |

## 🔍 Query Parameters for /api/books

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

### 6. Borrow a Book

```
POST /api/borrow

```

**Body:**

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

### 7. Borrow Summary

```
GET /api/borrow

```

**Returns:**

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

---

## Error Handling Format

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
