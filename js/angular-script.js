// Application module
var crudApp = angular.module('crudApp',[]);

crudApp.controller("DbController",['$scope','$http', function($scope,$http){

// Function to get employee details from the database
getInfo();


function getInfo(){
// Sending request to EmpDetails.php files 
$http.get('http://localhost:3000/all').success(function(data){
// Stored the returned data into scope
$scope.details = data;
});
}

// Setting default value of gender 
$scope.empInfo = {'gender' : 'male'};
// Enabling show_form variable to enable Add employee button
$scope.show_form = true;
// Function to add toggle behaviour to form

$scope.formToggle =function(){
$('#empForm').slideToggle();
$('#editForm').css('display', 'none');
}

$scope.insertInfo = function(info){

$http.post('http://127.0.0.1:3000/add',{"name":info.name,"adress":info.adress,"gender":info.gender}).success(function(data){
//if (data == true) {
    console.log("OKKKKKK");

//}
});
    $('#empForm').css('display', 'none');
    getInfo();

}


$scope.deleteInfo = function(info){
      console.log(info);
$http.get('http://localhost:3000/delete?id='+info.id).success(function(data){
///if (data == true) {
getInfo();
///}
});
}


$scope.currentUser = {};

$scope.editInfo = function(info){

$scope.currentUser = info;

$('#empForm').slideUp();
$('#editForm').slideToggle();
}

$scope.UpdateInfo = function(info){

$http.post('http://localhost:3000/update',{"id":info.id,"name":info.name,"adresss":info.adress,"gender":info.emp_gender}).success(function(data){
$scope.show_form = true;
///if (data == true) {
getInfo();
///}
});
}
$scope.updateMsg = function(id){
$('#editForm').css('display', 'none');
}
}]);