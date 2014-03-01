SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `anzol15` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `anzol15` ;

-- -----------------------------------------------------
-- Table `anzol15`.`sexo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `anzol15`.`sexo` ;

CREATE TABLE IF NOT EXISTS `anzol15`.`sexo` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(512) NULL,
  `__status__` TINYINT(1) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `anzol15`.`categoria`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `anzol15`.`categoria` ;

CREATE TABLE IF NOT EXISTS `anzol15`.`categoria` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(512) NULL,
  `__status__` TINYINT(1) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `anzol15`.`inscricao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `anzol15`.`inscricao` ;

CREATE TABLE IF NOT EXISTS `anzol15`.`inscricao` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome_completo` VARCHAR(256) NULL,
  `data_de_nascimento` DATE NULL,
  `sexo` INT UNSIGNED NOT NULL,
  `email` VARCHAR(256) NULL,
  `cpf` VARCHAR(11) NULL,
  `nome_do_documento` VARCHAR(128) NULL,
  `numero_do_documento` VARCHAR(64) NULL,
  `telefones` VARCHAR(128) NULL,
  `logradouro` VARCHAR(256) NULL,
  `numero` VARCHAR(8) NULL,
  `complemento` VARCHAR(128) NULL,
  `bairro` VARCHAR(128) NULL,
  `localidade` VARCHAR(128) NULL,
  `uf` VARCHAR(2) NULL,
  `cep` VARCHAR(8) NULL,
  `endereco` VARCHAR(512) NULL,
  `nome_no_cracha` VARCHAR(256) NULL,
  `categoria` INT UNSIGNED NOT NULL,
  `curso_ou_formacao` VARCHAR(256) NULL,
  `acronimo_da_instituicao_ou_empresa` VARCHAR(64) NULL,
  `nome_da_instituicao_ou_empresa` VARCHAR(256) NULL,
  `__status__` TINYINT(1) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_inscricao_sexo_idx` (`sexo` ASC),
  INDEX `fk_inscricao_categoria1_idx` (`categoria` ASC),
  CONSTRAINT `fk_inscricao_sexo`
    FOREIGN KEY (`sexo`)
    REFERENCES `anzol15`.`sexo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_inscricao_categoria1`
    FOREIGN KEY (`categoria`)
    REFERENCES `anzol15`.`categoria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `anzol15`.`sexo`
-- -----------------------------------------------------
START TRANSACTION;
USE `anzol15`;
INSERT INTO `anzol15`.`sexo` (`id`, `nome`, `__status__`) VALUES (1, 'Feminino', 1);
INSERT INTO `anzol15`.`sexo` (`id`, `nome`, `__status__`) VALUES (2, 'Masculino', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `anzol15`.`categoria`
-- -----------------------------------------------------
START TRANSACTION;
USE `anzol15`;
INSERT INTO `anzol15`.`categoria` (`id`, `nome`, `__status__`) VALUES (1, 'Estudante', 1);
INSERT INTO `anzol15`.`categoria` (`id`, `nome`, `__status__`) VALUES (2, 'Profissional', 1);

COMMIT;

