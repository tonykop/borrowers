"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('borrowers/adapters/application', ['exports', 'ember-data', 'active-model-adapter'], function (exports, DS, ActiveModelAdapter) {

    'use strict';

    exports['default'] = ActiveModelAdapter['default'].extend({
        namespace: 'api/v2',
        coalesceFindRequests: true
    });

});
define('borrowers/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'borrowers/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('borrowers/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'borrowers/config/environment'], function (exports, AppVersionComponent, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = AppVersionComponent['default'].extend({
    version: version,
    name: name
  });

});
define('borrowers/components/articles/article-row', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({

    tagName: 'tr',
    article: null, //passed-in
    articleStates: null, //passed-in
    actions: {
      saveArticle: function saveArticle(article) {
        var article = this.get('article');
        if (article.get('hasDirtyAttributes')) {
          this.sendAction('save', article);
        }
      }
    }
  });

});
define('borrowers/components/x-option', ['exports', 'emberx-select/components/x-option'], function (exports, XOption) {

	'use strict';

	exports['default'] = XOption['default'];

});
define('borrowers/components/x-select', ['exports', 'emberx-select/components/x-select'], function (exports, XSelect) {

	'use strict';

	exports['default'] = XSelect['default'];

});
define('borrowers/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('borrowers/controllers/articles/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    possibleStates: ["borrowed", "returned"]
  });

});
define('borrowers/controllers/articles/new', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    actions: {
      save: function save() {
        if (this.get('model.description')) {
          return true;
        } else {
          this.set('errorMessage', '没有description这个属性');
        };
      }
    }
  });

});
define('borrowers/controllers/friends/base', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
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

    hasEmail: Ember['default'].computed.notEmpty('model.email'),
    hasFirstName: Ember['default'].computed.notEmpty('model.firstName'),
    hasLastName: Ember['default'].computed.notEmpty('model.lastName'),
    hasTwitter: Ember['default'].computed.notEmpty('model.twitter'),
    isValid: Ember['default'].computed.and('hasEmail', 'hasFirstName', 'hasLastName', 'hasTwitter'),

    actions: {
      save: function save() {
        var _this = this;

        if (this.get('isValid')) {
          this.get('model').save().then(function (friend) {
            _this.transitionTo('friends.show', friend);
          });
        } else {
          this.set('errorMessage', 'You haave to fill all the fields');
        }
        //  console.log('+- save action in friends new controller');
        return false;
      },
      cancel: function cancel() {

        return true;
      }
    }
  });

});
define('borrowers/controllers/friends/edit', ['exports', 'borrowers/controllers/friends/base'], function (exports, FriendsBaseController) {

  'use strict';

  exports['default'] = FriendsBaseController['default'].extend({

    actions: {

      cancel: function cancel() {
        this.transitionTo('friends.show', this.get('model'));
        return false;
      }
    }
  });

});
define('borrowers/controllers/friends/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    queryParams: ['sortBy', 'sortAscending'],
    sortAscending: true,
    //sortBy属性的值是排序的依据
    sortBy: 'firstName',
    actions: {
      //setSortBy函数的参数是表示排序依据的字段名
      //在setSortBy函数中会转换sortAscending属性的值
      //toggleProperty方法由Observable类提供,用于把布尔值属性的值在true和false中切换
      setSortBy: function setSortBy(fieldName) {
        this.set('sortBy', fieldName);
        this.toggleProperty('sortAscending');
        console.log('Sorting by', fieldName);
        console.log('Sorting Asc?: ', this.get('sortAscending'));
        return false;
      }
    }
  });

});
define('borrowers/controllers/friends/new', ['exports', 'borrowers/controllers/friends/base'], function (exports, FriendsBaseController) {

  'use strict';

  exports['default'] = FriendsBaseController['default'].extend({

    actions: {

      cancel: function cancel() {
        this.transitionTo('friends');
        return false;
      }
    }
  });

});
define('borrowers/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('borrowers/helpers/formatted-date', ['exports', 'ember', 'borrowers/utils/date-helpers'], function (exports, Ember, date_helpers) {

  'use strict';

  exports.formattedDate = formattedDate;

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  function formattedDate(_ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var date = _ref2[0];
    var format = _ref2[1];

    return date_helpers.formatDate(date, format);
  }

  exports['default'] = Ember['default'].Helper.helper(formattedDate);

});
define('borrowers/initializers/active-model-adapter', ['exports', 'active-model-adapter', 'active-model-adapter/active-model-serializer'], function (exports, ActiveModelAdapter, ActiveModelSerializer) {

  'use strict';

  exports['default'] = {
    name: 'active-model-adapter',
    initialize: function initialize() {
      var application = arguments[1] || arguments[0];
      application.register('adapter:-active-model', ActiveModelAdapter['default']);
      application.register('serializer:-active-model', ActiveModelSerializer['default']);
    }
  };

});
define('borrowers/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'borrowers/config/environment'], function (exports, initializerFactory, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = {
    name: 'App Version',
    initialize: initializerFactory['default'](name, version)
  };

});
define('borrowers/initializers/export-application-global', ['exports', 'ember', 'borrowers/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('borrowers/models/article', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    createdAt: DS['default'].attr('date'),
    description: DS['default'].attr('string'),
    notes: DS['default'].attr('string'),
    state: DS['default'].attr('string', {
      defaultValue: 'borrowed'
    }),
    friend: DS['default'].belongsTo('friend')
  });

});
define('borrowers/models/friend', ['exports', 'ember-data', 'ember'], function (exports, DS, Ember) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    articles: DS['default'].hasMany('article', { async: true }),
    firstName: DS['default'].attr('string'),
    lastName: DS['default'].attr('string'),
    email: DS['default'].attr('string'),
    twitter: DS['default'].attr('string'),
    totalArticles: DS['default'].attr('number'),
    fullName: Ember['default'].computed('firstName', 'lastName', {
      get: function get() {
        return this.get('firstName') + ' ' + this.get('lastName');
      }
    })
  });

});
define('borrowers/router', ['exports', 'ember', 'borrowers/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('friends', function () {
      this.route('new');
      this.route('show', {
        path: ':friend_id'
      }, function () {
        this.route('articles', { resetNamespace: true }, function () {
          this.route('new');
        });
      });
      this.route('edit', {
        path: ':friend_id/edit'
      });
    });
  });

  exports['default'] = Router;

});
define('borrowers/routes/articles/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return this.modelFor('friends/show').get('articles');
    },
    actions: {
      save: function save(model) {
        model.save();
        return false;
      }
    }

  });
  // resetController(controller,isExiting){
  //      if(isExiting){
  //        var model=controller.get('model');
  //          model.destroyRecord(); }
  //
  // }

});
define('borrowers/routes/articles/new', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return this.store.createRecord('article', {
        friend: this.modelFor('friends/show')
      });
    },
    actions: {
      save: function save() {
        var _this = this;

        var model = this.modelFor('articles/new');
        model.save().then(function () {
          _this.transitionTo('articles');
        });
      },
      cancel: function cancel() {
        this.transitionTo('articles');
      }

    }

  });

});
define('borrowers/routes/articles', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('borrowers/routes/friends/edit', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    resetController: function resetController(controller, isExiting) {
      if (isExiting) {
        var model = controller.get('model');
        model.rollback();
      }
    }
  });

});
define('borrowers/routes/friends/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    queryParams: {
      sortBy: {
        refreshModel: true
      },
      sortAscending: {
        refreshModel: true
      }
    },

    model: function model(params) {
      return this.store.findAll('friend', params);
    }

  });

});
define('borrowers/routes/friends/new', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return this.store.createRecord('friend');
    },
    resetController: function resetController(controller, isExiting) {
      if (isExiting) {
        //在控制器上获取模型
        var model = controller.get('model');
        //离开路由的时候确认这个模型是否处于isNew状态
        //也就是说，是否没有保存到后端
        if (model.get('isNew')) {
          //调用DS#destroyRecord()方法,
          //把这个模型从存储层中删除
          model.destroyRecord();
        }
      }
    }
  });

});
define('borrowers/routes/friends/show', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({

    model: function model() {
      return this.store.find('friend', params.friend_id);
    }

  });

});
define('borrowers/routes/friends', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    actions: {
      'delete': function _delete(friend) {
        var _this = this;

        friend.destroyRecord().then(function () {
          _this.transitionTo('friends.index');
        });
      }
    }
  });

});
define('borrowers/routes/index', ['exports', 'ember', 'ic-ajax'], function (exports, Ember, request) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({

    model: function model() {
      return request['default']('/api/friends').then(function (data) {
        return {
          friendsCount: data.friends.length
        };
      });
    }

  });

});
define('borrowers/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 0
          }
        },
        "moduleName": "borrowers/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("main");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]),1,1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["inline","partial",["partials/header"],[],["loc",[null,[1,0],[1,29]]]],
        ["content","outlet",["loc",[null,[3,0],[3,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('borrowers/templates/articles/form', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "borrowers/templates/articles/form.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("form");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("fieldset");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3,"class","primary");
        var el4 = dom.createTextNode("Save");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        var el4 = dom.createTextNode("Cancel");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [3]);
        var element2 = dom.childAt(element1, [7]);
        var element3 = dom.childAt(element1, [9]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
        morphs[1] = dom.createMorphAt(element1,1,1);
        morphs[2] = dom.createMorphAt(element1,4,4);
        morphs[3] = dom.createElementMorph(element2);
        morphs[4] = dom.createElementMorph(element3);
        return morphs;
      },
      statements: [
        ["content","errorMessage",["loc",[null,[2,6],[2,22]]]],
        ["inline","input",[],["value",["subexpr","@mut",[["get","model.description",["loc",[null,[4,18],[4,35]]]]],[],[]],"placeholder","Description"],["loc",[null,[4,4],[4,63]]]],
        ["inline","input",[],["value",["subexpr","@mut",[["get","model.notes",["loc",[null,[5,18],[5,29]]]]],[],[]],"placeholder","Notes"],["loc",[null,[5,4],[5,51]]]],
        ["element","action",["save"],[],["loc",[null,[6,12],[6,29]]]],
        ["element","action",["cancel"],[],["loc",[null,[7,12],[7,31]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('borrowers/templates/articles/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 12,
                "column": 3
              },
              "end": {
                "line": 13,
                "column": 4
              }
            },
            "moduleName": "borrowers/templates/articles/index.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() { return []; },
          statements: [

          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 11,
              "column": 2
            },
            "end": {
              "line": 14,
              "column": 2
            }
          },
          "moduleName": "borrowers/templates/articles/index.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","articles/article-row",[],["article",["subexpr","@mut",[["get","article",["loc",[null,[12,35],[12,42]]]]],[],[]],"save","save","articleStates",["subexpr","@mut",[["get","possibleStates",["loc",[null,[12,69],[12,83]]]]],[],[]]],0,null,["loc",[null,[12,3],[13,29]]]]
        ],
        locals: ["article"],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 17,
            "column": 0
          }
        },
        "moduleName": "borrowers/templates/articles/index.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("table");
        dom.setAttribute(el1,"class","primary");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("thead");
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("Description");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("Notes");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("Borrowed since");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("tbody");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 3]),1,1);
        return morphs;
      },
      statements: [
        ["block","each",[["get","model",["loc",[null,[11,10],[11,15]]]]],[],0,null,["loc",[null,[11,2],[14,11]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('borrowers/templates/articles/new', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "borrowers/templates/articles/new.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Lending new articles");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,2,2,contextualElement);
        return morphs;
      },
      statements: [
        ["inline","partial",["articles/form"],[],["loc",[null,[2,0],[2,27]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('borrowers/templates/articles', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "borrowers/templates/articles.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,0],[1,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('borrowers/templates/components/articles/article-row', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "revision": "Ember@1.13.7",
              "loc": {
                "source": null,
                "start": {
                  "line": 7,
                  "column": 3
                },
                "end": {
                  "line": 7,
                  "column": 37
                }
              },
              "moduleName": "borrowers/templates/components/articles/article-row.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [
              ["content","state",["loc",[null,[7,28],[7,37]]]]
            ],
            locals: [],
            templates: []
          };
        }());
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 6,
                "column": 2
              },
              "end": {
                "line": 8,
                "column": 3
              }
            },
            "moduleName": "borrowers/templates/components/articles/article-row.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("   ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
            return morphs;
          },
          statements: [
            ["block","x-option",[],["value",["subexpr","@mut",[["get","state",["loc",[null,[7,21],[7,26]]]]],[],[]]],0,null,["loc",[null,[7,3],[7,50]]]]
          ],
          locals: ["state"],
          templates: [child0]
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 2
            },
            "end": {
              "line": 9,
              "column": 3
            }
          },
          "moduleName": "borrowers/templates/components/articles/article-row.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","each",[["get","articleStates",["loc",[null,[6,10],[6,23]]]]],[],0,null,["loc",[null,[6,2],[8,12]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 3
            },
            "end": {
              "line": 14,
              "column": 2
            }
          },
          "moduleName": "borrowers/templates/components/articles/article-row.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("   ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("Saving...");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 16,
            "column": 0
          }
        },
        "moduleName": "borrowers/templates/components/articles/article-row.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("td");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("td");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("td");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("td");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("td");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [4]),0,0);
        morphs[3] = dom.createMorphAt(dom.childAt(fragment, [6]),1,1);
        morphs[4] = dom.createMorphAt(dom.childAt(fragment, [8]),1,1);
        return morphs;
      },
      statements: [
        ["content","article.description",["loc",[null,[1,4],[1,27]]]],
        ["content","article.notes",["loc",[null,[2,4],[2,21]]]],
        ["inline","formatted-date",[["get","article.createdAt",["loc",[null,[3,21],[3,38]]]],"LL"],[],["loc",[null,[3,4],[3,45]]]],
        ["block","x-select",[],["value",["subexpr","@mut",[["get","article.state",["loc",[null,[5,20],[5,33]]]]],[],[]]],0,null,["loc",[null,[5,2],[9,16]]]],
        ["block","if",[["get","article.isSaving",["loc",[null,[12,9],[12,25]]]]],[],1,null,["loc",[null,[12,3],[14,9]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('borrowers/templates/components/x-select', ['exports', 'emberx-select/templates/components/x-select'], function (exports, x_select) {

	'use strict';



	exports['default'] = x_select['default'];

});
define('borrowers/templates/friends/edit', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "borrowers/templates/friends/edit.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Editing ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),1,1);
        morphs[1] = dom.createMorphAt(fragment,2,2,contextualElement);
        return morphs;
      },
      statements: [
        ["content","model.fullName",["loc",[null,[1,12],[1,30]]]],
        ["inline","partial",["friends/form"],[],["loc",[null,[2,0],[2,26]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('borrowers/templates/friends/form', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 12,
            "column": 0
          }
        },
        "moduleName": "borrowers/templates/friends/form.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("form");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("fieldset");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("input");
        dom.setAttribute(el3,"type","submit");
        dom.setAttribute(el3,"value","Save");
        dom.setAttribute(el3,"class","primary");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        var el4 = dom.createTextNode("Cancel");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [3]);
        var element2 = dom.childAt(element1, [15]);
        var morphs = new Array(7);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
        morphs[2] = dom.createMorphAt(element1,1,1);
        morphs[3] = dom.createMorphAt(element1,4,4);
        morphs[4] = dom.createMorphAt(element1,7,7);
        morphs[5] = dom.createMorphAt(element1,10,10);
        morphs[6] = dom.createElementMorph(element2);
        return morphs;
      },
      statements: [
        ["element","action",["save"],["on","submit"],["loc",[null,[1,6],[1,35]]]],
        ["content","errorMessage",["loc",[null,[2,6],[2,22]]]],
        ["inline","input",[],["value",["subexpr","@mut",[["get","model.firstName",["loc",[null,[4,18],[4,33]]]]],[],[]],"placeholder","First Name"],["loc",[null,[4,4],[4,60]]]],
        ["inline","input",[],["value",["subexpr","@mut",[["get","model.lastName",["loc",[null,[5,18],[5,32]]]]],[],[]],"placeholder","Last Name"],["loc",[null,[5,4],[5,58]]]],
        ["inline","input",[],["value",["subexpr","@mut",[["get","model.email",["loc",[null,[6,18],[6,29]]]]],[],[]],"placeholder","email"],["loc",[null,[6,4],[6,51]]]],
        ["inline","input",[],["value",["subexpr","@mut",[["get","model.twitter",["loc",[null,[7,18],[7,31]]]]],[],[]],"placeholder","twitter"],["loc",[null,[7,4],[7,55]]]],
        ["element","action",["cancel"],[],["loc",[null,[9,11],[9,30]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('borrowers/templates/friends/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 6
            },
            "end": {
              "line": 15,
              "column": 6
            }
          },
          "moduleName": "borrowers/templates/friends/index.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3,"href","#");
          var el4 = dom.createTextNode("Delete");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [3, 0]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
          morphs[1] = dom.createElementMorph(element1);
          return morphs;
        },
        statements: [
          ["inline","link-to",[["get","friend.fullName",["loc",[null,[12,22],[12,37]]]],"articles",["get","friend",["loc",[null,[12,49],[12,55]]]]],[],["loc",[null,[12,12],[12,57]]]],
          ["element","action",["delete",["get","friend",["loc",[null,[13,42],[13,48]]]]],[],["loc",[null,[13,24],[13,50]]]]
        ],
        locals: ["friend"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 19,
            "column": 0
          }
        },
        "moduleName": "borrowers/templates/friends/index.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("table");
        dom.setAttribute(el1,"class","friends-table primary");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("thead");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("Name");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("articles");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("tbody");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [1]);
        var element3 = dom.childAt(element2, [1, 1]);
        var element4 = dom.childAt(element3, [1]);
        var element5 = dom.childAt(element3, [3]);
        var morphs = new Array(4);
        morphs[0] = dom.createElementMorph(element4);
        morphs[1] = dom.createElementMorph(element5);
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [3]),1,1);
        morphs[3] = dom.createMorphAt(fragment,3,3,contextualElement);
        return morphs;
      },
      statements: [
        ["element","action",["setSortBy","firstName"],[],["loc",[null,[5,10],[5,44]]]],
        ["element","action",["setSortBy","totalArticles"],[],["loc",[null,[6,10],[6,48]]]],
        ["block","each",[["get","model",["loc",[null,[10,14],[10,19]]]]],[],0,null,["loc",[null,[10,6],[15,15]]]],
        ["content","outlet",["loc",[null,[18,0],[18,10]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('borrowers/templates/friends/new', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "borrowers/templates/friends/new.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Add a New Friend");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,2,2,contextualElement);
        return morphs;
      },
      statements: [
        ["inline","partial",["friends/form"],[],["loc",[null,[2,0],[2,26]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('borrowers/templates/friends/show', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 14,
            "column": 0
          }
        },
        "moduleName": "borrowers/templates/friends/show.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","card friend-profile");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createElement("a");
        dom.setAttribute(el3,"href","#");
        var el4 = dom.createTextNode("delete");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","articles-container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [1]);
        var element1 = dom.childAt(element0, [13, 0]);
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]),0,0);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [7]),0,0);
        morphs[4] = dom.createMorphAt(dom.childAt(element0, [9]),0,0);
        morphs[5] = dom.createMorphAt(dom.childAt(element0, [11]),0,0);
        morphs[6] = dom.createElementMorph(element1);
        morphs[7] = dom.createMorphAt(dom.childAt(fragment, [3]),1,1);
        return morphs;
      },
      statements: [
        ["content","model.firstName",["loc",[null,[3,5],[3,24]]]],
        ["content","model.lastName",["loc",[null,[4,5],[4,23]]]],
        ["content","model.email",["loc",[null,[5,5],[5,20]]]],
        ["content","model.twitter",["loc",[null,[6,5],[6,22]]]],
        ["inline","link-to",["Lend article","articles.new"],[],["loc",[null,[7,5],[7,46]]]],
        ["inline","link-to",["Edit info","friends.edit",["get","model",["loc",[null,[8,42],[8,47]]]]],[],["loc",[null,[8,5],[8,49]]]],
        ["element","action",["delete",["get","model",["loc",[null,[9,35],[9,40]]]]],[],["loc",[null,[9,17],[9,42]]]],
        ["content","outlet",["loc",[null,[12,2],[12,12]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('borrowers/templates/friends', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "borrowers/templates/friends.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[2,0],[2,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('borrowers/templates/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "borrowers/templates/index.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Dashboard");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("hr");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Total Friends:");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [4]),1,1);
        return morphs;
      },
      statements: [
        ["content","model.friendsCount",["loc",[null,[3,18],[3,40]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('borrowers/templates/partials/header', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 0
          }
        },
        "moduleName": "borrowers/templates/partials/header.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("nav");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("responsiveness");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("input");
        dom.setAttribute(el2,"class","show");
        dom.setAttribute(el2,"id","bmenu");
        dom.setAttribute(el2,"type","checkbox");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("label");
        dom.setAttribute(el2,"class","burger toggle pseudo button");
        dom.setAttribute(el2,"for","bmenu");
        var el3 = dom.createTextNode("menu");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("responsiveness");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","menu");
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [11]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(element0,1,1);
        morphs[1] = dom.createMorphAt(element1,1,1);
        morphs[2] = dom.createMorphAt(element1,3,3);
        morphs[3] = dom.createMorphAt(element1,5,5);
        return morphs;
      },
      statements: [
        ["inline","link-to",["Borrowers","index"],["class","brand"],["loc",[null,[2,2],[2,47]]]],
        ["inline","link-to",["Dashboard","index"],["class","pseudo button icon-gauge"],["loc",[null,[8,6],[8,70]]]],
        ["inline","link-to",["Friends","friends"],["class","pseudo button icon-users-1"],["loc",[null,[9,6],[9,72]]]],
        ["inline","link-to",["New Friend","friends.new"],["class","pseudo button icon-user-add"],["loc",[null,[10,6],[10,80]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('borrowers/tests/adapters/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - adapters/application.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(false, 'adapters/application.js should pass jshint.\nadapters/application.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nadapters/application.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nadapters/application.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
  });

});
define('borrowers/tests/app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - app.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(false, 'app.js should pass jshint.\napp.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\napp.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\napp.js: line 3, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\napp.js: line 4, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\napp.js: line 18, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n5 errors');
  });

});
define('borrowers/tests/components/articles/article-row.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components/articles/article-row.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(false, 'components/articles/article-row.js should pass jshint.\ncomponents/articles/article-row.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/articles/article-row.js: line 2, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/articles/article-row.js: line 8, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncomponents/articles/article-row.js: line 9, col 9, \'article\' is already defined.\n\n4 errors');
  });

});
define('borrowers/tests/controllers/articles/index.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/articles/index.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/articles/index.js should pass jshint.\ncontrollers/articles/index.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/articles/index.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });

});
define('borrowers/tests/controllers/articles/new.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/articles/new.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/articles/new.js should pass jshint.\ncontrollers/articles/new.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/articles/new.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/articles/new.js: line 5, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncontrollers/articles/new.js: line 7, col 28, Missing semicolon.\ncontrollers/articles/new.js: line 10, col 16, Unnecessary semicolon.\n\n5 errors');
  });

});
define('borrowers/tests/controllers/friends/base.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/friends/base.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/friends/base.js should pass jshint.\ncontrollers/friends/base.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/friends/base.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/friends/base.js: line 22, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncontrollers/friends/base.js: line 24, col 46, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/friends/base.js: line 33, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n5 errors');
  });

});
define('borrowers/tests/controllers/friends/edit.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/friends/edit.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/friends/edit.js should pass jshint.\ncontrollers/friends/edit.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/friends/edit.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/friends/edit.js: line 7, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n3 errors');
  });

});
define('borrowers/tests/controllers/friends/index.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/friends/index.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/friends/index.js should pass jshint.\ncontrollers/friends/index.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/friends/index.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });

});
define('borrowers/tests/controllers/friends/new.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/friends/new.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/friends/new.js should pass jshint.\ncontrollers/friends/new.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/friends/new.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/friends/new.js: line 8, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n3 errors');
  });

});
define('borrowers/tests/helpers/formatted-date.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers/formatted-date.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/formatted-date.js should pass jshint.\nhelpers/formatted-date.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nhelpers/formatted-date.js: line 3, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nhelpers/formatted-date.js: line 3, col 49, Missing semicolon.\nhelpers/formatted-date.js: line 5, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nhelpers/formatted-date.js: line 5, col 30, \'destructuring binding\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nhelpers/formatted-date.js: line 9, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n6 errors');
  });

});
define('borrowers/tests/helpers/register-select-helper', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = function () {
    Ember['default'].Test.registerAsyncHelper('select', function (app, selector) {
      for (var _len = arguments.length, texts = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        texts[_key - 2] = arguments[_key];
      }

      var $options = app.testHelpers.findWithAssert(selector + ' option');

      $options.each(function () {
        var _this = this;

        var $option = Ember['default'].$(this);

        Ember['default'].run(function () {
          _this.selected = texts.some(function (text) {
            return $option.is(':contains(\'' + text + '\')');
          });
          $option.trigger('change');
        });
      });

      return app.testHelpers.wait();
    });
  }

});
define('borrowers/tests/helpers/resolver', ['exports', 'ember/resolver', 'borrowers/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('borrowers/tests/helpers/resolver.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers/resolver.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });

});
define('borrowers/tests/helpers/start-app', ['exports', 'ember', 'borrowers/app', 'borrowers/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('borrowers/tests/helpers/start-app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers/start-app.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });

});
define('borrowers/tests/integration/components/articles/article-row-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('articles/article-row', 'Integration | Component | articles/article row', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 24
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'articles/article-row', ['loc', [null, [1, 0], [1, 24]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'revision': 'Ember@1.13.7',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'articles/article-row', [], [], 0, null, ['loc', [null, [2, 4], [4, 29]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('borrowers/tests/integration/components/articles/article-row-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components/articles/article-row-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/articles/article-row-test.js should pass jshint.');
  });

});
define('borrowers/tests/models/article.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models/article.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(false, 'models/article.js should pass jshint.\nmodels/article.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/article.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });

});
define('borrowers/tests/models/friend.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models/friend.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(false, 'models/friend.js should pass jshint.\nmodels/friend.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/friend.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmodels/friend.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nmodels/friend.js: line 12, col 8, Missing property name.\n\n4 errors');
  });

});
define('borrowers/tests/router.jshint', function () {

  'use strict';

  QUnit.module('JSHint - router.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(false, 'router.js should pass jshint.\nrouter.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nrouter.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nrouter.js: line 25, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
  });

});
define('borrowers/tests/routes/articles/index.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/articles/index.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(false, 'routes/articles/index.js should pass jshint.\nroutes/articles/index.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/articles/index.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/articles/index.js: line 4, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nroutes/articles/index.js: line 8, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n4 errors');
  });

});
define('borrowers/tests/routes/articles/new.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/articles/new.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(false, 'routes/articles/new.js should pass jshint.\nroutes/articles/new.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/articles/new.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/articles/new.js: line 4, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nroutes/articles/new.js: line 10, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nroutes/articles/new.js: line 12, col 26, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\nroutes/articles/new.js: line 16, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n6 errors');
  });

});
define('borrowers/tests/routes/articles.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/articles.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(false, 'routes/articles.js should pass jshint.\nroutes/articles.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/articles.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });

});
define('borrowers/tests/routes/friends/edit.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/friends/edit.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(false, 'routes/friends/edit.js should pass jshint.\nroutes/friends/edit.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/friends/edit.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/friends/edit.js: line 4, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n3 errors');
  });

});
define('borrowers/tests/routes/friends/index.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/friends/index.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(false, 'routes/friends/index.js should pass jshint.\nroutes/friends/index.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/friends/index.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/friends/index.js: line 13, col 4, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n3 errors');
  });

});
define('borrowers/tests/routes/friends/new.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/friends/new.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(false, 'routes/friends/new.js should pass jshint.\nroutes/friends/new.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/friends/new.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/friends/new.js: line 4, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nroutes/friends/new.js: line 7, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n4 errors');
  });

});
define('borrowers/tests/routes/friends/show.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/friends/show.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(false, 'routes/friends/show.js should pass jshint.\nroutes/friends/show.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/friends/show.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/friends/show.js: line 5, col 4, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n3 errors');
  });

});
define('borrowers/tests/routes/friends.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/friends.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(false, 'routes/friends.js should pass jshint.\nroutes/friends.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/friends.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/friends.js: line 5, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nroutes/friends.js: line 6, col 36, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\nroutes/friends.js: line 8, col 9, Missing semicolon.\n\n5 errors');
  });

});
define('borrowers/tests/routes/index.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/index.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(false, 'routes/index.js should pass jshint.\nroutes/index.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/index.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/index.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/index.js: line 6, col 1, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n4 errors');
  });

});
define('borrowers/tests/test-helper', ['borrowers/tests/helpers/resolver', 'borrowers/tests/helpers/register-select-helper', 'ember-qunit'], function (resolver, registerSelectHelper, ember_qunit) {

	'use strict';

	registerSelectHelper['default']();ember_qunit.setResolver(resolver['default']);

});
define('borrowers/tests/test-helper.jshint', function () {

  'use strict';

  QUnit.module('JSHint - test-helper.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });

});
define('borrowers/tests/unit/adapters/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });

});
define('borrowers/tests/unit/adapters/application-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/adapters/application-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass jshint.');
  });

});
define('borrowers/tests/unit/controllers/articles/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:articles/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('borrowers/tests/unit/controllers/articles/index-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers/articles/index-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/articles/index-test.js should pass jshint.');
  });

});
define('borrowers/tests/unit/controllers/articles/new-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:articles/new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('borrowers/tests/unit/controllers/articles/new-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers/articles/new-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/articles/new-test.js should pass jshint.');
  });

});
define('borrowers/tests/unit/controllers/friends/base-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:friends/base', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('borrowers/tests/unit/controllers/friends/base-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers/friends/base-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/friends/base-test.js should pass jshint.');
  });

});
define('borrowers/tests/unit/controllers/friends/edit-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:friends/edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('borrowers/tests/unit/controllers/friends/edit-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers/friends/edit-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/friends/edit-test.js should pass jshint.');
  });

});
define('borrowers/tests/unit/controllers/friends/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:friends/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('borrowers/tests/unit/controllers/friends/index-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers/friends/index-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/friends/index-test.js should pass jshint.');
  });

});
define('borrowers/tests/unit/controllers/friends/new-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:friends/new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('borrowers/tests/unit/controllers/friends/new-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers/friends/new-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/friends/new-test.js should pass jshint.');
  });

});
define('borrowers/tests/unit/helpers/formatted-date-test', ['borrowers/helpers/formatted-date', 'qunit'], function (formatted_date, qunit) {

  'use strict';

  qunit.module('Unit | Helper | formatted date');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var result = formatted_date.formattedDate(42);
    assert.ok(result);
  });

});
define('borrowers/tests/unit/helpers/formatted-date-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/helpers/formatted-date-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/formatted-date-test.js should pass jshint.');
  });

});
define('borrowers/tests/unit/models/article-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('article', 'Unit | Model | article', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('borrowers/tests/unit/models/article-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models/article-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/article-test.js should pass jshint.');
  });

});
define('borrowers/tests/unit/models/friend-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('friend', 'Unit | Model | friend', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('borrowers/tests/unit/models/friend-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models/friend-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/friend-test.js should pass jshint.');
  });

});
define('borrowers/tests/unit/routes/articles/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:articles/index', 'Unit | Route | articles/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('borrowers/tests/unit/routes/articles/index-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/articles/index-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/articles/index-test.js should pass jshint.');
  });

});
define('borrowers/tests/unit/routes/articles/new-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:articles/new', 'Unit | Route | articles/new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('borrowers/tests/unit/routes/articles/new-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/articles/new-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/articles/new-test.js should pass jshint.');
  });

});
define('borrowers/tests/unit/routes/articles-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:articles', 'Unit | Route | articles', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('borrowers/tests/unit/routes/articles-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/articles-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/articles-test.js should pass jshint.');
  });

});
define('borrowers/tests/unit/routes/friends/edit-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:friends/edit', 'Unit | Route | friends/edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('borrowers/tests/unit/routes/friends/edit-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/friends/edit-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/friends/edit-test.js should pass jshint.');
  });

});
define('borrowers/tests/unit/routes/friends/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:friends/index', 'Unit | Route | friends/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('borrowers/tests/unit/routes/friends/index-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/friends/index-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/friends/index-test.js should pass jshint.');
  });

});
define('borrowers/tests/unit/routes/friends/new-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:friends/new', 'Unit | Route | friends/new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('borrowers/tests/unit/routes/friends/new-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/friends/new-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/friends/new-test.js should pass jshint.');
  });

});
define('borrowers/tests/unit/routes/friends/show-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:friends/show', 'Unit | Route | friends/show', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('borrowers/tests/unit/routes/friends/show-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/friends/show-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/friends/show-test.js should pass jshint.');
  });

});
define('borrowers/tests/unit/routes/friends-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:friends', 'Unit | Route | friends', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('borrowers/tests/unit/routes/friends-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/friends-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/friends-test.js should pass jshint.');
  });

});
define('borrowers/tests/unit/routes/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('borrowers/tests/unit/routes/index-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/index-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass jshint.');
  });

});
define('borrowers/tests/unit/utils/date-helpers-test', ['borrowers/utils/date-helpers', 'qunit'], function (dateHelpers, qunit) {

  'use strict';

  qunit.module('Unit | Utility | date helpers');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var result = dateHelpers['default']();
    assert.ok(result);
  });

});
define('borrowers/tests/unit/utils/date-helpers-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/utils/date-helpers-test.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/date-helpers-test.js should pass jshint.');
  });

});
define('borrowers/tests/utils/date-helpers.jshint', function () {

  'use strict';

  QUnit.module('JSHint - utils/date-helpers.js');
  QUnit.test('should pass jshint', function(assert) {
    assert.expect(1);
    assert.ok(false, 'utils/date-helpers.js should pass jshint.\nutils/date-helpers.js: line 9, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n1 error');
  });

});
define('borrowers/utils/date-helpers', ['exports'], function (exports) {

  'use strict';

  exports.formatDate = formatDate;

  // export default function dateHelpers() {
  //   return true;
  // }

  function formatDate(date, format) {
    return window.moment(date).format(format);
  }

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('borrowers/config/environment', ['ember'], function(Ember) {
  var prefix = 'borrowers';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("borrowers/tests/test-helper");
} else {
  require("borrowers/app")["default"].create({"name":"borrowers","version":"0.0.0+9849d7eb"});
}

/* jshint ignore:end */
//# sourceMappingURL=borrowers.map