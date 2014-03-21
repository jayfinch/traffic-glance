define(["dust"], function(dust) {
  (function(){dust.register("scripts/templates/route",body_0);function body_0(chk,ctx){return chk.write("<div class=\"name\"><a href=\"").reference(ctx.get(["url"], false),ctx,"h").write("\" target=\"_blank\">").reference(ctx.get(["name"], false),ctx,"h").write("</a></div><div class=\"row\"><div class=\"col-xs-5 col-sm-4 chart\">").exists(ctx.get(["travelDurationByCongestion"], false),ctx,{"else":body_1,"block":body_2},null).write("</div><div class=\"col-xs-7 col-sm-8 stats\">").section(ctx.get(["travelDurationStats"], false),ctx,{"else":body_3,"block":body_4},null).write("</div></div><div class=\"row\"><div class=\"col-xs-12\">").exists(ctx.get(["travelWarnings"], false),ctx,{"block":body_9},null).write("</div></div>");}function body_1(chk,ctx){return chk.write("<a href=\"#\" class=\"refresh\" title=\"Refresh\"><img src=\"images/refresh-circle.svg\" class=\"img-responsive center-block\"></a>");}function body_2(chk,ctx){return chk.write("<canvas height=\"150\" width=\"150\" class=\"img-responsive\">");}function body_3(chk,ctx){return chk.write("<div class=\"duration\"><span class=\"nobreak\">—</span></div><div class=\"detail\"><span class=\"nobreak\">—</span></div><div class=\"detail\"><span class=\"nobreak\">—</span></div>");}function body_4(chk,ctx){return chk.write("<div class=\"duration\">").helper("if",ctx,{"block":body_5},{"cond":body_6}).helper("if",ctx,{"block":body_7},{"cond":body_8}).write("</div><div class=\"detail\"><span class=\"nobreak\">").reference(ctx.get(["distance"], false),ctx,"h").write(" ").reference(ctx.get(["units"], false),ctx,"h").write("</span></div><div class=\"detail\"><span class=\"nobreak\">").reference(ctx.get(["arriveTime"], false),ctx,"h").write("</span></div>");}function body_5(chk,ctx){return chk.write("<span class=\"nobreak\">").reference(ctx.get(["hours"], false),ctx,"h").write("<span class=\"unit\">&nbsp;hr&nbsp;&nbsp;</span></span><span><!--space--></span>");}function body_6(chk,ctx){return chk.reference(ctx.get(["hours"], false),ctx,"h").write(" > 0");}function body_7(chk,ctx){return chk.write("<span class=\"nobreak\">").reference(ctx.get(["minutes"], false),ctx,"h").write("<span class=\"unit\">&nbsp;min</span></span>");}function body_8(chk,ctx){return chk.reference(ctx.get(["minutes"], false),ctx,"h").write(" > 0");}function body_9(chk,ctx){return chk.write("<ul class=\"warnings\">").section(ctx.get(["travelWarnings"], false),ctx,{"block":body_10},null).write("</ul>");}function body_10(chk,ctx){return chk.write("<li>").reference(ctx.getPath(true, []),ctx,"h").write("</li>");}return body_0;})();

  return {
    render: function(context, callback) {
      if(!callback && typeof context === 'function') {
        callback = context;
        context = {};
      }

      dust.render("scripts/templates/route", context, callback);
    },

    renderSync: function(context) {
      if(!context) {
        context = {};
      }

      var output;

      dust.render("scripts/templates/route", context, function(error, html) {
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

      dust.stream("scripts/templates/route", context, callback);
    }
  };
});