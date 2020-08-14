-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- ホスト: db
-- 生成日時: 2020 年 8 月 14 日 19:30
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

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `Rooms`
--
ALTER TABLE `Rooms`
  ADD PRIMARY KEY (`id`);

--
-- ダンプしたテーブルのAUTO_INCREMENT
--

--
-- テーブルのAUTO_INCREMENT `Rooms`
--
ALTER TABLE `Rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
