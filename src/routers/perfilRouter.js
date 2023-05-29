import express from "express";
const perfilRouter = express.Router();
import sql from '../../config/database.js';

perfilRouter.use((req,res,next) => {
    if (req.user) {
        next();
    }else{
        req.session.returnTo= req.originalUrl;
        res.redirect('/login');
    }
})

perfilRouter.route('/').get((req, res) => {
    res.render('perfil');
  });
  
  export default perfilRouter;
