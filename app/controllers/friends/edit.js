import FriendsBaseController from './base';

export default FriendsBaseController.extend({

  actions:{

    cancel(){
      this.transitionTo('friends.show',this.get('model'));
      return false;
    }
  }
});
