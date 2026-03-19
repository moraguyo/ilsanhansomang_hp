(function() {
    'use strict';

    // Constants & Configuration
    const IMAGE_PATH = '/UserData/hansomang/Layouts/hansomang_Layout/images';

    // Mission Chars Data
    const missionLines = [
        { parts: [{ text: '우리는 ', bold: false }, { text: '십자가', bold: true }, { text: '와 ', bold: false }, { text: '성령', bold: true }, { text: '의 능력을 통한 거룩함과', bold: false }] },
        { parts: [{ text: '아버지의 마음과 비전', bold: true }, { text: '을 품은 성숙한 성품을 이루고,', bold: false }] },
        { parts: [{ text: 'VIP(태신자)를 ', bold: false }, { text: '전도', bold: true }, { text: '하며,', bold: false }] },
        { parts: [{ text: '하나님의 나라', bold: true }, { text: '를 이 땅에 실현할 영적가족인', bold: false }] },
        { parts: [{ text: '12제자를 세워', bold: true }, { text: ' 도시를 복음으로 정복하고,', bold: false }] },
        { parts: [{ text: '한국교회를 ', bold: false }, { text: '깨우며', bold: true }, { text: ' 한민족을 ', bold: false }, { text: '살리고', bold: true }, { text: ' 열방을 ', bold: false }, { text: '구원하는', bold: true }] },
        { parts: [{ text: '예수님이 꿈꾸신 바로 그 교회', bold: true }, { text: '를 이룬다.', bold: false }] },
    ];

    const nextGenData = [
        {
            dept: '해피영아부 (1-3세)',
            rows: [
                { part: '1부', time: '09:30', location: '3층 환영해방' },
                { part: '2부', time: '11:30' },
            ],
        },
        {
            dept: '해피유아부 (4-5세)',
            rows: [
                { part: '1부', time: '09:30', location: '3층 행복해방' },
                { part: '2부', time: '11:30' },
            ],
        },
        {
            dept: '해피유치부 (6-7세)',
            rows: [
                { part: '1부', time: '09:30', location: '3층 사랑해방' },
                { part: '2부', time: '11:30' },
            ],
        },
        { dept: '드림(유년,초등)', rows: [{ part: '주일', time: '09:30', location: '지하1층' }] },
        { dept: '영어예배', rows: [{ part: '주일', time: '11:30', location: '2층' }] },
        { dept: '청소년', rows: [{ part: '주일', time: '10:00', location: '4층' }] },
        { dept: '소망부', rows: [{ part: '주일', time: '11:00', location: '1층' }] }
    ];

    const missionCardsData = [
        { name: '국내선교', sub: 'Domestic Mission', image: `${IMAGE_PATH}/b31b4ef018cc5abfcc9d24855b3ec760b609a26d.png` },
        { name: '해외선교', sub: 'Overseas Mission', image: `${IMAGE_PATH}/26d20063ef5b8340954172ff327de7988411f6e4.png` },
        { name: '파송선교사소식', sub: 'Missionary News', image: `${IMAGE_PATH}/13fcfe4a423320304c375613681f9ece08692553.png` },
        { name: '중보기도', sub: 'Intercessory Prayer', image: `${IMAGE_PATH}/b31b4ef018cc5abfcc9d24855b3ec760b609a26d.png` },
        { name: '디아코니아', sub: 'Diakonia', image: `${IMAGE_PATH}/26d20063ef5b8340954172ff327de7988411f6e4.png` },
    ];

    const galleryRow1 = [
        `${IMAGE_PATH}/61ecdd1e6a0d4dc87cb2481a6a9304d5744a88aa.png`,
        `${IMAGE_PATH}/5b0a8feaef4217e425516a9bf369592310de3b98.png`,
        `${IMAGE_PATH}/a643fde8dd8002ef7da30276b3f55227921ac771.png`,
        `${IMAGE_PATH}/44c8a6aebbc84727c55e2e6d7c642d14484f4ce2.png`,
        'https://images.unsplash.com/photo-1765947382559-93260e5d6c89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBjaHVyY2glMjBmZWxsb3dzaGlwJTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc3MzgzNTc3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1745357081650-e0857e7cd6ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBwcmFpc2UlMjBtdXNpYyUyMHdvcnNoaXAlMjBiYW5kfGVufDF8fHx8MTc3MzgzNTc4NHww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1751666526244-40239a251eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB2b2x1bnRlZXIlMjBzZXJ2aWNlfGVufDF8fHx8MTc3MzgzNTc4NHww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1566855189670-7502f9c7f03b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RpYW4lMjBwcmF5ZXIlMjBoYW5kcyUyMGJpYmxlfGVufDF8fHx8MTc3MzgzNTc4N3ww&ixlib=rb-4.1.0&q=80&w=1080'
    ];

    const galleryRow2 = [
        `${IMAGE_PATH}/f2322b4c979f55cbc1bd5e3710293e66c2bd3092.png`,
        `${IMAGE_PATH}/4e3a2c304d66e962d04b543c5ea42cc92cd3e08e.png`,
        `${IMAGE_PATH}/13fcfe4a423320304c375613681f9ece08692553.png`,
        `${IMAGE_PATH}/b31b4ef018cc5abfcc9d24855b3ec760b609a26d.png`,
        `${IMAGE_PATH}/26d20063ef5b8340954172ff327de7988411f6e4.png`,
        'https://images.unsplash.com/photo-1765947382559-93260e5d6c89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBjaHVyY2glMjBmZWxsb3dzaGlwJTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc3MzgzNTc3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1750109060920-4624a080570d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzM3MDkxNDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1702905709201-0950a1a3190f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHdvcnNoaXAlMjBzdW5kYXklMjBzY2hvb2x8ZW58MXx8fHwxNzczODM1Nzg3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ];

    // Initialize Page
    document.addEventListener('DOMContentLoaded', () => {
        initLoadingSequence();
        initHeroSlider();
        initVisionMissionScroll();
        initCardStackScroll();
        initWorshipTabs();
        initMissionSlider();
        initGallery();
        initScrollAnimations();
    });

    // 1. Loading Sequence
    function initLoadingSequence() {
        const root = document.querySelector('.cms-content-root');
        const mainSite = document.getElementById('main-site');

        setTimeout(() => root.classList.add('loading-step-1'), 200);
        setTimeout(() => root.classList.add('loading-step-2'), 600);
        setTimeout(() => root.classList.add('loading-step-3'), 1000);
        setTimeout(() => root.classList.add('loading-step-4'), 1800);
        setTimeout(() => root.classList.add('loading-step-5'), 2100);
        setTimeout(() => root.classList.add('loading-finished'), 2900);
        setTimeout(() => {
            const loadingPage = document.getElementById('loading-page');
            loadingPage.classList.add('hidden-block');
            mainSite.classList.remove('main-site-hidden');
            mainSite.classList.add('main-site-visible');
            document.body.classList.remove('no-scroll');
        }, 3400);

        document.body.classList.add('no-scroll');
    }

    // 2. Hero Slider
    function initHeroSlider() {
        let current = 0;
        const slides = document.querySelectorAll('.hero-slide');
        const titles = document.querySelectorAll('.hero-title-group');
        const dots = document.querySelectorAll('.hero-dot');
        const prevBtn = document.getElementById('hero-prev');
        const nextBtn = document.getElementById('hero-next');
        const menuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('hero-mobile-menu');

        function showSlide(index) {
            slides[current].classList.remove('active');
            titles[current].classList.remove('active');
            dots[current].classList.remove('active');

            current = (index + slides.length) % slides.length;

            slides[current].classList.add('active');
            titles[current].classList.add('active');
            dots[current].classList.add('active');
        }

        nextBtn.addEventListener('click', () => showSlide(current + 1));
        prevBtn.addEventListener('click', () => showSlide(current - 1));
        dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));

        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        setInterval(() => showSlide(current + 1), 5000);
    }

    // 3. Vision Mission Scroll
    function initVisionMissionScroll() {
        const sticky = document.querySelector('.vision-sticky');
        const container = document.getElementById('mission-text-container');
        const quickMenuItems = document.querySelectorAll('.quick-menu-item');
        const trigger = document.getElementById('vision-trigger');

        // Build characters
        let charIndex = 0;
        missionLines.forEach((line) => {
            const p = document.createElement('p');
            p.className = 'mission-line';
            line.parts.forEach(part => {
                [...part.text].forEach(char => {
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.className = 'mission-char' + (part.bold ? ' bold' : '');
                    span.dataset.idx = charIndex++;
                    p.appendChild(span);
                });
            });
            container.appendChild(p);
        });
        const totalChars = charIndex;
        const chars = container.querySelectorAll('.mission-char');

        window.addEventListener('scroll', () => {
            const rect = trigger.getBoundingClientRect();
            const viewH = window.innerHeight;
            const range = trigger.offsetHeight - viewH;
            if (range <= 0) return;

            let progress = Math.max(0, Math.min(1, -rect.top / range));

            if (progress <= 0.6) {
                const charProgress = progress / 0.6;
                const activeCount = Math.round(totalChars * charProgress);
                chars.forEach(c => {
                    if (parseInt(c.dataset.idx) < activeCount) c.classList.add('active');
                    else c.classList.remove('active');
                });
                sticky.classList.remove('is-active');
                quickMenuItems.forEach(item => item.classList.remove('visible'));
            } else {
                chars.forEach(c => c.classList.add('active'));
                sticky.classList.add('is-active');
                if (progress >= 0.7) {
                    quickMenuItems.forEach(item => item.classList.add('visible'));
                }
            }
        });
    }

    // 4. Card Stack Scroll
    function initCardStackScroll() {
        const wrapper = document.getElementById('message-stack-card');

        window.addEventListener('scroll', () => {
            const rect = wrapper.getBoundingClientRect();
            const viewH = window.innerHeight;
            const progress = (viewH - rect.bottom) / viewH;

            if (isFinite(progress) && progress > 0.1) {
                wrapper.classList.add('is-stacked');
            } else {
                wrapper.classList.remove('is-stacked');
            }
        });
    }

    // 5. Worship Tabs
    function initWorshipTabs() {
        const tabs = document.querySelectorAll('#nextgen-tabs .tab-btn');
        const container = document.getElementById('nextgen-table-container');

        function renderTable(index) {
            const data = nextGenData[index] || nextGenData[0];

            const detailContainer = document.createElement('div');
            detailContainer.className = 'worship-detail-container';

            const inner = document.createElement('div');
            inner.className = 'worship-detail-inner';

            const deptBox = document.createElement('div');
            deptBox.className = 'worship-detail-dept-box';

            const deptName = document.createElement('span');
            deptName.className = 'worship-detail-dept-name';
            deptName.textContent = data.dept;
            deptBox.appendChild(deptName);

            const vLine = document.createElement('div');
            vLine.className = 'worship-detail-v-line';

            const rowsWrap = document.createElement('div');
            rowsWrap.className = 'worship-detail-rows';

            data.rows.forEach(r => {
                const rowItem = document.createElement('div');
                rowItem.className = 'worship-detail-row-item';

                const pSpan = document.createElement('span');
                pSpan.className = 'worship-detail-text-gray worship-detail-min-20';
                pSpan.textContent = r.part;

                const tSpan = document.createElement('span');
                tSpan.className = 'worship-detail-text-gray worship-detail-min-44';
                tSpan.textContent = r.time;

                rowItem.appendChild(pSpan);
                rowItem.appendChild(tSpan);

                if (r.location) {
                    const lSpan = document.createElement('span');
                    lSpan.className = 'worship-detail-text-light';
                    lSpan.textContent = r.location;
                    rowItem.appendChild(lSpan);
                }
                rowsWrap.appendChild(rowItem);
            });

            inner.appendChild(deptBox);
            inner.appendChild(vLine);
            inner.appendChild(rowsWrap);
            detailContainer.appendChild(inner);

            container.innerHTML = '';
            container.appendChild(detailContainer);
        }

        tabs.forEach(btn => {
            btn.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                btn.classList.add('active');
                renderTable(parseInt(btn.dataset.tab));
            });
        });

        renderTable(0);
    }

    // 6. Mission Slider
    function initMissionSlider() {
        const trigger = document.getElementById('mission-scroll-trigger');
        const sticky = document.querySelector('.mission-sticky');
        const cardList = document.getElementById('mission-card-list');
        const dotsContainer = document.getElementById('mission-dots');
        const tabs = document.querySelectorAll('.mission-tab');
        let current = 0;

        // Render Cards
        missionCardsData.forEach((card, i) => {
            const div = document.createElement('div');
            div.className = 'mission-card';
            div.dataset.index = i;

            const inner = document.createElement('div');
            inner.className = 'mission-card-inner';

            const img = document.createElement('img');
            img.src = card.image;
            img.alt = card.name;
            img.className = 'w-full h-full object-cover';

            const overlay = document.createElement('div');
            overlay.className = 'mission-card-overlay';

            const textGroup = document.createElement('div');
            textGroup.className = 'mission-card-text';

            const name = document.createElement('span');
            name.className = 'mission-card-name';
            name.textContent = card.name;

            const sub = document.createElement('span');
            sub.className = 'mission-card-sub';
            sub.textContent = card.sub;

            const arrowWrap = document.createElement('div');
            arrowWrap.className = 'mission-card-arrow';
            const circle = document.createElement('div');
            circle.className = 'arrow-circle';
            circle.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
            arrowWrap.appendChild(circle);

            textGroup.appendChild(name);
            textGroup.appendChild(sub);
            textGroup.appendChild(arrowWrap);

            inner.appendChild(img);
            inner.appendChild(overlay);
            inner.appendChild(textGroup);
            div.appendChild(inner);
            cardList.appendChild(div);

            const dot = document.createElement('div');
            dot.className = 'mission-dot' + (i === 0 ? ' active' : '');
            dotsContainer.appendChild(dot);
        });

        const cards = cardList.querySelectorAll('.mission-card');
        const dots = dotsContainer.querySelectorAll('.mission-dot');

        function updateSlider() {
            cards.forEach((card, i) => {
                const total = cards.length;
                let offset = ((i - current) % total + total) % total;
                if (offset > total / 2) offset -= total;
                card.dataset.offset = offset;
                if (offset < -2) card.dataset.offsetOut = 'left';
                else if (offset > 2) card.dataset.offsetOut = 'right';
                else delete card.dataset.offsetOut;
            });

            dots.forEach((d, i) => d.classList.toggle('active', i === current));
            tabs.forEach((t, i) => t.classList.toggle('active', i === current));
        }

        window.addEventListener('scroll', () => {
            const rect = trigger.getBoundingClientRect();
            const viewH = window.innerHeight;
            const total = trigger.offsetHeight - viewH;
            const progress = total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;

            if (progress > 0.48) {
                sticky.classList.add('is-active');
            } else {
                sticky.classList.remove('is-active');
            }
        });

        document.getElementById('mission-next').addEventListener('click', () => { current = (current + 1) % cards.length; updateSlider(); });
        document.getElementById('mission-prev').addEventListener('click', () => { current = (current - 1 + cards.length) % cards.length; updateSlider(); });
        tabs.forEach(t => t.addEventListener('click', () => { current = parseInt(t.dataset.cat); updateSlider(); }));

        updateSlider();
    }

    // 7. Gallery
    function initGallery() {
        const track1 = document.getElementById('gallery-track-1');
        const track2 = document.getElementById('gallery-track-2');

        const fillTrack = (track, images) => {
            [...images, ...images].forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                img.className = 'gallery-img';
                track.appendChild(img);
            });
        };

        fillTrack(track1, galleryRow1);
        fillTrack(track2, galleryRow2);
    }

    // 8. Scroll Animations (Intersection Observer)
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    }

})();
