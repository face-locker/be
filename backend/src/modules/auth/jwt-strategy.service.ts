import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { passportJwtSecret } from 'jwks-rsa';
import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';
import { ApiConfigService } from '../../shared/services/api-config.service';
import { UserEntity } from '../user/entities/user.entity';
import { RoleType } from '../../guards/role-type';
import { emptyUuid } from '../../utils/uuid.utils';
import { Request } from 'express';

export const guestUser: Partial<UserEntity> = {
  id: emptyUuid,
  keyCloakId: emptyUuid,
  createdAt: new Date(),
  updatedAt: new Date(),
  firstName: 'Guest',
  lastName: 'Guest',
  email: 'Guest',
  role: RoleType.GUEST,
};

interface IJwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ApiConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    const customExtractor = (req: Request): string | null => {
      const auth = req.headers.authorization;
      if (!auth) return null;

      const [type, token] = auth.split(' ');
      if (type !== 'Bearer' || !token) return null;

      return token;
    };

    const secretProvider = passportJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: config.keycloakJwtConfig.jwksUri,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      jwtFromRequest: customExtractor,
      ignoreExpiration: false,
      algorithms: ['RS256'],
      secretOrKeyProvider: secretProvider,
    });
  }

  async validate(payload: IJwtPayload | undefined): Promise<UserEntity> {
    if (!payload?.sub) {
      return guestUser as UserEntity;
    }

    const userId = payload.sub as Uuid;

    const user = await this.userRepository.findOneBy({
      keyCloakId: userId,
    });

    return (user ?? guestUser) as UserEntity;
  }
}
