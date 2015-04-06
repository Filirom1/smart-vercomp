var vercomp = require('vercomp');
var rcRegExp = /(.*?)\.?(-?(rc|pre|beta|alpha|dev)([0-9]*))/

function comp(a, b){
  // Strip leading 'v' characters; turn v1.0 into 1.0.
  a = a.replace(/^v/, '')
  b = b.replace(/^v/, '')

  var arrA = split_rc(a);
  va = arrA[0];
  rca = arrA[1];
  rcna = arrA[2];

  var arrB = split_rc(b);
  vb = arrB[0];
  rcb = arrB[1];
  rcnb = arrB[2];

  var diff = vercomp(va, vb);
  if(diff != 0){
    // base versions are different, ignore rc-status
    return diff;
  }

  if(rca && rcb){
    // both are rc, higher rc is newer
    diff = vercomp(rca.toLowerCase(), rcb.toLowerCase());
    if(diff != 0){
      // rc > pre > beta > alpha
      return diff;
    }

    if(rcna && rcnb){
      // both have rc number
      return vercomp(rcna, rcnb);
    }

    if(rcna){
      // only first has rc number, then it is newer
      return 1;
    }

    if(rcnb){
      // only second has rc number, then it is older
      return -1;
    }

    // both rc numbers are missing or same
    return 0
  }

  if(rca){
    // only first has rc number, then it is newer
    return -1
  }
  if(rcb){
    // only second is rc, then first is newer
    return 1
  }

  // neither is a rc
  return 0
}

function split_rc(str){
  var re = rcRegExp.exec(str)
  if (re == null){
    return [str, '', '']
  }else{
    return [re[1], re[3], re[4]]
  }
}

module.exports = comp;
module.exports.split_rc = split_rc;
