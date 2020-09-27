/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : mi

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2020-09-27 11:25:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` bigint(11) NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'min123', '13859409603', '123456');
INSERT INTO `user` VALUES ('2', 'root123', '15159409202', '123456');
INSERT INTO `user` VALUES ('5', '16da63dd73c1ef457f42a02ad8ba1b32', '15694258495', '123123');
INSERT INTO `user` VALUES ('6', '88d13ffa3a2446afa2623bae83317578', '16658949523', '123123');
INSERT INTO `user` VALUES ('7', '68cffb697a0bf86806813afc38daf429', '15694254125', '123123');
INSERT INTO `user` VALUES ('8', 'ab6b3adff744bf0117ccc2de72186d56', '16569421548', '123123');
INSERT INTO `user` VALUES ('9', 'roo6666', '15694964544', 'fd2db7289a555783224310ebb8f4a537');
INSERT INTO `user` VALUES ('10', 'lay123', '13569545895', 'c8609f71301a7af2300cfce3d3552a75');
INSERT INTO `user` VALUES ('11', 'root3131', '15566552111', 'fd2db7289a555783224310ebb8f4a537');
INSERT INTO `user` VALUES ('12', 'root3131', '15566552111', 'fd2db7289a555783224310ebb8f4a537');
INSERT INTO `user` VALUES ('13', 'root1231', '15415151555', 'fd2db7289a555783224310ebb8f4a537');
