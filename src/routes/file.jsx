import { useEffect } from "react";
import { 
  redirect,
  useNavigation,
  useSubmit,
  useLoaderData,
  Link, 
} from "react-router-dom";

import pathList from '../db/fakey';
import './file.css';

export async function action() {
  console.log('file.action called');

  return redirect(`/`);
}

export async function loader({ request, params }) {
  console.log('file.loader called');
  // const img = getPaths[params.fileId];
  const img = pathList[params.fileId];
  // const tags = getTags(params.fileId);
  // const tags = tagList[params.fileId];
  const tags = ["static", "tags", "only"];


  return { img, tags };
}

export default function File() {
  const { img, tags } = useLoaderData();

  return (
    <>
      <div className="container">
        <div className="child">
          <img src={"/photos/" + img.path} />
        </div>
      </div>
      <ul>
        {tags.map(tag => (
          <li key={tag} >
            <p>{tag}</p>
          </li>
        ))}
      </ul>
      <p>I should show:</p>
      <ol>
        <li>An image</li>
        <li>The tags on the image w editors</li>
        <li>amend the current search string</li>
        <li>what's the url structure?</li>
      </ol>
      <Link to="/">Home</Link>
    </>
  );
}
