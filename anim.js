var w = 500;
var h = 500;
var alpha = 0.1;
var initTime = new Date().getTime();
var diamonds = [];
var period = 350;

$(document).ready(function(){


  c = document.getElementById("canvas");
  ctx = c.getContext("2d");
  ctx.canvas.width =w;
  ctx.canvas.height = h;
  $logo= $("#embedly-logo");
  $logo.css('top',h/2-$logo.height()/2);
  $logo.css('left',w/2 - $logo.width()/2);
  setInterval(function(){loop();},50);
  addDiamond();
  setInterval(function(){addDiamond();},period*Math.PI)
});


var loop= function(){
  t = new Date().getTime() - initTime;
  $logo.css('opacity',0.2+(1+Math.sin(t/period))/2);

  ctx.rect(0,0,w,h);
  ctx.strokeStyle = "#FFF";
  ctx.fillStyle = "#FFF";
  ctx.fill();

  if(diamonds.length >0){
    var rem = [];
    diamonds.forEach(function(d,i){
      d.update();
      d.render();
      if(d.size > 2*w){
        rem.push(i);
      }
    });

    if(rem.length>0){
      rem.forEach(function(a){
        diamonds.splice(a,1);
      });
    }
  }
}

var addDiamond = function(){
  var d = new Diamond();
  diamonds.push(d);
}

var Diamond = function(){
  this.size = 100;
  this.val= 0;
}

Diamond.prototype.update = function(){
  this.size+=2;
  this.val+=0.65;
}

Diamond.prototype.render= function(){
  ctx.save();
  ctx.translate(w/2,h/2);
  ctx.rotate(45*Math.PI/180);
  ctx.lineWidth = 15;
  var lightness = Math.max(100- this.val,50);
  var s = 0.5;
  if(this.size>s*Math.min(w,h)){
    lightness += (this.size-s*Math.min(w,h));
  }
  ctx.strokeStyle = "hsl("+[186,"100%",lightness+"%"].join(',')+')';
  ctx.strokeRect(-this.size/2,-this.size/2,this.size,this.size);
  ctx.restore();
}
