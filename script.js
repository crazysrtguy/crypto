// Initialize GSAP animations
gsap.registerPlugin();

// Contract box click handler
document.getElementById('contractBox').addEventListener('click', function() {
    const contractText = document.getElementById('contractText').textContent;
    const overlay = document.getElementById('copyOverlay');

    // Copy to clipboard
    navigator.clipboard.writeText(contractText).then(() => {
        // Show success animation
        overlay.style.display = 'flex';
        gsap.from(overlay, { scale: 0, duration: 0.3, ease: "back.out(1.7)" });

        // Flash the border
        gsap.to('#contractBox', {
            borderColor: "#00ff00",
            boxShadow: "0 0 20px #00ff00",
            duration: 0.2,
            yoyo: true,
            repeat: 3
        });

        setTimeout(() => {
            overlay.style.display = 'none';
        }, 2000);
    });
});

// Contract box hover effects
document.getElementById('contractBox').addEventListener('mouseenter', function() {
    gsap.to('#contractBox', {
        scale: 1.02,
        borderColor: "#ffff00",
        duration: 0.3
    });
});

document.getElementById('contractBox').addEventListener('mouseleave', function() {
    gsap.to('#contractBox', {
        scale: 1,
        borderColor: "#00ff00",
        duration: 0.3
    });
});

// Character interactions
document.querySelectorAll('.meme-character').forEach(char => {
    char.addEventListener('click', function() {
        gsap.to(char, {
            rotation: 720,
            scale: 2,
            duration: 1,
            ease: "bounce.out",
            onComplete: () => {
                gsap.to(char, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.5
                });
            }
        });

        // Random sound effects (visual feedback)
        const reactions = ["💥", "⚡", "🔥", "💀", "🚀", "💎", "🤯"];
        const reaction = reactions[Math.floor(Math.random() * reactions.length)];

        const reactionEl = document.createElement('div');
        reactionEl.innerHTML = reaction;
        reactionEl.style.position = 'absolute';
        reactionEl.style.fontSize = '2rem';
        reactionEl.style.pointerEvents = 'none';
        reactionEl.style.left = char.style.left;
        reactionEl.style.top = char.style.top;
        char.parentElement.appendChild(reactionEl);

        gsap.to(reactionEl, {
            y: -100,
            opacity: 0,
            duration: 1,
            onComplete: () => reactionEl.remove()
        });
    });
});

// Playground characters with more complex animations
document.querySelectorAll('.playground-char').forEach(char => {
    char.addEventListener('click', function() {
        const animations = [
            () => gsap.to(char, { rotation: 1080, scale: 3, duration: 2, ease: "power2.out" }),
            () => gsap.to(char, { x: "+=200", y: "+=100", rotation: 360, duration: 1.5, ease: "bounce.out" }),
            () => gsap.to(char, { scale: 0.1, rotation: 720, duration: 1, yoyo: true, repeat: 1 }),
            () => {
                gsap.to(char, { y: "-=150", duration: 0.5, ease: "power2.out" });
                gsap.to(char, { y: "+=150", duration: 0.5, delay: 0.5, ease: "bounce.out" });
            }
        ];

        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        randomAnimation();

        // Reset position after animation
        setTimeout(() => {
            gsap.to(char, { x: 0, y: 0, scale: 1, rotation: 0, duration: 1 });
        }, 3000);
    });
});

// Chaos Generator Functions
function makeItRain() {
    const chaosZone = document.getElementById('chaosZone');
    const moneyEmojis = ['💵', '💰', '💸', '🤑', '💎', '🚀'];

    for (let i = 0; i < 50; i++) {
        const money = document.createElement('div');
        money.innerHTML = moneyEmojis[Math.floor(Math.random() * moneyEmojis.length)];
        money.style.position = 'absolute';
        money.style.fontSize = '2rem';
        money.style.left = Math.random() * 100 + '%';
        money.style.top = '-50px';
        money.style.pointerEvents = 'none';
        chaosZone.appendChild(money);

        gsap.to(money, {
            y: 250,
            rotation: 360,
            duration: Math.random() * 2 + 1,
            ease: "bounce.out",
            onComplete: () => money.remove()
        });
    }
}

function summonPepe() {
    const chaosZone = document.getElementById('chaosZone');
    const pepes = ['🐸', '🤡', '👹', '🦍', '🤖'];

    for (let i = 0; i < 10; i++) {
        const pepe = document.createElement('div');
        pepe.innerHTML = pepes[Math.floor(Math.random() * pepes.length)];
        pepe.style.position = 'absolute';
        pepe.style.fontSize = '3rem';
        pepe.style.left = Math.random() * 80 + '%';
        pepe.style.top = Math.random() * 80 + '%';
        pepe.style.cursor = 'pointer';
        chaosZone.appendChild(pepe);

        pepe.addEventListener('click', function() {
            gsap.to(pepe, {
                scale: 0,
                rotation: 720,
                duration: 0.5,
                onComplete: () => pepe.remove()
            });
        });

        gsap.from(pepe, { scale: 0, rotation: 360, duration: 0.5, ease: "back.out(1.7)" });

        setTimeout(() => {
            if (pepe.parentNode) {
                gsap.to(pepe, { opacity: 0, duration: 0.5, onComplete: () => pepe.remove() });
            }
        }, 10000);
    }
}

function moonMode() {
    gsap.to('.container', {
        rotation: 180,
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
            gsap.to('.container', { rotation: 0, duration: 2, ease: "bounce.out" });
        }
    });

    document.body.style.filter = 'hue-rotate(180deg) invert(0.1)';
    setTimeout(() => {
        document.body.style.filter = '';
    }, 4000);
}

function diamondHands() {
    const diamonds = ['💎', '🙌', '💪', '🔥'];

    for (let i = 0; i < 20; i++) {
        const diamond = document.createElement('div');
        diamond.innerHTML = diamonds[Math.floor(Math.random() * diamonds.length)];
        diamond.style.position = 'fixed';
        diamond.style.fontSize = '3rem';
        diamond.style.left = Math.random() * 100 + '%';
        diamond.style.top = Math.random() * 100 + '%';
        diamond.style.pointerEvents = 'none';
        diamond.style.zIndex = '9999';
        document.body.appendChild(diamond);

        gsap.to(diamond, {
            scale: 2,
            rotation: 360,
            duration: 1,
            ease: "power2.out"
        });

        gsap.to(diamond, {
            opacity: 0,
            duration: 2,
            delay: 1,
            onComplete: () => diamond.remove()
        });
    }
}

function rocketLaunch() {
    const rocket = document.createElement('div');
    rocket.innerHTML = '🚀';
    rocket.style.position = 'fixed';
    rocket.style.fontSize = '4rem';
    rocket.style.bottom = '10px';
    rocket.style.left = '50%';
    rocket.style.transform = 'translateX(-50%)';
    rocket.style.zIndex = '9999';
    document.body.appendChild(rocket);

    gsap.to(rocket, {
        y: -window.innerHeight - 100,
        rotation: 45,
        duration: 3,
        ease: "power2.out",
        onComplete: () => rocket.remove()
    });

    gsap.to('body', {
        x: 5,
        duration: 0.1,
        repeat: 20,
        yoyo: true,
        onComplete: () => gsap.set('body', { x: 0 })
    });
}

function rugCheck() {
    const messages = [
        "✅ LP LOCKED FOREVER!",
        "✅ 0% TAXES CONFIRMED!",
        "✅ NO TEAM TOKENS!",
        "✅ PUMP.FUN VERIFIED!",
        "✅ COMMUNITY OWNED!",
        "🚀 SAFEST LAUNCH EVER!"
    ];

    const message = messages[Math.floor(Math.random() * messages.length)];

    const checkResult = document.createElement('div');
    checkResult.innerHTML = message;
    checkResult.style.position = 'fixed';
    checkResult.style.top = '50%';
    checkResult.style.left = '50%';
    checkResult.style.transform = 'translate(-50%, -50%)';
    checkResult.style.background = 'rgba(0,255,0,0.9)';
    checkResult.style.color = '#000';
    checkResult.style.padding = '20px';
    checkResult.style.borderRadius = '15px';
    checkResult.style.fontSize = '2rem';
    checkResult.style.fontWeight = 'bold';
    checkResult.style.zIndex = '9999';
    checkResult.style.border = '3px solid #fff';
    document.body.appendChild(checkResult);

    gsap.from(checkResult, { scale: 0, duration: 0.5, ease: "back.out(1.7)" });
    gsap.to(checkResult, {
        opacity: 0,
        scale: 1.5,
        duration: 1,
        delay: 2,
        onComplete: () => checkResult.remove()
    });
}

// Floating emojis
function createFloatingEmoji() {
    const emojis = ["💎", "🚀", "📈", "📉", "💀", "🔥", "⚡", "🤡", "🦍", "🐸", "💸"];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];

    const emojiEl = document.createElement('div');
    emojiEl.className = 'floating-emoji';
    emojiEl.innerHTML = emoji;
    emojiEl.style.left = Math.random() * 100 + '%';
    emojiEl.style.animationDelay = Math.random() * 2 + 's';
    emojiEl.style.animationDuration = (Math.random() * 10 + 5) + 's';

    document.getElementById('floatingEmojis').appendChild(emojiEl);

    setTimeout(() => emojiEl.remove(), 15000);
}

// Create floating emojis periodically
setInterval(createFloatingEmoji, 2000);

// Random page shake effect
setInterval(() => {
    if (Math.random() < 0.1) { // 10% chance every 3 seconds
        gsap.to('body', {
            x: Math.random() * 20 - 10,
            y: Math.random() * 20 - 10,
            duration: 0.1,
            repeat: 5,
            yoyo: true,
            onComplete: () => gsap.set('body', { x: 0, y: 0 })
        });
    }
}, 3000);

// Konami code easter egg
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }

    if (konamiCode.toString() === konamiSequence.toString()) {
        alert('🎉 ULTRA DEGEN MODE ACTIVATED! 🎉\n\nYou found the secret! Now you can lose money EVEN FASTER!');
        document.body.style.filter = 'hue-rotate(180deg) saturate(200%)';

        // Make everything spin
        gsap.to('.container', {
            rotation: 360,
            duration: 2,
            repeat: -1,
            ease: "none"
        });
    }
});

// Cursor trail effect
let mouseTrail = [];
document.addEventListener('mousemove', (e) => {
    mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

    if (mouseTrail.length > 20) {
        mouseTrail.shift();
    }

    // Randomly spawn emojis at cursor
    if (Math.random() < 0.05) {
        const trailEmoji = document.createElement('div');
        trailEmoji.innerHTML = ['💎', '🚀', '💀'][Math.floor(Math.random() * 3)];
        trailEmoji.style.position = 'fixed';
        trailEmoji.style.left = e.clientX + 'px';
        trailEmoji.style.top = e.clientY + 'px';
        trailEmoji.style.pointerEvents = 'none';
        trailEmoji.style.fontSize = '20px';
        trailEmoji.style.zIndex = '9999';
        document.body.appendChild(trailEmoji);

        gsap.to(trailEmoji, {
            y: -50,
            opacity: 0,
            duration: 1,
            onComplete: () => trailEmoji.remove()
        });
    }
});

// Page load animation
gsap.from('.hero', { y: -100, opacity: 0, duration: 1, ease: "bounce.out" });
gsap.from('.section', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    delay: 0.5,
    ease: "power2.out"
});

// Random glitch effects
setInterval(() => {
    if (Math.random() < 0.05) {
        const elements = document.querySelectorAll('.section, .logo, .subtitle');
        const randomEl = elements[Math.floor(Math.random() * elements.length)];

        gsap.to(randomEl, {
            x: Math.random() * 10 - 5,
            duration: 0.1,
            repeat: 3,
            yoyo: true,
            onComplete: () => gsap.set(randomEl, { x: 0 })
        });
    }
}, 1000);

// Twitter Content Generator
let currentTweet = '';

