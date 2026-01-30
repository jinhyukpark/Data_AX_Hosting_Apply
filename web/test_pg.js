const { Client } = require('pg');

const connectionString = "postgresql://postgres.nyngdrxklduftzhnnvit:Qkrwlsgur1!@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres?sslmode=require";

const client = new Client({
    connectionString: connectionString,
});

client.connect()
    .then(() => {
        console.log('✅ Connection successful using pg library');
        return client.end();
    })
    .catch(err => {
        console.error('❌ Connection failed using pg library:', err.message);
        process.exit(1);
    });
