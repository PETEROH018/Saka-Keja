import CompareProperties from "../../components/CompareProperties/CompareProperties";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function ComparePage() {
  return (
    <>
      <Header />
      <CompareProperties propertyIds={["1", "3", "5"]} />
      <Footer />
    </>
  );
}