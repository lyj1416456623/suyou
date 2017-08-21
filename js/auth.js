var appId = 'wx10348c545b99fa2a';
var path = 'http://api.suyousc.com/index.php';
/*获取微信授权返回的code */
function GetQueryString(name){
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null)return  unescape(r[2]); return null;
}
