/**
  This component allows us to create pockets of DOM that apply a specific color mode, regardless of the user's settings. For example, <Playground> should always be dark.

  NOTE: Unlike ColorModeContainer in Course Platform, this one doesn't inherit the default value from context. That's because it would lead to a FOUC: the context value isn't known during the initial SSR render. If I want a chunk of the site to be colored based on the global color mode preference, I should use the LIGHT_COLORS_CSS / DARK_COLORS_CSS strings. See `/app/email/[emailSlug]/page.tsx` for an example (the Content styled component).
*/

import { styled } from '@linaria/react';
import * as React from 'react';

import {
    DARK_COLORS_CSS,
    LIGHT_COLORS,
    LIGHT_COLORS_CSS
} from '../constants';

function ColorModeContainer(
  {
    colorMode,
    useAdaptiveColors = true,
    forwardedAs = 'div',
    ...delegated
  }, ref) {
  const Wrapper = colorMode === 'light' ? LightWrapper : DarkWrapper;

  return (
    <Wrapper
      ref={ref}
      as={forwardedAs}
      data-use-adaptive-colors={String(useAdaptiveColors)}
      {...delegated}
    />
  );
}

export const LightWrapper = styled.div`
  ${LIGHT_COLORS_CSS}
  color: var(--color-text);
  background: var(--color-background);
  border-radius: 4px;
  color-scheme: light;

  /* The default background for our paper cards in Dark Mode is the "adaptive white" offwhite (specified below). In some cases, we *want* it to use the same white as Light Mode. This variable allows for that: */
  --color-original-white: ${LIGHT_COLORS['--color-background']};

  --selection-background-color: hsl(50deg 100% 78%);
  --selection-text-color: black;

  /*
    When displaying a light-colored section in dark mode, we don't want to overwrite "adaptive" colors. These colors are intended to soften contrast, and so it would be harsh to have true white in dark mode.
  */
  html[data-color-mode='dark'] &[data-use-adaptive-colors='true'] {
    --color-adaptive-white: inherit !important;
    --color-background: var(--color-adaptive-white);
  }
`;

export const DarkWrapper = styled.div`
  ${DARK_COLORS_CSS}
  color: var(--color-text);
  background: var(--color-background);
  border-radius: 4px;
  color-scheme: dark;

  --selection-background-color: hsl(250deg 20% 60% / 0.35);
  --selection-text-color: white;
`;

export default React.forwardRef(
  ColorModeContainer
);