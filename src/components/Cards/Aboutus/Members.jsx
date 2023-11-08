import Member from "../components/Member";

const members = [
    { name: "Member 1", image: "/images/300x300px.jpg" },
    { name: "Member 2", image: "/images/300x300px.jpg" },
    // ...
];

export default function AboutUs() {
    return <Member members={members} />;
}
