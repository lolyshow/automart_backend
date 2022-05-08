

const add = (a,b)=>{
    return a+b;
}
function AuthSuccessResponse(payload=null,token=null){
    
    if(payload){
        let responseData = {
            "message":"Success",
            "status":200,
            "email":payload.email,
            "token":token
        }
        return responseData;
    }
    else{
        return null;
    }
    
}

function AuthFailureResponse(
    status=300,
    message="Authentication Failed! Please try again with Valid credenrials"){
    let responseData = {
        "message":message,
        "status":status,
        
    }
    return responseData;
}


function ResponsePayload(status=400,message="Technical Error",data = []){
    let responseData = {
        "message":message,
        "status":status,
        "data":data,
        
    }
    return responseData;
}




module.exports = {
    add,
    AuthSuccessResponse,
    AuthFailureResponse,
    ResponsePayload
};