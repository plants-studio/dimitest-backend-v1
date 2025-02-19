declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: 'production' | 'development';
    PORT?: string;
    DB_USER?: string;
    DB_PASSWORD?: string;
    DB_URI?: string;
  }
}
