// lib/prisma.ts
import { useEffect } from 'react';
import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!window.prisma) {
    window.prisma = new PrismaClient();
  }
  prisma = window.prisma;
}

const PrismaContext = React.createContext();

const PrismaProvider = ({ children }) => {
  useEffect(() => {
    return () => {
      prisma.$disconnect();
    };
  }, []);

  return (
    <PrismaContext.Provider value={prisma}>
      {children}
    </PrismaContext.Provider>
  );
};

export { PrismaProvider, PrismaContext };