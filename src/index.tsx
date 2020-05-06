import React from 'react';
import ReactDOM from 'react-dom';
import Post from './Post';
import Daily from './Daily';

class Index extends React.Component{
    render(){
      return(
        <div>
          <Post />
          <Daily content="1" createTime="xx"/>
        </div>
      )
    }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
