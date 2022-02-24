GM_config.init(
{
  'id': 'MyConfig', // The id used for this instance of GM_config
  'fields': // Fields object
  {
    'Status':
    {
      'section': ['Personal Info About Yourself', 
       'We need this info to do stuff'], // Appears above the field
      'label': 'TőzsdeBot', // Appears next to field
      'type': 'checkbox', // Makes this setting a checkbox input
      'default': false // Default value if user doesn't change it
    }
  }
});
