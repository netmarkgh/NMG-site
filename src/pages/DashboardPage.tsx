import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, Users, FileText, Search, 
  ExternalLink, Eye, LogOut, Shield,
  Filter, Calendar, ChevronRight, X,
  Download, Image as ImageIcon, Briefcase, MessageCircle
} from 'lucide-react';
import { getSupabase } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Submission {
  id: string;
  created_at: string;
  biz_name: string;
  owner_name: string;
  phone: string;
  email: string;
  industry: string;
  location: string;
  website: string;
  services: string;
  current_mkt: string;
  budget: string;
  goals: string;
  target: string;
  biz_desc: string;
  presence_scale: string;
  extra_notes: string;
  ghana_front_url: string;
  ghana_back_url: string;
  personal_pic_url: string;
  logo_url: string;
}

export default function DashboardPage() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [search, setSearch] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'stats'>('list');

  const supabase = getSupabase();

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }: any) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session: any) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (session) {
      fetchSubmissions();
    }
  }, [session]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!supabase) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    setLoading(false);
  };

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  };

  const fetchSubmissions = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('onboarding')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching submissions:', error);
    } else {
      setSubmissions(data || []);
    }
    setLoading(false);
  };

  const filteredSubmissions = submissions.filter(s => {
    const biz = s.biz_name?.toLowerCase() || '';
    const owner = s.owner_name?.toLowerCase() || '';
    const emailStr = s.email?.toLowerCase() || '';
    const query = search.toLowerCase();
    
    return biz.includes(query) || owner.includes(query) || emailStr.includes(query);
  });

  useEffect(() => {
    console.log('Dashboard mounted, session status:', !!session);
  }, [session]);

  if (!supabase) {
    return (
      <div className="min-h-screen bg-brand-white flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-brand-black font-bold">Supabase Configuration Missing</p>
          <p className="text-brand-grey text-sm">Please check your environment variables.</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-brand-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6 pt-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white border border-brand-border rounded-3xl p-8 shadow-xl"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-brand-black/5 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-brand-gold" />
              </div>
            </div>
            <h2 className="font-display text-2xl font-bold text-center mb-2">Admin Dashboard</h2>
            <p className="text-brand-grey text-sm text-center mb-8">Please login to manage submissions</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-brand-grey uppercase tracking-widest block mb-2 px-1">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F7F6F2] border-2 border-brand-border rounded-xl px-4 py-3 text-sm focus:border-brand-gold focus:bg-white outline-none transition-all"
                  placeholder="admin@netmarketinggh.com"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-brand-grey uppercase tracking-widest block mb-2 px-1">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F7F6F2] border-2 border-brand-border rounded-xl px-4 py-3 text-sm focus:border-brand-gold focus:bg-white outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-brand-black text-white py-4 rounded-xl font-display font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Access Dashboard'}
              </button>
            </form>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      <Navbar />
      
      <div className="flex-1 pt-24 px-4 md:px-10 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 mt-6">
            <div>
              <h1 className="font-display text-3xl font-bold text-brand-black mb-2">Onboarding Management</h1>
              <div className="flex items-center gap-4 text-xs font-medium text-brand-grey">
                <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> {submissions.length} Total Submissions</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-border"></span>
                <span className="flex items-center gap-1.5 text-brand-green">● Active Session</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={fetchSubmissions}
                className="p-3 bg-white border border-brand-border rounded-xl hover:bg-brand-black/5 transition-colors"
                title="Refresh Data"
              >
                <Calendar className="w-5 h-5 text-brand-black" />
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-3 bg-white border border-brand-border rounded-xl text-brand-black font-bold text-xs hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all shadow-sm"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { label: 'Total Leads', val: submissions.length, icon: Users, color: 'brand-black' },
              { label: 'This Month', val: submissions.filter(s => new Date(s.created_at).getMonth() === new Date().getMonth()).length, icon: BarChart3, color: 'brand-gold' },
              { label: 'Conversion Rate', val: '84%', icon: Shield, color: 'brand-green' }
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-brand-border p-6 rounded-3xl shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-brand-grey uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl font-display font-bold text-brand-black">{stat.val}</p>
                </div>
                <div className={`w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-brand-black`} />
                </div>
              </div>
            ))}
          </div>

          {/* Main List */}
          <div className="bg-white border border-brand-border rounded-[32px] overflow-hidden shadow-sm shadow-black/[0.02]">
            <div className="p-6 border-b border-brand-border flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-grey" />
                <input 
                  type="text" 
                  placeholder="Search by business, owner or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#F7F6F2] border border-brand-border rounded-full pl-11 pr-4 py-3 text-sm focus:bg-white focus:ring-4 focus:ring-brand-gold/5 outline-none transition-all"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-brand-grey border border-brand-border rounded-full hover:bg-brand-black/5 transition-colors">
                  <Filter className="w-3.5 h-3.5" /> Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-4">
                  <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs font-bold text-brand-grey uppercase tracking-widest">Updating data pool...</p>
                </div>
              ) : filteredSubmissions.length === 0 ? (
                <div className="py-20 text-center">
                  <div className="text-4xl mb-4">📭</div>
                  <p className="text-sm text-brand-grey">No submissions found matching your search.</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#F7F6F2] text-left border-b border-brand-border">
                      <th className="px-6 py-4 text-[10px] font-bold text-brand-grey uppercase tracking-widest w-64">Business</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-brand-grey uppercase tracking-widest">Industry</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-brand-grey uppercase tracking-widest">Budget</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-brand-grey uppercase tracking-widest">Date</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-brand-grey uppercase tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border">
                    {filteredSubmissions.map((s) => (
                      <tr key={s.id} className="hover:bg-[#F7F6F2]/50 transition-colors group">
                        <td className="px-6 py-5">
                          <div>
                            <p className="text-sm font-bold text-brand-black group-hover:text-brand-gold transition-colors">{s.biz_name}</p>
                            <p className="text-[11px] text-brand-grey truncate max-w-[200px]">{s.owner_name}</p>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="inline-block px-2.5 py-1 bg-brand-black/5 rounded-md text-[10px] font-bold text-brand-black">
                            {s.industry}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-[11px] font-medium text-brand-grey">{s.budget}</span>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-[11px] font-medium text-brand-grey">
                            {new Date(s.created_at).toLocaleDateString('en-GH', { 
                              day: '2-digit', month: 'short', year: 'numeric' 
                            })}
                          </p>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button 
                            onClick={() => setSelectedSubmission(s)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-black text-white rounded-full text-[10px] font-bold hover:scale-105 transition-all active:scale-95"
                          >
                            <Eye className="w-3 h-3" /> View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            
            <div className="p-6 border-t border-brand-border bg-[#F7F6F2]/30 flex items-center justify-between">
              <p className="text-[10px] font-bold text-brand-grey uppercase tracking-widest">
                Showing {filteredSubmissions.length} of {submissions.length} leads
              </p>
              <div className="flex gap-2">
                <button className="p-2 border border-brand-border rounded-lg bg-white disabled:opacity-30" disabled>
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                <button className="p-2 border border-brand-border rounded-lg bg-white disabled:opacity-30" disabled>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedSubmission && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSubmission(null)}
              className="absolute inset-0 bg-brand-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-brand-border flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#F7F6F2] rounded-2xl flex items-center justify-center text-2xl">
                    🏢
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-brand-black">{selectedSubmission.biz_name}</h3>
                    <p className="text-xs font-bold text-brand-gold uppercase tracking-widest">Submission Ref: #{String(selectedSubmission.id || '').slice(0, 8)}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedSubmission(null)}
                  className="w-10 h-10 border border-brand-border rounded-full flex items-center justify-center hover:bg-brand-black/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 bg-[#F7F6F2]/30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Info Column */}
                  <div className="md:col-span-2 space-y-8">
                    <section className="bg-white border border-brand-border rounded-[24px] overflow-hidden">
                      <div className="px-6 py-4 border-b border-brand-border bg-[#F7F6F2]/50 flex items-center gap-2">
                        <Users className="w-4 h-4 text-brand-black" />
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-black">Client Information</h4>
                      </div>
                      <div className="p-6 grid grid-cols-2 gap-x-8 gap-y-6">
                        <div>
                          <p className="text-[10px] font-bold text-brand-grey uppercase tracking-widest mb-1.5">Full Name</p>
                          <p className="text-sm font-medium">{selectedSubmission.owner_name}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-brand-grey uppercase tracking-widest mb-1.5">WhatsApp</p>
                          <a href={`https://wa.me/${selectedSubmission.phone}`} className="text-sm font-bold text-brand-green flex items-center gap-1.5 hover:underline decoration-brand-green underline-offset-4">
                            {selectedSubmission.phone} <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-brand-grey uppercase tracking-widest mb-1.5">Email</p>
                          <p className="text-sm font-medium">{selectedSubmission.email}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-brand-grey uppercase tracking-widest mb-1.5">Location</p>
                          <p className="text-sm font-medium">{selectedSubmission.location}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-[10px] font-bold text-brand-grey uppercase tracking-widest mb-1.5">Website/Profile</p>
                          <a href={selectedSubmission.website} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-brand-gold flex items-center gap-1.5 break-all hover:underline decoration-brand-gold underline-offset-4">
                            {selectedSubmission.website} <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </section>

                    <section className="bg-white border border-brand-border rounded-[24px] overflow-hidden">
                      <div className="px-6 py-4 border-b border-brand-border bg-[#F7F6F2]/50 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-brand-black" />
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-black">Project Requirements</h4>
                      </div>
                      <div className="p-6 space-y-6">
                        <div>
                          <p className="text-[10px] font-bold text-brand-grey uppercase tracking-widest mb-2">Services Requested</p>
                          <div className="flex flex-wrap gap-2">
                            {(selectedSubmission.services || '').split(', ').map((s, i) => (
                              s && <span key={i} className="px-3 py-1.5 bg-brand-gold/10 text-brand-gold text-[11px] font-bold rounded-lg border border-brand-gold/10">{s}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-brand-grey uppercase tracking-widest mb-2">Budget Allocation</p>
                          <p className="inline-block px-4 py-2 bg-brand-green/10 text-brand-green text-sm font-bold rounded-xl border border-brand-green/10">
                            {selectedSubmission.budget}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[10px] font-bold text-brand-grey uppercase tracking-widest mb-1.5">Market Situation</p>
                            <p className="text-sm font-medium leading-relaxed">{selectedSubmission.current_mkt}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-brand-grey uppercase tracking-widest mb-1.5">Online Presence</p>
                            <div className="flex items-center gap-3">
                              <span className="text-lg font-bold text-brand-black">{selectedSubmission.presence_scale}</span>
                              <div className="flex-1 h-2 bg-brand-border rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-brand-black" 
                                  style={{ width: `${parseInt(selectedSubmission.presence_scale) * 10}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-brand-grey uppercase tracking-widest mb-1.5">Business Goals</p>
                          <p className="text-sm font-medium leading-relaxed italic border-l-4 border-brand-gold pl-4 bg-[#F7F6F2]/50 py-3 rounded-r-xl">
                            {selectedSubmission.goals}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-brand-grey uppercase tracking-widest mb-1.5">Business Description</p>
                          <p className="text-sm font-medium leading-relaxed text-brand-grey">{selectedSubmission.biz_desc}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-brand-grey uppercase tracking-widest mb-1.5">Target Audience</p>
                          <p className="text-sm font-medium leading-relaxed text-brand-grey">{selectedSubmission.target}</p>
                        </div>
                      </div>
                    </section>
                  </div>

                  {/* Assets Column */}
                  <div className="space-y-6">
                    <div className="bg-brand-black rounded-[32px] p-6 text-white text-center shadow-lg shadow-black/20">
                      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Download className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-display text-lg font-bold mb-1">Brand Assets</h4>
                      <p className="text-[11px] text-white/50 uppercase tracking-widest mb-6">Uploaded Documents</p>
                      
                      <div className="space-y-3">
                        {[
                          { label: 'Owner Photo', url: selectedSubmission.personal_pic_url, icon: ImageIcon },
                          { label: 'Brand Logo', url: selectedSubmission.logo_url, icon: Shield },
                          { label: 'Ghana Card Front', url: selectedSubmission.ghana_front_url, icon: FileText },
                          { label: 'Ghana Card Back', url: selectedSubmission.ghana_back_url, icon: FileText },
                        ].map((asset, i) => (
                          <a 
                            key={i}
                            href={asset.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <asset.icon className="w-4 h-4 text-white/40 group-hover:text-brand-gold transition-colors" />
                              <span className="text-[11px] font-bold">{asset.label}</span>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white border border-brand-border rounded-[24px] p-6">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-grey mb-4">Quick Preview</h4>
                      <div className="grid grid-cols-1 gap-4">
                        {selectedSubmission.personal_pic_url && (
                          <div className="aspect-square bg-[#F7F6F2] rounded-xl overflow-hidden border border-brand-border">
                            <img 
                              src={selectedSubmission.personal_pic_url} 
                              alt="Profile" 
                              className="w-full h-full object-cover"
                              onError={(e) => (e.currentTarget.style.display = 'none')}
                            />
                          </div>
                        )}
                        <div className="aspect-video bg-[#F7F6F2] rounded-xl overflow-hidden border border-brand-border relative">
                          <img 
                            src={selectedSubmission.logo_url} 
                            alt="Logo Assets" 
                            className="w-full h-full object-contain p-4"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-100 rounded-[24px] p-6">
                      <p className="text-[10px] font-bold text-amber-900 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <MessageCircle className="w-3 h-3" /> Additional Notes
                      </p>
                      <p className="text-xs text-amber-800 leading-relaxed italic">
                        "{selectedSubmission.extra_notes || 'No extra notes provided.'}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-brand-border flex items-center justify-between">
                <button 
                  onClick={() => setSelectedSubmission(null)}
                  className="px-8 py-3 text-sm font-bold text-brand-grey hover:text-brand-black transition-colors"
                >
                  Close Window
                </button>
                <a 
                  href={`mailto:${selectedSubmission.email}`}
                  className="px-10 py-4 bg-brand-black text-white rounded-full font-display font-bold text-sm hover:scale-105 transition-all shadow-lg"
                >
                  Reply to Lead
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
}
