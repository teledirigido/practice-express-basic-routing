import 'dotenv/config';
import express from 'express';
import { readFileSync } from 'fs';

const PORT = process.env.PORT || 3000;
const app = express();
const countries = JSON.parse(readFileSync('./countries.json', 'utf-8'));

app.use(express.json());

// TODO: Create GET /countries route

// TODO: Create GET /countries/:id route

// TODO: Create PUT /countries/:id route

// TODO: Create DELETE /countries/:id route

// TODO: Create POST /countries route

// Do not edit this ⬇️
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Error: Port ${PORT} is already in use. Please try a different port.`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});