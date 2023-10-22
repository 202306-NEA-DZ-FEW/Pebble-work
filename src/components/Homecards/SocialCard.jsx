import React from "react";

const SocialCardData = [
    {
        name: "Quby",
        occupation: "occupation",
        text: "This is the first testimonial. It can be about anything.",
        imageSrc:
            "https://s3-alpha-sig.figma.com/img/c5db/07f5/e831b1a64ef23d6ce6baa81fbcf33e56?Expires=1698624000&Signature=ME0PjPYRWZJDhMo4ykxlAwRO~AxZpiHQvbSgONHGvYuj4zg7HnxgNi9oXEVcCWHZpmYteXjJ2jrPNdleu~MrphbU3MWGNCf2U~DR1rMOE7WIoFMBROkUj4P6CX9ffcSZoSTvdOUL2bI17RAVEknuPIIHeJeuC4YNptBmhmPVqIFR9A2UjHB~btkjTqPkxWuYZCjXo0Z1hzlCfbuCRN7REtvsS2k3N52u0b6Ku4ODbAuNvjaq7Ra1q7IiMPcnigMlxoZ3NVgVZ2hyfJKRyTVibPptohLY-68dLWgaufNU4U6Hx8zr9e~hKFNBxhfE2QG4hrJ5w6SC0KiXuX3uIbSIxg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    },
    {
        name: "Taki",
        occupation: "occupation",
        text: "This is the second testimonial. It can be about anything else.",
        imageSrc:
            "https://s3-alpha-sig.figma.com/img/c5db/07f5/e831b1a64ef23d6ce6baa81fbcf33e56?Expires=1698624000&Signature=ME0PjPYRWZJDhMo4ykxlAwRO~AxZpiHQvbSgONHGvYuj4zg7HnxgNi9oXEVcCWHZpmYteXjJ2jrPNdleu~MrphbU3MWGNCf2U~DR1rMOE7WIoFMBROkUj4P6CX9ffcSZoSTvdOUL2bI17RAVEknuPIIHeJeuC4YNptBmhmPVqIFR9A2UjHB~btkjTqPkxWuYZCjXo0Z1hzlCfbuCRN7REtvsS2k3N52u0b6Ku4ODbAuNvjaq7Ra1q7IiMPcnigMlxoZ3NVgVZ2hyfJKRyTVibPptohLY-68dLWgaufNU4U6Hx8zr9e~hKFNBxhfE2QG4hrJ5w6SC0KiXuX3uIbSIxg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    },
    {
        name: "Ali",
        occupation: "occupation",
        text: "This is the third testimonial. Yet another testimonial here.",
        imageSrc:
            "https://s3-alpha-sig.figma.com/img/c5db/07f5/e831b1a64ef23d6ce6baa81fbcf33e56?Expires=1698624000&Signature=ME0PjPYRWZJDhMo4ykxlAwRO~AxZpiHQvbSgONHGvYuj4zg7HnxgNi9oXEVcCWHZpmYteXjJ2jrPNdleu~MrphbU3MWGNCf2U~DR1rMOE7WIoFMBROkUj4P6CX9ffcSZoSTvdOUL2bI17RAVEknuPIIHeJeuC4YNptBmhmPVqIFR9A2UjHB~btkjTqPkxWuYZCjXo0Z1hzlCfbuCRN7REtvsS2k3N52u0b6Ku4ODbAuNvjaq7Ra1q7IiMPcnigMlxoZ3NVgVZ2hyfJKRyTVibPptohLY-68dLWgaufNU4U6Hx8zr9e~hKFNBxhfE2QG4hrJ5w6SC0KiXuX3uIbSIxg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    },
];

const SocialCardSection = () => {
    return (
        <div className='shadow-md w-full max-w-[1440px] px-5 md:px-[123px] lg:px-[127px] bg-white flex flex-wrap justify-center items-center gap-10'>
            <div className='w-full text-center text-zinc-900 text-4xl font-medium font-rubik leading-[44px] tracking-tight'>
                Hear it from volunteers
            </div>
            {SocialCardData.map((SocialCard, index) => (
                <div
                    key={index}
                    className='w-full md:w-1/3 lg:w-1/4 flex flex-col items-center gap-5'
                >
                    <img
                        className='w-16 h-16 rounded-full'
                        src={SocialCard.imageSrc}
                        alt={`Image ${index}`}
                    />
                    <div className='w-full text-center'>
                        <div className='text-zinc-900 text-xl md:text-2xl lg:text-3xl font-medium font-rubik leading-[30px] tracking-tight'>
                            {SocialCard.name}, {SocialCard.occupation}
                        </div>
                        <div className='text-zinc-500 text-base md:text-xl lg:text-2xl font-normal font-rubik leading-[30px] tracking-tight'>
                            {SocialCard.text}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SocialCardSection;
