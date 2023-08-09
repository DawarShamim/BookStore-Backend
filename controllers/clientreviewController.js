const ClientReview = require("../models/ClientReviews");

exports.createNew = async(req,res)=>{
    try{
        const book=req.body?.BookId;
        const client=req.body?.ClientId;
        const reviewText=req.body?.Reviewtext;
        const stars =req.body?.Stars;
        const newClientReview = new ClientReview ({
            Book:book,
            Client:client,
            ReviewText:reviewText,
            Stars:stars});
            
        await newClientReview.save();

        res.status(200).json({ message: 'Client Review created', ClientReview: newClientReview });
        
    }catch(error){
        next(error);
    }
};

exports.getSpecificBookReviews = async(req,res)=>{
    try{
        const BookID=req.params?.bookId;
        const BookReview= ClientReview.find({Book:BookID});
        if (!BookReview){
            return res.status(404).json({message:"No Reviews Found"});
        }else{
        res.status(200).json({Review: BookReview });
    }
    }catch(error){
        next(error);
    }
};

