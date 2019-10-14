SET IDENTITY_INSERT Categories ON

INSERT INTO Categories (Id, Code, Name)
  VALUES
  (1, N'K000001', N'Видеокамеры'),
  (2, N'K000002', N'Фотоаппараты'),
  (3, N'K000003', N'Объективы'),
  (4, N'K000004', N'Карты памяти'),
  (5, N'K000005', N'Вспышки'),
  (6, N'K000006', N'Накамерный свет'),
  (7, N'K000007', N'Светофильтры'),
  (8, N'K000008', N'Штативы'),
  (9, N'K000009', N'Стабилизаторы (Стедикамы)'),
  (10, N'K000010', N'Цифровые фоторамки');


SET IDENTITY_INSERT Categories OFF

SET IDENTITY_INSERT Products ON

INSERT INTO Products (Id, Code, Name, CategoryId) VALUES
  (1, N'Т000000001', N'GoPro HERO 7 Black', 1),
  (2, N'Т000000002', N'DJI Osmo Action', 1),
  (3, N'Т000000003', N'Sony FDR-X3000', 1),
  (4, N'Т000000004', N'Canon EOS 4000D Kit 18-55', 2),
  (5, N'Т000000005', N'Canon PowerShot SX420 IS', 2),
  (6, N'Т000000006', N'Canon EOS 200D Kit 18-55', 2),
  (7, N'Т000000007', N'Canon EF 50mm f/1.8', 3),
  (8, N'Т000000008', N'Nikon 50mm f/1.8G AF-S Nikkor', 3),
  (9, N'Т000000009', N'Canon EF-S 55-250mm f/4-5.6 IS STM', 3),
  (10, N'Т00000010', N'Samsung Evo Plus microSDXC Class 10 UHS-I U3 64Gb', 4),
  (11, N'Т000000011', N'Transcend 300S microSDHC Class 10 UHS-I 32Gb', 4),
  (12, N'Т000000012', N'Transcend 300S microSDXC Class 10 UHS-I 64Gb', 4),
  (13, N'Т000000013', N'Meike MK-930II', 5),
  (14, N'Т000000014', N'Godox SK-300 II', 5),
  (15, N'Т000000015', N'Canon Speedlite 430EX II', 5),
  (16, N'Т000000016', N'Godox LED 36', 6),
  (17, N'Т000000017', N'Laowa LED Ring Light of Ultra-Macro', 6),
  (18, N'Т000000018', N'Xiaomi Selfie Light Clip White (YMBGD001)', 6),
  (19, N'Т000000019', N'Фильтр Digi-Optic UV 27mm', 7),
  (20, N'Т000000020', N'Фильтр Digi-Optic UV 30mm', 7),
  (21, N'Т000000021', N'Бленда Extradigital ES-62 (LHC3701)', 7),
  (22, N'Т000000022', N'Xiaomi Mi Selfie Stick трипод', 8),
  (23, N'Т000000023', N'Blitzwolf BW-BS3', 8),
  (24, N'Т000000024', N'Xiaomi Selfie Stick монопод', 8),
  (25, N'Т000000025', N'DJI Osmo Mobile 3', 9),
  (26, N'Т000000026', N'DJI Osmo Mobile 3 Combo', 9),
  (27, N'Т000000027', N'DJI Ronin-SC', 9),
  (28, N'Т000000028', N'Astro F82', 10),
  (29, N'Т000000029', N'Rekam VisaVis L147', 10),
  (30, N'Т000000030', N'Ritmix RDF-1010', 10);