const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  res.write('Hello! Node.js server is running.\n');
  res.write('This is LAB 11 Exercise 1');

  res.end();
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});