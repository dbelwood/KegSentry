
var nodemailer = require("/home/root/node_modules/nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "kegminder1.0@gmail.com",
        pass: "kegminder"
    }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "kegminder1.0@gmail.com", // sender address
//    to: "6303022122@vtext.com", // list of receivers
      to: "7732947510@txt.att.net", // list of receivers
    subject: "Hello from your friendly KegSentry", // Subject line
    text: "Hi Nick, from KegSentry", // plaintext body
//    html: "Hi Chip <br><b>Your Keg is fine. </b><br>BTW, this is the reason I like the Beaglebone so much.<br>KegMinder</b>" // html body
}

// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
});