function generateTweet(type = 'random') {
    const tweetTemplates = {
        bullish: [
            "Just bought more $CRYPTO because I hate having money in my bank account 🚀💎",
            "$CRYPTO to the moon! My portfolio is 99% $CRYPTO and 1% regret 📈🌙",
            "Sold my car for $CRYPTO. Who needs transportation when you're going to the moon? 🚗➡️🚀",
            "My therapist: 'You can't solve everything with $CRYPTO' Me: *buys more $CRYPTO* 💎🙌",
            "$CRYPTO is not just a token, it's a lifestyle. A very poor lifestyle, but still a lifestyle 🤡💸",
            "Just convinced my grandma to put her pension into $CRYPTO. She said 'what's the worst that could happen?' 👵💎",
            "Sold my wedding ring for $CRYPTO. My wife said it's either her or the token. I chose wisely 💍➡️💎",
            "My boss: 'Why are you always checking your phone?' Me: 'Monitoring my $CRYPTO empire' *down 90%* 📱📉",
            "Took out a second mortgage for $CRYPTO. The bank thinks it's for home improvements. Technically correct 🏠🚀",
            "My dating profile: 'Looking for someone who understands my $CRYPTO addiction and won't judge my ramen diet' 🍜💕",
            "Doctor: 'You need to reduce stress' Me: *buys more $CRYPTO during a 50% dip* 'This is fine' 🔥💎",
            "Just named my firstborn $CRYPTO. The birth certificate was expensive but worth it 👶💎",
            "Landlord: 'Rent is due' Me: 'Can you accept $CRYPTO?' Landlord: 'No' Me: 'Then we have a problem' 🏠💸"
        ],
        degen: [
            "Me: I'll only invest what I can afford to lose\nAlso me: *sells kidney for $CRYPTO* 🫘💎",
            "My mom: 'When are you moving out?'\nMe: 'When $CRYPTO hits $1' 🏠📈",
            "Relationship status: In a committed relationship with $CRYPTO (it's complicated) 💔💎",
            "I don't always buy crypto, but when I do, I buy $CRYPTO at the top 📈🤡",
            "My portfolio is like my dating life: mostly red and full of bad decisions 📉💀",
            "Sold my blood plasma to buy $CRYPTO. The nurse asked why I keep coming back. I said 'for the culture' 🩸💎",
            "My search history: 'How to sell organs legally' 'Is selling hair profitable' '$CRYPTO price prediction' 🔍💸",
            "Uber driver: 'Where to?' Me: 'The moon' Driver: 'Sir this is a Wendy's parking lot' Me: 'I know what I said' 🚗🌙",
            "My therapist now charges me in $CRYPTO. She says it's the only way she'll see any money 🛋️💎",
            "Broke up with my girlfriend because she said $CRYPTO was 'just a phase'. Jokes on her, I'm homeless now 💔🏠",
            "My mom: 'Are you winning son?' Me: *staring at -95% portfolio* 'Absolutely crushing it' 📉😭",
            "Sold my textbooks to buy $CRYPTO. Who needs education when you have diamond hands? 📚➡️💎",
            "My credit score is lower than my $CRYPTO gains. That's saying something 📊💀",
            "Roommate: 'Did you pay the electricity bill?' Me: 'No but I bought more $CRYPTO' *lights turn off* 💡❌",
            "My bank called asking about suspicious activity. I said 'Yeah, I'm trying to get rich' 📞🏦"
        ],
        diamond: [
            "These hands aren't just diamond, they're $CRYPTO diamond 💎🙌",
            "Paper hands? Never heard of her. $CRYPTO diamond hands forever! 💎🚀",
            "Selling $CRYPTO? That's not in my vocabulary. HODL till Valhalla! ⚔️💎",
            "My hands are so diamond, I can't even hold my phone properly 💎📱",
            "Diamond hands so strong, I accidentally crushed my sell button 💎🔨",
            "My hands are so diamond, I cut glass when I clap 💎👏",
            "Tried to sell $CRYPTO but my diamond hands won't let me click the button 💎🖱️",
            "My diamond hands are so strong, I accidentally broke my hardware wallet 💎💾",
            "Doctor: 'Your hands are literally turning into diamonds' Me: 'Finally, the $CRYPTO is working' 💎🏥",
            "My girlfriend left me because I can't hold her hand without cutting her. Diamond hands problems 💎💔",
            "TSA agent: 'Sir, your hands are setting off the metal detector' Me: 'That's just my $CRYPTO diamond hands' ✈️💎",
            "Can't eat soup anymore. Diamond hands keep cutting through the spoon 🍲💎",
            "My diamond hands are so legendary, they're being studied by scientists 🔬💎",
            "Tried to high-five someone, accidentally gave them diamond cuts 🙏💎",
            "My hands are so diamond, De Beers wants to mine them 💎⛏️"
        ],
        moon: [
            "$CRYPTO moon mission loading... 🚀🌙 Estimated arrival: Soon™",
            "Houston, we have a problem... we're going TOO fast to the moon! 🚀🌙",
            "Moon? That's just our first stop. $CRYPTO is going to Mars! 🚀🔴",
            "Packed my bags for the moon. Only bringing $CRYPTO and diamond hands 🎒💎",
            "The moon called, they're preparing a landing pad for $CRYPTO 📞🌙",
            "NASA called, they want to use $CRYPTO as rocket fuel 🚀⛽",
            "My $CRYPTO bag is so heavy, it's affecting Earth's gravitational pull 🌍💎",
            "Elon Musk just tweeted about $CRYPTO. Wait, that was just my fever dream 🤒🚀",
            "The moon is getting closer. Oh wait, that's just my $CRYPTO gains 🌙📈",
            "Bought a telescope to watch $CRYPTO's journey to the moon 🔭🌙",
            "My neighbor asked why I'm building a rocket in my backyard. I said '$CRYPTO backup plan' 🚀🏠",
            "Google Maps now shows directions to the moon via $CRYPTO 🗺️🌙",
            "The International Space Station reported a $CRYPTO sighting 🛰️💎",
            "My $CRYPTO is moving so fast, it broke the sound barrier 💨🚀",
            "Weather forecast: 100% chance of moon with scattered $CRYPTO showers 🌙☔"
        ],
        broke: [
            "Ramen noodles for breakfast, lunch, and dinner. Thanks $CRYPTO! 🍜💸",
            "My wallet is emptier than my soul, but my $CRYPTO bag is full of dreams 💰😭",
            "Sold my furniture to buy $CRYPTO. Now I sleep on the floor like a true degen 🛏️➡️💎",
            "My credit card company called. I told them I'm investing in my future. They hung up 📞💳",
            "Living off ketchup packets and hope. $CRYPTO better moon soon 🍅🚀",
            "My bank balance: $3.47\nMy $CRYPTO holdings: Priceless (literally, worth nothing) 💸💎",
            "Sold my shoes to buy $CRYPTO. Walking barefoot to the moon 👟➡️🌙",
            "My diet: 90% air, 10% $CRYPTO hopium 🌬️💎",
            "Electricity got cut off. Using my phone's flashlight to check $CRYPTO prices 🔦📱",
            "My mom offered me $20. I asked if she could send it in $CRYPTO instead 👵💸"
        ],
        family: [
            "Mom: 'When are you getting married?' Me: 'When $CRYPTO hits $1' Mom: *starts crying* 👰💎",
            "Dad: 'I'm disappointed in you' Me: 'Wait until $CRYPTO moons, then we'll talk' 👨‍👧💸",
            "Thanksgiving dinner: 'So what do you do for work?' Me: 'I'm a $CRYPTO influencer' *awkward silence* 🦃💎",
            "My grandpa: 'Back in my day, we invested in real things' Me: 'OK boomer, enjoy your 2% savings account' 👴📈",
            "Family group chat: 'Happy Birthday!' Me: 'Thanks, I spent my birthday money on $CRYPTO' 🎂💸",
            "My sister: 'You need help' Me: 'Yeah, help buying more $CRYPTO' 👭💎",
            "Christmas wish list: More $CRYPTO, diamond hands, moon mission 🎄🚀",
            "My cousin got a promotion. I got more $CRYPTO. We're both winning 👨‍💼💎",
            "Family reunion: 'What's new?' Me: *shows $CRYPTO portfolio* 'Everything is pain' 👨‍👩‍👧‍👦📉",
            "My aunt: 'You should save money' Me: 'I am, it's called $CRYPTO' 👵💰"
        ],
        relationship: [
            "Tinder bio: 'Looking for someone who won't judge my $CRYPTO addiction' 💕💎",
            "Her: 'It's me or $CRYPTO' Me: 'I choose... both?' Her: *leaves* Me: 'More $CRYPTO for me' 💔💸",
            "Date night budget: $0\n$CRYPTO budget: Everything I have 💕💰",
            "She said she loves me. I said I love $CRYPTO more. Single again 💔💎",
            "My relationship status: It's complicated (with $CRYPTO) 💕📱",
            "Valentine's Day gift: More $CRYPTO. She didn't appreciate it 💝💸",
            "Couples therapy: 'He cares more about $CRYPTO than me' Therapist: 'Is that true?' Me: 'Well...' 💑💎",
            "Wedding vows: 'For richer or poorer, in $CRYPTO we trust' 💒💰",
            "She asked for a ring. I bought more $CRYPTO. Same thing, right? 💍➡️💎",
            "Long distance relationship: Me and my $CRYPTO wallet 💕📱"
        ],
        work: [
            "Boss: 'You're fired' Me: 'Perfect, more time to watch $CRYPTO charts' 💼📉",
            "Job interview: 'Where do you see yourself in 5 years?' Me: 'On the moon with $CRYPTO' 🚀💼",
            "Coworker: 'Want to grab lunch?' Me: 'Can't afford it, bought $CRYPTO instead' 🍔💸",
            "Performance review: 'You've been distracted' Me: 'Yeah, $CRYPTO is pumping' 📊💎",
            "Salary negotiation: 'Can you pay me in $CRYPTO?' HR: 'That's not how this works' 💰💼",
            "Sick day excuse: 'I have $CRYPTO fever' Boss: 'That's not a real illness' 🤒💎",
            "Office party: Everyone talks about stocks. I talk about $CRYPTO. I eat alone 🎉💸",
            "Retirement plan: $CRYPTO\nBackup plan: More $CRYPTO 👴💰",
            "Team building exercise: 'Share something personal' Me: 'I own $CRYPTO' *everyone leaves* 👥💎",
            "Work from home: Watching $CRYPTO charts in my pajamas 🏠📱"
        ],
        existential: [
            "What is the meaning of life? $CRYPTO. What is the purpose of existence? More $CRYPTO 🤔💎",
            "If $CRYPTO moons in the forest and no one's around to see it, did it really happen? 🌲🚀",
            "I think, therefore I buy $CRYPTO 🧠💸",
            "We are all just atoms in the universe, but some atoms hold $CRYPTO 🌌💎",
            "Is reality real, or are we all just living in a $CRYPTO simulation? 🤖💰",
            "The only certainty in life is death, taxes, and $CRYPTO volatility 💀📈",
            "If God exists, why did he create $CRYPTO to test our faith? 🙏💸",
            "Are we alone in the universe? Yes, just me and my $CRYPTO 👽💎",
            "Time is an illusion. $CRYPTO gains are also an illusion. Everything is pain 🕰️😭",
            "In the grand scheme of things, we're all insignificant. Except $CRYPTO holders 🌍💰"
        ],
        conspiracy: [
            "The government doesn't want you to know about $CRYPTO. That's why I'm telling everyone 👁️💎",
            "Big banks are scared of $CRYPTO. That's why I bought more 🏦💸",
            "The moon landing was fake, but $CRYPTO going to the moon is real 🌙🚀",
            "They're putting chemicals in the water to make us sell $CRYPTO. Stay strong 💧💎",
            "Area 51 is actually a $CRYPTO mining facility 👽⛏️",
            "The Illuminati tried to recruit me, but I was too busy buying $CRYPTO 👁️💰",
            "Birds aren't real, but $CRYPTO gains are (sometimes) 🐦💸",
            "The earth is flat, but $CRYPTO charts only go up 🌍📈",
            "Wake up sheeple! $CRYPTO is the only truth in this world 🐑💎",
            "They don't want you to know that $CRYPTO is the secret to immortality 🧬💰"
        ],
        unhinged: [
            "I've been awake for 72 hours watching $CRYPTO charts. The colors are speaking to me 👁️📊",
            "My neighbor's dog told me to buy more $CRYPTO. Best financial advisor I've ever had 🐕💎",
            "I see $CRYPTO symbols in my coffee. The universe is sending me signals ☕🚀",
            "Sold my blood to vampires for $CRYPTO. They said it tastes like desperation 🧛‍♂️💸",
            "My reflection in the mirror is just $CRYPTO charts. I've become one with the degen 🪞📈",
            "I speak fluent $CRYPTO now. Beep boop moon lambo diamond hands 🤖💎",
            "The voices in my head are all saying 'buy $CRYPTO'. Finally, some good advice 🧠💰",
            "I've transcended humanity. I am now pure $CRYPTO energy 🌟💸",
            "My dreams are just $CRYPTO price predictions. Last night I dreamed of $100 🛌🚀",
            "I've achieved enlightenment. The answer to everything is $CRYPTO 🧘‍♂️💎",
            "My DNA is 50% human, 50% $CRYPTO. Science can't explain it 🧬💰",
            "I communicate with aliens through $CRYPTO transactions. They're also diamond hands 👽💎",
            "Time travel is real. I went to the future and $CRYPTO rules everything 🕰️🚀",
            "I've become the $CRYPTO. The $CRYPTO has become me. We are one 🔄💸",
            "My therapist quit. Said my $CRYPTO obsession was beyond professional help 🛋️💀"
        ],
        random: [
            "My financial advisor: 'Diversify your portfolio'\nMe: 'I have $CRYPTO on 3 different exchanges' 🤡",
            "Breaking: Local man discovers money can disappear faster than his will to live. More at 11. #CRYPTO 📺💸",
            "I'm not addicted to buying $CRYPTO, I can stop anytime... right after this dip 🤲💎",
            "My bank account: 📉\nMy $CRYPTO bag: 📈\nMy mental health: 📉📈📉📈",
            "Explaining $CRYPTO to my parents is like explaining TikTok to a boomer. They just don't get it 👴📱",
            "My life before $CRYPTO: 😊💰🏠\nMy life after $CRYPTO: 😭🍜📦",
            "Judge: 'How do you plead?' Me: 'Your honor, I was just buying the dip' ⚖️💎",
            "My autobiography will be titled: 'How I Lost Everything and Found $CRYPTO' 📖💸",
            "Therapist: 'Tell me about your childhood' Me: 'It was before $CRYPTO, so irrelevant' 🛋️💭",
            "My last words will be: 'Check my $CRYPTO wallet... it might be worth something by then' ⚰️💎",
            "Time traveler: 'I'm from 2030' Me: 'How much is $CRYPTO worth?' Time traveler: *starts crying* 😭🚀",
            "My resume: 'Professional $CRYPTO holder, expert in losing money, fluent in hopium' 📄💼",
            "Genie: 'You have 3 wishes' Me: '$CRYPTO to $1, $CRYPTO to $10, $CRYPTO to $100' 🧞‍♂️💎",
            "My tombstone will read: 'He died as he lived... checking $CRYPTO prices' ⚰️📱",
            "Aliens landed and asked about Earth's currency. I showed them $CRYPTO. They left immediately 👽🛸"
        ]
    };

    const tweets = tweetTemplates[type] || tweetTemplates.random;
    const randomTweet = tweets[Math.floor(Math.random() * tweets.length)];

    currentTweet = randomTweet;
    document.getElementById('tweetText').innerHTML = randomTweet;
    document.getElementById('tweetDisplay').style.display = 'block';

    // Animate the tweet appearance
    gsap.from('#tweetDisplay', { scale: 0, duration: 0.5, ease: "back.out(1.7)" });
}

function copyTweet() {
    navigator.clipboard.writeText(currentTweet + '\n\n#CRYPTO #ToTheMoon #DiamondHands').then(() => {
        alert('🐦 Tweet copied! Now go spread the degen energy!');
    });
}

function shareTweet() {
    const tweetText = encodeURIComponent(currentTweet + '\n\n#CRYPTO #ToTheMoon #DiamondHands');
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
}

