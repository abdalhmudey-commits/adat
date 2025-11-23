document.addEventListener("DOMContentLoaded", () => {

  // المتغيرات
  let habits = JSON.parse(localStorage.getItem('habits') || '[]');
  const habitList = document.getElementById('habitList');
  const addBtn = document.getElementById('addHabitBtn');

  // ربط الزر بدالة إضافة العادة
  addBtn.addEventListener('click', addHabit);

  renderHabits();

  function addHabit() {
    const name = document.getElementById('habitName').value.trim();
    const message = document.getElementById('habitMessage').value.trim();
    const intervalValue = parseInt(document.getElementById('habitIntervalValue').value);
    const intervalUnit = document.getElementById('habitIntervalUnit').value;
    const audioFile = document.getElementById('habitAudio').files[0];

    if (!name || !message || !intervalValue) {
      alert("يرجى ملء كل الحقول");
      return;
    }

    const habit = {
      id: Date.now(),
      name,
      message,
      intervalValue,
      intervalUnit,
      audio: audioFile ? URL.createObjectURL(audioFile) : null,
      active: true
    };

    habits.push(habit);
    localStorage.setItem('habits', JSON.stringify(habits));
    renderHabits();

    // إعادة ضبط الحقول
    document.getElementById('habitName').value = '';
    document.getElementById('habitMessage').value = '';
    document.getElementById('habitIntervalValue').value = '';
    document.getElementById('habitAudio').value = '';
  }

  function renderHabits() {
    habitList.innerHTML = '';
    habits.forEach(h => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${h.name}</strong> - ${h.message} 
        [${h.intervalValue} ${h.intervalUnit}] 
        <button onclick="toggleHabit(${h.id})">${h.active ? 'إيقاف' : 'تشغيل'}</button>
        <button onclick="deleteHabit(${h.id})">حذف</button>
      `;
      habitList.appendChild(li);

      if(h.active) startHabitTimer(h);
    });
  }

  let timers = {}; // لتخزين مؤشرات setInterval

  function startHabitTimer(habit) {
    if(timers[habit.id]) clearInterval(timers[habit.id]);

    let intervalMs = habit.intervalValue;
    switch(habit.intervalUnit){
      case 'minute': intervalMs *= 60000; break;
      case 'hour': intervalMs *= 3600000; break;
      case 'day': intervalMs *= 86400000; break;
      case 'week': intervalMs *= 604800000; break;
      case 'month': intervalMs *= 2592000000; break;
      case 'year': intervalMs *= 31536000000; break;
    }

    timers[habit.id] = setInterval(() => {
      alert(`${habit.name}\n${habit.message}`);
      if(habit.audio){
        const audio = new Audio(habit.audio);
        audio.play();
      }
    }, intervalMs);
  }

  window.toggleHabit = function(id){
    const habit = habits.find(h => h.id === id);
    habit.active = !habit.active;
    if(!habit.active && timers[id]) clearInterval(timers[id]);
    localStorage.setItem('habits', JSON.stringify(habits));
    renderHabits();
  }

  window.deleteHabit = function(id){
    habits = habits.filter(h => h.id !== id);
    if(timers[id]) clearInterval(timers[id]);
    localStorage.setItem('habits', JSON.stringify(habits));
    renderHabits();
  }

});
