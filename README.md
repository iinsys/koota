# Koota API

[![Node.js CI](https://github.com/iinsys/koota/actions/workflows/ci.yml/badge.svg)](https://github.com/iinsys/koota/actions/workflows/ci.yml)

This is the backend API for the Koota application, a tool to track contributions in a group.

## Features

- Create and manage groups
- Add members to groups
- Track contributions from members
- Manage payouts to members
- API documentation with Swagger

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Docker

## Getting Started

### Prerequisites

- Node.js
- Docker

### Installation

1.  Clone the repository
2.  Install dependencies
    ```bash
    npm install
    ```

### Running the application

#### Using Docker (recommended)

1.  Make sure Docker is running on your machine.
2.  Run the application with `docker-compose`:
    ```bash
    docker-compose up --build
    ```
The application will be available at `http://localhost:5000`.

#### Using npm

1.  Make sure you have a running instance of MongoDB.
2.  Create a `.env` file in the root of the project and add your `MONGO_URI`.
3.  Run the application with npm:
    ```bash
    npm run dev
    ```

## API Documentation

The API documentation is available at `http://localhost:5000/docs` when the application is running.

