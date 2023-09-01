import { Link } from "react-router-dom";

const Public = () => {
  const styles = {
    offerList: {
      listStyleType: "circle", 
      paddingLeft: "20px",
      color: "#0073e6", 
      marginTop: "20px",
      marginBottom: "10px"
    },
  };

  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Steve-Technologies</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Steve-Technologies provides trained staffs ready to meet your tech
          needs.
        </p>
        <p>Our offers include: </p>
        <ul className="offer-list" style={styles.offerList}>
          <li>Systems Repairs and Upgrades</li>
          <li>Systems Installation</li>
          <li>General System Maintenance</li>
        </ul>

        <address className="public__addr">
          Steve-Technologies
          <br />
          William Drive, Computer Village
          <br />
          Ikeja, Lagos.
          <br />
          <a href="tel:+2347044378258">07044378258</a>
        </address>
        <br />
        <p>Director: Stephen Ujah</p>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
  return content;
};
export default Public;
