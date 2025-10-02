import Image from 'next/image';
import classes from './ContactsPage.module.scss';
import Link from 'next/link';
import { GitHub } from '../../ui/Icons/GitHub';
import { Linkedin } from '../../ui/Icons/Linkedin';

const peoples = [
  {
    name: 'Serhii Nesmiianov',
    photo: 'img/contacts/Serhii_Nesmiianov.png',
    git: 'https://github.com/BlackUserSide',
    linedin: 'https://www.linkedin.com/in/serhii-nesmiianov-707539155',
    title: 'Tech lead',
  },
  {
    name: 'Yuliia Prokipchuk',
    photo: 'img/contacts/Yuliia_Prokipchuk.png',
    git: 'https://github.com/YuliaProkipchuk',
    linedin: 'https://www.linkedin.com/in/yulia-prokipchuk',
    title: 'Project Manager',
  },
  {
    name: 'Ruslan Koval',
    photo: 'img/contacts/Ruslan_Koval.png',
    git: 'https://github.com/DidZhara',
    linedin: 'https://www.linkedin.com/in/ruslan-koval-223ba9373/',
    title: 'Frontend Defeloper',
  },
  {
    name: 'Oleksandr Mykyteichuk',
    photo: 'img/contacts/Oleksandr_Mykyteichuk.jpg',
    git: 'https://github.com/Oleksandr-Mykyteichuk',
    linedin: 'https://www.linkedin.com/in/oleksandr-m-73a17537a/?trk=opento_sprofile_goalscard',
    title: 'Frontend Defeloper',
  },
];

export function ContactsPage() {
  return (
    <>
      <section className="section">
        <h1 className="main-heading">Contact us</h1>
      </section>
      <section className="section">
        <div className={classes.page}>
          {peoples.map((people) => (
            <div key={people.name} className={classes.people_blok}>
              <Image
                src={`/${people.photo}`}
                alt={people.name}
                className={classes.image}
                width={100}
                height={100}
              />

              <div className={classes.text}>
                <h2 className={classes.name}>{people.name}</h2>
                <p className={classes.title}>{people.title}</p>
              </div>

              <div className={classes.link}>
                <Link href={people.git} className={classes.icon}>
                  <GitHub />
                </Link>
                <Link href={people.linedin} className={classes.icon}>
                  <Linkedin />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
