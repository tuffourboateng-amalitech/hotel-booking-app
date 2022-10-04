declare global {
    namespace Express {
      export interface Request {
        user?: User;
      }
    }
  }

declare global {
    namespace Express {
      export interface Request {
        hotel?: Hotel;
      }
    }
  }


export interface User {
    id: string;
    name: string
    email: string
    password:string
    confirmPassword: string
    role?: string
  }

export interface Hotel {
  name: string;
  city: string;
  address: string;
  type: string;
  distance: string;
  photos?: string[];
  description:string;
  rating?: number;
  rooms?: Room[];
  price: number;
  featured: boolean;
}


export interface Room{
  title: string,
  price: number,
  maxPeople: number,
  description: string,
  roomNumbers: object[]
}
