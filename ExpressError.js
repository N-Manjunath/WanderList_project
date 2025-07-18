class ExpressError extends Error{
    
    // constructor(status,message)
    // {
    //     super();
    //     this.status=status;
    //     this.message=message;
    // }
    constructor(message, statusCode) { // Switched parameter order to match common convention and how you use it
        super();
        this.statusCode = statusCode; // Corrected to use statusCode
        this.message = message;
    }

}
module.exports=ExpressError;