import "./Deal.css";

interface DealProps {
  color: string;
  title: string;
  subtitle: string;
}
function Deal({ color, title, subtitle }: DealProps) {
  return (
    <div className="deal-container">
      <div style={{ backgroundColor: color }} className="deal-item">
        <h5 style={{ fontWeight: "normal" }}>{title}</h5>
        <h3>{subtitle}</h3>
      </div>
      <span>Shop Now!</span>
    </div>
  );
}

export default Deal;
