/* 2.744 Script for populating slideshow matrix and displaying currently selected image */

/*
  Please export with longest edge = 582px (both landscape and portrait), for display/
  Please export with longest edge = 93px (both landscape and portrait), for thumbnail/
*/

/*
  See the github (https://github.com/mit2009/2744-general) for useful info on using this
*/




/* Please include & customize the following at the top of your HTML file */

/*
<style type="text/css" id="page-css">
  .scroll-pane
  {
  width: 600px;
  overflow: auto;
  }
</style>

<script type="text/javascript">
  var numP = 26;
  var numL = 52;
  var numRows = 4;
  var numCols = 20;
  var colPattern = "PPPPPPPLLLLLLLLLLLLL";

  var pList = ["tiankaic", "sdiaz13", "fyip", "rzim", "deghuee", "pengming", "oropp", "mjarnold", "mmelody", "rimadas", "khn", "keval", "kelchen", "daveynis", "kacheng", "jjgraves", "jbhare", "illoyd", "hanhe", "gsnyder7", "pearlws", "emittman", "codyjaco", "chan633", "caralyn", "aflooks"];

  var lList = ["luyifan", "yan25y", "yakovb", "weixunhe", "vphadnis", "vsoares", "kuklov", "uvini", "libsackt", "timzlu", "tmangan4", "syamani", "rgulland", "rushil", "pushpa", "nikimr97", "fonteyne", "mkthai", "mmcclene", "meganlfu", "lucialiu", "kschell", "kaymies", "juschiu", "jwanyiri", "juliawon", "jeancs", "jsaadi", "hdaywill", "hkobor", "haluk", "ghan", "gltso", "fionag", "emilyhsu", "ehanhaus", "orozcoe", "anniedai", "davidhdp", "dstavins", "cear", "csheline", "douglasc", "carnet", "grayb", "ashjhart", "anyasmin", "dmwalker", "aliciava", "akshayh", "adgupta", "athom"];

  var displayExt = ".jpg";
  var thumbnailExt = ".jpg";
</script>

<script type="text/javascript" src="../../../includes/js/class_data.js"></script>
<script type="text/JavaScript" src="../../../includes/js/matrix_slideshow.js"></script>
*/

var portrait = "P_";
var landscape = "L_";

var pImageCache = new Array(pList.length);
var lImageCache = new Array(lList.length);
var path="display/";

// preload images for faster loading later
for (i=0; i<pList.length; i++) {
  if (pList[i] != "placeholder") {
    pImageCache[i] = new Image;
    pImageCache[i].src = path+getPortraitImageName(pList[i],0);
  }
}

for (i=0; i<lList.length; i++) {
  if (lList[i] != "placeholder") {
    lImageCache[i] = new Image;
    lImageCache[i].src = path+getLandscapeImageName(lList[i],0);
  }
}

function getPortraitImageName(username) {
  return portrait+username+displayExt;
}

function getLandscapeImageName(username) {
  return landscape+username+displayExt;
}

function showDetailImage(imageIndex, is_portrait)
{
  var imagename;
  var username;
  var detailImage;
  if (is_portrait) {
    imagename = pList[imageIndex];
    if (typeof pUsernames != "undefined") {
      username = pUsernames[imageIndex];
    } else {
      username = imagename;
    }
    detailImage = pImageCache[imageIndex];
    if (detailImage == null) { // no preloaded image for some reason
      detailImage = new Image;
      detailImage.src = path + getPortraitImageName(imagename);
      pImageCache[imageIndex] = detailImage;
    }
  } else {
    imagename = lList[imageIndex];
    if (typeof lUsernames != "undefined") {
      username = lUsernames[imageIndex];
    } else {
      username = imagename;
    }
    detailImage = lImageCache[imageIndex];
    if (detailImage == null) { // no preloaded image for some reason
      detailImage = new Image;
      detailImage.src = path + getLandscapeImageName(imagename);
      lImageCache[imageIndex] = detailImage;
    }
  }
  document.getElementById("currentDetailImage").src = detailImage.src;
  if (username in usernames_to_names) {
    document.getElementById("slideshowDetailStudent").innerHTML = usernames_to_names[username];
  } else {
    document.getElementById("slideshowDetailStudent").innerHTML = username;
  }
}

function getPortraitCell(index) {
  if (pList[index] == "placeholder") {
    return getPlaceholderCell()
  }
  if (index<numP) {
    return '          <td width="56" height="74"><a href="#" onMouseOver="showDetailImage('+index+',1); return false;"><img src="thumbnail/'+portrait+pList[index]+thumbnailExt+'" border="0" width="56" height="72" align="middle" valign="top"></a></td>';
  } else {
    return '          <td width="56" height="74"></td>';
  }
}

function getLandscapeCell(index) {
  if (lList[index] == "placeholder") {
    return getPlaceholderCell()
  }
  if (index<numL) {
    return '          <td width="72" height="74"><a href="#" onMouseOver="showDetailImage('+index+',0); return false;"><img src="thumbnail/'+landscape+lList[index]+thumbnailExt+'" border="0" width="72" height="56" align="middle" valign="top"></a></td>';
  } else {
    return '          <td width="72" height="74"></td>';
  }
}

function getPlaceholderCell() {
  return '          <td width="72" height="74"></td>';
}

function loadSlideShowMatrix()
{
  var currentPIndex = 0;
  var currentLIndex = 0;
  var colType;
  var html = '<p style="width:1248px;">\n      <table width="1248px" border="0" cellspacing="0" cellpadding="0">\n\n';
  for (var r=0; r<numRows; r++) {
    html += '        <tr align="center" valign="top">\n';
    for (var c=0; c<numCols; c++) {
      colType = colPattern.charAt(c);
      if (colType=='P') {
        html += getPortraitCell(currentPIndex);
        currentPIndex++;
      } else { // landscape
        html += getLandscapeCell(currentLIndex);
        currentLIndex++;
      }
    }
    html += '        </tr>\n\n';
  }
  html += '      </table></p>';
  document.getElementById('slideshowMatrix').innerHTML = html;

  $(function()
    {
      $('#slideshowMatrix').jScrollPane();
    });
}