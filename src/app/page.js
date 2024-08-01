'use client'

import Button from "@/components/button/Button";
import styles from '@/app/page.module.css'
import { FaArrowRight } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import { TfiEmail } from "react-icons/tfi";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { InputPri } from "@/components/Input/input";
import { TextareaPri } from "@/components/Input/textarea";
import { useEffect } from 'react';
import gsap from 'gsap';
import Link from "next/link";
import { FaBars } from "react-icons/fa6";
import { deleteCookie, getCookie } from "cookies-next";
import ResponseToast from "@/components/toast/Toast";
import { useRouter } from "next/navigation";

export default function Home() {

	const [open, setOpen] = useState(false);
	const handelOpen = () => {
		setOpen(!open);
	}

	const userData = getCookie("digitalrx")
		? JSON?.parse(getCookie("digitalrx"))
		: getCookie("digitalrx");

	const isLoggin = userData ? true : false;

	const router = useRouter()

	const padding_ = 'max-md:px-2 md:px-10 lg:px-20 xl:px-40'
	useEffect(() => {
		// Ensure GSAP is loaded before running the animation
		if (gsap) {
			gsap.to("#box", {
				duration: 20,
				rotation: 360,
				delay: 1,
				transformOrigin: "50% 50%",
				repeat: -1,
				onComplete: () => {
					// Callback function to pause after reaching 90 degrees
					gsap.to("#box", {
						duration: 0.1, // Set a short duration to immediately reach the next state
						rotation: '+=90', // Move 90 degrees to pause
						onComplete: () => {
							// Callback function to pause for 4 seconds
							gsap.delayedCall(4, () => {
								// Resume rotation
								gsap.to("#box", {
									duration: 30,
									rotation: '+=270', // Continue rotating for the remaining 270 degrees
									transformOrigin: "50% 50%",
									ease: 'none', // Use 'none' easing for a linear animation
									onComplete: rotateAgain // Loop back to this callback function
								});
							});
						}
					});
				}
			});

			// Callback function to initiate the next rotation
			const rotateAgain = () => {
				gsap.to("#box", {
					duration: 2,
					rotation: 360,
					transformOrigin: "50% 50%",
					onComplete: rotateAgain // Loop back to this callback function
				});
			};
		}
	}, []);

	const handleLogout = () => {
		try {
			if (isLoggin) {
				deleteCookie("digitalrx")
				setOpen(false)
			}
		} catch (error) {
			ResponseToast({ message: "Please Try Again later" })
		}
	}

	return (
		<main className={`${styles.main_} border--2 border-[red] w-full h-screen flex flex-col gap-10 overflow-hidden overflow-y-auto`}>

			<div className={`border--2 border-black bg-[#DE8127] w-full h-full fixed top-0 left-0 z-20 translate-y-[-1000vw] ${open === true ? 'translate-y-[0vw] transition-all duration-500' : 'translate-y-[-1000vw] transition-all duration-500'}`}>
				<ul className="border--2 border-green-500 text-[#fff] font-semibold w-full h-full flex flex-col justify-center items-center gap-4 px--8">
					<Link onClick={() => setOpen(false)} href={'#home'}> <li className="text-xl"> Home </li> </Link>
					<Link onClick={() => setOpen(false)} href={'#product'}> <li className="text-xl"> Product </li> </Link>
					<Link onClick={() => setOpen(false)} href={'#pricing'}> <li className="text-xl"> Pricing </li> </Link>
					<Link onClick={() => setOpen(false)} href={'#contact'}> <li className="text-xl"> Contact </li> </Link>
					{isLoggin &&
						<Link onClick={() => setOpen(false)} href={'/dashboard'}> <li className="text-xl"> Contact </li> </Link>
					}
					{isLoggin ?
						<li className="bg-[#fff] min-w-fit flex justify-center items-center p-2 rounded-lg px-5" onClick={handleLogout}>
							<Button name={'Logout'} className={'px-3 py-2'} bgcolor={'#fff'} pClass={'text-[#DE8127]'} />
							<FaArrowRight className="text-[#fff] text-xl" />
						</li> :
						<>
							<Link onClick={() => setOpen(false)} href={'login'}> <li className="text-xl font-semibold"> Login </li> </Link>
							<li onClick={() => { setOpen(false); router.push("sign-up") }} className="bg-[#fff] min-w-fit flex justify-center items-center p-2 rounded-lg px-5">
								<Button name={'JOIN US'} className={'px-3 py-2'} bgcolor={'#fff'} pClass={'text-[#DE8127]'} />
								<FaArrowRight className="text-[#fff] text-xl" />
							</li>
						</>
					}
				</ul>
			</div>

			<header id="home" className={`sec_1 border--2 border-green-900 w-full ${padding_} pt-1`}>
				<nav className="border--2 border-teal-900 w-full h-[5rem] flex justify-between items-center">
					<div className="flex items-center h-full w-fit">
						<img src="image/main/logo.png" alt="img" className="h-full" />
					</div>
					<ul className="border--2 border-r-green-500 text-[#737373] font-semibold w-fit h-full max-md:hidden md:flex justify-center items-center gap-4 px-8">
						<Link href={'#home'}> <li> Home </li> </Link>
						<Link href={'#product'}> <li> Product </li> </Link>
						<Link href={'#pricing'}> <li> Pricing </li> </Link>
						<Link href={'#contact'}> <li> Contact </li> </Link>
						{isLoggin &&
							<Link href={'/dashboard'}> <li> Dashboard </li> </Link>
						}
					</ul>
					<div className="min-w-fit flex justify-center items-center">
						{isLoggin ?
							<div className="bg-[#DE8127] min-w-fit hidden md:flex justify-center items-center p-2 rounded-lg px-5" onClick={handleLogout}>
								<Button name={'Logout'} className={'px-3 py-2'} bgcolor={'#DE8127'} pClass={'text-[#fff]'} />
								<FaArrowRight className="text-[#fff] text-xl" />
							</div> :
							<>
								<Link href={'/login'}>
									<h3 className="text-lg font-semibold me-10 hidden md:block"> Login </h3>
								</Link>
								<div className="bg-[#DE8127] min-w-fit hidden md:flex justify-center items-center p-2 rounded-lg px-5" onClick={() => router.push("sign-up")}>
									<Button name={'JOIN US'} className={'px-3 py-2'} bgcolor={'#DE8127'} pClass={'text-[#fff]'} />
									<FaArrowRight className="text-[#fff] text-xl" />
								</div>
							</>
						}
						<div onClick={handelOpen} className="border-2 border-white bg-[#DE8127] min-w-fit cursor-pointer hidden max-md:flex justify-center items-center p-2 py-3 rounded-lg px-4 z-30 relative">
							<FaBars className="text-[#fff] text-3xl" />
						</div>
					</div>
				</nav>
				<div className="border--2 border-[olive] w-full grid grid-cols-1 lg:grid-cols-2 mt-14">
					<div className="border--2 border-purple-900 w-full flex flex-col justify-center max-md:items-center py-8 gap-6">
						<h3 className="text-[#252B42] max-md:text-[2rem] max-md:text-center text-[4rem] font-bold"> Prescriptions Delivered, Care Simplified. </h3>
						<p className="text-[#737373] font-medium max-md:text-center">Bringing your prescriptions home, for your peace of mind.</p>
						<div className="w-fit flex justify-center items-center mt-4">
							<Button name={'Get Quote Now'} className={'px-14 py-4 bg-[#DE8127]'} bgcolor={'#DE8127'} pClass={'text-[#fff]'} />
						</div>
					</div>
					<div className="border--2 border-purple-900 w-full flex justify-center items-center relative">
						<img id="box" src="image/main/line_1.png" alt="img" className="h-[67%] md:h-[21.5rem] absolute" />
						<img src="image/main/herosec_img.png" alt="img.png" className="h-full z-10" />
					</div>
				</div>
			</header>

			<section className={`sec_2 border--2 border-red-900 w-full ${padding_}`}>
				<div className="border--2 border-[orange] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
					<div className="border--2 border-green-900 w-full max-md:h-[6rem] h-[10rem] flex flex-col justify-center items-center">
						<h1 className="text-[#27356C]"> 15K </h1>
						<p className="font-semibold mt-2"> Happy Customers </p>
					</div>
					<div className="border--2 border-green-900 w-full max-md:h-[6rem] h-[10rem] flex flex-col justify-center items-center">
						<h1 className="text-[#27356C]"> 150K </h1>
						<p className="font-semibold mt-2"> Monthly Visitors </p>
					</div>
					<div className="border--2 border-green-900 w-full max-md:h-[6rem] h-[10rem] flex flex-col justify-center items-center">
						<h1 className="text-[#27356C]"> 15 </h1>
						<p className="font-semibold mt-2"> Countries Worldwide </p>
					</div>
					<div className="border--2 border-green-900 w-full max-md:h-[6rem] h-[10rem] flex flex-col justify-center items-center">
						<h1 className="text-[#27356C]"> 100+ </h1>
						<p className="font-semibold mt-2"> Pharmacies </p>
					</div>
				</div>
			</section>

			<section id="product" className={`sec_3 border--2 border-red-900 w-full ${padding_}`}>
				<div className="border--2 border-[olive] w-full grid grid-cols-1 lg:grid-cols-2 mt-0">
					<div className="border--2 border-purple-900 w-full flex flex-col justify-center max-md:items-center py-8 gap-2">
						<p className="text-[#DE8127] font-semibold max-md:text-center">Product</p>
						<h3 className="text-[#252B42] max-md:text-[2rem] max-md:text-center text-[4rem] font-bold"> How It Works? </h3>
						<p className="text-[#737373] font-medium max-md:text-center">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Sed fermentum odio vitae magna tincidunt vestibulum. Vestibulum
							sagittis eros eu risus commodo, vel convallis turpis fermentum. Sed
							sit amet magna eget est aliquet venenatis.
						</p>
						<div className="w-fit flex justify-center items-center mt-4">
							<Button name={'JOIN US'} className={'px-14 py-4 bg-[#DE8127]'} bgcolor={'#DE8127'} pClass={'text-[#fff]'} />
						</div>
					</div>
					<div className="border--2 border-purple-900 w-full flex justify-center items-center">
						<img src="image/main/sec_3_img.png" alt="img.png" className="h-full" />
					</div>
				</div>
			</section>

			<section id="pricing" className={`sec_4 border--2 border-red-900 bg-[#DE812730] w-full ${padding_}`}>

				<div className="border--2 border-purple-900 w-full flex flex-col justify-center max-md:items-center py-8 gap-2">
					<p className="text-[#DE8127] font-semibold max-md:text-center">Pricing</p>
					<h3 className="text-[#252B42] max-md:text-[2rem] max-md:text-center text-[4rem] font-bold"> Select Plan </h3>
					<p className="text-[#737373] max-md:w-full w-[60%] font-medium max-md:text-center">
						Explore our pricing plans tailored to your prescription requirements. Select the perfect package for seamless medication delivery.
					</p>
				</div>

				<div className="border--2 border-[orange] w-full h-fit mb-10">
					<Swiper
						slidesPerView={3}
						spaceBetween={30}
						pagination={{
							clickable: true,
						}}
						breakpoints={{
							1280: {
								slidesPerView: 3,
							},
							1024: {
								slidesPerView: 3,
							},
							500: {
								slidesPerView: 2,
							},
							250: {
								slidesPerView: 1,
							},
						}}
						// modules={[Pagination]}
						className="mySwiper"
					>

						<SwiperSlide className="border--2 border-green-900">

							<div className={`${styles.packages_} border--2 border-green-900 bg-[#DE8127] max-md:w-full w-fit flex flex-col justify-center items--center p-4 max-md:px-3 lg:px-5 lg:py-5 xl:px-7 xl:py-10 rounded-2xl`}>
								<h3 className="text-[#fff] max-md:text-2xl text-3xl font-bold"> KICKSTARTER Lorem Package </h3>
								<div className="w-full max-md:my-5 my-10 max-md:mt-8 mt-12">
									<h3 className="text-[#fff] font-semibold max-md:text-2xl text-3xl"> $249.98<sub>/ Month</sub> </h3>
								</div>
								<div className="border--2 border-green-900 h-[11rem] overflow-hidden overflow-y-auto">
									<ul className="border--2 border-green-900 w-full flex flex-col justify-center max-[330px]:gap-2">
										<li className="text-[#fff] max-[330px]:text-sm max-md:text-base text-lg flex items-center max-md:gap-2 gap--4 mt"> <FaCheckCircle className="text-lg me-3" /> 3 Stock Photos  </li>
										<li className="text-[#fff] max-[330px]:text-sm max-md:text-base text-lg flex items-center max-md:gap-2 gap--4"> <FaCheckCircle className="text-lg me-3" /> 3 Page Website  </li>
										<li className="text-[#fff] max-[330px]:text-sm max-md:text-base text-lg flex items-center max-md:gap-2 gap--4"> <FaCheckCircle className="text-lg me-3" /> 2 Banner Design  </li>
										<li className="text-[#fff] max-[330px]:text-sm max-md:text-base text-lg flex items-center max-md:gap-2 gap--4"> <FaCheckCircle className="text-lg me-3" /> Complete W3C Certified HTML  </li>
										<li className="text-[#fff] max-[330px]:text-sm max-md:text-base text-lg flex items-center max-md:gap-2 gap--4"> <FaCheckCircle className="text-lg me-3" /> 100% Satisfaction Guarantee  </li>
										<li className="text-[#fff] max-[330px]:text-sm max-md:text-base text-lg flex items-center max-md:gap-2 gap--4"> <FaCheckCircle className="text-lg me-3" /> 100% Unique Design Guarantee  </li>
									</ul>
								</div>
								<div className="w-full flex justify-center items-center mt-12">
									<Button name={'JOIN US'} className={'px-14 py-4 border-2 border-white bg-[#DE8127]'} bgcolor={'#DE8127'} pClass={'text-[#fff]'} />
								</div>
							</div>

						</SwiperSlide>

						<SwiperSlide>

							<div className={`${styles.packages_} border--2 border-green-900 bg-[#DE8127] max-md:w-full w-fit flex flex-col justify-center items--center p-4 max-md:px-3 lg:px-5 lg:py-5 xl:px-7 xl:py-10 rounded-2xl`}>
								<h3 className="text-[#fff] max-md:text-2xl text-3xl font-bold"> KICKSTARTER Lorem Package </h3>
								<div className="w-full max-md:my-5 my-10 max-md:mt-8 mt-12">
									<h3 className="text-[#fff] font-semibold max-md:text-2xl text-3xl"> $249.98<sub>/ Month</sub> </h3>
								</div>
								<div className="border--2 border-green-900 h-[11rem] overflow-hidden overflow-y-auto">
									<ul className="border--2 border-green-900 w-full flex flex-col justify-center max-[330px]:gap-2">
										<li className="text-[#fff] max-[330px]:text-sm max-md:text-base text-lg flex items-center max-md:gap-2 gap--4 mt"> <FaCheckCircle className="text-lg me-3" /> 3 Stock Photos  </li>
										<li className="text-[#fff] max-[330px]:text-sm max-md:text-base text-lg flex items-center max-md:gap-2 gap--4"> <FaCheckCircle className="text-lg me-3" /> 3 Page Website  </li>
										<li className="text-[#fff] max-[330px]:text-sm max-md:text-base text-lg flex items-center max-md:gap-2 gap--4"> <FaCheckCircle className="text-lg me-3" /> 2 Banner Design  </li>
										<li className="text-[#fff] max-[330px]:text-sm max-md:text-base text-lg flex items-center max-md:gap-2 gap--4"> <FaCheckCircle className="text-lg me-3" /> Complete W3C Certified HTML  </li>
										<li className="text-[#fff] max-[330px]:text-sm max-md:text-base text-lg flex items-center max-md:gap-2 gap--4"> <FaCheckCircle className="text-lg me-3" /> 100% Satisfaction Guarantee  </li>
										<li className="text-[#fff] max-[330px]:text-sm max-md:text-base text-lg flex items-center max-md:gap-2 gap--4"> <FaCheckCircle className="text-lg me-3" /> 100% Unique Design Guarantee  </li>
									</ul>
								</div>
								<div className="w-full flex justify-center items-center mt-12">
									<Button name={'JOIN US'} className={'px-14 py-4 border-2 border-white bg-[#DE8127]'} bgcolor={'#DE8127'} pClass={'text-[#fff]'} />
								</div>
							</div>

						</SwiperSlide>

						<SwiperSlide>

							<div className={`${styles.packages_} border--2 border-green-900 bg-[#DE8127] max-md:w-full w-fit flex flex-col justify-center items--center p-4 max-md:px-3 lg:px-5 lg:py-5 xl:px-7 xl:py-10 rounded-2xl`}>
								<h3 className="text-[#fff] max-md:text-2xl text-3xl font-bold"> KICKSTARTER Lorem Package </h3>
								<div className="w-full max-md:my-5 my-10 max-md:mt-8 mt-12">
									<h3 className="text-[#fff] font-semibold max-md:text-2xl text-3xl"> $249.98<sub>/ Month</sub> </h3>
								</div>
								<div className="border--2 border-green-900 h-[11rem] overflow-hidden overflow-y-auto">
									<ul className="border--2 border-green-900 w-full flex flex-col justify-center max-[330px]:gap-2">
										<li className="text-[#fff] max-[330px]:text-sm max-md:text-base text-lg flex items-center max-md:gap-2 gap--4 mt"> <FaCheckCircle className="text-lg me-3" /> 3 Stock Photos  </li>
										<li className="text-[#fff] max-[330px]:text-sm max-md:text-base text-lg flex items-center max-md:gap-2 gap--4"> <FaCheckCircle className="text-lg me-3" /> 3 Page Website  </li>
										<li className="text-[#fff] max-[330px]:text-sm max-md:text-base text-lg flex items-center max-md:gap-2 gap--4"> <FaCheckCircle className="text-lg me-3" /> 2 Banner Design  </li>
										<li className="text-[#fff] max-[330px]:text-sm max-md:text-base text-lg flex items-center max-md:gap-2 gap--4"> <FaCheckCircle className="text-lg me-3" /> Complete W3C Certified HTML  </li>
										<li className="text-[#fff] max-[330px]:text-sm max-md:text-base text-lg flex items-center max-md:gap-2 gap--4"> <FaCheckCircle className="text-lg me-3" /> 100% Satisfaction Guarantee  </li>
										<li className="text-[#fff] max-[330px]:text-sm max-md:text-base text-lg flex items-center max-md:gap-2 gap--4"> <FaCheckCircle className="text-lg me-3" /> 100% Unique Design Guarantee  </li>
									</ul>
								</div>
								<div className="w-full flex justify-center items-center mt-12">
									<Button name={'JOIN US'} className={'px-14 py-4 border-2 border-white bg-[#DE8127]'} bgcolor={'#DE8127'} pClass={'text-[#fff]'} />
								</div>
							</div>

						</SwiperSlide>
					</Swiper>
				</div>

			</section>

			<section id="contact" className={`sec_5 border--2 border-red-900 w-full ${padding_}`}>
				<div className="border--2 border-purple-900 w-full flex flex-col justify-center items-center max-md:items-center py-8 gap-2">
					<p className="text-[#DE8127] font-semibold max-md:text-center">Newsletter</p>
					<h3 className="text-[#252B42] max-md:text-[2rem] max-md:text-center text-[4rem] font-bold"> JOIN US </h3>
					<p className="text-[#737373] max-md:w-full w-[60%] font-medium text-center">
						Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
					</p>
				</div>
				<form action="" className="border--2 border-green-950 mb-10 flex flex-col justify-center items-center gap-6">

					<div className={`max-md:w-full w-[55%]`}>
						<label className={`text-[#DE8127]`}> Your Name </label>
						<InputPri type={'text'} placeholder={'John Smith'} className={`${styles.input_} border-0 border-b-2 focus:border-[#DE8127] shadow-none`} />
					</div>
					<div className={`max-md:w-full w-[55%]`}>
						<label className={`text-[#DE8127]`}> Your email </label>
						<InputPri type={'email'} placeholder={'email@gmail.com'} className={`border-0 border-b-2 focus:border-[#DE8127] shadow-none`} />
					</div>
					<div className="max-md:w-full w-[55%] h-full rounded-md">
						<label className="text-[#DE8127]"> Your message </label>
						<TextareaPri placeholder={`Type your message here.`} className={`border-0 border-b-2 focus:border-2 focus:border-[#DE8127] h-[10rem] shadow-none mt-2 transition-all`} />
					</div>
					<div className="max-md:w-full w-[55%]">
						<Button name={'Send message'} className={'px-14 py-4 border-2 border-white bg-[#DE8127]'} bgcolor={'#DE8127'} pClass={'text-[#fff]'} />
					</div>

				</form>
			</section>

			<footer className={`sec_6 border--2 border-red-900 w-full ${padding_} mb--8`}>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid--cols-5 my-11 gap-5">
					<ul className="border--2 border-green-900 w-full flex flex-col max-md:items-center gap-3">
						<li className="text-lg font-bold text-[#252B42]"> Company Info </li>
						<li className="text-base font-medium text-[#737373]">About Us</li>
						<li className="text-base font-medium text-[#737373]">Carrier</li>
						<li className="text-base font-medium text-[#737373]">We are hiring</li>
						<li className="text-base font-medium text-[#737373]">Blog</li>
					</ul>
					<ul className="border--2 border-green-900 w-full flex flex-col max-md:items-center gap-3">
						<li className="text-lg font-bold text-[#252B42]"> Features </li>
						<li className="text-base font-medium text-[#737373]">Business Marketing</li>
						<li className="text-base font-medium text-[#737373]">User Analytic</li>
						<li className="text-base font-medium text-[#737373]">Live Chat</li>
						<li className="text-base font-medium text-[#737373]">Unlimited Support</li>
					</ul>
					<ul className="border--2 border-green-900 w-full flex flex-col max-md:items-center gap-3">
						<li className="text-lg font-bold text-[#252B42]"> Resources </li>
						<li className="text-base font-medium text-[#737373]">IOS & Android</li>
						<li className="text-base font-medium text-[#737373]">Watch a Demo</li>
						<li className="text-base font-medium text-[#737373]">Customers</li>
						<li className="text-base font-medium text-[#737373]">API</li>
					</ul>
					<ul className="border--2 border-green-900 w-full flex flex-col max-md:items-center gap-3">
						<li className="text-lg font-bold text-[#252B42]"> Get In Touch </li>
						<li className="text-base font-medium text-[#737373] flex items-center"> <FiPhone className="text-xl text-[#DE8127] me-2" /> (480) 555-0103</li>
						<li className="text-base font-medium text-[#737373] max-md:text-center flex"> <SlLocationPin className="max-[400px]:text-[1.9rem] md:text-2xl lg:text-4xl text-[#DE8127] me-2" /> 4517 Washington Ave. Manchester, Kentucky 39495</li>
						<li className="text-base font-medium text-[#737373] flex items-center"> <TfiEmail className="text-xl text-[#DE8127] me-2" /> debra.holt@example.com </li>
					</ul>
				</div>
				<div className="border--2 border-green-900 w-full py-2 flex items-center justify-between">
					<p className="text-[#737373] font-semibold">Digital RX | All Right Reserved </p>
					<div className="flex gap-2">
						<FaFacebook className="text-lg text-[#DE8127]" />
						<FaInstagram className="text-lg text-[#DE8127]" />
						<FaTwitter className="text-lg text-[#DE8127]" />
					</div>
				</div>
			</footer>

		</main>
	);
}