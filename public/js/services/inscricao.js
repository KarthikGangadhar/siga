angular
    .module('main')
    .factory('inscricao', [
        '$http',
        '$q',
        'simpleCache',
        function inscricaoFactory(
            $http,
            $q,
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
                inscricao = function inscricao(data) {
                    var novaInscricao = Object.create(inscricaoPrototype);
                    novaInscricao.id = data ? data.id : 0;
                    novaInscricao.nome_completo = data ? data.nome_completo : '';
                    novaInscricao.data_de_nascimento = data ? data.data_de_nascimento : '';
                    novaInscricao.sexo = data ? data.sexo : 'Feminino';
                    novaInscricao.email = data ? data.email : '';
                    novaInscricao.cpf = data ? data.cpf : '';
                    novaInscricao.estrangeiro = data ? data.estrangeiro : '';
                    novaInscricao.telefones = data ? data.telefones : '';
                    novaInscricao.codigo_internacional_1 = data ? data.codigo_internacional_1 : '55';
                    novaInscricao.codigo_nacional_1 = data ? data.codigo_nacional_1 : '';
                    novaInscricao.numero_1 = data ? data.numero_1 : '';
                    novaInscricao.codigo_internacional_2 = data ? data.codigo_internacional_2 : '55';
                    novaInscricao.codigo_nacional_2 = data ? data.codigo_nacional_2 : '';
                    novaInscricao.numero_2 = data ? data.numero_2 : '';
                    novaInscricao.codigo_internacional_3 = data ? data.codigo_internacional_3 : '55';
                    novaInscricao.codigo_nacional_3 = data ? data.codigo_nacional_3 : '';
                    novaInscricao.numero_3 = data ? data.numero_3 : '';
                    novaInscricao.logradouro = data ? data.logradouro : '';
                    novaInscricao.numero = data ? data.numero : '';
                    novaInscricao.complemento = data ? data.complemento : '';
                    novaInscricao.bairro = data ? data.bairro : '';
                    novaInscricao.localidade = data ? data.localidade : '';
                    novaInscricao.uf = data ? data.uf : '';
                    novaInscricao.cep = data ? data.cep : '';
                    novaInscricao.nome_no_cracha = data ? data.nome_no_cracha : '';
                    novaInscricao.categoria = data ? data.categoria : 'Estudante';
                    novaInscricao.curso_ou_formacao = data ? data.curso_ou_formacao : '';
                    novaInscricao.acronimo_da_instituicao_ou_empresa = data ? data.acronimo_da_instituicao_ou_empresa : '';
                    novaInscricao.nome_da_instituicao_ou_empresa = data ? data.nome_da_instituicao_ou_empresa : '';
                    return novaInscricao;
                },
                cache = simpleCache();
            inscricao.create = function create(inscricao) {
                return $http
                    .post('/api/inscricao', inscricao.format(true))
                    .then(
                        function resolve(value) {
                            return value.data.insertId;
                        },
                        function reject(reason) {
                            throw reason;
                        }
                    );
            };
            inscricao.read = function read(id) {
                if (id) {
                    if (cache.match(id)) {
                        var q = $q.defer(),
                            entity = cache.get(id);
                        if (angular.isObject(entity)) {
                            q.resolve(entity);
                        } else {
                            q.reject(entity);
                        }
                        return q
                            .promise
                            .then(
                                function resolve(value) {
                                    return value;
                                },
                                function reject(reason) {
                                    throw reason;
                                }
                            );
                    }
                    return $http
                        .get('/api/inscricao/' + id)
                        .then(
                            function resolve(value) {
                                var novaInscricao = inscricao(value.data).format();
                                return cache.put(novaInscricao);
                            },
                            function reject(reason) {
                                throw reason;
                            }
                        );
                }
                return $http
                    .get('/api/inscricao/')
                    .then(
                        function resolve(value) {
                            var inscricoes = [];
                            value.data.forEach(function forEach(element) {
                                // forEach(element, index, array)
                                var novaInscricao = inscricao(element).format();
                                inscricoes.push(novaInscricao);
                            });
                            return inscricoes;
                        },
                        function reject(reason) {
                            throw reason;
                        }
                    );
            };
            inscricao.update = function update(inscricao) {
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
            inscricao.destroy = function destroy() {
                cache.empty();
            };
            return inscricao;
        }
    ]);
