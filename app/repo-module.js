'use strict';
(function(){

  var app = angular.module('myApp')
    app.controller('repoViewCtrl', ['$http', repoViewCtrl])


  function repoViewCtrl ($http){
    var mainRoute = 'https://api.github.com/users/ishidas'
    var starredRoute = 'https://api.github.com/users/ishidas/starred'
    this.searching = {};
    this.repoStuff = {};
    this.avatar = {};
    this.myAcct = {};
    this.repoUrl = null;
    this.repoLinks = null;
    this.newDataSet = null;//for getRepoLinks
    this.followersLinks = null;
    this.followingPeople = null;
    this.followers = null;
    this.following = null;
    this.starredCollection = null;
    this.starCounts = null;
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
      console.dir('starred : ' + this.starred)
    });

    //getting starred repo name, login name and url
    this.getStarred = function(){
      $http.get(starredRoute).then((starred)=>{
        this.starredCollection = starred.data.map((obj)=>{
          var returnedObj = {
            name: '',
            login: '',
            url: ''
          }
          returnedObj.name = obj.name
          returnedObj.login = obj.owner.login
          returnedObj.url = obj.owner.url
          return returnedObj
        })
        this.starCounts = this.starredCollection.length;
      });
    }

    //getting followers links,
    this.getFollowersLinks = function(){
      $http.get(mainRoute + '/followers').then((followers)=>{
        this.followersLinks = followers.data.map((obj)=>{
          var returnedObj = {
            login: '',
            url: '',
            avatar_url: ''
          }
          returnedObj.login = obj.login
          returnedObj.url = obj.url
          returnedObj.avatar_url = obj.avatar_url
          return returnedObj
        })
      });
    }

    this.getMyFollowings = function(){
      $http.get(mainRoute + '/following').then((followings)=>{
        this.followingPeople = followings.data.map((obj)=>{
          var returnedObj = {
            login: '',
            url: '',
            avatar_url: ''
          }
          returnedObj.login = obj.login
          returnedObj.url = obj.url
          returnedObj.avatar_url = obj.avatar_url
          return returnedObj
        });
      });
    }

    //getting list of repositories in list view
     this.getRepoLinks = function(){
      $http.get(mainRoute + '/repos').then((repo)=>{
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
      })
    }


  }
})()
