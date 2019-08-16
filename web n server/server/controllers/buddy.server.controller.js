const firebase = require('firebase');
const firebaseDb = firebase.database();
const fireRef = firebaseDb.ref('/BuddyDb');
let controllerFlag = 0;
exports.list = function(req, res) {
  let newItemFlag = false;
  controllerFlag++;
  fireRef.once("value").then(function(snapshot) {
    let jsonData = [];
    snapshot.forEach(function(serviceSnapshot) {
      serviceSnapshot.forEach(function(childSnapshot){
        jsonData.push(childSnapshot);
      }) 
    });
    res.status(200).json(jsonData);
    newItemFlag = true;
  });
  // if(controllerFlag < 2) 
  // {
  //   firebaseDb.ref('/BuddyDb').on("value", function(snapshot) {
  //     if(newItemFlag) {
  //       snapshot.forEach(function(childSnapshot) {
  //         fireRef.child(childSnapshot.key).on("child_added", function(up) {
  //           const io = req.app.io;
  //           io.on('connection', function (socket) {
  //           });
  //           io.emit('chak', 'emitted chal bar')
  //           console.log(childSnapshot.val());
  //         })
  //       })
  //     }
  //    });
  // }
};

exports.create = function(req, res) {
  const serviceRef = fireRef.child(req.body.service_type);
  serviceRef.push().set(
    {
      name: req.body.name,
      address: req.body.address,
      postal_code: req.body.postal_code,
      phone: req.body.phone,
      service_type: req.body.service_type
    },
    function(error) {
      if (!error) {
        serviceRef.limitToLast(1).once("value").then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            const id = childSnapshot.key;
            fireRef.child(req.body.service_type +  "/" + id).update({
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