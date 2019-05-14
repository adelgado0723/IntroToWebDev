// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"server.js":[function(require,module,exports) {
const express = require('express');

const path = require('path');

const complements = ['You like nice today', 'That dress looks nice on you', 'Have you been working out?', 'You can do hard things', "You've gotten far in this course. You're really smart", "You're programming! How cool is that?", "I'm really proud of you", 'You made this', "You've learned a lot of things, and that's pretty hard to do"];
const jokes = ['Today at the bank, an old lady asked me to help check her balance. So I pushed her over.', 'I told my girlfriend she drew her eyebrows too high. She seemed surprised.', 'My dog used to chase people on a bike a lot. It got so bad, finally I had to take his bike away.', "I'm so good at sleeping. I can do it with my eyes closed.", 'My boss told me to have a good day.. so I went home.', 'Why is Peter Pan always flying? He neverlands.', 'A woman walks into a library and asked if they had any books about paranoia. The librarian says "They\'re right behind you!"', "The other day, my wife asked me to pass her lipstick but I accidentally passed her a glue stick. She still isn't talking to me.", 'When you look really closely, all mirrors look like eyeballs.', 'My friend says to me: "What rhymes with orange" I said: "No it doesn\'t"', "I couldn't figure out why the baseball kept getting larger. Then it hit me."];

function getRandomJoke() {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  return jokes[randomIndex];
}

function getRandomComplement() {
  const randomIndex = Math.floor(Math.random() * complements.length);
  return complements[randomIndex];
}

const app = express();
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/complement', (req, res) => {
  res.json({
    complement: getRandomComplement()
  }).end();
});
app.get('/joke', (req, res) => {
  res.json({
    joke: getRandomJoke()
  }).end();
});
app.use('/public', express.static('./public'));
app.listen(3000);
console.log('listening on http://localhost:3000'); // This code uses the http module instead of express:
// const http = require('http');
// // The callback function that createServer() takes
// // will run each time a user requests the site
// const server = http.createServer(function(req, res) {
//     console.log(`user visited ${req.url}`);
//     res.end('hello!');
// });
// server.listen(3000);
// console.log('listening on http://localhost:3000');
},{}]},{},["server.js"], null)
//# sourceMappingURL=/server.js.map