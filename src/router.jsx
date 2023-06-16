import { createBrowserRouter } from "react-router-dom";

import Index from "./routes/index";
import ErrorPage from "./error-page";
import Root, { 
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import File, {
  loader as fileLoader,
  action as fileAction,
} from "./routes/file";
import EditFile, {
  loader as editFileLoader,
  action as editFileAction,
} from "./routes/editfile";
import {
  action as destroyFileAction,
} from "./routes/destroyfile";
import First, {
  loader as firstLoader,
} from './components/first';

export default function getRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <First />,
      errorElement: <ErrorPage />,
      loader: firstLoader,
    },
  ]);
  return router;
}

export function getRouter2() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      loader: rootLoader,
      action: rootAction,
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
            { index: true, element: <Index /> },
            {
              path: "/first",
              element: <First />,
            },
            {
              path: "files/:fileId",
              element: <File />,
              loader: fileLoader,
              action: fileAction,
            },
            {
              path: "files/:fileId/edit",
              element: <EditFile />,
              loader: editFileLoader,
              action: editFileAction,
            },
            {
              path: "files/:fileId/destroy",
              action: destroyFileAction,
            },
          ]
        }
      ]
    },
  ]);
  return router;
}
