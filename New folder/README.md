# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## WebContainers & Terminal

- هذا المشروع يدعم تشغيل node/npm/vite فعليًا في المتصفح باستخدام WebContainers.
- الطرفية (Terminal) مدمجة باستخدام xterm.js.
- كل مراحل التطوير (تخطيط، تثبيت، بناء، عرض) تعمل بشكل حقيقي وتلقائي.

### المتطلبات:
- متصفح حديث (Chrome, Edge, Firefox)
- لا حاجة لأي backend
