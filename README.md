# EverythingMart Order Management System

The EverythingMart Order Management System is a web-based application that allows the shopkeeper to manage and track customer orders efficiently. The system utilizes MongoDB to store order details, including order ID, customer information, date, product, quantity, and unit price. With this system, the shopkeeper can streamline order processing, enhance customer tracking, and improve invoice management for a more organized and efficient business operation.

## Features

1. **CSV File Upload:** The shopkeeper can upload a CSV file containing order details through the dashboard. The system will read the file and store the data in a MongoDB database, ensuring easy access and management of orders.

2. **Dashboard with Order Summary:** The dashboard displays a list of tables containing all orders made by customers. For each order, the total amount is calculated by summing the quantity multiplied by the unit price for the corresponding products.

3. **Invoice Generation:** The system offers a "Generate Invoice" button, which generates an invoice for a selected customer. The invoice contains a detailed breakdown of the customer's order, including product names, quantities, unit prices, and the total amount payable.

## Technologies Used

- Backend: Node.js
- Frontend: React and Tailwind CSS
- Database: MongoDB

## Usage

1. Access the dashboard through the provided URL.
2. Upload the order details CSV file using the "Upload File" option.
3. View the order summary on the dashboard with total amounts for each order.
4. Generate invoices for customers by clicking the "Generate Invoice" button and download the invoice for printing or sharing.
