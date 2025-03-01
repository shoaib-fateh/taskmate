import { exec } from "child_process";

const PORT = process.env.PORT || 5001;

const killCommand =
  process.platform === "win32"
    ? `for /f "tokens=5" %a in ('netstat -aon ^| findstr :${PORT}') do taskkill /PID %a /F`
    : `lsof -ti :${PORT} | xargs kill -9`;

exec(killCommand, (err, stdout, stderr) => {
  if (err) {
    console.error("⚠️ Error killing process:", err.message);
    return;
  }
  console.log(`✅ Killed processes on port ${PORT}`);
});
