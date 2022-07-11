declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REDIS_HOST: string | number;
    }
  }
}

export {};
