import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, Check, ArrowRight, ArrowLeft, Send, 
  Upload, Briefcase, 
  MessageCircle
} from 'lucide-react';
import { getSupabase } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type Step = 1 | 2 | 3 | 4;

interface FormState {
  bizName: string;
  ownerName: string;
  phone: string;
  email: string;
  industry: string;
  location: string;
  website: string;
  services: string[];
  currentMkt: string;
  budget: string;
  goals: string[];
  target: string;
  bizDesc: string;
  scale: number | null;
  extra: string;
  ghanaFront: File | null;
  ghanaBack: File | null;
  personalPic: File | null;
  logo: File | null;
}

const INDUSTRIES = [
  'Beauty & Health', 'Fashion & Clothing', 'Food & Beverage', 'Retail',
  'Construction & Real Estate', 'Events & Entertainment', 'Tech & Electronics',
  'Services', 'Photography & Creative', 'Accounting & Finance', 'Automotive & Transport',
  'Education & Training', 'Healthcare & Medical', 'Hospitality & Travel',
  'Legal & Law', 'Manufacturing', 'Media & Marketing', 'Non-Profit & NGO',
  'Real Estate', 'Fitness & Gym', 'Home & Cleaning Services', 'Logistics & Supply Chain',
  'Agriculture & Farming', 'E-commerce', 'Pet Care & Veterinary', 'Interior Design',
  'Consulting', 'Other'
];

const SERVICES = [
  { id: 'SMM', title: 'Social Media Management', desc: 'Content creation, posting & growth', icon: '📱' },
  { id: 'GBP', title: 'Google Business Profile', desc: 'Google Maps visibility & SEO', icon: '📍' },
  { id: 'WSF', title: 'WhatsApp Sales Funnel', desc: 'Automated sales & broadcast strategy', icon: '💬' },
  { id: 'WEB', title: 'Web Development', desc: 'Professional website or landing page', icon: '🌐' },
  { id: 'DM', title: 'Digital Marketing', desc: 'Ads, lead generation & campaigns', icon: '🎯' },
  { id: 'NS', title: 'Not Sure Yet', desc: 'I need NMG to advise me', icon: '🤔' },
];

