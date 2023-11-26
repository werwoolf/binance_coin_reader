module.exports = {
  apps : [{
    name   : "app",
    script : "./src/index.ts",
    watch: ["./src", ".env"],
    interpreter: './node_modules/.bin/ts-node'
  }]
}
