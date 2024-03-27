# Majid Al Futtaim E - Commerce Application

## Overview

This is an eCommerce application built using Spring Boot for the backend, React for the frontend, Tailwind CSS for styling, and SQL for database management. The application allows users to browse products, add them to their cart, and proceed with the checkout process.

## Features

- **User Authentication**: Users can sign up, log in, and log out securely.
- **Product Browsing**: Browse through a wide range of products available in the store.
- **Product Search**: Search for specific products by name or category. (Incoming)
- **Product Details**: View detailed information about each product, including price, description, and availability.
- **Shopping Cart**: Add products to the cart, update quantities, and remove items.
- **Checkout Process**: Proceed through a secure checkout process to complete the purchase.
- **Order History**: View past orders and their details. (Incoming)
- **Responsive Design**: The application is responsive, ensuring a seamless experience across devices.

## Technologies Used

- **Spring Boot**: Provides the backend infrastructure, including RESTful APIs and database connectivity.
- **React**: Powers the dynamic and interactive user interface.
- **Tailwind CSS**: Used for styling and creating a visually appealing design.
- **SQL Database**: Stores product information, user data, and order details.

## Installation

### Prerequisites

- Node.js and npm installed globally on your machine.
- Java Development Kit (JDK) installed.
- MySQL or any other SQL database installed.

### Steps

1. Clone the repository:

```
git clone https://github.com/your-username/eCommerceApp.git
```

2. Navigate to the project directory:

```
cd eCommerceApp
```

3. Backend Setup:

   - Navigate to the `backend` directory:

   ```
   cd backend
   ```

   - Update `application.properties` with your database configuration.

   - Build and run the Spring Boot application:

   ```
   ./mvnw spring-boot:run
   ```

4. Frontend Setup:

   - Navigate to the `frontend` directory:

   ```
   cd frontend
   ```

   - Install dependencies:

   ```
   npm install
   ```

   - Start the React development server:

   ```
   npm start
   ```

5. Open your browser and visit `http://localhost:3000` to access the application.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, please contact [Mail](mailto:ayan209e@gmail.com).
