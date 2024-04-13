"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reason = exports.SeverityEnum = void 0;
var SeverityEnum;
(function (SeverityEnum) {
    SeverityEnum["LOW"] = "low";
    SeverityEnum["MODERATE"] = "moderate";
    SeverityEnum["HIGH"] = "high";
    SeverityEnum["CRITICAL"] = "critical";
})(SeverityEnum || (exports.SeverityEnum = SeverityEnum = {}));
var Reason;
(function (Reason) {
    Reason["BAD_COMBINATION"] = "Bad Combination";
    Reason["RESOURCE_NOT_FOUND"] = "Resource Missing";
})(Reason || (exports.Reason = Reason = {}));
//# sourceMappingURL=enums.js.map