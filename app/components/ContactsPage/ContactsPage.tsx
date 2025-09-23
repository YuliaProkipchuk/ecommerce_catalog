import Image from 'next/image';
import classes from './ContactsPage.module.scss'
import Link from 'next/link';

const peoples = [
    {
        name: 'Serhii Nesmiianov',
        photo: 'img/contacts/Serhii_Nesmiianov.webp',
        git: 'https://github.com/BlackUserSide',
        linedin: 'https://www.linkedin.com/in/serhii-nesmiianov-707539155',
        title: 'Tech lead'
    },
    {
        name: 'Yuliia Prokipchuk',
        photo: 'img/contacts/Yuliia_Prokipchuk.webp',
        git: 'https://github.com/YuliaProkipchuk',
        linedin: 'https://www.linkedin.com/in/yulia-prokipchuk',
        title: 'Project Manager'
    },
    {
        name: 'Ruslan Koval',
        photo: 'img/contacts/Ruslan_Koval.webp',
        git: 'https://github.com/DidZhara',
        linedin: 'https://www.linkedin.com/in/ruslan-koval-223ba9373/',
        title: 'Frontend Defeloper'
    },
    {
        name: 'Oleksand Mykyteichuk',
        photo: 'img/contacts/Oleksand_Mykyteichuk.webp',
        git: 'https://github.com/Oleksandr-Mykyteichuk',
        linedin: 'https://www.linkedin.com/in/oleksandr-m-73a17537a/?trk=opento_sprofile_goalscard',
        title: 'Frontend Defeloper'
    }
];

export function ContactsPage() {
    return (
        <>
            <div className={classes.page}>
                {peoples.map(people => (

                    <div key={people.name} className={classes.people_blok}>

                        <Image
                            src={`/${people.photo}`}
                            alt={people.name}
                            className={classes.image}
                            width={100}
                            height={100}
                        />
                        <h2 className={classes.name}>{people.name}</h2>
                        <p className={classes.title}>{people.title}</p>
                        <div className={classes.link}>
                            <Link href={people.git}>
                                <Image
                                    src='/img/contacts/icon/GitHub_logo_2013.webp'
                                    alt='gitHub logo'
                                    className={classes.icon}
                                    width={100}
                                    height={100}
                                />
                            </Link>
                            <Link href={people.linedin}>
                                <Image
                                    src='/img/contacts/icon/Linkedin-Logo.png'
                                    alt='Linkedin logo'
                                    className={classes.icon}
                                    width={100}
                                    height={100}
                                />
                            </Link>
                        </div>
                    </div>

                ))}
            </div>
        </>
    );
}