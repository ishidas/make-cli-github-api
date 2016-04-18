'use strict';
(function(){

  var app = angular.module('myApp')
    app.controller('repoViewCtrl', ['$http', repoViewCtrl])


  function repoViewCtrl ($http){
    var mainRoute = 'https://api.github.com/users/ishidas'
    this.searching = {};
    this.repoStuff = {};
    this.avatar = {};
    this.myAcct = {};
    this.repoUrl;
    this.repoLinks;
    this.newDataSet;

  
    this.getRepo = function(){
      $http.get(mainRoute).then((user)=>{
        this.repoStuff = angular.toJson(user.data);
        this.avatar = user.data.avatar_url;
        this.myAcct = user.data.url;
        this.repoUrl = user.data.repos_url
        console.dir('Here is ' + user.starred_url);
        console.dir('Here is avatar' + angular.toJson(this.avatar));
        console.dir('Here is myAcct' + angular.toJson(this.myAcct));
        console.dir('repo : ' + this.repoUrl)
      });

    };
    this.getRepoLinks = function(){
      $http.get(this.repoUrl).then((repo)=>{
        var dataSet = repo.data;
         this.newDataSet = dataSet.map((obj)=>{
          var returnedObj = {
            name: '',
            html_url: '',
            created_at: ''
          };
          returnedObj.name = obj.name
          returnedObj.html_url = obj.html_url
          returnedObj.created_at = obj.created_at
          return returnedObj
        })


        console.dir('newDataSet  : ' + angular.toJson(this.newDataSet))
      })
    };


  }
})()
