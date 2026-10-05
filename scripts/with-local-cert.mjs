import { existsSync } from "node:fs"
import { join } from "node:path"
import { spawn } from "node:child_process"

const [, , command = "dev", ...args] = process.argv
const isWindows = process.platform === "win32"
const tempDir = process.env.TEMP || process.env.TMP || ""
const localCert = tempDir ? join(tempDir, "avast-webmail-shield-root.pem") : ""
const env = { ...process.env }

if (localCert && existsSync(localCert) && !env.NODE_EXTRA_CA_CERTS) {
  env.NODE_EXTRA_CA_CERTS = localCert
}

const nextBin = isWindows ? "next.cmd" : "next"
const child = spawn(nextBin, [command, ...args], {
  stdio: "inherit",
  shell: true,
  env
})

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
  }

  process.exit(code ?? 0)
})