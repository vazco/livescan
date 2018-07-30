export default async function fetchMessages() {
  await new Promise(resolve => setTimeout(resolve, 5000))

  return {
    results: [
      {name: 'Vazco', type: 'CURL', url: 'https://vazco.eu/', isOk: true},
      {name: 'Vazco2', type: 'CURL2', url: 'https://vazco.eu/2', isOk: true},
      {name: 'Vazco3', type: 'CURL3', url: 'https://vazco.eu/3', isOk: false},
      {name: 'Vazco4', type: 'CURL4', url: 'https://vazco.eu/4', isOk: false},
      {name: 'Vazco5', type: 'CURL5', url: 'https://vazco.eu/5', isOk: true},
    ]
  }
}
