//Below are the globals for node and js
// _dirname = path to current directory
// __filename = file name
// require = function to use modules 
// module = info about current module
// process = info about environment where the program is being executed

// setInterval(() => {
//     console.log("Waheguru")
// }, 1000) //it sets an interval after which a thing will run 


//***************************************************************************** */
const john="John"
const christian="Christian"

const wazzupp=(some_name) => {
    console.log(`Hello ${some_name}`)
}
wazzupp(john);
wazzupp("Emily");
wazzupp(christian);

const hello = require("./link");
//**************************************************************************** */
//i made file called "link"
const secrets = require("./link"); //we called the link file

console.log(secrets) //if we just do this then we get to see that we get the information of link.js here



secrets.hello(secrets.share1);  //secrets is pathway from this file's side, .hello is the class we are fetching in link folder
// then we are fetching secrets having data of share1 and share2
secrets.hello(secrets.share2);
