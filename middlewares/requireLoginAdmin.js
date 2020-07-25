module.exports = (req, res, next) => {
  if(!req.user || req.user.tipo !=2){
    return res.status(401).send({Error:'You must be logged in!'});
  }else{
    next();
  }
};
