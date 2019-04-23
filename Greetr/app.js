// In this file, we are making use of our newly created
// framework, showing examples of how it works and how to use it

// gets a new object (the achitecture allows us to not have to use
// the 'new' keyword here)
var g = G$("Jane", "Mary");
console.log(g);

// Experimenting with our methods and their chainability
g.greet();
g.greet(true);
g.greet().setLang("fr").greet(true);
g.greet().setLang("es").greet(true).log();

// lets use our object on the click of the login button
$('#login').click(function(){

    // create a new 'Greetr' object (let's pretend we know the name
    // from login)
    var longinGrtr = G$('John', 'Maxwel');

    // Hide the login on the screen
    $('#logindiv').hide();
    

    longinGrtr.setLang($('#lang').val()).JQueryGreeting('#greeting', true).log();
});