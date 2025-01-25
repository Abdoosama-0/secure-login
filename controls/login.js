const {signinSchema}= require('../models/schema')//importing schema
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')
//=============================function===========================
const gentoken= (userid)=>{
    return jwt.sign({ id: userid }, process.env.JWT_SECRET,{ expiresIn: "10s" })//put userid in object and add antor data if you want
}
//================================================  


  //==============================================
const postlogin = async (req, res) => {
    try {

        const { email, password } = req.body;
        // Find user by email
        const user = await signinSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(404).json({ message: "Invalid email or password" });
        }


        const refreshToken = jwt.sign({id: user._id}, process.env.REFRESH_TOKEN_SECRET,{ expiresIn: "7d" })

        
        //you should store your refresh token 
        res.status(200).json({ message: "Login successful",token: gentoken(user._id) ,refreshToken:refreshToken});
    } catch (error) {
        console.log("Error logging in:", error);
        res.status(500).json({ message: "Server error" });
    }}
    //================================================================
    const refreshAccessToken = (req, res) => {
        const refreshToken= req.body.refreshToken; // استرجاع Refresh Token من الكوكي // front can't read this
    
        if (!refreshToken) {
            res.json({ message:"cant get token from cookies"})
        }
    
        try {
            const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET); // التحقق من التوكن
            const newAccessToken = jwt.sign({ id: payload.id }, process.env.JWT_SECRET, { expiresIn: '10s' });
    
             res.status(200).json({ message:"done" , newAccessToken:newAccessToken});//token: newAccessToken 
        }
         catch (error) {
            console.log("Error verifying refresh token:", error.message); // سجل الخطأ
            res.status(403).json({ message: "Invalid refresh token" });
        }
    };
//================================================
const postsignin = async (req,res) =>{
    try{
    const {email,password,username}=req.body
     // Check if user already exists
     const existingUser = await signinSchema.findOne({ email });
     if (existingUser) {
         return res.status(400).json({ message: "User already exists" });
     }
     const hashedPassword=await bcrypt.hash(password,10)
    const user = new signinSchema({email,password: hashedPassword,username})
    await user.save();

    res.status(200).json({message: "signin successful",user})
    

    }catch (error) {
        console.log("Error signing in:", error);
        res.status(500).json({ error: "Server error" });
    }

}

//=============================mid==================
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // استخراج التوكن
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET ); // التحقق باستخدام نفس الـ SECRET_KEY
        req.user = decoded; // حفظ بيانات المستخدم في الطلب
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            res.status(401).json({ error: "JWT expired" });

          } else {
            res.status(500).json({ error: "Something went wrong",msg:error.message  });
          }
    }
};
//logout by delete the token

//=============================requist==================
const requist= (req,res)=>{
    
    res.json({message: "hope" })

}

const requist2= (req,res)=>{
    
    res.json({message: "love"})

}


module.exports = {
    postlogin,
    postsignin,
    verifyToken,
    requist,
    refreshAccessToken,
    requist2,
}
