angular
    .module('fileUpload', [
        'angularFileUpload'
    ])
    .controller('uploadController', [
        '$scope',
        '$timeout',
        '$upload',
        function uploadController(
            $scope,
            $timeout,
            $upload
        ) {
            'use strict';
            $scope.success = false;
            $scope.percent = 0;
            $scope.fail = false;
            $scope.submissao = {
                tipoDeSubmissao: 'artigo'
            };
            $scope.onFileSelect = function($files) {
                $scope.success = false;
                $scope.fail = false;
            //$files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < $files.length; i++) {
              var file = $files[i];
              $scope.upload = $upload.upload({
                url: '/api/trabalho',
                data: $scope.submissao,
                file: file
                // file: $files, //upload multiple files, this feature only works in HTML5 FromData browsers
                /* set file formData name for 'Content-Desposition' header. Default: 'file' */
                //fileFormDataName: myFile, //OR for HTML5 multiple upload only a list: ['name1', 'name2', ...]
                /* customize how data is added to formData. See #40#issuecomment-28612000 for example */
                //formDataAppender: function(formData, key, val){} //#40#issuecomment-28612000
              })
              .progress(function(evt) {
                $scope.percent = parseInt(100.0 * evt.loaded / evt.total);
              })
              .success(function(data, status, headers, config) {
                $scope.success = true;
                $timeout(function $timeout() {
                    $scope.percent = 0;
                }, 200);
              })
              .error(function error(data) {
                $timeout(function $timeout() {
                    $scope.percent = 0;
                }, 200);
                if (data === 'Gone') {
                    $scope.encerradas = true;
                    return;
                }
                $scope.fail = true;
              });
              //.then(success, error, progress);
            }
            };
        }
    ]);
