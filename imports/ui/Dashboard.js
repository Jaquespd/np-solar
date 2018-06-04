import React from 'react';

import PrivateHeader from './PrivateHeader';
import MenuBar from './MenuBar';
// import NoteList from './NoteList';
import Editor from './Editor';
import Budget from './Budget';
import Link from './Link';
import Profile from './Profile';
import Kits from './Kits';

export default () => {
  return (
    <div>
      <PrivateHeader title="Natal Projetos"/>
      <div className="page-content">
        <div className="page-content__sidebar">
          {/* Abaixo era o NoteList */}
          <MenuBar/>
        </div>
        <div className="page-content__main">
          <Link/>
          <Profile/>
          <Kits/>
          {/* <Editor/> */}
          {/* <Budget/> */}
        </div>
      </div>
    </div>
  );
};
