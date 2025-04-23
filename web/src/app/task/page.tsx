import { Suspense } from "react";
import TaskPage from "./TaskPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TaskPage />
    </Suspense>
  );
}
