const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// DB Connection
const config = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'travel_db'
};

// sample data(Mongolia: 20, Korea: 20)
const mongoliaData = [
    ['Ulaanbaatar', 'Central', 'City', 100000, 'Capital city of Mongolia.'],
    ['Terelj National Park', 'Central', 'Nature', 350000, 'Popular grassland near the capital.'],
    ['Lake Khuvsgul', 'Northern', 'Lake', 1100000, 'The Blue Pearl of Mongolia.'],
    ['Khongoryn Els', 'Southern', 'Desert', 950000, 'Massive singing sand dunes.'],
    ['Bayan Zag', 'Southern', 'Desert', 900000, 'Famous flaming cliffs and dinosaur fossils.'],
    ['Yolyn Am', 'Southern', 'Nature', 850000, 'Ice valley in the middle of the desert.'],
    ['Tsagaan Suvarga', 'Southern', 'Desert', 800000, 'Ancient seabed with colorful strata.'],
    ['Tsenkher Hot Springs', 'Central', 'Hot Springs', 750000, 'Outdoor hot spring under the stars.'],
    ['Kharkhorin', 'Central', 'History', 700000, 'Ancient capital of the Mongol Empire.'],
    ['Orkhon Waterfall', 'Central', 'Nature', 750000, 'Large waterfall in a volcanic area.'],
    ['Hustai National Park', 'Central', 'Nature', 400000, 'Home to wild Takhi horses.'],
    ['Khorgo-Terkhiin Tsagaan Nuur', 'Central', 'Lake', 850000, 'Volcanic lake with crystal clear water.'],
    ['Amarbayasgalant Monastery', 'Northern', 'History', 700000, 'Exquisite Buddhist architecture.'],
    ['Altai Tavan Bogd', 'Western', 'Nature', 1800000, 'Highest peaks and glaciers.'],
    ['Ulgii', 'Western', 'Culture', 1600000, 'Home of the Eagle Hunters.'],
    ['Baga Gazriin Chuluu', 'Southern', 'Nature', 650000, 'Granite rock formations and ruins.'],
    ['Gun-Galuut Nature Reserve', 'Central', 'Nature', 450000, 'Wetlands and rare wildlife.'],
    ['Khermen Tsav', 'Southern', 'Desert', 1200000, 'Magnificent red canyon in the Gobi.'],
    ['Ushigiin Uver', 'Northern', 'History', 800000, 'Ancient Deer Stone monuments.'],
    ['Dariganga', 'Eastern', 'Nature', 1000000, 'Volcanic fields and swan lakes.']
];

const koreaData = [
    ['Seoul (Gyeongbokgung)', 'Seoul', 'History', 50000, 'The main royal palace of the Joseon Dynasty.'],
    ['Busan (Haeundae)', 'Gyeongsang', 'Nature', 150000, 'South Koreas most famous beach and urban scenery.'],
    ['Jeju (Seongsan Ilchulbong)', 'Jeju', 'Nature', 250000, 'A volcanic tuff cone with breathtaking sunrise views.'],
    ['Gyeongju (Bulguksa)', 'Gyeongsang', 'History', 80000, 'A masterpiece of Buddhist art from the Silla Kingdom.'],
    ['Sokcho (Seoraksan)', 'Gangwon', 'Nature', 120000, 'Famous for its rugged peaks and autumn foliage.'],
    ['Suwon (Hwaseong Fortress)', 'Gyeonggi', 'History', 40000, 'A UNESCO World Heritage military fortress.'],
    ['Jeonju (Hanok Village)', 'Jeolla', 'Culture', 100000, 'Traditional Korean houses and incredible food culture.'],
    ['Chuncheon (Nami Island)', 'Gangwon', 'Nature', 90000, 'Famous for beautiful tree-lined paths and ferry rides.'],
    ['Danyang (Paragliding)', 'Chungcheong', 'Nature', 180000, 'The mecca of paragliding with stunning river views.'],
    ['Asan (Onyang Hot Springs)', 'Chungcheong', 'Hot Springs', 70000, 'One of the oldest hot spring resorts in Korea.'],
    ['Pocheon (Art Valley)', 'Gyeonggi', 'Lake', 60000, 'A former stone quarry transformed into a crystal lake.'],
    ['Pyeongchang (Alpensia)', 'Gangwon', 'Nature', 300000, 'Hub of winter sports and high-altitude ranch views.'],
    ['Suncheon (Bay Garden)', 'Jeolla', 'Nature', 70000, 'A massive ecological bay and reed fields.'],
    ['Andong (Hahoe Village)', 'Gyeongsang', 'Culture', 90000, 'A traditional village preserving Clan-based culture.'],
    ['Uljin (Deokgu Hot Springs)', 'Gyeongsang', 'Hot Springs', 110000, 'Natural flowing hot spring water from the valley.'],
    ['Gapyeong (Morning Calm)', 'Gyeonggi', 'Nature', 55000, 'A beautiful private garden with seasonal festivals.'],
    ['Yeosu (Night Sea)', 'Jeolla', 'City', 130000, 'Famous for its romantic night lights and sea cable cars.'],
    ['Ulleungdo (Island)', 'Gyeongsang', 'Nature', 400000, 'A mysterious volcanic island in the East Sea.'],
    ['Buyeo (Baekje Site)', 'Chungcheong', 'History', 60000, 'Relics of the ancient Baekje Kingdom.'],
    ['Seoul (Lotte World Tower)', 'Seoul', 'City', 80000, 'One of the tallest buildings in the world.']
];

