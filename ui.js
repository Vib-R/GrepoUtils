GM_config.init(
{
  'id': 'MyConfig',
  'title': '[Vib-R] GrepoUtils v1.1.2',
  'fields': // Fields object
  {
    'TozsdeBot_Enabled':
    {
      'label': 'Bekapcsolva',
      'section': ['TőzsdeBot'],
      'title': 'Be legyen-e kapcsolva a tőzsdebot.',
      'type': 'checkbox',
      'default': false
    },
     'TozsdeBot_TickInterval':
    {
      'label': 'Gyakoriság',
      'type': 'int',
      'title': 'Hány másodpercenként váltson át a következő városra.',
      'default': '5'
    },
    'TozsdeBot_MinimalResource':
    {
      'label': 'Minimum nyersanyagmennyiség',
      'type': 'int',
      'title': 'Mennyi legyen a minimum nyersanyag, amit elküld a tőzsdére.',
      'default': '150'
    },
    'TozsdeBot_CaptchaDetection':
    {
      'label': 'Captcha-felismerés',
      'title': 'Felismeri, ha megjelenik a captcha.',
      'type': 'checkbox',
      'default': true
    },
    'TozsdeBot_URL':
    {
      'label': 'Captcha Hang URL',
      'type': 'text',
      'title': 'Ha megjelenik a captcha, lejátssza ezt a hangot.',
      'size': 250,
      'default': 'https://notificationsounds.com/storage/sounds/file-sounds-1134-open-up.mp3'
    },
    'AntiGrepolisUpdate_Enabled':
    {
      'label': 'Bekapcsolva',
      'section': ['Oldal frissítése a grepolis szerverek frissülése után'],
      'title': 'Be legyen-e kapcsolva az oldalfrissítés. (Percenként nézi)',
      'type': 'checkbox',
      'default': false
    },
    'Cities':
    {
      'label': 'Városok', // Appears next to field
      'type': 'select', // Makes this setting a dropdown
      'options': ['-'], // Possible choices
      'default': '-' // Default value if user doesn't change it
    }
  }
});
