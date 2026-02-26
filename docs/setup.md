# Project Setup

This document describes how to set up the Koota API project.

## Prerequisites

- Node.js (v20 or higher)
- Docker
- A running instance of MongoDB (if not using Docker)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/iinsys/koota.git
    cd koota
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Running the Application

There are two ways to run the application:

### 1. Using Docker (Recommended)

This is the easiest way to get the application up and running, as it includes the MongoDB database.

1.  **Make sure Docker is running** on your machine.

2.  **Run the application:**
    ```bash
    docker-compose up --build
    ```

The application will be available at `http://localhost:5000`.

### 2. Using npm

If you prefer to run the application without Docker, you will need to have a running instance of MongoDB.

1.  **Start your MongoDB instance.**

2.  **Create a `.env` file** in the root of the project and add your MongoDB connection string:
    ```
    MONGO_URI=your_mongodb_connection_string
    ```

3.  **Run the application:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5000`.

## API Documentation

The API documentation is generated with Swagger and is available at `http://localhost:5000/docs` when the application is running.
