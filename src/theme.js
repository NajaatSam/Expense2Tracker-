import { createTheme } from "@aws-amplify/ui-react";

export const theme = createTheme({
  name: "pinkCream",
  tokens: {
    colors: {
      // brand
      brand: {
        primary: {
          10:  "#FFF6EF",  // cream wash
          40:  "#F7C9D6",
          60:  "#EF95B1",
          80:  "#E97A9D",  // main
          90:  "#D94D7A",  // hover/active
          100: "#C23762",  // strong
        },
        secondary: {
          10: "#FFFDF9",
          80: "#FFE3C8",   // warm cream accent
          100:"#E9C9A7",
        },
      },

      // surfaces & text
      background: {
        primary: "#FFF8F3",
        secondary: "#FFFFFF",
        tertiary:  "#FFF6EF",
      },
      font: {
        primary:   "#2E2430",   // deep plum (good contrast on cream)
        secondary: "#5C4E57",
        inverse:   "#FFFFFF",
      },
      border: { primary: "#F3DDE4" },
      shadow: { primary: "0 8px 20px rgba(233,122,157,0.12)" },
    },

    radii: {
      small:  "10px",
      medium: "14px",
      large:  "20px",
      xl:     "28px",
    },
    borders: {
      width: { small: "1px" },
    },
  },

  // Light component touch-ups
  components: {
    button: {
      primary: {
        backgroundColor: "{colors.brand.primary.80}",
        color: "{colors.font.inverse}",
        _hover: { backgroundColor: "{colors.brand.primary.90}" },
        _focus: { boxShadow: "0 0 0 3px rgba(233,122,157,0.35)" },
        borderRadius: "{radii.large}",
      },
      link: {
        color: "{colors.brand.primary.80}",
      },
    },
    textfield: {
      borderColor: "{colors.border.primary}",
      borderRadius: "{radii.medium}",
      _focus: { boxShadow: "0 0 0 3px rgba(233,122,157,0.25)" },
    },
    badge: {
      info: {
        backgroundColor: "{colors.brand.primary.10}",
        color: "{colors.brand.primary.100}",
        borderColor: "{colors.brand.primary.40}",
      },
    },
    card: {
      container: {
        backgroundColor: "{colors.background.secondary}",
        boxShadow: "{colors.shadow.primary}",
        borderRadius: "{radii.xl}",
      },
    },
  },
});