// Degen Quiz System
let quizData = [
    {
        question: "What's your reaction when you see a 50% dip?",
        options: [
            { text: "Panic sell everything 😱", score: 0 },
            { text: "Check the charts obsessively 📊", score: 1 },
            { text: "Buy the dip with rent money 💎", score: 3 },
            { text: "Sell my organs to buy more 🫘", score: 5 }
        ]
    },
    {
        question: "How do you research new tokens?",
        options: [
            { text: "Read whitepapers and tokenomics 📚", score: 0 },
            { text: "Check Twitter for hype 🐦", score: 1 },
            { text: "If it has a dog logo, I'm in 🐕", score: 3 },
            { text: "Throw darts at a list of tokens 🎯", score: 5 }
        ]
    },
    {
        question: "What's your portfolio allocation strategy?",
        options: [
            { text: "60% stocks, 40% bonds 📈", score: 0 },
            { text: "50% crypto, 50% traditional 💼", score: 1 },
            { text: "90% crypto, 10% ramen money 🍜", score: 3 },
            { text: "200% crypto (borrowed money) 💸", score: 5 }
        ]
    },
    {
        question: "How often do you check crypto prices?",
        options: [
            { text: "Once a week 📅", score: 0 },
            { text: "Once a day 🌅", score: 1 },
            { text: "Every hour 🕐", score: 3 },
            { text: "I have charts tattooed on my eyelids 👁️", score: 5 }
        ]
    },
    {
        question: "What's your exit strategy?",
        options: [
            { text: "Take profits at 20% gain 💰", score: 0 },
            { text: "HODL until retirement 👴", score: 1 },
            { text: "Exit strategy? Never heard of her 🤷", score: 3 },
            { text: "Diamond hands until death 💀💎", score: 5 }
        ]
    }
];

let currentQuestionIndex = 0;
let quizScore = 0;

function startDegenQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    document.getElementById('startQuizBtn').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('quizResult').style.display = 'none';
    showQuestion();
}

function showQuestion() {
    const question = quizData[currentQuestionIndex];
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('quizProgress').textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;

    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'buy-button';
        button.textContent = option.text;
        button.onclick = () => selectAnswer(option.score);
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(score) {
    quizScore += score;
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';

    let resultData;
    if (quizScore <= 5) {
        resultData = {
            title: "🤓 Crypto Normie",
            description: "You're still learning the ways of the degen. Keep studying!",
            emoji: "🤓📚"
        };
    } else if (quizScore <= 10) {
        resultData = {
            title: "📈 Casual Trader",
            description: "You've got some degen energy, but there's room for more chaos!",
            emoji: "📊🤔"
        };
    } else if (quizScore <= 15) {
        resultData = {
            title: "💎 Diamond Hands",
            description: "You're a true believer! Your hands are certified diamond!",
            emoji: "💎🙌"
        };
    } else if (quizScore <= 20) {
        resultData = {
            title: "🤡 Certified Degen",
            description: "You've achieved peak degen status! Your portfolio is pure chaos!",
            emoji: "🤡🚀"
        };
    } else {
        resultData = {
            title: "👑 Degen Royalty",
            description: "You are the chosen one! The ultimate degen! Bow down, peasants!",
            emoji: "👑💀"
        };
    }

    document.getElementById('resultTitle').textContent = resultData.title;
    document.getElementById('resultDescription').textContent = resultData.description;
    document.getElementById('resultEmoji').textContent = resultData.emoji;

    gsap.from('#quizResult', { scale: 0, duration: 0.5, ease: "back.out(1.7)" });
}

function shareQuizResult() {
    const title = document.getElementById('resultTitle').textContent;
    const tweetText = `I just took the $CRYPTO Degen Quiz and got: ${title}! 🎯\n\nThink you're more degen than me? Take the test: [WEBSITE_URL]\n\n#CRYPTO #DegenTest #ToTheMoon`;
    const encodedText = encodeURIComponent(tweetText);
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank');
}

function restartQuiz() {
    document.getElementById('startQuizBtn').style.display = 'block';
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('quizResult').style.display = 'none';
}

function degenQuiz() {
    startDegenQuiz();
}

// AI Meme Generator
let currentAIMeme = {
    imageUrl: '',
    text: '',
    type: ''
};

// Meme Database API Client
class MemeDatabase {
    constructor() {
        this.baseUrl = window.location.origin;
        this.apiUrl = `${this.baseUrl}/api`;
        this.memes = [];
        this.loadMemes();
    }

    async loadMemes() {
        try {
            console.log('📚 Loading memes from database...');
            const response = await fetch(`${this.apiUrl}/memes?limit=50`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            this.memes = data.memes || [];
            console.log(`✅ Loaded ${this.memes.length} memes from database`);

            // Update the gallery display
            this.updateGalleryDisplay();
        } catch (error) {
            console.warn('Failed to load memes from database:', error);
            this.memes = [];
        }
    }

    async addMeme(imageUrl, text, type = 'unknown') {
        try {
            // Just save basic meme data to database (no IPFS upload yet)
            const memeData = {
                imageUrl: imageUrl, // Keep original URL for now
                ipfsHash: null, // Will be set when user downloads/shares
                text,
                type,
                corsMethod: currentAIMeme.corsMethod || 'Unknown',
                seed: currentAIMeme.seed || null
            };

            console.log('💾 Saving meme to database...');
            const response = await fetch(`${this.apiUrl}/memes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(memeData)
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            const meme = data.meme;

            // Add to local array for immediate display
            this.memes.unshift(meme);

            console.log(`✅ Added meme to database: "${text}"`);

            // Update the gallery display
            this.updateGalleryDisplay();

            return meme;
        } catch (error) {
            console.error('Failed to save meme to database:', error);

            // Fallback: add to local array only
            const fallbackMeme = {
                id: Date.now() + Math.random(),
                imageUrl,
                text,
                type,
                corsMethod: currentAIMeme.corsMethod || 'Unknown',
                timestamp: new Date().toISOString(),
                dateCreated: new Date().toLocaleString()
            };

            this.memes.unshift(fallbackMeme);
            this.updateGalleryDisplay();

            return fallbackMeme;
        }
    }

    async captureMemeAsBase64() {
        try {
            // Get the complete meme with text overlays
            const canvas = await this.createCompleteMemeCanvas();
            if (!canvas) return null;

            // Convert to base64
            const base64Data = canvas.toDataURL('image/png', 0.9);
            console.log('📸 Captured complete meme as base64');
            return base64Data;
        } catch (error) {
            console.error('Failed to capture meme as base64:', error);
            return null;
        }
    }

    async createCompleteMemeCanvas() {
        try {
            const img = document.getElementById('aiMemeImage');
            if (!img || !img.complete) {
                throw new Error('Image not loaded');
            }

            // Create canvas for the complete meme
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set canvas size to match the displayed image
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;

            // Draw the base image
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Draw all text elements from the meme editor
            if (window.textElements && window.textElements.length > 0) {
                window.textElements.forEach(element => {
                    ctx.font = `bold ${element.fontSize}px Arial, sans-serif`;
                    ctx.fillStyle = element.color;
                    ctx.strokeStyle = element.outlineColor;
                    ctx.lineWidth = element.outlineWidth;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';

                    const textX = element.x + element.width / 2;
                    const textY = element.y + element.height / 2;

                    // Draw text with outline
                    if (element.outlineWidth > 0) {
                        ctx.strokeText(element.text, textX, textY);
                    }
                    ctx.fillText(element.text, textX, textY);
                });
            }

            return canvas;
        } catch (error) {
            console.error('Failed to create complete meme canvas:', error);
            return null;
        }
    }

    async uploadToIPFS(base64Data, memeText) {
        try {
            console.log('🔄 Converting base64 to blob...');
            // Convert base64 to blob
            const response = await fetch(base64Data);
            const blob = await response.blob();

            console.log('📦 Creating form data for upload...');
            // Create simple form data for Pinata
            const formData = new FormData();
            formData.append('file', blob, `crypto-meme-${Date.now()}.png`);

            console.log('📡 Sending to backend API...');
            // Upload to Pinata via our backend (simplified)
            const uploadResponse = await fetch('/api/upload-to-ipfs', {
                method: 'POST',
                body: formData
            });

            if (!uploadResponse.ok) {
                const errorText = await uploadResponse.text();
                console.error('Backend response:', errorText);
                throw new Error(`IPFS upload failed: ${uploadResponse.status}`);
            }

            const result = await uploadResponse.json();
            console.log('✅ IPFS upload successful:', result.ipfsHash);

            return result.ipfsHash;
        } catch (error) {
            console.error('❌ IPFS upload failed:', error);
            return null;
        }
    }

    async deleteMeme(id) {
        try {
            const response = await fetch(`${this.apiUrl}/memes/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            // Remove from local array
            const index = this.memes.findIndex(meme => meme.id === id);
            if (index !== -1) {
                const deleted = this.memes.splice(index, 1)[0];
                console.log(`🗑️ Deleted meme: "${deleted.text}"`);
                this.updateGalleryDisplay();
                return true;
            }
        } catch (error) {
            console.error('Failed to delete meme:', error);
            return false;
        }
    }

    async getStats() {
        try {
            const response = await fetch(`${this.apiUrl}/stats`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            return await response.json();
        } catch (error) {
            console.error('Failed to fetch stats:', error);

            // Fallback: calculate from local data
            const stats = {
                totalMemes: this.memes.length,
                memesByType: {},
                recentMemes: this.memes.slice(0, 5)
            };

            this.memes.forEach(meme => {
                stats.memesByType[meme.type] = (stats.memesByType[meme.type] || 0) + 1;
            });

            return stats;
        }
    }

    getAllMemes() {
        return [...this.memes]; // Return copy to prevent direct modification
    }

    getMemesByType(type) {
        return this.memes.filter(meme => meme.type === type);
    }

    updateGalleryDisplay() {
        // Update the meme gallery in the UI
        updateMemeGallery();
    }
}

// Function to update meme with IPFS hash
async function updateMemeWithIPFS(originalImageUrl, ipfsHash) {
    try {
        console.log('🔄 Updating meme with IPFS hash...');

        const response = await fetch(`${memeDB.apiUrl}/memes/update-ipfs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                originalImageUrl,
                ipfsHash,
                ipfsUrl: `https://ipfs.io/ipfs/${ipfsHash}`
            })
        });

        if (response.ok) {
            console.log('✅ Database updated with IPFS hash');
            // Refresh the gallery to show IPFS URLs
            memeDB.loadMemes();
        } else {
            console.warn('⚠️ Failed to update database with IPFS hash');
        }
    } catch (error) {
        console.error('❌ Error updating meme with IPFS:', error);
    }
}

// Initialize the meme database
const memeDB = new MemeDatabase();
let memeGallery = []; // Keep for backward compatibility

function generateAIMeme(type) {
    const memePrompts = {
        stonks: [
            "stonks meme guy in suit pointing upward with cryptocurrency symbols, meme style, digital art",
            "business man celebrating with diamond hands and crypto charts going up, meme template style",
            "excited person pointing at cryptocurrency logo with stonks text style, internet meme"
        ],
        drake: [
            "drake meme template pointing and rejecting traditional money, approving cryptocurrency, meme style",
            "person rejecting boring investments and choosing crypto, drake meme format, digital art",
            "drake pointing meme with crypto symbols, classic meme template style"
        ],
        brain: [
            "expanding brain meme template with cryptocurrency evolution, four panels, meme style",
            "galaxy brain meme showing crypto investment levels, glowing brain, meme format",
            "brain expansion meme with diamond hands and crypto, internet meme style"
        ],
        crying: [
            "person crying while looking at red cryptocurrency charts on computer screen, meme style",
            "sad degen crying over portfolio losses, ramen noodles nearby, meme art",
            "crying wojak looking at crypto portfolio, internet meme style"
        ],
        diamond: [
            "hands literally made of diamonds holding cryptocurrency coins, epic digital art",
            "person with diamond hands refusing to sell crypto, superhero style, meme art",
            "diamond hands meme with sparkling crystal hands, crypto symbols, digital art"
        ],
        moon: [
            "astronaut on moon planting cryptocurrency flag, space background, epic digital art",
            "rocket ship flying to moon with crypto logo, space travel meme style",
            "person riding cryptocurrency rocket to the moon, meme art style"
        ],
        broke: [
            "person eating ramen noodles in empty apartment, crypto charts on phone, sad meme style",
            "broke college student with empty wallet but crypto on phone, meme art",
            "person living in cardboard box but checking crypto prices, internet meme"
        ],
        lambo: [
            "person dreaming of lamborghini while looking at crypto portfolio, dream bubble, meme style",
            "cryptocurrency logo on expensive sports car, lambo dreams meme art",
            "split screen: ramen vs lamborghini with crypto in middle, meme template"
        ],
        ramen: [
            "person eating instant ramen while checking cryptocurrency prices, college dorm, meme style",
            "ramen noodles next to crypto trading setup, broke student life, meme art",
            "sad person with empty fridge but crypto portfolio open, internet meme"
        ],
        rocket: [
            "cryptocurrency rocket ship launching to space, epic space art, meme style",
            "person riding crypto rocket through clouds, adventure meme art",
            "rocket with crypto logo breaking through atmosphere, digital art meme"
        ],
        degen: [
            "chaotic person surrounded by crypto charts and energy drinks, manic expression, meme art",
            "wild-eyed crypto trader with multiple monitors, pure chaos, internet meme style",
            "person with crazy hair and bloodshot eyes trading crypto, degen life meme"
        ],
        random: [
            "surreal crypto meme with floating diamond hands and moon background",
            "abstract cryptocurrency art with meme elements and rainbow colors",
            "chaotic crypto scene with rockets, diamonds, and moon, meme collage style"
        ]
    };

    const memeTexts = {
        stonks: [
            "STONKS 📈", "CRYPTO GAINS 🚀", "DIAMOND HANDS 💎", "TO THE MOON 🌙",
            "NUMBER GO UP", "INFINITE MONEY GLITCH", "STONK MARKET GENIUS", "BUY HIGH SELL LOW",
            "PORTFOLIO TO THE MOON", "GENERATIONAL WEALTH", "RETIREMENT SPEEDRUN", "LAMBO INCOMING",
            "WIFE CHANGING MONEY", "FINANCIAL FREEDOM", "PASSIVE INCOME KING", "COMPOUND INTEREST",
            "BULL MARKET FOREVER", "BEAR MARKET CANCELLED", "STONKS ONLY GO UP", "MONEY PRINTER GO BRRR"
        ],
        drake: [
            "NO: Traditional Investing", "YES: $CRYPTO ONLY", "REJECT: Savings Account", "EMBRACE: CRYPTO",
            "NO: Fiat Currency", "YES: Digital Gold", "REJECT: Banks", "EMBRACE: DeFi",
            "NO: Paper Hands", "YES: Diamond Hands", "REJECT: Fear", "EMBRACE: GREED",
            "NO: Selling", "YES: Hodling", "REJECT: Profits", "EMBRACE: Losses"
        ],
        brain: [
            "SMALL BRAIN: Stocks", "BIG BRAIN: Crypto", "GALAXY BRAIN: $CRYPTO", "UNIVERSE BRAIN: Diamond Hands",
            "SMOOTH BRAIN: Panic Sell", "WRINKLE BRAIN: Buy Dip", "GALAXY BRAIN: Hodl Forever", "UNIVERSE BRAIN: Sell Kidney",
            "TINY BRAIN: Save Money", "BIG BRAIN: Invest", "HUGE BRAIN: Crypto", "COSMIC BRAIN: Leverage Trading"
        ],
        crying: [
            "MY PORTFOLIO 😭", "BOUGHT THE TOP", "RAMEN AGAIN", "STILL HODLING 💎",
            "DOWN 90% BUT HODLING", "WIFE LEFT ME", "KIDS DISOWNED ME", "LIVING IN CAR",
            "SOLD KIDNEY FOR CRYPTO", "EATING CARDBOARD", "WATER SOUP DINNER", "PLASMA DONATION KING"
        ],
        diamond: [
            "DIAMOND HANDS 💎", "NEVER SELLING", "HODL FOREVER", "CRYSTAL CLEAR 💎",
            "PRESSURE MAKES DIAMONDS", "UNBREAKABLE GRIP", "STEEL RESOLVE", "IRON WILL",
            "DIAMOND FORMATION", "CARBON COMPRESSION", "GEOLOGICAL PATIENCE", "CRYSTALLINE STRUCTURE",
            "HARDEST SUBSTANCE", "ETERNAL HODLER", "DIAMOND MIND", "PRECIOUS STONES"
        ],
        moon: [
            "TO THE MOON 🚀", "MOON MISSION", "SPACE BOUND 🌙", "LUNAR LANDING",
            "ESCAPE VELOCITY", "ORBITAL MECHANICS", "APOLLO 11", "NEIL ARMSTRONG",
            "ONE SMALL STEP", "GIANT LEAP", "MOON ROCKS", "LUNAR SURFACE",
            "SPACE EXPLORATION", "COSMIC JOURNEY", "INTERSTELLAR TRAVEL", "GALAXY FAR AWAY"
        ],
        broke: [
            "BROKE BUT BULLISH", "RAMEN LIFE 🍜", "EMPTY WALLET", "CRYPTO > FOOD",
            "BEANS AND RICE DIET", "WATER SOUP SPECIAL", "CARDBOARD DINNER", "AIR SANDWICH",
            "FASTING FOR CRYPTO", "HUNGER GAMES", "SURVIVAL MODE", "POVERTY SPEEDRUN",
            "NEGATIVE NET WORTH", "DEBT COLLECTOR CALLS", "EVICTION NOTICE", "LIVING IN TENT"
        ],
        lambo: [
            "LAMBO SOON 🏎️", "DREAM CAR", "CRYPTO GAINS", "MOON LAMBO",
            "FERRARI INCOMING", "BUGATTI DREAMS", "MCLAREN VIBES", "PORSCHE GOALS",
            "SUPERCAR GARAGE", "EXOTIC COLLECTION", "HYPERCAR LIFE", "LUXURY LIFESTYLE",
            "VALET PARKING", "CARBON FIBER", "V12 ENGINE", "HORSEPOWER ADDICTION"
        ],
        ramen: [
            "RAMEN AGAIN 🍜", "BROKE LIFE", "CRYPTO DIET", "NOODLE GANG",
            "SODIUM OVERDOSE", "MSG ADDICTION", "FLAVOR PACKET", "COLLEGE CUISINE",
            "BACHELOR CHOW", "SURVIVAL FOOD", "INSTANT NOODLES", "POVERTY MEAL",
            "WATER AND SALT", "CARB LOADING", "CHEAP EATS", "STUDENT SPECIAL"
        ],
        rocket: [
            "ROCKET FUEL 🚀", "BLAST OFF", "SPACE MISSION", "MOON BOUND",
            "ESCAPE VELOCITY", "ORBITAL MECHANICS", "THRUST VECTOR", "PAYLOAD DELIVERY",
            "STAGE SEPARATION", "BOOSTER IGNITION", "COUNTDOWN SEQUENCE", "LAUNCH WINDOW",
            "MISSION CONTROL", "HOUSTON WE HAVE", "APOLLO PROGRAM", "SPACEX VIBES"
        ],
        degen: [
            "PURE DEGEN 🤡", "CHAOS MODE", "MAXIMUM RISK", "YOLO LIFE",
            "SMOOTH BRAIN MOVES", "GALAXY BRAIN PLAYS", "BIG BRAIN TIME", "WRINKLE BRAIN",
            "MONKE SEE MONKE DO", "APE TOGETHER STRONG", "BANANA REPUBLIC", "GORILLA WARFARE",
            "CRAYON EATING CONTEST", "GLUE SNIFFING CHAMPION", "PAINT CHIP CONNOISSEUR", "LEAD PAINT LOVER",
            "WINDOW LICKER", "HELMET WEARER", "SAFETY SCISSORS", "VELCRO SHOES"
        ],
        random: [
            "CRYPTO CHAOS", "MEME MAGIC", "DEGEN ENERGY", "MOON VIBES",
            "HOPIUM OVERDOSE", "COPIUM ADDICTION", "DELUSION LEVEL MAX", "REALITY CHECK BOUNCED",
            "SANITY LEFT CHAT", "LOGIC DISCONNECTED", "BRAIN.EXE STOPPED", "COMMON SENSE UNINSTALLED",
            "SMART MONEY EXITED", "DUMB MONEY ENTERED", "WHALE MANIPULATION", "SHRIMP PORTFOLIO",
            "PROBABLY NOTHING", "BULLISH AF", "BEARISH SENTIMENT", "CRAB MARKET",
            "SIDEWAYS ACTION", "PUMP AND DUMP", "RUG PULL INCOMING", "DIAMOND HANDS ACTIVATED"
        ]
    };

    showMemeLoading();

    const prompts = memePrompts[type] || memePrompts.random;
    const texts = memeTexts[type] || memeTexts.random;

    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    const randomText = texts[Math.floor(Math.random() * texts.length)];

    currentAIMeme.type = type;
    currentAIMeme.text = randomText;

    generateAIImage(randomPrompt, randomText);
}

function generateCustomAIMeme() {
    const customText = document.getElementById('customMemeText').value.trim();
    if (!customText) {
        alert('Please enter a meme idea first! 🎨');
        return;
    }

    showMemeLoading();

    const prompt = `${customText}, cryptocurrency meme style, digital art, internet meme`;
    currentAIMeme.type = 'custom';
    currentAIMeme.text = customText.toUpperCase();

    generateAIImage(prompt, currentAIMeme.text);
}

async function generateAIImage(prompt, text) {
    // Encode the prompt for URL
    const encodedPrompt = encodeURIComponent(prompt);

    // Generate a unique seed for this request
    const seed = Math.floor(Math.random() * 10000);
    const directUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=600&seed=${seed}`;

    currentAIMeme.imageUrl = directUrl;
    currentAIMeme.seed = seed;

    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 90) progress = 90;
        document.getElementById('loadingBar').style.width = progress + '%';
    }, 500);

    try {
        // Add timeout to prevent hanging
        const imageUrl = await Promise.race([
            loadImageWithCORS(directUrl),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Image generation timeout')), 15000)
            )
        ]);

        clearInterval(loadingInterval);
        document.getElementById('loadingBar').style.width = '100%';

        setTimeout(() => {
            hideMemeLoading();
            displayAIMeme(imageUrl, text);
            addToMemeGallery(imageUrl, text);
        }, 500);

    } catch (error) {
        console.error('Failed to load AI image:', error);
        clearInterval(loadingInterval);
        hideMemeLoading();

        // Show user-friendly error with retry option
        showImageLoadError(prompt, text);
    }
}

async function loadImageWithCORS(imageUrl) {
    // Store original URL for database storage
    currentAIMeme.originalUrl = imageUrl;

    // Fast approach: Try blob conversion first (most reliable for downloads)
    try {
        console.log('🚀 Trying fast blob conversion...');
        const blobUrl = await fetchImageAsBlob(imageUrl);
        currentAIMeme.blobUrl = blobUrl;
        currentAIMeme.corsMethod = 'Blob Conversion (Full Download)';
        console.log('✅ Fast blob conversion successful - full download available!');
        return blobUrl;
    } catch (error) {
        console.warn('❌ Fast blob conversion failed:', error.message);
    }

    // Fallback: Try one reliable proxy quickly
    try {
        console.log('🔄 Trying reliable proxy...');
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(imageUrl)}`;

        const response = await Promise.race([
            fetch(proxyUrl, {
                mode: 'cors',
                headers: { 'Accept': 'image/*' }
            }),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Proxy timeout')), 8000)
            )
        ]);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const blob = await response.blob();

        if (!blob.type.startsWith('image/')) {
            throw new Error('Invalid image response');
        }

        const blobUrl = URL.createObjectURL(blob);
        currentAIMeme.blobUrl = blobUrl;
        currentAIMeme.corsMethod = 'Proxy (Full Download)';
        console.log('✅ Proxy successful - full download available!');
        return blobUrl;

    } catch (error) {
        console.warn('❌ Proxy failed:', error.message);
    }

    // Last resort: Direct load (limited download capability)
    console.log('⚠️ Using direct load - download may be limited');
    return await loadImageDirect(imageUrl);
}

