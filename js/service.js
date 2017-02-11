// 创建一个服务
// 创建服务的模板
// 模块.service('服务名称',服务的回调函数(){})
angular.module('todoApp.todoServ',[]).service('$todoServ',function(){//服务的回调函数中是不能把$scope当做参数传递的
	// $scope.todoList = JSON.parse(window.localStorage.getItem('todolist')) || [];
	//因为在服务的回调函数中$scope是不能作为参数传递的，所以我们使用var来获取todoList
	var todoList = JSON.parse(window.localStorage.getItem('todolist')) || [];
	// 我们一般把一些大家都会用到的方法添加到服务中，然后通过this那这些方法暴露出去
	// 1.我们要在服务中把数据返回到控制器中
	this.getData = function(){
		return todoList;
	}
	// 2.实现添加数据的方法
	this.addData = function(addName){
		  todoList.push({
                // 这里使用随机数作为id的原因是因为，id不能被重复，否则会报错
                id:Math.random(),
                isCompleted:false,
                name:addName,
                isUpdata:false
            });
		  console.log('x');
	};
	// 3.实现删除功能
	this.removeData = function(index){
		todoList.splice(index,1);
	};
	// 4.实现全部选中
	this.selectorAllData = function(isSelectorAll){
		 for (var i = 0; i < todoList.length; i++) {
                todoList[i].isCompleted = isSelectorAll;
            }
	}
	// 5.实现清空所有已完成列表
	this.clearAllData = function(){
		for (var i = 0; i < todoList.length; i++) {
                // 判断当前类表项的状态，是不是被选中
                if (todoList[i].isCompleted==true) {
                    // 如果是被选中的，就删除
                    todoList.splice(i,1);
                    // 因为删除后，数组的长度会减少1，所以这里要改变i的值，每次删除之后让i自减1
                    i--;
                }
            }
	}
	// 6.实现双击列表项，展示出编辑框
	this.toUpData = function(that){//这里不能接收this作为参数
		// 所以这里将控制器中传递过来的this用that来接收
		 for (var i = 0; i < todoList.length; i++) {
               // 在显示当前编辑框之前，要先将所有编辑框隐藏
                    todoList[i].isUpdata = false;
            }
            console.log(that.vaule);
            // 这里会出现this混乱的问题
            that.vaule.isUpdata = true;
	}
	// 7.实现一个，编辑结束后，回车保存编辑后的状态，和隐藏编辑框
	this.toSaveData = function(){
		for (var i = 0; i < todoList.length; i++) {
                    todoList[i].isUpdata = false;
            }
	}
	// 8.实现一个存储数据的方法
	this.toSave = function(){
		window.localStorage.setItem('todolist', JSON.stringify(todoList));
	}

});