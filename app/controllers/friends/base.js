import Ember from 'ember';

export default Ember.Controller.extend({
  // isValid:Ember.computed(
  //   'model.eamil',
  //   'model.firstName',
  //   'model.lastName',
  //   'model.twitter',{
  //     get(){
  //       return !Ember.isEmpty(this.get('model.email'))&&!Ember.isEmpty(this.get('model.firstName'))&&!Ember.isEmpty(this.get('model.lastName'))&&!Ember.isEmpty(this.get('model.twitter'));
  //     }
  //   }
  // ),

hasEmail:Ember.computed.notEmpty('model.email'),
hasFirstName:Ember.computed.notEmpty('model.firstName'),
hasLastName:Ember.computed.notEmpty('model.lastName'),
hasTwitter:Ember.computed.notEmpty('model.twitter'),
isValid:Ember.computed.and('hasEmail','hasFirstName','hasLastName','hasTwitter'),

  actions:{
    save(){
      if(this.get('isValid')){
        this.get('model').save().then((friend)=>{
        this.transitionTo('friends.show',friend);
      });
    }else{
      this.set('errorMessage','You haave to fill all the fields');
    }
    //  console.log('+- save action in friends new controller');
      return false;
    },
    cancel(){

      return true;
    }
  }
});
