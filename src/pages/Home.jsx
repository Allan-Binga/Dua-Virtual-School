import React, { useState, useEffect } from 'react';
import { Mail, Phone, Globe } from 'lucide-react';

const Carousel = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = React.Children.count(children);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % totalSlides);
        }, 5000);
        return () => clearInterval(interval);
    }, [totalSlides]);

    return (
        <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {React.Children.map(children, (child) => (
                    <div className="w-full flex-shrink-0">{child}</div>
                ))}
            </div>
            <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                        key={index}
                        className={`h-2 rounded-sm transition-all duration-300 ${currentIndex === index ? 'w-8 bg-amber-700' : 'w-2 bg-gray-400'
                            }`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

function Home() {
    const [welcomeText, setWelcomeText] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const phrases = ['British International Curriculum', 'Quality Homeschooling Services', 'Quality Language Classes Globally'];
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const typingSpeed = isDeleting ? 30 : 100; // Faster deletion, slower typing
        const timer = setInterval(() => {
            if (!isDeleting && charIndex <= phrases[phraseIndex].length) {
                setWelcomeText(phrases[phraseIndex].substring(0, charIndex));
                setCharIndex(charIndex + 1);
            }

            if (!isDeleting && charIndex > phrases[phraseIndex].length) {
                setTimeout(() => setIsDeleting(true), 1000); // Pause before deleting
            }

            if (isDeleting && charIndex >= 0) {
                setWelcomeText(phrases[phraseIndex].substring(0, charIndex));
                setCharIndex(charIndex - 1);
            }

            if (isDeleting && charIndex < 0) {
                setIsDeleting(false);
                setPhraseIndex((phraseIndex + 1) % phrases.length);
                setCharIndex(0);
            }
        }, typingSpeed);

        // Blink cursor effect
        const blinkTimer = setInterval(() => setBlink((prev) => !prev), 500);

        return () => {
            clearInterval(timer);
            clearInterval(blinkTimer);
        };
    }, [phraseIndex, charIndex, isDeleting]);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Thank you, ${formData.name}! Your message has been sent.`);
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    return (
        <div className="bg-stone-50 text-gray-800 min-h-screen" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {/* Premium Navigation */}
            <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white py-4' : 'bg-transparent py-6'
                }`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight" style={{
                        background: 'linear-gradient(135deg, #7c2d12 0%, #d97706 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Dua Virtual School
                    </h1>
                    <nav className="hidden md:flex space-x-8 text-sm font-medium">
                        {['Home', 'About Us', 'Courses', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(' ', '-')}`}
                                onClick={(e) => { e.preventDefault(); scrollToSection(item.toLowerCase().replace(' ', '-')); }}
                                className={`transition-colors duration-200 ${isScrolled ? 'text-gray-700 hover:text-amber-800' : 'text-white hover:text-amber-200'
                                    }`}
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-orange-800 to-yellow-900"></div>
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1606787366850-ede2e0e9c9d1")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}></div>

                <div className="relative z-10 text-center px-6 max-w-5xl">
                    <div className="mb-8 inline-block">
                        <span className="bg-amber-100 text-amber-900 px-6 py-2 rounded-sm text-sm font-semibold tracking-wide">
                            Excellence in Virtual Education
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Welcome to<br />Dua Virtual School
                    </h2>
                    <p className="text-2xl md:text-3xl text-amber-100 mb-12 font-light min-h-[40px]">
                        {welcomeText}
                        <span className={`inline-block w-2 h-8 bg-amber-100 ${blink ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}></span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-amber-900 px-8 py-4 rounded-sm font-semibold hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                            Register Now
                        </button>
                        <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-sm font-semibold hover:bg-white hover:text-amber-900 transition-all duration-300">
                            Book Appointment
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Begin Your Homeschooling Journey with Confidence and Support
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                        Dua Virtual School is a unique global learning community without borders, and we take great pride in warmly welcoming learners from a variety of African countries, Arabic countries, Europe and beyond. We believe in engaging students’ minds, skills, and hearts through a personalized, learner-centered approach that helps each student reach their full potential. Supported by a dedicated, continuously trained team and a diverse international community, our students thrive academically and socially. If you’re looking for an inspiring environment that prepares your child to become a confident, well-rounded, and future-ready leader, you’ve come to the right place.
                    </p>
                    <button className="bg-gradient-to-r from-amber-700 to-orange-600 text-white px-10 py-5 rounded-sm font-bold text-lg hover:from-amber-800 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-xl">
                        Learn More About Our Programs
                    </button>
                </div>
            </section>

            {/* About Us Section */}
            <section id="about-us" className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-gray-900 mb-4">About Us</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-amber-800 to-orange-600 mx-auto"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Mission',
                                content:
                                    "Our mission is to foster a caring and inclusive learning community that celebrates individuality, develops each learner's potential, and prepares students to lead purposeful, confident, and compassionate lives."
                            },
                            {
                                title: 'Vision',
                                content:
                                    'At Dua Virtual School, our vision is to redefine excellence in virtual education by inspiring students to think critically, act responsibly, and lead with purpose as engaged citizens of a global society.'
                            },
                            {
                                title: 'Core Values',
                                list: [
                                    'Integrity: We uphold honesty, accountability, and ethical behavior in all that we do, fostering trust and responsibility in our learning community.',
                                    'Excellence: We pursue excellence through curiosity, creativity, and a commitment to continuous improvement, empowering every student to achieve their fullest potential.',
                                    'Empathy: We cultivate compassion, respect, and understanding, encouraging students to value diversity and contribute positively to the global community.'
                                ]
                            }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="group relative bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-sm shadow-sm hover:shadow-2xl transition-all duration-500 border border-amber-100"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-700 to-orange-600 rounded-sm"></div>
                                <h3 className="text-2xl font-bold text-amber-900 mb-4">{item.title}</h3>
                                {item.list ? (
                                    <ul className="list-disc pl-5 text-gray-700 space-y-3">
                                        {item.list.map((point, i) => (
                                            <li key={i} className="leading-relaxed">{point}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-700 leading-relaxed">{item.content}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section id="courses" className="py-24 px-6 bg-gradient-to-br from-stone-100 to-amber-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-amber-800 to-orange-600 mx-auto mb-6"></div>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Experience excellence in education with our comprehensive approach</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: 'Globally Recognized Curriculum', desc: 'All our classes follow a globally recognized curriculum designed to meet international standards of education.' },
                            { title: 'Highly Qualified Teachers', desc: 'All our learning programs are delivered by fully qualified and experienced educators dedicated to student success.' },
                            { title: 'Supportive Community', desc: 'Through consistent communication and meaningful collaboration, we ensure parents are informed, supported, and engaged in every stage of their child’s education.' },
                            { title: 'Socialization', desc: 'We offer a rich combination of in-person and virtual activities that promote creativity, teamwork, and social growth through authentic, real-world experiences.' },
                            { title: 'Adherence To the Syllabus', desc: 'We strictly follow the established syllabus and course outlines to ensure comprehensive and consistent delivery of the curriculum.' },
                            { title: 'Convenience', desc: 'Learning is more accessible than ever with our convenient payment options. Also, our virtual school puts you in full control of your learning experience tailoring it to fit your needs and schedule.' }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-8 rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-amber-100">
                                <div className="w-12 h-12 bg-gradient-to-br from-amber-700 to-orange-600 rounded-sm mb-6 flex items-center justify-center text-white font-bold text-xl">
                                    {index + 1}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    {/* <p className="text-center mt-12 text-gray-500 text-xl">FEE STRUCTURE</p> */}
                </div>
            </section>

            {/* What We Offer */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-gray-900 mb-4">What We Offer</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-amber-800 to-orange-600 mx-auto"></div>
                    </div>

                    <Carousel>
                        {[
                            {
                                title: 'Primary, Secondary & A-Levels',
                                desc: 'We offer a full range of academic programs from primary through secondary education, through the British International Curriculum preparing students for university and beyond.',
                                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
                            },
                            {
                                title: 'Private Tuition Services',
                                desc: 'Our private tuition services provide personalized, one-on-one support to help students strengthen their understanding and excel in their studies.',
                                image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
                            },
                            {
                                title: 'Professional Language Classes',
                                desc: 'We deliver expert-led language classes designed to develop proficiency and confidence in a variety of languages for personal, academic, or professional growth.',
                                image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80'
                            }
                        ].map((item, index) => (
                            <div key={index} className="max-w-2xl mx-auto">
                                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-12 rounded-sm shadow-xl border border-amber-100">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-64 object-cover rounded-sm mb-8"
                                    />
                                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{item.title}</h3>
                                    <p className="text-gray-700 text-lg leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </section>

            {/* Premium Contact Section */}
            <section id="contact" className="py-32 px-6 bg-gradient-to-br from-amber-900 via-orange-800 to-yellow-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)'
                }}></div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Get In Touch</h2>
                        <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
                        <p className="text-xl text-amber-100 max-w-2xl mx-auto">Ready to start your educational journey? We're here to answer all your questions.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="bg-white p-8 rounded-sm border border-gray-300">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                                <div className="space-y-4 text-gray-800 text-base leading-relaxed">
                                    <p className="flex items-start">
                                        <Mail className="mr-3 h-5 w-5" />
                                        <span className="font-semibold">Email:</span>
                                        <span className="ml-2">info@duavirtualschool.com</span>
                                    </p>
                                    <p className="flex items-start">
                                        <Phone className="mr-3 h-5 w-5" />
                                        <span className="font-semibold">Phone:</span>
                                        <span className="ml-2">+254 712 345 678</span>
                                    </p>
                                    <p className="flex items-start">
                                        <Globe className="mr-3 h-5 w-5" />
                                        <span className="font-semibold">Location:</span>
                                        <span className="ml-2">Global Virtual Learning</span>
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-sm border border-gray-300">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Office Hours</h3>
                                <p className="text-gray-800 text-base leading-relaxed">Monday - Friday: 8:00 AM - 5:00 PM EAT</p>
                                <p className="text-gray-800 text-base leading-relaxed">Saturday: 9:00 AM - 2:00 PM EAT</p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white p-10 rounded-sm shadow-2xl">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full p-4 border-2 border-gray-200 rounded-sm focus:border-amber-700 focus:outline-none transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full p-4 border-2 border-gray-200 rounded-sm focus:border-amber-700 focus:outline-none transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+254 XXX XXX XXX"
                                        className="w-full p-4 border-2 border-gray-200 rounded-sm focus:border-amber-700 focus:outline-none transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Your Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about your needs..."
                                        className="w-full p-4 border-2 border-gray-200 rounded-sm focus:border-amber-700 focus:outline-none transition-colors h-32 resize-none"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-amber-700 to-orange-600 text-white py-4 rounded-sm font-bold text-lg hover:from-amber-800 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                                Dua Virtual School
                            </h3>
                            <p className="text-gray-400">Excellence in virtual education for global learners.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#home" className="hover:text-amber-400 transition-colors">Home</a></li>
                                <li><a href="#about-us" className="hover:text-amber-400 transition-colors">About Us</a></li>
                                <li><a href="#courses" className="hover:text-amber-400 transition-colors">Courses</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Programs</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>Primary, Secondary & A-Levels</li>
                                <li>Private Tuition Services</li>
                                <li>Professional Language Classes</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Connect</h4>
                            <p className="text-gray-400 mb-2">info@duavirtualschool.com</p>
                            <p className="text-gray-400">+254 712 345 678</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
                        <p>&copy; {new Date().getFullYear()} Dua Virtual School. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;