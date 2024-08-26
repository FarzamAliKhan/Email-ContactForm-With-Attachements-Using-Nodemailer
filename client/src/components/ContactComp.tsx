/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import {  motion } from 'framer-motion';
import Swal from 'sweetalert2'

import hi from '../assets/images/hi.svg';
import paperclip from '../assets/images/paperclip.svg';


type Interest = "WEBSITE" | "LOGO AND BRANDING" | "UI/UX DESIGN" | "MOTION GRAPHICS" | "3D GRAPHICS" | "ML SOLUTIONS" | "DESIGN SOLUTIONS" | "WEB 3.0 DEVELOPMENT" | "MARKETING" | "OTHER";
type Budget = "500-1k" | "1k-5k" | "5-10k" | "10k-20k" | "20k-30k" | "30k-40k" | "40k-50k" | "50k-100k" | "100k+";

export const ContactComp = () => {

  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<Budget | "">("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName('');
    }
  };

  const handleInterestClick = (value: Interest) => {
    setSelectedInterests(prevInterests => {
      if (!prevInterests.includes(value)) {
        return [...prevInterests, value]; // Add the interest if it's not already selected
      }
      return prevInterests
      // return prevInterests.filter((item)=> item !== value ); // If already selected, return previous state unchanged
    });
  };

