module.exports = {
  apps: [{
    name: '[APP NAME]',
    script: './app.js'
  }],
  deploy: {
    staging: {
      user: 'ubuntu',
      host: '[PRODUCTION HOST NAME]',
      key: '[PATH TO SSH PUBLIC KEY]',
      ref: '[BRANCH TO DEPLOY]',
      repo: '[GIT REPO]',
      path: '[DEPLOYMENT PATH]',
      'post-deploy': 'sh scripts/configuration.sh && npm install && pm2 startOrRestart ecosystem.config.js',
      env: {
        "NODE_ENV": "staging"
      }
    },
    production: {
      user: 'ubuntu',
      host: '[PRODUCTION HOST NAME]',
      key: '[PATH TO SSH PUBLIC KEY]',
      ref: '[BRANCH TO DEPLOY]',
      repo: '[GIT REPO]',
      path: '[DEPLOYMENT PATH]',
      'post-deploy': 'sh scripts/configuration.sh && npm install && pm2 startOrRestart ecosystem.config.js',
      "env"  : {
        "NODE_ENV": "production"
      }
    }
  }
}
