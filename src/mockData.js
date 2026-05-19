export const mockArticles = [
  {
    id: 'mental-health-sexual-wellness',
    title: 'Mental Health and Sexual Wellness',
    category: 'Wellness',
    tags: ['Mental Health', 'Wellness', 'Relationships'],
    summary: 'Mental and social well-being are closely connected to sexual health. It is important to address both. Connection between mental and...',
    content: `Mental and emotional well-being are closely connected to sexual health. It's important to address both.

**Connection Between Mental and Sexual Health:**

Stress, anxiety, and depression can affect libido, relationships, and sexual function. Conversely, sexual health concerns can impact mental well-being.

**Self-Care Strategies:**

- Open communication with partners
- Stress management techniques
- Regular exercise and healthy eating
- Adequate sleep
- Professional support when needed

**When to Seek Help:**

If you're experiencing persistent anxiety, depression, or relationship difficulties, consider speaking with a mental health professional or counselor. Remember: Your mental health matters just as much as your physical health.`,
    medicallyReviewed: true
  },
  {
    id: 'understanding-contraception',
    title: 'Understanding Contraception Options',
    category: 'Contraception',
    tags: ['Contraception', 'Family Planning', 'Health'],
    summary: 'Explore the different types of contraception available, how they work, their effectiveness rates, and how to choose what fits your lifestyle.',
    content: `Choosing the right contraception is an important decision for your health and lifestyle. 

**Types of Contraception:**

1. **Hormonal Methods**: Birth control pills, patches, vaginal rings, injections, and implants. These work by preventing ovulation.
2. **Barrier Methods**: Male and female condoms. These block sperm from entering the uterus and are the only method that also protects against STIs.
3. **Intrauterine Devices (IUDs)**: Small T-shaped devices inserted into the uterus by a professional. They can last between 3 to 10 years and are highly effective.
4. **Emergency Contraception**: Pills taken after unprotected sex to prevent pregnancy.

**How to Choose:**

Consider how easy the method is to use, whether you want protection against STIs, side effects, and your future family planning goals. Consult with a doctor to discuss the best option for you.`,
    medicallyReviewed: true
  },
  {
    id: 'sti-prevention-and-awareness',
    title: 'STI Prevention and Awareness',
    category: 'STIs',
    tags: ['STIs', 'Prevention', 'Safe Sex'],
    summary: 'Get key information on Sexually Transmitted Infections (STIs), symptoms to watch out for, testing guidelines, and prevention methods.',
    content: `Sexually Transmitted Infections (STIs) are common, but they are highly preventable and many are easily treatable.

**Key Prevention Strategies:**

- **Consistent Condom Use**: Correctly using condoms every time you have sex significantly reduces the risk of STIs.
- **Regular Testing**: Many STIs do not display symptoms. Routine checkups are the only way to know your status.
- **Vaccination**: Vaccines are available for HPV (Human Papillomavirus) and Hepatitis B.
- **Open Communication**: Discuss sexual health and testing history with your partner before engaging in sexual activity.

**Common Symptoms to Watch For:**

Unusual discharge, pain during urination, sores or bumps on genital areas, and unexplained abdominal pain. If you notice any of these, visit a clinic immediately.`,
    medicallyReviewed: true
  },
  {
    id: 'demystifying-menstruation',
    title: 'Demystifying Menstruation & Cycles',
    category: 'Menstruation',
    tags: ['Menstruation', 'Cycle Tracking', 'Wellness'],
    summary: 'Learn what happens during a menstrual cycle, what is considered a normal flow, and how cycle tracking can help monitor your health.',
    content: `Your menstrual cycle is a natural indicator of overall reproductive health.

**The Four Cycle Phases:**

1. **Menstruation Phase**: The shedding of the uterine lining (your period). Usually lasts 3 to 7 days.
2. **Follicular Phase**: Estrogen rises, preparing an egg to release.
3. **Ovulation Phase**: The release of an egg from the ovary. Typically occurs in the middle of your cycle.
4. **Luteal Phase**: Progesterone increases to prepare the uterus for potential pregnancy.

**Why Track Your Cycle?**

Tracking helps you anticipate your next period, identify irregularities (like skipped cycles or sudden shifts in length), and notice patterns in moods or energy levels. Keeping local records on Bloom helps you share accurate data with doctors if needed.`,
    medicallyReviewed: true
  },
  {
    id: 'understanding-consent',
    title: 'Understanding Consent in Relationships',
    category: 'Consent',
    tags: ['Consent', 'Relationships', 'Safety'],
    summary: 'A comprehensive guide to understanding what consent means, how to practice it, and establishing boundaries in relationships.',
    content: `Consent is a foundational component of healthy, respectful relationships.

**What is Consent?**

Consent must be **F.R.I.E.S.**:
- **Freely given**: Made without pressure, force, or under the influence of drugs or alcohol.
- **Reversible**: Anyone can change their mind at any time, even if they previously agreed.
- **Informed**: Both parties know exactly what they are agreeing to.
- **Enthusiastic**: It should be about wanting to do something, not just "not saying no."
- **Specific**: Agreeing to one act does not mean agreeing to others.

**Establishing Boundaries:**

Healthy relationships rely on checking in, listening to your partner's verbal and non-verbal cues, and respecting their boundaries without question or hesitation.`,
    medicallyReviewed: false
  }
];

