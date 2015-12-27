(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var File;

File = (function() {
  function File() {}

  File.exists = function(fname) {
    var d;
    console.log("Checking to see if exists:", fname);
    d = Q.defer();
    window.resolveLocalFileSystemURL(fname, (function(fileEntry) {
      return d.resolve(fileEntry);
    }), (function() {
      return d.reject();
    }));
    return d.promise;
  };

  File.rm = function(fname) {
    var deferred;
    deferred = Q.defer();
    File.exists(fname).then(function(fileEntry) {
      if (fileEntry.isFile) {
        console.log("Is a file", fname);
        fileEntry.remove((function(success) {
          console.log("Delete successful", success);
          return deferred.resolve();
        }), (function(err) {
          console.log("Delete unsuccessful", err);
          return deferred.reject(err);
        }));
      }
      if (fileEntry.isDirectory) {
        console.log("Is a directory", fname);
        return fileEntry.removeRecursively((function(success) {
          console.log("Dir was successfully removed", fname);
          return deferred.resolve();
        }), (function(err) {
          console.log("There was an error removing the directory", err);
          return deferred.reject(err);
        }));
      }
    }).fail(function() {
      console.log("File does not exist", fname);
      return deferred.resolve();
    });
    return deferred.promise;
  };

  return File;

})();

module.exports = File;


},{}]},{},[1]);
