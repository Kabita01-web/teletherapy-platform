import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Star,
  Clock,
  Video,
  Globe,
  User as UserIcon,
} from 'lucide-react';

// ============================================================
// MOCK DATA
// ============================================================

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
      {
        day: 'Monday',
        startTime: '09:00',
        endTime: '17:00',
      },
      {
        day: 'Wednesday',
        startTime: '09:00',
        endTime: '17:00',
      },
    ],
    modality: ['Video', 'Chat'],
    rating: 4.9,
    reviews: 124,
  },
  {
    _id: '2',
    name: 'Michael Chang',
    credentials: 'LCSW',
    photo: 'https://i.pravatar.cc/150?u=2',
    bio: 'Specializing in relationship issues and family dynamics. I provide a culturally sensitive approach to healing.',
    specialties: [
      'Couples Therapy',
      'Family Therapy',
      'Trauma',
    ],
    languages: ['English', 'Mandarin'],
    availability: [
      {
        day: 'Tuesday',
        startTime: '10:00',
        endTime: '19:00',
      },
      {
        day: 'Thursday',
        startTime: '10:00',
        endTime: '19:00',
      },
    ],
    modality: ['Video', 'Phone'],
    rating: 4.8,
    reviews: 89,
  },
  {
    _id: '3',
    name: 'Dr. Elena Rodriguez',
    credentials: 'Psy.D.',
    photo: 'https://i.pravatar.cc/150?u=3',
    bio: 'Passionate about helping adolescents and young adults overcome self-esteem issues, eating disorders, and stress.',
    specialties: [
      'Eating Disorders',
      'Adolescents',
      'Self-Esteem',
    ],
    languages: ['English'],
    availability: [
      {
        day: 'Monday',
        startTime: '13:00',
        endTime: '20:00',
      },
      {
        day: 'Friday',
        startTime: '09:00',
        endTime: '15:00',
      },
    ],
    modality: ['Video'],
    rating: 5.0,
    reviews: 210,
  },
];

// ============================================================
// PAGE
// ============================================================

