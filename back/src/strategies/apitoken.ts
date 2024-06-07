import passport from 'passport';
import { Strategy } from 'passport-strategy';
import 'dotenv/config';
import type { Request } from 'express';

class ApiTokenStrategy extends Strategy {
  name = 'apitoken';

  async authenticate(req: Request) {
    try {
      const providedToken = req.headers.authorization?.slice(7);
      const expectedToken = process.env.API_TOKEN!;

      if (providedToken === expectedToken) {
        return this.success({ message: 'Success' });
      } else {
        return this.fail('Token invalido', 401); // Falha na autenticação
      }
    } catch (error) {
      return this.error(error as Error);
    }
  }
}

passport.use(new ApiTokenStrategy());
