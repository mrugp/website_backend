const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../../MODELS/User');
const jwt = require('jsonwebtoken');

router.post('/signin' , async(req , res)=>{
    
    try{
        const { Aashraya_Id , password } = req.body;

        if( !Aashraya_Id || !password){
            return res.status(200).json({error:" plz fille the fields"})
        }

        const userLogin = await User.findOne({Aashraya_Id});
        
        if(userLogin){
            const isMatch = await bcrypt.compare(password , userLogin.password);

        if(isMatch)
               {
                const token = jwt.sign({_id :userLogin._id} , 'secret' , {
                    expiresIn:"30d"
                });
               // res.cookie("token" ,token ,{ secure: true });
                res.status(200).json({token})
                console.log(token)
               }  
        else
        {
            res.status(401).json({error:"user error"});
            
        }   
    }
    else
    {
        res.status(401).json({message:"invalid Credentials"})
    }
        

    }catch(err){
        console.log(err)
    }

})






module.exports = router;