export function log(...args: any[]) {
  console.log("[INFO]:", ...args);
}

export function error(...args: any[]) {
  console.error("[ERROR]:", ...args);
}
