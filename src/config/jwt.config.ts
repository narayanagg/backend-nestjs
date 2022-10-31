import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: 'SECRET',
      signOptions: { expiresIn: '1d' },
    };
  },
};
