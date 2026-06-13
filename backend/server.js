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
    ['Seoul (Gyeongbokgung)', 'Seoul', 'History', 200000, 'The main royal palace of the Joseon Dynasty.'],
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
                username VARCHAR(100),
                target_table VARCHAR(100),
                destination_name VARCHAR(100), 
                rating INT CHECK (rating >= 1 AND rating <= 5),
                comment TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Review table (Name-based) is ready.');
    } catch (err) {
        console.error('Error initializing review table:', err);
    } finally {
        await con.end();
    }
}

async function initializeUserTable() {
    const con = await mysql.createConnection(config);
    try {
        await con.query(`USE travel_db`);
        await con.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('User table (Name-based) is ready.');
    } catch (err) {
        console.error('Error initializing user table:', err);
    } finally {
        await con.end();
    }
}

async function createUser(username, email, password) {
    const con = await mysql.createConnection({ ...config, database: 'travel_db' });
    try {
        const query = `
            INSERT INTO users (username, email, password)
            VALUES (?, ?, ?)
        `;
        await con.query(query, [username, email, password]);
        console.log(`User created: ${username}`);
    } catch (err) {
        if(err.code === 'ER_DUP_ENTRY') {
            console.warn(`Error: Username or email already exists`);
        } else {
            console.error('Error creating user:', err);
        }
    } finally {
        await con.end();
    }
}

async function initializeWishlistTables() {
    const con = await mysql.createConnection(config);
    try {
        await con.query(`USE travel_db`);
        await con.query(`
            CREATE TABLE IF NOT EXISTS wishlists (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                target_table VARCHAR(100),
                destination_name VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                UNIQUE KEY unique_user_wish (user_id, target_table, destination_name)
            )
        `);
        console.log('Wishlist tables are ready.');
    } catch (err) {
        console.error('Error initializing wishlist tables:', err);
    } finally {        
        await con.end();
    }
}

const wishlist = {
    async addToWishlist(userId, tableName, destName) {
        const con = await mysql.createConnection({ ...config, database: 'travel_db' });
        try {
            const query = `
                INSERT INTO wishlists (user_id, target_table, destination_name)
                VALUES (?, ?, ?)
            `;
            await con.query(query, [userId, tableName, destName]);
            console.log(`Added to wishlist: User ${userId}, ${destName} in ${tableName}`);
        } catch (err) {
            if(err.code === 'ER_DUP_ENTRY') {
                console.warn(`Error: Wishlist entry already exists`);
            } else {
                console.error('Error adding to wishlist:', err);
            }
        } finally {
            await con.end();
        }
    },
    async getUserWishlist(userId) {
        const con = await mysql.createConnection({ ...config, database: 'travel_db' });
        try {
            const query = `SELECT target_table, destination_name, created_at FROM wishlists WHERE user_id = ?`;
            const [rows] = await con.query(query, [userId]);
            return rows;
        } finally {
            await con.end();
        }
    },
     
    async removeFromWishlist(userId, tableName, destName) {
        const con = await mysql.createConnection({ ...config, database: 'travel_db' });
        try {
            const query = `DELETE FROM wishlists WHERE user_id = ? AND target_table = ? AND destination_name = ?`;
            await con.query(query, [userId, tableName, destName]);
            console.log(`Removed from wishlist: User ${userId}, ${destName} in ${tableName}`);
        } catch (err) {
            console.error('Error removing from wishlist:', err);
        } finally {
            await con.end();
        }
    } 
};

const UniversalSearch = {
    async getByTheme(tableName, theme) {
        const con = await mysql.createConnection({
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
    async addReview(username, tableName, destName, rating, comment) {
        if(rating < 1 || rating > 5) {
            console.error('Rating must be between 1 and 5.');
            return;
        }
        const con = await mysql.createConnection({ ...config, database: 'travel_db' });
        try {
            const query = `
                INSERT INTO travel_reviews (username, target_table, destination_name, rating, comment)
                VALUES (?, ?, ?, ?, ?)
            `;
            await con.query(query, [username, tableName, destName, rating, comment]);
            console.log(`Review added by "${username}" for "${destName}" in ${tableName}`);
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
    },

    async removeReview(reviewId) {
        const con = await mysql.createConnection({ ...config, database: 'travel_db' });
        try {
            const query = `DELETE FROM travel_reviews WHERE id = ?`;
            await con.query(query, [reviewId]);
            console.log(`Review with ID ${reviewId} removed.`);
        } catch (err) {
            console.error('Error removing review:', err);
        } finally {
            await con.end();
        }
    }
};

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

// Get all reviews
app.get("/api/reviews", async (req, res) => {
    try {
        const con = await mysql.createConnection(config);
        const [rows] = await con.query("SELECT * FROM travel_reviews ORDER BY created_at DESC");
        await con.end();

        const mappedRows = rows.map(row => ({
            ...row,
            user_name: row.username, 
            destName: row.destination_name
        }));

        res.json(mappedRows);
    } catch (err) {
        console.error("Review GET API error:", err.message);
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
});

app.post("/api/reviews", async (req, res) => {
    try {
        const { user_name, tableName, destName, rating, comment } = req.body;

        if (!user_name || !tableName || !destName || !rating || !comment) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const con = await mysql.createConnection(config);
        const query = `
            INSERT INTO travel_reviews (username, target_table, destination_name, rating, comment)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await con.query(query, [user_name, tableName, destName, rating, comment]);
        await con.end();

        res.status(201).json({
            id: result.insertId,
            message: "Review saved successfully"
        });
    } catch (err) {
        console.error("Review POST API error:", err.message);
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
        await initializeUserTable();
        await initializeWishlistTables();

        app.listen(PORT, () => {
            console.log(`Backend server running on http://localhost:${PORT}`);
        });

        // sample data for testing review system
        await ReviewSystem.removeReview(1);

        await ReviewSystem.addReview('John Doe', 'korea_travel_destinations', 'Seoul (Gyeongbokgung)', 4, 'Amazing historical site with beautiful architecture!');
    } catch (err) {
        console.error("Server start failed:", err.message);
    }
}

startServer();