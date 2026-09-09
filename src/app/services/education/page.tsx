import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { educationCourses } from "@/lib/mockData";
import { SITE_CONFIG } from "@/lib/config";
import styles from "../services.module.css";

export const metadata = {
  title: "Education & Computer Courses | Unique Computer Centre - CSC Point",
  description: "Computer literacy training courses, typing classes, Tally accounting, UP Board form assistance, and scholarship application support.",
};

export default function EducationPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      
      <main className={styles.wrapper}>
        {/* Banner Hero */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Education &amp; Computer Courses</h1>
          <p className={styles.heroSubtitle}>
            Practical computer training, typing speed development, Tally Prime accounting, and scholarship assistance at our Harchanda centre.
          </p>
        </section>

        <section className={styles.container}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem", color: "var(--text-main)" }}>
            Available Computer Training Courses
          </h2>
          <div className={styles.servicesGrid} style={{ marginBottom: "3rem" }}>
            {educationCourses.map((course) => (
              <div key={course.id} className={styles.serviceCard}>
                <div className={styles.serviceHeader}>
                  <span className={styles.serviceIcon}>{course.icon}</span>
                  <h3 className={styles.serviceName}>{course.name}</h3>
                </div>
                <p className={styles.serviceDesc}>{course.description}</p>
                
                <div className={styles.requirements}>
                  <h5>Course Highlights:</h5>
                  <ul>
                    {course.features.map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ margin: "1rem 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 600 }}>Duration: {course.duration}</span>
                  {course.fee && <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--primary)" }}>{course.fee}</span>}
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.timeTag}>In-person Centre Training</span>
                  <a
                    href={SITE_CONFIG.getWhatsAppServiceLink(`${course.name} Course Enrollment`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.enquireBtn}
                  >
                    Enroll Now &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Academic Form Assistance */}
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem", color: "var(--text-main)" }}>
            Academic &amp; Scholarship Online Assistance
          </h2>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceHeader}>
                <span className={styles.serviceIcon}>🎓</span>
                <h3 className={styles.serviceName}>UP Pre/Post Matric Scholarship Form</h3>
              </div>
              <p className={styles.serviceDesc}>
                Online application assistance for Class 9 to University scholarship schemes under UP Social Welfare department.
              </p>
              <div className={styles.cardFooter}>
                <span className={styles.timeTag}>Instant Form Filing</span>
                <a href={SITE_CONFIG.getWhatsAppServiceLink("UP Scholarship Form")} className={styles.enquireBtn} target="_blank" rel="noopener noreferrer">
                  Apply via WhatsApp &rarr;
                </a>
              </div>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceHeader}>
                <span className={styles.serviceIcon}>📝</span>
                <h3 className={styles.serviceName}>UP Board &amp; University Exam Forms</h3>
              </div>
              <p className={styles.serviceDesc}>
                Error-free registration for Class 10/12 board exams, private candidate forms, and university admit card printouts.
              </p>
              <div className={styles.cardFooter}>
                <span className={styles.timeTag}>Same Day Service</span>
                <a href={SITE_CONFIG.getWhatsAppServiceLink("UP Board Exam Form")} className={styles.enquireBtn} target="_blank" rel="noopener noreferrer">
                  Apply via WhatsApp &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

