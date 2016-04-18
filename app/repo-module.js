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
    this.newDataSet;//for getRepoLinks
    this.copiedNewDataSet;//for getFollowers
    this.followers = null;
    this.following = null;
    
    //initial page load
    $http.get(mainRoute).then((user)=>{
      this.repoStuff = angular.toJson(user.data);
      this.avatar = user.data.avatar_url;
      this.myAcct = user.data.url;
      this.repoUrl = user.data.repos_url
      this.followers = user.data.followers
      this.following = user.data.following

      console.dir('Here is ' + user.starred_url);
      console.dir('Here is avatar' + angular.toJson(this.avatar));
      console.dir('Here is myAcct' + angular.toJson(this.myAcct));
      console.dir('repo : ' + this.repoUrl)
      console.dir('following : ' + this.following)
      console.dir('followers : ' + this.followers)

    });

    this.getFollowers = function(){
      if(this.copiedNewDataSet == null){
        console.log('it is indeed 0');
        this.getRepoLinks();
      } else {
        console.dir('it has some data! ' + angular.toJson(this.copiedNewDataSet))

      }
    }

    //getting list of repositories in list view
    this.getRepoLinks = function(){
      $http.get(this.repoUrl).then((repo)=>{
        var dataSet = repo.data;
         this.newDataSet = dataSet.map((obj)=>{
          var returnedObj = {
            name: '',
            html_url: '',
            created_at: '',
            following_url: '',
            followers_url: '',
            starred_url: ''
          };
          returnedObj.name = obj.name
          returnedObj.html_url = obj.html_url
          returnedObj.created_at = obj.created_at
          returnedObj.following_url = obj.owner.following_url
          returnedObj.followers_url = obj.owner.followers_url
          returnedObj.starred_url = obj.owner.starred_url
          return returnedObj
        })
        this.copiedNewDataSet = angular.copy(this.newDataSet)
        console.dir('newDataSet  : ' + angular.toJson(this.newDataSet))
      })
    };


  }
})()
