import { Facebook, Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="max-w-[90rem] text-black h-[375px] w-full mx-auto">
            <div className="w-full py-8 mx-auto">
                <h2 className="uppercase text-lg">follow upendra namburi-</h2>
                <span className="uppercase text-2xl">connect online</span>
                <div className="flex items-center justify-center gap-4 py-8 w-full">
                    <Linkedin className="text-white bg-[#0077B5] rounded-sm p-[5px]" size={32}/>
                    <Facebook className="text-white bg-[#1877F2] rounded-sm p-[5px]" size={32}/>
                    <FaWhatsapp className="bg-[#25D366] text-white rounded-sm p-[5px]" size={32}/>
                </div>
            </div>
            <div className="h-px w-10/12 mx-auto bg-black" />
            <div className="flex flex-row max-sm:gap-4 max-sm:flex-col w-10/12 max-sm:w-11/12 mx-auto py-6 items-center justify-between">
                <span className="max-sm:text-lg geist-medium">© Copyright 2025. All Rights Reserved.</span>
                <span className="geist-medium">
                    Designed with <span className="animate-pulse ">🩶</span> by <a target="_blank" className="geist-bold" href="https://actifyzone.com/business"> Actify
                        Business</a>
                </span>
            </div>
        </div>
    );
};

export default Footer;
