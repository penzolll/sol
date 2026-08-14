import http from 'http';

const port = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('gmgn-cli is running on Railway\n');
}).listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});
