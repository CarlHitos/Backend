1. SELECT * FROM 'pokemon';
2. SELECT Name, `Type 1`, `Type 2` FROM pokemon;
3. SELECT * FROM pokemon WHERE `Type 1` LIKE 'Fire' OR `Type 2` LIKE 'Fire'; 
4. SELECT * FROM `pokemon` WHERE Speed > 90;
5. SELECT * FROM pokemon ORDER BY Total DESC;
6. SELECT * FROM pokemon WHERE Legendary LIKE 'True'; 
7. SELECT Name, `Type 1`, `Type 2` FROM pokemon WHERE Generation = 2;
8. SELECT * FROM pokemon WHERE Defense > 70 AND (`type 1` LIKE 'Grass' OR `type 2` LIKE 'Grass'); 
9. SELECT * FROM pokemon WHERE Attack BETWEEN 50 AND 70; 
10. SELECT COUNT(*) FROM pokemon;
11. SELECT AVG(Total) FROM pokemon;
12. SELECT * FROM pokemon WHERE (`type 1` LIKE 'Grass' OR `type 2` LIKE 'Grass') LIKE 'Water' AND Total > 400;
13. SELECT Name, `Type 1`, `Type 2` FROM pokemon WHERE Name LIKE 'C%';
14. SELECT * FROM pokemon WHERE Generation = 3 AND Legendary LIKE 'False'; 
15. SELECT * FROM pokemon WHERE Name LIKE '%Mega%'; 
