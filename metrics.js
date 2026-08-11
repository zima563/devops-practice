const clientProm = require('prom-client');

// تجميع الميتريكس الافتراضية
clientProm.collectDefaultMetrics();

// تعريف الـ Counters والـ Histograms
const httpRequestCounter = new clientProm.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const httpRequestDuration = new clientProm.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 1, 1.5, 2, 5]
});

// Middleware لقياس زائرين المسارات
const metricsMiddleware = (req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on('finish', () => {
    httpRequestCounter.inc({ method: req.method, route: req.path, status_code: res.statusCode });
    end({ method: req.method, route: req.path, status_code: res.statusCode });
  });
  next();
};

// Handler الخاص بمسار /metrics
const metricsHandler = async (req, res) => {
  res.set('Content-Type', clientProm.register.contentType);
  res.end(await clientProm.register.metrics());
};

module.exports = {
  metricsMiddleware,
  metricsHandler
};