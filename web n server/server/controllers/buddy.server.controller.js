const firebase = require('firebase');
const firebaseDb = firebase.database();
const fireRef = firebaseDb.ref('/BuddyDb');

exports.list = function (req, res) {
    const url = req.url;
    console.log(url);
    if(url.toString() == "/api/buddy/all") {
        fireRef.once('value').then(function(snapshot) {
            res.status(200).json(snapshot.val());
        });
        fireRef.on('child_added', function(snapshot) {
            console.log(snapshot.val());
        });
    } else {
        console.log("naa");
    }
};

exports.create = function (req, res) {
    fireRef.push().set({
        name: req.body.name,
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