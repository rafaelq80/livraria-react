import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Slide01 from "./Slide01";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Importando seu CSS
import "./Carrossel.css";
import Slide02 from "./Slide02";
import Slide03 from "./Slide03";

function Carrossel() {
    return (
        <>
            {/* 
                Adicionando o Componente Swiper
                e configurando algumas props            
            */}
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {/* 
                    Adicionando Slides através
                    do Componente SwiperSlide
                */}
                <SwiperSlide>
                    <Slide01 />
                </SwiperSlide>

                <SwiperSlide>
                    <Slide02 />
                </SwiperSlide>
                <SwiperSlide>
                    <Slide03 />
                </SwiperSlide>
            </Swiper>
        </>
    )
}

export default Carrossel