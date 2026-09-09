import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import HeroSlider from "@/components/Home/HeroSlider";
import ServiceSearch from "@/components/Home/ServiceSearch";
import { services, reviews, faqs, blogs, digitalProducts, educationCourses } from "@/lib/mockData";
import { prisma } from "@/lib/prisma";
import { SITE_CONFIG } from "@/lib/config";
import PVCProductCard from "@/components/PVCProductCard/PVCProductCard";
import styles from "./page.module.css";

export default async function Home() {
  // Query database for active products safely
  let activeProducts: Array<{ id: string; slug: string; name: string; price: number; description: string; shortDescription: string; image: string; featured: boolean; active: boolean }> = [];
  try {
    activeProducts = await prisma.product.findMany({ where: { active: true } });
  } catch {
    activeProducts = [];
  }

  // Extract items for highlight
  const popularServices = services.slice(0, 8);
  const featuredPvc = activeProducts.filter(p => p.featured);
  const showcasePvc = featuredPvc.length > 0 ? featuredPvc : activeProducts.slice(0, 3);
  const minPrice = activeProducts.length > 0 ? Math.min(...activeProducts.map(p => p.price)) : 149;

  const latestBlogs = blogs.slice(0, 3);
  const selectedReviews = reviews.slice(0, 3);
  const homepageFaqs = faqs.slice(0, 5);

  return (
    <div className={styles.main}>
      <Header />

      <main>
        {/* 1. Hero Slider Banner */}
        <HeroSlider />

        {/* Autocomplete Service Search */}
        <ServiceSearch />

        {/* 2. Explore Our Services Section */}
        <section className={styles.section} id="categories">
          <div className={styles.container}>
            <div className={styles.exploreHeader}>
              <h2 className={styles.exploreTitle}>
                Explore <span style={{ color: "#0056b3" }}>Our Services</span>
              </h2>
              <div className={styles.titleUnderline}></div>
            </div>

            <div className={styles.exploreGrid}>
              {/* Card 1: CSC Services */}
              <div className={styles.exploreCard}>
                <div className={`${styles.cardBanner} ${styles.cardBannerCsc}`}>
                  <Image
                    src="/images/csc-banner.jpg"
                    alt="CSC Services"
                    width={400}
                    height={200}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>CSC Services</h3>
                  <p className={styles.cardDescription}>
                    Get all Government, Banking, Insurance, Certificate and other CSC digital services at one place.
                  </p>
                  <ul className={styles.featuresList}>
                    <li className={styles.featureItem}>
                      <span className={styles.featureIconBlue}>✔</span> 500+ Services
                    </li>
                    <li className={styles.featureItem}>
                      <span className={styles.featureIconBlue}>👥</span> For All Citizens
                    </li>
                    <li className={styles.featureItem}>
                      <span className={styles.featureIconBlue}>🕒</span> Fast &amp; Easy Process
                    </li>
                  </ul>
                  <div className={styles.cardActions}>
                    <Link href="/services/csc" className={styles.btnViewDetails}>
                      VIEW DETAILS
                    </Link>
                    <a
                      href={SITE_CONFIG.getWhatsAppServiceLink("CSC Services")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btnBookWhatsApp}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M12.004 2C6.51 2 2.014 6.5 2.014 12c0 2.18.7 4.21 1.9 5.86l-1.25 4.57 4.69-1.23C8.924 21.84 10.424 22 12.004 22c5.49 0 9.99-4.5 9.99-10S17.494 2 12.004 2zm5.72 13.9c-.24.68-1.2 1.25-1.63 1.3-.43.05-.98.24-2.93-.52-2.5-1-4.11-3.56-4.23-3.73-.13-.17-1-1.34-1-2.55 0-1.2.62-1.8 1.1-1.85.12-.02.26-.03.38-.03.12 0 .28-.05.44.33.17.4.58 1.43.64 1.54.06.12.1.25.02.4-.08.16-.16.27-.3.44-.14.16-.3.3-.43.43-.13.13-.27.27-.12.53.15.26.68 1.12 1.46 1.82.99.9 1.83 1.18 2.09 1.31.26.13.41.1.56-.07.15-.17.65-.76.82-1.02.17-.26.35-.22.58-.13.24.08 1.5.7 1.76.83.26.13.43.2.49.3.06.13.06.74-.18 1.42z"/>
                      </svg>
                      BOOK VIA WHATSAPP
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 2: PVC Card Services */}
              <div className={styles.exploreCard}>
                <div className={`${styles.cardBanner} ${styles.cardBannerPvc}`}>
                  <Image
                    src="/images/pvc-banner.jpg"
                    alt="PVC Card Services"
                    width={400}
                    height={200}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>PVC Card Services</h3>
                  <p className={styles.cardDescription}>
                    Get premium quality PVC cards like Aadhaar, PAN, Ayushman, ABHA, Voter ID and many more.
                  </p>
                  <ul className={styles.featuresList}>
                    <li className={styles.featureItem}>
                      <span className={styles.featureIconPink}>✔</span> High Quality PVC Cards
                    </li>
                    <li className={styles.featureItem}>
                      <span className={styles.featureIconPink}>✔</span> Home Delivery Option
                    </li>
                    <li className={styles.featureItem}>
                      <span className={styles.featureIconPink}>✔</span> Secure &amp; Reliable
                    </li>
                  </ul>
                  <div className={styles.cardActions}>
                    <Link href="/pvc-cards" className={styles.btnViewDetails}>
                      VIEW DETAILS
                    </Link>
                    <a
                      href={SITE_CONFIG.getWhatsAppProductLink("PVC Smart Cards")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btnBookWhatsApp}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M12.004 2C6.51 2 2.014 6.5 2.014 12c0 2.18.7 4.21 1.9 5.86l-1.25 4.57 4.69-1.23C8.924 21.84 10.424 22 12.004 22c5.49 0 9.99-4.5 9.99-10S17.494 2 12.004 2zm5.72 13.9c-.24.68-1.2 1.25-1.63 1.3-.43.05-.98.24-2.93-.52-2.5-1-4.11-3.56-4.23-3.73-.13-.17-1-1.34-1-2.55 0-1.2.62-1.8 1.1-1.85.12-.02.26-.03.38-.03.12 0 .28-.05.44.33.17.4.58 1.43.64 1.54.06.12.1.25.02.4-.08.16-.16.27-.3.44-.14.16-.3.3-.43.43-.13.13-.27.27-.12.53.15.26.68 1.12 1.46 1.82.99.9 1.83 1.18 2.09 1.31.26.13.41.1.56-.07.15-.17.65-.76.82-1.02.17-.26.35-.22.58-.13.24.08 1.5.7 1.76.83.26.13.43.2.49.3.06.13.06.74-.18 1.42z"/>
                      </svg>
                      BOOK VIA WHATSAPP
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 3: Digital Products */}
              <div className={styles.exploreCard}>
                <div className={`${styles.cardBanner} ${styles.cardBannerDigital}`}>
                  <Image
                    src="/images/digital-banner.jpg"
                    alt="Digital Products"
                    width={400}
                    height={200}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>Digital Products</h3>
                  <p className={styles.cardDescription}>
                    Get useful digital products like templates, designs, software, documents, e-books and many more.
                  </p>
                  <ul className={styles.featuresList}>
                    <li className={styles.featureItem}>
                      <span className={styles.featureIconGold}>✔</span> Instant Download
                    </li>
                    <li className={styles.featureItem}>
                      <span className={styles.featureIconGold}>✔</span> 100% Original Products
                    </li>
                    <li className={styles.featureItem}>
                      <span className={styles.featureIconGold}>✔</span> Affordable Prices
                    </li>
                  </ul>
                  <div className={styles.cardActions}>
                    <Link href="/services/digital" className={styles.btnViewDetails}>
                      VIEW DETAILS
                    </Link>
                    <a
                      href={SITE_CONFIG.getWhatsAppServiceLink("Digital Products")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btnBookWhatsApp}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M12.004 2C6.51 2 2.014 6.5 2.014 12c0 2.18.7 4.21 1.9 5.86l-1.25 4.57 4.69-1.23C8.924 21.84 10.424 22 12.004 22c5.49 0 9.99-4.5 9.99-10S17.494 2 12.004 2zm5.72 13.9c-.24.68-1.2 1.25-1.63 1.3-.43.05-.98.24-2.93-.52-2.5-1-4.11-3.56-4.23-3.73-.13-.17-1-1.34-1-2.55 0-1.2.62-1.8 1.1-1.85.12-.02.26-.03.38-.03.12 0 .28-.05.44.33.17.4.58 1.43.64 1.54.06.12.1.25.02.4-.08.16-.16.27-.3.44-.14.16-.3.3-.43.43-.13.13-.27.27-.12.53.15.26.68 1.12 1.46 1.82.99.9 1.83 1.18 2.09 1.31.26.13.41.1.56-.07.15-.17.65-.76.82-1.02.17-.26.35-.22.58-.13.24.08 1.5.7 1.76.83.26.13.43.2.49.3.06.13.06.74-.18 1.42z"/>
                      </svg>
                      BOOK VIA WHATSAPP
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 4: Education Services */}
              <div className={styles.exploreCard}>
                <div className={`${styles.cardBanner} ${styles.cardBannerEducation}`}>
                  <Image
                    src="/images/education-banner.svg"
                    alt="Education Services"
                    width={400}
                    height={200}
                    style={{ objectFit: "contain", width: "100%", height: "100%" }}
                  />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>Education Services</h3>
                  <p className={styles.cardDescription}>
                    Online courses, computer courses, exam forms, study material and digital learning services.
                  </p>
                  <ul className={styles.featuresList}>
                    <li className={styles.featureItem}>
                      <span className={styles.featureIconGreen}>✔</span> Government &amp; Private Courses
                    </li>
                    <li className={styles.featureItem}>
                      <span className={styles.featureIconGreen}>✔</span> Online &amp; Offline Learning
                    </li>
                    <li className={styles.featureItem}>
                      <span className={styles.featureIconGreen}>✔</span> Career Support
                    </li>
                  </ul>
                  <div className={styles.cardActions}>
                    <Link href="/services/education" className={styles.btnViewDetails}>
                      VIEW DETAILS
                    </Link>
                    <a
                      href={SITE_CONFIG.getWhatsAppServiceLink("Education Services")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btnBookWhatsApp}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M12.004 2C6.51 2 2.014 6.5 2.014 12c0 2.18.7 4.21 1.9 5.86l-1.25 4.57 4.69-1.23C8.924 21.84 10.424 22 12.004 22c5.49 0 9.99-4.5 9.99-10S17.494 2 12.004 2zm5.72 13.9c-.24.68-1.2 1.25-1.63 1.3-.43.05-.98.24-2.93-.52-2.5-1-4.11-3.56-4.23-3.73-.13-.17-1-1.34-1-2.55 0-1.2.62-1.8 1.1-1.85.12-.02.26-.03.38-.03.12 0 .28-.05.44.33.17.4.58 1.43.64 1.54.06.12.1.25.02.4-.08.16-.16.27-.3.44-.14.16-.3.3-.43.43-.13.13-.27.27-.12.53.15.26.68 1.12 1.46 1.82.99.9 1.83 1.18 2.09 1.31.26.13.41.1.56-.07.15-.17.65-.76.82-1.02.17-.26.35-.22.58-.13.24.08 1.5.7 1.76.83.26.13.43.2.49.3.06.13.06.74-.18 1.42z"/>
                      </svg>
                      BOOK VIA WHATSAPP
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Popular CSC Services Section */}
        <section className={`${styles.section} ${styles.bgMuted}`} id="popular-services">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Top Requests</span>
              <h2 className={styles.sectionTitle}>Popular CSC Services</h2>
              <p className={styles.sectionSubtitle}>
                Here are the most frequently requested digital services at our center in Harchanda, Jarwal.
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
                      href={SITE_CONFIG.getWhatsAppServiceLink(service.name)}
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
              <Link href="/services/csc" className={styles.btnSecondary} style={{ display: 'inline-block' }}>
                View All CSC Services
              </Link>
            </div>
          </div>
        </section>

        {/* 4. PVC Card Services Showcase */}
        <section className={styles.section} id="pvc-showcase">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Premium Smart Prints</span>
              <h2 className={styles.sectionTitle}>PVC Smart Card Printing</h2>
              <p className={styles.sectionSubtitle}>
                Durable, pocket-sized, waterproof prints of your essential documents. Starting at just <strong>₹{minPrice}</strong> with doorstep delivery.
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

        {/* 5. Digital Products Showcase */}
        <section className={`${styles.section} ${styles.bgMuted}`} id="digital-products">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Digital Solutions</span>
              <h2 className={styles.sectionTitle}>Digital Products &amp; Tools</h2>
              <p className={styles.sectionSubtitle}>
                Official state documentation processing, land records verification, and online form applications.
              </p>
            </div>

            <div className={styles.servicesGrid}>
              {digitalProducts.map((prod) => (
                <div key={prod.id} className={styles.serviceCard}>
                  <div className={styles.serviceHeader}>
                    <span className={styles.serviceIcon}>{prod.icon}</span>
                    <h3 className={styles.serviceName}>{prod.name}</h3>
                  </div>
                  <p className={styles.serviceDesc}>{prod.description}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.timeTag}>{prod.category}</span>
                    <a
                      href={SITE_CONFIG.getWhatsAppServiceLink(prod.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.enquireBtn}
                    >
                      Request Copy &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Education / Courses Showcase */}
        <section className={styles.section} id="education-courses">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Skill Development</span>
              <h2 className={styles.sectionTitle}>Education &amp; Computer Courses</h2>
              <p className={styles.sectionSubtitle}>
                Build practical digital literacy, typing speed, and accounting skills at our centre.
              </p>
            </div>

            <div className={styles.servicesGrid}>
              {educationCourses.map((course) => (
                <div key={course.id} className={styles.serviceCard}>
                  <div className={styles.serviceHeader}>
                    <span className={styles.serviceIcon}>{course.icon}</span>
                    <h3 className={styles.serviceName}>{course.name}</h3>
                  </div>
                  <p className={styles.serviceDesc}>{course.description}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.timeTag}>{course.duration}</span>
                    <a
                      href={SITE_CONFIG.getWhatsAppServiceLink(`${course.name} Enrollment`)}
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
          </div>
        </section>

        {/* 7. Why Choose Us Section */}
        <section className={`${styles.section} ${styles.bgMuted}`} id="why-choose-us">
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

        {/* 8. How It Works Section */}
        <section className={styles.section} id="how-it-works">
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
                <h3 className={styles.howTitle}>Customer &amp; Document Info</h3>
                <p className={styles.howDesc}>Fill name, mobile, address, and upload the official document PDF/Image.</p>
              </div>

              <div className={styles.howCard}>
                <span className={styles.stepNumber}>3</span>
                <h3 className={styles.howTitle}>Confirm Order</h3>
                <p className={styles.howDesc}>Review shipping details and submit order to receive instant tracking ID.</p>
              </div>

              <div className={styles.howCard}>
                <span className={styles.stepNumber}>4</span>
                <h3 className={styles.howTitle}>Doorstep Delivery</h3>
                <p className={styles.howDesc}>Receive your high-fidelity smart card via post in 3-7 days.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Centre / Founder & Local Identity */}
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

        {/* 10. Blog (Information & Resources Section) */}
        <section className={styles.section} id="blog">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Information &amp; Guides</span>
              <h2 className={styles.sectionTitle}>Latest Updates &amp; Articles</h2>
              <p className={styles.sectionSubtitle}>
                Read step-by-step guides on ordering PVC smart cards, PAN corrections, and PM-Kisan eKYC.
              </p>
            </div>

            <div className={styles.servicesGrid}>
              {latestBlogs.map((post) => (
                <div key={post.id} className={styles.serviceCard}>
                  <div className={styles.serviceHeader}>
                    <span className={styles.serviceIcon}>📰</span>
                    <h3 className={styles.serviceName}>{post.title}</h3>
                  </div>
                  <p className={styles.serviceDesc}>{post.summary}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.timeTag}>{post.publishedDate}</span>
                    <Link href={`/blog/${post.slug}`} className={styles.enquireBtn}>
                      Read More &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link href="/blog" className={styles.btnSecondary} style={{ display: 'inline-block' }}>
                View All Articles
              </Link>
            </div>
          </div>
        </section>

        {/* 11. Customer Reviews Section */}
        <section className={`${styles.section} ${styles.bgMuted}`} id="reviews">
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

        {/* 12. Interactive FAQ Section */}
        <section className={styles.section} id="faqs">
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

        {/* 13. Contact and Maps Location Section */}
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
                      <p>{SITE_CONFIG.businessAddress}</p>
                    </div>
                  </li>
                  <li className={styles.contactCardItem}>
                    <div className={styles.cardIcon}>📞</div>
                    <div className={styles.cardDetails}>
                      <h4>Mobile Number</h4>
                      <a href={`tel:${SITE_CONFIG.phoneNumber.replace(/\s+/g, "")}`}>{SITE_CONFIG.phoneNumber}</a>
                    </div>
                  </li>
                  <li className={styles.contactCardItem}>
                    <div className={styles.cardIcon}>✉️</div>
                    <div className={styles.cardDetails}>
                      <h4>Email Address</h4>
                      <a href={`mailto:${SITE_CONFIG.emailAddress}`}>{SITE_CONFIG.emailAddress}</a>
                    </div>
                  </li>
                  <li className={styles.contactCardItem}>
                    <div className={styles.cardIcon}>🕒</div>
                    <div className={styles.cardDetails}>
                      <h4>Opening Hours</h4>
                      <p>{SITE_CONFIG.openingHours}</p>
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