// initialize DB
async function initializeDestinationTable(tableName, data) {
    const con = await mysql.createConnection(config);
    try {
        await con.query(`
            CREATE TABLE IF NOT EXISTS ${tableName} (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100),
                region VARCHAR(50),
                theme VARCHAR(50),
                estimated_cost_krw INT,
                description TEXT
            )
        `);
        
        const [rows] = await con.query(`SELECT count(*) as count FROM ${tableName}`);
        if (rows[0].count === 0) {
            await con.query(`INSERT INTO ${tableName} (name, region, theme, estimated_cost_krw, description) VALUES ?`, [data]);
            console.log(`Table "${tableName}" initialized with ${data.length} records.`);
        }
    } catch (err) {
        console.error(`Error initializing ${tableName}:`, err);
    } finally {
        await con.end();
    }
}

async function initializeReviewTable() {
    const con = await mysql.createConnection(config);
    try {
        await con.query(`USE travel_db`);
        await con.query(`
            CREATE TABLE IF NOT EXISTS travel_reviews (
                id INT AUTO_INCREMENT PRIMARY KEY,
                target_table VARCHAR(100),
                destination_name VARCHAR(100), 
                rating INT CHECK (rating >= 1 AND rating <= 5),
                comment TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✔ Review table (Name-based) is ready.');
    } catch (err) {
        console.error('Error initializing review table:', err);
    } finally {
        await con.end();
    }
}

const UniversalSearch = {
    async getByTheme(tableName, theme) {
        const con = await mysql.createConnection({
            ...config, 
            database: 'travel_db'
        });
        const conn = await mysql.createConnection({
            ...config, 
            database: 'travel_db'
        });
        const [rows] = await con.query(`SELECT * FROM ${tableName} WHERE theme = ?`, [theme]);
        await con.end();
        return rows;
    },

    async getByBudget(tableName, maxCost) {
        const con = await mysql.createConnection({
            ...config, 
            database: 'travel_db'
        });
        const [rows] = await con.query(`SELECT * FROM ${tableName} WHERE estimated_cost_krw <= ?`, [maxCost]);
        await con.end();
        return rows;
    },

    async getByRegion(tableName, region) {
        const con = await mysql.createConnection({
            ...config, 
            database: 'travel_db'
        });
        const [rows] = await con.query(`SELECT * FROM ${tableName} WHERE region = ?`, [region]);
        await con.end();
        return rows;
    }
};

const ReviewSystem = {
    async addReview(tableName, destName, rating, comment) {
        if(rating < 1 || rating > 5) {
            console.error('Rating must be between 1 and 5.');
            return;
        }
        const con = await mysql.createConnection({ ...config, database: 'travel_db' });
        try {
            const query = `
                INSERT INTO travel_reviews (target_table, destination_name, rating, comment)
                VALUES (?, ?, ?, ?)
            `;
            await con.query(query, [tableName, destName, rating, comment]);
            console.log(`Review added for "${destName}" in ${tableName}`);
        } catch (err) {
            console.error('Error adding review:', err);
        } finally {
            await con.end();
        }
    },

    async getReviewsByDestination(tableName, destName) {
        const con = await mysql.createConnection({ ...config, database: 'travel_db' });
        try {
            const query = `
                SELECT * FROM travel_reviews 
                WHERE target_table = ? AND destination_name = ? 
                ORDER BY created_at DESC
            `;
            const [rows] = await con.query(query, [tableName, destName]);
            return rows;
        } finally {
            await con.end();
        }
    }
};

// examples
// Create database if it does not exist
async function initializeDatabase() {
    const con = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234'
    });

    await con.query(`CREATE DATABASE IF NOT EXISTS travel_db`);
    console.log("Database travel_db is ready.");
    await con.end();
}

// Test API
app.get("/", (req, res) => {
    res.send("Backend server is running");
});

// Get Korea data
app.get("/api/korea", async (req, res) => {
    try {
        const con = await mysql.createConnection(config);
        const [rows] = await con.query("SELECT * FROM korea_travel_destinations");
        await con.end();

        res.json(rows);
    } catch (err) {
        console.error("Korea API error:", err.message);
        res.status(500).json({ error: "Failed to get Korea data" });
    }
});

// Get Mongolia data
app.get("/api/mongolia", async (req, res) => {
    try {
        const con = await mysql.createConnection(config);
        const [rows] = await con.query("SELECT * FROM mongolia_travel_destinations");
        await con.end();

        res.json(rows);
    } catch (err) {
        console.error("Mongolia API error:", err.message);
        res.status(500).json({ error: "Failed to get Mongolia data" });
    }
});

// Add review
app.post("/api/reviews", async (req, res) => {
    const { target_table, destination_name, rating, comment } = req.body;

    try {
        await ReviewSystem.addReview(target_table, destination_name, rating, comment);
        res.json({ message: "Review saved successfully" });
    } catch (err) {
        console.error("Review API error:", err.message);
        res.status(500).json({ error: "Failed to save review" });
    }
});

const PORT = 5000;

async function startServer() {
    try {
        await initializeDatabase();

        await initializeDestinationTable("korea_travel_destinations", koreaData);
        await initializeDestinationTable("mongolia_travel_destinations", mongoliaData);
        await initializeReviewTable();

        app.listen(PORT, () => {
            console.log(`Backend server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Server start failed:", err.message);
    }
}

startServer();