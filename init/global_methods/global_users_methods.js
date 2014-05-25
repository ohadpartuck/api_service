var stubUsersService                = useStub(MAIN_CONFIG['stub_users_service']);
var postman                         = require('rest_postman')(POSTMAN_CONFIG);

logIn = function(prefix, req, res, next){
    if (stubUsersService){
        var params = {settings:{req: req, res: res, next: next},
            responseBody: stubbedUserResponse()};
        GenericOnLoginSuccess(params)
    }else{
        postman.post('users', prefix + '/users/login', req.body,
            GenericOnGetError,
            GenericOnLoginSuccess,
            {passToCallbacks:{req: req, res: res, next: next}});
    }
};

logOut = function(req, res, next){
    //TODO - check this method, not sure it's loggin out the right session
    req.session.destroy();
    res.json({error: null, msg: "Successfully Logged Out."})
};

signUp = function(prefix, req, res, next){
    if (stubUsersService){
        var params = {settings:{req: req, res: res, next: next},
            responseBody: stubbedUserResponse()};
        GenericOnLoginSuccess(params)
    }else{
        postman.post('users', prefix + '/users/signup', req.body,
            GenericOnGetError,
            GenericOnLoginSuccess,
            {passToCallbacks:{req: req, res: res, next: next}});
    }
};

stubbedUserResponse = function(){
    return {user: {_id: "123", email: "stubbed_user@gmail.com", password: "encrypted_pass",
            profile: {picture: 'https://gravatar.com/avatar/?s=60&d=retro'}}};
};

