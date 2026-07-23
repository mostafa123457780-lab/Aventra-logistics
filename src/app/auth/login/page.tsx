import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-steel text-sm">جارٍ التحميل...</div>}>
      <LoginForm />
    </Suspense>
  );
}
