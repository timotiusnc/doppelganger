CodeMirror.defineMode("lisp", function(config) {
  function words(str) {
    var obj = {}, words = str.split(" ");
    for (var i = 0; i < words.length; ++i) obj[words[i]] = true;
    return obj;
  }
  var keywords = words("defun car cdr cadr cddr list cons append print dotimes when loop " +
                       "if read cond let setq ato listp null eq equal not and or lambda return do exp");
  var atoms = {"null": true};

  var isOperatorChar = /[+\-*&%=<>!?|\/]/;

  function tokenBase(stream, state) {
    var ch = stream.next();    
    if (ch == '"' || ch == "'") {
      state.tokenize = tokenString(ch);
      return state.tokenize(stream, state);
    }
    if (/[\[\]{}\(\),\:\.]/.test(ch)) {
      return null
    }
    if (/\d/.test(ch)) {
      stream.eatWhile(/[\w\.]/);
      return "number";
    }
    if (ch == ";") {
      stream.skipToEnd();
      return "comment";
    }
    if (isOperatorChar.test(ch)) {
      stream.eatWhile(isOperatorChar);
      return "operator";
    }
	
    stream.eatWhile(/[\w\$_]/);
    var cur = stream.current();
	//console.log(cur, stream.string);
    if (keywords.propertyIsEnumerable(cur)) return "keyword";
    if (atoms.propertyIsEnumerable(cur)) return "atom";
    return "word";
  }

  function tokenString(quote) {
    return function(stream, state) {
      var escaped = false, next, end = false;
      while ((next = stream.next()) != null) {
        if (next == quote && !escaped) {end = true; break;}
		
		if(quote == "'"){
			if( next.match(/\s/) && !escaped ){
				end = true; break;
			}
		}
		
        escaped = !escaped && next == "\\";
      }
      if (end || !escaped) state.tokenize = null;
      return "string";
    };
  }

  // Interface

  return {
    startState: function(basecolumn) {
      return {tokenize: null};
    },

    token: function(stream, state) {
	  //console.log(stream, state);
      if (stream.eatSpace()) return null;
      var style = (state.tokenize || tokenBase)(stream, state);
      if (style == "comment" || style == "meta") return style;
      return style;
    },
  };
});

CodeMirror.defineMIME("text/x-lisp", "lisp");
