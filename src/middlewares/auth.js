import jwt from 'jsonwebtoken'
import User from '../models/User.js';

export const auth = async (req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const data = await jwt.verify(token,process.env.SECRET_KEY);
        
        const user = await User.findOne({ _id: data._id , 'tokens.token': token})
    
        if(!user){
            throw new Error('User not found');
        }
    
        req.token = token;
        req.user = user;   
    
        next();
    }catch(e) {
        res.status(401).send({
            statusCode: 401,
            error : {
                messaage: 'Please authenticate'
            },
            data: null
        })
    }
}
