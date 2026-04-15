const fs = require("fs");
const path = require("path");

function getUtcDateParts(now = new Date()) {
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");

  return {
    year,
    month,
    day,
    date: `${year}-${month}-${day}`,
    timestamp: now.toISOString()
  };
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeDailyRecord(parts) {
  const dailyDir = path.join(__dirname, "..", "data", "daily");
  const filePath = path.join(dailyDir, `${parts.date}.json`);

  ensureDir(dailyDir);

  if (fs.existsSync(filePath)) {
    console.log(`Record for ${parts.date} already exists. No commit needed.`);
    return { changed: false, filePath };
  }

  const payload = {
    utcDate: parts.date,
    createdAt: parts.timestamp,
    note: "Daily GitHub streak commit created by GitHub Actions."
  };

  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`Created ${path.relative(process.cwd(), filePath)}`);

  return { changed: true, filePath };
}

function main() {
  const parts = getUtcDateParts();
  const result = writeDailyRecord(parts);

  if (!result.changed) {
    process.exit(0);
  }
}

main();
