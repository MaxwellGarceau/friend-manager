import React from 'react';

class Modal extends React.Component {
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
          {this.props.children}
          <div>
            <button onClick={this.props.closeModal}>X</button>
          </div>
        </div>
      </div>
    );
  }
};

export default Modal;
