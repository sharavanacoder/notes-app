//const emailExistence=require('email-existence');
const emailExistence = require("@stationf/email-existence");
let ret
const testE=async () => {
    try {
        let success=await emailExistence.check("s@gmail.com");
        console.log(success);
    } catch (e) {
        console.log(e)
    }
}
testE();