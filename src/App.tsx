import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Users, Clock, Monitor, CreditCard, Calendar, CheckCircle2, Loader2, ChevronDown, ChevronUp } from 'lucide-react';

interface IFormInput {
  name: string;
  email: string;
  phone: string;
}

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>();

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsSubmittingForm(true);
    setSubmitSuccess(false);
    
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      setSubmitSuccess(true);
      reset();
      console.log('Submitted Data:', data);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(error instanceof Error ? error.message : 'An error occurred during registration. Please try again.');
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-5">
        <header className="flex justify-between items-center py-5 border-b border-wine/20">
          <div className="text-2xl font-display font-extrabold text-wine tracking-wide">Kidrove</div>
        </header>
      </div>

      <section className="relative py-24 text-center bg-pattern">
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-wine/10 rounded-full blur-[100px] animate-blob"></div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-wine to-maroon bg-clip-text text-transparent relative z-10">
            AI & Robotics Summer Workshop
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto mb-10">
            Dive into the future with our interactive summer workshop. Build real robots, 
            understand artificial intelligence, and learn coding in a fun, engaging environment.
          </p>
          <a href="#register" className="btn-primary inline-block px-8 py-4 text-lg font-semibold rounded-full relative z-10">
            Enroll Now
          </a>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-4xl text-center mb-12 font-bold">Workshop Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: Users, label: 'Age Group', value: '8–14 Years' },
              { icon: Clock, label: 'Duration', value: '4 Weeks' },
              { icon: Monitor, label: 'Mode', value: 'Online' },
              { icon: CreditCard, label: 'Fee', value: '₹2,999' },
              { icon: Calendar, label: 'Start Date', value: '15 July 2026' }
            ].map((detail, idx) => (
              <div key={idx} className="glass-card p-8 text-center hover:-translate-y-2 hover:border-wine animate-float" style={{animationDelay: `${idx * 0.15}s`}}>
                <detail.icon className="w-12 h-12 mx-auto text-wine mb-4" />
                <h3 className="text-text-muted font-semibold mb-2">{detail.label}</h3>
                <p className="text-2xl font-bold text-text-main">{detail.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="text-4xl text-center mb-12 font-bold">What You'll Learn</h2>
          <ul className="space-y-4">
            {[
              "Understand the core fundamentals of Artificial Intelligence and Machine Learning.",
              "Build and program your own virtual robots using block-based and Python coding.",
              "Develop problem-solving and critical thinking skills through interactive challenges.",
              "Create hands-on AI projects such as voice recognition and image classification.",
              "Collaborate with peers and showcase a final capstone project on graduation day."
            ].map((outcome, idx) => (
              <li key={idx} className="glass-card bg-sand/30 p-6 flex items-center gap-4 hover:bg-sand/50 hover:translate-x-2 border-transparent hover:border-wine/30 transition-all duration-300">
                <CheckCircle2 className="text-wine w-6 h-6 shrink-0" />
                <span className="text-lg">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="text-4xl text-center mb-12 font-bold">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Do I need prior coding experience?', a: 'No prior experience is necessary! Our curriculum is designed for beginners and will guide you step-by-step.' },
              { q: 'What hardware or software is required?', a: 'All you need is a computer or tablet with a stable internet connection. All tools used are web-based and free.' },
              { q: 'Will I get a certificate upon completion?', a: 'Yes! Every student who successfully completes their final project will receive a verified Kidrove certificate.' }
            ].map((faq, idx) => (
              <div key={idx} className="glass-card overflow-hidden !rounded-xl">
                <button 
                  className="w-full px-8 py-6 text-left flex justify-between items-center text-lg font-semibold hover:bg-sand/40 transition-colors"
                  onClick={() => toggleFaq(idx)}
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-5 h-5 text-text-muted" /> : <ChevronDown className="w-5 h-5 text-text-muted" />}
                </button>
                {openFaq === idx && (
                  <div className="px-8 pb-6 text-text-muted leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="register" className="py-24">
        <div className="max-w-xl mx-auto px-5">
          <div className="glass-card p-10 md:p-12">
            <h2 className="text-3xl font-bold text-center mb-8">Secure Your Spot</h2>
            
            {submitSuccess ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-wine mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-wine">Registration Successful!</h3>
                <p className="text-text-muted">We have received your details. Please check your email for the next steps.</p>
                <button 
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-8 px-6 py-2 border border-wine rounded-full text-text-muted hover:text-white hover:bg-wine transition-colors"
                >
                  Register Another Student
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-semibold text-text-muted">Full Name</label>
                  <input 
                    id="name"
                    type="text" 
                    placeholder="Student's Name" 
                    {...register("name", { required: "Name is required" })}
                    className={`w-full p-4 rounded-xl glass-input ${errors.name ? 'border-red-500' : ''}`}
                  />
                  {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 font-semibold text-text-muted">Email Address</label>
                  <input 
                    id="email"
                    type="email" 
                    placeholder="Parent's Email" 
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className={`w-full p-4 rounded-xl glass-input ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block mb-2 font-semibold text-text-muted">Phone Number</label>
                  <input 
                    id="phone"
                    type="tel" 
                    placeholder="Parent's Phone" 
                    {...register("phone", { 
                      required: "Phone number is required",
                      minLength: { value: 10, message: "Phone number must be at least 10 digits" }
                    })}
                    className={`w-full p-4 rounded-xl glass-input ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && <p className="mt-2 text-sm text-red-500">{errors.phone.message}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmittingForm}
                  className="w-full py-4 text-lg font-semibold rounded-xl btn-primary disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {isSubmittingForm ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Register for Workshop'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="text-center py-8 border-t border-wine/20 text-text-muted">
        <p>© 2026 Kidrove. All rights reserved.</p>
      </footer>
    </div>
  );
}
