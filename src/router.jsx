import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "./error-page";
import Gallery, {
  loader as galleryLoader,
  action as galleryAction,
} from "./routes/gallery";
import File, {
  loader as fileLoader,
} from "./routes/file";
import Tags, {
  loader as tagsLoader,
} from "./routes/tags";
import Tag, {
  loader as tagLoader,
} from "./routes/tag";

export function getRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
            { 
              index: true, 
              element: <Gallery />,
              loader: galleryLoader,
            },
            // technically we would like to mirror but the main view of this app
            // is the gallery aka 'files', but with searches applied. no need
            // for 'files' generically, that's what a filesystem is for. maybe
            // make it a virtual path-based browser? tags common to a dir etc.
            {
              path: "files/:fileId",
              element: <File />,
              loader: fileLoader,
            },
            {
              path: "tags",
              element: <Tags />,
              loader: tagsLoader,
              children: [
                {
                  path: "tags/:tagId",
                  element: <Tag />,
                  loader: tagLoader,
                },
              ],
            },
          ]
        }
      ]
    },
  ]);

  return router;
}
