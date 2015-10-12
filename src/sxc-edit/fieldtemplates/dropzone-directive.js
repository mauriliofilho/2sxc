﻿/* js/fileAppDirectives */

angular.module("sxcFieldTemplates")
    .directive("dropzone", function (sxc, tabId) {
        return {
            restrict: "C",
            link: function (scope, element, attrs) {
                var header = scope.$parent.to.header;
                var field = scope.$parent.options.key;
                var entityGuid = header.Guid; 
                var url = sxc.resolveServiceUrl("app-content/" + header.ContentTypeName + "/" + entityGuid + "/" + field);

                var config = {
                    url: url,
                    maxFilesize: 100,
                    paramName: "uploadfile",
                    maxThumbnailFilesize: 10,

                    headers: {
                        "ModuleId": sxc.id,
                        "TabId": tabId
                    },

                    //previewTemplate: "<div></div>",
                    dictDefaultMessage: "",
                    addRemoveLinks: true,
                    previewsContainer: '.dropzone-previews'
                };

                var eventHandlers = {
                    //'addedfile': function(file) {
                    //    scope.file = file;
                    //    if (this.files[1] !== null) {
                    //        this.removeFile(this.files[0]);
                    //    }
                    //    scope.$apply(function() {
                    //        scope.fileAdded = true;
                    //    });
                    //},

                    'success': function (file, response) {
                        if (response.Success) {
                            scope.$parent.value.Value = "File:" + response.FileId;
                            scope.$apply();
                        } else {
                            alert("Upload failed because: " + response.Error);
                        }
                    }
                };

                var dropzone = new Dropzone(element[0], config);

                document.addEventListener('dragenter', function() { document.body.className += " sxc-dragging"; });
                document.addEventListener('dragleave', function () { document.body.className = document.body.className.replace("sxc-dragging", ""); });

                angular.forEach(eventHandlers, function(handler, event) {
                    dropzone.on(event, handler);
                });

                scope.processDropzone = function() {
                    dropzone.processQueue();
                };

                scope.resetDropzone = function() {
                    dropzone.removeAllFiles();
                };
            }
        };
    });