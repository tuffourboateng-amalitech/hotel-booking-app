declare global {
    namespace NodeJs {
      interface ProcessEnv {
        DATABASE_URL: string;
        PORT_NUMBER: number;
        JWT_SECRET: string;
        JWT_RERESH_SECRET: number;
      }
    }
  }
  
  export {}; 