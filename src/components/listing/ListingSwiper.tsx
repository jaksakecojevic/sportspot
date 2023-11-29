"use client"
import { ImageType, Listing } from "@/types"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

import "swiper/css/pagination"
import { Pagination } from "swiper/modules"
import { PaginationOptions } from "swiper/types"
import "./CustomSwiper.css"

export default function ListingSwiper({ images }: { images: ImageType[] }) {
    const paginationOptions: PaginationOptions = {
        clickable: true,
        renderBullet: function (index, className) {
            return `<span class="${className}" data-variant=${images[index]}><img className="object-cover h-full" src=${images[index].url} /></span>`
        },
    }

    const imageFit: "fit" | "full" = "fit"

    return (
        <Swiper slidesPerView={1} pagination={paginationOptions} modules={[Pagination]} loop={true} className="product-swiper">
            {images.map((image, index) => {
                return (
                    <SwiperSlide key={index}>
                        <img src={image.url} alt="" className={`${imageFit == "fit" ? "aspect-square" : ""} object-contain bg-gray`} />
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}