const GOALS = [
  { id: 'SALES', label: '💰 Get more customers & increase sales' },
  { id: 'AWARE', label: '📣 Build brand awareness & recognition' },
  { id: 'MAPS', label: '📍 Get found on Google Maps locally' },
  { id: 'FOLLOW', label: '📱 Grow my social media following' },
  { id: 'AUTO', label: '⚙️ Automate sales & follow-up process' },
  { id: 'LAUNCH', label: '🚀 Launch a new product or service' },
];

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>({
    bizName: '', ownerName: '', phone: '', email: '',
    industry: '', location: '', website: '',
    services: [], currentMkt: '', budget: '',
    goals: [], target: '', bizDesc: '',
    scale: null, extra: '',
    ghanaFront: null, ghanaBack: null, personalPic: null, logo: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const validateStep = (s: Step) => {
    const errs: string[] = [];
    if (s === 1) {
      if (!form.bizName) errs.push('Business Name is required');
      if (!form.ownerName) errs.push('Full Name is required');
      if (!form.phone) errs.push('WhatsApp Number is required');
      if (!form.email || !form.email.includes('@')) errs.push('Valid Email is required');
      if (!form.industry) errs.push('Industry is required');
      if (!form.location) errs.push('Location is required');
      if (!form.website) errs.push('Platform link is required');
      if (!form.ghanaFront) errs.push('Ghana Card Front is required');
      if (!form.ghanaBack) errs.push('Ghana Card Back is required');
    }
    if (s === 2) {
      if (form.services.length === 0) errs.push('Select at least one service');
      if (!form.currentMkt) errs.push('Current situation is required');
      if (!form.budget) errs.push('Budget range is required');
    }
    if (s === 3) {
      if (form.goals.length === 0) errs.push('Select at least one goal');
      if (!form.target) errs.push('Target customer is required');
      if (!form.bizDesc) errs.push('Business description is required');
      if (form.scale === null) errs.push('Online presence rating is required');
      if (!form.personalPic) errs.push('Personal picture is required');
      if (!form.logo) errs.push('Logo or assets are required');
      if (!form.extra) errs.push('Additional notes are required (or write "None")');
    }
    setErrors(errs);
    return errs.length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((s) => (s + 1) as Step);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep((s) => (s - 1) as Step);
    window.scrollTo(0, 0);
  };

  const uploadFile = async (file: File, bucket: string) => {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase not configured');
    
    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);
      
    return publicUrl;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const supabase = getSupabase();
      if (!supabase) throw new Error('Supabase not configured');

      const [ghanaFrontUrl, ghanaBackUrl, personalPicUrl, logoUrl] = await Promise.all([
        form.ghanaFront ? uploadFile(form.ghanaFront, 'onboarding-assets') : Promise.resolve(''),
        form.ghanaBack ? uploadFile(form.ghanaBack, 'onboarding-assets') : Promise.resolve(''),
        form.personalPic ? uploadFile(form.personalPic, 'onboarding-assets') : Promise.resolve(''),
        form.logo ? uploadFile(form.logo, 'onboarding-assets') : Promise.resolve(''),
      ]);

      const { error } = await supabase
        .from('onboarding')
        .insert([{
          biz_name: form.bizName,
          owner_name: form.ownerName,
          phone: form.phone,
          email: form.email,
          industry: form.industry,
          location: form.location,
          website: form.website,
          services: form.services.join(', '),
          current_mkt: form.currentMkt,
          budget: form.budget,
          goals: form.goals.join(', '),
          target: form.target,
          biz_desc: form.bizDesc,
          presence_scale: `${form.scale}/10`,
          extra_notes: form.extra,
          ghana_front_url: ghanaFrontUrl,
          ghana_back_url: ghanaBackUrl,
          personal_pic_url: personalPicUrl,
          logo_url: logoUrl
        }]);

      if (error) {
        console.error('Supabase Insertion Error:', error);
        throw error;
      }
      
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Submission Error Details:', err);
      const msg = err.message || 'An unknown error occurred';
      alert('Submission failed: ' + msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    const waMsg = encodeURIComponent(
      `Hi NMG! I just completed my onboarding form.\n\n` +
      `Business: ${form.bizName}\nContact: ${form.ownerName}\n` +
      `Looking forward to working with you! 🚀`
    );
    return (
      <div className="min-h-screen bg-brand-white font-onboarding flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6 text-center pt-32">
          <div className="max-w-md bg-white border border-brand-border rounded-[24px] p-10 shadow-xl">
            <div className="text-5xl mb-6">🎉</div>
            <h2 className="font-display text-2xl font-bold mb-4">You're all set!</h2>
            <p className="text-brand-grey text-sm leading-relaxed mb-8">
              Thanks for completing your onboarding. We've received everything and will review your details before reaching out.
            </p>
            <a 
              href={`https://wa.me/233268786647?text=${waMsg}`}
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-display font-bold text-base hover:scale-105 transition-all shadow-lg shadow-green-500/20"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              Continue on WhatsApp
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F6F2] font-onboarding flex flex-col">
      <Navbar />
      <div className="flex-1 pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-end mb-8">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-grey uppercase tracking-widest bg-white border border-brand-border rounded-full px-4 py-1.5 shadow-sm">
              <Lock className="w-3 h-3" /> Secure Onboarding
            </div>
          </div>

          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    step === i ? 'text-brand-gold' : step > i ? 'text-brand-green' : 'text-brand-grey'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[9px] ${
                    step === i ? 'border-brand-gold bg-brand-gold/10' : step > i ? 'border-brand-green bg-brand-green text-white' : 'border-brand-border bg-white'
                  }`}>
                    {step > i ? '✓' : i}
                  </div>
                  <span className="hidden sm:inline">
                    {i === 1 ? 'Business' : i === 2 ? 'Services' : i === 3 ? 'Goals' : 'Confirm'}
                  </span>
                </div>
              ))}
            </div>
            <div className="h-1 bg-brand-border rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-brand-gold"
                initial={{ width: '25%' }}
                animate={{ width: `${step * 25}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <div className="bg-white border border-brand-border rounded-3xl shadow-xl overflow-hidden shadow-black/[0.03]">
            <div className="p-6 md:p-8 border-b border-brand-border bg-gradient-to-br from-[#FDF3E1] to-white">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold block mb-2">
                Step {step} of 4
              </span>
              <h2 className="font-display text-2xl font-bold mb-2">
                {step === 1 && "Tell us about your business"}
                {step === 2 && "What do you need help with?"}
                {step === 3 && "Goals, audience & assets"}
                {step === 4 && "Review your details"}
              </h2>
              <p className="text-brand-grey text-sm">
                {step === 1 && "Basic info so we understand who we're working with."}
                {step === 2 && "Select all services you're interested in."}
                {step === 3 && "Help us understand your customers."}
                {step === 4 && "Everything look right? Submit and we'll reach out."}
              </p>
            </div>

            <div className="p-6 md:p-8">
              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
                  <p className="text-red-700 font-bold text-xs mb-2 flex items-center gap-2">
                    <span className="text-lg">⚠️</span> Please complete:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 list-disc list-inside text-red-600 text-[11px] font-medium">
                    {errors.map((e, i) => <li key={i}>{e}</li>)}
                  </ul>
                </div>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-brand-grey uppercase tracking-wider">Business Name *</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Byi Cosmetics GH"
                            className="w-full bg-[#F7F6F2] border-2 border-brand-border rounded-xl px-4 py-3 text-sm focus:border-brand-gold focus:bg-white outline-none transition-all"
                            value={form.bizName}
                            onChange={(e) => setForm({ ...form, bizName: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-brand-grey uppercase tracking-wider">Your Full Name *</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Ama Mensah"
                            className="w-full bg-[#F7F6F2] border-2 border-brand-border rounded-xl px-4 py-3 text-sm focus:border-brand-gold focus:bg-white outline-none transition-all"
                            value={form.ownerName}
                            onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-brand-grey uppercase tracking-wider">Ghana Card (Front) *</label>
                          <label className={`block border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${form.ghanaFront ? 'border-brand-green bg-brand-green/5' : 'border-brand-border bg-[#F7F6F2] hover:border-brand-gold'}`}>
                            <input 
                              type="file" className="hidden" accept="image/*"
                              onChange={(e) => setForm({ ...form, ghanaFront: e.target.files?.[0] || null })}
                            />
                            {form.ghanaFront ? (
                              <span className="text-brand-green text-xs font-bold flex items-center justify-center gap-2">
                                <Check className="w-4 h-4" /> {form.ghanaFront.name}
                              </span>
                            ) : (
                              <div className="space-y-2">
                                <div className="text-2xl opacity-50">🪪</div>
                                <span className="text-[10px] font-bold text-brand-grey">Upload Front Side</span>
                              </div>
                            )}
                          </label>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-brand-grey uppercase tracking-wider">Ghana Card (Back) *</label>
                          <label className={`block border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${form.ghanaBack ? 'border-brand-green bg-brand-green/5' : 'border-brand-border bg-[#F7F6F2] hover:border-brand-gold'}`}>
                            <input 
                              type="file" className="hidden" accept="image/*"
                              onChange={(e) => setForm({ ...form, ghanaBack: e.target.files?.[0] || null })}
                            />
                            {form.ghanaBack ? (
                              <span className="text-brand-green text-xs font-bold flex items-center justify-center gap-2">
                                <Check className="w-4 h-4" /> {form.ghanaBack.name}
                              </span>
                            ) : (
                              <div className="space-y-2">
                                <div className="text-2xl opacity-50">🪪</div>
                                <span className="text-[10px] font-bold text-brand-grey">Upload Back Side</span>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-brand-grey uppercase tracking-wider">WhatsApp Number *</label>
                          <input 
                            type="tel" 
                            placeholder="e.g. 0241234567"
                            className="w-full bg-[#F7F6F2] border-2 border-brand-border rounded-xl px-4 py-3 text-sm focus:border-brand-gold focus:bg-white outline-none transition-all"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-brand-grey uppercase tracking-wider">Email Address *</label>
                          <input 
                            type="email" 
                            placeholder="e.g. hello@yourbrand.com"
                            className="w-full bg-[#F7F6F2] border-2 border-brand-border rounded-xl px-4 py-3 text-sm focus:border-brand-gold focus:bg-white outline-none transition-all"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-brand-grey uppercase tracking-wider">Industry *</label>
                        <select 
                          className="w-full bg-[#F7F6F2] border-2 border-brand-border rounded-xl px-4 py-3 text-sm focus:border-brand-gold focus:bg-white outline-none transition-all appearance-none"
                          value={form.industry}
                          onChange={(e) => setForm({ ...form, industry: e.target.value })}
                        >
                          <option value="">— Select your industry —</option>
                          {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-brand-grey uppercase tracking-wider">Business Location *</label>
                        <input 
                          type="text" 
                          placeholder="e.g. East Legon, Accra"
                          className="w-full bg-[#F7F6F2] border-2 border-brand-border rounded-xl px-4 py-3 text-sm focus:border-brand-gold focus:bg-white outline-none transition-all"
                          value={form.location}
                          onChange={(e) => setForm({ ...form, location: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-brand-grey uppercase tracking-wider">Most Active Online Page *</label>
                        <input 
                          type="text" 
                          placeholder="e.g. https://instagram.com/yourbrand"
                          className="w-full bg-[#F7F6F2] border-2 border-brand-border rounded-xl px-4 py-3 text-sm focus:border-brand-gold focus:bg-white outline-none transition-all"
                          value={form.website}
                          onChange={(e) => setForm({ ...form, website: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-brand-grey uppercase tracking-wider">Services Needed *</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {SERVICES.map((s) => (
                            <div 
                              key={s.id}
                              onClick={() => {
                                const news = form.services.includes(s.title) 
                                  ? form.services.filter(x => x !== s.title) 
                                  : [...form.services, s.title];
                                setForm({ ...form, services: news });
                              }}
                              className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                                form.services.includes(s.title) 
                                  ? 'border-brand-gold bg-brand-gold/[0.05]' 
                                  : 'border-brand-border bg-[#F7F6F2] hover:bg-brand-gold/5'
                              }`}
                            >
                              <span className="text-2xl">{s.icon}</span>
                              <div className="flex-1">
                                <p className="text-[13px] font-bold">{s.title}</p>
                                <p className="text-[10px] text-brand-grey font-medium">{s.desc}</p>
                              </div>
                              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                form.services.includes(s.title) ? 'bg-brand-gold border-brand-gold' : 'border-brand-border bg-white'
                              }`}>
                                {form.services.includes(s.title) && <Check className="w-3 h-3 text-white" />}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-brand-grey uppercase tracking-wider">Current Market Situation *</label>
                        <select 
                          className="w-full bg-[#F7F6F2] border-2 border-brand-border rounded-xl px-4 py-3 text-sm focus:border-brand-gold focus:bg-white outline-none transition-all appearance-none"
                          value={form.currentMkt}
                          onChange={(e) => setForm({ ...form, currentMkt: e.target.value })}
                        >
                          <option value="">— What's your situation right now? —</option>
                          <option>I have no online presence yet</option>
                          <option>I have social media but it's inactive</option>
                          <option>I'm active online but not getting results</option>
                          <option>I've worked with a marketer before</option>
                          <option>I'm doing well but want to scale</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-brand-grey uppercase tracking-wider">Monthly Budget Range *</label>
                        <select 
                          className="w-full bg-[#F7F6F2] border-2 border-brand-border rounded-xl px-4 py-3 text-sm focus:border-brand-gold focus:bg-white outline-none transition-all appearance-none"
                          value={form.budget}
                          onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        >
                          <option value="">— Select a range —</option>
                          <option>Under GHS 1,000/month</option>
                          <option>GHS 1,000 – 2,500/month</option>
                          <option>GHS 2,500 – 5,000/month</option>
                          <option>GHS 5,000+/month</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-brand-grey uppercase tracking-wider">Business Goals *</label>
                        <div className="space-y-2">
                          {GOALS.map((g) => (
                            <div 
                              key={g.id}
                              onClick={() => {
                                const news = form.goals.includes(g.label) 
                                  ? form.goals.filter(x => x !== g.label) 
                                  : [...form.goals, g.label];
                                setForm({ ...form, goals: news });
                              }}
                              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                form.goals.includes(g.label) 
                                  ? 'border-brand-gold bg-brand-gold/[0.05]' 
                                  : 'border-brand-border bg-[#F7F6F2] hover:bg-brand-gold/5'
                              }`}
                            >
                              <span className="text-sm font-medium flex-1">{g.label}</span>
                              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                form.goals.includes(g.label) ? 'bg-brand-gold border-brand-gold' : 'border-brand-border bg-white'
                              }`}>
                                {form.goals.includes(g.label) && <Check className="w-3 h-3 text-white" />}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-brand-grey uppercase tracking-wider">Target Customer *</label>
                        <textarea 
                          className="w-full bg-[#F7F6F2] border-2 border-brand-border rounded-xl px-4 py-3 text-sm focus:border-brand-gold focus:bg-white outline-none min-h-[100px] transition-all"
                          placeholder="Age, location, interests..."
                          value={form.target}
                          onChange={(e) => setForm({ ...form, target: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-brand-grey uppercase tracking-wider">Describe your business *</label>
                        <textarea 
                          className="w-full bg-[#F7F6F2] border-2 border-brand-border rounded-xl px-4 py-3 text-sm focus:border-brand-gold focus:bg-white outline-none min-h-[100px] transition-all"
                          placeholder="What do you sell? What makes you unique?"
                          value={form.bizDesc}
                          onChange={(e) => setForm({ ...form, bizDesc: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-brand-grey uppercase tracking-wider">Current Online Presence Rate *</label>
                        <div className="flex flex-wrap gap-2">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(v => (
                            <button 
                              key={v}
                              onClick={() => setForm({ ...form, scale: v })}
                              className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${
                                form.scale === v ? 'bg-brand-gold text-white shadow-lg' : 'bg-[#F7F6F2] text-brand-grey border border-brand-border hover:border-brand-gold'
                              }`}
                            >
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-brand-grey uppercase tracking-wider">Personal Picture (HD) *</label>
                        <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${form.personalPic ? 'border-brand-green bg-brand-green/5' : 'border-brand-border bg-[#F7F6F2] hover:border-brand-gold'}`}>
                          <input 
                            type="file" className="hidden" accept="image/*"
                            onChange={(e) => setForm({ ...form, personalPic: e.target.files?.[0] || null })}
                          />
                          {form.personalPic ? (
                            <div className="text-brand-green font-bold text-sm flex items-center gap-2">
                              <Check className="w-5 h-5" /> {form.personalPic.name}
                            </div>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 text-brand-grey mb-2" />
                              <span className="text-[11px] font-bold text-brand-grey">Upload HD Photo</span>
                            </>
                          )}
                        </label>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-brand-grey uppercase tracking-wider">Logo / Brand Assets *</label>
                        <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${form.logo ? 'border-brand-green bg-brand-green/5' : 'border-brand-border bg-[#F7F6F2] hover:border-brand-gold'}`}>
                          <input 
                            type="file" className="hidden" accept="image/*,.pdf,.zip"
                            onChange={(e) => setForm({ ...form, logo: e.target.files?.[0] || null })}
                          />
                          {form.logo ? (
                            <div className="text-brand-green font-bold text-sm flex items-center gap-2">
                              <Check className="w-5 h-5" /> {form.logo.name}
                            </div>
                          ) : (
                            <>
                              <Briefcase className="w-8 h-8 text-brand-grey mb-2" />
                              <span className="text-[11px] font-bold text-brand-grey">Upload Assets (PNG, ZIP, etc)</span>
                            </>
                          )}
                        </label>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-brand-grey uppercase tracking-wider">Anything else for NMG? *</label>
                        <textarea 
                          className="w-full bg-[#F7F6F2] border-2 border-brand-border rounded-xl px-4 py-3 text-sm focus:border-brand-gold focus:bg-white outline-none min-h-[100px] transition-all"
                          placeholder="Past experiences, deadlines, questions..."
                          value={form.extra}
                          onChange={(e) => setForm({ ...form, extra: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-4">
                      {[
                        { l: 'Business', v: form.bizName },
                        { l: 'Owner', v: form.ownerName },
                        { l: 'WhatsApp', v: form.phone },
                        { l: 'Email', v: form.email },
                        { l: 'Industry', v: form.industry },
                        { l: 'Location', v: form.location },
                        { l: 'Website', v: form.website },
                        { l: 'Services', v: form.services.join(', ') },
                        { l: 'Situation', v: form.currentMkt },
                        { l: 'Budget', v: form.budget },
                        { l: 'Goals', v: form.goals.join(', ') },
                        { l: 'Presence', v: `${form.scale}/10` },
                        { l: 'Assets', v: `${form.ghanaFront ? '✓ Ghana Card Front ' : ''}${form.ghanaBack ? '✓ Ghana Card Back ' : ''}${form.personalPic ? '✓ Personal Photo ' : ''}${form.logo ? '✓ Logo' : ''}` },
                      ].map((item, i) => (
                        <div key={i} className="flex border-b border-brand-border pb-2">
                          <span className="w-24 text-[10px] font-bold text-brand-grey uppercase">{item.l}</span>
                          <span className="flex-1 text-[13px] font-medium text-brand-black">{item.v || '—'}</span>
                        </div>
                      ))}

                      <div className="mt-8 pt-8 border-t border-brand-border">
                        <h3 className="text-[10px] font-bold text-brand-black uppercase tracking-widest mb-3">Data Privacy Notice</h3>
                        <div className="bg-[#F7F6F2] rounded-xl p-5 text-[11px] text-brand-grey leading-relaxed space-y-3">
                          <p className="font-bold text-brand-black">Disclosing your personal information.</p>
                          <p>We do not share or disclosure any of your personal information without your consent.</p>
                          <p>We may disclose your information to third parties if we are under a duty to disclose or share your personal data in order to comply with any legal obligation, or in order to enforce or apply our contracts with you; or to protect our rights, or our safety and/or the safety of our community & others.</p>
                          <p>We will share your information with relevant government agencies where it is necessary or we have a legal obligation to do so.</p>
                          <p>We do not sell your information to anyone.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 pt-8 border-t border-brand-border flex items-center justify-between">
                {step > 1 ? (
                  <button 
                    onClick={prevStep}
                    className="flex items-center gap-2 text-xs font-bold text-brand-grey hover:text-brand-black transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                ) : <div />}

                {step < 4 ? (
                  <button 
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-brand-gold text-white px-8 py-3 rounded-full font-display font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-brand-gold/20"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button 
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="flex items-center gap-2 bg-brand-black text-white px-8 py-3 rounded-full font-display font-bold text-sm hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Uploading..." : "✓ Submit Onboarding"} <Send className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
