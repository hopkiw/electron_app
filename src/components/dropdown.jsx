import React from 'react';
import { Form } from "react-router-dom";
import { useState } from 'react'
import { MenuUnfoldOutlined } from '@ant-design/icons';

import './dropdown.css';

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  let isNavOpen;
  if (isOpen) {
    isNavOpen = ' is-nav-open';
  } else {
    isNavOpen = '';
  }
  const classNames = 'menu' + isNavOpen;
  const q = 'fake default';

  return (
    <>
      <div className={classNames}>
        <div className="nav">
          <div className="nav__body">
            <Form id="search-form" role="search">
              <input
                id="q"
                placeholder="Search"
                type="search"
                name="q"
                defaultValue={q}
              />
              <button type="submit" onClick={() => setIsOpen(false)}>Search</button>
            </Form>
            <p>Some important information, perhaps.</p>
          </div>
        </div>
      </div>
      <div className="menu-footer">
        <MenuUnfoldOutlined onClick={() => setIsOpen(!isOpen)} />
      </div>
    </>
  );
}
