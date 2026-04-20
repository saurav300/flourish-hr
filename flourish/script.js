const views=['home','about','services','packages','international','blog','contact'];

function showView(name){
  views.forEach(v=>{
    document.getElementById('view-'+v).classList.toggle('active',v===name);
  });
  // Update nav active
  views.forEach(v=>{
    const el=document.getElementById('nav-'+v);
    if(el) el.classList.toggle('active',v===name);
  });
  window.scrollTo({top:0,behavior:'instant'});
  // Move footer into active view
  const footer=document.getElementById('shared-footer');
  const activeView=document.getElementById('view-'+name);
  activeView.appendChild(footer);
  // Trigger animations
  setTimeout(()=>initAnimations(),50);
}

// Navbar scroll
window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>20);
});

// Mobile menu
function toggleMobile(){
  const m=document.getElementById('mob-menu');
  m.classList.toggle('open');
}

// Form submit
function submitForm(){
  const btn=document.getElementById('form-submit-btn');
  btn.textContent='Sending...';
  btn.disabled=true;
  setTimeout(()=>{
    document.getElementById('contact-form-container').innerHTML=`
      <div class="form-success">
        <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <h3>Message Sent!</h3>
        <p>Thank you for reaching out. A consultant will respond to you shortly.</p>
      </div>`;
  },1200);
}

// Scroll animations
function initAnimations(){
  const els=document.querySelectorAll('.fade-up:not(.visible)');
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}});
  },{threshold:0.12});
  els.forEach(el=>obs.observe(el));
  // Immediately visible ones
  els.forEach(el=>{
    const r=el.getBoundingClientRect();
    if(r.top<window.innerHeight)el.classList.add('visible');
  });
}

// Init
document.addEventListener('DOMContentLoaded',()=>{
  // Attach footer to home initially
  const footer=document.getElementById('shared-footer');
  document.getElementById('view-home').appendChild(footer);
  initAnimations();
});