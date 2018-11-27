import React from 'react';

class Modal extends React.Component {
  componentDidMount () {
    document.querySelector('body').style.overflow = 'hidden';
  };
  componentWillUnmount () {
    document.querySelector('body').style.overflow = 'scroll';
  };
  render () {
    const modalClasses = this.props.modalClasses ? this.props.modalClasses : '';
    return (
      <div className="box-layout box-layout--full-page box-layout--mandatory-overlay">
        <div className={`box-layout__box alert-modal__box ${modalClasses}`}>
          <button className="button button--cancel alert-modal__cancel" onClick={this.props.closeModal}>X</button>
          {this.props.children}
        </div>
      </div>
    );
  }
};

export default Modal;
