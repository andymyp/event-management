<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Event Management Platform</h3>
  <br />
  <br />
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#prerequisites">Prerequisites</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>
<br />

<!-- ABOUT THE PROJECT -->

## Built With

- Frontend :

  - NextJS,
  - ShadCN/UI
  - zod
  - framer-motion
  - redux-toolkit and redux-persist
  - tanstack/react-query and tanstack/react-table.

- Backend :
  - NestJS
  - Prisma
  - Postgres
  - joi
  - winston
  - passport
  - jwt
  - class-validator.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Prerequisites

- NPM
  ```sh
  npm install npm@latest -g
  ```
- PostgreSQL Database

<br />

## Installation

1. Clone the repo

   ```sh
   git clone https://github.com/andymyp/event-management.git
   ```

2. Install NPM packages

   ```sh
   cd frontend
   npm install
   ```

   ```sh
   cd backend
   npm install
   ```

3. Create PostgreSQL database. e.g. `event_management`

4. Create `.env` file from `.env.example` for both frontend and backend

5. Migrate prisma database schema
   ```sh
   cd backend
   npx prisma migrate dev --name init
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

1. Run

   ```sh
   cd frontend
   npm run dev
   ```

   ```sh
   cd backend
   npm run start:dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/andymyp
