import React from 'react';
import { 
  Form,
  redirect,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { useState } from 'react'
// import { Icon } from 'antd';
import './style.css';

export async function loader({ request }) {
  console.log('destroyfile.loader called');
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = "contacts from destroyfile.jsx";

  return { contacts, q };
}

// toggle class added to this
export default function First() {
  const { contacts, q } = useLoaderData();
  const [isOpen, setIsOpen] = useState(false);
  let isNavOpen;
  if (isOpen) {
    isNavOpen = ' is-nav-open';
  } else {
    isNavOpen = '';
  }
  const classNames = 'wrapper' + isNavOpen;

  return (
    <>
      <div className={classNames}>
        <div className="nav">
          <button 
            className="nav__icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            Toggle
          </button>
          <div className="nav__body">
            <Form id="search-form" role="search">
              <input
                id="q"
                placeholder="Search"
                type="search"
                name="q"
                defaultValue={q}
              />
              <button type="submit">Search</button>
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              />
            </Form>
          </div>
        </div>
      </div>
      <div className="gallery">
        <p>Heres some text I want to obscure</p>
        <p>Heres some text I want to obscure</p>
        <p>Heres some text I want to obscure</p>
        <p>Heres some text I want to obscure</p>
        <p>Heres some text I want to obscure</p>
        <p>Heres some text I want to obscure</p>
        <p>Heres some text I want to obscure</p>
        <p>Heres some text I want to obscure</p>
        <p>Heres some text I want to obscure</p>
        <p>Heres some text I want to obscure</p>
        <p>Heres some text I want to obscure</p>
      </div>
    </>
  );
}
