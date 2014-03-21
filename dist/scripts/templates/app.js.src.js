define(["dust"], function(dust) {
  (function(){dust.register("scripts/templates/app",body_0);function body_0(chk,ctx){return chk.write("<div class=\"toolbar\"><a href=\"#\"><img src=\"images/refresh-circle.svg\" class=\"refresh-all\"></a><div class=\"site-name\">TrafficGlance</div></div><div class=\"container\"><div class=\"row\" id=\"routes\"><div class=\"loading\">Loading...</div></div><div class=\"row credit\"><div class=\"col-xs-12\"><a href=\"#\">Powered by Bing™</a></div></div></div>");}return body_0;})();

  return {
    render: function(context, callback) {
      if(!callback && typeof context === 'function') {
        callback = context;
        context = {};
      }

      dust.render("scripts/templates/app", context, callback);
    },

    renderSync: function(context) {
      if(!context) {
        context = {};
      }

      var output;

      dust.render("scripts/templates/app", context, function(error, html) {
        if(error) {
          throw error;
        }

        output = html;
      });

      return output;
    },

    stream: function(context, callback) {
      if(!callback && typeof context === 'function') {
        callback = context;
        context = {};
      }

      dust.stream("scripts/templates/app", context, callback);
    }
  };
});