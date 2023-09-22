"use client";

import { CarProps } from "@/types";
import { CustomButton } from ".";
import Image from "next/image";
import { calculateCarRent } from "@/utils";

interface CarCardProps {
    car: CarProps
}

const CarCard = ({ car }: CarCardProps) => {
    const { city_mpg, year, make, model, transmission, drive } = car;

    const carRent = calculateCarRent(city_mpg, year);

    return (
        <div className="car-card group cursor-pointer">
            <div className="car-card__content">
                <h2 className="car-card__content-title">
                    {make} {model}
                </h2>
            </div>

            <p className="flex mt-6 text-[32px] font-extrabold">
                £{carRent}
                <span className="self-end text-[14px] font-medium ml-2">
                    per day
                </span>
            </p>

            <div className="relative w-full h-40 my-3 object-contain">
                <Image
                    src="/hero.png"
                    alt="car_image"
                    fill
                    priority
                    className="object-contain"
                />
            </div>
        </div>
    )
}

export default CarCard