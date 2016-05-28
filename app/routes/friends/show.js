import Ember from 'ember';

export default Ember.Route.extend({

   model(){
     return this.store.find('friend',params.friend_id);
   },

});
