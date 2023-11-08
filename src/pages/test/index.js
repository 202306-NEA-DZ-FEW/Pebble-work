import { useEffect, useRef, useState } from "react";
import styles from "./Member.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Member = () => {
    const members = [
        { name: "Member 1", image: "/images/300x300px.jpg" },
        { name: "Member 2", image: "/images/300x300px.jpg" },
        { name: "Member 3", image: "/images/300x300px.jpg" },
        { name: "Member 4", image: "/images/300x300px.jpg" },
        { name: "Member 5", image: "/images/300x300px.jpg" },
        // ...
    ];
    const [current, setCurrent] = useState(0);
    const memberRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setCurrent(+entry.target.getAttribute("data-index"));
                    }
                });
            },
            { threshold: 0.7 }
        );

        memberRefs.current.forEach((ref) => observer.observe(ref));

        return () => {
            memberRefs.current.forEach((ref) => observer.unobserve(ref));
        };
    }, []);

    return (
        <div className={styles.container}>
            {members.map((member, index) => (
                <div
                    key={index}
                    data-index={index}
                    ref={(el) => (memberRefs.current[index] = el)}
                    className={`${styles.member} ${
                        index === current ? styles.active : ""
                    }`}
                >
                    <img src={member.image} alt={member.name} />
                    <h2>{member.name}</h2>
                </div>
            ))}
        </div>
    );
};

export default Member;
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "about"])),
            // Will be passed to the page component as props
        },
    };
}
