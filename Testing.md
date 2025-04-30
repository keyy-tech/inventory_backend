Here’s the `README.md` file that explains how to test the routes using Postman. You can copy this into a `README.md`
file.

```markdown
# API Documentation

This documentation outlines the available routes and how to interact with the API using Postman. These routes are
designed for managing products, customers, orders, inventory transactions, payments, purchase orders, suppliers, users,
and audit logs.

## API Routes Overview

### Authentication Routes

#### Register a User

- **POST** `/api/users/register`
- **Request Body**:
  ```json
  {
    "username": "user123",
    "email": "user123@example.com",
    "password": "securePassword"
  }
  ```

#### Login a User

- **POST** `/api/users/login`
- **Request Body**:
  ```json
  {
    "email": "user123@example.com",
    "password": "securePassword"
  }
  ```

#### User Profile (Protected)

- **GET** `/api/users/profile`
    - **Authorization**: Bearer Token

---

### Customer Routes

#### Create Customer

- **POST** `/api/customers`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "contact_info": {
      "phone": "1234567890",
      "email": "john.doe@example.com",
      "address": "123 Main St"
    }
  }
  ```

#### Get All Customers

- **GET** `/api/customers`
    - **Authorization**: Bearer Token

#### Get Customer by ID

- **GET** `/api/customers/{id}`
    - **Authorization**: Bearer Token

#### Update Customer

