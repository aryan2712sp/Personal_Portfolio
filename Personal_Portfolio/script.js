
document.addEventListener('DOMContentLoaded', function(){
  var themeToggle = document.getElementById('themeToggle');
  var body = document.body;
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('navbar');
  var navLinks = document.querySelectorAll('.nav-link');

  // Initialize theme from localStorage or default to dark
  var saved = localStorage.getItem('portfolio-theme');
  if(saved === 'light'){
    body.classList.remove('theme-dark');
    body.classList.add('theme-light');
    themeToggle.textContent = '☀️';
  } else {
    // default dark
    body.classList.remove('theme-light');
    body.classList.add('theme-dark');
    themeToggle.textContent = '🌙';
  }

  // Toggle handler with spin animation
  themeToggle.addEventListener('click', function(){
    themeToggle.classList.add('spin');
    setTimeout(function(){ themeToggle.classList.remove('spin'); }, 500);
    if(body.classList.contains('theme-dark')){
      body.classList.remove('theme-dark');
      body.classList.add('theme-light');
      themeToggle.textContent = '☀️';
      localStorage.setItem('portfolio-theme','light');
    } else {
      body.classList.remove('theme-light');
      body.classList.add('theme-dark');
      themeToggle.textContent = '🌙';
      localStorage.setItem('portfolio-theme','dark');
    }
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
    anchor.addEventListener('click', function(e){
      var target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        if(window.innerWidth < 900){
          nav.style.display = 'none';
        }
      }
    });
  });

  // Mobile nav toggle
  navToggle.addEventListener('click', function(e){
    e.stopPropagation();
    if(nav.style.display === 'flex' || nav.style.display === 'block'){
      nav.style.display = 'none';
    } else {
      nav.style.display = 'block';
      nav.style.flexDirection = 'column';
    }
  });

  // Close nav when clicking outside (mobile)
  document.addEventListener('click', function(e){
    if(window.innerWidth < 900 && nav.style.display === 'block'){
      var toggle = navToggle.getBoundingClientRect();
      var navRect = nav.getBoundingClientRect();
      if(!(e.clientX >= navRect.left && e.clientX <= navRect.right && e.clientY >= navRect.top && e.clientY <= navRect.bottom) &&
         !(e.clientX >= toggle.left && e.clientX <= toggle.right && e.clientY >= toggle.top && e.clientY <= toggle.bottom)){
        nav.style.display = 'none';
      }
    }
  });

  // Intersection observer for animations with stagger
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var el = entry.target;
        if(el.classList.contains('project')){
          // staggered reveal for projects
          setTimeout(function(){ el.classList.add('in-view'); }, el.dataset.index * 150);
        } else {
          el.classList.add('in-view');
        }
      }
    });
  }, {threshold:0.14});

  // Observe different elements and add directional classes
  document.querySelectorAll('.about-text').forEach(function(el){ el.classList.add('fade-left'); observer.observe(el); });
  document.querySelectorAll('.profile-card').forEach(function(el){ el.classList.add('fade-right'); observer.observe(el); });
  document.querySelectorAll('.project').forEach(function(el, i){ el.dataset.index = i; el.classList.add('fade-up'); observer.observe(el); });
  document.querySelectorAll('.card').forEach(function(el){ if(!el.classList.contains('project')){ el.classList.add('fade-up'); observer.observe(el); } });

  // Hero load fade (already animated via CSS). Also make profile-card appear with slight delay
  setTimeout(function(){
    document.querySelectorAll('.profile-card').forEach(function(el){ el.classList.add('in-view'); });
  }, 320);
});
