import type { JSX, LazyExoticComponent } from "react";
import { Suspense } from "react";

export const suspenseWrapper = (
  Component: LazyExoticComponent<() => JSX.Element>
) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);
