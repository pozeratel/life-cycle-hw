import { Component } from 'react';
import './Modal.css';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    console.log('Modal componentDidMount: додавання слухача клавіш');
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    console.log('Modal componentWillUnmount: видалення слухача клавіш');
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isOpen !== this.state.isOpen) {
      console.log(
        `Modal componentDidUpdate: модальне вікно ${this.state.isOpen ? 'відкрито' : 'закрито'}`
      );
      if (this.state.isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
  }

  openModal = () => {
    console.log('Відкриття модального вікна');
    this.setState({ isOpen: true });
  };

  closeModal = () => {
    console.log('Закриття модального вікна');
    this.setState({ isOpen: false });
  };

  handleKeyDown = (e) => {
    if (e.key === 'Escape' && this.state.isOpen) {
      console.log('Натиснута клавіша Escape');
      this.closeModal();
    }
  };

  handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.closeModal();
    }
  };

  render() {
    const { isOpen } = this.state;

    return (
      <>
        <button
          className="modal-button"
          onClick={this.openModal}
          aria-label="Open modal window"
        >
          Відкрити модальне вікно
        </button>

        {isOpen && (
          <div className="modal-backdrop" onClick={this.handleBackdropClick}>
            <div className="modal-content">
              <div className="modal-header">
                <h2>Модальне вікно</h2>
                <button
                  className="close-button"
                  onClick={this.closeModal}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Це модальне вікно створено з використанням React класового компонента та
                  методів життєвого циклу:
                </p>
                <ul>
                  <li>
                    <strong>componentDidMount</strong> - додає слухача для клавіші Escape
                  </li>
                  <li>
                    <strong>componentDidUpdate</strong> - управляє scroll у body
                  </li>
                  <li>
                    <strong>componentWillUnmount</strong> - видаляє слухача подій
                  </li>
                </ul>
                <p>Ви можете закрити це вікно:</p>
                <ul>
                  <li>Натиснути кнопку ✕</li>
                  <li>Натиснути клавішу Escape</li>
                  <li>Клікнути на фон (backdrop)</li>
                  <li>Натиснути кнопку "Закрити"</li>
                </ul>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={this.closeModal}>
                  Закрити
                </button>
                <button className="btn-primary" onClick={this.closeModal}>
                  Готово
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Modal;
