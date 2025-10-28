// Test country API
fetch('https://ipapi.co/json/')
  .then(res => res.json())
  .then(data => {
    console.log('Country API response:', data)
    console.log('Country code:', data.country_code)
  })
  .catch(err => console.error('Error:', err))
