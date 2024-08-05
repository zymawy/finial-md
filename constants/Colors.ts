/* This code snippet is defining a color scheme object with light and dark themes in TypeScript. It
includes color variables for tints, primary, and secondary colors. The object contains properties
for the light theme and dark theme, each specifying text color, background color, tint color, and
tab icon colors for default and selected states. The tintColorLight and tintColorDark variables are
used to set the tint color for the light and dark themes respectively. The primary and secondary
colors are also defined for use within the color scheme. */
const tintColorLight = "#7C83FD";
const tintColorDark = "#fff";
export const primary = "#88D66C"; //#96BAFF, 7C83FD
export const secondary = "#b6f5a0"; //#96BAFF, 96BAFF

export default {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};
