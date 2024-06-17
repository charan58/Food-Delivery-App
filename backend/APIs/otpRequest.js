import exp from 'express';
import expressAsyncHandler from 'express-async-handler';

const otpRoute = exp.Router();
otpRoute.use(exp.json());

const generateOtp=()=>{
    return Math.floor(100000 + Math.random()*900000).toString();
}


otpRoute.post('/check-mail', expressAsyncHandler(async (request, response) => {
    const userscollection = request.app.get('userscollection');
    const mail = request.body.email;

    const mailInDb = await userscollection.findOne({ email:mail });
    console.log(mailInDb);

    if (!mailInDb) {
        response.status(404).send({ message: "e-mail doesn't exist" });
    } else {
        const otp = generateOtp();
        response.status(200).send({ message: "e-mail matched", otpform: true, payload:otp });
    }
}));


otpRoute.post('/send-otp',expressAsyncHandler(async(request,response)=>{

    const otp = generateOtp();
    try {
        return response.status(200).send({message:"OTP sent successfully",payload:otp})
    } catch (error) {
        return response.status(500).send({message:"Failed to send OTP"});
    }

}))

export default otpRoute;