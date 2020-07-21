module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    res.status(500).send({ error: '500' });
  } else {
    next();
  }
};
