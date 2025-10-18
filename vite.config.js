import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import svgr from "vite-plugin-svgr";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0', // 모든 네트워크 인터페이스에서 접속 허용 (내부/외부 모두)
    port: 80, // HTTP 기본 포트 사용
    open: false, // 브라우저 자동 열기 비활성화
    strictPort: true, // 포트가 사용중일 때 다른 포트로 변경하지 않음
    hmr: {
      host: 'localhost', // HMR 호스트 설정
    },
    allowedHosts: ['roll.iptime.org', '.iptime.org', 'localhost', '14.63.56.91'], // 허용된 호스트 명시적 지정
  },
});
