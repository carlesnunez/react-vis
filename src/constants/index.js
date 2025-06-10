export {
  DARK_COLORS,
  DARK_COLORS_CSS,
  DARK_COLORS_RAW,
  LIGHT_COLORS,
  LIGHT_COLORS_CSS,
  LIGHT_COLORS_RAW,
  vals,
} from "./colors";

export const BREAKPOINT_SIZES = {
  xs: 320,
  sm: 563,
  md: 768,
  lg: 1200,
  xl: 1570,
};

export const BREAKPOINTS = {
  xs: `(max-width: ${BREAKPOINT_SIZES.xs / 16}rem)`,
  sm: `(min-width: ${BREAKPOINT_SIZES.xs / 16}rem) and (max-width: ${
    BREAKPOINT_SIZES.sm / 16
  }rem)`,
  md: `(min-width: ${BREAKPOINT_SIZES.sm / 16}rem) and (max-width: ${
    BREAKPOINT_SIZES.md / 16
  }rem)`,
  lg: `(min-width: ${BREAKPOINT_SIZES.md / 16}rem) and (max-width: ${
    BREAKPOINT_SIZES.lg / 16
  }rem)`,
  xl: `(min-width: ${BREAKPOINT_SIZES.lg / 16}rem) and (max-width: ${
    BREAKPOINT_SIZES.xl / 16
  }rem)`,
  xsAndSmaller: `(max-width: ${BREAKPOINT_SIZES.xs / 16}rem)`,
  smAndSmaller: `(max-width: ${BREAKPOINT_SIZES.sm / 16}rem)`,
  mdAndSmaller: `(max-width: ${BREAKPOINT_SIZES.md / 16}rem)`,
  lgAndSmaller: `(max-width: ${BREAKPOINT_SIZES.lg / 16}rem)`,
  xlAndSmaller: `(max-width: ${BREAKPOINT_SIZES.xl / 16}rem)`,
  xsAndLarger: `(min-width: ${(BREAKPOINT_SIZES.xs + 0.25) / 16}rem)`,
  smAndLarger: `(min-width: ${(BREAKPOINT_SIZES.sm + 0.25) / 16}rem)`,
  mdAndLarger: `(min-width: ${(BREAKPOINT_SIZES.md + 0.25) / 16}rem)`,
  lgAndLarger: `(min-width: ${(BREAKPOINT_SIZES.lg + 0.25) / 16}rem)`,
  xlAndLarger: `(min-width: ${(BREAKPOINT_SIZES.xl + 0.25) / 16}rem)`,
  mobile: `(max-width: ${BREAKPOINT_SIZES.md / 16}rem)`,
  desktop: `(min-width: ${(BREAKPOINT_SIZES.md + 0.25) / 16}rem)`,
};

export const SPRINGS = {
  default: {
    // This is literally the default for React Spring.
    // Kept here for reference, not because I should use it.
    tension: 170,
    friction: 26,
  },
  springy: {
    tension: 300,
    friction: 10,
  },
};

export const COLOR_SWAP_TRANSITION = {
  duration: 350,
  timingFunction: "cubic-bezier(0.41, 0.1, 0.13, 1)",
};

export const COLOR_THEME_COOKIE_NAME = "saved-color-theme";
export const DEFAULT_COLOR_MODE = "light";

export const THUMB_FOCUS_GRADIENT = `
  radial-gradient(
    hsl(48deg 100% 75% / 1),
    hsl(48deg 100% 75% / 0) 40%
  ),
  conic-gradient(
    from 90deg at 50% 50%,
    hsl(45deg 100% 55%),
    hsl(52deg 100% 75%),
    hsl(45deg 100% 55%),
    hsl(52deg 100% 75%),
    hsl(45deg 100% 55%),
    hsl(52deg 100% 95%),
    hsl(45deg 100% 55%)
  )
`;

export const FANCY_SHADOW = `
  0 1.3px 2.5px -3px rgba(0, 0, 0, 0.02),
  0 3.1px 6.1px -3px rgba(0, 0, 0, 0.028),
  0 5.9px 11.4px -3px rgba(0, 0, 0, 0.035),
  0 10.5px 20.3px -3px rgba(0, 0, 0, 0.042),
  0 19.6px 38px -3px rgba(0, 0, 0, 0.05),
  0 47px 91px -3px rgba(0, 0, 0, 0.07)
`;

export const MAX_NUM_OF_LIKES = 16;

// The number of articles to show on the homepage by default:
export const HOMEPAGE_ARTICLE_LIMIT = 12;

export const HOMEPAGE_PROMO = "none";

// In rems:
export const HEADER_WIDTH = 1100 / 16;
export const HEADER_HEIGHT = 80 / 16;
export const USE_HAMBURGER_MENU_BELOW = 800 / 16;
export const SUPERHEADER_HEIGHT = 2.75;

export const CONVERTKIT_FORMS_BY_ID = {
  primaryNewsletter: "1214974",
  effectivePortfolio: "1602808",
};
export const CONVERTKIT_TAGS_BY_ID = {
  primaryNewsletter: "1800626",
  // TODO: The rest of these should be unused. Delete them if they stay that way after I've finished the migration.
  spring: "1800658",
  careers: "1350186",
  technical: "1350187",
  "joy-of-react-updates": "2988052",
  "react-summit-2023": "4264707",
};

export const TIGHT_SPRING = {
  tension: 450,
  friction: 25,
};

export const SEARCH_MODAL_ID = "search";

export const ALGOLIA_APP_ID = "467U7YTK53";
export const ALGOLIA_PUBLIC_KEY = "148ecd3e28d6bffafe80daaa81725c11";

export const RECAPTCHA_PROJECT_ID = "tinkersynth";
export const RECAPTCHA_PUBLIC_KEY = "6LepiggqAAAAABuxDy1b107GmLy_ANNZjPKrwy87";

export const PARTYKIT_HOST =
  process.env.NODE_ENV === "production"
    ? "https://blog-v3-party.joshwcomeau.partykit.dev"
    : "127.0.0.1:1999";
export const PROTOCOL =
  process.env.NODE_ENV === "production" ? "https" : "http";
export const PARTYKIT_URL = `${PROTOCOL}://${PARTYKIT_HOST}`;