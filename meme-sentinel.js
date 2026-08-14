import { execSync } from 'child_process';
import fs from 'fs';

const CHAIN = "sol";
const ALERT_PERCENT = 70; // % jual smart money sebelum alert

// Ganti dengan CA token yang mau monitor (bisa lebih dari 1)
const TRACKED_TOKENS = [
  "So11111111111111111111111111111111111111112", // contoh SOL
  "YOUR_TOKEN_CA_HERE" // ganti dengan CA token yang mau monitor
];

async function main() {
  console.log("🚀 MemeSentinel v1.0 On | Real-time Smart Money Alert");

  for (let ca of TRACKED_TOKENS) {
    try {
      console.log(`📊 Scanning ${ca}...`);

      // Ambil data top holder + early buyer via gmgn-cli (atau skills)
      const result = execSync(`gmgn-cli wallet score ${ca} ${CHAIN} 0`, { encoding: 'utf8' });
      
      // Parse sederhana (kalau GMGN kasih JSON output)
      const holders = JSON.parse(result); // sesuaikan kalau outputnya JSON
      const topHolder = holders.top10 ? holders.top10[0] : { wallet: "Unknown", sellAmount: 0, buyAmount: 0 };

      const sellPct = (topHolder.sellAmount / topHolder.buyAmount) * 100;

      if (sellPct > ALERT_PERCENT) {
        console.log(`⚠️  ALERT! ${topHolder.wallet} sudah jual ${sellPct.toFixed(1)}% dari ${ca}`);
        // TODO: Tambah Telegram/Webhook di sini
      } else {
        console.log(`✅ ${ca} aman (sell hanya ${sellPct.toFixed(1)}%)`);
      }
    } catch (e) {
      console.error(`❌ Error ${ca}:`, e.message);
    }
  }
}

main().catch(console.error);
