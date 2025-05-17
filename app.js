const anything= require('readline'); //we defined a constant to read every line of the code
const fs=require(`fs`); //fs means file system
const { request } = require('http');
const http = require('http');//for web server

const path = require('path');

const staticServer = http.createServer((req, res) => {
    const ext = path.extname(req.url);
    const types = { '.css': 'text/css', '.js': 'application/javascript' };

    if (types[ext]) {
        // Adjust path to point to your Webpage folder
        const filePath = path.join(__dirname, 'Webpage', req.url);

        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(`${ext.toUpperCase()} file not found`);
            } else {
                res.writeHead(200, { 'Content-Type': types[ext] });
                res.end(data);
            }
        });
    } else {
        servitron.emit('request', req, res);
    }
});


 //STEP 1: CREATE A SERVER
 const server = http.createServer((response) => { //we created a server with request and response
     response.end('Hello from the server!'); //this will be printed on the other end i.e. when we access the site
     console.log('A new request received'); //it will be printed in the terminal when someone opens our website
     //console.log(response); //incase you wanna know what response is printed when we access the site
 });
 //STEP 2: START THE SERVER
 server.listen(8000, '127.0.0.1', () => { //we listen this on this address with this port
     console.log('Server has started! Once'); //this will be printed in the terminal
 })

//Now we can also add html, css and js in the response.end section as afterall we use response.end to display content in the webpage

//****DO NOT UNCOMMENT BOTH THE UPPER AND THIS LOWER SECTIONS AT ONCE */

// const html=fs.readFileSync('./Webpage/index.html', 'utf-8');

// const servon = http.createServer((request, response) => {
//     response.end(html);
// });

// servon.listen(8000, '127.0.0.1', () => {
//     console.log('Server has started! Twice');
// });

// const servicer = http.createServer((request, response) => {
//     let path = request.url;

//     if (path === '/' || path.toLocaleLowerCase() === '/home') { //http://127.0.0.1:9000/home
//         response.end('You are in home page');
//     } else if (path.toLocaleLowerCase() === '/about') { //http://127.0.0.1:9000/about
//         response.end('You are in about page');
//     } else if (path.toLocaleLowerCase() === '/contact') {
//         response.end('You are in contact page');
//     } else {
//         response.end('Error 404: Page not found!');
//     }
// });
// //Now if we do the above way, we will only be able to display text like You are in *** page, but we also need to show proper html when using bigger codes, so 
// //we create an html file, we will link it there that if we put /home then it will display the content accordingly and if /*anything random* then it will show error
// servicer.listen(9000, '127.0.0.1', () => {
//     console.log('Server has started!Thrice');
// });

//****DO NOT UNCOMMENT BOTH THE UPPER AND THIS LOWER SECTIONS AT ONCE */


const hallucinate = fs.readFileSync('./Webpage/index.html', 'utf-8'); // main HTML layout
const productListHtml = fs.readFileSync('./Webpage/products-list.html', 'utf-8'); // product card template
let products = JSON.parse(fs.readFileSync('./Data/products.json', 'utf-8')); // product data

// Fill each product card with data
let productHtmlArray = products.map((prod) => {
    let output = productListHtml.replace('{{%IMAGE%}}', prod.productImage);
    output = output.replace('{{%NAME%}}', prod.name);
    output = output.replace('{{%MODELNAME%}}', prod.modelName);
    output = output.replace('{{%MODELNO%}}', prod.modelNumber);
    output = output.replace('{{%SIZE%}}', prod.size);
    output = output.replace('{{%CAMERA%}}', prod.camera);
    output = output.replace('{{%PRICE%}}', prod.price);
    output = output.replace('{{%COLOR%}}', prod.color);
    return output;
});

// CREATE SERVER FOR ROUTING
const servitron = http.createServer((request, response) => {
    let path = request.url.toLowerCase();

    if (path === '/' || path === '/home') {
        // Show product cards on home page too
        const productResponseHtml = productHtmlArray.join('');
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(hallucinate.replace('{{%CONTENT%}}', productResponseHtml));
    } else if (path === '/about') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(hallucinate.replace('{{%CONTENT%}}', 'You are in About page'));
    } else if (path === '/products') {
        const productResponseHtml = productHtmlArray.join('');
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(hallucinate.replace('{{%CONTENT%}}', productResponseHtml));
    } else if (path === '/contact') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(hallucinate.replace('{{%CONTENT%}}', 'You are in Contact page'));
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end(hallucinate.replace('{{%CONTENT%}}', 'Error 404: Page not found!'));
    }
});

staticServer.listen(7000, '127.0.0.1', () => {
    console.log('Server running at http://127.0.0.1:7000');
});

//I created a file called data and created a file called products.jsonand pasted random json info in it




