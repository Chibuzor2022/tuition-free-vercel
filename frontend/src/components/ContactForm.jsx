import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceID = 'service_4ydxg0c';
    const templateID = "template_8v5ye3f";
    const userID = '-wDcK_L3A41LY-1w9';

    emailjs.send(serviceID, templateID, formData, userID)
      .then(() => {
        toast.success("Message sent successfully! We'll get back to you soon.", {
          position: "top-center",
          autoClose: 3000
        });

        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => navigate("/"), 3000);
      })
      .catch(() => {
        toast.error("Failed to send message. Please try again later.", {
          position: "top-center",
          autoClose: 4000
        });
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <ToastContainer />
      <div className="w-full max-w-sm">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-gray-100 p-6 rounded-xl shadow-md"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;







// import React, { useState } from 'react';
// import emailjs from 'emailjs-com';
// import { useNavigate } from "react-router-dom";

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState('');
//    const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitStatus('');

//     // Replace with your actual EmailJS credentials
//     const serviceID = 'service_4ydxg0c';
//     const templateID = "template_8v5ye3f";
//     const userID = '-wDcK_L3A41LY-1w9';
   

//     emailjs.send(serviceID, templateID, formData, userID)
//       .then((result) => {
//         console.log('Email successfully sent!', result.text);
      
//         setSubmitStatus('success');
//         setTimeout(() => {
//         navigate("/"); // this sends them to the homepage
//       }, 3000);
        
//         setFormData({ name: '', email: '', subject: '', message: '' });
//       })
//       .catch((error) => {
//         console.error('Failed to send email:', error);
//         setSubmitStatus('error');
//       })
//       .finally(() => {
//         setIsSubmitting(false);
//       });
//   };

// return (
//   <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//     <div className="w-full max-w-md mt-12 mb-12">
//       <form
//         onSubmit={handleSubmit}
//         className="space-y-6 bg-gray-100 p-8 rounded-xl shadow-md " 
//       >
//         {/* Name Field */}
//         <div>
//           <label
//             htmlFor="name-modern"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Name
//           </label>
//           <input
//             type="text"
//             id="name-modern"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             disabled={isSubmitting}
//             className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm"
//             placeholder="Your name"
//           />
//         </div>

//         {/* Email Field */}
//         <div>
//           <label
//             htmlFor="email-modern"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Email
//           </label>
//           <input
//             type="email"
//             id="email-modern"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             disabled={isSubmitting}
//             className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm"
//             placeholder="your.email@example.com"
//           />
//         </div>

//         {/* Subject Field */}
//         <div>
//           <label
//             htmlFor="subject-modern"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Subject
//           </label>
//           <input
//             type="text"
//             id="subject-modern"
//             name="subject"
//             value={formData.subject}
//             onChange={handleChange}
//             required
//             disabled={isSubmitting}
//             className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm"
//             placeholder="What's this about?"
//           />
//         </div>

//         {/* Message Field */}
//         <div>
//           <label
//             htmlFor="message-modern"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Message
//           </label>
//           <textarea
//             id="message-modern"
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             rows="4"
//             required
//             disabled={isSubmitting}
//             className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm"
//             placeholder="Your message..."
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition shadow-md disabled:opacity-50"
//         >
//           {isSubmitting ? "Sending..." : "Send Message"}
//         </button>

//         {/* Success/Error Messages */}
//         {submitStatus === "success" && (
//           <div className="bg-green-100 text-green-800 p-3 rounded-lg text-sm">
//             Message sent successfully! We'll get back to you soon.
//           </div>
//         )}
     

//         {submitStatus === "error" && (
//           <div className="bg-red-100 text-red-800 p-3 rounded-lg text-sm">
//             Failed to send message. Please try again later.
//           </div>
//         )}
//       </form>
//     </div>
//   </div>
// );

// }
// export default ContactForm;