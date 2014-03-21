window.Chart=function(e){function t(e,t,a){var n=t.steps*t.stepValue,l=e-t.graphMin,o=c(l/n,1,0);return a*t.steps*o}function a(e,t,a,n){function l(){var l=e.animation?c(s(r),null,0):1;g(n),e.scaleOverlay?(a(l),t()):(t(),a(l))}function o(){r+=i,l(),1>=r?w(o):"function"==typeof e.onAnimationComplete&&e.onAnimationComplete()}var i=e.animation?1/c(e.animationSteps,Number.MAX_VALUE,1):1,s=S[e.animationEasing],r=e.animation?0:1;"function"!=typeof t&&(t=function(){}),w(o)}function n(e,t,a,n,o,i){function s(e){return Math.floor(Math.log(e)/Math.LN10)}var r,c,u,d,h,f,S;for(f=n-o,S=s(f),r=Math.floor(o/(1*Math.pow(10,S)))*Math.pow(10,S),c=Math.ceil(n/(1*Math.pow(10,S)))*Math.pow(10,S),u=c-r,d=Math.pow(10,S),h=Math.round(u/d);a>h||h>t;)a>h?(d/=2,h=Math.round(u/d)):(d*=2,h=Math.round(u/d));var p=[];return l(i,p,h,r,d),{steps:h,stepValue:d,graphMin:r,labels:p}}function l(e,t,a,n,l){if(e)for(var o=1;a+1>o;o++)t.push(h(e,{value:(n+l*o).toFixed(u(l))}))}function o(e){return Math.max.apply(Math,e)}function i(e){return Math.min.apply(Math,e)}function s(e,t){return e?e:t}function r(e){return!isNaN(parseFloat(e))&&isFinite(e)}function c(e,t,a){return r(t)&&e>t?t:r(a)&&a>e?a:e}function u(e){return e%1!=0?e.toString().split(".")[1].length:0}function d(e,t){var a={};for(var n in e)a[n]=e[n];for(var n in t)a[n]=t[n];return a}function h(e,t){var a=/\W/.test(e)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+e.replace(/[\r\t\n]/g," ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):P[e]=P[e]||h(document.getElementById(e).innerHTML);return t?a(t):a}var f=this,S={linear:function(e){return e},easeInQuad:function(e){return e*e},easeOutQuad:function(e){return-1*e*(e-2)},easeInOutQuad:function(e){return(e/=.5)<1?.5*e*e:-0.5*(--e*(e-2)-1)},easeInCubic:function(e){return e*e*e},easeOutCubic:function(e){return 1*((e=e/1-1)*e*e+1)},easeInOutCubic:function(e){return(e/=.5)<1?.5*e*e*e:.5*((e-=2)*e*e+2)},easeInQuart:function(e){return e*e*e*e},easeOutQuart:function(e){return-1*((e=e/1-1)*e*e*e-1)},easeInOutQuart:function(e){return(e/=.5)<1?.5*e*e*e*e:-0.5*((e-=2)*e*e*e-2)},easeInQuint:function(e){return 1*(e/=1)*e*e*e*e},easeOutQuint:function(e){return 1*((e=e/1-1)*e*e*e*e+1)},easeInOutQuint:function(e){return(e/=.5)<1?.5*e*e*e*e*e:.5*((e-=2)*e*e*e*e+2)},easeInSine:function(e){return-1*Math.cos(e/1*(Math.PI/2))+1},easeOutSine:function(e){return 1*Math.sin(e/1*(Math.PI/2))},easeInOutSine:function(e){return-0.5*(Math.cos(Math.PI*e/1)-1)},easeInExpo:function(e){return 0==e?1:1*Math.pow(2,10*(e/1-1))},easeOutExpo:function(e){return 1==e?1:1*(-Math.pow(2,-10*e/1)+1)},easeInOutExpo:function(e){return 0==e?0:1==e?1:(e/=.5)<1?.5*Math.pow(2,10*(e-1)):.5*(-Math.pow(2,-10*--e)+2)},easeInCirc:function(e){return e>=1?e:-1*(Math.sqrt(1-(e/=1)*e)-1)},easeOutCirc:function(e){return 1*Math.sqrt(1-(e=e/1-1)*e)},easeInOutCirc:function(e){return(e/=.5)<1?-0.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1)},easeInElastic:function(e){var t=1.70158,a=0,n=1;if(0==e)return 0;if(1==(e/=1))return 1;if(a||(a=.3),n<Math.abs(1)){n=1;var t=a/4}else var t=a/(2*Math.PI)*Math.asin(1/n);return-(n*Math.pow(2,10*(e-=1))*Math.sin(2*(1*e-t)*Math.PI/a))},easeOutElastic:function(e){var t=1.70158,a=0,n=1;if(0==e)return 0;if(1==(e/=1))return 1;if(a||(a=.3),n<Math.abs(1)){n=1;var t=a/4}else var t=a/(2*Math.PI)*Math.asin(1/n);return n*Math.pow(2,-10*e)*Math.sin(2*(1*e-t)*Math.PI/a)+1},easeInOutElastic:function(e){var t=1.70158,a=0,n=1;if(0==e)return 0;if(2==(e/=.5))return 1;if(a||(a=.3*1.5),n<Math.abs(1)){n=1;var t=a/4}else var t=a/(2*Math.PI)*Math.asin(1/n);return 1>e?-.5*n*Math.pow(2,10*(e-=1))*Math.sin(2*(1*e-t)*Math.PI/a):n*Math.pow(2,-10*(e-=1))*Math.sin(2*(1*e-t)*Math.PI/a)*.5+1},easeInBack:function(e){var t=1.70158;return 1*(e/=1)*e*((t+1)*e-t)},easeOutBack:function(e){var t=1.70158;return 1*((e=e/1-1)*e*((t+1)*e+t)+1)},easeInOutBack:function(e){var t=1.70158;return(e/=.5)<1?.5*e*e*(((t*=1.525)+1)*e-t):.5*((e-=2)*e*(((t*=1.525)+1)*e+t)+2)},easeInBounce:function(e){return 1-S.easeOutBounce(1-e)},easeOutBounce:function(e){return(e/=1)<1/2.75?7.5625*e*e:2/2.75>e?1*(7.5625*(e-=1.5/2.75)*e+.75):2.5/2.75>e?1*(7.5625*(e-=2.25/2.75)*e+.9375):1*(7.5625*(e-=2.625/2.75)*e+.984375)},easeInOutBounce:function(e){return.5>e?.5*S.easeInBounce(2*e):.5*S.easeOutBounce(2*e-1)+.5}},p=e.canvas.width,m=e.canvas.height;window.devicePixelRatio&&(e.canvas.style.width=p+"px",e.canvas.style.height=m+"px",e.canvas.height=m*window.devicePixelRatio,e.canvas.width=p*window.devicePixelRatio,e.scale(window.devicePixelRatio,window.devicePixelRatio)),this.PolarArea=function(t,a){f.PolarArea.defaults={scaleOverlay:!0,scaleOverride:!1,scaleSteps:null,scaleStepWidth:null,scaleStartValue:null,scaleShowLine:!0,scaleLineColor:"rgba(0,0,0,.1)",scaleLineWidth:1,scaleShowLabels:!0,scaleLabel:"<%=value%>",scaleFontFamily:"'Arial'",scaleFontSize:12,scaleFontStyle:"normal",scaleFontColor:"#666",scaleShowLabelBackdrop:!0,scaleBackdropColor:"rgba(255,255,255,0.75)",scaleBackdropPaddingY:2,scaleBackdropPaddingX:2,segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,animation:!0,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,onAnimationComplete:null};var n=a?d(f.PolarArea.defaults,a):f.PolarArea.defaults;return new v(t,n,e)},this.Radar=function(t,a){f.Radar.defaults={scaleOverlay:!1,scaleOverride:!1,scaleSteps:null,scaleStepWidth:null,scaleStartValue:null,scaleShowLine:!0,scaleLineColor:"rgba(0,0,0,.1)",scaleLineWidth:1,scaleShowLabels:!1,scaleLabel:"<%=value%>",scaleFontFamily:"'Arial'",scaleFontSize:12,scaleFontStyle:"normal",scaleFontColor:"#666",scaleShowLabelBackdrop:!0,scaleBackdropColor:"rgba(255,255,255,0.75)",scaleBackdropPaddingY:2,scaleBackdropPaddingX:2,angleShowLineOut:!0,angleLineColor:"rgba(0,0,0,.1)",angleLineWidth:1,pointLabelFontFamily:"'Arial'",pointLabelFontStyle:"normal",pointLabelFontSize:12,pointLabelFontColor:"#666",pointDot:!0,pointDotRadius:3,pointDotStrokeWidth:1,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,animation:!0,animationSteps:60,animationEasing:"easeOutQuart",onAnimationComplete:null};var n=a?d(f.Radar.defaults,a):f.Radar.defaults;return new b(t,n,e)},this.Pie=function(t,a){f.Pie.defaults={segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,animation:!0,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,onAnimationComplete:null};var n=a?d(f.Pie.defaults,a):f.Pie.defaults;return new M(t,n,e)},this.Doughnut=function(t,a){f.Doughnut.defaults={segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,percentageInnerCutout:50,animation:!0,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,onAnimationComplete:null};var n=a?d(f.Doughnut.defaults,a):f.Doughnut.defaults;return new k(t,n,e)},this.Line=function(t,a){f.Line.defaults={scaleOverlay:!1,scaleOverride:!1,scaleSteps:null,scaleStepWidth:null,scaleStartValue:null,scaleLineColor:"rgba(0,0,0,.1)",scaleLineWidth:1,scaleShowLabels:!0,scaleLabel:"<%=value%>",scaleFontFamily:"'Arial'",scaleFontSize:12,scaleFontStyle:"normal",scaleFontColor:"#666",scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,bezierCurve:!0,pointDot:!0,pointDotRadius:4,pointDotStrokeWidth:2,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,animation:!0,animationSteps:60,animationEasing:"easeOutQuart",onAnimationComplete:null};var n=a?d(f.Line.defaults,a):f.Line.defaults;return new L(t,n,e)},this.Bar=function(t,a){f.Bar.defaults={scaleOverlay:!1,scaleOverride:!1,scaleSteps:null,scaleStepWidth:null,scaleStartValue:null,scaleLineColor:"rgba(0,0,0,.1)",scaleLineWidth:1,scaleShowLabels:!0,scaleLabel:"<%=value%>",scaleFontFamily:"'Arial'",scaleFontSize:12,scaleFontStyle:"normal",scaleFontColor:"#666",scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,barShowStroke:!0,barStrokeWidth:2,barValueSpacing:5,barDatasetSpacing:1,animation:!0,animationSteps:60,animationEasing:"easeOutQuart",onAnimationComplete:null};var n=a?d(f.Bar.defaults,a):f.Bar.defaults;return new F(t,n,e)};var g=function(e){e.clearRect(0,0,p,m)},v=function(e,r,c){function u(){S=i([p,m])/2,S-=o([.5*r.scaleFontSize,.5*r.scaleLineWidth]),b=2*r.scaleFontSize,r.scaleShowLabelBackdrop&&(b+=2*r.scaleBackdropPaddingY,S-=1.5*r.scaleBackdropPaddingY),M=S,b=s(b,5)}function d(){for(var e=0;e<v.steps;e++)if(r.scaleShowLine&&(c.beginPath(),c.arc(p/2,m/2,g*(e+1),0,2*Math.PI,!0),c.strokeStyle=r.scaleLineColor,c.lineWidth=r.scaleLineWidth,c.stroke()),r.scaleShowLabels){c.textAlign="center",c.font=r.scaleFontStyle+" "+r.scaleFontSize+"px "+r.scaleFontFamily;var t=v.labels[e];if(r.scaleShowLabelBackdrop){var a=c.measureText(t).width;c.fillStyle=r.scaleBackdropColor,c.beginPath(),c.rect(Math.round(p/2-a/2-r.scaleBackdropPaddingX),Math.round(m/2-g*(e+1)-.5*r.scaleFontSize-r.scaleBackdropPaddingY),Math.round(a+2*r.scaleBackdropPaddingX),Math.round(r.scaleFontSize+2*r.scaleBackdropPaddingY)),c.fill()}c.textBaseline="middle",c.fillStyle=r.scaleFontColor,c.fillText(t,p/2,m/2-g*(e+1))}}function h(a){var n=-Math.PI/2,l=2*Math.PI/e.length,o=1,i=1;r.animation&&(r.animateScale&&(o=a),r.animateRotate&&(i=a));for(var s=0;s<e.length;s++)c.beginPath(),c.arc(p/2,m/2,o*t(e[s].value,v,g),n,n+i*l,!1),c.lineTo(p/2,m/2),c.closePath(),c.fillStyle=e[s].color,c.fill(),r.segmentShowStroke&&(c.strokeStyle=r.segmentStrokeColor,c.lineWidth=r.segmentStrokeWidth,c.stroke()),n+=i*l}function f(){for(var t=Number.MIN_VALUE,a=Number.MAX_VALUE,n=0;n<e.length;n++)e[n].value>t&&(t=e[n].value),e[n].value<a&&(a=e[n].value);var l=Math.floor(M/(.66*b)),o=Math.floor(M/b*.5);return{maxValue:t,minValue:a,maxSteps:l,minSteps:o}}var S,g,v,b,M,k,L;u(),k=f(),L=r.scaleShowLabels?r.scaleLabel:null,r.scaleOverride?(v={steps:r.scaleSteps,stepValue:r.scaleStepWidth,graphMin:r.scaleStartValue,labels:[]},l(L,v.labels,v.steps,r.scaleStartValue,r.scaleStepWidth)):v=n(M,k.maxSteps,k.minSteps,k.maxValue,k.minValue,L),g=S/v.steps,a(r,d,h,c)},b=function(e,r,u){function d(a){var n=2*Math.PI/e.datasets[0].data.length;u.save(),u.translate(p/2,m/2);for(var l=0;l<e.datasets.length;l++){u.beginPath(),u.moveTo(0,-1*a*t(e.datasets[l].data[0],b,v));for(var o=1;o<e.datasets[l].data.length;o++)u.rotate(n),u.lineTo(0,-1*a*t(e.datasets[l].data[o],b,v));if(u.closePath(),u.fillStyle=e.datasets[l].fillColor,u.strokeStyle=e.datasets[l].strokeColor,u.lineWidth=r.datasetStrokeWidth,u.fill(),u.stroke(),r.pointDot){u.fillStyle=e.datasets[l].pointColor,u.strokeStyle=e.datasets[l].pointStrokeColor,u.lineWidth=r.pointDotStrokeWidth;for(var i=0;i<e.datasets[l].data.length;i++)u.rotate(n),u.beginPath(),u.arc(0,-1*a*t(e.datasets[l].data[i],b,v),r.pointDotRadius,2*Math.PI,!1),u.fill(),u.stroke()}u.rotate(n)}u.restore()}function h(){var t=2*Math.PI/e.datasets[0].data.length;if(u.save(),u.translate(p/2,m/2),r.angleShowLineOut){u.strokeStyle=r.angleLineColor,u.lineWidth=r.angleLineWidth;for(var a=0;a<e.datasets[0].data.length;a++)u.rotate(t),u.beginPath(),u.moveTo(0,0),u.lineTo(0,-g),u.stroke()}for(var n=0;n<b.steps;n++){if(u.beginPath(),r.scaleShowLine){u.strokeStyle=r.scaleLineColor,u.lineWidth=r.scaleLineWidth,u.moveTo(0,-v*(n+1));for(var l=0;l<e.datasets[0].data.length;l++)u.rotate(t),u.lineTo(0,-v*(n+1));u.closePath(),u.stroke()}if(r.scaleShowLabels){if(u.textAlign="center",u.font=r.scaleFontStyle+" "+r.scaleFontSize+"px "+r.scaleFontFamily,u.textBaseline="middle",r.scaleShowLabelBackdrop){var o=u.measureText(b.labels[n]).width;u.fillStyle=r.scaleBackdropColor,u.beginPath(),u.rect(Math.round(-o/2-r.scaleBackdropPaddingX),Math.round(-v*(n+1)-.5*r.scaleFontSize-r.scaleBackdropPaddingY),Math.round(o+2*r.scaleBackdropPaddingX),Math.round(r.scaleFontSize+2*r.scaleBackdropPaddingY)),u.fill()}u.fillStyle=r.scaleFontColor,u.fillText(b.labels[n],0,-v*(n+1))}}for(var i=0;i<e.labels.length;i++){u.font=r.pointLabelFontStyle+" "+r.pointLabelFontSize+"px "+r.pointLabelFontFamily,u.fillStyle=r.pointLabelFontColor;var s=Math.sin(t*i)*(g+r.pointLabelFontSize),c=Math.cos(t*i)*(g+r.pointLabelFontSize);u.textAlign=t*i==Math.PI||t*i==0?"center":t*i>Math.PI?"right":"left",u.textBaseline="middle",u.fillText(e.labels[i],s,-c)}u.restore()}function f(){g=i([p,m])/2,M=2*r.scaleFontSize;for(var t=0,a=0;a<e.labels.length;a++){u.font=r.pointLabelFontStyle+" "+r.pointLabelFontSize+"px "+r.pointLabelFontFamily;var n=u.measureText(e.labels[a]).width;n>t&&(t=n)}g-=o([t,r.pointLabelFontSize/2*1.5]),g-=r.pointLabelFontSize,g=c(g,null,0),k=g,M=s(M,5)}function S(){for(var t=Number.MIN_VALUE,a=Number.MAX_VALUE,n=0;n<e.datasets.length;n++)for(var l=0;l<e.datasets[n].data.length;l++)e.datasets[n].data[l]>t&&(t=e.datasets[n].data[l]),e.datasets[n].data[l]<a&&(a=e.datasets[n].data[l]);var o=Math.floor(k/(.66*M)),i=Math.floor(k/M*.5);return{maxValue:t,minValue:a,maxSteps:o,minSteps:i}}var g,v,b,M,k,L,F;e.labels||(e.labels=[]),f();var L=S();F=r.scaleShowLabels?r.scaleLabel:null,r.scaleOverride?(b={steps:r.scaleSteps,stepValue:r.scaleStepWidth,graphMin:r.scaleStartValue,labels:[]},l(F,b.labels,b.steps,r.scaleStartValue,r.scaleStepWidth)):b=n(k,L.maxSteps,L.minSteps,L.maxValue,L.minValue,F),v=g/b.steps,a(r,h,d,u)},M=function(e,t,n){function l(a){var l=-Math.PI/2,i=1,r=1;t.animation&&(t.animateScale&&(i=a),t.animateRotate&&(r=a));for(var c=0;c<e.length;c++){var u=r*(e[c].value/o)*2*Math.PI;n.beginPath(),n.arc(p/2,m/2,i*s,l,l+u),n.lineTo(p/2,m/2),n.closePath(),n.fillStyle=e[c].color,n.fill(),t.segmentShowStroke&&(n.lineWidth=t.segmentStrokeWidth,n.strokeStyle=t.segmentStrokeColor,n.stroke()),l+=u}}for(var o=0,s=i([m/2,p/2])-5,r=0;r<e.length;r++)o+=e[r].value;a(t,null,l,n)},k=function(e,t,n){function l(a){var l=-Math.PI/2,i=1,c=1;t.animation&&(t.animateScale&&(i=a),t.animateRotate&&(c=a));for(var u=0;u<e.length;u++){var d=c*(e[u].value/o)*2*Math.PI;n.beginPath(),n.arc(p/2,m/2,i*s,l,l+d,!1),n.arc(p/2,m/2,i*r,l+d,l,!0),n.closePath(),n.fillStyle=e[u].color,n.fill(),t.segmentShowStroke&&(n.lineWidth=t.segmentStrokeWidth,n.strokeStyle=t.segmentStrokeColor,n.stroke()),l+=d}}for(var o=0,s=i([m/2,p/2])-5,r=s*(t.percentageInnerCutout/100),c=0;c<e.length;c++)o+=e[c].value;a(t,null,l,n)},L=function(e,o,i){function s(a){function n(n,l){return P-a*t(e.datasets[n].data[l],S,f)}function l(e){return w+k*e}for(var s=0;s<e.datasets.length;s++){i.strokeStyle=e.datasets[s].strokeColor,i.lineWidth=o.datasetStrokeWidth,i.beginPath(),i.moveTo(w,P-a*t(e.datasets[s].data[0],S,f));for(var r=1;r<e.datasets[s].data.length;r++)o.bezierCurve?i.bezierCurveTo(l(r-.5),n(s,r-1),l(r-.5),n(s,r),l(r),n(s,r)):i.lineTo(l(r),n(s,r));if(i.stroke(),o.datasetFill?(i.lineTo(w+k*(e.datasets[s].data.length-1),P),i.lineTo(w,P),i.closePath(),i.fillStyle=e.datasets[s].fillColor,i.fill()):i.closePath(),o.pointDot){i.fillStyle=e.datasets[s].pointColor,i.strokeStyle=e.datasets[s].pointStrokeColor,i.lineWidth=o.pointDotStrokeWidth;for(var c=0;c<e.datasets[s].data.length;c++)i.beginPath(),i.arc(w+k*c,P-a*t(e.datasets[s].data[c],S,f),o.pointDotRadius,0,2*Math.PI,!0),i.fill(),i.stroke()}}}function r(){i.lineWidth=o.scaleLineWidth,i.strokeStyle=o.scaleLineColor,i.beginPath(),i.moveTo(p-L/2+5,P),i.lineTo(p-L/2-F-5,P),i.stroke(),y>0?(i.save(),i.textAlign="right"):i.textAlign="center",i.fillStyle=o.scaleFontColor;for(var t=0;t<e.labels.length;t++)i.save(),y>0?(i.translate(w+t*k,P+o.scaleFontSize),i.rotate(-(y*(Math.PI/180))),i.fillText(e.labels[t],0,0),i.restore()):i.fillText(e.labels[t],w+t*k,P+o.scaleFontSize+3),i.beginPath(),i.moveTo(w+t*k,P+3),o.scaleShowGridLines&&t>0?(i.lineWidth=o.scaleGridLineWidth,i.strokeStyle=o.scaleGridLineColor,i.lineTo(w+t*k,5)):i.lineTo(w+t*k,P+3),i.stroke();i.lineWidth=o.scaleLineWidth,i.strokeStyle=o.scaleLineColor,i.beginPath(),i.moveTo(w,P+5),i.lineTo(w,5),i.stroke(),i.textAlign="right",i.textBaseline="middle";for(var a=0;a<S.steps;a++)i.beginPath(),i.moveTo(w-3,P-(a+1)*f),o.scaleShowGridLines?(i.lineWidth=o.scaleGridLineWidth,i.strokeStyle=o.scaleGridLineColor,i.lineTo(w+F+5,P-(a+1)*f)):i.lineTo(w-.5,P-(a+1)*f),i.stroke(),o.scaleShowLabels&&i.fillText(S.labels[a],w-8,P-(a+1)*f)}function c(){var t=1;if(o.scaleShowLabels){i.font=o.scaleFontStyle+" "+o.scaleFontSize+"px "+o.scaleFontFamily;for(var a=0;a<S.labels.length;a++){var n=i.measureText(S.labels[a]).width;t=n>t?n:t}t+=10}F=p-t-L,k=Math.floor(F/(e.labels.length-1)),w=p-L/2-F,P=v+o.scaleFontSize/2}function u(){h=m,i.font=o.scaleFontStyle+" "+o.scaleFontSize+"px "+o.scaleFontFamily,L=1;for(var t=0;t<e.labels.length;t++){var a=i.measureText(e.labels[t]).width;L=a>L?a:L}p/e.labels.length<L?(y=45,p/e.labels.length<Math.cos(y)*L?(y=90,h-=L):h-=Math.sin(y)*L):h-=o.scaleFontSize,h-=5,g=o.scaleFontSize,h-=g,v=h}function d(){for(var t=Number.MIN_VALUE,a=Number.MAX_VALUE,n=0;n<e.datasets.length;n++)for(var l=0;l<e.datasets[n].data.length;l++)e.datasets[n].data[l]>t&&(t=e.datasets[n].data[l]),e.datasets[n].data[l]<a&&(a=e.datasets[n].data[l]);var o=Math.floor(v/(.66*g)),i=Math.floor(v/g*.5);return{maxValue:t,minValue:a,maxSteps:o,minSteps:i}}var h,f,S,g,v,b,M,k,L,F,w,P,y=0;u(),b=d(),M=o.scaleShowLabels?o.scaleLabel:"",o.scaleOverride?(S={steps:o.scaleSteps,stepValue:o.scaleStepWidth,graphMin:o.scaleStartValue,labels:[]},l(M,S.labels,S.steps,o.scaleStartValue,o.scaleStepWidth)):S=n(v,b.maxSteps,b.minSteps,b.maxValue,b.minValue,M),f=Math.floor(v/S.steps),c(),a(o,r,s,i)},F=function(e,o,i){function s(a){i.lineWidth=o.barStrokeWidth;for(var n=0;n<e.datasets.length;n++){i.fillStyle=e.datasets[n].fillColor,i.strokeStyle=e.datasets[n].strokeColor;for(var l=0;l<e.datasets[n].data.length;l++){var s=w+o.barValueSpacing+k*l+y*n+o.barDatasetSpacing*n+o.barStrokeWidth*n;i.beginPath(),i.moveTo(s,P),i.lineTo(s,P-a*t(e.datasets[n].data[l],S,f)+o.barStrokeWidth/2),i.lineTo(s+y,P-a*t(e.datasets[n].data[l],S,f)+o.barStrokeWidth/2),i.lineTo(s+y,P),o.barShowStroke&&i.stroke(),i.closePath(),i.fill()}}}function r(){i.lineWidth=o.scaleLineWidth,i.strokeStyle=o.scaleLineColor,i.beginPath(),i.moveTo(p-L/2+5,P),i.lineTo(p-L/2-F-5,P),i.stroke(),W>0?(i.save(),i.textAlign="right"):i.textAlign="center",i.fillStyle=o.scaleFontColor;for(var t=0;t<e.labels.length;t++)i.save(),W>0?(i.translate(w+t*k,P+o.scaleFontSize),i.rotate(-(W*(Math.PI/180))),i.fillText(e.labels[t],0,0),i.restore()):i.fillText(e.labels[t],w+t*k+k/2,P+o.scaleFontSize+3),i.beginPath(),i.moveTo(w+(t+1)*k,P+3),i.lineWidth=o.scaleGridLineWidth,i.strokeStyle=o.scaleGridLineColor,i.lineTo(w+(t+1)*k,5),i.stroke();i.lineWidth=o.scaleLineWidth,i.strokeStyle=o.scaleLineColor,i.beginPath(),i.moveTo(w,P+5),i.lineTo(w,5),i.stroke(),i.textAlign="right",i.textBaseline="middle";for(var a=0;a<S.steps;a++)i.beginPath(),i.moveTo(w-3,P-(a+1)*f),o.scaleShowGridLines?(i.lineWidth=o.scaleGridLineWidth,i.strokeStyle=o.scaleGridLineColor,i.lineTo(w+F+5,P-(a+1)*f)):i.lineTo(w-.5,P-(a+1)*f),i.stroke(),o.scaleShowLabels&&i.fillText(S.labels[a],w-8,P-(a+1)*f)}function c(){var t=1;if(o.scaleShowLabels){i.font=o.scaleFontStyle+" "+o.scaleFontSize+"px "+o.scaleFontFamily;for(var a=0;a<S.labels.length;a++){var n=i.measureText(S.labels[a]).width;t=n>t?n:t}t+=10}F=p-t-L,k=Math.floor(F/e.labels.length),y=(k-2*o.scaleGridLineWidth-2*o.barValueSpacing-(o.barDatasetSpacing*e.datasets.length-1)-(o.barStrokeWidth/2*e.datasets.length-1))/e.datasets.length,w=p-L/2-F,P=v+o.scaleFontSize/2}function u(){h=m,i.font=o.scaleFontStyle+" "+o.scaleFontSize+"px "+o.scaleFontFamily,L=1;for(var t=0;t<e.labels.length;t++){var a=i.measureText(e.labels[t]).width;L=a>L?a:L}p/e.labels.length<L?(W=45,p/e.labels.length<Math.cos(W)*L?(W=90,h-=L):h-=Math.sin(W)*L):h-=o.scaleFontSize,h-=5,g=o.scaleFontSize,h-=g,v=h}function d(){for(var t=Number.MIN_VALUE,a=Number.MAX_VALUE,n=0;n<e.datasets.length;n++)for(var l=0;l<e.datasets[n].data.length;l++)e.datasets[n].data[l]>t&&(t=e.datasets[n].data[l]),e.datasets[n].data[l]<a&&(a=e.datasets[n].data[l]);var o=Math.floor(v/(.66*g)),i=Math.floor(v/g*.5);return{maxValue:t,minValue:a,maxSteps:o,minSteps:i}}var h,f,S,g,v,b,M,k,L,F,w,P,y,W=0;u(),b=d(),M=o.scaleShowLabels?o.scaleLabel:"",o.scaleOverride?(S={steps:o.scaleSteps,stepValue:o.scaleStepWidth,graphMin:o.scaleStartValue,labels:[]},l(M,S.labels,S.steps,o.scaleStartValue,o.scaleStepWidth)):S=n(v,b.maxSteps,b.minSteps,b.maxValue,b.minValue,M),f=Math.floor(v/S.steps),c(),a(o,r,s,i)},w=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}(),P={}};
//# sourceMappingURL=Chart.js.map