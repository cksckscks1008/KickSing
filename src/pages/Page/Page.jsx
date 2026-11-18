import Progress from "../../components/Progress/Progress";
import "./Page.css";

export default function Page() {
  return (
    <div className="roadmap-page">
      <div className="roadmap-heading">
        <h1>언어 학습 로드맵</h1>
      </div>

      <Progress conceptCount={50} total={0} completed={0} />
    </div>
  );
}
