/*!
 * jQuery JavaScript Library v1.11.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-17T15:27Z
 */

(function( global, factory ) {

    if ( typeof module === "object" && typeof module.exports === "object" ) {
        // For CommonJS and CommonJS-like environments where a proper window is present,
        // execute the factory and get jQuery
        // For environments that do not inherently posses a window with a document
        // (such as Node.js), expose a jQuery-making factory as module.exports
        // This accentuates the need for the creation of a real window
        // e.g. var jQuery = require("jquery")(window);
        // See ticket #14549 for more info
        module.exports = global.document ?
            factory( global, true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( "jQuery requires a window with a document" );
                }
                return factory( w );
            };
    } else {
        factory( global );
    }

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

    var deletedIds = [];

    var slice = deletedIds.slice;

    var concat = deletedIds.concat;

    var push = deletedIds.push;

    var indexOf = deletedIds.indexOf;

    var class2type = {};

    var toString = class2type.toString;

    var hasOwn = class2type.hasOwnProperty;

    var support = {};



    var
        version = "1.11.2",

    // Define a local copy of jQuery
        jQuery = function( selector, context ) {
            // The jQuery object is actually just the init constructor 'enhanced'
            // Need init if jQuery is called (just allow error to be thrown if not included)
            return new jQuery.fn.init( selector, context );
        },

    // Support: Android<4.1, IE<9
    // Make sure we trim BOM and NBSP
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

    // Matches dashed string for camelizing
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,

    // Used by jQuery.camelCase as callback to replace()
        fcamelCase = function( all, letter ) {
            return letter.toUpperCase();
        };

    jQuery.fn = jQuery.prototype = {
        // The current version of jQuery being used
        jquery: version,

        constructor: jQuery,

        // Start with an empty selector
        selector: "",

        // The default length of a jQuery object is 0
        length: 0,

        toArray: function() {
            return slice.call( this );
        },

        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function( num ) {
            return num != null ?

                // Return just the one element from the set
                ( num < 0 ? this[ num + this.length ] : this[ num ] ) :

                // Return all the elements in a clean array
                slice.call( this );
        },

        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function( elems ) {

            // Build a new jQuery matched element set
            var ret = jQuery.merge( this.constructor(), elems );

            // Add the old object onto the stack (as a reference)
            ret.prevObject = this;
            ret.context = this.context;

            // Return the newly-formed element set
            return ret;
        },

        // Execute a callback for every element in the matched set.
        // (You can seed the arguments with an array of args, but this is
        // only used internally.)
        each: function( callback, args ) {
            return jQuery.each( this, callback, args );
        },

        map: function( callback ) {
            return this.pushStack( jQuery.map(this, function( elem, i ) {
                return callback.call( elem, i, elem );
            }));
        },

        slice: function() {
            return this.pushStack( slice.apply( this, arguments ) );
        },

        first: function() {
            return this.eq( 0 );
        },

        last: function() {
            return this.eq( -1 );
        },

        eq: function( i ) {
            var len = this.length,
                j = +i + ( i < 0 ? len : 0 );
            return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
        },

        end: function() {
            return this.prevObject || this.constructor(null);
        },

        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push: push,
        sort: deletedIds.sort,
        splice: deletedIds.splice
    };

    jQuery.extend = jQuery.fn.extend = function() {
        var src, copyIsArray, copy, name, options, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
            deep = target;

            // skip the boolean and the target
            target = arguments[ i ] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if ( i === length ) {
            target = this;
            i--;
        }

        for ( ; i < length; i++ ) {
            // Only deal with non-null/undefined values
            if ( (options = arguments[ i ]) != null ) {
                // Extend the base object
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];

                    // Prevent never-ending loop
                    if ( target === copy ) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];

                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[ name ] = jQuery.extend( deep, clone, copy );

                        // Don't bring in undefined values
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    jQuery.extend({
        // Unique for each copy of jQuery on the page
        expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

        // Assume jQuery is ready without the ready module
        isReady: true,

        error: function( msg ) {
            throw new Error( msg );
        },

        noop: function() {},

        // See test/unit/core.js for details concerning isFunction.
        // Since version 1.3, DOM methods and functions like alert
        // aren't supported. They return false on IE (#2968).
        isFunction: function( obj ) {
            return jQuery.type(obj) === "function";
        },

        isArray: Array.isArray || function( obj ) {
            return jQuery.type(obj) === "array";
        },

        isWindow: function( obj ) {
            /* jshint eqeqeq: false */
            return obj != null && obj == obj.window;
        },

        isNumeric: function( obj ) {
            // parseFloat NaNs numeric-cast false positives (null|true|false|"")
            // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
            // subtraction forces infinities to NaN
            // adding 1 corrects loss of precision from parseFloat (#15100)
            return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
        },

        isEmptyObject: function( obj ) {
            var name;
            for ( name in obj ) {
                return false;
            }
            return true;
        },

        isPlainObject: function( obj ) {
            var key;

            // Must be an Object.
            // Because of IE, we also have to check the presence of the constructor property.
            // Make sure that DOM nodes and window objects don't pass through, as well
            if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
                return false;
            }

            try {
                // Not own constructor property must be Object
                if ( obj.constructor &&
                    !hasOwn.call(obj, "constructor") &&
                    !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
                    return false;
                }
            } catch ( e ) {
                // IE8,9 Will throw exceptions on certain host objects #9897
                return false;
            }

            // Support: IE<9
            // Handle iteration over inherited properties before own properties.
            if ( support.ownLast ) {
                for ( key in obj ) {
                    return hasOwn.call( obj, key );
                }
            }

            // Own properties are enumerated firstly, so to speed up,
            // if last one is own, then all properties are own.
            for ( key in obj ) {}

            return key === undefined || hasOwn.call( obj, key );
        },

        type: function( obj ) {
            if ( obj == null ) {
                return obj + "";
            }
            return typeof obj === "object" || typeof obj === "function" ?
            class2type[ toString.call(obj) ] || "object" :
                typeof obj;
        },

        // Evaluates a script in a global context
        // Workarounds based on findings by Jim Driscoll
        // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
        globalEval: function( data ) {
            if ( data && jQuery.trim( data ) ) {
                // We use execScript on Internet Explorer
                // We use an anonymous function so that context is window
                // rather than jQuery in Firefox
                ( window.execScript || function( data ) {
                    window[ "eval" ].call( window, data );
                } )( data );
            }
        },

        // Convert dashed to camelCase; used by the css and data modules
        // Microsoft forgot to hump their vendor prefix (#9572)
        camelCase: function( string ) {
            return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
        },

        nodeName: function( elem, name ) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },

        // args is for internal usage only
        each: function( obj, callback, args ) {
            var value,
                i = 0,
                length = obj.length,
                isArray = isArraylike( obj );

            if ( args ) {
                if ( isArray ) {
                    for ( ; i < length; i++ ) {
                        value = callback.apply( obj[ i ], args );

                        if ( value === false ) {
                            break;
                        }
                    }
                } else {
                    for ( i in obj ) {
                        value = callback.apply( obj[ i ], args );

                        if ( value === false ) {
                            break;
                        }
                    }
                }

                // A special, fast, case for the most common use of each
            } else {
                if ( isArray ) {
                    for ( ; i < length; i++ ) {
                        value = callback.call( obj[ i ], i, obj[ i ] );

                        if ( value === false ) {
                            break;
                        }
                    }
                } else {
                    for ( i in obj ) {
                        value = callback.call( obj[ i ], i, obj[ i ] );

                        if ( value === false ) {
                            break;
                        }
                    }
                }
            }

            return obj;
        },

        // Support: Android<4.1, IE<9
        trim: function( text ) {
            return text == null ?
                "" :
                ( text + "" ).replace( rtrim, "" );
        },

        // results is for internal usage only
        makeArray: function( arr, results ) {
            var ret = results || [];

            if ( arr != null ) {
                if ( isArraylike( Object(arr) ) ) {
                    jQuery.merge( ret,
                        typeof arr === "string" ?
                            [ arr ] : arr
                    );
                } else {
                    push.call( ret, arr );
                }
            }

            return ret;
        },

        inArray: function( elem, arr, i ) {
            var len;

            if ( arr ) {
                if ( indexOf ) {
                    return indexOf.call( arr, elem, i );
                }

                len = arr.length;
                i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

                for ( ; i < len; i++ ) {
                    // Skip accessing in sparse arrays
                    if ( i in arr && arr[ i ] === elem ) {
                        return i;
                    }
                }
            }

            return -1;
        },

        merge: function( first, second ) {
            var len = +second.length,
                j = 0,
                i = first.length;

            while ( j < len ) {
                first[ i++ ] = second[ j++ ];
            }

            // Support: IE<9
            // Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
            if ( len !== len ) {
                while ( second[j] !== undefined ) {
                    first[ i++ ] = second[ j++ ];
                }
            }

            first.length = i;

            return first;
        },

        grep: function( elems, callback, invert ) {
            var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;

            // Go through the array, only saving the items
            // that pass the validator function
            for ( ; i < length; i++ ) {
                callbackInverse = !callback( elems[ i ], i );
                if ( callbackInverse !== callbackExpect ) {
                    matches.push( elems[ i ] );
                }
            }

            return matches;
        },

        // arg is for internal usage only
        map: function( elems, callback, arg ) {
            var value,
                i = 0,
                length = elems.length,
                isArray = isArraylike( elems ),
                ret = [];

            // Go through the array, translating each of the items to their new values
            if ( isArray ) {
                for ( ; i < length; i++ ) {
                    value = callback( elems[ i ], i, arg );

                    if ( value != null ) {
                        ret.push( value );
                    }
                }

                // Go through every key on the object,
            } else {
                for ( i in elems ) {
                    value = callback( elems[ i ], i, arg );

                    if ( value != null ) {
                        ret.push( value );
                    }
                }
            }

            // Flatten any nested arrays
            return concat.apply( [], ret );
        },

        // A global GUID counter for objects
        guid: 1,

        // Bind a function to a context, optionally partially applying any
        // arguments.
        proxy: function( fn, context ) {
            var args, proxy, tmp;

            if ( typeof context === "string" ) {
                tmp = fn[ context ];
                context = fn;
                fn = tmp;
            }

            // Quick check to determine if target is callable, in the spec
            // this throws a TypeError, but we will just return undefined.
            if ( !jQuery.isFunction( fn ) ) {
                return undefined;
            }

            // Simulated bind
            args = slice.call( arguments, 2 );
            proxy = function() {
                return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
            };

            // Set the guid of unique handler to the same of original handler, so it can be removed
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;

            return proxy;
        },

        now: function() {
            return +( new Date() );
        },

        // jQuery.support is not used in Core but other projects attach their
        // properties to it so it needs to exist.
        support: support
    });

// Populate the class2type map
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
    });

    function isArraylike( obj ) {
        var length = obj.length,
            type = jQuery.type( obj );

        if ( type === "function" || jQuery.isWindow( obj ) ) {
            return false;
        }

        if ( obj.nodeType === 1 && length ) {
            return true;
        }

        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && ( length - 1 ) in obj;
    }
    var Sizzle =
        /*!
         * Sizzle CSS Selector Engine v2.2.0-pre
         * http://sizzlejs.com/
         *
         * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
         * Released under the MIT license
         * http://jquery.org/license
         *
         * Date: 2014-12-16
         */
        (function( window ) {

            var i,
                support,
                Expr,
                getText,
                isXML,
                tokenize,
                compile,
                select,
                outermostContext,
                sortInput,
                hasDuplicate,

            // Local document vars
                setDocument,
                document,
                docElem,
                documentIsHTML,
                rbuggyQSA,
                rbuggyMatches,
                matches,
                contains,

            // Instance-specific data
                expando = "sizzle" + 1 * new Date(),
                preferredDoc = window.document,
                dirruns = 0,
                done = 0,
                classCache = createCache(),
                tokenCache = createCache(),
                compilerCache = createCache(),
                sortOrder = function( a, b ) {
                    if ( a === b ) {
                        hasDuplicate = true;
                    }
                    return 0;
                },

            // General-purpose constants
                MAX_NEGATIVE = 1 << 31,

            // Instance methods
                hasOwn = ({}).hasOwnProperty,
                arr = [],
                pop = arr.pop,
                push_native = arr.push,
                push = arr.push,
                slice = arr.slice,
            // Use a stripped-down indexOf as it's faster than native
            // http://jsperf.com/thor-indexof-vs-for/5
                indexOf = function( list, elem ) {
                    var i = 0,
                        len = list.length;
                    for ( ; i < len; i++ ) {
                        if ( list[i] === elem ) {
                            return i;
                        }
                    }
                    return -1;
                },

                booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

            // Regular expressions

            // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
                whitespace = "[\\x20\\t\\r\\n\\f]",
            // http://www.w3.org/TR/css3-syntax/#characters
                characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

            // Loosely modeled on CSS identifier characters
            // An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
            // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
                identifier = characterEncoding.replace( "w", "w#" ),

            // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
                attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
                        // Operator (capture 2)
                    "*([*^$|!~]?=)" + whitespace +
                        // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
                    "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
                    "*\\]",

                pseudos = ":(" + characterEncoding + ")(?:\\((" +
                        // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
                        // 1. quoted (capture 3; capture 4 or capture 5)
                    "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
                        // 2. simple (capture 6)
                    "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
                        // 3. anything else (capture 2)
                    ".*" +
                    ")\\)|)",

            // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
                rwhitespace = new RegExp( whitespace + "+", "g" ),
                rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

                rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
                rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

                rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

                rpseudo = new RegExp( pseudos ),
                ridentifier = new RegExp( "^" + identifier + "$" ),

                matchExpr = {
                    "ID": new RegExp( "^#(" + characterEncoding + ")" ),
                    "CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
                    "TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
                    "ATTR": new RegExp( "^" + attributes ),
                    "PSEUDO": new RegExp( "^" + pseudos ),
                    "CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
                    "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                    "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
                    "bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
                    // For use in libraries implementing .is()
                    // We use this for POS matching in `select`
                    "needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                    whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
                },

                rinputs = /^(?:input|select|textarea|button)$/i,
                rheader = /^h\d$/i,

                rnative = /^[^{]+\{\s*\[native \w/,

            // Easily-parseable/retrievable ID or TAG or CLASS selectors
                rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

                rsibling = /[+~]/,
                rescape = /'|\\/g,

            // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
                runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
                funescape = function( _, escaped, escapedWhitespace ) {
                    var high = "0x" + escaped - 0x10000;
                    // NaN means non-codepoint
                    // Support: Firefox<24
                    // Workaround erroneous numeric interpretation of +"0x"
                    return high !== high || escapedWhitespace ?
                        escaped :
                        high < 0 ?
                            // BMP codepoint
                            String.fromCharCode( high + 0x10000 ) :
                            // Supplemental Plane codepoint (surrogate pair)
                            String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
                },

            // Used for iframes
            // See setDocument()
            // Removing the function wrapper causes a "Permission Denied"
            // error in IE
                unloadHandler = function() {
                    setDocument();
                };

// Optimize for push.apply( _, NodeList )
            try {
                push.apply(
                    (arr = slice.call( preferredDoc.childNodes )),
                    preferredDoc.childNodes
                );
                // Support: Android<4.0
                // Detect silently failing push.apply
                arr[ preferredDoc.childNodes.length ].nodeType;
            } catch ( e ) {
                push = { apply: arr.length ?

                    // Leverage slice if possible
                    function( target, els ) {
                        push_native.apply( target, slice.call(els) );
                    } :

                    // Support: IE<9
                    // Otherwise append directly
                    function( target, els ) {
                        var j = target.length,
                            i = 0;
                        // Can't trust NodeList.length
                        while ( (target[j++] = els[i++]) ) {}
                        target.length = j - 1;
                    }
                };
            }

            function Sizzle( selector, context, results, seed ) {
                var match, elem, m, nodeType,
                // QSA vars
                    i, groups, old, nid, newContext, newSelector;

                if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
                    setDocument( context );
                }

                context = context || document;
                results = results || [];
                nodeType = context.nodeType;

                if ( typeof selector !== "string" || !selector ||
                    nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

                    return results;
                }

                if ( !seed && documentIsHTML ) {

                    // Try to shortcut find operations when possible (e.g., not under DocumentFragment)
                    if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
                        // Speed-up: Sizzle("#ID")
                        if ( (m = match[1]) ) {
                            if ( nodeType === 9 ) {
                                elem = context.getElementById( m );
                                // Check parentNode to catch when Blackberry 4.6 returns
                                // nodes that are no longer in the document (jQuery #6963)
                                if ( elem && elem.parentNode ) {
                                    // Handle the case where IE, Opera, and Webkit return items
                                    // by name instead of ID
                                    if ( elem.id === m ) {
                                        results.push( elem );
                                        return results;
                                    }
                                } else {
                                    return results;
                                }
                            } else {
                                // Context is not a document
                                if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
                                    contains( context, elem ) && elem.id === m ) {
                                    results.push( elem );
                                    return results;
                                }
                            }

                            // Speed-up: Sizzle("TAG")
                        } else if ( match[2] ) {
                            push.apply( results, context.getElementsByTagName( selector ) );
                            return results;

                            // Speed-up: Sizzle(".CLASS")
                        } else if ( (m = match[3]) && support.getElementsByClassName ) {
                            push.apply( results, context.getElementsByClassName( m ) );
                            return results;
                        }
                    }

                    // QSA path
                    if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
                        nid = old = expando;
                        newContext = context;
                        newSelector = nodeType !== 1 && selector;

                        // qSA works strangely on Element-rooted queries
                        // We can work around this by specifying an extra ID on the root
                        // and working up from there (Thanks to Andrew Dupont for the technique)
                        // IE 8 doesn't work on object elements
                        if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
                            groups = tokenize( selector );

                            if ( (old = context.getAttribute("id")) ) {
                                nid = old.replace( rescape, "\\$&" );
                            } else {
                                context.setAttribute( "id", nid );
                            }
                            nid = "[id='" + nid + "'] ";

                            i = groups.length;
                            while ( i-- ) {
                                groups[i] = nid + toSelector( groups[i] );
                            }
                            newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
                            newSelector = groups.join(",");
                        }

                        if ( newSelector ) {
                            try {
                                push.apply( results,
                                    newContext.querySelectorAll( newSelector )
                                );
                                return results;
                            } catch(qsaError) {
                            } finally {
                                if ( !old ) {
                                    context.removeAttribute("id");
                                }
                            }
                        }
                    }
                }

                // All others
                return select( selector.replace( rtrim, "$1" ), context, results, seed );
            }

            /**
             * Create key-value caches of limited size
             * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
             *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
             *	deleting the oldest entry
             */
            function createCache() {
                var keys = [];

                function cache( key, value ) {
                    // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
                    if ( keys.push( key + " " ) > Expr.cacheLength ) {
                        // Only keep the most recent entries
                        delete cache[ keys.shift() ];
                    }
                    return (cache[ key + " " ] = value);
                }
                return cache;
            }

            /**
             * Mark a function for special use by Sizzle
             * @param {Function} fn The function to mark
             */
            function markFunction( fn ) {
                fn[ expando ] = true;
                return fn;
            }

            /**
             * Support testing using an element
             * @param {Function} fn Passed the created div and expects a boolean result
             */
            function assert( fn ) {
                var div = document.createElement("div");

                try {
                    return !!fn( div );
                } catch (e) {
                    return false;
                } finally {
                    // Remove from its parent by default
                    if ( div.parentNode ) {
                        div.parentNode.removeChild( div );
                    }
                    // release memory in IE
                    div = null;
                }
            }

            /**
             * Adds the same handler for all of the specified attrs
             * @param {String} attrs Pipe-separated list of attributes
             * @param {Function} handler The method that will be applied
             */
            function addHandle( attrs, handler ) {
                var arr = attrs.split("|"),
                    i = attrs.length;

                while ( i-- ) {
                    Expr.attrHandle[ arr[i] ] = handler;
                }
            }

            /**
             * Checks document order of two siblings
             * @param {Element} a
             * @param {Element} b
             * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
             */
            function siblingCheck( a, b ) {
                var cur = b && a,
                    diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
                        ( ~b.sourceIndex || MAX_NEGATIVE ) -
                        ( ~a.sourceIndex || MAX_NEGATIVE );

                // Use IE sourceIndex if available on both nodes
                if ( diff ) {
                    return diff;
                }

                // Check if b follows a
                if ( cur ) {
                    while ( (cur = cur.nextSibling) ) {
                        if ( cur === b ) {
                            return -1;
                        }
                    }
                }

                return a ? 1 : -1;
            }

            /**
             * Returns a function to use in pseudos for input types
             * @param {String} type
             */
            function createInputPseudo( type ) {
                return function( elem ) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === type;
                };
            }

            /**
             * Returns a function to use in pseudos for buttons
             * @param {String} type
             */
            function createButtonPseudo( type ) {
                return function( elem ) {
                    var name = elem.nodeName.toLowerCase();
                    return (name === "input" || name === "button") && elem.type === type;
                };
            }

            /**
             * Returns a function to use in pseudos for positionals
             * @param {Function} fn
             */
            function createPositionalPseudo( fn ) {
                return markFunction(function( argument ) {
                    argument = +argument;
                    return markFunction(function( seed, matches ) {
                        var j,
                            matchIndexes = fn( [], seed.length, argument ),
                            i = matchIndexes.length;

                        // Match elements found at the specified indexes
                        while ( i-- ) {
                            if ( seed[ (j = matchIndexes[i]) ] ) {
                                seed[j] = !(matches[j] = seed[j]);
                            }
                        }
                    });
                });
            }

            /**
             * Checks a node for validity as a Sizzle context
             * @param {Element|Object=} context
             * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
             */
            function testContext( context ) {
                return context && typeof context.getElementsByTagName !== "undefined" && context;
            }

// Expose support vars for convenience
            support = Sizzle.support = {};

            /**
             * Detects XML nodes
             * @param {Element|Object} elem An element or a document
             * @returns {Boolean} True iff elem is a non-HTML XML node
             */
            isXML = Sizzle.isXML = function( elem ) {
                // documentElement is verified for cases where it doesn't yet exist
                // (such as loading iframes in IE - #4833)
                var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                return documentElement ? documentElement.nodeName !== "HTML" : false;
            };

            /**
             * Sets document-related variables once based on the current document
             * @param {Element|Object} [doc] An element or document object to use to set the document
             * @returns {Object} Returns the current document
             */
            setDocument = Sizzle.setDocument = function( node ) {
                var hasCompare, parent,
                    doc = node ? node.ownerDocument || node : preferredDoc;

                // If no document and documentElement is available, return
                if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
                    return document;
                }

                // Set our document
                document = doc;
                docElem = doc.documentElement;
                parent = doc.defaultView;

                // Support: IE>8
                // If iframe document is assigned to "document" variable and if iframe has been reloaded,
                // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
                // IE6-8 do not support the defaultView property so parent will be undefined
                if ( parent && parent !== parent.top ) {
                    // IE11 does not have attachEvent, so all must suffer
                    if ( parent.addEventListener ) {
                        parent.addEventListener( "unload", unloadHandler, false );
                    } else if ( parent.attachEvent ) {
                        parent.attachEvent( "onunload", unloadHandler );
                    }
                }

                /* Support tests
                 ---------------------------------------------------------------------- */
                documentIsHTML = !isXML( doc );

                /* Attributes
                 ---------------------------------------------------------------------- */

                // Support: IE<8
                // Verify that getAttribute really returns attributes and not properties
                // (excepting IE8 booleans)
                support.attributes = assert(function( div ) {
                    div.className = "i";
                    return !div.getAttribute("className");
                });

                /* getElement(s)By*
                 ---------------------------------------------------------------------- */

                // Check if getElementsByTagName("*") returns only elements
                support.getElementsByTagName = assert(function( div ) {
                    div.appendChild( doc.createComment("") );
                    return !div.getElementsByTagName("*").length;
                });

                // Support: IE<9
                support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

                // Support: IE<10
                // Check if getElementById returns elements by name
                // The broken getElementById methods don't pick up programatically-set names,
                // so use a roundabout getElementsByName test
                support.getById = assert(function( div ) {
                    docElem.appendChild( div ).id = expando;
                    return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
                });

                // ID find and filter
                if ( support.getById ) {
                    Expr.find["ID"] = function( id, context ) {
                        if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
                            var m = context.getElementById( id );
                            // Check parentNode to catch when Blackberry 4.6 returns
                            // nodes that are no longer in the document #6963
                            return m && m.parentNode ? [ m ] : [];
                        }
                    };
                    Expr.filter["ID"] = function( id ) {
                        var attrId = id.replace( runescape, funescape );
                        return function( elem ) {
                            return elem.getAttribute("id") === attrId;
                        };
                    };
                } else {
                    // Support: IE6/7
                    // getElementById is not reliable as a find shortcut
                    delete Expr.find["ID"];

                    Expr.filter["ID"] =  function( id ) {
                        var attrId = id.replace( runescape, funescape );
                        return function( elem ) {
                            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                            return node && node.value === attrId;
                        };
                    };
                }

                // Tag
                Expr.find["TAG"] = support.getElementsByTagName ?
                    function( tag, context ) {
                        if ( typeof context.getElementsByTagName !== "undefined" ) {
                            return context.getElementsByTagName( tag );

                            // DocumentFragment nodes don't have gEBTN
                        } else if ( support.qsa ) {
                            return context.querySelectorAll( tag );
                        }
                    } :

                    function( tag, context ) {
                        var elem,
                            tmp = [],
                            i = 0,
                        // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
                            results = context.getElementsByTagName( tag );

                        // Filter out possible comments
                        if ( tag === "*" ) {
                            while ( (elem = results[i++]) ) {
                                if ( elem.nodeType === 1 ) {
                                    tmp.push( elem );
                                }
                            }

                            return tmp;
                        }
                        return results;
                    };

                // Class
                Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
                    if ( documentIsHTML ) {
                        return context.getElementsByClassName( className );
                    }
                };

                /* QSA/matchesSelector
                 ---------------------------------------------------------------------- */

                // QSA and matchesSelector support

                // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
                rbuggyMatches = [];

                // qSa(:focus) reports false when true (Chrome 21)
                // We allow this because of a bug in IE8/9 that throws an error
                // whenever `document.activeElement` is accessed on an iframe
                // So, we allow :focus to pass through QSA all the time to avoid the IE error
                // See http://bugs.jquery.com/ticket/13378
                rbuggyQSA = [];

                if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
                    // Build QSA regex
                    // Regex strategy adopted from Diego Perini
                    assert(function( div ) {
                        // Select is set to empty string on purpose
                        // This is to test IE's treatment of not explicitly
                        // setting a boolean content attribute,
                        // since its presence should be enough
                        // http://bugs.jquery.com/ticket/12359
                        docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
                        "<select id='" + expando + "-\f]' msallowcapture=''>" +
                        "<option selected=''></option></select>";

                        // Support: IE8, Opera 11-12.16
                        // Nothing should be selected when empty strings follow ^= or $= or *=
                        // The test attribute must be unknown in Opera but "safe" for WinRT
                        // http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
                        if ( div.querySelectorAll("[msallowcapture^='']").length ) {
                            rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
                        }

                        // Support: IE8
                        // Boolean attributes and "value" are not treated correctly
                        if ( !div.querySelectorAll("[selected]").length ) {
                            rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
                        }

                        // Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
                        if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
                            rbuggyQSA.push("~=");
                        }

                        // Webkit/Opera - :checked should return selected option elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        // IE8 throws error here and will not see later tests
                        if ( !div.querySelectorAll(":checked").length ) {
                            rbuggyQSA.push(":checked");
                        }

                        // Support: Safari 8+, iOS 8+
                        // https://bugs.webkit.org/show_bug.cgi?id=136851
                        // In-page `selector#id sibing-combinator selector` fails
                        if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
                            rbuggyQSA.push(".#.+[+~]");
                        }
                    });

                    assert(function( div ) {
                        // Support: Windows 8 Native Apps
                        // The type and name attributes are restricted during .innerHTML assignment
                        var input = doc.createElement("input");
                        input.setAttribute( "type", "hidden" );
                        div.appendChild( input ).setAttribute( "name", "D" );

                        // Support: IE8
                        // Enforce case-sensitivity of name attribute
                        if ( div.querySelectorAll("[name=d]").length ) {
                            rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
                        }

                        // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                        // IE8 throws error here and will not see later tests
                        if ( !div.querySelectorAll(":enabled").length ) {
                            rbuggyQSA.push( ":enabled", ":disabled" );
                        }

                        // Opera 10-11 does not throw on post-comma invalid pseudos
                        div.querySelectorAll("*,:x");
                        rbuggyQSA.push(",.*:");
                    });
                }

                if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
                    docElem.webkitMatchesSelector ||
                    docElem.mozMatchesSelector ||
                    docElem.oMatchesSelector ||
                    docElem.msMatchesSelector) )) ) {

                    assert(function( div ) {
                        // Check to see if it's possible to do matchesSelector
                        // on a disconnected node (IE 9)
                        support.disconnectedMatch = matches.call( div, "div" );

                        // This should fail with an exception
                        // Gecko does not error, returns false instead
                        matches.call( div, "[s!='']:x" );
                        rbuggyMatches.push( "!=", pseudos );
                    });
                }

                rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
                rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

                /* Contains
                 ---------------------------------------------------------------------- */
                hasCompare = rnative.test( docElem.compareDocumentPosition );

                // Element contains another
                // Purposefully does not implement inclusive descendent
                // As in, an element does not contain itself
                contains = hasCompare || rnative.test( docElem.contains ) ?
                    function( a, b ) {
                        var adown = a.nodeType === 9 ? a.documentElement : a,
                            bup = b && b.parentNode;
                        return a === bup || !!( bup && bup.nodeType === 1 && (
                                adown.contains ?
                                    adown.contains( bup ) :
                                a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
                            ));
                    } :
                    function( a, b ) {
                        if ( b ) {
                            while ( (b = b.parentNode) ) {
                                if ( b === a ) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    };

                /* Sorting
                 ---------------------------------------------------------------------- */

                // Document order sorting
                sortOrder = hasCompare ?
                    function( a, b ) {

                        // Flag for duplicate removal
                        if ( a === b ) {
                            hasDuplicate = true;
                            return 0;
                        }

                        // Sort on method existence if only one input has compareDocumentPosition
                        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                        if ( compare ) {
                            return compare;
                        }

                        // Calculate position if both inputs belong to the same document
                        compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
                            a.compareDocumentPosition( b ) :

                            // Otherwise we know they are disconnected
                            1;

                        // Disconnected nodes
                        if ( compare & 1 ||
                            (!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

                            // Choose the first element that is related to our preferred document
                            if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
                                return -1;
                            }
                            if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
                                return 1;
                            }

                            // Maintain original order
                            return sortInput ?
                                ( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
                                0;
                        }

                        return compare & 4 ? -1 : 1;
                    } :
                    function( a, b ) {
                        // Exit early if the nodes are identical
                        if ( a === b ) {
                            hasDuplicate = true;
                            return 0;
                        }

                        var cur,
                            i = 0,
                            aup = a.parentNode,
                            bup = b.parentNode,
                            ap = [ a ],
                            bp = [ b ];

                        // Parentless nodes are either documents or disconnected
                        if ( !aup || !bup ) {
                            return a === doc ? -1 :
                                b === doc ? 1 :
                                    aup ? -1 :
                                        bup ? 1 :
                                            sortInput ?
                                                ( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
                                                0;

                            // If the nodes are siblings, we can do a quick check
                        } else if ( aup === bup ) {
                            return siblingCheck( a, b );
                        }

                        // Otherwise we need full lists of their ancestors for comparison
                        cur = a;
                        while ( (cur = cur.parentNode) ) {
                            ap.unshift( cur );
                        }
                        cur = b;
                        while ( (cur = cur.parentNode) ) {
                            bp.unshift( cur );
                        }

                        // Walk down the tree looking for a discrepancy
                        while ( ap[i] === bp[i] ) {
                            i++;
                        }

                        return i ?
                            // Do a sibling check if the nodes have a common ancestor
                            siblingCheck( ap[i], bp[i] ) :

                            // Otherwise nodes in our document sort first
                            ap[i] === preferredDoc ? -1 :
                                bp[i] === preferredDoc ? 1 :
                                    0;
                    };

                return doc;
            };

            Sizzle.matches = function( expr, elements ) {
                return Sizzle( expr, null, null, elements );
            };

            Sizzle.matchesSelector = function( elem, expr ) {
                // Set document vars if needed
                if ( ( elem.ownerDocument || elem ) !== document ) {
                    setDocument( elem );
                }

                // Make sure that attribute selectors are quoted
                expr = expr.replace( rattributeQuotes, "='$1']" );

                if ( support.matchesSelector && documentIsHTML &&
                    ( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
                    ( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

                    try {
                        var ret = matches.call( elem, expr );

                        // IE 9's matchesSelector returns false on disconnected nodes
                        if ( ret || support.disconnectedMatch ||
                                // As well, disconnected nodes are said to be in a document
                                // fragment in IE 9
                            elem.document && elem.document.nodeType !== 11 ) {
                            return ret;
                        }
                    } catch (e) {}
                }

                return Sizzle( expr, document, null, [ elem ] ).length > 0;
            };

            Sizzle.contains = function( context, elem ) {
                // Set document vars if needed
                if ( ( context.ownerDocument || context ) !== document ) {
                    setDocument( context );
                }
                return contains( context, elem );
            };

            Sizzle.attr = function( elem, name ) {
                // Set document vars if needed
                if ( ( elem.ownerDocument || elem ) !== document ) {
                    setDocument( elem );
                }

                var fn = Expr.attrHandle[ name.toLowerCase() ],
                // Don't get fooled by Object.prototype properties (jQuery #13807)
                    val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
                        fn( elem, name, !documentIsHTML ) :
                        undefined;

                return val !== undefined ?
                    val :
                    support.attributes || !documentIsHTML ?
                        elem.getAttribute( name ) :
                        (val = elem.getAttributeNode(name)) && val.specified ?
                            val.value :
                            null;
            };

            Sizzle.error = function( msg ) {
                throw new Error( "Syntax error, unrecognized expression: " + msg );
            };

            /**
             * Document sorting and removing duplicates
             * @param {ArrayLike} results
             */
            Sizzle.uniqueSort = function( results ) {
                var elem,
                    duplicates = [],
                    j = 0,
                    i = 0;

                // Unless we *know* we can detect duplicates, assume their presence
                hasDuplicate = !support.detectDuplicates;
                sortInput = !support.sortStable && results.slice( 0 );
                results.sort( sortOrder );

                if ( hasDuplicate ) {
                    while ( (elem = results[i++]) ) {
                        if ( elem === results[ i ] ) {
                            j = duplicates.push( i );
                        }
                    }
                    while ( j-- ) {
                        results.splice( duplicates[ j ], 1 );
                    }
                }

                // Clear input after sorting to release objects
                // See https://github.com/jquery/sizzle/pull/225
                sortInput = null;

                return results;
            };

            /**
             * Utility function for retrieving the text value of an array of DOM nodes
             * @param {Array|Element} elem
             */
            getText = Sizzle.getText = function( elem ) {
                var node,
                    ret = "",
                    i = 0,
                    nodeType = elem.nodeType;

                if ( !nodeType ) {
                    // If no nodeType, this is expected to be an array
                    while ( (node = elem[i++]) ) {
                        // Do not traverse comment nodes
                        ret += getText( node );
                    }
                } else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
                    // Use textContent for elements
                    // innerText usage removed for consistency of new lines (jQuery #11153)
                    if ( typeof elem.textContent === "string" ) {
                        return elem.textContent;
                    } else {
                        // Traverse its children
                        for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                            ret += getText( elem );
                        }
                    }
                } else if ( nodeType === 3 || nodeType === 4 ) {
                    return elem.nodeValue;
                }
                // Do not include comment or processing instruction nodes

                return ret;
            };

            Expr = Sizzle.selectors = {

                // Can be adjusted by the user
                cacheLength: 50,

                createPseudo: markFunction,

                match: matchExpr,

                attrHandle: {},

                find: {},

                relative: {
                    ">": { dir: "parentNode", first: true },
                    " ": { dir: "parentNode" },
                    "+": { dir: "previousSibling", first: true },
                    "~": { dir: "previousSibling" }
                },

                preFilter: {
                    "ATTR": function( match ) {
                        match[1] = match[1].replace( runescape, funescape );

                        // Move the given value to match[3] whether quoted or unquoted
                        match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

                        if ( match[2] === "~=" ) {
                            match[3] = " " + match[3] + " ";
                        }

                        return match.slice( 0, 4 );
                    },

                    "CHILD": function( match ) {
                        /* matches from matchExpr["CHILD"]
                         1 type (only|nth|...)
                         2 what (child|of-type)
                         3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                         4 xn-component of xn+y argument ([+-]?\d*n|)
                         5 sign of xn-component
                         6 x of xn-component
                         7 sign of y-component
                         8 y of y-component
                         */
                        match[1] = match[1].toLowerCase();

                        if ( match[1].slice( 0, 3 ) === "nth" ) {
                            // nth-* requires argument
                            if ( !match[3] ) {
                                Sizzle.error( match[0] );
                            }

                            // numeric x and y parameters for Expr.filter.CHILD
                            // remember that false/true cast respectively to 0/1
                            match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
                            match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

                            // other types prohibit arguments
                        } else if ( match[3] ) {
                            Sizzle.error( match[0] );
                        }

                        return match;
                    },

                    "PSEUDO": function( match ) {
                        var excess,
                            unquoted = !match[6] && match[2];

                        if ( matchExpr["CHILD"].test( match[0] ) ) {
                            return null;
                        }

                        // Accept quoted arguments as-is
                        if ( match[3] ) {
                            match[2] = match[4] || match[5] || "";

                            // Strip excess characters from unquoted arguments
                        } else if ( unquoted && rpseudo.test( unquoted ) &&
                                // Get excess from tokenize (recursively)
                            (excess = tokenize( unquoted, true )) &&
                                // advance to the next closing parenthesis
                            (excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

                            // excess is a negative index
                            match[0] = match[0].slice( 0, excess );
                            match[2] = unquoted.slice( 0, excess );
                        }

                        // Return only captures needed by the pseudo filter method (type and argument)
                        return match.slice( 0, 3 );
                    }
                },

                filter: {

                    "TAG": function( nodeNameSelector ) {
                        var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
                        return nodeNameSelector === "*" ?
                            function() { return true; } :
                            function( elem ) {
                                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                            };
                    },

                    "CLASS": function( className ) {
                        var pattern = classCache[ className + " " ];

                        return pattern ||
                            (pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
                            classCache( className, function( elem ) {
                                return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
                            });
                    },

                    "ATTR": function( name, operator, check ) {
                        return function( elem ) {
                            var result = Sizzle.attr( elem, name );

                            if ( result == null ) {
                                return operator === "!=";
                            }
                            if ( !operator ) {
                                return true;
                            }

                            result += "";

                            return operator === "=" ? result === check :
                                operator === "!=" ? result !== check :
                                    operator === "^=" ? check && result.indexOf( check ) === 0 :
                                        operator === "*=" ? check && result.indexOf( check ) > -1 :
                                            operator === "$=" ? check && result.slice( -check.length ) === check :
                                                operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
                                                    operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
                                                        false;
                        };
                    },

                    "CHILD": function( type, what, argument, first, last ) {
                        var simple = type.slice( 0, 3 ) !== "nth",
                            forward = type.slice( -4 ) !== "last",
                            ofType = what === "of-type";

                        return first === 1 && last === 0 ?

                            // Shortcut for :nth-*(n)
                            function( elem ) {
                                return !!elem.parentNode;
                            } :

                            function( elem, context, xml ) {
                                var cache, outerCache, node, diff, nodeIndex, start,
                                    dir = simple !== forward ? "nextSibling" : "previousSibling",
                                    parent = elem.parentNode,
                                    name = ofType && elem.nodeName.toLowerCase(),
                                    useCache = !xml && !ofType;

                                if ( parent ) {

                                    // :(first|last|only)-(child|of-type)
                                    if ( simple ) {
                                        while ( dir ) {
                                            node = elem;
                                            while ( (node = node[ dir ]) ) {
                                                if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
                                                    return false;
                                                }
                                            }
                                            // Reverse direction for :only-* (if we haven't yet done so)
                                            start = dir = type === "only" && !start && "nextSibling";
                                        }
                                        return true;
                                    }

                                    start = [ forward ? parent.firstChild : parent.lastChild ];

                                    // non-xml :nth-child(...) stores cache data on `parent`
                                    if ( forward && useCache ) {
                                        // Seek `elem` from a previously-cached index
                                        outerCache = parent[ expando ] || (parent[ expando ] = {});
                                        cache = outerCache[ type ] || [];
                                        nodeIndex = cache[0] === dirruns && cache[1];
                                        diff = cache[0] === dirruns && cache[2];
                                        node = nodeIndex && parent.childNodes[ nodeIndex ];

                                        while ( (node = ++nodeIndex && node && node[ dir ] ||

                                            // Fallback to seeking `elem` from the start
                                        (diff = nodeIndex = 0) || start.pop()) ) {

                                            // When found, cache indexes on `parent` and break
                                            if ( node.nodeType === 1 && ++diff && node === elem ) {
                                                outerCache[ type ] = [ dirruns, nodeIndex, diff ];
                                                break;
                                            }
                                        }

                                        // Use previously-cached element index if available
                                    } else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
                                        diff = cache[1];

                                        // xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
                                    } else {
                                        // Use the same loop as above to seek `elem` from the start
                                        while ( (node = ++nodeIndex && node && node[ dir ] ||
                                        (diff = nodeIndex = 0) || start.pop()) ) {

                                            if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
                                                // Cache the index of each encountered element
                                                if ( useCache ) {
                                                    (node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
                                                }

                                                if ( node === elem ) {
                                                    break;
                                                }
                                            }
                                        }
                                    }

                                    // Incorporate the offset, then check against cycle size
                                    diff -= last;
                                    return diff === first || ( diff % first === 0 && diff / first >= 0 );
                                }
                            };
                    },

                    "PSEUDO": function( pseudo, argument ) {
                        // pseudo-class names are case-insensitive
                        // http://www.w3.org/TR/selectors/#pseudo-classes
                        // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                        // Remember that setFilters inherits from pseudos
                        var args,
                            fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
                                Sizzle.error( "unsupported pseudo: " + pseudo );

                        // The user may use createPseudo to indicate that
                        // arguments are needed to create the filter function
                        // just as Sizzle does
                        if ( fn[ expando ] ) {
                            return fn( argument );
                        }

                        // But maintain support for old signatures
                        if ( fn.length > 1 ) {
                            args = [ pseudo, pseudo, "", argument ];
                            return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
                                markFunction(function( seed, matches ) {
                                    var idx,
                                        matched = fn( seed, argument ),
                                        i = matched.length;
                                    while ( i-- ) {
                                        idx = indexOf( seed, matched[i] );
                                        seed[ idx ] = !( matches[ idx ] = matched[i] );
                                    }
                                }) :
                                function( elem ) {
                                    return fn( elem, 0, args );
                                };
                        }

                        return fn;
                    }
                },

                pseudos: {
                    // Potentially complex pseudos
                    "not": markFunction(function( selector ) {
                        // Trim the selector passed to compile
                        // to avoid treating leading and trailing
                        // spaces as combinators
                        var input = [],
                            results = [],
                            matcher = compile( selector.replace( rtrim, "$1" ) );

                        return matcher[ expando ] ?
                            markFunction(function( seed, matches, context, xml ) {
                                var elem,
                                    unmatched = matcher( seed, null, xml, [] ),
                                    i = seed.length;

                                // Match elements unmatched by `matcher`
                                while ( i-- ) {
                                    if ( (elem = unmatched[i]) ) {
                                        seed[i] = !(matches[i] = elem);
                                    }
                                }
                            }) :
                            function( elem, context, xml ) {
                                input[0] = elem;
                                matcher( input, null, xml, results );
                                // Don't keep the element (issue #299)
                                input[0] = null;
                                return !results.pop();
                            };
                    }),

                    "has": markFunction(function( selector ) {
                        return function( elem ) {
                            return Sizzle( selector, elem ).length > 0;
                        };
                    }),

                    "contains": markFunction(function( text ) {
                        text = text.replace( runescape, funescape );
                        return function( elem ) {
                            return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
                        };
                    }),

                    // "Whether an element is represented by a :lang() selector
                    // is based solely on the element's language value
                    // being equal to the identifier C,
                    // or beginning with the identifier C immediately followed by "-".
                    // The matching of C against the element's language value is performed case-insensitively.
                    // The identifier C does not have to be a valid language name."
                    // http://www.w3.org/TR/selectors/#lang-pseudo
                    "lang": markFunction( function( lang ) {
                        // lang value must be a valid identifier
                        if ( !ridentifier.test(lang || "") ) {
                            Sizzle.error( "unsupported lang: " + lang );
                        }
                        lang = lang.replace( runescape, funescape ).toLowerCase();
                        return function( elem ) {
                            var elemLang;
                            do {
                                if ( (elemLang = documentIsHTML ?
                                        elem.lang :
                                    elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

                                    elemLang = elemLang.toLowerCase();
                                    return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
                                }
                            } while ( (elem = elem.parentNode) && elem.nodeType === 1 );
                            return false;
                        };
                    }),

                    // Miscellaneous
                    "target": function( elem ) {
                        var hash = window.location && window.location.hash;
                        return hash && hash.slice( 1 ) === elem.id;
                    },

                    "root": function( elem ) {
                        return elem === docElem;
                    },

                    "focus": function( elem ) {
                        return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                    },

                    // Boolean properties
                    "enabled": function( elem ) {
                        return elem.disabled === false;
                    },

                    "disabled": function( elem ) {
                        return elem.disabled === true;
                    },

                    "checked": function( elem ) {
                        // In CSS3, :checked should return both checked and selected elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        var nodeName = elem.nodeName.toLowerCase();
                        return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                    },

                    "selected": function( elem ) {
                        // Accessing this property makes selected-by-default
                        // options in Safari work properly
                        if ( elem.parentNode ) {
                            elem.parentNode.selectedIndex;
                        }

                        return elem.selected === true;
                    },

                    // Contents
                    "empty": function( elem ) {
                        // http://www.w3.org/TR/selectors/#empty-pseudo
                        // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
                        //   but not by others (comment: 8; processing instruction: 7; etc.)
                        // nodeType < 6 works because attributes (2) do not appear as children
                        for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                            if ( elem.nodeType < 6 ) {
                                return false;
                            }
                        }
                        return true;
                    },

                    "parent": function( elem ) {
                        return !Expr.pseudos["empty"]( elem );
                    },

                    // Element/input types
                    "header": function( elem ) {
                        return rheader.test( elem.nodeName );
                    },

                    "input": function( elem ) {
                        return rinputs.test( elem.nodeName );
                    },

                    "button": function( elem ) {
                        var name = elem.nodeName.toLowerCase();
                        return name === "input" && elem.type === "button" || name === "button";
                    },

                    "text": function( elem ) {
                        var attr;
                        return elem.nodeName.toLowerCase() === "input" &&
                            elem.type === "text" &&

                                // Support: IE<8
                                // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                            ( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
                    },

                    // Position-in-collection
                    "first": createPositionalPseudo(function() {
                        return [ 0 ];
                    }),

                    "last": createPositionalPseudo(function( matchIndexes, length ) {
                        return [ length - 1 ];
                    }),

                    "eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
                        return [ argument < 0 ? argument + length : argument ];
                    }),

                    "even": createPositionalPseudo(function( matchIndexes, length ) {
                        var i = 0;
                        for ( ; i < length; i += 2 ) {
                            matchIndexes.push( i );
                        }
                        return matchIndexes;
                    }),

                    "odd": createPositionalPseudo(function( matchIndexes, length ) {
                        var i = 1;
                        for ( ; i < length; i += 2 ) {
                            matchIndexes.push( i );
                        }
                        return matchIndexes;
                    }),

                    "lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
                        var i = argument < 0 ? argument + length : argument;
                        for ( ; --i >= 0; ) {
                            matchIndexes.push( i );
                        }
                        return matchIndexes;
                    }),

                    "gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
                        var i = argument < 0 ? argument + length : argument;
                        for ( ; ++i < length; ) {
                            matchIndexes.push( i );
                        }
                        return matchIndexes;
                    })
                }
            };

            Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
            for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
                Expr.pseudos[ i ] = createInputPseudo( i );
            }
            for ( i in { submit: true, reset: true } ) {
                Expr.pseudos[ i ] = createButtonPseudo( i );
            }

// Easy API for creating new setFilters
            function setFilters() {}
            setFilters.prototype = Expr.filters = Expr.pseudos;
            Expr.setFilters = new setFilters();

            tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
                var matched, match, tokens, type,
                    soFar, groups, preFilters,
                    cached = tokenCache[ selector + " " ];

                if ( cached ) {
                    return parseOnly ? 0 : cached.slice( 0 );
                }

                soFar = selector;
                groups = [];
                preFilters = Expr.preFilter;

                while ( soFar ) {

                    // Comma and first run
                    if ( !matched || (match = rcomma.exec( soFar )) ) {
                        if ( match ) {
                            // Don't consume trailing commas as valid
                            soFar = soFar.slice( match[0].length ) || soFar;
                        }
                        groups.push( (tokens = []) );
                    }

                    matched = false;

                    // Combinators
                    if ( (match = rcombinators.exec( soFar )) ) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            // Cast descendant combinators to space
                            type: match[0].replace( rtrim, " " )
                        });
                        soFar = soFar.slice( matched.length );
                    }

                    // Filters
                    for ( type in Expr.filter ) {
                        if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
                            (match = preFilters[ type ]( match ))) ) {
                            matched = match.shift();
                            tokens.push({
                                value: matched,
                                type: type,
                                matches: match
                            });
                            soFar = soFar.slice( matched.length );
                        }
                    }

                    if ( !matched ) {
                        break;
                    }
                }

                // Return the length of the invalid excess
                // if we're just parsing
                // Otherwise, throw an error or return tokens
                return parseOnly ?
                    soFar.length :
                    soFar ?
                        Sizzle.error( selector ) :
                        // Cache the tokens
                        tokenCache( selector, groups ).slice( 0 );
            };

            function toSelector( tokens ) {
                var i = 0,
                    len = tokens.length,
                    selector = "";
                for ( ; i < len; i++ ) {
                    selector += tokens[i].value;
                }
                return selector;
            }

            function addCombinator( matcher, combinator, base ) {
                var dir = combinator.dir,
                    checkNonElements = base && dir === "parentNode",
                    doneName = done++;

                return combinator.first ?
                    // Check against closest ancestor/preceding element
                    function( elem, context, xml ) {
                        while ( (elem = elem[ dir ]) ) {
                            if ( elem.nodeType === 1 || checkNonElements ) {
                                return matcher( elem, context, xml );
                            }
                        }
                    } :

                    // Check against all ancestor/preceding elements
                    function( elem, context, xml ) {
                        var oldCache, outerCache,
                            newCache = [ dirruns, doneName ];

                        // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
                        if ( xml ) {
                            while ( (elem = elem[ dir ]) ) {
                                if ( elem.nodeType === 1 || checkNonElements ) {
                                    if ( matcher( elem, context, xml ) ) {
                                        return true;
                                    }
                                }
                            }
                        } else {
                            while ( (elem = elem[ dir ]) ) {
                                if ( elem.nodeType === 1 || checkNonElements ) {
                                    outerCache = elem[ expando ] || (elem[ expando ] = {});
                                    if ( (oldCache = outerCache[ dir ]) &&
                                        oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

                                        // Assign to newCache so results back-propagate to previous elements
                                        return (newCache[ 2 ] = oldCache[ 2 ]);
                                    } else {
                                        // Reuse newcache so results back-propagate to previous elements
                                        outerCache[ dir ] = newCache;

                                        // A match means we're done; a fail means we have to keep checking
                                        if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                    };
            }

            function elementMatcher( matchers ) {
                return matchers.length > 1 ?
                    function( elem, context, xml ) {
                        var i = matchers.length;
                        while ( i-- ) {
                            if ( !matchers[i]( elem, context, xml ) ) {
                                return false;
                            }
                        }
                        return true;
                    } :
                    matchers[0];
            }

            function multipleContexts( selector, contexts, results ) {
                var i = 0,
                    len = contexts.length;
                for ( ; i < len; i++ ) {
                    Sizzle( selector, contexts[i], results );
                }
                return results;
            }

            function condense( unmatched, map, filter, context, xml ) {
                var elem,
                    newUnmatched = [],
                    i = 0,
                    len = unmatched.length,
                    mapped = map != null;

                for ( ; i < len; i++ ) {
                    if ( (elem = unmatched[i]) ) {
                        if ( !filter || filter( elem, context, xml ) ) {
                            newUnmatched.push( elem );
                            if ( mapped ) {
                                map.push( i );
                            }
                        }
                    }
                }

                return newUnmatched;
            }

            function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
                if ( postFilter && !postFilter[ expando ] ) {
                    postFilter = setMatcher( postFilter );
                }
                if ( postFinder && !postFinder[ expando ] ) {
                    postFinder = setMatcher( postFinder, postSelector );
                }
                return markFunction(function( seed, results, context, xml ) {
                    var temp, i, elem,
                        preMap = [],
                        postMap = [],
                        preexisting = results.length,

                    // Get initial elements from seed or context
                        elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

                    // Prefilter to get matcher input, preserving a map for seed-results synchronization
                        matcherIn = preFilter && ( seed || !selector ) ?
                            condense( elems, preMap, preFilter, context, xml ) :
                            elems,

                        matcherOut = matcher ?
                            // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                            postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

                                // ...intermediate processing is necessary
                                [] :

                                // ...otherwise use results directly
                                results :
                            matcherIn;

                    // Find primary matches
                    if ( matcher ) {
                        matcher( matcherIn, matcherOut, context, xml );
                    }

                    // Apply postFilter
                    if ( postFilter ) {
                        temp = condense( matcherOut, postMap );
                        postFilter( temp, [], context, xml );

                        // Un-match failing elements by moving them back to matcherIn
                        i = temp.length;
                        while ( i-- ) {
                            if ( (elem = temp[i]) ) {
                                matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
                            }
                        }
                    }

                    if ( seed ) {
                        if ( postFinder || preFilter ) {
                            if ( postFinder ) {
                                // Get the final matcherOut by condensing this intermediate into postFinder contexts
                                temp = [];
                                i = matcherOut.length;
                                while ( i-- ) {
                                    if ( (elem = matcherOut[i]) ) {
                                        // Restore matcherIn since elem is not yet a final match
                                        temp.push( (matcherIn[i] = elem) );
                                    }
                                }
                                postFinder( null, (matcherOut = []), temp, xml );
                            }

                            // Move matched elements from seed to results to keep them synchronized
                            i = matcherOut.length;
                            while ( i-- ) {
                                if ( (elem = matcherOut[i]) &&
                                    (temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

                                    seed[temp] = !(results[temp] = elem);
                                }
                            }
                        }

                        // Add elements to results, through postFinder if defined
                    } else {
                        matcherOut = condense(
                            matcherOut === results ?
                                matcherOut.splice( preexisting, matcherOut.length ) :
                                matcherOut
                        );
                        if ( postFinder ) {
                            postFinder( null, results, matcherOut, xml );
                        } else {
                            push.apply( results, matcherOut );
                        }
                    }
                });
            }

            function matcherFromTokens( tokens ) {
                var checkContext, matcher, j,
                    len = tokens.length,
                    leadingRelative = Expr.relative[ tokens[0].type ],
                    implicitRelative = leadingRelative || Expr.relative[" "],
                    i = leadingRelative ? 1 : 0,

                // The foundational matcher ensures that elements are reachable from top-level context(s)
                    matchContext = addCombinator( function( elem ) {
                        return elem === checkContext;
                    }, implicitRelative, true ),
                    matchAnyContext = addCombinator( function( elem ) {
                        return indexOf( checkContext, elem ) > -1;
                    }, implicitRelative, true ),
                    matchers = [ function( elem, context, xml ) {
                        var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
                                (checkContext = context).nodeType ?
                                    matchContext( elem, context, xml ) :
                                    matchAnyContext( elem, context, xml ) );
                        // Avoid hanging onto element (issue #299)
                        checkContext = null;
                        return ret;
                    } ];

                for ( ; i < len; i++ ) {
                    if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
                        matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
                    } else {
                        matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

                        // Return special upon seeing a positional matcher
                        if ( matcher[ expando ] ) {
                            // Find the next relative operator (if any) for proper handling
                            j = ++i;
                            for ( ; j < len; j++ ) {
                                if ( Expr.relative[ tokens[j].type ] ) {
                                    break;
                                }
                            }
                            return setMatcher(
                                i > 1 && elementMatcher( matchers ),
                                i > 1 && toSelector(
                                    // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                                    tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
                                ).replace( rtrim, "$1" ),
                                matcher,
                                i < j && matcherFromTokens( tokens.slice( i, j ) ),
                                j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
                                j < len && toSelector( tokens )
                            );
                        }
                        matchers.push( matcher );
                    }
                }

                return elementMatcher( matchers );
            }

            function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
                var bySet = setMatchers.length > 0,
                    byElement = elementMatchers.length > 0,
                    superMatcher = function( seed, context, xml, results, outermost ) {
                        var elem, j, matcher,
                            matchedCount = 0,
                            i = "0",
                            unmatched = seed && [],
                            setMatched = [],
                            contextBackup = outermostContext,
                        // We must always have either seed elements or outermost context
                            elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
                        // Use integer dirruns iff this is the outermost matcher
                            dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                            len = elems.length;

                        if ( outermost ) {
                            outermostContext = context !== document && context;
                        }

                        // Add elements passing elementMatchers directly to results
                        // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
                        // Support: IE<9, Safari
                        // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
                        for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
                            if ( byElement && elem ) {
                                j = 0;
                                while ( (matcher = elementMatchers[j++]) ) {
                                    if ( matcher( elem, context, xml ) ) {
                                        results.push( elem );
                                        break;
                                    }
                                }
                                if ( outermost ) {
                                    dirruns = dirrunsUnique;
                                }
                            }

                            // Track unmatched elements for set filters
                            if ( bySet ) {
                                // They will have gone through all possible matchers
                                if ( (elem = !matcher && elem) ) {
                                    matchedCount--;
                                }

                                // Lengthen the array for every element, matched or not
                                if ( seed ) {
                                    unmatched.push( elem );
                                }
                            }
                        }

                        // Apply set filters to unmatched elements
                        matchedCount += i;
                        if ( bySet && i !== matchedCount ) {
                            j = 0;
                            while ( (matcher = setMatchers[j++]) ) {
                                matcher( unmatched, setMatched, context, xml );
                            }

                            if ( seed ) {
                                // Reintegrate element matches to eliminate the need for sorting
                                if ( matchedCount > 0 ) {
                                    while ( i-- ) {
                                        if ( !(unmatched[i] || setMatched[i]) ) {
                                            setMatched[i] = pop.call( results );
                                        }
                                    }
                                }

                                // Discard index placeholder values to get only actual matches
                                setMatched = condense( setMatched );
                            }

                            // Add matches to results
                            push.apply( results, setMatched );

                            // Seedless set matches succeeding multiple successful matchers stipulate sorting
                            if ( outermost && !seed && setMatched.length > 0 &&
                                ( matchedCount + setMatchers.length ) > 1 ) {

                                Sizzle.uniqueSort( results );
                            }
                        }

                        // Override manipulation of globals by nested matchers
                        if ( outermost ) {
                            dirruns = dirrunsUnique;
                            outermostContext = contextBackup;
                        }

                        return unmatched;
                    };

                return bySet ?
                    markFunction( superMatcher ) :
                    superMatcher;
            }

            compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
                var i,
                    setMatchers = [],
                    elementMatchers = [],
                    cached = compilerCache[ selector + " " ];

                if ( !cached ) {
                    // Generate a function of recursive functions that can be used to check each element
                    if ( !match ) {
                        match = tokenize( selector );
                    }
                    i = match.length;
                    while ( i-- ) {
                        cached = matcherFromTokens( match[i] );
                        if ( cached[ expando ] ) {
                            setMatchers.push( cached );
                        } else {
                            elementMatchers.push( cached );
                        }
                    }

                    // Cache the compiled function
                    cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

                    // Save selector and tokenization
                    cached.selector = selector;
                }
                return cached;
            };

            /**
             * A low-level selection function that works with Sizzle's compiled
             *  selector functions
             * @param {String|Function} selector A selector or a pre-compiled
             *  selector function built with Sizzle.compile
             * @param {Element} context
             * @param {Array} [results]
             * @param {Array} [seed] A set of elements to match against
             */
            select = Sizzle.select = function( selector, context, results, seed ) {
                var i, tokens, token, type, find,
                    compiled = typeof selector === "function" && selector,
                    match = !seed && tokenize( (selector = compiled.selector || selector) );

                results = results || [];

                // Try to minimize operations if there is no seed and only one group
                if ( match.length === 1 ) {

                    // Take a shortcut and set the context if the root selector is an ID
                    tokens = match[0] = match[0].slice( 0 );
                    if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                        support.getById && context.nodeType === 9 && documentIsHTML &&
                        Expr.relative[ tokens[1].type ] ) {

                        context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
                        if ( !context ) {
                            return results;

                            // Precompiled matchers will still verify ancestry, so step up a level
                        } else if ( compiled ) {
                            context = context.parentNode;
                        }

                        selector = selector.slice( tokens.shift().value.length );
                    }

                    // Fetch a seed set for right-to-left matching
                    i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
                    while ( i-- ) {
                        token = tokens[i];

                        // Abort if we hit a combinator
                        if ( Expr.relative[ (type = token.type) ] ) {
                            break;
                        }
                        if ( (find = Expr.find[ type ]) ) {
                            // Search, expanding context for leading sibling combinators
                            if ( (seed = find(
                                    token.matches[0].replace( runescape, funescape ),
                                    rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
                                )) ) {

                                // If seed is empty or no tokens remain, we can return early
                                tokens.splice( i, 1 );
                                selector = seed.length && toSelector( tokens );
                                if ( !selector ) {
                                    push.apply( results, seed );
                                    return results;
                                }

                                break;
                            }
                        }
                    }
                }

                // Compile and execute a filtering function if one is not provided
                // Provide `match` to avoid retokenization if we modified the selector above
                ( compiled || compile( selector, match ) )(
                    seed,
                    context,
                    !documentIsHTML,
                    results,
                    rsibling.test( selector ) && testContext( context.parentNode ) || context
                );
                return results;
            };

// One-time assignments

// Sort stability
            support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
            support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
            setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
            support.sortDetached = assert(function( div1 ) {
                // Should return 1, but returns 4 (following)
                return div1.compareDocumentPosition( document.createElement("div") ) & 1;
            });

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
            if ( !assert(function( div ) {
                    div.innerHTML = "<a href='#'></a>";
                    return div.firstChild.getAttribute("href") === "#" ;
                }) ) {
                addHandle( "type|href|height|width", function( elem, name, isXML ) {
                    if ( !isXML ) {
                        return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
                    }
                });
            }

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
            if ( !support.attributes || !assert(function( div ) {
                    div.innerHTML = "<input/>";
                    div.firstChild.setAttribute( "value", "" );
                    return div.firstChild.getAttribute( "value" ) === "";
                }) ) {
                addHandle( "value", function( elem, name, isXML ) {
                    if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
                        return elem.defaultValue;
                    }
                });
            }

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
            if ( !assert(function( div ) {
                    return div.getAttribute("disabled") == null;
                }) ) {
                addHandle( booleans, function( elem, name, isXML ) {
                    var val;
                    if ( !isXML ) {
                        return elem[ name ] === true ? name.toLowerCase() :
                            (val = elem.getAttributeNode( name )) && val.specified ?
                                val.value :
                                null;
                    }
                });
            }

            return Sizzle;

        })( window );



    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[":"] = jQuery.expr.pseudos;
    jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;



    var rneedsContext = jQuery.expr.match.needsContext;

    var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



    var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
    function winnow( elements, qualifier, not ) {
        if ( jQuery.isFunction( qualifier ) ) {
            return jQuery.grep( elements, function( elem, i ) {
                /* jshint -W018 */
                return !!qualifier.call( elem, i, elem ) !== not;
            });

        }

        if ( qualifier.nodeType ) {
            return jQuery.grep( elements, function( elem ) {
                return ( elem === qualifier ) !== not;
            });

        }

        if ( typeof qualifier === "string" ) {
            if ( risSimple.test( qualifier ) ) {
                return jQuery.filter( qualifier, elements, not );
            }

            qualifier = jQuery.filter( qualifier, elements );
        }

        return jQuery.grep( elements, function( elem ) {
            return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
        });
    }

    jQuery.filter = function( expr, elems, not ) {
        var elem = elems[ 0 ];

        if ( not ) {
            expr = ":not(" + expr + ")";
        }

        return elems.length === 1 && elem.nodeType === 1 ?
            jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
            jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
                return elem.nodeType === 1;
            }));
    };

    jQuery.fn.extend({
        find: function( selector ) {
            var i,
                ret = [],
                self = this,
                len = self.length;

            if ( typeof selector !== "string" ) {
                return this.pushStack( jQuery( selector ).filter(function() {
                    for ( i = 0; i < len; i++ ) {
                        if ( jQuery.contains( self[ i ], this ) ) {
                            return true;
                        }
                    }
                }) );
            }

            for ( i = 0; i < len; i++ ) {
                jQuery.find( selector, self[ i ], ret );
            }

            // Needed because $( selector, context ) becomes $( context ).find( selector )
            ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
            ret.selector = this.selector ? this.selector + " " + selector : selector;
            return ret;
        },
        filter: function( selector ) {
            return this.pushStack( winnow(this, selector || [], false) );
        },
        not: function( selector ) {
            return this.pushStack( winnow(this, selector || [], true) );
        },
        is: function( selector ) {
            return !!winnow(
                this,

                // If this is a positional/relative selector, check membership in the returned set
                // so $("p:first").is("p:last") won't return true for a doc with two "p".
                typeof selector === "string" && rneedsContext.test( selector ) ?
                    jQuery( selector ) :
                selector || [],
                false
            ).length;
        }
    });


// Initialize a jQuery object


// A central reference to the root jQuery(document)
    var rootjQuery,

    // Use the correct document accordingly with window argument (sandbox)
        document = window.document,

    // A simple way to check for HTML strings
    // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
    // Strict HTML recognition (#11290: must start with <)
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

        init = jQuery.fn.init = function( selector, context ) {
            var match, elem;

            // HANDLE: $(""), $(null), $(undefined), $(false)
            if ( !selector ) {
                return this;
            }

            // Handle HTML strings
            if ( typeof selector === "string" ) {
                if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
                    // Assume that strings that start and end with <> are HTML and skip the regex check
                    match = [ null, selector, null ];

                } else {
                    match = rquickExpr.exec( selector );
                }

                // Match html or make sure no context is specified for #id
                if ( match && (match[1] || !context) ) {

                    // HANDLE: $(html) -> $(array)
                    if ( match[1] ) {
                        context = context instanceof jQuery ? context[0] : context;

                        // scripts is true for back-compat
                        // Intentionally let the error be thrown if parseHTML is not present
                        jQuery.merge( this, jQuery.parseHTML(
                            match[1],
                            context && context.nodeType ? context.ownerDocument || context : document,
                            true
                        ) );

                        // HANDLE: $(html, props)
                        if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
                            for ( match in context ) {
                                // Properties of context are called as methods if possible
                                if ( jQuery.isFunction( this[ match ] ) ) {
                                    this[ match ]( context[ match ] );

                                    // ...and otherwise set as attributes
                                } else {
                                    this.attr( match, context[ match ] );
                                }
                            }
                        }

                        return this;

                        // HANDLE: $(#id)
                    } else {
                        elem = document.getElementById( match[2] );

                        // Check parentNode to catch when Blackberry 4.6 returns
                        // nodes that are no longer in the document #6963
                        if ( elem && elem.parentNode ) {
                            // Handle the case where IE and Opera return items
                            // by name instead of ID
                            if ( elem.id !== match[2] ) {
                                return rootjQuery.find( selector );
                            }

                            // Otherwise, we inject the element directly into the jQuery object
                            this.length = 1;
                            this[0] = elem;
                        }

                        this.context = document;
                        this.selector = selector;
                        return this;
                    }

                    // HANDLE: $(expr, $(...))
                } else if ( !context || context.jquery ) {
                    return ( context || rootjQuery ).find( selector );

                    // HANDLE: $(expr, context)
                    // (which is just equivalent to: $(context).find(expr)
                } else {
                    return this.constructor( context ).find( selector );
                }

                // HANDLE: $(DOMElement)
            } else if ( selector.nodeType ) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;

                // HANDLE: $(function)
                // Shortcut for document ready
            } else if ( jQuery.isFunction( selector ) ) {
                return typeof rootjQuery.ready !== "undefined" ?
                    rootjQuery.ready( selector ) :
                    // Execute immediately if ready is not present
                    selector( jQuery );
            }

            if ( selector.selector !== undefined ) {
                this.selector = selector.selector;
                this.context = selector.context;
            }

            return jQuery.makeArray( selector, this );
        };

// Give the init function the jQuery prototype for later instantiation
    init.prototype = jQuery.fn;

// Initialize central reference
    rootjQuery = jQuery( document );


    var rparentsprev = /^(?:parents|prev(?:Until|All))/,
    // methods guaranteed to produce a unique set when starting from a unique set
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };

    jQuery.extend({
        dir: function( elem, dir, until ) {
            var matched = [],
                cur = elem[ dir ];

            while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
                if ( cur.nodeType === 1 ) {
                    matched.push( cur );
                }
                cur = cur[dir];
            }
            return matched;
        },

        sibling: function( n, elem ) {
            var r = [];

            for ( ; n; n = n.nextSibling ) {
                if ( n.nodeType === 1 && n !== elem ) {
                    r.push( n );
                }
            }

            return r;
        }
    });

    jQuery.fn.extend({
        has: function( target ) {
            var i,
                targets = jQuery( target, this ),
                len = targets.length;

            return this.filter(function() {
                for ( i = 0; i < len; i++ ) {
                    if ( jQuery.contains( this, targets[i] ) ) {
                        return true;
                    }
                }
            });
        },

        closest: function( selectors, context ) {
            var cur,
                i = 0,
                l = this.length,
                matched = [],
                pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
                    jQuery( selectors, context || this.context ) :
                    0;

            for ( ; i < l; i++ ) {
                for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
                    // Always skip document fragments
                    if ( cur.nodeType < 11 && (pos ?
                        pos.index(cur) > -1 :

                            // Don't pass non-elements to Sizzle
                        cur.nodeType === 1 &&
                        jQuery.find.matchesSelector(cur, selectors)) ) {

                        matched.push( cur );
                        break;
                    }
                }
            }

            return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
        },

        // Determine the position of an element within
        // the matched set of elements
        index: function( elem ) {

            // No argument, return index in parent
            if ( !elem ) {
                return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
            }

            // index in selector
            if ( typeof elem === "string" ) {
                return jQuery.inArray( this[0], jQuery( elem ) );
            }

            // Locate the position of the desired element
            return jQuery.inArray(
                // If it receives a jQuery object, the first element is used
                elem.jquery ? elem[0] : elem, this );
        },

        add: function( selector, context ) {
            return this.pushStack(
                jQuery.unique(
                    jQuery.merge( this.get(), jQuery( selector, context ) )
                )
            );
        },

        addBack: function( selector ) {
            return this.add( selector == null ?
                    this.prevObject : this.prevObject.filter(selector)
            );
        }
    });

    function sibling( cur, dir ) {
        do {
            cur = cur[ dir ];
        } while ( cur && cur.nodeType !== 1 );

        return cur;
    }

    jQuery.each({
        parent: function( elem ) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function( elem ) {
            return jQuery.dir( elem, "parentNode" );
        },
        parentsUntil: function( elem, i, until ) {
            return jQuery.dir( elem, "parentNode", until );
        },
        next: function( elem ) {
            return sibling( elem, "nextSibling" );
        },
        prev: function( elem ) {
            return sibling( elem, "previousSibling" );
        },
        nextAll: function( elem ) {
            return jQuery.dir( elem, "nextSibling" );
        },
        prevAll: function( elem ) {
            return jQuery.dir( elem, "previousSibling" );
        },
        nextUntil: function( elem, i, until ) {
            return jQuery.dir( elem, "nextSibling", until );
        },
        prevUntil: function( elem, i, until ) {
            return jQuery.dir( elem, "previousSibling", until );
        },
        siblings: function( elem ) {
            return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
        },
        children: function( elem ) {
            return jQuery.sibling( elem.firstChild );
        },
        contents: function( elem ) {
            return jQuery.nodeName( elem, "iframe" ) ?
            elem.contentDocument || elem.contentWindow.document :
                jQuery.merge( [], elem.childNodes );
        }
    }, function( name, fn ) {
        jQuery.fn[ name ] = function( until, selector ) {
            var ret = jQuery.map( this, fn, until );

            if ( name.slice( -5 ) !== "Until" ) {
                selector = until;
            }

            if ( selector && typeof selector === "string" ) {
                ret = jQuery.filter( selector, ret );
            }

            if ( this.length > 1 ) {
                // Remove duplicates
                if ( !guaranteedUnique[ name ] ) {
                    ret = jQuery.unique( ret );
                }

                // Reverse order for parents* and prev-derivatives
                if ( rparentsprev.test( name ) ) {
                    ret = ret.reverse();
                }
            }

            return this.pushStack( ret );
        };
    });
    var rnotwhite = (/\S+/g);



// String to Object options format cache
    var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
    function createOptions( options ) {
        var object = optionsCache[ options ] = {};
        jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
            object[ flag ] = true;
        });
        return object;
    }

    /*
     * Create a callback list using the following parameters:
     *
     *	options: an optional list of space-separated options that will change how
     *			the callback list behaves or a more traditional option object
     *
     * By default a callback list will act like an event callback list and can be
     * "fired" multiple times.
     *
     * Possible options:
     *
     *	once:			will ensure the callback list can only be fired once (like a Deferred)
     *
     *	memory:			will keep track of previous values and will call any callback added
     *					after the list has been fired right away with the latest "memorized"
     *					values (like a Deferred)
     *
     *	unique:			will ensure a callback can only be added once (no duplicate in the list)
     *
     *	stopOnFalse:	interrupt callings when a callback returns false
     *
     */
    jQuery.Callbacks = function( options ) {

        // Convert options from String-formatted to Object-formatted if needed
        // (we check in cache first)
        options = typeof options === "string" ?
            ( optionsCache[ options ] || createOptions( options ) ) :
            jQuery.extend( {}, options );

        var // Flag to know if list is currently firing
            firing,
        // Last fire value (for non-forgettable lists)
            memory,
        // Flag to know if list was already fired
            fired,
        // End of the loop when firing
            firingLength,
        // Index of currently firing callback (modified by remove if needed)
            firingIndex,
        // First callback to fire (used internally by add and fireWith)
            firingStart,
        // Actual callback list
            list = [],
        // Stack of fire calls for repeatable lists
            stack = !options.once && [],
        // Fire callbacks
            fire = function( data ) {
                memory = options.memory && data;
                fired = true;
                firingIndex = firingStart || 0;
                firingStart = 0;
                firingLength = list.length;
                firing = true;
                for ( ; list && firingIndex < firingLength; firingIndex++ ) {
                    if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
                        memory = false; // To prevent further calls using add
                        break;
                    }
                }
                firing = false;
                if ( list ) {
                    if ( stack ) {
                        if ( stack.length ) {
                            fire( stack.shift() );
                        }
                    } else if ( memory ) {
                        list = [];
                    } else {
                        self.disable();
                    }
                }
            },
        // Actual Callbacks object
            self = {
                // Add a callback or a collection of callbacks to the list
                add: function() {
                    if ( list ) {
                        // First, we save the current length
                        var start = list.length;
                        (function add( args ) {
                            jQuery.each( args, function( _, arg ) {
                                var type = jQuery.type( arg );
                                if ( type === "function" ) {
                                    if ( !options.unique || !self.has( arg ) ) {
                                        list.push( arg );
                                    }
                                } else if ( arg && arg.length && type !== "string" ) {
                                    // Inspect recursively
                                    add( arg );
                                }
                            });
                        })( arguments );
                        // Do we need to add the callbacks to the
                        // current firing batch?
                        if ( firing ) {
                            firingLength = list.length;
                            // With memory, if we're not firing then
                            // we should call right away
                        } else if ( memory ) {
                            firingStart = start;
                            fire( memory );
                        }
                    }
                    return this;
                },
                // Remove a callback from the list
                remove: function() {
                    if ( list ) {
                        jQuery.each( arguments, function( _, arg ) {
                            var index;
                            while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
                                list.splice( index, 1 );
                                // Handle firing indexes
                                if ( firing ) {
                                    if ( index <= firingLength ) {
                                        firingLength--;
                                    }
                                    if ( index <= firingIndex ) {
                                        firingIndex--;
                                    }
                                }
                            }
                        });
                    }
                    return this;
                },
                // Check if a given callback is in the list.
                // If no argument is given, return whether or not list has callbacks attached.
                has: function( fn ) {
                    return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
                },
                // Remove all callbacks from the list
                empty: function() {
                    list = [];
                    firingLength = 0;
                    return this;
                },
                // Have the list do nothing anymore
                disable: function() {
                    list = stack = memory = undefined;
                    return this;
                },
                // Is it disabled?
                disabled: function() {
                    return !list;
                },
                // Lock the list in its current state
                lock: function() {
                    stack = undefined;
                    if ( !memory ) {
                        self.disable();
                    }
                    return this;
                },
                // Is it locked?
                locked: function() {
                    return !stack;
                },
                // Call all callbacks with the given context and arguments
                fireWith: function( context, args ) {
                    if ( list && ( !fired || stack ) ) {
                        args = args || [];
                        args = [ context, args.slice ? args.slice() : args ];
                        if ( firing ) {
                            stack.push( args );
                        } else {
                            fire( args );
                        }
                    }
                    return this;
                },
                // Call all the callbacks with the given arguments
                fire: function() {
                    self.fireWith( this, arguments );
                    return this;
                },
                // To know if the callbacks have already been called at least once
                fired: function() {
                    return !!fired;
                }
            };

        return self;
    };


    jQuery.extend({

        Deferred: function( func ) {
            var tuples = [
                    // action, add listener, listener list, final state
                    [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
                    [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
                    [ "notify", "progress", jQuery.Callbacks("memory") ]
                ],
                state = "pending",
                promise = {
                    state: function() {
                        return state;
                    },
                    always: function() {
                        deferred.done( arguments ).fail( arguments );
                        return this;
                    },
                    then: function( /* fnDone, fnFail, fnProgress */ ) {
                        var fns = arguments;
                        return jQuery.Deferred(function( newDefer ) {
                            jQuery.each( tuples, function( i, tuple ) {
                                var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
                                // deferred[ done | fail | progress ] for forwarding actions to newDefer
                                deferred[ tuple[1] ](function() {
                                    var returned = fn && fn.apply( this, arguments );
                                    if ( returned && jQuery.isFunction( returned.promise ) ) {
                                        returned.promise()
                                            .done( newDefer.resolve )
                                            .fail( newDefer.reject )
                                            .progress( newDefer.notify );
                                    } else {
                                        newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
                                    }
                                });
                            });
                            fns = null;
                        }).promise();
                    },
                    // Get a promise for this deferred
                    // If obj is provided, the promise aspect is added to the object
                    promise: function( obj ) {
                        return obj != null ? jQuery.extend( obj, promise ) : promise;
                    }
                },
                deferred = {};

            // Keep pipe for back-compat
            promise.pipe = promise.then;

            // Add list-specific methods
            jQuery.each( tuples, function( i, tuple ) {
                var list = tuple[ 2 ],
                    stateString = tuple[ 3 ];

                // promise[ done | fail | progress ] = list.add
                promise[ tuple[1] ] = list.add;

                // Handle state
                if ( stateString ) {
                    list.add(function() {
                        // state = [ resolved | rejected ]
                        state = stateString;

                        // [ reject_list | resolve_list ].disable; progress_list.lock
                    }, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
                }

                // deferred[ resolve | reject | notify ]
                deferred[ tuple[0] ] = function() {
                    deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
                    return this;
                };
                deferred[ tuple[0] + "With" ] = list.fireWith;
            });

            // Make the deferred a promise
            promise.promise( deferred );

            // Call given func if any
            if ( func ) {
                func.call( deferred, deferred );
            }

            // All done!
            return deferred;
        },

        // Deferred helper
        when: function( subordinate /* , ..., subordinateN */ ) {
            var i = 0,
                resolveValues = slice.call( arguments ),
                length = resolveValues.length,

            // the count of uncompleted subordinates
                remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

            // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
                deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

            // Update function for both resolve and progress values
                updateFunc = function( i, contexts, values ) {
                    return function( value ) {
                        contexts[ i ] = this;
                        values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
                        if ( values === progressValues ) {
                            deferred.notifyWith( contexts, values );

                        } else if ( !(--remaining) ) {
                            deferred.resolveWith( contexts, values );
                        }
                    };
                },

                progressValues, progressContexts, resolveContexts;

            // add listeners to Deferred subordinates; treat others as resolved
            if ( length > 1 ) {
                progressValues = new Array( length );
                progressContexts = new Array( length );
                resolveContexts = new Array( length );
                for ( ; i < length; i++ ) {
                    if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
                        resolveValues[ i ].promise()
                            .done( updateFunc( i, resolveContexts, resolveValues ) )
                            .fail( deferred.reject )
                            .progress( updateFunc( i, progressContexts, progressValues ) );
                    } else {
                        --remaining;
                    }
                }
            }

            // if we're not waiting on anything, resolve the master
            if ( !remaining ) {
                deferred.resolveWith( resolveContexts, resolveValues );
            }

            return deferred.promise();
        }
    });


// The deferred used on DOM ready
    var readyList;

    jQuery.fn.ready = function( fn ) {
        // Add the callback
        jQuery.ready.promise().done( fn );

        return this;
    };

    jQuery.extend({
        // Is the DOM ready to be used? Set to true once it occurs.
        isReady: false,

        // A counter to track how many items to wait for before
        // the ready event fires. See #6781
        readyWait: 1,

        // Hold (or release) the ready event
        holdReady: function( hold ) {
            if ( hold ) {
                jQuery.readyWait++;
            } else {
                jQuery.ready( true );
            }
        },

        // Handle when the DOM is ready
        ready: function( wait ) {

            // Abort if there are pending holds or we're already ready
            if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
                return;
            }

            // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
            if ( !document.body ) {
                return setTimeout( jQuery.ready );
            }

            // Remember that the DOM is ready
            jQuery.isReady = true;

            // If a normal DOM Ready event fired, decrement, and wait if need be
            if ( wait !== true && --jQuery.readyWait > 0 ) {
                return;
            }

            // If there are functions bound, to execute
            readyList.resolveWith( document, [ jQuery ] );

            // Trigger any bound ready events
            if ( jQuery.fn.triggerHandler ) {
                jQuery( document ).triggerHandler( "ready" );
                jQuery( document ).off( "ready" );
            }
        }
    });

    /**
     * Clean-up method for dom ready events
     */
    function detach() {
        if ( document.addEventListener ) {
            document.removeEventListener( "DOMContentLoaded", completed, false );
            window.removeEventListener( "load", completed, false );

        } else {
            document.detachEvent( "onreadystatechange", completed );
            window.detachEvent( "onload", completed );
        }
    }

    /**
     * The ready event handler and self cleanup method
     */
    function completed() {
        // readyState === "complete" is good enough for us to call the dom ready in oldIE
        if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
            detach();
            jQuery.ready();
        }
    }

    jQuery.ready.promise = function( obj ) {
        if ( !readyList ) {

            readyList = jQuery.Deferred();

            // Catch cases where $(document).ready() is called after the browser event has already occurred.
            // we once tried to use readyState "interactive" here, but it caused issues like the one
            // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
            if ( document.readyState === "complete" ) {
                // Handle it asynchronously to allow scripts the opportunity to delay ready
                setTimeout( jQuery.ready );

                // Standards-based browsers support DOMContentLoaded
            } else if ( document.addEventListener ) {
                // Use the handy event callback
                document.addEventListener( "DOMContentLoaded", completed, false );

                // A fallback to window.onload, that will always work
                window.addEventListener( "load", completed, false );

                // If IE event model is used
            } else {
                // Ensure firing before onload, maybe late but safe also for iframes
                document.attachEvent( "onreadystatechange", completed );

                // A fallback to window.onload, that will always work
                window.attachEvent( "onload", completed );

                // If IE and not a frame
                // continually check to see if the document is ready
                var top = false;

                try {
                    top = window.frameElement == null && document.documentElement;
                } catch(e) {}

                if ( top && top.doScroll ) {
                    (function doScrollCheck() {
                        if ( !jQuery.isReady ) {

                            try {
                                // Use the trick by Diego Perini
                                // http://javascript.nwbox.com/IEContentLoaded/
                                top.doScroll("left");
                            } catch(e) {
                                return setTimeout( doScrollCheck, 50 );
                            }

                            // detach all dom ready events
                            detach();

                            // and execute any waiting functions
                            jQuery.ready();
                        }
                    })();
                }
            }
        }
        return readyList.promise( obj );
    };


    var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
    var i;
    for ( i in jQuery( support ) ) {
        break;
    }
    support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
    support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
    jQuery(function() {
        // Minified: var a,b,c,d
        var val, div, body, container;

        body = document.getElementsByTagName( "body" )[ 0 ];
        if ( !body || !body.style ) {
            // Return for frameset docs that don't have a body
            return;
        }

        // Setup
        div = document.createElement( "div" );
        container = document.createElement( "div" );
        container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
        body.appendChild( container ).appendChild( div );

        if ( typeof div.style.zoom !== strundefined ) {
            // Support: IE<8
            // Check if natively block-level elements act like inline-block
            // elements when setting their display to 'inline' and giving
            // them layout
            div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

            support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
            if ( val ) {
                // Prevent IE 6 from affecting layout for positioned elements #11048
                // Prevent IE from shrinking the body in IE 7 mode #12869
                // Support: IE<8
                body.style.zoom = 1;
            }
        }

        body.removeChild( container );
    });




    (function() {
        var div = document.createElement( "div" );

        // Execute the test only if not already executed in another module.
        if (support.deleteExpando == null) {
            // Support: IE<9
            support.deleteExpando = true;
            try {
                delete div.test;
            } catch( e ) {
                support.deleteExpando = false;
            }
        }

        // Null elements to avoid leaks in IE.
        div = null;
    })();


    /**
     * Determines whether an object can have data
     */
    jQuery.acceptData = function( elem ) {
        var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
            nodeType = +elem.nodeType || 1;

        // Do not set data on non-element DOM nodes because it will not be cleared (#8335).
        return nodeType !== 1 && nodeType !== 9 ?
            false :

            // Nodes accept data unless otherwise specified; rejection can be conditional
        !noData || noData !== true && elem.getAttribute("classid") === noData;
    };


    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        rmultiDash = /([A-Z])/g;

    function dataAttr( elem, key, data ) {
        // If nothing was found internally, try to fetch any
        // data from the HTML5 data-* attribute
        if ( data === undefined && elem.nodeType === 1 ) {

            var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

            data = elem.getAttribute( name );

            if ( typeof data === "string" ) {
                try {
                    data = data === "true" ? true :
                        data === "false" ? false :
                            data === "null" ? null :
                                // Only convert to a number if it doesn't change the string
                                +data + "" === data ? +data :
                                    rbrace.test( data ) ? jQuery.parseJSON( data ) :
                                        data;
                } catch( e ) {}

                // Make sure we set the data so it isn't changed later
                jQuery.data( elem, key, data );

            } else {
                data = undefined;
            }
        }

        return data;
    }

// checks a cache object for emptiness
    function isEmptyDataObject( obj ) {
        var name;
        for ( name in obj ) {

            // if the public data object is empty, the private is still empty
            if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
                continue;
            }
            if ( name !== "toJSON" ) {
                return false;
            }
        }

        return true;
    }

    function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
        if ( !jQuery.acceptData( elem ) ) {
            return;
        }

        var ret, thisCache,
            internalKey = jQuery.expando,

        // We have to handle DOM nodes and JS objects differently because IE6-7
        // can't GC object references properly across the DOM-JS boundary
            isNode = elem.nodeType,

        // Only DOM nodes need the global jQuery cache; JS object data is
        // attached directly to the object so GC can occur automatically
            cache = isNode ? jQuery.cache : elem,

        // Only defining an ID for JS objects if its cache already exists allows
        // the code to shortcut on the same path as a DOM node with no cache
            id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

        // Avoid doing any more work than we need to when trying to get data on an
        // object that has no data at all
        if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
            return;
        }

        if ( !id ) {
            // Only DOM nodes need a new unique ID for each element since their data
            // ends up in the global cache
            if ( isNode ) {
                id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
            } else {
                id = internalKey;
            }
        }

        if ( !cache[ id ] ) {
            // Avoid exposing jQuery metadata on plain JS objects when the object
            // is serialized using JSON.stringify
            cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
        }

        // An object can be passed to jQuery.data instead of a key/value pair; this gets
        // shallow copied over onto the existing cache
        if ( typeof name === "object" || typeof name === "function" ) {
            if ( pvt ) {
                cache[ id ] = jQuery.extend( cache[ id ], name );
            } else {
                cache[ id ].data = jQuery.extend( cache[ id ].data, name );
            }
        }

        thisCache = cache[ id ];

        // jQuery data() is stored in a separate object inside the object's internal data
        // cache in order to avoid key collisions between internal data and user-defined
        // data.
        if ( !pvt ) {
            if ( !thisCache.data ) {
                thisCache.data = {};
            }

            thisCache = thisCache.data;
        }

        if ( data !== undefined ) {
            thisCache[ jQuery.camelCase( name ) ] = data;
        }

        // Check for both converted-to-camel and non-converted data property names
        // If a data property was specified
        if ( typeof name === "string" ) {

            // First Try to find as-is property data
            ret = thisCache[ name ];

            // Test for null|undefined property data
            if ( ret == null ) {

                // Try to find the camelCased property
                ret = thisCache[ jQuery.camelCase( name ) ];
            }
        } else {
            ret = thisCache;
        }

        return ret;
    }

    function internalRemoveData( elem, name, pvt ) {
        if ( !jQuery.acceptData( elem ) ) {
            return;
        }

        var thisCache, i,
            isNode = elem.nodeType,

        // See jQuery.data for more information
            cache = isNode ? jQuery.cache : elem,
            id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

        // If there is already no cache entry for this object, there is no
        // purpose in continuing
        if ( !cache[ id ] ) {
            return;
        }

        if ( name ) {

            thisCache = pvt ? cache[ id ] : cache[ id ].data;

            if ( thisCache ) {

                // Support array or space separated string names for data keys
                if ( !jQuery.isArray( name ) ) {

                    // try the string as a key before any manipulation
                    if ( name in thisCache ) {
                        name = [ name ];
                    } else {

                        // split the camel cased version by spaces unless a key with the spaces exists
                        name = jQuery.camelCase( name );
                        if ( name in thisCache ) {
                            name = [ name ];
                        } else {
                            name = name.split(" ");
                        }
                    }
                } else {
                    // If "name" is an array of keys...
                    // When data is initially created, via ("key", "val") signature,
                    // keys will be converted to camelCase.
                    // Since there is no way to tell _how_ a key was added, remove
                    // both plain key and camelCase key. #12786
                    // This will only penalize the array argument path.
                    name = name.concat( jQuery.map( name, jQuery.camelCase ) );
                }

                i = name.length;
                while ( i-- ) {
                    delete thisCache[ name[i] ];
                }

                // If there is no data left in the cache, we want to continue
                // and let the cache object itself get destroyed
                if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
                    return;
                }
            }
        }

        // See jQuery.data for more information
        if ( !pvt ) {
            delete cache[ id ].data;

            // Don't destroy the parent cache unless the internal data object
            // had been the only thing left in it
            if ( !isEmptyDataObject( cache[ id ] ) ) {
                return;
            }
        }

        // Destroy the cache
        if ( isNode ) {
            jQuery.cleanData( [ elem ], true );

            // Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
            /* jshint eqeqeq: false */
        } else if ( support.deleteExpando || cache != cache.window ) {
            /* jshint eqeqeq: true */
            delete cache[ id ];

            // When all else fails, null
        } else {
            cache[ id ] = null;
        }
    }

    jQuery.extend({
        cache: {},

        // The following elements (space-suffixed to avoid Object.prototype collisions)
        // throw uncatchable exceptions if you attempt to set expando properties
        noData: {
            "applet ": true,
            "embed ": true,
            // ...but Flash objects (which have this classid) *can* handle expandos
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },

        hasData: function( elem ) {
            elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
            return !!elem && !isEmptyDataObject( elem );
        },

        data: function( elem, name, data ) {
            return internalData( elem, name, data );
        },

        removeData: function( elem, name ) {
            return internalRemoveData( elem, name );
        },

        // For internal use only.
        _data: function( elem, name, data ) {
            return internalData( elem, name, data, true );
        },

        _removeData: function( elem, name ) {
            return internalRemoveData( elem, name, true );
        }
    });

    jQuery.fn.extend({
        data: function( key, value ) {
            var i, name, data,
                elem = this[0],
                attrs = elem && elem.attributes;

            // Special expections of .data basically thwart jQuery.access,
            // so implement the relevant behavior ourselves

            // Gets all values
            if ( key === undefined ) {
                if ( this.length ) {
                    data = jQuery.data( elem );

                    if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
                        i = attrs.length;
                        while ( i-- ) {

                            // Support: IE11+
                            // The attrs elements can be null (#14894)
                            if ( attrs[ i ] ) {
                                name = attrs[ i ].name;
                                if ( name.indexOf( "data-" ) === 0 ) {
                                    name = jQuery.camelCase( name.slice(5) );
                                    dataAttr( elem, name, data[ name ] );
                                }
                            }
                        }
                        jQuery._data( elem, "parsedAttrs", true );
                    }
                }

                return data;
            }

            // Sets multiple values
            if ( typeof key === "object" ) {
                return this.each(function() {
                    jQuery.data( this, key );
                });
            }

            return arguments.length > 1 ?

                // Sets one value
                this.each(function() {
                    jQuery.data( this, key, value );
                }) :

                // Gets one value
                // Try to fetch any internally stored data first
                elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
        },

        removeData: function( key ) {
            return this.each(function() {
                jQuery.removeData( this, key );
            });
        }
    });


    jQuery.extend({
        queue: function( elem, type, data ) {
            var queue;

            if ( elem ) {
                type = ( type || "fx" ) + "queue";
                queue = jQuery._data( elem, type );

                // Speed up dequeue by getting out quickly if this is just a lookup
                if ( data ) {
                    if ( !queue || jQuery.isArray(data) ) {
                        queue = jQuery._data( elem, type, jQuery.makeArray(data) );
                    } else {
                        queue.push( data );
                    }
                }
                return queue || [];
            }
        },

        dequeue: function( elem, type ) {
            type = type || "fx";

            var queue = jQuery.queue( elem, type ),
                startLength = queue.length,
                fn = queue.shift(),
                hooks = jQuery._queueHooks( elem, type ),
                next = function() {
                    jQuery.dequeue( elem, type );
                };

            // If the fx queue is dequeued, always remove the progress sentinel
            if ( fn === "inprogress" ) {
                fn = queue.shift();
                startLength--;
            }

            if ( fn ) {

                // Add a progress sentinel to prevent the fx queue from being
                // automatically dequeued
                if ( type === "fx" ) {
                    queue.unshift( "inprogress" );
                }

                // clear up the last queue stop function
                delete hooks.stop;
                fn.call( elem, next, hooks );
            }

            if ( !startLength && hooks ) {
                hooks.empty.fire();
            }
        },

        // not intended for public consumption - generates a queueHooks object, or returns the current one
        _queueHooks: function( elem, type ) {
            var key = type + "queueHooks";
            return jQuery._data( elem, key ) || jQuery._data( elem, key, {
                    empty: jQuery.Callbacks("once memory").add(function() {
                        jQuery._removeData( elem, type + "queue" );
                        jQuery._removeData( elem, key );
                    })
                });
        }
    });

    jQuery.fn.extend({
        queue: function( type, data ) {
            var setter = 2;

            if ( typeof type !== "string" ) {
                data = type;
                type = "fx";
                setter--;
            }

            if ( arguments.length < setter ) {
                return jQuery.queue( this[0], type );
            }

            return data === undefined ?
                this :
                this.each(function() {
                    var queue = jQuery.queue( this, type, data );

                    // ensure a hooks for this queue
                    jQuery._queueHooks( this, type );

                    if ( type === "fx" && queue[0] !== "inprogress" ) {
                        jQuery.dequeue( this, type );
                    }
                });
        },
        dequeue: function( type ) {
            return this.each(function() {
                jQuery.dequeue( this, type );
            });
        },
        clearQueue: function( type ) {
            return this.queue( type || "fx", [] );
        },
        // Get a promise resolved when queues of a certain type
        // are emptied (fx is the type by default)
        promise: function( type, obj ) {
            var tmp,
                count = 1,
                defer = jQuery.Deferred(),
                elements = this,
                i = this.length,
                resolve = function() {
                    if ( !( --count ) ) {
                        defer.resolveWith( elements, [ elements ] );
                    }
                };

            if ( typeof type !== "string" ) {
                obj = type;
                type = undefined;
            }
            type = type || "fx";

            while ( i-- ) {
                tmp = jQuery._data( elements[ i ], type + "queueHooks" );
                if ( tmp && tmp.empty ) {
                    count++;
                    tmp.empty.add( resolve );
                }
            }
            resolve();
            return defer.promise( obj );
        }
    });
    var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

    var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

    var isHidden = function( elem, el ) {
        // isHidden might be called from jQuery#filter function;
        // in that case, element will be second argument
        elem = el || elem;
        return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
    };



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
    var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
        var i = 0,
            length = elems.length,
            bulk = key == null;

        // Sets many values
        if ( jQuery.type( key ) === "object" ) {
            chainable = true;
            for ( i in key ) {
                jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
            }

            // Sets one value
        } else if ( value !== undefined ) {
            chainable = true;

            if ( !jQuery.isFunction( value ) ) {
                raw = true;
            }

            if ( bulk ) {
                // Bulk operations run against the entire set
                if ( raw ) {
                    fn.call( elems, value );
                    fn = null;

                    // ...except when executing function values
                } else {
                    bulk = fn;
                    fn = function( elem, key, value ) {
                        return bulk.call( jQuery( elem ), value );
                    };
                }
            }

            if ( fn ) {
                for ( ; i < length; i++ ) {
                    fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
                }
            }
        }

        return chainable ?
            elems :

            // Gets
            bulk ?
                fn.call( elems ) :
                length ? fn( elems[0], key ) : emptyGet;
    };
    var rcheckableType = (/^(?:checkbox|radio)$/i);



    (function() {
        // Minified: var a,b,c
        var input = document.createElement( "input" ),
            div = document.createElement( "div" ),
            fragment = document.createDocumentFragment();

        // Setup
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

        // IE strips leading whitespace when .innerHTML is used
        support.leadingWhitespace = div.firstChild.nodeType === 3;

        // Make sure that tbody elements aren't automatically inserted
        // IE will insert them into empty tables
        support.tbody = !div.getElementsByTagName( "tbody" ).length;

        // Make sure that link elements get serialized correctly by innerHTML
        // This requires a wrapper element in IE
        support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

        // Makes sure cloning an html5 element does not cause problems
        // Where outerHTML is undefined, this still works
        support.html5Clone =
            document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

        // Check if a disconnected checkbox will retain its checked
        // value of true after appended to the DOM (IE6/7)
        input.type = "checkbox";
        input.checked = true;
        fragment.appendChild( input );
        support.appendChecked = input.checked;

        // Make sure textarea (and checkbox) defaultValue is properly cloned
        // Support: IE6-IE11+
        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

        // #11217 - WebKit loses check when the name is after the checked attribute
        fragment.appendChild( div );
        div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

        // Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
        // old WebKit doesn't clone checked state correctly in fragments
        support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

        // Support: IE<9
        // Opera does not clone events (and typeof div.attachEvent === undefined).
        // IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
        support.noCloneEvent = true;
        if ( div.attachEvent ) {
            div.attachEvent( "onclick", function() {
                support.noCloneEvent = false;
            });

            div.cloneNode( true ).click();
        }

        // Execute the test only if not already executed in another module.
        if (support.deleteExpando == null) {
            // Support: IE<9
            support.deleteExpando = true;
            try {
                delete div.test;
            } catch( e ) {
                support.deleteExpando = false;
            }
        }
    })();


    (function() {
        var i, eventName,
            div = document.createElement( "div" );

        // Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
        for ( i in { submit: true, change: true, focusin: true }) {
            eventName = "on" + i;

            if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
                // Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
                div.setAttribute( eventName, "t" );
                support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
            }
        }

        // Null elements to avoid leaks in IE.
        div = null;
    })();


    var rformElems = /^(?:input|select|textarea)$/i,
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

    function returnTrue() {
        return true;
    }

    function returnFalse() {
        return false;
    }

    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch ( err ) { }
    }

    /*
     * Helper functions for managing events -- not part of the public interface.
     * Props to Dean Edwards' addEvent library for many of the ideas.
     */
    jQuery.event = {

        global: {},

        add: function( elem, types, handler, data, selector ) {
            var tmp, events, t, handleObjIn,
                special, eventHandle, handleObj,
                handlers, type, namespaces, origType,
                elemData = jQuery._data( elem );

            // Don't attach events to noData or text/comment nodes (but allow plain objects)
            if ( !elemData ) {
                return;
            }

            // Caller can pass in an object of custom data in lieu of the handler
            if ( handler.handler ) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }

            // Make sure that the handler has a unique ID, used to find/remove it later
            if ( !handler.guid ) {
                handler.guid = jQuery.guid++;
            }

            // Init the element's event structure and main handler, if this is the first
            if ( !(events = elemData.events) ) {
                events = elemData.events = {};
            }
            if ( !(eventHandle = elemData.handle) ) {
                eventHandle = elemData.handle = function( e ) {
                    // Discard the second event of a jQuery.event.trigger() and
                    // when an event is called after a page has unloaded
                    return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
                        jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
                        undefined;
                };
                // Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
                eventHandle.elem = elem;
            }

            // Handle multiple events separated by a space
            types = ( types || "" ).match( rnotwhite ) || [ "" ];
            t = types.length;
            while ( t-- ) {
                tmp = rtypenamespace.exec( types[t] ) || [];
                type = origType = tmp[1];
                namespaces = ( tmp[2] || "" ).split( "." ).sort();

                // There *must* be a type, no attaching namespace-only handlers
                if ( !type ) {
                    continue;
                }

                // If event changes its type, use the special event handlers for the changed type
                special = jQuery.event.special[ type ] || {};

                // If selector defined, determine special event api type, otherwise given type
                type = ( selector ? special.delegateType : special.bindType ) || type;

                // Update special based on newly reset type
                special = jQuery.event.special[ type ] || {};

                // handleObj is passed to all event handlers
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
                    namespace: namespaces.join(".")
                }, handleObjIn );

                // Init the event handler queue if we're the first
                if ( !(handlers = events[ type ]) ) {
                    handlers = events[ type ] = [];
                    handlers.delegateCount = 0;

                    // Only use addEventListener/attachEvent if the special events handler returns false
                    if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
                        // Bind the global event handler to the element
                        if ( elem.addEventListener ) {
                            elem.addEventListener( type, eventHandle, false );

                        } else if ( elem.attachEvent ) {
                            elem.attachEvent( "on" + type, eventHandle );
                        }
                    }
                }

                if ( special.add ) {
                    special.add.call( elem, handleObj );

                    if ( !handleObj.handler.guid ) {
                        handleObj.handler.guid = handler.guid;
                    }
                }

                // Add to the element's handler list, delegates in front
                if ( selector ) {
                    handlers.splice( handlers.delegateCount++, 0, handleObj );
                } else {
                    handlers.push( handleObj );
                }

                // Keep track of which events have ever been used, for event optimization
                jQuery.event.global[ type ] = true;
            }

            // Nullify elem to prevent memory leaks in IE
            elem = null;
        },

        // Detach an event or set of events from an element
        remove: function( elem, types, handler, selector, mappedTypes ) {
            var j, handleObj, tmp,
                origCount, t, events,
                special, handlers, type,
                namespaces, origType,
                elemData = jQuery.hasData( elem ) && jQuery._data( elem );

            if ( !elemData || !(events = elemData.events) ) {
                return;
            }

            // Once for each type.namespace in types; type may be omitted
            types = ( types || "" ).match( rnotwhite ) || [ "" ];
            t = types.length;
            while ( t-- ) {
                tmp = rtypenamespace.exec( types[t] ) || [];
                type = origType = tmp[1];
                namespaces = ( tmp[2] || "" ).split( "." ).sort();

                // Unbind all events (on this namespace, if provided) for the element
                if ( !type ) {
                    for ( type in events ) {
                        jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
                    }
                    continue;
                }

                special = jQuery.event.special[ type ] || {};
                type = ( selector ? special.delegateType : special.bindType ) || type;
                handlers = events[ type ] || [];
                tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

                // Remove matching events
                origCount = j = handlers.length;
                while ( j-- ) {
                    handleObj = handlers[ j ];

                    if ( ( mappedTypes || origType === handleObj.origType ) &&
                        ( !handler || handler.guid === handleObj.guid ) &&
                        ( !tmp || tmp.test( handleObj.namespace ) ) &&
                        ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
                        handlers.splice( j, 1 );

                        if ( handleObj.selector ) {
                            handlers.delegateCount--;
                        }
                        if ( special.remove ) {
                            special.remove.call( elem, handleObj );
                        }
                    }
                }

                // Remove generic event handler if we removed something and no more handlers exist
                // (avoids potential for endless recursion during removal of special event handlers)
                if ( origCount && !handlers.length ) {
                    if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
                        jQuery.removeEvent( elem, type, elemData.handle );
                    }

                    delete events[ type ];
                }
            }

            // Remove the expando if it's no longer used
            if ( jQuery.isEmptyObject( events ) ) {
                delete elemData.handle;

                // removeData also checks for emptiness and clears the expando if empty
                // so use it instead of delete
                jQuery._removeData( elem, "events" );
            }
        },

        trigger: function( event, data, elem, onlyHandlers ) {
            var handle, ontype, cur,
                bubbleType, special, tmp, i,
                eventPath = [ elem || document ],
                type = hasOwn.call( event, "type" ) ? event.type : event,
                namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

            cur = tmp = elem = elem || document;

            // Don't do events on text and comment nodes
            if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
                return;
            }

            // focus/blur morphs to focusin/out; ensure we're not firing them right now
            if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
                return;
            }

            if ( type.indexOf(".") >= 0 ) {
                // Namespaced trigger; create a regexp to match event type in handle()
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;

            // Caller can pass in a jQuery.Event object, Object, or just an event type string
            event = event[ jQuery.expando ] ?
                event :
                new jQuery.Event( type, typeof event === "object" && event );

            // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.namespace_re = event.namespace ?
                new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
                null;

            // Clean up the event in case it is being reused
            event.result = undefined;
            if ( !event.target ) {
                event.target = elem;
            }

            // Clone any incoming data and prepend the event, creating the handler arg list
            data = data == null ?
                [ event ] :
                jQuery.makeArray( data, [ event ] );

            // Allow special events to draw outside the lines
            special = jQuery.event.special[ type ] || {};
            if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
                return;
            }

            // Determine event propagation path in advance, per W3C events spec (#9951)
            // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
            if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

                bubbleType = special.delegateType || type;
                if ( !rfocusMorph.test( bubbleType + type ) ) {
                    cur = cur.parentNode;
                }
                for ( ; cur; cur = cur.parentNode ) {
                    eventPath.push( cur );
                    tmp = cur;
                }

                // Only add window if we got to document (e.g., not plain obj or detached DOM)
                if ( tmp === (elem.ownerDocument || document) ) {
                    eventPath.push( tmp.defaultView || tmp.parentWindow || window );
                }
            }

            // Fire handlers on the event path
            i = 0;
            while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

                event.type = i > 1 ?
                    bubbleType :
                special.bindType || type;

                // jQuery handler
                handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
                if ( handle ) {
                    handle.apply( cur, data );
                }

                // Native handler
                handle = ontype && cur[ ontype ];
                if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
                    event.result = handle.apply( cur, data );
                    if ( event.result === false ) {
                        event.preventDefault();
                    }
                }
            }
            event.type = type;

            // If nobody prevented the default action, do it now
            if ( !onlyHandlers && !event.isDefaultPrevented() ) {

                if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
                    jQuery.acceptData( elem ) ) {

                    // Call a native DOM method on the target with the same name name as the event.
                    // Can't use an .isFunction() check here because IE6/7 fails that test.
                    // Don't do default actions on window, that's where global variables be (#6170)
                    if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

                        // Don't re-trigger an onFOO event when we call its FOO() method
                        tmp = elem[ ontype ];

                        if ( tmp ) {
                            elem[ ontype ] = null;
                        }

                        // Prevent re-triggering of the same event, since we already bubbled it above
                        jQuery.event.triggered = type;
                        try {
                            elem[ type ]();
                        } catch ( e ) {
                            // IE<9 dies on focus/blur to hidden element (#1486,#12518)
                            // only reproducible on winXP IE8 native, not IE9 in IE8 mode
                        }
                        jQuery.event.triggered = undefined;

                        if ( tmp ) {
                            elem[ ontype ] = tmp;
                        }
                    }
                }
            }

            return event.result;
        },

        dispatch: function( event ) {

            // Make a writable jQuery.Event from the native event object
            event = jQuery.event.fix( event );

            var i, ret, handleObj, matched, j,
                handlerQueue = [],
                args = slice.call( arguments ),
                handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
                special = jQuery.event.special[ event.type ] || {};

            // Use the fix-ed jQuery.Event rather than the (read-only) native event
            args[0] = event;
            event.delegateTarget = this;

            // Call the preDispatch hook for the mapped type, and let it bail if desired
            if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
                return;
            }

            // Determine handlers
            handlerQueue = jQuery.event.handlers.call( this, event, handlers );

            // Run delegates first; they may want to stop propagation beneath us
            i = 0;
            while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
                event.currentTarget = matched.elem;

                j = 0;
                while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

                    // Triggered event must either 1) have no namespace, or
                    // 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
                    if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

                        event.handleObj = handleObj;
                        event.data = handleObj.data;

                        ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
                            .apply( matched.elem, args );

                        if ( ret !== undefined ) {
                            if ( (event.result = ret) === false ) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }

            // Call the postDispatch hook for the mapped type
            if ( special.postDispatch ) {
                special.postDispatch.call( this, event );
            }

            return event.result;
        },

        handlers: function( event, handlers ) {
            var sel, handleObj, matches, i,
                handlerQueue = [],
                delegateCount = handlers.delegateCount,
                cur = event.target;

            // Find delegate handlers
            // Black-hole SVG <use> instance trees (#13180)
            // Avoid non-left-click bubbling in Firefox (#3861)
            if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

                /* jshint eqeqeq: false */
                for ( ; cur != this; cur = cur.parentNode || this ) {
                    /* jshint eqeqeq: true */

                    // Don't check non-elements (#13208)
                    // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
                    if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
                        matches = [];
                        for ( i = 0; i < delegateCount; i++ ) {
                            handleObj = handlers[ i ];

                            // Don't conflict with Object.prototype properties (#13203)
                            sel = handleObj.selector + " ";

                            if ( matches[ sel ] === undefined ) {
                                matches[ sel ] = handleObj.needsContext ?
                                jQuery( sel, this ).index( cur ) >= 0 :
                                    jQuery.find( sel, this, null, [ cur ] ).length;
                            }
                            if ( matches[ sel ] ) {
                                matches.push( handleObj );
                            }
                        }
                        if ( matches.length ) {
                            handlerQueue.push({ elem: cur, handlers: matches });
                        }
                    }
                }
            }

            // Add the remaining (directly-bound) handlers
            if ( delegateCount < handlers.length ) {
                handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
            }

            return handlerQueue;
        },

        fix: function( event ) {
            if ( event[ jQuery.expando ] ) {
                return event;
            }

            // Create a writable copy of the event object and normalize some properties
            var i, prop, copy,
                type = event.type,
                originalEvent = event,
                fixHook = this.fixHooks[ type ];

            if ( !fixHook ) {
                this.fixHooks[ type ] = fixHook =
                    rmouseEvent.test( type ) ? this.mouseHooks :
                        rkeyEvent.test( type ) ? this.keyHooks :
                        {};
            }
            copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

            event = new jQuery.Event( originalEvent );

            i = copy.length;
            while ( i-- ) {
                prop = copy[ i ];
                event[ prop ] = originalEvent[ prop ];
            }

            // Support: IE<9
            // Fix target property (#1925)
            if ( !event.target ) {
                event.target = originalEvent.srcElement || document;
            }

            // Support: Chrome 23+, Safari?
            // Target should not be a text node (#504, #13143)
            if ( event.target.nodeType === 3 ) {
                event.target = event.target.parentNode;
            }

            // Support: IE<9
            // For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
            event.metaKey = !!event.metaKey;

            return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
        },

        // Includes some event props shared by KeyEvent and MouseEvent
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

        fixHooks: {},

        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function( event, original ) {

                // Add which for key events
                if ( event.which == null ) {
                    event.which = original.charCode != null ? original.charCode : original.keyCode;
                }

                return event;
            }
        },

        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function( event, original ) {
                var body, eventDoc, doc,
                    button = original.button,
                    fromElement = original.fromElement;

                // Calculate pageX/Y if missing and clientX/Y available
                if ( event.pageX == null && original.clientX != null ) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;

                    event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
                    event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
                }

                // Add relatedTarget, if necessary
                if ( !event.relatedTarget && fromElement ) {
                    event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
                }

                // Add which for click: 1 === left; 2 === middle; 3 === right
                // Note: button is not normalized, so don't use it
                if ( !event.which && button !== undefined ) {
                    event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
                }

                return event;
            }
        },

        special: {
            load: {
                // Prevent triggered image.load events from bubbling to window.load
                noBubble: true
            },
            focus: {
                // Fire native event if possible so blur/focus sequence is correct
                trigger: function() {
                    if ( this !== safeActiveElement() && this.focus ) {
                        try {
                            this.focus();
                            return false;
                        } catch ( e ) {
                            // Support: IE<9
                            // If we error on focus to hidden element (#1486, #12518),
                            // let .trigger() run the handlers
                        }
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if ( this === safeActiveElement() && this.blur ) {
                        this.blur();
                        return false;
                    }
                },
                delegateType: "focusout"
            },
            click: {
                // For checkbox, fire native event so checked state will be right
                trigger: function() {
                    if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
                        this.click();
                        return false;
                    }
                },

                // For cross-browser consistency, don't fire native .click() on links
                _default: function( event ) {
                    return jQuery.nodeName( event.target, "a" );
                }
            },

            beforeunload: {
                postDispatch: function( event ) {

                    // Support: Firefox 20+
                    // Firefox doesn't alert if the returnValue field is not set.
                    if ( event.result !== undefined && event.originalEvent ) {
                        event.originalEvent.returnValue = event.result;
                    }
                }
            }
        },

        simulate: function( type, elem, event, bubble ) {
            // Piggyback on a donor event to simulate a different one.
            // Fake originalEvent to avoid donor's stopPropagation, but if the
            // simulated event prevents default then we do the same on the donor.
            var e = jQuery.extend(
                new jQuery.Event(),
                event,
                {
                    type: type,
                    isSimulated: true,
                    originalEvent: {}
                }
            );
            if ( bubble ) {
                jQuery.event.trigger( e, null, elem );
            } else {
                jQuery.event.dispatch.call( elem, e );
            }
            if ( e.isDefaultPrevented() ) {
                event.preventDefault();
            }
        }
    };

    jQuery.removeEvent = document.removeEventListener ?
        function( elem, type, handle ) {
            if ( elem.removeEventListener ) {
                elem.removeEventListener( type, handle, false );
            }
        } :
        function( elem, type, handle ) {
            var name = "on" + type;

            if ( elem.detachEvent ) {

                // #8545, #7054, preventing memory leaks for custom events in IE6-8
                // detachEvent needed property on element, by name of that event, to properly expose it to GC
                if ( typeof elem[ name ] === strundefined ) {
                    elem[ name ] = null;
                }

                elem.detachEvent( name, handle );
            }
        };

    jQuery.Event = function( src, props ) {
        // Allow instantiation without the 'new' keyword
        if ( !(this instanceof jQuery.Event) ) {
            return new jQuery.Event( src, props );
        }

        // Event object
        if ( src && src.type ) {
            this.originalEvent = src;
            this.type = src.type;

            // Events bubbling up the document may have been marked as prevented
            // by a handler lower down the tree; reflect the correct value.
            this.isDefaultPrevented = src.defaultPrevented ||
            src.defaultPrevented === undefined &&
                // Support: IE < 9, Android < 4.0
            src.returnValue === false ?
                returnTrue :
                returnFalse;

            // Event type
        } else {
            this.type = src;
        }

        // Put explicitly provided properties onto the event object
        if ( props ) {
            jQuery.extend( this, props );
        }

        // Create a timestamp if incoming event doesn't have one
        this.timeStamp = src && src.timeStamp || jQuery.now();

        // Mark it as fixed
        this[ jQuery.expando ] = true;
    };

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,

        preventDefault: function() {
            var e = this.originalEvent;

            this.isDefaultPrevented = returnTrue;
            if ( !e ) {
                return;
            }

            // If preventDefault exists, run it on the original event
            if ( e.preventDefault ) {
                e.preventDefault();

                // Support: IE
                // Otherwise set the returnValue property of the original event to false
            } else {
                e.returnValue = false;
            }
        },
        stopPropagation: function() {
            var e = this.originalEvent;

            this.isPropagationStopped = returnTrue;
            if ( !e ) {
                return;
            }
            // If stopPropagation exists, run it on the original event
            if ( e.stopPropagation ) {
                e.stopPropagation();
            }

            // Support: IE
            // Set the cancelBubble property of the original event to true
            e.cancelBubble = true;
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;

            this.isImmediatePropagationStopped = returnTrue;

            if ( e && e.stopImmediatePropagation ) {
                e.stopImmediatePropagation();
            }

            this.stopPropagation();
        }
    };

// Create mouseenter/leave events using mouseover/out and event-time checks
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function( orig, fix ) {
        jQuery.event.special[ orig ] = {
            delegateType: fix,
            bindType: fix,

            handle: function( event ) {
                var ret,
                    target = this,
                    related = event.relatedTarget,
                    handleObj = event.handleObj;

                // For mousenter/leave call the handler if related is outside the target.
                // NB: No relatedTarget if the mouse left/entered the browser window
                if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply( this, arguments );
                    event.type = fix;
                }
                return ret;
            }
        };
    });

// IE submit delegation
    if ( !support.submitBubbles ) {

        jQuery.event.special.submit = {
            setup: function() {
                // Only need this for delegated form submit events
                if ( jQuery.nodeName( this, "form" ) ) {
                    return false;
                }

                // Lazy-add a submit handler when a descendant form may potentially be submitted
                jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
                    // Node name check avoids a VML-related crash in IE (#9807)
                    var elem = e.target,
                        form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
                    if ( form && !jQuery._data( form, "submitBubbles" ) ) {
                        jQuery.event.add( form, "submit._submit", function( event ) {
                            event._submit_bubble = true;
                        });
                        jQuery._data( form, "submitBubbles", true );
                    }
                });
                // return undefined since we don't need an event listener
            },

            postDispatch: function( event ) {
                // If form was submitted by the user, bubble the event up the tree
                if ( event._submit_bubble ) {
                    delete event._submit_bubble;
                    if ( this.parentNode && !event.isTrigger ) {
                        jQuery.event.simulate( "submit", this.parentNode, event, true );
                    }
                }
            },

            teardown: function() {
                // Only need this for delegated form submit events
                if ( jQuery.nodeName( this, "form" ) ) {
                    return false;
                }

                // Remove delegated handlers; cleanData eventually reaps submit handlers attached above
                jQuery.event.remove( this, "._submit" );
            }
        };
    }

// IE change delegation and checkbox/radio fix
    if ( !support.changeBubbles ) {

        jQuery.event.special.change = {

            setup: function() {

                if ( rformElems.test( this.nodeName ) ) {
                    // IE doesn't fire change on a check/radio until blur; trigger it on click
                    // after a propertychange. Eat the blur-change in special.change.handle.
                    // This still fires onchange a second time for check/radio after blur.
                    if ( this.type === "checkbox" || this.type === "radio" ) {
                        jQuery.event.add( this, "propertychange._change", function( event ) {
                            if ( event.originalEvent.propertyName === "checked" ) {
                                this._just_changed = true;
                            }
                        });
                        jQuery.event.add( this, "click._change", function( event ) {
                            if ( this._just_changed && !event.isTrigger ) {
                                this._just_changed = false;
                            }
                            // Allow triggered, simulated change events (#11500)
                            jQuery.event.simulate( "change", this, event, true );
                        });
                    }
                    return false;
                }
                // Delegated event; lazy-add a change handler on descendant inputs
                jQuery.event.add( this, "beforeactivate._change", function( e ) {
                    var elem = e.target;

                    if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
                        jQuery.event.add( elem, "change._change", function( event ) {
                            if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
                                jQuery.event.simulate( "change", this.parentNode, event, true );
                            }
                        });
                        jQuery._data( elem, "changeBubbles", true );
                    }
                });
            },

            handle: function( event ) {
                var elem = event.target;

                // Swallow native change events from checkbox/radio, we already triggered them above
                if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
                    return event.handleObj.handler.apply( this, arguments );
                }
            },

            teardown: function() {
                jQuery.event.remove( this, "._change" );

                return !rformElems.test( this.nodeName );
            }
        };
    }

// Create "bubbling" focus and blur events
    if ( !support.focusinBubbles ) {
        jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

            // Attach a single capturing handler on the document while someone wants focusin/focusout
            var handler = function( event ) {
                jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
            };

            jQuery.event.special[ fix ] = {
                setup: function() {
                    var doc = this.ownerDocument || this,
                        attaches = jQuery._data( doc, fix );

                    if ( !attaches ) {
                        doc.addEventListener( orig, handler, true );
                    }
                    jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
                },
                teardown: function() {
                    var doc = this.ownerDocument || this,
                        attaches = jQuery._data( doc, fix ) - 1;

                    if ( !attaches ) {
                        doc.removeEventListener( orig, handler, true );
                        jQuery._removeData( doc, fix );
                    } else {
                        jQuery._data( doc, fix, attaches );
                    }
                }
            };
        });
    }

    jQuery.fn.extend({

        on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
            var type, origFn;

            // Types can be a map of types/handlers
            if ( typeof types === "object" ) {
                // ( types-Object, selector, data )
                if ( typeof selector !== "string" ) {
                    // ( types-Object, data )
                    data = data || selector;
                    selector = undefined;
                }
                for ( type in types ) {
                    this.on( type, selector, data, types[ type ], one );
                }
                return this;
            }

            if ( data == null && fn == null ) {
                // ( types, fn )
                fn = selector;
                data = selector = undefined;
            } else if ( fn == null ) {
                if ( typeof selector === "string" ) {
                    // ( types, selector, fn )
                    fn = data;
                    data = undefined;
                } else {
                    // ( types, data, fn )
                    fn = data;
                    data = selector;
                    selector = undefined;
                }
            }
            if ( fn === false ) {
                fn = returnFalse;
            } else if ( !fn ) {
                return this;
            }

            if ( one === 1 ) {
                origFn = fn;
                fn = function( event ) {
                    // Can use an empty set, since event contains the info
                    jQuery().off( event );
                    return origFn.apply( this, arguments );
                };
                // Use same guid so caller can remove using origFn
                fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
            }
            return this.each( function() {
                jQuery.event.add( this, types, fn, data, selector );
            });
        },
        one: function( types, selector, data, fn ) {
            return this.on( types, selector, data, fn, 1 );
        },
        off: function( types, selector, fn ) {
            var handleObj, type;
            if ( types && types.preventDefault && types.handleObj ) {
                // ( event )  dispatched jQuery.Event
                handleObj = types.handleObj;
                jQuery( types.delegateTarget ).off(
                    handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
                    handleObj.selector,
                    handleObj.handler
                );
                return this;
            }
            if ( typeof types === "object" ) {
                // ( types-object [, selector] )
                for ( type in types ) {
                    this.off( type, selector, types[ type ] );
                }
                return this;
            }
            if ( selector === false || typeof selector === "function" ) {
                // ( types [, fn] )
                fn = selector;
                selector = undefined;
            }
            if ( fn === false ) {
                fn = returnFalse;
            }
            return this.each(function() {
                jQuery.event.remove( this, types, fn, selector );
            });
        },

        trigger: function( type, data ) {
            return this.each(function() {
                jQuery.event.trigger( type, data, this );
            });
        },
        triggerHandler: function( type, data ) {
            var elem = this[0];
            if ( elem ) {
                return jQuery.event.trigger( type, data, elem, true );
            }
        }
    });


    function createSafeFragment( document ) {
        var list = nodeNames.split( "|" ),
            safeFrag = document.createDocumentFragment();

        if ( safeFrag.createElement ) {
            while ( list.length ) {
                safeFrag.createElement(
                    list.pop()
                );
            }
        }
        return safeFrag;
    }

    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
            "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
        rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
        rleadingWhitespace = /^\s+/,
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rtagName = /<([\w:]+)/,
        rtbody = /<tbody/i,
        rhtml = /<|&#?\w+;/,
        rnoInnerhtml = /<(?:script|style|link)/i,
    // checked="checked" or checked
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptType = /^$|\/(?:java|ecma)script/i,
        rscriptTypeMasked = /^true\/(.*)/,
        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

    // We have to close these tags to support XHTML (#13200)
        wrapMap = {
            option: [ 1, "<select multiple='multiple'>", "</select>" ],
            legend: [ 1, "<fieldset>", "</fieldset>" ],
            area: [ 1, "<map>", "</map>" ],
            param: [ 1, "<object>", "</object>" ],
            thead: [ 1, "<table>", "</table>" ],
            tr: [ 2, "<table><tbody>", "</tbody></table>" ],
            col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
            td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

            // IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
            // unless wrapped in a div with non-breaking characters in front of it.
            _default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
        },
        safeFragment = createSafeFragment( document ),
        fragmentDiv = safeFragment.appendChild( document.createElement("div") );

    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;

    function getAll( context, tag ) {
        var elems, elem,
            i = 0,
            found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
                typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
                    undefined;

        if ( !found ) {
            for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
                if ( !tag || jQuery.nodeName( elem, tag ) ) {
                    found.push( elem );
                } else {
                    jQuery.merge( found, getAll( elem, tag ) );
                }
            }
        }

        return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
            jQuery.merge( [ context ], found ) :
            found;
    }

// Used in buildFragment, fixes the defaultChecked property
    function fixDefaultChecked( elem ) {
        if ( rcheckableType.test( elem.type ) ) {
            elem.defaultChecked = elem.checked;
        }
    }

// Support: IE<8
// Manipulating tables requires a tbody
    function manipulationTarget( elem, content ) {
        return jQuery.nodeName( elem, "table" ) &&
        jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

        elem.getElementsByTagName("tbody")[0] ||
        elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
            elem;
    }

// Replace/restore the type attribute of script elements for safe DOM manipulation
    function disableScript( elem ) {
        elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
        return elem;
    }
    function restoreScript( elem ) {
        var match = rscriptTypeMasked.exec( elem.type );
        if ( match ) {
            elem.type = match[1];
        } else {
            elem.removeAttribute("type");
        }
        return elem;
    }

// Mark scripts as having already been evaluated
    function setGlobalEval( elems, refElements ) {
        var elem,
            i = 0;
        for ( ; (elem = elems[i]) != null; i++ ) {
            jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
        }
    }

    function cloneCopyEvent( src, dest ) {

        if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
            return;
        }

        var type, i, l,
            oldData = jQuery._data( src ),
            curData = jQuery._data( dest, oldData ),
            events = oldData.events;

        if ( events ) {
            delete curData.handle;
            curData.events = {};

            for ( type in events ) {
                for ( i = 0, l = events[ type ].length; i < l; i++ ) {
                    jQuery.event.add( dest, type, events[ type ][ i ] );
                }
            }
        }

        // make the cloned public data object a copy from the original
        if ( curData.data ) {
            curData.data = jQuery.extend( {}, curData.data );
        }
    }

    function fixCloneNodeIssues( src, dest ) {
        var nodeName, e, data;

        // We do not need to do anything for non-Elements
        if ( dest.nodeType !== 1 ) {
            return;
        }

        nodeName = dest.nodeName.toLowerCase();

        // IE6-8 copies events bound via attachEvent when using cloneNode.
        if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
            data = jQuery._data( dest );

            for ( e in data.events ) {
                jQuery.removeEvent( dest, e, data.handle );
            }

            // Event data gets referenced instead of copied if the expando gets copied too
            dest.removeAttribute( jQuery.expando );
        }

        // IE blanks contents when cloning scripts, and tries to evaluate newly-set text
        if ( nodeName === "script" && dest.text !== src.text ) {
            disableScript( dest ).text = src.text;
            restoreScript( dest );

            // IE6-10 improperly clones children of object elements using classid.
            // IE10 throws NoModificationAllowedError if parent is null, #12132.
        } else if ( nodeName === "object" ) {
            if ( dest.parentNode ) {
                dest.outerHTML = src.outerHTML;
            }

            // This path appears unavoidable for IE9. When cloning an object
            // element in IE9, the outerHTML strategy above is not sufficient.
            // If the src has innerHTML and the destination does not,
            // copy the src.innerHTML into the dest.innerHTML. #10324
            if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
                dest.innerHTML = src.innerHTML;
            }

        } else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
            // IE6-8 fails to persist the checked state of a cloned checkbox
            // or radio button. Worse, IE6-7 fail to give the cloned element
            // a checked appearance if the defaultChecked value isn't also set

            dest.defaultChecked = dest.checked = src.checked;

            // IE6-7 get confused and end up setting the value of a cloned
            // checkbox/radio button to an empty string instead of "on"
            if ( dest.value !== src.value ) {
                dest.value = src.value;
            }

            // IE6-8 fails to return the selected option to the default selected
            // state when cloning options
        } else if ( nodeName === "option" ) {
            dest.defaultSelected = dest.selected = src.defaultSelected;

            // IE6-8 fails to set the defaultValue to the correct value when
            // cloning other types of input fields
        } else if ( nodeName === "input" || nodeName === "textarea" ) {
            dest.defaultValue = src.defaultValue;
        }
    }

    jQuery.extend({
        clone: function( elem, dataAndEvents, deepDataAndEvents ) {
            var destElements, node, clone, i, srcElements,
                inPage = jQuery.contains( elem.ownerDocument, elem );

            if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
                clone = elem.cloneNode( true );

                // IE<=8 does not properly clone detached, unknown element nodes
            } else {
                fragmentDiv.innerHTML = elem.outerHTML;
                fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
            }

            if ( (!support.noCloneEvent || !support.noCloneChecked) &&
                (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

                // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
                destElements = getAll( clone );
                srcElements = getAll( elem );

                // Fix all IE cloning issues
                for ( i = 0; (node = srcElements[i]) != null; ++i ) {
                    // Ensure that the destination node is not null; Fixes #9587
                    if ( destElements[i] ) {
                        fixCloneNodeIssues( node, destElements[i] );
                    }
                }
            }

            // Copy the events from the original to the clone
            if ( dataAndEvents ) {
                if ( deepDataAndEvents ) {
                    srcElements = srcElements || getAll( elem );
                    destElements = destElements || getAll( clone );

                    for ( i = 0; (node = srcElements[i]) != null; i++ ) {
                        cloneCopyEvent( node, destElements[i] );
                    }
                } else {
                    cloneCopyEvent( elem, clone );
                }
            }

            // Preserve script evaluation history
            destElements = getAll( clone, "script" );
            if ( destElements.length > 0 ) {
                setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
            }

            destElements = srcElements = node = null;

            // Return the cloned set
            return clone;
        },

        buildFragment: function( elems, context, scripts, selection ) {
            var j, elem, contains,
                tmp, tag, tbody, wrap,
                l = elems.length,

            // Ensure a safe fragment
                safe = createSafeFragment( context ),

                nodes = [],
                i = 0;

            for ( ; i < l; i++ ) {
                elem = elems[ i ];

                if ( elem || elem === 0 ) {

                    // Add nodes directly
                    if ( jQuery.type( elem ) === "object" ) {
                        jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

                        // Convert non-html into a text node
                    } else if ( !rhtml.test( elem ) ) {
                        nodes.push( context.createTextNode( elem ) );

                        // Convert html into DOM nodes
                    } else {
                        tmp = tmp || safe.appendChild( context.createElement("div") );

                        // Deserialize a standard representation
                        tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
                        wrap = wrapMap[ tag ] || wrapMap._default;

                        tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

                        // Descend through wrappers to the right content
                        j = wrap[0];
                        while ( j-- ) {
                            tmp = tmp.lastChild;
                        }

                        // Manually add leading whitespace removed by IE
                        if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
                            nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
                        }

                        // Remove IE's autoinserted <tbody> from table fragments
                        if ( !support.tbody ) {

                            // String was a <table>, *may* have spurious <tbody>
                            elem = tag === "table" && !rtbody.test( elem ) ?
                                tmp.firstChild :

                                // String was a bare <thead> or <tfoot>
                                wrap[1] === "<table>" && !rtbody.test( elem ) ?
                                    tmp :
                                    0;

                            j = elem && elem.childNodes.length;
                            while ( j-- ) {
                                if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
                                    elem.removeChild( tbody );
                                }
                            }
                        }

                        jQuery.merge( nodes, tmp.childNodes );

                        // Fix #12392 for WebKit and IE > 9
                        tmp.textContent = "";

                        // Fix #12392 for oldIE
                        while ( tmp.firstChild ) {
                            tmp.removeChild( tmp.firstChild );
                        }

                        // Remember the top-level container for proper cleanup
                        tmp = safe.lastChild;
                    }
                }
            }

            // Fix #11356: Clear elements from fragment
            if ( tmp ) {
                safe.removeChild( tmp );
            }

            // Reset defaultChecked for any radios and checkboxes
            // about to be appended to the DOM in IE 6/7 (#8060)
            if ( !support.appendChecked ) {
                jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
            }

            i = 0;
            while ( (elem = nodes[ i++ ]) ) {

                // #4087 - If origin and destination elements are the same, and this is
                // that element, do not do anything
                if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
                    continue;
                }

                contains = jQuery.contains( elem.ownerDocument, elem );

                // Append to fragment
                tmp = getAll( safe.appendChild( elem ), "script" );

                // Preserve script evaluation history
                if ( contains ) {
                    setGlobalEval( tmp );
                }

                // Capture executables
                if ( scripts ) {
                    j = 0;
                    while ( (elem = tmp[ j++ ]) ) {
                        if ( rscriptType.test( elem.type || "" ) ) {
                            scripts.push( elem );
                        }
                    }
                }
            }

            tmp = null;

            return safe;
        },

        cleanData: function( elems, /* internal */ acceptData ) {
            var elem, type, id, data,
                i = 0,
                internalKey = jQuery.expando,
                cache = jQuery.cache,
                deleteExpando = support.deleteExpando,
                special = jQuery.event.special;

            for ( ; (elem = elems[i]) != null; i++ ) {
                if ( acceptData || jQuery.acceptData( elem ) ) {

                    id = elem[ internalKey ];
                    data = id && cache[ id ];

                    if ( data ) {
                        if ( data.events ) {
                            for ( type in data.events ) {
                                if ( special[ type ] ) {
                                    jQuery.event.remove( elem, type );

                                    // This is a shortcut to avoid jQuery.event.remove's overhead
                                } else {
                                    jQuery.removeEvent( elem, type, data.handle );
                                }
                            }
                        }

                        // Remove cache only if it was not already removed by jQuery.event.remove
                        if ( cache[ id ] ) {

                            delete cache[ id ];

                            // IE does not allow us to delete expando properties from nodes,
                            // nor does it have a removeAttribute function on Document nodes;
                            // we must handle all of these cases
                            if ( deleteExpando ) {
                                delete elem[ internalKey ];

                            } else if ( typeof elem.removeAttribute !== strundefined ) {
                                elem.removeAttribute( internalKey );

                            } else {
                                elem[ internalKey ] = null;
                            }

                            deletedIds.push( id );
                        }
                    }
                }
            }
        }
    });

    jQuery.fn.extend({
        text: function( value ) {
            return access( this, function( value ) {
                return value === undefined ?
                    jQuery.text( this ) :
                    this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
            }, null, value, arguments.length );
        },

        append: function() {
            return this.domManip( arguments, function( elem ) {
                if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
                    var target = manipulationTarget( this, elem );
                    target.appendChild( elem );
                }
            });
        },

        prepend: function() {
            return this.domManip( arguments, function( elem ) {
                if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
                    var target = manipulationTarget( this, elem );
                    target.insertBefore( elem, target.firstChild );
                }
            });
        },

        before: function() {
            return this.domManip( arguments, function( elem ) {
                if ( this.parentNode ) {
                    this.parentNode.insertBefore( elem, this );
                }
            });
        },

        after: function() {
            return this.domManip( arguments, function( elem ) {
                if ( this.parentNode ) {
                    this.parentNode.insertBefore( elem, this.nextSibling );
                }
            });
        },

        remove: function( selector, keepData /* Internal Use Only */ ) {
            var elem,
                elems = selector ? jQuery.filter( selector, this ) : this,
                i = 0;

            for ( ; (elem = elems[i]) != null; i++ ) {

                if ( !keepData && elem.nodeType === 1 ) {
                    jQuery.cleanData( getAll( elem ) );
                }

                if ( elem.parentNode ) {
                    if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
                        setGlobalEval( getAll( elem, "script" ) );
                    }
                    elem.parentNode.removeChild( elem );
                }
            }

            return this;
        },

        empty: function() {
            var elem,
                i = 0;

            for ( ; (elem = this[i]) != null; i++ ) {
                // Remove element nodes and prevent memory leaks
                if ( elem.nodeType === 1 ) {
                    jQuery.cleanData( getAll( elem, false ) );
                }

                // Remove any remaining nodes
                while ( elem.firstChild ) {
                    elem.removeChild( elem.firstChild );
                }

                // If this is a select, ensure that it displays empty (#12336)
                // Support: IE<9
                if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
                    elem.options.length = 0;
                }
            }

            return this;
        },

        clone: function( dataAndEvents, deepDataAndEvents ) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

            return this.map(function() {
                return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
            });
        },

        html: function( value ) {
            return access( this, function( value ) {
                var elem = this[ 0 ] || {},
                    i = 0,
                    l = this.length;

                if ( value === undefined ) {
                    return elem.nodeType === 1 ?
                        elem.innerHTML.replace( rinlinejQuery, "" ) :
                        undefined;
                }

                // See if we can take a shortcut and just use innerHTML
                if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
                    ( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
                    ( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
                    !wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

                    value = value.replace( rxhtmlTag, "<$1></$2>" );

                    try {
                        for (; i < l; i++ ) {
                            // Remove element nodes and prevent memory leaks
                            elem = this[i] || {};
                            if ( elem.nodeType === 1 ) {
                                jQuery.cleanData( getAll( elem, false ) );
                                elem.innerHTML = value;
                            }
                        }

                        elem = 0;

                        // If using innerHTML throws an exception, use the fallback method
                    } catch(e) {}
                }

                if ( elem ) {
                    this.empty().append( value );
                }
            }, null, value, arguments.length );
        },

        replaceWith: function() {
            var arg = arguments[ 0 ];

            // Make the changes, replacing each context element with the new content
            this.domManip( arguments, function( elem ) {
                arg = this.parentNode;

                jQuery.cleanData( getAll( this ) );

                if ( arg ) {
                    arg.replaceChild( elem, this );
                }
            });

            // Force removal if there was no new content (e.g., from empty arguments)
            return arg && (arg.length || arg.nodeType) ? this : this.remove();
        },

        detach: function( selector ) {
            return this.remove( selector, true );
        },

        domManip: function( args, callback ) {

            // Flatten any nested arrays
            args = concat.apply( [], args );

            var first, node, hasScripts,
                scripts, doc, fragment,
                i = 0,
                l = this.length,
                set = this,
                iNoClone = l - 1,
                value = args[0],
                isFunction = jQuery.isFunction( value );

            // We can't cloneNode fragments that contain checked, in WebKit
            if ( isFunction ||
                ( l > 1 && typeof value === "string" &&
                !support.checkClone && rchecked.test( value ) ) ) {
                return this.each(function( index ) {
                    var self = set.eq( index );
                    if ( isFunction ) {
                        args[0] = value.call( this, index, self.html() );
                    }
                    self.domManip( args, callback );
                });
            }

            if ( l ) {
                fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
                first = fragment.firstChild;

                if ( fragment.childNodes.length === 1 ) {
                    fragment = first;
                }

                if ( first ) {
                    scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
                    hasScripts = scripts.length;

                    // Use the original fragment for the last item instead of the first because it can end up
                    // being emptied incorrectly in certain situations (#8070).
                    for ( ; i < l; i++ ) {
                        node = fragment;

                        if ( i !== iNoClone ) {
                            node = jQuery.clone( node, true, true );

                            // Keep references to cloned scripts for later restoration
                            if ( hasScripts ) {
                                jQuery.merge( scripts, getAll( node, "script" ) );
                            }
                        }

                        callback.call( this[i], node, i );
                    }

                    if ( hasScripts ) {
                        doc = scripts[ scripts.length - 1 ].ownerDocument;

                        // Reenable scripts
                        jQuery.map( scripts, restoreScript );

                        // Evaluate executable scripts on first document insertion
                        for ( i = 0; i < hasScripts; i++ ) {
                            node = scripts[ i ];
                            if ( rscriptType.test( node.type || "" ) &&
                                !jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

                                if ( node.src ) {
                                    // Optional AJAX dependency, but won't run scripts if not present
                                    if ( jQuery._evalUrl ) {
                                        jQuery._evalUrl( node.src );
                                    }
                                } else {
                                    jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
                                }
                            }
                        }
                    }

                    // Fix #11809: Avoid leaking memory
                    fragment = first = null;
                }
            }

            return this;
        }
    });

    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function( name, original ) {
        jQuery.fn[ name ] = function( selector ) {
            var elems,
                i = 0,
                ret = [],
                insert = jQuery( selector ),
                last = insert.length - 1;

            for ( ; i <= last; i++ ) {
                elems = i === last ? this : this.clone(true);
                jQuery( insert[i] )[ original ]( elems );

                // Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
                push.apply( ret, elems.get() );
            }

            return this.pushStack( ret );
        };
    });


    var iframe,
        elemdisplay = {};

    /**
     * Retrieve the actual display of a element
     * @param {String} name nodeName of the element
     * @param {Object} doc Document object
     */
// Called only from within defaultDisplay
    function actualDisplay( name, doc ) {
        var style,
            elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

        // getDefaultComputedStyle might be reliably used only on attached element
            display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

                // Use of this method is a temporary fix (more like optmization) until something better comes along,
                // since it was removed from specification and supported only in FF
                style.display : jQuery.css( elem[ 0 ], "display" );

        // We don't have any data stored on the element,
        // so use "detach" method as fast way to get rid of the element
        elem.detach();

        return display;
    }

    /**
     * Try to determine the default display value of an element
     * @param {String} nodeName
     */
    function defaultDisplay( nodeName ) {
        var doc = document,
            display = elemdisplay[ nodeName ];

        if ( !display ) {
            display = actualDisplay( nodeName, doc );

            // If the simple way fails, read from inside an iframe
            if ( display === "none" || !display ) {

                // Use the already-created iframe if possible
                iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

                // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
                doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

                // Support: IE
                doc.write();
                doc.close();

                display = actualDisplay( nodeName, doc );
                iframe.detach();
            }

            // Store the correct default display
            elemdisplay[ nodeName ] = display;
        }

        return display;
    }


    (function() {
        var shrinkWrapBlocksVal;

        support.shrinkWrapBlocks = function() {
            if ( shrinkWrapBlocksVal != null ) {
                return shrinkWrapBlocksVal;
            }

            // Will be changed later if needed.
            shrinkWrapBlocksVal = false;

            // Minified: var b,c,d
            var div, body, container;

            body = document.getElementsByTagName( "body" )[ 0 ];
            if ( !body || !body.style ) {
                // Test fired too early or in an unsupported environment, exit.
                return;
            }

            // Setup
            div = document.createElement( "div" );
            container = document.createElement( "div" );
            container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
            body.appendChild( container ).appendChild( div );

            // Support: IE6
            // Check if elements with layout shrink-wrap their children
            if ( typeof div.style.zoom !== strundefined ) {
                // Reset CSS: box-sizing; display; margin; border
                div.style.cssText =
                    // Support: Firefox<29, Android 2.3
                    // Vendor-prefix box-sizing
                    "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
                    "box-sizing:content-box;display:block;margin:0;border:0;" +
                    "padding:1px;width:1px;zoom:1";
                div.appendChild( document.createElement( "div" ) ).style.width = "5px";
                shrinkWrapBlocksVal = div.offsetWidth !== 3;
            }

            body.removeChild( container );

            return shrinkWrapBlocksVal;
        };

    })();
    var rmargin = (/^margin/);

    var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



    var getStyles, curCSS,
        rposition = /^(top|right|bottom|left)$/;

    if ( window.getComputedStyle ) {
        getStyles = function( elem ) {
            // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
            // IE throws on elements created in popups
            // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
            if ( elem.ownerDocument.defaultView.opener ) {
                return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
            }

            return window.getComputedStyle( elem, null );
        };

        curCSS = function( elem, name, computed ) {
            var width, minWidth, maxWidth, ret,
                style = elem.style;

            computed = computed || getStyles( elem );

            // getPropertyValue is only needed for .css('filter') in IE9, see #12537
            ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

            if ( computed ) {

                if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
                    ret = jQuery.style( elem, name );
                }

                // A tribute to the "awesome hack by Dean Edwards"
                // Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
                // Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
                // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
                if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

                    // Remember the original values
                    width = style.width;
                    minWidth = style.minWidth;
                    maxWidth = style.maxWidth;

                    // Put in the new values to get a computed value out
                    style.minWidth = style.maxWidth = style.width = ret;
                    ret = computed.width;

                    // Revert the changed values
                    style.width = width;
                    style.minWidth = minWidth;
                    style.maxWidth = maxWidth;
                }
            }

            // Support: IE
            // IE returns zIndex value as an integer.
            return ret === undefined ?
                ret :
            ret + "";
        };
    } else if ( document.documentElement.currentStyle ) {
        getStyles = function( elem ) {
            return elem.currentStyle;
        };

        curCSS = function( elem, name, computed ) {
            var left, rs, rsLeft, ret,
                style = elem.style;

            computed = computed || getStyles( elem );
            ret = computed ? computed[ name ] : undefined;

            // Avoid setting ret to empty string here
            // so we don't default to auto
            if ( ret == null && style && style[ name ] ) {
                ret = style[ name ];
            }

            // From the awesome hack by Dean Edwards
            // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

            // If we're not dealing with a regular pixel number
            // but a number that has a weird ending, we need to convert it to pixels
            // but not position css attributes, as those are proportional to the parent element instead
            // and we can't measure the parent instead because it might trigger a "stacking dolls" problem
            if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

                // Remember the original values
                left = style.left;
                rs = elem.runtimeStyle;
                rsLeft = rs && rs.left;

                // Put in the new values to get a computed value out
                if ( rsLeft ) {
                    rs.left = elem.currentStyle.left;
                }
                style.left = name === "fontSize" ? "1em" : ret;
                ret = style.pixelLeft + "px";

                // Revert the changed values
                style.left = left;
                if ( rsLeft ) {
                    rs.left = rsLeft;
                }
            }

            // Support: IE
            // IE returns zIndex value as an integer.
            return ret === undefined ?
                ret :
            ret + "" || "auto";
        };
    }




    function addGetHookIf( conditionFn, hookFn ) {
        // Define the hook, we'll check on the first run if it's really needed.
        return {
            get: function() {
                var condition = conditionFn();

                if ( condition == null ) {
                    // The test was not ready at this point; screw the hook this time
                    // but check again when needed next time.
                    return;
                }

                if ( condition ) {
                    // Hook not needed (or it's not possible to use it due to missing dependency),
                    // remove it.
                    // Since there are no other hooks for marginRight, remove the whole object.
                    delete this.get;
                    return;
                }

                // Hook needed; redefine it so that the support test is not executed again.

                return (this.get = hookFn).apply( this, arguments );
            }
        };
    }


    (function() {
        // Minified: var b,c,d,e,f,g, h,i
        var div, style, a, pixelPositionVal, boxSizingReliableVal,
            reliableHiddenOffsetsVal, reliableMarginRightVal;

        // Setup
        div = document.createElement( "div" );
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        a = div.getElementsByTagName( "a" )[ 0 ];
        style = a && a.style;

        // Finish early in limited (non-browser) environments
        if ( !style ) {
            return;
        }

        style.cssText = "float:left;opacity:.5";

        // Support: IE<9
        // Make sure that element opacity exists (as opposed to filter)
        support.opacity = style.opacity === "0.5";

        // Verify style float existence
        // (IE uses styleFloat instead of cssFloat)
        support.cssFloat = !!style.cssFloat;

        div.style.backgroundClip = "content-box";
        div.cloneNode( true ).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";

        // Support: Firefox<29, Android 2.3
        // Vendor-prefix box-sizing
        support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
        style.WebkitBoxSizing === "";

        jQuery.extend(support, {
            reliableHiddenOffsets: function() {
                if ( reliableHiddenOffsetsVal == null ) {
                    computeStyleTests();
                }
                return reliableHiddenOffsetsVal;
            },

            boxSizingReliable: function() {
                if ( boxSizingReliableVal == null ) {
                    computeStyleTests();
                }
                return boxSizingReliableVal;
            },

            pixelPosition: function() {
                if ( pixelPositionVal == null ) {
                    computeStyleTests();
                }
                return pixelPositionVal;
            },

            // Support: Android 2.3
            reliableMarginRight: function() {
                if ( reliableMarginRightVal == null ) {
                    computeStyleTests();
                }
                return reliableMarginRightVal;
            }
        });

        function computeStyleTests() {
            // Minified: var b,c,d,j
            var div, body, container, contents;

            body = document.getElementsByTagName( "body" )[ 0 ];
            if ( !body || !body.style ) {
                // Test fired too early or in an unsupported environment, exit.
                return;
            }

            // Setup
            div = document.createElement( "div" );
            container = document.createElement( "div" );
            container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
            body.appendChild( container ).appendChild( div );

            div.style.cssText =
                // Support: Firefox<29, Android 2.3
                // Vendor-prefix box-sizing
                "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
                "box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
                "border:1px;padding:1px;width:4px;position:absolute";

            // Support: IE<9
            // Assume reasonable values in the absence of getComputedStyle
            pixelPositionVal = boxSizingReliableVal = false;
            reliableMarginRightVal = true;

            // Check for getComputedStyle so that this code is not run in IE<9.
            if ( window.getComputedStyle ) {
                pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
                boxSizingReliableVal =
                    ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

                // Support: Android 2.3
                // Div with explicit width and no margin-right incorrectly
                // gets computed margin-right based on width of container (#3333)
                // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
                contents = div.appendChild( document.createElement( "div" ) );

                // Reset CSS: box-sizing; display; margin; border; padding
                contents.style.cssText = div.style.cssText =
                    // Support: Firefox<29, Android 2.3
                    // Vendor-prefix box-sizing
                    "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
                    "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
                contents.style.marginRight = contents.style.width = "0";
                div.style.width = "1px";

                reliableMarginRightVal =
                    !parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

                div.removeChild( contents );
            }

            // Support: IE8
            // Check if table cells still have offsetWidth/Height when they are set
            // to display:none and there are still other visible table cells in a
            // table row; if so, offsetWidth/Height are not reliable for use when
            // determining if an element has been hidden directly using
            // display:none (it is still safe to use offsets if a parent element is
            // hidden; don safety goggles and see bug #4512 for more information).
            div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
            contents = div.getElementsByTagName( "td" );
            contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
            reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
            if ( reliableHiddenOffsetsVal ) {
                contents[ 0 ].style.display = "";
                contents[ 1 ].style.display = "none";
                reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
            }

            body.removeChild( container );
        }

    })();


// A method for quickly swapping in/out CSS properties to get correct calculations.
    jQuery.swap = function( elem, options, callback, args ) {
        var ret, name,
            old = {};

        // Remember the old values, and insert the new ones
        for ( name in options ) {
            old[ name ] = elem.style[ name ];
            elem.style[ name ] = options[ name ];
        }

        ret = callback.apply( elem, args || [] );

        // Revert the old values
        for ( name in options ) {
            elem.style[ name ] = old[ name ];
        }

        return ret;
    };


    var
        ralpha = /alpha\([^)]*\)/i,
        ropacity = /opacity\s*=\s*([^)]*)/,

    // swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
    // see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
        rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
        rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

        cssShow = { position: "absolute", visibility: "hidden", display: "block" },
        cssNormalTransform = {
            letterSpacing: "0",
            fontWeight: "400"
        },

        cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
    function vendorPropName( style, name ) {

        // shortcut for names that are not vendor prefixed
        if ( name in style ) {
            return name;
        }

        // check for vendor prefixed names
        var capName = name.charAt(0).toUpperCase() + name.slice(1),
            origName = name,
            i = cssPrefixes.length;

        while ( i-- ) {
            name = cssPrefixes[ i ] + capName;
            if ( name in style ) {
                return name;
            }
        }

        return origName;
    }

    function showHide( elements, show ) {
        var display, elem, hidden,
            values = [],
            index = 0,
            length = elements.length;

        for ( ; index < length; index++ ) {
            elem = elements[ index ];
            if ( !elem.style ) {
                continue;
            }

            values[ index ] = jQuery._data( elem, "olddisplay" );
            display = elem.style.display;
            if ( show ) {
                // Reset the inline display of this element to learn if it is
                // being hidden by cascaded rules or not
                if ( !values[ index ] && display === "none" ) {
                    elem.style.display = "";
                }

                // Set elements which have been overridden with display: none
                // in a stylesheet to whatever the default browser style is
                // for such an element
                if ( elem.style.display === "" && isHidden( elem ) ) {
                    values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
                }
            } else {
                hidden = isHidden( elem );

                if ( display && display !== "none" || !hidden ) {
                    jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
                }
            }
        }

        // Set the display of most of the elements in a second loop
        // to avoid the constant reflow
        for ( index = 0; index < length; index++ ) {
            elem = elements[ index ];
            if ( !elem.style ) {
                continue;
            }
            if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
                elem.style.display = show ? values[ index ] || "" : "none";
            }
        }

        return elements;
    }

    function setPositiveNumber( elem, value, subtract ) {
        var matches = rnumsplit.exec( value );
        return matches ?
            // Guard against undefined "subtract", e.g., when used as in cssHooks
        Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
            value;
    }

    function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
        var i = extra === ( isBorderBox ? "border" : "content" ) ?
                // If we already have the right measurement, avoid augmentation
                4 :
                // Otherwise initialize for horizontal or vertical properties
                name === "width" ? 1 : 0,

            val = 0;

        for ( ; i < 4; i += 2 ) {
            // both box models exclude margin, so add it if we want it
            if ( extra === "margin" ) {
                val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
            }

            if ( isBorderBox ) {
                // border-box includes padding, so remove it if we want content
                if ( extra === "content" ) {
                    val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
                }

                // at this point, extra isn't border nor margin, so remove border
                if ( extra !== "margin" ) {
                    val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
                }
            } else {
                // at this point, extra isn't content, so add padding
                val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

                // at this point, extra isn't content nor padding, so add border
                if ( extra !== "padding" ) {
                    val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
                }
            }
        }

        return val;
    }

    function getWidthOrHeight( elem, name, extra ) {

        // Start with offset property, which is equivalent to the border-box value
        var valueIsBorderBox = true,
            val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
            styles = getStyles( elem ),
            isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

        // some non-html elements return undefined for offsetWidth, so check for null/undefined
        // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
        // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
        if ( val <= 0 || val == null ) {
            // Fall back to computed then uncomputed css if necessary
            val = curCSS( elem, name, styles );
            if ( val < 0 || val == null ) {
                val = elem.style[ name ];
            }

            // Computed unit is not pixels. Stop here and return.
            if ( rnumnonpx.test(val) ) {
                return val;
            }

            // we need the check for style in case a browser which returns unreliable values
            // for getComputedStyle silently falls back to the reliable elem.style
            valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

            // Normalize "", auto, and prepare for extra
            val = parseFloat( val ) || 0;
        }

        // use the active box-sizing model to add/subtract irrelevant styles
        return ( val +
            augmentWidthOrHeight(
                elem,
                name,
                extra || ( isBorderBox ? "border" : "content" ),
                valueIsBorderBox,
                styles
            )
            ) + "px";
    }

    jQuery.extend({
        // Add in style property hooks for overriding the default
        // behavior of getting and setting a style property
        cssHooks: {
            opacity: {
                get: function( elem, computed ) {
                    if ( computed ) {
                        // We should always get a number back from opacity
                        var ret = curCSS( elem, "opacity" );
                        return ret === "" ? "1" : ret;
                    }
                }
            }
        },

        // Don't automatically add "px" to these possibly-unitless properties
        cssNumber: {
            "columnCount": true,
            "fillOpacity": true,
            "flexGrow": true,
            "flexShrink": true,
            "fontWeight": true,
            "lineHeight": true,
            "opacity": true,
            "order": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
        },

        // Add in properties whose names you wish to fix before
        // setting or getting the value
        cssProps: {
            // normalize float css property
            "float": support.cssFloat ? "cssFloat" : "styleFloat"
        },

        // Get and set the style property on a DOM Node
        style: function( elem, name, value, extra ) {
            // Don't set styles on text and comment nodes
            if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
                return;
            }

            // Make sure that we're working with the right name
            var ret, type, hooks,
                origName = jQuery.camelCase( name ),
                style = elem.style;

            name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

            // gets hook for the prefixed version
            // followed by the unprefixed version
            hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

            // Check if we're setting a value
            if ( value !== undefined ) {
                type = typeof value;

                // convert relative number strings (+= or -=) to relative numbers. #7345
                if ( type === "string" && (ret = rrelNum.exec( value )) ) {
                    value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
                    // Fixes bug #9237
                    type = "number";
                }

                // Make sure that null and NaN values aren't set. See: #7116
                if ( value == null || value !== value ) {
                    return;
                }

                // If a number was passed in, add 'px' to the (except for certain CSS properties)
                if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
                    value += "px";
                }

                // Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
                // but it would mean to define eight (for every problematic property) identical functions
                if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
                    style[ name ] = "inherit";
                }

                // If a hook was provided, use that value, otherwise just set the specified value
                if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

                    // Support: IE
                    // Swallow errors from 'invalid' CSS values (#5509)
                    try {
                        style[ name ] = value;
                    } catch(e) {}
                }

            } else {
                // If a hook was provided get the non-computed value from there
                if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
                    return ret;
                }

                // Otherwise just get the value from the style object
                return style[ name ];
            }
        },

        css: function( elem, name, extra, styles ) {
            var num, val, hooks,
                origName = jQuery.camelCase( name );

            // Make sure that we're working with the right name
            name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

            // gets hook for the prefixed version
            // followed by the unprefixed version
            hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

            // If a hook was provided get the computed value from there
            if ( hooks && "get" in hooks ) {
                val = hooks.get( elem, true, extra );
            }

            // Otherwise, if a way to get the computed value exists, use that
            if ( val === undefined ) {
                val = curCSS( elem, name, styles );
            }

            //convert "normal" to computed value
            if ( val === "normal" && name in cssNormalTransform ) {
                val = cssNormalTransform[ name ];
            }

            // Return, converting to number if forced or a qualifier was provided and val looks numeric
            if ( extra === "" || extra ) {
                num = parseFloat( val );
                return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
            }
            return val;
        }
    });

    jQuery.each([ "height", "width" ], function( i, name ) {
        jQuery.cssHooks[ name ] = {
            get: function( elem, computed, extra ) {
                if ( computed ) {
                    // certain elements can have dimension info if we invisibly show them
                    // however, it must have a current display style that would benefit from this
                    return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
                        jQuery.swap( elem, cssShow, function() {
                            return getWidthOrHeight( elem, name, extra );
                        }) :
                        getWidthOrHeight( elem, name, extra );
                }
            },

            set: function( elem, value, extra ) {
                var styles = extra && getStyles( elem );
                return setPositiveNumber( elem, value, extra ?
                        augmentWidthOrHeight(
                            elem,
                            name,
                            extra,
                            support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
                            styles
                        ) : 0
                );
            }
        };
    });

    if ( !support.opacity ) {
        jQuery.cssHooks.opacity = {
            get: function( elem, computed ) {
                // IE uses filters for opacity
                return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
                ( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
                    computed ? "1" : "";
            },

            set: function( elem, value ) {
                var style = elem.style,
                    currentStyle = elem.currentStyle,
                    opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
                    filter = currentStyle && currentStyle.filter || style.filter || "";

                // IE has trouble with opacity if it does not have layout
                // Force it by setting the zoom level
                style.zoom = 1;

                // if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
                // if value === "", then remove inline opacity #12685
                if ( ( value >= 1 || value === "" ) &&
                    jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
                    style.removeAttribute ) {

                    // Setting style.filter to null, "" & " " still leave "filter:" in the cssText
                    // if "filter:" is present at all, clearType is disabled, we want to avoid this
                    // style.removeAttribute is IE Only, but so apparently is this code path...
                    style.removeAttribute( "filter" );

                    // if there is no filter style applied in a css rule or unset inline opacity, we are done
                    if ( value === "" || currentStyle && !currentStyle.filter ) {
                        return;
                    }
                }

                // otherwise, set new filter values
                style.filter = ralpha.test( filter ) ?
                    filter.replace( ralpha, opacity ) :
                filter + " " + opacity;
            }
        };
    }

    jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
        function( elem, computed ) {
            if ( computed ) {
                // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
                // Work around by temporarily setting element display to inline-block
                return jQuery.swap( elem, { "display": "inline-block" },
                    curCSS, [ elem, "marginRight" ] );
            }
        }
    );

// These hooks are used by animate to expand properties
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function( prefix, suffix ) {
        jQuery.cssHooks[ prefix + suffix ] = {
            expand: function( value ) {
                var i = 0,
                    expanded = {},

                // assumes a single number if not a string
                    parts = typeof value === "string" ? value.split(" ") : [ value ];

                for ( ; i < 4; i++ ) {
                    expanded[ prefix + cssExpand[ i ] + suffix ] =
                        parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
                }

                return expanded;
            }
        };

        if ( !rmargin.test( prefix ) ) {
            jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
        }
    });

    jQuery.fn.extend({
        css: function( name, value ) {
            return access( this, function( elem, name, value ) {
                var styles, len,
                    map = {},
                    i = 0;

                if ( jQuery.isArray( name ) ) {
                    styles = getStyles( elem );
                    len = name.length;

                    for ( ; i < len; i++ ) {
                        map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
                    }

                    return map;
                }

                return value !== undefined ?
                    jQuery.style( elem, name, value ) :
                    jQuery.css( elem, name );
            }, name, value, arguments.length > 1 );
        },
        show: function() {
            return showHide( this, true );
        },
        hide: function() {
            return showHide( this );
        },
        toggle: function( state ) {
            if ( typeof state === "boolean" ) {
                return state ? this.show() : this.hide();
            }

            return this.each(function() {
                if ( isHidden( this ) ) {
                    jQuery( this ).show();
                } else {
                    jQuery( this ).hide();
                }
            });
        }
    });


    function Tween( elem, options, prop, end, easing ) {
        return new Tween.prototype.init( elem, options, prop, end, easing );
    }
    jQuery.Tween = Tween;

    Tween.prototype = {
        constructor: Tween,
        init: function( elem, options, prop, end, easing, unit ) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || "swing";
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
        },
        cur: function() {
            var hooks = Tween.propHooks[ this.prop ];

            return hooks && hooks.get ?
                hooks.get( this ) :
                Tween.propHooks._default.get( this );
        },
        run: function( percent ) {
            var eased,
                hooks = Tween.propHooks[ this.prop ];

            if ( this.options.duration ) {
                this.pos = eased = jQuery.easing[ this.easing ](
                    percent, this.options.duration * percent, 0, 1, this.options.duration
                );
            } else {
                this.pos = eased = percent;
            }
            this.now = ( this.end - this.start ) * eased + this.start;

            if ( this.options.step ) {
                this.options.step.call( this.elem, this.now, this );
            }

            if ( hooks && hooks.set ) {
                hooks.set( this );
            } else {
                Tween.propHooks._default.set( this );
            }
            return this;
        }
    };

    Tween.prototype.init.prototype = Tween.prototype;

    Tween.propHooks = {
        _default: {
            get: function( tween ) {
                var result;

                if ( tween.elem[ tween.prop ] != null &&
                    (!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
                    return tween.elem[ tween.prop ];
                }

                // passing an empty string as a 3rd parameter to .css will automatically
                // attempt a parseFloat and fallback to a string if the parse fails
                // so, simple values such as "10px" are parsed to Float.
                // complex values such as "rotate(1rad)" are returned as is.
                result = jQuery.css( tween.elem, tween.prop, "" );
                // Empty strings, null, undefined and "auto" are converted to 0.
                return !result || result === "auto" ? 0 : result;
            },
            set: function( tween ) {
                // use step hook for back compat - use cssHook if its there - use .style if its
                // available and use plain properties where available
                if ( jQuery.fx.step[ tween.prop ] ) {
                    jQuery.fx.step[ tween.prop ]( tween );
                } else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
                    jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
                } else {
                    tween.elem[ tween.prop ] = tween.now;
                }
            }
        }
    };

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function( tween ) {
            if ( tween.elem.nodeType && tween.elem.parentNode ) {
                tween.elem[ tween.prop ] = tween.now;
            }
        }
    };

    jQuery.easing = {
        linear: function( p ) {
            return p;
        },
        swing: function( p ) {
            return 0.5 - Math.cos( p * Math.PI ) / 2;
        }
    };

    jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
    jQuery.fx.step = {};




    var
        fxNow, timerId,
        rfxtypes = /^(?:toggle|show|hide)$/,
        rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
        rrun = /queueHooks$/,
        animationPrefilters = [ defaultPrefilter ],
        tweeners = {
            "*": [ function( prop, value ) {
                var tween = this.createTween( prop, value ),
                    target = tween.cur(),
                    parts = rfxnum.exec( value ),
                    unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

                // Starting value computation is required for potential unit mismatches
                    start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
                        rfxnum.exec( jQuery.css( tween.elem, prop ) ),
                    scale = 1,
                    maxIterations = 20;

                if ( start && start[ 3 ] !== unit ) {
                    // Trust units reported by jQuery.css
                    unit = unit || start[ 3 ];

                    // Make sure we update the tween properties later on
                    parts = parts || [];

                    // Iteratively approximate from a nonzero starting point
                    start = +target || 1;

                    do {
                        // If previous iteration zeroed out, double until we get *something*
                        // Use a string for doubling factor so we don't accidentally see scale as unchanged below
                        scale = scale || ".5";

                        // Adjust and apply
                        start = start / scale;
                        jQuery.style( tween.elem, prop, start + unit );

                        // Update scale, tolerating zero or NaN from tween.cur()
                        // And breaking the loop if scale is unchanged or perfect, or if we've just had enough
                    } while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
                }

                // Update tween properties
                if ( parts ) {
                    start = tween.start = +start || +target || 0;
                    tween.unit = unit;
                    // If a +=/-= token was provided, we're doing a relative animation
                    tween.end = parts[ 1 ] ?
                    start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
                        +parts[ 2 ];
                }

                return tween;
            } ]
        };

// Animations created synchronously will run synchronously
    function createFxNow() {
        setTimeout(function() {
            fxNow = undefined;
        });
        return ( fxNow = jQuery.now() );
    }

// Generate parameters to create a standard animation
    function genFx( type, includeWidth ) {
        var which,
            attrs = { height: type },
            i = 0;

        // if we include width, step value is 1 to do all cssExpand values,
        // if we don't include width, step value is 2 to skip over Left and Right
        includeWidth = includeWidth ? 1 : 0;
        for ( ; i < 4 ; i += 2 - includeWidth ) {
            which = cssExpand[ i ];
            attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
        }

        if ( includeWidth ) {
            attrs.opacity = attrs.width = type;
        }

        return attrs;
    }

    function createTween( value, prop, animation ) {
        var tween,
            collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
            index = 0,
            length = collection.length;
        for ( ; index < length; index++ ) {
            if ( (tween = collection[ index ].call( animation, prop, value )) ) {

                // we're done with this property
                return tween;
            }
        }
    }

    function defaultPrefilter( elem, props, opts ) {
        /* jshint validthis: true */
        var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
            anim = this,
            orig = {},
            style = elem.style,
            hidden = elem.nodeType && isHidden( elem ),
            dataShow = jQuery._data( elem, "fxshow" );

        // handle queue: false promises
        if ( !opts.queue ) {
            hooks = jQuery._queueHooks( elem, "fx" );
            if ( hooks.unqueued == null ) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function() {
                    if ( !hooks.unqueued ) {
                        oldfire();
                    }
                };
            }
            hooks.unqueued++;

            anim.always(function() {
                // doing this makes sure that the complete handler will be called
                // before this completes
                anim.always(function() {
                    hooks.unqueued--;
                    if ( !jQuery.queue( elem, "fx" ).length ) {
                        hooks.empty.fire();
                    }
                });
            });
        }

        // height/width overflow pass
        if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
            // Make sure that nothing sneaks out
            // Record all 3 overflow attributes because IE does not
            // change the overflow attribute when overflowX and
            // overflowY are set to the same value
            opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

            // Set display property to inline-block for height/width
            // animations on inline elements that are having width/height animated
            display = jQuery.css( elem, "display" );

            // Test default display if display is currently "none"
            checkDisplay = display === "none" ?
            jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

            if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

                // inline-level elements accept inline-block;
                // block-level elements need to be inline with layout
                if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
                    style.display = "inline-block";
                } else {
                    style.zoom = 1;
                }
            }
        }

        if ( opts.overflow ) {
            style.overflow = "hidden";
            if ( !support.shrinkWrapBlocks() ) {
                anim.always(function() {
                    style.overflow = opts.overflow[ 0 ];
                    style.overflowX = opts.overflow[ 1 ];
                    style.overflowY = opts.overflow[ 2 ];
                });
            }
        }

        // show/hide pass
        for ( prop in props ) {
            value = props[ prop ];
            if ( rfxtypes.exec( value ) ) {
                delete props[ prop ];
                toggle = toggle || value === "toggle";
                if ( value === ( hidden ? "hide" : "show" ) ) {

                    // If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
                    if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
                        hidden = true;
                    } else {
                        continue;
                    }
                }
                orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

                // Any non-fx value stops us from restoring the original display value
            } else {
                display = undefined;
            }
        }

        if ( !jQuery.isEmptyObject( orig ) ) {
            if ( dataShow ) {
                if ( "hidden" in dataShow ) {
                    hidden = dataShow.hidden;
                }
            } else {
                dataShow = jQuery._data( elem, "fxshow", {} );
            }

            // store state if its toggle - enables .stop().toggle() to "reverse"
            if ( toggle ) {
                dataShow.hidden = !hidden;
            }
            if ( hidden ) {
                jQuery( elem ).show();
            } else {
                anim.done(function() {
                    jQuery( elem ).hide();
                });
            }
            anim.done(function() {
                var prop;
                jQuery._removeData( elem, "fxshow" );
                for ( prop in orig ) {
                    jQuery.style( elem, prop, orig[ prop ] );
                }
            });
            for ( prop in orig ) {
                tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

                if ( !( prop in dataShow ) ) {
                    dataShow[ prop ] = tween.start;
                    if ( hidden ) {
                        tween.end = tween.start;
                        tween.start = prop === "width" || prop === "height" ? 1 : 0;
                    }
                }
            }

            // If this is a noop like .hide().hide(), restore an overwritten display value
        } else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
            style.display = display;
        }
    }

    function propFilter( props, specialEasing ) {
        var index, name, easing, value, hooks;

        // camelCase, specialEasing and expand cssHook pass
        for ( index in props ) {
            name = jQuery.camelCase( index );
            easing = specialEasing[ name ];
            value = props[ index ];
            if ( jQuery.isArray( value ) ) {
                easing = value[ 1 ];
                value = props[ index ] = value[ 0 ];
            }

            if ( index !== name ) {
                props[ name ] = value;
                delete props[ index ];
            }

            hooks = jQuery.cssHooks[ name ];
            if ( hooks && "expand" in hooks ) {
                value = hooks.expand( value );
                delete props[ name ];

                // not quite $.extend, this wont overwrite keys already present.
                // also - reusing 'index' from above because we have the correct "name"
                for ( index in value ) {
                    if ( !( index in props ) ) {
                        props[ index ] = value[ index ];
                        specialEasing[ index ] = easing;
                    }
                }
            } else {
                specialEasing[ name ] = easing;
            }
        }
    }

    function Animation( elem, properties, options ) {
        var result,
            stopped,
            index = 0,
            length = animationPrefilters.length,
            deferred = jQuery.Deferred().always( function() {
                // don't match elem in the :animated selector
                delete tick.elem;
            }),
            tick = function() {
                if ( stopped ) {
                    return false;
                }
                var currentTime = fxNow || createFxNow(),
                    remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
                // archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
                    temp = remaining / animation.duration || 0,
                    percent = 1 - temp,
                    index = 0,
                    length = animation.tweens.length;

                for ( ; index < length ; index++ ) {
                    animation.tweens[ index ].run( percent );
                }

                deferred.notifyWith( elem, [ animation, percent, remaining ]);

                if ( percent < 1 && length ) {
                    return remaining;
                } else {
                    deferred.resolveWith( elem, [ animation ] );
                    return false;
                }
            },
            animation = deferred.promise({
                elem: elem,
                props: jQuery.extend( {}, properties ),
                opts: jQuery.extend( true, { specialEasing: {} }, options ),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function( prop, end ) {
                    var tween = jQuery.Tween( elem, animation.opts, prop, end,
                        animation.opts.specialEasing[ prop ] || animation.opts.easing );
                    animation.tweens.push( tween );
                    return tween;
                },
                stop: function( gotoEnd ) {
                    var index = 0,
                    // if we are going to the end, we want to run all the tweens
                    // otherwise we skip this part
                        length = gotoEnd ? animation.tweens.length : 0;
                    if ( stopped ) {
                        return this;
                    }
                    stopped = true;
                    for ( ; index < length ; index++ ) {
                        animation.tweens[ index ].run( 1 );
                    }

                    // resolve when we played the last frame
                    // otherwise, reject
                    if ( gotoEnd ) {
                        deferred.resolveWith( elem, [ animation, gotoEnd ] );
                    } else {
                        deferred.rejectWith( elem, [ animation, gotoEnd ] );
                    }
                    return this;
                }
            }),
            props = animation.props;

        propFilter( props, animation.opts.specialEasing );

        for ( ; index < length ; index++ ) {
            result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
            if ( result ) {
                return result;
            }
        }

        jQuery.map( props, createTween, animation );

        if ( jQuery.isFunction( animation.opts.start ) ) {
            animation.opts.start.call( elem, animation );
        }

        jQuery.fx.timer(
            jQuery.extend( tick, {
                elem: elem,
                anim: animation,
                queue: animation.opts.queue
            })
        );

        // attach callbacks from options
        return animation.progress( animation.opts.progress )
            .done( animation.opts.done, animation.opts.complete )
            .fail( animation.opts.fail )
            .always( animation.opts.always );
    }

    jQuery.Animation = jQuery.extend( Animation, {
        tweener: function( props, callback ) {
            if ( jQuery.isFunction( props ) ) {
                callback = props;
                props = [ "*" ];
            } else {
                props = props.split(" ");
            }

            var prop,
                index = 0,
                length = props.length;

            for ( ; index < length ; index++ ) {
                prop = props[ index ];
                tweeners[ prop ] = tweeners[ prop ] || [];
                tweeners[ prop ].unshift( callback );
            }
        },

        prefilter: function( callback, prepend ) {
            if ( prepend ) {
                animationPrefilters.unshift( callback );
            } else {
                animationPrefilters.push( callback );
            }
        }
    });

    jQuery.speed = function( speed, easing, fn ) {
        var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
            complete: fn || !fn && easing ||
            jQuery.isFunction( speed ) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
        };

        opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
            opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

        // normalize opt.queue - true/undefined/null -> "fx"
        if ( opt.queue == null || opt.queue === true ) {
            opt.queue = "fx";
        }

        // Queueing
        opt.old = opt.complete;

        opt.complete = function() {
            if ( jQuery.isFunction( opt.old ) ) {
                opt.old.call( this );
            }

            if ( opt.queue ) {
                jQuery.dequeue( this, opt.queue );
            }
        };

        return opt;
    };

    jQuery.fn.extend({
        fadeTo: function( speed, to, easing, callback ) {

            // show any hidden elements after setting opacity to 0
            return this.filter( isHidden ).css( "opacity", 0 ).show()

                // animate to the value specified
                .end().animate({ opacity: to }, speed, easing, callback );
        },
        animate: function( prop, speed, easing, callback ) {
            var empty = jQuery.isEmptyObject( prop ),
                optall = jQuery.speed( speed, easing, callback ),
                doAnimation = function() {
                    // Operate on a copy of prop so per-property easing won't be lost
                    var anim = Animation( this, jQuery.extend( {}, prop ), optall );

                    // Empty animations, or finishing resolves immediately
                    if ( empty || jQuery._data( this, "finish" ) ) {
                        anim.stop( true );
                    }
                };
            doAnimation.finish = doAnimation;

            return empty || optall.queue === false ?
                this.each( doAnimation ) :
                this.queue( optall.queue, doAnimation );
        },
        stop: function( type, clearQueue, gotoEnd ) {
            var stopQueue = function( hooks ) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop( gotoEnd );
            };

            if ( typeof type !== "string" ) {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if ( clearQueue && type !== false ) {
                this.queue( type || "fx", [] );
            }

            return this.each(function() {
                var dequeue = true,
                    index = type != null && type + "queueHooks",
                    timers = jQuery.timers,
                    data = jQuery._data( this );

                if ( index ) {
                    if ( data[ index ] && data[ index ].stop ) {
                        stopQueue( data[ index ] );
                    }
                } else {
                    for ( index in data ) {
                        if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
                            stopQueue( data[ index ] );
                        }
                    }
                }

                for ( index = timers.length; index--; ) {
                    if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
                        timers[ index ].anim.stop( gotoEnd );
                        dequeue = false;
                        timers.splice( index, 1 );
                    }
                }

                // start the next in the queue if the last step wasn't forced
                // timers currently will call their complete callbacks, which will dequeue
                // but only if they were gotoEnd
                if ( dequeue || !gotoEnd ) {
                    jQuery.dequeue( this, type );
                }
            });
        },
        finish: function( type ) {
            if ( type !== false ) {
                type = type || "fx";
            }
            return this.each(function() {
                var index,
                    data = jQuery._data( this ),
                    queue = data[ type + "queue" ],
                    hooks = data[ type + "queueHooks" ],
                    timers = jQuery.timers,
                    length = queue ? queue.length : 0;

                // enable finishing flag on private data
                data.finish = true;

                // empty the queue first
                jQuery.queue( this, type, [] );

                if ( hooks && hooks.stop ) {
                    hooks.stop.call( this, true );
                }

                // look for any active animations, and finish them
                for ( index = timers.length; index--; ) {
                    if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
                        timers[ index ].anim.stop( true );
                        timers.splice( index, 1 );
                    }
                }

                // look for any animations in the old queue and finish them
                for ( index = 0; index < length; index++ ) {
                    if ( queue[ index ] && queue[ index ].finish ) {
                        queue[ index ].finish.call( this );
                    }
                }

                // turn off finishing flag
                delete data.finish;
            });
        }
    });

    jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
        var cssFn = jQuery.fn[ name ];
        jQuery.fn[ name ] = function( speed, easing, callback ) {
            return speed == null || typeof speed === "boolean" ?
                cssFn.apply( this, arguments ) :
                this.animate( genFx( name, true ), speed, easing, callback );
        };
    });

// Generate shortcuts for custom animations
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" }
    }, function( name, props ) {
        jQuery.fn[ name ] = function( speed, easing, callback ) {
            return this.animate( props, speed, easing, callback );
        };
    });

    jQuery.timers = [];
    jQuery.fx.tick = function() {
        var timer,
            timers = jQuery.timers,
            i = 0;

        fxNow = jQuery.now();

        for ( ; i < timers.length; i++ ) {
            timer = timers[ i ];
            // Checks the timer has not already been removed
            if ( !timer() && timers[ i ] === timer ) {
                timers.splice( i--, 1 );
            }
        }

        if ( !timers.length ) {
            jQuery.fx.stop();
        }
        fxNow = undefined;
    };

    jQuery.fx.timer = function( timer ) {
        jQuery.timers.push( timer );
        if ( timer() ) {
            jQuery.fx.start();
        } else {
            jQuery.timers.pop();
        }
    };

    jQuery.fx.interval = 13;

    jQuery.fx.start = function() {
        if ( !timerId ) {
            timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
        }
    };

    jQuery.fx.stop = function() {
        clearInterval( timerId );
        timerId = null;
    };

    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        // Default speed
        _default: 400
    };


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
    jQuery.fn.delay = function( time, type ) {
        time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
        type = type || "fx";

        return this.queue( type, function( next, hooks ) {
            var timeout = setTimeout( next, time );
            hooks.stop = function() {
                clearTimeout( timeout );
            };
        });
    };


    (function() {
        // Minified: var a,b,c,d,e
        var input, div, select, a, opt;

        // Setup
        div = document.createElement( "div" );
        div.setAttribute( "className", "t" );
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        a = div.getElementsByTagName("a")[ 0 ];

        // First batch of tests.
        select = document.createElement("select");
        opt = select.appendChild( document.createElement("option") );
        input = div.getElementsByTagName("input")[ 0 ];

        a.style.cssText = "top:1px";

        // Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
        support.getSetAttribute = div.className !== "t";

        // Get the style information from getAttribute
        // (IE uses .cssText instead)
        support.style = /top/.test( a.getAttribute("style") );

        // Make sure that URLs aren't manipulated
        // (IE normalizes it by default)
        support.hrefNormalized = a.getAttribute("href") === "/a";

        // Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
        support.checkOn = !!input.value;

        // Make sure that a selected-by-default option has a working selected property.
        // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
        support.optSelected = opt.selected;

        // Tests for enctype support on a form (#6743)
        support.enctype = !!document.createElement("form").enctype;

        // Make sure that the options inside disabled selects aren't marked as disabled
        // (WebKit marks them as disabled)
        select.disabled = true;
        support.optDisabled = !opt.disabled;

        // Support: IE8 only
        // Check if we can trust getAttribute("value")
        input = document.createElement( "input" );
        input.setAttribute( "value", "" );
        support.input = input.getAttribute( "value" ) === "";

        // Check if an input maintains its value after becoming a radio
        input.value = "t";
        input.setAttribute( "type", "radio" );
        support.radioValue = input.value === "t";
    })();


    var rreturn = /\r/g;

    jQuery.fn.extend({
        val: function( value ) {
            var hooks, ret, isFunction,
                elem = this[0];

            if ( !arguments.length ) {
                if ( elem ) {
                    hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

                    if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
                        return ret;
                    }

                    ret = elem.value;

                    return typeof ret === "string" ?
                        // handle most common string cases
                        ret.replace(rreturn, "") :
                        // handle cases where value is null/undef or number
                        ret == null ? "" : ret;
                }

                return;
            }

            isFunction = jQuery.isFunction( value );

            return this.each(function( i ) {
                var val;

                if ( this.nodeType !== 1 ) {
                    return;
                }

                if ( isFunction ) {
                    val = value.call( this, i, jQuery( this ).val() );
                } else {
                    val = value;
                }

                // Treat null/undefined as ""; convert numbers to string
                if ( val == null ) {
                    val = "";
                } else if ( typeof val === "number" ) {
                    val += "";
                } else if ( jQuery.isArray( val ) ) {
                    val = jQuery.map( val, function( value ) {
                        return value == null ? "" : value + "";
                    });
                }

                hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

                // If set returns undefined, fall back to normal setting
                if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
                    this.value = val;
                }
            });
        }
    });

    jQuery.extend({
        valHooks: {
            option: {
                get: function( elem ) {
                    var val = jQuery.find.attr( elem, "value" );
                    return val != null ?
                        val :
                        // Support: IE10-11+
                        // option.text throws exceptions (#14686, #14858)
                        jQuery.trim( jQuery.text( elem ) );
                }
            },
            select: {
                get: function( elem ) {
                    var value, option,
                        options = elem.options,
                        index = elem.selectedIndex,
                        one = elem.type === "select-one" || index < 0,
                        values = one ? null : [],
                        max = one ? index + 1 : options.length,
                        i = index < 0 ?
                            max :
                            one ? index : 0;

                    // Loop through all the selected options
                    for ( ; i < max; i++ ) {
                        option = options[ i ];

                        // oldIE doesn't update selected after form reset (#2551)
                        if ( ( option.selected || i === index ) &&
                                // Don't return options that are disabled or in a disabled optgroup
                            ( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
                            ( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

                            // Get the specific value for the option
                            value = jQuery( option ).val();

                            // We don't need an array for one selects
                            if ( one ) {
                                return value;
                            }

                            // Multi-Selects return an array
                            values.push( value );
                        }
                    }

                    return values;
                },

                set: function( elem, value ) {
                    var optionSet, option,
                        options = elem.options,
                        values = jQuery.makeArray( value ),
                        i = options.length;

                    while ( i-- ) {
                        option = options[ i ];

                        if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

                            // Support: IE6
                            // When new option element is added to select box we need to
                            // force reflow of newly added node in order to workaround delay
                            // of initialization properties
                            try {
                                option.selected = optionSet = true;

                            } catch ( _ ) {

                                // Will be executed only in IE6
                                option.scrollHeight;
                            }

                        } else {
                            option.selected = false;
                        }
                    }

                    // Force browsers to behave consistently when non-matching value is set
                    if ( !optionSet ) {
                        elem.selectedIndex = -1;
                    }

                    return options;
                }
            }
        }
    });

// Radios and checkboxes getter/setter
    jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[ this ] = {
            set: function( elem, value ) {
                if ( jQuery.isArray( value ) ) {
                    return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
                }
            }
        };
        if ( !support.checkOn ) {
            jQuery.valHooks[ this ].get = function( elem ) {
                // Support: Webkit
                // "" is returned instead of "on" if a value isn't specified
                return elem.getAttribute("value") === null ? "on" : elem.value;
            };
        }
    });




    var nodeHook, boolHook,
        attrHandle = jQuery.expr.attrHandle,
        ruseDefault = /^(?:checked|selected)$/i,
        getSetAttribute = support.getSetAttribute,
        getSetInput = support.input;

    jQuery.fn.extend({
        attr: function( name, value ) {
            return access( this, jQuery.attr, name, value, arguments.length > 1 );
        },

        removeAttr: function( name ) {
            return this.each(function() {
                jQuery.removeAttr( this, name );
            });
        }
    });

    jQuery.extend({
        attr: function( elem, name, value ) {
            var hooks, ret,
                nType = elem.nodeType;

            // don't get/set attributes on text, comment and attribute nodes
            if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
                return;
            }

            // Fallback to prop when attributes are not supported
            if ( typeof elem.getAttribute === strundefined ) {
                return jQuery.prop( elem, name, value );
            }

            // All attributes are lowercase
            // Grab necessary hook if one is defined
            if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
                name = name.toLowerCase();
                hooks = jQuery.attrHooks[ name ] ||
                ( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
            }

            if ( value !== undefined ) {

                if ( value === null ) {
                    jQuery.removeAttr( elem, name );

                } else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
                    return ret;

                } else {
                    elem.setAttribute( name, value + "" );
                    return value;
                }

            } else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
                return ret;

            } else {
                ret = jQuery.find.attr( elem, name );

                // Non-existent attributes return null, we normalize to undefined
                return ret == null ?
                    undefined :
                    ret;
            }
        },

        removeAttr: function( elem, value ) {
            var name, propName,
                i = 0,
                attrNames = value && value.match( rnotwhite );

            if ( attrNames && elem.nodeType === 1 ) {
                while ( (name = attrNames[i++]) ) {
                    propName = jQuery.propFix[ name ] || name;

                    // Boolean attributes get special treatment (#10870)
                    if ( jQuery.expr.match.bool.test( name ) ) {
                        // Set corresponding property to false
                        if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
                            elem[ propName ] = false;
                            // Support: IE<9
                            // Also clear defaultChecked/defaultSelected (if appropriate)
                        } else {
                            elem[ jQuery.camelCase( "default-" + name ) ] =
                                elem[ propName ] = false;
                        }

                        // See #9699 for explanation of this approach (setting first, then removal)
                    } else {
                        jQuery.attr( elem, name, "" );
                    }

                    elem.removeAttribute( getSetAttribute ? name : propName );
                }
            }
        },

        attrHooks: {
            type: {
                set: function( elem, value ) {
                    if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
                        // Setting the type on a radio button after the value resets the value in IE6-9
                        // Reset value to default in case type is set after value during creation
                        var val = elem.value;
                        elem.setAttribute( "type", value );
                        if ( val ) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            }
        }
    });

// Hook for boolean attributes
    boolHook = {
        set: function( elem, value, name ) {
            if ( value === false ) {
                // Remove boolean attributes when set to false
                jQuery.removeAttr( elem, name );
            } else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
                // IE<8 needs the *property* name
                elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

                // Use defaultChecked and defaultSelected for oldIE
            } else {
                elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
            }

            return name;
        }
    };

// Retrieve booleans specially
    jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

        var getter = attrHandle[ name ] || jQuery.find.attr;

        attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
            function( elem, name, isXML ) {
                var ret, handle;
                if ( !isXML ) {
                    // Avoid an infinite loop by temporarily removing this function from the getter
                    handle = attrHandle[ name ];
                    attrHandle[ name ] = ret;
                    ret = getter( elem, name, isXML ) != null ?
                        name.toLowerCase() :
                        null;
                    attrHandle[ name ] = handle;
                }
                return ret;
            } :
            function( elem, name, isXML ) {
                if ( !isXML ) {
                    return elem[ jQuery.camelCase( "default-" + name ) ] ?
                        name.toLowerCase() :
                        null;
                }
            };
    });

// fix oldIE attroperties
    if ( !getSetInput || !getSetAttribute ) {
        jQuery.attrHooks.value = {
            set: function( elem, value, name ) {
                if ( jQuery.nodeName( elem, "input" ) ) {
                    // Does not return so that setAttribute is also used
                    elem.defaultValue = value;
                } else {
                    // Use nodeHook if defined (#1954); otherwise setAttribute is fine
                    return nodeHook && nodeHook.set( elem, value, name );
                }
            }
        };
    }

// IE6/7 do not support getting/setting some attributes with get/setAttribute
    if ( !getSetAttribute ) {

        // Use this for any attribute in IE6/7
        // This fixes almost every IE6/7 issue
        nodeHook = {
            set: function( elem, value, name ) {
                // Set the existing or create a new attribute node
                var ret = elem.getAttributeNode( name );
                if ( !ret ) {
                    elem.setAttributeNode(
                        (ret = elem.ownerDocument.createAttribute( name ))
                    );
                }

                ret.value = value += "";

                // Break association with cloned elements by also using setAttribute (#9646)
                if ( name === "value" || value === elem.getAttribute( name ) ) {
                    return value;
                }
            }
        };

        // Some attributes are constructed with empty-string values when not defined
        attrHandle.id = attrHandle.name = attrHandle.coords =
            function( elem, name, isXML ) {
                var ret;
                if ( !isXML ) {
                    return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
                        ret.value :
                        null;
                }
            };

        // Fixing value retrieval on a button requires this module
        jQuery.valHooks.button = {
            get: function( elem, name ) {
                var ret = elem.getAttributeNode( name );
                if ( ret && ret.specified ) {
                    return ret.value;
                }
            },
            set: nodeHook.set
        };

        // Set contenteditable to false on removals(#10429)
        // Setting to empty string throws an error as an invalid value
        jQuery.attrHooks.contenteditable = {
            set: function( elem, value, name ) {
                nodeHook.set( elem, value === "" ? false : value, name );
            }
        };

        // Set width and height to auto instead of 0 on empty string( Bug #8150 )
        // This is for removals
        jQuery.each([ "width", "height" ], function( i, name ) {
            jQuery.attrHooks[ name ] = {
                set: function( elem, value ) {
                    if ( value === "" ) {
                        elem.setAttribute( name, "auto" );
                        return value;
                    }
                }
            };
        });
    }

    if ( !support.style ) {
        jQuery.attrHooks.style = {
            get: function( elem ) {
                // Return undefined in the case of empty string
                // Note: IE uppercases css property names, but if we were to .toLowerCase()
                // .cssText, that would destroy case senstitivity in URL's, like in "background"
                return elem.style.cssText || undefined;
            },
            set: function( elem, value ) {
                return ( elem.style.cssText = value + "" );
            }
        };
    }




    var rfocusable = /^(?:input|select|textarea|button|object)$/i,
        rclickable = /^(?:a|area)$/i;

    jQuery.fn.extend({
        prop: function( name, value ) {
            return access( this, jQuery.prop, name, value, arguments.length > 1 );
        },

        removeProp: function( name ) {
            name = jQuery.propFix[ name ] || name;
            return this.each(function() {
                // try/catch handles cases where IE balks (such as removing a property on window)
                try {
                    this[ name ] = undefined;
                    delete this[ name ];
                } catch( e ) {}
            });
        }
    });

    jQuery.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },

        prop: function( elem, name, value ) {
            var ret, hooks, notxml,
                nType = elem.nodeType;

            // don't get/set properties on text, comment and attribute nodes
            if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
                return;
            }

            notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

            if ( notxml ) {
                // Fix name and attach hooks
                name = jQuery.propFix[ name ] || name;
                hooks = jQuery.propHooks[ name ];
            }

            if ( value !== undefined ) {
                return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
                    ret :
                    ( elem[ name ] = value );

            } else {
                return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
                    ret :
                    elem[ name ];
            }
        },

        propHooks: {
            tabIndex: {
                get: function( elem ) {
                    // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
                    // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                    // Use proper attribute retrieval(#12072)
                    var tabindex = jQuery.find.attr( elem, "tabindex" );

                    return tabindex ?
                        parseInt( tabindex, 10 ) :
                        rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
                            0 :
                            -1;
                }
            }
        }
    });

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
    if ( !support.hrefNormalized ) {
        // href/src property should get the full normalized URL (#10299/#12915)
        jQuery.each([ "href", "src" ], function( i, name ) {
            jQuery.propHooks[ name ] = {
                get: function( elem ) {
                    return elem.getAttribute( name, 4 );
                }
            };
        });
    }

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
    if ( !support.optSelected ) {
        jQuery.propHooks.selected = {
            get: function( elem ) {
                var parent = elem.parentNode;

                if ( parent ) {
                    parent.selectedIndex;

                    // Make sure that it also works with optgroups, see #5701
                    if ( parent.parentNode ) {
                        parent.parentNode.selectedIndex;
                    }
                }
                return null;
            }
        };
    }

    jQuery.each([
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable"
    ], function() {
        jQuery.propFix[ this.toLowerCase() ] = this;
    });

// IE6/7 call enctype encoding
    if ( !support.enctype ) {
        jQuery.propFix.enctype = "encoding";
    }




    var rclass = /[\t\r\n\f]/g;

    jQuery.fn.extend({
        addClass: function( value ) {
            var classes, elem, cur, clazz, j, finalValue,
                i = 0,
                len = this.length,
                proceed = typeof value === "string" && value;

            if ( jQuery.isFunction( value ) ) {
                return this.each(function( j ) {
                    jQuery( this ).addClass( value.call( this, j, this.className ) );
                });
            }

            if ( proceed ) {
                // The disjunction here is for better compressibility (see removeClass)
                classes = ( value || "" ).match( rnotwhite ) || [];

                for ( ; i < len; i++ ) {
                    elem = this[ i ];
                    cur = elem.nodeType === 1 && ( elem.className ?
                        ( " " + elem.className + " " ).replace( rclass, " " ) :
                        " "
                    );

                    if ( cur ) {
                        j = 0;
                        while ( (clazz = classes[j++]) ) {
                            if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
                                cur += clazz + " ";
                            }
                        }

                        // only assign if different to avoid unneeded rendering.
                        finalValue = jQuery.trim( cur );
                        if ( elem.className !== finalValue ) {
                            elem.className = finalValue;
                        }
                    }
                }
            }

            return this;
        },

        removeClass: function( value ) {
            var classes, elem, cur, clazz, j, finalValue,
                i = 0,
                len = this.length,
                proceed = arguments.length === 0 || typeof value === "string" && value;

            if ( jQuery.isFunction( value ) ) {
                return this.each(function( j ) {
                    jQuery( this ).removeClass( value.call( this, j, this.className ) );
                });
            }
            if ( proceed ) {
                classes = ( value || "" ).match( rnotwhite ) || [];

                for ( ; i < len; i++ ) {
                    elem = this[ i ];
                    // This expression is here for better compressibility (see addClass)
                    cur = elem.nodeType === 1 && ( elem.className ?
                        ( " " + elem.className + " " ).replace( rclass, " " ) :
                        ""
                    );

                    if ( cur ) {
                        j = 0;
                        while ( (clazz = classes[j++]) ) {
                            // Remove *all* instances
                            while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
                                cur = cur.replace( " " + clazz + " ", " " );
                            }
                        }

                        // only assign if different to avoid unneeded rendering.
                        finalValue = value ? jQuery.trim( cur ) : "";
                        if ( elem.className !== finalValue ) {
                            elem.className = finalValue;
                        }
                    }
                }
            }

            return this;
        },

        toggleClass: function( value, stateVal ) {
            var type = typeof value;

            if ( typeof stateVal === "boolean" && type === "string" ) {
                return stateVal ? this.addClass( value ) : this.removeClass( value );
            }

            if ( jQuery.isFunction( value ) ) {
                return this.each(function( i ) {
                    jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
                });
            }

            return this.each(function() {
                if ( type === "string" ) {
                    // toggle individual class names
                    var className,
                        i = 0,
                        self = jQuery( this ),
                        classNames = value.match( rnotwhite ) || [];

                    while ( (className = classNames[ i++ ]) ) {
                        // check each className given, space separated list
                        if ( self.hasClass( className ) ) {
                            self.removeClass( className );
                        } else {
                            self.addClass( className );
                        }
                    }

                    // Toggle whole class name
                } else if ( type === strundefined || type === "boolean" ) {
                    if ( this.className ) {
                        // store className if set
                        jQuery._data( this, "__className__", this.className );
                    }

                    // If the element has a class name or if we're passed "false",
                    // then remove the whole classname (if there was one, the above saved it).
                    // Otherwise bring back whatever was previously saved (if anything),
                    // falling back to the empty string if nothing was stored.
                    this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
                }
            });
        },

        hasClass: function( selector ) {
            var className = " " + selector + " ",
                i = 0,
                l = this.length;
            for ( ; i < l; i++ ) {
                if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
                    return true;
                }
            }

            return false;
        }
    });




// Return jQuery for attributes-only inclusion


    jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
    "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
    "change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

        // Handle event binding
        jQuery.fn[ name ] = function( data, fn ) {
            return arguments.length > 0 ?
                this.on( name, null, data, fn ) :
                this.trigger( name );
        };
    });

    jQuery.fn.extend({
        hover: function( fnOver, fnOut ) {
            return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
        },

        bind: function( types, data, fn ) {
            return this.on( types, null, data, fn );
        },
        unbind: function( types, fn ) {
            return this.off( types, null, fn );
        },

        delegate: function( selector, types, data, fn ) {
            return this.on( types, selector, data, fn );
        },
        undelegate: function( selector, types, fn ) {
            // ( namespace ) or ( selector, types [, fn] )
            return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
        }
    });


    var nonce = jQuery.now();

    var rquery = (/\?/);



    var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

    jQuery.parseJSON = function( data ) {
        // Attempt to parse using the native JSON parser first
        if ( window.JSON && window.JSON.parse ) {
            // Support: Android 2.3
            // Workaround failure to string-cast null input
            return window.JSON.parse( data + "" );
        }

        var requireNonComma,
            depth = null,
            str = jQuery.trim( data + "" );

        // Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
        // after removing valid tokens
        return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

            // Force termination if we see a misplaced comma
            if ( requireNonComma && comma ) {
                depth = 0;
            }

            // Perform no more replacements after returning to outermost depth
            if ( depth === 0 ) {
                return token;
            }

            // Commas must not follow "[", "{", or ","
            requireNonComma = open || comma;

            // Determine new depth
            // array/object open ("[" or "{"): depth += true - false (increment)
            // array/object close ("]" or "}"): depth += false - true (decrement)
            // other cases ("," or primitive): depth += true - true (numeric cast)
            depth += !close - !open;

            // Remove this token
            return "";
        }) ) ?
            ( Function( "return " + str ) )() :
            jQuery.error( "Invalid JSON: " + data );
    };


// Cross-browser xml parsing
    jQuery.parseXML = function( data ) {
        var xml, tmp;
        if ( !data || typeof data !== "string" ) {
            return null;
        }
        try {
            if ( window.DOMParser ) { // Standard
                tmp = new DOMParser();
                xml = tmp.parseFromString( data, "text/xml" );
            } else { // IE
                xml = new ActiveXObject( "Microsoft.XMLDOM" );
                xml.async = "false";
                xml.loadXML( data );
            }
        } catch( e ) {
            xml = undefined;
        }
        if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
            jQuery.error( "Invalid XML: " + data );
        }
        return xml;
    };


    var
    // Document location
        ajaxLocParts,
        ajaxLocation,

        rhash = /#.*$/,
        rts = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
    // #7653, #8125, #8152: local protocol detection
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

    /* Prefilters
     * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
     * 2) These are called:
     *    - BEFORE asking for a transport
     *    - AFTER param serialization (s.data is a string if s.processData is true)
     * 3) key is the dataType
     * 4) the catchall symbol "*" can be used
     * 5) execution will start with transport dataType and THEN continue down to "*" if needed
     */
        prefilters = {},

    /* Transports bindings
     * 1) key is the dataType
     * 2) the catchall symbol "*" can be used
     * 3) selection will start with transport dataType and THEN go to "*" if needed
     */
        transports = {},

    // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
        allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
    try {
        ajaxLocation = location.href;
    } catch( e ) {
        // Use the href attribute of an A element
        // since IE will modify it given document.location
        ajaxLocation = document.createElement( "a" );
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href;
    }

// Segment location into parts
    ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
    function addToPrefiltersOrTransports( structure ) {

        // dataTypeExpression is optional and defaults to "*"
        return function( dataTypeExpression, func ) {

            if ( typeof dataTypeExpression !== "string" ) {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }

            var dataType,
                i = 0,
                dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

            if ( jQuery.isFunction( func ) ) {
                // For each dataType in the dataTypeExpression
                while ( (dataType = dataTypes[i++]) ) {
                    // Prepend if requested
                    if ( dataType.charAt( 0 ) === "+" ) {
                        dataType = dataType.slice( 1 ) || "*";
                        (structure[ dataType ] = structure[ dataType ] || []).unshift( func );

                        // Otherwise append
                    } else {
                        (structure[ dataType ] = structure[ dataType ] || []).push( func );
                    }
                }
            }
        };
    }

// Base inspection function for prefilters and transports
    function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

        var inspected = {},
            seekingTransport = ( structure === transports );

        function inspect( dataType ) {
            var selected;
            inspected[ dataType ] = true;
            jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
                var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
                if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
                    options.dataTypes.unshift( dataTypeOrTransport );
                    inspect( dataTypeOrTransport );
                    return false;
                } else if ( seekingTransport ) {
                    return !( selected = dataTypeOrTransport );
                }
            });
            return selected;
        }

        return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
    }

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
    function ajaxExtend( target, src ) {
        var deep, key,
            flatOptions = jQuery.ajaxSettings.flatOptions || {};

        for ( key in src ) {
            if ( src[ key ] !== undefined ) {
                ( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
            }
        }
        if ( deep ) {
            jQuery.extend( true, target, deep );
        }

        return target;
    }

    /* Handles responses to an ajax request:
     * - finds the right dataType (mediates between content-type and expected dataType)
     * - returns the corresponding response
     */
    function ajaxHandleResponses( s, jqXHR, responses ) {
        var firstDataType, ct, finalDataType, type,
            contents = s.contents,
            dataTypes = s.dataTypes;

        // Remove auto dataType and get content-type in the process
        while ( dataTypes[ 0 ] === "*" ) {
            dataTypes.shift();
            if ( ct === undefined ) {
                ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
            }
        }

        // Check if we're dealing with a known content-type
        if ( ct ) {
            for ( type in contents ) {
                if ( contents[ type ] && contents[ type ].test( ct ) ) {
                    dataTypes.unshift( type );
                    break;
                }
            }
        }

        // Check to see if we have a response for the expected dataType
        if ( dataTypes[ 0 ] in responses ) {
            finalDataType = dataTypes[ 0 ];
        } else {
            // Try convertible dataTypes
            for ( type in responses ) {
                if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
                    finalDataType = type;
                    break;
                }
                if ( !firstDataType ) {
                    firstDataType = type;
                }
            }
            // Or just use first one
            finalDataType = finalDataType || firstDataType;
        }

        // If we found a dataType
        // We add the dataType to the list if needed
        // and return the corresponding response
        if ( finalDataType ) {
            if ( finalDataType !== dataTypes[ 0 ] ) {
                dataTypes.unshift( finalDataType );
            }
            return responses[ finalDataType ];
        }
    }

    /* Chain conversions given the request and the original response
     * Also sets the responseXXX fields on the jqXHR instance
     */
    function ajaxConvert( s, response, jqXHR, isSuccess ) {
        var conv2, current, conv, tmp, prev,
            converters = {},
        // Work with a copy of dataTypes in case we need to modify it for conversion
            dataTypes = s.dataTypes.slice();

        // Create converters map with lowercased keys
        if ( dataTypes[ 1 ] ) {
            for ( conv in s.converters ) {
                converters[ conv.toLowerCase() ] = s.converters[ conv ];
            }
        }

        current = dataTypes.shift();

        // Convert to each sequential dataType
        while ( current ) {

            if ( s.responseFields[ current ] ) {
                jqXHR[ s.responseFields[ current ] ] = response;
            }

            // Apply the dataFilter if provided
            if ( !prev && isSuccess && s.dataFilter ) {
                response = s.dataFilter( response, s.dataType );
            }

            prev = current;
            current = dataTypes.shift();

            if ( current ) {

                // There's only work to do if current dataType is non-auto
                if ( current === "*" ) {

                    current = prev;

                    // Convert response if prev dataType is non-auto and differs from current
                } else if ( prev !== "*" && prev !== current ) {

                    // Seek a direct converter
                    conv = converters[ prev + " " + current ] || converters[ "* " + current ];

                    // If none found, seek a pair
                    if ( !conv ) {
                        for ( conv2 in converters ) {

                            // If conv2 outputs current
                            tmp = conv2.split( " " );
                            if ( tmp[ 1 ] === current ) {

                                // If prev can be converted to accepted input
                                conv = converters[ prev + " " + tmp[ 0 ] ] ||
                                converters[ "* " + tmp[ 0 ] ];
                                if ( conv ) {
                                    // Condense equivalence converters
                                    if ( conv === true ) {
                                        conv = converters[ conv2 ];

                                        // Otherwise, insert the intermediate dataType
                                    } else if ( converters[ conv2 ] !== true ) {
                                        current = tmp[ 0 ];
                                        dataTypes.unshift( tmp[ 1 ] );
                                    }
                                    break;
                                }
                            }
                        }
                    }

                    // Apply converter (if not an equivalence)
                    if ( conv !== true ) {

                        // Unless errors are allowed to bubble, catch and return them
                        if ( conv && s[ "throws" ] ) {
                            response = conv( response );
                        } else {
                            try {
                                response = conv( response );
                            } catch ( e ) {
                                return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
                            }
                        }
                    }
                }
            }
        }

        return { state: "success", data: response };
    }

    jQuery.extend({

        // Counter for holding the number of active queries
        active: 0,

        // Last-Modified header cache for next request
        lastModified: {},
        etag: {},

        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            /*
             timeout: 0,
             data: null,
             dataType: null,
             username: null,
             password: null,
             cache: null,
             throws: false,
             traditional: false,
             headers: {},
             */

            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },

            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },

            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },

            // Data converters
            // Keys separate source (or catchall "*") and destination types with a single space
            converters: {

                // Convert anything to text
                "* text": String,

                // Text to html (true = no transformation)
                "text html": true,

                // Evaluate text as a json expression
                "text json": jQuery.parseJSON,

                // Parse text as xml
                "text xml": jQuery.parseXML
            },

            // For options that shouldn't be deep extended:
            // you can add your own custom options here if
            // and when you create one that shouldn't be
            // deep extended (see ajaxExtend)
            flatOptions: {
                url: true,
                context: true
            }
        },

        // Creates a full fledged settings object into target
        // with both ajaxSettings and settings fields.
        // If target is omitted, writes into ajaxSettings.
        ajaxSetup: function( target, settings ) {
            return settings ?

                // Building a settings object
                ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

                // Extending ajaxSettings
                ajaxExtend( jQuery.ajaxSettings, target );
        },

        ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
        ajaxTransport: addToPrefiltersOrTransports( transports ),

        // Main method
        ajax: function( url, options ) {

            // If url is an object, simulate pre-1.5 signature
            if ( typeof url === "object" ) {
                options = url;
                url = undefined;
            }

            // Force options to be an object
            options = options || {};

            var // Cross-domain detection vars
                parts,
            // Loop variable
                i,
            // URL without anti-cache param
                cacheURL,
            // Response headers as string
                responseHeadersString,
            // timeout handle
                timeoutTimer,

            // To know if global events are to be dispatched
                fireGlobals,

                transport,
            // Response headers
                responseHeaders,
            // Create the final options object
                s = jQuery.ajaxSetup( {}, options ),
            // Callbacks context
                callbackContext = s.context || s,
            // Context for global events is callbackContext if it is a DOM node or jQuery collection
                globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
                    jQuery( callbackContext ) :
                    jQuery.event,
            // Deferreds
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks("once memory"),
            // Status-dependent callbacks
                statusCode = s.statusCode || {},
            // Headers (they are sent all at once)
                requestHeaders = {},
                requestHeadersNames = {},
            // The jqXHR state
                state = 0,
            // Default abort message
                strAbort = "canceled",
            // Fake xhr
                jqXHR = {
                    readyState: 0,

                    // Builds headers hashtable if needed
                    getResponseHeader: function( key ) {
                        var match;
                        if ( state === 2 ) {
                            if ( !responseHeaders ) {
                                responseHeaders = {};
                                while ( (match = rheaders.exec( responseHeadersString )) ) {
                                    responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
                                }
                            }
                            match = responseHeaders[ key.toLowerCase() ];
                        }
                        return match == null ? null : match;
                    },

                    // Raw string
                    getAllResponseHeaders: function() {
                        return state === 2 ? responseHeadersString : null;
                    },

                    // Caches the header
                    setRequestHeader: function( name, value ) {
                        var lname = name.toLowerCase();
                        if ( !state ) {
                            name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
                            requestHeaders[ name ] = value;
                        }
                        return this;
                    },

                    // Overrides response content-type header
                    overrideMimeType: function( type ) {
                        if ( !state ) {
                            s.mimeType = type;
                        }
                        return this;
                    },

                    // Status-dependent callbacks
                    statusCode: function( map ) {
                        var code;
                        if ( map ) {
                            if ( state < 2 ) {
                                for ( code in map ) {
                                    // Lazy-add the new callback in a way that preserves old ones
                                    statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
                                }
                            } else {
                                // Execute the appropriate callbacks
                                jqXHR.always( map[ jqXHR.status ] );
                            }
                        }
                        return this;
                    },

                    // Cancel the request
                    abort: function( statusText ) {
                        var finalText = statusText || strAbort;
                        if ( transport ) {
                            transport.abort( finalText );
                        }
                        done( 0, finalText );
                        return this;
                    }
                };

            // Attach deferreds
            deferred.promise( jqXHR ).complete = completeDeferred.add;
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;

            // Remove hash character (#7531: and string promotion)
            // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
            // Handle falsy url in the settings object (#10093: consistency with old signature)
            // We also use the url parameter if available
            s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

            // Alias method option to type as per ticket #12004
            s.type = options.method || options.type || s.method || s.type;

            // Extract dataTypes list
            s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

            // A cross-domain request is in order when we have a protocol:host:port mismatch
            if ( s.crossDomain == null ) {
                parts = rurl.exec( s.url.toLowerCase() );
                s.crossDomain = !!( parts &&
                ( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
                ( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
                ( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
                );
            }

            // Convert data if not already a string
            if ( s.data && s.processData && typeof s.data !== "string" ) {
                s.data = jQuery.param( s.data, s.traditional );
            }

            // Apply prefilters
            inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

            // If request was aborted inside a prefilter, stop there
            if ( state === 2 ) {
                return jqXHR;
            }

            // We can fire global events as of now if asked to
            // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
            fireGlobals = jQuery.event && s.global;

            // Watch for a new set of requests
            if ( fireGlobals && jQuery.active++ === 0 ) {
                jQuery.event.trigger("ajaxStart");
            }

            // Uppercase the type
            s.type = s.type.toUpperCase();

            // Determine if request has content
            s.hasContent = !rnoContent.test( s.type );

            // Save the URL in case we're toying with the If-Modified-Since
            // and/or If-None-Match header later on
            cacheURL = s.url;

            // More options handling for requests with no content
            if ( !s.hasContent ) {

                // If data is available, append data to url
                if ( s.data ) {
                    cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
                    // #9682: remove data so that it's not used in an eventual retry
                    delete s.data;
                }

                // Add anti-cache in url if needed
                if ( s.cache === false ) {
                    s.url = rts.test( cacheURL ) ?

                        // If there is already a '_' parameter, set its value
                        cacheURL.replace( rts, "$1_=" + nonce++ ) :

                        // Otherwise add one to the end
                    cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
                }
            }

            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
            if ( s.ifModified ) {
                if ( jQuery.lastModified[ cacheURL ] ) {
                    jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
                }
                if ( jQuery.etag[ cacheURL ] ) {
                    jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
                }
            }

            // Set the correct header, if data is being sent
            if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
                jqXHR.setRequestHeader( "Content-Type", s.contentType );
            }

            // Set the Accepts header for the server, depending on the dataType
            jqXHR.setRequestHeader(
                "Accept",
                s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
                s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
                    s.accepts[ "*" ]
            );

            // Check for headers option
            for ( i in s.headers ) {
                jqXHR.setRequestHeader( i, s.headers[ i ] );
            }

            // Allow custom headers/mimetypes and early abort
            if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
                // Abort if not done already and return
                return jqXHR.abort();
            }

            // aborting is no longer a cancellation
            strAbort = "abort";

            // Install callbacks on deferreds
            for ( i in { success: 1, error: 1, complete: 1 } ) {
                jqXHR[ i ]( s[ i ] );
            }

            // Get transport
            transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

            // If no transport, we auto-abort
            if ( !transport ) {
                done( -1, "No Transport" );
            } else {
                jqXHR.readyState = 1;

                // Send global event
                if ( fireGlobals ) {
                    globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
                }
                // Timeout
                if ( s.async && s.timeout > 0 ) {
                    timeoutTimer = setTimeout(function() {
                        jqXHR.abort("timeout");
                    }, s.timeout );
                }

                try {
                    state = 1;
                    transport.send( requestHeaders, done );
                } catch ( e ) {
                    // Propagate exception as error if not done
                    if ( state < 2 ) {
                        done( -1, e );
                        // Simply rethrow otherwise
                    } else {
                        throw e;
                    }
                }
            }

            // Callback for when everything is done
            function done( status, nativeStatusText, responses, headers ) {
                var isSuccess, success, error, response, modified,
                    statusText = nativeStatusText;

                // Called once
                if ( state === 2 ) {
                    return;
                }

                // State is "done" now
                state = 2;

                // Clear timeout if it exists
                if ( timeoutTimer ) {
                    clearTimeout( timeoutTimer );
                }

                // Dereference transport for early garbage collection
                // (no matter how long the jqXHR object will be used)
                transport = undefined;

                // Cache response headers
                responseHeadersString = headers || "";

                // Set readyState
                jqXHR.readyState = status > 0 ? 4 : 0;

                // Determine if successful
                isSuccess = status >= 200 && status < 300 || status === 304;

                // Get response data
                if ( responses ) {
                    response = ajaxHandleResponses( s, jqXHR, responses );
                }

                // Convert no matter what (that way responseXXX fields are always set)
                response = ajaxConvert( s, response, jqXHR, isSuccess );

                // If successful, handle type chaining
                if ( isSuccess ) {

                    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                    if ( s.ifModified ) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if ( modified ) {
                            jQuery.lastModified[ cacheURL ] = modified;
                        }
                        modified = jqXHR.getResponseHeader("etag");
                        if ( modified ) {
                            jQuery.etag[ cacheURL ] = modified;
                        }
                    }

                    // if no content
                    if ( status === 204 || s.type === "HEAD" ) {
                        statusText = "nocontent";

                        // if not modified
                    } else if ( status === 304 ) {
                        statusText = "notmodified";

                        // If we have data, let's convert it
                    } else {
                        statusText = response.state;
                        success = response.data;
                        error = response.error;
                        isSuccess = !error;
                    }
                } else {
                    // We extract error from statusText
                    // then normalize statusText and status for non-aborts
                    error = statusText;
                    if ( status || !statusText ) {
                        statusText = "error";
                        if ( status < 0 ) {
                            status = 0;
                        }
                    }
                }

                // Set data for the fake xhr object
                jqXHR.status = status;
                jqXHR.statusText = ( nativeStatusText || statusText ) + "";

                // Success/Error
                if ( isSuccess ) {
                    deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
                } else {
                    deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
                }

                // Status-dependent callbacks
                jqXHR.statusCode( statusCode );
                statusCode = undefined;

                if ( fireGlobals ) {
                    globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
                        [ jqXHR, s, isSuccess ? success : error ] );
                }

                // Complete
                completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

                if ( fireGlobals ) {
                    globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
                    // Handle the global AJAX counter
                    if ( !( --jQuery.active ) ) {
                        jQuery.event.trigger("ajaxStop");
                    }
                }
            }

            return jqXHR;
        },

        getJSON: function( url, data, callback ) {
            return jQuery.get( url, data, callback, "json" );
        },

        getScript: function( url, callback ) {
            return jQuery.get( url, undefined, callback, "script" );
        }
    });

    jQuery.each( [ "get", "post" ], function( i, method ) {
        jQuery[ method ] = function( url, data, callback, type ) {
            // shift arguments if data argument was omitted
            if ( jQuery.isFunction( data ) ) {
                type = type || callback;
                callback = data;
                data = undefined;
            }

            return jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    });


    jQuery._evalUrl = function( url ) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            async: false,
            global: false,
            "throws": true
        });
    };


    jQuery.fn.extend({
        wrapAll: function( html ) {
            if ( jQuery.isFunction( html ) ) {
                return this.each(function(i) {
                    jQuery(this).wrapAll( html.call(this, i) );
                });
            }

            if ( this[0] ) {
                // The elements to wrap the target around
                var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

                if ( this[0].parentNode ) {
                    wrap.insertBefore( this[0] );
                }

                wrap.map(function() {
                    var elem = this;

                    while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
                        elem = elem.firstChild;
                    }

                    return elem;
                }).append( this );
            }

            return this;
        },

        wrapInner: function( html ) {
            if ( jQuery.isFunction( html ) ) {
                return this.each(function(i) {
                    jQuery(this).wrapInner( html.call(this, i) );
                });
            }

            return this.each(function() {
                var self = jQuery( this ),
                    contents = self.contents();

                if ( contents.length ) {
                    contents.wrapAll( html );

                } else {
                    self.append( html );
                }
            });
        },

        wrap: function( html ) {
            var isFunction = jQuery.isFunction( html );

            return this.each(function(i) {
                jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
            });
        },

        unwrap: function() {
            return this.parent().each(function() {
                if ( !jQuery.nodeName( this, "body" ) ) {
                    jQuery( this ).replaceWith( this.childNodes );
                }
            }).end();
        }
    });


    jQuery.expr.filters.hidden = function( elem ) {
        // Support: Opera <= 12.12
        // Opera reports offsetWidths and offsetHeights less than zero on some elements
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
            (!support.reliableHiddenOffsets() &&
            ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
    };

    jQuery.expr.filters.visible = function( elem ) {
        return !jQuery.expr.filters.hidden( elem );
    };




    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;

    function buildParams( prefix, obj, traditional, add ) {
        var name;

        if ( jQuery.isArray( obj ) ) {
            // Serialize array item.
            jQuery.each( obj, function( i, v ) {
                if ( traditional || rbracket.test( prefix ) ) {
                    // Treat each array item as a scalar.
                    add( prefix, v );

                } else {
                    // Item is non-scalar (array or object), encode its numeric index.
                    buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
                }
            });

        } else if ( !traditional && jQuery.type( obj ) === "object" ) {
            // Serialize object item.
            for ( name in obj ) {
                buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
            }

        } else {
            // Serialize scalar item.
            add( prefix, obj );
        }
    }

// Serialize an array of form elements or a set of
// key/values into a query string
    jQuery.param = function( a, traditional ) {
        var prefix,
            s = [],
            add = function( key, value ) {
                // If value is a function, invoke it and return its value
                value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
                s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
            };

        // Set traditional to true for jQuery <= 1.3.2 behavior.
        if ( traditional === undefined ) {
            traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
        }

        // If an array was passed in, assume that it is an array of form elements.
        if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
            // Serialize the form elements
            jQuery.each( a, function() {
                add( this.name, this.value );
            });

        } else {
            // If traditional, encode the "old" way (the way 1.3.2 or older
            // did it), otherwise encode params recursively.
            for ( prefix in a ) {
                buildParams( prefix, a[ prefix ], traditional, add );
            }
        }

        // Return the resulting serialization
        return s.join( "&" ).replace( r20, "+" );
    };

    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param( this.serializeArray() );
        },
        serializeArray: function() {
            return this.map(function() {
                // Can add propHook for "elements" to filter or add form elements
                var elements = jQuery.prop( this, "elements" );
                return elements ? jQuery.makeArray( elements ) : this;
            })
                .filter(function() {
                    var type = this.type;
                    // Use .is(":disabled") so that fieldset[disabled] works
                    return this.name && !jQuery( this ).is( ":disabled" ) &&
                        rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
                        ( this.checked || !rcheckableType.test( type ) );
                })
                .map(function( i, elem ) {
                    var val = jQuery( this ).val();

                    return val == null ?
                        null :
                        jQuery.isArray( val ) ?
                            jQuery.map( val, function( val ) {
                                return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
                            }) :
                        { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
                }).get();
        }
    });


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
    jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
        // Support: IE6+
        function() {

            // XHR cannot access local files, always use ActiveX for that case
            return !this.isLocal &&

                    // Support: IE7-8
                    // oldIE XHR does not support non-RFC2616 methods (#13240)
                    // See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
                    // and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
                    // Although this check for six methods instead of eight
                    // since IE also does not support "trace" and "connect"
                /^(get|post|head|put|delete|options)$/i.test( this.type ) &&

                createStandardXHR() || createActiveXHR();
        } :
        // For all other browsers, use the standard XMLHttpRequest object
        createStandardXHR;

    var xhrId = 0,
        xhrCallbacks = {},
        xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
    if ( window.attachEvent ) {
        window.attachEvent( "onunload", function() {
            for ( var key in xhrCallbacks ) {
                xhrCallbacks[ key ]( undefined, true );
            }
        });
    }

// Determine support properties
    support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
    xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
    if ( xhrSupported ) {

        jQuery.ajaxTransport(function( options ) {
            // Cross domain only allowed if supported through XMLHttpRequest
            if ( !options.crossDomain || support.cors ) {

                var callback;

                return {
                    send: function( headers, complete ) {
                        var i,
                            xhr = options.xhr(),
                            id = ++xhrId;

                        // Open the socket
                        xhr.open( options.type, options.url, options.async, options.username, options.password );

                        // Apply custom fields if provided
                        if ( options.xhrFields ) {
                            for ( i in options.xhrFields ) {
                                xhr[ i ] = options.xhrFields[ i ];
                            }
                        }

                        // Override mime type if needed
                        if ( options.mimeType && xhr.overrideMimeType ) {
                            xhr.overrideMimeType( options.mimeType );
                        }

                        // X-Requested-With header
                        // For cross-domain requests, seeing as conditions for a preflight are
                        // akin to a jigsaw puzzle, we simply never set it to be sure.
                        // (it can always be set on a per-request basis or even using ajaxSetup)
                        // For same-domain requests, won't change header if already provided.
                        if ( !options.crossDomain && !headers["X-Requested-With"] ) {
                            headers["X-Requested-With"] = "XMLHttpRequest";
                        }

                        // Set headers
                        for ( i in headers ) {
                            // Support: IE<9
                            // IE's ActiveXObject throws a 'Type Mismatch' exception when setting
                            // request header to a null-value.
                            //
                            // To keep consistent with other XHR implementations, cast the value
                            // to string and ignore `undefined`.
                            if ( headers[ i ] !== undefined ) {
                                xhr.setRequestHeader( i, headers[ i ] + "" );
                            }
                        }

                        // Do send the request
                        // This may raise an exception which is actually
                        // handled in jQuery.ajax (so no try/catch here)
                        xhr.send( ( options.hasContent && options.data ) || null );

                        // Listener
                        callback = function( _, isAbort ) {
                            var status, statusText, responses;

                            // Was never called and is aborted or complete
                            if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
                                // Clean up
                                delete xhrCallbacks[ id ];
                                callback = undefined;
                                xhr.onreadystatechange = jQuery.noop;

                                // Abort manually if needed
                                if ( isAbort ) {
                                    if ( xhr.readyState !== 4 ) {
                                        xhr.abort();
                                    }
                                } else {
                                    responses = {};
                                    status = xhr.status;

                                    // Support: IE<10
                                    // Accessing binary-data responseText throws an exception
                                    // (#11426)
                                    if ( typeof xhr.responseText === "string" ) {
                                        responses.text = xhr.responseText;
                                    }

                                    // Firefox throws an exception when accessing
                                    // statusText for faulty cross-domain requests
                                    try {
                                        statusText = xhr.statusText;
                                    } catch( e ) {
                                        // We normalize with Webkit giving an empty statusText
                                        statusText = "";
                                    }

                                    // Filter status for non standard behaviors

                                    // If the request is local and we have data: assume a success
                                    // (success with no data won't get notified, that's the best we
                                    // can do given current implementations)
                                    if ( !status && options.isLocal && !options.crossDomain ) {
                                        status = responses.text ? 200 : 404;
                                        // IE - #1450: sometimes returns 1223 when it should be 204
                                    } else if ( status === 1223 ) {
                                        status = 204;
                                    }
                                }
                            }

                            // Call complete if needed
                            if ( responses ) {
                                complete( status, statusText, responses, xhr.getAllResponseHeaders() );
                            }
                        };

                        if ( !options.async ) {
                            // if we're in sync mode we fire the callback
                            callback();
                        } else if ( xhr.readyState === 4 ) {
                            // (IE6 & IE7) if it's in cache and has been
                            // retrieved directly we need to fire the callback
                            setTimeout( callback );
                        } else {
                            // Add to the list of active xhr callbacks
                            xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
                        }
                    },

                    abort: function() {
                        if ( callback ) {
                            callback( undefined, true );
                        }
                    }
                };
            }
        });
    }

// Functions to create xhrs
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch( e ) {}
    }

    function createActiveXHR() {
        try {
            return new window.ActiveXObject( "Microsoft.XMLHTTP" );
        } catch( e ) {}
    }




// Install script dataType
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function( text ) {
                jQuery.globalEval( text );
                return text;
            }
        }
    });

// Handle cache's special case and global
    jQuery.ajaxPrefilter( "script", function( s ) {
        if ( s.cache === undefined ) {
            s.cache = false;
        }
        if ( s.crossDomain ) {
            s.type = "GET";
            s.global = false;
        }
    });

// Bind script tag hack transport
    jQuery.ajaxTransport( "script", function(s) {

        // This transport only deals with cross domain requests
        if ( s.crossDomain ) {

            var script,
                head = document.head || jQuery("head")[0] || document.documentElement;

            return {

                send: function( _, callback ) {

                    script = document.createElement("script");

                    script.async = true;

                    if ( s.scriptCharset ) {
                        script.charset = s.scriptCharset;
                    }

                    script.src = s.url;

                    // Attach handlers for all browsers
                    script.onload = script.onreadystatechange = function( _, isAbort ) {

                        if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

                            // Handle memory leak in IE
                            script.onload = script.onreadystatechange = null;

                            // Remove the script
                            if ( script.parentNode ) {
                                script.parentNode.removeChild( script );
                            }

                            // Dereference the script
                            script = null;

                            // Callback if not abort
                            if ( !isAbort ) {
                                callback( 200, "success" );
                            }
                        }
                    };

                    // Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
                    // Use native DOM manipulation to avoid our domManip AJAX trickery
                    head.insertBefore( script, head.firstChild );
                },

                abort: function() {
                    if ( script ) {
                        script.onload( undefined, true );
                    }
                }
            };
        }
    });




    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
            this[ callback ] = true;
            return callback;
        }
    });

// Detect, normalize options and install callbacks for jsonp requests
    jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

        var callbackName, overwritten, responseContainer,
            jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
                    "url" :
                typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
                );

        // Handle iff the expected data type is "jsonp" or we have a parameter to set
        if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

            // Get callback name, remembering preexisting value associated with it
            callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
                s.jsonpCallback() :
                s.jsonpCallback;

            // Insert callback into url or form data
            if ( jsonProp ) {
                s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
            } else if ( s.jsonp !== false ) {
                s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
            }

            // Use data converter to retrieve json after script execution
            s.converters["script json"] = function() {
                if ( !responseContainer ) {
                    jQuery.error( callbackName + " was not called" );
                }
                return responseContainer[ 0 ];
            };

            // force json dataType
            s.dataTypes[ 0 ] = "json";

            // Install callback
            overwritten = window[ callbackName ];
            window[ callbackName ] = function() {
                responseContainer = arguments;
            };

            // Clean-up function (fires after converters)
            jqXHR.always(function() {
                // Restore preexisting value
                window[ callbackName ] = overwritten;

                // Save back as free
                if ( s[ callbackName ] ) {
                    // make sure that re-using the options doesn't screw things around
                    s.jsonpCallback = originalSettings.jsonpCallback;

                    // save the callback name for future use
                    oldCallbacks.push( callbackName );
                }

                // Call if it was a function and we have a response
                if ( responseContainer && jQuery.isFunction( overwritten ) ) {
                    overwritten( responseContainer[ 0 ] );
                }

                responseContainer = overwritten = undefined;
            });

            // Delegate to script
            return "script";
        }
    });




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
    jQuery.parseHTML = function( data, context, keepScripts ) {
        if ( !data || typeof data !== "string" ) {
            return null;
        }
        if ( typeof context === "boolean" ) {
            keepScripts = context;
            context = false;
        }
        context = context || document;

        var parsed = rsingleTag.exec( data ),
            scripts = !keepScripts && [];

        // Single tag
        if ( parsed ) {
            return [ context.createElement( parsed[1] ) ];
        }

        parsed = jQuery.buildFragment( [ data ], context, scripts );

        if ( scripts && scripts.length ) {
            jQuery( scripts ).remove();
        }

        return jQuery.merge( [], parsed.childNodes );
    };


// Keep a copy of the old load method
    var _load = jQuery.fn.load;

    /**
     * Load a url into a page
     */
    jQuery.fn.load = function( url, params, callback ) {
        if ( typeof url !== "string" && _load ) {
            return _load.apply( this, arguments );
        }

        var selector, response, type,
            self = this,
            off = url.indexOf(" ");

        if ( off >= 0 ) {
            selector = jQuery.trim( url.slice( off, url.length ) );
            url = url.slice( 0, off );
        }

        // If it's a function
        if ( jQuery.isFunction( params ) ) {

            // We assume that it's the callback
            callback = params;
            params = undefined;

            // Otherwise, build a param string
        } else if ( params && typeof params === "object" ) {
            type = "POST";
        }

        // If we have elements to modify, make the request
        if ( self.length > 0 ) {
            jQuery.ajax({
                url: url,

                // if "type" variable is undefined, then "GET" method will be used
                type: type,
                dataType: "html",
                data: params
            }).done(function( responseText ) {

                // Save response for use in complete callback
                response = arguments;

                self.html( selector ?

                    // If a selector was specified, locate the right elements in a dummy div
                    // Exclude scripts to avoid IE 'Permission Denied' errors
                    jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

                    // Otherwise use the full result
                    responseText );

            }).complete( callback && function( jqXHR, status ) {
                self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
            });
        }

        return this;
    };




// Attach a bunch of functions for handling common AJAX events
    jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
        jQuery.fn[ type ] = function( fn ) {
            return this.on( type, fn );
        };
    });




    jQuery.expr.filters.animated = function( elem ) {
        return jQuery.grep(jQuery.timers, function( fn ) {
            return elem === fn.elem;
        }).length;
    };





    var docElem = window.document.documentElement;

    /**
     * Gets a window from an element
     */
    function getWindow( elem ) {
        return jQuery.isWindow( elem ) ?
            elem :
            elem.nodeType === 9 ?
            elem.defaultView || elem.parentWindow :
                false;
    }

    jQuery.offset = {
        setOffset: function( elem, options, i ) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
                position = jQuery.css( elem, "position" ),
                curElem = jQuery( elem ),
                props = {};

            // set position first, in-case top/left are set even on static elem
            if ( position === "static" ) {
                elem.style.position = "relative";
            }

            curOffset = curElem.offset();
            curCSSTop = jQuery.css( elem, "top" );
            curCSSLeft = jQuery.css( elem, "left" );
            calculatePosition = ( position === "absolute" || position === "fixed" ) &&
            jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

            // need to be able to calculate position if either top or left is auto and position is either absolute or fixed
            if ( calculatePosition ) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;
            } else {
                curTop = parseFloat( curCSSTop ) || 0;
                curLeft = parseFloat( curCSSLeft ) || 0;
            }

            if ( jQuery.isFunction( options ) ) {
                options = options.call( elem, i, curOffset );
            }

            if ( options.top != null ) {
                props.top = ( options.top - curOffset.top ) + curTop;
            }
            if ( options.left != null ) {
                props.left = ( options.left - curOffset.left ) + curLeft;
            }

            if ( "using" in options ) {
                options.using.call( elem, props );
            } else {
                curElem.css( props );
            }
        }
    };

    jQuery.fn.extend({
        offset: function( options ) {
            if ( arguments.length ) {
                return options === undefined ?
                    this :
                    this.each(function( i ) {
                        jQuery.offset.setOffset( this, options, i );
                    });
            }

            var docElem, win,
                box = { top: 0, left: 0 },
                elem = this[ 0 ],
                doc = elem && elem.ownerDocument;

            if ( !doc ) {
                return;
            }

            docElem = doc.documentElement;

            // Make sure it's not a disconnected DOM node
            if ( !jQuery.contains( docElem, elem ) ) {
                return box;
            }

            // If we don't have gBCR, just use 0,0 rather than error
            // BlackBerry 5, iOS 3 (original iPhone)
            if ( typeof elem.getBoundingClientRect !== strundefined ) {
                box = elem.getBoundingClientRect();
            }
            win = getWindow( doc );
            return {
                top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
                left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
            };
        },

        position: function() {
            if ( !this[ 0 ] ) {
                return;
            }

            var offsetParent, offset,
                parentOffset = { top: 0, left: 0 },
                elem = this[ 0 ];

            // fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
            if ( jQuery.css( elem, "position" ) === "fixed" ) {
                // we assume that getBoundingClientRect is available when computed position is fixed
                offset = elem.getBoundingClientRect();
            } else {
                // Get *real* offsetParent
                offsetParent = this.offsetParent();

                // Get correct offsets
                offset = this.offset();
                if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
                    parentOffset = offsetParent.offset();
                }

                // Add offsetParent borders
                parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
                parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
            }

            // Subtract parent offsets and element margins
            // note: when an element has margin: auto the offsetLeft and marginLeft
            // are the same in Safari causing offset.left to incorrectly be 0
            return {
                top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
                left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
            };
        },

        offsetParent: function() {
            return this.map(function() {
                var offsetParent = this.offsetParent || docElem;

                while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent || docElem;
            });
        }
    });

// Create scrollLeft and scrollTop methods
    jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
        var top = /Y/.test( prop );

        jQuery.fn[ method ] = function( val ) {
            return access( this, function( elem, method, val ) {
                var win = getWindow( elem );

                if ( val === undefined ) {
                    return win ? (prop in win) ? win[ prop ] :
                        win.document.documentElement[ method ] :
                        elem[ method ];
                }

                if ( win ) {
                    win.scrollTo(
                        !top ? val : jQuery( win ).scrollLeft(),
                        top ? val : jQuery( win ).scrollTop()
                    );

                } else {
                    elem[ method ] = val;
                }
            }, method, val, arguments.length, null );
        };
    });

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
    jQuery.each( [ "top", "left" ], function( i, prop ) {
        jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
            function( elem, computed ) {
                if ( computed ) {
                    computed = curCSS( elem, prop );
                    // if curCSS returns percentage, fallback to offset
                    return rnumnonpx.test( computed ) ?
                    jQuery( elem ).position()[ prop ] + "px" :
                        computed;
                }
            }
        );
    });


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
    jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
        jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
            // margin is only for outerHeight, outerWidth
            jQuery.fn[ funcName ] = function( margin, value ) {
                var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
                    extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

                return access( this, function( elem, type, value ) {
                    var doc;

                    if ( jQuery.isWindow( elem ) ) {
                        // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
                        // isn't a whole lot we can do. See pull request at this URL for discussion:
                        // https://github.com/jquery/jquery/pull/764
                        return elem.document.documentElement[ "client" + name ];
                    }

                    // Get document width or height
                    if ( elem.nodeType === 9 ) {
                        doc = elem.documentElement;

                        // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
                        // unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
                        return Math.max(
                            elem.body[ "scroll" + name ], doc[ "scroll" + name ],
                            elem.body[ "offset" + name ], doc[ "offset" + name ],
                            doc[ "client" + name ]
                        );
                    }

                    return value === undefined ?
                        // Get width or height on the element, requesting but not forcing parseFloat
                        jQuery.css( elem, type, extra ) :

                        // Set width or height on the element
                        jQuery.style( elem, type, value, extra );
                }, type, chainable ? margin : undefined, chainable, null );
            };
        });
    });


// The number of elements contained in the matched element set
    jQuery.fn.size = function() {
        return this.length;
    };

    jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

    if ( typeof define === "function" && define.amd ) {
        define( "jquery", [], function() {
            return jQuery;
        });
    }




    var
    // Map over jQuery in case of overwrite
        _jQuery = window.jQuery,

    // Map over the $ in case of overwrite
        _$ = window.$;

    jQuery.noConflict = function( deep ) {
        if ( window.$ === jQuery ) {
            window.$ = _$;
        }

        if ( deep && window.jQuery === jQuery ) {
            window.jQuery = _jQuery;
        }

        return jQuery;
    };

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
    if ( typeof noGlobal === strundefined ) {
        window.jQuery = window.$ = jQuery;
    }




    return jQuery;

}));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJqcXVlcnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXHJcbiAqIGpRdWVyeSBKYXZhU2NyaXB0IExpYnJhcnkgdjEuMTEuMlxyXG4gKiBodHRwOi8vanF1ZXJ5LmNvbS9cclxuICpcclxuICogSW5jbHVkZXMgU2l6emxlLmpzXHJcbiAqIGh0dHA6Ly9zaXp6bGVqcy5jb20vXHJcbiAqXHJcbiAqIENvcHlyaWdodCAyMDA1LCAyMDE0IGpRdWVyeSBGb3VuZGF0aW9uLCBJbmMuIGFuZCBvdGhlciBjb250cmlidXRvcnNcclxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqIGh0dHA6Ly9qcXVlcnkub3JnL2xpY2Vuc2VcclxuICpcclxuICogRGF0ZTogMjAxNC0xMi0xN1QxNToyN1pcclxuICovXHJcblxyXG4oZnVuY3Rpb24oIGdsb2JhbCwgZmFjdG9yeSApIHtcclxuXHJcbiAgICBpZiAoIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiICkge1xyXG4gICAgICAgIC8vIEZvciBDb21tb25KUyBhbmQgQ29tbW9uSlMtbGlrZSBlbnZpcm9ubWVudHMgd2hlcmUgYSBwcm9wZXIgd2luZG93IGlzIHByZXNlbnQsXHJcbiAgICAgICAgLy8gZXhlY3V0ZSB0aGUgZmFjdG9yeSBhbmQgZ2V0IGpRdWVyeVxyXG4gICAgICAgIC8vIEZvciBlbnZpcm9ubWVudHMgdGhhdCBkbyBub3QgaW5oZXJlbnRseSBwb3NzZXMgYSB3aW5kb3cgd2l0aCBhIGRvY3VtZW50XHJcbiAgICAgICAgLy8gKHN1Y2ggYXMgTm9kZS5qcyksIGV4cG9zZSBhIGpRdWVyeS1tYWtpbmcgZmFjdG9yeSBhcyBtb2R1bGUuZXhwb3J0c1xyXG4gICAgICAgIC8vIFRoaXMgYWNjZW50dWF0ZXMgdGhlIG5lZWQgZm9yIHRoZSBjcmVhdGlvbiBvZiBhIHJlYWwgd2luZG93XHJcbiAgICAgICAgLy8gZS5nLiB2YXIgalF1ZXJ5ID0gcmVxdWlyZShcImpxdWVyeVwiKSh3aW5kb3cpO1xyXG4gICAgICAgIC8vIFNlZSB0aWNrZXQgIzE0NTQ5IGZvciBtb3JlIGluZm9cclxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbC5kb2N1bWVudCA/XHJcbiAgICAgICAgICAgIGZhY3RvcnkoIGdsb2JhbCwgdHJ1ZSApIDpcclxuICAgICAgICAgICAgZnVuY3Rpb24oIHcgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoICF3LmRvY3VtZW50ICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvciggXCJqUXVlcnkgcmVxdWlyZXMgYSB3aW5kb3cgd2l0aCBhIGRvY3VtZW50XCIgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWN0b3J5KCB3ICk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZhY3RvcnkoIGdsb2JhbCApO1xyXG4gICAgfVxyXG5cclxuLy8gUGFzcyB0aGlzIGlmIHdpbmRvdyBpcyBub3QgZGVmaW5lZCB5ZXRcclxufSh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdGhpcywgZnVuY3Rpb24oIHdpbmRvdywgbm9HbG9iYWwgKSB7XHJcblxyXG4vLyBDYW4ndCBkbyB0aGlzIGJlY2F1c2Ugc2V2ZXJhbCBhcHBzIGluY2x1ZGluZyBBU1AuTkVUIHRyYWNlXHJcbi8vIHRoZSBzdGFjayB2aWEgYXJndW1lbnRzLmNhbGxlci5jYWxsZWUgYW5kIEZpcmVmb3ggZGllcyBpZlxyXG4vLyB5b3UgdHJ5IHRvIHRyYWNlIHRocm91Z2ggXCJ1c2Ugc3RyaWN0XCIgY2FsbCBjaGFpbnMuICgjMTMzMzUpXHJcbi8vIFN1cHBvcnQ6IEZpcmVmb3ggMTgrXHJcbi8vXHJcblxyXG4gICAgdmFyIGRlbGV0ZWRJZHMgPSBbXTtcclxuXHJcbiAgICB2YXIgc2xpY2UgPSBkZWxldGVkSWRzLnNsaWNlO1xyXG5cclxuICAgIHZhciBjb25jYXQgPSBkZWxldGVkSWRzLmNvbmNhdDtcclxuXHJcbiAgICB2YXIgcHVzaCA9IGRlbGV0ZWRJZHMucHVzaDtcclxuXHJcbiAgICB2YXIgaW5kZXhPZiA9IGRlbGV0ZWRJZHMuaW5kZXhPZjtcclxuXHJcbiAgICB2YXIgY2xhc3MydHlwZSA9IHt9O1xyXG5cclxuICAgIHZhciB0b1N0cmluZyA9IGNsYXNzMnR5cGUudG9TdHJpbmc7XHJcblxyXG4gICAgdmFyIGhhc093biA9IGNsYXNzMnR5cGUuaGFzT3duUHJvcGVydHk7XHJcblxyXG4gICAgdmFyIHN1cHBvcnQgPSB7fTtcclxuXHJcblxyXG5cclxuICAgIHZhclxyXG4gICAgICAgIHZlcnNpb24gPSBcIjEuMTEuMlwiLFxyXG5cclxuICAgIC8vIERlZmluZSBhIGxvY2FsIGNvcHkgb2YgalF1ZXJ5XHJcbiAgICAgICAgalF1ZXJ5ID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0ICkge1xyXG4gICAgICAgICAgICAvLyBUaGUgalF1ZXJ5IG9iamVjdCBpcyBhY3R1YWxseSBqdXN0IHRoZSBpbml0IGNvbnN0cnVjdG9yICdlbmhhbmNlZCdcclxuICAgICAgICAgICAgLy8gTmVlZCBpbml0IGlmIGpRdWVyeSBpcyBjYWxsZWQgKGp1c3QgYWxsb3cgZXJyb3IgdG8gYmUgdGhyb3duIGlmIG5vdCBpbmNsdWRlZClcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBqUXVlcnkuZm4uaW5pdCggc2VsZWN0b3IsIGNvbnRleHQgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgIC8vIFN1cHBvcnQ6IEFuZHJvaWQ8NC4xLCBJRTw5XHJcbiAgICAvLyBNYWtlIHN1cmUgd2UgdHJpbSBCT00gYW5kIE5CU1BcclxuICAgICAgICBydHJpbSA9IC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZyxcclxuXHJcbiAgICAvLyBNYXRjaGVzIGRhc2hlZCBzdHJpbmcgZm9yIGNhbWVsaXppbmdcclxuICAgICAgICBybXNQcmVmaXggPSAvXi1tcy0vLFxyXG4gICAgICAgIHJkYXNoQWxwaGEgPSAvLShbXFxkYS16XSkvZ2ksXHJcblxyXG4gICAgLy8gVXNlZCBieSBqUXVlcnkuY2FtZWxDYXNlIGFzIGNhbGxiYWNrIHRvIHJlcGxhY2UoKVxyXG4gICAgICAgIGZjYW1lbENhc2UgPSBmdW5jdGlvbiggYWxsLCBsZXR0ZXIgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsZXR0ZXIudG9VcHBlckNhc2UoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgIGpRdWVyeS5mbiA9IGpRdWVyeS5wcm90b3R5cGUgPSB7XHJcbiAgICAgICAgLy8gVGhlIGN1cnJlbnQgdmVyc2lvbiBvZiBqUXVlcnkgYmVpbmcgdXNlZFxyXG4gICAgICAgIGpxdWVyeTogdmVyc2lvbixcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3I6IGpRdWVyeSxcclxuXHJcbiAgICAgICAgLy8gU3RhcnQgd2l0aCBhbiBlbXB0eSBzZWxlY3RvclxyXG4gICAgICAgIHNlbGVjdG9yOiBcIlwiLFxyXG5cclxuICAgICAgICAvLyBUaGUgZGVmYXVsdCBsZW5ndGggb2YgYSBqUXVlcnkgb2JqZWN0IGlzIDBcclxuICAgICAgICBsZW5ndGg6IDAsXHJcblxyXG4gICAgICAgIHRvQXJyYXk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2xpY2UuY2FsbCggdGhpcyApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgTnRoIGVsZW1lbnQgaW4gdGhlIG1hdGNoZWQgZWxlbWVudCBzZXQgT1JcclxuICAgICAgICAvLyBHZXQgdGhlIHdob2xlIG1hdGNoZWQgZWxlbWVudCBzZXQgYXMgYSBjbGVhbiBhcnJheVxyXG4gICAgICAgIGdldDogZnVuY3Rpb24oIG51bSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bSAhPSBudWxsID9cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4ganVzdCB0aGUgb25lIGVsZW1lbnQgZnJvbSB0aGUgc2V0XHJcbiAgICAgICAgICAgICAgICAoIG51bSA8IDAgPyB0aGlzWyBudW0gKyB0aGlzLmxlbmd0aCBdIDogdGhpc1sgbnVtIF0gKSA6XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIGFsbCB0aGUgZWxlbWVudHMgaW4gYSBjbGVhbiBhcnJheVxyXG4gICAgICAgICAgICAgICAgc2xpY2UuY2FsbCggdGhpcyApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIFRha2UgYW4gYXJyYXkgb2YgZWxlbWVudHMgYW5kIHB1c2ggaXQgb250byB0aGUgc3RhY2tcclxuICAgICAgICAvLyAocmV0dXJuaW5nIHRoZSBuZXcgbWF0Y2hlZCBlbGVtZW50IHNldClcclxuICAgICAgICBwdXNoU3RhY2s6IGZ1bmN0aW9uKCBlbGVtcyApIHtcclxuXHJcbiAgICAgICAgICAgIC8vIEJ1aWxkIGEgbmV3IGpRdWVyeSBtYXRjaGVkIGVsZW1lbnQgc2V0XHJcbiAgICAgICAgICAgIHZhciByZXQgPSBqUXVlcnkubWVyZ2UoIHRoaXMuY29uc3RydWN0b3IoKSwgZWxlbXMgKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgb2xkIG9iamVjdCBvbnRvIHRoZSBzdGFjayAoYXMgYSByZWZlcmVuY2UpXHJcbiAgICAgICAgICAgIHJldC5wcmV2T2JqZWN0ID0gdGhpcztcclxuICAgICAgICAgICAgcmV0LmNvbnRleHQgPSB0aGlzLmNvbnRleHQ7XHJcblxyXG4gICAgICAgICAgICAvLyBSZXR1cm4gdGhlIG5ld2x5LWZvcm1lZCBlbGVtZW50IHNldFxyXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEV4ZWN1dGUgYSBjYWxsYmFjayBmb3IgZXZlcnkgZWxlbWVudCBpbiB0aGUgbWF0Y2hlZCBzZXQuXHJcbiAgICAgICAgLy8gKFlvdSBjYW4gc2VlZCB0aGUgYXJndW1lbnRzIHdpdGggYW4gYXJyYXkgb2YgYXJncywgYnV0IHRoaXMgaXNcclxuICAgICAgICAvLyBvbmx5IHVzZWQgaW50ZXJuYWxseS4pXHJcbiAgICAgICAgZWFjaDogZnVuY3Rpb24oIGNhbGxiYWNrLCBhcmdzICkge1xyXG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5LmVhY2goIHRoaXMsIGNhbGxiYWNrLCBhcmdzICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbWFwOiBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2hTdGFjayggalF1ZXJ5Lm1hcCh0aGlzLCBmdW5jdGlvbiggZWxlbSwgaSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjay5jYWxsKCBlbGVtLCBpLCBlbGVtICk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzbGljZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2hTdGFjayggc2xpY2UuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZmlyc3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lcSggMCApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGxhc3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lcSggLTEgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBlcTogZnVuY3Rpb24oIGkgKSB7XHJcbiAgICAgICAgICAgIHZhciBsZW4gPSB0aGlzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGogPSAraSArICggaSA8IDAgPyBsZW4gOiAwICk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2hTdGFjayggaiA+PSAwICYmIGogPCBsZW4gPyBbIHRoaXNbal0gXSA6IFtdICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZW5kOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJldk9iamVjdCB8fCB0aGlzLmNvbnN0cnVjdG9yKG51bGwpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEZvciBpbnRlcm5hbCB1c2Ugb25seS5cclxuICAgICAgICAvLyBCZWhhdmVzIGxpa2UgYW4gQXJyYXkncyBtZXRob2QsIG5vdCBsaWtlIGEgalF1ZXJ5IG1ldGhvZC5cclxuICAgICAgICBwdXNoOiBwdXNoLFxyXG4gICAgICAgIHNvcnQ6IGRlbGV0ZWRJZHMuc29ydCxcclxuICAgICAgICBzcGxpY2U6IGRlbGV0ZWRJZHMuc3BsaWNlXHJcbiAgICB9O1xyXG5cclxuICAgIGpRdWVyeS5leHRlbmQgPSBqUXVlcnkuZm4uZXh0ZW5kID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHNyYywgY29weUlzQXJyYXksIGNvcHksIG5hbWUsIG9wdGlvbnMsIGNsb25lLFxyXG4gICAgICAgICAgICB0YXJnZXQgPSBhcmd1bWVudHNbMF0gfHwge30sXHJcbiAgICAgICAgICAgIGkgPSAxLFxyXG4gICAgICAgICAgICBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxyXG4gICAgICAgICAgICBkZWVwID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIEhhbmRsZSBhIGRlZXAgY29weSBzaXR1YXRpb25cclxuICAgICAgICBpZiAoIHR5cGVvZiB0YXJnZXQgPT09IFwiYm9vbGVhblwiICkge1xyXG4gICAgICAgICAgICBkZWVwID0gdGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgLy8gc2tpcCB0aGUgYm9vbGVhbiBhbmQgdGhlIHRhcmdldFxyXG4gICAgICAgICAgICB0YXJnZXQgPSBhcmd1bWVudHNbIGkgXSB8fCB7fTtcclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSGFuZGxlIGNhc2Ugd2hlbiB0YXJnZXQgaXMgYSBzdHJpbmcgb3Igc29tZXRoaW5nIChwb3NzaWJsZSBpbiBkZWVwIGNvcHkpXHJcbiAgICAgICAgaWYgKCB0eXBlb2YgdGFyZ2V0ICE9PSBcIm9iamVjdFwiICYmICFqUXVlcnkuaXNGdW5jdGlvbih0YXJnZXQpICkge1xyXG4gICAgICAgICAgICB0YXJnZXQgPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGV4dGVuZCBqUXVlcnkgaXRzZWxmIGlmIG9ubHkgb25lIGFyZ3VtZW50IGlzIHBhc3NlZFxyXG4gICAgICAgIGlmICggaSA9PT0gbGVuZ3RoICkge1xyXG4gICAgICAgICAgICB0YXJnZXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpLS07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgLy8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xyXG4gICAgICAgICAgICBpZiAoIChvcHRpb25zID0gYXJndW1lbnRzWyBpIF0pICE9IG51bGwgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFeHRlbmQgdGhlIGJhc2Ugb2JqZWN0XHJcbiAgICAgICAgICAgICAgICBmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjID0gdGFyZ2V0WyBuYW1lIF07XHJcbiAgICAgICAgICAgICAgICAgICAgY29weSA9IG9wdGlvbnNbIG5hbWUgXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJldmVudCBuZXZlci1lbmRpbmcgbG9vcFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggdGFyZ2V0ID09PSBjb3B5ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlY3Vyc2UgaWYgd2UncmUgbWVyZ2luZyBwbGFpbiBvYmplY3RzIG9yIGFycmF5c1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggZGVlcCAmJiBjb3B5ICYmICggalF1ZXJ5LmlzUGxhaW5PYmplY3QoY29weSkgfHwgKGNvcHlJc0FycmF5ID0galF1ZXJ5LmlzQXJyYXkoY29weSkpICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggY29weUlzQXJyYXkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3B5SXNBcnJheSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmUgPSBzcmMgJiYgalF1ZXJ5LmlzQXJyYXkoc3JjKSA/IHNyYyA6IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lID0gc3JjICYmIGpRdWVyeS5pc1BsYWluT2JqZWN0KHNyYykgPyBzcmMgOiB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmV2ZXIgbW92ZSBvcmlnaW5hbCBvYmplY3RzLCBjbG9uZSB0aGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFsgbmFtZSBdID0galF1ZXJ5LmV4dGVuZCggZGVlcCwgY2xvbmUsIGNvcHkgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGJyaW5nIGluIHVuZGVmaW5lZCB2YWx1ZXNcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBjb3B5ICE9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFsgbmFtZSBdID0gY29weTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgbW9kaWZpZWQgb2JqZWN0XHJcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgIH07XHJcblxyXG4gICAgalF1ZXJ5LmV4dGVuZCh7XHJcbiAgICAgICAgLy8gVW5pcXVlIGZvciBlYWNoIGNvcHkgb2YgalF1ZXJ5IG9uIHRoZSBwYWdlXHJcbiAgICAgICAgZXhwYW5kbzogXCJqUXVlcnlcIiArICggdmVyc2lvbiArIE1hdGgucmFuZG9tKCkgKS5yZXBsYWNlKCAvXFxEL2csIFwiXCIgKSxcclxuXHJcbiAgICAgICAgLy8gQXNzdW1lIGpRdWVyeSBpcyByZWFkeSB3aXRob3V0IHRoZSByZWFkeSBtb2R1bGVcclxuICAgICAgICBpc1JlYWR5OiB0cnVlLFxyXG5cclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oIG1zZyApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCBtc2cgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBub29wOiBmdW5jdGlvbigpIHt9LFxyXG5cclxuICAgICAgICAvLyBTZWUgdGVzdC91bml0L2NvcmUuanMgZm9yIGRldGFpbHMgY29uY2VybmluZyBpc0Z1bmN0aW9uLlxyXG4gICAgICAgIC8vIFNpbmNlIHZlcnNpb24gMS4zLCBET00gbWV0aG9kcyBhbmQgZnVuY3Rpb25zIGxpa2UgYWxlcnRcclxuICAgICAgICAvLyBhcmVuJ3Qgc3VwcG9ydGVkLiBUaGV5IHJldHVybiBmYWxzZSBvbiBJRSAoIzI5NjgpLlxyXG4gICAgICAgIGlzRnVuY3Rpb246IGZ1bmN0aW9uKCBvYmogKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBqUXVlcnkudHlwZShvYmopID09PSBcImZ1bmN0aW9uXCI7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaXNBcnJheTogQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiggb2JqICkge1xyXG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5LnR5cGUob2JqKSA9PT0gXCJhcnJheVwiO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGlzV2luZG93OiBmdW5jdGlvbiggb2JqICkge1xyXG4gICAgICAgICAgICAvKiBqc2hpbnQgZXFlcWVxOiBmYWxzZSAqL1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqICE9IG51bGwgJiYgb2JqID09IG9iai53aW5kb3c7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaXNOdW1lcmljOiBmdW5jdGlvbiggb2JqICkge1xyXG4gICAgICAgICAgICAvLyBwYXJzZUZsb2F0IE5hTnMgbnVtZXJpYy1jYXN0IGZhbHNlIHBvc2l0aXZlcyAobnVsbHx0cnVlfGZhbHNlfFwiXCIpXHJcbiAgICAgICAgICAgIC8vIC4uLmJ1dCBtaXNpbnRlcnByZXRzIGxlYWRpbmctbnVtYmVyIHN0cmluZ3MsIHBhcnRpY3VsYXJseSBoZXggbGl0ZXJhbHMgKFwiMHguLi5cIilcclxuICAgICAgICAgICAgLy8gc3VidHJhY3Rpb24gZm9yY2VzIGluZmluaXRpZXMgdG8gTmFOXHJcbiAgICAgICAgICAgIC8vIGFkZGluZyAxIGNvcnJlY3RzIGxvc3Mgb2YgcHJlY2lzaW9uIGZyb20gcGFyc2VGbG9hdCAoIzE1MTAwKVxyXG4gICAgICAgICAgICByZXR1cm4gIWpRdWVyeS5pc0FycmF5KCBvYmogKSAmJiAob2JqIC0gcGFyc2VGbG9hdCggb2JqICkgKyAxKSA+PSAwO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGlzRW1wdHlPYmplY3Q6IGZ1bmN0aW9uKCBvYmogKSB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lO1xyXG4gICAgICAgICAgICBmb3IgKCBuYW1lIGluIG9iaiApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpc1BsYWluT2JqZWN0OiBmdW5jdGlvbiggb2JqICkge1xyXG4gICAgICAgICAgICB2YXIga2V5O1xyXG5cclxuICAgICAgICAgICAgLy8gTXVzdCBiZSBhbiBPYmplY3QuXHJcbiAgICAgICAgICAgIC8vIEJlY2F1c2Ugb2YgSUUsIHdlIGFsc28gaGF2ZSB0byBjaGVjayB0aGUgcHJlc2VuY2Ugb2YgdGhlIGNvbnN0cnVjdG9yIHByb3BlcnR5LlxyXG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCBET00gbm9kZXMgYW5kIHdpbmRvdyBvYmplY3RzIGRvbid0IHBhc3MgdGhyb3VnaCwgYXMgd2VsbFxyXG4gICAgICAgICAgICBpZiAoICFvYmogfHwgalF1ZXJ5LnR5cGUob2JqKSAhPT0gXCJvYmplY3RcIiB8fCBvYmoubm9kZVR5cGUgfHwgalF1ZXJ5LmlzV2luZG93KCBvYmogKSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIC8vIE5vdCBvd24gY29uc3RydWN0b3IgcHJvcGVydHkgbXVzdCBiZSBPYmplY3RcclxuICAgICAgICAgICAgICAgIGlmICggb2JqLmNvbnN0cnVjdG9yICYmXHJcbiAgICAgICAgICAgICAgICAgICAgIWhhc093bi5jYWxsKG9iaiwgXCJjb25zdHJ1Y3RvclwiKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICFoYXNPd24uY2FsbChvYmouY29uc3RydWN0b3IucHJvdG90eXBlLCBcImlzUHJvdG90eXBlT2ZcIikgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoICggZSApIHtcclxuICAgICAgICAgICAgICAgIC8vIElFOCw5IFdpbGwgdGhyb3cgZXhjZXB0aW9ucyBvbiBjZXJ0YWluIGhvc3Qgb2JqZWN0cyAjOTg5N1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTw5XHJcbiAgICAgICAgICAgIC8vIEhhbmRsZSBpdGVyYXRpb24gb3ZlciBpbmhlcml0ZWQgcHJvcGVydGllcyBiZWZvcmUgb3duIHByb3BlcnRpZXMuXHJcbiAgICAgICAgICAgIGlmICggc3VwcG9ydC5vd25MYXN0ICkge1xyXG4gICAgICAgICAgICAgICAgZm9yICgga2V5IGluIG9iaiApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFzT3duLmNhbGwoIG9iaiwga2V5ICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIE93biBwcm9wZXJ0aWVzIGFyZSBlbnVtZXJhdGVkIGZpcnN0bHksIHNvIHRvIHNwZWVkIHVwLFxyXG4gICAgICAgICAgICAvLyBpZiBsYXN0IG9uZSBpcyBvd24sIHRoZW4gYWxsIHByb3BlcnRpZXMgYXJlIG93bi5cclxuICAgICAgICAgICAgZm9yICgga2V5IGluIG9iaiApIHt9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ga2V5ID09PSB1bmRlZmluZWQgfHwgaGFzT3duLmNhbGwoIG9iaiwga2V5ICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdHlwZTogZnVuY3Rpb24oIG9iaiApIHtcclxuICAgICAgICAgICAgaWYgKCBvYmogPT0gbnVsbCApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmogKyBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIiA/XHJcbiAgICAgICAgICAgIGNsYXNzMnR5cGVbIHRvU3RyaW5nLmNhbGwob2JqKSBdIHx8IFwib2JqZWN0XCIgOlxyXG4gICAgICAgICAgICAgICAgdHlwZW9mIG9iajtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBFdmFsdWF0ZXMgYSBzY3JpcHQgaW4gYSBnbG9iYWwgY29udGV4dFxyXG4gICAgICAgIC8vIFdvcmthcm91bmRzIGJhc2VkIG9uIGZpbmRpbmdzIGJ5IEppbSBEcmlzY29sbFxyXG4gICAgICAgIC8vIGh0dHA6Ly93ZWJsb2dzLmphdmEubmV0L2Jsb2cvZHJpc2NvbGwvYXJjaGl2ZS8yMDA5LzA5LzA4L2V2YWwtamF2YXNjcmlwdC1nbG9iYWwtY29udGV4dFxyXG4gICAgICAgIGdsb2JhbEV2YWw6IGZ1bmN0aW9uKCBkYXRhICkge1xyXG4gICAgICAgICAgICBpZiAoIGRhdGEgJiYgalF1ZXJ5LnRyaW0oIGRhdGEgKSApIHtcclxuICAgICAgICAgICAgICAgIC8vIFdlIHVzZSBleGVjU2NyaXB0IG9uIEludGVybmV0IEV4cGxvcmVyXHJcbiAgICAgICAgICAgICAgICAvLyBXZSB1c2UgYW4gYW5vbnltb3VzIGZ1bmN0aW9uIHNvIHRoYXQgY29udGV4dCBpcyB3aW5kb3dcclxuICAgICAgICAgICAgICAgIC8vIHJhdGhlciB0aGFuIGpRdWVyeSBpbiBGaXJlZm94XHJcbiAgICAgICAgICAgICAgICAoIHdpbmRvdy5leGVjU2NyaXB0IHx8IGZ1bmN0aW9uKCBkYXRhICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd1sgXCJldmFsXCIgXS5jYWxsKCB3aW5kb3csIGRhdGEgKTtcclxuICAgICAgICAgICAgICAgIH0gKSggZGF0YSApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gQ29udmVydCBkYXNoZWQgdG8gY2FtZWxDYXNlOyB1c2VkIGJ5IHRoZSBjc3MgYW5kIGRhdGEgbW9kdWxlc1xyXG4gICAgICAgIC8vIE1pY3Jvc29mdCBmb3Jnb3QgdG8gaHVtcCB0aGVpciB2ZW5kb3IgcHJlZml4ICgjOTU3MilcclxuICAgICAgICBjYW1lbENhc2U6IGZ1bmN0aW9uKCBzdHJpbmcgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSggcm1zUHJlZml4LCBcIm1zLVwiICkucmVwbGFjZSggcmRhc2hBbHBoYSwgZmNhbWVsQ2FzZSApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG5vZGVOYW1lOiBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVsZW0ubm9kZU5hbWUgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gYXJncyBpcyBmb3IgaW50ZXJuYWwgdXNhZ2Ugb25seVxyXG4gICAgICAgIGVhY2g6IGZ1bmN0aW9uKCBvYmosIGNhbGxiYWNrLCBhcmdzICkge1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUsXHJcbiAgICAgICAgICAgICAgICBpID0gMCxcclxuICAgICAgICAgICAgICAgIGxlbmd0aCA9IG9iai5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBpc0FycmF5ID0gaXNBcnJheWxpa2UoIG9iaiApO1xyXG5cclxuICAgICAgICAgICAgaWYgKCBhcmdzICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBpc0FycmF5ICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGNhbGxiYWNrLmFwcGx5KCBvYmpbIGkgXSwgYXJncyApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCB2YWx1ZSA9PT0gZmFsc2UgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICggaSBpbiBvYmogKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY2FsbGJhY2suYXBwbHkoIG9ialsgaSBdLCBhcmdzICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHZhbHVlID09PSBmYWxzZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEEgc3BlY2lhbCwgZmFzdCwgY2FzZSBmb3IgdGhlIG1vc3QgY29tbW9uIHVzZSBvZiBlYWNoXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIGlzQXJyYXkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY2FsbGJhY2suY2FsbCggb2JqWyBpIF0sIGksIG9ialsgaSBdICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHZhbHVlID09PSBmYWxzZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKCBpIGluIG9iaiApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjYWxsYmFjay5jYWxsKCBvYmpbIGkgXSwgaSwgb2JqWyBpIF0gKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggdmFsdWUgPT09IGZhbHNlICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gU3VwcG9ydDogQW5kcm9pZDw0LjEsIElFPDlcclxuICAgICAgICB0cmltOiBmdW5jdGlvbiggdGV4dCApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRleHQgPT0gbnVsbCA/XHJcbiAgICAgICAgICAgICAgICBcIlwiIDpcclxuICAgICAgICAgICAgICAgICggdGV4dCArIFwiXCIgKS5yZXBsYWNlKCBydHJpbSwgXCJcIiApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIHJlc3VsdHMgaXMgZm9yIGludGVybmFsIHVzYWdlIG9ubHlcclxuICAgICAgICBtYWtlQXJyYXk6IGZ1bmN0aW9uKCBhcnIsIHJlc3VsdHMgKSB7XHJcbiAgICAgICAgICAgIHZhciByZXQgPSByZXN1bHRzIHx8IFtdO1xyXG5cclxuICAgICAgICAgICAgaWYgKCBhcnIgIT0gbnVsbCApIHtcclxuICAgICAgICAgICAgICAgIGlmICggaXNBcnJheWxpa2UoIE9iamVjdChhcnIpICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5Lm1lcmdlKCByZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBhcnIgPT09IFwic3RyaW5nXCIgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgWyBhcnIgXSA6IGFyclxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHB1c2guY2FsbCggcmV0LCBhcnIgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbkFycmF5OiBmdW5jdGlvbiggZWxlbSwgYXJyLCBpICkge1xyXG4gICAgICAgICAgICB2YXIgbGVuO1xyXG5cclxuICAgICAgICAgICAgaWYgKCBhcnIgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIGluZGV4T2YgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4T2YuY2FsbCggYXJyLCBlbGVtLCBpICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGVuID0gYXJyLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGkgPSBpID8gaSA8IDAgPyBNYXRoLm1heCggMCwgbGVuICsgaSApIDogaSA6IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICggOyBpIDwgbGVuOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2tpcCBhY2Nlc3NpbmcgaW4gc3BhcnNlIGFycmF5c1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggaSBpbiBhcnIgJiYgYXJyWyBpIF0gPT09IGVsZW0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1lcmdlOiBmdW5jdGlvbiggZmlyc3QsIHNlY29uZCApIHtcclxuICAgICAgICAgICAgdmFyIGxlbiA9ICtzZWNvbmQubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgaiA9IDAsXHJcbiAgICAgICAgICAgICAgICBpID0gZmlyc3QubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgd2hpbGUgKCBqIDwgbGVuICkge1xyXG4gICAgICAgICAgICAgICAgZmlyc3RbIGkrKyBdID0gc2Vjb25kWyBqKysgXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU8OVxyXG4gICAgICAgICAgICAvLyBXb3JrYXJvdW5kIGNhc3Rpbmcgb2YgLmxlbmd0aCB0byBOYU4gb24gb3RoZXJ3aXNlIGFycmF5bGlrZSBvYmplY3RzIChlLmcuLCBOb2RlTGlzdHMpXHJcbiAgICAgICAgICAgIGlmICggbGVuICE9PSBsZW4gKSB7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoIHNlY29uZFtqXSAhPT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0WyBpKysgXSA9IHNlY29uZFsgaisrIF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZpcnN0Lmxlbmd0aCA9IGk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmlyc3Q7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ3JlcDogZnVuY3Rpb24oIGVsZW1zLCBjYWxsYmFjaywgaW52ZXJ0ICkge1xyXG4gICAgICAgICAgICB2YXIgY2FsbGJhY2tJbnZlcnNlLFxyXG4gICAgICAgICAgICAgICAgbWF0Y2hlcyA9IFtdLFxyXG4gICAgICAgICAgICAgICAgaSA9IDAsXHJcbiAgICAgICAgICAgICAgICBsZW5ndGggPSBlbGVtcy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja0V4cGVjdCA9ICFpbnZlcnQ7XHJcblxyXG4gICAgICAgICAgICAvLyBHbyB0aHJvdWdoIHRoZSBhcnJheSwgb25seSBzYXZpbmcgdGhlIGl0ZW1zXHJcbiAgICAgICAgICAgIC8vIHRoYXQgcGFzcyB0aGUgdmFsaWRhdG9yIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tJbnZlcnNlID0gIWNhbGxiYWNrKCBlbGVtc1sgaSBdLCBpICk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIGNhbGxiYWNrSW52ZXJzZSAhPT0gY2FsbGJhY2tFeHBlY3QgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKCBlbGVtc1sgaSBdICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVzO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIGFyZyBpcyBmb3IgaW50ZXJuYWwgdXNhZ2Ugb25seVxyXG4gICAgICAgIG1hcDogZnVuY3Rpb24oIGVsZW1zLCBjYWxsYmFjaywgYXJnICkge1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUsXHJcbiAgICAgICAgICAgICAgICBpID0gMCxcclxuICAgICAgICAgICAgICAgIGxlbmd0aCA9IGVsZW1zLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGlzQXJyYXkgPSBpc0FycmF5bGlrZSggZWxlbXMgKSxcclxuICAgICAgICAgICAgICAgIHJldCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgLy8gR28gdGhyb3VnaCB0aGUgYXJyYXksIHRyYW5zbGF0aW5nIGVhY2ggb2YgdGhlIGl0ZW1zIHRvIHRoZWlyIG5ldyB2YWx1ZXNcclxuICAgICAgICAgICAgaWYgKCBpc0FycmF5ICkge1xyXG4gICAgICAgICAgICAgICAgZm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjYWxsYmFjayggZWxlbXNbIGkgXSwgaSwgYXJnICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggdmFsdWUgIT0gbnVsbCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0LnB1c2goIHZhbHVlICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEdvIHRocm91Z2ggZXZlcnkga2V5IG9uIHRoZSBvYmplY3QsXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKCBpIGluIGVsZW1zICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY2FsbGJhY2soIGVsZW1zWyBpIF0sIGksIGFyZyApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIHZhbHVlICE9IG51bGwgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldC5wdXNoKCB2YWx1ZSApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRmxhdHRlbiBhbnkgbmVzdGVkIGFycmF5c1xyXG4gICAgICAgICAgICByZXR1cm4gY29uY2F0LmFwcGx5KCBbXSwgcmV0ICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gQSBnbG9iYWwgR1VJRCBjb3VudGVyIGZvciBvYmplY3RzXHJcbiAgICAgICAgZ3VpZDogMSxcclxuXHJcbiAgICAgICAgLy8gQmluZCBhIGZ1bmN0aW9uIHRvIGEgY29udGV4dCwgb3B0aW9uYWxseSBwYXJ0aWFsbHkgYXBwbHlpbmcgYW55XHJcbiAgICAgICAgLy8gYXJndW1lbnRzLlxyXG4gICAgICAgIHByb3h5OiBmdW5jdGlvbiggZm4sIGNvbnRleHQgKSB7XHJcbiAgICAgICAgICAgIHZhciBhcmdzLCBwcm94eSwgdG1wO1xyXG5cclxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgY29udGV4dCA9PT0gXCJzdHJpbmdcIiApIHtcclxuICAgICAgICAgICAgICAgIHRtcCA9IGZuWyBjb250ZXh0IF07XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gZm47XHJcbiAgICAgICAgICAgICAgICBmbiA9IHRtcDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUXVpY2sgY2hlY2sgdG8gZGV0ZXJtaW5lIGlmIHRhcmdldCBpcyBjYWxsYWJsZSwgaW4gdGhlIHNwZWNcclxuICAgICAgICAgICAgLy8gdGhpcyB0aHJvd3MgYSBUeXBlRXJyb3IsIGJ1dCB3ZSB3aWxsIGp1c3QgcmV0dXJuIHVuZGVmaW5lZC5cclxuICAgICAgICAgICAgaWYgKCAhalF1ZXJ5LmlzRnVuY3Rpb24oIGZuICkgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTaW11bGF0ZWQgYmluZFxyXG4gICAgICAgICAgICBhcmdzID0gc2xpY2UuY2FsbCggYXJndW1lbnRzLCAyICk7XHJcbiAgICAgICAgICAgIHByb3h5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkoIGNvbnRleHQgfHwgdGhpcywgYXJncy5jb25jYXQoIHNsaWNlLmNhbGwoIGFyZ3VtZW50cyApICkgKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCB0aGUgZ3VpZCBvZiB1bmlxdWUgaGFuZGxlciB0byB0aGUgc2FtZSBvZiBvcmlnaW5hbCBoYW5kbGVyLCBzbyBpdCBjYW4gYmUgcmVtb3ZlZFxyXG4gICAgICAgICAgICBwcm94eS5ndWlkID0gZm4uZ3VpZCA9IGZuLmd1aWQgfHwgalF1ZXJ5Lmd1aWQrKztcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwcm94eTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBub3c6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKyggbmV3IERhdGUoKSApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIGpRdWVyeS5zdXBwb3J0IGlzIG5vdCB1c2VkIGluIENvcmUgYnV0IG90aGVyIHByb2plY3RzIGF0dGFjaCB0aGVpclxyXG4gICAgICAgIC8vIHByb3BlcnRpZXMgdG8gaXQgc28gaXQgbmVlZHMgdG8gZXhpc3QuXHJcbiAgICAgICAgc3VwcG9ydDogc3VwcG9ydFxyXG4gICAgfSk7XHJcblxyXG4vLyBQb3B1bGF0ZSB0aGUgY2xhc3MydHlwZSBtYXBcclxuICAgIGpRdWVyeS5lYWNoKFwiQm9vbGVhbiBOdW1iZXIgU3RyaW5nIEZ1bmN0aW9uIEFycmF5IERhdGUgUmVnRXhwIE9iamVjdCBFcnJvclwiLnNwbGl0KFwiIFwiKSwgZnVuY3Rpb24oaSwgbmFtZSkge1xyXG4gICAgICAgIGNsYXNzMnR5cGVbIFwiW29iamVjdCBcIiArIG5hbWUgKyBcIl1cIiBdID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gaXNBcnJheWxpa2UoIG9iaiApIHtcclxuICAgICAgICB2YXIgbGVuZ3RoID0gb2JqLmxlbmd0aCxcclxuICAgICAgICAgICAgdHlwZSA9IGpRdWVyeS50eXBlKCBvYmogKTtcclxuXHJcbiAgICAgICAgaWYgKCB0eXBlID09PSBcImZ1bmN0aW9uXCIgfHwgalF1ZXJ5LmlzV2luZG93KCBvYmogKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCBvYmoubm9kZVR5cGUgPT09IDEgJiYgbGVuZ3RoICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0eXBlID09PSBcImFycmF5XCIgfHwgbGVuZ3RoID09PSAwIHx8XHJcbiAgICAgICAgICAgIHR5cGVvZiBsZW5ndGggPT09IFwibnVtYmVyXCIgJiYgbGVuZ3RoID4gMCAmJiAoIGxlbmd0aCAtIDEgKSBpbiBvYmo7XHJcbiAgICB9XHJcbiAgICB2YXIgU2l6emxlID1cclxuICAgICAgICAvKiFcclxuICAgICAgICAgKiBTaXp6bGUgQ1NTIFNlbGVjdG9yIEVuZ2luZSB2Mi4yLjAtcHJlXHJcbiAgICAgICAgICogaHR0cDovL3NpenpsZWpzLmNvbS9cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIENvcHlyaWdodCAyMDA4LCAyMDE0IGpRdWVyeSBGb3VuZGF0aW9uLCBJbmMuIGFuZCBvdGhlciBjb250cmlidXRvcnNcclxuICAgICAgICAgKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcclxuICAgICAgICAgKiBodHRwOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBEYXRlOiAyMDE0LTEyLTE2XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgKGZ1bmN0aW9uKCB3aW5kb3cgKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgaSxcclxuICAgICAgICAgICAgICAgIHN1cHBvcnQsXHJcbiAgICAgICAgICAgICAgICBFeHByLFxyXG4gICAgICAgICAgICAgICAgZ2V0VGV4dCxcclxuICAgICAgICAgICAgICAgIGlzWE1MLFxyXG4gICAgICAgICAgICAgICAgdG9rZW5pemUsXHJcbiAgICAgICAgICAgICAgICBjb21waWxlLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0LFxyXG4gICAgICAgICAgICAgICAgb3V0ZXJtb3N0Q29udGV4dCxcclxuICAgICAgICAgICAgICAgIHNvcnRJbnB1dCxcclxuICAgICAgICAgICAgICAgIGhhc0R1cGxpY2F0ZSxcclxuXHJcbiAgICAgICAgICAgIC8vIExvY2FsIGRvY3VtZW50IHZhcnNcclxuICAgICAgICAgICAgICAgIHNldERvY3VtZW50LFxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQsXHJcbiAgICAgICAgICAgICAgICBkb2NFbGVtLFxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnRJc0hUTUwsXHJcbiAgICAgICAgICAgICAgICByYnVnZ3lRU0EsXHJcbiAgICAgICAgICAgICAgICByYnVnZ3lNYXRjaGVzLFxyXG4gICAgICAgICAgICAgICAgbWF0Y2hlcyxcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5zLFxyXG5cclxuICAgICAgICAgICAgLy8gSW5zdGFuY2Utc3BlY2lmaWMgZGF0YVxyXG4gICAgICAgICAgICAgICAgZXhwYW5kbyA9IFwic2l6emxlXCIgKyAxICogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgICAgIHByZWZlcnJlZERvYyA9IHdpbmRvdy5kb2N1bWVudCxcclxuICAgICAgICAgICAgICAgIGRpcnJ1bnMgPSAwLFxyXG4gICAgICAgICAgICAgICAgZG9uZSA9IDAsXHJcbiAgICAgICAgICAgICAgICBjbGFzc0NhY2hlID0gY3JlYXRlQ2FjaGUoKSxcclxuICAgICAgICAgICAgICAgIHRva2VuQ2FjaGUgPSBjcmVhdGVDYWNoZSgpLFxyXG4gICAgICAgICAgICAgICAgY29tcGlsZXJDYWNoZSA9IGNyZWF0ZUNhY2hlKCksXHJcbiAgICAgICAgICAgICAgICBzb3J0T3JkZXIgPSBmdW5jdGlvbiggYSwgYiApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIGEgPT09IGIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc0R1cGxpY2F0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8vIEdlbmVyYWwtcHVycG9zZSBjb25zdGFudHNcclxuICAgICAgICAgICAgICAgIE1BWF9ORUdBVElWRSA9IDEgPDwgMzEsXHJcblxyXG4gICAgICAgICAgICAvLyBJbnN0YW5jZSBtZXRob2RzXHJcbiAgICAgICAgICAgICAgICBoYXNPd24gPSAoe30pLmhhc093blByb3BlcnR5LFxyXG4gICAgICAgICAgICAgICAgYXJyID0gW10sXHJcbiAgICAgICAgICAgICAgICBwb3AgPSBhcnIucG9wLFxyXG4gICAgICAgICAgICAgICAgcHVzaF9uYXRpdmUgPSBhcnIucHVzaCxcclxuICAgICAgICAgICAgICAgIHB1c2ggPSBhcnIucHVzaCxcclxuICAgICAgICAgICAgICAgIHNsaWNlID0gYXJyLnNsaWNlLFxyXG4gICAgICAgICAgICAvLyBVc2UgYSBzdHJpcHBlZC1kb3duIGluZGV4T2YgYXMgaXQncyBmYXN0ZXIgdGhhbiBuYXRpdmVcclxuICAgICAgICAgICAgLy8gaHR0cDovL2pzcGVyZi5jb20vdGhvci1pbmRleG9mLXZzLWZvci81XHJcbiAgICAgICAgICAgICAgICBpbmRleE9mID0gZnVuY3Rpb24oIGxpc3QsIGVsZW0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZW4gPSBsaXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBsaXN0W2ldID09PSBlbGVtICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBib29sZWFucyA9IFwiY2hlY2tlZHxzZWxlY3RlZHxhc3luY3xhdXRvZm9jdXN8YXV0b3BsYXl8Y29udHJvbHN8ZGVmZXJ8ZGlzYWJsZWR8aGlkZGVufGlzbWFwfGxvb3B8bXVsdGlwbGV8b3BlbnxyZWFkb25seXxyZXF1aXJlZHxzY29wZWRcIixcclxuXHJcbiAgICAgICAgICAgIC8vIFJlZ3VsYXIgZXhwcmVzc2lvbnNcclxuXHJcbiAgICAgICAgICAgIC8vIFdoaXRlc3BhY2UgY2hhcmFjdGVycyBodHRwOi8vd3d3LnczLm9yZy9UUi9jc3MzLXNlbGVjdG9ycy8jd2hpdGVzcGFjZVxyXG4gICAgICAgICAgICAgICAgd2hpdGVzcGFjZSA9IFwiW1xcXFx4MjBcXFxcdFxcXFxyXFxcXG5cXFxcZl1cIixcclxuICAgICAgICAgICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1zeW50YXgvI2NoYXJhY3RlcnNcclxuICAgICAgICAgICAgICAgIGNoYXJhY3RlckVuY29kaW5nID0gXCIoPzpcXFxcXFxcXC58W1xcXFx3LV18W15cXFxceDAwLVxcXFx4YTBdKStcIixcclxuXHJcbiAgICAgICAgICAgIC8vIExvb3NlbHkgbW9kZWxlZCBvbiBDU1MgaWRlbnRpZmllciBjaGFyYWN0ZXJzXHJcbiAgICAgICAgICAgIC8vIEFuIHVucXVvdGVkIHZhbHVlIHNob3VsZCBiZSBhIENTUyBpZGVudGlmaWVyIGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtc2VsZWN0b3JzLyNhdHRyaWJ1dGUtc2VsZWN0b3JzXHJcbiAgICAgICAgICAgIC8vIFByb3BlciBzeW50YXg6IGh0dHA6Ly93d3cudzMub3JnL1RSL0NTUzIxL3N5bmRhdGEuaHRtbCN2YWx1ZS1kZWYtaWRlbnRpZmllclxyXG4gICAgICAgICAgICAgICAgaWRlbnRpZmllciA9IGNoYXJhY3RlckVuY29kaW5nLnJlcGxhY2UoIFwid1wiLCBcIncjXCIgKSxcclxuXHJcbiAgICAgICAgICAgIC8vIEF0dHJpYnV0ZSBzZWxlY3RvcnM6IGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jYXR0cmlidXRlLXNlbGVjdG9yc1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlcyA9IFwiXFxcXFtcIiArIHdoaXRlc3BhY2UgKyBcIiooXCIgKyBjaGFyYWN0ZXJFbmNvZGluZyArIFwiKSg/OlwiICsgd2hpdGVzcGFjZSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9wZXJhdG9yIChjYXB0dXJlIDIpXHJcbiAgICAgICAgICAgICAgICAgICAgXCIqKFsqXiR8IX5dPz0pXCIgKyB3aGl0ZXNwYWNlICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gXCJBdHRyaWJ1dGUgdmFsdWVzIG11c3QgYmUgQ1NTIGlkZW50aWZpZXJzIFtjYXB0dXJlIDVdIG9yIHN0cmluZ3MgW2NhcHR1cmUgMyBvciBjYXB0dXJlIDRdXCJcclxuICAgICAgICAgICAgICAgICAgICBcIiooPzonKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcJ10pKiknfFxcXCIoKD86XFxcXFxcXFwufFteXFxcXFxcXFxcXFwiXSkqKVxcXCJ8KFwiICsgaWRlbnRpZmllciArIFwiKSl8KVwiICsgd2hpdGVzcGFjZSArXHJcbiAgICAgICAgICAgICAgICAgICAgXCIqXFxcXF1cIixcclxuXHJcbiAgICAgICAgICAgICAgICBwc2V1ZG9zID0gXCI6KFwiICsgY2hhcmFjdGVyRW5jb2RpbmcgKyBcIikoPzpcXFxcKChcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRvIHJlZHVjZSB0aGUgbnVtYmVyIG9mIHNlbGVjdG9ycyBuZWVkaW5nIHRva2VuaXplIGluIHRoZSBwcmVGaWx0ZXIsIHByZWZlciBhcmd1bWVudHM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDEuIHF1b3RlZCAoY2FwdHVyZSAzOyBjYXB0dXJlIDQgb3IgY2FwdHVyZSA1KVxyXG4gICAgICAgICAgICAgICAgICAgIFwiKCcoKD86XFxcXFxcXFwufFteXFxcXFxcXFwnXSkqKSd8XFxcIigoPzpcXFxcXFxcXC58W15cXFxcXFxcXFxcXCJdKSopXFxcIil8XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAyLiBzaW1wbGUgKGNhcHR1cmUgNilcclxuICAgICAgICAgICAgICAgICAgICBcIigoPzpcXFxcXFxcXC58W15cXFxcXFxcXCgpW1xcXFxdXXxcIiArIGF0dHJpYnV0ZXMgKyBcIikqKXxcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDMuIGFueXRoaW5nIGVsc2UgKGNhcHR1cmUgMilcclxuICAgICAgICAgICAgICAgICAgICBcIi4qXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiKVxcXFwpfClcIixcclxuXHJcbiAgICAgICAgICAgIC8vIExlYWRpbmcgYW5kIG5vbi1lc2NhcGVkIHRyYWlsaW5nIHdoaXRlc3BhY2UsIGNhcHR1cmluZyBzb21lIG5vbi13aGl0ZXNwYWNlIGNoYXJhY3RlcnMgcHJlY2VkaW5nIHRoZSBsYXR0ZXJcclxuICAgICAgICAgICAgICAgIHJ3aGl0ZXNwYWNlID0gbmV3IFJlZ0V4cCggd2hpdGVzcGFjZSArIFwiK1wiLCBcImdcIiApLFxyXG4gICAgICAgICAgICAgICAgcnRyaW0gPSBuZXcgUmVnRXhwKCBcIl5cIiArIHdoaXRlc3BhY2UgKyBcIit8KCg/Ol58W15cXFxcXFxcXF0pKD86XFxcXFxcXFwuKSopXCIgKyB3aGl0ZXNwYWNlICsgXCIrJFwiLCBcImdcIiApLFxyXG5cclxuICAgICAgICAgICAgICAgIHJjb21tYSA9IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiKixcIiArIHdoaXRlc3BhY2UgKyBcIipcIiApLFxyXG4gICAgICAgICAgICAgICAgcmNvbWJpbmF0b3JzID0gbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIqKFs+K35dfFwiICsgd2hpdGVzcGFjZSArIFwiKVwiICsgd2hpdGVzcGFjZSArIFwiKlwiICksXHJcblxyXG4gICAgICAgICAgICAgICAgcmF0dHJpYnV0ZVF1b3RlcyA9IG5ldyBSZWdFeHAoIFwiPVwiICsgd2hpdGVzcGFjZSArIFwiKihbXlxcXFxdJ1xcXCJdKj8pXCIgKyB3aGl0ZXNwYWNlICsgXCIqXFxcXF1cIiwgXCJnXCIgKSxcclxuXHJcbiAgICAgICAgICAgICAgICBycHNldWRvID0gbmV3IFJlZ0V4cCggcHNldWRvcyApLFxyXG4gICAgICAgICAgICAgICAgcmlkZW50aWZpZXIgPSBuZXcgUmVnRXhwKCBcIl5cIiArIGlkZW50aWZpZXIgKyBcIiRcIiApLFxyXG5cclxuICAgICAgICAgICAgICAgIG1hdGNoRXhwciA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcIklEXCI6IG5ldyBSZWdFeHAoIFwiXiMoXCIgKyBjaGFyYWN0ZXJFbmNvZGluZyArIFwiKVwiICksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJDTEFTU1wiOiBuZXcgUmVnRXhwKCBcIl5cXFxcLihcIiArIGNoYXJhY3RlckVuY29kaW5nICsgXCIpXCIgKSxcclxuICAgICAgICAgICAgICAgICAgICBcIlRBR1wiOiBuZXcgUmVnRXhwKCBcIl4oXCIgKyBjaGFyYWN0ZXJFbmNvZGluZy5yZXBsYWNlKCBcIndcIiwgXCJ3KlwiICkgKyBcIilcIiApLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiQVRUUlwiOiBuZXcgUmVnRXhwKCBcIl5cIiArIGF0dHJpYnV0ZXMgKSxcclxuICAgICAgICAgICAgICAgICAgICBcIlBTRVVET1wiOiBuZXcgUmVnRXhwKCBcIl5cIiArIHBzZXVkb3MgKSxcclxuICAgICAgICAgICAgICAgICAgICBcIkNISUxEXCI6IG5ldyBSZWdFeHAoIFwiXjoob25seXxmaXJzdHxsYXN0fG50aHxudGgtbGFzdCktKGNoaWxkfG9mLXR5cGUpKD86XFxcXChcIiArIHdoaXRlc3BhY2UgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiKihldmVufG9kZHwoKFsrLV18KShcXFxcZCopbnwpXCIgKyB3aGl0ZXNwYWNlICsgXCIqKD86KFsrLV18KVwiICsgd2hpdGVzcGFjZSArXHJcbiAgICAgICAgICAgICAgICAgICAgXCIqKFxcXFxkKyl8KSlcIiArIHdoaXRlc3BhY2UgKyBcIipcXFxcKXwpXCIsIFwiaVwiICksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJib29sXCI6IG5ldyBSZWdFeHAoIFwiXig/OlwiICsgYm9vbGVhbnMgKyBcIikkXCIsIFwiaVwiICksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRm9yIHVzZSBpbiBsaWJyYXJpZXMgaW1wbGVtZW50aW5nIC5pcygpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgdXNlIHRoaXMgZm9yIFBPUyBtYXRjaGluZyBpbiBgc2VsZWN0YFxyXG4gICAgICAgICAgICAgICAgICAgIFwibmVlZHNDb250ZXh0XCI6IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiKls+K35dfDooZXZlbnxvZGR8ZXF8Z3R8bHR8bnRofGZpcnN0fGxhc3QpKD86XFxcXChcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgd2hpdGVzcGFjZSArIFwiKigoPzotXFxcXGQpP1xcXFxkKilcIiArIHdoaXRlc3BhY2UgKyBcIipcXFxcKXwpKD89W14tXXwkKVwiLCBcImlcIiApXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHJpbnB1dHMgPSAvXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxidXR0b24pJC9pLFxyXG4gICAgICAgICAgICAgICAgcmhlYWRlciA9IC9eaFxcZCQvaSxcclxuXHJcbiAgICAgICAgICAgICAgICBybmF0aXZlID0gL15bXntdK1xce1xccypcXFtuYXRpdmUgXFx3LyxcclxuXHJcbiAgICAgICAgICAgIC8vIEVhc2lseS1wYXJzZWFibGUvcmV0cmlldmFibGUgSUQgb3IgVEFHIG9yIENMQVNTIHNlbGVjdG9yc1xyXG4gICAgICAgICAgICAgICAgcnF1aWNrRXhwciA9IC9eKD86IyhbXFx3LV0rKXwoXFx3Kyl8XFwuKFtcXHctXSspKSQvLFxyXG5cclxuICAgICAgICAgICAgICAgIHJzaWJsaW5nID0gL1srfl0vLFxyXG4gICAgICAgICAgICAgICAgcmVzY2FwZSA9IC8nfFxcXFwvZyxcclxuXHJcbiAgICAgICAgICAgIC8vIENTUyBlc2NhcGVzIGh0dHA6Ly93d3cudzMub3JnL1RSL0NTUzIxL3N5bmRhdGEuaHRtbCNlc2NhcGVkLWNoYXJhY3RlcnNcclxuICAgICAgICAgICAgICAgIHJ1bmVzY2FwZSA9IG5ldyBSZWdFeHAoIFwiXFxcXFxcXFwoW1xcXFxkYS1mXXsxLDZ9XCIgKyB3aGl0ZXNwYWNlICsgXCI/fChcIiArIHdoaXRlc3BhY2UgKyBcIil8LilcIiwgXCJpZ1wiICksXHJcbiAgICAgICAgICAgICAgICBmdW5lc2NhcGUgPSBmdW5jdGlvbiggXywgZXNjYXBlZCwgZXNjYXBlZFdoaXRlc3BhY2UgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhpZ2ggPSBcIjB4XCIgKyBlc2NhcGVkIC0gMHgxMDAwMDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBOYU4gbWVhbnMgbm9uLWNvZGVwb2ludFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IEZpcmVmb3g8MjRcclxuICAgICAgICAgICAgICAgICAgICAvLyBXb3JrYXJvdW5kIGVycm9uZW91cyBudW1lcmljIGludGVycHJldGF0aW9uIG9mICtcIjB4XCJcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGlnaCAhPT0gaGlnaCB8fCBlc2NhcGVkV2hpdGVzcGFjZSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVzY2FwZWQgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWdoIDwgMCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBCTVAgY29kZXBvaW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTdHJpbmcuZnJvbUNoYXJDb2RlKCBoaWdoICsgMHgxMDAwMCApIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1cHBsZW1lbnRhbCBQbGFuZSBjb2RlcG9pbnQgKHN1cnJvZ2F0ZSBwYWlyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU3RyaW5nLmZyb21DaGFyQ29kZSggaGlnaCA+PiAxMCB8IDB4RDgwMCwgaGlnaCAmIDB4M0ZGIHwgMHhEQzAwICk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLy8gVXNlZCBmb3IgaWZyYW1lc1xyXG4gICAgICAgICAgICAvLyBTZWUgc2V0RG9jdW1lbnQoKVxyXG4gICAgICAgICAgICAvLyBSZW1vdmluZyB0aGUgZnVuY3Rpb24gd3JhcHBlciBjYXVzZXMgYSBcIlBlcm1pc3Npb24gRGVuaWVkXCJcclxuICAgICAgICAgICAgLy8gZXJyb3IgaW4gSUVcclxuICAgICAgICAgICAgICAgIHVubG9hZEhhbmRsZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXREb2N1bWVudCgpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbi8vIE9wdGltaXplIGZvciBwdXNoLmFwcGx5KCBfLCBOb2RlTGlzdCApXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBwdXNoLmFwcGx5KFxyXG4gICAgICAgICAgICAgICAgICAgIChhcnIgPSBzbGljZS5jYWxsKCBwcmVmZXJyZWREb2MuY2hpbGROb2RlcyApKSxcclxuICAgICAgICAgICAgICAgICAgICBwcmVmZXJyZWREb2MuY2hpbGROb2Rlc1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IEFuZHJvaWQ8NC4wXHJcbiAgICAgICAgICAgICAgICAvLyBEZXRlY3Qgc2lsZW50bHkgZmFpbGluZyBwdXNoLmFwcGx5XHJcbiAgICAgICAgICAgICAgICBhcnJbIHByZWZlcnJlZERvYy5jaGlsZE5vZGVzLmxlbmd0aCBdLm5vZGVUeXBlO1xyXG4gICAgICAgICAgICB9IGNhdGNoICggZSApIHtcclxuICAgICAgICAgICAgICAgIHB1c2ggPSB7IGFwcGx5OiBhcnIubGVuZ3RoID9cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTGV2ZXJhZ2Ugc2xpY2UgaWYgcG9zc2libGVcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiggdGFyZ2V0LCBlbHMgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hfbmF0aXZlLmFwcGx5KCB0YXJnZXQsIHNsaWNlLmNhbGwoZWxzKSApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gOlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTw5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGFwcGVuZCBkaXJlY3RseVxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCB0YXJnZXQsIGVscyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGogPSB0YXJnZXQubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENhbid0IHRydXN0IE5vZGVMaXN0Lmxlbmd0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoICh0YXJnZXRbaisrXSA9IGVsc1tpKytdKSApIHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5sZW5ndGggPSBqIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBTaXp6bGUoIHNlbGVjdG9yLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkICkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoLCBlbGVtLCBtLCBub2RlVHlwZSxcclxuICAgICAgICAgICAgICAgIC8vIFFTQSB2YXJzXHJcbiAgICAgICAgICAgICAgICAgICAgaSwgZ3JvdXBzLCBvbGQsIG5pZCwgbmV3Q29udGV4dCwgbmV3U2VsZWN0b3I7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCAoIGNvbnRleHQgPyBjb250ZXh0Lm93bmVyRG9jdW1lbnQgfHwgY29udGV4dCA6IHByZWZlcnJlZERvYyApICE9PSBkb2N1bWVudCApIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXREb2N1bWVudCggY29udGV4dCApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMgfHwgW107XHJcbiAgICAgICAgICAgICAgICBub2RlVHlwZSA9IGNvbnRleHQubm9kZVR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgfHwgIXNlbGVjdG9yIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZVR5cGUgIT09IDEgJiYgbm9kZVR5cGUgIT09IDkgJiYgbm9kZVR5cGUgIT09IDExICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoICFzZWVkICYmIGRvY3VtZW50SXNIVE1MICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBUcnkgdG8gc2hvcnRjdXQgZmluZCBvcGVyYXRpb25zIHdoZW4gcG9zc2libGUgKGUuZy4sIG5vdCB1bmRlciBEb2N1bWVudEZyYWdtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggbm9kZVR5cGUgIT09IDExICYmIChtYXRjaCA9IHJxdWlja0V4cHIuZXhlYyggc2VsZWN0b3IgKSkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNwZWVkLXVwOiBTaXp6bGUoXCIjSURcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAobSA9IG1hdGNoWzFdKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbm9kZVR5cGUgPT09IDkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSA9IGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQoIG0gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBwYXJlbnROb2RlIHRvIGNhdGNoIHdoZW4gQmxhY2tiZXJyeSA0LjYgcmV0dXJuc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vZGVzIHRoYXQgYXJlIG5vIGxvbmdlciBpbiB0aGUgZG9jdW1lbnQgKGpRdWVyeSAjNjk2MylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGVsZW0gJiYgZWxlbS5wYXJlbnROb2RlICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBIYW5kbGUgdGhlIGNhc2Ugd2hlcmUgSUUsIE9wZXJhLCBhbmQgV2Via2l0IHJldHVybiBpdGVtc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBieSBuYW1lIGluc3RlYWQgb2YgSURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBlbGVtLmlkID09PSBtICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKCBlbGVtICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ29udGV4dCBpcyBub3QgYSBkb2N1bWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggY29udGV4dC5vd25lckRvY3VtZW50ICYmIChlbGVtID0gY29udGV4dC5vd25lckRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBtICkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5zKCBjb250ZXh0LCBlbGVtICkgJiYgZWxlbS5pZCA9PT0gbSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKCBlbGVtICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTcGVlZC11cDogU2l6emxlKFwiVEFHXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIG1hdGNoWzJdICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaC5hcHBseSggcmVzdWx0cywgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggc2VsZWN0b3IgKSApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3BlZWQtdXA6IFNpenpsZShcIi5DTEFTU1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCAobSA9IG1hdGNoWzNdKSAmJiBzdXBwb3J0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoLmFwcGx5KCByZXN1bHRzLCBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoIG0gKSApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFFTQSBwYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBzdXBwb3J0LnFzYSAmJiAoIXJidWdneVFTQSB8fCAhcmJ1Z2d5UVNBLnRlc3QoIHNlbGVjdG9yICkpICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuaWQgPSBvbGQgPSBleHBhbmRvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdDb250ZXh0ID0gY29udGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2VsZWN0b3IgPSBub2RlVHlwZSAhPT0gMSAmJiBzZWxlY3RvcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHFTQSB3b3JrcyBzdHJhbmdlbHkgb24gRWxlbWVudC1yb290ZWQgcXVlcmllc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBjYW4gd29yayBhcm91bmQgdGhpcyBieSBzcGVjaWZ5aW5nIGFuIGV4dHJhIElEIG9uIHRoZSByb290XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuZCB3b3JraW5nIHVwIGZyb20gdGhlcmUgKFRoYW5rcyB0byBBbmRyZXcgRHVwb250IGZvciB0aGUgdGVjaG5pcXVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJRSA4IGRvZXNuJ3Qgd29yayBvbiBvYmplY3QgZWxlbWVudHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBub2RlVHlwZSA9PT0gMSAmJiBjb250ZXh0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT09IFwib2JqZWN0XCIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cHMgPSB0b2tlbml6ZSggc2VsZWN0b3IgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIChvbGQgPSBjb250ZXh0LmdldEF0dHJpYnV0ZShcImlkXCIpKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuaWQgPSBvbGQucmVwbGFjZSggcmVzY2FwZSwgXCJcXFxcJCZcIiApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnNldEF0dHJpYnV0ZSggXCJpZFwiLCBuaWQgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5pZCA9IFwiW2lkPSdcIiArIG5pZCArIFwiJ10gXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGdyb3Vwcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIGktLSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cHNbaV0gPSBuaWQgKyB0b1NlbGVjdG9yKCBncm91cHNbaV0gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbnRleHQgPSByc2libGluZy50ZXN0KCBzZWxlY3RvciApICYmIHRlc3RDb250ZXh0KCBjb250ZXh0LnBhcmVudE5vZGUgKSB8fCBjb250ZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2VsZWN0b3IgPSBncm91cHMuam9pbihcIixcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbmV3U2VsZWN0b3IgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2guYXBwbHkoIHJlc3VsdHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbnRleHQucXVlcnlTZWxlY3RvckFsbCggbmV3U2VsZWN0b3IgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoKHFzYUVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggIW9sZCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5yZW1vdmVBdHRyaWJ1dGUoXCJpZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWxsIG90aGVyc1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGVjdCggc2VsZWN0b3IucmVwbGFjZSggcnRyaW0sIFwiJDFcIiApLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBDcmVhdGUga2V5LXZhbHVlIGNhY2hlcyBvZiBsaW1pdGVkIHNpemVcclxuICAgICAgICAgICAgICogQHJldHVybnMge0Z1bmN0aW9uKHN0cmluZywgT2JqZWN0KX0gUmV0dXJucyB0aGUgT2JqZWN0IGRhdGEgYWZ0ZXIgc3RvcmluZyBpdCBvbiBpdHNlbGYgd2l0aFxyXG4gICAgICAgICAgICAgKlx0cHJvcGVydHkgbmFtZSB0aGUgKHNwYWNlLXN1ZmZpeGVkKSBzdHJpbmcgYW5kIChpZiB0aGUgY2FjaGUgaXMgbGFyZ2VyIHRoYW4gRXhwci5jYWNoZUxlbmd0aClcclxuICAgICAgICAgICAgICpcdGRlbGV0aW5nIHRoZSBvbGRlc3QgZW50cnlcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUNhY2hlKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtleXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjYWNoZSgga2V5LCB2YWx1ZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBVc2UgKGtleSArIFwiIFwiKSB0byBhdm9pZCBjb2xsaXNpb24gd2l0aCBuYXRpdmUgcHJvdG90eXBlIHByb3BlcnRpZXMgKHNlZSBJc3N1ZSAjMTU3KVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgga2V5cy5wdXNoKCBrZXkgKyBcIiBcIiApID4gRXhwci5jYWNoZUxlbmd0aCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT25seSBrZWVwIHRoZSBtb3N0IHJlY2VudCBlbnRyaWVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjYWNoZVsga2V5cy5zaGlmdCgpIF07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoY2FjaGVbIGtleSArIFwiIFwiIF0gPSB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBNYXJrIGEgZnVuY3Rpb24gZm9yIHNwZWNpYWwgdXNlIGJ5IFNpenpsZVxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gbWFya1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZnVuY3Rpb24gbWFya0Z1bmN0aW9uKCBmbiApIHtcclxuICAgICAgICAgICAgICAgIGZuWyBleHBhbmRvIF0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogU3VwcG9ydCB0ZXN0aW5nIHVzaW5nIGFuIGVsZW1lbnRcclxuICAgICAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gUGFzc2VkIHRoZSBjcmVhdGVkIGRpdiBhbmQgZXhwZWN0cyBhIGJvb2xlYW4gcmVzdWx0XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBhc3NlcnQoIGZuICkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gISFmbiggZGl2ICk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgZnJvbSBpdHMgcGFyZW50IGJ5IGRlZmF1bHRcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIGRpdi5wYXJlbnROb2RlICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXYucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggZGl2ICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbGVhc2UgbWVtb3J5IGluIElFXHJcbiAgICAgICAgICAgICAgICAgICAgZGl2ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEFkZHMgdGhlIHNhbWUgaGFuZGxlciBmb3IgYWxsIG9mIHRoZSBzcGVjaWZpZWQgYXR0cnNcclxuICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGF0dHJzIFBpcGUtc2VwYXJhdGVkIGxpc3Qgb2YgYXR0cmlidXRlc1xyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyIFRoZSBtZXRob2QgdGhhdCB3aWxsIGJlIGFwcGxpZWRcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGFkZEhhbmRsZSggYXR0cnMsIGhhbmRsZXIgKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXJyID0gYXR0cnMuc3BsaXQoXCJ8XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGkgPSBhdHRycy5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgd2hpbGUgKCBpLS0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRXhwci5hdHRySGFuZGxlWyBhcnJbaV0gXSA9IGhhbmRsZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBDaGVja3MgZG9jdW1lbnQgb3JkZXIgb2YgdHdvIHNpYmxpbmdzXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gYVxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGJcclxuICAgICAgICAgICAgICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyBsZXNzIHRoYW4gMCBpZiBhIHByZWNlZGVzIGIsIGdyZWF0ZXIgdGhhbiAwIGlmIGEgZm9sbG93cyBiXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBzaWJsaW5nQ2hlY2soIGEsIGIgKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VyID0gYiAmJiBhLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpZmYgPSBjdXIgJiYgYS5ub2RlVHlwZSA9PT0gMSAmJiBiLm5vZGVUeXBlID09PSAxICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICggfmIuc291cmNlSW5kZXggfHwgTUFYX05FR0FUSVZFICkgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoIH5hLnNvdXJjZUluZGV4IHx8IE1BWF9ORUdBVElWRSApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVzZSBJRSBzb3VyY2VJbmRleCBpZiBhdmFpbGFibGUgb24gYm90aCBub2Rlc1xyXG4gICAgICAgICAgICAgICAgaWYgKCBkaWZmICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkaWZmO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGIgZm9sbG93cyBhXHJcbiAgICAgICAgICAgICAgICBpZiAoIGN1ciApIHtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIChjdXIgPSBjdXIubmV4dFNpYmxpbmcpICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGN1ciA9PT0gYiApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYSA/IDEgOiAtMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgaW5wdXQgdHlwZXNcclxuICAgICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUlucHV0UHNldWRvKCB0eXBlICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuYW1lID09PSBcImlucHV0XCIgJiYgZWxlbS50eXBlID09PSB0eXBlO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgYnV0dG9uc1xyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZnVuY3Rpb24gY3JlYXRlQnV0dG9uUHNldWRvKCB0eXBlICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAobmFtZSA9PT0gXCJpbnB1dFwiIHx8IG5hbWUgPT09IFwiYnV0dG9uXCIpICYmIGVsZW0udHlwZSA9PT0gdHlwZTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIHBvc2l0aW9uYWxzXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKCBmbiApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIGFyZ3VtZW50ICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3VtZW50ID0gK2FyZ3VtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlZWQsIG1hdGNoZXMgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBqLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hJbmRleGVzID0gZm4oIFtdLCBzZWVkLmxlbmd0aCwgYXJndW1lbnQgKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBtYXRjaEluZGV4ZXMubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWF0Y2ggZWxlbWVudHMgZm91bmQgYXQgdGhlIHNwZWNpZmllZCBpbmRleGVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICggaS0tICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBzZWVkWyAoaiA9IG1hdGNoSW5kZXhlc1tpXSkgXSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWVkW2pdID0gIShtYXRjaGVzW2pdID0gc2VlZFtqXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQ2hlY2tzIGEgbm9kZSBmb3IgdmFsaWRpdHkgYXMgYSBTaXp6bGUgY29udGV4dFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR8T2JqZWN0PX0gY29udGV4dFxyXG4gICAgICAgICAgICAgKiBAcmV0dXJucyB7RWxlbWVudHxPYmplY3R8Qm9vbGVhbn0gVGhlIGlucHV0IG5vZGUgaWYgYWNjZXB0YWJsZSwgb3RoZXJ3aXNlIGEgZmFsc3kgdmFsdWVcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHRlc3RDb250ZXh0KCBjb250ZXh0ICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29udGV4dDtcclxuICAgICAgICAgICAgfVxyXG5cclxuLy8gRXhwb3NlIHN1cHBvcnQgdmFycyBmb3IgY29udmVuaWVuY2VcclxuICAgICAgICAgICAgc3VwcG9ydCA9IFNpenpsZS5zdXBwb3J0ID0ge307XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogRGV0ZWN0cyBYTUwgbm9kZXNcclxuICAgICAgICAgICAgICogQHBhcmFtIHtFbGVtZW50fE9iamVjdH0gZWxlbSBBbiBlbGVtZW50IG9yIGEgZG9jdW1lbnRcclxuICAgICAgICAgICAgICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWZmIGVsZW0gaXMgYSBub24tSFRNTCBYTUwgbm9kZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgaXNYTUwgPSBTaXp6bGUuaXNYTUwgPSBmdW5jdGlvbiggZWxlbSApIHtcclxuICAgICAgICAgICAgICAgIC8vIGRvY3VtZW50RWxlbWVudCBpcyB2ZXJpZmllZCBmb3IgY2FzZXMgd2hlcmUgaXQgZG9lc24ndCB5ZXQgZXhpc3RcclxuICAgICAgICAgICAgICAgIC8vIChzdWNoIGFzIGxvYWRpbmcgaWZyYW1lcyBpbiBJRSAtICM0ODMzKVxyXG4gICAgICAgICAgICAgICAgdmFyIGRvY3VtZW50RWxlbWVudCA9IGVsZW0gJiYgKGVsZW0ub3duZXJEb2N1bWVudCB8fCBlbGVtKS5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnRFbGVtZW50ID8gZG9jdW1lbnRFbGVtZW50Lm5vZGVOYW1lICE9PSBcIkhUTUxcIiA6IGZhbHNlO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFNldHMgZG9jdW1lbnQtcmVsYXRlZCB2YXJpYWJsZXMgb25jZSBiYXNlZCBvbiB0aGUgY3VycmVudCBkb2N1bWVudFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR8T2JqZWN0fSBbZG9jXSBBbiBlbGVtZW50IG9yIGRvY3VtZW50IG9iamVjdCB0byB1c2UgdG8gc2V0IHRoZSBkb2N1bWVudFxyXG4gICAgICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjdXJyZW50IGRvY3VtZW50XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzZXREb2N1bWVudCA9IFNpenpsZS5zZXREb2N1bWVudCA9IGZ1bmN0aW9uKCBub2RlICkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhhc0NvbXBhcmUsIHBhcmVudCxcclxuICAgICAgICAgICAgICAgICAgICBkb2MgPSBub2RlID8gbm9kZS5vd25lckRvY3VtZW50IHx8IG5vZGUgOiBwcmVmZXJyZWREb2M7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgbm8gZG9jdW1lbnQgYW5kIGRvY3VtZW50RWxlbWVudCBpcyBhdmFpbGFibGUsIHJldHVyblxyXG4gICAgICAgICAgICAgICAgaWYgKCBkb2MgPT09IGRvY3VtZW50IHx8IGRvYy5ub2RlVHlwZSAhPT0gOSB8fCAhZG9jLmRvY3VtZW50RWxlbWVudCApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2V0IG91ciBkb2N1bWVudFxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQgPSBkb2M7XHJcbiAgICAgICAgICAgICAgICBkb2NFbGVtID0gZG9jLmRvY3VtZW50RWxlbWVudDtcclxuICAgICAgICAgICAgICAgIHBhcmVudCA9IGRvYy5kZWZhdWx0VmlldztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRT44XHJcbiAgICAgICAgICAgICAgICAvLyBJZiBpZnJhbWUgZG9jdW1lbnQgaXMgYXNzaWduZWQgdG8gXCJkb2N1bWVudFwiIHZhcmlhYmxlIGFuZCBpZiBpZnJhbWUgaGFzIGJlZW4gcmVsb2FkZWQsXHJcbiAgICAgICAgICAgICAgICAvLyBJRSB3aWxsIHRocm93IFwicGVybWlzc2lvbiBkZW5pZWRcIiBlcnJvciB3aGVuIGFjY2Vzc2luZyBcImRvY3VtZW50XCIgdmFyaWFibGUsIHNlZSBqUXVlcnkgIzEzOTM2XHJcbiAgICAgICAgICAgICAgICAvLyBJRTYtOCBkbyBub3Qgc3VwcG9ydCB0aGUgZGVmYXVsdFZpZXcgcHJvcGVydHkgc28gcGFyZW50IHdpbGwgYmUgdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICBpZiAoIHBhcmVudCAmJiBwYXJlbnQgIT09IHBhcmVudC50b3AgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSUUxMSBkb2VzIG5vdCBoYXZlIGF0dGFjaEV2ZW50LCBzbyBhbGwgbXVzdCBzdWZmZXJcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIHBhcmVudC5hZGRFdmVudExpc3RlbmVyICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJ1bmxvYWRcIiwgdW5sb2FkSGFuZGxlciwgZmFsc2UgKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBwYXJlbnQuYXR0YWNoRXZlbnQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudC5hdHRhY2hFdmVudCggXCJvbnVubG9hZFwiLCB1bmxvYWRIYW5kbGVyICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8qIFN1cHBvcnQgdGVzdHNcclxuICAgICAgICAgICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudElzSFRNTCA9ICFpc1hNTCggZG9jICk7XHJcblxyXG4gICAgICAgICAgICAgICAgLyogQXR0cmlidXRlc1xyXG4gICAgICAgICAgICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTw4XHJcbiAgICAgICAgICAgICAgICAvLyBWZXJpZnkgdGhhdCBnZXRBdHRyaWJ1dGUgcmVhbGx5IHJldHVybnMgYXR0cmlidXRlcyBhbmQgbm90IHByb3BlcnRpZXNcclxuICAgICAgICAgICAgICAgIC8vIChleGNlcHRpbmcgSUU4IGJvb2xlYW5zKVxyXG4gICAgICAgICAgICAgICAgc3VwcG9ydC5hdHRyaWJ1dGVzID0gYXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2LmNsYXNzTmFtZSA9IFwiaVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhZGl2LmdldEF0dHJpYnV0ZShcImNsYXNzTmFtZVwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8qIGdldEVsZW1lbnQocylCeSpcclxuICAgICAgICAgICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCIqXCIpIHJldHVybnMgb25seSBlbGVtZW50c1xyXG4gICAgICAgICAgICAgICAgc3VwcG9ydC5nZXRFbGVtZW50c0J5VGFnTmFtZSA9IGFzc2VydChmdW5jdGlvbiggZGl2ICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZCggZG9jLmNyZWF0ZUNvbW1lbnQoXCJcIikgKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZShcIipcIikubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU8OVxyXG4gICAgICAgICAgICAgICAgc3VwcG9ydC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lID0gcm5hdGl2ZS50ZXN0KCBkb2MuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFPDEwXHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBnZXRFbGVtZW50QnlJZCByZXR1cm5zIGVsZW1lbnRzIGJ5IG5hbWVcclxuICAgICAgICAgICAgICAgIC8vIFRoZSBicm9rZW4gZ2V0RWxlbWVudEJ5SWQgbWV0aG9kcyBkb24ndCBwaWNrIHVwIHByb2dyYW1hdGljYWxseS1zZXQgbmFtZXMsXHJcbiAgICAgICAgICAgICAgICAvLyBzbyB1c2UgYSByb3VuZGFib3V0IGdldEVsZW1lbnRzQnlOYW1lIHRlc3RcclxuICAgICAgICAgICAgICAgIHN1cHBvcnQuZ2V0QnlJZCA9IGFzc2VydChmdW5jdGlvbiggZGl2ICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY0VsZW0uYXBwZW5kQ2hpbGQoIGRpdiApLmlkID0gZXhwYW5kbztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWRvYy5nZXRFbGVtZW50c0J5TmFtZSB8fCAhZG9jLmdldEVsZW1lbnRzQnlOYW1lKCBleHBhbmRvICkubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSUQgZmluZCBhbmQgZmlsdGVyXHJcbiAgICAgICAgICAgICAgICBpZiAoIHN1cHBvcnQuZ2V0QnlJZCApIHtcclxuICAgICAgICAgICAgICAgICAgICBFeHByLmZpbmRbXCJJRFwiXSA9IGZ1bmN0aW9uKCBpZCwgY29udGV4dCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50QnlJZCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudElzSFRNTCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtID0gY29udGV4dC5nZXRFbGVtZW50QnlJZCggaWQgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIHBhcmVudE5vZGUgdG8gY2F0Y2ggd2hlbiBCbGFja2JlcnJ5IDQuNiByZXR1cm5zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBub2RlcyB0aGF0IGFyZSBubyBsb25nZXIgaW4gdGhlIGRvY3VtZW50ICM2OTYzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbSAmJiBtLnBhcmVudE5vZGUgPyBbIG0gXSA6IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBFeHByLmZpbHRlcltcIklEXCJdID0gZnVuY3Rpb24oIGlkICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXR0cklkID0gaWQucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKFwiaWRcIikgPT09IGF0dHJJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTYvN1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGdldEVsZW1lbnRCeUlkIGlzIG5vdCByZWxpYWJsZSBhcyBhIGZpbmQgc2hvcnRjdXRcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgRXhwci5maW5kW1wiSURcIl07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEV4cHIuZmlsdGVyW1wiSURcIl0gPSAgZnVuY3Rpb24oIGlkICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXR0cklkID0gaWQucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUgPSB0eXBlb2YgZWxlbS5nZXRBdHRyaWJ1dGVOb2RlICE9PSBcInVuZGVmaW5lZFwiICYmIGVsZW0uZ2V0QXR0cmlidXRlTm9kZShcImlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUgJiYgbm9kZS52YWx1ZSA9PT0gYXR0cklkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVGFnXHJcbiAgICAgICAgICAgICAgICBFeHByLmZpbmRbXCJUQUdcIl0gPSBzdXBwb3J0LmdldEVsZW1lbnRzQnlUYWdOYW1lID9cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiggdGFnLCBjb250ZXh0ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lICE9PSBcInVuZGVmaW5lZFwiICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIHRhZyApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvY3VtZW50RnJhZ21lbnQgbm9kZXMgZG9uJ3QgaGF2ZSBnRUJUTlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBzdXBwb3J0LnFzYSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIHRhZyApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSA6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCB0YWcsIGNvbnRleHQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQnkgaGFwcHkgY29pbmNpZGVuY2UsIGEgKGJyb2tlbikgZ0VCVE4gYXBwZWFycyBvbiBEb2N1bWVudEZyYWdtZW50IG5vZGVzIHRvb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9IGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIHRhZyApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmlsdGVyIG91dCBwb3NzaWJsZSBjb21tZW50c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHRhZyA9PT0gXCIqXCIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIChlbGVtID0gcmVzdWx0c1tpKytdKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcC5wdXNoKCBlbGVtICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0bXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDbGFzc1xyXG4gICAgICAgICAgICAgICAgRXhwci5maW5kW1wiQ0xBU1NcIl0gPSBzdXBwb3J0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgJiYgZnVuY3Rpb24oIGNsYXNzTmFtZSwgY29udGV4dCApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIGRvY3VtZW50SXNIVE1MICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBjbGFzc05hbWUgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIC8qIFFTQS9tYXRjaGVzU2VsZWN0b3JcclxuICAgICAgICAgICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUVNBIGFuZCBtYXRjaGVzU2VsZWN0b3Igc3VwcG9ydFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIG1hdGNoZXNTZWxlY3Rvcig6YWN0aXZlKSByZXBvcnRzIGZhbHNlIHdoZW4gdHJ1ZSAoSUU5L09wZXJhIDExLjUpXHJcbiAgICAgICAgICAgICAgICByYnVnZ3lNYXRjaGVzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcVNhKDpmb2N1cykgcmVwb3J0cyBmYWxzZSB3aGVuIHRydWUgKENocm9tZSAyMSlcclxuICAgICAgICAgICAgICAgIC8vIFdlIGFsbG93IHRoaXMgYmVjYXVzZSBvZiBhIGJ1ZyBpbiBJRTgvOSB0aGF0IHRocm93cyBhbiBlcnJvclxyXG4gICAgICAgICAgICAgICAgLy8gd2hlbmV2ZXIgYGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRgIGlzIGFjY2Vzc2VkIG9uIGFuIGlmcmFtZVxyXG4gICAgICAgICAgICAgICAgLy8gU28sIHdlIGFsbG93IDpmb2N1cyB0byBwYXNzIHRocm91Z2ggUVNBIGFsbCB0aGUgdGltZSB0byBhdm9pZCB0aGUgSUUgZXJyb3JcclxuICAgICAgICAgICAgICAgIC8vIFNlZSBodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xMzM3OFxyXG4gICAgICAgICAgICAgICAgcmJ1Z2d5UVNBID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCAoc3VwcG9ydC5xc2EgPSBybmF0aXZlLnRlc3QoIGRvYy5xdWVyeVNlbGVjdG9yQWxsICkpICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEJ1aWxkIFFTQSByZWdleFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlZ2V4IHN0cmF0ZWd5IGFkb3B0ZWQgZnJvbSBEaWVnbyBQZXJpbmlcclxuICAgICAgICAgICAgICAgICAgICBhc3NlcnQoZnVuY3Rpb24oIGRpdiApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2VsZWN0IGlzIHNldCB0byBlbXB0eSBzdHJpbmcgb24gcHVycG9zZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIHRvIHRlc3QgSUUncyB0cmVhdG1lbnQgb2Ygbm90IGV4cGxpY2l0bHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0dGluZyBhIGJvb2xlYW4gY29udGVudCBhdHRyaWJ1dGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNpbmNlIGl0cyBwcmVzZW5jZSBzaG91bGQgYmUgZW5vdWdoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzEyMzU5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY0VsZW0uYXBwZW5kQ2hpbGQoIGRpdiApLmlubmVySFRNTCA9IFwiPGEgaWQ9J1wiICsgZXhwYW5kbyArIFwiJz48L2E+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjxzZWxlY3QgaWQ9J1wiICsgZXhwYW5kbyArIFwiLVxcZl0nIG1zYWxsb3djYXB0dXJlPScnPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8b3B0aW9uIHNlbGVjdGVkPScnPjwvb3B0aW9uPjwvc2VsZWN0PlwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU4LCBPcGVyYSAxMS0xMi4xNlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOb3RoaW5nIHNob3VsZCBiZSBzZWxlY3RlZCB3aGVuIGVtcHR5IHN0cmluZ3MgZm9sbG93IF49IG9yICQ9IG9yICo9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSB0ZXN0IGF0dHJpYnV0ZSBtdXN0IGJlIHVua25vd24gaW4gT3BlcmEgYnV0IFwic2FmZVwiIGZvciBXaW5SVFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaWUvaGg0NjUzODguYXNweCNhdHRyaWJ1dGVfc2VjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGRpdi5xdWVyeVNlbGVjdG9yQWxsKFwiW21zYWxsb3djYXB0dXJlXj0nJ11cIikubGVuZ3RoICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmJ1Z2d5UVNBLnB1c2goIFwiWypeJF09XCIgKyB3aGl0ZXNwYWNlICsgXCIqKD86Jyd8XFxcIlxcXCIpXCIgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJvb2xlYW4gYXR0cmlidXRlcyBhbmQgXCJ2YWx1ZVwiIGFyZSBub3QgdHJlYXRlZCBjb3JyZWN0bHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAhZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbc2VsZWN0ZWRdXCIpLmxlbmd0aCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJidWdneVFTQS5wdXNoKCBcIlxcXFxbXCIgKyB3aGl0ZXNwYWNlICsgXCIqKD86dmFsdWV8XCIgKyBib29sZWFucyArIFwiKVwiICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IENocm9tZTwyOSwgQW5kcm9pZDw0LjIrLCBTYWZhcmk8Ny4wKywgaU9TPDcuMCssIFBoYW50b21KUzwxLjkuNytcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAhZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoIFwiW2lkfj1cIiArIGV4cGFuZG8gKyBcIi1dXCIgKS5sZW5ndGggKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYnVnZ3lRU0EucHVzaChcIn49XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZWJraXQvT3BlcmEgLSA6Y2hlY2tlZCBzaG91bGQgcmV0dXJuIHNlbGVjdGVkIG9wdGlvbiBlbGVtZW50c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDExL1JFQy1jc3MzLXNlbGVjdG9ycy0yMDExMDkyOS8jY2hlY2tlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJRTggdGhyb3dzIGVycm9yIGhlcmUgYW5kIHdpbGwgbm90IHNlZSBsYXRlciB0ZXN0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoICFkaXYucXVlcnlTZWxlY3RvckFsbChcIjpjaGVja2VkXCIpLmxlbmd0aCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJidWdneVFTQS5wdXNoKFwiOmNoZWNrZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IFNhZmFyaSA4KywgaU9TIDgrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMzY4NTFcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW4tcGFnZSBgc2VsZWN0b3IjaWQgc2liaW5nLWNvbWJpbmF0b3Igc2VsZWN0b3JgIGZhaWxzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggIWRpdi5xdWVyeVNlbGVjdG9yQWxsKCBcImEjXCIgKyBleHBhbmRvICsgXCIrKlwiICkubGVuZ3RoICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmJ1Z2d5UVNBLnB1c2goXCIuIy4rWyt+XVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhc3NlcnQoZnVuY3Rpb24oIGRpdiApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogV2luZG93cyA4IE5hdGl2ZSBBcHBzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSB0eXBlIGFuZCBuYW1lIGF0dHJpYnV0ZXMgYXJlIHJlc3RyaWN0ZWQgZHVyaW5nIC5pbm5lckhUTUwgYXNzaWdubWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSBkb2MuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoIFwidHlwZVwiLCBcImhpZGRlblwiICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZCggaW5wdXQgKS5zZXRBdHRyaWJ1dGUoIFwibmFtZVwiLCBcIkRcIiApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVuZm9yY2UgY2FzZS1zZW5zaXRpdml0eSBvZiBuYW1lIGF0dHJpYnV0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGRpdi5xdWVyeVNlbGVjdG9yQWxsKFwiW25hbWU9ZF1cIikubGVuZ3RoICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmJ1Z2d5UVNBLnB1c2goIFwibmFtZVwiICsgd2hpdGVzcGFjZSArIFwiKlsqXiR8IX5dPz1cIiApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGRiAzLjUgLSA6ZW5hYmxlZC86ZGlzYWJsZWQgYW5kIGhpZGRlbiBlbGVtZW50cyAoaGlkZGVuIGVsZW1lbnRzIGFyZSBzdGlsbCBlbmFibGVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJRTggdGhyb3dzIGVycm9yIGhlcmUgYW5kIHdpbGwgbm90IHNlZSBsYXRlciB0ZXN0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoICFkaXYucXVlcnlTZWxlY3RvckFsbChcIjplbmFibGVkXCIpLmxlbmd0aCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJidWdneVFTQS5wdXNoKCBcIjplbmFibGVkXCIsIFwiOmRpc2FibGVkXCIgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3BlcmEgMTAtMTEgZG9lcyBub3QgdGhyb3cgb24gcG9zdC1jb21tYSBpbnZhbGlkIHBzZXVkb3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCIqLDp4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYnVnZ3lRU0EucHVzaChcIiwuKjpcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCAoc3VwcG9ydC5tYXRjaGVzU2VsZWN0b3IgPSBybmF0aXZlLnRlc3QoIChtYXRjaGVzID0gZG9jRWxlbS5tYXRjaGVzIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jRWxlbS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcclxuICAgICAgICAgICAgICAgICAgICBkb2NFbGVtLm1vek1hdGNoZXNTZWxlY3RvciB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGRvY0VsZW0ub01hdGNoZXNTZWxlY3RvciB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGRvY0VsZW0ubXNNYXRjaGVzU2VsZWN0b3IpICkpICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhc3NlcnQoZnVuY3Rpb24oIGRpdiApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIGl0J3MgcG9zc2libGUgdG8gZG8gbWF0Y2hlc1NlbGVjdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9uIGEgZGlzY29ubmVjdGVkIG5vZGUgKElFIDkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnQuZGlzY29ubmVjdGVkTWF0Y2ggPSBtYXRjaGVzLmNhbGwoIGRpdiwgXCJkaXZcIiApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBzaG91bGQgZmFpbCB3aXRoIGFuIGV4Y2VwdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBHZWNrbyBkb2VzIG5vdCBlcnJvciwgcmV0dXJucyBmYWxzZSBpbnN0ZWFkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXMuY2FsbCggZGl2LCBcIltzIT0nJ106eFwiICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJidWdneU1hdGNoZXMucHVzaCggXCIhPVwiLCBwc2V1ZG9zICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmJ1Z2d5UVNBID0gcmJ1Z2d5UVNBLmxlbmd0aCAmJiBuZXcgUmVnRXhwKCByYnVnZ3lRU0Euam9pbihcInxcIikgKTtcclxuICAgICAgICAgICAgICAgIHJidWdneU1hdGNoZXMgPSByYnVnZ3lNYXRjaGVzLmxlbmd0aCAmJiBuZXcgUmVnRXhwKCByYnVnZ3lNYXRjaGVzLmpvaW4oXCJ8XCIpICk7XHJcblxyXG4gICAgICAgICAgICAgICAgLyogQ29udGFpbnNcclxuICAgICAgICAgICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgICAgICAgICAgICAgICBoYXNDb21wYXJlID0gcm5hdGl2ZS50ZXN0KCBkb2NFbGVtLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uICk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRWxlbWVudCBjb250YWlucyBhbm90aGVyXHJcbiAgICAgICAgICAgICAgICAvLyBQdXJwb3NlZnVsbHkgZG9lcyBub3QgaW1wbGVtZW50IGluY2x1c2l2ZSBkZXNjZW5kZW50XHJcbiAgICAgICAgICAgICAgICAvLyBBcyBpbiwgYW4gZWxlbWVudCBkb2VzIG5vdCBjb250YWluIGl0c2VsZlxyXG4gICAgICAgICAgICAgICAgY29udGFpbnMgPSBoYXNDb21wYXJlIHx8IHJuYXRpdmUudGVzdCggZG9jRWxlbS5jb250YWlucyApID9cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiggYSwgYiApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFkb3duID0gYS5ub2RlVHlwZSA9PT0gOSA/IGEuZG9jdW1lbnRFbGVtZW50IDogYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1cCA9IGIgJiYgYi5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYSA9PT0gYnVwIHx8ICEhKCBidXAgJiYgYnVwLm5vZGVUeXBlID09PSAxICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZG93bi5jb250YWlucyA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkb3duLmNvbnRhaW5zKCBidXAgKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiAmJiBhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBidXAgKSAmIDE2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgICAgICAgICB9IDpcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiggYSwgYiApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBiICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCAoYiA9IGIucGFyZW50Tm9kZSkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBiID09PSBhICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgLyogU29ydGluZ1xyXG4gICAgICAgICAgICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEb2N1bWVudCBvcmRlciBzb3J0aW5nXHJcbiAgICAgICAgICAgICAgICBzb3J0T3JkZXIgPSBoYXNDb21wYXJlID9cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiggYSwgYiApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZsYWcgZm9yIGR1cGxpY2F0ZSByZW1vdmFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggYSA9PT0gYiApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0R1cGxpY2F0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU29ydCBvbiBtZXRob2QgZXhpc3RlbmNlIGlmIG9ubHkgb25lIGlucHV0IGhhcyBjb21wYXJlRG9jdW1lbnRQb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29tcGFyZSA9ICFhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uIC0gIWIuY29tcGFyZURvY3VtZW50UG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggY29tcGFyZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21wYXJlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDYWxjdWxhdGUgcG9zaXRpb24gaWYgYm90aCBpbnB1dHMgYmVsb25nIHRvIHRoZSBzYW1lIGRvY3VtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBhcmUgPSAoIGEub3duZXJEb2N1bWVudCB8fCBhICkgPT09ICggYi5vd25lckRvY3VtZW50IHx8IGIgKSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBiICkgOlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSB3ZSBrbm93IHRoZXkgYXJlIGRpc2Nvbm5lY3RlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERpc2Nvbm5lY3RlZCBub2Rlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGNvbXBhcmUgJiAxIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoIXN1cHBvcnQuc29ydERldGFjaGVkICYmIGIuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGEgKSA9PT0gY29tcGFyZSkgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2hvb3NlIHRoZSBmaXJzdCBlbGVtZW50IHRoYXQgaXMgcmVsYXRlZCB0byBvdXIgcHJlZmVycmVkIGRvY3VtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGEgPT09IGRvYyB8fCBhLm93bmVyRG9jdW1lbnQgPT09IHByZWZlcnJlZERvYyAmJiBjb250YWlucyhwcmVmZXJyZWREb2MsIGEpICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggYiA9PT0gZG9jIHx8IGIub3duZXJEb2N1bWVudCA9PT0gcHJlZmVycmVkRG9jICYmIGNvbnRhaW5zKHByZWZlcnJlZERvYywgYikgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWFpbnRhaW4gb3JpZ2luYWwgb3JkZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzb3J0SW5wdXQgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICggaW5kZXhPZiggc29ydElucHV0LCBhICkgLSBpbmRleE9mKCBzb3J0SW5wdXQsIGIgKSApIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tcGFyZSAmIDQgPyAtMSA6IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSA6XHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oIGEsIGIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4aXQgZWFybHkgaWYgdGhlIG5vZGVzIGFyZSBpZGVudGljYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBhID09PSBiICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzRHVwbGljYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXAgPSBhLnBhcmVudE5vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXAgPSBiLnBhcmVudE5vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcCA9IFsgYSBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnAgPSBbIGIgXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBhcmVudGxlc3Mgbm9kZXMgYXJlIGVpdGhlciBkb2N1bWVudHMgb3IgZGlzY29ubmVjdGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggIWF1cCB8fCAhYnVwICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGEgPT09IGRvYyA/IC0xIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiID09PSBkb2MgPyAxIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXVwID8gLTEgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVwID8gMSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydElucHV0ID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCBpbmRleE9mKCBzb3J0SW5wdXQsIGEgKSAtIGluZGV4T2YoIHNvcnRJbnB1dCwgYiApICkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBub2RlcyBhcmUgc2libGluZ3MsIHdlIGNhbiBkbyBhIHF1aWNrIGNoZWNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIGF1cCA9PT0gYnVwICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNpYmxpbmdDaGVjayggYSwgYiApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2Ugd2UgbmVlZCBmdWxsIGxpc3RzIG9mIHRoZWlyIGFuY2VzdG9ycyBmb3IgY29tcGFyaXNvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXIgPSBhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIChjdXIgPSBjdXIucGFyZW50Tm9kZSkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcC51bnNoaWZ0KCBjdXIgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXIgPSBiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIChjdXIgPSBjdXIucGFyZW50Tm9kZSkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicC51bnNoaWZ0KCBjdXIgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2FsayBkb3duIHRoZSB0cmVlIGxvb2tpbmcgZm9yIGEgZGlzY3JlcGFuY3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCBhcFtpXSA9PT0gYnBbaV0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvIGEgc2libGluZyBjaGVjayBpZiB0aGUgbm9kZXMgaGF2ZSBhIGNvbW1vbiBhbmNlc3RvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2libGluZ0NoZWNrKCBhcFtpXSwgYnBbaV0gKSA6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIG5vZGVzIGluIG91ciBkb2N1bWVudCBzb3J0IGZpcnN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcFtpXSA9PT0gcHJlZmVycmVkRG9jID8gLTEgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJwW2ldID09PSBwcmVmZXJyZWREb2MgPyAxIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMDtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBkb2M7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBTaXp6bGUubWF0Y2hlcyA9IGZ1bmN0aW9uKCBleHByLCBlbGVtZW50cyApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBTaXp6bGUoIGV4cHIsIG51bGwsIG51bGwsIGVsZW1lbnRzICk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBTaXp6bGUubWF0Y2hlc1NlbGVjdG9yID0gZnVuY3Rpb24oIGVsZW0sIGV4cHIgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgZG9jdW1lbnQgdmFycyBpZiBuZWVkZWRcclxuICAgICAgICAgICAgICAgIGlmICggKCBlbGVtLm93bmVyRG9jdW1lbnQgfHwgZWxlbSApICE9PSBkb2N1bWVudCApIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXREb2N1bWVudCggZWxlbSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IGF0dHJpYnV0ZSBzZWxlY3RvcnMgYXJlIHF1b3RlZFxyXG4gICAgICAgICAgICAgICAgZXhwciA9IGV4cHIucmVwbGFjZSggcmF0dHJpYnV0ZVF1b3RlcywgXCI9JyQxJ11cIiApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggc3VwcG9ydC5tYXRjaGVzU2VsZWN0b3IgJiYgZG9jdW1lbnRJc0hUTUwgJiZcclxuICAgICAgICAgICAgICAgICAgICAoICFyYnVnZ3lNYXRjaGVzIHx8ICFyYnVnZ3lNYXRjaGVzLnRlc3QoIGV4cHIgKSApICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKCAhcmJ1Z2d5UVNBICAgICB8fCAhcmJ1Z2d5UVNBLnRlc3QoIGV4cHIgKSApICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0ID0gbWF0Y2hlcy5jYWxsKCBlbGVtLCBleHByICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJRSA5J3MgbWF0Y2hlc1NlbGVjdG9yIHJldHVybnMgZmFsc2Ugb24gZGlzY29ubmVjdGVkIG5vZGVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggcmV0IHx8IHN1cHBvcnQuZGlzY29ubmVjdGVkTWF0Y2ggfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBcyB3ZWxsLCBkaXNjb25uZWN0ZWQgbm9kZXMgYXJlIHNhaWQgdG8gYmUgaW4gYSBkb2N1bWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZyYWdtZW50IGluIElFIDlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uZG9jdW1lbnQgJiYgZWxlbS5kb2N1bWVudC5ub2RlVHlwZSAhPT0gMTEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU2l6emxlKCBleHByLCBkb2N1bWVudCwgbnVsbCwgWyBlbGVtIF0gKS5sZW5ndGggPiAwO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgU2l6emxlLmNvbnRhaW5zID0gZnVuY3Rpb24oIGNvbnRleHQsIGVsZW0gKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgZG9jdW1lbnQgdmFycyBpZiBuZWVkZWRcclxuICAgICAgICAgICAgICAgIGlmICggKCBjb250ZXh0Lm93bmVyRG9jdW1lbnQgfHwgY29udGV4dCApICE9PSBkb2N1bWVudCApIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXREb2N1bWVudCggY29udGV4dCApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5zKCBjb250ZXh0LCBlbGVtICk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBTaXp6bGUuYXR0ciA9IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IGRvY3VtZW50IHZhcnMgaWYgbmVlZGVkXHJcbiAgICAgICAgICAgICAgICBpZiAoICggZWxlbS5vd25lckRvY3VtZW50IHx8IGVsZW0gKSAhPT0gZG9jdW1lbnQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0RG9jdW1lbnQoIGVsZW0gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZm4gPSBFeHByLmF0dHJIYW5kbGVbIG5hbWUudG9Mb3dlckNhc2UoKSBdLFxyXG4gICAgICAgICAgICAgICAgLy8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBPYmplY3QucHJvdG90eXBlIHByb3BlcnRpZXMgKGpRdWVyeSAjMTM4MDcpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gZm4gJiYgaGFzT3duLmNhbGwoIEV4cHIuYXR0ckhhbmRsZSwgbmFtZS50b0xvd2VyQ2FzZSgpICkgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbiggZWxlbSwgbmFtZSwgIWRvY3VtZW50SXNIVE1MICkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbCAhPT0gdW5kZWZpbmVkID9cclxuICAgICAgICAgICAgICAgICAgICB2YWwgOlxyXG4gICAgICAgICAgICAgICAgICAgIHN1cHBvcnQuYXR0cmlidXRlcyB8fCAhZG9jdW1lbnRJc0hUTUwgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSApIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHZhbCA9IGVsZW0uZ2V0QXR0cmlidXRlTm9kZShuYW1lKSkgJiYgdmFsLnNwZWNpZmllZCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwudmFsdWUgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIFNpenpsZS5lcnJvciA9IGZ1bmN0aW9uKCBtc2cgKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIFwiU3ludGF4IGVycm9yLCB1bnJlY29nbml6ZWQgZXhwcmVzc2lvbjogXCIgKyBtc2cgKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBEb2N1bWVudCBzb3J0aW5nIGFuZCByZW1vdmluZyBkdXBsaWNhdGVzXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7QXJyYXlMaWtlfSByZXN1bHRzXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBTaXp6bGUudW5pcXVlU29ydCA9IGZ1bmN0aW9uKCByZXN1bHRzICkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW0sXHJcbiAgICAgICAgICAgICAgICAgICAgZHVwbGljYXRlcyA9IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIGogPSAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGkgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVubGVzcyB3ZSAqa25vdyogd2UgY2FuIGRldGVjdCBkdXBsaWNhdGVzLCBhc3N1bWUgdGhlaXIgcHJlc2VuY2VcclxuICAgICAgICAgICAgICAgIGhhc0R1cGxpY2F0ZSA9ICFzdXBwb3J0LmRldGVjdER1cGxpY2F0ZXM7XHJcbiAgICAgICAgICAgICAgICBzb3J0SW5wdXQgPSAhc3VwcG9ydC5zb3J0U3RhYmxlICYmIHJlc3VsdHMuc2xpY2UoIDAgKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdHMuc29ydCggc29ydE9yZGVyICk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCBoYXNEdXBsaWNhdGUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCAoZWxlbSA9IHJlc3VsdHNbaSsrXSkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZWxlbSA9PT0gcmVzdWx0c1sgaSBdICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaiA9IGR1cGxpY2F0ZXMucHVzaCggaSApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICggai0tICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnNwbGljZSggZHVwbGljYXRlc1sgaiBdLCAxICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIENsZWFyIGlucHV0IGFmdGVyIHNvcnRpbmcgdG8gcmVsZWFzZSBvYmplY3RzXHJcbiAgICAgICAgICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9zaXp6bGUvcHVsbC8yMjVcclxuICAgICAgICAgICAgICAgIHNvcnRJbnB1dCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogVXRpbGl0eSBmdW5jdGlvbiBmb3IgcmV0cmlldmluZyB0aGUgdGV4dCB2YWx1ZSBvZiBhbiBhcnJheSBvZiBET00gbm9kZXNcclxuICAgICAgICAgICAgICogQHBhcmFtIHtBcnJheXxFbGVtZW50fSBlbGVtXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBnZXRUZXh0ID0gU2l6emxlLmdldFRleHQgPSBmdW5jdGlvbiggZWxlbSApIHtcclxuICAgICAgICAgICAgICAgIHZhciBub2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJldCA9IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaSA9IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZVR5cGUgPSBlbGVtLm5vZGVUeXBlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggIW5vZGVUeXBlICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIG5vIG5vZGVUeXBlLCB0aGlzIGlzIGV4cGVjdGVkIHRvIGJlIGFuIGFycmF5XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCAobm9kZSA9IGVsZW1baSsrXSkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvIG5vdCB0cmF2ZXJzZSBjb21tZW50IG5vZGVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldCArPSBnZXRUZXh0KCBub2RlICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICggbm9kZVR5cGUgPT09IDEgfHwgbm9kZVR5cGUgPT09IDkgfHwgbm9kZVR5cGUgPT09IDExICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFVzZSB0ZXh0Q29udGVudCBmb3IgZWxlbWVudHNcclxuICAgICAgICAgICAgICAgICAgICAvLyBpbm5lclRleHQgdXNhZ2UgcmVtb3ZlZCBmb3IgY29uc2lzdGVuY3kgb2YgbmV3IGxpbmVzIChqUXVlcnkgIzExMTUzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggdHlwZW9mIGVsZW0udGV4dENvbnRlbnQgPT09IFwic3RyaW5nXCIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRyYXZlcnNlIGl0cyBjaGlsZHJlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKCBlbGVtID0gZWxlbS5maXJzdENoaWxkOyBlbGVtOyBlbGVtID0gZWxlbS5uZXh0U2libGluZyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldCArPSBnZXRUZXh0KCBlbGVtICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBub2RlVHlwZSA9PT0gMyB8fCBub2RlVHlwZSA9PT0gNCApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbS5ub2RlVmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBEbyBub3QgaW5jbHVkZSBjb21tZW50IG9yIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24gbm9kZXNcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgRXhwciA9IFNpenpsZS5zZWxlY3RvcnMgPSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2FuIGJlIGFkanVzdGVkIGJ5IHRoZSB1c2VyXHJcbiAgICAgICAgICAgICAgICBjYWNoZUxlbmd0aDogNTAsXHJcblxyXG4gICAgICAgICAgICAgICAgY3JlYXRlUHNldWRvOiBtYXJrRnVuY3Rpb24sXHJcblxyXG4gICAgICAgICAgICAgICAgbWF0Y2g6IG1hdGNoRXhwcixcclxuXHJcbiAgICAgICAgICAgICAgICBhdHRySGFuZGxlOiB7fSxcclxuXHJcbiAgICAgICAgICAgICAgICBmaW5kOiB7fSxcclxuXHJcbiAgICAgICAgICAgICAgICByZWxhdGl2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiPlwiOiB7IGRpcjogXCJwYXJlbnROb2RlXCIsIGZpcnN0OiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCIgXCI6IHsgZGlyOiBcInBhcmVudE5vZGVcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiK1wiOiB7IGRpcjogXCJwcmV2aW91c1NpYmxpbmdcIiwgZmlyc3Q6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICBcIn5cIjogeyBkaXI6IFwicHJldmlvdXNTaWJsaW5nXCIgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBwcmVGaWx0ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcIkFUVFJcIjogZnVuY3Rpb24oIG1hdGNoICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaFsxXSA9IG1hdGNoWzFdLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBNb3ZlIHRoZSBnaXZlbiB2YWx1ZSB0byBtYXRjaFszXSB3aGV0aGVyIHF1b3RlZCBvciB1bnF1b3RlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaFszXSA9ICggbWF0Y2hbM10gfHwgbWF0Y2hbNF0gfHwgbWF0Y2hbNV0gfHwgXCJcIiApLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG1hdGNoWzJdID09PSBcIn49XCIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaFszXSA9IFwiIFwiICsgbWF0Y2hbM10gKyBcIiBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoLnNsaWNlKCAwLCA0ICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXCJDSElMRFwiOiBmdW5jdGlvbiggbWF0Y2ggKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIG1hdGNoZXMgZnJvbSBtYXRjaEV4cHJbXCJDSElMRFwiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgMSB0eXBlIChvbmx5fG50aHwuLi4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAyIHdoYXQgKGNoaWxkfG9mLXR5cGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAzIGFyZ3VtZW50IChldmVufG9kZHxcXGQqfFxcZCpuKFsrLV1cXGQrKT98Li4uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgNCB4bi1jb21wb25lbnQgb2YgeG4reSBhcmd1bWVudCAoWystXT9cXGQqbnwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA1IHNpZ24gb2YgeG4tY29tcG9uZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA2IHggb2YgeG4tY29tcG9uZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA3IHNpZ24gb2YgeS1jb21wb25lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgIDggeSBvZiB5LWNvbXBvbmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hbMV0gPSBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBtYXRjaFsxXS5zbGljZSggMCwgMyApID09PSBcIm50aFwiICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbnRoLSogcmVxdWlyZXMgYXJndW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggIW1hdGNoWzNdICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNpenpsZS5lcnJvciggbWF0Y2hbMF0gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBudW1lcmljIHggYW5kIHkgcGFyYW1ldGVycyBmb3IgRXhwci5maWx0ZXIuQ0hJTERcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlbWVtYmVyIHRoYXQgZmFsc2UvdHJ1ZSBjYXN0IHJlc3BlY3RpdmVseSB0byAwLzFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoWzRdID0gKyggbWF0Y2hbNF0gPyBtYXRjaFs1XSArIChtYXRjaFs2XSB8fCAxKSA6IDIgKiAoIG1hdGNoWzNdID09PSBcImV2ZW5cIiB8fCBtYXRjaFszXSA9PT0gXCJvZGRcIiApICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaFs1XSA9ICsoICggbWF0Y2hbN10gKyBtYXRjaFs4XSApIHx8IG1hdGNoWzNdID09PSBcIm9kZFwiICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3RoZXIgdHlwZXMgcHJvaGliaXQgYXJndW1lbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIG1hdGNoWzNdICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2l6emxlLmVycm9yKCBtYXRjaFswXSApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXCJQU0VVRE9cIjogZnVuY3Rpb24oIG1hdGNoICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhjZXNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5xdW90ZWQgPSAhbWF0Y2hbNl0gJiYgbWF0Y2hbMl07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG1hdGNoRXhwcltcIkNISUxEXCJdLnRlc3QoIG1hdGNoWzBdICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWNjZXB0IHF1b3RlZCBhcmd1bWVudHMgYXMtaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBtYXRjaFszXSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoWzJdID0gbWF0Y2hbNF0gfHwgbWF0Y2hbNV0gfHwgXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdHJpcCBleGNlc3MgY2hhcmFjdGVycyBmcm9tIHVucXVvdGVkIGFyZ3VtZW50c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCB1bnF1b3RlZCAmJiBycHNldWRvLnRlc3QoIHVucXVvdGVkICkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBHZXQgZXhjZXNzIGZyb20gdG9rZW5pemUgKHJlY3Vyc2l2ZWx5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGV4Y2VzcyA9IHRva2VuaXplKCB1bnF1b3RlZCwgdHJ1ZSApKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkdmFuY2UgdG8gdGhlIG5leHQgY2xvc2luZyBwYXJlbnRoZXNpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGV4Y2VzcyA9IHVucXVvdGVkLmluZGV4T2YoIFwiKVwiLCB1bnF1b3RlZC5sZW5ndGggLSBleGNlc3MgKSAtIHVucXVvdGVkLmxlbmd0aCkgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXhjZXNzIGlzIGEgbmVnYXRpdmUgaW5kZXhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoWzBdID0gbWF0Y2hbMF0uc2xpY2UoIDAsIGV4Y2VzcyApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hbMl0gPSB1bnF1b3RlZC5zbGljZSggMCwgZXhjZXNzICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiBvbmx5IGNhcHR1cmVzIG5lZWRlZCBieSB0aGUgcHNldWRvIGZpbHRlciBtZXRob2QgKHR5cGUgYW5kIGFyZ3VtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2guc2xpY2UoIDAsIDMgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGZpbHRlcjoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBcIlRBR1wiOiBmdW5jdGlvbiggbm9kZU5hbWVTZWxlY3RvciApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGVOYW1lID0gbm9kZU5hbWVTZWxlY3Rvci5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlTmFtZVNlbGVjdG9yID09PSBcIipcIiA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHsgcmV0dXJuIHRydWU7IH0gOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oIGVsZW0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0ubm9kZU5hbWUgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBub2RlTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXCJDTEFTU1wiOiBmdW5jdGlvbiggY2xhc3NOYW1lICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGF0dGVybiA9IGNsYXNzQ2FjaGVbIGNsYXNzTmFtZSArIFwiIFwiIF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGF0dGVybiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHBhdHRlcm4gPSBuZXcgUmVnRXhwKCBcIihefFwiICsgd2hpdGVzcGFjZSArIFwiKVwiICsgY2xhc3NOYW1lICsgXCIoXCIgKyB3aGl0ZXNwYWNlICsgXCJ8JClcIiApKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NDYWNoZSggY2xhc3NOYW1lLCBmdW5jdGlvbiggZWxlbSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGF0dGVybi50ZXN0KCB0eXBlb2YgZWxlbS5jbGFzc05hbWUgPT09IFwic3RyaW5nXCIgJiYgZWxlbS5jbGFzc05hbWUgfHwgdHlwZW9mIGVsZW0uZ2V0QXR0cmlidXRlICE9PSBcInVuZGVmaW5lZFwiICYmIGVsZW0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIiApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXCJBVFRSXCI6IGZ1bmN0aW9uKCBuYW1lLCBvcGVyYXRvciwgY2hlY2sgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBTaXp6bGUuYXR0ciggZWxlbSwgbmFtZSApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggcmVzdWx0ID09IG51bGwgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wZXJhdG9yID09PSBcIiE9XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoICFvcGVyYXRvciApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3BlcmF0b3IgPT09IFwiPVwiID8gcmVzdWx0ID09PSBjaGVjayA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0b3IgPT09IFwiIT1cIiA/IHJlc3VsdCAhPT0gY2hlY2sgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRvciA9PT0gXCJePVwiID8gY2hlY2sgJiYgcmVzdWx0LmluZGV4T2YoIGNoZWNrICkgPT09IDAgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0b3IgPT09IFwiKj1cIiA/IGNoZWNrICYmIHJlc3VsdC5pbmRleE9mKCBjaGVjayApID4gLTEgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdG9yID09PSBcIiQ9XCIgPyBjaGVjayAmJiByZXN1bHQuc2xpY2UoIC1jaGVjay5sZW5ndGggKSA9PT0gY2hlY2sgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRvciA9PT0gXCJ+PVwiID8gKCBcIiBcIiArIHJlc3VsdC5yZXBsYWNlKCByd2hpdGVzcGFjZSwgXCIgXCIgKSArIFwiIFwiICkuaW5kZXhPZiggY2hlY2sgKSA+IC0xIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdG9yID09PSBcInw9XCIgPyByZXN1bHQgPT09IGNoZWNrIHx8IHJlc3VsdC5zbGljZSggMCwgY2hlY2subGVuZ3RoICsgMSApID09PSBjaGVjayArIFwiLVwiIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBcIkNISUxEXCI6IGZ1bmN0aW9uKCB0eXBlLCB3aGF0LCBhcmd1bWVudCwgZmlyc3QsIGxhc3QgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaW1wbGUgPSB0eXBlLnNsaWNlKCAwLCAzICkgIT09IFwibnRoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3J3YXJkID0gdHlwZS5zbGljZSggLTQgKSAhPT0gXCJsYXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZlR5cGUgPSB3aGF0ID09PSBcIm9mLXR5cGVcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmaXJzdCA9PT0gMSAmJiBsYXN0ID09PSAwID9cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dCBmb3IgOm50aC0qKG4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiggZWxlbSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gISFlbGVtLnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IDpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYWNoZSwgb3V0ZXJDYWNoZSwgbm9kZSwgZGlmZiwgbm9kZUluZGV4LCBzdGFydCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyID0gc2ltcGxlICE9PSBmb3J3YXJkID8gXCJuZXh0U2libGluZ1wiIDogXCJwcmV2aW91c1NpYmxpbmdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lID0gb2ZUeXBlICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlQ2FjaGUgPSAheG1sICYmICFvZlR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggcGFyZW50ICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gOihmaXJzdHxsYXN0fG9ubHkpLShjaGlsZHxvZi10eXBlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHNpbXBsZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICggZGlyICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBlbGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICggKG5vZGUgPSBub2RlWyBkaXIgXSkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggb2ZUeXBlID8gbm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lIDogbm9kZS5ub2RlVHlwZSA9PT0gMSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXZlcnNlIGRpcmVjdGlvbiBmb3IgOm9ubHktKiAoaWYgd2UgaGF2ZW4ndCB5ZXQgZG9uZSBzbylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydCA9IGRpciA9IHR5cGUgPT09IFwib25seVwiICYmICFzdGFydCAmJiBcIm5leHRTaWJsaW5nXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSBbIGZvcndhcmQgPyBwYXJlbnQuZmlyc3RDaGlsZCA6IHBhcmVudC5sYXN0Q2hpbGQgXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vbi14bWwgOm50aC1jaGlsZCguLi4pIHN0b3JlcyBjYWNoZSBkYXRhIG9uIGBwYXJlbnRgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZm9yd2FyZCAmJiB1c2VDYWNoZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNlZWsgYGVsZW1gIGZyb20gYSBwcmV2aW91c2x5LWNhY2hlZCBpbmRleFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0ZXJDYWNoZSA9IHBhcmVudFsgZXhwYW5kbyBdIHx8IChwYXJlbnRbIGV4cGFuZG8gXSA9IHt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlID0gb3V0ZXJDYWNoZVsgdHlwZSBdIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUluZGV4ID0gY2FjaGVbMF0gPT09IGRpcnJ1bnMgJiYgY2FjaGVbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWZmID0gY2FjaGVbMF0gPT09IGRpcnJ1bnMgJiYgY2FjaGVbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gbm9kZUluZGV4ICYmIHBhcmVudC5jaGlsZE5vZGVzWyBub2RlSW5kZXggXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIChub2RlID0gKytub2RlSW5kZXggJiYgbm9kZSAmJiBub2RlWyBkaXIgXSB8fFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBGYWxsYmFjayB0byBzZWVraW5nIGBlbGVtYCBmcm9tIHRoZSBzdGFydFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRpZmYgPSBub2RlSW5kZXggPSAwKSB8fCBzdGFydC5wb3AoKSkgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdoZW4gZm91bmQsIGNhY2hlIGluZGV4ZXMgb24gYHBhcmVudGAgYW5kIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBub2RlLm5vZGVUeXBlID09PSAxICYmICsrZGlmZiAmJiBub2RlID09PSBlbGVtICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRlckNhY2hlWyB0eXBlIF0gPSBbIGRpcnJ1bnMsIG5vZGVJbmRleCwgZGlmZiBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXNlIHByZXZpb3VzbHktY2FjaGVkIGVsZW1lbnQgaW5kZXggaWYgYXZhaWxhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIHVzZUNhY2hlICYmIChjYWNoZSA9IChlbGVtWyBleHBhbmRvIF0gfHwgKGVsZW1bIGV4cGFuZG8gXSA9IHt9KSlbIHR5cGUgXSkgJiYgY2FjaGVbMF0gPT09IGRpcnJ1bnMgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWZmID0gY2FjaGVbMV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8geG1sIDpudGgtY2hpbGQoLi4uKSBvciA6bnRoLWxhc3QtY2hpbGQoLi4uKSBvciA6bnRoKC1sYXN0KT8tb2YtdHlwZSguLi4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVc2UgdGhlIHNhbWUgbG9vcCBhcyBhYm92ZSB0byBzZWVrIGBlbGVtYCBmcm9tIHRoZSBzdGFydFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCAobm9kZSA9ICsrbm9kZUluZGV4ICYmIG5vZGUgJiYgbm9kZVsgZGlyIF0gfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChkaWZmID0gbm9kZUluZGV4ID0gMCkgfHwgc3RhcnQucG9wKCkpICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoICggb2ZUeXBlID8gbm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lIDogbm9kZS5ub2RlVHlwZSA9PT0gMSApICYmICsrZGlmZiApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2FjaGUgdGhlIGluZGV4IG9mIGVhY2ggZW5jb3VudGVyZWQgZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHVzZUNhY2hlICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG5vZGVbIGV4cGFuZG8gXSB8fCAobm9kZVsgZXhwYW5kbyBdID0ge30pKVsgdHlwZSBdID0gWyBkaXJydW5zLCBkaWZmIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbm9kZSA9PT0gZWxlbSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbmNvcnBvcmF0ZSB0aGUgb2Zmc2V0LCB0aGVuIGNoZWNrIGFnYWluc3QgY3ljbGUgc2l6ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWZmIC09IGxhc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkaWZmID09PSBmaXJzdCB8fCAoIGRpZmYgJSBmaXJzdCA9PT0gMCAmJiBkaWZmIC8gZmlyc3QgPj0gMCApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXCJQU0VVRE9cIjogZnVuY3Rpb24oIHBzZXVkbywgYXJndW1lbnQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBzZXVkby1jbGFzcyBuYW1lcyBhcmUgY2FzZS1pbnNlbnNpdGl2ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI3BzZXVkby1jbGFzc2VzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFByaW9yaXRpemUgYnkgY2FzZSBzZW5zaXRpdml0eSBpbiBjYXNlIGN1c3RvbSBwc2V1ZG9zIGFyZSBhZGRlZCB3aXRoIHVwcGVyY2FzZSBsZXR0ZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbWVtYmVyIHRoYXQgc2V0RmlsdGVycyBpbmhlcml0cyBmcm9tIHBzZXVkb3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbiA9IEV4cHIucHNldWRvc1sgcHNldWRvIF0gfHwgRXhwci5zZXRGaWx0ZXJzWyBwc2V1ZG8udG9Mb3dlckNhc2UoKSBdIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2l6emxlLmVycm9yKCBcInVuc3VwcG9ydGVkIHBzZXVkbzogXCIgKyBwc2V1ZG8gKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSB1c2VyIG1heSB1c2UgY3JlYXRlUHNldWRvIHRvIGluZGljYXRlIHRoYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXJndW1lbnRzIGFyZSBuZWVkZWQgdG8gY3JlYXRlIHRoZSBmaWx0ZXIgZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8ganVzdCBhcyBTaXp6bGUgZG9lc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGZuWyBleHBhbmRvIF0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm4oIGFyZ3VtZW50ICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJ1dCBtYWludGFpbiBzdXBwb3J0IGZvciBvbGQgc2lnbmF0dXJlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGZuLmxlbmd0aCA+IDEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzID0gWyBwc2V1ZG8sIHBzZXVkbywgXCJcIiwgYXJndW1lbnQgXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBFeHByLnNldEZpbHRlcnMuaGFzT3duUHJvcGVydHkoIHBzZXVkby50b0xvd2VyQ2FzZSgpICkgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VlZCwgbWF0Y2hlcyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlkeCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZWQgPSBmbiggc2VlZCwgYXJndW1lbnQgKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBtYXRjaGVkLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCBpLS0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZHggPSBpbmRleE9mKCBzZWVkLCBtYXRjaGVkW2ldICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWVkWyBpZHggXSA9ICEoIG1hdGNoZXNbIGlkeCBdID0gbWF0Y2hlZFtpXSApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCBlbGVtICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm4oIGVsZW0sIDAsIGFyZ3MgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBwc2V1ZG9zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUG90ZW50aWFsbHkgY29tcGxleCBwc2V1ZG9zXHJcbiAgICAgICAgICAgICAgICAgICAgXCJub3RcIjogbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJpbSB0aGUgc2VsZWN0b3IgcGFzc2VkIHRvIGNvbXBpbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYXZvaWQgdHJlYXRpbmcgbGVhZGluZyBhbmQgdHJhaWxpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3BhY2VzIGFzIGNvbWJpbmF0b3JzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlciA9IGNvbXBpbGUoIHNlbGVjdG9yLnJlcGxhY2UoIHJ0cmltLCBcIiQxXCIgKSApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXJbIGV4cGFuZG8gXSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlZWQsIG1hdGNoZXMsIGNvbnRleHQsIHhtbCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5tYXRjaGVkID0gbWF0Y2hlciggc2VlZCwgbnVsbCwgeG1sLCBbXSApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gc2VlZC5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1hdGNoIGVsZW1lbnRzIHVubWF0Y2hlZCBieSBgbWF0Y2hlcmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIGktLSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAoZWxlbSA9IHVubWF0Y2hlZFtpXSkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWVkW2ldID0gIShtYXRjaGVzW2ldID0gZWxlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0WzBdID0gZWxlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVyKCBpbnB1dCwgbnVsbCwgeG1sLCByZXN1bHRzICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3Qga2VlcCB0aGUgZWxlbWVudCAoaXNzdWUgIzI5OSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dFswXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFyZXN1bHRzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXCJoYXNcIjogbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFNpenpsZSggc2VsZWN0b3IsIGVsZW0gKS5sZW5ndGggPiAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBcImNvbnRhaW5zXCI6IG1hcmtGdW5jdGlvbihmdW5jdGlvbiggdGV4dCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICggZWxlbS50ZXh0Q29udGVudCB8fCBlbGVtLmlubmVyVGV4dCB8fCBnZXRUZXh0KCBlbGVtICkgKS5pbmRleE9mKCB0ZXh0ICkgPiAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gXCJXaGV0aGVyIGFuIGVsZW1lbnQgaXMgcmVwcmVzZW50ZWQgYnkgYSA6bGFuZygpIHNlbGVjdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaXMgYmFzZWQgc29sZWx5IG9uIHRoZSBlbGVtZW50J3MgbGFuZ3VhZ2UgdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAvLyBiZWluZyBlcXVhbCB0byB0aGUgaWRlbnRpZmllciBDLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG9yIGJlZ2lubmluZyB3aXRoIHRoZSBpZGVudGlmaWVyIEMgaW1tZWRpYXRlbHkgZm9sbG93ZWQgYnkgXCItXCIuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIG1hdGNoaW5nIG9mIEMgYWdhaW5zdCB0aGUgZWxlbWVudCdzIGxhbmd1YWdlIHZhbHVlIGlzIHBlcmZvcm1lZCBjYXNlLWluc2Vuc2l0aXZlbHkuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGlkZW50aWZpZXIgQyBkb2VzIG5vdCBoYXZlIHRvIGJlIGEgdmFsaWQgbGFuZ3VhZ2UgbmFtZS5cIlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jbGFuZy1wc2V1ZG9cclxuICAgICAgICAgICAgICAgICAgICBcImxhbmdcIjogbWFya0Z1bmN0aW9uKCBmdW5jdGlvbiggbGFuZyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGFuZyB2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgaWRlbnRpZmllclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoICFyaWRlbnRpZmllci50ZXN0KGxhbmcgfHwgXCJcIikgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaXp6bGUuZXJyb3IoIFwidW5zdXBwb3J0ZWQgbGFuZzogXCIgKyBsYW5nICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFuZyA9IGxhbmcucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbUxhbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAoZWxlbUxhbmcgPSBkb2N1bWVudElzSFRNTCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmxhbmcgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmdldEF0dHJpYnV0ZShcInhtbDpsYW5nXCIpIHx8IGVsZW0uZ2V0QXR0cmlidXRlKFwibGFuZ1wiKSkgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtTGFuZyA9IGVsZW1MYW5nLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtTGFuZyA9PT0gbGFuZyB8fCBlbGVtTGFuZy5pbmRleE9mKCBsYW5nICsgXCItXCIgKSA9PT0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IHdoaWxlICggKGVsZW0gPSBlbGVtLnBhcmVudE5vZGUpICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTWlzY2VsbGFuZW91c1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGFyZ2V0XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbiAmJiB3aW5kb3cubG9jYXRpb24uaGFzaDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhc2ggJiYgaGFzaC5zbGljZSggMSApID09PSBlbGVtLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFwicm9vdFwiOiBmdW5jdGlvbiggZWxlbSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0gPT09IGRvY0VsZW07XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXCJmb2N1c1wiOiBmdW5jdGlvbiggZWxlbSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0gPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgKCFkb2N1bWVudC5oYXNGb2N1cyB8fCBkb2N1bWVudC5oYXNGb2N1cygpKSAmJiAhIShlbGVtLnR5cGUgfHwgZWxlbS5ocmVmIHx8IH5lbGVtLnRhYkluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBCb29sZWFuIHByb3BlcnRpZXNcclxuICAgICAgICAgICAgICAgICAgICBcImVuYWJsZWRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLmRpc2FibGVkID09PSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBcImRpc2FibGVkXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbS5kaXNhYmxlZCA9PT0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBcImNoZWNrZWRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEluIENTUzMsIDpjaGVja2VkIHNob3VsZCByZXR1cm4gYm90aCBjaGVja2VkIGFuZCBzZWxlY3RlZCBlbGVtZW50c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDExL1JFQy1jc3MzLXNlbGVjdG9ycy0yMDExMDkyOS8jY2hlY2tlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZU5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAobm9kZU5hbWUgPT09IFwiaW5wdXRcIiAmJiAhIWVsZW0uY2hlY2tlZCkgfHwgKG5vZGVOYW1lID09PSBcIm9wdGlvblwiICYmICEhZWxlbS5zZWxlY3RlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzZWxlY3RlZFwiOiBmdW5jdGlvbiggZWxlbSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWNjZXNzaW5nIHRoaXMgcHJvcGVydHkgbWFrZXMgc2VsZWN0ZWQtYnktZGVmYXVsdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvcHRpb25zIGluIFNhZmFyaSB3b3JrIHByb3Blcmx5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZWxlbS5wYXJlbnROb2RlICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5wYXJlbnROb2RlLnNlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLnNlbGVjdGVkID09PSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENvbnRlbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbXB0eVwiOiBmdW5jdGlvbiggZWxlbSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvc2VsZWN0b3JzLyNlbXB0eS1wc2V1ZG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gOmVtcHR5IGlzIG5lZ2F0ZWQgYnkgZWxlbWVudCAoMSkgb3IgY29udGVudCBub2RlcyAodGV4dDogMzsgY2RhdGE6IDQ7IGVudGl0eSByZWY6IDUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGJ1dCBub3QgYnkgb3RoZXJzIChjb21tZW50OiA4OyBwcm9jZXNzaW5nIGluc3RydWN0aW9uOiA3OyBldGMuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBub2RlVHlwZSA8IDYgd29ya3MgYmVjYXVzZSBhdHRyaWJ1dGVzICgyKSBkbyBub3QgYXBwZWFyIGFzIGNoaWxkcmVuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoIGVsZW0gPSBlbGVtLmZpcnN0Q2hpbGQ7IGVsZW07IGVsZW0gPSBlbGVtLm5leHRTaWJsaW5nICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBlbGVtLm5vZGVUeXBlIDwgNiApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwYXJlbnRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhRXhwci5wc2V1ZG9zW1wiZW1wdHlcIl0oIGVsZW0gKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBFbGVtZW50L2lucHV0IHR5cGVzXHJcbiAgICAgICAgICAgICAgICAgICAgXCJoZWFkZXJcIjogZnVuY3Rpb24oIGVsZW0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByaGVhZGVyLnRlc3QoIGVsZW0ubm9kZU5hbWUgKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBcImlucHV0XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmlucHV0cy50ZXN0KCBlbGVtLm5vZGVOYW1lICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXCJidXR0b25cIjogZnVuY3Rpb24oIGVsZW0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmFtZSA9PT0gXCJpbnB1dFwiICYmIGVsZW0udHlwZSA9PT0gXCJidXR0b25cIiB8fCBuYW1lID09PSBcImJ1dHRvblwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFwidGV4dFwiOiBmdW5jdGlvbiggZWxlbSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiaW5wdXRcIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS50eXBlID09PSBcInRleHRcIiAmJlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTw4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmV3IEhUTUw1IGF0dHJpYnV0ZSB2YWx1ZXMgKGUuZy4sIFwic2VhcmNoXCIpIGFwcGVhciB3aXRoIGVsZW0udHlwZSA9PT0gXCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICggKGF0dHIgPSBlbGVtLmdldEF0dHJpYnV0ZShcInR5cGVcIikpID09IG51bGwgfHwgYXR0ci50b0xvd2VyQ2FzZSgpID09PSBcInRleHRcIiApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFBvc2l0aW9uLWluLWNvbGxlY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICBcImZpcnN0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbIDAgXTtcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsYXN0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWyBsZW5ndGggLSAxIF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFwiZXFcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGgsIGFyZ3VtZW50ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWyBhcmd1bWVudCA8IDAgPyBhcmd1bWVudCArIGxlbmd0aCA6IGFyZ3VtZW50IF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFwiZXZlblwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKCA7IGkgPCBsZW5ndGg7IGkgKz0gMiApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoSW5kZXhlcztcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXCJvZGRcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGggKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICggOyBpIDwgbGVuZ3RoOyBpICs9IDIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaEluZGV4ZXMucHVzaCggaSApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaEluZGV4ZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFwibHRcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGgsIGFyZ3VtZW50ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IGFyZ3VtZW50IDwgMCA/IGFyZ3VtZW50ICsgbGVuZ3RoIDogYXJndW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoIDsgLS1pID49IDA7ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hJbmRleGVzLnB1c2goIGkgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hJbmRleGVzO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBcImd0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoLCBhcmd1bWVudCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBhcmd1bWVudCA8IDAgPyBhcmd1bWVudCArIGxlbmd0aCA6IGFyZ3VtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKCA7ICsraSA8IGxlbmd0aDsgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaEluZGV4ZXMucHVzaCggaSApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaEluZGV4ZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIEV4cHIucHNldWRvc1tcIm50aFwiXSA9IEV4cHIucHNldWRvc1tcImVxXCJdO1xyXG5cclxuLy8gQWRkIGJ1dHRvbi9pbnB1dCB0eXBlIHBzZXVkb3NcclxuICAgICAgICAgICAgZm9yICggaSBpbiB7IHJhZGlvOiB0cnVlLCBjaGVja2JveDogdHJ1ZSwgZmlsZTogdHJ1ZSwgcGFzc3dvcmQ6IHRydWUsIGltYWdlOiB0cnVlIH0gKSB7XHJcbiAgICAgICAgICAgICAgICBFeHByLnBzZXVkb3NbIGkgXSA9IGNyZWF0ZUlucHV0UHNldWRvKCBpICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICggaSBpbiB7IHN1Ym1pdDogdHJ1ZSwgcmVzZXQ6IHRydWUgfSApIHtcclxuICAgICAgICAgICAgICAgIEV4cHIucHNldWRvc1sgaSBdID0gY3JlYXRlQnV0dG9uUHNldWRvKCBpICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbi8vIEVhc3kgQVBJIGZvciBjcmVhdGluZyBuZXcgc2V0RmlsdGVyc1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXRGaWx0ZXJzKCkge31cclxuICAgICAgICAgICAgc2V0RmlsdGVycy5wcm90b3R5cGUgPSBFeHByLmZpbHRlcnMgPSBFeHByLnBzZXVkb3M7XHJcbiAgICAgICAgICAgIEV4cHIuc2V0RmlsdGVycyA9IG5ldyBzZXRGaWx0ZXJzKCk7XHJcblxyXG4gICAgICAgICAgICB0b2tlbml6ZSA9IFNpenpsZS50b2tlbml6ZSA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgcGFyc2VPbmx5ICkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoZWQsIG1hdGNoLCB0b2tlbnMsIHR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgc29GYXIsIGdyb3VwcywgcHJlRmlsdGVycyxcclxuICAgICAgICAgICAgICAgICAgICBjYWNoZWQgPSB0b2tlbkNhY2hlWyBzZWxlY3RvciArIFwiIFwiIF07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCBjYWNoZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlT25seSA/IDAgOiBjYWNoZWQuc2xpY2UoIDAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzb0ZhciA9IHNlbGVjdG9yO1xyXG4gICAgICAgICAgICAgICAgZ3JvdXBzID0gW107XHJcbiAgICAgICAgICAgICAgICBwcmVGaWx0ZXJzID0gRXhwci5wcmVGaWx0ZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgd2hpbGUgKCBzb0ZhciApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ29tbWEgYW5kIGZpcnN0IHJ1blxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggIW1hdGNoZWQgfHwgKG1hdGNoID0gcmNvbW1hLmV4ZWMoIHNvRmFyICkpICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG1hdGNoICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgY29uc3VtZSB0cmFpbGluZyBjb21tYXMgYXMgdmFsaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvRmFyID0gc29GYXIuc2xpY2UoIG1hdGNoWzBdLmxlbmd0aCApIHx8IHNvRmFyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3Vwcy5wdXNoKCAodG9rZW5zID0gW10pICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXRjaGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENvbWJpbmF0b3JzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAobWF0Y2ggPSByY29tYmluYXRvcnMuZXhlYyggc29GYXIgKSkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZWQgPSBtYXRjaC5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbWF0Y2hlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENhc3QgZGVzY2VuZGFudCBjb21iaW5hdG9ycyB0byBzcGFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogbWF0Y2hbMF0ucmVwbGFjZSggcnRyaW0sIFwiIFwiIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvRmFyID0gc29GYXIuc2xpY2UoIG1hdGNoZWQubGVuZ3RoICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBGaWx0ZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICggdHlwZSBpbiBFeHByLmZpbHRlciApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAobWF0Y2ggPSBtYXRjaEV4cHJbIHR5cGUgXS5leGVjKCBzb0ZhciApKSAmJiAoIXByZUZpbHRlcnNbIHR5cGUgXSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG1hdGNoID0gcHJlRmlsdGVyc1sgdHlwZSBdKCBtYXRjaCApKSkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVkID0gbWF0Y2guc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2Vucy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbWF0Y2hlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXM6IG1hdGNoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvRmFyID0gc29GYXIuc2xpY2UoIG1hdGNoZWQubGVuZ3RoICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggIW1hdGNoZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGxlbmd0aCBvZiB0aGUgaW52YWxpZCBleGNlc3NcclxuICAgICAgICAgICAgICAgIC8vIGlmIHdlJ3JlIGp1c3QgcGFyc2luZ1xyXG4gICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCB0aHJvdyBhbiBlcnJvciBvciByZXR1cm4gdG9rZW5zXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VPbmx5ID9cclxuICAgICAgICAgICAgICAgICAgICBzb0Zhci5sZW5ndGggOlxyXG4gICAgICAgICAgICAgICAgICAgIHNvRmFyID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgU2l6emxlLmVycm9yKCBzZWxlY3RvciApIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2FjaGUgdGhlIHRva2Vuc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbkNhY2hlKCBzZWxlY3RvciwgZ3JvdXBzICkuc2xpY2UoIDAgKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHRvU2VsZWN0b3IoIHRva2VucyApIHtcclxuICAgICAgICAgICAgICAgIHZhciBpID0gMCxcclxuICAgICAgICAgICAgICAgICAgICBsZW4gPSB0b2tlbnMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yICs9IHRva2Vuc1tpXS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3RvcjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkQ29tYmluYXRvciggbWF0Y2hlciwgY29tYmluYXRvciwgYmFzZSApIHtcclxuICAgICAgICAgICAgICAgIHZhciBkaXIgPSBjb21iaW5hdG9yLmRpcixcclxuICAgICAgICAgICAgICAgICAgICBjaGVja05vbkVsZW1lbnRzID0gYmFzZSAmJiBkaXIgPT09IFwicGFyZW50Tm9kZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRvbmVOYW1lID0gZG9uZSsrO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBjb21iaW5hdG9yLmZpcnN0ID9cclxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBhZ2FpbnN0IGNsb3Nlc3QgYW5jZXN0b3IvcHJlY2VkaW5nIGVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIChlbGVtID0gZWxlbVsgZGlyIF0pICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBlbGVtLm5vZGVUeXBlID09PSAxIHx8IGNoZWNrTm9uRWxlbWVudHMgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSA6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGFnYWluc3QgYWxsIGFuY2VzdG9yL3ByZWNlZGluZyBlbGVtZW50c1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvbGRDYWNoZSwgb3V0ZXJDYWNoZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NhY2hlID0gWyBkaXJydW5zLCBkb25lTmFtZSBdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgY2FuJ3Qgc2V0IGFyYml0cmFyeSBkYXRhIG9uIFhNTCBub2Rlcywgc28gdGhleSBkb24ndCBiZW5lZml0IGZyb20gZGlyIGNhY2hpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCB4bWwgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIChlbGVtID0gZWxlbVsgZGlyIF0pICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBjaGVja05vbkVsZW1lbnRzICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG1hdGNoZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIChlbGVtID0gZWxlbVsgZGlyIF0pICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBjaGVja05vbkVsZW1lbnRzICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRlckNhY2hlID0gZWxlbVsgZXhwYW5kbyBdIHx8IChlbGVtWyBleHBhbmRvIF0gPSB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggKG9sZENhY2hlID0gb3V0ZXJDYWNoZVsgZGlyIF0pICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRDYWNoZVsgMCBdID09PSBkaXJydW5zICYmIG9sZENhY2hlWyAxIF0gPT09IGRvbmVOYW1lICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFzc2lnbiB0byBuZXdDYWNoZSBzbyByZXN1bHRzIGJhY2stcHJvcGFnYXRlIHRvIHByZXZpb3VzIGVsZW1lbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKG5ld0NhY2hlWyAyIF0gPSBvbGRDYWNoZVsgMiBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJldXNlIG5ld2NhY2hlIHNvIHJlc3VsdHMgYmFjay1wcm9wYWdhdGUgdG8gcHJldmlvdXMgZWxlbWVudHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dGVyQ2FjaGVbIGRpciBdID0gbmV3Q2FjaGU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQSBtYXRjaCBtZWFucyB3ZSdyZSBkb25lOyBhIGZhaWwgbWVhbnMgd2UgaGF2ZSB0byBrZWVwIGNoZWNraW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIChuZXdDYWNoZVsgMiBdID0gbWF0Y2hlciggZWxlbSwgY29udGV4dCwgeG1sICkpICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXJzLmxlbmd0aCA+IDEgP1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gbWF0Y2hlcnMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIGktLSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggIW1hdGNoZXJzW2ldKCBlbGVtLCBjb250ZXh0LCB4bWwgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSA6XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcnNbMF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG11bHRpcGxlQ29udGV4dHMoIHNlbGVjdG9yLCBjb250ZXh0cywgcmVzdWx0cyApIHtcclxuICAgICAgICAgICAgICAgIHZhciBpID0gMCxcclxuICAgICAgICAgICAgICAgICAgICBsZW4gPSBjb250ZXh0cy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcclxuICAgICAgICAgICAgICAgICAgICBTaXp6bGUoIHNlbGVjdG9yLCBjb250ZXh0c1tpXSwgcmVzdWx0cyApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNvbmRlbnNlKCB1bm1hdGNoZWQsIG1hcCwgZmlsdGVyLCBjb250ZXh0LCB4bWwgKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbSxcclxuICAgICAgICAgICAgICAgICAgICBuZXdVbm1hdGNoZWQgPSBbXSxcclxuICAgICAgICAgICAgICAgICAgICBpID0gMCxcclxuICAgICAgICAgICAgICAgICAgICBsZW4gPSB1bm1hdGNoZWQubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcHBlZCA9IG1hcCAhPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggKGVsZW0gPSB1bm1hdGNoZWRbaV0pICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoICFmaWx0ZXIgfHwgZmlsdGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1VubWF0Y2hlZC5wdXNoKCBlbGVtICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG1hcHBlZCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAucHVzaCggaSApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXdVbm1hdGNoZWQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldE1hdGNoZXIoIHByZUZpbHRlciwgc2VsZWN0b3IsIG1hdGNoZXIsIHBvc3RGaWx0ZXIsIHBvc3RGaW5kZXIsIHBvc3RTZWxlY3RvciApIHtcclxuICAgICAgICAgICAgICAgIGlmICggcG9zdEZpbHRlciAmJiAhcG9zdEZpbHRlclsgZXhwYW5kbyBdICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc3RGaWx0ZXIgPSBzZXRNYXRjaGVyKCBwb3N0RmlsdGVyICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIHBvc3RGaW5kZXIgJiYgIXBvc3RGaW5kZXJbIGV4cGFuZG8gXSApIHtcclxuICAgICAgICAgICAgICAgICAgICBwb3N0RmluZGVyID0gc2V0TWF0Y2hlciggcG9zdEZpbmRlciwgcG9zdFNlbGVjdG9yICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWVkLCByZXN1bHRzLCBjb250ZXh0LCB4bWwgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXAsIGksIGVsZW0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZU1hcCA9IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3N0TWFwID0gW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWV4aXN0aW5nID0gcmVzdWx0cy5sZW5ndGgsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEdldCBpbml0aWFsIGVsZW1lbnRzIGZyb20gc2VlZCBvciBjb250ZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1zID0gc2VlZCB8fCBtdWx0aXBsZUNvbnRleHRzKCBzZWxlY3RvciB8fCBcIipcIiwgY29udGV4dC5ub2RlVHlwZSA/IFsgY29udGV4dCBdIDogY29udGV4dCwgW10gKSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJlZmlsdGVyIHRvIGdldCBtYXRjaGVyIGlucHV0LCBwcmVzZXJ2aW5nIGEgbWFwIGZvciBzZWVkLXJlc3VsdHMgc3luY2hyb25pemF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXJJbiA9IHByZUZpbHRlciAmJiAoIHNlZWQgfHwgIXNlbGVjdG9yICkgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZGVuc2UoIGVsZW1zLCBwcmVNYXAsIHByZUZpbHRlciwgY29udGV4dCwgeG1sICkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbXMsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVyT3V0ID0gbWF0Y2hlciA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIGEgcG9zdEZpbmRlciwgb3IgZmlsdGVyZWQgc2VlZCwgb3Igbm9uLXNlZWQgcG9zdEZpbHRlciBvciBwcmVleGlzdGluZyByZXN1bHRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdEZpbmRlciB8fCAoIHNlZWQgPyBwcmVGaWx0ZXIgOiBwcmVleGlzdGluZyB8fCBwb3N0RmlsdGVyICkgP1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAuLi5pbnRlcm1lZGlhdGUgcHJvY2Vzc2luZyBpcyBuZWNlc3NhcnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXSA6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIC4uLm90aGVyd2lzZSB1c2UgcmVzdWx0cyBkaXJlY3RseVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlckluO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBGaW5kIHByaW1hcnkgbWF0Y2hlc1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggbWF0Y2hlciApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlciggbWF0Y2hlckluLCBtYXRjaGVyT3V0LCBjb250ZXh0LCB4bWwgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFwcGx5IHBvc3RGaWx0ZXJcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIHBvc3RGaWx0ZXIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXAgPSBjb25kZW5zZSggbWF0Y2hlck91dCwgcG9zdE1hcCApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3N0RmlsdGVyKCB0ZW1wLCBbXSwgY29udGV4dCwgeG1sICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBVbi1tYXRjaCBmYWlsaW5nIGVsZW1lbnRzIGJ5IG1vdmluZyB0aGVtIGJhY2sgdG8gbWF0Y2hlckluXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSB0ZW1wLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCBpLS0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIChlbGVtID0gdGVtcFtpXSkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlck91dFsgcG9zdE1hcFtpXSBdID0gIShtYXRjaGVySW5bIHBvc3RNYXBbaV0gXSA9IGVsZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIHNlZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggcG9zdEZpbmRlciB8fCBwcmVGaWx0ZXIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHBvc3RGaW5kZXIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBmaW5hbCBtYXRjaGVyT3V0IGJ5IGNvbmRlbnNpbmcgdGhpcyBpbnRlcm1lZGlhdGUgaW50byBwb3N0RmluZGVyIGNvbnRleHRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBtYXRjaGVyT3V0Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIGktLSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAoZWxlbSA9IG1hdGNoZXJPdXRbaV0pICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVzdG9yZSBtYXRjaGVySW4gc2luY2UgZWxlbSBpcyBub3QgeWV0IGEgZmluYWwgbWF0Y2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXAucHVzaCggKG1hdGNoZXJJbltpXSA9IGVsZW0pICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdEZpbmRlciggbnVsbCwgKG1hdGNoZXJPdXQgPSBbXSksIHRlbXAsIHhtbCApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1vdmUgbWF0Y2hlZCBlbGVtZW50cyBmcm9tIHNlZWQgdG8gcmVzdWx0cyB0byBrZWVwIHRoZW0gc3luY2hyb25pemVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gbWF0Y2hlck91dC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIGktLSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIChlbGVtID0gbWF0Y2hlck91dFtpXSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRlbXAgPSBwb3N0RmluZGVyID8gaW5kZXhPZiggc2VlZCwgZWxlbSApIDogcHJlTWFwW2ldKSA+IC0xICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VlZFt0ZW1wXSA9ICEocmVzdWx0c1t0ZW1wXSA9IGVsZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIGVsZW1lbnRzIHRvIHJlc3VsdHMsIHRocm91Z2ggcG9zdEZpbmRlciBpZiBkZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlck91dCA9IGNvbmRlbnNlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlck91dCA9PT0gcmVzdWx0cyA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlck91dC5zcGxpY2UoIHByZWV4aXN0aW5nLCBtYXRjaGVyT3V0Lmxlbmd0aCApIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVyT3V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggcG9zdEZpbmRlciApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RGaW5kZXIoIG51bGwsIHJlc3VsdHMsIG1hdGNoZXJPdXQsIHhtbCApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaC5hcHBseSggcmVzdWx0cywgbWF0Y2hlck91dCApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG1hdGNoZXJGcm9tVG9rZW5zKCB0b2tlbnMgKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hlY2tDb250ZXh0LCBtYXRjaGVyLCBqLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IHRva2Vucy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVhZGluZ1JlbGF0aXZlID0gRXhwci5yZWxhdGl2ZVsgdG9rZW5zWzBdLnR5cGUgXSxcclxuICAgICAgICAgICAgICAgICAgICBpbXBsaWNpdFJlbGF0aXZlID0gbGVhZGluZ1JlbGF0aXZlIHx8IEV4cHIucmVsYXRpdmVbXCIgXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGkgPSBsZWFkaW5nUmVsYXRpdmUgPyAxIDogMCxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUaGUgZm91bmRhdGlvbmFsIG1hdGNoZXIgZW5zdXJlcyB0aGF0IGVsZW1lbnRzIGFyZSByZWFjaGFibGUgZnJvbSB0b3AtbGV2ZWwgY29udGV4dChzKVxyXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoQ29udGV4dCA9IGFkZENvbWJpbmF0b3IoIGZ1bmN0aW9uKCBlbGVtICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbSA9PT0gY2hlY2tDb250ZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIGltcGxpY2l0UmVsYXRpdmUsIHRydWUgKSxcclxuICAgICAgICAgICAgICAgICAgICBtYXRjaEFueUNvbnRleHQgPSBhZGRDb21iaW5hdG9yKCBmdW5jdGlvbiggZWxlbSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4T2YoIGNoZWNrQ29udGV4dCwgZWxlbSApID4gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgaW1wbGljaXRSZWxhdGl2ZSwgdHJ1ZSApLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZXJzID0gWyBmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0ID0gKCAhbGVhZGluZ1JlbGF0aXZlICYmICggeG1sIHx8IGNvbnRleHQgIT09IG91dGVybW9zdENvbnRleHQgKSApIHx8IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2hlY2tDb250ZXh0ID0gY29udGV4dCkubm9kZVR5cGUgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaENvbnRleHQoIGVsZW0sIGNvbnRleHQsIHhtbCApIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hBbnlDb250ZXh0KCBlbGVtLCBjb250ZXh0LCB4bWwgKSApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBdm9pZCBoYW5naW5nIG9udG8gZWxlbWVudCAoaXNzdWUgIzI5OSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tDb250ZXh0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICAgICAgICAgICAgICB9IF07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICggOyBpIDwgbGVuOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAobWF0Y2hlciA9IEV4cHIucmVsYXRpdmVbIHRva2Vuc1tpXS50eXBlIF0pICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVycyA9IFsgYWRkQ29tYmluYXRvcihlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKSwgbWF0Y2hlcikgXTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVyID0gRXhwci5maWx0ZXJbIHRva2Vuc1tpXS50eXBlIF0uYXBwbHkoIG51bGwsIHRva2Vuc1tpXS5tYXRjaGVzICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gc3BlY2lhbCB1cG9uIHNlZWluZyBhIHBvc2l0aW9uYWwgbWF0Y2hlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG1hdGNoZXJbIGV4cGFuZG8gXSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpbmQgdGhlIG5leHQgcmVsYXRpdmUgb3BlcmF0b3IgKGlmIGFueSkgZm9yIHByb3BlciBoYW5kbGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaiA9ICsraTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoIDsgaiA8IGxlbjsgaisrICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggRXhwci5yZWxhdGl2ZVsgdG9rZW5zW2pdLnR5cGUgXSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNldE1hdGNoZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA+IDEgJiYgZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA+IDEgJiYgdG9TZWxlY3RvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHByZWNlZGluZyB0b2tlbiB3YXMgYSBkZXNjZW5kYW50IGNvbWJpbmF0b3IsIGluc2VydCBhbiBpbXBsaWNpdCBhbnktZWxlbWVudCBgKmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW5zLnNsaWNlKCAwLCBpIC0gMSApLmNvbmNhdCh7IHZhbHVlOiB0b2tlbnNbIGkgLSAyIF0udHlwZSA9PT0gXCIgXCIgPyBcIipcIiA6IFwiXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLnJlcGxhY2UoIHJ0cmltLCBcIiQxXCIgKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPCBqICYmIG1hdGNoZXJGcm9tVG9rZW5zKCB0b2tlbnMuc2xpY2UoIGksIGogKSApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGogPCBsZW4gJiYgbWF0Y2hlckZyb21Ub2tlbnMoICh0b2tlbnMgPSB0b2tlbnMuc2xpY2UoIGogKSkgKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqIDwgbGVuICYmIHRvU2VsZWN0b3IoIHRva2VucyApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXJzLnB1c2goIG1hdGNoZXIgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBtYXRjaGVyRnJvbUdyb3VwTWF0Y2hlcnMoIGVsZW1lbnRNYXRjaGVycywgc2V0TWF0Y2hlcnMgKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYnlTZXQgPSBzZXRNYXRjaGVycy5sZW5ndGggPiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ5RWxlbWVudCA9IGVsZW1lbnRNYXRjaGVycy5sZW5ndGggPiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyTWF0Y2hlciA9IGZ1bmN0aW9uKCBzZWVkLCBjb250ZXh0LCB4bWwsIHJlc3VsdHMsIG91dGVybW9zdCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW0sIGosIG1hdGNoZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVkQ291bnQgPSAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IFwiMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5tYXRjaGVkID0gc2VlZCAmJiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE1hdGNoZWQgPSBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRCYWNrdXAgPSBvdXRlcm1vc3RDb250ZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBtdXN0IGFsd2F5cyBoYXZlIGVpdGhlciBzZWVkIGVsZW1lbnRzIG9yIG91dGVybW9zdCBjb250ZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtcyA9IHNlZWQgfHwgYnlFbGVtZW50ICYmIEV4cHIuZmluZFtcIlRBR1wiXSggXCIqXCIsIG91dGVybW9zdCApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBVc2UgaW50ZWdlciBkaXJydW5zIGlmZiB0aGlzIGlzIHRoZSBvdXRlcm1vc3QgbWF0Y2hlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlycnVuc1VuaXF1ZSA9IChkaXJydW5zICs9IGNvbnRleHRCYWNrdXAgPT0gbnVsbCA/IDEgOiBNYXRoLnJhbmRvbSgpIHx8IDAuMSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW4gPSBlbGVtcy5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG91dGVybW9zdCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dGVybW9zdENvbnRleHQgPSBjb250ZXh0ICE9PSBkb2N1bWVudCAmJiBjb250ZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgZWxlbWVudHMgcGFzc2luZyBlbGVtZW50TWF0Y2hlcnMgZGlyZWN0bHkgdG8gcmVzdWx0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBLZWVwIGBpYCBhIHN0cmluZyBpZiB0aGVyZSBhcmUgbm8gZWxlbWVudHMgc28gYG1hdGNoZWRDb3VudGAgd2lsbCBiZSBcIjAwXCIgYmVsb3dcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU8OSwgU2FmYXJpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRvbGVyYXRlIE5vZGVMaXN0IHByb3BlcnRpZXMgKElFOiBcImxlbmd0aFwiOyBTYWZhcmk6IDxudW1iZXI+KSBtYXRjaGluZyBlbGVtZW50cyBieSBpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKCA7IGkgIT09IGxlbiAmJiAoZWxlbSA9IGVsZW1zW2ldKSAhPSBudWxsOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGJ5RWxlbWVudCAmJiBlbGVtICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGogPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICggKG1hdGNoZXIgPSBlbGVtZW50TWF0Y2hlcnNbaisrXSkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbWF0Y2hlciggZWxlbSwgY29udGV4dCwgeG1sICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goIGVsZW0gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggb3V0ZXJtb3N0ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJydW5zID0gZGlycnVuc1VuaXF1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJhY2sgdW5tYXRjaGVkIGVsZW1lbnRzIGZvciBzZXQgZmlsdGVyc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBieVNldCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGV5IHdpbGwgaGF2ZSBnb25lIHRocm91Z2ggYWxsIHBvc3NpYmxlIG1hdGNoZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAoZWxlbSA9ICFtYXRjaGVyICYmIGVsZW0pICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVkQ291bnQtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIExlbmd0aGVuIHRoZSBhcnJheSBmb3IgZXZlcnkgZWxlbWVudCwgbWF0Y2hlZCBvciBub3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHNlZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVubWF0Y2hlZC5wdXNoKCBlbGVtICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBcHBseSBzZXQgZmlsdGVycyB0byB1bm1hdGNoZWQgZWxlbWVudHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZENvdW50ICs9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggYnlTZXQgJiYgaSAhPT0gbWF0Y2hlZENvdW50ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIChtYXRjaGVyID0gc2V0TWF0Y2hlcnNbaisrXSkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlciggdW5tYXRjaGVkLCBzZXRNYXRjaGVkLCBjb250ZXh0LCB4bWwgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHNlZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVpbnRlZ3JhdGUgZWxlbWVudCBtYXRjaGVzIHRvIGVsaW1pbmF0ZSB0aGUgbmVlZCBmb3Igc29ydGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbWF0Y2hlZENvdW50ID4gMCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCBpLS0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoICEodW5tYXRjaGVkW2ldIHx8IHNldE1hdGNoZWRbaV0pICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE1hdGNoZWRbaV0gPSBwb3AuY2FsbCggcmVzdWx0cyApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEaXNjYXJkIGluZGV4IHBsYWNlaG9sZGVyIHZhbHVlcyB0byBnZXQgb25seSBhY3R1YWwgbWF0Y2hlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE1hdGNoZWQgPSBjb25kZW5zZSggc2V0TWF0Y2hlZCApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCBtYXRjaGVzIHRvIHJlc3VsdHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2guYXBwbHkoIHJlc3VsdHMsIHNldE1hdGNoZWQgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTZWVkbGVzcyBzZXQgbWF0Y2hlcyBzdWNjZWVkaW5nIG11bHRpcGxlIHN1Y2Nlc3NmdWwgbWF0Y2hlcnMgc3RpcHVsYXRlIHNvcnRpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggb3V0ZXJtb3N0ICYmICFzZWVkICYmIHNldE1hdGNoZWQubGVuZ3RoID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICggbWF0Y2hlZENvdW50ICsgc2V0TWF0Y2hlcnMubGVuZ3RoICkgPiAxICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaXp6bGUudW5pcXVlU29ydCggcmVzdWx0cyApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPdmVycmlkZSBtYW5pcHVsYXRpb24gb2YgZ2xvYmFscyBieSBuZXN0ZWQgbWF0Y2hlcnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBvdXRlcm1vc3QgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJydW5zID0gZGlycnVuc1VuaXF1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dGVybW9zdENvbnRleHQgPSBjb250ZXh0QmFja3VwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5tYXRjaGVkO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ5U2V0ID9cclxuICAgICAgICAgICAgICAgICAgICBtYXJrRnVuY3Rpb24oIHN1cGVyTWF0Y2hlciApIDpcclxuICAgICAgICAgICAgICAgICAgICBzdXBlck1hdGNoZXI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbXBpbGUgPSBTaXp6bGUuY29tcGlsZSA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgbWF0Y2ggLyogSW50ZXJuYWwgVXNlIE9ubHkgKi8gKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaSxcclxuICAgICAgICAgICAgICAgICAgICBzZXRNYXRjaGVycyA9IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRNYXRjaGVycyA9IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlZCA9IGNvbXBpbGVyQ2FjaGVbIHNlbGVjdG9yICsgXCIgXCIgXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoICFjYWNoZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gR2VuZXJhdGUgYSBmdW5jdGlvbiBvZiByZWN1cnNpdmUgZnVuY3Rpb25zIHRoYXQgY2FuIGJlIHVzZWQgdG8gY2hlY2sgZWFjaCBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhbWF0Y2ggKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoID0gdG9rZW5pemUoIHNlbGVjdG9yICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGkgPSBtYXRjaC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCBpLS0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlZCA9IG1hdGNoZXJGcm9tVG9rZW5zKCBtYXRjaFtpXSApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGNhY2hlZFsgZXhwYW5kbyBdICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWF0Y2hlcnMucHVzaCggY2FjaGVkICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50TWF0Y2hlcnMucHVzaCggY2FjaGVkICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENhY2hlIHRoZSBjb21waWxlZCBmdW5jdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlZCA9IGNvbXBpbGVyQ2FjaGUoIHNlbGVjdG9yLCBtYXRjaGVyRnJvbUdyb3VwTWF0Y2hlcnMoIGVsZW1lbnRNYXRjaGVycywgc2V0TWF0Y2hlcnMgKSApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBTYXZlIHNlbGVjdG9yIGFuZCB0b2tlbml6YXRpb25cclxuICAgICAgICAgICAgICAgICAgICBjYWNoZWQuc2VsZWN0b3IgPSBzZWxlY3RvcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZWQ7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQSBsb3ctbGV2ZWwgc2VsZWN0aW9uIGZ1bmN0aW9uIHRoYXQgd29ya3Mgd2l0aCBTaXp6bGUncyBjb21waWxlZFxyXG4gICAgICAgICAgICAgKiAgc2VsZWN0b3IgZnVuY3Rpb25zXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfEZ1bmN0aW9ufSBzZWxlY3RvciBBIHNlbGVjdG9yIG9yIGEgcHJlLWNvbXBpbGVkXHJcbiAgICAgICAgICAgICAqICBzZWxlY3RvciBmdW5jdGlvbiBidWlsdCB3aXRoIFNpenpsZS5jb21waWxlXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gY29udGV4dFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBbcmVzdWx0c11cclxuICAgICAgICAgICAgICogQHBhcmFtIHtBcnJheX0gW3NlZWRdIEEgc2V0IG9mIGVsZW1lbnRzIHRvIG1hdGNoIGFnYWluc3RcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHNlbGVjdCA9IFNpenpsZS5zZWxlY3QgPSBmdW5jdGlvbiggc2VsZWN0b3IsIGNvbnRleHQsIHJlc3VsdHMsIHNlZWQgKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaSwgdG9rZW5zLCB0b2tlbiwgdHlwZSwgZmluZCxcclxuICAgICAgICAgICAgICAgICAgICBjb21waWxlZCA9IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJmdW5jdGlvblwiICYmIHNlbGVjdG9yLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoID0gIXNlZWQgJiYgdG9rZW5pemUoIChzZWxlY3RvciA9IGNvbXBpbGVkLnNlbGVjdG9yIHx8IHNlbGVjdG9yKSApO1xyXG5cclxuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzIHx8IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRyeSB0byBtaW5pbWl6ZSBvcGVyYXRpb25zIGlmIHRoZXJlIGlzIG5vIHNlZWQgYW5kIG9ubHkgb25lIGdyb3VwXHJcbiAgICAgICAgICAgICAgICBpZiAoIG1hdGNoLmxlbmd0aCA9PT0gMSApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVGFrZSBhIHNob3J0Y3V0IGFuZCBzZXQgdGhlIGNvbnRleHQgaWYgdGhlIHJvb3Qgc2VsZWN0b3IgaXMgYW4gSURcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbnMgPSBtYXRjaFswXSA9IG1hdGNoWzBdLnNsaWNlKCAwICk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB0b2tlbnMubGVuZ3RoID4gMiAmJiAodG9rZW4gPSB0b2tlbnNbMF0pLnR5cGUgPT09IFwiSURcIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0LmdldEJ5SWQgJiYgY29udGV4dC5ub2RlVHlwZSA9PT0gOSAmJiBkb2N1bWVudElzSFRNTCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBFeHByLnJlbGF0aXZlWyB0b2tlbnNbMV0udHlwZSBdICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dCA9ICggRXhwci5maW5kW1wiSURcIl0oIHRva2VuLm1hdGNoZXNbMF0ucmVwbGFjZShydW5lc2NhcGUsIGZ1bmVzY2FwZSksIGNvbnRleHQgKSB8fCBbXSApWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoICFjb250ZXh0ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHJlY29tcGlsZWQgbWF0Y2hlcnMgd2lsbCBzdGlsbCB2ZXJpZnkgYW5jZXN0cnksIHNvIHN0ZXAgdXAgYSBsZXZlbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBjb21waWxlZCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQgPSBjb250ZXh0LnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3Iuc2xpY2UoIHRva2Vucy5zaGlmdCgpLnZhbHVlLmxlbmd0aCApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRmV0Y2ggYSBzZWVkIHNldCBmb3IgcmlnaHQtdG8tbGVmdCBtYXRjaGluZ1xyXG4gICAgICAgICAgICAgICAgICAgIGkgPSBtYXRjaEV4cHJbXCJuZWVkc0NvbnRleHRcIl0udGVzdCggc2VsZWN0b3IgKSA/IDAgOiB0b2tlbnMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICggaS0tICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFib3J0IGlmIHdlIGhpdCBhIGNvbWJpbmF0b3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBFeHByLnJlbGF0aXZlWyAodHlwZSA9IHRva2VuLnR5cGUpIF0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIChmaW5kID0gRXhwci5maW5kWyB0eXBlIF0pICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2VhcmNoLCBleHBhbmRpbmcgY29udGV4dCBmb3IgbGVhZGluZyBzaWJsaW5nIGNvbWJpbmF0b3JzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIChzZWVkID0gZmluZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4ubWF0Y2hlc1swXS5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByc2libGluZy50ZXN0KCB0b2tlbnNbMF0udHlwZSApICYmIHRlc3RDb250ZXh0KCBjb250ZXh0LnBhcmVudE5vZGUgKSB8fCBjb250ZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSkgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHNlZWQgaXMgZW1wdHkgb3Igbm8gdG9rZW5zIHJlbWFpbiwgd2UgY2FuIHJldHVybiBlYXJseVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2Vucy5zcGxpY2UoIGksIDEgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RvciA9IHNlZWQubGVuZ3RoICYmIHRvU2VsZWN0b3IoIHRva2VucyApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggIXNlbGVjdG9yICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoLmFwcGx5KCByZXN1bHRzLCBzZWVkICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ29tcGlsZSBhbmQgZXhlY3V0ZSBhIGZpbHRlcmluZyBmdW5jdGlvbiBpZiBvbmUgaXMgbm90IHByb3ZpZGVkXHJcbiAgICAgICAgICAgICAgICAvLyBQcm92aWRlIGBtYXRjaGAgdG8gYXZvaWQgcmV0b2tlbml6YXRpb24gaWYgd2UgbW9kaWZpZWQgdGhlIHNlbGVjdG9yIGFib3ZlXHJcbiAgICAgICAgICAgICAgICAoIGNvbXBpbGVkIHx8IGNvbXBpbGUoIHNlbGVjdG9yLCBtYXRjaCApICkoXHJcbiAgICAgICAgICAgICAgICAgICAgc2VlZCxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgICFkb2N1bWVudElzSFRNTCxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLFxyXG4gICAgICAgICAgICAgICAgICAgIHJzaWJsaW5nLnRlc3QoIHNlbGVjdG9yICkgJiYgdGVzdENvbnRleHQoIGNvbnRleHQucGFyZW50Tm9kZSApIHx8IGNvbnRleHRcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgICAgICAgICAgfTtcclxuXHJcbi8vIE9uZS10aW1lIGFzc2lnbm1lbnRzXHJcblxyXG4vLyBTb3J0IHN0YWJpbGl0eVxyXG4gICAgICAgICAgICBzdXBwb3J0LnNvcnRTdGFibGUgPSBleHBhbmRvLnNwbGl0KFwiXCIpLnNvcnQoIHNvcnRPcmRlciApLmpvaW4oXCJcIikgPT09IGV4cGFuZG87XHJcblxyXG4vLyBTdXBwb3J0OiBDaHJvbWUgMTQtMzUrXHJcbi8vIEFsd2F5cyBhc3N1bWUgZHVwbGljYXRlcyBpZiB0aGV5IGFyZW4ndCBwYXNzZWQgdG8gdGhlIGNvbXBhcmlzb24gZnVuY3Rpb25cclxuICAgICAgICAgICAgc3VwcG9ydC5kZXRlY3REdXBsaWNhdGVzID0gISFoYXNEdXBsaWNhdGU7XHJcblxyXG4vLyBJbml0aWFsaXplIGFnYWluc3QgdGhlIGRlZmF1bHQgZG9jdW1lbnRcclxuICAgICAgICAgICAgc2V0RG9jdW1lbnQoKTtcclxuXHJcbi8vIFN1cHBvcnQ6IFdlYmtpdDw1MzcuMzIgLSBTYWZhcmkgNi4wLjMvQ2hyb21lIDI1IChmaXhlZCBpbiBDaHJvbWUgMjcpXHJcbi8vIERldGFjaGVkIG5vZGVzIGNvbmZvdW5kaW5nbHkgZm9sbG93ICplYWNoIG90aGVyKlxyXG4gICAgICAgICAgICBzdXBwb3J0LnNvcnREZXRhY2hlZCA9IGFzc2VydChmdW5jdGlvbiggZGl2MSApIHtcclxuICAgICAgICAgICAgICAgIC8vIFNob3VsZCByZXR1cm4gMSwgYnV0IHJldHVybnMgNCAoZm9sbG93aW5nKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpdjEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikgKSAmIDE7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuLy8gU3VwcG9ydDogSUU8OFxyXG4vLyBQcmV2ZW50IGF0dHJpYnV0ZS9wcm9wZXJ0eSBcImludGVycG9sYXRpb25cIlxyXG4vLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXM1MzY0MjklMjhWUy44NSUyOS5hc3B4XHJcbiAgICAgICAgICAgIGlmICggIWFzc2VydChmdW5jdGlvbiggZGl2ICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSBcIjxhIGhyZWY9JyMnPjwvYT5cIjtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGl2LmZpcnN0Q2hpbGQuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSA9PT0gXCIjXCIgO1xyXG4gICAgICAgICAgICAgICAgfSkgKSB7XHJcbiAgICAgICAgICAgICAgICBhZGRIYW5kbGUoIFwidHlwZXxocmVmfGhlaWdodHx3aWR0aFwiLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhaXNYTUwgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSwgbmFtZS50b0xvd2VyQ2FzZSgpID09PSBcInR5cGVcIiA/IDEgOiAyICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbi8vIFN1cHBvcnQ6IElFPDlcclxuLy8gVXNlIGRlZmF1bHRWYWx1ZSBpbiBwbGFjZSBvZiBnZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKVxyXG4gICAgICAgICAgICBpZiAoICFzdXBwb3J0LmF0dHJpYnV0ZXMgfHwgIWFzc2VydChmdW5jdGlvbiggZGl2ICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSBcIjxpbnB1dC8+XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2LmZpcnN0Q2hpbGQuc2V0QXR0cmlidXRlKCBcInZhbHVlXCIsIFwiXCIgKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGl2LmZpcnN0Q2hpbGQuZ2V0QXR0cmlidXRlKCBcInZhbHVlXCIgKSA9PT0gXCJcIjtcclxuICAgICAgICAgICAgICAgIH0pICkge1xyXG4gICAgICAgICAgICAgICAgYWRkSGFuZGxlKCBcInZhbHVlXCIsIGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBpc1hNTCApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoICFpc1hNTCAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiaW5wdXRcIiApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0uZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4vLyBTdXBwb3J0OiBJRTw5XHJcbi8vIFVzZSBnZXRBdHRyaWJ1dGVOb2RlIHRvIGZldGNoIGJvb2xlYW5zIHdoZW4gZ2V0QXR0cmlidXRlIGxpZXNcclxuICAgICAgICAgICAgaWYgKCAhYXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpdi5nZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKSA9PSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSkgKSB7XHJcbiAgICAgICAgICAgICAgICBhZGRIYW5kbGUoIGJvb2xlYW5zLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoICFpc1hNTCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1bIG5hbWUgXSA9PT0gdHJ1ZSA/IG5hbWUudG9Mb3dlckNhc2UoKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmFsID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKCBuYW1lICkpICYmIHZhbC5zcGVjaWZpZWQgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbC52YWx1ZSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFNpenpsZTtcclxuXHJcbiAgICAgICAgfSkoIHdpbmRvdyApO1xyXG5cclxuXHJcblxyXG4gICAgalF1ZXJ5LmZpbmQgPSBTaXp6bGU7XHJcbiAgICBqUXVlcnkuZXhwciA9IFNpenpsZS5zZWxlY3RvcnM7XHJcbiAgICBqUXVlcnkuZXhwcltcIjpcIl0gPSBqUXVlcnkuZXhwci5wc2V1ZG9zO1xyXG4gICAgalF1ZXJ5LnVuaXF1ZSA9IFNpenpsZS51bmlxdWVTb3J0O1xyXG4gICAgalF1ZXJ5LnRleHQgPSBTaXp6bGUuZ2V0VGV4dDtcclxuICAgIGpRdWVyeS5pc1hNTERvYyA9IFNpenpsZS5pc1hNTDtcclxuICAgIGpRdWVyeS5jb250YWlucyA9IFNpenpsZS5jb250YWlucztcclxuXHJcblxyXG5cclxuICAgIHZhciBybmVlZHNDb250ZXh0ID0galF1ZXJ5LmV4cHIubWF0Y2gubmVlZHNDb250ZXh0O1xyXG5cclxuICAgIHZhciByc2luZ2xlVGFnID0gKC9ePChcXHcrKVxccypcXC8/Pig/OjxcXC9cXDE+fCkkLyk7XHJcblxyXG5cclxuXHJcbiAgICB2YXIgcmlzU2ltcGxlID0gL14uW146I1xcW1xcLixdKiQvO1xyXG5cclxuLy8gSW1wbGVtZW50IHRoZSBpZGVudGljYWwgZnVuY3Rpb25hbGl0eSBmb3IgZmlsdGVyIGFuZCBub3RcclxuICAgIGZ1bmN0aW9uIHdpbm5vdyggZWxlbWVudHMsIHF1YWxpZmllciwgbm90ICkge1xyXG4gICAgICAgIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHF1YWxpZmllciApICkge1xyXG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSwgaSApIHtcclxuICAgICAgICAgICAgICAgIC8qIGpzaGludCAtVzAxOCAqL1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhcXVhbGlmaWVyLmNhbGwoIGVsZW0sIGksIGVsZW0gKSAhPT0gbm90O1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIHF1YWxpZmllci5ub2RlVHlwZSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5ncmVwKCBlbGVtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKCBlbGVtID09PSBxdWFsaWZpZXIgKSAhPT0gbm90O1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIHR5cGVvZiBxdWFsaWZpZXIgPT09IFwic3RyaW5nXCIgKSB7XHJcbiAgICAgICAgICAgIGlmICggcmlzU2ltcGxlLnRlc3QoIHF1YWxpZmllciApICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5maWx0ZXIoIHF1YWxpZmllciwgZWxlbWVudHMsIG5vdCApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBxdWFsaWZpZXIgPSBqUXVlcnkuZmlsdGVyKCBxdWFsaWZpZXIsIGVsZW1lbnRzICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcclxuICAgICAgICAgICAgcmV0dXJuICggalF1ZXJ5LmluQXJyYXkoIGVsZW0sIHF1YWxpZmllciApID49IDAgKSAhPT0gbm90O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGpRdWVyeS5maWx0ZXIgPSBmdW5jdGlvbiggZXhwciwgZWxlbXMsIG5vdCApIHtcclxuICAgICAgICB2YXIgZWxlbSA9IGVsZW1zWyAwIF07XHJcblxyXG4gICAgICAgIGlmICggbm90ICkge1xyXG4gICAgICAgICAgICBleHByID0gXCI6bm90KFwiICsgZXhwciArIFwiKVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW1zLmxlbmd0aCA9PT0gMSAmJiBlbGVtLm5vZGVUeXBlID09PSAxID9cclxuICAgICAgICAgICAgalF1ZXJ5LmZpbmQubWF0Y2hlc1NlbGVjdG9yKCBlbGVtLCBleHByICkgPyBbIGVsZW0gXSA6IFtdIDpcclxuICAgICAgICAgICAgalF1ZXJ5LmZpbmQubWF0Y2hlcyggZXhwciwgalF1ZXJ5LmdyZXAoIGVsZW1zLCBmdW5jdGlvbiggZWxlbSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLm5vZGVUeXBlID09PSAxO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGpRdWVyeS5mbi5leHRlbmQoe1xyXG4gICAgICAgIGZpbmQ6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcclxuICAgICAgICAgICAgdmFyIGksXHJcbiAgICAgICAgICAgICAgICByZXQgPSBbXSxcclxuICAgICAgICAgICAgICAgIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgbGVuID0gc2VsZi5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICBpZiAoIHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIiApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2hTdGFjayggalF1ZXJ5KCBzZWxlY3RvciApLmZpbHRlcihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGpRdWVyeS5jb250YWlucyggc2VsZlsgaSBdLCB0aGlzICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAoIGkgPSAwOyBpIDwgbGVuOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkuZmluZCggc2VsZWN0b3IsIHNlbGZbIGkgXSwgcmV0ICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIE5lZWRlZCBiZWNhdXNlICQoIHNlbGVjdG9yLCBjb250ZXh0ICkgYmVjb21lcyAkKCBjb250ZXh0ICkuZmluZCggc2VsZWN0b3IgKVxyXG4gICAgICAgICAgICByZXQgPSB0aGlzLnB1c2hTdGFjayggbGVuID4gMSA/IGpRdWVyeS51bmlxdWUoIHJldCApIDogcmV0ICk7XHJcbiAgICAgICAgICAgIHJldC5zZWxlY3RvciA9IHRoaXMuc2VsZWN0b3IgPyB0aGlzLnNlbGVjdG9yICsgXCIgXCIgKyBzZWxlY3RvciA6IHNlbGVjdG9yO1xyXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2hTdGFjayggd2lubm93KHRoaXMsIHNlbGVjdG9yIHx8IFtdLCBmYWxzZSkgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5vdDogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoU3RhY2soIHdpbm5vdyh0aGlzLCBzZWxlY3RvciB8fCBbXSwgdHJ1ZSkgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhIXdpbm5vdyhcclxuICAgICAgICAgICAgICAgIHRoaXMsXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyBhIHBvc2l0aW9uYWwvcmVsYXRpdmUgc2VsZWN0b3IsIGNoZWNrIG1lbWJlcnNoaXAgaW4gdGhlIHJldHVybmVkIHNldFxyXG4gICAgICAgICAgICAgICAgLy8gc28gJChcInA6Zmlyc3RcIikuaXMoXCJwOmxhc3RcIikgd29uJ3QgcmV0dXJuIHRydWUgZm9yIGEgZG9jIHdpdGggdHdvIFwicFwiLlxyXG4gICAgICAgICAgICAgICAgdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICYmIHJuZWVkc0NvbnRleHQudGVzdCggc2VsZWN0b3IgKSA/XHJcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCBzZWxlY3RvciApIDpcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yIHx8IFtdLFxyXG4gICAgICAgICAgICAgICAgZmFsc2VcclxuICAgICAgICAgICAgKS5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuLy8gSW5pdGlhbGl6ZSBhIGpRdWVyeSBvYmplY3RcclxuXHJcblxyXG4vLyBBIGNlbnRyYWwgcmVmZXJlbmNlIHRvIHRoZSByb290IGpRdWVyeShkb2N1bWVudClcclxuICAgIHZhciByb290alF1ZXJ5LFxyXG5cclxuICAgIC8vIFVzZSB0aGUgY29ycmVjdCBkb2N1bWVudCBhY2NvcmRpbmdseSB3aXRoIHdpbmRvdyBhcmd1bWVudCAoc2FuZGJveClcclxuICAgICAgICBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudCxcclxuXHJcbiAgICAvLyBBIHNpbXBsZSB3YXkgdG8gY2hlY2sgZm9yIEhUTUwgc3RyaW5nc1xyXG4gICAgLy8gUHJpb3JpdGl6ZSAjaWQgb3ZlciA8dGFnPiB0byBhdm9pZCBYU1MgdmlhIGxvY2F0aW9uLmhhc2ggKCM5NTIxKVxyXG4gICAgLy8gU3RyaWN0IEhUTUwgcmVjb2duaXRpb24gKCMxMTI5MDogbXVzdCBzdGFydCB3aXRoIDwpXHJcbiAgICAgICAgcnF1aWNrRXhwciA9IC9eKD86XFxzKig8W1xcd1xcV10rPilbXj5dKnwjKFtcXHctXSopKSQvLFxyXG5cclxuICAgICAgICBpbml0ID0galF1ZXJ5LmZuLmluaXQgPSBmdW5jdGlvbiggc2VsZWN0b3IsIGNvbnRleHQgKSB7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaCwgZWxlbTtcclxuXHJcbiAgICAgICAgICAgIC8vIEhBTkRMRTogJChcIlwiKSwgJChudWxsKSwgJCh1bmRlZmluZWQpLCAkKGZhbHNlKVxyXG4gICAgICAgICAgICBpZiAoICFzZWxlY3RvciApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBIYW5kbGUgSFRNTCBzdHJpbmdzXHJcbiAgICAgICAgICAgIGlmICggdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBzZWxlY3Rvci5jaGFyQXQoMCkgPT09IFwiPFwiICYmIHNlbGVjdG9yLmNoYXJBdCggc2VsZWN0b3IubGVuZ3RoIC0gMSApID09PSBcIj5cIiAmJiBzZWxlY3Rvci5sZW5ndGggPj0gMyApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBc3N1bWUgdGhhdCBzdHJpbmdzIHRoYXQgc3RhcnQgYW5kIGVuZCB3aXRoIDw+IGFyZSBIVE1MIGFuZCBza2lwIHRoZSByZWdleCBjaGVja1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoID0gWyBudWxsLCBzZWxlY3RvciwgbnVsbCBdO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSBycXVpY2tFeHByLmV4ZWMoIHNlbGVjdG9yICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTWF0Y2ggaHRtbCBvciBtYWtlIHN1cmUgbm8gY29udGV4dCBpcyBzcGVjaWZpZWQgZm9yICNpZFxyXG4gICAgICAgICAgICAgICAgaWYgKCBtYXRjaCAmJiAobWF0Y2hbMV0gfHwgIWNvbnRleHQpICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBIQU5ETEU6ICQoaHRtbCkgLT4gJChhcnJheSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIG1hdGNoWzFdICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gY29udGV4dCBpbnN0YW5jZW9mIGpRdWVyeSA/IGNvbnRleHRbMF0gOiBjb250ZXh0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2NyaXB0cyBpcyB0cnVlIGZvciBiYWNrLWNvbXBhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJbnRlbnRpb25hbGx5IGxldCB0aGUgZXJyb3IgYmUgdGhyb3duIGlmIHBhcnNlSFRNTCBpcyBub3QgcHJlc2VudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkubWVyZ2UoIHRoaXMsIGpRdWVyeS5wYXJzZUhUTUwoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaFsxXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQgJiYgY29udGV4dC5ub2RlVHlwZSA/IGNvbnRleHQub3duZXJEb2N1bWVudCB8fCBjb250ZXh0IDogZG9jdW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEhBTkRMRTogJChodG1sLCBwcm9wcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCByc2luZ2xlVGFnLnRlc3QoIG1hdGNoWzFdICkgJiYgalF1ZXJ5LmlzUGxhaW5PYmplY3QoIGNvbnRleHQgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoIG1hdGNoIGluIGNvbnRleHQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHJvcGVydGllcyBvZiBjb250ZXh0IGFyZSBjYWxsZWQgYXMgbWV0aG9kcyBpZiBwb3NzaWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHRoaXNbIG1hdGNoIF0gKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1sgbWF0Y2ggXSggY29udGV4dFsgbWF0Y2ggXSApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gLi4uYW5kIG90aGVyd2lzZSBzZXQgYXMgYXR0cmlidXRlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0ciggbWF0Y2gsIGNvbnRleHRbIG1hdGNoIF0gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSEFORExFOiAkKCNpZClcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIG1hdGNoWzJdICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBwYXJlbnROb2RlIHRvIGNhdGNoIHdoZW4gQmxhY2tiZXJyeSA0LjYgcmV0dXJuc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBub2RlcyB0aGF0IGFyZSBubyBsb25nZXIgaW4gdGhlIGRvY3VtZW50ICM2OTYzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZWxlbSAmJiBlbGVtLnBhcmVudE5vZGUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBIYW5kbGUgdGhlIGNhc2Ugd2hlcmUgSUUgYW5kIE9wZXJhIHJldHVybiBpdGVtc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYnkgbmFtZSBpbnN0ZWFkIG9mIElEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGVsZW0uaWQgIT09IG1hdGNoWzJdICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByb290alF1ZXJ5LmZpbmQoIHNlbGVjdG9yICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCB3ZSBpbmplY3QgdGhlIGVsZW1lbnQgZGlyZWN0bHkgaW50byB0aGUgalF1ZXJ5IG9iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sZW5ndGggPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1swXSA9IGVsZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IGRvY3VtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSEFORExFOiAkKGV4cHIsICQoLi4uKSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoICFjb250ZXh0IHx8IGNvbnRleHQuanF1ZXJ5ICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoIGNvbnRleHQgfHwgcm9vdGpRdWVyeSApLmZpbmQoIHNlbGVjdG9yICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEhBTkRMRTogJChleHByLCBjb250ZXh0KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICh3aGljaCBpcyBqdXN0IGVxdWl2YWxlbnQgdG86ICQoY29udGV4dCkuZmluZChleHByKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3RvciggY29udGV4dCApLmZpbmQoIHNlbGVjdG9yICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSEFORExFOiAkKERPTUVsZW1lbnQpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHNlbGVjdG9yLm5vZGVUeXBlICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0ID0gdGhpc1swXSA9IHNlbGVjdG9yO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZW5ndGggPSAxO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSEFORExFOiAkKGZ1bmN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLy8gU2hvcnRjdXQgZm9yIGRvY3VtZW50IHJlYWR5XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBzZWxlY3RvciApICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiByb290alF1ZXJ5LnJlYWR5ICE9PSBcInVuZGVmaW5lZFwiID9cclxuICAgICAgICAgICAgICAgICAgICByb290alF1ZXJ5LnJlYWR5KCBzZWxlY3RvciApIDpcclxuICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIGltbWVkaWF0ZWx5IGlmIHJlYWR5IGlzIG5vdCBwcmVzZW50XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3IoIGpRdWVyeSApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIHNlbGVjdG9yLnNlbGVjdG9yICE9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3Iuc2VsZWN0b3I7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQgPSBzZWxlY3Rvci5jb250ZXh0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5Lm1ha2VBcnJheSggc2VsZWN0b3IsIHRoaXMgKTtcclxuICAgICAgICB9O1xyXG5cclxuLy8gR2l2ZSB0aGUgaW5pdCBmdW5jdGlvbiB0aGUgalF1ZXJ5IHByb3RvdHlwZSBmb3IgbGF0ZXIgaW5zdGFudGlhdGlvblxyXG4gICAgaW5pdC5wcm90b3R5cGUgPSBqUXVlcnkuZm47XHJcblxyXG4vLyBJbml0aWFsaXplIGNlbnRyYWwgcmVmZXJlbmNlXHJcbiAgICByb290alF1ZXJ5ID0galF1ZXJ5KCBkb2N1bWVudCApO1xyXG5cclxuXHJcbiAgICB2YXIgcnBhcmVudHNwcmV2ID0gL14oPzpwYXJlbnRzfHByZXYoPzpVbnRpbHxBbGwpKS8sXHJcbiAgICAvLyBtZXRob2RzIGd1YXJhbnRlZWQgdG8gcHJvZHVjZSBhIHVuaXF1ZSBzZXQgd2hlbiBzdGFydGluZyBmcm9tIGEgdW5pcXVlIHNldFxyXG4gICAgICAgIGd1YXJhbnRlZWRVbmlxdWUgPSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiB0cnVlLFxyXG4gICAgICAgICAgICBjb250ZW50czogdHJ1ZSxcclxuICAgICAgICAgICAgbmV4dDogdHJ1ZSxcclxuICAgICAgICAgICAgcHJldjogdHJ1ZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgalF1ZXJ5LmV4dGVuZCh7XHJcbiAgICAgICAgZGlyOiBmdW5jdGlvbiggZWxlbSwgZGlyLCB1bnRpbCApIHtcclxuICAgICAgICAgICAgdmFyIG1hdGNoZWQgPSBbXSxcclxuICAgICAgICAgICAgICAgIGN1ciA9IGVsZW1bIGRpciBdO1xyXG5cclxuICAgICAgICAgICAgd2hpbGUgKCBjdXIgJiYgY3VyLm5vZGVUeXBlICE9PSA5ICYmICh1bnRpbCA9PT0gdW5kZWZpbmVkIHx8IGN1ci5ub2RlVHlwZSAhPT0gMSB8fCAhalF1ZXJ5KCBjdXIgKS5pcyggdW50aWwgKSkgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIGN1ci5ub2RlVHlwZSA9PT0gMSApIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXRjaGVkLnB1c2goIGN1ciApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY3VyID0gY3VyW2Rpcl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZWQ7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2libGluZzogZnVuY3Rpb24oIG4sIGVsZW0gKSB7XHJcbiAgICAgICAgICAgIHZhciByID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKCA7IG47IG4gPSBuLm5leHRTaWJsaW5nICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBuLm5vZGVUeXBlID09PSAxICYmIG4gIT09IGVsZW0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgci5wdXNoKCBuICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGpRdWVyeS5mbi5leHRlbmQoe1xyXG4gICAgICAgIGhhczogZnVuY3Rpb24oIHRhcmdldCApIHtcclxuICAgICAgICAgICAgdmFyIGksXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRzID0galF1ZXJ5KCB0YXJnZXQsIHRoaXMgKSxcclxuICAgICAgICAgICAgICAgIGxlbiA9IHRhcmdldHMubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIGpRdWVyeS5jb250YWlucyggdGhpcywgdGFyZ2V0c1tpXSApICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNsb3Nlc3Q6IGZ1bmN0aW9uKCBzZWxlY3RvcnMsIGNvbnRleHQgKSB7XHJcbiAgICAgICAgICAgIHZhciBjdXIsXHJcbiAgICAgICAgICAgICAgICBpID0gMCxcclxuICAgICAgICAgICAgICAgIGwgPSB0aGlzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIG1hdGNoZWQgPSBbXSxcclxuICAgICAgICAgICAgICAgIHBvcyA9IHJuZWVkc0NvbnRleHQudGVzdCggc2VsZWN0b3JzICkgfHwgdHlwZW9mIHNlbGVjdG9ycyAhPT0gXCJzdHJpbmdcIiA/XHJcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCBzZWxlY3RvcnMsIGNvbnRleHQgfHwgdGhpcy5jb250ZXh0ICkgOlxyXG4gICAgICAgICAgICAgICAgICAgIDA7XHJcblxyXG4gICAgICAgICAgICBmb3IgKCA7IGkgPCBsOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKCBjdXIgPSB0aGlzW2ldOyBjdXIgJiYgY3VyICE9PSBjb250ZXh0OyBjdXIgPSBjdXIucGFyZW50Tm9kZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBbHdheXMgc2tpcCBkb2N1bWVudCBmcmFnbWVudHNcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIGN1ci5ub2RlVHlwZSA8IDExICYmIChwb3MgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MuaW5kZXgoY3VyKSA+IC0xIDpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBwYXNzIG5vbi1lbGVtZW50cyB0byBTaXp6bGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyLm5vZGVUeXBlID09PSAxICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5maW5kLm1hdGNoZXNTZWxlY3RvcihjdXIsIHNlbGVjdG9ycykpICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZC5wdXNoKCBjdXIgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoU3RhY2soIG1hdGNoZWQubGVuZ3RoID4gMSA/IGpRdWVyeS51bmlxdWUoIG1hdGNoZWQgKSA6IG1hdGNoZWQgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIHBvc2l0aW9uIG9mIGFuIGVsZW1lbnQgd2l0aGluXHJcbiAgICAgICAgLy8gdGhlIG1hdGNoZWQgc2V0IG9mIGVsZW1lbnRzXHJcbiAgICAgICAgaW5kZXg6IGZ1bmN0aW9uKCBlbGVtICkge1xyXG5cclxuICAgICAgICAgICAgLy8gTm8gYXJndW1lbnQsIHJldHVybiBpbmRleCBpbiBwYXJlbnRcclxuICAgICAgICAgICAgaWYgKCAhZWxlbSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoIHRoaXNbMF0gJiYgdGhpc1swXS5wYXJlbnROb2RlICkgPyB0aGlzLmZpcnN0KCkucHJldkFsbCgpLmxlbmd0aCA6IC0xO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpbmRleCBpbiBzZWxlY3RvclxyXG4gICAgICAgICAgICBpZiAoIHR5cGVvZiBlbGVtID09PSBcInN0cmluZ1wiICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5pbkFycmF5KCB0aGlzWzBdLCBqUXVlcnkoIGVsZW0gKSApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBMb2NhdGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBkZXNpcmVkIGVsZW1lbnRcclxuICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5pbkFycmF5KFxyXG4gICAgICAgICAgICAgICAgLy8gSWYgaXQgcmVjZWl2ZXMgYSBqUXVlcnkgb2JqZWN0LCB0aGUgZmlyc3QgZWxlbWVudCBpcyB1c2VkXHJcbiAgICAgICAgICAgICAgICBlbGVtLmpxdWVyeSA/IGVsZW1bMF0gOiBlbGVtLCB0aGlzICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYWRkOiBmdW5jdGlvbiggc2VsZWN0b3IsIGNvbnRleHQgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2hTdGFjayhcclxuICAgICAgICAgICAgICAgIGpRdWVyeS51bmlxdWUoXHJcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5Lm1lcmdlKCB0aGlzLmdldCgpLCBqUXVlcnkoIHNlbGVjdG9yLCBjb250ZXh0ICkgKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFkZEJhY2s6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkKCBzZWxlY3RvciA9PSBudWxsID9cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZPYmplY3QgOiB0aGlzLnByZXZPYmplY3QuZmlsdGVyKHNlbGVjdG9yKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNpYmxpbmcoIGN1ciwgZGlyICkge1xyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgY3VyID0gY3VyWyBkaXIgXTtcclxuICAgICAgICB9IHdoaWxlICggY3VyICYmIGN1ci5ub2RlVHlwZSAhPT0gMSApO1xyXG5cclxuICAgICAgICByZXR1cm4gY3VyO1xyXG4gICAgfVxyXG5cclxuICAgIGpRdWVyeS5lYWNoKHtcclxuICAgICAgICBwYXJlbnQ6IGZ1bmN0aW9uKCBlbGVtICkge1xyXG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyZW50ICYmIHBhcmVudC5ub2RlVHlwZSAhPT0gMTEgPyBwYXJlbnQgOiBudWxsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFyZW50czogZnVuY3Rpb24oIGVsZW0gKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBqUXVlcnkuZGlyKCBlbGVtLCBcInBhcmVudE5vZGVcIiApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFyZW50c1VudGlsOiBmdW5jdGlvbiggZWxlbSwgaSwgdW50aWwgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBqUXVlcnkuZGlyKCBlbGVtLCBcInBhcmVudE5vZGVcIiwgdW50aWwgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uKCBlbGVtICkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2libGluZyggZWxlbSwgXCJuZXh0U2libGluZ1wiICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcmV2OiBmdW5jdGlvbiggZWxlbSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNpYmxpbmcoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5leHRBbGw6IGZ1bmN0aW9uKCBlbGVtICkge1xyXG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5LmRpciggZWxlbSwgXCJuZXh0U2libGluZ1wiICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcmV2QWxsOiBmdW5jdGlvbiggZWxlbSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5kaXIoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5leHRVbnRpbDogZnVuY3Rpb24oIGVsZW0sIGksIHVudGlsICkge1xyXG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5LmRpciggZWxlbSwgXCJuZXh0U2libGluZ1wiLCB1bnRpbCApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJldlVudGlsOiBmdW5jdGlvbiggZWxlbSwgaSwgdW50aWwgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBqUXVlcnkuZGlyKCBlbGVtLCBcInByZXZpb3VzU2libGluZ1wiLCB1bnRpbCApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2libGluZ3M6IGZ1bmN0aW9uKCBlbGVtICkge1xyXG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5LnNpYmxpbmcoICggZWxlbS5wYXJlbnROb2RlIHx8IHt9ICkuZmlyc3RDaGlsZCwgZWxlbSApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hpbGRyZW46IGZ1bmN0aW9uKCBlbGVtICkge1xyXG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5LnNpYmxpbmcoIGVsZW0uZmlyc3RDaGlsZCApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29udGVudHM6IGZ1bmN0aW9uKCBlbGVtICkge1xyXG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5Lm5vZGVOYW1lKCBlbGVtLCBcImlmcmFtZVwiICkgP1xyXG4gICAgICAgICAgICBlbGVtLmNvbnRlbnREb2N1bWVudCB8fCBlbGVtLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQgOlxyXG4gICAgICAgICAgICAgICAgalF1ZXJ5Lm1lcmdlKCBbXSwgZWxlbS5jaGlsZE5vZGVzICk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgZnVuY3Rpb24oIG5hbWUsIGZuICkge1xyXG4gICAgICAgIGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIHVudGlsLCBzZWxlY3RvciApIHtcclxuICAgICAgICAgICAgdmFyIHJldCA9IGpRdWVyeS5tYXAoIHRoaXMsIGZuLCB1bnRpbCApO1xyXG5cclxuICAgICAgICAgICAgaWYgKCBuYW1lLnNsaWNlKCAtNSApICE9PSBcIlVudGlsXCIgKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvciA9IHVudGlsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIHNlbGVjdG9yICYmIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiApIHtcclxuICAgICAgICAgICAgICAgIHJldCA9IGpRdWVyeS5maWx0ZXIoIHNlbGVjdG9yLCByZXQgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCB0aGlzLmxlbmd0aCA+IDEgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgZHVwbGljYXRlc1xyXG4gICAgICAgICAgICAgICAgaWYgKCAhZ3VhcmFudGVlZFVuaXF1ZVsgbmFtZSBdICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldCA9IGpRdWVyeS51bmlxdWUoIHJldCApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJldmVyc2Ugb3JkZXIgZm9yIHBhcmVudHMqIGFuZCBwcmV2LWRlcml2YXRpdmVzXHJcbiAgICAgICAgICAgICAgICBpZiAoIHJwYXJlbnRzcHJldi50ZXN0KCBuYW1lICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gcmV0LnJldmVyc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaFN0YWNrKCByZXQgKTtcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICB2YXIgcm5vdHdoaXRlID0gKC9cXFMrL2cpO1xyXG5cclxuXHJcblxyXG4vLyBTdHJpbmcgdG8gT2JqZWN0IG9wdGlvbnMgZm9ybWF0IGNhY2hlXHJcbiAgICB2YXIgb3B0aW9uc0NhY2hlID0ge307XHJcblxyXG4vLyBDb252ZXJ0IFN0cmluZy1mb3JtYXR0ZWQgb3B0aW9ucyBpbnRvIE9iamVjdC1mb3JtYXR0ZWQgb25lcyBhbmQgc3RvcmUgaW4gY2FjaGVcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZU9wdGlvbnMoIG9wdGlvbnMgKSB7XHJcbiAgICAgICAgdmFyIG9iamVjdCA9IG9wdGlvbnNDYWNoZVsgb3B0aW9ucyBdID0ge307XHJcbiAgICAgICAgalF1ZXJ5LmVhY2goIG9wdGlvbnMubWF0Y2goIHJub3R3aGl0ZSApIHx8IFtdLCBmdW5jdGlvbiggXywgZmxhZyApIHtcclxuICAgICAgICAgICAgb2JqZWN0WyBmbGFnIF0gPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBvYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICAqIENyZWF0ZSBhIGNhbGxiYWNrIGxpc3QgdXNpbmcgdGhlIGZvbGxvd2luZyBwYXJhbWV0ZXJzOlxyXG4gICAgICpcclxuICAgICAqXHRvcHRpb25zOiBhbiBvcHRpb25hbCBsaXN0IG9mIHNwYWNlLXNlcGFyYXRlZCBvcHRpb25zIHRoYXQgd2lsbCBjaGFuZ2UgaG93XHJcbiAgICAgKlx0XHRcdHRoZSBjYWxsYmFjayBsaXN0IGJlaGF2ZXMgb3IgYSBtb3JlIHRyYWRpdGlvbmFsIG9wdGlvbiBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBCeSBkZWZhdWx0IGEgY2FsbGJhY2sgbGlzdCB3aWxsIGFjdCBsaWtlIGFuIGV2ZW50IGNhbGxiYWNrIGxpc3QgYW5kIGNhbiBiZVxyXG4gICAgICogXCJmaXJlZFwiIG11bHRpcGxlIHRpbWVzLlxyXG4gICAgICpcclxuICAgICAqIFBvc3NpYmxlIG9wdGlvbnM6XHJcbiAgICAgKlxyXG4gICAgICpcdG9uY2U6XHRcdFx0d2lsbCBlbnN1cmUgdGhlIGNhbGxiYWNrIGxpc3QgY2FuIG9ubHkgYmUgZmlyZWQgb25jZSAobGlrZSBhIERlZmVycmVkKVxyXG4gICAgICpcclxuICAgICAqXHRtZW1vcnk6XHRcdFx0d2lsbCBrZWVwIHRyYWNrIG9mIHByZXZpb3VzIHZhbHVlcyBhbmQgd2lsbCBjYWxsIGFueSBjYWxsYmFjayBhZGRlZFxyXG4gICAgICpcdFx0XHRcdFx0YWZ0ZXIgdGhlIGxpc3QgaGFzIGJlZW4gZmlyZWQgcmlnaHQgYXdheSB3aXRoIHRoZSBsYXRlc3QgXCJtZW1vcml6ZWRcIlxyXG4gICAgICpcdFx0XHRcdFx0dmFsdWVzIChsaWtlIGEgRGVmZXJyZWQpXHJcbiAgICAgKlxyXG4gICAgICpcdHVuaXF1ZTpcdFx0XHR3aWxsIGVuc3VyZSBhIGNhbGxiYWNrIGNhbiBvbmx5IGJlIGFkZGVkIG9uY2UgKG5vIGR1cGxpY2F0ZSBpbiB0aGUgbGlzdClcclxuICAgICAqXHJcbiAgICAgKlx0c3RvcE9uRmFsc2U6XHRpbnRlcnJ1cHQgY2FsbGluZ3Mgd2hlbiBhIGNhbGxiYWNrIHJldHVybnMgZmFsc2VcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGpRdWVyeS5DYWxsYmFja3MgPSBmdW5jdGlvbiggb3B0aW9ucyApIHtcclxuXHJcbiAgICAgICAgLy8gQ29udmVydCBvcHRpb25zIGZyb20gU3RyaW5nLWZvcm1hdHRlZCB0byBPYmplY3QtZm9ybWF0dGVkIGlmIG5lZWRlZFxyXG4gICAgICAgIC8vICh3ZSBjaGVjayBpbiBjYWNoZSBmaXJzdClcclxuICAgICAgICBvcHRpb25zID0gdHlwZW9mIG9wdGlvbnMgPT09IFwic3RyaW5nXCIgP1xyXG4gICAgICAgICAgICAoIG9wdGlvbnNDYWNoZVsgb3B0aW9ucyBdIHx8IGNyZWF0ZU9wdGlvbnMoIG9wdGlvbnMgKSApIDpcclxuICAgICAgICAgICAgalF1ZXJ5LmV4dGVuZCgge30sIG9wdGlvbnMgKTtcclxuXHJcbiAgICAgICAgdmFyIC8vIEZsYWcgdG8ga25vdyBpZiBsaXN0IGlzIGN1cnJlbnRseSBmaXJpbmdcclxuICAgICAgICAgICAgZmlyaW5nLFxyXG4gICAgICAgIC8vIExhc3QgZmlyZSB2YWx1ZSAoZm9yIG5vbi1mb3JnZXR0YWJsZSBsaXN0cylcclxuICAgICAgICAgICAgbWVtb3J5LFxyXG4gICAgICAgIC8vIEZsYWcgdG8ga25vdyBpZiBsaXN0IHdhcyBhbHJlYWR5IGZpcmVkXHJcbiAgICAgICAgICAgIGZpcmVkLFxyXG4gICAgICAgIC8vIEVuZCBvZiB0aGUgbG9vcCB3aGVuIGZpcmluZ1xyXG4gICAgICAgICAgICBmaXJpbmdMZW5ndGgsXHJcbiAgICAgICAgLy8gSW5kZXggb2YgY3VycmVudGx5IGZpcmluZyBjYWxsYmFjayAobW9kaWZpZWQgYnkgcmVtb3ZlIGlmIG5lZWRlZClcclxuICAgICAgICAgICAgZmlyaW5nSW5kZXgsXHJcbiAgICAgICAgLy8gRmlyc3QgY2FsbGJhY2sgdG8gZmlyZSAodXNlZCBpbnRlcm5hbGx5IGJ5IGFkZCBhbmQgZmlyZVdpdGgpXHJcbiAgICAgICAgICAgIGZpcmluZ1N0YXJ0LFxyXG4gICAgICAgIC8vIEFjdHVhbCBjYWxsYmFjayBsaXN0XHJcbiAgICAgICAgICAgIGxpc3QgPSBbXSxcclxuICAgICAgICAvLyBTdGFjayBvZiBmaXJlIGNhbGxzIGZvciByZXBlYXRhYmxlIGxpc3RzXHJcbiAgICAgICAgICAgIHN0YWNrID0gIW9wdGlvbnMub25jZSAmJiBbXSxcclxuICAgICAgICAvLyBGaXJlIGNhbGxiYWNrc1xyXG4gICAgICAgICAgICBmaXJlID0gZnVuY3Rpb24oIGRhdGEgKSB7XHJcbiAgICAgICAgICAgICAgICBtZW1vcnkgPSBvcHRpb25zLm1lbW9yeSAmJiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgZmlyZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZmlyaW5nSW5kZXggPSBmaXJpbmdTdGFydCB8fCAwO1xyXG4gICAgICAgICAgICAgICAgZmlyaW5nU3RhcnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgZmlyaW5nTGVuZ3RoID0gbGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBmaXJpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZm9yICggOyBsaXN0ICYmIGZpcmluZ0luZGV4IDwgZmlyaW5nTGVuZ3RoOyBmaXJpbmdJbmRleCsrICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggbGlzdFsgZmlyaW5nSW5kZXggXS5hcHBseSggZGF0YVsgMCBdLCBkYXRhWyAxIF0gKSA9PT0gZmFsc2UgJiYgb3B0aW9ucy5zdG9wT25GYWxzZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVtb3J5ID0gZmFsc2U7IC8vIFRvIHByZXZlbnQgZnVydGhlciBjYWxscyB1c2luZyBhZGRcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmlyaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoIGxpc3QgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBzdGFjayApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBzdGFjay5sZW5ndGggKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlKCBzdGFjay5zaGlmdCgpICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBtZW1vcnkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRpc2FibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgLy8gQWN0dWFsIENhbGxiYWNrcyBvYmplY3RcclxuICAgICAgICAgICAgc2VsZiA9IHtcclxuICAgICAgICAgICAgICAgIC8vIEFkZCBhIGNhbGxiYWNrIG9yIGEgY29sbGVjdGlvbiBvZiBjYWxsYmFja3MgdG8gdGhlIGxpc3RcclxuICAgICAgICAgICAgICAgIGFkZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBsaXN0ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGaXJzdCwgd2Ugc2F2ZSB0aGUgY3VycmVudCBsZW5ndGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXJ0ID0gbGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiBhZGQoIGFyZ3MgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZWFjaCggYXJncywgZnVuY3Rpb24oIF8sIGFyZyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IGpRdWVyeS50eXBlKCBhcmcgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHR5cGUgPT09IFwiZnVuY3Rpb25cIiApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAhb3B0aW9ucy51bmlxdWUgfHwgIXNlbGYuaGFzKCBhcmcgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QucHVzaCggYXJnICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBhcmcgJiYgYXJnLmxlbmd0aCAmJiB0eXBlICE9PSBcInN0cmluZ1wiICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbnNwZWN0IHJlY3Vyc2l2ZWx5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZCggYXJnICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKCBhcmd1bWVudHMgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG8gd2UgbmVlZCB0byBhZGQgdGhlIGNhbGxiYWNrcyB0byB0aGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3VycmVudCBmaXJpbmcgYmF0Y2g/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZmlyaW5nICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyaW5nTGVuZ3RoID0gbGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXaXRoIG1lbW9yeSwgaWYgd2UncmUgbm90IGZpcmluZyB0aGVuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSBzaG91bGQgY2FsbCByaWdodCBhd2F5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIG1lbW9yeSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmluZ1N0YXJ0ID0gc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlKCBtZW1vcnkgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgYSBjYWxsYmFjayBmcm9tIHRoZSBsaXN0XHJcbiAgICAgICAgICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggbGlzdCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmVhY2goIGFyZ3VtZW50cywgZnVuY3Rpb24oIF8sIGFyZyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICggKCBpbmRleCA9IGpRdWVyeS5pbkFycmF5KCBhcmcsIGxpc3QsIGluZGV4ICkgKSA+IC0xICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Quc3BsaWNlKCBpbmRleCwgMSApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBmaXJpbmcgaW5kZXhlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZmlyaW5nICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGluZGV4IDw9IGZpcmluZ0xlbmd0aCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmluZ0xlbmd0aC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggaW5kZXggPD0gZmlyaW5nSW5kZXggKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJpbmdJbmRleC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYSBnaXZlbiBjYWxsYmFjayBpcyBpbiB0aGUgbGlzdC5cclxuICAgICAgICAgICAgICAgIC8vIElmIG5vIGFyZ3VtZW50IGlzIGdpdmVuLCByZXR1cm4gd2hldGhlciBvciBub3QgbGlzdCBoYXMgY2FsbGJhY2tzIGF0dGFjaGVkLlxyXG4gICAgICAgICAgICAgICAgaGFzOiBmdW5jdGlvbiggZm4gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZuID8galF1ZXJ5LmluQXJyYXkoIGZuLCBsaXN0ICkgPiAtMSA6ICEhKCBsaXN0ICYmIGxpc3QubGVuZ3RoICk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGFsbCBjYWxsYmFja3MgZnJvbSB0aGUgbGlzdFxyXG4gICAgICAgICAgICAgICAgZW1wdHk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmaXJpbmdMZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vIEhhdmUgdGhlIGxpc3QgZG8gbm90aGluZyBhbnltb3JlXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gc3RhY2sgPSBtZW1vcnkgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gSXMgaXQgZGlzYWJsZWQ/XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFsaXN0O1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vIExvY2sgdGhlIGxpc3QgaW4gaXRzIGN1cnJlbnQgc3RhdGVcclxuICAgICAgICAgICAgICAgIGxvY2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggIW1lbW9yeSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vIElzIGl0IGxvY2tlZD9cclxuICAgICAgICAgICAgICAgIGxvY2tlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFzdGFjaztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyBDYWxsIGFsbCBjYWxsYmFja3Mgd2l0aCB0aGUgZ2l2ZW4gY29udGV4dCBhbmQgYXJndW1lbnRzXHJcbiAgICAgICAgICAgICAgICBmaXJlV2l0aDogZnVuY3Rpb24oIGNvbnRleHQsIGFyZ3MgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBsaXN0ICYmICggIWZpcmVkIHx8IHN0YWNrICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmdzIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzID0gWyBjb250ZXh0LCBhcmdzLnNsaWNlID8gYXJncy5zbGljZSgpIDogYXJncyBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGZpcmluZyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnB1c2goIGFyZ3MgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmUoIGFyZ3MgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyBDYWxsIGFsbCB0aGUgY2FsbGJhY2tzIHdpdGggdGhlIGdpdmVuIGFyZ3VtZW50c1xyXG4gICAgICAgICAgICAgICAgZmlyZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5maXJlV2l0aCggdGhpcywgYXJndW1lbnRzICk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gVG8ga25vdyBpZiB0aGUgY2FsbGJhY2tzIGhhdmUgYWxyZWFkeSBiZWVuIGNhbGxlZCBhdCBsZWFzdCBvbmNlXHJcbiAgICAgICAgICAgICAgICBmaXJlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhZmlyZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBzZWxmO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgalF1ZXJ5LmV4dGVuZCh7XHJcblxyXG4gICAgICAgIERlZmVycmVkOiBmdW5jdGlvbiggZnVuYyApIHtcclxuICAgICAgICAgICAgdmFyIHR1cGxlcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICAvLyBhY3Rpb24sIGFkZCBsaXN0ZW5lciwgbGlzdGVuZXIgbGlzdCwgZmluYWwgc3RhdGVcclxuICAgICAgICAgICAgICAgICAgICBbIFwicmVzb2x2ZVwiLCBcImRvbmVcIiwgalF1ZXJ5LkNhbGxiYWNrcyhcIm9uY2UgbWVtb3J5XCIpLCBcInJlc29sdmVkXCIgXSxcclxuICAgICAgICAgICAgICAgICAgICBbIFwicmVqZWN0XCIsIFwiZmFpbFwiLCBqUXVlcnkuQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIiksIFwicmVqZWN0ZWRcIiBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFsgXCJub3RpZnlcIiwgXCJwcm9ncmVzc1wiLCBqUXVlcnkuQ2FsbGJhY2tzKFwibWVtb3J5XCIpIF1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IFwicGVuZGluZ1wiLFxyXG4gICAgICAgICAgICAgICAgcHJvbWlzZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFsd2F5czogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLmRvbmUoIGFyZ3VtZW50cyApLmZhaWwoIGFyZ3VtZW50cyApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRoZW46IGZ1bmN0aW9uKCAvKiBmbkRvbmUsIGZuRmFpbCwgZm5Qcm9ncmVzcyAqLyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZucyA9IGFyZ3VtZW50cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5EZWZlcnJlZChmdW5jdGlvbiggbmV3RGVmZXIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZWFjaCggdHVwbGVzLCBmdW5jdGlvbiggaSwgdHVwbGUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZuID0galF1ZXJ5LmlzRnVuY3Rpb24oIGZuc1sgaSBdICkgJiYgZm5zWyBpIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVmZXJyZWRbIGRvbmUgfCBmYWlsIHwgcHJvZ3Jlc3MgXSBmb3IgZm9yd2FyZGluZyBhY3Rpb25zIHRvIG5ld0RlZmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWRbIHR1cGxlWzFdIF0oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5lZCA9IGZuICYmIGZuLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCByZXR1cm5lZCAmJiBqUXVlcnkuaXNGdW5jdGlvbiggcmV0dXJuZWQucHJvbWlzZSApICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuZWQucHJvbWlzZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoIG5ld0RlZmVyLnJlc29sdmUgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKCBuZXdEZWZlci5yZWplY3QgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9ncmVzcyggbmV3RGVmZXIubm90aWZ5ICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdEZWZlclsgdHVwbGVbIDAgXSArIFwiV2l0aFwiIF0oIHRoaXMgPT09IHByb21pc2UgPyBuZXdEZWZlci5wcm9taXNlKCkgOiB0aGlzLCBmbiA/IFsgcmV0dXJuZWQgXSA6IGFyZ3VtZW50cyApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZucyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEdldCBhIHByb21pc2UgZm9yIHRoaXMgZGVmZXJyZWRcclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBvYmogaXMgcHJvdmlkZWQsIHRoZSBwcm9taXNlIGFzcGVjdCBpcyBhZGRlZCB0byB0aGUgb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZTogZnVuY3Rpb24oIG9iaiApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iaiAhPSBudWxsID8galF1ZXJ5LmV4dGVuZCggb2JqLCBwcm9taXNlICkgOiBwcm9taXNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZCA9IHt9O1xyXG5cclxuICAgICAgICAgICAgLy8gS2VlcCBwaXBlIGZvciBiYWNrLWNvbXBhdFxyXG4gICAgICAgICAgICBwcm9taXNlLnBpcGUgPSBwcm9taXNlLnRoZW47XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgbGlzdC1zcGVjaWZpYyBtZXRob2RzXHJcbiAgICAgICAgICAgIGpRdWVyeS5lYWNoKCB0dXBsZXMsIGZ1bmN0aW9uKCBpLCB0dXBsZSApIHtcclxuICAgICAgICAgICAgICAgIHZhciBsaXN0ID0gdHVwbGVbIDIgXSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZVN0cmluZyA9IHR1cGxlWyAzIF07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcHJvbWlzZVsgZG9uZSB8IGZhaWwgfCBwcm9ncmVzcyBdID0gbGlzdC5hZGRcclxuICAgICAgICAgICAgICAgIHByb21pc2VbIHR1cGxlWzFdIF0gPSBsaXN0LmFkZDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBIYW5kbGUgc3RhdGVcclxuICAgICAgICAgICAgICAgIGlmICggc3RhdGVTdHJpbmcgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5hZGQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0YXRlID0gWyByZXNvbHZlZCB8IHJlamVjdGVkIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBzdGF0ZVN0cmluZztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFsgcmVqZWN0X2xpc3QgfCByZXNvbHZlX2xpc3QgXS5kaXNhYmxlOyBwcm9ncmVzc19saXN0LmxvY2tcclxuICAgICAgICAgICAgICAgICAgICB9LCB0dXBsZXNbIGkgXiAxIF1bIDIgXS5kaXNhYmxlLCB0dXBsZXNbIDIgXVsgMiBdLmxvY2sgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBkZWZlcnJlZFsgcmVzb2x2ZSB8IHJlamVjdCB8IG5vdGlmeSBdXHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZFsgdHVwbGVbMF0gXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkWyB0dXBsZVswXSArIFwiV2l0aFwiIF0oIHRoaXMgPT09IGRlZmVycmVkID8gcHJvbWlzZSA6IHRoaXMsIGFyZ3VtZW50cyApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkWyB0dXBsZVswXSArIFwiV2l0aFwiIF0gPSBsaXN0LmZpcmVXaXRoO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIE1ha2UgdGhlIGRlZmVycmVkIGEgcHJvbWlzZVxyXG4gICAgICAgICAgICBwcm9taXNlLnByb21pc2UoIGRlZmVycmVkICk7XHJcblxyXG4gICAgICAgICAgICAvLyBDYWxsIGdpdmVuIGZ1bmMgaWYgYW55XHJcbiAgICAgICAgICAgIGlmICggZnVuYyApIHtcclxuICAgICAgICAgICAgICAgIGZ1bmMuY2FsbCggZGVmZXJyZWQsIGRlZmVycmVkICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEFsbCBkb25lIVxyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQ7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gRGVmZXJyZWQgaGVscGVyXHJcbiAgICAgICAgd2hlbjogZnVuY3Rpb24oIHN1Ym9yZGluYXRlIC8qICwgLi4uLCBzdWJvcmRpbmF0ZU4gKi8gKSB7XHJcbiAgICAgICAgICAgIHZhciBpID0gMCxcclxuICAgICAgICAgICAgICAgIHJlc29sdmVWYWx1ZXMgPSBzbGljZS5jYWxsKCBhcmd1bWVudHMgKSxcclxuICAgICAgICAgICAgICAgIGxlbmd0aCA9IHJlc29sdmVWYWx1ZXMubGVuZ3RoLFxyXG5cclxuICAgICAgICAgICAgLy8gdGhlIGNvdW50IG9mIHVuY29tcGxldGVkIHN1Ym9yZGluYXRlc1xyXG4gICAgICAgICAgICAgICAgcmVtYWluaW5nID0gbGVuZ3RoICE9PSAxIHx8ICggc3Vib3JkaW5hdGUgJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIHN1Ym9yZGluYXRlLnByb21pc2UgKSApID8gbGVuZ3RoIDogMCxcclxuXHJcbiAgICAgICAgICAgIC8vIHRoZSBtYXN0ZXIgRGVmZXJyZWQuIElmIHJlc29sdmVWYWx1ZXMgY29uc2lzdCBvZiBvbmx5IGEgc2luZ2xlIERlZmVycmVkLCBqdXN0IHVzZSB0aGF0LlxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQgPSByZW1haW5pbmcgPT09IDEgPyBzdWJvcmRpbmF0ZSA6IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG5cclxuICAgICAgICAgICAgLy8gVXBkYXRlIGZ1bmN0aW9uIGZvciBib3RoIHJlc29sdmUgYW5kIHByb2dyZXNzIHZhbHVlc1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlRnVuYyA9IGZ1bmN0aW9uKCBpLCBjb250ZXh0cywgdmFsdWVzICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiggdmFsdWUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRzWyBpIF0gPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXNbIGkgXSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gc2xpY2UuY2FsbCggYXJndW1lbnRzICkgOiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCB2YWx1ZXMgPT09IHByb2dyZXNzVmFsdWVzICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQubm90aWZ5V2l0aCggY29udGV4dHMsIHZhbHVlcyApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICggISgtLXJlbWFpbmluZykgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCggY29udGV4dHMsIHZhbHVlcyApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NWYWx1ZXMsIHByb2dyZXNzQ29udGV4dHMsIHJlc29sdmVDb250ZXh0cztcclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCBsaXN0ZW5lcnMgdG8gRGVmZXJyZWQgc3Vib3JkaW5hdGVzOyB0cmVhdCBvdGhlcnMgYXMgcmVzb2x2ZWRcclxuICAgICAgICAgICAgaWYgKCBsZW5ndGggPiAxICkge1xyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NWYWx1ZXMgPSBuZXcgQXJyYXkoIGxlbmd0aCApO1xyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NDb250ZXh0cyA9IG5ldyBBcnJheSggbGVuZ3RoICk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlQ29udGV4dHMgPSBuZXcgQXJyYXkoIGxlbmd0aCApO1xyXG4gICAgICAgICAgICAgICAgZm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCByZXNvbHZlVmFsdWVzWyBpIF0gJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIHJlc29sdmVWYWx1ZXNbIGkgXS5wcm9taXNlICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVWYWx1ZXNbIGkgXS5wcm9taXNlKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKCB1cGRhdGVGdW5jKCBpLCByZXNvbHZlQ29udGV4dHMsIHJlc29sdmVWYWx1ZXMgKSApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCggZGVmZXJyZWQucmVqZWN0IClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9ncmVzcyggdXBkYXRlRnVuYyggaSwgcHJvZ3Jlc3NDb250ZXh0cywgcHJvZ3Jlc3NWYWx1ZXMgKSApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0tcmVtYWluaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgd2UncmUgbm90IHdhaXRpbmcgb24gYW55dGhpbmcsIHJlc29sdmUgdGhlIG1hc3RlclxyXG4gICAgICAgICAgICBpZiAoICFyZW1haW5pbmcgKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCggcmVzb2x2ZUNvbnRleHRzLCByZXNvbHZlVmFsdWVzICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuLy8gVGhlIGRlZmVycmVkIHVzZWQgb24gRE9NIHJlYWR5XHJcbiAgICB2YXIgcmVhZHlMaXN0O1xyXG5cclxuICAgIGpRdWVyeS5mbi5yZWFkeSA9IGZ1bmN0aW9uKCBmbiApIHtcclxuICAgICAgICAvLyBBZGQgdGhlIGNhbGxiYWNrXHJcbiAgICAgICAgalF1ZXJ5LnJlYWR5LnByb21pc2UoKS5kb25lKCBmbiApO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgalF1ZXJ5LmV4dGVuZCh7XHJcbiAgICAgICAgLy8gSXMgdGhlIERPTSByZWFkeSB0byBiZSB1c2VkPyBTZXQgdG8gdHJ1ZSBvbmNlIGl0IG9jY3Vycy5cclxuICAgICAgICBpc1JlYWR5OiBmYWxzZSxcclxuXHJcbiAgICAgICAgLy8gQSBjb3VudGVyIHRvIHRyYWNrIGhvdyBtYW55IGl0ZW1zIHRvIHdhaXQgZm9yIGJlZm9yZVxyXG4gICAgICAgIC8vIHRoZSByZWFkeSBldmVudCBmaXJlcy4gU2VlICM2NzgxXHJcbiAgICAgICAgcmVhZHlXYWl0OiAxLFxyXG5cclxuICAgICAgICAvLyBIb2xkIChvciByZWxlYXNlKSB0aGUgcmVhZHkgZXZlbnRcclxuICAgICAgICBob2xkUmVhZHk6IGZ1bmN0aW9uKCBob2xkICkge1xyXG4gICAgICAgICAgICBpZiAoIGhvbGQgKSB7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkucmVhZHlXYWl0Kys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkucmVhZHkoIHRydWUgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEhhbmRsZSB3aGVuIHRoZSBET00gaXMgcmVhZHlcclxuICAgICAgICByZWFkeTogZnVuY3Rpb24oIHdhaXQgKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBBYm9ydCBpZiB0aGVyZSBhcmUgcGVuZGluZyBob2xkcyBvciB3ZSdyZSBhbHJlYWR5IHJlYWR5XHJcbiAgICAgICAgICAgIGlmICggd2FpdCA9PT0gdHJ1ZSA/IC0talF1ZXJ5LnJlYWR5V2FpdCA6IGpRdWVyeS5pc1JlYWR5ICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgYm9keSBleGlzdHMsIGF0IGxlYXN0LCBpbiBjYXNlIElFIGdldHMgYSBsaXR0bGUgb3ZlcnplYWxvdXMgKHRpY2tldCAjNTQ0MykuXHJcbiAgICAgICAgICAgIGlmICggIWRvY3VtZW50LmJvZHkgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dCggalF1ZXJ5LnJlYWR5ICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJlbWVtYmVyIHRoYXQgdGhlIERPTSBpcyByZWFkeVxyXG4gICAgICAgICAgICBqUXVlcnkuaXNSZWFkeSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBhIG5vcm1hbCBET00gUmVhZHkgZXZlbnQgZmlyZWQsIGRlY3JlbWVudCwgYW5kIHdhaXQgaWYgbmVlZCBiZVxyXG4gICAgICAgICAgICBpZiAoIHdhaXQgIT09IHRydWUgJiYgLS1qUXVlcnkucmVhZHlXYWl0ID4gMCApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSWYgdGhlcmUgYXJlIGZ1bmN0aW9ucyBib3VuZCwgdG8gZXhlY3V0ZVxyXG4gICAgICAgICAgICByZWFkeUxpc3QucmVzb2x2ZVdpdGgoIGRvY3VtZW50LCBbIGpRdWVyeSBdICk7XHJcblxyXG4gICAgICAgICAgICAvLyBUcmlnZ2VyIGFueSBib3VuZCByZWFkeSBldmVudHNcclxuICAgICAgICAgICAgaWYgKCBqUXVlcnkuZm4udHJpZ2dlckhhbmRsZXIgKSB7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkoIGRvY3VtZW50ICkudHJpZ2dlckhhbmRsZXIoIFwicmVhZHlcIiApO1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5KCBkb2N1bWVudCApLm9mZiggXCJyZWFkeVwiICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENsZWFuLXVwIG1ldGhvZCBmb3IgZG9tIHJlYWR5IGV2ZW50c1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBkZXRhY2goKSB7XHJcbiAgICAgICAgaWYgKCBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyICkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCBcIkRPTUNvbnRlbnRMb2FkZWRcIiwgY29tcGxldGVkLCBmYWxzZSApO1xyXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJsb2FkXCIsIGNvbXBsZXRlZCwgZmFsc2UgKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZGV0YWNoRXZlbnQoIFwib25yZWFkeXN0YXRlY2hhbmdlXCIsIGNvbXBsZXRlZCApO1xyXG4gICAgICAgICAgICB3aW5kb3cuZGV0YWNoRXZlbnQoIFwib25sb2FkXCIsIGNvbXBsZXRlZCApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSByZWFkeSBldmVudCBoYW5kbGVyIGFuZCBzZWxmIGNsZWFudXAgbWV0aG9kXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGNvbXBsZXRlZCgpIHtcclxuICAgICAgICAvLyByZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgaXMgZ29vZCBlbm91Z2ggZm9yIHVzIHRvIGNhbGwgdGhlIGRvbSByZWFkeSBpbiBvbGRJRVxyXG4gICAgICAgIGlmICggZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciB8fCBldmVudC50eXBlID09PSBcImxvYWRcIiB8fCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgKSB7XHJcbiAgICAgICAgICAgIGRldGFjaCgpO1xyXG4gICAgICAgICAgICBqUXVlcnkucmVhZHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgalF1ZXJ5LnJlYWR5LnByb21pc2UgPSBmdW5jdGlvbiggb2JqICkge1xyXG4gICAgICAgIGlmICggIXJlYWR5TGlzdCApIHtcclxuXHJcbiAgICAgICAgICAgIHJlYWR5TGlzdCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2F0Y2ggY2FzZXMgd2hlcmUgJChkb2N1bWVudCkucmVhZHkoKSBpcyBjYWxsZWQgYWZ0ZXIgdGhlIGJyb3dzZXIgZXZlbnQgaGFzIGFscmVhZHkgb2NjdXJyZWQuXHJcbiAgICAgICAgICAgIC8vIHdlIG9uY2UgdHJpZWQgdG8gdXNlIHJlYWR5U3RhdGUgXCJpbnRlcmFjdGl2ZVwiIGhlcmUsIGJ1dCBpdCBjYXVzZWQgaXNzdWVzIGxpa2UgdGhlIG9uZVxyXG4gICAgICAgICAgICAvLyBkaXNjb3ZlcmVkIGJ5IENocmlzUyBoZXJlOiBodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xMjI4MiNjb21tZW50OjE1XHJcbiAgICAgICAgICAgIGlmICggZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiICkge1xyXG4gICAgICAgICAgICAgICAgLy8gSGFuZGxlIGl0IGFzeW5jaHJvbm91c2x5IHRvIGFsbG93IHNjcmlwdHMgdGhlIG9wcG9ydHVuaXR5IHRvIGRlbGF5IHJlYWR5XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCBqUXVlcnkucmVhZHkgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdGFuZGFyZHMtYmFzZWQgYnJvd3NlcnMgc3VwcG9ydCBET01Db250ZW50TG9hZGVkXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBVc2UgdGhlIGhhbmR5IGV2ZW50IGNhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCBcIkRPTUNvbnRlbnRMb2FkZWRcIiwgY29tcGxldGVkLCBmYWxzZSApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEEgZmFsbGJhY2sgdG8gd2luZG93Lm9ubG9hZCwgdGhhdCB3aWxsIGFsd2F5cyB3b3JrXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggXCJsb2FkXCIsIGNvbXBsZXRlZCwgZmFsc2UgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBJRSBldmVudCBtb2RlbCBpcyB1c2VkXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFbnN1cmUgZmlyaW5nIGJlZm9yZSBvbmxvYWQsIG1heWJlIGxhdGUgYnV0IHNhZmUgYWxzbyBmb3IgaWZyYW1lc1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYXR0YWNoRXZlbnQoIFwib25yZWFkeXN0YXRlY2hhbmdlXCIsIGNvbXBsZXRlZCApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEEgZmFsbGJhY2sgdG8gd2luZG93Lm9ubG9hZCwgdGhhdCB3aWxsIGFsd2F5cyB3b3JrXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuYXR0YWNoRXZlbnQoIFwib25sb2FkXCIsIGNvbXBsZXRlZCApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIElFIGFuZCBub3QgYSBmcmFtZVxyXG4gICAgICAgICAgICAgICAgLy8gY29udGludWFsbHkgY2hlY2sgdG8gc2VlIGlmIHRoZSBkb2N1bWVudCBpcyByZWFkeVxyXG4gICAgICAgICAgICAgICAgdmFyIHRvcCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wID0gd2luZG93LmZyYW1lRWxlbWVudCA9PSBudWxsICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2goZSkge31cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIHRvcCAmJiB0b3AuZG9TY3JvbGwgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uIGRvU2Nyb2xsQ2hlY2soKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggIWpRdWVyeS5pc1JlYWR5ICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXNlIHRoZSB0cmljayBieSBEaWVnbyBQZXJpbmlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBodHRwOi8vamF2YXNjcmlwdC5ud2JveC5jb20vSUVDb250ZW50TG9hZGVkL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcC5kb1Njcm9sbChcImxlZnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dCggZG9TY3JvbGxDaGVjaywgNTAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZXRhY2ggYWxsIGRvbSByZWFkeSBldmVudHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFjaCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuZCBleGVjdXRlIGFueSB3YWl0aW5nIGZ1bmN0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LnJlYWR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZWFkeUxpc3QucHJvbWlzZSggb2JqICk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB2YXIgc3RydW5kZWZpbmVkID0gdHlwZW9mIHVuZGVmaW5lZDtcclxuXHJcblxyXG5cclxuLy8gU3VwcG9ydDogSUU8OVxyXG4vLyBJdGVyYXRpb24gb3ZlciBvYmplY3QncyBpbmhlcml0ZWQgcHJvcGVydGllcyBiZWZvcmUgaXRzIG93blxyXG4gICAgdmFyIGk7XHJcbiAgICBmb3IgKCBpIGluIGpRdWVyeSggc3VwcG9ydCApICkge1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgc3VwcG9ydC5vd25MYXN0ID0gaSAhPT0gXCIwXCI7XHJcblxyXG4vLyBOb3RlOiBtb3N0IHN1cHBvcnQgdGVzdHMgYXJlIGRlZmluZWQgaW4gdGhlaXIgcmVzcGVjdGl2ZSBtb2R1bGVzLlxyXG4vLyBmYWxzZSB1bnRpbCB0aGUgdGVzdCBpcyBydW5cclxuICAgIHN1cHBvcnQuaW5saW5lQmxvY2tOZWVkc0xheW91dCA9IGZhbHNlO1xyXG5cclxuLy8gRXhlY3V0ZSBBU0FQIGluIGNhc2Ugd2UgbmVlZCB0byBzZXQgYm9keS5zdHlsZS56b29tXHJcbiAgICBqUXVlcnkoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gTWluaWZpZWQ6IHZhciBhLGIsYyxkXHJcbiAgICAgICAgdmFyIHZhbCwgZGl2LCBib2R5LCBjb250YWluZXI7XHJcblxyXG4gICAgICAgIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCJib2R5XCIgKVsgMCBdO1xyXG4gICAgICAgIGlmICggIWJvZHkgfHwgIWJvZHkuc3R5bGUgKSB7XHJcbiAgICAgICAgICAgIC8vIFJldHVybiBmb3IgZnJhbWVzZXQgZG9jcyB0aGF0IGRvbid0IGhhdmUgYSBib2R5XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNldHVwXHJcbiAgICAgICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xyXG4gICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKTtcclxuICAgICAgICBjb250YWluZXIuc3R5bGUuY3NzVGV4dCA9IFwicG9zaXRpb246YWJzb2x1dGU7Ym9yZGVyOjA7d2lkdGg6MDtoZWlnaHQ6MDt0b3A6MDtsZWZ0Oi05OTk5cHhcIjtcclxuICAgICAgICBib2R5LmFwcGVuZENoaWxkKCBjb250YWluZXIgKS5hcHBlbmRDaGlsZCggZGl2ICk7XHJcblxyXG4gICAgICAgIGlmICggdHlwZW9mIGRpdi5zdHlsZS56b29tICE9PSBzdHJ1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFPDhcclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgbmF0aXZlbHkgYmxvY2stbGV2ZWwgZWxlbWVudHMgYWN0IGxpa2UgaW5saW5lLWJsb2NrXHJcbiAgICAgICAgICAgIC8vIGVsZW1lbnRzIHdoZW4gc2V0dGluZyB0aGVpciBkaXNwbGF5IHRvICdpbmxpbmUnIGFuZCBnaXZpbmdcclxuICAgICAgICAgICAgLy8gdGhlbSBsYXlvdXRcclxuICAgICAgICAgICAgZGl2LnN0eWxlLmNzc1RleHQgPSBcImRpc3BsYXk6aW5saW5lO21hcmdpbjowO2JvcmRlcjowO3BhZGRpbmc6MXB4O3dpZHRoOjFweDt6b29tOjFcIjtcclxuXHJcbiAgICAgICAgICAgIHN1cHBvcnQuaW5saW5lQmxvY2tOZWVkc0xheW91dCA9IHZhbCA9IGRpdi5vZmZzZXRXaWR0aCA9PT0gMztcclxuICAgICAgICAgICAgaWYgKCB2YWwgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IElFIDYgZnJvbSBhZmZlY3RpbmcgbGF5b3V0IGZvciBwb3NpdGlvbmVkIGVsZW1lbnRzICMxMTA0OFxyXG4gICAgICAgICAgICAgICAgLy8gUHJldmVudCBJRSBmcm9tIHNocmlua2luZyB0aGUgYm9keSBpbiBJRSA3IG1vZGUgIzEyODY5XHJcbiAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTw4XHJcbiAgICAgICAgICAgICAgICBib2R5LnN0eWxlLnpvb20gPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBib2R5LnJlbW92ZUNoaWxkKCBjb250YWluZXIgKTtcclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG5cclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xyXG5cclxuICAgICAgICAvLyBFeGVjdXRlIHRoZSB0ZXN0IG9ubHkgaWYgbm90IGFscmVhZHkgZXhlY3V0ZWQgaW4gYW5vdGhlciBtb2R1bGUuXHJcbiAgICAgICAgaWYgKHN1cHBvcnQuZGVsZXRlRXhwYW5kbyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFPDlcclxuICAgICAgICAgICAgc3VwcG9ydC5kZWxldGVFeHBhbmRvID0gdHJ1ZTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBkaXYudGVzdDtcclxuICAgICAgICAgICAgfSBjYXRjaCggZSApIHtcclxuICAgICAgICAgICAgICAgIHN1cHBvcnQuZGVsZXRlRXhwYW5kbyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBOdWxsIGVsZW1lbnRzIHRvIGF2b2lkIGxlYWtzIGluIElFLlxyXG4gICAgICAgIGRpdiA9IG51bGw7XHJcbiAgICB9KSgpO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGVybWluZXMgd2hldGhlciBhbiBvYmplY3QgY2FuIGhhdmUgZGF0YVxyXG4gICAgICovXHJcbiAgICBqUXVlcnkuYWNjZXB0RGF0YSA9IGZ1bmN0aW9uKCBlbGVtICkge1xyXG4gICAgICAgIHZhciBub0RhdGEgPSBqUXVlcnkubm9EYXRhWyAoZWxlbS5ub2RlTmFtZSArIFwiIFwiKS50b0xvd2VyQ2FzZSgpIF0sXHJcbiAgICAgICAgICAgIG5vZGVUeXBlID0gK2VsZW0ubm9kZVR5cGUgfHwgMTtcclxuXHJcbiAgICAgICAgLy8gRG8gbm90IHNldCBkYXRhIG9uIG5vbi1lbGVtZW50IERPTSBub2RlcyBiZWNhdXNlIGl0IHdpbGwgbm90IGJlIGNsZWFyZWQgKCM4MzM1KS5cclxuICAgICAgICByZXR1cm4gbm9kZVR5cGUgIT09IDEgJiYgbm9kZVR5cGUgIT09IDkgP1xyXG4gICAgICAgICAgICBmYWxzZSA6XHJcblxyXG4gICAgICAgICAgICAvLyBOb2RlcyBhY2NlcHQgZGF0YSB1bmxlc3Mgb3RoZXJ3aXNlIHNwZWNpZmllZDsgcmVqZWN0aW9uIGNhbiBiZSBjb25kaXRpb25hbFxyXG4gICAgICAgICFub0RhdGEgfHwgbm9EYXRhICE9PSB0cnVlICYmIGVsZW0uZ2V0QXR0cmlidXRlKFwiY2xhc3NpZFwiKSA9PT0gbm9EYXRhO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdmFyIHJicmFjZSA9IC9eKD86XFx7W1xcd1xcV10qXFx9fFxcW1tcXHdcXFddKlxcXSkkLyxcclxuICAgICAgICBybXVsdGlEYXNoID0gLyhbQS1aXSkvZztcclxuXHJcbiAgICBmdW5jdGlvbiBkYXRhQXR0ciggZWxlbSwga2V5LCBkYXRhICkge1xyXG4gICAgICAgIC8vIElmIG5vdGhpbmcgd2FzIGZvdW5kIGludGVybmFsbHksIHRyeSB0byBmZXRjaCBhbnlcclxuICAgICAgICAvLyBkYXRhIGZyb20gdGhlIEhUTUw1IGRhdGEtKiBhdHRyaWJ1dGVcclxuICAgICAgICBpZiAoIGRhdGEgPT09IHVuZGVmaW5lZCAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xyXG5cclxuICAgICAgICAgICAgdmFyIG5hbWUgPSBcImRhdGEtXCIgKyBrZXkucmVwbGFjZSggcm11bHRpRGFzaCwgXCItJDFcIiApLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgICBkYXRhID0gZWxlbS5nZXRBdHRyaWJ1dGUoIG5hbWUgKTtcclxuXHJcbiAgICAgICAgICAgIGlmICggdHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhID09PSBcInRydWVcIiA/IHRydWUgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID09PSBcImZhbHNlXCIgPyBmYWxzZSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID09PSBcIm51bGxcIiA/IG51bGwgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgY29udmVydCB0byBhIG51bWJlciBpZiBpdCBkb2Vzbid0IGNoYW5nZSB0aGUgc3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgK2RhdGEgKyBcIlwiID09PSBkYXRhID8gK2RhdGEgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYnJhY2UudGVzdCggZGF0YSApID8galF1ZXJ5LnBhcnNlSlNPTiggZGF0YSApIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoKCBlICkge31cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBNYWtlIHN1cmUgd2Ugc2V0IHRoZSBkYXRhIHNvIGl0IGlzbid0IGNoYW5nZWQgbGF0ZXJcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5kYXRhKCBlbGVtLCBrZXksIGRhdGEgKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuXHJcbi8vIGNoZWNrcyBhIGNhY2hlIG9iamVjdCBmb3IgZW1wdGluZXNzXHJcbiAgICBmdW5jdGlvbiBpc0VtcHR5RGF0YU9iamVjdCggb2JqICkge1xyXG4gICAgICAgIHZhciBuYW1lO1xyXG4gICAgICAgIGZvciAoIG5hbWUgaW4gb2JqICkge1xyXG5cclxuICAgICAgICAgICAgLy8gaWYgdGhlIHB1YmxpYyBkYXRhIG9iamVjdCBpcyBlbXB0eSwgdGhlIHByaXZhdGUgaXMgc3RpbGwgZW1wdHlcclxuICAgICAgICAgICAgaWYgKCBuYW1lID09PSBcImRhdGFcIiAmJiBqUXVlcnkuaXNFbXB0eU9iamVjdCggb2JqW25hbWVdICkgKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIG5hbWUgIT09IFwidG9KU09OXCIgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGludGVybmFsRGF0YSggZWxlbSwgbmFtZSwgZGF0YSwgcHZ0IC8qIEludGVybmFsIFVzZSBPbmx5ICovICkge1xyXG4gICAgICAgIGlmICggIWpRdWVyeS5hY2NlcHREYXRhKCBlbGVtICkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciByZXQsIHRoaXNDYWNoZSxcclxuICAgICAgICAgICAgaW50ZXJuYWxLZXkgPSBqUXVlcnkuZXhwYW5kbyxcclxuXHJcbiAgICAgICAgLy8gV2UgaGF2ZSB0byBoYW5kbGUgRE9NIG5vZGVzIGFuZCBKUyBvYmplY3RzIGRpZmZlcmVudGx5IGJlY2F1c2UgSUU2LTdcclxuICAgICAgICAvLyBjYW4ndCBHQyBvYmplY3QgcmVmZXJlbmNlcyBwcm9wZXJseSBhY3Jvc3MgdGhlIERPTS1KUyBib3VuZGFyeVxyXG4gICAgICAgICAgICBpc05vZGUgPSBlbGVtLm5vZGVUeXBlLFxyXG5cclxuICAgICAgICAvLyBPbmx5IERPTSBub2RlcyBuZWVkIHRoZSBnbG9iYWwgalF1ZXJ5IGNhY2hlOyBKUyBvYmplY3QgZGF0YSBpc1xyXG4gICAgICAgIC8vIGF0dGFjaGVkIGRpcmVjdGx5IHRvIHRoZSBvYmplY3Qgc28gR0MgY2FuIG9jY3VyIGF1dG9tYXRpY2FsbHlcclxuICAgICAgICAgICAgY2FjaGUgPSBpc05vZGUgPyBqUXVlcnkuY2FjaGUgOiBlbGVtLFxyXG5cclxuICAgICAgICAvLyBPbmx5IGRlZmluaW5nIGFuIElEIGZvciBKUyBvYmplY3RzIGlmIGl0cyBjYWNoZSBhbHJlYWR5IGV4aXN0cyBhbGxvd3NcclxuICAgICAgICAvLyB0aGUgY29kZSB0byBzaG9ydGN1dCBvbiB0aGUgc2FtZSBwYXRoIGFzIGEgRE9NIG5vZGUgd2l0aCBubyBjYWNoZVxyXG4gICAgICAgICAgICBpZCA9IGlzTm9kZSA/IGVsZW1bIGludGVybmFsS2V5IF0gOiBlbGVtWyBpbnRlcm5hbEtleSBdICYmIGludGVybmFsS2V5O1xyXG5cclxuICAgICAgICAvLyBBdm9pZCBkb2luZyBhbnkgbW9yZSB3b3JrIHRoYW4gd2UgbmVlZCB0byB3aGVuIHRyeWluZyB0byBnZXQgZGF0YSBvbiBhblxyXG4gICAgICAgIC8vIG9iamVjdCB0aGF0IGhhcyBubyBkYXRhIGF0IGFsbFxyXG4gICAgICAgIGlmICggKCFpZCB8fCAhY2FjaGVbaWRdIHx8ICghcHZ0ICYmICFjYWNoZVtpZF0uZGF0YSkpICYmIGRhdGEgPT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgbmFtZSA9PT0gXCJzdHJpbmdcIiApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCAhaWQgKSB7XHJcbiAgICAgICAgICAgIC8vIE9ubHkgRE9NIG5vZGVzIG5lZWQgYSBuZXcgdW5pcXVlIElEIGZvciBlYWNoIGVsZW1lbnQgc2luY2UgdGhlaXIgZGF0YVxyXG4gICAgICAgICAgICAvLyBlbmRzIHVwIGluIHRoZSBnbG9iYWwgY2FjaGVcclxuICAgICAgICAgICAgaWYgKCBpc05vZGUgKSB7XHJcbiAgICAgICAgICAgICAgICBpZCA9IGVsZW1bIGludGVybmFsS2V5IF0gPSBkZWxldGVkSWRzLnBvcCgpIHx8IGpRdWVyeS5ndWlkKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZCA9IGludGVybmFsS2V5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoICFjYWNoZVsgaWQgXSApIHtcclxuICAgICAgICAgICAgLy8gQXZvaWQgZXhwb3NpbmcgalF1ZXJ5IG1ldGFkYXRhIG9uIHBsYWluIEpTIG9iamVjdHMgd2hlbiB0aGUgb2JqZWN0XHJcbiAgICAgICAgICAgIC8vIGlzIHNlcmlhbGl6ZWQgdXNpbmcgSlNPTi5zdHJpbmdpZnlcclxuICAgICAgICAgICAgY2FjaGVbIGlkIF0gPSBpc05vZGUgPyB7fSA6IHsgdG9KU09OOiBqUXVlcnkubm9vcCB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQW4gb2JqZWN0IGNhbiBiZSBwYXNzZWQgdG8galF1ZXJ5LmRhdGEgaW5zdGVhZCBvZiBhIGtleS92YWx1ZSBwYWlyOyB0aGlzIGdldHNcclxuICAgICAgICAvLyBzaGFsbG93IGNvcGllZCBvdmVyIG9udG8gdGhlIGV4aXN0aW5nIGNhY2hlXHJcbiAgICAgICAgaWYgKCB0eXBlb2YgbmFtZSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbmFtZSA9PT0gXCJmdW5jdGlvblwiICkge1xyXG4gICAgICAgICAgICBpZiAoIHB2dCApIHtcclxuICAgICAgICAgICAgICAgIGNhY2hlWyBpZCBdID0galF1ZXJ5LmV4dGVuZCggY2FjaGVbIGlkIF0sIG5hbWUgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNhY2hlWyBpZCBdLmRhdGEgPSBqUXVlcnkuZXh0ZW5kKCBjYWNoZVsgaWQgXS5kYXRhLCBuYW1lICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXNDYWNoZSA9IGNhY2hlWyBpZCBdO1xyXG5cclxuICAgICAgICAvLyBqUXVlcnkgZGF0YSgpIGlzIHN0b3JlZCBpbiBhIHNlcGFyYXRlIG9iamVjdCBpbnNpZGUgdGhlIG9iamVjdCdzIGludGVybmFsIGRhdGFcclxuICAgICAgICAvLyBjYWNoZSBpbiBvcmRlciB0byBhdm9pZCBrZXkgY29sbGlzaW9ucyBiZXR3ZWVuIGludGVybmFsIGRhdGEgYW5kIHVzZXItZGVmaW5lZFxyXG4gICAgICAgIC8vIGRhdGEuXHJcbiAgICAgICAgaWYgKCAhcHZ0ICkge1xyXG4gICAgICAgICAgICBpZiAoICF0aGlzQ2FjaGUuZGF0YSApIHtcclxuICAgICAgICAgICAgICAgIHRoaXNDYWNoZS5kYXRhID0ge307XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXNDYWNoZSA9IHRoaXNDYWNoZS5kYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCBkYXRhICE9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgIHRoaXNDYWNoZVsgalF1ZXJ5LmNhbWVsQ2FzZSggbmFtZSApIF0gPSBkYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIGJvdGggY29udmVydGVkLXRvLWNhbWVsIGFuZCBub24tY29udmVydGVkIGRhdGEgcHJvcGVydHkgbmFtZXNcclxuICAgICAgICAvLyBJZiBhIGRhdGEgcHJvcGVydHkgd2FzIHNwZWNpZmllZFxyXG4gICAgICAgIGlmICggdHlwZW9mIG5hbWUgPT09IFwic3RyaW5nXCIgKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBGaXJzdCBUcnkgdG8gZmluZCBhcy1pcyBwcm9wZXJ0eSBkYXRhXHJcbiAgICAgICAgICAgIHJldCA9IHRoaXNDYWNoZVsgbmFtZSBdO1xyXG5cclxuICAgICAgICAgICAgLy8gVGVzdCBmb3IgbnVsbHx1bmRlZmluZWQgcHJvcGVydHkgZGF0YVxyXG4gICAgICAgICAgICBpZiAoIHJldCA9PSBudWxsICkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRyeSB0byBmaW5kIHRoZSBjYW1lbENhc2VkIHByb3BlcnR5XHJcbiAgICAgICAgICAgICAgICByZXQgPSB0aGlzQ2FjaGVbIGpRdWVyeS5jYW1lbENhc2UoIG5hbWUgKSBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0ID0gdGhpc0NhY2hlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbnRlcm5hbFJlbW92ZURhdGEoIGVsZW0sIG5hbWUsIHB2dCApIHtcclxuICAgICAgICBpZiAoICFqUXVlcnkuYWNjZXB0RGF0YSggZWxlbSApICkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgdGhpc0NhY2hlLCBpLFxyXG4gICAgICAgICAgICBpc05vZGUgPSBlbGVtLm5vZGVUeXBlLFxyXG5cclxuICAgICAgICAvLyBTZWUgalF1ZXJ5LmRhdGEgZm9yIG1vcmUgaW5mb3JtYXRpb25cclxuICAgICAgICAgICAgY2FjaGUgPSBpc05vZGUgPyBqUXVlcnkuY2FjaGUgOiBlbGVtLFxyXG4gICAgICAgICAgICBpZCA9IGlzTm9kZSA/IGVsZW1bIGpRdWVyeS5leHBhbmRvIF0gOiBqUXVlcnkuZXhwYW5kbztcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgYWxyZWFkeSBubyBjYWNoZSBlbnRyeSBmb3IgdGhpcyBvYmplY3QsIHRoZXJlIGlzIG5vXHJcbiAgICAgICAgLy8gcHVycG9zZSBpbiBjb250aW51aW5nXHJcbiAgICAgICAgaWYgKCAhY2FjaGVbIGlkIF0gKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggbmFtZSApIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXNDYWNoZSA9IHB2dCA/IGNhY2hlWyBpZCBdIDogY2FjaGVbIGlkIF0uZGF0YTtcclxuXHJcbiAgICAgICAgICAgIGlmICggdGhpc0NhY2hlICkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQgYXJyYXkgb3Igc3BhY2Ugc2VwYXJhdGVkIHN0cmluZyBuYW1lcyBmb3IgZGF0YSBrZXlzXHJcbiAgICAgICAgICAgICAgICBpZiAoICFqUXVlcnkuaXNBcnJheSggbmFtZSApICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyB0cnkgdGhlIHN0cmluZyBhcyBhIGtleSBiZWZvcmUgYW55IG1hbmlwdWxhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggbmFtZSBpbiB0aGlzQ2FjaGUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgPSBbIG5hbWUgXTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3BsaXQgdGhlIGNhbWVsIGNhc2VkIHZlcnNpb24gYnkgc3BhY2VzIHVubGVzcyBhIGtleSB3aXRoIHRoZSBzcGFjZXMgZXhpc3RzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgPSBqUXVlcnkuY2FtZWxDYXNlKCBuYW1lICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbmFtZSBpbiB0aGlzQ2FjaGUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lID0gWyBuYW1lIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lID0gbmFtZS5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIFwibmFtZVwiIGlzIGFuIGFycmF5IG9mIGtleXMuLi5cclxuICAgICAgICAgICAgICAgICAgICAvLyBXaGVuIGRhdGEgaXMgaW5pdGlhbGx5IGNyZWF0ZWQsIHZpYSAoXCJrZXlcIiwgXCJ2YWxcIikgc2lnbmF0dXJlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGtleXMgd2lsbCBiZSBjb252ZXJ0ZWQgdG8gY2FtZWxDYXNlLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNpbmNlIHRoZXJlIGlzIG5vIHdheSB0byB0ZWxsIF9ob3dfIGEga2V5IHdhcyBhZGRlZCwgcmVtb3ZlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYm90aCBwbGFpbiBrZXkgYW5kIGNhbWVsQ2FzZSBrZXkuICMxMjc4NlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgd2lsbCBvbmx5IHBlbmFsaXplIHRoZSBhcnJheSBhcmd1bWVudCBwYXRoLlxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSBuYW1lLmNvbmNhdCggalF1ZXJ5Lm1hcCggbmFtZSwgalF1ZXJ5LmNhbWVsQ2FzZSApICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaSA9IG5hbWUubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKCBpLS0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXNDYWNoZVsgbmFtZVtpXSBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIG5vIGRhdGEgbGVmdCBpbiB0aGUgY2FjaGUsIHdlIHdhbnQgdG8gY29udGludWVcclxuICAgICAgICAgICAgICAgIC8vIGFuZCBsZXQgdGhlIGNhY2hlIG9iamVjdCBpdHNlbGYgZ2V0IGRlc3Ryb3llZFxyXG4gICAgICAgICAgICAgICAgaWYgKCBwdnQgPyAhaXNFbXB0eURhdGFPYmplY3QodGhpc0NhY2hlKSA6ICFqUXVlcnkuaXNFbXB0eU9iamVjdCh0aGlzQ2FjaGUpICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2VlIGpRdWVyeS5kYXRhIGZvciBtb3JlIGluZm9ybWF0aW9uXHJcbiAgICAgICAgaWYgKCAhcHZ0ICkge1xyXG4gICAgICAgICAgICBkZWxldGUgY2FjaGVbIGlkIF0uZGF0YTtcclxuXHJcbiAgICAgICAgICAgIC8vIERvbid0IGRlc3Ryb3kgdGhlIHBhcmVudCBjYWNoZSB1bmxlc3MgdGhlIGludGVybmFsIGRhdGEgb2JqZWN0XHJcbiAgICAgICAgICAgIC8vIGhhZCBiZWVuIHRoZSBvbmx5IHRoaW5nIGxlZnQgaW4gaXRcclxuICAgICAgICAgICAgaWYgKCAhaXNFbXB0eURhdGFPYmplY3QoIGNhY2hlWyBpZCBdICkgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIERlc3Ryb3kgdGhlIGNhY2hlXHJcbiAgICAgICAgaWYgKCBpc05vZGUgKSB7XHJcbiAgICAgICAgICAgIGpRdWVyeS5jbGVhbkRhdGEoIFsgZWxlbSBdLCB0cnVlICk7XHJcblxyXG4gICAgICAgICAgICAvLyBVc2UgZGVsZXRlIHdoZW4gc3VwcG9ydGVkIGZvciBleHBhbmRvcyBvciBgY2FjaGVgIGlzIG5vdCBhIHdpbmRvdyBwZXIgaXNXaW5kb3cgKCMxMDA4MClcclxuICAgICAgICAgICAgLyoganNoaW50IGVxZXFlcTogZmFsc2UgKi9cclxuICAgICAgICB9IGVsc2UgaWYgKCBzdXBwb3J0LmRlbGV0ZUV4cGFuZG8gfHwgY2FjaGUgIT0gY2FjaGUud2luZG93ICkge1xyXG4gICAgICAgICAgICAvKiBqc2hpbnQgZXFlcWVxOiB0cnVlICovXHJcbiAgICAgICAgICAgIGRlbGV0ZSBjYWNoZVsgaWQgXTtcclxuXHJcbiAgICAgICAgICAgIC8vIFdoZW4gYWxsIGVsc2UgZmFpbHMsIG51bGxcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYWNoZVsgaWQgXSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGpRdWVyeS5leHRlbmQoe1xyXG4gICAgICAgIGNhY2hlOiB7fSxcclxuXHJcbiAgICAgICAgLy8gVGhlIGZvbGxvd2luZyBlbGVtZW50cyAoc3BhY2Utc3VmZml4ZWQgdG8gYXZvaWQgT2JqZWN0LnByb3RvdHlwZSBjb2xsaXNpb25zKVxyXG4gICAgICAgIC8vIHRocm93IHVuY2F0Y2hhYmxlIGV4Y2VwdGlvbnMgaWYgeW91IGF0dGVtcHQgdG8gc2V0IGV4cGFuZG8gcHJvcGVydGllc1xyXG4gICAgICAgIG5vRGF0YToge1xyXG4gICAgICAgICAgICBcImFwcGxldCBcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJlbWJlZCBcIjogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gLi4uYnV0IEZsYXNoIG9iamVjdHMgKHdoaWNoIGhhdmUgdGhpcyBjbGFzc2lkKSAqY2FuKiBoYW5kbGUgZXhwYW5kb3NcclxuICAgICAgICAgICAgXCJvYmplY3QgXCI6IFwiY2xzaWQ6RDI3Q0RCNkUtQUU2RC0xMWNmLTk2QjgtNDQ0NTUzNTQwMDAwXCJcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoYXNEYXRhOiBmdW5jdGlvbiggZWxlbSApIHtcclxuICAgICAgICAgICAgZWxlbSA9IGVsZW0ubm9kZVR5cGUgPyBqUXVlcnkuY2FjaGVbIGVsZW1balF1ZXJ5LmV4cGFuZG9dIF0gOiBlbGVtWyBqUXVlcnkuZXhwYW5kbyBdO1xyXG4gICAgICAgICAgICByZXR1cm4gISFlbGVtICYmICFpc0VtcHR5RGF0YU9iamVjdCggZWxlbSApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGE6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBkYXRhICkge1xyXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJuYWxEYXRhKCBlbGVtLCBuYW1lLCBkYXRhICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVtb3ZlRGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnRlcm5hbFJlbW92ZURhdGEoIGVsZW0sIG5hbWUgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBGb3IgaW50ZXJuYWwgdXNlIG9ubHkuXHJcbiAgICAgICAgX2RhdGE6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBkYXRhICkge1xyXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJuYWxEYXRhKCBlbGVtLCBuYW1lLCBkYXRhLCB0cnVlICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX3JlbW92ZURhdGE6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xyXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJuYWxSZW1vdmVEYXRhKCBlbGVtLCBuYW1lLCB0cnVlICk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgalF1ZXJ5LmZuLmV4dGVuZCh7XHJcbiAgICAgICAgZGF0YTogZnVuY3Rpb24oIGtleSwgdmFsdWUgKSB7XHJcbiAgICAgICAgICAgIHZhciBpLCBuYW1lLCBkYXRhLFxyXG4gICAgICAgICAgICAgICAgZWxlbSA9IHRoaXNbMF0sXHJcbiAgICAgICAgICAgICAgICBhdHRycyA9IGVsZW0gJiYgZWxlbS5hdHRyaWJ1dGVzO1xyXG5cclxuICAgICAgICAgICAgLy8gU3BlY2lhbCBleHBlY3Rpb25zIG9mIC5kYXRhIGJhc2ljYWxseSB0aHdhcnQgalF1ZXJ5LmFjY2VzcyxcclxuICAgICAgICAgICAgLy8gc28gaW1wbGVtZW50IHRoZSByZWxldmFudCBiZWhhdmlvciBvdXJzZWx2ZXNcclxuXHJcbiAgICAgICAgICAgIC8vIEdldHMgYWxsIHZhbHVlc1xyXG4gICAgICAgICAgICBpZiAoIGtleSA9PT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLmxlbmd0aCApIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0galF1ZXJ5LmRhdGEoIGVsZW0gKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICYmICFqUXVlcnkuX2RhdGEoIGVsZW0sIFwicGFyc2VkQXR0cnNcIiApICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpID0gYXR0cnMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIGktLSApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTExK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGF0dHJzIGVsZW1lbnRzIGNhbiBiZSBudWxsICgjMTQ4OTQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGF0dHJzWyBpIF0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA9IGF0dHJzWyBpIF0ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG5hbWUuaW5kZXhPZiggXCJkYXRhLVwiICkgPT09IDAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgPSBqUXVlcnkuY2FtZWxDYXNlKCBuYW1lLnNsaWNlKDUpICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFBdHRyKCBlbGVtLCBuYW1lLCBkYXRhWyBuYW1lIF0gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5Ll9kYXRhKCBlbGVtLCBcInBhcnNlZEF0dHJzXCIsIHRydWUgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFNldHMgbXVsdGlwbGUgdmFsdWVzXHJcbiAgICAgICAgICAgIGlmICggdHlwZW9mIGtleSA9PT0gXCJvYmplY3RcIiApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmRhdGEoIHRoaXMsIGtleSApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID4gMSA/XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2V0cyBvbmUgdmFsdWVcclxuICAgICAgICAgICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZGF0YSggdGhpcywga2V5LCB2YWx1ZSApO1xyXG4gICAgICAgICAgICAgICAgfSkgOlxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEdldHMgb25lIHZhbHVlXHJcbiAgICAgICAgICAgICAgICAvLyBUcnkgdG8gZmV0Y2ggYW55IGludGVybmFsbHkgc3RvcmVkIGRhdGEgZmlyc3RcclxuICAgICAgICAgICAgICAgIGVsZW0gPyBkYXRhQXR0ciggZWxlbSwga2V5LCBqUXVlcnkuZGF0YSggZWxlbSwga2V5ICkgKSA6IHVuZGVmaW5lZDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW1vdmVEYXRhOiBmdW5jdGlvbigga2V5ICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5LnJlbW92ZURhdGEoIHRoaXMsIGtleSApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgalF1ZXJ5LmV4dGVuZCh7XHJcbiAgICAgICAgcXVldWU6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlLCBkYXRhICkge1xyXG4gICAgICAgICAgICB2YXIgcXVldWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoIGVsZW0gKSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gKCB0eXBlIHx8IFwiZnhcIiApICsgXCJxdWV1ZVwiO1xyXG4gICAgICAgICAgICAgICAgcXVldWUgPSBqUXVlcnkuX2RhdGEoIGVsZW0sIHR5cGUgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTcGVlZCB1cCBkZXF1ZXVlIGJ5IGdldHRpbmcgb3V0IHF1aWNrbHkgaWYgdGhpcyBpcyBqdXN0IGEgbG9va3VwXHJcbiAgICAgICAgICAgICAgICBpZiAoIGRhdGEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhcXVldWUgfHwgalF1ZXJ5LmlzQXJyYXkoZGF0YSkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXVlID0galF1ZXJ5Ll9kYXRhKCBlbGVtLCB0eXBlLCBqUXVlcnkubWFrZUFycmF5KGRhdGEpICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUucHVzaCggZGF0YSApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBxdWV1ZSB8fCBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRlcXVldWU6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlICkge1xyXG4gICAgICAgICAgICB0eXBlID0gdHlwZSB8fCBcImZ4XCI7XHJcblxyXG4gICAgICAgICAgICB2YXIgcXVldWUgPSBqUXVlcnkucXVldWUoIGVsZW0sIHR5cGUgKSxcclxuICAgICAgICAgICAgICAgIHN0YXJ0TGVuZ3RoID0gcXVldWUubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgZm4gPSBxdWV1ZS5zaGlmdCgpLFxyXG4gICAgICAgICAgICAgICAgaG9va3MgPSBqUXVlcnkuX3F1ZXVlSG9va3MoIGVsZW0sIHR5cGUgKSxcclxuICAgICAgICAgICAgICAgIG5leHQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZGVxdWV1ZSggZWxlbSwgdHlwZSApO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBmeCBxdWV1ZSBpcyBkZXF1ZXVlZCwgYWx3YXlzIHJlbW92ZSB0aGUgcHJvZ3Jlc3Mgc2VudGluZWxcclxuICAgICAgICAgICAgaWYgKCBmbiA9PT0gXCJpbnByb2dyZXNzXCIgKSB7XHJcbiAgICAgICAgICAgICAgICBmbiA9IHF1ZXVlLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICBzdGFydExlbmd0aC0tO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIGZuICkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFkZCBhIHByb2dyZXNzIHNlbnRpbmVsIHRvIHByZXZlbnQgdGhlIGZ4IHF1ZXVlIGZyb20gYmVpbmdcclxuICAgICAgICAgICAgICAgIC8vIGF1dG9tYXRpY2FsbHkgZGVxdWV1ZWRcclxuICAgICAgICAgICAgICAgIGlmICggdHlwZSA9PT0gXCJmeFwiICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLnVuc2hpZnQoIFwiaW5wcm9ncmVzc1wiICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY2xlYXIgdXAgdGhlIGxhc3QgcXVldWUgc3RvcCBmdW5jdGlvblxyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGhvb2tzLnN0b3A7XHJcbiAgICAgICAgICAgICAgICBmbi5jYWxsKCBlbGVtLCBuZXh0LCBob29rcyApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoICFzdGFydExlbmd0aCAmJiBob29rcyApIHtcclxuICAgICAgICAgICAgICAgIGhvb2tzLmVtcHR5LmZpcmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIG5vdCBpbnRlbmRlZCBmb3IgcHVibGljIGNvbnN1bXB0aW9uIC0gZ2VuZXJhdGVzIGEgcXVldWVIb29rcyBvYmplY3QsIG9yIHJldHVybnMgdGhlIGN1cnJlbnQgb25lXHJcbiAgICAgICAgX3F1ZXVlSG9va3M6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlICkge1xyXG4gICAgICAgICAgICB2YXIga2V5ID0gdHlwZSArIFwicXVldWVIb29rc1wiO1xyXG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5Ll9kYXRhKCBlbGVtLCBrZXkgKSB8fCBqUXVlcnkuX2RhdGEoIGVsZW0sIGtleSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5OiBqUXVlcnkuQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIikuYWRkKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuX3JlbW92ZURhdGEoIGVsZW0sIHR5cGUgKyBcInF1ZXVlXCIgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5Ll9yZW1vdmVEYXRhKCBlbGVtLCBrZXkgKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgalF1ZXJ5LmZuLmV4dGVuZCh7XHJcbiAgICAgICAgcXVldWU6IGZ1bmN0aW9uKCB0eXBlLCBkYXRhICkge1xyXG4gICAgICAgICAgICB2YXIgc2V0dGVyID0gMjtcclxuXHJcbiAgICAgICAgICAgIGlmICggdHlwZW9mIHR5cGUgIT09IFwic3RyaW5nXCIgKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gdHlwZTtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSBcImZ4XCI7XHJcbiAgICAgICAgICAgICAgICBzZXR0ZXItLTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCBhcmd1bWVudHMubGVuZ3RoIDwgc2V0dGVyICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5xdWV1ZSggdGhpc1swXSwgdHlwZSApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YSA9PT0gdW5kZWZpbmVkID9cclxuICAgICAgICAgICAgICAgIHRoaXMgOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBxdWV1ZSA9IGpRdWVyeS5xdWV1ZSggdGhpcywgdHlwZSwgZGF0YSApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBlbnN1cmUgYSBob29rcyBmb3IgdGhpcyBxdWV1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS5fcXVldWVIb29rcyggdGhpcywgdHlwZSApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIHR5cGUgPT09IFwiZnhcIiAmJiBxdWV1ZVswXSAhPT0gXCJpbnByb2dyZXNzXCIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5kZXF1ZXVlKCB0aGlzLCB0eXBlICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXF1ZXVlOiBmdW5jdGlvbiggdHlwZSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5kZXF1ZXVlKCB0aGlzLCB0eXBlICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xlYXJRdWV1ZTogZnVuY3Rpb24oIHR5cGUgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnF1ZXVlKCB0eXBlIHx8IFwiZnhcIiwgW10gKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIEdldCBhIHByb21pc2UgcmVzb2x2ZWQgd2hlbiBxdWV1ZXMgb2YgYSBjZXJ0YWluIHR5cGVcclxuICAgICAgICAvLyBhcmUgZW1wdGllZCAoZnggaXMgdGhlIHR5cGUgYnkgZGVmYXVsdClcclxuICAgICAgICBwcm9taXNlOiBmdW5jdGlvbiggdHlwZSwgb2JqICkge1xyXG4gICAgICAgICAgICB2YXIgdG1wLFxyXG4gICAgICAgICAgICAgICAgY291bnQgPSAxLFxyXG4gICAgICAgICAgICAgICAgZGVmZXIgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIGkgPSB0aGlzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIHJlc29sdmUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoICEoIC0tY291bnQgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZVdpdGgoIGVsZW1lbnRzLCBbIGVsZW1lbnRzIF0gKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgdHlwZSAhPT0gXCJzdHJpbmdcIiApIHtcclxuICAgICAgICAgICAgICAgIG9iaiA9IHR5cGU7XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHR5cGUgPSB0eXBlIHx8IFwiZnhcIjtcclxuXHJcbiAgICAgICAgICAgIHdoaWxlICggaS0tICkge1xyXG4gICAgICAgICAgICAgICAgdG1wID0galF1ZXJ5Ll9kYXRhKCBlbGVtZW50c1sgaSBdLCB0eXBlICsgXCJxdWV1ZUhvb2tzXCIgKTtcclxuICAgICAgICAgICAgICAgIGlmICggdG1wICYmIHRtcC5lbXB0eSApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcC5lbXB0eS5hZGQoIHJlc29sdmUgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlKCBvYmogKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHZhciBwbnVtID0gKC9bKy1dPyg/OlxcZCpcXC58KVxcZCsoPzpbZUVdWystXT9cXGQrfCkvKS5zb3VyY2U7XHJcblxyXG4gICAgdmFyIGNzc0V4cGFuZCA9IFsgXCJUb3BcIiwgXCJSaWdodFwiLCBcIkJvdHRvbVwiLCBcIkxlZnRcIiBdO1xyXG5cclxuICAgIHZhciBpc0hpZGRlbiA9IGZ1bmN0aW9uKCBlbGVtLCBlbCApIHtcclxuICAgICAgICAvLyBpc0hpZGRlbiBtaWdodCBiZSBjYWxsZWQgZnJvbSBqUXVlcnkjZmlsdGVyIGZ1bmN0aW9uO1xyXG4gICAgICAgIC8vIGluIHRoYXQgY2FzZSwgZWxlbWVudCB3aWxsIGJlIHNlY29uZCBhcmd1bWVudFxyXG4gICAgICAgIGVsZW0gPSBlbCB8fCBlbGVtO1xyXG4gICAgICAgIHJldHVybiBqUXVlcnkuY3NzKCBlbGVtLCBcImRpc3BsYXlcIiApID09PSBcIm5vbmVcIiB8fCAhalF1ZXJ5LmNvbnRhaW5zKCBlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0gKTtcclxuICAgIH07XHJcblxyXG5cclxuXHJcbi8vIE11bHRpZnVuY3Rpb25hbCBtZXRob2QgdG8gZ2V0IGFuZCBzZXQgdmFsdWVzIG9mIGEgY29sbGVjdGlvblxyXG4vLyBUaGUgdmFsdWUvcyBjYW4gb3B0aW9uYWxseSBiZSBleGVjdXRlZCBpZiBpdCdzIGEgZnVuY3Rpb25cclxuICAgIHZhciBhY2Nlc3MgPSBqUXVlcnkuYWNjZXNzID0gZnVuY3Rpb24oIGVsZW1zLCBmbiwga2V5LCB2YWx1ZSwgY2hhaW5hYmxlLCBlbXB0eUdldCwgcmF3ICkge1xyXG4gICAgICAgIHZhciBpID0gMCxcclxuICAgICAgICAgICAgbGVuZ3RoID0gZWxlbXMubGVuZ3RoLFxyXG4gICAgICAgICAgICBidWxrID0ga2V5ID09IG51bGw7XHJcblxyXG4gICAgICAgIC8vIFNldHMgbWFueSB2YWx1ZXNcclxuICAgICAgICBpZiAoIGpRdWVyeS50eXBlKCBrZXkgKSA9PT0gXCJvYmplY3RcIiApIHtcclxuICAgICAgICAgICAgY2hhaW5hYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgZm9yICggaSBpbiBrZXkgKSB7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkuYWNjZXNzKCBlbGVtcywgZm4sIGksIGtleVtpXSwgdHJ1ZSwgZW1wdHlHZXQsIHJhdyApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTZXRzIG9uZSB2YWx1ZVxyXG4gICAgICAgIH0gZWxzZSBpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgIGNoYWluYWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoICFqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcclxuICAgICAgICAgICAgICAgIHJhdyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICggYnVsayApIHtcclxuICAgICAgICAgICAgICAgIC8vIEJ1bGsgb3BlcmF0aW9ucyBydW4gYWdhaW5zdCB0aGUgZW50aXJlIHNldFxyXG4gICAgICAgICAgICAgICAgaWYgKCByYXcgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm4uY2FsbCggZWxlbXMsIHZhbHVlICk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm4gPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAuLi5leGNlcHQgd2hlbiBleGVjdXRpbmcgZnVuY3Rpb24gdmFsdWVzXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGsgPSBmbjtcclxuICAgICAgICAgICAgICAgICAgICBmbiA9IGZ1bmN0aW9uKCBlbGVtLCBrZXksIHZhbHVlICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYnVsay5jYWxsKCBqUXVlcnkoIGVsZW0gKSwgdmFsdWUgKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIGZuICkge1xyXG4gICAgICAgICAgICAgICAgZm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm4oIGVsZW1zW2ldLCBrZXksIHJhdyA/IHZhbHVlIDogdmFsdWUuY2FsbCggZWxlbXNbaV0sIGksIGZuKCBlbGVtc1tpXSwga2V5ICkgKSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY2hhaW5hYmxlID9cclxuICAgICAgICAgICAgZWxlbXMgOlxyXG5cclxuICAgICAgICAgICAgLy8gR2V0c1xyXG4gICAgICAgICAgICBidWxrID9cclxuICAgICAgICAgICAgICAgIGZuLmNhbGwoIGVsZW1zICkgOlxyXG4gICAgICAgICAgICAgICAgbGVuZ3RoID8gZm4oIGVsZW1zWzBdLCBrZXkgKSA6IGVtcHR5R2V0O1xyXG4gICAgfTtcclxuICAgIHZhciByY2hlY2thYmxlVHlwZSA9ICgvXig/OmNoZWNrYm94fHJhZGlvKSQvaSk7XHJcblxyXG5cclxuXHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gTWluaWZpZWQ6IHZhciBhLGIsY1xyXG4gICAgICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiaW5wdXRcIiApLFxyXG4gICAgICAgICAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICksXHJcbiAgICAgICAgICAgIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICAgICAgICAvLyBTZXR1cFxyXG4gICAgICAgIGRpdi5pbm5lckhUTUwgPSBcIiAgPGxpbmsvPjx0YWJsZT48L3RhYmxlPjxhIGhyZWY9Jy9hJz5hPC9hPjxpbnB1dCB0eXBlPSdjaGVja2JveCcvPlwiO1xyXG5cclxuICAgICAgICAvLyBJRSBzdHJpcHMgbGVhZGluZyB3aGl0ZXNwYWNlIHdoZW4gLmlubmVySFRNTCBpcyB1c2VkXHJcbiAgICAgICAgc3VwcG9ydC5sZWFkaW5nV2hpdGVzcGFjZSA9IGRpdi5maXJzdENoaWxkLm5vZGVUeXBlID09PSAzO1xyXG5cclxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0Ym9keSBlbGVtZW50cyBhcmVuJ3QgYXV0b21hdGljYWxseSBpbnNlcnRlZFxyXG4gICAgICAgIC8vIElFIHdpbGwgaW5zZXJ0IHRoZW0gaW50byBlbXB0eSB0YWJsZXNcclxuICAgICAgICBzdXBwb3J0LnRib2R5ID0gIWRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCJ0Ym9keVwiICkubGVuZ3RoO1xyXG5cclxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCBsaW5rIGVsZW1lbnRzIGdldCBzZXJpYWxpemVkIGNvcnJlY3RseSBieSBpbm5lckhUTUxcclxuICAgICAgICAvLyBUaGlzIHJlcXVpcmVzIGEgd3JhcHBlciBlbGVtZW50IGluIElFXHJcbiAgICAgICAgc3VwcG9ydC5odG1sU2VyaWFsaXplID0gISFkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwibGlua1wiICkubGVuZ3RoO1xyXG5cclxuICAgICAgICAvLyBNYWtlcyBzdXJlIGNsb25pbmcgYW4gaHRtbDUgZWxlbWVudCBkb2VzIG5vdCBjYXVzZSBwcm9ibGVtc1xyXG4gICAgICAgIC8vIFdoZXJlIG91dGVySFRNTCBpcyB1bmRlZmluZWQsIHRoaXMgc3RpbGwgd29ya3NcclxuICAgICAgICBzdXBwb3J0Lmh0bWw1Q2xvbmUgPVxyXG4gICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcIm5hdlwiICkuY2xvbmVOb2RlKCB0cnVlICkub3V0ZXJIVE1MICE9PSBcIjw6bmF2PjwvOm5hdj5cIjtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgYSBkaXNjb25uZWN0ZWQgY2hlY2tib3ggd2lsbCByZXRhaW4gaXRzIGNoZWNrZWRcclxuICAgICAgICAvLyB2YWx1ZSBvZiB0cnVlIGFmdGVyIGFwcGVuZGVkIHRvIHRoZSBET00gKElFNi83KVxyXG4gICAgICAgIGlucHV0LnR5cGUgPSBcImNoZWNrYm94XCI7XHJcbiAgICAgICAgaW5wdXQuY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGlucHV0ICk7XHJcbiAgICAgICAgc3VwcG9ydC5hcHBlbmRDaGVja2VkID0gaW5wdXQuY2hlY2tlZDtcclxuXHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRleHRhcmVhIChhbmQgY2hlY2tib3gpIGRlZmF1bHRWYWx1ZSBpcyBwcm9wZXJseSBjbG9uZWRcclxuICAgICAgICAvLyBTdXBwb3J0OiBJRTYtSUUxMStcclxuICAgICAgICBkaXYuaW5uZXJIVE1MID0gXCI8dGV4dGFyZWE+eDwvdGV4dGFyZWE+XCI7XHJcbiAgICAgICAgc3VwcG9ydC5ub0Nsb25lQ2hlY2tlZCA9ICEhZGl2LmNsb25lTm9kZSggdHJ1ZSApLmxhc3RDaGlsZC5kZWZhdWx0VmFsdWU7XHJcblxyXG4gICAgICAgIC8vICMxMTIxNyAtIFdlYktpdCBsb3NlcyBjaGVjayB3aGVuIHRoZSBuYW1lIGlzIGFmdGVyIHRoZSBjaGVja2VkIGF0dHJpYnV0ZVxyXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKCBkaXYgKTtcclxuICAgICAgICBkaXYuaW5uZXJIVE1MID0gXCI8aW5wdXQgdHlwZT0ncmFkaW8nIGNoZWNrZWQ9J2NoZWNrZWQnIG5hbWU9J3QnLz5cIjtcclxuXHJcbiAgICAgICAgLy8gU3VwcG9ydDogU2FmYXJpIDUuMSwgaU9TIDUuMSwgQW5kcm9pZCA0LngsIEFuZHJvaWQgMi4zXHJcbiAgICAgICAgLy8gb2xkIFdlYktpdCBkb2Vzbid0IGNsb25lIGNoZWNrZWQgc3RhdGUgY29ycmVjdGx5IGluIGZyYWdtZW50c1xyXG4gICAgICAgIHN1cHBvcnQuY2hlY2tDbG9uZSA9IGRpdi5jbG9uZU5vZGUoIHRydWUgKS5jbG9uZU5vZGUoIHRydWUgKS5sYXN0Q2hpbGQuY2hlY2tlZDtcclxuXHJcbiAgICAgICAgLy8gU3VwcG9ydDogSUU8OVxyXG4gICAgICAgIC8vIE9wZXJhIGRvZXMgbm90IGNsb25lIGV2ZW50cyAoYW5kIHR5cGVvZiBkaXYuYXR0YWNoRXZlbnQgPT09IHVuZGVmaW5lZCkuXHJcbiAgICAgICAgLy8gSUU5LTEwIGNsb25lcyBldmVudHMgYm91bmQgdmlhIGF0dGFjaEV2ZW50LCBidXQgdGhleSBkb24ndCB0cmlnZ2VyIHdpdGggLmNsaWNrKClcclxuICAgICAgICBzdXBwb3J0Lm5vQ2xvbmVFdmVudCA9IHRydWU7XHJcbiAgICAgICAgaWYgKCBkaXYuYXR0YWNoRXZlbnQgKSB7XHJcbiAgICAgICAgICAgIGRpdi5hdHRhY2hFdmVudCggXCJvbmNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgc3VwcG9ydC5ub0Nsb25lRXZlbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBkaXYuY2xvbmVOb2RlKCB0cnVlICkuY2xpY2soKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEV4ZWN1dGUgdGhlIHRlc3Qgb25seSBpZiBub3QgYWxyZWFkeSBleGVjdXRlZCBpbiBhbm90aGVyIG1vZHVsZS5cclxuICAgICAgICBpZiAoc3VwcG9ydC5kZWxldGVFeHBhbmRvID09IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU8OVxyXG4gICAgICAgICAgICBzdXBwb3J0LmRlbGV0ZUV4cGFuZG8gPSB0cnVlO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGRpdi50ZXN0O1xyXG4gICAgICAgICAgICB9IGNhdGNoKCBlICkge1xyXG4gICAgICAgICAgICAgICAgc3VwcG9ydC5kZWxldGVFeHBhbmRvID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuXHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGksIGV2ZW50TmFtZSxcclxuICAgICAgICAgICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xyXG5cclxuICAgICAgICAvLyBTdXBwb3J0OiBJRTw5IChsYWNrIHN1Ym1pdC9jaGFuZ2UgYnViYmxlKSwgRmlyZWZveCAyMysgKGxhY2sgZm9jdXNpbiBldmVudClcclxuICAgICAgICBmb3IgKCBpIGluIHsgc3VibWl0OiB0cnVlLCBjaGFuZ2U6IHRydWUsIGZvY3VzaW46IHRydWUgfSkge1xyXG4gICAgICAgICAgICBldmVudE5hbWUgPSBcIm9uXCIgKyBpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhKHN1cHBvcnRbIGkgKyBcIkJ1YmJsZXNcIiBdID0gZXZlbnROYW1lIGluIHdpbmRvdykgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBCZXdhcmUgb2YgQ1NQIHJlc3RyaWN0aW9ucyAoaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vU2VjdXJpdHkvQ1NQKVxyXG4gICAgICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSggZXZlbnROYW1lLCBcInRcIiApO1xyXG4gICAgICAgICAgICAgICAgc3VwcG9ydFsgaSArIFwiQnViYmxlc1wiIF0gPSBkaXYuYXR0cmlidXRlc1sgZXZlbnROYW1lIF0uZXhwYW5kbyA9PT0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE51bGwgZWxlbWVudHMgdG8gYXZvaWQgbGVha3MgaW4gSUUuXHJcbiAgICAgICAgZGl2ID0gbnVsbDtcclxuICAgIH0pKCk7XHJcblxyXG5cclxuICAgIHZhciByZm9ybUVsZW1zID0gL14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWEpJC9pLFxyXG4gICAgICAgIHJrZXlFdmVudCA9IC9ea2V5LyxcclxuICAgICAgICBybW91c2VFdmVudCA9IC9eKD86bW91c2V8cG9pbnRlcnxjb250ZXh0bWVudSl8Y2xpY2svLFxyXG4gICAgICAgIHJmb2N1c01vcnBoID0gL14oPzpmb2N1c2luZm9jdXN8Zm9jdXNvdXRibHVyKSQvLFxyXG4gICAgICAgIHJ0eXBlbmFtZXNwYWNlID0gL14oW14uXSopKD86XFwuKC4rKXwpJC87XHJcblxyXG4gICAgZnVuY3Rpb24gcmV0dXJuVHJ1ZSgpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZXR1cm5GYWxzZSgpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2FmZUFjdGl2ZUVsZW1lbnQoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgfSBjYXRjaCAoIGVyciApIHsgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBIZWxwZXIgZnVuY3Rpb25zIGZvciBtYW5hZ2luZyBldmVudHMgLS0gbm90IHBhcnQgb2YgdGhlIHB1YmxpYyBpbnRlcmZhY2UuXHJcbiAgICAgKiBQcm9wcyB0byBEZWFuIEVkd2FyZHMnIGFkZEV2ZW50IGxpYnJhcnkgZm9yIG1hbnkgb2YgdGhlIGlkZWFzLlxyXG4gICAgICovXHJcbiAgICBqUXVlcnkuZXZlbnQgPSB7XHJcblxyXG4gICAgICAgIGdsb2JhbDoge30sXHJcblxyXG4gICAgICAgIGFkZDogZnVuY3Rpb24oIGVsZW0sIHR5cGVzLCBoYW5kbGVyLCBkYXRhLCBzZWxlY3RvciApIHtcclxuICAgICAgICAgICAgdmFyIHRtcCwgZXZlbnRzLCB0LCBoYW5kbGVPYmpJbixcclxuICAgICAgICAgICAgICAgIHNwZWNpYWwsIGV2ZW50SGFuZGxlLCBoYW5kbGVPYmosXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVycywgdHlwZSwgbmFtZXNwYWNlcywgb3JpZ1R5cGUsXHJcbiAgICAgICAgICAgICAgICBlbGVtRGF0YSA9IGpRdWVyeS5fZGF0YSggZWxlbSApO1xyXG5cclxuICAgICAgICAgICAgLy8gRG9uJ3QgYXR0YWNoIGV2ZW50cyB0byBub0RhdGEgb3IgdGV4dC9jb21tZW50IG5vZGVzIChidXQgYWxsb3cgcGxhaW4gb2JqZWN0cylcclxuICAgICAgICAgICAgaWYgKCAhZWxlbURhdGEgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENhbGxlciBjYW4gcGFzcyBpbiBhbiBvYmplY3Qgb2YgY3VzdG9tIGRhdGEgaW4gbGlldSBvZiB0aGUgaGFuZGxlclxyXG4gICAgICAgICAgICBpZiAoIGhhbmRsZXIuaGFuZGxlciApIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZU9iakluID0gaGFuZGxlcjtcclxuICAgICAgICAgICAgICAgIGhhbmRsZXIgPSBoYW5kbGVPYmpJbi5oYW5kbGVyO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3IgPSBoYW5kbGVPYmpJbi5zZWxlY3RvcjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIGhhbmRsZXIgaGFzIGEgdW5pcXVlIElELCB1c2VkIHRvIGZpbmQvcmVtb3ZlIGl0IGxhdGVyXHJcbiAgICAgICAgICAgIGlmICggIWhhbmRsZXIuZ3VpZCApIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZXIuZ3VpZCA9IGpRdWVyeS5ndWlkKys7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEluaXQgdGhlIGVsZW1lbnQncyBldmVudCBzdHJ1Y3R1cmUgYW5kIG1haW4gaGFuZGxlciwgaWYgdGhpcyBpcyB0aGUgZmlyc3RcclxuICAgICAgICAgICAgaWYgKCAhKGV2ZW50cyA9IGVsZW1EYXRhLmV2ZW50cykgKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudHMgPSBlbGVtRGF0YS5ldmVudHMgPSB7fTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoICEoZXZlbnRIYW5kbGUgPSBlbGVtRGF0YS5oYW5kbGUpICkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnRIYW5kbGUgPSBlbGVtRGF0YS5oYW5kbGUgPSBmdW5jdGlvbiggZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBEaXNjYXJkIHRoZSBzZWNvbmQgZXZlbnQgb2YgYSBqUXVlcnkuZXZlbnQudHJpZ2dlcigpIGFuZFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gYW4gZXZlbnQgaXMgY2FsbGVkIGFmdGVyIGEgcGFnZSBoYXMgdW5sb2FkZWRcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIGpRdWVyeSAhPT0gc3RydW5kZWZpbmVkICYmICghZSB8fCBqUXVlcnkuZXZlbnQudHJpZ2dlcmVkICE9PSBlLnR5cGUpID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmV2ZW50LmRpc3BhdGNoLmFwcGx5KCBldmVudEhhbmRsZS5lbGVtLCBhcmd1bWVudHMgKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgZWxlbSBhcyBhIHByb3BlcnR5IG9mIHRoZSBoYW5kbGUgZm4gdG8gcHJldmVudCBhIG1lbW9yeSBsZWFrIHdpdGggSUUgbm9uLW5hdGl2ZSBldmVudHNcclxuICAgICAgICAgICAgICAgIGV2ZW50SGFuZGxlLmVsZW0gPSBlbGVtO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBIYW5kbGUgbXVsdGlwbGUgZXZlbnRzIHNlcGFyYXRlZCBieSBhIHNwYWNlXHJcbiAgICAgICAgICAgIHR5cGVzID0gKCB0eXBlcyB8fCBcIlwiICkubWF0Y2goIHJub3R3aGl0ZSApIHx8IFsgXCJcIiBdO1xyXG4gICAgICAgICAgICB0ID0gdHlwZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICB3aGlsZSAoIHQtLSApIHtcclxuICAgICAgICAgICAgICAgIHRtcCA9IHJ0eXBlbmFtZXNwYWNlLmV4ZWMoIHR5cGVzW3RdICkgfHwgW107XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gb3JpZ1R5cGUgPSB0bXBbMV07XHJcbiAgICAgICAgICAgICAgICBuYW1lc3BhY2VzID0gKCB0bXBbMl0gfHwgXCJcIiApLnNwbGl0KCBcIi5cIiApLnNvcnQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUaGVyZSAqbXVzdCogYmUgYSB0eXBlLCBubyBhdHRhY2hpbmcgbmFtZXNwYWNlLW9ubHkgaGFuZGxlcnNcclxuICAgICAgICAgICAgICAgIGlmICggIXR5cGUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgZXZlbnQgY2hhbmdlcyBpdHMgdHlwZSwgdXNlIHRoZSBzcGVjaWFsIGV2ZW50IGhhbmRsZXJzIGZvciB0aGUgY2hhbmdlZCB0eXBlXHJcbiAgICAgICAgICAgICAgICBzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBzZWxlY3RvciBkZWZpbmVkLCBkZXRlcm1pbmUgc3BlY2lhbCBldmVudCBhcGkgdHlwZSwgb3RoZXJ3aXNlIGdpdmVuIHR5cGVcclxuICAgICAgICAgICAgICAgIHR5cGUgPSAoIHNlbGVjdG9yID8gc3BlY2lhbC5kZWxlZ2F0ZVR5cGUgOiBzcGVjaWFsLmJpbmRUeXBlICkgfHwgdHlwZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgc3BlY2lhbCBiYXNlZCBvbiBuZXdseSByZXNldCB0eXBlXHJcbiAgICAgICAgICAgICAgICBzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBoYW5kbGVPYmogaXMgcGFzc2VkIHRvIGFsbCBldmVudCBoYW5kbGVyc1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlT2JqID0galF1ZXJ5LmV4dGVuZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICAgICAgICAgICAgICBvcmlnVHlwZTogb3JpZ1R5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiBoYW5kbGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGd1aWQ6IGhhbmRsZXIuZ3VpZCxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXHJcbiAgICAgICAgICAgICAgICAgICAgbmVlZHNDb250ZXh0OiBzZWxlY3RvciAmJiBqUXVlcnkuZXhwci5tYXRjaC5uZWVkc0NvbnRleHQudGVzdCggc2VsZWN0b3IgKSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lc3BhY2U6IG5hbWVzcGFjZXMuam9pbihcIi5cIilcclxuICAgICAgICAgICAgICAgIH0sIGhhbmRsZU9iakluICk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSW5pdCB0aGUgZXZlbnQgaGFuZGxlciBxdWV1ZSBpZiB3ZSdyZSB0aGUgZmlyc3RcclxuICAgICAgICAgICAgICAgIGlmICggIShoYW5kbGVycyA9IGV2ZW50c1sgdHlwZSBdKSApIHtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVycyA9IGV2ZW50c1sgdHlwZSBdID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcnMuZGVsZWdhdGVDb3VudCA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgdXNlIGFkZEV2ZW50TGlzdGVuZXIvYXR0YWNoRXZlbnQgaWYgdGhlIHNwZWNpYWwgZXZlbnRzIGhhbmRsZXIgcmV0dXJucyBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggIXNwZWNpYWwuc2V0dXAgfHwgc3BlY2lhbC5zZXR1cC5jYWxsKCBlbGVtLCBkYXRhLCBuYW1lc3BhY2VzLCBldmVudEhhbmRsZSApID09PSBmYWxzZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQmluZCB0aGUgZ2xvYmFsIGV2ZW50IGhhbmRsZXIgdG8gdGhlIGVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBlbGVtLmFkZEV2ZW50TGlzdGVuZXIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoIHR5cGUsIGV2ZW50SGFuZGxlLCBmYWxzZSApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICggZWxlbS5hdHRhY2hFdmVudCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uYXR0YWNoRXZlbnQoIFwib25cIiArIHR5cGUsIGV2ZW50SGFuZGxlICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCBzcGVjaWFsLmFkZCApIHtcclxuICAgICAgICAgICAgICAgICAgICBzcGVjaWFsLmFkZC5jYWxsKCBlbGVtLCBoYW5kbGVPYmogKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhaGFuZGxlT2JqLmhhbmRsZXIuZ3VpZCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlT2JqLmhhbmRsZXIuZ3VpZCA9IGhhbmRsZXIuZ3VpZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWRkIHRvIHRoZSBlbGVtZW50J3MgaGFuZGxlciBsaXN0LCBkZWxlZ2F0ZXMgaW4gZnJvbnRcclxuICAgICAgICAgICAgICAgIGlmICggc2VsZWN0b3IgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcnMuc3BsaWNlKCBoYW5kbGVycy5kZWxlZ2F0ZUNvdW50KyssIDAsIGhhbmRsZU9iaiApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVycy5wdXNoKCBoYW5kbGVPYmogKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBLZWVwIHRyYWNrIG9mIHdoaWNoIGV2ZW50cyBoYXZlIGV2ZXIgYmVlbiB1c2VkLCBmb3IgZXZlbnQgb3B0aW1pemF0aW9uXHJcbiAgICAgICAgICAgICAgICBqUXVlcnkuZXZlbnQuZ2xvYmFsWyB0eXBlIF0gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBOdWxsaWZ5IGVsZW0gdG8gcHJldmVudCBtZW1vcnkgbGVha3MgaW4gSUVcclxuICAgICAgICAgICAgZWxlbSA9IG51bGw7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gRGV0YWNoIGFuIGV2ZW50IG9yIHNldCBvZiBldmVudHMgZnJvbSBhbiBlbGVtZW50XHJcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiggZWxlbSwgdHlwZXMsIGhhbmRsZXIsIHNlbGVjdG9yLCBtYXBwZWRUeXBlcyApIHtcclxuICAgICAgICAgICAgdmFyIGosIGhhbmRsZU9iaiwgdG1wLFxyXG4gICAgICAgICAgICAgICAgb3JpZ0NvdW50LCB0LCBldmVudHMsXHJcbiAgICAgICAgICAgICAgICBzcGVjaWFsLCBoYW5kbGVycywgdHlwZSxcclxuICAgICAgICAgICAgICAgIG5hbWVzcGFjZXMsIG9yaWdUeXBlLFxyXG4gICAgICAgICAgICAgICAgZWxlbURhdGEgPSBqUXVlcnkuaGFzRGF0YSggZWxlbSApICYmIGpRdWVyeS5fZGF0YSggZWxlbSApO1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhZWxlbURhdGEgfHwgIShldmVudHMgPSBlbGVtRGF0YS5ldmVudHMpICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBPbmNlIGZvciBlYWNoIHR5cGUubmFtZXNwYWNlIGluIHR5cGVzOyB0eXBlIG1heSBiZSBvbWl0dGVkXHJcbiAgICAgICAgICAgIHR5cGVzID0gKCB0eXBlcyB8fCBcIlwiICkubWF0Y2goIHJub3R3aGl0ZSApIHx8IFsgXCJcIiBdO1xyXG4gICAgICAgICAgICB0ID0gdHlwZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICB3aGlsZSAoIHQtLSApIHtcclxuICAgICAgICAgICAgICAgIHRtcCA9IHJ0eXBlbmFtZXNwYWNlLmV4ZWMoIHR5cGVzW3RdICkgfHwgW107XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gb3JpZ1R5cGUgPSB0bXBbMV07XHJcbiAgICAgICAgICAgICAgICBuYW1lc3BhY2VzID0gKCB0bXBbMl0gfHwgXCJcIiApLnNwbGl0KCBcIi5cIiApLnNvcnQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVbmJpbmQgYWxsIGV2ZW50cyAob24gdGhpcyBuYW1lc3BhY2UsIGlmIHByb3ZpZGVkKSBmb3IgdGhlIGVsZW1lbnRcclxuICAgICAgICAgICAgICAgIGlmICggIXR5cGUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICggdHlwZSBpbiBldmVudHMgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC5yZW1vdmUoIGVsZW0sIHR5cGUgKyB0eXBlc1sgdCBdLCBoYW5kbGVyLCBzZWxlY3RvciwgdHJ1ZSApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSAoIHNlbGVjdG9yID8gc3BlY2lhbC5kZWxlZ2F0ZVR5cGUgOiBzcGVjaWFsLmJpbmRUeXBlICkgfHwgdHlwZTtcclxuICAgICAgICAgICAgICAgIGhhbmRsZXJzID0gZXZlbnRzWyB0eXBlIF0gfHwgW107XHJcbiAgICAgICAgICAgICAgICB0bXAgPSB0bXBbMl0gJiYgbmV3IFJlZ0V4cCggXCIoXnxcXFxcLilcIiArIG5hbWVzcGFjZXMuam9pbihcIlxcXFwuKD86LipcXFxcLnwpXCIpICsgXCIoXFxcXC58JClcIiApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBtYXRjaGluZyBldmVudHNcclxuICAgICAgICAgICAgICAgIG9yaWdDb3VudCA9IGogPSBoYW5kbGVycy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoIGotLSApIHtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVPYmogPSBoYW5kbGVyc1sgaiBdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoICggbWFwcGVkVHlwZXMgfHwgb3JpZ1R5cGUgPT09IGhhbmRsZU9iai5vcmlnVHlwZSApICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICggIWhhbmRsZXIgfHwgaGFuZGxlci5ndWlkID09PSBoYW5kbGVPYmouZ3VpZCApICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICggIXRtcCB8fCB0bXAudGVzdCggaGFuZGxlT2JqLm5hbWVzcGFjZSApICkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgKCAhc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGhhbmRsZU9iai5zZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gXCIqKlwiICYmIGhhbmRsZU9iai5zZWxlY3RvciApICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVycy5zcGxpY2UoIGosIDEgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggaGFuZGxlT2JqLnNlbGVjdG9yICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlcnMuZGVsZWdhdGVDb3VudC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggc3BlY2lhbC5yZW1vdmUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjaWFsLnJlbW92ZS5jYWxsKCBlbGVtLCBoYW5kbGVPYmogKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgZ2VuZXJpYyBldmVudCBoYW5kbGVyIGlmIHdlIHJlbW92ZWQgc29tZXRoaW5nIGFuZCBubyBtb3JlIGhhbmRsZXJzIGV4aXN0XHJcbiAgICAgICAgICAgICAgICAvLyAoYXZvaWRzIHBvdGVudGlhbCBmb3IgZW5kbGVzcyByZWN1cnNpb24gZHVyaW5nIHJlbW92YWwgb2Ygc3BlY2lhbCBldmVudCBoYW5kbGVycylcclxuICAgICAgICAgICAgICAgIGlmICggb3JpZ0NvdW50ICYmICFoYW5kbGVycy5sZW5ndGggKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhc3BlY2lhbC50ZWFyZG93biB8fCBzcGVjaWFsLnRlYXJkb3duLmNhbGwoIGVsZW0sIG5hbWVzcGFjZXMsIGVsZW1EYXRhLmhhbmRsZSApID09PSBmYWxzZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LnJlbW92ZUV2ZW50KCBlbGVtLCB0eXBlLCBlbGVtRGF0YS5oYW5kbGUgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbIHR5cGUgXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBleHBhbmRvIGlmIGl0J3Mgbm8gbG9uZ2VyIHVzZWRcclxuICAgICAgICAgICAgaWYgKCBqUXVlcnkuaXNFbXB0eU9iamVjdCggZXZlbnRzICkgKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgZWxlbURhdGEuaGFuZGxlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZURhdGEgYWxzbyBjaGVja3MgZm9yIGVtcHRpbmVzcyBhbmQgY2xlYXJzIHRoZSBleHBhbmRvIGlmIGVtcHR5XHJcbiAgICAgICAgICAgICAgICAvLyBzbyB1c2UgaXQgaW5zdGVhZCBvZiBkZWxldGVcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5fcmVtb3ZlRGF0YSggZWxlbSwgXCJldmVudHNcIiApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdHJpZ2dlcjogZnVuY3Rpb24oIGV2ZW50LCBkYXRhLCBlbGVtLCBvbmx5SGFuZGxlcnMgKSB7XHJcbiAgICAgICAgICAgIHZhciBoYW5kbGUsIG9udHlwZSwgY3VyLFxyXG4gICAgICAgICAgICAgICAgYnViYmxlVHlwZSwgc3BlY2lhbCwgdG1wLCBpLFxyXG4gICAgICAgICAgICAgICAgZXZlbnRQYXRoID0gWyBlbGVtIHx8IGRvY3VtZW50IF0sXHJcbiAgICAgICAgICAgICAgICB0eXBlID0gaGFzT3duLmNhbGwoIGV2ZW50LCBcInR5cGVcIiApID8gZXZlbnQudHlwZSA6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgbmFtZXNwYWNlcyA9IGhhc093bi5jYWxsKCBldmVudCwgXCJuYW1lc3BhY2VcIiApID8gZXZlbnQubmFtZXNwYWNlLnNwbGl0KFwiLlwiKSA6IFtdO1xyXG5cclxuICAgICAgICAgICAgY3VyID0gdG1wID0gZWxlbSA9IGVsZW0gfHwgZG9jdW1lbnQ7XHJcblxyXG4gICAgICAgICAgICAvLyBEb24ndCBkbyBldmVudHMgb24gdGV4dCBhbmQgY29tbWVudCBub2Rlc1xyXG4gICAgICAgICAgICBpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDMgfHwgZWxlbS5ub2RlVHlwZSA9PT0gOCApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gZm9jdXMvYmx1ciBtb3JwaHMgdG8gZm9jdXNpbi9vdXQ7IGVuc3VyZSB3ZSdyZSBub3QgZmlyaW5nIHRoZW0gcmlnaHQgbm93XHJcbiAgICAgICAgICAgIGlmICggcmZvY3VzTW9ycGgudGVzdCggdHlwZSArIGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgKSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCB0eXBlLmluZGV4T2YoXCIuXCIpID49IDAgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBOYW1lc3BhY2VkIHRyaWdnZXI7IGNyZWF0ZSBhIHJlZ2V4cCB0byBtYXRjaCBldmVudCB0eXBlIGluIGhhbmRsZSgpXHJcbiAgICAgICAgICAgICAgICBuYW1lc3BhY2VzID0gdHlwZS5zcGxpdChcIi5cIik7XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gbmFtZXNwYWNlcy5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgbmFtZXNwYWNlcy5zb3J0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb250eXBlID0gdHlwZS5pbmRleE9mKFwiOlwiKSA8IDAgJiYgXCJvblwiICsgdHlwZTtcclxuXHJcbiAgICAgICAgICAgIC8vIENhbGxlciBjYW4gcGFzcyBpbiBhIGpRdWVyeS5FdmVudCBvYmplY3QsIE9iamVjdCwgb3IganVzdCBhbiBldmVudCB0eXBlIHN0cmluZ1xyXG4gICAgICAgICAgICBldmVudCA9IGV2ZW50WyBqUXVlcnkuZXhwYW5kbyBdID9cclxuICAgICAgICAgICAgICAgIGV2ZW50IDpcclxuICAgICAgICAgICAgICAgIG5ldyBqUXVlcnkuRXZlbnQoIHR5cGUsIHR5cGVvZiBldmVudCA9PT0gXCJvYmplY3RcIiAmJiBldmVudCApO1xyXG5cclxuICAgICAgICAgICAgLy8gVHJpZ2dlciBiaXRtYXNrOiAmIDEgZm9yIG5hdGl2ZSBoYW5kbGVyczsgJiAyIGZvciBqUXVlcnkgKGFsd2F5cyB0cnVlKVxyXG4gICAgICAgICAgICBldmVudC5pc1RyaWdnZXIgPSBvbmx5SGFuZGxlcnMgPyAyIDogMztcclxuICAgICAgICAgICAgZXZlbnQubmFtZXNwYWNlID0gbmFtZXNwYWNlcy5qb2luKFwiLlwiKTtcclxuICAgICAgICAgICAgZXZlbnQubmFtZXNwYWNlX3JlID0gZXZlbnQubmFtZXNwYWNlID9cclxuICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoIFwiKF58XFxcXC4pXCIgKyBuYW1lc3BhY2VzLmpvaW4oXCJcXFxcLig/Oi4qXFxcXC58KVwiKSArIFwiKFxcXFwufCQpXCIgKSA6XHJcbiAgICAgICAgICAgICAgICBudWxsO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2xlYW4gdXAgdGhlIGV2ZW50IGluIGNhc2UgaXQgaXMgYmVpbmcgcmV1c2VkXHJcbiAgICAgICAgICAgIGV2ZW50LnJlc3VsdCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgaWYgKCAhZXZlbnQudGFyZ2V0ICkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0ID0gZWxlbTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ2xvbmUgYW55IGluY29taW5nIGRhdGEgYW5kIHByZXBlbmQgdGhlIGV2ZW50LCBjcmVhdGluZyB0aGUgaGFuZGxlciBhcmcgbGlzdFxyXG4gICAgICAgICAgICBkYXRhID0gZGF0YSA9PSBudWxsID9cclxuICAgICAgICAgICAgICAgIFsgZXZlbnQgXSA6XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkubWFrZUFycmF5KCBkYXRhLCBbIGV2ZW50IF0gKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFsbG93IHNwZWNpYWwgZXZlbnRzIHRvIGRyYXcgb3V0c2lkZSB0aGUgbGluZXNcclxuICAgICAgICAgICAgc3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XHJcbiAgICAgICAgICAgIGlmICggIW9ubHlIYW5kbGVycyAmJiBzcGVjaWFsLnRyaWdnZXIgJiYgc3BlY2lhbC50cmlnZ2VyLmFwcGx5KCBlbGVtLCBkYXRhICkgPT09IGZhbHNlICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBEZXRlcm1pbmUgZXZlbnQgcHJvcGFnYXRpb24gcGF0aCBpbiBhZHZhbmNlLCBwZXIgVzNDIGV2ZW50cyBzcGVjICgjOTk1MSlcclxuICAgICAgICAgICAgLy8gQnViYmxlIHVwIHRvIGRvY3VtZW50LCB0aGVuIHRvIHdpbmRvdzsgd2F0Y2ggZm9yIGEgZ2xvYmFsIG93bmVyRG9jdW1lbnQgdmFyICgjOTcyNClcclxuICAgICAgICAgICAgaWYgKCAhb25seUhhbmRsZXJzICYmICFzcGVjaWFsLm5vQnViYmxlICYmICFqUXVlcnkuaXNXaW5kb3coIGVsZW0gKSApIHtcclxuXHJcbiAgICAgICAgICAgICAgICBidWJibGVUeXBlID0gc3BlY2lhbC5kZWxlZ2F0ZVR5cGUgfHwgdHlwZTtcclxuICAgICAgICAgICAgICAgIGlmICggIXJmb2N1c01vcnBoLnRlc3QoIGJ1YmJsZVR5cGUgKyB0eXBlICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyID0gY3VyLnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKCA7IGN1cjsgY3VyID0gY3VyLnBhcmVudE5vZGUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRQYXRoLnB1c2goIGN1ciApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IGN1cjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBPbmx5IGFkZCB3aW5kb3cgaWYgd2UgZ290IHRvIGRvY3VtZW50IChlLmcuLCBub3QgcGxhaW4gb2JqIG9yIGRldGFjaGVkIERPTSlcclxuICAgICAgICAgICAgICAgIGlmICggdG1wID09PSAoZWxlbS5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50KSApIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudFBhdGgucHVzaCggdG1wLmRlZmF1bHRWaWV3IHx8IHRtcC5wYXJlbnRXaW5kb3cgfHwgd2luZG93ICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEZpcmUgaGFuZGxlcnMgb24gdGhlIGV2ZW50IHBhdGhcclxuICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlICggKGN1ciA9IGV2ZW50UGF0aFtpKytdKSAmJiAhZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSApIHtcclxuXHJcbiAgICAgICAgICAgICAgICBldmVudC50eXBlID0gaSA+IDEgP1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1YmJsZVR5cGUgOlxyXG4gICAgICAgICAgICAgICAgc3BlY2lhbC5iaW5kVHlwZSB8fCB0eXBlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGpRdWVyeSBoYW5kbGVyXHJcbiAgICAgICAgICAgICAgICBoYW5kbGUgPSAoIGpRdWVyeS5fZGF0YSggY3VyLCBcImV2ZW50c1wiICkgfHwge30gKVsgZXZlbnQudHlwZSBdICYmIGpRdWVyeS5fZGF0YSggY3VyLCBcImhhbmRsZVwiICk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIGhhbmRsZSApIHtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGUuYXBwbHkoIGN1ciwgZGF0YSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIE5hdGl2ZSBoYW5kbGVyXHJcbiAgICAgICAgICAgICAgICBoYW5kbGUgPSBvbnR5cGUgJiYgY3VyWyBvbnR5cGUgXTtcclxuICAgICAgICAgICAgICAgIGlmICggaGFuZGxlICYmIGhhbmRsZS5hcHBseSAmJiBqUXVlcnkuYWNjZXB0RGF0YSggY3VyICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucmVzdWx0ID0gaGFuZGxlLmFwcGx5KCBjdXIsIGRhdGEgKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIGV2ZW50LnJlc3VsdCA9PT0gZmFsc2UgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGV2ZW50LnR5cGUgPSB0eXBlO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgbm9ib2R5IHByZXZlbnRlZCB0aGUgZGVmYXVsdCBhY3Rpb24sIGRvIGl0IG5vd1xyXG4gICAgICAgICAgICBpZiAoICFvbmx5SGFuZGxlcnMgJiYgIWV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpICkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggKCFzcGVjaWFsLl9kZWZhdWx0IHx8IHNwZWNpYWwuX2RlZmF1bHQuYXBwbHkoIGV2ZW50UGF0aC5wb3AoKSwgZGF0YSApID09PSBmYWxzZSkgJiZcclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuYWNjZXB0RGF0YSggZWxlbSApICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDYWxsIGEgbmF0aXZlIERPTSBtZXRob2Qgb24gdGhlIHRhcmdldCB3aXRoIHRoZSBzYW1lIG5hbWUgbmFtZSBhcyB0aGUgZXZlbnQuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FuJ3QgdXNlIGFuIC5pc0Z1bmN0aW9uKCkgY2hlY2sgaGVyZSBiZWNhdXNlIElFNi83IGZhaWxzIHRoYXQgdGVzdC5cclxuICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBkbyBkZWZhdWx0IGFjdGlvbnMgb24gd2luZG93LCB0aGF0J3Mgd2hlcmUgZ2xvYmFsIHZhcmlhYmxlcyBiZSAoIzYxNzApXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBvbnR5cGUgJiYgZWxlbVsgdHlwZSBdICYmICFqUXVlcnkuaXNXaW5kb3coIGVsZW0gKSApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvbid0IHJlLXRyaWdnZXIgYW4gb25GT08gZXZlbnQgd2hlbiB3ZSBjYWxsIGl0cyBGT08oKSBtZXRob2RcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gZWxlbVsgb250eXBlIF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHRtcCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1bIG9udHlwZSBdID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHJldmVudCByZS10cmlnZ2VyaW5nIG9mIHRoZSBzYW1lIGV2ZW50LCBzaW5jZSB3ZSBhbHJlYWR5IGJ1YmJsZWQgaXQgYWJvdmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCA9IHR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtWyB0eXBlIF0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoIGUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJRTw5IGRpZXMgb24gZm9jdXMvYmx1ciB0byBoaWRkZW4gZWxlbWVudCAoIzE0ODYsIzEyNTE4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb25seSByZXByb2R1Y2libGUgb24gd2luWFAgSUU4IG5hdGl2ZSwgbm90IElFOSBpbiBJRTggbW9kZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHRtcCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1bIG9udHlwZSBdID0gdG1wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZXZlbnQucmVzdWx0O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRpc3BhdGNoOiBmdW5jdGlvbiggZXZlbnQgKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBNYWtlIGEgd3JpdGFibGUgalF1ZXJ5LkV2ZW50IGZyb20gdGhlIG5hdGl2ZSBldmVudCBvYmplY3RcclxuICAgICAgICAgICAgZXZlbnQgPSBqUXVlcnkuZXZlbnQuZml4KCBldmVudCApO1xyXG5cclxuICAgICAgICAgICAgdmFyIGksIHJldCwgaGFuZGxlT2JqLCBtYXRjaGVkLCBqLFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlclF1ZXVlID0gW10sXHJcbiAgICAgICAgICAgICAgICBhcmdzID0gc2xpY2UuY2FsbCggYXJndW1lbnRzICksXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVycyA9ICggalF1ZXJ5Ll9kYXRhKCB0aGlzLCBcImV2ZW50c1wiICkgfHwge30gKVsgZXZlbnQudHlwZSBdIHx8IFtdLFxyXG4gICAgICAgICAgICAgICAgc3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyBldmVudC50eXBlIF0gfHwge307XHJcblxyXG4gICAgICAgICAgICAvLyBVc2UgdGhlIGZpeC1lZCBqUXVlcnkuRXZlbnQgcmF0aGVyIHRoYW4gdGhlIChyZWFkLW9ubHkpIG5hdGl2ZSBldmVudFxyXG4gICAgICAgICAgICBhcmdzWzBdID0gZXZlbnQ7XHJcbiAgICAgICAgICAgIGV2ZW50LmRlbGVnYXRlVGFyZ2V0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIENhbGwgdGhlIHByZURpc3BhdGNoIGhvb2sgZm9yIHRoZSBtYXBwZWQgdHlwZSwgYW5kIGxldCBpdCBiYWlsIGlmIGRlc2lyZWRcclxuICAgICAgICAgICAgaWYgKCBzcGVjaWFsLnByZURpc3BhdGNoICYmIHNwZWNpYWwucHJlRGlzcGF0Y2guY2FsbCggdGhpcywgZXZlbnQgKSA9PT0gZmFsc2UgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIERldGVybWluZSBoYW5kbGVyc1xyXG4gICAgICAgICAgICBoYW5kbGVyUXVldWUgPSBqUXVlcnkuZXZlbnQuaGFuZGxlcnMuY2FsbCggdGhpcywgZXZlbnQsIGhhbmRsZXJzICk7XHJcblxyXG4gICAgICAgICAgICAvLyBSdW4gZGVsZWdhdGVzIGZpcnN0OyB0aGV5IG1heSB3YW50IHRvIHN0b3AgcHJvcGFnYXRpb24gYmVuZWF0aCB1c1xyXG4gICAgICAgICAgICBpID0gMDtcclxuICAgICAgICAgICAgd2hpbGUgKCAobWF0Y2hlZCA9IGhhbmRsZXJRdWV1ZVsgaSsrIF0pICYmICFldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldCA9IG1hdGNoZWQuZWxlbTtcclxuXHJcbiAgICAgICAgICAgICAgICBqID0gMDtcclxuICAgICAgICAgICAgICAgIHdoaWxlICggKGhhbmRsZU9iaiA9IG1hdGNoZWQuaGFuZGxlcnNbIGorKyBdKSAmJiAhZXZlbnQuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQoKSApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIGV2ZW50IG11c3QgZWl0aGVyIDEpIGhhdmUgbm8gbmFtZXNwYWNlLCBvclxyXG4gICAgICAgICAgICAgICAgICAgIC8vIDIpIGhhdmUgbmFtZXNwYWNlKHMpIGEgc3Vic2V0IG9yIGVxdWFsIHRvIHRob3NlIGluIHRoZSBib3VuZCBldmVudCAoYm90aCBjYW4gaGF2ZSBubyBuYW1lc3BhY2UpLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggIWV2ZW50Lm5hbWVzcGFjZV9yZSB8fCBldmVudC5uYW1lc3BhY2VfcmUudGVzdCggaGFuZGxlT2JqLm5hbWVzcGFjZSApICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuaGFuZGxlT2JqID0gaGFuZGxlT2JqO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5kYXRhID0gaGFuZGxlT2JqLmRhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgPSAoIChqUXVlcnkuZXZlbnQuc3BlY2lhbFsgaGFuZGxlT2JqLm9yaWdUeXBlIF0gfHwge30pLmhhbmRsZSB8fCBoYW5kbGVPYmouaGFuZGxlciApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwbHkoIG1hdGNoZWQuZWxlbSwgYXJncyApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCByZXQgIT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggKGV2ZW50LnJlc3VsdCA9IHJldCkgPT09IGZhbHNlICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENhbGwgdGhlIHBvc3REaXNwYXRjaCBob29rIGZvciB0aGUgbWFwcGVkIHR5cGVcclxuICAgICAgICAgICAgaWYgKCBzcGVjaWFsLnBvc3REaXNwYXRjaCApIHtcclxuICAgICAgICAgICAgICAgIHNwZWNpYWwucG9zdERpc3BhdGNoLmNhbGwoIHRoaXMsIGV2ZW50ICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBldmVudC5yZXN1bHQ7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGFuZGxlcnM6IGZ1bmN0aW9uKCBldmVudCwgaGFuZGxlcnMgKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWwsIGhhbmRsZU9iaiwgbWF0Y2hlcywgaSxcclxuICAgICAgICAgICAgICAgIGhhbmRsZXJRdWV1ZSA9IFtdLFxyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGVDb3VudCA9IGhhbmRsZXJzLmRlbGVnYXRlQ291bnQsXHJcbiAgICAgICAgICAgICAgICBjdXIgPSBldmVudC50YXJnZXQ7XHJcblxyXG4gICAgICAgICAgICAvLyBGaW5kIGRlbGVnYXRlIGhhbmRsZXJzXHJcbiAgICAgICAgICAgIC8vIEJsYWNrLWhvbGUgU1ZHIDx1c2U+IGluc3RhbmNlIHRyZWVzICgjMTMxODApXHJcbiAgICAgICAgICAgIC8vIEF2b2lkIG5vbi1sZWZ0LWNsaWNrIGJ1YmJsaW5nIGluIEZpcmVmb3ggKCMzODYxKVxyXG4gICAgICAgICAgICBpZiAoIGRlbGVnYXRlQ291bnQgJiYgY3VyLm5vZGVUeXBlICYmICghZXZlbnQuYnV0dG9uIHx8IGV2ZW50LnR5cGUgIT09IFwiY2xpY2tcIikgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLyoganNoaW50IGVxZXFlcTogZmFsc2UgKi9cclxuICAgICAgICAgICAgICAgIGZvciAoIDsgY3VyICE9IHRoaXM7IGN1ciA9IGN1ci5wYXJlbnROb2RlIHx8IHRoaXMgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLyoganNoaW50IGVxZXFlcTogdHJ1ZSAqL1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBjaGVjayBub24tZWxlbWVudHMgKCMxMzIwOClcclxuICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBwcm9jZXNzIGNsaWNrcyBvbiBkaXNhYmxlZCBlbGVtZW50cyAoIzY5MTEsICM4MTY1LCAjMTEzODIsICMxMTc2NClcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIGN1ci5ub2RlVHlwZSA9PT0gMSAmJiAoY3VyLmRpc2FibGVkICE9PSB0cnVlIHx8IGV2ZW50LnR5cGUgIT09IFwiY2xpY2tcIikgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICggaSA9IDA7IGkgPCBkZWxlZ2F0ZUNvdW50OyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVPYmogPSBoYW5kbGVyc1sgaSBdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGNvbmZsaWN0IHdpdGggT2JqZWN0LnByb3RvdHlwZSBwcm9wZXJ0aWVzICgjMTMyMDMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWwgPSBoYW5kbGVPYmouc2VsZWN0b3IgKyBcIiBcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG1hdGNoZXNbIHNlbCBdID09PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlc1sgc2VsIF0gPSBoYW5kbGVPYmoubmVlZHNDb250ZXh0ID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkoIHNlbCwgdGhpcyApLmluZGV4KCBjdXIgKSA+PSAwIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmZpbmQoIHNlbCwgdGhpcywgbnVsbCwgWyBjdXIgXSApLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbWF0Y2hlc1sgc2VsIF0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKCBoYW5kbGVPYmogKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG1hdGNoZXMubGVuZ3RoICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlclF1ZXVlLnB1c2goeyBlbGVtOiBjdXIsIGhhbmRsZXJzOiBtYXRjaGVzIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgdGhlIHJlbWFpbmluZyAoZGlyZWN0bHktYm91bmQpIGhhbmRsZXJzXHJcbiAgICAgICAgICAgIGlmICggZGVsZWdhdGVDb3VudCA8IGhhbmRsZXJzLmxlbmd0aCApIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZXJRdWV1ZS5wdXNoKHsgZWxlbTogdGhpcywgaGFuZGxlcnM6IGhhbmRsZXJzLnNsaWNlKCBkZWxlZ2F0ZUNvdW50ICkgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBoYW5kbGVyUXVldWU7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZml4OiBmdW5jdGlvbiggZXZlbnQgKSB7XHJcbiAgICAgICAgICAgIGlmICggZXZlbnRbIGpRdWVyeS5leHBhbmRvIF0gKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIHdyaXRhYmxlIGNvcHkgb2YgdGhlIGV2ZW50IG9iamVjdCBhbmQgbm9ybWFsaXplIHNvbWUgcHJvcGVydGllc1xyXG4gICAgICAgICAgICB2YXIgaSwgcHJvcCwgY29weSxcclxuICAgICAgICAgICAgICAgIHR5cGUgPSBldmVudC50eXBlLFxyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudCA9IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgZml4SG9vayA9IHRoaXMuZml4SG9va3NbIHR5cGUgXTtcclxuXHJcbiAgICAgICAgICAgIGlmICggIWZpeEhvb2sgKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpeEhvb2tzWyB0eXBlIF0gPSBmaXhIb29rID1cclxuICAgICAgICAgICAgICAgICAgICBybW91c2VFdmVudC50ZXN0KCB0eXBlICkgPyB0aGlzLm1vdXNlSG9va3MgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBya2V5RXZlbnQudGVzdCggdHlwZSApID8gdGhpcy5rZXlIb29rcyA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvcHkgPSBmaXhIb29rLnByb3BzID8gdGhpcy5wcm9wcy5jb25jYXQoIGZpeEhvb2sucHJvcHMgKSA6IHRoaXMucHJvcHM7XHJcblxyXG4gICAgICAgICAgICBldmVudCA9IG5ldyBqUXVlcnkuRXZlbnQoIG9yaWdpbmFsRXZlbnQgKTtcclxuXHJcbiAgICAgICAgICAgIGkgPSBjb3B5Lmxlbmd0aDtcclxuICAgICAgICAgICAgd2hpbGUgKCBpLS0gKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wID0gY29weVsgaSBdO1xyXG4gICAgICAgICAgICAgICAgZXZlbnRbIHByb3AgXSA9IG9yaWdpbmFsRXZlbnRbIHByb3AgXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU8OVxyXG4gICAgICAgICAgICAvLyBGaXggdGFyZ2V0IHByb3BlcnR5ICgjMTkyNSlcclxuICAgICAgICAgICAgaWYgKCAhZXZlbnQudGFyZ2V0ICkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0ID0gb3JpZ2luYWxFdmVudC5zcmNFbGVtZW50IHx8IGRvY3VtZW50O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTdXBwb3J0OiBDaHJvbWUgMjMrLCBTYWZhcmk/XHJcbiAgICAgICAgICAgIC8vIFRhcmdldCBzaG91bGQgbm90IGJlIGEgdGV4dCBub2RlICgjNTA0LCAjMTMxNDMpXHJcbiAgICAgICAgICAgIGlmICggZXZlbnQudGFyZ2V0Lm5vZGVUeXBlID09PSAzICkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0ID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFPDlcclxuICAgICAgICAgICAgLy8gRm9yIG1vdXNlL2tleSBldmVudHMsIG1ldGFLZXk9PWZhbHNlIGlmIGl0J3MgdW5kZWZpbmVkICgjMzM2OCwgIzExMzI4KVxyXG4gICAgICAgICAgICBldmVudC5tZXRhS2V5ID0gISFldmVudC5tZXRhS2V5O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZpeEhvb2suZmlsdGVyID8gZml4SG9vay5maWx0ZXIoIGV2ZW50LCBvcmlnaW5hbEV2ZW50ICkgOiBldmVudDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBJbmNsdWRlcyBzb21lIGV2ZW50IHByb3BzIHNoYXJlZCBieSBLZXlFdmVudCBhbmQgTW91c2VFdmVudFxyXG4gICAgICAgIHByb3BzOiBcImFsdEtleSBidWJibGVzIGNhbmNlbGFibGUgY3RybEtleSBjdXJyZW50VGFyZ2V0IGV2ZW50UGhhc2UgbWV0YUtleSByZWxhdGVkVGFyZ2V0IHNoaWZ0S2V5IHRhcmdldCB0aW1lU3RhbXAgdmlldyB3aGljaFwiLnNwbGl0KFwiIFwiKSxcclxuXHJcbiAgICAgICAgZml4SG9va3M6IHt9LFxyXG5cclxuICAgICAgICBrZXlIb29rczoge1xyXG4gICAgICAgICAgICBwcm9wczogXCJjaGFyIGNoYXJDb2RlIGtleSBrZXlDb2RlXCIuc3BsaXQoXCIgXCIpLFxyXG4gICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uKCBldmVudCwgb3JpZ2luYWwgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWRkIHdoaWNoIGZvciBrZXkgZXZlbnRzXHJcbiAgICAgICAgICAgICAgICBpZiAoIGV2ZW50LndoaWNoID09IG51bGwgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQud2hpY2ggPSBvcmlnaW5hbC5jaGFyQ29kZSAhPSBudWxsID8gb3JpZ2luYWwuY2hhckNvZGUgOiBvcmlnaW5hbC5rZXlDb2RlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBldmVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1vdXNlSG9va3M6IHtcclxuICAgICAgICAgICAgcHJvcHM6IFwiYnV0dG9uIGJ1dHRvbnMgY2xpZW50WCBjbGllbnRZIGZyb21FbGVtZW50IG9mZnNldFggb2Zmc2V0WSBwYWdlWCBwYWdlWSBzY3JlZW5YIHNjcmVlblkgdG9FbGVtZW50XCIuc3BsaXQoXCIgXCIpLFxyXG4gICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uKCBldmVudCwgb3JpZ2luYWwgKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYm9keSwgZXZlbnREb2MsIGRvYyxcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24gPSBvcmlnaW5hbC5idXR0b24sXHJcbiAgICAgICAgICAgICAgICAgICAgZnJvbUVsZW1lbnQgPSBvcmlnaW5hbC5mcm9tRWxlbWVudDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDYWxjdWxhdGUgcGFnZVgvWSBpZiBtaXNzaW5nIGFuZCBjbGllbnRYL1kgYXZhaWxhYmxlXHJcbiAgICAgICAgICAgICAgICBpZiAoIGV2ZW50LnBhZ2VYID09IG51bGwgJiYgb3JpZ2luYWwuY2xpZW50WCAhPSBudWxsICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50RG9jID0gZXZlbnQudGFyZ2V0Lm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jID0gZXZlbnREb2MuZG9jdW1lbnRFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGJvZHkgPSBldmVudERvYy5ib2R5O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wYWdlWCA9IG9yaWdpbmFsLmNsaWVudFggKyAoIGRvYyAmJiBkb2Muc2Nyb2xsTGVmdCB8fCBib2R5ICYmIGJvZHkuc2Nyb2xsTGVmdCB8fCAwICkgLSAoIGRvYyAmJiBkb2MuY2xpZW50TGVmdCB8fCBib2R5ICYmIGJvZHkuY2xpZW50TGVmdCB8fCAwICk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucGFnZVkgPSBvcmlnaW5hbC5jbGllbnRZICsgKCBkb2MgJiYgZG9jLnNjcm9sbFRvcCAgfHwgYm9keSAmJiBib2R5LnNjcm9sbFRvcCAgfHwgMCApIC0gKCBkb2MgJiYgZG9jLmNsaWVudFRvcCAgfHwgYm9keSAmJiBib2R5LmNsaWVudFRvcCAgfHwgMCApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFkZCByZWxhdGVkVGFyZ2V0LCBpZiBuZWNlc3NhcnlcclxuICAgICAgICAgICAgICAgIGlmICggIWV2ZW50LnJlbGF0ZWRUYXJnZXQgJiYgZnJvbUVsZW1lbnQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucmVsYXRlZFRhcmdldCA9IGZyb21FbGVtZW50ID09PSBldmVudC50YXJnZXQgPyBvcmlnaW5hbC50b0VsZW1lbnQgOiBmcm9tRWxlbWVudDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgd2hpY2ggZm9yIGNsaWNrOiAxID09PSBsZWZ0OyAyID09PSBtaWRkbGU7IDMgPT09IHJpZ2h0XHJcbiAgICAgICAgICAgICAgICAvLyBOb3RlOiBidXR0b24gaXMgbm90IG5vcm1hbGl6ZWQsIHNvIGRvbid0IHVzZSBpdFxyXG4gICAgICAgICAgICAgICAgaWYgKCAhZXZlbnQud2hpY2ggJiYgYnV0dG9uICE9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQud2hpY2ggPSAoIGJ1dHRvbiAmIDEgPyAxIDogKCBidXR0b24gJiAyID8gMyA6ICggYnV0dG9uICYgNCA/IDIgOiAwICkgKSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBldmVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNwZWNpYWw6IHtcclxuICAgICAgICAgICAgbG9hZDoge1xyXG4gICAgICAgICAgICAgICAgLy8gUHJldmVudCB0cmlnZ2VyZWQgaW1hZ2UubG9hZCBldmVudHMgZnJvbSBidWJibGluZyB0byB3aW5kb3cubG9hZFxyXG4gICAgICAgICAgICAgICAgbm9CdWJibGU6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZm9jdXM6IHtcclxuICAgICAgICAgICAgICAgIC8vIEZpcmUgbmF0aXZlIGV2ZW50IGlmIHBvc3NpYmxlIHNvIGJsdXIvZm9jdXMgc2VxdWVuY2UgaXMgY29ycmVjdFxyXG4gICAgICAgICAgICAgICAgdHJpZ2dlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB0aGlzICE9PSBzYWZlQWN0aXZlRWxlbWVudCgpICYmIHRoaXMuZm9jdXMgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKCBlICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU8OVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgZXJyb3Igb24gZm9jdXMgdG8gaGlkZGVuIGVsZW1lbnQgKCMxNDg2LCAjMTI1MTgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IC50cmlnZ2VyKCkgcnVuIHRoZSBoYW5kbGVyc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRlbGVnYXRlVHlwZTogXCJmb2N1c2luXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYmx1cjoge1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB0aGlzID09PSBzYWZlQWN0aXZlRWxlbWVudCgpICYmIHRoaXMuYmx1ciApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ibHVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGVUeXBlOiBcImZvY3Vzb3V0XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2xpY2s6IHtcclxuICAgICAgICAgICAgICAgIC8vIEZvciBjaGVja2JveCwgZmlyZSBuYXRpdmUgZXZlbnQgc28gY2hlY2tlZCBzdGF0ZSB3aWxsIGJlIHJpZ2h0XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIGpRdWVyeS5ub2RlTmFtZSggdGhpcywgXCJpbnB1dFwiICkgJiYgdGhpcy50eXBlID09PSBcImNoZWNrYm94XCIgJiYgdGhpcy5jbGljayApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBGb3IgY3Jvc3MtYnJvd3NlciBjb25zaXN0ZW5jeSwgZG9uJ3QgZmlyZSBuYXRpdmUgLmNsaWNrKCkgb24gbGlua3NcclxuICAgICAgICAgICAgICAgIF9kZWZhdWx0OiBmdW5jdGlvbiggZXZlbnQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5ub2RlTmFtZSggZXZlbnQudGFyZ2V0LCBcImFcIiApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgYmVmb3JldW5sb2FkOiB7XHJcbiAgICAgICAgICAgICAgICBwb3N0RGlzcGF0Y2g6IGZ1bmN0aW9uKCBldmVudCApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogRmlyZWZveCAyMCtcclxuICAgICAgICAgICAgICAgICAgICAvLyBGaXJlZm94IGRvZXNuJ3QgYWxlcnQgaWYgdGhlIHJldHVyblZhbHVlIGZpZWxkIGlzIG5vdCBzZXQuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBldmVudC5yZXN1bHQgIT09IHVuZGVmaW5lZCAmJiBldmVudC5vcmlnaW5hbEV2ZW50ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5vcmlnaW5hbEV2ZW50LnJldHVyblZhbHVlID0gZXZlbnQucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNpbXVsYXRlOiBmdW5jdGlvbiggdHlwZSwgZWxlbSwgZXZlbnQsIGJ1YmJsZSApIHtcclxuICAgICAgICAgICAgLy8gUGlnZ3liYWNrIG9uIGEgZG9ub3IgZXZlbnQgdG8gc2ltdWxhdGUgYSBkaWZmZXJlbnQgb25lLlxyXG4gICAgICAgICAgICAvLyBGYWtlIG9yaWdpbmFsRXZlbnQgdG8gYXZvaWQgZG9ub3IncyBzdG9wUHJvcGFnYXRpb24sIGJ1dCBpZiB0aGVcclxuICAgICAgICAgICAgLy8gc2ltdWxhdGVkIGV2ZW50IHByZXZlbnRzIGRlZmF1bHQgdGhlbiB3ZSBkbyB0aGUgc2FtZSBvbiB0aGUgZG9ub3IuXHJcbiAgICAgICAgICAgIHZhciBlID0galF1ZXJ5LmV4dGVuZChcclxuICAgICAgICAgICAgICAgIG5ldyBqUXVlcnkuRXZlbnQoKSxcclxuICAgICAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNTaW11bGF0ZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDoge31cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgaWYgKCBidWJibGUgKSB7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkuZXZlbnQudHJpZ2dlciggZSwgbnVsbCwgZWxlbSApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5LmV2ZW50LmRpc3BhdGNoLmNhbGwoIGVsZW0sIGUgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIGUuaXNEZWZhdWx0UHJldmVudGVkKCkgKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBqUXVlcnkucmVtb3ZlRXZlbnQgPSBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyID9cclxuICAgICAgICBmdW5jdGlvbiggZWxlbSwgdHlwZSwgaGFuZGxlICkge1xyXG4gICAgICAgICAgICBpZiAoIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciApIHtcclxuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggdHlwZSwgaGFuZGxlLCBmYWxzZSApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSA6XHJcbiAgICAgICAgZnVuY3Rpb24oIGVsZW0sIHR5cGUsIGhhbmRsZSApIHtcclxuICAgICAgICAgICAgdmFyIG5hbWUgPSBcIm9uXCIgKyB0eXBlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCBlbGVtLmRldGFjaEV2ZW50ICkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICM4NTQ1LCAjNzA1NCwgcHJldmVudGluZyBtZW1vcnkgbGVha3MgZm9yIGN1c3RvbSBldmVudHMgaW4gSUU2LThcclxuICAgICAgICAgICAgICAgIC8vIGRldGFjaEV2ZW50IG5lZWRlZCBwcm9wZXJ0eSBvbiBlbGVtZW50LCBieSBuYW1lIG9mIHRoYXQgZXZlbnQsIHRvIHByb3Blcmx5IGV4cG9zZSBpdCB0byBHQ1xyXG4gICAgICAgICAgICAgICAgaWYgKCB0eXBlb2YgZWxlbVsgbmFtZSBdID09PSBzdHJ1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbVsgbmFtZSBdID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlbGVtLmRldGFjaEV2ZW50KCBuYW1lLCBoYW5kbGUgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgalF1ZXJ5LkV2ZW50ID0gZnVuY3Rpb24oIHNyYywgcHJvcHMgKSB7XHJcbiAgICAgICAgLy8gQWxsb3cgaW5zdGFudGlhdGlvbiB3aXRob3V0IHRoZSAnbmV3JyBrZXl3b3JkXHJcbiAgICAgICAgaWYgKCAhKHRoaXMgaW5zdGFuY2VvZiBqUXVlcnkuRXZlbnQpICkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IGpRdWVyeS5FdmVudCggc3JjLCBwcm9wcyApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRXZlbnQgb2JqZWN0XHJcbiAgICAgICAgaWYgKCBzcmMgJiYgc3JjLnR5cGUgKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYWxFdmVudCA9IHNyYztcclxuICAgICAgICAgICAgdGhpcy50eXBlID0gc3JjLnR5cGU7XHJcblxyXG4gICAgICAgICAgICAvLyBFdmVudHMgYnViYmxpbmcgdXAgdGhlIGRvY3VtZW50IG1heSBoYXZlIGJlZW4gbWFya2VkIGFzIHByZXZlbnRlZFxyXG4gICAgICAgICAgICAvLyBieSBhIGhhbmRsZXIgbG93ZXIgZG93biB0aGUgdHJlZTsgcmVmbGVjdCB0aGUgY29ycmVjdCB2YWx1ZS5cclxuICAgICAgICAgICAgdGhpcy5pc0RlZmF1bHRQcmV2ZW50ZWQgPSBzcmMuZGVmYXVsdFByZXZlbnRlZCB8fFxyXG4gICAgICAgICAgICBzcmMuZGVmYXVsdFByZXZlbnRlZCA9PT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRSA8IDksIEFuZHJvaWQgPCA0LjBcclxuICAgICAgICAgICAgc3JjLnJldHVyblZhbHVlID09PSBmYWxzZSA/XHJcbiAgICAgICAgICAgICAgICByZXR1cm5UcnVlIDpcclxuICAgICAgICAgICAgICAgIHJldHVybkZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy8gRXZlbnQgdHlwZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHNyYztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFB1dCBleHBsaWNpdGx5IHByb3ZpZGVkIHByb3BlcnRpZXMgb250byB0aGUgZXZlbnQgb2JqZWN0XHJcbiAgICAgICAgaWYgKCBwcm9wcyApIHtcclxuICAgICAgICAgICAgalF1ZXJ5LmV4dGVuZCggdGhpcywgcHJvcHMgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhIHRpbWVzdGFtcCBpZiBpbmNvbWluZyBldmVudCBkb2Vzbid0IGhhdmUgb25lXHJcbiAgICAgICAgdGhpcy50aW1lU3RhbXAgPSBzcmMgJiYgc3JjLnRpbWVTdGFtcCB8fCBqUXVlcnkubm93KCk7XHJcblxyXG4gICAgICAgIC8vIE1hcmsgaXQgYXMgZml4ZWRcclxuICAgICAgICB0aGlzWyBqUXVlcnkuZXhwYW5kbyBdID0gdHJ1ZTtcclxuICAgIH07XHJcblxyXG4vLyBqUXVlcnkuRXZlbnQgaXMgYmFzZWQgb24gRE9NMyBFdmVudHMgYXMgc3BlY2lmaWVkIGJ5IHRoZSBFQ01BU2NyaXB0IExhbmd1YWdlIEJpbmRpbmdcclxuLy8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAwMy9XRC1ET00tTGV2ZWwtMy1FdmVudHMtMjAwMzAzMzEvZWNtYS1zY3JpcHQtYmluZGluZy5odG1sXHJcbiAgICBqUXVlcnkuRXZlbnQucHJvdG90eXBlID0ge1xyXG4gICAgICAgIGlzRGVmYXVsdFByZXZlbnRlZDogcmV0dXJuRmFsc2UsXHJcbiAgICAgICAgaXNQcm9wYWdhdGlvblN0b3BwZWQ6IHJldHVybkZhbHNlLFxyXG4gICAgICAgIGlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkOiByZXR1cm5GYWxzZSxcclxuXHJcbiAgICAgICAgcHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgZSA9IHRoaXMub3JpZ2luYWxFdmVudDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaXNEZWZhdWx0UHJldmVudGVkID0gcmV0dXJuVHJ1ZTtcclxuICAgICAgICAgICAgaWYgKCAhZSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSWYgcHJldmVudERlZmF1bHQgZXhpc3RzLCBydW4gaXQgb24gdGhlIG9yaWdpbmFsIGV2ZW50XHJcbiAgICAgICAgICAgIGlmICggZS5wcmV2ZW50RGVmYXVsdCApIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRVxyXG4gICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHNldCB0aGUgcmV0dXJuVmFsdWUgcHJvcGVydHkgb2YgdGhlIG9yaWdpbmFsIGV2ZW50IHRvIGZhbHNlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0b3BQcm9wYWdhdGlvbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBlID0gdGhpcy5vcmlnaW5hbEV2ZW50O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pc1Byb3BhZ2F0aW9uU3RvcHBlZCA9IHJldHVyblRydWU7XHJcbiAgICAgICAgICAgIGlmICggIWUgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gSWYgc3RvcFByb3BhZ2F0aW9uIGV4aXN0cywgcnVuIGl0IG9uIHRoZSBvcmlnaW5hbCBldmVudFxyXG4gICAgICAgICAgICBpZiAoIGUuc3RvcFByb3BhZ2F0aW9uICkge1xyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU3VwcG9ydDogSUVcclxuICAgICAgICAgICAgLy8gU2V0IHRoZSBjYW5jZWxCdWJibGUgcHJvcGVydHkgb2YgdGhlIG9yaWdpbmFsIGV2ZW50IHRvIHRydWVcclxuICAgICAgICAgICAgZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGUgPSB0aGlzLm9yaWdpbmFsRXZlbnQ7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkID0gcmV0dXJuVHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICggZSAmJiBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiApIHtcclxuICAgICAgICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbi8vIENyZWF0ZSBtb3VzZWVudGVyL2xlYXZlIGV2ZW50cyB1c2luZyBtb3VzZW92ZXIvb3V0IGFuZCBldmVudC10aW1lIGNoZWNrc1xyXG4gICAgalF1ZXJ5LmVhY2goe1xyXG4gICAgICAgIG1vdXNlZW50ZXI6IFwibW91c2VvdmVyXCIsXHJcbiAgICAgICAgbW91c2VsZWF2ZTogXCJtb3VzZW91dFwiLFxyXG4gICAgICAgIHBvaW50ZXJlbnRlcjogXCJwb2ludGVyb3ZlclwiLFxyXG4gICAgICAgIHBvaW50ZXJsZWF2ZTogXCJwb2ludGVyb3V0XCJcclxuICAgIH0sIGZ1bmN0aW9uKCBvcmlnLCBmaXggKSB7XHJcbiAgICAgICAgalF1ZXJ5LmV2ZW50LnNwZWNpYWxbIG9yaWcgXSA9IHtcclxuICAgICAgICAgICAgZGVsZWdhdGVUeXBlOiBmaXgsXHJcbiAgICAgICAgICAgIGJpbmRUeXBlOiBmaXgsXHJcblxyXG4gICAgICAgICAgICBoYW5kbGU6IGZ1bmN0aW9uKCBldmVudCApIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICByZWxhdGVkID0gZXZlbnQucmVsYXRlZFRhcmdldCxcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVPYmogPSBldmVudC5oYW5kbGVPYmo7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRm9yIG1vdXNlbnRlci9sZWF2ZSBjYWxsIHRoZSBoYW5kbGVyIGlmIHJlbGF0ZWQgaXMgb3V0c2lkZSB0aGUgdGFyZ2V0LlxyXG4gICAgICAgICAgICAgICAgLy8gTkI6IE5vIHJlbGF0ZWRUYXJnZXQgaWYgdGhlIG1vdXNlIGxlZnQvZW50ZXJlZCB0aGUgYnJvd3NlciB3aW5kb3dcclxuICAgICAgICAgICAgICAgIGlmICggIXJlbGF0ZWQgfHwgKHJlbGF0ZWQgIT09IHRhcmdldCAmJiAhalF1ZXJ5LmNvbnRhaW5zKCB0YXJnZXQsIHJlbGF0ZWQgKSkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQudHlwZSA9IGhhbmRsZU9iai5vcmlnVHlwZTtcclxuICAgICAgICAgICAgICAgICAgICByZXQgPSBoYW5kbGVPYmouaGFuZGxlci5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQudHlwZSA9IGZpeDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4vLyBJRSBzdWJtaXQgZGVsZWdhdGlvblxyXG4gICAgaWYgKCAhc3VwcG9ydC5zdWJtaXRCdWJibGVzICkge1xyXG5cclxuICAgICAgICBqUXVlcnkuZXZlbnQuc3BlY2lhbC5zdWJtaXQgPSB7XHJcbiAgICAgICAgICAgIHNldHVwOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIC8vIE9ubHkgbmVlZCB0aGlzIGZvciBkZWxlZ2F0ZWQgZm9ybSBzdWJtaXQgZXZlbnRzXHJcbiAgICAgICAgICAgICAgICBpZiAoIGpRdWVyeS5ub2RlTmFtZSggdGhpcywgXCJmb3JtXCIgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTGF6eS1hZGQgYSBzdWJtaXQgaGFuZGxlciB3aGVuIGEgZGVzY2VuZGFudCBmb3JtIG1heSBwb3RlbnRpYWxseSBiZSBzdWJtaXR0ZWRcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC5hZGQoIHRoaXMsIFwiY2xpY2suX3N1Ym1pdCBrZXlwcmVzcy5fc3VibWl0XCIsIGZ1bmN0aW9uKCBlICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5vZGUgbmFtZSBjaGVjayBhdm9pZHMgYSBWTUwtcmVsYXRlZCBjcmFzaCBpbiBJRSAoIzk4MDcpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW0gPSBlLnRhcmdldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybSA9IGpRdWVyeS5ub2RlTmFtZSggZWxlbSwgXCJpbnB1dFwiICkgfHwgalF1ZXJ5Lm5vZGVOYW1lKCBlbGVtLCBcImJ1dHRvblwiICkgPyBlbGVtLmZvcm0gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBmb3JtICYmICFqUXVlcnkuX2RhdGEoIGZvcm0sIFwic3VibWl0QnViYmxlc1wiICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC5hZGQoIGZvcm0sIFwic3VibWl0Ll9zdWJtaXRcIiwgZnVuY3Rpb24oIGV2ZW50ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuX3N1Ym1pdF9idWJibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5Ll9kYXRhKCBmb3JtLCBcInN1Ym1pdEJ1YmJsZXNcIiwgdHJ1ZSApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHVuZGVmaW5lZCBzaW5jZSB3ZSBkb24ndCBuZWVkIGFuIGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBwb3N0RGlzcGF0Y2g6IGZ1bmN0aW9uKCBldmVudCApIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIGZvcm0gd2FzIHN1Ym1pdHRlZCBieSB0aGUgdXNlciwgYnViYmxlIHRoZSBldmVudCB1cCB0aGUgdHJlZVxyXG4gICAgICAgICAgICAgICAgaWYgKCBldmVudC5fc3VibWl0X2J1YmJsZSApIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZXZlbnQuX3N1Ym1pdF9idWJibGU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB0aGlzLnBhcmVudE5vZGUgJiYgIWV2ZW50LmlzVHJpZ2dlciApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmV2ZW50LnNpbXVsYXRlKCBcInN1Ym1pdFwiLCB0aGlzLnBhcmVudE5vZGUsIGV2ZW50LCB0cnVlICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgdGVhcmRvd246IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gT25seSBuZWVkIHRoaXMgZm9yIGRlbGVnYXRlZCBmb3JtIHN1Ym1pdCBldmVudHNcclxuICAgICAgICAgICAgICAgIGlmICggalF1ZXJ5Lm5vZGVOYW1lKCB0aGlzLCBcImZvcm1cIiApICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgZGVsZWdhdGVkIGhhbmRsZXJzOyBjbGVhbkRhdGEgZXZlbnR1YWxseSByZWFwcyBzdWJtaXQgaGFuZGxlcnMgYXR0YWNoZWQgYWJvdmVcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC5yZW1vdmUoIHRoaXMsIFwiLl9zdWJtaXRcIiApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbi8vIElFIGNoYW5nZSBkZWxlZ2F0aW9uIGFuZCBjaGVja2JveC9yYWRpbyBmaXhcclxuICAgIGlmICggIXN1cHBvcnQuY2hhbmdlQnViYmxlcyApIHtcclxuXHJcbiAgICAgICAgalF1ZXJ5LmV2ZW50LnNwZWNpYWwuY2hhbmdlID0ge1xyXG5cclxuICAgICAgICAgICAgc2V0dXA6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggcmZvcm1FbGVtcy50ZXN0KCB0aGlzLm5vZGVOYW1lICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSUUgZG9lc24ndCBmaXJlIGNoYW5nZSBvbiBhIGNoZWNrL3JhZGlvIHVudGlsIGJsdXI7IHRyaWdnZXIgaXQgb24gY2xpY2tcclxuICAgICAgICAgICAgICAgICAgICAvLyBhZnRlciBhIHByb3BlcnR5Y2hhbmdlLiBFYXQgdGhlIGJsdXItY2hhbmdlIGluIHNwZWNpYWwuY2hhbmdlLmhhbmRsZS5cclxuICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIHN0aWxsIGZpcmVzIG9uY2hhbmdlIGEgc2Vjb25kIHRpbWUgZm9yIGNoZWNrL3JhZGlvIGFmdGVyIGJsdXIuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB0aGlzLnR5cGUgPT09IFwiY2hlY2tib3hcIiB8fCB0aGlzLnR5cGUgPT09IFwicmFkaW9cIiApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmV2ZW50LmFkZCggdGhpcywgXCJwcm9wZXJ0eWNoYW5nZS5fY2hhbmdlXCIsIGZ1bmN0aW9uKCBldmVudCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZXZlbnQub3JpZ2luYWxFdmVudC5wcm9wZXJ0eU5hbWUgPT09IFwiY2hlY2tlZFwiICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2p1c3RfY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZXZlbnQuYWRkKCB0aGlzLCBcImNsaWNrLl9jaGFuZ2VcIiwgZnVuY3Rpb24oIGV2ZW50ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCB0aGlzLl9qdXN0X2NoYW5nZWQgJiYgIWV2ZW50LmlzVHJpZ2dlciApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9qdXN0X2NoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFsbG93IHRyaWdnZXJlZCwgc2ltdWxhdGVkIGNoYW5nZSBldmVudHMgKCMxMTUwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC5zaW11bGF0ZSggXCJjaGFuZ2VcIiwgdGhpcywgZXZlbnQsIHRydWUgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIERlbGVnYXRlZCBldmVudDsgbGF6eS1hZGQgYSBjaGFuZ2UgaGFuZGxlciBvbiBkZXNjZW5kYW50IGlucHV0c1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5LmV2ZW50LmFkZCggdGhpcywgXCJiZWZvcmVhY3RpdmF0ZS5fY2hhbmdlXCIsIGZ1bmN0aW9uKCBlICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtID0gZS50YXJnZXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggcmZvcm1FbGVtcy50ZXN0KCBlbGVtLm5vZGVOYW1lICkgJiYgIWpRdWVyeS5fZGF0YSggZWxlbSwgXCJjaGFuZ2VCdWJibGVzXCIgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmV2ZW50LmFkZCggZWxlbSwgXCJjaGFuZ2UuX2NoYW5nZVwiLCBmdW5jdGlvbiggZXZlbnQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHRoaXMucGFyZW50Tm9kZSAmJiAhZXZlbnQuaXNTaW11bGF0ZWQgJiYgIWV2ZW50LmlzVHJpZ2dlciApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZXZlbnQuc2ltdWxhdGUoIFwiY2hhbmdlXCIsIHRoaXMucGFyZW50Tm9kZSwgZXZlbnQsIHRydWUgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5fZGF0YSggZWxlbSwgXCJjaGFuZ2VCdWJibGVzXCIsIHRydWUgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGhhbmRsZTogZnVuY3Rpb24oIGV2ZW50ICkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW0gPSBldmVudC50YXJnZXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU3dhbGxvdyBuYXRpdmUgY2hhbmdlIGV2ZW50cyBmcm9tIGNoZWNrYm94L3JhZGlvLCB3ZSBhbHJlYWR5IHRyaWdnZXJlZCB0aGVtIGFib3ZlXHJcbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMgIT09IGVsZW0gfHwgZXZlbnQuaXNTaW11bGF0ZWQgfHwgZXZlbnQuaXNUcmlnZ2VyIHx8IChlbGVtLnR5cGUgIT09IFwicmFkaW9cIiAmJiBlbGVtLnR5cGUgIT09IFwiY2hlY2tib3hcIikgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50LmhhbmRsZU9iai5oYW5kbGVyLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC5yZW1vdmUoIHRoaXMsIFwiLl9jaGFuZ2VcIiApO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAhcmZvcm1FbGVtcy50ZXN0KCB0aGlzLm5vZGVOYW1lICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuLy8gQ3JlYXRlIFwiYnViYmxpbmdcIiBmb2N1cyBhbmQgYmx1ciBldmVudHNcclxuICAgIGlmICggIXN1cHBvcnQuZm9jdXNpbkJ1YmJsZXMgKSB7XHJcbiAgICAgICAgalF1ZXJ5LmVhY2goeyBmb2N1czogXCJmb2N1c2luXCIsIGJsdXI6IFwiZm9jdXNvdXRcIiB9LCBmdW5jdGlvbiggb3JpZywgZml4ICkge1xyXG5cclxuICAgICAgICAgICAgLy8gQXR0YWNoIGEgc2luZ2xlIGNhcHR1cmluZyBoYW5kbGVyIG9uIHRoZSBkb2N1bWVudCB3aGlsZSBzb21lb25lIHdhbnRzIGZvY3VzaW4vZm9jdXNvdXRcclxuICAgICAgICAgICAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbiggZXZlbnQgKSB7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkuZXZlbnQuc2ltdWxhdGUoIGZpeCwgZXZlbnQudGFyZ2V0LCBqUXVlcnkuZXZlbnQuZml4KCBldmVudCApLCB0cnVlICk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgZml4IF0gPSB7XHJcbiAgICAgICAgICAgICAgICBzZXR1cDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRvYyA9IHRoaXMub3duZXJEb2N1bWVudCB8fCB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2hlcyA9IGpRdWVyeS5fZGF0YSggZG9jLCBmaXggKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhYXR0YWNoZXMgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCBvcmlnLCBoYW5kbGVyLCB0cnVlICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS5fZGF0YSggZG9jLCBmaXgsICggYXR0YWNoZXMgfHwgMCApICsgMSApO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZG9jID0gdGhpcy5vd25lckRvY3VtZW50IHx8IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFjaGVzID0galF1ZXJ5Ll9kYXRhKCBkb2MsIGZpeCApIC0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhYXR0YWNoZXMgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCBvcmlnLCBoYW5kbGVyLCB0cnVlICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5fcmVtb3ZlRGF0YSggZG9jLCBmaXggKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuX2RhdGEoIGRvYywgZml4LCBhdHRhY2hlcyApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBqUXVlcnkuZm4uZXh0ZW5kKHtcclxuXHJcbiAgICAgICAgb246IGZ1bmN0aW9uKCB0eXBlcywgc2VsZWN0b3IsIGRhdGEsIGZuLCAvKklOVEVSTkFMKi8gb25lICkge1xyXG4gICAgICAgICAgICB2YXIgdHlwZSwgb3JpZ0ZuO1xyXG5cclxuICAgICAgICAgICAgLy8gVHlwZXMgY2FuIGJlIGEgbWFwIG9mIHR5cGVzL2hhbmRsZXJzXHJcbiAgICAgICAgICAgIGlmICggdHlwZW9mIHR5cGVzID09PSBcIm9iamVjdFwiICkge1xyXG4gICAgICAgICAgICAgICAgLy8gKCB0eXBlcy1PYmplY3QsIHNlbGVjdG9yLCBkYXRhIClcclxuICAgICAgICAgICAgICAgIGlmICggdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICggdHlwZXMtT2JqZWN0LCBkYXRhIClcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gZGF0YSB8fCBzZWxlY3RvcjtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAoIHR5cGUgaW4gdHlwZXMgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbiggdHlwZSwgc2VsZWN0b3IsIGRhdGEsIHR5cGVzWyB0eXBlIF0sIG9uZSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICggZGF0YSA9PSBudWxsICYmIGZuID09IG51bGwgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAoIHR5cGVzLCBmbiApXHJcbiAgICAgICAgICAgICAgICBmbiA9IHNlbGVjdG9yO1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHNlbGVjdG9yID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBmbiA9PSBudWxsICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gKCB0eXBlcywgc2VsZWN0b3IsIGZuIClcclxuICAgICAgICAgICAgICAgICAgICBmbiA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gKCB0eXBlcywgZGF0YSwgZm4gKVxyXG4gICAgICAgICAgICAgICAgICAgIGZuID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gc2VsZWN0b3I7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3IgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCBmbiA9PT0gZmFsc2UgKSB7XHJcbiAgICAgICAgICAgICAgICBmbiA9IHJldHVybkZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCAhZm4gKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCBvbmUgPT09IDEgKSB7XHJcbiAgICAgICAgICAgICAgICBvcmlnRm4gPSBmbjtcclxuICAgICAgICAgICAgICAgIGZuID0gZnVuY3Rpb24oIGV2ZW50ICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIENhbiB1c2UgYW4gZW1wdHkgc2V0LCBzaW5jZSBldmVudCBjb250YWlucyB0aGUgaW5mb1xyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSgpLm9mZiggZXZlbnQgKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3JpZ0ZuLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAvLyBVc2Ugc2FtZSBndWlkIHNvIGNhbGxlciBjYW4gcmVtb3ZlIHVzaW5nIG9yaWdGblxyXG4gICAgICAgICAgICAgICAgZm4uZ3VpZCA9IG9yaWdGbi5ndWlkIHx8ICggb3JpZ0ZuLmd1aWQgPSBqUXVlcnkuZ3VpZCsrICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkuZXZlbnQuYWRkKCB0aGlzLCB0eXBlcywgZm4sIGRhdGEsIHNlbGVjdG9yICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25lOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub24oIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4sIDEgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9mZjogZnVuY3Rpb24oIHR5cGVzLCBzZWxlY3RvciwgZm4gKSB7XHJcbiAgICAgICAgICAgIHZhciBoYW5kbGVPYmosIHR5cGU7XHJcbiAgICAgICAgICAgIGlmICggdHlwZXMgJiYgdHlwZXMucHJldmVudERlZmF1bHQgJiYgdHlwZXMuaGFuZGxlT2JqICkge1xyXG4gICAgICAgICAgICAgICAgLy8gKCBldmVudCApICBkaXNwYXRjaGVkIGpRdWVyeS5FdmVudFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlT2JqID0gdHlwZXMuaGFuZGxlT2JqO1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5KCB0eXBlcy5kZWxlZ2F0ZVRhcmdldCApLm9mZihcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVPYmoubmFtZXNwYWNlID8gaGFuZGxlT2JqLm9yaWdUeXBlICsgXCIuXCIgKyBoYW5kbGVPYmoubmFtZXNwYWNlIDogaGFuZGxlT2JqLm9yaWdUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZU9iai5zZWxlY3RvcixcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVPYmouaGFuZGxlclxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggdHlwZW9mIHR5cGVzID09PSBcIm9iamVjdFwiICkge1xyXG4gICAgICAgICAgICAgICAgLy8gKCB0eXBlcy1vYmplY3QgWywgc2VsZWN0b3JdIClcclxuICAgICAgICAgICAgICAgIGZvciAoIHR5cGUgaW4gdHlwZXMgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vZmYoIHR5cGUsIHNlbGVjdG9yLCB0eXBlc1sgdHlwZSBdICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIHNlbGVjdG9yID09PSBmYWxzZSB8fCB0eXBlb2Ygc2VsZWN0b3IgPT09IFwiZnVuY3Rpb25cIiApIHtcclxuICAgICAgICAgICAgICAgIC8vICggdHlwZXMgWywgZm5dIClcclxuICAgICAgICAgICAgICAgIGZuID0gc2VsZWN0b3I7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIGZuID09PSBmYWxzZSApIHtcclxuICAgICAgICAgICAgICAgIGZuID0gcmV0dXJuRmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC5yZW1vdmUoIHRoaXMsIHR5cGVzLCBmbiwgc2VsZWN0b3IgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdHJpZ2dlcjogZnVuY3Rpb24oIHR5cGUsIGRhdGEgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkuZXZlbnQudHJpZ2dlciggdHlwZSwgZGF0YSwgdGhpcyApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRyaWdnZXJIYW5kbGVyOiBmdW5jdGlvbiggdHlwZSwgZGF0YSApIHtcclxuICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzWzBdO1xyXG4gICAgICAgICAgICBpZiAoIGVsZW0gKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4galF1ZXJ5LmV2ZW50LnRyaWdnZXIoIHR5cGUsIGRhdGEsIGVsZW0sIHRydWUgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVTYWZlRnJhZ21lbnQoIGRvY3VtZW50ICkge1xyXG4gICAgICAgIHZhciBsaXN0ID0gbm9kZU5hbWVzLnNwbGl0KCBcInxcIiApLFxyXG4gICAgICAgICAgICBzYWZlRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgICAgICAgaWYgKCBzYWZlRnJhZy5jcmVhdGVFbGVtZW50ICkge1xyXG4gICAgICAgICAgICB3aGlsZSAoIGxpc3QubGVuZ3RoICkge1xyXG4gICAgICAgICAgICAgICAgc2FmZUZyYWcuY3JlYXRlRWxlbWVudChcclxuICAgICAgICAgICAgICAgICAgICBsaXN0LnBvcCgpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzYWZlRnJhZztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbm9kZU5hbWVzID0gXCJhYmJyfGFydGljbGV8YXNpZGV8YXVkaW98YmRpfGNhbnZhc3xkYXRhfGRhdGFsaXN0fGRldGFpbHN8ZmlnY2FwdGlvbnxmaWd1cmV8Zm9vdGVyfFwiICtcclxuICAgICAgICAgICAgXCJoZWFkZXJ8aGdyb3VwfG1hcmt8bWV0ZXJ8bmF2fG91dHB1dHxwcm9ncmVzc3xzZWN0aW9ufHN1bW1hcnl8dGltZXx2aWRlb1wiLFxyXG4gICAgICAgIHJpbmxpbmVqUXVlcnkgPSAvIGpRdWVyeVxcZCs9XCIoPzpudWxsfFxcZCspXCIvZyxcclxuICAgICAgICBybm9zaGltY2FjaGUgPSBuZXcgUmVnRXhwKFwiPCg/OlwiICsgbm9kZU5hbWVzICsgXCIpW1xcXFxzLz5dXCIsIFwiaVwiKSxcclxuICAgICAgICBybGVhZGluZ1doaXRlc3BhY2UgPSAvXlxccysvLFxyXG4gICAgICAgIHJ4aHRtbFRhZyA9IC88KD8hYXJlYXxicnxjb2x8ZW1iZWR8aHJ8aW1nfGlucHV0fGxpbmt8bWV0YXxwYXJhbSkoKFtcXHc6XSspW14+XSopXFwvPi9naSxcclxuICAgICAgICBydGFnTmFtZSA9IC88KFtcXHc6XSspLyxcclxuICAgICAgICBydGJvZHkgPSAvPHRib2R5L2ksXHJcbiAgICAgICAgcmh0bWwgPSAvPHwmIz9cXHcrOy8sXHJcbiAgICAgICAgcm5vSW5uZXJodG1sID0gLzwoPzpzY3JpcHR8c3R5bGV8bGluaykvaSxcclxuICAgIC8vIGNoZWNrZWQ9XCJjaGVja2VkXCIgb3IgY2hlY2tlZFxyXG4gICAgICAgIHJjaGVja2VkID0gL2NoZWNrZWRcXHMqKD86W149XXw9XFxzKi5jaGVja2VkLikvaSxcclxuICAgICAgICByc2NyaXB0VHlwZSA9IC9eJHxcXC8oPzpqYXZhfGVjbWEpc2NyaXB0L2ksXHJcbiAgICAgICAgcnNjcmlwdFR5cGVNYXNrZWQgPSAvXnRydWVcXC8oLiopLyxcclxuICAgICAgICByY2xlYW5TY3JpcHQgPSAvXlxccyo8ISg/OlxcW0NEQVRBXFxbfC0tKXwoPzpcXF1cXF18LS0pPlxccyokL2csXHJcblxyXG4gICAgLy8gV2UgaGF2ZSB0byBjbG9zZSB0aGVzZSB0YWdzIHRvIHN1cHBvcnQgWEhUTUwgKCMxMzIwMClcclxuICAgICAgICB3cmFwTWFwID0ge1xyXG4gICAgICAgICAgICBvcHRpb246IFsgMSwgXCI8c2VsZWN0IG11bHRpcGxlPSdtdWx0aXBsZSc+XCIsIFwiPC9zZWxlY3Q+XCIgXSxcclxuICAgICAgICAgICAgbGVnZW5kOiBbIDEsIFwiPGZpZWxkc2V0PlwiLCBcIjwvZmllbGRzZXQ+XCIgXSxcclxuICAgICAgICAgICAgYXJlYTogWyAxLCBcIjxtYXA+XCIsIFwiPC9tYXA+XCIgXSxcclxuICAgICAgICAgICAgcGFyYW06IFsgMSwgXCI8b2JqZWN0PlwiLCBcIjwvb2JqZWN0PlwiIF0sXHJcbiAgICAgICAgICAgIHRoZWFkOiBbIDEsIFwiPHRhYmxlPlwiLCBcIjwvdGFibGU+XCIgXSxcclxuICAgICAgICAgICAgdHI6IFsgMiwgXCI8dGFibGU+PHRib2R5PlwiLCBcIjwvdGJvZHk+PC90YWJsZT5cIiBdLFxyXG4gICAgICAgICAgICBjb2w6IFsgMiwgXCI8dGFibGU+PHRib2R5PjwvdGJvZHk+PGNvbGdyb3VwPlwiLCBcIjwvY29sZ3JvdXA+PC90YWJsZT5cIiBdLFxyXG4gICAgICAgICAgICB0ZDogWyAzLCBcIjx0YWJsZT48dGJvZHk+PHRyPlwiLCBcIjwvdHI+PC90Ym9keT48L3RhYmxlPlwiIF0sXHJcblxyXG4gICAgICAgICAgICAvLyBJRTYtOCBjYW4ndCBzZXJpYWxpemUgbGluaywgc2NyaXB0LCBzdHlsZSwgb3IgYW55IGh0bWw1IChOb1Njb3BlKSB0YWdzLFxyXG4gICAgICAgICAgICAvLyB1bmxlc3Mgd3JhcHBlZCBpbiBhIGRpdiB3aXRoIG5vbi1icmVha2luZyBjaGFyYWN0ZXJzIGluIGZyb250IG9mIGl0LlxyXG4gICAgICAgICAgICBfZGVmYXVsdDogc3VwcG9ydC5odG1sU2VyaWFsaXplID8gWyAwLCBcIlwiLCBcIlwiIF0gOiBbIDEsIFwiWDxkaXY+XCIsIFwiPC9kaXY+XCIgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNhZmVGcmFnbWVudCA9IGNyZWF0ZVNhZmVGcmFnbWVudCggZG9jdW1lbnQgKSxcclxuICAgICAgICBmcmFnbWVudERpdiA9IHNhZmVGcmFnbWVudC5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSApO1xyXG5cclxuICAgIHdyYXBNYXAub3B0Z3JvdXAgPSB3cmFwTWFwLm9wdGlvbjtcclxuICAgIHdyYXBNYXAudGJvZHkgPSB3cmFwTWFwLnRmb290ID0gd3JhcE1hcC5jb2xncm91cCA9IHdyYXBNYXAuY2FwdGlvbiA9IHdyYXBNYXAudGhlYWQ7XHJcbiAgICB3cmFwTWFwLnRoID0gd3JhcE1hcC50ZDtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRBbGwoIGNvbnRleHQsIHRhZyApIHtcclxuICAgICAgICB2YXIgZWxlbXMsIGVsZW0sXHJcbiAgICAgICAgICAgIGkgPSAwLFxyXG4gICAgICAgICAgICBmb3VuZCA9IHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lICE9PSBzdHJ1bmRlZmluZWQgPyBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCB0YWcgfHwgXCIqXCIgKSA6XHJcbiAgICAgICAgICAgICAgICB0eXBlb2YgY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsICE9PSBzdHJ1bmRlZmluZWQgPyBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIHRhZyB8fCBcIipcIiApIDpcclxuICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGlmICggIWZvdW5kICkge1xyXG4gICAgICAgICAgICBmb3IgKCBmb3VuZCA9IFtdLCBlbGVtcyA9IGNvbnRleHQuY2hpbGROb2RlcyB8fCBjb250ZXh0OyAoZWxlbSA9IGVsZW1zW2ldKSAhPSBudWxsOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoICF0YWcgfHwgalF1ZXJ5Lm5vZGVOYW1lKCBlbGVtLCB0YWcgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3VuZC5wdXNoKCBlbGVtICk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS5tZXJnZSggZm91bmQsIGdldEFsbCggZWxlbSwgdGFnICkgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRhZyA9PT0gdW5kZWZpbmVkIHx8IHRhZyAmJiBqUXVlcnkubm9kZU5hbWUoIGNvbnRleHQsIHRhZyApID9cclxuICAgICAgICAgICAgalF1ZXJ5Lm1lcmdlKCBbIGNvbnRleHQgXSwgZm91bmQgKSA6XHJcbiAgICAgICAgICAgIGZvdW5kO1xyXG4gICAgfVxyXG5cclxuLy8gVXNlZCBpbiBidWlsZEZyYWdtZW50LCBmaXhlcyB0aGUgZGVmYXVsdENoZWNrZWQgcHJvcGVydHlcclxuICAgIGZ1bmN0aW9uIGZpeERlZmF1bHRDaGVja2VkKCBlbGVtICkge1xyXG4gICAgICAgIGlmICggcmNoZWNrYWJsZVR5cGUudGVzdCggZWxlbS50eXBlICkgKSB7XHJcbiAgICAgICAgICAgIGVsZW0uZGVmYXVsdENoZWNrZWQgPSBlbGVtLmNoZWNrZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuLy8gU3VwcG9ydDogSUU8OFxyXG4vLyBNYW5pcHVsYXRpbmcgdGFibGVzIHJlcXVpcmVzIGEgdGJvZHlcclxuICAgIGZ1bmN0aW9uIG1hbmlwdWxhdGlvblRhcmdldCggZWxlbSwgY29udGVudCApIHtcclxuICAgICAgICByZXR1cm4galF1ZXJ5Lm5vZGVOYW1lKCBlbGVtLCBcInRhYmxlXCIgKSAmJlxyXG4gICAgICAgIGpRdWVyeS5ub2RlTmFtZSggY29udGVudC5ub2RlVHlwZSAhPT0gMTEgPyBjb250ZW50IDogY29udGVudC5maXJzdENoaWxkLCBcInRyXCIgKSA/XHJcblxyXG4gICAgICAgIGVsZW0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0Ym9keVwiKVswXSB8fFxyXG4gICAgICAgIGVsZW0uYXBwZW5kQ2hpbGQoIGVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIikgKSA6XHJcbiAgICAgICAgICAgIGVsZW07XHJcbiAgICB9XHJcblxyXG4vLyBSZXBsYWNlL3Jlc3RvcmUgdGhlIHR5cGUgYXR0cmlidXRlIG9mIHNjcmlwdCBlbGVtZW50cyBmb3Igc2FmZSBET00gbWFuaXB1bGF0aW9uXHJcbiAgICBmdW5jdGlvbiBkaXNhYmxlU2NyaXB0KCBlbGVtICkge1xyXG4gICAgICAgIGVsZW0udHlwZSA9IChqUXVlcnkuZmluZC5hdHRyKCBlbGVtLCBcInR5cGVcIiApICE9PSBudWxsKSArIFwiL1wiICsgZWxlbS50eXBlO1xyXG4gICAgICAgIHJldHVybiBlbGVtO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcmVzdG9yZVNjcmlwdCggZWxlbSApIHtcclxuICAgICAgICB2YXIgbWF0Y2ggPSByc2NyaXB0VHlwZU1hc2tlZC5leGVjKCBlbGVtLnR5cGUgKTtcclxuICAgICAgICBpZiAoIG1hdGNoICkge1xyXG4gICAgICAgICAgICBlbGVtLnR5cGUgPSBtYXRjaFsxXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlbGVtLnJlbW92ZUF0dHJpYnV0ZShcInR5cGVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbGVtO1xyXG4gICAgfVxyXG5cclxuLy8gTWFyayBzY3JpcHRzIGFzIGhhdmluZyBhbHJlYWR5IGJlZW4gZXZhbHVhdGVkXHJcbiAgICBmdW5jdGlvbiBzZXRHbG9iYWxFdmFsKCBlbGVtcywgcmVmRWxlbWVudHMgKSB7XHJcbiAgICAgICAgdmFyIGVsZW0sXHJcbiAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgIGZvciAoIDsgKGVsZW0gPSBlbGVtc1tpXSkgIT0gbnVsbDsgaSsrICkge1xyXG4gICAgICAgICAgICBqUXVlcnkuX2RhdGEoIGVsZW0sIFwiZ2xvYmFsRXZhbFwiLCAhcmVmRWxlbWVudHMgfHwgalF1ZXJ5Ll9kYXRhKCByZWZFbGVtZW50c1tpXSwgXCJnbG9iYWxFdmFsXCIgKSApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9uZUNvcHlFdmVudCggc3JjLCBkZXN0ICkge1xyXG5cclxuICAgICAgICBpZiAoIGRlc3Qubm9kZVR5cGUgIT09IDEgfHwgIWpRdWVyeS5oYXNEYXRhKCBzcmMgKSApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHR5cGUsIGksIGwsXHJcbiAgICAgICAgICAgIG9sZERhdGEgPSBqUXVlcnkuX2RhdGEoIHNyYyApLFxyXG4gICAgICAgICAgICBjdXJEYXRhID0galF1ZXJ5Ll9kYXRhKCBkZXN0LCBvbGREYXRhICksXHJcbiAgICAgICAgICAgIGV2ZW50cyA9IG9sZERhdGEuZXZlbnRzO1xyXG5cclxuICAgICAgICBpZiAoIGV2ZW50cyApIHtcclxuICAgICAgICAgICAgZGVsZXRlIGN1ckRhdGEuaGFuZGxlO1xyXG4gICAgICAgICAgICBjdXJEYXRhLmV2ZW50cyA9IHt9O1xyXG5cclxuICAgICAgICAgICAgZm9yICggdHlwZSBpbiBldmVudHMgKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKCBpID0gMCwgbCA9IGV2ZW50c1sgdHlwZSBdLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZXZlbnQuYWRkKCBkZXN0LCB0eXBlLCBldmVudHNbIHR5cGUgXVsgaSBdICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG1ha2UgdGhlIGNsb25lZCBwdWJsaWMgZGF0YSBvYmplY3QgYSBjb3B5IGZyb20gdGhlIG9yaWdpbmFsXHJcbiAgICAgICAgaWYgKCBjdXJEYXRhLmRhdGEgKSB7XHJcbiAgICAgICAgICAgIGN1ckRhdGEuZGF0YSA9IGpRdWVyeS5leHRlbmQoIHt9LCBjdXJEYXRhLmRhdGEgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZml4Q2xvbmVOb2RlSXNzdWVzKCBzcmMsIGRlc3QgKSB7XHJcbiAgICAgICAgdmFyIG5vZGVOYW1lLCBlLCBkYXRhO1xyXG5cclxuICAgICAgICAvLyBXZSBkbyBub3QgbmVlZCB0byBkbyBhbnl0aGluZyBmb3Igbm9uLUVsZW1lbnRzXHJcbiAgICAgICAgaWYgKCBkZXN0Lm5vZGVUeXBlICE9PSAxICkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBub2RlTmFtZSA9IGRlc3Qubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgLy8gSUU2LTggY29waWVzIGV2ZW50cyBib3VuZCB2aWEgYXR0YWNoRXZlbnQgd2hlbiB1c2luZyBjbG9uZU5vZGUuXHJcbiAgICAgICAgaWYgKCAhc3VwcG9ydC5ub0Nsb25lRXZlbnQgJiYgZGVzdFsgalF1ZXJ5LmV4cGFuZG8gXSApIHtcclxuICAgICAgICAgICAgZGF0YSA9IGpRdWVyeS5fZGF0YSggZGVzdCApO1xyXG5cclxuICAgICAgICAgICAgZm9yICggZSBpbiBkYXRhLmV2ZW50cyApIHtcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5yZW1vdmVFdmVudCggZGVzdCwgZSwgZGF0YS5oYW5kbGUgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRXZlbnQgZGF0YSBnZXRzIHJlZmVyZW5jZWQgaW5zdGVhZCBvZiBjb3BpZWQgaWYgdGhlIGV4cGFuZG8gZ2V0cyBjb3BpZWQgdG9vXHJcbiAgICAgICAgICAgIGRlc3QucmVtb3ZlQXR0cmlidXRlKCBqUXVlcnkuZXhwYW5kbyApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSUUgYmxhbmtzIGNvbnRlbnRzIHdoZW4gY2xvbmluZyBzY3JpcHRzLCBhbmQgdHJpZXMgdG8gZXZhbHVhdGUgbmV3bHktc2V0IHRleHRcclxuICAgICAgICBpZiAoIG5vZGVOYW1lID09PSBcInNjcmlwdFwiICYmIGRlc3QudGV4dCAhPT0gc3JjLnRleHQgKSB7XHJcbiAgICAgICAgICAgIGRpc2FibGVTY3JpcHQoIGRlc3QgKS50ZXh0ID0gc3JjLnRleHQ7XHJcbiAgICAgICAgICAgIHJlc3RvcmVTY3JpcHQoIGRlc3QgKTtcclxuXHJcbiAgICAgICAgICAgIC8vIElFNi0xMCBpbXByb3Blcmx5IGNsb25lcyBjaGlsZHJlbiBvZiBvYmplY3QgZWxlbWVudHMgdXNpbmcgY2xhc3NpZC5cclxuICAgICAgICAgICAgLy8gSUUxMCB0aHJvd3MgTm9Nb2RpZmljYXRpb25BbGxvd2VkRXJyb3IgaWYgcGFyZW50IGlzIG51bGwsICMxMjEzMi5cclxuICAgICAgICB9IGVsc2UgaWYgKCBub2RlTmFtZSA9PT0gXCJvYmplY3RcIiApIHtcclxuICAgICAgICAgICAgaWYgKCBkZXN0LnBhcmVudE5vZGUgKSB7XHJcbiAgICAgICAgICAgICAgICBkZXN0Lm91dGVySFRNTCA9IHNyYy5vdXRlckhUTUw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgcGF0aCBhcHBlYXJzIHVuYXZvaWRhYmxlIGZvciBJRTkuIFdoZW4gY2xvbmluZyBhbiBvYmplY3RcclxuICAgICAgICAgICAgLy8gZWxlbWVudCBpbiBJRTksIHRoZSBvdXRlckhUTUwgc3RyYXRlZ3kgYWJvdmUgaXMgbm90IHN1ZmZpY2llbnQuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBzcmMgaGFzIGlubmVySFRNTCBhbmQgdGhlIGRlc3RpbmF0aW9uIGRvZXMgbm90LFxyXG4gICAgICAgICAgICAvLyBjb3B5IHRoZSBzcmMuaW5uZXJIVE1MIGludG8gdGhlIGRlc3QuaW5uZXJIVE1MLiAjMTAzMjRcclxuICAgICAgICAgICAgaWYgKCBzdXBwb3J0Lmh0bWw1Q2xvbmUgJiYgKCBzcmMuaW5uZXJIVE1MICYmICFqUXVlcnkudHJpbShkZXN0LmlubmVySFRNTCkgKSApIHtcclxuICAgICAgICAgICAgICAgIGRlc3QuaW5uZXJIVE1MID0gc3JjLmlubmVySFRNTDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKCBub2RlTmFtZSA9PT0gXCJpbnB1dFwiICYmIHJjaGVja2FibGVUeXBlLnRlc3QoIHNyYy50eXBlICkgKSB7XHJcbiAgICAgICAgICAgIC8vIElFNi04IGZhaWxzIHRvIHBlcnNpc3QgdGhlIGNoZWNrZWQgc3RhdGUgb2YgYSBjbG9uZWQgY2hlY2tib3hcclxuICAgICAgICAgICAgLy8gb3IgcmFkaW8gYnV0dG9uLiBXb3JzZSwgSUU2LTcgZmFpbCB0byBnaXZlIHRoZSBjbG9uZWQgZWxlbWVudFxyXG4gICAgICAgICAgICAvLyBhIGNoZWNrZWQgYXBwZWFyYW5jZSBpZiB0aGUgZGVmYXVsdENoZWNrZWQgdmFsdWUgaXNuJ3QgYWxzbyBzZXRcclxuXHJcbiAgICAgICAgICAgIGRlc3QuZGVmYXVsdENoZWNrZWQgPSBkZXN0LmNoZWNrZWQgPSBzcmMuY2hlY2tlZDtcclxuXHJcbiAgICAgICAgICAgIC8vIElFNi03IGdldCBjb25mdXNlZCBhbmQgZW5kIHVwIHNldHRpbmcgdGhlIHZhbHVlIG9mIGEgY2xvbmVkXHJcbiAgICAgICAgICAgIC8vIGNoZWNrYm94L3JhZGlvIGJ1dHRvbiB0byBhbiBlbXB0eSBzdHJpbmcgaW5zdGVhZCBvZiBcIm9uXCJcclxuICAgICAgICAgICAgaWYgKCBkZXN0LnZhbHVlICE9PSBzcmMudmFsdWUgKSB7XHJcbiAgICAgICAgICAgICAgICBkZXN0LnZhbHVlID0gc3JjLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJRTYtOCBmYWlscyB0byByZXR1cm4gdGhlIHNlbGVjdGVkIG9wdGlvbiB0byB0aGUgZGVmYXVsdCBzZWxlY3RlZFxyXG4gICAgICAgICAgICAvLyBzdGF0ZSB3aGVuIGNsb25pbmcgb3B0aW9uc1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIG5vZGVOYW1lID09PSBcIm9wdGlvblwiICkge1xyXG4gICAgICAgICAgICBkZXN0LmRlZmF1bHRTZWxlY3RlZCA9IGRlc3Quc2VsZWN0ZWQgPSBzcmMuZGVmYXVsdFNlbGVjdGVkO1xyXG5cclxuICAgICAgICAgICAgLy8gSUU2LTggZmFpbHMgdG8gc2V0IHRoZSBkZWZhdWx0VmFsdWUgdG8gdGhlIGNvcnJlY3QgdmFsdWUgd2hlblxyXG4gICAgICAgICAgICAvLyBjbG9uaW5nIG90aGVyIHR5cGVzIG9mIGlucHV0IGZpZWxkc1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIG5vZGVOYW1lID09PSBcImlucHV0XCIgfHwgbm9kZU5hbWUgPT09IFwidGV4dGFyZWFcIiApIHtcclxuICAgICAgICAgICAgZGVzdC5kZWZhdWx0VmFsdWUgPSBzcmMuZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBqUXVlcnkuZXh0ZW5kKHtcclxuICAgICAgICBjbG9uZTogZnVuY3Rpb24oIGVsZW0sIGRhdGFBbmRFdmVudHMsIGRlZXBEYXRhQW5kRXZlbnRzICkge1xyXG4gICAgICAgICAgICB2YXIgZGVzdEVsZW1lbnRzLCBub2RlLCBjbG9uZSwgaSwgc3JjRWxlbWVudHMsXHJcbiAgICAgICAgICAgICAgICBpblBhZ2UgPSBqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApO1xyXG5cclxuICAgICAgICAgICAgaWYgKCBzdXBwb3J0Lmh0bWw1Q2xvbmUgfHwgalF1ZXJ5LmlzWE1MRG9jKGVsZW0pIHx8ICFybm9zaGltY2FjaGUudGVzdCggXCI8XCIgKyBlbGVtLm5vZGVOYW1lICsgXCI+XCIgKSApIHtcclxuICAgICAgICAgICAgICAgIGNsb25lID0gZWxlbS5jbG9uZU5vZGUoIHRydWUgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJRTw9OCBkb2VzIG5vdCBwcm9wZXJseSBjbG9uZSBkZXRhY2hlZCwgdW5rbm93biBlbGVtZW50IG5vZGVzXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudERpdi5pbm5lckhUTUwgPSBlbGVtLm91dGVySFRNTDtcclxuICAgICAgICAgICAgICAgIGZyYWdtZW50RGl2LnJlbW92ZUNoaWxkKCBjbG9uZSA9IGZyYWdtZW50RGl2LmZpcnN0Q2hpbGQgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCAoIXN1cHBvcnQubm9DbG9uZUV2ZW50IHx8ICFzdXBwb3J0Lm5vQ2xvbmVDaGVja2VkKSAmJlxyXG4gICAgICAgICAgICAgICAgKGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgZWxlbS5ub2RlVHlwZSA9PT0gMTEpICYmICFqUXVlcnkuaXNYTUxEb2MoZWxlbSkgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gV2UgZXNjaGV3IFNpenpsZSBoZXJlIGZvciBwZXJmb3JtYW5jZSByZWFzb25zOiBodHRwOi8vanNwZXJmLmNvbS9nZXRhbGwtdnMtc2l6emxlLzJcclxuICAgICAgICAgICAgICAgIGRlc3RFbGVtZW50cyA9IGdldEFsbCggY2xvbmUgKTtcclxuICAgICAgICAgICAgICAgIHNyY0VsZW1lbnRzID0gZ2V0QWxsKCBlbGVtICk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRml4IGFsbCBJRSBjbG9uaW5nIGlzc3Vlc1xyXG4gICAgICAgICAgICAgICAgZm9yICggaSA9IDA7IChub2RlID0gc3JjRWxlbWVudHNbaV0pICE9IG51bGw7ICsraSApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBFbnN1cmUgdGhhdCB0aGUgZGVzdGluYXRpb24gbm9kZSBpcyBub3QgbnVsbDsgRml4ZXMgIzk1ODdcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIGRlc3RFbGVtZW50c1tpXSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZml4Q2xvbmVOb2RlSXNzdWVzKCBub2RlLCBkZXN0RWxlbWVudHNbaV0gKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENvcHkgdGhlIGV2ZW50cyBmcm9tIHRoZSBvcmlnaW5hbCB0byB0aGUgY2xvbmVcclxuICAgICAgICAgICAgaWYgKCBkYXRhQW5kRXZlbnRzICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBkZWVwRGF0YUFuZEV2ZW50cyApIHtcclxuICAgICAgICAgICAgICAgICAgICBzcmNFbGVtZW50cyA9IHNyY0VsZW1lbnRzIHx8IGdldEFsbCggZWxlbSApO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc3RFbGVtZW50cyA9IGRlc3RFbGVtZW50cyB8fCBnZXRBbGwoIGNsb25lICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoIGkgPSAwOyAobm9kZSA9IHNyY0VsZW1lbnRzW2ldKSAhPSBudWxsOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lQ29weUV2ZW50KCBub2RlLCBkZXN0RWxlbWVudHNbaV0gKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb25lQ29weUV2ZW50KCBlbGVtLCBjbG9uZSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBQcmVzZXJ2ZSBzY3JpcHQgZXZhbHVhdGlvbiBoaXN0b3J5XHJcbiAgICAgICAgICAgIGRlc3RFbGVtZW50cyA9IGdldEFsbCggY2xvbmUsIFwic2NyaXB0XCIgKTtcclxuICAgICAgICAgICAgaWYgKCBkZXN0RWxlbWVudHMubGVuZ3RoID4gMCApIHtcclxuICAgICAgICAgICAgICAgIHNldEdsb2JhbEV2YWwoIGRlc3RFbGVtZW50cywgIWluUGFnZSAmJiBnZXRBbGwoIGVsZW0sIFwic2NyaXB0XCIgKSApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkZXN0RWxlbWVudHMgPSBzcmNFbGVtZW50cyA9IG5vZGUgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBjbG9uZWQgc2V0XHJcbiAgICAgICAgICAgIHJldHVybiBjbG9uZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBidWlsZEZyYWdtZW50OiBmdW5jdGlvbiggZWxlbXMsIGNvbnRleHQsIHNjcmlwdHMsIHNlbGVjdGlvbiApIHtcclxuICAgICAgICAgICAgdmFyIGosIGVsZW0sIGNvbnRhaW5zLFxyXG4gICAgICAgICAgICAgICAgdG1wLCB0YWcsIHRib2R5LCB3cmFwLFxyXG4gICAgICAgICAgICAgICAgbCA9IGVsZW1zLmxlbmd0aCxcclxuXHJcbiAgICAgICAgICAgIC8vIEVuc3VyZSBhIHNhZmUgZnJhZ21lbnRcclxuICAgICAgICAgICAgICAgIHNhZmUgPSBjcmVhdGVTYWZlRnJhZ21lbnQoIGNvbnRleHQgKSxcclxuXHJcbiAgICAgICAgICAgICAgICBub2RlcyA9IFtdLFxyXG4gICAgICAgICAgICAgICAgaSA9IDA7XHJcblxyXG4gICAgICAgICAgICBmb3IgKCA7IGkgPCBsOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtID0gZWxlbXNbIGkgXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIGVsZW0gfHwgZWxlbSA9PT0gMCApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIG5vZGVzIGRpcmVjdGx5XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBqUXVlcnkudHlwZSggZWxlbSApID09PSBcIm9iamVjdFwiICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkubWVyZ2UoIG5vZGVzLCBlbGVtLm5vZGVUeXBlID8gWyBlbGVtIF0gOiBlbGVtICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDb252ZXJ0IG5vbi1odG1sIGludG8gYSB0ZXh0IG5vZGVcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCAhcmh0bWwudGVzdCggZWxlbSApICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2Rlcy5wdXNoKCBjb250ZXh0LmNyZWF0ZVRleHROb2RlKCBlbGVtICkgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENvbnZlcnQgaHRtbCBpbnRvIERPTSBub2Rlc1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IHRtcCB8fCBzYWZlLmFwcGVuZENoaWxkKCBjb250ZXh0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERlc2VyaWFsaXplIGEgc3RhbmRhcmQgcmVwcmVzZW50YXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnID0gKHJ0YWdOYW1lLmV4ZWMoIGVsZW0gKSB8fCBbIFwiXCIsIFwiXCIgXSlbIDEgXS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cmFwID0gd3JhcE1hcFsgdGFnIF0gfHwgd3JhcE1hcC5fZGVmYXVsdDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcC5pbm5lckhUTUwgPSB3cmFwWzFdICsgZWxlbS5yZXBsYWNlKCByeGh0bWxUYWcsIFwiPCQxPjwvJDI+XCIgKSArIHdyYXBbMl07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEZXNjZW5kIHRocm91Z2ggd3JhcHBlcnMgdG8gdGhlIHJpZ2h0IGNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaiA9IHdyYXBbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICggai0tICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gdG1wLmxhc3RDaGlsZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWFudWFsbHkgYWRkIGxlYWRpbmcgd2hpdGVzcGFjZSByZW1vdmVkIGJ5IElFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggIXN1cHBvcnQubGVhZGluZ1doaXRlc3BhY2UgJiYgcmxlYWRpbmdXaGl0ZXNwYWNlLnRlc3QoIGVsZW0gKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVzLnB1c2goIGNvbnRleHQuY3JlYXRlVGV4dE5vZGUoIHJsZWFkaW5nV2hpdGVzcGFjZS5leGVjKCBlbGVtIClbMF0gKSApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgSUUncyBhdXRvaW5zZXJ0ZWQgPHRib2R5PiBmcm9tIHRhYmxlIGZyYWdtZW50c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoICFzdXBwb3J0LnRib2R5ICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN0cmluZyB3YXMgYSA8dGFibGU+LCAqbWF5KiBoYXZlIHNwdXJpb3VzIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0gPSB0YWcgPT09IFwidGFibGVcIiAmJiAhcnRib2R5LnRlc3QoIGVsZW0gKSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wLmZpcnN0Q2hpbGQgOlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdHJpbmcgd2FzIGEgYmFyZSA8dGhlYWQ+IG9yIDx0Zm9vdD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwWzFdID09PSBcIjx0YWJsZT5cIiAmJiAhcnRib2R5LnRlc3QoIGVsZW0gKSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaiA9IGVsZW0gJiYgZWxlbS5jaGlsZE5vZGVzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICggai0tICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggalF1ZXJ5Lm5vZGVOYW1lKCAodGJvZHkgPSBlbGVtLmNoaWxkTm9kZXNbal0pLCBcInRib2R5XCIgKSAmJiAhdGJvZHkuY2hpbGROb2Rlcy5sZW5ndGggKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQ2hpbGQoIHRib2R5ICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkubWVyZ2UoIG5vZGVzLCB0bXAuY2hpbGROb2RlcyApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRml4ICMxMjM5MiBmb3IgV2ViS2l0IGFuZCBJRSA+IDlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wLnRleHRDb250ZW50ID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpeCAjMTIzOTIgZm9yIG9sZElFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICggdG1wLmZpcnN0Q2hpbGQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bXAucmVtb3ZlQ2hpbGQoIHRtcC5maXJzdENoaWxkICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbWVtYmVyIHRoZSB0b3AtbGV2ZWwgY29udGFpbmVyIGZvciBwcm9wZXIgY2xlYW51cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAgPSBzYWZlLmxhc3RDaGlsZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEZpeCAjMTEzNTY6IENsZWFyIGVsZW1lbnRzIGZyb20gZnJhZ21lbnRcclxuICAgICAgICAgICAgaWYgKCB0bXAgKSB7XHJcbiAgICAgICAgICAgICAgICBzYWZlLnJlbW92ZUNoaWxkKCB0bXAgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUmVzZXQgZGVmYXVsdENoZWNrZWQgZm9yIGFueSByYWRpb3MgYW5kIGNoZWNrYm94ZXNcclxuICAgICAgICAgICAgLy8gYWJvdXQgdG8gYmUgYXBwZW5kZWQgdG8gdGhlIERPTSBpbiBJRSA2LzcgKCM4MDYwKVxyXG4gICAgICAgICAgICBpZiAoICFzdXBwb3J0LmFwcGVuZENoZWNrZWQgKSB7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkuZ3JlcCggZ2V0QWxsKCBub2RlcywgXCJpbnB1dFwiICksIGZpeERlZmF1bHRDaGVja2VkICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgICAgICB3aGlsZSAoIChlbGVtID0gbm9kZXNbIGkrKyBdKSApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAjNDA4NyAtIElmIG9yaWdpbiBhbmQgZGVzdGluYXRpb24gZWxlbWVudHMgYXJlIHRoZSBzYW1lLCBhbmQgdGhpcyBpc1xyXG4gICAgICAgICAgICAgICAgLy8gdGhhdCBlbGVtZW50LCBkbyBub3QgZG8gYW55dGhpbmdcclxuICAgICAgICAgICAgICAgIGlmICggc2VsZWN0aW9uICYmIGpRdWVyeS5pbkFycmF5KCBlbGVtLCBzZWxlY3Rpb24gKSAhPT0gLTEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGFpbnMgPSBqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFwcGVuZCB0byBmcmFnbWVudFxyXG4gICAgICAgICAgICAgICAgdG1wID0gZ2V0QWxsKCBzYWZlLmFwcGVuZENoaWxkKCBlbGVtICksIFwic2NyaXB0XCIgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBQcmVzZXJ2ZSBzY3JpcHQgZXZhbHVhdGlvbiBoaXN0b3J5XHJcbiAgICAgICAgICAgICAgICBpZiAoIGNvbnRhaW5zICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEdsb2JhbEV2YWwoIHRtcCApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIENhcHR1cmUgZXhlY3V0YWJsZXNcclxuICAgICAgICAgICAgICAgIGlmICggc2NyaXB0cyApIHtcclxuICAgICAgICAgICAgICAgICAgICBqID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIChlbGVtID0gdG1wWyBqKysgXSkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggcnNjcmlwdFR5cGUudGVzdCggZWxlbS50eXBlIHx8IFwiXCIgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmlwdHMucHVzaCggZWxlbSApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0bXAgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNhZmU7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2xlYW5EYXRhOiBmdW5jdGlvbiggZWxlbXMsIC8qIGludGVybmFsICovIGFjY2VwdERhdGEgKSB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtLCB0eXBlLCBpZCwgZGF0YSxcclxuICAgICAgICAgICAgICAgIGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgaW50ZXJuYWxLZXkgPSBqUXVlcnkuZXhwYW5kbyxcclxuICAgICAgICAgICAgICAgIGNhY2hlID0galF1ZXJ5LmNhY2hlLFxyXG4gICAgICAgICAgICAgICAgZGVsZXRlRXhwYW5kbyA9IHN1cHBvcnQuZGVsZXRlRXhwYW5kbyxcclxuICAgICAgICAgICAgICAgIHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbDtcclxuXHJcbiAgICAgICAgICAgIGZvciAoIDsgKGVsZW0gPSBlbGVtc1tpXSkgIT0gbnVsbDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBhY2NlcHREYXRhIHx8IGpRdWVyeS5hY2NlcHREYXRhKCBlbGVtICkgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlkID0gZWxlbVsgaW50ZXJuYWxLZXkgXTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gaWQgJiYgY2FjaGVbIGlkIF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggZGF0YSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBkYXRhLmV2ZW50cyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoIHR5cGUgaW4gZGF0YS5ldmVudHMgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBzcGVjaWFsWyB0eXBlIF0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC5yZW1vdmUoIGVsZW0sIHR5cGUgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBzaG9ydGN1dCB0byBhdm9pZCBqUXVlcnkuZXZlbnQucmVtb3ZlJ3Mgb3ZlcmhlYWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkucmVtb3ZlRXZlbnQoIGVsZW0sIHR5cGUsIGRhdGEuaGFuZGxlICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgY2FjaGUgb25seSBpZiBpdCB3YXMgbm90IGFscmVhZHkgcmVtb3ZlZCBieSBqUXVlcnkuZXZlbnQucmVtb3ZlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggY2FjaGVbIGlkIF0gKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNhY2hlWyBpZCBdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElFIGRvZXMgbm90IGFsbG93IHVzIHRvIGRlbGV0ZSBleHBhbmRvIHByb3BlcnRpZXMgZnJvbSBub2RlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vciBkb2VzIGl0IGhhdmUgYSByZW1vdmVBdHRyaWJ1dGUgZnVuY3Rpb24gb24gRG9jdW1lbnQgbm9kZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSBtdXN0IGhhbmRsZSBhbGwgb2YgdGhlc2UgY2FzZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZGVsZXRlRXhwYW5kbyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgZWxlbVsgaW50ZXJuYWxLZXkgXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCB0eXBlb2YgZWxlbS5yZW1vdmVBdHRyaWJ1dGUgIT09IHN0cnVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnJlbW92ZUF0dHJpYnV0ZSggaW50ZXJuYWxLZXkgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1bIGludGVybmFsS2V5IF0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZWRJZHMucHVzaCggaWQgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGpRdWVyeS5mbi5leHRlbmQoe1xyXG4gICAgICAgIHRleHQ6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIHZhbHVlICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgP1xyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS50ZXh0KCB0aGlzICkgOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1wdHkoKS5hcHBlbmQoICggdGhpc1swXSAmJiB0aGlzWzBdLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQgKS5jcmVhdGVUZXh0Tm9kZSggdmFsdWUgKSApO1xyXG4gICAgICAgICAgICB9LCBudWxsLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFwcGVuZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRvbU1hbmlwKCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLm5vZGVUeXBlID09PSAxIHx8IHRoaXMubm9kZVR5cGUgPT09IDExIHx8IHRoaXMubm9kZVR5cGUgPT09IDkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IG1hbmlwdWxhdGlvblRhcmdldCggdGhpcywgZWxlbSApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5hcHBlbmRDaGlsZCggZWxlbSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBwcmVwZW5kOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG9tTWFuaXAoIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMubm9kZVR5cGUgPT09IDEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gMTEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gOSApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gbWFuaXB1bGF0aW9uVGFyZ2V0KCB0aGlzLCBlbGVtICk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Lmluc2VydEJlZm9yZSggZWxlbSwgdGFyZ2V0LmZpcnN0Q2hpbGQgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYmVmb3JlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG9tTWFuaXAoIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMucGFyZW50Tm9kZSApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCBlbGVtLCB0aGlzICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFmdGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG9tTWFuaXAoIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMucGFyZW50Tm9kZSApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCBlbGVtLCB0aGlzLm5leHRTaWJsaW5nICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24oIHNlbGVjdG9yLCBrZWVwRGF0YSAvKiBJbnRlcm5hbCBVc2UgT25seSAqLyApIHtcclxuICAgICAgICAgICAgdmFyIGVsZW0sXHJcbiAgICAgICAgICAgICAgICBlbGVtcyA9IHNlbGVjdG9yID8galF1ZXJ5LmZpbHRlciggc2VsZWN0b3IsIHRoaXMgKSA6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBpID0gMDtcclxuXHJcbiAgICAgICAgICAgIGZvciAoIDsgKGVsZW0gPSBlbGVtc1tpXSkgIT0gbnVsbDsgaSsrICkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggIWtlZXBEYXRhICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmNsZWFuRGF0YSggZ2V0QWxsKCBlbGVtICkgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIGVsZW0ucGFyZW50Tm9kZSApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIGtlZXBEYXRhICYmIGpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEdsb2JhbEV2YWwoIGdldEFsbCggZWxlbSwgXCJzY3JpcHRcIiApICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggZWxlbSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBlbXB0eTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtLFxyXG4gICAgICAgICAgICAgICAgaSA9IDA7XHJcblxyXG4gICAgICAgICAgICBmb3IgKCA7IChlbGVtID0gdGhpc1tpXSkgIT0gbnVsbDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGVsZW1lbnQgbm9kZXMgYW5kIHByZXZlbnQgbWVtb3J5IGxlYWtzXHJcbiAgICAgICAgICAgICAgICBpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmNsZWFuRGF0YSggZ2V0QWxsKCBlbGVtLCBmYWxzZSApICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGFueSByZW1haW5pbmcgbm9kZXNcclxuICAgICAgICAgICAgICAgIHdoaWxlICggZWxlbS5maXJzdENoaWxkICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQ2hpbGQoIGVsZW0uZmlyc3RDaGlsZCApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgYSBzZWxlY3QsIGVuc3VyZSB0aGF0IGl0IGRpc3BsYXlzIGVtcHR5ICgjMTIzMzYpXHJcbiAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTw5XHJcbiAgICAgICAgICAgICAgICBpZiAoIGVsZW0ub3B0aW9ucyAmJiBqUXVlcnkubm9kZU5hbWUoIGVsZW0sIFwic2VsZWN0XCIgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLm9wdGlvbnMubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2xvbmU6IGZ1bmN0aW9uKCBkYXRhQW5kRXZlbnRzLCBkZWVwRGF0YUFuZEV2ZW50cyApIHtcclxuICAgICAgICAgICAgZGF0YUFuZEV2ZW50cyA9IGRhdGFBbmRFdmVudHMgPT0gbnVsbCA/IGZhbHNlIDogZGF0YUFuZEV2ZW50cztcclxuICAgICAgICAgICAgZGVlcERhdGFBbmRFdmVudHMgPSBkZWVwRGF0YUFuZEV2ZW50cyA9PSBudWxsID8gZGF0YUFuZEV2ZW50cyA6IGRlZXBEYXRhQW5kRXZlbnRzO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5jbG9uZSggdGhpcywgZGF0YUFuZEV2ZW50cywgZGVlcERhdGFBbmRFdmVudHMgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaHRtbDogZnVuY3Rpb24oIHZhbHVlICkge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggdmFsdWUgKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbSA9IHRoaXNbIDAgXSB8fCB7fSxcclxuICAgICAgICAgICAgICAgICAgICBpID0gMCxcclxuICAgICAgICAgICAgICAgICAgICBsID0gdGhpcy5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCB2YWx1ZSA9PT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLm5vZGVUeXBlID09PSAxID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5pbm5lckhUTUwucmVwbGFjZSggcmlubGluZWpRdWVyeSwgXCJcIiApIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNlZSBpZiB3ZSBjYW4gdGFrZSBhIHNob3J0Y3V0IGFuZCBqdXN0IHVzZSBpbm5lckhUTUxcclxuICAgICAgICAgICAgICAgIGlmICggdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmICFybm9Jbm5lcmh0bWwudGVzdCggdmFsdWUgKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICggc3VwcG9ydC5odG1sU2VyaWFsaXplIHx8ICFybm9zaGltY2FjaGUudGVzdCggdmFsdWUgKSAgKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICggc3VwcG9ydC5sZWFkaW5nV2hpdGVzcGFjZSB8fCAhcmxlYWRpbmdXaGl0ZXNwYWNlLnRlc3QoIHZhbHVlICkgKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICF3cmFwTWFwWyAocnRhZ05hbWUuZXhlYyggdmFsdWUgKSB8fCBbIFwiXCIsIFwiXCIgXSlbIDEgXS50b0xvd2VyQ2FzZSgpIF0gKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSggcnhodG1sVGFnLCBcIjwkMT48LyQyPlwiICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoOyBpIDwgbDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGVsZW1lbnQgbm9kZXMgYW5kIHByZXZlbnQgbWVtb3J5IGxlYWtzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtID0gdGhpc1tpXSB8fCB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIGVsZW0sIGZhbHNlICkgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmlubmVySFRNTCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHVzaW5nIGlubmVySFRNTCB0aHJvd3MgYW4gZXhjZXB0aW9uLCB1c2UgdGhlIGZhbGxiYWNrIG1ldGhvZFxyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2goZSkge31cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIGVsZW0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbXB0eSgpLmFwcGVuZCggdmFsdWUgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgbnVsbCwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZXBsYWNlV2l0aDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBhcmcgPSBhcmd1bWVudHNbIDAgXTtcclxuXHJcbiAgICAgICAgICAgIC8vIE1ha2UgdGhlIGNoYW5nZXMsIHJlcGxhY2luZyBlYWNoIGNvbnRleHQgZWxlbWVudCB3aXRoIHRoZSBuZXcgY29udGVudFxyXG4gICAgICAgICAgICB0aGlzLmRvbU1hbmlwKCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xyXG4gICAgICAgICAgICAgICAgYXJnID0gdGhpcy5wYXJlbnROb2RlO1xyXG5cclxuICAgICAgICAgICAgICAgIGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggdGhpcyApICk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCBhcmcgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJnLnJlcGxhY2VDaGlsZCggZWxlbSwgdGhpcyApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEZvcmNlIHJlbW92YWwgaWYgdGhlcmUgd2FzIG5vIG5ldyBjb250ZW50IChlLmcuLCBmcm9tIGVtcHR5IGFyZ3VtZW50cylcclxuICAgICAgICAgICAgcmV0dXJuIGFyZyAmJiAoYXJnLmxlbmd0aCB8fCBhcmcubm9kZVR5cGUpID8gdGhpcyA6IHRoaXMucmVtb3ZlKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGV0YWNoOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbW92ZSggc2VsZWN0b3IsIHRydWUgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkb21NYW5pcDogZnVuY3Rpb24oIGFyZ3MsIGNhbGxiYWNrICkge1xyXG5cclxuICAgICAgICAgICAgLy8gRmxhdHRlbiBhbnkgbmVzdGVkIGFycmF5c1xyXG4gICAgICAgICAgICBhcmdzID0gY29uY2F0LmFwcGx5KCBbXSwgYXJncyApO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZpcnN0LCBub2RlLCBoYXNTY3JpcHRzLFxyXG4gICAgICAgICAgICAgICAgc2NyaXB0cywgZG9jLCBmcmFnbWVudCxcclxuICAgICAgICAgICAgICAgIGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgbCA9IHRoaXMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgc2V0ID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIGlOb0Nsb25lID0gbCAtIDEsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGFyZ3NbMF0sXHJcbiAgICAgICAgICAgICAgICBpc0Z1bmN0aW9uID0galF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICk7XHJcblxyXG4gICAgICAgICAgICAvLyBXZSBjYW4ndCBjbG9uZU5vZGUgZnJhZ21lbnRzIHRoYXQgY29udGFpbiBjaGVja2VkLCBpbiBXZWJLaXRcclxuICAgICAgICAgICAgaWYgKCBpc0Z1bmN0aW9uIHx8XHJcbiAgICAgICAgICAgICAgICAoIGwgPiAxICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJlxyXG4gICAgICAgICAgICAgICAgIXN1cHBvcnQuY2hlY2tDbG9uZSAmJiByY2hlY2tlZC50ZXN0KCB2YWx1ZSApICkgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCBpbmRleCApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHNldC5lcSggaW5kZXggKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIGlzRnVuY3Rpb24gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3NbMF0gPSB2YWx1ZS5jYWxsKCB0aGlzLCBpbmRleCwgc2VsZi5odG1sKCkgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kb21NYW5pcCggYXJncywgY2FsbGJhY2sgKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIGwgKSB7XHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudCA9IGpRdWVyeS5idWlsZEZyYWdtZW50KCBhcmdzLCB0aGlzWyAwIF0ub3duZXJEb2N1bWVudCwgZmFsc2UsIHRoaXMgKTtcclxuICAgICAgICAgICAgICAgIGZpcnN0ID0gZnJhZ21lbnQuZmlyc3RDaGlsZDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIGZyYWdtZW50LmNoaWxkTm9kZXMubGVuZ3RoID09PSAxICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gZmlyc3Q7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCBmaXJzdCApIHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JpcHRzID0galF1ZXJ5Lm1hcCggZ2V0QWxsKCBmcmFnbWVudCwgXCJzY3JpcHRcIiApLCBkaXNhYmxlU2NyaXB0ICk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzU2NyaXB0cyA9IHNjcmlwdHMubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBVc2UgdGhlIG9yaWdpbmFsIGZyYWdtZW50IGZvciB0aGUgbGFzdCBpdGVtIGluc3RlYWQgb2YgdGhlIGZpcnN0IGJlY2F1c2UgaXQgY2FuIGVuZCB1cFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGJlaW5nIGVtcHRpZWQgaW5jb3JyZWN0bHkgaW4gY2VydGFpbiBzaXR1YXRpb25zICgjODA3MCkuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICggOyBpIDwgbDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gZnJhZ21lbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGkgIT09IGlOb0Nsb25lICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IGpRdWVyeS5jbG9uZSggbm9kZSwgdHJ1ZSwgdHJ1ZSApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEtlZXAgcmVmZXJlbmNlcyB0byBjbG9uZWQgc2NyaXB0cyBmb3IgbGF0ZXIgcmVzdG9yYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggaGFzU2NyaXB0cyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkubWVyZ2UoIHNjcmlwdHMsIGdldEFsbCggbm9kZSwgXCJzY3JpcHRcIiApICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoIHRoaXNbaV0sIG5vZGUsIGkgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggaGFzU2NyaXB0cyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jID0gc2NyaXB0c1sgc2NyaXB0cy5sZW5ndGggLSAxIF0ub3duZXJEb2N1bWVudDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlZW5hYmxlIHNjcmlwdHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5Lm1hcCggc2NyaXB0cywgcmVzdG9yZVNjcmlwdCApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXZhbHVhdGUgZXhlY3V0YWJsZSBzY3JpcHRzIG9uIGZpcnN0IGRvY3VtZW50IGluc2VydGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKCBpID0gMDsgaSA8IGhhc1NjcmlwdHM7IGkrKyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBzY3JpcHRzWyBpIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHJzY3JpcHRUeXBlLnRlc3QoIG5vZGUudHlwZSB8fCBcIlwiICkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhalF1ZXJ5Ll9kYXRhKCBub2RlLCBcImdsb2JhbEV2YWxcIiApICYmIGpRdWVyeS5jb250YWlucyggZG9jLCBub2RlICkgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbm9kZS5zcmMgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9wdGlvbmFsIEFKQVggZGVwZW5kZW5jeSwgYnV0IHdvbid0IHJ1biBzY3JpcHRzIGlmIG5vdCBwcmVzZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggalF1ZXJ5Ll9ldmFsVXJsICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5Ll9ldmFsVXJsKCBub2RlLnNyYyApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5Lmdsb2JhbEV2YWwoICggbm9kZS50ZXh0IHx8IG5vZGUudGV4dENvbnRlbnQgfHwgbm9kZS5pbm5lckhUTUwgfHwgXCJcIiApLnJlcGxhY2UoIHJjbGVhblNjcmlwdCwgXCJcIiApICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBGaXggIzExODA5OiBBdm9pZCBsZWFraW5nIG1lbW9yeVxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gZmlyc3QgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBqUXVlcnkuZWFjaCh7XHJcbiAgICAgICAgYXBwZW5kVG86IFwiYXBwZW5kXCIsXHJcbiAgICAgICAgcHJlcGVuZFRvOiBcInByZXBlbmRcIixcclxuICAgICAgICBpbnNlcnRCZWZvcmU6IFwiYmVmb3JlXCIsXHJcbiAgICAgICAgaW5zZXJ0QWZ0ZXI6IFwiYWZ0ZXJcIixcclxuICAgICAgICByZXBsYWNlQWxsOiBcInJlcGxhY2VXaXRoXCJcclxuICAgIH0sIGZ1bmN0aW9uKCBuYW1lLCBvcmlnaW5hbCApIHtcclxuICAgICAgICBqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcclxuICAgICAgICAgICAgdmFyIGVsZW1zLFxyXG4gICAgICAgICAgICAgICAgaSA9IDAsXHJcbiAgICAgICAgICAgICAgICByZXQgPSBbXSxcclxuICAgICAgICAgICAgICAgIGluc2VydCA9IGpRdWVyeSggc2VsZWN0b3IgKSxcclxuICAgICAgICAgICAgICAgIGxhc3QgPSBpbnNlcnQubGVuZ3RoIC0gMTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoIDsgaSA8PSBsYXN0OyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtcyA9IGkgPT09IGxhc3QgPyB0aGlzIDogdGhpcy5jbG9uZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGpRdWVyeSggaW5zZXJ0W2ldIClbIG9yaWdpbmFsIF0oIGVsZW1zICk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTW9kZXJuIGJyb3dzZXJzIGNhbiBhcHBseSBqUXVlcnkgY29sbGVjdGlvbnMgYXMgYXJyYXlzLCBidXQgb2xkSUUgbmVlZHMgYSAuZ2V0KClcclxuICAgICAgICAgICAgICAgIHB1c2guYXBwbHkoIHJldCwgZWxlbXMuZ2V0KCkgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaFN0YWNrKCByZXQgKTtcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIHZhciBpZnJhbWUsXHJcbiAgICAgICAgZWxlbWRpc3BsYXkgPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlIHRoZSBhY3R1YWwgZGlzcGxheSBvZiBhIGVsZW1lbnRcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIG5vZGVOYW1lIG9mIHRoZSBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZG9jIERvY3VtZW50IG9iamVjdFxyXG4gICAgICovXHJcbi8vIENhbGxlZCBvbmx5IGZyb20gd2l0aGluIGRlZmF1bHREaXNwbGF5XHJcbiAgICBmdW5jdGlvbiBhY3R1YWxEaXNwbGF5KCBuYW1lLCBkb2MgKSB7XHJcbiAgICAgICAgdmFyIHN0eWxlLFxyXG4gICAgICAgICAgICBlbGVtID0galF1ZXJ5KCBkb2MuY3JlYXRlRWxlbWVudCggbmFtZSApICkuYXBwZW5kVG8oIGRvYy5ib2R5ICksXHJcblxyXG4gICAgICAgIC8vIGdldERlZmF1bHRDb21wdXRlZFN0eWxlIG1pZ2h0IGJlIHJlbGlhYmx5IHVzZWQgb25seSBvbiBhdHRhY2hlZCBlbGVtZW50XHJcbiAgICAgICAgICAgIGRpc3BsYXkgPSB3aW5kb3cuZ2V0RGVmYXVsdENvbXB1dGVkU3R5bGUgJiYgKCBzdHlsZSA9IHdpbmRvdy5nZXREZWZhdWx0Q29tcHV0ZWRTdHlsZSggZWxlbVsgMCBdICkgKSA/XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVXNlIG9mIHRoaXMgbWV0aG9kIGlzIGEgdGVtcG9yYXJ5IGZpeCAobW9yZSBsaWtlIG9wdG1pemF0aW9uKSB1bnRpbCBzb21ldGhpbmcgYmV0dGVyIGNvbWVzIGFsb25nLFxyXG4gICAgICAgICAgICAgICAgLy8gc2luY2UgaXQgd2FzIHJlbW92ZWQgZnJvbSBzcGVjaWZpY2F0aW9uIGFuZCBzdXBwb3J0ZWQgb25seSBpbiBGRlxyXG4gICAgICAgICAgICAgICAgc3R5bGUuZGlzcGxheSA6IGpRdWVyeS5jc3MoIGVsZW1bIDAgXSwgXCJkaXNwbGF5XCIgKTtcclxuXHJcbiAgICAgICAgLy8gV2UgZG9uJ3QgaGF2ZSBhbnkgZGF0YSBzdG9yZWQgb24gdGhlIGVsZW1lbnQsXHJcbiAgICAgICAgLy8gc28gdXNlIFwiZGV0YWNoXCIgbWV0aG9kIGFzIGZhc3Qgd2F5IHRvIGdldCByaWQgb2YgdGhlIGVsZW1lbnRcclxuICAgICAgICBlbGVtLmRldGFjaCgpO1xyXG5cclxuICAgICAgICByZXR1cm4gZGlzcGxheTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyeSB0byBkZXRlcm1pbmUgdGhlIGRlZmF1bHQgZGlzcGxheSB2YWx1ZSBvZiBhbiBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbm9kZU5hbWVcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZGVmYXVsdERpc3BsYXkoIG5vZGVOYW1lICkge1xyXG4gICAgICAgIHZhciBkb2MgPSBkb2N1bWVudCxcclxuICAgICAgICAgICAgZGlzcGxheSA9IGVsZW1kaXNwbGF5WyBub2RlTmFtZSBdO1xyXG5cclxuICAgICAgICBpZiAoICFkaXNwbGF5ICkge1xyXG4gICAgICAgICAgICBkaXNwbGF5ID0gYWN0dWFsRGlzcGxheSggbm9kZU5hbWUsIGRvYyApO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgdGhlIHNpbXBsZSB3YXkgZmFpbHMsIHJlYWQgZnJvbSBpbnNpZGUgYW4gaWZyYW1lXHJcbiAgICAgICAgICAgIGlmICggZGlzcGxheSA9PT0gXCJub25lXCIgfHwgIWRpc3BsYXkgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVXNlIHRoZSBhbHJlYWR5LWNyZWF0ZWQgaWZyYW1lIGlmIHBvc3NpYmxlXHJcbiAgICAgICAgICAgICAgICBpZnJhbWUgPSAoaWZyYW1lIHx8IGpRdWVyeSggXCI8aWZyYW1lIGZyYW1lYm9yZGVyPScwJyB3aWR0aD0nMCcgaGVpZ2h0PScwJy8+XCIgKSkuYXBwZW5kVG8oIGRvYy5kb2N1bWVudEVsZW1lbnQgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBbHdheXMgd3JpdGUgYSBuZXcgSFRNTCBza2VsZXRvbiBzbyBXZWJraXQgYW5kIEZpcmVmb3ggZG9uJ3QgY2hva2Ugb24gcmV1c2VcclxuICAgICAgICAgICAgICAgIGRvYyA9ICggaWZyYW1lWyAwIF0uY29udGVudFdpbmRvdyB8fCBpZnJhbWVbIDAgXS5jb250ZW50RG9jdW1lbnQgKS5kb2N1bWVudDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRVxyXG4gICAgICAgICAgICAgICAgZG9jLndyaXRlKCk7XHJcbiAgICAgICAgICAgICAgICBkb2MuY2xvc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5ID0gYWN0dWFsRGlzcGxheSggbm9kZU5hbWUsIGRvYyApO1xyXG4gICAgICAgICAgICAgICAgaWZyYW1lLmRldGFjaCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTdG9yZSB0aGUgY29ycmVjdCBkZWZhdWx0IGRpc3BsYXlcclxuICAgICAgICAgICAgZWxlbWRpc3BsYXlbIG5vZGVOYW1lIF0gPSBkaXNwbGF5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRpc3BsYXk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc2hyaW5rV3JhcEJsb2Nrc1ZhbDtcclxuXHJcbiAgICAgICAgc3VwcG9ydC5zaHJpbmtXcmFwQmxvY2tzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICggc2hyaW5rV3JhcEJsb2Nrc1ZhbCAhPSBudWxsICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNocmlua1dyYXBCbG9ja3NWYWw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFdpbGwgYmUgY2hhbmdlZCBsYXRlciBpZiBuZWVkZWQuXHJcbiAgICAgICAgICAgIHNocmlua1dyYXBCbG9ja3NWYWwgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIE1pbmlmaWVkOiB2YXIgYixjLGRcclxuICAgICAgICAgICAgdmFyIGRpdiwgYm9keSwgY29udGFpbmVyO1xyXG5cclxuICAgICAgICAgICAgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCBcImJvZHlcIiApWyAwIF07XHJcbiAgICAgICAgICAgIGlmICggIWJvZHkgfHwgIWJvZHkuc3R5bGUgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUZXN0IGZpcmVkIHRvbyBlYXJseSBvciBpbiBhbiB1bnN1cHBvcnRlZCBlbnZpcm9ubWVudCwgZXhpdC5cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU2V0dXBcclxuICAgICAgICAgICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xyXG4gICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gXCJwb3NpdGlvbjphYnNvbHV0ZTtib3JkZXI6MDt3aWR0aDowO2hlaWdodDowO3RvcDowO2xlZnQ6LTk5OTlweFwiO1xyXG4gICAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKCBjb250YWluZXIgKS5hcHBlbmRDaGlsZCggZGl2ICk7XHJcblxyXG4gICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTZcclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgZWxlbWVudHMgd2l0aCBsYXlvdXQgc2hyaW5rLXdyYXAgdGhlaXIgY2hpbGRyZW5cclxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgZGl2LnN0eWxlLnpvb20gIT09IHN0cnVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgIC8vIFJlc2V0IENTUzogYm94LXNpemluZzsgZGlzcGxheTsgbWFyZ2luOyBib3JkZXJcclxuICAgICAgICAgICAgICAgIGRpdi5zdHlsZS5jc3NUZXh0ID1cclxuICAgICAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBGaXJlZm94PDI5LCBBbmRyb2lkIDIuM1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFZlbmRvci1wcmVmaXggYm94LXNpemluZ1xyXG4gICAgICAgICAgICAgICAgICAgIFwiLXdlYmtpdC1ib3gtc2l6aW5nOmNvbnRlbnQtYm94Oy1tb3otYm94LXNpemluZzpjb250ZW50LWJveDtcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgXCJib3gtc2l6aW5nOmNvbnRlbnQtYm94O2Rpc3BsYXk6YmxvY2s7bWFyZ2luOjA7Ym9yZGVyOjA7XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwicGFkZGluZzoxcHg7d2lkdGg6MXB4O3pvb206MVwiO1xyXG4gICAgICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICkgKS5zdHlsZS53aWR0aCA9IFwiNXB4XCI7XHJcbiAgICAgICAgICAgICAgICBzaHJpbmtXcmFwQmxvY2tzVmFsID0gZGl2Lm9mZnNldFdpZHRoICE9PSAzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBib2R5LnJlbW92ZUNoaWxkKCBjb250YWluZXIgKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzaHJpbmtXcmFwQmxvY2tzVmFsO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgfSkoKTtcclxuICAgIHZhciBybWFyZ2luID0gKC9ebWFyZ2luLyk7XHJcblxyXG4gICAgdmFyIHJudW1ub25weCA9IG5ldyBSZWdFeHAoIFwiXihcIiArIHBudW0gKyBcIikoPyFweClbYS16JV0rJFwiLCBcImlcIiApO1xyXG5cclxuXHJcblxyXG4gICAgdmFyIGdldFN0eWxlcywgY3VyQ1NTLFxyXG4gICAgICAgIHJwb3NpdGlvbiA9IC9eKHRvcHxyaWdodHxib3R0b218bGVmdCkkLztcclxuXHJcbiAgICBpZiAoIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlICkge1xyXG4gICAgICAgIGdldFN0eWxlcyA9IGZ1bmN0aW9uKCBlbGVtICkge1xyXG4gICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTw9MTErLCBGaXJlZm94PD0zMCsgKCMxNTA5OCwgIzE0MTUwKVxyXG4gICAgICAgICAgICAvLyBJRSB0aHJvd3Mgb24gZWxlbWVudHMgY3JlYXRlZCBpbiBwb3B1cHNcclxuICAgICAgICAgICAgLy8gRkYgbWVhbndoaWxlIHRocm93cyBvbiBmcmFtZSBlbGVtZW50cyB0aHJvdWdoIFwiZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZVwiXHJcbiAgICAgICAgICAgIGlmICggZWxlbS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3Lm9wZW5lciApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZSggZWxlbSwgbnVsbCApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoIGVsZW0sIG51bGwgKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjdXJDU1MgPSBmdW5jdGlvbiggZWxlbSwgbmFtZSwgY29tcHV0ZWQgKSB7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aCwgbWluV2lkdGgsIG1heFdpZHRoLCByZXQsXHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IGVsZW0uc3R5bGU7XHJcblxyXG4gICAgICAgICAgICBjb21wdXRlZCA9IGNvbXB1dGVkIHx8IGdldFN0eWxlcyggZWxlbSApO1xyXG5cclxuICAgICAgICAgICAgLy8gZ2V0UHJvcGVydHlWYWx1ZSBpcyBvbmx5IG5lZWRlZCBmb3IgLmNzcygnZmlsdGVyJykgaW4gSUU5LCBzZWUgIzEyNTM3XHJcbiAgICAgICAgICAgIHJldCA9IGNvbXB1dGVkID8gY29tcHV0ZWQuZ2V0UHJvcGVydHlWYWx1ZSggbmFtZSApIHx8IGNvbXB1dGVkWyBuYW1lIF0gOiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoIGNvbXB1dGVkICkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggcmV0ID09PSBcIlwiICYmICFqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldCA9IGpRdWVyeS5zdHlsZSggZWxlbSwgbmFtZSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEEgdHJpYnV0ZSB0byB0aGUgXCJhd2Vzb21lIGhhY2sgYnkgRGVhbiBFZHdhcmRzXCJcclxuICAgICAgICAgICAgICAgIC8vIENocm9tZSA8IDE3IGFuZCBTYWZhcmkgNS4wIHVzZXMgXCJjb21wdXRlZCB2YWx1ZVwiIGluc3RlYWQgb2YgXCJ1c2VkIHZhbHVlXCIgZm9yIG1hcmdpbi1yaWdodFxyXG4gICAgICAgICAgICAgICAgLy8gU2FmYXJpIDUuMS43IChhdCBsZWFzdCkgcmV0dXJucyBwZXJjZW50YWdlIGZvciBhIGxhcmdlciBzZXQgb2YgdmFsdWVzLCBidXQgd2lkdGggc2VlbXMgdG8gYmUgcmVsaWFibHkgcGl4ZWxzXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGFnYWluc3QgdGhlIENTU09NIGRyYWZ0IHNwZWM6IGh0dHA6Ly9kZXYudzMub3JnL2Nzc3dnL2Nzc29tLyNyZXNvbHZlZC12YWx1ZXNcclxuICAgICAgICAgICAgICAgIGlmICggcm51bW5vbnB4LnRlc3QoIHJldCApICYmIHJtYXJnaW4udGVzdCggbmFtZSApICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBSZW1lbWJlciB0aGUgb3JpZ2luYWwgdmFsdWVzXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGggPSBzdHlsZS53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBtaW5XaWR0aCA9IHN0eWxlLm1pbldpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFdpZHRoID0gc3R5bGUubWF4V2lkdGg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFB1dCBpbiB0aGUgbmV3IHZhbHVlcyB0byBnZXQgYSBjb21wdXRlZCB2YWx1ZSBvdXRcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZS5taW5XaWR0aCA9IHN0eWxlLm1heFdpZHRoID0gc3R5bGUud2lkdGggPSByZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gY29tcHV0ZWQud2lkdGg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldmVydCB0aGUgY2hhbmdlZCB2YWx1ZXNcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZS53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlLm1pbldpZHRoID0gbWluV2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUubWF4V2lkdGggPSBtYXhXaWR0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU3VwcG9ydDogSUVcclxuICAgICAgICAgICAgLy8gSUUgcmV0dXJucyB6SW5kZXggdmFsdWUgYXMgYW4gaW50ZWdlci5cclxuICAgICAgICAgICAgcmV0dXJuIHJldCA9PT0gdW5kZWZpbmVkID9cclxuICAgICAgICAgICAgICAgIHJldCA6XHJcbiAgICAgICAgICAgIHJldCArIFwiXCI7XHJcbiAgICAgICAgfTtcclxuICAgIH0gZWxzZSBpZiAoIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jdXJyZW50U3R5bGUgKSB7XHJcbiAgICAgICAgZ2V0U3R5bGVzID0gZnVuY3Rpb24oIGVsZW0gKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtLmN1cnJlbnRTdHlsZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjdXJDU1MgPSBmdW5jdGlvbiggZWxlbSwgbmFtZSwgY29tcHV0ZWQgKSB7XHJcbiAgICAgICAgICAgIHZhciBsZWZ0LCBycywgcnNMZWZ0LCByZXQsXHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IGVsZW0uc3R5bGU7XHJcblxyXG4gICAgICAgICAgICBjb21wdXRlZCA9IGNvbXB1dGVkIHx8IGdldFN0eWxlcyggZWxlbSApO1xyXG4gICAgICAgICAgICByZXQgPSBjb21wdXRlZCA/IGNvbXB1dGVkWyBuYW1lIF0gOiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAvLyBBdm9pZCBzZXR0aW5nIHJldCB0byBlbXB0eSBzdHJpbmcgaGVyZVxyXG4gICAgICAgICAgICAvLyBzbyB3ZSBkb24ndCBkZWZhdWx0IHRvIGF1dG9cclxuICAgICAgICAgICAgaWYgKCByZXQgPT0gbnVsbCAmJiBzdHlsZSAmJiBzdHlsZVsgbmFtZSBdICkge1xyXG4gICAgICAgICAgICAgICAgcmV0ID0gc3R5bGVbIG5hbWUgXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRnJvbSB0aGUgYXdlc29tZSBoYWNrIGJ5IERlYW4gRWR3YXJkc1xyXG4gICAgICAgICAgICAvLyBodHRwOi8vZXJpay5lYWUubmV0L2FyY2hpdmVzLzIwMDcvMDcvMjcvMTguNTQuMTUvI2NvbW1lbnQtMTAyMjkxXHJcblxyXG4gICAgICAgICAgICAvLyBJZiB3ZSdyZSBub3QgZGVhbGluZyB3aXRoIGEgcmVndWxhciBwaXhlbCBudW1iZXJcclxuICAgICAgICAgICAgLy8gYnV0IGEgbnVtYmVyIHRoYXQgaGFzIGEgd2VpcmQgZW5kaW5nLCB3ZSBuZWVkIHRvIGNvbnZlcnQgaXQgdG8gcGl4ZWxzXHJcbiAgICAgICAgICAgIC8vIGJ1dCBub3QgcG9zaXRpb24gY3NzIGF0dHJpYnV0ZXMsIGFzIHRob3NlIGFyZSBwcm9wb3J0aW9uYWwgdG8gdGhlIHBhcmVudCBlbGVtZW50IGluc3RlYWRcclxuICAgICAgICAgICAgLy8gYW5kIHdlIGNhbid0IG1lYXN1cmUgdGhlIHBhcmVudCBpbnN0ZWFkIGJlY2F1c2UgaXQgbWlnaHQgdHJpZ2dlciBhIFwic3RhY2tpbmcgZG9sbHNcIiBwcm9ibGVtXHJcbiAgICAgICAgICAgIGlmICggcm51bW5vbnB4LnRlc3QoIHJldCApICYmICFycG9zaXRpb24udGVzdCggbmFtZSApICkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlbWVtYmVyIHRoZSBvcmlnaW5hbCB2YWx1ZXNcclxuICAgICAgICAgICAgICAgIGxlZnQgPSBzdHlsZS5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgcnMgPSBlbGVtLnJ1bnRpbWVTdHlsZTtcclxuICAgICAgICAgICAgICAgIHJzTGVmdCA9IHJzICYmIHJzLmxlZnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUHV0IGluIHRoZSBuZXcgdmFsdWVzIHRvIGdldCBhIGNvbXB1dGVkIHZhbHVlIG91dFxyXG4gICAgICAgICAgICAgICAgaWYgKCByc0xlZnQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcnMubGVmdCA9IGVsZW0uY3VycmVudFN0eWxlLmxlZnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdHlsZS5sZWZ0ID0gbmFtZSA9PT0gXCJmb250U2l6ZVwiID8gXCIxZW1cIiA6IHJldDtcclxuICAgICAgICAgICAgICAgIHJldCA9IHN0eWxlLnBpeGVsTGVmdCArIFwicHhcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZXZlcnQgdGhlIGNoYW5nZWQgdmFsdWVzXHJcbiAgICAgICAgICAgICAgICBzdHlsZS5sZWZ0ID0gbGVmdDtcclxuICAgICAgICAgICAgICAgIGlmICggcnNMZWZ0ICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJzLmxlZnQgPSByc0xlZnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFXHJcbiAgICAgICAgICAgIC8vIElFIHJldHVybnMgekluZGV4IHZhbHVlIGFzIGFuIGludGVnZXIuXHJcbiAgICAgICAgICAgIHJldHVybiByZXQgPT09IHVuZGVmaW5lZCA/XHJcbiAgICAgICAgICAgICAgICByZXQgOlxyXG4gICAgICAgICAgICByZXQgKyBcIlwiIHx8IFwiYXV0b1wiO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gYWRkR2V0SG9va0lmKCBjb25kaXRpb25GbiwgaG9va0ZuICkge1xyXG4gICAgICAgIC8vIERlZmluZSB0aGUgaG9vaywgd2UnbGwgY2hlY2sgb24gdGhlIGZpcnN0IHJ1biBpZiBpdCdzIHJlYWxseSBuZWVkZWQuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb25kaXRpb24gPSBjb25kaXRpb25GbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggY29uZGl0aW9uID09IG51bGwgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHRlc3Qgd2FzIG5vdCByZWFkeSBhdCB0aGlzIHBvaW50OyBzY3JldyB0aGUgaG9vayB0aGlzIHRpbWVcclxuICAgICAgICAgICAgICAgICAgICAvLyBidXQgY2hlY2sgYWdhaW4gd2hlbiBuZWVkZWQgbmV4dCB0aW1lLlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIGNvbmRpdGlvbiApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBIb29rIG5vdCBuZWVkZWQgKG9yIGl0J3Mgbm90IHBvc3NpYmxlIHRvIHVzZSBpdCBkdWUgdG8gbWlzc2luZyBkZXBlbmRlbmN5KSxcclxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgaXQuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2luY2UgdGhlcmUgYXJlIG5vIG90aGVyIGhvb2tzIGZvciBtYXJnaW5SaWdodCwgcmVtb3ZlIHRoZSB3aG9sZSBvYmplY3QuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZ2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBIb29rIG5lZWRlZDsgcmVkZWZpbmUgaXQgc28gdGhhdCB0aGUgc3VwcG9ydCB0ZXN0IGlzIG5vdCBleGVjdXRlZCBhZ2Fpbi5cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuZ2V0ID0gaG9va0ZuKS5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gTWluaWZpZWQ6IHZhciBiLGMsZCxlLGYsZywgaCxpXHJcbiAgICAgICAgdmFyIGRpdiwgc3R5bGUsIGEsIHBpeGVsUG9zaXRpb25WYWwsIGJveFNpemluZ1JlbGlhYmxlVmFsLFxyXG4gICAgICAgICAgICByZWxpYWJsZUhpZGRlbk9mZnNldHNWYWwsIHJlbGlhYmxlTWFyZ2luUmlnaHRWYWw7XHJcblxyXG4gICAgICAgIC8vIFNldHVwXHJcbiAgICAgICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xyXG4gICAgICAgIGRpdi5pbm5lckhUTUwgPSBcIiAgPGxpbmsvPjx0YWJsZT48L3RhYmxlPjxhIGhyZWY9Jy9hJz5hPC9hPjxpbnB1dCB0eXBlPSdjaGVja2JveCcvPlwiO1xyXG4gICAgICAgIGEgPSBkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwiYVwiIClbIDAgXTtcclxuICAgICAgICBzdHlsZSA9IGEgJiYgYS5zdHlsZTtcclxuXHJcbiAgICAgICAgLy8gRmluaXNoIGVhcmx5IGluIGxpbWl0ZWQgKG5vbi1icm93c2VyKSBlbnZpcm9ubWVudHNcclxuICAgICAgICBpZiAoICFzdHlsZSApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3R5bGUuY3NzVGV4dCA9IFwiZmxvYXQ6bGVmdDtvcGFjaXR5Oi41XCI7XHJcblxyXG4gICAgICAgIC8vIFN1cHBvcnQ6IElFPDlcclxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCBlbGVtZW50IG9wYWNpdHkgZXhpc3RzIChhcyBvcHBvc2VkIHRvIGZpbHRlcilcclxuICAgICAgICBzdXBwb3J0Lm9wYWNpdHkgPSBzdHlsZS5vcGFjaXR5ID09PSBcIjAuNVwiO1xyXG5cclxuICAgICAgICAvLyBWZXJpZnkgc3R5bGUgZmxvYXQgZXhpc3RlbmNlXHJcbiAgICAgICAgLy8gKElFIHVzZXMgc3R5bGVGbG9hdCBpbnN0ZWFkIG9mIGNzc0Zsb2F0KVxyXG4gICAgICAgIHN1cHBvcnQuY3NzRmxvYXQgPSAhIXN0eWxlLmNzc0Zsb2F0O1xyXG5cclxuICAgICAgICBkaXYuc3R5bGUuYmFja2dyb3VuZENsaXAgPSBcImNvbnRlbnQtYm94XCI7XHJcbiAgICAgICAgZGl2LmNsb25lTm9kZSggdHJ1ZSApLnN0eWxlLmJhY2tncm91bmRDbGlwID0gXCJcIjtcclxuICAgICAgICBzdXBwb3J0LmNsZWFyQ2xvbmVTdHlsZSA9IGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ2xpcCA9PT0gXCJjb250ZW50LWJveFwiO1xyXG5cclxuICAgICAgICAvLyBTdXBwb3J0OiBGaXJlZm94PDI5LCBBbmRyb2lkIDIuM1xyXG4gICAgICAgIC8vIFZlbmRvci1wcmVmaXggYm94LXNpemluZ1xyXG4gICAgICAgIHN1cHBvcnQuYm94U2l6aW5nID0gc3R5bGUuYm94U2l6aW5nID09PSBcIlwiIHx8IHN0eWxlLk1vekJveFNpemluZyA9PT0gXCJcIiB8fFxyXG4gICAgICAgIHN0eWxlLldlYmtpdEJveFNpemluZyA9PT0gXCJcIjtcclxuXHJcbiAgICAgICAgalF1ZXJ5LmV4dGVuZChzdXBwb3J0LCB7XHJcbiAgICAgICAgICAgIHJlbGlhYmxlSGlkZGVuT2Zmc2V0czogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIHJlbGlhYmxlSGlkZGVuT2Zmc2V0c1ZhbCA9PSBudWxsICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXB1dGVTdHlsZVRlc3RzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVsaWFibGVIaWRkZW5PZmZzZXRzVmFsO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgYm94U2l6aW5nUmVsaWFibGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBib3hTaXppbmdSZWxpYWJsZVZhbCA9PSBudWxsICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXB1dGVTdHlsZVRlc3RzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYm94U2l6aW5nUmVsaWFibGVWYWw7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBwaXhlbFBvc2l0aW9uOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICggcGl4ZWxQb3NpdGlvblZhbCA9PSBudWxsICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXB1dGVTdHlsZVRlc3RzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGl4ZWxQb3NpdGlvblZhbDtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8vIFN1cHBvcnQ6IEFuZHJvaWQgMi4zXHJcbiAgICAgICAgICAgIHJlbGlhYmxlTWFyZ2luUmlnaHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCByZWxpYWJsZU1hcmdpblJpZ2h0VmFsID09IG51bGwgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcHV0ZVN0eWxlVGVzdHMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZWxpYWJsZU1hcmdpblJpZ2h0VmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNvbXB1dGVTdHlsZVRlc3RzKCkge1xyXG4gICAgICAgICAgICAvLyBNaW5pZmllZDogdmFyIGIsYyxkLGpcclxuICAgICAgICAgICAgdmFyIGRpdiwgYm9keSwgY29udGFpbmVyLCBjb250ZW50cztcclxuXHJcbiAgICAgICAgICAgIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCJib2R5XCIgKVsgMCBdO1xyXG4gICAgICAgICAgICBpZiAoICFib2R5IHx8ICFib2R5LnN0eWxlICkge1xyXG4gICAgICAgICAgICAgICAgLy8gVGVzdCBmaXJlZCB0b28gZWFybHkgb3IgaW4gYW4gdW5zdXBwb3J0ZWQgZW52aXJvbm1lbnQsIGV4aXQuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFNldHVwXHJcbiAgICAgICAgICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKTtcclxuICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xyXG4gICAgICAgICAgICBjb250YWluZXIuc3R5bGUuY3NzVGV4dCA9IFwicG9zaXRpb246YWJzb2x1dGU7Ym9yZGVyOjA7d2lkdGg6MDtoZWlnaHQ6MDt0b3A6MDtsZWZ0Oi05OTk5cHhcIjtcclxuICAgICAgICAgICAgYm9keS5hcHBlbmRDaGlsZCggY29udGFpbmVyICkuYXBwZW5kQ2hpbGQoIGRpdiApO1xyXG5cclxuICAgICAgICAgICAgZGl2LnN0eWxlLmNzc1RleHQgPVxyXG4gICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogRmlyZWZveDwyOSwgQW5kcm9pZCAyLjNcclxuICAgICAgICAgICAgICAgIC8vIFZlbmRvci1wcmVmaXggYm94LXNpemluZ1xyXG4gICAgICAgICAgICAgICAgXCItd2Via2l0LWJveC1zaXppbmc6Ym9yZGVyLWJveDstbW96LWJveC1zaXppbmc6Ym9yZGVyLWJveDtcIiArXHJcbiAgICAgICAgICAgICAgICBcImJveC1zaXppbmc6Ym9yZGVyLWJveDtkaXNwbGF5OmJsb2NrO21hcmdpbi10b3A6MSU7dG9wOjElO1wiICtcclxuICAgICAgICAgICAgICAgIFwiYm9yZGVyOjFweDtwYWRkaW5nOjFweDt3aWR0aDo0cHg7cG9zaXRpb246YWJzb2x1dGVcIjtcclxuXHJcbiAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFPDlcclxuICAgICAgICAgICAgLy8gQXNzdW1lIHJlYXNvbmFibGUgdmFsdWVzIGluIHRoZSBhYnNlbmNlIG9mIGdldENvbXB1dGVkU3R5bGVcclxuICAgICAgICAgICAgcGl4ZWxQb3NpdGlvblZhbCA9IGJveFNpemluZ1JlbGlhYmxlVmFsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJlbGlhYmxlTWFyZ2luUmlnaHRWYWwgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIGdldENvbXB1dGVkU3R5bGUgc28gdGhhdCB0aGlzIGNvZGUgaXMgbm90IHJ1biBpbiBJRTw5LlxyXG4gICAgICAgICAgICBpZiAoIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlICkge1xyXG4gICAgICAgICAgICAgICAgcGl4ZWxQb3NpdGlvblZhbCA9ICggd2luZG93LmdldENvbXB1dGVkU3R5bGUoIGRpdiwgbnVsbCApIHx8IHt9ICkudG9wICE9PSBcIjElXCI7XHJcbiAgICAgICAgICAgICAgICBib3hTaXppbmdSZWxpYWJsZVZhbCA9XHJcbiAgICAgICAgICAgICAgICAgICAgKCB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSggZGl2LCBudWxsICkgfHwgeyB3aWR0aDogXCI0cHhcIiB9ICkud2lkdGggPT09IFwiNHB4XCI7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogQW5kcm9pZCAyLjNcclxuICAgICAgICAgICAgICAgIC8vIERpdiB3aXRoIGV4cGxpY2l0IHdpZHRoIGFuZCBubyBtYXJnaW4tcmlnaHQgaW5jb3JyZWN0bHlcclxuICAgICAgICAgICAgICAgIC8vIGdldHMgY29tcHV0ZWQgbWFyZ2luLXJpZ2h0IGJhc2VkIG9uIHdpZHRoIG9mIGNvbnRhaW5lciAoIzMzMzMpXHJcbiAgICAgICAgICAgICAgICAvLyBXZWJLaXQgQnVnIDEzMzQzIC0gZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIHdyb25nIHZhbHVlIGZvciBtYXJnaW4tcmlnaHRcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRzID0gZGl2LmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICkgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZXNldCBDU1M6IGJveC1zaXppbmc7IGRpc3BsYXk7IG1hcmdpbjsgYm9yZGVyOyBwYWRkaW5nXHJcbiAgICAgICAgICAgICAgICBjb250ZW50cy5zdHlsZS5jc3NUZXh0ID0gZGl2LnN0eWxlLmNzc1RleHQgPVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IEZpcmVmb3g8MjksIEFuZHJvaWQgMi4zXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVmVuZG9yLXByZWZpeCBib3gtc2l6aW5nXHJcbiAgICAgICAgICAgICAgICAgICAgXCItd2Via2l0LWJveC1zaXppbmc6Y29udGVudC1ib3g7LW1vei1ib3gtc2l6aW5nOmNvbnRlbnQtYm94O1wiICtcclxuICAgICAgICAgICAgICAgICAgICBcImJveC1zaXppbmc6Y29udGVudC1ib3g7ZGlzcGxheTpibG9jazttYXJnaW46MDtib3JkZXI6MDtwYWRkaW5nOjBcIjtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRzLnN0eWxlLm1hcmdpblJpZ2h0ID0gY29udGVudHMuc3R5bGUud2lkdGggPSBcIjBcIjtcclxuICAgICAgICAgICAgICAgIGRpdi5zdHlsZS53aWR0aCA9IFwiMXB4XCI7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVsaWFibGVNYXJnaW5SaWdodFZhbCA9XHJcbiAgICAgICAgICAgICAgICAgICAgIXBhcnNlRmxvYXQoICggd2luZG93LmdldENvbXB1dGVkU3R5bGUoIGNvbnRlbnRzLCBudWxsICkgfHwge30gKS5tYXJnaW5SaWdodCApO1xyXG5cclxuICAgICAgICAgICAgICAgIGRpdi5yZW1vdmVDaGlsZCggY29udGVudHMgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU4XHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHRhYmxlIGNlbGxzIHN0aWxsIGhhdmUgb2Zmc2V0V2lkdGgvSGVpZ2h0IHdoZW4gdGhleSBhcmUgc2V0XHJcbiAgICAgICAgICAgIC8vIHRvIGRpc3BsYXk6bm9uZSBhbmQgdGhlcmUgYXJlIHN0aWxsIG90aGVyIHZpc2libGUgdGFibGUgY2VsbHMgaW4gYVxyXG4gICAgICAgICAgICAvLyB0YWJsZSByb3c7IGlmIHNvLCBvZmZzZXRXaWR0aC9IZWlnaHQgYXJlIG5vdCByZWxpYWJsZSBmb3IgdXNlIHdoZW5cclxuICAgICAgICAgICAgLy8gZGV0ZXJtaW5pbmcgaWYgYW4gZWxlbWVudCBoYXMgYmVlbiBoaWRkZW4gZGlyZWN0bHkgdXNpbmdcclxuICAgICAgICAgICAgLy8gZGlzcGxheTpub25lIChpdCBpcyBzdGlsbCBzYWZlIHRvIHVzZSBvZmZzZXRzIGlmIGEgcGFyZW50IGVsZW1lbnQgaXNcclxuICAgICAgICAgICAgLy8gaGlkZGVuOyBkb24gc2FmZXR5IGdvZ2dsZXMgYW5kIHNlZSBidWcgIzQ1MTIgZm9yIG1vcmUgaW5mb3JtYXRpb24pLlxyXG4gICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gXCI8dGFibGU+PHRyPjx0ZD48L3RkPjx0ZD50PC90ZD48L3RyPjwvdGFibGU+XCI7XHJcbiAgICAgICAgICAgIGNvbnRlbnRzID0gZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKCBcInRkXCIgKTtcclxuICAgICAgICAgICAgY29udGVudHNbIDAgXS5zdHlsZS5jc3NUZXh0ID0gXCJtYXJnaW46MDtib3JkZXI6MDtwYWRkaW5nOjA7ZGlzcGxheTpub25lXCI7XHJcbiAgICAgICAgICAgIHJlbGlhYmxlSGlkZGVuT2Zmc2V0c1ZhbCA9IGNvbnRlbnRzWyAwIF0ub2Zmc2V0SGVpZ2h0ID09PSAwO1xyXG4gICAgICAgICAgICBpZiAoIHJlbGlhYmxlSGlkZGVuT2Zmc2V0c1ZhbCApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRzWyAwIF0uc3R5bGUuZGlzcGxheSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50c1sgMSBdLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgIHJlbGlhYmxlSGlkZGVuT2Zmc2V0c1ZhbCA9IGNvbnRlbnRzWyAwIF0ub2Zmc2V0SGVpZ2h0ID09PSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBib2R5LnJlbW92ZUNoaWxkKCBjb250YWluZXIgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSkoKTtcclxuXHJcblxyXG4vLyBBIG1ldGhvZCBmb3IgcXVpY2tseSBzd2FwcGluZyBpbi9vdXQgQ1NTIHByb3BlcnRpZXMgdG8gZ2V0IGNvcnJlY3QgY2FsY3VsYXRpb25zLlxyXG4gICAgalF1ZXJ5LnN3YXAgPSBmdW5jdGlvbiggZWxlbSwgb3B0aW9ucywgY2FsbGJhY2ssIGFyZ3MgKSB7XHJcbiAgICAgICAgdmFyIHJldCwgbmFtZSxcclxuICAgICAgICAgICAgb2xkID0ge307XHJcblxyXG4gICAgICAgIC8vIFJlbWVtYmVyIHRoZSBvbGQgdmFsdWVzLCBhbmQgaW5zZXJ0IHRoZSBuZXcgb25lc1xyXG4gICAgICAgIGZvciAoIG5hbWUgaW4gb3B0aW9ucyApIHtcclxuICAgICAgICAgICAgb2xkWyBuYW1lIF0gPSBlbGVtLnN0eWxlWyBuYW1lIF07XHJcbiAgICAgICAgICAgIGVsZW0uc3R5bGVbIG5hbWUgXSA9IG9wdGlvbnNbIG5hbWUgXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldCA9IGNhbGxiYWNrLmFwcGx5KCBlbGVtLCBhcmdzIHx8IFtdICk7XHJcblxyXG4gICAgICAgIC8vIFJldmVydCB0aGUgb2xkIHZhbHVlc1xyXG4gICAgICAgIGZvciAoIG5hbWUgaW4gb3B0aW9ucyApIHtcclxuICAgICAgICAgICAgZWxlbS5zdHlsZVsgbmFtZSBdID0gb2xkWyBuYW1lIF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdmFyXHJcbiAgICAgICAgcmFscGhhID0gL2FscGhhXFwoW14pXSpcXCkvaSxcclxuICAgICAgICByb3BhY2l0eSA9IC9vcGFjaXR5XFxzKj1cXHMqKFteKV0qKS8sXHJcblxyXG4gICAgLy8gc3dhcHBhYmxlIGlmIGRpc3BsYXkgaXMgbm9uZSBvciBzdGFydHMgd2l0aCB0YWJsZSBleGNlcHQgXCJ0YWJsZVwiLCBcInRhYmxlLWNlbGxcIiwgb3IgXCJ0YWJsZS1jYXB0aW9uXCJcclxuICAgIC8vIHNlZSBoZXJlIGZvciBkaXNwbGF5IHZhbHVlczogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9DU1MvZGlzcGxheVxyXG4gICAgICAgIHJkaXNwbGF5c3dhcCA9IC9eKG5vbmV8dGFibGUoPyEtY1tlYV0pLispLyxcclxuICAgICAgICBybnVtc3BsaXQgPSBuZXcgUmVnRXhwKCBcIl4oXCIgKyBwbnVtICsgXCIpKC4qKSRcIiwgXCJpXCIgKSxcclxuICAgICAgICBycmVsTnVtID0gbmV3IFJlZ0V4cCggXCJeKFsrLV0pPShcIiArIHBudW0gKyBcIilcIiwgXCJpXCIgKSxcclxuXHJcbiAgICAgICAgY3NzU2hvdyA9IHsgcG9zaXRpb246IFwiYWJzb2x1dGVcIiwgdmlzaWJpbGl0eTogXCJoaWRkZW5cIiwgZGlzcGxheTogXCJibG9ja1wiIH0sXHJcbiAgICAgICAgY3NzTm9ybWFsVHJhbnNmb3JtID0ge1xyXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiBcIjBcIixcclxuICAgICAgICAgICAgZm9udFdlaWdodDogXCI0MDBcIlxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNzc1ByZWZpeGVzID0gWyBcIldlYmtpdFwiLCBcIk9cIiwgXCJNb3pcIiwgXCJtc1wiIF07XHJcblxyXG5cclxuLy8gcmV0dXJuIGEgY3NzIHByb3BlcnR5IG1hcHBlZCB0byBhIHBvdGVudGlhbGx5IHZlbmRvciBwcmVmaXhlZCBwcm9wZXJ0eVxyXG4gICAgZnVuY3Rpb24gdmVuZG9yUHJvcE5hbWUoIHN0eWxlLCBuYW1lICkge1xyXG5cclxuICAgICAgICAvLyBzaG9ydGN1dCBmb3IgbmFtZXMgdGhhdCBhcmUgbm90IHZlbmRvciBwcmVmaXhlZFxyXG4gICAgICAgIGlmICggbmFtZSBpbiBzdHlsZSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjaGVjayBmb3IgdmVuZG9yIHByZWZpeGVkIG5hbWVzXHJcbiAgICAgICAgdmFyIGNhcE5hbWUgPSBuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKSxcclxuICAgICAgICAgICAgb3JpZ05hbWUgPSBuYW1lLFxyXG4gICAgICAgICAgICBpID0gY3NzUHJlZml4ZXMubGVuZ3RoO1xyXG5cclxuICAgICAgICB3aGlsZSAoIGktLSApIHtcclxuICAgICAgICAgICAgbmFtZSA9IGNzc1ByZWZpeGVzWyBpIF0gKyBjYXBOYW1lO1xyXG4gICAgICAgICAgICBpZiAoIG5hbWUgaW4gc3R5bGUgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG9yaWdOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNob3dIaWRlKCBlbGVtZW50cywgc2hvdyApIHtcclxuICAgICAgICB2YXIgZGlzcGxheSwgZWxlbSwgaGlkZGVuLFxyXG4gICAgICAgICAgICB2YWx1ZXMgPSBbXSxcclxuICAgICAgICAgICAgaW5kZXggPSAwLFxyXG4gICAgICAgICAgICBsZW5ndGggPSBlbGVtZW50cy5sZW5ndGg7XHJcblxyXG4gICAgICAgIGZvciAoIDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XHJcbiAgICAgICAgICAgIGVsZW0gPSBlbGVtZW50c1sgaW5kZXggXTtcclxuICAgICAgICAgICAgaWYgKCAhZWxlbS5zdHlsZSApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YWx1ZXNbIGluZGV4IF0gPSBqUXVlcnkuX2RhdGEoIGVsZW0sIFwib2xkZGlzcGxheVwiICk7XHJcbiAgICAgICAgICAgIGRpc3BsYXkgPSBlbGVtLnN0eWxlLmRpc3BsYXk7XHJcbiAgICAgICAgICAgIGlmICggc2hvdyApIHtcclxuICAgICAgICAgICAgICAgIC8vIFJlc2V0IHRoZSBpbmxpbmUgZGlzcGxheSBvZiB0aGlzIGVsZW1lbnQgdG8gbGVhcm4gaWYgaXQgaXNcclxuICAgICAgICAgICAgICAgIC8vIGJlaW5nIGhpZGRlbiBieSBjYXNjYWRlZCBydWxlcyBvciBub3RcclxuICAgICAgICAgICAgICAgIGlmICggIXZhbHVlc1sgaW5kZXggXSAmJiBkaXNwbGF5ID09PSBcIm5vbmVcIiApIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNldCBlbGVtZW50cyB3aGljaCBoYXZlIGJlZW4gb3ZlcnJpZGRlbiB3aXRoIGRpc3BsYXk6IG5vbmVcclxuICAgICAgICAgICAgICAgIC8vIGluIGEgc3R5bGVzaGVldCB0byB3aGF0ZXZlciB0aGUgZGVmYXVsdCBicm93c2VyIHN0eWxlIGlzXHJcbiAgICAgICAgICAgICAgICAvLyBmb3Igc3VjaCBhbiBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICBpZiAoIGVsZW0uc3R5bGUuZGlzcGxheSA9PT0gXCJcIiAmJiBpc0hpZGRlbiggZWxlbSApICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc1sgaW5kZXggXSA9IGpRdWVyeS5fZGF0YSggZWxlbSwgXCJvbGRkaXNwbGF5XCIsIGRlZmF1bHREaXNwbGF5KGVsZW0ubm9kZU5hbWUpICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBoaWRkZW4gPSBpc0hpZGRlbiggZWxlbSApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggZGlzcGxheSAmJiBkaXNwbGF5ICE9PSBcIm5vbmVcIiB8fCAhaGlkZGVuICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS5fZGF0YSggZWxlbSwgXCJvbGRkaXNwbGF5XCIsIGhpZGRlbiA/IGRpc3BsYXkgOiBqUXVlcnkuY3NzKCBlbGVtLCBcImRpc3BsYXlcIiApICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNldCB0aGUgZGlzcGxheSBvZiBtb3N0IG9mIHRoZSBlbGVtZW50cyBpbiBhIHNlY29uZCBsb29wXHJcbiAgICAgICAgLy8gdG8gYXZvaWQgdGhlIGNvbnN0YW50IHJlZmxvd1xyXG4gICAgICAgIGZvciAoIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XHJcbiAgICAgICAgICAgIGVsZW0gPSBlbGVtZW50c1sgaW5kZXggXTtcclxuICAgICAgICAgICAgaWYgKCAhZWxlbS5zdHlsZSApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggIXNob3cgfHwgZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIm5vbmVcIiB8fCBlbGVtLnN0eWxlLmRpc3BsYXkgPT09IFwiXCIgKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBzaG93ID8gdmFsdWVzWyBpbmRleCBdIHx8IFwiXCIgOiBcIm5vbmVcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldFBvc2l0aXZlTnVtYmVyKCBlbGVtLCB2YWx1ZSwgc3VidHJhY3QgKSB7XHJcbiAgICAgICAgdmFyIG1hdGNoZXMgPSBybnVtc3BsaXQuZXhlYyggdmFsdWUgKTtcclxuICAgICAgICByZXR1cm4gbWF0Y2hlcyA/XHJcbiAgICAgICAgICAgIC8vIEd1YXJkIGFnYWluc3QgdW5kZWZpbmVkIFwic3VidHJhY3RcIiwgZS5nLiwgd2hlbiB1c2VkIGFzIGluIGNzc0hvb2tzXHJcbiAgICAgICAgTWF0aC5tYXgoIDAsIG1hdGNoZXNbIDEgXSAtICggc3VidHJhY3QgfHwgMCApICkgKyAoIG1hdGNoZXNbIDIgXSB8fCBcInB4XCIgKSA6XHJcbiAgICAgICAgICAgIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGF1Z21lbnRXaWR0aE9ySGVpZ2h0KCBlbGVtLCBuYW1lLCBleHRyYSwgaXNCb3JkZXJCb3gsIHN0eWxlcyApIHtcclxuICAgICAgICB2YXIgaSA9IGV4dHJhID09PSAoIGlzQm9yZGVyQm94ID8gXCJib3JkZXJcIiA6IFwiY29udGVudFwiICkgP1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgYWxyZWFkeSBoYXZlIHRoZSByaWdodCBtZWFzdXJlbWVudCwgYXZvaWQgYXVnbWVudGF0aW9uXHJcbiAgICAgICAgICAgICAgICA0IDpcclxuICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSBpbml0aWFsaXplIGZvciBob3Jpem9udGFsIG9yIHZlcnRpY2FsIHByb3BlcnRpZXNcclxuICAgICAgICAgICAgICAgIG5hbWUgPT09IFwid2lkdGhcIiA/IDEgOiAwLFxyXG5cclxuICAgICAgICAgICAgdmFsID0gMDtcclxuXHJcbiAgICAgICAgZm9yICggOyBpIDwgNDsgaSArPSAyICkge1xyXG4gICAgICAgICAgICAvLyBib3RoIGJveCBtb2RlbHMgZXhjbHVkZSBtYXJnaW4sIHNvIGFkZCBpdCBpZiB3ZSB3YW50IGl0XHJcbiAgICAgICAgICAgIGlmICggZXh0cmEgPT09IFwibWFyZ2luXCIgKSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgKz0galF1ZXJ5LmNzcyggZWxlbSwgZXh0cmEgKyBjc3NFeHBhbmRbIGkgXSwgdHJ1ZSwgc3R5bGVzICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICggaXNCb3JkZXJCb3ggKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBib3JkZXItYm94IGluY2x1ZGVzIHBhZGRpbmcsIHNvIHJlbW92ZSBpdCBpZiB3ZSB3YW50IGNvbnRlbnRcclxuICAgICAgICAgICAgICAgIGlmICggZXh0cmEgPT09IFwiY29udGVudFwiICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbCAtPSBqUXVlcnkuY3NzKCBlbGVtLCBcInBhZGRpbmdcIiArIGNzc0V4cGFuZFsgaSBdLCB0cnVlLCBzdHlsZXMgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBhdCB0aGlzIHBvaW50LCBleHRyYSBpc24ndCBib3JkZXIgbm9yIG1hcmdpbiwgc28gcmVtb3ZlIGJvcmRlclxyXG4gICAgICAgICAgICAgICAgaWYgKCBleHRyYSAhPT0gXCJtYXJnaW5cIiApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWwgLT0galF1ZXJ5LmNzcyggZWxlbSwgXCJib3JkZXJcIiArIGNzc0V4cGFuZFsgaSBdICsgXCJXaWR0aFwiLCB0cnVlLCBzdHlsZXMgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGF0IHRoaXMgcG9pbnQsIGV4dHJhIGlzbid0IGNvbnRlbnQsIHNvIGFkZCBwYWRkaW5nXHJcbiAgICAgICAgICAgICAgICB2YWwgKz0galF1ZXJ5LmNzcyggZWxlbSwgXCJwYWRkaW5nXCIgKyBjc3NFeHBhbmRbIGkgXSwgdHJ1ZSwgc3R5bGVzICk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYXQgdGhpcyBwb2ludCwgZXh0cmEgaXNuJ3QgY29udGVudCBub3IgcGFkZGluZywgc28gYWRkIGJvcmRlclxyXG4gICAgICAgICAgICAgICAgaWYgKCBleHRyYSAhPT0gXCJwYWRkaW5nXCIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsICs9IGpRdWVyeS5jc3MoIGVsZW0sIFwiYm9yZGVyXCIgKyBjc3NFeHBhbmRbIGkgXSArIFwiV2lkdGhcIiwgdHJ1ZSwgc3R5bGVzICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0V2lkdGhPckhlaWdodCggZWxlbSwgbmFtZSwgZXh0cmEgKSB7XHJcblxyXG4gICAgICAgIC8vIFN0YXJ0IHdpdGggb2Zmc2V0IHByb3BlcnR5LCB3aGljaCBpcyBlcXVpdmFsZW50IHRvIHRoZSBib3JkZXItYm94IHZhbHVlXHJcbiAgICAgICAgdmFyIHZhbHVlSXNCb3JkZXJCb3ggPSB0cnVlLFxyXG4gICAgICAgICAgICB2YWwgPSBuYW1lID09PSBcIndpZHRoXCIgPyBlbGVtLm9mZnNldFdpZHRoIDogZWxlbS5vZmZzZXRIZWlnaHQsXHJcbiAgICAgICAgICAgIHN0eWxlcyA9IGdldFN0eWxlcyggZWxlbSApLFxyXG4gICAgICAgICAgICBpc0JvcmRlckJveCA9IHN1cHBvcnQuYm94U2l6aW5nICYmIGpRdWVyeS5jc3MoIGVsZW0sIFwiYm94U2l6aW5nXCIsIGZhbHNlLCBzdHlsZXMgKSA9PT0gXCJib3JkZXItYm94XCI7XHJcblxyXG4gICAgICAgIC8vIHNvbWUgbm9uLWh0bWwgZWxlbWVudHMgcmV0dXJuIHVuZGVmaW5lZCBmb3Igb2Zmc2V0V2lkdGgsIHNvIGNoZWNrIGZvciBudWxsL3VuZGVmaW5lZFxyXG4gICAgICAgIC8vIHN2ZyAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY0OTI4NVxyXG4gICAgICAgIC8vIE1hdGhNTCAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTQ5MTY2OFxyXG4gICAgICAgIGlmICggdmFsIDw9IDAgfHwgdmFsID09IG51bGwgKSB7XHJcbiAgICAgICAgICAgIC8vIEZhbGwgYmFjayB0byBjb21wdXRlZCB0aGVuIHVuY29tcHV0ZWQgY3NzIGlmIG5lY2Vzc2FyeVxyXG4gICAgICAgICAgICB2YWwgPSBjdXJDU1MoIGVsZW0sIG5hbWUsIHN0eWxlcyApO1xyXG4gICAgICAgICAgICBpZiAoIHZhbCA8IDAgfHwgdmFsID09IG51bGwgKSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSBlbGVtLnN0eWxlWyBuYW1lIF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENvbXB1dGVkIHVuaXQgaXMgbm90IHBpeGVscy4gU3RvcCBoZXJlIGFuZCByZXR1cm4uXHJcbiAgICAgICAgICAgIGlmICggcm51bW5vbnB4LnRlc3QodmFsKSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHdlIG5lZWQgdGhlIGNoZWNrIGZvciBzdHlsZSBpbiBjYXNlIGEgYnJvd3NlciB3aGljaCByZXR1cm5zIHVucmVsaWFibGUgdmFsdWVzXHJcbiAgICAgICAgICAgIC8vIGZvciBnZXRDb21wdXRlZFN0eWxlIHNpbGVudGx5IGZhbGxzIGJhY2sgdG8gdGhlIHJlbGlhYmxlIGVsZW0uc3R5bGVcclxuICAgICAgICAgICAgdmFsdWVJc0JvcmRlckJveCA9IGlzQm9yZGVyQm94ICYmICggc3VwcG9ydC5ib3hTaXppbmdSZWxpYWJsZSgpIHx8IHZhbCA9PT0gZWxlbS5zdHlsZVsgbmFtZSBdICk7XHJcblxyXG4gICAgICAgICAgICAvLyBOb3JtYWxpemUgXCJcIiwgYXV0bywgYW5kIHByZXBhcmUgZm9yIGV4dHJhXHJcbiAgICAgICAgICAgIHZhbCA9IHBhcnNlRmxvYXQoIHZhbCApIHx8IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB1c2UgdGhlIGFjdGl2ZSBib3gtc2l6aW5nIG1vZGVsIHRvIGFkZC9zdWJ0cmFjdCBpcnJlbGV2YW50IHN0eWxlc1xyXG4gICAgICAgIHJldHVybiAoIHZhbCArXHJcbiAgICAgICAgICAgIGF1Z21lbnRXaWR0aE9ySGVpZ2h0KFxyXG4gICAgICAgICAgICAgICAgZWxlbSxcclxuICAgICAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgICAgICBleHRyYSB8fCAoIGlzQm9yZGVyQm94ID8gXCJib3JkZXJcIiA6IFwiY29udGVudFwiICksXHJcbiAgICAgICAgICAgICAgICB2YWx1ZUlzQm9yZGVyQm94LFxyXG4gICAgICAgICAgICAgICAgc3R5bGVzXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKSArIFwicHhcIjtcclxuICAgIH1cclxuXHJcbiAgICBqUXVlcnkuZXh0ZW5kKHtcclxuICAgICAgICAvLyBBZGQgaW4gc3R5bGUgcHJvcGVydHkgaG9va3MgZm9yIG92ZXJyaWRpbmcgdGhlIGRlZmF1bHRcclxuICAgICAgICAvLyBiZWhhdmlvciBvZiBnZXR0aW5nIGFuZCBzZXR0aW5nIGEgc3R5bGUgcHJvcGVydHlcclxuICAgICAgICBjc3NIb29rczoge1xyXG4gICAgICAgICAgICBvcGFjaXR5OiB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIGNvbXB1dGVkICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBzaG91bGQgYWx3YXlzIGdldCBhIG51bWJlciBiYWNrIGZyb20gb3BhY2l0eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0ID0gY3VyQ1NTKCBlbGVtLCBcIm9wYWNpdHlcIiApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0ID09PSBcIlwiID8gXCIxXCIgOiByZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gRG9uJ3QgYXV0b21hdGljYWxseSBhZGQgXCJweFwiIHRvIHRoZXNlIHBvc3NpYmx5LXVuaXRsZXNzIHByb3BlcnRpZXNcclxuICAgICAgICBjc3NOdW1iZXI6IHtcclxuICAgICAgICAgICAgXCJjb2x1bW5Db3VudFwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcImZpbGxPcGFjaXR5XCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiZmxleEdyb3dcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJmbGV4U2hyaW5rXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiZm9udFdlaWdodFwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcImxpbmVIZWlnaHRcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJvcGFjaXR5XCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwib3JkZXJcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJvcnBoYW5zXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwid2lkb3dzXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiekluZGV4XCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiem9vbVwiOiB0cnVlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gQWRkIGluIHByb3BlcnRpZXMgd2hvc2UgbmFtZXMgeW91IHdpc2ggdG8gZml4IGJlZm9yZVxyXG4gICAgICAgIC8vIHNldHRpbmcgb3IgZ2V0dGluZyB0aGUgdmFsdWVcclxuICAgICAgICBjc3NQcm9wczoge1xyXG4gICAgICAgICAgICAvLyBub3JtYWxpemUgZmxvYXQgY3NzIHByb3BlcnR5XHJcbiAgICAgICAgICAgIFwiZmxvYXRcIjogc3VwcG9ydC5jc3NGbG9hdCA/IFwiY3NzRmxvYXRcIiA6IFwic3R5bGVGbG9hdFwiXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gR2V0IGFuZCBzZXQgdGhlIHN0eWxlIHByb3BlcnR5IG9uIGEgRE9NIE5vZGVcclxuICAgICAgICBzdHlsZTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIHZhbHVlLCBleHRyYSApIHtcclxuICAgICAgICAgICAgLy8gRG9uJ3Qgc2V0IHN0eWxlcyBvbiB0ZXh0IGFuZCBjb21tZW50IG5vZGVzXHJcbiAgICAgICAgICAgIGlmICggIWVsZW0gfHwgZWxlbS5ub2RlVHlwZSA9PT0gMyB8fCBlbGVtLm5vZGVUeXBlID09PSA4IHx8ICFlbGVtLnN0eWxlICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB3ZSdyZSB3b3JraW5nIHdpdGggdGhlIHJpZ2h0IG5hbWVcclxuICAgICAgICAgICAgdmFyIHJldCwgdHlwZSwgaG9va3MsXHJcbiAgICAgICAgICAgICAgICBvcmlnTmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIG5hbWUgKSxcclxuICAgICAgICAgICAgICAgIHN0eWxlID0gZWxlbS5zdHlsZTtcclxuXHJcbiAgICAgICAgICAgIG5hbWUgPSBqUXVlcnkuY3NzUHJvcHNbIG9yaWdOYW1lIF0gfHwgKCBqUXVlcnkuY3NzUHJvcHNbIG9yaWdOYW1lIF0gPSB2ZW5kb3JQcm9wTmFtZSggc3R5bGUsIG9yaWdOYW1lICkgKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGdldHMgaG9vayBmb3IgdGhlIHByZWZpeGVkIHZlcnNpb25cclxuICAgICAgICAgICAgLy8gZm9sbG93ZWQgYnkgdGhlIHVucHJlZml4ZWQgdmVyc2lvblxyXG4gICAgICAgICAgICBob29rcyA9IGpRdWVyeS5jc3NIb29rc1sgbmFtZSBdIHx8IGpRdWVyeS5jc3NIb29rc1sgb3JpZ05hbWUgXTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHdlJ3JlIHNldHRpbmcgYSB2YWx1ZVxyXG4gICAgICAgICAgICBpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gdHlwZW9mIHZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgcmVsYXRpdmUgbnVtYmVyIHN0cmluZ3MgKCs9IG9yIC09KSB0byByZWxhdGl2ZSBudW1iZXJzLiAjNzM0NVxyXG4gICAgICAgICAgICAgICAgaWYgKCB0eXBlID09PSBcInN0cmluZ1wiICYmIChyZXQgPSBycmVsTnVtLmV4ZWMoIHZhbHVlICkpICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gKCByZXRbMV0gKyAxICkgKiByZXRbMl0gKyBwYXJzZUZsb2F0KCBqUXVlcnkuY3NzKCBlbGVtLCBuYW1lICkgKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBGaXhlcyBidWcgIzkyMzdcclxuICAgICAgICAgICAgICAgICAgICB0eXBlID0gXCJudW1iZXJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCBudWxsIGFuZCBOYU4gdmFsdWVzIGFyZW4ndCBzZXQuIFNlZTogIzcxMTZcclxuICAgICAgICAgICAgICAgIGlmICggdmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdmFsdWUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIGEgbnVtYmVyIHdhcyBwYXNzZWQgaW4sIGFkZCAncHgnIHRvIHRoZSAoZXhjZXB0IGZvciBjZXJ0YWluIENTUyBwcm9wZXJ0aWVzKVxyXG4gICAgICAgICAgICAgICAgaWYgKCB0eXBlID09PSBcIm51bWJlclwiICYmICFqUXVlcnkuY3NzTnVtYmVyWyBvcmlnTmFtZSBdICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlICs9IFwicHhcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBGaXhlcyAjODkwOCwgaXQgY2FuIGJlIGRvbmUgbW9yZSBjb3JyZWN0bHkgYnkgc3BlY2lmaW5nIHNldHRlcnMgaW4gY3NzSG9va3MsXHJcbiAgICAgICAgICAgICAgICAvLyBidXQgaXQgd291bGQgbWVhbiB0byBkZWZpbmUgZWlnaHQgKGZvciBldmVyeSBwcm9ibGVtYXRpYyBwcm9wZXJ0eSkgaWRlbnRpY2FsIGZ1bmN0aW9uc1xyXG4gICAgICAgICAgICAgICAgaWYgKCAhc3VwcG9ydC5jbGVhckNsb25lU3R5bGUgJiYgdmFsdWUgPT09IFwiXCIgJiYgbmFtZS5pbmRleE9mKFwiYmFja2dyb3VuZFwiKSA9PT0gMCApIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZVsgbmFtZSBdID0gXCJpbmhlcml0XCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgYSBob29rIHdhcyBwcm92aWRlZCwgdXNlIHRoYXQgdmFsdWUsIG90aGVyd2lzZSBqdXN0IHNldCB0aGUgc3BlY2lmaWVkIHZhbHVlXHJcbiAgICAgICAgICAgICAgICBpZiAoICFob29rcyB8fCAhKFwic2V0XCIgaW4gaG9va3MpIHx8ICh2YWx1ZSA9IGhvb2tzLnNldCggZWxlbSwgdmFsdWUsIGV4dHJhICkpICE9PSB1bmRlZmluZWQgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU3dhbGxvdyBlcnJvcnMgZnJvbSAnaW52YWxpZCcgQ1NTIHZhbHVlcyAoIzU1MDkpXHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVbIG5hbWUgXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2goZSkge31cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiBhIGhvb2sgd2FzIHByb3ZpZGVkIGdldCB0aGUgbm9uLWNvbXB1dGVkIHZhbHVlIGZyb20gdGhlcmVcclxuICAgICAgICAgICAgICAgIGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJiAocmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBmYWxzZSwgZXh0cmEgKSkgIT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSBqdXN0IGdldCB0aGUgdmFsdWUgZnJvbSB0aGUgc3R5bGUgb2JqZWN0XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3R5bGVbIG5hbWUgXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNzczogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGV4dHJhLCBzdHlsZXMgKSB7XHJcbiAgICAgICAgICAgIHZhciBudW0sIHZhbCwgaG9va3MsXHJcbiAgICAgICAgICAgICAgICBvcmlnTmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIG5hbWUgKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHdlJ3JlIHdvcmtpbmcgd2l0aCB0aGUgcmlnaHQgbmFtZVxyXG4gICAgICAgICAgICBuYW1lID0galF1ZXJ5LmNzc1Byb3BzWyBvcmlnTmFtZSBdIHx8ICggalF1ZXJ5LmNzc1Byb3BzWyBvcmlnTmFtZSBdID0gdmVuZG9yUHJvcE5hbWUoIGVsZW0uc3R5bGUsIG9yaWdOYW1lICkgKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGdldHMgaG9vayBmb3IgdGhlIHByZWZpeGVkIHZlcnNpb25cclxuICAgICAgICAgICAgLy8gZm9sbG93ZWQgYnkgdGhlIHVucHJlZml4ZWQgdmVyc2lvblxyXG4gICAgICAgICAgICBob29rcyA9IGpRdWVyeS5jc3NIb29rc1sgbmFtZSBdIHx8IGpRdWVyeS5jc3NIb29rc1sgb3JpZ05hbWUgXTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIGEgaG9vayB3YXMgcHJvdmlkZWQgZ2V0IHRoZSBjb21wdXRlZCB2YWx1ZSBmcm9tIHRoZXJlXHJcbiAgICAgICAgICAgIGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyApIHtcclxuICAgICAgICAgICAgICAgIHZhbCA9IGhvb2tzLmdldCggZWxlbSwgdHJ1ZSwgZXh0cmEgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBpZiBhIHdheSB0byBnZXQgdGhlIGNvbXB1dGVkIHZhbHVlIGV4aXN0cywgdXNlIHRoYXRcclxuICAgICAgICAgICAgaWYgKCB2YWwgPT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgIHZhbCA9IGN1ckNTUyggZWxlbSwgbmFtZSwgc3R5bGVzICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vY29udmVydCBcIm5vcm1hbFwiIHRvIGNvbXB1dGVkIHZhbHVlXHJcbiAgICAgICAgICAgIGlmICggdmFsID09PSBcIm5vcm1hbFwiICYmIG5hbWUgaW4gY3NzTm9ybWFsVHJhbnNmb3JtICkge1xyXG4gICAgICAgICAgICAgICAgdmFsID0gY3NzTm9ybWFsVHJhbnNmb3JtWyBuYW1lIF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJldHVybiwgY29udmVydGluZyB0byBudW1iZXIgaWYgZm9yY2VkIG9yIGEgcXVhbGlmaWVyIHdhcyBwcm92aWRlZCBhbmQgdmFsIGxvb2tzIG51bWVyaWNcclxuICAgICAgICAgICAgaWYgKCBleHRyYSA9PT0gXCJcIiB8fCBleHRyYSApIHtcclxuICAgICAgICAgICAgICAgIG51bSA9IHBhcnNlRmxvYXQoIHZhbCApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4dHJhID09PSB0cnVlIHx8IGpRdWVyeS5pc051bWVyaWMoIG51bSApID8gbnVtIHx8IDAgOiB2YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBqUXVlcnkuZWFjaChbIFwiaGVpZ2h0XCIsIFwid2lkdGhcIiBdLCBmdW5jdGlvbiggaSwgbmFtZSApIHtcclxuICAgICAgICBqUXVlcnkuY3NzSG9va3NbIG5hbWUgXSA9IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQsIGV4dHJhICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBjb21wdXRlZCApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjZXJ0YWluIGVsZW1lbnRzIGNhbiBoYXZlIGRpbWVuc2lvbiBpbmZvIGlmIHdlIGludmlzaWJseSBzaG93IHRoZW1cclxuICAgICAgICAgICAgICAgICAgICAvLyBob3dldmVyLCBpdCBtdXN0IGhhdmUgYSBjdXJyZW50IGRpc3BsYXkgc3R5bGUgdGhhdCB3b3VsZCBiZW5lZml0IGZyb20gdGhpc1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZGlzcGxheXN3YXAudGVzdCggalF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKSApICYmIGVsZW0ub2Zmc2V0V2lkdGggPT09IDAgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuc3dhcCggZWxlbSwgY3NzU2hvdywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0V2lkdGhPckhlaWdodCggZWxlbSwgbmFtZSwgZXh0cmEgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRXaWR0aE9ySGVpZ2h0KCBlbGVtLCBuYW1lLCBleHRyYSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUsIGV4dHJhICkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0eWxlcyA9IGV4dHJhICYmIGdldFN0eWxlcyggZWxlbSApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldFBvc2l0aXZlTnVtYmVyKCBlbGVtLCB2YWx1ZSwgZXh0cmEgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdWdtZW50V2lkdGhPckhlaWdodChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0cmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0LmJveFNpemluZyAmJiBqUXVlcnkuY3NzKCBlbGVtLCBcImJveFNpemluZ1wiLCBmYWxzZSwgc3R5bGVzICkgPT09IFwiYm9yZGVyLWJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkgOiAwXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICggIXN1cHBvcnQub3BhY2l0eSApIHtcclxuICAgICAgICBqUXVlcnkuY3NzSG9va3Mub3BhY2l0eSA9IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJRSB1c2VzIGZpbHRlcnMgZm9yIG9wYWNpdHlcclxuICAgICAgICAgICAgICAgIHJldHVybiByb3BhY2l0eS50ZXN0KCAoY29tcHV0ZWQgJiYgZWxlbS5jdXJyZW50U3R5bGUgPyBlbGVtLmN1cnJlbnRTdHlsZS5maWx0ZXIgOiBlbGVtLnN0eWxlLmZpbHRlcikgfHwgXCJcIiApID9cclxuICAgICAgICAgICAgICAgICggMC4wMSAqIHBhcnNlRmxvYXQoIFJlZ0V4cC4kMSApICkgKyBcIlwiIDpcclxuICAgICAgICAgICAgICAgICAgICBjb21wdXRlZCA/IFwiMVwiIDogXCJcIjtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0eWxlID0gZWxlbS5zdHlsZSxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3R5bGUgPSBlbGVtLmN1cnJlbnRTdHlsZSxcclxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5ID0galF1ZXJ5LmlzTnVtZXJpYyggdmFsdWUgKSA/IFwiYWxwaGEob3BhY2l0eT1cIiArIHZhbHVlICogMTAwICsgXCIpXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGN1cnJlbnRTdHlsZSAmJiBjdXJyZW50U3R5bGUuZmlsdGVyIHx8IHN0eWxlLmZpbHRlciB8fCBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIElFIGhhcyB0cm91YmxlIHdpdGggb3BhY2l0eSBpZiBpdCBkb2VzIG5vdCBoYXZlIGxheW91dFxyXG4gICAgICAgICAgICAgICAgLy8gRm9yY2UgaXQgYnkgc2V0dGluZyB0aGUgem9vbSBsZXZlbFxyXG4gICAgICAgICAgICAgICAgc3R5bGUuem9vbSA9IDE7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaWYgc2V0dGluZyBvcGFjaXR5IHRvIDEsIGFuZCBubyBvdGhlciBmaWx0ZXJzIGV4aXN0IC0gYXR0ZW1wdCB0byByZW1vdmUgZmlsdGVyIGF0dHJpYnV0ZSAjNjY1MlxyXG4gICAgICAgICAgICAgICAgLy8gaWYgdmFsdWUgPT09IFwiXCIsIHRoZW4gcmVtb3ZlIGlubGluZSBvcGFjaXR5ICMxMjY4NVxyXG4gICAgICAgICAgICAgICAgaWYgKCAoIHZhbHVlID49IDEgfHwgdmFsdWUgPT09IFwiXCIgKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS50cmltKCBmaWx0ZXIucmVwbGFjZSggcmFscGhhLCBcIlwiICkgKSA9PT0gXCJcIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlLnJlbW92ZUF0dHJpYnV0ZSApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0dGluZyBzdHlsZS5maWx0ZXIgdG8gbnVsbCwgXCJcIiAmIFwiIFwiIHN0aWxsIGxlYXZlIFwiZmlsdGVyOlwiIGluIHRoZSBjc3NUZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgXCJmaWx0ZXI6XCIgaXMgcHJlc2VudCBhdCBhbGwsIGNsZWFyVHlwZSBpcyBkaXNhYmxlZCwgd2Ugd2FudCB0byBhdm9pZCB0aGlzXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc3R5bGUucmVtb3ZlQXR0cmlidXRlIGlzIElFIE9ubHksIGJ1dCBzbyBhcHBhcmVudGx5IGlzIHRoaXMgY29kZSBwYXRoLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUucmVtb3ZlQXR0cmlidXRlKCBcImZpbHRlclwiICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIGZpbHRlciBzdHlsZSBhcHBsaWVkIGluIGEgY3NzIHJ1bGUgb3IgdW5zZXQgaW5saW5lIG9wYWNpdHksIHdlIGFyZSBkb25lXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB2YWx1ZSA9PT0gXCJcIiB8fCBjdXJyZW50U3R5bGUgJiYgIWN1cnJlbnRTdHlsZS5maWx0ZXIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gb3RoZXJ3aXNlLCBzZXQgbmV3IGZpbHRlciB2YWx1ZXNcclxuICAgICAgICAgICAgICAgIHN0eWxlLmZpbHRlciA9IHJhbHBoYS50ZXN0KCBmaWx0ZXIgKSA/XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnJlcGxhY2UoIHJhbHBoYSwgb3BhY2l0eSApIDpcclxuICAgICAgICAgICAgICAgIGZpbHRlciArIFwiIFwiICsgb3BhY2l0eTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgalF1ZXJ5LmNzc0hvb2tzLm1hcmdpblJpZ2h0ID0gYWRkR2V0SG9va0lmKCBzdXBwb3J0LnJlbGlhYmxlTWFyZ2luUmlnaHQsXHJcbiAgICAgICAgZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkICkge1xyXG4gICAgICAgICAgICBpZiAoIGNvbXB1dGVkICkge1xyXG4gICAgICAgICAgICAgICAgLy8gV2ViS2l0IEJ1ZyAxMzM0MyAtIGdldENvbXB1dGVkU3R5bGUgcmV0dXJucyB3cm9uZyB2YWx1ZSBmb3IgbWFyZ2luLXJpZ2h0XHJcbiAgICAgICAgICAgICAgICAvLyBXb3JrIGFyb3VuZCBieSB0ZW1wb3JhcmlseSBzZXR0aW5nIGVsZW1lbnQgZGlzcGxheSB0byBpbmxpbmUtYmxvY2tcclxuICAgICAgICAgICAgICAgIHJldHVybiBqUXVlcnkuc3dhcCggZWxlbSwgeyBcImRpc3BsYXlcIjogXCJpbmxpbmUtYmxvY2tcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGN1ckNTUywgWyBlbGVtLCBcIm1hcmdpblJpZ2h0XCIgXSApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxuXHJcbi8vIFRoZXNlIGhvb2tzIGFyZSB1c2VkIGJ5IGFuaW1hdGUgdG8gZXhwYW5kIHByb3BlcnRpZXNcclxuICAgIGpRdWVyeS5lYWNoKHtcclxuICAgICAgICBtYXJnaW46IFwiXCIsXHJcbiAgICAgICAgcGFkZGluZzogXCJcIixcclxuICAgICAgICBib3JkZXI6IFwiV2lkdGhcIlxyXG4gICAgfSwgZnVuY3Rpb24oIHByZWZpeCwgc3VmZml4ICkge1xyXG4gICAgICAgIGpRdWVyeS5jc3NIb29rc1sgcHJlZml4ICsgc3VmZml4IF0gPSB7XHJcbiAgICAgICAgICAgIGV4cGFuZDogZnVuY3Rpb24oIHZhbHVlICkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4cGFuZGVkID0ge30sXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYXNzdW1lcyBhIHNpbmdsZSBudW1iZXIgaWYgbm90IGEgc3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgcGFydHMgPSB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgPyB2YWx1ZS5zcGxpdChcIiBcIikgOiBbIHZhbHVlIF07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICggOyBpIDwgNDsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV4cGFuZGVkWyBwcmVmaXggKyBjc3NFeHBhbmRbIGkgXSArIHN1ZmZpeCBdID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydHNbIGkgXSB8fCBwYXJ0c1sgaSAtIDIgXSB8fCBwYXJ0c1sgMCBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBleHBhbmRlZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmICggIXJtYXJnaW4udGVzdCggcHJlZml4ICkgKSB7XHJcbiAgICAgICAgICAgIGpRdWVyeS5jc3NIb29rc1sgcHJlZml4ICsgc3VmZml4IF0uc2V0ID0gc2V0UG9zaXRpdmVOdW1iZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgalF1ZXJ5LmZuLmV4dGVuZCh7XHJcbiAgICAgICAgY3NzOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCB2YWx1ZSApIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdHlsZXMsIGxlbixcclxuICAgICAgICAgICAgICAgICAgICBtYXAgPSB7fSxcclxuICAgICAgICAgICAgICAgICAgICBpID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIGpRdWVyeS5pc0FycmF5KCBuYW1lICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVzID0gZ2V0U3R5bGVzKCBlbGVtICk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVuID0gbmFtZS5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBbIG5hbWVbIGkgXSBdID0galF1ZXJ5LmNzcyggZWxlbSwgbmFtZVsgaSBdLCBmYWxzZSwgc3R5bGVzICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWFwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkID9cclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuc3R5bGUoIGVsZW0sIG5hbWUsIHZhbHVlICkgOlxyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS5jc3MoIGVsZW0sIG5hbWUgKTtcclxuICAgICAgICAgICAgfSwgbmFtZSwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAxICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaG93OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNob3dIaWRlKCB0aGlzLCB0cnVlICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoaWRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNob3dIaWRlKCB0aGlzICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b2dnbGU6IGZ1bmN0aW9uKCBzdGF0ZSApIHtcclxuICAgICAgICAgICAgaWYgKCB0eXBlb2Ygc3RhdGUgPT09IFwiYm9vbGVhblwiICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlID8gdGhpcy5zaG93KCkgOiB0aGlzLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICggaXNIaWRkZW4oIHRoaXMgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoIHRoaXMgKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSggdGhpcyApLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIFR3ZWVuKCBlbGVtLCBvcHRpb25zLCBwcm9wLCBlbmQsIGVhc2luZyApIHtcclxuICAgICAgICByZXR1cm4gbmV3IFR3ZWVuLnByb3RvdHlwZS5pbml0KCBlbGVtLCBvcHRpb25zLCBwcm9wLCBlbmQsIGVhc2luZyApO1xyXG4gICAgfVxyXG4gICAgalF1ZXJ5LlR3ZWVuID0gVHdlZW47XHJcblxyXG4gICAgVHdlZW4ucHJvdG90eXBlID0ge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBUd2VlbixcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiggZWxlbSwgb3B0aW9ucywgcHJvcCwgZW5kLCBlYXNpbmcsIHVuaXQgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbSA9IGVsZW07XHJcbiAgICAgICAgICAgIHRoaXMucHJvcCA9IHByb3A7XHJcbiAgICAgICAgICAgIHRoaXMuZWFzaW5nID0gZWFzaW5nIHx8IFwic3dpbmdcIjtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgICAgICAgICAgdGhpcy5zdGFydCA9IHRoaXMubm93ID0gdGhpcy5jdXIoKTtcclxuICAgICAgICAgICAgdGhpcy5lbmQgPSBlbmQ7XHJcbiAgICAgICAgICAgIHRoaXMudW5pdCA9IHVuaXQgfHwgKCBqUXVlcnkuY3NzTnVtYmVyWyBwcm9wIF0gPyBcIlwiIDogXCJweFwiICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjdXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgaG9va3MgPSBUd2Vlbi5wcm9wSG9va3NbIHRoaXMucHJvcCBdO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGhvb2tzICYmIGhvb2tzLmdldCA/XHJcbiAgICAgICAgICAgICAgICBob29rcy5nZXQoIHRoaXMgKSA6XHJcbiAgICAgICAgICAgICAgICBUd2Vlbi5wcm9wSG9va3MuX2RlZmF1bHQuZ2V0KCB0aGlzICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydW46IGZ1bmN0aW9uKCBwZXJjZW50ICkge1xyXG4gICAgICAgICAgICB2YXIgZWFzZWQsXHJcbiAgICAgICAgICAgICAgICBob29rcyA9IFR3ZWVuLnByb3BIb29rc1sgdGhpcy5wcm9wIF07XHJcblxyXG4gICAgICAgICAgICBpZiAoIHRoaXMub3B0aW9ucy5kdXJhdGlvbiApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zID0gZWFzZWQgPSBqUXVlcnkuZWFzaW5nWyB0aGlzLmVhc2luZyBdKFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnQsIHRoaXMub3B0aW9ucy5kdXJhdGlvbiAqIHBlcmNlbnQsIDAsIDEsIHRoaXMub3B0aW9ucy5kdXJhdGlvblxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zID0gZWFzZWQgPSBwZXJjZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubm93ID0gKCB0aGlzLmVuZCAtIHRoaXMuc3RhcnQgKSAqIGVhc2VkICsgdGhpcy5zdGFydDtcclxuXHJcbiAgICAgICAgICAgIGlmICggdGhpcy5vcHRpb25zLnN0ZXAgKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuc3RlcC5jYWxsKCB0aGlzLmVsZW0sIHRoaXMubm93LCB0aGlzICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICggaG9va3MgJiYgaG9va3Muc2V0ICkge1xyXG4gICAgICAgICAgICAgICAgaG9va3Muc2V0KCB0aGlzICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBUd2Vlbi5wcm9wSG9va3MuX2RlZmF1bHQuc2V0KCB0aGlzICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBUd2Vlbi5wcm90b3R5cGUuaW5pdC5wcm90b3R5cGUgPSBUd2Vlbi5wcm90b3R5cGU7XHJcblxyXG4gICAgVHdlZW4ucHJvcEhvb2tzID0ge1xyXG4gICAgICAgIF9kZWZhdWx0OiB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oIHR3ZWVuICkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIHR3ZWVuLmVsZW1bIHR3ZWVuLnByb3AgXSAhPSBudWxsICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKCF0d2Vlbi5lbGVtLnN0eWxlIHx8IHR3ZWVuLmVsZW0uc3R5bGVbIHR3ZWVuLnByb3AgXSA9PSBudWxsKSApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHdlZW4uZWxlbVsgdHdlZW4ucHJvcCBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIHBhc3NpbmcgYW4gZW1wdHkgc3RyaW5nIGFzIGEgM3JkIHBhcmFtZXRlciB0byAuY3NzIHdpbGwgYXV0b21hdGljYWxseVxyXG4gICAgICAgICAgICAgICAgLy8gYXR0ZW1wdCBhIHBhcnNlRmxvYXQgYW5kIGZhbGxiYWNrIHRvIGEgc3RyaW5nIGlmIHRoZSBwYXJzZSBmYWlsc1xyXG4gICAgICAgICAgICAgICAgLy8gc28sIHNpbXBsZSB2YWx1ZXMgc3VjaCBhcyBcIjEwcHhcIiBhcmUgcGFyc2VkIHRvIEZsb2F0LlxyXG4gICAgICAgICAgICAgICAgLy8gY29tcGxleCB2YWx1ZXMgc3VjaCBhcyBcInJvdGF0ZSgxcmFkKVwiIGFyZSByZXR1cm5lZCBhcyBpcy5cclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGpRdWVyeS5jc3MoIHR3ZWVuLmVsZW0sIHR3ZWVuLnByb3AsIFwiXCIgKTtcclxuICAgICAgICAgICAgICAgIC8vIEVtcHR5IHN0cmluZ3MsIG51bGwsIHVuZGVmaW5lZCBhbmQgXCJhdXRvXCIgYXJlIGNvbnZlcnRlZCB0byAwLlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICFyZXN1bHQgfHwgcmVzdWx0ID09PSBcImF1dG9cIiA/IDAgOiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24oIHR3ZWVuICkge1xyXG4gICAgICAgICAgICAgICAgLy8gdXNlIHN0ZXAgaG9vayBmb3IgYmFjayBjb21wYXQgLSB1c2UgY3NzSG9vayBpZiBpdHMgdGhlcmUgLSB1c2UgLnN0eWxlIGlmIGl0c1xyXG4gICAgICAgICAgICAgICAgLy8gYXZhaWxhYmxlIGFuZCB1c2UgcGxhaW4gcHJvcGVydGllcyB3aGVyZSBhdmFpbGFibGVcclxuICAgICAgICAgICAgICAgIGlmICggalF1ZXJ5LmZ4LnN0ZXBbIHR3ZWVuLnByb3AgXSApIHtcclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZnguc3RlcFsgdHdlZW4ucHJvcCBdKCB0d2VlbiApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICggdHdlZW4uZWxlbS5zdHlsZSAmJiAoIHR3ZWVuLmVsZW0uc3R5bGVbIGpRdWVyeS5jc3NQcm9wc1sgdHdlZW4ucHJvcCBdIF0gIT0gbnVsbCB8fCBqUXVlcnkuY3NzSG9va3NbIHR3ZWVuLnByb3AgXSApICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS5zdHlsZSggdHdlZW4uZWxlbSwgdHdlZW4ucHJvcCwgdHdlZW4ubm93ICsgdHdlZW4udW5pdCApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0d2Vlbi5lbGVtWyB0d2Vlbi5wcm9wIF0gPSB0d2Vlbi5ub3c7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuLy8gU3VwcG9ydDogSUUgPD05XHJcbi8vIFBhbmljIGJhc2VkIGFwcHJvYWNoIHRvIHNldHRpbmcgdGhpbmdzIG9uIGRpc2Nvbm5lY3RlZCBub2Rlc1xyXG5cclxuICAgIFR3ZWVuLnByb3BIb29rcy5zY3JvbGxUb3AgPSBUd2Vlbi5wcm9wSG9va3Muc2Nyb2xsTGVmdCA9IHtcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKCB0d2VlbiApIHtcclxuICAgICAgICAgICAgaWYgKCB0d2Vlbi5lbGVtLm5vZGVUeXBlICYmIHR3ZWVuLmVsZW0ucGFyZW50Tm9kZSApIHtcclxuICAgICAgICAgICAgICAgIHR3ZWVuLmVsZW1bIHR3ZWVuLnByb3AgXSA9IHR3ZWVuLm5vdztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgalF1ZXJ5LmVhc2luZyA9IHtcclxuICAgICAgICBsaW5lYXI6IGZ1bmN0aW9uKCBwICkge1xyXG4gICAgICAgICAgICByZXR1cm4gcDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN3aW5nOiBmdW5jdGlvbiggcCApIHtcclxuICAgICAgICAgICAgcmV0dXJuIDAuNSAtIE1hdGguY29zKCBwICogTWF0aC5QSSApIC8gMjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGpRdWVyeS5meCA9IFR3ZWVuLnByb3RvdHlwZS5pbml0O1xyXG5cclxuLy8gQmFjayBDb21wYXQgPDEuOCBleHRlbnNpb24gcG9pbnRcclxuICAgIGpRdWVyeS5meC5zdGVwID0ge307XHJcblxyXG5cclxuXHJcblxyXG4gICAgdmFyXHJcbiAgICAgICAgZnhOb3csIHRpbWVySWQsXHJcbiAgICAgICAgcmZ4dHlwZXMgPSAvXig/OnRvZ2dsZXxzaG93fGhpZGUpJC8sXHJcbiAgICAgICAgcmZ4bnVtID0gbmV3IFJlZ0V4cCggXCJeKD86KFsrLV0pPXwpKFwiICsgcG51bSArIFwiKShbYS16JV0qKSRcIiwgXCJpXCIgKSxcclxuICAgICAgICBycnVuID0gL3F1ZXVlSG9va3MkLyxcclxuICAgICAgICBhbmltYXRpb25QcmVmaWx0ZXJzID0gWyBkZWZhdWx0UHJlZmlsdGVyIF0sXHJcbiAgICAgICAgdHdlZW5lcnMgPSB7XHJcbiAgICAgICAgICAgIFwiKlwiOiBbIGZ1bmN0aW9uKCBwcm9wLCB2YWx1ZSApIHtcclxuICAgICAgICAgICAgICAgIHZhciB0d2VlbiA9IHRoaXMuY3JlYXRlVHdlZW4oIHByb3AsIHZhbHVlICksXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gdHdlZW4uY3VyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgcGFydHMgPSByZnhudW0uZXhlYyggdmFsdWUgKSxcclxuICAgICAgICAgICAgICAgICAgICB1bml0ID0gcGFydHMgJiYgcGFydHNbIDMgXSB8fCAoIGpRdWVyeS5jc3NOdW1iZXJbIHByb3AgXSA/IFwiXCIgOiBcInB4XCIgKSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdGFydGluZyB2YWx1ZSBjb21wdXRhdGlvbiBpcyByZXF1aXJlZCBmb3IgcG90ZW50aWFsIHVuaXQgbWlzbWF0Y2hlc1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gKCBqUXVlcnkuY3NzTnVtYmVyWyBwcm9wIF0gfHwgdW5pdCAhPT0gXCJweFwiICYmICt0YXJnZXQgKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZnhudW0uZXhlYyggalF1ZXJ5LmNzcyggdHdlZW4uZWxlbSwgcHJvcCApICksXHJcbiAgICAgICAgICAgICAgICAgICAgc2NhbGUgPSAxLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heEl0ZXJhdGlvbnMgPSAyMDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIHN0YXJ0ICYmIHN0YXJ0WyAzIF0gIT09IHVuaXQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJ1c3QgdW5pdHMgcmVwb3J0ZWQgYnkgalF1ZXJ5LmNzc1xyXG4gICAgICAgICAgICAgICAgICAgIHVuaXQgPSB1bml0IHx8IHN0YXJ0WyAzIF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSB1cGRhdGUgdGhlIHR3ZWVuIHByb3BlcnRpZXMgbGF0ZXIgb25cclxuICAgICAgICAgICAgICAgICAgICBwYXJ0cyA9IHBhcnRzIHx8IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBJdGVyYXRpdmVseSBhcHByb3hpbWF0ZSBmcm9tIGEgbm9uemVybyBzdGFydGluZyBwb2ludFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gK3RhcmdldCB8fCAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHByZXZpb3VzIGl0ZXJhdGlvbiB6ZXJvZWQgb3V0LCBkb3VibGUgdW50aWwgd2UgZ2V0ICpzb21ldGhpbmcqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVzZSBhIHN0cmluZyBmb3IgZG91YmxpbmcgZmFjdG9yIHNvIHdlIGRvbid0IGFjY2lkZW50YWxseSBzZWUgc2NhbGUgYXMgdW5jaGFuZ2VkIGJlbG93XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlID0gc2NhbGUgfHwgXCIuNVwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRqdXN0IGFuZCBhcHBseVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydCA9IHN0YXJ0IC8gc2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5zdHlsZSggdHdlZW4uZWxlbSwgcHJvcCwgc3RhcnQgKyB1bml0ICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgc2NhbGUsIHRvbGVyYXRpbmcgemVybyBvciBOYU4gZnJvbSB0d2Vlbi5jdXIoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBbmQgYnJlYWtpbmcgdGhlIGxvb3AgaWYgc2NhbGUgaXMgdW5jaGFuZ2VkIG9yIHBlcmZlY3QsIG9yIGlmIHdlJ3ZlIGp1c3QgaGFkIGVub3VnaFxyXG4gICAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKCBzY2FsZSAhPT0gKHNjYWxlID0gdHdlZW4uY3VyKCkgLyB0YXJnZXQpICYmIHNjYWxlICE9PSAxICYmIC0tbWF4SXRlcmF0aW9ucyApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0d2VlbiBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICAgICAgICBpZiAoIHBhcnRzICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gdHdlZW4uc3RhcnQgPSArc3RhcnQgfHwgK3RhcmdldCB8fCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHR3ZWVuLnVuaXQgPSB1bml0O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGEgKz0vLT0gdG9rZW4gd2FzIHByb3ZpZGVkLCB3ZSdyZSBkb2luZyBhIHJlbGF0aXZlIGFuaW1hdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIHR3ZWVuLmVuZCA9IHBhcnRzWyAxIF0gP1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0ICsgKCBwYXJ0c1sgMSBdICsgMSApICogcGFydHNbIDIgXSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICtwYXJ0c1sgMiBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0d2VlbjtcclxuICAgICAgICAgICAgfSBdXHJcbiAgICAgICAgfTtcclxuXHJcbi8vIEFuaW1hdGlvbnMgY3JlYXRlZCBzeW5jaHJvbm91c2x5IHdpbGwgcnVuIHN5bmNocm9ub3VzbHlcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUZ4Tm93KCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZ4Tm93ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiAoIGZ4Tm93ID0galF1ZXJ5Lm5vdygpICk7XHJcbiAgICB9XHJcblxyXG4vLyBHZW5lcmF0ZSBwYXJhbWV0ZXJzIHRvIGNyZWF0ZSBhIHN0YW5kYXJkIGFuaW1hdGlvblxyXG4gICAgZnVuY3Rpb24gZ2VuRngoIHR5cGUsIGluY2x1ZGVXaWR0aCApIHtcclxuICAgICAgICB2YXIgd2hpY2gsXHJcbiAgICAgICAgICAgIGF0dHJzID0geyBoZWlnaHQ6IHR5cGUgfSxcclxuICAgICAgICAgICAgaSA9IDA7XHJcblxyXG4gICAgICAgIC8vIGlmIHdlIGluY2x1ZGUgd2lkdGgsIHN0ZXAgdmFsdWUgaXMgMSB0byBkbyBhbGwgY3NzRXhwYW5kIHZhbHVlcyxcclxuICAgICAgICAvLyBpZiB3ZSBkb24ndCBpbmNsdWRlIHdpZHRoLCBzdGVwIHZhbHVlIGlzIDIgdG8gc2tpcCBvdmVyIExlZnQgYW5kIFJpZ2h0XHJcbiAgICAgICAgaW5jbHVkZVdpZHRoID0gaW5jbHVkZVdpZHRoID8gMSA6IDA7XHJcbiAgICAgICAgZm9yICggOyBpIDwgNCA7IGkgKz0gMiAtIGluY2x1ZGVXaWR0aCApIHtcclxuICAgICAgICAgICAgd2hpY2ggPSBjc3NFeHBhbmRbIGkgXTtcclxuICAgICAgICAgICAgYXR0cnNbIFwibWFyZ2luXCIgKyB3aGljaCBdID0gYXR0cnNbIFwicGFkZGluZ1wiICsgd2hpY2ggXSA9IHR5cGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIGluY2x1ZGVXaWR0aCApIHtcclxuICAgICAgICAgICAgYXR0cnMub3BhY2l0eSA9IGF0dHJzLndpZHRoID0gdHlwZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhdHRycztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVUd2VlbiggdmFsdWUsIHByb3AsIGFuaW1hdGlvbiApIHtcclxuICAgICAgICB2YXIgdHdlZW4sXHJcbiAgICAgICAgICAgIGNvbGxlY3Rpb24gPSAoIHR3ZWVuZXJzWyBwcm9wIF0gfHwgW10gKS5jb25jYXQoIHR3ZWVuZXJzWyBcIipcIiBdICksXHJcbiAgICAgICAgICAgIGluZGV4ID0gMCxcclxuICAgICAgICAgICAgbGVuZ3RoID0gY29sbGVjdGlvbi5sZW5ndGg7XHJcbiAgICAgICAgZm9yICggOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcclxuICAgICAgICAgICAgaWYgKCAodHdlZW4gPSBjb2xsZWN0aW9uWyBpbmRleCBdLmNhbGwoIGFuaW1hdGlvbiwgcHJvcCwgdmFsdWUgKSkgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gd2UncmUgZG9uZSB3aXRoIHRoaXMgcHJvcGVydHlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0d2VlbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZWZhdWx0UHJlZmlsdGVyKCBlbGVtLCBwcm9wcywgb3B0cyApIHtcclxuICAgICAgICAvKiBqc2hpbnQgdmFsaWR0aGlzOiB0cnVlICovXHJcbiAgICAgICAgdmFyIHByb3AsIHZhbHVlLCB0b2dnbGUsIHR3ZWVuLCBob29rcywgb2xkZmlyZSwgZGlzcGxheSwgY2hlY2tEaXNwbGF5LFxyXG4gICAgICAgICAgICBhbmltID0gdGhpcyxcclxuICAgICAgICAgICAgb3JpZyA9IHt9LFxyXG4gICAgICAgICAgICBzdHlsZSA9IGVsZW0uc3R5bGUsXHJcbiAgICAgICAgICAgIGhpZGRlbiA9IGVsZW0ubm9kZVR5cGUgJiYgaXNIaWRkZW4oIGVsZW0gKSxcclxuICAgICAgICAgICAgZGF0YVNob3cgPSBqUXVlcnkuX2RhdGEoIGVsZW0sIFwiZnhzaG93XCIgKTtcclxuXHJcbiAgICAgICAgLy8gaGFuZGxlIHF1ZXVlOiBmYWxzZSBwcm9taXNlc1xyXG4gICAgICAgIGlmICggIW9wdHMucXVldWUgKSB7XHJcbiAgICAgICAgICAgIGhvb2tzID0galF1ZXJ5Ll9xdWV1ZUhvb2tzKCBlbGVtLCBcImZ4XCIgKTtcclxuICAgICAgICAgICAgaWYgKCBob29rcy51bnF1ZXVlZCA9PSBudWxsICkge1xyXG4gICAgICAgICAgICAgICAgaG9va3MudW5xdWV1ZWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgb2xkZmlyZSA9IGhvb2tzLmVtcHR5LmZpcmU7XHJcbiAgICAgICAgICAgICAgICBob29rcy5lbXB0eS5maXJlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhaG9va3MudW5xdWV1ZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZGZpcmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGhvb2tzLnVucXVldWVkKys7XHJcblxyXG4gICAgICAgICAgICBhbmltLmFsd2F5cyhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIC8vIGRvaW5nIHRoaXMgbWFrZXMgc3VyZSB0aGF0IHRoZSBjb21wbGV0ZSBoYW5kbGVyIHdpbGwgYmUgY2FsbGVkXHJcbiAgICAgICAgICAgICAgICAvLyBiZWZvcmUgdGhpcyBjb21wbGV0ZXNcclxuICAgICAgICAgICAgICAgIGFuaW0uYWx3YXlzKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhvb2tzLnVucXVldWVkLS07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhalF1ZXJ5LnF1ZXVlKCBlbGVtLCBcImZ4XCIgKS5sZW5ndGggKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvb2tzLmVtcHR5LmZpcmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBoZWlnaHQvd2lkdGggb3ZlcmZsb3cgcGFzc1xyXG4gICAgICAgIGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSAmJiAoIFwiaGVpZ2h0XCIgaW4gcHJvcHMgfHwgXCJ3aWR0aFwiIGluIHByb3BzICkgKSB7XHJcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IG5vdGhpbmcgc25lYWtzIG91dFxyXG4gICAgICAgICAgICAvLyBSZWNvcmQgYWxsIDMgb3ZlcmZsb3cgYXR0cmlidXRlcyBiZWNhdXNlIElFIGRvZXMgbm90XHJcbiAgICAgICAgICAgIC8vIGNoYW5nZSB0aGUgb3ZlcmZsb3cgYXR0cmlidXRlIHdoZW4gb3ZlcmZsb3dYIGFuZFxyXG4gICAgICAgICAgICAvLyBvdmVyZmxvd1kgYXJlIHNldCB0byB0aGUgc2FtZSB2YWx1ZVxyXG4gICAgICAgICAgICBvcHRzLm92ZXJmbG93ID0gWyBzdHlsZS5vdmVyZmxvdywgc3R5bGUub3ZlcmZsb3dYLCBzdHlsZS5vdmVyZmxvd1kgXTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCBkaXNwbGF5IHByb3BlcnR5IHRvIGlubGluZS1ibG9jayBmb3IgaGVpZ2h0L3dpZHRoXHJcbiAgICAgICAgICAgIC8vIGFuaW1hdGlvbnMgb24gaW5saW5lIGVsZW1lbnRzIHRoYXQgYXJlIGhhdmluZyB3aWR0aC9oZWlnaHQgYW5pbWF0ZWRcclxuICAgICAgICAgICAgZGlzcGxheSA9IGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiICk7XHJcblxyXG4gICAgICAgICAgICAvLyBUZXN0IGRlZmF1bHQgZGlzcGxheSBpZiBkaXNwbGF5IGlzIGN1cnJlbnRseSBcIm5vbmVcIlxyXG4gICAgICAgICAgICBjaGVja0Rpc3BsYXkgPSBkaXNwbGF5ID09PSBcIm5vbmVcIiA/XHJcbiAgICAgICAgICAgIGpRdWVyeS5fZGF0YSggZWxlbSwgXCJvbGRkaXNwbGF5XCIgKSB8fCBkZWZhdWx0RGlzcGxheSggZWxlbS5ub2RlTmFtZSApIDogZGlzcGxheTtcclxuXHJcbiAgICAgICAgICAgIGlmICggY2hlY2tEaXNwbGF5ID09PSBcImlubGluZVwiICYmIGpRdWVyeS5jc3MoIGVsZW0sIFwiZmxvYXRcIiApID09PSBcIm5vbmVcIiApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpbmxpbmUtbGV2ZWwgZWxlbWVudHMgYWNjZXB0IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgICAgIC8vIGJsb2NrLWxldmVsIGVsZW1lbnRzIG5lZWQgdG8gYmUgaW5saW5lIHdpdGggbGF5b3V0XHJcbiAgICAgICAgICAgICAgICBpZiAoICFzdXBwb3J0LmlubGluZUJsb2NrTmVlZHNMYXlvdXQgfHwgZGVmYXVsdERpc3BsYXkoIGVsZW0ubm9kZU5hbWUgKSA9PT0gXCJpbmxpbmVcIiApIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUuem9vbSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggb3B0cy5vdmVyZmxvdyApIHtcclxuICAgICAgICAgICAgc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xyXG4gICAgICAgICAgICBpZiAoICFzdXBwb3J0LnNocmlua1dyYXBCbG9ja3MoKSApIHtcclxuICAgICAgICAgICAgICAgIGFuaW0uYWx3YXlzKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlLm92ZXJmbG93ID0gb3B0cy5vdmVyZmxvd1sgMCBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlLm92ZXJmbG93WCA9IG9wdHMub3ZlcmZsb3dbIDEgXTtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZS5vdmVyZmxvd1kgPSBvcHRzLm92ZXJmbG93WyAyIF07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc2hvdy9oaWRlIHBhc3NcclxuICAgICAgICBmb3IgKCBwcm9wIGluIHByb3BzICkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHByb3BzWyBwcm9wIF07XHJcbiAgICAgICAgICAgIGlmICggcmZ4dHlwZXMuZXhlYyggdmFsdWUgKSApIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBwcm9wc1sgcHJvcCBdO1xyXG4gICAgICAgICAgICAgICAgdG9nZ2xlID0gdG9nZ2xlIHx8IHZhbHVlID09PSBcInRvZ2dsZVwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKCB2YWx1ZSA9PT0gKCBoaWRkZW4gPyBcImhpZGVcIiA6IFwic2hvd1wiICkgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIGRhdGFTaG93IGxlZnQgb3ZlciBmcm9tIGEgc3RvcHBlZCBoaWRlIG9yIHNob3cgYW5kIHdlIGFyZSBnb2luZyB0byBwcm9jZWVkIHdpdGggc2hvdywgd2Ugc2hvdWxkIHByZXRlbmQgdG8gYmUgaGlkZGVuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB2YWx1ZSA9PT0gXCJzaG93XCIgJiYgZGF0YVNob3cgJiYgZGF0YVNob3dbIHByb3AgXSAhPT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9yaWdbIHByb3AgXSA9IGRhdGFTaG93ICYmIGRhdGFTaG93WyBwcm9wIF0gfHwgalF1ZXJ5LnN0eWxlKCBlbGVtLCBwcm9wICk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQW55IG5vbi1meCB2YWx1ZSBzdG9wcyB1cyBmcm9tIHJlc3RvcmluZyB0aGUgb3JpZ2luYWwgZGlzcGxheSB2YWx1ZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCAhalF1ZXJ5LmlzRW1wdHlPYmplY3QoIG9yaWcgKSApIHtcclxuICAgICAgICAgICAgaWYgKCBkYXRhU2hvdyApIHtcclxuICAgICAgICAgICAgICAgIGlmICggXCJoaWRkZW5cIiBpbiBkYXRhU2hvdyApIHtcclxuICAgICAgICAgICAgICAgICAgICBoaWRkZW4gPSBkYXRhU2hvdy5oaWRkZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhU2hvdyA9IGpRdWVyeS5fZGF0YSggZWxlbSwgXCJmeHNob3dcIiwge30gKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gc3RvcmUgc3RhdGUgaWYgaXRzIHRvZ2dsZSAtIGVuYWJsZXMgLnN0b3AoKS50b2dnbGUoKSB0byBcInJldmVyc2VcIlxyXG4gICAgICAgICAgICBpZiAoIHRvZ2dsZSApIHtcclxuICAgICAgICAgICAgICAgIGRhdGFTaG93LmhpZGRlbiA9ICFoaWRkZW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCBoaWRkZW4gKSB7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkoIGVsZW0gKS5zaG93KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbmltLmRvbmUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCBlbGVtICkuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYW5pbS5kb25lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb3A7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkuX3JlbW92ZURhdGEoIGVsZW0sIFwiZnhzaG93XCIgKTtcclxuICAgICAgICAgICAgICAgIGZvciAoIHByb3AgaW4gb3JpZyApIHtcclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuc3R5bGUoIGVsZW0sIHByb3AsIG9yaWdbIHByb3AgXSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZm9yICggcHJvcCBpbiBvcmlnICkge1xyXG4gICAgICAgICAgICAgICAgdHdlZW4gPSBjcmVhdGVUd2VlbiggaGlkZGVuID8gZGF0YVNob3dbIHByb3AgXSA6IDAsIHByb3AsIGFuaW0gKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoICEoIHByb3AgaW4gZGF0YVNob3cgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhU2hvd1sgcHJvcCBdID0gdHdlZW4uc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBoaWRkZW4gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR3ZWVuLmVuZCA9IHR3ZWVuLnN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0d2Vlbi5zdGFydCA9IHByb3AgPT09IFwid2lkdGhcIiB8fCBwcm9wID09PSBcImhlaWdodFwiID8gMSA6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGlzIGlzIGEgbm9vcCBsaWtlIC5oaWRlKCkuaGlkZSgpLCByZXN0b3JlIGFuIG92ZXJ3cml0dGVuIGRpc3BsYXkgdmFsdWVcclxuICAgICAgICB9IGVsc2UgaWYgKCAoZGlzcGxheSA9PT0gXCJub25lXCIgPyBkZWZhdWx0RGlzcGxheSggZWxlbS5ub2RlTmFtZSApIDogZGlzcGxheSkgPT09IFwiaW5saW5lXCIgKSB7XHJcbiAgICAgICAgICAgIHN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwcm9wRmlsdGVyKCBwcm9wcywgc3BlY2lhbEVhc2luZyApIHtcclxuICAgICAgICB2YXIgaW5kZXgsIG5hbWUsIGVhc2luZywgdmFsdWUsIGhvb2tzO1xyXG5cclxuICAgICAgICAvLyBjYW1lbENhc2UsIHNwZWNpYWxFYXNpbmcgYW5kIGV4cGFuZCBjc3NIb29rIHBhc3NcclxuICAgICAgICBmb3IgKCBpbmRleCBpbiBwcm9wcyApIHtcclxuICAgICAgICAgICAgbmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIGluZGV4ICk7XHJcbiAgICAgICAgICAgIGVhc2luZyA9IHNwZWNpYWxFYXNpbmdbIG5hbWUgXTtcclxuICAgICAgICAgICAgdmFsdWUgPSBwcm9wc1sgaW5kZXggXTtcclxuICAgICAgICAgICAgaWYgKCBqUXVlcnkuaXNBcnJheSggdmFsdWUgKSApIHtcclxuICAgICAgICAgICAgICAgIGVhc2luZyA9IHZhbHVlWyAxIF07XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHByb3BzWyBpbmRleCBdID0gdmFsdWVbIDAgXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCBpbmRleCAhPT0gbmFtZSApIHtcclxuICAgICAgICAgICAgICAgIHByb3BzWyBuYW1lIF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBwcm9wc1sgaW5kZXggXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaG9va3MgPSBqUXVlcnkuY3NzSG9va3NbIG5hbWUgXTtcclxuICAgICAgICAgICAgaWYgKCBob29rcyAmJiBcImV4cGFuZFwiIGluIGhvb2tzICkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBob29rcy5leHBhbmQoIHZhbHVlICk7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgcHJvcHNbIG5hbWUgXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBub3QgcXVpdGUgJC5leHRlbmQsIHRoaXMgd29udCBvdmVyd3JpdGUga2V5cyBhbHJlYWR5IHByZXNlbnQuXHJcbiAgICAgICAgICAgICAgICAvLyBhbHNvIC0gcmV1c2luZyAnaW5kZXgnIGZyb20gYWJvdmUgYmVjYXVzZSB3ZSBoYXZlIHRoZSBjb3JyZWN0IFwibmFtZVwiXHJcbiAgICAgICAgICAgICAgICBmb3IgKCBpbmRleCBpbiB2YWx1ZSApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoICEoIGluZGV4IGluIHByb3BzICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzWyBpbmRleCBdID0gdmFsdWVbIGluZGV4IF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwZWNpYWxFYXNpbmdbIGluZGV4IF0gPSBlYXNpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3BlY2lhbEVhc2luZ1sgbmFtZSBdID0gZWFzaW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIEFuaW1hdGlvbiggZWxlbSwgcHJvcGVydGllcywgb3B0aW9ucyApIHtcclxuICAgICAgICB2YXIgcmVzdWx0LFxyXG4gICAgICAgICAgICBzdG9wcGVkLFxyXG4gICAgICAgICAgICBpbmRleCA9IDAsXHJcbiAgICAgICAgICAgIGxlbmd0aCA9IGFuaW1hdGlvblByZWZpbHRlcnMubGVuZ3RoLFxyXG4gICAgICAgICAgICBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLmFsd2F5cyggZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBkb24ndCBtYXRjaCBlbGVtIGluIHRoZSA6YW5pbWF0ZWQgc2VsZWN0b3JcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aWNrLmVsZW07XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB0aWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIHN0b3BwZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRUaW1lID0gZnhOb3cgfHwgY3JlYXRlRnhOb3coKSxcclxuICAgICAgICAgICAgICAgICAgICByZW1haW5pbmcgPSBNYXRoLm1heCggMCwgYW5pbWF0aW9uLnN0YXJ0VGltZSArIGFuaW1hdGlvbi5kdXJhdGlvbiAtIGN1cnJlbnRUaW1lICksXHJcbiAgICAgICAgICAgICAgICAvLyBhcmNoYWljIGNyYXNoIGJ1ZyB3b24ndCBhbGxvdyB1cyB0byB1c2UgMSAtICggMC41IHx8IDAgKSAoIzEyNDk3KVxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXAgPSByZW1haW5pbmcgLyBhbmltYXRpb24uZHVyYXRpb24gfHwgMCxcclxuICAgICAgICAgICAgICAgICAgICBwZXJjZW50ID0gMSAtIHRlbXAsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IGFuaW1hdGlvbi50d2VlbnMubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoIDsgaW5kZXggPCBsZW5ndGggOyBpbmRleCsrICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi50d2VlbnNbIGluZGV4IF0ucnVuKCBwZXJjZW50ICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQubm90aWZ5V2l0aCggZWxlbSwgWyBhbmltYXRpb24sIHBlcmNlbnQsIHJlbWFpbmluZyBdKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIHBlcmNlbnQgPCAxICYmIGxlbmd0aCApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVtYWluaW5nO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCggZWxlbSwgWyBhbmltYXRpb24gXSApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYW5pbWF0aW9uID0gZGVmZXJyZWQucHJvbWlzZSh7XHJcbiAgICAgICAgICAgICAgICBlbGVtOiBlbGVtLFxyXG4gICAgICAgICAgICAgICAgcHJvcHM6IGpRdWVyeS5leHRlbmQoIHt9LCBwcm9wZXJ0aWVzICksXHJcbiAgICAgICAgICAgICAgICBvcHRzOiBqUXVlcnkuZXh0ZW5kKCB0cnVlLCB7IHNwZWNpYWxFYXNpbmc6IHt9IH0sIG9wdGlvbnMgKSxcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsUHJvcGVydGllczogcHJvcGVydGllcyxcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsT3B0aW9uczogb3B0aW9ucyxcclxuICAgICAgICAgICAgICAgIHN0YXJ0VGltZTogZnhOb3cgfHwgY3JlYXRlRnhOb3coKSxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBvcHRpb25zLmR1cmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgdHdlZW5zOiBbXSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVR3ZWVuOiBmdW5jdGlvbiggcHJvcCwgZW5kICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0d2VlbiA9IGpRdWVyeS5Ud2VlbiggZWxlbSwgYW5pbWF0aW9uLm9wdHMsIHByb3AsIGVuZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLm9wdHMuc3BlY2lhbEVhc2luZ1sgcHJvcCBdIHx8IGFuaW1hdGlvbi5vcHRzLmVhc2luZyApO1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi50d2VlbnMucHVzaCggdHdlZW4gKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHdlZW47XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3RvcDogZnVuY3Rpb24oIGdvdG9FbmQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gMCxcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiB3ZSBhcmUgZ29pbmcgdG8gdGhlIGVuZCwgd2Ugd2FudCB0byBydW4gYWxsIHRoZSB0d2VlbnNcclxuICAgICAgICAgICAgICAgICAgICAvLyBvdGhlcndpc2Ugd2Ugc2tpcCB0aGlzIHBhcnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID0gZ290b0VuZCA/IGFuaW1hdGlvbi50d2VlbnMubGVuZ3RoIDogMDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIHN0b3BwZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzdG9wcGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKCA7IGluZGV4IDwgbGVuZ3RoIDsgaW5kZXgrKyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLnR3ZWVuc1sgaW5kZXggXS5ydW4oIDEgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlc29sdmUgd2hlbiB3ZSBwbGF5ZWQgdGhlIGxhc3QgZnJhbWVcclxuICAgICAgICAgICAgICAgICAgICAvLyBvdGhlcndpc2UsIHJlamVjdFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggZ290b0VuZCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uLCBnb3RvRW5kIF0gKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3RXaXRoKCBlbGVtLCBbIGFuaW1hdGlvbiwgZ290b0VuZCBdICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgcHJvcHMgPSBhbmltYXRpb24ucHJvcHM7XHJcblxyXG4gICAgICAgIHByb3BGaWx0ZXIoIHByb3BzLCBhbmltYXRpb24ub3B0cy5zcGVjaWFsRWFzaW5nICk7XHJcblxyXG4gICAgICAgIGZvciAoIDsgaW5kZXggPCBsZW5ndGggOyBpbmRleCsrICkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBhbmltYXRpb25QcmVmaWx0ZXJzWyBpbmRleCBdLmNhbGwoIGFuaW1hdGlvbiwgZWxlbSwgcHJvcHMsIGFuaW1hdGlvbi5vcHRzICk7XHJcbiAgICAgICAgICAgIGlmICggcmVzdWx0ICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgalF1ZXJ5Lm1hcCggcHJvcHMsIGNyZWF0ZVR3ZWVuLCBhbmltYXRpb24gKTtcclxuXHJcbiAgICAgICAgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggYW5pbWF0aW9uLm9wdHMuc3RhcnQgKSApIHtcclxuICAgICAgICAgICAgYW5pbWF0aW9uLm9wdHMuc3RhcnQuY2FsbCggZWxlbSwgYW5pbWF0aW9uICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBqUXVlcnkuZngudGltZXIoXHJcbiAgICAgICAgICAgIGpRdWVyeS5leHRlbmQoIHRpY2ssIHtcclxuICAgICAgICAgICAgICAgIGVsZW06IGVsZW0sXHJcbiAgICAgICAgICAgICAgICBhbmltOiBhbmltYXRpb24sXHJcbiAgICAgICAgICAgICAgICBxdWV1ZTogYW5pbWF0aW9uLm9wdHMucXVldWVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBhdHRhY2ggY2FsbGJhY2tzIGZyb20gb3B0aW9uc1xyXG4gICAgICAgIHJldHVybiBhbmltYXRpb24ucHJvZ3Jlc3MoIGFuaW1hdGlvbi5vcHRzLnByb2dyZXNzIClcclxuICAgICAgICAgICAgLmRvbmUoIGFuaW1hdGlvbi5vcHRzLmRvbmUsIGFuaW1hdGlvbi5vcHRzLmNvbXBsZXRlIClcclxuICAgICAgICAgICAgLmZhaWwoIGFuaW1hdGlvbi5vcHRzLmZhaWwgKVxyXG4gICAgICAgICAgICAuYWx3YXlzKCBhbmltYXRpb24ub3B0cy5hbHdheXMgKTtcclxuICAgIH1cclxuXHJcbiAgICBqUXVlcnkuQW5pbWF0aW9uID0galF1ZXJ5LmV4dGVuZCggQW5pbWF0aW9uLCB7XHJcbiAgICAgICAgdHdlZW5lcjogZnVuY3Rpb24oIHByb3BzLCBjYWxsYmFjayApIHtcclxuICAgICAgICAgICAgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggcHJvcHMgKSApIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gcHJvcHM7XHJcbiAgICAgICAgICAgICAgICBwcm9wcyA9IFsgXCIqXCIgXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHByb3BzID0gcHJvcHMuc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgcHJvcCxcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gMCxcclxuICAgICAgICAgICAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIGZvciAoIDsgaW5kZXggPCBsZW5ndGggOyBpbmRleCsrICkge1xyXG4gICAgICAgICAgICAgICAgcHJvcCA9IHByb3BzWyBpbmRleCBdO1xyXG4gICAgICAgICAgICAgICAgdHdlZW5lcnNbIHByb3AgXSA9IHR3ZWVuZXJzWyBwcm9wIF0gfHwgW107XHJcbiAgICAgICAgICAgICAgICB0d2VlbmVyc1sgcHJvcCBdLnVuc2hpZnQoIGNhbGxiYWNrICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBwcmVmaWx0ZXI6IGZ1bmN0aW9uKCBjYWxsYmFjaywgcHJlcGVuZCApIHtcclxuICAgICAgICAgICAgaWYgKCBwcmVwZW5kICkge1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uUHJlZmlsdGVycy51bnNoaWZ0KCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uUHJlZmlsdGVycy5wdXNoKCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgalF1ZXJ5LnNwZWVkID0gZnVuY3Rpb24oIHNwZWVkLCBlYXNpbmcsIGZuICkge1xyXG4gICAgICAgIHZhciBvcHQgPSBzcGVlZCAmJiB0eXBlb2Ygc3BlZWQgPT09IFwib2JqZWN0XCIgPyBqUXVlcnkuZXh0ZW5kKCB7fSwgc3BlZWQgKSA6IHtcclxuICAgICAgICAgICAgY29tcGxldGU6IGZuIHx8ICFmbiAmJiBlYXNpbmcgfHxcclxuICAgICAgICAgICAgalF1ZXJ5LmlzRnVuY3Rpb24oIHNwZWVkICkgJiYgc3BlZWQsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBzcGVlZCxcclxuICAgICAgICAgICAgZWFzaW5nOiBmbiAmJiBlYXNpbmcgfHwgZWFzaW5nICYmICFqUXVlcnkuaXNGdW5jdGlvbiggZWFzaW5nICkgJiYgZWFzaW5nXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb3B0LmR1cmF0aW9uID0galF1ZXJ5LmZ4Lm9mZiA/IDAgOiB0eXBlb2Ygb3B0LmR1cmF0aW9uID09PSBcIm51bWJlclwiID8gb3B0LmR1cmF0aW9uIDpcclxuICAgICAgICAgICAgb3B0LmR1cmF0aW9uIGluIGpRdWVyeS5meC5zcGVlZHMgPyBqUXVlcnkuZnguc3BlZWRzWyBvcHQuZHVyYXRpb24gXSA6IGpRdWVyeS5meC5zcGVlZHMuX2RlZmF1bHQ7XHJcblxyXG4gICAgICAgIC8vIG5vcm1hbGl6ZSBvcHQucXVldWUgLSB0cnVlL3VuZGVmaW5lZC9udWxsIC0+IFwiZnhcIlxyXG4gICAgICAgIGlmICggb3B0LnF1ZXVlID09IG51bGwgfHwgb3B0LnF1ZXVlID09PSB0cnVlICkge1xyXG4gICAgICAgICAgICBvcHQucXVldWUgPSBcImZ4XCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBRdWV1ZWluZ1xyXG4gICAgICAgIG9wdC5vbGQgPSBvcHQuY29tcGxldGU7XHJcblxyXG4gICAgICAgIG9wdC5jb21wbGV0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBvcHQub2xkICkgKSB7XHJcbiAgICAgICAgICAgICAgICBvcHQub2xkLmNhbGwoIHRoaXMgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCBvcHQucXVldWUgKSB7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkuZGVxdWV1ZSggdGhpcywgb3B0LnF1ZXVlICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gb3B0O1xyXG4gICAgfTtcclxuXHJcbiAgICBqUXVlcnkuZm4uZXh0ZW5kKHtcclxuICAgICAgICBmYWRlVG86IGZ1bmN0aW9uKCBzcGVlZCwgdG8sIGVhc2luZywgY2FsbGJhY2sgKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBzaG93IGFueSBoaWRkZW4gZWxlbWVudHMgYWZ0ZXIgc2V0dGluZyBvcGFjaXR5IHRvIDBcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKCBpc0hpZGRlbiApLmNzcyggXCJvcGFjaXR5XCIsIDAgKS5zaG93KClcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBhbmltYXRlIHRvIHRoZSB2YWx1ZSBzcGVjaWZpZWRcclxuICAgICAgICAgICAgICAgIC5lbmQoKS5hbmltYXRlKHsgb3BhY2l0eTogdG8gfSwgc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFuaW1hdGU6IGZ1bmN0aW9uKCBwcm9wLCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApIHtcclxuICAgICAgICAgICAgdmFyIGVtcHR5ID0galF1ZXJ5LmlzRW1wdHlPYmplY3QoIHByb3AgKSxcclxuICAgICAgICAgICAgICAgIG9wdGFsbCA9IGpRdWVyeS5zcGVlZCggc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKSxcclxuICAgICAgICAgICAgICAgIGRvQW5pbWF0aW9uID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT3BlcmF0ZSBvbiBhIGNvcHkgb2YgcHJvcCBzbyBwZXItcHJvcGVydHkgZWFzaW5nIHdvbid0IGJlIGxvc3RcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYW5pbSA9IEFuaW1hdGlvbiggdGhpcywgalF1ZXJ5LmV4dGVuZCgge30sIHByb3AgKSwgb3B0YWxsICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEVtcHR5IGFuaW1hdGlvbnMsIG9yIGZpbmlzaGluZyByZXNvbHZlcyBpbW1lZGlhdGVseVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggZW1wdHkgfHwgalF1ZXJ5Ll9kYXRhKCB0aGlzLCBcImZpbmlzaFwiICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW0uc3RvcCggdHJ1ZSApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGRvQW5pbWF0aW9uLmZpbmlzaCA9IGRvQW5pbWF0aW9uO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGVtcHR5IHx8IG9wdGFsbC5xdWV1ZSA9PT0gZmFsc2UgP1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lYWNoKCBkb0FuaW1hdGlvbiApIDpcclxuICAgICAgICAgICAgICAgIHRoaXMucXVldWUoIG9wdGFsbC5xdWV1ZSwgZG9BbmltYXRpb24gKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0b3A6IGZ1bmN0aW9uKCB0eXBlLCBjbGVhclF1ZXVlLCBnb3RvRW5kICkge1xyXG4gICAgICAgICAgICB2YXIgc3RvcFF1ZXVlID0gZnVuY3Rpb24oIGhvb2tzICkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0b3AgPSBob29rcy5zdG9wO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGhvb2tzLnN0b3A7XHJcbiAgICAgICAgICAgICAgICBzdG9wKCBnb3RvRW5kICk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZiAoIHR5cGVvZiB0eXBlICE9PSBcInN0cmluZ1wiICkge1xyXG4gICAgICAgICAgICAgICAgZ290b0VuZCA9IGNsZWFyUXVldWU7XHJcbiAgICAgICAgICAgICAgICBjbGVhclF1ZXVlID0gdHlwZTtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCBjbGVhclF1ZXVlICYmIHR5cGUgIT09IGZhbHNlICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5xdWV1ZSggdHlwZSB8fCBcImZ4XCIsIFtdICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVxdWV1ZSA9IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSB0eXBlICE9IG51bGwgJiYgdHlwZSArIFwicXVldWVIb29rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVycyA9IGpRdWVyeS50aW1lcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGpRdWVyeS5fZGF0YSggdGhpcyApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggaW5kZXggKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBkYXRhWyBpbmRleCBdICYmIGRhdGFbIGluZGV4IF0uc3RvcCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcFF1ZXVlKCBkYXRhWyBpbmRleCBdICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKCBpbmRleCBpbiBkYXRhICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGRhdGFbIGluZGV4IF0gJiYgZGF0YVsgaW5kZXggXS5zdG9wICYmIHJydW4udGVzdCggaW5kZXggKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BRdWV1ZSggZGF0YVsgaW5kZXggXSApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoIGluZGV4ID0gdGltZXJzLmxlbmd0aDsgaW5kZXgtLTsgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB0aW1lcnNbIGluZGV4IF0uZWxlbSA9PT0gdGhpcyAmJiAodHlwZSA9PSBudWxsIHx8IHRpbWVyc1sgaW5kZXggXS5xdWV1ZSA9PT0gdHlwZSkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVyc1sgaW5kZXggXS5hbmltLnN0b3AoIGdvdG9FbmQgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVxdWV1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lcnMuc3BsaWNlKCBpbmRleCwgMSApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBzdGFydCB0aGUgbmV4dCBpbiB0aGUgcXVldWUgaWYgdGhlIGxhc3Qgc3RlcCB3YXNuJ3QgZm9yY2VkXHJcbiAgICAgICAgICAgICAgICAvLyB0aW1lcnMgY3VycmVudGx5IHdpbGwgY2FsbCB0aGVpciBjb21wbGV0ZSBjYWxsYmFja3MsIHdoaWNoIHdpbGwgZGVxdWV1ZVxyXG4gICAgICAgICAgICAgICAgLy8gYnV0IG9ubHkgaWYgdGhleSB3ZXJlIGdvdG9FbmRcclxuICAgICAgICAgICAgICAgIGlmICggZGVxdWV1ZSB8fCAhZ290b0VuZCApIHtcclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZGVxdWV1ZSggdGhpcywgdHlwZSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZpbmlzaDogZnVuY3Rpb24oIHR5cGUgKSB7XHJcbiAgICAgICAgICAgIGlmICggdHlwZSAhPT0gZmFsc2UgKSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gdHlwZSB8fCBcImZ4XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0galF1ZXJ5Ll9kYXRhKCB0aGlzICksXHJcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSBkYXRhWyB0eXBlICsgXCJxdWV1ZVwiIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgaG9va3MgPSBkYXRhWyB0eXBlICsgXCJxdWV1ZUhvb2tzXCIgXSxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lcnMgPSBqUXVlcnkudGltZXJzLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IHF1ZXVlID8gcXVldWUubGVuZ3RoIDogMDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBlbmFibGUgZmluaXNoaW5nIGZsYWcgb24gcHJpdmF0ZSBkYXRhXHJcbiAgICAgICAgICAgICAgICBkYXRhLmZpbmlzaCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZW1wdHkgdGhlIHF1ZXVlIGZpcnN0XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkucXVldWUoIHRoaXMsIHR5cGUsIFtdICk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCBob29rcyAmJiBob29rcy5zdG9wICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhvb2tzLnN0b3AuY2FsbCggdGhpcywgdHJ1ZSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGxvb2sgZm9yIGFueSBhY3RpdmUgYW5pbWF0aW9ucywgYW5kIGZpbmlzaCB0aGVtXHJcbiAgICAgICAgICAgICAgICBmb3IgKCBpbmRleCA9IHRpbWVycy5sZW5ndGg7IGluZGV4LS07ICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggdGltZXJzWyBpbmRleCBdLmVsZW0gPT09IHRoaXMgJiYgdGltZXJzWyBpbmRleCBdLnF1ZXVlID09PSB0eXBlICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lcnNbIGluZGV4IF0uYW5pbS5zdG9wKCB0cnVlICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVycy5zcGxpY2UoIGluZGV4LCAxICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGxvb2sgZm9yIGFueSBhbmltYXRpb25zIGluIHRoZSBvbGQgcXVldWUgYW5kIGZpbmlzaCB0aGVtXHJcbiAgICAgICAgICAgICAgICBmb3IgKCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggcXVldWVbIGluZGV4IF0gJiYgcXVldWVbIGluZGV4IF0uZmluaXNoICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZVsgaW5kZXggXS5maW5pc2guY2FsbCggdGhpcyApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0dXJuIG9mZiBmaW5pc2hpbmcgZmxhZ1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGRhdGEuZmluaXNoO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBqUXVlcnkuZWFjaChbIFwidG9nZ2xlXCIsIFwic2hvd1wiLCBcImhpZGVcIiBdLCBmdW5jdGlvbiggaSwgbmFtZSApIHtcclxuICAgICAgICB2YXIgY3NzRm4gPSBqUXVlcnkuZm5bIG5hbWUgXTtcclxuICAgICAgICBqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNwZWVkID09IG51bGwgfHwgdHlwZW9mIHNwZWVkID09PSBcImJvb2xlYW5cIiA/XHJcbiAgICAgICAgICAgICAgICBjc3NGbi5hcHBseSggdGhpcywgYXJndW1lbnRzICkgOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlKCBnZW5GeCggbmFtZSwgdHJ1ZSApLCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApO1xyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbi8vIEdlbmVyYXRlIHNob3J0Y3V0cyBmb3IgY3VzdG9tIGFuaW1hdGlvbnNcclxuICAgIGpRdWVyeS5lYWNoKHtcclxuICAgICAgICBzbGlkZURvd246IGdlbkZ4KFwic2hvd1wiKSxcclxuICAgICAgICBzbGlkZVVwOiBnZW5GeChcImhpZGVcIiksXHJcbiAgICAgICAgc2xpZGVUb2dnbGU6IGdlbkZ4KFwidG9nZ2xlXCIpLFxyXG4gICAgICAgIGZhZGVJbjogeyBvcGFjaXR5OiBcInNob3dcIiB9LFxyXG4gICAgICAgIGZhZGVPdXQ6IHsgb3BhY2l0eTogXCJoaWRlXCIgfSxcclxuICAgICAgICBmYWRlVG9nZ2xlOiB7IG9wYWNpdHk6IFwidG9nZ2xlXCIgfVxyXG4gICAgfSwgZnVuY3Rpb24oIG5hbWUsIHByb3BzICkge1xyXG4gICAgICAgIGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hbmltYXRlKCBwcm9wcywgc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKTtcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgalF1ZXJ5LnRpbWVycyA9IFtdO1xyXG4gICAgalF1ZXJ5LmZ4LnRpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgdGltZXIsXHJcbiAgICAgICAgICAgIHRpbWVycyA9IGpRdWVyeS50aW1lcnMsXHJcbiAgICAgICAgICAgIGkgPSAwO1xyXG5cclxuICAgICAgICBmeE5vdyA9IGpRdWVyeS5ub3coKTtcclxuXHJcbiAgICAgICAgZm9yICggOyBpIDwgdGltZXJzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgICB0aW1lciA9IHRpbWVyc1sgaSBdO1xyXG4gICAgICAgICAgICAvLyBDaGVja3MgdGhlIHRpbWVyIGhhcyBub3QgYWxyZWFkeSBiZWVuIHJlbW92ZWRcclxuICAgICAgICAgICAgaWYgKCAhdGltZXIoKSAmJiB0aW1lcnNbIGkgXSA9PT0gdGltZXIgKSB7XHJcbiAgICAgICAgICAgICAgICB0aW1lcnMuc3BsaWNlKCBpLS0sIDEgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCAhdGltZXJzLmxlbmd0aCApIHtcclxuICAgICAgICAgICAgalF1ZXJ5LmZ4LnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnhOb3cgPSB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIGpRdWVyeS5meC50aW1lciA9IGZ1bmN0aW9uKCB0aW1lciApIHtcclxuICAgICAgICBqUXVlcnkudGltZXJzLnB1c2goIHRpbWVyICk7XHJcbiAgICAgICAgaWYgKCB0aW1lcigpICkge1xyXG4gICAgICAgICAgICBqUXVlcnkuZnguc3RhcnQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBqUXVlcnkudGltZXJzLnBvcCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgalF1ZXJ5LmZ4LmludGVydmFsID0gMTM7XHJcblxyXG4gICAgalF1ZXJ5LmZ4LnN0YXJ0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCAhdGltZXJJZCApIHtcclxuICAgICAgICAgICAgdGltZXJJZCA9IHNldEludGVydmFsKCBqUXVlcnkuZngudGljaywgalF1ZXJ5LmZ4LmludGVydmFsICk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBqUXVlcnkuZnguc3RvcCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoIHRpbWVySWQgKTtcclxuICAgICAgICB0aW1lcklkID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgalF1ZXJ5LmZ4LnNwZWVkcyA9IHtcclxuICAgICAgICBzbG93OiA2MDAsXHJcbiAgICAgICAgZmFzdDogMjAwLFxyXG4gICAgICAgIC8vIERlZmF1bHQgc3BlZWRcclxuICAgICAgICBfZGVmYXVsdDogNDAwXHJcbiAgICB9O1xyXG5cclxuXHJcbi8vIEJhc2VkIG9mZiBvZiB0aGUgcGx1Z2luIGJ5IENsaW50IEhlbGZlcnMsIHdpdGggcGVybWlzc2lvbi5cclxuLy8gaHR0cDovL2JsaW5kc2lnbmFscy5jb20vaW5kZXgucGhwLzIwMDkvMDcvanF1ZXJ5LWRlbGF5L1xyXG4gICAgalF1ZXJ5LmZuLmRlbGF5ID0gZnVuY3Rpb24oIHRpbWUsIHR5cGUgKSB7XHJcbiAgICAgICAgdGltZSA9IGpRdWVyeS5meCA/IGpRdWVyeS5meC5zcGVlZHNbIHRpbWUgXSB8fCB0aW1lIDogdGltZTtcclxuICAgICAgICB0eXBlID0gdHlwZSB8fCBcImZ4XCI7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXVlKCB0eXBlLCBmdW5jdGlvbiggbmV4dCwgaG9va3MgKSB7XHJcbiAgICAgICAgICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dCggbmV4dCwgdGltZSApO1xyXG4gICAgICAgICAgICBob29rcy5zdG9wID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoIHRpbWVvdXQgKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBNaW5pZmllZDogdmFyIGEsYixjLGQsZVxyXG4gICAgICAgIHZhciBpbnB1dCwgZGl2LCBzZWxlY3QsIGEsIG9wdDtcclxuXHJcbiAgICAgICAgLy8gU2V0dXBcclxuICAgICAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICk7XHJcbiAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSggXCJjbGFzc05hbWVcIiwgXCJ0XCIgKTtcclxuICAgICAgICBkaXYuaW5uZXJIVE1MID0gXCIgIDxsaW5rLz48dGFibGU+PC90YWJsZT48YSBocmVmPScvYSc+YTwvYT48aW5wdXQgdHlwZT0nY2hlY2tib3gnLz5cIjtcclxuICAgICAgICBhID0gZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYVwiKVsgMCBdO1xyXG5cclxuICAgICAgICAvLyBGaXJzdCBiYXRjaCBvZiB0ZXN0cy5cclxuICAgICAgICBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xyXG4gICAgICAgIG9wdCA9IHNlbGVjdC5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKSApO1xyXG4gICAgICAgIGlucHV0ID0gZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaW5wdXRcIilbIDAgXTtcclxuXHJcbiAgICAgICAgYS5zdHlsZS5jc3NUZXh0ID0gXCJ0b3A6MXB4XCI7XHJcblxyXG4gICAgICAgIC8vIFRlc3Qgc2V0QXR0cmlidXRlIG9uIGNhbWVsQ2FzZSBjbGFzcy4gSWYgaXQgd29ya3MsIHdlIG5lZWQgYXR0ckZpeGVzIHdoZW4gZG9pbmcgZ2V0L3NldEF0dHJpYnV0ZSAoaWU2LzcpXHJcbiAgICAgICAgc3VwcG9ydC5nZXRTZXRBdHRyaWJ1dGUgPSBkaXYuY2xhc3NOYW1lICE9PSBcInRcIjtcclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSBzdHlsZSBpbmZvcm1hdGlvbiBmcm9tIGdldEF0dHJpYnV0ZVxyXG4gICAgICAgIC8vIChJRSB1c2VzIC5jc3NUZXh0IGluc3RlYWQpXHJcbiAgICAgICAgc3VwcG9ydC5zdHlsZSA9IC90b3AvLnRlc3QoIGEuZ2V0QXR0cmlidXRlKFwic3R5bGVcIikgKTtcclxuXHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgVVJMcyBhcmVuJ3QgbWFuaXB1bGF0ZWRcclxuICAgICAgICAvLyAoSUUgbm9ybWFsaXplcyBpdCBieSBkZWZhdWx0KVxyXG4gICAgICAgIHN1cHBvcnQuaHJlZk5vcm1hbGl6ZWQgPSBhLmdldEF0dHJpYnV0ZShcImhyZWZcIikgPT09IFwiL2FcIjtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgdGhlIGRlZmF1bHQgY2hlY2tib3gvcmFkaW8gdmFsdWUgKFwiXCIgb24gV2ViS2l0OyBcIm9uXCIgZWxzZXdoZXJlKVxyXG4gICAgICAgIHN1cHBvcnQuY2hlY2tPbiA9ICEhaW5wdXQudmFsdWU7XHJcblxyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IGEgc2VsZWN0ZWQtYnktZGVmYXVsdCBvcHRpb24gaGFzIGEgd29ya2luZyBzZWxlY3RlZCBwcm9wZXJ0eS5cclxuICAgICAgICAvLyAoV2ViS2l0IGRlZmF1bHRzIHRvIGZhbHNlIGluc3RlYWQgb2YgdHJ1ZSwgSUUgdG9vLCBpZiBpdCdzIGluIGFuIG9wdGdyb3VwKVxyXG4gICAgICAgIHN1cHBvcnQub3B0U2VsZWN0ZWQgPSBvcHQuc2VsZWN0ZWQ7XHJcblxyXG4gICAgICAgIC8vIFRlc3RzIGZvciBlbmN0eXBlIHN1cHBvcnQgb24gYSBmb3JtICgjNjc0MylcclxuICAgICAgICBzdXBwb3J0LmVuY3R5cGUgPSAhIWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpLmVuY3R5cGU7XHJcblxyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBvcHRpb25zIGluc2lkZSBkaXNhYmxlZCBzZWxlY3RzIGFyZW4ndCBtYXJrZWQgYXMgZGlzYWJsZWRcclxuICAgICAgICAvLyAoV2ViS2l0IG1hcmtzIHRoZW0gYXMgZGlzYWJsZWQpXHJcbiAgICAgICAgc2VsZWN0LmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICBzdXBwb3J0Lm9wdERpc2FibGVkID0gIW9wdC5kaXNhYmxlZDtcclxuXHJcbiAgICAgICAgLy8gU3VwcG9ydDogSUU4IG9ubHlcclxuICAgICAgICAvLyBDaGVjayBpZiB3ZSBjYW4gdHJ1c3QgZ2V0QXR0cmlidXRlKFwidmFsdWVcIilcclxuICAgICAgICBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiaW5wdXRcIiApO1xyXG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSggXCJ2YWx1ZVwiLCBcIlwiICk7XHJcbiAgICAgICAgc3VwcG9ydC5pbnB1dCA9IGlucHV0LmdldEF0dHJpYnV0ZSggXCJ2YWx1ZVwiICkgPT09IFwiXCI7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIGFuIGlucHV0IG1haW50YWlucyBpdHMgdmFsdWUgYWZ0ZXIgYmVjb21pbmcgYSByYWRpb1xyXG4gICAgICAgIGlucHV0LnZhbHVlID0gXCJ0XCI7XHJcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCBcInR5cGVcIiwgXCJyYWRpb1wiICk7XHJcbiAgICAgICAgc3VwcG9ydC5yYWRpb1ZhbHVlID0gaW5wdXQudmFsdWUgPT09IFwidFwiO1xyXG4gICAgfSkoKTtcclxuXHJcblxyXG4gICAgdmFyIHJyZXR1cm4gPSAvXFxyL2c7XHJcblxyXG4gICAgalF1ZXJ5LmZuLmV4dGVuZCh7XHJcbiAgICAgICAgdmFsOiBmdW5jdGlvbiggdmFsdWUgKSB7XHJcbiAgICAgICAgICAgIHZhciBob29rcywgcmV0LCBpc0Z1bmN0aW9uLFxyXG4gICAgICAgICAgICAgICAgZWxlbSA9IHRoaXNbMF07XHJcblxyXG4gICAgICAgICAgICBpZiAoICFhcmd1bWVudHMubGVuZ3RoICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBlbGVtICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhvb2tzID0galF1ZXJ5LnZhbEhvb2tzWyBlbGVtLnR5cGUgXSB8fCBqUXVlcnkudmFsSG9va3NbIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSBdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgJiYgKHJldCA9IGhvb2tzLmdldCggZWxlbSwgXCJ2YWx1ZVwiICkpICE9PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXQgPSBlbGVtLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHJldCA9PT0gXCJzdHJpbmdcIiA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhhbmRsZSBtb3N0IGNvbW1vbiBzdHJpbmcgY2FzZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0LnJlcGxhY2UocnJldHVybiwgXCJcIikgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBoYW5kbGUgY2FzZXMgd2hlcmUgdmFsdWUgaXMgbnVsbC91bmRlZiBvciBudW1iZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID09IG51bGwgPyBcIlwiIDogcmV0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaXNGdW5jdGlvbiA9IGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiggaSApIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWw7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLm5vZGVUeXBlICE9PSAxICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIGlzRnVuY3Rpb24gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gdmFsdWUuY2FsbCggdGhpcywgaSwgalF1ZXJ5KCB0aGlzICkudmFsKCkgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVHJlYXQgbnVsbC91bmRlZmluZWQgYXMgXCJcIjsgY29udmVydCBudW1iZXJzIHRvIHN0cmluZ1xyXG4gICAgICAgICAgICAgICAgaWYgKCB2YWwgPT0gbnVsbCApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWwgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICggdHlwZW9mIHZhbCA9PT0gXCJudW1iZXJcIiApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWwgKz0gXCJcIjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIGpRdWVyeS5pc0FycmF5KCB2YWwgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWwgPSBqUXVlcnkubWFwKCB2YWwsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09IG51bGwgPyBcIlwiIDogdmFsdWUgKyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGhvb2tzID0galF1ZXJ5LnZhbEhvb2tzWyB0aGlzLnR5cGUgXSB8fCBqUXVlcnkudmFsSG9va3NbIHRoaXMubm9kZU5hbWUudG9Mb3dlckNhc2UoKSBdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHNldCByZXR1cm5zIHVuZGVmaW5lZCwgZmFsbCBiYWNrIHRvIG5vcm1hbCBzZXR0aW5nXHJcbiAgICAgICAgICAgICAgICBpZiAoICFob29rcyB8fCAhKFwic2V0XCIgaW4gaG9va3MpIHx8IGhvb2tzLnNldCggdGhpcywgdmFsLCBcInZhbHVlXCIgKSA9PT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGpRdWVyeS5leHRlbmQoe1xyXG4gICAgICAgIHZhbEhvb2tzOiB7XHJcbiAgICAgICAgICAgIG9wdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiggZWxlbSApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsID0galF1ZXJ5LmZpbmQuYXR0ciggZWxlbSwgXCJ2YWx1ZVwiICk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbCAhPSBudWxsID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUUxMC0xMStcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3B0aW9uLnRleHQgdGhyb3dzIGV4Y2VwdGlvbnMgKCMxNDY4NiwgIzE0ODU4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkudHJpbSggalF1ZXJ5LnRleHQoIGVsZW0gKSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZWxlY3Q6IHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlLCBvcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBlbGVtLm9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gZWxlbS5zZWxlY3RlZEluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmUgPSBlbGVtLnR5cGUgPT09IFwic2VsZWN0LW9uZVwiIHx8IGluZGV4IDwgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzID0gb25lID8gbnVsbCA6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXggPSBvbmUgPyBpbmRleCArIDEgOiBvcHRpb25zLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGluZGV4IDwgMCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXggOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25lID8gaW5kZXggOiAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBMb29wIHRocm91Z2ggYWxsIHRoZSBzZWxlY3RlZCBvcHRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICggOyBpIDwgbWF4OyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbiA9IG9wdGlvbnNbIGkgXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9sZElFIGRvZXNuJ3QgdXBkYXRlIHNlbGVjdGVkIGFmdGVyIGZvcm0gcmVzZXQgKCMyNTUxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoICggb3B0aW9uLnNlbGVjdGVkIHx8IGkgPT09IGluZGV4ICkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCByZXR1cm4gb3B0aW9ucyB0aGF0IGFyZSBkaXNhYmxlZCBvciBpbiBhIGRpc2FibGVkIG9wdGdyb3VwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoIHN1cHBvcnQub3B0RGlzYWJsZWQgPyAhb3B0aW9uLmRpc2FibGVkIDogb3B0aW9uLmdldEF0dHJpYnV0ZShcImRpc2FibGVkXCIpID09PSBudWxsICkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICggIW9wdGlvbi5wYXJlbnROb2RlLmRpc2FibGVkIHx8ICFqUXVlcnkubm9kZU5hbWUoIG9wdGlvbi5wYXJlbnROb2RlLCBcIm9wdGdyb3VwXCIgKSApICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgc3BlY2lmaWMgdmFsdWUgZm9yIHRoZSBvcHRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0galF1ZXJ5KCBvcHRpb24gKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBkb24ndCBuZWVkIGFuIGFycmF5IGZvciBvbmUgc2VsZWN0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBvbmUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE11bHRpLVNlbGVjdHMgcmV0dXJuIGFuIGFycmF5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaCggdmFsdWUgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlcztcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvblNldCwgb3B0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gZWxlbS5vcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgPSBqUXVlcnkubWFrZUFycmF5KCB2YWx1ZSApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpID0gb3B0aW9ucy5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICggaS0tICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24gPSBvcHRpb25zWyBpIF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGpRdWVyeS5pbkFycmF5KCBqUXVlcnkudmFsSG9va3Mub3B0aW9uLmdldCggb3B0aW9uICksIHZhbHVlcyApID49IDAgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXaGVuIG5ldyBvcHRpb24gZWxlbWVudCBpcyBhZGRlZCB0byBzZWxlY3QgYm94IHdlIG5lZWQgdG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvcmNlIHJlZmxvdyBvZiBuZXdseSBhZGRlZCBub2RlIGluIG9yZGVyIHRvIHdvcmthcm91bmQgZGVsYXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9mIGluaXRpYWxpemF0aW9uIHByb3BlcnRpZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gb3B0aW9uU2V0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoICggXyApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2lsbCBiZSBleGVjdXRlZCBvbmx5IGluIElFNlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi5zY3JvbGxIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEZvcmNlIGJyb3dzZXJzIHRvIGJlaGF2ZSBjb25zaXN0ZW50bHkgd2hlbiBub24tbWF0Y2hpbmcgdmFsdWUgaXMgc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhb3B0aW9uU2V0ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnNlbGVjdGVkSW5kZXggPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4vLyBSYWRpb3MgYW5kIGNoZWNrYm94ZXMgZ2V0dGVyL3NldHRlclxyXG4gICAgalF1ZXJ5LmVhY2goWyBcInJhZGlvXCIsIFwiY2hlY2tib3hcIiBdLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBqUXVlcnkudmFsSG9va3NbIHRoaXMgXSA9IHtcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIGpRdWVyeS5pc0FycmF5KCB2YWx1ZSApICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoIGVsZW0uY2hlY2tlZCA9IGpRdWVyeS5pbkFycmF5KCBqUXVlcnkoZWxlbSkudmFsKCksIHZhbHVlICkgPj0gMCApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoICFzdXBwb3J0LmNoZWNrT24gKSB7XHJcbiAgICAgICAgICAgIGpRdWVyeS52YWxIb29rc1sgdGhpcyBdLmdldCA9IGZ1bmN0aW9uKCBlbGVtICkge1xyXG4gICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogV2Via2l0XHJcbiAgICAgICAgICAgICAgICAvLyBcIlwiIGlzIHJldHVybmVkIGluc3RlYWQgb2YgXCJvblwiIGlmIGEgdmFsdWUgaXNuJ3Qgc3BlY2lmaWVkXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSA9PT0gbnVsbCA/IFwib25cIiA6IGVsZW0udmFsdWU7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgdmFyIG5vZGVIb29rLCBib29sSG9vayxcclxuICAgICAgICBhdHRySGFuZGxlID0galF1ZXJ5LmV4cHIuYXR0ckhhbmRsZSxcclxuICAgICAgICBydXNlRGVmYXVsdCA9IC9eKD86Y2hlY2tlZHxzZWxlY3RlZCkkL2ksXHJcbiAgICAgICAgZ2V0U2V0QXR0cmlidXRlID0gc3VwcG9ydC5nZXRTZXRBdHRyaWJ1dGUsXHJcbiAgICAgICAgZ2V0U2V0SW5wdXQgPSBzdXBwb3J0LmlucHV0O1xyXG5cclxuICAgIGpRdWVyeS5mbi5leHRlbmQoe1xyXG4gICAgICAgIGF0dHI6IGZ1bmN0aW9uKCBuYW1lLCB2YWx1ZSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2VzcyggdGhpcywgalF1ZXJ5LmF0dHIsIG5hbWUsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlbW92ZUF0dHI6IGZ1bmN0aW9uKCBuYW1lICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5LnJlbW92ZUF0dHIoIHRoaXMsIG5hbWUgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgalF1ZXJ5LmV4dGVuZCh7XHJcbiAgICAgICAgYXR0cjogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIHZhbHVlICkge1xyXG4gICAgICAgICAgICB2YXIgaG9va3MsIHJldCxcclxuICAgICAgICAgICAgICAgIG5UeXBlID0gZWxlbS5ub2RlVHlwZTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRvbid0IGdldC9zZXQgYXR0cmlidXRlcyBvbiB0ZXh0LCBjb21tZW50IGFuZCBhdHRyaWJ1dGUgbm9kZXNcclxuICAgICAgICAgICAgaWYgKCAhZWxlbSB8fCBuVHlwZSA9PT0gMyB8fCBuVHlwZSA9PT0gOCB8fCBuVHlwZSA9PT0gMiApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRmFsbGJhY2sgdG8gcHJvcCB3aGVuIGF0dHJpYnV0ZXMgYXJlIG5vdCBzdXBwb3J0ZWRcclxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgZWxlbS5nZXRBdHRyaWJ1dGUgPT09IHN0cnVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBqUXVlcnkucHJvcCggZWxlbSwgbmFtZSwgdmFsdWUgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQWxsIGF0dHJpYnV0ZXMgYXJlIGxvd2VyY2FzZVxyXG4gICAgICAgICAgICAvLyBHcmFiIG5lY2Vzc2FyeSBob29rIGlmIG9uZSBpcyBkZWZpbmVkXHJcbiAgICAgICAgICAgIGlmICggblR5cGUgIT09IDEgfHwgIWpRdWVyeS5pc1hNTERvYyggZWxlbSApICkge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIGhvb2tzID0galF1ZXJ5LmF0dHJIb29rc1sgbmFtZSBdIHx8XHJcbiAgICAgICAgICAgICAgICAoIGpRdWVyeS5leHByLm1hdGNoLmJvb2wudGVzdCggbmFtZSApID8gYm9vbEhvb2sgOiBub2RlSG9vayApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCB2YWx1ZSA9PT0gbnVsbCApIHtcclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkucmVtb3ZlQXR0ciggZWxlbSwgbmFtZSApO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIGhvb2tzICYmIFwic2V0XCIgaW4gaG9va3MgJiYgKHJldCA9IGhvb2tzLnNldCggZWxlbSwgdmFsdWUsIG5hbWUgKSkgIT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoIG5hbWUsIHZhbHVlICsgXCJcIiApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgJiYgKHJldCA9IGhvb2tzLmdldCggZWxlbSwgbmFtZSApKSAhPT0gbnVsbCApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0ID0galF1ZXJ5LmZpbmQuYXR0ciggZWxlbSwgbmFtZSApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIE5vbi1leGlzdGVudCBhdHRyaWJ1dGVzIHJldHVybiBudWxsLCB3ZSBub3JtYWxpemUgdG8gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0ID09IG51bGwgP1xyXG4gICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVtb3ZlQXR0cjogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xyXG4gICAgICAgICAgICB2YXIgbmFtZSwgcHJvcE5hbWUsXHJcbiAgICAgICAgICAgICAgICBpID0gMCxcclxuICAgICAgICAgICAgICAgIGF0dHJOYW1lcyA9IHZhbHVlICYmIHZhbHVlLm1hdGNoKCBybm90d2hpdGUgKTtcclxuXHJcbiAgICAgICAgICAgIGlmICggYXR0ck5hbWVzICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoIChuYW1lID0gYXR0ck5hbWVzW2krK10pICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BOYW1lID0galF1ZXJ5LnByb3BGaXhbIG5hbWUgXSB8fCBuYW1lO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBCb29sZWFuIGF0dHJpYnV0ZXMgZ2V0IHNwZWNpYWwgdHJlYXRtZW50ICgjMTA4NzApXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBqUXVlcnkuZXhwci5tYXRjaC5ib29sLnRlc3QoIG5hbWUgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2V0IGNvcnJlc3BvbmRpbmcgcHJvcGVydHkgdG8gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBnZXRTZXRJbnB1dCAmJiBnZXRTZXRBdHRyaWJ1dGUgfHwgIXJ1c2VEZWZhdWx0LnRlc3QoIG5hbWUgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1bIHByb3BOYW1lIF0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQ6IElFPDlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFsc28gY2xlYXIgZGVmYXVsdENoZWNrZWQvZGVmYXVsdFNlbGVjdGVkIChpZiBhcHByb3ByaWF0ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1bIGpRdWVyeS5jYW1lbENhc2UoIFwiZGVmYXVsdC1cIiArIG5hbWUgKSBdID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtWyBwcm9wTmFtZSBdID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNlZSAjOTY5OSBmb3IgZXhwbGFuYXRpb24gb2YgdGhpcyBhcHByb2FjaCAoc2V0dGluZyBmaXJzdCwgdGhlbiByZW1vdmFsKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5hdHRyKCBlbGVtLCBuYW1lLCBcIlwiICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBlbGVtLnJlbW92ZUF0dHJpYnV0ZSggZ2V0U2V0QXR0cmlidXRlID8gbmFtZSA6IHByb3BOYW1lICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhdHRySG9va3M6IHtcclxuICAgICAgICAgICAgdHlwZToge1xyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhc3VwcG9ydC5yYWRpb1ZhbHVlICYmIHZhbHVlID09PSBcInJhZGlvXCIgJiYgalF1ZXJ5Lm5vZGVOYW1lKGVsZW0sIFwiaW5wdXRcIikgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNldHRpbmcgdGhlIHR5cGUgb24gYSByYWRpbyBidXR0b24gYWZ0ZXIgdGhlIHZhbHVlIHJlc2V0cyB0aGUgdmFsdWUgaW4gSUU2LTlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVzZXQgdmFsdWUgdG8gZGVmYXVsdCBpbiBjYXNlIHR5cGUgaXMgc2V0IGFmdGVyIHZhbHVlIGR1cmluZyBjcmVhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsID0gZWxlbS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoIFwidHlwZVwiLCB2YWx1ZSApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHZhbCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0udmFsdWUgPSB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuLy8gSG9vayBmb3IgYm9vbGVhbiBhdHRyaWJ1dGVzXHJcbiAgICBib29sSG9vayA9IHtcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSwgbmFtZSApIHtcclxuICAgICAgICAgICAgaWYgKCB2YWx1ZSA9PT0gZmFsc2UgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgYm9vbGVhbiBhdHRyaWJ1dGVzIHdoZW4gc2V0IHRvIGZhbHNlXHJcbiAgICAgICAgICAgICAgICBqUXVlcnkucmVtb3ZlQXR0ciggZWxlbSwgbmFtZSApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBnZXRTZXRJbnB1dCAmJiBnZXRTZXRBdHRyaWJ1dGUgfHwgIXJ1c2VEZWZhdWx0LnRlc3QoIG5hbWUgKSApIHtcclxuICAgICAgICAgICAgICAgIC8vIElFPDggbmVlZHMgdGhlICpwcm9wZXJ0eSogbmFtZVxyXG4gICAgICAgICAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoICFnZXRTZXRBdHRyaWJ1dGUgJiYgalF1ZXJ5LnByb3BGaXhbIG5hbWUgXSB8fCBuYW1lLCBuYW1lICk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVXNlIGRlZmF1bHRDaGVja2VkIGFuZCBkZWZhdWx0U2VsZWN0ZWQgZm9yIG9sZElFXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtWyBqUXVlcnkuY2FtZWxDYXNlKCBcImRlZmF1bHQtXCIgKyBuYW1lICkgXSA9IGVsZW1bIG5hbWUgXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4vLyBSZXRyaWV2ZSBib29sZWFucyBzcGVjaWFsbHlcclxuICAgIGpRdWVyeS5lYWNoKCBqUXVlcnkuZXhwci5tYXRjaC5ib29sLnNvdXJjZS5tYXRjaCggL1xcdysvZyApLCBmdW5jdGlvbiggaSwgbmFtZSApIHtcclxuXHJcbiAgICAgICAgdmFyIGdldHRlciA9IGF0dHJIYW5kbGVbIG5hbWUgXSB8fCBqUXVlcnkuZmluZC5hdHRyO1xyXG5cclxuICAgICAgICBhdHRySGFuZGxlWyBuYW1lIF0gPSBnZXRTZXRJbnB1dCAmJiBnZXRTZXRBdHRyaWJ1dGUgfHwgIXJ1c2VEZWZhdWx0LnRlc3QoIG5hbWUgKSA/XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBpc1hNTCApIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXQsIGhhbmRsZTtcclxuICAgICAgICAgICAgICAgIGlmICggIWlzWE1MICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEF2b2lkIGFuIGluZmluaXRlIGxvb3AgYnkgdGVtcG9yYXJpbHkgcmVtb3ZpbmcgdGhpcyBmdW5jdGlvbiBmcm9tIHRoZSBnZXR0ZXJcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGUgPSBhdHRySGFuZGxlWyBuYW1lIF07XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0ckhhbmRsZVsgbmFtZSBdID0gcmV0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldCA9IGdldHRlciggZWxlbSwgbmFtZSwgaXNYTUwgKSAhPSBudWxsID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZS50b0xvd2VyQ2FzZSgpIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBhdHRySGFuZGxlWyBuYW1lIF0gPSBoYW5kbGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgICAgICB9IDpcclxuICAgICAgICAgICAgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCAhaXNYTUwgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1bIGpRdWVyeS5jYW1lbENhc2UoIFwiZGVmYXVsdC1cIiArIG5hbWUgKSBdID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZS50b0xvd2VyQ2FzZSgpIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuLy8gZml4IG9sZElFIGF0dHJvcGVydGllc1xyXG4gICAgaWYgKCAhZ2V0U2V0SW5wdXQgfHwgIWdldFNldEF0dHJpYnV0ZSApIHtcclxuICAgICAgICBqUXVlcnkuYXR0ckhvb2tzLnZhbHVlID0ge1xyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSwgbmFtZSApIHtcclxuICAgICAgICAgICAgICAgIGlmICggalF1ZXJ5Lm5vZGVOYW1lKCBlbGVtLCBcImlucHV0XCIgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBEb2VzIG5vdCByZXR1cm4gc28gdGhhdCBzZXRBdHRyaWJ1dGUgaXMgYWxzbyB1c2VkXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5kZWZhdWx0VmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVXNlIG5vZGVIb29rIGlmIGRlZmluZWQgKCMxOTU0KTsgb3RoZXJ3aXNlIHNldEF0dHJpYnV0ZSBpcyBmaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVIb29rICYmIG5vZGVIb29rLnNldCggZWxlbSwgdmFsdWUsIG5hbWUgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4vLyBJRTYvNyBkbyBub3Qgc3VwcG9ydCBnZXR0aW5nL3NldHRpbmcgc29tZSBhdHRyaWJ1dGVzIHdpdGggZ2V0L3NldEF0dHJpYnV0ZVxyXG4gICAgaWYgKCAhZ2V0U2V0QXR0cmlidXRlICkge1xyXG5cclxuICAgICAgICAvLyBVc2UgdGhpcyBmb3IgYW55IGF0dHJpYnV0ZSBpbiBJRTYvN1xyXG4gICAgICAgIC8vIFRoaXMgZml4ZXMgYWxtb3N0IGV2ZXJ5IElFNi83IGlzc3VlXHJcbiAgICAgICAgbm9kZUhvb2sgPSB7XHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlLCBuYW1lICkge1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IHRoZSBleGlzdGluZyBvciBjcmVhdGUgYSBuZXcgYXR0cmlidXRlIG5vZGVcclxuICAgICAgICAgICAgICAgIHZhciByZXQgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoIG5hbWUgKTtcclxuICAgICAgICAgICAgICAgIGlmICggIXJldCApIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZU5vZGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChyZXQgPSBlbGVtLm93bmVyRG9jdW1lbnQuY3JlYXRlQXR0cmlidXRlKCBuYW1lICkpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXQudmFsdWUgPSB2YWx1ZSArPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEJyZWFrIGFzc29jaWF0aW9uIHdpdGggY2xvbmVkIGVsZW1lbnRzIGJ5IGFsc28gdXNpbmcgc2V0QXR0cmlidXRlICgjOTY0NilcclxuICAgICAgICAgICAgICAgIGlmICggbmFtZSA9PT0gXCJ2YWx1ZVwiIHx8IHZhbHVlID09PSBlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSApICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFNvbWUgYXR0cmlidXRlcyBhcmUgY29uc3RydWN0ZWQgd2l0aCBlbXB0eS1zdHJpbmcgdmFsdWVzIHdoZW4gbm90IGRlZmluZWRcclxuICAgICAgICBhdHRySGFuZGxlLmlkID0gYXR0ckhhbmRsZS5uYW1lID0gYXR0ckhhbmRsZS5jb29yZHMgPVxyXG4gICAgICAgICAgICBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmV0O1xyXG4gICAgICAgICAgICAgICAgaWYgKCAhaXNYTUwgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChyZXQgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoIG5hbWUgKSkgJiYgcmV0LnZhbHVlICE9PSBcIlwiID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0LnZhbHVlIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gRml4aW5nIHZhbHVlIHJldHJpZXZhbCBvbiBhIGJ1dHRvbiByZXF1aXJlcyB0aGlzIG1vZHVsZVxyXG4gICAgICAgIGpRdWVyeS52YWxIb29rcy5idXR0b24gPSB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmV0ID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKCBuYW1lICk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIHJldCAmJiByZXQuc3BlY2lmaWVkICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogbm9kZUhvb2suc2V0XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2V0IGNvbnRlbnRlZGl0YWJsZSB0byBmYWxzZSBvbiByZW1vdmFscygjMTA0MjkpXHJcbiAgICAgICAgLy8gU2V0dGluZyB0byBlbXB0eSBzdHJpbmcgdGhyb3dzIGFuIGVycm9yIGFzIGFuIGludmFsaWQgdmFsdWVcclxuICAgICAgICBqUXVlcnkuYXR0ckhvb2tzLmNvbnRlbnRlZGl0YWJsZSA9IHtcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUsIG5hbWUgKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlSG9vay5zZXQoIGVsZW0sIHZhbHVlID09PSBcIlwiID8gZmFsc2UgOiB2YWx1ZSwgbmFtZSApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2V0IHdpZHRoIGFuZCBoZWlnaHQgdG8gYXV0byBpbnN0ZWFkIG9mIDAgb24gZW1wdHkgc3RyaW5nKCBCdWcgIzgxNTAgKVxyXG4gICAgICAgIC8vIFRoaXMgaXMgZm9yIHJlbW92YWxzXHJcbiAgICAgICAgalF1ZXJ5LmVhY2goWyBcIndpZHRoXCIsIFwiaGVpZ2h0XCIgXSwgZnVuY3Rpb24oIGksIG5hbWUgKSB7XHJcbiAgICAgICAgICAgIGpRdWVyeS5hdHRySG9va3NbIG5hbWUgXSA9IHtcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggdmFsdWUgPT09IFwiXCIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCBuYW1lLCBcImF1dG9cIiApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggIXN1cHBvcnQuc3R5bGUgKSB7XHJcbiAgICAgICAgalF1ZXJ5LmF0dHJIb29rcy5zdHlsZSA9IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiggZWxlbSApIHtcclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB1bmRlZmluZWQgaW4gdGhlIGNhc2Ugb2YgZW1wdHkgc3RyaW5nXHJcbiAgICAgICAgICAgICAgICAvLyBOb3RlOiBJRSB1cHBlcmNhc2VzIGNzcyBwcm9wZXJ0eSBuYW1lcywgYnV0IGlmIHdlIHdlcmUgdG8gLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgICAgIC8vIC5jc3NUZXh0LCB0aGF0IHdvdWxkIGRlc3Ryb3kgY2FzZSBzZW5zdGl0aXZpdHkgaW4gVVJMJ3MsIGxpa2UgaW4gXCJiYWNrZ3JvdW5kXCJcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLnN0eWxlLmNzc1RleHQgfHwgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoIGVsZW0uc3R5bGUuY3NzVGV4dCA9IHZhbHVlICsgXCJcIiApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICB2YXIgcmZvY3VzYWJsZSA9IC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGJ1dHRvbnxvYmplY3QpJC9pLFxyXG4gICAgICAgIHJjbGlja2FibGUgPSAvXig/OmF8YXJlYSkkL2k7XHJcblxyXG4gICAgalF1ZXJ5LmZuLmV4dGVuZCh7XHJcbiAgICAgICAgcHJvcDogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjZXNzKCB0aGlzLCBqUXVlcnkucHJvcCwgbmFtZSwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAxICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVtb3ZlUHJvcDogZnVuY3Rpb24oIG5hbWUgKSB7XHJcbiAgICAgICAgICAgIG5hbWUgPSBqUXVlcnkucHJvcEZpeFsgbmFtZSBdIHx8IG5hbWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB0cnkvY2F0Y2ggaGFuZGxlcyBjYXNlcyB3aGVyZSBJRSBiYWxrcyAoc3VjaCBhcyByZW1vdmluZyBhIHByb3BlcnR5IG9uIHdpbmRvdylcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1sgbmFtZSBdID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzWyBuYW1lIF07XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoKCBlICkge31cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgalF1ZXJ5LmV4dGVuZCh7XHJcbiAgICAgICAgcHJvcEZpeDoge1xyXG4gICAgICAgICAgICBcImZvclwiOiBcImh0bWxGb3JcIixcclxuICAgICAgICAgICAgXCJjbGFzc1wiOiBcImNsYXNzTmFtZVwiXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcHJvcDogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIHZhbHVlICkge1xyXG4gICAgICAgICAgICB2YXIgcmV0LCBob29rcywgbm90eG1sLFxyXG4gICAgICAgICAgICAgICAgblR5cGUgPSBlbGVtLm5vZGVUeXBlO1xyXG5cclxuICAgICAgICAgICAgLy8gZG9uJ3QgZ2V0L3NldCBwcm9wZXJ0aWVzIG9uIHRleHQsIGNvbW1lbnQgYW5kIGF0dHJpYnV0ZSBub2Rlc1xyXG4gICAgICAgICAgICBpZiAoICFlbGVtIHx8IG5UeXBlID09PSAzIHx8IG5UeXBlID09PSA4IHx8IG5UeXBlID09PSAyICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBub3R4bWwgPSBuVHlwZSAhPT0gMSB8fCAhalF1ZXJ5LmlzWE1MRG9jKCBlbGVtICk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIG5vdHhtbCApIHtcclxuICAgICAgICAgICAgICAgIC8vIEZpeCBuYW1lIGFuZCBhdHRhY2ggaG9va3NcclxuICAgICAgICAgICAgICAgIG5hbWUgPSBqUXVlcnkucHJvcEZpeFsgbmFtZSBdIHx8IG5hbWU7XHJcbiAgICAgICAgICAgICAgICBob29rcyA9IGpRdWVyeS5wcm9wSG9va3NbIG5hbWUgXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCB2YWx1ZSAhPT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvb2tzICYmIFwic2V0XCIgaW4gaG9va3MgJiYgKHJldCA9IGhvb2tzLnNldCggZWxlbSwgdmFsdWUsIG5hbWUgKSkgIT09IHVuZGVmaW5lZCA/XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0IDpcclxuICAgICAgICAgICAgICAgICAgICAoIGVsZW1bIG5hbWUgXSA9IHZhbHVlICk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgJiYgKHJldCA9IGhvb2tzLmdldCggZWxlbSwgbmFtZSApKSAhPT0gbnVsbCA/XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0IDpcclxuICAgICAgICAgICAgICAgICAgICBlbGVtWyBuYW1lIF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBwcm9wSG9va3M6IHtcclxuICAgICAgICAgICAgdGFiSW5kZXg6IHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZWxlbS50YWJJbmRleCBkb2Vzbid0IGFsd2F5cyByZXR1cm4gdGhlIGNvcnJlY3QgdmFsdWUgd2hlbiBpdCBoYXNuJ3QgYmVlbiBleHBsaWNpdGx5IHNldFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9mbHVpZHByb2plY3Qub3JnL2Jsb2cvMjAwOC8wMS8wOS9nZXR0aW5nLXNldHRpbmctYW5kLXJlbW92aW5nLXRhYmluZGV4LXZhbHVlcy13aXRoLWphdmFzY3JpcHQvXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVXNlIHByb3BlciBhdHRyaWJ1dGUgcmV0cmlldmFsKCMxMjA3MilcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFiaW5kZXggPSBqUXVlcnkuZmluZC5hdHRyKCBlbGVtLCBcInRhYmluZGV4XCIgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhYmluZGV4ID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoIHRhYmluZGV4LCAxMCApIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmZvY3VzYWJsZS50ZXN0KCBlbGVtLm5vZGVOYW1lICkgfHwgcmNsaWNrYWJsZS50ZXN0KCBlbGVtLm5vZGVOYW1lICkgJiYgZWxlbS5ocmVmID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLTE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbi8vIFNvbWUgYXR0cmlidXRlcyByZXF1aXJlIGEgc3BlY2lhbCBjYWxsIG9uIElFXHJcbi8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczUzNjQyOSUyOFZTLjg1JTI5LmFzcHhcclxuICAgIGlmICggIXN1cHBvcnQuaHJlZk5vcm1hbGl6ZWQgKSB7XHJcbiAgICAgICAgLy8gaHJlZi9zcmMgcHJvcGVydHkgc2hvdWxkIGdldCB0aGUgZnVsbCBub3JtYWxpemVkIFVSTCAoIzEwMjk5LyMxMjkxNSlcclxuICAgICAgICBqUXVlcnkuZWFjaChbIFwiaHJlZlwiLCBcInNyY1wiIF0sIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xyXG4gICAgICAgICAgICBqUXVlcnkucHJvcEhvb2tzWyBuYW1lIF0gPSB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCBlbGVtICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSwgNCApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuLy8gU3VwcG9ydDogU2FmYXJpLCBJRTkrXHJcbi8vIG1pcy1yZXBvcnRzIHRoZSBkZWZhdWx0IHNlbGVjdGVkIHByb3BlcnR5IG9mIGFuIG9wdGlvblxyXG4vLyBBY2Nlc3NpbmcgdGhlIHBhcmVudCdzIHNlbGVjdGVkSW5kZXggcHJvcGVydHkgZml4ZXMgaXRcclxuICAgIGlmICggIXN1cHBvcnQub3B0U2VsZWN0ZWQgKSB7XHJcbiAgICAgICAgalF1ZXJ5LnByb3BIb29rcy5zZWxlY3RlZCA9IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiggZWxlbSApIHtcclxuICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCBwYXJlbnQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50LnNlbGVjdGVkSW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IGl0IGFsc28gd29ya3Mgd2l0aCBvcHRncm91cHMsIHNlZSAjNTcwMVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggcGFyZW50LnBhcmVudE5vZGUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudC5wYXJlbnROb2RlLnNlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGpRdWVyeS5lYWNoKFtcclxuICAgICAgICBcInRhYkluZGV4XCIsXHJcbiAgICAgICAgXCJyZWFkT25seVwiLFxyXG4gICAgICAgIFwibWF4TGVuZ3RoXCIsXHJcbiAgICAgICAgXCJjZWxsU3BhY2luZ1wiLFxyXG4gICAgICAgIFwiY2VsbFBhZGRpbmdcIixcclxuICAgICAgICBcInJvd1NwYW5cIixcclxuICAgICAgICBcImNvbFNwYW5cIixcclxuICAgICAgICBcInVzZU1hcFwiLFxyXG4gICAgICAgIFwiZnJhbWVCb3JkZXJcIixcclxuICAgICAgICBcImNvbnRlbnRFZGl0YWJsZVwiXHJcbiAgICBdLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBqUXVlcnkucHJvcEZpeFsgdGhpcy50b0xvd2VyQ2FzZSgpIF0gPSB0aGlzO1xyXG4gICAgfSk7XHJcblxyXG4vLyBJRTYvNyBjYWxsIGVuY3R5cGUgZW5jb2RpbmdcclxuICAgIGlmICggIXN1cHBvcnQuZW5jdHlwZSApIHtcclxuICAgICAgICBqUXVlcnkucHJvcEZpeC5lbmN0eXBlID0gXCJlbmNvZGluZ1wiO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIHZhciByY2xhc3MgPSAvW1xcdFxcclxcblxcZl0vZztcclxuXHJcbiAgICBqUXVlcnkuZm4uZXh0ZW5kKHtcclxuICAgICAgICBhZGRDbGFzczogZnVuY3Rpb24oIHZhbHVlICkge1xyXG4gICAgICAgICAgICB2YXIgY2xhc3NlcywgZWxlbSwgY3VyLCBjbGF6eiwgaiwgZmluYWxWYWx1ZSxcclxuICAgICAgICAgICAgICAgIGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgbGVuID0gdGhpcy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBwcm9jZWVkID0gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oIGogKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCB0aGlzICkuYWRkQ2xhc3MoIHZhbHVlLmNhbGwoIHRoaXMsIGosIHRoaXMuY2xhc3NOYW1lICkgKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIHByb2NlZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGUgZGlzanVuY3Rpb24gaGVyZSBpcyBmb3IgYmV0dGVyIGNvbXByZXNzaWJpbGl0eSAoc2VlIHJlbW92ZUNsYXNzKVxyXG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9ICggdmFsdWUgfHwgXCJcIiApLm1hdGNoKCBybm90d2hpdGUgKSB8fCBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtID0gdGhpc1sgaSBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1ciA9IGVsZW0ubm9kZVR5cGUgPT09IDEgJiYgKCBlbGVtLmNsYXNzTmFtZSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICggXCIgXCIgKyBlbGVtLmNsYXNzTmFtZSArIFwiIFwiICkucmVwbGFjZSggcmNsYXNzLCBcIiBcIiApIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCIgXCJcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIGN1ciApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICggKGNsYXp6ID0gY2xhc3Nlc1tqKytdKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggY3VyLmluZGV4T2YoIFwiIFwiICsgY2xhenogKyBcIiBcIiApIDwgMCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXIgKz0gY2xhenogKyBcIiBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb25seSBhc3NpZ24gaWYgZGlmZmVyZW50IHRvIGF2b2lkIHVubmVlZGVkIHJlbmRlcmluZy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxWYWx1ZSA9IGpRdWVyeS50cmltKCBjdXIgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBlbGVtLmNsYXNzTmFtZSAhPT0gZmluYWxWYWx1ZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NOYW1lID0gZmluYWxWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcclxuICAgICAgICAgICAgdmFyIGNsYXNzZXMsIGVsZW0sIGN1ciwgY2xhenosIGosIGZpbmFsVmFsdWUsXHJcbiAgICAgICAgICAgICAgICBpID0gMCxcclxuICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgcHJvY2VlZCA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHwgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oIGogKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCB0aGlzICkucmVtb3ZlQ2xhc3MoIHZhbHVlLmNhbGwoIHRoaXMsIGosIHRoaXMuY2xhc3NOYW1lICkgKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggcHJvY2VlZCApIHtcclxuICAgICAgICAgICAgICAgIGNsYXNzZXMgPSAoIHZhbHVlIHx8IFwiXCIgKS5tYXRjaCggcm5vdHdoaXRlICkgfHwgW107XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICggOyBpIDwgbGVuOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbSA9IHRoaXNbIGkgXTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGV4cHJlc3Npb24gaXMgaGVyZSBmb3IgYmV0dGVyIGNvbXByZXNzaWJpbGl0eSAoc2VlIGFkZENsYXNzKVxyXG4gICAgICAgICAgICAgICAgICAgIGN1ciA9IGVsZW0ubm9kZVR5cGUgPT09IDEgJiYgKCBlbGVtLmNsYXNzTmFtZSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICggXCIgXCIgKyBlbGVtLmNsYXNzTmFtZSArIFwiIFwiICkucmVwbGFjZSggcmNsYXNzLCBcIiBcIiApIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggY3VyICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCAoY2xhenogPSBjbGFzc2VzW2orK10pICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlICphbGwqIGluc3RhbmNlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCBjdXIuaW5kZXhPZiggXCIgXCIgKyBjbGF6eiArIFwiIFwiICkgPj0gMCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXIgPSBjdXIucmVwbGFjZSggXCIgXCIgKyBjbGF6eiArIFwiIFwiLCBcIiBcIiApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IGFzc2lnbiBpZiBkaWZmZXJlbnQgdG8gYXZvaWQgdW5uZWVkZWQgcmVuZGVyaW5nLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbFZhbHVlID0gdmFsdWUgPyBqUXVlcnkudHJpbSggY3VyICkgOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGVsZW0uY2xhc3NOYW1lICE9PSBmaW5hbFZhbHVlICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5jbGFzc05hbWUgPSBmaW5hbFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0b2dnbGVDbGFzczogZnVuY3Rpb24oIHZhbHVlLCBzdGF0ZVZhbCApIHtcclxuICAgICAgICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoIHR5cGVvZiBzdGF0ZVZhbCA9PT0gXCJib29sZWFuXCIgJiYgdHlwZSA9PT0gXCJzdHJpbmdcIiApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZVZhbCA/IHRoaXMuYWRkQ2xhc3MoIHZhbHVlICkgOiB0aGlzLnJlbW92ZUNsYXNzKCB2YWx1ZSApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiggaSApIHtcclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoIHRoaXMgKS50b2dnbGVDbGFzcyggdmFsdWUuY2FsbCh0aGlzLCBpLCB0aGlzLmNsYXNzTmFtZSwgc3RhdGVWYWwpLCBzdGF0ZVZhbCApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIHR5cGUgPT09IFwic3RyaW5nXCIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdG9nZ2xlIGluZGl2aWR1YWwgY2xhc3MgbmFtZXNcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2xhc3NOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpID0gMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZiA9IGpRdWVyeSggdGhpcyApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWVzID0gdmFsdWUubWF0Y2goIHJub3R3aGl0ZSApIHx8IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIChjbGFzc05hbWUgPSBjbGFzc05hbWVzWyBpKysgXSkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGVhY2ggY2xhc3NOYW1lIGdpdmVuLCBzcGFjZSBzZXBhcmF0ZWQgbGlzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHNlbGYuaGFzQ2xhc3MoIGNsYXNzTmFtZSApICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZW1vdmVDbGFzcyggY2xhc3NOYW1lICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFkZENsYXNzKCBjbGFzc05hbWUgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVG9nZ2xlIHdob2xlIGNsYXNzIG5hbWVcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIHR5cGUgPT09IHN0cnVuZGVmaW5lZCB8fCB0eXBlID09PSBcImJvb2xlYW5cIiApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIHRoaXMuY2xhc3NOYW1lICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzdG9yZSBjbGFzc05hbWUgaWYgc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5fZGF0YSggdGhpcywgXCJfX2NsYXNzTmFtZV9fXCIsIHRoaXMuY2xhc3NOYW1lICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgZWxlbWVudCBoYXMgYSBjbGFzcyBuYW1lIG9yIGlmIHdlJ3JlIHBhc3NlZCBcImZhbHNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlbiByZW1vdmUgdGhlIHdob2xlIGNsYXNzbmFtZSAoaWYgdGhlcmUgd2FzIG9uZSwgdGhlIGFib3ZlIHNhdmVkIGl0KS5cclxuICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UgYnJpbmcgYmFjayB3aGF0ZXZlciB3YXMgcHJldmlvdXNseSBzYXZlZCAoaWYgYW55dGhpbmcpLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZhbGxpbmcgYmFjayB0byB0aGUgZW1wdHkgc3RyaW5nIGlmIG5vdGhpbmcgd2FzIHN0b3JlZC5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IHRoaXMuY2xhc3NOYW1lIHx8IHZhbHVlID09PSBmYWxzZSA/IFwiXCIgOiBqUXVlcnkuX2RhdGEoIHRoaXMsIFwiX19jbGFzc05hbWVfX1wiICkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGFzQ2xhc3M6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcclxuICAgICAgICAgICAgdmFyIGNsYXNzTmFtZSA9IFwiIFwiICsgc2VsZWN0b3IgKyBcIiBcIixcclxuICAgICAgICAgICAgICAgIGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgbCA9IHRoaXMubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKCA7IGkgPCBsOyBpKysgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIHRoaXNbaV0ubm9kZVR5cGUgPT09IDEgJiYgKFwiIFwiICsgdGhpc1tpXS5jbGFzc05hbWUgKyBcIiBcIikucmVwbGFjZShyY2xhc3MsIFwiIFwiKS5pbmRleE9mKCBjbGFzc05hbWUgKSA+PSAwICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG4vLyBSZXR1cm4galF1ZXJ5IGZvciBhdHRyaWJ1dGVzLW9ubHkgaW5jbHVzaW9uXHJcblxyXG5cclxuICAgIGpRdWVyeS5lYWNoKCAoXCJibHVyIGZvY3VzIGZvY3VzaW4gZm9jdXNvdXQgbG9hZCByZXNpemUgc2Nyb2xsIHVubG9hZCBjbGljayBkYmxjbGljayBcIiArXHJcbiAgICBcIm1vdXNlZG93biBtb3VzZXVwIG1vdXNlbW92ZSBtb3VzZW92ZXIgbW91c2VvdXQgbW91c2VlbnRlciBtb3VzZWxlYXZlIFwiICtcclxuICAgIFwiY2hhbmdlIHNlbGVjdCBzdWJtaXQga2V5ZG93biBrZXlwcmVzcyBrZXl1cCBlcnJvciBjb250ZXh0bWVudVwiKS5zcGxpdChcIiBcIiksIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xyXG5cclxuICAgICAgICAvLyBIYW5kbGUgZXZlbnQgYmluZGluZ1xyXG4gICAgICAgIGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIGRhdGEsIGZuICkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA+IDAgP1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbiggbmFtZSwgbnVsbCwgZGF0YSwgZm4gKSA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoIG5hbWUgKTtcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgalF1ZXJ5LmZuLmV4dGVuZCh7XHJcbiAgICAgICAgaG92ZXI6IGZ1bmN0aW9uKCBmbk92ZXIsIGZuT3V0ICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb3VzZWVudGVyKCBmbk92ZXIgKS5tb3VzZWxlYXZlKCBmbk91dCB8fCBmbk92ZXIgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBiaW5kOiBmdW5jdGlvbiggdHlwZXMsIGRhdGEsIGZuICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vbiggdHlwZXMsIG51bGwsIGRhdGEsIGZuICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1bmJpbmQ6IGZ1bmN0aW9uKCB0eXBlcywgZm4gKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9mZiggdHlwZXMsIG51bGwsIGZuICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uKCBzZWxlY3RvciwgdHlwZXMsIGRhdGEsIGZuICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdW5kZWxlZ2F0ZTogZnVuY3Rpb24oIHNlbGVjdG9yLCB0eXBlcywgZm4gKSB7XHJcbiAgICAgICAgICAgIC8vICggbmFtZXNwYWNlICkgb3IgKCBzZWxlY3RvciwgdHlwZXMgWywgZm5dIClcclxuICAgICAgICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyB0aGlzLm9mZiggc2VsZWN0b3IsIFwiKipcIiApIDogdGhpcy5vZmYoIHR5cGVzLCBzZWxlY3RvciB8fCBcIioqXCIsIGZuICk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIHZhciBub25jZSA9IGpRdWVyeS5ub3coKTtcclxuXHJcbiAgICB2YXIgcnF1ZXJ5ID0gKC9cXD8vKTtcclxuXHJcblxyXG5cclxuICAgIHZhciBydmFsaWR0b2tlbnMgPSAvKCwpfChcXFt8eyl8KH18XSl8XCIoPzpbXlwiXFxcXFxcclxcbl18XFxcXFtcIlxcXFxcXC9iZm5ydF18XFxcXHVbXFxkYS1mQS1GXXs0fSkqXCJcXHMqOj98dHJ1ZXxmYWxzZXxudWxsfC0/KD8hMFxcZClcXGQrKD86XFwuXFxkK3wpKD86W2VFXVsrLV0/XFxkK3wpL2c7XHJcblxyXG4gICAgalF1ZXJ5LnBhcnNlSlNPTiA9IGZ1bmN0aW9uKCBkYXRhICkge1xyXG4gICAgICAgIC8vIEF0dGVtcHQgdG8gcGFyc2UgdXNpbmcgdGhlIG5hdGl2ZSBKU09OIHBhcnNlciBmaXJzdFxyXG4gICAgICAgIGlmICggd2luZG93LkpTT04gJiYgd2luZG93LkpTT04ucGFyc2UgKSB7XHJcbiAgICAgICAgICAgIC8vIFN1cHBvcnQ6IEFuZHJvaWQgMi4zXHJcbiAgICAgICAgICAgIC8vIFdvcmthcm91bmQgZmFpbHVyZSB0byBzdHJpbmctY2FzdCBudWxsIGlucHV0XHJcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cuSlNPTi5wYXJzZSggZGF0YSArIFwiXCIgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciByZXF1aXJlTm9uQ29tbWEsXHJcbiAgICAgICAgICAgIGRlcHRoID0gbnVsbCxcclxuICAgICAgICAgICAgc3RyID0galF1ZXJ5LnRyaW0oIGRhdGEgKyBcIlwiICk7XHJcblxyXG4gICAgICAgIC8vIEd1YXJkIGFnYWluc3QgaW52YWxpZCAoYW5kIHBvc3NpYmx5IGRhbmdlcm91cykgaW5wdXQgYnkgZW5zdXJpbmcgdGhhdCBub3RoaW5nIHJlbWFpbnNcclxuICAgICAgICAvLyBhZnRlciByZW1vdmluZyB2YWxpZCB0b2tlbnNcclxuICAgICAgICByZXR1cm4gc3RyICYmICFqUXVlcnkudHJpbSggc3RyLnJlcGxhY2UoIHJ2YWxpZHRva2VucywgZnVuY3Rpb24oIHRva2VuLCBjb21tYSwgb3BlbiwgY2xvc2UgKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBGb3JjZSB0ZXJtaW5hdGlvbiBpZiB3ZSBzZWUgYSBtaXNwbGFjZWQgY29tbWFcclxuICAgICAgICAgICAgaWYgKCByZXF1aXJlTm9uQ29tbWEgJiYgY29tbWEgKSB7XHJcbiAgICAgICAgICAgICAgICBkZXB0aCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFBlcmZvcm0gbm8gbW9yZSByZXBsYWNlbWVudHMgYWZ0ZXIgcmV0dXJuaW5nIHRvIG91dGVybW9zdCBkZXB0aFxyXG4gICAgICAgICAgICBpZiAoIGRlcHRoID09PSAwICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDb21tYXMgbXVzdCBub3QgZm9sbG93IFwiW1wiLCBcIntcIiwgb3IgXCIsXCJcclxuICAgICAgICAgICAgcmVxdWlyZU5vbkNvbW1hID0gb3BlbiB8fCBjb21tYTtcclxuXHJcbiAgICAgICAgICAgIC8vIERldGVybWluZSBuZXcgZGVwdGhcclxuICAgICAgICAgICAgLy8gYXJyYXkvb2JqZWN0IG9wZW4gKFwiW1wiIG9yIFwie1wiKTogZGVwdGggKz0gdHJ1ZSAtIGZhbHNlIChpbmNyZW1lbnQpXHJcbiAgICAgICAgICAgIC8vIGFycmF5L29iamVjdCBjbG9zZSAoXCJdXCIgb3IgXCJ9XCIpOiBkZXB0aCArPSBmYWxzZSAtIHRydWUgKGRlY3JlbWVudClcclxuICAgICAgICAgICAgLy8gb3RoZXIgY2FzZXMgKFwiLFwiIG9yIHByaW1pdGl2ZSk6IGRlcHRoICs9IHRydWUgLSB0cnVlIChudW1lcmljIGNhc3QpXHJcbiAgICAgICAgICAgIGRlcHRoICs9ICFjbG9zZSAtICFvcGVuO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoaXMgdG9rZW5cclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfSkgKSA/XHJcbiAgICAgICAgICAgICggRnVuY3Rpb24oIFwicmV0dXJuIFwiICsgc3RyICkgKSgpIDpcclxuICAgICAgICAgICAgalF1ZXJ5LmVycm9yKCBcIkludmFsaWQgSlNPTjogXCIgKyBkYXRhICk7XHJcbiAgICB9O1xyXG5cclxuXHJcbi8vIENyb3NzLWJyb3dzZXIgeG1sIHBhcnNpbmdcclxuICAgIGpRdWVyeS5wYXJzZVhNTCA9IGZ1bmN0aW9uKCBkYXRhICkge1xyXG4gICAgICAgIHZhciB4bWwsIHRtcDtcclxuICAgICAgICBpZiAoICFkYXRhIHx8IHR5cGVvZiBkYXRhICE9PSBcInN0cmluZ1wiICkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKCB3aW5kb3cuRE9NUGFyc2VyICkgeyAvLyBTdGFuZGFyZFxyXG4gICAgICAgICAgICAgICAgdG1wID0gbmV3IERPTVBhcnNlcigpO1xyXG4gICAgICAgICAgICAgICAgeG1sID0gdG1wLnBhcnNlRnJvbVN0cmluZyggZGF0YSwgXCJ0ZXh0L3htbFwiICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIElFXHJcbiAgICAgICAgICAgICAgICB4bWwgPSBuZXcgQWN0aXZlWE9iamVjdCggXCJNaWNyb3NvZnQuWE1MRE9NXCIgKTtcclxuICAgICAgICAgICAgICAgIHhtbC5hc3luYyA9IFwiZmFsc2VcIjtcclxuICAgICAgICAgICAgICAgIHhtbC5sb2FkWE1MKCBkYXRhICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoKCBlICkge1xyXG4gICAgICAgICAgICB4bWwgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggIXhtbCB8fCAheG1sLmRvY3VtZW50RWxlbWVudCB8fCB4bWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwicGFyc2VyZXJyb3JcIiApLmxlbmd0aCApIHtcclxuICAgICAgICAgICAgalF1ZXJ5LmVycm9yKCBcIkludmFsaWQgWE1MOiBcIiArIGRhdGEgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHhtbDtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHZhclxyXG4gICAgLy8gRG9jdW1lbnQgbG9jYXRpb25cclxuICAgICAgICBhamF4TG9jUGFydHMsXHJcbiAgICAgICAgYWpheExvY2F0aW9uLFxyXG5cclxuICAgICAgICByaGFzaCA9IC8jLiokLyxcclxuICAgICAgICBydHMgPSAvKFs/Jl0pXz1bXiZdKi8sXHJcbiAgICAgICAgcmhlYWRlcnMgPSAvXiguKj8pOlsgXFx0XSooW15cXHJcXG5dKilcXHI/JC9tZywgLy8gSUUgbGVhdmVzIGFuIFxcciBjaGFyYWN0ZXIgYXQgRU9MXHJcbiAgICAvLyAjNzY1MywgIzgxMjUsICM4MTUyOiBsb2NhbCBwcm90b2NvbCBkZXRlY3Rpb25cclxuICAgICAgICBybG9jYWxQcm90b2NvbCA9IC9eKD86YWJvdXR8YXBwfGFwcC1zdG9yYWdlfC4rLWV4dGVuc2lvbnxmaWxlfHJlc3x3aWRnZXQpOiQvLFxyXG4gICAgICAgIHJub0NvbnRlbnQgPSAvXig/OkdFVHxIRUFEKSQvLFxyXG4gICAgICAgIHJwcm90b2NvbCA9IC9eXFwvXFwvLyxcclxuICAgICAgICBydXJsID0gL14oW1xcdy4rLV0rOikoPzpcXC9cXC8oPzpbXlxcLz8jXSpAfCkoW15cXC8/IzpdKikoPzo6KFxcZCspfCl8KS8sXHJcblxyXG4gICAgLyogUHJlZmlsdGVyc1xyXG4gICAgICogMSkgVGhleSBhcmUgdXNlZnVsIHRvIGludHJvZHVjZSBjdXN0b20gZGF0YVR5cGVzIChzZWUgYWpheC9qc29ucC5qcyBmb3IgYW4gZXhhbXBsZSlcclxuICAgICAqIDIpIFRoZXNlIGFyZSBjYWxsZWQ6XHJcbiAgICAgKiAgICAtIEJFRk9SRSBhc2tpbmcgZm9yIGEgdHJhbnNwb3J0XHJcbiAgICAgKiAgICAtIEFGVEVSIHBhcmFtIHNlcmlhbGl6YXRpb24gKHMuZGF0YSBpcyBhIHN0cmluZyBpZiBzLnByb2Nlc3NEYXRhIGlzIHRydWUpXHJcbiAgICAgKiAzKSBrZXkgaXMgdGhlIGRhdGFUeXBlXHJcbiAgICAgKiA0KSB0aGUgY2F0Y2hhbGwgc3ltYm9sIFwiKlwiIGNhbiBiZSB1c2VkXHJcbiAgICAgKiA1KSBleGVjdXRpb24gd2lsbCBzdGFydCB3aXRoIHRyYW5zcG9ydCBkYXRhVHlwZSBhbmQgVEhFTiBjb250aW51ZSBkb3duIHRvIFwiKlwiIGlmIG5lZWRlZFxyXG4gICAgICovXHJcbiAgICAgICAgcHJlZmlsdGVycyA9IHt9LFxyXG5cclxuICAgIC8qIFRyYW5zcG9ydHMgYmluZGluZ3NcclxuICAgICAqIDEpIGtleSBpcyB0aGUgZGF0YVR5cGVcclxuICAgICAqIDIpIHRoZSBjYXRjaGFsbCBzeW1ib2wgXCIqXCIgY2FuIGJlIHVzZWRcclxuICAgICAqIDMpIHNlbGVjdGlvbiB3aWxsIHN0YXJ0IHdpdGggdHJhbnNwb3J0IGRhdGFUeXBlIGFuZCBUSEVOIGdvIHRvIFwiKlwiIGlmIG5lZWRlZFxyXG4gICAgICovXHJcbiAgICAgICAgdHJhbnNwb3J0cyA9IHt9LFxyXG5cclxuICAgIC8vIEF2b2lkIGNvbW1lbnQtcHJvbG9nIGNoYXIgc2VxdWVuY2UgKCMxMDA5OCk7IG11c3QgYXBwZWFzZSBsaW50IGFuZCBldmFkZSBjb21wcmVzc2lvblxyXG4gICAgICAgIGFsbFR5cGVzID0gXCIqL1wiLmNvbmNhdChcIipcIik7XHJcblxyXG4vLyAjODEzOCwgSUUgbWF5IHRocm93IGFuIGV4Y2VwdGlvbiB3aGVuIGFjY2Vzc2luZ1xyXG4vLyBhIGZpZWxkIGZyb20gd2luZG93LmxvY2F0aW9uIGlmIGRvY3VtZW50LmRvbWFpbiBoYXMgYmVlbiBzZXRcclxuICAgIHRyeSB7XHJcbiAgICAgICAgYWpheExvY2F0aW9uID0gbG9jYXRpb24uaHJlZjtcclxuICAgIH0gY2F0Y2goIGUgKSB7XHJcbiAgICAgICAgLy8gVXNlIHRoZSBocmVmIGF0dHJpYnV0ZSBvZiBhbiBBIGVsZW1lbnRcclxuICAgICAgICAvLyBzaW5jZSBJRSB3aWxsIG1vZGlmeSBpdCBnaXZlbiBkb2N1bWVudC5sb2NhdGlvblxyXG4gICAgICAgIGFqYXhMb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiYVwiICk7XHJcbiAgICAgICAgYWpheExvY2F0aW9uLmhyZWYgPSBcIlwiO1xyXG4gICAgICAgIGFqYXhMb2NhdGlvbiA9IGFqYXhMb2NhdGlvbi5ocmVmO1xyXG4gICAgfVxyXG5cclxuLy8gU2VnbWVudCBsb2NhdGlvbiBpbnRvIHBhcnRzXHJcbiAgICBhamF4TG9jUGFydHMgPSBydXJsLmV4ZWMoIGFqYXhMb2NhdGlvbi50b0xvd2VyQ2FzZSgpICkgfHwgW107XHJcblxyXG4vLyBCYXNlIFwiY29uc3RydWN0b3JcIiBmb3IgalF1ZXJ5LmFqYXhQcmVmaWx0ZXIgYW5kIGpRdWVyeS5hamF4VHJhbnNwb3J0XHJcbiAgICBmdW5jdGlvbiBhZGRUb1ByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHN0cnVjdHVyZSApIHtcclxuXHJcbiAgICAgICAgLy8gZGF0YVR5cGVFeHByZXNzaW9uIGlzIG9wdGlvbmFsIGFuZCBkZWZhdWx0cyB0byBcIipcIlxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiggZGF0YVR5cGVFeHByZXNzaW9uLCBmdW5jICkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgZGF0YVR5cGVFeHByZXNzaW9uICE9PSBcInN0cmluZ1wiICkge1xyXG4gICAgICAgICAgICAgICAgZnVuYyA9IGRhdGFUeXBlRXhwcmVzc2lvbjtcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlRXhwcmVzc2lvbiA9IFwiKlwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YVR5cGUsXHJcbiAgICAgICAgICAgICAgICBpID0gMCxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlcyA9IGRhdGFUeXBlRXhwcmVzc2lvbi50b0xvd2VyQ2FzZSgpLm1hdGNoKCBybm90d2hpdGUgKSB8fCBbXTtcclxuXHJcbiAgICAgICAgICAgIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGZ1bmMgKSApIHtcclxuICAgICAgICAgICAgICAgIC8vIEZvciBlYWNoIGRhdGFUeXBlIGluIHRoZSBkYXRhVHlwZUV4cHJlc3Npb25cclxuICAgICAgICAgICAgICAgIHdoaWxlICggKGRhdGFUeXBlID0gZGF0YVR5cGVzW2krK10pICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFByZXBlbmQgaWYgcmVxdWVzdGVkXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBkYXRhVHlwZS5jaGFyQXQoIDAgKSA9PT0gXCIrXCIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlID0gZGF0YVR5cGUuc2xpY2UoIDEgKSB8fCBcIipcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHN0cnVjdHVyZVsgZGF0YVR5cGUgXSA9IHN0cnVjdHVyZVsgZGF0YVR5cGUgXSB8fCBbXSkudW5zaGlmdCggZnVuYyApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGFwcGVuZFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChzdHJ1Y3R1cmVbIGRhdGFUeXBlIF0gPSBzdHJ1Y3R1cmVbIGRhdGFUeXBlIF0gfHwgW10pLnB1c2goIGZ1bmMgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuLy8gQmFzZSBpbnNwZWN0aW9uIGZ1bmN0aW9uIGZvciBwcmVmaWx0ZXJzIGFuZCB0cmFuc3BvcnRzXHJcbiAgICBmdW5jdGlvbiBpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyggc3RydWN0dXJlLCBvcHRpb25zLCBvcmlnaW5hbE9wdGlvbnMsIGpxWEhSICkge1xyXG5cclxuICAgICAgICB2YXIgaW5zcGVjdGVkID0ge30sXHJcbiAgICAgICAgICAgIHNlZWtpbmdUcmFuc3BvcnQgPSAoIHN0cnVjdHVyZSA9PT0gdHJhbnNwb3J0cyApO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbnNwZWN0KCBkYXRhVHlwZSApIHtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkO1xyXG4gICAgICAgICAgICBpbnNwZWN0ZWRbIGRhdGFUeXBlIF0gPSB0cnVlO1xyXG4gICAgICAgICAgICBqUXVlcnkuZWFjaCggc3RydWN0dXJlWyBkYXRhVHlwZSBdIHx8IFtdLCBmdW5jdGlvbiggXywgcHJlZmlsdGVyT3JGYWN0b3J5ICkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGFUeXBlT3JUcmFuc3BvcnQgPSBwcmVmaWx0ZXJPckZhY3RvcnkoIG9wdGlvbnMsIG9yaWdpbmFsT3B0aW9ucywganFYSFIgKTtcclxuICAgICAgICAgICAgICAgIGlmICggdHlwZW9mIGRhdGFUeXBlT3JUcmFuc3BvcnQgPT09IFwic3RyaW5nXCIgJiYgIXNlZWtpbmdUcmFuc3BvcnQgJiYgIWluc3BlY3RlZFsgZGF0YVR5cGVPclRyYW5zcG9ydCBdICkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YVR5cGVzLnVuc2hpZnQoIGRhdGFUeXBlT3JUcmFuc3BvcnQgKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnNwZWN0KCBkYXRhVHlwZU9yVHJhbnNwb3J0ICk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICggc2Vla2luZ1RyYW5zcG9ydCApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gISggc2VsZWN0ZWQgPSBkYXRhVHlwZU9yVHJhbnNwb3J0ICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaW5zcGVjdCggb3B0aW9ucy5kYXRhVHlwZXNbIDAgXSApIHx8ICFpbnNwZWN0ZWRbIFwiKlwiIF0gJiYgaW5zcGVjdCggXCIqXCIgKTtcclxuICAgIH1cclxuXHJcbi8vIEEgc3BlY2lhbCBleHRlbmQgZm9yIGFqYXggb3B0aW9uc1xyXG4vLyB0aGF0IHRha2VzIFwiZmxhdFwiIG9wdGlvbnMgKG5vdCB0byBiZSBkZWVwIGV4dGVuZGVkKVxyXG4vLyBGaXhlcyAjOTg4N1xyXG4gICAgZnVuY3Rpb24gYWpheEV4dGVuZCggdGFyZ2V0LCBzcmMgKSB7XHJcbiAgICAgICAgdmFyIGRlZXAsIGtleSxcclxuICAgICAgICAgICAgZmxhdE9wdGlvbnMgPSBqUXVlcnkuYWpheFNldHRpbmdzLmZsYXRPcHRpb25zIHx8IHt9O1xyXG5cclxuICAgICAgICBmb3IgKCBrZXkgaW4gc3JjICkge1xyXG4gICAgICAgICAgICBpZiAoIHNyY1sga2V5IF0gIT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgICggZmxhdE9wdGlvbnNbIGtleSBdID8gdGFyZ2V0IDogKCBkZWVwIHx8IChkZWVwID0ge30pICkgKVsga2V5IF0gPSBzcmNbIGtleSBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggZGVlcCApIHtcclxuICAgICAgICAgICAgalF1ZXJ5LmV4dGVuZCggdHJ1ZSwgdGFyZ2V0LCBkZWVwICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qIEhhbmRsZXMgcmVzcG9uc2VzIHRvIGFuIGFqYXggcmVxdWVzdDpcclxuICAgICAqIC0gZmluZHMgdGhlIHJpZ2h0IGRhdGFUeXBlIChtZWRpYXRlcyBiZXR3ZWVuIGNvbnRlbnQtdHlwZSBhbmQgZXhwZWN0ZWQgZGF0YVR5cGUpXHJcbiAgICAgKiAtIHJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgcmVzcG9uc2VcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gYWpheEhhbmRsZVJlc3BvbnNlcyggcywganFYSFIsIHJlc3BvbnNlcyApIHtcclxuICAgICAgICB2YXIgZmlyc3REYXRhVHlwZSwgY3QsIGZpbmFsRGF0YVR5cGUsIHR5cGUsXHJcbiAgICAgICAgICAgIGNvbnRlbnRzID0gcy5jb250ZW50cyxcclxuICAgICAgICAgICAgZGF0YVR5cGVzID0gcy5kYXRhVHlwZXM7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBhdXRvIGRhdGFUeXBlIGFuZCBnZXQgY29udGVudC10eXBlIGluIHRoZSBwcm9jZXNzXHJcbiAgICAgICAgd2hpbGUgKCBkYXRhVHlwZXNbIDAgXSA9PT0gXCIqXCIgKSB7XHJcbiAgICAgICAgICAgIGRhdGFUeXBlcy5zaGlmdCgpO1xyXG4gICAgICAgICAgICBpZiAoIGN0ID09PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICBjdCA9IHMubWltZVR5cGUgfHwganFYSFIuZ2V0UmVzcG9uc2VIZWFkZXIoXCJDb250ZW50LVR5cGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHdlJ3JlIGRlYWxpbmcgd2l0aCBhIGtub3duIGNvbnRlbnQtdHlwZVxyXG4gICAgICAgIGlmICggY3QgKSB7XHJcbiAgICAgICAgICAgIGZvciAoIHR5cGUgaW4gY29udGVudHMgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIGNvbnRlbnRzWyB0eXBlIF0gJiYgY29udGVudHNbIHR5cGUgXS50ZXN0KCBjdCApICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlcy51bnNoaWZ0KCB0eXBlICk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB3ZSBoYXZlIGEgcmVzcG9uc2UgZm9yIHRoZSBleHBlY3RlZCBkYXRhVHlwZVxyXG4gICAgICAgIGlmICggZGF0YVR5cGVzWyAwIF0gaW4gcmVzcG9uc2VzICkge1xyXG4gICAgICAgICAgICBmaW5hbERhdGFUeXBlID0gZGF0YVR5cGVzWyAwIF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gVHJ5IGNvbnZlcnRpYmxlIGRhdGFUeXBlc1xyXG4gICAgICAgICAgICBmb3IgKCB0eXBlIGluIHJlc3BvbnNlcyApIHtcclxuICAgICAgICAgICAgICAgIGlmICggIWRhdGFUeXBlc1sgMCBdIHx8IHMuY29udmVydGVyc1sgdHlwZSArIFwiIFwiICsgZGF0YVR5cGVzWzBdIF0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmluYWxEYXRhVHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoICFmaXJzdERhdGFUeXBlICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RGF0YVR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIE9yIGp1c3QgdXNlIGZpcnN0IG9uZVxyXG4gICAgICAgICAgICBmaW5hbERhdGFUeXBlID0gZmluYWxEYXRhVHlwZSB8fCBmaXJzdERhdGFUeXBlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgd2UgZm91bmQgYSBkYXRhVHlwZVxyXG4gICAgICAgIC8vIFdlIGFkZCB0aGUgZGF0YVR5cGUgdG8gdGhlIGxpc3QgaWYgbmVlZGVkXHJcbiAgICAgICAgLy8gYW5kIHJldHVybiB0aGUgY29ycmVzcG9uZGluZyByZXNwb25zZVxyXG4gICAgICAgIGlmICggZmluYWxEYXRhVHlwZSApIHtcclxuICAgICAgICAgICAgaWYgKCBmaW5hbERhdGFUeXBlICE9PSBkYXRhVHlwZXNbIDAgXSApIHtcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlcy51bnNoaWZ0KCBmaW5hbERhdGFUeXBlICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlc1sgZmluYWxEYXRhVHlwZSBdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiBDaGFpbiBjb252ZXJzaW9ucyBnaXZlbiB0aGUgcmVxdWVzdCBhbmQgdGhlIG9yaWdpbmFsIHJlc3BvbnNlXHJcbiAgICAgKiBBbHNvIHNldHMgdGhlIHJlc3BvbnNlWFhYIGZpZWxkcyBvbiB0aGUganFYSFIgaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gYWpheENvbnZlcnQoIHMsIHJlc3BvbnNlLCBqcVhIUiwgaXNTdWNjZXNzICkge1xyXG4gICAgICAgIHZhciBjb252MiwgY3VycmVudCwgY29udiwgdG1wLCBwcmV2LFxyXG4gICAgICAgICAgICBjb252ZXJ0ZXJzID0ge30sXHJcbiAgICAgICAgLy8gV29yayB3aXRoIGEgY29weSBvZiBkYXRhVHlwZXMgaW4gY2FzZSB3ZSBuZWVkIHRvIG1vZGlmeSBpdCBmb3IgY29udmVyc2lvblxyXG4gICAgICAgICAgICBkYXRhVHlwZXMgPSBzLmRhdGFUeXBlcy5zbGljZSgpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgY29udmVydGVycyBtYXAgd2l0aCBsb3dlcmNhc2VkIGtleXNcclxuICAgICAgICBpZiAoIGRhdGFUeXBlc1sgMSBdICkge1xyXG4gICAgICAgICAgICBmb3IgKCBjb252IGluIHMuY29udmVydGVycyApIHtcclxuICAgICAgICAgICAgICAgIGNvbnZlcnRlcnNbIGNvbnYudG9Mb3dlckNhc2UoKSBdID0gcy5jb252ZXJ0ZXJzWyBjb252IF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGN1cnJlbnQgPSBkYXRhVHlwZXMuc2hpZnQoKTtcclxuXHJcbiAgICAgICAgLy8gQ29udmVydCB0byBlYWNoIHNlcXVlbnRpYWwgZGF0YVR5cGVcclxuICAgICAgICB3aGlsZSAoIGN1cnJlbnQgKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIHMucmVzcG9uc2VGaWVsZHNbIGN1cnJlbnQgXSApIHtcclxuICAgICAgICAgICAgICAgIGpxWEhSWyBzLnJlc3BvbnNlRmllbGRzWyBjdXJyZW50IF0gXSA9IHJlc3BvbnNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBBcHBseSB0aGUgZGF0YUZpbHRlciBpZiBwcm92aWRlZFxyXG4gICAgICAgICAgICBpZiAoICFwcmV2ICYmIGlzU3VjY2VzcyAmJiBzLmRhdGFGaWx0ZXIgKSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZSA9IHMuZGF0YUZpbHRlciggcmVzcG9uc2UsIHMuZGF0YVR5cGUgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHJldiA9IGN1cnJlbnQ7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBkYXRhVHlwZXMuc2hpZnQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICggY3VycmVudCApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUaGVyZSdzIG9ubHkgd29yayB0byBkbyBpZiBjdXJyZW50IGRhdGFUeXBlIGlzIG5vbi1hdXRvXHJcbiAgICAgICAgICAgICAgICBpZiAoIGN1cnJlbnQgPT09IFwiKlwiICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gcHJldjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ29udmVydCByZXNwb25zZSBpZiBwcmV2IGRhdGFUeXBlIGlzIG5vbi1hdXRvIGFuZCBkaWZmZXJzIGZyb20gY3VycmVudFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICggcHJldiAhPT0gXCIqXCIgJiYgcHJldiAhPT0gY3VycmVudCApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2VlayBhIGRpcmVjdCBjb252ZXJ0ZXJcclxuICAgICAgICAgICAgICAgICAgICBjb252ID0gY29udmVydGVyc1sgcHJldiArIFwiIFwiICsgY3VycmVudCBdIHx8IGNvbnZlcnRlcnNbIFwiKiBcIiArIGN1cnJlbnQgXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgbm9uZSBmb3VuZCwgc2VlayBhIHBhaXJcclxuICAgICAgICAgICAgICAgICAgICBpZiAoICFjb252ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKCBjb252MiBpbiBjb252ZXJ0ZXJzICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIGNvbnYyIG91dHB1dHMgY3VycmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gY29udjIuc3BsaXQoIFwiIFwiICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHRtcFsgMSBdID09PSBjdXJyZW50ICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiBwcmV2IGNhbiBiZSBjb252ZXJ0ZWQgdG8gYWNjZXB0ZWQgaW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ID0gY29udmVydGVyc1sgcHJldiArIFwiIFwiICsgdG1wWyAwIF0gXSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRlcnNbIFwiKiBcIiArIHRtcFsgMCBdIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBjb252ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDb25kZW5zZSBlcXVpdmFsZW5jZSBjb252ZXJ0ZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggY29udiA9PT0gdHJ1ZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnYgPSBjb252ZXJ0ZXJzWyBjb252MiBdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgaW5zZXJ0IHRoZSBpbnRlcm1lZGlhdGUgZGF0YVR5cGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICggY29udmVydGVyc1sgY29udjIgXSAhPT0gdHJ1ZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSB0bXBbIDAgXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlcy51bnNoaWZ0KCB0bXBbIDEgXSApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQXBwbHkgY29udmVydGVyIChpZiBub3QgYW4gZXF1aXZhbGVuY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBjb252ICE9PSB0cnVlICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVW5sZXNzIGVycm9ycyBhcmUgYWxsb3dlZCB0byBidWJibGUsIGNhdGNoIGFuZCByZXR1cm4gdGhlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGNvbnYgJiYgc1sgXCJ0aHJvd3NcIiBdICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBjb252KCByZXNwb25zZSApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IGNvbnYoIHJlc3BvbnNlICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoICggZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBzdGF0ZTogXCJwYXJzZXJlcnJvclwiLCBlcnJvcjogY29udiA/IGUgOiBcIk5vIGNvbnZlcnNpb24gZnJvbSBcIiArIHByZXYgKyBcIiB0byBcIiArIGN1cnJlbnQgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHsgc3RhdGU6IFwic3VjY2Vzc1wiLCBkYXRhOiByZXNwb25zZSB9O1xyXG4gICAgfVxyXG5cclxuICAgIGpRdWVyeS5leHRlbmQoe1xyXG5cclxuICAgICAgICAvLyBDb3VudGVyIGZvciBob2xkaW5nIHRoZSBudW1iZXIgb2YgYWN0aXZlIHF1ZXJpZXNcclxuICAgICAgICBhY3RpdmU6IDAsXHJcblxyXG4gICAgICAgIC8vIExhc3QtTW9kaWZpZWQgaGVhZGVyIGNhY2hlIGZvciBuZXh0IHJlcXVlc3RcclxuICAgICAgICBsYXN0TW9kaWZpZWQ6IHt9LFxyXG4gICAgICAgIGV0YWc6IHt9LFxyXG5cclxuICAgICAgICBhamF4U2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgdXJsOiBhamF4TG9jYXRpb24sXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGlzTG9jYWw6IHJsb2NhbFByb3RvY29sLnRlc3QoIGFqYXhMb2NQYXJ0c1sgMSBdICksXHJcbiAgICAgICAgICAgIGdsb2JhbDogdHJ1ZSxcclxuICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLThcIixcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgIHRpbWVvdXQ6IDAsXHJcbiAgICAgICAgICAgICBkYXRhOiBudWxsLFxyXG4gICAgICAgICAgICAgZGF0YVR5cGU6IG51bGwsXHJcbiAgICAgICAgICAgICB1c2VybmFtZTogbnVsbCxcclxuICAgICAgICAgICAgIHBhc3N3b3JkOiBudWxsLFxyXG4gICAgICAgICAgICAgY2FjaGU6IG51bGwsXHJcbiAgICAgICAgICAgICB0aHJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgICAgdHJhZGl0aW9uYWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgaGVhZGVyczoge30sXHJcbiAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICAgICAgYWNjZXB0czoge1xyXG4gICAgICAgICAgICAgICAgXCIqXCI6IGFsbFR5cGVzLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJ0ZXh0L3BsYWluXCIsXHJcbiAgICAgICAgICAgICAgICBodG1sOiBcInRleHQvaHRtbFwiLFxyXG4gICAgICAgICAgICAgICAgeG1sOiBcImFwcGxpY2F0aW9uL3htbCwgdGV4dC94bWxcIixcclxuICAgICAgICAgICAgICAgIGpzb246IFwiYXBwbGljYXRpb24vanNvbiwgdGV4dC9qYXZhc2NyaXB0XCJcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGNvbnRlbnRzOiB7XHJcbiAgICAgICAgICAgICAgICB4bWw6IC94bWwvLFxyXG4gICAgICAgICAgICAgICAgaHRtbDogL2h0bWwvLFxyXG4gICAgICAgICAgICAgICAganNvbjogL2pzb24vXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICByZXNwb25zZUZpZWxkczoge1xyXG4gICAgICAgICAgICAgICAgeG1sOiBcInJlc3BvbnNlWE1MXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcInJlc3BvbnNlVGV4dFwiLFxyXG4gICAgICAgICAgICAgICAganNvbjogXCJyZXNwb25zZUpTT05cIlxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLy8gRGF0YSBjb252ZXJ0ZXJzXHJcbiAgICAgICAgICAgIC8vIEtleXMgc2VwYXJhdGUgc291cmNlIChvciBjYXRjaGFsbCBcIipcIikgYW5kIGRlc3RpbmF0aW9uIHR5cGVzIHdpdGggYSBzaW5nbGUgc3BhY2VcclxuICAgICAgICAgICAgY29udmVydGVyczoge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENvbnZlcnQgYW55dGhpbmcgdG8gdGV4dFxyXG4gICAgICAgICAgICAgICAgXCIqIHRleHRcIjogU3RyaW5nLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRleHQgdG8gaHRtbCAodHJ1ZSA9IG5vIHRyYW5zZm9ybWF0aW9uKVxyXG4gICAgICAgICAgICAgICAgXCJ0ZXh0IGh0bWxcIjogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBFdmFsdWF0ZSB0ZXh0IGFzIGEganNvbiBleHByZXNzaW9uXHJcbiAgICAgICAgICAgICAgICBcInRleHQganNvblwiOiBqUXVlcnkucGFyc2VKU09OLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFBhcnNlIHRleHQgYXMgeG1sXHJcbiAgICAgICAgICAgICAgICBcInRleHQgeG1sXCI6IGpRdWVyeS5wYXJzZVhNTFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLy8gRm9yIG9wdGlvbnMgdGhhdCBzaG91bGRuJ3QgYmUgZGVlcCBleHRlbmRlZDpcclxuICAgICAgICAgICAgLy8geW91IGNhbiBhZGQgeW91ciBvd24gY3VzdG9tIG9wdGlvbnMgaGVyZSBpZlxyXG4gICAgICAgICAgICAvLyBhbmQgd2hlbiB5b3UgY3JlYXRlIG9uZSB0aGF0IHNob3VsZG4ndCBiZVxyXG4gICAgICAgICAgICAvLyBkZWVwIGV4dGVuZGVkIChzZWUgYWpheEV4dGVuZClcclxuICAgICAgICAgICAgZmxhdE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIHVybDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNvbnRleHQ6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIENyZWF0ZXMgYSBmdWxsIGZsZWRnZWQgc2V0dGluZ3Mgb2JqZWN0IGludG8gdGFyZ2V0XHJcbiAgICAgICAgLy8gd2l0aCBib3RoIGFqYXhTZXR0aW5ncyBhbmQgc2V0dGluZ3MgZmllbGRzLlxyXG4gICAgICAgIC8vIElmIHRhcmdldCBpcyBvbWl0dGVkLCB3cml0ZXMgaW50byBhamF4U2V0dGluZ3MuXHJcbiAgICAgICAgYWpheFNldHVwOiBmdW5jdGlvbiggdGFyZ2V0LCBzZXR0aW5ncyApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNldHRpbmdzID9cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBCdWlsZGluZyBhIHNldHRpbmdzIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgYWpheEV4dGVuZCggYWpheEV4dGVuZCggdGFyZ2V0LCBqUXVlcnkuYWpheFNldHRpbmdzICksIHNldHRpbmdzICkgOlxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEV4dGVuZGluZyBhamF4U2V0dGluZ3NcclxuICAgICAgICAgICAgICAgIGFqYXhFeHRlbmQoIGpRdWVyeS5hamF4U2V0dGluZ3MsIHRhcmdldCApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFqYXhQcmVmaWx0ZXI6IGFkZFRvUHJlZmlsdGVyc09yVHJhbnNwb3J0cyggcHJlZmlsdGVycyApLFxyXG4gICAgICAgIGFqYXhUcmFuc3BvcnQ6IGFkZFRvUHJlZmlsdGVyc09yVHJhbnNwb3J0cyggdHJhbnNwb3J0cyApLFxyXG5cclxuICAgICAgICAvLyBNYWluIG1ldGhvZFxyXG4gICAgICAgIGFqYXg6IGZ1bmN0aW9uKCB1cmwsIG9wdGlvbnMgKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB1cmwgaXMgYW4gb2JqZWN0LCBzaW11bGF0ZSBwcmUtMS41IHNpZ25hdHVyZVxyXG4gICAgICAgICAgICBpZiAoIHR5cGVvZiB1cmwgPT09IFwib2JqZWN0XCIgKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgdXJsID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBGb3JjZSBvcHRpb25zIHRvIGJlIGFuIG9iamVjdFxyXG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgICAgICAgICAgIHZhciAvLyBDcm9zcy1kb21haW4gZGV0ZWN0aW9uIHZhcnNcclxuICAgICAgICAgICAgICAgIHBhcnRzLFxyXG4gICAgICAgICAgICAvLyBMb29wIHZhcmlhYmxlXHJcbiAgICAgICAgICAgICAgICBpLFxyXG4gICAgICAgICAgICAvLyBVUkwgd2l0aG91dCBhbnRpLWNhY2hlIHBhcmFtXHJcbiAgICAgICAgICAgICAgICBjYWNoZVVSTCxcclxuICAgICAgICAgICAgLy8gUmVzcG9uc2UgaGVhZGVycyBhcyBzdHJpbmdcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlSGVhZGVyc1N0cmluZyxcclxuICAgICAgICAgICAgLy8gdGltZW91dCBoYW5kbGVcclxuICAgICAgICAgICAgICAgIHRpbWVvdXRUaW1lcixcclxuXHJcbiAgICAgICAgICAgIC8vIFRvIGtub3cgaWYgZ2xvYmFsIGV2ZW50cyBhcmUgdG8gYmUgZGlzcGF0Y2hlZFxyXG4gICAgICAgICAgICAgICAgZmlyZUdsb2JhbHMsXHJcblxyXG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0LFxyXG4gICAgICAgICAgICAvLyBSZXNwb25zZSBoZWFkZXJzXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZUhlYWRlcnMsXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgZmluYWwgb3B0aW9ucyBvYmplY3RcclxuICAgICAgICAgICAgICAgIHMgPSBqUXVlcnkuYWpheFNldHVwKCB7fSwgb3B0aW9ucyApLFxyXG4gICAgICAgICAgICAvLyBDYWxsYmFja3MgY29udGV4dFxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tDb250ZXh0ID0gcy5jb250ZXh0IHx8IHMsXHJcbiAgICAgICAgICAgIC8vIENvbnRleHQgZm9yIGdsb2JhbCBldmVudHMgaXMgY2FsbGJhY2tDb250ZXh0IGlmIGl0IGlzIGEgRE9NIG5vZGUgb3IgalF1ZXJ5IGNvbGxlY3Rpb25cclxuICAgICAgICAgICAgICAgIGdsb2JhbEV2ZW50Q29udGV4dCA9IHMuY29udGV4dCAmJiAoIGNhbGxiYWNrQ29udGV4dC5ub2RlVHlwZSB8fCBjYWxsYmFja0NvbnRleHQuanF1ZXJ5ICkgP1xyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSggY2FsbGJhY2tDb250ZXh0ICkgOlxyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudCxcclxuICAgICAgICAgICAgLy8gRGVmZXJyZWRzXHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICAgICAgY29tcGxldGVEZWZlcnJlZCA9IGpRdWVyeS5DYWxsYmFja3MoXCJvbmNlIG1lbW9yeVwiKSxcclxuICAgICAgICAgICAgLy8gU3RhdHVzLWRlcGVuZGVudCBjYWxsYmFja3NcclxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGUgPSBzLnN0YXR1c0NvZGUgfHwge30sXHJcbiAgICAgICAgICAgIC8vIEhlYWRlcnMgKHRoZXkgYXJlIHNlbnQgYWxsIGF0IG9uY2UpXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0SGVhZGVycyA9IHt9LFxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEhlYWRlcnNOYW1lcyA9IHt9LFxyXG4gICAgICAgICAgICAvLyBUaGUganFYSFIgc3RhdGVcclxuICAgICAgICAgICAgICAgIHN0YXRlID0gMCxcclxuICAgICAgICAgICAgLy8gRGVmYXVsdCBhYm9ydCBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICBzdHJBYm9ydCA9IFwiY2FuY2VsZWRcIixcclxuICAgICAgICAgICAgLy8gRmFrZSB4aHJcclxuICAgICAgICAgICAgICAgIGpxWEhSID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWR5U3RhdGU6IDAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEJ1aWxkcyBoZWFkZXJzIGhhc2h0YWJsZSBpZiBuZWVkZWRcclxuICAgICAgICAgICAgICAgICAgICBnZXRSZXNwb25zZUhlYWRlcjogZnVuY3Rpb24oIGtleSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHN0YXRlID09PSAyICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAhcmVzcG9uc2VIZWFkZXJzICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlSGVhZGVycyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICggKG1hdGNoID0gcmhlYWRlcnMuZXhlYyggcmVzcG9uc2VIZWFkZXJzU3RyaW5nICkpICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZUhlYWRlcnNbIG1hdGNoWzFdLnRvTG93ZXJDYXNlKCkgXSA9IG1hdGNoWyAyIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSByZXNwb25zZUhlYWRlcnNbIGtleS50b0xvd2VyQ2FzZSgpIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoID09IG51bGwgPyBudWxsIDogbWF0Y2g7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmF3IHN0cmluZ1xyXG4gICAgICAgICAgICAgICAgICAgIGdldEFsbFJlc3BvbnNlSGVhZGVyczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZSA9PT0gMiA/IHJlc3BvbnNlSGVhZGVyc1N0cmluZyA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FjaGVzIHRoZSBoZWFkZXJcclxuICAgICAgICAgICAgICAgICAgICBzZXRSZXF1ZXN0SGVhZGVyOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAhc3RhdGUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lID0gcmVxdWVzdEhlYWRlcnNOYW1lc1sgbG5hbWUgXSA9IHJlcXVlc3RIZWFkZXJzTmFtZXNbIGxuYW1lIF0gfHwgbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RIZWFkZXJzWyBuYW1lIF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBPdmVycmlkZXMgcmVzcG9uc2UgY29udGVudC10eXBlIGhlYWRlclxyXG4gICAgICAgICAgICAgICAgICAgIG92ZXJyaWRlTWltZVR5cGU6IGZ1bmN0aW9uKCB0eXBlICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoICFzdGF0ZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMubWltZVR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFN0YXR1cy1kZXBlbmRlbnQgY2FsbGJhY2tzXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogZnVuY3Rpb24oIG1hcCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbWFwICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBzdGF0ZSA8IDIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICggY29kZSBpbiBtYXAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIExhenktYWRkIHRoZSBuZXcgY2FsbGJhY2sgaW4gYSB3YXkgdGhhdCBwcmVzZXJ2ZXMgb2xkIG9uZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzQ29kZVsgY29kZSBdID0gWyBzdGF0dXNDb2RlWyBjb2RlIF0sIG1hcFsgY29kZSBdIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIHRoZSBhcHByb3ByaWF0ZSBjYWxsYmFja3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqcVhIUi5hbHdheXMoIG1hcFsganFYSFIuc3RhdHVzIF0gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDYW5jZWwgdGhlIHJlcXVlc3RcclxuICAgICAgICAgICAgICAgICAgICBhYm9ydDogZnVuY3Rpb24oIHN0YXR1c1RleHQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaW5hbFRleHQgPSBzdGF0dXNUZXh0IHx8IHN0ckFib3J0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHRyYW5zcG9ydCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydC5hYm9ydCggZmluYWxUZXh0ICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSggMCwgZmluYWxUZXh0ICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyBBdHRhY2ggZGVmZXJyZWRzXHJcbiAgICAgICAgICAgIGRlZmVycmVkLnByb21pc2UoIGpxWEhSICkuY29tcGxldGUgPSBjb21wbGV0ZURlZmVycmVkLmFkZDtcclxuICAgICAgICAgICAganFYSFIuc3VjY2VzcyA9IGpxWEhSLmRvbmU7XHJcbiAgICAgICAgICAgIGpxWEhSLmVycm9yID0ganFYSFIuZmFpbDtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBoYXNoIGNoYXJhY3RlciAoIzc1MzE6IGFuZCBzdHJpbmcgcHJvbW90aW9uKVxyXG4gICAgICAgICAgICAvLyBBZGQgcHJvdG9jb2wgaWYgbm90IHByb3ZpZGVkICgjNTg2NjogSUU3IGlzc3VlIHdpdGggcHJvdG9jb2wtbGVzcyB1cmxzKVxyXG4gICAgICAgICAgICAvLyBIYW5kbGUgZmFsc3kgdXJsIGluIHRoZSBzZXR0aW5ncyBvYmplY3QgKCMxMDA5MzogY29uc2lzdGVuY3kgd2l0aCBvbGQgc2lnbmF0dXJlKVxyXG4gICAgICAgICAgICAvLyBXZSBhbHNvIHVzZSB0aGUgdXJsIHBhcmFtZXRlciBpZiBhdmFpbGFibGVcclxuICAgICAgICAgICAgcy51cmwgPSAoICggdXJsIHx8IHMudXJsIHx8IGFqYXhMb2NhdGlvbiApICsgXCJcIiApLnJlcGxhY2UoIHJoYXNoLCBcIlwiICkucmVwbGFjZSggcnByb3RvY29sLCBhamF4TG9jUGFydHNbIDEgXSArIFwiLy9cIiApO1xyXG5cclxuICAgICAgICAgICAgLy8gQWxpYXMgbWV0aG9kIG9wdGlvbiB0byB0eXBlIGFzIHBlciB0aWNrZXQgIzEyMDA0XHJcbiAgICAgICAgICAgIHMudHlwZSA9IG9wdGlvbnMubWV0aG9kIHx8IG9wdGlvbnMudHlwZSB8fCBzLm1ldGhvZCB8fCBzLnR5cGU7XHJcblxyXG4gICAgICAgICAgICAvLyBFeHRyYWN0IGRhdGFUeXBlcyBsaXN0XHJcbiAgICAgICAgICAgIHMuZGF0YVR5cGVzID0galF1ZXJ5LnRyaW0oIHMuZGF0YVR5cGUgfHwgXCIqXCIgKS50b0xvd2VyQ2FzZSgpLm1hdGNoKCBybm90d2hpdGUgKSB8fCBbIFwiXCIgXTtcclxuXHJcbiAgICAgICAgICAgIC8vIEEgY3Jvc3MtZG9tYWluIHJlcXVlc3QgaXMgaW4gb3JkZXIgd2hlbiB3ZSBoYXZlIGEgcHJvdG9jb2w6aG9zdDpwb3J0IG1pc21hdGNoXHJcbiAgICAgICAgICAgIGlmICggcy5jcm9zc0RvbWFpbiA9PSBudWxsICkge1xyXG4gICAgICAgICAgICAgICAgcGFydHMgPSBydXJsLmV4ZWMoIHMudXJsLnRvTG93ZXJDYXNlKCkgKTtcclxuICAgICAgICAgICAgICAgIHMuY3Jvc3NEb21haW4gPSAhISggcGFydHMgJiZcclxuICAgICAgICAgICAgICAgICggcGFydHNbIDEgXSAhPT0gYWpheExvY1BhcnRzWyAxIF0gfHwgcGFydHNbIDIgXSAhPT0gYWpheExvY1BhcnRzWyAyIF0gfHxcclxuICAgICAgICAgICAgICAgICggcGFydHNbIDMgXSB8fCAoIHBhcnRzWyAxIF0gPT09IFwiaHR0cDpcIiA/IFwiODBcIiA6IFwiNDQzXCIgKSApICE9PVxyXG4gICAgICAgICAgICAgICAgKCBhamF4TG9jUGFydHNbIDMgXSB8fCAoIGFqYXhMb2NQYXJ0c1sgMSBdID09PSBcImh0dHA6XCIgPyBcIjgwXCIgOiBcIjQ0M1wiICkgKSApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDb252ZXJ0IGRhdGEgaWYgbm90IGFscmVhZHkgYSBzdHJpbmdcclxuICAgICAgICAgICAgaWYgKCBzLmRhdGEgJiYgcy5wcm9jZXNzRGF0YSAmJiB0eXBlb2Ygcy5kYXRhICE9PSBcInN0cmluZ1wiICkge1xyXG4gICAgICAgICAgICAgICAgcy5kYXRhID0galF1ZXJ5LnBhcmFtKCBzLmRhdGEsIHMudHJhZGl0aW9uYWwgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQXBwbHkgcHJlZmlsdGVyc1xyXG4gICAgICAgICAgICBpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyggcHJlZmlsdGVycywgcywgb3B0aW9ucywganFYSFIgKTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHJlcXVlc3Qgd2FzIGFib3J0ZWQgaW5zaWRlIGEgcHJlZmlsdGVyLCBzdG9wIHRoZXJlXHJcbiAgICAgICAgICAgIGlmICggc3RhdGUgPT09IDIgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ganFYSFI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFdlIGNhbiBmaXJlIGdsb2JhbCBldmVudHMgYXMgb2Ygbm93IGlmIGFza2VkIHRvXHJcbiAgICAgICAgICAgIC8vIERvbid0IGZpcmUgZXZlbnRzIGlmIGpRdWVyeS5ldmVudCBpcyB1bmRlZmluZWQgaW4gYW4gQU1ELXVzYWdlIHNjZW5hcmlvICgjMTUxMTgpXHJcbiAgICAgICAgICAgIGZpcmVHbG9iYWxzID0galF1ZXJ5LmV2ZW50ICYmIHMuZ2xvYmFsO1xyXG5cclxuICAgICAgICAgICAgLy8gV2F0Y2ggZm9yIGEgbmV3IHNldCBvZiByZXF1ZXN0c1xyXG4gICAgICAgICAgICBpZiAoIGZpcmVHbG9iYWxzICYmIGpRdWVyeS5hY3RpdmUrKyA9PT0gMCApIHtcclxuICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC50cmlnZ2VyKFwiYWpheFN0YXJ0XCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBVcHBlcmNhc2UgdGhlIHR5cGVcclxuICAgICAgICAgICAgcy50eXBlID0gcy50eXBlLnRvVXBwZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBEZXRlcm1pbmUgaWYgcmVxdWVzdCBoYXMgY29udGVudFxyXG4gICAgICAgICAgICBzLmhhc0NvbnRlbnQgPSAhcm5vQ29udGVudC50ZXN0KCBzLnR5cGUgKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNhdmUgdGhlIFVSTCBpbiBjYXNlIHdlJ3JlIHRveWluZyB3aXRoIHRoZSBJZi1Nb2RpZmllZC1TaW5jZVxyXG4gICAgICAgICAgICAvLyBhbmQvb3IgSWYtTm9uZS1NYXRjaCBoZWFkZXIgbGF0ZXIgb25cclxuICAgICAgICAgICAgY2FjaGVVUkwgPSBzLnVybDtcclxuXHJcbiAgICAgICAgICAgIC8vIE1vcmUgb3B0aW9ucyBoYW5kbGluZyBmb3IgcmVxdWVzdHMgd2l0aCBubyBjb250ZW50XHJcbiAgICAgICAgICAgIGlmICggIXMuaGFzQ29udGVudCApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBkYXRhIGlzIGF2YWlsYWJsZSwgYXBwZW5kIGRhdGEgdG8gdXJsXHJcbiAgICAgICAgICAgICAgICBpZiAoIHMuZGF0YSApIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWNoZVVSTCA9ICggcy51cmwgKz0gKCBycXVlcnkudGVzdCggY2FjaGVVUkwgKSA/IFwiJlwiIDogXCI/XCIgKSArIHMuZGF0YSApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICM5NjgyOiByZW1vdmUgZGF0YSBzbyB0aGF0IGl0J3Mgbm90IHVzZWQgaW4gYW4gZXZlbnR1YWwgcmV0cnlcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcy5kYXRhO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFkZCBhbnRpLWNhY2hlIGluIHVybCBpZiBuZWVkZWRcclxuICAgICAgICAgICAgICAgIGlmICggcy5jYWNoZSA9PT0gZmFsc2UgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcy51cmwgPSBydHMudGVzdCggY2FjaGVVUkwgKSA/XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhbHJlYWR5IGEgJ18nIHBhcmFtZXRlciwgc2V0IGl0cyB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWNoZVVSTC5yZXBsYWNlKCBydHMsIFwiJDFfPVwiICsgbm9uY2UrKyApIDpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSBhZGQgb25lIHRvIHRoZSBlbmRcclxuICAgICAgICAgICAgICAgICAgICBjYWNoZVVSTCArICggcnF1ZXJ5LnRlc3QoIGNhY2hlVVJMICkgPyBcIiZcIiA6IFwiP1wiICkgKyBcIl89XCIgKyBub25jZSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgdGhlIElmLU1vZGlmaWVkLVNpbmNlIGFuZC9vciBJZi1Ob25lLU1hdGNoIGhlYWRlciwgaWYgaW4gaWZNb2RpZmllZCBtb2RlLlxyXG4gICAgICAgICAgICBpZiAoIHMuaWZNb2RpZmllZCApIHtcclxuICAgICAgICAgICAgICAgIGlmICggalF1ZXJ5Lmxhc3RNb2RpZmllZFsgY2FjaGVVUkwgXSApIHtcclxuICAgICAgICAgICAgICAgICAgICBqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBcIklmLU1vZGlmaWVkLVNpbmNlXCIsIGpRdWVyeS5sYXN0TW9kaWZpZWRbIGNhY2hlVVJMIF0gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICggalF1ZXJ5LmV0YWdbIGNhY2hlVVJMIF0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAganFYSFIuc2V0UmVxdWVzdEhlYWRlciggXCJJZi1Ob25lLU1hdGNoXCIsIGpRdWVyeS5ldGFnWyBjYWNoZVVSTCBdICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFNldCB0aGUgY29ycmVjdCBoZWFkZXIsIGlmIGRhdGEgaXMgYmVpbmcgc2VudFxyXG4gICAgICAgICAgICBpZiAoIHMuZGF0YSAmJiBzLmhhc0NvbnRlbnQgJiYgcy5jb250ZW50VHlwZSAhPT0gZmFsc2UgfHwgb3B0aW9ucy5jb250ZW50VHlwZSApIHtcclxuICAgICAgICAgICAgICAgIGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoIFwiQ29udGVudC1UeXBlXCIsIHMuY29udGVudFR5cGUgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU2V0IHRoZSBBY2NlcHRzIGhlYWRlciBmb3IgdGhlIHNlcnZlciwgZGVwZW5kaW5nIG9uIHRoZSBkYXRhVHlwZVxyXG4gICAgICAgICAgICBqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKFxyXG4gICAgICAgICAgICAgICAgXCJBY2NlcHRcIixcclxuICAgICAgICAgICAgICAgIHMuZGF0YVR5cGVzWyAwIF0gJiYgcy5hY2NlcHRzWyBzLmRhdGFUeXBlc1swXSBdID9cclxuICAgICAgICAgICAgICAgIHMuYWNjZXB0c1sgcy5kYXRhVHlwZXNbMF0gXSArICggcy5kYXRhVHlwZXNbIDAgXSAhPT0gXCIqXCIgPyBcIiwgXCIgKyBhbGxUeXBlcyArIFwiOyBxPTAuMDFcIiA6IFwiXCIgKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgcy5hY2NlcHRzWyBcIipcIiBdXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBmb3IgaGVhZGVycyBvcHRpb25cclxuICAgICAgICAgICAgZm9yICggaSBpbiBzLmhlYWRlcnMgKSB7XHJcbiAgICAgICAgICAgICAgICBqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBpLCBzLmhlYWRlcnNbIGkgXSApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBBbGxvdyBjdXN0b20gaGVhZGVycy9taW1ldHlwZXMgYW5kIGVhcmx5IGFib3J0XHJcbiAgICAgICAgICAgIGlmICggcy5iZWZvcmVTZW5kICYmICggcy5iZWZvcmVTZW5kLmNhbGwoIGNhbGxiYWNrQ29udGV4dCwganFYSFIsIHMgKSA9PT0gZmFsc2UgfHwgc3RhdGUgPT09IDIgKSApIHtcclxuICAgICAgICAgICAgICAgIC8vIEFib3J0IGlmIG5vdCBkb25lIGFscmVhZHkgYW5kIHJldHVyblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGpxWEhSLmFib3J0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGFib3J0aW5nIGlzIG5vIGxvbmdlciBhIGNhbmNlbGxhdGlvblxyXG4gICAgICAgICAgICBzdHJBYm9ydCA9IFwiYWJvcnRcIjtcclxuXHJcbiAgICAgICAgICAgIC8vIEluc3RhbGwgY2FsbGJhY2tzIG9uIGRlZmVycmVkc1xyXG4gICAgICAgICAgICBmb3IgKCBpIGluIHsgc3VjY2VzczogMSwgZXJyb3I6IDEsIGNvbXBsZXRlOiAxIH0gKSB7XHJcbiAgICAgICAgICAgICAgICBqcVhIUlsgaSBdKCBzWyBpIF0gKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gR2V0IHRyYW5zcG9ydFxyXG4gICAgICAgICAgICB0cmFuc3BvcnQgPSBpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyggdHJhbnNwb3J0cywgcywgb3B0aW9ucywganFYSFIgKTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIG5vIHRyYW5zcG9ydCwgd2UgYXV0by1hYm9ydFxyXG4gICAgICAgICAgICBpZiAoICF0cmFuc3BvcnQgKSB7XHJcbiAgICAgICAgICAgICAgICBkb25lKCAtMSwgXCJObyBUcmFuc3BvcnRcIiApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAganFYSFIucmVhZHlTdGF0ZSA9IDE7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2VuZCBnbG9iYWwgZXZlbnRcclxuICAgICAgICAgICAgICAgIGlmICggZmlyZUdsb2JhbHMgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsRXZlbnRDb250ZXh0LnRyaWdnZXIoIFwiYWpheFNlbmRcIiwgWyBqcVhIUiwgcyBdICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBUaW1lb3V0XHJcbiAgICAgICAgICAgICAgICBpZiAoIHMuYXN5bmMgJiYgcy50aW1lb3V0ID4gMCApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqcVhIUi5hYm9ydChcInRpbWVvdXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgcy50aW1lb3V0ICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0LnNlbmQoIHJlcXVlc3RIZWFkZXJzLCBkb25lICk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoICggZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBQcm9wYWdhdGUgZXhjZXB0aW9uIGFzIGVycm9yIGlmIG5vdCBkb25lXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBzdGF0ZSA8IDIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoIC0xLCBlICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpbXBseSByZXRocm93IG90aGVyd2lzZVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDYWxsYmFjayBmb3Igd2hlbiBldmVyeXRoaW5nIGlzIGRvbmVcclxuICAgICAgICAgICAgZnVuY3Rpb24gZG9uZSggc3RhdHVzLCBuYXRpdmVTdGF0dXNUZXh0LCByZXNwb25zZXMsIGhlYWRlcnMgKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNTdWNjZXNzLCBzdWNjZXNzLCBlcnJvciwgcmVzcG9uc2UsIG1vZGlmaWVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQgPSBuYXRpdmVTdGF0dXNUZXh0O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENhbGxlZCBvbmNlXHJcbiAgICAgICAgICAgICAgICBpZiAoIHN0YXRlID09PSAyICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdGF0ZSBpcyBcImRvbmVcIiBub3dcclxuICAgICAgICAgICAgICAgIHN0YXRlID0gMjtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDbGVhciB0aW1lb3V0IGlmIGl0IGV4aXN0c1xyXG4gICAgICAgICAgICAgICAgaWYgKCB0aW1lb3V0VGltZXIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KCB0aW1lb3V0VGltZXIgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEZXJlZmVyZW5jZSB0cmFuc3BvcnQgZm9yIGVhcmx5IGdhcmJhZ2UgY29sbGVjdGlvblxyXG4gICAgICAgICAgICAgICAgLy8gKG5vIG1hdHRlciBob3cgbG9uZyB0aGUganFYSFIgb2JqZWN0IHdpbGwgYmUgdXNlZClcclxuICAgICAgICAgICAgICAgIHRyYW5zcG9ydCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDYWNoZSByZXNwb25zZSBoZWFkZXJzXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZUhlYWRlcnNTdHJpbmcgPSBoZWFkZXJzIHx8IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2V0IHJlYWR5U3RhdGVcclxuICAgICAgICAgICAgICAgIGpxWEhSLnJlYWR5U3RhdGUgPSBzdGF0dXMgPiAwID8gNCA6IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIGlmIHN1Y2Nlc3NmdWxcclxuICAgICAgICAgICAgICAgIGlzU3VjY2VzcyA9IHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwIHx8IHN0YXR1cyA9PT0gMzA0O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEdldCByZXNwb25zZSBkYXRhXHJcbiAgICAgICAgICAgICAgICBpZiAoIHJlc3BvbnNlcyApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IGFqYXhIYW5kbGVSZXNwb25zZXMoIHMsIGpxWEhSLCByZXNwb25zZXMgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDb252ZXJ0IG5vIG1hdHRlciB3aGF0ICh0aGF0IHdheSByZXNwb25zZVhYWCBmaWVsZHMgYXJlIGFsd2F5cyBzZXQpXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZSA9IGFqYXhDb252ZXJ0KCBzLCByZXNwb25zZSwganFYSFIsIGlzU3VjY2VzcyApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHN1Y2Nlc3NmdWwsIGhhbmRsZSB0eXBlIGNoYWluaW5nXHJcbiAgICAgICAgICAgICAgICBpZiAoIGlzU3VjY2VzcyApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHRoZSBJZi1Nb2RpZmllZC1TaW5jZSBhbmQvb3IgSWYtTm9uZS1NYXRjaCBoZWFkZXIsIGlmIGluIGlmTW9kaWZpZWQgbW9kZS5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIHMuaWZNb2RpZmllZCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWQgPSBqcVhIUi5nZXRSZXNwb25zZUhlYWRlcihcIkxhc3QtTW9kaWZpZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbW9kaWZpZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkubGFzdE1vZGlmaWVkWyBjYWNoZVVSTCBdID0gbW9kaWZpZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWQgPSBqcVhIUi5nZXRSZXNwb25zZUhlYWRlcihcImV0YWdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbW9kaWZpZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZXRhZ1sgY2FjaGVVUkwgXSA9IG1vZGlmaWVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBubyBjb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBzdGF0dXMgPT09IDIwNCB8fCBzLnR5cGUgPT09IFwiSEVBRFwiICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0ID0gXCJub2NvbnRlbnRcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIG5vdCBtb2RpZmllZFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIHN0YXR1cyA9PT0gMzA0ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0ID0gXCJub3Rtb2RpZmllZFwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSBkYXRhLCBsZXQncyBjb252ZXJ0IGl0XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSByZXNwb25zZS5lcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTdWNjZXNzID0gIWVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgZXh0cmFjdCBlcnJvciBmcm9tIHN0YXR1c1RleHRcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGVuIG5vcm1hbGl6ZSBzdGF0dXNUZXh0IGFuZCBzdGF0dXMgZm9yIG5vbi1hYm9ydHNcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHN0YXR1c1RleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBzdGF0dXMgfHwgIXN0YXR1c1RleHQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQgPSBcImVycm9yXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggc3RhdHVzIDwgMCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2V0IGRhdGEgZm9yIHRoZSBmYWtlIHhociBvYmplY3RcclxuICAgICAgICAgICAgICAgIGpxWEhSLnN0YXR1cyA9IHN0YXR1cztcclxuICAgICAgICAgICAgICAgIGpxWEhSLnN0YXR1c1RleHQgPSAoIG5hdGl2ZVN0YXR1c1RleHQgfHwgc3RhdHVzVGV4dCApICsgXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdWNjZXNzL0Vycm9yXHJcbiAgICAgICAgICAgICAgICBpZiAoIGlzU3VjY2VzcyApIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCggY2FsbGJhY2tDb250ZXh0LCBbIHN1Y2Nlc3MsIHN0YXR1c1RleHQsIGpxWEhSIF0gKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0V2l0aCggY2FsbGJhY2tDb250ZXh0LCBbIGpxWEhSLCBzdGF0dXNUZXh0LCBlcnJvciBdICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU3RhdHVzLWRlcGVuZGVudCBjYWxsYmFja3NcclxuICAgICAgICAgICAgICAgIGpxWEhSLnN0YXR1c0NvZGUoIHN0YXR1c0NvZGUgKTtcclxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGUgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCBmaXJlR2xvYmFscyApIHtcclxuICAgICAgICAgICAgICAgICAgICBnbG9iYWxFdmVudENvbnRleHQudHJpZ2dlciggaXNTdWNjZXNzID8gXCJhamF4U3VjY2Vzc1wiIDogXCJhamF4RXJyb3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgWyBqcVhIUiwgcywgaXNTdWNjZXNzID8gc3VjY2VzcyA6IGVycm9yIF0gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDb21wbGV0ZVxyXG4gICAgICAgICAgICAgICAgY29tcGxldGVEZWZlcnJlZC5maXJlV2l0aCggY2FsbGJhY2tDb250ZXh0LCBbIGpxWEhSLCBzdGF0dXNUZXh0IF0gKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIGZpcmVHbG9iYWxzICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbEV2ZW50Q29udGV4dC50cmlnZ2VyKCBcImFqYXhDb21wbGV0ZVwiLCBbIGpxWEhSLCBzIF0gKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBIYW5kbGUgdGhlIGdsb2JhbCBBSkFYIGNvdW50ZXJcclxuICAgICAgICAgICAgICAgICAgICBpZiAoICEoIC0talF1ZXJ5LmFjdGl2ZSApICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZXZlbnQudHJpZ2dlcihcImFqYXhTdG9wXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGpxWEhSO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldEpTT046IGZ1bmN0aW9uKCB1cmwsIGRhdGEsIGNhbGxiYWNrICkge1xyXG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5LmdldCggdXJsLCBkYXRhLCBjYWxsYmFjaywgXCJqc29uXCIgKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRTY3JpcHQ6IGZ1bmN0aW9uKCB1cmwsIGNhbGxiYWNrICkge1xyXG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5LmdldCggdXJsLCB1bmRlZmluZWQsIGNhbGxiYWNrLCBcInNjcmlwdFwiICk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgalF1ZXJ5LmVhY2goIFsgXCJnZXRcIiwgXCJwb3N0XCIgXSwgZnVuY3Rpb24oIGksIG1ldGhvZCApIHtcclxuICAgICAgICBqUXVlcnlbIG1ldGhvZCBdID0gZnVuY3Rpb24oIHVybCwgZGF0YSwgY2FsbGJhY2ssIHR5cGUgKSB7XHJcbiAgICAgICAgICAgIC8vIHNoaWZ0IGFyZ3VtZW50cyBpZiBkYXRhIGFyZ3VtZW50IHdhcyBvbWl0dGVkXHJcbiAgICAgICAgICAgIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGRhdGEgKSApIHtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSB0eXBlIHx8IGNhbGxiYWNrO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5hamF4KHtcclxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogbWV0aG9kLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IHR5cGUsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogY2FsbGJhY2tcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBqUXVlcnkuX2V2YWxVcmwgPSBmdW5jdGlvbiggdXJsICkge1xyXG4gICAgICAgIHJldHVybiBqUXVlcnkuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJzY3JpcHRcIixcclxuICAgICAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgICAgICBnbG9iYWw6IGZhbHNlLFxyXG4gICAgICAgICAgICBcInRocm93c1wiOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBqUXVlcnkuZm4uZXh0ZW5kKHtcclxuICAgICAgICB3cmFwQWxsOiBmdW5jdGlvbiggaHRtbCApIHtcclxuICAgICAgICAgICAgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggaHRtbCApICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KHRoaXMpLndyYXBBbGwoIGh0bWwuY2FsbCh0aGlzLCBpKSApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICggdGhpc1swXSApIHtcclxuICAgICAgICAgICAgICAgIC8vIFRoZSBlbGVtZW50cyB0byB3cmFwIHRoZSB0YXJnZXQgYXJvdW5kXHJcbiAgICAgICAgICAgICAgICB2YXIgd3JhcCA9IGpRdWVyeSggaHRtbCwgdGhpc1swXS5vd25lckRvY3VtZW50ICkuZXEoMCkuY2xvbmUodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzWzBdLnBhcmVudE5vZGUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JhcC5pbnNlcnRCZWZvcmUoIHRoaXNbMF0gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB3cmFwLm1hcChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbSA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICggZWxlbS5maXJzdENoaWxkICYmIGVsZW0uZmlyc3RDaGlsZC5ub2RlVHlwZSA9PT0gMSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSA9IGVsZW0uZmlyc3RDaGlsZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtO1xyXG4gICAgICAgICAgICAgICAgfSkuYXBwZW5kKCB0aGlzICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHdyYXBJbm5lcjogZnVuY3Rpb24oIGh0bWwgKSB7XHJcbiAgICAgICAgICAgIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGh0bWwgKSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSh0aGlzKS53cmFwSW5uZXIoIGh0bWwuY2FsbCh0aGlzLCBpKSApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IGpRdWVyeSggdGhpcyApLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRzID0gc2VsZi5jb250ZW50cygpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggY29udGVudHMubGVuZ3RoICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRzLndyYXBBbGwoIGh0bWwgKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYXBwZW5kKCBodG1sICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHdyYXA6IGZ1bmN0aW9uKCBodG1sICkge1xyXG4gICAgICAgICAgICB2YXIgaXNGdW5jdGlvbiA9IGpRdWVyeS5pc0Z1bmN0aW9uKCBodG1sICk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuICAgICAgICAgICAgICAgIGpRdWVyeSggdGhpcyApLndyYXBBbGwoIGlzRnVuY3Rpb24gPyBodG1sLmNhbGwodGhpcywgaSkgOiBodG1sICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVud3JhcDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudCgpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoICFqUXVlcnkubm9kZU5hbWUoIHRoaXMsIFwiYm9keVwiICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCB0aGlzICkucmVwbGFjZVdpdGgoIHRoaXMuY2hpbGROb2RlcyApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5lbmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgalF1ZXJ5LmV4cHIuZmlsdGVycy5oaWRkZW4gPSBmdW5jdGlvbiggZWxlbSApIHtcclxuICAgICAgICAvLyBTdXBwb3J0OiBPcGVyYSA8PSAxMi4xMlxyXG4gICAgICAgIC8vIE9wZXJhIHJlcG9ydHMgb2Zmc2V0V2lkdGhzIGFuZCBvZmZzZXRIZWlnaHRzIGxlc3MgdGhhbiB6ZXJvIG9uIHNvbWUgZWxlbWVudHNcclxuICAgICAgICByZXR1cm4gZWxlbS5vZmZzZXRXaWR0aCA8PSAwICYmIGVsZW0ub2Zmc2V0SGVpZ2h0IDw9IDAgfHxcclxuICAgICAgICAgICAgKCFzdXBwb3J0LnJlbGlhYmxlSGlkZGVuT2Zmc2V0cygpICYmXHJcbiAgICAgICAgICAgICgoZWxlbS5zdHlsZSAmJiBlbGVtLnN0eWxlLmRpc3BsYXkpIHx8IGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiICkpID09PSBcIm5vbmVcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIGpRdWVyeS5leHByLmZpbHRlcnMudmlzaWJsZSA9IGZ1bmN0aW9uKCBlbGVtICkge1xyXG4gICAgICAgIHJldHVybiAhalF1ZXJ5LmV4cHIuZmlsdGVycy5oaWRkZW4oIGVsZW0gKTtcclxuICAgIH07XHJcblxyXG5cclxuXHJcblxyXG4gICAgdmFyIHIyMCA9IC8lMjAvZyxcclxuICAgICAgICByYnJhY2tldCA9IC9cXFtcXF0kLyxcclxuICAgICAgICByQ1JMRiA9IC9cXHI/XFxuL2csXHJcbiAgICAgICAgcnN1Ym1pdHRlclR5cGVzID0gL14oPzpzdWJtaXR8YnV0dG9ufGltYWdlfHJlc2V0fGZpbGUpJC9pLFxyXG4gICAgICAgIHJzdWJtaXR0YWJsZSA9IC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGtleWdlbikvaTtcclxuXHJcbiAgICBmdW5jdGlvbiBidWlsZFBhcmFtcyggcHJlZml4LCBvYmosIHRyYWRpdGlvbmFsLCBhZGQgKSB7XHJcbiAgICAgICAgdmFyIG5hbWU7XHJcblxyXG4gICAgICAgIGlmICggalF1ZXJ5LmlzQXJyYXkoIG9iaiApICkge1xyXG4gICAgICAgICAgICAvLyBTZXJpYWxpemUgYXJyYXkgaXRlbS5cclxuICAgICAgICAgICAgalF1ZXJ5LmVhY2goIG9iaiwgZnVuY3Rpb24oIGksIHYgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIHRyYWRpdGlvbmFsIHx8IHJicmFja2V0LnRlc3QoIHByZWZpeCApICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyZWF0IGVhY2ggYXJyYXkgaXRlbSBhcyBhIHNjYWxhci5cclxuICAgICAgICAgICAgICAgICAgICBhZGQoIHByZWZpeCwgdiApO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSXRlbSBpcyBub24tc2NhbGFyIChhcnJheSBvciBvYmplY3QpLCBlbmNvZGUgaXRzIG51bWVyaWMgaW5kZXguXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQYXJhbXMoIHByZWZpeCArIFwiW1wiICsgKCB0eXBlb2YgdiA9PT0gXCJvYmplY3RcIiA/IGkgOiBcIlwiICkgKyBcIl1cIiwgdiwgdHJhZGl0aW9uYWwsIGFkZCApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICggIXRyYWRpdGlvbmFsICYmIGpRdWVyeS50eXBlKCBvYmogKSA9PT0gXCJvYmplY3RcIiApIHtcclxuICAgICAgICAgICAgLy8gU2VyaWFsaXplIG9iamVjdCBpdGVtLlxyXG4gICAgICAgICAgICBmb3IgKCBuYW1lIGluIG9iaiApIHtcclxuICAgICAgICAgICAgICAgIGJ1aWxkUGFyYW1zKCBwcmVmaXggKyBcIltcIiArIG5hbWUgKyBcIl1cIiwgb2JqWyBuYW1lIF0sIHRyYWRpdGlvbmFsLCBhZGQgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBTZXJpYWxpemUgc2NhbGFyIGl0ZW0uXHJcbiAgICAgICAgICAgIGFkZCggcHJlZml4LCBvYmogKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4vLyBTZXJpYWxpemUgYW4gYXJyYXkgb2YgZm9ybSBlbGVtZW50cyBvciBhIHNldCBvZlxyXG4vLyBrZXkvdmFsdWVzIGludG8gYSBxdWVyeSBzdHJpbmdcclxuICAgIGpRdWVyeS5wYXJhbSA9IGZ1bmN0aW9uKCBhLCB0cmFkaXRpb25hbCApIHtcclxuICAgICAgICB2YXIgcHJlZml4LFxyXG4gICAgICAgICAgICBzID0gW10sXHJcbiAgICAgICAgICAgIGFkZCA9IGZ1bmN0aW9uKCBrZXksIHZhbHVlICkge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgdmFsdWUgaXMgYSBmdW5jdGlvbiwgaW52b2tlIGl0IGFuZCByZXR1cm4gaXRzIHZhbHVlXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApID8gdmFsdWUoKSA6ICggdmFsdWUgPT0gbnVsbCA/IFwiXCIgOiB2YWx1ZSApO1xyXG4gICAgICAgICAgICAgICAgc1sgcy5sZW5ndGggXSA9IGVuY29kZVVSSUNvbXBvbmVudCgga2V5ICkgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudCggdmFsdWUgKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gU2V0IHRyYWRpdGlvbmFsIHRvIHRydWUgZm9yIGpRdWVyeSA8PSAxLjMuMiBiZWhhdmlvci5cclxuICAgICAgICBpZiAoIHRyYWRpdGlvbmFsID09PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgIHRyYWRpdGlvbmFsID0galF1ZXJ5LmFqYXhTZXR0aW5ncyAmJiBqUXVlcnkuYWpheFNldHRpbmdzLnRyYWRpdGlvbmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgYW4gYXJyYXkgd2FzIHBhc3NlZCBpbiwgYXNzdW1lIHRoYXQgaXQgaXMgYW4gYXJyYXkgb2YgZm9ybSBlbGVtZW50cy5cclxuICAgICAgICBpZiAoIGpRdWVyeS5pc0FycmF5KCBhICkgfHwgKCBhLmpxdWVyeSAmJiAhalF1ZXJ5LmlzUGxhaW5PYmplY3QoIGEgKSApICkge1xyXG4gICAgICAgICAgICAvLyBTZXJpYWxpemUgdGhlIGZvcm0gZWxlbWVudHNcclxuICAgICAgICAgICAgalF1ZXJ5LmVhY2goIGEsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgYWRkKCB0aGlzLm5hbWUsIHRoaXMudmFsdWUgKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIElmIHRyYWRpdGlvbmFsLCBlbmNvZGUgdGhlIFwib2xkXCIgd2F5ICh0aGUgd2F5IDEuMy4yIG9yIG9sZGVyXHJcbiAgICAgICAgICAgIC8vIGRpZCBpdCksIG90aGVyd2lzZSBlbmNvZGUgcGFyYW1zIHJlY3Vyc2l2ZWx5LlxyXG4gICAgICAgICAgICBmb3IgKCBwcmVmaXggaW4gYSApIHtcclxuICAgICAgICAgICAgICAgIGJ1aWxkUGFyYW1zKCBwcmVmaXgsIGFbIHByZWZpeCBdLCB0cmFkaXRpb25hbCwgYWRkICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgcmVzdWx0aW5nIHNlcmlhbGl6YXRpb25cclxuICAgICAgICByZXR1cm4gcy5qb2luKCBcIiZcIiApLnJlcGxhY2UoIHIyMCwgXCIrXCIgKTtcclxuICAgIH07XHJcblxyXG4gICAgalF1ZXJ5LmZuLmV4dGVuZCh7XHJcbiAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5wYXJhbSggdGhpcy5zZXJpYWxpemVBcnJheSgpICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXJpYWxpemVBcnJheTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIC8vIENhbiBhZGQgcHJvcEhvb2sgZm9yIFwiZWxlbWVudHNcIiB0byBmaWx0ZXIgb3IgYWRkIGZvcm0gZWxlbWVudHNcclxuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IGpRdWVyeS5wcm9wKCB0aGlzLCBcImVsZW1lbnRzXCIgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50cyA/IGpRdWVyeS5tYWtlQXJyYXkoIGVsZW1lbnRzICkgOiB0aGlzO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHRoaXMudHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBVc2UgLmlzKFwiOmRpc2FibGVkXCIpIHNvIHRoYXQgZmllbGRzZXRbZGlzYWJsZWRdIHdvcmtzXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmFtZSAmJiAhalF1ZXJ5KCB0aGlzICkuaXMoIFwiOmRpc2FibGVkXCIgKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByc3VibWl0dGFibGUudGVzdCggdGhpcy5ub2RlTmFtZSApICYmICFyc3VibWl0dGVyVHlwZXMudGVzdCggdHlwZSApICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICggdGhpcy5jaGVja2VkIHx8ICFyY2hlY2thYmxlVHlwZS50ZXN0KCB0eXBlICkgKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uKCBpLCBlbGVtICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWwgPSBqUXVlcnkoIHRoaXMgKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbCA9PSBudWxsID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5pc0FycmF5KCB2YWwgKSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkubWFwKCB2YWwsIGZ1bmN0aW9uKCB2YWwgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgbmFtZTogZWxlbS5uYW1lLCB2YWx1ZTogdmFsLnJlcGxhY2UoIHJDUkxGLCBcIlxcclxcblwiICkgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiBlbGVtLm5hbWUsIHZhbHVlOiB2YWwucmVwbGFjZSggckNSTEYsIFwiXFxyXFxuXCIgKSB9O1xyXG4gICAgICAgICAgICAgICAgfSkuZ2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuLy8gQ3JlYXRlIHRoZSByZXF1ZXN0IG9iamVjdFxyXG4vLyAoVGhpcyBpcyBzdGlsbCBhdHRhY2hlZCB0byBhamF4U2V0dGluZ3MgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkpXHJcbiAgICBqUXVlcnkuYWpheFNldHRpbmdzLnhociA9IHdpbmRvdy5BY3RpdmVYT2JqZWN0ICE9PSB1bmRlZmluZWQgP1xyXG4gICAgICAgIC8vIFN1cHBvcnQ6IElFNitcclxuICAgICAgICBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFhIUiBjYW5ub3QgYWNjZXNzIGxvY2FsIGZpbGVzLCBhbHdheXMgdXNlIEFjdGl2ZVggZm9yIHRoYXQgY2FzZVxyXG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuaXNMb2NhbCAmJlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBTdXBwb3J0OiBJRTctOFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG9sZElFIFhIUiBkb2VzIG5vdCBzdXBwb3J0IG5vbi1SRkMyNjE2IG1ldGhvZHMgKCMxMzI0MClcclxuICAgICAgICAgICAgICAgICAgICAvLyBTZWUgaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL21zNTM2NjQ4KHY9dnMuODUpLmFzcHhcclxuICAgICAgICAgICAgICAgICAgICAvLyBhbmQgaHR0cDovL3d3dy53My5vcmcvUHJvdG9jb2xzL3JmYzI2MTYvcmZjMjYxNi1zZWM5Lmh0bWwjc2VjOVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFsdGhvdWdoIHRoaXMgY2hlY2sgZm9yIHNpeCBtZXRob2RzIGluc3RlYWQgb2YgZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICAvLyBzaW5jZSBJRSBhbHNvIGRvZXMgbm90IHN1cHBvcnQgXCJ0cmFjZVwiIGFuZCBcImNvbm5lY3RcIlxyXG4gICAgICAgICAgICAgICAgL14oZ2V0fHBvc3R8aGVhZHxwdXR8ZGVsZXRlfG9wdGlvbnMpJC9pLnRlc3QoIHRoaXMudHlwZSApICYmXHJcblxyXG4gICAgICAgICAgICAgICAgY3JlYXRlU3RhbmRhcmRYSFIoKSB8fCBjcmVhdGVBY3RpdmVYSFIoKTtcclxuICAgICAgICB9IDpcclxuICAgICAgICAvLyBGb3IgYWxsIG90aGVyIGJyb3dzZXJzLCB1c2UgdGhlIHN0YW5kYXJkIFhNTEh0dHBSZXF1ZXN0IG9iamVjdFxyXG4gICAgICAgIGNyZWF0ZVN0YW5kYXJkWEhSO1xyXG5cclxuICAgIHZhciB4aHJJZCA9IDAsXHJcbiAgICAgICAgeGhyQ2FsbGJhY2tzID0ge30sXHJcbiAgICAgICAgeGhyU3VwcG9ydGVkID0galF1ZXJ5LmFqYXhTZXR0aW5ncy54aHIoKTtcclxuXHJcbi8vIFN1cHBvcnQ6IElFPDEwXHJcbi8vIE9wZW4gcmVxdWVzdHMgbXVzdCBiZSBtYW51YWxseSBhYm9ydGVkIG9uIHVubG9hZCAoIzUyODApXHJcbi8vIFNlZSBodHRwczovL3N1cHBvcnQubWljcm9zb2Z0LmNvbS9rYi8yODU2NzQ2IGZvciBtb3JlIGluZm9cclxuICAgIGlmICggd2luZG93LmF0dGFjaEV2ZW50ICkge1xyXG4gICAgICAgIHdpbmRvdy5hdHRhY2hFdmVudCggXCJvbnVubG9hZFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZm9yICggdmFyIGtleSBpbiB4aHJDYWxsYmFja3MgKSB7XHJcbiAgICAgICAgICAgICAgICB4aHJDYWxsYmFja3NbIGtleSBdKCB1bmRlZmluZWQsIHRydWUgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuLy8gRGV0ZXJtaW5lIHN1cHBvcnQgcHJvcGVydGllc1xyXG4gICAgc3VwcG9ydC5jb3JzID0gISF4aHJTdXBwb3J0ZWQgJiYgKCBcIndpdGhDcmVkZW50aWFsc1wiIGluIHhoclN1cHBvcnRlZCApO1xyXG4gICAgeGhyU3VwcG9ydGVkID0gc3VwcG9ydC5hamF4ID0gISF4aHJTdXBwb3J0ZWQ7XHJcblxyXG4vLyBDcmVhdGUgdHJhbnNwb3J0IGlmIHRoZSBicm93c2VyIGNhbiBwcm92aWRlIGFuIHhoclxyXG4gICAgaWYgKCB4aHJTdXBwb3J0ZWQgKSB7XHJcblxyXG4gICAgICAgIGpRdWVyeS5hamF4VHJhbnNwb3J0KGZ1bmN0aW9uKCBvcHRpb25zICkge1xyXG4gICAgICAgICAgICAvLyBDcm9zcyBkb21haW4gb25seSBhbGxvd2VkIGlmIHN1cHBvcnRlZCB0aHJvdWdoIFhNTEh0dHBSZXF1ZXN0XHJcbiAgICAgICAgICAgIGlmICggIW9wdGlvbnMuY3Jvc3NEb21haW4gfHwgc3VwcG9ydC5jb3JzICkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjYWxsYmFjaztcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbmQ6IGZ1bmN0aW9uKCBoZWFkZXJzLCBjb21wbGV0ZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHIgPSBvcHRpb25zLnhocigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSArK3hocklkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3BlbiB0aGUgc29ja2V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhoci5vcGVuKCBvcHRpb25zLnR5cGUsIG9wdGlvbnMudXJsLCBvcHRpb25zLmFzeW5jLCBvcHRpb25zLnVzZXJuYW1lLCBvcHRpb25zLnBhc3N3b3JkICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBcHBseSBjdXN0b20gZmllbGRzIGlmIHByb3ZpZGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggb3B0aW9ucy54aHJGaWVsZHMgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKCBpIGluIG9wdGlvbnMueGhyRmllbGRzICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhoclsgaSBdID0gb3B0aW9ucy54aHJGaWVsZHNbIGkgXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3ZlcnJpZGUgbWltZSB0eXBlIGlmIG5lZWRlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIG9wdGlvbnMubWltZVR5cGUgJiYgeGhyLm92ZXJyaWRlTWltZVR5cGUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHIub3ZlcnJpZGVNaW1lVHlwZSggb3B0aW9ucy5taW1lVHlwZSApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBYLVJlcXVlc3RlZC1XaXRoIGhlYWRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGb3IgY3Jvc3MtZG9tYWluIHJlcXVlc3RzLCBzZWVpbmcgYXMgY29uZGl0aW9ucyBmb3IgYSBwcmVmbGlnaHQgYXJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFraW4gdG8gYSBqaWdzYXcgcHV6emxlLCB3ZSBzaW1wbHkgbmV2ZXIgc2V0IGl0IHRvIGJlIHN1cmUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIChpdCBjYW4gYWx3YXlzIGJlIHNldCBvbiBhIHBlci1yZXF1ZXN0IGJhc2lzIG9yIGV2ZW4gdXNpbmcgYWpheFNldHVwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGb3Igc2FtZS1kb21haW4gcmVxdWVzdHMsIHdvbid0IGNoYW5nZSBoZWFkZXIgaWYgYWxyZWFkeSBwcm92aWRlZC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAhb3B0aW9ucy5jcm9zc0RvbWFpbiAmJiAhaGVhZGVyc1tcIlgtUmVxdWVzdGVkLVdpdGhcIl0gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzW1wiWC1SZXF1ZXN0ZWQtV2l0aFwiXSA9IFwiWE1MSHR0cFJlcXVlc3RcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2V0IGhlYWRlcnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICggaSBpbiBoZWFkZXJzICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU8OVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSUUncyBBY3RpdmVYT2JqZWN0IHRocm93cyBhICdUeXBlIE1pc21hdGNoJyBleGNlcHRpb24gd2hlbiBzZXR0aW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZXF1ZXN0IGhlYWRlciB0byBhIG51bGwtdmFsdWUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVG8ga2VlcCBjb25zaXN0ZW50IHdpdGggb3RoZXIgWEhSIGltcGxlbWVudGF0aW9ucywgY2FzdCB0aGUgdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIHN0cmluZyBhbmQgaWdub3JlIGB1bmRlZmluZWRgLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBoZWFkZXJzWyBpIF0gIT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlciggaSwgaGVhZGVyc1sgaSBdICsgXCJcIiApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEbyBzZW5kIHRoZSByZXF1ZXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgbWF5IHJhaXNlIGFuIGV4Y2VwdGlvbiB3aGljaCBpcyBhY3R1YWxseVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBoYW5kbGVkIGluIGpRdWVyeS5hamF4IChzbyBubyB0cnkvY2F0Y2ggaGVyZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnNlbmQoICggb3B0aW9ucy5oYXNDb250ZW50ICYmIG9wdGlvbnMuZGF0YSApIHx8IG51bGwgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIExpc3RlbmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24oIF8sIGlzQWJvcnQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdHVzLCBzdGF0dXNUZXh0LCByZXNwb25zZXM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2FzIG5ldmVyIGNhbGxlZCBhbmQgaXMgYWJvcnRlZCBvciBjb21wbGV0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBjYWxsYmFjayAmJiAoIGlzQWJvcnQgfHwgeGhyLnJlYWR5U3RhdGUgPT09IDQgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDbGVhbiB1cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB4aHJDYWxsYmFja3NbIGlkIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGpRdWVyeS5ub29wO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBYm9ydCBtYW51YWxseSBpZiBuZWVkZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGlzQWJvcnQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggeGhyLnJlYWR5U3RhdGUgIT09IDQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHIuYWJvcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlcyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSB4aHIuc3RhdHVzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VwcG9ydDogSUU8MTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWNjZXNzaW5nIGJpbmFyeS1kYXRhIHJlc3BvbnNlVGV4dCB0aHJvd3MgYW4gZXhjZXB0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICgjMTE0MjYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggdHlwZW9mIHhoci5yZXNwb25zZVRleHQgPT09IFwic3RyaW5nXCIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZXMudGV4dCA9IHhoci5yZXNwb25zZVRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpcmVmb3ggdGhyb3dzIGFuIGV4Y2VwdGlvbiB3aGVuIGFjY2Vzc2luZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdGF0dXNUZXh0IGZvciBmYXVsdHkgY3Jvc3MtZG9tYWluIHJlcXVlc3RzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0ID0geGhyLnN0YXR1c1RleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2goIGUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBub3JtYWxpemUgd2l0aCBXZWJraXQgZ2l2aW5nIGFuIGVtcHR5IHN0YXR1c1RleHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBGaWx0ZXIgc3RhdHVzIGZvciBub24gc3RhbmRhcmQgYmVoYXZpb3JzXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgcmVxdWVzdCBpcyBsb2NhbCBhbmQgd2UgaGF2ZSBkYXRhOiBhc3N1bWUgYSBzdWNjZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIChzdWNjZXNzIHdpdGggbm8gZGF0YSB3b24ndCBnZXQgbm90aWZpZWQsIHRoYXQncyB0aGUgYmVzdCB3ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjYW4gZG8gZ2l2ZW4gY3VycmVudCBpbXBsZW1lbnRhdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggIXN0YXR1cyAmJiBvcHRpb25zLmlzTG9jYWwgJiYgIW9wdGlvbnMuY3Jvc3NEb21haW4gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSByZXNwb25zZXMudGV4dCA/IDIwMCA6IDQwNDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElFIC0gIzE0NTA6IHNvbWV0aW1lcyByZXR1cm5zIDEyMjMgd2hlbiBpdCBzaG91bGQgYmUgMjA0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIHN0YXR1cyA9PT0gMTIyMyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9IDIwNDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDYWxsIGNvbXBsZXRlIGlmIG5lZWRlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCByZXNwb25zZXMgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGUoIHN0YXR1cywgc3RhdHVzVGV4dCwgcmVzcG9uc2VzLCB4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggIW9wdGlvbnMuYXN5bmMgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB3ZSdyZSBpbiBzeW5jIG1vZGUgd2UgZmlyZSB0aGUgY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIHhoci5yZWFkeVN0YXRlID09PSA0ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gKElFNiAmIElFNykgaWYgaXQncyBpbiBjYWNoZSBhbmQgaGFzIGJlZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJldHJpZXZlZCBkaXJlY3RseSB3ZSBuZWVkIHRvIGZpcmUgdGhlIGNhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCBjYWxsYmFjayApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHRvIHRoZSBsaXN0IG9mIGFjdGl2ZSB4aHIgY2FsbGJhY2tzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0geGhyQ2FsbGJhY2tzWyBpZCBdID0gY2FsbGJhY2s7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhYm9ydDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggY2FsbGJhY2sgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayggdW5kZWZpbmVkLCB0cnVlICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4vLyBGdW5jdGlvbnMgdG8gY3JlYXRlIHhocnNcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVN0YW5kYXJkWEhSKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgfSBjYXRjaCggZSApIHt9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQWN0aXZlWEhSKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93LkFjdGl2ZVhPYmplY3QoIFwiTWljcm9zb2Z0LlhNTEhUVFBcIiApO1xyXG4gICAgICAgIH0gY2F0Y2goIGUgKSB7fVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuLy8gSW5zdGFsbCBzY3JpcHQgZGF0YVR5cGVcclxuICAgIGpRdWVyeS5hamF4U2V0dXAoe1xyXG4gICAgICAgIGFjY2VwdHM6IHtcclxuICAgICAgICAgICAgc2NyaXB0OiBcInRleHQvamF2YXNjcmlwdCwgYXBwbGljYXRpb24vamF2YXNjcmlwdCwgYXBwbGljYXRpb24vZWNtYXNjcmlwdCwgYXBwbGljYXRpb24veC1lY21hc2NyaXB0XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbnRlbnRzOiB7XHJcbiAgICAgICAgICAgIHNjcmlwdDogLyg/OmphdmF8ZWNtYSlzY3JpcHQvXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb252ZXJ0ZXJzOiB7XHJcbiAgICAgICAgICAgIFwidGV4dCBzY3JpcHRcIjogZnVuY3Rpb24oIHRleHQgKSB7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkuZ2xvYmFsRXZhbCggdGV4dCApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbi8vIEhhbmRsZSBjYWNoZSdzIHNwZWNpYWwgY2FzZSBhbmQgZ2xvYmFsXHJcbiAgICBqUXVlcnkuYWpheFByZWZpbHRlciggXCJzY3JpcHRcIiwgZnVuY3Rpb24oIHMgKSB7XHJcbiAgICAgICAgaWYgKCBzLmNhY2hlID09PSB1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgIHMuY2FjaGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBzLmNyb3NzRG9tYWluICkge1xyXG4gICAgICAgICAgICBzLnR5cGUgPSBcIkdFVFwiO1xyXG4gICAgICAgICAgICBzLmdsb2JhbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuLy8gQmluZCBzY3JpcHQgdGFnIGhhY2sgdHJhbnNwb3J0XHJcbiAgICBqUXVlcnkuYWpheFRyYW5zcG9ydCggXCJzY3JpcHRcIiwgZnVuY3Rpb24ocykge1xyXG5cclxuICAgICAgICAvLyBUaGlzIHRyYW5zcG9ydCBvbmx5IGRlYWxzIHdpdGggY3Jvc3MgZG9tYWluIHJlcXVlc3RzXHJcbiAgICAgICAgaWYgKCBzLmNyb3NzRG9tYWluICkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHNjcmlwdCxcclxuICAgICAgICAgICAgICAgIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGpRdWVyeShcImhlYWRcIilbMF0gfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgICAgICAgICBzZW5kOiBmdW5jdGlvbiggXywgY2FsbGJhY2sgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggcy5zY3JpcHRDaGFyc2V0ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JpcHQuY2hhcnNldCA9IHMuc2NyaXB0Q2hhcnNldDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdC5zcmMgPSBzLnVybDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQXR0YWNoIGhhbmRsZXJzIGZvciBhbGwgYnJvd3NlcnNcclxuICAgICAgICAgICAgICAgICAgICBzY3JpcHQub25sb2FkID0gc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCBfLCBpc0Fib3J0ICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBpc0Fib3J0IHx8ICFzY3JpcHQucmVhZHlTdGF0ZSB8fCAvbG9hZGVkfGNvbXBsZXRlLy50ZXN0KCBzY3JpcHQucmVhZHlTdGF0ZSApICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBtZW1vcnkgbGVhayBpbiBJRVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NyaXB0Lm9ubG9hZCA9IHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgc2NyaXB0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHNjcmlwdC5wYXJlbnROb2RlICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBzY3JpcHQgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEZXJlZmVyZW5jZSB0aGUgc2NyaXB0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JpcHQgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENhbGxiYWNrIGlmIG5vdCBhYm9ydFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAhaXNBYm9ydCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayggMjAwLCBcInN1Y2Nlc3NcIiApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2lyY3VtdmVudCBJRTYgYnVncyB3aXRoIGJhc2UgZWxlbWVudHMgKCMyNzA5IGFuZCAjNDM3OCkgYnkgcHJlcGVuZGluZ1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFVzZSBuYXRpdmUgRE9NIG1hbmlwdWxhdGlvbiB0byBhdm9pZCBvdXIgZG9tTWFuaXAgQUpBWCB0cmlja2VyeVxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWQuaW5zZXJ0QmVmb3JlKCBzY3JpcHQsIGhlYWQuZmlyc3RDaGlsZCApO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBhYm9ydDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBzY3JpcHQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcmlwdC5vbmxvYWQoIHVuZGVmaW5lZCwgdHJ1ZSApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxuXHJcbiAgICB2YXIgb2xkQ2FsbGJhY2tzID0gW10sXHJcbiAgICAgICAgcmpzb25wID0gLyg9KVxcPyg/PSZ8JCl8XFw/XFw/LztcclxuXHJcbi8vIERlZmF1bHQganNvbnAgc2V0dGluZ3NcclxuICAgIGpRdWVyeS5hamF4U2V0dXAoe1xyXG4gICAgICAgIGpzb25wOiBcImNhbGxiYWNrXCIsXHJcbiAgICAgICAganNvbnBDYWxsYmFjazogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IG9sZENhbGxiYWNrcy5wb3AoKSB8fCAoIGpRdWVyeS5leHBhbmRvICsgXCJfXCIgKyAoIG5vbmNlKysgKSApO1xyXG4gICAgICAgICAgICB0aGlzWyBjYWxsYmFjayBdID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuLy8gRGV0ZWN0LCBub3JtYWxpemUgb3B0aW9ucyBhbmQgaW5zdGFsbCBjYWxsYmFja3MgZm9yIGpzb25wIHJlcXVlc3RzXHJcbiAgICBqUXVlcnkuYWpheFByZWZpbHRlciggXCJqc29uIGpzb25wXCIsIGZ1bmN0aW9uKCBzLCBvcmlnaW5hbFNldHRpbmdzLCBqcVhIUiApIHtcclxuXHJcbiAgICAgICAgdmFyIGNhbGxiYWNrTmFtZSwgb3ZlcndyaXR0ZW4sIHJlc3BvbnNlQ29udGFpbmVyLFxyXG4gICAgICAgICAgICBqc29uUHJvcCA9IHMuanNvbnAgIT09IGZhbHNlICYmICggcmpzb25wLnRlc3QoIHMudXJsICkgP1xyXG4gICAgICAgICAgICAgICAgICAgIFwidXJsXCIgOlxyXG4gICAgICAgICAgICAgICAgdHlwZW9mIHMuZGF0YSA9PT0gXCJzdHJpbmdcIiAmJiAhKCBzLmNvbnRlbnRUeXBlIHx8IFwiXCIgKS5pbmRleE9mKFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpICYmIHJqc29ucC50ZXN0KCBzLmRhdGEgKSAmJiBcImRhdGFcIlxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gSGFuZGxlIGlmZiB0aGUgZXhwZWN0ZWQgZGF0YSB0eXBlIGlzIFwianNvbnBcIiBvciB3ZSBoYXZlIGEgcGFyYW1ldGVyIHRvIHNldFxyXG4gICAgICAgIGlmICgganNvblByb3AgfHwgcy5kYXRhVHlwZXNbIDAgXSA9PT0gXCJqc29ucFwiICkge1xyXG5cclxuICAgICAgICAgICAgLy8gR2V0IGNhbGxiYWNrIG5hbWUsIHJlbWVtYmVyaW5nIHByZWV4aXN0aW5nIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCBpdFxyXG4gICAgICAgICAgICBjYWxsYmFja05hbWUgPSBzLmpzb25wQ2FsbGJhY2sgPSBqUXVlcnkuaXNGdW5jdGlvbiggcy5qc29ucENhbGxiYWNrICkgP1xyXG4gICAgICAgICAgICAgICAgcy5qc29ucENhbGxiYWNrKCkgOlxyXG4gICAgICAgICAgICAgICAgcy5qc29ucENhbGxiYWNrO1xyXG5cclxuICAgICAgICAgICAgLy8gSW5zZXJ0IGNhbGxiYWNrIGludG8gdXJsIG9yIGZvcm0gZGF0YVxyXG4gICAgICAgICAgICBpZiAoIGpzb25Qcm9wICkge1xyXG4gICAgICAgICAgICAgICAgc1sganNvblByb3AgXSA9IHNbIGpzb25Qcm9wIF0ucmVwbGFjZSggcmpzb25wLCBcIiQxXCIgKyBjYWxsYmFja05hbWUgKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICggcy5qc29ucCAhPT0gZmFsc2UgKSB7XHJcbiAgICAgICAgICAgICAgICBzLnVybCArPSAoIHJxdWVyeS50ZXN0KCBzLnVybCApID8gXCImXCIgOiBcIj9cIiApICsgcy5qc29ucCArIFwiPVwiICsgY2FsbGJhY2tOYW1lO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBVc2UgZGF0YSBjb252ZXJ0ZXIgdG8gcmV0cmlldmUganNvbiBhZnRlciBzY3JpcHQgZXhlY3V0aW9uXHJcbiAgICAgICAgICAgIHMuY29udmVydGVyc1tcInNjcmlwdCBqc29uXCJdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoICFyZXNwb25zZUNvbnRhaW5lciApIHtcclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZXJyb3IoIGNhbGxiYWNrTmFtZSArIFwiIHdhcyBub3QgY2FsbGVkXCIgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZUNvbnRhaW5lclsgMCBdO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gZm9yY2UganNvbiBkYXRhVHlwZVxyXG4gICAgICAgICAgICBzLmRhdGFUeXBlc1sgMCBdID0gXCJqc29uXCI7XHJcblxyXG4gICAgICAgICAgICAvLyBJbnN0YWxsIGNhbGxiYWNrXHJcbiAgICAgICAgICAgIG92ZXJ3cml0dGVuID0gd2luZG93WyBjYWxsYmFja05hbWUgXTtcclxuICAgICAgICAgICAgd2luZG93WyBjYWxsYmFja05hbWUgXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VDb250YWluZXIgPSBhcmd1bWVudHM7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyBDbGVhbi11cCBmdW5jdGlvbiAoZmlyZXMgYWZ0ZXIgY29udmVydGVycylcclxuICAgICAgICAgICAganFYSFIuYWx3YXlzKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVzdG9yZSBwcmVleGlzdGluZyB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgd2luZG93WyBjYWxsYmFja05hbWUgXSA9IG92ZXJ3cml0dGVuO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNhdmUgYmFjayBhcyBmcmVlXHJcbiAgICAgICAgICAgICAgICBpZiAoIHNbIGNhbGxiYWNrTmFtZSBdICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHJlLXVzaW5nIHRoZSBvcHRpb25zIGRvZXNuJ3Qgc2NyZXcgdGhpbmdzIGFyb3VuZFxyXG4gICAgICAgICAgICAgICAgICAgIHMuanNvbnBDYWxsYmFjayA9IG9yaWdpbmFsU2V0dGluZ3MuanNvbnBDYWxsYmFjaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2F2ZSB0aGUgY2FsbGJhY2sgbmFtZSBmb3IgZnV0dXJlIHVzZVxyXG4gICAgICAgICAgICAgICAgICAgIG9sZENhbGxiYWNrcy5wdXNoKCBjYWxsYmFja05hbWUgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDYWxsIGlmIGl0IHdhcyBhIGZ1bmN0aW9uIGFuZCB3ZSBoYXZlIGEgcmVzcG9uc2VcclxuICAgICAgICAgICAgICAgIGlmICggcmVzcG9uc2VDb250YWluZXIgJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIG92ZXJ3cml0dGVuICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcndyaXR0ZW4oIHJlc3BvbnNlQ29udGFpbmVyWyAwIF0gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZUNvbnRhaW5lciA9IG92ZXJ3cml0dGVuID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIERlbGVnYXRlIHRvIHNjcmlwdFxyXG4gICAgICAgICAgICByZXR1cm4gXCJzY3JpcHRcIjtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxuXHJcbi8vIGRhdGE6IHN0cmluZyBvZiBodG1sXHJcbi8vIGNvbnRleHQgKG9wdGlvbmFsKTogSWYgc3BlY2lmaWVkLCB0aGUgZnJhZ21lbnQgd2lsbCBiZSBjcmVhdGVkIGluIHRoaXMgY29udGV4dCwgZGVmYXVsdHMgdG8gZG9jdW1lbnRcclxuLy8ga2VlcFNjcmlwdHMgKG9wdGlvbmFsKTogSWYgdHJ1ZSwgd2lsbCBpbmNsdWRlIHNjcmlwdHMgcGFzc2VkIGluIHRoZSBodG1sIHN0cmluZ1xyXG4gICAgalF1ZXJ5LnBhcnNlSFRNTCA9IGZ1bmN0aW9uKCBkYXRhLCBjb250ZXh0LCBrZWVwU2NyaXB0cyApIHtcclxuICAgICAgICBpZiAoICFkYXRhIHx8IHR5cGVvZiBkYXRhICE9PSBcInN0cmluZ1wiICkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCB0eXBlb2YgY29udGV4dCA9PT0gXCJib29sZWFuXCIgKSB7XHJcbiAgICAgICAgICAgIGtlZXBTY3JpcHRzID0gY29udGV4dDtcclxuICAgICAgICAgICAgY29udGV4dCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb250ZXh0ID0gY29udGV4dCB8fCBkb2N1bWVudDtcclxuXHJcbiAgICAgICAgdmFyIHBhcnNlZCA9IHJzaW5nbGVUYWcuZXhlYyggZGF0YSApLFxyXG4gICAgICAgICAgICBzY3JpcHRzID0gIWtlZXBTY3JpcHRzICYmIFtdO1xyXG5cclxuICAgICAgICAvLyBTaW5nbGUgdGFnXHJcbiAgICAgICAgaWYgKCBwYXJzZWQgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbIGNvbnRleHQuY3JlYXRlRWxlbWVudCggcGFyc2VkWzFdICkgXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBhcnNlZCA9IGpRdWVyeS5idWlsZEZyYWdtZW50KCBbIGRhdGEgXSwgY29udGV4dCwgc2NyaXB0cyApO1xyXG5cclxuICAgICAgICBpZiAoIHNjcmlwdHMgJiYgc2NyaXB0cy5sZW5ndGggKSB7XHJcbiAgICAgICAgICAgIGpRdWVyeSggc2NyaXB0cyApLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGpRdWVyeS5tZXJnZSggW10sIHBhcnNlZC5jaGlsZE5vZGVzICk7XHJcbiAgICB9O1xyXG5cclxuXHJcbi8vIEtlZXAgYSBjb3B5IG9mIHRoZSBvbGQgbG9hZCBtZXRob2RcclxuICAgIHZhciBfbG9hZCA9IGpRdWVyeS5mbi5sb2FkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZCBhIHVybCBpbnRvIGEgcGFnZVxyXG4gICAgICovXHJcbiAgICBqUXVlcnkuZm4ubG9hZCA9IGZ1bmN0aW9uKCB1cmwsIHBhcmFtcywgY2FsbGJhY2sgKSB7XHJcbiAgICAgICAgaWYgKCB0eXBlb2YgdXJsICE9PSBcInN0cmluZ1wiICYmIF9sb2FkICkge1xyXG4gICAgICAgICAgICByZXR1cm4gX2xvYWQuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHNlbGVjdG9yLCByZXNwb25zZSwgdHlwZSxcclxuICAgICAgICAgICAgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgIG9mZiA9IHVybC5pbmRleE9mKFwiIFwiKTtcclxuXHJcbiAgICAgICAgaWYgKCBvZmYgPj0gMCApIHtcclxuICAgICAgICAgICAgc2VsZWN0b3IgPSBqUXVlcnkudHJpbSggdXJsLnNsaWNlKCBvZmYsIHVybC5sZW5ndGggKSApO1xyXG4gICAgICAgICAgICB1cmwgPSB1cmwuc2xpY2UoIDAsIG9mZiApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgaXQncyBhIGZ1bmN0aW9uXHJcbiAgICAgICAgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggcGFyYW1zICkgKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBXZSBhc3N1bWUgdGhhdCBpdCdzIHRoZSBjYWxsYmFja1xyXG4gICAgICAgICAgICBjYWxsYmFjayA9IHBhcmFtcztcclxuICAgICAgICAgICAgcGFyYW1zID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBidWlsZCBhIHBhcmFtIHN0cmluZ1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIHBhcmFtcyAmJiB0eXBlb2YgcGFyYW1zID09PSBcIm9iamVjdFwiICkge1xyXG4gICAgICAgICAgICB0eXBlID0gXCJQT1NUXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJZiB3ZSBoYXZlIGVsZW1lbnRzIHRvIG1vZGlmeSwgbWFrZSB0aGUgcmVxdWVzdFxyXG4gICAgICAgIGlmICggc2VsZi5sZW5ndGggPiAwICkge1xyXG4gICAgICAgICAgICBqUXVlcnkuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiBcInR5cGVcIiB2YXJpYWJsZSBpcyB1bmRlZmluZWQsIHRoZW4gXCJHRVRcIiBtZXRob2Qgd2lsbCBiZSB1c2VkXHJcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwiaHRtbFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogcGFyYW1zXHJcbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3BvbnNlVGV4dCApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTYXZlIHJlc3BvbnNlIGZvciB1c2UgaW4gY29tcGxldGUgY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gYXJndW1lbnRzO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuaHRtbCggc2VsZWN0b3IgP1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBhIHNlbGVjdG9yIHdhcyBzcGVjaWZpZWQsIGxvY2F0ZSB0aGUgcmlnaHQgZWxlbWVudHMgaW4gYSBkdW1teSBkaXZcclxuICAgICAgICAgICAgICAgICAgICAvLyBFeGNsdWRlIHNjcmlwdHMgdG8gYXZvaWQgSUUgJ1Blcm1pc3Npb24gRGVuaWVkJyBlcnJvcnNcclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoXCI8ZGl2PlwiKS5hcHBlbmQoIGpRdWVyeS5wYXJzZUhUTUwoIHJlc3BvbnNlVGV4dCApICkuZmluZCggc2VsZWN0b3IgKSA6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSB1c2UgdGhlIGZ1bGwgcmVzdWx0XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VUZXh0ICk7XHJcblxyXG4gICAgICAgICAgICB9KS5jb21wbGV0ZSggY2FsbGJhY2sgJiYgZnVuY3Rpb24oIGpxWEhSLCBzdGF0dXMgKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmVhY2goIGNhbGxiYWNrLCByZXNwb25zZSB8fCBbIGpxWEhSLnJlc3BvbnNlVGV4dCwgc3RhdHVzLCBqcVhIUiBdICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG5cclxuLy8gQXR0YWNoIGEgYnVuY2ggb2YgZnVuY3Rpb25zIGZvciBoYW5kbGluZyBjb21tb24gQUpBWCBldmVudHNcclxuICAgIGpRdWVyeS5lYWNoKCBbIFwiYWpheFN0YXJ0XCIsIFwiYWpheFN0b3BcIiwgXCJhamF4Q29tcGxldGVcIiwgXCJhamF4RXJyb3JcIiwgXCJhamF4U3VjY2Vzc1wiLCBcImFqYXhTZW5kXCIgXSwgZnVuY3Rpb24oIGksIHR5cGUgKSB7XHJcbiAgICAgICAgalF1ZXJ5LmZuWyB0eXBlIF0gPSBmdW5jdGlvbiggZm4gKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9uKCB0eXBlLCBmbiApO1xyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxuXHJcbiAgICBqUXVlcnkuZXhwci5maWx0ZXJzLmFuaW1hdGVkID0gZnVuY3Rpb24oIGVsZW0gKSB7XHJcbiAgICAgICAgcmV0dXJuIGpRdWVyeS5ncmVwKGpRdWVyeS50aW1lcnMsIGZ1bmN0aW9uKCBmbiApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVsZW0gPT09IGZuLmVsZW07XHJcbiAgICAgICAgfSkubGVuZ3RoO1xyXG4gICAgfTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgdmFyIGRvY0VsZW0gPSB3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhIHdpbmRvdyBmcm9tIGFuIGVsZW1lbnRcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZ2V0V2luZG93KCBlbGVtICkge1xyXG4gICAgICAgIHJldHVybiBqUXVlcnkuaXNXaW5kb3coIGVsZW0gKSA/XHJcbiAgICAgICAgICAgIGVsZW0gOlxyXG4gICAgICAgICAgICBlbGVtLm5vZGVUeXBlID09PSA5ID9cclxuICAgICAgICAgICAgZWxlbS5kZWZhdWx0VmlldyB8fCBlbGVtLnBhcmVudFdpbmRvdyA6XHJcbiAgICAgICAgICAgICAgICBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBqUXVlcnkub2Zmc2V0ID0ge1xyXG4gICAgICAgIHNldE9mZnNldDogZnVuY3Rpb24oIGVsZW0sIG9wdGlvbnMsIGkgKSB7XHJcbiAgICAgICAgICAgIHZhciBjdXJQb3NpdGlvbiwgY3VyTGVmdCwgY3VyQ1NTVG9wLCBjdXJUb3AsIGN1ck9mZnNldCwgY3VyQ1NTTGVmdCwgY2FsY3VsYXRlUG9zaXRpb24sXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IGpRdWVyeS5jc3MoIGVsZW0sIFwicG9zaXRpb25cIiApLFxyXG4gICAgICAgICAgICAgICAgY3VyRWxlbSA9IGpRdWVyeSggZWxlbSApLFxyXG4gICAgICAgICAgICAgICAgcHJvcHMgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldCBwb3NpdGlvbiBmaXJzdCwgaW4tY2FzZSB0b3AvbGVmdCBhcmUgc2V0IGV2ZW4gb24gc3RhdGljIGVsZW1cclxuICAgICAgICAgICAgaWYgKCBwb3NpdGlvbiA9PT0gXCJzdGF0aWNcIiApIHtcclxuICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGN1ck9mZnNldCA9IGN1ckVsZW0ub2Zmc2V0KCk7XHJcbiAgICAgICAgICAgIGN1ckNTU1RvcCA9IGpRdWVyeS5jc3MoIGVsZW0sIFwidG9wXCIgKTtcclxuICAgICAgICAgICAgY3VyQ1NTTGVmdCA9IGpRdWVyeS5jc3MoIGVsZW0sIFwibGVmdFwiICk7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0ZVBvc2l0aW9uID0gKCBwb3NpdGlvbiA9PT0gXCJhYnNvbHV0ZVwiIHx8IHBvc2l0aW9uID09PSBcImZpeGVkXCIgKSAmJlxyXG4gICAgICAgICAgICBqUXVlcnkuaW5BcnJheShcImF1dG9cIiwgWyBjdXJDU1NUb3AsIGN1ckNTU0xlZnQgXSApID4gLTE7XHJcblxyXG4gICAgICAgICAgICAvLyBuZWVkIHRvIGJlIGFibGUgdG8gY2FsY3VsYXRlIHBvc2l0aW9uIGlmIGVpdGhlciB0b3Agb3IgbGVmdCBpcyBhdXRvIGFuZCBwb3NpdGlvbiBpcyBlaXRoZXIgYWJzb2x1dGUgb3IgZml4ZWRcclxuICAgICAgICAgICAgaWYgKCBjYWxjdWxhdGVQb3NpdGlvbiApIHtcclxuICAgICAgICAgICAgICAgIGN1clBvc2l0aW9uID0gY3VyRWxlbS5wb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgY3VyVG9wID0gY3VyUG9zaXRpb24udG9wO1xyXG4gICAgICAgICAgICAgICAgY3VyTGVmdCA9IGN1clBvc2l0aW9uLmxlZnQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdXJUb3AgPSBwYXJzZUZsb2F0KCBjdXJDU1NUb3AgKSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgY3VyTGVmdCA9IHBhcnNlRmxvYXQoIGN1ckNTU0xlZnQgKSB8fCAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBvcHRpb25zICkgKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucy5jYWxsKCBlbGVtLCBpLCBjdXJPZmZzZXQgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCBvcHRpb25zLnRvcCAhPSBudWxsICkge1xyXG4gICAgICAgICAgICAgICAgcHJvcHMudG9wID0gKCBvcHRpb25zLnRvcCAtIGN1ck9mZnNldC50b3AgKSArIGN1clRvcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIG9wdGlvbnMubGVmdCAhPSBudWxsICkge1xyXG4gICAgICAgICAgICAgICAgcHJvcHMubGVmdCA9ICggb3B0aW9ucy5sZWZ0IC0gY3VyT2Zmc2V0LmxlZnQgKSArIGN1ckxlZnQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICggXCJ1c2luZ1wiIGluIG9wdGlvbnMgKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnVzaW5nLmNhbGwoIGVsZW0sIHByb3BzICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdXJFbGVtLmNzcyggcHJvcHMgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgalF1ZXJ5LmZuLmV4dGVuZCh7XHJcbiAgICAgICAgb2Zmc2V0OiBmdW5jdGlvbiggb3B0aW9ucyApIHtcclxuICAgICAgICAgICAgaWYgKCBhcmd1bWVudHMubGVuZ3RoICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMgPT09IHVuZGVmaW5lZCA/XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcyA6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKCBpICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkub2Zmc2V0LnNldE9mZnNldCggdGhpcywgb3B0aW9ucywgaSApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgZG9jRWxlbSwgd2luLFxyXG4gICAgICAgICAgICAgICAgYm94ID0geyB0b3A6IDAsIGxlZnQ6IDAgfSxcclxuICAgICAgICAgICAgICAgIGVsZW0gPSB0aGlzWyAwIF0sXHJcbiAgICAgICAgICAgICAgICBkb2MgPSBlbGVtICYmIGVsZW0ub3duZXJEb2N1bWVudDtcclxuXHJcbiAgICAgICAgICAgIGlmICggIWRvYyApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZG9jRWxlbSA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgaXQncyBub3QgYSBkaXNjb25uZWN0ZWQgRE9NIG5vZGVcclxuICAgICAgICAgICAgaWYgKCAhalF1ZXJ5LmNvbnRhaW5zKCBkb2NFbGVtLCBlbGVtICkgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYm94O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB3ZSBkb24ndCBoYXZlIGdCQ1IsIGp1c3QgdXNlIDAsMCByYXRoZXIgdGhhbiBlcnJvclxyXG4gICAgICAgICAgICAvLyBCbGFja0JlcnJ5IDUsIGlPUyAzIChvcmlnaW5hbCBpUGhvbmUpXHJcbiAgICAgICAgICAgIGlmICggdHlwZW9mIGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0ICE9PSBzdHJ1bmRlZmluZWQgKSB7XHJcbiAgICAgICAgICAgICAgICBib3ggPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdpbiA9IGdldFdpbmRvdyggZG9jICk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0b3A6IGJveC50b3AgICsgKCB3aW4ucGFnZVlPZmZzZXQgfHwgZG9jRWxlbS5zY3JvbGxUb3AgKSAgLSAoIGRvY0VsZW0uY2xpZW50VG9wICB8fCAwICksXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBib3gubGVmdCArICggd2luLnBhZ2VYT2Zmc2V0IHx8IGRvY0VsZW0uc2Nyb2xsTGVmdCApIC0gKCBkb2NFbGVtLmNsaWVudExlZnQgfHwgMCApXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcG9zaXRpb246IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoICF0aGlzWyAwIF0gKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBvZmZzZXRQYXJlbnQsIG9mZnNldCxcclxuICAgICAgICAgICAgICAgIHBhcmVudE9mZnNldCA9IHsgdG9wOiAwLCBsZWZ0OiAwIH0sXHJcbiAgICAgICAgICAgICAgICBlbGVtID0gdGhpc1sgMCBdO1xyXG5cclxuICAgICAgICAgICAgLy8gZml4ZWQgZWxlbWVudHMgYXJlIG9mZnNldCBmcm9tIHdpbmRvdyAocGFyZW50T2Zmc2V0ID0ge3RvcDowLCBsZWZ0OiAwfSwgYmVjYXVzZSBpdCBpcyBpdHMgb25seSBvZmZzZXQgcGFyZW50XHJcbiAgICAgICAgICAgIGlmICggalF1ZXJ5LmNzcyggZWxlbSwgXCJwb3NpdGlvblwiICkgPT09IFwiZml4ZWRcIiApIHtcclxuICAgICAgICAgICAgICAgIC8vIHdlIGFzc3VtZSB0aGF0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBpcyBhdmFpbGFibGUgd2hlbiBjb21wdXRlZCBwb3NpdGlvbiBpcyBmaXhlZFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIEdldCAqcmVhbCogb2Zmc2V0UGFyZW50XHJcbiAgICAgICAgICAgICAgICBvZmZzZXRQYXJlbnQgPSB0aGlzLm9mZnNldFBhcmVudCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEdldCBjb3JyZWN0IG9mZnNldHNcclxuICAgICAgICAgICAgICAgIG9mZnNldCA9IHRoaXMub2Zmc2V0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoICFqUXVlcnkubm9kZU5hbWUoIG9mZnNldFBhcmVudFsgMCBdLCBcImh0bWxcIiApICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudE9mZnNldCA9IG9mZnNldFBhcmVudC5vZmZzZXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgb2Zmc2V0UGFyZW50IGJvcmRlcnNcclxuICAgICAgICAgICAgICAgIHBhcmVudE9mZnNldC50b3AgICs9IGpRdWVyeS5jc3MoIG9mZnNldFBhcmVudFsgMCBdLCBcImJvcmRlclRvcFdpZHRoXCIsIHRydWUgKTtcclxuICAgICAgICAgICAgICAgIHBhcmVudE9mZnNldC5sZWZ0ICs9IGpRdWVyeS5jc3MoIG9mZnNldFBhcmVudFsgMCBdLCBcImJvcmRlckxlZnRXaWR0aFwiLCB0cnVlICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFN1YnRyYWN0IHBhcmVudCBvZmZzZXRzIGFuZCBlbGVtZW50IG1hcmdpbnNcclxuICAgICAgICAgICAgLy8gbm90ZTogd2hlbiBhbiBlbGVtZW50IGhhcyBtYXJnaW46IGF1dG8gdGhlIG9mZnNldExlZnQgYW5kIG1hcmdpbkxlZnRcclxuICAgICAgICAgICAgLy8gYXJlIHRoZSBzYW1lIGluIFNhZmFyaSBjYXVzaW5nIG9mZnNldC5sZWZ0IHRvIGluY29ycmVjdGx5IGJlIDBcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHRvcDogIG9mZnNldC50b3AgIC0gcGFyZW50T2Zmc2V0LnRvcCAtIGpRdWVyeS5jc3MoIGVsZW0sIFwibWFyZ2luVG9wXCIsIHRydWUgKSxcclxuICAgICAgICAgICAgICAgIGxlZnQ6IG9mZnNldC5sZWZ0IC0gcGFyZW50T2Zmc2V0LmxlZnQgLSBqUXVlcnkuY3NzKCBlbGVtLCBcIm1hcmdpbkxlZnRcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvZmZzZXRQYXJlbnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0UGFyZW50ID0gdGhpcy5vZmZzZXRQYXJlbnQgfHwgZG9jRWxlbTtcclxuXHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoIG9mZnNldFBhcmVudCAmJiAoICFqUXVlcnkubm9kZU5hbWUoIG9mZnNldFBhcmVudCwgXCJodG1sXCIgKSAmJiBqUXVlcnkuY3NzKCBvZmZzZXRQYXJlbnQsIFwicG9zaXRpb25cIiApID09PSBcInN0YXRpY1wiICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50Lm9mZnNldFBhcmVudDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBvZmZzZXRQYXJlbnQgfHwgZG9jRWxlbTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4vLyBDcmVhdGUgc2Nyb2xsTGVmdCBhbmQgc2Nyb2xsVG9wIG1ldGhvZHNcclxuICAgIGpRdWVyeS5lYWNoKCB7IHNjcm9sbExlZnQ6IFwicGFnZVhPZmZzZXRcIiwgc2Nyb2xsVG9wOiBcInBhZ2VZT2Zmc2V0XCIgfSwgZnVuY3Rpb24oIG1ldGhvZCwgcHJvcCApIHtcclxuICAgICAgICB2YXIgdG9wID0gL1kvLnRlc3QoIHByb3AgKTtcclxuXHJcbiAgICAgICAgalF1ZXJ5LmZuWyBtZXRob2QgXSA9IGZ1bmN0aW9uKCB2YWwgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCBtZXRob2QsIHZhbCApIHtcclxuICAgICAgICAgICAgICAgIHZhciB3aW4gPSBnZXRXaW5kb3coIGVsZW0gKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIHZhbCA9PT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW4gPyAocHJvcCBpbiB3aW4pID8gd2luWyBwcm9wIF0gOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW4uZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50WyBtZXRob2QgXSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1bIG1ldGhvZCBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICggd2luICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbi5zY3JvbGxUbyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgIXRvcCA/IHZhbCA6IGpRdWVyeSggd2luICkuc2Nyb2xsTGVmdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3AgPyB2YWwgOiBqUXVlcnkoIHdpbiApLnNjcm9sbFRvcCgpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1bIG1ldGhvZCBdID0gdmFsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBtZXRob2QsIHZhbCwgYXJndW1lbnRzLmxlbmd0aCwgbnVsbCApO1xyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbi8vIEFkZCB0aGUgdG9wL2xlZnQgY3NzSG9va3MgdXNpbmcgalF1ZXJ5LmZuLnBvc2l0aW9uXHJcbi8vIFdlYmtpdCBidWc6IGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0yOTA4NFxyXG4vLyBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgcGVyY2VudCB3aGVuIHNwZWNpZmllZCBmb3IgdG9wL2xlZnQvYm90dG9tL3JpZ2h0XHJcbi8vIHJhdGhlciB0aGFuIG1ha2UgdGhlIGNzcyBtb2R1bGUgZGVwZW5kIG9uIHRoZSBvZmZzZXQgbW9kdWxlLCB3ZSBqdXN0IGNoZWNrIGZvciBpdCBoZXJlXHJcbiAgICBqUXVlcnkuZWFjaCggWyBcInRvcFwiLCBcImxlZnRcIiBdLCBmdW5jdGlvbiggaSwgcHJvcCApIHtcclxuICAgICAgICBqUXVlcnkuY3NzSG9va3NbIHByb3AgXSA9IGFkZEdldEhvb2tJZiggc3VwcG9ydC5waXhlbFBvc2l0aW9uLFxyXG4gICAgICAgICAgICBmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIGNvbXB1dGVkICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXB1dGVkID0gY3VyQ1NTKCBlbGVtLCBwcm9wICk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgY3VyQ1NTIHJldHVybnMgcGVyY2VudGFnZSwgZmFsbGJhY2sgdG8gb2Zmc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJudW1ub25weC50ZXN0KCBjb21wdXRlZCApID9cclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoIGVsZW0gKS5wb3NpdGlvbigpWyBwcm9wIF0gKyBcInB4XCIgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wdXRlZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4vLyBDcmVhdGUgaW5uZXJIZWlnaHQsIGlubmVyV2lkdGgsIGhlaWdodCwgd2lkdGgsIG91dGVySGVpZ2h0IGFuZCBvdXRlcldpZHRoIG1ldGhvZHNcclxuICAgIGpRdWVyeS5lYWNoKCB7IEhlaWdodDogXCJoZWlnaHRcIiwgV2lkdGg6IFwid2lkdGhcIiB9LCBmdW5jdGlvbiggbmFtZSwgdHlwZSApIHtcclxuICAgICAgICBqUXVlcnkuZWFjaCggeyBwYWRkaW5nOiBcImlubmVyXCIgKyBuYW1lLCBjb250ZW50OiB0eXBlLCBcIlwiOiBcIm91dGVyXCIgKyBuYW1lIH0sIGZ1bmN0aW9uKCBkZWZhdWx0RXh0cmEsIGZ1bmNOYW1lICkge1xyXG4gICAgICAgICAgICAvLyBtYXJnaW4gaXMgb25seSBmb3Igb3V0ZXJIZWlnaHQsIG91dGVyV2lkdGhcclxuICAgICAgICAgICAgalF1ZXJ5LmZuWyBmdW5jTmFtZSBdID0gZnVuY3Rpb24oIG1hcmdpbiwgdmFsdWUgKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hhaW5hYmxlID0gYXJndW1lbnRzLmxlbmd0aCAmJiAoIGRlZmF1bHRFeHRyYSB8fCB0eXBlb2YgbWFyZ2luICE9PSBcImJvb2xlYW5cIiApLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4dHJhID0gZGVmYXVsdEV4dHJhIHx8ICggbWFyZ2luID09PSB0cnVlIHx8IHZhbHVlID09PSB0cnVlID8gXCJtYXJnaW5cIiA6IFwiYm9yZGVyXCIgKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgdHlwZSwgdmFsdWUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRvYztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBqUXVlcnkuaXNXaW5kb3coIGVsZW0gKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXMgb2YgNS84LzIwMTIgdGhpcyB3aWxsIHlpZWxkIGluY29ycmVjdCByZXN1bHRzIGZvciBNb2JpbGUgU2FmYXJpLCBidXQgdGhlcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXNuJ3QgYSB3aG9sZSBsb3Qgd2UgY2FuIGRvLiBTZWUgcHVsbCByZXF1ZXN0IGF0IHRoaXMgVVJMIGZvciBkaXNjdXNzaW9uOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9wdWxsLzc2NFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbIFwiY2xpZW50XCIgKyBuYW1lIF07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBHZXQgZG9jdW1lbnQgd2lkdGggb3IgaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBlbGVtLm5vZGVUeXBlID09PSA5ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2MgPSBlbGVtLmRvY3VtZW50RWxlbWVudDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVpdGhlciBzY3JvbGxbV2lkdGgvSGVpZ2h0XSBvciBvZmZzZXRbV2lkdGgvSGVpZ2h0XSBvciBjbGllbnRbV2lkdGgvSGVpZ2h0XSwgd2hpY2hldmVyIGlzIGdyZWF0ZXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVuZm9ydHVuYXRlbHksIHRoaXMgY2F1c2VzIGJ1ZyAjMzgzOCBpbiBJRTYvOCBvbmx5LCBidXQgdGhlcmUgaXMgY3VycmVudGx5IG5vIGdvb2QsIHNtYWxsIHdheSB0byBmaXggaXQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uYm9keVsgXCJzY3JvbGxcIiArIG5hbWUgXSwgZG9jWyBcInNjcm9sbFwiICsgbmFtZSBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5ib2R5WyBcIm9mZnNldFwiICsgbmFtZSBdLCBkb2NbIFwib2Zmc2V0XCIgKyBuYW1lIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2NbIFwiY2xpZW50XCIgKyBuYW1lIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHdpZHRoIG9yIGhlaWdodCBvbiB0aGUgZWxlbWVudCwgcmVxdWVzdGluZyBidXQgbm90IGZvcmNpbmcgcGFyc2VGbG9hdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuY3NzKCBlbGVtLCB0eXBlLCBleHRyYSApIDpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNldCB3aWR0aCBvciBoZWlnaHQgb24gdGhlIGVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LnN0eWxlKCBlbGVtLCB0eXBlLCB2YWx1ZSwgZXh0cmEgKTtcclxuICAgICAgICAgICAgICAgIH0sIHR5cGUsIGNoYWluYWJsZSA/IG1hcmdpbiA6IHVuZGVmaW5lZCwgY2hhaW5hYmxlLCBudWxsICk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4vLyBUaGUgbnVtYmVyIG9mIGVsZW1lbnRzIGNvbnRhaW5lZCBpbiB0aGUgbWF0Y2hlZCBlbGVtZW50IHNldFxyXG4gICAgalF1ZXJ5LmZuLnNpemUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sZW5ndGg7XHJcbiAgICB9O1xyXG5cclxuICAgIGpRdWVyeS5mbi5hbmRTZWxmID0galF1ZXJ5LmZuLmFkZEJhY2s7XHJcblxyXG5cclxuXHJcblxyXG4vLyBSZWdpc3RlciBhcyBhIG5hbWVkIEFNRCBtb2R1bGUsIHNpbmNlIGpRdWVyeSBjYW4gYmUgY29uY2F0ZW5hdGVkIHdpdGggb3RoZXJcclxuLy8gZmlsZXMgdGhhdCBtYXkgdXNlIGRlZmluZSwgYnV0IG5vdCB2aWEgYSBwcm9wZXIgY29uY2F0ZW5hdGlvbiBzY3JpcHQgdGhhdFxyXG4vLyB1bmRlcnN0YW5kcyBhbm9ueW1vdXMgQU1EIG1vZHVsZXMuIEEgbmFtZWQgQU1EIGlzIHNhZmVzdCBhbmQgbW9zdCByb2J1c3RcclxuLy8gd2F5IHRvIHJlZ2lzdGVyLiBMb3dlcmNhc2UganF1ZXJ5IGlzIHVzZWQgYmVjYXVzZSBBTUQgbW9kdWxlIG5hbWVzIGFyZVxyXG4vLyBkZXJpdmVkIGZyb20gZmlsZSBuYW1lcywgYW5kIGpRdWVyeSBpcyBub3JtYWxseSBkZWxpdmVyZWQgaW4gYSBsb3dlcmNhc2VcclxuLy8gZmlsZSBuYW1lLiBEbyB0aGlzIGFmdGVyIGNyZWF0aW5nIHRoZSBnbG9iYWwgc28gdGhhdCBpZiBhbiBBTUQgbW9kdWxlIHdhbnRzXHJcbi8vIHRvIGNhbGwgbm9Db25mbGljdCB0byBoaWRlIHRoaXMgdmVyc2lvbiBvZiBqUXVlcnksIGl0IHdpbGwgd29yay5cclxuXHJcbi8vIE5vdGUgdGhhdCBmb3IgbWF4aW11bSBwb3J0YWJpbGl0eSwgbGlicmFyaWVzIHRoYXQgYXJlIG5vdCBqUXVlcnkgc2hvdWxkXHJcbi8vIGRlY2xhcmUgdGhlbXNlbHZlcyBhcyBhbm9ueW1vdXMgbW9kdWxlcywgYW5kIGF2b2lkIHNldHRpbmcgYSBnbG9iYWwgaWYgYW5cclxuLy8gQU1EIGxvYWRlciBpcyBwcmVzZW50LiBqUXVlcnkgaXMgYSBzcGVjaWFsIGNhc2UuIEZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWVcclxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2pyYnVya2UvcmVxdWlyZWpzL3dpa2kvVXBkYXRpbmctZXhpc3RpbmctbGlicmFyaWVzI3dpa2ktYW5vblxyXG5cclxuICAgIGlmICggdHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQgKSB7XHJcbiAgICAgICAgZGVmaW5lKCBcImpxdWVyeVwiLCBbXSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBqUXVlcnk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgdmFyXHJcbiAgICAvLyBNYXAgb3ZlciBqUXVlcnkgaW4gY2FzZSBvZiBvdmVyd3JpdGVcclxuICAgICAgICBfalF1ZXJ5ID0gd2luZG93LmpRdWVyeSxcclxuXHJcbiAgICAvLyBNYXAgb3ZlciB0aGUgJCBpbiBjYXNlIG9mIG92ZXJ3cml0ZVxyXG4gICAgICAgIF8kID0gd2luZG93LiQ7XHJcblxyXG4gICAgalF1ZXJ5Lm5vQ29uZmxpY3QgPSBmdW5jdGlvbiggZGVlcCApIHtcclxuICAgICAgICBpZiAoIHdpbmRvdy4kID09PSBqUXVlcnkgKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy4kID0gXyQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIGRlZXAgJiYgd2luZG93LmpRdWVyeSA9PT0galF1ZXJ5ICkge1xyXG4gICAgICAgICAgICB3aW5kb3cualF1ZXJ5ID0gX2pRdWVyeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBqUXVlcnk7XHJcbiAgICB9O1xyXG5cclxuLy8gRXhwb3NlIGpRdWVyeSBhbmQgJCBpZGVudGlmaWVycywgZXZlbiBpblxyXG4vLyBBTUQgKCM3MTAyI2NvbW1lbnQ6MTAsIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L3B1bGwvNTU3KVxyXG4vLyBhbmQgQ29tbW9uSlMgZm9yIGJyb3dzZXIgZW11bGF0b3JzICgjMTM1NjYpXHJcbiAgICBpZiAoIHR5cGVvZiBub0dsb2JhbCA9PT0gc3RydW5kZWZpbmVkICkge1xyXG4gICAgICAgIHdpbmRvdy5qUXVlcnkgPSB3aW5kb3cuJCA9IGpRdWVyeTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICByZXR1cm4galF1ZXJ5O1xyXG5cclxufSkpOyJdLCJmaWxlIjoianF1ZXJ5LmpzIn0=
