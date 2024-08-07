import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "jwt-access") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "KpmIQ1smtCyQ2aK94l+LypYMgyXXE50UhbY1xe2k+As=",
        });
    }

    validate(payload : any){
        return payload
    }
}