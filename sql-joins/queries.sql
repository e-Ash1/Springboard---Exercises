-- 1. -- 
SELECT * FROM owners 
FULL OUTER JOIN vehicles
ON owners.id = vehicles.owner_id;

-- 2. --
SELECT first_name first, last_name last, 
COUNT (owner_id) FROM owners
JOIN vehicles ON owners.id=vehicles.owner_id GROUP BY (first, last)
ORDER BY first;

-- 3. ---
SELECT first_name first, last_name last
    ROUND(AVG(price)) as avg_price,
    COUNT(owner_id)
FROM owners
JOIN vehicles 
    ON owner.id=vehicles.id
GROUP BY 
    first,last
HAVING 
    COUNT(owner_id) >  1 AND ROUND(AVG(price)) > 10000
ORDER BY 
    first DESC;

