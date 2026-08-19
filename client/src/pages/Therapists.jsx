import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Star,
  Clock,
  Video,
  Globe,
  User as UserIcon,
  AlertCircle,
} from "lucide-react";
import api from "../api/axios";

export default function Therapists() {
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");
  const [filterSessionType, setFilterSessionType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        setLoading(true);
        setError(null);

        // Was: api.get("/admin/users", { params: { role: "therapist" } })
        // That's an admin-only endpoint — it 401'd when logged out and
        // 403'd for any non-admin account, which is why this page showed
        // "No therapists found" instead of an actual error. Switched to
        // the dedicated public/client-facing endpoint.
        const response = await api.get("/therapists");
        const fetchedTherapists = response.data || [];

        const mappedTherapists = (
          Array.isArray(fetchedTherapists) ? fetchedTherapists : []
        ).map((t) => {
          // .length check instead of plain `||`, since an empty array
          // ([]) is truthy in JS — `t.specialties || [...]` never falls
          // back to the default when specialties exists but is empty,
          // which produced "specializing in ." (empty join) on real data.
          const specialties = t.specialties?.length
            ? t.specialties
            : ["mental health"];
          const languages = t.languages?.length ? t.languages : ["English"];
          const modality = t.modality?.length ? t.modality : ["video", "chat"];

          return {
            ...t,
            specialties,
            languages,
            modality,
            bio:
              t.bio ||
              `Licensed therapist specializing in ${specialties.join(", ")}.`,
            rating: t.rating || 4.5,
            reviews: t.reviews || 0,
            credentials: t.credentials || "Licensed Therapist",
            photo: t.photo || "",
            experience: t.experience || 0,
          };
        });

        setTherapists(mappedTherapists);
      } catch (error) {
        console.error("Failed to fetch therapists", error);
        setError("Failed to load therapists. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTherapists();
  }, []);

  const filteredTherapists = therapists.filter((therapist) => {
    const matchesSearch =
      therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.bio.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty = filterSpecialty
      ? (therapist.specialties || []).includes(filterSpecialty)
      : true;

    const matchesLanguage = filterLanguage
      ? (therapist.languages || []).includes(filterLanguage)
      : true;

    const matchesSession = filterSessionType
      ? (therapist.modality || []).includes(filterSessionType)
      : true;

    return (
      matchesSearch && matchesSpecialty && matchesLanguage && matchesSession
    );
  });

  const allSpecialties = Array.from(
    new Set(therapists.flatMap((therapist) => therapist.specialties || [])),
  );
  const allLanguages = Array.from(
    new Set(therapists.flatMap((therapist) => therapist.languages || [])),
  );
  const allSessionTypes = Array.from(
    new Set(therapists.flatMap((therapist) => therapist.modality || [])),
  );

  return (
    <div className="min-h-screen bg-surface font-['Plus_Jakarta_Sans',sans-serif]">
      <section className="relative h-[520px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/5700150/pexels-photo-5700150.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-on-background/70 via-on-background/55 to-on-background/70" />
        <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
          <span className="inline-block text-label-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-white bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6 uppercase tracking-[0.15em]">
            Find Your Therapist
          </span>
          <h1 className="text-headline-xl font-['Fraunces',serif] font-medium text-white mb-6 tracking-tight leading-[1.15]">
            Find the Right Therapist{" "}
            <span className="italic text-secondary-container">for You</span>
          </h1>
          <p className="text-body-lg font-['Plus_Jakarta_Sans',sans-serif] text-white/85 max-w-2xl mx-auto leading-relaxed">
            Connect with licensed professionals who understand your needs and
            can support you on your journey toward better mental wellness.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 md:px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4">
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-surface-variant shadow-sm lg:sticky lg:top-24">
              <h2 className="text-headline-md font-['Fraunces',serif] font-medium text-on-surface mb-6 tracking-tight">
                Find Your Match
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-on-surface mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                    <input
                      type="text"
                      placeholder="Name or keyword"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 bg-surface border border-surface-variant rounded-xl outline-none text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-on-surface placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-on-surface mb-2">
                    Specialty
                  </label>
                  <select
                    value={filterSpecialty}
                    onChange={(e) => setFilterSpecialty(e.target.value)}
                    className="w-full px-3 py-3 bg-surface border border-surface-variant rounded-xl outline-none text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/10"
                  >
                    <option value="">All Specialties</option>
                    {allSpecialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-on-surface mb-2">
                    Language
                  </label>
                  <select
                    value={filterLanguage}
                    onChange={(e) => setFilterLanguage(e.target.value)}
                    className="w-full px-3 py-3 bg-surface border border-surface-variant rounded-xl outline-none text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/10"
                  >
                    <option value="">Any Language</option>
                    {allLanguages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-on-surface mb-2">
                    Session Type
                  </label>
                  <select
                    value={filterSessionType}
                    onChange={(e) => setFilterSessionType(e.target.value)}
                    className="w-full px-3 py-3 bg-surface border border-surface-variant rounded-xl outline-none text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/10"
                  >
                    <option value="">Any Type</option>
                    {allSessionTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </aside>

          <main className="w-full lg:w-3/4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="mt-4 text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted">
                  Finding therapists...
                </p>
              </div>
            ) : filteredTherapists.length === 0 ? (
              <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-surface-variant">
                <UserIcon className="mx-auto h-12 w-12 text-text-muted mb-4" />
                <h3 className="text-headline-md font-['Fraunces',serif] font-medium text-on-surface mb-2">
                  No therapists found
                </h3>
                <p className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted">
                  Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterSpecialty("");
                  }}
                  className="mt-6 px-5 py-2.5 bg-primary/10 text-primary font-['Plus_Jakarta_Sans',sans-serif] font-semibold rounded-full hover:bg-primary/20 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : error ? (
              <div className="bg-error-container/20 rounded-2xl p-12 text-center border border-error/20">
                <AlertCircle className="mx-auto h-12 w-12 text-error mb-4" />
                <h3 className="text-headline-md font-['Fraunces',serif] font-medium text-on-surface mb-2">
                  Oops! Something went wrong.
                </h3>
                <p className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted">
                  {error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-6 px-5 py-2.5 bg-error/10 text-error font-['Plus_Jakarta_Sans',sans-serif] font-semibold rounded-full hover:bg-error/20 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredTherapists.map((therapist) => (
                  <div
                    key={therapist._id}
                    className="bg-surface-container-lowest rounded-2xl p-6 md:p-7 border border-surface-variant shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col md:flex-row gap-6"
                  >
                    <div className="flex-shrink-0 flex flex-col items-center md:items-start">
                      {therapist.photo ? (
                        <img
                          src={therapist.photo}
                          alt={therapist.name}
                          className="w-28 h-28 rounded-full object-cover mb-4 ring-4 ring-surface shadow-sm"
                        />
                      ) : (
                        <div className="w-28 h-28 rounded-full mb-4 ring-4 ring-surface shadow-sm bg-primary/10 flex items-center justify-center">
                          <UserIcon className="w-12 h-12 text-primary/60" />
                        </div>
                      )}
                      {therapist.rating != null && (
                        <div className="flex items-center text-primary font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-body-sm">
                          <Star className="w-4 h-4 fill-current mr-1" />
                          <span>{therapist.rating}</span>
                          {therapist.reviews != null && (
                            <span className="text-text-muted ml-1 font-normal">
                              ({therapist.reviews})
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-headline-md font-['Fraunces',serif] font-medium text-on-surface tracking-tight">
                        {therapist.name}{" "}
                        <span className="text-body-md font-['Plus_Jakarta_Sans',sans-serif] font-normal text-text-muted">
                          {therapist.credentials}
                        </span>
                      </h3>

                      {therapist.bio && (
                        <p className="mt-2 text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted leading-relaxed">
                          {therapist.bio}
                        </p>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {therapist.specialties &&
                          therapist.specialties.length > 0 && (
                            <div>
                              <h4 className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-on-surface mb-3">
                                Specialties
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {therapist.specialties.map((specialty) => (
                                  <span
                                    key={specialty}
                                    className="px-3 py-1.5 bg-secondary-container text-on-secondary-container text-xs font-['Plus_Jakarta_Sans',sans-serif] font-medium rounded-full"
                                  >
                                    {specialty}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                        <div className="space-y-3 text-body-sm font-['Plus_Jakarta_Sans',sans-serif]">
                          {therapist.languages &&
                            therapist.languages.length > 0 && (
                              <div className="flex items-start text-text-muted">
                                <Globe className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                                <span>{therapist.languages.join(", ")}</span>
                              </div>
                            )}

                          {therapist.modality &&
                            therapist.modality.length > 0 && (
                              <div className="flex items-start text-text-muted">
                                <Video className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                                <span>
                                  {therapist.modality.join(", ")} Sessions
                                </span>
                              </div>
                            )}

                          {therapist.availability &&
                            therapist.availability.length > 0 && (
                              <div className="flex items-start text-text-muted">
                                <Clock className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                                <span>
                                  Available {therapist.availability[0]?.day}s &
                                  more
                                </span>
                              </div>
                            )}
                        </div>
                      </div>

                      <div className="mt-6 flex flex-col sm:flex-row gap-3 pt-6 border-t border-surface-variant">
                        <button
                          onClick={() =>
                            navigate(`/therapists/${therapist._id}`)
                          }
                          className="px-6 py-2.5 border border-primary text-primary font-['Plus_Jakarta_Sans',sans-serif] font-semibold rounded-full hover:bg-primary/5 transition-colors"
                        >
                          View Profile
                        </button>
                        <button
                          onClick={() => navigate(`/book/${therapist._id}`)}
                          className="px-6 py-2.5 bg-primary text-on-primary font-['Plus_Jakarta_Sans',sans-serif] font-semibold rounded-full hover:bg-primary-container hover:shadow-md transition-all"
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
        </div>
      </section>
    </div>
  );
}
