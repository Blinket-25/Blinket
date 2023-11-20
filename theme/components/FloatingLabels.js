const activeLabelStyles = {
  transform: "scale(0.85) translateY(-21px)",
  color: "#000",
};

export const FloatingLabels = {
  variants: {
    floating: {
      container: {
        _focusWithin: {
          label: {
            ...activeLabelStyles,
          },
        },
        "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
          {
            ...activeLabelStyles,
          },
        label: {
          top: "2px",
          left: 0,
          zIndex: 2,
          position: "absolute",
          backgroundColor: "white",
          pointerEvents: "none",
          mx: 3,
          px: 1,
          my: 2,
          transformOrigin: "left top",
          fontSize: 12,
          color: "#7c7c7c",
          fontWeight: "600",
        },
      },
    },
  },
};
