(function () {
'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
});

var hasOwnProperty = {}.hasOwnProperty;
var _has = function(it, key){
  return hasOwnProperty.call(it, key);
};

var _fails = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
});

var _isObject = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var isObject = _isObject;
var _anObject = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

var isObject$1 = _isObject;
var document$1 = _global.document;
var is = isObject$1(document$1) && isObject$1(document$1.createElement);
var _domCreate = function(it){
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function(){
  return Object.defineProperty(_domCreate('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject$2 = _isObject;
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function(it, S){
  if(!isObject$2(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject$2(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject$2(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject$2(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

var anObject$1       = _anObject;
var IE8_DOM_DEFINE = _ie8DomDefine;
var toPrimitive$1    = _toPrimitive;
var dP$2             = Object.defineProperty;

var f$1 = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject$1(O);
  P = toPrimitive$1(P, true);
  anObject$1(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP$2(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f$1
};

var _propertyDesc = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

var dP$1         = _objectDp;
var createDesc$1 = _propertyDesc;
var _hide = _descriptors ? function(object, key, value){
  return dP$1.f(object, key, createDesc$1(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

var id = 0;
var px = Math.random();
var _uid = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _redefine = createCommonjsModule(function (module) {
var global    = _global
  , hide      = _hide
  , has       = _has
  , SRC       = _uid('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

_core.inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
});

var _aFunction = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding
var aFunction = _aFunction;
var _ctx = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

var global$2    = _global;
var core      = _core;
var hide      = _hide;
var redefine$1  = _redefine;
var ctx       = _ctx;
var PROTOTYPE$1 = 'prototype';

var $export$1 = function(type, name, source){
  var IS_FORCED = type & $export$1.F
    , IS_GLOBAL = type & $export$1.G
    , IS_STATIC = type & $export$1.S
    , IS_PROTO  = type & $export$1.P
    , IS_BIND   = type & $export$1.B
    , target    = IS_GLOBAL ? global$2 : IS_STATIC ? global$2[name] || (global$2[name] = {}) : (global$2[name] || {})[PROTOTYPE$1]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE$1] || (exports[PROTOTYPE$1] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global$2) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine$1(target, key, out, type & $export$1.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global$2.core = core;
// type bitmap
$export$1.F = 1;   // forced
$export$1.G = 2;   // global
$export$1.S = 4;   // static
$export$1.P = 8;   // proto
$export$1.B = 16;  // bind
$export$1.W = 32;  // wrap
$export$1.U = 64;  // safe
$export$1.R = 128; // real proto method for `library` 
var _export = $export$1;

var _meta = createCommonjsModule(function (module) {
var META     = _uid('meta')
  , isObject = _isObject
  , has      = _has
  , setDesc  = _objectDp.f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !_fails(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
});

var global$3 = _global;
var SHARED = '__core-js_shared__';
var store  = global$3[SHARED] || (global$3[SHARED] = {});
var _shared = function(key){
  return store[key] || (store[key] = {});
};

var _wks = createCommonjsModule(function (module) {
var store      = _shared('wks')
  , uid        = _uid
  , Symbol     = _global.Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
});

var def = _objectDp.f;
var has$1 = _has;
var TAG = _wks('toStringTag');

var _setToStringTag = function(it, tag, stat){
  if(it && !has$1(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

var f$2 = _wks;

var _wksExt = {
	f: f$2
};

var _library = false;

var global$4         = _global;
var core$1           = _core;
var LIBRARY        = _library;
var wksExt$1         = _wksExt;
var defineProperty = _objectDp.f;
var _wksDefine = function(name){
  var $Symbol = core$1.Symbol || (core$1.Symbol = LIBRARY ? {} : global$4.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt$1.f(name)});
};

var toString = {}.toString;

var _cof = function(it){
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = _cof;
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = _iobject;
var defined = _defined;
var _toIobject = function(it){
  return IObject(defined(it));
};

// 7.1.4 ToInteger
var ceil  = Math.ceil;
var floor = Math.floor;
var _toInteger = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength
var toInteger = _toInteger;
var min       = Math.min;
var _toLength = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var toInteger$1 = _toInteger;
var max       = Math.max;
var min$1       = Math.min;
var _toIndex = function(index, length){
  index = toInteger$1(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes
var toIObject$3 = _toIobject;
var toLength  = _toLength;
var toIndex   = _toIndex;
var _arrayIncludes = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject$3($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var shared$1 = _shared('keys');
var uid$1    = _uid;
var _sharedKey = function(key){
  return shared$1[key] || (shared$1[key] = uid$1(key));
};

var has$2          = _has;
var toIObject$2    = _toIobject;
var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO     = _sharedKey('IE_PROTO');

var _objectKeysInternal = function(object, names){
  var O      = toIObject$2(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has$2(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has$2(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys$1       = _objectKeysInternal;
var enumBugKeys = _enumBugKeys;

var _objectKeys = Object.keys || function keys(O){
  return $keys$1(O, enumBugKeys);
};

var getKeys   = _objectKeys;
var toIObject$1 = _toIobject;
var _keyof = function(object, el){
  var O      = toIObject$1(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

var f$3 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$3
};

var f$4 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$4
};

// all enumerable object keys, includes symbols
var getKeys$1 = _objectKeys;
var gOPS    = _objectGops;
var pIE     = _objectPie;
var _enumKeys = function(it){
  var result     = getKeys$1(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

// 7.2.2 IsArray(argument)
var cof$1 = _cof;
var _isArray = Array.isArray || function isArray(arg){
  return cof$1(arg) == 'Array';
};

var dP$3       = _objectDp;
var anObject$3 = _anObject;
var getKeys$2  = _objectKeys;

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties){
  anObject$3(O);
  var keys   = getKeys$2(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP$3.f(O, P = keys[i++], Properties[P]);
  return O;
};

var _html = _global.document && document.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject$2    = _anObject;
var dPs         = _objectDps;
var enumBugKeys$1 = _enumBugKeys;
var IE_PROTO$1    = _sharedKey('IE_PROTO');
var Empty       = function(){ /* empty */ };
var PROTOTYPE$2   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe')
    , i      = enumBugKeys$1.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE$2][enumBugKeys$1[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE$2] = anObject$2(O);
    result = new Empty;
    Empty[PROTOTYPE$2] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys$2      = _objectKeysInternal;
var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

var f$6 = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys$2(O, hiddenKeys);
};

var _objectGopn = {
	f: f$6
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject$4 = _toIobject;
var gOPN$1      = _objectGopn.f;
var toString$1  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN$1(it);
  } catch(e){
    return windowNames.slice();
  }
};

var f$5 = function getOwnPropertyNames(it){
  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN$1(toIObject$4(it));
};

var _objectGopnExt = {
	f: f$5
};

var pIE$1            = _objectPie;
var createDesc$2     = _propertyDesc;
var toIObject$5      = _toIobject;
var toPrimitive$2    = _toPrimitive;
var has$3            = _has;
var IE8_DOM_DEFINE$1 = _ie8DomDefine;
var gOPD$1           = Object.getOwnPropertyDescriptor;

var f$7 = _descriptors ? gOPD$1 : function getOwnPropertyDescriptor(O, P){
  O = toIObject$5(O);
  P = toPrimitive$2(P, true);
  if(IE8_DOM_DEFINE$1)try {
    return gOPD$1(O, P);
  } catch(e){ /* empty */ }
  if(has$3(O, P))return createDesc$2(!pIE$1.f.call(O, P), O[P]);
};

var _objectGopd = {
	f: f$7
};

// ECMAScript 6 symbols shim
var global$1         = _global;
var has            = _has;
var DESCRIPTORS    = _descriptors;
var $export        = _export;
var redefine       = _redefine;
var META           = _meta.KEY;
var $fails         = _fails;
var shared         = _shared;
var setToStringTag = _setToStringTag;
var uid            = _uid;
var wks            = _wks;
var wksExt         = _wksExt;
var wksDefine      = _wksDefine;
var keyOf          = _keyof;
var enumKeys       = _enumKeys;
var isArray        = _isArray;
var anObject       = _anObject;
var toIObject      = _toIobject;
var toPrimitive    = _toPrimitive;
var createDesc     = _propertyDesc;
var _create        = _objectCreate;
var gOPNExt        = _objectGopnExt;
var $GOPD          = _objectGopd;
var $DP            = _objectDp;
var $keys          = _objectKeys;
var gOPD           = $GOPD.f;
var dP             = $DP.f;
var gOPN           = gOPNExt.f;
var $Symbol        = global$1.Symbol;
var $JSON          = global$1.JSON;
var _stringify     = $JSON && $JSON.stringify;
var PROTOTYPE      = 'prototype';
var HIDDEN         = wks('_hidden');
var TO_PRIMITIVE   = wks('toPrimitive');
var isEnum         = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols     = shared('symbols');
var OPSymbols      = shared('op-symbols');
var ObjectProto    = Object[PROTOTYPE];
var USE_NATIVE     = typeof $Symbol == 'function';
var QObject        = global$1.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  _objectGopn.f = gOPNExt.f = $getOwnPropertyNames;
  _objectPie.f  = $propertyIsEnumerable;
  _objectGops.f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !_library){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global$1.JSON, 'JSON', true);

var $export$2 = _export;
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export$2($export$2.S, 'Object', {create: _objectCreate});

var $export$3 = _export;
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export$3($export$3.S + $export$3.F * !_descriptors, 'Object', {defineProperty: _objectDp.f});

var $export$4 = _export;
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export$4($export$4.S + $export$4.F * !_descriptors, 'Object', {defineProperties: _objectDps});

// most Object methods by ES6 should accept primitives
var $export$5 = _export;
var core$2    = _core;
var fails   = _fails;
var _objectSap = function(KEY, exec){
  var fn  = (core$2.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export$5($export$5.S + $export$5.F * fails(function(){ fn(1); }), 'Object', exp);
};

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject$6                 = _toIobject;
var $getOwnPropertyDescriptor$1 = _objectGopd.f;

_objectSap('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor$1(toIObject$6(it), key);
  };
});

// 7.1.13 ToObject(argument)
var defined$1 = _defined;
var _toObject = function(it){
  return Object(defined$1(it));
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has$4         = _has;
var toObject$1    = _toObject;
var IE_PROTO$2    = _sharedKey('IE_PROTO');
var ObjectProto$1 = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function(O){
  O = toObject$1(O);
  if(has$4(O, IE_PROTO$2))return O[IE_PROTO$2];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto$1 : null;
};

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = _toObject;
var $getPrototypeOf = _objectGpo;

_objectSap('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

// 19.1.2.14 Object.keys(O)
var toObject$2 = _toObject;
var $keys$3    = _objectKeys;

_objectSap('keys', function(){
  return function keys(it){
    return $keys$3(toObject$2(it));
  };
});

// 19.1.2.7 Object.getOwnPropertyNames(O)
_objectSap('getOwnPropertyNames', function(){
  return _objectGopnExt.f;
});

// 19.1.2.5 Object.freeze(O)
var isObject$3 = _isObject;
var meta     = _meta.onFreeze;

_objectSap('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject$3(it) ? $freeze(meta(it)) : it;
  };
});

// 19.1.2.17 Object.seal(O)
var isObject$4 = _isObject;
var meta$1     = _meta.onFreeze;

_objectSap('seal', function($seal){
  return function seal(it){
    return $seal && isObject$4(it) ? $seal(meta$1(it)) : it;
  };
});

// 19.1.2.15 Object.preventExtensions(O)
var isObject$5 = _isObject;
var meta$2     = _meta.onFreeze;

_objectSap('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject$5(it) ? $preventExtensions(meta$2(it)) : it;
  };
});

// 19.1.2.12 Object.isFrozen(O)
var isObject$6 = _isObject;

_objectSap('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject$6(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

// 19.1.2.13 Object.isSealed(O)
var isObject$7 = _isObject;

_objectSap('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject$7(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

// 19.1.2.11 Object.isExtensible(O)
var isObject$8 = _isObject;

_objectSap('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject$8(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys$3  = _objectKeys;
var gOPS$1     = _objectGops;
var pIE$2      = _objectPie;
var toObject$3 = _toObject;
var IObject$1  = _iobject;
var $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject$3(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS$1.f
    , isEnum     = pIE$2.f;
  while(aLen > index){
    var S      = IObject$1(arguments[index++])
      , keys   = getSymbols ? getKeys$3(S).concat(getSymbols(S)) : getKeys$3(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)
var $export$6 = _export;

$export$6($export$6.S + $export$6.F, 'Object', {assign: _objectAssign});

// 7.2.9 SameValue(x, y)
var _sameValue = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

// 19.1.3.10 Object.is(value1, value2)
var $export$7 = _export;
$export$7($export$7.S, 'Object', {is: _sameValue});

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject$9 = _isObject;
var anObject$4 = _anObject;
var check = function(O, proto){
  anObject$4(O);
  if(!isObject$9(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
var _setProto = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export$8 = _export;
$export$8($export$8.S, 'Object', {setPrototypeOf: _setProto.set});

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof$2 = _cof;
var TAG$1 = _wks('toStringTag');
var ARG = cof$2(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

var _classof = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
    // builtinTag case
    : ARG ? cof$2(O)
    // ES3 arguments fallback
    : (B = cof$2(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

// 19.1.3.6 Object.prototype.toString()
var classof = _classof;
var test    = {};
test[_wks('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  _redefine(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}

// fast apply, http://jsperf.lnkit.com/fast-apply/5
var _invoke = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};

var aFunction$1  = _aFunction;
var isObject$10   = _isObject;
var invoke     = _invoke;
var arraySlice = [].slice;
var factories  = {};

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

var _bind = Function.bind || function bind(that /*, args... */){
  var fn       = aFunction$1(this)
    , partArgs = arraySlice.call(arguments, 1);
  var bound = function(/* args... */){
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if(isObject$10(fn.prototype))bound.prototype = fn.prototype;
  return bound;
};

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export$9 = _export;

$export$9($export$9.P, 'Function', {bind: _bind});

var dP$4         = _objectDp.f;
var createDesc$3 = _propertyDesc;
var has$5        = _has;
var FProto     = Function.prototype;
var nameRE     = /^\s*function ([^ (]*)/;
var NAME       = 'name';

var isExtensible = Object.isExtensible || function(){
  return true;
};

// 19.2.4.2 name
NAME in FProto || _descriptors && dP$4(FProto, NAME, {
  configurable: true,
  get: function(){
    try {
      var that = this
        , name = ('' + that).match(nameRE)[1];
      has$5(that, NAME) || !isExtensible(that) || dP$4(that, NAME, createDesc$3(5, name));
      return name;
    } catch(e){
      return '';
    }
  }
});

var isObject$11       = _isObject;
var getPrototypeOf = _objectGpo;
var HAS_INSTANCE   = _wks('hasInstance');
var FunctionProto  = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))_objectDp.f(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject$11(O))return false;
  if(!isObject$11(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
  return false;
}});

var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var $export$11 = _export;
var defined$2 = _defined;
var fails$1   = _fails;
var spaces  = _stringWs;
var space   = '[' + spaces + ']';
var non     = '\u200b\u0085';
var ltrim   = RegExp('^' + space + space + '*');
var rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails$1(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export$11($export$11.P + $export$11.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined$2(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

var _stringTrim = exporter;

var $parseInt$1 = _global.parseInt;
var $trim     = _stringTrim.trim;
var ws        = _stringWs;
var hex       = /^[\-+]?0[xX]/;

var _parseInt = $parseInt$1(ws + '08') !== 8 || $parseInt$1(ws + '0x16') !== 22 ? function parseInt(str, radix){
  var string = $trim(String(str), 3);
  return $parseInt$1(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt$1;

var $export$10   = _export;
var $parseInt = _parseInt;
// 18.2.5 parseInt(string, radix)
$export$10($export$10.G + $export$10.F * (parseInt != $parseInt), {parseInt: $parseInt});

var $parseFloat$1 = _global.parseFloat;
var $trim$1       = _stringTrim.trim;

var _parseFloat = 1 / $parseFloat$1(_stringWs + '-0') !== -Infinity ? function parseFloat(str){
  var string = $trim$1(String(str), 3)
    , result = $parseFloat$1(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat$1;

var $export$12     = _export;
var $parseFloat = _parseFloat;
// 18.2.4 parseFloat(string)
$export$12($export$12.G + $export$12.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});

var isObject$12       = _isObject;
var setPrototypeOf = _setProto.set;
var _inheritIfRequired = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject$12(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};

var global$5            = _global;
var has$6               = _has;
var cof$3               = _cof;
var inheritIfRequired = _inheritIfRequired;
var toPrimitive$3       = _toPrimitive;
var fails$2             = _fails;
var gOPN$2              = _objectGopn.f;
var gOPD$2              = _objectGopd.f;
var dP$5                = _objectDp.f;
var $trim$2             = _stringTrim.trim;
var NUMBER            = 'Number';
var $Number           = global$5[NUMBER];
var Base              = $Number;
var proto             = $Number.prototype;
var BROKEN_COF        = cof$3(_objectCreate(proto)) == NUMBER;
var TRIM              = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive$3(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim$2(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails$2(function(){ proto.valueOf.call(that); }) : cof$3(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for(var keys = _descriptors ? gOPN$2(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++){
    if(has$6(Base, key = keys[j]) && !has$6($Number, key)){
      dP$5($Number, key, gOPD$2(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  _redefine(global$5, NUMBER, $Number);
}

var cof$4 = _cof;
var _aNumberValue = function(it, msg){
  if(typeof it != 'number' && cof$4(it) != 'Number')throw TypeError(msg);
  return +it;
};

var toInteger$3 = _toInteger;
var defined$3   = _defined;

var _stringRepeat = function repeat(count){
  var str = String(defined$3(this))
    , res = ''
    , n   = toInteger$3(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};

var $export$13      = _export;
var toInteger$2    = _toInteger;
var aNumberValue = _aNumberValue;
var repeat       = _stringRepeat;
var $toFixed     = 1..toFixed;
var floor$1        = Math.floor;
var data         = [0, 0, 0, 0, 0, 0];
var ERROR        = 'Number.toFixed: incorrect invocation!';
var ZERO         = '0';

var multiply = function(n, c){
  var i  = -1
    , c2 = c;
  while(++i < 6){
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor$1(c2 / 1e7);
  }
};
var divide = function(n){
  var i = 6
    , c = 0;
  while(--i >= 0){
    c += data[i];
    data[i] = floor$1(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function(){
  var i = 6
    , s = '';
  while(--i >= 0){
    if(s !== '' || i === 0 || data[i] !== 0){
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function(x, n, acc){
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function(x){
  var n  = 0
    , x2 = x;
  while(x2 >= 4096){
    n += 12;
    x2 /= 4096;
  }
  while(x2 >= 2){
    n  += 1;
    x2 /= 2;
  } return n;
};

$export$13($export$13.P + $export$13.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128..toFixed(0) !== '1000000000000000128'
) || !_fails(function(){
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits){
    var x = aNumberValue(this, ERROR)
      , f = toInteger$2(fractionDigits)
      , s = ''
      , m = ZERO
      , e, z, j, k;
    if(f < 0 || f > 20)throw RangeError(ERROR);
    if(x != x)return 'NaN';
    if(x <= -1e21 || x >= 1e21)return String(x);
    if(x < 0){
      s = '-';
      x = -x;
    }
    if(x > 1e-21){
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if(e > 0){
        multiply(0, z);
        j = f;
        while(j >= 7){
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while(j >= 23){
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if(f > 0){
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});

var $export$14      = _export;
var $fails$1       = _fails;
var aNumberValue$1 = _aNumberValue;
var $toPrecision = 1..toPrecision;

$export$14($export$14.P + $export$14.F * ($fails$1(function(){
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails$1(function(){
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision){
    var that = aNumberValue$1(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
  }
});

// 20.1.2.1 Number.EPSILON
var $export$15 = _export;

$export$15($export$15.S, 'Number', {EPSILON: Math.pow(2, -52)});

// 20.1.2.2 Number.isFinite(number)
var $export$16   = _export;
var _isFinite = _global.isFinite;

$export$16($export$16.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});

// 20.1.2.3 Number.isInteger(number)
var isObject$13 = _isObject;
var floor$2    = Math.floor;
var _isInteger = function isInteger(it){
  return !isObject$13(it) && isFinite(it) && floor$2(it) === it;
};

// 20.1.2.3 Number.isInteger(number)
var $export$17 = _export;

$export$17($export$17.S, 'Number', {isInteger: _isInteger});

// 20.1.2.4 Number.isNaN(number)
var $export$18 = _export;

$export$18($export$18.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});

// 20.1.2.5 Number.isSafeInteger(number)
var $export$19   = _export;
var isInteger = _isInteger;
var abs       = Math.abs;

$export$19($export$19.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export$20 = _export;

$export$20($export$20.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export$21 = _export;

$export$21($export$21.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

var $export$22     = _export;
var $parseFloat$2 = _parseFloat;
// 20.1.2.12 Number.parseFloat(string)
$export$22($export$22.S + $export$22.F * (Number.parseFloat != $parseFloat$2), 'Number', {parseFloat: $parseFloat$2});

var $export$23   = _export;
var $parseInt$2 = _parseInt;
// 20.1.2.13 Number.parseInt(string, radix)
$export$23($export$23.S + $export$23.F * (Number.parseInt != $parseInt$2), 'Number', {parseInt: $parseInt$2});

// 20.2.2.20 Math.log1p(x)
var _mathLog1p = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

// 20.2.2.3 Math.acosh(x)
var $export$24 = _export;
var log1p   = _mathLog1p;
var sqrt    = Math.sqrt;
var $acosh  = Math.acosh;

$export$24($export$24.S + $export$24.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

// 20.2.2.5 Math.asinh(x)
var $export$25 = _export;
var $asinh  = Math.asinh;

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0 
$export$25($export$25.S + $export$25.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});

// 20.2.2.7 Math.atanh(x)
var $export$26 = _export;
var $atanh  = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0 
$export$26($export$26.S + $export$26.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

// 20.2.2.28 Math.sign(x)
var _mathSign = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

// 20.2.2.9 Math.cbrt(x)
var $export$27 = _export;
var sign    = _mathSign;

$export$27($export$27.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

// 20.2.2.11 Math.clz32(x)
var $export$28 = _export;

$export$28($export$28.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

// 20.2.2.12 Math.cosh(x)
var $export$29 = _export;
var exp     = Math.exp;

$export$29($export$29.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

// 20.2.2.14 Math.expm1(x)
var $expm1$1 = Math.expm1;
var _mathExpm1 = (!$expm1$1
  // Old FF bug
  || $expm1$1(10) > 22025.465794806719 || $expm1$1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1$1(-2e-17) != -2e-17
) ? function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1$1;

// 20.2.2.14 Math.expm1(x)
var $export$30 = _export;
var $expm1  = _mathExpm1;

$export$30($export$30.S + $export$30.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});

// 20.2.2.16 Math.fround(x)
var $export$31   = _export;
var sign$1      = _mathSign;
var pow$1       = Math.pow;
var EPSILON   = pow$1(2, -52);
var EPSILON32 = pow$1(2, -23);
var MAX32     = pow$1(2, 127) * (2 - EPSILON32);
var MIN32     = pow$1(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export$31($export$31.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign$1(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export$32 = _export;
var abs$1     = Math.abs;

$export$32($export$32.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , aLen = arguments.length
      , larg = 0
      , arg, div;
    while(i < aLen){
      arg = abs$1(arguments[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

// 20.2.2.18 Math.imul(x, y)
var $export$33 = _export;
var $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export$33($export$33.S + $export$33.F * _fails(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

// 20.2.2.21 Math.log10(x)
var $export$34 = _export;

$export$34($export$34.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});

// 20.2.2.20 Math.log1p(x)
var $export$35 = _export;

$export$35($export$35.S, 'Math', {log1p: _mathLog1p});

// 20.2.2.22 Math.log2(x)
var $export$36 = _export;

$export$36($export$36.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});

// 20.2.2.28 Math.sign(x)
var $export$37 = _export;

$export$37($export$37.S, 'Math', {sign: _mathSign});

// 20.2.2.30 Math.sinh(x)
var $export$38 = _export;
var expm1   = _mathExpm1;
var exp$1     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export$38($export$38.S + $export$38.F * _fails(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp$1(x - 1) - exp$1(-x - 1)) * (Math.E / 2);
  }
});

// 20.2.2.33 Math.tanh(x)
var $export$39 = _export;
var expm1$1   = _mathExpm1;
var exp$2     = Math.exp;

$export$39($export$39.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1$1(x = +x)
      , b = expm1$1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp$2(x) + exp$2(-x));
  }
});

// 20.2.2.34 Math.trunc(x)
var $export$40 = _export;

$export$40($export$40.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

var $export$41        = _export;
var toIndex$1        = _toIndex;
var fromCharCode   = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export$41($export$41.S + $export$41.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res  = []
      , aLen = arguments.length
      , i    = 0
      , code;
    while(aLen > i){
      code = +arguments[i++];
      if(toIndex$1(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

var $export$42   = _export;
var toIObject$7 = _toIobject;
var toLength$1  = _toLength;

$export$42($export$42.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl  = toIObject$7(callSite.raw)
      , len  = toLength$1(tpl.length)
      , aLen = arguments.length
      , res  = []
      , i    = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < aLen)res.push(String(arguments[i]));
    } return res.join('');
  }
});

// 21.1.3.25 String.prototype.trim()
_stringTrim('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});

var toInteger$4 = _toInteger;
var defined$4   = _defined;
// true  -> String#at
// false -> String#codePointAt
var _stringAt = function(TO_STRING){
  return function(that, pos){
    var s = String(defined$4(that))
      , i = toInteger$4(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _iterators = {};

var create         = _objectCreate;
var descriptor     = _propertyDesc;
var setToStringTag$2 = _setToStringTag;
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function(){ return this; });

var _iterCreate = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag$2(Constructor, NAME + ' Iterator');
};

var LIBRARY$1        = _library;
var $export$43        = _export;
var redefine$2       = _redefine;
var hide$1           = _hide;
var has$7            = _has;
var Iterators      = _iterators;
var $iterCreate    = _iterCreate;
var setToStringTag$1 = _setToStringTag;
var getPrototypeOf$1 = _objectGpo;
var ITERATOR       = _wks('iterator');
var BUGGY          = !([].keys && 'next' in [].keys());
var FF_ITERATOR    = '@@iterator';
var KEYS           = 'keys';
var VALUES         = 'values';

var returnThis = function(){ return this; };

var _iterDefine = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf$1($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag$1(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY$1 && !has$7(IteratorPrototype, ITERATOR))hide$1(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY$1 || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide$1(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine$2(proto, key, methods[key]);
    } else $export$43($export$43.P + $export$43.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

var $at  = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

var $export$44 = _export;
var $at$1     = _stringAt(false);
$export$44($export$44.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at$1(this, pos);
  }
});

// 7.2.8 IsRegExp(argument)
var isObject$14 = _isObject;
var cof$5      = _cof;
var MATCH    = _wks('match');
var _isRegexp = function(it){
  var isRegExp;
  return isObject$14(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof$5(it) == 'RegExp');
};

// helper for String#{startsWith, endsWith, includes}
var isRegExp = _isRegexp;
var defined$5  = _defined;

var _stringContext = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined$5(that));
};

var MATCH$1 = _wks('match');
var _failsIsRegexp = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH$1] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};

var $export$45   = _export;
var toLength$2  = _toLength;
var context   = _stringContext;
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export$45($export$45.P + $export$45.F * _failsIsRegexp(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , endPosition = arguments.length > 1 ? arguments[1] : undefined
      , len    = toLength$2(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength$2(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

var $export$46  = _export;
var context$1  = _stringContext;
var INCLUDES = 'includes';

$export$46($export$46.P + $export$46.F * _failsIsRegexp(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context$1(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var $export$47 = _export;

$export$47($export$47.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: _stringRepeat
});

var $export$48     = _export;
var toLength$3    = _toLength;
var context$2     = _stringContext;
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export$48($export$48.P + $export$48.F * _failsIsRegexp(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context$2(this, searchString, STARTS_WITH)
      , index  = toLength$3(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

var $export$49 = _export;
var fails$3   = _fails;
var defined$6 = _defined;
var quot    = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function(string, tag, attribute, value) {
  var S  = String(defined$6(string))
    , p1 = '<' + tag;
  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
var _stringHtml = function(NAME, exec){
  var O = {};
  O[NAME] = exec(createHTML);
  $export$49($export$49.P + $export$49.F * fails$3(function(){
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

// B.2.3.2 String.prototype.anchor(name)
_stringHtml('anchor', function(createHTML){
  return function anchor(name){
    return createHTML(this, 'a', 'name', name);
  }
});

// B.2.3.3 String.prototype.big()
_stringHtml('big', function(createHTML){
  return function big(){
    return createHTML(this, 'big', '', '');
  }
});

// B.2.3.4 String.prototype.blink()
_stringHtml('blink', function(createHTML){
  return function blink(){
    return createHTML(this, 'blink', '', '');
  }
});

// B.2.3.5 String.prototype.bold()
_stringHtml('bold', function(createHTML){
  return function bold(){
    return createHTML(this, 'b', '', '');
  }
});

// B.2.3.6 String.prototype.fixed()
_stringHtml('fixed', function(createHTML){
  return function fixed(){
    return createHTML(this, 'tt', '', '');
  }
});

// B.2.3.7 String.prototype.fontcolor(color)
_stringHtml('fontcolor', function(createHTML){
  return function fontcolor(color){
    return createHTML(this, 'font', 'color', color);
  }
});

// B.2.3.8 String.prototype.fontsize(size)
_stringHtml('fontsize', function(createHTML){
  return function fontsize(size){
    return createHTML(this, 'font', 'size', size);
  }
});

// B.2.3.9 String.prototype.italics()
_stringHtml('italics', function(createHTML){
  return function italics(){
    return createHTML(this, 'i', '', '');
  }
});

// B.2.3.10 String.prototype.link(url)
_stringHtml('link', function(createHTML){
  return function link(url){
    return createHTML(this, 'a', 'href', url);
  }
});

// B.2.3.11 String.prototype.small()
_stringHtml('small', function(createHTML){
  return function small(){
    return createHTML(this, 'small', '', '');
  }
});

// B.2.3.12 String.prototype.strike()
_stringHtml('strike', function(createHTML){
  return function strike(){
    return createHTML(this, 'strike', '', '');
  }
});

// B.2.3.13 String.prototype.sub()
_stringHtml('sub', function(createHTML){
  return function sub(){
    return createHTML(this, 'sub', '', '');
  }
});

// B.2.3.14 String.prototype.sup()
_stringHtml('sup', function(createHTML){
  return function sup(){
    return createHTML(this, 'sup', '', '');
  }
});

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export$50 = _export;

$export$50($export$50.S, 'Date', {now: function(){ return new Date().getTime(); }});

var $export$51     = _export;
var toObject$4    = _toObject;
var toPrimitive$4 = _toPrimitive;

$export$51($export$51.P + $export$51.F * _fails(function(){
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
}), 'Date', {
  toJSON: function toJSON(key){
    var O  = toObject$4(this)
      , pv = toPrimitive$4(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export$52 = _export;
var fails$4   = _fails;
var getTime = Date.prototype.getTime;

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
$export$52($export$52.P + $export$52.F * (fails$4(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails$4(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});

var DateProto    = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING    = 'toString';
var $toString    = DateProto[TO_STRING];
var getTime$1      = DateProto.getTime;
if(new Date(NaN) + '' != INVALID_DATE){
  _redefine(DateProto, TO_STRING, function toString(){
    var value = getTime$1.call(this);
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

var anObject$5    = _anObject;
var toPrimitive$5 = _toPrimitive;
var NUMBER$1      = 'number';

var _dateToPrimitive = function(hint){
  if(hint !== 'string' && hint !== NUMBER$1 && hint !== 'default')throw TypeError('Incorrect hint');
  return toPrimitive$5(anObject$5(this), hint != NUMBER$1);
};

var TO_PRIMITIVE$1 = _wks('toPrimitive');
var proto$1        = Date.prototype;

if(!(TO_PRIMITIVE$1 in proto$1))_hide(proto$1, TO_PRIMITIVE$1, _dateToPrimitive);

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export$53 = _export;

$export$53($export$53.S, 'Array', {isArray: _isArray});

// call something on iterator step with safe closing on error
var anObject$6 = _anObject;
var _iterCall = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject$6(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject$6(ret.call(iterator));
    throw e;
  }
};

// check on default Array iterator
var Iterators$1  = _iterators;
var ITERATOR$1   = _wks('iterator');
var ArrayProto = Array.prototype;

var _isArrayIter = function(it){
  return it !== undefined && (Iterators$1.Array === it || ArrayProto[ITERATOR$1] === it);
};

var $defineProperty$1 = _objectDp;
var createDesc$4      = _propertyDesc;

var _createProperty = function(object, index, value){
  if(index in object)$defineProperty$1.f(object, index, createDesc$4(0, value));
  else object[index] = value;
};

var classof$1   = _classof;
var ITERATOR$2  = _wks('iterator');
var Iterators$2 = _iterators;
var core_getIteratorMethod = _core.getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR$2]
    || it['@@iterator']
    || Iterators$2[classof$1(it)];
};

var ITERATOR$3     = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$3]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

var _iterDetect = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR$3]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR$3] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

var ctx$1            = _ctx;
var $export$54        = _export;
var toObject$5       = _toObject;
var call           = _iterCall;
var isArrayIter    = _isArrayIter;
var toLength$4       = _toLength;
var createProperty = _createProperty;
var getIterFn      = core_getIteratorMethod;

$export$54($export$54.S + $export$54.F * !_iterDetect(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject$5(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx$1(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength$4(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

var $export$55        = _export;
var createProperty$1 = _createProperty;

// WebKit Array.of isn't generic
$export$55($export$55.S + $export$55.F * _fails(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , aLen   = arguments.length
      , result = new (typeof this == 'function' ? this : Array)(aLen);
    while(aLen > index)createProperty$1(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

var fails$5 = _fails;

var _strictMethod = function(method, arg){
  return !!method && fails$5(function(){
    arg ? method.call(null, function(){}, 1) : method.call(null);
  });
};

// 22.1.3.13 Array.prototype.join(separator)
var $export$56   = _export;
var toIObject$8 = _toIobject;
var arrayJoin = [].join;

// fallback for not array-like strings
$export$56($export$56.P + $export$56.F * (_iobject != Object || !_strictMethod(arrayJoin)), 'Array', {
  join: function join(separator){
    return arrayJoin.call(toIObject$8(this), separator === undefined ? ',' : separator);
  }
});

var $export$57    = _export;
var html       = _html;
var cof$6        = _cof;
var toIndex$2    = _toIndex;
var toLength$5   = _toLength;
var arraySlice$1 = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export$57($export$57.P + $export$57.F * _fails(function(){
  if(html)arraySlice$1.call(html);
}), 'Array', {
  slice: function slice(begin, end){
    var len   = toLength$5(this.length)
      , klass = cof$6(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice$1.call(this, begin, end);
    var start  = toIndex$2(begin, len)
      , upTo   = toIndex$2(end, len)
      , size   = toLength$5(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

var $export$58   = _export;
var aFunction$2 = _aFunction;
var toObject$6  = _toObject;
var fails$6     = _fails;
var $sort     = [].sort;
var test$1      = [1, 2, 3];

$export$58($export$58.P + $export$58.F * (fails$6(function(){
  // IE8-
  test$1.sort(undefined);
}) || !fails$6(function(){
  // V8 bug
  test$1.sort(null);
  // Old WebKit
}) || !_strictMethod($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn){
    return comparefn === undefined
      ? $sort.call(toObject$6(this))
      : $sort.call(toObject$6(this), aFunction$2(comparefn));
  }
});

var isObject$15 = _isObject;
var isArray$1  = _isArray;
var SPECIES  = _wks('species');

var _arraySpeciesConstructor = function(original){
  var C;
  if(isArray$1(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray$1(C.prototype)))C = undefined;
    if(isObject$15(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = _arraySpeciesConstructor;

var _arraySpeciesCreate = function(original, length){
  return new (speciesConstructor(original))(length);
};

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx$2      = _ctx;
var IObject$2  = _iobject;
var toObject$7 = _toObject;
var toLength$6 = _toLength;
var asc      = _arraySpeciesCreate;
var _arrayMethods = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject$7($this)
      , self   = IObject$2(O)
      , f      = ctx$2(callbackfn, that, 3)
      , length = toLength$6(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

var $export$59  = _export;
var $forEach = _arrayMethods(0);
var STRICT   = _strictMethod([].forEach, true);

$export$59($export$59.P + $export$59.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */){
    return $forEach(this, callbackfn, arguments[1]);
  }
});

var $export$60 = _export;
var $map    = _arrayMethods(1);

$export$60($export$60.P + $export$60.F * !_strictMethod([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */){
    return $map(this, callbackfn, arguments[1]);
  }
});

var $export$61 = _export;
var $filter = _arrayMethods(2);

$export$61($export$61.P + $export$61.F * !_strictMethod([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */){
    return $filter(this, callbackfn, arguments[1]);
  }
});

var $export$62 = _export;
var $some   = _arrayMethods(3);

$export$62($export$62.P + $export$62.F * !_strictMethod([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */){
    return $some(this, callbackfn, arguments[1]);
  }
});

var $export$63 = _export;
var $every  = _arrayMethods(4);

$export$63($export$63.P + $export$63.F * !_strictMethod([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */){
    return $every(this, callbackfn, arguments[1]);
  }
});

var aFunction$3 = _aFunction;
var toObject$8  = _toObject;
var IObject$3   = _iobject;
var toLength$7  = _toLength;

var _arrayReduce = function(that, callbackfn, aLen, memo, isRight){
  aFunction$3(callbackfn);
  var O      = toObject$8(that)
    , self   = IObject$3(O)
    , length = toLength$7(O.length)
    , index  = isRight ? length - 1 : 0
    , i      = isRight ? -1 : 1;
  if(aLen < 2)for(;;){
    if(index in self){
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if(isRight ? index < 0 : length <= index){
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};

var $export$64 = _export;
var $reduce = _arrayReduce;

$export$64($export$64.P + $export$64.F * !_strictMethod([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

var $export$65 = _export;
var $reduce$1 = _arrayReduce;

$export$65($export$65.P + $export$65.F * !_strictMethod([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */){
    return $reduce$1(this, callbackfn, arguments.length, arguments[1], true);
  }
});

var $export$66       = _export;
var $indexOf      = _arrayIncludes(false);
var $native       = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export$66($export$66.P + $export$66.F * (NEGATIVE_ZERO || !_strictMethod($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

var $export$67       = _export;
var toIObject$9     = _toIobject;
var toInteger$5     = _toInteger;
var toLength$8      = _toLength;
var $native$1       = [].lastIndexOf;
var NEGATIVE_ZERO$1 = !!$native$1 && 1 / [1].lastIndexOf(1, -0) < 0;

$export$67($export$67.P + $export$67.F * (NEGATIVE_ZERO$1 || !_strictMethod($native$1)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
    // convert -0 to +0
    if(NEGATIVE_ZERO$1)return $native$1.apply(this, arguments) || 0;
    var O      = toIObject$9(this)
      , length = toLength$8(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger$5(arguments[1]));
    if(index < 0)index = length + index;
    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
    return -1;
  }
});

var toObject$9 = _toObject;
var toIndex$3  = _toIndex;
var toLength$9 = _toLength;

var _arrayCopyWithin = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject$9(this)
    , len   = toLength$9(O.length)
    , to    = toIndex$3(target, len)
    , from  = toIndex$3(start, len)
    , end   = arguments.length > 2 ? arguments[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex$3(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = _wks('unscopables');
var ArrayProto$1  = Array.prototype;
if(ArrayProto$1[UNSCOPABLES] == undefined)_hide(ArrayProto$1, UNSCOPABLES, {});
var _addToUnscopables = function(key){
  ArrayProto$1[UNSCOPABLES][key] = true;
};

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export$68 = _export;

$export$68($export$68.P, 'Array', {copyWithin: _arrayCopyWithin});

_addToUnscopables('copyWithin');

var toObject$10 = _toObject;
var toIndex$4  = _toIndex;
var toLength$10 = _toLength;
var _arrayFill = function fill(value /*, start = 0, end = @length */){
  var O      = toObject$10(this)
    , length = toLength$10(O.length)
    , aLen   = arguments.length
    , index  = toIndex$4(aLen > 1 ? arguments[1] : undefined, length)
    , end    = aLen > 2 ? arguments[2] : undefined
    , endPos = end === undefined ? length : toIndex$4(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export$69 = _export;

$export$69($export$69.P, 'Array', {fill: _arrayFill});

_addToUnscopables('fill');

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export$70 = _export;
var $find   = _arrayMethods(5);
var KEY     = 'find';
var forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export$70($export$70.P + $export$70.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_addToUnscopables(KEY);

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export$71 = _export;
var $find$1   = _arrayMethods(6);
var KEY$1     = 'findIndex';
var forced$1  = true;
// Shouldn't skip holes
if(KEY$1 in [])Array(1)[KEY$1](function(){ forced$1 = false; });
$export$71($export$71.P + $export$71.F * forced$1, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_addToUnscopables(KEY$1);

var global$6      = _global;
var dP$6          = _objectDp;
var DESCRIPTORS$1 = _descriptors;
var SPECIES$1     = _wks('species');

var _setSpecies = function(KEY){
  var C = global$6[KEY];
  if(DESCRIPTORS$1 && C && !C[SPECIES$1])dP$6.f(C, SPECIES$1, {
    configurable: true,
    get: function(){ return this; }
  });
};

_setSpecies('Array');

var _iterStep = function(done, value){
  return {value: value, done: !!done};
};

var addToUnscopables = _addToUnscopables;
var step             = _iterStep;
var Iterators$3        = _iterators;
var toIObject$10        = _toIobject;

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function(iterated, kind){
  this._t = toIObject$10(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators$3.Arguments = Iterators$3.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// 21.2.5.3 get RegExp.prototype.flags
var anObject$7 = _anObject;
var _flags = function(){
  var that   = anObject$7(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};

var global$7            = _global;
var inheritIfRequired$1 = _inheritIfRequired;
var dP$7                = _objectDp.f;
var gOPN$3              = _objectGopn.f;
var isRegExp$1          = _isRegexp;
var $flags            = _flags;
var $RegExp           = global$7.RegExp;
var Base$1              = $RegExp;
var proto$2             = $RegExp.prototype;
var re1               = /a/g;
var re2               = /a/g;
var CORRECT_NEW       = new $RegExp(re1) !== re1;

if(_descriptors && (!CORRECT_NEW || _fails(function(){
  re2[_wks('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var tiRE = this instanceof $RegExp
      , piRE = isRegExp$1(p)
      , fiU  = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired$1(CORRECT_NEW
        ? new Base$1(piRE && !fiU ? p.source : p, f)
        : Base$1((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto$2, $RegExp);
  };
  var proxy = function(key){
    key in $RegExp || dP$7($RegExp, key, {
      configurable: true,
      get: function(){ return Base$1[key]; },
      set: function(it){ Base$1[key] = it; }
    });
  };
  for(var keys$1 = gOPN$3(Base$1), i$1 = 0; keys$1.length > i$1; )proxy(keys$1[i$1++]);
  proto$2.constructor = $RegExp;
  $RegExp.prototype = proto$2;
  _redefine(global$7, 'RegExp', $RegExp);
}

_setSpecies('RegExp');

// 21.2.5.3 get RegExp.prototype.flags()
if(_descriptors && /./g.flags != 'g')_objectDp.f(RegExp.prototype, 'flags', {
  configurable: true,
  get: _flags
});

var anObject$8    = _anObject;
var $flags$1      = _flags;
var DESCRIPTORS$2 = _descriptors;
var TO_STRING$1   = 'toString';
var $toString$1   = /./[TO_STRING$1];

var define$1 = function(fn){
  _redefine(RegExp.prototype, TO_STRING$1, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if(_fails(function(){ return $toString$1.call({source: 'a', flags: 'b'}) != '/a/b'; })){
  define$1(function toString(){
    var R = anObject$8(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS$2 && R instanceof RegExp ? $flags$1.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if($toString$1.name != TO_STRING$1){
  define$1(function toString(){
    return $toString$1.call(this);
  });
}

var hide$2     = _hide;
var redefine$3 = _redefine;
var fails$7    = _fails;
var defined$7  = _defined;
var wks$1      = _wks;

var _fixReWks = function(KEY, length, exec){
  var SYMBOL   = wks$1(KEY)
    , fns      = exec(defined$7, SYMBOL, ''[KEY])
    , strfn    = fns[0]
    , rxfn     = fns[1];
  if(fails$7(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine$3(String.prototype, KEY, strfn);
    hide$2(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return rxfn.call(string, this); }
    );
  }
};

// @@match logic
_fixReWks('match', 1, function(defined, MATCH, $match){
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

// @@replace logic
_fixReWks('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});

// @@search logic
_fixReWks('search', 1, function(defined, SEARCH, $search){
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});

// @@split logic
_fixReWks('split', 2, function(defined, SPLIT, $split){
  'use strict';
  var isRegExp   = _isRegexp
    , _split     = $split
    , $push      = [].push
    , $SPLIT     = 'split'
    , LENGTH     = 'length'
    , LAST_INDEX = 'lastIndex';
  if(
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ){
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function(separator, limit){
      var string = String(this);
      if(separator === undefined && limit === 0)return [];
      // If `separator` is not a regex, use native split
      if(!isRegExp(separator))return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while(match = separatorCopy.exec(string)){
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if(lastIndex > lastLastIndex){
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
          });
          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if(output[LENGTH] >= splitLimit)break;
        }
        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if(lastLastIndex === string[LENGTH]){
        if(lastLength || !separatorCopy.test(''))output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
    $split = function(separator, limit){
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit){
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});

var _anInstance = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

var _forOf = createCommonjsModule(function (module) {
var ctx         = _ctx
  , call        = _iterCall
  , isArrayIter = _isArrayIter
  , anObject    = _anObject
  , toLength    = _toLength
  , getIterFn   = core_getIteratorMethod
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;
});

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject$9  = _anObject;
var aFunction$5 = _aFunction;
var SPECIES$2   = _wks('species');
var _speciesConstructor = function(O, D){
  var C = anObject$9(O).constructor, S;
  return C === undefined || (S = anObject$9(C)[SPECIES$2]) == undefined ? D : aFunction$5(S);
};

var ctx$4                = _ctx;
var invoke$1             = _invoke;
var html$1               = _html;
var cel                = _domCreate;
var global$9             = _global;
var process$2            = global$9.process;
var setTask            = global$9.setImmediate;
var clearTask          = global$9.clearImmediate;
var MessageChannel     = global$9.MessageChannel;
var counter            = 0;
var queue              = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer;
var channel;
var port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke$1(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(_cof(process$2) == 'process'){
    defer = function(id){
      process$2.nextTick(ctx$4(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx$4(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global$9.addEventListener && typeof postMessage == 'function' && !global$9.importScripts){
    defer = function(id){
      global$9.postMessage(id + '', '*');
    };
    global$9.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html$1.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html$1.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx$4(run, id, 1), 0);
    };
  }
}
var _task = {
  set:   setTask,
  clear: clearTask
};

var global$10    = _global;
var macrotask = _task.set;
var Observer  = global$10.MutationObserver || global$10.WebKitMutationObserver;
var process$3   = global$10.process;
var Promise$1   = global$10.Promise;
var isNode$1    = _cof(process$3) == 'process';

var _microtask = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode$1 && (parent = process$3.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode$1){
    notify = function(){
      process$3.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise$1 && Promise$1.resolve){
    var promise = Promise$1.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global$10, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

var redefine$4 = _redefine;
var _redefineAll = function(target, src, safe){
  for(var key in src)redefine$4(target, key, src[key], safe);
  return target;
};

var LIBRARY$2            = _library;
var global$8             = _global;
var ctx$3                = _ctx;
var classof$2            = _classof;
var $export$72            = _export;
var isObject$16           = _isObject;
var aFunction$4          = _aFunction;
var anInstance         = _anInstance;
var forOf              = _forOf;
var speciesConstructor$1 = _speciesConstructor;
var task               = _task.set;
var microtask          = _microtask();
var PROMISE            = 'Promise';
var TypeError$1          = global$8.TypeError;
var process$1            = global$8.process;
var $Promise           = global$8[PROMISE];
var process$1            = global$8.process;
var isNode             = classof$2(process$1) == 'process';
var empty              = function(){ /* empty */ };
var Internal;
var GenericPromiseCapability;
var Wrapper;

var USE_NATIVE$1 = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[_wks('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject$16(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError$1('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction$4(resolve);
  this.reject  = aFunction$4(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError$1('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global$8, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process$1.emit('unhandledRejection', value, promise);
        } else if(handler = global$8.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global$8.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global$8, function(){
    var handler;
    if(isNode){
      process$1.emit('rejectionHandled', promise);
    } else if(handler = global$8.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError$1("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx$3($resolve, wrapper, 1), ctx$3($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE$1){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction$4(executor);
    Internal.call(this);
    try {
      executor(ctx$3($resolve, this, 1), ctx$3($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = _redefineAll($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor$1(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process$1.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx$3($resolve, promise, 1);
    this.reject  = ctx$3($reject, promise, 1);
  };
}

$export$72($export$72.G + $export$72.W + $export$72.F * !USE_NATIVE$1, {Promise: $Promise});
_setToStringTag($Promise, PROMISE);
_setSpecies(PROMISE);
Wrapper = _core[PROMISE];

// statics
$export$72($export$72.S + $export$72.F * !USE_NATIVE$1, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export$72($export$72.S + $export$72.F * (LIBRARY$2 || !USE_NATIVE$1), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export$72($export$72.S + $export$72.F * !(USE_NATIVE$1 && _iterDetect(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});

var dP$8          = _objectDp.f;
var create$1      = _objectCreate;
var redefineAll = _redefineAll;
var ctx$5         = _ctx;
var anInstance$1  = _anInstance;
var defined$8     = _defined;
var forOf$1       = _forOf;
var $iterDefine = _iterDefine;
var step$1        = _iterStep;
var setSpecies  = _setSpecies;
var DESCRIPTORS$3 = _descriptors;
var fastKey     = _meta.fastKey;
var SIZE        = DESCRIPTORS$3 ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

var _collectionStrong = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance$1(that, C, NAME, '_i');
      that._i = create$1(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf$1(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance$1(this, C, 'forEach');
        var f = ctx$5(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS$3)dP$8(C.prototype, 'size', {
      get: function(){
        return defined$8(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step$1(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step$1(0, entry.k);
      if(kind == 'values')return step$1(0, entry.v);
      return step$1(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

var global$11            = _global;
var $export$73           = _export;
var redefine$5          = _redefine;
var redefineAll$1       = _redefineAll;
var meta$3              = _meta;
var forOf$2             = _forOf;
var anInstance$2        = _anInstance;
var isObject$17          = _isObject;
var fails$8             = _fails;
var $iterDetect       = _iterDetect;
var setToStringTag$3    = _setToStringTag;
var inheritIfRequired$2 = _inheritIfRequired;

var _collection = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global$11[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine$5(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject$17(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject$17(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject$17(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails$8(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll$1(C.prototype, methods);
    meta$3.NEED = true;
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails$8(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO = !IS_WEAK && fails$8(function(){
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance$2(target, C, NAME);
        var that = inheritIfRequired$2(new Base, target, C);
        if(iterable != undefined)forOf$2(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag$3(C, NAME);

  O[NAME] = C;
  $export$73($export$73.G + $export$73.W + $export$73.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};

var strong = _collectionStrong;

// 23.1 Map Objects
var es6_map = _collection('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);

var strong$1 = _collectionStrong;

// 23.2 Set Objects
var es6_set = _collection('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong$1.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong$1);

var redefineAll$2       = _redefineAll;
var getWeak           = _meta.getWeak;
var anObject$10          = _anObject;
var isObject$18          = _isObject;
var anInstance$3        = _anInstance;
var forOf$3             = _forOf;
var createArrayMethod = _arrayMethods;
var $has              = _has;
var arrayFind         = createArrayMethod(5);
var arrayFindIndex    = createArrayMethod(6);
var id$1                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

var _collectionWeak = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance$3(that, C, NAME, '_i');
      that._i = id$1++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf$3(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll$2(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject$18(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject$18(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject$10(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

var es6_weakMap = createCommonjsModule(function (module) {
'use strict';
var each         = _arrayMethods(0)
  , redefine     = _redefine
  , meta         = _meta
  , assign       = _objectAssign
  , weak         = _collectionWeak
  , isObject     = _isObject
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = _collection('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}
});

var weak = _collectionWeak;

// 23.4 WeakSet Objects
_collection('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);

var global$12 = _global;
var hide$3   = _hide;
var uid$2    = _uid;
var TYPED  = uid$2('typed_array');
var VIEW$1   = uid$2('view');
var ABV    = !!(global$12.ArrayBuffer && global$12.DataView);
var CONSTR = ABV;
var i$2 = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while(i$2 < l){
  if(Typed = global$12[TypedArrayConstructors[i$2++]]){
    hide$3(Typed.prototype, TYPED, true);
    hide$3(Typed.prototype, VIEW$1, true);
  } else CONSTR = false;
}

var _typed = {
  ABV:    ABV,
  CONSTR: CONSTR,
  TYPED:  TYPED,
  VIEW:   VIEW$1
};

var _typedBuffer = createCommonjsModule(function (module, exports) {
'use strict';
var global         = _global
  , DESCRIPTORS    = _descriptors
  , LIBRARY        = _library
  , $typed         = _typed
  , hide           = _hide
  , redefineAll    = _redefineAll
  , fails          = _fails
  , anInstance     = _anInstance
  , toInteger      = _toInteger
  , toLength       = _toLength
  , gOPN           = _objectGopn.f
  , dP             = _objectDp.f
  , arrayFill      = _arrayFill
  , setToStringTag = _setToStringTag
  , ARRAY_BUFFER   = 'ArrayBuffer'
  , DATA_VIEW      = 'DataView'
  , PROTOTYPE      = 'prototype'
  , WRONG_LENGTH   = 'Wrong length!'
  , WRONG_INDEX    = 'Wrong index!'
  , $ArrayBuffer   = global[ARRAY_BUFFER]
  , $DataView      = global[DATA_VIEW]
  , Math           = global.Math
  , RangeError     = global.RangeError
  , Infinity       = global.Infinity
  , BaseBuffer     = $ArrayBuffer
  , abs            = Math.abs
  , pow            = Math.pow
  , floor          = Math.floor
  , log            = Math.log
  , LN2            = Math.LN2
  , BUFFER         = 'buffer'
  , BYTE_LENGTH    = 'byteLength'
  , BYTE_OFFSET    = 'byteOffset'
  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
var packIEEE754 = function(value, mLen, nBytes){
  var buffer = Array(nBytes)
    , eLen   = nBytes * 8 - mLen - 1
    , eMax   = (1 << eLen) - 1
    , eBias  = eMax >> 1
    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
    , i      = 0
    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
    , e, m, c;
  value = abs(value);
  if(value != value || value === Infinity){
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if(value * (c = pow(2, -e)) < 1){
      e--;
      c *= 2;
    }
    if(e + eBias >= 1){
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if(value * c >= 2){
      e++;
      c /= 2;
    }
    if(e + eBias >= eMax){
      m = 0;
      e = eMax;
    } else if(e + eBias >= 1){
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
};
var unpackIEEE754 = function(buffer, mLen, nBytes){
  var eLen  = nBytes * 8 - mLen - 1
    , eMax  = (1 << eLen) - 1
    , eBias = eMax >> 1
    , nBits = eLen - 7
    , i     = nBytes - 1
    , s     = buffer[i--]
    , e     = s & 127
    , m;
  s >>= 7;
  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if(e === 0){
    e = 1 - eBias;
  } else if(e === eMax){
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
};

var unpackI32 = function(bytes){
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
};
var packI8 = function(it){
  return [it & 0xff];
};
var packI16 = function(it){
  return [it & 0xff, it >> 8 & 0xff];
};
var packI32 = function(it){
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
};
var packF64 = function(it){
  return packIEEE754(it, 52, 8);
};
var packF32 = function(it){
  return packIEEE754(it, 23, 4);
};

var addGetter = function(C, key, internal){
  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
};

var get = function(view, bytes, index, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
};
var set = function(view, bytes, index, conversion, value, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = conversion(+value);
  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
};

var validateArrayBufferArguments = function(that, length){
  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
  var numberLength = +length
    , byteLength   = toLength(numberLength);
  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
  return byteLength;
};

if(!$typed.ABV){
  $ArrayBuffer = function ArrayBuffer(length){
    var byteLength = validateArrayBufferArguments(this, length);
    this._b       = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength){
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH]
      , offset       = toInteger(byteOffset);
    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if(DESCRIPTORS){
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset){
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset){
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if(!fails(function(){
    new $ArrayBuffer;     // eslint-disable-line no-new
  }) || !fails(function(){
    new $ArrayBuffer(.5); // eslint-disable-line no-new
  })){
    $ArrayBuffer = function ArrayBuffer(length){
      return new BaseBuffer(validateArrayBufferArguments(this, length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2))
    , $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;
});

var $export$74      = _export;
var $typed       = _typed;
var buffer       = _typedBuffer;
var anObject$11     = _anObject;
var toIndex$5      = _toIndex;
var toLength$11     = _toLength;
var isObject$19     = _isObject;
var ArrayBuffer  = _global.ArrayBuffer;
var speciesConstructor$2 = _speciesConstructor;
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView    = buffer.DataView;
var $isView      = $typed.ABV && ArrayBuffer.isView;
var $slice       = $ArrayBuffer.prototype.slice;
var VIEW         = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export$74($export$74.G + $export$74.W + $export$74.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});

$export$74($export$74.S + $export$74.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it){
    return $isView && $isView(it) || isObject$19(it) && VIEW in it;
  }
});

$export$74($export$74.P + $export$74.U + $export$74.F * _fails(function(){
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end){
    if($slice !== undefined && end === undefined)return $slice.call(anObject$11(this), start); // FF fix
    var len    = anObject$11(this).byteLength
      , first  = toIndex$5(start, len)
      , final  = toIndex$5(end === undefined ? len : end, len)
      , result = new (speciesConstructor$2(this, $ArrayBuffer))(toLength$11(final - first))
      , viewS  = new $DataView(this)
      , viewT  = new $DataView(result)
      , index  = 0;
    while(first < final){
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

_setSpecies(ARRAY_BUFFER);

var $export$75 = _export;
$export$75($export$75.G + $export$75.W + $export$75.F * !_typed.ABV, {
  DataView: _typedBuffer.DataView
});

var _typedArray = createCommonjsModule(function (module) {
'use strict';
if(_descriptors){
  var LIBRARY             = _library
    , global              = _global
    , fails               = _fails
    , $export             = _export
    , $typed              = _typed
    , $buffer             = _typedBuffer
    , ctx                 = _ctx
    , anInstance          = _anInstance
    , propertyDesc        = _propertyDesc
    , hide                = _hide
    , redefineAll         = _redefineAll
    , toInteger           = _toInteger
    , toLength            = _toLength
    , toIndex             = _toIndex
    , toPrimitive         = _toPrimitive
    , has                 = _has
    , same                = _sameValue
    , classof             = _classof
    , isObject            = _isObject
    , toObject            = _toObject
    , isArrayIter         = _isArrayIter
    , create              = _objectCreate
    , getPrototypeOf      = _objectGpo
    , gOPN                = _objectGopn.f
    , getIterFn           = core_getIteratorMethod
    , uid                 = _uid
    , wks                 = _wks
    , createArrayMethod   = _arrayMethods
    , createArrayIncludes = _arrayIncludes
    , speciesConstructor  = _speciesConstructor
    , ArrayIterators      = es6_array_iterator
    , Iterators           = _iterators
    , $iterDetect         = _iterDetect
    , setSpecies          = _setSpecies
    , arrayFill           = _arrayFill
    , arrayCopyWithin     = _arrayCopyWithin
    , $DP                 = _objectDp
    , $GOPD               = _objectGopd
    , dP                  = $DP.f
    , gOPD                = $GOPD.f
    , RangeError          = global.RangeError
    , TypeError           = global.TypeError
    , Uint8Array          = global.Uint8Array
    , ARRAY_BUFFER        = 'ArrayBuffer'
    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
    , PROTOTYPE           = 'prototype'
    , ArrayProto          = Array[PROTOTYPE]
    , $ArrayBuffer        = $buffer.ArrayBuffer
    , $DataView           = $buffer.DataView
    , arrayForEach        = createArrayMethod(0)
    , arrayFilter         = createArrayMethod(2)
    , arraySome           = createArrayMethod(3)
    , arrayEvery          = createArrayMethod(4)
    , arrayFind           = createArrayMethod(5)
    , arrayFindIndex      = createArrayMethod(6)
    , arrayIncludes       = createArrayIncludes(true)
    , arrayIndexOf        = createArrayIncludes(false)
    , arrayValues         = ArrayIterators.values
    , arrayKeys           = ArrayIterators.keys
    , arrayEntries        = ArrayIterators.entries
    , arrayLastIndexOf    = ArrayProto.lastIndexOf
    , arrayReduce         = ArrayProto.reduce
    , arrayReduceRight    = ArrayProto.reduceRight
    , arrayJoin           = ArrayProto.join
    , arraySort           = ArrayProto.sort
    , arraySlice          = ArrayProto.slice
    , arrayToString       = ArrayProto.toString
    , arrayToLocaleString = ArrayProto.toLocaleString
    , ITERATOR            = wks('iterator')
    , TAG                 = wks('toStringTag')
    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
    , DEF_CONSTRUCTOR     = uid('def_constructor')
    , ALL_CONSTRUCTORS    = $typed.CONSTR
    , TYPED_ARRAY         = $typed.TYPED
    , VIEW                = $typed.VIEW
    , WRONG_LENGTH        = 'Wrong length!';

  var $map = createArrayMethod(1, function(O, length){
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function(){
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
    new Uint8Array(1).set({});
  });

  var strictToLength = function(it, SAME){
    if(it === undefined)throw TypeError(WRONG_LENGTH);
    var number = +it
      , length = toLength(it);
    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
    return length;
  };

  var toOffset = function(it, BYTES){
    var offset = toInteger(it);
    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function(it){
    if(isObject(it) && TYPED_ARRAY in it)return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function(C, length){
    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function(O, list){
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function(C, list){
    var index  = 0
      , length = list.length
      , result = allocate(C, length);
    while(length > index)result[index] = list[index++];
    return result;
  };

  var addGetter = function(it, key, internal){
    dP(it, key, {get: function(){ return this._d[internal]; }});
  };

  var $from = function from(source /*, mapfn, thisArg */){
    var O       = toObject(source)
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , iterFn  = getIterFn(O)
      , i, length, values, result, step, iterator;
    if(iterFn != undefined && !isArrayIter(iterFn)){
      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
        values.push(step.value);
      } O = values;
    }
    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/*...items*/){
    var index  = 0
      , length = arguments.length
      , result = allocate(this, length);
    while(length > index)result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString(){
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /*, end */){
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /*, thisArg */){
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /*, thisArg */){
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /*, thisArg */){
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /*, thisArg */){
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /*, thisArg */){
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /*, fromIndex */){
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /*, fromIndex */){
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator){ // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /*, thisArg */){
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse(){
      var that   = this
        , length = validate(that).length
        , middle = Math.floor(length / 2)
        , index  = 0
        , value;
      while(index < middle){
        value         = that[index];
        that[index++] = that[--length];
        that[length]  = value;
      } return that;
    },
    some: function some(callbackfn /*, thisArg */){
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn){
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end){
      var O      = validate(this)
        , length = O.length
        , $begin = toIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end){
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /*, offset */){
    validate(this);
    var offset = toOffset(arguments[1], 1)
      , length = this.length
      , src    = toObject(arrayLike)
      , len    = toLength(src.length)
      , index  = 0;
    if(len + offset > length)throw RangeError(WRONG_LENGTH);
    while(index < len)this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries(){
      return arrayEntries.call(validate(this));
    },
    keys: function keys(){
      return arrayKeys.call(validate(this));
    },
    values: function values(){
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function(target, key){
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key){
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc){
    if(isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ){
      target[key] = desc.value;
      return target;
    } else return dP(target, key, desc);
  };

  if(!ALL_CONSTRUCTORS){
    $GOPD.f = $getDesc;
    $DP.f   = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty:           $setDesc
  });

  if(fails(function(){ arrayToString.call({}); })){
    arrayToString = arrayToLocaleString = function toString(){
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice:          $slice,
    set:            $set,
    constructor:    function(){ /* noop */ },
    toString:       arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function(){ return this[TYPED_ARRAY]; }
  });

  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
    CLAMPED = !!CLAMPED;
    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
      , ISNT_UINT8 = NAME != 'Uint8Array'
      , GETTER     = 'get' + KEY
      , SETTER     = 'set' + KEY
      , TypedArray = global[NAME]
      , Base       = TypedArray || {}
      , TAC        = TypedArray && getPrototypeOf(TypedArray)
      , FORCED     = !TypedArray || !$typed.ABV
      , O          = {}
      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function(that, index){
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function(that, index, value){
      var data = that._d;
      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function(that, index){
      dP(that, index, {
        get: function(){
          return getter(this, index);
        },
        set: function(value){
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if(FORCED){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME, '_d');
        var index  = 0
          , offset = 0
          , buffer, byteLength, length, klass;
        if(!isObject(data)){
          length     = strictToLength(data, true);
          byteLength = length * BYTES;
          buffer     = new $ArrayBuffer(byteLength);
        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if($length === undefined){
            if($len % BYTES)throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if(TYPED_ARRAY in data){
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while(index < length)addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if(!$iterDetect(function(iter){
      // V8 works with iterators, but fails in many other cases
      // https://code.google.com/p/v8/issues/detail?id=4552
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
      , $iterator         = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
      dP(TypedArrayPrototype, TAG, {
        get: function(){ return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES,
      from: $from,
      of: $of
    });

    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});

    $export($export.P + $export.F * fails(function(){
      new TypedArray(1).slice();
    }), NAME, {slice: $slice});

    $export($export.P + $export.F * (fails(function(){
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
    }) || !fails(function(){
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, {toLocaleString: $toLocaleString});

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function(){ /* empty */ };
});

_typedArray('Int8', 1, function(init){
  return function Int8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Uint8', 1, function(init){
  return function Uint8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Uint8', 1, function(init){
  return function Uint8ClampedArray(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
}, true);

_typedArray('Int16', 2, function(init){
  return function Int16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Uint16', 2, function(init){
  return function Uint16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Int32', 4, function(init){
  return function Int32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Uint32', 4, function(init){
  return function Uint32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Float32', 4, function(init){
  return function Float32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

_typedArray('Float64', 8, function(init){
  return function Float64Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export$76   = _export;
var aFunction$6 = _aFunction;
var anObject$12  = _anObject;
var rApply    = (_global.Reflect || {}).apply;
var fApply    = Function.apply;
// MS Edge argumentsList argument is optional
$export$76($export$76.S + $export$76.F * !_fails(function(){
  rApply(function(){});
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    var T = aFunction$6(target)
      , L = anObject$12(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export$77    = _export;
var create$2     = _objectCreate;
var aFunction$7  = _aFunction;
var anObject$13   = _anObject;
var isObject$20   = _isObject;
var fails$9      = _fails;
var bind       = _bind;
var rConstruct = (_global.Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails$9(function(){
  function F(){}
  return !(rConstruct(function(){}, [], F) instanceof F);
});
var ARGS_BUG = !fails$9(function(){
  rConstruct(function(){});
});

$export$77($export$77.S + $export$77.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction$7(Target);
    anObject$13(args);
    var newTarget = arguments.length < 3 ? Target : aFunction$7(arguments[2]);
    if(ARGS_BUG && !NEW_TARGET_BUG)return rConstruct(Target, args, newTarget);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      switch(args.length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = create$2(isObject$20(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject$20(result) ? result : instance;
  }
});

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP$9          = _objectDp;
var $export$78     = _export;
var anObject$14    = _anObject;
var toPrimitive$6 = _toPrimitive;

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export$78($export$78.S + $export$78.F * _fails(function(){
  Reflect.defineProperty(dP$9.f({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject$14(target);
    propertyKey = toPrimitive$6(propertyKey, true);
    anObject$14(attributes);
    try {
      dP$9.f(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export$79  = _export;
var gOPD$3     = _objectGopd.f;
var anObject$15 = _anObject;

$export$79($export$79.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = gOPD$3(anObject$15(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

// 26.1.5 Reflect.enumerate(target)
var $export$80  = _export;
var anObject$16 = _anObject;
var Enumerate = function(iterated){
  this._t = anObject$16(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
_iterCreate(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export$80($export$80.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD$4           = _objectGopd;
var getPrototypeOf$2 = _objectGpo;
var has$8            = _has;
var $export$81        = _export;
var isObject$21       = _isObject;
var anObject$17       = _anObject;

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject$17(target) === receiver)return target[propertyKey];
  if(desc = gOPD$4.f(target, propertyKey))return has$8(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject$21(proto = getPrototypeOf$2(target)))return get(proto, propertyKey, receiver);
}

$export$81($export$81.S, 'Reflect', {get: get});

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD$5     = _objectGopd;
var $export$82  = _export;
var anObject$18 = _anObject;

$export$82($export$82.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return gOPD$5.f(anObject$18(target), propertyKey);
  }
});

// 26.1.8 Reflect.getPrototypeOf(target)
var $export$83  = _export;
var getProto = _objectGpo;
var anObject$19 = _anObject;

$export$83($export$83.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject$19(target));
  }
});

// 26.1.9 Reflect.has(target, propertyKey)
var $export$84 = _export;

$export$84($export$84.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});

// 26.1.10 Reflect.isExtensible(target)
var $export$85       = _export;
var anObject$20      = _anObject;
var $isExtensible = Object.isExtensible;

$export$85($export$85.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject$20(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

// all object keys, includes non-enumerable and symbols
var gOPN$4     = _objectGopn;
var gOPS$2     = _objectGops;
var anObject$21 = _anObject;
var Reflect$1  = _global.Reflect;
var _ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it){
  var keys       = gOPN$4.f(anObject$21(it))
    , getSymbols = gOPS$2.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

// 26.1.11 Reflect.ownKeys(target)
var $export$86 = _export;

$export$86($export$86.S, 'Reflect', {ownKeys: _ownKeys});

// 26.1.12 Reflect.preventExtensions(target)
var $export$87            = _export;
var anObject$22           = _anObject;
var $preventExtensions = Object.preventExtensions;

$export$87($export$87.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject$22(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP$10             = _objectDp;
var gOPD$6           = _objectGopd;
var getPrototypeOf$3 = _objectGpo;
var has$9            = _has;
var $export$88        = _export;
var createDesc$5     = _propertyDesc;
var anObject$23       = _anObject;
var isObject$22       = _isObject;

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = gOPD$6.f(anObject$23(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject$22(proto = getPrototypeOf$3(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc$5(0);
  }
  if(has$9(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject$22(receiver))return false;
    existingDescriptor = gOPD$6.f(receiver, propertyKey) || createDesc$5(0);
    existingDescriptor.value = V;
    dP$10.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export$88($export$88.S, 'Reflect', {set: set});

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export$89  = _export;
var setProto = _setProto;

if(setProto)$export$89($export$89.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});

// https://github.com/tc39/Array.prototype.includes
var $export$90   = _export;
var $includes = _arrayIncludes(true);

$export$90($export$90.P, 'Array', {
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

_addToUnscopables('includes');

// https://github.com/mathiasbynens/String.prototype.at
var $export$91 = _export;
var $at$2     = _stringAt(true);

$export$91($export$91.P, 'String', {
  at: function at(pos){
    return $at$2(this, pos);
  }
});

// https://github.com/tc39/proposal-string-pad-start-end
var toLength$12 = _toLength;
var repeat$1   = _stringRepeat;
var defined$9  = _defined;

var _stringPad = function(that, maxLength, fillString, left){
  var S            = String(defined$9(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength$12(maxLength);
  if(intMaxLength <= stringLength || fillStr == '')return S;
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat$1.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

// https://github.com/tc39/proposal-string-pad-start-end
var $export$92 = _export;
var $pad    = _stringPad;

$export$92($export$92.P, 'String', {
  padStart: function padStart(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

// https://github.com/tc39/proposal-string-pad-start-end
var $export$93 = _export;
var $pad$1    = _stringPad;

$export$93($export$93.P, 'String', {
  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
    return $pad$1(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
_stringTrim('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
}, 'trimStart');

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
_stringTrim('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
}, 'trimEnd');

// https://tc39.github.io/String.prototype.matchAll/
var $export$94     = _export;
var defined$10     = _defined;
var toLength$13    = _toLength;
var isRegExp$2    = _isRegexp;
var getFlags    = _flags;
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function(regexp, string){
  this._r = regexp;
  this._s = string;
};

_iterCreate($RegExpStringIterator, 'RegExp String', function next(){
  var match = this._r.exec(this._s);
  return {value: match, done: match === null};
});

$export$94($export$94.P, 'String', {
  matchAll: function matchAll(regexp){
    defined$10(this);
    if(!isRegExp$2(regexp))throw TypeError(regexp + ' is not a regexp!');
    var S     = String(this)
      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength$13(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

_wksDefine('asyncIterator');

_wksDefine('observable');

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export$95        = _export;
var ownKeys        = _ownKeys;
var toIObject$11      = _toIobject;
var gOPD$7           = _objectGopd;
var createProperty$2 = _createProperty;

$export$95($export$95.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject$11(object)
      , getDesc = gOPD$7.f
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key;
    while(keys.length > i)createProperty$2(result, key = keys[i++], getDesc(O, key));
    return result;
  }
});

var getKeys$4   = _objectKeys;
var toIObject$12 = _toIobject;
var isEnum$1    = _objectPie.f;
var _objectToArray = function(isEntries){
  return function(it){
    var O      = toIObject$12(it)
      , keys   = getKeys$4(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum$1.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

// https://github.com/tc39/proposal-object-values-entries
var $export$96 = _export;
var $values = _objectToArray(false);

$export$96($export$96.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});

// https://github.com/tc39/proposal-object-values-entries
var $export$97  = _export;
var $entries = _objectToArray(true);

$export$97($export$97.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});

// Forced replacement prototype accessors methods
var _objectForcedPam = _library|| !_fails(function(){
  var K = Math.random();
  // In FF throws only define methods
  __defineSetter__.call(null, K, function(){ /* empty */});
  delete _global[K];
});

var $export$98         = _export;
var toObject$11        = _toObject;
var aFunction$8       = _aFunction;
var $defineProperty$2 = _objectDp;

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
_descriptors && $export$98($export$98.P + _objectForcedPam, 'Object', {
  __defineGetter__: function __defineGetter__(P, getter){
    $defineProperty$2.f(toObject$11(this), P, {get: aFunction$8(getter), enumerable: true, configurable: true});
  }
});

var $export$99         = _export;
var toObject$12        = _toObject;
var aFunction$9       = _aFunction;
var $defineProperty$3 = _objectDp;

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
_descriptors && $export$99($export$99.P + _objectForcedPam, 'Object', {
  __defineSetter__: function __defineSetter__(P, setter){
    $defineProperty$3.f(toObject$12(this), P, {set: aFunction$9(setter), enumerable: true, configurable: true});
  }
});

var $export$100                  = _export;
var toObject$13                 = _toObject;
var toPrimitive$7              = _toPrimitive;
var getPrototypeOf$4           = _objectGpo;
var getOwnPropertyDescriptor = _objectGopd.f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
_descriptors && $export$100($export$100.P + _objectForcedPam, 'Object', {
  __lookupGetter__: function __lookupGetter__(P){
    var O = toObject$13(this)
      , K = toPrimitive$7(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.get;
    } while(O = getPrototypeOf$4(O));
  }
});

var $export$101                  = _export;
var toObject$14                 = _toObject;
var toPrimitive$8              = _toPrimitive;
var getPrototypeOf$5           = _objectGpo;
var getOwnPropertyDescriptor$1 = _objectGopd.f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
_descriptors && $export$101($export$101.P + _objectForcedPam, 'Object', {
  __lookupSetter__: function __lookupSetter__(P){
    var O = toObject$14(this)
      , K = toPrimitive$8(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor$1(O, K))return D.set;
    } while(O = getPrototypeOf$5(O));
  }
});

var forOf$4 = _forOf;

var _arrayFromIterable = function(iter, ITERATOR){
  var result = [];
  forOf$4(iter, false, result.push, result, ITERATOR);
  return result;
};

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof$3 = _classof;
var from    = _arrayFromIterable;
var _collectionToJson = function(NAME){
  return function toJSON(){
    if(classof$3(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export$102  = _export;

$export$102($export$102.P + $export$102.R, 'Map', {toJSON: _collectionToJson('Map')});

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export$103  = _export;

$export$103($export$103.P + $export$103.R, 'Set', {toJSON: _collectionToJson('Set')});

// https://github.com/ljharb/proposal-global
var $export$104 = _export;

$export$104($export$104.S, 'System', {global: _global});

// https://github.com/ljharb/proposal-is-error
var $export$105 = _export;
var cof$7     = _cof;

$export$105($export$105.S, 'Error', {
  isError: function isError(it){
    return cof$7(it) === 'Error';
  }
});

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export$106 = _export;

$export$106($export$106.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export$107 = _export;

$export$107($export$107.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export$108 = _export;

$export$108($export$108.S, 'Math', {
  imulh: function imulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >> 16
      , v1 = $v >> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export$109 = _export;

$export$109($export$109.S, 'Math', {
  umulh: function umulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >>> 16
      , v1 = $v >>> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

var Map     = es6_map;
var $export$110 = _export;
var shared$2  = _shared('metadata');
var store$1   = shared$2.store || (shared$2.store = new (es6_weakMap));

var getOrCreateMetadataMap = function(target, targetKey, create){
  var targetMetadata = store$1.get(target);
  if(!targetMetadata){
    if(!create)return undefined;
    store$1.set(target, targetMetadata = new Map);
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if(!keyMetadata){
    if(!create)return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map);
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata$1 = function(MetadataKey, MetadataValue, O, P){
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function(target, targetKey){
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
    , keys        = [];
  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
  return keys;
};
var toMetaKey$1 = function(it){
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp$3 = function(O){
  $export$110($export$110.S, 'Reflect', O);
};

var _metadata = {
  store: store$1,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata$1,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey$1,
  exp: exp$3
};

var metadata                  = _metadata;
var anObject$24                  = _anObject;
var toMetaKey                 = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject$24(target), toMetaKey(targetKey));
}});

var metadata$1               = _metadata;
var anObject$25               = _anObject;
var toMetaKey$2              = metadata$1.key;
var getOrCreateMetadataMap$1 = metadata$1.map;
var store$2                  = metadata$1.store;

metadata$1.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
  var targetKey   = arguments.length < 3 ? undefined : toMetaKey$2(arguments[2])
    , metadataMap = getOrCreateMetadataMap$1(anObject$25(target), targetKey, false);
  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
  if(metadataMap.size)return true;
  var targetMetadata = store$2.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store$2['delete'](target);
}});

var metadata$2               = _metadata;
var anObject$26               = _anObject;
var getPrototypeOf$6         = _objectGpo;
var ordinaryHasOwnMetadata$1 = metadata$2.has;
var ordinaryGetOwnMetadata$1 = metadata$2.get;
var toMetaKey$3              = metadata$2.key;

var ordinaryGetMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata$1(MetadataKey, O, P);
  if(hasOwn)return ordinaryGetOwnMetadata$1(MetadataKey, O, P);
  var parent = getPrototypeOf$6(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata$2.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetMetadata(metadataKey, anObject$26(target), arguments.length < 3 ? undefined : toMetaKey$3(arguments[2]));
}});

var Set                     = es6_set;
var from$1                    = _arrayFromIterable;
var metadata$3                = _metadata;
var anObject$27                = _anObject;
var getPrototypeOf$7          = _objectGpo;
var ordinaryOwnMetadataKeys$1 = metadata$3.keys;
var toMetaKey$4               = metadata$3.key;

var ordinaryMetadataKeys = function(O, P){
  var oKeys  = ordinaryOwnMetadataKeys$1(O, P)
    , parent = getPrototypeOf$7(O);
  if(parent === null)return oKeys;
  var pKeys  = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from$1(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata$3.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
  return ordinaryMetadataKeys(anObject$27(target), arguments.length < 2 ? undefined : toMetaKey$4(arguments[1]));
}});

var metadata$4               = _metadata;
var anObject$28               = _anObject;
var ordinaryGetOwnMetadata$2 = metadata$4.get;
var toMetaKey$5              = metadata$4.key;

metadata$4.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetOwnMetadata$2(metadataKey, anObject$28(target)
    , arguments.length < 3 ? undefined : toMetaKey$5(arguments[2]));
}});

var metadata$5                = _metadata;
var anObject$29                = _anObject;
var ordinaryOwnMetadataKeys$2 = metadata$5.keys;
var toMetaKey$6               = metadata$5.key;

metadata$5.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
  return ordinaryOwnMetadataKeys$2(anObject$29(target), arguments.length < 2 ? undefined : toMetaKey$6(arguments[1]));
}});

var metadata$6               = _metadata;
var anObject$30               = _anObject;
var getPrototypeOf$8         = _objectGpo;
var ordinaryHasOwnMetadata$2 = metadata$6.has;
var toMetaKey$7              = metadata$6.key;

var ordinaryHasMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata$2(MetadataKey, O, P);
  if(hasOwn)return true;
  var parent = getPrototypeOf$8(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata$6.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasMetadata(metadataKey, anObject$30(target), arguments.length < 3 ? undefined : toMetaKey$7(arguments[2]));
}});

var metadata$7               = _metadata;
var anObject$31               = _anObject;
var ordinaryHasOwnMetadata$3 = metadata$7.has;
var toMetaKey$8              = metadata$7.key;

metadata$7.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasOwnMetadata$3(metadataKey, anObject$31(target)
    , arguments.length < 3 ? undefined : toMetaKey$8(arguments[2]));
}});

var metadata$8                  = _metadata;
var anObject$32                  = _anObject;
var aFunction$10                 = _aFunction;
var toMetaKey$9                 = metadata$8.key;
var ordinaryDefineOwnMetadata$2 = metadata$8.set;

metadata$8.exp({metadata: function metadata(metadataKey, metadataValue){
  return function decorator(target, targetKey){
    ordinaryDefineOwnMetadata$2(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject$32 : aFunction$10)(target),
      toMetaKey$9(targetKey)
    );
  };
}});

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export$111   = _export;
var microtask$1 = _microtask();
var process$4   = _global.process;
var isNode$2    = _cof(process$4) == 'process';

$export$111($export$111.G, {
  asap: function asap(fn){
    var domain = isNode$2 && process$4.domain;
    microtask$1(domain ? domain.bind(fn) : fn);
  }
});

// https://github.com/zenparsing/es-observable
var $export$112     = _export;
var global$13      = _global;
var core$3        = _core;
var microtask$2   = _microtask();
var OBSERVABLE  = _wks('observable');
var aFunction$11   = _aFunction;
var anObject$33    = _anObject;
var anInstance$4  = _anInstance;
var redefineAll$3 = _redefineAll;
var hide$4        = _hide;
var forOf$5       = _forOf;
var RETURN      = forOf$5.RETURN;

var getMethod = function(fn){
  return fn == null ? undefined : aFunction$11(fn);
};

var cleanupSubscription = function(subscription){
  var cleanup = subscription._c;
  if(cleanup){
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function(subscription){
  return subscription._o === undefined;
};

var closeSubscription = function(subscription){
  if(!subscriptionClosed(subscription)){
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function(observer, subscriber){
  anObject$33(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup      = subscriber(observer)
      , subscription = cleanup;
    if(cleanup != null){
      if(typeof cleanup.unsubscribe === 'function')cleanup = function(){ subscription.unsubscribe(); };
      else aFunction$11(cleanup);
      this._c = cleanup;
    }
  } catch(e){
    observer.error(e);
    return;
  } if(subscriptionClosed(this))cleanupSubscription(this);
};

Subscription.prototype = redefineAll$3({}, {
  unsubscribe: function unsubscribe(){ closeSubscription(this); }
});

var SubscriptionObserver = function(subscription){
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll$3({}, {
  next: function next(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if(m)return m.call(observer, value);
      } catch(e){
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value){
    var subscription = this._s;
    if(subscriptionClosed(subscription))throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if(!m)throw value;
      value = m.call(observer, value);
    } catch(e){
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch(e){
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber){
  anInstance$4(this, $Observable, 'Observable', '_f')._f = aFunction$11(subscriber);
};

redefineAll$3($Observable.prototype, {
  subscribe: function subscribe(observer){
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn){
    var that = this;
    return new (core$3.Promise || global$13.Promise)(function(resolve, reject){
      aFunction$11(fn);
      var subscription = that.subscribe({
        next : function(value){
          try {
            return fn(value);
          } catch(e){
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll$3($Observable, {
  from: function from(x){
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject$33(x)[OBSERVABLE]);
    if(method){
      var observable = anObject$33(method.call(x));
      return observable.constructor === C ? observable : new C(function(observer){
        return observable.subscribe(observer);
      });
    }
    return new C(function(observer){
      var done = false;
      microtask$2(function(){
        if(!done){
          try {
            if(forOf$5(x, false, function(it){
              observer.next(it);
              if(done)return RETURN;
            }) === RETURN)return;
          } catch(e){
            if(done)throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  },
  of: function of(){
    for(var i = 0, l = arguments.length, items = Array(l); i < l;)items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function(observer){
      var done = false;
      microtask$2(function(){
        if(!done){
          for(var i = 0; i < items.length; ++i){
            observer.next(items[i]);
            if(done)return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  }
});

hide$4($Observable.prototype, OBSERVABLE, function(){ return this; });

$export$112($export$112.G, {Observable: $Observable});

_setSpecies('Observable');

var _path = _global;

var path      = _path;
var invoke$3    = _invoke;
var aFunction$12 = _aFunction;
var _partial = function(/* ...pargs */){
  var fn     = aFunction$12(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that = this
      , aLen = arguments.length
      , j = 0, k = 0, args;
    if(!holder && !aLen)return invoke$3(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
    while(aLen > k)args.push(arguments[k++]);
    return invoke$3(fn, args, that);
  };
};

// ie9- setTimeout & setInterval additional parameters fix
var global$14     = _global;
var $export$113    = _export;
var invoke$2     = _invoke;
var partial    = _partial;
var navigator  = global$14.navigator;
var MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap$1 = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke$2(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export$113($export$113.G + $export$113.B + $export$113.F * MSIE, {
  setTimeout:  wrap$1(global$14.setTimeout),
  setInterval: wrap$1(global$14.setInterval)
});

var $export$114 = _export;
var $task   = _task;
$export$114($export$114.G + $export$114.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});

var $iterators    = es6_array_iterator;
var redefine$6      = _redefine;
var global$15        = _global;
var hide$5          = _hide;
var Iterators$4     = _iterators;
var wks$2           = _wks;
var ITERATOR$4      = wks$2('iterator');
var TO_STRING_TAG = wks$2('toStringTag');
var ArrayValues   = Iterators$4.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i$3 = 0; i$3 < 5; i$3++){
  var NAME$1       = collections[i$3]
    , Collection = global$15[NAME$1]
    , proto$3      = Collection && Collection.prototype
    , key$1;
  if(proto$3){
    if(!proto$3[ITERATOR$4])hide$5(proto$3, ITERATOR$4, ArrayValues);
    if(!proto$3[TO_STRING_TAG])hide$5(proto$3, TO_STRING_TAG, NAME$1);
    Iterators$4[NAME$1] = ArrayValues;
    for(key$1 in $iterators)if(!proto$3[key$1])redefine$6(proto$3, key$1, $iterators[key$1], true);
  }
}

var runtime = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = 'object' === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = arg;

        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof commonjsGlobal === "object" ? commonjsGlobal :
  typeof window === "object" ? window :
  typeof self === "object" ? self : commonjsGlobal
);
});

var _replacer = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};

// https://github.com/benjamingr/RexExp.escape
var $export$115 = _export;
var $re     = _replacer(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export$115($export$115.S, 'RegExp', {escape: function escape(it){ return $re(it); }});

if (commonjsGlobal._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
commonjsGlobal._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});

/**
 * Methods for interpreting Tiled map data into the game
 * intended to extend Phaser.State
 */
var TiledInterpreter = {
  preloadTilemap: function preloadTilemap(name, jsonLocation) {
    var _this = this;

    this.load.onFileComplete.add(function (progress, key) {
      if (key === name) {
        _this.preloadTilemapAssets(name);
      }
    });
    this.load.tilemap(name, jsonLocation, null, Phaser.Tilemap.TILED_JSON);
  },
  preloadTilemapAssets: function preloadTilemapAssets(name) {
    var _this2 = this;

    this.tilemap = this.cache.getTilemapData(name);
    // load tileset images
    this.tilemap.data.tilesets.forEach(function (set) {
      // TODO this is based on the relative paths all being to the assets folder or something
      _this2.load.image(set.name, '/assets/' + set.image.replace(/(\.\.\/)+/, ''));
    });
    // load object sprites
    this.getSpritesFromTilemap(this.tilemap).forEach(function (object) {
      _this2.load.spritesheet(object.properties.sprite, '/assets/' + object.properties.sprite.replace(/(\.\.\/)+/, ''), object.width, object.height);
    });
  },
  getSpritesFromTilemap: function getSpritesFromTilemap(tilemap) {
    var objectsBySpriteMap = tilemap.data.layers.reduce(function (objectsBySprite, layer) {
      if (layer.objects) {
        layer.objects.forEach(function (object) {
          if (object.properties && object.properties.sprite && !objectsBySprite[object.properties.sprite]) {
            objectsBySprite[object.properties.sprite] = object;
          }
        });
      }
      return objectsBySprite;
    }, {});
    return Object.keys(objectsBySpriteMap).map(function (key) {
      return objectsBySpriteMap[key];
    });
  },
  createTilemap: function createTilemap(name) {
    var map = this.game.add.tilemap(name);
    this.tilemap.data.tilesets.forEach(function (set) {
      map.addTilesetImage(set.name, set.name, set.tilewidth, set.tileheight);
    });

    return map;
  },
  initiateTiledObjectGroups: function initiateTiledObjectGroups(map) {
    var _this3 = this;

    // TODO need more data about objects/entities in tiled and corresponding
    // classes in game code to handle this automagically
    // see TiledLevelState.create for manual implementation
    var groups = {};
    var objectsByType = this.arrangeObjectsByType(map.objects);
    Object.keys(objectsByType).forEach(function (type) {
      groups[type] = _this3.game.add.group();
      groups[type].enableBody = true;
      objectsByType[type].forEach(function (item) {
        return _this3.createSpriteFromTiledObject(item, groups[type]);
      });
    });
    return groups;
  },
  arrangeObjectsByType: function arrangeObjectsByType(objects) {
    return objects.reduce(function (objects, object) {
      if (object.type) {
        if (!objects[object.type]) {
          objects[object.type] = [];
        }
        objects[object.type].push(object);
      } else {
        console.warn('object found without type', object.name, object);
      }
      return objects;
    }, {});
  },
  getObjectsFromTilemap: function getObjectsFromTilemap(tilemap) {
    return tilemap.data.layers.reduce(function (objects, layer) {
      if (layer.objects) {
        objects = objects.concat(layer.objects);
      }
      return objects;
    }, []);
  },
  getTilemapObjectsByType: function getTilemapObjectsByType(tilemap) {
    return this.arrangeObjectsByType(this.getObjectsFromTilemap(tilemap));
  },

  /**
   * Creates a Phaser sprite in a sprite group from a Tiled object
   * @param  {object} object The Tiled object
   * @param  {group} group   The Phaser sprite group
   * @return {Sprite}        The Phaser sprite
   */
  createSpriteFromTiledObject: function createSpriteFromTiledObject(object, group) {
    if (!object.properties || !object.properties.sprite) {
      console.error('no sprite defined for object', object);
      return;
    }
    var sprite = group.create(object.x, object.y - object.height, object.properties.sprite);
    sprite.gameData = {
      name: object.name,
      type: object.type
    };
    Object.assign(sprite.gameData, object.properties);
    return sprite;
  }
};

function tellPlayer(data) {
  console.log('📜', data.message);
}

function collect(entity, item) {
  if (!entity.inventory) {
    entity.inventory = [];
  }
  entity.inventory.push(item.gameData);
  tellPlayer({ message: 'You collected the ' + item.gameData.displayName });
  item.destroy();
}

function consume(entity, item) {
  tellPlayer({ message: 'You consumed the ' + item.gameData.displayName });
  item.destroy();
}

function knockDoor(entity, door) {
  if (!door.gameData || !door.gameData.key) {
    console.warn('door ' + door.gameData.name + ' doesn\'t have no damn KEY', door);
    return;
  }

  if (entity.inventory) {
    var item = entity.inventory.find(function (item) {
      return item.type === 'Key' && item.id === door.gameData.key;
    });
    if (item) {
      door.destroy();
      tellPlayer({ message: 'you used the ' + item.displayName + ' key on the door and it opened' });
      return;
    }
  }
  tellPlayer({ message: 'need some key for this door idiot' });
}

function gateCanOpen(gate) {
  return gate.gameData.openDirection === 'north' && gate.body.touching.up || gate.gameData.openDirection === 'south' && gate.body.touching.down || gate.gameData.openDirection === 'west' && gate.body.touching.left || gate.gameData.openDirection === 'east' && gate.body.touching.right;
}

function knockGate(entity, gate) {
  if (!gate.gameData || !gate.gameData.openDirection) {
    console.warn('gate ' + gate.gameData.name + ' ain\'t got no openDirection', gate);
    return;
  }
  if (gateCanOpen(gate)) {
    gate.destroy();
    tellPlayer({ message: 'the gate has a handle on this side, you opened it' });
  } else {
    tellPlayer({ message: 'the gate does not open from this side' });
  }
}

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Extend this instead of Phaser.State to handle a Tiled level
 * @type {Object}
 */

var TiledLevelState = function (_Phaser$State) {
  _inherits$1(TiledLevelState, _Phaser$State);

  function TiledLevelState() {
    _classCallCheck$1(this, TiledLevelState);

    return _possibleConstructorReturn$1(this, (TiledLevelState.__proto__ || Object.getPrototypeOf(TiledLevelState)).apply(this, arguments));
  }

  _createClass$1(TiledLevelState, [{
    key: 'init',
    value: function init(_ref) {
      var mapPath = _ref.mapPath;

      this.tiledLevel = {
        mapPath: mapPath,
        mapName: mapPath
      };

      Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
    }
  }, {
    key: 'preload',
    value: function preload() {
      var _tiledLevel = this.tiledLevel,
          mapName = _tiledLevel.mapName,
          mapPath = _tiledLevel.mapPath;

      this.preloadTilemap(mapName, mapPath, null, Phaser.Tilemap.TILED_JSON);
      this.load.spritesheet('player', '/assets/sprites/dog.gif', 24, 16);
    }
  }, {
    key: 'create',
    value: function create() {
      var _this2 = this;

      var mapName = this.tiledLevel.mapName;

      this.game.stage.backgroundColor = '#000';
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      // have the game centered on screen
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;

      this.map = this.createTilemap(mapName);

      this.tiledLevel.mapLayers = [];
      this.tiledLevel.collideLayers = [];

      this.map.layers.forEach(function (layer) {
        var createdLayer = _this2.map.createLayer(layer.name);
        createdLayer.resizeWorld();
        _this2.tiledLevel.mapLayers.push(createdLayer);
        if (layer.properties.impassable) {
          _this2.tiledLevel.collideLayers.push(createdLayer);
          _this2.map.setCollisionByExclusion([], true, createdLayer);
        }
      });

      var objectsByType = this.getTilemapObjectsByType(this.tilemap);

      if (objectsByType.Consumable) {
        this.tiledLevel.consumables = this.game.add.group();
        this.tiledLevel.consumables.enableBody = true;
        var consumables = objectsByType.Consumable;
        consumables.forEach(function (item) {
          return _this2.createSpriteFromTiledObject(item, _this2.tiledLevel.consumables);
        });
      }

      if (objectsByType.Key) {
        this.tiledLevel.keys = this.game.add.group();
        this.tiledLevel.keys.enableBody = true;
        var keys = objectsByType.Key;
        keys.forEach(function (item) {
          return _this2.createSpriteFromTiledObject(item, _this2.tiledLevel.keys);
        });
      }

      if (objectsByType.Door) {
        this.tiledLevel.doors = this.game.add.group();
        this.tiledLevel.doors.enableBody = true;
        var doors = objectsByType.Door;
        doors.forEach(function (item) {
          var sprite = _this2.createSpriteFromTiledObject(item, _this2.tiledLevel.doors);
          sprite.body.moves = false;
        });
      }

      if (objectsByType.Gate) {
        this.tiledLevel.gates = this.game.add.group();
        this.tiledLevel.gates.enableBody = true;
        var gates = objectsByType.Gate;
        gates.forEach(function (item) {
          var sprite = _this2.createSpriteFromTiledObject(item, _this2.tiledLevel.gates);
          sprite.body.moves = false;
        });
      }

      this.physics.startSystem(Phaser.Physics.ARCADE);

      // add player
      var playerStart = objectsByType.PlayerStart[0];
      this.player = this.add.sprite(playerStart.x, playerStart.y - playerStart.height, 'player');
      this.physics.arcade.enable(this.player);
      this.player.animations.add('walk', [0, 2], 8, true);
      this.player.animations.add('sit', [3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6], 8, true);
      this.player.scale.x = -1;
      this.player.anchor.setTo(0.5, 1);
      this.player.body.setSize(10, 8, 3, 8);
      this.game.camera.follow(this.player);

      this.cursors = this.game.input.keyboard.createCursorKeys();
    }
  }, {
    key: 'update',
    value: function update() {
      var _this3 = this;

      this.tiledLevel.collideLayers.forEach(function (layer) {
        _this3.game.physics.arcade.collide(_this3.player, layer);
      });
      this.game.physics.arcade.overlap(this.player, this.tiledLevel.consumables, consume, null, this);
      this.game.physics.arcade.overlap(this.player, this.tiledLevel.keys, collect, null, this);
      this.game.physics.arcade.collide(this.player, this.tiledLevel.doors, knockDoor, null, this);
      this.game.physics.arcade.collide(this.player, this.tiledLevel.gates, knockGate, null, this);
      //  Reset the this.players velocity (movement)
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;

      var direction = '';
      switch (true) {
        case this.cursors.left.isDown:
          direction += 'left';
          this.player.body.velocity.x = -50;
          this.player.scale.x = 1;
          break;
        case this.cursors.right.isDown:
          direction += 'right';
          this.player.body.velocity.x = 50;
          this.player.scale.x = -1;
          break;
      }

      switch (true) {
        case this.cursors.up.isDown:
          direction += 'up';
          this.player.body.velocity.y = -50;
          break;
        case this.cursors.down.isDown:
          direction += 'down';
          this.player.body.velocity.y = 50;
          break;
      }

      if (direction) {
        this.player.animations.play('walk');
      } else {
        this.player.animations.play('sit');
      }
    }
  }]);

  return TiledLevelState;
}(Phaser.State);

Object.assign(TiledLevelState.prototype, TiledInterpreter);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var State = function (_TiledLevelState) {
  _inherits(State, _TiledLevelState);

  function State() {
    _classCallCheck(this, State);

    return _possibleConstructorReturn(this, (State.__proto__ || Object.getPrototypeOf(State)).apply(this, arguments));
  }

  _createClass(State, [{
    key: 'init',
    value: function init() {
      var map = window.location.search.match(/map=([^&]+)/);
      if (!map) {
        console.error('Can\'t load map from url path: ' + window.location.href + '. Looking for ?map=mapFolder/mapJson.json');
      }
      var mapPath = '/assets/maps/' + map[1];
      console.log('Loading map ' + mapPath);
      _get(State.prototype.__proto__ || Object.getPrototypeOf(State.prototype), 'init', this).call(this, { mapPath: mapPath });
    }
  }, {
    key: 'preload',
    value: function preload() {
      _get(State.prototype.__proto__ || Object.getPrototypeOf(State.prototype), 'preload', this).call(this);
    }
  }, {
    key: 'create',
    value: function create() {
      _get(State.prototype.__proto__ || Object.getPrototypeOf(State.prototype), 'create', this).call(this);
    }
  }, {
    key: 'update',
    value: function update() {
      _get(State.prototype.__proto__ || Object.getPrototypeOf(State.prototype), 'update', this).call(this);
    }
  }]);

  return State;
}(TiledLevelState);

var transparent = false;
var antialias = false;
var game = new Phaser.Game(320, 240, Phaser.AUTO, '', window, transparent, antialias);

game.state.add('levelTester', State, true);

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19nbG9iYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19oYXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mYWlscy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29yZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1kcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19oaWRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdWlkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcmVkZWZpbmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY3R4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZXhwb3J0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fbWV0YS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NoYXJlZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3drcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fd2tzLWV4dC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2xpYnJhcnkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL193a3MtZGVmaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RlZmluZWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWxlbmd0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWluZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19rZXlvZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2VudW0ta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lzLWFycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2h0bWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtY3JlYXRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdvcG4uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN5bWJvbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0aWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LXNhcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LW5hbWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmZyZWV6ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5zZWFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnByZXZlbnQtZXh0ZW5zaW9ucy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5pcy1mcm96ZW4uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuaXMtc2VhbGVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmlzLWV4dGVuc2libGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NhbWUtdmFsdWUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuaXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zZXQtcHJvdG8uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NsYXNzb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faW52b2tlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYmluZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmZ1bmN0aW9uLmJpbmQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5mdW5jdGlvbi5uYW1lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuZnVuY3Rpb24uaGFzLWluc3RhbmNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaW5nLXdzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaW5nLXRyaW0uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19wYXJzZS1pbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5wYXJzZS1pbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19wYXJzZS1mbG9hdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnBhcnNlLWZsb2F0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faW5oZXJpdC1pZi1yZXF1aXJlZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5jb25zdHJ1Y3Rvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2EtbnVtYmVyLXZhbHVlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaW5nLXJlcGVhdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci50by1maXhlZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci50by1wcmVjaXNpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIuZXBzaWxvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5pcy1maW5pdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pcy1pbnRlZ2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLmlzLWludGVnZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIuaXMtbmFuLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLmlzLXNhZmUtaW50ZWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5tYXgtc2FmZS1pbnRlZ2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLm1pbi1zYWZlLWludGVnZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIucGFyc2UtZmxvYXQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIucGFyc2UtaW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fbWF0aC1sb2cxcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguYWNvc2guanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmFzaW5oLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5hdGFuaC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX21hdGgtc2lnbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguY2JydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguY2x6MzIuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmNvc2guanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19tYXRoLWV4cG0xLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5leHBtMS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguZnJvdW5kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5oeXBvdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguaW11bC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGgubG9nMTAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmxvZzFwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5sb2cyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5zaWduLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5zaW5oLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC50YW5oLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC50cnVuYy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5mcm9tLWNvZGUtcG9pbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcucmF3LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnRyaW0uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zdHJpbmctYXQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyYXRvcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmNvZGUtcG9pbnQtYXQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pcy1yZWdleHAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zdHJpbmctY29udGV4dC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2ZhaWxzLWlzLXJlZ2V4cC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5lbmRzLXdpdGguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuaW5jbHVkZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcucmVwZWF0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnN0YXJ0cy13aXRoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaW5nLWh0bWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuYW5jaG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmJpZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5ibGluay5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5ib2xkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmZpeGVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmZvbnRjb2xvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5mb250c2l6ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5pdGFsaWNzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmxpbmsuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuc21hbGwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuc3RyaWtlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnN1Yi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5zdXAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5kYXRlLm5vdy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmRhdGUudG8tanNvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmRhdGUudG8taXNvLXN0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmRhdGUudG8tc3RyaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZGF0ZS10by1wcmltaXRpdmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5kYXRlLnRvLXByaW1pdGl2ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmlzLWFycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlci1jYWxsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXMtYXJyYXktaXRlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NyZWF0ZS1wcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlci1kZXRlY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5mcm9tLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkub2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zdHJpY3QtbWV0aG9kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuam9pbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LnNsaWNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuc29ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LXNwZWNpZXMtY29uc3RydWN0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNyZWF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LW1ldGhvZHMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5mb3ItZWFjaC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5Lm1hcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZpbHRlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LnNvbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5ldmVyeS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LXJlZHVjZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LnJlZHVjZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LnJlZHVjZS1yaWdodC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmluZGV4LW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkubGFzdC1pbmRleC1vZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LWNvcHktd2l0aGluLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuY29weS13aXRoaW4uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hcnJheS1maWxsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZmlsbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZpbmQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5maW5kLWluZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5zcGVjaWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlci1zdGVwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mbGFncy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZ2V4cC5jb25zdHJ1Y3Rvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZ2V4cC5mbGFncy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZ2V4cC50by1zdHJpbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19maXgtcmUtd2tzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLm1hdGNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLnJlcGxhY2UuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAuc2VhcmNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLnNwbGl0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYW4taW5zdGFuY2UuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mb3Itb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdGFzay5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX21pY3JvdGFzay5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnByb21pc2UuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jb2xsZWN0aW9uLXN0cm9uZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvbGxlY3Rpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zZXQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jb2xsZWN0aW9uLXdlYWsuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi53ZWFrLW1hcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LndlYWstc2V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdHlwZWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190eXBlZC1idWZmZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi50eXBlZC5hcnJheS1idWZmZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi50eXBlZC5kYXRhLXZpZXcuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190eXBlZC1hcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLmludDgtYXJyYXkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi50eXBlZC51aW50OC1hcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLnVpbnQ4LWNsYW1wZWQtYXJyYXkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi50eXBlZC5pbnQxNi1hcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLnVpbnQxNi1hcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLmludDMyLWFycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYudHlwZWQudWludDMyLWFycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYudHlwZWQuZmxvYXQzMi1hcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLmZsb2F0NjQtYXJyYXkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LmFwcGx5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5jb25zdHJ1Y3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuZGVsZXRlLXByb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5lbnVtZXJhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LmdldC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5nZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5oYXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LmlzLWV4dGVuc2libGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vd24ta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3Qub3duLWtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LnByZXZlbnQtZXh0ZW5zaW9ucy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3Quc2V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5zZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuYXJyYXkuaW5jbHVkZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zdHJpbmcuYXQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zdHJpbmctcGFkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc3RyaW5nLnBhZC1zdGFydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnN0cmluZy5wYWQtZW5kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc3RyaW5nLnRyaW0tbGVmdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnN0cmluZy50cmltLXJpZ2h0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc3RyaW5nLm1hdGNoLWFsbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcub2JqZWN0LmdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtdG8tYXJyYXkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QudmFsdWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcub2JqZWN0LmVudHJpZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZm9yY2VkLXBhbS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3Lm9iamVjdC5kZWZpbmUtZ2V0dGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcub2JqZWN0LmRlZmluZS1zZXR0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QubG9va3VwLWdldHRlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3Lm9iamVjdC5sb29rdXAtc2V0dGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYXJyYXktZnJvbS1pdGVyYWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvbGxlY3Rpb24tdG8tanNvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3Lm1hcC50by1qc29uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc2V0LnRvLWpzb24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zeXN0ZW0uZ2xvYmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuZXJyb3IuaXMtZXJyb3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5tYXRoLmlhZGRoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcubWF0aC5pc3ViaC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3Lm1hdGguaW11bGguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5tYXRoLnVtdWxoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fbWV0YWRhdGEuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5yZWZsZWN0LmRlZmluZS1tZXRhZGF0YS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnJlZmxlY3QuZGVsZXRlLW1ldGFkYXRhLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcucmVmbGVjdC5nZXQtbWV0YWRhdGEuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5yZWZsZWN0LmdldC1tZXRhZGF0YS1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcucmVmbGVjdC5nZXQtb3duLW1ldGFkYXRhLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcucmVmbGVjdC5nZXQtb3duLW1ldGFkYXRhLWtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5yZWZsZWN0Lmhhcy1tZXRhZGF0YS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnJlZmxlY3QuaGFzLW93bi1tZXRhZGF0YS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnJlZmxlY3QubWV0YWRhdGEuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5hc2FwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcub2JzZXJ2YWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3BhdGguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19wYXJ0aWFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIudGltZXJzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuaW1tZWRpYXRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3JlcGxhY2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9jb3JlLnJlZ2V4cC5lc2NhcGUuanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbGliL2luZGV4LmpzIiwic2NyaXB0cy9lbmdpbmUvVGlsZWRJbnRlcnByZXRlci5qcyIsInNjcmlwdHMvZW5naW5lL2ludGVyYWN0aW9ucy5qcyIsInNjcmlwdHMvZW5naW5lL1RpbGVkTGV2ZWxTdGF0ZS5qcyIsInNjcmlwdHMvbGV2ZWxUZXN0ZXIvc3RhdGUuanMiLCJzY3JpcHRzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTsiLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTsiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcyLjQuMCd9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59OyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59OyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pOyIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIFMpe1xuICBpZighaXNPYmplY3QoaXQpKXJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZighUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59OyIsInZhciBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGRQICAgICAgICAgICAgID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyl7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZignZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKU9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59OyIsInZhciBkUCAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTsiLCJ2YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTsiLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBoYXMgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIFNSQyAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpKCdzcmMnKVxuICAsIFRPX1NUUklORyA9ICd0b1N0cmluZydcbiAgLCAkdG9TdHJpbmcgPSBGdW5jdGlvbltUT19TVFJJTkddXG4gICwgVFBMICAgICAgID0gKCcnICsgJHRvU3RyaW5nKS5zcGxpdChUT19TVFJJTkcpO1xuXG5yZXF1aXJlKCcuL19jb3JlJykuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuICR0b1N0cmluZy5jYWxsKGl0KTtcbn07XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE8sIGtleSwgdmFsLCBzYWZlKXtcbiAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2YgdmFsID09ICdmdW5jdGlvbic7XG4gIGlmKGlzRnVuY3Rpb24paGFzKHZhbCwgJ25hbWUnKSB8fCBoaWRlKHZhbCwgJ25hbWUnLCBrZXkpO1xuICBpZihPW2tleV0gPT09IHZhbClyZXR1cm47XG4gIGlmKGlzRnVuY3Rpb24paGFzKHZhbCwgU1JDKSB8fCBoaWRlKHZhbCwgU1JDLCBPW2tleV0gPyAnJyArIE9ba2V5XSA6IFRQTC5qb2luKFN0cmluZyhrZXkpKSk7XG4gIGlmKE8gPT09IGdsb2JhbCl7XG4gICAgT1trZXldID0gdmFsO1xuICB9IGVsc2Uge1xuICAgIGlmKCFzYWZlKXtcbiAgICAgIGRlbGV0ZSBPW2tleV07XG4gICAgICBoaWRlKE8sIGtleSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoT1trZXldKU9ba2V5XSA9IHZhbDtcbiAgICAgIGVsc2UgaGlkZShPLCBrZXksIHZhbCk7XG4gICAgfVxuICB9XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICByZXR1cm4gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyAmJiB0aGlzW1NSQ10gfHwgJHRvU3RyaW5nLmNhbGwodGhpcyk7XG59KTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTsiLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCB0aGF0LCBsZW5ndGgpe1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZih0aGF0ID09PSB1bmRlZmluZWQpcmV0dXJuIGZuO1xuICBzd2l0Y2gobGVuZ3RoKXtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbihhKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24oYSwgYil7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59OyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGhpZGUgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIHJlZGVmaW5lICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBjdHggICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GXG4gICAgLCBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HXG4gICAgLCBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TXG4gICAgLCBJU19QUk9UTyAgPSB0eXBlICYgJGV4cG9ydC5QXG4gICAgLCBJU19CSU5EICAgPSB0eXBlICYgJGV4cG9ydC5CXG4gICAgLCB0YXJnZXQgICAgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gfHwgKGdsb2JhbFtuYW1lXSA9IHt9KSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG4gICAgLCBleHBQcm90byAgPSBleHBvcnRzW1BST1RPVFlQRV0gfHwgKGV4cG9ydHNbUFJPVE9UWVBFXSA9IHt9KVxuICAgICwga2V5LCBvd24sIG91dCwgZXhwO1xuICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSAob3duID8gdGFyZ2V0IDogc291cmNlKVtrZXldO1xuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgZXhwID0gSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXh0ZW5kIGdsb2JhbFxuICAgIGlmKHRhcmdldClyZWRlZmluZSh0YXJnZXQsIGtleSwgb3V0LCB0eXBlICYgJGV4cG9ydC5VKTtcbiAgICAvLyBleHBvcnRcbiAgICBpZihleHBvcnRzW2tleV0gIT0gb3V0KWhpZGUoZXhwb3J0cywga2V5LCBleHApO1xuICAgIGlmKElTX1BST1RPICYmIGV4cFByb3RvW2tleV0gIT0gb3V0KWV4cFByb3RvW2tleV0gPSBvdXQ7XG4gIH1cbn07XG5nbG9iYWwuY29yZSA9IGNvcmU7XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgIFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0OyIsInZhciBNRVRBICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpKCdtZXRhJylcbiAgLCBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgaGFzICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHNldERlc2MgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGlkICAgICAgID0gMDtcbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB0cnVlO1xufTtcbnZhciBGUkVFWkUgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uKGl0KXtcbiAgc2V0RGVzYyhpdCwgTUVUQSwge3ZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfX0pO1xufTtcbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24oaXQsIGNyZWF0ZSl7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBvYmplY3QgSURcbiAgfSByZXR1cm4gaXRbTUVUQV0uaTtcbn07XG52YXIgZ2V0V2VhayA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmKCFjcmVhdGUpcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBoYXNoIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFdLnc7XG59O1xuLy8gYWRkIG1ldGFkYXRhIG9uIGZyZWV6ZS1mYW1pbHkgbWV0aG9kcyBjYWxsaW5nXG52YXIgb25GcmVlemUgPSBmdW5jdGlvbihpdCl7XG4gIGlmKEZSRUVaRSAmJiBtZXRhLk5FRUQgJiYgaXNFeHRlbnNpYmxlKGl0KSAmJiAhaGFzKGl0LCBNRVRBKSlzZXRNZXRhKGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIEtFWTogICAgICBNRVRBLFxuICBORUVEOiAgICAgZmFsc2UsXG4gIGZhc3RLZXk6ICBmYXN0S2V5LFxuICBnZXRXZWFrOiAgZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59OyIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07IiwidmFyIHN0b3JlICAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnd2tzJylcbiAgLCB1aWQgICAgICAgID0gcmVxdWlyZSgnLi9fdWlkJylcbiAgLCBTeW1ib2wgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sXG4gICwgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7IiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBoYXMgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCB0YWcsIHN0YXQpe1xuICBpZihpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKWRlZihpdCwgVEFHLCB7Y29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnfSk7XG59OyIsImV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX3drcycpOyIsIm1vZHVsZS5leHBvcnRzID0gZmFsc2U7IiwidmFyIGdsb2JhbCAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIExJQlJBUlkgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICwgd2tzRXh0ICAgICAgICAgPSByZXF1aXJlKCcuL193a3MtZXh0JylcbiAgLCBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICB2YXIgJFN5bWJvbCA9IGNvcmUuU3ltYm9sIHx8IChjb3JlLlN5bWJvbCA9IExJQlJBUlkgPyB7fSA6IGdsb2JhbC5TeW1ib2wgfHwge30pO1xuICBpZihuYW1lLmNoYXJBdCgwKSAhPSAnXycgJiYgIShuYW1lIGluICRTeW1ib2wpKWRlZmluZVByb3BlcnR5KCRTeW1ib2wsIG5hbWUsIHt2YWx1ZTogd2tzRXh0LmYobmFtZSl9KTtcbn07IiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTsiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTsiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTsiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07IiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1heCAgICAgICA9IE1hdGgubWF4XG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTsiLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgdG9JbmRleCAgID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oSVNfSU5DTFVERVMpe1xuICByZXR1cm4gZnVuY3Rpb24oJHRoaXMsIGVsLCBmcm9tSW5kZXgpe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QoJHRoaXMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSB0b0luZGV4KGZyb21JbmRleCwgbGVuZ3RoKVxuICAgICAgLCB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgaWYoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpd2hpbGUobGVuZ3RoID4gaW5kZXgpe1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgaWYodmFsdWUgIT0gdmFsdWUpcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjdG9JbmRleCBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pe1xuICAgICAgaWYoT1tpbmRleF0gPT09IGVsKXJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07IiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJylcbiAgLCB1aWQgICAgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07IiwidmFyIGhhcyAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgdG9JT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSlcbiAgLCBJRV9QUk9UTyAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBuYW1lcyl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwgaSAgICAgID0gMFxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGtleTtcbiAgZm9yKGtleSBpbiBPKWlmKGtleSAhPSBJRV9QUk9UTyloYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKXtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59OyIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpOyIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKVxuICAsIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTyl7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59OyIsInZhciBnZXRLZXlzICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIGVsKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBrZXlzICAgPSBnZXRLZXlzKE8pXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaW5kZXggID0gMFxuICAgICwga2V5O1xuICB3aGlsZShsZW5ndGggPiBpbmRleClpZihPW2tleSA9IGtleXNbaW5kZXgrK11dID09PSBlbClyZXR1cm4ga2V5O1xufTsiLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzOyIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlOyIsIi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKVxuICAsIHBJRSAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIHJlc3VsdCAgICAgPSBnZXRLZXlzKGl0KVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgaWYoZ2V0U3ltYm9scyl7XG4gICAgdmFyIHN5bWJvbHMgPSBnZXRTeW1ib2xzKGl0KVxuICAgICAgLCBpc0VudW0gID0gcElFLmZcbiAgICAgICwgaSAgICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKHN5bWJvbHMubGVuZ3RoID4gaSlpZihpc0VudW0uY2FsbChpdCwga2V5ID0gc3ltYm9sc1tpKytdKSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59OyIsIi8vIDcuMi4yIElzQXJyYXkoYXJndW1lbnQpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheShhcmcpe1xuICByZXR1cm4gY29mKGFyZykgPT0gJ0FycmF5Jztcbn07IiwidmFyIGRQICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZ2V0S2V5cyAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcyl7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyAgID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGkgPSAwXG4gICAgLCBQO1xuICB3aGlsZShsZW5ndGggPiBpKWRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDsiLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZFBzICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJylcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKVxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXG4gICwgRW1wdHkgICAgICAgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9XG4gICwgUFJPVE9UWVBFICAgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbigpe1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKVxuICAgICwgaSAgICAgID0gZW51bUJ1Z0tleXMubGVuZ3RoXG4gICAgLCBsdCAgICAgPSAnPCdcbiAgICAsIGd0ICAgICA9ICc+J1xuICAgICwgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUoaS0tKWRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKXtcbiAgdmFyIHJlc3VsdDtcbiAgaWYoTyAhPT0gbnVsbCl7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG4iLCIvLyAxOS4xLjIuNyAvIDE1LjIuMy40IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG52YXIgJGtleXMgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJylcbiAgLCBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pe1xuICByZXR1cm4gJGtleXMoTywgaGlkZGVuS2V5cyk7XG59OyIsIi8vIGZhbGxiYWNrIGZvciBJRTExIGJ1Z2d5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHdpdGggaWZyYW1lIGFuZCB3aW5kb3dcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBnT1BOICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmZcbiAgLCB0b1N0cmluZyAgPSB7fS50b1N0cmluZztcblxudmFyIHdpbmRvd05hbWVzID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNcbiAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh3aW5kb3cpIDogW107XG5cbnZhciBnZXRXaW5kb3dOYW1lcyA9IGZ1bmN0aW9uKGl0KXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZ09QTihpdCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHdpbmRvd05hbWVzLnNsaWNlKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgcmV0dXJuIHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nID8gZ2V0V2luZG93TmFtZXMoaXQpIDogZ09QTih0b0lPYmplY3QoaXQpKTtcbn07XG4iLCJ2YXIgcElFICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJylcbiAgLCBjcmVhdGVEZXNjICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIHRvSU9iamVjdCAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCBnT1BEICAgICAgICAgICA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBnT1BEIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApe1xuICBPID0gdG9JT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGdPUEQoTywgUCk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoaGFzKE8sIFApKXJldHVybiBjcmVhdGVEZXNjKCFwSUUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLy8gRUNNQVNjcmlwdCA2IHN5bWJvbHMgc2hpbVxudmFyIGdsb2JhbCAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgREVTQ1JJUFRPUlMgICAgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIE1FVEEgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpLktFWVxuICAsICRmYWlscyAgICAgICAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAsIHNoYXJlZCAgICAgICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCB1aWQgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpXG4gICwgd2tzICAgICAgICAgICAgPSByZXF1aXJlKCcuL193a3MnKVxuICAsIHdrc0V4dCAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpXG4gICwgd2tzRGVmaW5lICAgICAgPSByZXF1aXJlKCcuL193a3MtZGVmaW5lJylcbiAgLCBrZXlPZiAgICAgICAgICA9IHJlcXVpcmUoJy4vX2tleW9mJylcbiAgLCBlbnVtS2V5cyAgICAgICA9IHJlcXVpcmUoJy4vX2VudW0ta2V5cycpXG4gICwgaXNBcnJheSAgICAgICAgPSByZXF1aXJlKCcuL19pcy1hcnJheScpXG4gICwgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvSU9iamVjdCAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGNyZWF0ZURlc2MgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgX2NyZWF0ZSAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJylcbiAgLCBnT1BORXh0ICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuLWV4dCcpXG4gICwgJEdPUEQgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpXG4gICwgJERQICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsICRrZXlzICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIGdPUEQgICAgICAgICAgID0gJEdPUEQuZlxuICAsIGRQICAgICAgICAgICAgID0gJERQLmZcbiAgLCBnT1BOICAgICAgICAgICA9IGdPUE5FeHQuZlxuICAsICRTeW1ib2wgICAgICAgID0gZ2xvYmFsLlN5bWJvbFxuICAsICRKU09OICAgICAgICAgID0gZ2xvYmFsLkpTT05cbiAgLCBfc3RyaW5naWZ5ICAgICA9ICRKU09OICYmICRKU09OLnN0cmluZ2lmeVxuICAsIFBST1RPVFlQRSAgICAgID0gJ3Byb3RvdHlwZSdcbiAgLCBISURERU4gICAgICAgICA9IHdrcygnX2hpZGRlbicpXG4gICwgVE9fUFJJTUlUSVZFICAgPSB3a3MoJ3RvUHJpbWl0aXZlJylcbiAgLCBpc0VudW0gICAgICAgICA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlXG4gICwgU3ltYm9sUmVnaXN0cnkgPSBzaGFyZWQoJ3N5bWJvbC1yZWdpc3RyeScpXG4gICwgQWxsU3ltYm9scyAgICAgPSBzaGFyZWQoJ3N5bWJvbHMnKVxuICAsIE9QU3ltYm9scyAgICAgID0gc2hhcmVkKCdvcC1zeW1ib2xzJylcbiAgLCBPYmplY3RQcm90byAgICA9IE9iamVjdFtQUk9UT1RZUEVdXG4gICwgVVNFX05BVElWRSAgICAgPSB0eXBlb2YgJFN5bWJvbCA9PSAnZnVuY3Rpb24nXG4gICwgUU9iamVjdCAgICAgICAgPSBnbG9iYWwuUU9iamVjdDtcbi8vIERvbid0IHVzZSBzZXR0ZXJzIGluIFF0IFNjcmlwdCwgaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzE3M1xudmFyIHNldHRlciA9ICFRT2JqZWN0IHx8ICFRT2JqZWN0W1BST1RPVFlQRV0gfHwgIVFPYmplY3RbUFJPVE9UWVBFXS5maW5kQ2hpbGQ7XG5cbi8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZCwgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTY4N1xudmFyIHNldFN5bWJvbERlc2MgPSBERVNDUklQVE9SUyAmJiAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIF9jcmVhdGUoZFAoe30sICdhJywge1xuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIGRQKHRoaXMsICdhJywge3ZhbHVlOiA3fSkuYTsgfVxuICB9KSkuYSAhPSA3O1xufSkgPyBmdW5jdGlvbihpdCwga2V5LCBEKXtcbiAgdmFyIHByb3RvRGVzYyA9IGdPUEQoT2JqZWN0UHJvdG8sIGtleSk7XG4gIGlmKHByb3RvRGVzYylkZWxldGUgT2JqZWN0UHJvdG9ba2V5XTtcbiAgZFAoaXQsIGtleSwgRCk7XG4gIGlmKHByb3RvRGVzYyAmJiBpdCAhPT0gT2JqZWN0UHJvdG8pZFAoT2JqZWN0UHJvdG8sIGtleSwgcHJvdG9EZXNjKTtcbn0gOiBkUDtcblxudmFyIHdyYXAgPSBmdW5jdGlvbih0YWcpe1xuICB2YXIgc3ltID0gQWxsU3ltYm9sc1t0YWddID0gX2NyZWF0ZSgkU3ltYm9sW1BST1RPVFlQRV0pO1xuICBzeW0uX2sgPSB0YWc7XG4gIHJldHVybiBzeW07XG59O1xuXG52YXIgaXNTeW1ib2wgPSBVU0VfTkFUSVZFICYmIHR5cGVvZiAkU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnID8gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0IGluc3RhbmNlb2YgJFN5bWJvbDtcbn07XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBEKXtcbiAgaWYoaXQgPT09IE9iamVjdFByb3RvKSRkZWZpbmVQcm9wZXJ0eShPUFN5bWJvbHMsIGtleSwgRCk7XG4gIGFuT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgYW5PYmplY3QoRCk7XG4gIGlmKGhhcyhBbGxTeW1ib2xzLCBrZXkpKXtcbiAgICBpZighRC5lbnVtZXJhYmxlKXtcbiAgICAgIGlmKCFoYXMoaXQsIEhJRERFTikpZFAoaXQsIEhJRERFTiwgY3JlYXRlRGVzYygxLCB7fSkpO1xuICAgICAgaXRbSElEREVOXVtrZXldID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSlpdFtISURERU5dW2tleV0gPSBmYWxzZTtcbiAgICAgIEQgPSBfY3JlYXRlKEQsIHtlbnVtZXJhYmxlOiBjcmVhdGVEZXNjKDAsIGZhbHNlKX0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2MoaXQsIGtleSwgRCk7XG4gIH0gcmV0dXJuIGRQKGl0LCBrZXksIEQpO1xufTtcbnZhciAkZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoaXQsIFApe1xuICBhbk9iamVjdChpdCk7XG4gIHZhciBrZXlzID0gZW51bUtleXMoUCA9IHRvSU9iamVjdChQKSlcbiAgICAsIGkgICAgPSAwXG4gICAgLCBsID0ga2V5cy5sZW5ndGhcbiAgICAsIGtleTtcbiAgd2hpbGUobCA+IGkpJGRlZmluZVByb3BlcnR5KGl0LCBrZXkgPSBrZXlzW2krK10sIFBba2V5XSk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgJGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpdCwgUCl7XG4gIHJldHVybiBQID09PSB1bmRlZmluZWQgPyBfY3JlYXRlKGl0KSA6ICRkZWZpbmVQcm9wZXJ0aWVzKF9jcmVhdGUoaXQpLCBQKTtcbn07XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoa2V5KXtcbiAgdmFyIEUgPSBpc0VudW0uY2FsbCh0aGlzLCBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpKTtcbiAgaWYodGhpcyA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gRSB8fCAhaGFzKHRoaXMsIGtleSkgfHwgIWhhcyhBbGxTeW1ib2xzLCBrZXkpIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtrZXldID8gRSA6IHRydWU7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XG4gIGl0ICA9IHRvSU9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGlmKGl0ID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSlyZXR1cm47XG4gIHZhciBEID0gZ09QRChpdCwga2V5KTtcbiAgaWYoRCAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pKUQuZW51bWVyYWJsZSA9IHRydWU7XG4gIHJldHVybiBEO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpe1xuICB2YXIgbmFtZXMgID0gZ09QTih0b0lPYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSl7XG4gICAgaWYoIWhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiBrZXkgIT0gSElEREVOICYmIGtleSAhPSBNRVRBKXJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgJGdldE93blByb3BlcnR5U3ltYm9scyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhpdCl7XG4gIHZhciBJU19PUCAgPSBpdCA9PT0gT2JqZWN0UHJvdG9cbiAgICAsIG5hbWVzICA9IGdPUE4oSVNfT1AgPyBPUFN5bWJvbHMgOiB0b0lPYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSl7XG4gICAgaWYoaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIChJU19PUCA/IGhhcyhPYmplY3RQcm90bywga2V5KSA6IHRydWUpKXJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vIDE5LjQuMS4xIFN5bWJvbChbZGVzY3JpcHRpb25dKVxuaWYoIVVTRV9OQVRJVkUpe1xuICAkU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKCl7XG4gICAgaWYodGhpcyBpbnN0YW5jZW9mICRTeW1ib2wpdGhyb3cgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3IhJyk7XG4gICAgdmFyIHRhZyA9IHVpZChhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7XG4gICAgdmFyICRzZXQgPSBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBpZih0aGlzID09PSBPYmplY3RQcm90bykkc2V0LmNhbGwoT1BTeW1ib2xzLCB2YWx1ZSk7XG4gICAgICBpZihoYXModGhpcywgSElEREVOKSAmJiBoYXModGhpc1tISURERU5dLCB0YWcpKXRoaXNbSElEREVOXVt0YWddID0gZmFsc2U7XG4gICAgICBzZXRTeW1ib2xEZXNjKHRoaXMsIHRhZywgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xuICAgIH07XG4gICAgaWYoREVTQ1JJUFRPUlMgJiYgc2V0dGVyKXNldFN5bWJvbERlc2MoT2JqZWN0UHJvdG8sIHRhZywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgc2V0OiAkc2V0fSk7XG4gICAgcmV0dXJuIHdyYXAodGFnKTtcbiAgfTtcbiAgcmVkZWZpbmUoJFN5bWJvbFtQUk9UT1RZUEVdLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICAgIHJldHVybiB0aGlzLl9rO1xuICB9KTtcblxuICAkR09QRC5mID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgJERQLmYgICA9ICRkZWZpbmVQcm9wZXJ0eTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mID0gZ09QTkV4dC5mID0gJGdldE93blByb3BlcnR5TmFtZXM7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1waWUnKS5mICA9ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKS5mID0gJGdldE93blByb3BlcnR5U3ltYm9scztcblxuICBpZihERVNDUklQVE9SUyAmJiAhcmVxdWlyZSgnLi9fbGlicmFyeScpKXtcbiAgICByZWRlZmluZShPYmplY3RQcm90bywgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJHByb3BlcnR5SXNFbnVtZXJhYmxlLCB0cnVlKTtcbiAgfVxuXG4gIHdrc0V4dC5mID0gZnVuY3Rpb24obmFtZSl7XG4gICAgcmV0dXJuIHdyYXAod2tzKG5hbWUpKTtcbiAgfVxufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7U3ltYm9sOiAkU3ltYm9sfSk7XG5cbmZvcih2YXIgc3ltYm9scyA9IChcbiAgLy8gMTkuNC4yLjIsIDE5LjQuMi4zLCAxOS40LjIuNCwgMTkuNC4yLjYsIDE5LjQuMi44LCAxOS40LjIuOSwgMTkuNC4yLjEwLCAxOS40LjIuMTEsIDE5LjQuMi4xMiwgMTkuNC4yLjEzLCAxOS40LjIuMTRcbiAgJ2hhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCxzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzJ1xuKS5zcGxpdCgnLCcpLCBpID0gMDsgc3ltYm9scy5sZW5ndGggPiBpOyApd2tzKHN5bWJvbHNbaSsrXSk7XG5cbmZvcih2YXIgc3ltYm9scyA9ICRrZXlzKHdrcy5zdG9yZSksIGkgPSAwOyBzeW1ib2xzLmxlbmd0aCA+IGk7ICl3a3NEZWZpbmUoc3ltYm9sc1tpKytdKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ1N5bWJvbCcsIHtcbiAgLy8gMTkuNC4yLjEgU3ltYm9sLmZvcihrZXkpXG4gICdmb3InOiBmdW5jdGlvbihrZXkpe1xuICAgIHJldHVybiBoYXMoU3ltYm9sUmVnaXN0cnksIGtleSArPSAnJylcbiAgICAgID8gU3ltYm9sUmVnaXN0cnlba2V5XVxuICAgICAgOiBTeW1ib2xSZWdpc3RyeVtrZXldID0gJFN5bWJvbChrZXkpO1xuICB9LFxuICAvLyAxOS40LjIuNSBTeW1ib2wua2V5Rm9yKHN5bSlcbiAga2V5Rm9yOiBmdW5jdGlvbiBrZXlGb3Ioa2V5KXtcbiAgICBpZihpc1N5bWJvbChrZXkpKXJldHVybiBrZXlPZihTeW1ib2xSZWdpc3RyeSwga2V5KTtcbiAgICB0aHJvdyBUeXBlRXJyb3Ioa2V5ICsgJyBpcyBub3QgYSBzeW1ib2whJyk7XG4gIH0sXG4gIHVzZVNldHRlcjogZnVuY3Rpb24oKXsgc2V0dGVyID0gdHJ1ZTsgfSxcbiAgdXNlU2ltcGxlOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSBmYWxzZTsgfVxufSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdPYmplY3QnLCB7XG4gIC8vIDE5LjEuMi4yIE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiAgY3JlYXRlOiAkY3JlYXRlLFxuICAvLyAxOS4xLjIuNCBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgLy8gMTkuMS4yLjMgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcylcbiAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gIC8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAvLyAxOS4xLjIuNyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgLy8gMTkuMS4yLjggT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhPKVxuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHNcbn0pO1xuXG4vLyAyNC4zLjIgSlNPTi5zdHJpbmdpZnkodmFsdWUgWywgcmVwbGFjZXIgWywgc3BhY2VdXSlcbiRKU09OICYmICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKCFVU0VfTkFUSVZFIHx8ICRmYWlscyhmdW5jdGlvbigpe1xuICB2YXIgUyA9ICRTeW1ib2woKTtcbiAgLy8gTVMgRWRnZSBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMge31cbiAgLy8gV2ViS2l0IGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyBudWxsXG4gIC8vIFY4IHRocm93cyBvbiBib3hlZCBzeW1ib2xzXG4gIHJldHVybiBfc3RyaW5naWZ5KFtTXSkgIT0gJ1tudWxsXScgfHwgX3N0cmluZ2lmeSh7YTogU30pICE9ICd7fScgfHwgX3N0cmluZ2lmeShPYmplY3QoUykpICE9ICd7fSc7XG59KSksICdKU09OJywge1xuICBzdHJpbmdpZnk6IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCl7XG4gICAgaWYoaXQgPT09IHVuZGVmaW5lZCB8fCBpc1N5bWJvbChpdCkpcmV0dXJuOyAvLyBJRTggcmV0dXJucyBzdHJpbmcgb24gdW5kZWZpbmVkXG4gICAgdmFyIGFyZ3MgPSBbaXRdXG4gICAgICAsIGkgICAgPSAxXG4gICAgICAsIHJlcGxhY2VyLCAkcmVwbGFjZXI7XG4gICAgd2hpbGUoYXJndW1lbnRzLmxlbmd0aCA+IGkpYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICByZXBsYWNlciA9IGFyZ3NbMV07XG4gICAgaWYodHlwZW9mIHJlcGxhY2VyID09ICdmdW5jdGlvbicpJHJlcGxhY2VyID0gcmVwbGFjZXI7XG4gICAgaWYoJHJlcGxhY2VyIHx8ICFpc0FycmF5KHJlcGxhY2VyKSlyZXBsYWNlciA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgICAgaWYoJHJlcGxhY2VyKXZhbHVlID0gJHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgICBpZighaXNTeW1ib2wodmFsdWUpKXJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIGFyZ3NbMV0gPSByZXBsYWNlcjtcbiAgICByZXR1cm4gX3N0cmluZ2lmeS5hcHBseSgkSlNPTiwgYXJncyk7XG4gIH1cbn0pO1xuXG4vLyAxOS40LjMuNCBTeW1ib2wucHJvdG90eXBlW0BAdG9QcmltaXRpdmVdKGhpbnQpXG4kU3ltYm9sW1BST1RPVFlQRV1bVE9fUFJJTUlUSVZFXSB8fCByZXF1aXJlKCcuL19oaWRlJykoJFN5bWJvbFtQUk9UT1RZUEVdLCBUT19QUklNSVRJVkUsICRTeW1ib2xbUFJPVE9UWVBFXS52YWx1ZU9mKTtcbi8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKE1hdGgsICdNYXRoJywgdHJ1ZSk7XG4vLyAyNC4zLjMgSlNPTltAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoZ2xvYmFsLkpTT04sICdKU09OJywgdHJ1ZSk7IiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtjcmVhdGU6IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKX0pOyIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHtkZWZpbmVQcm9wZXJ0eTogcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZn0pOyIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuMyAvIDE1LjIuMy43IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0Jywge2RlZmluZVByb3BlcnRpZXM6IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKX0pOyIsIi8vIG1vc3QgT2JqZWN0IG1ldGhvZHMgYnkgRVM2IHNob3VsZCBhY2NlcHQgcHJpbWl0aXZlc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGNvcmUgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBmYWlscyAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZLCBleGVjKXtcbiAgdmFyIGZuICA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXVxuICAgICwgZXhwID0ge307XG4gIGV4cFtLRVldID0gZXhlYyhmbik7XG4gICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24oKXsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07IiwiLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxudmFyIHRvSU9iamVjdCAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKS5mO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2dldE93blByb3BlcnR5RGVzY3JpcHRvcicsIGZ1bmN0aW9uKCl7XG4gIHJldHVybiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XG4gICAgcmV0dXJuICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodG9JT2JqZWN0KGl0KSwga2V5KTtcbiAgfTtcbn0pOyIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTsiLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b09iamVjdCAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgSUVfUFJPVE8gICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJylcbiAgLCBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uKE8pe1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmKGhhcyhPLCBJRV9QUk9UTykpcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZih0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKXtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XG59OyIsIi8vIDE5LjEuMi45IE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIHRvT2JqZWN0ICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgJGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2dldFByb3RvdHlwZU9mJywgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdldFByb3RvdHlwZU9mKGl0KXtcbiAgICByZXR1cm4gJGdldFByb3RvdHlwZU9mKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTsiLCIvLyAxOS4xLjIuMTQgT2JqZWN0LmtleXMoTylcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgJGtleXMgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2tleXMnLCBmdW5jdGlvbigpe1xuICByZXR1cm4gZnVuY3Rpb24ga2V5cyhpdCl7XG4gICAgcmV0dXJuICRrZXlzKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTsiLCIvLyAxOS4xLjIuNyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdnZXRPd25Qcm9wZXJ0eU5hbWVzJywgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHJlcXVpcmUoJy4vX29iamVjdC1nb3BuLWV4dCcpLmY7XG59KTsiLCIvLyAxOS4xLjIuNSBPYmplY3QuZnJlZXplKE8pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIG1ldGEgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpLm9uRnJlZXplO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2ZyZWV6ZScsIGZ1bmN0aW9uKCRmcmVlemUpe1xuICByZXR1cm4gZnVuY3Rpb24gZnJlZXplKGl0KXtcbiAgICByZXR1cm4gJGZyZWV6ZSAmJiBpc09iamVjdChpdCkgPyAkZnJlZXplKG1ldGEoaXQpKSA6IGl0O1xuICB9O1xufSk7IiwiLy8gMTkuMS4yLjE3IE9iamVjdC5zZWFsKE8pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIG1ldGEgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpLm9uRnJlZXplO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ3NlYWwnLCBmdW5jdGlvbigkc2VhbCl7XG4gIHJldHVybiBmdW5jdGlvbiBzZWFsKGl0KXtcbiAgICByZXR1cm4gJHNlYWwgJiYgaXNPYmplY3QoaXQpID8gJHNlYWwobWV0YShpdCkpIDogaXQ7XG4gIH07XG59KTsiLCIvLyAxOS4xLjIuMTUgT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKE8pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIG1ldGEgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpLm9uRnJlZXplO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ3ByZXZlbnRFeHRlbnNpb25zJywgZnVuY3Rpb24oJHByZXZlbnRFeHRlbnNpb25zKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHByZXZlbnRFeHRlbnNpb25zKGl0KXtcbiAgICByZXR1cm4gJHByZXZlbnRFeHRlbnNpb25zICYmIGlzT2JqZWN0KGl0KSA/ICRwcmV2ZW50RXh0ZW5zaW9ucyhtZXRhKGl0KSkgOiBpdDtcbiAgfTtcbn0pOyIsIi8vIDE5LjEuMi4xMiBPYmplY3QuaXNGcm96ZW4oTylcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2lzRnJvemVuJywgZnVuY3Rpb24oJGlzRnJvemVuKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGlzRnJvemVuKGl0KXtcbiAgICByZXR1cm4gaXNPYmplY3QoaXQpID8gJGlzRnJvemVuID8gJGlzRnJvemVuKGl0KSA6IGZhbHNlIDogdHJ1ZTtcbiAgfTtcbn0pOyIsIi8vIDE5LjEuMi4xMyBPYmplY3QuaXNTZWFsZWQoTylcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2lzU2VhbGVkJywgZnVuY3Rpb24oJGlzU2VhbGVkKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGlzU2VhbGVkKGl0KXtcbiAgICByZXR1cm4gaXNPYmplY3QoaXQpID8gJGlzU2VhbGVkID8gJGlzU2VhbGVkKGl0KSA6IGZhbHNlIDogdHJ1ZTtcbiAgfTtcbn0pOyIsIi8vIDE5LjEuMi4xMSBPYmplY3QuaXNFeHRlbnNpYmxlKE8pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdpc0V4dGVuc2libGUnLCBmdW5jdGlvbigkaXNFeHRlbnNpYmxlKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGlzRXh0ZW5zaWJsZShpdCl7XG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/ICRpc0V4dGVuc2libGUgPyAkaXNFeHRlbnNpYmxlKGl0KSA6IHRydWUgOiBmYWxzZTtcbiAgfTtcbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJylcbiAgLCBwSUUgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKVxuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsICRhc3NpZ24gID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgdmFyIEEgPSB7fVxuICAgICwgQiA9IHt9XG4gICAgLCBTID0gU3ltYm9sKClcbiAgICAsIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbihrKXsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCAgICAgPSB0b09iamVjdCh0YXJnZXQpXG4gICAgLCBhTGVuICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGluZGV4ID0gMVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZlxuICAgICwgaXNFbnVtICAgICA9IHBJRS5mO1xuICB3aGlsZShhTGVuID4gaW5kZXgpe1xuICAgIHZhciBTICAgICAgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSlcbiAgICAgICwga2V5cyAgID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKWlmKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247IiwiLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GLCAnT2JqZWN0Jywge2Fzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpfSk7IiwiLy8gNy4yLjkgU2FtZVZhbHVlKHgsIHkpXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5pcyB8fCBmdW5jdGlvbiBpcyh4LCB5KXtcbiAgcmV0dXJuIHggPT09IHkgPyB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geSA6IHggIT0geCAmJiB5ICE9IHk7XG59OyIsIi8vIDE5LjEuMy4xMCBPYmplY3QuaXModmFsdWUxLCB2YWx1ZTIpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7aXM6IHJlcXVpcmUoJy4vX3NhbWUtdmFsdWUnKX0pOyIsIi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBjaGVjayA9IGZ1bmN0aW9uKE8sIHByb3RvKXtcbiAgYW5PYmplY3QoTyk7XG4gIGlmKCFpc09iamVjdChwcm90bykgJiYgcHJvdG8gIT09IG51bGwpdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24odGVzdCwgYnVnZ3ksIHNldCl7XG4gICAgICB0cnkge1xuICAgICAgICBzZXQgPSByZXF1aXJlKCcuL19jdHgnKShGdW5jdGlvbi5jYWxsLCByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmYoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgIHNldCh0ZXN0LCBbXSk7XG4gICAgICAgIGJ1Z2d5ID0gISh0ZXN0IGluc3RhbmNlb2YgQXJyYXkpO1xuICAgICAgfSBjYXRjaChlKXsgYnVnZ3kgPSB0cnVlOyB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pe1xuICAgICAgICBjaGVjayhPLCBwcm90byk7XG4gICAgICAgIGlmKGJ1Z2d5KU8uX19wcm90b19fID0gcHJvdG87XG4gICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgcmV0dXJuIE87XG4gICAgICB9O1xuICAgIH0oe30sIGZhbHNlKSA6IHVuZGVmaW5lZCksXG4gIGNoZWNrOiBjaGVja1xufTsiLCIvLyAxOS4xLjMuMTkgT2JqZWN0LnNldFByb3RvdHlwZU9mKE8sIHByb3RvKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge3NldFByb3RvdHlwZU9mOiByZXF1aXJlKCcuL19zZXQtcHJvdG8nKS5zZXR9KTsiLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpXG4gICwgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJylcbiAgLy8gRVMzIHdyb25nIGhlcmVcbiAgLCBBUkcgPSBjb2YoZnVuY3Rpb24oKXsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVEFHKSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59OyIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgLCB0ZXN0ICAgID0ge307XG50ZXN0W3JlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpXSA9ICd6JztcbmlmKHRlc3QgKyAnJyAhPSAnW29iamVjdCB6XScpe1xuICByZXF1aXJlKCcuL19yZWRlZmluZScpKE9iamVjdC5wcm90b3R5cGUsICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gICAgcmV0dXJuICdbb2JqZWN0ICcgKyBjbGFzc29mKHRoaXMpICsgJ10nO1xuICB9LCB0cnVlKTtcbn0iLCIvLyBmYXN0IGFwcGx5LCBodHRwOi8vanNwZXJmLmxua2l0LmNvbS9mYXN0LWFwcGx5LzVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIGFyZ3MsIHRoYXQpe1xuICB2YXIgdW4gPSB0aGF0ID09PSB1bmRlZmluZWQ7XG4gIHN3aXRjaChhcmdzLmxlbmd0aCl7XG4gICAgY2FzZSAwOiByZXR1cm4gdW4gPyBmbigpXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQpO1xuICAgIGNhc2UgMTogcmV0dXJuIHVuID8gZm4oYXJnc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgIGNhc2UgNDogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gIH0gcmV0dXJuICAgICAgICAgICAgICBmbi5hcHBseSh0aGF0LCBhcmdzKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFGdW5jdGlvbiAgPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJylcbiAgLCBpc09iamVjdCAgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBpbnZva2UgICAgID0gcmVxdWlyZSgnLi9faW52b2tlJylcbiAgLCBhcnJheVNsaWNlID0gW10uc2xpY2VcbiAgLCBmYWN0b3JpZXMgID0ge307XG5cbnZhciBjb25zdHJ1Y3QgPSBmdW5jdGlvbihGLCBsZW4sIGFyZ3Mpe1xuICBpZighKGxlbiBpbiBmYWN0b3JpZXMpKXtcbiAgICBmb3IodmFyIG4gPSBbXSwgaSA9IDA7IGkgPCBsZW47IGkrKyluW2ldID0gJ2FbJyArIGkgKyAnXSc7XG4gICAgZmFjdG9yaWVzW2xlbl0gPSBGdW5jdGlvbignRixhJywgJ3JldHVybiBuZXcgRignICsgbi5qb2luKCcsJykgKyAnKScpO1xuICB9IHJldHVybiBmYWN0b3JpZXNbbGVuXShGLCBhcmdzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRnVuY3Rpb24uYmluZCB8fCBmdW5jdGlvbiBiaW5kKHRoYXQgLyosIGFyZ3MuLi4gKi8pe1xuICB2YXIgZm4gICAgICAgPSBhRnVuY3Rpb24odGhpcylcbiAgICAsIHBhcnRBcmdzID0gYXJyYXlTbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gIHZhciBib3VuZCA9IGZ1bmN0aW9uKC8qIGFyZ3MuLi4gKi8pe1xuICAgIHZhciBhcmdzID0gcGFydEFyZ3MuY29uY2F0KGFycmF5U2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIGJvdW5kID8gY29uc3RydWN0KGZuLCBhcmdzLmxlbmd0aCwgYXJncykgOiBpbnZva2UoZm4sIGFyZ3MsIHRoYXQpO1xuICB9O1xuICBpZihpc09iamVjdChmbi5wcm90b3R5cGUpKWJvdW5kLnByb3RvdHlwZSA9IGZuLnByb3RvdHlwZTtcbiAgcmV0dXJuIGJvdW5kO1xufTsiLCIvLyAxOS4yLjMuMiAvIDE1LjMuNC41IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKHRoaXNBcmcsIGFyZ3MuLi4pXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCwgJ0Z1bmN0aW9uJywge2JpbmQ6IHJlcXVpcmUoJy4vX2JpbmQnKX0pOyIsInZhciBkUCAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCBoYXMgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBGUHJvdG8gICAgID0gRnVuY3Rpb24ucHJvdG90eXBlXG4gICwgbmFtZVJFICAgICA9IC9eXFxzKmZ1bmN0aW9uIChbXiAoXSopL1xuICAsIE5BTUUgICAgICAgPSAnbmFtZSc7XG5cbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB0cnVlO1xufTtcblxuLy8gMTkuMi40LjIgbmFtZVxuTkFNRSBpbiBGUHJvdG8gfHwgcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiBkUChGUHJvdG8sIE5BTUUsIHtcbiAgY29uZmlndXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCl7XG4gICAgdHJ5IHtcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgICAsIG5hbWUgPSAoJycgKyB0aGF0KS5tYXRjaChuYW1lUkUpWzFdO1xuICAgICAgaGFzKHRoYXQsIE5BTUUpIHx8ICFpc0V4dGVuc2libGUodGhhdCkgfHwgZFAodGhhdCwgTkFNRSwgY3JlYXRlRGVzYyg1LCBuYW1lKSk7XG4gICAgICByZXR1cm4gbmFtZTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGlzT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKVxuICAsIEhBU19JTlNUQU5DRSAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2hhc0luc3RhbmNlJylcbiAgLCBGdW5jdGlvblByb3RvICA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbi8vIDE5LjIuMy42IEZ1bmN0aW9uLnByb3RvdHlwZVtAQGhhc0luc3RhbmNlXShWKVxuaWYoIShIQVNfSU5TVEFOQ0UgaW4gRnVuY3Rpb25Qcm90bykpcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZihGdW5jdGlvblByb3RvLCBIQVNfSU5TVEFOQ0UsIHt2YWx1ZTogZnVuY3Rpb24oTyl7XG4gIGlmKHR5cGVvZiB0aGlzICE9ICdmdW5jdGlvbicgfHwgIWlzT2JqZWN0KE8pKXJldHVybiBmYWxzZTtcbiAgaWYoIWlzT2JqZWN0KHRoaXMucHJvdG90eXBlKSlyZXR1cm4gTyBpbnN0YW5jZW9mIHRoaXM7XG4gIC8vIGZvciBlbnZpcm9ubWVudCB3L28gbmF0aXZlIGBAQGhhc0luc3RhbmNlYCBsb2dpYyBlbm91Z2ggYGluc3RhbmNlb2ZgLCBidXQgYWRkIHRoaXM6XG4gIHdoaWxlKE8gPSBnZXRQcm90b3R5cGVPZihPKSlpZih0aGlzLnByb3RvdHlwZSA9PT0gTylyZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIGZhbHNlO1xufX0pOyIsIm1vZHVsZS5leHBvcnRzID0gJ1xceDA5XFx4MEFcXHgwQlxceDBDXFx4MERcXHgyMFxceEEwXFx1MTY4MFxcdTE4MEVcXHUyMDAwXFx1MjAwMVxcdTIwMDJcXHUyMDAzJyArXG4gICdcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBBXFx1MjAyRlxcdTIwNUZcXHUzMDAwXFx1MjAyOFxcdTIwMjlcXHVGRUZGJzsiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKVxuICAsIGZhaWxzICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICwgc3BhY2VzICA9IHJlcXVpcmUoJy4vX3N0cmluZy13cycpXG4gICwgc3BhY2UgICA9ICdbJyArIHNwYWNlcyArICddJ1xuICAsIG5vbiAgICAgPSAnXFx1MjAwYlxcdTAwODUnXG4gICwgbHRyaW0gICA9IFJlZ0V4cCgnXicgKyBzcGFjZSArIHNwYWNlICsgJyonKVxuICAsIHJ0cmltICAgPSBSZWdFeHAoc3BhY2UgKyBzcGFjZSArICcqJCcpO1xuXG52YXIgZXhwb3J0ZXIgPSBmdW5jdGlvbihLRVksIGV4ZWMsIEFMSUFTKXtcbiAgdmFyIGV4cCAgID0ge307XG4gIHZhciBGT1JDRSA9IGZhaWxzKGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuICEhc3BhY2VzW0tFWV0oKSB8fCBub25bS0VZXSgpICE9IG5vbjtcbiAgfSk7XG4gIHZhciBmbiA9IGV4cFtLRVldID0gRk9SQ0UgPyBleGVjKHRyaW0pIDogc3BhY2VzW0tFWV07XG4gIGlmKEFMSUFTKWV4cFtBTElBU10gPSBmbjtcbiAgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiBGT1JDRSwgJ1N0cmluZycsIGV4cCk7XG59O1xuXG4vLyAxIC0+IFN0cmluZyN0cmltTGVmdFxuLy8gMiAtPiBTdHJpbmcjdHJpbVJpZ2h0XG4vLyAzIC0+IFN0cmluZyN0cmltXG52YXIgdHJpbSA9IGV4cG9ydGVyLnRyaW0gPSBmdW5jdGlvbihzdHJpbmcsIFRZUEUpe1xuICBzdHJpbmcgPSBTdHJpbmcoZGVmaW5lZChzdHJpbmcpKTtcbiAgaWYoVFlQRSAmIDEpc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UobHRyaW0sICcnKTtcbiAgaWYoVFlQRSAmIDIpc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocnRyaW0sICcnKTtcbiAgcmV0dXJuIHN0cmluZztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0ZXI7IiwidmFyICRwYXJzZUludCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLnBhcnNlSW50XG4gICwgJHRyaW0gICAgID0gcmVxdWlyZSgnLi9fc3RyaW5nLXRyaW0nKS50cmltXG4gICwgd3MgICAgICAgID0gcmVxdWlyZSgnLi9fc3RyaW5nLXdzJylcbiAgLCBoZXggICAgICAgPSAvXltcXC0rXT8wW3hYXS87XG5cbm1vZHVsZS5leHBvcnRzID0gJHBhcnNlSW50KHdzICsgJzA4JykgIT09IDggfHwgJHBhcnNlSW50KHdzICsgJzB4MTYnKSAhPT0gMjIgPyBmdW5jdGlvbiBwYXJzZUludChzdHIsIHJhZGl4KXtcbiAgdmFyIHN0cmluZyA9ICR0cmltKFN0cmluZyhzdHIpLCAzKTtcbiAgcmV0dXJuICRwYXJzZUludChzdHJpbmcsIChyYWRpeCA+Pj4gMCkgfHwgKGhleC50ZXN0KHN0cmluZykgPyAxNiA6IDEwKSk7XG59IDogJHBhcnNlSW50OyIsInZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRwYXJzZUludCA9IHJlcXVpcmUoJy4vX3BhcnNlLWludCcpO1xuLy8gMTguMi41IHBhcnNlSW50KHN0cmluZywgcmFkaXgpXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuRiAqIChwYXJzZUludCAhPSAkcGFyc2VJbnQpLCB7cGFyc2VJbnQ6ICRwYXJzZUludH0pOyIsInZhciAkcGFyc2VGbG9hdCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLnBhcnNlRmxvYXRcbiAgLCAkdHJpbSAgICAgICA9IHJlcXVpcmUoJy4vX3N0cmluZy10cmltJykudHJpbTtcblxubW9kdWxlLmV4cG9ydHMgPSAxIC8gJHBhcnNlRmxvYXQocmVxdWlyZSgnLi9fc3RyaW5nLXdzJykgKyAnLTAnKSAhPT0gLUluZmluaXR5ID8gZnVuY3Rpb24gcGFyc2VGbG9hdChzdHIpe1xuICB2YXIgc3RyaW5nID0gJHRyaW0oU3RyaW5nKHN0ciksIDMpXG4gICAgLCByZXN1bHQgPSAkcGFyc2VGbG9hdChzdHJpbmcpO1xuICByZXR1cm4gcmVzdWx0ID09PSAwICYmIHN0cmluZy5jaGFyQXQoMCkgPT0gJy0nID8gLTAgOiByZXN1bHQ7XG59IDogJHBhcnNlRmxvYXQ7IiwidmFyICRleHBvcnQgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkcGFyc2VGbG9hdCA9IHJlcXVpcmUoJy4vX3BhcnNlLWZsb2F0Jyk7XG4vLyAxOC4yLjQgcGFyc2VGbG9hdChzdHJpbmcpXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuRiAqIChwYXJzZUZsb2F0ICE9ICRwYXJzZUZsb2F0KSwge3BhcnNlRmxvYXQ6ICRwYXJzZUZsb2F0fSk7IiwidmFyIGlzT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX3NldC1wcm90bycpLnNldDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGhhdCwgdGFyZ2V0LCBDKXtcbiAgdmFyIFAsIFMgPSB0YXJnZXQuY29uc3RydWN0b3I7XG4gIGlmKFMgIT09IEMgJiYgdHlwZW9mIFMgPT0gJ2Z1bmN0aW9uJyAmJiAoUCA9IFMucHJvdG90eXBlKSAhPT0gQy5wcm90b3R5cGUgJiYgaXNPYmplY3QoUCkgJiYgc2V0UHJvdG90eXBlT2Ype1xuICAgIHNldFByb3RvdHlwZU9mKHRoYXQsIFApO1xuICB9IHJldHVybiB0aGF0O1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsICAgICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGhhcyAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBjb2YgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2NvZicpXG4gICwgaW5oZXJpdElmUmVxdWlyZWQgPSByZXF1aXJlKCcuL19pbmhlcml0LWlmLXJlcXVpcmVkJylcbiAgLCB0b1ByaW1pdGl2ZSAgICAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZmFpbHMgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICwgZ09QTiAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmZcbiAgLCBnT1BEICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZlxuICAsIGRQICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsICR0cmltICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fc3RyaW5nLXRyaW0nKS50cmltXG4gICwgTlVNQkVSICAgICAgICAgICAgPSAnTnVtYmVyJ1xuICAsICROdW1iZXIgICAgICAgICAgID0gZ2xvYmFsW05VTUJFUl1cbiAgLCBCYXNlICAgICAgICAgICAgICA9ICROdW1iZXJcbiAgLCBwcm90byAgICAgICAgICAgICA9ICROdW1iZXIucHJvdG90eXBlXG4gIC8vIE9wZXJhIH4xMiBoYXMgYnJva2VuIE9iamVjdCN0b1N0cmluZ1xuICAsIEJST0tFTl9DT0YgICAgICAgID0gY29mKHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKShwcm90bykpID09IE5VTUJFUlxuICAsIFRSSU0gICAgICAgICAgICAgID0gJ3RyaW0nIGluIFN0cmluZy5wcm90b3R5cGU7XG5cbi8vIDcuMS4zIFRvTnVtYmVyKGFyZ3VtZW50KVxudmFyIHRvTnVtYmVyID0gZnVuY3Rpb24oYXJndW1lbnQpe1xuICB2YXIgaXQgPSB0b1ByaW1pdGl2ZShhcmd1bWVudCwgZmFsc2UpO1xuICBpZih0eXBlb2YgaXQgPT0gJ3N0cmluZycgJiYgaXQubGVuZ3RoID4gMil7XG4gICAgaXQgPSBUUklNID8gaXQudHJpbSgpIDogJHRyaW0oaXQsIDMpO1xuICAgIHZhciBmaXJzdCA9IGl0LmNoYXJDb2RlQXQoMClcbiAgICAgICwgdGhpcmQsIHJhZGl4LCBtYXhDb2RlO1xuICAgIGlmKGZpcnN0ID09PSA0MyB8fCBmaXJzdCA9PT0gNDUpe1xuICAgICAgdGhpcmQgPSBpdC5jaGFyQ29kZUF0KDIpO1xuICAgICAgaWYodGhpcmQgPT09IDg4IHx8IHRoaXJkID09PSAxMjApcmV0dXJuIE5hTjsgLy8gTnVtYmVyKCcrMHgxJykgc2hvdWxkIGJlIE5hTiwgb2xkIFY4IGZpeFxuICAgIH0gZWxzZSBpZihmaXJzdCA9PT0gNDgpe1xuICAgICAgc3dpdGNoKGl0LmNoYXJDb2RlQXQoMSkpe1xuICAgICAgICBjYXNlIDY2IDogY2FzZSA5OCAgOiByYWRpeCA9IDI7IG1heENvZGUgPSA0OTsgYnJlYWs7IC8vIGZhc3QgZXF1YWwgL14wYlswMV0rJC9pXG4gICAgICAgIGNhc2UgNzkgOiBjYXNlIDExMSA6IHJhZGl4ID0gODsgbWF4Q29kZSA9IDU1OyBicmVhazsgLy8gZmFzdCBlcXVhbCAvXjBvWzAtN10rJC9pXG4gICAgICAgIGRlZmF1bHQgOiByZXR1cm4gK2l0O1xuICAgICAgfVxuICAgICAgZm9yKHZhciBkaWdpdHMgPSBpdC5zbGljZSgyKSwgaSA9IDAsIGwgPSBkaWdpdHMubGVuZ3RoLCBjb2RlOyBpIDwgbDsgaSsrKXtcbiAgICAgICAgY29kZSA9IGRpZ2l0cy5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAvLyBwYXJzZUludCBwYXJzZXMgYSBzdHJpbmcgdG8gYSBmaXJzdCB1bmF2YWlsYWJsZSBzeW1ib2xcbiAgICAgICAgLy8gYnV0IFRvTnVtYmVyIHNob3VsZCByZXR1cm4gTmFOIGlmIGEgc3RyaW5nIGNvbnRhaW5zIHVuYXZhaWxhYmxlIHN5bWJvbHNcbiAgICAgICAgaWYoY29kZSA8IDQ4IHx8IGNvZGUgPiBtYXhDb2RlKXJldHVybiBOYU47XG4gICAgICB9IHJldHVybiBwYXJzZUludChkaWdpdHMsIHJhZGl4KTtcbiAgICB9XG4gIH0gcmV0dXJuICtpdDtcbn07XG5cbmlmKCEkTnVtYmVyKCcgMG8xJykgfHwgISROdW1iZXIoJzBiMScpIHx8ICROdW1iZXIoJysweDEnKSl7XG4gICROdW1iZXIgPSBmdW5jdGlvbiBOdW1iZXIodmFsdWUpe1xuICAgIHZhciBpdCA9IGFyZ3VtZW50cy5sZW5ndGggPCAxID8gMCA6IHZhbHVlXG4gICAgICAsIHRoYXQgPSB0aGlzO1xuICAgIHJldHVybiB0aGF0IGluc3RhbmNlb2YgJE51bWJlclxuICAgICAgLy8gY2hlY2sgb24gMS4uY29uc3RydWN0b3IoZm9vKSBjYXNlXG4gICAgICAmJiAoQlJPS0VOX0NPRiA/IGZhaWxzKGZ1bmN0aW9uKCl7IHByb3RvLnZhbHVlT2YuY2FsbCh0aGF0KTsgfSkgOiBjb2YodGhhdCkgIT0gTlVNQkVSKVxuICAgICAgICA/IGluaGVyaXRJZlJlcXVpcmVkKG5ldyBCYXNlKHRvTnVtYmVyKGl0KSksIHRoYXQsICROdW1iZXIpIDogdG9OdW1iZXIoaXQpO1xuICB9O1xuICBmb3IodmFyIGtleXMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZ09QTihCYXNlKSA6IChcbiAgICAvLyBFUzM6XG4gICAgJ01BWF9WQUxVRSxNSU5fVkFMVUUsTmFOLE5FR0FUSVZFX0lORklOSVRZLFBPU0lUSVZFX0lORklOSVRZLCcgK1xuICAgIC8vIEVTNiAoaW4gY2FzZSwgaWYgbW9kdWxlcyB3aXRoIEVTNiBOdW1iZXIgc3RhdGljcyByZXF1aXJlZCBiZWZvcmUpOlxuICAgICdFUFNJTE9OLGlzRmluaXRlLGlzSW50ZWdlcixpc05hTixpc1NhZmVJbnRlZ2VyLE1BWF9TQUZFX0lOVEVHRVIsJyArXG4gICAgJ01JTl9TQUZFX0lOVEVHRVIscGFyc2VGbG9hdCxwYXJzZUludCxpc0ludGVnZXInXG4gICkuc3BsaXQoJywnKSwgaiA9IDAsIGtleTsga2V5cy5sZW5ndGggPiBqOyBqKyspe1xuICAgIGlmKGhhcyhCYXNlLCBrZXkgPSBrZXlzW2pdKSAmJiAhaGFzKCROdW1iZXIsIGtleSkpe1xuICAgICAgZFAoJE51bWJlciwga2V5LCBnT1BEKEJhc2UsIGtleSkpO1xuICAgIH1cbiAgfVxuICAkTnVtYmVyLnByb3RvdHlwZSA9IHByb3RvO1xuICBwcm90by5jb25zdHJ1Y3RvciA9ICROdW1iZXI7XG4gIHJlcXVpcmUoJy4vX3JlZGVmaW5lJykoZ2xvYmFsLCBOVU1CRVIsICROdW1iZXIpO1xufSIsInZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIG1zZyl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnbnVtYmVyJyAmJiBjb2YoaXQpICE9ICdOdW1iZXInKXRocm93IFR5cGVFcnJvcihtc2cpO1xuICByZXR1cm4gK2l0O1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgZGVmaW5lZCAgID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlcGVhdChjb3VudCl7XG4gIHZhciBzdHIgPSBTdHJpbmcoZGVmaW5lZCh0aGlzKSlcbiAgICAsIHJlcyA9ICcnXG4gICAgLCBuICAgPSB0b0ludGVnZXIoY291bnQpO1xuICBpZihuIDwgMCB8fCBuID09IEluZmluaXR5KXRocm93IFJhbmdlRXJyb3IoXCJDb3VudCBjYW4ndCBiZSBuZWdhdGl2ZVwiKTtcbiAgZm9yKDtuID4gMDsgKG4gPj4+PSAxKSAmJiAoc3RyICs9IHN0cikpaWYobiAmIDEpcmVzICs9IHN0cjtcbiAgcmV0dXJuIHJlcztcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgdG9JbnRlZ2VyICAgID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgYU51bWJlclZhbHVlID0gcmVxdWlyZSgnLi9fYS1udW1iZXItdmFsdWUnKVxuICAsIHJlcGVhdCAgICAgICA9IHJlcXVpcmUoJy4vX3N0cmluZy1yZXBlYXQnKVxuICAsICR0b0ZpeGVkICAgICA9IDEuLnRvRml4ZWRcbiAgLCBmbG9vciAgICAgICAgPSBNYXRoLmZsb29yXG4gICwgZGF0YSAgICAgICAgID0gWzAsIDAsIDAsIDAsIDAsIDBdXG4gICwgRVJST1IgICAgICAgID0gJ051bWJlci50b0ZpeGVkOiBpbmNvcnJlY3QgaW52b2NhdGlvbiEnXG4gICwgWkVSTyAgICAgICAgID0gJzAnO1xuXG52YXIgbXVsdGlwbHkgPSBmdW5jdGlvbihuLCBjKXtcbiAgdmFyIGkgID0gLTFcbiAgICAsIGMyID0gYztcbiAgd2hpbGUoKytpIDwgNil7XG4gICAgYzIgKz0gbiAqIGRhdGFbaV07XG4gICAgZGF0YVtpXSA9IGMyICUgMWU3O1xuICAgIGMyID0gZmxvb3IoYzIgLyAxZTcpO1xuICB9XG59O1xudmFyIGRpdmlkZSA9IGZ1bmN0aW9uKG4pe1xuICB2YXIgaSA9IDZcbiAgICAsIGMgPSAwO1xuICB3aGlsZSgtLWkgPj0gMCl7XG4gICAgYyArPSBkYXRhW2ldO1xuICAgIGRhdGFbaV0gPSBmbG9vcihjIC8gbik7XG4gICAgYyA9IChjICUgbikgKiAxZTc7XG4gIH1cbn07XG52YXIgbnVtVG9TdHJpbmcgPSBmdW5jdGlvbigpe1xuICB2YXIgaSA9IDZcbiAgICAsIHMgPSAnJztcbiAgd2hpbGUoLS1pID49IDApe1xuICAgIGlmKHMgIT09ICcnIHx8IGkgPT09IDAgfHwgZGF0YVtpXSAhPT0gMCl7XG4gICAgICB2YXIgdCA9IFN0cmluZyhkYXRhW2ldKTtcbiAgICAgIHMgPSBzID09PSAnJyA/IHQgOiBzICsgcmVwZWF0LmNhbGwoWkVSTywgNyAtIHQubGVuZ3RoKSArIHQ7XG4gICAgfVxuICB9IHJldHVybiBzO1xufTtcbnZhciBwb3cgPSBmdW5jdGlvbih4LCBuLCBhY2Mpe1xuICByZXR1cm4gbiA9PT0gMCA/IGFjYyA6IG4gJSAyID09PSAxID8gcG93KHgsIG4gLSAxLCBhY2MgKiB4KSA6IHBvdyh4ICogeCwgbiAvIDIsIGFjYyk7XG59O1xudmFyIGxvZyA9IGZ1bmN0aW9uKHgpe1xuICB2YXIgbiAgPSAwXG4gICAgLCB4MiA9IHg7XG4gIHdoaWxlKHgyID49IDQwOTYpe1xuICAgIG4gKz0gMTI7XG4gICAgeDIgLz0gNDA5NjtcbiAgfVxuICB3aGlsZSh4MiA+PSAyKXtcbiAgICBuICArPSAxO1xuICAgIHgyIC89IDI7XG4gIH0gcmV0dXJuIG47XG59O1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqICghISR0b0ZpeGVkICYmIChcbiAgMC4wMDAwOC50b0ZpeGVkKDMpICE9PSAnMC4wMDAnIHx8XG4gIDAuOS50b0ZpeGVkKDApICE9PSAnMScgfHxcbiAgMS4yNTUudG9GaXhlZCgyKSAhPT0gJzEuMjUnIHx8XG4gIDEwMDAwMDAwMDAwMDAwMDAxMjguLnRvRml4ZWQoMCkgIT09ICcxMDAwMDAwMDAwMDAwMDAwMTI4J1xuKSB8fCAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICAvLyBWOCB+IEFuZHJvaWQgNC4zLVxuICAkdG9GaXhlZC5jYWxsKHt9KTtcbn0pKSwgJ051bWJlcicsIHtcbiAgdG9GaXhlZDogZnVuY3Rpb24gdG9GaXhlZChmcmFjdGlvbkRpZ2l0cyl7XG4gICAgdmFyIHggPSBhTnVtYmVyVmFsdWUodGhpcywgRVJST1IpXG4gICAgICAsIGYgPSB0b0ludGVnZXIoZnJhY3Rpb25EaWdpdHMpXG4gICAgICAsIHMgPSAnJ1xuICAgICAgLCBtID0gWkVST1xuICAgICAgLCBlLCB6LCBqLCBrO1xuICAgIGlmKGYgPCAwIHx8IGYgPiAyMCl0aHJvdyBSYW5nZUVycm9yKEVSUk9SKTtcbiAgICBpZih4ICE9IHgpcmV0dXJuICdOYU4nO1xuICAgIGlmKHggPD0gLTFlMjEgfHwgeCA+PSAxZTIxKXJldHVybiBTdHJpbmcoeCk7XG4gICAgaWYoeCA8IDApe1xuICAgICAgcyA9ICctJztcbiAgICAgIHggPSAteDtcbiAgICB9XG4gICAgaWYoeCA+IDFlLTIxKXtcbiAgICAgIGUgPSBsb2coeCAqIHBvdygyLCA2OSwgMSkpIC0gNjk7XG4gICAgICB6ID0gZSA8IDAgPyB4ICogcG93KDIsIC1lLCAxKSA6IHggLyBwb3coMiwgZSwgMSk7XG4gICAgICB6ICo9IDB4MTAwMDAwMDAwMDAwMDA7XG4gICAgICBlID0gNTIgLSBlO1xuICAgICAgaWYoZSA+IDApe1xuICAgICAgICBtdWx0aXBseSgwLCB6KTtcbiAgICAgICAgaiA9IGY7XG4gICAgICAgIHdoaWxlKGogPj0gNyl7XG4gICAgICAgICAgbXVsdGlwbHkoMWU3LCAwKTtcbiAgICAgICAgICBqIC09IDc7XG4gICAgICAgIH1cbiAgICAgICAgbXVsdGlwbHkocG93KDEwLCBqLCAxKSwgMCk7XG4gICAgICAgIGogPSBlIC0gMTtcbiAgICAgICAgd2hpbGUoaiA+PSAyMyl7XG4gICAgICAgICAgZGl2aWRlKDEgPDwgMjMpO1xuICAgICAgICAgIGogLT0gMjM7XG4gICAgICAgIH1cbiAgICAgICAgZGl2aWRlKDEgPDwgaik7XG4gICAgICAgIG11bHRpcGx5KDEsIDEpO1xuICAgICAgICBkaXZpZGUoMik7XG4gICAgICAgIG0gPSBudW1Ub1N0cmluZygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbXVsdGlwbHkoMCwgeik7XG4gICAgICAgIG11bHRpcGx5KDEgPDwgLWUsIDApO1xuICAgICAgICBtID0gbnVtVG9TdHJpbmcoKSArIHJlcGVhdC5jYWxsKFpFUk8sIGYpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihmID4gMCl7XG4gICAgICBrID0gbS5sZW5ndGg7XG4gICAgICBtID0gcyArIChrIDw9IGYgPyAnMC4nICsgcmVwZWF0LmNhbGwoWkVSTywgZiAtIGspICsgbSA6IG0uc2xpY2UoMCwgayAtIGYpICsgJy4nICsgbS5zbGljZShrIC0gZikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gcyArIG07XG4gICAgfSByZXR1cm4gbTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJGZhaWxzICAgICAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAsIGFOdW1iZXJWYWx1ZSA9IHJlcXVpcmUoJy4vX2EtbnVtYmVyLXZhbHVlJylcbiAgLCAkdG9QcmVjaXNpb24gPSAxLi50b1ByZWNpc2lvbjtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIC8vIElFNy1cbiAgcmV0dXJuICR0b1ByZWNpc2lvbi5jYWxsKDEsIHVuZGVmaW5lZCkgIT09ICcxJztcbn0pIHx8ICEkZmFpbHMoZnVuY3Rpb24oKXtcbiAgLy8gVjggfiBBbmRyb2lkIDQuMy1cbiAgJHRvUHJlY2lzaW9uLmNhbGwoe30pO1xufSkpLCAnTnVtYmVyJywge1xuICB0b1ByZWNpc2lvbjogZnVuY3Rpb24gdG9QcmVjaXNpb24ocHJlY2lzaW9uKXtcbiAgICB2YXIgdGhhdCA9IGFOdW1iZXJWYWx1ZSh0aGlzLCAnTnVtYmVyI3RvUHJlY2lzaW9uOiBpbmNvcnJlY3QgaW52b2NhdGlvbiEnKTtcbiAgICByZXR1cm4gcHJlY2lzaW9uID09PSB1bmRlZmluZWQgPyAkdG9QcmVjaXNpb24uY2FsbCh0aGF0KSA6ICR0b1ByZWNpc2lvbi5jYWxsKHRoYXQsIHByZWNpc2lvbik7IFxuICB9XG59KTsiLCIvLyAyMC4xLjIuMSBOdW1iZXIuRVBTSUxPTlxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdOdW1iZXInLCB7RVBTSUxPTjogTWF0aC5wb3coMiwgLTUyKX0pOyIsIi8vIDIwLjEuMi4yIE51bWJlci5pc0Zpbml0ZShudW1iZXIpXG52YXIgJGV4cG9ydCAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBfaXNGaW5pdGUgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5pc0Zpbml0ZTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdOdW1iZXInLCB7XG4gIGlzRmluaXRlOiBmdW5jdGlvbiBpc0Zpbml0ZShpdCl7XG4gICAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnbnVtYmVyJyAmJiBfaXNGaW5pdGUoaXQpO1xuICB9XG59KTsiLCIvLyAyMC4xLjIuMyBOdW1iZXIuaXNJbnRlZ2VyKG51bWJlcilcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZmxvb3IgICAgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0ludGVnZXIoaXQpe1xuICByZXR1cm4gIWlzT2JqZWN0KGl0KSAmJiBpc0Zpbml0ZShpdCkgJiYgZmxvb3IoaXQpID09PSBpdDtcbn07IiwiLy8gMjAuMS4yLjMgTnVtYmVyLmlzSW50ZWdlcihudW1iZXIpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHtpc0ludGVnZXI6IHJlcXVpcmUoJy4vX2lzLWludGVnZXInKX0pOyIsIi8vIDIwLjEuMi40IE51bWJlci5pc05hTihudW1iZXIpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHtcbiAgaXNOYU46IGZ1bmN0aW9uIGlzTmFOKG51bWJlcil7XG4gICAgcmV0dXJuIG51bWJlciAhPSBudW1iZXI7XG4gIH1cbn0pOyIsIi8vIDIwLjEuMi41IE51bWJlci5pc1NhZmVJbnRlZ2VyKG51bWJlcilcbnZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGlzSW50ZWdlciA9IHJlcXVpcmUoJy4vX2lzLWludGVnZXInKVxuICAsIGFicyAgICAgICA9IE1hdGguYWJzO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHtcbiAgaXNTYWZlSW50ZWdlcjogZnVuY3Rpb24gaXNTYWZlSW50ZWdlcihudW1iZXIpe1xuICAgIHJldHVybiBpc0ludGVnZXIobnVtYmVyKSAmJiBhYnMobnVtYmVyKSA8PSAweDFmZmZmZmZmZmZmZmZmO1xuICB9XG59KTsiLCIvLyAyMC4xLjIuNiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUlxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdOdW1iZXInLCB7TUFYX1NBRkVfSU5URUdFUjogMHgxZmZmZmZmZmZmZmZmZn0pOyIsIi8vIDIwLjEuMi4xMCBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUlxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdOdW1iZXInLCB7TUlOX1NBRkVfSU5URUdFUjogLTB4MWZmZmZmZmZmZmZmZmZ9KTsiLCJ2YXIgJGV4cG9ydCAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRwYXJzZUZsb2F0ID0gcmVxdWlyZSgnLi9fcGFyc2UtZmxvYXQnKTtcbi8vIDIwLjEuMi4xMiBOdW1iZXIucGFyc2VGbG9hdChzdHJpbmcpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIChOdW1iZXIucGFyc2VGbG9hdCAhPSAkcGFyc2VGbG9hdCksICdOdW1iZXInLCB7cGFyc2VGbG9hdDogJHBhcnNlRmxvYXR9KTsiLCJ2YXIgJGV4cG9ydCAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkcGFyc2VJbnQgPSByZXF1aXJlKCcuL19wYXJzZS1pbnQnKTtcbi8vIDIwLjEuMi4xMyBOdW1iZXIucGFyc2VJbnQoc3RyaW5nLCByYWRpeClcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKE51bWJlci5wYXJzZUludCAhPSAkcGFyc2VJbnQpLCAnTnVtYmVyJywge3BhcnNlSW50OiAkcGFyc2VJbnR9KTsiLCIvLyAyMC4yLjIuMjAgTWF0aC5sb2cxcCh4KVxubW9kdWxlLmV4cG9ydHMgPSBNYXRoLmxvZzFwIHx8IGZ1bmN0aW9uIGxvZzFwKHgpe1xuICByZXR1cm4gKHggPSAreCkgPiAtMWUtOCAmJiB4IDwgMWUtOCA/IHggLSB4ICogeCAvIDIgOiBNYXRoLmxvZygxICsgeCk7XG59OyIsIi8vIDIwLjIuMi4zIE1hdGguYWNvc2goeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBsb2cxcCAgID0gcmVxdWlyZSgnLi9fbWF0aC1sb2cxcCcpXG4gICwgc3FydCAgICA9IE1hdGguc3FydFxuICAsICRhY29zaCAgPSBNYXRoLmFjb3NoO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEoJGFjb3NoXG4gIC8vIFY4IGJ1ZzogaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTM1MDlcbiAgJiYgTWF0aC5mbG9vcigkYWNvc2goTnVtYmVyLk1BWF9WQUxVRSkpID09IDcxMFxuICAvLyBUb3IgQnJvd3NlciBidWc6IE1hdGguYWNvc2goSW5maW5pdHkpIC0+IE5hTiBcbiAgJiYgJGFjb3NoKEluZmluaXR5KSA9PSBJbmZpbml0eVxuKSwgJ01hdGgnLCB7XG4gIGFjb3NoOiBmdW5jdGlvbiBhY29zaCh4KXtcbiAgICByZXR1cm4gKHggPSAreCkgPCAxID8gTmFOIDogeCA+IDk0OTA2MjY1LjYyNDI1MTU2XG4gICAgICA/IE1hdGgubG9nKHgpICsgTWF0aC5MTjJcbiAgICAgIDogbG9nMXAoeCAtIDEgKyBzcXJ0KHggLSAxKSAqIHNxcnQoeCArIDEpKTtcbiAgfVxufSk7IiwiLy8gMjAuMi4yLjUgTWF0aC5hc2luaCh4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRhc2luaCAgPSBNYXRoLmFzaW5oO1xuXG5mdW5jdGlvbiBhc2luaCh4KXtcbiAgcmV0dXJuICFpc0Zpbml0ZSh4ID0gK3gpIHx8IHggPT0gMCA/IHggOiB4IDwgMCA/IC1hc2luaCgteCkgOiBNYXRoLmxvZyh4ICsgTWF0aC5zcXJ0KHggKiB4ICsgMSkpO1xufVxuXG4vLyBUb3IgQnJvd3NlciBidWc6IE1hdGguYXNpbmgoMCkgLT4gLTAgXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEoJGFzaW5oICYmIDEgLyAkYXNpbmgoMCkgPiAwKSwgJ01hdGgnLCB7YXNpbmg6IGFzaW5ofSk7IiwiLy8gMjAuMi4yLjcgTWF0aC5hdGFuaCh4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRhdGFuaCAgPSBNYXRoLmF0YW5oO1xuXG4vLyBUb3IgQnJvd3NlciBidWc6IE1hdGguYXRhbmgoLTApIC0+IDAgXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEoJGF0YW5oICYmIDEgLyAkYXRhbmgoLTApIDwgMCksICdNYXRoJywge1xuICBhdGFuaDogZnVuY3Rpb24gYXRhbmgoeCl7XG4gICAgcmV0dXJuICh4ID0gK3gpID09IDAgPyB4IDogTWF0aC5sb2coKDEgKyB4KSAvICgxIC0geCkpIC8gMjtcbiAgfVxufSk7IiwiLy8gMjAuMi4yLjI4IE1hdGguc2lnbih4KVxubW9kdWxlLmV4cG9ydHMgPSBNYXRoLnNpZ24gfHwgZnVuY3Rpb24gc2lnbih4KXtcbiAgcmV0dXJuICh4ID0gK3gpID09IDAgfHwgeCAhPSB4ID8geCA6IHggPCAwID8gLTEgOiAxO1xufTsiLCIvLyAyMC4yLjIuOSBNYXRoLmNicnQoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBzaWduICAgID0gcmVxdWlyZSgnLi9fbWF0aC1zaWduJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgY2JydDogZnVuY3Rpb24gY2JydCh4KXtcbiAgICByZXR1cm4gc2lnbih4ID0gK3gpICogTWF0aC5wb3coTWF0aC5hYnMoeCksIDEgLyAzKTtcbiAgfVxufSk7IiwiLy8gMjAuMi4yLjExIE1hdGguY2x6MzIoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgY2x6MzI6IGZ1bmN0aW9uIGNsejMyKHgpe1xuICAgIHJldHVybiAoeCA+Pj49IDApID8gMzEgLSBNYXRoLmZsb29yKE1hdGgubG9nKHggKyAwLjUpICogTWF0aC5MT0cyRSkgOiAzMjtcbiAgfVxufSk7IiwiLy8gMjAuMi4yLjEyIE1hdGguY29zaCh4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGV4cCAgICAgPSBNYXRoLmV4cDtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICBjb3NoOiBmdW5jdGlvbiBjb3NoKHgpe1xuICAgIHJldHVybiAoZXhwKHggPSAreCkgKyBleHAoLXgpKSAvIDI7XG4gIH1cbn0pOyIsIi8vIDIwLjIuMi4xNCBNYXRoLmV4cG0xKHgpXG52YXIgJGV4cG0xID0gTWF0aC5leHBtMTtcbm1vZHVsZS5leHBvcnRzID0gKCEkZXhwbTFcbiAgLy8gT2xkIEZGIGJ1Z1xuICB8fCAkZXhwbTEoMTApID4gMjIwMjUuNDY1Nzk0ODA2NzE5IHx8ICRleHBtMSgxMCkgPCAyMjAyNS40NjU3OTQ4MDY3MTY1MTY4XG4gIC8vIFRvciBCcm93c2VyIGJ1Z1xuICB8fCAkZXhwbTEoLTJlLTE3KSAhPSAtMmUtMTdcbikgPyBmdW5jdGlvbiBleHBtMSh4KXtcbiAgcmV0dXJuICh4ID0gK3gpID09IDAgPyB4IDogeCA+IC0xZS02ICYmIHggPCAxZS02ID8geCArIHggKiB4IC8gMiA6IE1hdGguZXhwKHgpIC0gMTtcbn0gOiAkZXhwbTE7IiwiLy8gMjAuMi4yLjE0IE1hdGguZXhwbTEoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkZXhwbTEgID0gcmVxdWlyZSgnLi9fbWF0aC1leHBtMScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICgkZXhwbTEgIT0gTWF0aC5leHBtMSksICdNYXRoJywge2V4cG0xOiAkZXhwbTF9KTsiLCIvLyAyMC4yLjIuMTYgTWF0aC5mcm91bmQoeClcbnZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHNpZ24gICAgICA9IHJlcXVpcmUoJy4vX21hdGgtc2lnbicpXG4gICwgcG93ICAgICAgID0gTWF0aC5wb3dcbiAgLCBFUFNJTE9OICAgPSBwb3coMiwgLTUyKVxuICAsIEVQU0lMT04zMiA9IHBvdygyLCAtMjMpXG4gICwgTUFYMzIgICAgID0gcG93KDIsIDEyNykgKiAoMiAtIEVQU0lMT04zMilcbiAgLCBNSU4zMiAgICAgPSBwb3coMiwgLTEyNik7XG5cbnZhciByb3VuZFRpZXNUb0V2ZW4gPSBmdW5jdGlvbihuKXtcbiAgcmV0dXJuIG4gKyAxIC8gRVBTSUxPTiAtIDEgLyBFUFNJTE9OO1xufTtcblxuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIGZyb3VuZDogZnVuY3Rpb24gZnJvdW5kKHgpe1xuICAgIHZhciAkYWJzICA9IE1hdGguYWJzKHgpXG4gICAgICAsICRzaWduID0gc2lnbih4KVxuICAgICAgLCBhLCByZXN1bHQ7XG4gICAgaWYoJGFicyA8IE1JTjMyKXJldHVybiAkc2lnbiAqIHJvdW5kVGllc1RvRXZlbigkYWJzIC8gTUlOMzIgLyBFUFNJTE9OMzIpICogTUlOMzIgKiBFUFNJTE9OMzI7XG4gICAgYSA9ICgxICsgRVBTSUxPTjMyIC8gRVBTSUxPTikgKiAkYWJzO1xuICAgIHJlc3VsdCA9IGEgLSAoYSAtICRhYnMpO1xuICAgIGlmKHJlc3VsdCA+IE1BWDMyIHx8IHJlc3VsdCAhPSByZXN1bHQpcmV0dXJuICRzaWduICogSW5maW5pdHk7XG4gICAgcmV0dXJuICRzaWduICogcmVzdWx0O1xuICB9XG59KTsiLCIvLyAyMC4yLjIuMTcgTWF0aC5oeXBvdChbdmFsdWUxWywgdmFsdWUyWywg4oCmIF1dXSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBhYnMgICAgID0gTWF0aC5hYnM7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgaHlwb3Q6IGZ1bmN0aW9uIGh5cG90KHZhbHVlMSwgdmFsdWUyKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIHZhciBzdW0gID0gMFxuICAgICAgLCBpICAgID0gMFxuICAgICAgLCBhTGVuID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLCBsYXJnID0gMFxuICAgICAgLCBhcmcsIGRpdjtcbiAgICB3aGlsZShpIDwgYUxlbil7XG4gICAgICBhcmcgPSBhYnMoYXJndW1lbnRzW2krK10pO1xuICAgICAgaWYobGFyZyA8IGFyZyl7XG4gICAgICAgIGRpdiAgPSBsYXJnIC8gYXJnO1xuICAgICAgICBzdW0gID0gc3VtICogZGl2ICogZGl2ICsgMTtcbiAgICAgICAgbGFyZyA9IGFyZztcbiAgICAgIH0gZWxzZSBpZihhcmcgPiAwKXtcbiAgICAgICAgZGl2ICA9IGFyZyAvIGxhcmc7XG4gICAgICAgIHN1bSArPSBkaXYgKiBkaXY7XG4gICAgICB9IGVsc2Ugc3VtICs9IGFyZztcbiAgICB9XG4gICAgcmV0dXJuIGxhcmcgPT09IEluZmluaXR5ID8gSW5maW5pdHkgOiBsYXJnICogTWF0aC5zcXJ0KHN1bSk7XG4gIH1cbn0pOyIsIi8vIDIwLjIuMi4xOCBNYXRoLmltdWwoeCwgeSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkaW11bCAgID0gTWF0aC5pbXVsO1xuXG4vLyBzb21lIFdlYktpdCB2ZXJzaW9ucyBmYWlscyB3aXRoIGJpZyBudW1iZXJzLCBzb21lIGhhcyB3cm9uZyBhcml0eVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiAkaW11bCgweGZmZmZmZmZmLCA1KSAhPSAtNSB8fCAkaW11bC5sZW5ndGggIT0gMjtcbn0pLCAnTWF0aCcsIHtcbiAgaW11bDogZnVuY3Rpb24gaW11bCh4LCB5KXtcbiAgICB2YXIgVUlOVDE2ID0gMHhmZmZmXG4gICAgICAsIHhuID0gK3hcbiAgICAgICwgeW4gPSAreVxuICAgICAgLCB4bCA9IFVJTlQxNiAmIHhuXG4gICAgICAsIHlsID0gVUlOVDE2ICYgeW47XG4gICAgcmV0dXJuIDAgfCB4bCAqIHlsICsgKChVSU5UMTYgJiB4biA+Pj4gMTYpICogeWwgKyB4bCAqIChVSU5UMTYgJiB5biA+Pj4gMTYpIDw8IDE2ID4+PiAwKTtcbiAgfVxufSk7IiwiLy8gMjAuMi4yLjIxIE1hdGgubG9nMTAoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgbG9nMTA6IGZ1bmN0aW9uIGxvZzEwKHgpe1xuICAgIHJldHVybiBNYXRoLmxvZyh4KSAvIE1hdGguTE4xMDtcbiAgfVxufSk7IiwiLy8gMjAuMi4yLjIwIE1hdGgubG9nMXAoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtsb2cxcDogcmVxdWlyZSgnLi9fbWF0aC1sb2cxcCcpfSk7IiwiLy8gMjAuMi4yLjIyIE1hdGgubG9nMih4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICBsb2cyOiBmdW5jdGlvbiBsb2cyKHgpe1xuICAgIHJldHVybiBNYXRoLmxvZyh4KSAvIE1hdGguTE4yO1xuICB9XG59KTsiLCIvLyAyMC4yLjIuMjggTWF0aC5zaWduKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7c2lnbjogcmVxdWlyZSgnLi9fbWF0aC1zaWduJyl9KTsiLCIvLyAyMC4yLjIuMzAgTWF0aC5zaW5oKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgZXhwbTEgICA9IHJlcXVpcmUoJy4vX21hdGgtZXhwbTEnKVxuICAsIGV4cCAgICAgPSBNYXRoLmV4cDtcblxuLy8gVjggbmVhciBDaHJvbWl1bSAzOCBoYXMgYSBwcm9ibGVtIHdpdGggdmVyeSBzbWFsbCBudW1iZXJzXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuICFNYXRoLnNpbmgoLTJlLTE3KSAhPSAtMmUtMTc7XG59KSwgJ01hdGgnLCB7XG4gIHNpbmg6IGZ1bmN0aW9uIHNpbmgoeCl7XG4gICAgcmV0dXJuIE1hdGguYWJzKHggPSAreCkgPCAxXG4gICAgICA/IChleHBtMSh4KSAtIGV4cG0xKC14KSkgLyAyXG4gICAgICA6IChleHAoeCAtIDEpIC0gZXhwKC14IC0gMSkpICogKE1hdGguRSAvIDIpO1xuICB9XG59KTsiLCIvLyAyMC4yLjIuMzMgTWF0aC50YW5oKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgZXhwbTEgICA9IHJlcXVpcmUoJy4vX21hdGgtZXhwbTEnKVxuICAsIGV4cCAgICAgPSBNYXRoLmV4cDtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICB0YW5oOiBmdW5jdGlvbiB0YW5oKHgpe1xuICAgIHZhciBhID0gZXhwbTEoeCA9ICt4KVxuICAgICAgLCBiID0gZXhwbTEoLXgpO1xuICAgIHJldHVybiBhID09IEluZmluaXR5ID8gMSA6IGIgPT0gSW5maW5pdHkgPyAtMSA6IChhIC0gYikgLyAoZXhwKHgpICsgZXhwKC14KSk7XG4gIH1cbn0pOyIsIi8vIDIwLjIuMi4zNCBNYXRoLnRydW5jKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIHRydW5jOiBmdW5jdGlvbiB0cnVuYyhpdCl7XG4gICAgcmV0dXJuIChpdCA+IDAgPyBNYXRoLmZsb29yIDogTWF0aC5jZWlsKShpdCk7XG4gIH1cbn0pOyIsInZhciAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgdG9JbmRleCAgICAgICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpXG4gICwgZnJvbUNoYXJDb2RlICAgPSBTdHJpbmcuZnJvbUNoYXJDb2RlXG4gICwgJGZyb21Db2RlUG9pbnQgPSBTdHJpbmcuZnJvbUNvZGVQb2ludDtcblxuLy8gbGVuZ3RoIHNob3VsZCBiZSAxLCBvbGQgRkYgcHJvYmxlbVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoISEkZnJvbUNvZGVQb2ludCAmJiAkZnJvbUNvZGVQb2ludC5sZW5ndGggIT0gMSksICdTdHJpbmcnLCB7XG4gIC8vIDIxLjEuMi4yIFN0cmluZy5mcm9tQ29kZVBvaW50KC4uLmNvZGVQb2ludHMpXG4gIGZyb21Db2RlUG9pbnQ6IGZ1bmN0aW9uIGZyb21Db2RlUG9pbnQoeCl7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICB2YXIgcmVzICA9IFtdXG4gICAgICAsIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIGkgICAgPSAwXG4gICAgICAsIGNvZGU7XG4gICAgd2hpbGUoYUxlbiA+IGkpe1xuICAgICAgY29kZSA9ICthcmd1bWVudHNbaSsrXTtcbiAgICAgIGlmKHRvSW5kZXgoY29kZSwgMHgxMGZmZmYpICE9PSBjb2RlKXRocm93IFJhbmdlRXJyb3IoY29kZSArICcgaXMgbm90IGEgdmFsaWQgY29kZSBwb2ludCcpO1xuICAgICAgcmVzLnB1c2goY29kZSA8IDB4MTAwMDBcbiAgICAgICAgPyBmcm9tQ2hhckNvZGUoY29kZSlcbiAgICAgICAgOiBmcm9tQ2hhckNvZGUoKChjb2RlIC09IDB4MTAwMDApID4+IDEwKSArIDB4ZDgwMCwgY29kZSAlIDB4NDAwICsgMHhkYzAwKVxuICAgICAgKTtcbiAgICB9IHJldHVybiByZXMuam9pbignJyk7XG4gIH1cbn0pOyIsInZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1N0cmluZycsIHtcbiAgLy8gMjEuMS4yLjQgU3RyaW5nLnJhdyhjYWxsU2l0ZSwgLi4uc3Vic3RpdHV0aW9ucylcbiAgcmF3OiBmdW5jdGlvbiByYXcoY2FsbFNpdGUpe1xuICAgIHZhciB0cGwgID0gdG9JT2JqZWN0KGNhbGxTaXRlLnJhdylcbiAgICAgICwgbGVuICA9IHRvTGVuZ3RoKHRwbC5sZW5ndGgpXG4gICAgICAsIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIHJlcyAgPSBbXVxuICAgICAgLCBpICAgID0gMDtcbiAgICB3aGlsZShsZW4gPiBpKXtcbiAgICAgIHJlcy5wdXNoKFN0cmluZyh0cGxbaSsrXSkpO1xuICAgICAgaWYoaSA8IGFMZW4pcmVzLnB1c2goU3RyaW5nKGFyZ3VtZW50c1tpXSkpO1xuICAgIH0gcmV0dXJuIHJlcy5qb2luKCcnKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjEuMS4zLjI1IFN0cmluZy5wcm90b3R5cGUudHJpbSgpXG5yZXF1aXJlKCcuL19zdHJpbmctdHJpbScpKCd0cmltJywgZnVuY3Rpb24oJHRyaW0pe1xuICByZXR1cm4gZnVuY3Rpb24gdHJpbSgpe1xuICAgIHJldHVybiAkdHJpbSh0aGlzLCAzKTtcbiAgfTtcbn0pOyIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUT19TVFJJTkcpe1xuICByZXR1cm4gZnVuY3Rpb24odGhhdCwgcG9zKXtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKVxuICAgICAgLCBpID0gdG9JbnRlZ2VyKHBvcylcbiAgICAgICwgbCA9IHMubGVuZ3RoXG4gICAgICAsIGEsIGI7XG4gICAgaWYoaSA8IDAgfHwgaSA+PSBsKXJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59OyIsIm1vZHVsZS5leHBvcnRzID0ge307IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZGVzY3JpcHRvciAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KXtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7bmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KX0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIGhpZGUgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIEl0ZXJhdG9ycyAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCAkaXRlckNyZWF0ZSAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKVxuICAsIElURVJBVE9SICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBCVUdHWSAgICAgICAgICA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKSAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG4gICwgRkZfSVRFUkFUT1IgICAgPSAnQEBpdGVyYXRvcidcbiAgLCBLRVlTICAgICAgICAgICA9ICdrZXlzJ1xuICAsIFZBTFVFUyAgICAgICAgID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKXtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24oa2luZCl7XG4gICAgaWYoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaChraW5kKXtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHICAgICAgICA9IE5BTUUgKyAnIEl0ZXJhdG9yJ1xuICAgICwgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTXG4gICAgLCBWQUxVRVNfQlVHID0gZmFsc2VcbiAgICAsIHByb3RvICAgICAgPSBCYXNlLnByb3RvdHlwZVxuICAgICwgJG5hdGl2ZSAgICA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXVxuICAgICwgJGRlZmF1bHQgICA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpXG4gICAgLCAkZW50cmllcyAgID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZFxuICAgICwgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmVcbiAgICAsIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYoJGFueU5hdGl2ZSl7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UpKTtcbiAgICBpZihJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSl7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYoIUxJQlJBUlkgJiYgIWhhcyhJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IpKWhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZihERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpe1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKXtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddICA9IHJldHVyblRoaXM7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6ICBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6ICAgIElTX1NFVCAgICAgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZihGT1JDRUQpZm9yKGtleSBpbiBtZXRob2RzKXtcbiAgICAgIGlmKCEoa2V5IGluIHByb3RvKSlyZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciAkYXQgID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24oaXRlcmF0ZWQpe1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBpbmRleCA9IHRoaXMuX2lcbiAgICAsIHBvaW50O1xuICBpZihpbmRleCA+PSBPLmxlbmd0aClyZXR1cm4ge3ZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWV9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4ge3ZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2V9O1xufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRhdCAgICAgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKShmYWxzZSk7XG4kZXhwb3J0KCRleHBvcnQuUCwgJ1N0cmluZycsIHtcbiAgLy8gMjEuMS4zLjMgU3RyaW5nLnByb3RvdHlwZS5jb2RlUG9pbnRBdChwb3MpXG4gIGNvZGVQb2ludEF0OiBmdW5jdGlvbiBjb2RlUG9pbnRBdChwb3Mpe1xuICAgIHJldHVybiAkYXQodGhpcywgcG9zKTtcbiAgfVxufSk7IiwiLy8gNy4yLjggSXNSZWdFeHAoYXJndW1lbnQpXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGNvZiAgICAgID0gcmVxdWlyZSgnLi9fY29mJylcbiAgLCBNQVRDSCAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdtYXRjaCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBpc1JlZ0V4cDtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiAoKGlzUmVnRXhwID0gaXRbTUFUQ0hdKSAhPT0gdW5kZWZpbmVkID8gISFpc1JlZ0V4cCA6IGNvZihpdCkgPT0gJ1JlZ0V4cCcpO1xufTsiLCIvLyBoZWxwZXIgZm9yIFN0cmluZyN7c3RhcnRzV2l0aCwgZW5kc1dpdGgsIGluY2x1ZGVzfVxudmFyIGlzUmVnRXhwID0gcmVxdWlyZSgnLi9faXMtcmVnZXhwJylcbiAgLCBkZWZpbmVkICA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0aGF0LCBzZWFyY2hTdHJpbmcsIE5BTUUpe1xuICBpZihpc1JlZ0V4cChzZWFyY2hTdHJpbmcpKXRocm93IFR5cGVFcnJvcignU3RyaW5nIycgKyBOQU1FICsgXCIgZG9lc24ndCBhY2NlcHQgcmVnZXghXCIpO1xuICByZXR1cm4gU3RyaW5nKGRlZmluZWQodGhhdCkpO1xufTsiLCJ2YXIgTUFUQ0ggPSByZXF1aXJlKCcuL193a3MnKSgnbWF0Y2gnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZKXtcbiAgdmFyIHJlID0gLy4vO1xuICB0cnkge1xuICAgICcvLi8nW0tFWV0ocmUpO1xuICB9IGNhdGNoKGUpe1xuICAgIHRyeSB7XG4gICAgICByZVtNQVRDSF0gPSBmYWxzZTtcbiAgICAgIHJldHVybiAhJy8uLydbS0VZXShyZSk7XG4gICAgfSBjYXRjaChmKXsgLyogZW1wdHkgKi8gfVxuICB9IHJldHVybiB0cnVlO1xufTsiLCIvLyAyMS4xLjMuNiBTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoKHNlYXJjaFN0cmluZyBbLCBlbmRQb3NpdGlvbl0pXG4ndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCB0b0xlbmd0aCAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGNvbnRleHQgICA9IHJlcXVpcmUoJy4vX3N0cmluZy1jb250ZXh0JylcbiAgLCBFTkRTX1dJVEggPSAnZW5kc1dpdGgnXG4gICwgJGVuZHNXaXRoID0gJydbRU5EU19XSVRIXTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiByZXF1aXJlKCcuL19mYWlscy1pcy1yZWdleHAnKShFTkRTX1dJVEgpLCAnU3RyaW5nJywge1xuICBlbmRzV2l0aDogZnVuY3Rpb24gZW5kc1dpdGgoc2VhcmNoU3RyaW5nIC8qLCBlbmRQb3NpdGlvbiA9IEBsZW5ndGggKi8pe1xuICAgIHZhciB0aGF0ID0gY29udGV4dCh0aGlzLCBzZWFyY2hTdHJpbmcsIEVORFNfV0lUSClcbiAgICAgICwgZW5kUG9zaXRpb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZFxuICAgICAgLCBsZW4gICAgPSB0b0xlbmd0aCh0aGF0Lmxlbmd0aClcbiAgICAgICwgZW5kICAgID0gZW5kUG9zaXRpb24gPT09IHVuZGVmaW5lZCA/IGxlbiA6IE1hdGgubWluKHRvTGVuZ3RoKGVuZFBvc2l0aW9uKSwgbGVuKVxuICAgICAgLCBzZWFyY2ggPSBTdHJpbmcoc2VhcmNoU3RyaW5nKTtcbiAgICByZXR1cm4gJGVuZHNXaXRoXG4gICAgICA/ICRlbmRzV2l0aC5jYWxsKHRoYXQsIHNlYXJjaCwgZW5kKVxuICAgICAgOiB0aGF0LnNsaWNlKGVuZCAtIHNlYXJjaC5sZW5ndGgsIGVuZCkgPT09IHNlYXJjaDtcbiAgfVxufSk7IiwiLy8gMjEuMS4zLjcgU3RyaW5nLnByb3RvdHlwZS5pbmNsdWRlcyhzZWFyY2hTdHJpbmcsIHBvc2l0aW9uID0gMClcbid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgY29udGV4dCAgPSByZXF1aXJlKCcuL19zdHJpbmctY29udGV4dCcpXG4gICwgSU5DTFVERVMgPSAnaW5jbHVkZXMnO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vX2ZhaWxzLWlzLXJlZ2V4cCcpKElOQ0xVREVTKSwgJ1N0cmluZycsIHtcbiAgaW5jbHVkZXM6IGZ1bmN0aW9uIGluY2x1ZGVzKHNlYXJjaFN0cmluZyAvKiwgcG9zaXRpb24gPSAwICovKXtcbiAgICByZXR1cm4gISF+Y29udGV4dCh0aGlzLCBzZWFyY2hTdHJpbmcsIElOQ0xVREVTKVxuICAgICAgLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pOyIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QLCAnU3RyaW5nJywge1xuICAvLyAyMS4xLjMuMTMgU3RyaW5nLnByb3RvdHlwZS5yZXBlYXQoY291bnQpXG4gIHJlcGVhdDogcmVxdWlyZSgnLi9fc3RyaW5nLXJlcGVhdCcpXG59KTsiLCIvLyAyMS4xLjMuMTggU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoKHNlYXJjaFN0cmluZyBbLCBwb3NpdGlvbiBdKVxuJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCB0b0xlbmd0aCAgICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgY29udGV4dCAgICAgPSByZXF1aXJlKCcuL19zdHJpbmctY29udGV4dCcpXG4gICwgU1RBUlRTX1dJVEggPSAnc3RhcnRzV2l0aCdcbiAgLCAkc3RhcnRzV2l0aCA9ICcnW1NUQVJUU19XSVRIXTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiByZXF1aXJlKCcuL19mYWlscy1pcy1yZWdleHAnKShTVEFSVFNfV0lUSCksICdTdHJpbmcnLCB7XG4gIHN0YXJ0c1dpdGg6IGZ1bmN0aW9uIHN0YXJ0c1dpdGgoc2VhcmNoU3RyaW5nIC8qLCBwb3NpdGlvbiA9IDAgKi8pe1xuICAgIHZhciB0aGF0ICAgPSBjb250ZXh0KHRoaXMsIHNlYXJjaFN0cmluZywgU1RBUlRTX1dJVEgpXG4gICAgICAsIGluZGV4ICA9IHRvTGVuZ3RoKE1hdGgubWluKGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkLCB0aGF0Lmxlbmd0aCkpXG4gICAgICAsIHNlYXJjaCA9IFN0cmluZyhzZWFyY2hTdHJpbmcpO1xuICAgIHJldHVybiAkc3RhcnRzV2l0aFxuICAgICAgPyAkc3RhcnRzV2l0aC5jYWxsKHRoYXQsIHNlYXJjaCwgaW5kZXgpXG4gICAgICA6IHRoYXQuc2xpY2UoaW5kZXgsIGluZGV4ICsgc2VhcmNoLmxlbmd0aCkgPT09IHNlYXJjaDtcbiAgfVxufSk7IiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGZhaWxzICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKVxuICAsIHF1b3QgICAgPSAvXCIvZztcbi8vIEIuMi4zLjIuMSBDcmVhdGVIVE1MKHN0cmluZywgdGFnLCBhdHRyaWJ1dGUsIHZhbHVlKVxudmFyIGNyZWF0ZUhUTUwgPSBmdW5jdGlvbihzdHJpbmcsIHRhZywgYXR0cmlidXRlLCB2YWx1ZSkge1xuICB2YXIgUyAgPSBTdHJpbmcoZGVmaW5lZChzdHJpbmcpKVxuICAgICwgcDEgPSAnPCcgKyB0YWc7XG4gIGlmKGF0dHJpYnV0ZSAhPT0gJycpcDEgKz0gJyAnICsgYXR0cmlidXRlICsgJz1cIicgKyBTdHJpbmcodmFsdWUpLnJlcGxhY2UocXVvdCwgJyZxdW90OycpICsgJ1wiJztcbiAgcmV0dXJuIHAxICsgJz4nICsgUyArICc8LycgKyB0YWcgKyAnPic7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihOQU1FLCBleGVjKXtcbiAgdmFyIE8gPSB7fTtcbiAgT1tOQU1FXSA9IGV4ZWMoY3JlYXRlSFRNTCk7XG4gICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24oKXtcbiAgICB2YXIgdGVzdCA9ICcnW05BTUVdKCdcIicpO1xuICAgIHJldHVybiB0ZXN0ICE9PSB0ZXN0LnRvTG93ZXJDYXNlKCkgfHwgdGVzdC5zcGxpdCgnXCInKS5sZW5ndGggPiAzO1xuICB9KSwgJ1N0cmluZycsIE8pO1xufTsiLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy4yIFN0cmluZy5wcm90b3R5cGUuYW5jaG9yKG5hbWUpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdhbmNob3InLCBmdW5jdGlvbihjcmVhdGVIVE1MKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGFuY2hvcihuYW1lKXtcbiAgICByZXR1cm4gY3JlYXRlSFRNTCh0aGlzLCAnYScsICduYW1lJywgbmFtZSk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjMgU3RyaW5nLnByb3RvdHlwZS5iaWcoKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnYmlnJywgZnVuY3Rpb24oY3JlYXRlSFRNTCl7XG4gIHJldHVybiBmdW5jdGlvbiBiaWcoKXtcbiAgICByZXR1cm4gY3JlYXRlSFRNTCh0aGlzLCAnYmlnJywgJycsICcnKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gQi4yLjMuNCBTdHJpbmcucHJvdG90eXBlLmJsaW5rKClcbnJlcXVpcmUoJy4vX3N0cmluZy1odG1sJykoJ2JsaW5rJywgZnVuY3Rpb24oY3JlYXRlSFRNTCl7XG4gIHJldHVybiBmdW5jdGlvbiBibGluaygpe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdibGluaycsICcnLCAnJyk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjUgU3RyaW5nLnByb3RvdHlwZS5ib2xkKClcbnJlcXVpcmUoJy4vX3N0cmluZy1odG1sJykoJ2JvbGQnLCBmdW5jdGlvbihjcmVhdGVIVE1MKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGJvbGQoKXtcbiAgICByZXR1cm4gY3JlYXRlSFRNTCh0aGlzLCAnYicsICcnLCAnJyk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjYgU3RyaW5nLnByb3RvdHlwZS5maXhlZCgpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdmaXhlZCcsIGZ1bmN0aW9uKGNyZWF0ZUhUTUwpe1xuICByZXR1cm4gZnVuY3Rpb24gZml4ZWQoKXtcbiAgICByZXR1cm4gY3JlYXRlSFRNTCh0aGlzLCAndHQnLCAnJywgJycpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy43IFN0cmluZy5wcm90b3R5cGUuZm9udGNvbG9yKGNvbG9yKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnZm9udGNvbG9yJywgZnVuY3Rpb24oY3JlYXRlSFRNTCl7XG4gIHJldHVybiBmdW5jdGlvbiBmb250Y29sb3IoY29sb3Ipe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdmb250JywgJ2NvbG9yJywgY29sb3IpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy44IFN0cmluZy5wcm90b3R5cGUuZm9udHNpemUoc2l6ZSlcbnJlcXVpcmUoJy4vX3N0cmluZy1odG1sJykoJ2ZvbnRzaXplJywgZnVuY3Rpb24oY3JlYXRlSFRNTCl7XG4gIHJldHVybiBmdW5jdGlvbiBmb250c2l6ZShzaXplKXtcbiAgICByZXR1cm4gY3JlYXRlSFRNTCh0aGlzLCAnZm9udCcsICdzaXplJywgc2l6ZSk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjkgU3RyaW5nLnByb3RvdHlwZS5pdGFsaWNzKClcbnJlcXVpcmUoJy4vX3N0cmluZy1odG1sJykoJ2l0YWxpY3MnLCBmdW5jdGlvbihjcmVhdGVIVE1MKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGl0YWxpY3MoKXtcbiAgICByZXR1cm4gY3JlYXRlSFRNTCh0aGlzLCAnaScsICcnLCAnJyk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjEwIFN0cmluZy5wcm90b3R5cGUubGluayh1cmwpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdsaW5rJywgZnVuY3Rpb24oY3JlYXRlSFRNTCl7XG4gIHJldHVybiBmdW5jdGlvbiBsaW5rKHVybCl7XG4gICAgcmV0dXJuIGNyZWF0ZUhUTUwodGhpcywgJ2EnLCAnaHJlZicsIHVybCk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjExIFN0cmluZy5wcm90b3R5cGUuc21hbGwoKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnc21hbGwnLCBmdW5jdGlvbihjcmVhdGVIVE1MKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHNtYWxsKCl7XG4gICAgcmV0dXJuIGNyZWF0ZUhUTUwodGhpcywgJ3NtYWxsJywgJycsICcnKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gQi4yLjMuMTIgU3RyaW5nLnByb3RvdHlwZS5zdHJpa2UoKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnc3RyaWtlJywgZnVuY3Rpb24oY3JlYXRlSFRNTCl7XG4gIHJldHVybiBmdW5jdGlvbiBzdHJpa2UoKXtcbiAgICByZXR1cm4gY3JlYXRlSFRNTCh0aGlzLCAnc3RyaWtlJywgJycsICcnKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gQi4yLjMuMTMgU3RyaW5nLnByb3RvdHlwZS5zdWIoKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnc3ViJywgZnVuY3Rpb24oY3JlYXRlSFRNTCl7XG4gIHJldHVybiBmdW5jdGlvbiBzdWIoKXtcbiAgICByZXR1cm4gY3JlYXRlSFRNTCh0aGlzLCAnc3ViJywgJycsICcnKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gQi4yLjMuMTQgU3RyaW5nLnByb3RvdHlwZS5zdXAoKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnc3VwJywgZnVuY3Rpb24oY3JlYXRlSFRNTCl7XG4gIHJldHVybiBmdW5jdGlvbiBzdXAoKXtcbiAgICByZXR1cm4gY3JlYXRlSFRNTCh0aGlzLCAnc3VwJywgJycsICcnKTtcbiAgfVxufSk7IiwiLy8gMjAuMy4zLjEgLyAxNS45LjQuNCBEYXRlLm5vdygpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ0RhdGUnLCB7bm93OiBmdW5jdGlvbigpeyByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7IH19KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHRvT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIG5ldyBEYXRlKE5hTikudG9KU09OKCkgIT09IG51bGwgfHwgRGF0ZS5wcm90b3R5cGUudG9KU09OLmNhbGwoe3RvSVNPU3RyaW5nOiBmdW5jdGlvbigpeyByZXR1cm4gMTsgfX0pICE9PSAxO1xufSksICdEYXRlJywge1xuICB0b0pTT046IGZ1bmN0aW9uIHRvSlNPTihrZXkpe1xuICAgIHZhciBPICA9IHRvT2JqZWN0KHRoaXMpXG4gICAgICAsIHB2ID0gdG9QcmltaXRpdmUoTyk7XG4gICAgcmV0dXJuIHR5cGVvZiBwdiA9PSAnbnVtYmVyJyAmJiAhaXNGaW5pdGUocHYpID8gbnVsbCA6IE8udG9JU09TdHJpbmcoKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjAuMy40LjM2IC8gMTUuOS41LjQzIERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nKClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBmYWlscyAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAsIGdldFRpbWUgPSBEYXRlLnByb3RvdHlwZS5nZXRUaW1lO1xuXG52YXIgbHogPSBmdW5jdGlvbihudW0pe1xuICByZXR1cm4gbnVtID4gOSA/IG51bSA6ICcwJyArIG51bTtcbn07XG5cbi8vIFBoYW50b21KUyAvIG9sZCBXZWJLaXQgaGFzIGEgYnJva2VuIGltcGxlbWVudGF0aW9uc1xuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoZmFpbHMoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIG5ldyBEYXRlKC01ZTEzIC0gMSkudG9JU09TdHJpbmcoKSAhPSAnMDM4NS0wNy0yNVQwNzowNjozOS45OTlaJztcbn0pIHx8ICFmYWlscyhmdW5jdGlvbigpe1xuICBuZXcgRGF0ZShOYU4pLnRvSVNPU3RyaW5nKCk7XG59KSksICdEYXRlJywge1xuICB0b0lTT1N0cmluZzogZnVuY3Rpb24gdG9JU09TdHJpbmcoKXtcbiAgICBpZighaXNGaW5pdGUoZ2V0VGltZS5jYWxsKHRoaXMpKSl0aHJvdyBSYW5nZUVycm9yKCdJbnZhbGlkIHRpbWUgdmFsdWUnKTtcbiAgICB2YXIgZCA9IHRoaXNcbiAgICAgICwgeSA9IGQuZ2V0VVRDRnVsbFllYXIoKVxuICAgICAgLCBtID0gZC5nZXRVVENNaWxsaXNlY29uZHMoKVxuICAgICAgLCBzID0geSA8IDAgPyAnLScgOiB5ID4gOTk5OSA/ICcrJyA6ICcnO1xuICAgIHJldHVybiBzICsgKCcwMDAwMCcgKyBNYXRoLmFicyh5KSkuc2xpY2UocyA/IC02IDogLTQpICtcbiAgICAgICctJyArIGx6KGQuZ2V0VVRDTW9udGgoKSArIDEpICsgJy0nICsgbHooZC5nZXRVVENEYXRlKCkpICtcbiAgICAgICdUJyArIGx6KGQuZ2V0VVRDSG91cnMoKSkgKyAnOicgKyBseihkLmdldFVUQ01pbnV0ZXMoKSkgK1xuICAgICAgJzonICsgbHooZC5nZXRVVENTZWNvbmRzKCkpICsgJy4nICsgKG0gPiA5OSA/IG0gOiAnMCcgKyBseihtKSkgKyAnWic7XG4gIH1cbn0pOyIsInZhciBEYXRlUHJvdG8gICAgPSBEYXRlLnByb3RvdHlwZVxuICAsIElOVkFMSURfREFURSA9ICdJbnZhbGlkIERhdGUnXG4gICwgVE9fU1RSSU5HICAgID0gJ3RvU3RyaW5nJ1xuICAsICR0b1N0cmluZyAgICA9IERhdGVQcm90b1tUT19TVFJJTkddXG4gICwgZ2V0VGltZSAgICAgID0gRGF0ZVByb3RvLmdldFRpbWU7XG5pZihuZXcgRGF0ZShOYU4pICsgJycgIT0gSU5WQUxJRF9EQVRFKXtcbiAgcmVxdWlyZSgnLi9fcmVkZWZpbmUnKShEYXRlUHJvdG8sIFRPX1NUUklORywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICB2YXIgdmFsdWUgPSBnZXRUaW1lLmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSA/ICR0b1N0cmluZy5jYWxsKHRoaXMpIDogSU5WQUxJRF9EQVRFO1xuICB9KTtcbn0iLCIndXNlIHN0cmljdCc7XG52YXIgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBOVU1CRVIgICAgICA9ICdudW1iZXInO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGhpbnQpe1xuICBpZihoaW50ICE9PSAnc3RyaW5nJyAmJiBoaW50ICE9PSBOVU1CRVIgJiYgaGludCAhPT0gJ2RlZmF1bHQnKXRocm93IFR5cGVFcnJvcignSW5jb3JyZWN0IGhpbnQnKTtcbiAgcmV0dXJuIHRvUHJpbWl0aXZlKGFuT2JqZWN0KHRoaXMpLCBoaW50ICE9IE5VTUJFUik7XG59OyIsInZhciBUT19QUklNSVRJVkUgPSByZXF1aXJlKCcuL193a3MnKSgndG9QcmltaXRpdmUnKVxuICAsIHByb3RvICAgICAgICA9IERhdGUucHJvdG90eXBlO1xuXG5pZighKFRPX1BSSU1JVElWRSBpbiBwcm90bykpcmVxdWlyZSgnLi9faGlkZScpKHByb3RvLCBUT19QUklNSVRJVkUsIHJlcXVpcmUoJy4vX2RhdGUtdG8tcHJpbWl0aXZlJykpOyIsIi8vIDIyLjEuMi4yIC8gMTUuNC4zLjIgQXJyYXkuaXNBcnJheShhcmcpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ0FycmF5Jywge2lzQXJyYXk6IHJlcXVpcmUoJy4vX2lzLWFycmF5Jyl9KTsiLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcbiAgfSBjYXRjaChlKXtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmKHJldCAhPT0gdW5kZWZpbmVkKWFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTsiLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgSVRFUkFUT1IgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIGluZGV4LCB2YWx1ZSl7XG4gIGlmKGluZGV4IGluIG9iamVjdCkkZGVmaW5lUHJvcGVydHkuZihvYmplY3QsIGluZGV4LCBjcmVhdGVEZXNjKDAsIHZhbHVlKSk7XG4gIGVsc2Ugb2JqZWN0W2luZGV4XSA9IHZhbHVlO1xufTsiLCJ2YXIgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgSVRFUkFUT1IgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCAhPSB1bmRlZmluZWQpcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTsiLCJ2YXIgSVRFUkFUT1IgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBTQUZFX0NMT1NJTkcgPSBmYWxzZTtcblxudHJ5IHtcbiAgdmFyIHJpdGVyID0gWzddW0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbigpeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbigpeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjLCBza2lwQ2xvc2luZyl7XG4gIGlmKCFza2lwQ2xvc2luZyAmJiAhU0FGRV9DTE9TSU5HKXJldHVybiBmYWxzZTtcbiAgdmFyIHNhZmUgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyICA9IFs3XVxuICAgICAgLCBpdGVyID0gYXJyW0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uKCl7IHJldHVybiB7ZG9uZTogc2FmZSA9IHRydWV9OyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbigpeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHRvT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBjYWxsICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpXG4gICwgaXNBcnJheUl0ZXIgICAgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJylcbiAgLCB0b0xlbmd0aCAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuL19jcmVhdGUtcHJvcGVydHknKVxuICAsIGdldEl0ZXJGbiAgICAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXsgQXJyYXkuZnJvbShpdGVyKTsgfSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZS8qLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZCovKXtcbiAgICB2YXIgTyAgICAgICA9IHRvT2JqZWN0KGFycmF5TGlrZSlcbiAgICAgICwgQyAgICAgICA9IHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXlcbiAgICAgICwgYUxlbiAgICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgICwgbWFwZm4gICA9IGFMZW4gPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkXG4gICAgICAsIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkXG4gICAgICAsIGluZGV4ICAgPSAwXG4gICAgICAsIGl0ZXJGbiAgPSBnZXRJdGVyRm4oTylcbiAgICAgICwgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmKG1hcHBpbmcpbWFwZm4gPSBjdHgobWFwZm4sIGFMZW4gPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkLCAyKTtcbiAgICAvLyBpZiBvYmplY3QgaXNuJ3QgaXRlcmFibGUgb3IgaXQncyBhcnJheSB3aXRoIGRlZmF1bHQgaXRlcmF0b3IgLSB1c2Ugc2ltcGxlIGNhc2VcbiAgICBpZihpdGVyRm4gIT0gdW5kZWZpbmVkICYmICEoQyA9PSBBcnJheSAmJiBpc0FycmF5SXRlcihpdGVyRm4pKSl7XG4gICAgICBmb3IoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChPKSwgcmVzdWx0ID0gbmV3IEM7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgaW5kZXgrKyl7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBjYWxsKGl0ZXJhdG9yLCBtYXBmbiwgW3N0ZXAudmFsdWUsIGluZGV4XSwgdHJ1ZSkgOiBzdGVwLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgICAgZm9yKHJlc3VsdCA9IG5ldyBDKGxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5sZW5ndGggPSBpbmRleDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuL19jcmVhdGUtcHJvcGVydHknKTtcblxuLy8gV2ViS2l0IEFycmF5Lm9mIGlzbid0IGdlbmVyaWNcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICBmdW5jdGlvbiBGKCl7fVxuICByZXR1cm4gIShBcnJheS5vZi5jYWxsKEYpIGluc3RhbmNlb2YgRik7XG59KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMyBBcnJheS5vZiggLi4uaXRlbXMpXG4gIG9mOiBmdW5jdGlvbiBvZigvKiAuLi5hcmdzICovKXtcbiAgICB2YXIgaW5kZXggID0gMFxuICAgICAgLCBhTGVuICAgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIHJlc3VsdCA9IG5ldyAodHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheSkoYUxlbik7XG4gICAgd2hpbGUoYUxlbiA+IGluZGV4KWNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgcmVzdWx0Lmxlbmd0aCA9IGFMZW47XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7IiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtZXRob2QsIGFyZyl7XG4gIHJldHVybiAhIW1ldGhvZCAmJiBmYWlscyhmdW5jdGlvbigpe1xuICAgIGFyZyA/IG1ldGhvZC5jYWxsKG51bGwsIGZ1bmN0aW9uKCl7fSwgMSkgOiBtZXRob2QuY2FsbChudWxsKTtcbiAgfSk7XG59OyIsIid1c2Ugc3RyaWN0Jztcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUuam9pbihzZXBhcmF0b3IpXG52YXIgJGV4cG9ydCAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBhcnJheUpvaW4gPSBbXS5qb2luO1xuXG4vLyBmYWxsYmFjayBmb3Igbm90IGFycmF5LWxpa2Ugc3RyaW5nc1xuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAocmVxdWlyZSgnLi9faW9iamVjdCcpICE9IE9iamVjdCB8fCAhcmVxdWlyZSgnLi9fc3RyaWN0LW1ldGhvZCcpKGFycmF5Sm9pbikpLCAnQXJyYXknLCB7XG4gIGpvaW46IGZ1bmN0aW9uIGpvaW4oc2VwYXJhdG9yKXtcbiAgICByZXR1cm4gYXJyYXlKb2luLmNhbGwodG9JT2JqZWN0KHRoaXMpLCBzZXBhcmF0b3IgPT09IHVuZGVmaW5lZCA/ICcsJyA6IHNlcGFyYXRvcik7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBodG1sICAgICAgID0gcmVxdWlyZSgnLi9faHRtbCcpXG4gICwgY29mICAgICAgICA9IHJlcXVpcmUoJy4vX2NvZicpXG4gICwgdG9JbmRleCAgICA9IHJlcXVpcmUoJy4vX3RvLWluZGV4JylcbiAgLCB0b0xlbmd0aCAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBhcnJheVNsaWNlID0gW10uc2xpY2U7XG5cbi8vIGZhbGxiYWNrIGZvciBub3QgYXJyYXktbGlrZSBFUzMgc3RyaW5ncyBhbmQgRE9NIG9iamVjdHNcbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICBpZihodG1sKWFycmF5U2xpY2UuY2FsbChodG1sKTtcbn0pLCAnQXJyYXknLCB7XG4gIHNsaWNlOiBmdW5jdGlvbiBzbGljZShiZWdpbiwgZW5kKXtcbiAgICB2YXIgbGVuICAgPSB0b0xlbmd0aCh0aGlzLmxlbmd0aClcbiAgICAgICwga2xhc3MgPSBjb2YodGhpcyk7XG4gICAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiBlbmQ7XG4gICAgaWYoa2xhc3MgPT0gJ0FycmF5JylyZXR1cm4gYXJyYXlTbGljZS5jYWxsKHRoaXMsIGJlZ2luLCBlbmQpO1xuICAgIHZhciBzdGFydCAgPSB0b0luZGV4KGJlZ2luLCBsZW4pXG4gICAgICAsIHVwVG8gICA9IHRvSW5kZXgoZW5kLCBsZW4pXG4gICAgICAsIHNpemUgICA9IHRvTGVuZ3RoKHVwVG8gLSBzdGFydClcbiAgICAgICwgY2xvbmVkID0gQXJyYXkoc2l6ZSlcbiAgICAgICwgaSAgICAgID0gMDtcbiAgICBmb3IoOyBpIDwgc2l6ZTsgaSsrKWNsb25lZFtpXSA9IGtsYXNzID09ICdTdHJpbmcnXG4gICAgICA/IHRoaXMuY2hhckF0KHN0YXJ0ICsgaSlcbiAgICAgIDogdGhpc1tzdGFydCArIGldO1xuICAgIHJldHVybiBjbG9uZWQ7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsIHRvT2JqZWN0ICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgZmFpbHMgICAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAsICRzb3J0ICAgICA9IFtdLnNvcnRcbiAgLCB0ZXN0ICAgICAgPSBbMSwgMiwgM107XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKGZhaWxzKGZ1bmN0aW9uKCl7XG4gIC8vIElFOC1cbiAgdGVzdC5zb3J0KHVuZGVmaW5lZCk7XG59KSB8fCAhZmFpbHMoZnVuY3Rpb24oKXtcbiAgLy8gVjggYnVnXG4gIHRlc3Quc29ydChudWxsKTtcbiAgLy8gT2xkIFdlYktpdFxufSkgfHwgIXJlcXVpcmUoJy4vX3N0cmljdC1tZXRob2QnKSgkc29ydCkpLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMy4yNSBBcnJheS5wcm90b3R5cGUuc29ydChjb21wYXJlZm4pXG4gIHNvcnQ6IGZ1bmN0aW9uIHNvcnQoY29tcGFyZWZuKXtcbiAgICByZXR1cm4gY29tcGFyZWZuID09PSB1bmRlZmluZWRcbiAgICAgID8gJHNvcnQuY2FsbCh0b09iamVjdCh0aGlzKSlcbiAgICAgIDogJHNvcnQuY2FsbCh0b09iamVjdCh0aGlzKSwgYUZ1bmN0aW9uKGNvbXBhcmVmbikpO1xuICB9XG59KTsiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGlzQXJyYXkgID0gcmVxdWlyZSgnLi9faXMtYXJyYXknKVxuICAsIFNQRUNJRVMgID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcmlnaW5hbCl7XG4gIHZhciBDO1xuICBpZihpc0FycmF5KG9yaWdpbmFsKSl7XG4gICAgQyA9IG9yaWdpbmFsLmNvbnN0cnVjdG9yO1xuICAgIC8vIGNyb3NzLXJlYWxtIGZhbGxiYWNrXG4gICAgaWYodHlwZW9mIEMgPT0gJ2Z1bmN0aW9uJyAmJiAoQyA9PT0gQXJyYXkgfHwgaXNBcnJheShDLnByb3RvdHlwZSkpKUMgPSB1bmRlZmluZWQ7XG4gICAgaWYoaXNPYmplY3QoQykpe1xuICAgICAgQyA9IENbU1BFQ0lFU107XG4gICAgICBpZihDID09PSBudWxsKUMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9IHJldHVybiBDID09PSB1bmRlZmluZWQgPyBBcnJheSA6IEM7XG59OyIsIi8vIDkuNC4yLjMgQXJyYXlTcGVjaWVzQ3JlYXRlKG9yaWdpbmFsQXJyYXksIGxlbmd0aClcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19hcnJheS1zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3JpZ2luYWwsIGxlbmd0aCl7XG4gIHJldHVybiBuZXcgKHNwZWNpZXNDb25zdHJ1Y3RvcihvcmlnaW5hbCkpKGxlbmd0aCk7XG59OyIsIi8vIDAgLT4gQXJyYXkjZm9yRWFjaFxuLy8gMSAtPiBBcnJheSNtYXBcbi8vIDIgLT4gQXJyYXkjZmlsdGVyXG4vLyAzIC0+IEFycmF5I3NvbWVcbi8vIDQgLT4gQXJyYXkjZXZlcnlcbi8vIDUgLT4gQXJyYXkjZmluZFxuLy8gNiAtPiBBcnJheSNmaW5kSW5kZXhcbnZhciBjdHggICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgSU9iamVjdCAgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGFzYyAgICAgID0gcmVxdWlyZSgnLi9fYXJyYXktc3BlY2llcy1jcmVhdGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVFlQRSwgJGNyZWF0ZSl7XG4gIHZhciBJU19NQVAgICAgICAgID0gVFlQRSA9PSAxXG4gICAgLCBJU19GSUxURVIgICAgID0gVFlQRSA9PSAyXG4gICAgLCBJU19TT01FICAgICAgID0gVFlQRSA9PSAzXG4gICAgLCBJU19FVkVSWSAgICAgID0gVFlQRSA9PSA0XG4gICAgLCBJU19GSU5EX0lOREVYID0gVFlQRSA9PSA2XG4gICAgLCBOT19IT0xFUyAgICAgID0gVFlQRSA9PSA1IHx8IElTX0ZJTkRfSU5ERVhcbiAgICAsIGNyZWF0ZSAgICAgICAgPSAkY3JlYXRlIHx8IGFzYztcbiAgcmV0dXJuIGZ1bmN0aW9uKCR0aGlzLCBjYWxsYmFja2ZuLCB0aGF0KXtcbiAgICB2YXIgTyAgICAgID0gdG9PYmplY3QoJHRoaXMpXG4gICAgICAsIHNlbGYgICA9IElPYmplY3QoTylcbiAgICAgICwgZiAgICAgID0gY3R4KGNhbGxiYWNrZm4sIHRoYXQsIDMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKHNlbGYubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSAwXG4gICAgICAsIHJlc3VsdCA9IElTX01BUCA/IGNyZWF0ZSgkdGhpcywgbGVuZ3RoKSA6IElTX0ZJTFRFUiA/IGNyZWF0ZSgkdGhpcywgMCkgOiB1bmRlZmluZWRcbiAgICAgICwgdmFsLCByZXM7XG4gICAgZm9yKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKylpZihOT19IT0xFUyB8fCBpbmRleCBpbiBzZWxmKXtcbiAgICAgIHZhbCA9IHNlbGZbaW5kZXhdO1xuICAgICAgcmVzID0gZih2YWwsIGluZGV4LCBPKTtcbiAgICAgIGlmKFRZUEUpe1xuICAgICAgICBpZihJU19NQVApcmVzdWx0W2luZGV4XSA9IHJlczsgICAgICAgICAgICAvLyBtYXBcbiAgICAgICAgZWxzZSBpZihyZXMpc3dpdGNoKFRZUEUpe1xuICAgICAgICAgIGNhc2UgMzogcmV0dXJuIHRydWU7ICAgICAgICAgICAgICAgICAgICAvLyBzb21lXG4gICAgICAgICAgY2FzZSA1OiByZXR1cm4gdmFsOyAgICAgICAgICAgICAgICAgICAgIC8vIGZpbmRcbiAgICAgICAgICBjYXNlIDY6IHJldHVybiBpbmRleDsgICAgICAgICAgICAgICAgICAgLy8gZmluZEluZGV4XG4gICAgICAgICAgY2FzZSAyOiByZXN1bHQucHVzaCh2YWwpOyAgICAgICAgICAgICAgIC8vIGZpbHRlclxuICAgICAgICB9IGVsc2UgaWYoSVNfRVZFUlkpcmV0dXJuIGZhbHNlOyAgICAgICAgICAvLyBldmVyeVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gSVNfRklORF9JTkRFWCA/IC0xIDogSVNfU09NRSB8fCBJU19FVkVSWSA/IElTX0VWRVJZIDogcmVzdWx0O1xuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRmb3JFYWNoID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpKDApXG4gICwgU1RSSUNUICAgPSByZXF1aXJlKCcuL19zdHJpY3QtbWV0aG9kJykoW10uZm9yRWFjaCwgdHJ1ZSk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogIVNUUklDVCwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjMuMTAgLyAxNS40LjQuMTggQXJyYXkucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcbiAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLyl7XG4gICAgcmV0dXJuICRmb3JFYWNoKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50c1sxXSk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkbWFwICAgID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpKDEpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19zdHJpY3QtbWV0aG9kJykoW10ubWFwLCB0cnVlKSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjMuMTUgLyAxNS40LjQuMTkgQXJyYXkucHJvdG90eXBlLm1hcChjYWxsYmFja2ZuIFssIHRoaXNBcmddKVxuICBtYXA6IGZ1bmN0aW9uIG1hcChjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLyl7XG4gICAgcmV0dXJuICRtYXAodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRmaWx0ZXIgPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJykoMik7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX3N0cmljdC1tZXRob2QnKShbXS5maWx0ZXIsIHRydWUpLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMy43IC8gMTUuNC40LjIwIEFycmF5LnByb3RvdHlwZS5maWx0ZXIoY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcbiAgZmlsdGVyOiBmdW5jdGlvbiBmaWx0ZXIoY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pe1xuICAgIHJldHVybiAkZmlsdGVyKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50c1sxXSk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkc29tZSAgID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpKDMpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19zdHJpY3QtbWV0aG9kJykoW10uc29tZSwgdHJ1ZSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4zLjIzIC8gMTUuNC40LjE3IEFycmF5LnByb3RvdHlwZS5zb21lKGNhbGxiYWNrZm4gWywgdGhpc0FyZ10pXG4gIHNvbWU6IGZ1bmN0aW9uIHNvbWUoY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pe1xuICAgIHJldHVybiAkc29tZSh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJGV2ZXJ5ICA9IHJlcXVpcmUoJy4vX2FycmF5LW1ldGhvZHMnKSg0KTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fc3RyaWN0LW1ldGhvZCcpKFtdLmV2ZXJ5LCB0cnVlKSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjMuNSAvIDE1LjQuNC4xNiBBcnJheS5wcm90b3R5cGUuZXZlcnkoY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcbiAgZXZlcnk6IGZ1bmN0aW9uIGV2ZXJ5KGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKXtcbiAgICByZXR1cm4gJGV2ZXJ5KHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50c1sxXSk7XG4gIH1cbn0pOyIsInZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJylcbiAgLCB0b09iamVjdCAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIElPYmplY3QgICA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRoYXQsIGNhbGxiYWNrZm4sIGFMZW4sIG1lbW8sIGlzUmlnaHQpe1xuICBhRnVuY3Rpb24oY2FsbGJhY2tmbik7XG4gIHZhciBPICAgICAgPSB0b09iamVjdCh0aGF0KVxuICAgICwgc2VsZiAgID0gSU9iamVjdChPKVxuICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgLCBpbmRleCAgPSBpc1JpZ2h0ID8gbGVuZ3RoIC0gMSA6IDBcbiAgICAsIGkgICAgICA9IGlzUmlnaHQgPyAtMSA6IDE7XG4gIGlmKGFMZW4gPCAyKWZvcig7Oyl7XG4gICAgaWYoaW5kZXggaW4gc2VsZil7XG4gICAgICBtZW1vID0gc2VsZltpbmRleF07XG4gICAgICBpbmRleCArPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGluZGV4ICs9IGk7XG4gICAgaWYoaXNSaWdodCA/IGluZGV4IDwgMCA6IGxlbmd0aCA8PSBpbmRleCl7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ1JlZHVjZSBvZiBlbXB0eSBhcnJheSB3aXRoIG5vIGluaXRpYWwgdmFsdWUnKTtcbiAgICB9XG4gIH1cbiAgZm9yKDtpc1JpZ2h0ID8gaW5kZXggPj0gMCA6IGxlbmd0aCA+IGluZGV4OyBpbmRleCArPSBpKWlmKGluZGV4IGluIHNlbGYpe1xuICAgIG1lbW8gPSBjYWxsYmFja2ZuKG1lbW8sIHNlbGZbaW5kZXhdLCBpbmRleCwgTyk7XG4gIH1cbiAgcmV0dXJuIG1lbW87XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkcmVkdWNlID0gcmVxdWlyZSgnLi9fYXJyYXktcmVkdWNlJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX3N0cmljdC1tZXRob2QnKShbXS5yZWR1Y2UsIHRydWUpLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMy4xOCAvIDE1LjQuNC4yMSBBcnJheS5wcm90b3R5cGUucmVkdWNlKGNhbGxiYWNrZm4gWywgaW5pdGlhbFZhbHVlXSlcbiAgcmVkdWNlOiBmdW5jdGlvbiByZWR1Y2UoY2FsbGJhY2tmbiAvKiAsIGluaXRpYWxWYWx1ZSAqLyl7XG4gICAgcmV0dXJuICRyZWR1Y2UodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCwgYXJndW1lbnRzWzFdLCBmYWxzZSk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkcmVkdWNlID0gcmVxdWlyZSgnLi9fYXJyYXktcmVkdWNlJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX3N0cmljdC1tZXRob2QnKShbXS5yZWR1Y2VSaWdodCwgdHJ1ZSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4zLjE5IC8gMTUuNC40LjIyIEFycmF5LnByb3RvdHlwZS5yZWR1Y2VSaWdodChjYWxsYmFja2ZuIFssIGluaXRpYWxWYWx1ZV0pXG4gIHJlZHVjZVJpZ2h0OiBmdW5jdGlvbiByZWR1Y2VSaWdodChjYWxsYmFja2ZuIC8qICwgaW5pdGlhbFZhbHVlICovKXtcbiAgICByZXR1cm4gJHJlZHVjZSh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoLCBhcmd1bWVudHNbMV0sIHRydWUpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJGluZGV4T2YgICAgICA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpXG4gICwgJG5hdGl2ZSAgICAgICA9IFtdLmluZGV4T2ZcbiAgLCBORUdBVElWRV9aRVJPID0gISEkbmF0aXZlICYmIDEgLyBbMV0uaW5kZXhPZigxLCAtMCkgPCAwO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChORUdBVElWRV9aRVJPIHx8ICFyZXF1aXJlKCcuL19zdHJpY3QtbWV0aG9kJykoJG5hdGl2ZSkpLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMy4xMSAvIDE1LjQuNC4xNCBBcnJheS5wcm90b3R5cGUuaW5kZXhPZihzZWFyY2hFbGVtZW50IFssIGZyb21JbmRleF0pXG4gIGluZGV4T2Y6IGZ1bmN0aW9uIGluZGV4T2Yoc2VhcmNoRWxlbWVudCAvKiwgZnJvbUluZGV4ID0gMCAqLyl7XG4gICAgcmV0dXJuIE5FR0FUSVZFX1pFUk9cbiAgICAgIC8vIGNvbnZlcnQgLTAgdG8gKzBcbiAgICAgID8gJG5hdGl2ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IDBcbiAgICAgIDogJGluZGV4T2YodGhpcywgc2VhcmNoRWxlbWVudCwgYXJndW1lbnRzWzFdKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHRvSU9iamVjdCAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b0ludGVnZXIgICAgID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgdG9MZW5ndGggICAgICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgJG5hdGl2ZSAgICAgICA9IFtdLmxhc3RJbmRleE9mXG4gICwgTkVHQVRJVkVfWkVSTyA9ICEhJG5hdGl2ZSAmJiAxIC8gWzFdLmxhc3RJbmRleE9mKDEsIC0wKSA8IDA7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKE5FR0FUSVZFX1pFUk8gfHwgIXJlcXVpcmUoJy4vX3N0cmljdC1tZXRob2QnKSgkbmF0aXZlKSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4zLjE0IC8gMTUuNC40LjE1IEFycmF5LnByb3RvdHlwZS5sYXN0SW5kZXhPZihzZWFyY2hFbGVtZW50IFssIGZyb21JbmRleF0pXG4gIGxhc3RJbmRleE9mOiBmdW5jdGlvbiBsYXN0SW5kZXhPZihzZWFyY2hFbGVtZW50IC8qLCBmcm9tSW5kZXggPSBAWyotMV0gKi8pe1xuICAgIC8vIGNvbnZlcnQgLTAgdG8gKzBcbiAgICBpZihORUdBVElWRV9aRVJPKXJldHVybiAkbmF0aXZlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgMDtcbiAgICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KHRoaXMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSBsZW5ndGggLSAxO1xuICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPiAxKWluZGV4ID0gTWF0aC5taW4oaW5kZXgsIHRvSW50ZWdlcihhcmd1bWVudHNbMV0pKTtcbiAgICBpZihpbmRleCA8IDApaW5kZXggPSBsZW5ndGggKyBpbmRleDtcbiAgICBmb3IoO2luZGV4ID49IDA7IGluZGV4LS0paWYoaW5kZXggaW4gTylpZihPW2luZGV4XSA9PT0gc2VhcmNoRWxlbWVudClyZXR1cm4gaW5kZXggfHwgMDtcbiAgICByZXR1cm4gLTE7XG4gIH1cbn0pOyIsIi8vIDIyLjEuMy4zIEFycmF5LnByb3RvdHlwZS5jb3B5V2l0aGluKHRhcmdldCwgc3RhcnQsIGVuZCA9IHRoaXMubGVuZ3RoKVxuJ3VzZSBzdHJpY3QnO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCB0b0luZGV4ICA9IHJlcXVpcmUoJy4vX3RvLWluZGV4JylcbiAgLCB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFtdLmNvcHlXaXRoaW4gfHwgZnVuY3Rpb24gY29weVdpdGhpbih0YXJnZXQvKj0gMCovLCBzdGFydC8qPSAwLCBlbmQgPSBAbGVuZ3RoKi8pe1xuICB2YXIgTyAgICAgPSB0b09iamVjdCh0aGlzKVxuICAgICwgbGVuICAgPSB0b0xlbmd0aChPLmxlbmd0aClcbiAgICAsIHRvICAgID0gdG9JbmRleCh0YXJnZXQsIGxlbilcbiAgICAsIGZyb20gID0gdG9JbmRleChzdGFydCwgbGVuKVxuICAgICwgZW5kICAgPSBhcmd1bWVudHMubGVuZ3RoID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZFxuICAgICwgY291bnQgPSBNYXRoLm1pbigoZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiB0b0luZGV4KGVuZCwgbGVuKSkgLSBmcm9tLCBsZW4gLSB0bylcbiAgICAsIGluYyAgID0gMTtcbiAgaWYoZnJvbSA8IHRvICYmIHRvIDwgZnJvbSArIGNvdW50KXtcbiAgICBpbmMgID0gLTE7XG4gICAgZnJvbSArPSBjb3VudCAtIDE7XG4gICAgdG8gICArPSBjb3VudCAtIDE7XG4gIH1cbiAgd2hpbGUoY291bnQtLSA+IDApe1xuICAgIGlmKGZyb20gaW4gTylPW3RvXSA9IE9bZnJvbV07XG4gICAgZWxzZSBkZWxldGUgT1t0b107XG4gICAgdG8gICArPSBpbmM7XG4gICAgZnJvbSArPSBpbmM7XG4gIH0gcmV0dXJuIE87XG59OyIsIi8vIDIyLjEuMy4zMSBBcnJheS5wcm90b3R5cGVbQEB1bnNjb3BhYmxlc11cbnZhciBVTlNDT1BBQkxFUyA9IHJlcXVpcmUoJy4vX3drcycpKCd1bnNjb3BhYmxlcycpXG4gICwgQXJyYXlQcm90byAgPSBBcnJheS5wcm90b3R5cGU7XG5pZihBcnJheVByb3RvW1VOU0NPUEFCTEVTXSA9PSB1bmRlZmluZWQpcmVxdWlyZSgnLi9faGlkZScpKEFycmF5UHJvdG8sIFVOU0NPUEFCTEVTLCB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIEFycmF5UHJvdG9bVU5TQ09QQUJMRVNdW2tleV0gPSB0cnVlO1xufTsiLCIvLyAyMi4xLjMuMyBBcnJheS5wcm90b3R5cGUuY29weVdpdGhpbih0YXJnZXQsIHN0YXJ0LCBlbmQgPSB0aGlzLmxlbmd0aClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QLCAnQXJyYXknLCB7Y29weVdpdGhpbjogcmVxdWlyZSgnLi9fYXJyYXktY29weS13aXRoaW4nKX0pO1xuXG5yZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKSgnY29weVdpdGhpbicpOyIsIi8vIDIyLjEuMy42IEFycmF5LnByb3RvdHlwZS5maWxsKHZhbHVlLCBzdGFydCA9IDAsIGVuZCA9IHRoaXMubGVuZ3RoKVxuJ3VzZSBzdHJpY3QnO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCB0b0luZGV4ICA9IHJlcXVpcmUoJy4vX3RvLWluZGV4JylcbiAgLCB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmaWxsKHZhbHVlIC8qLCBzdGFydCA9IDAsIGVuZCA9IEBsZW5ndGggKi8pe1xuICB2YXIgTyAgICAgID0gdG9PYmplY3QodGhpcylcbiAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICwgYUxlbiAgID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICwgaW5kZXggID0gdG9JbmRleChhTGVuID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgbGVuZ3RoKVxuICAgICwgZW5kICAgID0gYUxlbiA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWRcbiAgICAsIGVuZFBvcyA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuZ3RoIDogdG9JbmRleChlbmQsIGxlbmd0aCk7XG4gIHdoaWxlKGVuZFBvcyA+IGluZGV4KU9baW5kZXgrK10gPSB2YWx1ZTtcbiAgcmV0dXJuIE87XG59OyIsIi8vIDIyLjEuMy42IEFycmF5LnByb3RvdHlwZS5maWxsKHZhbHVlLCBzdGFydCA9IDAsIGVuZCA9IHRoaXMubGVuZ3RoKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAsICdBcnJheScsIHtmaWxsOiByZXF1aXJlKCcuL19hcnJheS1maWxsJyl9KTtcblxucmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJykoJ2ZpbGwnKTsiLCIndXNlIHN0cmljdCc7XG4vLyAyMi4xLjMuOCBBcnJheS5wcm90b3R5cGUuZmluZChwcmVkaWNhdGUsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJGZpbmQgICA9IHJlcXVpcmUoJy4vX2FycmF5LW1ldGhvZHMnKSg1KVxuICAsIEtFWSAgICAgPSAnZmluZCdcbiAgLCBmb3JjZWQgID0gdHJ1ZTtcbi8vIFNob3VsZG4ndCBza2lwIGhvbGVzXG5pZihLRVkgaW4gW10pQXJyYXkoMSlbS0VZXShmdW5jdGlvbigpeyBmb3JjZWQgPSBmYWxzZTsgfSk7XG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIGZvcmNlZCwgJ0FycmF5Jywge1xuICBmaW5kOiBmdW5jdGlvbiBmaW5kKGNhbGxiYWNrZm4vKiwgdGhhdCA9IHVuZGVmaW5lZCAqLyl7XG4gICAgcmV0dXJuICRmaW5kKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG5yZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKShLRVkpOyIsIid1c2Ugc3RyaWN0Jztcbi8vIDIyLjEuMy45IEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXgocHJlZGljYXRlLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRmaW5kICAgPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJykoNilcbiAgLCBLRVkgICAgID0gJ2ZpbmRJbmRleCdcbiAgLCBmb3JjZWQgID0gdHJ1ZTtcbi8vIFNob3VsZG4ndCBza2lwIGhvbGVzXG5pZihLRVkgaW4gW10pQXJyYXkoMSlbS0VZXShmdW5jdGlvbigpeyBmb3JjZWQgPSBmYWxzZTsgfSk7XG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIGZvcmNlZCwgJ0FycmF5Jywge1xuICBmaW5kSW5kZXg6IGZ1bmN0aW9uIGZpbmRJbmRleChjYWxsYmFja2ZuLyosIHRoYXQgPSB1bmRlZmluZWQgKi8pe1xuICAgIHJldHVybiAkZmluZCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xucmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJykoS0VZKTsiLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGRQICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJylcbiAgLCBTUEVDSUVTICAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZKXtcbiAgdmFyIEMgPSBnbG9iYWxbS0VZXTtcbiAgaWYoREVTQ1JJUFRPUlMgJiYgQyAmJiAhQ1tTUEVDSUVTXSlkUC5mKEMsIFNQRUNJRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfVxuICB9KTtcbn07IiwicmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKSgnQXJyYXknKTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvbmUsIHZhbHVlKXtcbiAgcmV0dXJuIHt2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZX07XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJylcbiAgLCBzdGVwICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJylcbiAgLCBJdGVyYXRvcnMgICAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCB0b0lPYmplY3QgICAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBraW5kICA9IHRoaXMuX2tcbiAgICAsIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZighTyB8fCBpbmRleCA+PSBPLmxlbmd0aCl7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjEuMi41LjMgZ2V0IFJlZ0V4cC5wcm90b3R5cGUuZmxhZ3NcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xuICB2YXIgdGhhdCAgID0gYW5PYmplY3QodGhpcylcbiAgICAsIHJlc3VsdCA9ICcnO1xuICBpZih0aGF0Lmdsb2JhbCkgICAgIHJlc3VsdCArPSAnZyc7XG4gIGlmKHRoYXQuaWdub3JlQ2FzZSkgcmVzdWx0ICs9ICdpJztcbiAgaWYodGhhdC5tdWx0aWxpbmUpICByZXN1bHQgKz0gJ20nO1xuICBpZih0aGF0LnVuaWNvZGUpICAgIHJlc3VsdCArPSAndSc7XG4gIGlmKHRoYXQuc3RpY2t5KSAgICAgcmVzdWx0ICs9ICd5JztcbiAgcmV0dXJuIHJlc3VsdDtcbn07IiwidmFyIGdsb2JhbCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBpbmhlcml0SWZSZXF1aXJlZCA9IHJlcXVpcmUoJy4vX2luaGVyaXQtaWYtcmVxdWlyZWQnKVxuICAsIGRQICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGdPUE4gICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mXG4gICwgaXNSZWdFeHAgICAgICAgICAgPSByZXF1aXJlKCcuL19pcy1yZWdleHAnKVxuICAsICRmbGFncyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZmxhZ3MnKVxuICAsICRSZWdFeHAgICAgICAgICAgID0gZ2xvYmFsLlJlZ0V4cFxuICAsIEJhc2UgICAgICAgICAgICAgID0gJFJlZ0V4cFxuICAsIHByb3RvICAgICAgICAgICAgID0gJFJlZ0V4cC5wcm90b3R5cGVcbiAgLCByZTEgICAgICAgICAgICAgICA9IC9hL2dcbiAgLCByZTIgICAgICAgICAgICAgICA9IC9hL2dcbiAgLy8gXCJuZXdcIiBjcmVhdGVzIGEgbmV3IG9iamVjdCwgb2xkIHdlYmtpdCBidWdneSBoZXJlXG4gICwgQ09SUkVDVF9ORVcgICAgICAgPSBuZXcgJFJlZ0V4cChyZTEpICE9PSByZTE7XG5cbmlmKHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgKCFDT1JSRUNUX05FVyB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJlMltyZXF1aXJlKCcuL193a3MnKSgnbWF0Y2gnKV0gPSBmYWxzZTtcbiAgLy8gUmVnRXhwIGNvbnN0cnVjdG9yIGNhbiBhbHRlciBmbGFncyBhbmQgSXNSZWdFeHAgd29ya3MgY29ycmVjdCB3aXRoIEBAbWF0Y2hcbiAgcmV0dXJuICRSZWdFeHAocmUxKSAhPSByZTEgfHwgJFJlZ0V4cChyZTIpID09IHJlMiB8fCAkUmVnRXhwKHJlMSwgJ2knKSAhPSAnL2EvaSc7XG59KSkpe1xuICAkUmVnRXhwID0gZnVuY3Rpb24gUmVnRXhwKHAsIGYpe1xuICAgIHZhciB0aVJFID0gdGhpcyBpbnN0YW5jZW9mICRSZWdFeHBcbiAgICAgICwgcGlSRSA9IGlzUmVnRXhwKHApXG4gICAgICAsIGZpVSAgPSBmID09PSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuICF0aVJFICYmIHBpUkUgJiYgcC5jb25zdHJ1Y3RvciA9PT0gJFJlZ0V4cCAmJiBmaVUgPyBwXG4gICAgICA6IGluaGVyaXRJZlJlcXVpcmVkKENPUlJFQ1RfTkVXXG4gICAgICAgID8gbmV3IEJhc2UocGlSRSAmJiAhZmlVID8gcC5zb3VyY2UgOiBwLCBmKVxuICAgICAgICA6IEJhc2UoKHBpUkUgPSBwIGluc3RhbmNlb2YgJFJlZ0V4cCkgPyBwLnNvdXJjZSA6IHAsIHBpUkUgJiYgZmlVID8gJGZsYWdzLmNhbGwocCkgOiBmKVxuICAgICAgLCB0aVJFID8gdGhpcyA6IHByb3RvLCAkUmVnRXhwKTtcbiAgfTtcbiAgdmFyIHByb3h5ID0gZnVuY3Rpb24oa2V5KXtcbiAgICBrZXkgaW4gJFJlZ0V4cCB8fCBkUCgkUmVnRXhwLCBrZXksIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIEJhc2Vba2V5XTsgfSxcbiAgICAgIHNldDogZnVuY3Rpb24oaXQpeyBCYXNlW2tleV0gPSBpdDsgfVxuICAgIH0pO1xuICB9O1xuICBmb3IodmFyIGtleXMgPSBnT1BOKEJhc2UpLCBpID0gMDsga2V5cy5sZW5ndGggPiBpOyApcHJveHkoa2V5c1tpKytdKTtcbiAgcHJvdG8uY29uc3RydWN0b3IgPSAkUmVnRXhwO1xuICAkUmVnRXhwLnByb3RvdHlwZSA9IHByb3RvO1xuICByZXF1aXJlKCcuL19yZWRlZmluZScpKGdsb2JhbCwgJ1JlZ0V4cCcsICRSZWdFeHApO1xufVxuXG5yZXF1aXJlKCcuL19zZXQtc3BlY2llcycpKCdSZWdFeHAnKTsiLCIvLyAyMS4yLjUuMyBnZXQgUmVnRXhwLnByb3RvdHlwZS5mbGFncygpXG5pZihyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmIC8uL2cuZmxhZ3MgIT0gJ2cnKXJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmYoUmVnRXhwLnByb3RvdHlwZSwgJ2ZsYWdzJywge1xuICBjb25maWd1cmFibGU6IHRydWUsXG4gIGdldDogcmVxdWlyZSgnLi9fZmxhZ3MnKVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xucmVxdWlyZSgnLi9lczYucmVnZXhwLmZsYWdzJyk7XG52YXIgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsICRmbGFncyAgICAgID0gcmVxdWlyZSgnLi9fZmxhZ3MnKVxuICAsIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsIFRPX1NUUklORyAgID0gJ3RvU3RyaW5nJ1xuICAsICR0b1N0cmluZyAgID0gLy4vW1RPX1NUUklOR107XG5cbnZhciBkZWZpbmUgPSBmdW5jdGlvbihmbil7XG4gIHJlcXVpcmUoJy4vX3JlZGVmaW5lJykoUmVnRXhwLnByb3RvdHlwZSwgVE9fU1RSSU5HLCBmbiwgdHJ1ZSk7XG59O1xuXG4vLyAyMS4yLjUuMTQgUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZygpXG5pZihyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7IHJldHVybiAkdG9TdHJpbmcuY2FsbCh7c291cmNlOiAnYScsIGZsYWdzOiAnYid9KSAhPSAnL2EvYic7IH0pKXtcbiAgZGVmaW5lKGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gICAgdmFyIFIgPSBhbk9iamVjdCh0aGlzKTtcbiAgICByZXR1cm4gJy8nLmNvbmNhdChSLnNvdXJjZSwgJy8nLFxuICAgICAgJ2ZsYWdzJyBpbiBSID8gUi5mbGFncyA6ICFERVNDUklQVE9SUyAmJiBSIGluc3RhbmNlb2YgUmVnRXhwID8gJGZsYWdzLmNhbGwoUikgOiB1bmRlZmluZWQpO1xuICB9KTtcbi8vIEZGNDQtIFJlZ0V4cCN0b1N0cmluZyBoYXMgYSB3cm9uZyBuYW1lXG59IGVsc2UgaWYoJHRvU3RyaW5nLm5hbWUgIT0gVE9fU1RSSU5HKXtcbiAgZGVmaW5lKGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gICAgcmV0dXJuICR0b1N0cmluZy5jYWxsKHRoaXMpO1xuICB9KTtcbn0iLCIndXNlIHN0cmljdCc7XG52YXIgaGlkZSAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBmYWlscyAgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcbiAgLCBkZWZpbmVkICA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKVxuICAsIHdrcyAgICAgID0gcmVxdWlyZSgnLi9fd2tzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZLCBsZW5ndGgsIGV4ZWMpe1xuICB2YXIgU1lNQk9MICAgPSB3a3MoS0VZKVxuICAgICwgZm5zICAgICAgPSBleGVjKGRlZmluZWQsIFNZTUJPTCwgJydbS0VZXSlcbiAgICAsIHN0cmZuICAgID0gZm5zWzBdXG4gICAgLCByeGZuICAgICA9IGZuc1sxXTtcbiAgaWYoZmFpbHMoZnVuY3Rpb24oKXtcbiAgICB2YXIgTyA9IHt9O1xuICAgIE9bU1lNQk9MXSA9IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9O1xuICAgIHJldHVybiAnJ1tLRVldKE8pICE9IDc7XG4gIH0pKXtcbiAgICByZWRlZmluZShTdHJpbmcucHJvdG90eXBlLCBLRVksIHN0cmZuKTtcbiAgICBoaWRlKFJlZ0V4cC5wcm90b3R5cGUsIFNZTUJPTCwgbGVuZ3RoID09IDJcbiAgICAgIC8vIDIxLjIuNS44IFJlZ0V4cC5wcm90b3R5cGVbQEByZXBsYWNlXShzdHJpbmcsIHJlcGxhY2VWYWx1ZSlcbiAgICAgIC8vIDIxLjIuNS4xMSBSZWdFeHAucHJvdG90eXBlW0BAc3BsaXRdKHN0cmluZywgbGltaXQpXG4gICAgICA/IGZ1bmN0aW9uKHN0cmluZywgYXJnKXsgcmV0dXJuIHJ4Zm4uY2FsbChzdHJpbmcsIHRoaXMsIGFyZyk7IH1cbiAgICAgIC8vIDIxLjIuNS42IFJlZ0V4cC5wcm90b3R5cGVbQEBtYXRjaF0oc3RyaW5nKVxuICAgICAgLy8gMjEuMi41LjkgUmVnRXhwLnByb3RvdHlwZVtAQHNlYXJjaF0oc3RyaW5nKVxuICAgICAgOiBmdW5jdGlvbihzdHJpbmcpeyByZXR1cm4gcnhmbi5jYWxsKHN0cmluZywgdGhpcyk7IH1cbiAgICApO1xuICB9XG59OyIsIi8vIEBAbWF0Y2ggbG9naWNcbnJlcXVpcmUoJy4vX2ZpeC1yZS13a3MnKSgnbWF0Y2gnLCAxLCBmdW5jdGlvbihkZWZpbmVkLCBNQVRDSCwgJG1hdGNoKXtcbiAgLy8gMjEuMS4zLjExIFN0cmluZy5wcm90b3R5cGUubWF0Y2gocmVnZXhwKVxuICByZXR1cm4gW2Z1bmN0aW9uIG1hdGNoKHJlZ2V4cCl7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBPICA9IGRlZmluZWQodGhpcylcbiAgICAgICwgZm4gPSByZWdleHAgPT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogcmVnZXhwW01BVENIXTtcbiAgICByZXR1cm4gZm4gIT09IHVuZGVmaW5lZCA/IGZuLmNhbGwocmVnZXhwLCBPKSA6IG5ldyBSZWdFeHAocmVnZXhwKVtNQVRDSF0oU3RyaW5nKE8pKTtcbiAgfSwgJG1hdGNoXTtcbn0pOyIsIi8vIEBAcmVwbGFjZSBsb2dpY1xucmVxdWlyZSgnLi9fZml4LXJlLXdrcycpKCdyZXBsYWNlJywgMiwgZnVuY3Rpb24oZGVmaW5lZCwgUkVQTEFDRSwgJHJlcGxhY2Upe1xuICAvLyAyMS4xLjMuMTQgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlKHNlYXJjaFZhbHVlLCByZXBsYWNlVmFsdWUpXG4gIHJldHVybiBbZnVuY3Rpb24gcmVwbGFjZShzZWFyY2hWYWx1ZSwgcmVwbGFjZVZhbHVlKXtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdmFyIE8gID0gZGVmaW5lZCh0aGlzKVxuICAgICAgLCBmbiA9IHNlYXJjaFZhbHVlID09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHNlYXJjaFZhbHVlW1JFUExBQ0VdO1xuICAgIHJldHVybiBmbiAhPT0gdW5kZWZpbmVkXG4gICAgICA/IGZuLmNhbGwoc2VhcmNoVmFsdWUsIE8sIHJlcGxhY2VWYWx1ZSlcbiAgICAgIDogJHJlcGxhY2UuY2FsbChTdHJpbmcoTyksIHNlYXJjaFZhbHVlLCByZXBsYWNlVmFsdWUpO1xuICB9LCAkcmVwbGFjZV07XG59KTsiLCIvLyBAQHNlYXJjaCBsb2dpY1xucmVxdWlyZSgnLi9fZml4LXJlLXdrcycpKCdzZWFyY2gnLCAxLCBmdW5jdGlvbihkZWZpbmVkLCBTRUFSQ0gsICRzZWFyY2gpe1xuICAvLyAyMS4xLjMuMTUgU3RyaW5nLnByb3RvdHlwZS5zZWFyY2gocmVnZXhwKVxuICByZXR1cm4gW2Z1bmN0aW9uIHNlYXJjaChyZWdleHApe1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgTyAgPSBkZWZpbmVkKHRoaXMpXG4gICAgICAsIGZuID0gcmVnZXhwID09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHJlZ2V4cFtTRUFSQ0hdO1xuICAgIHJldHVybiBmbiAhPT0gdW5kZWZpbmVkID8gZm4uY2FsbChyZWdleHAsIE8pIDogbmV3IFJlZ0V4cChyZWdleHApW1NFQVJDSF0oU3RyaW5nKE8pKTtcbiAgfSwgJHNlYXJjaF07XG59KTsiLCIvLyBAQHNwbGl0IGxvZ2ljXG5yZXF1aXJlKCcuL19maXgtcmUtd2tzJykoJ3NwbGl0JywgMiwgZnVuY3Rpb24oZGVmaW5lZCwgU1BMSVQsICRzcGxpdCl7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIGlzUmVnRXhwICAgPSByZXF1aXJlKCcuL19pcy1yZWdleHAnKVxuICAgICwgX3NwbGl0ICAgICA9ICRzcGxpdFxuICAgICwgJHB1c2ggICAgICA9IFtdLnB1c2hcbiAgICAsICRTUExJVCAgICAgPSAnc3BsaXQnXG4gICAgLCBMRU5HVEggICAgID0gJ2xlbmd0aCdcbiAgICAsIExBU1RfSU5ERVggPSAnbGFzdEluZGV4JztcbiAgaWYoXG4gICAgJ2FiYmMnWyRTUExJVF0oLyhiKSovKVsxXSA9PSAnYycgfHxcbiAgICAndGVzdCdbJFNQTElUXSgvKD86KS8sIC0xKVtMRU5HVEhdICE9IDQgfHxcbiAgICAnYWInWyRTUExJVF0oLyg/OmFiKSovKVtMRU5HVEhdICE9IDIgfHxcbiAgICAnLidbJFNQTElUXSgvKC4/KSguPykvKVtMRU5HVEhdICE9IDQgfHxcbiAgICAnLidbJFNQTElUXSgvKCkoKS8pW0xFTkdUSF0gPiAxIHx8XG4gICAgJydbJFNQTElUXSgvLj8vKVtMRU5HVEhdXG4gICl7XG4gICAgdmFyIE5QQ0cgPSAvKCk/Py8uZXhlYygnJylbMV0gPT09IHVuZGVmaW5lZDsgLy8gbm9ucGFydGljaXBhdGluZyBjYXB0dXJpbmcgZ3JvdXBcbiAgICAvLyBiYXNlZCBvbiBlczUtc2hpbSBpbXBsZW1lbnRhdGlvbiwgbmVlZCB0byByZXdvcmsgaXRcbiAgICAkc3BsaXQgPSBmdW5jdGlvbihzZXBhcmF0b3IsIGxpbWl0KXtcbiAgICAgIHZhciBzdHJpbmcgPSBTdHJpbmcodGhpcyk7XG4gICAgICBpZihzZXBhcmF0b3IgPT09IHVuZGVmaW5lZCAmJiBsaW1pdCA9PT0gMClyZXR1cm4gW107XG4gICAgICAvLyBJZiBgc2VwYXJhdG9yYCBpcyBub3QgYSByZWdleCwgdXNlIG5hdGl2ZSBzcGxpdFxuICAgICAgaWYoIWlzUmVnRXhwKHNlcGFyYXRvcikpcmV0dXJuIF9zcGxpdC5jYWxsKHN0cmluZywgc2VwYXJhdG9yLCBsaW1pdCk7XG4gICAgICB2YXIgb3V0cHV0ID0gW107XG4gICAgICB2YXIgZmxhZ3MgPSAoc2VwYXJhdG9yLmlnbm9yZUNhc2UgPyAnaScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHNlcGFyYXRvci5tdWx0aWxpbmUgPyAnbScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHNlcGFyYXRvci51bmljb2RlID8gJ3UnIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChzZXBhcmF0b3Iuc3RpY2t5ID8gJ3knIDogJycpO1xuICAgICAgdmFyIGxhc3RMYXN0SW5kZXggPSAwO1xuICAgICAgdmFyIHNwbGl0TGltaXQgPSBsaW1pdCA9PT0gdW5kZWZpbmVkID8gNDI5NDk2NzI5NSA6IGxpbWl0ID4+PiAwO1xuICAgICAgLy8gTWFrZSBgZ2xvYmFsYCBhbmQgYXZvaWQgYGxhc3RJbmRleGAgaXNzdWVzIGJ5IHdvcmtpbmcgd2l0aCBhIGNvcHlcbiAgICAgIHZhciBzZXBhcmF0b3JDb3B5ID0gbmV3IFJlZ0V4cChzZXBhcmF0b3Iuc291cmNlLCBmbGFncyArICdnJyk7XG4gICAgICB2YXIgc2VwYXJhdG9yMiwgbWF0Y2gsIGxhc3RJbmRleCwgbGFzdExlbmd0aCwgaTtcbiAgICAgIC8vIERvZXNuJ3QgbmVlZCBmbGFncyBneSwgYnV0IHRoZXkgZG9uJ3QgaHVydFxuICAgICAgaWYoIU5QQ0cpc2VwYXJhdG9yMiA9IG5ldyBSZWdFeHAoJ14nICsgc2VwYXJhdG9yQ29weS5zb3VyY2UgKyAnJCg/IVxcXFxzKScsIGZsYWdzKTtcbiAgICAgIHdoaWxlKG1hdGNoID0gc2VwYXJhdG9yQ29weS5leGVjKHN0cmluZykpe1xuICAgICAgICAvLyBgc2VwYXJhdG9yQ29weS5sYXN0SW5kZXhgIGlzIG5vdCByZWxpYWJsZSBjcm9zcy1icm93c2VyXG4gICAgICAgIGxhc3RJbmRleCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF1bTEVOR1RIXTtcbiAgICAgICAgaWYobGFzdEluZGV4ID4gbGFzdExhc3RJbmRleCl7XG4gICAgICAgICAgb3V0cHV0LnB1c2goc3RyaW5nLnNsaWNlKGxhc3RMYXN0SW5kZXgsIG1hdGNoLmluZGV4KSk7XG4gICAgICAgICAgLy8gRml4IGJyb3dzZXJzIHdob3NlIGBleGVjYCBtZXRob2RzIGRvbid0IGNvbnNpc3RlbnRseSByZXR1cm4gYHVuZGVmaW5lZGAgZm9yIE5QQ0dcbiAgICAgICAgICBpZighTlBDRyAmJiBtYXRjaFtMRU5HVEhdID4gMSltYXRjaFswXS5yZXBsYWNlKHNlcGFyYXRvcjIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBmb3IoaSA9IDE7IGkgPCBhcmd1bWVudHNbTEVOR1RIXSAtIDI7IGkrKylpZihhcmd1bWVudHNbaV0gPT09IHVuZGVmaW5lZCltYXRjaFtpXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZihtYXRjaFtMRU5HVEhdID4gMSAmJiBtYXRjaC5pbmRleCA8IHN0cmluZ1tMRU5HVEhdKSRwdXNoLmFwcGx5KG91dHB1dCwgbWF0Y2guc2xpY2UoMSkpO1xuICAgICAgICAgIGxhc3RMZW5ndGggPSBtYXRjaFswXVtMRU5HVEhdO1xuICAgICAgICAgIGxhc3RMYXN0SW5kZXggPSBsYXN0SW5kZXg7XG4gICAgICAgICAgaWYob3V0cHV0W0xFTkdUSF0gPj0gc3BsaXRMaW1pdClicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZihzZXBhcmF0b3JDb3B5W0xBU1RfSU5ERVhdID09PSBtYXRjaC5pbmRleClzZXBhcmF0b3JDb3B5W0xBU1RfSU5ERVhdKys7IC8vIEF2b2lkIGFuIGluZmluaXRlIGxvb3BcbiAgICAgIH1cbiAgICAgIGlmKGxhc3RMYXN0SW5kZXggPT09IHN0cmluZ1tMRU5HVEhdKXtcbiAgICAgICAgaWYobGFzdExlbmd0aCB8fCAhc2VwYXJhdG9yQ29weS50ZXN0KCcnKSlvdXRwdXQucHVzaCgnJyk7XG4gICAgICB9IGVsc2Ugb3V0cHV0LnB1c2goc3RyaW5nLnNsaWNlKGxhc3RMYXN0SW5kZXgpKTtcbiAgICAgIHJldHVybiBvdXRwdXRbTEVOR1RIXSA+IHNwbGl0TGltaXQgPyBvdXRwdXQuc2xpY2UoMCwgc3BsaXRMaW1pdCkgOiBvdXRwdXQ7XG4gICAgfTtcbiAgLy8gQ2hha3JhLCBWOFxuICB9IGVsc2UgaWYoJzAnWyRTUExJVF0odW5kZWZpbmVkLCAwKVtMRU5HVEhdKXtcbiAgICAkc3BsaXQgPSBmdW5jdGlvbihzZXBhcmF0b3IsIGxpbWl0KXtcbiAgICAgIHJldHVybiBzZXBhcmF0b3IgPT09IHVuZGVmaW5lZCAmJiBsaW1pdCA9PT0gMCA/IFtdIDogX3NwbGl0LmNhbGwodGhpcywgc2VwYXJhdG9yLCBsaW1pdCk7XG4gICAgfTtcbiAgfVxuICAvLyAyMS4xLjMuMTcgU3RyaW5nLnByb3RvdHlwZS5zcGxpdChzZXBhcmF0b3IsIGxpbWl0KVxuICByZXR1cm4gW2Z1bmN0aW9uIHNwbGl0KHNlcGFyYXRvciwgbGltaXQpe1xuICAgIHZhciBPICA9IGRlZmluZWQodGhpcylcbiAgICAgICwgZm4gPSBzZXBhcmF0b3IgPT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogc2VwYXJhdG9yW1NQTElUXTtcbiAgICByZXR1cm4gZm4gIT09IHVuZGVmaW5lZCA/IGZuLmNhbGwoc2VwYXJhdG9yLCBPLCBsaW1pdCkgOiAkc3BsaXQuY2FsbChTdHJpbmcoTyksIHNlcGFyYXRvciwgbGltaXQpO1xuICB9LCAkc3BsaXRdO1xufSk7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgQ29uc3RydWN0b3IsIG5hbWUsIGZvcmJpZGRlbkZpZWxkKXtcbiAgaWYoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSB8fCAoZm9yYmlkZGVuRmllbGQgIT09IHVuZGVmaW5lZCAmJiBmb3JiaWRkZW5GaWVsZCBpbiBpdCkpe1xuICAgIHRocm93IFR5cGVFcnJvcihuYW1lICsgJzogaW5jb3JyZWN0IGludm9jYXRpb24hJyk7XG4gIH0gcmV0dXJuIGl0O1xufTsiLCJ2YXIgY3R4ICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGNhbGwgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJylcbiAgLCBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKVxuICAsIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgZ2V0SXRlckZuICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpXG4gICwgQlJFQUsgICAgICAgPSB7fVxuICAsIFJFVFVSTiAgICAgID0ge307XG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmFibGUsIGVudHJpZXMsIGZuLCB0aGF0LCBJVEVSQVRPUil7XG4gIHZhciBpdGVyRm4gPSBJVEVSQVRPUiA/IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyYWJsZTsgfSA6IGdldEl0ZXJGbihpdGVyYWJsZSlcbiAgICAsIGYgICAgICA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKVxuICAgICwgaW5kZXggID0gMFxuICAgICwgbGVuZ3RoLCBzdGVwLCBpdGVyYXRvciwgcmVzdWx0O1xuICBpZih0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZihpc0FycmF5SXRlcihpdGVyRm4pKWZvcihsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgcmVzdWx0ID0gZW50cmllcyA/IGYoYW5PYmplY3Qoc3RlcCA9IGl0ZXJhYmxlW2luZGV4XSlbMF0sIHN0ZXBbMV0pIDogZihpdGVyYWJsZVtpbmRleF0pO1xuICAgIGlmKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pcmV0dXJuIHJlc3VsdDtcbiAgfSBlbHNlIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKGl0ZXJhYmxlKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyApe1xuICAgIHJlc3VsdCA9IGNhbGwoaXRlcmF0b3IsIGYsIHN0ZXAudmFsdWUsIGVudHJpZXMpO1xuICAgIGlmKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcbmV4cG9ydHMuQlJFQUsgID0gQlJFQUs7XG5leHBvcnRzLlJFVFVSTiA9IFJFVFVSTjsiLCIvLyA3LjMuMjAgU3BlY2llc0NvbnN0cnVjdG9yKE8sIGRlZmF1bHRDb25zdHJ1Y3RvcilcbnZhciBhbk9iamVjdCAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsIFNQRUNJRVMgICA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE8sIEQpe1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yLCBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID09IHVuZGVmaW5lZCA/IEQgOiBhRnVuY3Rpb24oUyk7XG59OyIsInZhciBjdHggICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGludm9rZSAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2ludm9rZScpXG4gICwgaHRtbCAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faHRtbCcpXG4gICwgY2VsICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpXG4gICwgZ2xvYmFsICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBwcm9jZXNzICAgICAgICAgICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIHNldFRhc2sgICAgICAgICAgICA9IGdsb2JhbC5zZXRJbW1lZGlhdGVcbiAgLCBjbGVhclRhc2sgICAgICAgICAgPSBnbG9iYWwuY2xlYXJJbW1lZGlhdGVcbiAgLCBNZXNzYWdlQ2hhbm5lbCAgICAgPSBnbG9iYWwuTWVzc2FnZUNoYW5uZWxcbiAgLCBjb3VudGVyICAgICAgICAgICAgPSAwXG4gICwgcXVldWUgICAgICAgICAgICAgID0ge31cbiAgLCBPTlJFQURZU1RBVEVDSEFOR0UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJ1xuICAsIGRlZmVyLCBjaGFubmVsLCBwb3J0O1xudmFyIHJ1biA9IGZ1bmN0aW9uKCl7XG4gIHZhciBpZCA9ICt0aGlzO1xuICBpZihxdWV1ZS5oYXNPd25Qcm9wZXJ0eShpZCkpe1xuICAgIHZhciBmbiA9IHF1ZXVlW2lkXTtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICAgIGZuKCk7XG4gIH1cbn07XG52YXIgbGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCl7XG4gIHJ1bi5jYWxsKGV2ZW50LmRhdGEpO1xufTtcbi8vIE5vZGUuanMgMC45KyAmIElFMTArIGhhcyBzZXRJbW1lZGlhdGUsIG90aGVyd2lzZTpcbmlmKCFzZXRUYXNrIHx8ICFjbGVhclRhc2spe1xuICBzZXRUYXNrID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGZuKXtcbiAgICB2YXIgYXJncyA9IFtdLCBpID0gMTtcbiAgICB3aGlsZShhcmd1bWVudHMubGVuZ3RoID4gaSlhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHF1ZXVlWysrY291bnRlcl0gPSBmdW5jdGlvbigpe1xuICAgICAgaW52b2tlKHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nID8gZm4gOiBGdW5jdGlvbihmbiksIGFyZ3MpO1xuICAgIH07XG4gICAgZGVmZXIoY291bnRlcik7XG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH07XG4gIGNsZWFyVGFzayA9IGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGlkKXtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICB9O1xuICAvLyBOb2RlLmpzIDAuOC1cbiAgaWYocmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBCcm93c2VycyB3aXRoIE1lc3NhZ2VDaGFubmVsLCBpbmNsdWRlcyBXZWJXb3JrZXJzXG4gIH0gZWxzZSBpZihNZXNzYWdlQ2hhbm5lbCl7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbDtcbiAgICBwb3J0ICAgID0gY2hhbm5lbC5wb3J0MjtcbiAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGxpc3RlbmVyO1xuICAgIGRlZmVyID0gY3R4KHBvcnQucG9zdE1lc3NhZ2UsIHBvcnQsIDEpO1xuICAvLyBCcm93c2VycyB3aXRoIHBvc3RNZXNzYWdlLCBza2lwIFdlYldvcmtlcnNcbiAgLy8gSUU4IGhhcyBwb3N0TWVzc2FnZSwgYnV0IGl0J3Mgc3luYyAmIHR5cGVvZiBpdHMgcG9zdE1lc3NhZ2UgaXMgJ29iamVjdCdcbiAgfSBlbHNlIGlmKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cyl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoaWQgKyAnJywgJyonKTtcbiAgICB9O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYoT05SRUFEWVNUQVRFQ0hBTkdFIGluIGNlbCgnc2NyaXB0Jykpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgaHRtbC5hcHBlbmRDaGlsZChjZWwoJ3NjcmlwdCcpKVtPTlJFQURZU1RBVEVDSEFOR0VdID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuLmNhbGwoaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgc2V0VGltZW91dChjdHgocnVuLCBpZCwgMSksIDApO1xuICAgIH07XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6ICAgc2V0VGFzayxcbiAgY2xlYXI6IGNsZWFyVGFza1xufTsiLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBtYWNyb3Rhc2sgPSByZXF1aXJlKCcuL190YXNrJykuc2V0XG4gICwgT2JzZXJ2ZXIgID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXJcbiAgLCBwcm9jZXNzICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIFByb21pc2UgICA9IGdsb2JhbC5Qcm9taXNlXG4gICwgaXNOb2RlICAgID0gcmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7XG4gIHZhciBoZWFkLCBsYXN0LCBub3RpZnk7XG5cbiAgdmFyIGZsdXNoID0gZnVuY3Rpb24oKXtcbiAgICB2YXIgcGFyZW50LCBmbjtcbiAgICBpZihpc05vZGUgJiYgKHBhcmVudCA9IHByb2Nlc3MuZG9tYWluKSlwYXJlbnQuZXhpdCgpO1xuICAgIHdoaWxlKGhlYWQpe1xuICAgICAgZm4gICA9IGhlYWQuZm47XG4gICAgICBoZWFkID0gaGVhZC5uZXh0O1xuICAgICAgdHJ5IHtcbiAgICAgICAgZm4oKTtcbiAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIGlmKGhlYWQpbm90aWZ5KCk7XG4gICAgICAgIGVsc2UgbGFzdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9IGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgaWYocGFyZW50KXBhcmVudC5lbnRlcigpO1xuICB9O1xuXG4gIC8vIE5vZGUuanNcbiAgaWYoaXNOb2RlKXtcbiAgICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gICAgfTtcbiAgLy8gYnJvd3NlcnMgd2l0aCBNdXRhdGlvbk9ic2VydmVyXG4gIH0gZWxzZSBpZihPYnNlcnZlcil7XG4gICAgdmFyIHRvZ2dsZSA9IHRydWVcbiAgICAgICwgbm9kZSAgID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgIG5ldyBPYnNlcnZlcihmbHVzaCkub2JzZXJ2ZShub2RlLCB7Y2hhcmFjdGVyRGF0YTogdHJ1ZX0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XG4gICAgICBub2RlLmRhdGEgPSB0b2dnbGUgPSAhdG9nZ2xlO1xuICAgIH07XG4gIC8vIGVudmlyb25tZW50cyB3aXRoIG1heWJlIG5vbi1jb21wbGV0ZWx5IGNvcnJlY3QsIGJ1dCBleGlzdGVudCBQcm9taXNlXG4gIH0gZWxzZSBpZihQcm9taXNlICYmIFByb21pc2UucmVzb2x2ZSl7XG4gICAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgICAgcHJvbWlzZS50aGVuKGZsdXNoKTtcbiAgICB9O1xuICAvLyBmb3Igb3RoZXIgZW52aXJvbm1lbnRzIC0gbWFjcm90YXNrIGJhc2VkIG9uOlxuICAvLyAtIHNldEltbWVkaWF0ZVxuICAvLyAtIE1lc3NhZ2VDaGFubmVsXG4gIC8vIC0gd2luZG93LnBvc3RNZXNzYWdcbiAgLy8gLSBvbnJlYWR5c3RhdGVjaGFuZ2VcbiAgLy8gLSBzZXRUaW1lb3V0XG4gIH0gZWxzZSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcbiAgICAgIG1hY3JvdGFzay5jYWxsKGdsb2JhbCwgZmx1c2gpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oZm4pe1xuICAgIHZhciB0YXNrID0ge2ZuOiBmbiwgbmV4dDogdW5kZWZpbmVkfTtcbiAgICBpZihsYXN0KWxhc3QubmV4dCA9IHRhc2s7XG4gICAgaWYoIWhlYWQpe1xuICAgICAgaGVhZCA9IHRhc2s7XG4gICAgICBub3RpZnkoKTtcbiAgICB9IGxhc3QgPSB0YXNrO1xuICB9O1xufTsiLCJ2YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0YXJnZXQsIHNyYywgc2FmZSl7XG4gIGZvcih2YXIga2V5IGluIHNyYylyZWRlZmluZSh0YXJnZXQsIGtleSwgc3JjW2tleV0sIHNhZmUpO1xuICByZXR1cm4gdGFyZ2V0O1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICwgZ2xvYmFsICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjdHggICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGNsYXNzb2YgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsICRleHBvcnQgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgaXNPYmplY3QgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBhRnVuY3Rpb24gICAgICAgICAgPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJylcbiAgLCBhbkluc3RhbmNlICAgICAgICAgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpXG4gICwgZm9yT2YgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZm9yLW9mJylcbiAgLCBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJylcbiAgLCB0YXNrICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL190YXNrJykuc2V0XG4gICwgbWljcm90YXNrICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWljcm90YXNrJykoKVxuICAsIFBST01JU0UgICAgICAgICAgICA9ICdQcm9taXNlJ1xuICAsIFR5cGVFcnJvciAgICAgICAgICA9IGdsb2JhbC5UeXBlRXJyb3JcbiAgLCBwcm9jZXNzICAgICAgICAgICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsICRQcm9taXNlICAgICAgICAgICA9IGdsb2JhbFtQUk9NSVNFXVxuICAsIHByb2Nlc3MgICAgICAgICAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgaXNOb2RlICAgICAgICAgICAgID0gY2xhc3NvZihwcm9jZXNzKSA9PSAncHJvY2VzcydcbiAgLCBlbXB0eSAgICAgICAgICAgICAgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9XG4gICwgSW50ZXJuYWwsIEdlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSwgV3JhcHBlcjtcblxudmFyIFVTRV9OQVRJVkUgPSAhIWZ1bmN0aW9uKCl7XG4gIHRyeSB7XG4gICAgLy8gY29ycmVjdCBzdWJjbGFzc2luZyB3aXRoIEBAc3BlY2llcyBzdXBwb3J0XG4gICAgdmFyIHByb21pc2UgICAgID0gJFByb21pc2UucmVzb2x2ZSgxKVxuICAgICAgLCBGYWtlUHJvbWlzZSA9IChwcm9taXNlLmNvbnN0cnVjdG9yID0ge30pW3JlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyldID0gZnVuY3Rpb24oZXhlYyl7IGV4ZWMoZW1wdHksIGVtcHR5KTsgfTtcbiAgICAvLyB1bmhhbmRsZWQgcmVqZWN0aW9ucyB0cmFja2luZyBzdXBwb3J0LCBOb2RlSlMgUHJvbWlzZSB3aXRob3V0IGl0IGZhaWxzIEBAc3BlY2llcyB0ZXN0XG4gICAgcmV0dXJuIChpc05vZGUgfHwgdHlwZW9mIFByb21pc2VSZWplY3Rpb25FdmVudCA9PSAnZnVuY3Rpb24nKSAmJiBwcm9taXNlLnRoZW4oZW1wdHkpIGluc3RhbmNlb2YgRmFrZVByb21pc2U7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbn0oKTtcblxuLy8gaGVscGVyc1xudmFyIHNhbWVDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uKGEsIGIpe1xuICAvLyB3aXRoIGxpYnJhcnkgd3JhcHBlciBzcGVjaWFsIGNhc2VcbiAgcmV0dXJuIGEgPT09IGIgfHwgYSA9PT0gJFByb21pc2UgJiYgYiA9PT0gV3JhcHBlcjtcbn07XG52YXIgaXNUaGVuYWJsZSA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIHRoZW47XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgdHlwZW9mICh0aGVuID0gaXQudGhlbikgPT0gJ2Z1bmN0aW9uJyA/IHRoZW4gOiBmYWxzZTtcbn07XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbihDKXtcbiAgcmV0dXJuIHNhbWVDb25zdHJ1Y3RvcigkUHJvbWlzZSwgQylcbiAgICA/IG5ldyBQcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgIDogbmV3IEdlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eShDKTtcbn07XG52YXIgUHJvbWlzZUNhcGFiaWxpdHkgPSBHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbihDKXtcbiAgdmFyIHJlc29sdmUsIHJlamVjdDtcbiAgdGhpcy5wcm9taXNlID0gbmV3IEMoZnVuY3Rpb24oJCRyZXNvbHZlLCAkJHJlamVjdCl7XG4gICAgaWYocmVzb2x2ZSAhPT0gdW5kZWZpbmVkIHx8IHJlamVjdCAhPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcignQmFkIFByb21pc2UgY29uc3RydWN0b3InKTtcbiAgICByZXNvbHZlID0gJCRyZXNvbHZlO1xuICAgIHJlamVjdCAgPSAkJHJlamVjdDtcbiAgfSk7XG4gIHRoaXMucmVzb2x2ZSA9IGFGdW5jdGlvbihyZXNvbHZlKTtcbiAgdGhpcy5yZWplY3QgID0gYUZ1bmN0aW9uKHJlamVjdCk7XG59O1xudmFyIHBlcmZvcm0gPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICBleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHtlcnJvcjogZX07XG4gIH1cbn07XG52YXIgbm90aWZ5ID0gZnVuY3Rpb24ocHJvbWlzZSwgaXNSZWplY3Qpe1xuICBpZihwcm9taXNlLl9uKXJldHVybjtcbiAgcHJvbWlzZS5fbiA9IHRydWU7XG4gIHZhciBjaGFpbiA9IHByb21pc2UuX2M7XG4gIG1pY3JvdGFzayhmdW5jdGlvbigpe1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3ZcbiAgICAgICwgb2sgICAgPSBwcm9taXNlLl9zID09IDFcbiAgICAgICwgaSAgICAgPSAwO1xuICAgIHZhciBydW4gPSBmdW5jdGlvbihyZWFjdGlvbil7XG4gICAgICB2YXIgaGFuZGxlciA9IG9rID8gcmVhY3Rpb24ub2sgOiByZWFjdGlvbi5mYWlsXG4gICAgICAgICwgcmVzb2x2ZSA9IHJlYWN0aW9uLnJlc29sdmVcbiAgICAgICAgLCByZWplY3QgID0gcmVhY3Rpb24ucmVqZWN0XG4gICAgICAgICwgZG9tYWluICA9IHJlYWN0aW9uLmRvbWFpblxuICAgICAgICAsIHJlc3VsdCwgdGhlbjtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmKGhhbmRsZXIpe1xuICAgICAgICAgIGlmKCFvayl7XG4gICAgICAgICAgICBpZihwcm9taXNlLl9oID09IDIpb25IYW5kbGVVbmhhbmRsZWQocHJvbWlzZSk7XG4gICAgICAgICAgICBwcm9taXNlLl9oID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoaGFuZGxlciA9PT0gdHJ1ZSlyZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmKGRvbWFpbilkb21haW4uZW50ZXIoKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGhhbmRsZXIodmFsdWUpO1xuICAgICAgICAgICAgaWYoZG9tYWluKWRvbWFpbi5leGl0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKHJlc3VsdCA9PT0gcmVhY3Rpb24ucHJvbWlzZSl7XG4gICAgICAgICAgICByZWplY3QoVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZih0aGVuID0gaXNUaGVuYWJsZShyZXN1bHQpKXtcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXN1bHQsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSBlbHNlIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHJlamVjdCh2YWx1ZSk7XG4gICAgICB9IGNhdGNoKGUpe1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXJ1bihjaGFpbltpKytdKTsgLy8gdmFyaWFibGUgbGVuZ3RoIC0gY2FuJ3QgdXNlIGZvckVhY2hcbiAgICBwcm9taXNlLl9jID0gW107XG4gICAgcHJvbWlzZS5fbiA9IGZhbHNlO1xuICAgIGlmKGlzUmVqZWN0ICYmICFwcm9taXNlLl9oKW9uVW5oYW5kbGVkKHByb21pc2UpO1xuICB9KTtcbn07XG52YXIgb25VbmhhbmRsZWQgPSBmdW5jdGlvbihwcm9taXNlKXtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24oKXtcbiAgICB2YXIgdmFsdWUgPSBwcm9taXNlLl92XG4gICAgICAsIGFicnVwdCwgaGFuZGxlciwgY29uc29sZTtcbiAgICBpZihpc1VuaGFuZGxlZChwcm9taXNlKSl7XG4gICAgICBhYnJ1cHQgPSBwZXJmb3JtKGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKGlzTm9kZSl7XG4gICAgICAgICAgcHJvY2Vzcy5lbWl0KCd1bmhhbmRsZWRSZWplY3Rpb24nLCB2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgIH0gZWxzZSBpZihoYW5kbGVyID0gZ2xvYmFsLm9udW5oYW5kbGVkcmVqZWN0aW9uKXtcbiAgICAgICAgICBoYW5kbGVyKHtwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHZhbHVlfSk7XG4gICAgICAgIH0gZWxzZSBpZigoY29uc29sZSA9IGdsb2JhbC5jb25zb2xlKSAmJiBjb25zb2xlLmVycm9yKXtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb24nLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gQnJvd3NlcnMgc2hvdWxkIG5vdCB0cmlnZ2VyIGByZWplY3Rpb25IYW5kbGVkYCBldmVudCBpZiBpdCB3YXMgaGFuZGxlZCBoZXJlLCBOb2RlSlMgLSBzaG91bGRcbiAgICAgIHByb21pc2UuX2ggPSBpc05vZGUgfHwgaXNVbmhhbmRsZWQocHJvbWlzZSkgPyAyIDogMTtcbiAgICB9IHByb21pc2UuX2EgPSB1bmRlZmluZWQ7XG4gICAgaWYoYWJydXB0KXRocm93IGFicnVwdC5lcnJvcjtcbiAgfSk7XG59O1xudmFyIGlzVW5oYW5kbGVkID0gZnVuY3Rpb24ocHJvbWlzZSl7XG4gIGlmKHByb21pc2UuX2ggPT0gMSlyZXR1cm4gZmFsc2U7XG4gIHZhciBjaGFpbiA9IHByb21pc2UuX2EgfHwgcHJvbWlzZS5fY1xuICAgICwgaSAgICAgPSAwXG4gICAgLCByZWFjdGlvbjtcbiAgd2hpbGUoY2hhaW4ubGVuZ3RoID4gaSl7XG4gICAgcmVhY3Rpb24gPSBjaGFpbltpKytdO1xuICAgIGlmKHJlYWN0aW9uLmZhaWwgfHwgIWlzVW5oYW5kbGVkKHJlYWN0aW9uLnByb21pc2UpKXJldHVybiBmYWxzZTtcbiAgfSByZXR1cm4gdHJ1ZTtcbn07XG52YXIgb25IYW5kbGVVbmhhbmRsZWQgPSBmdW5jdGlvbihwcm9taXNlKXtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24oKXtcbiAgICB2YXIgaGFuZGxlcjtcbiAgICBpZihpc05vZGUpe1xuICAgICAgcHJvY2Vzcy5lbWl0KCdyZWplY3Rpb25IYW5kbGVkJywgcHJvbWlzZSk7XG4gICAgfSBlbHNlIGlmKGhhbmRsZXIgPSBnbG9iYWwub25yZWplY3Rpb25oYW5kbGVkKXtcbiAgICAgIGhhbmRsZXIoe3Byb21pc2U6IHByb21pc2UsIHJlYXNvbjogcHJvbWlzZS5fdn0pO1xuICAgIH1cbiAgfSk7XG59O1xudmFyICRyZWplY3QgPSBmdW5jdGlvbih2YWx1ZSl7XG4gIHZhciBwcm9taXNlID0gdGhpcztcbiAgaWYocHJvbWlzZS5fZClyZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICBwcm9taXNlLl9zID0gMjtcbiAgaWYoIXByb21pc2UuX2EpcHJvbWlzZS5fYSA9IHByb21pc2UuX2Muc2xpY2UoKTtcbiAgbm90aWZ5KHByb21pc2UsIHRydWUpO1xufTtcbnZhciAkcmVzb2x2ZSA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgdmFyIHByb21pc2UgPSB0aGlzXG4gICAgLCB0aGVuO1xuICBpZihwcm9taXNlLl9kKXJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICB0cnkge1xuICAgIGlmKHByb21pc2UgPT09IHZhbHVlKXRocm93IFR5cGVFcnJvcihcIlByb21pc2UgY2FuJ3QgYmUgcmVzb2x2ZWQgaXRzZWxmXCIpO1xuICAgIGlmKHRoZW4gPSBpc1RoZW5hYmxlKHZhbHVlKSl7XG4gICAgICBtaWNyb3Rhc2soZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHdyYXBwZXIgPSB7X3c6IHByb21pc2UsIF9kOiBmYWxzZX07IC8vIHdyYXBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGVuLmNhbGwodmFsdWUsIGN0eCgkcmVzb2x2ZSwgd3JhcHBlciwgMSksIGN0eCgkcmVqZWN0LCB3cmFwcGVyLCAxKSk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgJHJlamVjdC5jYWxsKHdyYXBwZXIsIGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICAgICAgcHJvbWlzZS5fcyA9IDE7XG4gICAgICBub3RpZnkocHJvbWlzZSwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaChlKXtcbiAgICAkcmVqZWN0LmNhbGwoe193OiBwcm9taXNlLCBfZDogZmFsc2V9LCBlKTsgLy8gd3JhcFxuICB9XG59O1xuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYoIVVTRV9OQVRJVkUpe1xuICAvLyAyNS40LjMuMSBQcm9taXNlKGV4ZWN1dG9yKVxuICAkUHJvbWlzZSA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3Ipe1xuICAgIGFuSW5zdGFuY2UodGhpcywgJFByb21pc2UsIFBST01JU0UsICdfaCcpO1xuICAgIGFGdW5jdGlvbihleGVjdXRvcik7XG4gICAgSW50ZXJuYWwuY2FsbCh0aGlzKTtcbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IoY3R4KCRyZXNvbHZlLCB0aGlzLCAxKSwgY3R4KCRyZWplY3QsIHRoaXMsIDEpKTtcbiAgICB9IGNhdGNoKGVycil7XG4gICAgICAkcmVqZWN0LmNhbGwodGhpcywgZXJyKTtcbiAgICB9XG4gIH07XG4gIEludGVybmFsID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcil7XG4gICAgdGhpcy5fYyA9IFtdOyAgICAgICAgICAgICAvLyA8LSBhd2FpdGluZyByZWFjdGlvbnNcbiAgICB0aGlzLl9hID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIGNoZWNrZWQgaW4gaXNVbmhhbmRsZWQgcmVhY3Rpb25zXG4gICAgdGhpcy5fcyA9IDA7ICAgICAgICAgICAgICAvLyA8LSBzdGF0ZVxuICAgIHRoaXMuX2QgPSBmYWxzZTsgICAgICAgICAgLy8gPC0gZG9uZVxuICAgIHRoaXMuX3YgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gdmFsdWVcbiAgICB0aGlzLl9oID0gMDsgICAgICAgICAgICAgIC8vIDwtIHJlamVjdGlvbiBzdGF0ZSwgMCAtIGRlZmF1bHQsIDEgLSBoYW5kbGVkLCAyIC0gdW5oYW5kbGVkXG4gICAgdGhpcy5fbiA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBub3RpZnlcbiAgfTtcbiAgSW50ZXJuYWwucHJvdG90eXBlID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJykoJFByb21pc2UucHJvdG90eXBlLCB7XG4gICAgLy8gMjUuNC41LjMgUHJvbWlzZS5wcm90b3R5cGUudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZClcbiAgICB0aGVuOiBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKXtcbiAgICAgIHZhciByZWFjdGlvbiAgICA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCAkUHJvbWlzZSkpO1xuICAgICAgcmVhY3Rpb24ub2sgICAgID0gdHlwZW9mIG9uRnVsZmlsbGVkID09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IHRydWU7XG4gICAgICByZWFjdGlvbi5mYWlsICAgPSB0eXBlb2Ygb25SZWplY3RlZCA9PSAnZnVuY3Rpb24nICYmIG9uUmVqZWN0ZWQ7XG4gICAgICByZWFjdGlvbi5kb21haW4gPSBpc05vZGUgPyBwcm9jZXNzLmRvbWFpbiA6IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2MucHVzaChyZWFjdGlvbik7XG4gICAgICBpZih0aGlzLl9hKXRoaXMuX2EucHVzaChyZWFjdGlvbik7XG4gICAgICBpZih0aGlzLl9zKW5vdGlmeSh0aGlzLCBmYWxzZSk7XG4gICAgICByZXR1cm4gcmVhY3Rpb24ucHJvbWlzZTtcbiAgICB9LFxuICAgIC8vIDI1LjQuNS4xIFByb21pc2UucHJvdG90eXBlLmNhdGNoKG9uUmVqZWN0ZWQpXG4gICAgJ2NhdGNoJzogZnVuY3Rpb24ob25SZWplY3RlZCl7XG4gICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG4gICAgfVxuICB9KTtcbiAgUHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbigpe1xuICAgIHZhciBwcm9taXNlICA9IG5ldyBJbnRlcm5hbDtcbiAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xuICAgIHRoaXMucmVzb2x2ZSA9IGN0eCgkcmVzb2x2ZSwgcHJvbWlzZSwgMSk7XG4gICAgdGhpcy5yZWplY3QgID0gY3R4KCRyZWplY3QsIHByb21pc2UsIDEpO1xuICB9O1xufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7UHJvbWlzZTogJFByb21pc2V9KTtcbnJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJykoJFByb21pc2UsIFBST01JU0UpO1xucmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKShQUk9NSVNFKTtcbldyYXBwZXIgPSByZXF1aXJlKCcuL19jb3JlJylbUFJPTUlTRV07XG5cbi8vIHN0YXRpY3NcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjUgUHJvbWlzZS5yZWplY3QocilcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocil7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSh0aGlzKVxuICAgICAgLCAkJHJlamVjdCAgID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgJCRyZWplY3Qocik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIChMSUJSQVJZIHx8ICFVU0VfTkFUSVZFKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNiBQcm9taXNlLnJlc29sdmUoeClcbiAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZSh4KXtcbiAgICAvLyBpbnN0YW5jZW9mIGluc3RlYWQgb2YgaW50ZXJuYWwgc2xvdCBjaGVjayBiZWNhdXNlIHdlIHNob3VsZCBmaXggaXQgd2l0aG91dCByZXBsYWNlbWVudCBuYXRpdmUgUHJvbWlzZSBjb3JlXG4gICAgaWYoeCBpbnN0YW5jZW9mICRQcm9taXNlICYmIHNhbWVDb25zdHJ1Y3Rvcih4LmNvbnN0cnVjdG9yLCB0aGlzKSlyZXR1cm4geDtcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHRoaXMpXG4gICAgICAsICQkcmVzb2x2ZSAgPSBjYXBhYmlsaXR5LnJlc29sdmU7XG4gICAgJCRyZXNvbHZlKHgpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhKFVTRV9OQVRJVkUgJiYgcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXtcbiAgJFByb21pc2UuYWxsKGl0ZXIpWydjYXRjaCddKGVtcHR5KTtcbn0pKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuMSBQcm9taXNlLmFsbChpdGVyYWJsZSlcbiAgYWxsOiBmdW5jdGlvbiBhbGwoaXRlcmFibGUpe1xuICAgIHZhciBDICAgICAgICAgID0gdGhpc1xuICAgICAgLCBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgICwgcmVzb2x2ZSAgICA9IGNhcGFiaWxpdHkucmVzb2x2ZVxuICAgICAgLCByZWplY3QgICAgID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIGFicnVwdCA9IHBlcmZvcm0oZnVuY3Rpb24oKXtcbiAgICAgIHZhciB2YWx1ZXMgICAgPSBbXVxuICAgICAgICAsIGluZGV4ICAgICA9IDBcbiAgICAgICAgLCByZW1haW5pbmcgPSAxO1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbihwcm9taXNlKXtcbiAgICAgICAgdmFyICRpbmRleCAgICAgICAgPSBpbmRleCsrXG4gICAgICAgICAgLCBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgIHJlbWFpbmluZysrO1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgaWYoYWxyZWFkeUNhbGxlZClyZXR1cm47XG4gICAgICAgICAgYWxyZWFkeUNhbGxlZCAgPSB0cnVlO1xuICAgICAgICAgIHZhbHVlc1skaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgICAgICB9LCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgfSk7XG4gICAgaWYoYWJydXB0KXJlamVjdChhYnJ1cHQuZXJyb3IpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH0sXG4gIC8vIDI1LjQuNC40IFByb21pc2UucmFjZShpdGVyYWJsZSlcbiAgcmFjZTogZnVuY3Rpb24gcmFjZShpdGVyYWJsZSl7XG4gICAgdmFyIEMgICAgICAgICAgPSB0aGlzXG4gICAgICAsIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgICAgLCByZWplY3QgICAgID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIGFicnVwdCA9IHBlcmZvcm0oZnVuY3Rpb24oKXtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24ocHJvbWlzZSl7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGNhcGFiaWxpdHkucmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmKGFicnVwdClyZWplY3QoYWJydXB0LmVycm9yKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgZFAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgY3JlYXRlICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJylcbiAgLCByZWRlZmluZUFsbCA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpXG4gICwgY3R4ICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGFuSW5zdGFuY2UgID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKVxuICAsIGRlZmluZWQgICAgID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpXG4gICwgZm9yT2YgICAgICAgPSByZXF1aXJlKCcuL19mb3Itb2YnKVxuICAsICRpdGVyRGVmaW5lID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKVxuICAsIHN0ZXAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJylcbiAgLCBzZXRTcGVjaWVzICA9IHJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJylcbiAgLCBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJylcbiAgLCBmYXN0S2V5ICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKS5mYXN0S2V5XG4gICwgU0laRSAgICAgICAgPSBERVNDUklQVE9SUyA/ICdfcycgOiAnc2l6ZSc7XG5cbnZhciBnZXRFbnRyeSA9IGZ1bmN0aW9uKHRoYXQsIGtleSl7XG4gIC8vIGZhc3QgY2FzZVxuICB2YXIgaW5kZXggPSBmYXN0S2V5KGtleSksIGVudHJ5O1xuICBpZihpbmRleCAhPT0gJ0YnKXJldHVybiB0aGF0Ll9pW2luZGV4XTtcbiAgLy8gZnJvemVuIG9iamVjdCBjYXNlXG4gIGZvcihlbnRyeSA9IHRoYXQuX2Y7IGVudHJ5OyBlbnRyeSA9IGVudHJ5Lm4pe1xuICAgIGlmKGVudHJ5LmsgPT0ga2V5KXJldHVybiBlbnRyeTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENvbnN0cnVjdG9yOiBmdW5jdGlvbih3cmFwcGVyLCBOQU1FLCBJU19NQVAsIEFEREVSKXtcbiAgICB2YXIgQyA9IHdyYXBwZXIoZnVuY3Rpb24odGhhdCwgaXRlcmFibGUpe1xuICAgICAgYW5JbnN0YW5jZSh0aGF0LCBDLCBOQU1FLCAnX2knKTtcbiAgICAgIHRoYXQuX2kgPSBjcmVhdGUobnVsbCk7IC8vIGluZGV4XG4gICAgICB0aGF0Ll9mID0gdW5kZWZpbmVkOyAgICAvLyBmaXJzdCBlbnRyeVxuICAgICAgdGhhdC5fbCA9IHVuZGVmaW5lZDsgICAgLy8gbGFzdCBlbnRyeVxuICAgICAgdGhhdFtTSVpFXSA9IDA7ICAgICAgICAgLy8gc2l6ZVxuICAgICAgaWYoaXRlcmFibGUgIT0gdW5kZWZpbmVkKWZvck9mKGl0ZXJhYmxlLCBJU19NQVAsIHRoYXRbQURERVJdLCB0aGF0KTtcbiAgICB9KTtcbiAgICByZWRlZmluZUFsbChDLnByb3RvdHlwZSwge1xuICAgICAgLy8gMjMuMS4zLjEgTWFwLnByb3RvdHlwZS5jbGVhcigpXG4gICAgICAvLyAyMy4yLjMuMiBTZXQucHJvdG90eXBlLmNsZWFyKClcbiAgICAgIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpe1xuICAgICAgICBmb3IodmFyIHRoYXQgPSB0aGlzLCBkYXRhID0gdGhhdC5faSwgZW50cnkgPSB0aGF0Ll9mOyBlbnRyeTsgZW50cnkgPSBlbnRyeS5uKXtcbiAgICAgICAgICBlbnRyeS5yID0gdHJ1ZTtcbiAgICAgICAgICBpZihlbnRyeS5wKWVudHJ5LnAgPSBlbnRyeS5wLm4gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgZGVsZXRlIGRhdGFbZW50cnkuaV07XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5fZiA9IHRoYXQuX2wgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoYXRbU0laRV0gPSAwO1xuICAgICAgfSxcbiAgICAgIC8vIDIzLjEuMy4zIE1hcC5wcm90b3R5cGUuZGVsZXRlKGtleSlcbiAgICAgIC8vIDIzLjIuMy40IFNldC5wcm90b3R5cGUuZGVsZXRlKHZhbHVlKVxuICAgICAgJ2RlbGV0ZSc6IGZ1bmN0aW9uKGtleSl7XG4gICAgICAgIHZhciB0aGF0ICA9IHRoaXNcbiAgICAgICAgICAsIGVudHJ5ID0gZ2V0RW50cnkodGhhdCwga2V5KTtcbiAgICAgICAgaWYoZW50cnkpe1xuICAgICAgICAgIHZhciBuZXh0ID0gZW50cnkublxuICAgICAgICAgICAgLCBwcmV2ID0gZW50cnkucDtcbiAgICAgICAgICBkZWxldGUgdGhhdC5faVtlbnRyeS5pXTtcbiAgICAgICAgICBlbnRyeS5yID0gdHJ1ZTtcbiAgICAgICAgICBpZihwcmV2KXByZXYubiA9IG5leHQ7XG4gICAgICAgICAgaWYobmV4dCluZXh0LnAgPSBwcmV2O1xuICAgICAgICAgIGlmKHRoYXQuX2YgPT0gZW50cnkpdGhhdC5fZiA9IG5leHQ7XG4gICAgICAgICAgaWYodGhhdC5fbCA9PSBlbnRyeSl0aGF0Ll9sID0gcHJldjtcbiAgICAgICAgICB0aGF0W1NJWkVdLS07XG4gICAgICAgIH0gcmV0dXJuICEhZW50cnk7XG4gICAgICB9LFxuICAgICAgLy8gMjMuMi4zLjYgU2V0LnByb3RvdHlwZS5mb3JFYWNoKGNhbGxiYWNrZm4sIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gICAgICAvLyAyMy4xLjMuNSBNYXAucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgICAgIGZvckVhY2g6IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2tmbiAvKiwgdGhhdCA9IHVuZGVmaW5lZCAqLyl7XG4gICAgICAgIGFuSW5zdGFuY2UodGhpcywgQywgJ2ZvckVhY2gnKTtcbiAgICAgICAgdmFyIGYgPSBjdHgoY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQsIDMpXG4gICAgICAgICAgLCBlbnRyeTtcbiAgICAgICAgd2hpbGUoZW50cnkgPSBlbnRyeSA/IGVudHJ5Lm4gOiB0aGlzLl9mKXtcbiAgICAgICAgICBmKGVudHJ5LnYsIGVudHJ5LmssIHRoaXMpO1xuICAgICAgICAgIC8vIHJldmVydCB0byB0aGUgbGFzdCBleGlzdGluZyBlbnRyeVxuICAgICAgICAgIHdoaWxlKGVudHJ5ICYmIGVudHJ5LnIpZW50cnkgPSBlbnRyeS5wO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjcgTWFwLnByb3RvdHlwZS5oYXMoa2V5KVxuICAgICAgLy8gMjMuMi4zLjcgU2V0LnByb3RvdHlwZS5oYXModmFsdWUpXG4gICAgICBoYXM6IGZ1bmN0aW9uIGhhcyhrZXkpe1xuICAgICAgICByZXR1cm4gISFnZXRFbnRyeSh0aGlzLCBrZXkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmKERFU0NSSVBUT1JTKWRQKEMucHJvdG90eXBlLCAnc2l6ZScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIGRlZmluZWQodGhpc1tTSVpFXSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIEM7XG4gIH0sXG4gIGRlZjogZnVuY3Rpb24odGhhdCwga2V5LCB2YWx1ZSl7XG4gICAgdmFyIGVudHJ5ID0gZ2V0RW50cnkodGhhdCwga2V5KVxuICAgICAgLCBwcmV2LCBpbmRleDtcbiAgICAvLyBjaGFuZ2UgZXhpc3RpbmcgZW50cnlcbiAgICBpZihlbnRyeSl7XG4gICAgICBlbnRyeS52ID0gdmFsdWU7XG4gICAgLy8gY3JlYXRlIG5ldyBlbnRyeVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGF0Ll9sID0gZW50cnkgPSB7XG4gICAgICAgIGk6IGluZGV4ID0gZmFzdEtleShrZXksIHRydWUpLCAvLyA8LSBpbmRleFxuICAgICAgICBrOiBrZXksICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0ga2V5XG4gICAgICAgIHY6IHZhbHVlLCAgICAgICAgICAgICAgICAgICAgICAvLyA8LSB2YWx1ZVxuICAgICAgICBwOiBwcmV2ID0gdGhhdC5fbCwgICAgICAgICAgICAgLy8gPC0gcHJldmlvdXMgZW50cnlcbiAgICAgICAgbjogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgIC8vIDwtIG5leHQgZW50cnlcbiAgICAgICAgcjogZmFsc2UgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIHJlbW92ZWRcbiAgICAgIH07XG4gICAgICBpZighdGhhdC5fZil0aGF0Ll9mID0gZW50cnk7XG4gICAgICBpZihwcmV2KXByZXYubiA9IGVudHJ5O1xuICAgICAgdGhhdFtTSVpFXSsrO1xuICAgICAgLy8gYWRkIHRvIGluZGV4XG4gICAgICBpZihpbmRleCAhPT0gJ0YnKXRoYXQuX2lbaW5kZXhdID0gZW50cnk7XG4gICAgfSByZXR1cm4gdGhhdDtcbiAgfSxcbiAgZ2V0RW50cnk6IGdldEVudHJ5LFxuICBzZXRTdHJvbmc6IGZ1bmN0aW9uKEMsIE5BTUUsIElTX01BUCl7XG4gICAgLy8gYWRkIC5rZXlzLCAudmFsdWVzLCAuZW50cmllcywgW0BAaXRlcmF0b3JdXG4gICAgLy8gMjMuMS4zLjQsIDIzLjEuMy44LCAyMy4xLjMuMTEsIDIzLjEuMy4xMiwgMjMuMi4zLjUsIDIzLjIuMy44LCAyMy4yLjMuMTAsIDIzLjIuMy4xMVxuICAgICRpdGVyRGVmaW5lKEMsIE5BTUUsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcbiAgICAgIHRoaXMuX3QgPSBpdGVyYXRlZDsgIC8vIHRhcmdldFxuICAgICAgdGhpcy5fayA9IGtpbmQ7ICAgICAgLy8ga2luZFxuICAgICAgdGhpcy5fbCA9IHVuZGVmaW5lZDsgLy8gcHJldmlvdXNcbiAgICB9LCBmdW5jdGlvbigpe1xuICAgICAgdmFyIHRoYXQgID0gdGhpc1xuICAgICAgICAsIGtpbmQgID0gdGhhdC5fa1xuICAgICAgICAsIGVudHJ5ID0gdGhhdC5fbDtcbiAgICAgIC8vIHJldmVydCB0byB0aGUgbGFzdCBleGlzdGluZyBlbnRyeVxuICAgICAgd2hpbGUoZW50cnkgJiYgZW50cnkucillbnRyeSA9IGVudHJ5LnA7XG4gICAgICAvLyBnZXQgbmV4dCBlbnRyeVxuICAgICAgaWYoIXRoYXQuX3QgfHwgISh0aGF0Ll9sID0gZW50cnkgPSBlbnRyeSA/IGVudHJ5Lm4gOiB0aGF0Ll90Ll9mKSl7XG4gICAgICAgIC8vIG9yIGZpbmlzaCB0aGUgaXRlcmF0aW9uXG4gICAgICAgIHRoYXQuX3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBzdGVwKDEpO1xuICAgICAgfVxuICAgICAgLy8gcmV0dXJuIHN0ZXAgYnkga2luZFxuICAgICAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBlbnRyeS5rKTtcbiAgICAgIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgZW50cnkudik7XG4gICAgICByZXR1cm4gc3RlcCgwLCBbZW50cnkuaywgZW50cnkudl0pO1xuICAgIH0sIElTX01BUCA/ICdlbnRyaWVzJyA6ICd2YWx1ZXMnICwgIUlTX01BUCwgdHJ1ZSk7XG5cbiAgICAvLyBhZGQgW0BAc3BlY2llc10sIDIzLjEuMi4yLCAyMy4yLjIuMlxuICAgIHNldFNwZWNpZXMoTkFNRSk7XG4gIH1cbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCAkZXhwb3J0ICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgcmVkZWZpbmUgICAgICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgcmVkZWZpbmVBbGwgICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKVxuICAsIG1ldGEgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpXG4gICwgZm9yT2YgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19mb3Itb2YnKVxuICAsIGFuSW5zdGFuY2UgICAgICAgID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKVxuICAsIGlzT2JqZWN0ICAgICAgICAgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBmYWlscyAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcbiAgLCAkaXRlckRldGVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JylcbiAgLCBzZXRUb1N0cmluZ1RhZyAgICA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBpbmhlcml0SWZSZXF1aXJlZCA9IHJlcXVpcmUoJy4vX2luaGVyaXQtaWYtcmVxdWlyZWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihOQU1FLCB3cmFwcGVyLCBtZXRob2RzLCBjb21tb24sIElTX01BUCwgSVNfV0VBSyl7XG4gIHZhciBCYXNlICA9IGdsb2JhbFtOQU1FXVxuICAgICwgQyAgICAgPSBCYXNlXG4gICAgLCBBRERFUiA9IElTX01BUCA/ICdzZXQnIDogJ2FkZCdcbiAgICAsIHByb3RvID0gQyAmJiBDLnByb3RvdHlwZVxuICAgICwgTyAgICAgPSB7fTtcbiAgdmFyIGZpeE1ldGhvZCA9IGZ1bmN0aW9uKEtFWSl7XG4gICAgdmFyIGZuID0gcHJvdG9bS0VZXTtcbiAgICByZWRlZmluZShwcm90bywgS0VZLFxuICAgICAgS0VZID09ICdkZWxldGUnID8gZnVuY3Rpb24oYSl7XG4gICAgICAgIHJldHVybiBJU19XRUFLICYmICFpc09iamVjdChhKSA/IGZhbHNlIDogZm4uY2FsbCh0aGlzLCBhID09PSAwID8gMCA6IGEpO1xuICAgICAgfSA6IEtFWSA9PSAnaGFzJyA/IGZ1bmN0aW9uIGhhcyhhKXtcbiAgICAgICAgcmV0dXJuIElTX1dFQUsgJiYgIWlzT2JqZWN0KGEpID8gZmFsc2UgOiBmbi5jYWxsKHRoaXMsIGEgPT09IDAgPyAwIDogYSk7XG4gICAgICB9IDogS0VZID09ICdnZXQnID8gZnVuY3Rpb24gZ2V0KGEpe1xuICAgICAgICByZXR1cm4gSVNfV0VBSyAmJiAhaXNPYmplY3QoYSkgPyB1bmRlZmluZWQgOiBmbi5jYWxsKHRoaXMsIGEgPT09IDAgPyAwIDogYSk7XG4gICAgICB9IDogS0VZID09ICdhZGQnID8gZnVuY3Rpb24gYWRkKGEpeyBmbi5jYWxsKHRoaXMsIGEgPT09IDAgPyAwIDogYSk7IHJldHVybiB0aGlzOyB9XG4gICAgICAgIDogZnVuY3Rpb24gc2V0KGEsIGIpeyBmbi5jYWxsKHRoaXMsIGEgPT09IDAgPyAwIDogYSwgYik7IHJldHVybiB0aGlzOyB9XG4gICAgKTtcbiAgfTtcbiAgaWYodHlwZW9mIEMgIT0gJ2Z1bmN0aW9uJyB8fCAhKElTX1dFQUsgfHwgcHJvdG8uZm9yRWFjaCAmJiAhZmFpbHMoZnVuY3Rpb24oKXtcbiAgICBuZXcgQygpLmVudHJpZXMoKS5uZXh0KCk7XG4gIH0pKSl7XG4gICAgLy8gY3JlYXRlIGNvbGxlY3Rpb24gY29uc3RydWN0b3JcbiAgICBDID0gY29tbW9uLmdldENvbnN0cnVjdG9yKHdyYXBwZXIsIE5BTUUsIElTX01BUCwgQURERVIpO1xuICAgIHJlZGVmaW5lQWxsKEMucHJvdG90eXBlLCBtZXRob2RzKTtcbiAgICBtZXRhLk5FRUQgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHZhciBpbnN0YW5jZSAgICAgICAgICAgICA9IG5ldyBDXG4gICAgICAvLyBlYXJseSBpbXBsZW1lbnRhdGlvbnMgbm90IHN1cHBvcnRzIGNoYWluaW5nXG4gICAgICAsIEhBU05UX0NIQUlOSU5HICAgICAgID0gaW5zdGFuY2VbQURERVJdKElTX1dFQUsgPyB7fSA6IC0wLCAxKSAhPSBpbnN0YW5jZVxuICAgICAgLy8gVjggfiAgQ2hyb21pdW0gNDAtIHdlYWstY29sbGVjdGlvbnMgdGhyb3dzIG9uIHByaW1pdGl2ZXMsIGJ1dCBzaG91bGQgcmV0dXJuIGZhbHNlXG4gICAgICAsIFRIUk9XU19PTl9QUklNSVRJVkVTID0gZmFpbHMoZnVuY3Rpb24oKXsgaW5zdGFuY2UuaGFzKDEpOyB9KVxuICAgICAgLy8gbW9zdCBlYXJseSBpbXBsZW1lbnRhdGlvbnMgZG9lc24ndCBzdXBwb3J0cyBpdGVyYWJsZXMsIG1vc3QgbW9kZXJuIC0gbm90IGNsb3NlIGl0IGNvcnJlY3RseVxuICAgICAgLCBBQ0NFUFRfSVRFUkFCTEVTICAgICA9ICRpdGVyRGV0ZWN0KGZ1bmN0aW9uKGl0ZXIpeyBuZXcgQyhpdGVyKTsgfSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICAgIC8vIGZvciBlYXJseSBpbXBsZW1lbnRhdGlvbnMgLTAgYW5kICswIG5vdCB0aGUgc2FtZVxuICAgICAgLCBCVUdHWV9aRVJPID0gIUlTX1dFQUsgJiYgZmFpbHMoZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gVjggfiBDaHJvbWl1bSA0Mi0gZmFpbHMgb25seSB3aXRoIDUrIGVsZW1lbnRzXG4gICAgICAgIHZhciAkaW5zdGFuY2UgPSBuZXcgQygpXG4gICAgICAgICAgLCBpbmRleCAgICAgPSA1O1xuICAgICAgICB3aGlsZShpbmRleC0tKSRpbnN0YW5jZVtBRERFUl0oaW5kZXgsIGluZGV4KTtcbiAgICAgICAgcmV0dXJuICEkaW5zdGFuY2UuaGFzKC0wKTtcbiAgICAgIH0pO1xuICAgIGlmKCFBQ0NFUFRfSVRFUkFCTEVTKXsgXG4gICAgICBDID0gd3JhcHBlcihmdW5jdGlvbih0YXJnZXQsIGl0ZXJhYmxlKXtcbiAgICAgICAgYW5JbnN0YW5jZSh0YXJnZXQsIEMsIE5BTUUpO1xuICAgICAgICB2YXIgdGhhdCA9IGluaGVyaXRJZlJlcXVpcmVkKG5ldyBCYXNlLCB0YXJnZXQsIEMpO1xuICAgICAgICBpZihpdGVyYWJsZSAhPSB1bmRlZmluZWQpZm9yT2YoaXRlcmFibGUsIElTX01BUCwgdGhhdFtBRERFUl0sIHRoYXQpO1xuICAgICAgICByZXR1cm4gdGhhdDtcbiAgICAgIH0pO1xuICAgICAgQy5wcm90b3R5cGUgPSBwcm90bztcbiAgICAgIHByb3RvLmNvbnN0cnVjdG9yID0gQztcbiAgICB9XG4gICAgaWYoVEhST1dTX09OX1BSSU1JVElWRVMgfHwgQlVHR1lfWkVSTyl7XG4gICAgICBmaXhNZXRob2QoJ2RlbGV0ZScpO1xuICAgICAgZml4TWV0aG9kKCdoYXMnKTtcbiAgICAgIElTX01BUCAmJiBmaXhNZXRob2QoJ2dldCcpO1xuICAgIH1cbiAgICBpZihCVUdHWV9aRVJPIHx8IEhBU05UX0NIQUlOSU5HKWZpeE1ldGhvZChBRERFUik7XG4gICAgLy8gd2VhayBjb2xsZWN0aW9ucyBzaG91bGQgbm90IGNvbnRhaW5zIC5jbGVhciBtZXRob2RcbiAgICBpZihJU19XRUFLICYmIHByb3RvLmNsZWFyKWRlbGV0ZSBwcm90by5jbGVhcjtcbiAgfVxuXG4gIHNldFRvU3RyaW5nVGFnKEMsIE5BTUUpO1xuXG4gIE9bTkFNRV0gPSBDO1xuICAkZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqIChDICE9IEJhc2UpLCBPKTtcblxuICBpZighSVNfV0VBSyljb21tb24uc2V0U3Ryb25nKEMsIE5BTUUsIElTX01BUCk7XG5cbiAgcmV0dXJuIEM7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBzdHJvbmcgPSByZXF1aXJlKCcuL19jb2xsZWN0aW9uLXN0cm9uZycpO1xuXG4vLyAyMy4xIE1hcCBPYmplY3RzXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24nKSgnTWFwJywgZnVuY3Rpb24oZ2V0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIE1hcCgpeyByZXR1cm4gZ2V0KHRoaXMsIGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTsgfTtcbn0sIHtcbiAgLy8gMjMuMS4zLjYgTWFwLnByb3RvdHlwZS5nZXQoa2V5KVxuICBnZXQ6IGZ1bmN0aW9uIGdldChrZXkpe1xuICAgIHZhciBlbnRyeSA9IHN0cm9uZy5nZXRFbnRyeSh0aGlzLCBrZXkpO1xuICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeS52O1xuICB9LFxuICAvLyAyMy4xLjMuOSBNYXAucHJvdG90eXBlLnNldChrZXksIHZhbHVlKVxuICBzZXQ6IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKXtcbiAgICByZXR1cm4gc3Ryb25nLmRlZih0aGlzLCBrZXkgPT09IDAgPyAwIDoga2V5LCB2YWx1ZSk7XG4gIH1cbn0sIHN0cm9uZywgdHJ1ZSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHN0cm9uZyA9IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24tc3Ryb25nJyk7XG5cbi8vIDIzLjIgU2V0IE9iamVjdHNcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbicpKCdTZXQnLCBmdW5jdGlvbihnZXQpe1xuICByZXR1cm4gZnVuY3Rpb24gU2V0KCl7IHJldHVybiBnZXQodGhpcywgYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpOyB9O1xufSwge1xuICAvLyAyMy4yLjMuMSBTZXQucHJvdG90eXBlLmFkZCh2YWx1ZSlcbiAgYWRkOiBmdW5jdGlvbiBhZGQodmFsdWUpe1xuICAgIHJldHVybiBzdHJvbmcuZGVmKHRoaXMsIHZhbHVlID0gdmFsdWUgPT09IDAgPyAwIDogdmFsdWUsIHZhbHVlKTtcbiAgfVxufSwgc3Ryb25nKTsiLCIndXNlIHN0cmljdCc7XG52YXIgcmVkZWZpbmVBbGwgICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKVxuICAsIGdldFdlYWsgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpLmdldFdlYWtcbiAgLCBhbk9iamVjdCAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgaXNPYmplY3QgICAgICAgICAgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGFuSW5zdGFuY2UgICAgICAgID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKVxuICAsIGZvck9mICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZm9yLW9mJylcbiAgLCBjcmVhdGVBcnJheU1ldGhvZCA9IHJlcXVpcmUoJy4vX2FycmF5LW1ldGhvZHMnKVxuICAsICRoYXMgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBhcnJheUZpbmQgICAgICAgICA9IGNyZWF0ZUFycmF5TWV0aG9kKDUpXG4gICwgYXJyYXlGaW5kSW5kZXggICAgPSBjcmVhdGVBcnJheU1ldGhvZCg2KVxuICAsIGlkICAgICAgICAgICAgICAgID0gMDtcblxuLy8gZmFsbGJhY2sgZm9yIHVuY2F1Z2h0IGZyb3plbiBrZXlzXG52YXIgdW5jYXVnaHRGcm96ZW5TdG9yZSA9IGZ1bmN0aW9uKHRoYXQpe1xuICByZXR1cm4gdGhhdC5fbCB8fCAodGhhdC5fbCA9IG5ldyBVbmNhdWdodEZyb3plblN0b3JlKTtcbn07XG52YXIgVW5jYXVnaHRGcm96ZW5TdG9yZSA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuYSA9IFtdO1xufTtcbnZhciBmaW5kVW5jYXVnaHRGcm96ZW4gPSBmdW5jdGlvbihzdG9yZSwga2V5KXtcbiAgcmV0dXJuIGFycmF5RmluZChzdG9yZS5hLCBmdW5jdGlvbihpdCl7XG4gICAgcmV0dXJuIGl0WzBdID09PSBrZXk7XG4gIH0pO1xufTtcblVuY2F1Z2h0RnJvemVuU3RvcmUucHJvdG90eXBlID0ge1xuICBnZXQ6IGZ1bmN0aW9uKGtleSl7XG4gICAgdmFyIGVudHJ5ID0gZmluZFVuY2F1Z2h0RnJvemVuKHRoaXMsIGtleSk7XG4gICAgaWYoZW50cnkpcmV0dXJuIGVudHJ5WzFdO1xuICB9LFxuICBoYXM6IGZ1bmN0aW9uKGtleSl7XG4gICAgcmV0dXJuICEhZmluZFVuY2F1Z2h0RnJvemVuKHRoaXMsIGtleSk7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XG4gICAgdmFyIGVudHJ5ID0gZmluZFVuY2F1Z2h0RnJvemVuKHRoaXMsIGtleSk7XG4gICAgaWYoZW50cnkpZW50cnlbMV0gPSB2YWx1ZTtcbiAgICBlbHNlIHRoaXMuYS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0sXG4gICdkZWxldGUnOiBmdW5jdGlvbihrZXkpe1xuICAgIHZhciBpbmRleCA9IGFycmF5RmluZEluZGV4KHRoaXMuYSwgZnVuY3Rpb24oaXQpe1xuICAgICAgcmV0dXJuIGl0WzBdID09PSBrZXk7XG4gICAgfSk7XG4gICAgaWYofmluZGV4KXRoaXMuYS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiAhIX5pbmRleDtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENvbnN0cnVjdG9yOiBmdW5jdGlvbih3cmFwcGVyLCBOQU1FLCBJU19NQVAsIEFEREVSKXtcbiAgICB2YXIgQyA9IHdyYXBwZXIoZnVuY3Rpb24odGhhdCwgaXRlcmFibGUpe1xuICAgICAgYW5JbnN0YW5jZSh0aGF0LCBDLCBOQU1FLCAnX2knKTtcbiAgICAgIHRoYXQuX2kgPSBpZCsrOyAgICAgIC8vIGNvbGxlY3Rpb24gaWRcbiAgICAgIHRoYXQuX2wgPSB1bmRlZmluZWQ7IC8vIGxlYWsgc3RvcmUgZm9yIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RzXG4gICAgICBpZihpdGVyYWJsZSAhPSB1bmRlZmluZWQpZm9yT2YoaXRlcmFibGUsIElTX01BUCwgdGhhdFtBRERFUl0sIHRoYXQpO1xuICAgIH0pO1xuICAgIHJlZGVmaW5lQWxsKEMucHJvdG90eXBlLCB7XG4gICAgICAvLyAyMy4zLjMuMiBXZWFrTWFwLnByb3RvdHlwZS5kZWxldGUoa2V5KVxuICAgICAgLy8gMjMuNC4zLjMgV2Vha1NldC5wcm90b3R5cGUuZGVsZXRlKHZhbHVlKVxuICAgICAgJ2RlbGV0ZSc6IGZ1bmN0aW9uKGtleSl7XG4gICAgICAgIGlmKCFpc09iamVjdChrZXkpKXJldHVybiBmYWxzZTtcbiAgICAgICAgdmFyIGRhdGEgPSBnZXRXZWFrKGtleSk7XG4gICAgICAgIGlmKGRhdGEgPT09IHRydWUpcmV0dXJuIHVuY2F1Z2h0RnJvemVuU3RvcmUodGhpcylbJ2RlbGV0ZSddKGtleSk7XG4gICAgICAgIHJldHVybiBkYXRhICYmICRoYXMoZGF0YSwgdGhpcy5faSkgJiYgZGVsZXRlIGRhdGFbdGhpcy5faV07XG4gICAgICB9LFxuICAgICAgLy8gMjMuMy4zLjQgV2Vha01hcC5wcm90b3R5cGUuaGFzKGtleSlcbiAgICAgIC8vIDIzLjQuMy40IFdlYWtTZXQucHJvdG90eXBlLmhhcyh2YWx1ZSlcbiAgICAgIGhhczogZnVuY3Rpb24gaGFzKGtleSl7XG4gICAgICAgIGlmKCFpc09iamVjdChrZXkpKXJldHVybiBmYWxzZTtcbiAgICAgICAgdmFyIGRhdGEgPSBnZXRXZWFrKGtleSk7XG4gICAgICAgIGlmKGRhdGEgPT09IHRydWUpcmV0dXJuIHVuY2F1Z2h0RnJvemVuU3RvcmUodGhpcykuaGFzKGtleSk7XG4gICAgICAgIHJldHVybiBkYXRhICYmICRoYXMoZGF0YSwgdGhpcy5faSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIEM7XG4gIH0sXG4gIGRlZjogZnVuY3Rpb24odGhhdCwga2V5LCB2YWx1ZSl7XG4gICAgdmFyIGRhdGEgPSBnZXRXZWFrKGFuT2JqZWN0KGtleSksIHRydWUpO1xuICAgIGlmKGRhdGEgPT09IHRydWUpdW5jYXVnaHRGcm96ZW5TdG9yZSh0aGF0KS5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgZWxzZSBkYXRhW3RoYXQuX2ldID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoYXQ7XG4gIH0sXG4gIHVmc3RvcmU6IHVuY2F1Z2h0RnJvemVuU3RvcmVcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGVhY2ggICAgICAgICA9IHJlcXVpcmUoJy4vX2FycmF5LW1ldGhvZHMnKSgwKVxuICAsIHJlZGVmaW5lICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBtZXRhICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhJylcbiAgLCBhc3NpZ24gICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJylcbiAgLCB3ZWFrICAgICAgICAgPSByZXF1aXJlKCcuL19jb2xsZWN0aW9uLXdlYWsnKVxuICAsIGlzT2JqZWN0ICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZ2V0V2VhayAgICAgID0gbWV0YS5nZXRXZWFrXG4gICwgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZVxuICAsIHVuY2F1Z2h0RnJvemVuU3RvcmUgPSB3ZWFrLnVmc3RvcmVcbiAgLCB0bXAgICAgICAgICAgPSB7fVxuICAsIEludGVybmFsTWFwO1xuXG52YXIgd3JhcHBlciA9IGZ1bmN0aW9uKGdldCl7XG4gIHJldHVybiBmdW5jdGlvbiBXZWFrTWFwKCl7XG4gICAgcmV0dXJuIGdldCh0aGlzLCBhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7XG4gIH07XG59O1xuXG52YXIgbWV0aG9kcyA9IHtcbiAgLy8gMjMuMy4zLjMgV2Vha01hcC5wcm90b3R5cGUuZ2V0KGtleSlcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoa2V5KXtcbiAgICBpZihpc09iamVjdChrZXkpKXtcbiAgICAgIHZhciBkYXRhID0gZ2V0V2VhayhrZXkpO1xuICAgICAgaWYoZGF0YSA9PT0gdHJ1ZSlyZXR1cm4gdW5jYXVnaHRGcm96ZW5TdG9yZSh0aGlzKS5nZXQoa2V5KTtcbiAgICAgIHJldHVybiBkYXRhID8gZGF0YVt0aGlzLl9pXSA6IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0sXG4gIC8vIDIzLjMuMy41IFdlYWtNYXAucHJvdG90eXBlLnNldChrZXksIHZhbHVlKVxuICBzZXQ6IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKXtcbiAgICByZXR1cm4gd2Vhay5kZWYodGhpcywga2V5LCB2YWx1ZSk7XG4gIH1cbn07XG5cbi8vIDIzLjMgV2Vha01hcCBPYmplY3RzXG52YXIgJFdlYWtNYXAgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24nKSgnV2Vha01hcCcsIHdyYXBwZXIsIG1ldGhvZHMsIHdlYWssIHRydWUsIHRydWUpO1xuXG4vLyBJRTExIFdlYWtNYXAgZnJvemVuIGtleXMgZml4XG5pZihuZXcgJFdlYWtNYXAoKS5zZXQoKE9iamVjdC5mcmVlemUgfHwgT2JqZWN0KSh0bXApLCA3KS5nZXQodG1wKSAhPSA3KXtcbiAgSW50ZXJuYWxNYXAgPSB3ZWFrLmdldENvbnN0cnVjdG9yKHdyYXBwZXIpO1xuICBhc3NpZ24oSW50ZXJuYWxNYXAucHJvdG90eXBlLCBtZXRob2RzKTtcbiAgbWV0YS5ORUVEID0gdHJ1ZTtcbiAgZWFjaChbJ2RlbGV0ZScsICdoYXMnLCAnZ2V0JywgJ3NldCddLCBmdW5jdGlvbihrZXkpe1xuICAgIHZhciBwcm90byAgPSAkV2Vha01hcC5wcm90b3R5cGVcbiAgICAgICwgbWV0aG9kID0gcHJvdG9ba2V5XTtcbiAgICByZWRlZmluZShwcm90bywga2V5LCBmdW5jdGlvbihhLCBiKXtcbiAgICAgIC8vIHN0b3JlIGZyb3plbiBvYmplY3RzIG9uIGludGVybmFsIHdlYWttYXAgc2hpbVxuICAgICAgaWYoaXNPYmplY3QoYSkgJiYgIWlzRXh0ZW5zaWJsZShhKSl7XG4gICAgICAgIGlmKCF0aGlzLl9mKXRoaXMuX2YgPSBuZXcgSW50ZXJuYWxNYXA7XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9mW2tleV0oYSwgYik7XG4gICAgICAgIHJldHVybiBrZXkgPT0gJ3NldCcgPyB0aGlzIDogcmVzdWx0O1xuICAgICAgLy8gc3RvcmUgYWxsIHRoZSByZXN0IG9uIG5hdGl2ZSB3ZWFrbWFwXG4gICAgICB9IHJldHVybiBtZXRob2QuY2FsbCh0aGlzLCBhLCBiKTtcbiAgICB9KTtcbiAgfSk7XG59IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHdlYWsgPSByZXF1aXJlKCcuL19jb2xsZWN0aW9uLXdlYWsnKTtcblxuLy8gMjMuNCBXZWFrU2V0IE9iamVjdHNcbnJlcXVpcmUoJy4vX2NvbGxlY3Rpb24nKSgnV2Vha1NldCcsIGZ1bmN0aW9uKGdldCl7XG4gIHJldHVybiBmdW5jdGlvbiBXZWFrU2V0KCl7IHJldHVybiBnZXQodGhpcywgYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpOyB9O1xufSwge1xuICAvLyAyMy40LjMuMSBXZWFrU2V0LnByb3RvdHlwZS5hZGQodmFsdWUpXG4gIGFkZDogZnVuY3Rpb24gYWRkKHZhbHVlKXtcbiAgICByZXR1cm4gd2Vhay5kZWYodGhpcywgdmFsdWUsIHRydWUpO1xuICB9XG59LCB3ZWFrLCBmYWxzZSwgdHJ1ZSk7IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGlkZSAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgdWlkICAgID0gcmVxdWlyZSgnLi9fdWlkJylcbiAgLCBUWVBFRCAgPSB1aWQoJ3R5cGVkX2FycmF5JylcbiAgLCBWSUVXICAgPSB1aWQoJ3ZpZXcnKVxuICAsIEFCViAgICA9ICEhKGdsb2JhbC5BcnJheUJ1ZmZlciAmJiBnbG9iYWwuRGF0YVZpZXcpXG4gICwgQ09OU1RSID0gQUJWXG4gICwgaSA9IDAsIGwgPSA5LCBUeXBlZDtcblxudmFyIFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnMgPSAoXG4gICdJbnQ4QXJyYXksVWludDhBcnJheSxVaW50OENsYW1wZWRBcnJheSxJbnQxNkFycmF5LFVpbnQxNkFycmF5LEludDMyQXJyYXksVWludDMyQXJyYXksRmxvYXQzMkFycmF5LEZsb2F0NjRBcnJheSdcbikuc3BsaXQoJywnKTtcblxud2hpbGUoaSA8IGwpe1xuICBpZihUeXBlZCA9IGdsb2JhbFtUeXBlZEFycmF5Q29uc3RydWN0b3JzW2krK11dKXtcbiAgICBoaWRlKFR5cGVkLnByb3RvdHlwZSwgVFlQRUQsIHRydWUpO1xuICAgIGhpZGUoVHlwZWQucHJvdG90eXBlLCBWSUVXLCB0cnVlKTtcbiAgfSBlbHNlIENPTlNUUiA9IGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQUJWOiAgICBBQlYsXG4gIENPTlNUUjogQ09OU1RSLFxuICBUWVBFRDogIFRZUEVELFxuICBWSUVXOiAgIFZJRVdcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBERVNDUklQVE9SUyAgICA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJylcbiAgLCBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsICR0eXBlZCAgICAgICAgID0gcmVxdWlyZSgnLi9fdHlwZWQnKVxuICAsIGhpZGUgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgcmVkZWZpbmVBbGwgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKVxuICAsIGZhaWxzICAgICAgICAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAsIGFuSW5zdGFuY2UgICAgID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKVxuICAsIHRvSW50ZWdlciAgICAgID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgdG9MZW5ndGggICAgICAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGdPUE4gICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mXG4gICwgZFAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgYXJyYXlGaWxsICAgICAgPSByZXF1aXJlKCcuL19hcnJheS1maWxsJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBBUlJBWV9CVUZGRVIgICA9ICdBcnJheUJ1ZmZlcidcbiAgLCBEQVRBX1ZJRVcgICAgICA9ICdEYXRhVmlldydcbiAgLCBQUk9UT1RZUEUgICAgICA9ICdwcm90b3R5cGUnXG4gICwgV1JPTkdfTEVOR1RIICAgPSAnV3JvbmcgbGVuZ3RoISdcbiAgLCBXUk9OR19JTkRFWCAgICA9ICdXcm9uZyBpbmRleCEnXG4gICwgJEFycmF5QnVmZmVyICAgPSBnbG9iYWxbQVJSQVlfQlVGRkVSXVxuICAsICREYXRhVmlldyAgICAgID0gZ2xvYmFsW0RBVEFfVklFV11cbiAgLCBNYXRoICAgICAgICAgICA9IGdsb2JhbC5NYXRoXG4gICwgUmFuZ2VFcnJvciAgICAgPSBnbG9iYWwuUmFuZ2VFcnJvclxuICAsIEluZmluaXR5ICAgICAgID0gZ2xvYmFsLkluZmluaXR5XG4gICwgQmFzZUJ1ZmZlciAgICAgPSAkQXJyYXlCdWZmZXJcbiAgLCBhYnMgICAgICAgICAgICA9IE1hdGguYWJzXG4gICwgcG93ICAgICAgICAgICAgPSBNYXRoLnBvd1xuICAsIGZsb29yICAgICAgICAgID0gTWF0aC5mbG9vclxuICAsIGxvZyAgICAgICAgICAgID0gTWF0aC5sb2dcbiAgLCBMTjIgICAgICAgICAgICA9IE1hdGguTE4yXG4gICwgQlVGRkVSICAgICAgICAgPSAnYnVmZmVyJ1xuICAsIEJZVEVfTEVOR1RIICAgID0gJ2J5dGVMZW5ndGgnXG4gICwgQllURV9PRkZTRVQgICAgPSAnYnl0ZU9mZnNldCdcbiAgLCAkQlVGRkVSICAgICAgICA9IERFU0NSSVBUT1JTID8gJ19iJyA6IEJVRkZFUlxuICAsICRMRU5HVEggICAgICAgID0gREVTQ1JJUFRPUlMgPyAnX2wnIDogQllURV9MRU5HVEhcbiAgLCAkT0ZGU0VUICAgICAgICA9IERFU0NSSVBUT1JTID8gJ19vJyA6IEJZVEVfT0ZGU0VUO1xuXG4vLyBJRUVFNzU0IGNvbnZlcnNpb25zIGJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvaWVlZTc1NFxudmFyIHBhY2tJRUVFNzU0ID0gZnVuY3Rpb24odmFsdWUsIG1MZW4sIG5CeXRlcyl7XG4gIHZhciBidWZmZXIgPSBBcnJheShuQnl0ZXMpXG4gICAgLCBlTGVuICAgPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDFcbiAgICAsIGVNYXggICA9ICgxIDw8IGVMZW4pIC0gMVxuICAgICwgZUJpYXMgID0gZU1heCA+PiAxXG4gICAgLCBydCAgICAgPSBtTGVuID09PSAyMyA/IHBvdygyLCAtMjQpIC0gcG93KDIsIC03NykgOiAwXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBzICAgICAgPSB2YWx1ZSA8IDAgfHwgdmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCA/IDEgOiAwXG4gICAgLCBlLCBtLCBjO1xuICB2YWx1ZSA9IGFicyh2YWx1ZSlcbiAgaWYodmFsdWUgIT0gdmFsdWUgfHwgdmFsdWUgPT09IEluZmluaXR5KXtcbiAgICBtID0gdmFsdWUgIT0gdmFsdWUgPyAxIDogMDtcbiAgICBlID0gZU1heDtcbiAgfSBlbHNlIHtcbiAgICBlID0gZmxvb3IobG9nKHZhbHVlKSAvIExOMik7XG4gICAgaWYodmFsdWUgKiAoYyA9IHBvdygyLCAtZSkpIDwgMSl7XG4gICAgICBlLS07XG4gICAgICBjICo9IDI7XG4gICAgfVxuICAgIGlmKGUgKyBlQmlhcyA+PSAxKXtcbiAgICAgIHZhbHVlICs9IHJ0IC8gYztcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBwb3coMiwgMSAtIGVCaWFzKTtcbiAgICB9XG4gICAgaWYodmFsdWUgKiBjID49IDIpe1xuICAgICAgZSsrO1xuICAgICAgYyAvPSAyO1xuICAgIH1cbiAgICBpZihlICsgZUJpYXMgPj0gZU1heCl7XG4gICAgICBtID0gMDtcbiAgICAgIGUgPSBlTWF4O1xuICAgIH0gZWxzZSBpZihlICsgZUJpYXMgPj0gMSl7XG4gICAgICBtID0gKHZhbHVlICogYyAtIDEpICogcG93KDIsIG1MZW4pO1xuICAgICAgZSA9IGUgKyBlQmlhcztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogcG93KDIsIGVCaWFzIC0gMSkgKiBwb3coMiwgbUxlbik7XG4gICAgICBlID0gMDtcbiAgICB9XG4gIH1cbiAgZm9yKDsgbUxlbiA+PSA4OyBidWZmZXJbaSsrXSA9IG0gJiAyNTUsIG0gLz0gMjU2LCBtTGVuIC09IDgpO1xuICBlID0gZSA8PCBtTGVuIHwgbTtcbiAgZUxlbiArPSBtTGVuO1xuICBmb3IoOyBlTGVuID4gMDsgYnVmZmVyW2krK10gPSBlICYgMjU1LCBlIC89IDI1NiwgZUxlbiAtPSA4KTtcbiAgYnVmZmVyWy0taV0gfD0gcyAqIDEyODtcbiAgcmV0dXJuIGJ1ZmZlcjtcbn07XG52YXIgdW5wYWNrSUVFRTc1NCA9IGZ1bmN0aW9uKGJ1ZmZlciwgbUxlbiwgbkJ5dGVzKXtcbiAgdmFyIGVMZW4gID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxXG4gICAgLCBlTWF4ICA9ICgxIDw8IGVMZW4pIC0gMVxuICAgICwgZUJpYXMgPSBlTWF4ID4+IDFcbiAgICAsIG5CaXRzID0gZUxlbiAtIDdcbiAgICAsIGkgICAgID0gbkJ5dGVzIC0gMVxuICAgICwgcyAgICAgPSBidWZmZXJbaS0tXVxuICAgICwgZSAgICAgPSBzICYgMTI3XG4gICAgLCBtO1xuICBzID4+PSA3O1xuICBmb3IoOyBuQml0cyA+IDA7IGUgPSBlICogMjU2ICsgYnVmZmVyW2ldLCBpLS0sIG5CaXRzIC09IDgpO1xuICBtID0gZSAmICgxIDw8IC1uQml0cykgLSAxO1xuICBlID4+PSAtbkJpdHM7XG4gIG5CaXRzICs9IG1MZW47XG4gIGZvcig7IG5CaXRzID4gMDsgbSA9IG0gKiAyNTYgKyBidWZmZXJbaV0sIGktLSwgbkJpdHMgLT0gOCk7XG4gIGlmKGUgPT09IDApe1xuICAgIGUgPSAxIC0gZUJpYXM7XG4gIH0gZWxzZSBpZihlID09PSBlTWF4KXtcbiAgICByZXR1cm4gbSA/IE5hTiA6IHMgPyAtSW5maW5pdHkgOiBJbmZpbml0eTtcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIHBvdygyLCBtTGVuKTtcbiAgICBlID0gZSAtIGVCaWFzO1xuICB9IHJldHVybiAocyA/IC0xIDogMSkgKiBtICogcG93KDIsIGUgLSBtTGVuKTtcbn07XG5cbnZhciB1bnBhY2tJMzIgPSBmdW5jdGlvbihieXRlcyl7XG4gIHJldHVybiBieXRlc1szXSA8PCAyNCB8IGJ5dGVzWzJdIDw8IDE2IHwgYnl0ZXNbMV0gPDwgOCB8IGJ5dGVzWzBdO1xufTtcbnZhciBwYWNrSTggPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBbaXQgJiAweGZmXTtcbn07XG52YXIgcGFja0kxNiA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIFtpdCAmIDB4ZmYsIGl0ID4+IDggJiAweGZmXTtcbn07XG52YXIgcGFja0kzMiA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIFtpdCAmIDB4ZmYsIGl0ID4+IDggJiAweGZmLCBpdCA+PiAxNiAmIDB4ZmYsIGl0ID4+IDI0ICYgMHhmZl07XG59O1xudmFyIHBhY2tGNjQgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBwYWNrSUVFRTc1NChpdCwgNTIsIDgpO1xufTtcbnZhciBwYWNrRjMyID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gcGFja0lFRUU3NTQoaXQsIDIzLCA0KTtcbn07XG5cbnZhciBhZGRHZXR0ZXIgPSBmdW5jdGlvbihDLCBrZXksIGludGVybmFsKXtcbiAgZFAoQ1tQUk9UT1RZUEVdLCBrZXksIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzW2ludGVybmFsXTsgfX0pO1xufTtcblxudmFyIGdldCA9IGZ1bmN0aW9uKHZpZXcsIGJ5dGVzLCBpbmRleCwgaXNMaXR0bGVFbmRpYW4pe1xuICB2YXIgbnVtSW5kZXggPSAraW5kZXhcbiAgICAsIGludEluZGV4ID0gdG9JbnRlZ2VyKG51bUluZGV4KTtcbiAgaWYobnVtSW5kZXggIT0gaW50SW5kZXggfHwgaW50SW5kZXggPCAwIHx8IGludEluZGV4ICsgYnl0ZXMgPiB2aWV3WyRMRU5HVEhdKXRocm93IFJhbmdlRXJyb3IoV1JPTkdfSU5ERVgpO1xuICB2YXIgc3RvcmUgPSB2aWV3WyRCVUZGRVJdLl9iXG4gICAgLCBzdGFydCA9IGludEluZGV4ICsgdmlld1skT0ZGU0VUXVxuICAgICwgcGFjayAgPSBzdG9yZS5zbGljZShzdGFydCwgc3RhcnQgKyBieXRlcyk7XG4gIHJldHVybiBpc0xpdHRsZUVuZGlhbiA/IHBhY2sgOiBwYWNrLnJldmVyc2UoKTtcbn07XG52YXIgc2V0ID0gZnVuY3Rpb24odmlldywgYnl0ZXMsIGluZGV4LCBjb252ZXJzaW9uLCB2YWx1ZSwgaXNMaXR0bGVFbmRpYW4pe1xuICB2YXIgbnVtSW5kZXggPSAraW5kZXhcbiAgICAsIGludEluZGV4ID0gdG9JbnRlZ2VyKG51bUluZGV4KTtcbiAgaWYobnVtSW5kZXggIT0gaW50SW5kZXggfHwgaW50SW5kZXggPCAwIHx8IGludEluZGV4ICsgYnl0ZXMgPiB2aWV3WyRMRU5HVEhdKXRocm93IFJhbmdlRXJyb3IoV1JPTkdfSU5ERVgpO1xuICB2YXIgc3RvcmUgPSB2aWV3WyRCVUZGRVJdLl9iXG4gICAgLCBzdGFydCA9IGludEluZGV4ICsgdmlld1skT0ZGU0VUXVxuICAgICwgcGFjayAgPSBjb252ZXJzaW9uKCt2YWx1ZSk7XG4gIGZvcih2YXIgaSA9IDA7IGkgPCBieXRlczsgaSsrKXN0b3JlW3N0YXJ0ICsgaV0gPSBwYWNrW2lzTGl0dGxlRW5kaWFuID8gaSA6IGJ5dGVzIC0gaSAtIDFdO1xufTtcblxudmFyIHZhbGlkYXRlQXJyYXlCdWZmZXJBcmd1bWVudHMgPSBmdW5jdGlvbih0aGF0LCBsZW5ndGgpe1xuICBhbkluc3RhbmNlKHRoYXQsICRBcnJheUJ1ZmZlciwgQVJSQVlfQlVGRkVSKTtcbiAgdmFyIG51bWJlckxlbmd0aCA9ICtsZW5ndGhcbiAgICAsIGJ5dGVMZW5ndGggICA9IHRvTGVuZ3RoKG51bWJlckxlbmd0aCk7XG4gIGlmKG51bWJlckxlbmd0aCAhPSBieXRlTGVuZ3RoKXRocm93IFJhbmdlRXJyb3IoV1JPTkdfTEVOR1RIKTtcbiAgcmV0dXJuIGJ5dGVMZW5ndGg7XG59O1xuXG5pZighJHR5cGVkLkFCVil7XG4gICRBcnJheUJ1ZmZlciA9IGZ1bmN0aW9uIEFycmF5QnVmZmVyKGxlbmd0aCl7XG4gICAgdmFyIGJ5dGVMZW5ndGggPSB2YWxpZGF0ZUFycmF5QnVmZmVyQXJndW1lbnRzKHRoaXMsIGxlbmd0aCk7XG4gICAgdGhpcy5fYiAgICAgICA9IGFycmF5RmlsbC5jYWxsKEFycmF5KGJ5dGVMZW5ndGgpLCAwKTtcbiAgICB0aGlzWyRMRU5HVEhdID0gYnl0ZUxlbmd0aDtcbiAgfTtcblxuICAkRGF0YVZpZXcgPSBmdW5jdGlvbiBEYXRhVmlldyhidWZmZXIsIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpe1xuICAgIGFuSW5zdGFuY2UodGhpcywgJERhdGFWaWV3LCBEQVRBX1ZJRVcpO1xuICAgIGFuSW5zdGFuY2UoYnVmZmVyLCAkQXJyYXlCdWZmZXIsIERBVEFfVklFVyk7XG4gICAgdmFyIGJ1ZmZlckxlbmd0aCA9IGJ1ZmZlclskTEVOR1RIXVxuICAgICAgLCBvZmZzZXQgICAgICAgPSB0b0ludGVnZXIoYnl0ZU9mZnNldCk7XG4gICAgaWYob2Zmc2V0IDwgMCB8fCBvZmZzZXQgPiBidWZmZXJMZW5ndGgpdGhyb3cgUmFuZ2VFcnJvcignV3Jvbmcgb2Zmc2V0IScpO1xuICAgIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID09PSB1bmRlZmluZWQgPyBidWZmZXJMZW5ndGggLSBvZmZzZXQgOiB0b0xlbmd0aChieXRlTGVuZ3RoKTtcbiAgICBpZihvZmZzZXQgKyBieXRlTGVuZ3RoID4gYnVmZmVyTGVuZ3RoKXRocm93IFJhbmdlRXJyb3IoV1JPTkdfTEVOR1RIKTtcbiAgICB0aGlzWyRCVUZGRVJdID0gYnVmZmVyO1xuICAgIHRoaXNbJE9GRlNFVF0gPSBvZmZzZXQ7XG4gICAgdGhpc1skTEVOR1RIXSA9IGJ5dGVMZW5ndGg7XG4gIH07XG5cbiAgaWYoREVTQ1JJUFRPUlMpe1xuICAgIGFkZEdldHRlcigkQXJyYXlCdWZmZXIsIEJZVEVfTEVOR1RILCAnX2wnKTtcbiAgICBhZGRHZXR0ZXIoJERhdGFWaWV3LCBCVUZGRVIsICdfYicpO1xuICAgIGFkZEdldHRlcigkRGF0YVZpZXcsIEJZVEVfTEVOR1RILCAnX2wnKTtcbiAgICBhZGRHZXR0ZXIoJERhdGFWaWV3LCBCWVRFX09GRlNFVCwgJ19vJyk7XG4gIH1cblxuICByZWRlZmluZUFsbCgkRGF0YVZpZXdbUFJPVE9UWVBFXSwge1xuICAgIGdldEludDg6IGZ1bmN0aW9uIGdldEludDgoYnl0ZU9mZnNldCl7XG4gICAgICByZXR1cm4gZ2V0KHRoaXMsIDEsIGJ5dGVPZmZzZXQpWzBdIDw8IDI0ID4+IDI0O1xuICAgIH0sXG4gICAgZ2V0VWludDg6IGZ1bmN0aW9uIGdldFVpbnQ4KGJ5dGVPZmZzZXQpe1xuICAgICAgcmV0dXJuIGdldCh0aGlzLCAxLCBieXRlT2Zmc2V0KVswXTtcbiAgICB9LFxuICAgIGdldEludDE2OiBmdW5jdGlvbiBnZXRJbnQxNihieXRlT2Zmc2V0IC8qLCBsaXR0bGVFbmRpYW4gKi8pe1xuICAgICAgdmFyIGJ5dGVzID0gZ2V0KHRoaXMsIDIsIGJ5dGVPZmZzZXQsIGFyZ3VtZW50c1sxXSk7XG4gICAgICByZXR1cm4gKGJ5dGVzWzFdIDw8IDggfCBieXRlc1swXSkgPDwgMTYgPj4gMTY7XG4gICAgfSxcbiAgICBnZXRVaW50MTY6IGZ1bmN0aW9uIGdldFVpbnQxNihieXRlT2Zmc2V0IC8qLCBsaXR0bGVFbmRpYW4gKi8pe1xuICAgICAgdmFyIGJ5dGVzID0gZ2V0KHRoaXMsIDIsIGJ5dGVPZmZzZXQsIGFyZ3VtZW50c1sxXSk7XG4gICAgICByZXR1cm4gYnl0ZXNbMV0gPDwgOCB8IGJ5dGVzWzBdO1xuICAgIH0sXG4gICAgZ2V0SW50MzI6IGZ1bmN0aW9uIGdldEludDMyKGJ5dGVPZmZzZXQgLyosIGxpdHRsZUVuZGlhbiAqLyl7XG4gICAgICByZXR1cm4gdW5wYWNrSTMyKGdldCh0aGlzLCA0LCBieXRlT2Zmc2V0LCBhcmd1bWVudHNbMV0pKTtcbiAgICB9LFxuICAgIGdldFVpbnQzMjogZnVuY3Rpb24gZ2V0VWludDMyKGJ5dGVPZmZzZXQgLyosIGxpdHRsZUVuZGlhbiAqLyl7XG4gICAgICByZXR1cm4gdW5wYWNrSTMyKGdldCh0aGlzLCA0LCBieXRlT2Zmc2V0LCBhcmd1bWVudHNbMV0pKSA+Pj4gMDtcbiAgICB9LFxuICAgIGdldEZsb2F0MzI6IGZ1bmN0aW9uIGdldEZsb2F0MzIoYnl0ZU9mZnNldCAvKiwgbGl0dGxlRW5kaWFuICovKXtcbiAgICAgIHJldHVybiB1bnBhY2tJRUVFNzU0KGdldCh0aGlzLCA0LCBieXRlT2Zmc2V0LCBhcmd1bWVudHNbMV0pLCAyMywgNCk7XG4gICAgfSxcbiAgICBnZXRGbG9hdDY0OiBmdW5jdGlvbiBnZXRGbG9hdDY0KGJ5dGVPZmZzZXQgLyosIGxpdHRsZUVuZGlhbiAqLyl7XG4gICAgICByZXR1cm4gdW5wYWNrSUVFRTc1NChnZXQodGhpcywgOCwgYnl0ZU9mZnNldCwgYXJndW1lbnRzWzFdKSwgNTIsIDgpO1xuICAgIH0sXG4gICAgc2V0SW50ODogZnVuY3Rpb24gc2V0SW50OChieXRlT2Zmc2V0LCB2YWx1ZSl7XG4gICAgICBzZXQodGhpcywgMSwgYnl0ZU9mZnNldCwgcGFja0k4LCB2YWx1ZSk7XG4gICAgfSxcbiAgICBzZXRVaW50ODogZnVuY3Rpb24gc2V0VWludDgoYnl0ZU9mZnNldCwgdmFsdWUpe1xuICAgICAgc2V0KHRoaXMsIDEsIGJ5dGVPZmZzZXQsIHBhY2tJOCwgdmFsdWUpO1xuICAgIH0sXG4gICAgc2V0SW50MTY6IGZ1bmN0aW9uIHNldEludDE2KGJ5dGVPZmZzZXQsIHZhbHVlIC8qLCBsaXR0bGVFbmRpYW4gKi8pe1xuICAgICAgc2V0KHRoaXMsIDIsIGJ5dGVPZmZzZXQsIHBhY2tJMTYsIHZhbHVlLCBhcmd1bWVudHNbMl0pO1xuICAgIH0sXG4gICAgc2V0VWludDE2OiBmdW5jdGlvbiBzZXRVaW50MTYoYnl0ZU9mZnNldCwgdmFsdWUgLyosIGxpdHRsZUVuZGlhbiAqLyl7XG4gICAgICBzZXQodGhpcywgMiwgYnl0ZU9mZnNldCwgcGFja0kxNiwgdmFsdWUsIGFyZ3VtZW50c1syXSk7XG4gICAgfSxcbiAgICBzZXRJbnQzMjogZnVuY3Rpb24gc2V0SW50MzIoYnl0ZU9mZnNldCwgdmFsdWUgLyosIGxpdHRsZUVuZGlhbiAqLyl7XG4gICAgICBzZXQodGhpcywgNCwgYnl0ZU9mZnNldCwgcGFja0kzMiwgdmFsdWUsIGFyZ3VtZW50c1syXSk7XG4gICAgfSxcbiAgICBzZXRVaW50MzI6IGZ1bmN0aW9uIHNldFVpbnQzMihieXRlT2Zmc2V0LCB2YWx1ZSAvKiwgbGl0dGxlRW5kaWFuICovKXtcbiAgICAgIHNldCh0aGlzLCA0LCBieXRlT2Zmc2V0LCBwYWNrSTMyLCB2YWx1ZSwgYXJndW1lbnRzWzJdKTtcbiAgICB9LFxuICAgIHNldEZsb2F0MzI6IGZ1bmN0aW9uIHNldEZsb2F0MzIoYnl0ZU9mZnNldCwgdmFsdWUgLyosIGxpdHRsZUVuZGlhbiAqLyl7XG4gICAgICBzZXQodGhpcywgNCwgYnl0ZU9mZnNldCwgcGFja0YzMiwgdmFsdWUsIGFyZ3VtZW50c1syXSk7XG4gICAgfSxcbiAgICBzZXRGbG9hdDY0OiBmdW5jdGlvbiBzZXRGbG9hdDY0KGJ5dGVPZmZzZXQsIHZhbHVlIC8qLCBsaXR0bGVFbmRpYW4gKi8pe1xuICAgICAgc2V0KHRoaXMsIDgsIGJ5dGVPZmZzZXQsIHBhY2tGNjQsIHZhbHVlLCBhcmd1bWVudHNbMl0pO1xuICAgIH1cbiAgfSk7XG59IGVsc2Uge1xuICBpZighZmFpbHMoZnVuY3Rpb24oKXtcbiAgICBuZXcgJEFycmF5QnVmZmVyOyAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgfSkgfHwgIWZhaWxzKGZ1bmN0aW9uKCl7XG4gICAgbmV3ICRBcnJheUJ1ZmZlciguNSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gIH0pKXtcbiAgICAkQXJyYXlCdWZmZXIgPSBmdW5jdGlvbiBBcnJheUJ1ZmZlcihsZW5ndGgpe1xuICAgICAgcmV0dXJuIG5ldyBCYXNlQnVmZmVyKHZhbGlkYXRlQXJyYXlCdWZmZXJBcmd1bWVudHModGhpcywgbGVuZ3RoKSk7XG4gICAgfTtcbiAgICB2YXIgQXJyYXlCdWZmZXJQcm90byA9ICRBcnJheUJ1ZmZlcltQUk9UT1RZUEVdID0gQmFzZUJ1ZmZlcltQUk9UT1RZUEVdO1xuICAgIGZvcih2YXIga2V5cyA9IGdPUE4oQmFzZUJ1ZmZlciksIGogPSAwLCBrZXk7IGtleXMubGVuZ3RoID4gajsgKXtcbiAgICAgIGlmKCEoKGtleSA9IGtleXNbaisrXSkgaW4gJEFycmF5QnVmZmVyKSloaWRlKCRBcnJheUJ1ZmZlciwga2V5LCBCYXNlQnVmZmVyW2tleV0pO1xuICAgIH07XG4gICAgaWYoIUxJQlJBUlkpQXJyYXlCdWZmZXJQcm90by5jb25zdHJ1Y3RvciA9ICRBcnJheUJ1ZmZlcjtcbiAgfVxuICAvLyBpT1MgU2FmYXJpIDcueCBidWdcbiAgdmFyIHZpZXcgPSBuZXcgJERhdGFWaWV3KG5ldyAkQXJyYXlCdWZmZXIoMikpXG4gICAgLCAkc2V0SW50OCA9ICREYXRhVmlld1tQUk9UT1RZUEVdLnNldEludDg7XG4gIHZpZXcuc2V0SW50OCgwLCAyMTQ3NDgzNjQ4KTtcbiAgdmlldy5zZXRJbnQ4KDEsIDIxNDc0ODM2NDkpO1xuICBpZih2aWV3LmdldEludDgoMCkgfHwgIXZpZXcuZ2V0SW50OCgxKSlyZWRlZmluZUFsbCgkRGF0YVZpZXdbUFJPVE9UWVBFXSwge1xuICAgIHNldEludDg6IGZ1bmN0aW9uIHNldEludDgoYnl0ZU9mZnNldCwgdmFsdWUpe1xuICAgICAgJHNldEludDguY2FsbCh0aGlzLCBieXRlT2Zmc2V0LCB2YWx1ZSA8PCAyNCA+PiAyNCk7XG4gICAgfSxcbiAgICBzZXRVaW50ODogZnVuY3Rpb24gc2V0VWludDgoYnl0ZU9mZnNldCwgdmFsdWUpe1xuICAgICAgJHNldEludDguY2FsbCh0aGlzLCBieXRlT2Zmc2V0LCB2YWx1ZSA8PCAyNCA+PiAyNCk7XG4gICAgfVxuICB9LCB0cnVlKTtcbn1cbnNldFRvU3RyaW5nVGFnKCRBcnJheUJ1ZmZlciwgQVJSQVlfQlVGRkVSKTtcbnNldFRvU3RyaW5nVGFnKCREYXRhVmlldywgREFUQV9WSUVXKTtcbmhpZGUoJERhdGFWaWV3W1BST1RPVFlQRV0sICR0eXBlZC5WSUVXLCB0cnVlKTtcbmV4cG9ydHNbQVJSQVlfQlVGRkVSXSA9ICRBcnJheUJ1ZmZlcjtcbmV4cG9ydHNbREFUQV9WSUVXXSA9ICREYXRhVmlldzsiLCIndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkdHlwZWQgICAgICAgPSByZXF1aXJlKCcuL190eXBlZCcpXG4gICwgYnVmZmVyICAgICAgID0gcmVxdWlyZSgnLi9fdHlwZWQtYnVmZmVyJylcbiAgLCBhbk9iamVjdCAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvSW5kZXggICAgICA9IHJlcXVpcmUoJy4vX3RvLWluZGV4JylcbiAgLCB0b0xlbmd0aCAgICAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGlzT2JqZWN0ICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgQXJyYXlCdWZmZXIgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuQXJyYXlCdWZmZXJcbiAgLCBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJylcbiAgLCAkQXJyYXlCdWZmZXIgPSBidWZmZXIuQXJyYXlCdWZmZXJcbiAgLCAkRGF0YVZpZXcgICAgPSBidWZmZXIuRGF0YVZpZXdcbiAgLCAkaXNWaWV3ICAgICAgPSAkdHlwZWQuQUJWICYmIEFycmF5QnVmZmVyLmlzVmlld1xuICAsICRzbGljZSAgICAgICA9ICRBcnJheUJ1ZmZlci5wcm90b3R5cGUuc2xpY2VcbiAgLCBWSUVXICAgICAgICAgPSAkdHlwZWQuVklFV1xuICAsIEFSUkFZX0JVRkZFUiA9ICdBcnJheUJ1ZmZlcic7XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogKEFycmF5QnVmZmVyICE9PSAkQXJyYXlCdWZmZXIpLCB7QXJyYXlCdWZmZXI6ICRBcnJheUJ1ZmZlcn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEkdHlwZWQuQ09OU1RSLCBBUlJBWV9CVUZGRVIsIHtcbiAgLy8gMjQuMS4zLjEgQXJyYXlCdWZmZXIuaXNWaWV3KGFyZylcbiAgaXNWaWV3OiBmdW5jdGlvbiBpc1ZpZXcoaXQpe1xuICAgIHJldHVybiAkaXNWaWV3ICYmICRpc1ZpZXcoaXQpIHx8IGlzT2JqZWN0KGl0KSAmJiBWSUVXIGluIGl0O1xuICB9XG59KTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LlUgKyAkZXhwb3J0LkYgKiByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiAhbmV3ICRBcnJheUJ1ZmZlcigyKS5zbGljZSgxLCB1bmRlZmluZWQpLmJ5dGVMZW5ndGg7XG59KSwgQVJSQVlfQlVGRkVSLCB7XG4gIC8vIDI0LjEuNC4zIEFycmF5QnVmZmVyLnByb3RvdHlwZS5zbGljZShzdGFydCwgZW5kKVxuICBzbGljZTogZnVuY3Rpb24gc2xpY2Uoc3RhcnQsIGVuZCl7XG4gICAgaWYoJHNsaWNlICE9PSB1bmRlZmluZWQgJiYgZW5kID09PSB1bmRlZmluZWQpcmV0dXJuICRzbGljZS5jYWxsKGFuT2JqZWN0KHRoaXMpLCBzdGFydCk7IC8vIEZGIGZpeFxuICAgIHZhciBsZW4gICAgPSBhbk9iamVjdCh0aGlzKS5ieXRlTGVuZ3RoXG4gICAgICAsIGZpcnN0ICA9IHRvSW5kZXgoc3RhcnQsIGxlbilcbiAgICAgICwgZmluYWwgID0gdG9JbmRleChlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IGVuZCwgbGVuKVxuICAgICAgLCByZXN1bHQgPSBuZXcgKHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCAkQXJyYXlCdWZmZXIpKSh0b0xlbmd0aChmaW5hbCAtIGZpcnN0KSlcbiAgICAgICwgdmlld1MgID0gbmV3ICREYXRhVmlldyh0aGlzKVxuICAgICAgLCB2aWV3VCAgPSBuZXcgJERhdGFWaWV3KHJlc3VsdClcbiAgICAgICwgaW5kZXggID0gMDtcbiAgICB3aGlsZShmaXJzdCA8IGZpbmFsKXtcbiAgICAgIHZpZXdULnNldFVpbnQ4KGluZGV4KyssIHZpZXdTLmdldFVpbnQ4KGZpcnN0KyspKTtcbiAgICB9IHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuXG5yZXF1aXJlKCcuL19zZXQtc3BlY2llcycpKEFSUkFZX0JVRkZFUik7IiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX3R5cGVkJykuQUJWLCB7XG4gIERhdGFWaWV3OiByZXF1aXJlKCcuL190eXBlZC1idWZmZXInKS5EYXRhVmlld1xufSk7IiwiJ3VzZSBzdHJpY3QnO1xuaWYocmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSl7XG4gIHZhciBMSUJSQVJZICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICAgLCBnbG9iYWwgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgICAsIGZhaWxzICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICAgLCAkZXhwb3J0ICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgICAsICR0eXBlZCAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL190eXBlZCcpXG4gICAgLCAkYnVmZmVyICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdHlwZWQtYnVmZmVyJylcbiAgICAsIGN0eCAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAgICwgYW5JbnN0YW5jZSAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJylcbiAgICAsIHByb3BlcnR5RGVzYyAgICAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgICAsIGhpZGUgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgICAsIHJlZGVmaW5lQWxsICAgICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKVxuICAgICwgdG9JbnRlZ2VyICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAgICwgdG9MZW5ndGggICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICAgLCB0b0luZGV4ICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKVxuICAgICwgdG9QcmltaXRpdmUgICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICAgLCBoYXMgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgICAsIHNhbWUgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19zYW1lLXZhbHVlJylcbiAgICAsIGNsYXNzb2YgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgICAsIGlzT2JqZWN0ICAgICAgICAgICAgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAgICwgdG9PYmplY3QgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICAgLCBpc0FycmF5SXRlciAgICAgICAgID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpXG4gICAgLCBjcmVhdGUgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICAgLCBnZXRQcm90b3R5cGVPZiAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICAgLCBnT1BOICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mXG4gICAgLCBnZXRJdGVyRm4gICAgICAgICAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKVxuICAgICwgdWlkICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpXG4gICAgLCB3a3MgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJylcbiAgICAsIGNyZWF0ZUFycmF5TWV0aG9kICAgPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJylcbiAgICAsIGNyZWF0ZUFycmF5SW5jbHVkZXMgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpXG4gICAgLCBzcGVjaWVzQ29uc3RydWN0b3IgID0gcmVxdWlyZSgnLi9fc3BlY2llcy1jb25zdHJ1Y3RvcicpXG4gICAgLCBBcnJheUl0ZXJhdG9ycyAgICAgID0gcmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKVxuICAgICwgSXRlcmF0b3JzICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICAgLCAkaXRlckRldGVjdCAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKVxuICAgICwgc2V0U3BlY2llcyAgICAgICAgICA9IHJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJylcbiAgICAsIGFycmF5RmlsbCAgICAgICAgICAgPSByZXF1aXJlKCcuL19hcnJheS1maWxsJylcbiAgICAsIGFycmF5Q29weVdpdGhpbiAgICAgPSByZXF1aXJlKCcuL19hcnJheS1jb3B5LXdpdGhpbicpXG4gICAgLCAkRFAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgICAsICRHT1BEICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpXG4gICAgLCBkUCAgICAgICAgICAgICAgICAgID0gJERQLmZcbiAgICAsIGdPUEQgICAgICAgICAgICAgICAgPSAkR09QRC5mXG4gICAgLCBSYW5nZUVycm9yICAgICAgICAgID0gZ2xvYmFsLlJhbmdlRXJyb3JcbiAgICAsIFR5cGVFcnJvciAgICAgICAgICAgPSBnbG9iYWwuVHlwZUVycm9yXG4gICAgLCBVaW50OEFycmF5ICAgICAgICAgID0gZ2xvYmFsLlVpbnQ4QXJyYXlcbiAgICAsIEFSUkFZX0JVRkZFUiAgICAgICAgPSAnQXJyYXlCdWZmZXInXG4gICAgLCBTSEFSRURfQlVGRkVSICAgICAgID0gJ1NoYXJlZCcgKyBBUlJBWV9CVUZGRVJcbiAgICAsIEJZVEVTX1BFUl9FTEVNRU5UICAgPSAnQllURVNfUEVSX0VMRU1FTlQnXG4gICAgLCBQUk9UT1RZUEUgICAgICAgICAgID0gJ3Byb3RvdHlwZSdcbiAgICAsIEFycmF5UHJvdG8gICAgICAgICAgPSBBcnJheVtQUk9UT1RZUEVdXG4gICAgLCAkQXJyYXlCdWZmZXIgICAgICAgID0gJGJ1ZmZlci5BcnJheUJ1ZmZlclxuICAgICwgJERhdGFWaWV3ICAgICAgICAgICA9ICRidWZmZXIuRGF0YVZpZXdcbiAgICAsIGFycmF5Rm9yRWFjaCAgICAgICAgPSBjcmVhdGVBcnJheU1ldGhvZCgwKVxuICAgICwgYXJyYXlGaWx0ZXIgICAgICAgICA9IGNyZWF0ZUFycmF5TWV0aG9kKDIpXG4gICAgLCBhcnJheVNvbWUgICAgICAgICAgID0gY3JlYXRlQXJyYXlNZXRob2QoMylcbiAgICAsIGFycmF5RXZlcnkgICAgICAgICAgPSBjcmVhdGVBcnJheU1ldGhvZCg0KVxuICAgICwgYXJyYXlGaW5kICAgICAgICAgICA9IGNyZWF0ZUFycmF5TWV0aG9kKDUpXG4gICAgLCBhcnJheUZpbmRJbmRleCAgICAgID0gY3JlYXRlQXJyYXlNZXRob2QoNilcbiAgICAsIGFycmF5SW5jbHVkZXMgICAgICAgPSBjcmVhdGVBcnJheUluY2x1ZGVzKHRydWUpXG4gICAgLCBhcnJheUluZGV4T2YgICAgICAgID0gY3JlYXRlQXJyYXlJbmNsdWRlcyhmYWxzZSlcbiAgICAsIGFycmF5VmFsdWVzICAgICAgICAgPSBBcnJheUl0ZXJhdG9ycy52YWx1ZXNcbiAgICAsIGFycmF5S2V5cyAgICAgICAgICAgPSBBcnJheUl0ZXJhdG9ycy5rZXlzXG4gICAgLCBhcnJheUVudHJpZXMgICAgICAgID0gQXJyYXlJdGVyYXRvcnMuZW50cmllc1xuICAgICwgYXJyYXlMYXN0SW5kZXhPZiAgICA9IEFycmF5UHJvdG8ubGFzdEluZGV4T2ZcbiAgICAsIGFycmF5UmVkdWNlICAgICAgICAgPSBBcnJheVByb3RvLnJlZHVjZVxuICAgICwgYXJyYXlSZWR1Y2VSaWdodCAgICA9IEFycmF5UHJvdG8ucmVkdWNlUmlnaHRcbiAgICAsIGFycmF5Sm9pbiAgICAgICAgICAgPSBBcnJheVByb3RvLmpvaW5cbiAgICAsIGFycmF5U29ydCAgICAgICAgICAgPSBBcnJheVByb3RvLnNvcnRcbiAgICAsIGFycmF5U2xpY2UgICAgICAgICAgPSBBcnJheVByb3RvLnNsaWNlXG4gICAgLCBhcnJheVRvU3RyaW5nICAgICAgID0gQXJyYXlQcm90by50b1N0cmluZ1xuICAgICwgYXJyYXlUb0xvY2FsZVN0cmluZyA9IEFycmF5UHJvdG8udG9Mb2NhbGVTdHJpbmdcbiAgICAsIElURVJBVE9SICAgICAgICAgICAgPSB3a3MoJ2l0ZXJhdG9yJylcbiAgICAsIFRBRyAgICAgICAgICAgICAgICAgPSB3a3MoJ3RvU3RyaW5nVGFnJylcbiAgICAsIFRZUEVEX0NPTlNUUlVDVE9SICAgPSB1aWQoJ3R5cGVkX2NvbnN0cnVjdG9yJylcbiAgICAsIERFRl9DT05TVFJVQ1RPUiAgICAgPSB1aWQoJ2RlZl9jb25zdHJ1Y3RvcicpXG4gICAgLCBBTExfQ09OU1RSVUNUT1JTICAgID0gJHR5cGVkLkNPTlNUUlxuICAgICwgVFlQRURfQVJSQVkgICAgICAgICA9ICR0eXBlZC5UWVBFRFxuICAgICwgVklFVyAgICAgICAgICAgICAgICA9ICR0eXBlZC5WSUVXXG4gICAgLCBXUk9OR19MRU5HVEggICAgICAgID0gJ1dyb25nIGxlbmd0aCEnO1xuXG4gIHZhciAkbWFwID0gY3JlYXRlQXJyYXlNZXRob2QoMSwgZnVuY3Rpb24oTywgbGVuZ3RoKXtcbiAgICByZXR1cm4gYWxsb2NhdGUoc3BlY2llc0NvbnN0cnVjdG9yKE8sIE9bREVGX0NPTlNUUlVDVE9SXSksIGxlbmd0aCk7XG4gIH0pO1xuXG4gIHZhciBMSVRUTEVfRU5ESUFOID0gZmFpbHMoZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkobmV3IFVpbnQxNkFycmF5KFsxXSkuYnVmZmVyKVswXSA9PT0gMTtcbiAgfSk7XG5cbiAgdmFyIEZPUkNFRF9TRVQgPSAhIVVpbnQ4QXJyYXkgJiYgISFVaW50OEFycmF5W1BST1RPVFlQRV0uc2V0ICYmIGZhaWxzKGZ1bmN0aW9uKCl7XG4gICAgbmV3IFVpbnQ4QXJyYXkoMSkuc2V0KHt9KTtcbiAgfSk7XG5cbiAgdmFyIHN0cmljdFRvTGVuZ3RoID0gZnVuY3Rpb24oaXQsIFNBTUUpe1xuICAgIGlmKGl0ID09PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFdST05HX0xFTkdUSCk7XG4gICAgdmFyIG51bWJlciA9ICtpdFxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChpdCk7XG4gICAgaWYoU0FNRSAmJiAhc2FtZShudW1iZXIsIGxlbmd0aCkpdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19MRU5HVEgpO1xuICAgIHJldHVybiBsZW5ndGg7XG4gIH07XG5cbiAgdmFyIHRvT2Zmc2V0ID0gZnVuY3Rpb24oaXQsIEJZVEVTKXtcbiAgICB2YXIgb2Zmc2V0ID0gdG9JbnRlZ2VyKGl0KTtcbiAgICBpZihvZmZzZXQgPCAwIHx8IG9mZnNldCAlIEJZVEVTKXRocm93IFJhbmdlRXJyb3IoJ1dyb25nIG9mZnNldCEnKTtcbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9O1xuXG4gIHZhciB2YWxpZGF0ZSA9IGZ1bmN0aW9uKGl0KXtcbiAgICBpZihpc09iamVjdChpdCkgJiYgVFlQRURfQVJSQVkgaW4gaXQpcmV0dXJuIGl0O1xuICAgIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgdHlwZWQgYXJyYXkhJyk7XG4gIH07XG5cbiAgdmFyIGFsbG9jYXRlID0gZnVuY3Rpb24oQywgbGVuZ3RoKXtcbiAgICBpZighKGlzT2JqZWN0KEMpICYmIFRZUEVEX0NPTlNUUlVDVE9SIGluIEMpKXtcbiAgICAgIHRocm93IFR5cGVFcnJvcignSXQgaXMgbm90IGEgdHlwZWQgYXJyYXkgY29uc3RydWN0b3IhJyk7XG4gICAgfSByZXR1cm4gbmV3IEMobGVuZ3RoKTtcbiAgfTtcblxuICB2YXIgc3BlY2llc0Zyb21MaXN0ID0gZnVuY3Rpb24oTywgbGlzdCl7XG4gICAgcmV0dXJuIGZyb21MaXN0KHNwZWNpZXNDb25zdHJ1Y3RvcihPLCBPW0RFRl9DT05TVFJVQ1RPUl0pLCBsaXN0KTtcbiAgfTtcblxuICB2YXIgZnJvbUxpc3QgPSBmdW5jdGlvbihDLCBsaXN0KXtcbiAgICB2YXIgaW5kZXggID0gMFxuICAgICAgLCBsZW5ndGggPSBsaXN0Lmxlbmd0aFxuICAgICAgLCByZXN1bHQgPSBhbGxvY2F0ZShDLCBsZW5ndGgpO1xuICAgIHdoaWxlKGxlbmd0aCA+IGluZGV4KXJlc3VsdFtpbmRleF0gPSBsaXN0W2luZGV4KytdO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgdmFyIGFkZEdldHRlciA9IGZ1bmN0aW9uKGl0LCBrZXksIGludGVybmFsKXtcbiAgICBkUChpdCwga2V5LCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5fZFtpbnRlcm5hbF07IH19KTtcbiAgfTtcblxuICB2YXIgJGZyb20gPSBmdW5jdGlvbiBmcm9tKHNvdXJjZSAvKiwgbWFwZm4sIHRoaXNBcmcgKi8pe1xuICAgIHZhciBPICAgICAgID0gdG9PYmplY3Qoc291cmNlKVxuICAgICAgLCBhTGVuICAgID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLCBtYXBmbiAgID0gYUxlbiA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWRcbiAgICAgICwgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWRcbiAgICAgICwgaXRlckZuICA9IGdldEl0ZXJGbihPKVxuICAgICAgLCBpLCBsZW5ndGgsIHZhbHVlcywgcmVzdWx0LCBzdGVwLCBpdGVyYXRvcjtcbiAgICBpZihpdGVyRm4gIT0gdW5kZWZpbmVkICYmICFpc0FycmF5SXRlcihpdGVyRm4pKXtcbiAgICAgIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCB2YWx1ZXMgPSBbXSwgaSA9IDA7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgaSsrKXtcbiAgICAgICAgdmFsdWVzLnB1c2goc3RlcC52YWx1ZSk7XG4gICAgICB9IE8gPSB2YWx1ZXM7XG4gICAgfVxuICAgIGlmKG1hcHBpbmcgJiYgYUxlbiA+IDIpbWFwZm4gPSBjdHgobWFwZm4sIGFyZ3VtZW50c1syXSwgMik7XG4gICAgZm9yKGkgPSAwLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCksIHJlc3VsdCA9IGFsbG9jYXRlKHRoaXMsIGxlbmd0aCk7IGxlbmd0aCA+IGk7IGkrKyl7XG4gICAgICByZXN1bHRbaV0gPSBtYXBwaW5nID8gbWFwZm4oT1tpXSwgaSkgOiBPW2ldO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHZhciAkb2YgPSBmdW5jdGlvbiBvZigvKi4uLml0ZW1zKi8pe1xuICAgIHZhciBpbmRleCAgPSAwXG4gICAgICAsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgICwgcmVzdWx0ID0gYWxsb2NhdGUodGhpcywgbGVuZ3RoKTtcbiAgICB3aGlsZShsZW5ndGggPiBpbmRleClyZXN1bHRbaW5kZXhdID0gYXJndW1lbnRzW2luZGV4KytdO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gaU9TIFNhZmFyaSA2LnggZmFpbHMgaGVyZVxuICB2YXIgVE9fTE9DQUxFX0JVRyA9ICEhVWludDhBcnJheSAmJiBmYWlscyhmdW5jdGlvbigpeyBhcnJheVRvTG9jYWxlU3RyaW5nLmNhbGwobmV3IFVpbnQ4QXJyYXkoMSkpOyB9KTtcblxuICB2YXIgJHRvTG9jYWxlU3RyaW5nID0gZnVuY3Rpb24gdG9Mb2NhbGVTdHJpbmcoKXtcbiAgICByZXR1cm4gYXJyYXlUb0xvY2FsZVN0cmluZy5hcHBseShUT19MT0NBTEVfQlVHID8gYXJyYXlTbGljZS5jYWxsKHZhbGlkYXRlKHRoaXMpKSA6IHZhbGlkYXRlKHRoaXMpLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIHZhciBwcm90byA9IHtcbiAgICBjb3B5V2l0aGluOiBmdW5jdGlvbiBjb3B5V2l0aGluKHRhcmdldCwgc3RhcnQgLyosIGVuZCAqLyl7XG4gICAgICByZXR1cm4gYXJyYXlDb3B5V2l0aGluLmNhbGwodmFsaWRhdGUodGhpcyksIHRhcmdldCwgc3RhcnQsIGFyZ3VtZW50cy5sZW5ndGggPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkKTtcbiAgICB9LFxuICAgIGV2ZXJ5OiBmdW5jdGlvbiBldmVyeShjYWxsYmFja2ZuIC8qLCB0aGlzQXJnICovKXtcbiAgICAgIHJldHVybiBhcnJheUV2ZXJ5KHZhbGlkYXRlKHRoaXMpLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gICAgfSxcbiAgICBmaWxsOiBmdW5jdGlvbiBmaWxsKHZhbHVlIC8qLCBzdGFydCwgZW5kICovKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgcmV0dXJuIGFycmF5RmlsbC5hcHBseSh2YWxpZGF0ZSh0aGlzKSwgYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIGZpbHRlcjogZnVuY3Rpb24gZmlsdGVyKGNhbGxiYWNrZm4gLyosIHRoaXNBcmcgKi8pe1xuICAgICAgcmV0dXJuIHNwZWNpZXNGcm9tTGlzdCh0aGlzLCBhcnJheUZpbHRlcih2YWxpZGF0ZSh0aGlzKSwgY2FsbGJhY2tmbixcbiAgICAgICAgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpKTtcbiAgICB9LFxuICAgIGZpbmQ6IGZ1bmN0aW9uIGZpbmQocHJlZGljYXRlIC8qLCB0aGlzQXJnICovKXtcbiAgICAgIHJldHVybiBhcnJheUZpbmQodmFsaWRhdGUodGhpcyksIHByZWRpY2F0ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICAgIH0sXG4gICAgZmluZEluZGV4OiBmdW5jdGlvbiBmaW5kSW5kZXgocHJlZGljYXRlIC8qLCB0aGlzQXJnICovKXtcbiAgICAgIHJldHVybiBhcnJheUZpbmRJbmRleCh2YWxpZGF0ZSh0aGlzKSwgcHJlZGljYXRlLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gICAgfSxcbiAgICBmb3JFYWNoOiBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrZm4gLyosIHRoaXNBcmcgKi8pe1xuICAgICAgYXJyYXlGb3JFYWNoKHZhbGlkYXRlKHRoaXMpLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gICAgfSxcbiAgICBpbmRleE9mOiBmdW5jdGlvbiBpbmRleE9mKHNlYXJjaEVsZW1lbnQgLyosIGZyb21JbmRleCAqLyl7XG4gICAgICByZXR1cm4gYXJyYXlJbmRleE9mKHZhbGlkYXRlKHRoaXMpLCBzZWFyY2hFbGVtZW50LCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gICAgfSxcbiAgICBpbmNsdWRlczogZnVuY3Rpb24gaW5jbHVkZXMoc2VhcmNoRWxlbWVudCAvKiwgZnJvbUluZGV4ICovKXtcbiAgICAgIHJldHVybiBhcnJheUluY2x1ZGVzKHZhbGlkYXRlKHRoaXMpLCBzZWFyY2hFbGVtZW50LCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gICAgfSxcbiAgICBqb2luOiBmdW5jdGlvbiBqb2luKHNlcGFyYXRvcil7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIHJldHVybiBhcnJheUpvaW4uYXBwbHkodmFsaWRhdGUodGhpcyksIGFyZ3VtZW50cyk7XG4gICAgfSxcbiAgICBsYXN0SW5kZXhPZjogZnVuY3Rpb24gbGFzdEluZGV4T2Yoc2VhcmNoRWxlbWVudCAvKiwgZnJvbUluZGV4ICovKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgcmV0dXJuIGFycmF5TGFzdEluZGV4T2YuYXBwbHkodmFsaWRhdGUodGhpcyksIGFyZ3VtZW50cyk7XG4gICAgfSxcbiAgICBtYXA6IGZ1bmN0aW9uIG1hcChtYXBmbiAvKiwgdGhpc0FyZyAqLyl7XG4gICAgICByZXR1cm4gJG1hcCh2YWxpZGF0ZSh0aGlzKSwgbWFwZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgICB9LFxuICAgIHJlZHVjZTogZnVuY3Rpb24gcmVkdWNlKGNhbGxiYWNrZm4gLyosIGluaXRpYWxWYWx1ZSAqLyl7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIHJldHVybiBhcnJheVJlZHVjZS5hcHBseSh2YWxpZGF0ZSh0aGlzKSwgYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIHJlZHVjZVJpZ2h0OiBmdW5jdGlvbiByZWR1Y2VSaWdodChjYWxsYmFja2ZuIC8qLCBpbml0aWFsVmFsdWUgKi8peyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICByZXR1cm4gYXJyYXlSZWR1Y2VSaWdodC5hcHBseSh2YWxpZGF0ZSh0aGlzKSwgYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIHJldmVyc2U6IGZ1bmN0aW9uIHJldmVyc2UoKXtcbiAgICAgIHZhciB0aGF0ICAgPSB0aGlzXG4gICAgICAgICwgbGVuZ3RoID0gdmFsaWRhdGUodGhhdCkubGVuZ3RoXG4gICAgICAgICwgbWlkZGxlID0gTWF0aC5mbG9vcihsZW5ndGggLyAyKVxuICAgICAgICAsIGluZGV4ICA9IDBcbiAgICAgICAgLCB2YWx1ZTtcbiAgICAgIHdoaWxlKGluZGV4IDwgbWlkZGxlKXtcbiAgICAgICAgdmFsdWUgICAgICAgICA9IHRoYXRbaW5kZXhdO1xuICAgICAgICB0aGF0W2luZGV4KytdID0gdGhhdFstLWxlbmd0aF07XG4gICAgICAgIHRoYXRbbGVuZ3RoXSAgPSB2YWx1ZTtcbiAgICAgIH0gcmV0dXJuIHRoYXQ7XG4gICAgfSxcbiAgICBzb21lOiBmdW5jdGlvbiBzb21lKGNhbGxiYWNrZm4gLyosIHRoaXNBcmcgKi8pe1xuICAgICAgcmV0dXJuIGFycmF5U29tZSh2YWxpZGF0ZSh0aGlzKSwgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICAgIH0sXG4gICAgc29ydDogZnVuY3Rpb24gc29ydChjb21wYXJlZm4pe1xuICAgICAgcmV0dXJuIGFycmF5U29ydC5jYWxsKHZhbGlkYXRlKHRoaXMpLCBjb21wYXJlZm4pO1xuICAgIH0sXG4gICAgc3ViYXJyYXk6IGZ1bmN0aW9uIHN1YmFycmF5KGJlZ2luLCBlbmQpe1xuICAgICAgdmFyIE8gICAgICA9IHZhbGlkYXRlKHRoaXMpXG4gICAgICAgICwgbGVuZ3RoID0gTy5sZW5ndGhcbiAgICAgICAgLCAkYmVnaW4gPSB0b0luZGV4KGJlZ2luLCBsZW5ndGgpO1xuICAgICAgcmV0dXJuIG5ldyAoc3BlY2llc0NvbnN0cnVjdG9yKE8sIE9bREVGX0NPTlNUUlVDVE9SXSkpKFxuICAgICAgICBPLmJ1ZmZlcixcbiAgICAgICAgTy5ieXRlT2Zmc2V0ICsgJGJlZ2luICogTy5CWVRFU19QRVJfRUxFTUVOVCxcbiAgICAgICAgdG9MZW5ndGgoKGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuZ3RoIDogdG9JbmRleChlbmQsIGxlbmd0aCkpIC0gJGJlZ2luKVxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyICRzbGljZSA9IGZ1bmN0aW9uIHNsaWNlKHN0YXJ0LCBlbmQpe1xuICAgIHJldHVybiBzcGVjaWVzRnJvbUxpc3QodGhpcywgYXJyYXlTbGljZS5jYWxsKHZhbGlkYXRlKHRoaXMpLCBzdGFydCwgZW5kKSk7XG4gIH07XG5cbiAgdmFyICRzZXQgPSBmdW5jdGlvbiBzZXQoYXJyYXlMaWtlIC8qLCBvZmZzZXQgKi8pe1xuICAgIHZhbGlkYXRlKHRoaXMpO1xuICAgIHZhciBvZmZzZXQgPSB0b09mZnNldChhcmd1bWVudHNbMV0sIDEpXG4gICAgICAsIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgICAsIHNyYyAgICA9IHRvT2JqZWN0KGFycmF5TGlrZSlcbiAgICAgICwgbGVuICAgID0gdG9MZW5ndGgoc3JjLmxlbmd0aClcbiAgICAgICwgaW5kZXggID0gMDtcbiAgICBpZihsZW4gKyBvZmZzZXQgPiBsZW5ndGgpdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19MRU5HVEgpO1xuICAgIHdoaWxlKGluZGV4IDwgbGVuKXRoaXNbb2Zmc2V0ICsgaW5kZXhdID0gc3JjW2luZGV4KytdO1xuICB9O1xuXG4gIHZhciAkaXRlcmF0b3JzID0ge1xuICAgIGVudHJpZXM6IGZ1bmN0aW9uIGVudHJpZXMoKXtcbiAgICAgIHJldHVybiBhcnJheUVudHJpZXMuY2FsbCh2YWxpZGF0ZSh0aGlzKSk7XG4gICAgfSxcbiAgICBrZXlzOiBmdW5jdGlvbiBrZXlzKCl7XG4gICAgICByZXR1cm4gYXJyYXlLZXlzLmNhbGwodmFsaWRhdGUodGhpcykpO1xuICAgIH0sXG4gICAgdmFsdWVzOiBmdW5jdGlvbiB2YWx1ZXMoKXtcbiAgICAgIHJldHVybiBhcnJheVZhbHVlcy5jYWxsKHZhbGlkYXRlKHRoaXMpKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGlzVEFJbmRleCA9IGZ1bmN0aW9uKHRhcmdldCwga2V5KXtcbiAgICByZXR1cm4gaXNPYmplY3QodGFyZ2V0KVxuICAgICAgJiYgdGFyZ2V0W1RZUEVEX0FSUkFZXVxuICAgICAgJiYgdHlwZW9mIGtleSAhPSAnc3ltYm9sJ1xuICAgICAgJiYga2V5IGluIHRhcmdldFxuICAgICAgJiYgU3RyaW5nKCtrZXkpID09IFN0cmluZyhrZXkpO1xuICB9O1xuICB2YXIgJGdldERlc2MgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpe1xuICAgIHJldHVybiBpc1RBSW5kZXgodGFyZ2V0LCBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpKVxuICAgICAgPyBwcm9wZXJ0eURlc2MoMiwgdGFyZ2V0W2tleV0pXG4gICAgICA6IGdPUEQodGFyZ2V0LCBrZXkpO1xuICB9O1xuICB2YXIgJHNldERlc2MgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZGVzYyl7XG4gICAgaWYoaXNUQUluZGV4KHRhcmdldCwga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSlcbiAgICAgICYmIGlzT2JqZWN0KGRlc2MpXG4gICAgICAmJiBoYXMoZGVzYywgJ3ZhbHVlJylcbiAgICAgICYmICFoYXMoZGVzYywgJ2dldCcpXG4gICAgICAmJiAhaGFzKGRlc2MsICdzZXQnKVxuICAgICAgLy8gVE9ETzogYWRkIHZhbGlkYXRpb24gZGVzY3JpcHRvciB3L28gY2FsbGluZyBhY2Nlc3NvcnNcbiAgICAgICYmICFkZXNjLmNvbmZpZ3VyYWJsZVxuICAgICAgJiYgKCFoYXMoZGVzYywgJ3dyaXRhYmxlJykgfHwgZGVzYy53cml0YWJsZSlcbiAgICAgICYmICghaGFzKGRlc2MsICdlbnVtZXJhYmxlJykgfHwgZGVzYy5lbnVtZXJhYmxlKVxuICAgICl7XG4gICAgICB0YXJnZXRba2V5XSA9IGRlc2MudmFsdWU7XG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH0gZWxzZSByZXR1cm4gZFAodGFyZ2V0LCBrZXksIGRlc2MpO1xuICB9O1xuXG4gIGlmKCFBTExfQ09OU1RSVUNUT1JTKXtcbiAgICAkR09QRC5mID0gJGdldERlc2M7XG4gICAgJERQLmYgICA9ICRzZXREZXNjO1xuICB9XG5cbiAgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhQUxMX0NPTlNUUlVDVE9SUywgJ09iamVjdCcsIHtcbiAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICRnZXREZXNjLFxuICAgIGRlZmluZVByb3BlcnR5OiAgICAgICAgICAgJHNldERlc2NcbiAgfSk7XG5cbiAgaWYoZmFpbHMoZnVuY3Rpb24oKXsgYXJyYXlUb1N0cmluZy5jYWxsKHt9KTsgfSkpe1xuICAgIGFycmF5VG9TdHJpbmcgPSBhcnJheVRvTG9jYWxlU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICAgIHJldHVybiBhcnJheUpvaW4uY2FsbCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICB2YXIgJFR5cGVkQXJyYXlQcm90b3R5cGUkID0gcmVkZWZpbmVBbGwoe30sIHByb3RvKTtcbiAgcmVkZWZpbmVBbGwoJFR5cGVkQXJyYXlQcm90b3R5cGUkLCAkaXRlcmF0b3JzKTtcbiAgaGlkZSgkVHlwZWRBcnJheVByb3RvdHlwZSQsIElURVJBVE9SLCAkaXRlcmF0b3JzLnZhbHVlcyk7XG4gIHJlZGVmaW5lQWxsKCRUeXBlZEFycmF5UHJvdG90eXBlJCwge1xuICAgIHNsaWNlOiAgICAgICAgICAkc2xpY2UsXG4gICAgc2V0OiAgICAgICAgICAgICRzZXQsXG4gICAgY29uc3RydWN0b3I6ICAgIGZ1bmN0aW9uKCl7IC8qIG5vb3AgKi8gfSxcbiAgICB0b1N0cmluZzogICAgICAgYXJyYXlUb1N0cmluZyxcbiAgICB0b0xvY2FsZVN0cmluZzogJHRvTG9jYWxlU3RyaW5nXG4gIH0pO1xuICBhZGRHZXR0ZXIoJFR5cGVkQXJyYXlQcm90b3R5cGUkLCAnYnVmZmVyJywgJ2InKTtcbiAgYWRkR2V0dGVyKCRUeXBlZEFycmF5UHJvdG90eXBlJCwgJ2J5dGVPZmZzZXQnLCAnbycpO1xuICBhZGRHZXR0ZXIoJFR5cGVkQXJyYXlQcm90b3R5cGUkLCAnYnl0ZUxlbmd0aCcsICdsJyk7XG4gIGFkZEdldHRlcigkVHlwZWRBcnJheVByb3RvdHlwZSQsICdsZW5ndGgnLCAnZScpO1xuICBkUCgkVHlwZWRBcnJheVByb3RvdHlwZSQsIFRBRywge1xuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXNbVFlQRURfQVJSQVldOyB9XG4gIH0pO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZLCBCWVRFUywgd3JhcHBlciwgQ0xBTVBFRCl7XG4gICAgQ0xBTVBFRCA9ICEhQ0xBTVBFRDtcbiAgICB2YXIgTkFNRSAgICAgICA9IEtFWSArIChDTEFNUEVEID8gJ0NsYW1wZWQnIDogJycpICsgJ0FycmF5J1xuICAgICAgLCBJU05UX1VJTlQ4ID0gTkFNRSAhPSAnVWludDhBcnJheSdcbiAgICAgICwgR0VUVEVSICAgICA9ICdnZXQnICsgS0VZXG4gICAgICAsIFNFVFRFUiAgICAgPSAnc2V0JyArIEtFWVxuICAgICAgLCBUeXBlZEFycmF5ID0gZ2xvYmFsW05BTUVdXG4gICAgICAsIEJhc2UgICAgICAgPSBUeXBlZEFycmF5IHx8IHt9XG4gICAgICAsIFRBQyAgICAgICAgPSBUeXBlZEFycmF5ICYmIGdldFByb3RvdHlwZU9mKFR5cGVkQXJyYXkpXG4gICAgICAsIEZPUkNFRCAgICAgPSAhVHlwZWRBcnJheSB8fCAhJHR5cGVkLkFCVlxuICAgICAgLCBPICAgICAgICAgID0ge31cbiAgICAgICwgVHlwZWRBcnJheVByb3RvdHlwZSA9IFR5cGVkQXJyYXkgJiYgVHlwZWRBcnJheVtQUk9UT1RZUEVdO1xuICAgIHZhciBnZXR0ZXIgPSBmdW5jdGlvbih0aGF0LCBpbmRleCl7XG4gICAgICB2YXIgZGF0YSA9IHRoYXQuX2Q7XG4gICAgICByZXR1cm4gZGF0YS52W0dFVFRFUl0oaW5kZXggKiBCWVRFUyArIGRhdGEubywgTElUVExFX0VORElBTik7XG4gICAgfTtcbiAgICB2YXIgc2V0dGVyID0gZnVuY3Rpb24odGhhdCwgaW5kZXgsIHZhbHVlKXtcbiAgICAgIHZhciBkYXRhID0gdGhhdC5fZDtcbiAgICAgIGlmKENMQU1QRUQpdmFsdWUgPSAodmFsdWUgPSBNYXRoLnJvdW5kKHZhbHVlKSkgPCAwID8gMCA6IHZhbHVlID4gMHhmZiA/IDB4ZmYgOiB2YWx1ZSAmIDB4ZmY7XG4gICAgICBkYXRhLnZbU0VUVEVSXShpbmRleCAqIEJZVEVTICsgZGF0YS5vLCB2YWx1ZSwgTElUVExFX0VORElBTik7XG4gICAgfTtcbiAgICB2YXIgYWRkRWxlbWVudCA9IGZ1bmN0aW9uKHRoYXQsIGluZGV4KXtcbiAgICAgIGRQKHRoYXQsIGluZGV4LCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKXtcbiAgICAgICAgICByZXR1cm4gZ2V0dGVyKHRoaXMsIGluZGV4KTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgcmV0dXJuIHNldHRlcih0aGlzLCBpbmRleCwgdmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9O1xuICAgIGlmKEZPUkNFRCl7XG4gICAgICBUeXBlZEFycmF5ID0gd3JhcHBlcihmdW5jdGlvbih0aGF0LCBkYXRhLCAkb2Zmc2V0LCAkbGVuZ3RoKXtcbiAgICAgICAgYW5JbnN0YW5jZSh0aGF0LCBUeXBlZEFycmF5LCBOQU1FLCAnX2QnKTtcbiAgICAgICAgdmFyIGluZGV4ICA9IDBcbiAgICAgICAgICAsIG9mZnNldCA9IDBcbiAgICAgICAgICAsIGJ1ZmZlciwgYnl0ZUxlbmd0aCwgbGVuZ3RoLCBrbGFzcztcbiAgICAgICAgaWYoIWlzT2JqZWN0KGRhdGEpKXtcbiAgICAgICAgICBsZW5ndGggICAgID0gc3RyaWN0VG9MZW5ndGgoZGF0YSwgdHJ1ZSlcbiAgICAgICAgICBieXRlTGVuZ3RoID0gbGVuZ3RoICogQllURVM7XG4gICAgICAgICAgYnVmZmVyICAgICA9IG5ldyAkQXJyYXlCdWZmZXIoYnl0ZUxlbmd0aCk7XG4gICAgICAgIH0gZWxzZSBpZihkYXRhIGluc3RhbmNlb2YgJEFycmF5QnVmZmVyIHx8IChrbGFzcyA9IGNsYXNzb2YoZGF0YSkpID09IEFSUkFZX0JVRkZFUiB8fCBrbGFzcyA9PSBTSEFSRURfQlVGRkVSKXtcbiAgICAgICAgICBidWZmZXIgPSBkYXRhO1xuICAgICAgICAgIG9mZnNldCA9IHRvT2Zmc2V0KCRvZmZzZXQsIEJZVEVTKTtcbiAgICAgICAgICB2YXIgJGxlbiA9IGRhdGEuYnl0ZUxlbmd0aDtcbiAgICAgICAgICBpZigkbGVuZ3RoID09PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgaWYoJGxlbiAlIEJZVEVTKXRocm93IFJhbmdlRXJyb3IoV1JPTkdfTEVOR1RIKTtcbiAgICAgICAgICAgIGJ5dGVMZW5ndGggPSAkbGVuIC0gb2Zmc2V0O1xuICAgICAgICAgICAgaWYoYnl0ZUxlbmd0aCA8IDApdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19MRU5HVEgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBieXRlTGVuZ3RoID0gdG9MZW5ndGgoJGxlbmd0aCkgKiBCWVRFUztcbiAgICAgICAgICAgIGlmKGJ5dGVMZW5ndGggKyBvZmZzZXQgPiAkbGVuKXRocm93IFJhbmdlRXJyb3IoV1JPTkdfTEVOR1RIKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGVuZ3RoID0gYnl0ZUxlbmd0aCAvIEJZVEVTO1xuICAgICAgICB9IGVsc2UgaWYoVFlQRURfQVJSQVkgaW4gZGF0YSl7XG4gICAgICAgICAgcmV0dXJuIGZyb21MaXN0KFR5cGVkQXJyYXksIGRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiAkZnJvbS5jYWxsKFR5cGVkQXJyYXksIGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGhpZGUodGhhdCwgJ19kJywge1xuICAgICAgICAgIGI6IGJ1ZmZlcixcbiAgICAgICAgICBvOiBvZmZzZXQsXG4gICAgICAgICAgbDogYnl0ZUxlbmd0aCxcbiAgICAgICAgICBlOiBsZW5ndGgsXG4gICAgICAgICAgdjogbmV3ICREYXRhVmlldyhidWZmZXIpXG4gICAgICAgIH0pO1xuICAgICAgICB3aGlsZShpbmRleCA8IGxlbmd0aClhZGRFbGVtZW50KHRoYXQsIGluZGV4KyspO1xuICAgICAgfSk7XG4gICAgICBUeXBlZEFycmF5UHJvdG90eXBlID0gVHlwZWRBcnJheVtQUk9UT1RZUEVdID0gY3JlYXRlKCRUeXBlZEFycmF5UHJvdG90eXBlJCk7XG4gICAgICBoaWRlKFR5cGVkQXJyYXlQcm90b3R5cGUsICdjb25zdHJ1Y3RvcicsIFR5cGVkQXJyYXkpO1xuICAgIH0gZWxzZSBpZighJGl0ZXJEZXRlY3QoZnVuY3Rpb24oaXRlcil7XG4gICAgICAvLyBWOCB3b3JrcyB3aXRoIGl0ZXJhdG9ycywgYnV0IGZhaWxzIGluIG1hbnkgb3RoZXIgY2FzZXNcbiAgICAgIC8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00NTUyXG4gICAgICBuZXcgVHlwZWRBcnJheShudWxsKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICAgIG5ldyBUeXBlZEFycmF5KGl0ZXIpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgIH0sIHRydWUpKXtcbiAgICAgIFR5cGVkQXJyYXkgPSB3cmFwcGVyKGZ1bmN0aW9uKHRoYXQsIGRhdGEsICRvZmZzZXQsICRsZW5ndGgpe1xuICAgICAgICBhbkluc3RhbmNlKHRoYXQsIFR5cGVkQXJyYXksIE5BTUUpO1xuICAgICAgICB2YXIga2xhc3M7XG4gICAgICAgIC8vIGB3c2AgbW9kdWxlIGJ1ZywgdGVtcG9yYXJpbHkgcmVtb3ZlIHZhbGlkYXRpb24gbGVuZ3RoIGZvciBVaW50OEFycmF5XG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJzb2NrZXRzL3dzL3B1bGwvNjQ1XG4gICAgICAgIGlmKCFpc09iamVjdChkYXRhKSlyZXR1cm4gbmV3IEJhc2Uoc3RyaWN0VG9MZW5ndGgoZGF0YSwgSVNOVF9VSU5UOCkpO1xuICAgICAgICBpZihkYXRhIGluc3RhbmNlb2YgJEFycmF5QnVmZmVyIHx8IChrbGFzcyA9IGNsYXNzb2YoZGF0YSkpID09IEFSUkFZX0JVRkZFUiB8fCBrbGFzcyA9PSBTSEFSRURfQlVGRkVSKXtcbiAgICAgICAgICByZXR1cm4gJGxlbmd0aCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IG5ldyBCYXNlKGRhdGEsIHRvT2Zmc2V0KCRvZmZzZXQsIEJZVEVTKSwgJGxlbmd0aClcbiAgICAgICAgICAgIDogJG9mZnNldCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgID8gbmV3IEJhc2UoZGF0YSwgdG9PZmZzZXQoJG9mZnNldCwgQllURVMpKVxuICAgICAgICAgICAgICA6IG5ldyBCYXNlKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGlmKFRZUEVEX0FSUkFZIGluIGRhdGEpcmV0dXJuIGZyb21MaXN0KFR5cGVkQXJyYXksIGRhdGEpO1xuICAgICAgICByZXR1cm4gJGZyb20uY2FsbChUeXBlZEFycmF5LCBkYXRhKTtcbiAgICAgIH0pO1xuICAgICAgYXJyYXlGb3JFYWNoKFRBQyAhPT0gRnVuY3Rpb24ucHJvdG90eXBlID8gZ09QTihCYXNlKS5jb25jYXQoZ09QTihUQUMpKSA6IGdPUE4oQmFzZSksIGZ1bmN0aW9uKGtleSl7XG4gICAgICAgIGlmKCEoa2V5IGluIFR5cGVkQXJyYXkpKWhpZGUoVHlwZWRBcnJheSwga2V5LCBCYXNlW2tleV0pO1xuICAgICAgfSk7XG4gICAgICBUeXBlZEFycmF5W1BST1RPVFlQRV0gPSBUeXBlZEFycmF5UHJvdG90eXBlO1xuICAgICAgaWYoIUxJQlJBUlkpVHlwZWRBcnJheVByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFR5cGVkQXJyYXk7XG4gICAgfVxuICAgIHZhciAkbmF0aXZlSXRlcmF0b3IgICA9IFR5cGVkQXJyYXlQcm90b3R5cGVbSVRFUkFUT1JdXG4gICAgICAsIENPUlJFQ1RfSVRFUl9OQU1FID0gISEkbmF0aXZlSXRlcmF0b3IgJiYgKCRuYXRpdmVJdGVyYXRvci5uYW1lID09ICd2YWx1ZXMnIHx8ICRuYXRpdmVJdGVyYXRvci5uYW1lID09IHVuZGVmaW5lZClcbiAgICAgICwgJGl0ZXJhdG9yICAgICAgICAgPSAkaXRlcmF0b3JzLnZhbHVlcztcbiAgICBoaWRlKFR5cGVkQXJyYXksIFRZUEVEX0NPTlNUUlVDVE9SLCB0cnVlKTtcbiAgICBoaWRlKFR5cGVkQXJyYXlQcm90b3R5cGUsIFRZUEVEX0FSUkFZLCBOQU1FKTtcbiAgICBoaWRlKFR5cGVkQXJyYXlQcm90b3R5cGUsIFZJRVcsIHRydWUpO1xuICAgIGhpZGUoVHlwZWRBcnJheVByb3RvdHlwZSwgREVGX0NPTlNUUlVDVE9SLCBUeXBlZEFycmF5KTtcblxuICAgIGlmKENMQU1QRUQgPyBuZXcgVHlwZWRBcnJheSgxKVtUQUddICE9IE5BTUUgOiAhKFRBRyBpbiBUeXBlZEFycmF5UHJvdG90eXBlKSl7XG4gICAgICBkUChUeXBlZEFycmF5UHJvdG90eXBlLCBUQUcsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gTkFNRTsgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgT1tOQU1FXSA9IFR5cGVkQXJyYXk7XG5cbiAgICAkZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqIChUeXBlZEFycmF5ICE9IEJhc2UpLCBPKTtcblxuICAgICRleHBvcnQoJGV4cG9ydC5TLCBOQU1FLCB7XG4gICAgICBCWVRFU19QRVJfRUxFTUVOVDogQllURVMsXG4gICAgICBmcm9tOiAkZnJvbSxcbiAgICAgIG9mOiAkb2ZcbiAgICB9KTtcblxuICAgIGlmKCEoQllURVNfUEVSX0VMRU1FTlQgaW4gVHlwZWRBcnJheVByb3RvdHlwZSkpaGlkZShUeXBlZEFycmF5UHJvdG90eXBlLCBCWVRFU19QRVJfRUxFTUVOVCwgQllURVMpO1xuXG4gICAgJGV4cG9ydCgkZXhwb3J0LlAsIE5BTUUsIHByb3RvKTtcblxuICAgIHNldFNwZWNpZXMoTkFNRSk7XG5cbiAgICAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIEZPUkNFRF9TRVQsIE5BTUUsIHtzZXQ6ICRzZXR9KTtcblxuICAgICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogIUNPUlJFQ1RfSVRFUl9OQU1FLCBOQU1FLCAkaXRlcmF0b3JzKTtcblxuICAgICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKFR5cGVkQXJyYXlQcm90b3R5cGUudG9TdHJpbmcgIT0gYXJyYXlUb1N0cmluZyksIE5BTUUsIHt0b1N0cmluZzogYXJyYXlUb1N0cmluZ30pO1xuXG4gICAgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiBmYWlscyhmdW5jdGlvbigpe1xuICAgICAgbmV3IFR5cGVkQXJyYXkoMSkuc2xpY2UoKTtcbiAgICB9KSwgTkFNRSwge3NsaWNlOiAkc2xpY2V9KTtcblxuICAgICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKGZhaWxzKGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gWzEsIDJdLnRvTG9jYWxlU3RyaW5nKCkgIT0gbmV3IFR5cGVkQXJyYXkoWzEsIDJdKS50b0xvY2FsZVN0cmluZygpXG4gICAgfSkgfHwgIWZhaWxzKGZ1bmN0aW9uKCl7XG4gICAgICBUeXBlZEFycmF5UHJvdG90eXBlLnRvTG9jYWxlU3RyaW5nLmNhbGwoWzEsIDJdKTtcbiAgICB9KSksIE5BTUUsIHt0b0xvY2FsZVN0cmluZzogJHRvTG9jYWxlU3RyaW5nfSk7XG5cbiAgICBJdGVyYXRvcnNbTkFNRV0gPSBDT1JSRUNUX0lURVJfTkFNRSA/ICRuYXRpdmVJdGVyYXRvciA6ICRpdGVyYXRvcjtcbiAgICBpZighTElCUkFSWSAmJiAhQ09SUkVDVF9JVEVSX05BTUUpaGlkZShUeXBlZEFycmF5UHJvdG90eXBlLCBJVEVSQVRPUiwgJGl0ZXJhdG9yKTtcbiAgfTtcbn0gZWxzZSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH07IiwicmVxdWlyZSgnLi9fdHlwZWQtYXJyYXknKSgnSW50OCcsIDEsIGZ1bmN0aW9uKGluaXQpe1xuICByZXR1cm4gZnVuY3Rpb24gSW50OEFycmF5KGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCl7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0pOyIsInJlcXVpcmUoJy4vX3R5cGVkLWFycmF5JykoJ1VpbnQ4JywgMSwgZnVuY3Rpb24oaW5pdCl7XG4gIHJldHVybiBmdW5jdGlvbiBVaW50OEFycmF5KGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCl7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0pOyIsInJlcXVpcmUoJy4vX3R5cGVkLWFycmF5JykoJ1VpbnQ4JywgMSwgZnVuY3Rpb24oaW5pdCl7XG4gIHJldHVybiBmdW5jdGlvbiBVaW50OENsYW1wZWRBcnJheShkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpe1xuICAgIHJldHVybiBpbml0KHRoaXMsIGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCk7XG4gIH07XG59LCB0cnVlKTsiLCJyZXF1aXJlKCcuL190eXBlZC1hcnJheScpKCdJbnQxNicsIDIsIGZ1bmN0aW9uKGluaXQpe1xuICByZXR1cm4gZnVuY3Rpb24gSW50MTZBcnJheShkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpe1xuICAgIHJldHVybiBpbml0KHRoaXMsIGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCk7XG4gIH07XG59KTsiLCJyZXF1aXJlKCcuL190eXBlZC1hcnJheScpKCdVaW50MTYnLCAyLCBmdW5jdGlvbihpbml0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIFVpbnQxNkFycmF5KGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCl7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0pOyIsInJlcXVpcmUoJy4vX3R5cGVkLWFycmF5JykoJ0ludDMyJywgNCwgZnVuY3Rpb24oaW5pdCl7XG4gIHJldHVybiBmdW5jdGlvbiBJbnQzMkFycmF5KGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCl7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0pOyIsInJlcXVpcmUoJy4vX3R5cGVkLWFycmF5JykoJ1VpbnQzMicsIDQsIGZ1bmN0aW9uKGluaXQpe1xuICByZXR1cm4gZnVuY3Rpb24gVWludDMyQXJyYXkoZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKXtcbiAgICByZXR1cm4gaW5pdCh0aGlzLCBkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpO1xuICB9O1xufSk7IiwicmVxdWlyZSgnLi9fdHlwZWQtYXJyYXknKSgnRmxvYXQzMicsIDQsIGZ1bmN0aW9uKGluaXQpe1xuICByZXR1cm4gZnVuY3Rpb24gRmxvYXQzMkFycmF5KGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCl7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0pOyIsInJlcXVpcmUoJy4vX3R5cGVkLWFycmF5JykoJ0Zsb2F0NjQnLCA4LCBmdW5jdGlvbihpbml0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIEZsb2F0NjRBcnJheShkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpe1xuICAgIHJldHVybiBpbml0KHRoaXMsIGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCk7XG4gIH07XG59KTsiLCIvLyAyNi4xLjEgUmVmbGVjdC5hcHBseSh0YXJnZXQsIHRoaXNBcmd1bWVudCwgYXJndW1lbnRzTGlzdClcbnZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsIGFuT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgckFwcGx5ICAgID0gKHJlcXVpcmUoJy4vX2dsb2JhbCcpLlJlZmxlY3QgfHwge30pLmFwcGx5XG4gICwgZkFwcGx5ICAgID0gRnVuY3Rpb24uYXBwbHk7XG4vLyBNUyBFZGdlIGFyZ3VtZW50c0xpc3QgYXJndW1lbnQgaXMgb3B0aW9uYWxcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgckFwcGx5KGZ1bmN0aW9uKCl7fSk7XG59KSwgJ1JlZmxlY3QnLCB7XG4gIGFwcGx5OiBmdW5jdGlvbiBhcHBseSh0YXJnZXQsIHRoaXNBcmd1bWVudCwgYXJndW1lbnRzTGlzdCl7XG4gICAgdmFyIFQgPSBhRnVuY3Rpb24odGFyZ2V0KVxuICAgICAgLCBMID0gYW5PYmplY3QoYXJndW1lbnRzTGlzdCk7XG4gICAgcmV0dXJuIHJBcHBseSA/IHJBcHBseShULCB0aGlzQXJndW1lbnQsIEwpIDogZkFwcGx5LmNhbGwoVCwgdGhpc0FyZ3VtZW50LCBMKTtcbiAgfVxufSk7IiwiLy8gMjYuMS4yIFJlZmxlY3QuY29uc3RydWN0KHRhcmdldCwgYXJndW1lbnRzTGlzdCBbLCBuZXdUYXJnZXRdKVxudmFyICRleHBvcnQgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGNyZWF0ZSAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJylcbiAgLCBhRnVuY3Rpb24gID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXG4gICwgYW5PYmplY3QgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgaXNPYmplY3QgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZmFpbHMgICAgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcbiAgLCBiaW5kICAgICAgID0gcmVxdWlyZSgnLi9fYmluZCcpXG4gICwgckNvbnN0cnVjdCA9IChyZXF1aXJlKCcuL19nbG9iYWwnKS5SZWZsZWN0IHx8IHt9KS5jb25zdHJ1Y3Q7XG5cbi8vIE1TIEVkZ2Ugc3VwcG9ydHMgb25seSAyIGFyZ3VtZW50cyBhbmQgYXJndW1lbnRzTGlzdCBhcmd1bWVudCBpcyBvcHRpb25hbFxuLy8gRkYgTmlnaHRseSBzZXRzIHRoaXJkIGFyZ3VtZW50IGFzIGBuZXcudGFyZ2V0YCwgYnV0IGRvZXMgbm90IGNyZWF0ZSBgdGhpc2AgZnJvbSBpdFxudmFyIE5FV19UQVJHRVRfQlVHID0gZmFpbHMoZnVuY3Rpb24oKXtcbiAgZnVuY3Rpb24gRigpe31cbiAgcmV0dXJuICEockNvbnN0cnVjdChmdW5jdGlvbigpe30sIFtdLCBGKSBpbnN0YW5jZW9mIEYpO1xufSk7XG52YXIgQVJHU19CVUcgPSAhZmFpbHMoZnVuY3Rpb24oKXtcbiAgckNvbnN0cnVjdChmdW5jdGlvbigpe30pO1xufSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKE5FV19UQVJHRVRfQlVHIHx8IEFSR1NfQlVHKSwgJ1JlZmxlY3QnLCB7XG4gIGNvbnN0cnVjdDogZnVuY3Rpb24gY29uc3RydWN0KFRhcmdldCwgYXJncyAvKiwgbmV3VGFyZ2V0Ki8pe1xuICAgIGFGdW5jdGlvbihUYXJnZXQpO1xuICAgIGFuT2JqZWN0KGFyZ3MpO1xuICAgIHZhciBuZXdUYXJnZXQgPSBhcmd1bWVudHMubGVuZ3RoIDwgMyA/IFRhcmdldCA6IGFGdW5jdGlvbihhcmd1bWVudHNbMl0pO1xuICAgIGlmKEFSR1NfQlVHICYmICFORVdfVEFSR0VUX0JVRylyZXR1cm4gckNvbnN0cnVjdChUYXJnZXQsIGFyZ3MsIG5ld1RhcmdldCk7XG4gICAgaWYoVGFyZ2V0ID09IG5ld1RhcmdldCl7XG4gICAgICAvLyB3L28gYWx0ZXJlZCBuZXdUYXJnZXQsIG9wdGltaXphdGlvbiBmb3IgMC00IGFyZ3VtZW50c1xuICAgICAgc3dpdGNoKGFyZ3MubGVuZ3RoKXtcbiAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IFRhcmdldDtcbiAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IFRhcmdldChhcmdzWzBdKTtcbiAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IFRhcmdldChhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICAgICAgY2FzZSAzOiByZXR1cm4gbmV3IFRhcmdldChhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICAgICAgY2FzZSA0OiByZXR1cm4gbmV3IFRhcmdldChhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgICAgIH1cbiAgICAgIC8vIHcvbyBhbHRlcmVkIG5ld1RhcmdldCwgbG90IG9mIGFyZ3VtZW50cyBjYXNlXG4gICAgICB2YXIgJGFyZ3MgPSBbbnVsbF07XG4gICAgICAkYXJncy5wdXNoLmFwcGx5KCRhcmdzLCBhcmdzKTtcbiAgICAgIHJldHVybiBuZXcgKGJpbmQuYXBwbHkoVGFyZ2V0LCAkYXJncykpO1xuICAgIH1cbiAgICAvLyB3aXRoIGFsdGVyZWQgbmV3VGFyZ2V0LCBub3Qgc3VwcG9ydCBidWlsdC1pbiBjb25zdHJ1Y3RvcnNcbiAgICB2YXIgcHJvdG8gICAgPSBuZXdUYXJnZXQucHJvdG90eXBlXG4gICAgICAsIGluc3RhbmNlID0gY3JlYXRlKGlzT2JqZWN0KHByb3RvKSA/IHByb3RvIDogT2JqZWN0LnByb3RvdHlwZSlcbiAgICAgICwgcmVzdWx0ICAgPSBGdW5jdGlvbi5hcHBseS5jYWxsKFRhcmdldCwgaW5zdGFuY2UsIGFyZ3MpO1xuICAgIHJldHVybiBpc09iamVjdChyZXN1bHQpID8gcmVzdWx0IDogaW5zdGFuY2U7XG4gIH1cbn0pOyIsIi8vIDI2LjEuMyBSZWZsZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHlLZXksIGF0dHJpYnV0ZXMpXG52YXIgZFAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsICRleHBvcnQgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcblxuLy8gTVMgRWRnZSBoYXMgYnJva2VuIFJlZmxlY3QuZGVmaW5lUHJvcGVydHkgLSB0aHJvd2luZyBpbnN0ZWFkIG9mIHJldHVybmluZyBmYWxzZVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIFJlZmxlY3QuZGVmaW5lUHJvcGVydHkoZFAuZih7fSwgMSwge3ZhbHVlOiAxfSksIDEsIHt2YWx1ZTogMn0pO1xufSksICdSZWZsZWN0Jywge1xuICBkZWZpbmVQcm9wZXJ0eTogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eUtleSwgYXR0cmlidXRlcyl7XG4gICAgYW5PYmplY3QodGFyZ2V0KTtcbiAgICBwcm9wZXJ0eUtleSA9IHRvUHJpbWl0aXZlKHByb3BlcnR5S2V5LCB0cnVlKTtcbiAgICBhbk9iamVjdChhdHRyaWJ1dGVzKTtcbiAgICB0cnkge1xuICAgICAgZFAuZih0YXJnZXQsIHByb3BlcnR5S2V5LCBhdHRyaWJ1dGVzKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59KTsiLCIvLyAyNi4xLjQgUmVmbGVjdC5kZWxldGVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5S2V5KVxudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBnT1BEICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZlxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtcbiAgZGVsZXRlUHJvcGVydHk6IGZ1bmN0aW9uIGRlbGV0ZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHlLZXkpe1xuICAgIHZhciBkZXNjID0gZ09QRChhbk9iamVjdCh0YXJnZXQpLCBwcm9wZXJ0eUtleSk7XG4gICAgcmV0dXJuIGRlc2MgJiYgIWRlc2MuY29uZmlndXJhYmxlID8gZmFsc2UgOiBkZWxldGUgdGFyZ2V0W3Byb3BlcnR5S2V5XTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjYuMS41IFJlZmxlY3QuZW51bWVyYXRlKHRhcmdldClcbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBFbnVtZXJhdGUgPSBmdW5jdGlvbihpdGVyYXRlZCl7XG4gIHRoaXMuX3QgPSBhbk9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHZhciBrZXlzID0gdGhpcy5fayA9IFtdICAgICAgIC8vIGtleXNcbiAgICAsIGtleTtcbiAgZm9yKGtleSBpbiBpdGVyYXRlZClrZXlzLnB1c2goa2V5KTtcbn07XG5yZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpKEVudW1lcmF0ZSwgJ09iamVjdCcsIGZ1bmN0aW9uKCl7XG4gIHZhciB0aGF0ID0gdGhpc1xuICAgICwga2V5cyA9IHRoYXQuX2tcbiAgICAsIGtleTtcbiAgZG8ge1xuICAgIGlmKHRoYXQuX2kgPj0ga2V5cy5sZW5ndGgpcmV0dXJuIHt2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlfTtcbiAgfSB3aGlsZSghKChrZXkgPSBrZXlzW3RoYXQuX2krK10pIGluIHRoYXQuX3QpKTtcbiAgcmV0dXJuIHt2YWx1ZToga2V5LCBkb25lOiBmYWxzZX07XG59KTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdSZWZsZWN0Jywge1xuICBlbnVtZXJhdGU6IGZ1bmN0aW9uIGVudW1lcmF0ZSh0YXJnZXQpe1xuICAgIHJldHVybiBuZXcgRW51bWVyYXRlKHRhcmdldCk7XG4gIH1cbn0pOyIsIi8vIDI2LjEuNiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3BlcnR5S2V5IFssIHJlY2VpdmVyXSlcbnZhciBnT1BEICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJylcbiAgLCBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgaXNPYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5cbmZ1bmN0aW9uIGdldCh0YXJnZXQsIHByb3BlcnR5S2V5LyosIHJlY2VpdmVyKi8pe1xuICB2YXIgcmVjZWl2ZXIgPSBhcmd1bWVudHMubGVuZ3RoIDwgMyA/IHRhcmdldCA6IGFyZ3VtZW50c1syXVxuICAgICwgZGVzYywgcHJvdG87XG4gIGlmKGFuT2JqZWN0KHRhcmdldCkgPT09IHJlY2VpdmVyKXJldHVybiB0YXJnZXRbcHJvcGVydHlLZXldO1xuICBpZihkZXNjID0gZ09QRC5mKHRhcmdldCwgcHJvcGVydHlLZXkpKXJldHVybiBoYXMoZGVzYywgJ3ZhbHVlJylcbiAgICA/IGRlc2MudmFsdWVcbiAgICA6IGRlc2MuZ2V0ICE9PSB1bmRlZmluZWRcbiAgICAgID8gZGVzYy5nZXQuY2FsbChyZWNlaXZlcilcbiAgICAgIDogdW5kZWZpbmVkO1xuICBpZihpc09iamVjdChwcm90byA9IGdldFByb3RvdHlwZU9mKHRhcmdldCkpKXJldHVybiBnZXQocHJvdG8sIHByb3BlcnR5S2V5LCByZWNlaXZlcik7XG59XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtnZXQ6IGdldH0pOyIsIi8vIDI2LjEuNyBSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIHByb3BlcnR5S2V5KVxudmFyIGdPUEQgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKVxuICAsICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7XG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgcHJvcGVydHlLZXkpe1xuICAgIHJldHVybiBnT1BELmYoYW5PYmplY3QodGFyZ2V0KSwgcHJvcGVydHlLZXkpO1xuICB9XG59KTsiLCIvLyAyNi4xLjggUmVmbGVjdC5nZXRQcm90b3R5cGVPZih0YXJnZXQpXG52YXIgJGV4cG9ydCAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGdldFByb3RvID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdSZWZsZWN0Jywge1xuICBnZXRQcm90b3R5cGVPZjogZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YodGFyZ2V0KXtcbiAgICByZXR1cm4gZ2V0UHJvdG8oYW5PYmplY3QodGFyZ2V0KSk7XG4gIH1cbn0pOyIsIi8vIDI2LjEuOSBSZWZsZWN0Lmhhcyh0YXJnZXQsIHByb3BlcnR5S2V5KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdSZWZsZWN0Jywge1xuICBoYXM6IGZ1bmN0aW9uIGhhcyh0YXJnZXQsIHByb3BlcnR5S2V5KXtcbiAgICByZXR1cm4gcHJvcGVydHlLZXkgaW4gdGFyZ2V0O1xuICB9XG59KTsiLCIvLyAyNi4xLjEwIFJlZmxlY3QuaXNFeHRlbnNpYmxlKHRhcmdldClcbnZhciAkZXhwb3J0ICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBhbk9iamVjdCAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCAkaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdSZWZsZWN0Jywge1xuICBpc0V4dGVuc2libGU6IGZ1bmN0aW9uIGlzRXh0ZW5zaWJsZSh0YXJnZXQpe1xuICAgIGFuT2JqZWN0KHRhcmdldCk7XG4gICAgcmV0dXJuICRpc0V4dGVuc2libGUgPyAkaXNFeHRlbnNpYmxlKHRhcmdldCkgOiB0cnVlO1xuICB9XG59KTsiLCIvLyBhbGwgb2JqZWN0IGtleXMsIGluY2x1ZGVzIG5vbi1lbnVtZXJhYmxlIGFuZCBzeW1ib2xzXG52YXIgZ09QTiAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpXG4gICwgZ09QUyAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIFJlZmxlY3QgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuUmVmbGVjdDtcbm1vZHVsZS5leHBvcnRzID0gUmVmbGVjdCAmJiBSZWZsZWN0Lm93bktleXMgfHwgZnVuY3Rpb24gb3duS2V5cyhpdCl7XG4gIHZhciBrZXlzICAgICAgID0gZ09QTi5mKGFuT2JqZWN0KGl0KSlcbiAgICAsIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIHJldHVybiBnZXRTeW1ib2xzID8ga2V5cy5jb25jYXQoZ2V0U3ltYm9scyhpdCkpIDoga2V5cztcbn07IiwiLy8gMjYuMS4xMSBSZWZsZWN0Lm93bktleXModGFyZ2V0KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdSZWZsZWN0Jywge293bktleXM6IHJlcXVpcmUoJy4vX293bi1rZXlzJyl9KTsiLCIvLyAyNi4xLjEyIFJlZmxlY3QucHJldmVudEV4dGVuc2lvbnModGFyZ2V0KVxudmFyICRleHBvcnQgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgYW5PYmplY3QgICAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCAkcHJldmVudEV4dGVuc2lvbnMgPSBPYmplY3QucHJldmVudEV4dGVuc2lvbnM7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtcbiAgcHJldmVudEV4dGVuc2lvbnM6IGZ1bmN0aW9uIHByZXZlbnRFeHRlbnNpb25zKHRhcmdldCl7XG4gICAgYW5PYmplY3QodGFyZ2V0KTtcbiAgICB0cnkge1xuICAgICAgaWYoJHByZXZlbnRFeHRlbnNpb25zKSRwcmV2ZW50RXh0ZW5zaW9ucyh0YXJnZXQpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn0pOyIsIi8vIDI2LjEuMTMgUmVmbGVjdC5zZXQodGFyZ2V0LCBwcm9wZXJ0eUtleSwgViBbLCByZWNlaXZlcl0pXG52YXIgZFAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGdPUEQgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKVxuICAsIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBjcmVhdGVEZXNjICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBpc09iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuXG5mdW5jdGlvbiBzZXQodGFyZ2V0LCBwcm9wZXJ0eUtleSwgVi8qLCByZWNlaXZlciovKXtcbiAgdmFyIHJlY2VpdmVyID0gYXJndW1lbnRzLmxlbmd0aCA8IDQgPyB0YXJnZXQgOiBhcmd1bWVudHNbM11cbiAgICAsIG93bkRlc2MgID0gZ09QRC5mKGFuT2JqZWN0KHRhcmdldCksIHByb3BlcnR5S2V5KVxuICAgICwgZXhpc3RpbmdEZXNjcmlwdG9yLCBwcm90bztcbiAgaWYoIW93bkRlc2Mpe1xuICAgIGlmKGlzT2JqZWN0KHByb3RvID0gZ2V0UHJvdG90eXBlT2YodGFyZ2V0KSkpe1xuICAgICAgcmV0dXJuIHNldChwcm90bywgcHJvcGVydHlLZXksIFYsIHJlY2VpdmVyKTtcbiAgICB9XG4gICAgb3duRGVzYyA9IGNyZWF0ZURlc2MoMCk7XG4gIH1cbiAgaWYoaGFzKG93bkRlc2MsICd2YWx1ZScpKXtcbiAgICBpZihvd25EZXNjLndyaXRhYmxlID09PSBmYWxzZSB8fCAhaXNPYmplY3QocmVjZWl2ZXIpKXJldHVybiBmYWxzZTtcbiAgICBleGlzdGluZ0Rlc2NyaXB0b3IgPSBnT1BELmYocmVjZWl2ZXIsIHByb3BlcnR5S2V5KSB8fCBjcmVhdGVEZXNjKDApO1xuICAgIGV4aXN0aW5nRGVzY3JpcHRvci52YWx1ZSA9IFY7XG4gICAgZFAuZihyZWNlaXZlciwgcHJvcGVydHlLZXksIGV4aXN0aW5nRGVzY3JpcHRvcik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIG93bkRlc2Muc2V0ID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IChvd25EZXNjLnNldC5jYWxsKHJlY2VpdmVyLCBWKSwgdHJ1ZSk7XG59XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtzZXQ6IHNldH0pOyIsIi8vIDI2LjEuMTQgUmVmbGVjdC5zZXRQcm90b3R5cGVPZih0YXJnZXQsIHByb3RvKVxudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBzZXRQcm90byA9IHJlcXVpcmUoJy4vX3NldC1wcm90bycpO1xuXG5pZihzZXRQcm90bykkZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7XG4gIHNldFByb3RvdHlwZU9mOiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZih0YXJnZXQsIHByb3RvKXtcbiAgICBzZXRQcm90by5jaGVjayh0YXJnZXQsIHByb3RvKTtcbiAgICB0cnkge1xuICAgICAgc2V0UHJvdG8uc2V0KHRhcmdldCwgcHJvdG8pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L0FycmF5LnByb3RvdHlwZS5pbmNsdWRlc1xudmFyICRleHBvcnQgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJGluY2x1ZGVzID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKSh0cnVlKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAsICdBcnJheScsIHtcbiAgaW5jbHVkZXM6IGZ1bmN0aW9uIGluY2x1ZGVzKGVsIC8qLCBmcm9tSW5kZXggPSAwICovKXtcbiAgICByZXR1cm4gJGluY2x1ZGVzKHRoaXMsIGVsLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuXG5yZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKSgnaW5jbHVkZXMnKTsiLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vbWF0aGlhc2J5bmVucy9TdHJpbmcucHJvdG90eXBlLmF0XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJGF0ICAgICA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKHRydWUpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCwgJ1N0cmluZycsIHtcbiAgYXQ6IGZ1bmN0aW9uIGF0KHBvcyl7XG4gICAgcmV0dXJuICRhdCh0aGlzLCBwb3MpO1xuICB9XG59KTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1zdHJpbmctcGFkLXN0YXJ0LWVuZFxudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCByZXBlYXQgICA9IHJlcXVpcmUoJy4vX3N0cmluZy1yZXBlYXQnKVxuICAsIGRlZmluZWQgID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRoYXQsIG1heExlbmd0aCwgZmlsbFN0cmluZywgbGVmdCl7XG4gIHZhciBTICAgICAgICAgICAgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSlcbiAgICAsIHN0cmluZ0xlbmd0aCA9IFMubGVuZ3RoXG4gICAgLCBmaWxsU3RyICAgICAgPSBmaWxsU3RyaW5nID09PSB1bmRlZmluZWQgPyAnICcgOiBTdHJpbmcoZmlsbFN0cmluZylcbiAgICAsIGludE1heExlbmd0aCA9IHRvTGVuZ3RoKG1heExlbmd0aCk7XG4gIGlmKGludE1heExlbmd0aCA8PSBzdHJpbmdMZW5ndGggfHwgZmlsbFN0ciA9PSAnJylyZXR1cm4gUztcbiAgdmFyIGZpbGxMZW4gPSBpbnRNYXhMZW5ndGggLSBzdHJpbmdMZW5ndGhcbiAgICAsIHN0cmluZ0ZpbGxlciA9IHJlcGVhdC5jYWxsKGZpbGxTdHIsIE1hdGguY2VpbChmaWxsTGVuIC8gZmlsbFN0ci5sZW5ndGgpKTtcbiAgaWYoc3RyaW5nRmlsbGVyLmxlbmd0aCA+IGZpbGxMZW4pc3RyaW5nRmlsbGVyID0gc3RyaW5nRmlsbGVyLnNsaWNlKDAsIGZpbGxMZW4pO1xuICByZXR1cm4gbGVmdCA/IHN0cmluZ0ZpbGxlciArIFMgOiBTICsgc3RyaW5nRmlsbGVyO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXN0cmluZy1wYWQtc3RhcnQtZW5kXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJHBhZCAgICA9IHJlcXVpcmUoJy4vX3N0cmluZy1wYWQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAsICdTdHJpbmcnLCB7XG4gIHBhZFN0YXJ0OiBmdW5jdGlvbiBwYWRTdGFydChtYXhMZW5ndGggLyosIGZpbGxTdHJpbmcgPSAnICcgKi8pe1xuICAgIHJldHVybiAkcGFkKHRoaXMsIG1heExlbmd0aCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQsIHRydWUpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1zdHJpbmctcGFkLXN0YXJ0LWVuZFxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRwYWQgICAgPSByZXF1aXJlKCcuL19zdHJpbmctcGFkJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QLCAnU3RyaW5nJywge1xuICBwYWRFbmQ6IGZ1bmN0aW9uIHBhZEVuZChtYXhMZW5ndGggLyosIGZpbGxTdHJpbmcgPSAnICcgKi8pe1xuICAgIHJldHVybiAkcGFkKHRoaXMsIG1heExlbmd0aCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQsIGZhbHNlKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3NlYm1hcmtiYWdlL2VjbWFzY3JpcHQtc3RyaW5nLWxlZnQtcmlnaHQtdHJpbVxucmVxdWlyZSgnLi9fc3RyaW5nLXRyaW0nKSgndHJpbUxlZnQnLCBmdW5jdGlvbigkdHJpbSl7XG4gIHJldHVybiBmdW5jdGlvbiB0cmltTGVmdCgpe1xuICAgIHJldHVybiAkdHJpbSh0aGlzLCAxKTtcbiAgfTtcbn0sICd0cmltU3RhcnQnKTsiLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vc2VibWFya2JhZ2UvZWNtYXNjcmlwdC1zdHJpbmctbGVmdC1yaWdodC10cmltXG5yZXF1aXJlKCcuL19zdHJpbmctdHJpbScpKCd0cmltUmlnaHQnLCBmdW5jdGlvbigkdHJpbSl7XG4gIHJldHVybiBmdW5jdGlvbiB0cmltUmlnaHQoKXtcbiAgICByZXR1cm4gJHRyaW0odGhpcywgMik7XG4gIH07XG59LCAndHJpbUVuZCcpOyIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vU3RyaW5nLnByb3RvdHlwZS5tYXRjaEFsbC9cbnZhciAkZXhwb3J0ICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgZGVmaW5lZCAgICAgPSByZXF1aXJlKCcuL19kZWZpbmVkJylcbiAgLCB0b0xlbmd0aCAgICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgaXNSZWdFeHAgICAgPSByZXF1aXJlKCcuL19pcy1yZWdleHAnKVxuICAsIGdldEZsYWdzICAgID0gcmVxdWlyZSgnLi9fZmxhZ3MnKVxuICAsIFJlZ0V4cFByb3RvID0gUmVnRXhwLnByb3RvdHlwZTtcblxudmFyICRSZWdFeHBTdHJpbmdJdGVyYXRvciA9IGZ1bmN0aW9uKHJlZ2V4cCwgc3RyaW5nKXtcbiAgdGhpcy5fciA9IHJlZ2V4cDtcbiAgdGhpcy5fcyA9IHN0cmluZztcbn07XG5cbnJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJykoJFJlZ0V4cFN0cmluZ0l0ZXJhdG9yLCAnUmVnRXhwIFN0cmluZycsIGZ1bmN0aW9uIG5leHQoKXtcbiAgdmFyIG1hdGNoID0gdGhpcy5fci5leGVjKHRoaXMuX3MpO1xuICByZXR1cm4ge3ZhbHVlOiBtYXRjaCwgZG9uZTogbWF0Y2ggPT09IG51bGx9O1xufSk7XG5cbiRleHBvcnQoJGV4cG9ydC5QLCAnU3RyaW5nJywge1xuICBtYXRjaEFsbDogZnVuY3Rpb24gbWF0Y2hBbGwocmVnZXhwKXtcbiAgICBkZWZpbmVkKHRoaXMpO1xuICAgIGlmKCFpc1JlZ0V4cChyZWdleHApKXRocm93IFR5cGVFcnJvcihyZWdleHAgKyAnIGlzIG5vdCBhIHJlZ2V4cCEnKTtcbiAgICB2YXIgUyAgICAgPSBTdHJpbmcodGhpcylcbiAgICAgICwgZmxhZ3MgPSAnZmxhZ3MnIGluIFJlZ0V4cFByb3RvID8gU3RyaW5nKHJlZ2V4cC5mbGFncykgOiBnZXRGbGFncy5jYWxsKHJlZ2V4cClcbiAgICAgICwgcnggICAgPSBuZXcgUmVnRXhwKHJlZ2V4cC5zb3VyY2UsIH5mbGFncy5pbmRleE9mKCdnJykgPyBmbGFncyA6ICdnJyArIGZsYWdzKTtcbiAgICByeC5sYXN0SW5kZXggPSB0b0xlbmd0aChyZWdleHAubGFzdEluZGV4KTtcbiAgICByZXR1cm4gbmV3ICRSZWdFeHBTdHJpbmdJdGVyYXRvcihyeCwgUyk7XG4gIH1cbn0pOyIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnYXN5bmNJdGVyYXRvcicpOyIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnb2JzZXJ2YWJsZScpOyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3JzXG52YXIgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIG93bktleXMgICAgICAgID0gcmVxdWlyZSgnLi9fb3duLWtleXMnKVxuICAsIHRvSU9iamVjdCAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgZ09QRCAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpXG4gICwgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuL19jcmVhdGUtcHJvcGVydHknKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7XG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnM6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob2JqZWN0KXtcbiAgICB2YXIgTyAgICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgICAsIGdldERlc2MgPSBnT1BELmZcbiAgICAgICwga2V5cyAgICA9IG93bktleXMoTylcbiAgICAgICwgcmVzdWx0ICA9IHt9XG4gICAgICAsIGkgICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShrZXlzLmxlbmd0aCA+IGkpY3JlYXRlUHJvcGVydHkocmVzdWx0LCBrZXkgPSBrZXlzW2krK10sIGdldERlc2MoTywga2V5KSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7IiwidmFyIGdldEtleXMgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBpc0VudW0gICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJykuZjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNFbnRyaWVzKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKGl0KXtcbiAgICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KGl0KVxuICAgICAgLCBrZXlzICAgPSBnZXRLZXlzKE8pXG4gICAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgICAsIGkgICAgICA9IDBcbiAgICAgICwgcmVzdWx0ID0gW11cbiAgICAgICwga2V5O1xuICAgIHdoaWxlKGxlbmd0aCA+IGkpaWYoaXNFbnVtLmNhbGwoTywga2V5ID0ga2V5c1tpKytdKSl7XG4gICAgICByZXN1bHQucHVzaChpc0VudHJpZXMgPyBba2V5LCBPW2tleV1dIDogT1trZXldKTtcbiAgICB9IHJldHVybiByZXN1bHQ7XG4gIH07XG59OyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLW9iamVjdC12YWx1ZXMtZW50cmllc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICR2YWx1ZXMgPSByZXF1aXJlKCcuL19vYmplY3QtdG8tYXJyYXknKShmYWxzZSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge1xuICB2YWx1ZXM6IGZ1bmN0aW9uIHZhbHVlcyhpdCl7XG4gICAgcmV0dXJuICR2YWx1ZXMoaXQpO1xuICB9XG59KTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYmplY3QtdmFsdWVzLWVudHJpZXNcbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJGVudHJpZXMgPSByZXF1aXJlKCcuL19vYmplY3QtdG8tYXJyYXknKSh0cnVlKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7XG4gIGVudHJpZXM6IGZ1bmN0aW9uIGVudHJpZXMoaXQpe1xuICAgIHJldHVybiAkZW50cmllcyhpdCk7XG4gIH1cbn0pOyIsIi8vIEZvcmNlZCByZXBsYWNlbWVudCBwcm90b3R5cGUgYWNjZXNzb3JzIG1ldGhvZHNcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fbGlicmFyeScpfHwgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgdmFyIEsgPSBNYXRoLnJhbmRvbSgpO1xuICAvLyBJbiBGRiB0aHJvd3Mgb25seSBkZWZpbmUgbWV0aG9kc1xuICBfX2RlZmluZVNldHRlcl9fLmNhbGwobnVsbCwgSywgZnVuY3Rpb24oKXsgLyogZW1wdHkgKi99KTtcbiAgZGVsZXRlIHJlcXVpcmUoJy4vX2dsb2JhbCcpW0tdO1xufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgdG9PYmplY3QgICAgICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBhRnVuY3Rpb24gICAgICAgPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJylcbiAgLCAkZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcblxuLy8gQi4yLjIuMiBPYmplY3QucHJvdG90eXBlLl9fZGVmaW5lR2V0dGVyX18oUCwgZ2V0dGVyKVxucmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAkZXhwb3J0KCRleHBvcnQuUCArIHJlcXVpcmUoJy4vX29iamVjdC1mb3JjZWQtcGFtJyksICdPYmplY3QnLCB7XG4gIF9fZGVmaW5lR2V0dGVyX186IGZ1bmN0aW9uIF9fZGVmaW5lR2V0dGVyX18oUCwgZ2V0dGVyKXtcbiAgICAkZGVmaW5lUHJvcGVydHkuZih0b09iamVjdCh0aGlzKSwgUCwge2dldDogYUZ1bmN0aW9uKGdldHRlciksIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZX0pO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCAgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCB0b09iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIGFGdW5jdGlvbiAgICAgICA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsICRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xuXG4vLyBCLjIuMi4zIE9iamVjdC5wcm90b3R5cGUuX19kZWZpbmVTZXR0ZXJfXyhQLCBzZXR0ZXIpXG5yZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICRleHBvcnQoJGV4cG9ydC5QICsgcmVxdWlyZSgnLi9fb2JqZWN0LWZvcmNlZC1wYW0nKSwgJ09iamVjdCcsIHtcbiAgX19kZWZpbmVTZXR0ZXJfXzogZnVuY3Rpb24gX19kZWZpbmVTZXR0ZXJfXyhQLCBzZXR0ZXIpe1xuICAgICRkZWZpbmVQcm9wZXJ0eS5mKHRvT2JqZWN0KHRoaXMpLCBQLCB7c2V0OiBhRnVuY3Rpb24oc2V0dGVyKSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlfSk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ICAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHRvT2JqZWN0ICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgdG9QcmltaXRpdmUgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBnZXRQcm90b3R5cGVPZiAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgLCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmY7XG5cbi8vIEIuMi4yLjQgT2JqZWN0LnByb3RvdHlwZS5fX2xvb2t1cEdldHRlcl9fKFApXG5yZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICRleHBvcnQoJGV4cG9ydC5QICsgcmVxdWlyZSgnLi9fb2JqZWN0LWZvcmNlZC1wYW0nKSwgJ09iamVjdCcsIHtcbiAgX19sb29rdXBHZXR0ZXJfXzogZnVuY3Rpb24gX19sb29rdXBHZXR0ZXJfXyhQKXtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KHRoaXMpXG4gICAgICAsIEsgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKVxuICAgICAgLCBEO1xuICAgIGRvIHtcbiAgICAgIGlmKEQgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgSykpcmV0dXJuIEQuZ2V0O1xuICAgIH0gd2hpbGUoTyA9IGdldFByb3RvdHlwZU9mKE8pKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgdG9PYmplY3QgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCB0b1ByaW1pdGl2ZSAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGdldFByb3RvdHlwZU9mICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKVxuICAsIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZjtcblxuLy8gQi4yLjIuNSBPYmplY3QucHJvdG90eXBlLl9fbG9va3VwU2V0dGVyX18oUClcbnJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgJGV4cG9ydCgkZXhwb3J0LlAgKyByZXF1aXJlKCcuL19vYmplY3QtZm9yY2VkLXBhbScpLCAnT2JqZWN0Jywge1xuICBfX2xvb2t1cFNldHRlcl9fOiBmdW5jdGlvbiBfX2xvb2t1cFNldHRlcl9fKFApe1xuICAgIHZhciBPID0gdG9PYmplY3QodGhpcylcbiAgICAgICwgSyA9IHRvUHJpbWl0aXZlKFAsIHRydWUpXG4gICAgICAsIEQ7XG4gICAgZG8ge1xuICAgICAgaWYoRCA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBLKSlyZXR1cm4gRC5zZXQ7XG4gICAgfSB3aGlsZShPID0gZ2V0UHJvdG90eXBlT2YoTykpO1xuICB9XG59KTsiLCJ2YXIgZm9yT2YgPSByZXF1aXJlKCcuL19mb3Itb2YnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyLCBJVEVSQVRPUil7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yT2YoaXRlciwgZmFsc2UsIHJlc3VsdC5wdXNoLCByZXN1bHQsIElURVJBVE9SKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vRGF2aWRCcnVhbnQvTWFwLVNldC5wcm90b3R5cGUudG9KU09OXG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsIGZyb20gICAgPSByZXF1aXJlKCcuL19hcnJheS1mcm9tLWl0ZXJhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE5BTUUpe1xuICByZXR1cm4gZnVuY3Rpb24gdG9KU09OKCl7XG4gICAgaWYoY2xhc3NvZih0aGlzKSAhPSBOQU1FKXRocm93IFR5cGVFcnJvcihOQU1FICsgXCIjdG9KU09OIGlzbid0IGdlbmVyaWNcIik7XG4gICAgcmV0dXJuIGZyb20odGhpcyk7XG4gIH07XG59OyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuUiwgJ01hcCcsIHt0b0pTT046IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24tdG8tanNvbicpKCdNYXAnKX0pOyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuUiwgJ1NldCcsIHt0b0pTT046IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24tdG8tanNvbicpKCdTZXQnKX0pOyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9samhhcmIvcHJvcG9zYWwtZ2xvYmFsXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1N5c3RlbScsIHtnbG9iYWw6IHJlcXVpcmUoJy4vX2dsb2JhbCcpfSk7IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL2xqaGFyYi9wcm9wb3NhbC1pcy1lcnJvclxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGNvZiAgICAgPSByZXF1aXJlKCcuL19jb2YnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdFcnJvcicsIHtcbiAgaXNFcnJvcjogZnVuY3Rpb24gaXNFcnJvcihpdCl7XG4gICAgcmV0dXJuIGNvZihpdCkgPT09ICdFcnJvcic7XG4gIH1cbn0pOyIsIi8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL0JyZW5kYW5FaWNoLzQyOTRkNWMyMTJhNmQyMjU0NzAzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIGlhZGRoOiBmdW5jdGlvbiBpYWRkaCh4MCwgeDEsIHkwLCB5MSl7XG4gICAgdmFyICR4MCA9IHgwID4+PiAwXG4gICAgICAsICR4MSA9IHgxID4+PiAwXG4gICAgICAsICR5MCA9IHkwID4+PiAwO1xuICAgIHJldHVybiAkeDEgKyAoeTEgPj4+IDApICsgKCgkeDAgJiAkeTAgfCAoJHgwIHwgJHkwKSAmIH4oJHgwICsgJHkwID4+PiAwKSkgPj4+IDMxKSB8IDA7XG4gIH1cbn0pOyIsIi8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL0JyZW5kYW5FaWNoLzQyOTRkNWMyMTJhNmQyMjU0NzAzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIGlzdWJoOiBmdW5jdGlvbiBpc3ViaCh4MCwgeDEsIHkwLCB5MSl7XG4gICAgdmFyICR4MCA9IHgwID4+PiAwXG4gICAgICAsICR4MSA9IHgxID4+PiAwXG4gICAgICAsICR5MCA9IHkwID4+PiAwO1xuICAgIHJldHVybiAkeDEgLSAoeTEgPj4+IDApIC0gKCh+JHgwICYgJHkwIHwgfigkeDAgXiAkeTApICYgJHgwIC0gJHkwID4+PiAwKSA+Pj4gMzEpIHwgMDtcbiAgfVxufSk7IiwiLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vQnJlbmRhbkVpY2gvNDI5NGQ1YzIxMmE2ZDIyNTQ3MDNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgaW11bGg6IGZ1bmN0aW9uIGltdWxoKHUsIHYpe1xuICAgIHZhciBVSU5UMTYgPSAweGZmZmZcbiAgICAgICwgJHUgPSArdVxuICAgICAgLCAkdiA9ICt2XG4gICAgICAsIHUwID0gJHUgJiBVSU5UMTZcbiAgICAgICwgdjAgPSAkdiAmIFVJTlQxNlxuICAgICAgLCB1MSA9ICR1ID4+IDE2XG4gICAgICAsIHYxID0gJHYgPj4gMTZcbiAgICAgICwgdCAgPSAodTEgKiB2MCA+Pj4gMCkgKyAodTAgKiB2MCA+Pj4gMTYpO1xuICAgIHJldHVybiB1MSAqIHYxICsgKHQgPj4gMTYpICsgKCh1MCAqIHYxID4+PiAwKSArICh0ICYgVUlOVDE2KSA+PiAxNik7XG4gIH1cbn0pOyIsIi8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL0JyZW5kYW5FaWNoLzQyOTRkNWMyMTJhNmQyMjU0NzAzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIHVtdWxoOiBmdW5jdGlvbiB1bXVsaCh1LCB2KXtcbiAgICB2YXIgVUlOVDE2ID0gMHhmZmZmXG4gICAgICAsICR1ID0gK3VcbiAgICAgICwgJHYgPSArdlxuICAgICAgLCB1MCA9ICR1ICYgVUlOVDE2XG4gICAgICAsIHYwID0gJHYgJiBVSU5UMTZcbiAgICAgICwgdTEgPSAkdSA+Pj4gMTZcbiAgICAgICwgdjEgPSAkdiA+Pj4gMTZcbiAgICAgICwgdCAgPSAodTEgKiB2MCA+Pj4gMCkgKyAodTAgKiB2MCA+Pj4gMTYpO1xuICAgIHJldHVybiB1MSAqIHYxICsgKHQgPj4+IDE2KSArICgodTAgKiB2MSA+Pj4gMCkgKyAodCAmIFVJTlQxNikgPj4+IDE2KTtcbiAgfVxufSk7IiwidmFyIE1hcCAgICAgPSByZXF1aXJlKCcuL2VzNi5tYXAnKVxuICAsICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHNoYXJlZCAgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnbWV0YWRhdGEnKVxuICAsIHN0b3JlICAgPSBzaGFyZWQuc3RvcmUgfHwgKHNoYXJlZC5zdG9yZSA9IG5ldyAocmVxdWlyZSgnLi9lczYud2Vhay1tYXAnKSkpO1xuXG52YXIgZ2V0T3JDcmVhdGVNZXRhZGF0YU1hcCA9IGZ1bmN0aW9uKHRhcmdldCwgdGFyZ2V0S2V5LCBjcmVhdGUpe1xuICB2YXIgdGFyZ2V0TWV0YWRhdGEgPSBzdG9yZS5nZXQodGFyZ2V0KTtcbiAgaWYoIXRhcmdldE1ldGFkYXRhKXtcbiAgICBpZighY3JlYXRlKXJldHVybiB1bmRlZmluZWQ7XG4gICAgc3RvcmUuc2V0KHRhcmdldCwgdGFyZ2V0TWV0YWRhdGEgPSBuZXcgTWFwKTtcbiAgfVxuICB2YXIga2V5TWV0YWRhdGEgPSB0YXJnZXRNZXRhZGF0YS5nZXQodGFyZ2V0S2V5KTtcbiAgaWYoIWtleU1ldGFkYXRhKXtcbiAgICBpZighY3JlYXRlKXJldHVybiB1bmRlZmluZWQ7XG4gICAgdGFyZ2V0TWV0YWRhdGEuc2V0KHRhcmdldEtleSwga2V5TWV0YWRhdGEgPSBuZXcgTWFwKTtcbiAgfSByZXR1cm4ga2V5TWV0YWRhdGE7XG59O1xudmFyIG9yZGluYXJ5SGFzT3duTWV0YWRhdGEgPSBmdW5jdGlvbihNZXRhZGF0YUtleSwgTywgUCl7XG4gIHZhciBtZXRhZGF0YU1hcCA9IGdldE9yQ3JlYXRlTWV0YWRhdGFNYXAoTywgUCwgZmFsc2UpO1xuICByZXR1cm4gbWV0YWRhdGFNYXAgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogbWV0YWRhdGFNYXAuaGFzKE1ldGFkYXRhS2V5KTtcbn07XG52YXIgb3JkaW5hcnlHZXRPd25NZXRhZGF0YSA9IGZ1bmN0aW9uKE1ldGFkYXRhS2V5LCBPLCBQKXtcbiAgdmFyIG1ldGFkYXRhTWFwID0gZ2V0T3JDcmVhdGVNZXRhZGF0YU1hcChPLCBQLCBmYWxzZSk7XG4gIHJldHVybiBtZXRhZGF0YU1hcCA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogbWV0YWRhdGFNYXAuZ2V0KE1ldGFkYXRhS2V5KTtcbn07XG52YXIgb3JkaW5hcnlEZWZpbmVPd25NZXRhZGF0YSA9IGZ1bmN0aW9uKE1ldGFkYXRhS2V5LCBNZXRhZGF0YVZhbHVlLCBPLCBQKXtcbiAgZ2V0T3JDcmVhdGVNZXRhZGF0YU1hcChPLCBQLCB0cnVlKS5zZXQoTWV0YWRhdGFLZXksIE1ldGFkYXRhVmFsdWUpO1xufTtcbnZhciBvcmRpbmFyeU93bk1ldGFkYXRhS2V5cyA9IGZ1bmN0aW9uKHRhcmdldCwgdGFyZ2V0S2V5KXtcbiAgdmFyIG1ldGFkYXRhTWFwID0gZ2V0T3JDcmVhdGVNZXRhZGF0YU1hcCh0YXJnZXQsIHRhcmdldEtleSwgZmFsc2UpXG4gICAgLCBrZXlzICAgICAgICA9IFtdO1xuICBpZihtZXRhZGF0YU1hcCltZXRhZGF0YU1hcC5mb3JFYWNoKGZ1bmN0aW9uKF8sIGtleSl7IGtleXMucHVzaChrZXkpOyB9KTtcbiAgcmV0dXJuIGtleXM7XG59O1xudmFyIHRvTWV0YUtleSA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiBTdHJpbmcoaXQpO1xufTtcbnZhciBleHAgPSBmdW5jdGlvbihPKXtcbiAgJGV4cG9ydCgkZXhwb3J0LlMsICdSZWZsZWN0JywgTyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc3RvcmU6IHN0b3JlLFxuICBtYXA6IGdldE9yQ3JlYXRlTWV0YWRhdGFNYXAsXG4gIGhhczogb3JkaW5hcnlIYXNPd25NZXRhZGF0YSxcbiAgZ2V0OiBvcmRpbmFyeUdldE93bk1ldGFkYXRhLFxuICBzZXQ6IG9yZGluYXJ5RGVmaW5lT3duTWV0YWRhdGEsXG4gIGtleXM6IG9yZGluYXJ5T3duTWV0YWRhdGFLZXlzLFxuICBrZXk6IHRvTWV0YUtleSxcbiAgZXhwOiBleHBcbn07IiwidmFyIG1ldGFkYXRhICAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhZGF0YScpXG4gICwgYW5PYmplY3QgICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgdG9NZXRhS2V5ICAgICAgICAgICAgICAgICA9IG1ldGFkYXRhLmtleVxuICAsIG9yZGluYXJ5RGVmaW5lT3duTWV0YWRhdGEgPSBtZXRhZGF0YS5zZXQ7XG5cbm1ldGFkYXRhLmV4cCh7ZGVmaW5lTWV0YWRhdGE6IGZ1bmN0aW9uIGRlZmluZU1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlLCB0YXJnZXQsIHRhcmdldEtleSl7XG4gIG9yZGluYXJ5RGVmaW5lT3duTWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUsIGFuT2JqZWN0KHRhcmdldCksIHRvTWV0YUtleSh0YXJnZXRLZXkpKTtcbn19KTsiLCJ2YXIgbWV0YWRhdGEgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGFkYXRhJylcbiAgLCBhbk9iamVjdCAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCB0b01ldGFLZXkgICAgICAgICAgICAgID0gbWV0YWRhdGEua2V5XG4gICwgZ2V0T3JDcmVhdGVNZXRhZGF0YU1hcCA9IG1ldGFkYXRhLm1hcFxuICAsIHN0b3JlICAgICAgICAgICAgICAgICAgPSBtZXRhZGF0YS5zdG9yZTtcblxubWV0YWRhdGEuZXhwKHtkZWxldGVNZXRhZGF0YTogZnVuY3Rpb24gZGVsZXRlTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCAvKiwgdGFyZ2V0S2V5ICovKXtcbiAgdmFyIHRhcmdldEtleSAgID0gYXJndW1lbnRzLmxlbmd0aCA8IDMgPyB1bmRlZmluZWQgOiB0b01ldGFLZXkoYXJndW1lbnRzWzJdKVxuICAgICwgbWV0YWRhdGFNYXAgPSBnZXRPckNyZWF0ZU1ldGFkYXRhTWFwKGFuT2JqZWN0KHRhcmdldCksIHRhcmdldEtleSwgZmFsc2UpO1xuICBpZihtZXRhZGF0YU1hcCA9PT0gdW5kZWZpbmVkIHx8ICFtZXRhZGF0YU1hcFsnZGVsZXRlJ10obWV0YWRhdGFLZXkpKXJldHVybiBmYWxzZTtcbiAgaWYobWV0YWRhdGFNYXAuc2l6ZSlyZXR1cm4gdHJ1ZTtcbiAgdmFyIHRhcmdldE1ldGFkYXRhID0gc3RvcmUuZ2V0KHRhcmdldCk7XG4gIHRhcmdldE1ldGFkYXRhWydkZWxldGUnXSh0YXJnZXRLZXkpO1xuICByZXR1cm4gISF0YXJnZXRNZXRhZGF0YS5zaXplIHx8IHN0b3JlWydkZWxldGUnXSh0YXJnZXQpO1xufX0pOyIsInZhciBtZXRhZGF0YSAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YWRhdGEnKVxuICAsIGFuT2JqZWN0ICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGdldFByb3RvdHlwZU9mICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgLCBvcmRpbmFyeUhhc093bk1ldGFkYXRhID0gbWV0YWRhdGEuaGFzXG4gICwgb3JkaW5hcnlHZXRPd25NZXRhZGF0YSA9IG1ldGFkYXRhLmdldFxuICAsIHRvTWV0YUtleSAgICAgICAgICAgICAgPSBtZXRhZGF0YS5rZXk7XG5cbnZhciBvcmRpbmFyeUdldE1ldGFkYXRhID0gZnVuY3Rpb24oTWV0YWRhdGFLZXksIE8sIFApe1xuICB2YXIgaGFzT3duID0gb3JkaW5hcnlIYXNPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUCk7XG4gIGlmKGhhc093bilyZXR1cm4gb3JkaW5hcnlHZXRPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUCk7XG4gIHZhciBwYXJlbnQgPSBnZXRQcm90b3R5cGVPZihPKTtcbiAgcmV0dXJuIHBhcmVudCAhPT0gbnVsbCA/IG9yZGluYXJ5R2V0TWV0YWRhdGEoTWV0YWRhdGFLZXksIHBhcmVudCwgUCkgOiB1bmRlZmluZWQ7XG59O1xuXG5tZXRhZGF0YS5leHAoe2dldE1ldGFkYXRhOiBmdW5jdGlvbiBnZXRNZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0IC8qLCB0YXJnZXRLZXkgKi8pe1xuICByZXR1cm4gb3JkaW5hcnlHZXRNZXRhZGF0YShtZXRhZGF0YUtleSwgYW5PYmplY3QodGFyZ2V0KSwgYXJndW1lbnRzLmxlbmd0aCA8IDMgPyB1bmRlZmluZWQgOiB0b01ldGFLZXkoYXJndW1lbnRzWzJdKSk7XG59fSk7IiwidmFyIFNldCAgICAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9lczYuc2V0JylcbiAgLCBmcm9tICAgICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FycmF5LWZyb20taXRlcmFibGUnKVxuICAsIG1ldGFkYXRhICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YWRhdGEnKVxuICAsIGFuT2JqZWN0ICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBnZXRQcm90b3R5cGVPZiAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKVxuICAsIG9yZGluYXJ5T3duTWV0YWRhdGFLZXlzID0gbWV0YWRhdGEua2V5c1xuICAsIHRvTWV0YUtleSAgICAgICAgICAgICAgID0gbWV0YWRhdGEua2V5O1xuXG52YXIgb3JkaW5hcnlNZXRhZGF0YUtleXMgPSBmdW5jdGlvbihPLCBQKXtcbiAgdmFyIG9LZXlzICA9IG9yZGluYXJ5T3duTWV0YWRhdGFLZXlzKE8sIFApXG4gICAgLCBwYXJlbnQgPSBnZXRQcm90b3R5cGVPZihPKTtcbiAgaWYocGFyZW50ID09PSBudWxsKXJldHVybiBvS2V5cztcbiAgdmFyIHBLZXlzICA9IG9yZGluYXJ5TWV0YWRhdGFLZXlzKHBhcmVudCwgUCk7XG4gIHJldHVybiBwS2V5cy5sZW5ndGggPyBvS2V5cy5sZW5ndGggPyBmcm9tKG5ldyBTZXQob0tleXMuY29uY2F0KHBLZXlzKSkpIDogcEtleXMgOiBvS2V5cztcbn07XG5cbm1ldGFkYXRhLmV4cCh7Z2V0TWV0YWRhdGFLZXlzOiBmdW5jdGlvbiBnZXRNZXRhZGF0YUtleXModGFyZ2V0IC8qLCB0YXJnZXRLZXkgKi8pe1xuICByZXR1cm4gb3JkaW5hcnlNZXRhZGF0YUtleXMoYW5PYmplY3QodGFyZ2V0KSwgYXJndW1lbnRzLmxlbmd0aCA8IDIgPyB1bmRlZmluZWQgOiB0b01ldGFLZXkoYXJndW1lbnRzWzFdKSk7XG59fSk7IiwidmFyIG1ldGFkYXRhICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhZGF0YScpXG4gICwgYW5PYmplY3QgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgb3JkaW5hcnlHZXRPd25NZXRhZGF0YSA9IG1ldGFkYXRhLmdldFxuICAsIHRvTWV0YUtleSAgICAgICAgICAgICAgPSBtZXRhZGF0YS5rZXk7XG5cbm1ldGFkYXRhLmV4cCh7Z2V0T3duTWV0YWRhdGE6IGZ1bmN0aW9uIGdldE93bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQgLyosIHRhcmdldEtleSAqLyl7XG4gIHJldHVybiBvcmRpbmFyeUdldE93bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCBhbk9iamVjdCh0YXJnZXQpXG4gICAgLCBhcmd1bWVudHMubGVuZ3RoIDwgMyA/IHVuZGVmaW5lZCA6IHRvTWV0YUtleShhcmd1bWVudHNbMl0pKTtcbn19KTsiLCJ2YXIgbWV0YWRhdGEgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhZGF0YScpXG4gICwgYW5PYmplY3QgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIG9yZGluYXJ5T3duTWV0YWRhdGFLZXlzID0gbWV0YWRhdGEua2V5c1xuICAsIHRvTWV0YUtleSAgICAgICAgICAgICAgID0gbWV0YWRhdGEua2V5O1xuXG5tZXRhZGF0YS5leHAoe2dldE93bk1ldGFkYXRhS2V5czogZnVuY3Rpb24gZ2V0T3duTWV0YWRhdGFLZXlzKHRhcmdldCAvKiwgdGFyZ2V0S2V5ICovKXtcbiAgcmV0dXJuIG9yZGluYXJ5T3duTWV0YWRhdGFLZXlzKGFuT2JqZWN0KHRhcmdldCksIGFyZ3VtZW50cy5sZW5ndGggPCAyID8gdW5kZWZpbmVkIDogdG9NZXRhS2V5KGFyZ3VtZW50c1sxXSkpO1xufX0pOyIsInZhciBtZXRhZGF0YSAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YWRhdGEnKVxuICAsIGFuT2JqZWN0ICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGdldFByb3RvdHlwZU9mICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgLCBvcmRpbmFyeUhhc093bk1ldGFkYXRhID0gbWV0YWRhdGEuaGFzXG4gICwgdG9NZXRhS2V5ICAgICAgICAgICAgICA9IG1ldGFkYXRhLmtleTtcblxudmFyIG9yZGluYXJ5SGFzTWV0YWRhdGEgPSBmdW5jdGlvbihNZXRhZGF0YUtleSwgTywgUCl7XG4gIHZhciBoYXNPd24gPSBvcmRpbmFyeUhhc093bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKTtcbiAgaWYoaGFzT3duKXJldHVybiB0cnVlO1xuICB2YXIgcGFyZW50ID0gZ2V0UHJvdG90eXBlT2YoTyk7XG4gIHJldHVybiBwYXJlbnQgIT09IG51bGwgPyBvcmRpbmFyeUhhc01ldGFkYXRhKE1ldGFkYXRhS2V5LCBwYXJlbnQsIFApIDogZmFsc2U7XG59O1xuXG5tZXRhZGF0YS5leHAoe2hhc01ldGFkYXRhOiBmdW5jdGlvbiBoYXNNZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0IC8qLCB0YXJnZXRLZXkgKi8pe1xuICByZXR1cm4gb3JkaW5hcnlIYXNNZXRhZGF0YShtZXRhZGF0YUtleSwgYW5PYmplY3QodGFyZ2V0KSwgYXJndW1lbnRzLmxlbmd0aCA8IDMgPyB1bmRlZmluZWQgOiB0b01ldGFLZXkoYXJndW1lbnRzWzJdKSk7XG59fSk7IiwidmFyIG1ldGFkYXRhICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhZGF0YScpXG4gICwgYW5PYmplY3QgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgb3JkaW5hcnlIYXNPd25NZXRhZGF0YSA9IG1ldGFkYXRhLmhhc1xuICAsIHRvTWV0YUtleSAgICAgICAgICAgICAgPSBtZXRhZGF0YS5rZXk7XG5cbm1ldGFkYXRhLmV4cCh7aGFzT3duTWV0YWRhdGE6IGZ1bmN0aW9uIGhhc093bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQgLyosIHRhcmdldEtleSAqLyl7XG4gIHJldHVybiBvcmRpbmFyeUhhc093bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCBhbk9iamVjdCh0YXJnZXQpXG4gICAgLCBhcmd1bWVudHMubGVuZ3RoIDwgMyA/IHVuZGVmaW5lZCA6IHRvTWV0YUtleShhcmd1bWVudHNbMl0pKTtcbn19KTsiLCJ2YXIgbWV0YWRhdGEgICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGFkYXRhJylcbiAgLCBhbk9iamVjdCAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBhRnVuY3Rpb24gICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXG4gICwgdG9NZXRhS2V5ICAgICAgICAgICAgICAgICA9IG1ldGFkYXRhLmtleVxuICAsIG9yZGluYXJ5RGVmaW5lT3duTWV0YWRhdGEgPSBtZXRhZGF0YS5zZXQ7XG5cbm1ldGFkYXRhLmV4cCh7bWV0YWRhdGE6IGZ1bmN0aW9uIG1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGRlY29yYXRvcih0YXJnZXQsIHRhcmdldEtleSl7XG4gICAgb3JkaW5hcnlEZWZpbmVPd25NZXRhZGF0YShcbiAgICAgIG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlLFxuICAgICAgKHRhcmdldEtleSAhPT0gdW5kZWZpbmVkID8gYW5PYmplY3QgOiBhRnVuY3Rpb24pKHRhcmdldCksXG4gICAgICB0b01ldGFLZXkodGFyZ2V0S2V5KVxuICAgICk7XG4gIH07XG59fSk7IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3J3YWxkcm9uL3RjMzktbm90ZXMvYmxvYi9tYXN0ZXIvZXM2LzIwMTQtMDkvc2VwdC0yNS5tZCM1MTAtZ2xvYmFsYXNhcC1mb3ItZW5xdWV1aW5nLWEtbWljcm90YXNrXG52YXIgJGV4cG9ydCAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBtaWNyb3Rhc2sgPSByZXF1aXJlKCcuL19taWNyb3Rhc2snKSgpXG4gICwgcHJvY2VzcyAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykucHJvY2Vzc1xuICAsIGlzTm9kZSAgICA9IHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJztcblxuJGV4cG9ydCgkZXhwb3J0LkcsIHtcbiAgYXNhcDogZnVuY3Rpb24gYXNhcChmbil7XG4gICAgdmFyIGRvbWFpbiA9IGlzTm9kZSAmJiBwcm9jZXNzLmRvbWFpbjtcbiAgICBtaWNyb3Rhc2soZG9tYWluID8gZG9tYWluLmJpbmQoZm4pIDogZm4pO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vemVucGFyc2luZy9lcy1vYnNlcnZhYmxlXG52YXIgJGV4cG9ydCAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGdsb2JhbCAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIG1pY3JvdGFzayAgID0gcmVxdWlyZSgnLi9fbWljcm90YXNrJykoKVxuICAsIE9CU0VSVkFCTEUgID0gcmVxdWlyZSgnLi9fd2tzJykoJ29ic2VydmFibGUnKVxuICAsIGFGdW5jdGlvbiAgID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXG4gICwgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGFuSW5zdGFuY2UgID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKVxuICAsIHJlZGVmaW5lQWxsID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJylcbiAgLCBoaWRlICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIGZvck9mICAgICAgID0gcmVxdWlyZSgnLi9fZm9yLW9mJylcbiAgLCBSRVRVUk4gICAgICA9IGZvck9mLlJFVFVSTjtcblxudmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uKGZuKXtcbiAgcmV0dXJuIGZuID09IG51bGwgPyB1bmRlZmluZWQgOiBhRnVuY3Rpb24oZm4pO1xufTtcblxudmFyIGNsZWFudXBTdWJzY3JpcHRpb24gPSBmdW5jdGlvbihzdWJzY3JpcHRpb24pe1xuICB2YXIgY2xlYW51cCA9IHN1YnNjcmlwdGlvbi5fYztcbiAgaWYoY2xlYW51cCl7XG4gICAgc3Vic2NyaXB0aW9uLl9jID0gdW5kZWZpbmVkO1xuICAgIGNsZWFudXAoKTtcbiAgfVxufTtcblxudmFyIHN1YnNjcmlwdGlvbkNsb3NlZCA9IGZ1bmN0aW9uKHN1YnNjcmlwdGlvbil7XG4gIHJldHVybiBzdWJzY3JpcHRpb24uX28gPT09IHVuZGVmaW5lZDtcbn07XG5cbnZhciBjbG9zZVN1YnNjcmlwdGlvbiA9IGZ1bmN0aW9uKHN1YnNjcmlwdGlvbil7XG4gIGlmKCFzdWJzY3JpcHRpb25DbG9zZWQoc3Vic2NyaXB0aW9uKSl7XG4gICAgc3Vic2NyaXB0aW9uLl9vID0gdW5kZWZpbmVkO1xuICAgIGNsZWFudXBTdWJzY3JpcHRpb24oc3Vic2NyaXB0aW9uKTtcbiAgfVxufTtcblxudmFyIFN1YnNjcmlwdGlvbiA9IGZ1bmN0aW9uKG9ic2VydmVyLCBzdWJzY3JpYmVyKXtcbiAgYW5PYmplY3Qob2JzZXJ2ZXIpO1xuICB0aGlzLl9jID0gdW5kZWZpbmVkO1xuICB0aGlzLl9vID0gb2JzZXJ2ZXI7XG4gIG9ic2VydmVyID0gbmV3IFN1YnNjcmlwdGlvbk9ic2VydmVyKHRoaXMpO1xuICB0cnkge1xuICAgIHZhciBjbGVhbnVwICAgICAgPSBzdWJzY3JpYmVyKG9ic2VydmVyKVxuICAgICAgLCBzdWJzY3JpcHRpb24gPSBjbGVhbnVwO1xuICAgIGlmKGNsZWFudXAgIT0gbnVsbCl7XG4gICAgICBpZih0eXBlb2YgY2xlYW51cC51bnN1YnNjcmliZSA9PT0gJ2Z1bmN0aW9uJyljbGVhbnVwID0gZnVuY3Rpb24oKXsgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7IH07XG4gICAgICBlbHNlIGFGdW5jdGlvbihjbGVhbnVwKTtcbiAgICAgIHRoaXMuX2MgPSBjbGVhbnVwO1xuICAgIH1cbiAgfSBjYXRjaChlKXtcbiAgICBvYnNlcnZlci5lcnJvcihlKTtcbiAgICByZXR1cm47XG4gIH0gaWYoc3Vic2NyaXB0aW9uQ2xvc2VkKHRoaXMpKWNsZWFudXBTdWJzY3JpcHRpb24odGhpcyk7XG59O1xuXG5TdWJzY3JpcHRpb24ucHJvdG90eXBlID0gcmVkZWZpbmVBbGwoe30sIHtcbiAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCl7IGNsb3NlU3Vic2NyaXB0aW9uKHRoaXMpOyB9XG59KTtcblxudmFyIFN1YnNjcmlwdGlvbk9ic2VydmVyID0gZnVuY3Rpb24oc3Vic2NyaXB0aW9uKXtcbiAgdGhpcy5fcyA9IHN1YnNjcmlwdGlvbjtcbn07XG5cblN1YnNjcmlwdGlvbk9ic2VydmVyLnByb3RvdHlwZSA9IHJlZGVmaW5lQWxsKHt9LCB7XG4gIG5leHQ6IGZ1bmN0aW9uIG5leHQodmFsdWUpe1xuICAgIHZhciBzdWJzY3JpcHRpb24gPSB0aGlzLl9zO1xuICAgIGlmKCFzdWJzY3JpcHRpb25DbG9zZWQoc3Vic2NyaXB0aW9uKSl7XG4gICAgICB2YXIgb2JzZXJ2ZXIgPSBzdWJzY3JpcHRpb24uX287XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgbSA9IGdldE1ldGhvZChvYnNlcnZlci5uZXh0KTtcbiAgICAgICAgaWYobSlyZXR1cm4gbS5jYWxsKG9ic2VydmVyLCB2YWx1ZSk7XG4gICAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNsb3NlU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbik7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKHZhbHVlKXtcbiAgICB2YXIgc3Vic2NyaXB0aW9uID0gdGhpcy5fcztcbiAgICBpZihzdWJzY3JpcHRpb25DbG9zZWQoc3Vic2NyaXB0aW9uKSl0aHJvdyB2YWx1ZTtcbiAgICB2YXIgb2JzZXJ2ZXIgPSBzdWJzY3JpcHRpb24uX287XG4gICAgc3Vic2NyaXB0aW9uLl9vID0gdW5kZWZpbmVkO1xuICAgIHRyeSB7XG4gICAgICB2YXIgbSA9IGdldE1ldGhvZChvYnNlcnZlci5lcnJvcik7XG4gICAgICBpZighbSl0aHJvdyB2YWx1ZTtcbiAgICAgIHZhbHVlID0gbS5jYWxsKG9ic2VydmVyLCB2YWx1ZSk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNsZWFudXBTdWJzY3JpcHRpb24oc3Vic2NyaXB0aW9uKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfSBjbGVhbnVwU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbik7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuICBjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUodmFsdWUpe1xuICAgIHZhciBzdWJzY3JpcHRpb24gPSB0aGlzLl9zO1xuICAgIGlmKCFzdWJzY3JpcHRpb25DbG9zZWQoc3Vic2NyaXB0aW9uKSl7XG4gICAgICB2YXIgb2JzZXJ2ZXIgPSBzdWJzY3JpcHRpb24uX287XG4gICAgICBzdWJzY3JpcHRpb24uX28gPSB1bmRlZmluZWQ7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgbSA9IGdldE1ldGhvZChvYnNlcnZlci5jb21wbGV0ZSk7XG4gICAgICAgIHZhbHVlID0gbSA/IG0uY2FsbChvYnNlcnZlciwgdmFsdWUpIDogdW5kZWZpbmVkO1xuICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjbGVhbnVwU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbik7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfSBjbGVhbnVwU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbik7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG59KTtcblxudmFyICRPYnNlcnZhYmxlID0gZnVuY3Rpb24gT2JzZXJ2YWJsZShzdWJzY3JpYmVyKXtcbiAgYW5JbnN0YW5jZSh0aGlzLCAkT2JzZXJ2YWJsZSwgJ09ic2VydmFibGUnLCAnX2YnKS5fZiA9IGFGdW5jdGlvbihzdWJzY3JpYmVyKTtcbn07XG5cbnJlZGVmaW5lQWxsKCRPYnNlcnZhYmxlLnByb3RvdHlwZSwge1xuICBzdWJzY3JpYmU6IGZ1bmN0aW9uIHN1YnNjcmliZShvYnNlcnZlcil7XG4gICAgcmV0dXJuIG5ldyBTdWJzY3JpcHRpb24ob2JzZXJ2ZXIsIHRoaXMuX2YpO1xuICB9LFxuICBmb3JFYWNoOiBmdW5jdGlvbiBmb3JFYWNoKGZuKXtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyAoY29yZS5Qcm9taXNlIHx8IGdsb2JhbC5Qcm9taXNlKShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgYUZ1bmN0aW9uKGZuKTtcbiAgICAgIHZhciBzdWJzY3JpcHRpb24gPSB0aGF0LnN1YnNjcmliZSh7XG4gICAgICAgIG5leHQgOiBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBmbih2YWx1ZSk7XG4gICAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IHJlamVjdCxcbiAgICAgICAgY29tcGxldGU6IHJlc29sdmVcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59KTtcblxucmVkZWZpbmVBbGwoJE9ic2VydmFibGUsIHtcbiAgZnJvbTogZnVuY3Rpb24gZnJvbSh4KXtcbiAgICB2YXIgQyA9IHR5cGVvZiB0aGlzID09PSAnZnVuY3Rpb24nID8gdGhpcyA6ICRPYnNlcnZhYmxlO1xuICAgIHZhciBtZXRob2QgPSBnZXRNZXRob2QoYW5PYmplY3QoeClbT0JTRVJWQUJMRV0pO1xuICAgIGlmKG1ldGhvZCl7XG4gICAgICB2YXIgb2JzZXJ2YWJsZSA9IGFuT2JqZWN0KG1ldGhvZC5jYWxsKHgpKTtcbiAgICAgIHJldHVybiBvYnNlcnZhYmxlLmNvbnN0cnVjdG9yID09PSBDID8gb2JzZXJ2YWJsZSA6IG5ldyBDKGZ1bmN0aW9uKG9ic2VydmVyKXtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUuc3Vic2NyaWJlKG9ic2VydmVyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEMoZnVuY3Rpb24ob2JzZXJ2ZXIpe1xuICAgICAgdmFyIGRvbmUgPSBmYWxzZTtcbiAgICAgIG1pY3JvdGFzayhmdW5jdGlvbigpe1xuICAgICAgICBpZighZG9uZSl7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmKGZvck9mKHgsIGZhbHNlLCBmdW5jdGlvbihpdCl7XG4gICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoaXQpO1xuICAgICAgICAgICAgICBpZihkb25lKXJldHVybiBSRVRVUk47XG4gICAgICAgICAgICB9KSA9PT0gUkVUVVJOKXJldHVybjtcbiAgICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgaWYoZG9uZSl0aHJvdyBlO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfSBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpeyBkb25lID0gdHJ1ZTsgfTtcbiAgICB9KTtcbiAgfSxcbiAgb2Y6IGZ1bmN0aW9uIG9mKCl7XG4gICAgZm9yKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGgsIGl0ZW1zID0gQXJyYXkobCk7IGkgPCBsOylpdGVtc1tpXSA9IGFyZ3VtZW50c1tpKytdO1xuICAgIHJldHVybiBuZXcgKHR5cGVvZiB0aGlzID09PSAnZnVuY3Rpb24nID8gdGhpcyA6ICRPYnNlcnZhYmxlKShmdW5jdGlvbihvYnNlcnZlcil7XG4gICAgICB2YXIgZG9uZSA9IGZhbHNlO1xuICAgICAgbWljcm90YXNrKGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKCFkb25lKXtcbiAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyArK2kpe1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChpdGVtc1tpXSk7XG4gICAgICAgICAgICBpZihkb25lKXJldHVybjtcbiAgICAgICAgICB9IG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7IGRvbmUgPSB0cnVlOyB9O1xuICAgIH0pO1xuICB9XG59KTtcblxuaGlkZSgkT2JzZXJ2YWJsZS5wcm90b3R5cGUsIE9CU0VSVkFCTEUsIGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9KTtcblxuJGV4cG9ydCgkZXhwb3J0LkcsIHtPYnNlcnZhYmxlOiAkT2JzZXJ2YWJsZX0pO1xuXG5yZXF1aXJlKCcuL19zZXQtc3BlY2llcycpKCdPYnNlcnZhYmxlJyk7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19nbG9iYWwnKTsiLCIndXNlIHN0cmljdCc7XG52YXIgcGF0aCAgICAgID0gcmVxdWlyZSgnLi9fcGF0aCcpXG4gICwgaW52b2tlICAgID0gcmVxdWlyZSgnLi9faW52b2tlJylcbiAgLCBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKC8qIC4uLnBhcmdzICovKXtcbiAgdmFyIGZuICAgICA9IGFGdW5jdGlvbih0aGlzKVxuICAgICwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICwgcGFyZ3MgID0gQXJyYXkobGVuZ3RoKVxuICAgICwgaSAgICAgID0gMFxuICAgICwgXyAgICAgID0gcGF0aC5fXG4gICAgLCBob2xkZXIgPSBmYWxzZTtcbiAgd2hpbGUobGVuZ3RoID4gaSlpZigocGFyZ3NbaV0gPSBhcmd1bWVudHNbaSsrXSkgPT09IF8paG9sZGVyID0gdHJ1ZTtcbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgLCBhTGVuID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLCBqID0gMCwgayA9IDAsIGFyZ3M7XG4gICAgaWYoIWhvbGRlciAmJiAhYUxlbilyZXR1cm4gaW52b2tlKGZuLCBwYXJncywgdGhhdCk7XG4gICAgYXJncyA9IHBhcmdzLnNsaWNlKCk7XG4gICAgaWYoaG9sZGVyKWZvcig7bGVuZ3RoID4gajsgaisrKWlmKGFyZ3Nbal0gPT09IF8pYXJnc1tqXSA9IGFyZ3VtZW50c1trKytdO1xuICAgIHdoaWxlKGFMZW4gPiBrKWFyZ3MucHVzaChhcmd1bWVudHNbaysrXSk7XG4gICAgcmV0dXJuIGludm9rZShmbiwgYXJncywgdGhhdCk7XG4gIH07XG59OyIsIi8vIGllOS0gc2V0VGltZW91dCAmIHNldEludGVydmFsIGFkZGl0aW9uYWwgcGFyYW1ldGVycyBmaXhcbnZhciBnbG9iYWwgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCAkZXhwb3J0ICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBpbnZva2UgICAgID0gcmVxdWlyZSgnLi9faW52b2tlJylcbiAgLCBwYXJ0aWFsICAgID0gcmVxdWlyZSgnLi9fcGFydGlhbCcpXG4gICwgbmF2aWdhdG9yICA9IGdsb2JhbC5uYXZpZ2F0b3JcbiAgLCBNU0lFICAgICAgID0gISFuYXZpZ2F0b3IgJiYgL01TSUUgLlxcLi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTsgLy8gPC0gZGlydHkgaWU5LSBjaGVja1xudmFyIHdyYXAgPSBmdW5jdGlvbihzZXQpe1xuICByZXR1cm4gTVNJRSA/IGZ1bmN0aW9uKGZuLCB0aW1lIC8qLCAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gc2V0KGludm9rZShcbiAgICAgIHBhcnRpYWwsXG4gICAgICBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMiksXG4gICAgICB0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pXG4gICAgKSwgdGltZSk7XG4gIH0gOiBzZXQ7XG59O1xuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LkIgKyAkZXhwb3J0LkYgKiBNU0lFLCB7XG4gIHNldFRpbWVvdXQ6ICB3cmFwKGdsb2JhbC5zZXRUaW1lb3V0KSxcbiAgc2V0SW50ZXJ2YWw6IHdyYXAoZ2xvYmFsLnNldEludGVydmFsKVxufSk7IiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICR0YXNrICAgPSByZXF1aXJlKCcuL190YXNrJyk7XG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuQiwge1xuICBzZXRJbW1lZGlhdGU6ICAgJHRhc2suc2V0LFxuICBjbGVhckltbWVkaWF0ZTogJHRhc2suY2xlYXJcbn0pOyIsInZhciAkaXRlcmF0b3JzICAgID0gcmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKVxuICAsIHJlZGVmaW5lICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgZ2xvYmFsICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGlkZSAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIEl0ZXJhdG9ycyAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIHdrcyAgICAgICAgICAgPSByZXF1aXJlKCcuL193a3MnKVxuICAsIElURVJBVE9SICAgICAgPSB3a3MoJ2l0ZXJhdG9yJylcbiAgLCBUT19TVFJJTkdfVEFHID0gd2tzKCd0b1N0cmluZ1RhZycpXG4gICwgQXJyYXlWYWx1ZXMgICA9IEl0ZXJhdG9ycy5BcnJheTtcblxuZm9yKHZhciBjb2xsZWN0aW9ucyA9IFsnTm9kZUxpc3QnLCAnRE9NVG9rZW5MaXN0JywgJ01lZGlhTGlzdCcsICdTdHlsZVNoZWV0TGlzdCcsICdDU1NSdWxlTGlzdCddLCBpID0gMDsgaSA8IDU7IGkrKyl7XG4gIHZhciBOQU1FICAgICAgID0gY29sbGVjdGlvbnNbaV1cbiAgICAsIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV1cbiAgICAsIHByb3RvICAgICAgPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlXG4gICAgLCBrZXk7XG4gIGlmKHByb3RvKXtcbiAgICBpZighcHJvdG9bSVRFUkFUT1JdKWhpZGUocHJvdG8sIElURVJBVE9SLCBBcnJheVZhbHVlcyk7XG4gICAgaWYoIXByb3RvW1RPX1NUUklOR19UQUddKWhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICAgIEl0ZXJhdG9yc1tOQU1FXSA9IEFycmF5VmFsdWVzO1xuICAgIGZvcihrZXkgaW4gJGl0ZXJhdG9ycylpZighcHJvdG9ba2V5XSlyZWRlZmluZShwcm90bywga2V5LCAkaXRlcmF0b3JzW2tleV0sIHRydWUpO1xuICB9XG59IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogaHR0cHM6Ly9yYXcuZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9tYXN0ZXIvTElDRU5TRSBmaWxlLiBBblxuICogYWRkaXRpb25hbCBncmFudCBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluXG4gKiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuIShmdW5jdGlvbihnbG9iYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICB2YXIgaW5Nb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiO1xuICB2YXIgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWU7XG4gIGlmIChydW50aW1lKSB7XG4gICAgaWYgKGluTW9kdWxlKSB7XG4gICAgICAvLyBJZiByZWdlbmVyYXRvclJ1bnRpbWUgaXMgZGVmaW5lZCBnbG9iYWxseSBhbmQgd2UncmUgaW4gYSBtb2R1bGUsXG4gICAgICAvLyBtYWtlIHRoZSBleHBvcnRzIG9iamVjdCBpZGVudGljYWwgdG8gcmVnZW5lcmF0b3JSdW50aW1lLlxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBydW50aW1lO1xuICAgIH1cbiAgICAvLyBEb24ndCBib3RoZXIgZXZhbHVhdGluZyB0aGUgcmVzdCBvZiB0aGlzIGZpbGUgaWYgdGhlIHJ1bnRpbWUgd2FzXG4gICAgLy8gYWxyZWFkeSBkZWZpbmVkIGdsb2JhbGx5LlxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIERlZmluZSB0aGUgcnVudGltZSBnbG9iYWxseSAoYXMgZXhwZWN0ZWQgYnkgZ2VuZXJhdGVkIGNvZGUpIGFzIGVpdGhlclxuICAvLyBtb2R1bGUuZXhwb3J0cyAoaWYgd2UncmUgaW4gYSBtb2R1bGUpIG9yIGEgbmV3LCBlbXB0eSBvYmplY3QuXG4gIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lID0gaW5Nb2R1bGUgPyBtb2R1bGUuZXhwb3J0cyA6IHt9O1xuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIHJ1bnRpbWUud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlW3RvU3RyaW5nVGFnU3ltYm9sXSA9XG4gICAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgcHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgcnVudGltZS5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBpZiAoISh0b1N0cmluZ1RhZ1N5bWJvbCBpbiBnZW5GdW4pKSB7XG4gICAgICAgIGdlbkZ1blt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIHJ1bnRpbWUuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLiBJZiB0aGUgUHJvbWlzZSBpcyByZWplY3RlZCwgaG93ZXZlciwgdGhlXG4gICAgICAgICAgLy8gcmVzdWx0IGZvciB0aGlzIGl0ZXJhdGlvbiB3aWxsIGJlIHJlamVjdGVkIHdpdGggdGhlIHNhbWVcbiAgICAgICAgICAvLyByZWFzb24uIE5vdGUgdGhhdCByZWplY3Rpb25zIG9mIHlpZWxkZWQgUHJvbWlzZXMgYXJlIG5vdFxuICAgICAgICAgIC8vIHRocm93biBiYWNrIGludG8gdGhlIGdlbmVyYXRvciBmdW5jdGlvbiwgYXMgaXMgdGhlIGNhc2VcbiAgICAgICAgICAvLyB3aGVuIGFuIGF3YWl0ZWQgUHJvbWlzZSBpcyByZWplY3RlZC4gVGhpcyBkaWZmZXJlbmNlIGluXG4gICAgICAgICAgLy8gYmVoYXZpb3IgYmV0d2VlbiB5aWVsZCBhbmQgYXdhaXQgaXMgaW1wb3J0YW50LCBiZWNhdXNlIGl0XG4gICAgICAgICAgLy8gYWxsb3dzIHRoZSBjb25zdW1lciB0byBkZWNpZGUgd2hhdCB0byBkbyB3aXRoIHRoZSB5aWVsZGVkXG4gICAgICAgICAgLy8gcmVqZWN0aW9uIChzd2FsbG93IGl0IGFuZCBjb250aW51ZSwgbWFudWFsbHkgLnRocm93IGl0IGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBnZW5lcmF0b3IsIGFiYW5kb24gaXRlcmF0aW9uLCB3aGF0ZXZlcikuIFdpdGhcbiAgICAgICAgICAvLyBhd2FpdCwgYnkgY29udHJhc3QsIHRoZXJlIGlzIG5vIG9wcG9ydHVuaXR5IHRvIGV4YW1pbmUgdGhlXG4gICAgICAgICAgLy8gcmVqZWN0aW9uIHJlYXNvbiBvdXRzaWRlIHRoZSBnZW5lcmF0b3IgZnVuY3Rpb24sIHNvIHRoZVxuICAgICAgICAgIC8vIG9ubHkgb3B0aW9uIGlzIHRvIHRocm93IGl0IGZyb20gdGhlIGF3YWl0IGV4cHJlc3Npb24sIGFuZFxuICAgICAgICAgIC8vIGxldCB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhbmRsZSB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBwcm9jZXNzID09PSBcIm9iamVjdFwiICYmIHByb2Nlc3MuZG9tYWluKSB7XG4gICAgICBpbnZva2UgPSBwcm9jZXNzLmRvbWFpbi5iaW5kKGludm9rZSk7XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBydW50aW1lLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBydW50aW1lLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdClcbiAgICApO1xuXG4gICAgcmV0dXJuIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIGlmIChtZXRob2QgPT09IFwicmV0dXJuXCIgfHxcbiAgICAgICAgICAgICAgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiICYmIGRlbGVnYXRlLml0ZXJhdG9yW21ldGhvZF0gPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgIC8vIEEgcmV0dXJuIG9yIHRocm93ICh3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gdGhyb3dcbiAgICAgICAgICAgIC8vIG1ldGhvZCkgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICAgIHZhciByZXR1cm5NZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXTtcbiAgICAgICAgICAgIGlmIChyZXR1cm5NZXRob2QpIHtcbiAgICAgICAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKHJldHVybk1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGFyZyk7XG4gICAgICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHJldHVybiBtZXRob2QgdGhyZXcgYW4gZXhjZXB0aW9uLCBsZXQgdGhhdFxuICAgICAgICAgICAgICAgIC8vIGV4Y2VwdGlvbiBwcmV2YWlsIG92ZXIgdGhlIG9yaWdpbmFsIHJldHVybiBvciB0aHJvdy5cbiAgICAgICAgICAgICAgICBtZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgICAgICAgYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgICAgIC8vIENvbnRpbnVlIHdpdGggdGhlIG91dGVyIHJldHVybiwgbm93IHRoYXQgdGhlIGRlbGVnYXRlXG4gICAgICAgICAgICAgIC8vIGl0ZXJhdG9yIGhhcyBiZWVuIHRlcm1pbmF0ZWQuXG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChcbiAgICAgICAgICAgIGRlbGVnYXRlLml0ZXJhdG9yW21ldGhvZF0sXG4gICAgICAgICAgICBkZWxlZ2F0ZS5pdGVyYXRvcixcbiAgICAgICAgICAgIGFyZ1xuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIExpa2UgcmV0dXJuaW5nIGdlbmVyYXRvci50aHJvdyh1bmNhdWdodCksIGJ1dCB3aXRob3V0IHRoZVxuICAgICAgICAgICAgLy8gb3ZlcmhlYWQgb2YgYW4gZXh0cmEgZnVuY3Rpb24gY2FsbC5cbiAgICAgICAgICAgIG1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICAgIGFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBEZWxlZ2F0ZSBnZW5lcmF0b3IgcmFuIGFuZCBoYW5kbGVkIGl0cyBvd24gZXhjZXB0aW9ucyBzb1xuICAgICAgICAgIC8vIHJlZ2FyZGxlc3Mgb2Ygd2hhdCB0aGUgbWV0aG9kIHdhcywgd2UgY29udGludWUgYXMgaWYgaXQgaXNcbiAgICAgICAgICAvLyBcIm5leHRcIiB3aXRoIGFuIHVuZGVmaW5lZCBhcmcuXG4gICAgICAgICAgbWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuICAgICAgICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgICAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuICAgICAgICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuICAgICAgICAgICAgcmV0dXJuIGluZm87XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGFyZykpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgICAgbWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgICBhcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICB2YXIgaW5mbyA9IHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBpZiAoY29udGV4dC5kZWxlZ2F0ZSAmJiBtZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgICAgICAgYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaW5mbztcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihhcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgbWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIEdwW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yXCI7XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIHJ1bnRpbWUua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBydW50aW1lLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuICAgICAgICByZXR1cm4gISFjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xufSkoXG4gIC8vIEFtb25nIHRoZSB2YXJpb3VzIHRyaWNrcyBmb3Igb2J0YWluaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWxcbiAgLy8gb2JqZWN0LCB0aGlzIHNlZW1zIHRvIGJlIHRoZSBtb3N0IHJlbGlhYmxlIHRlY2huaXF1ZSB0aGF0IGRvZXMgbm90XG4gIC8vIHVzZSBpbmRpcmVjdCBldmFsICh3aGljaCB2aW9sYXRlcyBDb250ZW50IFNlY3VyaXR5IFBvbGljeSkuXG4gIHR5cGVvZiBnbG9iYWwgPT09IFwib2JqZWN0XCIgPyBnbG9iYWwgOlxuICB0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiID8gd2luZG93IDpcbiAgdHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgPyBzZWxmIDogdGhpc1xuKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocmVnRXhwLCByZXBsYWNlKXtcbiAgdmFyIHJlcGxhY2VyID0gcmVwbGFjZSA9PT0gT2JqZWN0KHJlcGxhY2UpID8gZnVuY3Rpb24ocGFydCl7XG4gICAgcmV0dXJuIHJlcGxhY2VbcGFydF07XG4gIH0gOiByZXBsYWNlO1xuICByZXR1cm4gZnVuY3Rpb24oaXQpe1xuICAgIHJldHVybiBTdHJpbmcoaXQpLnJlcGxhY2UocmVnRXhwLCByZXBsYWNlcik7XG4gIH07XG59OyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iZW5qYW1pbmdyL1JleEV4cC5lc2NhcGVcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkcmUgICAgID0gcmVxdWlyZSgnLi9fcmVwbGFjZXInKSgvW1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdSZWdFeHAnLCB7ZXNjYXBlOiBmdW5jdGlvbiBlc2NhcGUoaXQpeyByZXR1cm4gJHJlKGl0KTsgfX0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnJlcXVpcmUoXCJjb3JlLWpzL3NoaW1cIik7XG5cbnJlcXVpcmUoXCJyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWVcIik7XG5cbnJlcXVpcmUoXCJjb3JlLWpzL2ZuL3JlZ2V4cC9lc2NhcGVcIik7XG5cbmlmIChnbG9iYWwuX2JhYmVsUG9seWZpbGwpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwib25seSBvbmUgaW5zdGFuY2Ugb2YgYmFiZWwtcG9seWZpbGwgaXMgYWxsb3dlZFwiKTtcbn1cbmdsb2JhbC5fYmFiZWxQb2x5ZmlsbCA9IHRydWU7XG5cbnZhciBERUZJTkVfUFJPUEVSVFkgPSBcImRlZmluZVByb3BlcnR5XCI7XG5mdW5jdGlvbiBkZWZpbmUoTywga2V5LCB2YWx1ZSkge1xuICBPW2tleV0gfHwgT2JqZWN0W0RFRklORV9QUk9QRVJUWV0oTywga2V5LCB7XG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9KTtcbn1cblxuZGVmaW5lKFN0cmluZy5wcm90b3R5cGUsIFwicGFkTGVmdFwiLCBcIlwiLnBhZFN0YXJ0KTtcbmRlZmluZShTdHJpbmcucHJvdG90eXBlLCBcInBhZFJpZ2h0XCIsIFwiXCIucGFkRW5kKTtcblxuXCJwb3AscmV2ZXJzZSxzaGlmdCxrZXlzLHZhbHVlcyxlbnRyaWVzLGluZGV4T2YsZXZlcnksc29tZSxmb3JFYWNoLG1hcCxmaWx0ZXIsZmluZCxmaW5kSW5kZXgsaW5jbHVkZXMsam9pbixzbGljZSxjb25jYXQscHVzaCxzcGxpY2UsdW5zaGlmdCxzb3J0LGxhc3RJbmRleE9mLHJlZHVjZSxyZWR1Y2VSaWdodCxjb3B5V2l0aGluLGZpbGxcIi5zcGxpdChcIixcIikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIFtdW2tleV0gJiYgZGVmaW5lKEFycmF5LCBrZXksIEZ1bmN0aW9uLmNhbGwuYmluZChbXVtrZXldKSk7XG59KTsiLCIvKipcbiAqIE1ldGhvZHMgZm9yIGludGVycHJldGluZyBUaWxlZCBtYXAgZGF0YSBpbnRvIHRoZSBnYW1lXG4gKiBpbnRlbmRlZCB0byBleHRlbmQgUGhhc2VyLlN0YXRlXG4gKi9cbnZhciBUaWxlZEludGVycHJldGVyID0ge1xuICBwcmVsb2FkVGlsZW1hcDogZnVuY3Rpb24gcHJlbG9hZFRpbGVtYXAobmFtZSwganNvbkxvY2F0aW9uKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMubG9hZC5vbkZpbGVDb21wbGV0ZS5hZGQoZnVuY3Rpb24gKHByb2dyZXNzLCBrZXkpIHtcbiAgICAgIGlmIChrZXkgPT09IG5hbWUpIHtcbiAgICAgICAgX3RoaXMucHJlbG9hZFRpbGVtYXBBc3NldHMobmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5sb2FkLnRpbGVtYXAobmFtZSwganNvbkxvY2F0aW9uLCBudWxsLCBQaGFzZXIuVGlsZW1hcC5USUxFRF9KU09OKTtcbiAgfSxcbiAgcHJlbG9hZFRpbGVtYXBBc3NldHM6IGZ1bmN0aW9uIHByZWxvYWRUaWxlbWFwQXNzZXRzKG5hbWUpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIHRoaXMudGlsZW1hcCA9IHRoaXMuY2FjaGUuZ2V0VGlsZW1hcERhdGEobmFtZSk7XG4gICAgLy8gbG9hZCB0aWxlc2V0IGltYWdlc1xuICAgIHRoaXMudGlsZW1hcC5kYXRhLnRpbGVzZXRzLmZvckVhY2goZnVuY3Rpb24gKHNldCkge1xuICAgICAgLy8gVE9ETyB0aGlzIGlzIGJhc2VkIG9uIHRoZSByZWxhdGl2ZSBwYXRocyBhbGwgYmVpbmcgdG8gdGhlIGFzc2V0cyBmb2xkZXIgb3Igc29tZXRoaW5nXG4gICAgICBfdGhpczIubG9hZC5pbWFnZShzZXQubmFtZSwgJy9hc3NldHMvJyArIHNldC5pbWFnZS5yZXBsYWNlKC8oXFwuXFwuXFwvKSsvLCAnJykpO1xuICAgIH0pO1xuICAgIC8vIGxvYWQgb2JqZWN0IHNwcml0ZXNcbiAgICB0aGlzLmdldFNwcml0ZXNGcm9tVGlsZW1hcCh0aGlzLnRpbGVtYXApLmZvckVhY2goZnVuY3Rpb24gKG9iamVjdCkge1xuICAgICAgX3RoaXMyLmxvYWQuc3ByaXRlc2hlZXQob2JqZWN0LnByb3BlcnRpZXMuc3ByaXRlLCAnL2Fzc2V0cy8nICsgb2JqZWN0LnByb3BlcnRpZXMuc3ByaXRlLnJlcGxhY2UoLyhcXC5cXC5cXC8pKy8sICcnKSwgb2JqZWN0LndpZHRoLCBvYmplY3QuaGVpZ2h0KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0U3ByaXRlc0Zyb21UaWxlbWFwOiBmdW5jdGlvbiBnZXRTcHJpdGVzRnJvbVRpbGVtYXAodGlsZW1hcCkge1xuICAgIHZhciBvYmplY3RzQnlTcHJpdGVNYXAgPSB0aWxlbWFwLmRhdGEubGF5ZXJzLnJlZHVjZShmdW5jdGlvbiAob2JqZWN0c0J5U3ByaXRlLCBsYXllcikge1xuICAgICAgaWYgKGxheWVyLm9iamVjdHMpIHtcbiAgICAgICAgbGF5ZXIub2JqZWN0cy5mb3JFYWNoKGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgICAgICBpZiAob2JqZWN0LnByb3BlcnRpZXMgJiYgb2JqZWN0LnByb3BlcnRpZXMuc3ByaXRlICYmICFvYmplY3RzQnlTcHJpdGVbb2JqZWN0LnByb3BlcnRpZXMuc3ByaXRlXSkge1xuICAgICAgICAgICAgb2JqZWN0c0J5U3ByaXRlW29iamVjdC5wcm9wZXJ0aWVzLnNwcml0ZV0gPSBvYmplY3Q7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmplY3RzQnlTcHJpdGU7XG4gICAgfSwge30pO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmplY3RzQnlTcHJpdGVNYXApLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gb2JqZWN0c0J5U3ByaXRlTWFwW2tleV07XG4gICAgfSk7XG4gIH0sXG4gIGNyZWF0ZVRpbGVtYXA6IGZ1bmN0aW9uIGNyZWF0ZVRpbGVtYXAobmFtZSkge1xuICAgIHZhciBtYXAgPSB0aGlzLmdhbWUuYWRkLnRpbGVtYXAobmFtZSk7XG4gICAgdGhpcy50aWxlbWFwLmRhdGEudGlsZXNldHMuZm9yRWFjaChmdW5jdGlvbiAoc2V0KSB7XG4gICAgICBtYXAuYWRkVGlsZXNldEltYWdlKHNldC5uYW1lLCBzZXQubmFtZSwgc2V0LnRpbGV3aWR0aCwgc2V0LnRpbGVoZWlnaHQpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1hcDtcbiAgfSxcbiAgaW5pdGlhdGVUaWxlZE9iamVjdEdyb3VwczogZnVuY3Rpb24gaW5pdGlhdGVUaWxlZE9iamVjdEdyb3VwcyhtYXApIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIC8vIFRPRE8gbmVlZCBtb3JlIGRhdGEgYWJvdXQgb2JqZWN0cy9lbnRpdGllcyBpbiB0aWxlZCBhbmQgY29ycmVzcG9uZGluZ1xuICAgIC8vIGNsYXNzZXMgaW4gZ2FtZSBjb2RlIHRvIGhhbmRsZSB0aGlzIGF1dG9tYWdpY2FsbHlcbiAgICAvLyBzZWUgVGlsZWRMZXZlbFN0YXRlLmNyZWF0ZSBmb3IgbWFudWFsIGltcGxlbWVudGF0aW9uXG4gICAgdmFyIGdyb3VwcyA9IHt9O1xuICAgIHZhciBvYmplY3RzQnlUeXBlID0gdGhpcy5hcnJhbmdlT2JqZWN0c0J5VHlwZShtYXAub2JqZWN0cyk7XG4gICAgT2JqZWN0LmtleXMob2JqZWN0c0J5VHlwZSkuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgZ3JvdXBzW3R5cGVdID0gX3RoaXMzLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgICBncm91cHNbdHlwZV0uZW5hYmxlQm9keSA9IHRydWU7XG4gICAgICBvYmplY3RzQnlUeXBlW3R5cGVdLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIF90aGlzMy5jcmVhdGVTcHJpdGVGcm9tVGlsZWRPYmplY3QoaXRlbSwgZ3JvdXBzW3R5cGVdKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBncm91cHM7XG4gIH0sXG4gIGFycmFuZ2VPYmplY3RzQnlUeXBlOiBmdW5jdGlvbiBhcnJhbmdlT2JqZWN0c0J5VHlwZShvYmplY3RzKSB7XG4gICAgcmV0dXJuIG9iamVjdHMucmVkdWNlKGZ1bmN0aW9uIChvYmplY3RzLCBvYmplY3QpIHtcbiAgICAgIGlmIChvYmplY3QudHlwZSkge1xuICAgICAgICBpZiAoIW9iamVjdHNbb2JqZWN0LnR5cGVdKSB7XG4gICAgICAgICAgb2JqZWN0c1tvYmplY3QudHlwZV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBvYmplY3RzW29iamVjdC50eXBlXS5wdXNoKG9iamVjdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oJ29iamVjdCBmb3VuZCB3aXRob3V0IHR5cGUnLCBvYmplY3QubmFtZSwgb2JqZWN0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmplY3RzO1xuICAgIH0sIHt9KTtcbiAgfSxcbiAgZ2V0T2JqZWN0c0Zyb21UaWxlbWFwOiBmdW5jdGlvbiBnZXRPYmplY3RzRnJvbVRpbGVtYXAodGlsZW1hcCkge1xuICAgIHJldHVybiB0aWxlbWFwLmRhdGEubGF5ZXJzLnJlZHVjZShmdW5jdGlvbiAob2JqZWN0cywgbGF5ZXIpIHtcbiAgICAgIGlmIChsYXllci5vYmplY3RzKSB7XG4gICAgICAgIG9iamVjdHMgPSBvYmplY3RzLmNvbmNhdChsYXllci5vYmplY3RzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmplY3RzO1xuICAgIH0sIFtdKTtcbiAgfSxcbiAgZ2V0VGlsZW1hcE9iamVjdHNCeVR5cGU6IGZ1bmN0aW9uIGdldFRpbGVtYXBPYmplY3RzQnlUeXBlKHRpbGVtYXApIHtcbiAgICByZXR1cm4gdGhpcy5hcnJhbmdlT2JqZWN0c0J5VHlwZSh0aGlzLmdldE9iamVjdHNGcm9tVGlsZW1hcCh0aWxlbWFwKSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBQaGFzZXIgc3ByaXRlIGluIGEgc3ByaXRlIGdyb3VwIGZyb20gYSBUaWxlZCBvYmplY3RcbiAgICogQHBhcmFtICB7b2JqZWN0fSBvYmplY3QgVGhlIFRpbGVkIG9iamVjdFxuICAgKiBAcGFyYW0gIHtncm91cH0gZ3JvdXAgICBUaGUgUGhhc2VyIHNwcml0ZSBncm91cFxuICAgKiBAcmV0dXJuIHtTcHJpdGV9ICAgICAgICBUaGUgUGhhc2VyIHNwcml0ZVxuICAgKi9cbiAgY3JlYXRlU3ByaXRlRnJvbVRpbGVkT2JqZWN0OiBmdW5jdGlvbiBjcmVhdGVTcHJpdGVGcm9tVGlsZWRPYmplY3Qob2JqZWN0LCBncm91cCkge1xuICAgIGlmICghb2JqZWN0LnByb3BlcnRpZXMgfHwgIW9iamVjdC5wcm9wZXJ0aWVzLnNwcml0ZSkge1xuICAgICAgY29uc29sZS5lcnJvcignbm8gc3ByaXRlIGRlZmluZWQgZm9yIG9iamVjdCcsIG9iamVjdCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBzcHJpdGUgPSBncm91cC5jcmVhdGUob2JqZWN0LngsIG9iamVjdC55IC0gb2JqZWN0LmhlaWdodCwgb2JqZWN0LnByb3BlcnRpZXMuc3ByaXRlKTtcbiAgICBzcHJpdGUuZ2FtZURhdGEgPSB7XG4gICAgICBuYW1lOiBvYmplY3QubmFtZSxcbiAgICAgIHR5cGU6IG9iamVjdC50eXBlXG4gICAgfTtcbiAgICBPYmplY3QuYXNzaWduKHNwcml0ZS5nYW1lRGF0YSwgb2JqZWN0LnByb3BlcnRpZXMpO1xuICAgIHJldHVybiBzcHJpdGU7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRpbGVkSW50ZXJwcmV0ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1TDNOeVl5OXpZM0pwY0hSekwyVnVaMmx1WlM5VWFXeGxaRWx1ZEdWeWNISmxkR1Z5TG1weklsMHNJbTVoYldWeklqcGJJbFJwYkdWa1NXNTBaWEp3Y21WMFpYSWlMQ0p3Y21Wc2IyRmtWR2xzWlcxaGNDSXNJbTVoYldVaUxDSnFjMjl1VEc5allYUnBiMjRpTENKc2IyRmtJaXdpYjI1R2FXeGxRMjl0Y0d4bGRHVWlMQ0poWkdRaUxDSndjbTluY21WemN5SXNJbXRsZVNJc0luQnlaV3h2WVdSVWFXeGxiV0Z3UVhOelpYUnpJaXdpZEdsc1pXMWhjQ0lzSWxCb1lYTmxjaUlzSWxScGJHVnRZWEFpTENKVVNVeEZSRjlLVTA5T0lpd2lZMkZqYUdVaUxDSm5aWFJVYVd4bGJXRndSR0YwWVNJc0ltUmhkR0VpTENKMGFXeGxjMlYwY3lJc0ltWnZja1ZoWTJnaUxDSnBiV0ZuWlNJc0luTmxkQ0lzSW5KbGNHeGhZMlVpTENKblpYUlRjSEpwZEdWelJuSnZiVlJwYkdWdFlYQWlMQ0p6Y0hKcGRHVnphR1ZsZENJc0ltOWlhbVZqZENJc0luQnliM0JsY25ScFpYTWlMQ0p6Y0hKcGRHVWlMQ0ozYVdSMGFDSXNJbWhsYVdkb2RDSXNJbTlpYW1WamRITkNlVk53Y21sMFpVMWhjQ0lzSW14aGVXVnljeUlzSW5KbFpIVmpaU0lzSW05aWFtVmpkSE5DZVZOd2NtbDBaU0lzSW14aGVXVnlJaXdpYjJKcVpXTjBjeUlzSWs5aWFtVmpkQ0lzSW10bGVYTWlMQ0p0WVhBaUxDSmpjbVZoZEdWVWFXeGxiV0Z3SWl3aVoyRnRaU0lzSW1Ga1pGUnBiR1Z6WlhSSmJXRm5aU0lzSW5ScGJHVjNhV1IwYUNJc0luUnBiR1ZvWldsbmFIUWlMQ0pwYm1sMGFXRjBaVlJwYkdWa1QySnFaV04wUjNKdmRYQnpJaXdpWjNKdmRYQnpJaXdpYjJKcVpXTjBjMEo1Vkhsd1pTSXNJbUZ5Y21GdVoyVlBZbXBsWTNSelFubFVlWEJsSWl3aWRIbHdaU0lzSW1keWIzVndJaXdpWlc1aFlteGxRbTlrZVNJc0ltTnlaV0YwWlZOd2NtbDBaVVp5YjIxVWFXeGxaRTlpYW1WamRDSXNJbWwwWlcwaUxDSndkWE5vSWl3aVkyOXVjMjlzWlNJc0luZGhjbTRpTENKblpYUlBZbXBsWTNSelJuSnZiVlJwYkdWdFlYQWlMQ0pqYjI1allYUWlMQ0puWlhSVWFXeGxiV0Z3VDJKcVpXTjBjMEo1Vkhsd1pTSXNJbVZ5Y205eUlpd2lZM0psWVhSbElpd2llQ0lzSW5raUxDSm5ZVzFsUkdGMFlTSXNJbUZ6YzJsbmJpSmRMQ0p0WVhCd2FXNW5jeUk2SWtGQlFVRTdPenM3UVVGSlFTeEpRVUZOUVN4dFFrRkJiVUk3UVVGRGRrSkRMR2RDUVVSMVFpd3dRa0ZEVWtNc1NVRkVVU3hGUVVOR1F5eFpRVVJGTEVWQlExazdRVUZCUVRzN1FVRkRha01zVTBGQlMwTXNTVUZCVEN4RFFVRlZReXhqUVVGV0xFTkJRWGxDUXl4SFFVRjZRaXhEUVVFMlFpeFZRVUZEUXl4UlFVRkVMRVZCUVZkRExFZEJRVmdzUlVGQmJVSTdRVUZET1VNc1ZVRkJTVUVzVVVGQlVVNHNTVUZCV2l4RlFVRnJRanRCUVVOb1FpeGpRVUZMVHl4dlFrRkJUQ3hEUVVFd1FsQXNTVUZCTVVJN1FVRkRSRHRCUVVOR0xFdEJTa1E3UVVGTFFTeFRRVUZMUlN4SlFVRk1MRU5CUVZWTkxFOUJRVllzUTBGQmEwSlNMRWxCUVd4Q0xFVkJRWGRDUXl4WlFVRjRRaXhGUVVGelF5eEpRVUYwUXl4RlFVRTBRMUVzVDBGQlQwTXNUMEZCVUN4RFFVRmxReXhWUVVFelJEdEJRVU5FTEVkQlVuTkNPMEZCVTNaQ1NpeHpRa0ZVZFVJc1owTkJVMFpRTEVsQlZFVXNSVUZUU1R0QlFVRkJPenRCUVVONlFpeFRRVUZMVVN4UFFVRk1MRWRCUVdVc1MwRkJTMGtzUzBGQlRDeERRVUZYUXl4alFVRllMRU5CUVRCQ1lpeEpRVUV4UWl4RFFVRm1PMEZCUTBFN1FVRkRRU3hUUVVGTFVTeFBRVUZNTEVOQlFXRk5MRWxCUVdJc1EwRkJhMEpETEZGQlFXeENMRU5CUVRKQ1F5eFBRVUV6UWl4RFFVRnRReXhsUVVGUE8wRkJRM2hETzBGQlEwRXNZVUZCUzJRc1NVRkJUQ3hEUVVGVlpTeExRVUZXTEVOQlFXZENReXhKUVVGSmJFSXNTVUZCY0VJc1pVRkJjVU5yUWl4SlFVRkpSQ3hMUVVGS0xFTkJRVlZGTEU5QlFWWXNRMEZCYTBJc1YwRkJiRUlzUlVGQkswSXNSVUZCTDBJc1EwRkJja003UVVGRFJDeExRVWhFTzBGQlNVRTdRVUZEUVN4VFFVRkxReXh4UWtGQlRDeERRVUV5UWl4TFFVRkxXaXhQUVVGb1F5eEZRVUY1UTFFc1QwRkJla01zUTBGQmFVUXNhMEpCUVZVN1FVRkRla1FzWVVGQlMyUXNTVUZCVEN4RFFVRlZiVUlzVjBGQlZpeERRVU5GUXl4UFFVRlBReXhWUVVGUUxFTkJRV3RDUXl4TlFVUndRaXhsUVVWaFJpeFBRVUZQUXl4VlFVRlFMRU5CUVd0Q1F5eE5RVUZzUWl4RFFVRjVRa3dzVDBGQmVrSXNRMEZCYVVNc1YwRkJha01zUlVGQk9FTXNSVUZCT1VNc1EwRkdZaXhGUVVkRlJ5eFBRVUZQUnl4TFFVaFVMRVZCU1VWSUxFOUJRVTlKTEUxQlNsUTdRVUZOUkN4TFFWQkVPMEZCVVVRc1IwRjZRbk5DTzBGQk1FSjJRazRzZFVKQk1VSjFRaXhwUTBFd1FrUmFMRTlCTVVKRExFVkJNRUpSTzBGQlF6ZENMRkZCUVUxdFFpeHhRa0ZCY1VKdVFpeFJRVUZSVFN4SlFVRlNMRU5CUVdGakxFMUJRV0lzUTBGQmIwSkRMRTFCUVhCQ0xFTkJRVEpDTEZWQlFVTkRMR1ZCUVVRc1JVRkJhMEpETEV0QlFXeENMRVZCUVRSQ08wRkJRMmhHTEZWQlFVbEJMRTFCUVUxRExFOUJRVllzUlVGQmJVSTdRVUZEYWtKRUxHTkJRVTFETEU5QlFVNHNRMEZCWTJoQ0xFOUJRV1FzUTBGQmMwSXNhMEpCUVZVN1FVRkRPVUlzWTBGQlNVMHNUMEZCVDBNc1ZVRkJVQ3hKUVVGeFFrUXNUMEZCVDBNc1ZVRkJVQ3hEUVVGclFrTXNUVUZCZGtNc1NVRkJhVVFzUTBGQlEwMHNaMEpCUVdkQ1VpeFBRVUZQUXl4VlFVRlFMRU5CUVd0Q1F5eE5RVUZzUXl4RFFVRjBSQ3hGUVVGcFJ6dEJRVU12Umswc05FSkJRV2RDVWl4UFFVRlBReXhWUVVGUUxFTkJRV3RDUXl4TlFVRnNReXhKUVVFMFEwWXNUVUZCTlVNN1FVRkRSRHRCUVVOR0xGTkJTa1E3UVVGTFJEdEJRVU5FTEdGQlFVOVJMR1ZCUVZBN1FVRkRSQ3hMUVZRd1FpeEZRVk40UWl4RlFWUjNRaXhEUVVFelFqdEJRVlZCTEZkQlFVOUhMRTlCUVU5RExFbEJRVkFzUTBGQldWQXNhMEpCUVZvc1JVRkJaME5STEVkQlFXaERMRU5CUVc5RE8wRkJRVUVzWVVGQlQxSXNiVUpCUVcxQ2NrSXNSMEZCYmtJc1EwRkJVRHRCUVVGQkxFdEJRWEJETEVOQlFWQTdRVUZEUkN4SFFYUkRjMEk3UVVGMVEzWkNPRUlzWlVGMlEzVkNMSGxDUVhWRFZIQkRMRWxCZGtOVExFVkJkVU5JTzBGQlEyeENMRkZCUVUxdFF5eE5RVUZOTEV0QlFVdEZMRWxCUVV3c1EwRkJWV3BETEVkQlFWWXNRMEZCWTBrc1QwRkJaQ3hEUVVGelFsSXNTVUZCZEVJc1EwRkJXanRCUVVOQkxGTkJRVXRSTEU5QlFVd3NRMEZCWVUwc1NVRkJZaXhEUVVGclFrTXNVVUZCYkVJc1EwRkJNa0pETEU5QlFUTkNMRU5CUVcxRExHVkJRVTg3UVVGRGVFTnRRaXhWUVVGSlJ5eGxRVUZLTEVOQlEwVndRaXhKUVVGSmJFSXNTVUZFVGl4RlFVVkZhMElzU1VGQlNXeENMRWxCUms0c1JVRkhSV3RDTEVsQlFVbHhRaXhUUVVoT0xFVkJTVVZ5UWl4SlFVRkpjMElzVlVGS1RqdEJRVTFFTEV0QlVFUTdPMEZCVTBFc1YwRkJUMHdzUjBGQlVEdEJRVU5FTEVkQmJrUnpRanRCUVc5RWRrSk5MREpDUVhCRWRVSXNjVU5CYjBSSFRpeEhRWEJFU0N4RlFXOUVVVHRCUVVGQk96dEJRVU0zUWp0QlFVTkJPMEZCUTBFN1FVRkRRU3hSUVVGTlR5eFRRVUZUTEVWQlFXWTdRVUZEUVN4UlFVRk5ReXhuUWtGQlowSXNTMEZCUzBNc2IwSkJRVXdzUTBGQk1FSlVMRWxCUVVsSUxFOUJRVGxDTEVOQlFYUkNPMEZCUTBGRExGZEJRVTlETEVsQlFWQXNRMEZCV1ZNc1lVRkJXaXhGUVVFeVFqTkNMRTlCUVROQ0xFTkJRVzFETEdkQ1FVRlJPMEZCUTNwRE1FSXNZVUZCVDBjc1NVRkJVQ3hKUVVGbExFOUJRVXRTTEVsQlFVd3NRMEZCVldwRExFZEJRVllzUTBGQll6QkRMRXRCUVdRc1JVRkJaanRCUVVOQlNpeGhRVUZQUnl4SlFVRlFMRVZCUVdGRkxGVkJRV0lzUjBGQk1FSXNTVUZCTVVJN1FVRkRRVW9zYjBKQlFXTkZMRWxCUVdRc1JVRkJiMEkzUWl4UFFVRndRaXhEUVVFMFFqdEJRVUZCTEdWQlFWRXNUMEZCUzJkRExESkNRVUZNTEVOQlFXbERReXhKUVVGcVF5eEZRVUYxUTFBc1QwRkJUMGNzU1VGQlVDeERRVUYyUXl4RFFVRlNPMEZCUVVFc1QwRkJOVUk3UVVGRFJDeExRVXBFTzBGQlMwRXNWMEZCVDBnc1RVRkJVRHRCUVVORUxFZEJhRVZ6UWp0QlFXbEZka0pGTEhOQ1FXcEZkVUlzWjBOQmFVVkdXaXhQUVdwRlJTeEZRV2xGVHp0QlFVTTFRaXhYUVVGUFFTeFJRVUZSU0N4TlFVRlNMRU5CUVdVc1ZVRkJRMGNzVDBGQlJDeEZRVUZWVml4TlFVRldMRVZCUVhGQ08wRkJRM3BETEZWQlFVbEJMRTlCUVU5MVFpeEpRVUZZTEVWQlFXbENPMEZCUTJZc1dVRkJTU3hEUVVGRFlpeFJRVUZSVml4UFFVRlBkVUlzU1VGQlppeERRVUZNTEVWQlFUSkNPMEZCUTNwQ1lpeHJRa0ZCVVZZc1QwRkJUM1ZDTEVsQlFXWXNTVUZCZFVJc1JVRkJka0k3UVVGRFJEdEJRVU5FWWl4blFrRkJVVllzVDBGQlQzVkNMRWxCUVdZc1JVRkJjVUpMTEVsQlFYSkNMRU5CUVRCQ05VSXNUVUZCTVVJN1FVRkRSQ3hQUVV4RUxFMUJTMDg3UVVGRFREWkNMR2RDUVVGUlF5eEpRVUZTTEVOQlFXRXNNa0pCUVdJc1JVRkJNRU01UWl4UFFVRlBkRUlzU1VGQmFrUXNSVUZCZFVSelFpeE5RVUYyUkR0QlFVTkVPMEZCUTBRc1lVRkJUMVVzVDBGQlVEdEJRVU5FTEV0QlZrMHNSVUZWU2l4RlFWWkpMRU5CUVZBN1FVRlhSQ3hIUVRkRmMwSTdRVUU0UlhaQ2NVSXNkVUpCT1VWMVFpeHBRMEU0UlVRM1F5eFBRVGxGUXl4RlFUaEZVVHRCUVVNM1FpeFhRVUZQUVN4UlFVRlJUU3hKUVVGU0xFTkJRV0ZqTEUxQlFXSXNRMEZCYjBKRExFMUJRWEJDTEVOQlFUSkNMRlZCUVVOSExFOUJRVVFzUlVGQlZVUXNTMEZCVml4RlFVRnZRanRCUVVOd1JDeFZRVUZKUVN4TlFVRk5ReXhQUVVGV0xFVkJRVzFDTzBGQlEycENRU3hyUWtGQlZVRXNVVUZCVVhOQ0xFMUJRVklzUTBGQlpYWkNMRTFCUVUxRExFOUJRWEpDTEVOQlFWWTdRVUZEUkR0QlFVTkVMR0ZCUVU5QkxFOUJRVkE3UVVGRFJDeExRVXhOTEVWQlMwb3NSVUZNU1N4RFFVRlFPMEZCVFVRc1IwRnlSbk5DTzBGQmMwWjJRblZDTEhsQ1FYUkdkVUlzYlVOQmMwWkRMME1zVDBGMFJrUXNSVUZ6UmxVN1FVRkRMMElzVjBGQlR5eExRVUZMYjBNc2IwSkJRVXdzUTBGQk1FSXNTMEZCUzFNc2NVSkJRVXdzUTBGQk1rSTNReXhQUVVFelFpeERRVUV4UWl4RFFVRlFPMEZCUTBRc1IwRjRSbk5DT3p0QlFYbEdka0k3T3pzN096dEJRVTFCZDBNc05rSkJMMFoxUWl4MVEwRXJSa3N4UWl4TlFTOUdUQ3hGUVN0R1lYZENMRXRCTDBaaUxFVkJLMFp2UWp0QlFVTjZReXhSUVVGSkxFTkJRVU40UWl4UFFVRlBReXhWUVVGU0xFbEJRWE5DTEVOQlFVTkVMRTlCUVU5RExGVkJRVkFzUTBGQmEwSkRMRTFCUVRkRExFVkJRWEZFTzBGQlEyNUVNa0lzWTBGQlVVc3NTMEZCVWl4RFFVRmpMRGhDUVVGa0xFVkJRVGhEYkVNc1RVRkJPVU03UVVGRFFUdEJRVU5FTzBGQlEwUXNVVUZCVFVVc1UwRkJVM05DTEUxQlFVMVhMRTFCUVU0c1EwRkJZVzVETEU5QlFVOXZReXhEUVVGd1FpeEZRVUYxUW5CRExFOUJRVTl4UXl4RFFVRlFMRWRCUVZkeVF5eFBRVUZQU1N4TlFVRjZReXhGUVVGcFJFb3NUMEZCVDBNc1ZVRkJVQ3hEUVVGclFrTXNUVUZCYmtVc1EwRkJaanRCUVVOQlFTeFhRVUZQYjBNc1VVRkJVQ3hIUVVGclFqdEJRVU5vUWpWRUxGbEJRVTF6UWl4UFFVRlBkRUlzU1VGRVJ6dEJRVVZvUWpaRExGbEJRVTEyUWl4UFFVRlBkVUk3UVVGR1J5eExRVUZzUWp0QlFVbEJXaXhYUVVGUE5FSXNUVUZCVUN4RFFVRmpja01zVDBGQlQyOURMRkZCUVhKQ0xFVkJRU3RDZEVNc1QwRkJUME1zVlVGQmRFTTdRVUZEUVN4WFFVRlBReXhOUVVGUU8wRkJRMFE3UVVFelIzTkNMRU5CUVhwQ096dEJRVGhIUVN4bFFVRmxNVUlzWjBKQlFXWWlMQ0ptYVd4bElqb2lWR2xzWldSSmJuUmxjbkJ5WlhSbGNpNXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWk4cUtseHVJQ29nVFdWMGFHOWtjeUJtYjNJZ2FXNTBaWEp3Y21WMGFXNW5JRlJwYkdWa0lHMWhjQ0JrWVhSaElHbHVkRzhnZEdobElHZGhiV1ZjYmlBcUlHbHVkR1Z1WkdWa0lIUnZJR1Y0ZEdWdVpDQlFhR0Z6WlhJdVUzUmhkR1ZjYmlBcUwxeHVZMjl1YzNRZ1ZHbHNaV1JKYm5SbGNuQnlaWFJsY2lBOUlIdGNiaUFnY0hKbGJHOWhaRlJwYkdWdFlYQW9ibUZ0WlN3Z2FuTnZia3h2WTJGMGFXOXVLU0I3WEc0Z0lDQWdkR2hwY3k1c2IyRmtMbTl1Um1sc1pVTnZiWEJzWlhSbExtRmtaQ2dvY0hKdlozSmxjM01zSUd0bGVTa2dQVDRnZTF4dUlDQWdJQ0FnYVdZZ0tHdGxlU0E5UFQwZ2JtRnRaU2tnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMbkJ5Wld4dllXUlVhV3hsYldGd1FYTnpaWFJ6S0c1aGJXVXBPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMHBPMXh1SUNBZ0lIUm9hWE11Ykc5aFpDNTBhV3hsYldGd0tHNWhiV1VzSUdwemIyNU1iMk5oZEdsdmJpd2diblZzYkN3Z1VHaGhjMlZ5TGxScGJHVnRZWEF1VkVsTVJVUmZTbE5QVGlrN1hHNGdJSDBzWEc0Z0lIQnlaV3h2WVdSVWFXeGxiV0Z3UVhOelpYUnpLRzVoYldVcElIdGNiaUFnSUNCMGFHbHpMblJwYkdWdFlYQWdQU0IwYUdsekxtTmhZMmhsTG1kbGRGUnBiR1Z0WVhCRVlYUmhLRzVoYldVcE8xeHVJQ0FnSUM4dklHeHZZV1FnZEdsc1pYTmxkQ0JwYldGblpYTmNiaUFnSUNCMGFHbHpMblJwYkdWdFlYQXVaR0YwWVM1MGFXeGxjMlYwY3k1bWIzSkZZV05vS0hObGRDQTlQaUI3WEc0Z0lDQWdJQ0F2THlCVVQwUlBJSFJvYVhNZ2FYTWdZbUZ6WldRZ2IyNGdkR2hsSUhKbGJHRjBhWFpsSUhCaGRHaHpJR0ZzYkNCaVpXbHVaeUIwYnlCMGFHVWdZWE56WlhSeklHWnZiR1JsY2lCdmNpQnpiMjFsZEdocGJtZGNiaUFnSUNBZ0lIUm9hWE11Ykc5aFpDNXBiV0ZuWlNoelpYUXVibUZ0WlN3Z1lDOWhjM05sZEhNdkpIdHpaWFF1YVcxaFoyVXVjbVZ3YkdGalpTZ3ZLRnhjTGx4Y0xseGNMeWtyTHl3Z0p5Y3BmV0FwTzF4dUlDQWdJSDBwTzF4dUlDQWdJQzh2SUd4dllXUWdiMkpxWldOMElITndjbWwwWlhOY2JpQWdJQ0IwYUdsekxtZGxkRk53Y21sMFpYTkdjbTl0Vkdsc1pXMWhjQ2gwYUdsekxuUnBiR1Z0WVhBcExtWnZja1ZoWTJnb2IySnFaV04wSUQwK0lIdGNiaUFnSUNBZ0lIUm9hWE11Ykc5aFpDNXpjSEpwZEdWemFHVmxkQ2hjYmlBZ0lDQWdJQ0FnYjJKcVpXTjBMbkJ5YjNCbGNuUnBaWE11YzNCeWFYUmxMRnh1SUNBZ0lDQWdJQ0JnTDJGemMyVjBjeThrZTI5aWFtVmpkQzV3Y205d1pYSjBhV1Z6TG5Od2NtbDBaUzV5WlhCc1lXTmxLQzhvWEZ3dVhGd3VYRnd2S1NzdkxDQW5KeWw5WUN4Y2JpQWdJQ0FnSUNBZ2IySnFaV04wTG5kcFpIUm9MRnh1SUNBZ0lDQWdJQ0J2WW1wbFkzUXVhR1ZwWjJoMFhHNGdJQ0FnSUNBcE8xeHVJQ0FnSUgwcE8xeHVJQ0I5TEZ4dUlDQm5aWFJUY0hKcGRHVnpSbkp2YlZScGJHVnRZWEFvZEdsc1pXMWhjQ2tnZTF4dUlDQWdJR052Ym5OMElHOWlhbVZqZEhOQ2VWTndjbWwwWlUxaGNDQTlJSFJwYkdWdFlYQXVaR0YwWVM1c1lYbGxjbk11Y21Wa2RXTmxLQ2h2WW1wbFkzUnpRbmxUY0hKcGRHVXNJR3hoZVdWeUtTQTlQaUI3WEc0Z0lDQWdJQ0JwWmlBb2JHRjVaWEl1YjJKcVpXTjBjeWtnZTF4dUlDQWdJQ0FnSUNCc1lYbGxjaTV2WW1wbFkzUnpMbVp2Y2tWaFkyZ29iMkpxWldOMElEMCtJSHRjYmlBZ0lDQWdJQ0FnSUNCcFppQW9iMkpxWldOMExuQnliM0JsY25ScFpYTWdKaVlnYjJKcVpXTjBMbkJ5YjNCbGNuUnBaWE11YzNCeWFYUmxJQ1ltSUNGdlltcGxZM1J6UW5sVGNISnBkR1ZiYjJKcVpXTjBMbkJ5YjNCbGNuUnBaWE11YzNCeWFYUmxYU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdiMkpxWldOMGMwSjVVM0J5YVhSbFcyOWlhbVZqZEM1d2NtOXdaWEowYVdWekxuTndjbWwwWlYwZ1BTQnZZbXBsWTNRN1hHNGdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0I5S1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0FnSUhKbGRIVnliaUJ2WW1wbFkzUnpRbmxUY0hKcGRHVTdYRzRnSUNBZ2ZTd2dlMzBwTzF4dUlDQWdJSEpsZEhWeWJpQlBZbXBsWTNRdWEyVjVjeWh2WW1wbFkzUnpRbmxUY0hKcGRHVk5ZWEFwTG0xaGNDaHJaWGtnUFQ0Z2IySnFaV04wYzBKNVUzQnlhWFJsVFdGd1cydGxlVjBwTzF4dUlDQjlMRnh1SUNCamNtVmhkR1ZVYVd4bGJXRndLRzVoYldVcElIdGNiaUFnSUNCamIyNXpkQ0J0WVhBZ1BTQjBhR2x6TG1kaGJXVXVZV1JrTG5ScGJHVnRZWEFvYm1GdFpTazdYRzRnSUNBZ2RHaHBjeTUwYVd4bGJXRndMbVJoZEdFdWRHbHNaWE5sZEhNdVptOXlSV0ZqYUNoelpYUWdQVDRnZTF4dUlDQWdJQ0FnYldGd0xtRmtaRlJwYkdWelpYUkpiV0ZuWlNoY2JpQWdJQ0FnSUNBZ2MyVjBMbTVoYldVc1hHNGdJQ0FnSUNBZ0lITmxkQzV1WVcxbExGeHVJQ0FnSUNBZ0lDQnpaWFF1ZEdsc1pYZHBaSFJvTEZ4dUlDQWdJQ0FnSUNCelpYUXVkR2xzWldobGFXZG9kRnh1SUNBZ0lDQWdLVHRjYmlBZ0lDQjlLVHRjYmx4dUlDQWdJSEpsZEhWeWJpQnRZWEE3WEc0Z0lIMHNYRzRnSUdsdWFYUnBZWFJsVkdsc1pXUlBZbXBsWTNSSGNtOTFjSE1vYldGd0tTQjdYRzRnSUNBZ0x5OGdWRTlFVHlCdVpXVmtJRzF2Y21VZ1pHRjBZU0JoWW05MWRDQnZZbXBsWTNSekwyVnVkR2wwYVdWeklHbHVJSFJwYkdWa0lHRnVaQ0JqYjNKeVpYTndiMjVrYVc1blhHNGdJQ0FnTHk4Z1kyeGhjM05sY3lCcGJpQm5ZVzFsSUdOdlpHVWdkRzhnYUdGdVpHeGxJSFJvYVhNZ1lYVjBiMjFoWjJsallXeHNlVnh1SUNBZ0lDOHZJSE5sWlNCVWFXeGxaRXhsZG1Wc1UzUmhkR1V1WTNKbFlYUmxJR1p2Y2lCdFlXNTFZV3dnYVcxd2JHVnRaVzUwWVhScGIyNWNiaUFnSUNCamIyNXpkQ0JuY205MWNITWdQU0I3ZlR0Y2JpQWdJQ0JqYjI1emRDQnZZbXBsWTNSelFubFVlWEJsSUQwZ2RHaHBjeTVoY25KaGJtZGxUMkpxWldOMGMwSjVWSGx3WlNodFlYQXViMkpxWldOMGN5azdYRzRnSUNBZ1QySnFaV04wTG10bGVYTW9iMkpxWldOMGMwSjVWSGx3WlNrdVptOXlSV0ZqYUNoMGVYQmxJRDArSUh0Y2JpQWdJQ0FnSUdkeWIzVndjMXQwZVhCbFhTQTlJSFJvYVhNdVoyRnRaUzVoWkdRdVozSnZkWEFvS1R0Y2JpQWdJQ0FnSUdkeWIzVndjMXQwZVhCbFhTNWxibUZpYkdWQ2IyUjVJRDBnZEhKMVpUdGNiaUFnSUNBZ0lHOWlhbVZqZEhOQ2VWUjVjR1ZiZEhsd1pWMHVabTl5UldGamFDaHBkR1Z0SUQwK0lIUm9hWE11WTNKbFlYUmxVM0J5YVhSbFJuSnZiVlJwYkdWa1QySnFaV04wS0dsMFpXMHNJR2R5YjNWd2MxdDBlWEJsWFNrcE8xeHVJQ0FnSUgwcE8xeHVJQ0FnSUhKbGRIVnliaUJuY205MWNITTdYRzRnSUgwc1hHNGdJR0Z5Y21GdVoyVlBZbXBsWTNSelFubFVlWEJsS0c5aWFtVmpkSE1wSUh0Y2JpQWdJQ0J5WlhSMWNtNGdiMkpxWldOMGN5NXlaV1IxWTJVb0tHOWlhbVZqZEhNc0lHOWlhbVZqZENrZ1BUNGdlMXh1SUNBZ0lDQWdhV1lnS0c5aWFtVmpkQzUwZVhCbEtTQjdYRzRnSUNBZ0lDQWdJR2xtSUNnaGIySnFaV04wYzF0dlltcGxZM1F1ZEhsd1pWMHBJSHRjYmlBZ0lDQWdJQ0FnSUNCdlltcGxZM1J6VzI5aWFtVmpkQzUwZVhCbFhTQTlJRnRkTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lHOWlhbVZqZEhOYmIySnFaV04wTG5SNWNHVmRMbkIxYzJnb2IySnFaV04wS1R0Y2JpQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUdOdmJuTnZiR1V1ZDJGeWJpZ25iMkpxWldOMElHWnZkVzVrSUhkcGRHaHZkWFFnZEhsd1pTY3NJRzlpYW1WamRDNXVZVzFsTENCdlltcGxZM1FwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJQ0FnY21WMGRYSnVJRzlpYW1WamRITTdYRzRnSUNBZ2ZTd2dlMzBwTzF4dUlDQjlMRnh1SUNCblpYUlBZbXBsWTNSelJuSnZiVlJwYkdWdFlYQW9kR2xzWlcxaGNDa2dlMXh1SUNBZ0lISmxkSFZ5YmlCMGFXeGxiV0Z3TG1SaGRHRXViR0Y1WlhKekxuSmxaSFZqWlNnb2IySnFaV04wY3l3Z2JHRjVaWElwSUQwK0lIdGNiaUFnSUNBZ0lHbG1JQ2hzWVhsbGNpNXZZbXBsWTNSektTQjdYRzRnSUNBZ0lDQWdJRzlpYW1WamRITWdQU0J2WW1wbFkzUnpMbU52Ym1OaGRDaHNZWGxsY2k1dlltcGxZM1J6S1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0FnSUhKbGRIVnliaUJ2WW1wbFkzUnpPMXh1SUNBZ0lIMHNJRnRkS1R0Y2JpQWdmU3hjYmlBZ1oyVjBWR2xzWlcxaGNFOWlhbVZqZEhOQ2VWUjVjR1VvZEdsc1pXMWhjQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQjBhR2x6TG1GeWNtRnVaMlZQWW1wbFkzUnpRbmxVZVhCbEtIUm9hWE11WjJWMFQySnFaV04wYzBaeWIyMVVhV3hsYldGd0tIUnBiR1Z0WVhBcEtUdGNiaUFnZlN4Y2JpQWdMeW9xWEc0Z0lDQXFJRU55WldGMFpYTWdZU0JRYUdGelpYSWdjM0J5YVhSbElHbHVJR0VnYzNCeWFYUmxJR2R5YjNWd0lHWnliMjBnWVNCVWFXeGxaQ0J2WW1wbFkzUmNiaUFnSUNvZ1FIQmhjbUZ0SUNCN2IySnFaV04wZlNCdlltcGxZM1FnVkdobElGUnBiR1ZrSUc5aWFtVmpkRnh1SUNBZ0tpQkFjR0Z5WVcwZ0lIdG5jbTkxY0gwZ1ozSnZkWEFnSUNCVWFHVWdVR2hoYzJWeUlITndjbWwwWlNCbmNtOTFjRnh1SUNBZ0tpQkFjbVYwZFhKdUlIdFRjSEpwZEdWOUlDQWdJQ0FnSUNCVWFHVWdVR2hoYzJWeUlITndjbWwwWlZ4dUlDQWdLaTljYmlBZ1kzSmxZWFJsVTNCeWFYUmxSbkp2YlZScGJHVmtUMkpxWldOMEtHOWlhbVZqZEN3Z1ozSnZkWEFwSUh0Y2JpQWdJQ0JwWmlBb0lXOWlhbVZqZEM1d2NtOXdaWEowYVdWeklIeDhJQ0Z2WW1wbFkzUXVjSEp2Y0dWeWRHbGxjeTV6Y0hKcGRHVXBJSHRjYmlBZ0lDQWdJR052Ym5OdmJHVXVaWEp5YjNJb0oyNXZJSE53Y21sMFpTQmtaV1pwYm1Wa0lHWnZjaUJ2WW1wbFkzUW5MQ0J2WW1wbFkzUXBPMXh1SUNBZ0lDQWdjbVYwZFhKdU8xeHVJQ0FnSUgxY2JpQWdJQ0JqYjI1emRDQnpjSEpwZEdVZ1BTQm5jbTkxY0M1amNtVmhkR1VvYjJKcVpXTjBMbmdzSUc5aWFtVmpkQzU1SUMwZ2IySnFaV04wTG1obGFXZG9kQ3dnYjJKcVpXTjBMbkJ5YjNCbGNuUnBaWE11YzNCeWFYUmxLVHRjYmlBZ0lDQnpjSEpwZEdVdVoyRnRaVVJoZEdFZ1BTQjdYRzRnSUNBZ0lDQnVZVzFsT2lCdlltcGxZM1F1Ym1GdFpTeGNiaUFnSUNBZ0lIUjVjR1U2SUc5aWFtVmpkQzUwZVhCbFhHNGdJQ0FnZlR0Y2JpQWdJQ0JQWW1wbFkzUXVZWE56YVdkdUtITndjbWwwWlM1bllXMWxSR0YwWVN3Z2IySnFaV04wTG5CeWIzQmxjblJwWlhNcE8xeHVJQ0FnSUhKbGRIVnliaUJ6Y0hKcGRHVTdYRzRnSUgxY2JuMDdYRzVjYm1WNGNHOXlkQ0JrWldaaGRXeDBJRlJwYkdWa1NXNTBaWEp3Y21WMFpYSTdYRzRpWFgwPSIsImV4cG9ydCBmdW5jdGlvbiB0ZWxsUGxheWVyKGRhdGEpIHtcbiAgY29uc29sZS5sb2coJ/Cfk5wnLCBkYXRhLm1lc3NhZ2UpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29sbGVjdChlbnRpdHksIGl0ZW0pIHtcbiAgaWYgKCFlbnRpdHkuaW52ZW50b3J5KSB7XG4gICAgZW50aXR5LmludmVudG9yeSA9IFtdO1xuICB9XG4gIGVudGl0eS5pbnZlbnRvcnkucHVzaChpdGVtLmdhbWVEYXRhKTtcbiAgdGVsbFBsYXllcih7IG1lc3NhZ2U6ICdZb3UgY29sbGVjdGVkIHRoZSAnICsgaXRlbS5nYW1lRGF0YS5kaXNwbGF5TmFtZSB9KTtcbiAgaXRlbS5kZXN0cm95KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25zdW1lKGVudGl0eSwgaXRlbSkge1xuICB0ZWxsUGxheWVyKHsgbWVzc2FnZTogJ1lvdSBjb25zdW1lZCB0aGUgJyArIGl0ZW0uZ2FtZURhdGEuZGlzcGxheU5hbWUgfSk7XG4gIGl0ZW0uZGVzdHJveSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24ga25vY2tEb29yKGVudGl0eSwgZG9vcikge1xuICBpZiAoIWRvb3IuZ2FtZURhdGEgfHwgIWRvb3IuZ2FtZURhdGEua2V5KSB7XG4gICAgY29uc29sZS53YXJuKCdkb29yICcgKyBkb29yLmdhbWVEYXRhLm5hbWUgKyAnIGRvZXNuXFwndCBoYXZlIG5vIGRhbW4gS0VZJywgZG9vcik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGVudGl0eS5pbnZlbnRvcnkpIHtcbiAgICB2YXIgaXRlbSA9IGVudGl0eS5pbnZlbnRvcnkuZmluZChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIGl0ZW0udHlwZSA9PT0gJ0tleScgJiYgaXRlbS5pZCA9PT0gZG9vci5nYW1lRGF0YS5rZXk7XG4gICAgfSk7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGRvb3IuZGVzdHJveSgpO1xuICAgICAgdGVsbFBsYXllcih7IG1lc3NhZ2U6ICd5b3UgdXNlZCB0aGUgJyArIGl0ZW0uZGlzcGxheU5hbWUgKyAnIGtleSBvbiB0aGUgZG9vciBhbmQgaXQgb3BlbmVkJyB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgdGVsbFBsYXllcih7IG1lc3NhZ2U6ICduZWVkIHNvbWUga2V5IGZvciB0aGlzIGRvb3IgaWRpb3QnIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2F0ZUNhbk9wZW4oZ2F0ZSkge1xuICByZXR1cm4gZ2F0ZS5nYW1lRGF0YS5vcGVuRGlyZWN0aW9uID09PSAnbm9ydGgnICYmIGdhdGUuYm9keS50b3VjaGluZy51cCB8fCBnYXRlLmdhbWVEYXRhLm9wZW5EaXJlY3Rpb24gPT09ICdzb3V0aCcgJiYgZ2F0ZS5ib2R5LnRvdWNoaW5nLmRvd24gfHwgZ2F0ZS5nYW1lRGF0YS5vcGVuRGlyZWN0aW9uID09PSAnd2VzdCcgJiYgZ2F0ZS5ib2R5LnRvdWNoaW5nLmxlZnQgfHwgZ2F0ZS5nYW1lRGF0YS5vcGVuRGlyZWN0aW9uID09PSAnZWFzdCcgJiYgZ2F0ZS5ib2R5LnRvdWNoaW5nLnJpZ2h0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24ga25vY2tHYXRlKGVudGl0eSwgZ2F0ZSkge1xuICBpZiAoIWdhdGUuZ2FtZURhdGEgfHwgIWdhdGUuZ2FtZURhdGEub3BlbkRpcmVjdGlvbikge1xuICAgIGNvbnNvbGUud2FybignZ2F0ZSAnICsgZ2F0ZS5nYW1lRGF0YS5uYW1lICsgJyBhaW5cXCd0IGdvdCBubyBvcGVuRGlyZWN0aW9uJywgZ2F0ZSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChnYXRlQ2FuT3BlbihnYXRlKSkge1xuICAgIGdhdGUuZGVzdHJveSgpO1xuICAgIHRlbGxQbGF5ZXIoeyBtZXNzYWdlOiAndGhlIGdhdGUgaGFzIGEgaGFuZGxlIG9uIHRoaXMgc2lkZSwgeW91IG9wZW5lZCBpdCcgfSk7XG4gIH0gZWxzZSB7XG4gICAgdGVsbFBsYXllcih7IG1lc3NhZ2U6ICd0aGUgZ2F0ZSBkb2VzIG5vdCBvcGVuIGZyb20gdGhpcyBzaWRlJyB9KTtcbiAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUwzTnlZeTl6WTNKcGNIUnpMMlZ1WjJsdVpTOXBiblJsY21GamRHbHZibk11YW5NaVhTd2libUZ0WlhNaU9sc2lkR1ZzYkZCc1lYbGxjaUlzSW1SaGRHRWlMQ0pqYjI1emIyeGxJaXdpYkc5bklpd2liV1Z6YzJGblpTSXNJbU52Ykd4bFkzUWlMQ0psYm5ScGRIa2lMQ0pwZEdWdElpd2lhVzUyWlc1MGIzSjVJaXdpY0hWemFDSXNJbWRoYldWRVlYUmhJaXdpWkdsemNHeGhlVTVoYldVaUxDSmtaWE4wY205NUlpd2lZMjl1YzNWdFpTSXNJbXR1YjJOclJHOXZjaUlzSW1SdmIzSWlMQ0pyWlhraUxDSjNZWEp1SWl3aWJtRnRaU0lzSW1acGJtUWlMQ0owZVhCbElpd2lhV1FpTENKbllYUmxRMkZ1VDNCbGJpSXNJbWRoZEdVaUxDSnZjR1Z1UkdseVpXTjBhVzl1SWl3aVltOWtlU0lzSW5SdmRXTm9hVzVuSWl3aWRYQWlMQ0prYjNkdUlpd2liR1ZtZENJc0luSnBaMmgwSWl3aWEyNXZZMnRIWVhSbElsMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFTeFBRVUZQTEZOQlFWTkJMRlZCUVZRc1EwRkJiMEpETEVsQlFYQkNMRVZCUVRCQ08wRkJReTlDUXl4VlFVRlJReXhIUVVGU0xFTkJRVmtzU1VGQldpeEZRVUZyUWtZc1MwRkJTMGNzVDBGQmRrSTdRVUZEUkRzN1FVRkZSQ3hQUVVGUExGTkJRVk5ETEU5QlFWUXNRMEZCYVVKRExFMUJRV3BDTEVWQlFYbENReXhKUVVGNlFpeEZRVUVyUWp0QlFVTndReXhOUVVGSkxFTkJRVU5FTEU5QlFVOUZMRk5CUVZvc1JVRkJkVUk3UVVGRGNrSkdMRmRCUVU5RkxGTkJRVkFzUjBGQmJVSXNSVUZCYmtJN1FVRkRSRHRCUVVORVJpeFRRVUZQUlN4VFFVRlFMRU5CUVdsQ1F5eEpRVUZxUWl4RFFVRnpRa1lzUzBGQlMwY3NVVUZCTTBJN1FVRkRRVllzWVVGQlZ5eEZRVUZGU1N4blEwRkJPRUpITEV0QlFVdEhMRkZCUVV3c1EwRkJZME1zVjBGQk9VTXNSVUZCV0R0QlFVTkJTaXhQUVVGTFN5eFBRVUZNTzBGQlEwUTdPMEZCUlVRc1QwRkJUeXhUUVVGVFF5eFBRVUZVTEVOQlFXbENVQ3hOUVVGcVFpeEZRVUY1UWtNc1NVRkJla0lzUlVGQkswSTdRVUZEY0VOUUxHRkJRVmNzUlVGQlJVa3NLMEpCUVRaQ1J5eExRVUZMUnl4UlFVRk1MRU5CUVdORExGZEJRVGRETEVWQlFWZzdRVUZEUVVvc1QwRkJTMHNzVDBGQlREdEJRVU5FT3p0QlFVVkVMRTlCUVU4c1UwRkJVMFVzVTBGQlZDeERRVUZ0UWxJc1RVRkJia0lzUlVGQk1rSlRMRWxCUVROQ0xFVkJRV2xETzBGQlEzUkRMRTFCUVVrc1EwRkJRMEVzUzBGQlMwd3NVVUZCVGl4SlFVRnJRaXhEUVVGRFN5eExRVUZMVEN4UlFVRk1MRU5CUVdOTkxFZEJRWEpETEVWQlFUQkRPMEZCUTNoRFpDeFpRVUZSWlN4SlFVRlNMRmRCUVhGQ1JpeExRVUZMVEN4UlFVRk1MRU5CUVdOUkxFbEJRVzVETEdsRFFVRnZSVWdzU1VGQmNFVTdRVUZEUVR0QlFVTkVPenRCUVVWRUxFMUJRVWxVTEU5QlFVOUZMRk5CUVZnc1JVRkJjMEk3UVVGRGNFSXNVVUZCVFVRc1QwRkJUMFFzVDBGQlQwVXNVMEZCVUN4RFFVRnBRbGNzU1VGQmFrSXNRMEZEV0R0QlFVRkJMR0ZCUVZGYUxFdEJRVXRoTEVsQlFVd3NTMEZCWXl4TFFVRmtMRWxCUVhWQ1lpeExRVUZMWXl4RlFVRk1MRXRCUVZsT0xFdEJRVXRNTEZGQlFVd3NRMEZCWTAwc1IwRkJla1E3UVVGQlFTeExRVVJYTEVOQlFXSTdRVUZIUVN4UlFVRkpWQ3hKUVVGS0xFVkJRVlU3UVVGRFVsRXNWMEZCUzBnc1QwRkJURHRCUVVOQldpeHBRa0ZCVnl4RlFVRkZTU3d5UWtGQmVVSkhMRXRCUVV0SkxGZEJRVGxDTEcxRFFVRkdMRVZCUVZnN1FVRkRRVHRCUVVORU8wRkJRMFk3UVVGRFJGZ3NZVUZCVnl4RlFVRkZTU3hUUVVGVExHMURRVUZZTEVWQlFWZzdRVUZEUkRzN1FVRkZSQ3hQUVVGUExGTkJRVk5yUWl4WFFVRlVMRU5CUVhGQ1F5eEpRVUZ5UWl4RlFVRXlRanRCUVVOb1F5eFRRVU5GUVN4TFFVRkxZaXhSUVVGTUxFTkJRV05qTEdGQlFXUXNTMEZCWjBNc1QwRkJhRU1zU1VGQk1rTkVMRXRCUVV0RkxFbEJRVXdzUTBGQlZVTXNVVUZCVml4RFFVRnRRa01zUlVGQk9VUXNTVUZEUjBvc1MwRkJTMklzVVVGQlRDeERRVUZqWXl4aFFVRmtMRXRCUVdkRExFOUJRV2hETEVsQlFUSkRSQ3hMUVVGTFJTeEpRVUZNTEVOQlFWVkRMRkZCUVZZc1EwRkJiVUpGTEVsQlJHcEZMRWxCUlVkTUxFdEJRVXRpTEZGQlFVd3NRMEZCWTJNc1lVRkJaQ3hMUVVGblF5eE5RVUZvUXl4SlFVRXdRMFFzUzBGQlMwVXNTVUZCVEN4RFFVRlZReXhSUVVGV0xFTkJRVzFDUnl4SlFVWm9SU3hKUVVkSFRpeExRVUZMWWl4UlFVRk1MRU5CUVdOakxHRkJRV1FzUzBGQlowTXNUVUZCYUVNc1NVRkJNRU5FTEV0QlFVdEZMRWxCUVV3c1EwRkJWVU1zVVVGQlZpeERRVUZ0UWtrc1MwRktiRVU3UVVGTlJEczdRVUZGUkN4UFFVRlBMRk5CUVZORExGTkJRVlFzUTBGQmJVSjZRaXhOUVVGdVFpeEZRVUV5UW1sQ0xFbEJRVE5DTEVWQlFXbERPMEZCUTNSRExFMUJRVWtzUTBGQlEwRXNTMEZCUzJJc1VVRkJUaXhKUVVGclFpeERRVUZEWVN4TFFVRkxZaXhSUVVGTUxFTkJRV05qTEdGQlFYSkRMRVZCUVc5RU8wRkJRMnhFZEVJc1dVRkJVV1VzU1VGQlVpeFhRVUZ4UWswc1MwRkJTMklzVVVGQlRDeERRVUZqVVN4SlFVRnVReXh0UTBGQmMwVkxMRWxCUVhSRk8wRkJRMEU3UVVGRFJEdEJRVU5FTEUxQlFVbEVMRmxCUVZsRExFbEJRVm9zUTBGQlNpeEZRVUYxUWp0QlFVTnlRa0VzVTBGQlMxZ3NUMEZCVER0QlFVTkJXaXhsUVVGWExFVkJRVVZKTEZOQlFWTXNiVVJCUVZnc1JVRkJXRHRCUVVORUxFZEJTRVFzVFVGSFR6dEJRVU5NU2l4bFFVRlhMRVZCUVVWSkxGTkJRVk1zZFVOQlFWZ3NSVUZCV0R0QlFVTkVPMEZCUTBZaUxDSm1hV3hsSWpvaWFXNTBaWEpoWTNScGIyNXpMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaVpYaHdiM0owSUdaMWJtTjBhVzl1SUhSbGJHeFFiR0Y1WlhJb1pHRjBZU2tnZTF4dUlDQmpiMjV6YjJ4bExteHZaeWduOEorVG5DY3NJR1JoZEdFdWJXVnpjMkZuWlNrN1hHNTlYRzVjYm1WNGNHOXlkQ0JtZFc1amRHbHZiaUJqYjJ4c1pXTjBLR1Z1ZEdsMGVTd2dhWFJsYlNrZ2UxeHVJQ0JwWmlBb0lXVnVkR2wwZVM1cGJuWmxiblJ2Y25rcElIdGNiaUFnSUNCbGJuUnBkSGt1YVc1MlpXNTBiM0o1SUQwZ1cxMDdYRzRnSUgxY2JpQWdaVzUwYVhSNUxtbHVkbVZ1ZEc5eWVTNXdkWE5vS0dsMFpXMHVaMkZ0WlVSaGRHRXBPMXh1SUNCMFpXeHNVR3hoZVdWeUtIc2diV1Z6YzJGblpUb2dZRmx2ZFNCamIyeHNaV04wWldRZ2RHaGxJQ1I3YVhSbGJTNW5ZVzFsUkdGMFlTNWthWE53YkdGNVRtRnRaWDFnSUgwcE8xeHVJQ0JwZEdWdExtUmxjM1J5YjNrb0tUdGNibjFjYmx4dVpYaHdiM0owSUdaMWJtTjBhVzl1SUdOdmJuTjFiV1VvWlc1MGFYUjVMQ0JwZEdWdEtTQjdYRzRnSUhSbGJHeFFiR0Y1WlhJb2V5QnRaWE56WVdkbE9pQmdXVzkxSUdOdmJuTjFiV1ZrSUhSb1pTQWtlMmwwWlcwdVoyRnRaVVJoZEdFdVpHbHpjR3hoZVU1aGJXVjlZQ0I5S1R0Y2JpQWdhWFJsYlM1a1pYTjBjbTk1S0NrN1hHNTlYRzVjYm1WNGNHOXlkQ0JtZFc1amRHbHZiaUJyYm05amEwUnZiM0lvWlc1MGFYUjVMQ0JrYjI5eUtTQjdYRzRnSUdsbUlDZ2haRzl2Y2k1bllXMWxSR0YwWVNCOGZDQWhaRzl2Y2k1bllXMWxSR0YwWVM1clpYa3BJSHRjYmlBZ0lDQmpiMjV6YjJ4bExuZGhjbTRvWUdSdmIzSWdKSHRrYjI5eUxtZGhiV1ZFWVhSaExtNWhiV1Y5SUdSdlpYTnVKM1FnYUdGMlpTQnVieUJrWVcxdUlFdEZXV0FzSUdSdmIzSXBPMXh1SUNBZ0lISmxkSFZ5Ymp0Y2JpQWdmVnh1WEc0Z0lHbG1JQ2hsYm5ScGRIa3VhVzUyWlc1MGIzSjVLU0I3WEc0Z0lDQWdZMjl1YzNRZ2FYUmxiU0E5SUdWdWRHbDBlUzVwYm5abGJuUnZjbmt1Wm1sdVpDaGNiaUFnSUNBZ0lHbDBaVzBnUFQ0Z2FYUmxiUzUwZVhCbElEMDlQU0FuUzJWNUp5QW1KaUJwZEdWdExtbGtJRDA5UFNCa2IyOXlMbWRoYldWRVlYUmhMbXRsZVZ4dUlDQWdJQ2s3WEc0Z0lDQWdhV1lnS0dsMFpXMHBJSHRjYmlBZ0lDQWdJR1J2YjNJdVpHVnpkSEp2ZVNncE8xeHVJQ0FnSUNBZ2RHVnNiRkJzWVhsbGNpaDdJRzFsYzNOaFoyVTZJR0I1YjNVZ2RYTmxaQ0IwYUdVZ0pIdHBkR1Z0TG1ScGMzQnNZWGxPWVcxbGZTQnJaWGtnYjI0Z2RHaGxJR1J2YjNJZ1lXNWtJR2wwSUc5d1pXNWxaR0FnZlNrN1hHNGdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdmVnh1SUNCOVhHNGdJSFJsYkd4UWJHRjVaWElvZXlCdFpYTnpZV2RsT2lBbmJtVmxaQ0J6YjIxbElHdGxlU0JtYjNJZ2RHaHBjeUJrYjI5eUlHbGthVzkwSnlCOUtUdGNibjFjYmx4dVpYaHdiM0owSUdaMWJtTjBhVzl1SUdkaGRHVkRZVzVQY0dWdUtHZGhkR1VwSUh0Y2JpQWdjbVYwZFhKdUlDaGNiaUFnSUNCbllYUmxMbWRoYldWRVlYUmhMbTl3Wlc1RWFYSmxZM1JwYjI0Z1BUMDlJQ2R1YjNKMGFDY2dKaVlnWjJGMFpTNWliMlI1TG5SdmRXTm9hVzVuTG5Wd1hHNGdJQ0FnZkh3Z1oyRjBaUzVuWVcxbFJHRjBZUzV2Y0dWdVJHbHlaV04wYVc5dUlEMDlQU0FuYzI5MWRHZ25JQ1ltSUdkaGRHVXVZbTlrZVM1MGIzVmphR2x1Wnk1a2IzZHVYRzRnSUNBZ2ZId2daMkYwWlM1bllXMWxSR0YwWVM1dmNHVnVSR2x5WldOMGFXOXVJRDA5UFNBbmQyVnpkQ2NnSmlZZ1oyRjBaUzVpYjJSNUxuUnZkV05vYVc1bkxteGxablJjYmlBZ0lDQjhmQ0JuWVhSbExtZGhiV1ZFWVhSaExtOXdaVzVFYVhKbFkzUnBiMjRnUFQwOUlDZGxZWE4wSnlBbUppQm5ZWFJsTG1KdlpIa3VkRzkxWTJocGJtY3VjbWxuYUhSY2JpQWdLVHRjYm4xY2JseHVaWGh3YjNKMElHWjFibU4wYVc5dUlHdHViMk5yUjJGMFpTaGxiblJwZEhrc0lHZGhkR1VwSUh0Y2JpQWdhV1lnS0NGbllYUmxMbWRoYldWRVlYUmhJSHg4SUNGbllYUmxMbWRoYldWRVlYUmhMbTl3Wlc1RWFYSmxZM1JwYjI0cElIdGNiaUFnSUNCamIyNXpiMnhsTG5kaGNtNG9ZR2RoZEdVZ0pIdG5ZWFJsTG1kaGJXVkVZWFJoTG01aGJXVjlJR0ZwYmlkMElHZHZkQ0J1YnlCdmNHVnVSR2x5WldOMGFXOXVZQ3dnWjJGMFpTazdYRzRnSUNBZ2NtVjBkWEp1TzF4dUlDQjlYRzRnSUdsbUlDaG5ZWFJsUTJGdVQzQmxiaWhuWVhSbEtTa2dlMXh1SUNBZ0lHZGhkR1V1WkdWemRISnZlU2dwTzF4dUlDQWdJSFJsYkd4UWJHRjVaWElvZXlCdFpYTnpZV2RsT2lBbmRHaGxJR2RoZEdVZ2FHRnpJR0VnYUdGdVpHeGxJRzl1SUhSb2FYTWdjMmxrWlN3Z2VXOTFJRzl3Wlc1bFpDQnBkQ2NnZlNrN1hHNGdJSDBnWld4elpTQjdYRzRnSUNBZ2RHVnNiRkJzWVhsbGNpaDdJRzFsYzNOaFoyVTZJQ2QwYUdVZ1oyRjBaU0JrYjJWeklHNXZkQ0J2Y0dWdUlHWnliMjBnZEdocGN5QnphV1JsSnlCOUtUdGNiaUFnZlZ4dWZWeHVJbDE5IiwidmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5pbXBvcnQgVGlsZWRJbnRlcnByZXRlciBmcm9tICcuL1RpbGVkSW50ZXJwcmV0ZXInO1xuaW1wb3J0IHsgY29sbGVjdCwgY29uc3VtZSwga25vY2tEb29yLCBrbm9ja0dhdGUgfSBmcm9tICcuL2ludGVyYWN0aW9ucyc7XG5cbi8qKlxuICogRXh0ZW5kIHRoaXMgaW5zdGVhZCBvZiBQaGFzZXIuU3RhdGUgdG8gaGFuZGxlIGEgVGlsZWQgbGV2ZWxcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cblxudmFyIFRpbGVkTGV2ZWxTdGF0ZSA9IGZ1bmN0aW9uIChfUGhhc2VyJFN0YXRlKSB7XG4gIF9pbmhlcml0cyhUaWxlZExldmVsU3RhdGUsIF9QaGFzZXIkU3RhdGUpO1xuXG4gIGZ1bmN0aW9uIFRpbGVkTGV2ZWxTdGF0ZSgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVGlsZWRMZXZlbFN0YXRlKTtcblxuICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoVGlsZWRMZXZlbFN0YXRlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoVGlsZWRMZXZlbFN0YXRlKSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoVGlsZWRMZXZlbFN0YXRlLCBbe1xuICAgIGtleTogJ2luaXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KF9yZWYpIHtcbiAgICAgIHZhciBtYXBQYXRoID0gX3JlZi5tYXBQYXRoO1xuXG4gICAgICB0aGlzLnRpbGVkTGV2ZWwgPSB7XG4gICAgICAgIG1hcFBhdGg6IG1hcFBhdGgsXG4gICAgICAgIG1hcE5hbWU6IG1hcFBhdGhcbiAgICAgIH07XG5cbiAgICAgIFBoYXNlci5DYW52YXMuc2V0SW1hZ2VSZW5kZXJpbmdDcmlzcCh0aGlzLmdhbWUuY2FudmFzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdwcmVsb2FkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcHJlbG9hZCgpIHtcbiAgICAgIHZhciBfdGlsZWRMZXZlbCA9IHRoaXMudGlsZWRMZXZlbCxcbiAgICAgICAgICBtYXBOYW1lID0gX3RpbGVkTGV2ZWwubWFwTmFtZSxcbiAgICAgICAgICBtYXBQYXRoID0gX3RpbGVkTGV2ZWwubWFwUGF0aDtcblxuICAgICAgdGhpcy5wcmVsb2FkVGlsZW1hcChtYXBOYW1lLCBtYXBQYXRoLCBudWxsLCBQaGFzZXIuVGlsZW1hcC5USUxFRF9KU09OKTtcbiAgICAgIHRoaXMubG9hZC5zcHJpdGVzaGVldCgncGxheWVyJywgJy9hc3NldHMvc3ByaXRlcy9kb2cuZ2lmJywgMjQsIDE2KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjcmVhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIG1hcE5hbWUgPSB0aGlzLnRpbGVkTGV2ZWwubWFwTmFtZTtcblxuICAgICAgdGhpcy5nYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjMDAwJztcbiAgICAgIHRoaXMuc2NhbGUuc2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5TSE9XX0FMTDtcbiAgICAgIC8vIGhhdmUgdGhlIGdhbWUgY2VudGVyZWQgb24gc2NyZWVuXG4gICAgICB0aGlzLnNjYWxlLnBhZ2VBbGlnbkhvcml6b250YWxseSA9IHRydWU7XG4gICAgICB0aGlzLnNjYWxlLnBhZ2VBbGlnblZlcnRpY2FsbHkgPSB0cnVlO1xuXG4gICAgICB0aGlzLm1hcCA9IHRoaXMuY3JlYXRlVGlsZW1hcChtYXBOYW1lKTtcblxuICAgICAgdGhpcy50aWxlZExldmVsLm1hcExheWVycyA9IFtdO1xuICAgICAgdGhpcy50aWxlZExldmVsLmNvbGxpZGVMYXllcnMgPSBbXTtcblxuICAgICAgdGhpcy5tYXAubGF5ZXJzLmZvckVhY2goZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgIHZhciBjcmVhdGVkTGF5ZXIgPSBfdGhpczIubWFwLmNyZWF0ZUxheWVyKGxheWVyLm5hbWUpO1xuICAgICAgICBjcmVhdGVkTGF5ZXIucmVzaXplV29ybGQoKTtcbiAgICAgICAgX3RoaXMyLnRpbGVkTGV2ZWwubWFwTGF5ZXJzLnB1c2goY3JlYXRlZExheWVyKTtcbiAgICAgICAgaWYgKGxheWVyLnByb3BlcnRpZXMuaW1wYXNzYWJsZSkge1xuICAgICAgICAgIF90aGlzMi50aWxlZExldmVsLmNvbGxpZGVMYXllcnMucHVzaChjcmVhdGVkTGF5ZXIpO1xuICAgICAgICAgIF90aGlzMi5tYXAuc2V0Q29sbGlzaW9uQnlFeGNsdXNpb24oW10sIHRydWUsIGNyZWF0ZWRMYXllcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB2YXIgb2JqZWN0c0J5VHlwZSA9IHRoaXMuZ2V0VGlsZW1hcE9iamVjdHNCeVR5cGUodGhpcy50aWxlbWFwKTtcblxuICAgICAgaWYgKG9iamVjdHNCeVR5cGUuQ29uc3VtYWJsZSkge1xuICAgICAgICB0aGlzLnRpbGVkTGV2ZWwuY29uc3VtYWJsZXMgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgICAgIHRoaXMudGlsZWRMZXZlbC5jb25zdW1hYmxlcy5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICAgICAgdmFyIGNvbnN1bWFibGVzID0gb2JqZWN0c0J5VHlwZS5Db25zdW1hYmxlO1xuICAgICAgICBjb25zdW1hYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzMi5jcmVhdGVTcHJpdGVGcm9tVGlsZWRPYmplY3QoaXRlbSwgX3RoaXMyLnRpbGVkTGV2ZWwuY29uc3VtYWJsZXMpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9iamVjdHNCeVR5cGUuS2V5KSB7XG4gICAgICAgIHRoaXMudGlsZWRMZXZlbC5rZXlzID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuICAgICAgICB0aGlzLnRpbGVkTGV2ZWwua2V5cy5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICAgICAgdmFyIGtleXMgPSBvYmplY3RzQnlUeXBlLktleTtcbiAgICAgICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzMi5jcmVhdGVTcHJpdGVGcm9tVGlsZWRPYmplY3QoaXRlbSwgX3RoaXMyLnRpbGVkTGV2ZWwua2V5cyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAob2JqZWN0c0J5VHlwZS5Eb29yKSB7XG4gICAgICAgIHRoaXMudGlsZWRMZXZlbC5kb29ycyA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICAgICAgdGhpcy50aWxlZExldmVsLmRvb3JzLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgICAgICB2YXIgZG9vcnMgPSBvYmplY3RzQnlUeXBlLkRvb3I7XG4gICAgICAgIGRvb3JzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICB2YXIgc3ByaXRlID0gX3RoaXMyLmNyZWF0ZVNwcml0ZUZyb21UaWxlZE9iamVjdChpdGVtLCBfdGhpczIudGlsZWRMZXZlbC5kb29ycyk7XG4gICAgICAgICAgc3ByaXRlLmJvZHkubW92ZXMgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvYmplY3RzQnlUeXBlLkdhdGUpIHtcbiAgICAgICAgdGhpcy50aWxlZExldmVsLmdhdGVzID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuICAgICAgICB0aGlzLnRpbGVkTGV2ZWwuZ2F0ZXMuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgICAgIHZhciBnYXRlcyA9IG9iamVjdHNCeVR5cGUuR2F0ZTtcbiAgICAgICAgZ2F0ZXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgIHZhciBzcHJpdGUgPSBfdGhpczIuY3JlYXRlU3ByaXRlRnJvbVRpbGVkT2JqZWN0KGl0ZW0sIF90aGlzMi50aWxlZExldmVsLmdhdGVzKTtcbiAgICAgICAgICBzcHJpdGUuYm9keS5tb3ZlcyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG5cbiAgICAgIC8vIGFkZCBwbGF5ZXJcbiAgICAgIHZhciBwbGF5ZXJTdGFydCA9IG9iamVjdHNCeVR5cGUuUGxheWVyU3RhcnRbMF07XG4gICAgICB0aGlzLnBsYXllciA9IHRoaXMuYWRkLnNwcml0ZShwbGF5ZXJTdGFydC54LCBwbGF5ZXJTdGFydC55IC0gcGxheWVyU3RhcnQuaGVpZ2h0LCAncGxheWVyJyk7XG4gICAgICB0aGlzLnBoeXNpY3MuYXJjYWRlLmVuYWJsZSh0aGlzLnBsYXllcik7XG4gICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLmFkZCgnd2FsaycsIFswLCAyXSwgOCwgdHJ1ZSk7XG4gICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLmFkZCgnc2l0JywgWzMsIDQsIDMsIDQsIDMsIDQsIDMsIDQsIDMsIDQsIDUsIDYsIDUsIDYsIDUsIDYsIDUsIDYsIDUsIDZdLCA4LCB0cnVlKTtcbiAgICAgIHRoaXMucGxheWVyLnNjYWxlLnggPSAtMTtcbiAgICAgIHRoaXMucGxheWVyLmFuY2hvci5zZXRUbygwLjUsIDEpO1xuICAgICAgdGhpcy5wbGF5ZXIuYm9keS5zZXRTaXplKDEwLCA4LCAzLCA4KTtcbiAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyKTtcblxuICAgICAgdGhpcy5jdXJzb3JzID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd1cGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgdGhpcy50aWxlZExldmVsLmNvbGxpZGVMYXllcnMuZm9yRWFjaChmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgX3RoaXMzLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZShfdGhpczMucGxheWVyLCBsYXllcik7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMucGxheWVyLCB0aGlzLnRpbGVkTGV2ZWwuY29uc3VtYWJsZXMsIGNvbnN1bWUsIG51bGwsIHRoaXMpO1xuICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy5wbGF5ZXIsIHRoaXMudGlsZWRMZXZlbC5rZXlzLCBjb2xsZWN0LCBudWxsLCB0aGlzKTtcbiAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLnRpbGVkTGV2ZWwuZG9vcnMsIGtub2NrRG9vciwgbnVsbCwgdGhpcyk7XG4gICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy50aWxlZExldmVsLmdhdGVzLCBrbm9ja0dhdGUsIG51bGwsIHRoaXMpO1xuICAgICAgLy8gIFJlc2V0IHRoZSB0aGlzLnBsYXllcnMgdmVsb2NpdHkgKG1vdmVtZW50KVxuICAgICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS54ID0gMDtcbiAgICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueSA9IDA7XG5cbiAgICAgIHZhciBkaXJlY3Rpb24gPSAnJztcbiAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICBjYXNlIHRoaXMuY3Vyc29ycy5sZWZ0LmlzRG93bjpcbiAgICAgICAgICBkaXJlY3Rpb24gKz0gJ2xlZnQnO1xuICAgICAgICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueCA9IC01MDtcbiAgICAgICAgICB0aGlzLnBsYXllci5zY2FsZS54ID0gMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0aGlzLmN1cnNvcnMucmlnaHQuaXNEb3duOlxuICAgICAgICAgIGRpcmVjdGlvbiArPSAncmlnaHQnO1xuICAgICAgICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueCA9IDUwO1xuICAgICAgICAgIHRoaXMucGxheWVyLnNjYWxlLnggPSAtMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgIGNhc2UgdGhpcy5jdXJzb3JzLnVwLmlzRG93bjpcbiAgICAgICAgICBkaXJlY3Rpb24gKz0gJ3VwJztcbiAgICAgICAgICB0aGlzLnBsYXllci5ib2R5LnZlbG9jaXR5LnkgPSAtNTA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdGhpcy5jdXJzb3JzLmRvd24uaXNEb3duOlxuICAgICAgICAgIGRpcmVjdGlvbiArPSAnZG93bic7XG4gICAgICAgICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS55ID0gNTA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmIChkaXJlY3Rpb24pIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCd3YWxrJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ3NpdCcpO1xuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBUaWxlZExldmVsU3RhdGU7XG59KFBoYXNlci5TdGF0ZSk7XG5cbk9iamVjdC5hc3NpZ24oVGlsZWRMZXZlbFN0YXRlLnByb3RvdHlwZSwgVGlsZWRJbnRlcnByZXRlcik7XG5leHBvcnQgZGVmYXVsdCBUaWxlZExldmVsU3RhdGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1TDNOeVl5OXpZM0pwY0hSekwyVnVaMmx1WlM5VWFXeGxaRXhsZG1Wc1UzUmhkR1V1YW5NaVhTd2libUZ0WlhNaU9sc2lWR2xzWldSSmJuUmxjbkJ5WlhSbGNpSXNJbU52Ykd4bFkzUWlMQ0pqYjI1emRXMWxJaXdpYTI1dlkydEViMjl5SWl3aWEyNXZZMnRIWVhSbElpd2lWR2xzWldSTVpYWmxiRk4wWVhSbElpd2liV0Z3VUdGMGFDSXNJblJwYkdWa1RHVjJaV3dpTENKdFlYQk9ZVzFsSWl3aVVHaGhjMlZ5SWl3aVEyRnVkbUZ6SWl3aWMyVjBTVzFoWjJWU1pXNWtaWEpwYm1kRGNtbHpjQ0lzSW1kaGJXVWlMQ0pqWVc1MllYTWlMQ0p3Y21Wc2IyRmtWR2xzWlcxaGNDSXNJbFJwYkdWdFlYQWlMQ0pVU1V4RlJGOUtVMDlPSWl3aWJHOWhaQ0lzSW5Od2NtbDBaWE5vWldWMElpd2ljM1JoWjJVaUxDSmlZV05yWjNKdmRXNWtRMjlzYjNJaUxDSnpZMkZzWlNJc0luTmpZV3hsVFc5a1pTSXNJbE5qWVd4bFRXRnVZV2RsY2lJc0lsTklUMWRmUVV4TUlpd2ljR0ZuWlVGc2FXZHVTRzl5YVhwdmJuUmhiR3g1SWl3aWNHRm5aVUZzYVdkdVZtVnlkR2xqWVd4c2VTSXNJbTFoY0NJc0ltTnlaV0YwWlZScGJHVnRZWEFpTENKdFlYQk1ZWGxsY25NaUxDSmpiMnhzYVdSbFRHRjVaWEp6SWl3aWJHRjVaWEp6SWl3aVptOXlSV0ZqYUNJc0ltTnlaV0YwWldSTVlYbGxjaUlzSW1OeVpXRjBaVXhoZVdWeUlpd2liR0Y1WlhJaUxDSnVZVzFsSWl3aWNtVnphWHBsVjI5eWJHUWlMQ0p3ZFhOb0lpd2ljSEp2Y0dWeWRHbGxjeUlzSW1sdGNHRnpjMkZpYkdVaUxDSnpaWFJEYjJ4c2FYTnBiMjVDZVVWNFkyeDFjMmx2YmlJc0ltOWlhbVZqZEhOQ2VWUjVjR1VpTENKblpYUlVhV3hsYldGd1QySnFaV04wYzBKNVZIbHdaU0lzSW5ScGJHVnRZWEFpTENKRGIyNXpkVzFoWW14bElpd2lZMjl1YzNWdFlXSnNaWE1pTENKaFpHUWlMQ0puY205MWNDSXNJbVZ1WVdKc1pVSnZaSGtpTENKamNtVmhkR1ZUY0hKcGRHVkdjbTl0Vkdsc1pXUlBZbXBsWTNRaUxDSnBkR1Z0SWl3aVMyVjVJaXdpYTJWNWN5SXNJa1J2YjNJaUxDSmtiMjl5Y3lJc0luTndjbWwwWlNJc0ltSnZaSGtpTENKdGIzWmxjeUlzSWtkaGRHVWlMQ0puWVhSbGN5SXNJbkJvZVhOcFkzTWlMQ0p6ZEdGeWRGTjVjM1JsYlNJc0lsQm9lWE5wWTNNaUxDSkJVa05CUkVVaUxDSndiR0Y1WlhKVGRHRnlkQ0lzSWxCc1lYbGxjbE4wWVhKMElpd2ljR3hoZVdWeUlpd2llQ0lzSW5raUxDSm9aV2xuYUhRaUxDSmhjbU5oWkdVaUxDSmxibUZpYkdVaUxDSmhibWx0WVhScGIyNXpJaXdpWVc1amFHOXlJaXdpYzJWMFZHOGlMQ0p6WlhSVGFYcGxJaXdpWTJGdFpYSmhJaXdpWm05c2JHOTNJaXdpWTNWeWMyOXljeUlzSW1sdWNIVjBJaXdpYTJWNVltOWhjbVFpTENKamNtVmhkR1ZEZFhKemIzSkxaWGx6SWl3aVkyOXNiR2xrWlNJc0ltOTJaWEpzWVhBaUxDSjJaV3h2WTJsMGVTSXNJbVJwY21WamRHbHZiaUlzSW14bFpuUWlMQ0pwYzBSdmQyNGlMQ0p5YVdkb2RDSXNJblZ3SWl3aVpHOTNiaUlzSW5Cc1lYa2lMQ0pUZEdGMFpTSXNJazlpYW1WamRDSXNJbUZ6YzJsbmJpSXNJbkJ5YjNSdmRIbHdaU0pkTENKdFlYQndhVzVuY3lJNklqczdPenM3T3pzN1FVRkJRU3hQUVVGUFFTeG5Ra0ZCVUN4TlFVRTJRaXh2UWtGQk4wSTdRVUZEUVN4VFFVTkZReXhQUVVSR0xFVkJRMWRETEU5QlJGZ3NSVUZEYjBKRExGTkJSSEJDTEVWQlF5dENReXhUUVVRdlFpeFJRVVZQTEdkQ1FVWlFPenRCUVVsQk96czdPenRKUVVsTlF5eGxPenM3T3pzN096czdPenNyUWtGRFl6dEJRVUZCTEZWQlFWaERMRTlCUVZjc1VVRkJXRUVzVDBGQlZ6czdRVUZEYUVJc1YwRkJTME1zVlVGQlRDeEhRVUZyUWp0QlFVTm9Ra1FzZDBKQlJHZENPMEZCUldoQ1JTeHBRa0ZCVTBZN1FVRkdUeXhQUVVGc1FqczdRVUZMUVVjc1lVRkJUME1zVFVGQlVDeERRVUZqUXl4elFrRkJaQ3hEUVVGeFF5eExRVUZMUXl4SlFVRk1MRU5CUVZWRExFMUJRUzlETzBGQlEwUTdPenM0UWtGRFV6dEJRVUZCTEhkQ1FVTnhRaXhMUVVGTFRpeFZRVVF4UWp0QlFVRkJMRlZCUTBGRExFOUJSRUVzWlVGRFFVRXNUMEZFUVR0QlFVRkJMRlZCUTFOR0xFOUJSRlFzWlVGRFUwRXNUMEZFVkRzN1FVRkZVaXhYUVVGTFVTeGpRVUZNTEVOQlFXOUNUaXhQUVVGd1FpeEZRVUUyUWtZc1QwRkJOMElzUlVGQmMwTXNTVUZCZEVNc1JVRkJORU5ITEU5QlFVOU5MRTlCUVZBc1EwRkJaVU1zVlVGQk0wUTdRVUZEUVN4WFFVRkxReXhKUVVGTUxFTkJRVlZETEZkQlFWWXNRMEZCYzBJc1VVRkJkRUlzUlVGQlowTXNlVUpCUVdoRExFVkJRVEpFTEVWQlFUTkVMRVZCUVN0RUxFVkJRUzlFTzBGQlEwUTdPenMyUWtGRFVUdEJRVUZCT3p0QlFVRkJMRlZCUTBOV0xFOUJSRVFzUjBGRFlTeExRVUZMUkN4VlFVUnNRaXhEUVVORFF5eFBRVVJFT3p0QlFVVlFMRmRCUVV0SkxFbEJRVXdzUTBGQlZVOHNTMEZCVml4RFFVRm5Ra01zWlVGQmFFSXNSMEZCYTBNc1RVRkJiRU03UVVGRFFTeFhRVUZMUXl4TFFVRk1MRU5CUVZkRExGTkJRVmdzUjBGQmRVSmlMRTlCUVU5akxGbEJRVkFzUTBGQmIwSkRMRkZCUVRORE8wRkJRMEU3UVVGRFFTeFhRVUZMU0N4TFFVRk1MRU5CUVZkSkxIRkNRVUZZTEVkQlFXMURMRWxCUVc1RE8wRkJRMEVzVjBGQlMwb3NTMEZCVEN4RFFVRlhTeXh0UWtGQldDeEhRVUZwUXl4SlFVRnFRenM3UVVGRlFTeFhRVUZMUXl4SFFVRk1MRWRCUVZjc1MwRkJTME1zWVVGQlRDeERRVUZ0UW5CQ0xFOUJRVzVDTEVOQlFWZzdPMEZCUlVFc1YwRkJTMFFzVlVGQlRDeERRVUZuUW5OQ0xGTkJRV2hDTEVkQlFUUkNMRVZCUVRWQ08wRkJRMEVzVjBGQlMzUkNMRlZCUVV3c1EwRkJaMEoxUWl4aFFVRm9RaXhIUVVGblF5eEZRVUZvUXpzN1FVRkZRU3hYUVVGTFNDeEhRVUZNTEVOQlFWTkpMRTFCUVZRc1EwRkJaMEpETEU5QlFXaENMRU5CUVhkQ0xHbENRVUZUTzBGQlF5OUNMRmxCUVUxRExHVkJRV1VzVDBGQlMwNHNSMEZCVEN4RFFVRlRUeXhYUVVGVUxFTkJRWEZDUXl4TlFVRk5ReXhKUVVFelFpeERRVUZ5UWp0QlFVTkJTQ3h4UWtGQllVa3NWMEZCWWp0QlFVTkJMR1ZCUVVzNVFpeFZRVUZNTEVOQlFXZENjMElzVTBGQmFFSXNRMEZCTUVKVExFbEJRVEZDTEVOQlFTdENUQ3haUVVFdlFqdEJRVU5CTEZsQlFVbEZMRTFCUVUxSkxGVkJRVTRzUTBGQmFVSkRMRlZCUVhKQ0xFVkJRV2xETzBGQlF5OUNMR2xDUVVGTGFrTXNWVUZCVEN4RFFVRm5RblZDTEdGQlFXaENMRU5CUVRoQ1VTeEpRVUU1UWl4RFFVRnRRMHdzV1VGQmJrTTdRVUZEUVN4cFFrRkJTMDRzUjBGQlRDeERRVUZUWXl4MVFrRkJWQ3hEUVVGcFF5eEZRVUZxUXl4RlFVRnhReXhKUVVGeVF5eEZRVUV5UTFJc1dVRkJNME03UVVGRFJEdEJRVU5HTEU5QlVrUTdPMEZCVlVFc1ZVRkJUVk1zWjBKQlFXZENMRXRCUVV0RExIVkNRVUZNTEVOQlFUWkNMRXRCUVV0RExFOUJRV3hETEVOQlFYUkNPenRCUVVWQkxGVkJRVWxHTEdOQlFXTkhMRlZCUVd4Q0xFVkJRVGhDTzBGQlF6VkNMR0ZCUVV0MFF5eFZRVUZNTEVOQlFXZENkVU1zVjBGQmFFSXNSMEZCT0VJc1MwRkJTMnhETEVsQlFVd3NRMEZCVlcxRExFZEJRVllzUTBGQlkwTXNTMEZCWkN4RlFVRTVRanRCUVVOQkxHRkJRVXQ2UXl4VlFVRk1MRU5CUVdkQ2RVTXNWMEZCYUVJc1EwRkJORUpITEZWQlFUVkNMRWRCUVhsRExFbEJRWHBETzBGQlEwRXNXVUZCVFVnc1kwRkJZMG9zWTBGQlkwY3NWVUZCYkVNN1FVRkRRVU1zYjBKQlFWbGtMRTlCUVZvc1EwRkJiMEk3UVVGQlFTeHBRa0ZEYkVJc1QwRkJTMnRDTERKQ1FVRk1MRU5CUVdsRFF5eEpRVUZxUXl4RlFVRjFReXhQUVVGTE5VTXNWVUZCVEN4RFFVRm5RblZETEZkQlFYWkVMRU5CUkd0Q08wRkJRVUVzVTBGQmNFSTdRVUZIUkRzN1FVRkZSQ3hWUVVGSlNpeGpRVUZqVlN4SFFVRnNRaXhGUVVGMVFqdEJRVU55UWl4aFFVRkxOME1zVlVGQlRDeERRVUZuUWpoRExFbEJRV2hDTEVkQlFYVkNMRXRCUVV0NlF5eEpRVUZNTEVOQlFWVnRReXhIUVVGV0xFTkJRV05ETEV0QlFXUXNSVUZCZGtJN1FVRkRRU3hoUVVGTGVrTXNWVUZCVEN4RFFVRm5RamhETEVsQlFXaENMRU5CUVhGQ1NpeFZRVUZ5UWl4SFFVRnJReXhKUVVGc1F6dEJRVU5CTEZsQlFVMUpMRTlCUVU5WUxHTkJRV05WTEVkQlFUTkNPMEZCUTBGRExHRkJRVXR5UWl4UFFVRk1MRU5CUVdFN1FVRkJRU3hwUWtGRFdDeFBRVUZMYTBJc01rSkJRVXdzUTBGQmFVTkRMRWxCUVdwRExFVkJRWFZETEU5QlFVczFReXhWUVVGTUxFTkJRV2RDT0VNc1NVRkJka1FzUTBGRVZ6dEJRVUZCTEZOQlFXSTdRVUZIUkRzN1FVRkZSQ3hWUVVGSldDeGpRVUZqV1N4SlFVRnNRaXhGUVVGM1FqdEJRVU4wUWl4aFFVRkxMME1zVlVGQlRDeERRVUZuUW1kRUxFdEJRV2hDTEVkQlFYZENMRXRCUVVzelF5eEpRVUZNTEVOQlFWVnRReXhIUVVGV0xFTkJRV05ETEV0QlFXUXNSVUZCZUVJN1FVRkRRU3hoUVVGTGVrTXNWVUZCVEN4RFFVRm5RbWRFTEV0QlFXaENMRU5CUVhOQ1RpeFZRVUYwUWl4SFFVRnRReXhKUVVGdVF6dEJRVU5CTEZsQlFVMU5MRkZCUVZGaUxHTkJRV05aTEVsQlFUVkNPMEZCUTBGRExHTkJRVTEyUWl4UFFVRk9MRU5CUVdNc1owSkJRVkU3UVVGRGNFSXNZMEZCVFhkQ0xGTkJRVk1zVDBGQlMwNHNNa0pCUVV3c1EwRkJhVU5ETEVsQlFXcERMRVZCUVhWRExFOUJRVXMxUXl4VlFVRk1MRU5CUVdkQ1owUXNTMEZCZGtRc1EwRkJaanRCUVVOQlF5eHBRa0ZCVDBNc1NVRkJVQ3hEUVVGWlF5eExRVUZhTEVkQlFXOUNMRXRCUVhCQ08wRkJRMFFzVTBGSVJEdEJRVWxFT3p0QlFVVkVMRlZCUVVsb1FpeGpRVUZqYVVJc1NVRkJiRUlzUlVGQmQwSTdRVUZEZEVJc1lVRkJTM0JFTEZWQlFVd3NRMEZCWjBKeFJDeExRVUZvUWl4SFFVRjNRaXhMUVVGTGFFUXNTVUZCVEN4RFFVRlZiVU1zUjBGQlZpeERRVUZqUXl4TFFVRmtMRVZCUVhoQ08wRkJRMEVzWVVGQlMzcERMRlZCUVV3c1EwRkJaMEp4UkN4TFFVRm9RaXhEUVVGelFsZ3NWVUZCZEVJc1IwRkJiVU1zU1VGQmJrTTdRVUZEUVN4WlFVRk5WeXhSUVVGUmJFSXNZMEZCWTJsQ0xFbEJRVFZDTzBGQlEwRkRMR05CUVUwMVFpeFBRVUZPTEVOQlFXTXNaMEpCUVZFN1FVRkRjRUlzWTBGQlRYZENMRk5CUVZNc1QwRkJTMDRzTWtKQlFVd3NRMEZCYVVORExFbEJRV3BETEVWQlFYVkRMRTlCUVVzMVF5eFZRVUZNTEVOQlFXZENjVVFzUzBGQmRrUXNRMEZCWmp0QlFVTkJTaXhwUWtGQlQwTXNTVUZCVUN4RFFVRlpReXhMUVVGYUxFZEJRVzlDTEV0QlFYQkNPMEZCUTBRc1UwRklSRHRCUVVsRU96dEJRVVZFTEZkQlFVdEhMRTlCUVV3c1EwRkJZVU1zVjBGQllpeERRVUY1UW5KRUxFOUJRVTl6UkN4UFFVRlFMRU5CUVdWRExFMUJRWGhET3p0QlFVVkJPMEZCUTBFc1ZVRkJUVU1zWTBGQlkzWkNMR05CUVdOM1FpeFhRVUZrTEVOQlFUQkNMRU5CUVRGQ0xFTkJRWEJDTzBGQlEwRXNWMEZCUzBNc1RVRkJUQ3hIUVVGakxFdEJRVXR3UWl4SFFVRk1MRU5CUVZOVExFMUJRVlFzUTBGQlowSlRMRmxCUVZsSExFTkJRVFZDTEVWQlFTdENTQ3haUVVGWlNTeERRVUZhTEVkQlFXZENTaXhaUVVGWlN5eE5RVUV6UkN4RlFVRnRSU3hSUVVGdVJTeERRVUZrTzBGQlEwRXNWMEZCUzFRc1QwRkJUQ3hEUVVGaFZTeE5RVUZpTEVOQlFXOUNReXhOUVVGd1FpeERRVUV5UWl4TFFVRkxUQ3hOUVVGb1F6dEJRVU5CTEZkQlFVdEJMRTFCUVV3c1EwRkJXVTBzVlVGQldpeERRVUYxUWpGQ0xFZEJRWFpDTEVOQlFUSkNMRTFCUVROQ0xFVkJRVzFETEVOQlFVVXNRMEZCUml4RlFVRkxMRU5CUVV3c1EwRkJia01zUlVGQk5rTXNRMEZCTjBNc1JVRkJaMFFzU1VGQmFFUTdRVUZEUVN4WFFVRkxiMElzVFVGQlRDeERRVUZaVFN4VlFVRmFMRU5CUVhWQ01VSXNSMEZCZGtJc1EwRkJNa0lzUzBGQk0wSXNSVUZCYTBNc1EwRkJSU3hEUVVGR0xFVkJRVXNzUTBGQlRDeEZRVUZSTEVOQlFWSXNSVUZCVnl4RFFVRllMRVZCUVdNc1EwRkJaQ3hGUVVGcFFpeERRVUZxUWl4RlFVRnZRaXhEUVVGd1FpeEZRVUYxUWl4RFFVRjJRaXhGUVVFd1FpeERRVUV4UWl4RlFVRTJRaXhEUVVFM1FpeEZRVUZuUXl4RFFVRm9ReXhGUVVGdFF5eERRVUZ1UXl4RlFVRnpReXhEUVVGMFF5eEZRVUY1UXl4RFFVRjZReXhGUVVFMFF5eERRVUUxUXl4RlFVRXJReXhEUVVFdlF5eEZRVUZyUkN4RFFVRnNSQ3hGUVVGeFJDeERRVUZ5UkN4RlFVRjNSQ3hEUVVGNFJDeEZRVUV5UkN4RFFVRXpSQ3hEUVVGc1F5eEZRVUZyUnl4RFFVRnNSeXhGUVVGeFJ5eEpRVUZ5Unp0QlFVTkJMRmRCUVV0dlFpeE5RVUZNTEVOQlFWazVReXhMUVVGYUxFTkJRV3RDSzBNc1EwRkJiRUlzUjBGQmMwSXNRMEZCUXl4RFFVRjJRanRCUVVOQkxGZEJRVXRFTEUxQlFVd3NRMEZCV1U4c1RVRkJXaXhEUVVGdFFrTXNTMEZCYmtJc1EwRkJlVUlzUjBGQmVrSXNSVUZCT0VJc1EwRkJPVUk3UVVGRFFTeFhRVUZMVWl4TlFVRk1MRU5CUVZsV0xFbEJRVm9zUTBGQmFVSnRRaXhQUVVGcVFpeERRVUY1UWl4RlFVRjZRaXhGUVVFMlFpeERRVUUzUWl4RlFVRm5ReXhEUVVGb1F5eEZRVUZ0UXl4RFFVRnVRenRCUVVOQkxGZEJRVXRvUlN4SlFVRk1MRU5CUVZWcFJTeE5RVUZXTEVOQlFXbENReXhOUVVGcVFpeERRVUYzUWl4TFFVRkxXQ3hOUVVFM1FqczdRVUZGUVN4WFFVRkxXU3hQUVVGTUxFZEJRV1VzUzBGQlMyNUZMRWxCUVV3c1EwRkJWVzlGTEV0QlFWWXNRMEZCWjBKRExGRkJRV2hDTEVOQlFYbENReXhuUWtGQmVrSXNSVUZCWmp0QlFVTkVPenM3TmtKQlExRTdRVUZCUVRzN1FVRkRVQ3hYUVVGTE0wVXNWVUZCVEN4RFFVRm5RblZDTEdGQlFXaENMRU5CUVRoQ1JTeFBRVUU1UWl4RFFVRnpReXhwUWtGQlV6dEJRVU0zUXl4bFFVRkxjRUlzU1VGQlRDeERRVUZWYVVRc1QwRkJWaXhEUVVGclFsVXNUVUZCYkVJc1EwRkJlVUpaTEU5QlFYcENMRU5CUVdsRExFOUJRVXRvUWl4TlFVRjBReXhGUVVFNFEyaERMRXRCUVRsRE8wRkJRMFFzVDBGR1JEdEJRVWRCTEZkQlFVdDJRaXhKUVVGTUxFTkJRVlZwUkN4UFFVRldMRU5CUVd0Q1ZTeE5RVUZzUWl4RFFVRjVRbUVzVDBGQmVrSXNRMEZCYVVNc1MwRkJTMnBDTEUxQlFYUkRMRVZCUVRoRExFdEJRVXMxUkN4VlFVRk1MRU5CUVdkQ2RVTXNWMEZCT1VRc1JVRkJNa1UxUXl4UFFVRXpSU3hGUVVGdlJpeEpRVUZ3Uml4RlFVRXdSaXhKUVVFeFJqdEJRVU5CTEZkQlFVdFZMRWxCUVV3c1EwRkJWV2xFTEU5QlFWWXNRMEZCYTBKVkxFMUJRV3hDTEVOQlFYbENZU3hQUVVGNlFpeERRVUZwUXl4TFFVRkxha0lzVFVGQmRFTXNSVUZCT0VNc1MwRkJTelZFTEZWQlFVd3NRMEZCWjBJNFF5eEpRVUU1UkN4RlFVRnZSWEJFTEU5QlFYQkZMRVZCUVRaRkxFbEJRVGRGTEVWQlFXMUdMRWxCUVc1R08wRkJRMEVzVjBGQlMxY3NTVUZCVEN4RFFVRlZhVVFzVDBGQlZpeERRVUZyUWxVc1RVRkJiRUlzUTBGQmVVSlpMRTlCUVhwQ0xFTkJRV2xETEV0QlFVdG9RaXhOUVVGMFF5eEZRVUU0UXl4TFFVRkxOVVFzVlVGQlRDeERRVUZuUW1kRUxFdEJRVGxFTEVWQlFYRkZjRVFzVTBGQmNrVXNSVUZCWjBZc1NVRkJhRVlzUlVGQmMwWXNTVUZCZEVZN1FVRkRRU3hYUVVGTFV5eEpRVUZNTEVOQlFWVnBSQ3hQUVVGV0xFTkJRV3RDVlN4TlFVRnNRaXhEUVVGNVFsa3NUMEZCZWtJc1EwRkJhVU1zUzBGQlMyaENMRTFCUVhSRExFVkJRVGhETEV0QlFVczFSQ3hWUVVGTUxFTkJRV2RDY1VRc1MwRkJPVVFzUlVGQmNVVjRSQ3hUUVVGeVJTeEZRVUZuUml4SlFVRm9SaXhGUVVGelJpeEpRVUYwUmp0QlFVTkJPMEZCUTBFc1YwRkJTeXRFTEUxQlFVd3NRMEZCV1ZZc1NVRkJXaXhEUVVGcFFqUkNMRkZCUVdwQ0xFTkJRVEJDYWtJc1EwRkJNVUlzUjBGQk9FSXNRMEZCT1VJN1FVRkRRU3hYUVVGTFJDeE5RVUZNTEVOQlFWbFdMRWxCUVZvc1EwRkJhVUkwUWl4UlFVRnFRaXhEUVVFd1FtaENMRU5CUVRGQ0xFZEJRVGhDTEVOQlFUbENPenRCUVVWQkxGVkJRVWxwUWl4WlFVRlpMRVZCUVdoQ08wRkJRMEVzWTBGQlVTeEpRVUZTTzBGQlEwRXNZVUZCU3l4TFFVRkxVQ3hQUVVGTUxFTkJRV0ZSTEVsQlFXSXNRMEZCYTBKRExFMUJRWFpDTzBGQlEwVkdMSFZDUVVGaExFMUJRV0k3UVVGRFFTeGxRVUZMYmtJc1RVRkJUQ3hEUVVGWlZpeEpRVUZhTEVOQlFXbENORUlzVVVGQmFrSXNRMEZCTUVKcVFpeERRVUV4UWl4SFFVRTRRaXhEUVVGRExFVkJRUzlDTzBGQlEwRXNaVUZCUzBRc1RVRkJUQ3hEUVVGWk9VTXNTMEZCV2l4RFFVRnJRaXRETEVOQlFXeENMRWRCUVhOQ0xFTkJRWFJDTzBGQlEwRTdRVUZEUml4aFFVRkxMRXRCUVV0WExFOUJRVXdzUTBGQllWVXNTMEZCWWl4RFFVRnRRa1FzVFVGQmVFSTdRVUZEUlVZc2RVSkJRV0VzVDBGQllqdEJRVU5CTEdWQlFVdHVRaXhOUVVGTUxFTkJRVmxXTEVsQlFWb3NRMEZCYVVJMFFpeFJRVUZxUWl4RFFVRXdRbXBDTEVOQlFURkNMRWRCUVRoQ0xFVkJRVGxDTzBGQlEwRXNaVUZCUzBRc1RVRkJUQ3hEUVVGWk9VTXNTMEZCV2l4RFFVRnJRaXRETEVOQlFXeENMRWRCUVhOQ0xFTkJRVU1zUTBGQmRrSTdRVUZEUVR0QlFWWkdPenRCUVdGQkxHTkJRVkVzU1VGQlVqdEJRVU5CTEdGQlFVc3NTMEZCUzFjc1QwRkJUQ3hEUVVGaFZ5eEZRVUZpTEVOQlFXZENSaXhOUVVGeVFqdEJRVU5GUml4MVFrRkJZU3hKUVVGaU8wRkJRMEVzWlVGQlMyNUNMRTFCUVV3c1EwRkJXVllzU1VGQldpeERRVUZwUWpSQ0xGRkJRV3BDTEVOQlFUQkNhRUlzUTBGQk1VSXNSMEZCT0VJc1EwRkJReXhGUVVFdlFqdEJRVU5CTzBGQlEwWXNZVUZCU3l4TFFVRkxWU3hQUVVGTUxFTkJRV0ZaTEVsQlFXSXNRMEZCYTBKSUxFMUJRWFpDTzBGQlEwVkdMSFZDUVVGaExFMUJRV0k3UVVGRFFTeGxRVUZMYmtJc1RVRkJUQ3hEUVVGWlZpeEpRVUZhTEVOQlFXbENORUlzVVVGQmFrSXNRMEZCTUVKb1FpeERRVUV4UWl4SFFVRTRRaXhGUVVFNVFqdEJRVU5CTzBGQlVrWTdPMEZCVjBFc1ZVRkJTV2xDTEZOQlFVb3NSVUZCWlR0QlFVTmlMR0ZCUVV0dVFpeE5RVUZNTEVOQlFWbE5MRlZCUVZvc1EwRkJkVUp0UWl4SlFVRjJRaXhEUVVFMFFpeE5RVUUxUWp0QlFVTkVMRTlCUmtRc1RVRkZUenRCUVVOTUxHRkJRVXQ2UWl4TlFVRk1MRU5CUVZsTkxGVkJRVm9zUTBGQmRVSnRRaXhKUVVGMlFpeERRVUUwUWl4TFFVRTFRanRCUVVORU8wRkJRMFk3T3pzN1JVRjBTVEpDYmtZc1QwRkJUMjlHTEVzN08wRkJlVWx5UTBNc1QwRkJUME1zVFVGQlVDeERRVUZqTVVZc1owSkJRV2RDTWtZc1UwRkJPVUlzUlVGQmVVTm9SeXhuUWtGQmVrTTdRVUZEUVN4bFFVRmxTeXhsUVVGbUlpd2labWxzWlNJNklsUnBiR1ZrVEdWMlpXeFRkR0YwWlM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJbWx0Y0c5eWRDQlVhV3hsWkVsdWRHVnljSEpsZEdWeUlHWnliMjBnSnk0dlZHbHNaV1JKYm5SbGNuQnlaWFJsY2ljN1hHNXBiWEJ2Y25RZ2UxeHVJQ0JqYjJ4c1pXTjBMQ0JqYjI1emRXMWxMQ0JyYm05amEwUnZiM0lzSUd0dWIyTnJSMkYwWlZ4dWZTQm1jbTl0SUNjdUwybHVkR1Z5WVdOMGFXOXVjeWM3WEc1Y2JpOHFLbHh1SUNvZ1JYaDBaVzVrSUhSb2FYTWdhVzV6ZEdWaFpDQnZaaUJRYUdGelpYSXVVM1JoZEdVZ2RHOGdhR0Z1Wkd4bElHRWdWR2xzWldRZ2JHVjJaV3hjYmlBcUlFQjBlWEJsSUh0UFltcGxZM1I5WEc0Z0tpOWNibU5zWVhOeklGUnBiR1ZrVEdWMlpXeFRkR0YwWlNCbGVIUmxibVJ6SUZCb1lYTmxjaTVUZEdGMFpTQjdYRzRnSUdsdWFYUW9leUJ0WVhCUVlYUm9JSDBwSUh0Y2JpQWdJQ0IwYUdsekxuUnBiR1ZrVEdWMlpXd2dQU0I3WEc0Z0lDQWdJQ0J0WVhCUVlYUm9MRnh1SUNBZ0lDQWdiV0Z3VG1GdFpUb2diV0Z3VUdGMGFGeHVJQ0FnSUgwN1hHNWNiaUFnSUNCUWFHRnpaWEl1UTJGdWRtRnpMbk5sZEVsdFlXZGxVbVZ1WkdWeWFXNW5RM0pwYzNBb2RHaHBjeTVuWVcxbExtTmhiblpoY3lrN1hHNGdJSDFjYmlBZ2NISmxiRzloWkNncElIdGNiaUFnSUNCamIyNXpkQ0I3SUcxaGNFNWhiV1VzSUcxaGNGQmhkR2dnZlNBOUlIUm9hWE11ZEdsc1pXUk1aWFpsYkR0Y2JpQWdJQ0IwYUdsekxuQnlaV3h2WVdSVWFXeGxiV0Z3S0cxaGNFNWhiV1VzSUcxaGNGQmhkR2dzSUc1MWJHd3NJRkJvWVhObGNpNVVhV3hsYldGd0xsUkpURVZFWDBwVFQwNHBPMXh1SUNBZ0lIUm9hWE11Ykc5aFpDNXpjSEpwZEdWemFHVmxkQ2duY0d4aGVXVnlKeXdnSnk5aGMzTmxkSE12YzNCeWFYUmxjeTlrYjJjdVoybG1KeXdnTWpRc0lERTJLVHRjYmlBZ2ZWeHVJQ0JqY21WaGRHVW9LU0I3WEc0Z0lDQWdZMjl1YzNRZ2V5QnRZWEJPWVcxbElIMGdQU0IwYUdsekxuUnBiR1ZrVEdWMlpXdzdYRzRnSUNBZ2RHaHBjeTVuWVcxbExuTjBZV2RsTG1KaFkydG5jbTkxYm1SRGIyeHZjaUE5SUNjak1EQXdKenRjYmlBZ0lDQjBhR2x6TG5OallXeGxMbk5qWVd4bFRXOWtaU0E5SUZCb1lYTmxjaTVUWTJGc1pVMWhibUZuWlhJdVUwaFBWMTlCVEV3N1hHNGdJQ0FnTHk4Z2FHRjJaU0IwYUdVZ1oyRnRaU0JqWlc1MFpYSmxaQ0J2YmlCelkzSmxaVzVjYmlBZ0lDQjBhR2x6TG5OallXeGxMbkJoWjJWQmJHbG5ia2h2Y21sNmIyNTBZV3hzZVNBOUlIUnlkV1U3WEc0Z0lDQWdkR2hwY3k1elkyRnNaUzV3WVdkbFFXeHBaMjVXWlhKMGFXTmhiR3g1SUQwZ2RISjFaVHRjYmx4dUlDQWdJSFJvYVhNdWJXRndJRDBnZEdocGN5NWpjbVZoZEdWVWFXeGxiV0Z3S0cxaGNFNWhiV1VwTzF4dVhHNGdJQ0FnZEdocGN5NTBhV3hsWkV4bGRtVnNMbTFoY0V4aGVXVnljeUE5SUZ0ZE8xeHVJQ0FnSUhSb2FYTXVkR2xzWldSTVpYWmxiQzVqYjJ4c2FXUmxUR0Y1WlhKeklEMGdXMTA3WEc1Y2JpQWdJQ0IwYUdsekxtMWhjQzVzWVhsbGNuTXVabTl5UldGamFDaHNZWGxsY2lBOVBpQjdYRzRnSUNBZ0lDQmpiMjV6ZENCamNtVmhkR1ZrVEdGNVpYSWdQU0IwYUdsekxtMWhjQzVqY21WaGRHVk1ZWGxsY2loc1lYbGxjaTV1WVcxbEtUdGNiaUFnSUNBZ0lHTnlaV0YwWldSTVlYbGxjaTV5WlhOcGVtVlhiM0pzWkNncE8xeHVJQ0FnSUNBZ2RHaHBjeTUwYVd4bFpFeGxkbVZzTG0xaGNFeGhlV1Z5Y3k1d2RYTm9LR055WldGMFpXUk1ZWGxsY2lrN1hHNGdJQ0FnSUNCcFppQW9iR0Y1WlhJdWNISnZjR1Z5ZEdsbGN5NXBiWEJoYzNOaFlteGxLU0I3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVkR2xzWldSTVpYWmxiQzVqYjJ4c2FXUmxUR0Y1WlhKekxuQjFjMmdvWTNKbFlYUmxaRXhoZVdWeUtUdGNiaUFnSUNBZ0lDQWdkR2hwY3k1dFlYQXVjMlYwUTI5c2JHbHphVzl1UW5sRmVHTnNkWE5wYjI0b1cxMHNJSFJ5ZFdVc0lHTnlaV0YwWldSTVlYbGxjaWs3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmU2s3WEc1Y2JpQWdJQ0JqYjI1emRDQnZZbXBsWTNSelFubFVlWEJsSUQwZ2RHaHBjeTVuWlhSVWFXeGxiV0Z3VDJKcVpXTjBjMEo1Vkhsd1pTaDBhR2x6TG5ScGJHVnRZWEFwTzF4dVhHNGdJQ0FnYVdZZ0tHOWlhbVZqZEhOQ2VWUjVjR1V1UTI5dWMzVnRZV0pzWlNrZ2UxeHVJQ0FnSUNBZ2RHaHBjeTUwYVd4bFpFeGxkbVZzTG1OdmJuTjFiV0ZpYkdWeklEMGdkR2hwY3k1bllXMWxMbUZrWkM1bmNtOTFjQ2dwTzF4dUlDQWdJQ0FnZEdocGN5NTBhV3hsWkV4bGRtVnNMbU52Ym5OMWJXRmliR1Z6TG1WdVlXSnNaVUp2WkhrZ1BTQjBjblZsTzF4dUlDQWdJQ0FnWTI5dWMzUWdZMjl1YzNWdFlXSnNaWE1nUFNCdlltcGxZM1J6UW5sVWVYQmxMa052Ym5OMWJXRmliR1U3WEc0Z0lDQWdJQ0JqYjI1emRXMWhZbXhsY3k1bWIzSkZZV05vS0dsMFpXMGdQVDVjYmlBZ0lDQWdJQ0FnZEdocGN5NWpjbVZoZEdWVGNISnBkR1ZHY205dFZHbHNaV1JQWW1wbFkzUW9hWFJsYlN3Z2RHaHBjeTUwYVd4bFpFeGxkbVZzTG1OdmJuTjFiV0ZpYkdWektWeHVJQ0FnSUNBZ0tUdGNiaUFnSUNCOVhHNWNiaUFnSUNCcFppQW9iMkpxWldOMGMwSjVWSGx3WlM1TFpYa3BJSHRjYmlBZ0lDQWdJSFJvYVhNdWRHbHNaV1JNWlhabGJDNXJaWGx6SUQwZ2RHaHBjeTVuWVcxbExtRmtaQzVuY205MWNDZ3BPMXh1SUNBZ0lDQWdkR2hwY3k1MGFXeGxaRXhsZG1Wc0xtdGxlWE11Wlc1aFlteGxRbTlrZVNBOUlIUnlkV1U3WEc0Z0lDQWdJQ0JqYjI1emRDQnJaWGx6SUQwZ2IySnFaV04wYzBKNVZIbHdaUzVMWlhrN1hHNGdJQ0FnSUNCclpYbHpMbVp2Y2tWaFkyZ29hWFJsYlNBOVBseHVJQ0FnSUNBZ0lDQjBhR2x6TG1OeVpXRjBaVk53Y21sMFpVWnliMjFVYVd4bFpFOWlhbVZqZENocGRHVnRMQ0IwYUdsekxuUnBiR1ZrVEdWMlpXd3VhMlY1Y3lsY2JpQWdJQ0FnSUNrN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnYVdZZ0tHOWlhbVZqZEhOQ2VWUjVjR1V1Ukc5dmNpa2dlMXh1SUNBZ0lDQWdkR2hwY3k1MGFXeGxaRXhsZG1Wc0xtUnZiM0p6SUQwZ2RHaHBjeTVuWVcxbExtRmtaQzVuY205MWNDZ3BPMXh1SUNBZ0lDQWdkR2hwY3k1MGFXeGxaRXhsZG1Wc0xtUnZiM0p6TG1WdVlXSnNaVUp2WkhrZ1BTQjBjblZsTzF4dUlDQWdJQ0FnWTI5dWMzUWdaRzl2Y25NZ1BTQnZZbXBsWTNSelFubFVlWEJsTGtSdmIzSTdYRzRnSUNBZ0lDQmtiMjl5Y3k1bWIzSkZZV05vS0dsMFpXMGdQVDRnZTF4dUlDQWdJQ0FnSUNCamIyNXpkQ0J6Y0hKcGRHVWdQU0IwYUdsekxtTnlaV0YwWlZOd2NtbDBaVVp5YjIxVWFXeGxaRTlpYW1WamRDaHBkR1Z0TENCMGFHbHpMblJwYkdWa1RHVjJaV3d1Wkc5dmNuTXBPMXh1SUNBZ0lDQWdJQ0J6Y0hKcGRHVXVZbTlrZVM1dGIzWmxjeUE5SUdaaGJITmxPMXh1SUNBZ0lDQWdmU2s3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdhV1lnS0c5aWFtVmpkSE5DZVZSNWNHVXVSMkYwWlNrZ2UxeHVJQ0FnSUNBZ2RHaHBjeTUwYVd4bFpFeGxkbVZzTG1kaGRHVnpJRDBnZEdocGN5NW5ZVzFsTG1Ga1pDNW5jbTkxY0NncE8xeHVJQ0FnSUNBZ2RHaHBjeTUwYVd4bFpFeGxkbVZzTG1kaGRHVnpMbVZ1WVdKc1pVSnZaSGtnUFNCMGNuVmxPMXh1SUNBZ0lDQWdZMjl1YzNRZ1oyRjBaWE1nUFNCdlltcGxZM1J6UW5sVWVYQmxMa2RoZEdVN1hHNGdJQ0FnSUNCbllYUmxjeTVtYjNKRllXTm9LR2wwWlcwZ1BUNGdlMXh1SUNBZ0lDQWdJQ0JqYjI1emRDQnpjSEpwZEdVZ1BTQjBhR2x6TG1OeVpXRjBaVk53Y21sMFpVWnliMjFVYVd4bFpFOWlhbVZqZENocGRHVnRMQ0IwYUdsekxuUnBiR1ZrVEdWMlpXd3VaMkYwWlhNcE8xeHVJQ0FnSUNBZ0lDQnpjSEpwZEdVdVltOWtlUzV0YjNabGN5QTlJR1poYkhObE8xeHVJQ0FnSUNBZ2ZTazdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2RHaHBjeTV3YUhsemFXTnpMbk4wWVhKMFUzbHpkR1Z0S0ZCb1lYTmxjaTVRYUhsemFXTnpMa0ZTUTBGRVJTazdYRzVjYmlBZ0lDQXZMeUJoWkdRZ2NHeGhlV1Z5WEc0Z0lDQWdZMjl1YzNRZ2NHeGhlV1Z5VTNSaGNuUWdQU0J2WW1wbFkzUnpRbmxVZVhCbExsQnNZWGxsY2xOMFlYSjBXekJkTzF4dUlDQWdJSFJvYVhNdWNHeGhlV1Z5SUQwZ2RHaHBjeTVoWkdRdWMzQnlhWFJsS0hCc1lYbGxjbE4wWVhKMExuZ3NJSEJzWVhsbGNsTjBZWEowTG5rZ0xTQndiR0Y1WlhKVGRHRnlkQzVvWldsbmFIUXNJQ2R3YkdGNVpYSW5LVHRjYmlBZ0lDQjBhR2x6TG5Cb2VYTnBZM011WVhKallXUmxMbVZ1WVdKc1pTaDBhR2x6TG5Cc1lYbGxjaWs3WEc0Z0lDQWdkR2hwY3k1d2JHRjVaWEl1WVc1cGJXRjBhVzl1Y3k1aFpHUW9KM2RoYkdzbkxDQmJJREFzSURJZ1hTd2dPQ3dnZEhKMVpTazdYRzRnSUNBZ2RHaHBjeTV3YkdGNVpYSXVZVzVwYldGMGFXOXVjeTVoWkdRb0ozTnBkQ2NzSUZzZ015d2dOQ3dnTXl3Z05Dd2dNeXdnTkN3Z015d2dOQ3dnTXl3Z05Dd2dOU3dnTml3Z05Td2dOaXdnTlN3Z05pd2dOU3dnTml3Z05Td2dOaUJkTENBNExDQjBjblZsS1R0Y2JpQWdJQ0IwYUdsekxuQnNZWGxsY2k1elkyRnNaUzU0SUQwZ0xURTdYRzRnSUNBZ2RHaHBjeTV3YkdGNVpYSXVZVzVqYUc5eUxuTmxkRlJ2S0RBdU5Td2dNU2s3WEc0Z0lDQWdkR2hwY3k1d2JHRjVaWEl1WW05a2VTNXpaWFJUYVhwbEtERXdMQ0E0TENBekxDQTRLVHRjYmlBZ0lDQjBhR2x6TG1kaGJXVXVZMkZ0WlhKaExtWnZiR3h2ZHloMGFHbHpMbkJzWVhsbGNpazdYRzVjYmlBZ0lDQjBhR2x6TG1OMWNuTnZjbk1nUFNCMGFHbHpMbWRoYldVdWFXNXdkWFF1YTJWNVltOWhjbVF1WTNKbFlYUmxRM1Z5YzI5eVMyVjVjeWdwTzF4dUlDQjlYRzRnSUhWd1pHRjBaU2dwSUh0Y2JpQWdJQ0IwYUdsekxuUnBiR1ZrVEdWMlpXd3VZMjlzYkdsa1pVeGhlV1Z5Y3k1bWIzSkZZV05vS0d4aGVXVnlJRDArSUh0Y2JpQWdJQ0FnSUhSb2FYTXVaMkZ0WlM1d2FIbHphV056TG1GeVkyRmtaUzVqYjJ4c2FXUmxLSFJvYVhNdWNHeGhlV1Z5TENCc1lYbGxjaWs3WEc0Z0lDQWdmU2s3WEc0Z0lDQWdkR2hwY3k1bllXMWxMbkJvZVhOcFkzTXVZWEpqWVdSbExtOTJaWEpzWVhBb2RHaHBjeTV3YkdGNVpYSXNJSFJvYVhNdWRHbHNaV1JNWlhabGJDNWpiMjV6ZFcxaFlteGxjeXdnWTI5dWMzVnRaU3dnYm5Wc2JDd2dkR2hwY3lrN1hHNGdJQ0FnZEdocGN5NW5ZVzFsTG5Cb2VYTnBZM011WVhKallXUmxMbTkyWlhKc1lYQW9kR2hwY3k1d2JHRjVaWElzSUhSb2FYTXVkR2xzWldSTVpYWmxiQzVyWlhsekxDQmpiMnhzWldOMExDQnVkV3hzTENCMGFHbHpLVHRjYmlBZ0lDQjBhR2x6TG1kaGJXVXVjR2g1YzJsamN5NWhjbU5oWkdVdVkyOXNiR2xrWlNoMGFHbHpMbkJzWVhsbGNpd2dkR2hwY3k1MGFXeGxaRXhsZG1Wc0xtUnZiM0p6TENCcmJtOWphMFJ2YjNJc0lHNTFiR3dzSUhSb2FYTXBPMXh1SUNBZ0lIUm9hWE11WjJGdFpTNXdhSGx6YVdOekxtRnlZMkZrWlM1amIyeHNhV1JsS0hSb2FYTXVjR3hoZVdWeUxDQjBhR2x6TG5ScGJHVmtUR1YyWld3dVoyRjBaWE1zSUd0dWIyTnJSMkYwWlN3Z2JuVnNiQ3dnZEdocGN5azdYRzRnSUNBZ0x5OGdJRkpsYzJWMElIUm9aU0IwYUdsekxuQnNZWGxsY25NZ2RtVnNiMk5wZEhrZ0tHMXZkbVZ0Wlc1MEtWeHVJQ0FnSUhSb2FYTXVjR3hoZVdWeUxtSnZaSGt1ZG1Wc2IyTnBkSGt1ZUNBOUlEQTdYRzRnSUNBZ2RHaHBjeTV3YkdGNVpYSXVZbTlrZVM1MlpXeHZZMmwwZVM1NUlEMGdNRHRjYmx4dUlDQWdJR3hsZENCa2FYSmxZM1JwYjI0Z1BTQW5KenRjYmlBZ0lDQnpkMmwwWTJnZ0tIUnlkV1VwSUh0Y2JpQWdJQ0JqWVhObElIUm9hWE11WTNWeWMyOXljeTVzWldaMExtbHpSRzkzYmpwY2JpQWdJQ0FnSUdScGNtVmpkR2x2YmlBclBTQW5iR1ZtZENjN1hHNGdJQ0FnSUNCMGFHbHpMbkJzWVhsbGNpNWliMlI1TG5abGJHOWphWFI1TG5nZ1BTQXROVEE3WEc0Z0lDQWdJQ0IwYUdsekxuQnNZWGxsY2k1elkyRnNaUzU0SUQwZ01UdGNiaUFnSUNBZ0lHSnlaV0ZyTzF4dUlDQWdJR05oYzJVZ2RHaHBjeTVqZFhKemIzSnpMbkpwWjJoMExtbHpSRzkzYmpwY2JpQWdJQ0FnSUdScGNtVmpkR2x2YmlBclBTQW5jbWxuYUhRbk8xeHVJQ0FnSUNBZ2RHaHBjeTV3YkdGNVpYSXVZbTlrZVM1MlpXeHZZMmwwZVM1NElEMGdOVEE3WEc0Z0lDQWdJQ0IwYUdsekxuQnNZWGxsY2k1elkyRnNaUzU0SUQwZ0xURTdYRzRnSUNBZ0lDQmljbVZoYXp0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0J6ZDJsMFkyZ2dLSFJ5ZFdVcElIdGNiaUFnSUNCallYTmxJSFJvYVhNdVkzVnljMjl5Y3k1MWNDNXBjMFJ2ZDI0NlhHNGdJQ0FnSUNCa2FYSmxZM1JwYjI0Z0t6MGdKM1Z3Snp0Y2JpQWdJQ0FnSUhSb2FYTXVjR3hoZVdWeUxtSnZaSGt1ZG1Wc2IyTnBkSGt1ZVNBOUlDMDFNRHRjYmlBZ0lDQWdJR0p5WldGck8xeHVJQ0FnSUdOaGMyVWdkR2hwY3k1amRYSnpiM0p6TG1SdmQyNHVhWE5FYjNkdU9seHVJQ0FnSUNBZ1pHbHlaV04wYVc5dUlDczlJQ2RrYjNkdUp6dGNiaUFnSUNBZ0lIUm9hWE11Y0d4aGVXVnlMbUp2WkhrdWRtVnNiMk5wZEhrdWVTQTlJRFV3TzF4dUlDQWdJQ0FnWW5KbFlXczdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2FXWWdLR1JwY21WamRHbHZiaWtnZTF4dUlDQWdJQ0FnZEdocGN5NXdiR0Y1WlhJdVlXNXBiV0YwYVc5dWN5NXdiR0Y1S0NkM1lXeHJKeWs3WEc0Z0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lIUm9hWE11Y0d4aGVXVnlMbUZ1YVcxaGRHbHZibk11Y0d4aGVTZ25jMmwwSnlrN1hHNGdJQ0FnZlZ4dUlDQjlYRzU5WEc1Y2JrOWlhbVZqZEM1aGMzTnBaMjRvVkdsc1pXUk1aWFpsYkZOMFlYUmxMbkJ5YjNSdmRIbHdaU3dnVkdsc1pXUkpiblJsY25CeVpYUmxjaWs3WEc1bGVIQnZjblFnWkdWbVlYVnNkQ0JVYVd4bFpFeGxkbVZzVTNSaGRHVTdYRzRpWFgwPSIsInZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KG9iamVjdCwgcHJvcGVydHksIHJlY2VpdmVyKSB7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyByZXR1cm4gZ2V0KHBhcmVudCwgcHJvcGVydHksIHJlY2VpdmVyKTsgfSB9IGVsc2UgaWYgKFwidmFsdWVcIiBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5pbXBvcnQgVGlsZWRMZXZlbFN0YXRlIGZyb20gJy4uL2VuZ2luZS9UaWxlZExldmVsU3RhdGUnO1xuXG52YXIgU3RhdGUgPSBmdW5jdGlvbiAoX1RpbGVkTGV2ZWxTdGF0ZSkge1xuICBfaW5oZXJpdHMoU3RhdGUsIF9UaWxlZExldmVsU3RhdGUpO1xuXG4gIGZ1bmN0aW9uIFN0YXRlKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTdGF0ZSk7XG5cbiAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKFN0YXRlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3RhdGUpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhTdGF0ZSwgW3tcbiAgICBrZXk6ICdpbml0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgIHZhciBtYXAgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLm1hdGNoKC9tYXA9KFteJl0rKS8pO1xuICAgICAgaWYgKCFtYXApIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignQ2FuXFwndCBsb2FkIG1hcCBmcm9tIHVybCBwYXRoOiAnICsgd2luZG93LmxvY2F0aW9uLmhyZWYgKyAnLiBMb29raW5nIGZvciA/bWFwPW1hcEZvbGRlci9tYXBKc29uLmpzb24nKTtcbiAgICAgIH1cbiAgICAgIHZhciBtYXBQYXRoID0gJy9hc3NldHMvbWFwcy8nICsgbWFwWzFdO1xuICAgICAgY29uc29sZS5sb2coJ0xvYWRpbmcgbWFwICcgKyBtYXBQYXRoKTtcbiAgICAgIF9nZXQoU3RhdGUucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3RhdGUucHJvdG90eXBlKSwgJ2luaXQnLCB0aGlzKS5jYWxsKHRoaXMsIHsgbWFwUGF0aDogbWFwUGF0aCB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdwcmVsb2FkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcHJlbG9hZCgpIHtcbiAgICAgIF9nZXQoU3RhdGUucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3RhdGUucHJvdG90eXBlKSwgJ3ByZWxvYWQnLCB0aGlzKS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NyZWF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAgIF9nZXQoU3RhdGUucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3RhdGUucHJvdG90eXBlKSwgJ2NyZWF0ZScsIHRoaXMpLmNhbGwodGhpcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgX2dldChTdGF0ZS5wcm90b3R5cGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTdGF0ZS5wcm90b3R5cGUpLCAndXBkYXRlJywgdGhpcykuY2FsbCh0aGlzKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gU3RhdGU7XG59KFRpbGVkTGV2ZWxTdGF0ZSk7XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXRlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUwzTnlZeTl6WTNKcGNIUnpMMnhsZG1Wc1ZHVnpkR1Z5TDNOMFlYUmxMbXB6SWwwc0ltNWhiV1Z6SWpwYklsUnBiR1ZrVEdWMlpXeFRkR0YwWlNJc0lsTjBZWFJsSWl3aWJXRndJaXdpZDJsdVpHOTNJaXdpYkc5allYUnBiMjRpTENKelpXRnlZMmdpTENKdFlYUmphQ0lzSW1OdmJuTnZiR1VpTENKbGNuSnZjaUlzSW1oeVpXWWlMQ0p0WVhCUVlYUm9JaXdpYkc5bklsMHNJbTFoY0hCcGJtZHpJam9pT3pzN096czdPenM3TzBGQlFVRXNUMEZCVDBFc1pVRkJVQ3hOUVVFMFFpd3lRa0ZCTlVJN08wbEJSVTFETEVzN096czdPenM3T3pzN096SkNRVU5ITzBGQlEwd3NWVUZCVFVNc1RVRkJUVU1zVDBGQlQwTXNVVUZCVUN4RFFVRm5Ra01zVFVGQmFFSXNRMEZCZFVKRExFdEJRWFpDTEVOQlFUWkNMR0ZCUVRkQ0xFTkJRVm83UVVGRFFTeFZRVUZKTEVOQlFVTktMRWRCUVV3c1JVRkJWVHRCUVVOU1N5eG5Ra0ZCVVVNc1MwRkJVaXh4UTBGQkswTk1MRTlCUVU5RExGRkJRVkFzUTBGQlowSkxMRWxCUVM5RU8wRkJRMFE3UVVGRFJDeFZRVUZOUXl3MFFrRkJNRUpTTEVsQlFVa3NRMEZCU2l4RFFVRm9RenRCUVVOQlN5eGpRVUZSU1N4SFFVRlNMR3RDUVVFeVFrUXNUMEZCTTBJN1FVRkRRU3g1UjBGQlZ5eEZRVUZGUVN4blFrRkJSaXhGUVVGWU8wRkJRMFE3T3pzNFFrRkRVenRCUVVOU08wRkJRMFE3T3pzMlFrRkRVVHRCUVVOUU8wRkJRMFE3T3pzMlFrRkRVVHRCUVVOUU8wRkJRMFE3T3pzN1JVRnNRbWxDVml4bE96dEJRWEZDY0VJc1pVRkJaVU1zUzBGQlppSXNJbVpwYkdVaU9pSnpkR0YwWlM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJbWx0Y0c5eWRDQlVhV3hsWkV4bGRtVnNVM1JoZEdVZ1puSnZiU0FuTGk0dlpXNW5hVzVsTDFScGJHVmtUR1YyWld4VGRHRjBaU2M3WEc1Y2JtTnNZWE56SUZOMFlYUmxJR1Y0ZEdWdVpITWdWR2xzWldSTVpYWmxiRk4wWVhSbElIdGNiaUFnYVc1cGRDZ3BJSHRjYmlBZ0lDQmpiMjV6ZENCdFlYQWdQU0IzYVc1a2IzY3ViRzlqWVhScGIyNHVjMlZoY21Ob0xtMWhkR05vS0M5dFlYQTlLRnRlSmwwcktTOHBPMXh1SUNBZ0lHbG1JQ2doYldGd0tTQjdYRzRnSUNBZ0lDQmpiMjV6YjJ4bExtVnljbTl5S0dCRFlXNG5kQ0JzYjJGa0lHMWhjQ0JtY205dElIVnliQ0J3WVhSb09pQWtlM2RwYm1SdmR5NXNiMk5oZEdsdmJpNW9jbVZtZlM0Z1RHOXZhMmx1WnlCbWIzSWdQMjFoY0QxdFlYQkdiMnhrWlhJdmJXRndTbk52Ymk1cWMyOXVZQ2s3WEc0Z0lDQWdmVnh1SUNBZ0lHTnZibk4wSUcxaGNGQmhkR2dnUFNCZ0wyRnpjMlYwY3k5dFlYQnpMeVI3YldGd1d6RmRmV0E3WEc0Z0lDQWdZMjl1YzI5c1pTNXNiMmNvWUV4dllXUnBibWNnYldGd0lDUjdiV0Z3VUdGMGFIMWdLVHRjYmlBZ0lDQnpkWEJsY2k1cGJtbDBLSHNnYldGd1VHRjBhQ0I5S1R0Y2JpQWdmVnh1SUNCd2NtVnNiMkZrS0NrZ2UxeHVJQ0FnSUhOMWNHVnlMbkJ5Wld4dllXUW9LVHRjYmlBZ2ZWeHVJQ0JqY21WaGRHVW9LU0I3WEc0Z0lDQWdjM1Z3WlhJdVkzSmxZWFJsS0NrN1hHNGdJSDFjYmlBZ2RYQmtZWFJsS0NrZ2UxeHVJQ0FnSUhOMWNHVnlMblZ3WkdGMFpTZ3BPMXh1SUNCOVhHNTlYRzVjYm1WNGNHOXlkQ0JrWldaaGRXeDBJRk4wWVhSbE8xeHVJbDE5IiwiaW1wb3J0ICdiYWJlbC1wb2x5ZmlsbCc7XG5pbXBvcnQgbGV2ZWxUZXN0ZXIgZnJvbSAnLi9sZXZlbFRlc3Rlci9zdGF0ZSc7XG5cbnZhciB0cmFuc3BhcmVudCA9IGZhbHNlO1xudmFyIGFudGlhbGlhcyA9IGZhbHNlO1xudmFyIGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoMzIwLCAyNDAsIFBoYXNlci5BVVRPLCAnJywgd2luZG93LCB0cmFuc3BhcmVudCwgYW50aWFsaWFzKTtcblxuZ2FtZS5zdGF0ZS5hZGQoJ2xldmVsVGVzdGVyJywgbGV2ZWxUZXN0ZXIsIHRydWUpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpNHVMeTR1TDNOeVl5OXpZM0pwY0hSekwybHVaR1Y0TG1weklsMHNJbTVoYldWeklqcGJJbXhsZG1Wc1ZHVnpkR1Z5SWl3aWRISmhibk53WVhKbGJuUWlMQ0poYm5ScFlXeHBZWE1pTENKbllXMWxJaXdpVUdoaGMyVnlJaXdpUjJGdFpTSXNJa0ZWVkU4aUxDSjNhVzVrYjNjaUxDSnpkR0YwWlNJc0ltRmtaQ0pkTENKdFlYQndhVzVuY3lJNklrRkJRVUVzVDBGQlR5eG5Ra0ZCVUR0QlFVTkJMRTlCUVU5QkxGZEJRVkFzVFVGQmQwSXNjVUpCUVhoQ096dEJRVVZCTEVsQlFVMURMR05CUVdNc1MwRkJjRUk3UVVGRFFTeEpRVUZOUXl4WlFVRlpMRXRCUVd4Q08wRkJRMEVzU1VGQlRVTXNUMEZCVHl4SlFVRkpReXhQUVVGUFF5eEpRVUZZTEVOQlFXZENMRWRCUVdoQ0xFVkJRWEZDTEVkQlFYSkNMRVZCUVRCQ1JDeFBRVUZQUlN4SlFVRnFReXhGUVVGMVF5eEZRVUYyUXl4RlFVRXlRME1zVFVGQk0wTXNSVUZCYlVST0xGZEJRVzVFTEVWQlFXZEZReXhUUVVGb1JTeERRVUZpT3p0QlFVVkJReXhMUVVGTFN5eExRVUZNTEVOQlFWZERMRWRCUVZnc1EwRkJaU3hoUVVGbUxFVkJRVGhDVkN4WFFVRTVRaXhGUVVFeVF5eEpRVUV6UXlJc0ltWnBiR1VpT2lKcGJtUmxlQzVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYkltbHRjRzl5ZENBblltRmlaV3d0Y0c5c2VXWnBiR3duTzF4dWFXMXdiM0owSUd4bGRtVnNWR1Z6ZEdWeUlHWnliMjBnSnk0dmJHVjJaV3hVWlhOMFpYSXZjM1JoZEdVbk8xeHVYRzVqYjI1emRDQjBjbUZ1YzNCaGNtVnVkQ0E5SUdaaGJITmxPMXh1WTI5dWMzUWdZVzUwYVdGc2FXRnpJRDBnWm1Gc2MyVTdYRzVqYjI1emRDQm5ZVzFsSUQwZ2JtVjNJRkJvWVhObGNpNUhZVzFsS0RNeU1Dd2dNalF3TENCUWFHRnpaWEl1UVZWVVR5d2dKeWNzSUhkcGJtUnZkeXdnZEhKaGJuTndZWEpsYm5Rc0lHRnVkR2xoYkdsaGN5azdYRzVjYm1kaGJXVXVjM1JoZEdVdVlXUmtLQ2RzWlhabGJGUmxjM1JsY2ljc0lHeGxkbVZzVkdWemRHVnlMQ0IwY25WbEtUdGNiaUpkZlE9PSJdLCJuYW1lcyI6WyJyZXF1aXJlJCQwIiwiaXNPYmplY3QiLCJkb2N1bWVudCIsInJlcXVpcmUkJDEiLCJyZXF1aXJlJCQyIiwiYW5PYmplY3QiLCJ0b1ByaW1pdGl2ZSIsImRQIiwicmVxdWlyZSQkMyIsImNyZWF0ZURlc2MiLCJyZXF1aXJlJCQ0IiwiZ2xvYmFsIiwicmVkZWZpbmUiLCJQUk9UT1RZUEUiLCIkZXhwb3J0IiwiaGFzIiwiY29yZSIsIndrc0V4dCIsInRvSW50ZWdlciIsIm1pbiIsInRvSU9iamVjdCIsInNoYXJlZCIsInVpZCIsIiRrZXlzIiwiZ2V0S2V5cyIsImNvZiIsImVudW1CdWdLZXlzIiwiSUVfUFJPVE8iLCJyZXF1aXJlJCQ1IiwiZ09QTiIsInRvU3RyaW5nIiwicElFIiwiSUU4X0RPTV9ERUZJTkUiLCJnT1BEIiwicmVxdWlyZSQkNiIsInJlcXVpcmUkJDciLCJyZXF1aXJlJCQ4IiwicmVxdWlyZSQkOSIsInJlcXVpcmUkJDEwIiwicmVxdWlyZSQkMTEiLCJyZXF1aXJlJCQxMiIsInJlcXVpcmUkJDEzIiwicmVxdWlyZSQkMTQiLCJyZXF1aXJlJCQxNSIsInJlcXVpcmUkJDE2IiwicmVxdWlyZSQkMTciLCJyZXF1aXJlJCQxOCIsInJlcXVpcmUkJDE5IiwicmVxdWlyZSQkMjAiLCJyZXF1aXJlJCQyMSIsInJlcXVpcmUkJDIyIiwicmVxdWlyZSQkMjMiLCJyZXF1aXJlJCQyNCIsInJlcXVpcmUkJDI1IiwicmVxdWlyZSQkMjYiLCJyZXF1aXJlJCQyNyIsInJlcXVpcmUkJDI4IiwicmVxdWlyZSQkMjkiLCIkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZGVmaW5lZCIsInRvT2JqZWN0IiwiT2JqZWN0UHJvdG8iLCJtZXRhIiwiZ09QUyIsIklPYmplY3QiLCJUQUciLCJhRnVuY3Rpb24iLCJmYWlscyIsIiRwYXJzZUludCIsIiRwYXJzZUZsb2F0IiwiJHRyaW0iLCJmbG9vciIsIiRmYWlscyIsImFOdW1iZXJWYWx1ZSIsIiRleHBtMSIsInNpZ24iLCJwb3ciLCJhYnMiLCJleHAiLCJleHBtMSIsInRvSW5kZXgiLCJ0b0xlbmd0aCIsInNldFRvU3RyaW5nVGFnIiwiTElCUkFSWSIsImhpZGUiLCJnZXRQcm90b3R5cGVPZiIsIiRhdCIsIk1BVENIIiwiY29udGV4dCIsImdldFRpbWUiLCJOVU1CRVIiLCJUT19QUklNSVRJVkUiLCJwcm90byIsIkl0ZXJhdG9ycyIsIklURVJBVE9SIiwiJGRlZmluZVByb3BlcnR5IiwiY2xhc3NvZiIsImN0eCIsImNyZWF0ZVByb3BlcnR5IiwiYXJyYXlTbGljZSIsInRlc3QiLCJpc0FycmF5IiwiJHJlZHVjZSIsIiRuYXRpdmUiLCJORUdBVElWRV9aRVJPIiwiQXJyYXlQcm90byIsIiRmaW5kIiwiS0VZIiwiZm9yY2VkIiwiREVTQ1JJUFRPUlMiLCJTUEVDSUVTIiwiaW5oZXJpdElmUmVxdWlyZWQiLCJpc1JlZ0V4cCIsIkJhc2UiLCJrZXlzIiwiaSIsIiRmbGFncyIsIlRPX1NUUklORyIsIiR0b1N0cmluZyIsImRlZmluZSIsIndrcyIsImludm9rZSIsImh0bWwiLCJwcm9jZXNzIiwiUHJvbWlzZSIsImlzTm9kZSIsInNwZWNpZXNDb25zdHJ1Y3RvciIsIlR5cGVFcnJvciIsIlVTRV9OQVRJVkUiLCJjcmVhdGUiLCJhbkluc3RhbmNlIiwiZm9yT2YiLCJzdGVwIiwicmVkZWZpbmVBbGwiLCJzdHJvbmciLCJpZCIsIlZJRVciLCJyZXF1aXJlJCQzMCIsInJlcXVpcmUkJDMxIiwicmVxdWlyZSQkMzIiLCJyZXF1aXJlJCQzMyIsInJlcXVpcmUkJDM0IiwicmVxdWlyZSQkMzUiLCJyZXF1aXJlJCQzNiIsInJlcXVpcmUkJDM3IiwicmVxdWlyZSQkMzgiLCJSZWZsZWN0IiwicmVwZWF0IiwiJHBhZCIsImlzRW51bSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsInN0b3JlIiwib3JkaW5hcnlEZWZpbmVPd25NZXRhZGF0YSIsInRvTWV0YUtleSIsIm1ldGFkYXRhIiwiZ2V0T3JDcmVhdGVNZXRhZGF0YU1hcCIsIm9yZGluYXJ5SGFzT3duTWV0YWRhdGEiLCJvcmRpbmFyeUdldE93bk1ldGFkYXRhIiwiZnJvbSIsIm9yZGluYXJ5T3duTWV0YWRhdGFLZXlzIiwibWljcm90YXNrIiwid3JhcCIsIk5BTUUiLCJrZXkiLCJ0aGlzIiwiX2NyZWF0ZUNsYXNzIiwiX2NsYXNzQ2FsbENoZWNrIiwiX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4iLCJfaW5oZXJpdHMiLCJsZXZlbFRlc3RlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSSxNQUFNLEdBQUcsY0FBYyxHQUFH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LFNBQVMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDO01BQzlELElBQUksVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQzs7TUFFaEQsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEdBQUcsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO01BQ2pGLE1BQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O1FBRXZDLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7VUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7VUFFdEQsR0FBRyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFVBQVU7WUFDbkUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO1dBQzlGLENBQUMsQ0FBQztVQUNILEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENB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LEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7Q0FDOUMsQ0FBQzs7QUFFRixJQUFJLFNBQVMsR0FBRyxTQUFTLEtBQUssQ0FBQztFQUM3QixPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNuRSxDQUFDO0FBQ0YsSUFBSSxNQUFNLEdBQUcsU0FBUyxFQUFFLENBQUM7RUFDdkIsT0FBTyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztDQUNwQixDQUFDO0FBQ0YsSUFBSSxPQUFPLEdBQUcsU0FBUyxFQUFFLENBQUM7RUFDeEIsT0FBTyxDQUFDLEVBQUUsR0FBRyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztDQUNwQyxDQUFDO0FBQ0YsSUFBSSxPQUFPLEdBQUcsU0FBUyxFQUFFLENBQUM7RUFDeEIsT0FBTyxDQUFDLEVBQUUsR0FBRyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztDQUN0RSxDQUFDO0FBQ0YsSUFBSSxPQUFPLEdBQUcsU0FBUyxFQUFFLENBQUM7RUFDeEIsT0FBTyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUMvQixDQUFDO0FBQ0YsSUFBSSxPQUFPLEdBQUcsU0FBUyxFQUFFLENBQUM7RUFDeEIsT0FBTyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUMvQixDQUFDOztBQUVGLElBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUM7RUFDeEMsRUFB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QUFHLFFBQVEsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDakMsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNuRCxPQUFPLE1BQU0sQ0FBQztHQUNmLENBQUM7O0VBRUYsSUFBSSxTQUFTLEdBQUcsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQztJQUN6QyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7R0FDN0QsQ0FBQzs7RUFFRixJQUFJLEtBQUssR0FBRyxTQUFTLElBQUksQ0FBQyxNQUFNLHVCQUF1QjtJQUNyRCxJQUFJLENBQUMsU0FBUyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksTUFBTSxTQUFTLENBQUMsTUFBTTtRQUMxQixLQUFLLEtBQUssSUFBSSxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUztRQUM3QyxPQUFPLEdBQUcsS0FBSyxLQUFLLFNBQVM7UUFDN0IsTUFBTSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUM7SUFDOUMsR0FBRyxNQUFNLElBQUksU0FBUyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO01BQzdDLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNyRixNQUFN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QUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdkc7R0FDRixFQUFFO0lBQ0QsR0FBRyxFQUFFLFFBQVE7SUFDYixLQUFLLEVBQUUsU0FBUyxNQUFNLEdBQUc7TUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdEc7R0FDRixFQUFFO0lBQ0QsR0FBRyxFQUFFLFFBQVE7SUFDYixLQUFLLEVBQUUsU0FBUyxNQUFNLEdBQUc7TUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdEc7R0FDRixDQUFDLENBQUMsQ0FBQzs7RUFFSixPQUFPLEtBQUssQ0FBQztDQUNkLENBQUMsZUFBZSxDQUFDLENBQUMsQUFFbkIsQUFBcUIsQUFDckI7O0FDbERBLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztBQUN4QixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDdEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQzs7QUFFdEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFSSxLQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQUFDakQ7OyJ9
