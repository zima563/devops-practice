const express = require('express');
const redisClient = require('./redisClient');
const { metricsMiddleware, metricsHandler } = require('./metrics');

const app = express();
const port = 3000;

// تفعيل ميتريكس Prometheus على كل الطلبات
app.use(metricsMiddleware);

// الصفحة الرئيسية
app.get('/', async (req, res) => {
  const visits = await redisClient.incr('visits');
  res.send(`<h1>دوكر طلع أسهل مما أتخيل! 😎</h1><h3>أنت الزائر رقم: ${visits}</h3>`);
});

// مسار تصدير الميتريكس
app.get('/metrics', metricsHandler);

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});