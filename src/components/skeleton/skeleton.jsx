// // LoadingSkeleton.js
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

// export default function LoadingSkeleton() {
//   return (
//     <div style={{ padding: "20px" }}>
//       <Skeleton height={200} />
//       <Skeleton height={20} width={300} style={{ marginTop: "10px" }} />
//       <Skeleton height={20} width={200} style={{ marginTop: "10px" }} />
//     </div>
//   );
// }

import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function Variants() {
  return (
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </Stack>
  );
}
