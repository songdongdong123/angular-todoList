// 这里再控制器中把服务注入进来
angular.module('todoApp.todoCtrl',['todoApp.todoServ','ngRoute'])
// 路由的创建
.config(['$routeProvider',function($routeProvider){
    // 匹配方式
    // $routeProvider.when(参数1,{参数2}).when().when().otherwise({});
    $routeProvider
    .when('/',{
        templateUrl:'todoViewAll.html',
        controller:'todoCtrl'
    })
    .when('/active',{
        templateUrl:'todoViewActive.html',
        controller:'todoCtrl'
    })
    .when('/completed',{
        templateUrl:'todoViewCompleted.html',
        controller:'todoCtrl'
    })
    .otherwise({
        // 其他情况重定向到默认页面
        redirectTo: '/'
    })
}])
.controller('todoCtrl',['$scope','$location','$todoServ',function($scope,$location,$todoServ){
        $scope.todoList = $todoServ.getData();
        $scope.addName = '';
        $scope.vaule = true;
        // 1.实现添加展示功能
        $scope.add = function(){
            if ($scope.addName=='') {
                return;
            }
            $todoServ.addData($scope.addName);
            $scope.addName = '';
        };
        // 2.实现点击删除按钮，删除当前列表
        $scope.remove = function(id1){
            $todoServ.removeData(this.$index);
        };
        $scope.isSelectorAll=false;
        $scope.selectorAll = function(){
            $todoServ.selectorAllData($scope.isSelectorAll);
        };
        // 4.清空所有已完成的方法
        $scope.clearAll = function(){
            $todoServ.clearAllData();
        };
        //5. 实现双击列表项的时候，展示出编辑框，回车之后，保存当前编辑的结果
        $scope.upData = function(){
            $todoServ.toUpData(this);//这里把this作为参数传递给服务中的方法
        };
        // 6.实现编辑结束后，回车隐藏编辑框
        $scope.saveData = function(){
            $todoServ.toSaveData();
        };
        // 7.实现计数功能
        // 先定义一个计数器暴露出去
        $scope.count = 0;
        $scope.$watch('todoList',function(newV,oldV){
            $scope.count = 0;
           for (var i = 0; i < newV.length; i++) {
               if ($scope.todoList[i].isCompleted===true) {
                $scope.count++;
               }
           }
        },true);

        $scope.status = {
            isCompleted:''
        } 
        // $scope.location = $location;
        // $scope.$watch('location.url()',function(newV,oldV){
        //     // console.log(newV);
        //      switch(newV){
        //         case '/':
        //             $scope.status = {
        //                 isCompleted: ''
        //             }
        //             break;
        //          case '/active':
        //             $scope.status = {
        //                 isCompleted: false
        //             }
        //             break;
        //          case '/completed':
        //             $scope.status = {
        //                 isCompleted: true
        //             }
        //             break;
        //         }
        // });

        //9.实现存储的方法
        $scope.$watch('todoList',function(newV,oldV){
           $todoServ.toSave();
        },true); 
}]);