/**
 * Created by user_12 on 18/03/15.
 */
var User = require("./../user");
var Users = require("./../users");

var url = require("url");
var validator = require("validator");

var ect = require("ect");
var renderer = ect({ root : __dirname + '/../../views' });
var data = { title : 'Home work!' };

module.exports = {
    getAction: function(request, response, next){
        /* next(null) */

        setTimeout(function(next){
            response.statusCode = 200;
            try{
                console.log(Users.userArr);
                response.write(renderer.render('get.ect', {
                    addUser: Users.userArr
                }));
                next();
            }catch(e){
                next(e);
                console.log(e);
            }
        }, 500, next)
    },
    postAction: function(request, response, next){
        var urlJson="";
        setTimeout(function(next){

            response.statusCode = 200;
            try{
                request.on("data", function (data){
                    urlJson+= data;
                });

                request.on("end", function(){
                    var perData=JSON.parse(urlJson);
                    var name, email, desc, age, u;

                    if(validator.isLength(perData["name"], 1, 255)){
                        name =perData["name"];
                    }
                    if(validator.isEmail(perData["e-mail"])){
                        email =perData["e-mail"];
                    }
                    if(validator.isLength(perData["description"], 1, 255)){
                        desc =perData["description"];
                    }
                    if(validator.isNumeric(perData["age"])){
                        age =perData["age"];
                    }
                    if ((name !== undefined)&&
                        (email !== undefined)&&
                        (desc !== undefined)&&
                        (age !== undefined)){

                            u = new User(name, email, desc, age);
                            Users.userArr.push(u);

                            response.write(renderer.render('hello.ect', {
                                message: "User "+ u.name+" add"
                            }));

                            response.statusCode=200;

                        console.log("name ==> "+name+
                        " email ==> "+email+
                        " desc ==> "+desc+
                        " age ==> "+age);
                            next();
                    }else{
                        response.statusCode=404;
                        console.log("name ==> "+name+
                                    " email ==> "+email+
                                    " desc ==> "+desc+
                                    " age ==> "+age);
                        response.write("No Error in Url or some key info missed");
                        next();
                    }
                   // console.log(parsData);
                });



            }catch(e){

                next(e);
            }
        }, 500, next)
    }
};