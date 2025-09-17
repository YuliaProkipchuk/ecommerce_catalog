import { Layout } from '@/app/components/ui/Layout/Layout';
import classes from './Catalog.module.scss';
const Page = () => {
  return (
    <>
      <section className="section">
        <h1 className={`main-heading`}>Mobile phones</h1>
        <span className={classes.info}>95 models</span>
      </section>
      <section className="section">
         <div className={classes.dropdown}>dropdown</div> {/* future dropdown */}
        <Layout />
      </section>
    </>
  );
};

export default Page;
