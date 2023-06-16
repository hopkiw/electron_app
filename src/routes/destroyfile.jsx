import { useEffect } from "react";
import { 
  Outlet, 
  NavLink,
  Link, 
  useLoaderData,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";

export async function action() {
  console.log('destroyfile.action called');

  return redirect(`/`);
}

export async function loader({ request }) {
  console.log('destroyfile.loader called');
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = "contacts from destroyfile.jsx";

  return { contacts, q };
}

export default function DestroyFile() {
  return (
    <>
      <div id="file">
        <p>Hello from destroyfile</p>
      </div>
    </>
  );
}
