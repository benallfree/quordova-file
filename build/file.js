// Generated by CoffeeScript 1.10.0
(function() {
  var DirectoryDeleteError, File, FileDeleteError, FileError, Q,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Q = require('q');

  FileError = (function() {
    function FileError(fname1, errorInfo) {
      this.fname = fname1;
      this.errorInfo = errorInfo;
    }

    return FileError;

  })();

  FileDeleteError = (function(superClass) {
    extend(FileDeleteError, superClass);

    function FileDeleteError() {
      return FileDeleteError.__super__.constructor.apply(this, arguments);
    }

    return FileDeleteError;

  })(FileError);

  DirectoryDeleteError = (function(superClass) {
    extend(DirectoryDeleteError, superClass);

    function DirectoryDeleteError() {
      return DirectoryDeleteError.__super__.constructor.apply(this, arguments);
    }

    return DirectoryDeleteError;

  })(FileError);

  File = (function() {
    function File() {}

    File.exists = function(fname) {
      var d;
      console.log("Checking to see if exists:", fname);
      d = Q.defer();
      window.resolveLocalFileSystemURL(fname, (function(fileEntry) {
        return d.resolve(fileEntry);
      }), (function(fileError) {
        return d.reject(fileError);
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
            return deferred.reject(new FileDeleteError(fname, err));
          }));
        }
        if (fileEntry.isDirectory) {
          console.log("Is a directory", fname);
          return fileEntry.removeRecursively((function(success) {
            console.log("Dir was successfully removed", fname);
            return deferred.resolve();
          }), (function(err) {
            console.log("There was an error removing the directory", err);
            return deferred.reject(new DirectoryDeleteError(fname, err));
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

  module.exports = {
    File: File,
    FileError: FileError,
    FileDeleteError: FileDeleteError,
    DirectoryDeleteError: DirectoryDeleteError
  };

}).call(this);
