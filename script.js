const startDate = new Date("2025-02-13");

const chapters = [
    {
        title: "Chapter 1",
        heading: "Before You Begin",
        quote: "A little guide for your heart, from mine.",
        img: "https://i.pinimg.com/1200x/31/22/96/3122961e8bb3b0f71167a1d9bd89ad2f.jpg",
        items: [
            "When you first receive this",
            "When you want to read our love story",
            "When you want to hear the songs that remind me of you",
            "When you’re bored and want my attention",
            "When you want a surprise from me",
            "When you want to remember our happiest moments",
            "When you want to know what I’m thinking of you right now"
        ]
    },
    {
        title: "Chapter 2",
        heading: "Gentle Reminders",
        quote: "Just in case your mind forgets what your heart knows.",
        img: "https://i.pinimg.com/1200x/6e/f6/e6/6ef6e64e8596185b3505cc221cabe538.jpg",
        items: ["When you need a reminder of how much I love you", "When you want to know how important you are to me", "When you don’t feel loved", "When you feel like I don’t care", "When you’re worried I might leave you", "When you wonder why I’ll never stop choosing you", "When you forget your worth", "When you want to know my favorite things about you", "When you’re doubting if I love you enough", "When you just want to feel special"]
    },
    {
        title: "Chapter 3",
        heading: "On Hard Days",
        quote: "This too shall pass, and I am right here with you.",
        img: "https://i.pinimg.com/1200x/22/b9/03/22b903269bac1e3bf0f0fd4908e5335e.jpg",
        items: ["When you’ve had a bad day", "When everything feels too heavy", "When you’re mentally exhausted", "When you feel like giving up", "When you need motivation", "When you need a gentle reminder"]
    },
    {
        title: "Chapter 4",
        heading: "Feeling Alone",
        quote: "Distance means nothing when someone means everything.",
        img: "https://i.pinimg.com/736x/9d/bc/21/9dbc21cc6e782f2c4569df0992ec0ba8.jpg",
        items: ["When you’re feeling lonely", "When you’re missing me", "When you wish I was there", "When you need a hug", "When you have something to say but can’t", "When the distance feels too much", "When you want to feel close to me"]
    },
    {
        title: "Chapter 5",
        heading: "For The Tears",
        quote: "Let it rain, I will hold the umbrella.",
        img: "https://i.pinimg.com/1200x/d3/3d/79/d33d7977354a8dc9276c8d94586893c3.jpg",
        items: ["When you feel like crying", "When you’re crying", "When something’s bothering you", "When you’re overthinking", "When you feel like I don’t understand you", "When you don’t know why you’re sad", "When you feel like everything is falling apart", "When you just want someone to listen"]
    },
    {
        title: "Chapter 6",
        heading: "Moments of Conflict",
        quote: "Us against the problem, not me against you.",
        img: "https://i.pinimg.com/736x/f4/fa/00/f4fa0076e722804a95d7c4027b9ccc58.jpg",
        items: ["When we’re fighting", "When you’re jealous", "When I’ve hurt your feelings", "When you’re mad at me", "When I’m being hard to handle", "When you feel like we’re not okay", "When you’re scared of losing me", "When you don’t know what to do", "When you feel like we can’t fix this", "When my words are too harsh or is hurting you", "When you feel like we’re drifting apart"]
    },
    {
        title: "Chapter 7",
        heading: "I'm Not Myself?",
        quote: "Even when I'm difficult, I'm still yours.",
        img: "https://i.pinimg.com/736x/7b/4e/45/7b4e45edfbedd4efbcc4bab78fbefaec.jpg",
        items: ["When I’m jealous", "When you know something’s bothering me", "When I won’t open up", "When I’m not okay", "When I’m being cold", "When I’m mad at you", "When you hurt my feelings", "When I’m ignoring you"]
    }
];

let currentIndex = 0;
const carousel = document.getElementById('carousel');
const galleryContainer = document.getElementById('gallery-container');

function switchView(viewName) {
    const homeView = document.getElementById('home-view');
    const chaptersView = document.getElementById('chapters-view');
    const usView = document.getElementById('us-view');
    const btns = document.querySelectorAll('.nav-btn');
    const bottomLabel = document.getElementById('chapter-controls');

    btns.forEach(btn => btn.classList.remove('active'));

    homeView.classList.remove('active-view');
    chaptersView.classList.remove('active-view');
    if(usView) usView.classList.remove('active-view');
    
    if(bottomLabel) bottomLabel.classList.add('hidden');

    if(viewName === 'home') {
        homeView.classList.add('active-view');
        btns[0].classList.add('active');
    } 
    else if (viewName === 'chapters') {
        chaptersView.classList.add('active-view');
        btns[1].classList.add('active');
        if(bottomLabel) bottomLabel.classList.remove('hidden');
        updateCarousel(); 
    }
    else if (viewName === 'us') {
        usView.classList.add('active-view');
        btns[2].classList.add('active');
    }
}

