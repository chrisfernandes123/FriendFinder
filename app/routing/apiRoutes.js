// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var newFriendArray = require("../data/friends");
var newFriendMatch = [];

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(newFriendArray);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the newFriendArray array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
  

      var totalDifference = 0;
     
     
     for (var i = 0;i< newFriendArray.length; i++) { 
        totalDifference = 0;
       
        for (var j = 0; j< 1; j++) { 
            
            totalDifference += Math.abs(newFriendArray[i].score[j]-req.body.score[j]);
           
        } 


        if (newFriendMatch.length === 0){
            newFriendMatch[0]= i;
            newFriendMatch[1]= totalDifference;
            
        }
        else{
          
            
            if (newFriendMatch[1]>totalDifference){
               
                newFriendMatch[0]= i;
                newFriendMatch[1]= totalDifference;
            
            }
        }

    }

   

    newFriendArray.push(req.body);

      res.json(newFriendArray[newFriendMatch[0]]);
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function(req, res) {
    // Empty out the arrays of data
    newFriendArray.length = [];
      res.json({ ok: true });
  });
};
