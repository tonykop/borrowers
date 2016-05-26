define('emberx-select/components/x-option', ['exports', 'ember', 'emberx-select/components/x-select'], function (exports, Ember, XSelectComponent) {

  'use strict';

  var isArray = Ember['default'].isArray;

  /**
   * Used to wrap a native `<option>` tag and associate an object with
   * it that can be bound. It can only be used in conjuction with a
   * containing `x-select` component
   *
   * @class Ember.XOptionComponent
   * @extends Ember.Component
   */
  exports['default'] = Ember['default'].Component.extend({
    tagName: 'option',
    attributeBindings: ['selected', 'name', 'disabled', 'value', 'title'],
    classNameBindings: [':x-option'],

    /**
     * The value associated with this option. When this option is
     * selected, the `x-select` will fire its action with this
     * value.
     *
     * @property value
     * @type Object
     * @default null
     */
    value: null,

    /**
     * Property bound to the `selected` attribute of the native
     * `<option>` element. It is aware of the containing `x-select`'s
     * value and will mark itself if it is the same.
     *
     * @private
     * @property selected
     * @type Boolean
     */
    selected: Ember['default'].computed('value', 'select.value', 'select.multiple', function () {
      if (this.get('select.multiple') && isArray(this.get('select.value'))) {
        var selectValue = Ember['default'].A(this.get('select.value'));

        return selectValue.contains(this.get('value'));
      } else {
        return this.get('value') === this.get('select.value');
      }
    }),

    /**
     * Register this x-option with the containing `x-select`
     *
     * @override
     */
    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      Ember['default'].run.scheduleOnce('afterRender', this, 'registerWithXSelect');
    },

    select: Ember['default'].computed(function () {
      return this.nearestOfType(XSelectComponent['default']);
    }),

    registerWithXSelect: function registerWithXSelect() {
      var select = this.get('select');
      Ember['default'].assert("x-option component declared without enclosing x-select", !!select);
      select.registerOption(this);
    },

    /**
     * Unregister this x-option with its containing x-select.
     *
     * @override
     */
    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      var select = this.get('select');
      if (select) {
        select.unregisterOption(this);
      }
    }
  });

});