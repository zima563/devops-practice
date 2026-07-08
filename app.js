const express = require('express');
const redis = require('redis');

const app = express();
const port = 3000;

// الاتصال بحاوية قاعدة البيانات اللي اسمها cache
const client = redis.createClient({
  url: 'redis://cache:6379'
});

client.on('error', (err) => console.log('Redis Error', err));

client.connect().then(() => {
  console.log('Connected to Redis Successfully!');
});

app.get('/', async (req, res) => {
  // تزويد العداد بواحد مع كل زائر
  const visits = await client.incr('visits');
  res.send(`<h1>دوكر طلع أسهل مما أتخيل! 😎</h1><h3>أنت الزائر رقم: ${visits}</h3>`);
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});