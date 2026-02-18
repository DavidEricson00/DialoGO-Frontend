# DialoGO - Frontend

DialoGO is a complete real-time chat platform built to deeply explore WebSockets and modern frontend architecture.

This repository contains the **frontend** of the project, responsible for authentication flows, chat management UI, real-time message rendering, and overall user experience.

The client is built using **React 19 + Vite + TailwindCSS**, with strong type safety through TypeScript and structured state management using Context API.


## 🚀 Technologies

- React 19
- TypeScript
- Vite
- TailwindCSS 4
- Socket.IO Client
- Context API
- Lucide Icons
- ESLint


## 🏗 Architecture

The frontend follows a modular and scalable structure.

### Main Architectural Concepts

- Context-based global state management
- Service layer for API communication
- Reusable UI components
- Protected routes
- Modular chat components
- Real-time integration through a dedicated SocketContext


## 🔐 Authentication Flow

The frontend handles JWT-based authentication with:

- Login & SignUp forms with validation and UX improvements
- JWT storage and automatic attachment via `authFetch`
- Protected routes using `PrivateRoute`
- AuthContext for managing authentication state
- Automatic redirect logic (root redirect to login or home)
- Logout handling with redirection


## 💬 Real-Time Communication

Real-time messaging is powered by Socket.IO Client.

Features include:

- SocketProvider wrapping application routes
- Authenticated socket connection
- Real-time message broadcasting
- Auto-scroll to latest message
- Chat room join handling
- Live updates without manual refresh


## 🧩 Main Features

### Authentication & Profile

- Login with validation & loading states
- SignUp with enhanced UX
- Change username modal
- Change avatar modal
- Change password modal
- Profile dropdown in header
- Centralized user update logic in AuthContext


### Chat Management

- Create chat modal with:
  - Validation
  - Max length enforcement
  - Field counters
  - Loading & error states
- Delete chat with confirmation modal
- Join chat (with optional password)
- Leave chat
- Password-protected chat support
- Owner identification
- "Você" badge for current user


### Chat Discovery & Filtering

- Search bar
- Sort options (including users count)
- Tri-state password filter
- Query param-based filtering
- Dynamic refresh when joining chats


### Chat View

- Chat header with owner and members
- ChatUsersList component
- Real-time message rendering
- ChatInput component
- Auto-scroll behavior
- Async message handling


## 🖼 UI & UX

- Fully responsive Login and SignUp pages
- TailwindCSS-based modern layout
- Modular modal system (GenericModal component)
- Improved error feedback and server message propagation
- Loading states across forms and data fetching


## 🖼 Project Screenshots
<img width="1366" height="720" alt="image" src="https://github.com/user-attachments/assets/fe3386d4-5ebe-4bc8-adfa-58f7f1234167" />
<img width="1366" height="720" alt="image" src="https://github.com/user-attachments/assets/947693ca-da98-4f6e-8957-a43f328e9e9f" />
<img width="1366" height="720" alt="image" src="https://github.com/user-attachments/assets/bfd731cf-2ed8-4a61-b430-4c567eb59120" />


## 📦 Installation

1. Clone the repository

2. Install dependencies:

<code>npm install</code>

3. Start the development server:

<code>npm run dev</code>

The app will run on Vite’s default development port.


## 🎯 Purpose of the Project

DialoGO Frontend was built to:

- Practice real-time frontend architecture
- Integrate Socket.IO in a scalable way
- Improve state management patterns
- Strengthen UX patterns for authentication and chat systems
- Build a modular and maintainable React application
- Work with TypeScript in a real-world project


## 📌 Notes

- Built with React 19
- Uses Vite for fast development experience
- Uses TailwindCSS v4
- Fully TypeScript-based
- Designed to integrate seamlessly with the [DialoGO backend](https://github.com/DavidEricson00/DialoGO-Backend)
- All real-time features depend on a valid authenticated socket connection


## 🔌 Backend Setup

Backend repository:
https://github.com/DavidEricson00/DialoGO-Backend

Make sure the backend server is running before using the frontend.

By default, the frontend expects the API to be available at:
<pre>
http://localhost:300
</pre>
