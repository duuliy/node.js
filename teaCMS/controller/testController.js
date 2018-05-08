const testDao = require("../dao/testDao.js");
const testController = {
    test(){
        console.log("in testController");
        testDao.testDao();
    }
};
module .exports = testController;