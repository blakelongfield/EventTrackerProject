-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema workouttrackerdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `workouttrackerdb` ;

-- -----------------------------------------------------
-- Schema workouttrackerdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `workouttrackerdb` DEFAULT CHARACTER SET utf8 ;
USE `workouttrackerdb` ;

-- -----------------------------------------------------
-- Table `workout`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `workout` ;

CREATE TABLE IF NOT EXISTS `workout` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  `duration` INT NOT NULL,
  `exercise` VARCHAR(45) NOT NULL,
  `calories_burned` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS user@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'user'@'localhost' IDENTIFIED BY 'user';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'user'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `workout`
-- -----------------------------------------------------
START TRANSACTION;
USE `workouttrackerdb`;
INSERT INTO `workout` (`id`, `type`, `duration`, `exercise`, `calories_burned`) VALUES (1, 'Strength', 75, 'Lifting Weights', 500);
INSERT INTO `workout` (`id`, `type`, `duration`, `exercise`, `calories_burned`) VALUES (2, 'Aerobic', 60, 'Treadmill', 750);
INSERT INTO `workout` (`id`, `type`, `duration`, `exercise`, `calories_burned`) VALUES (3, 'Flexibility', 30, 'Stretching', 250);
INSERT INTO `workout` (`id`, `type`, `duration`, `exercise`, `calories_burned`) VALUES (4, 'Balance', 45, 'Yoga', 150);

COMMIT;

