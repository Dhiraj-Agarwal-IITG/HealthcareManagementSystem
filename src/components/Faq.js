import React from 'react'
import { useState } from 'react'

const Faq = ()=>{
    const [formData, setFormData] = useState({
        Name : "",
        email: "",
        subject: "",
        message: "",
    });
    const {
        Name,
        email,
        subject,
        message
    } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
        // console.log(formData);
    };

    const submitHanler = () =>{
        console.log(formData);
    }

    return(
     <div>
        <div className='font-bold text-center text-4xl mt-2'> Frequently Asked Questions</div>
        <div className='mt-8 ml-5 flex flex-col gap-7 text-2xl'>
            <div className='flex flex-col gap-2'>
                <div className='font-bold'> Ques: How to book an appointment?</div>
                <div> 
                Ans: Go to New Appointment Section just in top-right corner. Your details are auto fetched.
                Enter information about your symptoms and the department. You can also choose your preferred time slot.
                And submit the application. And that's all.
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='font-bold'> Ques: How to access your reports? </div>
                <div>
                    Ans : Go to your Dashboard. All your reports are listed there. Click on the report you want to open.
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='font-bold'> Ques: How to see your appointment history?</div>
                <div>
                    Ans: Click on the invoices in sidebar. There your can see information about all your past appintments.
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='font-bold'> Ques: How to get contact details of doctors? </div>
                <div>
                    Ans: Click on the doctors in sidebar. There you can find the list of all doctors along with their department and Email ID.
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='font-bold'> Ques: How to contact us? </div>
                <div>
                    Ans: Just fill the form below.
                </div>
            </div>

        </div>

    <div className=" h-screen">
      <div className="container mx-auto">
        <div className="pt-16">
          <h1 className="text-4xl font-semibold text-gray-800 text-center">Contact Us</h1>

          <div className="mt-8">
            <form className="max-w-md mx-auto" action='https://formspree.io/f/xnqkrjeg' method='POST'>
              <div className="mb-4">
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-400"
                  type="text"
                  name="Name"
                  value={Name}
                  onChange={handleOnChange}
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-400"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  placeholder="Enter your email address"
                />
              </div>
              <div className="mb-4">
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-400"
                  type="text"
                  name="subject"
                  value={subject}
                  onChange={handleOnChange}
                  placeholder="Enter your subject"
                />
              </div>
              <div className="mb-4">
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-400"
                  name="message"
                  value={message}
                  onChange={handleOnChange}
                  cols="30"
                  rows="10"
                  placeholder="Enter your message"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>


        
     </div>
    )
}

export default Faq