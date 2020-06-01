# ************************************************************
# Sequel Pro SQL dump
# Version 5446
#
# https://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: eu-cdbr-west-03.cleardb.net (MySQL 5.6.47-log)
# Database: heroku_84307c819dbbcaf
# Generation Time: 2020-06-01 13:05:14 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table albums
# ------------------------------------------------------------

DROP TABLE IF EXISTS `albums`;

CREATE TABLE `albums` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `albums` WRITE;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;

INSERT INTO `albums` (`id`, `title`, `user_id`)
VALUES
	(11,'Selfies',11),
	(41,'Food',5),
	(61,'Book Cover',21),
	(71,'Press Photos',21);

/*!40000 ALTER TABLE `albums` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table albums_photos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `albums_photos`;

CREATE TABLE `albums_photos` (
  `album_id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `albums_photos` WRITE;
/*!40000 ALTER TABLE `albums_photos` DISABLE KEYS */;

INSERT INTO `albums_photos` (`album_id`, `photo_id`)
VALUES
	(11,31),
	(11,41),
	(11,31),
	(11,41),
	(11,61),
	(61,101),
	(61,111),
	(61,121),
	(71,141),
	(71,151);

/*!40000 ALTER TABLE `albums_photos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table photos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;

INSERT INTO `photos` (`id`, `title`, `url`, `comment`, `user_id`)
VALUES
	(24,'osaka','https://images.unsplash.com/photo-1590559899731-a382839e5549?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80','',5),
	(25,'Banh Mi Vendor','https://images.unsplash.com/photo-1562147600-ee6e0707973b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80','',6),
	(31,'Me','https://i.pinimg.com/originals/76/40/0b/76400bc52b3d51bd22d6d3c754307288.jpg','',11),
	(41,'Cloud','https://cdn11.bigcommerce.com/s-1vu4fom/images/stencil/1280x1280/products/2034/4329/Sailor_Moon_8__15879.1558562775.jpg?c=2&imbypass=on','',11),
	(61,'Artistic','https://i.pinimg.com/originals/18/2e/7f/182e7ffba3eff5b1a71b1e34bf878331.jpg','',11),
	(71,'ny bild','https://images.unsplash.com/photo-1590559899731-a382839e5549?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80','',5),
	(91,'hej hej','https://images.unsplash.com/photo-1590559899731-a382839e5549?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80','',5),
	(101,'Sister Outsider','https://images-na.ssl-images-amazon.com/images/I/71jFMZoAgdL.jpg','',21),
	(111,'Your Silence Will Not Protect You','https://images-na.ssl-images-amazon.com/images/I/31trrFkrMzL._SX326_BO1,204,203,200_.jpg','',21),
	(121,'Zami: A New Spelling of My Name','https://images-na.ssl-images-amazon.com/images/I/81RH1-h7qWL.jpg','',21),
	(141,'Author photo','https://www.modernista.se/sites/default/files/forfattare/audre_lorde1.jpg','',21),
	(151,'Look into camera','https://www.thoughtco.com/thmb/qQbbuVt7SSTUnn5p9Rd78x2ygX4=/1872x1404/smart/filters:no_upscale()/GettyImages-694880169x-58bd8eda5f9b58af5cd1923a.jpg','',21);

/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `last_name`)
VALUES
	(5,'goku@dragonball.inc','$2b$10$qhTvePUYu0fOOxFQ1Q129uA9qznEcwrEVDoR9X07W0zI7Rj1ee9P6','Goku','Son'),
	(6,'myna.do@mahoyo.com','$2b$10$LZemBZn4/7sh7APNj/zOC.euwV/z4sN2tGJ0wUGlgAGOUkQtJkYjO','MyNa','Do'),
	(11,'mercury@sailor-moon.com','$2b$10$CQ00q7qix9SyD56wtbKhCeRAEgeCQ5Anxvlfw9yz52oEiYNCKBn4m','Ami','Mizuno'),
	(21,'audre@lordeuniversity.com','$2b$10$wuFE/7Q7MSZZVIVrk1tpG.CU6.W6WsfbU0f4tIDH250lmXGIT6B26','Audre','Lorde');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
