import React from 'react';
import ReactDOM from 'react-dom';

import './styles.less';
import DefaultExample from './DefaultExample';

class App extends React.Component {
  render() {
    return (
      <div className="page">
        <h1>Multi DatePicker</h1>
        <p>A date picker that can select multiple dates</p>
        <p>
          <a href="https://github.com/rsuite/multi-date-picker">
            https://github.com/rsuite/multi-date-picker
          </a>
        </p>
        <hr />
        <DefaultExample />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
