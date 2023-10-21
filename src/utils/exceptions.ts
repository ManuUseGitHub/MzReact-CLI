import { Reason, SeverityEnum } from "./enums";

export class MzException {

    constructor(
        private reason: Reason,
        private severity: SeverityEnum,
        private message: string,
        private code: number) {
    }

    getMessage() {
        return this.message;
    }

    getCode() {
        return this.code;
    }

    getTitle() {
        return `${this.reason.toLocaleUpperCase()}`
    }

    toString() {
        return `[${this.code}]:${this.reason}:"${this.message}":severity:${this.severity}`
    }
}