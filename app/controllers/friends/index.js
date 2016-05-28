import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams:['sortBy','sortAscending'],
  sortAscending:true,
  //sortBy属性的值是排序的依据
  sortBy:'firstName',
  actions:{
    //setSortBy函数的参数是表示排序依据的字段名
    //在setSortBy函数中会转换sortAscending属性的值
    //toggleProperty方法由Observable类提供,用于把布尔值属性的值在true和false中切换
    setSortBy:function(fieldName){
      this.set('sortBy',fieldName);
      this.toggleProperty('sortAscending');
      console.log('Sorting by',fieldName);
      console.log('Sorting Asc?: ',this.get('sortAscending'));
      return false;
    }
  }
});
