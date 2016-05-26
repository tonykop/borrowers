import Ember from 'ember';
export default Ember.Component.extend({

tagName:'tr',
article:null,//passed-in
articleStates:null, //passed-in
actions:{
  saveArticle(article){
    var article=this.get('article');
    if(article.get('hasDirtyAttributes')){
        this.sendAction('save',article);
    }
  }
}
});
