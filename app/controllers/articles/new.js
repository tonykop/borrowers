import Ember from 'ember';

export default Ember.Controller.extend({
  actions:{
    save(){
              if(this.get('model.description')){
                return true
              }else{
                  this.set('errorMessage','没有description这个属性');
              };
    }
  }
});
