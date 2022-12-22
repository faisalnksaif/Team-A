export function calculationMiddleware(req,res,next){
    let firstnumber = req.body.num1;
    let secondnumber = req.body.num2;

    if (!firstnumber){
        res.send("firstnumber required")
    }
    if (!secondnumber) {
        res.send("secondnumber required")
    }
    
    if (isNaN(firstnumber)) {
        res.send("firstNumber not a number")
    }
    if (isNaN(secondnumber)) {
        res.send("secondNumber not a number")
    }
    next()
}