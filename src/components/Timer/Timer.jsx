import { Component } from "react";
import "./Timer.css";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      isRunning: false,
      lapTimes: [],
    };
    this.timerInterval = null;
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer = () => {
    if (!this.state.isRunning) {
      this.setState({ isRunning: true });
      this.timerInterval = setInterval(() => {
        this.setState((prevState) => ({
          time: prevState.time + 1,
        }));
      }, 1000);
    }
  };

  pauseTimer = () => {
    if (this.state.isRunning) {
      clearInterval(this.timerInterval);
      this.setState({ isRunning: false });
      console.log("Таймер на паузі:", this.state.time);
    }
  };

  stopTimer = () => {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.setState({ isRunning: false });
  };

  resetTimer = () => {
    this.stopTimer();
    this.setState({ time: 0, lapTimes: [] });
    console.log("Таймер скинут");
  };

  recordLap = () => {
    const { time, lapTimes } = this.state;
    if (time > 0) {
      const newLap = {
        id: lapTimes.length + 1,
        time: time,
        timestamp: new Date().toLocaleTimeString("uk-UA"),
      };
      this.setState({ lapTimes: [...lapTimes, newLap] });
      console.log("Записаний круг:", newLap);
    }
  };

  deleteLap = (id) => {
    const { lapTimes } = this.state;
    this.setState({ lapTimes: lapTimes.filter((lap) => lap.id !== id) });
  };

  formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const pad = (num) => String(num).padStart(2, "0");

    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
    }
    return `${pad(minutes)}:${pad(secs)}`;
  };

  render() {
    const { time, isRunning, lapTimes } = this.state;

    return (
      <div className="timer-container">
        <h2>⏱️ Таймер</h2>

        <div className="timer-display">
          <div className="timer-time">{this.formatTime(time)}</div>
          <div className={`timer-status ${isRunning ? "running" : ""}`}>
            {isRunning ? "▶️ Працює" : "⏸️ На паузі"}
          </div>
        </div>

        <div className="timer-controls">
          {!isRunning ? (
            <button onClick={this.startTimer} className="btn-start">
              ▶️ Старт
            </button>
          ) : (
            <button onClick={this.pauseTimer} className="btn-pause">
              ⏸️ Пауза
            </button>
          )}
          <button
            onClick={this.recordLap}
            className="btn-lap"
            disabled={time === 0}
          >
            🔔 Круг
          </button>
          <button onClick={this.resetTimer} className="btn-reset">
            🔄 Скидання
          </button>
        </div>

        <div className="timer-info">
          <p>
            ⏰ <strong>Таймер запущено автоматично</strong> при завантаженні
            цього компонента (componentDidMount).
          </p>
          <p>
            🛑 <strong>Таймер зупинватиметься</strong> коли компонент буде
            видалено з DOM (componentWillUnmount).
          </p>
        </div>

        {lapTimes.length > 0 && (
          <div className="timer-laps">
            <h3>Круги часу ({lapTimes.length})</h3>
            <div className="laps-list">
              {lapTimes.map((lap) => (
                <div key={lap.id} className="lap-item">
                  <div className="lap-info">
                    <span className="lap-number">Круг {lap.id}</span>
                    <span className="lap-time">
                      {this.formatTime(lap.time)}
                    </span>
                  </div>
                  <div className="lap-meta">
                    <span className="lap-timestamp">{lap.timestamp}</span>
                    <button
                      onClick={() => this.deleteLap(lap.id)}
                      className="btn-delete-lap"
                      aria-label="Delete lap"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="timer-legend">
          <h3>Методи життєвого циклу:</h3>
          <ul>
            <li>
              <strong>componentDidMount</strong> - запускає таймер після
              монтування компонента
            </li>
            <li>
              <strong>componentWillUnmount</strong> - зупиняє таймер перед
              видаленням компонента
            </li>
            <li>
              <strong>componentDidUpdate</strong> - логує поточний час при його
              зміні
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Timer;
