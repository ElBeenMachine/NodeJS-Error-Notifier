<h1 align = "center">NodeJS Error Notifier</h1>
<div align = "center">
    <p>
        <a href="https://discord.gg/uB4dcpsMSR">
            <img src="https://discordapp.com/api/guilds/506436049816518657/embed.png" alt="Discord server" />
        </a>
        <a href="https://www.npmjs.com/package/nodejs-error-notifier">
            <img src="https://img.shields.io/npm/v/nodejs-error-notifier.svg?maxAge=3600" alt="NPM version" />
        </a>
        <a href="https://www.npmjs.com/package/nodejs-error-notifier">
            <img src="https://img.shields.io/npm/dt/nodejs-error-notifier.svg?maxAge=3600" alt="NPM downloads" />
        </a>
    </p>
    <img src = "https://nodei.co/npm/nodejs-error-notifier.png?downloads=true&stars=true">
</div>

# About

NodeJS-Error-Notifier is a simple NodeJS module that can send developers an email if their application errors while unattended. It uses Gmail to send a stylish error report for unattended NodeJS apps.

# Getting Started

These instructions will get you a copy of the project up and running.

## Prerequisites

What things you need to install the software and how to use them

- You wil need a Gmail account to send the emails from. 
    - This email will need to have 2 factor authentication enabled.
    - You will need to generate an application password for this email. See https://support.google.com/accounts/answer/185833?hl=en for more information.

## Installation

Install the module with:

```
npm i --save nodejs-error-notifier
```

# Examples

## Basic error handling

The example below will send a notification to `example2@example.com` and `example3@example.com` on any unhandled exceptions.

```js
const ErrorNotifier = require("nodejs-error-notifier");
const notifier = new ErrorNotifier({
    senderEmail: "example@gmail.com",
    senderPassword: "password123",
    emails: ["example2@example.com", "example3@gmail.com"],
    projectName: "My awesome project!"
});

process.on("unhandledException", (err) => {
    notifier.process(err);
});
```

# Other Information

## Built With

* [NodeJS](https://nodejs.org/)
* [Nodemailer](https://nodemailer.com/) - For sending the notifications
* [EJS](https://ejs.co/) - For rendering the email template


## Versioning

This project uses [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ElBeenMachine/NodeJS-Error-Notifier/tags). 

## Authors

* **Ollie Beenham** - [Portfolio](http://beenhamow.xyz)

See also the list of [contributors](https://github.com/ElBeenMachine/NodeJS-Error-Notifier/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
