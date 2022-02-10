/* src/router/loadable */
import { Suspense } from "react";

// =================================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<div>loading...</div>}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
