import Progress from "../../components/Progress/Progress";
import Card from "../../components/Card/Card";
import AddGoal from "../../components/AddGoal/AddGoal";
import cards from "../../data/roadmap";
import "./Page.css";

export default function Page() {
  return (
    <div className="roadmap-page">
      <div className="roadmap-heading">
        <h1>언어 학습 로드맵</h1>
        <AddGoal />
      </div>

      <Progress conceptCount={50} total={0} completed={0} />
      <div className="card-grid">
        {cards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}
