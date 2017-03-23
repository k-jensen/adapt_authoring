// LICENCE https://github.com/adaptlearning/adapt_authoring/blob/master/LICENSE
define(function(require) {
  var Origin = require('coreJS/app/origin');
  var EditorData = require('../global/editorDataLoader');

  var EditorConfigEditView = require('./views/editorConfigEditView');
  var EditorConfigEditSidebarView = require('./views/editorConfigEditSidebarView');
  var EditorConfigModel = require('./models/editorConfigModel');

  Origin.on('router:editor', function(route1, route2, route3, route4) {
    EditorData.waitForLoad(function() {
      if(route2 !== 'config') {
        return;
      }
      (new EditorConfigModel({ _courseId: route1 })).fetch({
        success: function(model) {
          var form = Origin.scaffold.buildForm({ model: model });
          Origin.trigger('location:title:update', { title: 'Edit configuration' });
          Origin.sidebar.addView(new EditorConfigEditSidebarView({ form: form }).$el);
          Origin.contentPane.setView(EditorConfigEditView, { model: model, form: form });
        }
      });
    });
  });
});
