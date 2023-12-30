const router = require('express').Router();
const shortId = require('shortid');

const urlSubmitModel = require("../model/url.model");


router.post('/urlSubmit',async(req,res)=>{

    const{userId,longUrl}= req.body;

try{
const randomurl = shortId.generate();
const urlSubmit = new urlSubmitModel({userId,longUrl,shorturl:randomurl});

await urlSubmit.save();

res.json({ status: true, shorturl: `http://localhost:3000/${randomurl}`})
}
catch(error){
    res.json({status: false, message: "Something went wrong"})
}

});


router.get('/:shorturl',async(req,res)=>{
    const {shorturl} = req.params;
    const url = await urlSubmitModel.findOne({shorturl})


    console.log(url);

    if(url){
        res.redirect(url.longUrl)

    }else{
        res.json({status:false,message:"Invalid url"})
    }
});

router.post('/getUserURL',async(req,res)=>{
const {userId} = req.body;

const allUserUrl = await urlSubmitModel.find({userId});

if(allUserUrl){
    res.json({status:true,success:allUserUrl})
}else{
    res.json({status:false,message:"no data found"});
}
})

module.exports = router;
