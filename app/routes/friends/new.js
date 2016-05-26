import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return this.store.createRecord('friend');
  },
  resetController(controller,isExiting){
    if(isExiting){
      //在控制器上获取模型
      var model=controller.get('model');
      //离开路由的时候确认这个模型是否处于isNew状态
      //也就是说，是否没有保存到后端
      if(model.get('isNew')){
        //调用DS#destroyRecord()方法,
        //把这个模型从存储层中删除
        model.destroyRecord();
      }
    }
  }
});
