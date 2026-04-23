import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { createProject, updateProjectLayout } from '../lib/api';

const TEMPLATE_LIBRARY = [
  {
    id: 'editorial-flux',
    category: 'Blog',
    rating: '4.9',
    pages: 12,
    items: 45,
    setup: '~5m',
    name: 'Editorial Flux',
    description: 'A clean typography-led blog template for thought leaders and researchers.',
    accent: 'indigo',
    badge: 'NEW',
    layout: {
      type: 'container',
      styles: { padding: '32px', backgroundColor: '#f8fafc' },
      children: [
        {
          type: 'navbar',
          styles: { padding: '16px', backgroundColor: '#ffffff', borderRadius: '12px', margin: '0 0 16px 0' },
          children: [
            { type: 'heading', content: 'Editorial Flux', styles: { fontSize: '30px', margin: '0' } },
            { type: 'text', content: 'Ideas worth reading, weekly.', styles: { color: '#64748b', margin: '6px 0 0 0' } },
          ],
        },
        {
          type: 'row',
          styles: { gap: '16px' },
          children: [
            {
              type: 'column',
              children: [
                {
                  type: 'card',
                  styles: { padding: '20px', borderRadius: '14px', backgroundColor: '#ffffff' },
                  children: [
                    { type: 'heading', content: 'The New State of Product Writing', styles: { fontSize: '28px' } },
                    {
                      type: 'text',
                      content: 'A practical guide to writing crisp, high-trust interfaces that convert.',
                    },
                    { type: 'button', content: 'Read Article', props: { href: 'https://example.com' } },
                  ],
                },
              ],
            },
            {
              type: 'column',
              children: [
                {
                  type: 'card',
                  styles: { padding: '20px', borderRadius: '14px', backgroundColor: '#ffffff' },
                  children: [
                    { type: 'heading', content: 'Popular Topics', styles: { fontSize: '20px' } },
                    { type: 'text', content: 'UX Writing\nContent Design\nDocumentation\nAI UX' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    id: 'luxe-market',
    category: 'E-commerce',
    rating: '5.0',
    pages: 24,
    items: 110,
    setup: '~15m',
    name: 'Luxe Market',
    description: 'High-end product showcase with sleek cart interactions and filtering.',
    accent: 'purple',
    badge: 'POPULAR',
    layout: {
      type: 'container',
      styles: { padding: '28px', backgroundColor: '#0f172a' },
      children: [
        {
          type: 'navbar',
          styles: { padding: '16px', backgroundColor: '#1e293b', borderRadius: '12px' },
          children: [
            { type: 'heading', content: 'Luxe Market', styles: { fontSize: '28px', color: '#f8fafc' } },
            { type: 'text', content: 'Curated design products for modern spaces.', styles: { color: '#cbd5e1' } },
          ],
        },
        {
          type: 'row',
          styles: { gap: '16px', margin: '16px 0 0 0' },
          children: [
            {
              type: 'column',
              children: [
                {
                  type: 'card',
                  styles: { backgroundColor: '#1e293b', borderRadius: '14px', padding: '16px' },
                  children: [
                    { type: 'image', props: { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1000' } },
                    { type: 'heading', content: 'Aether Chair', styles: { fontSize: '22px', color: '#f8fafc' } },
                    { type: 'text', content: '$249', styles: { color: '#a78bfa', fontSize: '20px' } },
                    { type: 'button', content: 'Add to Cart' },
                  ],
                },
              ],
            },
            {
              type: 'column',
              children: [
                {
                  type: 'card',
                  styles: { backgroundColor: '#1e293b', borderRadius: '14px', padding: '16px' },
                  children: [
                    { type: 'image', props: { src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000' } },
                    { type: 'heading', content: 'Halo Lamp', styles: { fontSize: '22px', color: '#f8fafc' } },
                    { type: 'text', content: '$129', styles: { color: '#a78bfa', fontSize: '20px' } },
                    { type: 'button', content: 'Add to Cart' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    id: 'studio-nexus',
    category: 'Agency',
    rating: '4.8',
    pages: 8,
    items: 32,
    setup: '~2m',
    name: 'Studio Nexus',
    description: 'A bold portfolio template for creative studios that need visual impact.',
    accent: 'pink',
    badge: 'TRENDING',
    layout: {
      type: 'container',
      styles: { padding: '28px', backgroundColor: '#020617' },
      children: [
        {
          type: 'card',
          styles: {
            backgroundColor: '#0f172a',
            borderRadius: '16px',
            padding: '28px',
            backgroundImage: 'linear-gradient(135deg,#0f172a,#1d4ed8)',
          },
          children: [
            { type: 'heading', content: 'Studio Nexus', styles: { fontSize: '44px', color: '#ffffff', margin: '0' } },
            {
              type: 'text',
              content: 'We design identities, products, and experiences for ambitious brands.',
              styles: { color: '#dbeafe', fontSize: '20px', margin: '8px 0 0 0' },
            },
            { type: 'button', content: 'Start a Project', props: { href: 'https://example.com' } },
          ],
        },
        {
          type: 'row',
          styles: { gap: '16px', margin: '18px 0 0 0' },
          children: [
            {
              type: 'column',
              children: [
                {
                  type: 'card',
                  styles: { padding: '16px', borderRadius: '12px', backgroundColor: '#111827' },
                  children: [
                    { type: 'heading', content: 'Branding', styles: { fontSize: '22px', color: '#f9fafb' } },
                    { type: 'text', content: 'Visual systems that scale.', styles: { color: '#cbd5e1' } },
                  ],
                },
              ],
            },
            {
              type: 'column',
              children: [
                {
                  type: 'card',
                  styles: { padding: '16px', borderRadius: '12px', backgroundColor: '#111827' },
                  children: [
                    { type: 'heading', content: 'Web Design', styles: { fontSize: '22px', color: '#f9fafb' } },
                    { type: 'text', content: 'Fast sites with cinematic visuals.', styles: { color: '#cbd5e1' } },
                  ],
                },
              ],
            },
            {
              type: 'column',
              children: [
                {
                  type: 'card',
                  styles: { padding: '16px', borderRadius: '12px', backgroundColor: '#111827' },
                  children: [
                    { type: 'heading', content: 'Product UX', styles: { fontSize: '22px', color: '#f9fafb' } },
                    { type: 'text', content: 'UX that drives retention.', styles: { color: '#cbd5e1' } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    id: 'saas-startup-landing',
    category: 'SaaS',
    rating: '4.9',
    pages: 6,
    items: 28,
    setup: '~4m',
    name: 'Startup Landing',
    description: 'A modern SaaS landing page with hero, features, and clean conversion flow.',
    accent: 'indigo',
    badge: 'NEW',
    layout: {
      type: 'container',
      styles: { padding: '0', backgroundColor: '#f9fafb' },
      children: [
        {
          type: 'navbar',
          styles: {
            padding: '20px 50px',
            backgroundColor: '#ffffff',
            margin: '0',
            borderRadius: '0',
          },
          children: [
            { type: 'heading', content: 'CreatorCanvas', styles: { fontSize: '22px', margin: '0', color: '#111827' } },
            { type: 'text', content: 'Home | Features | Contact', styles: { color: '#374151', margin: '6px 0 0 0' } },
          ],
        },
        {
          type: 'card',
          styles: {
            padding: '80px 20px',
            margin: '0',
            borderRadius: '0',
            backgroundImage: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
          },
          children: [
            {
              type: 'heading',
              content: 'Build Websites Without Code',
              styles: { fontSize: '48px', color: '#ffffff', textAlign: 'center', margin: '0 0 16px 0' },
            },
            {
              type: 'text',
              content: 'Drag, drop, and launch instantly',
              styles: { fontSize: '18px', color: '#ffffff', textAlign: 'center', margin: '0 0 24px 0' },
            },
            {
              type: 'button',
              content: 'Get Started',
              styles: {
                backgroundColor: '#ffffff',
                color: '#4f46e5',
                padding: '12px 24px',
                borderRadius: '6px',
                margin: '0 auto',
                display: 'block',
              },
            },
          ],
        },
        {
          type: 'row',
          styles: { gap: '20px', padding: '50px', justifyContent: 'center' },
          children: [
            {
              type: 'column',
              children: [
                {
                  type: 'card',
                  styles: {
                    backgroundColor: '#ffffff',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                  },
                  children: [
                    { type: 'heading', content: 'Easy Builder', styles: { fontSize: '24px' } },
                    { type: 'text', content: 'Drag and drop components' },
                  ],
                },
              ],
            },
            {
              type: 'column',
              children: [
                {
                  type: 'card',
                  styles: {
                    backgroundColor: '#ffffff',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                  },
                  children: [
                    { type: 'heading', content: 'Fast Deployment', styles: { fontSize: '24px' } },
                    { type: 'text', content: 'Publish in seconds' },
                  ],
                },
              ],
            },
            {
              type: 'column',
              children: [
                {
                  type: 'card',
                  styles: {
                    backgroundColor: '#ffffff',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                  },
                  children: [
                    { type: 'heading', content: 'Modern Design', styles: { fontSize: '24px' } },
                    { type: 'text', content: 'Clean UI templates' },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'footer',
          styles: { textAlign: 'center', padding: '30px', backgroundColor: '#111827', margin: '0' },
          children: [{ type: 'text', content: '© 2026 CreatorCanvas', styles: { color: '#ffffff', margin: '0' } }],
        },
      ],
    },
  },
  {
    id: 'portfolio-john-doe',
    category: 'Portfolio',
    rating: '4.8',
    pages: 5,
    items: 22,
    setup: '~3m',
    name: 'John Doe Portfolio',
    description: 'A clean personal portfolio with hero, about, projects, and strong visual hierarchy.',
    accent: 'indigo',
    badge: 'NEW',
    layout: {
      type: 'container',
      styles: { padding: '0', backgroundColor: '#f9fafb' },
      children: [
        {
          type: 'card',
          styles: {
            textAlign: 'center',
            padding: '80px 20px',
            margin: '0',
            borderRadius: '0',
            backgroundImage: 'linear-gradient(135deg,#3b82f6,#6366f1)',
          },
          children: [
            {
              type: 'heading',
              content: 'John Doe',
              styles: { fontSize: '42px', margin: '0 0 10px 0', color: '#ffffff' },
            },
            {
              type: 'text',
              content: 'Frontend Developer | UI Enthusiast',
              styles: { fontSize: '18px', color: 'rgba(255,255,255,0.92)', margin: '0' },
            },
          ],
        },
        {
          type: 'container',
          styles: { padding: '60px 20px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' },
          children: [
            { type: 'heading', content: 'About Me', styles: { fontSize: '28px', margin: '0 0 20px 0' } },
            {
              type: 'text',
              content:
                'I build modern, scalable, and user-friendly web applications with a focus on design and performance.',
              styles: { color: '#374151', margin: '0' },
            },
          ],
        },
        {
          type: 'container',
          styles: { padding: '20px 20px 60px 20px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' },
          children: [
            { type: 'heading', content: 'Projects', styles: { fontSize: '28px', margin: '0 0 20px 0' } },
            {
              type: 'row',
              styles: { gap: '20px', justifyContent: 'center', flexWrap: 'wrap' },
              children: [
                {
                  type: 'column',
                  children: [
                    {
                      type: 'card',
                      styles: {
                        backgroundColor: '#ffffff',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                      },
                      children: [
                        { type: 'heading', content: 'Project One', styles: { fontSize: '22px' } },
                        { type: 'text', content: 'Responsive web app with modern UI' },
                      ],
                    },
                  ],
                },
                {
                  type: 'column',
                  children: [
                    {
                      type: 'card',
                      styles: {
                        backgroundColor: '#ffffff',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                      },
                      children: [
                        { type: 'heading', content: 'Project Two', styles: { fontSize: '22px' } },
                        { type: 'text', content: 'AI-powered dashboard system' },
                      ],
                    },
                  ],
                },
                {
                  type: 'column',
                  children: [
                    {
                      type: 'card',
                      styles: {
                        backgroundColor: '#ffffff',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                      },
                      children: [
                        { type: 'heading', content: 'Project Three', styles: { fontSize: '22px' } },
                        { type: 'text', content: 'Full-stack SaaS platform' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'button',
              content: 'View More',
              styles: {
                margin: '20px auto 0 auto',
                padding: '10px 20px',
                backgroundColor: '#6366f1',
                color: '#ffffff',
                borderRadius: '6px',
                display: 'block',
              },
            },
          ],
        },
        {
          type: 'footer',
          styles: { textAlign: 'center', padding: '30px', backgroundColor: '#111827', margin: '0' },
          children: [{ type: 'text', content: '© 2026 John Doe | Portfolio', styles: { color: '#ffffff', margin: '0' } }],
        },
      ],
    },
  },
];

const FILTERS = ['All Templates', 'Blog', 'E-commerce', 'Agency', 'SaaS', 'Portfolio'];

function accentClass(accent) {
  if (accent === 'purple') {
    return 'text-purple-600';
  }
  if (accent === 'pink') {
    return 'text-pink-600';
  }
  return 'text-indigo-600';
}

const Templates = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All Templates');
  const [search, setSearch] = useState('');
  const [busyTemplateId, setBusyTemplateId] = useState(null);
  const [feedback, setFeedback] = useState('');

  const filteredTemplates = useMemo(() => {
    return TEMPLATE_LIBRARY.filter((template) => {
      const matchFilter = activeFilter === 'All Templates' ? true : template.category === activeFilter;
      const text = `${template.name} ${template.description} ${template.category}`.toLowerCase();
      const matchSearch = search ? text.includes(search.toLowerCase()) : true;
      return matchFilter && matchSearch;
    });
  }, [activeFilter, search]);

  const handleUseTemplate = async (template) => {
    setBusyTemplateId(template.id);
    setFeedback('');
    try {
      const project = await createProject({ name: `${template.name} Project` });
      await updateProjectLayout(project.id, template.layout);
      navigate(`/dashboard?projectId=${project.id}`);
    } catch {
      setFeedback('Could not apply template. Please try again.');
    } finally {
      setBusyTemplateId(null);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface text-on-surface absolute top-0 left-0 z-50 antialiased">
      <Sidebar activePage="templates" />

      <main className="flex-1 flex flex-col md:pl-64 overflow-hidden h-full bg-[#f8fafc]">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 flex items-center justify-between px-8 z-30 sticky top-0">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Templates</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
              <span className="material-symbols-outlined text-slate-400">search</span>
              <input
                className="w-56 bg-transparent text-sm text-slate-700 outline-none"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search templates"
                value={search}
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-[1400px] mx-auto">

            {/* Filter Chips */}
            <div className="flex gap-3 mb-6 overflow-x-auto pb-2 no-scrollbar">
              {FILTERS.map((filter) => (
                <button
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-colors whitespace-nowrap ${
                    activeFilter === filter
                      ? 'bg-slate-800 text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            {feedback ? (
              <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                {feedback}
              </div>
            ) : null}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 relative z-10">

              {filteredTemplates.map((template) => (
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col" key={template.id}>
                  <div className="relative h-60 bg-gradient-to-br from-slate-200 to-slate-300 rounded-t-[2rem] p-6 flex items-center justify-center overflow-hidden">
                    <div className="w-40 h-24 bg-white shadow-lg rounded-lg" />
                    <div className="absolute top-5 left-5 bg-slate-900 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full tracking-widest uppercase shadow-sm">
                      {template.badge}
                    </div>
                  </div>

                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-3">
                      <span className={`text-xs font-bold tracking-wide ${accentClass(template.accent)}`}>{template.category}</span>
                      <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-slate-400" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                        {template.rating}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3 tracking-tight">{template.name}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2 h-10 mb-8 leading-relaxed">{template.description}</p>

                    <div className="flex justify-between items-center py-5 border-t border-b border-slate-100 mb-8 mt-auto">
                      <div className="text-center">
                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Pages</p>
                        <p className="text-base font-bold text-slate-800">{template.pages}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Items</p>
                        <p className="text-base font-bold text-slate-800">{template.items}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Setup</p>
                        <p className="text-base font-bold text-slate-800">{template.setup}</p>
                      </div>
                    </div>

                    <button
                      className="w-full py-3.5 bg-slate-100 hover:bg-slate-200/80 text-indigo-600 font-bold rounded-xl transition-colors text-sm disabled:opacity-60"
                      disabled={busyTemplateId === template.id}
                      onClick={() => handleUseTemplate(template)}
                    >
                      {busyTemplateId === template.id ? 'Applying Template...' : 'Use Template'}
                    </button>
                  </div>
                </div>
              ))}

              {!filteredTemplates.length ? (
                <div className="col-span-full rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
                  No templates match your filters.
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Templates;
