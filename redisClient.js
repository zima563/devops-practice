const redis = require('redis');

const client = redis.createClient({
  url: 'redis://cache:6379'
});

client.on('error', (err) => console.log('Redis Error:', err));

client.connect().then(() => {
  console.log('Connected to Redis Successfully!');
});

module.exports = client;