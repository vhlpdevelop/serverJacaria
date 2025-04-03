
module.exports = {
    apps: [
      {
        name: `Sensors Service`,
        script: './src/sensor_service/app.js',
        env: {
          NODE_ENV: "development",
        },
        env_production: {
          NODE_ENV: "production",
          PORT: process.env.HOTSPOT_PORT || 3001,
        }
      },
      {
        name: `API GATEWAY`,
        script: './src/app.js',
        env: {
          NODE_ENV: "development",
        },
        env_production: {
          NODE_ENV: "production",
          PORT: process.env.PORT || 3000,
        }
     
      },
    ]
  }