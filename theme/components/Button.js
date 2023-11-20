export const ButtonTheme = {
  baseStyle: {
    // bg: 'themeColor.100',
    // color: "#fff",
    fontWeight: "500",
  },

  variants: {
    base: {
      bg: "secondaryColor.1000",
      // border: "1px solid #ff3269",
      color: "#fff",
      // padding: "4px",
      _disabled: {
        _hover: {
          background: "secondaryColor.1000 !important",
        },
      },
    },
    outline: {
      bg: "#fff",
      border: "1px solid",
      // color: "#ff3269",
      borderColor: "secondaryColor.800",
      color: "secondaryColor.900",
      // height: "auto",
      // padding: "6px 20px",
      _disabled: {
        _hover: {
          background: "secondaryColor.800 !important",
        },
      },
    },
    cardOutline: {
      bg: "#fff",
      border: "1px solid",
      // color: "#ff3269",
      borderColor: "secondaryColor.800",
      color: "secondaryColor.900",
      height: "auto",
      padding: "6px 20px",
    },
    sm: {
      bg: "teal.500",
      fontSize: "md",
    },
    md: {
      // bg: 'themeColor.100',
      fontSize: "sm",
    },
  },
  defaultProps: {
    // size: 'sm', // default is md
    // variant: 'base', // default is solid
  },
};
