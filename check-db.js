// check-db.js
const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '.tmp/data.db'));

// Get all newsletter subscribers with correct column names
const subscribers = db.prepare(`
  SELECT id, email, is_active, subscribed_at, created_at, published_at 
  FROM newsletter_subscribers 
  ORDER BY id DESC
`).all();

console.log('=== Newsletter Subscribers ===');
console.table(subscribers);

console.log(`\nTotal subscribers: ${subscribers.length}`);

// Also show column structure
const columns = db.prepare("PRAGMA table_info(newsletter_subscribers)").all();
console.log('\n=== Table Structure ===');
console.table(columns);

db.close();