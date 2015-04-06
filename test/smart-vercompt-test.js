var expect = require('chai').expect,
    smartvercomp = require('..');

describe('split_rc', function(){
  it('keep version intact if unable to split', function(){
    var res = smartvercomp.split_rc('123')
    expect(res).to.eql(['123', '', ''])
  })

  it('should split rc', function(){
    var res = smartvercomp.split_rc('1.0.0rc1')
    expect(res).to.eql(['1.0.0', 'rc', '1'])
  })
});

describe('comp', function(){
  function RPMVERCMP(a,b,expected){
    it("should return " + expected + " when comparing '" + a + "' and '" + b + "'", function(){
      var res = smartvercomp(a,b);
      expect(res).to.eq(expected);
    })
  }

  RPMVERCMP('v1.1.1', '1.1.0', 1)
  RPMVERCMP('v1.1.0', '1.1.1', -1)

  RPMVERCMP('6.0', '6.0', 0)

  RPMVERCMP('2', '1', 1)
  RPMVERCMP('b', 'a', 1)

  RPMVERCMP('1.0', '1', 1)

  RPMVERCMP('6.0.rc1', '6.0', -1)
  RPMVERCMP('6.0', '6.0.rc1', 1)
  RPMVERCMP('6.0.rc1', '6.0.rc1', 0)
  RPMVERCMP('6.0.rc', '6.0.rc', 0)

  RPMVERCMP('6.0.rc1', '6.0.rc2', -1)
  RPMVERCMP('6.0.rc2', '6.0.rc1', 1)

  RPMVERCMP('6.0.pre', '6.0.rc1', -1)
  RPMVERCMP('6.0.rc1', '6.0.pre', 1)

  RPMVERCMP('6.0.alpha', '6.0.pre', -1)
  RPMVERCMP('6.0.pre', '6.0.alpha', 1)
});
