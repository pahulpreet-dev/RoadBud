const firebase = require('firebase');
const firebaseDb = firebase.database();
const fireRef = firebaseDb.ref('/BuddyDb');
let controllerFlag = 0;
exports.list = function(req, res) {
  let newItemFlag = false;
  controllerFlag++;
  fireRef.once("value").then(function(snapshot) {
    let jsonData = [];
    snapshot.forEach(function(childSnapshot) {
      jsonData.push(childSnapshot);
    });
    res.status(200).json(jsonData);
    newItemFlag = true;
  });
  if(controllerFlag < 2) 
  {
    firebaseDb.ref('/BuddyDb').on("child_added", function(snapshot) {
      if(newItemFlag) {
        const io = req.app.io;
        io.on('connection', function (socket) {
        });
        io.emit('chak', 'emitted chal bar')
        console.log(snapshot.val());
      }
     });
  }
};

exports.create = function(req, res) {
  fireRef.push().set(
    {
      name: req.body.name,
      address: req.body.address,
      postal_code: req.body.postal_code,
      phone: req.body.phone,
      service_type: req.body.service_type
    },
    function(error) {
      if (!error) {
        fireRef.limitToLast(1).once("value").then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            const id = childSnapshot.key;
            firebaseDb.ref("/BuddyDb/" + id).update({
              id: id
            });
          });
        })
        res.status(200).json("success");
      } else {
        console.log(error.message);
      }
    }
  );
};

exports.getBuddyById = function (req, res) {
    const id = req.params.id;
    const ref = firebaseDb.ref("/BuddyDb/" + id);

    ref.once("value").then(function(snapshot) {
        res.status(200).json(snapshot.val());
    });
};

exports.updateBuddyById = function (req, res) {
    const id = req.params.id;
    const ref = firebaseDb.ref("/BuddyDb/" + id);
    ref.set({
        name: req.body.name,
        id: id,
        address: req.body.address,
        postal_code: req.body.postal_code,
        phone: req.body.phone,
        service_type: req.body.service_type
    }, function(error) {
        if(!error) {
            res.status(200).json("success");
        } else {
            console.log(error.message);
        }
    });
};

exports.deleteBuddy = function (req, res) {
    const id = req.params.id;
    const ref = firebaseDb.ref("/BuddyDb/" + id);
    ref.remove().then(function(error) {
        if(!error) {
            res.json("Deleted");
        }
    });
};