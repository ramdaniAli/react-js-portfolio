// vite.config.js
import { defineConfig } from "file:///C:/Users/zeali/Desktop/react-archimed/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/zeali/Desktop/react-archimed/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { VitePWA } from "file:///C:/Users/zeali/Desktop/react-archimed/node_modules/vite-plugin-pwa/dist/index.js";
import mkcert from "file:///C:/Users/zeali/Desktop/react-archimed/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
var manifestForPlugin = {
  registerType: "prompt",
  includeAssets: [
    "/pwa-64x64.png",
    "/pwa-192x192.png",
    "/pwa-512x512.png",
    "/maskable-icon-512x512.png"
  ],
  manifest: {
    name: "ARCHIMED ENGINEERING",
    short_name: "ARCHIMED",
    description: "Architect Engineering and Consulting Company Website",
    theme_color: "#fafafa",
    background_color: "#fafafa",
    display: "fullscreen",
    scope: "/",
    start_url: "/",
    orientation: "portrait-primary",
    icons
  }
};
var icons = [
  {
    src: "/pwa-64x64.png",
    sizes: "64x64",
    type: "image/png"
  },
  {
    src: "/pwa-192x192.png",
    sizes: "192x192",
    type: "image/png"
  },
  {
    src: "/pwa-512x512.png",
    sizes: "512x512",
    type: "image/png"
  },
  {
    src: "/maskable-icon-512x512.png",
    sizes: "512x512",
    type: "image/png",
    purpose: "maskable"
  }
];
var vite_config_default = defineConfig({
  plugins: [react(), mkcert(), VitePWA(manifestForPlugin)],
  resolve: {
    alias: {
      components: "/src/components",
      theme: "/src/theme",
      assets: "/src/assets",
      context: "/src/context",
      routes: "/src/routes",
      layouts: "/src/layouts",
      bundles: "/src/bundles"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx6ZWFsaVxcXFxEZXNrdG9wXFxcXHJlYWN0LWFyY2hpbWVkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx6ZWFsaVxcXFxEZXNrdG9wXFxcXHJlYWN0LWFyY2hpbWVkXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy96ZWFsaS9EZXNrdG9wL3JlYWN0LWFyY2hpbWVkL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xuaW1wb3J0IG1rY2VydCBmcm9tIFwidml0ZS1wbHVnaW4tbWtjZXJ0XCI7XG5cbmNvbnN0IG1hbmlmZXN0Rm9yUGx1Z2luID0ge1xuICByZWdpc3RlclR5cGU6IFwicHJvbXB0XCIsXG4gICBcbiAgaW5jbHVkZUFzc2V0czogW1xuICAgIFwiL3B3YS02NHg2NC5wbmdcIixcbiAgICBcIi9wd2EtMTkyeDE5Mi5wbmdcIixcbiAgICBcIi9wd2EtNTEyeDUxMi5wbmdcIixcbiAgICBcIi9tYXNrYWJsZS1pY29uLTUxMng1MTIucG5nXCIsXG4gIF0sXG4gIG1hbmlmZXN0OiB7XG4gICAgbmFtZTogXCJBUkNISU1FRCBFTkdJTkVFUklOR1wiLFxuICAgIHNob3J0X25hbWU6IFwiQVJDSElNRURcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBcmNoaXRlY3QgRW5naW5lZXJpbmcgYW5kIENvbnN1bHRpbmcgQ29tcGFueSBXZWJzaXRlXCIsXG4gICAgdGhlbWVfY29sb3I6IFwiI2ZhZmFmYVwiLFxuICAgIGJhY2tncm91bmRfY29sb3I6IFwiI2ZhZmFmYVwiLFxuICAgIGRpc3BsYXk6IFwiZnVsbHNjcmVlblwiLFxuICAgIHNjb3BlOiBcIi9cIixcbiAgICBzdGFydF91cmw6IFwiL1wiLFxuICAgIG9yaWVudGF0aW9uOiBcInBvcnRyYWl0LXByaW1hcnlcIixcbiAgICBpY29uczogaWNvbnMsXG4gIH0sXG59O1xuXG5jb25zdCBpY29ucyA9IFtcbiAge1xuICAgIHNyYzogXCIvcHdhLTY0eDY0LnBuZ1wiLFxuICAgIHNpemVzOiBcIjY0eDY0XCIsXG4gICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgfSxcbiAge1xuICAgIHNyYzogXCIvcHdhLTE5MngxOTIucG5nXCIsXG4gICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxuICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gIH0sXG4gIHtcbiAgICBzcmM6IFwiL3B3YS01MTJ4NTEyLnBuZ1wiLFxuICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICB9LFxuICB7XG4gICAgc3JjOiBcIi9tYXNrYWJsZS1pY29uLTUxMng1MTIucG5nXCIsXG4gICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxuICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgcHVycG9zZTogXCJtYXNrYWJsZVwiLFxuICB9LFxuXTtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBta2NlcnQoKSwgVml0ZVBXQShtYW5pZmVzdEZvclBsdWdpbildLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIGNvbXBvbmVudHM6IFwiL3NyYy9jb21wb25lbnRzXCIsXG4gICAgICB0aGVtZTogXCIvc3JjL3RoZW1lXCIsXG4gICAgICBhc3NldHM6IFwiL3NyYy9hc3NldHNcIixcbiAgICAgIGNvbnRleHQ6IFwiL3NyYy9jb250ZXh0XCIsXG4gICAgICByb3V0ZXM6IFwiL3NyYy9yb3V0ZXNcIixcbiAgICAgIGxheW91dHM6IFwiL3NyYy9sYXlvdXRzXCIsXG4gICAgICBidW5kbGVzOiBcIi9zcmMvYnVuZGxlc1wiLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlMsU0FBUyxvQkFBb0I7QUFDeFUsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUN4QixPQUFPLFlBQVk7QUFFbkIsSUFBTSxvQkFBb0I7QUFBQSxFQUN4QixjQUFjO0FBQUEsRUFFZCxlQUFlO0FBQUEsSUFDYjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFVBQVU7QUFBQSxJQUNSLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLGFBQWE7QUFBQSxJQUNiLGFBQWE7QUFBQSxJQUNiLGtCQUFrQjtBQUFBLElBQ2xCLFNBQVM7QUFBQSxJQUNULE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUNYLGFBQWE7QUFBQSxJQUNiO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTSxRQUFRO0FBQUEsRUFDWjtBQUFBLElBQ0UsS0FBSztBQUFBLElBQ0wsT0FBTztBQUFBLElBQ1AsTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBO0FBQUEsSUFDRSxLQUFLO0FBQUEsSUFDTCxPQUFPO0FBQUEsSUFDUCxNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLEtBQUs7QUFBQSxJQUNMLE9BQU87QUFBQSxJQUNQLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQTtBQUFBLElBQ0UsS0FBSztBQUFBLElBQ0wsT0FBTztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLEVBQ1g7QUFDRjtBQUdBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsT0FBTyxHQUFHLFFBQVEsaUJBQWlCLENBQUM7QUFBQSxFQUN2RCxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxZQUFZO0FBQUEsTUFDWixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsSUFDWDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
