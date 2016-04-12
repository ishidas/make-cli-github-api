(function(){
  angular.module('myApp')
    .controller('repoViewCtrl', ['$http', repoViewCtrl])

  function repoViewCtrl($http){
    this.repoStuff = [];
    var mainRoute = 'https://api.github.com';
    $http.get(mainRoute)
    .then((result)=>{
      this.repoStuff = result;
      console.log('Here is result : ' + angular.toJson(this.repoStuff));
    })
  }
})()
