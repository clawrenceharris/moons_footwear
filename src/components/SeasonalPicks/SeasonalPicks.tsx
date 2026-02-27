import "./SeasonalPicks.css";
import seasonalPick1 from "../../assets/images/seasonal1.jpeg";
import seasonalPick2 from "../../assets/images/seasonal2.jpeg";
import seasonalPick3 from "../../assets/images/seasonal3.jpeg";
import seasonalPick4 from "../../assets/images/seasonal4.png";

const SeasonalPicks = () => {
  return (
    <div className="seasonal-picks-container">
      <div className="seasonal-grid">
        <div className="seasonal-grid-content">
          <p>Step into the new season with our latest picks</p>
          <button className="button-primary">Shop Now</button>
        </div>

        <img className="image-left" src={seasonalPick2} alt="Seasonal Left" />
        <img
          className="image-middle-top"
          alt="Seasonal Middle Top"
          src={seasonalPick1}
        />
        <img
          className="image-middle-bottom"
          src={seasonalPick4}
          alt="Seasonal Middle Bottom"
        />
        <img className="image-right" src={seasonalPick3} alt="Seasonal Right" />
      </div>
    </div>
  );
};

export default SeasonalPicks;
