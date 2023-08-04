module.exports = {
  apps: [
    {
      name: 'AIMIGO!',
      exec_mode: 'cluster',
      instances: 1,
      script: 'npx',
      args: 'nuxi start',
    },
  ],
}
