const jwt = require('jsonwebtoken');

const fetchuser = (req,res,next)=>
{
  const token = req.header('authtoken');
  if(!token)
  {
    res.status(401).send({error: 'Please authenticate with Token'});
  }

  try {
    const data = jwt.verify(token,process.env.JWT_SECRECT);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({error: 'Invalid Token'});
  }
   
}


module.exports =fetchuser;