
# Learning TypeScript & Express with CRUD Operations

As I'm reviewing typescript & express, I realize the most effectively & efficiently way to learn any programming language is to understand how to build a simple **CRUD** in a ***single file setup*** **before**
1) Diving into more complex structures like breaking the whole process into separate components

2) Understanding how it fits into any software architecture like **Model-View-Controller (MVC)**

## Overview

**CRUD (Create, Read, Update, Delete)** operations is key to grasping how web applications manage data.

This guide explains how to implement CRUD in various storage options:

1. **In-memory CRUD**
2. **JSON-based CRUD**
3. **Sequelize-based CRUD (SQL)**

## CRUD Operations

### 1. In-memory CRUD
- **Purpose:** Data is stored directly in the server's memory (RAM).
- **How it helps:** Great for learning the basic CRUD logic without worrying about storage or external systems. This is the most basic form of CRUD, making it the perfect starting point.
- **Limitation:** The data is not persistent. If the server restarts, all data is lost.

### 2. JSON-based CRUD
- **Purpose:** Data is stored in a `.json` file.
- **How it helps:** Introduces data persistence using files, which is more practical than in-memory storage. Learn how to parse and manage data stored in a file.
- **Limitation:** File storage is limited in scalability and concurrency. This approach is not recommended for production systems but works well for learning.

### 3. Sequelize-based CRUD
- **Purpose:** Data is stored in a relational database using Sequelize (an ORM for Node.js).
- **How it helps:** Teaches you how to manage data in a database, including creating models, handling relationships between tables, and running database queries. This is closer to real-world applications and production environments.
- **Limitation:** Requires a database setup, which introduces complexity but is essential for modern web apps.

## Model-View-Controller (MVC)

After mastering CRUD, the next step is understanding how to break your application into components using the **MVC architecture**. The MVC pattern separates your application logic into three distinct components:

- **Model:** Represents your data and business logic. For example, Sequelize models are used to define the structure and operations of data in your database.
- **View:** Represents the output (what the user sees). In a backend application, the view could be the JSON response sent to the client. In a frontend application, it's the HTML or components rendered on the page.
- **Controller:** Acts as the intermediary between the model and view. It handles user requests, retrieves data, and sends it to the view.

Once you understand the flow of data and how the MVC pattern fits into your application, you'll be able to organize your code in a more scalable, maintainable way.

## Steps to Learn

1. **Master CRUD Operations in a Single File**  
   Start by implementing in-memory CRUD operations, then move on to file-based JSON storage, and finally integrate a database using Sequelize.
   
2. **Implement MVC Architecture**  
   After understanding CRUD, refactor your code to follow the MVC structure. Separate your logic into models, views, and controllers to build a clean, maintainable application.

3. **Build Real-World Applications**  
   Once you're comfortable with CRUD and MVC, you can start building more complex applications with features like authentication, error handling, validation, and testing.

## Conclusion

Understanding CRUD operations in different contexts is the foundation for building backend applications in TypeScript with Express. After mastering this, you will have the necessary knowledge to break your application into reusable, scalable components using the MVC architecture.

_____

# Note to self on things to do:
1) Add a CRUD for NOSQL
2) Review for future updates..
