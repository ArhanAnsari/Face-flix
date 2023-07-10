const mongoose=require("mongoose");

const EmotionSchema=new mongoose.Schema({
    emotion:{
        type:String,
        required:true
        
    },
    genres:
        [{id:Number,name:String}],
    

},{timestamps:true})

module.exports=mongoose.model('Emotion',EmotionSchema);