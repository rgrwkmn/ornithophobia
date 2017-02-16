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

var cof = _cof;
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

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

var $keys$2      = _objectKeysInternal;
var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

var f$6 = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys$2(O, hiddenKeys);
};

var _objectGopn = {
	f: f$6
};

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

var $export$5 = _export;
var core$2    = _core;
var fails   = _fails;
var _objectSap = function(KEY, exec){
  var fn  = (core$2.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export$5($export$5.S + $export$5.F * fails(function(){ fn(1); }), 'Object', exp);
};

var toIObject$6                 = _toIobject;
var $getOwnPropertyDescriptor$1 = _objectGopd.f;

_objectSap('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor$1(toIObject$6(it), key);
  };
});

var defined$1 = _defined;
var _toObject = function(it){
  return Object(defined$1(it));
};

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

var toObject        = _toObject;
var $getPrototypeOf = _objectGpo;

_objectSap('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

var toObject$2 = _toObject;
var $keys$3    = _objectKeys;

_objectSap('keys', function(){
  return function keys(it){
    return $keys$3(toObject$2(it));
  };
});

_objectSap('getOwnPropertyNames', function(){
  return _objectGopnExt.f;
});

var isObject$3 = _isObject;
var meta     = _meta.onFreeze;

_objectSap('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject$3(it) ? $freeze(meta(it)) : it;
  };
});

var isObject$4 = _isObject;
var meta$1     = _meta.onFreeze;

_objectSap('seal', function($seal){
  return function seal(it){
    return $seal && isObject$4(it) ? $seal(meta$1(it)) : it;
  };
});

var isObject$5 = _isObject;
var meta$2     = _meta.onFreeze;

_objectSap('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject$5(it) ? $preventExtensions(meta$2(it)) : it;
  };
});

var isObject$6 = _isObject;

_objectSap('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject$6(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

var isObject$7 = _isObject;

_objectSap('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject$7(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

var isObject$8 = _isObject;

_objectSap('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject$8(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

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

var $export$6 = _export;

$export$6($export$6.S + $export$6.F, 'Object', {assign: _objectAssign});

// 7.2.9 SameValue(x, y)
var _sameValue = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

var $export$7 = _export;
$export$7($export$7.S, 'Object', {is: _sameValue});

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

var $export$8 = _export;
$export$8($export$8.S, 'Object', {setPrototypeOf: _setProto.set});

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

var $export$15 = _export;

$export$15($export$15.S, 'Number', {EPSILON: Math.pow(2, -52)});

var $export$16   = _export;
var _isFinite = _global.isFinite;

$export$16($export$16.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});

var isObject$13 = _isObject;
var floor$2    = Math.floor;
var _isInteger = function isInteger(it){
  return !isObject$13(it) && isFinite(it) && floor$2(it) === it;
};

var $export$17 = _export;

$export$17($export$17.S, 'Number', {isInteger: _isInteger});

var $export$18 = _export;

$export$18($export$18.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});

var $export$19   = _export;
var isInteger = _isInteger;
var abs       = Math.abs;

$export$19($export$19.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

var $export$20 = _export;

$export$20($export$20.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

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

var $export$25 = _export;
var $asinh  = Math.asinh;

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0 
$export$25($export$25.S + $export$25.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});

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

var $export$27 = _export;
var sign    = _mathSign;

$export$27($export$27.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

var $export$28 = _export;

$export$28($export$28.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

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

var $export$30 = _export;
var $expm1  = _mathExpm1;

$export$30($export$30.S + $export$30.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});

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

var $export$34 = _export;

$export$34($export$34.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});

var $export$35 = _export;

$export$35($export$35.S, 'Math', {log1p: _mathLog1p});

var $export$36 = _export;

$export$36($export$36.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});

var $export$37 = _export;

$export$37($export$37.S, 'Math', {sign: _mathSign});

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

var isObject$14 = _isObject;
var cof$5      = _cof;
var MATCH    = _wks('match');
var _isRegexp = function(it){
  var isRegExp;
  return isObject$14(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof$5(it) == 'RegExp');
};

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

_stringHtml('anchor', function(createHTML){
  return function anchor(name){
    return createHTML(this, 'a', 'name', name);
  }
});

_stringHtml('big', function(createHTML){
  return function big(){
    return createHTML(this, 'big', '', '');
  }
});

_stringHtml('blink', function(createHTML){
  return function blink(){
    return createHTML(this, 'blink', '', '');
  }
});

_stringHtml('bold', function(createHTML){
  return function bold(){
    return createHTML(this, 'b', '', '');
  }
});

_stringHtml('fixed', function(createHTML){
  return function fixed(){
    return createHTML(this, 'tt', '', '');
  }
});

_stringHtml('fontcolor', function(createHTML){
  return function fontcolor(color){
    return createHTML(this, 'font', 'color', color);
  }
});

_stringHtml('fontsize', function(createHTML){
  return function fontsize(size){
    return createHTML(this, 'font', 'size', size);
  }
});

_stringHtml('italics', function(createHTML){
  return function italics(){
    return createHTML(this, 'i', '', '');
  }
});

_stringHtml('link', function(createHTML){
  return function link(url){
    return createHTML(this, 'a', 'href', url);
  }
});

_stringHtml('small', function(createHTML){
  return function small(){
    return createHTML(this, 'small', '', '');
  }
});

_stringHtml('strike', function(createHTML){
  return function strike(){
    return createHTML(this, 'strike', '', '');
  }
});

_stringHtml('sub', function(createHTML){
  return function sub(){
    return createHTML(this, 'sub', '', '');
  }
});

_stringHtml('sup', function(createHTML){
  return function sup(){
    return createHTML(this, 'sup', '', '');
  }
});

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

var $export$53 = _export;

$export$53($export$53.S, 'Array', {isArray: _isArray});

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

var speciesConstructor = _arraySpeciesConstructor;

var _arraySpeciesCreate = function(original, length){
  return new (speciesConstructor(original))(length);
};

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

var UNSCOPABLES = _wks('unscopables');
var ArrayProto$1  = Array.prototype;
if(ArrayProto$1[UNSCOPABLES] == undefined)_hide(ArrayProto$1, UNSCOPABLES, {});
var _addToUnscopables = function(key){
  ArrayProto$1[UNSCOPABLES][key] = true;
};

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

var $export$69 = _export;

$export$69($export$69.P, 'Array', {fill: _arrayFill});

_addToUnscopables('fill');

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

_fixReWks('match', 1, function(defined, MATCH, $match){
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

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

_fixReWks('search', 1, function(defined, SEARCH, $search){
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});

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

var $export$79  = _export;
var gOPD$3     = _objectGopd.f;
var anObject$15 = _anObject;

$export$79($export$79.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = gOPD$3(anObject$15(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

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

var gOPD$5     = _objectGopd;
var $export$82  = _export;
var anObject$18 = _anObject;

$export$82($export$82.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return gOPD$5.f(anObject$18(target), propertyKey);
  }
});

var $export$83  = _export;
var getProto = _objectGpo;
var anObject$19 = _anObject;

$export$83($export$83.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject$19(target));
  }
});

var $export$84 = _export;

$export$84($export$84.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});

var $export$85       = _export;
var anObject$20      = _anObject;
var $isExtensible = Object.isExtensible;

$export$85($export$85.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject$20(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

var gOPN$4     = _objectGopn;
var gOPS$2     = _objectGops;
var anObject$21 = _anObject;
var Reflect$1  = _global.Reflect;
var _ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it){
  var keys       = gOPN$4.f(anObject$21(it))
    , getSymbols = gOPS$2.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

var $export$86 = _export;

$export$86($export$86.S, 'Reflect', {ownKeys: _ownKeys});

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

var $export$90   = _export;
var $includes = _arrayIncludes(true);

$export$90($export$90.P, 'Array', {
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

_addToUnscopables('includes');

var $export$91 = _export;
var $at$2     = _stringAt(true);

$export$91($export$91.P, 'String', {
  at: function at(pos){
    return $at$2(this, pos);
  }
});

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

var $export$92 = _export;
var $pad    = _stringPad;

$export$92($export$92.P, 'String', {
  padStart: function padStart(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

var $export$93 = _export;
var $pad$1    = _stringPad;

$export$93($export$93.P, 'String', {
  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
    return $pad$1(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

_stringTrim('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
}, 'trimStart');

_stringTrim('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
}, 'trimEnd');

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

var $export$96 = _export;
var $values = _objectToArray(false);

$export$96($export$96.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});

var $export$97  = _export;
var $entries = _objectToArray(true);

$export$97($export$97.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});

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

var classof$3 = _classof;
var from    = _arrayFromIterable;
var _collectionToJson = function(NAME){
  return function toJSON(){
    if(classof$3(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

var $export$102  = _export;

$export$102($export$102.P + $export$102.R, 'Map', {toJSON: _collectionToJson('Map')});

var $export$103  = _export;

$export$103($export$103.P + $export$103.R, 'Set', {toJSON: _collectionToJson('Set')});

var $export$104 = _export;

$export$104($export$104.S, 'System', {global: _global});

var $export$105 = _export;
var cof$7     = _cof;

$export$105($export$105.S, 'Error', {
  isError: function isError(it){
    return cof$7(it) === 'Error';
  }
});

var $export$106 = _export;

$export$106($export$106.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

var $export$107 = _export;

$export$107($export$107.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

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
      // TODO fix this set.image.replace regex hack, this is essentially hard coded
      _this2.load.image(set.name, 'assets/' + set.image.replace(/(\.\.\/)+/, ''));
    });
    // load object sprites
    this.getSpritesFromTilemap(this.tilemap).forEach(function (object) {
      _this2.load.spritesheet(object.properties.sprite, 'assets/' + object.properties.sprite.replace(/(\.\.\/)+/, ''), object.width, object.height);
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

    // TODO need more data about objects/entities in tiled in order to do this
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


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zY3JpcHRzL2VuZ2luZS9UaWxlZEludGVycHJldGVyLmpzIl0sIm5hbWVzIjpbIlRpbGVkSW50ZXJwcmV0ZXIiLCJwcmVsb2FkVGlsZW1hcCIsIm5hbWUiLCJqc29uTG9jYXRpb24iLCJsb2FkIiwib25GaWxlQ29tcGxldGUiLCJhZGQiLCJwcm9ncmVzcyIsImtleSIsInByZWxvYWRUaWxlbWFwQXNzZXRzIiwidGlsZW1hcCIsIlBoYXNlciIsIlRpbGVtYXAiLCJUSUxFRF9KU09OIiwiY2FjaGUiLCJnZXRUaWxlbWFwRGF0YSIsImRhdGEiLCJ0aWxlc2V0cyIsImZvckVhY2giLCJpbWFnZSIsInNldCIsInJlcGxhY2UiLCJnZXRTcHJpdGVzRnJvbVRpbGVtYXAiLCJzcHJpdGVzaGVldCIsIm9iamVjdCIsInByb3BlcnRpZXMiLCJzcHJpdGUiLCJ3aWR0aCIsImhlaWdodCIsIm9iamVjdHNCeVNwcml0ZU1hcCIsImxheWVycyIsInJlZHVjZSIsIm9iamVjdHNCeVNwcml0ZSIsImxheWVyIiwib2JqZWN0cyIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJjcmVhdGVUaWxlbWFwIiwiZ2FtZSIsImFkZFRpbGVzZXRJbWFnZSIsInRpbGV3aWR0aCIsInRpbGVoZWlnaHQiLCJpbml0aWF0ZVRpbGVkT2JqZWN0R3JvdXBzIiwiZ3JvdXBzIiwib2JqZWN0c0J5VHlwZSIsImFycmFuZ2VPYmplY3RzQnlUeXBlIiwidHlwZSIsImdyb3VwIiwiZW5hYmxlQm9keSIsImNyZWF0ZVNwcml0ZUZyb21UaWxlZE9iamVjdCIsIml0ZW0iLCJwdXNoIiwiY29uc29sZSIsIndhcm4iLCJnZXRPYmplY3RzRnJvbVRpbGVtYXAiLCJjb25jYXQiLCJlcnJvciIsImNyZWF0ZSIsIngiLCJ5IiwiZ2FtZURhdGEiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FBSUEsSUFBTUEsbUJBQW1CO0FBQ3ZCQyxnQkFEdUIsMEJBQ1JDLElBRFEsRUFDRkMsWUFERSxF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LE9BQVA7QUFDRCxLQUxNLEVBS0osRUFMSSxDQUFQO0FBTUQsR0FuRnNCOztBQW9GdkI7Ozs7OztBQU1BZ0IsNkJBMUZ1Qix1Q0EwRksxQixNQTFGTCxFQTBGYXdCLEtBMUZiLEVBMEZvQjtBQUN6QyxRQUFJLENBQUN4QixPQUFPQyxVQUFSLElBQXNCLENBQUNELE9BQU9DLFVBQVAsQ0FBa0JDLE1BQTdDLEVBQXFEO0FBQ25EMkIsY0FBUUksS0FBUixDQUFjLDhCQUFkLEVBQThDakMsTUFBOUM7QUFDQTtBQUNEO0FBQ0QsUUFBTUUsU0FBU3NCLE1BQU1VLE1BQU4sQ0FBYWxDLE9BQU9tQyxDQUFwQixFQUF1Qm5DLE9BQU9vQyxDQUFQLEdBQVdwQyxPQUFPSSxNQUF6QyxFQUFpREosT0FBT0MsVUFBUCxDQUFrQkMsTUFBbkUsQ0FBZjtBQUNBQSxXQUFPbUMsUUFBUCxHQUFrQjtBQUNoQjNELFlBQU1zQixPQUFPdEIsSUFERztBQUVoQjZDLFlBQU12QixPQUFPdUI7QUFGRyxLQUFsQjtBQUlBWixXQUFPMkIsTUFBUCxDQUFjcEMsT0FBT21DLFFBQXJCLEVBQStCckMsT0FBT0MsVUFBdEM7QUFDQSxXQUFPQyxNQUFQO0FBQ0Q7QUF0R3NCLENBQXpCOztBQXlHQSxlQUFlMUIsZ0JBQWYiLCJmaWxlIjoiVGlsZWRJbnRlcnByZXRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTWV0aG9kcyBmb3IgaW50ZXJwcmV0aW5nIFRpbGVkIG1hcCBkYXRhIGludG8gdGhlIGdhbWVcbiAqIGludGVuZGVkIHRvIGV4dGVuZCBQaGFzZXIuU3RhdGVcbiAqL1xuY29uc3QgVGlsZWRJbnRlcnByZXRlciA9IHtcbiAgcHJlbG9hZFRpbGVtYXAobmFtZSwganNvbkxvY2F0aW9uKSB7XG4gICAgdGhpcy5sb2FkLm9uRmlsZUNvbXBsZXRlLmFkZCgocHJvZ3Jlc3MsIGtleSkgPT4ge1xuICAgICAgaWYgKGtleSA9PT0gbmFtZSkge1xuICAgICAgICB0aGlzLnByZWxvYWRUaWxlbWFwQXNzZXRzKG5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMubG9hZC50aWxlbWFwKG5hbWUsIGpzb25Mb2NhdGlvbiwgbnVsbCwgUGhhc2VyLlRpbGVtYXAuVElMRURfSlNPTik7XG4gIH0sXG4gIHByZWxvYWRUaWxlbWFwQXNzZXRzKG5hbWUpIHtcbiAgICB0aGlzLnRpbGVtYXAgPSB0aGlzLmNhY2hlLmdldFRpbGVtYXBEYXRhKG5hbWUpO1xuICAgIC8vIGxvYWQgdGlsZXNldCBpbWFnZXNcbiAgICB0aGlzLnRpbGVtYXAuZGF0YS50aWxlc2V0cy5mb3JFYWNoKHNldCA9PiB7XG4gICAgICAvLyBUT0RPIGZpeCB0aGlzIHNldC5pbWFnZS5yZXBsYWNlIHJlZ2V4IGhhY2ssIHRoaXMgaXMgZXNzZW50aWFsbHkgaGFyZCBjb2RlZFxuICAgICAgdGhpcy5sb2FkLmltYWdlKHNldC5uYW1lLCBgYXNzZXRzLyR7c2V0LmltYWdlLnJlcGxhY2UoLyhcXC5cXC5cXC8pKy8sICcnKX1gKTtcbiAgICB9KTtcbiAgICAvLyBsb2FkIG9iamVjdCBzcHJpdGVzXG4gICAgdGhpcy5nZXRTcHJpdGVzRnJvbVRpbGVtYXAodGhpcy50aWxlbWFwKS5mb3JFYWNoKG9iamVjdCA9PiB7XG4gICAgICB0aGlzLmxvYWQuc3ByaXRlc2hlZXQoXG4gICAgICAgIG9iamVjdC5wcm9wZXJ0aWVzLnNwcml0ZSxcbiAgICAgICAgYGFzc2V0cy8ke29iamVjdC5wcm9wZXJ0aWVzLnNwcml0ZS5yZXBsYWNlKC8oXFwuXFwuXFwvKSsvLCAnJyl9YCxcbiAgICAgICAgb2JqZWN0LndpZHRoLFxuICAgICAgICBvYmplY3QuaGVpZ2h0XG4gICAgICApO1xuICAgIH0pO1xuICB9LFxuICBnZXRTcHJpdGVzRnJvbVRpbGVtYXAodGlsZW1hcCkge1xuICAgIGNvbnN0IG9iamVjdHNCeVNwcml0ZU1hcCA9IHRpbGVtYXAuZGF0YS5sYXllcnMucmVkdWNlKChvYmplY3RzQnlTcHJpdGUsIGxheWVyKSA9PiB7XG4gICAgICBpZiAobGF5ZXIub2JqZWN0cykge1xuICAgICAgICBsYXllci5vYmplY3RzLmZvckVhY2gob2JqZWN0ID0+IHtcbiAgICAgICAgICBpZiAob2JqZWN0LnByb3BlcnRpZXMgJiYgb2JqZWN0LnByb3BlcnRpZXMuc3ByaXRlICYmICFvYmplY3RzQnlTcHJpdGVbb2JqZWN0LnByb3BlcnRpZXMuc3ByaXRlXSkge1xuICAgICAgICAgICAgb2JqZWN0c0J5U3ByaXRlW29iamVjdC5wcm9wZXJ0aWVzLnNwcml0ZV0gPSBvYmplY3Q7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmplY3RzQnlTcHJpdGU7XG4gICAgfSwge30pO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmplY3RzQnlTcHJpdGVNYXApLm1hcChrZXkgPT4gb2JqZWN0c0J5U3ByaXRlTWFwW2tleV0pO1xuICB9LFxuICBjcmVhdGVUaWxlbWFwKG5hbWUpIHtcbiAgICBjb25zdCBtYXAgPSB0aGlzLmdhbWUuYWRkLnRpbGVtYXAobmFtZSk7XG4gICAgdGhpcy50aWxlbWFwLmRhdGEudGlsZXNldHMuZm9yRWFjaChzZXQgPT4ge1xuICAgICAgbWFwLmFkZFRpbGVzZXRJbWFnZShcbiAgICAgICAgc2V0Lm5hbWUsXG4gICAgICAgIHNldC5uYW1lLFxuICAgICAgICBzZXQudGlsZXdpZHRoLFxuICAgICAgICBzZXQudGlsZWhlaWdodFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBtYXA7XG4gIH0sXG4gIGluaXRpYXRlVGlsZWRPYmplY3RHcm91cHMobWFwKSB7XG4gICAgLy8gVE9ETyBuZWVkIG1vcmUgZGF0YSBhYm91dCBvYmplY3RzL2VudGl0aWVzIGluIHRpbGVkIGluIG9yZGVyIHRvIGRvIHRoaXNcbiAgICBjb25zdCBncm91cHMgPSB7fTtcbiAgICBjb25zdCBvYmplY3RzQnlUeXBlID0gdGhpcy5hcnJhbmdlT2JqZWN0c0J5VHlwZShtYXAub2JqZWN0cyk7XG4gICAgT2JqZWN0LmtleXMob2JqZWN0c0J5VHlwZSkuZm9yRWFjaCh0eXBlID0+IHtcbiAgICAgIGdyb3Vwc1t0eXBlXSA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICAgIGdyb3Vwc1t0eXBlXS5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICAgIG9iamVjdHNCeVR5cGVbdHlwZV0uZm9yRWFjaChpdGVtID0+IHRoaXMuY3JlYXRlU3ByaXRlRnJvbVRpbGVkT2JqZWN0KGl0ZW0sIGdyb3Vwc1t0eXBlXSkpO1xuICAgIH0pO1xuICAgIHJldHVybiBncm91cHM7XG4gIH0sXG4gIGFycmFuZ2VPYmplY3RzQnlUeXBlKG9iamVjdHMpIHtcbiAgICByZXR1cm4gb2JqZWN0cy5yZWR1Y2UoKG9iamVjdHMsIG9iamVjdCkgPT4ge1xuICAgICAgaWYgKG9iamVjdC50eXBlKSB7XG4gICAgICAgIGlmICghb2JqZWN0c1tvYmplY3QudHlwZV0pIHtcbiAgICAgICAgICBvYmplY3RzW29iamVjdC50eXBlXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIG9iamVjdHNbb2JqZWN0LnR5cGVdLnB1c2gob2JqZWN0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2Fybignb2JqZWN0IGZvdW5kIHdpdGhvdXQgdHlwZScsIG9iamVjdC5uYW1lLCBvYmplY3QpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9iamVjdHM7XG4gICAgfSwge30pO1xuICB9LFxuICBnZXRPYmplY3RzRnJvbVRpbGVtYXAodGlsZW1hcCkge1xuICAgIHJldHVybiB0aWxlbWFwLmRhdGEubGF5ZXJzLnJlZHVjZSgob2JqZWN0cywgbGF5ZXIpID0+IHtcbiAgICAgIGlmIChsYXllci5vYmplY3RzKSB7XG4gICAgICAgIG9iamVjdHMgPSBvYmplY3RzLmNvbmNhdChsYXllci5vYmplY3RzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmplY3RzO1xuICAgIH0sIFtdKTtcbiAgfSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBQaGFzZXIgc3ByaXRlIGluIGEgc3ByaXRlIGdyb3VwIGZyb20gYSBUaWxlZCBvYmplY3RcbiAgICogQHBhcmFtICB7b2JqZWN0fSBvYmplY3QgVGhlIFRpbGVkIG9iamVjdFxuICAgKiBAcGFyYW0gIHtncm91cH0gZ3JvdXAgICBUaGUgUGhhc2VyIHNwcml0ZSBncm91cFxuICAgKiBAcmV0dXJuIHtTcHJpdGV9ICAgICAgICBUaGUgUGhhc2VyIHNwcml0ZVxuICAgKi9cbiAgY3JlYXRlU3ByaXRlRnJvbVRpbGVkT2JqZWN0KG9iamVjdCwgZ3JvdXApIHtcbiAgICBpZiAoIW9iamVjdC5wcm9wZXJ0aWVzIHx8ICFvYmplY3QucHJvcGVydGllcy5zcHJpdGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ25vIHNwcml0ZSBkZWZpbmVkIGZvciBvYmplY3QnLCBvYmplY3QpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzcHJpdGUgPSBncm91cC5jcmVhdGUob2JqZWN0LngsIG9iamVjdC55IC0gb2JqZWN0LmhlaWdodCwgb2JqZWN0LnByb3BlcnRpZXMuc3ByaXRlKTtcbiAgICBzcHJpdGUuZ2FtZURhdGEgPSB7XG4gICAgICBuYW1lOiBvYmplY3QubmFtZSxcbiAgICAgIHR5cGU6IG9iamVjdC50eXBlXG4gICAgfTtcbiAgICBPYmplY3QuYXNzaWduKHNwcml0ZS5nYW1lRGF0YSwgb2JqZWN0LnByb3BlcnRpZXMpO1xuICAgIHJldHVybiBzcHJpdGU7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRpbGVkSW50ZXJwcmV0ZXI7XG4iXX0=

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function collect(entity, item) {
  console.log(entity.key, 'collects', item.gameData.displayName);
  if (!entity.inventory) {
    entity.inventory = [];
  }
  entity.inventory.push(item.gameData);
  item.destroy();
}

function consume(entity, item) {
  console.log(entity.key, 'consumes', item.gameData.displayName);
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
      console.log('you used the ' + item.displayName + ' key on the door and it opened');
      return;
    }
  }
  console.log('need some key for this door idiot');
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
    console.log('the gate has a handle on this side, you opened it');
  } else {
    console.log('the gate does not open from this side');
  }
}

var State = function (_Phaser$State) {
  _inherits(State, _Phaser$State);

  function State() {
    _classCallCheck(this, State);

    return _possibleConstructorReturn(this, (State.__proto__ || Object.getPrototypeOf(State)).apply(this, arguments));
  }

  _createClass(State, [{
    key: 'init',
    value: function init() {
      Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
    }
  }, {
    key: 'preload',
    value: function preload() {
      this.preloadTilemap('level1', 'assets/maps/larger.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.spritesheet('player', 'assets/sprites/player.png', 16, 16);
    }
  }, {
    key: 'create',
    value: function create() {
      var _this2 = this;

      // loading screen will have a white background
      this.game.stage.backgroundColor = '#000';

      // scaling options
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

      // have the game centered horizontally
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;

      this.map = this.createTilemap('level1');

      this.mapLayers = [];
      this.collideLayers = [];

      this.map.layers.forEach(function (layer) {
        var createdLayer = _this2.map.createLayer(layer.name);
        createdLayer.resizeWorld();
        _this2.mapLayers.push(createdLayer);
        if (layer.properties.impassable) {
          _this2.collideLayers.push(createdLayer);
          _this2.map.setCollisionByExclusion([], true, createdLayer);
        }
      });

      var objectsByType = this.arrangeObjectsByType(this.getObjectsFromTilemap(this.tilemap));

      if (objectsByType.Consumable) {
        this.consumables = this.game.add.group();
        this.consumables.enableBody = true;
        var consumables = objectsByType.Consumable;
        consumables.forEach(function (item) {
          return _this2.createSpriteFromTiledObject(item, _this2.consumables);
        });
      }

      if (objectsByType.Key) {
        this.keys = this.game.add.group();
        this.keys.enableBody = true;
        var keys = objectsByType.Key;
        keys.forEach(function (item) {
          return _this2.createSpriteFromTiledObject(item, _this2.keys);
        });
      }

      if (objectsByType.Door) {
        this.doors = this.game.add.group();
        this.doors.enableBody = true;
        var doors = objectsByType.Door;
        doors.forEach(function (item) {
          var sprite = _this2.createSpriteFromTiledObject(item, _this2.doors);
          sprite.body.moves = false;
        });
      }

      if (objectsByType.Gate) {
        this.gates = this.game.add.group();
        this.gates.enableBody = true;
        var gates = objectsByType.Gate;
        gates.forEach(function (item) {
          var sprite = _this2.createSpriteFromTiledObject(item, _this2.gates);
          sprite.body.moves = false;
        });
      }

      this.physics.startSystem(Phaser.Physics.ARCADE);

      // add player
      var playerStart = objectsByType.PlayerStart[0];
      this.player = this.add.sprite(playerStart.x, playerStart.y - playerStart.height, 'player');
      this.physics.arcade.enable(this.player);
      this.player.animations.add('walk', [1, 2], 10, true);
      this.player.anchor.setTo(0.5, 1);
      this.player.body.setSize(10, 8, 3, 8);
      this.game.camera.follow(this.player);

      this.cursors = this.game.input.keyboard.createCursorKeys();

      console.log('you awaken in a rocky forest');
      console.log('there are pixels around you that should probably be transparent');
      console.log('you somehow know that in order to leave this place');
      console.log('you will have to unlock some doors...');
    }
  }, {
    key: 'update',
    value: function update() {
      var _this3 = this;

      this.collideLayers.forEach(function (layer) {
        _this3.game.physics.arcade.collide(_this3.player, layer);
      });
      this.game.physics.arcade.overlap(this.player, this.consumables, consume, null, this);
      this.game.physics.arcade.overlap(this.player, this.keys, collect, null, this);
      this.game.physics.arcade.collide(this.player, this.doors, knockDoor, null, this);
      this.game.physics.arcade.collide(this.player, this.gates, knockGate, null, this);
      //  Reset the this.players velocity (movement)
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;

      var direction = '';
      switch (true) {
        case this.cursors.left.isDown:
          direction += 'left';
          this.player.body.velocity.x = -75;
          this.player.scale.x = -1;
          break;
        case this.cursors.right.isDown:
          direction += 'right';
          this.player.body.velocity.x = 75;
          this.player.scale.x = 1;
          break;
      }

      switch (true) {
        case this.cursors.up.isDown:
          direction += 'up';
          this.player.body.velocity.y = -75;
          break;
        case this.cursors.down.isDown:
          direction += 'down';
          this.player.body.velocity.y = 75;
          break;
      }

      if (direction) {
        this.player.animations.play('walk');
      } else {
        this.player.frame = 0;
      }
    }
  }]);

  return State;
}(Phaser.State);

var possessionState = Object.assign(State.prototype, TiledInterpreter);

var transparent = false;
var antialias = false;
var game = new Phaser.Game(320, 240, Phaser.AUTO, '', undefined, transparent, antialias);

game.state.add('possession', possessionState, true);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL2luZGV4LmpzIl0sIm5hbWVzIjpbInBvc3Nlc3Npb25TdGF0ZSIsInRyYW5zcGFyZW50IiwiYW50aWFsaWFzIiwiZ2FtZSIsIlBoYXNlciIsIkdhbWUiLCJBVVRPIiwic3RhdGUiLCJhZGQiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZ0JBQVA7QUFDQSxPQUFPQSxlQUFQLE1BQTRCLG9CQUE1Qjs7QUFFQSxJQUFNQyxjQUFjLEtBQXBCO0FBQ0EsSUFBTUMsWUFBWSxLQUFsQjtBQUNBLElBQU1DLE9BQU8sSUFBSUMsT0FBT0MsSUFBWCxDQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQkQsT0FBT0UsSUFBakMsRUFBdUMsRUFBdkMsRUFBMkMsSUFBM0MsRUFBaURMLFdBQWpELEVBQThEQyxTQUE5RCxDQUFiOztBQUVBQyxLQUFLSSxLQUFMLENBQVdDLEdBQVgsQ0FBZSxZQUFmLEVBQTZCUixlQUE3QixFQUE4QyxJQUE5QyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnYmFiZWwtcG9seWZpbGwnO1xuaW1wb3J0IHBvc3Nlc3Npb25TdGF0ZSBmcm9tICcuL3Bvc3Nlc3Npb24vc3RhdGUnO1xuXG5jb25zdCB0cmFuc3BhcmVudCA9IGZhbHNlO1xuY29uc3QgYW50aWFsaWFzID0gZmFsc2U7XG5jb25zdCBnYW1lID0gbmV3IFBoYXNlci5HYW1lKDMyMCwgMjQwLCBQaGFzZXIuQVVUTywgJycsIHRoaXMsIHRyYW5zcGFyZW50LCBhbnRpYWxpYXMpO1xuXG5nYW1lLnN0YXRlLmFkZCgncG9zc2Vzc2lvbicsIHBvc3Nlc3Npb25TdGF0ZSwgdHJ1ZSk7XG4iXX0=

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19nbG9iYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19oYXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mYWlscy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29yZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1kcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19oaWRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdWlkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcmVkZWZpbmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY3R4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZXhwb3J0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fbWV0YS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NoYXJlZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3drcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fd2tzLWV4dC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2xpYnJhcnkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL193a3MtZGVmaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RlZmluZWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWxlbmd0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWluZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19rZXlvZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2VudW0ta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lzLWFycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2h0bWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtY3JlYXRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdvcG4uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN5bWJvbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0aWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LXNhcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LW5hbWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmZyZWV6ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5zZWFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnByZXZlbnQtZXh0ZW5zaW9ucy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5pcy1mcm96ZW4uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuaXMtc2VhbGVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmlzLWV4dGVuc2libGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NhbWUtdmFsdWUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuaXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zZXQtcHJvdG8uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NsYXNzb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faW52b2tlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYmluZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmZ1bmN0aW9uLmJpbmQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5mdW5jdGlvbi5uYW1lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuZnVuY3Rpb24uaGFzLWluc3RhbmNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaW5nLXdzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaW5nLXRyaW0uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19wYXJzZS1pbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5wYXJzZS1pbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19wYXJzZS1mbG9hdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnBhcnNlLWZsb2F0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faW5oZXJpdC1pZi1yZXF1aXJlZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5jb25zdHJ1Y3Rvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2EtbnVtYmVyLXZhbHVlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaW5nLXJlcGVhdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci50by1maXhlZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci50by1wcmVjaXNpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIuZXBzaWxvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5pcy1maW5pdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pcy1pbnRlZ2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLmlzLWludGVnZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIuaXMtbmFuLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLmlzLXNhZmUtaW50ZWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5tYXgtc2FmZS1pbnRlZ2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubnVtYmVyLm1pbi1zYWZlLWludGVnZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIucGFyc2UtZmxvYXQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5udW1iZXIucGFyc2UtaW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fbWF0aC1sb2cxcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguYWNvc2guanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmFzaW5oLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5hdGFuaC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX21hdGgtc2lnbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguY2JydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguY2x6MzIuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmNvc2guanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19tYXRoLWV4cG0xLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5leHBtMS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguZnJvdW5kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5oeXBvdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGguaW11bC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm1hdGgubG9nMTAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXRoLmxvZzFwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5sb2cyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5zaWduLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC5zaW5oLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC50YW5oLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYubWF0aC50cnVuYy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5mcm9tLWNvZGUtcG9pbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcucmF3LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnRyaW0uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zdHJpbmctYXQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyYXRvcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmNvZGUtcG9pbnQtYXQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pcy1yZWdleHAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zdHJpbmctY29udGV4dC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2ZhaWxzLWlzLXJlZ2V4cC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5lbmRzLXdpdGguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuaW5jbHVkZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcucmVwZWF0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnN0YXJ0cy13aXRoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaW5nLWh0bWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuYW5jaG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmJpZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5ibGluay5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5ib2xkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmZpeGVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmZvbnRjb2xvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5mb250c2l6ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5pdGFsaWNzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLmxpbmsuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuc21hbGwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuc3RyaWtlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLnN1Yi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5zdXAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5kYXRlLm5vdy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmRhdGUudG8tanNvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmRhdGUudG8taXNvLXN0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmRhdGUudG8tc3RyaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZGF0ZS10by1wcmltaXRpdmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5kYXRlLnRvLXByaW1pdGl2ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmlzLWFycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlci1jYWxsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXMtYXJyYXktaXRlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NyZWF0ZS1wcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlci1kZXRlY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5mcm9tLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkub2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zdHJpY3QtbWV0aG9kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuam9pbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LnNsaWNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuc29ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LXNwZWNpZXMtY29uc3RydWN0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNyZWF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LW1ldGhvZHMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5mb3ItZWFjaC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5Lm1hcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZpbHRlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LnNvbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5ldmVyeS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LXJlZHVjZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LnJlZHVjZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LnJlZHVjZS1yaWdodC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmluZGV4LW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkubGFzdC1pbmRleC1vZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LWNvcHktd2l0aGluLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuY29weS13aXRoaW4uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hcnJheS1maWxsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZmlsbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZpbmQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5maW5kLWluZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5zcGVjaWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlci1zdGVwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mbGFncy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZ2V4cC5jb25zdHJ1Y3Rvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZ2V4cC5mbGFncy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZ2V4cC50by1zdHJpbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19maXgtcmUtd2tzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLm1hdGNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLnJlcGxhY2UuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAuc2VhcmNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLnNwbGl0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYW4taW5zdGFuY2UuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mb3Itb2YuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdGFzay5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX21pY3JvdGFzay5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnByb21pc2UuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jb2xsZWN0aW9uLXN0cm9uZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvbGxlY3Rpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zZXQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jb2xsZWN0aW9uLXdlYWsuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi53ZWFrLW1hcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LndlYWstc2V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdHlwZWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190eXBlZC1idWZmZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi50eXBlZC5hcnJheS1idWZmZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi50eXBlZC5kYXRhLXZpZXcuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190eXBlZC1hcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLmludDgtYXJyYXkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi50eXBlZC51aW50OC1hcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLnVpbnQ4LWNsYW1wZWQtYXJyYXkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi50eXBlZC5pbnQxNi1hcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLnVpbnQxNi1hcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLmludDMyLWFycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYudHlwZWQudWludDMyLWFycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYudHlwZWQuZmxvYXQzMi1hcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnR5cGVkLmZsb2F0NjQtYXJyYXkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LmFwcGx5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5jb25zdHJ1Y3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuZGVsZXRlLXByb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5lbnVtZXJhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LmdldC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5nZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5oYXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LmlzLWV4dGVuc2libGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vd24ta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3Qub3duLWtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5yZWZsZWN0LnByZXZlbnQtZXh0ZW5zaW9ucy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnJlZmxlY3Quc2V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVmbGVjdC5zZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuYXJyYXkuaW5jbHVkZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zdHJpbmcuYXQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zdHJpbmctcGFkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc3RyaW5nLnBhZC1zdGFydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnN0cmluZy5wYWQtZW5kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc3RyaW5nLnRyaW0tbGVmdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnN0cmluZy50cmltLXJpZ2h0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc3RyaW5nLm1hdGNoLWFsbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcub2JqZWN0LmdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtdG8tYXJyYXkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QudmFsdWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcub2JqZWN0LmVudHJpZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZm9yY2VkLXBhbS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3Lm9iamVjdC5kZWZpbmUtZ2V0dGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcub2JqZWN0LmRlZmluZS1zZXR0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QubG9va3VwLWdldHRlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3Lm9iamVjdC5sb29rdXAtc2V0dGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYXJyYXktZnJvbS1pdGVyYWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvbGxlY3Rpb24tdG8tanNvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3Lm1hcC50by1qc29uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc2V0LnRvLWpzb24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zeXN0ZW0uZ2xvYmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuZXJyb3IuaXMtZXJyb3IuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5tYXRoLmlhZGRoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcubWF0aC5pc3ViaC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3Lm1hdGguaW11bGguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5tYXRoLnVtdWxoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fbWV0YWRhdGEuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5yZWZsZWN0LmRlZmluZS1tZXRhZGF0YS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnJlZmxlY3QuZGVsZXRlLW1ldGFkYXRhLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcucmVmbGVjdC5nZXQtbWV0YWRhdGEuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5yZWZsZWN0LmdldC1tZXRhZGF0YS1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcucmVmbGVjdC5nZXQtb3duLW1ldGFkYXRhLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcucmVmbGVjdC5nZXQtb3duLW1ldGFkYXRhLWtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5yZWZsZWN0Lmhhcy1tZXRhZGF0YS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnJlZmxlY3QuaGFzLW93bi1tZXRhZGF0YS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnJlZmxlY3QubWV0YWRhdGEuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5hc2FwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcub2JzZXJ2YWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3BhdGguanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19wYXJ0aWFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIudGltZXJzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuaW1tZWRpYXRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3JlcGxhY2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9jb3JlLnJlZ2V4cC5lc2NhcGUuanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcG9seWZpbGwvbGliL2luZGV4LmpzIiwic2NyaXB0cy9lbmdpbmUvVGlsZWRJbnRlcnByZXRlci5qcyIsInNjcmlwdHMvcG9zc2Vzc2lvbi9zdGF0ZS5qcyIsInNjcmlwdHMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZih0eXBlb2YgX19nID09ICdudW1iZXInKV9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZiIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59OyIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pOyIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7dmVyc2lvbjogJzIuNC4wJ307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59OyIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7IiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07IiwidmFyIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZFAgICAgICAgICAgICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07IiwidmFyIGRQICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59OyIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59OyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGhpZGUgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIGhhcyAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgU1JDICAgICAgID0gcmVxdWlyZSgnLi9fdWlkJykoJ3NyYycpXG4gICwgVE9fU1RSSU5HID0gJ3RvU3RyaW5nJ1xuICAsICR0b1N0cmluZyA9IEZ1bmN0aW9uW1RPX1NUUklOR11cbiAgLCBUUEwgICAgICAgPSAoJycgKyAkdG9TdHJpbmcpLnNwbGl0KFRPX1NUUklORyk7XG5cbnJlcXVpcmUoJy4vX2NvcmUnKS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gJHRvU3RyaW5nLmNhbGwoaXQpO1xufTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTywga2V5LCB2YWwsIHNhZmUpe1xuICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiB2YWwgPT0gJ2Z1bmN0aW9uJztcbiAgaWYoaXNGdW5jdGlvbiloYXModmFsLCAnbmFtZScpIHx8IGhpZGUodmFsLCAnbmFtZScsIGtleSk7XG4gIGlmKE9ba2V5XSA9PT0gdmFsKXJldHVybjtcbiAgaWYoaXNGdW5jdGlvbiloYXModmFsLCBTUkMpIHx8IGhpZGUodmFsLCBTUkMsIE9ba2V5XSA/ICcnICsgT1trZXldIDogVFBMLmpvaW4oU3RyaW5nKGtleSkpKTtcbiAgaWYoTyA9PT0gZ2xvYmFsKXtcbiAgICBPW2tleV0gPSB2YWw7XG4gIH0gZWxzZSB7XG4gICAgaWYoIXNhZmUpe1xuICAgICAgZGVsZXRlIE9ba2V5XTtcbiAgICAgIGhpZGUoTywga2V5LCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZihPW2tleV0pT1trZXldID0gdmFsO1xuICAgICAgZWxzZSBoaWRlKE8sIGtleSwgdmFsKTtcbiAgICB9XG4gIH1cbi8vIGFkZCBmYWtlIEZ1bmN0aW9uI3RvU3RyaW5nIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxufSkoRnVuY3Rpb24ucHJvdG90eXBlLCBUT19TVFJJTkcsIGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gIHJldHVybiB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nICYmIHRoaXNbU1JDXSB8fCAkdG9TdHJpbmcuY2FsbCh0aGlzKTtcbn0pOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZih0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59OyIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07IiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgaGlkZSAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgcmVkZWZpbmUgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIGN0eCAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkZcbiAgICAsIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0LkdcbiAgICAsIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlNcbiAgICAsIElTX1BST1RPICA9IHR5cGUgJiAkZXhwb3J0LlBcbiAgICAsIElTX0JJTkQgICA9IHR5cGUgJiAkZXhwb3J0LkJcbiAgICAsIHRhcmdldCAgICA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSB8fCAoZ2xvYmFsW25hbWVdID0ge30pIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXVxuICAgICwgZXhwb3J0cyAgID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSlcbiAgICAsIGV4cFByb3RvICA9IGV4cG9ydHNbUFJPVE9UWVBFXSB8fCAoZXhwb3J0c1tQUk9UT1RZUEVdID0ge30pXG4gICAgLCBrZXksIG93biwgb3V0LCBleHA7XG4gIGlmKElTX0dMT0JBTClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IChvd24gPyB0YXJnZXQgOiBzb3VyY2UpW2tleV07XG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICBleHAgPSBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHRlbmQgZ2xvYmFsXG4gICAgaWYodGFyZ2V0KXJlZGVmaW5lKHRhcmdldCwga2V5LCBvdXQsIHR5cGUgJiAkZXhwb3J0LlUpO1xuICAgIC8vIGV4cG9ydFxuICAgIGlmKGV4cG9ydHNba2V5XSAhPSBvdXQpaGlkZShleHBvcnRzLCBrZXksIGV4cCk7XG4gICAgaWYoSVNfUFJPVE8gJiYgZXhwUHJvdG9ba2V5XSAhPSBvdXQpZXhwUHJvdG9ba2V5XSA9IG91dDtcbiAgfVxufTtcbmdsb2JhbC5jb3JlID0gY29yZTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWAgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7IiwidmFyIE1FVEEgICAgID0gcmVxdWlyZSgnLi9fdWlkJykoJ21ldGEnKVxuICAsIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBoYXMgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgc2V0RGVzYyAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgaWQgICAgICAgPSAwO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHRydWU7XG59O1xudmFyIEZSRUVaRSA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBpc0V4dGVuc2libGUoT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKHt9KSk7XG59KTtcbnZhciBzZXRNZXRhID0gZnVuY3Rpb24oaXQpe1xuICBzZXREZXNjKGl0LCBNRVRBLCB7dmFsdWU6IHtcbiAgICBpOiAnTycgKyArK2lkLCAvLyBvYmplY3QgSURcbiAgICB3OiB7fSAgICAgICAgICAvLyB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9fSk7XG59O1xudmFyIGZhc3RLZXkgPSBmdW5jdGlvbihpdCwgY3JlYXRlKXtcbiAgLy8gcmV0dXJuIHByaW1pdGl2ZSB3aXRoIHByZWZpeFxuICBpZighaXNPYmplY3QoaXQpKXJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6ICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgPyAnUycgOiAnUCcpICsgaXQ7XG4gIGlmKCFoYXMoaXQsIE1FVEEpKXtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmKCFpc0V4dGVuc2libGUoaXQpKXJldHVybiAnRic7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZighY3JlYXRlKXJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIG9iamVjdCBJRFxuICB9IHJldHVybiBpdFtNRVRBXS5pO1xufTtcbnZhciBnZXRXZWFrID0gZnVuY3Rpb24oaXQsIGNyZWF0ZSl7XG4gIGlmKCFoYXMoaXQsIE1FVEEpKXtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmKCFpc0V4dGVuc2libGUoaXQpKXJldHVybiB0cnVlO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gZmFsc2U7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIGhhc2ggd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSByZXR1cm4gaXRbTUVUQV0udztcbn07XG4vLyBhZGQgbWV0YWRhdGEgb24gZnJlZXplLWZhbWlseSBtZXRob2RzIGNhbGxpbmdcbnZhciBvbkZyZWV6ZSA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoRlJFRVpFICYmIG1ldGEuTkVFRCAmJiBpc0V4dGVuc2libGUoaXQpICYmICFoYXMoaXQsIE1FVEEpKXNldE1ldGEoaXQpO1xuICByZXR1cm4gaXQ7XG59O1xudmFyIG1ldGEgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgS0VZOiAgICAgIE1FVEEsXG4gIE5FRUQ6ICAgICBmYWxzZSxcbiAgZmFzdEtleTogIGZhc3RLZXksXG4gIGdldFdlYWs6ICBnZXRXZWFrLFxuICBvbkZyZWV6ZTogb25GcmVlemVcbn07IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcbiAgLCBzdG9yZSAgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTsiLCJ2YXIgc3RvcmUgICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKVxuICAsIHVpZCAgICAgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIFN5bWJvbCAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2xcbiAgLCBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTsiLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpZGVmKGl0LCBUQUcsIHtjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWd9KTtcbn07IiwiZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fd2tzJyk7IiwibW9kdWxlLmV4cG9ydHMgPSBmYWxzZTsiLCJ2YXIgZ2xvYmFsICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgTElCUkFSWSAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgLCB3a3NFeHQgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcy1leHQnKVxuICAsIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHZhciAkU3ltYm9sID0gY29yZS5TeW1ib2wgfHwgKGNvcmUuU3ltYm9sID0gTElCUkFSWSA/IHt9IDogZ2xvYmFsLlN5bWJvbCB8fCB7fSk7XG4gIGlmKG5hbWUuY2hhckF0KDApICE9ICdfJyAmJiAhKG5hbWUgaW4gJFN5bWJvbCkpZGVmaW5lUHJvcGVydHkoJFN5bWJvbCwgbmFtZSwge3ZhbHVlOiB3a3NFeHQuZihuYW1lKX0pO1xufTsiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59OyIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59OyIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTsiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59OyIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTsiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTsiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWF4ICAgICAgID0gTWF0aC5tYXhcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaW5kZXgsIGxlbmd0aCl7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59OyIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9MZW5ndGggID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCB0b0luZGV4ICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdCgkdGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpXG4gICAgICAsIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICBpZihJU19JTkNMVURFUyAmJiBlbCAhPSBlbCl3aGlsZShsZW5ndGggPiBpbmRleCl7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICBpZih2YWx1ZSAhPSB2YWx1ZSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSN0b0luZGV4IGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTsiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKVxuICAsIHVpZCAgICA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTsiLCJ2YXIgaGFzICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKVxuICAsIElFX1BST1RPICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIG5hbWVzKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwga2V5O1xuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpe1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7IiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07IiwidmFyIGdldEtleXMgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgZWwpe1xuICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAsIGtleXMgICA9IGdldEtleXMoTylcbiAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgLCBpbmRleCAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKGxlbmd0aCA+IGluZGV4KWlmKE9ba2V5ID0ga2V5c1tpbmRleCsrXV0gPT09IGVsKXJldHVybiBrZXk7XG59OyIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7IiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7IiwiLy8gYWxsIGVudW1lcmFibGUgb2JqZWN0IGtleXMsIGluY2x1ZGVzIHN5bWJvbHNcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIGdPUFMgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpXG4gICwgcElFICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgcmVzdWx0ICAgICA9IGdldEtleXMoaXQpXG4gICAgLCBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICBpZihnZXRTeW1ib2xzKXtcbiAgICB2YXIgc3ltYm9scyA9IGdldFN5bWJvbHMoaXQpXG4gICAgICAsIGlzRW51bSAgPSBwSUUuZlxuICAgICAgLCBpICAgICAgID0gMFxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUoc3ltYm9scy5sZW5ndGggPiBpKWlmKGlzRW51bS5jYWxsKGl0LCBrZXkgPSBzeW1ib2xzW2krK10pKXJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gNy4yLjIgSXNBcnJheShhcmd1bWVudClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZyl7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTsiLCJ2YXIgZFAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzICAgPSBnZXRLZXlzKFByb3BlcnRpZXMpXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaSA9IDBcbiAgICAsIFA7XG4gIHdoaWxlKGxlbmd0aCA+IGkpZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgcmV0dXJuIE87XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50OyIsIi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxudmFyIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBkUHMgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKVxuICAsIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpXG4gICwgSUVfUFJPVE8gICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJylcbiAgLCBFbXB0eSAgICAgICA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH1cbiAgLCBQUk9UT1RZUEUgICA9ICdwcm90b3R5cGUnO1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uKCl7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpXG4gICAgLCBpICAgICAgPSBlbnVtQnVnS2V5cy5sZW5ndGhcbiAgICAsIGx0ICAgICA9ICc8J1xuICAgICwgZ3QgICAgID0gJz4nXG4gICAgLCBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJlcXVpcmUoJy4vX2h0bWwnKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZShpLS0pZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpe1xuICB2YXIgcmVzdWx0O1xuICBpZihPICE9PSBudWxsKXtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5O1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsIi8vIDE5LjEuMi43IC8gMTUuMi4zLjQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbnZhciAka2V5cyAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKVxuICAsIGhpZGRlbktleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJykuY29uY2F0KCdsZW5ndGgnLCAncHJvdG90eXBlJyk7XG5cbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTyl7XG4gIHJldHVybiAka2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07IiwiLy8gZmFsbGJhY2sgZm9yIElFMTEgYnVnZ3kgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgd2l0aCBpZnJhbWUgYW5kIHdpbmRvd1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIGdPUE4gICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZlxuICAsIHRvU3RyaW5nICA9IHt9LnRvU3RyaW5nO1xuXG52YXIgd2luZG93TmFtZXMgPSB0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc1xuICA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHdpbmRvdykgOiBbXTtcblxudmFyIGdldFdpbmRvd05hbWVzID0gZnVuY3Rpb24oaXQpe1xuICB0cnkge1xuICAgIHJldHVybiBnT1BOKGl0KTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gd2luZG93TmFtZXMuc2xpY2UoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpe1xuICByZXR1cm4gd2luZG93TmFtZXMgJiYgdG9TdHJpbmcuY2FsbChpdCkgPT0gJ1tvYmplY3QgV2luZG93XScgPyBnZXRXaW5kb3dOYW1lcyhpdCkgOiBnT1BOKHRvSU9iamVjdChpdCkpO1xufTtcbiIsInZhciBwSUUgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKVxuICAsIGNyZWF0ZURlc2MgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgdG9JT2JqZWN0ICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKVxuICAsIGdPUEQgICAgICAgICAgID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGdPUEQgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCl7XG4gIE8gPSB0b0lPYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICByZXR1cm4gZ09QRChPLCBQKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZihoYXMoTywgUCkpcmV0dXJuIGNyZWF0ZURlc2MoIXBJRS5mLmNhbGwoTywgUCksIE9bUF0pO1xufTsiLCIndXNlIHN0cmljdCc7XG4vLyBFQ01BU2NyaXB0IDYgc3ltYm9scyBzaGltXG52YXIgZ2xvYmFsICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBERVNDUklQVE9SUyAgICA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgcmVkZWZpbmUgICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgTUVUQSAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhJykuS0VZXG4gICwgJGZhaWxzICAgICAgICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICwgc2hhcmVkICAgICAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIHVpZCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdWlkJylcbiAgLCB3a3MgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcycpXG4gICwgd2tzRXh0ICAgICAgICAgPSByZXF1aXJlKCcuL193a3MtZXh0JylcbiAgLCB3a3NEZWZpbmUgICAgICA9IHJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKVxuICAsIGtleU9mICAgICAgICAgID0gcmVxdWlyZSgnLi9fa2V5b2YnKVxuICAsIGVudW1LZXlzICAgICAgID0gcmVxdWlyZSgnLi9fZW51bS1rZXlzJylcbiAgLCBpc0FycmF5ICAgICAgICA9IHJlcXVpcmUoJy4vX2lzLWFycmF5JylcbiAgLCBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgdG9JT2JqZWN0ICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgY3JlYXRlRGVzYyAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCBfY3JlYXRlICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIGdPUE5FeHQgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4tZXh0JylcbiAgLCAkR09QRCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJylcbiAgLCAkRFAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgJGtleXMgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgZ09QRCAgICAgICAgICAgPSAkR09QRC5mXG4gICwgZFAgICAgICAgICAgICAgPSAkRFAuZlxuICAsIGdPUE4gICAgICAgICAgID0gZ09QTkV4dC5mXG4gICwgJFN5bWJvbCAgICAgICAgPSBnbG9iYWwuU3ltYm9sXG4gICwgJEpTT04gICAgICAgICAgPSBnbG9iYWwuSlNPTlxuICAsIF9zdHJpbmdpZnkgICAgID0gJEpTT04gJiYgJEpTT04uc3RyaW5naWZ5XG4gICwgUFJPVE9UWVBFICAgICAgPSAncHJvdG90eXBlJ1xuICAsIEhJRERFTiAgICAgICAgID0gd2tzKCdfaGlkZGVuJylcbiAgLCBUT19QUklNSVRJVkUgICA9IHdrcygndG9QcmltaXRpdmUnKVxuICAsIGlzRW51bSAgICAgICAgID0ge30ucHJvcGVydHlJc0VudW1lcmFibGVcbiAgLCBTeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXJlZ2lzdHJ5JylcbiAgLCBBbGxTeW1ib2xzICAgICA9IHNoYXJlZCgnc3ltYm9scycpXG4gICwgT1BTeW1ib2xzICAgICAgPSBzaGFyZWQoJ29wLXN5bWJvbHMnKVxuICAsIE9iamVjdFByb3RvICAgID0gT2JqZWN0W1BST1RPVFlQRV1cbiAgLCBVU0VfTkFUSVZFICAgICA9IHR5cGVvZiAkU3ltYm9sID09ICdmdW5jdGlvbidcbiAgLCBRT2JqZWN0ICAgICAgICA9IGdsb2JhbC5RT2JqZWN0O1xuLy8gRG9uJ3QgdXNlIHNldHRlcnMgaW4gUXQgU2NyaXB0LCBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTczXG52YXIgc2V0dGVyID0gIVFPYmplY3QgfHwgIVFPYmplY3RbUFJPVE9UWVBFXSB8fCAhUU9iamVjdFtQUk9UT1RZUEVdLmZpbmRDaGlsZDtcblxuLy8gZmFsbGJhY2sgZm9yIG9sZCBBbmRyb2lkLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9Njg3XG52YXIgc2V0U3ltYm9sRGVzYyA9IERFU0NSSVBUT1JTICYmICRmYWlscyhmdW5jdGlvbigpe1xuICByZXR1cm4gX2NyZWF0ZShkUCh7fSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gZFAodGhpcywgJ2EnLCB7dmFsdWU6IDd9KS5hOyB9XG4gIH0pKS5hICE9IDc7XG59KSA/IGZ1bmN0aW9uKGl0LCBrZXksIEQpe1xuICB2YXIgcHJvdG9EZXNjID0gZ09QRChPYmplY3RQcm90bywga2V5KTtcbiAgaWYocHJvdG9EZXNjKWRlbGV0ZSBPYmplY3RQcm90b1trZXldO1xuICBkUChpdCwga2V5LCBEKTtcbiAgaWYocHJvdG9EZXNjICYmIGl0ICE9PSBPYmplY3RQcm90bylkUChPYmplY3RQcm90bywga2V5LCBwcm90b0Rlc2MpO1xufSA6IGRQO1xuXG52YXIgd3JhcCA9IGZ1bmN0aW9uKHRhZyl7XG4gIHZhciBzeW0gPSBBbGxTeW1ib2xzW3RhZ10gPSBfY3JlYXRlKCRTeW1ib2xbUFJPVE9UWVBFXSk7XG4gIHN5bS5fayA9IHRhZztcbiAgcmV0dXJuIHN5bTtcbn07XG5cbnZhciBpc1N5bWJvbCA9IFVTRV9OQVRJVkUgJiYgdHlwZW9mICRTeW1ib2wuaXRlcmF0b3IgPT0gJ3N5bWJvbCcgPyBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCc7XG59IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgaW5zdGFuY2VvZiAkU3ltYm9sO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIEQpe1xuICBpZihpdCA9PT0gT2JqZWN0UHJvdG8pJGRlZmluZVByb3BlcnR5KE9QU3ltYm9scywga2V5LCBEKTtcbiAgYW5PYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBhbk9iamVjdChEKTtcbiAgaWYoaGFzKEFsbFN5bWJvbHMsIGtleSkpe1xuICAgIGlmKCFELmVudW1lcmFibGUpe1xuICAgICAgaWYoIWhhcyhpdCwgSElEREVOKSlkUChpdCwgSElEREVOLCBjcmVhdGVEZXNjKDEsIHt9KSk7XG4gICAgICBpdFtISURERU5dW2tleV0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZihoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKWl0W0hJRERFTl1ba2V5XSA9IGZhbHNlO1xuICAgICAgRCA9IF9jcmVhdGUoRCwge2VudW1lcmFibGU6IGNyZWF0ZURlc2MoMCwgZmFsc2UpfSk7XG4gICAgfSByZXR1cm4gc2V0U3ltYm9sRGVzYyhpdCwga2V5LCBEKTtcbiAgfSByZXR1cm4gZFAoaXQsIGtleSwgRCk7XG59O1xudmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhpdCwgUCl7XG4gIGFuT2JqZWN0KGl0KTtcbiAgdmFyIGtleXMgPSBlbnVtS2V5cyhQID0gdG9JT2JqZWN0KFApKVxuICAgICwgaSAgICA9IDBcbiAgICAsIGwgPSBrZXlzLmxlbmd0aFxuICAgICwga2V5O1xuICB3aGlsZShsID4gaSkkZGVmaW5lUHJvcGVydHkoaXQsIGtleSA9IGtleXNbaSsrXSwgUFtrZXldKTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciAkY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGl0LCBQKXtcbiAgcmV0dXJuIFAgPT09IHVuZGVmaW5lZCA/IF9jcmVhdGUoaXQpIDogJGRlZmluZVByb3BlcnRpZXMoX2NyZWF0ZShpdCksIFApO1xufTtcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShrZXkpe1xuICB2YXIgRSA9IGlzRW51bS5jYWxsKHRoaXMsIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSkpO1xuICBpZih0aGlzID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSlyZXR1cm4gZmFsc2U7XG4gIHJldHVybiBFIHx8ICFoYXModGhpcywga2V5KSB8fCAhaGFzKEFsbFN5bWJvbHMsIGtleSkgfHwgaGFzKHRoaXMsIEhJRERFTikgJiYgdGhpc1tISURERU5dW2tleV0gPyBFIDogdHJ1ZTtcbn07XG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgaXQgID0gdG9JT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgaWYoaXQgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKXJldHVybjtcbiAgdmFyIEQgPSBnT1BEKGl0LCBrZXkpO1xuICBpZihEICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICEoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkpRC5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgcmV0dXJuIEQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHZhciBuYW1lcyAgPSBnT1BOKHRvSU9iamVjdChpdCkpXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwgaSAgICAgID0gMFxuICAgICwga2V5O1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKXtcbiAgICBpZighaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIGtleSAhPSBISURERU4gJiYga2V5ICE9IE1FVEEpcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KXtcbiAgdmFyIElTX09QICA9IGl0ID09PSBPYmplY3RQcm90b1xuICAgICwgbmFtZXMgID0gZ09QTihJU19PUCA/IE9QU3ltYm9scyA6IHRvSU9iamVjdChpdCkpXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwgaSAgICAgID0gMFxuICAgICwga2V5O1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKXtcbiAgICBpZihoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYgKElTX09QID8gaGFzKE9iamVjdFByb3RvLCBrZXkpIDogdHJ1ZSkpcmVzdWx0LnB1c2goQWxsU3ltYm9sc1trZXldKTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcblxuLy8gMTkuNC4xLjEgU3ltYm9sKFtkZXNjcmlwdGlvbl0pXG5pZighVVNFX05BVElWRSl7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKXtcbiAgICBpZih0aGlzIGluc3RhbmNlb2YgJFN5bWJvbCl0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvciEnKTtcbiAgICB2YXIgdGFnID0gdWlkKGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTtcbiAgICB2YXIgJHNldCA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIGlmKHRoaXMgPT09IE9iamVjdFByb3RvKSRzZXQuY2FsbChPUFN5bWJvbHMsIHZhbHVlKTtcbiAgICAgIGlmKGhhcyh0aGlzLCBISURERU4pICYmIGhhcyh0aGlzW0hJRERFTl0sIHRhZykpdGhpc1tISURERU5dW3RhZ10gPSBmYWxzZTtcbiAgICAgIHNldFN5bWJvbERlc2ModGhpcywgdGFnLCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG4gICAgfTtcbiAgICBpZihERVNDUklQVE9SUyAmJiBzZXR0ZXIpc2V0U3ltYm9sRGVzYyhPYmplY3RQcm90bywgdGFnLCB7Y29uZmlndXJhYmxlOiB0cnVlLCBzZXQ6ICRzZXR9KTtcbiAgICByZXR1cm4gd3JhcCh0YWcpO1xuICB9O1xuICByZWRlZmluZSgkU3ltYm9sW1BST1RPVFlQRV0sICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gICAgcmV0dXJuIHRoaXMuX2s7XG4gIH0pO1xuXG4gICRHT1BELmYgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICAkRFAuZiAgID0gJGRlZmluZVByb3BlcnR5O1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmYgPSBnT1BORXh0LmYgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpLmYgID0gJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpLmYgPSAkZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIGlmKERFU0NSSVBUT1JTICYmICFyZXF1aXJlKCcuL19saWJyYXJ5Jykpe1xuICAgIHJlZGVmaW5lKE9iamVjdFByb3RvLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAkcHJvcGVydHlJc0VudW1lcmFibGUsIHRydWUpO1xuICB9XG5cbiAgd2tzRXh0LmYgPSBmdW5jdGlvbihuYW1lKXtcbiAgICByZXR1cm4gd3JhcCh3a3MobmFtZSkpO1xuICB9XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHtTeW1ib2w6ICRTeW1ib2x9KTtcblxuZm9yKHZhciBzeW1ib2xzID0gKFxuICAvLyAxOS40LjIuMiwgMTkuNC4yLjMsIDE5LjQuMi40LCAxOS40LjIuNiwgMTkuNC4yLjgsIDE5LjQuMi45LCAxOS40LjIuMTAsIDE5LjQuMi4xMSwgMTkuNC4yLjEyLCAxOS40LjIuMTMsIDE5LjQuMi4xNFxuICAnaGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLGl0ZXJhdG9yLG1hdGNoLHJlcGxhY2Usc2VhcmNoLHNwZWNpZXMsc3BsaXQsdG9QcmltaXRpdmUsdG9TdHJpbmdUYWcsdW5zY29wYWJsZXMnXG4pLnNwbGl0KCcsJyksIGkgPSAwOyBzeW1ib2xzLmxlbmd0aCA+IGk7ICl3a3Moc3ltYm9sc1tpKytdKTtcblxuZm9yKHZhciBzeW1ib2xzID0gJGtleXMod2tzLnN0b3JlKSwgaSA9IDA7IHN5bWJvbHMubGVuZ3RoID4gaTsgKXdrc0RlZmluZShzeW1ib2xzW2krK10pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnU3ltYm9sJywge1xuICAvLyAxOS40LjIuMSBTeW1ib2wuZm9yKGtleSlcbiAgJ2Zvcic6IGZ1bmN0aW9uKGtleSl7XG4gICAgcmV0dXJuIGhhcyhTeW1ib2xSZWdpc3RyeSwga2V5ICs9ICcnKVxuICAgICAgPyBTeW1ib2xSZWdpc3RyeVtrZXldXG4gICAgICA6IFN5bWJvbFJlZ2lzdHJ5W2tleV0gPSAkU3ltYm9sKGtleSk7XG4gIH0sXG4gIC8vIDE5LjQuMi41IFN5bWJvbC5rZXlGb3Ioc3ltKVxuICBrZXlGb3I6IGZ1bmN0aW9uIGtleUZvcihrZXkpe1xuICAgIGlmKGlzU3ltYm9sKGtleSkpcmV0dXJuIGtleU9mKFN5bWJvbFJlZ2lzdHJ5LCBrZXkpO1xuICAgIHRocm93IFR5cGVFcnJvcihrZXkgKyAnIGlzIG5vdCBhIHN5bWJvbCEnKTtcbiAgfSxcbiAgdXNlU2V0dGVyOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSB0cnVlOyB9LFxuICB1c2VTaW1wbGU6IGZ1bmN0aW9uKCl7IHNldHRlciA9IGZhbHNlOyB9XG59KTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ09iamVjdCcsIHtcbiAgLy8gMTkuMS4yLjIgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuICBjcmVhdGU6ICRjcmVhdGUsXG4gIC8vIDE5LjEuMi40IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuICBkZWZpbmVQcm9wZXJ0eTogJGRlZmluZVByb3BlcnR5LFxuICAvLyAxOS4xLjIuMyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxuICBkZWZpbmVQcm9wZXJ0aWVzOiAkZGVmaW5lUHJvcGVydGllcyxcbiAgLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIC8vIDE5LjEuMi43IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG4gIGdldE93blByb3BlcnR5TmFtZXM6ICRnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAvLyAxOS4xLjIuOCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKE8pXG4gIGdldE93blByb3BlcnR5U3ltYm9sczogJGdldE93blByb3BlcnR5U3ltYm9sc1xufSk7XG5cbi8vIDI0LjMuMiBKU09OLnN0cmluZ2lmeSh2YWx1ZSBbLCByZXBsYWNlciBbLCBzcGFjZV1dKVxuJEpTT04gJiYgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoIVVTRV9OQVRJVkUgfHwgJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHZhciBTID0gJFN5bWJvbCgpO1xuICAvLyBNUyBFZGdlIGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyB7fVxuICAvLyBXZWJLaXQgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIG51bGxcbiAgLy8gVjggdGhyb3dzIG9uIGJveGVkIHN5bWJvbHNcbiAgcmV0dXJuIF9zdHJpbmdpZnkoW1NdKSAhPSAnW251bGxdJyB8fCBfc3RyaW5naWZ5KHthOiBTfSkgIT0gJ3t9JyB8fCBfc3RyaW5naWZ5KE9iamVjdChTKSkgIT0gJ3t9Jztcbn0pKSwgJ0pTT04nLCB7XG4gIHN0cmluZ2lmeTogZnVuY3Rpb24gc3RyaW5naWZ5KGl0KXtcbiAgICBpZihpdCA9PT0gdW5kZWZpbmVkIHx8IGlzU3ltYm9sKGl0KSlyZXR1cm47IC8vIElFOCByZXR1cm5zIHN0cmluZyBvbiB1bmRlZmluZWRcbiAgICB2YXIgYXJncyA9IFtpdF1cbiAgICAgICwgaSAgICA9IDFcbiAgICAgICwgcmVwbGFjZXIsICRyZXBsYWNlcjtcbiAgICB3aGlsZShhcmd1bWVudHMubGVuZ3RoID4gaSlhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHJlcGxhY2VyID0gYXJnc1sxXTtcbiAgICBpZih0eXBlb2YgcmVwbGFjZXIgPT0gJ2Z1bmN0aW9uJykkcmVwbGFjZXIgPSByZXBsYWNlcjtcbiAgICBpZigkcmVwbGFjZXIgfHwgIWlzQXJyYXkocmVwbGFjZXIpKXJlcGxhY2VyID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XG4gICAgICBpZigkcmVwbGFjZXIpdmFsdWUgPSAkcmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKTtcbiAgICAgIGlmKCFpc1N5bWJvbCh2YWx1ZSkpcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgYXJnc1sxXSA9IHJlcGxhY2VyO1xuICAgIHJldHVybiBfc3RyaW5naWZ5LmFwcGx5KCRKU09OLCBhcmdzKTtcbiAgfVxufSk7XG5cbi8vIDE5LjQuMy40IFN5bWJvbC5wcm90b3R5cGVbQEB0b1ByaW1pdGl2ZV0oaGludClcbiRTeW1ib2xbUFJPVE9UWVBFXVtUT19QUklNSVRJVkVdIHx8IHJlcXVpcmUoJy4vX2hpZGUnKSgkU3ltYm9sW1BST1RPVFlQRV0sIFRPX1BSSU1JVElWRSwgJFN5bWJvbFtQUk9UT1RZUEVdLnZhbHVlT2YpO1xuLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoJFN5bWJvbCwgJ1N5bWJvbCcpO1xuLy8gMjAuMi4xLjkgTWF0aFtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoTWF0aCwgJ01hdGgnLCB0cnVlKTtcbi8vIDI0LjMuMyBKU09OW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhnbG9iYWwuSlNPTiwgJ0pTT04nLCB0cnVlKTsiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4vLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge2NyZWF0ZTogcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpfSk7IiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0Jywge2RlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mfSk7IiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi4zIC8gMTUuMi4zLjcgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7ZGVmaW5lUHJvcGVydGllczogcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpfSk7IiwiLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgY29yZSAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGZhaWxzICAgPSByZXF1aXJlKCcuL19mYWlscycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVksIGV4ZWMpe1xuICB2YXIgZm4gID0gKGNvcmUuT2JqZWN0IHx8IHt9KVtLRVldIHx8IE9iamVjdFtLRVldXG4gICAgLCBleHAgPSB7fTtcbiAgZXhwW0tFWV0gPSBleGVjKGZuKTtcbiAgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiBmYWlscyhmdW5jdGlvbigpeyBmbigxKTsgfSksICdPYmplY3QnLCBleHApO1xufTsiLCIvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG52YXIgdG9JT2JqZWN0ICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmY7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJywgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgICByZXR1cm4gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0b0lPYmplY3QoaXQpLCBrZXkpO1xuICB9O1xufSk7IiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59OyIsIi8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgaGFzICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHRvT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJRV9QUk9UTyAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKVxuICAsIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24oTyl7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYoaGFzKE8sIElFX1BST1RPKSlyZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3Ipe1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07IiwiLy8gMTkuMS4yLjkgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgdG9PYmplY3QgICAgICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCAkZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnZ2V0UHJvdG90eXBlT2YnLCBmdW5jdGlvbigpe1xuICByZXR1cm4gZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YoaXQpe1xuICAgIHJldHVybiAkZ2V0UHJvdG90eXBlT2YodG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pOyIsIi8vIDE5LjEuMi4xNCBPYmplY3Qua2V5cyhPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCAka2V5cyAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgna2V5cycsIGZ1bmN0aW9uKCl7XG4gIHJldHVybiBmdW5jdGlvbiBrZXlzKGl0KXtcbiAgICByZXR1cm4gJGtleXModG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pOyIsIi8vIDE5LjEuMi43IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2dldE93blByb3BlcnR5TmFtZXMnLCBmdW5jdGlvbigpe1xuICByZXR1cm4gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4tZXh0JykuZjtcbn0pOyIsIi8vIDE5LjEuMi41IE9iamVjdC5mcmVlemUoTylcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgbWV0YSAgICAgPSByZXF1aXJlKCcuL19tZXRhJykub25GcmVlemU7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnZnJlZXplJywgZnVuY3Rpb24oJGZyZWV6ZSl7XG4gIHJldHVybiBmdW5jdGlvbiBmcmVlemUoaXQpe1xuICAgIHJldHVybiAkZnJlZXplICYmIGlzT2JqZWN0KGl0KSA/ICRmcmVlemUobWV0YShpdCkpIDogaXQ7XG4gIH07XG59KTsiLCIvLyAxOS4xLjIuMTcgT2JqZWN0LnNlYWwoTylcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgbWV0YSAgICAgPSByZXF1aXJlKCcuL19tZXRhJykub25GcmVlemU7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnc2VhbCcsIGZ1bmN0aW9uKCRzZWFsKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHNlYWwoaXQpe1xuICAgIHJldHVybiAkc2VhbCAmJiBpc09iamVjdChpdCkgPyAkc2VhbChtZXRhKGl0KSkgOiBpdDtcbiAgfTtcbn0pOyIsIi8vIDE5LjEuMi4xNSBPYmplY3QucHJldmVudEV4dGVuc2lvbnMoTylcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgbWV0YSAgICAgPSByZXF1aXJlKCcuL19tZXRhJykub25GcmVlemU7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgncHJldmVudEV4dGVuc2lvbnMnLCBmdW5jdGlvbigkcHJldmVudEV4dGVuc2lvbnMpe1xuICByZXR1cm4gZnVuY3Rpb24gcHJldmVudEV4dGVuc2lvbnMoaXQpe1xuICAgIHJldHVybiAkcHJldmVudEV4dGVuc2lvbnMgJiYgaXNPYmplY3QoaXQpID8gJHByZXZlbnRFeHRlbnNpb25zKG1ldGEoaXQpKSA6IGl0O1xuICB9O1xufSk7IiwiLy8gMTkuMS4yLjEyIE9iamVjdC5pc0Zyb3plbihPKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnaXNGcm96ZW4nLCBmdW5jdGlvbigkaXNGcm96ZW4pe1xuICByZXR1cm4gZnVuY3Rpb24gaXNGcm96ZW4oaXQpe1xuICAgIHJldHVybiBpc09iamVjdChpdCkgPyAkaXNGcm96ZW4gPyAkaXNGcm96ZW4oaXQpIDogZmFsc2UgOiB0cnVlO1xuICB9O1xufSk7IiwiLy8gMTkuMS4yLjEzIE9iamVjdC5pc1NlYWxlZChPKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnaXNTZWFsZWQnLCBmdW5jdGlvbigkaXNTZWFsZWQpe1xuICByZXR1cm4gZnVuY3Rpb24gaXNTZWFsZWQoaXQpe1xuICAgIHJldHVybiBpc09iamVjdChpdCkgPyAkaXNTZWFsZWQgPyAkaXNTZWFsZWQoaXQpIDogZmFsc2UgOiB0cnVlO1xuICB9O1xufSk7IiwiLy8gMTkuMS4yLjExIE9iamVjdC5pc0V4dGVuc2libGUoTylcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2lzRXh0ZW5zaWJsZScsIGZ1bmN0aW9uKCRpc0V4dGVuc2libGUpe1xuICByZXR1cm4gZnVuY3Rpb24gaXNFeHRlbnNpYmxlKGl0KXtcbiAgICByZXR1cm4gaXNPYmplY3QoaXQpID8gJGlzRXh0ZW5zaWJsZSA/ICRpc0V4dGVuc2libGUoaXQpIDogdHJ1ZSA6IGZhbHNlO1xuICB9O1xufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIGdldEtleXMgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIGdPUFMgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKVxuICAsIHBJRSAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpXG4gICwgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIElPYmplY3QgID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgJGFzc2lnbiAgPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICB2YXIgQSA9IHt9XG4gICAgLCBCID0ge31cbiAgICAsIFMgPSBTeW1ib2woKVxuICAgICwgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uKGspeyBCW2tdID0gazsgfSk7XG4gIHJldHVybiAkYXNzaWduKHt9LCBBKVtTXSAhPSA3IHx8IE9iamVjdC5rZXlzKCRhc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBLO1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUICAgICA9IHRvT2JqZWN0KHRhcmdldClcbiAgICAsIGFMZW4gID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICwgaW5kZXggPSAxXG4gICAgLCBnZXRTeW1ib2xzID0gZ09QUy5mXG4gICAgLCBpc0VudW0gICAgID0gcElFLmY7XG4gIHdoaWxlKGFMZW4gPiBpbmRleCl7XG4gICAgdmFyIFMgICAgICA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKVxuICAgICAgLCBrZXlzICAgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpXG4gICAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgICAsIGogICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKGxlbmd0aCA+IGopaWYoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSlUW2tleV0gPSBTW2tleV07XG4gIH0gcmV0dXJuIFQ7XG59IDogJGFzc2lnbjsiLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7YXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJyl9KTsiLCIvLyA3LjIuOSBTYW1lVmFsdWUoeCwgeSlcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmlzIHx8IGZ1bmN0aW9uIGlzKHgsIHkpe1xuICByZXR1cm4geCA9PT0geSA/IHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5IDogeCAhPSB4ICYmIHkgIT0geTtcbn07IiwiLy8gMTkuMS4zLjEwIE9iamVjdC5pcyh2YWx1ZTEsIHZhbHVlMilcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtpczogcmVxdWlyZSgnLi9fc2FtZS12YWx1ZScpfSk7IiwiLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24oTywgcHJvdG8pe1xuICBhbk9iamVjdChPKTtcbiAgaWYoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCl0aHJvdyBUeXBlRXJyb3IocHJvdG8gKyBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBmdW5jdGlvbih0ZXN0LCBidWdneSwgc2V0KXtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IHJlcXVpcmUoJy4vX2N0eCcpKEZ1bmN0aW9uLmNhbGwsIHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgc2V0KHRlc3QsIFtdKTtcbiAgICAgICAgYnVnZ3kgPSAhKHRlc3QgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgICB9IGNhdGNoKGUpeyBidWdneSA9IHRydWU7IH1cbiAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90byl7XG4gICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgaWYoYnVnZ3kpTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICAgICAgZWxzZSBzZXQoTywgcHJvdG8pO1xuICAgICAgICByZXR1cm4gTztcbiAgICAgIH07XG4gICAgfSh7fSwgZmFsc2UpIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59OyIsIi8vIDE5LjEuMy4xOSBPYmplY3Quc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7c2V0UHJvdG90eXBlT2Y6IHJlcXVpcmUoJy4vX3NldC1wcm90bycpLnNldH0pOyIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKVxuICAvLyBFUzMgd3JvbmcgaGVyZVxuICAsIEFSRyA9IGNvZihmdW5jdGlvbigpeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsIHRlc3QgICAgPSB7fTtcbnRlc3RbcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyldID0gJ3onO1xuaWYodGVzdCArICcnICE9ICdbb2JqZWN0IHpdJyl7XG4gIHJlcXVpcmUoJy4vX3JlZGVmaW5lJykoT2JqZWN0LnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gJ1tvYmplY3QgJyArIGNsYXNzb2YodGhpcykgKyAnXSc7XG4gIH0sIHRydWUpO1xufSIsIi8vIGZhc3QgYXBwbHksIGh0dHA6Ly9qc3BlcmYubG5raXQuY29tL2Zhc3QtYXBwbHkvNVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgYXJncywgdGhhdCl7XG4gIHZhciB1biA9IHRoYXQgPT09IHVuZGVmaW5lZDtcbiAgc3dpdGNoKGFyZ3MubGVuZ3RoKXtcbiAgICBjYXNlIDA6IHJldHVybiB1biA/IGZuKClcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCk7XG4gICAgY2FzZSAxOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgY2FzZSA0OiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgfSByZXR1cm4gICAgICAgICAgICAgIGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgYUZ1bmN0aW9uICA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsIGlzT2JqZWN0ICAgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGludm9rZSAgICAgPSByZXF1aXJlKCcuL19pbnZva2UnKVxuICAsIGFycmF5U2xpY2UgPSBbXS5zbGljZVxuICAsIGZhY3RvcmllcyAgPSB7fTtcblxudmFyIGNvbnN0cnVjdCA9IGZ1bmN0aW9uKEYsIGxlbiwgYXJncyl7XG4gIGlmKCEobGVuIGluIGZhY3Rvcmllcykpe1xuICAgIGZvcih2YXIgbiA9IFtdLCBpID0gMDsgaSA8IGxlbjsgaSsrKW5baV0gPSAnYVsnICsgaSArICddJztcbiAgICBmYWN0b3JpZXNbbGVuXSA9IEZ1bmN0aW9uKCdGLGEnLCAncmV0dXJuIG5ldyBGKCcgKyBuLmpvaW4oJywnKSArICcpJyk7XG4gIH0gcmV0dXJuIGZhY3Rvcmllc1tsZW5dKEYsIGFyZ3MpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBGdW5jdGlvbi5iaW5kIHx8IGZ1bmN0aW9uIGJpbmQodGhhdCAvKiwgYXJncy4uLiAqLyl7XG4gIHZhciBmbiAgICAgICA9IGFGdW5jdGlvbih0aGlzKVxuICAgICwgcGFydEFyZ3MgPSBhcnJheVNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgdmFyIGJvdW5kID0gZnVuY3Rpb24oLyogYXJncy4uLiAqLyl7XG4gICAgdmFyIGFyZ3MgPSBwYXJ0QXJncy5jb25jYXQoYXJyYXlTbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgYm91bmQgPyBjb25zdHJ1Y3QoZm4sIGFyZ3MubGVuZ3RoLCBhcmdzKSA6IGludm9rZShmbiwgYXJncywgdGhhdCk7XG4gIH07XG4gIGlmKGlzT2JqZWN0KGZuLnByb3RvdHlwZSkpYm91bmQucHJvdG90eXBlID0gZm4ucHJvdG90eXBlO1xuICByZXR1cm4gYm91bmQ7XG59OyIsIi8vIDE5LjIuMy4yIC8gMTUuMy40LjUgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQodGhpc0FyZywgYXJncy4uLilcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QLCAnRnVuY3Rpb24nLCB7YmluZDogcmVxdWlyZSgnLi9fYmluZCcpfSk7IiwidmFyIGRQICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIGhhcyAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIEZQcm90byAgICAgPSBGdW5jdGlvbi5wcm90b3R5cGVcbiAgLCBuYW1lUkUgICAgID0gL15cXHMqZnVuY3Rpb24gKFteIChdKikvXG4gICwgTkFNRSAgICAgICA9ICduYW1lJztcblxudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vLyAxOS4yLjQuMiBuYW1lXG5OQU1FIGluIEZQcm90byB8fCByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmIGRQKEZQcm90bywgTkFNRSwge1xuICBjb25maWd1cmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKXtcbiAgICB0cnkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICAgICwgbmFtZSA9ICgnJyArIHRoYXQpLm1hdGNoKG5hbWVSRSlbMV07XG4gICAgICBoYXModGhhdCwgTkFNRSkgfHwgIWlzRXh0ZW5zaWJsZSh0aGF0KSB8fCBkUCh0aGF0LCBOQU1FLCBjcmVhdGVEZXNjKDUsIG5hbWUpKTtcbiAgICAgIHJldHVybiBuYW1lO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgaXNPYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgSEFTX0lOU1RBTkNFICAgPSByZXF1aXJlKCcuL193a3MnKSgnaGFzSW5zdGFuY2UnKVxuICAsIEZ1bmN0aW9uUHJvdG8gID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuLy8gMTkuMi4zLjYgRnVuY3Rpb24ucHJvdG90eXBlW0BAaGFzSW5zdGFuY2VdKFYpXG5pZighKEhBU19JTlNUQU5DRSBpbiBGdW5jdGlvblByb3RvKSlyZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mKEZ1bmN0aW9uUHJvdG8sIEhBU19JTlNUQU5DRSwge3ZhbHVlOiBmdW5jdGlvbihPKXtcbiAgaWYodHlwZW9mIHRoaXMgIT0gJ2Z1bmN0aW9uJyB8fCAhaXNPYmplY3QoTykpcmV0dXJuIGZhbHNlO1xuICBpZighaXNPYmplY3QodGhpcy5wcm90b3R5cGUpKXJldHVybiBPIGluc3RhbmNlb2YgdGhpcztcbiAgLy8gZm9yIGVudmlyb25tZW50IHcvbyBuYXRpdmUgYEBAaGFzSW5zdGFuY2VgIGxvZ2ljIGVub3VnaCBgaW5zdGFuY2VvZmAsIGJ1dCBhZGQgdGhpczpcbiAgd2hpbGUoTyA9IGdldFByb3RvdHlwZU9mKE8pKWlmKHRoaXMucHJvdG90eXBlID09PSBPKXJldHVybiB0cnVlO1xuICByZXR1cm4gZmFsc2U7XG59fSk7IiwibW9kdWxlLmV4cG9ydHMgPSAnXFx4MDlcXHgwQVxceDBCXFx4MENcXHgwRFxceDIwXFx4QTBcXHUxNjgwXFx1MTgwRVxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDMnICtcbiAgJ1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMEFcXHUyMDJGXFx1MjA1RlxcdTMwMDBcXHUyMDI4XFx1MjAyOVxcdUZFRkYnOyIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpXG4gICwgZmFpbHMgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcbiAgLCBzcGFjZXMgID0gcmVxdWlyZSgnLi9fc3RyaW5nLXdzJylcbiAgLCBzcGFjZSAgID0gJ1snICsgc3BhY2VzICsgJ10nXG4gICwgbm9uICAgICA9ICdcXHUyMDBiXFx1MDA4NSdcbiAgLCBsdHJpbSAgID0gUmVnRXhwKCdeJyArIHNwYWNlICsgc3BhY2UgKyAnKicpXG4gICwgcnRyaW0gICA9IFJlZ0V4cChzcGFjZSArIHNwYWNlICsgJyokJyk7XG5cbnZhciBleHBvcnRlciA9IGZ1bmN0aW9uKEtFWSwgZXhlYywgQUxJQVMpe1xuICB2YXIgZXhwICAgPSB7fTtcbiAgdmFyIEZPUkNFID0gZmFpbHMoZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gISFzcGFjZXNbS0VZXSgpIHx8IG5vbltLRVldKCkgIT0gbm9uO1xuICB9KTtcbiAgdmFyIGZuID0gZXhwW0tFWV0gPSBGT1JDRSA/IGV4ZWModHJpbSkgOiBzcGFjZXNbS0VZXTtcbiAgaWYoQUxJQVMpZXhwW0FMSUFTXSA9IGZuO1xuICAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIEZPUkNFLCAnU3RyaW5nJywgZXhwKTtcbn07XG5cbi8vIDEgLT4gU3RyaW5nI3RyaW1MZWZ0XG4vLyAyIC0+IFN0cmluZyN0cmltUmlnaHRcbi8vIDMgLT4gU3RyaW5nI3RyaW1cbnZhciB0cmltID0gZXhwb3J0ZXIudHJpbSA9IGZ1bmN0aW9uKHN0cmluZywgVFlQRSl7XG4gIHN0cmluZyA9IFN0cmluZyhkZWZpbmVkKHN0cmluZykpO1xuICBpZihUWVBFICYgMSlzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShsdHJpbSwgJycpO1xuICBpZihUWVBFICYgMilzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShydHJpbSwgJycpO1xuICByZXR1cm4gc3RyaW5nO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRlcjsiLCJ2YXIgJHBhcnNlSW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykucGFyc2VJbnRcbiAgLCAkdHJpbSAgICAgPSByZXF1aXJlKCcuL19zdHJpbmctdHJpbScpLnRyaW1cbiAgLCB3cyAgICAgICAgPSByZXF1aXJlKCcuL19zdHJpbmctd3MnKVxuICAsIGhleCAgICAgICA9IC9eW1xcLStdPzBbeFhdLztcblxubW9kdWxlLmV4cG9ydHMgPSAkcGFyc2VJbnQod3MgKyAnMDgnKSAhPT0gOCB8fCAkcGFyc2VJbnQod3MgKyAnMHgxNicpICE9PSAyMiA/IGZ1bmN0aW9uIHBhcnNlSW50KHN0ciwgcmFkaXgpe1xuICB2YXIgc3RyaW5nID0gJHRyaW0oU3RyaW5nKHN0ciksIDMpO1xuICByZXR1cm4gJHBhcnNlSW50KHN0cmluZywgKHJhZGl4ID4+PiAwKSB8fCAoaGV4LnRlc3Qoc3RyaW5nKSA/IDE2IDogMTApKTtcbn0gOiAkcGFyc2VJbnQ7IiwidmFyICRleHBvcnQgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJHBhcnNlSW50ID0gcmVxdWlyZSgnLi9fcGFyc2UtaW50Jyk7XG4vLyAxOC4yLjUgcGFyc2VJbnQoc3RyaW5nLCByYWRpeClcbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5GICogKHBhcnNlSW50ICE9ICRwYXJzZUludCksIHtwYXJzZUludDogJHBhcnNlSW50fSk7IiwidmFyICRwYXJzZUZsb2F0ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykucGFyc2VGbG9hdFxuICAsICR0cmltICAgICAgID0gcmVxdWlyZSgnLi9fc3RyaW5nLXRyaW0nKS50cmltO1xuXG5tb2R1bGUuZXhwb3J0cyA9IDEgLyAkcGFyc2VGbG9hdChyZXF1aXJlKCcuL19zdHJpbmctd3MnKSArICctMCcpICE9PSAtSW5maW5pdHkgPyBmdW5jdGlvbiBwYXJzZUZsb2F0KHN0cil7XG4gIHZhciBzdHJpbmcgPSAkdHJpbShTdHJpbmcoc3RyKSwgMylcbiAgICAsIHJlc3VsdCA9ICRwYXJzZUZsb2F0KHN0cmluZyk7XG4gIHJldHVybiByZXN1bHQgPT09IDAgJiYgc3RyaW5nLmNoYXJBdCgwKSA9PSAnLScgPyAtMCA6IHJlc3VsdDtcbn0gOiAkcGFyc2VGbG9hdDsiLCJ2YXIgJGV4cG9ydCAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRwYXJzZUZsb2F0ID0gcmVxdWlyZSgnLi9fcGFyc2UtZmxvYXQnKTtcbi8vIDE4LjIuNCBwYXJzZUZsb2F0KHN0cmluZylcbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5GICogKHBhcnNlRmxvYXQgIT0gJHBhcnNlRmxvYXQpLCB7cGFyc2VGbG9hdDogJHBhcnNlRmxvYXR9KTsiLCJ2YXIgaXNPYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fc2V0LXByb3RvJykuc2V0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0aGF0LCB0YXJnZXQsIEMpe1xuICB2YXIgUCwgUyA9IHRhcmdldC5jb25zdHJ1Y3RvcjtcbiAgaWYoUyAhPT0gQyAmJiB0eXBlb2YgUyA9PSAnZnVuY3Rpb24nICYmIChQID0gUy5wcm90b3R5cGUpICE9PSBDLnByb3RvdHlwZSAmJiBpc09iamVjdChQKSAmJiBzZXRQcm90b3R5cGVPZil7XG4gICAgc2V0UHJvdG90eXBlT2YodGhhdCwgUCk7XG4gIH0gcmV0dXJuIHRoYXQ7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGFzICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIGNvZiAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY29mJylcbiAgLCBpbmhlcml0SWZSZXF1aXJlZCA9IHJlcXVpcmUoJy4vX2luaGVyaXQtaWYtcmVxdWlyZWQnKVxuICAsIHRvUHJpbWl0aXZlICAgICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBmYWlscyAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcbiAgLCBnT1BOICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZlxuICAsIGdPUEQgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKS5mXG4gICwgZFAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgJHRyaW0gICAgICAgICAgICAgPSByZXF1aXJlKCcuL19zdHJpbmctdHJpbScpLnRyaW1cbiAgLCBOVU1CRVIgICAgICAgICAgICA9ICdOdW1iZXInXG4gICwgJE51bWJlciAgICAgICAgICAgPSBnbG9iYWxbTlVNQkVSXVxuICAsIEJhc2UgICAgICAgICAgICAgID0gJE51bWJlclxuICAsIHByb3RvICAgICAgICAgICAgID0gJE51bWJlci5wcm90b3R5cGVcbiAgLy8gT3BlcmEgfjEyIGhhcyBicm9rZW4gT2JqZWN0I3RvU3RyaW5nXG4gICwgQlJPS0VOX0NPRiAgICAgICAgPSBjb2YocmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpKHByb3RvKSkgPT0gTlVNQkVSXG4gICwgVFJJTSAgICAgICAgICAgICAgPSAndHJpbScgaW4gU3RyaW5nLnByb3RvdHlwZTtcblxuLy8gNy4xLjMgVG9OdW1iZXIoYXJndW1lbnQpXG52YXIgdG9OdW1iZXIgPSBmdW5jdGlvbihhcmd1bWVudCl7XG4gIHZhciBpdCA9IHRvUHJpbWl0aXZlKGFyZ3VtZW50LCBmYWxzZSk7XG4gIGlmKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyAmJiBpdC5sZW5ndGggPiAyKXtcbiAgICBpdCA9IFRSSU0gPyBpdC50cmltKCkgOiAkdHJpbShpdCwgMyk7XG4gICAgdmFyIGZpcnN0ID0gaXQuY2hhckNvZGVBdCgwKVxuICAgICAgLCB0aGlyZCwgcmFkaXgsIG1heENvZGU7XG4gICAgaWYoZmlyc3QgPT09IDQzIHx8IGZpcnN0ID09PSA0NSl7XG4gICAgICB0aGlyZCA9IGl0LmNoYXJDb2RlQXQoMik7XG4gICAgICBpZih0aGlyZCA9PT0gODggfHwgdGhpcmQgPT09IDEyMClyZXR1cm4gTmFOOyAvLyBOdW1iZXIoJysweDEnKSBzaG91bGQgYmUgTmFOLCBvbGQgVjggZml4XG4gICAgfSBlbHNlIGlmKGZpcnN0ID09PSA0OCl7XG4gICAgICBzd2l0Y2goaXQuY2hhckNvZGVBdCgxKSl7XG4gICAgICAgIGNhc2UgNjYgOiBjYXNlIDk4ICA6IHJhZGl4ID0gMjsgbWF4Q29kZSA9IDQ5OyBicmVhazsgLy8gZmFzdCBlcXVhbCAvXjBiWzAxXSskL2lcbiAgICAgICAgY2FzZSA3OSA6IGNhc2UgMTExIDogcmFkaXggPSA4OyBtYXhDb2RlID0gNTU7IGJyZWFrOyAvLyBmYXN0IGVxdWFsIC9eMG9bMC03XSskL2lcbiAgICAgICAgZGVmYXVsdCA6IHJldHVybiAraXQ7XG4gICAgICB9XG4gICAgICBmb3IodmFyIGRpZ2l0cyA9IGl0LnNsaWNlKDIpLCBpID0gMCwgbCA9IGRpZ2l0cy5sZW5ndGgsIGNvZGU7IGkgPCBsOyBpKyspe1xuICAgICAgICBjb2RlID0gZGlnaXRzLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIC8vIHBhcnNlSW50IHBhcnNlcyBhIHN0cmluZyB0byBhIGZpcnN0IHVuYXZhaWxhYmxlIHN5bWJvbFxuICAgICAgICAvLyBidXQgVG9OdW1iZXIgc2hvdWxkIHJldHVybiBOYU4gaWYgYSBzdHJpbmcgY29udGFpbnMgdW5hdmFpbGFibGUgc3ltYm9sc1xuICAgICAgICBpZihjb2RlIDwgNDggfHwgY29kZSA+IG1heENvZGUpcmV0dXJuIE5hTjtcbiAgICAgIH0gcmV0dXJuIHBhcnNlSW50KGRpZ2l0cywgcmFkaXgpO1xuICAgIH1cbiAgfSByZXR1cm4gK2l0O1xufTtcblxuaWYoISROdW1iZXIoJyAwbzEnKSB8fCAhJE51bWJlcignMGIxJykgfHwgJE51bWJlcignKzB4MScpKXtcbiAgJE51bWJlciA9IGZ1bmN0aW9uIE51bWJlcih2YWx1ZSl7XG4gICAgdmFyIGl0ID0gYXJndW1lbnRzLmxlbmd0aCA8IDEgPyAwIDogdmFsdWVcbiAgICAgICwgdGhhdCA9IHRoaXM7XG4gICAgcmV0dXJuIHRoYXQgaW5zdGFuY2VvZiAkTnVtYmVyXG4gICAgICAvLyBjaGVjayBvbiAxLi5jb25zdHJ1Y3Rvcihmb28pIGNhc2VcbiAgICAgICYmIChCUk9LRU5fQ09GID8gZmFpbHMoZnVuY3Rpb24oKXsgcHJvdG8udmFsdWVPZi5jYWxsKHRoYXQpOyB9KSA6IGNvZih0aGF0KSAhPSBOVU1CRVIpXG4gICAgICAgID8gaW5oZXJpdElmUmVxdWlyZWQobmV3IEJhc2UodG9OdW1iZXIoaXQpKSwgdGhhdCwgJE51bWJlcikgOiB0b051bWJlcihpdCk7XG4gIH07XG4gIGZvcih2YXIga2V5cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBnT1BOKEJhc2UpIDogKFxuICAgIC8vIEVTMzpcbiAgICAnTUFYX1ZBTFVFLE1JTl9WQUxVRSxOYU4sTkVHQVRJVkVfSU5GSU5JVFksUE9TSVRJVkVfSU5GSU5JVFksJyArXG4gICAgLy8gRVM2IChpbiBjYXNlLCBpZiBtb2R1bGVzIHdpdGggRVM2IE51bWJlciBzdGF0aWNzIHJlcXVpcmVkIGJlZm9yZSk6XG4gICAgJ0VQU0lMT04saXNGaW5pdGUsaXNJbnRlZ2VyLGlzTmFOLGlzU2FmZUludGVnZXIsTUFYX1NBRkVfSU5URUdFUiwnICtcbiAgICAnTUlOX1NBRkVfSU5URUdFUixwYXJzZUZsb2F0LHBhcnNlSW50LGlzSW50ZWdlcidcbiAgKS5zcGxpdCgnLCcpLCBqID0gMCwga2V5OyBrZXlzLmxlbmd0aCA+IGo7IGorKyl7XG4gICAgaWYoaGFzKEJhc2UsIGtleSA9IGtleXNbal0pICYmICFoYXMoJE51bWJlciwga2V5KSl7XG4gICAgICBkUCgkTnVtYmVyLCBrZXksIGdPUEQoQmFzZSwga2V5KSk7XG4gICAgfVxuICB9XG4gICROdW1iZXIucHJvdG90eXBlID0gcHJvdG87XG4gIHByb3RvLmNvbnN0cnVjdG9yID0gJE51bWJlcjtcbiAgcmVxdWlyZSgnLi9fcmVkZWZpbmUnKShnbG9iYWwsIE5VTUJFUiwgJE51bWJlcik7XG59IiwidmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgbXNnKXtcbiAgaWYodHlwZW9mIGl0ICE9ICdudW1iZXInICYmIGNvZihpdCkgIT0gJ051bWJlcicpdGhyb3cgVHlwZUVycm9yKG1zZyk7XG4gIHJldHVybiAraXQ7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVwZWF0KGNvdW50KXtcbiAgdmFyIHN0ciA9IFN0cmluZyhkZWZpbmVkKHRoaXMpKVxuICAgICwgcmVzID0gJydcbiAgICAsIG4gICA9IHRvSW50ZWdlcihjb3VudCk7XG4gIGlmKG4gPCAwIHx8IG4gPT0gSW5maW5pdHkpdGhyb3cgUmFuZ2VFcnJvcihcIkNvdW50IGNhbid0IGJlIG5lZ2F0aXZlXCIpO1xuICBmb3IoO24gPiAwOyAobiA+Pj49IDEpICYmIChzdHIgKz0gc3RyKSlpZihuICYgMSlyZXMgKz0gc3RyO1xuICByZXR1cm4gcmVzO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCB0b0ludGVnZXIgICAgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBhTnVtYmVyVmFsdWUgPSByZXF1aXJlKCcuL19hLW51bWJlci12YWx1ZScpXG4gICwgcmVwZWF0ICAgICAgID0gcmVxdWlyZSgnLi9fc3RyaW5nLXJlcGVhdCcpXG4gICwgJHRvRml4ZWQgICAgID0gMS4udG9GaXhlZFxuICAsIGZsb29yICAgICAgICA9IE1hdGguZmxvb3JcbiAgLCBkYXRhICAgICAgICAgPSBbMCwgMCwgMCwgMCwgMCwgMF1cbiAgLCBFUlJPUiAgICAgICAgPSAnTnVtYmVyLnRvRml4ZWQ6IGluY29ycmVjdCBpbnZvY2F0aW9uISdcbiAgLCBaRVJPICAgICAgICAgPSAnMCc7XG5cbnZhciBtdWx0aXBseSA9IGZ1bmN0aW9uKG4sIGMpe1xuICB2YXIgaSAgPSAtMVxuICAgICwgYzIgPSBjO1xuICB3aGlsZSgrK2kgPCA2KXtcbiAgICBjMiArPSBuICogZGF0YVtpXTtcbiAgICBkYXRhW2ldID0gYzIgJSAxZTc7XG4gICAgYzIgPSBmbG9vcihjMiAvIDFlNyk7XG4gIH1cbn07XG52YXIgZGl2aWRlID0gZnVuY3Rpb24obil7XG4gIHZhciBpID0gNlxuICAgICwgYyA9IDA7XG4gIHdoaWxlKC0taSA+PSAwKXtcbiAgICBjICs9IGRhdGFbaV07XG4gICAgZGF0YVtpXSA9IGZsb29yKGMgLyBuKTtcbiAgICBjID0gKGMgJSBuKSAqIDFlNztcbiAgfVxufTtcbnZhciBudW1Ub1N0cmluZyA9IGZ1bmN0aW9uKCl7XG4gIHZhciBpID0gNlxuICAgICwgcyA9ICcnO1xuICB3aGlsZSgtLWkgPj0gMCl7XG4gICAgaWYocyAhPT0gJycgfHwgaSA9PT0gMCB8fCBkYXRhW2ldICE9PSAwKXtcbiAgICAgIHZhciB0ID0gU3RyaW5nKGRhdGFbaV0pO1xuICAgICAgcyA9IHMgPT09ICcnID8gdCA6IHMgKyByZXBlYXQuY2FsbChaRVJPLCA3IC0gdC5sZW5ndGgpICsgdDtcbiAgICB9XG4gIH0gcmV0dXJuIHM7XG59O1xudmFyIHBvdyA9IGZ1bmN0aW9uKHgsIG4sIGFjYyl7XG4gIHJldHVybiBuID09PSAwID8gYWNjIDogbiAlIDIgPT09IDEgPyBwb3coeCwgbiAtIDEsIGFjYyAqIHgpIDogcG93KHggKiB4LCBuIC8gMiwgYWNjKTtcbn07XG52YXIgbG9nID0gZnVuY3Rpb24oeCl7XG4gIHZhciBuICA9IDBcbiAgICAsIHgyID0geDtcbiAgd2hpbGUoeDIgPj0gNDA5Nil7XG4gICAgbiArPSAxMjtcbiAgICB4MiAvPSA0MDk2O1xuICB9XG4gIHdoaWxlKHgyID49IDIpe1xuICAgIG4gICs9IDE7XG4gICAgeDIgLz0gMjtcbiAgfSByZXR1cm4gbjtcbn07XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKCEhJHRvRml4ZWQgJiYgKFxuICAwLjAwMDA4LnRvRml4ZWQoMykgIT09ICcwLjAwMCcgfHxcbiAgMC45LnRvRml4ZWQoMCkgIT09ICcxJyB8fFxuICAxLjI1NS50b0ZpeGVkKDIpICE9PSAnMS4yNScgfHxcbiAgMTAwMDAwMDAwMDAwMDAwMDEyOC4udG9GaXhlZCgwKSAhPT0gJzEwMDAwMDAwMDAwMDAwMDAxMjgnXG4pIHx8ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIC8vIFY4IH4gQW5kcm9pZCA0LjMtXG4gICR0b0ZpeGVkLmNhbGwoe30pO1xufSkpLCAnTnVtYmVyJywge1xuICB0b0ZpeGVkOiBmdW5jdGlvbiB0b0ZpeGVkKGZyYWN0aW9uRGlnaXRzKXtcbiAgICB2YXIgeCA9IGFOdW1iZXJWYWx1ZSh0aGlzLCBFUlJPUilcbiAgICAgICwgZiA9IHRvSW50ZWdlcihmcmFjdGlvbkRpZ2l0cylcbiAgICAgICwgcyA9ICcnXG4gICAgICAsIG0gPSBaRVJPXG4gICAgICAsIGUsIHosIGosIGs7XG4gICAgaWYoZiA8IDAgfHwgZiA+IDIwKXRocm93IFJhbmdlRXJyb3IoRVJST1IpO1xuICAgIGlmKHggIT0geClyZXR1cm4gJ05hTic7XG4gICAgaWYoeCA8PSAtMWUyMSB8fCB4ID49IDFlMjEpcmV0dXJuIFN0cmluZyh4KTtcbiAgICBpZih4IDwgMCl7XG4gICAgICBzID0gJy0nO1xuICAgICAgeCA9IC14O1xuICAgIH1cbiAgICBpZih4ID4gMWUtMjEpe1xuICAgICAgZSA9IGxvZyh4ICogcG93KDIsIDY5LCAxKSkgLSA2OTtcbiAgICAgIHogPSBlIDwgMCA/IHggKiBwb3coMiwgLWUsIDEpIDogeCAvIHBvdygyLCBlLCAxKTtcbiAgICAgIHogKj0gMHgxMDAwMDAwMDAwMDAwMDtcbiAgICAgIGUgPSA1MiAtIGU7XG4gICAgICBpZihlID4gMCl7XG4gICAgICAgIG11bHRpcGx5KDAsIHopO1xuICAgICAgICBqID0gZjtcbiAgICAgICAgd2hpbGUoaiA+PSA3KXtcbiAgICAgICAgICBtdWx0aXBseSgxZTcsIDApO1xuICAgICAgICAgIGogLT0gNztcbiAgICAgICAgfVxuICAgICAgICBtdWx0aXBseShwb3coMTAsIGosIDEpLCAwKTtcbiAgICAgICAgaiA9IGUgLSAxO1xuICAgICAgICB3aGlsZShqID49IDIzKXtcbiAgICAgICAgICBkaXZpZGUoMSA8PCAyMyk7XG4gICAgICAgICAgaiAtPSAyMztcbiAgICAgICAgfVxuICAgICAgICBkaXZpZGUoMSA8PCBqKTtcbiAgICAgICAgbXVsdGlwbHkoMSwgMSk7XG4gICAgICAgIGRpdmlkZSgyKTtcbiAgICAgICAgbSA9IG51bVRvU3RyaW5nKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtdWx0aXBseSgwLCB6KTtcbiAgICAgICAgbXVsdGlwbHkoMSA8PCAtZSwgMCk7XG4gICAgICAgIG0gPSBudW1Ub1N0cmluZygpICsgcmVwZWF0LmNhbGwoWkVSTywgZik7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGYgPiAwKXtcbiAgICAgIGsgPSBtLmxlbmd0aDtcbiAgICAgIG0gPSBzICsgKGsgPD0gZiA/ICcwLicgKyByZXBlYXQuY2FsbChaRVJPLCBmIC0gaykgKyBtIDogbS5zbGljZSgwLCBrIC0gZikgKyAnLicgKyBtLnNsaWNlKGsgLSBmKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSBzICsgbTtcbiAgICB9IHJldHVybiBtO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkZmFpbHMgICAgICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICwgYU51bWJlclZhbHVlID0gcmVxdWlyZSgnLi9fYS1udW1iZXItdmFsdWUnKVxuICAsICR0b1ByZWNpc2lvbiA9IDEuLnRvUHJlY2lzaW9uO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqICgkZmFpbHMoZnVuY3Rpb24oKXtcbiAgLy8gSUU3LVxuICByZXR1cm4gJHRvUHJlY2lzaW9uLmNhbGwoMSwgdW5kZWZpbmVkKSAhPT0gJzEnO1xufSkgfHwgISRmYWlscyhmdW5jdGlvbigpe1xuICAvLyBWOCB+IEFuZHJvaWQgNC4zLVxuICAkdG9QcmVjaXNpb24uY2FsbCh7fSk7XG59KSksICdOdW1iZXInLCB7XG4gIHRvUHJlY2lzaW9uOiBmdW5jdGlvbiB0b1ByZWNpc2lvbihwcmVjaXNpb24pe1xuICAgIHZhciB0aGF0ID0gYU51bWJlclZhbHVlKHRoaXMsICdOdW1iZXIjdG9QcmVjaXNpb246IGluY29ycmVjdCBpbnZvY2F0aW9uIScpO1xuICAgIHJldHVybiBwcmVjaXNpb24gPT09IHVuZGVmaW5lZCA/ICR0b1ByZWNpc2lvbi5jYWxsKHRoYXQpIDogJHRvUHJlY2lzaW9uLmNhbGwodGhhdCwgcHJlY2lzaW9uKTsgXG4gIH1cbn0pOyIsIi8vIDIwLjEuMi4xIE51bWJlci5FUFNJTE9OXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHtFUFNJTE9OOiBNYXRoLnBvdygyLCAtNTIpfSk7IiwiLy8gMjAuMS4yLjIgTnVtYmVyLmlzRmluaXRlKG51bWJlcilcbnZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIF9pc0Zpbml0ZSA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmlzRmluaXRlO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHtcbiAgaXNGaW5pdGU6IGZ1bmN0aW9uIGlzRmluaXRlKGl0KXtcbiAgICByZXR1cm4gdHlwZW9mIGl0ID09ICdudW1iZXInICYmIF9pc0Zpbml0ZShpdCk7XG4gIH1cbn0pOyIsIi8vIDIwLjEuMi4zIE51bWJlci5pc0ludGVnZXIobnVtYmVyKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBmbG9vciAgICA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzSW50ZWdlcihpdCl7XG4gIHJldHVybiAhaXNPYmplY3QoaXQpICYmIGlzRmluaXRlKGl0KSAmJiBmbG9vcihpdCkgPT09IGl0O1xufTsiLCIvLyAyMC4xLjIuMyBOdW1iZXIuaXNJbnRlZ2VyKG51bWJlcilcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTnVtYmVyJywge2lzSW50ZWdlcjogcmVxdWlyZSgnLi9faXMtaW50ZWdlcicpfSk7IiwiLy8gMjAuMS4yLjQgTnVtYmVyLmlzTmFOKG51bWJlcilcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTnVtYmVyJywge1xuICBpc05hTjogZnVuY3Rpb24gaXNOYU4obnVtYmVyKXtcbiAgICByZXR1cm4gbnVtYmVyICE9IG51bWJlcjtcbiAgfVxufSk7IiwiLy8gMjAuMS4yLjUgTnVtYmVyLmlzU2FmZUludGVnZXIobnVtYmVyKVxudmFyICRleHBvcnQgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgaXNJbnRlZ2VyID0gcmVxdWlyZSgnLi9faXMtaW50ZWdlcicpXG4gICwgYWJzICAgICAgID0gTWF0aC5hYnM7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTnVtYmVyJywge1xuICBpc1NhZmVJbnRlZ2VyOiBmdW5jdGlvbiBpc1NhZmVJbnRlZ2VyKG51bWJlcil7XG4gICAgcmV0dXJuIGlzSW50ZWdlcihudW1iZXIpICYmIGFicyhudW1iZXIpIDw9IDB4MWZmZmZmZmZmZmZmZmY7XG4gIH1cbn0pOyIsIi8vIDIwLjEuMi42IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHtNQVhfU0FGRV9JTlRFR0VSOiAweDFmZmZmZmZmZmZmZmZmfSk7IiwiLy8gMjAuMS4yLjEwIE51bWJlci5NSU5fU0FGRV9JTlRFR0VSXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHtNSU5fU0FGRV9JTlRFR0VSOiAtMHgxZmZmZmZmZmZmZmZmZn0pOyIsInZhciAkZXhwb3J0ICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJHBhcnNlRmxvYXQgPSByZXF1aXJlKCcuL19wYXJzZS1mbG9hdCcpO1xuLy8gMjAuMS4yLjEyIE51bWJlci5wYXJzZUZsb2F0KHN0cmluZylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKE51bWJlci5wYXJzZUZsb2F0ICE9ICRwYXJzZUZsb2F0KSwgJ051bWJlcicsIHtwYXJzZUZsb2F0OiAkcGFyc2VGbG9hdH0pOyIsInZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRwYXJzZUludCA9IHJlcXVpcmUoJy4vX3BhcnNlLWludCcpO1xuLy8gMjAuMS4yLjEzIE51bWJlci5wYXJzZUludChzdHJpbmcsIHJhZGl4KVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoTnVtYmVyLnBhcnNlSW50ICE9ICRwYXJzZUludCksICdOdW1iZXInLCB7cGFyc2VJbnQ6ICRwYXJzZUludH0pOyIsIi8vIDIwLjIuMi4yMCBNYXRoLmxvZzFwKHgpXG5tb2R1bGUuZXhwb3J0cyA9IE1hdGgubG9nMXAgfHwgZnVuY3Rpb24gbG9nMXAoeCl7XG4gIHJldHVybiAoeCA9ICt4KSA+IC0xZS04ICYmIHggPCAxZS04ID8geCAtIHggKiB4IC8gMiA6IE1hdGgubG9nKDEgKyB4KTtcbn07IiwiLy8gMjAuMi4yLjMgTWF0aC5hY29zaCh4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGxvZzFwICAgPSByZXF1aXJlKCcuL19tYXRoLWxvZzFwJylcbiAgLCBzcXJ0ICAgID0gTWF0aC5zcXJ0XG4gICwgJGFjb3NoICA9IE1hdGguYWNvc2g7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogISgkYWNvc2hcbiAgLy8gVjggYnVnOiBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzUwOVxuICAmJiBNYXRoLmZsb29yKCRhY29zaChOdW1iZXIuTUFYX1ZBTFVFKSkgPT0gNzEwXG4gIC8vIFRvciBCcm93c2VyIGJ1ZzogTWF0aC5hY29zaChJbmZpbml0eSkgLT4gTmFOIFxuICAmJiAkYWNvc2goSW5maW5pdHkpID09IEluZmluaXR5XG4pLCAnTWF0aCcsIHtcbiAgYWNvc2g6IGZ1bmN0aW9uIGFjb3NoKHgpe1xuICAgIHJldHVybiAoeCA9ICt4KSA8IDEgPyBOYU4gOiB4ID4gOTQ5MDYyNjUuNjI0MjUxNTZcbiAgICAgID8gTWF0aC5sb2coeCkgKyBNYXRoLkxOMlxuICAgICAgOiBsb2cxcCh4IC0gMSArIHNxcnQoeCAtIDEpICogc3FydCh4ICsgMSkpO1xuICB9XG59KTsiLCIvLyAyMC4yLjIuNSBNYXRoLmFzaW5oKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJGFzaW5oICA9IE1hdGguYXNpbmg7XG5cbmZ1bmN0aW9uIGFzaW5oKHgpe1xuICByZXR1cm4gIWlzRmluaXRlKHggPSAreCkgfHwgeCA9PSAwID8geCA6IHggPCAwID8gLWFzaW5oKC14KSA6IE1hdGgubG9nKHggKyBNYXRoLnNxcnQoeCAqIHggKyAxKSk7XG59XG5cbi8vIFRvciBCcm93c2VyIGJ1ZzogTWF0aC5hc2luaCgwKSAtPiAtMCBcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogISgkYXNpbmggJiYgMSAvICRhc2luaCgwKSA+IDApLCAnTWF0aCcsIHthc2luaDogYXNpbmh9KTsiLCIvLyAyMC4yLjIuNyBNYXRoLmF0YW5oKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJGF0YW5oICA9IE1hdGguYXRhbmg7XG5cbi8vIFRvciBCcm93c2VyIGJ1ZzogTWF0aC5hdGFuaCgtMCkgLT4gMCBcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogISgkYXRhbmggJiYgMSAvICRhdGFuaCgtMCkgPCAwKSwgJ01hdGgnLCB7XG4gIGF0YW5oOiBmdW5jdGlvbiBhdGFuaCh4KXtcbiAgICByZXR1cm4gKHggPSAreCkgPT0gMCA/IHggOiBNYXRoLmxvZygoMSArIHgpIC8gKDEgLSB4KSkgLyAyO1xuICB9XG59KTsiLCIvLyAyMC4yLjIuMjggTWF0aC5zaWduKHgpXG5tb2R1bGUuZXhwb3J0cyA9IE1hdGguc2lnbiB8fCBmdW5jdGlvbiBzaWduKHgpe1xuICByZXR1cm4gKHggPSAreCkgPT0gMCB8fCB4ICE9IHggPyB4IDogeCA8IDAgPyAtMSA6IDE7XG59OyIsIi8vIDIwLjIuMi45IE1hdGguY2JydCh4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHNpZ24gICAgPSByZXF1aXJlKCcuL19tYXRoLXNpZ24nKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICBjYnJ0OiBmdW5jdGlvbiBjYnJ0KHgpe1xuICAgIHJldHVybiBzaWduKHggPSAreCkgKiBNYXRoLnBvdyhNYXRoLmFicyh4KSwgMSAvIDMpO1xuICB9XG59KTsiLCIvLyAyMC4yLjIuMTEgTWF0aC5jbHozMih4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICBjbHozMjogZnVuY3Rpb24gY2x6MzIoeCl7XG4gICAgcmV0dXJuICh4ID4+Pj0gMCkgPyAzMSAtIE1hdGguZmxvb3IoTWF0aC5sb2coeCArIDAuNSkgKiBNYXRoLkxPRzJFKSA6IDMyO1xuICB9XG59KTsiLCIvLyAyMC4yLjIuMTIgTWF0aC5jb3NoKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgZXhwICAgICA9IE1hdGguZXhwO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIGNvc2g6IGZ1bmN0aW9uIGNvc2goeCl7XG4gICAgcmV0dXJuIChleHAoeCA9ICt4KSArIGV4cCgteCkpIC8gMjtcbiAgfVxufSk7IiwiLy8gMjAuMi4yLjE0IE1hdGguZXhwbTEoeClcbnZhciAkZXhwbTEgPSBNYXRoLmV4cG0xO1xubW9kdWxlLmV4cG9ydHMgPSAoISRleHBtMVxuICAvLyBPbGQgRkYgYnVnXG4gIHx8ICRleHBtMSgxMCkgPiAyMjAyNS40NjU3OTQ4MDY3MTkgfHwgJGV4cG0xKDEwKSA8IDIyMDI1LjQ2NTc5NDgwNjcxNjUxNjhcbiAgLy8gVG9yIEJyb3dzZXIgYnVnXG4gIHx8ICRleHBtMSgtMmUtMTcpICE9IC0yZS0xN1xuKSA/IGZ1bmN0aW9uIGV4cG0xKHgpe1xuICByZXR1cm4gKHggPSAreCkgPT0gMCA/IHggOiB4ID4gLTFlLTYgJiYgeCA8IDFlLTYgPyB4ICsgeCAqIHggLyAyIDogTWF0aC5leHAoeCkgLSAxO1xufSA6ICRleHBtMTsiLCIvLyAyMC4yLjIuMTQgTWF0aC5leHBtMSh4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRleHBtMSAgPSByZXF1aXJlKCcuL19tYXRoLWV4cG0xJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKCRleHBtMSAhPSBNYXRoLmV4cG0xKSwgJ01hdGgnLCB7ZXhwbTE6ICRleHBtMX0pOyIsIi8vIDIwLjIuMi4xNiBNYXRoLmZyb3VuZCh4KVxudmFyICRleHBvcnQgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgc2lnbiAgICAgID0gcmVxdWlyZSgnLi9fbWF0aC1zaWduJylcbiAgLCBwb3cgICAgICAgPSBNYXRoLnBvd1xuICAsIEVQU0lMT04gICA9IHBvdygyLCAtNTIpXG4gICwgRVBTSUxPTjMyID0gcG93KDIsIC0yMylcbiAgLCBNQVgzMiAgICAgPSBwb3coMiwgMTI3KSAqICgyIC0gRVBTSUxPTjMyKVxuICAsIE1JTjMyICAgICA9IHBvdygyLCAtMTI2KTtcblxudmFyIHJvdW5kVGllc1RvRXZlbiA9IGZ1bmN0aW9uKG4pe1xuICByZXR1cm4gbiArIDEgLyBFUFNJTE9OIC0gMSAvIEVQU0lMT047XG59O1xuXG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgZnJvdW5kOiBmdW5jdGlvbiBmcm91bmQoeCl7XG4gICAgdmFyICRhYnMgID0gTWF0aC5hYnMoeClcbiAgICAgICwgJHNpZ24gPSBzaWduKHgpXG4gICAgICAsIGEsIHJlc3VsdDtcbiAgICBpZigkYWJzIDwgTUlOMzIpcmV0dXJuICRzaWduICogcm91bmRUaWVzVG9FdmVuKCRhYnMgLyBNSU4zMiAvIEVQU0lMT04zMikgKiBNSU4zMiAqIEVQU0lMT04zMjtcbiAgICBhID0gKDEgKyBFUFNJTE9OMzIgLyBFUFNJTE9OKSAqICRhYnM7XG4gICAgcmVzdWx0ID0gYSAtIChhIC0gJGFicyk7XG4gICAgaWYocmVzdWx0ID4gTUFYMzIgfHwgcmVzdWx0ICE9IHJlc3VsdClyZXR1cm4gJHNpZ24gKiBJbmZpbml0eTtcbiAgICByZXR1cm4gJHNpZ24gKiByZXN1bHQ7XG4gIH1cbn0pOyIsIi8vIDIwLjIuMi4xNyBNYXRoLmh5cG90KFt2YWx1ZTFbLCB2YWx1ZTJbLCDigKYgXV1dKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGFicyAgICAgPSBNYXRoLmFicztcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICBoeXBvdDogZnVuY3Rpb24gaHlwb3QodmFsdWUxLCB2YWx1ZTIpeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgdmFyIHN1bSAgPSAwXG4gICAgICAsIGkgICAgPSAwXG4gICAgICAsIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIGxhcmcgPSAwXG4gICAgICAsIGFyZywgZGl2O1xuICAgIHdoaWxlKGkgPCBhTGVuKXtcbiAgICAgIGFyZyA9IGFicyhhcmd1bWVudHNbaSsrXSk7XG4gICAgICBpZihsYXJnIDwgYXJnKXtcbiAgICAgICAgZGl2ICA9IGxhcmcgLyBhcmc7XG4gICAgICAgIHN1bSAgPSBzdW0gKiBkaXYgKiBkaXYgKyAxO1xuICAgICAgICBsYXJnID0gYXJnO1xuICAgICAgfSBlbHNlIGlmKGFyZyA+IDApe1xuICAgICAgICBkaXYgID0gYXJnIC8gbGFyZztcbiAgICAgICAgc3VtICs9IGRpdiAqIGRpdjtcbiAgICAgIH0gZWxzZSBzdW0gKz0gYXJnO1xuICAgIH1cbiAgICByZXR1cm4gbGFyZyA9PT0gSW5maW5pdHkgPyBJbmZpbml0eSA6IGxhcmcgKiBNYXRoLnNxcnQoc3VtKTtcbiAgfVxufSk7IiwiLy8gMjAuMi4yLjE4IE1hdGguaW11bCh4LCB5KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRpbXVsICAgPSBNYXRoLmltdWw7XG5cbi8vIHNvbWUgV2ViS2l0IHZlcnNpb25zIGZhaWxzIHdpdGggYmlnIG51bWJlcnMsIHNvbWUgaGFzIHdyb25nIGFyaXR5XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuICRpbXVsKDB4ZmZmZmZmZmYsIDUpICE9IC01IHx8ICRpbXVsLmxlbmd0aCAhPSAyO1xufSksICdNYXRoJywge1xuICBpbXVsOiBmdW5jdGlvbiBpbXVsKHgsIHkpe1xuICAgIHZhciBVSU5UMTYgPSAweGZmZmZcbiAgICAgICwgeG4gPSAreFxuICAgICAgLCB5biA9ICt5XG4gICAgICAsIHhsID0gVUlOVDE2ICYgeG5cbiAgICAgICwgeWwgPSBVSU5UMTYgJiB5bjtcbiAgICByZXR1cm4gMCB8IHhsICogeWwgKyAoKFVJTlQxNiAmIHhuID4+PiAxNikgKiB5bCArIHhsICogKFVJTlQxNiAmIHluID4+PiAxNikgPDwgMTYgPj4+IDApO1xuICB9XG59KTsiLCIvLyAyMC4yLjIuMjEgTWF0aC5sb2cxMCh4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICBsb2cxMDogZnVuY3Rpb24gbG9nMTAoeCl7XG4gICAgcmV0dXJuIE1hdGgubG9nKHgpIC8gTWF0aC5MTjEwO1xuICB9XG59KTsiLCIvLyAyMC4yLjIuMjAgTWF0aC5sb2cxcCh4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge2xvZzFwOiByZXF1aXJlKCcuL19tYXRoLWxvZzFwJyl9KTsiLCIvLyAyMC4yLjIuMjIgTWF0aC5sb2cyKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIGxvZzI6IGZ1bmN0aW9uIGxvZzIoeCl7XG4gICAgcmV0dXJuIE1hdGgubG9nKHgpIC8gTWF0aC5MTjI7XG4gIH1cbn0pOyIsIi8vIDIwLjIuMi4yOCBNYXRoLnNpZ24oeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtzaWduOiByZXF1aXJlKCcuL19tYXRoLXNpZ24nKX0pOyIsIi8vIDIwLjIuMi4zMCBNYXRoLnNpbmgoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBleHBtMSAgID0gcmVxdWlyZSgnLi9fbWF0aC1leHBtMScpXG4gICwgZXhwICAgICA9IE1hdGguZXhwO1xuXG4vLyBWOCBuZWFyIENocm9taXVtIDM4IGhhcyBhIHByb2JsZW0gd2l0aCB2ZXJ5IHNtYWxsIG51bWJlcnNcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gIU1hdGguc2luaCgtMmUtMTcpICE9IC0yZS0xNztcbn0pLCAnTWF0aCcsIHtcbiAgc2luaDogZnVuY3Rpb24gc2luaCh4KXtcbiAgICByZXR1cm4gTWF0aC5hYnMoeCA9ICt4KSA8IDFcbiAgICAgID8gKGV4cG0xKHgpIC0gZXhwbTEoLXgpKSAvIDJcbiAgICAgIDogKGV4cCh4IC0gMSkgLSBleHAoLXggLSAxKSkgKiAoTWF0aC5FIC8gMik7XG4gIH1cbn0pOyIsIi8vIDIwLjIuMi4zMyBNYXRoLnRhbmgoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBleHBtMSAgID0gcmVxdWlyZSgnLi9fbWF0aC1leHBtMScpXG4gICwgZXhwICAgICA9IE1hdGguZXhwO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIHRhbmg6IGZ1bmN0aW9uIHRhbmgoeCl7XG4gICAgdmFyIGEgPSBleHBtMSh4ID0gK3gpXG4gICAgICAsIGIgPSBleHBtMSgteCk7XG4gICAgcmV0dXJuIGEgPT0gSW5maW5pdHkgPyAxIDogYiA9PSBJbmZpbml0eSA/IC0xIDogKGEgLSBiKSAvIChleHAoeCkgKyBleHAoLXgpKTtcbiAgfVxufSk7IiwiLy8gMjAuMi4yLjM0IE1hdGgudHJ1bmMoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgdHJ1bmM6IGZ1bmN0aW9uIHRydW5jKGl0KXtcbiAgICByZXR1cm4gKGl0ID4gMCA/IE1hdGguZmxvb3IgOiBNYXRoLmNlaWwpKGl0KTtcbiAgfVxufSk7IiwidmFyICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCB0b0luZGV4ICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWluZGV4JylcbiAgLCBmcm9tQ2hhckNvZGUgICA9IFN0cmluZy5mcm9tQ2hhckNvZGVcbiAgLCAkZnJvbUNvZGVQb2ludCA9IFN0cmluZy5mcm9tQ29kZVBvaW50O1xuXG4vLyBsZW5ndGggc2hvdWxkIGJlIDEsIG9sZCBGRiBwcm9ibGVtXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghISRmcm9tQ29kZVBvaW50ICYmICRmcm9tQ29kZVBvaW50Lmxlbmd0aCAhPSAxKSwgJ1N0cmluZycsIHtcbiAgLy8gMjEuMS4yLjIgU3RyaW5nLmZyb21Db2RlUG9pbnQoLi4uY29kZVBvaW50cylcbiAgZnJvbUNvZGVQb2ludDogZnVuY3Rpb24gZnJvbUNvZGVQb2ludCh4KXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIHZhciByZXMgID0gW11cbiAgICAgICwgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgICwgaSAgICA9IDBcbiAgICAgICwgY29kZTtcbiAgICB3aGlsZShhTGVuID4gaSl7XG4gICAgICBjb2RlID0gK2FyZ3VtZW50c1tpKytdO1xuICAgICAgaWYodG9JbmRleChjb2RlLCAweDEwZmZmZikgIT09IGNvZGUpdGhyb3cgUmFuZ2VFcnJvcihjb2RlICsgJyBpcyBub3QgYSB2YWxpZCBjb2RlIHBvaW50Jyk7XG4gICAgICByZXMucHVzaChjb2RlIDwgMHgxMDAwMFxuICAgICAgICA/IGZyb21DaGFyQ29kZShjb2RlKVxuICAgICAgICA6IGZyb21DaGFyQ29kZSgoKGNvZGUgLT0gMHgxMDAwMCkgPj4gMTApICsgMHhkODAwLCBjb2RlICUgMHg0MDAgKyAweGRjMDApXG4gICAgICApO1xuICAgIH0gcmV0dXJuIHJlcy5qb2luKCcnKTtcbiAgfVxufSk7IiwidmFyICRleHBvcnQgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9MZW5ndGggID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnU3RyaW5nJywge1xuICAvLyAyMS4xLjIuNCBTdHJpbmcucmF3KGNhbGxTaXRlLCAuLi5zdWJzdGl0dXRpb25zKVxuICByYXc6IGZ1bmN0aW9uIHJhdyhjYWxsU2l0ZSl7XG4gICAgdmFyIHRwbCAgPSB0b0lPYmplY3QoY2FsbFNpdGUucmF3KVxuICAgICAgLCBsZW4gID0gdG9MZW5ndGgodHBsLmxlbmd0aClcbiAgICAgICwgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgICwgcmVzICA9IFtdXG4gICAgICAsIGkgICAgPSAwO1xuICAgIHdoaWxlKGxlbiA+IGkpe1xuICAgICAgcmVzLnB1c2goU3RyaW5nKHRwbFtpKytdKSk7XG4gICAgICBpZihpIDwgYUxlbilyZXMucHVzaChTdHJpbmcoYXJndW1lbnRzW2ldKSk7XG4gICAgfSByZXR1cm4gcmVzLmpvaW4oJycpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyAyMS4xLjMuMjUgU3RyaW5nLnByb3RvdHlwZS50cmltKClcbnJlcXVpcmUoJy4vX3N0cmluZy10cmltJykoJ3RyaW0nLCBmdW5jdGlvbigkdHJpbSl7XG4gIHJldHVybiBmdW5jdGlvbiB0cmltKCl7XG4gICAgcmV0dXJuICR0cmltKHRoaXMsIDMpO1xuICB9O1xufSk7IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIGRlZmluZWQgICA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRPX1NUUklORyl7XG4gIHJldHVybiBmdW5jdGlvbih0aGF0LCBwb3Mpe1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpXG4gICAgICAsIGkgPSB0b0ludGVnZXIocG9zKVxuICAgICAgLCBsID0gcy5sZW5ndGhcbiAgICAgICwgYSwgYjtcbiAgICBpZihpIDwgMCB8fCBpID49IGwpcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB7fTsiLCIndXNlIHN0cmljdCc7XG52YXIgY3JlYXRlICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJylcbiAgLCBkZXNjcmlwdG9yICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpe1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHtuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgcmVkZWZpbmUgICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgaGlkZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgSXRlcmF0b3JzICAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsICRpdGVyQ3JlYXRlICAgID0gcmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgSVRFUkFUT1IgICAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEJVR0dZICAgICAgICAgID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpIC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgLCBGRl9JVEVSQVRPUiAgICA9ICdAQGl0ZXJhdG9yJ1xuICAsIEtFWVMgICAgICAgICAgID0gJ2tleXMnXG4gICwgVkFMVUVTICAgICAgICAgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpe1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbihraW5kKXtcbiAgICBpZighQlVHR1kgJiYga2luZCBpbiBwcm90bylyZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgICAgICAgID0gTkFNRSArICcgSXRlcmF0b3InXG4gICAgLCBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVNcbiAgICAsIFZBTFVFU19CVUcgPSBmYWxzZVxuICAgICwgcHJvdG8gICAgICA9IEJhc2UucHJvdG90eXBlXG4gICAgLCAkbmF0aXZlICAgID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdXG4gICAgLCAkZGVmYXVsdCAgID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVClcbiAgICAsICRlbnRyaWVzICAgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkXG4gICAgLCAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZVxuICAgICwgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZigkYW55TmF0aXZlKXtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSkpO1xuICAgIGlmKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKXtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZighTElCUkFSWSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUyl7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpe1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gID0gcmV0dXJuVGhpcztcbiAgaWYoREVGQVVMVCl7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogIERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogICAgSVNfU0VUICAgICA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmKEZPUkNFRClmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKXJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCAgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbihpdGVyYXRlZCl7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGluZGV4ID0gdGhpcy5faVxuICAgICwgcG9pbnQ7XG4gIGlmKGluZGV4ID49IE8ubGVuZ3RoKXJldHVybiB7dmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZX07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7dmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZX07XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJGF0ICAgICA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKGZhbHNlKTtcbiRleHBvcnQoJGV4cG9ydC5QLCAnU3RyaW5nJywge1xuICAvLyAyMS4xLjMuMyBTdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0KHBvcylcbiAgY29kZVBvaW50QXQ6IGZ1bmN0aW9uIGNvZGVQb2ludEF0KHBvcyl7XG4gICAgcmV0dXJuICRhdCh0aGlzLCBwb3MpO1xuICB9XG59KTsiLCIvLyA3LjIuOCBJc1JlZ0V4cChhcmd1bWVudClcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgY29mICAgICAgPSByZXF1aXJlKCcuL19jb2YnKVxuICAsIE1BVENIICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ21hdGNoJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIGlzUmVnRXhwO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmICgoaXNSZWdFeHAgPSBpdFtNQVRDSF0pICE9PSB1bmRlZmluZWQgPyAhIWlzUmVnRXhwIDogY29mKGl0KSA9PSAnUmVnRXhwJyk7XG59OyIsIi8vIGhlbHBlciBmb3IgU3RyaW5nI3tzdGFydHNXaXRoLCBlbmRzV2l0aCwgaW5jbHVkZXN9XG52YXIgaXNSZWdFeHAgPSByZXF1aXJlKCcuL19pcy1yZWdleHAnKVxuICAsIGRlZmluZWQgID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRoYXQsIHNlYXJjaFN0cmluZywgTkFNRSl7XG4gIGlmKGlzUmVnRXhwKHNlYXJjaFN0cmluZykpdGhyb3cgVHlwZUVycm9yKCdTdHJpbmcjJyArIE5BTUUgKyBcIiBkb2Vzbid0IGFjY2VwdCByZWdleCFcIik7XG4gIHJldHVybiBTdHJpbmcoZGVmaW5lZCh0aGF0KSk7XG59OyIsInZhciBNQVRDSCA9IHJlcXVpcmUoJy4vX3drcycpKCdtYXRjaCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVkpe1xuICB2YXIgcmUgPSAvLi87XG4gIHRyeSB7XG4gICAgJy8uLydbS0VZXShyZSk7XG4gIH0gY2F0Y2goZSl7XG4gICAgdHJ5IHtcbiAgICAgIHJlW01BVENIXSA9IGZhbHNlO1xuICAgICAgcmV0dXJuICEnLy4vJ1tLRVldKHJlKTtcbiAgICB9IGNhdGNoKGYpeyAvKiBlbXB0eSAqLyB9XG4gIH0gcmV0dXJuIHRydWU7XG59OyIsIi8vIDIxLjEuMy42IFN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGgoc2VhcmNoU3RyaW5nIFssIGVuZFBvc2l0aW9uXSlcbid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgY29udGV4dCAgID0gcmVxdWlyZSgnLi9fc3RyaW5nLWNvbnRleHQnKVxuICAsIEVORFNfV0lUSCA9ICdlbmRzV2l0aCdcbiAgLCAkZW5kc1dpdGggPSAnJ1tFTkRTX1dJVEhdO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vX2ZhaWxzLWlzLXJlZ2V4cCcpKEVORFNfV0lUSCksICdTdHJpbmcnLCB7XG4gIGVuZHNXaXRoOiBmdW5jdGlvbiBlbmRzV2l0aChzZWFyY2hTdHJpbmcgLyosIGVuZFBvc2l0aW9uID0gQGxlbmd0aCAqLyl7XG4gICAgdmFyIHRoYXQgPSBjb250ZXh0KHRoaXMsIHNlYXJjaFN0cmluZywgRU5EU19XSVRIKVxuICAgICAgLCBlbmRQb3NpdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkXG4gICAgICAsIGxlbiAgICA9IHRvTGVuZ3RoKHRoYXQubGVuZ3RoKVxuICAgICAgLCBlbmQgICAgPSBlbmRQb3NpdGlvbiA9PT0gdW5kZWZpbmVkID8gbGVuIDogTWF0aC5taW4odG9MZW5ndGgoZW5kUG9zaXRpb24pLCBsZW4pXG4gICAgICAsIHNlYXJjaCA9IFN0cmluZyhzZWFyY2hTdHJpbmcpO1xuICAgIHJldHVybiAkZW5kc1dpdGhcbiAgICAgID8gJGVuZHNXaXRoLmNhbGwodGhhdCwgc2VhcmNoLCBlbmQpXG4gICAgICA6IHRoYXQuc2xpY2UoZW5kIC0gc2VhcmNoLmxlbmd0aCwgZW5kKSA9PT0gc2VhcmNoO1xuICB9XG59KTsiLCIvLyAyMS4xLjMuNyBTdHJpbmcucHJvdG90eXBlLmluY2x1ZGVzKHNlYXJjaFN0cmluZywgcG9zaXRpb24gPSAwKVxuJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBjb250ZXh0ICA9IHJlcXVpcmUoJy4vX3N0cmluZy1jb250ZXh0JylcbiAgLCBJTkNMVURFUyA9ICdpbmNsdWRlcyc7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogcmVxdWlyZSgnLi9fZmFpbHMtaXMtcmVnZXhwJykoSU5DTFVERVMpLCAnU3RyaW5nJywge1xuICBpbmNsdWRlczogZnVuY3Rpb24gaW5jbHVkZXMoc2VhcmNoU3RyaW5nIC8qLCBwb3NpdGlvbiA9IDAgKi8pe1xuICAgIHJldHVybiAhIX5jb250ZXh0KHRoaXMsIHNlYXJjaFN0cmluZywgSU5DTFVERVMpXG4gICAgICAuaW5kZXhPZihzZWFyY2hTdHJpbmcsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7IiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAsICdTdHJpbmcnLCB7XG4gIC8vIDIxLjEuMy4xMyBTdHJpbmcucHJvdG90eXBlLnJlcGVhdChjb3VudClcbiAgcmVwZWF0OiByZXF1aXJlKCcuL19zdHJpbmctcmVwZWF0Jylcbn0pOyIsIi8vIDIxLjEuMy4xOCBTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGgoc2VhcmNoU3RyaW5nIFssIHBvc2l0aW9uIF0pXG4ndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHRvTGVuZ3RoICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBjb250ZXh0ICAgICA9IHJlcXVpcmUoJy4vX3N0cmluZy1jb250ZXh0JylcbiAgLCBTVEFSVFNfV0lUSCA9ICdzdGFydHNXaXRoJ1xuICAsICRzdGFydHNXaXRoID0gJydbU1RBUlRTX1dJVEhdO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vX2ZhaWxzLWlzLXJlZ2V4cCcpKFNUQVJUU19XSVRIKSwgJ1N0cmluZycsIHtcbiAgc3RhcnRzV2l0aDogZnVuY3Rpb24gc3RhcnRzV2l0aChzZWFyY2hTdHJpbmcgLyosIHBvc2l0aW9uID0gMCAqLyl7XG4gICAgdmFyIHRoYXQgICA9IGNvbnRleHQodGhpcywgc2VhcmNoU3RyaW5nLCBTVEFSVFNfV0lUSClcbiAgICAgICwgaW5kZXggID0gdG9MZW5ndGgoTWF0aC5taW4oYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQsIHRoYXQubGVuZ3RoKSlcbiAgICAgICwgc2VhcmNoID0gU3RyaW5nKHNlYXJjaFN0cmluZyk7XG4gICAgcmV0dXJuICRzdGFydHNXaXRoXG4gICAgICA/ICRzdGFydHNXaXRoLmNhbGwodGhhdCwgc2VhcmNoLCBpbmRleClcbiAgICAgIDogdGhhdC5zbGljZShpbmRleCwgaW5kZXggKyBzZWFyY2gubGVuZ3RoKSA9PT0gc2VhcmNoO1xuICB9XG59KTsiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgZmFpbHMgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcbiAgLCBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpXG4gICwgcXVvdCAgICA9IC9cIi9nO1xuLy8gQi4yLjMuMi4xIENyZWF0ZUhUTUwoc3RyaW5nLCB0YWcsIGF0dHJpYnV0ZSwgdmFsdWUpXG52YXIgY3JlYXRlSFRNTCA9IGZ1bmN0aW9uKHN0cmluZywgdGFnLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gIHZhciBTICA9IFN0cmluZyhkZWZpbmVkKHN0cmluZykpXG4gICAgLCBwMSA9ICc8JyArIHRhZztcbiAgaWYoYXR0cmlidXRlICE9PSAnJylwMSArPSAnICcgKyBhdHRyaWJ1dGUgKyAnPVwiJyArIFN0cmluZyh2YWx1ZSkucmVwbGFjZShxdW90LCAnJnF1b3Q7JykgKyAnXCInO1xuICByZXR1cm4gcDEgKyAnPicgKyBTICsgJzwvJyArIHRhZyArICc+Jztcbn07XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE5BTUUsIGV4ZWMpe1xuICB2YXIgTyA9IHt9O1xuICBPW05BTUVdID0gZXhlYyhjcmVhdGVIVE1MKTtcbiAgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiBmYWlscyhmdW5jdGlvbigpe1xuICAgIHZhciB0ZXN0ID0gJydbTkFNRV0oJ1wiJyk7XG4gICAgcmV0dXJuIHRlc3QgIT09IHRlc3QudG9Mb3dlckNhc2UoKSB8fCB0ZXN0LnNwbGl0KCdcIicpLmxlbmd0aCA+IDM7XG4gIH0pLCAnU3RyaW5nJywgTyk7XG59OyIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjIgU3RyaW5nLnByb3RvdHlwZS5hbmNob3IobmFtZSlcbnJlcXVpcmUoJy4vX3N0cmluZy1odG1sJykoJ2FuY2hvcicsIGZ1bmN0aW9uKGNyZWF0ZUhUTUwpe1xuICByZXR1cm4gZnVuY3Rpb24gYW5jaG9yKG5hbWUpe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdhJywgJ25hbWUnLCBuYW1lKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gQi4yLjMuMyBTdHJpbmcucHJvdG90eXBlLmJpZygpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdiaWcnLCBmdW5jdGlvbihjcmVhdGVIVE1MKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGJpZygpe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdiaWcnLCAnJywgJycpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy40IFN0cmluZy5wcm90b3R5cGUuYmxpbmsoKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnYmxpbmsnLCBmdW5jdGlvbihjcmVhdGVIVE1MKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGJsaW5rKCl7XG4gICAgcmV0dXJuIGNyZWF0ZUhUTUwodGhpcywgJ2JsaW5rJywgJycsICcnKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gQi4yLjMuNSBTdHJpbmcucHJvdG90eXBlLmJvbGQoKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnYm9sZCcsIGZ1bmN0aW9uKGNyZWF0ZUhUTUwpe1xuICByZXR1cm4gZnVuY3Rpb24gYm9sZCgpe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdiJywgJycsICcnKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gQi4yLjMuNiBTdHJpbmcucHJvdG90eXBlLmZpeGVkKClcbnJlcXVpcmUoJy4vX3N0cmluZy1odG1sJykoJ2ZpeGVkJywgZnVuY3Rpb24oY3JlYXRlSFRNTCl7XG4gIHJldHVybiBmdW5jdGlvbiBmaXhlZCgpe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICd0dCcsICcnLCAnJyk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjcgU3RyaW5nLnByb3RvdHlwZS5mb250Y29sb3IoY29sb3IpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdmb250Y29sb3InLCBmdW5jdGlvbihjcmVhdGVIVE1MKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGZvbnRjb2xvcihjb2xvcil7XG4gICAgcmV0dXJuIGNyZWF0ZUhUTUwodGhpcywgJ2ZvbnQnLCAnY29sb3InLCBjb2xvcik7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEIuMi4zLjggU3RyaW5nLnByb3RvdHlwZS5mb250c2l6ZShzaXplKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnZm9udHNpemUnLCBmdW5jdGlvbihjcmVhdGVIVE1MKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGZvbnRzaXplKHNpemUpe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdmb250JywgJ3NpemUnLCBzaXplKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gQi4yLjMuOSBTdHJpbmcucHJvdG90eXBlLml0YWxpY3MoKVxucmVxdWlyZSgnLi9fc3RyaW5nLWh0bWwnKSgnaXRhbGljcycsIGZ1bmN0aW9uKGNyZWF0ZUhUTUwpe1xuICByZXR1cm4gZnVuY3Rpb24gaXRhbGljcygpe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdpJywgJycsICcnKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gQi4yLjMuMTAgU3RyaW5nLnByb3RvdHlwZS5saW5rKHVybClcbnJlcXVpcmUoJy4vX3N0cmluZy1odG1sJykoJ2xpbmsnLCBmdW5jdGlvbihjcmVhdGVIVE1MKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGxpbmsodXJsKXtcbiAgICByZXR1cm4gY3JlYXRlSFRNTCh0aGlzLCAnYScsICdocmVmJywgdXJsKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gQi4yLjMuMTEgU3RyaW5nLnByb3RvdHlwZS5zbWFsbCgpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdzbWFsbCcsIGZ1bmN0aW9uKGNyZWF0ZUhUTUwpe1xuICByZXR1cm4gZnVuY3Rpb24gc21hbGwoKXtcbiAgICByZXR1cm4gY3JlYXRlSFRNTCh0aGlzLCAnc21hbGwnLCAnJywgJycpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy4xMiBTdHJpbmcucHJvdG90eXBlLnN0cmlrZSgpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdzdHJpa2UnLCBmdW5jdGlvbihjcmVhdGVIVE1MKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHN0cmlrZSgpe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdzdHJpa2UnLCAnJywgJycpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy4xMyBTdHJpbmcucHJvdG90eXBlLnN1YigpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdzdWInLCBmdW5jdGlvbihjcmVhdGVIVE1MKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHN1Yigpe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdzdWInLCAnJywgJycpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBCLjIuMy4xNCBTdHJpbmcucHJvdG90eXBlLnN1cCgpXG5yZXF1aXJlKCcuL19zdHJpbmctaHRtbCcpKCdzdXAnLCBmdW5jdGlvbihjcmVhdGVIVE1MKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHN1cCgpe1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdzdXAnLCAnJywgJycpO1xuICB9XG59KTsiLCIvLyAyMC4zLjMuMSAvIDE1LjkuNC40IERhdGUubm93KClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnRGF0ZScsIHtub3c6IGZ1bmN0aW9uKCl7IHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTsgfX0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgdG9PYmplY3QgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gbmV3IERhdGUoTmFOKS50b0pTT04oKSAhPT0gbnVsbCB8fCBEYXRlLnByb3RvdHlwZS50b0pTT04uY2FsbCh7dG9JU09TdHJpbmc6IGZ1bmN0aW9uKCl7IHJldHVybiAxOyB9fSkgIT09IDE7XG59KSwgJ0RhdGUnLCB7XG4gIHRvSlNPTjogZnVuY3Rpb24gdG9KU09OKGtleSl7XG4gICAgdmFyIE8gID0gdG9PYmplY3QodGhpcylcbiAgICAgICwgcHYgPSB0b1ByaW1pdGl2ZShPKTtcbiAgICByZXR1cm4gdHlwZW9mIHB2ID09ICdudW1iZXInICYmICFpc0Zpbml0ZShwdikgPyBudWxsIDogTy50b0lTT1N0cmluZygpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyAyMC4zLjQuMzYgLyAxNS45LjUuNDMgRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmcoKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGZhaWxzICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICwgZ2V0VGltZSA9IERhdGUucHJvdG90eXBlLmdldFRpbWU7XG5cbnZhciBseiA9IGZ1bmN0aW9uKG51bSl7XG4gIHJldHVybiBudW0gPiA5ID8gbnVtIDogJzAnICsgbnVtO1xufTtcblxuLy8gUGhhbnRvbUpTIC8gb2xkIFdlYktpdCBoYXMgYSBicm9rZW4gaW1wbGVtZW50YXRpb25zXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChmYWlscyhmdW5jdGlvbigpe1xuICByZXR1cm4gbmV3IERhdGUoLTVlMTMgLSAxKS50b0lTT1N0cmluZygpICE9ICcwMzg1LTA3LTI1VDA3OjA2OjM5Ljk5OVonO1xufSkgfHwgIWZhaWxzKGZ1bmN0aW9uKCl7XG4gIG5ldyBEYXRlKE5hTikudG9JU09TdHJpbmcoKTtcbn0pKSwgJ0RhdGUnLCB7XG4gIHRvSVNPU3RyaW5nOiBmdW5jdGlvbiB0b0lTT1N0cmluZygpe1xuICAgIGlmKCFpc0Zpbml0ZShnZXRUaW1lLmNhbGwodGhpcykpKXRocm93IFJhbmdlRXJyb3IoJ0ludmFsaWQgdGltZSB2YWx1ZScpO1xuICAgIHZhciBkID0gdGhpc1xuICAgICAgLCB5ID0gZC5nZXRVVENGdWxsWWVhcigpXG4gICAgICAsIG0gPSBkLmdldFVUQ01pbGxpc2Vjb25kcygpXG4gICAgICAsIHMgPSB5IDwgMCA/ICctJyA6IHkgPiA5OTk5ID8gJysnIDogJyc7XG4gICAgcmV0dXJuIHMgKyAoJzAwMDAwJyArIE1hdGguYWJzKHkpKS5zbGljZShzID8gLTYgOiAtNCkgK1xuICAgICAgJy0nICsgbHooZC5nZXRVVENNb250aCgpICsgMSkgKyAnLScgKyBseihkLmdldFVUQ0RhdGUoKSkgK1xuICAgICAgJ1QnICsgbHooZC5nZXRVVENIb3VycygpKSArICc6JyArIGx6KGQuZ2V0VVRDTWludXRlcygpKSArXG4gICAgICAnOicgKyBseihkLmdldFVUQ1NlY29uZHMoKSkgKyAnLicgKyAobSA+IDk5ID8gbSA6ICcwJyArIGx6KG0pKSArICdaJztcbiAgfVxufSk7IiwidmFyIERhdGVQcm90byAgICA9IERhdGUucHJvdG90eXBlXG4gICwgSU5WQUxJRF9EQVRFID0gJ0ludmFsaWQgRGF0ZSdcbiAgLCBUT19TVFJJTkcgICAgPSAndG9TdHJpbmcnXG4gICwgJHRvU3RyaW5nICAgID0gRGF0ZVByb3RvW1RPX1NUUklOR11cbiAgLCBnZXRUaW1lICAgICAgPSBEYXRlUHJvdG8uZ2V0VGltZTtcbmlmKG5ldyBEYXRlKE5hTikgKyAnJyAhPSBJTlZBTElEX0RBVEUpe1xuICByZXF1aXJlKCcuL19yZWRlZmluZScpKERhdGVQcm90bywgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICAgIHZhciB2YWx1ZSA9IGdldFRpbWUuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdmFsdWUgPT09IHZhbHVlID8gJHRvU3RyaW5nLmNhbGwodGhpcykgOiBJTlZBTElEX0RBVEU7XG4gIH0pO1xufSIsIid1c2Ugc3RyaWN0JztcbnZhciBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIE5VTUJFUiAgICAgID0gJ251bWJlcic7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaGludCl7XG4gIGlmKGhpbnQgIT09ICdzdHJpbmcnICYmIGhpbnQgIT09IE5VTUJFUiAmJiBoaW50ICE9PSAnZGVmYXVsdCcpdGhyb3cgVHlwZUVycm9yKCdJbmNvcnJlY3QgaGludCcpO1xuICByZXR1cm4gdG9QcmltaXRpdmUoYW5PYmplY3QodGhpcyksIGhpbnQgIT0gTlVNQkVSKTtcbn07IiwidmFyIFRPX1BSSU1JVElWRSA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1ByaW1pdGl2ZScpXG4gICwgcHJvdG8gICAgICAgID0gRGF0ZS5wcm90b3R5cGU7XG5cbmlmKCEoVE9fUFJJTUlUSVZFIGluIHByb3RvKSlyZXF1aXJlKCcuL19oaWRlJykocHJvdG8sIFRPX1BSSU1JVElWRSwgcmVxdWlyZSgnLi9fZGF0ZS10by1wcmltaXRpdmUnKSk7IiwiLy8gMjIuMS4yLjIgLyAxNS40LjMuMiBBcnJheS5pc0FycmF5KGFyZylcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnQXJyYXknLCB7aXNBcnJheTogcmVxdWlyZSgnLi9faXMtYXJyYXknKX0pOyIsIi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3JcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYXRvciwgZm4sIHZhbHVlLCBlbnRyaWVzKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoKGUpe1xuICAgIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gICAgaWYocmV0ICE9PSB1bmRlZmluZWQpYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59OyIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCBJVEVSQVRPUiAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ICE9PSB1bmRlZmluZWQgJiYgKEl0ZXJhdG9ycy5BcnJheSA9PT0gaXQgfHwgQXJyYXlQcm90b1tJVEVSQVRPUl0gPT09IGl0KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyAgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgaW5kZXgsIHZhbHVlKXtcbiAgaWYoaW5kZXggaW4gb2JqZWN0KSRkZWZpbmVQcm9wZXJ0eS5mKG9iamVjdCwgaW5kZXgsIGNyZWF0ZURlc2MoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbaW5kZXhdID0gdmFsdWU7XG59OyIsInZhciBjbGFzc29mICAgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ICE9IHVuZGVmaW5lZClyZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59OyIsInZhciBJVEVSQVRPUiAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uKCl7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uKCl7IHRocm93IDI7IH0pO1xufSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMsIHNraXBDbG9zaW5nKXtcbiAgaWYoIXNraXBDbG9zaW5nICYmICFTQUZFX0NMT1NJTkcpcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgID0gWzddXG4gICAgICAsIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24oKXsgcmV0dXJuIHtkb25lOiBzYWZlID0gdHJ1ZX07IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGN0eCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgdG9PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIGNhbGwgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJylcbiAgLCBpc0FycmF5SXRlciAgICA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKVxuICAsIHRvTGVuZ3RoICAgICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2NyZWF0ZS1wcm9wZXJ0eScpXG4gICwgZ2V0SXRlckZuICAgICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uKGl0ZXIpeyBBcnJheS5mcm9tKGl0ZXIpOyB9KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMSBBcnJheS5mcm9tKGFycmF5TGlrZSwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gIGZyb206IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlLyosIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKi8pe1xuICAgIHZhciBPICAgICAgID0gdG9PYmplY3QoYXJyYXlMaWtlKVxuICAgICAgLCBDICAgICAgID0gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheVxuICAgICAgLCBhTGVuICAgID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLCBtYXBmbiAgID0gYUxlbiA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWRcbiAgICAgICwgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWRcbiAgICAgICwgaW5kZXggICA9IDBcbiAgICAgICwgaXRlckZuICA9IGdldEl0ZXJGbihPKVxuICAgICAgLCBsZW5ndGgsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3I7XG4gICAgaWYobWFwcGluZyltYXBmbiA9IGN0eChtYXBmbiwgYUxlbiA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQsIDIpO1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCBpdGVyYWJsZSBvciBpdCdzIGFycmF5IHdpdGggZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBzaW1wbGUgY2FzZVxuICAgIGlmKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyKGl0ZXJGbikpKXtcbiAgICAgIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCByZXN1bHQgPSBuZXcgQzsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyBpbmRleCsrKXtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgICBmb3IocmVzdWx0ID0gbmV3IEMobGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4Kyspe1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gbWFwZm4oT1tpbmRleF0sIGluZGV4KSA6IE9baW5kZXhdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0Lmxlbmd0aCA9IGluZGV4O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2NyZWF0ZS1wcm9wZXJ0eScpO1xuXG4vLyBXZWJLaXQgQXJyYXkub2YgaXNuJ3QgZ2VuZXJpY1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIGZ1bmN0aW9uIEYoKXt9XG4gIHJldHVybiAhKEFycmF5Lm9mLmNhbGwoRikgaW5zdGFuY2VvZiBGKTtcbn0pLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMi4zIEFycmF5Lm9mKCAuLi5pdGVtcylcbiAgb2Y6IGZ1bmN0aW9uIG9mKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHZhciBpbmRleCAgPSAwXG4gICAgICAsIGFMZW4gICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgICwgcmVzdWx0ID0gbmV3ICh0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5KShhTGVuKTtcbiAgICB3aGlsZShhTGVuID4gaW5kZXgpY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICByZXN1bHQubGVuZ3RoID0gYUxlbjtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTsiLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1ldGhvZCwgYXJnKXtcbiAgcmV0dXJuICEhbWV0aG9kICYmIGZhaWxzKGZ1bmN0aW9uKCl7XG4gICAgYXJnID8gbWV0aG9kLmNhbGwobnVsbCwgZnVuY3Rpb24oKXt9LCAxKSA6IG1ldGhvZC5jYWxsKG51bGwpO1xuICB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5qb2luKHNlcGFyYXRvcilcbnZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIGFycmF5Sm9pbiA9IFtdLmpvaW47XG5cbi8vIGZhbGxiYWNrIGZvciBub3QgYXJyYXktbGlrZSBzdHJpbmdzXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChyZXF1aXJlKCcuL19pb2JqZWN0JykgIT0gT2JqZWN0IHx8ICFyZXF1aXJlKCcuL19zdHJpY3QtbWV0aG9kJykoYXJyYXlKb2luKSksICdBcnJheScsIHtcbiAgam9pbjogZnVuY3Rpb24gam9pbihzZXBhcmF0b3Ipe1xuICAgIHJldHVybiBhcnJheUpvaW4uY2FsbCh0b0lPYmplY3QodGhpcyksIHNlcGFyYXRvciA9PT0gdW5kZWZpbmVkID8gJywnIDogc2VwYXJhdG9yKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGh0bWwgICAgICAgPSByZXF1aXJlKCcuL19odG1sJylcbiAgLCBjb2YgICAgICAgID0gcmVxdWlyZSgnLi9fY29mJylcbiAgLCB0b0luZGV4ICAgID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKVxuICAsIHRvTGVuZ3RoICAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGFycmF5U2xpY2UgPSBbXS5zbGljZTtcblxuLy8gZmFsbGJhY2sgZm9yIG5vdCBhcnJheS1saWtlIEVTMyBzdHJpbmdzIGFuZCBET00gb2JqZWN0c1xuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIGlmKGh0bWwpYXJyYXlTbGljZS5jYWxsKGh0bWwpO1xufSksICdBcnJheScsIHtcbiAgc2xpY2U6IGZ1bmN0aW9uIHNsaWNlKGJlZ2luLCBlbmQpe1xuICAgIHZhciBsZW4gICA9IHRvTGVuZ3RoKHRoaXMubGVuZ3RoKVxuICAgICAgLCBrbGFzcyA9IGNvZih0aGlzKTtcbiAgICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IGVuZDtcbiAgICBpZihrbGFzcyA9PSAnQXJyYXknKXJldHVybiBhcnJheVNsaWNlLmNhbGwodGhpcywgYmVnaW4sIGVuZCk7XG4gICAgdmFyIHN0YXJ0ICA9IHRvSW5kZXgoYmVnaW4sIGxlbilcbiAgICAgICwgdXBUbyAgID0gdG9JbmRleChlbmQsIGxlbilcbiAgICAgICwgc2l6ZSAgID0gdG9MZW5ndGgodXBUbyAtIHN0YXJ0KVxuICAgICAgLCBjbG9uZWQgPSBBcnJheShzaXplKVxuICAgICAgLCBpICAgICAgPSAwO1xuICAgIGZvcig7IGkgPCBzaXplOyBpKyspY2xvbmVkW2ldID0ga2xhc3MgPT0gJ1N0cmluZydcbiAgICAgID8gdGhpcy5jaGFyQXQoc3RhcnQgKyBpKVxuICAgICAgOiB0aGlzW3N0YXJ0ICsgaV07XG4gICAgcmV0dXJuIGNsb25lZDtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXG4gICwgdG9PYmplY3QgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBmYWlscyAgICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICwgJHNvcnQgICAgID0gW10uc29ydFxuICAsIHRlc3QgICAgICA9IFsxLCAyLCAzXTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoZmFpbHMoZnVuY3Rpb24oKXtcbiAgLy8gSUU4LVxuICB0ZXN0LnNvcnQodW5kZWZpbmVkKTtcbn0pIHx8ICFmYWlscyhmdW5jdGlvbigpe1xuICAvLyBWOCBidWdcbiAgdGVzdC5zb3J0KG51bGwpO1xuICAvLyBPbGQgV2ViS2l0XG59KSB8fCAhcmVxdWlyZSgnLi9fc3RyaWN0LW1ldGhvZCcpKCRzb3J0KSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4zLjI1IEFycmF5LnByb3RvdHlwZS5zb3J0KGNvbXBhcmVmbilcbiAgc29ydDogZnVuY3Rpb24gc29ydChjb21wYXJlZm4pe1xuICAgIHJldHVybiBjb21wYXJlZm4gPT09IHVuZGVmaW5lZFxuICAgICAgPyAkc29ydC5jYWxsKHRvT2JqZWN0KHRoaXMpKVxuICAgICAgOiAkc29ydC5jYWxsKHRvT2JqZWN0KHRoaXMpLCBhRnVuY3Rpb24oY29tcGFyZWZuKSk7XG4gIH1cbn0pOyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgaXNBcnJheSAgPSByZXF1aXJlKCcuL19pcy1hcnJheScpXG4gICwgU1BFQ0lFUyAgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9yaWdpbmFsKXtcbiAgdmFyIEM7XG4gIGlmKGlzQXJyYXkob3JpZ2luYWwpKXtcbiAgICBDID0gb3JpZ2luYWwuY29uc3RydWN0b3I7XG4gICAgLy8gY3Jvc3MtcmVhbG0gZmFsbGJhY2tcbiAgICBpZih0eXBlb2YgQyA9PSAnZnVuY3Rpb24nICYmIChDID09PSBBcnJheSB8fCBpc0FycmF5KEMucHJvdG90eXBlKSkpQyA9IHVuZGVmaW5lZDtcbiAgICBpZihpc09iamVjdChDKSl7XG4gICAgICBDID0gQ1tTUEVDSUVTXTtcbiAgICAgIGlmKEMgPT09IG51bGwpQyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gcmV0dXJuIEMgPT09IHVuZGVmaW5lZCA/IEFycmF5IDogQztcbn07IiwiLy8gOS40LjIuMyBBcnJheVNwZWNpZXNDcmVhdGUob3JpZ2luYWxBcnJheSwgbGVuZ3RoKVxudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX2FycmF5LXNwZWNpZXMtY29uc3RydWN0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcmlnaW5hbCwgbGVuZ3RoKXtcbiAgcmV0dXJuIG5ldyAoc3BlY2llc0NvbnN0cnVjdG9yKG9yaWdpbmFsKSkobGVuZ3RoKTtcbn07IiwiLy8gMCAtPiBBcnJheSNmb3JFYWNoXG4vLyAxIC0+IEFycmF5I21hcFxuLy8gMiAtPiBBcnJheSNmaWx0ZXJcbi8vIDMgLT4gQXJyYXkjc29tZVxuLy8gNCAtPiBBcnJheSNldmVyeVxuLy8gNSAtPiBBcnJheSNmaW5kXG4vLyA2IC0+IEFycmF5I2ZpbmRJbmRleFxudmFyIGN0eCAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBJT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgYXNjICAgICAgPSByZXF1aXJlKCcuL19hcnJheS1zcGVjaWVzLWNyZWF0ZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUWVBFLCAkY3JlYXRlKXtcbiAgdmFyIElTX01BUCAgICAgICAgPSBUWVBFID09IDFcbiAgICAsIElTX0ZJTFRFUiAgICAgPSBUWVBFID09IDJcbiAgICAsIElTX1NPTUUgICAgICAgPSBUWVBFID09IDNcbiAgICAsIElTX0VWRVJZICAgICAgPSBUWVBFID09IDRcbiAgICAsIElTX0ZJTkRfSU5ERVggPSBUWVBFID09IDZcbiAgICAsIE5PX0hPTEVTICAgICAgPSBUWVBFID09IDUgfHwgSVNfRklORF9JTkRFWFxuICAgICwgY3JlYXRlICAgICAgICA9ICRjcmVhdGUgfHwgYXNjO1xuICByZXR1cm4gZnVuY3Rpb24oJHRoaXMsIGNhbGxiYWNrZm4sIHRoYXQpe1xuICAgIHZhciBPICAgICAgPSB0b09iamVjdCgkdGhpcylcbiAgICAgICwgc2VsZiAgID0gSU9iamVjdChPKVxuICAgICAgLCBmICAgICAgPSBjdHgoY2FsbGJhY2tmbiwgdGhhdCwgMylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoc2VsZi5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IDBcbiAgICAgICwgcmVzdWx0ID0gSVNfTUFQID8gY3JlYXRlKCR0aGlzLCBsZW5ndGgpIDogSVNfRklMVEVSID8gY3JlYXRlKCR0aGlzLCAwKSA6IHVuZGVmaW5lZFxuICAgICAgLCB2YWwsIHJlcztcbiAgICBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKE5PX0hPTEVTIHx8IGluZGV4IGluIHNlbGYpe1xuICAgICAgdmFsID0gc2VsZltpbmRleF07XG4gICAgICByZXMgPSBmKHZhbCwgaW5kZXgsIE8pO1xuICAgICAgaWYoVFlQRSl7XG4gICAgICAgIGlmKElTX01BUClyZXN1bHRbaW5kZXhdID0gcmVzOyAgICAgICAgICAgIC8vIG1hcFxuICAgICAgICBlbHNlIGlmKHJlcylzd2l0Y2goVFlQRSl7XG4gICAgICAgICAgY2FzZSAzOiByZXR1cm4gdHJ1ZTsgICAgICAgICAgICAgICAgICAgIC8vIHNvbWVcbiAgICAgICAgICBjYXNlIDU6IHJldHVybiB2YWw7ICAgICAgICAgICAgICAgICAgICAgLy8gZmluZFxuICAgICAgICAgIGNhc2UgNjogcmV0dXJuIGluZGV4OyAgICAgICAgICAgICAgICAgICAvLyBmaW5kSW5kZXhcbiAgICAgICAgICBjYXNlIDI6IHJlc3VsdC5wdXNoKHZhbCk7ICAgICAgICAgICAgICAgLy8gZmlsdGVyXG4gICAgICAgIH0gZWxzZSBpZihJU19FVkVSWSlyZXR1cm4gZmFsc2U7ICAgICAgICAgIC8vIGV2ZXJ5XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBJU19GSU5EX0lOREVYID8gLTEgOiBJU19TT01FIHx8IElTX0VWRVJZID8gSVNfRVZFUlkgOiByZXN1bHQ7XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJGZvckVhY2ggPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJykoMClcbiAgLCBTVFJJQ1QgICA9IHJlcXVpcmUoJy4vX3N0cmljdC1tZXRob2QnKShbXS5mb3JFYWNoLCB0cnVlKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAhU1RSSUNULCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMy4xMCAvIDE1LjQuNC4xOCBBcnJheS5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuIFssIHRoaXNBcmddKVxuICBmb3JFYWNoOiBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKXtcbiAgICByZXR1cm4gJGZvckVhY2godGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRtYXAgICAgPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJykoMSk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX3N0cmljdC1tZXRob2QnKShbXS5tYXAsIHRydWUpLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMy4xNSAvIDE1LjQuNC4xOSBBcnJheS5wcm90b3R5cGUubWFwKGNhbGxiYWNrZm4gWywgdGhpc0FyZ10pXG4gIG1hcDogZnVuY3Rpb24gbWFwKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKXtcbiAgICByZXR1cm4gJG1hcCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJGZpbHRlciA9IHJlcXVpcmUoJy4vX2FycmF5LW1ldGhvZHMnKSgyKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fc3RyaWN0LW1ldGhvZCcpKFtdLmZpbHRlciwgdHJ1ZSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4zLjcgLyAxNS40LjQuMjAgQXJyYXkucHJvdG90eXBlLmZpbHRlcihjYWxsYmFja2ZuIFssIHRoaXNBcmddKVxuICBmaWx0ZXI6IGZ1bmN0aW9uIGZpbHRlcihjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLyl7XG4gICAgcmV0dXJuICRmaWx0ZXIodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRzb21lICAgPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJykoMyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX3N0cmljdC1tZXRob2QnKShbXS5zb21lLCB0cnVlKSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjMuMjMgLyAxNS40LjQuMTcgQXJyYXkucHJvdG90eXBlLnNvbWUoY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcbiAgc29tZTogZnVuY3Rpb24gc29tZShjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLyl7XG4gICAgcmV0dXJuICRzb21lKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50c1sxXSk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkZXZlcnkgID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpKDQpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19zdHJpY3QtbWV0aG9kJykoW10uZXZlcnksIHRydWUpLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMy41IC8gMTUuNC40LjE2IEFycmF5LnByb3RvdHlwZS5ldmVyeShjYWxsYmFja2ZuIFssIHRoaXNBcmddKVxuICBldmVyeTogZnVuY3Rpb24gZXZlcnkoY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pe1xuICAgIHJldHVybiAkZXZlcnkodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdKTtcbiAgfVxufSk7IiwidmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsIHRvT2JqZWN0ICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgSU9iamVjdCAgID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgdG9MZW5ndGggID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGhhdCwgY2FsbGJhY2tmbiwgYUxlbiwgbWVtbywgaXNSaWdodCl7XG4gIGFGdW5jdGlvbihjYWxsYmFja2ZuKTtcbiAgdmFyIE8gICAgICA9IHRvT2JqZWN0KHRoYXQpXG4gICAgLCBzZWxmICAgPSBJT2JqZWN0KE8pXG4gICAgLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aClcbiAgICAsIGluZGV4ICA9IGlzUmlnaHQgPyBsZW5ndGggLSAxIDogMFxuICAgICwgaSAgICAgID0gaXNSaWdodCA/IC0xIDogMTtcbiAgaWYoYUxlbiA8IDIpZm9yKDs7KXtcbiAgICBpZihpbmRleCBpbiBzZWxmKXtcbiAgICAgIG1lbW8gPSBzZWxmW2luZGV4XTtcbiAgICAgIGluZGV4ICs9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgaW5kZXggKz0gaTtcbiAgICBpZihpc1JpZ2h0ID8gaW5kZXggPCAwIDogbGVuZ3RoIDw9IGluZGV4KXtcbiAgICAgIHRocm93IFR5cGVFcnJvcignUmVkdWNlIG9mIGVtcHR5IGFycmF5IHdpdGggbm8gaW5pdGlhbCB2YWx1ZScpO1xuICAgIH1cbiAgfVxuICBmb3IoO2lzUmlnaHQgPyBpbmRleCA+PSAwIDogbGVuZ3RoID4gaW5kZXg7IGluZGV4ICs9IGkpaWYoaW5kZXggaW4gc2VsZil7XG4gICAgbWVtbyA9IGNhbGxiYWNrZm4obWVtbywgc2VsZltpbmRleF0sIGluZGV4LCBPKTtcbiAgfVxuICByZXR1cm4gbWVtbztcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRyZWR1Y2UgPSByZXF1aXJlKCcuL19hcnJheS1yZWR1Y2UnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fc3RyaWN0LW1ldGhvZCcpKFtdLnJlZHVjZSwgdHJ1ZSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4zLjE4IC8gMTUuNC40LjIxIEFycmF5LnByb3RvdHlwZS5yZWR1Y2UoY2FsbGJhY2tmbiBbLCBpbml0aWFsVmFsdWVdKVxuICByZWR1Y2U6IGZ1bmN0aW9uIHJlZHVjZShjYWxsYmFja2ZuIC8qICwgaW5pdGlhbFZhbHVlICovKXtcbiAgICByZXR1cm4gJHJlZHVjZSh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoLCBhcmd1bWVudHNbMV0sIGZhbHNlKTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRyZWR1Y2UgPSByZXF1aXJlKCcuL19hcnJheS1yZWR1Y2UnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fc3RyaWN0LW1ldGhvZCcpKFtdLnJlZHVjZVJpZ2h0LCB0cnVlKSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjMuMTkgLyAxNS40LjQuMjIgQXJyYXkucHJvdG90eXBlLnJlZHVjZVJpZ2h0KGNhbGxiYWNrZm4gWywgaW5pdGlhbFZhbHVlXSlcbiAgcmVkdWNlUmlnaHQ6IGZ1bmN0aW9uIHJlZHVjZVJpZ2h0KGNhbGxiYWNrZm4gLyogLCBpbml0aWFsVmFsdWUgKi8pe1xuICAgIHJldHVybiAkcmVkdWNlKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3VtZW50c1sxXSwgdHJ1ZSk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkaW5kZXhPZiAgICAgID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSlcbiAgLCAkbmF0aXZlICAgICAgID0gW10uaW5kZXhPZlxuICAsIE5FR0FUSVZFX1pFUk8gPSAhISRuYXRpdmUgJiYgMSAvIFsxXS5pbmRleE9mKDEsIC0wKSA8IDA7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKE5FR0FUSVZFX1pFUk8gfHwgIXJlcXVpcmUoJy4vX3N0cmljdC1tZXRob2QnKSgkbmF0aXZlKSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4zLjExIC8gMTUuNC40LjE0IEFycmF5LnByb3RvdHlwZS5pbmRleE9mKHNlYXJjaEVsZW1lbnQgWywgZnJvbUluZGV4XSlcbiAgaW5kZXhPZjogZnVuY3Rpb24gaW5kZXhPZihzZWFyY2hFbGVtZW50IC8qLCBmcm9tSW5kZXggPSAwICovKXtcbiAgICByZXR1cm4gTkVHQVRJVkVfWkVST1xuICAgICAgLy8gY29udmVydCAtMCB0byArMFxuICAgICAgPyAkbmF0aXZlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgMFxuICAgICAgOiAkaW5kZXhPZih0aGlzLCBzZWFyY2hFbGVtZW50LCBhcmd1bWVudHNbMV0pO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgdG9JT2JqZWN0ICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvSW50ZWdlciAgICAgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCB0b0xlbmd0aCAgICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCAkbmF0aXZlICAgICAgID0gW10ubGFzdEluZGV4T2ZcbiAgLCBORUdBVElWRV9aRVJPID0gISEkbmF0aXZlICYmIDEgLyBbMV0ubGFzdEluZGV4T2YoMSwgLTApIDwgMDtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoTkVHQVRJVkVfWkVSTyB8fCAhcmVxdWlyZSgnLi9fc3RyaWN0LW1ldGhvZCcpKCRuYXRpdmUpKSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjMuMTQgLyAxNS40LjQuMTUgQXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mKHNlYXJjaEVsZW1lbnQgWywgZnJvbUluZGV4XSlcbiAgbGFzdEluZGV4T2Y6IGZ1bmN0aW9uIGxhc3RJbmRleE9mKHNlYXJjaEVsZW1lbnQgLyosIGZyb21JbmRleCA9IEBbKi0xXSAqLyl7XG4gICAgLy8gY29udmVydCAtMCB0byArMFxuICAgIGlmKE5FR0FUSVZFX1pFUk8pcmV0dXJuICRuYXRpdmUuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCAwO1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QodGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IGxlbmd0aCAtIDE7XG4gICAgaWYoYXJndW1lbnRzLmxlbmd0aCA+IDEpaW5kZXggPSBNYXRoLm1pbihpbmRleCwgdG9JbnRlZ2VyKGFyZ3VtZW50c1sxXSkpO1xuICAgIGlmKGluZGV4IDwgMClpbmRleCA9IGxlbmd0aCArIGluZGV4O1xuICAgIGZvcig7aW5kZXggPj0gMDsgaW5kZXgtLSlpZihpbmRleCBpbiBPKWlmKE9baW5kZXhdID09PSBzZWFyY2hFbGVtZW50KXJldHVybiBpbmRleCB8fCAwO1xuICAgIHJldHVybiAtMTtcbiAgfVxufSk7IiwiLy8gMjIuMS4zLjMgQXJyYXkucHJvdG90eXBlLmNvcHlXaXRoaW4odGFyZ2V0LCBzdGFydCwgZW5kID0gdGhpcy5sZW5ndGgpXG4ndXNlIHN0cmljdCc7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIHRvSW5kZXggID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKVxuICAsIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gW10uY29weVdpdGhpbiB8fCBmdW5jdGlvbiBjb3B5V2l0aGluKHRhcmdldC8qPSAwKi8sIHN0YXJ0Lyo9IDAsIGVuZCA9IEBsZW5ndGgqLyl7XG4gIHZhciBPICAgICA9IHRvT2JqZWN0KHRoaXMpXG4gICAgLCBsZW4gICA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICwgdG8gICAgPSB0b0luZGV4KHRhcmdldCwgbGVuKVxuICAgICwgZnJvbSAgPSB0b0luZGV4KHN0YXJ0LCBsZW4pXG4gICAgLCBlbmQgICA9IGFyZ3VtZW50cy5sZW5ndGggPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkXG4gICAgLCBjb3VudCA9IE1hdGgubWluKChlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IHRvSW5kZXgoZW5kLCBsZW4pKSAtIGZyb20sIGxlbiAtIHRvKVxuICAgICwgaW5jICAgPSAxO1xuICBpZihmcm9tIDwgdG8gJiYgdG8gPCBmcm9tICsgY291bnQpe1xuICAgIGluYyAgPSAtMTtcbiAgICBmcm9tICs9IGNvdW50IC0gMTtcbiAgICB0byAgICs9IGNvdW50IC0gMTtcbiAgfVxuICB3aGlsZShjb3VudC0tID4gMCl7XG4gICAgaWYoZnJvbSBpbiBPKU9bdG9dID0gT1tmcm9tXTtcbiAgICBlbHNlIGRlbGV0ZSBPW3RvXTtcbiAgICB0byAgICs9IGluYztcbiAgICBmcm9tICs9IGluYztcbiAgfSByZXR1cm4gTztcbn07IiwiLy8gMjIuMS4zLjMxIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxudmFyIFVOU0NPUEFCTEVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3Vuc2NvcGFibGVzJylcbiAgLCBBcnJheVByb3RvICA9IEFycmF5LnByb3RvdHlwZTtcbmlmKEFycmF5UHJvdG9bVU5TQ09QQUJMRVNdID09IHVuZGVmaW5lZClyZXF1aXJlKCcuL19oaWRlJykoQXJyYXlQcm90bywgVU5TQ09QQUJMRVMsIHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgQXJyYXlQcm90b1tVTlNDT1BBQkxFU11ba2V5XSA9IHRydWU7XG59OyIsIi8vIDIyLjEuMy4zIEFycmF5LnByb3RvdHlwZS5jb3B5V2l0aGluKHRhcmdldCwgc3RhcnQsIGVuZCA9IHRoaXMubGVuZ3RoKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAsICdBcnJheScsIHtjb3B5V2l0aGluOiByZXF1aXJlKCcuL19hcnJheS1jb3B5LXdpdGhpbicpfSk7XG5cbnJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpKCdjb3B5V2l0aGluJyk7IiwiLy8gMjIuMS4zLjYgQXJyYXkucHJvdG90eXBlLmZpbGwodmFsdWUsIHN0YXJ0ID0gMCwgZW5kID0gdGhpcy5sZW5ndGgpXG4ndXNlIHN0cmljdCc7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIHRvSW5kZXggID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKVxuICAsIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZpbGwodmFsdWUgLyosIHN0YXJ0ID0gMCwgZW5kID0gQGxlbmd0aCAqLyl7XG4gIHZhciBPICAgICAgPSB0b09iamVjdCh0aGlzKVxuICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgLCBhTGVuICAgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBpbmRleCAgPSB0b0luZGV4KGFMZW4gPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkLCBsZW5ndGgpXG4gICAgLCBlbmQgICAgPSBhTGVuID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZFxuICAgICwgZW5kUG9zID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiB0b0luZGV4KGVuZCwgbGVuZ3RoKTtcbiAgd2hpbGUoZW5kUG9zID4gaW5kZXgpT1tpbmRleCsrXSA9IHZhbHVlO1xuICByZXR1cm4gTztcbn07IiwiLy8gMjIuMS4zLjYgQXJyYXkucHJvdG90eXBlLmZpbGwodmFsdWUsIHN0YXJ0ID0gMCwgZW5kID0gdGhpcy5sZW5ndGgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCwgJ0FycmF5Jywge2ZpbGw6IHJlcXVpcmUoJy4vX2FycmF5LWZpbGwnKX0pO1xuXG5yZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKSgnZmlsbCcpOyIsIid1c2Ugc3RyaWN0Jztcbi8vIDIyLjEuMy44IEFycmF5LnByb3RvdHlwZS5maW5kKHByZWRpY2F0ZSwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkZmluZCAgID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpKDUpXG4gICwgS0VZICAgICA9ICdmaW5kJ1xuICAsIGZvcmNlZCAgPSB0cnVlO1xuLy8gU2hvdWxkbid0IHNraXAgaG9sZXNcbmlmKEtFWSBpbiBbXSlBcnJheSgxKVtLRVldKGZ1bmN0aW9uKCl7IGZvcmNlZCA9IGZhbHNlOyB9KTtcbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogZm9yY2VkLCAnQXJyYXknLCB7XG4gIGZpbmQ6IGZ1bmN0aW9uIGZpbmQoY2FsbGJhY2tmbi8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICByZXR1cm4gJGZpbmQodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcbnJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpKEtFWSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjIuMS4zLjkgQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleChwcmVkaWNhdGUsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJGZpbmQgICA9IHJlcXVpcmUoJy4vX2FycmF5LW1ldGhvZHMnKSg2KVxuICAsIEtFWSAgICAgPSAnZmluZEluZGV4J1xuICAsIGZvcmNlZCAgPSB0cnVlO1xuLy8gU2hvdWxkbid0IHNraXAgaG9sZXNcbmlmKEtFWSBpbiBbXSlBcnJheSgxKVtLRVldKGZ1bmN0aW9uKCl7IGZvcmNlZCA9IGZhbHNlOyB9KTtcbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogZm9yY2VkLCAnQXJyYXknLCB7XG4gIGZpbmRJbmRleDogZnVuY3Rpb24gZmluZEluZGV4KGNhbGxiYWNrZm4vKiwgdGhhdCA9IHVuZGVmaW5lZCAqLyl7XG4gICAgcmV0dXJuICRmaW5kKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG5yZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKShLRVkpOyIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgZFAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsIFNQRUNJRVMgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVkpe1xuICB2YXIgQyA9IGdsb2JhbFtLRVldO1xuICBpZihERVNDUklQVE9SUyAmJiBDICYmICFDW1NQRUNJRVNdKWRQLmYoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9XG4gIH0pO1xufTsiLCJyZXF1aXJlKCcuL19zZXQtc3BlY2llcycpKCdBcnJheScpOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9uZSwgdmFsdWUpe1xuICByZXR1cm4ge3ZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKVxuICAsIHN0ZXAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKVxuICAsIEl0ZXJhdG9ycyAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIHRvSU9iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGtpbmQgID0gdGhpcy5fa1xuICAgICwgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKXtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTsiLCIndXNlIHN0cmljdCc7XG4vLyAyMS4yLjUuMyBnZXQgUmVnRXhwLnByb3RvdHlwZS5mbGFnc1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7XG4gIHZhciB0aGF0ICAgPSBhbk9iamVjdCh0aGlzKVxuICAgICwgcmVzdWx0ID0gJyc7XG4gIGlmKHRoYXQuZ2xvYmFsKSAgICAgcmVzdWx0ICs9ICdnJztcbiAgaWYodGhhdC5pZ25vcmVDYXNlKSByZXN1bHQgKz0gJ2knO1xuICBpZih0aGF0Lm11bHRpbGluZSkgIHJlc3VsdCArPSAnbSc7XG4gIGlmKHRoYXQudW5pY29kZSkgICAgcmVzdWx0ICs9ICd1JztcbiAgaWYodGhhdC5zdGlja3kpICAgICByZXN1bHQgKz0gJ3knO1xuICByZXR1cm4gcmVzdWx0O1xufTsiLCJ2YXIgZ2xvYmFsICAgICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGluaGVyaXRJZlJlcXVpcmVkID0gcmVxdWlyZSgnLi9faW5oZXJpdC1pZi1yZXF1aXJlZCcpXG4gICwgZFAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgZ09QTiAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmZcbiAgLCBpc1JlZ0V4cCAgICAgICAgICA9IHJlcXVpcmUoJy4vX2lzLXJlZ2V4cCcpXG4gICwgJGZsYWdzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19mbGFncycpXG4gICwgJFJlZ0V4cCAgICAgICAgICAgPSBnbG9iYWwuUmVnRXhwXG4gICwgQmFzZSAgICAgICAgICAgICAgPSAkUmVnRXhwXG4gICwgcHJvdG8gICAgICAgICAgICAgPSAkUmVnRXhwLnByb3RvdHlwZVxuICAsIHJlMSAgICAgICAgICAgICAgID0gL2EvZ1xuICAsIHJlMiAgICAgICAgICAgICAgID0gL2EvZ1xuICAvLyBcIm5ld1wiIGNyZWF0ZXMgYSBuZXcgb2JqZWN0LCBvbGQgd2Via2l0IGJ1Z2d5IGhlcmVcbiAgLCBDT1JSRUNUX05FVyAgICAgICA9IG5ldyAkUmVnRXhwKHJlMSkgIT09IHJlMTtcblxuaWYocmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAoIUNPUlJFQ1RfTkVXIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmUyW3JlcXVpcmUoJy4vX3drcycpKCdtYXRjaCcpXSA9IGZhbHNlO1xuICAvLyBSZWdFeHAgY29uc3RydWN0b3IgY2FuIGFsdGVyIGZsYWdzIGFuZCBJc1JlZ0V4cCB3b3JrcyBjb3JyZWN0IHdpdGggQEBtYXRjaFxuICByZXR1cm4gJFJlZ0V4cChyZTEpICE9IHJlMSB8fCAkUmVnRXhwKHJlMikgPT0gcmUyIHx8ICRSZWdFeHAocmUxLCAnaScpICE9ICcvYS9pJztcbn0pKSl7XG4gICRSZWdFeHAgPSBmdW5jdGlvbiBSZWdFeHAocCwgZil7XG4gICAgdmFyIHRpUkUgPSB0aGlzIGluc3RhbmNlb2YgJFJlZ0V4cFxuICAgICAgLCBwaVJFID0gaXNSZWdFeHAocClcbiAgICAgICwgZmlVICA9IGYgPT09IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gIXRpUkUgJiYgcGlSRSAmJiBwLmNvbnN0cnVjdG9yID09PSAkUmVnRXhwICYmIGZpVSA/IHBcbiAgICAgIDogaW5oZXJpdElmUmVxdWlyZWQoQ09SUkVDVF9ORVdcbiAgICAgICAgPyBuZXcgQmFzZShwaVJFICYmICFmaVUgPyBwLnNvdXJjZSA6IHAsIGYpXG4gICAgICAgIDogQmFzZSgocGlSRSA9IHAgaW5zdGFuY2VvZiAkUmVnRXhwKSA/IHAuc291cmNlIDogcCwgcGlSRSAmJiBmaVUgPyAkZmxhZ3MuY2FsbChwKSA6IGYpXG4gICAgICAsIHRpUkUgPyB0aGlzIDogcHJvdG8sICRSZWdFeHApO1xuICB9O1xuICB2YXIgcHJveHkgPSBmdW5jdGlvbihrZXkpe1xuICAgIGtleSBpbiAkUmVnRXhwIHx8IGRQKCRSZWdFeHAsIGtleSwge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gQmFzZVtrZXldOyB9LFxuICAgICAgc2V0OiBmdW5jdGlvbihpdCl7IEJhc2Vba2V5XSA9IGl0OyB9XG4gICAgfSk7XG4gIH07XG4gIGZvcih2YXIga2V5cyA9IGdPUE4oQmFzZSksIGkgPSAwOyBrZXlzLmxlbmd0aCA+IGk7IClwcm94eShrZXlzW2krK10pO1xuICBwcm90by5jb25zdHJ1Y3RvciA9ICRSZWdFeHA7XG4gICRSZWdFeHAucHJvdG90eXBlID0gcHJvdG87XG4gIHJlcXVpcmUoJy4vX3JlZGVmaW5lJykoZ2xvYmFsLCAnUmVnRXhwJywgJFJlZ0V4cCk7XG59XG5cbnJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJykoJ1JlZ0V4cCcpOyIsIi8vIDIxLjIuNS4zIGdldCBSZWdFeHAucHJvdG90eXBlLmZsYWdzKClcbmlmKHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgLy4vZy5mbGFncyAhPSAnZycpcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZihSZWdFeHAucHJvdG90eXBlLCAnZmxhZ3MnLCB7XG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgZ2V0OiByZXF1aXJlKCcuL19mbGFncycpXG59KTsiLCIndXNlIHN0cmljdCc7XG5yZXF1aXJlKCcuL2VzNi5yZWdleHAuZmxhZ3MnKTtcbnZhciBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgJGZsYWdzICAgICAgPSByZXF1aXJlKCcuL19mbGFncycpXG4gICwgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpXG4gICwgVE9fU1RSSU5HICAgPSAndG9TdHJpbmcnXG4gICwgJHRvU3RyaW5nICAgPSAvLi9bVE9fU1RSSU5HXTtcblxudmFyIGRlZmluZSA9IGZ1bmN0aW9uKGZuKXtcbiAgcmVxdWlyZSgnLi9fcmVkZWZpbmUnKShSZWdFeHAucHJvdG90eXBlLCBUT19TVFJJTkcsIGZuLCB0cnVlKTtcbn07XG5cbi8vIDIxLjIuNS4xNCBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nKClcbmlmKHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXsgcmV0dXJuICR0b1N0cmluZy5jYWxsKHtzb3VyY2U6ICdhJywgZmxhZ3M6ICdiJ30pICE9ICcvYS9iJzsgfSkpe1xuICBkZWZpbmUoZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICB2YXIgUiA9IGFuT2JqZWN0KHRoaXMpO1xuICAgIHJldHVybiAnLycuY29uY2F0KFIuc291cmNlLCAnLycsXG4gICAgICAnZmxhZ3MnIGluIFIgPyBSLmZsYWdzIDogIURFU0NSSVBUT1JTICYmIFIgaW5zdGFuY2VvZiBSZWdFeHAgPyAkZmxhZ3MuY2FsbChSKSA6IHVuZGVmaW5lZCk7XG4gIH0pO1xuLy8gRkY0NC0gUmVnRXhwI3RvU3RyaW5nIGhhcyBhIHdyb25nIG5hbWVcbn0gZWxzZSBpZigkdG9TdHJpbmcubmFtZSAhPSBUT19TVFJJTkcpe1xuICBkZWZpbmUoZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gJHRvU3RyaW5nLmNhbGwodGhpcyk7XG4gIH0pO1xufSIsIid1c2Ugc3RyaWN0JztcbnZhciBoaWRlICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIGZhaWxzICAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAsIGRlZmluZWQgID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpXG4gICwgd2tzICAgICAgPSByZXF1aXJlKCcuL193a3MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVksIGxlbmd0aCwgZXhlYyl7XG4gIHZhciBTWU1CT0wgICA9IHdrcyhLRVkpXG4gICAgLCBmbnMgICAgICA9IGV4ZWMoZGVmaW5lZCwgU1lNQk9MLCAnJ1tLRVldKVxuICAgICwgc3RyZm4gICAgPSBmbnNbMF1cbiAgICAsIHJ4Zm4gICAgID0gZm5zWzFdO1xuICBpZihmYWlscyhmdW5jdGlvbigpe1xuICAgIHZhciBPID0ge307XG4gICAgT1tTWU1CT0xdID0gZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH07XG4gICAgcmV0dXJuICcnW0tFWV0oTykgIT0gNztcbiAgfSkpe1xuICAgIHJlZGVmaW5lKFN0cmluZy5wcm90b3R5cGUsIEtFWSwgc3RyZm4pO1xuICAgIGhpZGUoUmVnRXhwLnByb3RvdHlwZSwgU1lNQk9MLCBsZW5ndGggPT0gMlxuICAgICAgLy8gMjEuMi41LjggUmVnRXhwLnByb3RvdHlwZVtAQHJlcGxhY2VdKHN0cmluZywgcmVwbGFjZVZhbHVlKVxuICAgICAgLy8gMjEuMi41LjExIFJlZ0V4cC5wcm90b3R5cGVbQEBzcGxpdF0oc3RyaW5nLCBsaW1pdClcbiAgICAgID8gZnVuY3Rpb24oc3RyaW5nLCBhcmcpeyByZXR1cm4gcnhmbi5jYWxsKHN0cmluZywgdGhpcywgYXJnKTsgfVxuICAgICAgLy8gMjEuMi41LjYgUmVnRXhwLnByb3RvdHlwZVtAQG1hdGNoXShzdHJpbmcpXG4gICAgICAvLyAyMS4yLjUuOSBSZWdFeHAucHJvdG90eXBlW0BAc2VhcmNoXShzdHJpbmcpXG4gICAgICA6IGZ1bmN0aW9uKHN0cmluZyl7IHJldHVybiByeGZuLmNhbGwoc3RyaW5nLCB0aGlzKTsgfVxuICAgICk7XG4gIH1cbn07IiwiLy8gQEBtYXRjaCBsb2dpY1xucmVxdWlyZSgnLi9fZml4LXJlLXdrcycpKCdtYXRjaCcsIDEsIGZ1bmN0aW9uKGRlZmluZWQsIE1BVENILCAkbWF0Y2gpe1xuICAvLyAyMS4xLjMuMTEgU3RyaW5nLnByb3RvdHlwZS5tYXRjaChyZWdleHApXG4gIHJldHVybiBbZnVuY3Rpb24gbWF0Y2gocmVnZXhwKXtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdmFyIE8gID0gZGVmaW5lZCh0aGlzKVxuICAgICAgLCBmbiA9IHJlZ2V4cCA9PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiByZWdleHBbTUFUQ0hdO1xuICAgIHJldHVybiBmbiAhPT0gdW5kZWZpbmVkID8gZm4uY2FsbChyZWdleHAsIE8pIDogbmV3IFJlZ0V4cChyZWdleHApW01BVENIXShTdHJpbmcoTykpO1xuICB9LCAkbWF0Y2hdO1xufSk7IiwiLy8gQEByZXBsYWNlIGxvZ2ljXG5yZXF1aXJlKCcuL19maXgtcmUtd2tzJykoJ3JlcGxhY2UnLCAyLCBmdW5jdGlvbihkZWZpbmVkLCBSRVBMQUNFLCAkcmVwbGFjZSl7XG4gIC8vIDIxLjEuMy4xNCBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2Uoc2VhcmNoVmFsdWUsIHJlcGxhY2VWYWx1ZSlcbiAgcmV0dXJuIFtmdW5jdGlvbiByZXBsYWNlKHNlYXJjaFZhbHVlLCByZXBsYWNlVmFsdWUpe1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgTyAgPSBkZWZpbmVkKHRoaXMpXG4gICAgICAsIGZuID0gc2VhcmNoVmFsdWUgPT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogc2VhcmNoVmFsdWVbUkVQTEFDRV07XG4gICAgcmV0dXJuIGZuICE9PSB1bmRlZmluZWRcbiAgICAgID8gZm4uY2FsbChzZWFyY2hWYWx1ZSwgTywgcmVwbGFjZVZhbHVlKVxuICAgICAgOiAkcmVwbGFjZS5jYWxsKFN0cmluZyhPKSwgc2VhcmNoVmFsdWUsIHJlcGxhY2VWYWx1ZSk7XG4gIH0sICRyZXBsYWNlXTtcbn0pOyIsIi8vIEBAc2VhcmNoIGxvZ2ljXG5yZXF1aXJlKCcuL19maXgtcmUtd2tzJykoJ3NlYXJjaCcsIDEsIGZ1bmN0aW9uKGRlZmluZWQsIFNFQVJDSCwgJHNlYXJjaCl7XG4gIC8vIDIxLjEuMy4xNSBTdHJpbmcucHJvdG90eXBlLnNlYXJjaChyZWdleHApXG4gIHJldHVybiBbZnVuY3Rpb24gc2VhcmNoKHJlZ2V4cCl7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBPICA9IGRlZmluZWQodGhpcylcbiAgICAgICwgZm4gPSByZWdleHAgPT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogcmVnZXhwW1NFQVJDSF07XG4gICAgcmV0dXJuIGZuICE9PSB1bmRlZmluZWQgPyBmbi5jYWxsKHJlZ2V4cCwgTykgOiBuZXcgUmVnRXhwKHJlZ2V4cClbU0VBUkNIXShTdHJpbmcoTykpO1xuICB9LCAkc2VhcmNoXTtcbn0pOyIsIi8vIEBAc3BsaXQgbG9naWNcbnJlcXVpcmUoJy4vX2ZpeC1yZS13a3MnKSgnc3BsaXQnLCAyLCBmdW5jdGlvbihkZWZpbmVkLCBTUExJVCwgJHNwbGl0KXtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgaXNSZWdFeHAgICA9IHJlcXVpcmUoJy4vX2lzLXJlZ2V4cCcpXG4gICAgLCBfc3BsaXQgICAgID0gJHNwbGl0XG4gICAgLCAkcHVzaCAgICAgID0gW10ucHVzaFxuICAgICwgJFNQTElUICAgICA9ICdzcGxpdCdcbiAgICAsIExFTkdUSCAgICAgPSAnbGVuZ3RoJ1xuICAgICwgTEFTVF9JTkRFWCA9ICdsYXN0SW5kZXgnO1xuICBpZihcbiAgICAnYWJiYydbJFNQTElUXSgvKGIpKi8pWzFdID09ICdjJyB8fFxuICAgICd0ZXN0J1skU1BMSVRdKC8oPzopLywgLTEpW0xFTkdUSF0gIT0gNCB8fFxuICAgICdhYidbJFNQTElUXSgvKD86YWIpKi8pW0xFTkdUSF0gIT0gMiB8fFxuICAgICcuJ1skU1BMSVRdKC8oLj8pKC4/KS8pW0xFTkdUSF0gIT0gNCB8fFxuICAgICcuJ1skU1BMSVRdKC8oKSgpLylbTEVOR1RIXSA+IDEgfHxcbiAgICAnJ1skU1BMSVRdKC8uPy8pW0xFTkdUSF1cbiAgKXtcbiAgICB2YXIgTlBDRyA9IC8oKT8/Ly5leGVjKCcnKVsxXSA9PT0gdW5kZWZpbmVkOyAvLyBub25wYXJ0aWNpcGF0aW5nIGNhcHR1cmluZyBncm91cFxuICAgIC8vIGJhc2VkIG9uIGVzNS1zaGltIGltcGxlbWVudGF0aW9uLCBuZWVkIHRvIHJld29yayBpdFxuICAgICRzcGxpdCA9IGZ1bmN0aW9uKHNlcGFyYXRvciwgbGltaXQpe1xuICAgICAgdmFyIHN0cmluZyA9IFN0cmluZyh0aGlzKTtcbiAgICAgIGlmKHNlcGFyYXRvciA9PT0gdW5kZWZpbmVkICYmIGxpbWl0ID09PSAwKXJldHVybiBbXTtcbiAgICAgIC8vIElmIGBzZXBhcmF0b3JgIGlzIG5vdCBhIHJlZ2V4LCB1c2UgbmF0aXZlIHNwbGl0XG4gICAgICBpZighaXNSZWdFeHAoc2VwYXJhdG9yKSlyZXR1cm4gX3NwbGl0LmNhbGwoc3RyaW5nLCBzZXBhcmF0b3IsIGxpbWl0KTtcbiAgICAgIHZhciBvdXRwdXQgPSBbXTtcbiAgICAgIHZhciBmbGFncyA9IChzZXBhcmF0b3IuaWdub3JlQ2FzZSA/ICdpJyA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAoc2VwYXJhdG9yLm11bHRpbGluZSA/ICdtJyA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAoc2VwYXJhdG9yLnVuaWNvZGUgPyAndScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHNlcGFyYXRvci5zdGlja3kgPyAneScgOiAnJyk7XG4gICAgICB2YXIgbGFzdExhc3RJbmRleCA9IDA7XG4gICAgICB2YXIgc3BsaXRMaW1pdCA9IGxpbWl0ID09PSB1bmRlZmluZWQgPyA0Mjk0OTY3Mjk1IDogbGltaXQgPj4+IDA7XG4gICAgICAvLyBNYWtlIGBnbG9iYWxgIGFuZCBhdm9pZCBgbGFzdEluZGV4YCBpc3N1ZXMgYnkgd29ya2luZyB3aXRoIGEgY29weVxuICAgICAgdmFyIHNlcGFyYXRvckNvcHkgPSBuZXcgUmVnRXhwKHNlcGFyYXRvci5zb3VyY2UsIGZsYWdzICsgJ2cnKTtcbiAgICAgIHZhciBzZXBhcmF0b3IyLCBtYXRjaCwgbGFzdEluZGV4LCBsYXN0TGVuZ3RoLCBpO1xuICAgICAgLy8gRG9lc24ndCBuZWVkIGZsYWdzIGd5LCBidXQgdGhleSBkb24ndCBodXJ0XG4gICAgICBpZighTlBDRylzZXBhcmF0b3IyID0gbmV3IFJlZ0V4cCgnXicgKyBzZXBhcmF0b3JDb3B5LnNvdXJjZSArICckKD8hXFxcXHMpJywgZmxhZ3MpO1xuICAgICAgd2hpbGUobWF0Y2ggPSBzZXBhcmF0b3JDb3B5LmV4ZWMoc3RyaW5nKSl7XG4gICAgICAgIC8vIGBzZXBhcmF0b3JDb3B5Lmxhc3RJbmRleGAgaXMgbm90IHJlbGlhYmxlIGNyb3NzLWJyb3dzZXJcbiAgICAgICAgbGFzdEluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXVtMRU5HVEhdO1xuICAgICAgICBpZihsYXN0SW5kZXggPiBsYXN0TGFzdEluZGV4KXtcbiAgICAgICAgICBvdXRwdXQucHVzaChzdHJpbmcuc2xpY2UobGFzdExhc3RJbmRleCwgbWF0Y2guaW5kZXgpKTtcbiAgICAgICAgICAvLyBGaXggYnJvd3NlcnMgd2hvc2UgYGV4ZWNgIG1ldGhvZHMgZG9uJ3QgY29uc2lzdGVudGx5IHJldHVybiBgdW5kZWZpbmVkYCBmb3IgTlBDR1xuICAgICAgICAgIGlmKCFOUENHICYmIG1hdGNoW0xFTkdUSF0gPiAxKW1hdGNoWzBdLnJlcGxhY2Uoc2VwYXJhdG9yMiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGZvcihpID0gMTsgaSA8IGFyZ3VtZW50c1tMRU5HVEhdIC0gMjsgaSsrKWlmKGFyZ3VtZW50c1tpXSA9PT0gdW5kZWZpbmVkKW1hdGNoW2ldID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmKG1hdGNoW0xFTkdUSF0gPiAxICYmIG1hdGNoLmluZGV4IDwgc3RyaW5nW0xFTkdUSF0pJHB1c2guYXBwbHkob3V0cHV0LCBtYXRjaC5zbGljZSgxKSk7XG4gICAgICAgICAgbGFzdExlbmd0aCA9IG1hdGNoWzBdW0xFTkdUSF07XG4gICAgICAgICAgbGFzdExhc3RJbmRleCA9IGxhc3RJbmRleDtcbiAgICAgICAgICBpZihvdXRwdXRbTEVOR1RIXSA+PSBzcGxpdExpbWl0KWJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmKHNlcGFyYXRvckNvcHlbTEFTVF9JTkRFWF0gPT09IG1hdGNoLmluZGV4KXNlcGFyYXRvckNvcHlbTEFTVF9JTkRFWF0rKzsgLy8gQXZvaWQgYW4gaW5maW5pdGUgbG9vcFxuICAgICAgfVxuICAgICAgaWYobGFzdExhc3RJbmRleCA9PT0gc3RyaW5nW0xFTkdUSF0pe1xuICAgICAgICBpZihsYXN0TGVuZ3RoIHx8ICFzZXBhcmF0b3JDb3B5LnRlc3QoJycpKW91dHB1dC5wdXNoKCcnKTtcbiAgICAgIH0gZWxzZSBvdXRwdXQucHVzaChzdHJpbmcuc2xpY2UobGFzdExhc3RJbmRleCkpO1xuICAgICAgcmV0dXJuIG91dHB1dFtMRU5HVEhdID4gc3BsaXRMaW1pdCA/IG91dHB1dC5zbGljZSgwLCBzcGxpdExpbWl0KSA6IG91dHB1dDtcbiAgICB9O1xuICAvLyBDaGFrcmEsIFY4XG4gIH0gZWxzZSBpZignMCdbJFNQTElUXSh1bmRlZmluZWQsIDApW0xFTkdUSF0pe1xuICAgICRzcGxpdCA9IGZ1bmN0aW9uKHNlcGFyYXRvciwgbGltaXQpe1xuICAgICAgcmV0dXJuIHNlcGFyYXRvciA9PT0gdW5kZWZpbmVkICYmIGxpbWl0ID09PSAwID8gW10gOiBfc3BsaXQuY2FsbCh0aGlzLCBzZXBhcmF0b3IsIGxpbWl0KTtcbiAgICB9O1xuICB9XG4gIC8vIDIxLjEuMy4xNyBTdHJpbmcucHJvdG90eXBlLnNwbGl0KHNlcGFyYXRvciwgbGltaXQpXG4gIHJldHVybiBbZnVuY3Rpb24gc3BsaXQoc2VwYXJhdG9yLCBsaW1pdCl7XG4gICAgdmFyIE8gID0gZGVmaW5lZCh0aGlzKVxuICAgICAgLCBmbiA9IHNlcGFyYXRvciA9PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBzZXBhcmF0b3JbU1BMSVRdO1xuICAgIHJldHVybiBmbiAhPT0gdW5kZWZpbmVkID8gZm4uY2FsbChzZXBhcmF0b3IsIE8sIGxpbWl0KSA6ICRzcGxpdC5jYWxsKFN0cmluZyhPKSwgc2VwYXJhdG9yLCBsaW1pdCk7XG4gIH0sICRzcGxpdF07XG59KTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSwgZm9yYmlkZGVuRmllbGQpe1xuICBpZighKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpIHx8IChmb3JiaWRkZW5GaWVsZCAhPT0gdW5kZWZpbmVkICYmIGZvcmJpZGRlbkZpZWxkIGluIGl0KSl7XG4gICAgdGhyb3cgVHlwZUVycm9yKG5hbWUgKyAnOiBpbmNvcnJlY3QgaW52b2NhdGlvbiEnKTtcbiAgfSByZXR1cm4gaXQ7XG59OyIsInZhciBjdHggICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgY2FsbCAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKVxuICAsIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpXG4gICwgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvTGVuZ3RoICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBnZXRJdGVyRm4gICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJylcbiAgLCBCUkVBSyAgICAgICA9IHt9XG4gICwgUkVUVVJOICAgICAgPSB7fTtcbnZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQsIElURVJBVE9SKXtcbiAgdmFyIGl0ZXJGbiA9IElURVJBVE9SID8gZnVuY3Rpb24oKXsgcmV0dXJuIGl0ZXJhYmxlOyB9IDogZ2V0SXRlckZuKGl0ZXJhYmxlKVxuICAgICwgZiAgICAgID0gY3R4KGZuLCB0aGF0LCBlbnRyaWVzID8gMiA6IDEpXG4gICAgLCBpbmRleCAgPSAwXG4gICAgLCBsZW5ndGgsIHN0ZXAsIGl0ZXJhdG9yLCByZXN1bHQ7XG4gIGlmKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXRlcmFibGUgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgLy8gZmFzdCBjYXNlIGZvciBhcnJheXMgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yXG4gIGlmKGlzQXJyYXlJdGVyKGl0ZXJGbikpZm9yKGxlbmd0aCA9IHRvTGVuZ3RoKGl0ZXJhYmxlLmxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcbiAgICByZXN1bHQgPSBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gICAgaWYocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTilyZXR1cm4gcmVzdWx0O1xuICB9IGVsc2UgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7ICl7XG4gICAgcmVzdWx0ID0gY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcyk7XG4gICAgaWYocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTilyZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuZXhwb3J0cy5CUkVBSyAgPSBCUkVBSztcbmV4cG9ydHMuUkVUVVJOID0gUkVUVVJOOyIsIi8vIDcuMy4yMCBTcGVjaWVzQ29uc3RydWN0b3IoTywgZGVmYXVsdENvbnN0cnVjdG9yKVxudmFyIGFuT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXG4gICwgU1BFQ0lFUyAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTywgRCl7XG4gIHZhciBDID0gYW5PYmplY3QoTykuY29uc3RydWN0b3IsIFM7XG4gIHJldHVybiBDID09PSB1bmRlZmluZWQgfHwgKFMgPSBhbk9iamVjdChDKVtTUEVDSUVTXSkgPT0gdW5kZWZpbmVkID8gRCA6IGFGdW5jdGlvbihTKTtcbn07IiwidmFyIGN0eCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgaW52b2tlICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faW52b2tlJylcbiAgLCBodG1sICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19odG1sJylcbiAgLCBjZWwgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJylcbiAgLCBnbG9iYWwgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIHByb2Nlc3MgICAgICAgICAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgc2V0VGFzayAgICAgICAgICAgID0gZ2xvYmFsLnNldEltbWVkaWF0ZVxuICAsIGNsZWFyVGFzayAgICAgICAgICA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZVxuICAsIE1lc3NhZ2VDaGFubmVsICAgICA9IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbFxuICAsIGNvdW50ZXIgICAgICAgICAgICA9IDBcbiAgLCBxdWV1ZSAgICAgICAgICAgICAgPSB7fVxuICAsIE9OUkVBRFlTVEFURUNIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnXG4gICwgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG52YXIgcnVuID0gZnVuY3Rpb24oKXtcbiAgdmFyIGlkID0gK3RoaXM7XG4gIGlmKHF1ZXVlLmhhc093blByb3BlcnR5KGlkKSl7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgcnVuLmNhbGwoZXZlbnQuZGF0YSk7XG59O1xuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYoIXNldFRhc2sgfHwgIWNsZWFyVGFzayl7XG4gIHNldFRhc2sgPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoZm4pe1xuICAgIHZhciBhcmdzID0gW10sIGkgPSAxO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcXVldWVbKytjb3VudGVyXSA9IGZ1bmN0aW9uKCl7XG4gICAgICBpbnZva2UodHlwZW9mIGZuID09ICdmdW5jdGlvbicgPyBmbiA6IEZ1bmN0aW9uKGZuKSwgYXJncyk7XG4gICAgfTtcbiAgICBkZWZlcihjb3VudGVyKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcbiAgY2xlYXJUYXNrID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaWQpe1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZihyZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcycpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIEJyb3dzZXJzIHdpdGggTWVzc2FnZUNoYW5uZWwsIGluY2x1ZGVzIFdlYldvcmtlcnNcbiAgfSBlbHNlIGlmKE1lc3NhZ2VDaGFubmVsKXtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsO1xuICAgIHBvcnQgICAgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiYgdHlwZW9mIHBvc3RNZXNzYWdlID09ICdmdW5jdGlvbicgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShpZCArICcnLCAnKicpO1xuICAgIH07XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZihPTlJFQURZU1RBVEVDSEFOR0UgaW4gY2VsKCdzY3JpcHQnKSl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNlbCgnc2NyaXB0JykpW09OUkVBRFlTVEFURUNIQU5HRV0gPSBmdW5jdGlvbigpe1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4uY2FsbChpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogICBzZXRUYXNrLFxuICBjbGVhcjogY2xlYXJUYXNrXG59OyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIG1hY3JvdGFzayA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXRcbiAgLCBPYnNlcnZlciAgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlclxuICAsIHByb2Nlc3MgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgUHJvbWlzZSAgID0gZ2xvYmFsLlByb21pc2VcbiAgLCBpc05vZGUgICAgPSByZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXtcbiAgdmFyIGhlYWQsIGxhc3QsIG5vdGlmeTtcblxuICB2YXIgZmx1c2ggPSBmdW5jdGlvbigpe1xuICAgIHZhciBwYXJlbnQsIGZuO1xuICAgIGlmKGlzTm9kZSAmJiAocGFyZW50ID0gcHJvY2Vzcy5kb21haW4pKXBhcmVudC5leGl0KCk7XG4gICAgd2hpbGUoaGVhZCl7XG4gICAgICBmbiAgID0gaGVhZC5mbjtcbiAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gICAgICB0cnkge1xuICAgICAgICBmbigpO1xuICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgaWYoaGVhZClub3RpZnkoKTtcbiAgICAgICAgZWxzZSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH0gbGFzdCA9IHVuZGVmaW5lZDtcbiAgICBpZihwYXJlbnQpcGFyZW50LmVudGVyKCk7XG4gIH07XG5cbiAgLy8gTm9kZS5qc1xuICBpZihpc05vZGUpe1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgICB9O1xuICAvLyBicm93c2VycyB3aXRoIE11dGF0aW9uT2JzZXJ2ZXJcbiAgfSBlbHNlIGlmKE9ic2VydmVyKXtcbiAgICB2YXIgdG9nZ2xlID0gdHJ1ZVxuICAgICAgLCBub2RlICAgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgbmV3IE9ic2VydmVyKGZsdXNoKS5vYnNlcnZlKG5vZGUsIHtjaGFyYWN0ZXJEYXRhOiB0cnVlfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICAgIG5vZGUuZGF0YSA9IHRvZ2dsZSA9ICF0b2dnbGU7XG4gICAgfTtcbiAgLy8gZW52aXJvbm1lbnRzIHdpdGggbWF5YmUgbm9uLWNvbXBsZXRlbHkgY29ycmVjdCwgYnV0IGV4aXN0ZW50IFByb21pc2VcbiAgfSBlbHNlIGlmKFByb21pc2UgJiYgUHJvbWlzZS5yZXNvbHZlKXtcbiAgICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XG4gICAgICBwcm9taXNlLnRoZW4oZmx1c2gpO1xuICAgIH07XG4gIC8vIGZvciBvdGhlciBlbnZpcm9ubWVudHMgLSBtYWNyb3Rhc2sgYmFzZWQgb246XG4gIC8vIC0gc2V0SW1tZWRpYXRlXG4gIC8vIC0gTWVzc2FnZUNoYW5uZWxcbiAgLy8gLSB3aW5kb3cucG9zdE1lc3NhZ1xuICAvLyAtIG9ucmVhZHlzdGF0ZWNoYW5nZVxuICAvLyAtIHNldFRpbWVvdXRcbiAgfSBlbHNlIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgICAgLy8gc3RyYW5nZSBJRSArIHdlYnBhY2sgZGV2IHNlcnZlciBidWcgLSB1c2UgLmNhbGwoZ2xvYmFsKVxuICAgICAgbWFjcm90YXNrLmNhbGwoZ2xvYmFsLCBmbHVzaCk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbihmbil7XG4gICAgdmFyIHRhc2sgPSB7Zm46IGZuLCBuZXh0OiB1bmRlZmluZWR9O1xuICAgIGlmKGxhc3QpbGFzdC5uZXh0ID0gdGFzaztcbiAgICBpZighaGVhZCl7XG4gICAgICBoZWFkID0gdGFzaztcbiAgICAgIG5vdGlmeSgpO1xuICAgIH0gbGFzdCA9IHRhc2s7XG4gIH07XG59OyIsInZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRhcmdldCwgc3JjLCBzYWZlKXtcbiAgZm9yKHZhciBrZXkgaW4gc3JjKXJlZGVmaW5lKHRhcmdldCwga2V5LCBzcmNba2V5XSwgc2FmZSk7XG4gIHJldHVybiB0YXJnZXQ7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZICAgICAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgLCBnbG9iYWwgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGN0eCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgY2xhc3NvZiAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgJGV4cG9ydCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBpc09iamVjdCAgICAgICAgICAgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGFGdW5jdGlvbiAgICAgICAgICA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsIGFuSW5zdGFuY2UgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJylcbiAgLCBmb3JPZiAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19mb3Itb2YnKVxuICAsIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKVxuICAsIHRhc2sgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXRcbiAgLCBtaWNyb3Rhc2sgICAgICAgICAgPSByZXF1aXJlKCcuL19taWNyb3Rhc2snKSgpXG4gICwgUFJPTUlTRSAgICAgICAgICAgID0gJ1Byb21pc2UnXG4gICwgVHlwZUVycm9yICAgICAgICAgID0gZ2xvYmFsLlR5cGVFcnJvclxuICAsIHByb2Nlc3MgICAgICAgICAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgJFByb21pc2UgICAgICAgICAgID0gZ2xvYmFsW1BST01JU0VdXG4gICwgcHJvY2VzcyAgICAgICAgICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBpc05vZGUgICAgICAgICAgICAgPSBjbGFzc29mKHByb2Nlc3MpID09ICdwcm9jZXNzJ1xuICAsIGVtcHR5ICAgICAgICAgICAgICA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH1cbiAgLCBJbnRlcm5hbCwgR2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5LCBXcmFwcGVyO1xuXG52YXIgVVNFX05BVElWRSA9ICEhZnVuY3Rpb24oKXtcbiAgdHJ5IHtcbiAgICAvLyBjb3JyZWN0IHN1YmNsYXNzaW5nIHdpdGggQEBzcGVjaWVzIHN1cHBvcnRcbiAgICB2YXIgcHJvbWlzZSAgICAgPSAkUHJvbWlzZS5yZXNvbHZlKDEpXG4gICAgICAsIEZha2VQcm9taXNlID0gKHByb21pc2UuY29uc3RydWN0b3IgPSB7fSlbcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKV0gPSBmdW5jdGlvbihleGVjKXsgZXhlYyhlbXB0eSwgZW1wdHkpOyB9O1xuICAgIC8vIHVuaGFuZGxlZCByZWplY3Rpb25zIHRyYWNraW5nIHN1cHBvcnQsIE5vZGVKUyBQcm9taXNlIHdpdGhvdXQgaXQgZmFpbHMgQEBzcGVjaWVzIHRlc3RcbiAgICByZXR1cm4gKGlzTm9kZSB8fCB0eXBlb2YgUHJvbWlzZVJlamVjdGlvbkV2ZW50ID09ICdmdW5jdGlvbicpICYmIHByb21pc2UudGhlbihlbXB0eSkgaW5zdGFuY2VvZiBGYWtlUHJvbWlzZTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxufSgpO1xuXG4vLyBoZWxwZXJzXG52YXIgc2FtZUNvbnN0cnVjdG9yID0gZnVuY3Rpb24oYSwgYil7XG4gIC8vIHdpdGggbGlicmFyeSB3cmFwcGVyIHNwZWNpYWwgY2FzZVxuICByZXR1cm4gYSA9PT0gYiB8fCBhID09PSAkUHJvbWlzZSAmJiBiID09PSBXcmFwcGVyO1xufTtcbnZhciBpc1RoZW5hYmxlID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgdGhlbjtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiB0eXBlb2YgKHRoZW4gPSBpdC50aGVuKSA9PSAnZnVuY3Rpb24nID8gdGhlbiA6IGZhbHNlO1xufTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uKEMpe1xuICByZXR1cm4gc2FtZUNvbnN0cnVjdG9yKCRQcm9taXNlLCBDKVxuICAgID8gbmV3IFByb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgOiBuZXcgR2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5KEMpO1xufTtcbnZhciBQcm9taXNlQ2FwYWJpbGl0eSA9IEdlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uKEMpe1xuICB2YXIgcmVzb2x2ZSwgcmVqZWN0O1xuICB0aGlzLnByb21pc2UgPSBuZXcgQyhmdW5jdGlvbigkJHJlc29sdmUsICQkcmVqZWN0KXtcbiAgICBpZihyZXNvbHZlICE9PSB1bmRlZmluZWQgfHwgcmVqZWN0ICE9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKCdCYWQgUHJvbWlzZSBjb25zdHJ1Y3RvcicpO1xuICAgIHJlc29sdmUgPSAkJHJlc29sdmU7XG4gICAgcmVqZWN0ICA9ICQkcmVqZWN0O1xuICB9KTtcbiAgdGhpcy5yZXNvbHZlID0gYUZ1bmN0aW9uKHJlc29sdmUpO1xuICB0aGlzLnJlamVjdCAgPSBhRnVuY3Rpb24ocmVqZWN0KTtcbn07XG52YXIgcGVyZm9ybSA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIGV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4ge2Vycm9yOiBlfTtcbiAgfVxufTtcbnZhciBub3RpZnkgPSBmdW5jdGlvbihwcm9taXNlLCBpc1JlamVjdCl7XG4gIGlmKHByb21pc2UuX24pcmV0dXJuO1xuICBwcm9taXNlLl9uID0gdHJ1ZTtcbiAgdmFyIGNoYWluID0gcHJvbWlzZS5fYztcbiAgbWljcm90YXNrKGZ1bmN0aW9uKCl7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdlxuICAgICAgLCBvayAgICA9IHByb21pc2UuX3MgPT0gMVxuICAgICAgLCBpICAgICA9IDA7XG4gICAgdmFyIHJ1biA9IGZ1bmN0aW9uKHJlYWN0aW9uKXtcbiAgICAgIHZhciBoYW5kbGVyID0gb2sgPyByZWFjdGlvbi5vayA6IHJlYWN0aW9uLmZhaWxcbiAgICAgICAgLCByZXNvbHZlID0gcmVhY3Rpb24ucmVzb2x2ZVxuICAgICAgICAsIHJlamVjdCAgPSByZWFjdGlvbi5yZWplY3RcbiAgICAgICAgLCBkb21haW4gID0gcmVhY3Rpb24uZG9tYWluXG4gICAgICAgICwgcmVzdWx0LCB0aGVuO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYoaGFuZGxlcil7XG4gICAgICAgICAgaWYoIW9rKXtcbiAgICAgICAgICAgIGlmKHByb21pc2UuX2ggPT0gMilvbkhhbmRsZVVuaGFuZGxlZChwcm9taXNlKTtcbiAgICAgICAgICAgIHByb21pc2UuX2ggPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZihoYW5kbGVyID09PSB0cnVlKXJlc3VsdCA9IHZhbHVlO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYoZG9tYWluKWRvbWFpbi5lbnRlcigpO1xuICAgICAgICAgICAgcmVzdWx0ID0gaGFuZGxlcih2YWx1ZSk7XG4gICAgICAgICAgICBpZihkb21haW4pZG9tYWluLmV4aXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYocmVzdWx0ID09PSByZWFjdGlvbi5wcm9taXNlKXtcbiAgICAgICAgICAgIHJlamVjdChUeXBlRXJyb3IoJ1Byb21pc2UtY2hhaW4gY3ljbGUnKSk7XG4gICAgICAgICAgfSBlbHNlIGlmKHRoZW4gPSBpc1RoZW5hYmxlKHJlc3VsdCkpe1xuICAgICAgICAgICAgdGhlbi5jYWxsKHJlc3VsdCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9IGVsc2UgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2UgcmVqZWN0KHZhbHVlKTtcbiAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHJlamVjdChlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdoaWxlKGNoYWluLmxlbmd0aCA+IGkpcnVuKGNoYWluW2krK10pOyAvLyB2YXJpYWJsZSBsZW5ndGggLSBjYW4ndCB1c2UgZm9yRWFjaFxuICAgIHByb21pc2UuX2MgPSBbXTtcbiAgICBwcm9taXNlLl9uID0gZmFsc2U7XG4gICAgaWYoaXNSZWplY3QgJiYgIXByb21pc2UuX2gpb25VbmhhbmRsZWQocHJvbWlzZSk7XG4gIH0pO1xufTtcbnZhciBvblVuaGFuZGxlZCA9IGZ1bmN0aW9uKHByb21pc2Upe1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbigpe1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3ZcbiAgICAgICwgYWJydXB0LCBoYW5kbGVyLCBjb25zb2xlO1xuICAgIGlmKGlzVW5oYW5kbGVkKHByb21pc2UpKXtcbiAgICAgIGFicnVwdCA9IHBlcmZvcm0oZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoaXNOb2RlKXtcbiAgICAgICAgICBwcm9jZXNzLmVtaXQoJ3VuaGFuZGxlZFJlamVjdGlvbicsIHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgfSBlbHNlIGlmKGhhbmRsZXIgPSBnbG9iYWwub251bmhhbmRsZWRyZWplY3Rpb24pe1xuICAgICAgICAgIGhhbmRsZXIoe3Byb21pc2U6IHByb21pc2UsIHJlYXNvbjogdmFsdWV9KTtcbiAgICAgICAgfSBlbHNlIGlmKChjb25zb2xlID0gZ2xvYmFsLmNvbnNvbGUpICYmIGNvbnNvbGUuZXJyb3Ipe1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBCcm93c2VycyBzaG91bGQgbm90IHRyaWdnZXIgYHJlamVjdGlvbkhhbmRsZWRgIGV2ZW50IGlmIGl0IHdhcyBoYW5kbGVkIGhlcmUsIE5vZGVKUyAtIHNob3VsZFxuICAgICAgcHJvbWlzZS5faCA9IGlzTm9kZSB8fCBpc1VuaGFuZGxlZChwcm9taXNlKSA/IDIgOiAxO1xuICAgIH0gcHJvbWlzZS5fYSA9IHVuZGVmaW5lZDtcbiAgICBpZihhYnJ1cHQpdGhyb3cgYWJydXB0LmVycm9yO1xuICB9KTtcbn07XG52YXIgaXNVbmhhbmRsZWQgPSBmdW5jdGlvbihwcm9taXNlKXtcbiAgaWYocHJvbWlzZS5faCA9PSAxKXJldHVybiBmYWxzZTtcbiAgdmFyIGNoYWluID0gcHJvbWlzZS5fYSB8fCBwcm9taXNlLl9jXG4gICAgLCBpICAgICA9IDBcbiAgICAsIHJlYWN0aW9uO1xuICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXtcbiAgICByZWFjdGlvbiA9IGNoYWluW2krK107XG4gICAgaWYocmVhY3Rpb24uZmFpbCB8fCAhaXNVbmhhbmRsZWQocmVhY3Rpb24ucHJvbWlzZSkpcmV0dXJuIGZhbHNlO1xuICB9IHJldHVybiB0cnVlO1xufTtcbnZhciBvbkhhbmRsZVVuaGFuZGxlZCA9IGZ1bmN0aW9uKHByb21pc2Upe1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbigpe1xuICAgIHZhciBoYW5kbGVyO1xuICAgIGlmKGlzTm9kZSl7XG4gICAgICBwcm9jZXNzLmVtaXQoJ3JlamVjdGlvbkhhbmRsZWQnLCBwcm9taXNlKTtcbiAgICB9IGVsc2UgaWYoaGFuZGxlciA9IGdsb2JhbC5vbnJlamVjdGlvbmhhbmRsZWQpe1xuICAgICAgaGFuZGxlcih7cHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiBwcm9taXNlLl92fSk7XG4gICAgfVxuICB9KTtcbn07XG52YXIgJHJlamVjdCA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICBpZihwcm9taXNlLl9kKXJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICBwcm9taXNlLl92ID0gdmFsdWU7XG4gIHByb21pc2UuX3MgPSAyO1xuICBpZighcHJvbWlzZS5fYSlwcm9taXNlLl9hID0gcHJvbWlzZS5fYy5zbGljZSgpO1xuICBub3RpZnkocHJvbWlzZSwgdHJ1ZSk7XG59O1xudmFyICRyZXNvbHZlID0gZnVuY3Rpb24odmFsdWUpe1xuICB2YXIgcHJvbWlzZSA9IHRoaXNcbiAgICAsIHRoZW47XG4gIGlmKHByb21pc2UuX2QpcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHRyeSB7XG4gICAgaWYocHJvbWlzZSA9PT0gdmFsdWUpdGhyb3cgVHlwZUVycm9yKFwiUHJvbWlzZSBjYW4ndCBiZSByZXNvbHZlZCBpdHNlbGZcIik7XG4gICAgaWYodGhlbiA9IGlzVGhlbmFibGUodmFsdWUpKXtcbiAgICAgIG1pY3JvdGFzayhmdW5jdGlvbigpe1xuICAgICAgICB2YXIgd3JhcHBlciA9IHtfdzogcHJvbWlzZSwgX2Q6IGZhbHNlfTsgLy8gd3JhcFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgY3R4KCRyZXNvbHZlLCB3cmFwcGVyLCAxKSwgY3R4KCRyZWplY3QsIHdyYXBwZXIsIDEpKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAkcmVqZWN0LmNhbGwod3JhcHBlciwgZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9taXNlLl92ID0gdmFsdWU7XG4gICAgICBwcm9taXNlLl9zID0gMTtcbiAgICAgIG5vdGlmeShwcm9taXNlLCBmYWxzZSk7XG4gICAgfVxuICB9IGNhdGNoKGUpe1xuICAgICRyZWplY3QuY2FsbCh7X3c6IHByb21pc2UsIF9kOiBmYWxzZX0sIGUpOyAvLyB3cmFwXG4gIH1cbn07XG5cbi8vIGNvbnN0cnVjdG9yIHBvbHlmaWxsXG5pZighVVNFX05BVElWRSl7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gICRQcm9taXNlID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcil7XG4gICAgYW5JbnN0YW5jZSh0aGlzLCAkUHJvbWlzZSwgUFJPTUlTRSwgJ19oJyk7XG4gICAgYUZ1bmN0aW9uKGV4ZWN1dG9yKTtcbiAgICBJbnRlcm5hbC5jYWxsKHRoaXMpO1xuICAgIHRyeSB7XG4gICAgICBleGVjdXRvcihjdHgoJHJlc29sdmUsIHRoaXMsIDEpLCBjdHgoJHJlamVjdCwgdGhpcywgMSkpO1xuICAgIH0gY2F0Y2goZXJyKXtcbiAgICAgICRyZWplY3QuY2FsbCh0aGlzLCBlcnIpO1xuICAgIH1cbiAgfTtcbiAgSW50ZXJuYWwgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKXtcbiAgICB0aGlzLl9jID0gW107ICAgICAgICAgICAgIC8vIDwtIGF3YWl0aW5nIHJlYWN0aW9uc1xuICAgIHRoaXMuX2EgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICB0aGlzLl9zID0gMDsgICAgICAgICAgICAgIC8vIDwtIHN0YXRlXG4gICAgdGhpcy5fZCA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBkb25lXG4gICAgdGhpcy5fdiA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSB2YWx1ZVxuICAgIHRoaXMuX2ggPSAwOyAgICAgICAgICAgICAgLy8gPC0gcmVqZWN0aW9uIHN0YXRlLCAwIC0gZGVmYXVsdCwgMSAtIGhhbmRsZWQsIDIgLSB1bmhhbmRsZWRcbiAgICB0aGlzLl9uID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIG5vdGlmeVxuICB9O1xuICBJbnRlcm5hbC5wcm90b3R5cGUgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKSgkUHJvbWlzZS5wcm90b3R5cGUsIHtcbiAgICAvLyAyNS40LjUuMyBQcm9taXNlLnByb3RvdHlwZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuICAgIHRoZW46IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpe1xuICAgICAgdmFyIHJlYWN0aW9uICAgID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsICRQcm9taXNlKSk7XG4gICAgICByZWFjdGlvbi5vayAgICAgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZTtcbiAgICAgIHJlYWN0aW9uLmZhaWwgICA9IHR5cGVvZiBvblJlamVjdGVkID09ICdmdW5jdGlvbicgJiYgb25SZWplY3RlZDtcbiAgICAgIHJlYWN0aW9uLmRvbWFpbiA9IGlzTm9kZSA/IHByb2Nlc3MuZG9tYWluIDogdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fYy5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmKHRoaXMuX2EpdGhpcy5fYS5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmKHRoaXMuX3Mpbm90aWZ5KHRoaXMsIGZhbHNlKTtcbiAgICAgIHJldHVybiByZWFjdGlvbi5wcm9taXNlO1xuICAgIH0sXG4gICAgLy8gMjUuNC41LjEgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2gob25SZWplY3RlZClcbiAgICAnY2F0Y2gnOiBmdW5jdGlvbihvblJlamVjdGVkKXtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH0pO1xuICBQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIHByb21pc2UgID0gbmV3IEludGVybmFsO1xuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gICAgdGhpcy5yZXNvbHZlID0gY3R4KCRyZXNvbHZlLCBwcm9taXNlLCAxKTtcbiAgICB0aGlzLnJlamVjdCAgPSBjdHgoJHJlamVjdCwgcHJvbWlzZSwgMSk7XG4gIH07XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHtQcm9taXNlOiAkUHJvbWlzZX0pO1xucmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKSgkUHJvbWlzZSwgUFJPTUlTRSk7XG5yZXF1aXJlKCcuL19zZXQtc3BlY2llcycpKFBST01JU0UpO1xuV3JhcHBlciA9IHJlcXVpcmUoJy4vX2NvcmUnKVtQUk9NSVNFXTtcblxuLy8gc3RhdGljc1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNSBQcm9taXNlLnJlamVjdChyKVxuICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChyKXtcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHRoaXMpXG4gICAgICAsICQkcmVqZWN0ICAgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICAkJHJlamVjdChyKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKExJQlJBUlkgfHwgIVVTRV9OQVRJVkUpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC42IFByb21pc2UucmVzb2x2ZSh4KVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpe1xuICAgIC8vIGluc3RhbmNlb2YgaW5zdGVhZCBvZiBpbnRlcm5hbCBzbG90IGNoZWNrIGJlY2F1c2Ugd2Ugc2hvdWxkIGZpeCBpdCB3aXRob3V0IHJlcGxhY2VtZW50IG5hdGl2ZSBQcm9taXNlIGNvcmVcbiAgICBpZih4IGluc3RhbmNlb2YgJFByb21pc2UgJiYgc2FtZUNvbnN0cnVjdG9yKHguY29uc3RydWN0b3IsIHRoaXMpKXJldHVybiB4O1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcylcbiAgICAgICwgJCRyZXNvbHZlICA9IGNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgICAkJHJlc29sdmUoeCk7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEoVVNFX05BVElWRSAmJiByZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uKGl0ZXIpe1xuICAkUHJvbWlzZS5hbGwoaXRlcilbJ2NhdGNoJ10oZW1wdHkpO1xufSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC4xIFByb21pc2UuYWxsKGl0ZXJhYmxlKVxuICBhbGw6IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSl7XG4gICAgdmFyIEMgICAgICAgICAgPSB0aGlzXG4gICAgICAsIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgICAgLCByZXNvbHZlICAgID0gY2FwYWJpbGl0eS5yZXNvbHZlXG4gICAgICAsIHJlamVjdCAgICAgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgYWJydXB0ID0gcGVyZm9ybShmdW5jdGlvbigpe1xuICAgICAgdmFyIHZhbHVlcyAgICA9IFtdXG4gICAgICAgICwgaW5kZXggICAgID0gMFxuICAgICAgICAsIHJlbWFpbmluZyA9IDE7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uKHByb21pc2Upe1xuICAgICAgICB2YXIgJGluZGV4ICAgICAgICA9IGluZGV4KytcbiAgICAgICAgICAsIGFscmVhZHlDYWxsZWQgPSBmYWxzZTtcbiAgICAgICAgdmFsdWVzLnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgcmVtYWluaW5nKys7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICBpZihhbHJlYWR5Q2FsbGVkKXJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkICA9IHRydWU7XG4gICAgICAgICAgdmFsdWVzWyRpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICB9KTtcbiAgICBpZihhYnJ1cHQpcmVqZWN0KGFicnVwdC5lcnJvcik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfSxcbiAgLy8gMjUuNC40LjQgUHJvbWlzZS5yYWNlKGl0ZXJhYmxlKVxuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKXtcbiAgICB2YXIgQyAgICAgICAgICA9IHRoaXNcbiAgICAgICwgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICAsIHJlamVjdCAgICAgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgYWJydXB0ID0gcGVyZm9ybShmdW5jdGlvbigpe1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbihwcm9taXNlKXtcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oY2FwYWJpbGl0eS5yZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYoYWJydXB0KXJlamVjdChhYnJ1cHQuZXJyb3IpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciBkUCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBjcmVhdGUgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIHJlZGVmaW5lQWxsID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJylcbiAgLCBjdHggICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgYW5JbnN0YW5jZSAgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpXG4gICwgZGVmaW5lZCAgICAgPSByZXF1aXJlKCcuL19kZWZpbmVkJylcbiAgLCBmb3JPZiAgICAgICA9IHJlcXVpcmUoJy4vX2Zvci1vZicpXG4gICwgJGl0ZXJEZWZpbmUgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpXG4gICwgc3RlcCAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKVxuICAsIHNldFNwZWNpZXMgID0gcmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKVxuICAsIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsIGZhc3RLZXkgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpLmZhc3RLZXlcbiAgLCBTSVpFICAgICAgICA9IERFU0NSSVBUT1JTID8gJ19zJyA6ICdzaXplJztcblxudmFyIGdldEVudHJ5ID0gZnVuY3Rpb24odGhhdCwga2V5KXtcbiAgLy8gZmFzdCBjYXNlXG4gIHZhciBpbmRleCA9IGZhc3RLZXkoa2V5KSwgZW50cnk7XG4gIGlmKGluZGV4ICE9PSAnRicpcmV0dXJuIHRoYXQuX2lbaW5kZXhdO1xuICAvLyBmcm96ZW4gb2JqZWN0IGNhc2VcbiAgZm9yKGVudHJ5ID0gdGhhdC5fZjsgZW50cnk7IGVudHJ5ID0gZW50cnkubil7XG4gICAgaWYoZW50cnkuayA9PSBrZXkpcmV0dXJuIGVudHJ5O1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q29uc3RydWN0b3I6IGZ1bmN0aW9uKHdyYXBwZXIsIE5BTUUsIElTX01BUCwgQURERVIpe1xuICAgIHZhciBDID0gd3JhcHBlcihmdW5jdGlvbih0aGF0LCBpdGVyYWJsZSl7XG4gICAgICBhbkluc3RhbmNlKHRoYXQsIEMsIE5BTUUsICdfaScpO1xuICAgICAgdGhhdC5faSA9IGNyZWF0ZShudWxsKTsgLy8gaW5kZXhcbiAgICAgIHRoYXQuX2YgPSB1bmRlZmluZWQ7ICAgIC8vIGZpcnN0IGVudHJ5XG4gICAgICB0aGF0Ll9sID0gdW5kZWZpbmVkOyAgICAvLyBsYXN0IGVudHJ5XG4gICAgICB0aGF0W1NJWkVdID0gMDsgICAgICAgICAvLyBzaXplXG4gICAgICBpZihpdGVyYWJsZSAhPSB1bmRlZmluZWQpZm9yT2YoaXRlcmFibGUsIElTX01BUCwgdGhhdFtBRERFUl0sIHRoYXQpO1xuICAgIH0pO1xuICAgIHJlZGVmaW5lQWxsKEMucHJvdG90eXBlLCB7XG4gICAgICAvLyAyMy4xLjMuMSBNYXAucHJvdG90eXBlLmNsZWFyKClcbiAgICAgIC8vIDIzLjIuMy4yIFNldC5wcm90b3R5cGUuY2xlYXIoKVxuICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCl7XG4gICAgICAgIGZvcih2YXIgdGhhdCA9IHRoaXMsIGRhdGEgPSB0aGF0Ll9pLCBlbnRyeSA9IHRoYXQuX2Y7IGVudHJ5OyBlbnRyeSA9IGVudHJ5Lm4pe1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmKGVudHJ5LnApZW50cnkucCA9IGVudHJ5LnAubiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBkZWxldGUgZGF0YVtlbnRyeS5pXTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0Ll9mID0gdGhhdC5fbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhhdFtTSVpFXSA9IDA7XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjMgTWFwLnByb3RvdHlwZS5kZWxldGUoa2V5KVxuICAgICAgLy8gMjMuMi4zLjQgU2V0LnByb3RvdHlwZS5kZWxldGUodmFsdWUpXG4gICAgICAnZGVsZXRlJzogZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgdmFyIHRoYXQgID0gdGhpc1xuICAgICAgICAgICwgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpO1xuICAgICAgICBpZihlbnRyeSl7XG4gICAgICAgICAgdmFyIG5leHQgPSBlbnRyeS5uXG4gICAgICAgICAgICAsIHByZXYgPSBlbnRyeS5wO1xuICAgICAgICAgIGRlbGV0ZSB0aGF0Ll9pW2VudHJ5LmldO1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmKHByZXYpcHJldi5uID0gbmV4dDtcbiAgICAgICAgICBpZihuZXh0KW5leHQucCA9IHByZXY7XG4gICAgICAgICAgaWYodGhhdC5fZiA9PSBlbnRyeSl0aGF0Ll9mID0gbmV4dDtcbiAgICAgICAgICBpZih0aGF0Ll9sID09IGVudHJ5KXRoYXQuX2wgPSBwcmV2O1xuICAgICAgICAgIHRoYXRbU0laRV0tLTtcbiAgICAgICAgfSByZXR1cm4gISFlbnRyeTtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4yLjMuNiBTZXQucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgICAgIC8vIDIzLjEuMy41IE1hcC5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICAgICAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICAgICAgYW5JbnN0YW5jZSh0aGlzLCBDLCAnZm9yRWFjaCcpO1xuICAgICAgICB2YXIgZiA9IGN0eChjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgMylcbiAgICAgICAgICAsIGVudHJ5O1xuICAgICAgICB3aGlsZShlbnRyeSA9IGVudHJ5ID8gZW50cnkubiA6IHRoaXMuX2Ype1xuICAgICAgICAgIGYoZW50cnkudiwgZW50cnkuaywgdGhpcyk7XG4gICAgICAgICAgLy8gcmV2ZXJ0IHRvIHRoZSBsYXN0IGV4aXN0aW5nIGVudHJ5XG4gICAgICAgICAgd2hpbGUoZW50cnkgJiYgZW50cnkucillbnRyeSA9IGVudHJ5LnA7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvLyAyMy4xLjMuNyBNYXAucHJvdG90eXBlLmhhcyhrZXkpXG4gICAgICAvLyAyMy4yLjMuNyBTZXQucHJvdG90eXBlLmhhcyh2YWx1ZSlcbiAgICAgIGhhczogZnVuY3Rpb24gaGFzKGtleSl7XG4gICAgICAgIHJldHVybiAhIWdldEVudHJ5KHRoaXMsIGtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYoREVTQ1JJUFRPUlMpZFAoQy5wcm90b3R5cGUsICdzaXplJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gZGVmaW5lZCh0aGlzW1NJWkVdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gQztcbiAgfSxcbiAgZGVmOiBmdW5jdGlvbih0aGF0LCBrZXksIHZhbHVlKXtcbiAgICB2YXIgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpXG4gICAgICAsIHByZXYsIGluZGV4O1xuICAgIC8vIGNoYW5nZSBleGlzdGluZyBlbnRyeVxuICAgIGlmKGVudHJ5KXtcbiAgICAgIGVudHJ5LnYgPSB2YWx1ZTtcbiAgICAvLyBjcmVhdGUgbmV3IGVudHJ5XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoYXQuX2wgPSBlbnRyeSA9IHtcbiAgICAgICAgaTogaW5kZXggPSBmYXN0S2V5KGtleSwgdHJ1ZSksIC8vIDwtIGluZGV4XG4gICAgICAgIGs6IGtleSwgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBrZXlcbiAgICAgICAgdjogdmFsdWUsICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIHZhbHVlXG4gICAgICAgIHA6IHByZXYgPSB0aGF0Ll9sLCAgICAgICAgICAgICAvLyA8LSBwcmV2aW91cyBlbnRyeVxuICAgICAgICBuOiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgLy8gPC0gbmV4dCBlbnRyeVxuICAgICAgICByOiBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gcmVtb3ZlZFxuICAgICAgfTtcbiAgICAgIGlmKCF0aGF0Ll9mKXRoYXQuX2YgPSBlbnRyeTtcbiAgICAgIGlmKHByZXYpcHJldi5uID0gZW50cnk7XG4gICAgICB0aGF0W1NJWkVdKys7XG4gICAgICAvLyBhZGQgdG8gaW5kZXhcbiAgICAgIGlmKGluZGV4ICE9PSAnRicpdGhhdC5faVtpbmRleF0gPSBlbnRyeTtcbiAgICB9IHJldHVybiB0aGF0O1xuICB9LFxuICBnZXRFbnRyeTogZ2V0RW50cnksXG4gIHNldFN0cm9uZzogZnVuY3Rpb24oQywgTkFNRSwgSVNfTUFQKXtcbiAgICAvLyBhZGQgLmtleXMsIC52YWx1ZXMsIC5lbnRyaWVzLCBbQEBpdGVyYXRvcl1cbiAgICAvLyAyMy4xLjMuNCwgMjMuMS4zLjgsIDIzLjEuMy4xMSwgMjMuMS4zLjEyLCAyMy4yLjMuNSwgMjMuMi4zLjgsIDIzLjIuMy4xMCwgMjMuMi4zLjExXG4gICAgJGl0ZXJEZWZpbmUoQywgTkFNRSwgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICAgICAgdGhpcy5fdCA9IGl0ZXJhdGVkOyAgLy8gdGFyZ2V0XG4gICAgICB0aGlzLl9rID0ga2luZDsgICAgICAvLyBraW5kXG4gICAgICB0aGlzLl9sID0gdW5kZWZpbmVkOyAvLyBwcmV2aW91c1xuICAgIH0sIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgdGhhdCAgPSB0aGlzXG4gICAgICAgICwga2luZCAgPSB0aGF0Ll9rXG4gICAgICAgICwgZW50cnkgPSB0aGF0Ll9sO1xuICAgICAgLy8gcmV2ZXJ0IHRvIHRoZSBsYXN0IGV4aXN0aW5nIGVudHJ5XG4gICAgICB3aGlsZShlbnRyeSAmJiBlbnRyeS5yKWVudHJ5ID0gZW50cnkucDtcbiAgICAgIC8vIGdldCBuZXh0IGVudHJ5XG4gICAgICBpZighdGhhdC5fdCB8fCAhKHRoYXQuX2wgPSBlbnRyeSA9IGVudHJ5ID8gZW50cnkubiA6IHRoYXQuX3QuX2YpKXtcbiAgICAgICAgLy8gb3IgZmluaXNoIHRoZSBpdGVyYXRpb25cbiAgICAgICAgdGhhdC5fdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIHN0ZXAoMSk7XG4gICAgICB9XG4gICAgICAvLyByZXR1cm4gc3RlcCBieSBraW5kXG4gICAgICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGVudHJ5LmspO1xuICAgICAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBlbnRyeS52KTtcbiAgICAgIHJldHVybiBzdGVwKDAsIFtlbnRyeS5rLCBlbnRyeS52XSk7XG4gICAgfSwgSVNfTUFQID8gJ2VudHJpZXMnIDogJ3ZhbHVlcycgLCAhSVNfTUFQLCB0cnVlKTtcblxuICAgIC8vIGFkZCBbQEBzcGVjaWVzXSwgMjMuMS4yLjIsIDIzLjIuMi4yXG4gICAgc2V0U3BlY2llcyhOQU1FKTtcbiAgfVxufTsiLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsICAgICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsICRleHBvcnQgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCByZWRlZmluZUFsbCAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpXG4gICwgbWV0YSAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhJylcbiAgLCBmb3JPZiAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2Zvci1vZicpXG4gICwgYW5JbnN0YW5jZSAgICAgICAgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpXG4gICwgaXNPYmplY3QgICAgICAgICAgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGZhaWxzICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAsICRpdGVyRGV0ZWN0ICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKVxuICAsIHNldFRvU3RyaW5nVGFnICAgID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIGluaGVyaXRJZlJlcXVpcmVkID0gcmVxdWlyZSgnLi9faW5oZXJpdC1pZi1yZXF1aXJlZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE5BTUUsIHdyYXBwZXIsIG1ldGhvZHMsIGNvbW1vbiwgSVNfTUFQLCBJU19XRUFLKXtcbiAgdmFyIEJhc2UgID0gZ2xvYmFsW05BTUVdXG4gICAgLCBDICAgICA9IEJhc2VcbiAgICAsIEFEREVSID0gSVNfTUFQID8gJ3NldCcgOiAnYWRkJ1xuICAgICwgcHJvdG8gPSBDICYmIEMucHJvdG90eXBlXG4gICAgLCBPICAgICA9IHt9O1xuICB2YXIgZml4TWV0aG9kID0gZnVuY3Rpb24oS0VZKXtcbiAgICB2YXIgZm4gPSBwcm90b1tLRVldO1xuICAgIHJlZGVmaW5lKHByb3RvLCBLRVksXG4gICAgICBLRVkgPT0gJ2RlbGV0ZScgPyBmdW5jdGlvbihhKXtcbiAgICAgICAgcmV0dXJuIElTX1dFQUsgJiYgIWlzT2JqZWN0KGEpID8gZmFsc2UgOiBmbi5jYWxsKHRoaXMsIGEgPT09IDAgPyAwIDogYSk7XG4gICAgICB9IDogS0VZID09ICdoYXMnID8gZnVuY3Rpb24gaGFzKGEpe1xuICAgICAgICByZXR1cm4gSVNfV0VBSyAmJiAhaXNPYmplY3QoYSkgPyBmYWxzZSA6IGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhKTtcbiAgICAgIH0gOiBLRVkgPT0gJ2dldCcgPyBmdW5jdGlvbiBnZXQoYSl7XG4gICAgICAgIHJldHVybiBJU19XRUFLICYmICFpc09iamVjdChhKSA/IHVuZGVmaW5lZCA6IGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhKTtcbiAgICAgIH0gOiBLRVkgPT0gJ2FkZCcgPyBmdW5jdGlvbiBhZGQoYSl7IGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhKTsgcmV0dXJuIHRoaXM7IH1cbiAgICAgICAgOiBmdW5jdGlvbiBzZXQoYSwgYil7IGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhLCBiKTsgcmV0dXJuIHRoaXM7IH1cbiAgICApO1xuICB9O1xuICBpZih0eXBlb2YgQyAhPSAnZnVuY3Rpb24nIHx8ICEoSVNfV0VBSyB8fCBwcm90by5mb3JFYWNoICYmICFmYWlscyhmdW5jdGlvbigpe1xuICAgIG5ldyBDKCkuZW50cmllcygpLm5leHQoKTtcbiAgfSkpKXtcbiAgICAvLyBjcmVhdGUgY29sbGVjdGlvbiBjb25zdHJ1Y3RvclxuICAgIEMgPSBjb21tb24uZ2V0Q29uc3RydWN0b3Iod3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUik7XG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIG1ldGhvZHMpO1xuICAgIG1ldGEuTkVFRCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGluc3RhbmNlICAgICAgICAgICAgID0gbmV3IENcbiAgICAgIC8vIGVhcmx5IGltcGxlbWVudGF0aW9ucyBub3Qgc3VwcG9ydHMgY2hhaW5pbmdcbiAgICAgICwgSEFTTlRfQ0hBSU5JTkcgICAgICAgPSBpbnN0YW5jZVtBRERFUl0oSVNfV0VBSyA/IHt9IDogLTAsIDEpICE9IGluc3RhbmNlXG4gICAgICAvLyBWOCB+ICBDaHJvbWl1bSA0MC0gd2Vhay1jb2xsZWN0aW9ucyB0aHJvd3Mgb24gcHJpbWl0aXZlcywgYnV0IHNob3VsZCByZXR1cm4gZmFsc2VcbiAgICAgICwgVEhST1dTX09OX1BSSU1JVElWRVMgPSBmYWlscyhmdW5jdGlvbigpeyBpbnN0YW5jZS5oYXMoMSk7IH0pXG4gICAgICAvLyBtb3N0IGVhcmx5IGltcGxlbWVudGF0aW9ucyBkb2Vzbid0IHN1cHBvcnRzIGl0ZXJhYmxlcywgbW9zdCBtb2Rlcm4gLSBub3QgY2xvc2UgaXQgY29ycmVjdGx5XG4gICAgICAsIEFDQ0VQVF9JVEVSQUJMRVMgICAgID0gJGl0ZXJEZXRlY3QoZnVuY3Rpb24oaXRlcil7IG5ldyBDKGl0ZXIpOyB9KSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgICAgLy8gZm9yIGVhcmx5IGltcGxlbWVudGF0aW9ucyAtMCBhbmQgKzAgbm90IHRoZSBzYW1lXG4gICAgICAsIEJVR0dZX1pFUk8gPSAhSVNfV0VBSyAmJiBmYWlscyhmdW5jdGlvbigpe1xuICAgICAgICAvLyBWOCB+IENocm9taXVtIDQyLSBmYWlscyBvbmx5IHdpdGggNSsgZWxlbWVudHNcbiAgICAgICAgdmFyICRpbnN0YW5jZSA9IG5ldyBDKClcbiAgICAgICAgICAsIGluZGV4ICAgICA9IDU7XG4gICAgICAgIHdoaWxlKGluZGV4LS0pJGluc3RhbmNlW0FEREVSXShpbmRleCwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gISRpbnN0YW5jZS5oYXMoLTApO1xuICAgICAgfSk7XG4gICAgaWYoIUFDQ0VQVF9JVEVSQUJMRVMpeyBcbiAgICAgIEMgPSB3cmFwcGVyKGZ1bmN0aW9uKHRhcmdldCwgaXRlcmFibGUpe1xuICAgICAgICBhbkluc3RhbmNlKHRhcmdldCwgQywgTkFNRSk7XG4gICAgICAgIHZhciB0aGF0ID0gaW5oZXJpdElmUmVxdWlyZWQobmV3IEJhc2UsIHRhcmdldCwgQyk7XG4gICAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGF0W0FEREVSXSwgdGhhdCk7XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgICAgfSk7XG4gICAgICBDLnByb3RvdHlwZSA9IHByb3RvO1xuICAgICAgcHJvdG8uY29uc3RydWN0b3IgPSBDO1xuICAgIH1cbiAgICBpZihUSFJPV1NfT05fUFJJTUlUSVZFUyB8fCBCVUdHWV9aRVJPKXtcbiAgICAgIGZpeE1ldGhvZCgnZGVsZXRlJyk7XG4gICAgICBmaXhNZXRob2QoJ2hhcycpO1xuICAgICAgSVNfTUFQICYmIGZpeE1ldGhvZCgnZ2V0Jyk7XG4gICAgfVxuICAgIGlmKEJVR0dZX1pFUk8gfHwgSEFTTlRfQ0hBSU5JTkcpZml4TWV0aG9kKEFEREVSKTtcbiAgICAvLyB3ZWFrIGNvbGxlY3Rpb25zIHNob3VsZCBub3QgY29udGFpbnMgLmNsZWFyIG1ldGhvZFxuICAgIGlmKElTX1dFQUsgJiYgcHJvdG8uY2xlYXIpZGVsZXRlIHByb3RvLmNsZWFyO1xuICB9XG5cbiAgc2V0VG9TdHJpbmdUYWcoQywgTkFNRSk7XG5cbiAgT1tOQU1FXSA9IEM7XG4gICRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogKEMgIT0gQmFzZSksIE8pO1xuXG4gIGlmKCFJU19XRUFLKWNvbW1vbi5zZXRTdHJvbmcoQywgTkFNRSwgSVNfTUFQKTtcblxuICByZXR1cm4gQztcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHN0cm9uZyA9IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24tc3Ryb25nJyk7XG5cbi8vIDIzLjEgTWFwIE9iamVjdHNcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbicpKCdNYXAnLCBmdW5jdGlvbihnZXQpe1xuICByZXR1cm4gZnVuY3Rpb24gTWFwKCl7IHJldHVybiBnZXQodGhpcywgYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpOyB9O1xufSwge1xuICAvLyAyMy4xLjMuNiBNYXAucHJvdG90eXBlLmdldChrZXkpXG4gIGdldDogZnVuY3Rpb24gZ2V0KGtleSl7XG4gICAgdmFyIGVudHJ5ID0gc3Ryb25nLmdldEVudHJ5KHRoaXMsIGtleSk7XG4gICAgcmV0dXJuIGVudHJ5ICYmIGVudHJ5LnY7XG4gIH0sXG4gIC8vIDIzLjEuMy45IE1hcC5wcm90b3R5cGUuc2V0KGtleSwgdmFsdWUpXG4gIHNldDogZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpe1xuICAgIHJldHVybiBzdHJvbmcuZGVmKHRoaXMsIGtleSA9PT0gMCA/IDAgOiBrZXksIHZhbHVlKTtcbiAgfVxufSwgc3Ryb25nLCB0cnVlKTsiLCIndXNlIHN0cmljdCc7XG52YXIgc3Ryb25nID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbi1zdHJvbmcnKTtcblxuLy8gMjMuMiBTZXQgT2JqZWN0c1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb2xsZWN0aW9uJykoJ1NldCcsIGZ1bmN0aW9uKGdldCl7XG4gIHJldHVybiBmdW5jdGlvbiBTZXQoKXsgcmV0dXJuIGdldCh0aGlzLCBhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7IH07XG59LCB7XG4gIC8vIDIzLjIuMy4xIFNldC5wcm90b3R5cGUuYWRkKHZhbHVlKVxuICBhZGQ6IGZ1bmN0aW9uIGFkZCh2YWx1ZSl7XG4gICAgcmV0dXJuIHN0cm9uZy5kZWYodGhpcywgdmFsdWUgPSB2YWx1ZSA9PT0gMCA/IDAgOiB2YWx1ZSwgdmFsdWUpO1xuICB9XG59LCBzdHJvbmcpOyIsIid1c2Ugc3RyaWN0JztcbnZhciByZWRlZmluZUFsbCAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpXG4gICwgZ2V0V2VhayAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhJykuZ2V0V2Vha1xuICAsIGFuT2JqZWN0ICAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBpc09iamVjdCAgICAgICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgYW5JbnN0YW5jZSAgICAgICAgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpXG4gICwgZm9yT2YgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19mb3Itb2YnKVxuICAsIGNyZWF0ZUFycmF5TWV0aG9kID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpXG4gICwgJGhhcyAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIGFycmF5RmluZCAgICAgICAgID0gY3JlYXRlQXJyYXlNZXRob2QoNSlcbiAgLCBhcnJheUZpbmRJbmRleCAgICA9IGNyZWF0ZUFycmF5TWV0aG9kKDYpXG4gICwgaWQgICAgICAgICAgICAgICAgPSAwO1xuXG4vLyBmYWxsYmFjayBmb3IgdW5jYXVnaHQgZnJvemVuIGtleXNcbnZhciB1bmNhdWdodEZyb3plblN0b3JlID0gZnVuY3Rpb24odGhhdCl7XG4gIHJldHVybiB0aGF0Ll9sIHx8ICh0aGF0Ll9sID0gbmV3IFVuY2F1Z2h0RnJvemVuU3RvcmUpO1xufTtcbnZhciBVbmNhdWdodEZyb3plblN0b3JlID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5hID0gW107XG59O1xudmFyIGZpbmRVbmNhdWdodEZyb3plbiA9IGZ1bmN0aW9uKHN0b3JlLCBrZXkpe1xuICByZXR1cm4gYXJyYXlGaW5kKHN0b3JlLmEsIGZ1bmN0aW9uKGl0KXtcbiAgICByZXR1cm4gaXRbMF0gPT09IGtleTtcbiAgfSk7XG59O1xuVW5jYXVnaHRGcm96ZW5TdG9yZS5wcm90b3R5cGUgPSB7XG4gIGdldDogZnVuY3Rpb24oa2V5KXtcbiAgICB2YXIgZW50cnkgPSBmaW5kVW5jYXVnaHRGcm96ZW4odGhpcywga2V5KTtcbiAgICBpZihlbnRyeSlyZXR1cm4gZW50cnlbMV07XG4gIH0sXG4gIGhhczogZnVuY3Rpb24oa2V5KXtcbiAgICByZXR1cm4gISFmaW5kVW5jYXVnaHRGcm96ZW4odGhpcywga2V5KTtcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihrZXksIHZhbHVlKXtcbiAgICB2YXIgZW50cnkgPSBmaW5kVW5jYXVnaHRGcm96ZW4odGhpcywga2V5KTtcbiAgICBpZihlbnRyeSllbnRyeVsxXSA9IHZhbHVlO1xuICAgIGVsc2UgdGhpcy5hLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSxcbiAgJ2RlbGV0ZSc6IGZ1bmN0aW9uKGtleSl7XG4gICAgdmFyIGluZGV4ID0gYXJyYXlGaW5kSW5kZXgodGhpcy5hLCBmdW5jdGlvbihpdCl7XG4gICAgICByZXR1cm4gaXRbMF0gPT09IGtleTtcbiAgICB9KTtcbiAgICBpZih+aW5kZXgpdGhpcy5hLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuICEhfmluZGV4O1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q29uc3RydWN0b3I6IGZ1bmN0aW9uKHdyYXBwZXIsIE5BTUUsIElTX01BUCwgQURERVIpe1xuICAgIHZhciBDID0gd3JhcHBlcihmdW5jdGlvbih0aGF0LCBpdGVyYWJsZSl7XG4gICAgICBhbkluc3RhbmNlKHRoYXQsIEMsIE5BTUUsICdfaScpO1xuICAgICAgdGhhdC5faSA9IGlkKys7ICAgICAgLy8gY29sbGVjdGlvbiBpZFxuICAgICAgdGhhdC5fbCA9IHVuZGVmaW5lZDsgLy8gbGVhayBzdG9yZSBmb3IgdW5jYXVnaHQgZnJvemVuIG9iamVjdHNcbiAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGF0W0FEREVSXSwgdGhhdCk7XG4gICAgfSk7XG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIHtcbiAgICAgIC8vIDIzLjMuMy4yIFdlYWtNYXAucHJvdG90eXBlLmRlbGV0ZShrZXkpXG4gICAgICAvLyAyMy40LjMuMyBXZWFrU2V0LnByb3RvdHlwZS5kZWxldGUodmFsdWUpXG4gICAgICAnZGVsZXRlJzogZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgaWYoIWlzT2JqZWN0KGtleSkpcmV0dXJuIGZhbHNlO1xuICAgICAgICB2YXIgZGF0YSA9IGdldFdlYWsoa2V5KTtcbiAgICAgICAgaWYoZGF0YSA9PT0gdHJ1ZSlyZXR1cm4gdW5jYXVnaHRGcm96ZW5TdG9yZSh0aGlzKVsnZGVsZXRlJ10oa2V5KTtcbiAgICAgICAgcmV0dXJuIGRhdGEgJiYgJGhhcyhkYXRhLCB0aGlzLl9pKSAmJiBkZWxldGUgZGF0YVt0aGlzLl9pXTtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4zLjMuNCBXZWFrTWFwLnByb3RvdHlwZS5oYXMoa2V5KVxuICAgICAgLy8gMjMuNC4zLjQgV2Vha1NldC5wcm90b3R5cGUuaGFzKHZhbHVlKVxuICAgICAgaGFzOiBmdW5jdGlvbiBoYXMoa2V5KXtcbiAgICAgICAgaWYoIWlzT2JqZWN0KGtleSkpcmV0dXJuIGZhbHNlO1xuICAgICAgICB2YXIgZGF0YSA9IGdldFdlYWsoa2V5KTtcbiAgICAgICAgaWYoZGF0YSA9PT0gdHJ1ZSlyZXR1cm4gdW5jYXVnaHRGcm96ZW5TdG9yZSh0aGlzKS5oYXMoa2V5KTtcbiAgICAgICAgcmV0dXJuIGRhdGEgJiYgJGhhcyhkYXRhLCB0aGlzLl9pKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gQztcbiAgfSxcbiAgZGVmOiBmdW5jdGlvbih0aGF0LCBrZXksIHZhbHVlKXtcbiAgICB2YXIgZGF0YSA9IGdldFdlYWsoYW5PYmplY3Qoa2V5KSwgdHJ1ZSk7XG4gICAgaWYoZGF0YSA9PT0gdHJ1ZSl1bmNhdWdodEZyb3plblN0b3JlKHRoYXQpLnNldChrZXksIHZhbHVlKTtcbiAgICBlbHNlIGRhdGFbdGhhdC5faV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdGhhdDtcbiAgfSxcbiAgdWZzdG9yZTogdW5jYXVnaHRGcm96ZW5TdG9yZVxufTsiLCIndXNlIHN0cmljdCc7XG52YXIgZWFjaCAgICAgICAgID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpKDApXG4gICwgcmVkZWZpbmUgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIG1ldGEgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKVxuICAsIGFzc2lnbiAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKVxuICAsIHdlYWsgICAgICAgICA9IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24td2VhaycpXG4gICwgaXNPYmplY3QgICAgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBnZXRXZWFrICAgICAgPSBtZXRhLmdldFdlYWtcbiAgLCBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlXG4gICwgdW5jYXVnaHRGcm96ZW5TdG9yZSA9IHdlYWsudWZzdG9yZVxuICAsIHRtcCAgICAgICAgICA9IHt9XG4gICwgSW50ZXJuYWxNYXA7XG5cbnZhciB3cmFwcGVyID0gZnVuY3Rpb24oZ2V0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIFdlYWtNYXAoKXtcbiAgICByZXR1cm4gZ2V0KHRoaXMsIGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTtcbiAgfTtcbn07XG5cbnZhciBtZXRob2RzID0ge1xuICAvLyAyMy4zLjMuMyBXZWFrTWFwLnByb3RvdHlwZS5nZXQoa2V5KVxuICBnZXQ6IGZ1bmN0aW9uIGdldChrZXkpe1xuICAgIGlmKGlzT2JqZWN0KGtleSkpe1xuICAgICAgdmFyIGRhdGEgPSBnZXRXZWFrKGtleSk7XG4gICAgICBpZihkYXRhID09PSB0cnVlKXJldHVybiB1bmNhdWdodEZyb3plblN0b3JlKHRoaXMpLmdldChrZXkpO1xuICAgICAgcmV0dXJuIGRhdGEgPyBkYXRhW3RoaXMuX2ldIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgfSxcbiAgLy8gMjMuMy4zLjUgV2Vha01hcC5wcm90b3R5cGUuc2V0KGtleSwgdmFsdWUpXG4gIHNldDogZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpe1xuICAgIHJldHVybiB3ZWFrLmRlZih0aGlzLCBrZXksIHZhbHVlKTtcbiAgfVxufTtcblxuLy8gMjMuMyBXZWFrTWFwIE9iamVjdHNcbnZhciAkV2Vha01hcCA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbicpKCdXZWFrTWFwJywgd3JhcHBlciwgbWV0aG9kcywgd2VhaywgdHJ1ZSwgdHJ1ZSk7XG5cbi8vIElFMTEgV2Vha01hcCBmcm96ZW4ga2V5cyBmaXhcbmlmKG5ldyAkV2Vha01hcCgpLnNldCgoT2JqZWN0LmZyZWV6ZSB8fCBPYmplY3QpKHRtcCksIDcpLmdldCh0bXApICE9IDcpe1xuICBJbnRlcm5hbE1hcCA9IHdlYWsuZ2V0Q29uc3RydWN0b3Iod3JhcHBlcik7XG4gIGFzc2lnbihJbnRlcm5hbE1hcC5wcm90b3R5cGUsIG1ldGhvZHMpO1xuICBtZXRhLk5FRUQgPSB0cnVlO1xuICBlYWNoKFsnZGVsZXRlJywgJ2hhcycsICdnZXQnLCAnc2V0J10sIGZ1bmN0aW9uKGtleSl7XG4gICAgdmFyIHByb3RvICA9ICRXZWFrTWFwLnByb3RvdHlwZVxuICAgICAgLCBtZXRob2QgPSBwcm90b1trZXldO1xuICAgIHJlZGVmaW5lKHByb3RvLCBrZXksIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgLy8gc3RvcmUgZnJvemVuIG9iamVjdHMgb24gaW50ZXJuYWwgd2Vha21hcCBzaGltXG4gICAgICBpZihpc09iamVjdChhKSAmJiAhaXNFeHRlbnNpYmxlKGEpKXtcbiAgICAgICAgaWYoIXRoaXMuX2YpdGhpcy5fZiA9IG5ldyBJbnRlcm5hbE1hcDtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX2Zba2V5XShhLCBiKTtcbiAgICAgICAgcmV0dXJuIGtleSA9PSAnc2V0JyA/IHRoaXMgOiByZXN1bHQ7XG4gICAgICAvLyBzdG9yZSBhbGwgdGhlIHJlc3Qgb24gbmF0aXZlIHdlYWttYXBcbiAgICAgIH0gcmV0dXJuIG1ldGhvZC5jYWxsKHRoaXMsIGEsIGIpO1xuICAgIH0pO1xuICB9KTtcbn0iLCIndXNlIHN0cmljdCc7XG52YXIgd2VhayA9IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24td2VhaycpO1xuXG4vLyAyMy40IFdlYWtTZXQgT2JqZWN0c1xucmVxdWlyZSgnLi9fY29sbGVjdGlvbicpKCdXZWFrU2V0JywgZnVuY3Rpb24oZ2V0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIFdlYWtTZXQoKXsgcmV0dXJuIGdldCh0aGlzLCBhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7IH07XG59LCB7XG4gIC8vIDIzLjQuMy4xIFdlYWtTZXQucHJvdG90eXBlLmFkZCh2YWx1ZSlcbiAgYWRkOiBmdW5jdGlvbiBhZGQodmFsdWUpe1xuICAgIHJldHVybiB3ZWFrLmRlZih0aGlzLCB2YWx1ZSwgdHJ1ZSk7XG4gIH1cbn0sIHdlYWssIGZhbHNlLCB0cnVlKTsiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoaWRlICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCB1aWQgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIFRZUEVEICA9IHVpZCgndHlwZWRfYXJyYXknKVxuICAsIFZJRVcgICA9IHVpZCgndmlldycpXG4gICwgQUJWICAgID0gISEoZ2xvYmFsLkFycmF5QnVmZmVyICYmIGdsb2JhbC5EYXRhVmlldylcbiAgLCBDT05TVFIgPSBBQlZcbiAgLCBpID0gMCwgbCA9IDksIFR5cGVkO1xuXG52YXIgVHlwZWRBcnJheUNvbnN0cnVjdG9ycyA9IChcbiAgJ0ludDhBcnJheSxVaW50OEFycmF5LFVpbnQ4Q2xhbXBlZEFycmF5LEludDE2QXJyYXksVWludDE2QXJyYXksSW50MzJBcnJheSxVaW50MzJBcnJheSxGbG9hdDMyQXJyYXksRmxvYXQ2NEFycmF5J1xuKS5zcGxpdCgnLCcpO1xuXG53aGlsZShpIDwgbCl7XG4gIGlmKFR5cGVkID0gZ2xvYmFsW1R5cGVkQXJyYXlDb25zdHJ1Y3RvcnNbaSsrXV0pe1xuICAgIGhpZGUoVHlwZWQucHJvdG90eXBlLCBUWVBFRCwgdHJ1ZSk7XG4gICAgaGlkZShUeXBlZC5wcm90b3R5cGUsIFZJRVcsIHRydWUpO1xuICB9IGVsc2UgQ09OU1RSID0gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBBQlY6ICAgIEFCVixcbiAgQ09OU1RSOiBDT05TVFIsXG4gIFRZUEVEOiAgVFlQRUQsXG4gIFZJRVc6ICAgVklFV1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIERFU0NSSVBUT1JTICAgID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsIExJQlJBUlkgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICwgJHR5cGVkICAgICAgICAgPSByZXF1aXJlKCcuL190eXBlZCcpXG4gICwgaGlkZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCByZWRlZmluZUFsbCAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpXG4gICwgZmFpbHMgICAgICAgICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICwgYW5JbnN0YW5jZSAgICAgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpXG4gICwgdG9JbnRlZ2VyICAgICAgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCB0b0xlbmd0aCAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgZ09QTiAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmZcbiAgLCBkUCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBhcnJheUZpbGwgICAgICA9IHJlcXVpcmUoJy4vX2FycmF5LWZpbGwnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIEFSUkFZX0JVRkZFUiAgID0gJ0FycmF5QnVmZmVyJ1xuICAsIERBVEFfVklFVyAgICAgID0gJ0RhdGFWaWV3J1xuICAsIFBST1RPVFlQRSAgICAgID0gJ3Byb3RvdHlwZSdcbiAgLCBXUk9OR19MRU5HVEggICA9ICdXcm9uZyBsZW5ndGghJ1xuICAsIFdST05HX0lOREVYICAgID0gJ1dyb25nIGluZGV4ISdcbiAgLCAkQXJyYXlCdWZmZXIgICA9IGdsb2JhbFtBUlJBWV9CVUZGRVJdXG4gICwgJERhdGFWaWV3ICAgICAgPSBnbG9iYWxbREFUQV9WSUVXXVxuICAsIE1hdGggICAgICAgICAgID0gZ2xvYmFsLk1hdGhcbiAgLCBSYW5nZUVycm9yICAgICA9IGdsb2JhbC5SYW5nZUVycm9yXG4gICwgSW5maW5pdHkgICAgICAgPSBnbG9iYWwuSW5maW5pdHlcbiAgLCBCYXNlQnVmZmVyICAgICA9ICRBcnJheUJ1ZmZlclxuICAsIGFicyAgICAgICAgICAgID0gTWF0aC5hYnNcbiAgLCBwb3cgICAgICAgICAgICA9IE1hdGgucG93XG4gICwgZmxvb3IgICAgICAgICAgPSBNYXRoLmZsb29yXG4gICwgbG9nICAgICAgICAgICAgPSBNYXRoLmxvZ1xuICAsIExOMiAgICAgICAgICAgID0gTWF0aC5MTjJcbiAgLCBCVUZGRVIgICAgICAgICA9ICdidWZmZXInXG4gICwgQllURV9MRU5HVEggICAgPSAnYnl0ZUxlbmd0aCdcbiAgLCBCWVRFX09GRlNFVCAgICA9ICdieXRlT2Zmc2V0J1xuICAsICRCVUZGRVIgICAgICAgID0gREVTQ1JJUFRPUlMgPyAnX2InIDogQlVGRkVSXG4gICwgJExFTkdUSCAgICAgICAgPSBERVNDUklQVE9SUyA/ICdfbCcgOiBCWVRFX0xFTkdUSFxuICAsICRPRkZTRVQgICAgICAgID0gREVTQ1JJUFRPUlMgPyAnX28nIDogQllURV9PRkZTRVQ7XG5cbi8vIElFRUU3NTQgY29udmVyc2lvbnMgYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9pZWVlNzU0XG52YXIgcGFja0lFRUU3NTQgPSBmdW5jdGlvbih2YWx1ZSwgbUxlbiwgbkJ5dGVzKXtcbiAgdmFyIGJ1ZmZlciA9IEFycmF5KG5CeXRlcylcbiAgICAsIGVMZW4gICA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMVxuICAgICwgZU1heCAgID0gKDEgPDwgZUxlbikgLSAxXG4gICAgLCBlQmlhcyAgPSBlTWF4ID4+IDFcbiAgICAsIHJ0ICAgICA9IG1MZW4gPT09IDIzID8gcG93KDIsIC0yNCkgLSBwb3coMiwgLTc3KSA6IDBcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIHMgICAgICA9IHZhbHVlIDwgMCB8fCB2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwID8gMSA6IDBcbiAgICAsIGUsIG0sIGM7XG4gIHZhbHVlID0gYWJzKHZhbHVlKVxuICBpZih2YWx1ZSAhPSB2YWx1ZSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpe1xuICAgIG0gPSB2YWx1ZSAhPSB2YWx1ZSA/IDEgOiAwO1xuICAgIGUgPSBlTWF4O1xuICB9IGVsc2Uge1xuICAgIGUgPSBmbG9vcihsb2codmFsdWUpIC8gTE4yKTtcbiAgICBpZih2YWx1ZSAqIChjID0gcG93KDIsIC1lKSkgPCAxKXtcbiAgICAgIGUtLTtcbiAgICAgIGMgKj0gMjtcbiAgICB9XG4gICAgaWYoZSArIGVCaWFzID49IDEpe1xuICAgICAgdmFsdWUgKz0gcnQgLyBjO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIHBvdygyLCAxIC0gZUJpYXMpO1xuICAgIH1cbiAgICBpZih2YWx1ZSAqIGMgPj0gMil7XG4gICAgICBlKys7XG4gICAgICBjIC89IDI7XG4gICAgfVxuICAgIGlmKGUgKyBlQmlhcyA+PSBlTWF4KXtcbiAgICAgIG0gPSAwO1xuICAgICAgZSA9IGVNYXg7XG4gICAgfSBlbHNlIGlmKGUgKyBlQmlhcyA+PSAxKXtcbiAgICAgIG0gPSAodmFsdWUgKiBjIC0gMSkgKiBwb3coMiwgbUxlbik7XG4gICAgICBlID0gZSArIGVCaWFzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBwb3coMiwgZUJpYXMgLSAxKSAqIHBvdygyLCBtTGVuKTtcbiAgICAgIGUgPSAwO1xuICAgIH1cbiAgfVxuICBmb3IoOyBtTGVuID49IDg7IGJ1ZmZlcltpKytdID0gbSAmIDI1NSwgbSAvPSAyNTYsIG1MZW4gLT0gOCk7XG4gIGUgPSBlIDw8IG1MZW4gfCBtO1xuICBlTGVuICs9IG1MZW47XG4gIGZvcig7IGVMZW4gPiAwOyBidWZmZXJbaSsrXSA9IGUgJiAyNTUsIGUgLz0gMjU2LCBlTGVuIC09IDgpO1xuICBidWZmZXJbLS1pXSB8PSBzICogMTI4O1xuICByZXR1cm4gYnVmZmVyO1xufTtcbnZhciB1bnBhY2tJRUVFNzU0ID0gZnVuY3Rpb24oYnVmZmVyLCBtTGVuLCBuQnl0ZXMpe1xuICB2YXIgZUxlbiAgPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDFcbiAgICAsIGVNYXggID0gKDEgPDwgZUxlbikgLSAxXG4gICAgLCBlQmlhcyA9IGVNYXggPj4gMVxuICAgICwgbkJpdHMgPSBlTGVuIC0gN1xuICAgICwgaSAgICAgPSBuQnl0ZXMgLSAxXG4gICAgLCBzICAgICA9IGJ1ZmZlcltpLS1dXG4gICAgLCBlICAgICA9IHMgJiAxMjdcbiAgICAsIG07XG4gIHMgPj49IDc7XG4gIGZvcig7IG5CaXRzID4gMDsgZSA9IGUgKiAyNTYgKyBidWZmZXJbaV0sIGktLSwgbkJpdHMgLT0gOCk7XG4gIG0gPSBlICYgKDEgPDwgLW5CaXRzKSAtIDE7XG4gIGUgPj49IC1uQml0cztcbiAgbkJpdHMgKz0gbUxlbjtcbiAgZm9yKDsgbkJpdHMgPiAwOyBtID0gbSAqIDI1NiArIGJ1ZmZlcltpXSwgaS0tLCBuQml0cyAtPSA4KTtcbiAgaWYoZSA9PT0gMCl7XG4gICAgZSA9IDEgLSBlQmlhcztcbiAgfSBlbHNlIGlmKGUgPT09IGVNYXgpe1xuICAgIHJldHVybiBtID8gTmFOIDogcyA/IC1JbmZpbml0eSA6IEluZmluaXR5O1xuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgcG93KDIsIG1MZW4pO1xuICAgIGUgPSBlIC0gZUJpYXM7XG4gIH0gcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBwb3coMiwgZSAtIG1MZW4pO1xufTtcblxudmFyIHVucGFja0kzMiA9IGZ1bmN0aW9uKGJ5dGVzKXtcbiAgcmV0dXJuIGJ5dGVzWzNdIDw8IDI0IHwgYnl0ZXNbMl0gPDwgMTYgfCBieXRlc1sxXSA8PCA4IHwgYnl0ZXNbMF07XG59O1xudmFyIHBhY2tJOCA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIFtpdCAmIDB4ZmZdO1xufTtcbnZhciBwYWNrSTE2ID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gW2l0ICYgMHhmZiwgaXQgPj4gOCAmIDB4ZmZdO1xufTtcbnZhciBwYWNrSTMyID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gW2l0ICYgMHhmZiwgaXQgPj4gOCAmIDB4ZmYsIGl0ID4+IDE2ICYgMHhmZiwgaXQgPj4gMjQgJiAweGZmXTtcbn07XG52YXIgcGFja0Y2NCA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHBhY2tJRUVFNzU0KGl0LCA1MiwgOCk7XG59O1xudmFyIHBhY2tGMzIgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBwYWNrSUVFRTc1NChpdCwgMjMsIDQpO1xufTtcblxudmFyIGFkZEdldHRlciA9IGZ1bmN0aW9uKEMsIGtleSwgaW50ZXJuYWwpe1xuICBkUChDW1BST1RPVFlQRV0sIGtleSwge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXNbaW50ZXJuYWxdOyB9fSk7XG59O1xuXG52YXIgZ2V0ID0gZnVuY3Rpb24odmlldywgYnl0ZXMsIGluZGV4LCBpc0xpdHRsZUVuZGlhbil7XG4gIHZhciBudW1JbmRleCA9ICtpbmRleFxuICAgICwgaW50SW5kZXggPSB0b0ludGVnZXIobnVtSW5kZXgpO1xuICBpZihudW1JbmRleCAhPSBpbnRJbmRleCB8fCBpbnRJbmRleCA8IDAgfHwgaW50SW5kZXggKyBieXRlcyA+IHZpZXdbJExFTkdUSF0pdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19JTkRFWCk7XG4gIHZhciBzdG9yZSA9IHZpZXdbJEJVRkZFUl0uX2JcbiAgICAsIHN0YXJ0ID0gaW50SW5kZXggKyB2aWV3WyRPRkZTRVRdXG4gICAgLCBwYWNrICA9IHN0b3JlLnNsaWNlKHN0YXJ0LCBzdGFydCArIGJ5dGVzKTtcbiAgcmV0dXJuIGlzTGl0dGxlRW5kaWFuID8gcGFjayA6IHBhY2sucmV2ZXJzZSgpO1xufTtcbnZhciBzZXQgPSBmdW5jdGlvbih2aWV3LCBieXRlcywgaW5kZXgsIGNvbnZlcnNpb24sIHZhbHVlLCBpc0xpdHRsZUVuZGlhbil7XG4gIHZhciBudW1JbmRleCA9ICtpbmRleFxuICAgICwgaW50SW5kZXggPSB0b0ludGVnZXIobnVtSW5kZXgpO1xuICBpZihudW1JbmRleCAhPSBpbnRJbmRleCB8fCBpbnRJbmRleCA8IDAgfHwgaW50SW5kZXggKyBieXRlcyA+IHZpZXdbJExFTkdUSF0pdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19JTkRFWCk7XG4gIHZhciBzdG9yZSA9IHZpZXdbJEJVRkZFUl0uX2JcbiAgICAsIHN0YXJ0ID0gaW50SW5kZXggKyB2aWV3WyRPRkZTRVRdXG4gICAgLCBwYWNrICA9IGNvbnZlcnNpb24oK3ZhbHVlKTtcbiAgZm9yKHZhciBpID0gMDsgaSA8IGJ5dGVzOyBpKyspc3RvcmVbc3RhcnQgKyBpXSA9IHBhY2tbaXNMaXR0bGVFbmRpYW4gPyBpIDogYnl0ZXMgLSBpIC0gMV07XG59O1xuXG52YXIgdmFsaWRhdGVBcnJheUJ1ZmZlckFyZ3VtZW50cyA9IGZ1bmN0aW9uKHRoYXQsIGxlbmd0aCl7XG4gIGFuSW5zdGFuY2UodGhhdCwgJEFycmF5QnVmZmVyLCBBUlJBWV9CVUZGRVIpO1xuICB2YXIgbnVtYmVyTGVuZ3RoID0gK2xlbmd0aFxuICAgICwgYnl0ZUxlbmd0aCAgID0gdG9MZW5ndGgobnVtYmVyTGVuZ3RoKTtcbiAgaWYobnVtYmVyTGVuZ3RoICE9IGJ5dGVMZW5ndGgpdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19MRU5HVEgpO1xuICByZXR1cm4gYnl0ZUxlbmd0aDtcbn07XG5cbmlmKCEkdHlwZWQuQUJWKXtcbiAgJEFycmF5QnVmZmVyID0gZnVuY3Rpb24gQXJyYXlCdWZmZXIobGVuZ3RoKXtcbiAgICB2YXIgYnl0ZUxlbmd0aCA9IHZhbGlkYXRlQXJyYXlCdWZmZXJBcmd1bWVudHModGhpcywgbGVuZ3RoKTtcbiAgICB0aGlzLl9iICAgICAgID0gYXJyYXlGaWxsLmNhbGwoQXJyYXkoYnl0ZUxlbmd0aCksIDApO1xuICAgIHRoaXNbJExFTkdUSF0gPSBieXRlTGVuZ3RoO1xuICB9O1xuXG4gICREYXRhVmlldyA9IGZ1bmN0aW9uIERhdGFWaWV3KGJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCl7XG4gICAgYW5JbnN0YW5jZSh0aGlzLCAkRGF0YVZpZXcsIERBVEFfVklFVyk7XG4gICAgYW5JbnN0YW5jZShidWZmZXIsICRBcnJheUJ1ZmZlciwgREFUQV9WSUVXKTtcbiAgICB2YXIgYnVmZmVyTGVuZ3RoID0gYnVmZmVyWyRMRU5HVEhdXG4gICAgICAsIG9mZnNldCAgICAgICA9IHRvSW50ZWdlcihieXRlT2Zmc2V0KTtcbiAgICBpZihvZmZzZXQgPCAwIHx8IG9mZnNldCA+IGJ1ZmZlckxlbmd0aCl0aHJvdyBSYW5nZUVycm9yKCdXcm9uZyBvZmZzZXQhJyk7XG4gICAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPT09IHVuZGVmaW5lZCA/IGJ1ZmZlckxlbmd0aCAtIG9mZnNldCA6IHRvTGVuZ3RoKGJ5dGVMZW5ndGgpO1xuICAgIGlmKG9mZnNldCArIGJ5dGVMZW5ndGggPiBidWZmZXJMZW5ndGgpdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19MRU5HVEgpO1xuICAgIHRoaXNbJEJVRkZFUl0gPSBidWZmZXI7XG4gICAgdGhpc1skT0ZGU0VUXSA9IG9mZnNldDtcbiAgICB0aGlzWyRMRU5HVEhdID0gYnl0ZUxlbmd0aDtcbiAgfTtcblxuICBpZihERVNDUklQVE9SUyl7XG4gICAgYWRkR2V0dGVyKCRBcnJheUJ1ZmZlciwgQllURV9MRU5HVEgsICdfbCcpO1xuICAgIGFkZEdldHRlcigkRGF0YVZpZXcsIEJVRkZFUiwgJ19iJyk7XG4gICAgYWRkR2V0dGVyKCREYXRhVmlldywgQllURV9MRU5HVEgsICdfbCcpO1xuICAgIGFkZEdldHRlcigkRGF0YVZpZXcsIEJZVEVfT0ZGU0VULCAnX28nKTtcbiAgfVxuXG4gIHJlZGVmaW5lQWxsKCREYXRhVmlld1tQUk9UT1RZUEVdLCB7XG4gICAgZ2V0SW50ODogZnVuY3Rpb24gZ2V0SW50OChieXRlT2Zmc2V0KXtcbiAgICAgIHJldHVybiBnZXQodGhpcywgMSwgYnl0ZU9mZnNldClbMF0gPDwgMjQgPj4gMjQ7XG4gICAgfSxcbiAgICBnZXRVaW50ODogZnVuY3Rpb24gZ2V0VWludDgoYnl0ZU9mZnNldCl7XG4gICAgICByZXR1cm4gZ2V0KHRoaXMsIDEsIGJ5dGVPZmZzZXQpWzBdO1xuICAgIH0sXG4gICAgZ2V0SW50MTY6IGZ1bmN0aW9uIGdldEludDE2KGJ5dGVPZmZzZXQgLyosIGxpdHRsZUVuZGlhbiAqLyl7XG4gICAgICB2YXIgYnl0ZXMgPSBnZXQodGhpcywgMiwgYnl0ZU9mZnNldCwgYXJndW1lbnRzWzFdKTtcbiAgICAgIHJldHVybiAoYnl0ZXNbMV0gPDwgOCB8IGJ5dGVzWzBdKSA8PCAxNiA+PiAxNjtcbiAgICB9LFxuICAgIGdldFVpbnQxNjogZnVuY3Rpb24gZ2V0VWludDE2KGJ5dGVPZmZzZXQgLyosIGxpdHRsZUVuZGlhbiAqLyl7XG4gICAgICB2YXIgYnl0ZXMgPSBnZXQodGhpcywgMiwgYnl0ZU9mZnNldCwgYXJndW1lbnRzWzFdKTtcbiAgICAgIHJldHVybiBieXRlc1sxXSA8PCA4IHwgYnl0ZXNbMF07XG4gICAgfSxcbiAgICBnZXRJbnQzMjogZnVuY3Rpb24gZ2V0SW50MzIoYnl0ZU9mZnNldCAvKiwgbGl0dGxlRW5kaWFuICovKXtcbiAgICAgIHJldHVybiB1bnBhY2tJMzIoZ2V0KHRoaXMsIDQsIGJ5dGVPZmZzZXQsIGFyZ3VtZW50c1sxXSkpO1xuICAgIH0sXG4gICAgZ2V0VWludDMyOiBmdW5jdGlvbiBnZXRVaW50MzIoYnl0ZU9mZnNldCAvKiwgbGl0dGxlRW5kaWFuICovKXtcbiAgICAgIHJldHVybiB1bnBhY2tJMzIoZ2V0KHRoaXMsIDQsIGJ5dGVPZmZzZXQsIGFyZ3VtZW50c1sxXSkpID4+PiAwO1xuICAgIH0sXG4gICAgZ2V0RmxvYXQzMjogZnVuY3Rpb24gZ2V0RmxvYXQzMihieXRlT2Zmc2V0IC8qLCBsaXR0bGVFbmRpYW4gKi8pe1xuICAgICAgcmV0dXJuIHVucGFja0lFRUU3NTQoZ2V0KHRoaXMsIDQsIGJ5dGVPZmZzZXQsIGFyZ3VtZW50c1sxXSksIDIzLCA0KTtcbiAgICB9LFxuICAgIGdldEZsb2F0NjQ6IGZ1bmN0aW9uIGdldEZsb2F0NjQoYnl0ZU9mZnNldCAvKiwgbGl0dGxlRW5kaWFuICovKXtcbiAgICAgIHJldHVybiB1bnBhY2tJRUVFNzU0KGdldCh0aGlzLCA4LCBieXRlT2Zmc2V0LCBhcmd1bWVudHNbMV0pLCA1MiwgOCk7XG4gICAgfSxcbiAgICBzZXRJbnQ4OiBmdW5jdGlvbiBzZXRJbnQ4KGJ5dGVPZmZzZXQsIHZhbHVlKXtcbiAgICAgIHNldCh0aGlzLCAxLCBieXRlT2Zmc2V0LCBwYWNrSTgsIHZhbHVlKTtcbiAgICB9LFxuICAgIHNldFVpbnQ4OiBmdW5jdGlvbiBzZXRVaW50OChieXRlT2Zmc2V0LCB2YWx1ZSl7XG4gICAgICBzZXQodGhpcywgMSwgYnl0ZU9mZnNldCwgcGFja0k4LCB2YWx1ZSk7XG4gICAgfSxcbiAgICBzZXRJbnQxNjogZnVuY3Rpb24gc2V0SW50MTYoYnl0ZU9mZnNldCwgdmFsdWUgLyosIGxpdHRsZUVuZGlhbiAqLyl7XG4gICAgICBzZXQodGhpcywgMiwgYnl0ZU9mZnNldCwgcGFja0kxNiwgdmFsdWUsIGFyZ3VtZW50c1syXSk7XG4gICAgfSxcbiAgICBzZXRVaW50MTY6IGZ1bmN0aW9uIHNldFVpbnQxNihieXRlT2Zmc2V0LCB2YWx1ZSAvKiwgbGl0dGxlRW5kaWFuICovKXtcbiAgICAgIHNldCh0aGlzLCAyLCBieXRlT2Zmc2V0LCBwYWNrSTE2LCB2YWx1ZSwgYXJndW1lbnRzWzJdKTtcbiAgICB9LFxuICAgIHNldEludDMyOiBmdW5jdGlvbiBzZXRJbnQzMihieXRlT2Zmc2V0LCB2YWx1ZSAvKiwgbGl0dGxlRW5kaWFuICovKXtcbiAgICAgIHNldCh0aGlzLCA0LCBieXRlT2Zmc2V0LCBwYWNrSTMyLCB2YWx1ZSwgYXJndW1lbnRzWzJdKTtcbiAgICB9LFxuICAgIHNldFVpbnQzMjogZnVuY3Rpb24gc2V0VWludDMyKGJ5dGVPZmZzZXQsIHZhbHVlIC8qLCBsaXR0bGVFbmRpYW4gKi8pe1xuICAgICAgc2V0KHRoaXMsIDQsIGJ5dGVPZmZzZXQsIHBhY2tJMzIsIHZhbHVlLCBhcmd1bWVudHNbMl0pO1xuICAgIH0sXG4gICAgc2V0RmxvYXQzMjogZnVuY3Rpb24gc2V0RmxvYXQzMihieXRlT2Zmc2V0LCB2YWx1ZSAvKiwgbGl0dGxlRW5kaWFuICovKXtcbiAgICAgIHNldCh0aGlzLCA0LCBieXRlT2Zmc2V0LCBwYWNrRjMyLCB2YWx1ZSwgYXJndW1lbnRzWzJdKTtcbiAgICB9LFxuICAgIHNldEZsb2F0NjQ6IGZ1bmN0aW9uIHNldEZsb2F0NjQoYnl0ZU9mZnNldCwgdmFsdWUgLyosIGxpdHRsZUVuZGlhbiAqLyl7XG4gICAgICBzZXQodGhpcywgOCwgYnl0ZU9mZnNldCwgcGFja0Y2NCwgdmFsdWUsIGFyZ3VtZW50c1syXSk7XG4gICAgfVxuICB9KTtcbn0gZWxzZSB7XG4gIGlmKCFmYWlscyhmdW5jdGlvbigpe1xuICAgIG5ldyAkQXJyYXlCdWZmZXI7ICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICB9KSB8fCAhZmFpbHMoZnVuY3Rpb24oKXtcbiAgICBuZXcgJEFycmF5QnVmZmVyKC41KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgfSkpe1xuICAgICRBcnJheUJ1ZmZlciA9IGZ1bmN0aW9uIEFycmF5QnVmZmVyKGxlbmd0aCl7XG4gICAgICByZXR1cm4gbmV3IEJhc2VCdWZmZXIodmFsaWRhdGVBcnJheUJ1ZmZlckFyZ3VtZW50cyh0aGlzLCBsZW5ndGgpKTtcbiAgICB9O1xuICAgIHZhciBBcnJheUJ1ZmZlclByb3RvID0gJEFycmF5QnVmZmVyW1BST1RPVFlQRV0gPSBCYXNlQnVmZmVyW1BST1RPVFlQRV07XG4gICAgZm9yKHZhciBrZXlzID0gZ09QTihCYXNlQnVmZmVyKSwgaiA9IDAsIGtleTsga2V5cy5sZW5ndGggPiBqOyApe1xuICAgICAgaWYoISgoa2V5ID0ga2V5c1tqKytdKSBpbiAkQXJyYXlCdWZmZXIpKWhpZGUoJEFycmF5QnVmZmVyLCBrZXksIEJhc2VCdWZmZXJba2V5XSk7XG4gICAgfTtcbiAgICBpZighTElCUkFSWSlBcnJheUJ1ZmZlclByb3RvLmNvbnN0cnVjdG9yID0gJEFycmF5QnVmZmVyO1xuICB9XG4gIC8vIGlPUyBTYWZhcmkgNy54IGJ1Z1xuICB2YXIgdmlldyA9IG5ldyAkRGF0YVZpZXcobmV3ICRBcnJheUJ1ZmZlcigyKSlcbiAgICAsICRzZXRJbnQ4ID0gJERhdGFWaWV3W1BST1RPVFlQRV0uc2V0SW50ODtcbiAgdmlldy5zZXRJbnQ4KDAsIDIxNDc0ODM2NDgpO1xuICB2aWV3LnNldEludDgoMSwgMjE0NzQ4MzY0OSk7XG4gIGlmKHZpZXcuZ2V0SW50OCgwKSB8fCAhdmlldy5nZXRJbnQ4KDEpKXJlZGVmaW5lQWxsKCREYXRhVmlld1tQUk9UT1RZUEVdLCB7XG4gICAgc2V0SW50ODogZnVuY3Rpb24gc2V0SW50OChieXRlT2Zmc2V0LCB2YWx1ZSl7XG4gICAgICAkc2V0SW50OC5jYWxsKHRoaXMsIGJ5dGVPZmZzZXQsIHZhbHVlIDw8IDI0ID4+IDI0KTtcbiAgICB9LFxuICAgIHNldFVpbnQ4OiBmdW5jdGlvbiBzZXRVaW50OChieXRlT2Zmc2V0LCB2YWx1ZSl7XG4gICAgICAkc2V0SW50OC5jYWxsKHRoaXMsIGJ5dGVPZmZzZXQsIHZhbHVlIDw8IDI0ID4+IDI0KTtcbiAgICB9XG4gIH0sIHRydWUpO1xufVxuc2V0VG9TdHJpbmdUYWcoJEFycmF5QnVmZmVyLCBBUlJBWV9CVUZGRVIpO1xuc2V0VG9TdHJpbmdUYWcoJERhdGFWaWV3LCBEQVRBX1ZJRVcpO1xuaGlkZSgkRGF0YVZpZXdbUFJPVE9UWVBFXSwgJHR5cGVkLlZJRVcsIHRydWUpO1xuZXhwb3J0c1tBUlJBWV9CVUZGRVJdID0gJEFycmF5QnVmZmVyO1xuZXhwb3J0c1tEQVRBX1ZJRVddID0gJERhdGFWaWV3OyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICR0eXBlZCAgICAgICA9IHJlcXVpcmUoJy4vX3R5cGVkJylcbiAgLCBidWZmZXIgICAgICAgPSByZXF1aXJlKCcuL190eXBlZC1idWZmZXInKVxuICAsIGFuT2JqZWN0ICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgdG9JbmRleCAgICAgID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKVxuICAsIHRvTGVuZ3RoICAgICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgaXNPYmplY3QgICAgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBBcnJheUJ1ZmZlciAgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5BcnJheUJ1ZmZlclxuICAsIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKVxuICAsICRBcnJheUJ1ZmZlciA9IGJ1ZmZlci5BcnJheUJ1ZmZlclxuICAsICREYXRhVmlldyAgICA9IGJ1ZmZlci5EYXRhVmlld1xuICAsICRpc1ZpZXcgICAgICA9ICR0eXBlZC5BQlYgJiYgQXJyYXlCdWZmZXIuaXNWaWV3XG4gICwgJHNsaWNlICAgICAgID0gJEFycmF5QnVmZmVyLnByb3RvdHlwZS5zbGljZVxuICAsIFZJRVcgICAgICAgICA9ICR0eXBlZC5WSUVXXG4gICwgQVJSQVlfQlVGRkVSID0gJ0FycmF5QnVmZmVyJztcblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAoQXJyYXlCdWZmZXIgIT09ICRBcnJheUJ1ZmZlciksIHtBcnJheUJ1ZmZlcjogJEFycmF5QnVmZmVyfSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogISR0eXBlZC5DT05TVFIsIEFSUkFZX0JVRkZFUiwge1xuICAvLyAyNC4xLjMuMSBBcnJheUJ1ZmZlci5pc1ZpZXcoYXJnKVxuICBpc1ZpZXc6IGZ1bmN0aW9uIGlzVmlldyhpdCl7XG4gICAgcmV0dXJuICRpc1ZpZXcgJiYgJGlzVmlldyhpdCkgfHwgaXNPYmplY3QoaXQpICYmIFZJRVcgaW4gaXQ7XG4gIH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuVSArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuICFuZXcgJEFycmF5QnVmZmVyKDIpLnNsaWNlKDEsIHVuZGVmaW5lZCkuYnl0ZUxlbmd0aDtcbn0pLCBBUlJBWV9CVUZGRVIsIHtcbiAgLy8gMjQuMS40LjMgQXJyYXlCdWZmZXIucHJvdG90eXBlLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHNsaWNlOiBmdW5jdGlvbiBzbGljZShzdGFydCwgZW5kKXtcbiAgICBpZigkc2xpY2UgIT09IHVuZGVmaW5lZCAmJiBlbmQgPT09IHVuZGVmaW5lZClyZXR1cm4gJHNsaWNlLmNhbGwoYW5PYmplY3QodGhpcyksIHN0YXJ0KTsgLy8gRkYgZml4XG4gICAgdmFyIGxlbiAgICA9IGFuT2JqZWN0KHRoaXMpLmJ5dGVMZW5ndGhcbiAgICAgICwgZmlyc3QgID0gdG9JbmRleChzdGFydCwgbGVuKVxuICAgICAgLCBmaW5hbCAgPSB0b0luZGV4KGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogZW5kLCBsZW4pXG4gICAgICAsIHJlc3VsdCA9IG5ldyAoc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsICRBcnJheUJ1ZmZlcikpKHRvTGVuZ3RoKGZpbmFsIC0gZmlyc3QpKVxuICAgICAgLCB2aWV3UyAgPSBuZXcgJERhdGFWaWV3KHRoaXMpXG4gICAgICAsIHZpZXdUICA9IG5ldyAkRGF0YVZpZXcocmVzdWx0KVxuICAgICAgLCBpbmRleCAgPSAwO1xuICAgIHdoaWxlKGZpcnN0IDwgZmluYWwpe1xuICAgICAgdmlld1Quc2V0VWludDgoaW5kZXgrKywgdmlld1MuZ2V0VWludDgoZmlyc3QrKykpO1xuICAgIH0gcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG5cbnJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJykoQVJSQVlfQlVGRkVSKTsiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fdHlwZWQnKS5BQlYsIHtcbiAgRGF0YVZpZXc6IHJlcXVpcmUoJy4vX3R5cGVkLWJ1ZmZlcicpLkRhdGFWaWV3XG59KTsiLCIndXNlIHN0cmljdCc7XG5pZihyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpKXtcbiAgdmFyIExJQlJBUlkgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgICAsIGdsb2JhbCAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAgICwgZmFpbHMgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcbiAgICAsICRleHBvcnQgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAgICwgJHR5cGVkICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3R5cGVkJylcbiAgICAsICRidWZmZXIgICAgICAgICAgICAgPSByZXF1aXJlKCcuL190eXBlZC1idWZmZXInKVxuICAgICwgY3R4ICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICAgLCBhbkluc3RhbmNlICAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKVxuICAgICwgcHJvcGVydHlEZXNjICAgICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAgICwgaGlkZSAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAgICwgcmVkZWZpbmVBbGwgICAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpXG4gICAgLCB0b0ludGVnZXIgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICAgLCB0b0xlbmd0aCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgICAsIHRvSW5kZXggICAgICAgICAgICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpXG4gICAgLCB0b1ByaW1pdGl2ZSAgICAgICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgICAsIGhhcyAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAgICwgc2FtZSAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3NhbWUtdmFsdWUnKVxuICAgICwgY2xhc3NvZiAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAgICwgaXNPYmplY3QgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICAgLCB0b09iamVjdCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgICAsIGlzQXJyYXlJdGVyICAgICAgICAgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJylcbiAgICAsIGNyZWF0ZSAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJylcbiAgICAsIGdldFByb3RvdHlwZU9mICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgICAsIGdPUE4gICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmZcbiAgICAsIGdldEl0ZXJGbiAgICAgICAgICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpXG4gICAgLCB1aWQgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdWlkJylcbiAgICAsIHdrcyAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL193a3MnKVxuICAgICwgY3JlYXRlQXJyYXlNZXRob2QgICA9IHJlcXVpcmUoJy4vX2FycmF5LW1ldGhvZHMnKVxuICAgICwgY3JlYXRlQXJyYXlJbmNsdWRlcyA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJylcbiAgICAsIHNwZWNpZXNDb25zdHJ1Y3RvciAgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJylcbiAgICAsIEFycmF5SXRlcmF0b3JzICAgICAgPSByZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpXG4gICAgLCBJdGVyYXRvcnMgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgICAsICRpdGVyRGV0ZWN0ICAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpXG4gICAgLCBzZXRTcGVjaWVzICAgICAgICAgID0gcmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKVxuICAgICwgYXJyYXlGaWxsICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FycmF5LWZpbGwnKVxuICAgICwgYXJyYXlDb3B5V2l0aGluICAgICA9IHJlcXVpcmUoJy4vX2FycmF5LWNvcHktd2l0aGluJylcbiAgICAsICREUCAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAgICwgJEdPUEQgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJylcbiAgICAsIGRQICAgICAgICAgICAgICAgICAgPSAkRFAuZlxuICAgICwgZ09QRCAgICAgICAgICAgICAgICA9ICRHT1BELmZcbiAgICAsIFJhbmdlRXJyb3IgICAgICAgICAgPSBnbG9iYWwuUmFuZ2VFcnJvclxuICAgICwgVHlwZUVycm9yICAgICAgICAgICA9IGdsb2JhbC5UeXBlRXJyb3JcbiAgICAsIFVpbnQ4QXJyYXkgICAgICAgICAgPSBnbG9iYWwuVWludDhBcnJheVxuICAgICwgQVJSQVlfQlVGRkVSICAgICAgICA9ICdBcnJheUJ1ZmZlcidcbiAgICAsIFNIQVJFRF9CVUZGRVIgICAgICAgPSAnU2hhcmVkJyArIEFSUkFZX0JVRkZFUlxuICAgICwgQllURVNfUEVSX0VMRU1FTlQgICA9ICdCWVRFU19QRVJfRUxFTUVOVCdcbiAgICAsIFBST1RPVFlQRSAgICAgICAgICAgPSAncHJvdG90eXBlJ1xuICAgICwgQXJyYXlQcm90byAgICAgICAgICA9IEFycmF5W1BST1RPVFlQRV1cbiAgICAsICRBcnJheUJ1ZmZlciAgICAgICAgPSAkYnVmZmVyLkFycmF5QnVmZmVyXG4gICAgLCAkRGF0YVZpZXcgICAgICAgICAgID0gJGJ1ZmZlci5EYXRhVmlld1xuICAgICwgYXJyYXlGb3JFYWNoICAgICAgICA9IGNyZWF0ZUFycmF5TWV0aG9kKDApXG4gICAgLCBhcnJheUZpbHRlciAgICAgICAgID0gY3JlYXRlQXJyYXlNZXRob2QoMilcbiAgICAsIGFycmF5U29tZSAgICAgICAgICAgPSBjcmVhdGVBcnJheU1ldGhvZCgzKVxuICAgICwgYXJyYXlFdmVyeSAgICAgICAgICA9IGNyZWF0ZUFycmF5TWV0aG9kKDQpXG4gICAgLCBhcnJheUZpbmQgICAgICAgICAgID0gY3JlYXRlQXJyYXlNZXRob2QoNSlcbiAgICAsIGFycmF5RmluZEluZGV4ICAgICAgPSBjcmVhdGVBcnJheU1ldGhvZCg2KVxuICAgICwgYXJyYXlJbmNsdWRlcyAgICAgICA9IGNyZWF0ZUFycmF5SW5jbHVkZXModHJ1ZSlcbiAgICAsIGFycmF5SW5kZXhPZiAgICAgICAgPSBjcmVhdGVBcnJheUluY2x1ZGVzKGZhbHNlKVxuICAgICwgYXJyYXlWYWx1ZXMgICAgICAgICA9IEFycmF5SXRlcmF0b3JzLnZhbHVlc1xuICAgICwgYXJyYXlLZXlzICAgICAgICAgICA9IEFycmF5SXRlcmF0b3JzLmtleXNcbiAgICAsIGFycmF5RW50cmllcyAgICAgICAgPSBBcnJheUl0ZXJhdG9ycy5lbnRyaWVzXG4gICAgLCBhcnJheUxhc3RJbmRleE9mICAgID0gQXJyYXlQcm90by5sYXN0SW5kZXhPZlxuICAgICwgYXJyYXlSZWR1Y2UgICAgICAgICA9IEFycmF5UHJvdG8ucmVkdWNlXG4gICAgLCBhcnJheVJlZHVjZVJpZ2h0ICAgID0gQXJyYXlQcm90by5yZWR1Y2VSaWdodFxuICAgICwgYXJyYXlKb2luICAgICAgICAgICA9IEFycmF5UHJvdG8uam9pblxuICAgICwgYXJyYXlTb3J0ICAgICAgICAgICA9IEFycmF5UHJvdG8uc29ydFxuICAgICwgYXJyYXlTbGljZSAgICAgICAgICA9IEFycmF5UHJvdG8uc2xpY2VcbiAgICAsIGFycmF5VG9TdHJpbmcgICAgICAgPSBBcnJheVByb3RvLnRvU3RyaW5nXG4gICAgLCBhcnJheVRvTG9jYWxlU3RyaW5nID0gQXJyYXlQcm90by50b0xvY2FsZVN0cmluZ1xuICAgICwgSVRFUkFUT1IgICAgICAgICAgICA9IHdrcygnaXRlcmF0b3InKVxuICAgICwgVEFHICAgICAgICAgICAgICAgICA9IHdrcygndG9TdHJpbmdUYWcnKVxuICAgICwgVFlQRURfQ09OU1RSVUNUT1IgICA9IHVpZCgndHlwZWRfY29uc3RydWN0b3InKVxuICAgICwgREVGX0NPTlNUUlVDVE9SICAgICA9IHVpZCgnZGVmX2NvbnN0cnVjdG9yJylcbiAgICAsIEFMTF9DT05TVFJVQ1RPUlMgICAgPSAkdHlwZWQuQ09OU1RSXG4gICAgLCBUWVBFRF9BUlJBWSAgICAgICAgID0gJHR5cGVkLlRZUEVEXG4gICAgLCBWSUVXICAgICAgICAgICAgICAgID0gJHR5cGVkLlZJRVdcbiAgICAsIFdST05HX0xFTkdUSCAgICAgICAgPSAnV3JvbmcgbGVuZ3RoISc7XG5cbiAgdmFyICRtYXAgPSBjcmVhdGVBcnJheU1ldGhvZCgxLCBmdW5jdGlvbihPLCBsZW5ndGgpe1xuICAgIHJldHVybiBhbGxvY2F0ZShzcGVjaWVzQ29uc3RydWN0b3IoTywgT1tERUZfQ09OU1RSVUNUT1JdKSwgbGVuZ3RoKTtcbiAgfSk7XG5cbiAgdmFyIExJVFRMRV9FTkRJQU4gPSBmYWlscyhmdW5jdGlvbigpe1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheShuZXcgVWludDE2QXJyYXkoWzFdKS5idWZmZXIpWzBdID09PSAxO1xuICB9KTtcblxuICB2YXIgRk9SQ0VEX1NFVCA9ICEhVWludDhBcnJheSAmJiAhIVVpbnQ4QXJyYXlbUFJPVE9UWVBFXS5zZXQgJiYgZmFpbHMoZnVuY3Rpb24oKXtcbiAgICBuZXcgVWludDhBcnJheSgxKS5zZXQoe30pO1xuICB9KTtcblxuICB2YXIgc3RyaWN0VG9MZW5ndGggPSBmdW5jdGlvbihpdCwgU0FNRSl7XG4gICAgaWYoaXQgPT09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoV1JPTkdfTEVOR1RIKTtcbiAgICB2YXIgbnVtYmVyID0gK2l0XG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKGl0KTtcbiAgICBpZihTQU1FICYmICFzYW1lKG51bWJlciwgbGVuZ3RoKSl0aHJvdyBSYW5nZUVycm9yKFdST05HX0xFTkdUSCk7XG4gICAgcmV0dXJuIGxlbmd0aDtcbiAgfTtcblxuICB2YXIgdG9PZmZzZXQgPSBmdW5jdGlvbihpdCwgQllURVMpe1xuICAgIHZhciBvZmZzZXQgPSB0b0ludGVnZXIoaXQpO1xuICAgIGlmKG9mZnNldCA8IDAgfHwgb2Zmc2V0ICUgQllURVMpdGhyb3cgUmFuZ2VFcnJvcignV3Jvbmcgb2Zmc2V0IScpO1xuICAgIHJldHVybiBvZmZzZXQ7XG4gIH07XG5cbiAgdmFyIHZhbGlkYXRlID0gZnVuY3Rpb24oaXQpe1xuICAgIGlmKGlzT2JqZWN0KGl0KSAmJiBUWVBFRF9BUlJBWSBpbiBpdClyZXR1cm4gaXQ7XG4gICAgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSB0eXBlZCBhcnJheSEnKTtcbiAgfTtcblxuICB2YXIgYWxsb2NhdGUgPSBmdW5jdGlvbihDLCBsZW5ndGgpe1xuICAgIGlmKCEoaXNPYmplY3QoQykgJiYgVFlQRURfQ09OU1RSVUNUT1IgaW4gQykpe1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdJdCBpcyBub3QgYSB0eXBlZCBhcnJheSBjb25zdHJ1Y3RvciEnKTtcbiAgICB9IHJldHVybiBuZXcgQyhsZW5ndGgpO1xuICB9O1xuXG4gIHZhciBzcGVjaWVzRnJvbUxpc3QgPSBmdW5jdGlvbihPLCBsaXN0KXtcbiAgICByZXR1cm4gZnJvbUxpc3Qoc3BlY2llc0NvbnN0cnVjdG9yKE8sIE9bREVGX0NPTlNUUlVDVE9SXSksIGxpc3QpO1xuICB9O1xuXG4gIHZhciBmcm9tTGlzdCA9IGZ1bmN0aW9uKEMsIGxpc3Qpe1xuICAgIHZhciBpbmRleCAgPSAwXG4gICAgICAsIGxlbmd0aCA9IGxpc3QubGVuZ3RoXG4gICAgICAsIHJlc3VsdCA9IGFsbG9jYXRlKEMsIGxlbmd0aCk7XG4gICAgd2hpbGUobGVuZ3RoID4gaW5kZXgpcmVzdWx0W2luZGV4XSA9IGxpc3RbaW5kZXgrK107XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICB2YXIgYWRkR2V0dGVyID0gZnVuY3Rpb24oaXQsIGtleSwgaW50ZXJuYWwpe1xuICAgIGRQKGl0LCBrZXksIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLl9kW2ludGVybmFsXTsgfX0pO1xuICB9O1xuXG4gIHZhciAkZnJvbSA9IGZ1bmN0aW9uIGZyb20oc291cmNlIC8qLCBtYXBmbiwgdGhpc0FyZyAqLyl7XG4gICAgdmFyIE8gICAgICAgPSB0b09iamVjdChzb3VyY2UpXG4gICAgICAsIGFMZW4gICAgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIG1hcGZuICAgPSBhTGVuID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZFxuICAgICAgLCBtYXBwaW5nID0gbWFwZm4gIT09IHVuZGVmaW5lZFxuICAgICAgLCBpdGVyRm4gID0gZ2V0SXRlckZuKE8pXG4gICAgICAsIGksIGxlbmd0aCwgdmFsdWVzLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIWlzQXJyYXlJdGVyKGl0ZXJGbikpe1xuICAgICAgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoTyksIHZhbHVlcyA9IFtdLCBpID0gMDsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyBpKyspe1xuICAgICAgICB2YWx1ZXMucHVzaChzdGVwLnZhbHVlKTtcbiAgICAgIH0gTyA9IHZhbHVlcztcbiAgICB9XG4gICAgaWYobWFwcGluZyAmJiBhTGVuID4gMiltYXBmbiA9IGN0eChtYXBmbiwgYXJndW1lbnRzWzJdLCAyKTtcbiAgICBmb3IoaSA9IDAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKSwgcmVzdWx0ID0gYWxsb2NhdGUodGhpcywgbGVuZ3RoKTsgbGVuZ3RoID4gaTsgaSsrKXtcbiAgICAgIHJlc3VsdFtpXSA9IG1hcHBpbmcgPyBtYXBmbihPW2ldLCBpKSA6IE9baV07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgdmFyICRvZiA9IGZ1bmN0aW9uIG9mKC8qLi4uaXRlbXMqLyl7XG4gICAgdmFyIGluZGV4ICA9IDBcbiAgICAgICwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLCByZXN1bHQgPSBhbGxvY2F0ZSh0aGlzLCBsZW5ndGgpO1xuICAgIHdoaWxlKGxlbmd0aCA+IGluZGV4KXJlc3VsdFtpbmRleF0gPSBhcmd1bWVudHNbaW5kZXgrK107XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBpT1MgU2FmYXJpIDYueCBmYWlscyBoZXJlXG4gIHZhciBUT19MT0NBTEVfQlVHID0gISFVaW50OEFycmF5ICYmIGZhaWxzKGZ1bmN0aW9uKCl7IGFycmF5VG9Mb2NhbGVTdHJpbmcuY2FsbChuZXcgVWludDhBcnJheSgxKSk7IH0pO1xuXG4gIHZhciAkdG9Mb2NhbGVTdHJpbmcgPSBmdW5jdGlvbiB0b0xvY2FsZVN0cmluZygpe1xuICAgIHJldHVybiBhcnJheVRvTG9jYWxlU3RyaW5nLmFwcGx5KFRPX0xPQ0FMRV9CVUcgPyBhcnJheVNsaWNlLmNhbGwodmFsaWRhdGUodGhpcykpIDogdmFsaWRhdGUodGhpcyksIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgdmFyIHByb3RvID0ge1xuICAgIGNvcHlXaXRoaW46IGZ1bmN0aW9uIGNvcHlXaXRoaW4odGFyZ2V0LCBzdGFydCAvKiwgZW5kICovKXtcbiAgICAgIHJldHVybiBhcnJheUNvcHlXaXRoaW4uY2FsbCh2YWxpZGF0ZSh0aGlzKSwgdGFyZ2V0LCBzdGFydCwgYXJndW1lbnRzLmxlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQpO1xuICAgIH0sXG4gICAgZXZlcnk6IGZ1bmN0aW9uIGV2ZXJ5KGNhbGxiYWNrZm4gLyosIHRoaXNBcmcgKi8pe1xuICAgICAgcmV0dXJuIGFycmF5RXZlcnkodmFsaWRhdGUodGhpcyksIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgICB9LFxuICAgIGZpbGw6IGZ1bmN0aW9uIGZpbGwodmFsdWUgLyosIHN0YXJ0LCBlbmQgKi8peyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICByZXR1cm4gYXJyYXlGaWxsLmFwcGx5KHZhbGlkYXRlKHRoaXMpLCBhcmd1bWVudHMpO1xuICAgIH0sXG4gICAgZmlsdGVyOiBmdW5jdGlvbiBmaWx0ZXIoY2FsbGJhY2tmbiAvKiwgdGhpc0FyZyAqLyl7XG4gICAgICByZXR1cm4gc3BlY2llc0Zyb21MaXN0KHRoaXMsIGFycmF5RmlsdGVyKHZhbGlkYXRlKHRoaXMpLCBjYWxsYmFja2ZuLFxuICAgICAgICBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCkpO1xuICAgIH0sXG4gICAgZmluZDogZnVuY3Rpb24gZmluZChwcmVkaWNhdGUgLyosIHRoaXNBcmcgKi8pe1xuICAgICAgcmV0dXJuIGFycmF5RmluZCh2YWxpZGF0ZSh0aGlzKSwgcHJlZGljYXRlLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gICAgfSxcbiAgICBmaW5kSW5kZXg6IGZ1bmN0aW9uIGZpbmRJbmRleChwcmVkaWNhdGUgLyosIHRoaXNBcmcgKi8pe1xuICAgICAgcmV0dXJuIGFycmF5RmluZEluZGV4KHZhbGlkYXRlKHRoaXMpLCBwcmVkaWNhdGUsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgICB9LFxuICAgIGZvckVhY2g6IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2tmbiAvKiwgdGhpc0FyZyAqLyl7XG4gICAgICBhcnJheUZvckVhY2godmFsaWRhdGUodGhpcyksIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgICB9LFxuICAgIGluZGV4T2Y6IGZ1bmN0aW9uIGluZGV4T2Yoc2VhcmNoRWxlbWVudCAvKiwgZnJvbUluZGV4ICovKXtcbiAgICAgIHJldHVybiBhcnJheUluZGV4T2YodmFsaWRhdGUodGhpcyksIHNlYXJjaEVsZW1lbnQsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgICB9LFxuICAgIGluY2x1ZGVzOiBmdW5jdGlvbiBpbmNsdWRlcyhzZWFyY2hFbGVtZW50IC8qLCBmcm9tSW5kZXggKi8pe1xuICAgICAgcmV0dXJuIGFycmF5SW5jbHVkZXModmFsaWRhdGUodGhpcyksIHNlYXJjaEVsZW1lbnQsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgICB9LFxuICAgIGpvaW46IGZ1bmN0aW9uIGpvaW4oc2VwYXJhdG9yKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgcmV0dXJuIGFycmF5Sm9pbi5hcHBseSh2YWxpZGF0ZSh0aGlzKSwgYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIGxhc3RJbmRleE9mOiBmdW5jdGlvbiBsYXN0SW5kZXhPZihzZWFyY2hFbGVtZW50IC8qLCBmcm9tSW5kZXggKi8peyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICByZXR1cm4gYXJyYXlMYXN0SW5kZXhPZi5hcHBseSh2YWxpZGF0ZSh0aGlzKSwgYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIG1hcDogZnVuY3Rpb24gbWFwKG1hcGZuIC8qLCB0aGlzQXJnICovKXtcbiAgICAgIHJldHVybiAkbWFwKHZhbGlkYXRlKHRoaXMpLCBtYXBmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICAgIH0sXG4gICAgcmVkdWNlOiBmdW5jdGlvbiByZWR1Y2UoY2FsbGJhY2tmbiAvKiwgaW5pdGlhbFZhbHVlICovKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgcmV0dXJuIGFycmF5UmVkdWNlLmFwcGx5KHZhbGlkYXRlKHRoaXMpLCBhcmd1bWVudHMpO1xuICAgIH0sXG4gICAgcmVkdWNlUmlnaHQ6IGZ1bmN0aW9uIHJlZHVjZVJpZ2h0KGNhbGxiYWNrZm4gLyosIGluaXRpYWxWYWx1ZSAqLyl7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIHJldHVybiBhcnJheVJlZHVjZVJpZ2h0LmFwcGx5KHZhbGlkYXRlKHRoaXMpLCBhcmd1bWVudHMpO1xuICAgIH0sXG4gICAgcmV2ZXJzZTogZnVuY3Rpb24gcmV2ZXJzZSgpe1xuICAgICAgdmFyIHRoYXQgICA9IHRoaXNcbiAgICAgICAgLCBsZW5ndGggPSB2YWxpZGF0ZSh0aGF0KS5sZW5ndGhcbiAgICAgICAgLCBtaWRkbGUgPSBNYXRoLmZsb29yKGxlbmd0aCAvIDIpXG4gICAgICAgICwgaW5kZXggID0gMFxuICAgICAgICAsIHZhbHVlO1xuICAgICAgd2hpbGUoaW5kZXggPCBtaWRkbGUpe1xuICAgICAgICB2YWx1ZSAgICAgICAgID0gdGhhdFtpbmRleF07XG4gICAgICAgIHRoYXRbaW5kZXgrK10gPSB0aGF0Wy0tbGVuZ3RoXTtcbiAgICAgICAgdGhhdFtsZW5ndGhdICA9IHZhbHVlO1xuICAgICAgfSByZXR1cm4gdGhhdDtcbiAgICB9LFxuICAgIHNvbWU6IGZ1bmN0aW9uIHNvbWUoY2FsbGJhY2tmbiAvKiwgdGhpc0FyZyAqLyl7XG4gICAgICByZXR1cm4gYXJyYXlTb21lKHZhbGlkYXRlKHRoaXMpLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gICAgfSxcbiAgICBzb3J0OiBmdW5jdGlvbiBzb3J0KGNvbXBhcmVmbil7XG4gICAgICByZXR1cm4gYXJyYXlTb3J0LmNhbGwodmFsaWRhdGUodGhpcyksIGNvbXBhcmVmbik7XG4gICAgfSxcbiAgICBzdWJhcnJheTogZnVuY3Rpb24gc3ViYXJyYXkoYmVnaW4sIGVuZCl7XG4gICAgICB2YXIgTyAgICAgID0gdmFsaWRhdGUodGhpcylcbiAgICAgICAgLCBsZW5ndGggPSBPLmxlbmd0aFxuICAgICAgICAsICRiZWdpbiA9IHRvSW5kZXgoYmVnaW4sIGxlbmd0aCk7XG4gICAgICByZXR1cm4gbmV3IChzcGVjaWVzQ29uc3RydWN0b3IoTywgT1tERUZfQ09OU1RSVUNUT1JdKSkoXG4gICAgICAgIE8uYnVmZmVyLFxuICAgICAgICBPLmJ5dGVPZmZzZXQgKyAkYmVnaW4gKiBPLkJZVEVTX1BFUl9FTEVNRU5ULFxuICAgICAgICB0b0xlbmd0aCgoZW5kID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiB0b0luZGV4KGVuZCwgbGVuZ3RoKSkgLSAkYmVnaW4pXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICB2YXIgJHNsaWNlID0gZnVuY3Rpb24gc2xpY2Uoc3RhcnQsIGVuZCl7XG4gICAgcmV0dXJuIHNwZWNpZXNGcm9tTGlzdCh0aGlzLCBhcnJheVNsaWNlLmNhbGwodmFsaWRhdGUodGhpcyksIHN0YXJ0LCBlbmQpKTtcbiAgfTtcblxuICB2YXIgJHNldCA9IGZ1bmN0aW9uIHNldChhcnJheUxpa2UgLyosIG9mZnNldCAqLyl7XG4gICAgdmFsaWRhdGUodGhpcyk7XG4gICAgdmFyIG9mZnNldCA9IHRvT2Zmc2V0KGFyZ3VtZW50c1sxXSwgMSlcbiAgICAgICwgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICAgICwgc3JjICAgID0gdG9PYmplY3QoYXJyYXlMaWtlKVxuICAgICAgLCBsZW4gICAgPSB0b0xlbmd0aChzcmMubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSAwO1xuICAgIGlmKGxlbiArIG9mZnNldCA+IGxlbmd0aCl0aHJvdyBSYW5nZUVycm9yKFdST05HX0xFTkdUSCk7XG4gICAgd2hpbGUoaW5kZXggPCBsZW4pdGhpc1tvZmZzZXQgKyBpbmRleF0gPSBzcmNbaW5kZXgrK107XG4gIH07XG5cbiAgdmFyICRpdGVyYXRvcnMgPSB7XG4gICAgZW50cmllczogZnVuY3Rpb24gZW50cmllcygpe1xuICAgICAgcmV0dXJuIGFycmF5RW50cmllcy5jYWxsKHZhbGlkYXRlKHRoaXMpKTtcbiAgICB9LFxuICAgIGtleXM6IGZ1bmN0aW9uIGtleXMoKXtcbiAgICAgIHJldHVybiBhcnJheUtleXMuY2FsbCh2YWxpZGF0ZSh0aGlzKSk7XG4gICAgfSxcbiAgICB2YWx1ZXM6IGZ1bmN0aW9uIHZhbHVlcygpe1xuICAgICAgcmV0dXJuIGFycmF5VmFsdWVzLmNhbGwodmFsaWRhdGUodGhpcykpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgaXNUQUluZGV4ID0gZnVuY3Rpb24odGFyZ2V0LCBrZXkpe1xuICAgIHJldHVybiBpc09iamVjdCh0YXJnZXQpXG4gICAgICAmJiB0YXJnZXRbVFlQRURfQVJSQVldXG4gICAgICAmJiB0eXBlb2Yga2V5ICE9ICdzeW1ib2wnXG4gICAgICAmJiBrZXkgaW4gdGFyZ2V0XG4gICAgICAmJiBTdHJpbmcoK2tleSkgPT0gU3RyaW5nKGtleSk7XG4gIH07XG4gIHZhciAkZ2V0RGVzYyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSl7XG4gICAgcmV0dXJuIGlzVEFJbmRleCh0YXJnZXQsIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSkpXG4gICAgICA/IHByb3BlcnR5RGVzYygyLCB0YXJnZXRba2V5XSlcbiAgICAgIDogZ09QRCh0YXJnZXQsIGtleSk7XG4gIH07XG4gIHZhciAkc2V0RGVzYyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBkZXNjKXtcbiAgICBpZihpc1RBSW5kZXgodGFyZ2V0LCBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpKVxuICAgICAgJiYgaXNPYmplY3QoZGVzYylcbiAgICAgICYmIGhhcyhkZXNjLCAndmFsdWUnKVxuICAgICAgJiYgIWhhcyhkZXNjLCAnZ2V0JylcbiAgICAgICYmICFoYXMoZGVzYywgJ3NldCcpXG4gICAgICAvLyBUT0RPOiBhZGQgdmFsaWRhdGlvbiBkZXNjcmlwdG9yIHcvbyBjYWxsaW5nIGFjY2Vzc29yc1xuICAgICAgJiYgIWRlc2MuY29uZmlndXJhYmxlXG4gICAgICAmJiAoIWhhcyhkZXNjLCAnd3JpdGFibGUnKSB8fCBkZXNjLndyaXRhYmxlKVxuICAgICAgJiYgKCFoYXMoZGVzYywgJ2VudW1lcmFibGUnKSB8fCBkZXNjLmVudW1lcmFibGUpXG4gICAgKXtcbiAgICAgIHRhcmdldFtrZXldID0gZGVzYy52YWx1ZTtcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfSBlbHNlIHJldHVybiBkUCh0YXJnZXQsIGtleSwgZGVzYyk7XG4gIH07XG5cbiAgaWYoIUFMTF9DT05TVFJVQ1RPUlMpe1xuICAgICRHT1BELmYgPSAkZ2V0RGVzYztcbiAgICAkRFAuZiAgID0gJHNldERlc2M7XG4gIH1cblxuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFBTExfQ09OU1RSVUNUT1JTLCAnT2JqZWN0Jywge1xuICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldERlc2MsXG4gICAgZGVmaW5lUHJvcGVydHk6ICAgICAgICAgICAkc2V0RGVzY1xuICB9KTtcblxuICBpZihmYWlscyhmdW5jdGlvbigpeyBhcnJheVRvU3RyaW5nLmNhbGwoe30pOyB9KSl7XG4gICAgYXJyYXlUb1N0cmluZyA9IGFycmF5VG9Mb2NhbGVTdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpe1xuICAgICAgcmV0dXJuIGFycmF5Sm9pbi5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIHZhciAkVHlwZWRBcnJheVByb3RvdHlwZSQgPSByZWRlZmluZUFsbCh7fSwgcHJvdG8pO1xuICByZWRlZmluZUFsbCgkVHlwZWRBcnJheVByb3RvdHlwZSQsICRpdGVyYXRvcnMpO1xuICBoaWRlKCRUeXBlZEFycmF5UHJvdG90eXBlJCwgSVRFUkFUT1IsICRpdGVyYXRvcnMudmFsdWVzKTtcbiAgcmVkZWZpbmVBbGwoJFR5cGVkQXJyYXlQcm90b3R5cGUkLCB7XG4gICAgc2xpY2U6ICAgICAgICAgICRzbGljZSxcbiAgICBzZXQ6ICAgICAgICAgICAgJHNldCxcbiAgICBjb25zdHJ1Y3RvcjogICAgZnVuY3Rpb24oKXsgLyogbm9vcCAqLyB9LFxuICAgIHRvU3RyaW5nOiAgICAgICBhcnJheVRvU3RyaW5nLFxuICAgIHRvTG9jYWxlU3RyaW5nOiAkdG9Mb2NhbGVTdHJpbmdcbiAgfSk7XG4gIGFkZEdldHRlcigkVHlwZWRBcnJheVByb3RvdHlwZSQsICdidWZmZXInLCAnYicpO1xuICBhZGRHZXR0ZXIoJFR5cGVkQXJyYXlQcm90b3R5cGUkLCAnYnl0ZU9mZnNldCcsICdvJyk7XG4gIGFkZEdldHRlcigkVHlwZWRBcnJheVByb3RvdHlwZSQsICdieXRlTGVuZ3RoJywgJ2wnKTtcbiAgYWRkR2V0dGVyKCRUeXBlZEFycmF5UHJvdG90eXBlJCwgJ2xlbmd0aCcsICdlJyk7XG4gIGRQKCRUeXBlZEFycmF5UHJvdG90eXBlJCwgVEFHLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gdGhpc1tUWVBFRF9BUlJBWV07IH1cbiAgfSk7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVksIEJZVEVTLCB3cmFwcGVyLCBDTEFNUEVEKXtcbiAgICBDTEFNUEVEID0gISFDTEFNUEVEO1xuICAgIHZhciBOQU1FICAgICAgID0gS0VZICsgKENMQU1QRUQgPyAnQ2xhbXBlZCcgOiAnJykgKyAnQXJyYXknXG4gICAgICAsIElTTlRfVUlOVDggPSBOQU1FICE9ICdVaW50OEFycmF5J1xuICAgICAgLCBHRVRURVIgICAgID0gJ2dldCcgKyBLRVlcbiAgICAgICwgU0VUVEVSICAgICA9ICdzZXQnICsgS0VZXG4gICAgICAsIFR5cGVkQXJyYXkgPSBnbG9iYWxbTkFNRV1cbiAgICAgICwgQmFzZSAgICAgICA9IFR5cGVkQXJyYXkgfHwge31cbiAgICAgICwgVEFDICAgICAgICA9IFR5cGVkQXJyYXkgJiYgZ2V0UHJvdG90eXBlT2YoVHlwZWRBcnJheSlcbiAgICAgICwgRk9SQ0VEICAgICA9ICFUeXBlZEFycmF5IHx8ICEkdHlwZWQuQUJWXG4gICAgICAsIE8gICAgICAgICAgPSB7fVxuICAgICAgLCBUeXBlZEFycmF5UHJvdG90eXBlID0gVHlwZWRBcnJheSAmJiBUeXBlZEFycmF5W1BST1RPVFlQRV07XG4gICAgdmFyIGdldHRlciA9IGZ1bmN0aW9uKHRoYXQsIGluZGV4KXtcbiAgICAgIHZhciBkYXRhID0gdGhhdC5fZDtcbiAgICAgIHJldHVybiBkYXRhLnZbR0VUVEVSXShpbmRleCAqIEJZVEVTICsgZGF0YS5vLCBMSVRUTEVfRU5ESUFOKTtcbiAgICB9O1xuICAgIHZhciBzZXR0ZXIgPSBmdW5jdGlvbih0aGF0LCBpbmRleCwgdmFsdWUpe1xuICAgICAgdmFyIGRhdGEgPSB0aGF0Ll9kO1xuICAgICAgaWYoQ0xBTVBFRCl2YWx1ZSA9ICh2YWx1ZSA9IE1hdGgucm91bmQodmFsdWUpKSA8IDAgPyAwIDogdmFsdWUgPiAweGZmID8gMHhmZiA6IHZhbHVlICYgMHhmZjtcbiAgICAgIGRhdGEudltTRVRURVJdKGluZGV4ICogQllURVMgKyBkYXRhLm8sIHZhbHVlLCBMSVRUTEVfRU5ESUFOKTtcbiAgICB9O1xuICAgIHZhciBhZGRFbGVtZW50ID0gZnVuY3Rpb24odGhhdCwgaW5kZXgpe1xuICAgICAgZFAodGhhdCwgaW5kZXgsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpe1xuICAgICAgICAgIHJldHVybiBnZXR0ZXIodGhpcywgaW5kZXgpO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICByZXR1cm4gc2V0dGVyKHRoaXMsIGluZGV4LCB2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgIH07XG4gICAgaWYoRk9SQ0VEKXtcbiAgICAgIFR5cGVkQXJyYXkgPSB3cmFwcGVyKGZ1bmN0aW9uKHRoYXQsIGRhdGEsICRvZmZzZXQsICRsZW5ndGgpe1xuICAgICAgICBhbkluc3RhbmNlKHRoYXQsIFR5cGVkQXJyYXksIE5BTUUsICdfZCcpO1xuICAgICAgICB2YXIgaW5kZXggID0gMFxuICAgICAgICAgICwgb2Zmc2V0ID0gMFxuICAgICAgICAgICwgYnVmZmVyLCBieXRlTGVuZ3RoLCBsZW5ndGgsIGtsYXNzO1xuICAgICAgICBpZighaXNPYmplY3QoZGF0YSkpe1xuICAgICAgICAgIGxlbmd0aCAgICAgPSBzdHJpY3RUb0xlbmd0aChkYXRhLCB0cnVlKVxuICAgICAgICAgIGJ5dGVMZW5ndGggPSBsZW5ndGggKiBCWVRFUztcbiAgICAgICAgICBidWZmZXIgICAgID0gbmV3ICRBcnJheUJ1ZmZlcihieXRlTGVuZ3RoKTtcbiAgICAgICAgfSBlbHNlIGlmKGRhdGEgaW5zdGFuY2VvZiAkQXJyYXlCdWZmZXIgfHwgKGtsYXNzID0gY2xhc3NvZihkYXRhKSkgPT0gQVJSQVlfQlVGRkVSIHx8IGtsYXNzID09IFNIQVJFRF9CVUZGRVIpe1xuICAgICAgICAgIGJ1ZmZlciA9IGRhdGE7XG4gICAgICAgICAgb2Zmc2V0ID0gdG9PZmZzZXQoJG9mZnNldCwgQllURVMpO1xuICAgICAgICAgIHZhciAkbGVuID0gZGF0YS5ieXRlTGVuZ3RoO1xuICAgICAgICAgIGlmKCRsZW5ndGggPT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICBpZigkbGVuICUgQllURVMpdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19MRU5HVEgpO1xuICAgICAgICAgICAgYnl0ZUxlbmd0aCA9ICRsZW4gLSBvZmZzZXQ7XG4gICAgICAgICAgICBpZihieXRlTGVuZ3RoIDwgMCl0aHJvdyBSYW5nZUVycm9yKFdST05HX0xFTkdUSCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJ5dGVMZW5ndGggPSB0b0xlbmd0aCgkbGVuZ3RoKSAqIEJZVEVTO1xuICAgICAgICAgICAgaWYoYnl0ZUxlbmd0aCArIG9mZnNldCA+ICRsZW4pdGhyb3cgUmFuZ2VFcnJvcihXUk9OR19MRU5HVEgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZW5ndGggPSBieXRlTGVuZ3RoIC8gQllURVM7XG4gICAgICAgIH0gZWxzZSBpZihUWVBFRF9BUlJBWSBpbiBkYXRhKXtcbiAgICAgICAgICByZXR1cm4gZnJvbUxpc3QoVHlwZWRBcnJheSwgZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICRmcm9tLmNhbGwoVHlwZWRBcnJheSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgaGlkZSh0aGF0LCAnX2QnLCB7XG4gICAgICAgICAgYjogYnVmZmVyLFxuICAgICAgICAgIG86IG9mZnNldCxcbiAgICAgICAgICBsOiBieXRlTGVuZ3RoLFxuICAgICAgICAgIGU6IGxlbmd0aCxcbiAgICAgICAgICB2OiBuZXcgJERhdGFWaWV3KGJ1ZmZlcilcbiAgICAgICAgfSk7XG4gICAgICAgIHdoaWxlKGluZGV4IDwgbGVuZ3RoKWFkZEVsZW1lbnQodGhhdCwgaW5kZXgrKyk7XG4gICAgICB9KTtcbiAgICAgIFR5cGVkQXJyYXlQcm90b3R5cGUgPSBUeXBlZEFycmF5W1BST1RPVFlQRV0gPSBjcmVhdGUoJFR5cGVkQXJyYXlQcm90b3R5cGUkKTtcbiAgICAgIGhpZGUoVHlwZWRBcnJheVByb3RvdHlwZSwgJ2NvbnN0cnVjdG9yJywgVHlwZWRBcnJheSk7XG4gICAgfSBlbHNlIGlmKCEkaXRlckRldGVjdChmdW5jdGlvbihpdGVyKXtcbiAgICAgIC8vIFY4IHdvcmtzIHdpdGggaXRlcmF0b3JzLCBidXQgZmFpbHMgaW4gbWFueSBvdGhlciBjYXNlc1xuICAgICAgLy8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQ1NTJcbiAgICAgIG5ldyBUeXBlZEFycmF5KG51bGwpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgICAgbmV3IFR5cGVkQXJyYXkoaXRlcik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgfSwgdHJ1ZSkpe1xuICAgICAgVHlwZWRBcnJheSA9IHdyYXBwZXIoZnVuY3Rpb24odGhhdCwgZGF0YSwgJG9mZnNldCwgJGxlbmd0aCl7XG4gICAgICAgIGFuSW5zdGFuY2UodGhhdCwgVHlwZWRBcnJheSwgTkFNRSk7XG4gICAgICAgIHZhciBrbGFzcztcbiAgICAgICAgLy8gYHdzYCBtb2R1bGUgYnVnLCB0ZW1wb3JhcmlseSByZW1vdmUgdmFsaWRhdGlvbiBsZW5ndGggZm9yIFVpbnQ4QXJyYXlcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3dlYnNvY2tldHMvd3MvcHVsbC82NDVcbiAgICAgICAgaWYoIWlzT2JqZWN0KGRhdGEpKXJldHVybiBuZXcgQmFzZShzdHJpY3RUb0xlbmd0aChkYXRhLCBJU05UX1VJTlQ4KSk7XG4gICAgICAgIGlmKGRhdGEgaW5zdGFuY2VvZiAkQXJyYXlCdWZmZXIgfHwgKGtsYXNzID0gY2xhc3NvZihkYXRhKSkgPT0gQVJSQVlfQlVGRkVSIHx8IGtsYXNzID09IFNIQVJFRF9CVUZGRVIpe1xuICAgICAgICAgIHJldHVybiAkbGVuZ3RoICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gbmV3IEJhc2UoZGF0YSwgdG9PZmZzZXQoJG9mZnNldCwgQllURVMpLCAkbGVuZ3RoKVxuICAgICAgICAgICAgOiAkb2Zmc2V0ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgPyBuZXcgQmFzZShkYXRhLCB0b09mZnNldCgkb2Zmc2V0LCBCWVRFUykpXG4gICAgICAgICAgICAgIDogbmV3IEJhc2UoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoVFlQRURfQVJSQVkgaW4gZGF0YSlyZXR1cm4gZnJvbUxpc3QoVHlwZWRBcnJheSwgZGF0YSk7XG4gICAgICAgIHJldHVybiAkZnJvbS5jYWxsKFR5cGVkQXJyYXksIGRhdGEpO1xuICAgICAgfSk7XG4gICAgICBhcnJheUZvckVhY2goVEFDICE9PSBGdW5jdGlvbi5wcm90b3R5cGUgPyBnT1BOKEJhc2UpLmNvbmNhdChnT1BOKFRBQykpIDogZ09QTihCYXNlKSwgZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgaWYoIShrZXkgaW4gVHlwZWRBcnJheSkpaGlkZShUeXBlZEFycmF5LCBrZXksIEJhc2Vba2V5XSk7XG4gICAgICB9KTtcbiAgICAgIFR5cGVkQXJyYXlbUFJPVE9UWVBFXSA9IFR5cGVkQXJyYXlQcm90b3R5cGU7XG4gICAgICBpZighTElCUkFSWSlUeXBlZEFycmF5UHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVHlwZWRBcnJheTtcbiAgICB9XG4gICAgdmFyICRuYXRpdmVJdGVyYXRvciAgID0gVHlwZWRBcnJheVByb3RvdHlwZVtJVEVSQVRPUl1cbiAgICAgICwgQ09SUkVDVF9JVEVSX05BTUUgPSAhISRuYXRpdmVJdGVyYXRvciAmJiAoJG5hdGl2ZUl0ZXJhdG9yLm5hbWUgPT0gJ3ZhbHVlcycgfHwgJG5hdGl2ZUl0ZXJhdG9yLm5hbWUgPT0gdW5kZWZpbmVkKVxuICAgICAgLCAkaXRlcmF0b3IgICAgICAgICA9ICRpdGVyYXRvcnMudmFsdWVzO1xuICAgIGhpZGUoVHlwZWRBcnJheSwgVFlQRURfQ09OU1RSVUNUT1IsIHRydWUpO1xuICAgIGhpZGUoVHlwZWRBcnJheVByb3RvdHlwZSwgVFlQRURfQVJSQVksIE5BTUUpO1xuICAgIGhpZGUoVHlwZWRBcnJheVByb3RvdHlwZSwgVklFVywgdHJ1ZSk7XG4gICAgaGlkZShUeXBlZEFycmF5UHJvdG90eXBlLCBERUZfQ09OU1RSVUNUT1IsIFR5cGVkQXJyYXkpO1xuXG4gICAgaWYoQ0xBTVBFRCA/IG5ldyBUeXBlZEFycmF5KDEpW1RBR10gIT0gTkFNRSA6ICEoVEFHIGluIFR5cGVkQXJyYXlQcm90b3R5cGUpKXtcbiAgICAgIGRQKFR5cGVkQXJyYXlQcm90b3R5cGUsIFRBRywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBOQU1FOyB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBPW05BTUVdID0gVHlwZWRBcnJheTtcblxuICAgICRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogKFR5cGVkQXJyYXkgIT0gQmFzZSksIE8pO1xuXG4gICAgJGV4cG9ydCgkZXhwb3J0LlMsIE5BTUUsIHtcbiAgICAgIEJZVEVTX1BFUl9FTEVNRU5UOiBCWVRFUyxcbiAgICAgIGZyb206ICRmcm9tLFxuICAgICAgb2Y6ICRvZlxuICAgIH0pO1xuXG4gICAgaWYoIShCWVRFU19QRVJfRUxFTUVOVCBpbiBUeXBlZEFycmF5UHJvdG90eXBlKSloaWRlKFR5cGVkQXJyYXlQcm90b3R5cGUsIEJZVEVTX1BFUl9FTEVNRU5ULCBCWVRFUyk7XG5cbiAgICAkZXhwb3J0KCRleHBvcnQuUCwgTkFNRSwgcHJvdG8pO1xuXG4gICAgc2V0U3BlY2llcyhOQU1FKTtcblxuICAgICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogRk9SQ0VEX1NFVCwgTkFNRSwge3NldDogJHNldH0pO1xuXG4gICAgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAhQ09SUkVDVF9JVEVSX05BTUUsIE5BTUUsICRpdGVyYXRvcnMpO1xuXG4gICAgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoVHlwZWRBcnJheVByb3RvdHlwZS50b1N0cmluZyAhPSBhcnJheVRvU3RyaW5nKSwgTkFNRSwge3RvU3RyaW5nOiBhcnJheVRvU3RyaW5nfSk7XG5cbiAgICAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uKCl7XG4gICAgICBuZXcgVHlwZWRBcnJheSgxKS5zbGljZSgpO1xuICAgIH0pLCBOQU1FLCB7c2xpY2U6ICRzbGljZX0pO1xuXG4gICAgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoZmFpbHMoZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiBbMSwgMl0udG9Mb2NhbGVTdHJpbmcoKSAhPSBuZXcgVHlwZWRBcnJheShbMSwgMl0pLnRvTG9jYWxlU3RyaW5nKClcbiAgICB9KSB8fCAhZmFpbHMoZnVuY3Rpb24oKXtcbiAgICAgIFR5cGVkQXJyYXlQcm90b3R5cGUudG9Mb2NhbGVTdHJpbmcuY2FsbChbMSwgMl0pO1xuICAgIH0pKSwgTkFNRSwge3RvTG9jYWxlU3RyaW5nOiAkdG9Mb2NhbGVTdHJpbmd9KTtcblxuICAgIEl0ZXJhdG9yc1tOQU1FXSA9IENPUlJFQ1RfSVRFUl9OQU1FID8gJG5hdGl2ZUl0ZXJhdG9yIDogJGl0ZXJhdG9yO1xuICAgIGlmKCFMSUJSQVJZICYmICFDT1JSRUNUX0lURVJfTkFNRSloaWRlKFR5cGVkQXJyYXlQcm90b3R5cGUsIElURVJBVE9SLCAkaXRlcmF0b3IpO1xuICB9O1xufSBlbHNlIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfTsiLCJyZXF1aXJlKCcuL190eXBlZC1hcnJheScpKCdJbnQ4JywgMSwgZnVuY3Rpb24oaW5pdCl7XG4gIHJldHVybiBmdW5jdGlvbiBJbnQ4QXJyYXkoZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKXtcbiAgICByZXR1cm4gaW5pdCh0aGlzLCBkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpO1xuICB9O1xufSk7IiwicmVxdWlyZSgnLi9fdHlwZWQtYXJyYXknKSgnVWludDgnLCAxLCBmdW5jdGlvbihpbml0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIFVpbnQ4QXJyYXkoZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKXtcbiAgICByZXR1cm4gaW5pdCh0aGlzLCBkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpO1xuICB9O1xufSk7IiwicmVxdWlyZSgnLi9fdHlwZWQtYXJyYXknKSgnVWludDgnLCAxLCBmdW5jdGlvbihpbml0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIFVpbnQ4Q2xhbXBlZEFycmF5KGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCl7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0sIHRydWUpOyIsInJlcXVpcmUoJy4vX3R5cGVkLWFycmF5JykoJ0ludDE2JywgMiwgZnVuY3Rpb24oaW5pdCl7XG4gIHJldHVybiBmdW5jdGlvbiBJbnQxNkFycmF5KGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCl7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0pOyIsInJlcXVpcmUoJy4vX3R5cGVkLWFycmF5JykoJ1VpbnQxNicsIDIsIGZ1bmN0aW9uKGluaXQpe1xuICByZXR1cm4gZnVuY3Rpb24gVWludDE2QXJyYXkoZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKXtcbiAgICByZXR1cm4gaW5pdCh0aGlzLCBkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpO1xuICB9O1xufSk7IiwicmVxdWlyZSgnLi9fdHlwZWQtYXJyYXknKSgnSW50MzInLCA0LCBmdW5jdGlvbihpbml0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIEludDMyQXJyYXkoZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKXtcbiAgICByZXR1cm4gaW5pdCh0aGlzLCBkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpO1xuICB9O1xufSk7IiwicmVxdWlyZSgnLi9fdHlwZWQtYXJyYXknKSgnVWludDMyJywgNCwgZnVuY3Rpb24oaW5pdCl7XG4gIHJldHVybiBmdW5jdGlvbiBVaW50MzJBcnJheShkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpe1xuICAgIHJldHVybiBpbml0KHRoaXMsIGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCk7XG4gIH07XG59KTsiLCJyZXF1aXJlKCcuL190eXBlZC1hcnJheScpKCdGbG9hdDMyJywgNCwgZnVuY3Rpb24oaW5pdCl7XG4gIHJldHVybiBmdW5jdGlvbiBGbG9hdDMyQXJyYXkoZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKXtcbiAgICByZXR1cm4gaW5pdCh0aGlzLCBkYXRhLCBieXRlT2Zmc2V0LCBsZW5ndGgpO1xuICB9O1xufSk7IiwicmVxdWlyZSgnLi9fdHlwZWQtYXJyYXknKSgnRmxvYXQ2NCcsIDgsIGZ1bmN0aW9uKGluaXQpe1xuICByZXR1cm4gZnVuY3Rpb24gRmxvYXQ2NEFycmF5KGRhdGEsIGJ5dGVPZmZzZXQsIGxlbmd0aCl7XG4gICAgcmV0dXJuIGluaXQodGhpcywgZGF0YSwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcbiAgfTtcbn0pOyIsIi8vIDI2LjEuMSBSZWZsZWN0LmFwcGx5KHRhcmdldCwgdGhpc0FyZ3VtZW50LCBhcmd1bWVudHNMaXN0KVxudmFyICRleHBvcnQgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXG4gICwgYW5PYmplY3QgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCByQXBwbHkgICAgPSAocmVxdWlyZSgnLi9fZ2xvYmFsJykuUmVmbGVjdCB8fCB7fSkuYXBwbHlcbiAgLCBmQXBwbHkgICAgPSBGdW5jdGlvbi5hcHBseTtcbi8vIE1TIEVkZ2UgYXJndW1lbnRzTGlzdCBhcmd1bWVudCBpcyBvcHRpb25hbFxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByQXBwbHkoZnVuY3Rpb24oKXt9KTtcbn0pLCAnUmVmbGVjdCcsIHtcbiAgYXBwbHk6IGZ1bmN0aW9uIGFwcGx5KHRhcmdldCwgdGhpc0FyZ3VtZW50LCBhcmd1bWVudHNMaXN0KXtcbiAgICB2YXIgVCA9IGFGdW5jdGlvbih0YXJnZXQpXG4gICAgICAsIEwgPSBhbk9iamVjdChhcmd1bWVudHNMaXN0KTtcbiAgICByZXR1cm4gckFwcGx5ID8gckFwcGx5KFQsIHRoaXNBcmd1bWVudCwgTCkgOiBmQXBwbHkuY2FsbChULCB0aGlzQXJndW1lbnQsIEwpO1xuICB9XG59KTsiLCIvLyAyNi4xLjIgUmVmbGVjdC5jb25zdHJ1Y3QodGFyZ2V0LCBhcmd1bWVudHNMaXN0IFssIG5ld1RhcmdldF0pXG52YXIgJGV4cG9ydCAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgY3JlYXRlICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIGFGdW5jdGlvbiAgPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJylcbiAgLCBhbk9iamVjdCAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBpc09iamVjdCAgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBmYWlscyAgICAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAsIGJpbmQgICAgICAgPSByZXF1aXJlKCcuL19iaW5kJylcbiAgLCByQ29uc3RydWN0ID0gKHJlcXVpcmUoJy4vX2dsb2JhbCcpLlJlZmxlY3QgfHwge30pLmNvbnN0cnVjdDtcblxuLy8gTVMgRWRnZSBzdXBwb3J0cyBvbmx5IDIgYXJndW1lbnRzIGFuZCBhcmd1bWVudHNMaXN0IGFyZ3VtZW50IGlzIG9wdGlvbmFsXG4vLyBGRiBOaWdodGx5IHNldHMgdGhpcmQgYXJndW1lbnQgYXMgYG5ldy50YXJnZXRgLCBidXQgZG9lcyBub3QgY3JlYXRlIGB0aGlzYCBmcm9tIGl0XG52YXIgTkVXX1RBUkdFVF9CVUcgPSBmYWlscyhmdW5jdGlvbigpe1xuICBmdW5jdGlvbiBGKCl7fVxuICByZXR1cm4gIShyQ29uc3RydWN0KGZ1bmN0aW9uKCl7fSwgW10sIEYpIGluc3RhbmNlb2YgRik7XG59KTtcbnZhciBBUkdTX0JVRyA9ICFmYWlscyhmdW5jdGlvbigpe1xuICByQ29uc3RydWN0KGZ1bmN0aW9uKCl7fSk7XG59KTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoTkVXX1RBUkdFVF9CVUcgfHwgQVJHU19CVUcpLCAnUmVmbGVjdCcsIHtcbiAgY29uc3RydWN0OiBmdW5jdGlvbiBjb25zdHJ1Y3QoVGFyZ2V0LCBhcmdzIC8qLCBuZXdUYXJnZXQqLyl7XG4gICAgYUZ1bmN0aW9uKFRhcmdldCk7XG4gICAgYW5PYmplY3QoYXJncyk7XG4gICAgdmFyIG5ld1RhcmdldCA9IGFyZ3VtZW50cy5sZW5ndGggPCAzID8gVGFyZ2V0IDogYUZ1bmN0aW9uKGFyZ3VtZW50c1syXSk7XG4gICAgaWYoQVJHU19CVUcgJiYgIU5FV19UQVJHRVRfQlVHKXJldHVybiByQ29uc3RydWN0KFRhcmdldCwgYXJncywgbmV3VGFyZ2V0KTtcbiAgICBpZihUYXJnZXQgPT0gbmV3VGFyZ2V0KXtcbiAgICAgIC8vIHcvbyBhbHRlcmVkIG5ld1RhcmdldCwgb3B0aW1pemF0aW9uIGZvciAwLTQgYXJndW1lbnRzXG4gICAgICBzd2l0Y2goYXJncy5sZW5ndGgpe1xuICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgVGFyZ2V0O1xuICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgVGFyZ2V0KGFyZ3NbMF0pO1xuICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgVGFyZ2V0KGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICBjYXNlIDM6IHJldHVybiBuZXcgVGFyZ2V0KGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgICAgICBjYXNlIDQ6IHJldHVybiBuZXcgVGFyZ2V0KGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICAgICAgfVxuICAgICAgLy8gdy9vIGFsdGVyZWQgbmV3VGFyZ2V0LCBsb3Qgb2YgYXJndW1lbnRzIGNhc2VcbiAgICAgIHZhciAkYXJncyA9IFtudWxsXTtcbiAgICAgICRhcmdzLnB1c2guYXBwbHkoJGFyZ3MsIGFyZ3MpO1xuICAgICAgcmV0dXJuIG5ldyAoYmluZC5hcHBseShUYXJnZXQsICRhcmdzKSk7XG4gICAgfVxuICAgIC8vIHdpdGggYWx0ZXJlZCBuZXdUYXJnZXQsIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGNvbnN0cnVjdG9yc1xuICAgIHZhciBwcm90byAgICA9IG5ld1RhcmdldC5wcm90b3R5cGVcbiAgICAgICwgaW5zdGFuY2UgPSBjcmVhdGUoaXNPYmplY3QocHJvdG8pID8gcHJvdG8gOiBPYmplY3QucHJvdG90eXBlKVxuICAgICAgLCByZXN1bHQgICA9IEZ1bmN0aW9uLmFwcGx5LmNhbGwoVGFyZ2V0LCBpbnN0YW5jZSwgYXJncyk7XG4gICAgcmV0dXJuIGlzT2JqZWN0KHJlc3VsdCkgPyByZXN1bHQgOiBpbnN0YW5jZTtcbiAgfVxufSk7IiwiLy8gMjYuMS4zIFJlZmxlY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eUtleSwgYXR0cmlidXRlcylcbnZhciBkUCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgJGV4cG9ydCAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xuXG4vLyBNUyBFZGdlIGhhcyBicm9rZW4gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSAtIHRocm93aW5nIGluc3RlYWQgb2YgcmV0dXJuaW5nIGZhbHNlXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShkUC5mKHt9LCAxLCB7dmFsdWU6IDF9KSwgMSwge3ZhbHVlOiAyfSk7XG59KSwgJ1JlZmxlY3QnLCB7XG4gIGRlZmluZVByb3BlcnR5OiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5S2V5LCBhdHRyaWJ1dGVzKXtcbiAgICBhbk9iamVjdCh0YXJnZXQpO1xuICAgIHByb3BlcnR5S2V5ID0gdG9QcmltaXRpdmUocHJvcGVydHlLZXksIHRydWUpO1xuICAgIGFuT2JqZWN0KGF0dHJpYnV0ZXMpO1xuICAgIHRyeSB7XG4gICAgICBkUC5mKHRhcmdldCwgcHJvcGVydHlLZXksIGF0dHJpYnV0ZXMpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn0pOyIsIi8vIDI2LjEuNCBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHlLZXkpXG52YXIgJGV4cG9ydCAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGdPUEQgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKS5mXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdSZWZsZWN0Jywge1xuICBkZWxldGVQcm9wZXJ0eTogZnVuY3Rpb24gZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eUtleSl7XG4gICAgdmFyIGRlc2MgPSBnT1BEKGFuT2JqZWN0KHRhcmdldCksIHByb3BlcnR5S2V5KTtcbiAgICByZXR1cm4gZGVzYyAmJiAhZGVzYy5jb25maWd1cmFibGUgPyBmYWxzZSA6IGRlbGV0ZSB0YXJnZXRbcHJvcGVydHlLZXldO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyAyNi4xLjUgUmVmbGVjdC5lbnVtZXJhdGUodGFyZ2V0KVxudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIEVudW1lcmF0ZSA9IGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgdGhpcy5fdCA9IGFuT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdmFyIGtleXMgPSB0aGlzLl9rID0gW10gICAgICAgLy8ga2V5c1xuICAgICwga2V5O1xuICBmb3Ioa2V5IGluIGl0ZXJhdGVkKWtleXMucHVzaChrZXkpO1xufTtcbnJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJykoRW51bWVyYXRlLCAnT2JqZWN0JywgZnVuY3Rpb24oKXtcbiAgdmFyIHRoYXQgPSB0aGlzXG4gICAgLCBrZXlzID0gdGhhdC5fa1xuICAgICwga2V5O1xuICBkbyB7XG4gICAgaWYodGhhdC5faSA+PSBrZXlzLmxlbmd0aClyZXR1cm4ge3ZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWV9O1xuICB9IHdoaWxlKCEoKGtleSA9IGtleXNbdGhhdC5faSsrXSkgaW4gdGhhdC5fdCkpO1xuICByZXR1cm4ge3ZhbHVlOiBrZXksIGRvbmU6IGZhbHNlfTtcbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7XG4gIGVudW1lcmF0ZTogZnVuY3Rpb24gZW51bWVyYXRlKHRhcmdldCl7XG4gICAgcmV0dXJuIG5ldyBFbnVtZXJhdGUodGFyZ2V0KTtcbiAgfVxufSk7IiwiLy8gMjYuMS42IFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcGVydHlLZXkgWywgcmVjZWl2ZXJdKVxudmFyIGdPUEQgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKVxuICAsIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBpc09iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcblxuZnVuY3Rpb24gZ2V0KHRhcmdldCwgcHJvcGVydHlLZXkvKiwgcmVjZWl2ZXIqLyl7XG4gIHZhciByZWNlaXZlciA9IGFyZ3VtZW50cy5sZW5ndGggPCAzID8gdGFyZ2V0IDogYXJndW1lbnRzWzJdXG4gICAgLCBkZXNjLCBwcm90bztcbiAgaWYoYW5PYmplY3QodGFyZ2V0KSA9PT0gcmVjZWl2ZXIpcmV0dXJuIHRhcmdldFtwcm9wZXJ0eUtleV07XG4gIGlmKGRlc2MgPSBnT1BELmYodGFyZ2V0LCBwcm9wZXJ0eUtleSkpcmV0dXJuIGhhcyhkZXNjLCAndmFsdWUnKVxuICAgID8gZGVzYy52YWx1ZVxuICAgIDogZGVzYy5nZXQgIT09IHVuZGVmaW5lZFxuICAgICAgPyBkZXNjLmdldC5jYWxsKHJlY2VpdmVyKVxuICAgICAgOiB1bmRlZmluZWQ7XG4gIGlmKGlzT2JqZWN0KHByb3RvID0gZ2V0UHJvdG90eXBlT2YodGFyZ2V0KSkpcmV0dXJuIGdldChwcm90bywgcHJvcGVydHlLZXksIHJlY2VpdmVyKTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LlMsICdSZWZsZWN0Jywge2dldDogZ2V0fSk7IiwiLy8gMjYuMS43IFJlZmxlY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgcHJvcGVydHlLZXkpXG52YXIgZ09QRCAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpXG4gICwgJGV4cG9ydCAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBwcm9wZXJ0eUtleSl7XG4gICAgcmV0dXJuIGdPUEQuZihhbk9iamVjdCh0YXJnZXQpLCBwcm9wZXJ0eUtleSk7XG4gIH1cbn0pOyIsIi8vIDI2LjEuOCBSZWZsZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldClcbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgZ2V0UHJvdG8gPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7XG4gIGdldFByb3RvdHlwZU9mOiBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZih0YXJnZXQpe1xuICAgIHJldHVybiBnZXRQcm90byhhbk9iamVjdCh0YXJnZXQpKTtcbiAgfVxufSk7IiwiLy8gMjYuMS45IFJlZmxlY3QuaGFzKHRhcmdldCwgcHJvcGVydHlLZXkpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7XG4gIGhhczogZnVuY3Rpb24gaGFzKHRhcmdldCwgcHJvcGVydHlLZXkpe1xuICAgIHJldHVybiBwcm9wZXJ0eUtleSBpbiB0YXJnZXQ7XG4gIH1cbn0pOyIsIi8vIDI2LjEuMTAgUmVmbGVjdC5pc0V4dGVuc2libGUodGFyZ2V0KVxudmFyICRleHBvcnQgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGFuT2JqZWN0ICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsICRpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7XG4gIGlzRXh0ZW5zaWJsZTogZnVuY3Rpb24gaXNFeHRlbnNpYmxlKHRhcmdldCl7XG4gICAgYW5PYmplY3QodGFyZ2V0KTtcbiAgICByZXR1cm4gJGlzRXh0ZW5zaWJsZSA/ICRpc0V4dGVuc2libGUodGFyZ2V0KSA6IHRydWU7XG4gIH1cbn0pOyIsIi8vIGFsbCBvYmplY3Qga2V5cywgaW5jbHVkZXMgbm9uLWVudW1lcmFibGUgYW5kIHN5bWJvbHNcbnZhciBnT1BOICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJylcbiAgLCBnT1BTICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgUmVmbGVjdCAgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5SZWZsZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBSZWZsZWN0ICYmIFJlZmxlY3Qub3duS2V5cyB8fCBmdW5jdGlvbiBvd25LZXlzKGl0KXtcbiAgdmFyIGtleXMgICAgICAgPSBnT1BOLmYoYW5PYmplY3QoaXQpKVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgcmV0dXJuIGdldFN5bWJvbHMgPyBrZXlzLmNvbmNhdChnZXRTeW1ib2xzKGl0KSkgOiBrZXlzO1xufTsiLCIvLyAyNi4xLjExIFJlZmxlY3Qub3duS2V5cyh0YXJnZXQpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCB7b3duS2V5czogcmVxdWlyZSgnLi9fb3duLWtleXMnKX0pOyIsIi8vIDI2LjEuMTIgUmVmbGVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh0YXJnZXQpXG52YXIgJGV4cG9ydCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBhbk9iamVjdCAgICAgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsICRwcmV2ZW50RXh0ZW5zaW9ucyA9IE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucztcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdSZWZsZWN0Jywge1xuICBwcmV2ZW50RXh0ZW5zaW9uczogZnVuY3Rpb24gcHJldmVudEV4dGVuc2lvbnModGFyZ2V0KXtcbiAgICBhbk9iamVjdCh0YXJnZXQpO1xuICAgIHRyeSB7XG4gICAgICBpZigkcHJldmVudEV4dGVuc2lvbnMpJHByZXZlbnRFeHRlbnNpb25zKHRhcmdldCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufSk7IiwiLy8gMjYuMS4xMyBSZWZsZWN0LnNldCh0YXJnZXQsIHByb3BlcnR5S2V5LCBWIFssIHJlY2VpdmVyXSlcbnZhciBkUCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgZ09QRCAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpXG4gICwgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGNyZWF0ZURlc2MgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGlzT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5cbmZ1bmN0aW9uIHNldCh0YXJnZXQsIHByb3BlcnR5S2V5LCBWLyosIHJlY2VpdmVyKi8pe1xuICB2YXIgcmVjZWl2ZXIgPSBhcmd1bWVudHMubGVuZ3RoIDwgNCA/IHRhcmdldCA6IGFyZ3VtZW50c1szXVxuICAgICwgb3duRGVzYyAgPSBnT1BELmYoYW5PYmplY3QodGFyZ2V0KSwgcHJvcGVydHlLZXkpXG4gICAgLCBleGlzdGluZ0Rlc2NyaXB0b3IsIHByb3RvO1xuICBpZighb3duRGVzYyl7XG4gICAgaWYoaXNPYmplY3QocHJvdG8gPSBnZXRQcm90b3R5cGVPZih0YXJnZXQpKSl7XG4gICAgICByZXR1cm4gc2V0KHByb3RvLCBwcm9wZXJ0eUtleSwgViwgcmVjZWl2ZXIpO1xuICAgIH1cbiAgICBvd25EZXNjID0gY3JlYXRlRGVzYygwKTtcbiAgfVxuICBpZihoYXMob3duRGVzYywgJ3ZhbHVlJykpe1xuICAgIGlmKG93bkRlc2Mud3JpdGFibGUgPT09IGZhbHNlIHx8ICFpc09iamVjdChyZWNlaXZlcikpcmV0dXJuIGZhbHNlO1xuICAgIGV4aXN0aW5nRGVzY3JpcHRvciA9IGdPUEQuZihyZWNlaXZlciwgcHJvcGVydHlLZXkpIHx8IGNyZWF0ZURlc2MoMCk7XG4gICAgZXhpc3RpbmdEZXNjcmlwdG9yLnZhbHVlID0gVjtcbiAgICBkUC5mKHJlY2VpdmVyLCBwcm9wZXJ0eUtleSwgZXhpc3RpbmdEZXNjcmlwdG9yKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gb3duRGVzYy5zZXQgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogKG93bkRlc2Muc2V0LmNhbGwocmVjZWl2ZXIsIFYpLCB0cnVlKTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LlMsICdSZWZsZWN0Jywge3NldDogc2V0fSk7IiwiLy8gMjYuMS4xNCBSZWZsZWN0LnNldFByb3RvdHlwZU9mKHRhcmdldCwgcHJvdG8pXG52YXIgJGV4cG9ydCAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHNldFByb3RvID0gcmVxdWlyZSgnLi9fc2V0LXByb3RvJyk7XG5cbmlmKHNldFByb3RvKSRleHBvcnQoJGV4cG9ydC5TLCAnUmVmbGVjdCcsIHtcbiAgc2V0UHJvdG90eXBlT2Y6IGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKHRhcmdldCwgcHJvdG8pe1xuICAgIHNldFByb3RvLmNoZWNrKHRhcmdldCwgcHJvdG8pO1xuICAgIHRyeSB7XG4gICAgICBzZXRQcm90by5zZXQodGFyZ2V0LCBwcm90byk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzXG52YXIgJGV4cG9ydCAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkaW5jbHVkZXMgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKHRydWUpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCwgJ0FycmF5Jywge1xuICBpbmNsdWRlczogZnVuY3Rpb24gaW5jbHVkZXMoZWwgLyosIGZyb21JbmRleCA9IDAgKi8pe1xuICAgIHJldHVybiAkaW5jbHVkZXModGhpcywgZWwsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG5cbnJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpKCdpbmNsdWRlcycpOyIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL1N0cmluZy5wcm90b3R5cGUuYXRcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkYXQgICAgID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbiRleHBvcnQoJGV4cG9ydC5QLCAnU3RyaW5nJywge1xuICBhdDogZnVuY3Rpb24gYXQocG9zKXtcbiAgICByZXR1cm4gJGF0KHRoaXMsIHBvcyk7XG4gIH1cbn0pOyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXN0cmluZy1wYWQtc3RhcnQtZW5kXG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIHJlcGVhdCAgID0gcmVxdWlyZSgnLi9fc3RyaW5nLXJlcGVhdCcpXG4gICwgZGVmaW5lZCAgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGhhdCwgbWF4TGVuZ3RoLCBmaWxsU3RyaW5nLCBsZWZ0KXtcbiAgdmFyIFMgICAgICAgICAgICA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKVxuICAgICwgc3RyaW5nTGVuZ3RoID0gUy5sZW5ndGhcbiAgICAsIGZpbGxTdHIgICAgICA9IGZpbGxTdHJpbmcgPT09IHVuZGVmaW5lZCA/ICcgJyA6IFN0cmluZyhmaWxsU3RyaW5nKVxuICAgICwgaW50TWF4TGVuZ3RoID0gdG9MZW5ndGgobWF4TGVuZ3RoKTtcbiAgaWYoaW50TWF4TGVuZ3RoIDw9IHN0cmluZ0xlbmd0aCB8fCBmaWxsU3RyID09ICcnKXJldHVybiBTO1xuICB2YXIgZmlsbExlbiA9IGludE1heExlbmd0aCAtIHN0cmluZ0xlbmd0aFxuICAgICwgc3RyaW5nRmlsbGVyID0gcmVwZWF0LmNhbGwoZmlsbFN0ciwgTWF0aC5jZWlsKGZpbGxMZW4gLyBmaWxsU3RyLmxlbmd0aCkpO1xuICBpZihzdHJpbmdGaWxsZXIubGVuZ3RoID4gZmlsbExlbilzdHJpbmdGaWxsZXIgPSBzdHJpbmdGaWxsZXIuc2xpY2UoMCwgZmlsbExlbik7XG4gIHJldHVybiBsZWZ0ID8gc3RyaW5nRmlsbGVyICsgUyA6IFMgKyBzdHJpbmdGaWxsZXI7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtc3RyaW5nLXBhZC1zdGFydC1lbmRcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkcGFkICAgID0gcmVxdWlyZSgnLi9fc3RyaW5nLXBhZCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCwgJ1N0cmluZycsIHtcbiAgcGFkU3RhcnQ6IGZ1bmN0aW9uIHBhZFN0YXJ0KG1heExlbmd0aCAvKiwgZmlsbFN0cmluZyA9ICcgJyAqLyl7XG4gICAgcmV0dXJuICRwYWQodGhpcywgbWF4TGVuZ3RoLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgdHJ1ZSk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXN0cmluZy1wYWQtc3RhcnQtZW5kXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJHBhZCAgICA9IHJlcXVpcmUoJy4vX3N0cmluZy1wYWQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAsICdTdHJpbmcnLCB7XG4gIHBhZEVuZDogZnVuY3Rpb24gcGFkRW5kKG1heExlbmd0aCAvKiwgZmlsbFN0cmluZyA9ICcgJyAqLyl7XG4gICAgcmV0dXJuICRwYWQodGhpcywgbWF4TGVuZ3RoLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgZmFsc2UpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vc2VibWFya2JhZ2UvZWNtYXNjcmlwdC1zdHJpbmctbGVmdC1yaWdodC10cmltXG5yZXF1aXJlKCcuL19zdHJpbmctdHJpbScpKCd0cmltTGVmdCcsIGZ1bmN0aW9uKCR0cmltKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHRyaW1MZWZ0KCl7XG4gICAgcmV0dXJuICR0cmltKHRoaXMsIDEpO1xuICB9O1xufSwgJ3RyaW1TdGFydCcpOyIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zZWJtYXJrYmFnZS9lY21hc2NyaXB0LXN0cmluZy1sZWZ0LXJpZ2h0LXRyaW1cbnJlcXVpcmUoJy4vX3N0cmluZy10cmltJykoJ3RyaW1SaWdodCcsIGZ1bmN0aW9uKCR0cmltKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHRyaW1SaWdodCgpe1xuICAgIHJldHVybiAkdHJpbSh0aGlzLCAyKTtcbiAgfTtcbn0sICd0cmltRW5kJyk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9TdHJpbmcucHJvdG90eXBlLm1hdGNoQWxsL1xudmFyICRleHBvcnQgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBkZWZpbmVkICAgICA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKVxuICAsIHRvTGVuZ3RoICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBpc1JlZ0V4cCAgICA9IHJlcXVpcmUoJy4vX2lzLXJlZ2V4cCcpXG4gICwgZ2V0RmxhZ3MgICAgPSByZXF1aXJlKCcuL19mbGFncycpXG4gICwgUmVnRXhwUHJvdG8gPSBSZWdFeHAucHJvdG90eXBlO1xuXG52YXIgJFJlZ0V4cFN0cmluZ0l0ZXJhdG9yID0gZnVuY3Rpb24ocmVnZXhwLCBzdHJpbmcpe1xuICB0aGlzLl9yID0gcmVnZXhwO1xuICB0aGlzLl9zID0gc3RyaW5nO1xufTtcblxucmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKSgkUmVnRXhwU3RyaW5nSXRlcmF0b3IsICdSZWdFeHAgU3RyaW5nJywgZnVuY3Rpb24gbmV4dCgpe1xuICB2YXIgbWF0Y2ggPSB0aGlzLl9yLmV4ZWModGhpcy5fcyk7XG4gIHJldHVybiB7dmFsdWU6IG1hdGNoLCBkb25lOiBtYXRjaCA9PT0gbnVsbH07XG59KTtcblxuJGV4cG9ydCgkZXhwb3J0LlAsICdTdHJpbmcnLCB7XG4gIG1hdGNoQWxsOiBmdW5jdGlvbiBtYXRjaEFsbChyZWdleHApe1xuICAgIGRlZmluZWQodGhpcyk7XG4gICAgaWYoIWlzUmVnRXhwKHJlZ2V4cCkpdGhyb3cgVHlwZUVycm9yKHJlZ2V4cCArICcgaXMgbm90IGEgcmVnZXhwIScpO1xuICAgIHZhciBTICAgICA9IFN0cmluZyh0aGlzKVxuICAgICAgLCBmbGFncyA9ICdmbGFncycgaW4gUmVnRXhwUHJvdG8gPyBTdHJpbmcocmVnZXhwLmZsYWdzKSA6IGdldEZsYWdzLmNhbGwocmVnZXhwKVxuICAgICAgLCByeCAgICA9IG5ldyBSZWdFeHAocmVnZXhwLnNvdXJjZSwgfmZsYWdzLmluZGV4T2YoJ2cnKSA/IGZsYWdzIDogJ2cnICsgZmxhZ3MpO1xuICAgIHJ4Lmxhc3RJbmRleCA9IHRvTGVuZ3RoKHJlZ2V4cC5sYXN0SW5kZXgpO1xuICAgIHJldHVybiBuZXcgJFJlZ0V4cFN0cmluZ0l0ZXJhdG9yKHJ4LCBTKTtcbiAgfVxufSk7IiwicmVxdWlyZSgnLi9fd2tzLWRlZmluZScpKCdhc3luY0l0ZXJhdG9yJyk7IiwicmVxdWlyZSgnLi9fd2tzLWRlZmluZScpKCdvYnNlcnZhYmxlJyk7IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvcnNcbnZhciAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgb3duS2V5cyAgICAgICAgPSByZXF1aXJlKCcuL19vd24ta2V5cycpXG4gICwgdG9JT2JqZWN0ICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBnT1BEICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJylcbiAgLCBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2NyZWF0ZS1wcm9wZXJ0eScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yczogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvYmplY3Qpe1xuICAgIHZhciBPICAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAgICwgZ2V0RGVzYyA9IGdPUEQuZlxuICAgICAgLCBrZXlzICAgID0gb3duS2V5cyhPKVxuICAgICAgLCByZXN1bHQgID0ge31cbiAgICAgICwgaSAgICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKGtleXMubGVuZ3RoID4gaSljcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGtleSA9IGtleXNbaSsrXSwgZ2V0RGVzYyhPLCBrZXkpKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTsiLCJ2YXIgZ2V0S2V5cyAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIGlzRW51bSAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpc0VudHJpZXMpe1xuICByZXR1cm4gZnVuY3Rpb24oaXQpe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QoaXQpXG4gICAgICAsIGtleXMgICA9IGdldEtleXMoTylcbiAgICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAgICwgaSAgICAgID0gMFxuICAgICAgLCByZXN1bHQgPSBbXVxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUobGVuZ3RoID4gaSlpZihpc0VudW0uY2FsbChPLCBrZXkgPSBrZXlzW2krK10pKXtcbiAgICAgIHJlc3VsdC5wdXNoKGlzRW50cmllcyA/IFtrZXksIE9ba2V5XV0gOiBPW2tleV0pO1xuICAgIH0gcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn07IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtb2JqZWN0LXZhbHVlcy1lbnRyaWVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJHZhbHVlcyA9IHJlcXVpcmUoJy4vX29iamVjdC10by1hcnJheScpKGZhbHNlKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7XG4gIHZhbHVlczogZnVuY3Rpb24gdmFsdWVzKGl0KXtcbiAgICByZXR1cm4gJHZhbHVlcyhpdCk7XG4gIH1cbn0pOyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLW9iamVjdC12YWx1ZXMtZW50cmllc1xudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkZW50cmllcyA9IHJlcXVpcmUoJy4vX29iamVjdC10by1hcnJheScpKHRydWUpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtcbiAgZW50cmllczogZnVuY3Rpb24gZW50cmllcyhpdCl7XG4gICAgcmV0dXJuICRlbnRyaWVzKGl0KTtcbiAgfVxufSk7IiwiLy8gRm9yY2VkIHJlcGxhY2VtZW50IHByb3RvdHlwZSBhY2Nlc3NvcnMgbWV0aG9kc1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyl8fCAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICB2YXIgSyA9IE1hdGgucmFuZG9tKCk7XG4gIC8vIEluIEZGIHRocm93cyBvbmx5IGRlZmluZSBtZXRob2RzXG4gIF9fZGVmaW5lU2V0dGVyX18uY2FsbChudWxsLCBLLCBmdW5jdGlvbigpeyAvKiBlbXB0eSAqL30pO1xuICBkZWxldGUgcmVxdWlyZSgnLi9fZ2xvYmFsJylbS107XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCAgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCB0b09iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIGFGdW5jdGlvbiAgICAgICA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsICRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xuXG4vLyBCLjIuMi4yIE9iamVjdC5wcm90b3R5cGUuX19kZWZpbmVHZXR0ZXJfXyhQLCBnZXR0ZXIpXG5yZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICRleHBvcnQoJGV4cG9ydC5QICsgcmVxdWlyZSgnLi9fb2JqZWN0LWZvcmNlZC1wYW0nKSwgJ09iamVjdCcsIHtcbiAgX19kZWZpbmVHZXR0ZXJfXzogZnVuY3Rpb24gX19kZWZpbmVHZXR0ZXJfXyhQLCBnZXR0ZXIpe1xuICAgICRkZWZpbmVQcm9wZXJ0eS5mKHRvT2JqZWN0KHRoaXMpLCBQLCB7Z2V0OiBhRnVuY3Rpb24oZ2V0dGVyKSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlfSk7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ICAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHRvT2JqZWN0ICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgYUZ1bmN0aW9uICAgICAgID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpXG4gICwgJGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG5cbi8vIEIuMi4yLjMgT2JqZWN0LnByb3RvdHlwZS5fX2RlZmluZVNldHRlcl9fKFAsIHNldHRlcilcbnJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgJGV4cG9ydCgkZXhwb3J0LlAgKyByZXF1aXJlKCcuL19vYmplY3QtZm9yY2VkLXBhbScpLCAnT2JqZWN0Jywge1xuICBfX2RlZmluZVNldHRlcl9fOiBmdW5jdGlvbiBfX2RlZmluZVNldHRlcl9fKFAsIHNldHRlcil7XG4gICAgJGRlZmluZVByb3BlcnR5LmYodG9PYmplY3QodGhpcyksIFAsIHtzZXQ6IGFGdW5jdGlvbihzZXR0ZXIpLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWV9KTtcbiAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgdG9PYmplY3QgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCB0b1ByaW1pdGl2ZSAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGdldFByb3RvdHlwZU9mICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKVxuICAsIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZjtcblxuLy8gQi4yLjIuNCBPYmplY3QucHJvdG90eXBlLl9fbG9va3VwR2V0dGVyX18oUClcbnJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgJGV4cG9ydCgkZXhwb3J0LlAgKyByZXF1aXJlKCcuL19vYmplY3QtZm9yY2VkLXBhbScpLCAnT2JqZWN0Jywge1xuICBfX2xvb2t1cEdldHRlcl9fOiBmdW5jdGlvbiBfX2xvb2t1cEdldHRlcl9fKFApe1xuICAgIHZhciBPID0gdG9PYmplY3QodGhpcylcbiAgICAgICwgSyA9IHRvUHJpbWl0aXZlKFAsIHRydWUpXG4gICAgICAsIEQ7XG4gICAgZG8ge1xuICAgICAgaWYoRCA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBLKSlyZXR1cm4gRC5nZXQ7XG4gICAgfSB3aGlsZShPID0gZ2V0UHJvdG90eXBlT2YoTykpO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCB0b09iamVjdCAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZ2V0UHJvdG90eXBlT2YgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKS5mO1xuXG4vLyBCLjIuMi41IE9iamVjdC5wcm90b3R5cGUuX19sb29rdXBTZXR0ZXJfXyhQKVxucmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAkZXhwb3J0KCRleHBvcnQuUCArIHJlcXVpcmUoJy4vX29iamVjdC1mb3JjZWQtcGFtJyksICdPYmplY3QnLCB7XG4gIF9fbG9va3VwU2V0dGVyX186IGZ1bmN0aW9uIF9fbG9va3VwU2V0dGVyX18oUCl7XG4gICAgdmFyIE8gPSB0b09iamVjdCh0aGlzKVxuICAgICAgLCBLID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSlcbiAgICAgICwgRDtcbiAgICBkbyB7XG4gICAgICBpZihEID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIEspKXJldHVybiBELnNldDtcbiAgICB9IHdoaWxlKE8gPSBnZXRQcm90b3R5cGVPZihPKSk7XG4gIH1cbn0pOyIsInZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXIsIElURVJBVE9SKXtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3JPZihpdGVyLCBmYWxzZSwgcmVzdWx0LnB1c2gsIHJlc3VsdCwgSVRFUkFUT1IpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgZnJvbSAgICA9IHJlcXVpcmUoJy4vX2FycmF5LWZyb20taXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTkFNRSl7XG4gIHJldHVybiBmdW5jdGlvbiB0b0pTT04oKXtcbiAgICBpZihjbGFzc29mKHRoaXMpICE9IE5BTUUpdGhyb3cgVHlwZUVycm9yKE5BTUUgKyBcIiN0b0pTT04gaXNuJ3QgZ2VuZXJpY1wiKTtcbiAgICByZXR1cm4gZnJvbSh0aGlzKTtcbiAgfTtcbn07IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL0RhdmlkQnJ1YW50L01hcC1TZXQucHJvdG90eXBlLnRvSlNPTlxudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5SLCAnTWFwJywge3RvSlNPTjogcmVxdWlyZSgnLi9fY29sbGVjdGlvbi10by1qc29uJykoJ01hcCcpfSk7IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL0RhdmlkQnJ1YW50L01hcC1TZXQucHJvdG90eXBlLnRvSlNPTlxudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5SLCAnU2V0Jywge3RvSlNPTjogcmVxdWlyZSgnLi9fY29sbGVjdGlvbi10by1qc29uJykoJ1NldCcpfSk7IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL2xqaGFyYi9wcm9wb3NhbC1nbG9iYWxcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnU3lzdGVtJywge2dsb2JhbDogcmVxdWlyZSgnLi9fZ2xvYmFsJyl9KTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vbGpoYXJiL3Byb3Bvc2FsLWlzLWVycm9yXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgY29mICAgICA9IHJlcXVpcmUoJy4vX2NvZicpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ0Vycm9yJywge1xuICBpc0Vycm9yOiBmdW5jdGlvbiBpc0Vycm9yKGl0KXtcbiAgICByZXR1cm4gY29mKGl0KSA9PT0gJ0Vycm9yJztcbiAgfVxufSk7IiwiLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vQnJlbmRhbkVpY2gvNDI5NGQ1YzIxMmE2ZDIyNTQ3MDNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgaWFkZGg6IGZ1bmN0aW9uIGlhZGRoKHgwLCB4MSwgeTAsIHkxKXtcbiAgICB2YXIgJHgwID0geDAgPj4+IDBcbiAgICAgICwgJHgxID0geDEgPj4+IDBcbiAgICAgICwgJHkwID0geTAgPj4+IDA7XG4gICAgcmV0dXJuICR4MSArICh5MSA+Pj4gMCkgKyAoKCR4MCAmICR5MCB8ICgkeDAgfCAkeTApICYgfigkeDAgKyAkeTAgPj4+IDApKSA+Pj4gMzEpIHwgMDtcbiAgfVxufSk7IiwiLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vQnJlbmRhbkVpY2gvNDI5NGQ1YzIxMmE2ZDIyNTQ3MDNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgaXN1Ymg6IGZ1bmN0aW9uIGlzdWJoKHgwLCB4MSwgeTAsIHkxKXtcbiAgICB2YXIgJHgwID0geDAgPj4+IDBcbiAgICAgICwgJHgxID0geDEgPj4+IDBcbiAgICAgICwgJHkwID0geTAgPj4+IDA7XG4gICAgcmV0dXJuICR4MSAtICh5MSA+Pj4gMCkgLSAoKH4keDAgJiAkeTAgfCB+KCR4MCBeICR5MCkgJiAkeDAgLSAkeTAgPj4+IDApID4+PiAzMSkgfCAwO1xuICB9XG59KTsiLCIvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9CcmVuZGFuRWljaC80Mjk0ZDVjMjEyYTZkMjI1NDcwM1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICBpbXVsaDogZnVuY3Rpb24gaW11bGgodSwgdil7XG4gICAgdmFyIFVJTlQxNiA9IDB4ZmZmZlxuICAgICAgLCAkdSA9ICt1XG4gICAgICAsICR2ID0gK3ZcbiAgICAgICwgdTAgPSAkdSAmIFVJTlQxNlxuICAgICAgLCB2MCA9ICR2ICYgVUlOVDE2XG4gICAgICAsIHUxID0gJHUgPj4gMTZcbiAgICAgICwgdjEgPSAkdiA+PiAxNlxuICAgICAgLCB0ICA9ICh1MSAqIHYwID4+PiAwKSArICh1MCAqIHYwID4+PiAxNik7XG4gICAgcmV0dXJuIHUxICogdjEgKyAodCA+PiAxNikgKyAoKHUwICogdjEgPj4+IDApICsgKHQgJiBVSU5UMTYpID4+IDE2KTtcbiAgfVxufSk7IiwiLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vQnJlbmRhbkVpY2gvNDI5NGQ1YzIxMmE2ZDIyNTQ3MDNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgdW11bGg6IGZ1bmN0aW9uIHVtdWxoKHUsIHYpe1xuICAgIHZhciBVSU5UMTYgPSAweGZmZmZcbiAgICAgICwgJHUgPSArdVxuICAgICAgLCAkdiA9ICt2XG4gICAgICAsIHUwID0gJHUgJiBVSU5UMTZcbiAgICAgICwgdjAgPSAkdiAmIFVJTlQxNlxuICAgICAgLCB1MSA9ICR1ID4+PiAxNlxuICAgICAgLCB2MSA9ICR2ID4+PiAxNlxuICAgICAgLCB0ICA9ICh1MSAqIHYwID4+PiAwKSArICh1MCAqIHYwID4+PiAxNik7XG4gICAgcmV0dXJuIHUxICogdjEgKyAodCA+Pj4gMTYpICsgKCh1MCAqIHYxID4+PiAwKSArICh0ICYgVUlOVDE2KSA+Pj4gMTYpO1xuICB9XG59KTsiLCJ2YXIgTWFwICAgICA9IHJlcXVpcmUoJy4vZXM2Lm1hcCcpXG4gICwgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgc2hhcmVkICA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdtZXRhZGF0YScpXG4gICwgc3RvcmUgICA9IHNoYXJlZC5zdG9yZSB8fCAoc2hhcmVkLnN0b3JlID0gbmV3IChyZXF1aXJlKCcuL2VzNi53ZWFrLW1hcCcpKSk7XG5cbnZhciBnZXRPckNyZWF0ZU1ldGFkYXRhTWFwID0gZnVuY3Rpb24odGFyZ2V0LCB0YXJnZXRLZXksIGNyZWF0ZSl7XG4gIHZhciB0YXJnZXRNZXRhZGF0YSA9IHN0b3JlLmdldCh0YXJnZXQpO1xuICBpZighdGFyZ2V0TWV0YWRhdGEpe1xuICAgIGlmKCFjcmVhdGUpcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBzdG9yZS5zZXQodGFyZ2V0LCB0YXJnZXRNZXRhZGF0YSA9IG5ldyBNYXApO1xuICB9XG4gIHZhciBrZXlNZXRhZGF0YSA9IHRhcmdldE1ldGFkYXRhLmdldCh0YXJnZXRLZXkpO1xuICBpZigha2V5TWV0YWRhdGEpe1xuICAgIGlmKCFjcmVhdGUpcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB0YXJnZXRNZXRhZGF0YS5zZXQodGFyZ2V0S2V5LCBrZXlNZXRhZGF0YSA9IG5ldyBNYXApO1xuICB9IHJldHVybiBrZXlNZXRhZGF0YTtcbn07XG52YXIgb3JkaW5hcnlIYXNPd25NZXRhZGF0YSA9IGZ1bmN0aW9uKE1ldGFkYXRhS2V5LCBPLCBQKXtcbiAgdmFyIG1ldGFkYXRhTWFwID0gZ2V0T3JDcmVhdGVNZXRhZGF0YU1hcChPLCBQLCBmYWxzZSk7XG4gIHJldHVybiBtZXRhZGF0YU1hcCA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBtZXRhZGF0YU1hcC5oYXMoTWV0YWRhdGFLZXkpO1xufTtcbnZhciBvcmRpbmFyeUdldE93bk1ldGFkYXRhID0gZnVuY3Rpb24oTWV0YWRhdGFLZXksIE8sIFApe1xuICB2YXIgbWV0YWRhdGFNYXAgPSBnZXRPckNyZWF0ZU1ldGFkYXRhTWFwKE8sIFAsIGZhbHNlKTtcbiAgcmV0dXJuIG1ldGFkYXRhTWFwID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBtZXRhZGF0YU1hcC5nZXQoTWV0YWRhdGFLZXkpO1xufTtcbnZhciBvcmRpbmFyeURlZmluZU93bk1ldGFkYXRhID0gZnVuY3Rpb24oTWV0YWRhdGFLZXksIE1ldGFkYXRhVmFsdWUsIE8sIFApe1xuICBnZXRPckNyZWF0ZU1ldGFkYXRhTWFwKE8sIFAsIHRydWUpLnNldChNZXRhZGF0YUtleSwgTWV0YWRhdGFWYWx1ZSk7XG59O1xudmFyIG9yZGluYXJ5T3duTWV0YWRhdGFLZXlzID0gZnVuY3Rpb24odGFyZ2V0LCB0YXJnZXRLZXkpe1xuICB2YXIgbWV0YWRhdGFNYXAgPSBnZXRPckNyZWF0ZU1ldGFkYXRhTWFwKHRhcmdldCwgdGFyZ2V0S2V5LCBmYWxzZSlcbiAgICAsIGtleXMgICAgICAgID0gW107XG4gIGlmKG1ldGFkYXRhTWFwKW1ldGFkYXRhTWFwLmZvckVhY2goZnVuY3Rpb24oXywga2V5KXsga2V5cy5wdXNoKGtleSk7IH0pO1xuICByZXR1cm4ga2V5cztcbn07XG52YXIgdG9NZXRhS2V5ID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6IFN0cmluZyhpdCk7XG59O1xudmFyIGV4cCA9IGZ1bmN0aW9uKE8pe1xuICAkZXhwb3J0KCRleHBvcnQuUywgJ1JlZmxlY3QnLCBPKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzdG9yZTogc3RvcmUsXG4gIG1hcDogZ2V0T3JDcmVhdGVNZXRhZGF0YU1hcCxcbiAgaGFzOiBvcmRpbmFyeUhhc093bk1ldGFkYXRhLFxuICBnZXQ6IG9yZGluYXJ5R2V0T3duTWV0YWRhdGEsXG4gIHNldDogb3JkaW5hcnlEZWZpbmVPd25NZXRhZGF0YSxcbiAga2V5czogb3JkaW5hcnlPd25NZXRhZGF0YUtleXMsXG4gIGtleTogdG9NZXRhS2V5LFxuICBleHA6IGV4cFxufTsiLCJ2YXIgbWV0YWRhdGEgICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGFkYXRhJylcbiAgLCBhbk9iamVjdCAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCB0b01ldGFLZXkgICAgICAgICAgICAgICAgID0gbWV0YWRhdGEua2V5XG4gICwgb3JkaW5hcnlEZWZpbmVPd25NZXRhZGF0YSA9IG1ldGFkYXRhLnNldDtcblxubWV0YWRhdGEuZXhwKHtkZWZpbmVNZXRhZGF0YTogZnVuY3Rpb24gZGVmaW5lTWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUsIHRhcmdldCwgdGFyZ2V0S2V5KXtcbiAgb3JkaW5hcnlEZWZpbmVPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSwgYW5PYmplY3QodGFyZ2V0KSwgdG9NZXRhS2V5KHRhcmdldEtleSkpO1xufX0pOyIsInZhciBtZXRhZGF0YSAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YWRhdGEnKVxuICAsIGFuT2JqZWN0ICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvTWV0YUtleSAgICAgICAgICAgICAgPSBtZXRhZGF0YS5rZXlcbiAgLCBnZXRPckNyZWF0ZU1ldGFkYXRhTWFwID0gbWV0YWRhdGEubWFwXG4gICwgc3RvcmUgICAgICAgICAgICAgICAgICA9IG1ldGFkYXRhLnN0b3JlO1xuXG5tZXRhZGF0YS5leHAoe2RlbGV0ZU1ldGFkYXRhOiBmdW5jdGlvbiBkZWxldGVNZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0IC8qLCB0YXJnZXRLZXkgKi8pe1xuICB2YXIgdGFyZ2V0S2V5ICAgPSBhcmd1bWVudHMubGVuZ3RoIDwgMyA/IHVuZGVmaW5lZCA6IHRvTWV0YUtleShhcmd1bWVudHNbMl0pXG4gICAgLCBtZXRhZGF0YU1hcCA9IGdldE9yQ3JlYXRlTWV0YWRhdGFNYXAoYW5PYmplY3QodGFyZ2V0KSwgdGFyZ2V0S2V5LCBmYWxzZSk7XG4gIGlmKG1ldGFkYXRhTWFwID09PSB1bmRlZmluZWQgfHwgIW1ldGFkYXRhTWFwWydkZWxldGUnXShtZXRhZGF0YUtleSkpcmV0dXJuIGZhbHNlO1xuICBpZihtZXRhZGF0YU1hcC5zaXplKXJldHVybiB0cnVlO1xuICB2YXIgdGFyZ2V0TWV0YWRhdGEgPSBzdG9yZS5nZXQodGFyZ2V0KTtcbiAgdGFyZ2V0TWV0YWRhdGFbJ2RlbGV0ZSddKHRhcmdldEtleSk7XG4gIHJldHVybiAhIXRhcmdldE1ldGFkYXRhLnNpemUgfHwgc3RvcmVbJ2RlbGV0ZSddKHRhcmdldCk7XG59fSk7IiwidmFyIG1ldGFkYXRhICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhZGF0YScpXG4gICwgYW5PYmplY3QgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZ2V0UHJvdG90eXBlT2YgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKVxuICAsIG9yZGluYXJ5SGFzT3duTWV0YWRhdGEgPSBtZXRhZGF0YS5oYXNcbiAgLCBvcmRpbmFyeUdldE93bk1ldGFkYXRhID0gbWV0YWRhdGEuZ2V0XG4gICwgdG9NZXRhS2V5ICAgICAgICAgICAgICA9IG1ldGFkYXRhLmtleTtcblxudmFyIG9yZGluYXJ5R2V0TWV0YWRhdGEgPSBmdW5jdGlvbihNZXRhZGF0YUtleSwgTywgUCl7XG4gIHZhciBoYXNPd24gPSBvcmRpbmFyeUhhc093bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKTtcbiAgaWYoaGFzT3duKXJldHVybiBvcmRpbmFyeUdldE93bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKTtcbiAgdmFyIHBhcmVudCA9IGdldFByb3RvdHlwZU9mKE8pO1xuICByZXR1cm4gcGFyZW50ICE9PSBudWxsID8gb3JkaW5hcnlHZXRNZXRhZGF0YShNZXRhZGF0YUtleSwgcGFyZW50LCBQKSA6IHVuZGVmaW5lZDtcbn07XG5cbm1ldGFkYXRhLmV4cCh7Z2V0TWV0YWRhdGE6IGZ1bmN0aW9uIGdldE1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQgLyosIHRhcmdldEtleSAqLyl7XG4gIHJldHVybiBvcmRpbmFyeUdldE1ldGFkYXRhKG1ldGFkYXRhS2V5LCBhbk9iamVjdCh0YXJnZXQpLCBhcmd1bWVudHMubGVuZ3RoIDwgMyA/IHVuZGVmaW5lZCA6IHRvTWV0YUtleShhcmd1bWVudHNbMl0pKTtcbn19KTsiLCJ2YXIgU2V0ICAgICAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL2VzNi5zZXQnKVxuICAsIGZyb20gICAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fYXJyYXktZnJvbS1pdGVyYWJsZScpXG4gICwgbWV0YWRhdGEgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhZGF0YScpXG4gICwgYW5PYmplY3QgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGdldFByb3RvdHlwZU9mICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgb3JkaW5hcnlPd25NZXRhZGF0YUtleXMgPSBtZXRhZGF0YS5rZXlzXG4gICwgdG9NZXRhS2V5ICAgICAgICAgICAgICAgPSBtZXRhZGF0YS5rZXk7XG5cbnZhciBvcmRpbmFyeU1ldGFkYXRhS2V5cyA9IGZ1bmN0aW9uKE8sIFApe1xuICB2YXIgb0tleXMgID0gb3JkaW5hcnlPd25NZXRhZGF0YUtleXMoTywgUClcbiAgICAsIHBhcmVudCA9IGdldFByb3RvdHlwZU9mKE8pO1xuICBpZihwYXJlbnQgPT09IG51bGwpcmV0dXJuIG9LZXlzO1xuICB2YXIgcEtleXMgID0gb3JkaW5hcnlNZXRhZGF0YUtleXMocGFyZW50LCBQKTtcbiAgcmV0dXJuIHBLZXlzLmxlbmd0aCA/IG9LZXlzLmxlbmd0aCA/IGZyb20obmV3IFNldChvS2V5cy5jb25jYXQocEtleXMpKSkgOiBwS2V5cyA6IG9LZXlzO1xufTtcblxubWV0YWRhdGEuZXhwKHtnZXRNZXRhZGF0YUtleXM6IGZ1bmN0aW9uIGdldE1ldGFkYXRhS2V5cyh0YXJnZXQgLyosIHRhcmdldEtleSAqLyl7XG4gIHJldHVybiBvcmRpbmFyeU1ldGFkYXRhS2V5cyhhbk9iamVjdCh0YXJnZXQpLCBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IHVuZGVmaW5lZCA6IHRvTWV0YUtleShhcmd1bWVudHNbMV0pKTtcbn19KTsiLCJ2YXIgbWV0YWRhdGEgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGFkYXRhJylcbiAgLCBhbk9iamVjdCAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBvcmRpbmFyeUdldE93bk1ldGFkYXRhID0gbWV0YWRhdGEuZ2V0XG4gICwgdG9NZXRhS2V5ICAgICAgICAgICAgICA9IG1ldGFkYXRhLmtleTtcblxubWV0YWRhdGEuZXhwKHtnZXRPd25NZXRhZGF0YTogZnVuY3Rpb24gZ2V0T3duTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCAvKiwgdGFyZ2V0S2V5ICovKXtcbiAgcmV0dXJuIG9yZGluYXJ5R2V0T3duTWV0YWRhdGEobWV0YWRhdGFLZXksIGFuT2JqZWN0KHRhcmdldClcbiAgICAsIGFyZ3VtZW50cy5sZW5ndGggPCAzID8gdW5kZWZpbmVkIDogdG9NZXRhS2V5KGFyZ3VtZW50c1syXSkpO1xufX0pOyIsInZhciBtZXRhZGF0YSAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGFkYXRhJylcbiAgLCBhbk9iamVjdCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgb3JkaW5hcnlPd25NZXRhZGF0YUtleXMgPSBtZXRhZGF0YS5rZXlzXG4gICwgdG9NZXRhS2V5ICAgICAgICAgICAgICAgPSBtZXRhZGF0YS5rZXk7XG5cbm1ldGFkYXRhLmV4cCh7Z2V0T3duTWV0YWRhdGFLZXlzOiBmdW5jdGlvbiBnZXRPd25NZXRhZGF0YUtleXModGFyZ2V0IC8qLCB0YXJnZXRLZXkgKi8pe1xuICByZXR1cm4gb3JkaW5hcnlPd25NZXRhZGF0YUtleXMoYW5PYmplY3QodGFyZ2V0KSwgYXJndW1lbnRzLmxlbmd0aCA8IDIgPyB1bmRlZmluZWQgOiB0b01ldGFLZXkoYXJndW1lbnRzWzFdKSk7XG59fSk7IiwidmFyIG1ldGFkYXRhICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhZGF0YScpXG4gICwgYW5PYmplY3QgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZ2V0UHJvdG90eXBlT2YgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKVxuICAsIG9yZGluYXJ5SGFzT3duTWV0YWRhdGEgPSBtZXRhZGF0YS5oYXNcbiAgLCB0b01ldGFLZXkgICAgICAgICAgICAgID0gbWV0YWRhdGEua2V5O1xuXG52YXIgb3JkaW5hcnlIYXNNZXRhZGF0YSA9IGZ1bmN0aW9uKE1ldGFkYXRhS2V5LCBPLCBQKXtcbiAgdmFyIGhhc093biA9IG9yZGluYXJ5SGFzT3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApO1xuICBpZihoYXNPd24pcmV0dXJuIHRydWU7XG4gIHZhciBwYXJlbnQgPSBnZXRQcm90b3R5cGVPZihPKTtcbiAgcmV0dXJuIHBhcmVudCAhPT0gbnVsbCA/IG9yZGluYXJ5SGFzTWV0YWRhdGEoTWV0YWRhdGFLZXksIHBhcmVudCwgUCkgOiBmYWxzZTtcbn07XG5cbm1ldGFkYXRhLmV4cCh7aGFzTWV0YWRhdGE6IGZ1bmN0aW9uIGhhc01ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQgLyosIHRhcmdldEtleSAqLyl7XG4gIHJldHVybiBvcmRpbmFyeUhhc01ldGFkYXRhKG1ldGFkYXRhS2V5LCBhbk9iamVjdCh0YXJnZXQpLCBhcmd1bWVudHMubGVuZ3RoIDwgMyA/IHVuZGVmaW5lZCA6IHRvTWV0YUtleShhcmd1bWVudHNbMl0pKTtcbn19KTsiLCJ2YXIgbWV0YWRhdGEgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGFkYXRhJylcbiAgLCBhbk9iamVjdCAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBvcmRpbmFyeUhhc093bk1ldGFkYXRhID0gbWV0YWRhdGEuaGFzXG4gICwgdG9NZXRhS2V5ICAgICAgICAgICAgICA9IG1ldGFkYXRhLmtleTtcblxubWV0YWRhdGEuZXhwKHtoYXNPd25NZXRhZGF0YTogZnVuY3Rpb24gaGFzT3duTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCAvKiwgdGFyZ2V0S2V5ICovKXtcbiAgcmV0dXJuIG9yZGluYXJ5SGFzT3duTWV0YWRhdGEobWV0YWRhdGFLZXksIGFuT2JqZWN0KHRhcmdldClcbiAgICAsIGFyZ3VtZW50cy5sZW5ndGggPCAzID8gdW5kZWZpbmVkIDogdG9NZXRhS2V5KGFyZ3VtZW50c1syXSkpO1xufX0pOyIsInZhciBtZXRhZGF0YSAgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YWRhdGEnKVxuICAsIGFuT2JqZWN0ICAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGFGdW5jdGlvbiAgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJylcbiAgLCB0b01ldGFLZXkgICAgICAgICAgICAgICAgID0gbWV0YWRhdGEua2V5XG4gICwgb3JkaW5hcnlEZWZpbmVPd25NZXRhZGF0YSA9IG1ldGFkYXRhLnNldDtcblxubWV0YWRhdGEuZXhwKHttZXRhZGF0YTogZnVuY3Rpb24gbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpe1xuICByZXR1cm4gZnVuY3Rpb24gZGVjb3JhdG9yKHRhcmdldCwgdGFyZ2V0S2V5KXtcbiAgICBvcmRpbmFyeURlZmluZU93bk1ldGFkYXRhKFxuICAgICAgbWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUsXG4gICAgICAodGFyZ2V0S2V5ICE9PSB1bmRlZmluZWQgPyBhbk9iamVjdCA6IGFGdW5jdGlvbikodGFyZ2V0KSxcbiAgICAgIHRvTWV0YUtleSh0YXJnZXRLZXkpXG4gICAgKTtcbiAgfTtcbn19KTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vcndhbGRyb24vdGMzOS1ub3Rlcy9ibG9iL21hc3Rlci9lczYvMjAxNC0wOS9zZXB0LTI1Lm1kIzUxMC1nbG9iYWxhc2FwLWZvci1lbnF1ZXVpbmctYS1taWNyb3Rhc2tcbnZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIG1pY3JvdGFzayA9IHJlcXVpcmUoJy4vX21pY3JvdGFzaycpKClcbiAgLCBwcm9jZXNzICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5wcm9jZXNzXG4gICwgaXNOb2RlICAgID0gcmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xuXG4kZXhwb3J0KCRleHBvcnQuRywge1xuICBhc2FwOiBmdW5jdGlvbiBhc2FwKGZuKXtcbiAgICB2YXIgZG9tYWluID0gaXNOb2RlICYmIHByb2Nlc3MuZG9tYWluO1xuICAgIG1pY3JvdGFzayhkb21haW4gPyBkb21haW4uYmluZChmbikgOiBmbik7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96ZW5wYXJzaW5nL2VzLW9ic2VydmFibGVcbnZhciAkZXhwb3J0ICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgZ2xvYmFsICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgbWljcm90YXNrICAgPSByZXF1aXJlKCcuL19taWNyb3Rhc2snKSgpXG4gICwgT0JTRVJWQUJMRSAgPSByZXF1aXJlKCcuL193a3MnKSgnb2JzZXJ2YWJsZScpXG4gICwgYUZ1bmN0aW9uICAgPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJylcbiAgLCBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgYW5JbnN0YW5jZSAgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpXG4gICwgcmVkZWZpbmVBbGwgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKVxuICAsIGhpZGUgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgZm9yT2YgICAgICAgPSByZXF1aXJlKCcuL19mb3Itb2YnKVxuICAsIFJFVFVSTiAgICAgID0gZm9yT2YuUkVUVVJOO1xuXG52YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24oZm4pe1xuICByZXR1cm4gZm4gPT0gbnVsbCA/IHVuZGVmaW5lZCA6IGFGdW5jdGlvbihmbik7XG59O1xuXG52YXIgY2xlYW51cFN1YnNjcmlwdGlvbiA9IGZ1bmN0aW9uKHN1YnNjcmlwdGlvbil7XG4gIHZhciBjbGVhbnVwID0gc3Vic2NyaXB0aW9uLl9jO1xuICBpZihjbGVhbnVwKXtcbiAgICBzdWJzY3JpcHRpb24uX2MgPSB1bmRlZmluZWQ7XG4gICAgY2xlYW51cCgpO1xuICB9XG59O1xuXG52YXIgc3Vic2NyaXB0aW9uQ2xvc2VkID0gZnVuY3Rpb24oc3Vic2NyaXB0aW9uKXtcbiAgcmV0dXJuIHN1YnNjcmlwdGlvbi5fbyA9PT0gdW5kZWZpbmVkO1xufTtcblxudmFyIGNsb3NlU3Vic2NyaXB0aW9uID0gZnVuY3Rpb24oc3Vic2NyaXB0aW9uKXtcbiAgaWYoIXN1YnNjcmlwdGlvbkNsb3NlZChzdWJzY3JpcHRpb24pKXtcbiAgICBzdWJzY3JpcHRpb24uX28gPSB1bmRlZmluZWQ7XG4gICAgY2xlYW51cFN1YnNjcmlwdGlvbihzdWJzY3JpcHRpb24pO1xuICB9XG59O1xuXG52YXIgU3Vic2NyaXB0aW9uID0gZnVuY3Rpb24ob2JzZXJ2ZXIsIHN1YnNjcmliZXIpe1xuICBhbk9iamVjdChvYnNlcnZlcik7XG4gIHRoaXMuX2MgPSB1bmRlZmluZWQ7XG4gIHRoaXMuX28gPSBvYnNlcnZlcjtcbiAgb2JzZXJ2ZXIgPSBuZXcgU3Vic2NyaXB0aW9uT2JzZXJ2ZXIodGhpcyk7XG4gIHRyeSB7XG4gICAgdmFyIGNsZWFudXAgICAgICA9IHN1YnNjcmliZXIob2JzZXJ2ZXIpXG4gICAgICAsIHN1YnNjcmlwdGlvbiA9IGNsZWFudXA7XG4gICAgaWYoY2xlYW51cCAhPSBudWxsKXtcbiAgICAgIGlmKHR5cGVvZiBjbGVhbnVwLnVuc3Vic2NyaWJlID09PSAnZnVuY3Rpb24nKWNsZWFudXAgPSBmdW5jdGlvbigpeyBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTsgfTtcbiAgICAgIGVsc2UgYUZ1bmN0aW9uKGNsZWFudXApO1xuICAgICAgdGhpcy5fYyA9IGNsZWFudXA7XG4gICAgfVxuICB9IGNhdGNoKGUpe1xuICAgIG9ic2VydmVyLmVycm9yKGUpO1xuICAgIHJldHVybjtcbiAgfSBpZihzdWJzY3JpcHRpb25DbG9zZWQodGhpcykpY2xlYW51cFN1YnNjcmlwdGlvbih0aGlzKTtcbn07XG5cblN1YnNjcmlwdGlvbi5wcm90b3R5cGUgPSByZWRlZmluZUFsbCh7fSwge1xuICB1bnN1YnNjcmliZTogZnVuY3Rpb24gdW5zdWJzY3JpYmUoKXsgY2xvc2VTdWJzY3JpcHRpb24odGhpcyk7IH1cbn0pO1xuXG52YXIgU3Vic2NyaXB0aW9uT2JzZXJ2ZXIgPSBmdW5jdGlvbihzdWJzY3JpcHRpb24pe1xuICB0aGlzLl9zID0gc3Vic2NyaXB0aW9uO1xufTtcblxuU3Vic2NyaXB0aW9uT2JzZXJ2ZXIucHJvdG90eXBlID0gcmVkZWZpbmVBbGwoe30sIHtcbiAgbmV4dDogZnVuY3Rpb24gbmV4dCh2YWx1ZSl7XG4gICAgdmFyIHN1YnNjcmlwdGlvbiA9IHRoaXMuX3M7XG4gICAgaWYoIXN1YnNjcmlwdGlvbkNsb3NlZChzdWJzY3JpcHRpb24pKXtcbiAgICAgIHZhciBvYnNlcnZlciA9IHN1YnNjcmlwdGlvbi5fbztcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBtID0gZ2V0TWV0aG9kKG9ic2VydmVyLm5leHQpO1xuICAgICAgICBpZihtKXJldHVybiBtLmNhbGwob2JzZXJ2ZXIsIHZhbHVlKTtcbiAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY2xvc2VTdWJzY3JpcHRpb24oc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBlcnJvcjogZnVuY3Rpb24gZXJyb3IodmFsdWUpe1xuICAgIHZhciBzdWJzY3JpcHRpb24gPSB0aGlzLl9zO1xuICAgIGlmKHN1YnNjcmlwdGlvbkNsb3NlZChzdWJzY3JpcHRpb24pKXRocm93IHZhbHVlO1xuICAgIHZhciBvYnNlcnZlciA9IHN1YnNjcmlwdGlvbi5fbztcbiAgICBzdWJzY3JpcHRpb24uX28gPSB1bmRlZmluZWQ7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBtID0gZ2V0TWV0aG9kKG9ic2VydmVyLmVycm9yKTtcbiAgICAgIGlmKCFtKXRocm93IHZhbHVlO1xuICAgICAgdmFsdWUgPSBtLmNhbGwob2JzZXJ2ZXIsIHZhbHVlKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgdHJ5IHtcbiAgICAgICAgY2xlYW51cFN1YnNjcmlwdGlvbihzdWJzY3JpcHRpb24pO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9IGNsZWFudXBTdWJzY3JpcHRpb24oc3Vic2NyaXB0aW9uKTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0sXG4gIGNvbXBsZXRlOiBmdW5jdGlvbiBjb21wbGV0ZSh2YWx1ZSl7XG4gICAgdmFyIHN1YnNjcmlwdGlvbiA9IHRoaXMuX3M7XG4gICAgaWYoIXN1YnNjcmlwdGlvbkNsb3NlZChzdWJzY3JpcHRpb24pKXtcbiAgICAgIHZhciBvYnNlcnZlciA9IHN1YnNjcmlwdGlvbi5fbztcbiAgICAgIHN1YnNjcmlwdGlvbi5fbyA9IHVuZGVmaW5lZDtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBtID0gZ2V0TWV0aG9kKG9ic2VydmVyLmNvbXBsZXRlKTtcbiAgICAgICAgdmFsdWUgPSBtID8gbS5jYWxsKG9ic2VydmVyLCB2YWx1ZSkgOiB1bmRlZmluZWQ7XG4gICAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNsZWFudXBTdWJzY3JpcHRpb24oc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9IGNsZWFudXBTdWJzY3JpcHRpb24oc3Vic2NyaXB0aW9uKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH1cbn0pO1xuXG52YXIgJE9ic2VydmFibGUgPSBmdW5jdGlvbiBPYnNlcnZhYmxlKHN1YnNjcmliZXIpe1xuICBhbkluc3RhbmNlKHRoaXMsICRPYnNlcnZhYmxlLCAnT2JzZXJ2YWJsZScsICdfZicpLl9mID0gYUZ1bmN0aW9uKHN1YnNjcmliZXIpO1xufTtcblxucmVkZWZpbmVBbGwoJE9ic2VydmFibGUucHJvdG90eXBlLCB7XG4gIHN1YnNjcmliZTogZnVuY3Rpb24gc3Vic2NyaWJlKG9ic2VydmVyKXtcbiAgICByZXR1cm4gbmV3IFN1YnNjcmlwdGlvbihvYnNlcnZlciwgdGhpcy5fZik7XG4gIH0sXG4gIGZvckVhY2g6IGZ1bmN0aW9uIGZvckVhY2goZm4pe1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICByZXR1cm4gbmV3IChjb3JlLlByb21pc2UgfHwgZ2xvYmFsLlByb21pc2UpKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgICBhRnVuY3Rpb24oZm4pO1xuICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IHRoYXQuc3Vic2NyaWJlKHtcbiAgICAgICAgbmV4dCA6IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGZuKHZhbHVlKTtcbiAgICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogcmVqZWN0LFxuICAgICAgICBjb21wbGV0ZTogcmVzb2x2ZVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn0pO1xuXG5yZWRlZmluZUFsbCgkT2JzZXJ2YWJsZSwge1xuICBmcm9tOiBmdW5jdGlvbiBmcm9tKHgpe1xuICAgIHZhciBDID0gdHlwZW9mIHRoaXMgPT09ICdmdW5jdGlvbicgPyB0aGlzIDogJE9ic2VydmFibGU7XG4gICAgdmFyIG1ldGhvZCA9IGdldE1ldGhvZChhbk9iamVjdCh4KVtPQlNFUlZBQkxFXSk7XG4gICAgaWYobWV0aG9kKXtcbiAgICAgIHZhciBvYnNlcnZhYmxlID0gYW5PYmplY3QobWV0aG9kLmNhbGwoeCkpO1xuICAgICAgcmV0dXJuIG9ic2VydmFibGUuY29uc3RydWN0b3IgPT09IEMgPyBvYnNlcnZhYmxlIDogbmV3IEMoZnVuY3Rpb24ob2JzZXJ2ZXIpe1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZS5zdWJzY3JpYmUob2JzZXJ2ZXIpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgQyhmdW5jdGlvbihvYnNlcnZlcil7XG4gICAgICB2YXIgZG9uZSA9IGZhbHNlO1xuICAgICAgbWljcm90YXNrKGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKCFkb25lKXtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoZm9yT2YoeCwgZmFsc2UsIGZ1bmN0aW9uKGl0KXtcbiAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChpdCk7XG4gICAgICAgICAgICAgIGlmKGRvbmUpcmV0dXJuIFJFVFVSTjtcbiAgICAgICAgICAgIH0pID09PSBSRVRVUk4pcmV0dXJuO1xuICAgICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICBpZihkb25lKXRocm93IGU7XG4gICAgICAgICAgICBvYnNlcnZlci5lcnJvcihlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9IG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7IGRvbmUgPSB0cnVlOyB9O1xuICAgIH0pO1xuICB9LFxuICBvZjogZnVuY3Rpb24gb2YoKXtcbiAgICBmb3IodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aCwgaXRlbXMgPSBBcnJheShsKTsgaSA8IGw7KWl0ZW1zW2ldID0gYXJndW1lbnRzW2krK107XG4gICAgcmV0dXJuIG5ldyAodHlwZW9mIHRoaXMgPT09ICdmdW5jdGlvbicgPyB0aGlzIDogJE9ic2VydmFibGUpKGZ1bmN0aW9uKG9ic2VydmVyKXtcbiAgICAgIHZhciBkb25lID0gZmFsc2U7XG4gICAgICBtaWNyb3Rhc2soZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoIWRvbmUpe1xuICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7ICsraSl7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KGl0ZW1zW2ldKTtcbiAgICAgICAgICAgIGlmKGRvbmUpcmV0dXJuO1xuICAgICAgICAgIH0gb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKXsgZG9uZSA9IHRydWU7IH07XG4gICAgfSk7XG4gIH1cbn0pO1xuXG5oaWRlKCRPYnNlcnZhYmxlLnByb3RvdHlwZSwgT0JTRVJWQUJMRSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xuXG4kZXhwb3J0KCRleHBvcnQuRywge09ic2VydmFibGU6ICRPYnNlcnZhYmxlfSk7XG5cbnJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJykoJ09ic2VydmFibGUnKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpOyIsIid1c2Ugc3RyaWN0JztcbnZhciBwYXRoICAgICAgPSByZXF1aXJlKCcuL19wYXRoJylcbiAgLCBpbnZva2UgICAgPSByZXF1aXJlKCcuL19pbnZva2UnKVxuICAsIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oLyogLi4ucGFyZ3MgKi8pe1xuICB2YXIgZm4gICAgID0gYUZ1bmN0aW9uKHRoaXMpXG4gICAgLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBwYXJncyAgPSBBcnJheShsZW5ndGgpXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBfICAgICAgPSBwYXRoLl9cbiAgICAsIGhvbGRlciA9IGZhbHNlO1xuICB3aGlsZShsZW5ndGggPiBpKWlmKChwYXJnc1tpXSA9IGFyZ3VtZW50c1tpKytdKSA9PT0gXylob2xkZXIgPSB0cnVlO1xuICByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICAsIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIGogPSAwLCBrID0gMCwgYXJncztcbiAgICBpZighaG9sZGVyICYmICFhTGVuKXJldHVybiBpbnZva2UoZm4sIHBhcmdzLCB0aGF0KTtcbiAgICBhcmdzID0gcGFyZ3Muc2xpY2UoKTtcbiAgICBpZihob2xkZXIpZm9yKDtsZW5ndGggPiBqOyBqKyspaWYoYXJnc1tqXSA9PT0gXylhcmdzW2pdID0gYXJndW1lbnRzW2srK107XG4gICAgd2hpbGUoYUxlbiA+IGspYXJncy5wdXNoKGFyZ3VtZW50c1trKytdKTtcbiAgICByZXR1cm4gaW52b2tlKGZuLCBhcmdzLCB0aGF0KTtcbiAgfTtcbn07IiwiLy8gaWU5LSBzZXRUaW1lb3V0ICYgc2V0SW50ZXJ2YWwgYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZpeFxudmFyIGdsb2JhbCAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsICRleHBvcnQgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGludm9rZSAgICAgPSByZXF1aXJlKCcuL19pbnZva2UnKVxuICAsIHBhcnRpYWwgICAgPSByZXF1aXJlKCcuL19wYXJ0aWFsJylcbiAgLCBuYXZpZ2F0b3IgID0gZ2xvYmFsLm5hdmlnYXRvclxuICAsIE1TSUUgICAgICAgPSAhIW5hdmlnYXRvciAmJiAvTVNJRSAuXFwuLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpOyAvLyA8LSBkaXJ0eSBpZTktIGNoZWNrXG52YXIgd3JhcCA9IGZ1bmN0aW9uKHNldCl7XG4gIHJldHVybiBNU0lFID8gZnVuY3Rpb24oZm4sIHRpbWUgLyosIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBzZXQoaW52b2tlKFxuICAgICAgcGFydGlhbCxcbiAgICAgIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSxcbiAgICAgIHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nID8gZm4gOiBGdW5jdGlvbihmbilcbiAgICApLCB0aW1lKTtcbiAgfSA6IHNldDtcbn07XG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuQiArICRleHBvcnQuRiAqIE1TSUUsIHtcbiAgc2V0VGltZW91dDogIHdyYXAoZ2xvYmFsLnNldFRpbWVvdXQpLFxuICBzZXRJbnRlcnZhbDogd3JhcChnbG9iYWwuc2V0SW50ZXJ2YWwpXG59KTsiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJHRhc2sgICA9IHJlcXVpcmUoJy4vX3Rhc2snKTtcbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5CLCB7XG4gIHNldEltbWVkaWF0ZTogICAkdGFzay5zZXQsXG4gIGNsZWFySW1tZWRpYXRlOiAkdGFzay5jbGVhclxufSk7IiwidmFyICRpdGVyYXRvcnMgICAgPSByZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpXG4gICwgcmVkZWZpbmUgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBnbG9iYWwgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoaWRlICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgSXRlcmF0b3JzICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgd2tzICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcycpXG4gICwgSVRFUkFUT1IgICAgICA9IHdrcygnaXRlcmF0b3InKVxuICAsIFRPX1NUUklOR19UQUcgPSB3a3MoJ3RvU3RyaW5nVGFnJylcbiAgLCBBcnJheVZhbHVlcyAgID0gSXRlcmF0b3JzLkFycmF5O1xuXG5mb3IodmFyIGNvbGxlY3Rpb25zID0gWydOb2RlTGlzdCcsICdET01Ub2tlbkxpc3QnLCAnTWVkaWFMaXN0JywgJ1N0eWxlU2hlZXRMaXN0JywgJ0NTU1J1bGVMaXN0J10sIGkgPSAwOyBpIDwgNTsgaSsrKXtcbiAgdmFyIE5BTUUgICAgICAgPSBjb2xsZWN0aW9uc1tpXVxuICAgICwgQ29sbGVjdGlvbiA9IGdsb2JhbFtOQU1FXVxuICAgICwgcHJvdG8gICAgICA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGVcbiAgICAsIGtleTtcbiAgaWYocHJvdG8pe1xuICAgIGlmKCFwcm90b1tJVEVSQVRPUl0paGlkZShwcm90bywgSVRFUkFUT1IsIEFycmF5VmFsdWVzKTtcbiAgICBpZighcHJvdG9bVE9fU1RSSU5HX1RBR10paGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gICAgSXRlcmF0b3JzW05BTUVdID0gQXJyYXlWYWx1ZXM7XG4gICAgZm9yKGtleSBpbiAkaXRlcmF0b3JzKWlmKCFwcm90b1trZXldKXJlZGVmaW5lKHByb3RvLCBrZXksICRpdGVyYXRvcnNba2V5XSwgdHJ1ZSk7XG4gIH1cbn0iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBodHRwczovL3Jhdy5naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL21hc3Rlci9MSUNFTlNFIGZpbGUuIEFuXG4gKiBhZGRpdGlvbmFsIGdyYW50IG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW5cbiAqIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4hKGZ1bmN0aW9uKGdsb2JhbCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIHZhciBpbk1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCI7XG4gIHZhciBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZTtcbiAgaWYgKHJ1bnRpbWUpIHtcbiAgICBpZiAoaW5Nb2R1bGUpIHtcbiAgICAgIC8vIElmIHJlZ2VuZXJhdG9yUnVudGltZSBpcyBkZWZpbmVkIGdsb2JhbGx5IGFuZCB3ZSdyZSBpbiBhIG1vZHVsZSxcbiAgICAgIC8vIG1ha2UgdGhlIGV4cG9ydHMgb2JqZWN0IGlkZW50aWNhbCB0byByZWdlbmVyYXRvclJ1bnRpbWUuXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IHJ1bnRpbWU7XG4gICAgfVxuICAgIC8vIERvbid0IGJvdGhlciBldmFsdWF0aW5nIHRoZSByZXN0IG9mIHRoaXMgZmlsZSBpZiB0aGUgcnVudGltZSB3YXNcbiAgICAvLyBhbHJlYWR5IGRlZmluZWQgZ2xvYmFsbHkuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRGVmaW5lIHRoZSBydW50aW1lIGdsb2JhbGx5IChhcyBleHBlY3RlZCBieSBnZW5lcmF0ZWQgY29kZSkgYXMgZWl0aGVyXG4gIC8vIG1vZHVsZS5leHBvcnRzIChpZiB3ZSdyZSBpbiBhIG1vZHVsZSkgb3IgYSBuZXcsIGVtcHR5IG9iamVjdC5cbiAgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWUgPSBpbk1vZHVsZSA/IG1vZHVsZS5leHBvcnRzIDoge307XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgcnVudGltZS53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGVbdG9TdHJpbmdUYWdTeW1ib2xdID1cbiAgICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBwcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBydW50aW1lLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGlmICghKHRvU3RyaW5nVGFnU3ltYm9sIGluIGdlbkZ1bikpIHtcbiAgICAgICAgZ2VuRnVuW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgcnVudGltZS5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uIElmIHRoZSBQcm9taXNlIGlzIHJlamVjdGVkLCBob3dldmVyLCB0aGVcbiAgICAgICAgICAvLyByZXN1bHQgZm9yIHRoaXMgaXRlcmF0aW9uIHdpbGwgYmUgcmVqZWN0ZWQgd2l0aCB0aGUgc2FtZVxuICAgICAgICAgIC8vIHJlYXNvbi4gTm90ZSB0aGF0IHJlamVjdGlvbnMgb2YgeWllbGRlZCBQcm9taXNlcyBhcmUgbm90XG4gICAgICAgICAgLy8gdGhyb3duIGJhY2sgaW50byB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBhcyBpcyB0aGUgY2FzZVxuICAgICAgICAgIC8vIHdoZW4gYW4gYXdhaXRlZCBQcm9taXNlIGlzIHJlamVjdGVkLiBUaGlzIGRpZmZlcmVuY2UgaW5cbiAgICAgICAgICAvLyBiZWhhdmlvciBiZXR3ZWVuIHlpZWxkIGFuZCBhd2FpdCBpcyBpbXBvcnRhbnQsIGJlY2F1c2UgaXRcbiAgICAgICAgICAvLyBhbGxvd3MgdGhlIGNvbnN1bWVyIHRvIGRlY2lkZSB3aGF0IHRvIGRvIHdpdGggdGhlIHlpZWxkZWRcbiAgICAgICAgICAvLyByZWplY3Rpb24gKHN3YWxsb3cgaXQgYW5kIGNvbnRpbnVlLCBtYW51YWxseSAudGhyb3cgaXQgYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGdlbmVyYXRvciwgYWJhbmRvbiBpdGVyYXRpb24sIHdoYXRldmVyKS4gV2l0aFxuICAgICAgICAgIC8vIGF3YWl0LCBieSBjb250cmFzdCwgdGhlcmUgaXMgbm8gb3Bwb3J0dW5pdHkgdG8gZXhhbWluZSB0aGVcbiAgICAgICAgICAvLyByZWplY3Rpb24gcmVhc29uIG91dHNpZGUgdGhlIGdlbmVyYXRvciBmdW5jdGlvbiwgc28gdGhlXG4gICAgICAgICAgLy8gb25seSBvcHRpb24gaXMgdG8gdGhyb3cgaXQgZnJvbSB0aGUgYXdhaXQgZXhwcmVzc2lvbiwgYW5kXG4gICAgICAgICAgLy8gbGV0IHRoZSBnZW5lcmF0b3IgZnVuY3Rpb24gaGFuZGxlIHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHByb2Nlc3MgPT09IFwib2JqZWN0XCIgJiYgcHJvY2Vzcy5kb21haW4pIHtcbiAgICAgIGludm9rZSA9IHByb2Nlc3MuZG9tYWluLmJpbmQoaW52b2tlKTtcbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIHJ1bnRpbWUuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIHJ1bnRpbWUuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KVxuICAgICk7XG5cbiAgICByZXR1cm4gcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJyZXR1cm5cIiB8fFxuICAgICAgICAgICAgICAobWV0aG9kID09PSBcInRocm93XCIgJiYgZGVsZWdhdGUuaXRlcmF0b3JbbWV0aG9kXSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgLy8gQSByZXR1cm4gb3IgdGhyb3cgKHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyB0aHJvd1xuICAgICAgICAgICAgLy8gbWV0aG9kKSBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgICAgdmFyIHJldHVybk1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdO1xuICAgICAgICAgICAgaWYgKHJldHVybk1ldGhvZCkge1xuICAgICAgICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gocmV0dXJuTWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgYXJnKTtcbiAgICAgICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgcmV0dXJuIG1ldGhvZCB0aHJldyBhbiBleGNlcHRpb24sIGxldCB0aGF0XG4gICAgICAgICAgICAgICAgLy8gZXhjZXB0aW9uIHByZXZhaWwgb3ZlciB0aGUgb3JpZ2luYWwgcmV0dXJuIG9yIHRocm93LlxuICAgICAgICAgICAgICAgIG1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICAgICAgLy8gQ29udGludWUgd2l0aCB0aGUgb3V0ZXIgcmV0dXJuLCBub3cgdGhhdCB0aGUgZGVsZWdhdGVcbiAgICAgICAgICAgICAgLy8gaXRlcmF0b3IgaGFzIGJlZW4gdGVybWluYXRlZC5cbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKFxuICAgICAgICAgICAgZGVsZWdhdGUuaXRlcmF0b3JbbWV0aG9kXSxcbiAgICAgICAgICAgIGRlbGVnYXRlLml0ZXJhdG9yLFxuICAgICAgICAgICAgYXJnXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gTGlrZSByZXR1cm5pbmcgZ2VuZXJhdG9yLnRocm93KHVuY2F1Z2h0KSwgYnV0IHdpdGhvdXQgdGhlXG4gICAgICAgICAgICAvLyBvdmVyaGVhZCBvZiBhbiBleHRyYSBmdW5jdGlvbiBjYWxsLlxuICAgICAgICAgICAgbWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgICAgYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIERlbGVnYXRlIGdlbmVyYXRvciByYW4gYW5kIGhhbmRsZWQgaXRzIG93biBleGNlcHRpb25zIHNvXG4gICAgICAgICAgLy8gcmVnYXJkbGVzcyBvZiB3aGF0IHRoZSBtZXRob2Qgd2FzLCB3ZSBjb250aW51ZSBhcyBpZiBpdCBpc1xuICAgICAgICAgIC8vIFwibmV4dFwiIHdpdGggYW4gdW5kZWZpbmVkIGFyZy5cbiAgICAgICAgICBtZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBhcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG4gICAgICAgICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG4gICAgICAgICAgICByZXR1cm4gaW5mbztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oYXJnKSkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgICBtZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICAgIGFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBhcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIHZhciBpbmZvID0ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGlmIChjb250ZXh0LmRlbGVnYXRlICYmIG1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICAgICAgICBhcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpbmZvO1xuICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBtZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgR3BbdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JcIjtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgcnVudGltZS5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIHJ1bnRpbWUudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG4gICAgICAgIHJldHVybiAhIWNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG59KShcbiAgLy8gQW1vbmcgdGhlIHZhcmlvdXMgdHJpY2tzIGZvciBvYnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbFxuICAvLyBvYmplY3QsIHRoaXMgc2VlbXMgdG8gYmUgdGhlIG1vc3QgcmVsaWFibGUgdGVjaG5pcXVlIHRoYXQgZG9lcyBub3RcbiAgLy8gdXNlIGluZGlyZWN0IGV2YWwgKHdoaWNoIHZpb2xhdGVzIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5KS5cbiAgdHlwZW9mIGdsb2JhbCA9PT0gXCJvYmplY3RcIiA/IGdsb2JhbCA6XG4gIHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIgPyB3aW5kb3cgOlxuICB0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIiA/IHNlbGYgOiB0aGlzXG4pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihyZWdFeHAsIHJlcGxhY2Upe1xuICB2YXIgcmVwbGFjZXIgPSByZXBsYWNlID09PSBPYmplY3QocmVwbGFjZSkgPyBmdW5jdGlvbihwYXJ0KXtcbiAgICByZXR1cm4gcmVwbGFjZVtwYXJ0XTtcbiAgfSA6IHJlcGxhY2U7XG4gIHJldHVybiBmdW5jdGlvbihpdCl7XG4gICAgcmV0dXJuIFN0cmluZyhpdCkucmVwbGFjZShyZWdFeHAsIHJlcGxhY2VyKTtcbiAgfTtcbn07IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL2JlbmphbWluZ3IvUmV4RXhwLmVzY2FwZVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRyZSAgICAgPSByZXF1aXJlKCcuL19yZXBsYWNlcicpKC9bXFxcXF4kKis/LigpfFtcXF17fV0vZywgJ1xcXFwkJicpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1JlZ0V4cCcsIHtlc2NhcGU6IGZ1bmN0aW9uIGVzY2FwZShpdCl7IHJldHVybiAkcmUoaXQpOyB9fSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxucmVxdWlyZShcImNvcmUtanMvc2hpbVwiKTtcblxucmVxdWlyZShcInJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZVwiKTtcblxucmVxdWlyZShcImNvcmUtanMvZm4vcmVnZXhwL2VzY2FwZVwiKTtcblxuaWYgKGdsb2JhbC5fYmFiZWxQb2x5ZmlsbCkge1xuICB0aHJvdyBuZXcgRXJyb3IoXCJvbmx5IG9uZSBpbnN0YW5jZSBvZiBiYWJlbC1wb2x5ZmlsbCBpcyBhbGxvd2VkXCIpO1xufVxuZ2xvYmFsLl9iYWJlbFBvbHlmaWxsID0gdHJ1ZTtcblxudmFyIERFRklORV9QUk9QRVJUWSA9IFwiZGVmaW5lUHJvcGVydHlcIjtcbmZ1bmN0aW9uIGRlZmluZShPLCBrZXksIHZhbHVlKSB7XG4gIE9ba2V5XSB8fCBPYmplY3RbREVGSU5FX1BST1BFUlRZXShPLCBrZXksIHtcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IHZhbHVlXG4gIH0pO1xufVxuXG5kZWZpbmUoU3RyaW5nLnByb3RvdHlwZSwgXCJwYWRMZWZ0XCIsIFwiXCIucGFkU3RhcnQpO1xuZGVmaW5lKFN0cmluZy5wcm90b3R5cGUsIFwicGFkUmlnaHRcIiwgXCJcIi5wYWRFbmQpO1xuXG5cInBvcCxyZXZlcnNlLHNoaWZ0LGtleXMsdmFsdWVzLGVudHJpZXMsaW5kZXhPZixldmVyeSxzb21lLGZvckVhY2gsbWFwLGZpbHRlcixmaW5kLGZpbmRJbmRleCxpbmNsdWRlcyxqb2luLHNsaWNlLGNvbmNhdCxwdXNoLHNwbGljZSx1bnNoaWZ0LHNvcnQsbGFzdEluZGV4T2YscmVkdWNlLHJlZHVjZVJpZ2h0LGNvcHlXaXRoaW4sZmlsbFwiLnNwbGl0KFwiLFwiKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgW11ba2V5XSAmJiBkZWZpbmUoQXJyYXksIGtleSwgRnVuY3Rpb24uY2FsbC5iaW5kKFtdW2tleV0pKTtcbn0pOyIsIi8qKlxuICogTWV0aG9kcyBmb3IgaW50ZXJwcmV0aW5nIFRpbGVkIG1hcCBkYXRhIGludG8gdGhlIGdhbWVcbiAqIGludGVuZGVkIHRvIGV4dGVuZCBQaGFzZXIuU3RhdGVcbiAqL1xudmFyIFRpbGVkSW50ZXJwcmV0ZXIgPSB7XG4gIHByZWxvYWRUaWxlbWFwOiBmdW5jdGlvbiBwcmVsb2FkVGlsZW1hcChuYW1lLCBqc29uTG9jYXRpb24pIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5sb2FkLm9uRmlsZUNvbXBsZXRlLmFkZChmdW5jdGlvbiAocHJvZ3Jlc3MsIGtleSkge1xuICAgICAgaWYgKGtleSA9PT0gbmFtZSkge1xuICAgICAgICBfdGhpcy5wcmVsb2FkVGlsZW1hcEFzc2V0cyhuYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmxvYWQudGlsZW1hcChuYW1lLCBqc29uTG9jYXRpb24sIG51bGwsIFBoYXNlci5UaWxlbWFwLlRJTEVEX0pTT04pO1xuICB9LFxuICBwcmVsb2FkVGlsZW1hcEFzc2V0czogZnVuY3Rpb24gcHJlbG9hZFRpbGVtYXBBc3NldHMobmFtZSkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgdGhpcy50aWxlbWFwID0gdGhpcy5jYWNoZS5nZXRUaWxlbWFwRGF0YShuYW1lKTtcbiAgICAvLyBsb2FkIHRpbGVzZXQgaW1hZ2VzXG4gICAgdGhpcy50aWxlbWFwLmRhdGEudGlsZXNldHMuZm9yRWFjaChmdW5jdGlvbiAoc2V0KSB7XG4gICAgICAvLyBUT0RPIGZpeCB0aGlzIHNldC5pbWFnZS5yZXBsYWNlIHJlZ2V4IGhhY2ssIHRoaXMgaXMgZXNzZW50aWFsbHkgaGFyZCBjb2RlZFxuICAgICAgX3RoaXMyLmxvYWQuaW1hZ2Uoc2V0Lm5hbWUsICdhc3NldHMvJyArIHNldC5pbWFnZS5yZXBsYWNlKC8oXFwuXFwuXFwvKSsvLCAnJykpO1xuICAgIH0pO1xuICAgIC8vIGxvYWQgb2JqZWN0IHNwcml0ZXNcbiAgICB0aGlzLmdldFNwcml0ZXNGcm9tVGlsZW1hcCh0aGlzLnRpbGVtYXApLmZvckVhY2goZnVuY3Rpb24gKG9iamVjdCkge1xuICAgICAgX3RoaXMyLmxvYWQuc3ByaXRlc2hlZXQob2JqZWN0LnByb3BlcnRpZXMuc3ByaXRlLCAnYXNzZXRzLycgKyBvYmplY3QucHJvcGVydGllcy5zcHJpdGUucmVwbGFjZSgvKFxcLlxcLlxcLykrLywgJycpLCBvYmplY3Qud2lkdGgsIG9iamVjdC5oZWlnaHQpO1xuICAgIH0pO1xuICB9LFxuICBnZXRTcHJpdGVzRnJvbVRpbGVtYXA6IGZ1bmN0aW9uIGdldFNwcml0ZXNGcm9tVGlsZW1hcCh0aWxlbWFwKSB7XG4gICAgdmFyIG9iamVjdHNCeVNwcml0ZU1hcCA9IHRpbGVtYXAuZGF0YS5sYXllcnMucmVkdWNlKGZ1bmN0aW9uIChvYmplY3RzQnlTcHJpdGUsIGxheWVyKSB7XG4gICAgICBpZiAobGF5ZXIub2JqZWN0cykge1xuICAgICAgICBsYXllci5vYmplY3RzLmZvckVhY2goZnVuY3Rpb24gKG9iamVjdCkge1xuICAgICAgICAgIGlmIChvYmplY3QucHJvcGVydGllcyAmJiBvYmplY3QucHJvcGVydGllcy5zcHJpdGUgJiYgIW9iamVjdHNCeVNwcml0ZVtvYmplY3QucHJvcGVydGllcy5zcHJpdGVdKSB7XG4gICAgICAgICAgICBvYmplY3RzQnlTcHJpdGVbb2JqZWN0LnByb3BlcnRpZXMuc3ByaXRlXSA9IG9iamVjdDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9iamVjdHNCeVNwcml0ZTtcbiAgICB9LCB7fSk7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iamVjdHNCeVNwcml0ZU1hcCkubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiBvYmplY3RzQnlTcHJpdGVNYXBba2V5XTtcbiAgICB9KTtcbiAgfSxcbiAgY3JlYXRlVGlsZW1hcDogZnVuY3Rpb24gY3JlYXRlVGlsZW1hcChuYW1lKSB7XG4gICAgdmFyIG1hcCA9IHRoaXMuZ2FtZS5hZGQudGlsZW1hcChuYW1lKTtcbiAgICB0aGlzLnRpbGVtYXAuZGF0YS50aWxlc2V0cy5mb3JFYWNoKGZ1bmN0aW9uIChzZXQpIHtcbiAgICAgIG1hcC5hZGRUaWxlc2V0SW1hZ2Uoc2V0Lm5hbWUsIHNldC5uYW1lLCBzZXQudGlsZXdpZHRoLCBzZXQudGlsZWhlaWdodCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWFwO1xuICB9LFxuICBpbml0aWF0ZVRpbGVkT2JqZWN0R3JvdXBzOiBmdW5jdGlvbiBpbml0aWF0ZVRpbGVkT2JqZWN0R3JvdXBzKG1hcCkge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgLy8gVE9ETyBuZWVkIG1vcmUgZGF0YSBhYm91dCBvYmplY3RzL2VudGl0aWVzIGluIHRpbGVkIGluIG9yZGVyIHRvIGRvIHRoaXNcbiAgICB2YXIgZ3JvdXBzID0ge307XG4gICAgdmFyIG9iamVjdHNCeVR5cGUgPSB0aGlzLmFycmFuZ2VPYmplY3RzQnlUeXBlKG1hcC5vYmplY3RzKTtcbiAgICBPYmplY3Qua2V5cyhvYmplY3RzQnlUeXBlKS5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICBncm91cHNbdHlwZV0gPSBfdGhpczMuZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICAgIGdyb3Vwc1t0eXBlXS5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICAgIG9iamVjdHNCeVR5cGVbdHlwZV0uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gX3RoaXMzLmNyZWF0ZVNwcml0ZUZyb21UaWxlZE9iamVjdChpdGVtLCBncm91cHNbdHlwZV0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGdyb3VwcztcbiAgfSxcbiAgYXJyYW5nZU9iamVjdHNCeVR5cGU6IGZ1bmN0aW9uIGFycmFuZ2VPYmplY3RzQnlUeXBlKG9iamVjdHMpIHtcbiAgICByZXR1cm4gb2JqZWN0cy5yZWR1Y2UoZnVuY3Rpb24gKG9iamVjdHMsIG9iamVjdCkge1xuICAgICAgaWYgKG9iamVjdC50eXBlKSB7XG4gICAgICAgIGlmICghb2JqZWN0c1tvYmplY3QudHlwZV0pIHtcbiAgICAgICAgICBvYmplY3RzW29iamVjdC50eXBlXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIG9iamVjdHNbb2JqZWN0LnR5cGVdLnB1c2gob2JqZWN0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2Fybignb2JqZWN0IGZvdW5kIHdpdGhvdXQgdHlwZScsIG9iamVjdC5uYW1lLCBvYmplY3QpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9iamVjdHM7XG4gICAgfSwge30pO1xuICB9LFxuICBnZXRPYmplY3RzRnJvbVRpbGVtYXA6IGZ1bmN0aW9uIGdldE9iamVjdHNGcm9tVGlsZW1hcCh0aWxlbWFwKSB7XG4gICAgcmV0dXJuIHRpbGVtYXAuZGF0YS5sYXllcnMucmVkdWNlKGZ1bmN0aW9uIChvYmplY3RzLCBsYXllcikge1xuICAgICAgaWYgKGxheWVyLm9iamVjdHMpIHtcbiAgICAgICAgb2JqZWN0cyA9IG9iamVjdHMuY29uY2F0KGxheWVyLm9iamVjdHMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9iamVjdHM7XG4gICAgfSwgW10pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgUGhhc2VyIHNwcml0ZSBpbiBhIHNwcml0ZSBncm91cCBmcm9tIGEgVGlsZWQgb2JqZWN0XG4gICAqIEBwYXJhbSAge29iamVjdH0gb2JqZWN0IFRoZSBUaWxlZCBvYmplY3RcbiAgICogQHBhcmFtICB7Z3JvdXB9IGdyb3VwICAgVGhlIFBoYXNlciBzcHJpdGUgZ3JvdXBcbiAgICogQHJldHVybiB7U3ByaXRlfSAgICAgICAgVGhlIFBoYXNlciBzcHJpdGVcbiAgICovXG4gIGNyZWF0ZVNwcml0ZUZyb21UaWxlZE9iamVjdDogZnVuY3Rpb24gY3JlYXRlU3ByaXRlRnJvbVRpbGVkT2JqZWN0KG9iamVjdCwgZ3JvdXApIHtcbiAgICBpZiAoIW9iamVjdC5wcm9wZXJ0aWVzIHx8ICFvYmplY3QucHJvcGVydGllcy5zcHJpdGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ25vIHNwcml0ZSBkZWZpbmVkIGZvciBvYmplY3QnLCBvYmplY3QpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgc3ByaXRlID0gZ3JvdXAuY3JlYXRlKG9iamVjdC54LCBvYmplY3QueSAtIG9iamVjdC5oZWlnaHQsIG9iamVjdC5wcm9wZXJ0aWVzLnNwcml0ZSk7XG4gICAgc3ByaXRlLmdhbWVEYXRhID0ge1xuICAgICAgbmFtZTogb2JqZWN0Lm5hbWUsXG4gICAgICB0eXBlOiBvYmplY3QudHlwZVxuICAgIH07XG4gICAgT2JqZWN0LmFzc2lnbihzcHJpdGUuZ2FtZURhdGEsIG9iamVjdC5wcm9wZXJ0aWVzKTtcbiAgICByZXR1cm4gc3ByaXRlO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUaWxlZEludGVycHJldGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUwzTnlZeTl6WTNKcGNIUnpMMlZ1WjJsdVpTOVVhV3hsWkVsdWRHVnljSEpsZEdWeUxtcHpJbDBzSW01aGJXVnpJanBiSWxScGJHVmtTVzUwWlhKd2NtVjBaWElpTENKd2NtVnNiMkZrVkdsc1pXMWhjQ0lzSW01aGJXVWlMQ0pxYzI5dVRHOWpZWFJwYjI0aUxDSnNiMkZrSWl3aWIyNUdhV3hsUTI5dGNHeGxkR1VpTENKaFpHUWlMQ0p3Y205bmNtVnpjeUlzSW10bGVTSXNJbkJ5Wld4dllXUlVhV3hsYldGd1FYTnpaWFJ6SWl3aWRHbHNaVzFoY0NJc0lsQm9ZWE5sY2lJc0lsUnBiR1Z0WVhBaUxDSlVTVXhGUkY5S1UwOU9JaXdpWTJGamFHVWlMQ0puWlhSVWFXeGxiV0Z3UkdGMFlTSXNJbVJoZEdFaUxDSjBhV3hsYzJWMGN5SXNJbVp2Y2tWaFkyZ2lMQ0pwYldGblpTSXNJbk5sZENJc0luSmxjR3hoWTJVaUxDSm5aWFJUY0hKcGRHVnpSbkp2YlZScGJHVnRZWEFpTENKemNISnBkR1Z6YUdWbGRDSXNJbTlpYW1WamRDSXNJbkJ5YjNCbGNuUnBaWE1pTENKemNISnBkR1VpTENKM2FXUjBhQ0lzSW1obGFXZG9kQ0lzSW05aWFtVmpkSE5DZVZOd2NtbDBaVTFoY0NJc0lteGhlV1Z5Y3lJc0luSmxaSFZqWlNJc0ltOWlhbVZqZEhOQ2VWTndjbWwwWlNJc0lteGhlV1Z5SWl3aWIySnFaV04wY3lJc0lrOWlhbVZqZENJc0ltdGxlWE1pTENKdFlYQWlMQ0pqY21WaGRHVlVhV3hsYldGd0lpd2laMkZ0WlNJc0ltRmtaRlJwYkdWelpYUkpiV0ZuWlNJc0luUnBiR1YzYVdSMGFDSXNJblJwYkdWb1pXbG5hSFFpTENKcGJtbDBhV0YwWlZScGJHVmtUMkpxWldOMFIzSnZkWEJ6SWl3aVozSnZkWEJ6SWl3aWIySnFaV04wYzBKNVZIbHdaU0lzSW1GeWNtRnVaMlZQWW1wbFkzUnpRbmxVZVhCbElpd2lkSGx3WlNJc0ltZHliM1Z3SWl3aVpXNWhZbXhsUW05a2VTSXNJbU55WldGMFpWTndjbWwwWlVaeWIyMVVhV3hsWkU5aWFtVmpkQ0lzSW1sMFpXMGlMQ0p3ZFhOb0lpd2lZMjl1YzI5c1pTSXNJbmRoY200aUxDSm5aWFJQWW1wbFkzUnpSbkp2YlZScGJHVnRZWEFpTENKamIyNWpZWFFpTENKbGNuSnZjaUlzSW1OeVpXRjBaU0lzSW5naUxDSjVJaXdpWjJGdFpVUmhkR0VpTENKaGMzTnBaMjRpWFN3aWJXRndjR2x1WjNNaU9pSkJRVUZCT3pzN08wRkJTVUVzU1VGQlRVRXNiVUpCUVcxQ08wRkJRM1pDUXl4blFrRkVkVUlzTUVKQlExSkRMRWxCUkZFc1JVRkRSa01zV1VGRVJTeEZRVU5aTzBGQlFVRTdPMEZCUTJwRExGTkJRVXRETEVsQlFVd3NRMEZCVlVNc1kwRkJWaXhEUVVGNVFrTXNSMEZCZWtJc1EwRkJOa0lzVlVGQlEwTXNVVUZCUkN4RlFVRlhReXhIUVVGWUxFVkJRVzFDTzBGQlF6bERMRlZCUVVsQkxGRkJRVkZPTEVsQlFWb3NSVUZCYTBJN1FVRkRhRUlzWTBGQlMwOHNiMEpCUVV3c1EwRkJNRUpRTEVsQlFURkNPMEZCUTBRN1FVRkRSaXhMUVVwRU8wRkJTMEVzVTBGQlMwVXNTVUZCVEN4RFFVRlZUU3hQUVVGV0xFTkJRV3RDVWl4SlFVRnNRaXhGUVVGM1FrTXNXVUZCZUVJc1JVRkJjME1zU1VGQmRFTXNSVUZCTkVOUkxFOUJRVTlETEU5QlFWQXNRMEZCWlVNc1ZVRkJNMFE3UVVGRFJDeEhRVkp6UWp0QlFWTjJRa29zYzBKQlZIVkNMR2REUVZOR1VDeEpRVlJGTEVWQlUwazdRVUZCUVRzN1FVRkRla0lzVTBGQlMxRXNUMEZCVEN4SFFVRmxMRXRCUVV0SkxFdEJRVXdzUTBGQlYwTXNZMEZCV0N4RFFVRXdRbUlzU1VGQk1VSXNRMEZCWmp0QlFVTkJPMEZCUTBFc1UwRkJTMUVzVDBGQlRDeERRVUZoVFN4SlFVRmlMRU5CUVd0Q1F5eFJRVUZzUWl4RFFVRXlRa01zVDBGQk0wSXNRMEZCYlVNc1pVRkJUenRCUVVONFF6dEJRVU5CTEdGQlFVdGtMRWxCUVV3c1EwRkJWV1VzUzBGQlZpeERRVUZuUWtNc1NVRkJTV3hDTEVsQlFYQkNMR05CUVc5RGEwSXNTVUZCU1VRc1MwRkJTaXhEUVVGVlJTeFBRVUZXTEVOQlFXdENMRmRCUVd4Q0xFVkJRU3RDTEVWQlFTOUNMRU5CUVhCRE8wRkJRMFFzUzBGSVJEdEJRVWxCTzBGQlEwRXNVMEZCUzBNc2NVSkJRVXdzUTBGQk1rSXNTMEZCUzFvc1QwRkJhRU1zUlVGQmVVTlJMRTlCUVhwRExFTkJRV2xFTEd0Q1FVRlZPMEZCUTNwRUxHRkJRVXRrTEVsQlFVd3NRMEZCVlcxQ0xGZEJRVllzUTBGRFJVTXNUMEZCVDBNc1ZVRkJVQ3hEUVVGclFrTXNUVUZFY0VJc1kwRkZXVVlzVDBGQlQwTXNWVUZCVUN4RFFVRnJRa01zVFVGQmJFSXNRMEZCZVVKTUxFOUJRWHBDTEVOQlFXbERMRmRCUVdwRExFVkJRVGhETEVWQlFUbERMRU5CUmxvc1JVRkhSVWNzVDBGQlQwY3NTMEZJVkN4RlFVbEZTQ3hQUVVGUFNTeE5RVXBVTzBGQlRVUXNTMEZRUkR0QlFWRkVMRWRCZWtKelFqdEJRVEJDZGtKT0xIVkNRVEZDZFVJc2FVTkJNRUpFV2l4UFFURkNReXhGUVRCQ1VUdEJRVU0zUWl4UlFVRk5iVUlzY1VKQlFYRkNia0lzVVVGQlVVMHNTVUZCVWl4RFFVRmhZeXhOUVVGaUxFTkJRVzlDUXl4TlFVRndRaXhEUVVFeVFpeFZRVUZEUXl4bFFVRkVMRVZCUVd0Q1F5eExRVUZzUWl4RlFVRTBRanRCUVVOb1JpeFZRVUZKUVN4TlFVRk5ReXhQUVVGV0xFVkJRVzFDTzBGQlEycENSQ3hqUVVGTlF5eFBRVUZPTEVOQlFXTm9RaXhQUVVGa0xFTkJRWE5DTEd0Q1FVRlZPMEZCUXpsQ0xHTkJRVWxOTEU5QlFVOURMRlZCUVZBc1NVRkJjVUpFTEU5QlFVOURMRlZCUVZBc1EwRkJhMEpETEUxQlFYWkRMRWxCUVdsRUxFTkJRVU5OTEdkQ1FVRm5RbElzVDBGQlQwTXNWVUZCVUN4RFFVRnJRa01zVFVGQmJFTXNRMEZCZEVRc1JVRkJhVWM3UVVGREwwWk5MRFJDUVVGblFsSXNUMEZCVDBNc1ZVRkJVQ3hEUVVGclFrTXNUVUZCYkVNc1NVRkJORU5HTEUxQlFUVkRPMEZCUTBRN1FVRkRSaXhUUVVwRU8wRkJTMFE3UVVGRFJDeGhRVUZQVVN4bFFVRlFPMEZCUTBRc1MwRlVNRUlzUlVGVGVFSXNSVUZVZDBJc1EwRkJNMEk3UVVGVlFTeFhRVUZQUnl4UFFVRlBReXhKUVVGUUxFTkJRVmxRTEd0Q1FVRmFMRVZCUVdkRFVTeEhRVUZvUXl4RFFVRnZRenRCUVVGQkxHRkJRVTlTTEcxQ1FVRnRRbkpDTEVkQlFXNUNMRU5CUVZBN1FVRkJRU3hMUVVGd1F5eERRVUZRTzBGQlEwUXNSMEYwUTNOQ08wRkJkVU4yUWpoQ0xHVkJka04xUWl4NVFrRjFRMVJ3UXl4SlFYWkRVeXhGUVhWRFNEdEJRVU5zUWl4UlFVRk5iVU1zVFVGQlRTeExRVUZMUlN4SlFVRk1MRU5CUVZWcVF5eEhRVUZXTEVOQlFXTkpMRTlCUVdRc1EwRkJjMEpTTEVsQlFYUkNMRU5CUVZvN1FVRkRRU3hUUVVGTFVTeFBRVUZNTEVOQlFXRk5MRWxCUVdJc1EwRkJhMEpETEZGQlFXeENMRU5CUVRKQ1F5eFBRVUV6UWl4RFFVRnRReXhsUVVGUE8wRkJRM2hEYlVJc1ZVRkJTVWNzWlVGQlNpeERRVU5GY0VJc1NVRkJTV3hDTEVsQlJFNHNSVUZGUld0Q0xFbEJRVWxzUWl4SlFVWk9MRVZCUjBWclFpeEpRVUZKY1VJc1UwRklUaXhGUVVsRmNrSXNTVUZCU1hOQ0xGVkJTazQ3UVVGTlJDeExRVkJFT3p0QlFWTkJMRmRCUVU5TUxFZEJRVkE3UVVGRFJDeEhRVzVFYzBJN1FVRnZSSFpDVFN3eVFrRndSSFZDTEhGRFFXOUVSMDRzUjBGd1JFZ3NSVUZ2UkZFN1FVRkJRVHM3UVVGRE4wSTdRVUZEUVN4UlFVRk5UeXhUUVVGVExFVkJRV1k3UVVGRFFTeFJRVUZOUXl4blFrRkJaMElzUzBGQlMwTXNiMEpCUVV3c1EwRkJNRUpVTEVsQlFVbElMRTlCUVRsQ0xFTkJRWFJDTzBGQlEwRkRMRmRCUVU5RExFbEJRVkFzUTBGQldWTXNZVUZCV2l4RlFVRXlRak5DTEU5QlFUTkNMRU5CUVcxRExHZENRVUZSTzBGQlEzcERNRUlzWVVGQlQwY3NTVUZCVUN4SlFVRmxMRTlCUVV0U0xFbEJRVXdzUTBGQlZXcERMRWRCUVZZc1EwRkJZekJETEV0QlFXUXNSVUZCWmp0QlFVTkJTaXhoUVVGUFJ5eEpRVUZRTEVWQlFXRkZMRlZCUVdJc1IwRkJNRUlzU1VGQk1VSTdRVUZEUVVvc2IwSkJRV05GTEVsQlFXUXNSVUZCYjBJM1FpeFBRVUZ3UWl4RFFVRTBRanRCUVVGQkxHVkJRVkVzVDBGQlMyZERMREpDUVVGTUxFTkJRV2xEUXl4SlFVRnFReXhGUVVGMVExQXNUMEZCVDBjc1NVRkJVQ3hEUVVGMlF5eERRVUZTTzBGQlFVRXNUMEZCTlVJN1FVRkRSQ3hMUVVwRU8wRkJTMEVzVjBGQlQwZ3NUVUZCVUR0QlFVTkVMRWRCT1VSelFqdEJRU3RFZGtKRkxITkNRUzlFZFVJc1owTkJLMFJHV2l4UFFTOUVSU3hGUVN0RVR6dEJRVU0xUWl4WFFVRlBRU3hSUVVGUlNDeE5RVUZTTEVOQlFXVXNWVUZCUTBjc1QwRkJSQ3hGUVVGVlZpeE5RVUZXTEVWQlFYRkNPMEZCUTNwRExGVkJRVWxCTEU5QlFVOTFRaXhKUVVGWUxFVkJRV2xDTzBGQlEyWXNXVUZCU1N4RFFVRkRZaXhSUVVGUlZpeFBRVUZQZFVJc1NVRkJaaXhEUVVGTUxFVkJRVEpDTzBGQlEzcENZaXhyUWtGQlVWWXNUMEZCVDNWQ0xFbEJRV1lzU1VGQmRVSXNSVUZCZGtJN1FVRkRSRHRCUVVORVlpeG5Ra0ZCVVZZc1QwRkJUM1ZDTEVsQlFXWXNSVUZCY1VKTExFbEJRWEpDTEVOQlFUQkNOVUlzVFVGQk1VSTdRVUZEUkN4UFFVeEVMRTFCUzA4N1FVRkRURFpDTEdkQ1FVRlJReXhKUVVGU0xFTkJRV0VzTWtKQlFXSXNSVUZCTUVNNVFpeFBRVUZQZEVJc1NVRkJha1FzUlVGQmRVUnpRaXhOUVVGMlJEdEJRVU5FTzBGQlEwUXNZVUZCVDFVc1QwRkJVRHRCUVVORUxFdEJWazBzUlVGVlNpeEZRVlpKTEVOQlFWQTdRVUZYUkN4SFFUTkZjMEk3UVVFMFJYWkNjVUlzZFVKQk5VVjFRaXhwUTBFMFJVUTNReXhQUVRWRlF5eEZRVFJGVVR0QlFVTTNRaXhYUVVGUFFTeFJRVUZSVFN4SlFVRlNMRU5CUVdGakxFMUJRV0lzUTBGQmIwSkRMRTFCUVhCQ0xFTkJRVEpDTEZWQlFVTkhMRTlCUVVRc1JVRkJWVVFzUzBGQlZpeEZRVUZ2UWp0QlFVTndSQ3hWUVVGSlFTeE5RVUZOUXl4UFFVRldMRVZCUVcxQ08wRkJRMnBDUVN4clFrRkJWVUVzVVVGQlVYTkNMRTFCUVZJc1EwRkJaWFpDTEUxQlFVMURMRTlCUVhKQ0xFTkJRVlk3UVVGRFJEdEJRVU5FTEdGQlFVOUJMRTlCUVZBN1FVRkRSQ3hMUVV4TkxFVkJTMG9zUlVGTVNTeERRVUZRTzBGQlRVUXNSMEZ1Um5OQ096dEJRVzlHZGtJN096czdPenRCUVUxQlowSXNOa0pCTVVaMVFpeDFRMEV3UmtzeFFpeE5RVEZHVEN4RlFUQkdZWGRDTEV0Qk1VWmlMRVZCTUVadlFqdEJRVU42UXl4UlFVRkpMRU5CUVVONFFpeFBRVUZQUXl4VlFVRlNMRWxCUVhOQ0xFTkJRVU5FTEU5QlFVOURMRlZCUVZBc1EwRkJhMEpETEUxQlFUZERMRVZCUVhGRU8wRkJRMjVFTWtJc1kwRkJVVWtzUzBGQlVpeERRVUZqTERoQ1FVRmtMRVZCUVRoRGFrTXNUVUZCT1VNN1FVRkRRVHRCUVVORU8wRkJRMFFzVVVGQlRVVXNVMEZCVTNOQ0xFMUJRVTFWTEUxQlFVNHNRMEZCWVd4RExFOUJRVTl0UXl4RFFVRndRaXhGUVVGMVFtNURMRTlCUVU5dlF5eERRVUZRTEVkQlFWZHdReXhQUVVGUFNTeE5RVUY2UXl4RlFVRnBSRW9zVDBGQlQwTXNWVUZCVUN4RFFVRnJRa01zVFVGQmJrVXNRMEZCWmp0QlFVTkJRU3hYUVVGUGJVTXNVVUZCVUN4SFFVRnJRanRCUVVOb1FqTkVMRmxCUVUxelFpeFBRVUZQZEVJc1NVRkVSenRCUVVWb1FqWkRMRmxCUVUxMlFpeFBRVUZQZFVJN1FVRkdSeXhMUVVGc1FqdEJRVWxCV2l4WFFVRlBNa0lzVFVGQlVDeERRVUZqY0VNc1QwRkJUMjFETEZGQlFYSkNMRVZCUVN0Q2NrTXNUMEZCVDBNc1ZVRkJkRU03UVVGRFFTeFhRVUZQUXl4TlFVRlFPMEZCUTBRN1FVRjBSM05DTEVOQlFYcENPenRCUVhsSFFTeGxRVUZsTVVJc1owSkJRV1lpTENKbWFXeGxJam9pVkdsc1pXUkpiblJsY25CeVpYUmxjaTVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpOHFLbHh1SUNvZ1RXVjBhRzlrY3lCbWIzSWdhVzUwWlhKd2NtVjBhVzVuSUZScGJHVmtJRzFoY0NCa1lYUmhJR2x1ZEc4Z2RHaGxJR2RoYldWY2JpQXFJR2x1ZEdWdVpHVmtJSFJ2SUdWNGRHVnVaQ0JRYUdGelpYSXVVM1JoZEdWY2JpQXFMMXh1WTI5dWMzUWdWR2xzWldSSmJuUmxjbkJ5WlhSbGNpQTlJSHRjYmlBZ2NISmxiRzloWkZScGJHVnRZWEFvYm1GdFpTd2dhbk52Ymt4dlkyRjBhVzl1S1NCN1hHNGdJQ0FnZEdocGN5NXNiMkZrTG05dVJtbHNaVU52YlhCc1pYUmxMbUZrWkNnb2NISnZaM0psYzNNc0lHdGxlU2tnUFQ0Z2UxeHVJQ0FnSUNBZ2FXWWdLR3RsZVNBOVBUMGdibUZ0WlNrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG5CeVpXeHZZV1JVYVd4bGJXRndRWE56WlhSektHNWhiV1VwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDBwTzF4dUlDQWdJSFJvYVhNdWJHOWhaQzUwYVd4bGJXRndLRzVoYldVc0lHcHpiMjVNYjJOaGRHbHZiaXdnYm5Wc2JDd2dVR2hoYzJWeUxsUnBiR1Z0WVhBdVZFbE1SVVJmU2xOUFRpazdYRzRnSUgwc1hHNGdJSEJ5Wld4dllXUlVhV3hsYldGd1FYTnpaWFJ6S0c1aGJXVXBJSHRjYmlBZ0lDQjBhR2x6TG5ScGJHVnRZWEFnUFNCMGFHbHpMbU5oWTJobExtZGxkRlJwYkdWdFlYQkVZWFJoS0c1aGJXVXBPMXh1SUNBZ0lDOHZJR3h2WVdRZ2RHbHNaWE5sZENCcGJXRm5aWE5jYmlBZ0lDQjBhR2x6TG5ScGJHVnRZWEF1WkdGMFlTNTBhV3hsYzJWMGN5NW1iM0pGWVdOb0tITmxkQ0E5UGlCN1hHNGdJQ0FnSUNBdkx5QlVUMFJQSUdacGVDQjBhR2x6SUhObGRDNXBiV0ZuWlM1eVpYQnNZV05sSUhKbFoyVjRJR2hoWTJzc0lIUm9hWE1nYVhNZ1pYTnpaVzUwYVdGc2JIa2dhR0Z5WkNCamIyUmxaRnh1SUNBZ0lDQWdkR2hwY3k1c2IyRmtMbWx0WVdkbEtITmxkQzV1WVcxbExDQmdZWE56WlhSekx5UjdjMlYwTG1sdFlXZGxMbkpsY0d4aFkyVW9MeWhjWEM1Y1hDNWNYQzhwS3k4c0lDY25LWDFnS1R0Y2JpQWdJQ0I5S1R0Y2JpQWdJQ0F2THlCc2IyRmtJRzlpYW1WamRDQnpjSEpwZEdWelhHNGdJQ0FnZEdocGN5NW5aWFJUY0hKcGRHVnpSbkp2YlZScGJHVnRZWEFvZEdocGN5NTBhV3hsYldGd0tTNW1iM0pGWVdOb0tHOWlhbVZqZENBOVBpQjdYRzRnSUNBZ0lDQjBhR2x6TG14dllXUXVjM0J5YVhSbGMyaGxaWFFvWEc0Z0lDQWdJQ0FnSUc5aWFtVmpkQzV3Y205d1pYSjBhV1Z6TG5Od2NtbDBaU3hjYmlBZ0lDQWdJQ0FnWUdGemMyVjBjeThrZTI5aWFtVmpkQzV3Y205d1pYSjBhV1Z6TG5Od2NtbDBaUzV5WlhCc1lXTmxLQzhvWEZ3dVhGd3VYRnd2S1NzdkxDQW5KeWw5WUN4Y2JpQWdJQ0FnSUNBZ2IySnFaV04wTG5kcFpIUm9MRnh1SUNBZ0lDQWdJQ0J2WW1wbFkzUXVhR1ZwWjJoMFhHNGdJQ0FnSUNBcE8xeHVJQ0FnSUgwcE8xeHVJQ0I5TEZ4dUlDQm5aWFJUY0hKcGRHVnpSbkp2YlZScGJHVnRZWEFvZEdsc1pXMWhjQ2tnZTF4dUlDQWdJR052Ym5OMElHOWlhbVZqZEhOQ2VWTndjbWwwWlUxaGNDQTlJSFJwYkdWdFlYQXVaR0YwWVM1c1lYbGxjbk11Y21Wa2RXTmxLQ2h2WW1wbFkzUnpRbmxUY0hKcGRHVXNJR3hoZVdWeUtTQTlQaUI3WEc0Z0lDQWdJQ0JwWmlBb2JHRjVaWEl1YjJKcVpXTjBjeWtnZTF4dUlDQWdJQ0FnSUNCc1lYbGxjaTV2WW1wbFkzUnpMbVp2Y2tWaFkyZ29iMkpxWldOMElEMCtJSHRjYmlBZ0lDQWdJQ0FnSUNCcFppQW9iMkpxWldOMExuQnliM0JsY25ScFpYTWdKaVlnYjJKcVpXTjBMbkJ5YjNCbGNuUnBaWE11YzNCeWFYUmxJQ1ltSUNGdlltcGxZM1J6UW5sVGNISnBkR1ZiYjJKcVpXTjBMbkJ5YjNCbGNuUnBaWE11YzNCeWFYUmxYU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdiMkpxWldOMGMwSjVVM0J5YVhSbFcyOWlhbVZqZEM1d2NtOXdaWEowYVdWekxuTndjbWwwWlYwZ1BTQnZZbXBsWTNRN1hHNGdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0I5S1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0FnSUhKbGRIVnliaUJ2WW1wbFkzUnpRbmxUY0hKcGRHVTdYRzRnSUNBZ2ZTd2dlMzBwTzF4dUlDQWdJSEpsZEhWeWJpQlBZbXBsWTNRdWEyVjVjeWh2WW1wbFkzUnpRbmxUY0hKcGRHVk5ZWEFwTG0xaGNDaHJaWGtnUFQ0Z2IySnFaV04wYzBKNVUzQnlhWFJsVFdGd1cydGxlVjBwTzF4dUlDQjlMRnh1SUNCamNtVmhkR1ZVYVd4bGJXRndLRzVoYldVcElIdGNiaUFnSUNCamIyNXpkQ0J0WVhBZ1BTQjBhR2x6TG1kaGJXVXVZV1JrTG5ScGJHVnRZWEFvYm1GdFpTazdYRzRnSUNBZ2RHaHBjeTUwYVd4bGJXRndMbVJoZEdFdWRHbHNaWE5sZEhNdVptOXlSV0ZqYUNoelpYUWdQVDRnZTF4dUlDQWdJQ0FnYldGd0xtRmtaRlJwYkdWelpYUkpiV0ZuWlNoY2JpQWdJQ0FnSUNBZ2MyVjBMbTVoYldVc1hHNGdJQ0FnSUNBZ0lITmxkQzV1WVcxbExGeHVJQ0FnSUNBZ0lDQnpaWFF1ZEdsc1pYZHBaSFJvTEZ4dUlDQWdJQ0FnSUNCelpYUXVkR2xzWldobGFXZG9kRnh1SUNBZ0lDQWdLVHRjYmlBZ0lDQjlLVHRjYmx4dUlDQWdJSEpsZEhWeWJpQnRZWEE3WEc0Z0lIMHNYRzRnSUdsdWFYUnBZWFJsVkdsc1pXUlBZbXBsWTNSSGNtOTFjSE1vYldGd0tTQjdYRzRnSUNBZ0x5OGdWRTlFVHlCdVpXVmtJRzF2Y21VZ1pHRjBZU0JoWW05MWRDQnZZbXBsWTNSekwyVnVkR2wwYVdWeklHbHVJSFJwYkdWa0lHbHVJRzl5WkdWeUlIUnZJR1J2SUhSb2FYTmNiaUFnSUNCamIyNXpkQ0JuY205MWNITWdQU0I3ZlR0Y2JpQWdJQ0JqYjI1emRDQnZZbXBsWTNSelFubFVlWEJsSUQwZ2RHaHBjeTVoY25KaGJtZGxUMkpxWldOMGMwSjVWSGx3WlNodFlYQXViMkpxWldOMGN5azdYRzRnSUNBZ1QySnFaV04wTG10bGVYTW9iMkpxWldOMGMwSjVWSGx3WlNrdVptOXlSV0ZqYUNoMGVYQmxJRDArSUh0Y2JpQWdJQ0FnSUdkeWIzVndjMXQwZVhCbFhTQTlJSFJvYVhNdVoyRnRaUzVoWkdRdVozSnZkWEFvS1R0Y2JpQWdJQ0FnSUdkeWIzVndjMXQwZVhCbFhTNWxibUZpYkdWQ2IyUjVJRDBnZEhKMVpUdGNiaUFnSUNBZ0lHOWlhbVZqZEhOQ2VWUjVjR1ZiZEhsd1pWMHVabTl5UldGamFDaHBkR1Z0SUQwK0lIUm9hWE11WTNKbFlYUmxVM0J5YVhSbFJuSnZiVlJwYkdWa1QySnFaV04wS0dsMFpXMHNJR2R5YjNWd2MxdDBlWEJsWFNrcE8xeHVJQ0FnSUgwcE8xeHVJQ0FnSUhKbGRIVnliaUJuY205MWNITTdYRzRnSUgwc1hHNGdJR0Z5Y21GdVoyVlBZbXBsWTNSelFubFVlWEJsS0c5aWFtVmpkSE1wSUh0Y2JpQWdJQ0J5WlhSMWNtNGdiMkpxWldOMGN5NXlaV1IxWTJVb0tHOWlhbVZqZEhNc0lHOWlhbVZqZENrZ1BUNGdlMXh1SUNBZ0lDQWdhV1lnS0c5aWFtVmpkQzUwZVhCbEtTQjdYRzRnSUNBZ0lDQWdJR2xtSUNnaGIySnFaV04wYzF0dlltcGxZM1F1ZEhsd1pWMHBJSHRjYmlBZ0lDQWdJQ0FnSUNCdlltcGxZM1J6VzI5aWFtVmpkQzUwZVhCbFhTQTlJRnRkTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lHOWlhbVZqZEhOYmIySnFaV04wTG5SNWNHVmRMbkIxYzJnb2IySnFaV04wS1R0Y2JpQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUdOdmJuTnZiR1V1ZDJGeWJpZ25iMkpxWldOMElHWnZkVzVrSUhkcGRHaHZkWFFnZEhsd1pTY3NJRzlpYW1WamRDNXVZVzFsTENCdlltcGxZM1FwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJQ0FnY21WMGRYSnVJRzlpYW1WamRITTdYRzRnSUNBZ2ZTd2dlMzBwTzF4dUlDQjlMRnh1SUNCblpYUlBZbXBsWTNSelJuSnZiVlJwYkdWdFlYQW9kR2xzWlcxaGNDa2dlMXh1SUNBZ0lISmxkSFZ5YmlCMGFXeGxiV0Z3TG1SaGRHRXViR0Y1WlhKekxuSmxaSFZqWlNnb2IySnFaV04wY3l3Z2JHRjVaWElwSUQwK0lIdGNiaUFnSUNBZ0lHbG1JQ2hzWVhsbGNpNXZZbXBsWTNSektTQjdYRzRnSUNBZ0lDQWdJRzlpYW1WamRITWdQU0J2WW1wbFkzUnpMbU52Ym1OaGRDaHNZWGxsY2k1dlltcGxZM1J6S1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0FnSUhKbGRIVnliaUJ2WW1wbFkzUnpPMXh1SUNBZ0lIMHNJRnRkS1R0Y2JpQWdmU3hjYmlBZ0x5b3FYRzRnSUNBcUlFTnlaV0YwWlhNZ1lTQlFhR0Z6WlhJZ2MzQnlhWFJsSUdsdUlHRWdjM0J5YVhSbElHZHliM1Z3SUdaeWIyMGdZU0JVYVd4bFpDQnZZbXBsWTNSY2JpQWdJQ29nUUhCaGNtRnRJQ0I3YjJKcVpXTjBmU0J2WW1wbFkzUWdWR2hsSUZScGJHVmtJRzlpYW1WamRGeHVJQ0FnS2lCQWNHRnlZVzBnSUh0bmNtOTFjSDBnWjNKdmRYQWdJQ0JVYUdVZ1VHaGhjMlZ5SUhOd2NtbDBaU0JuY205MWNGeHVJQ0FnS2lCQWNtVjBkWEp1SUh0VGNISnBkR1Y5SUNBZ0lDQWdJQ0JVYUdVZ1VHaGhjMlZ5SUhOd2NtbDBaVnh1SUNBZ0tpOWNiaUFnWTNKbFlYUmxVM0J5YVhSbFJuSnZiVlJwYkdWa1QySnFaV04wS0c5aWFtVmpkQ3dnWjNKdmRYQXBJSHRjYmlBZ0lDQnBaaUFvSVc5aWFtVmpkQzV3Y205d1pYSjBhV1Z6SUh4OElDRnZZbXBsWTNRdWNISnZjR1Z5ZEdsbGN5NXpjSEpwZEdVcElIdGNiaUFnSUNBZ0lHTnZibk52YkdVdVpYSnliM0lvSjI1dklITndjbWwwWlNCa1pXWnBibVZrSUdadmNpQnZZbXBsWTNRbkxDQnZZbXBsWTNRcE8xeHVJQ0FnSUNBZ2NtVjBkWEp1TzF4dUlDQWdJSDFjYmlBZ0lDQmpiMjV6ZENCemNISnBkR1VnUFNCbmNtOTFjQzVqY21WaGRHVW9iMkpxWldOMExuZ3NJRzlpYW1WamRDNTVJQzBnYjJKcVpXTjBMbWhsYVdkb2RDd2diMkpxWldOMExuQnliM0JsY25ScFpYTXVjM0J5YVhSbEtUdGNiaUFnSUNCemNISnBkR1V1WjJGdFpVUmhkR0VnUFNCN1hHNGdJQ0FnSUNCdVlXMWxPaUJ2WW1wbFkzUXVibUZ0WlN4Y2JpQWdJQ0FnSUhSNWNHVTZJRzlpYW1WamRDNTBlWEJsWEc0Z0lDQWdmVHRjYmlBZ0lDQlBZbXBsWTNRdVlYTnphV2R1S0hOd2NtbDBaUzVuWVcxbFJHRjBZU3dnYjJKcVpXTjBMbkJ5YjNCbGNuUnBaWE1wTzF4dUlDQWdJSEpsZEhWeWJpQnpjSEpwZEdVN1hHNGdJSDFjYm4wN1hHNWNibVY0Y0c5eWRDQmtaV1poZFd4MElGUnBiR1ZrU1c1MFpYSndjbVYwWlhJN1hHNGlYWDA9IiwidmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5pbXBvcnQgVGlsZWRJbnRlcnByZXRlciBmcm9tICcuLi9lbmdpbmUvVGlsZWRJbnRlcnByZXRlcic7XG5cbmZ1bmN0aW9uIGNvbGxlY3QoZW50aXR5LCBpdGVtKSB7XG4gIGNvbnNvbGUubG9nKGVudGl0eS5rZXksICdjb2xsZWN0cycsIGl0ZW0uZ2FtZURhdGEuZGlzcGxheU5hbWUpO1xuICBpZiAoIWVudGl0eS5pbnZlbnRvcnkpIHtcbiAgICBlbnRpdHkuaW52ZW50b3J5ID0gW107XG4gIH1cbiAgZW50aXR5LmludmVudG9yeS5wdXNoKGl0ZW0uZ2FtZURhdGEpO1xuICBpdGVtLmRlc3Ryb3koKTtcbn1cblxuZnVuY3Rpb24gY29uc3VtZShlbnRpdHksIGl0ZW0pIHtcbiAgY29uc29sZS5sb2coZW50aXR5LmtleSwgJ2NvbnN1bWVzJywgaXRlbS5nYW1lRGF0YS5kaXNwbGF5TmFtZSk7XG4gIGl0ZW0uZGVzdHJveSgpO1xufVxuXG5mdW5jdGlvbiBrbm9ja0Rvb3IoZW50aXR5LCBkb29yKSB7XG4gIGlmICghZG9vci5nYW1lRGF0YSB8fCAhZG9vci5nYW1lRGF0YS5rZXkpIHtcbiAgICBjb25zb2xlLndhcm4oJ2Rvb3IgJyArIGRvb3IuZ2FtZURhdGEubmFtZSArICcgZG9lc25cXCd0IGhhdmUgbm8gZGFtbiBLRVknLCBkb29yKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoZW50aXR5LmludmVudG9yeSkge1xuICAgIHZhciBpdGVtID0gZW50aXR5LmludmVudG9yeS5maW5kKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gaXRlbS50eXBlID09PSAnS2V5JyAmJiBpdGVtLmlkID09PSBkb29yLmdhbWVEYXRhLmtleTtcbiAgICB9KTtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgZG9vci5kZXN0cm95KCk7XG4gICAgICBjb25zb2xlLmxvZygneW91IHVzZWQgdGhlICcgKyBpdGVtLmRpc3BsYXlOYW1lICsgJyBrZXkgb24gdGhlIGRvb3IgYW5kIGl0IG9wZW5lZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICBjb25zb2xlLmxvZygnbmVlZCBzb21lIGtleSBmb3IgdGhpcyBkb29yIGlkaW90Jyk7XG59XG5cbmZ1bmN0aW9uIGdhdGVDYW5PcGVuKGdhdGUpIHtcbiAgcmV0dXJuIGdhdGUuZ2FtZURhdGEub3BlbkRpcmVjdGlvbiA9PT0gJ25vcnRoJyAmJiBnYXRlLmJvZHkudG91Y2hpbmcudXAgfHwgZ2F0ZS5nYW1lRGF0YS5vcGVuRGlyZWN0aW9uID09PSAnc291dGgnICYmIGdhdGUuYm9keS50b3VjaGluZy5kb3duIHx8IGdhdGUuZ2FtZURhdGEub3BlbkRpcmVjdGlvbiA9PT0gJ3dlc3QnICYmIGdhdGUuYm9keS50b3VjaGluZy5sZWZ0IHx8IGdhdGUuZ2FtZURhdGEub3BlbkRpcmVjdGlvbiA9PT0gJ2Vhc3QnICYmIGdhdGUuYm9keS50b3VjaGluZy5yaWdodDtcbn1cblxuZnVuY3Rpb24ga25vY2tHYXRlKGVudGl0eSwgZ2F0ZSkge1xuICBpZiAoIWdhdGUuZ2FtZURhdGEgfHwgIWdhdGUuZ2FtZURhdGEub3BlbkRpcmVjdGlvbikge1xuICAgIGNvbnNvbGUud2FybignZ2F0ZSAnICsgZ2F0ZS5nYW1lRGF0YS5uYW1lICsgJyBhaW5cXCd0IGdvdCBubyBvcGVuRGlyZWN0aW9uJywgZ2F0ZSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChnYXRlQ2FuT3BlbihnYXRlKSkge1xuICAgIGdhdGUuZGVzdHJveSgpO1xuICAgIGNvbnNvbGUubG9nKCd0aGUgZ2F0ZSBoYXMgYSBoYW5kbGUgb24gdGhpcyBzaWRlLCB5b3Ugb3BlbmVkIGl0Jyk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coJ3RoZSBnYXRlIGRvZXMgbm90IG9wZW4gZnJvbSB0aGlzIHNpZGUnKTtcbiAgfVxufVxuXG52YXIgU3RhdGUgPSBmdW5jdGlvbiAoX1BoYXNlciRTdGF0ZSkge1xuICBfaW5oZXJpdHMoU3RhdGUsIF9QaGFzZXIkU3RhdGUpO1xuXG4gIGZ1bmN0aW9uIFN0YXRlKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTdGF0ZSk7XG5cbiAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKFN0YXRlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3RhdGUpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhTdGF0ZSwgW3tcbiAgICBrZXk6ICdpbml0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgIFBoYXNlci5DYW52YXMuc2V0SW1hZ2VSZW5kZXJpbmdDcmlzcCh0aGlzLmdhbWUuY2FudmFzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdwcmVsb2FkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcHJlbG9hZCgpIHtcbiAgICAgIHRoaXMucHJlbG9hZFRpbGVtYXAoJ2xldmVsMScsICdhc3NldHMvbWFwcy9sYXJnZXIuanNvbicsIG51bGwsIFBoYXNlci5UaWxlbWFwLlRJTEVEX0pTT04pO1xuICAgICAgdGhpcy5sb2FkLnNwcml0ZXNoZWV0KCdwbGF5ZXInLCAnYXNzZXRzL3Nwcml0ZXMvcGxheWVyLnBuZycsIDE2LCAxNik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY3JlYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIC8vIGxvYWRpbmcgc2NyZWVuIHdpbGwgaGF2ZSBhIHdoaXRlIGJhY2tncm91bmRcbiAgICAgIHRoaXMuZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XG5cbiAgICAgIC8vIHNjYWxpbmcgb3B0aW9uc1xuICAgICAgdGhpcy5zY2FsZS5zY2FsZU1vZGUgPSBQaGFzZXIuU2NhbGVNYW5hZ2VyLlNIT1dfQUxMO1xuXG4gICAgICAvLyBoYXZlIHRoZSBnYW1lIGNlbnRlcmVkIGhvcml6b250YWxseVxuICAgICAgdGhpcy5zY2FsZS5wYWdlQWxpZ25Ib3Jpem9udGFsbHkgPSB0cnVlO1xuICAgICAgdGhpcy5zY2FsZS5wYWdlQWxpZ25WZXJ0aWNhbGx5ID0gdHJ1ZTtcblxuICAgICAgdGhpcy5tYXAgPSB0aGlzLmNyZWF0ZVRpbGVtYXAoJ2xldmVsMScpO1xuXG4gICAgICB0aGlzLm1hcExheWVycyA9IFtdO1xuICAgICAgdGhpcy5jb2xsaWRlTGF5ZXJzID0gW107XG5cbiAgICAgIHRoaXMubWFwLmxheWVycy5mb3JFYWNoKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICB2YXIgY3JlYXRlZExheWVyID0gX3RoaXMyLm1hcC5jcmVhdGVMYXllcihsYXllci5uYW1lKTtcbiAgICAgICAgY3JlYXRlZExheWVyLnJlc2l6ZVdvcmxkKCk7XG4gICAgICAgIF90aGlzMi5tYXBMYXllcnMucHVzaChjcmVhdGVkTGF5ZXIpO1xuICAgICAgICBpZiAobGF5ZXIucHJvcGVydGllcy5pbXBhc3NhYmxlKSB7XG4gICAgICAgICAgX3RoaXMyLmNvbGxpZGVMYXllcnMucHVzaChjcmVhdGVkTGF5ZXIpO1xuICAgICAgICAgIF90aGlzMi5tYXAuc2V0Q29sbGlzaW9uQnlFeGNsdXNpb24oW10sIHRydWUsIGNyZWF0ZWRMYXllcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB2YXIgb2JqZWN0c0J5VHlwZSA9IHRoaXMuYXJyYW5nZU9iamVjdHNCeVR5cGUodGhpcy5nZXRPYmplY3RzRnJvbVRpbGVtYXAodGhpcy50aWxlbWFwKSk7XG5cbiAgICAgIGlmIChvYmplY3RzQnlUeXBlLkNvbnN1bWFibGUpIHtcbiAgICAgICAgdGhpcy5jb25zdW1hYmxlcyA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICAgICAgdGhpcy5jb25zdW1hYmxlcy5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICAgICAgdmFyIGNvbnN1bWFibGVzID0gb2JqZWN0c0J5VHlwZS5Db25zdW1hYmxlO1xuICAgICAgICBjb25zdW1hYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzMi5jcmVhdGVTcHJpdGVGcm9tVGlsZWRPYmplY3QoaXRlbSwgX3RoaXMyLmNvbnN1bWFibGVzKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvYmplY3RzQnlUeXBlLktleSkge1xuICAgICAgICB0aGlzLmtleXMgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgICAgIHRoaXMua2V5cy5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICAgICAgdmFyIGtleXMgPSBvYmplY3RzQnlUeXBlLktleTtcbiAgICAgICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzMi5jcmVhdGVTcHJpdGVGcm9tVGlsZWRPYmplY3QoaXRlbSwgX3RoaXMyLmtleXMpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9iamVjdHNCeVR5cGUuRG9vcikge1xuICAgICAgICB0aGlzLmRvb3JzID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuICAgICAgICB0aGlzLmRvb3JzLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgICAgICB2YXIgZG9vcnMgPSBvYmplY3RzQnlUeXBlLkRvb3I7XG4gICAgICAgIGRvb3JzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICB2YXIgc3ByaXRlID0gX3RoaXMyLmNyZWF0ZVNwcml0ZUZyb21UaWxlZE9iamVjdChpdGVtLCBfdGhpczIuZG9vcnMpO1xuICAgICAgICAgIHNwcml0ZS5ib2R5Lm1vdmVzID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAob2JqZWN0c0J5VHlwZS5HYXRlKSB7XG4gICAgICAgIHRoaXMuZ2F0ZXMgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgICAgIHRoaXMuZ2F0ZXMuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgICAgIHZhciBnYXRlcyA9IG9iamVjdHNCeVR5cGUuR2F0ZTtcbiAgICAgICAgZ2F0ZXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgIHZhciBzcHJpdGUgPSBfdGhpczIuY3JlYXRlU3ByaXRlRnJvbVRpbGVkT2JqZWN0KGl0ZW0sIF90aGlzMi5nYXRlcyk7XG4gICAgICAgICAgc3ByaXRlLmJvZHkubW92ZXMgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuXG4gICAgICAvLyBhZGQgcGxheWVyXG4gICAgICB2YXIgcGxheWVyU3RhcnQgPSBvYmplY3RzQnlUeXBlLlBsYXllclN0YXJ0WzBdO1xuICAgICAgdGhpcy5wbGF5ZXIgPSB0aGlzLmFkZC5zcHJpdGUocGxheWVyU3RhcnQueCwgcGxheWVyU3RhcnQueSAtIHBsYXllclN0YXJ0LmhlaWdodCwgJ3BsYXllcicpO1xuICAgICAgdGhpcy5waHlzaWNzLmFyY2FkZS5lbmFibGUodGhpcy5wbGF5ZXIpO1xuICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9ucy5hZGQoJ3dhbGsnLCBbMSwgMl0sIDEwLCB0cnVlKTtcbiAgICAgIHRoaXMucGxheWVyLmFuY2hvci5zZXRUbygwLjUsIDEpO1xuICAgICAgdGhpcy5wbGF5ZXIuYm9keS5zZXRTaXplKDEwLCA4LCAzLCA4KTtcbiAgICAgIHRoaXMuZ2FtZS5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyKTtcblxuICAgICAgdGhpcy5jdXJzb3JzID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcblxuICAgICAgY29uc29sZS5sb2coJ3lvdSBhd2FrZW4gaW4gYSByb2NreSBmb3Jlc3QnKTtcbiAgICAgIGNvbnNvbGUubG9nKCd0aGVyZSBhcmUgcGl4ZWxzIGFyb3VuZCB5b3UgdGhhdCBzaG91bGQgcHJvYmFibHkgYmUgdHJhbnNwYXJlbnQnKTtcbiAgICAgIGNvbnNvbGUubG9nKCd5b3Ugc29tZWhvdyBrbm93IHRoYXQgaW4gb3JkZXIgdG8gbGVhdmUgdGhpcyBwbGFjZScpO1xuICAgICAgY29uc29sZS5sb2coJ3lvdSB3aWxsIGhhdmUgdG8gdW5sb2NrIHNvbWUgZG9vcnMuLi4nKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd1cGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgdGhpcy5jb2xsaWRlTGF5ZXJzLmZvckVhY2goZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgIF90aGlzMy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUoX3RoaXMzLnBsYXllciwgbGF5ZXIpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcCh0aGlzLnBsYXllciwgdGhpcy5jb25zdW1hYmxlcywgY29uc3VtZSwgbnVsbCwgdGhpcyk7XG4gICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcCh0aGlzLnBsYXllciwgdGhpcy5rZXlzLCBjb2xsZWN0LCBudWxsLCB0aGlzKTtcbiAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLmRvb3JzLCBrbm9ja0Rvb3IsIG51bGwsIHRoaXMpO1xuICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMuZ2F0ZXMsIGtub2NrR2F0ZSwgbnVsbCwgdGhpcyk7XG4gICAgICAvLyAgUmVzZXQgdGhlIHRoaXMucGxheWVycyB2ZWxvY2l0eSAobW92ZW1lbnQpXG4gICAgICB0aGlzLnBsYXllci5ib2R5LnZlbG9jaXR5LnggPSAwO1xuICAgICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS55ID0gMDtcblxuICAgICAgdmFyIGRpcmVjdGlvbiA9ICcnO1xuICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgIGNhc2UgdGhpcy5jdXJzb3JzLmxlZnQuaXNEb3duOlxuICAgICAgICAgIGRpcmVjdGlvbiArPSAnbGVmdCc7XG4gICAgICAgICAgdGhpcy5wbGF5ZXIuYm9keS52ZWxvY2l0eS54ID0gLTc1O1xuICAgICAgICAgIHRoaXMucGxheWVyLnNjYWxlLnggPSAtMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0aGlzLmN1cnNvcnMucmlnaHQuaXNEb3duOlxuICAgICAgICAgIGRpcmVjdGlvbiArPSAncmlnaHQnO1xuICAgICAgICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueCA9IDc1O1xuICAgICAgICAgIHRoaXMucGxheWVyLnNjYWxlLnggPSAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgY2FzZSB0aGlzLmN1cnNvcnMudXAuaXNEb3duOlxuICAgICAgICAgIGRpcmVjdGlvbiArPSAndXAnO1xuICAgICAgICAgIHRoaXMucGxheWVyLmJvZHkudmVsb2NpdHkueSA9IC03NTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0aGlzLmN1cnNvcnMuZG93bi5pc0Rvd246XG4gICAgICAgICAgZGlyZWN0aW9uICs9ICdkb3duJztcbiAgICAgICAgICB0aGlzLnBsYXllci5ib2R5LnZlbG9jaXR5LnkgPSA3NTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKGRpcmVjdGlvbikge1xuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25zLnBsYXkoJ3dhbGsnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGxheWVyLmZyYW1lID0gMDtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gU3RhdGU7XG59KFBoYXNlci5TdGF0ZSk7XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oU3RhdGUucHJvdG90eXBlLCBUaWxlZEludGVycHJldGVyKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMM055WXk5elkzSnBjSFJ6TDNCdmMzTmxjM05wYjI0dmMzUmhkR1V1YW5NaVhTd2libUZ0WlhNaU9sc2lWR2xzWldSSmJuUmxjbkJ5WlhSbGNpSXNJbU52Ykd4bFkzUWlMQ0psYm5ScGRIa2lMQ0pwZEdWdElpd2lZMjl1YzI5c1pTSXNJbXh2WnlJc0ltdGxlU0lzSW1kaGJXVkVZWFJoSWl3aVpHbHpjR3hoZVU1aGJXVWlMQ0pwYm5abGJuUnZjbmtpTENKd2RYTm9JaXdpWkdWemRISnZlU0lzSW1OdmJuTjFiV1VpTENKcmJtOWphMFJ2YjNJaUxDSmtiMjl5SWl3aWQyRnliaUlzSW01aGJXVWlMQ0ptYVc1a0lpd2lkSGx3WlNJc0ltbGtJaXdpWjJGMFpVTmhiazl3Wlc0aUxDSm5ZWFJsSWl3aWIzQmxia1JwY21WamRHbHZiaUlzSW1KdlpIa2lMQ0owYjNWamFHbHVaeUlzSW5Wd0lpd2laRzkzYmlJc0lteGxablFpTENKeWFXZG9kQ0lzSW10dWIyTnJSMkYwWlNJc0lsTjBZWFJsSWl3aVVHaGhjMlZ5SWl3aVEyRnVkbUZ6SWl3aWMyVjBTVzFoWjJWU1pXNWtaWEpwYm1kRGNtbHpjQ0lzSW1kaGJXVWlMQ0pqWVc1MllYTWlMQ0p3Y21Wc2IyRmtWR2xzWlcxaGNDSXNJbFJwYkdWdFlYQWlMQ0pVU1V4RlJGOUtVMDlPSWl3aWJHOWhaQ0lzSW5Od2NtbDBaWE5vWldWMElpd2ljM1JoWjJVaUxDSmlZV05yWjNKdmRXNWtRMjlzYjNJaUxDSnpZMkZzWlNJc0luTmpZV3hsVFc5a1pTSXNJbE5qWVd4bFRXRnVZV2RsY2lJc0lsTklUMWRmUVV4TUlpd2ljR0ZuWlVGc2FXZHVTRzl5YVhwdmJuUmhiR3g1SWl3aWNHRm5aVUZzYVdkdVZtVnlkR2xqWVd4c2VTSXNJbTFoY0NJc0ltTnlaV0YwWlZScGJHVnRZWEFpTENKdFlYQk1ZWGxsY25NaUxDSmpiMnhzYVdSbFRHRjVaWEp6SWl3aWJHRjVaWEp6SWl3aVptOXlSV0ZqYUNJc0ltTnlaV0YwWldSTVlYbGxjaUlzSW1OeVpXRjBaVXhoZVdWeUlpd2liR0Y1WlhJaUxDSnlaWE5wZW1WWGIzSnNaQ0lzSW5CeWIzQmxjblJwWlhNaUxDSnBiWEJoYzNOaFlteGxJaXdpYzJWMFEyOXNiR2x6YVc5dVFubEZlR05zZFhOcGIyNGlMQ0p2WW1wbFkzUnpRbmxVZVhCbElpd2lZWEp5WVc1blpVOWlhbVZqZEhOQ2VWUjVjR1VpTENKblpYUlBZbXBsWTNSelJuSnZiVlJwYkdWdFlYQWlMQ0owYVd4bGJXRndJaXdpUTI5dWMzVnRZV0pzWlNJc0ltTnZibk4xYldGaWJHVnpJaXdpWVdSa0lpd2laM0p2ZFhBaUxDSmxibUZpYkdWQ2IyUjVJaXdpWTNKbFlYUmxVM0J5YVhSbFJuSnZiVlJwYkdWa1QySnFaV04wSWl3aVMyVjVJaXdpYTJWNWN5SXNJa1J2YjNJaUxDSmtiMjl5Y3lJc0luTndjbWwwWlNJc0ltMXZkbVZ6SWl3aVIyRjBaU0lzSW1kaGRHVnpJaXdpY0doNWMybGpjeUlzSW5OMFlYSjBVM2x6ZEdWdElpd2lVR2g1YzJsamN5SXNJa0ZTUTBGRVJTSXNJbkJzWVhsbGNsTjBZWEowSWl3aVVHeGhlV1Z5VTNSaGNuUWlMQ0p3YkdGNVpYSWlMQ0o0SWl3aWVTSXNJbWhsYVdkb2RDSXNJbUZ5WTJGa1pTSXNJbVZ1WVdKc1pTSXNJbUZ1YVcxaGRHbHZibk1pTENKaGJtTm9iM0lpTENKelpYUlVieUlzSW5ObGRGTnBlbVVpTENKallXMWxjbUVpTENKbWIyeHNiM2NpTENKamRYSnpiM0p6SWl3aWFXNXdkWFFpTENKclpYbGliMkZ5WkNJc0ltTnlaV0YwWlVOMWNuTnZja3RsZVhNaUxDSmpiMnhzYVdSbElpd2liM1psY214aGNDSXNJblpsYkc5amFYUjVJaXdpWkdseVpXTjBhVzl1SWl3aWFYTkViM2R1SWl3aWNHeGhlU0lzSW1aeVlXMWxJaXdpVDJKcVpXTjBJaXdpWVhOemFXZHVJaXdpY0hKdmRHOTBlWEJsSWwwc0ltMWhjSEJwYm1keklqb2lPenM3T3pzN096dEJRVUZCTEU5QlFVOUJMR2RDUVVGUUxFMUJRVFpDTERSQ1FVRTNRanM3UVVGRlFTeFRRVUZUUXl4UFFVRlVMRU5CUVdsQ1F5eE5RVUZxUWl4RlFVRjVRa01zU1VGQmVrSXNSVUZCSzBJN1FVRkROMEpETEZWQlFWRkRMRWRCUVZJc1EwRkJXVWdzVDBGQlQwa3NSMEZCYmtJc1JVRkJkMElzVlVGQmVFSXNSVUZCYjBOSUxFdEJRVXRKTEZGQlFVd3NRMEZCWTBNc1YwRkJiRVE3UVVGRFFTeE5RVUZKTEVOQlFVTk9MRTlCUVU5UExGTkJRVm9zUlVGQmRVSTdRVUZEY2tKUUxGZEJRVTlQTEZOQlFWQXNSMEZCYlVJc1JVRkJia0k3UVVGRFJEdEJRVU5FVUN4VFFVRlBUeXhUUVVGUUxFTkJRV2xDUXl4SlFVRnFRaXhEUVVGelFsQXNTMEZCUzBrc1VVRkJNMEk3UVVGRFFVb3NUMEZCUzFFc1QwRkJURHRCUVVORU96dEJRVVZFTEZOQlFWTkRMRTlCUVZRc1EwRkJhVUpXTEUxQlFXcENMRVZCUVhsQ1F5eEpRVUY2UWl4RlFVRXJRanRCUVVNM1FrTXNWVUZCVVVNc1IwRkJVaXhEUVVGWlNDeFBRVUZQU1N4SFFVRnVRaXhGUVVGM1FpeFZRVUY0UWl4RlFVRnZRMGdzUzBGQlMwa3NVVUZCVEN4RFFVRmpReXhYUVVGc1JEdEJRVU5CVEN4UFFVRkxVU3hQUVVGTU8wRkJRMFE3TzBGQlJVUXNVMEZCVTBVc1UwRkJWQ3hEUVVGdFFsZ3NUVUZCYmtJc1JVRkJNa0paTEVsQlFUTkNMRVZCUVdsRE8wRkJReTlDTEUxQlFVa3NRMEZCUTBFc1MwRkJTMUFzVVVGQlRpeEpRVUZyUWl4RFFVRkRUeXhMUVVGTFVDeFJRVUZNTEVOQlFXTkVMRWRCUVhKRExFVkJRVEJETzBGQlEzaERSaXhaUVVGUlZ5eEpRVUZTTEZkQlFYRkNSQ3hMUVVGTFVDeFJRVUZNTEVOQlFXTlRMRWxCUVc1RExHbERRVUZ2UlVZc1NVRkJjRVU3UVVGRFFUdEJRVU5FT3p0QlFVVkVMRTFCUVVsYUxFOUJRVTlQTEZOQlFWZ3NSVUZCYzBJN1FVRkRjRUlzVVVGQlRVNHNUMEZCVDBRc1QwRkJUMDhzVTBGQlVDeERRVUZwUWxFc1NVRkJha0lzUTBGRFdEdEJRVUZCTEdGQlFWRmtMRXRCUVV0bExFbEJRVXdzUzBGQll5eExRVUZrTEVsQlFYVkNaaXhMUVVGTFowSXNSVUZCVEN4TFFVRlpUQ3hMUVVGTFVDeFJRVUZNTEVOQlFXTkVMRWRCUVhwRU8wRkJRVUVzUzBGRVZ5eERRVUZpTzBGQlIwRXNVVUZCU1Vnc1NVRkJTaXhGUVVGVk8wRkJRMUpYTEZkQlFVdElMRTlCUVV3N1FVRkRRVkFzWTBGQlVVTXNSMEZCVWl4dFFrRkJORUpHTEV0QlFVdExMRmRCUVdwRE8wRkJRMEU3UVVGRFJEdEJRVU5HTzBGQlEwUktMRlZCUVZGRExFZEJRVklzUTBGQldTeHRRMEZCV2p0QlFVTkVPenRCUVVWRUxGTkJRVk5sTEZkQlFWUXNRMEZCY1VKRExFbEJRWEpDTEVWQlFUSkNPMEZCUTNwQ0xGTkJRMFZCTEV0QlFVdGtMRkZCUVV3c1EwRkJZMlVzWVVGQlpDeExRVUZuUXl4UFFVRm9ReXhKUVVFeVEwUXNTMEZCUzBVc1NVRkJUQ3hEUVVGVlF5eFJRVUZXTEVOQlFXMUNReXhGUVVFNVJDeEpRVU5IU2l4TFFVRkxaQ3hSUVVGTUxFTkJRV05sTEdGQlFXUXNTMEZCWjBNc1QwRkJhRU1zU1VGQk1rTkVMRXRCUVV0RkxFbEJRVXdzUTBGQlZVTXNVVUZCVml4RFFVRnRRa1VzU1VGRWFrVXNTVUZGUjB3c1MwRkJTMlFzVVVGQlRDeERRVUZqWlN4aFFVRmtMRXRCUVdkRExFMUJRV2hETEVsQlFUQkRSQ3hMUVVGTFJTeEpRVUZNTEVOQlFWVkRMRkZCUVZZc1EwRkJiVUpITEVsQlJtaEZMRWxCUjBkT0xFdEJRVXRrTEZGQlFVd3NRMEZCWTJVc1lVRkJaQ3hMUVVGblF5eE5RVUZvUXl4SlFVRXdRMFFzUzBGQlMwVXNTVUZCVEN4RFFVRlZReXhSUVVGV0xFTkJRVzFDU1N4TFFVcHNSVHRCUVUxRU96dEJRVVZFTEZOQlFWTkRMRk5CUVZRc1EwRkJiVUl6UWl4TlFVRnVRaXhGUVVFeVFtMUNMRWxCUVROQ0xFVkJRV2xETzBGQlF5OUNMRTFCUVVrc1EwRkJRMEVzUzBGQlMyUXNVVUZCVGl4SlFVRnJRaXhEUVVGRFl5eExRVUZMWkN4UlFVRk1MRU5CUVdObExHRkJRWEpETEVWQlFXOUVPMEZCUTJ4RWJFSXNXVUZCVVZjc1NVRkJVaXhYUVVGeFFrMHNTMEZCUzJRc1VVRkJUQ3hEUVVGalV5eEpRVUZ1UXl4dFEwRkJjMFZMTEVsQlFYUkZPMEZCUTBFN1FVRkRSRHRCUVVORUxFMUJRVWxFTEZsQlFWbERMRWxCUVZvc1EwRkJTaXhGUVVGMVFqdEJRVU55UWtFc1UwRkJTMVlzVDBGQlREdEJRVU5CVUN4WlFVRlJReXhIUVVGU0xFTkJRVmtzYlVSQlFWbzdRVUZEUkN4SFFVaEVMRTFCUjA4N1FVRkRURVFzV1VGQlVVTXNSMEZCVWl4RFFVRlpMSFZEUVVGYU8wRkJRMFE3UVVGRFJqczdTVUZGUzNsQ0xFczdPenM3T3pzN096czdPekpDUVVOSE8wRkJRMHhETEdGQlFVOURMRTFCUVZBc1EwRkJZME1zYzBKQlFXUXNRMEZCY1VNc1MwRkJTME1zU1VGQlRDeERRVUZWUXl4TlFVRXZRenRCUVVORU96czdPRUpCUTFNN1FVRkRVaXhYUVVGTFF5eGpRVUZNTEVOQlFXOUNMRkZCUVhCQ0xFVkJRVGhDTEhsQ1FVRTVRaXhGUVVGNVJDeEpRVUY2UkN4RlFVRXJSRXdzVDBGQlQwMHNUMEZCVUN4RFFVRmxReXhWUVVFNVJUdEJRVU5CTEZkQlFVdERMRWxCUVV3c1EwRkJWVU1zVjBGQlZpeERRVUZ6UWl4UlFVRjBRaXhGUVVGblF5d3lRa0ZCYUVNc1JVRkJOa1FzUlVGQk4wUXNSVUZCYVVVc1JVRkJha1U3UVVGRFJEczdPelpDUVVOUk8wRkJRVUU3TzBGQlExQTdRVUZEUVN4WFFVRkxUaXhKUVVGTUxFTkJRVlZQTEV0QlFWWXNRMEZCWjBKRExHVkJRV2hDTEVkQlFXdERMRTFCUVd4RE96dEJRVVZCTzBGQlEwRXNWMEZCUzBNc1MwRkJUQ3hEUVVGWFF5eFRRVUZZTEVkQlFYVkNZaXhQUVVGUFl5eFpRVUZRTEVOQlFXOUNReXhSUVVFelF6czdRVUZGUVR0QlFVTkJMRmRCUVV0SUxFdEJRVXdzUTBGQlYwa3NjVUpCUVZnc1IwRkJiVU1zU1VGQmJrTTdRVUZEUVN4WFFVRkxTaXhMUVVGTUxFTkJRVmRMTEcxQ1FVRllMRWRCUVdsRExFbEJRV3BET3p0QlFVVkJMRmRCUVV0RExFZEJRVXdzUjBGQlZ5eExRVUZMUXl4aFFVRk1MRU5CUVcxQ0xGRkJRVzVDTEVOQlFWZzdPMEZCUlVFc1YwRkJTME1zVTBGQlRDeEhRVUZwUWl4RlFVRnFRanRCUVVOQkxGZEJRVXRETEdGQlFVd3NSMEZCY1VJc1JVRkJja0k3TzBGQlJVRXNWMEZCUzBnc1IwRkJUQ3hEUVVGVFNTeE5RVUZVTEVOQlFXZENReXhQUVVGb1FpeERRVUYzUWl4cFFrRkJVenRCUVVNdlFpeFpRVUZOUXl4bFFVRmxMRTlCUVV0T0xFZEJRVXdzUTBGQlUwOHNWMEZCVkN4RFFVRnhRa01zVFVGQlRYcERMRWxCUVROQ0xFTkJRWEpDTzBGQlEwRjFReXh4UWtGQllVY3NWMEZCWWp0QlFVTkJMR1ZCUVV0UUxGTkJRVXdzUTBGQlpYcERMRWxCUVdZc1EwRkJiMEkyUXl4WlFVRndRanRCUVVOQkxGbEJRVWxGTEUxQlFVMUZMRlZCUVU0c1EwRkJhVUpETEZWQlFYSkNMRVZCUVdsRE8wRkJReTlDTEdsQ1FVRkxVaXhoUVVGTUxFTkJRVzFDTVVNc1NVRkJia0lzUTBGQmQwSTJReXhaUVVGNFFqdEJRVU5CTEdsQ1FVRkxUaXhIUVVGTUxFTkJRVk5aTEhWQ1FVRlVMRU5CUVdsRExFVkJRV3BETEVWQlFYRkRMRWxCUVhKRExFVkJRVEpEVGl4WlFVRXpRenRCUVVORU8wRkJRMFlzVDBGU1JEczdRVUZWUVN4VlFVRk5UeXhuUWtGQlowSXNTMEZCUzBNc2IwSkJRVXdzUTBGQk1FSXNTMEZCUzBNc2NVSkJRVXdzUTBGQk1rSXNTMEZCUzBNc1QwRkJhRU1zUTBGQk1VSXNRMEZCZEVJN08wRkJSVUVzVlVGQlNVZ3NZMEZCWTBrc1ZVRkJiRUlzUlVGQk9FSTdRVUZETlVJc1lVRkJTME1zVjBGQlRDeEhRVUZ0UWl4TFFVRkxha01zU1VGQlRDeERRVUZWYTBNc1IwRkJWaXhEUVVGalF5eExRVUZrTEVWQlFXNUNPMEZCUTBFc1lVRkJTMFlzVjBGQlRDeERRVUZwUWtjc1ZVRkJha0lzUjBGQk9FSXNTVUZCT1VJN1FVRkRRU3haUVVGTlNDeGpRVUZqVEN4alFVRmpTU3hWUVVGc1F6dEJRVU5CUXl4dlFrRkJXV0lzVDBGQldpeERRVUZ2UWp0QlFVRkJMR2xDUVVGUkxFOUJRVXRwUWl3eVFrRkJUQ3hEUVVGcFEzQkZMRWxCUVdwRExFVkJRWFZETEU5QlFVdG5SU3hYUVVFMVF5eERRVUZTTzBGQlFVRXNVMEZCY0VJN1FVRkRSRHM3UVVGRlJDeFZRVUZKVEN4alFVRmpWU3hIUVVGc1FpeEZRVUYxUWp0QlFVTnlRaXhoUVVGTFF5eEpRVUZNTEVkQlFWa3NTMEZCUzNaRExFbEJRVXdzUTBGQlZXdERMRWRCUVZZc1EwRkJZME1zUzBGQlpDeEZRVUZhTzBGQlEwRXNZVUZCUzBrc1NVRkJUQ3hEUVVGVlNDeFZRVUZXTEVkQlFYVkNMRWxCUVhaQ08wRkJRMEVzV1VGQlRVY3NUMEZCVDFnc1kwRkJZMVVzUjBGQk0wSTdRVUZEUVVNc1lVRkJTMjVDTEU5QlFVd3NRMEZCWVR0QlFVRkJMR2xDUVVGUkxFOUJRVXRwUWl3eVFrRkJUQ3hEUVVGcFEzQkZMRWxCUVdwRExFVkJRWFZETEU5QlFVdHpSU3hKUVVFMVF5eERRVUZTTzBGQlFVRXNVMEZCWWp0QlFVTkVPenRCUVVWRUxGVkJRVWxZTEdOQlFXTlpMRWxCUVd4Q0xFVkJRWGRDTzBGQlEzUkNMR0ZCUVV0RExFdEJRVXdzUjBGQllTeExRVUZMZWtNc1NVRkJUQ3hEUVVGVmEwTXNSMEZCVml4RFFVRmpReXhMUVVGa0xFVkJRV0k3UVVGRFFTeGhRVUZMVFN4TFFVRk1MRU5CUVZkTUxGVkJRVmdzUjBGQmQwSXNTVUZCZUVJN1FVRkRRU3haUVVGTlN5eFJRVUZSWWl4alFVRmpXU3hKUVVFMVFqdEJRVU5CUXl4alFVRk5ja0lzVDBGQlRpeERRVUZqTEdkQ1FVRlJPMEZCUTNCQ0xHTkJRVTF6UWl4VFFVRlRMRTlCUVV0TUxESkNRVUZNTEVOQlFXbERjRVVzU1VGQmFrTXNSVUZCZFVNc1QwRkJTM2RGTEV0QlFUVkRMRU5CUVdZN1FVRkRRVU1zYVVKQlFVOXlSQ3hKUVVGUUxFTkJRVmx6UkN4TFFVRmFMRWRCUVc5Q0xFdEJRWEJDTzBGQlEwUXNVMEZJUkR0QlFVbEVPenRCUVVWRUxGVkJRVWxtTEdOQlFXTm5RaXhKUVVGc1FpeEZRVUYzUWp0QlFVTjBRaXhoUVVGTFF5eExRVUZNTEVkQlFXRXNTMEZCU3pkRExFbEJRVXdzUTBGQlZXdERMRWRCUVZZc1EwRkJZME1zUzBGQlpDeEZRVUZpTzBGQlEwRXNZVUZCUzFVc1MwRkJUQ3hEUVVGWFZDeFZRVUZZTEVkQlFYZENMRWxCUVhoQ08wRkJRMEVzV1VGQlRWTXNVVUZCVVdwQ0xHTkJRV05uUWl4SlFVRTFRanRCUVVOQlF5eGpRVUZOZWtJc1QwRkJUaXhEUVVGakxHZENRVUZSTzBGQlEzQkNMR05CUVUxelFpeFRRVUZUTEU5QlFVdE1MREpDUVVGTUxFTkJRV2xEY0VVc1NVRkJha01zUlVGQmRVTXNUMEZCU3pSRkxFdEJRVFZETEVOQlFXWTdRVUZEUVVnc2FVSkJRVTl5UkN4SlFVRlFMRU5CUVZselJDeExRVUZhTEVkQlFXOUNMRXRCUVhCQ08wRkJRMFFzVTBGSVJEdEJRVWxFT3p0QlFVVkVMRmRCUVV0SExFOUJRVXdzUTBGQllVTXNWMEZCWWl4RFFVRjVRbXhFTEU5QlFVOXRSQ3hQUVVGUUxFTkJRV1ZETEUxQlFYaERPenRCUVVWQk8wRkJRMEVzVlVGQlRVTXNZMEZCWTNSQ0xHTkJRV04xUWl4WFFVRmtMRU5CUVRCQ0xFTkJRVEZDTEVOQlFYQkNPMEZCUTBFc1YwRkJTME1zVFVGQlRDeEhRVUZqTEV0QlFVdHNRaXhIUVVGTUxFTkJRVk5STEUxQlFWUXNRMEZCWjBKUkxGbEJRVmxITEVOQlFUVkNMRVZCUVN0Q1NDeFpRVUZaU1N4RFFVRmFMRWRCUVdkQ1NpeFpRVUZaU3l4TlFVRXpSQ3hGUVVGdFJTeFJRVUZ1UlN4RFFVRmtPMEZCUTBFc1YwRkJTMVFzVDBGQlRDeERRVUZoVlN4TlFVRmlMRU5CUVc5Q1F5eE5RVUZ3UWl4RFFVRXlRaXhMUVVGTFRDeE5RVUZvUXp0QlFVTkJMRmRCUVV0QkxFMUJRVXdzUTBGQldVMHNWVUZCV2l4RFFVRjFRbmhDTEVkQlFYWkNMRU5CUVRKQ0xFMUJRVE5DTEVWQlFXMURMRU5CUVVVc1EwRkJSaXhGUVVGTExFTkJRVXdzUTBGQmJrTXNSVUZCTmtNc1JVRkJOME1zUlVGQmFVUXNTVUZCYWtRN1FVRkRRU3hYUVVGTGEwSXNUVUZCVEN4RFFVRlpUeXhOUVVGYUxFTkJRVzFDUXl4TFFVRnVRaXhEUVVGNVFpeEhRVUY2UWl4RlFVRTRRaXhEUVVFNVFqdEJRVU5CTEZkQlFVdFNMRTFCUVV3c1EwRkJXUzlFTEVsQlFWb3NRMEZCYVVKM1JTeFBRVUZxUWl4RFFVRjVRaXhGUVVGNlFpeEZRVUUyUWl4RFFVRTNRaXhGUVVGblF5eERRVUZvUXl4RlFVRnRReXhEUVVGdVF6dEJRVU5CTEZkQlFVczNSQ3hKUVVGTUxFTkJRVlU0UkN4TlFVRldMRU5CUVdsQ1F5eE5RVUZxUWl4RFFVRjNRaXhMUVVGTFdDeE5RVUUzUWpzN1FVRkZRU3hYUVVGTFdTeFBRVUZNTEVkQlFXVXNTMEZCUzJoRkxFbEJRVXdzUTBGQlZXbEZMRXRCUVZZc1EwRkJaMEpETEZGQlFXaENMRU5CUVhsQ1F5eG5Ra0ZCZWtJc1JVRkJaanM3UVVGRlFXcEhMR05CUVZGRExFZEJRVklzUTBGQldTdzRRa0ZCV2p0QlFVTkJSQ3hqUVVGUlF5eEhRVUZTTEVOQlFWa3NhVVZCUVZvN1FVRkRRVVFzWTBGQlVVTXNSMEZCVWl4RFFVRlpMRzlFUVVGYU8wRkJRMEZFTEdOQlFWRkRMRWRCUVZJc1EwRkJXU3gxUTBGQldqdEJRVU5FT3pzN05rSkJRMUU3UVVGQlFUczdRVUZEVUN4WFFVRkxLME1zWVVGQlRDeERRVUZ0UWtVc1QwRkJia0lzUTBGQk1rSXNhVUpCUVZNN1FVRkRiRU1zWlVGQlMzQkNMRWxCUVV3c1EwRkJWVGhETEU5QlFWWXNRMEZCYTBKVkxFMUJRV3hDTEVOQlFYbENXU3hQUVVGNlFpeERRVUZwUXl4UFFVRkxhRUlzVFVGQmRFTXNSVUZCT0VNM1FpeExRVUU1UXp0QlFVTkVMRTlCUmtRN1FVRkhRU3hYUVVGTGRrSXNTVUZCVEN4RFFVRlZPRU1zVDBGQlZpeERRVUZyUWxVc1RVRkJiRUlzUTBGQmVVSmhMRTlCUVhwQ0xFTkJRV2xETEV0QlFVdHFRaXhOUVVGMFF5eEZRVUU0UXl4TFFVRkxia0lzVjBGQmJrUXNSVUZCWjBWMlJDeFBRVUZvUlN4RlFVRjVSU3hKUVVGNlJTeEZRVUVyUlN4SlFVRXZSVHRCUVVOQkxGZEJRVXR6UWl4SlFVRk1MRU5CUVZVNFF5eFBRVUZXTEVOQlFXdENWU3hOUVVGc1FpeERRVUY1UW1Fc1QwRkJla0lzUTBGQmFVTXNTMEZCUzJwQ0xFMUJRWFJETEVWQlFUaERMRXRCUVV0aUxFbEJRVzVFTEVWQlFYbEVlRVVzVDBGQmVrUXNSVUZCYTBVc1NVRkJiRVVzUlVGQmQwVXNTVUZCZUVVN1FVRkRRU3hYUVVGTGFVTXNTVUZCVEN4RFFVRlZPRU1zVDBGQlZpeERRVUZyUWxVc1RVRkJiRUlzUTBGQmVVSlpMRTlCUVhwQ0xFTkJRV2xETEV0QlFVdG9RaXhOUVVGMFF5eEZRVUU0UXl4TFFVRkxXQ3hMUVVGdVJDeEZRVUV3UkRsRUxGTkJRVEZFTEVWQlFYRkZMRWxCUVhKRkxFVkJRVEpGTEVsQlFUTkZPMEZCUTBFc1YwRkJTM0ZDTEVsQlFVd3NRMEZCVlRoRExFOUJRVllzUTBGQmEwSlZMRTFCUVd4Q0xFTkJRWGxDV1N4UFFVRjZRaXhEUVVGcFF5eExRVUZMYUVJc1RVRkJkRU1zUlVGQk9FTXNTMEZCUzFBc1MwRkJia1FzUlVGQk1FUnNSQ3hUUVVFeFJDeEZRVUZ4UlN4SlFVRnlSU3hGUVVFeVJTeEpRVUV6UlR0QlFVTkJPMEZCUTBFc1YwRkJTM2xFTEUxQlFVd3NRMEZCV1M5RUxFbEJRVm9zUTBGQmFVSnBSaXhSUVVGcVFpeERRVUV3UW1wQ0xFTkJRVEZDTEVkQlFUaENMRU5CUVRsQ08wRkJRMEVzVjBGQlMwUXNUVUZCVEN4RFFVRlpMMFFzU1VGQldpeERRVUZwUW1sR0xGRkJRV3BDTEVOQlFUQkNhRUlzUTBGQk1VSXNSMEZCT0VJc1EwRkJPVUk3TzBGQlJVRXNWVUZCU1dsQ0xGbEJRVmtzUlVGQmFFSTdRVUZEUVN4alFVRlJMRWxCUVZJN1FVRkRRU3hoUVVGTExFdEJRVXRRTEU5QlFVd3NRMEZCWVhaRkxFbEJRV0lzUTBGQmEwSXJSU3hOUVVGMlFqdEJRVU5GUkN4MVFrRkJZU3hOUVVGaU8wRkJRMEVzWlVGQlMyNUNMRTFCUVV3c1EwRkJXUzlFTEVsQlFWb3NRMEZCYVVKcFJpeFJRVUZxUWl4RFFVRXdRbXBDTEVOQlFURkNMRWRCUVRoQ0xFTkJRVU1zUlVGQkwwSTdRVUZEUVN4bFFVRkxSQ3hOUVVGTUxFTkJRVmt6UXl4TFFVRmFMRU5CUVd0Q05FTXNRMEZCYkVJc1IwRkJjMElzUTBGQlF5eERRVUYyUWp0QlFVTkJPMEZCUTBZc1lVRkJTeXhMUVVGTFZ5eFBRVUZNTEVOQlFXRjBSU3hMUVVGaUxFTkJRVzFDT0VVc1RVRkJlRUk3UVVGRFJVUXNkVUpCUVdFc1QwRkJZanRCUVVOQkxHVkJRVXR1UWl4TlFVRk1MRU5CUVZrdlJDeEpRVUZhTEVOQlFXbENhVVlzVVVGQmFrSXNRMEZCTUVKcVFpeERRVUV4UWl4SFFVRTRRaXhGUVVFNVFqdEJRVU5CTEdWQlFVdEVMRTFCUVV3c1EwRkJXVE5ETEV0QlFWb3NRMEZCYTBJMFF5eERRVUZzUWl4SFFVRnpRaXhEUVVGMFFqdEJRVU5CTzBGQlZrWTdPMEZCWVVFc1kwRkJVU3hKUVVGU08wRkJRMEVzWVVGQlN5eExRVUZMVnl4UFFVRk1MRU5CUVdGNlJTeEZRVUZpTEVOQlFXZENhVVlzVFVGQmNrSTdRVUZEUlVRc2RVSkJRV0VzU1VGQllqdEJRVU5CTEdWQlFVdHVRaXhOUVVGTUxFTkJRVmt2UkN4SlFVRmFMRU5CUVdsQ2FVWXNVVUZCYWtJc1EwRkJNRUpvUWl4RFFVRXhRaXhIUVVFNFFpeERRVUZETEVWQlFTOUNPMEZCUTBFN1FVRkRSaXhoUVVGTExFdEJRVXRWTEU5QlFVd3NRMEZCWVhoRkxFbEJRV0lzUTBGQmEwSm5SaXhOUVVGMlFqdEJRVU5GUkN4MVFrRkJZU3hOUVVGaU8wRkJRMEVzWlVGQlMyNUNMRTFCUVV3c1EwRkJXUzlFTEVsQlFWb3NRMEZCYVVKcFJpeFJRVUZxUWl4RFFVRXdRbWhDTEVOQlFURkNMRWRCUVRoQ0xFVkJRVGxDTzBGQlEwRTdRVUZTUmpzN1FVRlhRU3hWUVVGSmFVSXNVMEZCU2l4RlFVRmxPMEZCUTJJc1lVRkJTMjVDTEUxQlFVd3NRMEZCV1Uwc1ZVRkJXaXhEUVVGMVFtVXNTVUZCZGtJc1EwRkJORUlzVFVGQk5VSTdRVUZEUkN4UFFVWkVMRTFCUlU4N1FVRkRUQ3hoUVVGTGNrSXNUVUZCVEN4RFFVRlpjMElzUzBGQldpeEhRVUZ2UWl4RFFVRndRanRCUVVORU8wRkJRMFk3T3pzN1JVRnNTV2xDTjBVc1QwRkJUMFFzU3pzN1FVRnhTVE5DTEdWQlFXVXJSU3hQUVVGUFF5eE5RVUZRTEVOQlFXTm9SaXhOUVVGTmFVWXNVMEZCY0VJc1JVRkJLMEl2Unl4blFrRkJMMElzUTBGQlppSXNJbVpwYkdVaU9pSnpkR0YwWlM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJbWx0Y0c5eWRDQlVhV3hsWkVsdWRHVnljSEpsZEdWeUlHWnliMjBnSnk0dUwyVnVaMmx1WlM5VWFXeGxaRWx1ZEdWeWNISmxkR1Z5Snp0Y2JseHVablZ1WTNScGIyNGdZMjlzYkdWamRDaGxiblJwZEhrc0lHbDBaVzBwSUh0Y2JpQWdZMjl1YzI5c1pTNXNiMmNvWlc1MGFYUjVMbXRsZVN3Z0oyTnZiR3hsWTNSekp5d2dhWFJsYlM1bllXMWxSR0YwWVM1a2FYTndiR0Y1VG1GdFpTazdYRzRnSUdsbUlDZ2haVzUwYVhSNUxtbHVkbVZ1ZEc5eWVTa2dlMXh1SUNBZ0lHVnVkR2wwZVM1cGJuWmxiblJ2Y25rZ1BTQmJYVHRjYmlBZ2ZWeHVJQ0JsYm5ScGRIa3VhVzUyWlc1MGIzSjVMbkIxYzJnb2FYUmxiUzVuWVcxbFJHRjBZU2s3WEc0Z0lHbDBaVzB1WkdWemRISnZlU2dwTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJqYjI1emRXMWxLR1Z1ZEdsMGVTd2dhWFJsYlNrZ2UxeHVJQ0JqYjI1emIyeGxMbXh2WnlobGJuUnBkSGt1YTJWNUxDQW5ZMjl1YzNWdFpYTW5MQ0JwZEdWdExtZGhiV1ZFWVhSaExtUnBjM0JzWVhsT1lXMWxLVHRjYmlBZ2FYUmxiUzVrWlhOMGNtOTVLQ2s3WEc1OVhHNWNibVoxYm1OMGFXOXVJR3R1YjJOclJHOXZjaWhsYm5ScGRIa3NJR1J2YjNJcElIdGNiaUFnYVdZZ0tDRmtiMjl5TG1kaGJXVkVZWFJoSUh4OElDRmtiMjl5TG1kaGJXVkVZWFJoTG10bGVTa2dlMXh1SUNBZ0lHTnZibk52YkdVdWQyRnliaWhnWkc5dmNpQWtlMlJ2YjNJdVoyRnRaVVJoZEdFdWJtRnRaWDBnWkc5bGMyNG5kQ0JvWVhabElHNXZJR1JoYlc0Z1MwVlpZQ3dnWkc5dmNpazdYRzRnSUNBZ2NtVjBkWEp1TzF4dUlDQjlYRzVjYmlBZ2FXWWdLR1Z1ZEdsMGVTNXBiblpsYm5SdmNua3BJSHRjYmlBZ0lDQmpiMjV6ZENCcGRHVnRJRDBnWlc1MGFYUjVMbWx1ZG1WdWRHOXllUzVtYVc1a0tGeHVJQ0FnSUNBZ2FYUmxiU0E5UGlCcGRHVnRMblI1Y0dVZ1BUMDlJQ2RMWlhrbklDWW1JR2wwWlcwdWFXUWdQVDA5SUdSdmIzSXVaMkZ0WlVSaGRHRXVhMlY1WEc0Z0lDQWdLVHRjYmlBZ0lDQnBaaUFvYVhSbGJTa2dlMXh1SUNBZ0lDQWdaRzl2Y2k1a1pYTjBjbTk1S0NrN1hHNGdJQ0FnSUNCamIyNXpiMnhsTG14dlp5aGdlVzkxSUhWelpXUWdkR2hsSUNSN2FYUmxiUzVrYVhOd2JHRjVUbUZ0WlgwZ2EyVjVJRzl1SUhSb1pTQmtiMjl5SUdGdVpDQnBkQ0J2Y0dWdVpXUmdLVHRjYmlBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnSUNCOVhHNGdJSDFjYmlBZ1kyOXVjMjlzWlM1c2IyY29KMjVsWldRZ2MyOXRaU0JyWlhrZ1ptOXlJSFJvYVhNZ1pHOXZjaUJwWkdsdmRDY3BPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQm5ZWFJsUTJGdVQzQmxiaWhuWVhSbEtTQjdYRzRnSUhKbGRIVnliaUFvWEc0Z0lDQWdaMkYwWlM1bllXMWxSR0YwWVM1dmNHVnVSR2x5WldOMGFXOXVJRDA5UFNBbmJtOXlkR2duSUNZbUlHZGhkR1V1WW05a2VTNTBiM1ZqYUdsdVp5NTFjRnh1SUNBZ0lIeDhJR2RoZEdVdVoyRnRaVVJoZEdFdWIzQmxia1JwY21WamRHbHZiaUE5UFQwZ0ozTnZkWFJvSnlBbUppQm5ZWFJsTG1KdlpIa3VkRzkxWTJocGJtY3VaRzkzYmx4dUlDQWdJSHg4SUdkaGRHVXVaMkZ0WlVSaGRHRXViM0JsYmtScGNtVmpkR2x2YmlBOVBUMGdKM2RsYzNRbklDWW1JR2RoZEdVdVltOWtlUzUwYjNWamFHbHVaeTVzWldaMFhHNGdJQ0FnZkh3Z1oyRjBaUzVuWVcxbFJHRjBZUzV2Y0dWdVJHbHlaV04wYVc5dUlEMDlQU0FuWldGemRDY2dKaVlnWjJGMFpTNWliMlI1TG5SdmRXTm9hVzVuTG5KcFoyaDBYRzRnSUNrN1hHNTlYRzVjYm1aMWJtTjBhVzl1SUd0dWIyTnJSMkYwWlNobGJuUnBkSGtzSUdkaGRHVXBJSHRjYmlBZ2FXWWdLQ0ZuWVhSbExtZGhiV1ZFWVhSaElIeDhJQ0ZuWVhSbExtZGhiV1ZFWVhSaExtOXdaVzVFYVhKbFkzUnBiMjRwSUh0Y2JpQWdJQ0JqYjI1emIyeGxMbmRoY200b1lHZGhkR1VnSkh0bllYUmxMbWRoYldWRVlYUmhMbTVoYldWOUlHRnBiaWQwSUdkdmRDQnVieUJ2Y0dWdVJHbHlaV04wYVc5dVlDd2daMkYwWlNrN1hHNGdJQ0FnY21WMGRYSnVPMXh1SUNCOVhHNGdJR2xtSUNobllYUmxRMkZ1VDNCbGJpaG5ZWFJsS1NrZ2UxeHVJQ0FnSUdkaGRHVXVaR1Z6ZEhKdmVTZ3BPMXh1SUNBZ0lHTnZibk52YkdVdWJHOW5LQ2QwYUdVZ1oyRjBaU0JvWVhNZ1lTQm9ZVzVrYkdVZ2IyNGdkR2hwY3lCemFXUmxMQ0I1YjNVZ2IzQmxibVZrSUdsMEp5azdYRzRnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdZMjl1YzI5c1pTNXNiMmNvSjNSb1pTQm5ZWFJsSUdSdlpYTWdibTkwSUc5d1pXNGdabkp2YlNCMGFHbHpJSE5wWkdVbktUdGNiaUFnZlZ4dWZWeHVYRzVqYkdGemN5QlRkR0YwWlNCbGVIUmxibVJ6SUZCb1lYTmxjaTVUZEdGMFpTQjdYRzRnSUdsdWFYUW9LU0I3WEc0Z0lDQWdVR2hoYzJWeUxrTmhiblpoY3k1elpYUkpiV0ZuWlZKbGJtUmxjbWx1WjBOeWFYTndLSFJvYVhNdVoyRnRaUzVqWVc1MllYTXBPMXh1SUNCOVhHNGdJSEJ5Wld4dllXUW9LU0I3WEc0Z0lDQWdkR2hwY3k1d2NtVnNiMkZrVkdsc1pXMWhjQ2duYkdWMlpXd3hKeXdnSjJGemMyVjBjeTl0WVhCekwyeGhjbWRsY2k1cWMyOXVKeXdnYm5Wc2JDd2dVR2hoYzJWeUxsUnBiR1Z0WVhBdVZFbE1SVVJmU2xOUFRpazdYRzRnSUNBZ2RHaHBjeTVzYjJGa0xuTndjbWwwWlhOb1pXVjBLQ2R3YkdGNVpYSW5MQ0FuWVhOelpYUnpMM053Y21sMFpYTXZjR3hoZVdWeUxuQnVaeWNzSURFMkxDQXhOaWs3WEc0Z0lIMWNiaUFnWTNKbFlYUmxLQ2tnZTF4dUlDQWdJQzh2SUd4dllXUnBibWNnYzJOeVpXVnVJSGRwYkd3Z2FHRjJaU0JoSUhkb2FYUmxJR0poWTJ0bmNtOTFibVJjYmlBZ0lDQjBhR2x6TG1kaGJXVXVjM1JoWjJVdVltRmphMmR5YjNWdVpFTnZiRzl5SUQwZ0p5TXdNREFuTzF4dVhHNGdJQ0FnTHk4Z2MyTmhiR2x1WnlCdmNIUnBiMjV6WEc0Z0lDQWdkR2hwY3k1elkyRnNaUzV6WTJGc1pVMXZaR1VnUFNCUWFHRnpaWEl1VTJOaGJHVk5ZVzVoWjJWeUxsTklUMWRmUVV4TU8xeHVYRzRnSUNBZ0x5OGdhR0YyWlNCMGFHVWdaMkZ0WlNCalpXNTBaWEpsWkNCb2IzSnBlbTl1ZEdGc2JIbGNiaUFnSUNCMGFHbHpMbk5qWVd4bExuQmhaMlZCYkdsbmJraHZjbWw2YjI1MFlXeHNlU0E5SUhSeWRXVTdYRzRnSUNBZ2RHaHBjeTV6WTJGc1pTNXdZV2RsUVd4cFoyNVdaWEowYVdOaGJHeDVJRDBnZEhKMVpUdGNibHh1SUNBZ0lIUm9hWE11YldGd0lEMGdkR2hwY3k1amNtVmhkR1ZVYVd4bGJXRndLQ2RzWlhabGJERW5LVHRjYmx4dUlDQWdJSFJvYVhNdWJXRndUR0Y1WlhKeklEMGdXMTA3WEc0Z0lDQWdkR2hwY3k1amIyeHNhV1JsVEdGNVpYSnpJRDBnVzEwN1hHNWNiaUFnSUNCMGFHbHpMbTFoY0M1c1lYbGxjbk11Wm05eVJXRmphQ2hzWVhsbGNpQTlQaUI3WEc0Z0lDQWdJQ0JqYjI1emRDQmpjbVZoZEdWa1RHRjVaWElnUFNCMGFHbHpMbTFoY0M1amNtVmhkR1ZNWVhsbGNpaHNZWGxsY2k1dVlXMWxLVHRjYmlBZ0lDQWdJR055WldGMFpXUk1ZWGxsY2k1eVpYTnBlbVZYYjNKc1pDZ3BPMXh1SUNBZ0lDQWdkR2hwY3k1dFlYQk1ZWGxsY25NdWNIVnphQ2hqY21WaGRHVmtUR0Y1WlhJcE8xeHVJQ0FnSUNBZ2FXWWdLR3hoZVdWeUxuQnliM0JsY25ScFpYTXVhVzF3WVhOellXSnNaU2tnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMbU52Ykd4cFpHVk1ZWGxsY25NdWNIVnphQ2hqY21WaGRHVmtUR0Y1WlhJcE8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG0xaGNDNXpaWFJEYjJ4c2FYTnBiMjVDZVVWNFkyeDFjMmx2YmloYlhTd2dkSEoxWlN3Z1kzSmxZWFJsWkV4aGVXVnlLVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlLVHRjYmx4dUlDQWdJR052Ym5OMElHOWlhbVZqZEhOQ2VWUjVjR1VnUFNCMGFHbHpMbUZ5Y21GdVoyVlBZbXBsWTNSelFubFVlWEJsS0hSb2FYTXVaMlYwVDJKcVpXTjBjMFp5YjIxVWFXeGxiV0Z3S0hSb2FYTXVkR2xzWlcxaGNDa3BPMXh1WEc0Z0lDQWdhV1lnS0c5aWFtVmpkSE5DZVZSNWNHVXVRMjl1YzNWdFlXSnNaU2tnZTF4dUlDQWdJQ0FnZEdocGN5NWpiMjV6ZFcxaFlteGxjeUE5SUhSb2FYTXVaMkZ0WlM1aFpHUXVaM0p2ZFhBb0tUdGNiaUFnSUNBZ0lIUm9hWE11WTI5dWMzVnRZV0pzWlhNdVpXNWhZbXhsUW05a2VTQTlJSFJ5ZFdVN1hHNGdJQ0FnSUNCamIyNXpkQ0JqYjI1emRXMWhZbXhsY3lBOUlHOWlhbVZqZEhOQ2VWUjVjR1V1UTI5dWMzVnRZV0pzWlR0Y2JpQWdJQ0FnSUdOdmJuTjFiV0ZpYkdWekxtWnZja1ZoWTJnb2FYUmxiU0E5UGlCMGFHbHpMbU55WldGMFpWTndjbWwwWlVaeWIyMVVhV3hsWkU5aWFtVmpkQ2hwZEdWdExDQjBhR2x6TG1OdmJuTjFiV0ZpYkdWektTazdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2FXWWdLRzlpYW1WamRITkNlVlI1Y0dVdVMyVjVLU0I3WEc0Z0lDQWdJQ0IwYUdsekxtdGxlWE1nUFNCMGFHbHpMbWRoYldVdVlXUmtMbWR5YjNWd0tDazdYRzRnSUNBZ0lDQjBhR2x6TG10bGVYTXVaVzVoWW14bFFtOWtlU0E5SUhSeWRXVTdYRzRnSUNBZ0lDQmpiMjV6ZENCclpYbHpJRDBnYjJKcVpXTjBjMEo1Vkhsd1pTNUxaWGs3WEc0Z0lDQWdJQ0JyWlhsekxtWnZja1ZoWTJnb2FYUmxiU0E5UGlCMGFHbHpMbU55WldGMFpWTndjbWwwWlVaeWIyMVVhV3hsWkU5aWFtVmpkQ2hwZEdWdExDQjBhR2x6TG10bGVYTXBLVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQnBaaUFvYjJKcVpXTjBjMEo1Vkhsd1pTNUViMjl5S1NCN1hHNGdJQ0FnSUNCMGFHbHpMbVJ2YjNKeklEMGdkR2hwY3k1bllXMWxMbUZrWkM1bmNtOTFjQ2dwTzF4dUlDQWdJQ0FnZEdocGN5NWtiMjl5Y3k1bGJtRmliR1ZDYjJSNUlEMGdkSEoxWlR0Y2JpQWdJQ0FnSUdOdmJuTjBJR1J2YjNKeklEMGdiMkpxWldOMGMwSjVWSGx3WlM1RWIyOXlPMXh1SUNBZ0lDQWdaRzl2Y25NdVptOXlSV0ZqYUNocGRHVnRJRDArSUh0Y2JpQWdJQ0FnSUNBZ1kyOXVjM1FnYzNCeWFYUmxJRDBnZEdocGN5NWpjbVZoZEdWVGNISnBkR1ZHY205dFZHbHNaV1JQWW1wbFkzUW9hWFJsYlN3Z2RHaHBjeTVrYjI5eWN5azdYRzRnSUNBZ0lDQWdJSE53Y21sMFpTNWliMlI1TG0xdmRtVnpJRDBnWm1Gc2MyVTdYRzRnSUNBZ0lDQjlLVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQnBaaUFvYjJKcVpXTjBjMEo1Vkhsd1pTNUhZWFJsS1NCN1hHNGdJQ0FnSUNCMGFHbHpMbWRoZEdWeklEMGdkR2hwY3k1bllXMWxMbUZrWkM1bmNtOTFjQ2dwTzF4dUlDQWdJQ0FnZEdocGN5NW5ZWFJsY3k1bGJtRmliR1ZDYjJSNUlEMGdkSEoxWlR0Y2JpQWdJQ0FnSUdOdmJuTjBJR2RoZEdWeklEMGdiMkpxWldOMGMwSjVWSGx3WlM1SFlYUmxPMXh1SUNBZ0lDQWdaMkYwWlhNdVptOXlSV0ZqYUNocGRHVnRJRDArSUh0Y2JpQWdJQ0FnSUNBZ1kyOXVjM1FnYzNCeWFYUmxJRDBnZEdocGN5NWpjbVZoZEdWVGNISnBkR1ZHY205dFZHbHNaV1JQWW1wbFkzUW9hWFJsYlN3Z2RHaHBjeTVuWVhSbGN5azdYRzRnSUNBZ0lDQWdJSE53Y21sMFpTNWliMlI1TG0xdmRtVnpJRDBnWm1Gc2MyVTdYRzRnSUNBZ0lDQjlLVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQjBhR2x6TG5Cb2VYTnBZM011YzNSaGNuUlRlWE4wWlcwb1VHaGhjMlZ5TGxCb2VYTnBZM011UVZKRFFVUkZLVHRjYmx4dUlDQWdJQzh2SUdGa1pDQndiR0Y1WlhKY2JpQWdJQ0JqYjI1emRDQndiR0Y1WlhKVGRHRnlkQ0E5SUc5aWFtVmpkSE5DZVZSNWNHVXVVR3hoZVdWeVUzUmhjblJiTUYwN1hHNGdJQ0FnZEdocGN5NXdiR0Y1WlhJZ1BTQjBhR2x6TG1Ga1pDNXpjSEpwZEdVb2NHeGhlV1Z5VTNSaGNuUXVlQ3dnY0d4aGVXVnlVM1JoY25RdWVTQXRJSEJzWVhsbGNsTjBZWEowTG1obGFXZG9kQ3dnSjNCc1lYbGxjaWNwTzF4dUlDQWdJSFJvYVhNdWNHaDVjMmxqY3k1aGNtTmhaR1V1Wlc1aFlteGxLSFJvYVhNdWNHeGhlV1Z5S1R0Y2JpQWdJQ0IwYUdsekxuQnNZWGxsY2k1aGJtbHRZWFJwYjI1ekxtRmtaQ2duZDJGc2F5Y3NJRnNnTVN3Z01pQmRMQ0F4TUN3Z2RISjFaU2s3WEc0Z0lDQWdkR2hwY3k1d2JHRjVaWEl1WVc1amFHOXlMbk5sZEZSdktEQXVOU3dnTVNrN1hHNGdJQ0FnZEdocGN5NXdiR0Y1WlhJdVltOWtlUzV6WlhSVGFYcGxLREV3TENBNExDQXpMQ0E0S1R0Y2JpQWdJQ0IwYUdsekxtZGhiV1V1WTJGdFpYSmhMbVp2Ykd4dmR5aDBhR2x6TG5Cc1lYbGxjaWs3WEc1Y2JpQWdJQ0IwYUdsekxtTjFjbk52Y25NZ1BTQjBhR2x6TG1kaGJXVXVhVzV3ZFhRdWEyVjVZbTloY21RdVkzSmxZWFJsUTNWeWMyOXlTMlY1Y3lncE8xeHVYRzRnSUNBZ1kyOXVjMjlzWlM1c2IyY29KM2x2ZFNCaGQyRnJaVzRnYVc0Z1lTQnliMk5yZVNCbWIzSmxjM1FuS1R0Y2JpQWdJQ0JqYjI1emIyeGxMbXh2WnlnbmRHaGxjbVVnWVhKbElIQnBlR1ZzY3lCaGNtOTFibVFnZVc5MUlIUm9ZWFFnYzJodmRXeGtJSEJ5YjJKaFlteDVJR0psSUhSeVlXNXpjR0Z5Wlc1MEp5azdYRzRnSUNBZ1kyOXVjMjlzWlM1c2IyY29KM2x2ZFNCemIyMWxhRzkzSUd0dWIzY2dkR2hoZENCcGJpQnZjbVJsY2lCMGJ5QnNaV0YyWlNCMGFHbHpJSEJzWVdObEp5azdYRzRnSUNBZ1kyOXVjMjlzWlM1c2IyY29KM2x2ZFNCM2FXeHNJR2hoZG1VZ2RHOGdkVzVzYjJOcklITnZiV1VnWkc5dmNuTXVMaTRuS1R0Y2JpQWdmVnh1SUNCMWNHUmhkR1VvS1NCN1hHNGdJQ0FnZEdocGN5NWpiMnhzYVdSbFRHRjVaWEp6TG1admNrVmhZMmdvYkdGNVpYSWdQVDRnZTF4dUlDQWdJQ0FnZEdocGN5NW5ZVzFsTG5Cb2VYTnBZM011WVhKallXUmxMbU52Ykd4cFpHVW9kR2hwY3k1d2JHRjVaWElzSUd4aGVXVnlLVHRjYmlBZ0lDQjlLVHRjYmlBZ0lDQjBhR2x6TG1kaGJXVXVjR2g1YzJsamN5NWhjbU5oWkdVdWIzWmxjbXhoY0NoMGFHbHpMbkJzWVhsbGNpd2dkR2hwY3k1amIyNXpkVzFoWW14bGN5d2dZMjl1YzNWdFpTd2diblZzYkN3Z2RHaHBjeWs3WEc0Z0lDQWdkR2hwY3k1bllXMWxMbkJvZVhOcFkzTXVZWEpqWVdSbExtOTJaWEpzWVhBb2RHaHBjeTV3YkdGNVpYSXNJSFJvYVhNdWEyVjVjeXdnWTI5c2JHVmpkQ3dnYm5Wc2JDd2dkR2hwY3lrN1hHNGdJQ0FnZEdocGN5NW5ZVzFsTG5Cb2VYTnBZM011WVhKallXUmxMbU52Ykd4cFpHVW9kR2hwY3k1d2JHRjVaWElzSUhSb2FYTXVaRzl2Y25Nc0lHdHViMk5yUkc5dmNpd2diblZzYkN3Z2RHaHBjeWs3WEc0Z0lDQWdkR2hwY3k1bllXMWxMbkJvZVhOcFkzTXVZWEpqWVdSbExtTnZiR3hwWkdVb2RHaHBjeTV3YkdGNVpYSXNJSFJvYVhNdVoyRjBaWE1zSUd0dWIyTnJSMkYwWlN3Z2JuVnNiQ3dnZEdocGN5azdYRzRnSUNBZ0x5OGdJRkpsYzJWMElIUm9aU0IwYUdsekxuQnNZWGxsY25NZ2RtVnNiMk5wZEhrZ0tHMXZkbVZ0Wlc1MEtWeHVJQ0FnSUhSb2FYTXVjR3hoZVdWeUxtSnZaSGt1ZG1Wc2IyTnBkSGt1ZUNBOUlEQTdYRzRnSUNBZ2RHaHBjeTV3YkdGNVpYSXVZbTlrZVM1MlpXeHZZMmwwZVM1NUlEMGdNRHRjYmx4dUlDQWdJR3hsZENCa2FYSmxZM1JwYjI0Z1BTQW5KenRjYmlBZ0lDQnpkMmwwWTJnZ0tIUnlkV1VwSUh0Y2JpQWdJQ0JqWVhObElIUm9hWE11WTNWeWMyOXljeTVzWldaMExtbHpSRzkzYmpwY2JpQWdJQ0FnSUdScGNtVmpkR2x2YmlBclBTQW5iR1ZtZENjN1hHNGdJQ0FnSUNCMGFHbHpMbkJzWVhsbGNpNWliMlI1TG5abGJHOWphWFI1TG5nZ1BTQXROelU3WEc0Z0lDQWdJQ0IwYUdsekxuQnNZWGxsY2k1elkyRnNaUzU0SUQwZ0xURTdYRzRnSUNBZ0lDQmljbVZoYXp0Y2JpQWdJQ0JqWVhObElIUm9hWE11WTNWeWMyOXljeTV5YVdkb2RDNXBjMFJ2ZDI0NlhHNGdJQ0FnSUNCa2FYSmxZM1JwYjI0Z0t6MGdKM0pwWjJoMEp6dGNiaUFnSUNBZ0lIUm9hWE11Y0d4aGVXVnlMbUp2WkhrdWRtVnNiMk5wZEhrdWVDQTlJRGMxTzF4dUlDQWdJQ0FnZEdocGN5NXdiR0Y1WlhJdWMyTmhiR1V1ZUNBOUlERTdYRzRnSUNBZ0lDQmljbVZoYXp0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0J6ZDJsMFkyZ2dLSFJ5ZFdVcElIdGNiaUFnSUNCallYTmxJSFJvYVhNdVkzVnljMjl5Y3k1MWNDNXBjMFJ2ZDI0NlhHNGdJQ0FnSUNCa2FYSmxZM1JwYjI0Z0t6MGdKM1Z3Snp0Y2JpQWdJQ0FnSUhSb2FYTXVjR3hoZVdWeUxtSnZaSGt1ZG1Wc2IyTnBkSGt1ZVNBOUlDMDNOVHRjYmlBZ0lDQWdJR0p5WldGck8xeHVJQ0FnSUdOaGMyVWdkR2hwY3k1amRYSnpiM0p6TG1SdmQyNHVhWE5FYjNkdU9seHVJQ0FnSUNBZ1pHbHlaV04wYVc5dUlDczlJQ2RrYjNkdUp6dGNiaUFnSUNBZ0lIUm9hWE11Y0d4aGVXVnlMbUp2WkhrdWRtVnNiMk5wZEhrdWVTQTlJRGMxTzF4dUlDQWdJQ0FnWW5KbFlXczdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2FXWWdLR1JwY21WamRHbHZiaWtnZTF4dUlDQWdJQ0FnZEdocGN5NXdiR0Y1WlhJdVlXNXBiV0YwYVc5dWN5NXdiR0Y1S0NkM1lXeHJKeWs3WEc0Z0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lIUm9hWE11Y0d4aGVXVnlMbVp5WVcxbElEMGdNRHRjYmlBZ0lDQjlYRzRnSUgxY2JuMWNibHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdUMkpxWldOMExtRnpjMmxuYmloVGRHRjBaUzV3Y205MGIzUjVjR1VzSUZScGJHVmtTVzUwWlhKd2NtVjBaWElwTzF4dUlsMTkiLCJpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJztcbmltcG9ydCBwb3NzZXNzaW9uU3RhdGUgZnJvbSAnLi9wb3NzZXNzaW9uL3N0YXRlJztcblxudmFyIHRyYW5zcGFyZW50ID0gZmFsc2U7XG52YXIgYW50aWFsaWFzID0gZmFsc2U7XG52YXIgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSgzMjAsIDI0MCwgUGhhc2VyLkFVVE8sICcnLCB0aGlzLCB0cmFuc3BhcmVudCwgYW50aWFsaWFzKTtcblxuZ2FtZS5zdGF0ZS5hZGQoJ3Bvc3Nlc3Npb24nLCBwb3NzZXNzaW9uU3RhdGUsIHRydWUpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpNHVMeTR1TDNOeVl5OXpZM0pwY0hSekwybHVaR1Y0TG1weklsMHNJbTVoYldWeklqcGJJbkJ2YzNObGMzTnBiMjVUZEdGMFpTSXNJblJ5WVc1emNHRnlaVzUwSWl3aVlXNTBhV0ZzYVdGeklpd2laMkZ0WlNJc0lsQm9ZWE5sY2lJc0lrZGhiV1VpTENKQlZWUlBJaXdpYzNSaGRHVWlMQ0poWkdRaVhTd2liV0Z3Y0dsdVozTWlPaUpCUVVGQkxFOUJRVThzWjBKQlFWQTdRVUZEUVN4UFFVRlBRU3hsUVVGUUxFMUJRVFJDTEc5Q1FVRTFRanM3UVVGRlFTeEpRVUZOUXl4alFVRmpMRXRCUVhCQ08wRkJRMEVzU1VGQlRVTXNXVUZCV1N4TFFVRnNRanRCUVVOQkxFbEJRVTFETEU5QlFVOHNTVUZCU1VNc1QwRkJUME1zU1VGQldDeERRVUZuUWl4SFFVRm9RaXhGUVVGeFFpeEhRVUZ5UWl4RlFVRXdRa1FzVDBGQlQwVXNTVUZCYWtNc1JVRkJkVU1zUlVGQmRrTXNSVUZCTWtNc1NVRkJNME1zUlVGQmFVUk1MRmRCUVdwRUxFVkJRVGhFUXl4VFFVRTVSQ3hEUVVGaU96dEJRVVZCUXl4TFFVRkxTU3hMUVVGTUxFTkJRVmRETEVkQlFWZ3NRMEZCWlN4WlFVRm1MRVZCUVRaQ1VpeGxRVUUzUWl4RlFVRTRReXhKUVVFNVF5SXNJbVpwYkdVaU9pSnBibVJsZUM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJbWx0Y0c5eWRDQW5ZbUZpWld3dGNHOXNlV1pwYkd3bk8xeHVhVzF3YjNKMElIQnZjM05sYzNOcGIyNVRkR0YwWlNCbWNtOXRJQ2N1TDNCdmMzTmxjM05wYjI0dmMzUmhkR1VuTzF4dVhHNWpiMjV6ZENCMGNtRnVjM0JoY21WdWRDQTlJR1poYkhObE8xeHVZMjl1YzNRZ1lXNTBhV0ZzYVdGeklEMGdabUZzYzJVN1hHNWpiMjV6ZENCbllXMWxJRDBnYm1WM0lGQm9ZWE5sY2k1SFlXMWxLRE15TUN3Z01qUXdMQ0JRYUdGelpYSXVRVlZVVHl3Z0p5Y3NJSFJvYVhNc0lIUnlZVzV6Y0dGeVpXNTBMQ0JoYm5ScFlXeHBZWE1wTzF4dVhHNW5ZVzFsTG5OMFlYUmxMbUZrWkNnbmNHOXpjMlZ6YzJsdmJpY3NJSEJ2YzNObGMzTnBiMjVUZEdGMFpTd2dkSEoxWlNrN1hHNGlYWDA9Il0sIm5hbWVzIjpbInJlcXVpcmUkJDAiLCJpc09iamVjdCIsImRvY3VtZW50IiwicmVxdWlyZSQkMSIsInJlcXVpcmUkJDIiLCJhbk9iamVjdCIsInRvUHJpbWl0aXZlIiwiZFAiLCJyZXF1aXJlJCQzIiwiY3JlYXRlRGVzYyIsInJlcXVpcmUkJDQiLCJnbG9iYWwiLCJyZWRlZmluZSIsIlBST1RPVFlQRSIsIiRleHBvcnQiLCJoYXMiLCJjb3JlIiwid2tzRXh0IiwidG9JbnRlZ2VyIiwibWluIiwidG9JT2JqZWN0Iiwic2hhcmVkIiwidWlkIiwiJGtleXMiLCJnZXRLZXlzIiwiY29mIiwiZW51bUJ1Z0tleXMiLCJJRV9QUk9UTyIsInJlcXVpcmUkJDUiLCJnT1BOIiwidG9TdHJpbmciLCJwSUUiLCJJRThfRE9NX0RFRklORSIsImdPUEQiLCJyZXF1aXJlJCQ2IiwicmVxdWlyZSQkNyIsInJlcXVpcmUkJDgiLCJyZXF1aXJlJCQ5IiwicmVxdWlyZSQkMTAiLCJyZXF1aXJlJCQxMSIsInJlcXVpcmUkJDEyIiwicmVxdWlyZSQkMTMiLCJyZXF1aXJlJCQxNCIsInJlcXVpcmUkJDE1IiwicmVxdWlyZSQkMTYiLCJyZXF1aXJlJCQxNyIsInJlcXVpcmUkJDE4IiwicmVxdWlyZSQkMTkiLCJyZXF1aXJlJCQyMCIsInJlcXVpcmUkJDIxIiwicmVxdWlyZSQkMjIiLCJyZXF1aXJlJCQyMyIsInJlcXVpcmUkJDI0IiwicmVxdWlyZSQkMjUiLCJyZXF1aXJlJCQyNiIsInJlcXVpcmUkJDI3IiwicmVxdWlyZSQkMjgiLCJyZXF1aXJlJCQyOSIsIiRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJkZWZpbmVkIiwidG9PYmplY3QiLCJPYmplY3RQcm90byIsIm1ldGEiLCJnT1BTIiwiSU9iamVjdCIsIlRBRyIsImFGdW5jdGlvbiIsImZhaWxzIiwiJHBhcnNlSW50IiwiJHBhcnNlRmxvYXQiLCIkdHJpbSIsImZsb29yIiwiJGZhaWxzIiwiYU51bWJlclZhbHVlIiwiJGV4cG0xIiwic2lnbiIsInBvdyIsImFicyIsImV4cCIsImV4cG0xIiwidG9JbmRleCIsInRvTGVuZ3RoIiwic2V0VG9TdHJpbmdUYWciLCJMSUJSQVJZIiwiaGlkZSIsImdldFByb3RvdHlwZU9mIiwiJGF0IiwiTUFUQ0giLCJjb250ZXh0IiwiZ2V0VGltZSIsIk5VTUJFUiIsIlRPX1BSSU1JVElWRSIsInByb3RvIiwiSXRlcmF0b3JzIiwiSVRFUkFUT1IiLCIkZGVmaW5lUHJvcGVydHkiLCJjbGFzc29mIiwiY3R4IiwiY3JlYXRlUHJvcGVydHkiLCJhcnJheVNsaWNlIiwidGVzdCIsImlzQXJyYXkiLCIkcmVkdWNlIiwiJG5hdGl2ZSIsIk5FR0FUSVZFX1pFUk8iLCJBcnJheVByb3RvIiwiJGZpbmQiLCJLRVkiLCJmb3JjZWQiLCJERVNDUklQVE9SUyIsIlNQRUNJRVMiLCJpbmhlcml0SWZSZXF1aXJlZCIsImlzUmVnRXhwIiwiQmFzZSIsImtleXMiLCJpIiwiJGZsYWdzIiwiVE9fU1RSSU5HIiwiJHRvU3RyaW5nIiwiZGVmaW5lIiwid2tzIiwiaW52b2tlIiwiaHRtbCIsInByb2Nlc3MiLCJQcm9taXNlIiwiaXNOb2RlIiwic3BlY2llc0NvbnN0cnVjdG9yIiwiVHlwZUVycm9yIiwiVVNFX05BVElWRSIsImNyZWF0ZSIsImFuSW5zdGFuY2UiLCJmb3JPZiIsInN0ZXAiLCJyZWRlZmluZUFsbCIsInN0cm9uZyIsImlkIiwiVklFVyIsInJlcXVpcmUkJDMwIiwicmVxdWlyZSQkMzEiLCJyZXF1aXJlJCQzMiIsInJlcXVpcmUkJDMzIiwicmVxdWlyZSQkMzQiLCJyZXF1aXJlJCQzNSIsInJlcXVpcmUkJDM2IiwicmVxdWlyZSQkMzciLCJyZXF1aXJlJCQzOCIsIlJlZmxlY3QiLCJyZXBlYXQiLCIkcGFkIiwiaXNFbnVtIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwic3RvcmUiLCJvcmRpbmFyeURlZmluZU93bk1ldGFkYXRhIiwidG9NZXRhS2V5IiwibWV0YWRhdGEiLCJnZXRPckNyZWF0ZU1ldGFkYXRhTWFwIiwib3JkaW5hcnlIYXNPd25NZXRhZGF0YSIsIm9yZGluYXJ5R2V0T3duTWV0YWRhdGEiLCJmcm9tIiwib3JkaW5hcnlPd25NZXRhZGF0YUtleXMiLCJtaWNyb3Rhc2siLCJ3cmFwIiwiTkFNRSIsImtleSIsInRoaXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQUksTUFBTSxHQUFHLGNBQWMsR0FBRyxPQUFPLE1BQU0sSUFBSSxXQUFXLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJO0lBQzdFLE1BQU0sR0FBRyxPQUFPLElBQUksSUFBSSxXQUFXLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO0FBQ2hHLEdBQUcsT0FBTyxHQUFHLElBQUksUUFBUSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7OztBQ0h2QyxJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDO0FBQ3ZDLFFBQWMsR0FBRyxTQUFTLEVBQUUsRUFBRSxHQUFHLENBQUM7RUFDaEMsT0FBTyxjQUFjLENBQUMs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QVMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO01BQzFDLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztNQUN0QixJQUFJLFVBQVUsR0FBRyxLQUFLLEtBQUssU0FBUyxHQUFHLFVBQVUsR0FBRyxLQUFLLEtBQUssQ0FBQyxDQUFDOztNQUVoRSxJQUFJLGFBQWEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQztNQUM5RCxJQUFJLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7O01BRWhELEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsR0FBRyxhQUFhLENBQUMsTUFBTSxHQUFHLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztNQUNqRixNQUFNLEtBQUssR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztRQUV2QyxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO1VBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7O1VBRXRELEdBQUcsQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxVQUFVO1lBQ25FLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztXQUM5RixDQUFDLENBQUM7VUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1VBQ3pGLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7VUFDOUIsYUFBYSxHQUFHLFNBQVMsQ0FBQztVQUMxQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxVQUFVLENBQUMsTUFBTTtTQUN2QztRQUNELEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7T0FDMUU7TUFDRCxHQUFHLGFBQWEsS0FBSyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsR0FBRyxVQUFVLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7T0FDMUQsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztNQUNoRCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLEdBQUcsTUFBTSxDQUFDO0tBQzNFLENBQUM7O0dBRUgsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUMsTUFBTSxHQUFHLFNBQVMsU0FBUyxFQUFFLEtBQUssQ0FBQztNQUNqQyxPQUFPLFNBQVMsS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzFGLENBQUM7R0FDSDs7RUFFRCxPQUFPLENBQUMsU0FBUyxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQztJQUN0QyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ2xCLEVBQUUsR0FBRyxTQUFTLElBQUksU0FBUyxHQUFHLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0QsT0FBTyxFQUFFLEtBQUssU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7R0FDbkcsRUFBRSxNQUFNLENBQUMsQ0FBQztDQUNaLENBQUM7O0FDckVGLGVBQWMsR0FBRyxTQUFTLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQztFQUM5RCxHQUFHLEVBQUUsRUFBRSxZQUFZLFdBQVcsQ0FBQyxLQUFLLGNBQWMsS0FBSyxTQUFTLElBQUksY0FBYyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3hGLE1BQU0sU0FBUyxDQUFDLElBQUksR0FBRyx5QkFBeUIsQ0FBQyxDQUFDO0dBQ25ELENBQUMsT0FBTyxFQUFFLENBQUM7Q0FDYjs7O0FDSkQsSUFBSSxHQUFHLFdBQVdILElBQWlCO0lBQy9CLElBQUksVUFBVUcsU0FBdUI7SUFDckMsV0FBVyxHQUFHQyxZQUEyQjtJQUN6QyxRQUFRLE1BQU1JLFNBQXVCO0lBQ3JDLFFBQVEsTUFBTUUsU0FBdUI7SUFDckMsU0FBUyxLQUFLa0Isc0JBQXFDO0lBQ25ELEtBQUssU0FBUyxFQUFFO0lBQ2hCLE1BQU0sUUFBUSxFQUFFLENBQUM7QUFDckIsSUFBSSxPQUFPLEdBQUcsY0FBYyxHQUFHLFNBQVMsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQztFQUM1RSxJQUFJLE1BQU0sR0FBRyxRQUFRLEdBQUcsVUFBVSxFQUFFLE9BQU8sUUFBUSxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDO01BQ3hFLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztNQUN2QyxLQUFLLElBQUksQ0FBQztNQUNWLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQztFQUNuQyxHQUFHLE9BQU8sTUFBTSxJQUFJLFVBQVUsQ0FBQyxNQUFNLFNBQVMsQ0FBQyxRQUFRLEdBQUcsbUJBQW1CLENBQUMsQ0FBQzs7RUFFL0UsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEdBQUcsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQ3JGLE1BQU0sR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3hGLEdBQUcsTUFBTSxLQUFLLEtBQUssSUFBSSxNQUFNLEtBQUssTUFBTSxDQUFDLE9BQU8sTUFBTSxDQUFDO0dBQ3hELE1BQU0sSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLEdBQUc7SUFDNUUsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEQsR0FBRyxNQUFNLEtBQUssS0FBSyxJQUFJLE1BQU0sS0FBSyxNQUFNLENBQUMsT0FBTyxNQUFNLENBQUM7R0FDeEQ7Q0FDRixDQUFDO0FBQ0YsT0FBTyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUM7QUFDdkIsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNOzs7QUN2QnZCLElBQUl2QixVQUFRLElBQUlMLFNBQXVCO0lBQ25Da0UsV0FBUyxHQUFHL0QsVUFBd0I7SUFDcEMyRyxTQUFPLEtBQUsxRyxJQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzdDLHVCQUFjLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzdCLElBQUksQ0FBQyxHQUFHQyxVQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztFQUNuQyxPQUFPLENBQUMsS0FBSyxTQUFTLElBQUksQ0FBQyxDQUFDLEdBQUdBLFVBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQ3lHLFNBQU8sQ0FBQyxLQUFLLFNBQVMsR0FBRyxDQUFDLEdBQUc1QyxXQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDdEY7O0FDUEQsSUFBSStCLEtBQUcsa0JBQWtCakcsSUFBaUI7SUFDdEN5SCxRQUFNLGVBQWV0SCxPQUFvQjtJQUN6Q3VILE1BQUksaUJBQWlCdEgsS0FBa0I7SUFDdkMsR0FBRyxrQkFBa0JJLFVBQXdCO0lBQzdDRyxRQUFNLGVBQWVELE9BQW9CO0lBQ3pDaUgsU0FBTyxjQUFjaEgsUUFBTSxDQUFDLE9BQU87SUFDbkMsT0FBTyxjQUFjQSxRQUFNLENBQUMsWUFBWTtJQUN4QyxTQUFTLFlBQVlBLFFBQU0sQ0FBQyxjQUFjO0lBQzFDLGNBQWMsT0FBT0EsUUFBTSxDQUFDLGNBQWM7SUFDMUMsT0FBTyxjQUFjLENBQUM7SUFDdEIsS0FBSyxnQkFBZ0IsRUFBRTtJQUN2QixrQkFBa0IsR0FBRyxvQkFBb0I7SUFDekMsS0FBSztJQUFFLE9BQU87SUFBRSxJQUFJLENBQUM7QUFDekIsSUFBSSxHQUFHLEdBQUcsVUFBVTtFQUNsQixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQztFQUNmLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxQixJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkIsT0FBTyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakIsRUFBRSxFQUFFLENBQUM7R0FDTjtDQUNGLENBQUM7QUFDRixJQUFJLFFBQVEsR0FBRyxTQUFTLEtBQUssQ0FBQztFQUM1QixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUN0QixDQUFDOztBQUVGLEdBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7RUFDeEIsT0FBTyxHQUFHLFNBQVMsWUFBWSxDQUFDLEVBQUUsQ0FBQztJQUNqQyxJQUFJLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixNQUFNLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNyRCxLQUFLLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRyxVQUFVO01BQzNCOEcsUUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLFVBQVUsR0FBRyxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzNELENBQUM7SUFDRixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDZixPQUFPLE9BQU8sQ0FBQztHQUNoQixDQUFDO0VBQ0YsU0FBUyxHQUFHLFNBQVMsY0FBYyxDQUFDLEVBQUUsQ0FBQztJQUNyQyxPQUFPLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztHQUNsQixDQUFDOztFQUVGLEdBQUc3RixJQUFpQixDQUFDK0YsU0FBTyxDQUFDLElBQUksU0FBUyxDQUFDO0lBQ3pDLEtBQUssR0FBRyxTQUFTLEVBQUUsQ0FBQztNQUNsQkEsU0FBTyxDQUFDLFFBQVEsQ0FBQzFCLEtBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbkMsQ0FBQzs7R0FFSCxNQUFNLEdBQUcsY0FBYyxDQUFDO0lBQ3ZCLE9BQU8sR0FBRyxJQUFJLGNBQWMsQ0FBQztJQUM3QixJQUFJLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQztJQUN4QixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDbkMsS0FBSyxHQUFHQSxLQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7OztHQUd4QyxNQUFNLEdBQUd0RixRQUFNLENBQUMsZ0JBQWdCLElBQUksT0FBTyxXQUFXLElBQUksVUFBVSxJQUFJLENBQUNBLFFBQU0sQ0FBQyxhQUFhLENBQUM7SUFDN0YsS0FBSyxHQUFHLFNBQVMsRUFBRSxDQUFDO01BQ2xCQSxRQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDbEMsQ0FBQztJQUNGQSxRQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQzs7R0FFckQsTUFBTSxHQUFHLGtCQUFrQixJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxLQUFLLEdBQUcsU0FBUyxFQUFFLENBQUM7TUFDbEIrRyxNQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsVUFBVTtRQUM5REEsTUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO09BQ2QsQ0FBQztLQUNILENBQUM7O0dBRUgsTUFBTTtJQUNMLEtBQUssR0FBRyxTQUFTLEVBQUUsQ0FBQztNQUNsQixVQUFVLENBQUN6QixLQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUNoQyxDQUFDO0dBQ0g7Q0FDRjtBQUNELFNBQWMsR0FBRztFQUNmLEdBQUcsSUFBSSxPQUFPO0VBQ2QsS0FBSyxFQUFFLFNBQVM7Q0FDakI7O0FDMUVELElBQUl0RixTQUFNLE1BQU1YLE9BQW9CO0lBQ2hDLFNBQVMsR0FBR0csS0FBa0IsQ0FBQyxHQUFHO0lBQ2xDLFFBQVEsSUFBSVEsU0FBTSxDQUFDLGdCQUFnQixJQUFJQSxTQUFNLENBQUMsc0JBQXNCO0lBQ3BFZ0gsU0FBTyxLQUFLaEgsU0FBTSxDQUFDLE9BQU87SUFDMUJpSCxTQUFPLEtBQUtqSCxTQUFNLENBQUMsT0FBTztJQUMxQmtILFFBQU0sTUFBTXpILElBQWlCLENBQUN1SCxTQUFPLENBQUMsSUFBSSxTQUFTLENBQUM7O0FBRXhELGNBQWMsR0FBRyxVQUFVO0VBQ3pCLElBQUksSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUM7O0VBRXZCLElBQUksS0FBSyxHQUFHLFVBQVU7SUFDcEIsSUFBSSxNQUFNLEVBQUUsRUFBRSxDQUFDO0lBQ2YsR0FBR0UsUUFBTSxLQUFLLE1BQU0sR0FBR0YsU0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyRCxNQUFNLElBQUksQ0FBQztNQUNULEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDO01BQ2YsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7TUFDakIsSUFBSTtRQUNGLEVBQUUsRUFBRSxDQUFDO09BQ04sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNSLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ1osSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUN0QixNQUFNLENBQUMsQ0FBQztPQUNUO0tBQ0YsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO0lBQ25CLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztHQUMxQixDQUFDOzs7RUFHRixHQUFHRSxRQUFNLENBQUM7SUFDUixNQUFNLEdBQUcsVUFBVTtNQUNqQkYsU0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN6QixDQUFDOztHQUVILE1BQU0sR0FBRyxRQUFRLENBQUM7SUFDakIsSUFBSSxNQUFNLEdBQUcsSUFBSTtRQUNiLElBQUksS0FBSyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN6RCxNQUFNLEdBQUcsVUFBVTtNQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQztLQUM5QixDQUFDOztHQUVILE1BQU0sR0FBR0MsU0FBTyxJQUFJQSxTQUFPLENBQUMsT0FBTyxDQUFDO0lBQ25DLElBQUksT0FBTyxHQUFHQSxTQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDaEMsTUFBTSxHQUFHLFVBQVU7TUFDakIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNyQixDQUFDOzs7Ozs7O0dBT0gsTUFBTTtJQUNMLE1BQU0sR0FBRyxVQUFVOztNQUVqQixTQUFTLENBQUMsSUFBSSxDQUFDakgsU0FBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQy9CLENBQUM7R0FDSDs7RUFFRCxPQUFPLFNBQVMsRUFBRSxDQUFDO0lBQ2pCLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDckMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDekIsR0FBRyxDQUFDLElBQUksQ0FBQztNQUNQLElBQUksR0FBRyxJQUFJLENBQUM7TUFDWixNQUFNLEVBQUUsQ0FBQztLQUNWLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztHQUNmLENBQUM7Q0FDSDs7QUNuRUQsSUFBSUMsVUFBUSxHQUFHWixTQUFzQixDQUFDO0FBQ3RDLGdCQUFjLEdBQUcsU0FBUyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQztFQUMxQyxJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQ1ksVUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0VBQ3pELE9BQU8sTUFBTSxDQUFDO0NBQ2Y7O0FDSEQsSUFBSXVFLFNBQU8sY0FBY25GLFFBQXFCO0lBQzFDVyxRQUFNLGVBQWVSLE9BQW9CO0lBQ3pDOEYsS0FBRyxrQkFBa0I3RixJQUFpQjtJQUN0QzRGLFNBQU8sY0FBY3hGLFFBQXFCO0lBQzFDTSxVQUFPLGNBQWNKLE9BQW9CO0lBQ3pDVCxXQUFRLGFBQWEyQixTQUF1QjtJQUM1Q3NDLFdBQVMsWUFBWWhDLFVBQXdCO0lBQzdDLFVBQVUsV0FBV0MsV0FBeUI7SUFDOUMsS0FBSyxnQkFBZ0JDLE1BQW9CO0lBQ3pDMEYsb0JBQWtCLEdBQUd6RixtQkFBaUM7SUFDdEQsSUFBSSxpQkFBaUJDLEtBQWtCLENBQUMsR0FBRztJQUMzQyxTQUFTLFlBQVlDLFVBQXVCLEVBQUU7SUFDOUMsT0FBTyxjQUFjLFNBQVM7SUFDOUJ3RixXQUFTLFlBQVlwSCxRQUFNLENBQUMsU0FBUztJQUNyQ2dILFNBQU8sY0FBY2hILFFBQU0sQ0FBQyxPQUFPO0lBQ25DLFFBQVEsYUFBYUEsUUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNwQ2dILFNBQU8sY0FBY2hILFFBQU0sQ0FBQyxPQUFPO0lBQ25DLE1BQU0sZUFBZXFGLFNBQU8sQ0FBQzJCLFNBQU8sQ0FBQyxJQUFJLFNBQVM7SUFDbEQsS0FBSyxnQkFBZ0IsVUFBVSxlQUFlO0lBQzlDLFFBQVE7SUFBRSx3QkFBd0I7SUFBRSxPQUFPLENBQUM7O0FBRWhELElBQUlLLFlBQVUsR0FBRyxDQUFDLENBQUMsVUFBVTtFQUMzQixJQUFJOztJQUVGLElBQUksT0FBTyxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLFdBQVcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsRUFBRSxFQUFFeEYsSUFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLFNBQVMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7O0lBRW5ILE9BQU8sQ0FBQyxNQUFNLElBQUksT0FBTyxxQkFBcUIsSUFBSSxVQUFVLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxXQUFXLENBQUM7R0FDN0csQ0FBQyxNQUFNLENBQUMsQ0FBQyxlQUFlO0NBQzFCLEVBQUUsQ0FBQzs7O0FBR0osSUFBSSxlQUFlLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztFQUVsQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUssT0FBTyxDQUFDO0NBQ25ELENBQUM7QUFDRixJQUFJLFVBQVUsR0FBRyxTQUFTLEVBQUUsQ0FBQztFQUMzQixJQUFJLElBQUksQ0FBQztFQUNULE9BQU92QyxXQUFRLENBQUMsRUFBRSxDQUFDLElBQUksUUFBUSxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDO0NBQzdFLENBQUM7QUFDRixJQUFJLG9CQUFvQixHQUFHLFNBQVMsQ0FBQyxDQUFDO0VBQ3BDLE9BQU8sZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7TUFDL0IsSUFBSSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7TUFDeEIsSUFBSSx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNyQyxDQUFDO0FBQ0YsSUFBSSxpQkFBaUIsR0FBRyx3QkFBd0IsR0FBRyxTQUFTLENBQUMsQ0FBQztFQUM1RCxJQUFJLE9BQU8sRUFBRSxNQUFNLENBQUM7RUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxTQUFTLFNBQVMsRUFBRSxRQUFRLENBQUM7SUFDaEQsR0FBRyxPQUFPLEtBQUssU0FBUyxJQUFJLE1BQU0sS0FBSyxTQUFTLENBQUMsTUFBTThILFdBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQzVGLE9BQU8sR0FBRyxTQUFTLENBQUM7SUFDcEIsTUFBTSxJQUFJLFFBQVEsQ0FBQztHQUNwQixDQUFDLENBQUM7RUFDSCxJQUFJLENBQUMsT0FBTyxHQUFHN0QsV0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0VBQ2xDLElBQUksQ0FBQyxNQUFNLElBQUlBLFdBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUNsQyxDQUFDO0FBQ0YsSUFBSSxPQUFPLEdBQUcsU0FBUyxJQUFJLENBQUM7RUFDMUIsSUFBSTtJQUNGLElBQUksRUFBRSxDQUFDO0dBQ1IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNSLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7R0FDbkI7Q0FDRixDQUFDO0FBQ0YsSUFBSSxNQUFNLEdBQUcsU0FBUyxPQUFPLEVBQUUsUUFBUSxDQUFDO0VBQ3RDLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPO0VBQ3JCLE9BQU8sQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO0VBQ2xCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUM7RUFDdkIsU0FBUyxDQUFDLFVBQVU7SUFDbEIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEVBQUU7UUFDbEIsRUFBRSxNQUFNLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQztRQUN2QixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2QsSUFBSSxHQUFHLEdBQUcsU0FBUyxRQUFRLENBQUM7TUFDMUIsSUFBSSxPQUFPLEdBQUcsRUFBRSxHQUFHLFFBQVEsQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLElBQUk7VUFDMUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPO1VBQzFCLE1BQU0sSUFBSSxRQUFRLENBQUMsTUFBTTtVQUN6QixNQUFNLElBQUksUUFBUSxDQUFDLE1BQU07VUFDekIsTUFBTSxFQUFFLElBQUksQ0FBQztNQUNqQixJQUFJO1FBQ0YsR0FBRyxPQUFPLENBQUM7VUFDVCxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ0wsR0FBRyxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QyxPQUFPLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztXQUNoQjtVQUNELEdBQUcsT0FBTyxLQUFLLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2VBQzlCO1lBQ0gsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3pCLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1dBQ3pCO1VBQ0QsR0FBRyxNQUFNLEtBQUssUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUM3QixNQUFNLENBQUM2RCxXQUFTLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1dBQzFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztXQUNwQyxNQUFNLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN4QixNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUN0QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ1IsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQ1g7S0FDRixDQUFDO0lBQ0YsTUFBTSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN2QyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNoQixPQUFPLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztJQUNuQixHQUFHLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0dBQ2pELENBQUMsQ0FBQztDQUNKLENBQUM7QUFDRixJQUFJLFdBQVcsR0FBRyxTQUFTLE9BQU8sQ0FBQztFQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDcEgsUUFBTSxFQUFFLFVBQVU7SUFDMUIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEVBQUU7UUFDbEIsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7SUFDN0IsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7TUFDdEIsTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVO1FBQ3pCLEdBQUcsTUFBTSxDQUFDO1VBQ1JnSCxTQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNwRCxNQUFNLEdBQUcsT0FBTyxHQUFHaEgsUUFBTSxDQUFDLG9CQUFvQixDQUFDO1VBQzlDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDNUMsTUFBTSxHQUFHLENBQUMsT0FBTyxHQUFHQSxRQUFNLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxLQUFLLENBQUM7VUFDcEQsT0FBTyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNyRDtPQUNGLENBQUMsQ0FBQzs7TUFFSCxPQUFPLENBQUMsRUFBRSxHQUFHLE1BQU0sSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNyRCxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDO0lBQ3pCLEdBQUcsTUFBTSxDQUFDLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQztHQUM5QixDQUFDLENBQUM7Q0FDSixDQUFDO0FBQ0YsSUFBSSxXQUFXLEdBQUcsU0FBUyxPQUFPLENBQUM7RUFDakMsR0FBRyxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQztFQUNoQyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsRUFBRSxJQUFJLE9BQU8sQ0FBQyxFQUFFO01BQ2hDLENBQUMsT0FBTyxDQUFDO01BQ1QsUUFBUSxDQUFDO0VBQ2IsTUFBTSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNyQixRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEIsR0FBRyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQztHQUNqRSxDQUFDLE9BQU8sSUFBSSxDQUFDO0NBQ2YsQ0FBQztBQUNGLElBQUksaUJBQWlCLEdBQUcsU0FBUyxPQUFPLENBQUM7RUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQ0EsUUFBTSxFQUFFLFVBQVU7SUFDMUIsSUFBSSxPQUFPLENBQUM7SUFDWixHQUFHLE1BQU0sQ0FBQztNQUNSZ0gsU0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUMzQyxNQUFNLEdBQUcsT0FBTyxHQUFHaEgsUUFBTSxDQUFDLGtCQUFrQixDQUFDO01BQzVDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ2pEO0dBQ0YsQ0FBQyxDQUFDO0NBQ0osQ0FBQztBQUNGLElBQUksT0FBTyxHQUFHLFNBQVMsS0FBSyxDQUFDO0VBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztFQUNuQixHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTztFQUNyQixPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztFQUNsQixPQUFPLEdBQUcsT0FBTyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUM7RUFDaEMsT0FBTyxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7RUFDbkIsT0FBTyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDZixHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7RUFDL0MsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztDQUN2QixDQUFDO0FBQ0YsSUFBSSxRQUFRLEdBQUcsU0FBUyxLQUFLLENBQUM7RUFDNUIsSUFBSSxPQUFPLEdBQUcsSUFBSTtNQUNkLElBQUksQ0FBQztFQUNULEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPO0VBQ3JCLE9BQU8sQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO0VBQ2xCLE9BQU8sR0FBRyxPQUFPLENBQUMsRUFBRSxJQUFJLE9BQU8sQ0FBQztFQUNoQyxJQUFJO0lBQ0YsR0FBRyxPQUFPLEtBQUssS0FBSyxDQUFDLE1BQU1vSCxXQUFTLENBQUMsa0NBQWtDLENBQUMsQ0FBQztJQUN6RSxHQUFHLElBQUksR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7TUFDMUIsU0FBUyxDQUFDLFVBQVU7UUFDbEIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2QyxJQUFJO1VBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU5QixLQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRUEsS0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2RSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1VBQ1IsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDMUI7T0FDRixDQUFDLENBQUM7S0FDSixNQUFNO01BQ0wsT0FBTyxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7TUFDbkIsT0FBTyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7TUFDZixNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3hCO0dBQ0YsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNSLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztHQUMzQztDQUNGLENBQUM7OztBQUdGLEdBQUcsQ0FBQytCLFlBQVUsQ0FBQzs7RUFFYixRQUFRLEdBQUcsU0FBUyxPQUFPLENBQUMsUUFBUSxDQUFDO0lBQ25DLFVBQVUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxQzlELFdBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BCLElBQUk7TUFDRixRQUFRLENBQUMrQixLQUFHLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRUEsS0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN6RCxDQUFDLE1BQU0sR0FBRyxDQUFDO01BQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDekI7R0FDRixDQUFDO0VBQ0YsUUFBUSxHQUFHLFNBQVMsT0FBTyxDQUFDLFFBQVEsQ0FBQztJQUNuQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNiLElBQUksQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDO0lBQ3BCLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7SUFDaEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUM7SUFDcEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDWixJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztHQUNqQixDQUFDO0VBQ0YsUUFBUSxDQUFDLFNBQVMsR0FBR3hELFlBQTBCLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTs7SUFFbEUsSUFBSSxFQUFFLFNBQVMsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUM7TUFDMUMsSUFBSSxRQUFRLE1BQU0sb0JBQW9CLENBQUNxRixvQkFBa0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztNQUMzRSxRQUFRLENBQUMsRUFBRSxPQUFPLE9BQU8sV0FBVyxJQUFJLFVBQVUsR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDO01BQ3hFLFFBQVEsQ0FBQyxJQUFJLEtBQUssT0FBTyxVQUFVLElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQztNQUNoRSxRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sR0FBR0gsU0FBTyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7TUFDdEQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7TUFDdkIsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO01BQ2xDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO01BQy9CLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQztLQUN6Qjs7SUFFRCxPQUFPLEVBQUUsU0FBUyxVQUFVLENBQUM7TUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUN6QztHQUNGLENBQUMsQ0FBQztFQUNILGlCQUFpQixHQUFHLFVBQVU7SUFDNUIsSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLENBQUM7SUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRzFCLEtBQUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLElBQUksQ0FBQyxNQUFNLElBQUlBLEtBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0dBQ3pDLENBQUM7Q0FDSDs7QUFFRG5GLFVBQU8sQ0FBQ0EsVUFBTyxDQUFDLENBQUMsR0FBR0EsVUFBTyxDQUFDLENBQUMsR0FBR0EsVUFBTyxDQUFDLENBQUMsR0FBRyxDQUFDa0gsWUFBVSxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDOUV0RixlQUErQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNuREMsV0FBeUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNuQyxPQUFPLEdBQUdDLEtBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7OztBQUd0QzlCLFVBQU8sQ0FBQ0EsVUFBTyxDQUFDLENBQUMsR0FBR0EsVUFBTyxDQUFDLENBQUMsR0FBRyxDQUFDa0gsWUFBVSxFQUFFLE9BQU8sRUFBRTs7RUFFcEQsTUFBTSxFQUFFLFNBQVMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN4QixJQUFJLFVBQVUsR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7UUFDdkMsUUFBUSxLQUFLLFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFDbkMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1osT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDO0dBQzNCO0NBQ0YsQ0FBQyxDQUFDO0FBQ0hsSCxVQUFPLENBQUNBLFVBQU8sQ0FBQyxDQUFDLEdBQUdBLFVBQU8sQ0FBQyxDQUFDLElBQUlxRSxTQUFPLElBQUksQ0FBQzZDLFlBQVUsQ0FBQyxFQUFFLE9BQU8sRUFBRTs7RUFFakUsT0FBTyxFQUFFLFNBQVMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7SUFFMUIsR0FBRyxDQUFDLFlBQVksUUFBUSxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFFLElBQUksVUFBVSxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQztRQUN2QyxTQUFTLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQztJQUNwQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDYixPQUFPLFVBQVUsQ0FBQyxPQUFPLENBQUM7R0FDM0I7Q0FDRixDQUFDLENBQUM7QUFDSGxILFVBQU8sQ0FBQ0EsVUFBTyxDQUFDLENBQUMsR0FBR0EsVUFBTyxDQUFDLENBQUMsR0FBRyxFQUFFa0gsWUFBVSxJQUFJbkYsV0FBeUIsQ0FBQyxTQUFTLElBQUksQ0FBQztFQUN0RixRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3BDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRTs7RUFFWixHQUFHLEVBQUUsU0FBUyxHQUFHLENBQUMsUUFBUSxDQUFDO0lBQ3pCLElBQUksQ0FBQyxZQUFZLElBQUk7UUFDakIsVUFBVSxHQUFHLG9CQUFvQixDQUFDLENBQUMsQ0FBQztRQUNwQyxPQUFPLE1BQU0sVUFBVSxDQUFDLE9BQU87UUFDL0IsTUFBTSxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFDbkMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVU7TUFDN0IsSUFBSSxNQUFNLE1BQU0sRUFBRTtVQUNkLEtBQUssT0FBTyxDQUFDO1VBQ2IsU0FBUyxHQUFHLENBQUMsQ0FBQztNQUNsQixLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTLE9BQU8sQ0FBQztRQUN0QyxJQUFJLE1BQU0sVUFBVSxLQUFLLEVBQUU7WUFDdkIsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZCLFNBQVMsRUFBRSxDQUFDO1FBQ1osQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLENBQUM7VUFDckMsR0FBRyxhQUFhLENBQUMsT0FBTztVQUN4QixhQUFhLElBQUksSUFBSSxDQUFDO1VBQ3RCLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUM7VUFDdkIsRUFBRSxTQUFTLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2hDLEVBQUUsTUFBTSxDQUFDLENBQUM7T0FDWixDQUFDLENBQUM7TUFDSCxFQUFFLFNBQVMsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDaEMsQ0FBQyxDQUFDO0lBQ0gsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixPQUFPLFVBQVUsQ0FBQyxPQUFPLENBQUM7R0FDM0I7O0VBRUQsSUFBSSxFQUFFLFNBQVMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUMzQixJQUFJLENBQUMsWUFBWSxJQUFJO1FBQ2pCLFVBQVUsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7UUFDcEMsTUFBTSxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFDbkMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVU7TUFDN0IsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUyxPQUFPLENBQUM7UUFDdEMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztPQUNyRCxDQUFDLENBQUM7S0FDSixDQUFDLENBQUM7SUFDSCxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLE9BQU8sVUFBVSxDQUFDLE9BQU8sQ0FBQztHQUMzQjtDQUNGLENBQUM7O0FDelNGLElBQUl0QyxJQUFFLFlBQVlQLFNBQXVCLENBQUMsQ0FBQztJQUN2Q2lJLFFBQU0sUUFBUTlILGFBQTJCO0lBQ3pDLFdBQVcsR0FBR0MsWUFBMEI7SUFDeEM2RixLQUFHLFdBQVd6RixJQUFpQjtJQUMvQjBILFlBQVUsSUFBSXhILFdBQXlCO0lBQ3ZDaUQsU0FBTyxPQUFPL0IsUUFBcUI7SUFDbkN1RyxPQUFLLFNBQVNqRyxNQUFvQjtJQUNsQyxXQUFXLEdBQUdDLFdBQXlCO0lBQ3ZDaUcsTUFBSSxVQUFVaEcsU0FBdUI7SUFDckMsVUFBVSxJQUFJQyxXQUF5QjtJQUN2Q3dFLGFBQVcsR0FBR3ZFLFlBQXlCO0lBQ3ZDLE9BQU8sT0FBT0MsS0FBa0IsQ0FBQyxPQUFPO0lBQ3hDLElBQUksVUFBVXNFLGFBQVcsR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDOztBQUU5QyxJQUFJLFFBQVEsR0FBRyxTQUFTLElBQUksRUFBRSxHQUFHLENBQUM7O0VBRWhDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUM7RUFDaEMsR0FBRyxLQUFLLEtBQUssR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7RUFFdkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDMUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxPQUFPLEtBQUssQ0FBQztHQUNoQztDQUNGLENBQUM7O0FBRUYscUJBQWMsR0FBRztFQUNmLGNBQWMsRUFBRSxTQUFTLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQztJQUNwRCxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsUUFBUSxDQUFDO01BQ3RDcUIsWUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO01BQ2hDLElBQUksQ0FBQyxFQUFFLEdBQUdELFFBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUN2QixJQUFJLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQztNQUNwQixJQUFJLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQztNQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO01BQ2YsR0FBRyxRQUFRLElBQUksU0FBUyxDQUFDRSxPQUFLLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDckUsQ0FBQyxDQUFDO0lBQ0gsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUU7OztNQUd2QixLQUFLLEVBQUUsU0FBUyxLQUFLLEVBQUU7UUFDckIsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1VBQzNFLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1VBQ2YsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO1VBQzNDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QjtRQUNELElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztPQUNoQjs7O01BR0QsUUFBUSxFQUFFLFNBQVMsR0FBRyxDQUFDO1FBQ3JCLElBQUksSUFBSSxJQUFJLElBQUk7WUFDWixLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoQyxHQUFHLEtBQUssQ0FBQztVQUNQLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO2NBQ2QsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7VUFDbkIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztVQUN4QixLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztVQUNmLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1VBQ3RCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1VBQ3RCLEdBQUcsSUFBSSxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7VUFDbkMsR0FBRyxJQUFJLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztVQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztTQUNkLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDO09BQ2xCOzs7TUFHRCxPQUFPLEVBQUUsU0FBUyxPQUFPLENBQUMsVUFBVSx5QkFBeUI7UUFDM0RELFlBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxHQUFHakMsS0FBRyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUN2RSxLQUFLLENBQUM7UUFDVixNQUFNLEtBQUssR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1VBQ3RDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7O1VBRTFCLE1BQU0sS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDeEM7T0FDRjs7O01BR0QsR0FBRyxFQUFFLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO09BQzlCO0tBQ0YsQ0FBQyxDQUFDO0lBQ0gsR0FBR1ksYUFBVyxDQUFDdEcsSUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFO01BQ3JDLEdBQUcsRUFBRSxVQUFVO1FBQ2IsT0FBT29ELFNBQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztPQUM1QjtLQUNGLENBQUMsQ0FBQztJQUNILE9BQU8sQ0FBQyxDQUFDO0dBQ1Y7RUFDRCxHQUFHLEVBQUUsU0FBUyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQztJQUM3QixJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztRQUMzQixJQUFJLEVBQUUsS0FBSyxDQUFDOztJQUVoQixHQUFHLEtBQUssQ0FBQztNQUNQLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDOztLQUVqQixNQUFNO01BQ0wsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLEdBQUc7UUFDaEIsQ0FBQyxFQUFFLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztRQUM3QixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxLQUFLO1FBQ1IsQ0FBQyxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRTtRQUNqQixDQUFDLEVBQUUsU0FBUztRQUNaLENBQUMsRUFBRSxLQUFLO09BQ1QsQ0FBQztNQUNGLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDO01BQzVCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO01BQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDOztNQUViLEdBQUcsS0FBSyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztLQUN6QyxDQUFDLE9BQU8sSUFBSSxDQUFDO0dBQ2Y7RUFDRCxRQUFRLEVBQUUsUUFBUTtFQUNsQixTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQzs7O0lBR2xDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsUUFBUSxFQUFFLElBQUksQ0FBQztNQUMzQyxJQUFJLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQztNQUNuQixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztNQUNmLElBQUksQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDO0tBQ3JCLEVBQUUsVUFBVTtNQUNYLElBQUksSUFBSSxJQUFJLElBQUk7VUFDWixJQUFJLElBQUksSUFBSSxDQUFDLEVBQUU7VUFDZixLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQzs7TUFFcEIsTUFBTSxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQzs7TUFFdkMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDOztRQUUvRCxJQUFJLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQztRQUNwQixPQUFPeUUsTUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQ2hCOztNQUVELEdBQUcsSUFBSSxJQUFJLE1BQU0sR0FBRyxPQUFPQSxNQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUM1QyxHQUFHLElBQUksSUFBSSxRQUFRLENBQUMsT0FBT0EsTUFBSSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDNUMsT0FBT0EsTUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDcEMsRUFBRSxNQUFNLEdBQUcsU0FBUyxHQUFHLFFBQVEsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQzs7O0lBR2xELFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztHQUNsQjtDQUNGOztBQzVJRCxJQUFJekgsU0FBTSxjQUFjWCxPQUFvQjtJQUN4Q2MsVUFBTyxhQUFhWCxPQUFvQjtJQUN4Q1MsVUFBUSxZQUFZUixTQUFzQjtJQUMxQ2lJLGFBQVcsU0FBUzdILFlBQTBCO0lBQzlDc0QsTUFBSSxnQkFBZ0JwRCxLQUFrQjtJQUN0Q3lILE9BQUssZUFBZXZHLE1BQW9CO0lBQ3hDc0csWUFBVSxVQUFVaEcsV0FBeUI7SUFDN0NqQyxXQUFRLFlBQVlrQyxTQUF1QjtJQUMzQ2dDLE9BQUssZUFBZS9CLE1BQW1CO0lBQ3ZDLFdBQVcsU0FBU0MsV0FBeUI7SUFDN0M2QyxnQkFBYyxNQUFNNUMsZUFBK0I7SUFDbkR5RSxtQkFBaUIsR0FBR3hFLGtCQUFpQyxDQUFDOztBQUUxRCxlQUFjLEdBQUcsU0FBUyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQztFQUN4RSxJQUFJLElBQUksSUFBSTVCLFNBQU0sQ0FBQyxJQUFJLENBQUM7TUFDcEIsQ0FBQyxPQUFPLElBQUk7TUFDWixLQUFLLEdBQUcsTUFBTSxHQUFHLEtBQUssR0FBRyxLQUFLO01BQzlCLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVM7TUFDeEIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztFQUNmLElBQUksU0FBUyxHQUFHLFNBQVMsR0FBRyxDQUFDO0lBQzNCLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwQkMsVUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHO01BQ2pCLEdBQUcsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUM7UUFDM0IsT0FBTyxPQUFPLElBQUksQ0FBQ1gsV0FBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztPQUN6RSxHQUFHLEdBQUcsSUFBSSxLQUFLLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sT0FBTyxJQUFJLENBQUNBLFdBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7T0FDekUsR0FBRyxHQUFHLElBQUksS0FBSyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoQyxPQUFPLE9BQU8sSUFBSSxDQUFDQSxXQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO09BQzdFLEdBQUcsR0FBRyxJQUFJLEtBQUssR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUU7VUFDOUUsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUU7S0FDMUUsQ0FBQztHQUNILENBQUM7RUFDRixHQUFHLE9BQU8sQ0FBQyxJQUFJLFVBQVUsSUFBSSxFQUFFLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLENBQUNrRSxPQUFLLENBQUMsVUFBVTtJQUMxRSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0dBQzFCLENBQUMsQ0FBQyxDQUFDOztJQUVGLENBQUMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hEa0UsYUFBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEN2RSxNQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztHQUNsQixNQUFNO0lBQ0wsSUFBSSxRQUFRLGVBQWUsSUFBSSxDQUFDOztRQUU1QixjQUFjLFNBQVMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksUUFBUTs7UUFFeEUsb0JBQW9CLEdBQUdLLE9BQUssQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7O1FBRTVELGdCQUFnQixPQUFPLFdBQVcsQ0FBQyxTQUFTLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQzs7UUFFbEUsVUFBVSxHQUFHLENBQUMsT0FBTyxJQUFJQSxPQUFLLENBQUMsVUFBVTs7UUFFekMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUU7WUFDbkIsS0FBSyxPQUFPLENBQUMsQ0FBQztRQUNsQixNQUFNLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0MsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztPQUMzQixDQUFDLENBQUM7SUFDTCxHQUFHLENBQUMsZ0JBQWdCLENBQUM7TUFDbkIsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLE1BQU0sRUFBRSxRQUFRLENBQUM7UUFDcEMrRCxZQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QixJQUFJLElBQUksR0FBR25CLG1CQUFpQixDQUFDLElBQUksSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsRCxHQUFHLFFBQVEsSUFBSSxTQUFTLENBQUNvQixPQUFLLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEUsT0FBTyxJQUFJLENBQUM7T0FDYixDQUFDLENBQUM7TUFDSCxDQUFDLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztNQUNwQixLQUFLLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztLQUN2QjtJQUNELEdBQUcsb0JBQW9CLElBQUksVUFBVSxDQUFDO01BQ3BDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztNQUNwQixTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7TUFDakIsTUFBTSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM1QjtJQUNELEdBQUcsVUFBVSxJQUFJLGNBQWMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7O0lBRWpELEdBQUcsT0FBTyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDO0dBQzlDOztFQUVEakQsZ0JBQWMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7O0VBRXhCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDWnBFLFVBQU8sQ0FBQ0EsVUFBTyxDQUFDLENBQUMsR0FBR0EsVUFBTyxDQUFDLENBQUMsR0FBR0EsVUFBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0VBRTVELEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztFQUU5QyxPQUFPLENBQUMsQ0FBQztDQUNWOztBQ25GRCxJQUFJLE1BQU0sR0FBR2QsaUJBQStCLENBQUM7OztBQUc3QyxXQUFjLEdBQUdHLFdBQXdCLENBQUMsS0FBSyxFQUFFLFNBQVMsR0FBRyxDQUFDO0VBQzVELE9BQU8sU0FBUyxHQUFHLEVBQUUsRUFBRSxPQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztDQUM3RixFQUFFOztFQUVELEdBQUcsRUFBRSxTQUFTLEdBQUcsQ0FBQyxHQUFHLENBQUM7SUFDcEIsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdkMsT0FBTyxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztHQUN6Qjs7RUFFRCxHQUFHLEVBQUUsU0FBUyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQztJQUMzQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztHQUNyRDtDQUNGLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQzs7QUNmaEIsSUFBSW1JLFFBQU0sR0FBR3RJLGlCQUErQixDQUFDOzs7QUFHN0MsV0FBYyxHQUFHRyxXQUF3QixDQUFDLEtBQUssRUFBRSxTQUFTLEdBQUcsQ0FBQztFQUM1RCxPQUFPLFNBQVMsR0FBRyxFQUFFLEVBQUUsT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUM7Q0FDN0YsRUFBRTs7RUFFRCxHQUFHLEVBQUUsU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDO0lBQ3RCLE9BQU9tSSxRQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0dBQ2pFO0NBQ0YsRUFBRUEsUUFBTSxDQUFDOztBQ1ZWLElBQUlELGFBQVcsU0FBU3JJLFlBQTBCO0lBQzlDLE9BQU8sYUFBYUcsS0FBa0IsQ0FBQyxPQUFPO0lBQzlDRSxXQUFRLFlBQVlELFNBQXVCO0lBQzNDSCxXQUFRLFlBQVlPLFNBQXVCO0lBQzNDMEgsWUFBVSxVQUFVeEgsV0FBeUI7SUFDN0N5SCxPQUFLLGVBQWV2RyxNQUFvQjtJQUN4QyxpQkFBaUIsR0FBR00sYUFBMkI7SUFDL0MsSUFBSSxnQkFBZ0JDLElBQWlCO0lBQ3JDLFNBQVMsV0FBVyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDeEMsY0FBYyxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUN4Q29HLElBQUUsa0JBQWtCLENBQUMsQ0FBQzs7O0FBRzFCLElBQUksbUJBQW1CLEdBQUcsU0FBUyxJQUFJLENBQUM7RUFDdEMsT0FBTyxJQUFJLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxDQUFDO0NBQ3ZELENBQUM7QUFDRixJQUFJLG1CQUFtQixHQUFHLFVBQVU7RUFDbEMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Q0FDYixDQUFDO0FBQ0YsSUFBSSxrQkFBa0IsR0FBRyxTQUFTLEtBQUssRUFBRSxHQUFHLENBQUM7RUFDM0MsT0FBTyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQztJQUNwQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUM7R0FDdEIsQ0FBQyxDQUFDO0NBQ0osQ0FBQztBQUNGLG1CQUFtQixDQUFDLFNBQVMsR0FBRztFQUM5QixHQUFHLEVBQUUsU0FBUyxHQUFHLENBQUM7SUFDaEIsSUFBSSxLQUFLLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQzFCO0VBQ0QsR0FBRyxFQUFFLFNBQVMsR0FBRyxDQUFDO0lBQ2hCLE9BQU8sQ0FBQyxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztHQUN4QztFQUNELEdBQUcsRUFBRSxTQUFTLEdBQUcsRUFBRSxLQUFLLENBQUM7SUFDdkIsSUFBSSxLQUFLLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDckIsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztHQUNoQztFQUNELFFBQVEsRUFBRSxTQUFTLEdBQUcsQ0FBQztJQUNyQixJQUFJLEtBQUssR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQztNQUM3QyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUM7S0FDdEIsQ0FBQyxDQUFDO0lBQ0gsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7R0FDakI7Q0FDRixDQUFDOztBQUVGLG1CQUFjLEdBQUc7RUFDZixjQUFjLEVBQUUsU0FBUyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUM7SUFDcEQsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsSUFBSSxFQUFFLFFBQVEsQ0FBQztNQUN0Q0wsWUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO01BQ2hDLElBQUksQ0FBQyxFQUFFLEdBQUdLLElBQUUsRUFBRSxDQUFDO01BQ2YsSUFBSSxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUM7TUFDcEIsR0FBRyxRQUFRLElBQUksU0FBUyxDQUFDSixPQUFLLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDckUsQ0FBQyxDQUFDO0lBQ0hFLGFBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFOzs7TUFHdkIsUUFBUSxFQUFFLFNBQVMsR0FBRyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQ3BJLFdBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQztRQUMvQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEIsR0FBRyxJQUFJLEtBQUssSUFBSSxDQUFDLE9BQU8sbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakUsT0FBTyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO09BQzVEOzs7TUFHRCxHQUFHLEVBQUUsU0FBUyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLEdBQUcsQ0FBQ0EsV0FBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDO1FBQy9CLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixHQUFHLElBQUksS0FBSyxJQUFJLENBQUMsT0FBTyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0QsT0FBTyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7T0FDcEM7S0FDRixDQUFDLENBQUM7SUFDSCxPQUFPLENBQUMsQ0FBQztHQUNWO0VBQ0QsR0FBRyxFQUFFLFNBQVMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUM7SUFDN0IsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDSSxXQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEMsR0FBRyxJQUFJLEtBQUssSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDM0IsT0FBTyxJQUFJLENBQUM7R0FDYjtFQUNELE9BQU8sRUFBRSxtQkFBbUI7Q0FDN0I7OztBQ2xGRCxZQUFZLENBQUM7QUFDYixJQUFJLElBQUksV0FBV0wsYUFBMkIsQ0FBQyxDQUFDLENBQUM7SUFDN0MsUUFBUSxPQUFPRyxTQUFzQjtJQUNyQyxJQUFJLFdBQVdDLEtBQWtCO0lBQ2pDLE1BQU0sU0FBU0ksYUFBMkI7SUFDMUMsSUFBSSxXQUFXRSxlQUE2QjtJQUM1QyxRQUFRLE9BQU9rQixTQUF1QjtJQUN0QyxPQUFPLFFBQVEsSUFBSSxDQUFDLE9BQU87SUFDM0IsWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFZO0lBQ2xDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxPQUFPO0lBQ2xDLEdBQUcsWUFBWSxFQUFFO0lBQ2pCLFdBQVcsQ0FBQzs7QUFFaEIsSUFBSSxPQUFPLEdBQUcsU0FBUyxHQUFHLENBQUM7RUFDekIsT0FBTyxTQUFTLE9BQU8sRUFBRTtJQUN2QixPQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0dBQ25FLENBQUM7Q0FDSCxDQUFDOztBQUVGLElBQUksT0FBTyxHQUFHOztFQUVaLEdBQUcsRUFBRSxTQUFTLEdBQUcsQ0FBQyxHQUFHLENBQUM7SUFDcEIsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7TUFDZixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7TUFDeEIsR0FBRyxJQUFJLEtBQUssSUFBSSxDQUFDLE9BQU8sbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO01BQzNELE9BQU8sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDO0tBQ3pDO0dBQ0Y7O0VBRUQsR0FBRyxFQUFFLFNBQVMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUM7SUFDM0IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7R0FDbkM7Q0FDRixDQUFDOzs7QUFHRixJQUFJLFFBQVEsR0FBRyxjQUFjLEdBQUdNLFdBQXdCLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzs7O0FBR3hHLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ3JFLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0VBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0VBQ3ZDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0VBQ2pCLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsR0FBRyxDQUFDO0lBQ2pELElBQUksS0FBSyxJQUFJLFFBQVEsQ0FBQyxTQUFTO1FBQzNCLE1BQU0sR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEIsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztNQUVqQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksV0FBVyxDQUFDO1FBQ3RDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sR0FBRyxJQUFJLEtBQUssR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDOztPQUVyQyxDQUFDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ2xDLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQzs7OztBQ3JETCxJQUFJLElBQUksR0FBR2xDLGVBQTZCLENBQUM7OztBQUd6Q0csV0FBd0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxHQUFHLENBQUM7RUFDL0MsT0FBTyxTQUFTLE9BQU8sRUFBRSxFQUFFLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDO0NBQ2pHLEVBQUU7O0VBRUQsR0FBRyxFQUFFLFNBQVMsR0FBRyxDQUFDLEtBQUssQ0FBQztJQUN0QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztHQUNwQztDQUNGLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUM7O0FDWHJCLElBQUlRLFNBQU0sR0FBR1gsT0FBb0I7SUFDN0JvRixNQUFJLEtBQUtqRixLQUFrQjtJQUMzQm1CLEtBQUcsTUFBTWxCLElBQWlCO0lBQzFCLEtBQUssSUFBSWtCLEtBQUcsQ0FBQyxhQUFhLENBQUM7SUFDM0JrSCxNQUFJLEtBQUtsSCxLQUFHLENBQUMsTUFBTSxDQUFDO0lBQ3BCLEdBQUcsTUFBTSxDQUFDLEVBQUVYLFNBQU0sQ0FBQyxXQUFXLElBQUlBLFNBQU0sQ0FBQyxRQUFRLENBQUM7SUFDbEQsTUFBTSxHQUFHLEdBQUc7SUFDWndHLEdBQUMsR0FBRyxDQUFDO0lBQUUsQ0FBQyxHQUFHLENBQUM7SUFBRSxLQUFLLENBQUM7O0FBRXhCLElBQUksc0JBQXNCLEdBQUc7RUFDM0IsZ0hBQWdIO0VBQ2hILEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFYixNQUFNQSxHQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ1YsR0FBRyxLQUFLLEdBQUd4RyxTQUFNLENBQUMsc0JBQXNCLENBQUN3RyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0MvQixNQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkNBLE1BQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFb0QsTUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0dBQ25DLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQztDQUN2Qjs7QUFFRCxVQUFjLEdBQUc7RUFDZixHQUFHLEtBQUssR0FBRztFQUNYLE1BQU0sRUFBRSxNQUFNO0VBQ2QsS0FBSyxHQUFHLEtBQUs7RUFDYixJQUFJLElBQUlBLE1BQUk7Q0FDYjs7O0FDekJELFlBQVksQ0FBQztBQUNiLElBQUksTUFBTSxXQUFXeEksT0FBb0I7SUFDckMsV0FBVyxNQUFNRyxZQUF5QjtJQUMxQyxPQUFPLFVBQVVDLFFBQXFCO0lBQ3RDLE1BQU0sV0FBV0ksTUFBbUI7SUFDcEMsSUFBSSxhQUFhRSxLQUFrQjtJQUNuQyxXQUFXLE1BQU1rQixZQUEwQjtJQUMzQyxLQUFLLFlBQVlNLE1BQW1CO0lBQ3BDLFVBQVUsT0FBT0MsV0FBeUI7SUFDMUMsU0FBUyxRQUFRQyxVQUF3QjtJQUN6QyxRQUFRLFNBQVNDLFNBQXVCO0lBQ3hDLElBQUksYUFBYUMsV0FBeUIsQ0FBQyxDQUFDO0lBQzVDLEVBQUUsZUFBZUMsU0FBdUIsQ0FBQyxDQUFDO0lBQzFDLFNBQVMsUUFBUUMsVUFBd0I7SUFDekMsY0FBYyxHQUFHQyxlQUErQjtJQUNoRCxZQUFZLEtBQUssYUFBYTtJQUM5QixTQUFTLFFBQVEsVUFBVTtJQUMzQixTQUFTLFFBQVEsV0FBVztJQUM1QixZQUFZLEtBQUssZUFBZTtJQUNoQyxXQUFXLE1BQU0sY0FBYztJQUMvQixZQUFZLEtBQUssTUFBTSxDQUFDLFlBQVksQ0FBQztJQUNyQyxTQUFTLFFBQVEsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNsQyxJQUFJLGFBQWEsTUFBTSxDQUFDLElBQUk7SUFDNUIsVUFBVSxPQUFPLE1BQU0sQ0FBQyxVQUFVO0lBQ2xDLFFBQVEsU0FBUyxNQUFNLENBQUMsUUFBUTtJQUNoQyxVQUFVLE9BQU8sWUFBWTtJQUM3QixHQUFHLGNBQWMsSUFBSSxDQUFDLEdBQUc7SUFDekIsR0FBRyxjQUFjLElBQUksQ0FBQyxHQUFHO0lBQ3pCLEtBQUssWUFBWSxJQUFJLENBQUMsS0FBSztJQUMzQixHQUFHLGNBQWMsSUFBSSxDQUFDLEdBQUc7SUFDekIsR0FBRyxjQUFjLElBQUksQ0FBQyxHQUFHO0lBQ3pCLE1BQU0sV0FBVyxRQUFRO0lBQ3pCLFdBQVcsTUFBTSxZQUFZO0lBQzdCLFdBQVcsTUFBTSxZQUFZO0lBQzdCLE9BQU8sVUFBVSxXQUFXLEdBQUcsSUFBSSxHQUFHLE1BQU07SUFDNUMsT0FBTyxVQUFVLFdBQVcsR0FBRyxJQUFJLEdBQUcsV0FBVztJQUNqRCxPQUFPLFVBQVUsV0FBVyxHQUFHLElBQUksR0FBRyxXQUFXLENBQUM7OztBQUd0RCxJQUFJLFdBQVcsR0FBRyxTQUFTLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDO0VBQzdDLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7TUFDdEIsSUFBSSxLQUFLLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUM7TUFDOUIsSUFBSSxLQUFLLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO01BQ3hCLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQztNQUNsQixFQUFFLE9BQU8sSUFBSSxLQUFLLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUM7TUFDcEQsQ0FBQyxRQUFRLENBQUM7TUFDVixDQUFDLFFBQVEsS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO01BQzFELENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ1osS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtFQUNsQixHQUFHLEtBQUssSUFBSSxLQUFLLElBQUksS0FBSyxLQUFLLFFBQVEsQ0FBQztJQUN0QyxDQUFDLEdBQUcsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUMsR0FBRyxJQUFJLENBQUM7R0FDVixNQUFNO0lBQ0wsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDNUIsR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztNQUM5QixDQUFDLEVBQUUsQ0FBQztNQUNKLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDUjtJQUNELEdBQUcsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUM7TUFDaEIsS0FBSyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDakIsTUFBTTtNQUNMLEtBQUssSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7S0FDakM7SUFDRCxHQUFHLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO01BQ2hCLENBQUMsRUFBRSxDQUFDO01BQ0osQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNSO0lBQ0QsR0FBRyxDQUFDLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQztNQUNuQixDQUFDLEdBQUcsQ0FBQyxDQUFDO01BQ04sQ0FBQyxHQUFHLElBQUksQ0FBQztLQUNWLE1BQU0sR0FBRyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQztNQUN2QixDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO01BQ25DLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQ2YsTUFBTTtNQUNMLENBQUMsR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztNQUM3QyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ1A7R0FDRjtFQUNELE1BQU0sSUFBSSxJQUFJLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxHQUFHLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQzdELENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztFQUNsQixJQUFJLElBQUksSUFBSSxDQUFDO0VBQ2IsTUFBTSxJQUFJLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDNUQsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztFQUN2QixPQUFPLE1BQU0sQ0FBQztDQUNmLENBQUM7QUFDRixJQUFJLGFBQWEsR0FBRyxTQUFTLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDO0VBQ2hELElBQUksSUFBSSxJQUFJLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUM7TUFDN0IsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO01BQ3ZCLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQztNQUNqQixLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUM7TUFDaEIsQ0FBQyxPQUFPLE1BQU0sR0FBRyxDQUFDO01BQ2xCLENBQUMsT0FBTyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUM7TUFDbkIsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHO01BQ2YsQ0FBQyxDQUFDO0VBQ04sQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUNSLE1BQU0sS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQzNELENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO0VBQzFCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztFQUNiLEtBQUssSUFBSSxJQUFJLENBQUM7RUFDZCxNQUFNLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztFQUMzRCxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDVCxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztHQUNmLE1BQU0sR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDO0lBQ25CLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0dBQzNDLE1BQU07SUFDTCxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckIsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7R0FDZixDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztDQUM5QyxDQUFDOztBQUVGLElBQUksU0FBUyxHQUFHLFNBQVMsS0FBSyxDQUFDO0VBQzdCLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ25FLENBQUM7QUFDRixJQUFJLE1BQU0sR0FBRyxTQUFTLEVBQUUsQ0FBQztFQUN2QixPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0NBQ3BCLENBQUM7QUFDRixJQUFJLE9BQU8sR0FBRyxTQUFTLEVBQUUsQ0FBQztFQUN4QixPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0NBQ3BDLENBQUM7QUFDRixJQUFJLE9BQU8sR0FBRyxTQUFTLEVBQUUsQ0FBQztFQUN4QixPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0NBQ3RFLENBQUM7QUFDRixJQUFJLE9BQU8sR0FBRyxTQUFTLEVBQUUsQ0FBQztFQUN4QixPQUFPLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQy9CLENBQUM7QUFDRixJQUFJLE9BQU8sR0FBRyxTQUFTLEVBQUUsQ0FBQztFQUN4QixPQUFPLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQy9CLENBQUM7O0FBRUYsSUFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQztFQUN4QyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNwRSxDQUFDOztBQUVGLElBQUksR0FBRyxHQUFHLFNBQVMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsY0FBYyxDQUFDO0VBQ3BELElBQUksUUFBUSxHQUFHLENBQUMsS0FBSztNQUNqQixRQUFRLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0VBQ25DLEdBQUcsUUFBUSxJQUFJLFFBQVEsSUFBSSxRQUFRLEdBQUcsQ0FBQyxJQUFJLFFBQVEsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0VBQzFHLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFO01BQ3hCLEtBQUssR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztNQUNoQyxJQUFJLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDO0VBQzlDLE9BQU8sY0FBYyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Q0FDL0MsQ0FBQztBQUNGLElBQUksR0FBRyxHQUFHLFNBQVMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxjQUFjLENBQUM7RUFDdkUsSUFBSSxRQUFRLEdBQUcsQ0FBQyxLQUFLO01BQ2pCLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7RUFDbkMsR0FBRyxRQUFRLElBQUksUUFBUSxJQUFJLFFBQVEsR0FBRyxDQUFDLElBQUksUUFBUSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7RUFDMUcsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUU7TUFDeEIsS0FBSyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO01BQ2hDLElBQUksSUFBSSxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUMvQixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztDQUMzRixDQUFDOztBQUVGLElBQUksNEJBQTRCLEdBQUcsU0FBUyxJQUFJLEVBQUUsTUFBTSxDQUFDO0VBQ3ZELFVBQVUsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0VBQzdDLElBQUksWUFBWSxHQUFHLENBQUMsTUFBTTtNQUN0QixVQUFVLEtBQUssUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO0VBQzFDLEdBQUcsWUFBWSxJQUFJLFVBQVUsQ0FBQyxNQUFNLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztFQUM3RCxPQUFPLFVBQVUsQ0FBQztDQUNuQixDQUFDOztBQUVGLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO0VBQ2IsWUFBWSxHQUFHLFNBQVMsV0FBVyxDQUFDLE1BQU0sQ0FBQztJQUN6QyxJQUFJLFVBQVUsR0FBRyw0QkFBNEIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDNUQsSUFBSSxDQUFDLEVBQUUsU0FBUyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNyRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsVUFBVSxDQUFDO0dBQzVCLENBQUM7O0VBRUYsU0FBUyxHQUFHLFNBQVMsUUFBUSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDO0lBQzNELFVBQVUsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzVDLElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDOUIsTUFBTSxTQUFTLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6QyxHQUFHLE1BQU0sR0FBRyxDQUFDLElBQUksTUFBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN6RSxVQUFVLEdBQUcsVUFBVSxLQUFLLFNBQVMsR0FBRyxZQUFZLEdBQUcsTUFBTSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNyRixHQUFHLE1BQU0sR0FBRyxVQUFVLEdBQUcsWUFBWSxDQUFDLE1BQU0sVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3JFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUM7SUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsVUFBVSxDQUFDO0dBQzVCLENBQUM7O0VBRUYsR0FBRyxXQUFXLENBQUM7SUFDYixTQUFTLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzQyxTQUFTLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuQyxTQUFTLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4QyxTQUFTLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztHQUN6Qzs7RUFFRCxXQUFXLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFO0lBQ2hDLE9BQU8sRUFBRSxTQUFTLE9BQU8sQ0FBQyxVQUFVLENBQUM7TUFDbkMsT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO0tBQ2hEO0lBQ0QsUUFBUSxFQUFFLFNBQVMsUUFBUSxDQUFDLFVBQVUsQ0FBQztNQUNyQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3BDO0lBQ0QsUUFBUSxFQUFFLFNBQVMsUUFBUSxDQUFDLFVBQVUscUJBQXFCO01BQ3pELElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUNuRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUMvQztJQUNELFNBQVMsRUFBRSxTQUFTLFNBQVMsQ0FBQyxVQUFVLHFCQUFxQjtNQUMzRCxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDbkQsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQztJQUNELFFBQVEsRUFBRSxTQUFTLFFBQVEsQ0FBQyxVQUFVLHFCQUFxQjtNQUN6RCxPQUFPLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMxRDtJQUNELFNBQVMsRUFBRSxTQUFTLFNBQVMsQ0FBQyxVQUFVLHFCQUFxQjtNQUMzRCxPQUFPLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDaEU7SUFDRCxVQUFVLEVBQUUsU0FBUyxVQUFVLENBQUMsVUFBVSxxQkFBcUI7TUFDN0QsT0FBTyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUNyRTtJQUNELFVBQVUsRUFBRSxTQUFTLFVBQVUsQ0FBQyxVQUFVLHFCQUFxQjtNQUM3RCxPQUFPLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ3JFO0lBQ0QsT0FBTyxFQUFFLFNBQVMsT0FBTyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUM7TUFDMUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztLQUN6QztJQUNELFFBQVEsRUFBRSxTQUFTLFFBQVEsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDO01BQzVDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDekM7SUFDRCxRQUFRLEVBQUUsU0FBUyxRQUFRLENBQUMsVUFBVSxFQUFFLEtBQUsscUJBQXFCO01BQ2hFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3hEO0lBQ0QsU0FBUyxFQUFFLFNBQVMsU0FBUyxDQUFDLFVBQVUsRUFBRSxLQUFLLHFCQUFxQjtNQUNsRSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN4RDtJQUNELFFBQVEsRUFBRSxTQUFTLFFBQVEsQ0FBQyxVQUFVLEVBQUUsS0FBSyxxQkFBcUI7TUFDaEUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDeEQ7SUFDRCxTQUFTLEVBQUUsU0FBUyxTQUFTLENBQUMsVUFBVSxFQUFFLEtBQUsscUJBQXFCO01BQ2xFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3hEO0lBQ0QsVUFBVSxFQUFFLFNBQVMsVUFBVSxDQUFDLFVBQVUsRUFBRSxLQUFLLHFCQUFxQjtNQUNwRSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN4RDtJQUNELFVBQVUsRUFBRSxTQUFTLFVBQVUsQ0FBQyxVQUFVLEVBQUUsS0FBSyxxQkFBcUI7TUFDcEUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDeEQ7R0FDRixDQUFDLENBQUM7Q0FDSixNQUFNO0VBQ0wsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVO0lBQ2xCLElBQUksWUFBWSxDQUFDO0dBQ2xCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO0lBQ3JCLElBQUksWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0dBQ3RCLENBQUMsQ0FBQztJQUNELFlBQVksR0FBRyxTQUFTLFdBQVcsQ0FBQyxNQUFNLENBQUM7TUFDekMsT0FBTyxJQUFJLFVBQVUsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUNuRSxDQUFDO0lBQ0YsSUFBSSxnQkFBZ0IsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZFLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHO01BQzdELEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNsRixBQUFDO0lBQ0YsR0FBRyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDO0dBQ3pEOztFQUVELElBQUksSUFBSSxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQ3pDLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDO0VBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0VBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0VBQzVCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRTtJQUN2RSxPQUFPLEVBQUUsU0FBUyxPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztNQUMxQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUNwRDtJQUNELFFBQVEsRUFBRSxTQUFTLFFBQVEsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDO01BQzVDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ3BEO0dBQ0YsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUNWO0FBQ0QsY0FBYyxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztBQUMzQyxjQUFjLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM5QyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsWUFBWSxDQUFDO0FBQ3JDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxTQUFTOzs7QUMvUTlCLElBQUkzQixVQUFPLFFBQVFkLE9BQW9CO0lBQ25DLE1BQU0sU0FBU0csTUFBbUI7SUFDbEMsTUFBTSxTQUFTQyxZQUEwQjtJQUN6Q0MsV0FBUSxPQUFPRyxTQUF1QjtJQUN0Q3dFLFNBQU8sUUFBUXRFLFFBQXNCO0lBQ3JDdUUsV0FBUSxPQUFPckQsU0FBdUI7SUFDdEMzQixXQUFRLE9BQU9pQyxTQUF1QjtJQUN0QyxXQUFXLElBQUlDLE9BQW9CLENBQUMsV0FBVztJQUMvQzJGLG9CQUFrQixHQUFHMUYsbUJBQWlDO0lBQ3RELFlBQVksR0FBRyxNQUFNLENBQUMsV0FBVztJQUNqQyxTQUFTLE1BQU0sTUFBTSxDQUFDLFFBQVE7SUFDOUIsT0FBTyxRQUFRLE1BQU0sQ0FBQyxHQUFHLElBQUksV0FBVyxDQUFDLE1BQU07SUFDL0MsTUFBTSxTQUFTLFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSztJQUMzQyxJQUFJLFdBQVcsTUFBTSxDQUFDLElBQUk7SUFDMUIsWUFBWSxHQUFHLGFBQWEsQ0FBQzs7QUFFakN0QixVQUFPLENBQUNBLFVBQU8sQ0FBQyxDQUFDLEdBQUdBLFVBQU8sQ0FBQyxDQUFDLEdBQUdBLFVBQU8sQ0FBQyxDQUFDLElBQUksV0FBVyxLQUFLLFlBQVksQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7O0FBRXpHQSxVQUFPLENBQUNBLFVBQU8sQ0FBQyxDQUFDLEdBQUdBLFVBQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRTs7RUFFNUQsTUFBTSxFQUFFLFNBQVMsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUN6QixPQUFPLE9BQU8sSUFBSSxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUliLFdBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO0dBQzdEO0NBQ0YsQ0FBQyxDQUFDOztBQUVIYSxVQUFPLENBQUNBLFVBQU8sQ0FBQyxDQUFDLEdBQUdBLFVBQU8sQ0FBQyxDQUFDLEdBQUdBLFVBQU8sQ0FBQyxDQUFDLEdBQUd1QixNQUFtQixDQUFDLFVBQVU7RUFDeEUsT0FBTyxDQUFDLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsVUFBVSxDQUFDO0NBQzVELENBQUMsRUFBRSxZQUFZLEVBQUU7O0VBRWhCLEtBQUssRUFBRSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO0lBQy9CLEdBQUcsTUFBTSxLQUFLLFNBQVMsSUFBSSxHQUFHLEtBQUssU0FBUyxDQUFDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQ2hDLFdBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2RixJQUFJLEdBQUcsTUFBTUEsV0FBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVU7UUFDbEMsS0FBSyxJQUFJMkUsU0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7UUFDNUIsS0FBSyxJQUFJQSxTQUFPLENBQUMsR0FBRyxLQUFLLFNBQVMsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUNwRCxNQUFNLEdBQUcsS0FBSzhDLG9CQUFrQixDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsRUFBRTdDLFdBQVEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDOUUsS0FBSyxJQUFJLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQztRQUM1QixLQUFLLElBQUksSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQzlCLEtBQUssSUFBSSxDQUFDLENBQUM7SUFDZixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUM7TUFDbEIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztLQUNsRCxDQUFDLE9BQU8sTUFBTSxDQUFDO0dBQ2pCO0NBQ0YsQ0FBQyxDQUFDOztBQUVIM0MsV0FBeUIsQ0FBQyxZQUFZLENBQUM7O0FDN0N2QyxJQUFJeEIsVUFBTyxHQUFHZCxPQUFvQixDQUFDO0FBQ25DYyxVQUFPLENBQUNBLFVBQU8sQ0FBQyxDQUFDLEdBQUdBLFVBQU8sQ0FBQyxDQUFDLEdBQUdBLFVBQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQ1gsTUFBbUIsQ0FBQyxHQUFHLEVBQUU7RUFDcEUsUUFBUSxFQUFFQyxZQUEwQixDQUFDLFFBQVE7Q0FDOUMsQ0FBQzs7O0FDSEYsWUFBWSxDQUFDO0FBQ2IsR0FBR0osWUFBeUIsQ0FBQztFQUMzQixJQUFJLE9BQU8sZUFBZUcsUUFBcUI7TUFDM0MsTUFBTSxnQkFBZ0JDLE9BQW9CO01BQzFDLEtBQUssaUJBQWlCSSxNQUFtQjtNQUN6QyxPQUFPLGVBQWVFLE9BQW9CO01BQzFDLE1BQU0sZ0JBQWdCa0IsTUFBbUI7TUFDekMsT0FBTyxlQUFlTSxZQUEwQjtNQUNoRCxHQUFHLG1CQUFtQkMsSUFBaUI7TUFDdkMsVUFBVSxZQUFZQyxXQUF5QjtNQUMvQyxZQUFZLFVBQVVDLGFBQTJCO01BQ2pELElBQUksa0JBQWtCQyxLQUFrQjtNQUN4QyxXQUFXLFdBQVdDLFlBQTBCO01BQ2hELFNBQVMsYUFBYUMsVUFBd0I7TUFDOUMsUUFBUSxjQUFjQyxTQUF1QjtNQUM3QyxPQUFPLGVBQWVDLFFBQXNCO01BQzVDLFdBQVcsV0FBV0MsWUFBMEI7TUFDaEQsR0FBRyxtQkFBbUJDLElBQWlCO01BQ3ZDLElBQUksa0JBQWtCQyxVQUF3QjtNQUM5QyxPQUFPLGVBQWVDLFFBQXFCO01BQzNDLFFBQVEsY0FBY0MsU0FBdUI7TUFDN0MsUUFBUSxjQUFjQyxTQUF1QjtNQUM3QyxXQUFXLFdBQVdDLFlBQTJCO01BQ2pELE1BQU0sZ0JBQWdCQyxhQUEyQjtNQUNqRCxjQUFjLFFBQVFDLFVBQXdCO01BQzlDLElBQUksa0JBQWtCQyxXQUF5QixDQUFDLENBQUM7TUFDakQsU0FBUyxhQUFhQyxzQkFBcUM7TUFDM0QsR0FBRyxtQkFBbUJDLElBQWlCO01BQ3ZDLEdBQUcsbUJBQW1CQyxJQUFpQjtNQUN2QyxpQkFBaUIsS0FBS0MsYUFBMkI7TUFDakQsbUJBQW1CLEdBQUdDLGNBQTRCO01BQ2xELGtCQUFrQixJQUFJZ0YsbUJBQWlDO01BQ3ZELGNBQWMsUUFBUUMsa0JBQStCO01BQ3JELFNBQVMsYUFBYUMsVUFBdUI7TUFDN0MsV0FBVyxXQUFXQyxXQUF5QjtNQUMvQyxVQUFVLFlBQVlDLFdBQXlCO01BQy9DLFNBQVMsYUFBYUMsVUFBd0I7TUFDOUMsZUFBZSxPQUFPQyxnQkFBK0I7TUFDckQsR0FBRyxtQkFBbUJDLFNBQXVCO01BQzdDLEtBQUssaUJBQWlCQyxXQUF5QjtNQUMvQyxFQUFFLG9CQUFvQixHQUFHLENBQUMsQ0FBQztNQUMzQixJQUFJLGtCQUFrQixLQUFLLENBQUMsQ0FBQztNQUM3QixVQUFVLFlBQVksTUFBTSxDQUFDLFVBQVU7TUFDdkMsU0FBUyxhQUFhLE1BQU0sQ0FBQyxTQUFTO01BQ3RDLFVBQVUsWUFBWSxNQUFNLENBQUMsVUFBVTtNQUN2QyxZQUFZLFVBQVUsYUFBYTtNQUNuQyxhQUFhLFNBQVMsUUFBUSxHQUFHLFlBQVk7TUFDN0MsaUJBQWlCLEtBQUssbUJBQW1CO01BQ3pDLFNBQVMsYUFBYSxXQUFXO01BQ2pDLFVBQVUsWUFBWSxLQUFLLENBQUMsU0FBUyxDQUFDO01BQ3RDLFlBQVksVUFBVSxPQUFPLENBQUMsV0FBVztNQUN6QyxTQUFTLGFBQWEsT0FBTyxDQUFDLFFBQVE7TUFDdEMsWUFBWSxVQUFVLGlCQUFpQixDQUFDLENBQUMsQ0FBQztNQUMxQyxXQUFXLFdBQVcsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO01BQzFDLFNBQVMsYUFBYSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7TUFDMUMsVUFBVSxZQUFZLGlCQUFpQixDQUFDLENBQUMsQ0FBQztNQUMxQyxTQUFTLGFBQWEsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO01BQzFDLGNBQWMsUUFBUSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7TUFDMUMsYUFBYSxTQUFTLG1CQUFtQixDQUFDLElBQUksQ0FBQztNQUMvQyxZQUFZLFVBQVUsbUJBQW1CLENBQUMsS0FBSyxDQUFDO01BQ2hELFdBQVcsV0FBVyxjQUFjLENBQUMsTUFBTTtNQUMzQyxTQUFTLGFBQWEsY0FBYyxDQUFDLElBQUk7TUFDekMsWUFBWSxVQUFVLGNBQWMsQ0FBQyxPQUFPO01BQzVDLGdCQUFnQixNQUFNLFVBQVUsQ0FBQyxXQUFXO01BQzVDLFdBQVcsV0FBVyxVQUFVLENBQUMsTUFBTTtNQUN2QyxnQkFBZ0IsTUFBTSxVQUFVLENBQUMsV0FBVztNQUM1QyxTQUFTLGFBQWEsVUFBVSxDQUFDLElBQUk7TUFDckMsU0FBUyxhQUFhLFVBQVUsQ0FBQyxJQUFJO01BQ3JDLFVBQVUsWUFBWSxVQUFVLENBQUMsS0FBSztNQUN0QyxhQUFhLFNBQVMsVUFBVSxDQUFDLFFBQVE7TUFDekMsbUJBQW1CLEdBQUcsVUFBVSxDQUFDLGNBQWM7TUFDL0MsUUFBUSxjQUFjLEdBQUcsQ0FBQyxVQUFVLENBQUM7TUFDckMsR0FBRyxtQkFBbUIsR0FBRyxDQUFDLGFBQWEsQ0FBQztNQUN4QyxpQkFBaUIsS0FBSyxHQUFHLENBQUMsbUJBQW1CLENBQUM7TUFDOUMsZUFBZSxPQUFPLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztNQUM1QyxnQkFBZ0IsTUFBTSxNQUFNLENBQUMsTUFBTTtNQUNuQyxXQUFXLFdBQVcsTUFBTSxDQUFDLEtBQUs7TUFDbEMsSUFBSSxrQkFBa0IsTUFBTSxDQUFDLElBQUk7TUFDakMsWUFBWSxVQUFVLGVBQWUsQ0FBQzs7RUFFMUMsSUFBSSxJQUFJLEdBQUcsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxFQUFFLE1BQU0sQ0FBQztJQUNqRCxPQUFPLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7R0FDcEUsQ0FBQyxDQUFDOztFQUVILElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxVQUFVO0lBQ2xDLE9BQU8sSUFBSSxVQUFVLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUM3RCxDQUFDLENBQUM7O0VBRUgsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsVUFBVTtJQUM5RSxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7R0FDM0IsQ0FBQyxDQUFDOztFQUVILElBQUksY0FBYyxHQUFHLFNBQVMsRUFBRSxFQUFFLElBQUksQ0FBQztJQUNyQyxHQUFHLEVBQUUsS0FBSyxTQUFTLENBQUMsTUFBTSxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbEQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ1osTUFBTSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxQixHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsTUFBTSxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDaEUsT0FBTyxNQUFNLENBQUM7R0FDZixDQUFDOztFQUVGLElBQUksUUFBUSxHQUFHLFNBQVMsRUFBRSxFQUFFLEtBQUssQ0FBQztJQUNoQyxJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0IsR0FBRyxNQUFNLEdBQUcsQ0FBQyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDbEUsT0FBTyxNQUFNLENBQUM7R0FDZixDQUFDOztFQUVGLElBQUksUUFBUSxHQUFHLFNBQVMsRUFBRSxDQUFDO0lBQ3pCLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLFdBQVcsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDL0MsTUFBTSxTQUFTLENBQUMsRUFBRSxHQUFHLHdCQUF3QixDQUFDLENBQUM7R0FDaEQsQ0FBQzs7RUFFRixJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsRUFBRSxNQUFNLENBQUM7SUFDaEMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxpQkFBaUIsSUFBSSxDQUFDLENBQUMsQ0FBQztNQUMxQyxNQUFNLFNBQVMsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO0tBQ3pELENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztHQUN4QixDQUFDOztFQUVGLElBQUksZUFBZSxHQUFHLFNBQVMsQ0FBQyxFQUFFLElBQUksQ0FBQztJQUNyQyxPQUFPLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7R0FDbEUsQ0FBQzs7RUFFRixJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsRUFBRSxJQUFJLENBQUM7SUFDOUIsSUFBSSxLQUFLLElBQUksQ0FBQztRQUNWLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTTtRQUNwQixNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNqQyxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELE9BQU8sTUFBTSxDQUFDO0dBQ2YsQ0FBQzs7RUFFRixJQUFJLFNBQVMsR0FBRyxTQUFTLEVBQUUsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDO0lBQ3pDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztHQUM3RCxDQUFDOztFQUVGLElBQUksS0FBSyxHQUFHLFNBQVMsSUFBSSxDQUFDLE1BQU0sdUJBQXVCO0lBQ3JELElBQUksQ0FBQyxTQUFTLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDMUIsSUFBSSxNQUFNLFNBQVMsQ0FBQyxNQUFNO1FBQzFCLEtBQUssS0FBSyxJQUFJLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTO1FBQzdDLE9BQU8sR0FBRyxLQUFLLEtBQUssU0FBUztRQUM3QixNQUFNLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN0QixDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQztJQUM5QyxHQUFHLE1BQU0sSUFBSSxTQUFTLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7TUFDN0MsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ3JGLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQ3pCLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztLQUNkO0lBQ0QsR0FBRyxPQUFPLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7TUFDdkYsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM3QztJQUNELE9BQU8sTUFBTSxDQUFDO0dBQ2YsQ0FBQzs7RUFFRixJQUFJLEdBQUcsR0FBRyxTQUFTLEVBQUUsY0FBYztJQUNqQyxJQUFJLEtBQUssSUFBSSxDQUFDO1FBQ1YsTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNO1FBQ3pCLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7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
