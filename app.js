const anything= require('readline'); //we defined a constant to read every line of the code
const fs=require(`fs`); //fs means file system
const { request } = require('http');
const http = require('http');//for web server
//IT IS PREFFERED TO RUN EACH SECTION IN A DIFFERENT FILE INDIVIDUALLY
//**************************************************************************************************** */
//  const anything1= anything.createInterface({ //we created a user-interface
//      input: process.stdin, //which will include input
//      output: process.stdout, //and output
//  });

//  anything1.question("Enter your name: ", (name) =>{ //we asked a question and to execute something we use =>, we defined name here
//      console.log("Your name is "+name);
//      anything1.close();  //close the thing
//  })

//  anything1.on('close', () => { //on close i.e. when the above thing is executed close it and print the text below
//      console.log("Interface closed");
//      process.exit(0); //after the execution exit
//  })

// //***************************************************************************************************** */
// //Reading and writing text
//  let text=fs.readFileSync('./File/input.txt', 'utf-8'); //utf is used to read text. , this code will read the file and print its output in the node
//  console.log(text) //it will print it

//  let content=`Data read from the input.txt: ${text}. \n Date created ${new Date()}` //we take the data of input and then we write it in the output folder along with the date created and extra info
//  fs.writeFileSync('./File/output.txt', content);

//  //Now the difference between synchronous and asynchronous file is that synchronous code executes line by line, blocking further execution until the current operation is complete.
//  //above code is example, asynchronous code allows operations to run independently, without blocking the main program flow. It uses callbacks, promises, or async/await to handle results when they become available.
//  fs.readFile('./File/input.txt', 'utf8', (err, data) => { //if we don't mention Sync then is is not sync, and it contains both error(if any) and data
//      if (err) {
//        console.error(err);
//        return;
//      }
  
//     console.log(data);
//    });
  
//    console.log('This line will execute before the file is read.');
// //***************************************************************************************************** */
// //we can append may lines of text one under one from different different files
//  fs.readFile('./File/start.txt', 'utf-8', (error1,data1)=>{
//      console.log(data1)
//      fs.readFile(`./File/${data1}.txt`, 'utf-8', (error1,data2)=>{
//          console.log(data2);
//          fs.readFile('./File/append.txt', 'utf-8', (error3, data3) => {
//              console.log(data3);
//              fs.writeFile('./Files/output.txt', `${data2}\n\n${data3}\n\nDate Created ${new Date()}`, () =>{
//                                  console.log('Files written successfully');
//              });

//          })
//      })
//      })

//  console.log('Reading File...')

//***************************************************************************************************** */

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

servitron.listen(7000, '127.0.0.1', () => {
    console.log('Server has started! Four');
});
//I created a file called data and created a file called products.jsonand pasted random json info in it




