import ContactUs from "../page-components/home/contact-us";
import StudentRecords from "../page-components/home/student-records";

export default function HomePage() {
  return (
    <div>
      {/* Student Record */}
      <StudentRecords />
      {/* Contact us  */}
      <ContactUs />
    </div>
  );
}
