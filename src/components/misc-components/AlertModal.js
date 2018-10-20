import React from 'react';

class AlertModal extends React.Component {
  componentDidMount () {
    document.querySelector('body').style.overflow = 'hidden';
  };
  componentWillUnmount () {
    document.querySelector('body').style.overflow = 'scroll';
  };
  render () {
    return (
      <div className="box-layout box-layout--full-page box-layout--mandatory-overlay">
        <div className="box-layout__box alert-modal__box">
          <h2 className="alert-modal__main-text">{this.props.mainText}</h2>
          <p className="alert-modal__sub-text">{this.props.subText}</p>
          <div>
            <button onClick={this.props.confirmAction}>Confirm</button>
            <button onClick={this.props.denyAction}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
};

export default AlertModal;
