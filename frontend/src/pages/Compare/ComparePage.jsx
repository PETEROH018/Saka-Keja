import CompareProperties from "../../components/CompareProperties/CompareProperties";
import Header from "../../components/layout/Header"; // check if this already exists too, same way
import Footer from "../../components/layout/Footer";  // path to teammate's actual file — confirm location

export default function ComparePage() {
  return (
    <>
      <Header />
      <CompareProperties propertyIds={["1", "3", "5"]} />
      <Footer />
    </>
  );
}