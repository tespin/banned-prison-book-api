const redis = require('redis');

// const client = redis.createClient({
//     url: process.env.REDIS_URL
// });

// const connectCache = async () => {
//     client.on('error', (err) => console.log('Redis Cache Error', err));

//     try {
//         await client.connect();
//     } catch (error) {
//         throw error;
//     }
// }

// connectCache();

// module.exports = client;
