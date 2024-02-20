/** BizTime express application. */
const express = require("express");

const app = express();
const ExpressError = require("./expressError")
const companyRoutes = require('./routes/companies');

app.use(express.json());
app.use('/companies',companyRoutes);


app.get('/',(req,res)=>{
  res.json({'Message': "Welcome to the Home Page!"});
})


/** 404 handler */

app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});

const PORT = process.env.PORT || '3000';
app.listen(PORT, ()=>console.log(`Server is running on: http://localhost:${PORT}`));


module.exports = app;
