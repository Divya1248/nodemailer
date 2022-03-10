const fs = require("fs");
const http = require("http");
const nodemailer = require("nodemailer");
const { parse } = require("querystring");

http
  .createServer((req, res) => {
    if (req.method === "POST") {
      let urlencoded = "application/x-www-form-urlencoded";
      if (req.headers["content-type"] === urlencoded) {
        let body = "";
        req.on("data", chunk => {
          body += chunk;
        });
        req.on("end", _ => {
          // start nodemailer
          let { email } = parse(body);
          let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "rkkarthi43@gmail.com",
              pass: "Karthi143",
            },
          });
          // end tranporter
          let options = {
            from: "rkkarthi43@gmail.com",
            to: `${email}`,
            subject: "nodemailer and nodejs",
            html: `
                      <h1>welcome to qspiders</h1>
                      <p>When you give users early access to an exciting feature, you make them feel like a VIP. Feedly makes me feel great, explains why the new feature will make my life better, then makes it obvious what I should do next: Search.</p>`,
          };
          // send email
          transporter.sendMail(options, err => {
            if (err) throw err;
            console.log("successfully mail sent");
            res.end("thank you");
          });
        });
      } else {
        res.end(null);
      }
      //   =================end=======================
    } else {
      if (req.url === "" || req.url === "/") {
        // set header
        res.writeHead(200, "ok", { "content-type": "text/html" });
        fs.createReadStream("./index.html", "utf-8").pipe(res);
      } else if (req.url === "/style.css") {
        res.writeHead(200, "ok", { "content-type": "text/css" });
        fs.createReadStream("./style.css", "utf-8").pipe(res);
      } else {
        res.writeHead(404, "not found", { "content-type": "text/html" });
      }
    }
  })

  .listen(5000, err => {
    if (err) throw err;
    console.log("server is running on port number is 5000");
  });
