import React from 'react';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
// import Link from './Link';

export default () => {
  return (
    <div>
      <PrivateHeader title="Natal Projetos"/>
      <div className="page-content">
        <div className="page-content__sidebar">
          <NoteList/>
        </div>
        <div className="page-content__main">
          <p>Kits component here</p>
        </div>
      </div>
    </div>
  );
};
