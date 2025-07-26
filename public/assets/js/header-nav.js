document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Get the height of your header
      const headerHeight = document.querySelector('.main-header-three').offsetHeight;
      // Add extra offset if needed (you can adjust this value)
      const extraOffset = 5; 
      // Calculate the target position
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (headerHeight + extraOffset);
      
      // Smooth scroll to the position
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Update URL hash
      if (history.pushState) {
        history.pushState(null, null, targetId);
      } else {
        location.hash = targetId;
      }
    }
  });
});