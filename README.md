# Food Ordering App

## Link to Hosted Project
- [Food Ordering App - Hosted Project](https://food-order-5q5x.vercel.app/)

## Link to Github Repository
- [Food Ordering App - GitHub Repository](https://github.com/pranavnaikp/FoodOrder)

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js

### Steps to Install

#### Client Setup
1. Navigate to the "client" folder in your terminal.
2. Run the following command to install client-side dependencies:
    ```bash
    npm install
    ```

#### Server Setup
1. Navigate to the "server" folder in your terminal.
2. Run the following command to install server-side dependencies:
    ```bash
    npm install
    ```

## Run Project

### Running the Client
1. Go to the "client" folder in your terminal.
2. Execute the following command to start the client:
    ```bash
    npm start
    ```

### Running the Server
1. Go to the "server" folder in your terminal.
2. Execute the following command to start the server:
    ```bash
    npm start
    ```

## Usage

### Features
- Use the filter option provided at the top to select a food category.
- Each person can order only one meal at a time but can select multiple drinks associated with the food.
- Click on "Place Order" to submit the order. If successful, it shows "ORDER PLACED SUCCESSFULLY" and empties the cart.

## Implementation Details

### Technologies Used
- Frontend: Material UI and ReactJS framework
- Backend: Node.js
- Database: MongoDB Atlas

### Database Structure
- **Meals Collection**: Stores meal details.
- **Orders Collection**: Stores order details when users place an order.
