import '../styles/scoreboard.css';

const ScoreboardEntry = (props) => {
  const { data } = props;
  return (
    <div className="scoreboard-entry">
      <div className="scoreboard-entry-item">{data.name}</div>
      <div className="scoreboard-entry-item">{data.time}</div>
    </div>
  );
};

export default ScoreboardEntry;
