/* ---------- little drawn things: sunflowers, roses, lilies, hearts, stars, moon ---------- */
const ring = (n, f) => Array.from({length: n}, (_, i) => f(i, i * 360 / n)).join("");
const F = {
  sun: () => `<svg viewBox="-60 -60 120 120">${ring(14,(i,a)=>`<ellipse cx="0" cy="-35" rx="9" ry="20" transform="rotate(${a})" fill="${i%2?"#f2b705":"#ffd23f"}"/>`)}<circle r="20" fill="#3a1608"/><circle r="14" fill="none" stroke="#8c1c2b" stroke-width="2.5" stroke-dasharray="2 4"/><circle r="6" fill="#1c0a05"/></svg>`,
  rose: () => `<svg viewBox="-50 -50 100 100"><circle r="42" fill="#6e1022"/><circle r="34" fill="#9c1b31"/><circle r="24" fill="#c92d44"/><path d="M0-16C12-16 17-5 11 3 4 11-11 8-11-3-11-11-4-14 3-11 8-8 6-2 1-2" fill="none" stroke="#5a0f1b" stroke-width="3" stroke-linecap="round"/><path d="M-30 12C-22 30-6 34 10 30M26-16C32-2 30 10 22 20" fill="none" stroke="#4a0b17" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  lily: () => `<svg viewBox="-60 -60 120 120">${ring(6,(i,a)=>`<g transform="rotate(${a+30})"><path d="M0 0C-16-18-12-44 0-56 12-44 16-18 0 0Z" fill="#ffe2a3"/><path d="M0-8V-42" stroke="#c2283f" stroke-width="2.2" stroke-linecap="round"/></g>`)}${ring(5,(i,a)=>`<g transform="rotate(${a})"><path d="M0 0V-22" stroke="#8c1c2b" stroke-width="1.6"/><circle cy="-24" r="3.2" fill="#f2b705"/></g>`)}</svg>`,
  heart: () => `<svg viewBox="0 0 24 24"><path d="M12 21C4 14 2 10 2 7a5 5 0 0 1 10-1 5 5 0 0 1 10 1c0 3-2 7-10 14Z" fill="currentColor"/></svg>`,
  star: () => `<svg viewBox="0 0 24 24"><path d="M12 0C13 8 16 11 24 12 16 13 13 16 12 24 11 16 8 13 0 12 8 11 11 8 12 0Z" fill="currentColor"/></svg>`,
  moon: () => `<svg viewBox="0 0 100 100"><mask id="mm"><rect width="100" height="100" fill="#fff"/><circle cx="70" cy="36" r="34" fill="#000"/></mask><circle cx="46" cy="54" r="40" fill="#f6d77a" mask="url(#mm)"/></svg>`
};
document.querySelectorAll("[data-f]").forEach(el => el.innerHTML = F[el.dataset.f]());

/* ---------- night sky ---------- */
const sky = document.getElementById("sky");
for (let i = 0; i < 90; i++) {
  const b = document.createElement("b"), s = Math.random() * 2.2 + .8;
  b.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;width:${s}px;height:${s}px;animation-delay:${Math.random()*6}s;background:${i%4?"#ffe7a8":"#ff9fae"}`;
  sky.append(b);
}
for (let i = 0; i < 9; i++) {
  const s = document.createElement("i");
  s.className = "spark"; s.innerHTML = F.star();
  s.style.cssText = `left:${Math.random()*96}%;top:${Math.random()*96}%;width:${10+Math.random()*12}px;animation-delay:${Math.random()*6}s`;
  sky.append(s);
}

/* ---------- letters ---------- */
const letters = {
  reminder: ["For a difficult day", "Hey you. I know today feels heavy, and I'm sorry it does. You don't have to fix everything right now. Just get through the next little bit, and then the next one after that. Drink some water, take a breath, and be as gentle with yourself as you always are with me. And if you want company, even just to sit quietly, I'm right here. You've got me."],
  burden: ["When you feel like a burden", "Okay, listen to me for a second. You are not a burden. Not even a little. Not when you're upset, not when you need reassurance, not when you've got nothing left to give. I don't love you for being easy or cheerful all the time, I love you because you're you. You never have to earn your place with me. It's already yours. Please be as kind to yourself as you are to me."],
  smile: ["When you need a smile", "Smile check! I was just thinking about your hair (I could talk about it for way too long), the way you look at me and I completely forget what I was saying, your tiny angry face, and how we laugh like absolute idiots until nothing else matters. That's all you, and I wouldn't trade any of it. Now go on, give me a smile. I know you're doing it."]
};
const paper = document.getElementById("letterDisplay");
document.querySelectorAll(".env").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".env").forEach(b => b.setAttribute("aria-pressed", b === btn));
  const [title, body] = letters[btn.dataset.letter];
  paper.innerHTML = `<p class="kicker">A letter for you</p><h3>${title}</h3><p>${body}</p><p class="sign">happy 5 months cutie ♡</p>`;
  paper.classList.remove("open"); void paper.offsetWidth; paper.classList.add("open");
  paper.scrollIntoView({behavior: "smooth", block: "nearest"});
}));

/* ---------- flower memory ---------- */
const modal = document.getElementById("modal");
const toggle = on => modal.classList.toggle("hidden", !on);
document.getElementById("flowerBtn").addEventListener("click", () => toggle(true));
document.getElementById("closeModal").addEventListener("click", () => toggle(false));
modal.addEventListener("click", e => { if (e.target === modal) toggle(false); });
document.addEventListener("keydown", e => { if (e.key === "Escape") toggle(false); });
