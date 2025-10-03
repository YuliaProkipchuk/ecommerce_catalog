
import React from "react";
import Link from "next/link";
import classes from "./TermsPage.module.scss";

export default function TermsPage() {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>User Agreement</h1>
      <p className={classes.description}>
        This Agreement (hereinafter referred to as the “Agreement”) defines the
        terms of use of the <strong>Nice Gadgets</strong> website (hereinafter
        referred to as the “Website”), as well as the procedure for interaction
        between the User and the Website Administration. By using the Website,
        you confirm your full and unconditional agreement with the terms of this
        Agreement.
      </p>

      <section className={classes.section}>
        <h2>1. General Provisions</h2>
        <p>
          1.1. This Agreement is a public offer in accordance with the current
          legislation of Ukraine.  
          1.2. Use of the Website is possible only with full acceptance of the
          Agreement.  
          1.3. If you do not agree with any provision of the Agreement, you must
          immediately stop using the Website.
        </p>
      </section>

      <section className={classes.section}>
        <h2>2. Registration and Account</h2>
        <p>
          2.1. To place an order, the User may complete the registration
          procedure.  
          2.2. The User bears full responsibility for the accuracy of the data
          provided.  
          2.3. It is forbidden to transfer account data to third parties.
        </p>
      </section>

      <section className={classes.section}>
        <h2>3. Personal Data</h2>
        <p>
          3.1. The Website Administration processes personal data in accordance
          with the Law of Ukraine “On Personal Data Protection.”  
          3.2. The purpose of data processing is to ensure the operation of the
          Website, process orders, and inform Users about products and services.  
          3.3. The User agrees to the use of their personal data within the
          scope necessary for proper execution of the Agreement.
        </p>
      </section>

      <section className={classes.section}>
        <h2>4. Ordering and Payment</h2>
        <p>
          4.1. An order placed through the Website constitutes the User’s offer.  
          4.2. The sales contract is considered concluded after the order is
          confirmed by the Administration.  
          4.3. The price of goods is determined at the time of placing the order
          and may be changed before it is confirmed.  
          4.4. Payment is made in the manner specified on the Website.
        </p>
      </section>

      <section className={classes.section}>
        <h2>5. Delivery and Returns</h2>
        <p>
          5.1. The terms of delivery, returns, and warranty service of goods are
          regulated by separate provisions published on the Website.  
          5.2. The User has the right to return goods within the terms and under
          the conditions provided by the current legislation of Ukraine.
        </p>
      </section>

      <section className={classes.section}>
        <h2>6. Limitation of Liability</h2>
        <p>
          6.1. The Website Administration is not responsible for interruptions
          in the operation of the Website caused by technical malfunctions or
          actions of third parties.  
          6.2. Responsibility for the accuracy of the information provided lies
          solely with the User.  
          6.3. The Administration reserves the right to change the assortment,
          prices, and other characteristics of the goods without prior notice.
        </p>
      </section>

      <section className={classes.section}>
        <h2>7. Final Provisions</h2>
        <p>
          7.1. This Agreement comes into force from the moment you start using
          the Website.  
          7.2. The Administration has the right to unilaterally change the terms
          of the Agreement. The new version is published on this page.  
          7.3. Further use of the Website after changes are made constitutes the
          User’s consent to the updated Agreement.
        </p>
      </section>

      <section className={classes.section}>
        <h2>8. Contact Information</h2>
        <p>
          For additional information or to resolve disputes, you can contact
          customer support:{" "}
          <a href="mailto:support@nicegadgets.com">support@nicegadgets.com</a>.
        </p>
      </section>

      <Link href="/" className={classes.homeLink}>
        Return to Home
      </Link>
    </div>
  );
}
