import { useEffect } from "react";
import { 
  redirect,
  useNavigation,
  useSubmit,
  useLoaderData,
  Link, 
} from "react-router-dom";

import './file.css';

export async function action() {
  console.log('file.action called');

  return redirect(`/`);
}

export async function loader({ request, params }) {
  const url = new URL('http://localhost:3000/api/files/' + params.fileId)
  const search = {"tags": "true"}
  url.search = new URLSearchParams(search).toString();

  const res = await fetch(url)
  const data = await res.json();

  return { data };
}

export default function File() {
  const { data } = useLoaderData();

  return (
    <>
      <div className="container">
        <div className="child">
          <img src={data.result.name} />
        </div>
      </div>
      <ul>
        {data.result.Tags.map(tag => (
          <li key={tag.id} >
            <p><span>{tag.name}</span> after text</p>
          </li>
        ))}
      </ul>
      <p>I should show:</p>
      <ol>
        <li>An image</li>
        <li>The tags on the image w editors</li>
        <li>amend the current search string</li>
      </ol>
      <Link to="/">Home</Link>
    </>
  );
}
