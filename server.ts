const https = require('https');
const fs = require('fs');
const next = require('next');
const { parse } = require('url');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const options = {
    key: fs.readFileSync('./localhost.key'), // Adjust path if needed
    cert: fs.readFileSync('./localhost.crj'), // Adjust path if needed
};

app.prepare().then(() => {
    https.createServer(options, (req: any, res: any) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(3000, (err: any) => {
        if (err) throw err;
        console.log('> Ready on https://localhost:3000');
    });
});