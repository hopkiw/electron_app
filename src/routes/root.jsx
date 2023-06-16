import { useEffect } from "react";
import { 
  Outlet, 
  useLoaderData,
  Form,
  redirect,
} from "react-router-dom";
//import { getContacts, createContact } from "../contacts";

export async function action() {
  console.log('root.action called');

  return redirect(`/`);
}

export async function loader({ request }) {
  console.log('root.loader called');
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = "contacts from root.jsx";

  return { contacts, q };
}

export default function Root() {
  const { contacts, q } = useLoaderData();

  const searching = false;

  return (
    <>
      <div id="searchBar">
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
