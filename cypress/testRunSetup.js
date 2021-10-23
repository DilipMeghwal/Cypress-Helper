const exec = require('child_process').exec

//get the arguments passed in command line
let args = process.argv;

//ignore first 2 arguments
args.splice(0, 2)

//all the devices to set the viewport
const devices = {
    "iphone-x": { width: 375, height: 812 }
}

//variables with default values
let env = "--env "
let config = "--config "
let browser = "chrome"
let spec = ""
let headed = ""
let parallel = ""
let incognito = ""
let tags = "grepTags=\"\""
let viewportWidth = ""
let viewportHeight = ""
let device = ""

args.forEach(arg => {
    console.log(`arg : ${arg}`)
    let key = arg.split("=")[0]
    let value = arg.split("=")[1]
    switch (key) {
        case "incognito":
            incognito = 'incognito=" --incognito"'
            break;
        case "grepTags":
            tags = 'grepTags="' + value + '"'
            break;
        case "browser":
            browser = value
            break;
        case "spec":
            spec = "--spec " + value
            break;
        case "headed":
            headed = "--headed"
            break;
        case "parallel":
            parallel = "--parallel"
            break;
        case "device" : 
            viewportWidth = "viewportWidth=" + devices[value]['width']
            viewportHeight = "viewportHeight=" + devices[value]['height']
            config += viewportWidth + ',' + viewportHeight
            device = value
            break;
    }
})

if(incognito !== ""){
    env += incognito + ','
}

if(device !== ""){
    env += "device=" + device + ','
}

env += tags

//final command
cypressCommand = `cypress run ${headed} ${config} ${env} ${spec} --browser ${browser} ${parallel}` 

console.log(`final command : ${cypressCommand}`)

//command execution
async function execute_script(cmd){
    await exec(cmd, function(err, stdout, stderr) {
        console.log(stdout)
        if(err){
            console.log(err)
            return;
        }
        console.log('Test: run executed sucessfully');
    });
}

return async function() {
    await execute_script(cypressCommand)
}();