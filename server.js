const compression = require('compression');
const express = require('express');
const app = express();
app.use(compression(`${__dirname}/www`));
const helmet = require('helmet');
const sendHtml = require('send-data/html');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const request = require('superagent');
const apiRoutes = require('./routes/api');
const redirectRoutes = require('./routes/redirects');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Create an instance of the router - to be used w/ middleware
const router = new express.Router();
const mg = require('nodemailer-mailgun-transport');
const nodemailer = require ('nodemailer');
const mandrillTransport = require('nodemailer-mandrill-transport');
const jsonParser = bodyParser.json()
app.use(helmet());
const obj = mandrillTransport({
  auth: {
    apiKey: '0SZWw1_FBFk7Cv_7h9W14A'
  }
});

const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html', 'js', 'png', 'jpg'],
  maxAge: '1y',
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(helmet());

app.post('/landing', function (req, res) {
    request
        .post('https://' + process.env.DB_mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + process.env.DB_listUniqueId + '/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + process.env.DB_mailchimpApiKey ).toString('base64'))
        .send({
          'email_address': req.body.email,
          'merge_fields': {
            'FNAME': req.body.firstName,
            'LNAME': req.body.lastName,
            'OCC': req.body.occ,
            'CITY': req.body.city,
            'STATE': req.body.state,

          }
        })
      res.redirect('/');
});
app.post('/api/send', jsonParser, function(req, res){
  var text = req.body;
  console.log("something");
  var mailOptions = {

    from: 'do-not-reply@citibot.com',
    to: "hosea@obviouslee.com",
    subject: 'Citibot Newsletter Signup',
    text: '\n\nEmail: ' + text.email

  };
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
      res.end("error");
    }else{
     console.log("Message sent: " + response.message);
      res.end("sent");
    }
  });
});

app.set('port', process.env.PORT || 5000);
// Listen for requests
const server = app.listen(app.get('port'), function() {
	const port = server.address().port;
	console.info(`Magic happens on port ${port}`);
});

// Set the static asset directory
app.use(express.static(`${__dirname}/www`, options));
app.use(cors());
app.use(require('prerender-node').set('prerenderToken', process.env.PR_Id));
app.use(bodyParser.json());

const forceSsl = function(req, res, next) {
	if (req.headers['x-forwarded-proto'] !== 'https') {
		return res.redirect(['https://', req.get('Host'), req.url].join(''));
	}
	return next();
};

if (app.get('env') === 'production') {
	app.use(forceSsl);
} else if (app.get('env') !== 'production') {
	// Use a nice logger in development
	const logger = require('morgan');
	app.use(logger('dev'));
}



app.post("/contact", function (req, res) {
  var name = req.body.inputname;
  var email = req.body.inputemail;
  var company = req.body.inputcompany;
  var comment = req.body.inputcomment;
  var isError = false;

  if (company) {
    isError = true;
  }
  console.log('\nCONTACT FORM DATA: '+ name + ' '+email + ' '+ comment+'\n');

  // create transporter object capable of sending email using the default SMTP transport
  var transporter = nodemailer.createTransport(mg(auth));

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: '"This guy" <hoseasandstrom@gmail.com>', // sender address
    to: 'hosea@obviouslee.com', // list of receivers
    subject: 'Message from Website Contact page', // Subject line
    text: comment,
    text: company,
    err: isError

  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('\nERROR: ' + error+'\n');
        res.redirect('/404.html');
    } else {
         console.log('\nRESPONSE SENT: ' + info.response+'\n');
        res.redirect('/thankyou.html');
    }
  });
});

function render(req, res, template) {
	const layout = fs.readFileSync(`${__dirname}/templates/layout.html`, 'utf-8');

	sendHtml(req, res, ejs.render(layout, {
		body: template,
	}));
}

function handleAppPage(req, res) {
	var requestUrl = req.url;
	if (requestUrl === '/') requestUrl = '/layout.html';
	const page = fs.readFileSync(`${__dirname}/templates/layout.html`, 'utf-8');
	render(req, res, page);
}

// Tell the app to use any middle ware on the router
// app.use(router);

// Load in routes
// app.use('/api', apiRoutes);
// app.use(redirectRoutes);
// NOTE: SHOULD ALWAYS BE LAST LINE OF FILE
app.post('*', handleAppPage);
app.get('*', handleAppPage);
