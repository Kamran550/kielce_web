module.exports = {
    apps: [
      {
        name: "kielce-next",
        script: "node_modules/next/dist/bin/next",
        args: "start -p 3000",
        cwd: "/home/kielce/htdocs/kielceuniversity.pl",
        interpreter: "node",
        env: {
          NODE_ENV: "production",
          PORT: 3000
        }
      }
    ]
  };
  