const HYPHENED_WORD = "(?:[a-zA-Z][0-9]?)+(?:\\-?[a-zA-Z0-9]+)+"
const HYPHENED = `(?<hyphened>${HYPHENED_WORD})`;
const WITH_QUALIFIER = "\\[(?<with>[a-z\\d-]+)(?<qualify>.+)\\]";
const CATCH_ALL = `\\[{1,2}\\.{3}(?<all>${HYPHENED_WORD})\\]{1,2}`;
const GROUP = `\\((?<group>${HYPHENED_WORD})\\)`;
const RESERVED = `[@_](?<reserved>${HYPHENED_WORD})`;
const AT_ORIGIN = "(?<same>\\.)";
const SEGMENTATION = "(?:[\\/\\\\]?(?:[^\\/\\\\]+[\\/\\\\])+))";
const SUB_PATH = `(?<subpath>(?:${SEGMENTATION}|[\\/\\\\])`;
const NESTED = "(?<nested>[^\\/\\\\]+)";
const HAS_NESTING = `(?:${SUB_PATH}${NESTED}[\\/\\\\]?)`
const INTERCEPTS = `\\(\\.{1,3}\\)(?<intercept>${HYPHENED_WORD})`
const pattern = `^(?:${[
  HYPHENED,WITH_QUALIFIER,CATCH_ALL,GROUP,RESERVED,AT_ORIGIN,INTERCEPTS,HAS_NESTING
].join("|")})$`;

export const PARSED_TO_NAME = RegExp(pattern,"m");

// exemple : myProject/src/components/some/nested/Path:Folder:ComponentName:prefix
export const COMPONENT_PATH_DEFINITION_PATTERN =
    /(?<base>[^:]*):?(?<custFolder>[^:]*):?(?<custPrefix>[^:]*)/;

export const COMPONENT_PATH_HAVING_MULTIPLE_DEFINITIONS =
    /(?<base>.*)=>(?<subPathDefinitions>.*)$/;