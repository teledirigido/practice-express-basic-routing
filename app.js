import 'dotenv/config';
import express from 'express';
import { readFileSync } from 'fs';

const PORT = process.env.PORT || 3000;
const app = express();
const countries = JSON.parse(readFileSync('./countries.json', 'utf-8'));

app.use(express.json());

// Implementar GET /countries route

// Implementar GET /countries/:id route

// Implementar PUT /countries/:id route

// Implementar DELETE /countries/:id route

// Implementar POST /countries route

// No edites esto ⬇️
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