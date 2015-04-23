'use strict';

import React       from 'react';
import Stones      from './Stones';
import Marks       from './Marks';
import BranchMarks from './BranchMarks';
import MoveMark    from './MoveMark';
import Prisoners   from './Prisoners';

export default class extends React.Component {
  render() {
    return (
      <div className='gvreset gvboard-outer gvsprite-21-board'>
        <div className='gvreset gvboard'
        >
          <Stones ctx={this.props.ctx}/>
          <Marks ctx={this.props.ctx}/>
          <BranchMarks ctx={this.props.ctx}/>
          <MoveMark ctx={this.props.ctx}/>
          <Prisoners ctx={this.props.ctx}/>
          <div className='gvreset gvboard-overlay gvboard-fascade'
          >
            <div className='gvreset gvsprite-21-blankboard'/>
          </div>
        </div>
      </div>
    );
  }
}