async function fetchImageAsBlob(imageUrl) {
    // Try direct fetch first (works if CORS headers are set)
    const response = await Promise.race([
        fetch(imageUrl, {
            mode: 'cors',
            headers: { 'Accept': 'image/*' }
        }),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Direct fetch timeout')), 5000)
        )
    ]);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const blob = await response.blob();

    if (!blob.type.startsWith('image/')) {
        throw new Error('Response is not an image');
    }

    return URL.createObjectURL(blob);
}

async function loadImageDirect(imageUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = function() {
            currentAIMeme.corsMethod = 'Direct (limited download)';
            console.log('✅ Image loaded directly (download may be limited)');
            resolve(imageUrl);
        };

        img.onerror = function() {
            reject(new Error('Direct image load failed'));
        };

        img.src = imageUrl;
    });
}

function showImageLoadError(prompt, text) {
    hideMemeLoading();

    const errorHtml = `
        <div style="background: rgba(255,0,0,0.1); border: 2px solid #ff4444; border-radius: 15px; padding: 30px; margin: 20px 0; text-align: center;">
            <h3 style="color: #ff4444; margin-bottom: 15px;">🚨 AI Image Generation Failed</h3>
            <p style="color: #fff; margin-bottom: 20px;">The AI service is having issues. This happens sometimes! 🤖💔</p>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button class="buy-button" onclick="retryImageGeneration('${prompt.replace(/'/g, "\\'")}', '${text.replace(/'/g, "\\'")}')">🔄 Try Again</button>
                <button class="buy-button" onclick="generateAIMeme('random')">🎲 Random Meme</button>
                <button class="buy-button" onclick="hideImageError()">❌ Close</button>
            </div>
            <p style="color: #ccc; font-size: 0.8rem; margin-top: 15px;">
                💡 Tip: Try a different meme type or wait a moment and retry!
            </p>
        </div>
    `;

    // Insert error message before the meme display
    const aiMemeDisplay = document.getElementById('aiMemeDisplay');
    aiMemeDisplay.innerHTML = errorHtml;
    aiMemeDisplay.style.display = 'block';
}

function retryImageGeneration(prompt, text) {
    hideImageError();
    generateAIImage(prompt, text);
}

function hideImageError() {
    document.getElementById('aiMemeDisplay').style.display = 'none';
}

function showMemeLoading() {
    document.getElementById('memeLoading').style.display = 'block';
    document.getElementById('aiMemeDisplay').style.display = 'none';
    document.getElementById('loadingBar').style.width = '0%';

    gsap.from('#memeLoading', { scale: 0, duration: 0.5, ease: "back.out(1.7)" });
}

function hideMemeLoading() {
    document.getElementById('memeLoading').style.display = 'none';
}

// Advanced Text System
let textElements = [];
let selectedTextElement = null;
let isDragging = false;
let isResizing = false;
let dragOffset = { x: 0, y: 0 };

function displayAIMeme(imageUrl, text) {
    const img = document.getElementById('aiMemeImage');
    const canvas = document.getElementById('memeTextCanvas');

    img.src = imageUrl;

    img.onload = function() {
        // Set canvas size to match image
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.style.width = img.offsetWidth + 'px';
        canvas.style.height = img.offsetHeight + 'px';

        // Clear existing text elements
        textElements = [];
        selectedTextElement = null;

        // Set default text in input
        document.getElementById('memeTextInput').value = '';

        // Add $CRYPTO branding
        addBrandingText();

        // Add default AI-generated text if provided
        if (text && text.trim()) {
            addDefaultMemeText(text.trim());
        }

        // Setup canvas interactions
        setupCanvasInteractions();

        // Draw the meme
        drawAllText();

        // Don't show CORS status anymore - it's distracting
        // showCORSStatus();
    };

    document.getElementById('aiMemeDisplay').style.display = 'block';
    gsap.from('#aiMemeDisplay', { scale: 0, duration: 0.5, ease: "back.out(1.7)" });
}

