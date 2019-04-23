//Create a global execution context forour eentire framework so all our defined variables are safe and we are only exposing what we want
//We need access to the global window object and the JQuery $ using an IIFE
(function (global, $){

    // Create a function constructor that we will not neccesarily use the new key 
    // word to initialise it just like jQuery $ function constructor
    /// 'new' an object
    var Greetr = function(firstName, lastName, language){
        return new Greetr.init(firstName, lastName, language);
    }

    //set up variables and functions that are not accessible on the global scope but
    // all  objects can utilise them for any manipulations in the IIFE
    var supportedLangs = ['en', 'es', 'fr'];

    // informal greetings
    var greetings = {
        en: "Hello",
        es: "Hola",
        fr: "Salut"
    };

    // Formal greetings
    var formalGreetings = {
        en: "Greetings",
        es: "Saludos",
        fr: "Bonjour"
    };

    // logger messages
    var logMessages = {
        en: "Logged in",
        es: "inicio de sesión",
        fr: "session initiée"
    };

    //
    Greetr.prototype = {

        fullName: function(){
            return this.firstName + " " + this.lastName;
        },

        validate: function(){
            if (supportedLangs.indexOf(this.language) === -1){
                throw "Invalid Language";
            }
        },

        greeting: function(){
            return greetings[this.language] + " " + this.firstName + "!";
        },

        formalGreeting: function(){
            return formalGreetings[this.language] + " " + this.fullName();
        },

        greet: function(formal){
            var msg;

            // if undefined or null it will be coerced to false
            if (formal){
                msg = this.formalGreeting();
            }
            else{
                msg = this.greeting();
            }

            if (console) {
                console.log(msg);
            }

            // 'this' refers to the calling object at execution time.
            // makes the methode chainable
            return this;
        },

        log: function(){
            if (console){
                console.log(logMessages[this.language] + " " + this.fullName());
            }
            return this;
        },

        setLang: function(lang){
            this.language = lang;
            this.validate();
            return this;
        },

        JQueryGreeting: function(selector, formal){
            console.log("Entered successfuly")
            if (!$){
                throw "JQuery not loaded";
            }

            if (!selector){
                throw "Missing JQuery selector";
            }

            var msg;
            if (formal){
                msg = this.formalGreeting();
            }
            else{
                msg = this.greeting();
            }
            $(selector).html(msg)

            return this;
        }

    };

    // The actual object is created here, allowing us to create a new object without calling 'new'
    Greetr.init = function(firstName, lastName, language){

        var self = this;
        self.firstName = firstName || "John";
        self.lastName = lastName || "Doe";
        self.language = language || "en";

        self.validate();

    }
    // all objects created with the Greetr object will their prototypes in Greetr.init.prototype,
    // inorder for easthetic reasons, lets make them point instead to Greetr.prototype
    // trick borrowed from jQuery so we dont have to use 'new' keyword
    Greetr.init.prototype = Greetr.prototype;

    //Exposing my Greetr to the global context and aliasing it also with G$
    global.Greetr = global.G$ = Greetr;

}(window, jQuery));