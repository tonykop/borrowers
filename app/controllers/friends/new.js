import FriendsBaseController from './base';

export default  FriendsBaseController.extend({


  actions:{

    cancel(){
      this.transitionTo('friends');
      return false;
    }
  }
});