function addDefaultMemeText(text) {
    const canvas = document.getElementById('memeTextCanvas');

    // Add main text element (centered)
    const mainTextElement = {
        id: 'default-main-' + Date.now(),
        text: text.toUpperCase(),
        x: canvas.width / 2 - 150,
        y: canvas.height - 80,
        fontSize: Math.max(canvas.width / 20, 32),
        color: '#ffffff',
        outlineColor: '#000000',
        outlineWidth: 3,
        width: 300,
        height: 50,
        isSelected: false,
        isBranding: false,
        isDefault: true
    };

    textElements.push(mainTextElement);

    // Add a complementary top text for some meme types
    const topTexts = {
        'STONKS': 'WHEN YOU BUY $CRYPTO',
        'DIAMOND HANDS': 'HODLING THROUGH THE DIP',
        'MOON SOON': 'DESTINATION: MOON',
        'PURE DEGEN': 'ME TRADING $CRYPTO',
        'BROKE LIFE': 'MY BANK ACCOUNT',
        'LAMBO DREAMS': 'FUTURE ME WITH $CRYPTO',
        'RAMEN AGAIN': 'DINNER PLANS',
        'STILL HODLING': 'PORTFOLIO DOWN 90%',
        'THIS IS FINE': 'EVERYTHING IS CRASHING BUT'
    };

    // Check if we should add a top text
    const matchingTopText = Object.keys(topTexts).find(key =>
        text.toUpperCase().includes(key)
    );

    if (matchingTopText) {
        const topTextElement = {
            id: 'default-top-' + Date.now(),
            text: topTexts[matchingTopText],
            x: canvas.width / 2 - 150,
            y: 30,
            fontSize: Math.max(canvas.width / 25, 28),
            color: '#ffffff',
            outlineColor: '#000000',
            outlineWidth: 3,
            width: 300,
            height: 40,
            isSelected: false,
            isBranding: false,
            isDefault: true
        };

        textElements.push(topTextElement);
    }
}

function addBrandingText() {
    const canvas = document.getElementById('memeTextCanvas');
    const brandElement = {
        id: 'brand-' + Date.now(),
        text: '$CRYPTO',
        x: canvas.width - 100,
        y: 20,
        fontSize: 24,
        color: '#ffffff',
        outlineColor: '#000000',
        outlineWidth: 2,
        width: 80,
        height: 30,
        isSelected: false,
        isBranding: true
    };
    textElements.push(brandElement);
}

function addDraggableText() {
    const textInput = document.getElementById('memeTextInput');
    const text = textInput.value.trim();

    if (!text) {
        alert('Please enter some text first! 📝');
        return;
    }

    const canvas = document.getElementById('memeTextCanvas');
    const newElement = {
        id: 'text-' + Date.now(),
        text: text.toUpperCase(),
        x: canvas.width / 2 - 100,
        y: canvas.height / 2 - 20,
        fontSize: parseInt(document.getElementById('textSizeSlider').value),
        color: document.getElementById('textColorPicker').value,
        outlineColor: document.getElementById('textOutlineColorPicker').value,
        outlineWidth: parseInt(document.getElementById('textOutlineSlider').value),
        width: 200,
        height: 40,
        isSelected: false,
        isBranding: false
    };

    textElements.push(newElement);
    selectTextElement(newElement);
    drawAllText();

    // Clear input
    textInput.value = '';

    // Visual feedback
    gsap.from(canvas, { scale: 1.02, duration: 0.2, ease: "back.out(1.7)" });
}

function setupCanvasInteractions() {
    const canvas = document.getElementById('memeTextCanvas');
    const img = document.getElementById('aiMemeImage');
    canvas.style.pointerEvents = 'auto';

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('dblclick', handleDoubleClick);

    // Override right-click to save complete meme
    const memeContainer = document.getElementById('memeCanvas');
    memeContainer.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        downloadAIMeme();
        return false;
    });

    // Also override right-click on the image itself
    img.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        downloadAIMeme();
        return false;
    });
}

function handleDoubleClick(e) {
    const canvas = document.getElementById('memeTextCanvas');
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Check if double-clicking on a text element
    for (let i = textElements.length - 1; i >= 0; i--) {
        const element = textElements[i];
        if (isPointInElement(x, y, element) && !element.isBranding) {
            editTextElement(element);
            break;
        }
    }
}

function editTextElement(element) {
    const newText = prompt('Edit text:', element.text);
    if (newText !== null && newText.trim()) {
        element.text = newText.trim().toUpperCase();
        drawAllText();

        // Visual feedback
        gsap.to('#memeTextCanvas', { scale: 1.02, duration: 0.1, yoyo: true, repeat: 1 });
    }
}

function handleMouseDown(e) {
    const canvas = document.getElementById('memeTextCanvas');
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Check if clicking on a text element
    for (let i = textElements.length - 1; i >= 0; i--) {
        const element = textElements[i];
        if (isPointInElement(x, y, element)) {
            selectTextElement(element);

            // Check if clicking on resize handle (bottom-right corner)
            if (isPointInResizeHandle(x, y, element)) {
                isResizing = true;
            } else {
                isDragging = true;
                dragOffset.x = x - element.x;
                dragOffset.y = y - element.y;
            }
            break;
        }
    }

    if (!isDragging && !isResizing) {
        selectTextElement(null);
    }
}

function handleMouseMove(e) {
    if (!selectedTextElement) return;

    const canvas = document.getElementById('memeTextCanvas');
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (isDragging) {
        selectedTextElement.x = x - dragOffset.x;
        selectedTextElement.y = y - dragOffset.y;

        // Keep within bounds
        selectedTextElement.x = Math.max(0, Math.min(canvas.width - selectedTextElement.width, selectedTextElement.x));
        selectedTextElement.y = Math.max(0, Math.min(canvas.height - selectedTextElement.height, selectedTextElement.y));

        drawAllText();
    } else if (isResizing) {
        const newWidth = Math.max(50, x - selectedTextElement.x);
        const newHeight = Math.max(20, y - selectedTextElement.y);

        selectedTextElement.width = newWidth;
        selectedTextElement.height = newHeight;

        // Update font size based on height
        selectedTextElement.fontSize = Math.max(12, Math.min(100, newHeight * 0.8));
        document.getElementById('textSizeSlider').value = selectedTextElement.fontSize;
        document.getElementById('textSizeValue').textContent = selectedTextElement.fontSize + 'px';

        drawAllText();
    }
}

function handleMouseUp(e) {
    isDragging = false;
    isResizing = false;
}

function handleCanvasClick(e) {
    // This is handled in mousedown to avoid conflicts
}

function isPointInElement(x, y, element) {
    return x >= element.x && x <= element.x + element.width &&
           y >= element.y && y <= element.y + element.height;
}

function isPointInResizeHandle(x, y, element) {
    const handleSize = 15;
    const handleX = element.x + element.width - handleSize;
    const handleY = element.y + element.height - handleSize;

    return x >= handleX && x <= handleX + handleSize &&
           y >= handleY && y <= handleY + handleSize;
}

function selectTextElement(element) {
    // Deselect all
    textElements.forEach(el => el.isSelected = false);

    selectedTextElement = element;
    if (element) {
        element.isSelected = true;

        // Update controls to match selected element
        document.getElementById('textSizeSlider').value = element.fontSize;
        document.getElementById('textSizeValue').textContent = element.fontSize + 'px';
        document.getElementById('textColorPicker').value = element.color;
        document.getElementById('textOutlineColorPicker').value = element.outlineColor;
        document.getElementById('textOutlineSlider').value = element.outlineWidth;
        document.getElementById('textOutlineValue').textContent = element.outlineWidth + 'px';
    }

    drawAllText();
}

function drawAllText() {
    const canvas = document.getElementById('memeTextCanvas');
    const ctx = canvas.getContext('2d');

    if (!canvas.width || !canvas.height) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all text elements
    textElements.forEach(element => {
        drawTextElement(ctx, element);
    });
}

function drawTextElement(ctx, element) {
    // Set text properties
    ctx.font = `bold ${element.fontSize}px Impact, Arial`;
    ctx.fillStyle = element.color;
    ctx.strokeStyle = element.outlineColor;
    ctx.lineWidth = element.outlineWidth;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw text
    const centerX = element.x + element.width / 2;
    const centerY = element.y + element.height / 2;

    if (element.outlineWidth > 0) {
        ctx.strokeText(element.text, centerX, centerY);
    }
    ctx.fillText(element.text, centerX, centerY);

    // Draw selection indicators
    if (element.isSelected) {
        drawSelectionIndicators(ctx, element);
    }
}

function drawSelectionIndicators(ctx, element) {
    // Selection border
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(element.x, element.y, element.width, element.height);
    ctx.setLineDash([]);

    // Resize handle (bottom-right corner)
    const handleSize = 15;
    const handleX = element.x + element.width - handleSize;
    const handleY = element.y + element.height - handleSize;

    ctx.fillStyle = '#00ff00';
    ctx.fillRect(handleX, handleY, handleSize, handleSize);

    // Handle icon
    ctx.fillStyle = '#000000';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⟲', handleX + handleSize/2, handleY + handleSize/2);
}

function updateSelectedTextStyle() {
    if (!selectedTextElement) return;

    selectedTextElement.fontSize = parseInt(document.getElementById('textSizeSlider').value);
    selectedTextElement.color = document.getElementById('textColorPicker').value;
    selectedTextElement.outlineColor = document.getElementById('textOutlineColorPicker').value;
    selectedTextElement.outlineWidth = parseInt(document.getElementById('textOutlineSlider').value);

    // Update display values
    document.getElementById('textSizeValue').textContent = selectedTextElement.fontSize + 'px';
    document.getElementById('textOutlineValue').textContent = selectedTextElement.outlineWidth + 'px';

    drawAllText();
}

function resetToOriginal() {
    // Clear all non-branding text
    textElements = textElements.filter(el => el.isBranding);
    selectedTextElement = null;

    // Re-add the original AI text
    if (currentAIMeme.text && currentAIMeme.text.trim()) {
        addDefaultMemeText(currentAIMeme.text);
    }

    drawAllText();

    // Visual feedback
    gsap.from('#memeTextCanvas', { scale: 1.05, duration: 0.3, ease: "back.out(1.7)" });
}

function clearAllText() {
    textElements = textElements.filter(el => el.isBranding); // Keep only branding
    selectedTextElement = null;
    drawAllText();
}

function duplicateSelectedText() {
    if (!selectedTextElement || selectedTextElement.isBranding) return;

    const duplicate = {
        ...selectedTextElement,
        id: 'text-' + Date.now(),
        x: selectedTextElement.x + 20,
        y: selectedTextElement.y + 20,
        isSelected: false
    };

    textElements.push(duplicate);
    selectTextElement(duplicate);
    drawAllText();
}

function deleteSelectedText() {
    if (!selectedTextElement || selectedTextElement.isBranding) return;

    textElements = textElements.filter(el => el.id !== selectedTextElement.id);
    selectedTextElement = null;
    drawAllText();
}

function bringToFront() {
    if (!selectedTextElement) return;

    // Remove from current position
    textElements = textElements.filter(el => el.id !== selectedTextElement.id);
    // Add to end (top layer)
    textElements.push(selectedTextElement);
    drawAllText();
}

