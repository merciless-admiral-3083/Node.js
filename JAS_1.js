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
