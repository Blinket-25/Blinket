import { extendTheme } from "@chakra-ui/react";
import { ButtonTheme } from "./components/Button";
import { FloatingLabels } from "./components/FloatingLabels";
import { SECONDARY_THEME_COLOR, THEME_COLOR } from "@/constants";

// import borders from './foundations/borders'

const theme = extendTheme({
  // borders,
  defaultProps: {
    focus: "none !important",
    focusBorderColor: "gray.500",
  },
  fonts: {
    heading: "Open Sans",
    subHeading: "Times New Roman",
    body: "'Ubuntu'",
  },
  colors: {
    themeColor: {
      100: `rgb(${THEME_COLOR.r} ${THEME_COLOR.g} ${THEME_COLOR.b} / 10%)`,
      200: `rgb(${THEME_COLOR.r} ${THEME_COLOR.g} ${THEME_COLOR.b} / 20%)`,
      300: `rgb(${THEME_COLOR.r} ${THEME_COLOR.g} ${THEME_COLOR.b} / 30%)`,
      400: `rgb(${THEME_COLOR.r} ${THEME_COLOR.g} ${THEME_COLOR.b} / 40%)`,
      500: `rgb(${THEME_COLOR.r} ${THEME_COLOR.g} ${THEME_COLOR.b} / 50%)`,
      600: `rgb(${THEME_COLOR.r} ${THEME_COLOR.g} ${THEME_COLOR.b} / 60%)`,
      700: `rgb(${THEME_COLOR.r} ${THEME_COLOR.g} ${THEME_COLOR.b} / 70%)`,
      800: `rgb(${THEME_COLOR.r} ${THEME_COLOR.g} ${THEME_COLOR.b} / 80%)`,
      900: `rgb(${THEME_COLOR.r} ${THEME_COLOR.g} ${THEME_COLOR.b} / 90%)`,
      1000: `rgb(${THEME_COLOR.r} ${THEME_COLOR.g} ${THEME_COLOR.b} / 100%)`,
    },
    secondaryColor: {
      100: `rgb(${SECONDARY_THEME_COLOR.r} ${SECONDARY_THEME_COLOR.g} ${SECONDARY_THEME_COLOR.b} / 10%)`,
      200: `rgb(${SECONDARY_THEME_COLOR.r} ${SECONDARY_THEME_COLOR.g} ${SECONDARY_THEME_COLOR.b} / 20%)`,
      300: `rgb(${SECONDARY_THEME_COLOR.r} ${SECONDARY_THEME_COLOR.g} ${SECONDARY_THEME_COLOR.b} / 30%)`,
      400: `rgb(${SECONDARY_THEME_COLOR.r} ${SECONDARY_THEME_COLOR.g} ${SECONDARY_THEME_COLOR.b} / 40%)`,
      500: `rgb(${SECONDARY_THEME_COLOR.r} ${SECONDARY_THEME_COLOR.g} ${SECONDARY_THEME_COLOR.b} / 50%)`,
      600: `rgb(${SECONDARY_THEME_COLOR.r} ${SECONDARY_THEME_COLOR.g} ${SECONDARY_THEME_COLOR.b} / 60%)`,
      700: `rgb(${SECONDARY_THEME_COLOR.r} ${SECONDARY_THEME_COLOR.g} ${SECONDARY_THEME_COLOR.b} / 70%)`,
      800: `rgb(${SECONDARY_THEME_COLOR.r} ${SECONDARY_THEME_COLOR.g} ${SECONDARY_THEME_COLOR.b} / 80%)`,
      900: `rgb(${SECONDARY_THEME_COLOR.r} ${SECONDARY_THEME_COLOR.g} ${SECONDARY_THEME_COLOR.b} / 90%)`,
      1000: `rgb(${SECONDARY_THEME_COLOR.r} ${SECONDARY_THEME_COLOR.g} ${SECONDARY_THEME_COLOR.b} / 100%)`,
    },
  },
  components: {
    Button: ButtonTheme,
    Form: FloatingLabels,
  },
});

export default theme;
