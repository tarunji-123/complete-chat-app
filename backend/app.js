const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');

const User = require('./models/user');
const Chat = require('./models/chat');

const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chat');


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/user',userRoutes);
app.use('/chat',chatRoutes);

User.hasMany(Chat);
Chat.belongsTo(User);

sequelize.sync()
.then((result)=>{
    console.log('database synced');
    app.listen(3000);
})
.catch(err => console.log(err));

