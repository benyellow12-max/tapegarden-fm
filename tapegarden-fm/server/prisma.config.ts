import { PrismaClient } from '@prisma/client'

const config = {
  generator: {
    client: {
      provider: 'prisma-client-js',
    },
  },
  datasource: {
    db: {
      provider: 'postgresql',
      url: {
        env: 'DATABASE_URL',
      },
    },
  },
}

export default config