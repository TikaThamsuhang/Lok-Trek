-- phpMyAdmin SQL Dump
-- Fixed Departures Schema for Lok Treks Nepal

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+05:45";

-- --------------------------------------------------------

--
-- Table structure for table `fixed_departures`
--

CREATE TABLE `fixed_departures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `trek_id` varchar(100) NOT NULL,
  `trek_name` varchar(255) NOT NULL,
  `trek_url` varchar(255) NOT NULL,
  `category` enum('Trekking','Ascension','Safari','Tour') NOT NULL,
  `duration` varchar(50) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `departure_date` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `order_index` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `trek_id` (`trek_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fixed_departures`
--

INSERT INTO `fixed_departures` (`trek_id`, `trek_name`, `trek_url`, `category`, `duration`, `image_url`, `departure_date`, `is_active`, `order_index`) VALUES
-- TREKKING (Short)
('langtang-valley', 'Vallée du Langtang', 'treks/trek-detail-langtang-valley.html', 'Trekking', '8 jours', 'assets/images/Langtang Valley/Langtang Valley-1.jpeg', NULL, 0, 10),
('pikey-peak', 'Pikey Peak', 'treks/trek-detail-pikey-peak.html', 'Trekking', '4-7 jours', 'assets/images/Pikey Peak/Pikey Peak-1.jpeg', NULL, 0, 11),
('mardi-himal', 'Mardi Himal', 'treks/trek-detail-mardi-himal.html', 'Trekking', '5-7 jours', 'assets/images/Mardi Himal/Mardi Himal-1.jpeg', NULL, 0, 12),
('poon-hill', 'Poon Hill', 'treks/trek-detail-poon-hill.html', 'Trekking', '6 jours', 'assets/images/Poon Hill/Poon Hill-1.jpeg', NULL, 0, 13),
('abc', 'Camp de Base de l\'Annapurna', 'treks/trek-detail-abc.html', 'Trekking', '6 jours', 'assets/images/Annapurna Base Camp/ABC-1.jpeg', '5 Avr – 16 Avr 2026', 1, 14),

-- TREKKING (Long)
('annapurna-circuit-tilicho', 'Circuit des Annapurnas & Lac Tilicho', 'treks/trek-detail-annapurna-circuit-tilicho.html', 'Trekking', '12 jours', 'assets/images/Tilicho Lake/Tilicho Lake-1.jpeg', '3 Mai – 13 Mai 2026', 1, 20),
('manaslu', 'Trek du Manaslu', 'treks/trek-detail-manaslu.html', 'Trekking', '12 jours', 'assets/images/Manaslu/Manaslu-1.jpeg', NULL, 0, 21),
('manaslu-tsum', 'Manaslu & Vallée de Tsum', 'treks/trek-detail-manaslu-tsum.html', 'Trekking', '18 jours', 'assets/images/Manaslu - Tsum Valley/Mansalu-Tsum Valley-1.jpeg', NULL, 0, 22),
('mustang', 'Haut Mustang', 'treks/trek-detail-mustang.html', 'Trekking', '14 jours', 'assets/images/Mustang/Mustang-1.jpeg', NULL, 0, 23),
('gosaikunda-langtang', 'Gosaikunda & Langtang', 'treks/trek-detail-gosaikunda-langtang.html', 'Trekking', '13 jours', 'assets/images/Sacred Gosaikunda Lake & Langtang Valley/Sacred Gosaikunda Lake & Langtang Valley-1.jpeg', NULL, 0, 24),
('kanchenjunga', 'Kanchenjunga', 'treks/trek-detail-kanchenjunga.html', 'Trekking', '18 jours', 'assets/images/Kanchenjunga/Kanchenjunga-1.jpeg', NULL, 0, 25),
('everest-gokyo', 'Camp de Base de l\'Everest via Gokyo', 'treks/trek-detail-everest-gokyo.html', 'Trekking', '15 jours', 'assets/images/Everest Base Camp/Everest Base Camp-1.jpeg', '12 Août – 25 Août 2026', 1, 26),
('three-passes', 'Les Trois Cols', 'treks/trek-detail-three-passes.html', 'Trekking', '18 jours', 'assets/images/Three Passes/Three Passes-1.jpeg', NULL, 0, 27),
('poon-hill-abc', 'Poon Hill & Camp de Base de l\'Annapurna', 'treks/trek-detail-poon-hill-abc.html', 'Trekking', '11 jours', 'assets/images/Poon Hill - Annapurna/Poon Hill - Annapurna-1.jpeg', NULL, 0, 28),

-- ASCENSION
('island-peak', 'Island Peak', 'ascension/island-peak.html', 'Ascension', '16 jours', 'assets/images/Island Peak/Island Peak-1.jpeg', NULL, 0, 30),
('mera-peak', 'Mera Peak', 'ascension/mera-peak.html', 'Ascension', '15 jours', 'assets/images/Mera Peak/Mera Peak-1.jpeg', '20 Avr – 2 Mai 2026', 1, 31),
('lobuche-peak', 'Lobuche Peak', 'ascension/lobuche-peak.html', 'Ascension', '14 jours', 'assets/images/Lobuche Peak/Lobuche Peak-1.jpeg', NULL, 0, 32),

-- SAFARI
('chitwan', 'Parc National de Chitwan', 'safari/chitwan-jungle-safari.html', 'Safari', '3 jours', 'assets/images/Chitwan National Park/Chitwan National Park-1.jpeg', NULL, 0, 40),
('bardia', 'Parc National de Bardiya', 'safari/bardia-national-park-safari.html', 'Safari', '4 jours', 'assets/images/Bardia (Bardiya) National Park/Bardiya National Park-1.jpeg', NULL, 0, 41),

-- TOURS
('complete-nepal', 'Circuit Népal Complet', 'tours/complete-nepal-tour.html', 'Tour', '10 jours', 'assets/images/Complete Nepal/Complete Nepal Tour-1.jpeg', NULL, 0, 50);

COMMIT;
('pikey-peak', 'Pikey Peak', 'treks/trek-detail-pikey-peak.html', 'Trekking', '4-7 jours', 'assets/images/pikey peak/Pikey Peak-1.jpeg', NULL, 0, 11),
('mardi-himal', 'Mardi Himal', 'treks/trek-detail-mardi-himal.html', 'Trekking', '5-7 jours', 'assets/images/Mardi Himal Trek/Mardi-himal-trek-1.jpeg', NULL, 0, 12),
('poon-hill', 'Poon Hill', 'treks/trek-detail-poon-hill.html', 'Trekking', '6 jours', 'assets/images/Ghorepani Poon Hill Trek/Ghorepani Poon Hill-1.jpeg', NULL, 0, 13),
('abc', 'Camp de Base de l\'Annapurna', 'treks/trek-detail-abc.html', 'Trekking', '6 jours', 'assets/images/Annapurna Base Camp/ABC-1.jpeg', '5 Avr – 16 Avr 2026', 1, 14),

-- TREKKING (Long)
('annapurna-circuit-tilicho', 'Circuit des Annapurnas & Lac Tilicho', 'treks/trek-detail-annapurna-circuit-tilicho.html', 'Trekking', '12 jours', 'assets/images/Annapurna Circuit with Tilicho Lake/Annapurna Circuit with Tilicho Lake-1.jpeg', '3 Mai – 13 Mai 2026', 1, 20),
('manaslu', 'Trek du Manaslu', 'treks/trek-detail-manaslu.html', 'Trekking', '12 jours', 'assets/images/Manaslu Circuit Trek/Manaslu Circuit Trek-1.jpeg', NULL, 0, 21),
('manaslu-tsum', 'Manaslu & Vallée de Tsum', 'treks/trek-detail-manaslu-tsum.html', 'Trekking', '18 jours', 'assets/images/Manaslu with Tsum Valley/Manaslu Tsum Vally.jpeg', NULL, 0, 22),
('mustang', 'Haut Mustang', 'treks/trek-detail-mustang.html', 'Trekking', '14 jours', 'assets/images/Mustang/Mustang-1.jpeg', NULL, 0, 23),
('gosaikunda-langtang', 'Gosaikunda & Langtang', 'treks/trek-detail-gosaikunda-langtang.html', 'Trekking', '13 jours', 'assets/images/Gosaikunde and Langtang/Gosaikunda and Langtang-1.jpeg', NULL, 0, 24),
('kanchenjunga', 'Kanchenjunga', 'treks/trek-detail-kanchenjunga.html', 'Trekking', '18 jours', 'assets/images/Kanchenjunga/Kanchenjunga-1.jpeg', NULL, 0, 25),
('everest-gokyo', 'Camp de Base de l\'Everest via Gokyo', 'treks/trek-detail-everest-gokyo.html', 'Trekking', '15 jours', 'assets/images/Everest Base Camp with Gokyo Lake/Everest Base Camp with Gokyo Lake-1.jpeg', '12 Août – 25 Août 2026', 1, 26),
('three-passes', 'Les Trois Cols', 'treks/trek-detail-three-passes.html', 'Trekking', '18 jours', 'assets/images/Three Passes Trek/Three Passes Trek-1.jpeg', NULL, 0, 27),
('poon-hill-abc', 'Poon Hill & Camp de Base de l\'Annapurna', 'treks/trek-detail-poon-hill-abc.html', 'Trekking', '11 jours', 'assets/images/PoonHll With ABC/PoonHll With ABC-1.jpeg', NULL, 0, 28),

-- ASCENSION
('island-peak', 'Island Peak', 'ascension/island-peak.html', 'Ascension', '16 jours', 'assets/images/Island Peak/Island Peak.jpeg', NULL, 0, 30),
('mera-peak', 'Mera Peak', 'ascension/mera-peak.html', 'Ascension', '15 jours', 'assets/images/Mera Peak/Mera Peak-1.jpeg', '20 Avr – 2 Mai 2026', 1, 31),
('lobuche-peak', 'Lobuche Peak', 'ascension/lobuche-peak.html', 'Ascension', '14 jours', 'assets/images/lobuche peak/Lobuche Peak Expedition.jpeg', NULL, 0, 32),

-- SAFARI
('chitwan', 'Parc National de Chitwan', 'safari/chitwan-jungle-safari.html', 'Safari', '3 jours', 'assets/images/Chitwan/Chitwan national park (4).jpg', NULL, 0, 40),
('bardia', 'Parc National de Bardiya', 'safari/bardia-national-park-safari.html', 'Safari', '4 jours', 'assets/images/Bardia/Bardia Jungle Safari (2).webp', NULL, 0, 41),

-- TOURS
('complete-nepal', 'Circuit Népal Complet', 'tours/complete-nepal-tour.html', 'Tour', '10 jours', 'assets/images/Kathmandu Pokhara Chitwan/Kathmandu Pokhara chitwan tours (4).jpg', NULL, 0, 50);

COMMIT;
