"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MzException = void 0;
class MzException {
    constructor(reason, severity, message, code) {
        this.reason = reason;
        this.severity = severity;
        this.message = message;
        this.code = code;
    }
    getMessage() {
        return this.message;
    }
    getCode() {
        return this.code;
    }
    getTitle() {
        return `${this.reason.toLocaleUpperCase()}`;
    }
    toString() {
        return `[${this.code}]:${this.reason}:"${this.message}":severity:${this.severity}`;
    }
}
exports.MzException = MzException;
//# sourceMappingURL=exceptions.js.map