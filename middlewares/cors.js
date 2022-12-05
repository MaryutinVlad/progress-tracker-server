const allowedCors = [
    'http://localhost:3000',
    'https://localhost:3000',
    'https://localhost:5000',
    'https://localhost:5000'
  ];
  
  const allowedMethods = 'GET, HEAD, PUT, DELETE, POST, PATCH';
  
  module.exports = (req, res, next) => {
    const { method } = req;
    const { origin } = req.headers;
    const requestHeaders = req.headers['access-control-request-headers'];
  
    res.header('Access-Control-Allow-Credentials', true);
  
    if (allowedCors.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
  
    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', allowedMethods);
      res.header('Access-Control-Allow-Headers', requestHeaders);
      res.end();
    }
    next();
  };