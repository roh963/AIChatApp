import * as ai from "../services/ai.services.js"

export const getResult = async(req,res)=>{
    try {
        const {promt} = req.query;
        const result = await ai.generateResult(promt);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message});
    }
}