import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt"

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "AQcgf8zqn5cJ2uEfgu8ix3DxaeooWqHtM6sVyc6Rd/4=",
            passReqToCallback: true
        });
    }

    validate(req: Request,payload : any){
        const refreshToken = req.get("authorization").replace("Bearer", " ").trim()
        return {
            ...payload,
            refreshToken
        }
    }
}