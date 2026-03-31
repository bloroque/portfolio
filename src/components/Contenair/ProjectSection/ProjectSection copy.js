import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const ProjectSection = (props) => {
    const classeCSS = props.className;
    const idSection = props.id;


    return (
        <section id={idSection} className={classeCSS}>
            <div className="mx-auto max-w-screen-lg md:px-4 sm:px-3 md:pb-8 pt-4 md:pt-5 w-full ">

                <div className="w-full flex flex-col h-full justify-center px-2">
          
                    <div className="py-4 text-white">
                        <p className="pb-4 text-justify text-lg">
                            I have had the opportunity to work on several projects that have allowed me to develop my skills and showcase my creativity.
                            Each project is an opportunity to create something beautiful, functional and unique.
                            In this portfolio I am happy to showcase some of my best projects.
                        </p>
                    </div>

                    <div className="flex flex-col justify-center sm:grid sm:grid-cols-4  w-full  sm:grid-rows-1  ">

                        <div className="col-span-1 flex flex-col justify-center sm:h-full">

                            <div className="flex flex-col justify-center p-4 h-80 bg-[#3767D2]">
                                <h2 className="text-white font-bold text-xl flex flex-col tracking-wide flex flex-col p-4 pb-2">
                                    <span> ― Projects </span>
                                    <span className="ps-4">and challenges</span>
                                </h2>
                                <div className="flex gap-2 p-4 pt-2 ps-8">
                                    <button className="border-white border p-2 rounded-full">
                                        <FaAngleLeft className="text-white"/>
                                    </button>
                                    <button className="border-white border p-2 rounded-full">
                                        <FaAngleRight className="text-white"/>
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div className="col-span-3 sm:h-full projet-carousel ">

                            <Swiper className="h-full grid-cols-3"
                                spaceBetween={0}
                                slidesPerView={3}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                                breakpoints={{
                                    640: { slidesPerView: 2 },
                                    768: { slidesPerView: 3 },
                                }}>

                                <SwiperSlide className=" m-0 border-white h-full flex flex-col justify-center" >
                                    <div className="border border-4 flex flex-col">
                                        <div className="h-[40px]"></div>
                                        <div className="h-80 bg-[#3767D2]">
                                            Slide 1
                                        </div>
                                        <div className="h-[40px]"></div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className=" m-0 border-white h-full flex flex-col justify-center" >
                                    <div className="flex flex-col">
                                        <div className="h-[40px]"></div>
                                        <div className="h-80 bg-[#3767D2]">
                                            Slide 2
                                        </div>
                                        <div className="h-[40px]"></div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className=" m-0 border-white h-full flex flex-col justify-center" >
                                    <div className="flex flex-col">
                                        <div className="h-[40px]"></div>
                                        <div className="h-80 bg-[#3767D2]">
                                            Slide 3
                                        </div>
                                        <div className="h-[40px]"></div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className=" m-0 border-white h-full flex flex-col justify-center" >
                                    <div className="flex flex-col">
                                        <div className="h-[40px]"></div>
                                        <div className="h-80 bg-[#3767D2]">
                                            Slide 4
                                        </div>
                                        <div className="h-[40px]"></div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className=" m-0 border-white h-full flex flex-col justify-center" >
                                    <div className="flex flex-col">
                                        <div className="h-[40px]"></div>
                                        <div className="h-80 bg-[#3767D2]">
                                            Slide 5
                                        </div>
                                        <div className="h-[40px]"></div>
                                    </div>
                                </SwiperSlide>
                                
                            </Swiper>

                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default ProjectSection;
