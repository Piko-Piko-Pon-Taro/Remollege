-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- ホスト: db
-- 生成日時: 2020 年 9 月 01 日 15:16
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
(1, 1, 'ピコピコポン53号館店', '2020-08-14 00:00:00', '2020-08-14 00:00:00'),
(2, 2, 'ピコピコポン54号館店', '2020-08-15 00:00:00', '2020-08-15 00:00:00'),
(3, 3, 'ピコピコポン55号館店', '2020-08-15 00:00:00', '2020-08-15 00:00:00'),
(4, 1, 'ラーメン荘 夢を語れ 53号館店', '2020-09-02 00:11:32', '2020-09-02 00:11:32'),
(5, 2, 'ラーメン荘 夢を語れ 54号館店', '2020-09-02 00:15:20', '2020-09-02 00:15:20'),
(6, 3, 'ラーメン荘 夢を語れ 55号館店', '2020-09-02 00:15:20', '2020-09-02 00:15:20'),
(7, 4, 'ラーメン荘 夢を語れ 56号館店', '2020-09-02 00:15:20', '2020-09-02 00:15:20'),
(8, 1, 'ラーメン二郎 53号館店', '2020-09-02 00:15:20', '2020-09-02 00:15:20'),
(9, 2, 'ラーメン二郎 54号館店', '2020-09-02 00:15:20', '2020-09-02 00:15:20'),
(10, 3, 'ラーメン二郎 55号館店', '2020-09-02 00:15:20', '2020-09-02 00:15:20'),
(11, 4, 'ラーメン二郎 56号館店', '2020-09-02 00:15:20', '2020-09-02 00:15:20'),
(12, 1, '天下一品 53号館店', '2020-09-02 00:15:20', '2020-09-02 00:15:20'),
(13, 2, '天下一品 54号館店', '2020-09-02 00:15:20', '2020-09-02 00:15:20'),
(14, 3, '天下一品 55号館店', '2020-09-02 00:15:20', '2020-09-02 00:15:20'),
(15, 4, '天下一品 56号館店', '2020-09-02 00:15:20', '2020-09-02 00:15:20'),
(16, 1, '立ち食いパスタ アッパーカット 53号館店', '2020-09-02 00:15:20', '2020-09-02 00:15:20'),
(17, 1, '立ち食いパスタ アッパーカット 54号館店', '2020-09-02 00:15:20', '2020-09-02 00:15:20'),
(18, 1, '立ち食いパスタ アッパーカット 55号館店', '2020-09-02 00:15:20', '2020-09-02 00:15:20'),
(19, 1, '立ち食いパスタ アッパーカット 56号館店', '2020-09-02 00:15:20', '2020-09-02 00:15:20');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
