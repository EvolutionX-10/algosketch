import { generateDailyPassword } from "./src/lib/utils";

const password = generateDailyPassword();
const now = new Date();
const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

console.log(`🔐 Today's Password (${dateStr}): ${password}`);
console.log(`🌐 Access URL: https://algosketch.vercel.app/${password}`);
