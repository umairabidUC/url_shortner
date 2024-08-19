import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { jwtConstants } from "../constants/auth.constants";

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
    Strategy,
    'jwt-access',
) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.api_key_secret,
        });
    }

    validate(payload: any) {
        return payload
    }
}