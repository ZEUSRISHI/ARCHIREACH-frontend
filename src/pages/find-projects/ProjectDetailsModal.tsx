import { useState, useEffect } from 'react';
import { X, Download, Heart, Share2, CheckCircle, Star, Calendar, DollarSign, MapPin, Clock, Users, FileText, Building2, Award, ArrowRight, User, Mail, MessageSquare, Send } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Project } from './ProjectCard';

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (data: { name: string; email: string; message: string }) => void;
}
import { useAuth } from '../../hooks/useAuth';

export function ProjectDetailsModal({ project, isOpen, onClose, onApply }: ProjectDetailsModalProps) {
  const { user } = useAuth();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user && isOpen) {
      const typedUser = user as any;
      setFormData({
        name: typedUser.fullName || '',
        email: typedUser.email || '',
        message: `Hello, I'm interested in applying for your project: ${project?.title || 'this project'}. Is firm visiting required to reach out to you?`
      });
    }
  }, [user, isOpen, project]);

  const targetTitles = new Set([
    '3BHK Apartment Extension – Andheri',
    'Commercial Office Space Design',
    'Sustainable Housing Complex',
    'Luxury Villa Design',
    'Heritage Building Restoration',
    'Smart Home Office Design',
  ]);

  const targetBudgets = new Set([
    '₹50L - ₹80L',
    '₹8L - ₹12L',
    '₹2Cr - ₹5Cr',
    '₹30L - ₹50L',
    '₹15L - ₹25L',
    '₹80L - ₹1.2Cr',
  ]);

  if (!project) return null;

  const themeColor = 'rgb(122,107,235)'; // your theme color

  const isTargetTitle = targetTitles.has(project.title);
  const isTargetBudget = targetBudgets.has(project.budget);

  const handleApply = () => setShowApplicationForm(true);
  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(formData);
    setShowApplicationForm(false);
    onClose();
  };
  const toggleSave = () => setIsSaved(!isSaved);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="w-[94vw] max-w-[calc(100%-2rem)] sm:!max-w-2xl lg:!max-w-3xl xl:!max-w-4xl h-[92vh] overflow-hidden p-0 bg-white rounded-2xl shadow-2xl">
        <DialogTitle className="sr-only">
          {project.title}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {showApplicationForm ? `Submit your application for ${project.title}` : `View project details and requirements for ${project.title}`}
        </DialogDescription>

        <div className="h-full overflow-y-auto">
          {!showApplicationForm ? (
            <div className="relative flex flex-col">
              <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleSave}
                  className={`h-10 w-12 rounded-xl bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 ${isSaved ? 'text-red-300' : 'text-white'}`}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-12 rounded-xl bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 text-white"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </DialogClose>
              </div>
              {/* Header with Theme Gradient */}
              <div className="bg-[rgba(122,107,235,0.78)] text-gray-800 px-6 py-7 rounded-t-2xl">
                <div className="max-w-[520px] mx-auto">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          {project.projectType.map((type, idx) => (
                            <Badge key={idx} className="bg-white/20 text-gray-800 border-white/30 backdrop-blur-sm font-bold px-3 py-1">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <h2
                        className={`${isTargetTitle ? 'text-[20px] font-semibold' : 'text-3xl sm:text-4xl font-extrabold'} mb-4 tracking-tight leading-tight`}
                        style={isTargetTitle ? { fontFamily: "'Public Sans', sans-serif" } : undefined}
                      >
                        {project.title}
                      </h2>
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                          <Building2 className="w-5 h-5" />
                          <span className="font-bold text-base text-gray-800">{project.clientName}</span>
                          {project.clientVerified && (
                            <CheckCircle className="w-5 h-5 text-green-300" />
                          )}
                        </div>
                        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                          <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                          <span className="font-bold text-base text-gray-800">{project.clientRating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats Cards */}
                  <div className="w-full grid grid-cols-2 gap-3 mt-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-green-300" />
                        <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-wide">Budget</p>
                      </div>
                      <p
                        className={`${isTargetBudget ? 'text-[20px] font-semibold' : 'text-base font-extrabold'} text-gray-800 leading-tight break-words`}
                        style={isTargetBudget ? { fontFamily: "'Public Sans', sans-serif" } : undefined}
                      >
                        {project.budget}
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-blue-300" />
                        <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-wide">Location</p>
                      </div>
                      <p className="text-sm font-extrabold text-gray-800 truncate">{project.location}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-orange-300" />
                        <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-wide">Deadline</p>
                      </div>
                      <p className="text-sm font-extrabold text-gray-800 leading-tight break-words">{project.deadline}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4" style={{ color: themeColor }} />
                        <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-wide">Proposals</p>
                      </div>
                      <p className="text-base font-extrabold text-gray-800 leading-tight">{project.proposalCount}</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Project Description */}
              <div className="px-6 py-7 min-w-0 bg-white border-t border-black/10">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-200 shadow-sm min-w-0 max-w-[520px] mx-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-6 h-6" style={{ color: themeColor }} />
                    <h3 className="text-2xl text-gray-900">Project Description</h3>
                  </div>
                  <p className="text-base text-black leading-relaxed font-semibold mb-4">
                    {project.description}
                  </p>
                  <div className="bg-purple-50 rounded-lg p-4 border-l-4" style={{ borderColor: themeColor }}>
                    <p className="text-sm text-black leading-relaxed font-semibold">
                      We are seeking an experienced architect to design a modern 3BHK apartment extension.
                      The project includes complete interior redesign, space optimization, and contemporary aesthetic integration.
                    </p>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className="px-6 py-7 min-w-0 bg-white border-t border-black/10">
                <div className="bg-white rounded-2xl p-5 border-2 border-gray-200 shadow-md min-w-0 max-w-[520px] mx-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-6 h-6" style={{ color: themeColor }} />
                    <h3 className="text-xl font-extrabold text-gray-900">Requirements</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      'COA-verified architect with 5+ years experience',
                      'Portfolio with similar residential projects',
                      'Knowledge of local building codes and regulations',
                      'Ability to provide 3D visualizations',
                      'Available for site visits in Mumbai'
                    ].map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'green' }} />
                        <span className="text-sm text-gray-700 font-semibold leading-relaxed">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Deliverables */}
              <div className="px-6 py-7 min-w-0 bg-white border-t border-black/10 rounded-b-2xl">
                <div className="bg-white rounded-2xl p-5 border-2 border-gray-200 shadow-md min-w-0 max-w-[520px] mx-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-6 h-6" style={{ color: themeColor }} />
                    <h3 className="text-xl font-extrabold text-gray-900">Deliverables</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      'Detailed architectural drawings',
                      '3D renderings and walkthroughs',
                      'Material specifications',
                      'Project timeline and milestones',
                      'Cost estimation and breakdown'
                    ].map((del, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: themeColor }} />
                        <span className="text-sm text-gray-700 font-semibold leading-relaxed">{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA Section */}
              <div className="px-6 py-7 bg-white border-t border-black/10">
                <div className="max-w-[520px] mx-auto">
                  <Button
                    onClick={handleApply}
                    className="w-full bg-[#7A6BEB] hover:bg-[#6B5DD8] text-white font-semibold py-4 rounded-xl transition-colors text-lg shadow-lg"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Project Application</h2>
                  <p className="text-gray-500">Apply for: <span className="font-semibold text-[#7A6BEB]">{project.title}</span></p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowApplicationForm(false)}
                  className="rounded-full hover:bg-gray-100"
                >
                  <ArrowRight className="w-6 h-6 rotate-180" />
                </Button>
              </div>

              <form onSubmit={handleSubmitApplication} className="space-y-6 flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-[#7A6BEB]" />
                      Full Name
                    </Label>
                    <input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#7A6BEB] focus:ring-4 focus:ring-[#7A6BEB]/10 outline-none transition-all bg-gray-50/50"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#7A6BEB]" />
                      Email Address
                    </Label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#7A6BEB] focus:ring-4 focus:ring-[#7A6BEB]/10 outline-none transition-all bg-gray-50/50"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#7A6BEB]" />
                    Application Message
                  </Label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full min-h-[200px] px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-[#7A6BEB] focus:ring-4 focus:ring-[#7A6BEB]/10 outline-none transition-all bg-gray-50/50 resize-none"
                    placeholder="Describe why you are interested in this project..."
                  />
                </div>

                <div className="pt-4 mt-auto">
                  <Button
                    type="submit"
                    className="w-full bg-[#7A6BEB] hover:bg-[#6B5DD8] text-white font-bold py-6 rounded-2xl transition-all text-xl shadow-xl shadow-[#7A6BEB]/20 flex items-center justify-center gap-3"
                  >
                    <Send className="w-6 h-6" />
                    Submit Application
                  </Button>
                  <p className="text-center text-sm text-gray-400 mt-4">
                    By submitting, your profile details will be shared with {project.clientName}.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
