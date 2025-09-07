# MERN AI Chatbot

A web-based AI chatbot built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**.  
This project allows users to chat with an AI bot in real-time.



## Features

- **Real-time Chat**: Instant messaging between user and AI bot.
- **Persistent Chat History**: Keeps previous conversations for reference.
- **AI-Powered Responses**: Uses **Grok API** for generating intelligent replies.
- **Clean UI/UX**: Attractive and responsive design.



## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas or local)
- **AI Integration**: Grok API


## Setup Instructions

### 1. Clone the repository
git clone https://github.com/ManishaCodes/mern_ai_chatbot.git
cd mern_ai_chatbot
**Create a .env file in the backend**
PORT=5000
MONGO_URI=your_mongodb_connection_string
API_KEY=your_ai_api_key

**for backend**
cd backend
node server.js

**for frontend**
cd frontend
npm run dev

**project structure**
mern_ai_chatbot/
├── backend/        # Node.js + Express server
├── frontend/       # React.js frontend
├── README.md
├── package.json
└── .gitignore      # Excludes node_modules, .env, logs, etc.



git clone https://github.com/ManishaCodes/mern_ai_chatbot.git
cd mern_ai_chatbot
