import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';
import multer from 'multer';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config()

const app = express();

// Load environment variables user and pass
const USER = process.env.USER;
const APP_PASS = process.env.APP_PASS;
const PORT = process.env.PORT || 3000;


//TODO:   IMPLEMENT ASYNC EMAIL SENDING THROUGH RABBITMQ or other process handling 
// will make the process faster

//MIDDLEWARE 
app.use(express.json());
app.use(cors({
    origin: 'https://node-js-email-contact-form-attachments-2a56.vercel.app', // frontend URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  }));
  // bodyParser to parse http requests with FTP File Headers from clientSide
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// multer to store attachment locally (will delete later after sending mail)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });

var upload = multer({ 
    storage: storage 
}).single('attachment');



// Configure Nodemailer transporter

// FIRST CREATE APP Passwords for your Google Account, add email where you want the notification in user, and App Paswword in pass, real pass will not work
// Check the README for more info

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {             
    user: USER,
    pass: APP_PASS
  }
});


app.get('/send-test-email', (req, res) => {
  res.send({email: 'json'})
})

  
// API endpoint for sending email with attachments
app.post('/send-email', async (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ success: false, error: 'File upload failed' });
        }

        const {TestEmail, Interests, Name, Email, Description, budget } = req.body;
        console.log('TestEmail:',TestEmail ,'Interests:', Interests, 'Name:', Name, 'Email:', Email, 'Description:', Description, 'Budget:', budget);

                //html template for mail recieved (can be customized)
        const EmailHtmlTemplate = `                                                   
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>NOTIFICATION</title>
          <style>
            body {
              font-family: sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }

            .container {
              padding: 0px;
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              border-radius: 5px;
              box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
            }

            .header {
              padding: 5px 0;
              border-bottom: 1px solid rgba(0, 0, 0, 0.1);
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .header h1 {
              font-size: 20px;
              margin: 0;
            }

            .content {
              padding: 0px 0;
            }

            .content p {
              margin-bottom: 10px;
              font-size: 16px;
              line-height: 1.5;
            }

            .content p span {
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>NOTIFICATION</h1>
            </div>
            <div class="content">
              <p><span>Name:</span> ${Name}</p>
              <p><span>Description:</span> ${Description}</p>
              <p><span>Interests:</span> ${Interests}</p>
              <p><span>Budget:</span> ${budget}</p>
            </div>
          </div>
        </body>
        </html>

        `

        // Prepare the email message
        const message = {
            from: `${Name} <${Email}>`, // Using the client's name and email as SENDERS
            to: TestEmail,  // Use any email address you want to recieve mail on, use (same mail) if you want notifications on your own address | USING www.mailticking.com email here for testing and demo purpose
            replyTo: Email, // Set reply-to to the client's email   (optional)
            subject: `NOTIFICATION: Message from ${Email}`,   //html template for mail recieved
            html: EmailHtmlTemplate,
            text: `Name: ${Name}\nDescription: ${Description}\nInterests: ${Interests}\nBudget: ${budget}`,   //(sending html overrides this)
            attachments: req.file ? [
                {
                    filename: req.file.originalname,
                    path: req.file.path,
                }
            ] : []
        };

        // Send the email
        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ success: false, error: 'Failed to send email' });
            } else {
                console.log('Email sent:', info.response);
                res.json({ success: true, message: 'Email sent successfully' });

                // Delete the file after sending the email
                if (req.file) {
                    fs.unlink(req.file.path, (err) => {
                        if (err) console.error('Failed to delete uploaded file:', err);
                    });
                }
            }
        });
    });
});

// Start the server
app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
