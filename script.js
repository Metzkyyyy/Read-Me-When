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
    const btns = document.querySelectorAll('.nav-btn');
    const bottomLabel = document.getElementById('chapter-controls');

    btns.forEach(btn => btn.classList.remove('active'));

    if(viewName === 'home') {
        homeView.classList.add('active-view');
        chaptersView.classList.remove('active-view');
        btns[0].classList.add('active');
        bottomLabel.classList.add('hidden');
    } else {
        homeView.classList.remove('active-view');
        chaptersView.classList.add('active-view');
        btns[1].classList.add('active');
        bottomLabel.classList.remove('hidden');
        updateCarousel(); 
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
}

function getLetterContent(topic) {
    // CHAPTER 1
    if (topic === "When you first receive this") {
        return `Henloww my precious baby! This is proof na mas love tika, hehehe. I made this for you because I wanted you to always have my words, even during times when I can’t be there for you right away. Always come back to this if you need it, omkie?  I hope this reminds you of how you are so loved and cared for by your one and only girlfriend, and future wifey. No matter what you’re feeling, I hope you find comfort in every page you open. This is my way of telling you that you’ll never have to walk through life alone, because you’ll always have me baby. I’ll always be your kakampi. 

This isn’t just words po haa—it’s a little piece of my heart I’ve decided to put together for you. I know things can get hard between us sometimes, and I might not always be there for you for some reasons, but I wanted to create something that can stay with you no matter what. So, please keep this and save it baby ha. This isn’t just words baby, this is a promise that I’ll always find ways to reach you, comfort you, and make you feel loved and cared for even from afar. 

As you go through this, I hope you can feel me in every word. You’re never alone baby, you’ve always got me. I’ll always do my best to brighten your days, whether they’re heavy, tiring, or even the happiest ones. Think of this as a little treasure chest you can open anytime you need me. No matter what happens, I want this to remind you of one thing baby: my love for you is real, endless, and unchanging, omkie? 

I really really love you, and I hope you will always remember that. Nothing and no one can ever change that. It’s you, and it will always be you.`;
    } 
    else if (topic === "When you want to read our love story") {
        return `We met at OFO, katong time na nangita kog kadula ug minecraft (na hantod karon wajuy kadula minecraft hehe). Ni chat ang bot sa OFO, so ning reply ko kasi malay mo tig dula sad diay kag minecraft HAHAHA. Nya igo raka ning hello, wako kabalo what ako e say so nangayo nalang kos ig nimo pang dagdag mutuals kasi imo bio “ig moots” man. I never planned to chat you balik after ug add, nya tuloy akong pagpangita ug kadula sa minecraft (FYI, wakoy kachat sa OFO ato) . Then suddenly, ni chat ka “Photographer kapo ba te????”. Tbh, ikaw ang first ni compliment sako photos na gina capture, so medjo na touch ko HAHAHA. But anyway, I thought you’d be my online friend lang.

You were so sweet and fun to talk to that day, baby. I felt so comfortable with you dayun ever tho I just met you. I also loved how you told me na sa umpisa palang comfy nakas ako hehe. When I first talked to you baby, you seemed like the sweetest person (karon maldita na kaayo HAHAHA). Nya shock kos part nga ni say kag “I’ll update you nalang po tomsieee” but I didn’t think much of it kay syempre I just met you and I thought straight ka ihh. And then came your pa dungog dungogs, till ni confess ka una through poem.

You were so easy to talk to baby. One thing that really got me to fall for you was how you really wanted to make time for me. Like I was aware of how busy you were ato, and when you get home kay I know tired ka. But despite all that—bisag tired nakayka—di  gihapon ka mo rest, hantod sa makatulgan ko nimo. Didto ko na touch baby, bisag tired kayka po you still spent time with me. Didto nako na feel na murag ako imo pahinga hehe. 

Despite all that, nahadlok gihapon ko ato baby. Since you know bag-o rako naka hawa sa ako past relationship ato, and I was scared na ma hurt balik—so I left. I regretted that so much, but I’m forever grateful na gihatagan ko nimo ug second chance baby. I really loved you, and I was overwhelmed with my feelings. I was scared of commitment, but you made me risk everything. We weren’t official pa ato, and you tried to make it official buttt I wanted it to be special and wanted to bawi. No regrets since then, YOU’RE THE BEST THING THAT’S HAPPENED TO ME.

I love you so much, my baby. I’m forever grateful I met you.`;
    } 
    else if (topic === "When you want to hear the songs that remind me of you") {
        return `There are so many songs that make me think of you, and sometimes it feels like the universe made them just for you/us baby. When you listen to them, I hope you feel the way my heart smiles for you, the way my soul softens when I think of you, and the way my love wraps around you even when I can’t. Whenever you hit play, imagine me thinking of you, singing the words softly in my head as if I’m dedication them directly to you. I hope these songs makes you smile, make you feel loved, and make you remember that no matter where I am, my heart in always yours baby. I made this playlist for you because sometimes songs can say the things my heart feels but I can’t explain in the right way. Every song in the playlist remind me of you—some because the lyrics describe how much I love you, and some because the sound makes me think of the moments we’ve shared. I want you to listen to these songs whenever you miss me or just want to feel close to me, because I chose them carefully with you in mind hehe. They’re not just random songs po; each one carries a memory, a feeling, or a part of my love for you.

I hope that when you press play, it feels like I’m right there beside you. I want the songs to comfort you on hard days, make you smile on good days, and always remind you that you’re special to me. This playlist is my way of giving you something that lasts, something you can return to anytime. No matter how far apart we are, I want the music to remind you that you’re always in my thoughts. I love you so much, my baby.
<br><br>
<center><a href="https://open.spotify.com/playlist/4LtmUY21BlIlIE5gpdWwoZ?si=c840c3f03c4845c4&pt=ed64539163eae5a0ffc37378d9606382" target="_blank" class="letter-btn"><i class="fas fa-music"></i> Listen to Playlist</a></center>`;
    } 
    else if (topic === "When you’re bored and want my attention") {
        return `You want my attention baby? Spamm meeeeee, call meeeee. You’re free to do so, omkie? No matter where I am or what I’m doing, don’t hesitate baby. Don’t be shy or scared to, omkie? I love giving you my attention, they’re always yours. I’ll always be happy to share a time with you. Time with you is never boring. You’re not and will never be a bother to me haa. If anything, it makes me happy to know that when you’re bored, the first person you think of is me hehe. If I’m busy or doing something, spam me pleaseee. I love it when you’re clingy. I LOVE YOU, AND I WANT ALL OF YOU BABYYYY`;
    } 
    else if (topic === "When you want a surprise from me") {
        return `My baby wants surprises??? I’ve got a whole bunch for youuu hehehe. This letter is the first surpriseee!

I want you to know that even in the moments you least expect it, I’m always thinking of ways to make you smile baby. Surprises don’t always have to be big; sometimes, it’s just about giving you something that reminds you how much I love you. And right now, this message is my way of sayingggg: surprisee, baby—you’re super duper loved beyond words by your girlfriend.

I know you love little things that make you feel special, so I wanted this to be one of them. I wish I could surprise you personally but due to reason you already know, I cant :(. Sooo, I’ll find other ways to surprise you my baby. But tbh, you’re already my biggest surprise lovelove. I never expected to love someone the way I love you, and I want to spend every day with you. My love itself is already a gift for you baby, one the I’ll keep giving to you again and again. And trust meee, I’ll always look for new ways to surprise you (balag di ma surprise fully kay ug mag make kog surprise, ma excite ko nya ma spoil nako nimooo HAHAHAHA). 

I LOVE YOU MORE THAN YOU’LL EVER KNOW, I LOVE YOU MORE THAN I COULD EVER EXPRESS. I’m so thankful to call you mine. One day, I’ll make sure to give you even bigger surprises—the kind you’ll never forget. But until then, I hope this simple one reminds you that you are the most special part of my life, and I’ll never stop finding ways to show it.
<br><br>
<center><a href="https://drive.google.com/drive/folders/1OAyYXORGxafxEAkHVjAiZ0XlFfXqGi2p?usp=sharing" target="_blank" class="letter-btn"><i class="fas fa-gift"></i> Open Surprise</a></center>`;
    } 
    else if (topic === "When you want to remember our happiest moments") {
        return `Do you remember when we were playing roblox baby? Katong 2 player spider web baa hehehe. For me, that was one of our happiest moments. We were so happy playing together, we were filled with endless laughters kay sige kag katagak HAHAHA. You’re so cutie baby kay straight kaayo imong pag jump but mo hiwi HAHAHAHA, total hiwi man pud ka hehe. I love watching our video ato, bahalag saba kayta (mostly ako HAHAHA), we were happy. You looked so happy, and I’m so happy na happy kas akoa hehehe. I love it when I’m the reason you’re smiling, laughing, or simply just happy. I want to make you happy for the rest of our lives, if you would let me. I really love you, my baby.

One of our happiest moments for me as well is when you officially became my girlfriend.  I can still remember how my heart was racing, like super kulba kaayo ko ato I don’t know why hehehe. I can still remember how I couldn’t stop smiling, how everything around me suddenly felt so much better. Like ni stop ang world just to let me take in how lucky I was to have you say “yes.” That moment will forever be etched in my heart baby. I remember the mix of emotions na ako na feel ato—nervousness, excitement, and pure happiness—all at once. The second you said yes, it felt like all the weight I didn’t even realize I was carrying just disappeared. You made me feel like the luckiest person alive baby, and in that exact moment, I knew that life was about to change for the better. Because from then on, I had you—my future wife, my home, and my favorite person.

Don’t sungog me ani haa HAHAHAHAHA, but another one was when I first hear you moan. It wasn’t just the sound baby hm, it’s also about what is meant. It showed me how much you trusted me, how open and vulnerable you were willing to be with me, even from from away po. That kind of trust is rare you know, and it made me realize just how deep our bond really is baby. You weren’t just sharing a sound lovelove—you were sharing a part of yourself that not everyone gets to see or hear. You know ba, that moment also made me feel wanted, needed, and loved in a way that words can’t fully explain. But yeah, hot kayka HEHEHE. I LOVE YOU MY BABY, THANK YOU SO MUCH FOR TRUSTING ME.`;
    } 
    else if (topic === "When you want to know what I’m thinking of you right now") {
        return `Yk ba baby, I think of you a lot—more than I even realize sometimes. You just appear in my thoughts out of nowhere, and suddenly I catch myself smiling (gara kayka). It could be something small that reminds me of you, like every time I see the color pink, when I’m listening to a love song, or even just a moment when I wish you were beside me. 

When I think of you, I think about how lucky I am to have someone like you in my life. You make everything baby, yk that ba? I always think about how much I love you, it sometimes hurts. I really do love you, and I can’t bear losing you. Even when I’m busy or tired, you still cross my mind—and the thought of you always gives me comfort. You made me realize that love doesn’t always need to be loud to be real. Sometimes it’s just there, quietly staying. 

I also think about how much I miss you. Being far from you isn’t easy baby, but every time I imagine your voice, your laugh, or how you talk to me, it feels like you’re here. I wonder what you’re doing, if you’ve eaten, if you’re smiling right now. I think of how I’d hold you if I could, how I’d look at you and tell you how much I love you—not through a screen, but in person.

Right now, what I’m really thinking is this: I love you. I always do, baby. Whether it’s day or night, busy or quiet, fighting or not, my mind always finds its way back to you. You’re my favorite thought, my baby—the one that never gets old, the one that always makes my heart feel loved and full. I love you so muchiee pooo my big baby! <3`;
    }

    // CHAPTER 2
    else if (topic === "When you need a reminder of how much I love you") {
        return `I love you more than I can ever say in words, baby. I love you in the simple moments, like when we’re just talking about random things, and in the quiet moments, when we don’t have anything to say. My love for you isn’t just something I say; it’s something I feel every single day, in every little thing I do. I love you for who you are baby—for your cutie laugh, your pretty smile that shows your adorable dimples, the way you care and love, your lovely singkit eyes when you cry, and even the things  that make you ulaw. I love your teeth kay mura kag naay fangs baby and it’s unique, I love how you soften when I tell you I love you and I miss you, I love how you pout when you feel like crying (you’re so cutie), I love how you roll your eyes at me (but ibang eye roll gusto ko soon hehehe). I love you the way you are baby, you don’t have to change a single thing. Just keep being you, because I’ll always love you.

You’ve become the person I look forward to talking to at the end of the day, the one I always look for, the one I always want to share my thoughts with, and the one I want to make proud. You mean so much more to me than you’ll ever know, my baby. Even when we’re apart or when things get hard, my love doesn’t fade. It doesn’t change or weaken—if anything, it grows stronger. I know distance and time can make things tough, but please never doubt how much you mean to me baby. You’re always in my heart and in my mind, even when we’re not talking, even when everything’s quiet. My love for you doesn’t ever stop; it stays with you.

When you feel unsure, or when you just need to feel loved, come back to this, omkie baby? Let it remind you that no matter what happens baby, you have someone who loves you deeply, endlessly, and sincerely. You’re my person—the one I’ll always choose, again and again, no matter how far apart we are. You are my always, even from miles away.`;
    }
    else if (topic === "When you want to know how important you are to me") {
        return `Baby, I want you to really feel it as you read every word. You’re not just someone I talk to or spend time with; you’re someone who’s become a huge part of my life baby. Knowing you exist in my world makes everything better. You’ve given me so many reasons to smile, to keep going, and to be grateful. You’ve been so patient, and loving in ways I never expected someone could be. You matter to me more than I can ever fully explain, because you’re not just in my life—you’ve become a part of who I am. Every time I think of what makes me happy, your name is always there baby. 

Even when we’re not talking, I still think about you. I wonder how you’re doing, if you’re okay, if you’re smiling. That’s how important you are to me po—you’re never really out of my thoughts. I love you so much in a way I never thought would be possible for me, and I’ll never take that for granted. You mean more to me than you realize, and I’m so thankful that I get to love you. Whenever I think about the people who make my life better, you’re always the first one who comes to mind. You make me laugh when I don’t feel like smiling, and you make me feel safe just by being you. You’ve shown me what it means to be cared for and understood, even from miles away. You’re not “just” my girlfriend—you’re my person, my comfort, my peace, and my favorite everything baby. You’ve changed my days in ways no one else ever could, and for that, I’ll always be thankful.

You’re important to me because you make me feel things I didn’t think I could feel—the kind of love that makes the world seem softer. You remind me that love doesn’t need to be perfect, it just needs to be real. I think about you when I wake up, when I go to sleep, and in all the little moments in between. That’s how much space you take up in my life baby—and I wouldn’t have it any other way. When you start to doubt how much you mean to me, come back here baby. Read this again hm and remember that you are loved, appreciated, and really important to me. You are the reason I smile randomly, the reason I try to be better, and the reason I believe in something as strong as love. You’re not just part of my world—you are my world. 

If I could list the reasons why you matter to me, I’d never finish. You are, and will always be, the best thing that ever happened to me.`;
    }
    else if (topic === "When you don’t feel loved") {
        return `Awwhh, why doesn’t my baby feel loved? :( Please don‘t hesitate to tell me how you feel baby hmm? No matter what po, even when we’re fighting, tell me, omkie? I’ll always listen to you, my baby. I’ll always assure you, I’ll always be there to remind you that you are always loved, so much. I know those moments can be hard baby—when everything feels heavy, and it seems like no one cares or sees how much you’re trying. But please, baby, I need you to remember this: you are loved. Deeply. Fully. Always. Even when you can’t feel it, my love is still there. Tell me right now baby, haa? I’ll do anything to make you feel loved, always.

You don’t have to do anything to earn my love, baby. You don’t need to be perfect, or happy, or okay all the time. I love you just as you are—even on your bad days, even when you’re cold, even when you feel like you’re hard to love. You’re not. You are one of the easiest people to love baby, and I’ll never stop reminding you of that. Sometimes, my love doesn’t always feel loud or obvious. It’s in the little things baby—the way I check on you, the way I listen, the way I stay. So even if you can’t see it right now, please believe me when I say: you are so loved, not only by me, but by the people around you baby.

I love you in every version of you baby—happy, sad, tired, lost, overthinking, quiet. My love isn’t something that fades when you’re struggling; it’s something that stays, that holds you when you feel like you’re falling apart. You could be silent for hours, and I’d still care for you the same. You could cry your heart out, and I’d still see someone so worth loving. I love you in the way I wait for your messages, the way I think of you before I sleep, the way my heart softens every time I remember you. My love is in the words I say and even in the ones I don’t. Even from far away, I want you to feel that love—the kind that doesn’t ask for anything, that doesn’t go away, that just stays with you, reminding you that you matter baby. 

When you feel unloved, come back here and breathe, omkie baby? Read this slowly. Read this again and again until you believe it. You are loved—by me, by the universe, by the parts of life that brought us together. You are worth every bit of care, every ounce of affection, every kind of love there is. And if ever you forget, let this message be proof that someone out there—me—loves you endlessly, with no breaks, no limits, no “what ifs.” Always.

If only you could see yourself through my eyes, you’d never doubt how loved you are. You are not alone, not forgotten, and never unloved.`;
    }
    else if (topic === "When you feel like I don’t care") {
        return `I do. I always will. Did I do something that made you feel like I don’t care, baby? Please tell me right away hmm, I’ll listen po. I won’t ever invalidate your feelings. Your feelings are always valid, omkie? Tell me so I can tell you how much I care about you. Caring about you is something I do every single day, even when I don’t always show it the right way. I know there are times I get cold, or tired, and it might seem like I’m distant or not paying attention. But please believe me when I say I always care. Even when you can’t feel it—I do baby, I really do. 

You know ba? I think about you while I’m busy. I smile when I see your name on my screen. I replay our memories when I can’t sleep. I always pray for you. Caring for you has become a part of my daily life—it’s like breathing baby. I may not say it every second, but it’s there. I know you deserve reassurance, especially when distance makes everything feel uncertain baby. You deserve to feel wanted, noticed, and loved—and I want to be better at showing that. So if you ever feel like I don’t care, come back to this and remember baby: I’m still here. I still choose you. I still care in ways that maybe don’t always reach you right away, but I promise, they’re always there baby—constantly.

You are someone I don’t just love baby—I value you. You’ve become a part of my world that I can’t imagine being without. So even on days when I’m cold, when I take too long to reply, or when I seem distant—please don’t doubt me. I care, baby. I always have, and I always will. I love you so much.`;
    }

    return `My Darling,\n\nI am writing this note because you are feeling "${topic.toLowerCase().replace('when you', '')}".\n\nClose your eyes, take a deep breath, and imagine me holding your hand right now. You are stronger than you know, and deeply loved.\n\nI'm right here with you.`;
}

