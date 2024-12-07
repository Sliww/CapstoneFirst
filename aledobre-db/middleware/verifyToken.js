const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = { id: decoded.id };
        
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token non valido' });
    }
};

module.exports = verifyToken;
