// Portfolio page functionality
document.addEventListener('DOMContentLoaded', function() {
    initPortfolioFilters();
    initDemoCards();
});

// Portfolio filtering
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const caseStudies = document.querySelectorAll('.case-study');
    const demoCards = document.querySelectorAll('.demo-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter case studies
            caseStudies.forEach(study => {
                const category = study.dataset.category;
                if (filter === 'all' || category === filter) {
                    study.style.display = 'block';
                    study.classList.add('animate-on-scroll');
                } else {
                    study.style.display = 'none';
                }
            });
            
            // Filter demo cards
            demoCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.classList.add('animate-on-scroll');
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Re-trigger scroll animations
            setTimeout(() => {
                initScrollAnimations();
            }, 100);
        });
    });
}

// Demo card interactions
function initDemoCards() {
    const demoCards = document.querySelectorAll('.demo-card');
    
    demoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
    });
}

// Case study modal
function openCaseStudy(caseId) {
    const caseData = getCaseStudyData(caseId);
    if (!caseData) return;
    
    const modal = createCaseStudyModal(caseData);
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('show');
    }, 100);
}

function getCaseStudyData(caseId) {
    const caseStudies = {
        'techstart': {
            title: 'TechStart Solutions',
            type: 'B2B SaaS Marketing Website',
            timeline: '12 days',
            challenge: 'TechStart Solutions, a growing B2B SaaS company, was struggling with their outdated website that failed to convert visitors into leads. Their bounce rate was high at 78%, and they were losing potential customers to competitors with more professional online presence.',
            solution: 'We redesigned their entire website with a focus on conversion optimization. Key improvements included: clear value propositions above the fold, social proof integration, optimized lead capture forms, mobile-first responsive design, and performance optimization for faster loading.',
            results: [
                { metric: 'Lead Generation', before: '12/month', after: '48/month', improvement: '+300%' },
                { metric: 'Bounce Rate', before: '78%', after: '32%', improvement: '-59%' },
                { metric: 'Page Load Time', before: '4.2s', after: '1.2s', improvement: '-71%' },
                { metric: 'Lighthouse Score', before: '45', after: '95', improvement: '+111%' },
                { metric: 'Mobile Usability', before: '62%', after: '98%', improvement: '+58%' }
            ],
            testimonial: {
                text: "VoltNexis transformed our online presence completely. The new website not only looks amazing but actually converts visitors into customers. We've seen a 300% increase in qualified leads since launch.",
                author: "Sarah Chen",
                position: "Marketing Director, TechStart Solutions"
            },
            technologies: ['Next.js', 'Tailwind CSS', 'Sanity CMS', 'Vercel', 'Google Analytics'],
            liveUrl: '#'
        },
        'artisan': {
            title: 'Artisan Crafts Co.',
            type: 'E-commerce Store',
            timeline: '3 weeks',
            challenge: 'A local handmade crafts business wanted to expand online but had no e-commerce experience. They needed a user-friendly store that could handle inventory, payments, and customer management while maintaining their artisan brand aesthetic.',
            solution: 'We built a beautiful, conversion-optimized e-commerce store with custom product galleries, secure payment processing, inventory management, customer accounts, and mobile-optimized shopping experience. The design reflected their handmade, artisan brand values.',
            results: [
                { metric: 'Monthly Revenue', before: '₹50,000', after: '₹3,00,000', improvement: '+500%' },
                { metric: 'Conversion Rate', before: '0.8%', after: '4.2%', improvement: '+425%' },
                { metric: 'Average Order Value', before: '₹800', after: '₹1,200', improvement: '+50%' },
                { metric: 'Customer Retention', before: '15%', after: '45%', improvement: '+200%' }
            ],
            testimonial: {
                text: "Our online store has completely transformed our business. We went from local sales only to shipping nationwide. The website is beautiful and our customers love the shopping experience.",
                author: "Priya Sharma",
                position: "Founder, Artisan Crafts Co."
            },
            technologies: ['React', 'Stripe', 'Node.js', 'MongoDB', 'Cloudinary'],
            liveUrl: '#'
        },
        'fitlife': {
            title: 'FitLife App Launch',
            type: 'Product Landing Page',
            timeline: '5 days',
            challenge: 'A fitness app startup needed a high-converting landing page for their product launch campaign. They had a tight deadline and needed to maximize app downloads from their marketing spend.',
            solution: 'We created a conversion-focused landing page with compelling copy, app preview videos, social proof, clear benefits, and optimized call-to-action buttons. The page was designed for mobile-first experience and fast loading.',
            results: [
                { metric: 'Conversion Rate', before: '2.1%', after: '12.5%', improvement: '+495%' },
                { metric: 'App Downloads', before: '500', after: '10,000+', improvement: '+1900%' },
                { metric: 'Cost per Acquisition', before: '₹450', after: '₹85', improvement: '-81%' },
                { metric: 'Page Load Time', before: '3.1s', after: '0.9s', improvement: '-71%' }
            ],
            testimonial: {
                text: "The landing page exceeded all our expectations. We hit our download targets in the first week itself. The conversion rate is incredible and our marketing ROI has improved dramatically.",
                author: "Rahul Gupta",
                position: "Co-founder, FitLife"
            },
            technologies: ['Astro', 'Tailwind CSS', 'Netlify', 'Google Analytics'],
            liveUrl: '#'
        }
    };
    
    return caseStudies[caseId];
}

function createCaseStudyModal(caseData) {
    const modal = document.createElement('div');
    modal.className = 'case-study-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeCaseStudyModal()"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="closeCaseStudyModal()">&times;</button>
            
            <div class="modal-header">
                <h2>${caseData.title}</h2>
                <div class="case-meta">
                    <span class="case-type">${caseData.type}</span>
                    <span class="case-timeline">Delivered in ${caseData.timeline}</span>
                </div>
            </div>
            
            <div class="modal-body">
                <section class="case-section">
                    <h3>The Challenge</h3>
                    <p>${caseData.challenge}</p>
                </section>
                
                <section class="case-section">
                    <h3>Our Solution</h3>
                    <p>${caseData.solution}</p>
                </section>
                
                <section class="case-section">
                    <h3>Results</h3>
                    <div class="results-grid">
                        ${caseData.results.map(result => `
                            <div class="result-card">
                                <div class="result-metric">${result.metric}</div>
                                <div class="result-comparison">
                                    <span class="result-before">${result.before}</span>
                                    <span class="result-arrow">→</span>
                                    <span class="result-after">${result.after}</span>
                                </div>
                                <div class="result-improvement">${result.improvement}</div>
                            </div>
                        `).join('')}
                    </div>
                </section>
                
                <section class="case-section">
                    <h3>Client Testimonial</h3>
                    <blockquote class="testimonial">
                        <p>"${caseData.testimonial.text}"</p>
                        <cite>— ${caseData.testimonial.author}, ${caseData.testimonial.position}</cite>
                    </blockquote>
                </section>
                
                <section class="case-section">
                    <h3>Technologies Used</h3>
                    <div class="tech-tags">
                        ${caseData.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </section>
                
                <div class="modal-actions">
                    <a href="${caseData.liveUrl}" class="btn btn-primary" target="_blank">View Live Site</a>
                    <a href="apply.html" class="btn btn-outline">Start Your Project</a>
                </div>
            </div>
        </div>
    `;
    
    return modal;
}

function closeCaseStudyModal() {
    const modal = document.querySelector('.case-study-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}