//TODO: handle deletion of selected values
// Also there is a bug right now, whatever interests are being sent they are being sent in duplicates.

  const handleBudgetClick = (value: Budget) => {
      setSelectedBudget(value);
  };

  const isSelected = (value: Interest | Budget, type: "interest" | "budget") => {
      if (type === 'interest') {
          return selectedInterests.includes(value as Interest);
      } else if (type === 'budget') {
          return selectedBudget === value;
      }
  };

  const onSubmitNodeMailer = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);

    formData.delete("Interests");
    formData.append("Interests", selectedInterests.join(", "));
    console.log('formData: ',formData);

    Swal.fire({
      icon: "info",
      title: "Sending...",
      text: "Please wait",
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
      customClass: {
        popup: ' font-glancyrLight'
      }
    });

    // const object = Object.fromEntries(formData);
    // const json = JSON.stringify(object);

    // console.log('json: ',json);

    try {
      const res = await fetch("https://node-js-email-contact-form-attachments-server.vercel.app/send-email", {
        method: "POST",
        body: formData
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        icon: "success",
        title: "Your response has been sent!",
        text: "We will contact you shortly",
        showCloseButton: true,
        timerProgressBar: true,
        timer: 5000,
        customClass: {
          popup: ' font-glancyrLight'
        }
      });
    }
  } catch {
      Swal.fire({ 
        icon: "error", 
        title: "Oops...", 
        text: "Something went wrong!", 
        showCloseButton: true,
        timer: 5000, 
        customClass: {
          popup: ' font-glancyrLight'
        }
      });
    } finally {
        setLoading(false);
    }

  }

  console.log('interest: ',selectedInterests);
  console.log('budget: ',selectedBudget);


  return (
    <> 
      
      <div className="h-auto pb-10 sm:pb-32 flex">
        <div className="flex flex-col w-[65%]">
          <div className="h-auto px-5 pb-10 sm:px-12 sm:pb-0 sm:pt-16 flex flex-col mb-20">
            <button className="w-[291px] h-[74px] text-4xl rounded-full font-glancyrRegular bg-transparent outline outline-black outline-1 text-black px-4 py-1">
              CONTACT US
            </button>
          </div>
          <div className='px-5 sm:px-24'>
            <div className="flex items-end gap-5 relative">  
              {/* <Lottie src='src/assets/videos/hi-animated.json' style={{ width: '550px', display: 'absolute', zIndex: '0'}} ></Lottie> */}
              <img className="mb-5 w-[150px] sm:w-[212px]" src={hi} alt="" />
              <h1 className="text-black font-glancyrLight italic text-8xl">Tell us</h1>
            </div>
            <h1 className="text-black mb-8 font-glancyrLight italic text-8xl">everything.</h1>
            
            <form className="flex flex-col gap-4 mb-10" onSubmit={onSubmitNodeMailer} encType='multipart/form-data' >
              <div className="mb-16">
                <input className="w-[50%] h-[50px] mb-16 text-black font-glancyrThin text-xs sm:text-xl bg-transparent outline-none border-b border-black" required type="text" name='TestEmail'  placeholder="Test Email (for demo & testing of web app)" />
                <h3 className="text-black font-glancyrThin text-3xl mb-4">I'm interested in,</h3>
                <div className="flex gap-3 flex-col w-[65%]">
                  <div className="text-left w-full gap-4 flex items-center font-glancyrThin text-xs sm:text-xl">
                    <input type="checkbox" name="botcheck" id="" hidden/>
                    <label onClick={() => handleInterestClick("WEBSITE")}>
                      <input type="checkbox" name="Interests" value="WEBSITE" hidden />
                      <BlackStyledButton text="WEBSITE" selected={isSelected("WEBSITE", 'interest')} />
                    </label>
                    <label onClick={() => handleInterestClick("LOGO AND BRANDING")}>
                      <input type="checkbox" name="Interests" value="LOGO AND BRANDING" hidden />
                      <BlackStyledButton text="LOGO AND BRANDING" selected={isSelected("LOGO AND BRANDING", 'interest')} />
                    </label>
                    <label onClick={() => handleInterestClick("UI/UX DESIGN")}>
                      <input type="checkbox" name="Interests" value="UI/UX DESIGN" hidden />
                      <BlackStyledButton text="UI/UX DESIGN" selected={isSelected("UI/UX DESIGN", 'interest')} />
                    </label>
                  </div>
                  <div className="text-left w-full gap-4 flex items-center font-glancyrThin text-xs sm:text-xl">
                    <label onClick={() => handleInterestClick("MOTION GRAPHICS")}>
                      <input type="checkbox" name="Interests" value="MOTION GRAPHICS" hidden />
                      <BlackStyledButton text="MOTION GRAPHICS" selected={isSelected("MOTION GRAPHICS", 'interest')} />
                    </label>
                    <label onClick={() => handleInterestClick("3D GRAPHICS")}>
                      <input type="checkbox" name="Interests" value="3D GRAPHICS" hidden />
                      <BlackStyledButton text="3D GRAPHICS" selected={isSelected("3D GRAPHICS", 'interest')} />
                    </label>
                    <label onClick={() => handleInterestClick("ML SOLUTIONS")}>
                      <input type="checkbox" name="Interests" value="ML SOLUTIONS" hidden />
                      <BlackStyledButton text="ML SOLUTIONS" selected={isSelected("ML SOLUTIONS", 'interest')} />
                    </label>
                  </div>
                  <div className="text-left w-full gap-4 flex font-glancyrThin text-xs sm:text-xl">
                    <label onClick={() => handleInterestClick("DESIGN SOLUTIONS")}>
                      <input type="checkbox" name="Interests" value="DESIGN SOLUTIONS" hidden />
                      <BlackStyledButton text="DESIGN SOLUTIONS" selected={isSelected("DESIGN SOLUTIONS", 'interest')} />
                    </label>
                    <label onClick={() => handleInterestClick("WEB 3.0 DEVELOPMENT")}>
                      <input type="checkbox" name="Interests" value="WEB 3.0 DEVELOPMENT" hidden />
                      <BlackStyledButton text="WEB 3.0 DEVELOPMENT" selected={isSelected("WEB 3.0 DEVELOPMENT", 'interest')} />
                    </label>
                    <label  onClick={() => handleInterestClick("MARKETING")}>
                      <input  type="checkbox" name="Interests" value="MARKETING" hidden />
                      <BlackStyledButton text="MARKETING" selected={isSelected("MARKETING", 'interest')} />
                    </label>
                  </div>
                  <div className="text-center w-full gap-4 flex font-glancyrThin text-xs sm:text-xl">
                      <label onClick={() => handleInterestClick("OTHER")} className='w-full '  >
                        <input type="checkbox" name="Interests" value="OTHER" hidden />
                        <motion.div
                          whileHover={{ scale: 1.02, cursor: 'pointer' }}
                          transition ={{duration: 0.1, yoyo: Infinity}}
                          className={`rounded-full w-full font-glancyrThin  px-4 py-1 ${isSelected("OTHER", 'interest') ? 'text-[#f7f7f7] bg-[#070707] outline outline-[#b3e823] outline-2' : 'bg-transparent text-black outline outline-1 outline-black  '}`}>
                          OTHER
                        </motion.div>
                      </label>
                  </div>
                </div>
              </div>
              <input className="w-[50%] h-[50px] text-black font-glancyrThin text-xs sm:text-xl bg-transparent outline-none border-b border-black" required type="text" name='Name'  placeholder="Your Name" />
              <input className="w-[50%] h-[50px] text-black font-glancyrThin text-xs sm:text-xl bg-transparent outline-none border-b border-black" required type="email" name='Email'  placeholder="Your Email" />
              <textarea className="w-[50%] h-[50px] text-black font-glancyrThin text-xs sm:text-xl bg-transparent outline-none border-b border-black" required name='Description'  placeholder="Tell us about your amazing project" />
              <div className='pt-10 '>
                <h3 className="text-black font-glancyrThin text-3xl mb-4">Your Budget (USD)</h3>
                <div className="flex gap-3 mb-8 flex-col w-[65%]">
                  <div  className="text-left w-full gap-4 flex items-center font-glancyrThin text-xs sm:text-xl">
                    <label onClick={() => handleBudgetClick("500-1k")}>
                      <input  type="radio" name="budget" value="500-1k" hidden />
                      <BlackStyledButton text="500-1k" selected={isSelected("500-1k", 'budget')} />
                    </label>
                    <label onClick={() => handleBudgetClick("1k-5k")}>
                      <input type="radio" name="budget" value="1k-5k" hidden />
                      <BlackStyledButton text="1k-5k" selected={isSelected("1k-5k", 'budget')} />
                    </label>
                    <label onClick={() => handleBudgetClick("5-10k")}>
                      <input type="radio" name="budget" value="5-10k" hidden />
                      <BlackStyledButton text="5-10k" selected={isSelected("5-10k", 'budget')} />
                    </label>
                    <label onClick={() => handleBudgetClick("10k-20k")}>
                      <input type="radio" name="budget" value="10k-20k" hidden />
                      <BlackStyledButton text="10k-20k" selected={isSelected("10k-20k", 'budget')} />
                    </label>
                    <label onClick={() => handleBudgetClick("20k-30k")}>
                      <input type="radio" name="budget" value="20k-30k" hidden />
                      <BlackStyledButton text="20k-30k" selected={isSelected("20k-30k", 'budget')} />
                    </label>
                  </div>
                  <div className="text-left w-full gap-4 flex items-center font-glancyrThin text-xs sm:text-xl">
                    <label onClick={() => handleBudgetClick("30k-40k")}>
                      <input type="radio" name="budget" value="30k-40k" hidden />
                      <BlackStyledButton text="30k-40k" selected={isSelected("30k-40k", 'budget')} />
                    </label>
                    <label onClick={() => handleBudgetClick("40k-50k")}>
                      <input type="radio" name="budget" value="40k-50k" hidden />
                      <BlackStyledButton text="40k-50k" selected={isSelected("40k-50k", 'budget')} />
                    </label>
                    <label onClick={() => handleBudgetClick("50k-100k")}>
                      <input type="radio" name="budget" value="50k-100k" hidden />
                      <BlackStyledButton text="50k-100k" selected={isSelected("50k-100k", 'budget')} />
                    </label>
                    <label onClick={() => handleBudgetClick("100k+")}>
                      <input type="radio" name="budget" value="100k+" hidden />
                      <BlackStyledButton text="100k+" selected={isSelected("100k+", 'budget')} />
                    </label>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-[65%] ">
                  <label className='flex'>
                    <input type="file" name="attachment" style={{display: 'none'}} onChange= {handleFileChange} />
                    <motion.div whileHover={{ scale: 1.1}} className="cursor-pointer">
                      <img src={paperclip} alt="paperclip" />
                    </motion.div>
      
                   <h2 className='flex items-center leading-3 sm:w-[280px] truncate text-black font-glancyrThin pt-4 pb-4 text-xl border-b border-solid border-black'>
                     {fileName && (fileName) || <>Attach Document <span className='opacity-40 text-xl leading-3'> &nbsp; (optional) </span></>}
                  </h2>
                  
                  </label>
                  
                  <br />
                  <button disabled= {loading} type='submit' data-cursor="pointer2" className="mb-5 btn border-none h-8 w-20 text-base sm:h-16 sm:w-[200px] text-center sm:text-4xl">
                    <div className="btn__bg border border-solid border-black">
                      <span className="btn__bg__layer btn__bg__layer-first"></span>
                      <span className="btn__bg__layer btn__bg__layer-second"></span>
                      <span className="btn__bg__layer btn__bg__layer-third"></span>
                    </div>
                    {loading ?   //loading state , if loading, wait TEXT, if not, SEND text active button
                    <> <span className="btn__text-out text-black font-glancyrThin">WAIT</span>
                        <span className="btn__text-in text-black font-glancyrThin">WAIT</span> </> 
                        :
                    <> <span className="btn__text-out text-black font-glancyrThin">SEND</span>
                    <span className="btn__text-in text-black font-glancyrThin">SEND</span> </>
                    }
                  </button>
                </div > 
                
              </div>
            </form>
      
            <div className='w-[40%] pt-10 sm:pt-20'>
            </div>
            
          </div>
        </div>
        <div className="w-[35%] text-black sm:pt-32 ">
          <h1 className="text-black mb-8 font-glancyrLight italic text-base text-right p-16">Go to <a className=' hover:text-real-neon-green text-cyan-600' target='_blank' href="https://www.mailticking.com/">MailTicking (click here)</a>, generate a temporary email, <br/> enter it in Test Email for demo and recieve mail.</h1>
          <h1 className="text-black mb-8 font-glancyrLight italic text-base text-right pr-16">To configure recieving mails own your Email/Gmail, remove Test Email field. <br/><a className=' hover:text-real-neon-green text-cyan-600' target='_blank' href="https://support.google.com/mail/answer/185833?hl=en">Generate Gmail App Password (click here)</a>, add credentials in Nodemailer Auth.</h1>
        </div>
      </div>
      
    </>
  );
};

type BlackStyledButtonProps = {
    text: string;
    selected?: boolean;
  }
  
  export const BlackStyledButton = ({ text, selected }: BlackStyledButtonProps) => {   
  console.log('selected ',selected);

  return (

    <motion.div 
      whileHover={{ scale: 1.1, cursor: 'pointer' }}
      className={` ${selected ? 'rounded-full font-glancyrThin outline outline-[#b3e823] outline-2 px-4 py-1 text-[#f7f7f7] bg-[#070707] ' : ' rounded-full font-glancyrThin bg-transparent outline outline-black outline-1 text-black px-4 py-1'}`}
      transition ={{duration: 0.1, yoyo: Infinity}}
    >
      {text}
    </motion.div>
  );
    
  };
 
  
