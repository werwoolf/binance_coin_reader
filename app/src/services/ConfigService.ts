import "reflect-metadata";
import {IsString, validateSync} from "class-validator";
import {plainToInstance} from "class-transformer";
import "dotenv/config";

export class EnvVariables {
    @IsString()
    CURRENT_USER_ID: string

    @IsString()
    ENVIRONMENT: string

    @IsString()
    SYMBOLS_TO_WATCH: string

    @IsString()
    BINANCE_WS_API_PATH: string

    @IsString()
    BINANCE_REST_API_PATH: string

    @IsString()
    POSTGRES_HOST: string

    @IsString()
    POSTGRES_PORT: string

    @IsString()
    POSTGRES_DB: string

    @IsString()
    POSTGRES_USER: string

    @IsString()
    POSTGRES_PASSWORD: string

    @IsString()
    POSTGRES_URL: string
}

class ConfigServiceClass {
    constructor() {
        this.validate()
    }

    validate() {
        const validatedConfig = plainToInstance(EnvVariables, process.env, {
            enableImplicitConversion: true
        });
        const errors = validateSync(validatedConfig, {
            skipMissingProperties: false
        });

        if (errors.length > 0) {
            throw new Error(errors.toString());
        }
    }

    get(key: keyof EnvVariables):string {
        return process.env[key];
    }

}

export const ConfigService = new ConfigServiceClass();