function randomMemeText() {
    const randomTexts = [
        "WHEN YOU BUY $CRYPTO",
        "PORTFOLIO DOWN 90%",
        "DIAMOND HANDS ACTIVATED",
        "BOUGHT THE DIP",
        "MOON MISSION LOADING",
        "RAMEN FOR DINNER AGAIN",
        "STILL HODLING 💎",
        "THIS IS FINE 🔥",
        "MOON SOON 🚀",
        "TRUST THE PROCESS",
        "NGMI WITHOUT $CRYPTO",
        "WAGMI TOGETHER",
        "PURE DEGEN ENERGY",
        "LAMBO OR RAMEN",
        "CRYPTO CHOSE ME",
        "SER THIS IS WENDY'S",
        "HAVE FUN STAYING POOR",
        "NUMBER GO UP TECHNOLOGY",
        "ZOOM OUT BRO",
        "JUST UP FOREVER",
        "COPE AND SEETHE",
        "PROBABLY NOTHING",
        "BULLISH AF 📈",
        "BEAR MARKET CANCELLED",
        "GENERATIONAL WEALTH",
        "RETIREMENT SPEEDRUN",
        "WIFE CHANGING MONEY",
        "FINANCIAL ADVICE: YOLO",
        "SELL KIDNEY FOR CRYPTO",
        "MORTGAGE THE HOUSE",
        "KIDS COLLEGE FUND = GONE",
        "EATING CARDBOARD TONIGHT",
        "BEANS AND RICE DIET",
        "LIVING IN PARENTS BASEMENT",
        "SOLD MY CAR FOR CRYPTO",
        "MAXED OUT CREDIT CARDS",
        "BORROWING FROM FRIENDS",
        "SECOND JOB AT MCDONALDS",
        "UBER DRIVER BY NIGHT",
        "BLOOD BANK REGULAR",
        "PLASMA DONATION KING",
        "COUCH CUSHION MINING",
        "SPARE CHANGE COLLECTOR",
        "GARAGE SALE EVERYTHING",
        "EBAY SELLING SPREE",
        "FACEBOOK MARKETPLACE PRO",
        "CRAIGSLIST HUSTLER",
        "GIG ECONOMY WARRIOR",
        "SIDE HUSTLE MASTER",
        "GRINDSET MENTALITY",
        "SIGMA MALE ENERGY",
        "ALPHA CRYPTO CHAD",
        "BETA FIAT CUCK",
        "GIGACHAD HODLER",
        "VIRGIN PAPER HANDS",
        "CHAD DIAMOND HANDS",
        "WOJAK PORTFOLIO",
        "PEPE GAINS INCOMING",
        "FEELS GOOD MAN",
        "RARE PEPE COLLECTOR",
        "DOGE TO THE MOON",
        "SHIBA INU ARMY",
        "APE TOGETHER STRONG",
        "MONKE SEE MONKE BUY",
        "BANANA FOR SCALE",
        "SMOOTH BRAIN MOVES",
        "WRINKLE BRAIN PLAYS",
        "BIG BRAIN TIME",
        "GALAXY BRAIN STRATEGY",
        "5D CHESS MOVES",
        "PLAYING 4D CHECKERS",
        "INTERDIMENSIONAL TRADING",
        "TIME TRAVELER CONFIRMED",
        "FUTURE MILLIONAIRE",
        "PAST BROKE COLLEGE KID",
        "PRESENT RAMEN EATER",
        "HOPIUM OVERDOSE",
        "COPIUM ADDICTION",
        "HOPIUM DEALER",
        "COPIUM SUPPLIER",
        "HOPIUM FACTORY",
        "COPIUM WAREHOUSE",
        "DELUSION LEVEL: MAXIMUM",
        "REALITY CHECK BOUNCED",
        "SANITY LEFT THE CHAT",
        "LOGIC HAS DISCONNECTED",
        "REASON.EXE STOPPED WORKING",
        "BRAIN.DLL NOT FOUND",
        "COMMON SENSE UNINSTALLED",
        "WISDOM CORRUPTED",
        "INTELLIGENCE DEPRECATED",
        "SMART MONEY EXITED",
        "DUMB MONEY ENTERED",
        "RETAIL INVESTOR DETECTED",
        "INSTITUTIONAL MONEY FLED",
        "WHALES ARE DUMPING",
        "SHRIMP KEEP BUYING",
        "PLANKTON PORTFOLIO",
        "MINNOW MOVES",
        "GOLDFISH MEMORY",
        "SHARK ATTACK INCOMING",
        "WHALE MANIPULATION",
        "DOLPHIN SPLASH",
        "OCTOPUS TENTACLES",
        "JELLYFISH BRAIN",
        "STARFISH REGENERATION",
        "CRAB MARKET SIDEWAYS",
        "LOBSTER CLAWS DIAMOND",
        "SHRIMP ON THE BARBIE",
        "FISH AND CHIPS DINNER",
        "SUSHI GRADE LOSSES",
        "CAVIAR DREAMS",
        "TUNA SANDWICH REALITY",
        "WHEN LAMBO SER?",
        "GM CRYPTO TWITTER",
        "GN SWEET DREAMS",
        "FUD IS TEMPORARY",
        "DIAMOND HANDS ETERNAL",
        "PAPER HANDS NGMI",
        "WAGMI TO THE MOON",
        "HFSP NORMIES",
        "IYKYK CRYPTO GANG",
        "DYOR ALWAYS",
        "NFA BUT BULLISH",
        "REKT BUT LEARNING",
        "SAFU FUNDS ONLY",
        "BUIDL NOT SPECULATION",
        "HODL GANG RISE UP",
        "FOMO INTO EVERYTHING",
        "YOLO LIFE CHOICES",
        "NGMI WITHOUT RISK",
        "WAGMI TOGETHER STRONG",
        "HFSP PAPER HANDS",
        "IYKYK DIAMOND CLUB",
        "DYOR OR GET REKT",
        "NFA FINANCIAL ADVICE",
        "SAFU WALLET SECURED",
        "BUIDL THE FUTURE",
        "FOMO FEAR MISSING OUT",
        "YOLO YOU ONLY LIVE",
        "REKT ABSOLUTELY DESTROYED",
        "CHAD ENERGY ACTIVATED",
        "VIRGIN FIAT MINDSET",
        "GIGACHAD CRYPTO HOLDER",
        "BETA PAPER HANDS",
        "ALPHA DIAMOND HANDS",
        "SIGMA GRINDSET MODE",
        "BASED AND CRYPTOPILLED",
        "CRINGE FIAT LOVER",
        "COPE HARDER NOCOINER",
        "SEETHE MORE HATER",
        "DILATE PORTFOLIO LOSSES",
        "TOUCH GRASS NORMIE",
        "RATIO PLUS L PLUS",
        "SKILL ISSUE DETECTED",
        "GET GOOD SCRUB",
        "IMAGINE NOT HODLING",
        "COULDN'T BE ME",
        "STAY MAD BOOMER",
        "OK ZOOMER ENERGY",
        "MILLENNIAL BROKE VIBES",
        "GEN X FORGOTTEN",
        "BOOMER MINDSET CRINGE",
        "ZOOMER DIAMOND HANDS",
        "ALPHA GEN CRYPTO",
        "SILENT GEN CONFUSED"
    ];

    const randomText = randomTexts[Math.floor(Math.random() * randomTexts.length)];
    document.getElementById('memeTextInput').value = randomText;
}

function downloadAIMeme() {
    const img = document.getElementById('aiMemeImage');

    // Wait for image to be fully loaded
    if (!img.complete) {
        img.onload = () => downloadAIMeme();
        return;
    }

    // Show download status
    showDownloadStatus('Preparing download...', 'info');

    // Check if we have a blob URL (which should always be downloadable)
    if (currentAIMeme.blobUrl || currentAIMeme.corsMethod?.includes('Download')) {
        console.log('✅ Using blob URL for guaranteed download');
        downloadMemeWithBlobSupport();
        return;
    }

    try {
        // Create a new canvas for download
        const downloadCanvas = document.createElement('canvas');
        const ctx = downloadCanvas.getContext('2d');

        // Set canvas size to match the original image
        downloadCanvas.width = img.naturalWidth;
        downloadCanvas.height = img.naturalHeight;

        // Test if we can draw the image (CORS check)
        ctx.drawImage(img, 0, 0, downloadCanvas.width, downloadCanvas.height);

        // Try to access the canvas data (this will fail if tainted)
        const testData = downloadCanvas.toDataURL('image/png', 0.1);

        // If we get here, the canvas is not tainted - proceed with full download
        downloadMemeWithCanvas(downloadCanvas, ctx);

    } catch (error) {
        console.error('Canvas download failed:', error);

        // Try alternative download method
        downloadMemeAlternative();
    }
}

async function downloadMemeWithBlobSupport() {
    try {
        // Create a new canvas for the complete meme
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = document.getElementById('aiMemeImage');

        // Set canvas size
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        // Draw the image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Draw all text elements
        textElements.forEach(element => {
            ctx.font = `bold ${element.fontSize}px Arial, sans-serif`;
            ctx.fillStyle = element.color;
            ctx.strokeStyle = element.outlineColor;
            ctx.lineWidth = element.outlineWidth;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const textX = element.x + element.width / 2;
            const textY = element.y + element.height / 2;

            if (element.outlineWidth > 0) {
                ctx.strokeText(element.text, textX, textY);
            }
            ctx.fillText(element.text, textX, textY);
        });

        // Upload to IPFS before download
        console.log('📡 Uploading final meme to IPFS...');
        showDownloadStatus('📡 Uploading to IPFS...', 'info');

        const base64Data = canvas.toDataURL('image/png', 0.9);
        const memeText = currentAIMeme.text || 'Custom Meme';
        const ipfsHash = await memeDB.uploadToIPFS(base64Data, memeText);

        if (ipfsHash) {
            console.log('✅ IPFS upload successful:', ipfsHash);

            // Update database with IPFS hash using original URL
            await updateMemeWithIPFS(currentAIMeme.originalUrl || currentAIMeme.imageUrl, ipfsHash);

            showDownloadStatus('✅ Uploaded to IPFS! Starting download...', 'success');
        } else {
            console.warn('⚠️ IPFS upload failed, proceeding with download');
            showDownloadStatus('⚠️ IPFS upload failed, downloading anyway...', 'warning');
        }

        // Create download link
        const link = document.createElement('a');
        link.download = `crypto-ai-meme-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => {
            showDownloadStatus('✅ Meme downloaded successfully!', 'success');
        }, 1000);

    } catch (error) {
        console.error('Blob-supported download failed:', error);
        downloadMemeAlternative();
    }
}

function downloadMemeAlternative() {
    showDownloadStatus('⚠️ Download blocked - using alternatives', 'error');

    // Show helpful alternatives
    const alternativeModal = `
        <div id="downloadAlternativeModal" style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.9);
            z-index: 10004;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        ">
            <div style="
                background: linear-gradient(45deg, #1a1a1a, #2a2a2a);
                border: 2px solid #ff8800;
                border-radius: 20px;
                padding: 30px;
                max-width: 500px;
                text-align: center;
                color: white;
            ">
                <h3 style="color: #ff8800; margin-bottom: 20px;">📸 Alternative Download Methods</h3>
                <p style="margin-bottom: 20px; color: #ccc;">
                    Browser security blocked the download, but here are easy alternatives:
                </p>

                <div style="text-align: left; background: rgba(0,0,0,0.3); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <p style="margin: 10px 0;"><strong>Method 1:</strong> Right-click the meme → "Save image as..."</p>
                    <p style="margin: 10px 0;"><strong>Method 2:</strong> Take a screenshot (Print Screen key)</p>
                    <p style="margin: 10px 0;"><strong>Method 3:</strong> Use "Share with Image" to upload automatically</p>
                </div>

                <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                    <button class="buy-button" onclick="shareAIMeme()">🐦 Share Instead</button>
                    <button class="buy-button" onclick="regenerateAIMeme()">🔄 Try New Meme</button>
                    <button class="buy-button" onclick="closeDownloadAlternativeModal()">✅ Got It</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', alternativeModal);
    gsap.from('#downloadAlternativeModal > div', { scale: 0, duration: 0.5, ease: "back.out(1.7)" });
}

function closeDownloadAlternativeModal() {
    const modal = document.getElementById('downloadAlternativeModal');
    if (modal) {
        modal.remove();
    }
}

async function downloadMemeWithCanvas(downloadCanvas, ctx) {
    try {
        // Clear and redraw everything properly
        ctx.clearRect(0, 0, downloadCanvas.width, downloadCanvas.height);

        // Draw the base AI image
        const img = document.getElementById('aiMemeImage');
        ctx.drawImage(img, 0, 0, downloadCanvas.width, downloadCanvas.height);

        // Draw all text elements on top (without selection indicators)
        textElements.forEach(element => {
            // Set text properties
            ctx.font = `bold ${element.fontSize}px Arial, sans-serif`;
            ctx.fillStyle = element.color;
            ctx.strokeStyle = element.outlineColor;
            ctx.lineWidth = element.outlineWidth;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Draw text with outline
            const textX = element.x + element.width / 2;
            const textY = element.y + element.height / 2;

            if (element.outlineWidth > 0) {
                ctx.strokeText(element.text, textX, textY);
            }
            ctx.fillText(element.text, textX, textY);
        });

        // Upload to IPFS before download
        console.log('📡 Uploading final meme to IPFS...');
        showDownloadStatus('📡 Uploading to IPFS...', 'info');

        const base64Data = downloadCanvas.toDataURL('image/png', 0.9);
        const memeText = currentAIMeme.text || 'Custom Meme';
        const ipfsHash = await memeDB.uploadToIPFS(base64Data, memeText);

        if (ipfsHash) {
            console.log('✅ IPFS upload successful:', ipfsHash);

            // Update database with IPFS hash using original URL
            await updateMemeWithIPFS(currentAIMeme.originalUrl || currentAIMeme.imageUrl, ipfsHash);

            showDownloadStatus('✅ Uploaded to IPFS! Starting download...', 'success');
        } else {
            console.warn('⚠️ IPFS upload failed, proceeding with download');
            showDownloadStatus('⚠️ IPFS upload failed, downloading anyway...', 'warning');
        }

        // Create download link
        const link = document.createElement('a');
        link.download = `crypto-ai-meme-${Date.now()}.png`;
        link.href = downloadCanvas.toDataURL('image/png', 1.0);

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Show success message
        setTimeout(() => {
            showDownloadStatus('✅ Meme downloaded successfully!', 'success');
        }, 1000);

    } catch (error) {
        console.error('Canvas export failed:', error);
        showCORSDownloadError();
    }
}

function showDownloadStatus(message, type) {
    // Remove any existing status
    const existingStatus = document.getElementById('downloadStatus');
    if (existingStatus) {
        existingStatus.remove();
    }

    const statusDiv = document.createElement('div');
    statusDiv.id = 'downloadStatus';
    statusDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        font-size: 1rem;
        max-width: 300px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    `;

    if (type === 'success') {
        statusDiv.style.background = 'linear-gradient(45deg, #00ff88, #00cc66)';
    } else if (type === 'error') {
        statusDiv.style.background = 'linear-gradient(45deg, #ff4444, #cc0000)';
    } else {
        statusDiv.style.background = 'linear-gradient(45deg, #4488ff, #0066cc)';
    }

    statusDiv.textContent = message;
    document.body.appendChild(statusDiv);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (statusDiv.parentNode) {
            statusDiv.style.opacity = '0';
            statusDiv.style.transform = 'translateX(100%)';
            setTimeout(() => statusDiv.remove(), 300);
        }
    }, 5000);
}

function showCORSDownloadError() {
    showDownloadStatus('❌ Download blocked by browser security', 'error');

    // Show detailed error modal
    const errorModal = `
        <div id="corsErrorModal" style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        ">
            <div style="
                background: linear-gradient(45deg, #1a1a1a, #2a2a2a);
                border: 2px solid #ff4444;
                border-radius: 20px;
                padding: 30px;
                max-width: 500px;
                text-align: center;
                color: white;
            ">
                <h3 style="color: #ff4444; margin-bottom: 20px;">🚨 Download Blocked</h3>
                <p style="margin-bottom: 20px;">
                    The browser blocked the download due to CORS security restrictions.
                    This happens when images are loaded from external sources.
                </p>
                <h4 style="color: #ffaa00; margin-bottom: 15px;">🛠️ Alternative Options:</h4>
                <div style="text-align: left; margin-bottom: 20px;">
                    <p>• <strong>Right-click</strong> the meme and select "Save image as..."</p>
                    <p>• Take a <strong>screenshot</strong> of the meme area</p>
                    <p>• Use the <strong>"Share on Twitter"</strong> button to post directly</p>
                    <p>• Try generating a new meme (sometimes works better)</p>
                </div>
                <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                    <button class="buy-button" onclick="closeCORSError()">✅ Got It</button>
                    <button class="buy-button" onclick="shareAIMeme()">🐦 Share Instead</button>
                    <button class="buy-button" onclick="regenerateAIMeme()">🔄 Try New Meme</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', errorModal);
}

function closeCORSError() {
    const modal = document.getElementById('corsErrorModal');
    if (modal) {
        modal.remove();
    }
}

function showCORSStatus() {
    // Remove any existing status
    const existingStatus = document.getElementById('corsStatus');
    if (existingStatus) {
        existingStatus.remove();
    }

    if (!currentAIMeme.corsMethod) return;

    const statusDiv = document.createElement('div');
    statusDiv.id = 'corsStatus';
    statusDiv.style.cssText = `
        position: absolute;
        top: 10px;
        left: 10px;
        background: rgba(0,0,0,0.8);
        color: #00ff00;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 0.8rem;
        font-family: monospace;
        border: 1px solid #00ff00;
        z-index: 100;
    `;

    const isDownloadable = currentAIMeme.corsMethod.includes('Proxy');
    const statusIcon = isDownloadable ? '✅' : '⚠️';
    const statusText = isDownloadable ? 'Download Available' : 'Limited Download';

    statusDiv.innerHTML = `${statusIcon} ${currentAIMeme.corsMethod} - ${statusText}`;

    // Add to meme canvas container
    const memeCanvas = document.getElementById('memeCanvas');
    memeCanvas.style.position = 'relative';
    memeCanvas.appendChild(statusDiv);

    // Auto-remove after 8 seconds
    setTimeout(() => {
        if (statusDiv.parentNode) {
            statusDiv.style.opacity = '0';
            setTimeout(() => statusDiv.remove(), 300);
        }
    }, 8000);
}

async function shareAIMeme() {
    const allText = textElements
        .filter(el => !el.isBranding)
        .map(el => el.text)
        .join(' | ');

    // Show sharing options modal
    showSharingModal(allText);
}

function showSharingModal(memeText) {
    const modal = `
        <div id="sharingModal" style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.9);
            z-index: 10002;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        ">
            <div style="
                background: linear-gradient(45deg, #1a1a1a, #2a2a2a);
                border: 2px solid #1DA1F2;
                border-radius: 20px;
                padding: 30px;
                max-width: 600px;
                text-align: center;
                color: white;
                position: relative;
            ">
                <h3 style="color: #1DA1F2; margin-bottom: 20px;">🐦 Share Your $CRYPTO Meme</h3>
                <p style="margin-bottom: 25px; color: #ccc;">
                    Choose how you want to share your epic meme on Twitter:
                </p>

                <div style="display: grid; gap: 15px; margin-bottom: 25px;">
                    <button class="buy-button" onclick="shareWithImageUpload('${memeText.replace(/'/g, "\\'")}')">
                        📸✨ Smart Image Sharing (Recommended)
                    </button>
                    <button class="buy-button" onclick="shareTextOnly('${memeText.replace(/'/g, "\\'")}')">
                        📝 Share Text Only (Quick)
                    </button>
                    <button class="buy-button" onclick="shareWithInstructions('${memeText.replace(/'/g, "\\'")}')">
                        📋 Copy Text + Manual Upload
                    </button>
                    <button class="buy-button" onclick="downloadAndShare('${memeText.replace(/'/g, "\\'")}')">
                        💾 Download + Share Manually
                    </button>
                </div>

                <div style="background: rgba(29, 161, 242, 0.1); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                    <p style="color: #1DA1F2; font-size: 0.9rem; margin: 0;">
                        💡 <strong>Smart Sharing:</strong> Copies your tweet text and shows you the easiest way to add your meme image to Twitter!
                    </p>
                </div>

                <button class="buy-button" onclick="closeSharingModal()" style="background: rgba(255,255,255,0.1);">
                    ❌ Cancel
                </button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modal);

    // Animate modal appearance
    gsap.from('#sharingModal > div', { scale: 0, duration: 0.5, ease: "back.out(1.7)" });

    // Auto-scroll to show the meme area after modal appears
    setTimeout(() => {
        scrollToMemeArea();
    }, 600);
}

function closeSharingModal() {
    const modal = document.getElementById('sharingModal');
    if (modal) {
        modal.remove();
    }
}

async function shareWithImageUpload(memeText) {
    showSharingStatus('Preparing your meme for sharing...', 'info');

    try {
        // Get the meme as a blob
        const imageBlob = await getMemeAsBlob();

        if (!imageBlob) {
            throw new Error('Could not generate image blob');
        }

        // Since external upload services have CORS issues, we'll use a smart approach
        const result = await uploadToImgBB(imageBlob);

        if (result === 'MANUAL_SHARE_REQUIRED') {
            // Show enhanced manual sharing instructions
            closeSharingModal();
            showEnhancedSharingInstructions(memeText);
        } else {
            // This would be for when we have a working upload service
            const tweetText = encodeURIComponent(
                `Just created this INSANE AI-generated $CRYPTO meme! 🤖🔥\n\n"${memeText || 'CUSTOM MEME'}"\n\n🖼️ ${result}\n\nMade with AI 🚀\n\n#CRYPTO #AIMemes #ToTheMoon #DiamondHands`
            );

            closeSharingModal();
            showSharingStatus('✅ Opening Twitter with your meme!', 'success');
            window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
        }

    } catch (error) {
        console.error('Sharing preparation failed:', error);
        showSharingStatus('❌ Preparation failed. Using alternative method.', 'error');

        // Fallback to manual instructions
        setTimeout(() => {
            closeSharingModal();
            shareWithInstructions(memeText);
        }, 2000);
    }
}

