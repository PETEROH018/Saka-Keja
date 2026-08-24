import CompareProperties from "../../components/CompareProperties/CompareProperties";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function ComparePage() {
  return (
    <>
      <Navbar />
      <CompareProperties propertyIds={["1", "3", "5"]} />
      <Footer />
    </>
  );
}