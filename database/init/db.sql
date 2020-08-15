-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- ホスト: db
-- 生成日時: 2020 年 8 月 15 日 03:53
-- サーバのバージョン： 5.7.31
-- PHP のバージョン: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `remollege`
--
CREATE DATABASE IF NOT EXISTS `remollege` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `remollege`;

-- --------------------------------------------------------

--
-- テーブルの構造 `Chats`
--

CREATE TABLE `Chats` (
  `id` int(11) NOT NULL,
  `tableId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- テーブルのデータのダンプ `Chats`
--

INSERT INTO `Chats` (`id`, `tableId`, `userId`, `content`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 'ぴこぴこポンはおいしいね！', '2020-08-14 00:00:00', '2020-08-14 00:00:00'),
(2, 1, 4, 'ヤサイニンニクアブラ', '2020-08-14 13:57:57', '2020-08-14 13:57:57'),
(3, 1, 1, 'ヤサイマシマシニンニクマシマシアブラマシマシ', '2020-08-14 13:58:51', '2020-08-14 13:58:51'),
(4, 1, 1, 'ヤサイマシマシニンニクマシマシアブラマシマシ', '2020-08-14 15:21:11', '2020-08-14 15:21:11'),
(5, 1, 1, 'ヤサイマシマシニンニクマシマシアブラマシマシ', '2020-08-14 17:10:08', '2020-08-14 17:10:08');

-- --------------------------------------------------------

--
-- テーブルの構造 `Rooms`
--

CREATE TABLE `Rooms` (
  `id` int(11) NOT NULL,
  `buildingId` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- テーブルのデータのダンプ `Rooms`
--

INSERT INTO `Rooms` (`id`, `buildingId`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'ピコピコポン西早稲田店', '2020-08-14 00:00:00', '2020-08-14 00:00:00'),
(2, 1, 'ピコピコポン57号館店', '2020-08-15 00:00:00', '2020-08-15 00:00:00'),
(3, 1, 'ピコピコポン63号館店', '2020-08-15 00:00:00', '2020-08-15 00:00:00');

-- --------------------------------------------------------

--
-- テーブルの構造 `Tables`
--

CREATE TABLE `Tables` (
  `id` int(11) NOT NULL,
  `roomId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- テーブルのデータのダンプ `Tables`
--

INSERT INTO `Tables` (`id`, `roomId`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2020-08-14 00:00:00', '2020-08-14 00:00:00'),
(2, 1, '2020-08-15 00:00:00', '2020-08-15 00:00:00'),
(3, 1, '2020-08-15 00:00:00', '2020-08-15 00:00:00'),
(4, 2, '2020-08-15 00:00:00', '2020-08-15 00:00:00'),
(5, 2, '2020-08-15 00:00:00', '2020-08-15 00:00:00'),
(6, 3, '2020-08-15 00:00:00', '2020-08-15 00:00:00'),
(7, 3, '2020-08-15 00:00:00', '2020-08-15 00:00:00'),
(8, 3, '2020-08-15 00:00:00', '2020-08-15 00:00:00'),
(9, 2, '2020-08-15 00:00:00', '2020-08-15 00:00:00');

-- --------------------------------------------------------

--
-- テーブルの構造 `TablesUsers`
--

CREATE TABLE `TablesUsers` (
  `id` int(11) NOT NULL,
  `tableId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- テーブルのデータのダンプ `TablesUsers`
--

INSERT INTO `TablesUsers` (`id`, `tableId`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, '2020-08-15 00:00:00', '2020-08-15 00:00:00'),
(2, 2, 2, '2020-08-15 00:00:00', '2020-08-15 00:00:00'),
(3, 3, 3, '2020-08-15 00:00:00', '2020-08-15 00:00:00'),
(7, 1, 4, '2020-08-15 00:00:00', '2020-08-15 00:00:00'),
(8, 2, 5, '2020-08-15 00:00:00', '2020-08-15 00:00:00'),
(9, 3, 6, '2020-08-15 00:00:00', '2020-08-15 00:00:00'),
(10, 4, 7, '2020-08-15 00:00:00', '2020-08-15 00:00:00');

-- --------------------------------------------------------

--
-- テーブルの構造 `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- テーブルのデータのダンプ `Users`
--

INSERT INTO `Users` (`id`, `name`, `email`, `password`, `img`, `createdAt`, `updatedAt`) VALUES
(1, 'user', 'turunasi@ruri.waseda.jp', 'userpass', NULL, '2020-08-14 00:00:00', '2020-08-14 00:00:00'),
(2, '店長', 'pikopiko@gmai.com', 'userpass', NULL, '2020-08-15 00:00:00', '2020-08-15 00:00:00'),
(3, '関くん', 'pikopiko@gmail.com', 'userpass', NULL, '2020-08-15 00:00:00', '2020-08-15 00:00:00'),
(4, '西井', 'nishii@gmai.com', 'userpass', NULL, '2020-08-15 00:00:00', '2020-08-15 00:00:00'),
(5, '井上', 'inoue@gmai.com', 'userpass', NULL, '2020-08-15 00:00:00', '2020-08-15 00:00:00'),
(6, '平', 'taira@gmai.com', 'userpass', NULL, '2020-08-15 00:00:00', '2020-08-15 00:00:00'),
(7, '渡邉', 'watanabe@gmai.com', 'userpass', NULL, '2020-08-15 00:00:00', '2020-08-15 00:00:00');

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `Chats`
--
ALTER TABLE `Chats`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `Rooms`
--
ALTER TABLE `Rooms`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `Tables`
--
ALTER TABLE `Tables`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `TablesUsers`
--
ALTER TABLE `TablesUsers`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- ダンプしたテーブルのAUTO_INCREMENT
--

--
-- テーブルのAUTO_INCREMENT `Chats`
--
ALTER TABLE `Chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- テーブルのAUTO_INCREMENT `Rooms`
--
ALTER TABLE `Rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- テーブルのAUTO_INCREMENT `Tables`
--
ALTER TABLE `Tables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- テーブルのAUTO_INCREMENT `TablesUsers`
--
ALTER TABLE `TablesUsers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- テーブルのAUTO_INCREMENT `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
