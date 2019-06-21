var app={
     jzc(a) {
        var div=document.createElement("div");
        div.innerHTML=`<div class="jzc" id="cnm" style="z-index: 999999999999"><div class="fgc"><div class="mu-circular-progress  demo-circular-progress qjjz" style="width: 40px; height: 40px;"><div class="mu-circle-wrapper active" style="width: 40px; height: 40px;"><div class="mu-circle-spinner active "><div class="mu-circle-clipper left"><div class="mu-circle" style="border-width: 3px;"></div></div><div class="mu-circle-gap-patch"><div class="mu-circle"></div></div><div class="mu-circle-clipper right"><div class="mu-circle" style="border-width: 3px;"></div></div></div></div></div></div></div>`
        document.body.insertBefore(div, document.body.firstElementChild);
        setTimeout(function(){
          var jzc=document.getElementById("cnm");
          jzc.parentNode.removeChild(jzc);
        },a);
    }, 
    toast(a,b){
      var div=document.createElement("div");
      div.innerHTML=`<div class="toast" id="toast">`+a+`</div>`
      document.body.insertBefore(div,document.body.firstElementChild);
      setTimeout(function(){
          var toast=document.getElementById("toast");
          toast.parentNode.removeChild(toast);
      },b);
    },
    get(a){
        return localStorage.getItem(a);
    },
    set(a,b){
        localStorage.setItem(a,b);
    }

}
export default app;