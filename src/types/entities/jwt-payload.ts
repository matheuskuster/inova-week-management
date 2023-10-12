import { Entity } from './entity';

export class JWTPayload extends Entity<JWTPayloadProps> {
  public readonly props: JWTPayloadProps;

  constructor(props: JWTPayloadProps) {
    super(props);
    this.props = props;
  }
}

interface JWTPayloadProps {
  sub: string;
  name: string;
  email: string;
  roles: string[];
  registration: string;
  iat?: number;
  exp?: number;
}