function shareTextOnly(memeText) {
    const tweetText = encodeURIComponent(
        `Just created this INSANE AI-generated $CRYPTO meme! 🤖🔥\n\n"${memeText || 'CUSTOM MEME'}"\n\nMade with AI 🚀\n\n#CRYPTO #AIMemes #ToTheMoon #DiamondHands`
    );

    closeSharingModal();
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
}

function shareWithInstructions(memeText) {
    const tweetText = `Just created this INSANE AI-generated $CRYPTO meme! 🤖🔥\n\n"${memeText || 'CUSTOM MEME'}"\n\nMade with AI 🚀\n\n#CRYPTO #AIMemes #ToTheMoon #DiamondHands`;

    // Copy text to clipboard
    navigator.clipboard.writeText(tweetText).then(() => {
        closeSharingModal();

        // Show instructions modal
        const instructionsModal = `
            <div id="instructionsModal" style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.9);
                z-index: 10003;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            ">
                <div style="
                    background: linear-gradient(45deg, #1a1a1a, #2a2a2a);
                    border: 2px solid #00ff00;
                    border-radius: 20px;
                    padding: 30px;
                    max-width: 500px;
                    text-align: center;
                    color: white;
                ">
                    <h3 style="color: #00ff00; margin-bottom: 20px;">✅ Tweet Text Copied!</h3>
                    <p style="margin-bottom: 20px; color: #ccc;">
                        Follow these steps to share with your meme image:
                    </p>

                    <div style="text-align: left; background: rgba(0,0,0,0.3); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <p style="margin: 10px 0;"><strong>1.</strong> Right-click your meme and "Save image as..."</p>
                        <p style="margin: 10px 0;"><strong>2.</strong> Go to Twitter.com</p>
                        <p style="margin: 10px 0;"><strong>3.</strong> Paste the copied text (Ctrl+V)</p>
                        <p style="margin: 10px 0;"><strong>4.</strong> Click the image button and upload your meme</p>
                        <p style="margin: 10px 0;"><strong>5.</strong> Tweet it! 🚀</p>
                    </div>

                    <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                        <button class="buy-button" onclick="window.open('https://twitter.com', '_blank')">🐦 Open Twitter</button>
                        <button class="buy-button" onclick="closeInstructionsModal()">✅ Got It</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', instructionsModal);
        gsap.from('#instructionsModal > div', { scale: 0, duration: 0.5, ease: "back.out(1.7)" });
    });
}

function downloadAndShare(memeText) {
    closeSharingModal();

    // Trigger download
    downloadAIMeme();

    // Copy tweet text
    const tweetText = `Just created this INSANE AI-generated $CRYPTO meme! 🤖🔥\n\n"${memeText || 'CUSTOM MEME'}"\n\nMade with AI 🚀\n\n#CRYPTO #AIMemes #ToTheMoon #DiamondHands`;

    navigator.clipboard.writeText(tweetText).then(() => {
        setTimeout(() => {
            showDownloadStatus('📋 Tweet text copied! Upload the downloaded image to Twitter.', 'info');
        }, 1000);
    });
}

function closeInstructionsModal() {
    const modal = document.getElementById('instructionsModal');
    if (modal) {
        modal.remove();
    }
}

function showEnhancedSharingInstructions(memeText) {
    const tweetText = `Just created this INSANE AI-generated $CRYPTO meme! 🤖🔥\n\n"${memeText || 'CUSTOM MEME'}"\n\nMade with AI 🚀\n\n#CRYPTO #AIMemes #ToTheMoon #DiamondHands`;

    // Copy text to clipboard
    navigator.clipboard.writeText(tweetText).then(() => {
        // Show enhanced instructions modal
        const enhancedModal = `
            <div id="enhancedSharingModal" style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.95);
                z-index: 10005;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            ">
                <div style="
                    background: linear-gradient(45deg, #1a1a1a, #2a2a2a);
                    border: 2px solid #1DA1F2;
                    border-radius: 20px;
                    padding: 30px;
                    max-width: 600px;
                    text-align: center;
                    color: white;
                    position: relative;
                ">
                    <h3 style="color: #1DA1F2; margin-bottom: 20px;">🐦✨ Enhanced Twitter Sharing</h3>
                    <p style="margin-bottom: 20px; color: #00ff00; font-weight: bold;">
                        ✅ Tweet text copied to clipboard!
                    </p>

                    <div style="background: rgba(29, 161, 242, 0.1); padding: 20px; border-radius: 15px; margin-bottom: 25px;">
                        <h4 style="color: #1DA1F2; margin-bottom: 15px;">🚀 Super Easy Method:</h4>
                        <div style="text-align: left; color: #fff;">
                            <p style="margin: 8px 0;"><strong>1.</strong> Right-click your meme below → "Copy image"</p>
                            <p style="margin: 8px 0;"><strong>2.</strong> Go to Twitter.com (opens automatically)</p>
                            <p style="margin: 8px 0;"><strong>3.</strong> Paste text (Ctrl+V) and paste image (Ctrl+V again)</p>
                            <p style="margin: 8px 0;"><strong>4.</strong> Tweet it! 🔥</p>
                        </div>
                    </div>

                    <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                        <p style="color: #ccc; font-size: 0.9rem; margin: 0;">
                            💡 <strong>Pro Tip:</strong> Modern browsers let you copy images directly!
                            Right-click → "Copy image" then paste directly into Twitter.
                        </p>
                    </div>

                    <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px;">
                        <button class="buy-button" onclick="window.open('https://twitter.com/compose/tweet', '_blank')">🐦 Open Twitter</button>
                        <button class="buy-button" onclick="downloadAIMeme()">💾 Download Instead</button>
                        <button class="buy-button" onclick="closeEnhancedSharingModal()">✅ Got It</button>
                    </div>

                    <div style="background: rgba(255,255,0,0.1); padding: 15px; border-radius: 10px; border: 1px solid rgba(255,255,0,0.3);">
                        <p style="color: #ffff00; font-size: 0.8rem; margin: 0;">
                            🎯 <strong>Your meme is ready below!</strong> Right-click it to copy the image.
                        </p>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', enhancedModal);
        gsap.from('#enhancedSharingModal > div', { scale: 0, duration: 0.5, ease: "back.out(1.7)" });

        // Highlight the meme for easy copying
        highlightMemeForCopying();

        // Auto-scroll to the meme area after a short delay
        setTimeout(() => {
            scrollToMemeArea();
        }, 600); // Wait for modal animation to complete
    });
}

function closeEnhancedSharingModal() {
    const modal = document.getElementById('enhancedSharingModal');
    if (modal) {
        modal.remove();
    }
    // Remove meme highlighting
    removeMemeHighlight();
}

function highlightMemeForCopying() {
    const memeCanvas = document.getElementById('memeCanvas');
    if (memeCanvas) {
        memeCanvas.style.border = '3px solid #1DA1F2';
        memeCanvas.style.boxShadow = '0 0 20px rgba(29, 161, 242, 0.5)';
        memeCanvas.style.borderRadius = '15px';

        // Add a pulsing animation
        memeCanvas.style.animation = 'pulse 2s infinite';

        // Add CSS for pulse animation if it doesn't exist
        if (!document.getElementById('pulseAnimation')) {
            const style = document.createElement('style');
            style.id = 'pulseAnimation';
            style.textContent = `
                @keyframes pulse {
                    0% { box-shadow: 0 0 20px rgba(29, 161, 242, 0.5); }
                    50% { box-shadow: 0 0 30px rgba(29, 161, 242, 0.8); }
                    100% { box-shadow: 0 0 20px rgba(29, 161, 242, 0.5); }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

function removeMemeHighlight() {
    const memeCanvas = document.getElementById('memeCanvas');
    if (memeCanvas) {
        memeCanvas.style.border = '';
        memeCanvas.style.boxShadow = '0 0 30px rgba(255,255,255,0.3)';
        memeCanvas.style.animation = '';
    }
}

function scrollToMemeArea() {
    const memeCanvas = document.getElementById('memeCanvas');
    if (memeCanvas) {
        // Calculate the position to center the meme in the viewport
        const rect = memeCanvas.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementHeight = rect.height;

        // Calculate offset to center the meme, accounting for the modal
        const targetPosition = window.pageYOffset + rect.top - (windowHeight - elementHeight) / 2 + 100;

        // Smooth scroll to the meme area
        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });

        // Add a subtle bounce effect to draw attention
        setTimeout(() => {
            if (memeCanvas) {
                gsap.to(memeCanvas, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "back.out(1.7)",
                    yoyo: true,
                    repeat: 1
                });
            }
        }, 800); // After scroll completes
    }
}

async function getMemeAsBlob() {
    try {
        const img = document.getElementById('aiMemeImage');

        if (!img.complete) {
            throw new Error('Image not loaded');
        }

        // Create a canvas with the meme
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        // Draw the base image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Draw all text elements
        textElements.forEach(element => {
            ctx.font = `bold ${element.fontSize}px Arial, sans-serif`;
            ctx.fillStyle = element.color;
            ctx.strokeStyle = element.outlineColor;
            ctx.lineWidth = element.outlineWidth;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const textX = element.x + element.width / 2;
            const textY = element.y + element.height / 2;

            if (element.outlineWidth > 0) {
                ctx.strokeText(element.text, textX, textY);
            }
            ctx.fillText(element.text, textX, textY);
        });

        // Convert to blob
        return new Promise(resolve => {
            canvas.toBlob(resolve, 'image/png', 0.9);
        });

    } catch (error) {
        console.error('Failed to create meme blob:', error);
        return null;
    }
}

async function uploadToImgBB(imageBlob) {
    // Since external upload services have CORS issues, we'll use a different approach
    // Convert the blob to a data URL that can be shared directly
    try {
        console.log('🔄 Converting meme to shareable format...');

        // Convert blob to base64 data URL
        const base64DataUrl = await blobToBase64(imageBlob);

        // For now, we'll create a temporary solution using a data URL
        // In production, you'd want to implement a backend service for image hosting

        // Since data URLs are too long for Twitter, we'll use a different approach
        // Let's create a temporary blob URL and provide instructions
        const blobUrl = URL.createObjectURL(imageBlob);

        // Store the blob URL temporarily
        currentAIMeme.shareableBlobUrl = blobUrl;

        console.log('✅ Meme converted to shareable format');

        // Return a placeholder that indicates we need manual sharing
        return 'MANUAL_SHARE_REQUIRED';

    } catch (error) {
        console.error('Failed to convert meme:', error);
        throw new Error('Failed to prepare meme for sharing');
    }
}

function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

function showSharingStatus(message, type) {
    // Remove any existing status
    const existingStatus = document.getElementById('sharingStatus');
    if (existingStatus) {
        existingStatus.remove();
    }

    const statusDiv = document.createElement('div');
    statusDiv.id = 'sharingStatus';
    statusDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10000;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        font-size: 1rem;
        max-width: 400px;
        text-align: center;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    `;

    if (type === 'success') {
        statusDiv.style.background = 'linear-gradient(45deg, #00ff88, #00cc66)';
    } else if (type === 'error') {
        statusDiv.style.background = 'linear-gradient(45deg, #ff4444, #cc0000)';
    } else {
        statusDiv.style.background = 'linear-gradient(45deg, #1DA1F2, #0d8bd9)';
    }

    statusDiv.textContent = message;
    document.body.appendChild(statusDiv);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (statusDiv.parentNode) {
            statusDiv.style.opacity = '0';
            statusDiv.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => statusDiv.remove(), 300);
        }
    }, 5000);
}



function regenerateAIMeme() {
    if (currentAIMeme.type && currentAIMeme.type !== 'custom') {
        generateAIMeme(currentAIMeme.type);
    } else {
        generateCustomAIMeme();
    }
}

async function addToMemeGallery(imageUrl, text) {
    try {
        // Use original URL if we have it, not the blob URL
        const originalUrl = currentAIMeme.originalUrl || imageUrl;

        // Add to database with original URL
        const meme = await memeDB.addMeme(originalUrl, text, currentAIMeme.type);

        // Update legacy gallery for backward compatibility
        memeGallery.unshift({ imageUrl: originalUrl, text, timestamp: Date.now(), id: meme.id });
        if (memeGallery.length > 6) memeGallery.pop();

        console.log(`✅ Meme added to gallery: "${text}"`);
    } catch (error) {
        console.error('Failed to add meme to gallery:', error);
    }
}

function updateMemeGallery() {
    const gallery = document.getElementById('memeGallery');
    gallery.innerHTML = '';

    // Use database memes instead of legacy array
    const allMemes = memeDB.getAllMemes();
    const displayMemes = allMemes.slice(0, 12); // Show more memes

    if (displayMemes.length === 0) {
        gallery.innerHTML = `
            <div style="
                grid-column: 1 / -1;
                text-align: center;
                padding: 40px 20px;
                color: #888;
                font-style: italic;
            ">
                <p>🎨 No memes yet! Generate your first AI meme above.</p>
                <p style="font-size: 0.9rem; margin-top: 10px;">Your memes will appear here automatically.</p>
            </div>
        `;
        return;
    }

    displayMemes.forEach((meme, index) => {
        const memeDiv = document.createElement('div');
        memeDiv.style.cssText = `
            position: relative;
            border-radius: 15px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.3s ease;
            background: rgba(255,255,255,0.1);
            border: 2px solid transparent;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;

        // Format timestamp
        const timeAgo = getTimeAgo(meme.timestamp);

        // Handle both base64 data and regular URLs
        const imageSrc = meme.imageUrl || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';

        memeDiv.innerHTML = `
            <img src="${imageSrc}" style="width: 100%; height: 120px; object-fit: cover;" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIEVycm9yPC90ZXh0Pjwvc3ZnPg=='" />
            <div style="position: absolute; top: 5px; right: 5px;">
                <button onclick="deleteMemeFromGallery('${meme.id}')" style="
                    background: rgba(255,0,0,0.8);
                    border: none;
                    border-radius: 50%;
                    width: 25px;
                    height: 25px;
                    color: white;
                    cursor: pointer;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">×</button>
            </div>
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.9)); color: #fff; padding: 8px; font-size: 0.8rem;">
                <div style="font-weight: bold; margin-bottom: 2px;">
                    ${meme.text.substring(0, 25)}${meme.text.length > 25 ? '...' : ''}
                </div>
                <div style="font-size: 0.7rem; color: #ccc; display: flex; justify-content: space-between;">
                    <span>${timeAgo}</span>
                    <span>${meme.type || 'unknown'}</span>
                </div>
            </div>
        `;

        memeDiv.addEventListener('mouseenter', () => {
            memeDiv.style.transform = 'scale(1.05) translateY(-5px)';
            memeDiv.style.borderColor = '#00ff88';
            memeDiv.style.boxShadow = '0 8px 25px rgba(0,255,136,0.3)';
        });

        memeDiv.addEventListener('mouseleave', () => {
            memeDiv.style.transform = 'scale(1) translateY(0)';
            memeDiv.style.borderColor = 'transparent';
            memeDiv.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        });

        memeDiv.addEventListener('click', (e) => {
            // Don't trigger if delete button was clicked
            if (e.target.tagName === 'BUTTON') return;

            currentAIMeme.imageUrl = meme.imageUrl;
            currentAIMeme.text = meme.text;
            currentAIMeme.type = meme.type;
            currentAIMeme.corsMethod = meme.corsMethod;
            displayAIMeme(meme.imageUrl, meme.text);

            // Scroll to meme display
            document.getElementById('aiMemeDisplay').scrollIntoView({ behavior: 'smooth' });
        });

        gallery.appendChild(memeDiv);
    });

    // Add "View All" button if there are more memes
    if (allMemes.length > 12) {
        const viewAllDiv = document.createElement('div');
        viewAllDiv.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 15px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            cursor: pointer;
            transition: all 0.3s ease;
            min-height: 120px;
            color: white;
            font-weight: bold;
            text-align: center;
        `;

        viewAllDiv.innerHTML = `
            <div>
                <div style="font-size: 1.2rem; margin-bottom: 5px;">📚</div>
                <div>View All</div>
                <div style="font-size: 0.8rem; opacity: 0.8;">${allMemes.length} total</div>
            </div>
        `;

        viewAllDiv.addEventListener('click', () => {
            showAllMemesModal();
        });

        viewAllDiv.addEventListener('mouseenter', () => {
            viewAllDiv.style.transform = 'scale(1.05)';
        });

        viewAllDiv.addEventListener('mouseleave', () => {
            viewAllDiv.style.transform = 'scale(1)';
        });

        gallery.appendChild(viewAllDiv);
    }
}

// Helper functions for enhanced gallery
function getTimeAgo(timestamp) {
    const now = new Date();
    const memeTime = new Date(timestamp);
    const diffMs = now - memeTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return memeTime.toLocaleDateString();
}

async function deleteMemeFromGallery(memeId) {
    if (!confirm('Delete this meme? This cannot be undone! 🗑️')) return;

    try {
        const success = await memeDB.deleteMeme(memeId);
        if (success) {
            // Remove from legacy gallery too
            const index = memeGallery.findIndex(meme => meme.id === memeId);
            if (index !== -1) {
                memeGallery.splice(index, 1);
            }

            // Show success message
            showDownloadStatus('🗑️ Meme deleted successfully!', 'success');
        } else {
            showDownloadStatus('❌ Failed to delete meme', 'error');
        }
    } catch (error) {
        console.error('Error deleting meme:', error);
        showDownloadStatus('❌ Error deleting meme', 'error');
    }
}

function showAllMemesModal() {
    const allMemes = memeDB.getAllMemes();

    const modal = `
        <div id="allMemesModal" style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.95);
            z-index: 10006;
            display: flex;
            flex-direction: column;
            padding: 20px;
            overflow-y: auto;
        ">
            <div style="
                background: linear-gradient(45deg, #1a1a1a, #2a2a2a);
                border: 2px solid #00ff88;
                border-radius: 20px;
                padding: 30px;
                max-width: 1200px;
                width: 100%;
                margin: 0 auto;
                color: white;
                position: relative;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                    <h2 style="color: #00ff88; margin: 0;">📚 All Your $CRYPTO Memes (${allMemes.length})</h2>
                    <button onclick="closeAllMemesModal()" style="
                        background: rgba(255,255,255,0.1);
                        border: none;
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        color: white;
                        cursor: pointer;
                        font-size: 20px;
                    ">×</button>
                </div>

                <div id="allMemesGrid" style="
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 20px;
                    max-height: 70vh;
                    overflow-y: auto;
                    padding: 10px;
                ">
                    ${allMemes.map(meme => {
                        const imageSrc = meme.imageUrl || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                        return `
                        <div style="
                            position: relative;
                            border-radius: 15px;
                            overflow: hidden;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            background: rgba(255,255,255,0.1);
                            border: 2px solid transparent;
                        " onmouseenter="this.style.transform='scale(1.05)'; this.style.borderColor='#00ff88';"
                           onmouseleave="this.style.transform='scale(1)'; this.style.borderColor='transparent';"
                           onclick="selectMemeFromModal('${meme.id}', '${meme.imageUrl}', '${meme.text.replace(/'/g, "\\'")}', '${meme.type}')">
                            <img src="${imageSrc}" style="width: 100%; height: 150px; object-fit: cover;" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIEVycm9yPC90ZXh0Pjwvc3ZnPg=='" />
                            <div style="position: absolute; top: 5px; right: 5px;">
                                <button onclick="event.stopPropagation(); deleteMemeFromGallery('${meme.id}')" style="
                                    background: rgba(255,0,0,0.8);
                                    border: none;
                                    border-radius: 50%;
                                    width: 25px;
                                    height: 25px;
                                    color: white;
                                    cursor: pointer;
                                    font-size: 12px;
                                ">×</button>
                            </div>
                            <div style="padding: 10px; background: rgba(0,0,0,0.8);">
                                <div style="font-weight: bold; margin-bottom: 5px; font-size: 0.9rem;">
                                    ${meme.text.substring(0, 30)}${meme.text.length > 30 ? '...' : ''}
                                </div>
                                <div style="font-size: 0.7rem; color: #ccc; display: flex; justify-content: space-between;">
                                    <span>${getTimeAgo(meme.timestamp)}</span>
                                    <span>${meme.type || 'unknown'}</span>
                                </div>
                            </div>
                        </div>
                        `;
                    }).join('')}
                </div>

                ${allMemes.length === 0 ? `
                    <div style="text-align: center; padding: 60px 20px; color: #888;">
                        <p style="font-size: 1.2rem; margin-bottom: 10px;">🎨 No memes yet!</p>
                        <p>Generate your first AI meme to start building your collection.</p>
                    </div>
                ` : ''}
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modal);
    gsap.from('#allMemesModal > div', { scale: 0, duration: 0.5, ease: "back.out(1.7)" });
}

function closeAllMemesModal() {
    const modal = document.getElementById('allMemesModal');
    if (modal) {
        modal.remove();
    }
}

function selectMemeFromModal(memeId, imageUrl, text, type) {
    currentAIMeme.imageUrl = imageUrl;
    currentAIMeme.text = text;
    currentAIMeme.type = type;

    closeAllMemesModal();
    displayAIMeme(imageUrl, text);

    // Scroll to meme display
    setTimeout(() => {
        document.getElementById('aiMemeDisplay').scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// Add some extra viral features
function createViralMoment() {
    // Random viral popup
    const viralMessages = [
        "🚨 BREAKING: You've been chosen as a $CRYPTO ambassador! 🚨",
        "💎 DIAMOND HANDS DETECTED! You're officially part of the elite! 💎",
        "🚀 MOON MISSION ACTIVATED! Prepare for takeoff! 🚀",
        "🤡 DEGEN LEVEL: MAXIMUM! You're one of us now! 🤡",
        "👑 CRYPTO ROYALTY STATUS UNLOCKED! 👑"
    ];

    const message = viralMessages[Math.floor(Math.random() * viralMessages.length)];

    const popup = document.createElement('div');
    popup.innerHTML = message;
    popup.style.position = 'fixed';
    popup.style.top = '20px';
    popup.style.right = '20px';
    popup.style.background = 'linear-gradient(45deg, #ff0080, #0080ff)';
    popup.style.color = '#fff';
    popup.style.padding = '20px';
    popup.style.borderRadius = '15px';
    popup.style.fontSize = '1.2rem';
    popup.style.fontWeight = 'bold';
    popup.style.zIndex = '9999';
    popup.style.border = '3px solid #fff';
    popup.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.5)';
    popup.style.cursor = 'pointer';

    document.body.appendChild(popup);

    popup.addEventListener('click', () => {
        const shareText = encodeURIComponent(`${message}\n\nJoin the $CRYPTO revolution! 🚀\n\n#CRYPTO #ToTheMoon #DiamondHands`);
        window.open(`https://twitter.com/intent/tweet?text=${shareText}`, '_blank');
        popup.remove();
    });

    gsap.from(popup, { scale: 0, rotation: 360, duration: 1, ease: "back.out(1.7)" });

    setTimeout(() => {
        if (popup.parentNode) {
            gsap.to(popup, {
                opacity: 0,
                scale: 0,
                duration: 0.5,
                onComplete: () => popup.remove()
            });
        }
    }, 10000);
}

// Trigger viral moments randomly
setInterval(() => {
    if (Math.random() < 0.1) { // 10% chance every 30 seconds
        createViralMoment();
    }
}, 30000);

// Add click counter for engagement
let totalClicks = 0;
document.addEventListener('click', () => {
    totalClicks++;
    if (totalClicks % 50 === 0) {
        createViralMoment();
    }
});

console.log("🚀 Welcome to the CRYPTO degen playground! 🚀");
console.log("If you're reading this, you're already too deep...");
console.log("Try the Konami code: ↑↑↓↓←→←→BA");
