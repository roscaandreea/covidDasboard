import LegendItem from "./LegendItem";

var legendItems = [
  new LegendItem(
    "20,000,000 +",
    "#741f1f",
    // "#8b0000",
    (vaccines) => vaccines>= 20_000_000,
    "white"
  ),

  new LegendItem(
    "6,000,000 - 19,999,999",
    // "#741f1f",
    "#9c2929",
    (vaccines) => vaccines >= 6_000_000 && vaccines < 19_999_999,
    "White"
  ),

  new LegendItem(
    "1,000,000 - 5,999,999",
    "#c57f7f",
    (vaccines) => vaccines >= 1_000_000 && vaccines < 5_999_999
  ),

  new LegendItem(
    "200,000 - 999,999",
    "#d8aaaa",
    (vaccines) => vaccines >= 200_000 && vaccines < 999_999
  ),

  new LegendItem(
    "0 - 199,999",
    "#ebd4d4",
    (vaccines) => vaccines > 0 && vaccines < 199_999
  ),

  new LegendItem("No Data", "#ffffff", (vaccines) => true),
];

export default legendItems;
