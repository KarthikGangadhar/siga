angular
    .module('main')
    .controller('inscricao/view', [
        '$route',
        '$scope',
        'exampleLoader',
        function inscricao_ViewController(
            $route,
            $scope,
            exampleLoader
        ) {
            'use strict';
            $scope.editButtonDisabled = false;
            $scope.showAddress = function showAddress() {
                if ($scope.inscricao.estrangeiro) {
                    return !!$scope.inscricao.endereco;
                }
                return $scope.inscricao.logradouro &&
                    $scope.inscricao.numero &&
                    $scope.inscricao.bairro &&
                    $scope.inscricao.localidade &&
                    $scope.inscricao.uf &&
                    $scope.inscricao.cep;
            };
            $scope.showDetails = function showDetails() {
                return $scope.inscricao.nome_no_cracha &&
                    $scope.inscricao.categoria &&
                    $scope.inscricao.curso_ou_formacao &&
                    $scope.inscricao.nome_da_instituicao_ou_empresa;
            };
            $scope.showPhone = function showPhone(number) {
                return $scope.inscricao['codigo_nacional_' + number] && $scope.inscricao['numero_' + number];
            };
            $scope.$on('$routeChangeStart', function onRouteChangeStart(event, message) {
                $scope.editButtonDisabled = true;
            });
            $scope.inscricao = $route.current.locals.loadedInscricao;
            // carregador de exemplos para testes
            // exampleLoader.sherlock($scope.inscricao);
            // exampleLoader.thiago($scope.inscricao);
        }
    ]);