export default function Therapists() {
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('');

  const navigate = useNavigate();

  // ============================================================
  // LOAD THERAPISTS
  // ============================================================

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        setLoading(true);

        // Temporary mock loading
        await new Promise((resolve) =>
          setTimeout(resolve, 800)
        );

        setTherapists(MOCK_THERAPISTS);
      } catch (error) {
        console.error(
          'Failed to fetch therapists',
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTherapists();
  }, []);

  // ============================================================
  // FILTER
  // ============================================================

  const filteredTherapists = therapists.filter((therapist) => {
    const matchesSearch =
      therapist.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      therapist.bio
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesSpecialty = filterSpecialty
      ? therapist.specialties.includes(filterSpecialty)
      : true;

    return matchesSearch && matchesSpecialty;
  });

  const allSpecialties = Array.from(
    new Set(
      therapists.flatMap(
        (therapist) => therapist.specialties
      )
    )
  );

  // ============================================================
  // RETURN
  // ============================================================

  return (
    <div className="min-h-screen bg-surface font-['Plus_Jakarta_Sans',sans-serif]">

      {/* ====================================================== */}
      {/* HERO                                                   */}
      {/* ====================================================== */}

      <section
        className="
          relative
          h-[520px]
          flex
          items-center
          justify-center
          overflow-hidden
        "
      >
        {/* Background Image */}

        <img
          src="https://images.pexels.com/photos/5700150/pexels-photo-5700150.jpeg"
          alt=""
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            object-center
          "
        />

        {/* Dark Overlay */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-on-background/70
            via-on-background/55
            to-on-background/70
          "
        />

        {/* Hero Content */}

        <div
          className="
            relative
            z-10
            max-w-[900px]
            mx-auto
            px-6
            text-center
          "
        >
          {/* Eyebrow */}

          <span
            className="
              inline-block
              text-label-sm
              font-['Plus_Jakarta_Sans',sans-serif]
              font-semibold
              text-white
              bg-white/15
              backdrop-blur-sm
              px-4
              py-1.5
              rounded-full
              mb-6
              uppercase
              tracking-[0.15em]
            "
          >
            Find Your Therapist
          </span>

          {/* Heading */}

          <h1
            className="
              text-headline-xl
              font-['Fraunces',serif]
              font-medium
              text-white
              mb-6
              tracking-tight
              leading-[1.15]
            "
          >
            Find the Right Therapist{' '}
            <span className="italic text-secondary-container">
              for You
            </span>
          </h1>

          {/* Description */}

          <p
            className="
              text-body-lg
              font-['Plus_Jakarta_Sans',sans-serif]
              text-white/85
              max-w-2xl
              mx-auto
              leading-relaxed
            "
          >
            Connect with licensed professionals who
            understand your needs and can support you
            on your journey toward better mental
            wellness.
          </p>
        </div>
      </section>

      {/* ====================================================== */}
      {/* SEARCH + THERAPISTS                                    */}
      {/* ====================================================== */}

      <section
        className="
          py-16
          px-6
          md:px-16
        "
      >
        <div
          className="
            max-w-[1280px]
            mx-auto
            flex
            flex-col
            lg:flex-row
            gap-8
          "
        >

          {/* ================================================== */}
          {/* FILTER SIDEBAR                                     */}
          {/* ================================================== */}

          <aside className="w-full lg:w-1/4">
            <div
              className="
                bg-surface-container-lowest
                rounded-2xl
                p-6
                border
                border-surface-variant
                shadow-sm
                lg:sticky
                lg:top-24
              "
            >
              {/* Filter Heading */}

              <h2
                className="
                  text-headline-md
                  font-['Fraunces',serif]
                  font-medium
                  text-on-surface
                  mb-6
                  tracking-tight
                "
              >
                Find Your Match
              </h2>

              <div className="space-y-6">

                {/* Search */}

                <div>
                  <label
                    className="
                      block
                      text-body-sm
                      font-['Plus_Jakarta_Sans',sans-serif]
                      font-semibold
                      text-on-surface
                      mb-2
                    "
                  >
                    Search
                  </label>

                  <div className="relative">
                    <Search
                      className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        h-4
                        w-4
                        text-text-muted
                      "
                    />

                    <input
                      type="text"
                      placeholder="Name or keyword"
                      value={searchTerm}
                      onChange={(e) =>
                        setSearchTerm(e.target.value)
                      }
                      className="
                        w-full
                        pl-10
                        pr-3
                        py-3
                        bg-surface
                        border
                        border-surface-variant
                        rounded-xl
                        outline-none
                        text-body-sm
                        font-['Plus_Jakarta_Sans',sans-serif]
                        text-on-surface
                        placeholder:text-text-muted
                        focus:border-primary
                        focus:ring-2
                        focus:ring-primary/10
                        transition-all
                      "
                    />
                  </div>
                </div>

                {/* Specialty */}

                <div>
                  <label
                    className="
                      block
                      text-body-sm
                      font-['Plus_Jakarta_Sans',sans-serif]
                      font-semibold
                      text-on-surface
                      mb-2
                    "
                  >
                    Specialty
                  </label>

                  <select
                    value={filterSpecialty}
                    onChange={(e) =>
                      setFilterSpecialty(e.target.value)
                    }
                    className="
                      w-full
                      px-3
                      py-3
                      bg-surface
                      border
                      border-surface-variant
                      rounded-xl
                      outline-none
                      text-body-sm
                      font-['Plus_Jakarta_Sans',sans-serif]
                      text-on-surface
                      focus:border-primary
                      focus:ring-2
                      focus:ring-primary/10
                    "
                  >
                    <option value="">
                      All Specialties
                    </option>

                    {allSpecialties.map((specialty) => (
                      <option
                        key={specialty}
                        value={specialty}
                      >
                        {specialty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Language */}

                <div>
                  <label
                    className="
                      block
                      text-body-sm
                      font-['Plus_Jakarta_Sans',sans-serif]
                      font-semibold
                      text-on-surface
                      mb-2
                    "
                  >
                    Language
                  </label>

                  <select
                    className="
                      w-full
                      px-3
                      py-3
                      bg-surface
                      border
                      border-surface-variant
                      rounded-xl
                      outline-none
                      text-body-sm
                      font-['Plus_Jakarta_Sans',sans-serif]
                      text-on-surface
                      focus:border-primary
                      focus:ring-2
                      focus:ring-primary/10
                    "
                  >
                    <option value="">
                      Any Language
                    </option>

                    <option value="English">
                      English
                    </option>

                    <option value="Spanish">
                      Spanish
                    </option>

                    <option value="Mandarin">
                      Mandarin
                    </option>
                  </select>
                </div>

                {/* Session Type */}

                <div>
                  <label
                    className="
                      block
                      text-body-sm
                      font-['Plus_Jakarta_Sans',sans-serif]
                      font-semibold
                      text-on-surface
                      mb-2
                    "
                  >
                    Session Type
                  </label>

                  <select
                    className="
                      w-full
                      px-3
                      py-3
                      bg-surface
                      border
                      border-surface-variant
                      rounded-xl
                      outline-none
                      text-body-sm
                      font-['Plus_Jakarta_Sans',sans-serif]
                      text-on-surface
                      focus:border-primary
                      focus:ring-2
                      focus:ring-primary/10
                    "
                  >
                    <option value="">
                      Any Type
                    </option>

                    <option value="Video">
                      Video Call
                    </option>

                    <option value="Phone">
                      Phone Call
                    </option>

                    <option value="Chat">
                      Text / Chat
                    </option>
                  </select>
                </div>

              </div>
            </div>
          </aside>

          {/* ================================================== */}
          {/* THERAPIST LIST                                     */}
          {/* ================================================== */}

          <main className="w-full lg:w-3/4">

            {/* Loading */}

            {loading ? (
              <div
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  py-20
                "
              >
                <div
                  className="
                    w-10
                    h-10
                    border-4
                    border-primary/20
                    border-t-primary
                    rounded-full
                    animate-spin
                  "
                />

                <p
                  className="
                    mt-4
                    text-body-sm
                    font-['Plus_Jakarta_Sans',sans-serif]
                    text-text-muted
                  "
                >
                  Finding therapists...
                </p>
              </div>
            ) : filteredTherapists.length === 0 ? (

              /* No Results */

              <div
                className="
                  bg-surface-container-lowest
                  rounded-2xl
                  p-12
                  text-center
                  border
                  border-surface-variant
                "
              >
                <UserIcon
                  className="
                    mx-auto
                    h-12
                    w-12
                    text-text-muted
                    mb-4
                  "
                />

                <h3
                  className="
                    text-headline-md
                    font-['Fraunces',serif]
                    font-medium
                    text-on-surface
                    mb-2
                  "
                >
                  No therapists found
                </h3>

                <p
                  className="
                    text-body-md
                    font-['Plus_Jakarta_Sans',sans-serif]
                    text-text-muted
                  "
                >
                  Try adjusting your filters or search
                  terms.
                </p>

                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterSpecialty('');
                  }}
                  className="
                    mt-6
                    px-5
                    py-2.5
                    bg-primary/10
                    text-primary
                    font-['Plus_Jakarta_Sans',sans-serif]
                    font-semibold
                    rounded-full
                    hover:bg-primary/20
                    transition-colors
                  "
                >
                  Clear Filters
                </button>
              </div>

            ) : (

              /* Therapist Cards */

              <div className="space-y-6">

                {filteredTherapists.map(
                  (therapist) => (
                    <div
                      key={therapist._id}
                      className="
                        bg-surface-container-lowest
                        rounded-2xl
                        p-6
                        md:p-7
                        border
                        border-surface-variant
                        shadow-sm
                        hover:shadow-md
                        hover:-translate-y-0.5
                        transition-all
                        duration-300
                        flex
                        flex-col
                        md:flex-row
                        gap-6
                      "
                    >

                      {/* ====================================== */}
                      {/* PHOTO                                   */}
                      {/* ====================================== */}

                      <div
                        className="
                          flex-shrink-0
                          flex
                          flex-col
                          items-center
                          md:items-start
                        "
                      >
                        <img
                          src={therapist.photo}
                          alt={therapist.name}
                          className="
                            w-28
                            h-28
                            rounded-full
                            object-cover
                            mb-4
                            ring-4
                            ring-surface
                            shadow-sm
                          "
                        />

                        <div
                          className="
                            flex
                            items-center
                            text-primary
                            font-['Plus_Jakarta_Sans',sans-serif]
                            font-semibold
                            text-body-sm
                          "
                        >
                          <Star
                            className="
                              w-4
                              h-4
                              fill-current
                              mr-1
                            "
                          />

                          <span>
                            {therapist.rating}
                          </span>

                          <span
                            className="
                              text-text-muted
                              ml-1
                              font-normal
                            "
                          >
                            ({therapist.reviews})
                          </span>
                        </div>
                      </div>

                      {/* ====================================== */}
                      {/* DETAILS                                 */}
                      {/* ====================================== */}

                      <div className="flex-grow">

                        {/* Name */}

                        <h3
                          className="
                            text-headline-md
                            font-['Fraunces',serif]
                            font-medium
                            text-on-surface
                            tracking-tight
                          "
                        >
                          {therapist.name}{' '}

                          <span
                            className="
                              text-body-md
                              font-['Plus_Jakarta_Sans',sans-serif]
                              font-normal
                              text-text-muted
                            "
                          >
                            {therapist.credentials}
                          </span>
                        </h3>

                        {/* Bio */}

                        <p
                          className="
                            mt-2
                            text-body-md
                            font-['Plus_Jakarta_Sans',sans-serif]
                            text-text-muted
                            leading-relaxed
                          "
                        >
                          {therapist.bio}
                        </p>

                        {/* Info Grid */}

                        <div
                          className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-6
                            mt-6
                          "
                        >

                          {/* Specialties */}

                          <div>
                            <h4
                              className="
                                text-body-sm
                                font-['Plus_Jakarta_Sans',sans-serif]
                                font-semibold
                                text-on-surface
                                mb-3
                              "
                            >
                              Specialties
                            </h4>

                            <div
                              className="
                                flex
                                flex-wrap
                                gap-2
                              "
                            >
                              {therapist.specialties.map(
                                (specialty) => (
                                  <span
                                    key={specialty}
                                    className="
                                      px-3
                                      py-1.5
                                      bg-secondary-container
                                      text-on-secondary-container
                                      text-xs
                                      font-['Plus_Jakarta_Sans',sans-serif]
                                      font-medium
                                      rounded-full
                                    "
                                  >
                                    {specialty}
                                  </span>
                                )
                              )}
                            </div>
                          </div>

                          {/* Additional Info */}

                          <div
                            className="
                              space-y-3
                              text-body-sm
                              font-['Plus_Jakarta_Sans',sans-serif]
                            "
                          >
                            <div
                              className="
                                flex
                                items-start
                                text-text-muted
                              "
                            >
                              <Globe
                                className="
                                  w-4
                                  h-4
                                  mr-2
                                  mt-0.5
                                  text-primary
                                  flex-shrink-0
                                "
                              />

                              <span>
                                {therapist.languages.join(
                                  ', '
                                )}
                              </span>
                            </div>

                            <div
                              className="
                                flex
                                items-start
                                text-text-muted
                              "
                            >
                              <Video
                                className="
                                  w-4
                                  h-4
                                  mr-2
                                  mt-0.5
                                  text-primary
                                  flex-shrink-0
                                "
                              />

                              <span>
                                {therapist.modality.join(
                                  ', '
                                )}{' '}
                                Sessions
                              </span>
                            </div>

                            <div
                              className="
                                flex
                                items-start
                                text-text-muted
                              "
                            >
                              <Clock
                                className="
                                  w-4
                                  h-4
                                  mr-2
                                  mt-0.5
                                  text-primary
                                  flex-shrink-0
                                "
                              />

                              <span>
                                Available{' '}
                                {
                                  therapist.availability[0]
                                    ?.day
                                }
                                s & more
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* ==================================== */}
                        {/* ACTIONS                               */}
                        {/* ==================================== */}

                        <div
                          className="
                            mt-6
                            flex
                            flex-col
                            sm:flex-row
                            gap-3
                            pt-6
                            border-t
                            border-surface-variant
                          "
                        >
                          <button
                            onClick={() =>
                              navigate(
                                `/therapists/${therapist._id}`
                              )
                            }
                            className="
                              px-6
                              py-2.5
                              border
                              border-primary
                              text-primary
                              font-['Plus_Jakarta_Sans',sans-serif]
                              font-semibold
                              rounded-full
                              hover:bg-primary/5
                              transition-colors
                            "
                          >
                            View Profile
                          </button>

                          <button
                            onClick={() =>
                              navigate(
                                `/book/${therapist._id}`
                              )
                            }
                            className="
                              px-6
                              py-2.5
                              bg-primary
                              text-on-primary
                              font-['Plus_Jakarta_Sans',sans-serif]
                              font-semibold
                              rounded-full
                              hover:bg-primary-container
                              hover:shadow-md
                              transition-all
                            "
                          >
                            Book Session
                          </button>
                        </div>

                      </div>
                    </div>
                  )
                )}

              </div>
            )}
          </main>
        </div>
      </section>
    </div>
  );
}