function openLetter(topic) {
    if(Math.abs(currentDragOffset) > 0.1) return;

    const overlay = document.getElementById('letter-overlay');
    const titleEl = document.getElementById('letter-title');
    const bodyEl = document.getElementById('letter-body');

    titleEl.innerText = topic;
    bodyEl.innerHTML = getLetterContent(topic);
    overlay.classList.add('open');
}

function closeLetter() {
    document.getElementById('letter-overlay').classList.remove('open');
}

document.getElementById('letter-overlay').addEventListener('click', (e) => {
    if(e.target === document.getElementById('letter-overlay')) closeLetter();
});

window.addEventListener('resize', () => updateCarousel(0, true));

initCarousel();
switchView('home');

const homeMsg = document.querySelector('.home-message');
homeMsg.innerHTML = `I made this for you because I know that life isn’t always easy, and there will be moments when things feel heavy, confusing, or even overwhelming. There will be days when words are hard to find, or when I can’t always be there to say them out loud.
            <br><br>
            I may not be physically beside you, but I want you to know that my love is always with you no matter the time or place. This is my way of reminding you that no matter what you’re feeling—whether you’re happy, sad, tired, or missing me—you’ll always have something from me to hold onto.
            <br><br>
            This is my way of reaching out to you whenever you need me the most. Each page is a reminder that you are deeply loved, cared for, and never alone—even during the toughest days. I want you to have something to open whenever you need encouragement, or comfort.
            <br><br>
            More than anything, I hope this reminds you that I will always choose you, stand by you, and love you in every version of tomorrow. This is my heart in words, saved here for you, because you mean everything to me and I love you.`;



