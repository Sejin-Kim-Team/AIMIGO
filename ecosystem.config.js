module.exports = {
  apps: [
    {
      name: 'AIMIGO!',
      exec_mode: 'cluster',
      instances: 'max',
      script: 'npx',
      args: 'nuxi start',
    },
  ],
}
