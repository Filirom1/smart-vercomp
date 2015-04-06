# smart-vercomp [![Build Status](https://travis-ci.org/Filirom1/smart-vercomp.svg)](https://travis-ci.org/Filirom1/smart-vercomp)
A smarter version comparison library

This is a clone of the upstream_cmp function in <https://github.com/fedora-infra/anitya> in JavaScript.
A big thanks to @pypingou for the original code in python.


## Usage

    var vercomp = require('smartvercomp')
    vercomp('1.0.rc1', '1.0') # return 1
    vercomp('1.0.0', '1.0.1') # return -1
    vercomp('10b2', '10a1')   # return 1
    vercomp('1', '1')         # return 0

# LICENSE MIT
