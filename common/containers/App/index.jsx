import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import styles from './styles.css';

const {shape, string} = PropTypes;

class App extends Component {
  static propTypes = {
    app: shape({title: string}),
  };

  render() {
    return <div>
      <h1 className={styles.title}>{this.props.app.title}</h1>
    </div>;
  }
}

const mapStateToProps = ({app}) => ({app});

export default connect(mapStateToProps)(App);
