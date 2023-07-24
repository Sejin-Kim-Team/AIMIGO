module.exports = {
  apps: [
    {
      name: 'NuxtApp',
      exec_mode: 'cluster',
      instances: 'max',
      script: 'npx',
      args: 'nuxi start',
    },
  ],
}