function initCarousel() {
    carousel.innerHTML = '';
    chapters.forEach((chapter, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        let listHtml = '';
        chapter.items.forEach(item => {
            const safeItem = item.replace(/'/g, "\\'");
            listHtml += `<li onclick="openLetter('${safeItem}')"><span>❤︎</span> ${item}</li>`;
        });

        card.innerHTML = `
            <img src="${chapter.img}" alt="Mood" class="card-image">
            <div class="card-content">
                <div class="chapter-title">${chapter.title}</div>
                <div class="main-title">${chapter.heading}</div>
                <div class="quote">"${chapter.quote}"</div>
                <ul class="list-items">
                    ${listHtml}
                </ul>
            </div>
        `;
        carousel.appendChild(card);
    });
    updateCarousel();
}

function updateCarousel(offsetDrag = 0, withTransition = true) {
    const cards = document.querySelectorAll('.card');
    const width = window.innerWidth < 768 ? 270 : 420; 
    const spacing = width * 0.65; 
    
    cards.forEach((card, index) => {
        const virtualIndex = currentIndex - offsetDrag;
        const offset = index - virtualIndex;
        
        let x = offset * spacing; 
        let z = -Math.abs(offset) * 200; 
        let rotateY = offset * -20; 
        let scale = Math.max(0.85, 1 - Math.abs(offset) * 0.15); 
        let opacity = Math.max(0.4, 1 - Math.abs(offset) * 0.5); 
        
        if (Math.abs(offset) < 0.5) {
            scale = 1.05;
            opacity = 1;
            card.style.border = "2px solid rgba(209, 77, 114, 0.5)";
            card.style.zIndex = 20;
            rotateY = offset * -10; 
        } else {
            card.style.border = "1px solid rgba(255, 255, 255, 0.3)";
            card.style.zIndex = 10 - Math.round(Math.abs(offset));
        }

        if (withTransition) {
            card.style.transition = "all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)";
        } else {
            card.style.transition = "none";
        }

        card.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`;
        card.style.opacity = opacity;
        card.style.pointerEvents = Math.abs(offset) < 0.5 ? 'all' : 'none';
    });
}

let isDragging = false;
let startX = 0;
let currentDragOffset = 0; 

galleryContainer.addEventListener('mousedown', dragStart);
galleryContainer.addEventListener('touchstart', dragStart, {passive: false});

window.addEventListener('mouseup', dragEnd);
window.addEventListener('touchend', dragEnd);

window.addEventListener('mousemove', dragMove);
window.addEventListener('touchmove', dragMove, {passive: false});

function getX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

function dragStart(e) {
    if (e.target.closest('.list-items li')) return; 
    if (!e.target.closest('.carousel')) return;

    isDragging = true;
    startX = getX(e);
    galleryContainer.style.cursor = 'grabbing';
}

function dragMove(e) {
    if (!isDragging) return;
    if(e.type === 'touchmove') e.preventDefault(); 
    
    const currentX = getX(e);
    const deltaPx = currentX - startX;
    const cardWidth = window.innerWidth < 768 ? 270 : 420;
    const effectiveSpacing = cardWidth * 0.65; 

    currentDragOffset = deltaPx / effectiveSpacing;
    updateCarousel(currentDragOffset, false);
}

function dragEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    galleryContainer.style.cursor = 'grab';

    const draggedWholeNumbers = Math.round(currentDragOffset);
    currentIndex = currentIndex - draggedWholeNumbers;

    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= chapters.length) currentIndex = chapters.length - 1;

    currentDragOffset = 0;
    updateCarousel(0, true);

    const cardContents = document.querySelectorAll('.card-content');
    cardContents.forEach(content => {
        content.scrollTop = 0;
    });
}

function getLetterContent(topic) {
    if (topic === "When you first receive this") {
        return `Henloww my precious baby! This is proof na mas love tika, hehehe. I made this for you because I wanted you to always have my words, even during times when I can’t be there for you right away. Always come back to this if you need it, omkie?  I hope this reminds you of how you are so loved and cared for by your one and only girlfriend, and future wifey. No matter what you’re feeling, I hope you find comfort in every page you open. This is my way of telling you that you’ll never have to walk through life alone, because you’ll always have me baby. I’ll always be your kakampi. <br><br> This isn’t just a presentation po haa—it’s a little piece of my heart I’ve decided to put together for you. I know things can get hard between us sometimes, and I might not always be there for you for some reasons, but I wanted to create something that can stay with you no matter what. So, please keep this and save it baby ha. This isn’t just words baby, this is a promise that I’ll always find ways to reach you, comfort you, and make you feel loved and cared for even from afar. <br><br> As you go through this, I hope you can feel me in every word. You’re never alone baby, you’ve always got me. I’ll always do my best to brighten your days, whether they’re heavy, tiring, or even the happiest ones. Think of this as a little treasure chest you can open anything you need me. No matter what happens, I want this to remind you of one thing baby: my love for you is real, endless, and unchanging, omkie? <br><br> I really really love you, and I hope you will always remember that. Nothing and no one can ever change that. It’s you, and it will always be you.`;
    } 
    else if (topic === "When you want to read our love story") {
        return `We met at OFO, katong time na nangita kog kadula ug minecraft (na hantod karon wajuy kadula minecraft hehe). Ni chat ang bot sa OFO, so ning reply ko kasi malay mo tig dula sad diay kag minecraft HAHAHA. Nya igo raka ning hello, wako kabalo what ako e say so nangayo nalang kos ig nimo pang dagdag mutuals kasi imo bio “ig moots” man. I never planned to chat you balik after ug add, nya tuloy akong pagpangita ug kadula sa minecraft (FYI, wakoy kachat sa OFO ato) . Then suddenly, ni chat ka “Photographer kapo ba te????”. Tbh, ikaw ang first ni compliment sako photos na gina capture, so medjo na touch ko HAHAHA. But anyway, I thought you’d be my online friend lang. <br><br> You were so sweet and fun to talk to that day, baby. I felt so comfortable with you dayun ever tho I just met you. I also loved how you told me na sa umpisa palang comfy nakas ako hehe. When I first talked to you baby, you seemed like the sweetest person (karon maldita na kaayo HAHAHA). Nya shock kos part nga ni say kag “I’ll update you nalang po tomsieee” but I didn’t think much of it kay syempre I just met you and I thought straight ka ihh. And then came your pa dungog dungogs, till ni confess ka una through poem. <br><br> You were so easy to talk to baby. One thing that really got me to fall for you was how you really wanted to make time for me. Like I was aware of how busy you were ato, and when you get home kay I know tired ka. But despite all that—bisag tired nakayka—di  gihapon ka mo rest, hantod sa makatulgan ko nimo. Didto ko na touch baby, bisag tired kayka po you still spent time with me. Didto nako na feel na murag ako imo pahinga hehe. <br><br> Despite all that, nahadlok gihapon ko ato baby. Since you know bag-o rako naka hawa sa ako past relationship ato, and I was scared na ma hurt balik—so I left. I regretted that so much, but I’m forever grateful na gihatagan ko nimo ug second chance baby. I really loved you, and I was overwhelmed with my feelings. I was scared of commitment, but you made me risk everything. We weren’t official pa ato, and you tried to make it official buttt I wanted it to be special and wanted to bawi.  Soooo, here’s how we made it official. No regrets since then, YOU’RE THE BEST THING THAT’S HAPPENED TO ME. <br><br> I love you so much, my baby. I’m forever grateful I met you.`;
    } 
    else if (topic === "When you want to hear the songs that remind me of you") {
        return `There are so many songs that make me think of you, and sometimes it feels like the universe made them just for you/us baby. When you listen to them, I hope you feel the way my heart smiles for you, the way my soul softens when I think of you, and the way my love wraps around you even when I can’t. Whenever you hit play, imagine me thinking of you, singing the words softly in my head as if I’m dedication them directly to you. I hope these songs makes you smile, make you feel loved, and make you remember that no matter where I am, my heart in always yours baby. I made this playlist for you because sometimes songs can say the things my heart feels but I can’t explain in the right way. Every song in the playlist remind me of you—some because the lyrics describe how much I love you, and some because the sound makes me think of the moments we’ve shared. I want you to listen to these songs whenever you miss me or just want to feel close to me, because I chose them carefully with you in mind hehe. They’re not just random songs po; each one carries a memory, a feeling, or a part of my love for you. <br><br> I hope that when you press play, it feels like I’m right there beside you. I want the songs to comfort you on hard days, make you smile on good days, and always remind you that you’re special to me. This playlist is my way of giving you something that lasts, something you can return to anytime. No matter how far apart we are, I want the music to remind you that you’re always in my thoughts. I love you so much, my baby. <br><br> <center><a href="https://open.spotify.com/playlist/4LtmUY21BlIlIE5gpdWwoZ?si=c840c3f03c4845c4&pt=ed64539163eae5a0ffc37378d9606382" target="_blank" class="letter-btn"><i class="fas fa-music"></i> Listen to Playlist</a></center>`;
    } 
    else if (topic === "When you’re bored and want my attention") {
        return `You want my attention baby? Spamm meeeeee, call meeeee. You’re free to do so, omkie? No matter where I am or what I’m doing, don’t hesitate baby. Don’t be shy or scared to, omkie? I love giving you my attention, they’re always yours. I’ll always be happy to share a time with you. Time with you is never boring. You’re not and will never be a bother to me haa. If anything, it makes me happy to know that when you’re bored, the first person you think of is me hehe. If I’m busy or doing something, spam me pleaseee. I love it when you’re clingy. I LOVE YOU, AND I WANT ALL OF YOU BABYYYY`;
    } 
    else if (topic === "When you want a surprise from me") {
        return `My baby wants surprises??? I’ve got a whole bunch for youuu hehehe. This letter is the first surpriseee! <br><br> I want you to know that even in the moments you least expect it, I’m always thinking of ways to make you smile baby. Surprises don’t always have to be big; sometimes, it’s just about giving you something that reminds you how much I love you. And right now, this message is my way of sayingggg: surprisee, baby—you’re super duper loved beyond words by your girlfriend. <br><br> I know you love little things that make you feel special, so I wanted this to be one of them. I wish I could surprise you personally but due to reason you already know, I cant :(. Sooo, I’ll find other ways to surprise you my baby. But tbh, you’re already my biggest surprise lovelove. I never expected to love someone the way I love you, and I want to spend every day with you. My love itself is already a gift for you baby, one the I’ll keep giving to you again and again. And trust meee, I’ll always look for new ways to surprise you (balag di ma surprise fully kay ug mag make kog surprise, ma excite ko nya ma spoil nako nimooo HAHAHAHA). <br><br> I LOVE YOU MORE THAN YOU’LL EVER KNOW, I LOVE YOU MORE THAN I COULD EVER EXPRESS. I’m so thankful to call you mine. One day, I’ll make sure to give you even bigger surprises—the kind you’ll never forget. But until then, I hope this simple one reminds you that you are the most special part of my life, and I’ll never stop finding ways to show it. <br><br> <center><a href="https://drive.google.com/drive/folders/1OAyYXORGxafxEAkHVjAiZ0XlFfXqGi2p?usp=sharing" target="_blank" class="letter-btn"><i class="fas fa-gift"></i> Open Surprise</a></center>`;
    } 
    else if (topic === "When you want to remember our happiest moments") {
        return `Do you remember when we were playing roblox baby? Katong 2 player spider web baa hehehe. For me, that was one of our happiest moments. We were so happy playing together, we were filled with endless laughters kay sige kag katagak HAHAHA. You’re so cutie baby kay straight kaayo imong pag jump but mo hiwi HAHAHAHA, total hiwi man pud ka hehe. I love watching our video ato, bahalag saba kayta (mostly ako HAHAHA), we were happy. You looked so happy, and I’m so happy na happy kas akoa hehehe. I love it when I’m the reason you’re smiling, laughing, or simply just happy. I want to make you happy for the rest of our lives, if you would let me. I really love you, my baby. <br><br> One of our happiest moments for me as well is when you officially became my girlfriend.  I can still remember how my heart was racing, like super kulba kaayo ko ato I don’t know why hehehe. I can still remember how I couldn’t stop smiling, how everything around me suddenly felt so much better. Like ni stop ang world just to let me take in how lucky I was to have you say “yes.” That moment will forever be etched in my heart baby. I remember the mix of emotions na ako na feel ato—nervousness, excitement, and pure happiness—all at once. The second you said yes, it felt like all the weight I didn’t even realize I was carrying just disappeared. You made me feel like the luckiest person alive baby, and in that exact moment, I knew that life was about to change for the better. Because from then on, I had you—my future wife, my home, and my favorite person. <br><br> Don’t sungog me ani haa HAHAHAHAHA, but another one was when I first hear you moan. It wasn’t just the sound baby hm, it’s also about what is meant. It showed me how much you trusted me, how open and vulnerable you were willing to be with me, even from from away po. That kind of trust is rare you know, and it made me realize just how deep our bond really is baby. You weren’t just sharing a sound lovelove—you were sharing a part of yourself that not everyone gets to see or hear. You know ba, that moment also made me feel wanted, needed, and loved in a way that words can’t fully explain. But yeah, hot kayka HEHEHE. I LOVE YOU MY BABY, THANK YOU SO MUCH FOR TRUSTING ME.`;
    } 
    else if (topic === "When you want to know what I’m thinking of you right now") {
        return `Yk ba baby, I think of you a lot—more than I even realize sometimes. You just appear in my thoughts out of nowhere, and suddenly I catch myself smiling (gara kayka). It could be something small that reminds me of you, like every time I see the color pink, when I’m listening to a love song, or even just a moment when I wish you were beside me. <br><br> When I think of you, I think about how lucky I am to have someone like you in my life. You make everything baby, yk that ba? I always think about how much I love you, it sometimes hurts. I really do love you, and I can’t bear losing you. Even when I’m busy or tired, you still cross my mind—and the thought of you always gives me comfort. You made me realize that love doesn’t always need to be loud to be real. Sometimes it’s just there, quietly staying. <br><br> I also think about how much I miss you. Being far from you isn’t easy baby, but every time I imagine your voice, your laugh, or how you talk to me, it feels like you’re here. I wonder what you’re doing, if you’ve eaten, if you’re smiling right now. I think of how I’d hold you if I could, how I’d look at you and tell you how much I love you—not through a screen, but in person. <br><br> Right now, what I’m really thinking is this: I love you. I always do, baby. Whether it’s day or night, busy or quiet, fighting or not, my mind always finds its way back to you. You’re my favorite thought, my baby—the one that never gets old, the one that always makes my heart feel loved and full. I love you so muchiee pooo my big baby! <3`;
    }
    else if (topic === "When you need a reminder of how much I love you") {
        return `I love you more than I can ever say in words, baby. I love you in the simple moments, like when we’re just talking about random things, and in the quiet moments, when we don’t have anything to say. My love for you isn’t just something I say; it’s something I feel every single day, in every little thing I do. I love you for who you are baby—for your cutie laugh, your pretty smile that shows your adorable dimples, the way you care and love, your lovely singkit eyes when you cry, and even the things  that make you ulaw. I love your teeth kay mura kag naay fangs baby and it’s unique, I love how you soften when I tell you I love you and I miss you, I love how you pout when you feel like crying (you’re so cutie), I love how you roll your eyes at me (but ibang eye roll gusto ko soon hehehe). I love you the way you are baby, you don’t have to change a single thing. Just keep being you, because I’ll always love you. <br><br> You’ve become the person I look forward to talking to at the end of the day, the one I always look for, the one I always want to share my thoughts with, and the one I want to make proud. You mean so much more to me than you’ll ever know, my baby. Even when we’re apart or when things get hard, my love doesn’t fade. It doesn’t change or weaken—if anything, it grows stronger. I know distance and time can make things tough, but please never doubt how much you mean to me baby. You’re always in my heart and in my mind, even when we’re not talking, even when everything’s quiet. My love for you doesn’t ever stop; it stays with you. <br><br> When you feel unsure, or when you just need to feel loved, come back to this, omkie baby? Let it remind you that no matter what happens baby, you have someone who loves you deeply, endlessly, and sincerely. You’re my person—the one I’ll always choose, again and again, no matter how far apart we are. You are my always, even from miles away.`;
    }
    else if (topic === "When you want to know how important you are to me") {
        return `Baby, I want you to really feel it as you read every word. You’re not just someone I talk to or spend time with; you’re someone who’s become a huge part of my life baby. Knowing you exist in my world makes everything better. You’ve given me so many reasons to smile, to keep going, and to be grateful. You’ve been so patient, and loving in ways I never expected someone could be. You matter to me more than I can ever fully explain, because you’re not just in my life—you’ve become a part of who I am. Every time I think of what makes me happy, your name is always there baby. <br><br> Even when we’re not talking, I still think about you. I wonder how you’re doing, if you’re okay, if you’re smiling. That’s how important you are to me po—you’re never really out of my thoughts. I love you so much in a way I never thought would be possible for me, and I’ll never take that for granted. You mean more to me than you realize, and I’m so thankful that I get to love you. Whenever I think about the people who make my life better, you’re always the first one who comes to mind. You make me laugh when I don’t feel like smiling, and you make me feel safe just by being you. You’ve shown me what it means to be cared for and understood, even from miles away. You’re not “just” my girlfriend—you’re my person, my comfort, my peace, and my favorite everything baby. You’ve changed my days in ways no one else ever could, and for that, I’ll always be thankful. <br><br> You’re important to me because you make me feel things I didn’t think I could feel—the kind of love that makes the world seem softer. You remind me that love doesn’t need to be perfect, it just needs to be real. I think about you when I wake up, when I go to sleep, and in all the little moments in between. That’s how much space you take up in my life baby—and I wouldn’t have it any other way. When you start to doubt how much you mean to me, come back here baby. Read this again hm and remember that you are loved, appreciated, and really important to me. You are the reason I smile randomly, the reason I try to be better, and the reason I believe in something as strong as love. You’re not just part of my world—you are my world. <br><br> If I could list the reasons why you matter to me, I’d never finish. You are, and will always be, the best thing that ever happened to me.`;
    }
    else if (topic === "When you don’t feel loved") {
        return `Awwhh, why doesn’t my baby feel loved? :( Please don‘t hesitate to tell me how you feel baby hmm? No matter what po, even when we’re fighting, tell me, omkie? I’ll always listen to you, my baby. I’ll always assure you, I’ll always be there to remind you that you are always loved, so much. I know those moments can be hard baby—when everything feels heavy, and it seems like no one cares or sees how much you’re trying. But please, baby, I need you to remember this: you are loved. Deeply. Fully. Always. Even when you can’t feel it, my love is still there. Tell me right now baby, haa? I’ll do anything to make you feel loved, always. <br><br> You don’t have to do anything to earn my love, baby. You don’t need to be perfect, or happy, or okay all the time. I love you just as you are—even on your bad days, even when you’re cold, even when you feel like you’re hard to love. You’re not. You are one of the easiest people to love baby, and I’ll never stop reminding you of that. Sometimes, my love doesn’t always feel loud or obvious. It’s in the little things baby—the way I check on you, the way I listen, the way I stay. So even if you can’t see it right now, please believe me when I say: you are so loved, not only by me, but by the people around you baby. <br><br> I love you in every version of you baby—happy, sad, tired, lost, overthinking, quiet. My love isn’t something that fades when you’re struggling; it’s something that stays, that holds you when you feel like you’re falling apart. You could be silent for hours, and I’d still care for you the same. You could cry your heart out, and I’d still see someone so worth loving. I love you in the way I wait for your messages, the way I think of you before I sleep, the way my heart softens every time I remember you. My love is in the words I say and even in the ones I don’t. Even from far away, I want you to feel that love—the kind that doesn’t ask for anything, that doesn’t go away, that just stays with you, reminding you that you matter baby. <br><br> When you feel unloved, come back here and breathe, omkie baby? Read this slowly. Read this again and again until you believe it. You are loved—by me, by the universe, by the parts of life that brought us together. You are worth every bit of care, every ounce of affection, every kind of love there is. And if ever you forget, let this message be proof that someone out there—me—loves you endlessly, with no breaks, no limits, no “what ifs.” Always. <br><br> If only you could see yourself through my eyes, you’d never doubt how loved you are. You are not alone, not forgotten, and never unloved.`;
    }
    else if (topic === "When you feel like I don’t care") {
        return `I do. I always will. Did I do something that made you feel like I don’t care, baby? Please tell me right away hmm, I’ll listen po. I won’t ever invalidate your feelings. Your feelings are always valid, omkie? Tell me so I can tell you how much I care about you. Caring about you is something I do every single day, even when I don’t always show it the right way. I know there are times I get cold, or tired, and it might seem like I’m distant or not paying attention. But please believe me when I say I always care. Even when you can’t feel it—I do baby, I really do. <br><br> You know ba? I think about you while I’m busy. I smile when I see your name on my screen. I replay our memories when I can’t sleep. I always pray for you. Caring for you has become a part of my daily life—it’s like breathing baby. I may not say it every second, but it’s there. I know you deserve reassurance, especially when distance makes everything feel uncertain baby. You deserve to feel wanted, noticed, and loved—and I want to be better at showing that. So if you ever feel like I don’t care, come back to this and remember baby: I’m still here. I still choose you. I still care in ways that maybe don’t always reach you right away, but I promise, they’re always there baby—constantly. <br><br> You are someone I don’t just love baby—I value you. You’ve become a part of my world that I can’t imagine being without. So even on days when I’m cold, when I take too long to reply, or when I seem distant—please don’t doubt me. I care, baby. I always have, and I always will. I love you so much.`;
    }
    else if (topic === "When you’re worried I might leave you") {
        return `I’m not going anywhere, baby. I know sometimes it feels like I’m slipping away, like my messages sounds off, but that doesn’t mean I’m giving up on us or losing interest in you. I haven’t changed my mind, I haven’t stopped caring baby. I’m human lang baby, I get tired, I overthink, I shut down sometimes. But even then, I still think of you. You’re not easy to forget, and I don’t ever want to. I’m still here choosing you every day even when things get hard or when we don’t understand each other. <br><br> There will be days when we both feel unsure, when we question if we’re still enough for each other. That’s normal, omkie baby? Every bond goes through moments like that, especially when distance, life, or pressure gets in the way. You don’t have to doubt my place in your life because I want to be here. I know your mind can get loud sometimes, and I know fear can make you feel like love disappears easily. But mine doesn’t baby. I don’t love you only on good days or easy moments. I love you even when things feel messy, even when we’re tired, even when we don’t have the right words. If I ever go quiet, it’s not because I’m leaving baby—it’s because I’m still here, trying to breathe, trying to do things right, trying to stay instead of run. <br><br> You don’t have to be perfect to keep me baby. You don’t have to hide your fears or be strong all the time. I see you as you are, and I still want you. When your thoughts tell you that you’re too much or that I’ll wake up one day and be gone, I need you to remember this: I stay because I want to, not because I have to. Loving you is not a burden. Being here with you is not something I regret, okay? <br><br> If you’re reading this while your chest feels tight, please know I’m still choosing us. I’m still choosing you baby. Even if we argue, even if we don’t understand each other right away, even if things feel unsure for a moment—my care for you doesn’t disappear. I don’t leave at the first sign of fear hm. I don’t walk away just because things get hard. I stay, I learn, I try, for us. <br><br> You are not about to be abandoned, baby. You are not alone in this. I’m here baby, even when it doesn’t feel loud, even when it doesn’t feel perfect. I’m here because I love you, and because loving you is a choice I keep making—again and again.`;
    }
    else if (topic === "When you wonder why I’ll never stop choosing you") {
        return `I choose you because loving you feels honest, baby. It doesn’t feel forced or rushed or temporary. It feels like something I want to protect, something I want to grow with. I don’t choose you because you’re perfect hm? I choose you because you’re real, because you show up as yourself, and because my heart feels safe when it thinks of my baby. <br><br> I choose you on days when you’re happy and laughing, and I choose you on days when you’re quiet and hurting. I choose you when things feel easy, and I choose you when things feel confusing. My choice isn’t based on moods or moments baby. It’s based on care. It’s based on wanting to stay, even when staying takes effort. <br><br> I choose you because you matter to me. Your thoughts matter. Your fears matter. Your softness matters. Even the parts of you that think they are too much or not enough—those parts don’t scare me away. They make me want to understand you more, to hold you more gently, to be patient when your heart feels tired. <br><br> I choose you because love, to me, isn’t about leaving when things get heavy. It’s about showing up, listening, and trying again. It’s about learning how to love you better instead of giving up. Even when I don’t have all the right words, my choice stays the same. <br><br> So why do I never stop choosing you? Because my heart keeps pointing back to you. Because choosing you feels right. Because loving you isn’t something I plan to stop doing, never my baby.`;
    }
    else if (topic === "When you forget your worth") {
        return `Is my baby doubting herself again? :( Baby, pause for a moment and remember this: your worth has never depended on how much you do, how strong you are, or how little space you take. You are worthy simply because you exist baby. <br><br> You are worthy on days when you feel confident, and you are just as worthy on days when you feel lost. Your value does not disappear when you make mistakes or when you struggle to keep going. You don’t lose your worth because you’re hurting. You don’t lose it because you need reassurance. You don’t lose it because you feel afraid. <br><br> You matter more than you realize baby. The way you care, the way you feel deeply, the way you try even when you’re tired—those things are not small. They are proof of your heart. Even the parts of you that feel broken or unsure deserve love, and patience. Especially from yourself. <br><br> When your mind tells you that you’re not enough, I want you to remember this: you are not hard to love baby. You are not a burden hm? You are not replaceable, never. You bring meaning just by being you, my baby. The world is better because you are in it, even on the days you can’t see it. <br><br> So be gentle with my baby right now, please? You don’t have to earn your place. You don’t have to prove anything. You are already enough. You have always been enough baby. And nothing—not your fears, not your mistakes, not your worst days—can take that away from you.`;
    }
    else if (topic === "When you want to know my favorite things about you") {
        return `My favorite things about you aren’t the loud or obvious ones, well some. They’re the small moments you probably don’t even notice, and probably do. I love the way you care without being asked, the way your heart shows even when you try to hide it. I love how you feel things deeply baby, even when it makes you tired. That depth is part of what makes you, you. <br><br> I love the way you try. Even on days when you feel weak or unsure, you still try to show up po. You still think about me. You still love me gently. That effort, that strength, means more to me than you know. <br><br> I love when you open up, even when it’s scary. The way you share your thoughts, your fears, your hopes. It takes courage to be that real, and I never take that lightly. I love the way you trust me with your heart. So never be afraid to open up to me baby hm? Because I love that. <br><br> I love your softness. The way you can be gentle, the way you feel things so carefully, the way you want to be understood and loved. That softness isn’t something that needs fixing—it’s something that deserves to be protected hehe. <br><br> I love your maldita side. Even though maka pikon or sige kag pangaway, I still love that about you. Because you're showing me a side of you that's real. You don’t pretend to be calm or perfect just to be loved. You let me see your fire, your emotions, your truth—and I appreciate that more than you know. It makes me feel trusted, like I get to know the real you, not just the easy parts. <br><br> I love the way you make time for me. Even though you're with your friends, you still make time for me, you call me and tell me you miss me. That means so much to me than you know. It makes me feel important, remembered, chosen. It reminds me that even when life is busy, I still have a place in your heart. <br><br> I love how you’re not afraid to be yourself with me. Loud or quiet. Soft or strong. Happy or upset. You don’t hide who you are, and that makes me feel safe to be myself too. Loving you feels honest, not forced, not fake. <br><br> And honestly, one of my favorite things about you is that you’re you. Not perfect. Not always sure. Just real. The way you exist, the way your presence feels, the way my heart feels calmer just knowing you’re here—that’s something I won't ever take for granted. <br><br> I love you not just for the things you do—but for who you are when you do nothing at all. Just being you is already enough for me. I love you, not just for one thing. It’s the whole of you. Even the parts you doubt. Especially those parts.`;
    }
    else if (topic === "When you’re doubting if I love you enough") {
        return `If this thought ever crosses your mind, I need you to know this first: my love for you is not quiet because it’s weak. Sometimes it’s quiet because it’s steady. I don’t always show love in big dramatic ways, but I show it in staying, in choosing you again, in caring even when things are hard. <br><br> I love you in the way I think about you when you’re not around. In the way I worry about how you’re feeling. In the way I want to understand you instead of giving up. My love isn’t measured by how perfect I am or how I say things baby. It’s measured by how much I choose you, even on days when loving takes effort. <br><br> There are moments when I get tired, confused, or unsure of the right words—but that has never meant I care less po. It just means I’m human. My feelings don’t disappear when things get quiet or messy. They stay. I stay. <br><br> If you ever feel like my love isn’t enough, please remember this: I wouldn’t be here if I didn’t love you deeply baby. I wouldn’t try, I wouldn’t care, I wouldn’t stay. Loving you is not something I do halfway po. Even when I fall short, my heart is still in this. <br><br> My love may not always be loud, but it is real. It is patient. And it is yours, always baby.`;
    }
    else if (topic === "When you just want to feel special") {
        return `You are special baby, very, even on days when nothing feels exciting or new. You don’t have to do something big to deserve attention or love. Just being you already matters more than you think. The way you exist, the way you care, the way you feel things deeply—that alone makes you important to me. <br><br> In the way you listen. In the way you remember little things. In the way your presence can make my day feel lighter without you even trying. There’s something about you that can’t be replaced baby, something that no one else brings the way you do. <br><br> I want you to know that when I choose you, it’s not out of habit or comfort po. It’s because my heart notices you. It notices your effort, your softness, your strength. Even when you feel unseen or ordinary, you are never invisible to me hm? <br><br> You don’t have to compete with anyone baby. You don’t have to compare yourself to anyone else. The place you have in my heart is yours alone. No one else fits there the way you do. <br><br> You are loved, you are wanted, and you are deeply special to me—just as you are, right now, without changing a thing.`;
    }

    // CHAPTER 3
    else if (topic === "When you’ve had a bad day") {
        return `Awwhh, I’m really sorry today was hard on my baby. I know some days feel heavier than others, like everything just piles up at once. If today didn’t go the way you hoped, that doesn’t mean you failed hm baby? It just means you’re human, and you did the best you could with what you had. <br><br> You don’t have to carry today perfectly. You don’t have to explain everything or pretend you’re okay. It’s enough to just rest for a moment. Breathe baby. Let yourself feel tired without judging yourself for it baby. Bad days don’t erase all the good you’ve done or who you are. <br><br> I want you to remember that even on days like this, you’re still cared for hm. You’re still appreciated. You’re still loved, always. Today doesn’t get to decide your worth or your future. It’s just one day, and it will pass baby. <br><br> If you can, be gentle with yourself tonight hm? Do something small that brings you comfort baby. And if all you can do is get through the day, that’s already enough. I’m proud of you for making it here, my baby. You’re not alone in this, and tomorrow is another chance to breathe a little easier lovelove ko.`;
    }
    else if (topic === "When everything feels too heavy") {
        return `If everything feels like it’s pressing down on you right now, I want you to slow down for a moment baby. You don’t have to fix anything tonight, omkie? You don’t have to be strong or brave or okay. It’s enough to admit that things feel heavy. That alone already takes effort. <br><br> When the weight feels too much, it doesn’t mean you’re weak hm. It means you’ve been carrying a lot for a long time. It means you care deeply, you try hard, and you feel things fully. Anyone would get tired carrying that kind of load. <br><br> You’re allowed to rest baby. You’re allowed to pause. You’re allowed to put some of that weight down, even if just for a little while. The world won’t fall apart if you take a breath. You don’t need to have all the answers right now baby. <br><br> Please remember this: you don’t have to carry everything alone. Even when you feel like you should handle it by yourself, you don’t have to po ha. You matter enough to be supported, to be understood, to be held gently through hard moments. You matter to me, I'm here. <br><br> This feeling won’t last forever baby, even if it feels endless right now. Heavy moments come and go, but you are still here. And that means something. You are still trying. You are still breathing. That’s already more than enough for today. <br><br> Be kind to yourself baby. Speak softly to your heart. You don’t need to rush through this hm. One small breath, one small step, one moment at a time—you’ll get through this. And you don’t have to do it alone baby, I'm right here with you, always.`;
    }
    else if (topic === "When you’re mentally exhausted") {
        return `If your mind feels tired and slow, like it’s been running for too long without rest, I want you to know that it makes sense baby. You’ve been thinking, worrying, trying, and holding things together for a while now. Anyone would feel worn out from that po. You’re not failing—you’re just tired. <br><br> You don’t need to push yourself right now baby. You don’t need to be productive or strong or positive. It’s okay if your thoughts feel messy or if you can’t focus the way you want to. Mental exhaustion doesn’t mean you’re broken. It means your mind needs kindness, not pressure. <br><br> Give yourself permission to rest without guilt. Resting doesn’t mean giving up. It means taking care of yourself so you can keep going later. Even doing nothing for a moment is still doing something good for yourself. <br><br> Please be gentle with the way you talk to yourself tonight. You wouldn’t be harsh to someone you love who’s exhausted—so don’t be harsh to yourself. You’ve already done enough for today. <br><br> This tired feeling won’t last forever. Your mind will feel lighter again, even if it doesn’t feel close right now. For now, it’s okay to slow down. It’s okay to just exist. You are still worthy, still cared for, still enough—especially on days when your mind is tired.`;
    }
    else if (topic === "When you feel like giving up") {
        return `Baby, if you’re at the point where everything feels pointless and you’re so tired of trying, I need you to pause for a moment po ha, don't think of anything negative. The fact that you’re still here, still breathing, still reading this, already means you haven’t given up baby. Even if your heart feels weak right now, it’s still beating. That matters, okay baby? <br><br> It’s okay to feel tired. It’s okay to feel like you don’t have the energy to keep fighting the same battles. But feeling like giving up is not the same as actually being done. Sometimes it just means you’ve been strong for too long without rest. <br><br> You don’t have to solve your whole life tonight. You don’t have to fix every problem or decide everything at once. Just focus on one small thing. One breath baby. One hour. One simple step. That’s enough for now hm. <br><br> Please don’t forget how far you’ve already come baby. There were days before this that felt impossible too, and somehow you made it through diba? Maybe not perfectly. But you made it. That strength is still inside you, even if it feels quiet. <br><br> And if what you really need right now isn’t strength but comfort, then let yourself have that baby. You are allowed to lean on someone, to lean on me. You are allowed to ask for help. You don’t have to carry this alone, you have me. <br><br> This moment does not define your whole story hm. It’s a chapter, not the ending. Stay, please. Rest if you need to. Cry if you need to. But don’t disappear, please. The world is better with you in it baby, even if you can’t see that right now. And I’m still here, believing in you until you can believe in yourself again. I'm here for you always, I will catch you when you fall.`;
    }
    else if (topic === "When you need motivation") {
        return `Baby, you don’t need to feel inspired to start. You just need to start small. Motivation doesn’t always come first. Sometimes it shows up after you take one tiny step. <br><br> You are more capable than you think hm. You’ve handled hard days before. You’ve learned things you once thought you couldn’t. Growth doesn’t happen in big moments all the time. It happens in quiet effort. In choosing to try again. In getting up even when you don’t feel ready. <br><br> Don’t compare your pace to anyone else’s hm. Your journey is yours. Even slow progress is still progress. Even one small task done today is a win. One page. One message. One step forward. That’s enough baby. <br><br> You don’t have to be perfect to move forward. You don’t have to have everything figured out. You just need to believe that you’re allowed to try. And you are. <br><br> Take a breath baby. Do one thing you’ve been putting off. Just one lang. Let that be your proof that you’re still moving. You’re not behind. You’re not incapable. You’re growing—even now, even slowly. <br><br> And I believe in you. Even on the days you don’t believe in yourself. I love you.`;
    }
    else if (topic === "When you need a gentle reminder") {
        return `Are your thoughts getting a little loud again, baby? Maybe you’re being hard on yourself. Let this be your pause. <br><br> You are doing better than you think baby. Not perfectly. Not flawlessly. But honestly, and that counts. You wake up and you try. Even on days when you feel tired or unsure, you still try. That matters more than you give yourself credit for. <br><br> You don’t have to have everything figured out right now hm. Life isn’t a race with a timer above your head. It’s okay to move at your own pace baby. It’s okay if your progress looks small. Small steps still move you forward. <br><br> You are allowed to rest without feeling guilty. You are allowed to say no. You are allowed to protect your peace. Being kind to yourself is not selfish ha. It’s necessary. <br><br> And please remember this: one bad moment does not erase all the good in you baby. One mistake does not cancel your worth hm. One hard day does not define your whole story. <br><br> Breathe slowly baby. You’re not behind. You’re not failing. You’re just human. And that’s more than enough.`;
    }

    // CHAPTER 4
    else if (topic === "When you’re feeling lonely") {
        return `I want you to know that loneliness doesn’t mean you’re forgotten. It doesn’t mean you don’t matter, baby. It just means your heart is craving connection. And that’s normal. <br><br> Even when you’re alone in a room, you are not invisible baby. You are not someone who fades into the background. You are someone who leaves marks on people’s lives—my life—even if you don’t always see it. There are memories you’ve made, conversations you’ve had, small moments where you made someone smile—you made me smile. Those things are real. <br><br> Loneliness can trick you into thinking you don’t have anyone. But needing comfort doesn’t mean you have no one hm. It just means you need to feel close again. And that’s okay baby. <br><br> If I were with you right now, I’d sit beside you quietly. No pressure to talk. No need to pretend you’re okay. Just presence. Just warmth. Just knowing you don’t have to sit with that heavy feeling by yourself. <br><br> This feeling won’t last forever hm. It may visit sometimes, but it doesn’t get to stay permanently. You are worthy of connection. You are worthy of being understood baby. And even in moments when you feel alone, you are still deeply cared for, by me.`;
    }
    else if (topic === "When you’re missing me") {
        return `Awwhh, I miss you more my baby. <br><br> If I’m not beside you, it doesn’t mean I’m far from your life hm. You’re still in my thoughts in small, quiet ways. Sometimes something reminds me of you and I smile without even trying. Sometimes I wish I could tell you something right away, just because I want you to be part of my day baby. <br><br> Distance, time, or silence can’t erase what we have hm. Missing each other is just proof that our presence means something hehe. It means we’ve built something that feels safe and important. <br><br> If your chest feels a little tight and you wish I was there, imagine me thinking of you too. Imagine me wanting to hear your voice, wanting to see your smile, wanting to close that space between us. <br><br> I may not always be there physically, but I will always care. I will always show up in the ways I can. And that kind of presence doesn’t fade.`;
    }
    else if (topic === "When you wish I was there") {
        return `I wish I was too, baby. I wish I could sit next to you, hold your hand, or just be quiet together. I know there are moments when you want my presence more than words. And I want you to know that wanting me there doesn’t make you weak. It just means you care, and I appreciate that baby. <br><br> Even if I’m not there physically, I’m still with you in the ways that matter. I’m with you in the way I think about you during the day. I’m with you in the way I hope you’re okay. I’m with you in the way I would drop what I’m doing just to listen if you needed me. <br><br> If you’re going through something hard, imagine me sitting beside you baby, letting you lean on me. If you’re happy and excited, imagine me smiling proudly next to you. I may not be able to show up in person, but my support is real and steady baby. <br><br> Distance doesn’t cancel care hm. Space doesn’t erase love. Just because you can’t see me there doesn’t mean I wouldn’t choose to be. <br><br> I’m not as far as it feels. And my heart is always leaning toward you.`;
    }
    else if (topic === "When you need a hug") {
        return `I wish I could give you one in person baby. The kind where you don’t have to say anything. The kind where you just breathe and let yourself relax for a moment. Some days you don’t need advice. You don’t need solutions. You just need to feel held, right? <br><br> If your chest feels heavy, let it soften baby. If your thoughts feel loud, let them quiet down for a second. A hug isn’t about fixing everything. It’s about reminding you that you’re not alone in it. <br><br> Even if I can’t be there physically, I hope you can feel this in your heart. I would hold you a little longer if you needed it. I wouldn’t rush you. I wouldn’t let go until you felt steady again. <br><br> Take a slow breath. Pretend my arms are around you. You’re safe in this moment. And you’re cared for more than you know. Virtual huggies for my baby. <br><br> <center><img src="https://i.pinimg.com/originals/23/f2/63/23f263940d5d2bb8e8eaeb3c128e748f.gif" style="width:100%; max-width:200px; border-radius:10px;"></center>`;
    }
    else if (topic === "When you have something to say but can’t") {
        return `If there are words sitting in your chest but you can’t let them out, that’s okay baby. Not everything comes out easily. Sometimes feelings get stuck. Sometimes you don’t even know how to explain what’s going on inside you. That doesn’t mean your thoughts don’t matter hm. <br><br> You don’t have to force yourself to speak before you’re ready. Take your time. Your feelings are not a burden baby. Your silence is not annoying. If you need space to find the right words, I’ll wait okay? <br><br> And if you’re scared of how I might react, please know this: I would rather hear the messy, unsure version of your truth than have you carry it alone baby. You don’t have to say it perfectly. You don’t have to organize it nicely. Just say it the way it comes hm. I care more about understanding you than judging you. <br><br> If the words feel too heavy to say out loud, start small. A simple “I don’t know how to explain this” is enough baby. A quiet “Can you just listen?” is enough. You don’t have to do it alone. <br><br> Whatever it is, I want to hear it. Even the hard parts. Especially the hard parts. Your voice matters, even when it shakes baby.`;
    }
    else if (topic === "When the distance feels too much") {
        return `Distance can make everything feel louder baby, I know. The silence feels longer. The waiting feels harder. And sometimes it feels unfair that we can’t just reach out and close the gap. <br><br> But distance is only space. It’s not the end of us ha. It doesn’t erase the care, the memories, or the way we choose each other. If anything, it shows how strong we are for still holding on even when it’s not easy baby. <br><br> I know there are moments when you wish I was right there. When you wish you could just sit next to me without a screen or a call. I wish that too baby. More than you think. But even when miles are between us, my heart still leans toward you. <br><br> The distance doesn’t change how I feel hm. It doesn’t make me care less. It doesn’t make me forget. It just means we have to be a little more patient, a little more intentional, a little more brave baby. <br><br> This space won’t last forever, okay? And even while it’s here, it doesn’t get to win. We are still choosing each other. We are still here baby. And that matters more than the miles in between.`;
    }
    else if (topic === "When you want to feel close to me") {
        return `You can always tell me when you need to feel closer baby. I won’t think it’s too much. I won’t push you away. I want to know when your heart needs extra attention. <br><br> Even if we’re not in the same place, we’re still sharing something real hm. And when you want to feel close to me, just know this: my heart is already leaning toward yours. <br><br> <center><a href="https://drive.google.com/drive/folders/1te5M2wQK5ISNM4Q9fosUsJLoTGqjxwrK?usp=sharing" target="_blank" class="letter-btn"><i class="fas fa-folder-open"></i> Open Link</a></center>`;
    }

    // CHAPTER 5
    else if (topic === "When you feel like crying") {
        return `If your eyes are starting to sting and your chest feels tight, don’t fight it baby. Crying doesn’t mean you’re weak, okay? It doesn’t mean you lost control. It just means your heart is full and needs a way to let some of it out. <br><br> You’ve probably been holding a lot inside. Maybe you tried to stay strong. Maybe you told yourself it wasn’t a big deal. But feelings don’t disappear just because we ignore them. They stay until we let them move through us. <br><br> So if you need to cry, cry baby. Let the tears fall. You don’t have to look pretty. You don’t have to explain yourself. You don’t have to apologize for feeling deeply. Your emotions are not something to be ashamed of hm. <br><br> If I were there, I wouldn’t rush you to stop. I’d just sit beside you. Maybe hold your hand. Maybe wipe your tears gently. I’d remind you that it’s okay to feel this way. <br><br> Crying is not the end of you baby. Sometimes it’s the beginning of relief. Let it out baby. Breathe through it. And when you’re done, you’ll still be here. Still strong. Still worthy. Just a little lighter than before.`;
    }
    else if (topic === "When you’re crying") {
        return `If tears are already falling while you’re reading this, it’s okay baby. You don’t have to stop them. You don’t have to be strong right now. Let yourself feel it hm. <br><br> I know sometimes you try to hold everything in. You try to stay composed, to not make a scene, to not seem “too emotional.” But your tears are not a problem baby. They are proof that your heart feels deeply. And that is not something to be ashamed of. <br><br> Whatever made you cry matters. Even if it feels small to someone else. Even if you can’t fully explain it. If it hurt you, then it’s real. <br><br> I wish I could be there to hold you. I wouldn’t rush you. I wouldn’t tell you to calm down. I’d just stay. I’d let you cry as long as you needed. I’d remind you that this moment doesn’t define you. <br><br> You’re not weak for crying. You’re overwhelmed. You’re tired. You’re human. And you are still worthy of love even with tears on your face baby. <br><br> Breathe slowly, okay? Inhale. Exhale. Let your body settle little by little. The wave will pass. You can always lean on me.`;
    }
    else if (topic === "When something’s bothering you") {
        return `If something is sitting heavy in your chest right now baby, don’t ignore it. If it’s bothering you, then it matters, okay? You don’t have to convince yourself it’s “not a big deal.” Your feelings don’t need permission to exist. <br><br> Maybe you’re overthinking. Maybe you’re hurt. Maybe you’re just uncomfortable and can’t explain why. That’s okay baby. You don’t need to have perfect words for it. You don’t need to sort it out alone before bringing it to me po ha. <br><br> If something I did or said bothered you, I would rather know than have you quietly carry it. I care more about understanding you than being right. You’re not difficult for speaking up baby. You’re not dramatic for feeling deeply. <br><br> And if it’s something else bothering you, you don’t have to face it by yourself. You can tell me. Even if it comes out messy. Even if it doesn’t make full sense yet. <br><br> What you feel is important because you are important baby. Don’t shrink your emotions just to keep the peace. Let’s handle it together instead of letting it sit between us, okay? <br><br> Whatever it is, I’m here to listen.`;
    }
    else if (topic === "When you’re overthinking") {
        return `If your mind is running in circles right now, pause for a moment baby. Take one slow breath. Overthinking can make small things feel huge. It can turn silence into fear. It can turn “maybe” into “what if everything goes wrong.” <br><br> But not every thought is a fact, okay? <br><br> Your mind is trying to protect you. It’s trying to prepare you for hurt before it even happens. But sometimes it creates stories that aren’t real. Sometimes it fills in blanks with the worst possibilities. <br><br> Before you believe those thoughts, ask yourself gently: Do I know this for sure? Most of the time, the answer is no baby. <br><br> If you’re overthinking about me, please remember this: if something is wrong, I will tell you. You don’t have to search for hidden meanings po. You don’t have to read between lines that aren’t there. I’m not secretly pulling away, okay? I’m not keeping score. I’m here baby. <br><br> It’s okay to feel anxious. It’s okay to need reassurance. Just don’t let your thoughts bully you into believing you’re not enough or that everything is falling apart. <br><br> Right now, focus on something real. The feeling of your feet on the floor. The sound around you. The air going in and out of your lungs. Come back to the present. <br><br> Your thoughts are loud, but they are not always true. And you don’t have to fight them alone. I'm willing to listen, always.`;
    }
    else if (topic === "When you feel like I don’t understand you") {
        return `If you ever feel like I’m not getting you, like I’m missing something important about how you feel, I want you to know that it’s not because I don’t care baby. Sometimes I may not understand right away. Sometimes I might respond the wrong way. But that doesn’t mean I don’t want to understand po. <br><br> You are not “too complicated.” You are not “too much.” You just feel deeply, and sometimes that depth takes time to learn. And I am willing to learn you baby. <br><br> If I misunderstand you, please don’t close yourself off. Help me see what I’m missing, please. Tell me what it feels like from your side. Even if your voice shakes. Even if you’re scared I won’t get it. I would rather try again than have you feel alone next to me po. <br><br> Understanding doesn’t always happen in one conversation. Sometimes it takes patience. Sometimes it takes listening more than talking. But I promise you this: I care enough to try baby. <br><br> If you ever feel unseen, tell me hm? If you ever feel unheard, tell me. I don’t want you to shrink your feelings just because I didn’t catch them the first time. <br><br> You matter to me. And understanding you isn’t a burden. It’s something I want to keep working on.`;
    }
    else if (topic === "When you don’t know why you’re sad") {
        return `If your chest feels heavy and your eyes feel wet, but you can’t explain why, that’s okay baby. You don’t always need a reason to feel sad. Emotions don’t always come with explanations. Feeling low doesn’t make you weak, and it doesn’t mean something is wrong with you. <br><br> Sometimes your heart is just tired. Sometimes your mind is storing things you didn’t even notice. Sometimes it’s a quiet signal that you need care, rest, or gentleness. You don’t have to figure it all out right now hm. You don’t have to name it or fix it. You just have to feel it, and let yourself be. <br><br> You’re not alone in feeling this—even if it feels confusing, even if you don’t understand why. <br><br> Breathe slowly baby. Let the sadness pass through without judgment. It doesn’t define you. It doesn’t make you less, okay? And even when you feel heavy and quiet, you are still enough. You are still loved. And this moment will not last forever. I'll always be with you.`;
    }
    else if (topic === "When you feel like everything is falling apart") {
        return `I know how it feels when your world is breaking into pieces right know.. When one thing goes wrong and suddenly it feels like everything is wrong. When your chest feels tight and your thoughts start racing with “what now?” and “I can’t handle this.” <br><br> But listen to me gently baby: just because things feel out of control doesn’t mean your whole life is collapsing, okay? <br><br> When everything feels like it’s falling apart, it’s usually because too many things hit at once. Your mind gets overwhelmed. Your heart gets tired. And it starts to believe the worst. But this moment, as heavy as it feels, is still just a moment hm. <br><br> You have survived hard days before. Days you thought would break you. And yet here you are baby. Not untouched. Not unchanged. But still standing. <br><br> It’s okay if you don’t know how to fix everything. You don’t have to rebuild your whole world tonight baby. Just find one small thing you can control. One message. One task. One breath. When everything feels big, go small. <br><br> And please remember this po: you don’t have to hold everything together alone. You don’t have to be the strong one all the time. It’s okay to admit you’re overwhelmed. It’s okay to lean on someone, to lean on me. <br><br> Things may feel like they’re falling apart, but you are not falling apart beyond repair. You are human. You are tired. You are overwhelmed. And that is different from being broken, okay? <br><br> This storm will not last forever. And even in the middle of it, you are still here. I will always catch you when you fall apart. You are not alone in this, you have me.`;
    }
    else if (topic === "When you just want someone to listen") {
        return `Sometimes you don’t need answers. You just need space to speak without being corrected or rushed. <br><br> You can talk to me baby. <br><br> You don’t have to organize your thoughts. You don’t have to make it sound calm or reasonable. If it comes out messy, that’s okay hm. If you repeat yourself, that’s okay. If you cry in the middle of it, that’s okay too. <br><br> I won’t interrupt you just to prove a point. I won’t turn it into a lecture. I won’t make it about me. I’ll just listen, okay? <br><br> Your feelings deserve to be heard fully. Not minimized. Not compared. Not brushed aside. <br><br> And if you can’t even find the right words yet, you can start with something simple like, “Can you just listen?” That’s enough. I’ll understand baby. <br><br> You don’t have to carry your thoughts alone. Sometimes healing isn’t about advice. Sometimes it’s just about being heard. And I’m here for that, always.`;
    }

    // CHAPTER 6
    else if (topic === "When we’re fighting") {
        return `Baby, if we’re in the middle of an argument right now, and everything feels tense or sharp, I need you to remember this first: I am not your enemy, okay? We might be upset. We might misunderstand each other. But it’s still us, not me versus you po. <br><br> Fighting doesn’t mean I stopped caring. It doesn’t mean I’m secretly giving up. Sometimes it just means we both feel strongly and don’t know how to say it gently yet po. <br><br> I know words can come out wrong when emotions are high. I know silence can feel scary. But one hard conversation does not erase everything good between us baby. One disagreement does not cancel the love we built. <br><br> If I sound distant, it’s not because I want to lose you po ha. Sometimes I just need a moment to calm down so I don’t say something careless. I would rather pause than hurt my baby. <br><br> Even when we’re frustrated, even when we don’t see eye to eye, I still choose you. I still want to fix it. I still want us to understand each other instead of walking away. <br><br> If it feels messy right now, hold on please. We are allowed to disagree. We are allowed to feel. What matters is that we come back to each other after. <br><br> It’s still us baby. And I’m not going anywhere just because we’re having a hard moment, okay? I love you, I always do.`;
    }
    else if (topic === "When you’re jealous") {
        return `Don’t be ashamed of it, okay baby? Tell me. Jealousy doesn’t mean you’re crazy or insecure. It usually just means you care. It means something feels important to you, and you’re scared of losing it. <br><br> I don’t see your jealousy as something ugly hm. I see it as a sign that your heart wants reassurance. And that’s okay. You don’t have to pretend you’re unbothered just to seem strong. <br><br> But please remember this baby: I choose you. Not by accident. Not out of convenience. I choose you because I want you. No one else replaces what you are to me. No one else holds your place. <br><br> If your mind starts creating stories, pause for a second please. Ask me instead of assuming po ha. I would rather reassure you than have you silently spiral. You are not “too much” for needing comfort. <br><br> And if I ever do something that triggers that feeling, tell me. Not to fight. Not to accuse. Just to understand each other better. We’re on the same side baby. <br><br> Jealousy doesn’t scare me. Silence does. So talk to me, okay? Let me remind you that you are wanted, chosen, and secure with me.`;
    }
    else if (topic === "When I’ve hurt your feelings") {
        return `If I’ve hurt you, even in a small way, I need you to know that your feelings matter to me baby. I never want to be the reason you feel pain. And if I was careless, impatient, or didn’t think before I spoke, I’m really sorry. <br><br> Sometimes I don’t realize the weight of my words right away. Sometimes I respond from emotion instead of understanding. But that doesn’t mean I don’t care. It just means I’m still learning how to love you better. <br><br> Please don’t hide your hurt just to keep the peace po ha. If something I did made you feel small, unseen, or unimportant, I want to know. Not so I can defend myself—but so I can fix it po. So I can grow. <br><br> Hurting you is never my goal. Loving you is. And loving you means being responsible when I fall short. <br><br> You deserve to feel safe with me. You deserve to feel respected. If I broke that in any way, I’m willing to listen, to apologize properly, and to do better. <br><br> I care about you too much to ignore your pain baby.`;
    }
    else if (topic === "When you’re mad at me") {
        return `If you’re mad at me right now, I want you to know that it’s okay baby. You have every right to feel upset. Your feelings are valid, even if I don’t fully understand them yet. Being angry doesn’t mean you love me any less right? It just means something matters to you, and I respect that baby. <br><br> I’m not upset that you’re mad. I might feel sad if our connection feels strained, but I would never want you to hide your feelings just to protect me po. I would rather you be honest and tell me what’s wrong than keep it inside. <br><br> If I hurt you, even unintentionally, I’m sorry baby. I want to understand what I did and how it made you feel. I don’t expect you to forgive me instantly, but I want you to know that I care enough to listen and try to make it right. <br><br> Anger can feel heavy, but it doesn’t change my feelings for you. I’m still here. I’m still on your side baby. And I’m still choosing you, even when we fight or disagree. <br><br> Take the time you need to feel what you feel. When you’re ready, we’ll talk okay? And I promise to hear you fully, without rushing, without interrupting, and without dismissing your emotions. <br><br> You are important to me—mad or not. Always.`;
    }
    else if (topic === "When I’m being hard to handle") {
        return `If I seem difficult right now… if I’m moody, quiet, distant, or reacting in ways that don’t make sense, please don't take it the wrong way baby, it’s not because I don’t care about you. Sometimes I get overwhelmed. Sometimes I don’t know how to handle what I’m feeling, and it spills out the wrong way. <br><br> I know I’m not always easy. I know I can be stubborn, sensitive, or shut down when things feel too much. But even in those moments, I’m not trying to push you away po. I’m just trying to figure myself out. <br><br> You don’t have to “fix” me. You don’t have to carry my emotions for me. I just hope you can be patient while I sort through them po. And if I ever cross a line or hurt you because I’m overwhelmed, I want you to tell me hm. I don’t want my hard moments to make you feel small. <br><br> Being hard to handle doesn’t mean I don’t love you baby. It doesn’t mean I’m giving up. It just means I’m human and still learning how to manage my feelings better. <br><br> Thank you for staying calm when I can’t. Thank you for not walking away at the first sign of mess baby. I’m trying. Even when it doesn’t look like it.`;
    }
    else if (topic === "When you feel like we’re not okay") {
        return `If something feels off between us right now… if the energy feels different or the silence feels heavier, I want you to pause before your mind runs too far baby. One quiet moment does not mean everything is breaking, okay? <br><br> We won’t always feel perfect. We won’t always be in sync every second. That’s normal. Real connection isn’t about never having tension. It’s about choosing each other even when things feel unsure. <br><br> If you feel distance, talk to me. Don’t sit alone with the fear that we’re falling apart po. I would rather know what’s bothering you than have you quietly worry that we’re not okay. <br><br> Just because we hit a rough patch doesn’t mean we’re ending, okay? Just because a conversation felt awkward doesn’t mean love disappeared hm. Feelings can be heavy sometimes, but that doesn’t erase what we built. <br><br> I’m still here. I’m still choosing this. If something feels wrong, let’s fix it together instead of assuming the worst, okay baby? <br><br> We don’t have to be perfect to be okay. We just have to keep choosing each other baby.`;
    }
    else if (topic === "When you’re scared of losing me") {
        return `Baby, fear can be loud. It can make you believe things that aren’t happening. <br><br> I am not halfway here. I am not secretly preparing to walk away. I am here because I want to be. Because I choose you, baby. <br><br> Being scared of losing someone usually means they matter deeply to you. And that matters to me. But please don’t let fear convince you that something is ending when it’s not. One quiet moment, one bad day, one misunderstanding does not mean I’m disappearing. <br><br> If I ever feel unsure about something, I will talk to you. I won’t just vanish baby. You deserve clarity, not guessing games. <br><br> You don’t have to hold on tightly out of fear. I’m not something that slips away that easily hm. I stay because I care. I stay because I want to build, not run. <br><br> You are not about to lose me. I’m still here. And I’m still choosing you.`;
    }
    else if (topic === "When you don’t know what to do") {
        return `If we’re in the middle of tension and you feel frozen… if you don’t know whether to speak, stay quiet, defend yourself, or walk away for a bit, breathe first baby. You don’t have to react perfectly. Conflict isn’t a test you have to pass, okay? <br><br> It’s okay if you don’t always know the right words. It’s okay if you need a moment to sort through your thoughts. Silence doesn’t mean you don’t care. Sometimes it just means you’re trying not to make things worse. <br><br> When you don’t know what to do, choose something simple po: stay respectful. Stay honest. Stay open. Even saying, “I don’t know how to explain this yet, but I want to fix it,” is enough baby. <br><br> You don’t have to win. You don’t have to prove a point. The goal isn’t to defeat each other po. It’s to understand each other. We’re not on opposite teams. <br><br> If emotions feel too strong, it’s okay to pause and come back calmer hm. Taking space to breathe is better than saying something you’ll regret. <br><br> Conflict doesn’t mean we’re broken baby. It just means we’re two different people learning how to meet in the middle. And not knowing what to do sometimes? That just means you care enough to want to handle it right.`;
    }
    else if (topic === "When you feel like we can’t fix this") {
        return `If it feels too big right now… too messy, too painful, too far gone… calm down baby. Strong emotions can make problems look permanent. But most things feel impossible when we’re overwhelmed. <br><br> Just because it’s hard doesn’t mean it’s hopeless. <br><br> We might not know the solution yet. We might both be hurt. We might both be tired. But not knowing how to fix something right away doesn’t mean it’s unfixable, okay? It just means we need time, patience, and honesty. <br><br> Nothing meaningful is built without moments that feel shaky. Every close connection goes through days where it feels uncertain. What matters isn’t that we struggle. What matters is whether we’re both still willing to try. <br><br> If you’re scared that this is the end, talk to me before deciding that in your head baby. Don’t let fear close a door that communication could open po. <br><br> We don’t have to solve everything tonight. We just have to take one small step toward understanding instead of walking away. <br><br> If we both still care, there is something to work with. And as long as there’s care, there’s hope.`;
    }
    else if (topic === "When my words are too harsh or is hurting you") {
        return `If something I said cut deeper than I meant it to, I’m really sorry. I never want my words to be something that makes you feel small, unsafe, or unloved. Sometimes when I’m overwhelmed or emotional, my tone gets sharp before my heart can catch up. But that’s an explanation—not an excuse. <br><br> You don’t deserve to be spoken to in a way that hurts baby. <br><br> If my words made you question your worth or my care for you, please know that hurting you was never my intention. I care about you too much to want to cause pain. And if I did, I want to take responsibility for it. <br><br> Please don’t keep it inside just to avoid another argument. Tell me baby. Even if it’s uncomfortable. I would rather feel embarrassed for speaking harshly than have you silently carry hurt because of me. <br><br> I’m still learning how to handle my emotions better. I’m still learning how to speak with patience instead of reacting quickly. But I promise you this—I want to grow. I want to be someone whose words feel safe, not sharp. <br><br> You deserve gentleness. And if I failed at that in a moment, I’m willing to listen, apologize properly, and do better for you.`;
    }
    else if (topic === "When you feel like we’re drifting apart") {
        return `Distance in feeling doesn’t always mean distance in love. <br><br> Sometimes life gets loud baby. Sometimes we get tired. Sometimes we fall out of rhythm for a while. That doesn’t automatically mean we’re falling apart. <br><br> If you feel a shift, tell me please. Don’t sit alone with the thought that we’re slowly losing each other. I would rather know what feels different to you so we can adjust together. <br><br> Drifting only becomes permanent when we stop trying. And I’m still trying. I’m still here. I’m still choosing this. <br><br> Not every phase will feel intense or perfect. Some seasons are quieter. Some are heavier. But quiet doesn’t mean empty. It just means we might need to reach for each other a little more on purpose po. <br><br> If you’re scared we’re drifting, take my hand instead of letting go. Let’s talk baby. Let’s check in. Let’s close the space instead of assuming it’s too wide to cross. <br><br> We’re not lost. We might just need to steer back toward each other, okay?`;
    }

    // CHAPTER 7
    else if (topic === "When I’m jealous") {
        return `If I’m jealous baby, it's not because I don’t trust you po ha. Not because I want to control you. But because sometimes I get scared po. <br><br> Jealousy doesn’t mean I think you’re doing something wrong. It usually just means I care deeply and I’m afraid of losing what we have po. It’s not always logical. Sometimes it’s just my heart reacting before my mind can calm it down. <br><br> If I ever show it in the wrong way, I’m sorry po. I’m still learning how to say, “I need reassurance,” instead of letting it come out as attitude or silence po. <br><br> Please understand that when I feel jealous, what I really need is comfort. A reminder po. A small reassurance that I’m still chosen, still wanted, still important to you. <br><br> I don’t want jealousy to create distance between us. I want it to become something we talk about safely. I don’t want to accuse you po. I just want to feel secure with you baby. <br><br> If I seem a little off, don’t see it as me attacking you please? See it as me needing a little extra closeness. I’m not trying to control. I’m just trying to protect something I care about deeply po.`;
    }
    else if (topic === "When you know something’s bothering me") {
        return `If you can tell something’s off with me, you’re probably right po. I’m not always good at saying what’s wrong right away. Sometimes I need time to sort through my feelings before I can explain them clearly. <br><br> If I’m quieter than usual or a little distant, it doesn’t mean I’m pulling away from you po ha? It usually means I’m overwhelmed and trying not to react the wrong way. I don’t want my emotions to turn into something that hurts us po. <br><br> Please don’t assume the worst baby. And please don’t feel like you have to fix me immediately. Sometimes I just need patience. Sometimes I just need you to ask gently, “Do you want to talk about it?” and let me come to you when I’m ready. <br><br> If something you did hurt me, I promise I’m not keeping score po. I just need a moment to understand how I feel before I speak. I don’t want to say things out of emotion that I don’t fully mean. <br><br> What matters is this: if something’s bothering me, it doesn’t mean I love you less okay? It doesn’t mean I’m planning to leave. It just means I’m human and still learning how to handle my feelings in a healthy way po. <br><br> Your calmness, your patience, your gentle approach—those help more than you know baby.`;
    }
    else if (topic === "When I won’t open up") {
        return `If I’m quiet when something is clearly bothering me, please don’t think I don’t trust you baby. Sometimes I struggle to explain what I’m feeling. Sometimes I don’t even understand it myself yet. <br><br> When I don’t open up right away, it’s not because I don’t care po. It’s usually because I’m scared of saying the wrong thing, or making things bigger than they need to be. Sometimes I’m afraid of being misunderstood po. Sometimes I just need time to process. <br><br> Please be patient with me baby. <br><br> A gentle “I’m here when you’re ready” means more than pressure ever will po. I open up best when I feel safe, not rushed. When I know I won’t be judged or dismissed po. <br><br> If I stay quiet for a while, it doesn’t mean I’m pulling away po ha? It means I’m trying to sort through my thoughts so I can speak clearly instead of emotionally. <br><br> And when I finally do talk, even if it comes out messy, I hope you’ll listen with softness po baby. I don’t shut down because I don’t care. I shut down because I care too much and I’m trying to protect what we have po. <br><br> I may take time. But I don’t close my heart forever, hm?`;
    }
    else if (topic === "When I’m not okay") {
        return `If I tell you I’m fine but you can tell I’m not… you’re probably right. Sometimes “I’m okay” is just easier than explaining everything that’s going on inside me po. <br><br> When I’m not okay, I might get quiet. Or distant. Or a little more sensitive than usual. It’s not because I don’t care about you po. It’s usually because I’m trying to hold myself together without letting everything spill out at once. <br><br> Please don’t take my quiet moments as rejection. And please don’t think you did something wrong right away. Sometimes I’m just fighting battles in my own head po. <br><br> What helps the most isn’t pressure. It’s patience. A simple “I’m here” means more than a hundred questions. Knowing I can lean on you without being judged makes it easier for me to open up po. <br><br> When I’m not okay, I don’t need you to fix me. I just need you to stay po. To remind me gently that I’m not alone. That it’s safe to feel. That I don’t have to pretend. <br><br> I won’t always be strong. I won’t always know how to explain my emotions. But even when I’m not okay, I still care. I still choose you baby. And I’m still trying.`;
    }
    else if (topic === "When I’m being cold") {
        return `If I seem distant, short, or colder than usual, please don’t think I stopped caring baby. When I get cold, it’s usually because I’m hurt, overwhelmed, or protecting myself in the only way I know how. <br><br> Sometimes I shut down before I even realize I’m doing it. It’s like my heart puts up a wall because it feels too much at once. I don’t go cold because I don’t love you baby. I go cold because I’m scared of feeling too deeply or reacting in a way that could hurt us po. <br><br> If I’m being quiet or less affectionate, please don’t fight fire with fire po. A little warmth from you goes a long way. A calm tone. A soft “what’s wrong?” That helps me melt faster than you think po. <br><br> I don’t always know how to say, “That hurt me,” or “I’m overwhelmed,” in the moment. So it sometimes comes out as silence instead. I’m still learning how to express things better. <br><br> When I’m being cold, what I actually need is reassurance po. Patience. A reminder that we’re safe, that we’re okay, that you’re not giving up on me just because I’m having a hard moment. <br><br> I promise I’m not pulling away baby. I’m just trying to sort through my feelings without breaking what we have. <br><br> And even when I seem distant, my heart is still right there with you.`;
    }
    else if (topic === "When I’m mad at you") {
        return `If I’m upset with you baby, please know this first—I’m mad because I care. If you didn’t matter to me, your actions wouldn’t affect me the way they do. <br><br> When I’m mad, it might come out as silence. Or short replies. Or a little attitude. Sometimes I need space to cool down because I don’t want to say something I’ll regret. I never want my anger to damage us. <br><br> Being mad doesn’t mean I’m done po ha? It doesn’t mean I’m thinking about leaving. It just means something hurt me and I’m trying to process it. <br><br> Please don’t walk away from me when I’m angry po. Don’t assume the worst. Give me a little time, but stay close enough that I know we’re still okay. A simple, calm “Let’s fix this” means more than you think po. <br><br> I don’t want to fight to win. I want to understand and be understood po. I want us to solve it, not score points. <br><br> Even when I’m mad, I still love you. Even when I’m frustrated, I still choose you baby. My anger is temporary. My feelings for you are not, okay? <br><br> So if I’m upset, hold onto that truth—I’m not fighting against you. I’m fighting for us, omkie?`;
    }
    else if (topic === "When you hurt my feelings") {
        return `If something you said or did hurt me, please know I’m not trying to make you feel bad po. I’m not trying to blame you. I just need you to understand that I felt something real. <br><br> When my feelings get hurt, I might go quiet. I might overthink. I might act a little distant. It’s not because I want to punish you po. It’s because I’m trying to figure out why it hurt and how to explain it without making things worse. <br><br> I don’t expect you to be perfect man po. I know we’re both human. I just want to feel safe enough to say, “That hurt me,” without it turning into a bigger fight po. <br><br> When I open up about being hurt, please listen without defending yourself right away po. Even a simple “I didn’t mean to hurt you” or “I’ll do better next time” can make my heart soften so fast. <br><br> I don’t hold onto pain because I want to. I let go when I feel understood po. <br><br> If you hurt my feelings, it doesn’t mean I love you less, okay? It just means I care enough to want us to do better next time. <br><br> I don’t need perfection. I just need effort, honesty, and a heart that’s willing to meet mine halfway baby.`;
    }
    else if (topic === "When I’m ignoring you") {
        return `If I’m not replying the way I usually do, or I seem distant on purpose, please don’t think I stopped caring baby. When I ignore you, it’s rarely because I don’t love you. It’s usually because I’m overwhelmed, hurt, or trying to calm down before I say something I don’t mean. <br><br> Sometimes I go quiet because I don’t trust my emotions in that moment. I would rather step back than speak out of anger and cause more damage. Silence is not my way of punishing you po. It’s my way of protecting us while I sort myself out. <br><br> Please don’t chase me with anger baby. Don’t match my silence with more silence please. A gentle “I’m here when you’re ready” means more than pressure ever could. <br><br> If I’m ignoring you, it probably means I care too much and I’m scared of making things worse p. I don’t want distance between us. I just need a little time to breathe. <br><br> And when I come back, I hope you’ll meet me with calmness instead of resentment po. I promise I’m not disappearing. I’m just trying to handle my feelings in a way that won’t hurt what we have. <br><br> Even in my silence, my heart is still with you baby.`;
    }

    return `My Darling,\n\nI am writing this note because you are feeling "${topic}".\n\nClose your eyes, take a deep breath, and imagine me holding your hand right now. You are stronger than you know, and deeply loved.\n\nI'm right here with you.`;
}

function openLetter(topic) {
    if(Math.abs(currentDragOffset) > 0.1) return;

    const overlay = document.getElementById('letter-overlay');
    const titleEl = document.getElementById('letter-title');
    const bodyEl = document.getElementById('letter-body');
    const scrollContainer = document.querySelector('.letter-content-scroll'); 

    titleEl.innerText = topic;
    bodyEl.innerHTML = getLetterContent(topic);
    
    scrollContainer.scrollTop = 0; 
    
    overlay.classList.add('open');
}

function closeLetter() {
    document.getElementById('letter-overlay').classList.remove('open');
}

document.getElementById('letter-overlay').addEventListener('click', (e) => {
    if(e.target === document.getElementById('letter-overlay')) closeLetter();
});

function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const dEl = document.getElementById('days');
    const hEl = document.getElementById('hours');
    const mEl = document.getElementById('minutes');
    const sEl = document.getElementById('seconds');

    if(dEl) dEl.innerText = days;
    if(hEl) hEl.innerText = hours;
    if(mEl) mEl.innerText = minutes;
    if(sEl) sEl.innerText = seconds;
    
    const dateDisplay = document.getElementById('start-date-display');
    if(dateDisplay) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.innerText = startDate.toLocaleDateString('en-US', options);
    }
}

setInterval(updateTimer, 1000);
updateTimer(); 

window.addEventListener('resize', () => updateCarousel(0, true));

initCarousel();
switchView('home');

/* --- SPOTIFY PLAYER LOGIC --- */
function toggleMusicPlayer() {
    const player = document.getElementById('music-player-modal');
    player.classList.toggle('active');
}
