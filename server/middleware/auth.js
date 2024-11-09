const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.authToken;

 
  
  
  if (!token) {
    return res.status(401).send({ error: 'Please authenticate with a token.' });
  }

  try {

    
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log(data);
    
   
    req.user = data.user; 

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).send({ error: 'Invalid or expired token.' });
  }
};

module.exports = auth;
