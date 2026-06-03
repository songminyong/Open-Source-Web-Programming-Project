const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

/*
var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "store_db"
});
*/

con.connect(function(err) {
    if(err) throw err;
    console.log("Connected to MySQL Database");
});

const mysql = require('mysql2/promise');

// 1. 데이터 정의 (이전 단계의 영문 데이터)
const destinations_mongolia = [
    { name: 'Ulaanbaatar', region: 'Central', theme: 'City', cost: 100000, desc: 'The capital of Mongolia and the starting point of the journey.' },
    { name: 'Terelj National Park', region: 'Central', theme: 'Nature', cost: 350000, desc: 'Popular grassland area near Ulaanbaatar, famous for Turtle Rock.' },
    { name: 'Lake Khuvsgul', region: 'Northern', theme: 'Lake', cost: 1100000, desc: 'Known as the Blue Pearl of Mongolia, offering boating and fishing.' },
    { name: 'Khongoryn Els', region: 'Southern', theme: 'Desert', cost: 950000, desc: 'Massive sand dunes in the Gobi Desert, known as the Singing Sands.' },
    { name: 'Bayan Zag', region: 'Southern', theme: 'Desert', cost: 900000, desc: 'Famous for spectacular red cliffs and dinosaur egg fossils.' },
    { name: 'Yolyn Am', region: 'Southern', theme: 'Nature', cost: 850000, desc: 'A massive ice valley inside the Gobi Desert.' },
    { name: 'Tsagaan Suvarga', region: 'Southern', theme: 'Desert', cost: 800000, desc: 'Ancient seabed terrain with colorful colorful strata.' },
    { name: 'Tsenkher Hot Springs', region: 'Central', theme: 'Hot Springs', cost: 750000, desc: 'Open-air hot spring area under the starry night sky.' },
    { name: 'Kharkhorin', region: 'Central', theme: 'History', cost: 700000, desc: 'The ancient capital of the Mongol Empire.' },
    { name: 'Orkhon Waterfall', region: 'Central', theme: 'Nature', cost: 750000, desc: 'One of the largest waterfalls in Mongolia.' },
    { name: 'Hustai National Park', region: 'Central', theme: 'Nature', cost: 400000, desc: 'Protected area where wild Takhi horses roam.' },
    { name: 'Khorgo-Terkhiin Tsagaan Nuur', region: 'Central', theme: 'Lake', cost: 850000, desc: 'Beautiful lake formed next to an extinct volcano.' },
    { name: 'Amarbayasgalant Monastery', region: 'Northern', theme: 'History', cost: 700000, desc: 'Buddhist monastery with exquisite architecture.' },
    { name: 'Altai Tavan Bogd', region: 'Western', theme: 'Nature', cost: 1800000, desc: 'Mongolias highest mountain ranges and glaciers.' },
    { name: 'Ulgii', region: 'Western', theme: 'Culture', cost: 1600000, desc: 'Hosting city of the Golden Eagle Festival.' },
    { name: 'Baga Gazriin Chuluu', region: 'Southern', theme: 'Nature', cost: 650000, desc: 'Bizarre granite rock formations.' },
    { name: 'Gun-Galuut Nature Reserve', region: 'Central', theme: 'Nature', cost: 450000, desc: 'Combination of wetlands and grasslands.' },
    { name: 'Khermen Tsav', region: 'Southern', theme: 'Desert', cost: 1200000, desc: 'Majestic red canyon, the Grand Canyon of Mongolia.' },
    { name: 'Ushigiin Uver', region: 'Northern', theme: 'History', cost: 800000, desc: 'Best-preserved site for Bronze Age Deer Stones.' },
    { name: 'Dariganga', region: 'Eastern', theme: 'Nature', cost: 1000000, desc: 'Unique destination with volcanic fields and swan lakes.' }
];

async function setupDatabase() {
    // 2. MySQL 연결 설정 (본인의 환경에 맞게 수정)
    const connection = await mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "travel_db"
    });

    console.log('Connected to MySQL!');

    try {
        // 3. 테이블 생성
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS mongolia_travel_destinations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                region VARCHAR(50),
                theme VARCHAR(50),
                estimated_cost_krw INT,
                description TEXT
            );
        `;
        await connection.query(createTableQuery);
        console.log('Table created or already exists.');

        // 4. 데이터 삽입 (Bulk Insert)
        const insertQuery = `
            INSERT INTO mongolia_travel_destinations (name, region, theme, estimated_cost_krw, description)
            VALUES ?
        `;
        
        const values = destinations_mongolia.map(d => [d.name, d.region, d.theme, d.cost, d.desc]);
        
        await connection.query(insertQuery, [values]);
        console.log(`${values.length} records have been inserted successfully!`);

    } catch (err) {
        console.error('Error during DB operations:', err);
    } finally {
        await connection.end();
    }
}

setupDatabase();

app.listen(5000, function() {
    console.log("Server is running on port 5000");
});
