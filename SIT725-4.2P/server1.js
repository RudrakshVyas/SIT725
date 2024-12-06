import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb://localhost:27017";

// Function to inserting the "Movies" collections with data
async function populateDatabase() {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    try {
        // Connecting the database
        await client.connect();

        // Getting access of targeted database
        const db = client.db("mediaDB");
        const moviesCollection = db.collection("movies");
        const musicTracksCollection = db.collection("musicTracks");

        // Data for the "Movies" collection
        const movies = [
            { "_id": 101, title: "Inception", genre: "Sci-Fi", year: 2010 },
            { "_id": 102, title: "Interstellar", genre: "Sci-Fi", year: 2014 },
            { "_id": 103, title: "Pushpa 2", genre: "Action", year: 2024 },
            { "_id": 104, title: "Singham Again", genre: "Action", year: 2024 }
        ];

        try {
            // Insert data into the "movies" collection
            const movieResult = await moviesCollection.insertMany(movies);
            console.log(`${movieResult.insertedCount} documents added to 'movies':`, movieResult.insertedIds);
        } catch (err) {
            console.error("Error inserting into 'movies':", err.message);
        }

        // Inserting data for the "MusicTracks" collection
        const tracks = [
            { title: "Dark Red", artist: "Travis Scott", album: "Dark Red", year: 2020 },
            { title: "Thunder", artist: "Imagine Dragons", album: "Thunder", year: 2012 },
            { title: "Bad Guy", artist: "Billie Eilish", album: "No Album", year: 2015 }
        ];

        try {
            // Insert data into the "MusicTracks" collection
            const trackResult = await musicTracksCollection.insertMany(tracks);
            console.log(`${trackResult.insertedCount} documents added to 'musicTracks':`, trackResult.insertedIds);
        } catch (err) {
            console.error("Error inserting into 'musicTracks':", err.message);
        }
    } catch (error) {
        console.error("Error during populateDatabase:", error);
    } finally {
        // Close the connection
        await client.close();
    }
}

// Function to Fetch all the data from the "musicTracks" collection
async function fetchMusicTracks() {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    try {
        // Connect to the database
        await client.connect();

        // Access the target database and collection
        const db = client.db("mediaDB");
        const musicTracksCollection = db.collection("musicTracks");

        // Fetch all records from the "musicTracks" collection
        const tracks = await musicTracksCollection.find().toArray();

        // Display the fetched data
        console.log("Music Tracks Collection:", tracks);
    } catch (error) {
        console.error("Error fetching music tracks:", error);
    } finally {
        // Close the connection
        await client.close();
    }
}

// Execute the functions sequentially
(async function execute() {
    await populateDatabase();
    await fetchMusicTracks();
})();
