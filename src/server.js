import express from "express";
import cors from "cors";
import "dotenv/config";
import { errors } from "celebrate";
import cookieParser from "cookie-parser";
import { connectMongoDB } from "./db/connectMongoDB.js";

import { logger } from "./middleware/logger.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

const PORT = process.env.PORT ?? 3030;

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://note-hub-alpha.vercel.app',
];

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to NoteHub API' });
});

app.use(logger);

app.use(express.json());

// 👇 Оновлений CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // Дозволити запити без origin
      if (!origin) return callback(null, true);

      // Дозволити з списку
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Дозволити всі Vercel домени
      if (origin.includes('.vercel.app')) {
        return callback(null, true);
      }

      console.log('Blocked origin:', origin); // для debug
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", notesRoutes);
app.use("/api", userRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

try {
  await connectMongoDB();

  app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
} catch (error) {
  console.error('Failed to start server:', error);
  process.exit(1);
}



// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import { errors } from "celebrate";
// import cookieParser from "cookie-parser";
// import { connectMongoDB } from "./db/connectMongoDB.js";
// import helmet from 'helmet';

// import { logger } from "./middleware/logger.js";
// import { notFoundHandler } from "./middleware/notFoundHandler.js";
// import { errorHandler } from "./middleware/errorHandler.js";

// import notesRoutes from "./routes/notesRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";

// const app = express();

// const PORT = process.env.PORT ?? 3030;
// const allowedOrigins = [
//   'http://localhost:3000',
//   'https://note-hub-alpha.vercel.app',
// ];

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Welcome to NoteHub API' });
// });

// app.use(logger);
// app.use(helmet());

// app.use(express.json());
// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   }),
// );

// app.use(cookieParser());

// app.use("/api", authRoutes);
// app.use("/api", notesRoutes);
// app.use("/api", userRoutes);


// app.use(notFoundHandler);
// app.use(errors());
// app.use(errorHandler);

// await connectMongoDB();

// app.listen(PORT, () => {
//   console.log(`Server is running at port ${PORT}`);
// });
