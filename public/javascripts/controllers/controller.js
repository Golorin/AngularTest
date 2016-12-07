var app = angular.module('app', []);
app.controller('AppCtrl', function($scope, $http) {
  console.log("Hello world from controller");

  var refresh = function() {
    $http.get('/contactlist')
      .then(function(res){
        console.log("I received the data: " + res.data);
        $scope.contactList = res.data;
        $scope.contact = {};
      }, function(error) {
        console.log("There was a problem: " + error);
      });
  }

  refresh();

  $scope.addContact = function() {

    console.log($scope.contact);
    $http.post('/contactlist', $scope.contact)
      .then(function(res) {
        console.log("It was a success! Here is the info: ", res.data);
        refresh();
      }, function(err) {
        console.log("There was an error sending the contact information back from the server: ", err);
      });
  }

  $scope.remove = function(id) {
    console.log(id);
    $http.delete('/contactlist/' + id)
      .then(function(res) {
        console.log("The item with id of " + id + " has been deleted!");
        refresh();
      }, function(err) {
        console.log("There was a problem deleting the object with id of " + id + " from the server. Here is the error code: " + err);
      })
  };

  $scope.edit = function(id) {
    console.log(id);
    $http.get('/contactlist/' + id)
      .then(function(res) {
        $scope.contact = res.data;
      }, function(err) {
        console.log("There was an error when editing: ", err);
      });

  }

  $scope.update = function() {
    console.log($scope.contact._id);
    $http.put('/contactlist/' + $scope.contact._id, $scope.contact)
      .then(function(res) {
        refresh();
      }, function(err) {
        console.log("There was an error updating: ", err);
      });
  }

  $scope.deselect = function() {
    $scope.contact = {};
  }

});

app.controller('DonateCtrl', function($scope, $http) {
  if ($scope.donateAmt !== undefined) {
    $scope.donateAmt =+ "$" + scope.donateAmt;
  }
})
