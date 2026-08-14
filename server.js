import http from 'http';

const port = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('gmgn-cli is alive\n');
}).listen(port, '0.0.0.0', () => {
  console.log(`Listening on port ${port}`);
});
