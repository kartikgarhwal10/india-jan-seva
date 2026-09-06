import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import HeroSlider from "@/components/Home/HeroSlider";
import ServiceSearch from "@/components/Home/ServiceSearch";
import { services, reviews, faqs } from "@/lib/mockData";
import { prisma } from "@/lib/prisma";
import { SITE_CONFIG } from "@/lib/config";
import PVCProductCard from "@/components/PVCProductCard/PVCProductCard";
import styles from "./page.module.css";

export default async function Home() {
  // Query database for active products
  const activeProducts = await prisma.product.findMany({ where: { active: true } });

  // Extract a few popular items for highlight
  const popularServices = services.slice(0, 4);
  const featuredPvc = activeProducts.filter(p => p.featured);
  const showcasePvc = featuredPvc.length > 0 ? featuredPvc : activeProducts.slice(0, 3);
  const minPrice = activeProducts.length > 0 ? Math.min(...activeProducts.map(p => p.price)) : 149;

  const selectedReviews = reviews.slice(0, 3);

  // Group FAQs for homepage
  const homepageFaqs = faqs.slice(0, 5);

  return (
    <div className={styles.main}>
      <Header />

      <main>
        {/* Hero Slider Banner */}
        <HeroSlider />

        {/* Autocomplete Service Search */}
        <ServiceSearch />

        {/* Core Service Categories */}
        <section className={styles.section} id="categories">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Our Offerings</span>
              <h2 className={styles.sectionTitle}>Explore Service Categories</h2>
              <p className={styles.sectionSubtitle}>
                Select a category below to discover all available services and documentation requirements.
              </p>
            </div>

            <div className={styles.categoriesGrid}>
              <div className={styles.categoryCard}>
                <div className={styles.catIcon}>🏢</div>
                <h3 className={styles.catTitle}>CSC Services</h3>
                <p className={styles.catDesc}>
                  Government-to-citizen services including Aadhaar prints, Ayushman cards, e-Shram registration, and PM-Kisan verification.
                </p>
                <Link href="/services/csc" className={styles.catBtn}>
                  View Services &rarr;
                </Link>
              </div>

              <div className={styles.categoryCard}>
                <div className={styles.catIcon}>💳</div>
                <h3 className={styles.catTitle}>PVC Smart Cards</h3>
                <p className={styles.catDesc}>
                  Order high-quality, glossy PVC cards for Aadhaar, PAN, Voter, driving license, and RC starting at just ₹149.
                </p>
                <Link href="/pvc-cards" className={styles.catBtn}>
                  Browse Products &rarr;
                </Link>
              </div>

              <div className={styles.categoryCard}>
                <div className={styles.catIcon}>📄</div>
                <h3 className={styles.catTitle}>Digital Services</h3>
                <p className={styles.catDesc}>
                  Online applications for Uttar Pradesh income, caste, and domicile certificates, banking tasks, and official forms.
                </p>
                <Link href="/services/digital" className={styles.catBtn}>
                  View Services &rarr;
                </Link>
              </div>

              <div className={styles.categoryCard}>
                <div className={styles.catIcon}>🎓</div>
                <h3 className={styles.catTitle}>Education Services</h3>
                <p className={styles.catDesc}>
                  Board exam forms, scholarship applications, admission assistance, and basic digital literacy computer courses.
                </p>
                <Link href="/services/education" className={styles.catBtn}>
                  View Services &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Services Section */}
        <section className={`${styles.section} ${styles.bgMuted}`} id="popular-services">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Top Requests</span>
              <h2 className={styles.sectionTitle}>Popular Services</h2>
              <p className={styles.sectionSubtitle}>
                Here are the most frequently requested digital services at our center in Jarwal.
              </p>
            </div>

            <div className={styles.servicesGrid}>
              {popularServices.map((service) => (
                <div key={service.id} className={styles.serviceCard}>
                  <div className={styles.serviceHeader}>
                    <span className={styles.serviceIcon}>{service.icon}</span>
                    <h3 className={styles.serviceName}>{service.name}</h3>
                  </div>
                  <p className={styles.serviceDesc}>{service.description}</p>
                  <div className={styles.requirements}>
                    <h5>Required:</h5>
                    <ul>
                      {service.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.cardFooter}>
                    <span className={styles.timeTag}>Time: {service.processingTime}</span>
                    <a
                      href={`https://wa.me/917084666326?text=Hello%20Unique%20Computer%20Centre,%20mujhe%20${encodeURIComponent(service.name)}%20ke%20baare%20mein%20enquiry%20karni%20hai.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.enquireBtn}
                    >
                      Enquire Now &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link href="/services" className={styles.btnSecondary} style={{ display: 'inline-block' }}>
                View All Services
              </Link>
            </div>
          </div>
        </section>

        {/* PVC Card Showcase Section */}
        <section className={styles.section} id="pvc-showcase">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Premium Smart Prints</span>
              <h2 className={styles.sectionTitle}>Premium PVC Cards</h2>
              <p className={styles.sectionSubtitle}>
                Durable, pocket-sized, waterproof prints of your essential documents. Starting at just <strong>₹{minPrice}</strong> with all India delivery.
              </p>
            </div>

            <div className={styles.pvcGrid}>
              {showcasePvc.map((product) => (
                <PVCProductCard
                  key={product.id}
                  product={{
                    id: product.id,
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    shortDescription: product.shortDescription,
                    description: product.description,
                    image: product.image,
                    active: product.active,
                  }}
                />
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link href="/pvc-cards" className={styles.btnPrimary} style={{ display: 'inline-block' }}>
                Browse All PVC Products
              </Link>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className={`${styles.section} ${styles.bgMuted}`} id="founder">
          <div className={styles.container}>
            <div className={styles.founderGrid}>
              <div className={styles.founderImageWrapper}>
                <Image
                  src="/images/founder.jpg"
                  alt="Mohd Irfak Ahmad"
                  width={400}
                  height={400}
                  className={styles.founderImage}
                />
              </div>
              <div className={styles.founderDetails}>
                <span className={styles.sectionBadge}>Centre Leadership</span>
                <h2 className={styles.founderName}>Mohd Irfak Ahmad</h2>
                <span className={styles.founderRole}>Founder &amp; Operator</span>
                <p className={styles.founderQuote}>
                  &quot;हमारा उद्देश्य ग्रामीण और स्थानीय क्षेत्रों में प्रत्येक नागरिक तक सरकारी योजनाओं और डिजिटल सेवाओं को पारदर्शी और सुगम तरीके से पहुँचाना है।&quot;
                </p>
                <p className={styles.founderText}>
                  Mohd Irfak Ahmad established Unique Computer Centre in 2018 with a vision to bridge the digital divide in Harchanda, Jarwal. As a certified CSC operator with over 8 years of experience in computer services and digital documentation, he has assisted thousands of local residents and farmers in successfully securing government subsidies, ID cards, and academic scholarships.
                </p>
                <div className={styles.founderStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statVal}>8+</span>
                    <span className={styles.statLbl}>Years Exp</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statVal}>15K+</span>
                    <span className={styles.statLbl}>Happy Users</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statVal}>20+</span>
                    <span className={styles.statLbl}>Services</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className={styles.section} id="why-choose-us">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Our Trust Factor</span>
              <h2 className={styles.sectionTitle}>Why Choose Unique Computer Centre</h2>
              <p className={styles.sectionSubtitle}>
                We prioritize speed, security, and customer convenience in all digital workflows.
              </p>
            </div>

            <div className={styles.whyGrid}>
              <div className={styles.whyItem}>
                <div className={styles.whyIcon}>🤝</div>
                <div className={styles.whyContent}>
                  <h3 className={styles.whyTitle}>Reliable Customer Support</h3>
                  <p className={styles.whyDesc}>Direct personal guidance by Irfak Ahmad ensures no mistakes in sensitive document forms.</p>
                </div>
              </div>

              <div className={styles.whyItem}>
                <div className={styles.whyIcon}>🔒</div>
                <div className={styles.whyContent}>
                  <h3 className={styles.whyTitle}>Document Security</h3>
                  <p className={styles.whyDesc}>We protect Aadhaar and PAN documents using private database systems and automatic file deletion policies.</p>
                </div>
              </div>

              <div className={styles.whyItem}>
                <div className={styles.whyIcon}>⚡</div>
                <div className={styles.whyContent}>
                  <h3 className={styles.whyTitle}>Instant Order Tracking</h3>
                  <p className={styles.whyDesc}>Get live printing, packing, and courier dispatch updates on our website using your order ID.</p>
                </div>
              </div>

              <div className={styles.whyItem}>
                <div className={styles.whyIcon}>📍</div>
                <div className={styles.whyContent}>
                  <h3 className={styles.whyTitle}>Rooted Locally</h3>
                  <p className={styles.whyDesc}>Proudly serving the community of Harchanda, Jarwal, and Bahraich district with localized expert support.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className={`${styles.section} ${styles.bgMuted}`} id="how-it-works">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Step-by-Step</span>
              <h2 className={styles.sectionTitle}>How To Order PVC Cards</h2>
              <p className={styles.sectionSubtitle}>
                Get your premium plastic card printed and delivered in 4 simple steps.
              </p>
            </div>

            <div className={styles.howGrid}>
              <div className={styles.howCard}>
                <span className={styles.stepNumber}>1</span>
                <h3 className={styles.howTitle}>Select Card Type</h3>
                <p className={styles.howDesc}>Choose Aadhaar, PAN, Voter, DL, or RC from our PVC catalog.</p>
              </div>

              <div className={styles.howCard}>
                <span className={styles.stepNumber}>2</span>
                <h3 className={styles.howTitle}>Upload Document</h3>
                <p className={styles.howDesc}>Upload the secure PDF version of the card from the government portal.</p>
              </div>

              <div className={styles.howCard}>
                <span className={styles.stepNumber}>3</span>
                <h3 className={styles.howTitle}>Make Payment</h3>
                <p className={styles.howDesc}>Pay securely via UPI, card, or net banking using Razorpay.</p>
              </div>

              <div className={styles.howCard}>
                <span className={styles.stepNumber}>4</span>
                <h3 className={styles.howTitle}>Doorstep Delivery</h3>
                <p className={styles.howDesc}>Receive your high-fidelity smart card via post in 3-7 days.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className={styles.section} id="reviews">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Client Feedback</span>
              <h2 className={styles.sectionTitle}>What Our Customers Say</h2>
              <p className={styles.sectionSubtitle}>
                Genuine reviews from citizens who have visited our center or ordered smart cards online.
              </p>
            </div>

            <div className={styles.reviewsGrid}>
              {selectedReviews.map((review) => (
                <div key={review.id} className={styles.reviewCard}>
                  <div className={styles.rating}>
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>
                  <p className={styles.reviewContent}>&quot;{review.content}&quot;</p>
                  <div className={styles.reviewer}>
                    <span className={styles.reviewerName}>{review.author}</span>
                    <span className={styles.reviewerLoc}>{review.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive FAQ Section */}
        <section className={`${styles.section} ${styles.bgMuted}`} id="faqs">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Clarifications</span>
              <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
              <p className={styles.sectionSubtitle}>
                Find answers to common queries regarding smart prints, payments, and center timings.
              </p>
            </div>

            <div className={styles.faqContainer}>
              {homepageFaqs.map((faq) => (
                <details key={faq.id} className={styles.faqItem}>
                  <summary className={styles.faqSummary}>
                    <span>{faq.question}</span>
                    <span className={styles.faqIcon}>+</span>
                  </summary>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Conversion Block */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Get Your Smart PVC Card?</h2>
            <p className={styles.ctaDesc}>
              Do not carry bulky paper copies. Order your sleek, durable, waterproof plastic Aadhaar, PAN, or DL card today at just ₹149!
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/order" className={styles.ctaBtnPrimary}>
                Order Online Now
              </Link>
              <a
                href={SITE_CONFIG.getWhatsAppProductLink("Aadhaar/PAN PVC Card")}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaBtnSecondary}
              >
                Order via WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Contact and Maps Location Section */}
        <section className={styles.section} id="contact-location">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Find Our Office</span>
              <h2 className={styles.sectionTitle}>Visit Our Center</h2>
              <p className={styles.sectionSubtitle}>
                Drop by our physical office in Bahraich for direct administrative and application support.
              </p>
            </div>

            <div className={styles.contactGrid}>
              <div className={styles.contactInfoCard}>
                <h3 style={{ fontWeight: 800, fontSize: "1.4rem", color: "var(--text-main)" }}>Contact Details</h3>
                <ul className={styles.contactList}>
                  <li className={styles.contactCardItem}>
                    <div className={styles.cardIcon}>📍</div>
                    <div className={styles.cardDetails}>
                      <h4>Address</h4>
                      <p>Harchanda, Jarwal, Bahraich, Uttar Pradesh, 271904</p>
                    </div>
                  </li>
                  <li className={styles.contactCardItem}>
                    <div className={styles.cardIcon}>📞</div>
                    <div className={styles.cardDetails}>
                      <h4>Mobile Number</h4>
                      <a href="tel:+917084666326">+91 70846 66326</a>
                    </div>
                  </li>
                  <li className={styles.contactCardItem}>
                    <div className={styles.cardIcon}>✉️</div>
                    <div className={styles.cardDetails}>
                      <h4>Email Address</h4>
                      <a href="mailto:support@uniquecscpoint.in">support@uniquecscpoint.in</a>
                    </div>
                  </li>
                  <li className={styles.contactCardItem}>
                    <div className={styles.cardIcon}>🕒</div>
                    <div className={styles.cardDetails}>
                      <h4>Opening Hours</h4>
                      <p>Monday - Saturday: 08:00 AM - 07:00 PM</p>
                      <p style={{ color: "var(--danger)", fontWeight: 600 }}>Sunday: Closed</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className={styles.mapWrapper}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3550.052677134371!2d81.541285!3d27.155453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDA5JzE5LjYiTiA4McKwMzInMjguNiJF!5e0!3m2!1sen!2sin!4v1693000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Unique Computer Centre Location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
