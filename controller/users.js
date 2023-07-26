const User=require('../models/users');
const passport=require('passport');
const emailExistence = require("@stationf/email-existence");


module.exports.renderRegister=(req, res, next) => {
    res.render('user/register');   
}
module.exports.register=async (req, res, next) => {
    const { email, password, username }=req.body;
    let check;
    const isPresent=await User.findOne({ email });
    if (isPresent) {
      req.flash("error", 'Email already registered!!!');
      return res.redirect('/signup');
  }
  if (!email||!password||!username)
  {
    req.flash("error", 'Please enter the fields!');
    return res.redirect('/signup');
  }
  try {
    check=await emailExistence.check(email);
    const user = new User({ email, username });
    const registerUser = await User.register(user, password);
    console.log(registerUser);
    req.login(registerUser, err => {
      if (err) {
        req.flash('error', 'Email is invalid!!!');
        return res.redirect('/signup');
      }
      req.flash('success', 'Welcome to Notes App!');
        return res.redirect('/show');    
        })
  } catch (e) {
      req.flash('error', 'Email is invalid!!!');
      return res.redirect('/signup');
  }
}

module.exports.renderLogin=(req, res) => {
    console.log('login', req.isAuthenticated());
    if(!req.isAuthenticated());
        return res.render('user/signin');
    return res.render('/show')
   
}
module.exports.login=async (req, res) => {
    req.flash("success", 'Welcome Back!!!');
    res.redirect('/show');
};
module.exports.logout=(req, res) => {
    req.logout(function(err) {
        if (err) { 
            return res.render('error');
        }
    req.flash('success', "Goodbye!");
    res.redirect('/');
  });
   
}