- **PUT** `/api/customers/{id}`
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "contact_info": {
      "phone": "0987654321",
      "email": "jane.doe@example.com",
      "address": "456 Main St"
    }
  }
  ```

#### Delete Customer

- **DELETE** `/api/customers/{id}`
    - **Authorization**: Bearer Token

---

### Product Routes

#### Create Product

- **POST** `/api/products`
- **Request Body**:
  ```json
  {
    "name": "Laptop",
    "description": "High-end gaming laptop",
    "category": "Electronics",
    "sku": "LAP12345",
    "price": 1200,
    "quantity_in_stock": 100,
    "supplier_id": "supplier-id",
    "status": "Active"
  }
  ```

#### Get All Products

- **GET** `/api/products`
    - **Authorization**: Bearer Token

#### Get Product by ID

- **GET** `/api/products/{id}`
    - **Authorization**: Bearer Token

#### Update Product

- **PUT** `/api/products/{id}`
- **Request Body**:
  ```json
  {
    "name": "Laptop Pro",
    "description": "Latest model of gaming laptop",
    "category": "Electronics",
    "sku": "LAP12346",
    "price": 1300,
    "quantity_in_stock": 120,
    "status": "Active"
  }
  ```

#### Delete Product

- **DELETE** `/api/products/{id}`
    - **Authorization**: Bearer Token

---

### Order Routes

#### Create Order

- **POST** `/api/orders`
- **Request Body**:
  ```json
  {
    "customer_id": "customer-id",
    "order_date": "2025-04-01",
    "total_price": 250,
    "order_status": "Pending",
    "payment_status": "Unpaid",
    "products": [
      {
        "product_id": "product-id",
        "quantity": 2,
        "price": 250
      }
    ]
  }
  ```

#### Get All Orders

- **GET** `/api/orders`
    - **Authorization**: Bearer Token

#### Get Order by ID

- **GET** `/api/orders/{id}`
    - **Authorization**: Bearer Token

#### Update Order

- **PUT** `/api/orders/{id}`
- **Request Body**:
  ```json
  {
    "shipping_date": "2025-04-02",
    "order_status": "Shipped",
    "payment_status": "Paid"
  }
  ```

#### Delete Order

- **DELETE** `/api/orders/{id}`
    - **Authorization**: Bearer Token

---

### Payment Routes

#### Create Payment

- **POST** `/api/payments`
- **Request Body**:
  ```json
  {
    "payment_date": "2025-04-02",
    "payment_amount": 250,
    "payment_method": "Credit Card",
    "order_id": "order-id",
    "status": "Paid"
  }
  ```

#### Get All Payments

- **GET** `/api/payments`
    - **Authorization**: Bearer Token

#### Get Payment by ID

- **GET** `/api/payments/{id}`
    - **Authorization**: Bearer Token

#### Update Payment

- **PUT** `/api/payments/{id}`
- **Request Body**:
  ```json
  {
    "status": "Pending"
  }
  ```

#### Delete Payment

- **DELETE** `/api/payments/{id}`
    - **Authorization**: Bearer Token

---

### Inventory Transaction Routes

#### Create Inventory Transaction

- **POST** `/api/inventory-transactions`
- **Request Body**:
  ```json
  {
    "transaction_date": "2025-04-01",
    "product_id": "product-id",
    "quantity": 10,
    "transaction_type": "Purchase",
    "reason": "Restocking",
    "related_order_id": "order-id"
  }
  ```

#### Get All Inventory Transactions

- **GET** `/api/inventory-transactions`
    - **Authorization**: Bearer Token

#### Get Inventory Transaction by ID

- **GET** `/api/inventory-transactions/{id}`
    - **Authorization**: Bearer Token

#### Update Inventory Transaction

- **PUT** `/api/inventory-transactions/{id}`
- **Request Body**:
  ```json
  {
    "quantity": 15
  }
  ```

#### Delete Inventory Transaction

- **DELETE** `/api/inventory-transactions/{id}`
    - **Authorization**: Bearer Token

---

### Purchase Order Routes

#### Create Purchase Order

- **POST** `/api/purchase-orders`
- **Request Body**:
  ```json
  {
    "supplier_id": "supplier-id",
    "order_date": "2025-04-01",
    "total_price": 500,
    "products": [
      {
        "product_id": "product-id",
        "quantity": 5,
        "price": 100
      }
    ]
  }
  ```

#### Get All Purchase Orders

- **GET** `/api/purchase-orders`
    - **Authorization**: Bearer Token

#### Get Purchase Order by ID

- **GET** `/api/purchase-orders/{id}`
    - **Authorization**: Bearer Token

#### Update Purchase Order

- **PUT** `/api/purchase-orders/{id}`
- **Request Body**:
  ```json
  {
    "delivery_date": "2025-04-10"
  }
  ```

#### Delete Purchase Order

- **DELETE** `/api/purchase-orders/{id}`
    - **Authorization**: Bearer Token

---

### Supplier Routes

#### Create Supplier

- **POST** `/api/suppliers`
- **Request Body**:
  ```json
  {
    "name": "Supplier ABC",
    "contact_info": {
      "phone": "1234567890",
      "email": "abc@supplier.com",
      "address": "123 Supplier St"
    },
    "payment_terms": "30 days",
    "delivery_terms": "FOB"
  }
  ```

#### Get All Suppliers

- **GET** `/api/suppliers`
    - **Authorization**: Bearer Token

#### Get Supplier by ID

- **GET** `/api/suppliers/{id}`
    - **Authorization**: Bearer Token

#### Update Supplier

- **PUT** `/api/suppliers/{id}`
- **Request Body**:
  ```json
  {
    "payment_terms": "60 days"
  }
  ```

#### Delete Supplier

- **DELETE** `/api/suppliers/{id}`
    - **Authorization**: Bearer Token

---

### Audit Log Routes

#### Get All Audit Logs

- **GET** `/api/audit-logs`
    - **Authorization**: Bearer Token

#### Get Audit Log by ID

- **GET** `/api/audit-logs/{id}`
    - **Authorization**: Bearer Token

```

### How to Test Using Postman

1. **Start the API Server**: Ensure your server is running and accessible.
2. **Set Authorization**: Use the `Authorization` header to include a Bearer token for protected routes.
3. **Make HTTP Requests**: Follow the endpoints and examples above to create, read, update, and delete resources.

---

Let me know if you need further modifications!