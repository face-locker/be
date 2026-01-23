import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';

export interface TokenPayload {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  sub: Uuid;
  typ: string;
  azp: string;
  sid: string;
  acr: string;
  allowed_origins: string[];
  realm_access: {
    roles: string[];
  };
  scope: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}
