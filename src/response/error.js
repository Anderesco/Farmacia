class ApiError {

    constructor(message, code, data, context) {
        this.message = message;
        this.code = code;
        this.data = data;
        if(context){
            this.logGroup = context.logGroupName;
            this.logName = context.logStreamName;
            this.requestId = context.awsRequestId;
        }
    }

}

module.exports.ApiError = ApiError
