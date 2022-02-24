GM_config.init(
{
  'id': 'MyConfig', // The id used for this instance of GM_config
  'fields': // Fields object
  {
    'TozsdeBot_Enabled':
    {
      'label': 'Bekapcsolva',
      'section': ['TőzsdeBot'],
      'title': 'Be legyen-e kapcsolva a tőzsdebot.',
      'type': 'checkbox',
      'default': false
    }
  }
});
