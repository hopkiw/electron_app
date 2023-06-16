import { useEffect } from "react";
import { 
  Outlet, 
  NavLink,
  Link, 
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";

export async function action() {
  console.log('editfile.action called');

  return redirect(`/`);
}

export async function loader({ request }) {
  console.log('editfile.loader called');
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = "contacts from editfile.jsx";

  return { contacts, q };
}

export default function EditFile() {
  return (
    <>
      <div id="file">
        <p>Hello from editfile</p>
      </div>
    </>
  );
}
