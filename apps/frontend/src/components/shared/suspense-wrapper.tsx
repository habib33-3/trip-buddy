import type { JSX, LazyExoticComponent } from "react";
import { Suspense } from "react";

import { Loader } from "lucide-react";

export const suspenseWrapper = (
  Component: LazyExoticComponent<() => JSX.Element>
) => (
  <Suspense
    fallback={
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loader />
      </div>
    }
  >
    <Component />
  </Suspense>
);
