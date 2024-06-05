import type { SelectUser } from '@/db/schemas';

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}