export const mockDoctors = [
  {
    id: 'dr-abena-mensah',
    name: 'Dr. Abena Mensah',
    title: 'Sexual Health Nurse Practitioner',
    specialty: 'Contraception & Routine Care',
    experience: '8 years experience',
    rating: '4.9 (124 consultations)',
    bio: 'Specializes in supportive, non-judgmental sexual health consultations, birth control advice, and STI counseling for tertiary students.',
    hospital: 'Legon Health Services'
  },
  {
    id: 'dr-kofi-boateng',
    name: 'Dr. Kofi Boateng',
    title: 'Obstetrician & Gynecologist',
    specialty: 'Reproductive Health Specialist',
    experience: '12 years experience',
    rating: '4.8 (89 consultations)',
    bio: 'Dedicated to diagnosing and treating complex reproductive health disorders, hormonal imbalances, and menstrual irregularities.',
    hospital: 'Ridge Medical Center'
  },
  {
    id: 'dr-sarah-osei',
    name: 'Dr. Sarah Osei',
    title: 'General Medical Practitioner',
    specialty: 'General Wellness & Diagnostics',
    experience: '6 years experience',
    rating: '4.7 (210 consultations)',
    bio: 'Focuses on preventative medicine, lifestyle counseling, and early diagnostic assessments for young women.',
    hospital: 'Kaneshie Polyclinic'
  }
];

export const mockForumPosts = [
  {
    id: 'post-1',
    category: 'Menstruation',
    title: 'How do you deal with extreme cramps?',
    content: 'I get really severe cramps during the first two days of my period. Sometimes it prevents me from attending lectures. Painkillers help a bit, but is there anything else I can do to get relief?',
    author: 'Anonymous Sunflower',
    date: '2 hours ago',
    likes: 12,
    replies: [
      {
        id: 'reply-1-1',
        content: 'Try using a hot water bottle on your lower abdomen. It really helps relax the muscles. Also, warm ginger tea does wonders for me.',
        author: 'Anonymous Orchid',
        date: '1 hour ago'
      },
      {
        id: 'reply-1-2',
        content: 'If they are that extreme, it might be worth mentioning to a gynecologist! You can file an anonymous consultation right here on Bloom to ask one of the practitioners.',
        author: 'Anonymous Tulip',
        date: '45 mins ago'
      }
    ]
  },
  {
    id: 'post-2',
    category: 'Contraception',
    title: 'First time considering birth control pills. Experiences?',
    content: 'Hi everyone, I am thinking of starting on the daily pill, but I am a bit nervous about side effects like mood swings or weight gain. Anyone here on it who can share their experience?',
    author: 'Anonymous Lotus',
    date: '5 hours ago',
    likes: 8,
    replies: [
      {
        id: 'reply-2-1',
        content: 'Every body reacts differently! I had mild nausea for the first two weeks, but after that, it leveled out and actually made my periods much lighter and less painful.',
        author: 'Anonymous Rose',
        date: '3 hours ago'
      }
    ]
  },
  {
    id: 'post-3',
    category: 'STIs',
    title: 'Free STI testing sites on campus?',
    content: 'Does anyone know if the campus clinic offers free or discounted STI screening for students? I want to get checked but I am on a tight budget.',
    author: 'Anonymous Hibiscus',
    date: '1 day ago',
    likes: 15,
    replies: [
      {
        id: 'reply-3-1',
        content: 'Yes! The main student clinic does routine screening for free on Wednesdays. Just bring your student ID card.',
        author: 'Anonymous Lily',
        date: '18 hours ago'
      }
    ]
  }
];
