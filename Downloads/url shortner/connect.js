const mongoose =  require('mongoose')
async function connectToMonoDB(url) {
    return mongoose.connect(url)
}

module.exports={
    connectToMonoDB,
}