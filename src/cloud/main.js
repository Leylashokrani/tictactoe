// this is a copy of the Cloud Codes used in the Parse Platform to implement the core functions

// checks if there's a winning position on the board
function checkForWin(object) {
  // checks of the center panel is not empty
  if (object.get("gameBoard11") !== "_") {
    // checks first diagonal
    if (object.get("gameBoard11") === object.get("gameBoard00")) {
      if (object.get("gameBoard11") === object.get("gameBoard22")) {
        return true;
      }
    }
    // checks second diagonal
    else if (object.get("gameBoard11") === object.get("gameBoard02")) {
      if (object.get("gameBoard11") === object.get("gameBoard20")) {
        return true;
      }
    }
    // checks vertical including center panel
    else if (object.get("gameBoard11") === object.get("gameBoard01")) {
      if (object.get("gameBoard11") === object.get("gameBoard21")) {
        return true;
      }
    }
    // checks horizontal includung center panel
    else if (object.get("gameBoard11") === object.get("gameBoard10")) {
      if (object.get("gameBoard11") === object.get("gameBoard12")) {
        return true;
      }
    }
  }
  // checks if first panel is not empty
  else if (object.get("gameBoard00") !== "_") {
    // checks vertical including first panel
    if (object.get("gameBoard00") === object.get("gameBoard01")) {
      if (object.get("gameBoard00") === object.get("gameBoard02")) {
        return true;
      }
    }
    // checks horizontal including first panel
    else if (object.get("gameBoard00") === object.get("gameBoard10")) {
      if (object.get("gameBoard00") === object.get("gameBoard20")) {
        return true;
      }
    }
  }
  // checks if last panel is not empty
  else if (object.get("gameBoard22") !== "_") {
    // checks vertical including last panel
    if (object.get("gameBoard22") === object.get("gameBoard12")) {
      if (object.get("gameBoard22") === object.get("gameBoard02")) {
        return true;
      }
    }
    // checks horizontal including last panel
    else if (object.get("gameBoard22") === object.get("gameBoard21")) {
      if (object.get("gameBoard22") === object.get("gameBoard20")) {
        return true;
      }
    }
  }
  return false;
}

// function update game board on the server for the new move
Parse.Cloud.define("makeMove", async (request) => {
  const query = new Parse.Query("gameSession");
  try {
    const object = await query.get(request.params.gameId);
    if (object.get(request.params.move) === "_") {
      if (object.attributes.turn === request.params.userId) {
        object.set(request.params.move, request.params.userId);
      }
    }
    if (checkForWin(object)) {
      object.set("winner", request.params.userId);
    } else {
      if (object.attributes.createBy === request.params.userId) {
        object.set("turn", object.attributes.opponent);
      } else {
        object.set("turn", object.attributes.createBy);
      }
    }
    try {
      const response = await object.save();
      return object;
    } catch (error) {
      return "error1";
    }
  } catch (error) {
    return "error2";
  }
});

// function to join game
Parse.Cloud.define("joinGame", async (request) => {
  const query = new Parse.Query("gameSession");
  try {
    const object = await query.get(request.params.gameId);
    object.set("opponent", request.params.userId);
    object.set(
      "turn",
      Math.random() * 2 > 1 ? object.attributes.createBy : request.params.userId
    );
    try {
      const response = await object.save();
      return object.id;
    } catch (error) {
      return -1;
    }
  } catch (error) {
    return -1;
  }
});

//  function to create game
Parse.Cloud.define("CreateGame", async (request) => {
  const myNewObject = new Parse.Object("gameSession");
  const userQuery = new Parse.Query("User");
  myNewObject.set("gameBoard00", "_");
  myNewObject.set("gameBoard01", "_");
  myNewObject.set("gameBoard02", "_");
  myNewObject.set("gameBoard10", "_");
  myNewObject.set("gameBoard11", "_");
  myNewObject.set("gameBoard12", "_");
  myNewObject.set("gameBoard20", "_");
  myNewObject.set("gameBoard21", "_");
  myNewObject.set("gameBoard22", "_");
  myNewObject.set("createBy", request.params.userId);
  myNewObject.set("turn", "");
  myNewObject.set("opponent", "");
  myNewObject.set("winner", "");
  try {
    const result = await myNewObject.save();
    const user = await userQuery.get(request.params.opponent);
    user.set("invite", myNewObject.id);
    try {
      const res = await user.save(null, { useMasterKey: true });
      return myNewObject.id;
    } catch (err) {
      return "save error";
    }
  } catch (error) {
    return "other error";
  }
});
