import React, { useState } from "react";

const faqs = [
  {
    question: "How to register events?",
    answer:
      "To register for an event, simply visit the event page and click on the registration button. Fill out the required information and submit your registration. You will receive a confirmation email once your registration is successful.",
  },
  {
    question: "Can I contact organizers?",
    answer:
      "Yes, you can contact event organizers directly through our real-time chat feature. This allows for immediate communication regarding any queries or concerns. Simply navigate to the event page and start chatting.",
  },
  {
    question: "What are event notifications?",
    answer:
      "Event notifications are automated messages sent to students about upcoming events. These notifications include important details such as date, time, and location. You can customize your notification preferences in your account settings.",
  },
  {
    question: "Is there a mobile app?",
    answer:
      "Currently, we do not have a dedicated mobile app. However, our website is fully optimized for mobile use, allowing you to access all features seamlessly on your smartphone. Stay tuned for future updates regarding a mobile app.",
  },
  {
    question: "How to provide feedback?",
    answer:
      "We welcome your feedback! You can provide feedback through the contact form on our website. Your insights help us improve our platform and services.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-3xl mx-auto my-16 px-6 text-center">
      {/* Header */}
      <h2 className="text-4xl font-bold text-gray-900">FAQs</h2>
      <p className="text-gray-600 mt-2">
        Here are answers to some frequently asked questions about our event management platform.
      </p>

      {/* FAQ Items */}
      <div className="mt-8 space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border my-9 border-gray-300 rounded-md">
            <button
              className="w-full p-4 text-left flex justify-between items-center text-gray-900 font-semibold"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="text-gray-500 text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <p className="p-4 text-gray-700 border-t border-gray-300">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold">Still have questions?</h3>
        <p className="text-gray-600 mt-2">
          Reach out to us anytime for assistance.
        </p>
        <button className="mt-4 px-6 py-2 border border-gray-900 rounded-md hover:bg-gray-100">
          Contact
        </button>
      </div>
    </section>
  );
};

export default FAQ;
