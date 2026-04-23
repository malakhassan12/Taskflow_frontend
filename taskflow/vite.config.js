import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
// import vitePluginImp from "vite-plugin-imp";

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//     vitePluginImp({
//       libList: [
//         {
//           libName: "antd",
//           style: (name) => `antd/es/${name}/style`,
//         },
//       ],
//     }),
//     visualizer({ open: true }),
//   ],
//   build: {
//     chunkSizeWarningLimit: 300,
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           "react-vendor": ["react", "react-dom", "react-router-dom"],
//         },
//       },
//     },
//   },
// });

// // ... بقية الـ imports
// export default defineConfig({
//   // base: '/Taskflow_frontend/', // اسم الـ Repo على GitHub
//   plugins: [
//     react(),
//     tailwindcss(), // ده المسؤول عن تشغيل الستايل بتاع Tailwind
//     visualizer({ open: false }), // خليه false عشان ميفضلش يفتح كل شوية وأنت بتجرب
//   ],
//   build: {
//     chunkSizeWarningLimit: 300,
//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           // تقسيم المكتبات الأساسية في ملف لوحدها
//           if (id.includes('node_modules')) {
//             if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
//               return 'react-vendor';
//             }
//           }
//         },
//       },
//     },
//   },
// });

export default defineConfig(({ mode }) => {
  return {
    // base: mode === "production" ? "/Taskflow_frontend/" : "/",
    base: "/",
    plugins: [
      react(),
      tailwindcss(), // ده اللي بيخلي ستايل Tailwind يظهر في الـ build
      visualizer({ open: false }),
    ],

    build: {
      chunkSizeWarningLimit: 300,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // تجميع مكتبات React الأساسية في ملف منفصل لتحسين الأداء
            if (id.includes("node_modules")) {
              if (
                id.includes("react") ||
                id.includes("react-dom") ||
                id.includes("react-router-dom")
              ) {
                return "react-vendor";
              }
            }
          },
        },
      },
    },
  };
});
