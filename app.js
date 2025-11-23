function showTab(tabId){
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(t => t.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}

// عرض الحكم بشكل عشوائي في الرئيسية
const home = document.getElementById('home');
quotes.forEach(q => {
  const p = document.createElement('p');
  p.textContent = q;
  home.appendChild(p);
});

// التحكم بالثيم (نهاري/ليلي) - سيتم ربطه مع الإعدادات لاحقًا
function setTheme(theme){
  if(theme === 'night') document.body.classList.add('night');
  else document.body.classList.remove('night');
}

// إعدادات لاحقة: إضافة العادات، الأذكار، الذكاء الاصطناعي
