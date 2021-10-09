const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const CSP = 'Content-Security-Policy';
const POLICY =
  "default-src 'self' https://*.mapbox.com ;" +
  "base-uri 'self';block-all-mixed-content;" +
  "font-src 'self' https: data:;" +
  "frame-ancestors 'self';" +
  "img-src 'self' blob: data:;" +
  "object-src 'none';" +
  "script-src https: cdn.jsdelivr.net cdnjs.cloudflare.com api.mapbox.com 'self' blob: ;" +
  "script-src-attr 'none';" +
  "style-src 'self' https: api.mapbox.com 'unsafe-inline';" +
  'upgrade-insecure-requests;' +
  "connect-src http: https: api.mapbox.com 'self' ws: 127.0.0.1:43889";

const router = express.Router();

router.use((req, res, next) => {
  res.setHeader(CSP, POLICY);
  res.append('Access-Control-Allow-Credentials', true);
  next();
});

router.route('/me').get(authController.protect, viewController.getAccount);

router.use(authController.isLoggedIn);

router.route('/').get(viewController.getOverview);
router.route('/tour/:slug').get(viewController.getTour);
router.route('/login').get(viewController.getLoginForm);

module.exports = router;
