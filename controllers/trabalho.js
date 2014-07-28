'use strict';
module.exports = function sessionController(models, app, logbook) {
    var fs = require('fs'),
        trabalhos = require('../settings').trabalhos,
        moment = require('moment'),
        nodemailer = require('nodemailer'),
        usuario = models.usuario;
    app.get('/api/trabalho', function (request, response) {
        // function (request, response, next)
        response.send(200);
    });
    app.post('/api/trabalho', function (request, response) {
        var entregaEncerrada = moment()
                .utc()
                .subtract('hours', 3)
                .isAfter(trabalhos.limite),
            fileType = request.files.file.type;
        if (entregaEncerrada) {
            response.send(410);
            logbook.error('Tentativa de envio de arquivo após o encerramento das submissões');
            return;
        }
        if (!request.authentication.inscricao) {
            response.send(500);
            logbook.error('Ouve uma tentativa de submissão não autenticada ou sem inscrição realizada');
        }
        if (
            trabalhos.tiposAceitos.indexOf(fileType) === -1
        ) {
        // if (
        //     fileType !== 'application/msword' &&
        //         fileType !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
        //         fileType !== 'application/octet-stream' &&
        //         // permitindo pdfs!
        //         fileType !== 'application/pdf'
        // ) {
            response.send(500);
            logbook.error('Submissão de arquivo em formato inválido: ' + fileType);
            return;
        }
        fs.readFile(request.files.file.path, function (error, data) {
            var smtpTransport = nodemailer.createTransport('SMTP', {
                    service: 'Gmail',
                    auth: {
                        user: trabalhos.email,
                        pass: trabalhos.password
                    }
                }),
                mensagemDeAtencao = '\n\n\nAtenção, este e-mail foi enviado automaticamente. Não o responda. Em caso dúvidas ou quaisquer outras questões entre em contato com o administrador do sistema.';
            if (error) {
                response.send(500);
                logbook.error('Ocorreu o seguinte erro na leitura do arquivo submetido: ', error);
            }
            smtpTransport.sendMail({
                from: 'Trabalhos <' + trabalhos.email + '>',
                to: trabalhos.destino,
                subject: 'Trabalho submetido por ' + request.authentication.email,
                text: 'Em anexo o trabalho submetido por ' + request.authentication.email + mensagemDeAtencao,
                attachments: [{
                    fileName: request.files.file.originalFilename,
                    contents: data
                }]
            }, function sendMailHandler(error) {
                if (error) {
                    response.send(500);
                    logbook.error('Ocorreu o seguinte erro no envio do trabalho submetido: ', error);
                } else {
                    response.send(200);
                    smtpTransport.sendMail({
                        from: 'Trabalhos <' + trabalhos.email + '>',
                        to: request.authentication.email,
                        subject: trabalhos.subject,
                        text: 'Seu trabalho (no arquivo ' + request.files.file.originalFilename + ') foi enviado aos avaliadores!\nObrigado!' + mensagemDeAtencao
                    }, function (error) {
                        if (error) {
                            logbook.error('Ocorreu o seguinte erro no envio do e-mail de confirmação para o usuário ' + request.authentication.email, error);
                        }
                    });
                }
            });
        });
    });
};
