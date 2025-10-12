import type { JSX, LazyExoticComponent } from "react";
import { Suspense } from "react";

import LoadingComponent from "./LoadingComponent";

export const suspenseWrapper = (
  Component: LazyExoticComponent<() => JSX.Element>
) => (
  <Suspense
    fallback={
      <div className="flex min-h-screen w-full items-center justify-center">
        <LoadingComponent />
      </div>
    }
  >
    <Component />
  </Suspense>
);
