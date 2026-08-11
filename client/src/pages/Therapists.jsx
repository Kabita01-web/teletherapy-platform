import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Star, Clock, Video, Globe, MapPin, User as UserIcon } from 'lucide-react';

// Mock data since API endpoint doesn't exist yet
const MOCK_THERAPISTS = [
  {
    _id: '1',
    name: 'Dr. Sarah Jenkins',
    credentials: 'Ph.D., LCP',
    photo: 'https://i.pravatar.cc/150?u=1',
    bio: 'Clinical psychologist with over 10 years of experience helping adults navigate anxiety, depression, and life transitions.',
    specialties: ['Anxiety', 'Depression', 'CBT'],
    languages: ['English', 'Spanish'],
    availability: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00' },
      { day: 'Wednesday', startTime: '09:00', endTime: '17:00' }
    ],
    modality: ['Video', 'Chat'],
    rating: 4.9,
    reviews: 124
  },
  {
    _id: '2',
    name: 'Michael Chang',
    credentials: 'LCSW',
    photo: 'https://i.pravatar.cc/150?u=2',
    bio: 'Specializing in relationship issues and family dynamics. I provide a culturally sensitive approach to healing.',
    specialties: ['Couples Therapy', 'Family Therapy', 'Trauma'],
    languages: ['English', 'Mandarin'],
    availability: [
      { day: 'Tuesday', startTime: '10:00', endTime: '19:00' },
      { day: 'Thursday', startTime: '10:00', endTime: '19:00' }
    ],
    modality: ['Video', 'Phone'],
    rating: 4.8,
    reviews: 89
  },
  {
    _id: '3',
    name: 'Dr. Elena Rodriguez',
    credentials: 'Psy.D.',
    photo: 'https://i.pravatar.cc/150?u=3',
    bio: 'Passionate about helping adolescents and young adults overcome self-esteem issues, eating disorders, and stress.',
    specialties: ['Eating Disorders', 'Adolescents', 'Self-Esteem'],
    languages: ['English'],
    availability: [
      { day: 'Monday', startTime: '13:00', endTime: '20:00' },
      { day: 'Friday', startTime: '09:00', endTime: '15:00' }
    ],
    modality: ['Video'],
    rating: 5.0,
    reviews: 210
  }
];

