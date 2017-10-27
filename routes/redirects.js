
const express = require('express');
const redirect = require('express-redirect');
const router = new express.Router();

redirect(router);

// Redirects to home page
router.redirect('/home/', '/', 301);

// End of 301 Redirects

module.exports = router;
