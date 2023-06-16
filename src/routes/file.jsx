import { useEffect } from "react";
import { 
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";

export async function action() {
  console.log('file.action called');

  return redirect(`/`);
}

export async function loader({ request }) {
  console.log('file.loader called');
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = "contacts from file.jsx";

  return { contacts, q };
}

export default function File() {
  const { contacts, q } = useLoaderData();

  return (
    <>
      <div id="file">
        <p>Hello</p>
      </div>
    </>
  );
}