export default function Therapists() {
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API fetch
    const fetchTherapists = async () => {
      try {
        setLoading(true);
        // Using setTimeout to simulate network request
        await new Promise(resolve => setTimeout(resolve, 800));
        setTherapists(MOCK_THERAPISTS);
      } catch (error) {
        console.error("Failed to fetch therapists", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTherapists();
  }, []);

  // Filter logic
  const filteredTherapists = therapists.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = filterSpecialty ? t.specialties.includes(filterSpecialty) : true;
    
    return matchesSearch && matchesSpecialty;
  });

  const allSpecialties = Array.from(new Set(therapists.flatMap(t => t.specialties)));

  return (
    <div className="bg-background min-h-screen font-body-md text-text-primary">
      {/* Header section */}
      <section className="bg-surface py-12 px-4 sm:px-6 lg:px-8 border-b border-outline-variant">
        <div className="max-w-container-max mx-auto">
          <h1 className="text-3xl md:text-4xl font-headline-lg text-primary mb-4 text-center md:text-left">
            Find the Right Therapist for You
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl text-center md:text-left">
            Browse our network of licensed professionals and filter by specialty, language, or availability to find your perfect match.
          </p>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-container-max mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-1/4">
          <div className="bg-surface rounded-2xl p-6 shadow-sm border border-outline sticky top-6">
            <h2 className="text-xl font-headline-md text-primary mb-6">Filters</h2>
            
            <div className="space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-text-muted" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-outline rounded-lg bg-background focus:ring-primary focus:border-primary sm:text-sm outline-none transition-colors"
                    placeholder="Name or keyword"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Specialty */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Specialty</label>
                <select
                  className="block w-full px-3 py-2 border border-outline rounded-lg bg-background focus:ring-primary focus:border-primary sm:text-sm outline-none transition-colors"
                  value={filterSpecialty}
                  onChange={(e) => setFilterSpecialty(e.target.value)}
                >
                  <option value="">All Specialties</option>
                  {allSpecialties.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              {/* Language (Mock filter visually) */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Language</label>
                <select className="block w-full px-3 py-2 border border-outline rounded-lg bg-background focus:ring-primary focus:border-primary sm:text-sm outline-none transition-colors">
                  <option value="">Any Language</option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Mandarin">Mandarin</option>
                </select>
              </div>
              
              {/* Modality (Mock filter visually) */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Session Type</label>
                <select className="block w-full px-3 py-2 border border-outline rounded-lg bg-background focus:ring-primary focus:border-primary sm:text-sm outline-none transition-colors">
                  <option value="">Any Type</option>
                  <option value="Video">Video Call</option>
                  <option value="Phone">Phone Call</option>
                  <option value="Chat">Text/Chat</option>
                </select>
              </div>
            </div>
          </div>
        </aside>

        {/* Therapist List */}
        <main className="w-full lg:w-3/4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <p className="mt-4 text-text-secondary">Loading therapists...</p>
            </div>
          ) : filteredTherapists.length === 0 ? (
            <div className="bg-surface rounded-2xl p-12 text-center border border-outline shadow-sm">
              <UserIcon className="mx-auto h-12 w-12 text-text-muted mb-4" />
              <h3 className="text-xl font-headline-md text-text-primary mb-2">No therapists found</h3>
              <p className="text-text-secondary">Try adjusting your filters or search terms.</p>
              <button 
                onClick={() => { setSearchTerm(''); setFilterSpecialty(''); }}
                className="mt-6 px-4 py-2 bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary/20 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredTherapists.map(therapist => (
                <div key={therapist._id} className="bg-surface rounded-2xl p-6 shadow-sm border border-outline hover:border-primary/50 transition-colors flex flex-col md:flex-row gap-6">
                  {/* Photo & Basic Info */}
                  <div className="flex-shrink-0 flex flex-col items-center md:items-start text-center md:text-left">
                    <img 
                      src={therapist.photo} 
                      alt={therapist.name} 
                      className="w-24 h-24 rounded-full object-cover mb-4 border border-outline-variant"
                    />
                    <div className="flex items-center text-secondary font-medium">
                      <Star className="w-4 h-4 fill-current mr-1" />
                      <span>{therapist.rating}</span>
                      <span className="text-text-muted text-sm ml-1">({therapist.reviews})</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
                      <div>
                        <h3 className="text-2xl font-headline-md text-text-primary">
                          {therapist.name} <span className="text-lg text-text-secondary font-normal">{therapist.credentials}</span>
                        </h3>
                        <p className="text-text-secondary mt-1">{therapist.bio}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div>
                        <h4 className="text-sm font-semibold text-text-primary mb-2">Specialties</h4>
                        <div className="flex flex-wrap gap-2">
                          {therapist.specialties.map(spec => (
                            <span key={spec} className="px-2.5 py-1 bg-surface-container-highest text-text-primary text-xs rounded-full">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start text-sm text-text-secondary">
                          <Globe className="w-4 h-4 mr-2 mt-0.5 text-text-muted" />
                          <span>{therapist.languages.join(', ')}</span>
                        </div>
                        <div className="flex items-start text-sm text-text-secondary">
                          <Video className="w-4 h-4 mr-2 mt-0.5 text-text-muted" />
                          <span>{therapist.modality.join(', ')} Sessions</span>
                        </div>
                        <div className="flex items-start text-sm text-text-secondary">
                          <Clock className="w-4 h-4 mr-2 mt-0.5 text-text-muted" />
                          <span>Available {therapist.availability[0]?.day}s & more</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3 pt-6 border-t border-outline-variant">
                      <button 
                        onClick={() => navigate(`/therapists/${therapist._id}`)}
                        className="px-6 py-2 border border-outline text-text-primary font-medium rounded-lg hover:bg-surface-container transition-colors text-center"
                      >
                        View Profile
                      </button>
                      <button 
                        onClick={() => navigate(`/book/${therapist._id}`)}
                        className="px-6 py-2 bg-primary text-on-primary font-medium rounded-lg hover:bg-primary-container transition-colors shadow-sm text-center"
                      >
                        Book Session
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </section>
    </div>
  );
}
