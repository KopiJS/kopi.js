process.env.NODE_ENV = 'test';

global.context = global.describe;
global.xcontext = global.xdescribe;
global.specify = global.it;
global.xspecify = global.xit;
global.its = global.it;
global.xits = global.xit;

global.chai = require('chai');
global.should = global.chai.should();
global.expect = global.chai.expect;
global.assert = global.chai.assert;
