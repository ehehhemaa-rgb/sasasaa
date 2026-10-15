const SUPABASE_URL = 'https://iizubwoxaposhzicoiiz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_0LfD-klWybDlU2xrV_TSdA_z_QQI7jI';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const TABLE_STRUCTURE = {
  tableName: 'profiles',
  columns: [
    { name: 'id', type: 'uuid', primaryKey: true },
    { name: 'email', type: 'text', nullable: false },
    { name: 'created_at', type: 'timestamp', default: 'now()' }
  ]
};

document.addEventListener('DOMContentLoaded', async () => {
  const statusBadge = document.getElementById('statusBadge');
  const submitBtn = document.getElementById('submitBtn');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  console.log('Структура таблицы:', TABLE_STRUCTURE);

  try {
    const { error } = await supabaseClient.from(TABLE_STRUCTURE.tableName).select('*').limit(1);
    if (error && error.code !== 'PGRST116') {
      statusBadge.textContent = 'ONLINE';
      statusBadge.style.color = '#3ecf8e';
    } else {
      statusBadge.textContent = 'CONNECTED';
      statusBadge.style.color = '#3ecf8e';
    }
  } catch (err) {
    statusBadge.textContent = 'OFFLINE';
    statusBadge.style.color = '#ef4444';
  }

  submitBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert('Заполните все поля!');
      return;
    }

    submitBtn.textContent = 'Загрузка...';
    submitBtn.disabled = true;

    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      alert('Успешный вход!');
      console.log(data);
    } catch (error) {
      alert('Ошибка: ' + error.message);
    } finally {
      submitBtn.textContent = 'Войти';
      submitBtn.disabled = false;
    }
  });
});
