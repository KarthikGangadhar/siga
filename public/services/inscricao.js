angular
    .module('main')
    .factory('inscricaoService', [
        '$http',
        '$q',
        'notifier',
        'simpleCache',
        function inscricaoFactory(
            $http,
            $q,
            notifier,
            simpleCache
        ) {
            'use strict';
            var inscricaoPrototype = {
                    options: {
                        categoria: {
                            '1': 'Estudante',
                            '2': 'Profissional',
                            'Estudante': 1,
                            'Profissional': 2
                        },
                        sexo: {
                            '1': 'Feminino',
                            '2': 'Masculino',
                            'Feminino': 1,
                            'Masculino': 2
                        }
                    },
                    format: function format(toServer) {
                        this.categoria = this.options.categoria[this.categoria];
                        this.sexo = this.options.sexo[this.sexo];
                        if (toServer) {
                            this.telefones = [
                                this.codigo_internacional_1,
                                '|',
                                this.codigo_nacional_1,
                                '|',
                                this.numero_1,
                                ',',
                                this.codigo_internacional_2,
                                '|',
                                this.codigo_nacional_2,
                                '|',
                                this.numero_2,
                                ',',
                                this.codigo_internacional_3,
                                '|',
                                this.codigo_nacional_3,
                                '|',
                                this.numero_3
                            ].join('');
                            return this;
                        }
                        if (this.telefones && typeof this.telefones === 'string') {
                            this.telefones = this.telefones.split(',');
                            if (this.telefones[0]) {
                                this.telefones[0] = this.telefones[0].split('|');
                                if (this.telefones[0][0]) {
                                    this.codigo_internacional_1 = this.telefones[0][0];
                                }
                                if (this.telefones[0][1]) {
                                    this.codigo_nacional_1 = this.telefones[0][1];
                                }
                                if (this.telefones[0][2]) {
                                    this.numero_1 = this.telefones[0][2];
                                }
                            }
                            if (this.telefones[1]) {
                                this.telefones[1] = this.telefones[1].split('|');
                                if (this.telefones[1][0]) {
                                    this.codigo_internacional_2 = this.telefones[1][0];
                                }
                                if (this.telefones[1][1]) {
                                    this.codigo_nacional_2 = this.telefones[1][1];
                                }
                                if (this.telefones[1][2]) {
                                    this.numero_2 = this.telefones[1][2];
                                }
                            }
                            if (this.telefones[2]) {
                                this.telefones[2] = this.telefones[2].split('|');
                                if (this.telefones[2][0]) {
                                    this.codigo_internacional_3 = this.telefones[2][0];
                                }
                                if (this.telefones[2][1]) {
                                    this.codigo_nacional_3 = this.telefones[2][1];
                                }
                                if (this.telefones[2][2]) {
                                    this.numero_3 = this.telefones[2][2];
                                }
                            }
                        }
                        return this;
                    }
                },
                inscricaoService = function inscricaoService(data) {
                    var inscricao = Object.create(inscricaoPrototype);
                    inscricao.id = data ? data.id : 0;
                    inscricao.nome_completo = data ? data.nome_completo : '';
                    inscricao.data_de_nascimento = data ? data.data_de_nascimento : '';
                    inscricao.sexo = data ? data.sexo : 'Feminino';
                    inscricao.email = data ? data.email : '';
                    inscricao.estrangeiro = data ? data.estrangeiro : '';
                    inscricao.cpf = data ? data.cpf : '';
                    inscricao.nome_do_documento = data ? data.nome_do_documento : '';
                    inscricao.numero_do_documento = data ? data.numero_do_documento : '';
                    inscricao.telefones = data ? data.telefones : '';
                    inscricao.codigo_internacional_1 = data ? data.codigo_internacional_1 : '55';
                    inscricao.codigo_nacional_1 = data ? data.codigo_nacional_1 : '';
                    inscricao.numero_1 = data ? data.numero_1 : '';
                    inscricao.codigo_internacional_2 = data ? data.codigo_internacional_2 : '55';
                    inscricao.codigo_nacional_2 = data ? data.codigo_nacional_2 : '';
                    inscricao.numero_2 = data ? data.numero_2 : '';
                    inscricao.codigo_internacional_3 = data ? data.codigo_internacional_3 : '55';
                    inscricao.codigo_nacional_3 = data ? data.codigo_nacional_3 : '';
                    inscricao.numero_3 = data ? data.numero_3 : '';
                    inscricao.logradouro = data ? data.logradouro : '';
                    inscricao.numero = data ? data.numero : '';
                    inscricao.complemento = data ? data.complemento : '';
                    inscricao.bairro = data ? data.bairro : '';
                    inscricao.localidade = data ? data.localidade : '';
                    inscricao.uf = data ? data.uf : '';
                    inscricao.cep = data ? data.cep : '';
                    inscricao.endereco = data ? data.endereco : '';
                    inscricao.nome_no_cracha = data ? data.nome_no_cracha : '';
                    inscricao.categoria = data ? data.categoria : 'Estudante';
                    inscricao.curso_ou_formacao = data ? data.curso_ou_formacao : '';
                    inscricao.acronimo_da_instituicao_ou_empresa = data ? data.acronimo_da_instituicao_ou_empresa : '';
                    inscricao.nome_da_instituicao_ou_empresa = data ? data.nome_da_instituicao_ou_empresa : '';
                    return inscricao;
                },
                notifications = {
                    read: {
                        notifyReject: function notifyReject() {
                            notifier('Ocorreu um erro no carregamento desta inscrição. Por favor, tente novamente.', {
                                timeout: 10000,
                                type: 'danger'
                            });
                        },
                        notifyResolve: function notifyResolve(id) {
                            notifier('<strong>Sucesso!</strong> A inscrição I-' + id + ' foi carregada com sucesso.', {
                                location: 'topRight',
                                timeout: 5000,
                                type: 'success'
                            });
                        }
                    }
                },
                cache = simpleCache();
            inscricaoService.create = function create(inscricao, configuration) {
                return $http
                    .post('/api/inscricao', inscricao.format(true))
                    .then(
                        function resolve(value) {
                            return value.data;
                        },
                        function reject(reason) {
                            throw reason;
                        }
                    );
            };
            inscricaoService.read = function read(configuration) {
                if (typeof configuration === 'number') {
                    configuration = {
                        id: configuration
                    };
                }
                if (configuration.id) {
                    if (cache.match(configuration.id)) {
                        var q = $q.defer(),
                            entity = cache.get(configuration.id);
                        if (angular.isObject(entity)) {
                            q.resolve(entity);
                        } else {
                            q.reject(entity);
                        }
                        return q
                            .promise
                            .then(
                                function resolve(value) {
                                    if (configuration.notifyOnResolve) {
                                        notifications.read.notifyResolve(value.id);
                                    }
                                    return value;
                                },
                                function reject(reason) {
                                    if (configuration.notifyOnReject) {
                                        notifications.read.notifyReject();
                                    }
                                    throw reason;
                                }
                            );
                    }
                    return $http
                        .get('/api/inscricao/' + configuration.id)
                        .then(
                            function resolve(value) {
                                if (configuration.notifyOnResolve) {
                                    notifications.read.notifyResolve(value.data.id);
                                }
                                if (value.data.message) {
                                    return value.data;
                                }
                                return cache.put(inscricaoService(value.data).format());
                            },
                            function reject(reason) {
                                if (configuration.notifyOnReject) {
                                    notifications.read.notifyReject();
                                }
                                throw reason;
                            }
                        );
                }
                return $http
                    .get('/api/inscricao/')
                    .then(
                        function resolve(value) {
                            var inscricoes = [];
                            if (value.data.message) {
                                return value.data;
                            }
                            value.data.forEach(function forEach(element) {
                                // forEach(element, index, array)
                                var inscricao = inscricaoService(element).format();
                                inscricoes.push(inscricao);
                            });
                            return inscricoes;
                        },
                        function reject(reason) {
                            throw reason;
                        }
                    );
            };
            inscricaoService.update = function update(inscricao) {
                var id = inscricao.id;
                cache.empty();
                return $http
                    .put('/api/inscricao/' + id, inscricao.format(true))
                    .then(
                        function resolve(value) {
                            return id;
                        },
                        function reject(reason) {
                            throw reason;
                        }
                    );
            };
            inscricaoService.destroy = function destroy() {
                cache.empty();
            };
            return inscricaoService;
        }
    ]);
