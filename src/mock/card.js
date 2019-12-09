export const MockTypes = [
  {
    group: `Transfer`,
    types: [
      {
        type: `Taxi`,
        icon: `taxi`
      },
      {
        type: `Bus`,
        icon: `bus`
      },
      {
        type: `Train`,
        icon: `train`
      },
      {
        type: `Ship`,
        icon: `ship`
      },
      {
        type: `Flight`,
        icon: `flight`
      },
      {
        type: `Drive`,
        icon: `drive`
      },
      {
        type: `Transport`,
        icon: `transport`
      }
    ]
  },
  {
    group: `Activity`,
    types: [
      {
        type: `Check`,
        icon: `check-in`
      },
      {
        type: `Sightseeing`,
        icon: `sightseeing`
      },
      {
        type: `Restaurant`,
        icon: `restaurant`
      }
    ]
  }
];

export const MockCities = [
  `Rome`,
  `Genoa`,
  `Verona`,
  `Parma`,
  `Syracuse`,
  `La Spezia`
];

export const MockDescription = (`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, 
  non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius 
  viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum 
  sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu 
  luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc 
  fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`)
  .replace(/\r?\n/g, ``)
  .split(`.`);

export const MockOffers = [
  {
    type: `Taxi`,
    name: `Order Uber`,
    price: 10
  },
  {
    type: `Flight`,
    name: `Add luggage`,
    price: 4
  },
  {
    type: `Transport`,
    name: `Rent a car`,
    price: 26
  },
  {
    type: `Check`,
    name: `Add breakfast`,
    price: 150
  },
  {
    type: `Sightseeing`,
    name: `Book tickets`,
    price: 25
  },
  {
    type: `Sightseeing`,
    name: `Lunch in city`,
    price: 10
  }
];
