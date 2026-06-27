import CheckoutList from "../../components/CheckoutList/CheckoutList";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  return (
    <div className="checkout-page">

      <h1>Tu cesta</h1>

      <div className="checkout-content">

        <CheckoutList />

        <CheckoutSummary />

      </div>

    </div>
  );
}