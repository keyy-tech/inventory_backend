# Project Documentation: MongoDB Inventory Management System

## 1. Introduction

This document outlines the architecture and usage of the Inventory Management System built with Node.js, Express, and
MongoDB. The system provides a suite of functionalities to manage customers, users, suppliers, orders, payments,
inventory transactions, notifications, invoices, and product data. It supports full CRUD operations, authentication via
JWT, sorting, filtering, pagination, and indexing for performance optimization.

## 2. Setup Instructions

### 2.1 Prerequisites

- Node.js (v14 or later)
- npm
- MongoDB (local or Atlas)

### 2.2 Installation

```bash
git clone <your-repo-url>
cd inventory-system
npm install
```

### 2.3 Environment Variables

Create a `.env` file in the root directory:

```dotenv
MONGO_URI=mongodb://localhost:27017/inventory_db
PORT=3000
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=1h
```

### 2.4 Running the Server

```bash
node server.js
```

## 3. Database Design

### 3.1 Mongoose Models

Located in `server/models/`:

- `Users.js`: Admin and application user records
- `Customers.js`: Customer profile and contact information
- `Products.js`: Inventory item details
- `Suppliers.js`: Vendor contact and product info
- `Orders.js`: Customer order records
- `PurchaseOrder.js`: Orders placed to suppliers
- `Payments.js`: Transaction records for orders
- `Invoice.js`: Invoice generation and status
- `Notification.js`: System alerts and notifications
- `Inventory_Transaction.js`: Logs of stock movements (in/out)

### 3.2 Schema Highlights

- Mongoose schemas use validation (`required`, `unique`, etc.)
- Automatic timestamps for `createdAt` and `updatedAt`

### 3.3 Indexing

Indexes added to improve performance on frequently queried fields:

| Collection            | Indexed Fields                      |
|-----------------------|-------------------------------------|
| Users                 | `email`, `role`                     |
| Customers             | `email`, `name`                     |
| Products              | `sku`, `name`, `category`, `price`  |
| Orders                | `customerId`, `status`, `orderDate` |
| Payments              | `orderId`, `paymentDate`, `status`  |
| Inventory_Transaction | `productId`, `type`, `date`         |

## 4. API Endpoints

### 4.1 Authentication

- `POST /api/auth/register`: Register a new user (Admin/User)
- `POST /api/auth/login`: Login and receive JWT token

Use JWT in headers:

```
Authorization: Bearer <token>
```

### 4.2 Generic CRUD Pattern (e.g., Products)

- `GET /api/products`: List with filters, pagination, sorting
- `POST /api/products`: Add new product
- `GET /api/products/:id`: Retrieve product by ID
- `PATCH /api/products/:id`: Update product fields
- `DELETE /api/products/:id`: Delete product

### 4.3 Search & Pagination

All listing routes support:

- `?page=1`
- `?limit=20`
- `?sort=price`
- `?order=asc|desc`

### 4.4 Bulk Operations

Supported on selected routes:

- `POST /api/products/bulk`
- `POST /api/customers/bulk`

### 4.5 Specialized Routes

- `GET /api/inventory/logs`: Filter by type (inflow/outflow)
- `GET /api/reports/sales`: Aggregated order/payment data
- `GET /api/notifications/unread`: Get unread notifications

## 5. Authentication & Authorization

- JWT-based login using `jsonwebtoken`
- Middleware protects private routes
- Only authenticated users can access resources

## 6. Key Features

- **CRUD** for all models
- **JWT Authentication** for user security
- **Pagination & Sorting** on listing endpoints
- **Indexing** for query performance
- **Aggregation** for reporting (e.g., total sales)
- **Bulk Insert** for performance operations

## 7. Example Usage (Postman)

1. Register a user: `POST /api/auth/register`
2. Login: `POST /api/auth/login` → Copy JWT
3. Add product: `POST /api/products`
4. View inventory transactions: `GET /api/inventory/logs`
5. Fetch paginated orders: `GET /api/orders?page=2&limit=5`
6. View unread notifications: `GET /api/notifications/unread`

---

This documentation is tailored to your actual schema files and system logic. Please update any URLs or descriptions that
change in production.

