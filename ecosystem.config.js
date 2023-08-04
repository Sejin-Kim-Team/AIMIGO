module.exports = {
  apps: [
    {
      name: 'AIMIGO!',
      exec_mode: 'cluster',
      instances: 1,
      script: 'pnpm',
      args: 'dlx nuxi start',
    },
  ],
}
