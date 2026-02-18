const app = require('./src/app');
const connectDB = require('./src/db/db');
require('dotenv').config();

app.listen(process.env.PORT || 5000 , () => {
    console.log('Starting server...');
    try{
        console.log('Connecting to MongoDB...');
        connectDB();
    }
    catch(error){
        console.error('Error connecting to MongoDB:', error);
    }
    console.log('Server is running on port ' + (process.env.PORT || 5000));
})

console.log('Server initialization complete  with DB ;) ');