    backend/
    │
│   │── config/
│   │   ├── db.js               # MongoDB connection
│   │   ├── env.js              # Environment variables
│   │   └── socket.js           # Socket.IO server setup
│   │
│   │── models/
│   │   ├── Admin.js            # Admin schema (SuperAdmin / Admin)
│   │   ├── TrainingData.js     # AI Training data schema
│   │   ├── ChatSession.js      # User chat session schema
│   │   └── Message.js          # Optional (if storing messages separately)
│   │
│   │── middlewares/
│   │   ├── authMiddleware.js   # JWT auth check for admins
│   │   ├── roleMiddleware.js   # checking role
│   │   └── errorHandler.js     # Global error response handler
│   │
│   │── services/
│   │   ├── aiService.js        # AI matching logic (keyword-based)
│   │   ├── chatService.js      # Chat session CRUD, handoff logic
│   │   └── trainingService.js  # Training data CRUD logic
│   │
│   │── controllers/
│   │   ├── authController.js
│   │   ├── trainingController.js
│   │   ├── chatController.js
│   │   ├── widgetController.js # Load chat widget config + greeting
│   │   └── adminChatController.js # Admin replies, accept chat, close chat
│   │
│   │── routes/
│   │   ├── authRoutes.js
│   │   ├── trainingRoutes.js
│   │   ├── chatRoutes.js
│   │   ├── widgetRoutes.js
│   │   └── adminChatRoutes.js
│   │
│   │── utils/
│   │   ├── generateToken.js
│   │   ├── logger.js
│   │   └── textSimilarity.js   # Keyword matching logic
│   │
│   │── app.js                  # Express app config
│   │── server.js               # HTTP + Socket.IO bootstrap
    │
    │                    
    │── .env    
    │── package.json
    │── README.md
# Budventure-_backend
