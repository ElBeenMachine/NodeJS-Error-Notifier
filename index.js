// Module imports
const nodemailer = require("nodemailer");
const ejs = require("ejs");

// Create notifier class

module.exports = class Notifier {
    // Set class properties
    _projectName = "";
    _emails = [];
    _senderEmail = "";
    _senderPassword = "";
    _transporter;
    _smtpConfig = {};

    /**
    * Create a notifier object
    * @param {Object} options - Object with options
    * @param {string} options.senderEmail - email address used to send notifications
    * @param {string} options.senderPassword - password from sender account
    * @param {string|Array} options.emails - set of emails, which notifications are sent to (may be string or array of strings)
    * @param {string} options.projectName - current project name
    * @returns {Notifier}
    */
    constructor(options) {
        // Parameter verification
        if(!options.projectName) throw "Required field 'projectName' was not provided";
        if(!options.emails) throw "Required field 'emails' was not provided";
        if(!options.senderEmail) throw "Required field 'senderEmail' was not provided";
        if(!options.senderPassword) throw "Required field 'senderPassword' was not provided";

        if(!typeof options.projectName == "String") throw new TypeError("Field 'projectName' must be of type 'String'");
        if(!typeof options.emails == "Array") throw new TypeError("Field 'emails' must be of type 'Array'");
        if(!typeof options.senderEmail == "String") throw new TypeError("Field 'senderEmail' must be of type 'String'");
        if(!typeof options.senderPassword == "String") throw new TypeError("Field 'senderPassword' must be of type 'String'");

        // Set class properties
        this._projectName = options.projectName;
        this._emails = options.emails;
        this._senderEmail = options.senderEmail;
        this._senderPassword = options.senderPassword;

        
        this._smtpConfig = {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: this._senderEmail,
                pass: this._senderPassword
            }
        };

        this._transporter = nodemailer.createTransport(this._smtpConfig);
    }

    /**
    * Send notification
    * @param {Error} error - Error Object
    */
    process(error) {
        // If the parameter passed of not an Error object, throw a TypeError
        if(!error instanceof Error) throw new TypeError("Required parameter 'error' must be an Error object.");

        ejs.renderFile(__dirname + "/template.ejs", { projectName: this._projectName, error}, (err, data) => {
            if(err) throw err;

            // Set the mail options
            var mailOptions = {
                from: `"${this._projectName} Error Handler" ${this._senderEmail}`,
                to: this._emails,
                subject: `An error has occurred on your project: ${this._projectName}`,
                html: data
            };

            this._transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    throw error;
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        });
    }
}