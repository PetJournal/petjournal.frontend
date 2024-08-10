'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export function BannerHome() {
  return (
    <Swiper
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      modules={[Autoplay]}
      slidesPerView={1}
      className="w-full h-52"
    >
      <SwiperSlide className="rounded-lg">
        <Image src="/images/banner-1.png" alt="" width={400} height={280} />
      </SwiperSlide>
      <SwiperSlide className="rounded-lg">
        <Image src="/images/banner-2.png" alt="" width={400} height={280} />
      </SwiperSlide>
      <SwiperSlide className="rounded-lg">
        <Image src="/images/banner-3.png" alt="" width={400} height={280} />
      </SwiperSlide>
    </Swiper>
  );
}
