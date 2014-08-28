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
                            '1': 'estudante',
                            '2': 'profissional',
                            '3': 'professor',
                            'estudante': 1,
                            'profissional': 2,
                            'professor': 3
                        },
                        sexo: {
                            '1': 'feminino',
                            '2': 'masculino',
                            '3': 'outro',
                            'feminino': 1,
                            'masculino': 2,
                            'outro': 3
                        },
                        grau_de_escolaridade: {
                            '1': 'fundamental',
                            '2': 'medio',
                            '3': 'superior_incompleto',
                            '4': 'superior_completo',
                            '5': 'pos_graduacao_latu_sensu',
                            '6': 'pos_graduacao_stricto_sensu',
                            '7': 'nenhum',
                            'fundamental': 1,
                            'medio': 2,
                            'superior_incompleto': 3,
                            'superior_completo': 4,
                            'pos_graduacao_latu_sensu': 5,
                            'pos_graduacao_stricto_sensu': 6,
                            'nenhum': 7
                        },
                        tipo_da_ultima_instituicao_de_ensino: {
                            '1': 'privada',
                            '2': 'publica',
                            'privada': 1,
                            'publica': 2
                        },
                        area_de_conhecimento_do_ultimo_curso: {
                            '1': 'artes',
                            '2': 'exatas',
                            '3': 'humanidades',
                            '4': 'saude',
                            '5': 'tecnologia',
                            '6': 'terra',
                            '7': 'nenhuma',
                            'artes': 1,
                            'exatas': 2,
                            'humanidades': 3,
                            'saude': 4,
                            'tecnologia': 5,
                            'terra': 6,
                            'nenhuma': 7
                        },
                        tipo_de_projeto_programa_acao: {
                            '1': 'academica',
                            '2': 'empresarial',
                            '3': 'nao_governamental',
                            '4': 'politica',
                            '5': 'nenhum',
                            'academica': 1,
                            'empresarial': 2,
                            'nao_governamental': 3,
                            'politica': 4,
                            'nenhum': 5
                        }
                    },
                    format: function format(toServer) {
                        this.categoria = this.options.categoria[this.categoria];
                        this.sexo = this.options.sexo[this.sexo];
                        if (typeof this.pessoa_com_deficiencia === 'number') {
                            if (this.pessoa_com_deficiencia) {
                                this.pessoa_com_deficiencia = 'true';
                            } else {
                                this.pessoa_com_deficiencia = 'false';
                            }
                        } else {
                            if (this.pessoa_com_deficiencia === 'true') {
                                this.pessoa_com_deficiencia === 0;
                            } else {
                                this.pessoa_com_deficiencia = 1;
                            }
                        }
                        // checkboxes para deficiências
                        if (this.deficiencia_auditiva === 0) {
                            this.deficiencia_auditiva = false;
                        } else {
                            if (this.deficiencia_auditiva === false) {
                                this.deficiencia_auditiva = 0;
                            }
                        }
                        if (this.deficiencia_motora === 0) {
                            this.deficiencia_motora = false;
                        } else {
                            if (this.deficiencia_motora === false) {
                                this.deficiencia_motora = 0;
                            }
                        }
                        if (this.deficiencia_visual === 0) {
                            this.deficiencia_visual = false;
                        } else {
                            if (this.deficiencia_visual === false) {
                                this.deficiencia_visual = 0;
                            }
                        }
                        this.grau_de_escolaridade = this.options.grau_de_escolaridade[this.grau_de_escolaridade];
                        this.tipo_da_ultima_instituicao_de_ensino = this.options.tipo_da_ultima_instituicao_de_ensino[this.tipo_da_ultima_instituicao_de_ensino];
                        this.area_de_conhecimento_do_ultimo_curso = this.options.area_de_conhecimento_do_ultimo_curso[this.area_de_conhecimento_do_ultimo_curso];
                        if (this.vii === 0) {
                            this.vii = false;
                        } else {
                            if (this.vii === false) {
                                this.vii = 0;
                            }
                        }
                        if (this.vi === 0) {
                            this.vi = false;
                        } else {
                            if (this.vi === false) {
                                this.vi = 0;
                            }
                        }
                        if (this.v === 0) {
                            this.v = false;
                        } else {
                            if (this.v === false) {
                                this.v = 0;
                            }
                        }
                        if (this.iv === 0) {
                            this.iv = false;
                        } else {
                            if (this.iv === false) {
                                this.iv = 0;
                            }
                        }
                        if (this.iii === 0) {
                            this.iii = false;
                        } else {
                            if (this.iii === false) {
                                this.iii = 0;
                            }
                        }
                        if (this.ii === 0) {
                            this.ii = false;
                        } else {
                            if (this.ii === false) {
                                this.ii = 0;
                            }
                        }
                        if (this.i === 0) {
                            this.i = false;
                        } else {
                            if (this.i === false) {
                                this.i = 0;
                            }
                        }
                        if (this.vii === 1) {
                            this.vii = true;
                        } else {
                            if (this.vii === true) {
                                this.vii = 1;
                            }
                        }
                        if (this.vi === 1) {
                            this.vi = true;
                        } else {
                            if (this.vi === true) {
                                this.vi = 1;
                            }
                        }
                        if (this.v === 1) {
                            this.v = true;
                        } else {
                            if (this.v === true) {
                                this.v = 1;
                            }
                        }
                        if (this.iv === 1) {
                            this.iv = true;
                        } else {
                            if (this.iv === true) {
                                this.iv = 1;
                            }
                        }
                        if (this.iii === 1) {
                            this.iii = true;
                        } else {
                            if (this.iii === true) {
                                this.iii = 1;
                            }
                        }
                        if (this.ii === 1) {
                            this.ii = true;
                        } else {
                            if (this.ii === true) {
                                this.ii = 1;
                            }
                        }
                        if (this.i === 1) {
                            this.i = true;
                        } else {
                            if (this.i === true) {
                                this.i = 1;
                            }
                        }
                        this.tipo_de_projeto_programa_acao = this.options.tipo_de_projeto_programa_acao[this.tipo_de_projeto_programa_acao];
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
                    inscricao.sexo = data ? data.sexo : 'feminino';
                    inscricao.email = data ? data.email : '';
                    inscricao.estrangeiro = data ? data.estrangeiro : false;
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
                    inscricao.categoria = data ? data.categoria : 'estudante';
                    inscricao.pessoa_com_deficiencia = data ? data.pessoa_com_deficiencia : 'false';
                    inscricao.deficiencia_auditiva = data ? data.deficiencia_auditiva : false;
                    inscricao.deficiencia_motora = data ? data.deficiencia_motora : false;
                    inscricao.deficiencia_visual = data ? data.deficiencia_visual : false;
                    inscricao.outras_deficiencias = data ? data.outras_deficiencias : '';
                    inscricao.grau_de_escolaridade = data ? data.grau_de_escolaridade : 'nenhum';
                    inscricao.nome_da_ultima_instituicao_de_ensino = data ? data.nome_da_ultima_instituicao_de_ensino : '';
                    inscricao.tipo_da_ultima_instituicao_de_ensino = data ? data.tipo_da_ultima_instituicao_de_ensino : 'privada';
                    inscricao.ultimo_curso = data ? data.ultimo_curso : '';
                    inscricao.area_de_conhecimento_do_ultimo_curso = data ? data.area_de_conhecimento_do_ultimo_curso : 'nenhuma';
                    inscricao.profissao = data ? data.profissao : '';
                    inscricao.empresa = data ? data.empresa : '';
                    inscricao.atividade = data ? data.atividade : '';
                    inscricao.cidade_de_nascimento = data ? data.cidade_de_nascimento : '';
                    inscricao.vii = data ? data.vii : false;
                    inscricao.vi = data ? data.vi : false;
                    inscricao.v = data ? data.v : false;
                    inscricao.iv = data ? data.iv : false;
                    inscricao.iii = data ? data.iii : false;
                    inscricao.ii = data ? data.ii : false;
                    inscricao.i = data ? data.i : false;
                    inscricao.tipo_de_projeto_programa_acao = data ? data.tipo_de_projeto_programa_acao : 'nenhum';
                    inscricao.blog_site_perfil = data ? data.blog_site_perfil : '';
                    inscricao.status = data ? data.status : 0;
                    inscricao.valor = data ? data.valor : '';
                    inscricao.data = data ? data.data : '';
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
                        },
                        notifyUnauthorized: function notifyUnauthorized() {
                            notifier('Esta inscrição não existe ou seu usuário não tem permissão para acessá-la.', {
                                timeout: 10000,
                                type: 'danger'
                            });
                        }
                    }
                },
                rejectionHandlers = {
                    readOne: function readOneRejectionHandler(reason, configuration) {
                        if (
                            configuration.notifyOnUnauthorized
                                && reason.status === 401
                        ) {
                            notifications.read.notifyUnauthorized();
                            throw reason;
                        }
                        if (configuration.notifyOnReject) {
                            notifications.read.notifyReject();
                            throw reason;
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
                                    rejectionHandlers.readOne(reason, configuration);
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
                                rejectionHandlers.readOne(reason, configuration);
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
            inscricaoService.readIsentos = function readIsentos() {
                return $http
                    .get('/api/inscricao/isentos')
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
            inscricaoService.readNaoPagos = function readIsentos() {
                return $http
                    .get('/api/inscricao/naopagos')
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
            inscricaoService.readPagos = function readPagos() {
                return $http
                    .get('/api/inscricao/pagos')
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
            inscricaoService.confirmar = function confirmar(id, valor) {
                return $http
                    .post('/api/pagamento/status/', {
                        id: id,
                        valor: valor
                    })
                    .then(
                        function resolve(value) {
                            console.log(value)
                        },
                        function reject(reason) {
                            console.log(reason)
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
