import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Stevetech Repairs</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Located in Computer Village, Lagos, Stevetech Repairs provides a
          trained staff ready to meet your tech repair needs.
        </p>
        <address className="public__addr">
          Stevetech Repairs
          <br />
          William Drive
          <br />
         Ikeja, Lagos.
          <br />
          <a href="tel:+2347044378258">07044378258</a>
        </address>
        <br />
        <p>Owner: Stephen Ujah</p>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
  return content;
};
export default Public;
