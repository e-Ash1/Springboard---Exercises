const express = require('express');
const itemsRoutes = require('./routes/itemsRoutes');
const app = express();

app.use(express.json()); 
app.use(express.static('public')); 
app.use('/items', itemsRoutes);


function hookPort(){
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};
hookPort();


module.exports = app;
