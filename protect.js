/* View-only protection for policy documents */
(function(){
  var st=document.createElement('style');
  st.textContent='body{-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-touch-callout:none}img{-webkit-user-drag:none}@media print{html,body{display:none!important}}';
  document.head.appendChild(st);
  function stop(e){e.preventDefault();return false;}
  ['contextmenu','copy','cut','dragstart','selectstart'].forEach(function(t){document.addEventListener(t,stop);});
  document.addEventListener('keydown',function(e){
    var k=(e.key||'').toLowerCase();
    if((e.ctrlKey||e.metaKey)&&['p','s','c','x','a','u'].indexOf(k)>-1){e.preventDefault();}
    if(e.key==='PrintScreen'&&navigator.clipboard){try{navigator.clipboard.writeText('');}catch(x){}}
  });
  window.print=function(){};
})();
