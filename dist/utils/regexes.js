"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMPONENT_PATH_HAVING_MULTIPLE_DEFINITIONS = exports.COMPONENT_PATH_DEFINITION_PATTERN = exports.PARSED_TO_NAME = void 0;
const HYPHENED = "(?<hyphened>\\w+(?:\\-\\w+)+)";
const WITH_QUALIFIER = "\\[(?<with>[a-z\\d-]+)(?<qualify>.+)\\]";
const CATCH_ALL = "\\[{1,2}\\.{3}(?<all>[\\w\\-]+)\\]{1,2}";
const GROUP = "\\((?<group>[\\w\\-]+)\\)";
const RESERVED = "[@_](?<reserved>[\\w\\-]+)";
const AT_ORIGIN = "(?<same>\\.)";
const SEGMENTATION = "(?:[\\/\\\\]?(?:[^\\/\\\\]+[\\/\\\\])+))";
const SUB_PATH = `(?<subpath>(?:${SEGMENTATION}|[\\/\\\\])`;
const NESTED = "(?<nested>[^\\/\\\\]+)";
const HAS_NESTing = `(?:${SUB_PATH}${NESTED}[\\/\\\\]?)`;
const pattern = `^(?:${[
    HYPHENED, WITH_QUALIFIER, CATCH_ALL, GROUP, RESERVED, AT_ORIGIN, HAS_NESTing
].join("|")})$`;
exports.PARSED_TO_NAME = RegExp(pattern, "m");
// exemple : myProject/src/components/some/nested/Path:Folder:ComponentName:prefix
exports.COMPONENT_PATH_DEFINITION_PATTERN = /(?<base>[^:]*):?(?<custFolder>[^:]*):?(?<custPrefix>[^:]*)/;
exports.COMPONENT_PATH_HAVING_MULTIPLE_DEFINITIONS = /(?<base>.*)=>(?<subPathDefinitions>.*)$/;
//# sourceMappingURL=regexes.js.map